import { Static, Type } from "@sinclair/typebox";

/**
 * Schema for input parameters for Cohere API (TypeBox)
 * @model {string} The model to use for generation
 * @prompt {string} The prompt for text generation
 * @stream {boolean} (Optional) Set true if response should be streamed
 * @max_tokens {number} The maximum number of tokens to generate
 * @num_generations {number} (Optional) The number of generations to produce
 */
export const CohereInputParamsSchema = Type.Object({
  model: Type.String(),
  prompt: Type.String(),
  stream: Type.Optional(Type.Boolean()),
  max_tokens: Type.Number(),
  num_generations: Type.Optional(Type.Number()),
});

export type CohereInputParamsSchema = Static<typeof CohereInputParamsSchema>;
