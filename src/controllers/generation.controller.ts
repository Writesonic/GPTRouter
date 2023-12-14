import * as Sentry from "@sentry/node";
import { APIConnectionTimeoutError } from "openai";
import { OpenAI } from "openai";

import {
  DEFAULT_MAX_RETRIES,
  DEFAULT_TIMEOUT_IN_MS,
  ERROR_MESSAGES,
  ImageChatModels,
  ImageVendor,
  MODEL_LATENCY_LIMIT_FOR_GENERATION,
  Providers,
  SSE_EVENTS,
  STABLE_DIFFUSION_API_URL,
  STABLE_DIFFUSION_IMAGE_GENERATION_PARAMS,
  STABLE_DIFFUSION_IMAGE_GENERATION_PARAMS_HEIGHT,
  STABLE_DIFFUSION_IMAGE_GENERATION_PARAMS_WIDTH,
  STABLE_DIFFUSION_TEXT_TO_IMAGE,
} from "../constants";
import completeHandler from "../handlers/completeHandler";
import streamHandler from "../handlers/streamHandler";
import ApiError from "../library/customError";
import { Model } from "../models/Model";
import { ModelHealthCheck } from "../models/ModelHealthCheck";
import { ModelUsage } from "../models/ModelUsage";
import { Prompt } from "../models/Prompt";
import { Provider } from "../models/Provider";
import {
  GenerateFromImageResponseSchema,
  GenerateFromPromptResponseSchema,
  GenerateImageResponseSchema,
  GenerateResponseSchema,
  Roles,
} from "../schema";
import { StableDiffusionImageResponseSchema } from "../schema";
import { FastifyReplyTypebox, FastifyRequestTypebox } from "../server";

/**
 * Generates a response based on the request data
 * @param {FastifyRequestTypebox<typeof GenerateResponseSchema>} request - The request object
 * @param {FastifyReplyTypebox<typeof GenerateResponseSchema>} reply - The reply object
 * @returns {Promise<void>} - A promise that resolves when the response is generated
 */
export const generateResponse = async (
  request: FastifyRequestTypebox<typeof GenerateResponseSchema>,
  reply: FastifyReplyTypebox<typeof GenerateResponseSchema>,
) => {
  try {
    const { data, stream, timeout = DEFAULT_TIMEOUT_IN_MS, maxRetries = DEFAULT_MAX_RETRIES } = request.body;
    data.sort((a, b) => a.order - b.order);
    const orm = request.server.orm;
    for (const params of data) {
      let provider;
      let model;
      if (params.providerId) {
        provider = await orm.getRepository(Provider).findOne({ where: { id: params.providerId } });
      } else if (params.providerName) {
        provider = await orm.getRepository(Provider).findOne({ where: { name: params.providerName } });
      } else {
        throw new ApiError(400, `Neither provider ID nor name was provided`);
      }
      if (!!!provider) {
        throw new ApiError(
          400,
          `Provider with ${
            params.providerId ? `id ${params.providerId}` : `name ${params.providerName}`
          } does not exist`,
        );
      }

      if (params.modelId) {
        model = await orm.getRepository(Model).findOne({ where: { id: params.modelId }, relations: ["cost"] });
      } else if (params.modelName) {
        model = await orm.getRepository(Model).findOne({ where: { name: params.modelName }, relations: ["cost"] });
      } else {
        throw new ApiError(400, `Neither model ID nor name was provided`);
      }
      if (!!!model) {
        throw new ApiError(
          400,
          `Model with ${params.modelId ? `id ${params.modelId}` : `name ${params.modelName}`} does not exist`,
        );
      }

      const obj = await orm
        .getRepository(ModelHealthCheck)
        .findOne({ where: { modelId: model.id, providerId: provider.id }, order: { lastChecked: "DESC" } });

      if (!obj || obj.isAvailable === false || obj.latency > MODEL_LATENCY_LIMIT_FOR_GENERATION) {
        continue;
      }

      if (stream) {
        const response = streamHandler({
          modelName: model.name,
          providerName: provider.name,
          promptParams: params?.promptParams,
          timeout,
          maxRetries,
        });
        reply.sse(
          (async function* source() {
            try {
              for await (const message of response) {
                if (message.event === SSE_EVENTS.META) {
                  try {
                    const usage = message?.data?.usage;
                    await request.server.orm
                      .getRepository(ModelUsage)
                      .create({
                        modelId: model?.id,
                        providerId: provider?.id,
                        promptTokens: usage?.prompt_tokens,
                        completionTokens: usage?.completion_tokens,
                        totalTokens: usage?.total_tokens,
                        cost:
                          (model?.cost?.input * (usage?.prompt_tokens ?? 0) +
                            model?.cost?.output * (usage?.completion_tokens ?? 0)) /
                          model?.cost?.factor,
                        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                        // @ts-ignore
                        userId: request.user?.id ?? params?.promptParams?.user,
                      })
                      .save();
                  } catch (e) {
                    Sentry.captureException(e);
                  }
                }
                yield { data: JSON.stringify(message) };
              }
            } catch (e: any) {
              reply.sse({ data: JSON.stringify({ event: SSE_EVENTS.ERROR, message: e.message }) });
              reply.sseContext.source.end();
              return;
            }
            yield {
              data: JSON.stringify({
                event: SSE_EVENTS.GENERATION_SOURCE,
                data: {
                  modelId: model.id,
                  providerId: provider.id,
                },
              }),
            };
            yield { data: JSON.stringify({ event: SSE_EVENTS.END, data: "end" }) };
          })(),
        );
      } else {
        const response = await completeHandler({
          modelName: model.name,
          providerName: provider.name,
          promptParams: params?.promptParams,
          timeout,
          maxRetries,
        });
        try {
          const usage = response?.meta?.usage;
          await request.server.orm
            .getRepository(ModelUsage)
            .create({
              modelId: model?.id,
              providerId: provider?.id,
              promptTokens: usage?.prompt_tokens,
              completionTokens: usage?.completion_tokens,
              totalTokens: usage?.total_tokens,
              cost:
                (model?.cost?.input * (usage?.prompt_tokens ?? 0) +
                  model?.cost?.output * (usage?.completion_tokens ?? 0)) /
                model?.cost?.factor,
              // eslint-disable-next-line @typescript-eslint/ban-ts-comment
              // @ts-ignore
              userId: request.user?.id ?? params?.promptParams?.user,
            })
            .save();
        } catch (e) {
          Sentry.captureException(e);
        }
        reply.code(200).send({
          ...response,
          modelId: model.id,
          providerId: provider.id,
        });
      }
      return;
    }
    throw new ApiError(400, ERROR_MESSAGES.NO_MODELS_AVAILABLE);
  } catch (e: any) {
    Sentry.captureException(e);
    if (request?.body?.stream) {
      reply.sse({ data: JSON.stringify({ event: SSE_EVENTS.ERROR, message: e.message }) });
      reply.sseContext.source.end();
    } else {
      if (e instanceof APIConnectionTimeoutError) {
        reply.code(408).send(e as any);
        return;
      }
      reply.code(500).send(e);
    }
  }
};

/**
 * Generates a response based on the prompt data
 * @param {FastifyRequestTypebox<typeof GenerateFromPromptResponseSchema>} request - The request object
 * @param {FastifyReplyTypebox<typeof GenerateFromPromptResponseSchema>} reply - The reply object
 * @returns {Promise<void>} - A promise that resolves when the response is generated
 */
export const generateResponseFromPrompt = async (
  request: FastifyRequestTypebox<typeof GenerateFromPromptResponseSchema>,
  reply: FastifyReplyTypebox<typeof GenerateFromPromptResponseSchema>,
) => {
  try {
    const stream = request?.body?.stream;
    const inputData = request?.body?.data?.inputData;
    const n = request?.body?.data?.n;
    const language = request?.body?.data?.language;
    const userId = request?.body?.data?.userId;
    const prompt = await request.server.orm
      .getRepository(Prompt)
      .findOne({ where: { id: request?.body?.data?.promptId } });
    const modelIds = prompt?.models ?? [];
    const timeout = request?.body?.timeout ?? DEFAULT_TIMEOUT_IN_MS;
    const maxRetries = request?.body?.maxRetries ?? DEFAULT_MAX_RETRIES;

    if (inputData) {
      if (prompt?.promptParams?.messages) {
        prompt.promptParams.messages = prompt.promptParams.messages.map(message => {
          const matches = message.content.match(/\[(.*?)\]/g);
          if (matches) {
            matches.forEach(match => {
              const key = match.replace("[", "").replace("]", "");
              message.content = message.content.replace(match, inputData[key as keyof typeof inputData]);
            });
          }
          return message;
        });
        if (language) {
          prompt.promptParams.messages.push({
            role: Roles.user,
            content: "Please generate in " + language + " language.",
          });
        }
      }
      if (prompt?.promptParams?.prompt) {
        const matches = prompt.promptParams.prompt.match(/\[(.*?)\]/g);
        if (matches) {
          matches.forEach(match => {
            const key = match.replace("[", "").replace("]", "");
            prompt.promptParams.prompt = prompt.promptParams.prompt.replace(
              match,
              inputData[key as keyof typeof inputData],
            );
          });
        }
        if (language) {
          prompt.promptParams.prompt += "\n\nPlease generate in " + language + " language.";
        }
      }
    }
    if (n && prompt?.promptParams?.n) {
      prompt.promptParams.n = n;
    }

    const orm = request.server.orm;
    for (const modelId of modelIds) {
      const model = await orm.getRepository(Model).findOne({ where: { id: modelId }, relations: ["cost"] });
      if (!!!model) {
        throw new ApiError(400, `Model with id ${modelId} does not exist`);
      }
      const provider = await orm.getRepository(Provider).findOne({ where: { id: model.providerId } });
      if (!!!provider) {
        throw new ApiError(400, `Provider with id ${model.providerId} does not exist`);
      }

      const obj = await orm
        .getRepository(ModelHealthCheck)
        .findOne({ where: { modelId: modelId, providerId: model.providerId }, order: { lastChecked: "DESC" } });

      if (!obj || obj.isAvailable === false || obj.latency > MODEL_LATENCY_LIMIT_FOR_GENERATION) {
        continue;
      }

      if (stream) {
        const response = streamHandler({
          modelName: model.name,
          providerName: provider.name,
          promptParams: prompt?.promptParams ?? {},
          timeout,
          maxRetries,
        });
        reply.sse(
          (async function* source() {
            for await (const message of response) {
              if (message.event === SSE_EVENTS.META) {
                try {
                  const usage = message?.data?.usage;
                  await request.server.orm
                    .getRepository(ModelUsage)
                    .create({
                      modelId: model?.id,
                      providerId: provider?.id,
                      promptTokens: usage?.prompt_tokens,
                      completionTokens: usage?.completion_tokens,
                      totalTokens: usage?.total_tokens,
                      cost:
                        (model?.cost?.input * (usage?.prompt_tokens ?? 0) +
                          model?.cost?.output * (usage?.completion_tokens ?? 0)) /
                        model?.cost?.factor,
                      userId: userId,
                    })
                    .save();
                } catch (e) {
                  Sentry.captureException(e);
                }
              }
              reply.sse({ data: JSON.stringify(message) });
            }
            reply.sse({
              data: JSON.stringify({
                event: SSE_EVENTS.GENERATION_SOURCE,
                data: {
                  modelId: model.id,
                  providerId: provider.id,
                },
              }),
            });
            reply.sse({ data: JSON.stringify({ event: SSE_EVENTS.END, data: "end" }) });
          })(),
        );
      } else {
        const response = await completeHandler({
          modelName: model.name,
          providerName: provider.name,
          promptParams: prompt?.promptParams ?? {},
          timeout,
          maxRetries,
        });
        try {
          const usage = response?.meta?.usage;
          await request.server.orm
            .getRepository(ModelUsage)
            .create({
              modelId: model?.id,
              providerId: provider?.id,
              promptTokens: usage?.prompt_tokens,
              completionTokens: usage?.completion_tokens,
              totalTokens: usage?.total_tokens,
              cost:
                (model?.cost?.input * (usage?.prompt_tokens ?? 0) +
                  model?.cost?.output * (usage?.completion_tokens ?? 0)) /
                model?.cost?.factor,
              userId: userId,
            })
            .save();
        } catch (e) {
          Sentry.captureException(e);
        }
        reply.code(200).send({
          ...response,
          modelId: model.id,
          providerId: provider.id,
        });
      }
      return;
    }
    throw new ApiError(400, ERROR_MESSAGES.NO_MODELS_AVAILABLE);
  } catch (e: any) {
    Sentry.captureException(e);
    reply.code(500).send(e);
  }
};

const generateImagesWithDALL_E = async (
  request: FastifyRequestTypebox<typeof GenerateImageResponseSchema>,
  reply: FastifyReplyTypebox<typeof GenerateImageResponseSchema>,
) => {
  const { numImages, prompt, size, model } = request.body;

  const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
    organization: process.env.OPENAI_ORG,
  });

  const promises = Array(numImages)
    .fill(null)
    .map(() => {
      return openai.images
        .generate({
          model: model ?? "dall-e-3",
          prompt: prompt,
          n: 1,
          size: size,
        })
        .catch(() => {
          throw new ApiError(500, "Something went wrong with the AI please try again later");
        });
    });

  try {
    const responses = await Promise.all(promises);
    const imageData = responses.flatMap(response => response["data"]);

    if (!imageData.length) {
      throw new ApiError(406, "Sorry our AI is currently overloaded please try again");
    }
    reply.code(200).send({ response: imageData });
  } catch (e) {
    Sentry.captureException(e);
    throw new ApiError(500, "Something went wrong with the AI please try again later");
  }
};

const generateImagesWithStableDiffusion = async (
  request: FastifyRequestTypebox<typeof GenerateImageResponseSchema>,
  reply: FastifyReplyTypebox<typeof GenerateImageResponseSchema>,
) => {
  try {
    const { numImages, prompt, model, height, width } = request.body;

    const path = `${STABLE_DIFFUSION_API_URL}/${model}/${STABLE_DIFFUSION_TEXT_TO_IMAGE}`;

    const headers = {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: `Bearer ${process.env.STABILITY_API_KEY}`,
    };

    const body = {
      ...STABLE_DIFFUSION_IMAGE_GENERATION_PARAMS,
      samples: numImages,
      height: height ?? STABLE_DIFFUSION_IMAGE_GENERATION_PARAMS_HEIGHT,
      width: width ?? STABLE_DIFFUSION_IMAGE_GENERATION_PARAMS_WIDTH,
      text_prompts: [
        {
          text: prompt,
          weight: 1,
        },
        {
          text: "blurry, bad",
          weight: -1,
        },
      ],
    };

    const res = await fetch(path, {
      headers,
      method: "POST",
      body: JSON.stringify(body),
    });
    if (res.status !== 200) {
      throw new ApiError(500, res.statusText);
    }
    const data: StableDiffusionImageResponseSchema = await res.json();
    if (!data) {
      throw new ApiError(406, "Sorry our AI is currently overloaded please try again");
    }
    reply.code(200).send({ response: data });
  } catch (e) {
    Sentry.captureException(e);
    throw new ApiError(500, "Something went wrong with the AI please try again later");
  }
};

export const generateImageResponse = async (
  request: FastifyRequestTypebox<typeof GenerateImageResponseSchema>,
  reply: FastifyReplyTypebox<typeof GenerateImageResponseSchema>,
) => {
  const { imageVendor } = request.body;
  if (imageVendor === ImageVendor.DALL_E) {
    await generateImagesWithDALL_E(request, reply);
  } else {
    await generateImagesWithStableDiffusion(request, reply);
  }
};

export const generateResponseFromImage = async (
  request: FastifyRequestTypebox<typeof GenerateFromImageResponseSchema>,
  reply: FastifyReplyTypebox<typeof GenerateFromImageResponseSchema>,
) => {
  try {
    const { stream, data } = request?.body;
    const timeout = request?.body?.timeout ?? DEFAULT_TIMEOUT_IN_MS;
    const maxRetries = request?.body?.maxRetries ?? DEFAULT_MAX_RETRIES;
    const { imageUrl, promptParams, chatHistory, model } = data;
    let provider;

    if (model === ImageChatModels.GPT_4_VISION_PREVIEW) {
      promptParams.messages = [
        ...(chatHistory ?? []),
        {
          role: Roles.user,
          content: [
            { type: "text", text: promptParams?.prompt },
            {
              type: "image_url",
              image_url: {
                url: imageUrl,
              },
            },
          ],
        },
      ];
      provider = Providers.CHAT_OPENAI;
    } else {
      provider = Providers.REPLICATE;
      promptParams.image_url = imageUrl;
    }

    if (stream) {
      const response = await streamHandler({
        modelName: model,
        providerName: provider,
        promptParams: promptParams,
        timeout,
        maxRetries,
      });
      reply.sse(
        (async function* source() {
          try {
            for await (const message of response) {
              yield { data: JSON.stringify(message) };
            }
          } catch (e: any) {
            reply.sse({ data: JSON.stringify({ event: SSE_EVENTS.ERROR, message: e.message }) });
            reply.sseContext.source.end();
            return;
          }
          yield { data: JSON.stringify({ event: SSE_EVENTS.END, data: "end" }) };
        })(),
      );
    } else {
      const response = await completeHandler({
        modelName: model,
        providerName: provider,
        promptParams: promptParams,
        timeout,
        maxRetries,
      });
      reply.code(200).send({ response: response?.choices[0]?.text });
    }
  } catch (e: any) {
    Sentry.captureException(e);
    reply.code(500).send(e);
  }
};
