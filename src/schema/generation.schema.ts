import { Static, Type } from "@sinclair/typebox";

import { ImageChatModels } from "../constants";
import { ChatOpenaiInputParamsSchema, OpenaiInputParamsSchema } from "./providerSchemas";

/**
 * Represents roles for the chat messages
 */
export enum Roles {
  system = "system",
  user = "user",
  assistant = "assistant",
  function = "function",
  tool = "tool",
}

export const StableDiffusionImageResponseSchema = Type.Object({
  artifacts: Type.Array(
    Type.Object({
      base64: Type.String(),
      seed: Type.Number(),
      finishReason: Type.String(),
    }),
  ),
});

export const OpenAiImageResponseSchema = Type.Array(
  Type.Object({
    revised_prompt: Type.Optional(Type.String()),
    url: Type.Optional(Type.String()),
  }),
);

/**
 * Schema for defining the structure of chat messages
 */
export const MessagesSchema = Type.Object({
  role: Type.Enum(Roles),
  content: Type.Any(),
  name: Type.Optional(Type.String()),
  function_call: Type.Optional(Type.Object({})),
  tool_calls: Type.Optional(Type.Array(Type.Object({}))),
  tool_call_id: Type.Optional(Type.String()),
});

/**
 * Schema for defining the base prompt parameters
 */
export const BasePromptParams = Type.Object({
  messages: Type.Optional(Type.Array(MessagesSchema)),
  prompt: Type.Optional(Type.String()),

  temperature: Type.Optional(Type.Number()),
  top_p: Type.Optional(Type.Number()),
  n: Type.Optional(Type.Number()),
  stop: Type.Optional(Type.Union([Type.String(), Type.Array(Type.String())])),
  max_tokens: Type.Optional(Type.Number()),
  presence_penalty: Type.Optional(Type.Number()),
  frequency_penalty: Type.Optional(Type.Number()),
  logit_bias: Type.Optional(Type.Unknown()),
  user: Type.Optional(Type.String()),
  functions: Type.Optional(Type.Array(Type.Object({}))),
  function_call: Type.Optional(Type.Object({})),
  image_url: Type.Optional(Type.String()),
  response_format: Type.Optional(Type.Object({})),
  stop_sequences: Type.Optional(Type.Array(Type.String())),
  best_of: Type.Optional(Type.Number()),
  tool_calls: Type.Optional(Type.Any()),
});

/**
 * Schema for defining the base generation structure
 */
export const BaseGenerationSchema = Type.Object({
  providerId: Type.Optional(Type.String({ format: "uuid" })),
  providerName: Type.Optional(Type.String()),
  modelId: Type.Optional(Type.String({ format: "uuid" })),
  modelName: Type.Optional(Type.String()),
  promptParams: BasePromptParams,
  order: Type.Number(),
});

/**
 * Schema for defining the generation response structure
 */
export const GenerationResponseSchema = Type.Object({
  id: Type.String(),
  choices: Type.Array(
    Type.Object({
      index: Type.Number(),
      text: Type.String(),
      finish_reason: Type.String(),
      role: Type.Optional(Type.String()),
      function_call: Type.Optional(Type.Any()),
    }),
  ),
  model: Type.String(),
  providerId: Type.Optional(Type.String({ format: "uuid" })),
  modelId: Type.Optional(Type.String({ format: "uuid" })),
  meta: Type.Object({
    usage: Type.Optional(
      Type.Object({
        completion_tokens: Type.Number(),
        prompt_tokens: Type.Number(),
        total_tokens: Type.Number(),
      }),
    ),
  }),
});

/**
 * Schema for defining the base generation from prompt structure
 */
export const BaseGenerationFromPromptSchema = Type.Object({
  promptId: Type.String({ format: "uuid" }),
  inputData: Type.Object({}),
  n: Type.Number(),
  language: Type.String(),
  userId: Type.String(),
});

/**
 * Type for the schema of the generate response
 */
export const GenerateResponseSchema = {
  summary: "Generate Response",
  body: Type.Object({
    stream: Type.Optional(Type.Boolean()),
    timeout: Type.Optional(Type.Number()), // in milliseconds
    maxRetries: Type.Optional(Type.Number()),
    data: Type.Array(BaseGenerationSchema),
  }),
  response: {
    200: GenerationResponseSchema,
  },
};

/**
 * Type for the schema of the generation from prompt response
 */
export const GenerateFromPromptResponseSchema = {
  summary: "Generate Response from Prompt",
  body: Type.Object({
    stream: Type.Optional(Type.Boolean()),
    timeout: Type.Optional(Type.Number()), // in milliseconds
    maxRetries: Type.Optional(Type.Number()),
    data: BaseGenerationFromPromptSchema,
  }),
  response: {
    200: GenerationResponseSchema,
  },
};

export const BaseImageChatGenerationSchema = Type.Object({
  imageUrl: Type.String(),
  promptParams: BasePromptParams,
  model: Type.Enum(ImageChatModels),
  chatHistory: Type.Optional(Type.Array(MessagesSchema)),
});

export const ImageChatGenerationResponseSchema = Type.Object({
  response: Type.String(),
});

export const ImageGenerationResponseSchema = Type.Object({
  response: Type.Union([StableDiffusionImageResponseSchema, OpenAiImageResponseSchema, Type.String()]),
});

export const GenerateFromImageResponseSchema = {
  summary: "Generate Response from Image",
  body: Type.Object({
    stream: Type.Optional(Type.Boolean()),
    data: BaseImageChatGenerationSchema,
    timeout: Type.Optional(Type.Number()), // in milliseconds
    maxRetries: Type.Optional(Type.Number()),
  }),
  response: {
    200: ImageChatGenerationResponseSchema,
  },
};

/**
 * Type for the Image handler schema
 */
export const GenerateImageResponseSchema = {
  body: Type.Object({
    model: Type.Optional(Type.String()),
    imageVendor: Type.String(),
    prompt: Type.String(),
    numImages: Type.Number(),
    width: Type.Optional(Type.Number()),
    height: Type.Optional(Type.Number()),
    size: Type.Optional(
      Type.Union([
        Type.Literal("256x256"),
        Type.Literal("512x512"),
        Type.Literal("1024x1024"),
        Type.Literal("1792x1024"),
        Type.Literal("1024x1792"),
        Type.Null(),
      ]),
    ),
  }),
  response: {
    200: ImageGenerationResponseSchema,
  },
};

/**
 * Type for the complete handler schema
 */
export const CompleteHandlerSchema = Type.Array(BaseGenerationSchema);

/**
 * Represents the static type for base generation
 */
export type BaseGenerationSchema = Static<typeof BaseGenerationSchema>;

export type StableDiffusionImageResponseSchema = Static<typeof StableDiffusionImageResponseSchema>;
export type OpenAiImageResponseSchema = Static<typeof OpenAiImageResponseSchema>;
export type CompleteHandlerSchema = Static<typeof CompleteHandlerSchema>;

/**
 * Represents the static type for base prompt parameters
 */
export type BasePromptParams = Static<typeof BasePromptParams>;

/**
 * Represents the static type for generation response
 */
export type GenerationResponseSchema = Static<typeof GenerationResponseSchema>;
export type MessagesSchema = Static<typeof MessagesSchema>;
