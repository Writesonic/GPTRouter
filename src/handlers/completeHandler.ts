import { ImageChatModels, Providers } from "../constants";

import { BasePromptParams, GenerationResponseSchema } from "../schema";
import ApiError from "../library/customError";
import { ProviderFactory } from "../providers/factory";

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
