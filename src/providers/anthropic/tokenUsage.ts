import { countTokens } from "@anthropic-ai/tokenizer";
import * as Sentry from "@sentry/node";

/**
 * Calculates the token usage based on the prompt and completion strings.
 *
 * @param {string} prompt - The prompt string for which tokens are to be counted.
 * @param {string} completion - The completion string for which tokens are to be counted.
 * @returns {Object} An object containing the count of prompt tokens, completion tokens, and the total tokens.
 * @throws {Error} If an error occurs during token counting.
 */
export default async function getTokenUsage(prompt: string, completion: string) {
  try {
    const promptTokens = countTokens(prompt);
    const completionTokens = countTokens(completion);
    const totalTokens = promptTokens + completionTokens;
    return {
      prompt_tokens: promptTokens,
      completion_tokens: completionTokens,
      total_tokens: totalTokens,
    };
  } catch (e) {
    console.log(e);
    Sentry.captureException(e);
  }
}
