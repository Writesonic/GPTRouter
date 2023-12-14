import { encodingForModel } from "js-tiktoken";
import * as Sentry from "@sentry/node";


/**
 * Retrieves the token usage information for the given prompt, completion, and model.
 * @param {string} prompt - The prompt for which tokens need to be calculated.
 * @param {string} completion - The completion for which tokens need to be calculated.
 * @param {string} model - The model for which tokens need to be calculated.
 * @returns {Promise<{ prompt_tokens: number, completion_tokens: number, total_tokens: number }>} The token usage information containing the number of tokens for prompt, completion, and total.
 */
export default async function getTokenUsage(prompt: string, completion: string, model: string) {
    try {
        // @ts-ignore
        const enc = encodingForModel(model);
        const promptTokens = enc.encode(prompt)?.length;
        const completionTokens = enc.encode(completion)?.length;
        const totalTokens = promptTokens + completionTokens;
        return {
            prompt_tokens: promptTokens,
            completion_tokens: completionTokens,
            total_tokens: totalTokens,
        }
    } catch (e) {
        console.log(e);
        Sentry.captureException(e);
    }
}
