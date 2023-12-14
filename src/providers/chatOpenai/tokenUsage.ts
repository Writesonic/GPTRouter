import * as Sentry from "@sentry/node";
import { encodingForModel, getEncoding } from "js-tiktoken";

/**
 * getTokenUsage calculates the token usage for a given set of messages, a completion string and a model.
 *
 * @param {any[]} messages - An array of messages to calculate token usage for.
 * @param {string} completion - The completion string to calculate token usage for.
 * @param {string} model - The model to use for encoding.
 * @returns {Promise<{ prompt_tokens: number, completion_tokens: number, total_tokens: number }>} The token usage object with prompt tokens, completion tokens, and total tokens.
 */
export default async function getTokenUsage(messages: any, completion: string, model: string) {
  try {
    // @ts-ignore
    const enc = encodingForModel(model);
    let promptTokens = 0;
    for (const message of messages) {
      promptTokens += enc.encode(message?.role).length;
      promptTokens += enc.encode(message?.content).length;
      promptTokens += 3;
    }
    promptTokens += 3;
    const completionTokens = enc.encode(completion)?.length;
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
