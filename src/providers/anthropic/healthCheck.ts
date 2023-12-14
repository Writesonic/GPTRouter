import { DataSource } from "typeorm";
import { DEFAULT_MAX_RETRIES, DEFAULT_TIMEOUT_IN_MS, Providers } from "../../constants";
import generateResponse from "./generate";
import { Provider } from "../../models/Provider";
import { Model } from "../../models/Model";
import updateHealthCheck from "../../utils/updateHealthCheck";

/**
 * Performs health check for the anthropic provider by pinging its models and updating their health status
 * @param {DataSource} orm - The TypeORM data source for database operations
 * @returns {Promise<boolean>} - A promise that resolves to true when the health check is completed
 */

export default async function checkAnthropicHealth(orm: DataSource) {
    const anthropicProvider = await orm.getRepository(Provider).findOne({ where: { name: Providers.ANTHROPIC } });

    if (!anthropicProvider) {
        throw new Error("Provider anthropic does not exist");
    }

    const anthropicModels = await orm.getRepository(Model).find({ where: { providerId: anthropicProvider.id } });

    const promises = anthropicModels.map(async (model) => {
        const params = {
            model: model.name,
            prompt: "ping",
            temperature: 0.7,
            max_tokens_to_sample: 2,
        };

        try {
            const startTime = Date.now();
            const response = await generateResponse({
                params: params,
                timeout: DEFAULT_TIMEOUT_IN_MS,
                maxRetries: DEFAULT_MAX_RETRIES
            });
            const endTime = Date.now();
            await updateHealthCheck({
                modelId: model.id,
                providerId: anthropicProvider.id,
                isAvailable: true,
                status: response?.completion || "ok",
                latency: (endTime - startTime),
            }, orm
            );
        } catch (error: any) {
            await updateHealthCheck({
                modelId: model.id,
                providerId: anthropicProvider.id,
                isAvailable: false,
                status: error?.message || "error",
            }, orm);
        }
        return true;
    });

    await Promise.all(promises);

    console.log("Anthropic health check completed");
    return true;
}
