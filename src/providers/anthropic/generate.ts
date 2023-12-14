import Anthropic from '@anthropic-ai/sdk';
import { AnthropicInputParamsSchema } from '../../schema/providerSchemas';

import dotenv from 'dotenv';

dotenv.config();

const anthropic = new Anthropic({
    apiKey: process.env.ANTHROPIC_API_KEY,
});


/**
 * Generates a response using Anthropic AI SDK based on the provided parameters.
 * @param {Object} input - The input parameters
 * @param {AnthropicInputParamsSchema} input.params - The input parameters for Anthropic AI
 * @param {boolean} [input.stream=false] - Whether to stream the response
 * @returns {Promise<any>} The response generated by Anthropic AI
 */
export default async function generateResponse({
    params,
    stream = false,
    timeout,
    maxRetries,
}: {
    params: AnthropicInputParamsSchema;
    stream?: boolean;
    timeout: number;
    maxRetries: number;
}): Promise<any> {
    let prompt = params.prompt;
    if (!prompt.includes(Anthropic.HUMAN_PROMPT)) {
        prompt = `${Anthropic.HUMAN_PROMPT} ${prompt}`;
    }
    if (!prompt.includes(Anthropic.AI_PROMPT)) {
        prompt = `${prompt} ${Anthropic.AI_PROMPT}`;
    }
    const config: Anthropic.CompletionCreateParams = {
        prompt: prompt,
        max_tokens_to_sample: params.max_tokens_to_sample,
        model: params.model,
        stream: stream ? true : false,
    };
    return await anthropic.completions.create(config, {
        timeout: timeout,
        maxRetries: maxRetries,
    })
}
