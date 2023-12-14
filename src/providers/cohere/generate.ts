import { CohereClient } from "cohere-ai";
import dotenv from "dotenv";

import { CohereInputParamsSchema } from "../../schema/providerSchemas";

dotenv.config();
const cohere = new CohereClient({
  token: process.env.COHERE_API_KEY!,
});

/**
 * Generate a response using the provided parameters via the Cohere API.
 * @param {Object} input - The input object.
 * @param {CohereInputParamsSchema} input.params - The parameters for generating the response.
 * @returns {Promise<any>} - A promise that resolves to the generated response.
 */
export default async function generateResponse({
  params,
  stream = false,
  timeout,
  maxRetries,
}: {
  params: CohereInputParamsSchema;
  stream?: boolean;
  timeout: number;
  maxRetries: number;
}): Promise<any> {
  if (stream) {
    return await cohere.chatStream(
      {
        ...params,
        message: params.prompt,
      },
      {
        timeoutInSeconds: timeout / 1000,
        maxRetries: maxRetries,
      },
    );
  }
  return await cohere.generate(params);
}
