import { OpenAI } from "openai";
import { OpenaiInputParamsSchema } from "../../schema/providerSchemas";
import dotenv from "dotenv";
import { CompletionCreateParamsNonStreaming, CompletionCreateParamsStreaming } from "openai/resources/completions";

dotenv.config();

/**
 * Generate a response using the OpenAI API.
 * @param {object} input - The input parameters for generating the response.
 * @param {OpenaiInputParamsSchema} input.params - The input parameters schema for OpenAI.
 * @param {boolean} [input.stream=false] - Whether to stream the completion response or not.
 * @param {boolean} [input.isAzure=false] - Whether to use Azure OpenAI API or not.
 * @returns {Promise<any>} The response generated from the OpenAI API.
 */
export default async function generateResponse({
  params,
  stream = false,
  isAzure = false,
  timeout,
  maxRetries,
}: {
  params: OpenaiInputParamsSchema;
  stream?: boolean;
  isAzure?: boolean;
  timeout: number;
  maxRetries: number;
}): Promise<any> {
  let openai: OpenAI;
  if (isAzure) {
    openai = new OpenAI({
      apiKey: process.env.AZURE_OPENAI_API_KEY,
      baseURL: `https://${process.env.AZURE_OPENAI_API_BASE_URL}.openai.azure.com/openai/deployments/${params?.model}`,
      defaultQuery: { "api-version": process.env.AZURE_OPENAI_API_VERSION },
      defaultHeaders: { "api-key": process.env.AZURE_OPENAI_API_KEY },
      timeout: timeout,
      maxRetries: maxRetries,
    });
  } else {
    openai = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
      organization: process.env.OPENAI_ORG,
      timeout: timeout,
      maxRetries: maxRetries,
    });
  }

  if (stream) {
    const stream = await openai.completions.create({ ...params } as CompletionCreateParamsStreaming);
    return stream;
  } else {
    const completion = await openai.completions.create({ ...params } as CompletionCreateParamsNonStreaming);
    return completion;
  }
}
