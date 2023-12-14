import { CohereClient } from "cohere-ai";
import dotenv from "dotenv";
import * as Sentry from "@sentry/node";

dotenv.config();
const cohere = new CohereClient({
  token: process.env.COHERE_API_KEY!,
});

/**
 * Retrieves the number of tokens for a given prompt and completion using the Cohere API.
 * @param {string} prompt - The prompt to tokenize.
 * @param {string} completion - The completion to tokenize.
 * @returns {Promise<object>} - An object containing the number of tokens for prompt, completion, and total.
 */
export default async function getTokenUsage(prompt: string, completion: string) {
  try {
    const promptRes = await cohere.tokenize({
      text: prompt,
    });
    const promptTokens = promptRes?.tokens?.length;
    const completionRes = await cohere.tokenize({
      text: completion,
    });
    const completionTokens = completionRes?.tokens?.length;
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
