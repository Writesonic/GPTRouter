import { Static, Type } from "@sinclair/typebox";

import { BasePromptParams, MessagesSchema } from "./generation.schema";

/**
 * Represents the structure of a prompt object.
 * @typedef {object} PromptSchema
 * @property {string} id - The unique identifier of the prompt.
 * @property {string} title - The title of the prompt.
 * @property {Array<string>} models - An array of model identifiers associated with the prompt.
 * @property {BasePromptParams} promptParams - The base prompt params for the prompt.
 * @property {boolean} isDeleted - Indicates if the prompt is deleted or not.
 * @property {string} parentPromptId - The parent prompt's unique identifier.
 * @property {number} versionNumber - The version number of the prompt.
 * @property {string} updateMessage - An optional update message for the prompt.
 * @property {Date} createdAt - The date when the prompt was created.
 * @property {Date} updatedAt - The date when the prompt was last updated.
 */
export const PromptSchema = Type.Object({
  id: Type.String({ format: "uuid" }),
  title: Type.String(),
  models: Type.Array(Type.String({ format: "uuid" })),
  promptParams: BasePromptParams,
  isDeleted: Type.Boolean(),
  parentPromptId: Type.String({ format: "uuid" }),
  versionNumber: Type.Number(),
  updateMessage: Type.Optional(Type.String()),
  createdAt: Type.Date(),
  updatedAt: Type.Date(),
});

/**
 * Represents the response schema for getting all prompts.
 * @typedef {object} GetAllPromptsSchema
 * @property {Array<PromptSchema>} 200 - An array of prompt objects.
 */
export const GetAllPromptsSchema = {
  summary: "Get All Prompts",
  response: {
    200: Type.Array(PromptSchema),
  },
};

/**
 * Represents the request params and response schema for getting a prompt by its id.
 * @typedef {object} GetPromptByIdSchema
 * @property {object} params - The request parameters.
 * @property {string} params.id - The unique identifier of the prompt.
 * @property {object} response - The response schema.
 * @property {Array<PromptSchema>} response.200 - An array of prompt objects.
 * @property {object} response.404 - The response for not found.
 * @property {string} response.404.message - The error message.
 */
export const GetPromptByIdSchema = {
  summary: "Get a Prompt by Id",
  params: {
    id: Type.String({ format: "uuid" }),
  },
  response: {
    200: Type.Array(PromptSchema),
    404: Type.Object({
      message: Type.String(),
    }),
  },
};

/**
 * Represents the request body and response schema for creating a prompt.
 * @typedef {object} CreatePromptSchema
 * @property {object} body - The request body.
 * @property {string} body.id - The unique identifier of the prompt.
 * @property {string} body.title - The title of the prompt.
 * @property {Array<string>} body.models - An array of model identifiers associated with the prompt.
 * @property {BasePromptParams} body.promptParams - The base prompt params for the prompt.
 * @property {string} body.parentPromptId - The parent prompt's unique identifier.
 * @property {number} body.versionNumber - The version number of the prompt.
 * @property {string} body.updateMessage - An optional update message for the prompt.
 * @property {object} response - The response schema.
 * @property {PromptSchema} response.201 - The created prompt object.
 */
export const CreatePromptSchema = {
  summary: "Create a Prompt",
  body: Type.Object({
    id: Type.String({ format: "uuid" }),
    title: Type.String(),
    models: Type.Array(Type.String({ format: "uuid" })),
    promptParams: BasePromptParams,
    parentPromptId: Type.String({ format: "uuid" }),
    versionNumber: Type.Number(),
    updateMessage: Type.Optional(Type.String()),
  }),
  response: {
    201: PromptSchema,
  },
};

/**
 * Represents the request params, body, and response schema for updating a prompt.
 * @typedef {object} UpdatePromptSchema
 * @property {object} params - The request parameters.
 * @property {string} params.id - The unique identifier of the prompt.
 * @property {object} body - The request body.
 * @property {string} body.title - The updated title of the prompt.
 * @property {Array<string>} body.models - The updated array of model identifiers associated with the prompt.
 * @property {BasePromptParams} body.promptParams - The updated base prompt params for the prompt.
 * @property {object} response - The response schema.
 * @property {PromptSchema} response.200 - The updated prompt object.
 * @property {object} response.404 - The response for not found.
 * @property {string} response.404.message - The error message.
 */

export const UpdatePromptSchema = {
  summary: "Update a Prompt",
  params: {
    id: Type.String({ format: "uuid" }),
  },
  body: Type.Object({
    title: Type.Optional(Type.String()),
    models: Type.Optional(Type.Array(Type.String({ format: "uuid" }))),
    promptParams: BasePromptParams,
  }),
  response: {
    200: PromptSchema,
    404: Type.Object({
      message: Type.String(),
    }),
  },
};

/**
 * Represents the request params and response schema for deleting a prompt.
 * * @typedef {object} DeletePromptSchema
 * @property {object} params - The request parameters.
 * @property {string} params.id - The unique identifier of the prompt.
 * @property {object} response - The response schema.
 * @property {object} response.200 - The success message object.
 * @property {string} response.200.message - The success message.
 */

export const DeletePromptSchema = {
  summary: "Delete a Prompt",
  params: {
    id: Type.String({ format: "uuid" }),
  },
  response: {
    200: Type.Object({
      message: Type.String(),
    }),
  },
};

/**
 * Represents the request body and response schema for optimizing a prompt.
 * @typedef {object} OptimizePromptSchema
 * @property {object} body - The request body.
 * @property {Array<MessagesSchema>} body.messages - An array of messages to optimize the prompt.
 * @property {object} response - The response schema.
 * @property {Array<MessagesSchema>} response.200 - An array of optimized messages.
 */
export const OptimizePromptSchema = {
  summary: "Optimize a Prompt",
  body: Type.Object({
    messages: Type.Array(MessagesSchema),
  }),
  response: {
    200: Type.Array(MessagesSchema),
  },
};

/**
 * Represents the static type for the prompt schema.
 * @type {PromptSchema}
 */

export type PromptSchema = Static<typeof PromptSchema>;
