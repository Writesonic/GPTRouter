import { Static, Type } from "@sinclair/typebox";

import { ResponseFormatType } from "../../constants";

/**
 * Represents the roles available in the ChatOpenai system.
 */
export enum ChatOpenaiRoles {
  system = "system",
  user = "user",
  assistant = "assistant",
  function = "function",
  tool = "tool",
}

/**
 * Represents the schema for the messages in the ChatOpenai system.
 */
export const ChatOpenaiMessagesSchema = Type.Object({
  role: Type.Enum(ChatOpenaiRoles),
  content: Type.Any(),
  name: Type.Optional(Type.String()),
  function_call: Type.Optional(Type.Object({})),
  tool_calls: Type.Optional(Type.Array(Type.Object({}))),
  tool_call_id: Type.Optional(Type.String()),
});

export const ChatOpenaiResponseFormatSchema = Type.Object({
  type: Type.Enum(ResponseFormatType),
});

/**
 * Represents the schema for the input parameters in the ChatOpenai system.
 */
export const ChatOpenaiInputParamsSchema = Type.Object({
  model: Type.String(),
  messages: Type.Array(ChatOpenaiMessagesSchema),
  temperature: Type.Optional(Type.Number()),
  top_p: Type.Optional(Type.Number()),
  n: Type.Optional(Type.Number()),
  stream: Type.Optional(Type.Boolean()),
  stop: Type.Optional(Type.Union([Type.String(), Type.Array(Type.String())])),
  max_tokens: Type.Optional(Type.Number()),
  presence_penalty: Type.Optional(Type.Number()),
  frequency_penalty: Type.Optional(Type.Number()),
  logit_bias: Type.Optional(Type.Unknown()),
  user: Type.Optional(Type.String()),
  functions: Type.Optional(Type.Array(Type.Object({}))),
  function_call: Type.Optional(Type.Object({})),
  response_format: Type.Optional(ChatOpenaiResponseFormatSchema),
  tools: Type.Optional(Type.Array(Type.Object({}))),
});

export type ChatOpenaiInputParamsSchema = Static<typeof ChatOpenaiInputParamsSchema>;
