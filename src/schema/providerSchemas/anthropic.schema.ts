import { Static, Type } from '@sinclair/typebox'

/**
 * Represents the schema for Anthropic input parameters.
 * @property {string} model - The model for Anthropic input.
 * @property {string} prompt - The prompt for Anthropic input.
 * @property {boolean} [stream] - Optional boolean flag to indicate if input should be streamed.
 * @property {number} max_tokens_to_sample - The maximum number of tokens to sample.
 */
export const AnthropicInputParamsSchema = Type.Object({
    model: Type.String(),
    prompt: Type.String(),
    stream: Type.Optional(Type.Boolean()),
    max_tokens_to_sample: Type.Number(),
})

export type AnthropicInputParamsSchema = Static<typeof AnthropicInputParamsSchema>