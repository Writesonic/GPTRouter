import { ProviderFactory } from "../providers/factory";
import { BasePromptParams, GenerationResponseSchema } from "../schema";

export default async function completeHandler({
  providerName,
  modelName,
  promptParams,
  timeout,
  maxRetries,
}: {
  providerName: string;
  modelName: string;
  promptParams: BasePromptParams;
  timeout: number;
  maxRetries: number;
}): Promise<GenerationResponseSchema> {
  const providerInstance = ProviderFactory.createProvider(providerName);
  return await providerInstance.generate(modelName, promptParams, timeout, maxRetries);
}
