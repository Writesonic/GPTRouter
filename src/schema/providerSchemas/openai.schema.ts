import { Static, Type } from "@sinclair/typebox";

/**
 * Schema for OpenAI input parameters
 */
export const OpenaiInputParamsSchema = Type.Object({
  model: Type.String(),
  prompt: Type.String(),
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
});

export type OpenaiInputParamsSchema = Static<typeof OpenaiInputParamsSchema>;
