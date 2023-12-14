import { FastifyReplyTypebox, FastifyRequestTypebox } from "../server";
import {
  BasePromptParams,
  CreatePromptSchema,
  DeletePromptSchema,
  GetAllPromptsSchema,
  GetPromptByIdSchema,
  OptimizePromptSchema,
  Roles,
  UpdatePromptSchema,
} from "../schema";
import { Prompt } from "../models/Prompt";
import { DEFAULT_MAX_RETRIES, DEFAULT_TIMEOUT_IN_MS, ERROR_MESSAGES } from "../constants";
import { Model } from "../models/Model";
import completeHandler from "../handlers/completeHandler";
import * as Sentry from "@sentry/node";

/**
 * Retrieves all prompts from the database.
 * @param {FastifyRequestTypebox<typeof GetAllPromptsSchema>} request - The request object.
 * @param {FastifyReplyTypebox<typeof GetAllPromptsSchema>} reply - The reply object.
 * @returns {Promise<void>}
 */
export const getAllPrompts = async (
  request: FastifyRequestTypebox<typeof GetAllPromptsSchema>,
  reply: FastifyReplyTypebox<typeof GetAllPromptsSchema>,
) => {
  try {
    const data = await request.server.orm.getRepository(Prompt).find({ where: { isDeleted: false } });
    const groupedData = data.reduce((acc: any, prompt: Prompt) => {
      (acc[prompt.parentPromptId] = acc[prompt.parentPromptId] || []).push(prompt);
      return acc;
    }, {});
    const lastestVersionPrompts = Object.values(groupedData).map((group: any) => {
      return group.reduce((acc: any, prompt: Prompt) => {
        return prompt.versionNumber > acc.versionNumber ? prompt : acc;
      }, group[0]);
    });
    reply.send(lastestVersionPrompts);
  } catch (e: any) {
    Sentry.captureException(e);
    reply.code(500).send(e);
  }
};

/**
 * Retrieves a prompt by its ID from the database.
 * @param {FastifyRequestTypebox<typeof GetPromptByIdSchema>} request - The request object.
 * @param {FastifyReplyTypebox<typeof GetPromptByIdSchema>} reply - The reply object.
 * @returns {Promise<void>}
 */
export const getPromptById = async (
  request: FastifyRequestTypebox<typeof GetPromptByIdSchema>,
  reply: FastifyReplyTypebox<typeof GetPromptByIdSchema>,
) => {
  try {
    // @ts-ignore
    const { id } = request.params;
    const prompt = await request.server.orm.getRepository(Prompt).findOne({ where: { id: id, isDeleted: false } });
    if (!prompt) {
      reply.code(404).send({ message: "Prompt not found" });
    } else {
      const prompts = await request.server.orm
        .getRepository(Prompt)
        .find({ where: { parentPromptId: id, isDeleted: false } });
      reply.code(200).send(prompts);
    }
  } catch (e: any) {
    Sentry.captureException(e);
    reply.code(500).send(e);
  }
};

/**
 * Creates a new prompt in the database.
 * @param {FastifyRequestTypebox<typeof CreatePromptSchema>} request - The request object.
 * @param {FastifyReplyTypebox<typeof CreatePromptSchema>} reply - The reply object.
 * @returns {Promise<void>}
 */
export const createPrompt = async (
  request: FastifyRequestTypebox<typeof CreatePromptSchema>,
  reply: FastifyReplyTypebox<typeof CreatePromptSchema>,
) => {
  try {
    const data = await request.server.orm.getRepository(Prompt).create(request.body).save();
    reply.code(200).send(data);
  } catch (e: any) {
    Sentry.captureException(e);
    reply.code(500).send(e);
  }
};

/**
 * Updates a prompt in the database by its ID.
 * @param {FastifyRequestTypebox<typeof UpdatePromptSchema>} request - The request object.
 * @param {FastifyReplyTypebox<typeof UpdatePromptSchema>} reply - The reply object.
 * @returns {Promise<void>}
 */
export const updatePrompt = async (
  request: FastifyRequestTypebox<typeof UpdatePromptSchema>,
  reply: FastifyReplyTypebox<typeof UpdatePromptSchema>,
) => {
  try {
    // @ts-ignore
    const { id } = request.params;
    const prompt = await request.server.orm.getRepository(Prompt).findOne({ where: { id: id } });
    console.log(prompt);
    if (!prompt) {
      reply.code(404).send({ message: "Prompt not found" });
    }
    const data = await request.server.orm.getRepository(Prompt).update(id, request.body);
    const res = await request.server.orm.getRepository(Prompt).findOne({ where: { id: id } });
    if (!res) {
      reply.code(404).send({ message: "Prompt not found" });
    } else {
      reply.code(200).send(res);
    }
  } catch (e: any) {
    Sentry.captureException(e);
    reply.code(500).send(e);
  }
};

/**
 * Deletes a prompt from the database by its ID.
 * @param {FastifyRequestTypebox<typeof DeletePromptSchema>} request - The request object.
 * @param {FastifyReplyTypebox<typeof DeletePromptSchema>} reply - The reply object.
 * @returns {Promise<void>}
 */
export const deletePrompt = async (
  request: FastifyRequestTypebox<typeof DeletePromptSchema>,
  reply: FastifyReplyTypebox<typeof DeletePromptSchema>,
) => {
  try {
    // @ts-ignore
    const { id } = request.params;
    const prompt = await request.server.orm.getRepository(Prompt).findOne({ where: { id: id } });
    if (!prompt) {
      reply.code(404).send({ message: ERROR_MESSAGES.PROMPT_NOT_FOUND });
    }
    const data = await request.server.orm.getRepository(Prompt).update(id, { isDeleted: true });
    reply.code(200).send({ message: "Prompt deleted Successfully" });
  } catch (e: any) {
    Sentry.captureException(e);
    reply.code(500).send(e);
  }
};

/**
 * Optimizes prompts based on input messages using a selected model and creates new messages.
 * @param {FastifyRequestTypebox<typeof OptimizePromptSchema>} request - The request object.
 * @param {FastifyReplyTypebox<typeof OptimizePromptSchema>} reply - The reply object.
 * @returns {Promise<void>}
 */
export const optimizePrompt = async (
  request: FastifyRequestTypebox<typeof OptimizePromptSchema>,
  reply: FastifyReplyTypebox<typeof OptimizePromptSchema>,
) => {
  try {
    const { messages } = request.body;

    const optimizePromptParams: BasePromptParams = {
      messages: [],
      temperature: 0.72,
      max_tokens: 150,
      top_p: 1,
      frequency_penalty: 0,
      presence_penalty: 0,
    };

    const selectedModel = await request.server.orm
      .getRepository(Model)
      .findOne({ where: { name: "gpt-4-0613" }, relations: ["provider"] });
    let newMessages: any = [];
    if (selectedModel) {
      for (const message of messages) {
        const OptimizePromptmessages = [
          {
            role: Roles.system,
            content:
              "You are a senior prompt engineer for Openai.\n You must carefully and correctly recognise the language of the Prompt and generate the Enhanced Prompt fully in the same recognised language.",
          },
          {
            role: Roles.user,
            content: `Please rewrite and enhance the prompts to generate highest quality content using openai LLMs such as chatGPT, Davinci, Curie, etc. Please mention the enhanced prompts.  You must carefully decipher the intention of the Prompt correctly and enhance it accordingly.
                        \nPrompt: ${message.content}\n Enhanced Prompt: `,
          },
        ];
        optimizePromptParams.messages = OptimizePromptmessages;
        const response = await completeHandler({
          modelName: selectedModel.name ?? "",
          providerName: selectedModel.provider.name ?? "",
          promptParams: optimizePromptParams,
          timeout: DEFAULT_TIMEOUT_IN_MS,
          maxRetries: DEFAULT_MAX_RETRIES,
        });
        newMessages.push({
          role: message.role,
          content: response.choices[0].text,
        });
      }
    }
    reply.code(200).send(newMessages);
  } catch (e: any) {
    Sentry.captureException(e);
    reply.code(500).send(e);
  }
};
