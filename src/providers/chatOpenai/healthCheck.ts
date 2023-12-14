import { DataSource } from "typeorm";
import { DEFAULT_MAX_RETRIES, DEFAULT_TIMEOUT_IN_MS, Providers } from "../../constants";
import generateResponse from "./generate";
import { Provider } from "../../models/Provider";
import { Model } from "../../models/Model";
import { ChatOpenaiRoles } from "../../schema/providerSchemas";
import updateHealthCheck from "../../utils/updateHealthCheck";
import ApiError from "../../library/customError";

const messages = [{ role: ChatOpenaiRoles.user, content: "ping" }];

/**
 * Performs a health check for ChatOpenai and Azure providers by checking the availability and latency of their models.
 * @param {DataSource} orm - The TypeORM data source used for database operations.
 * @returns {Promise<boolean>} A promise that resolves to true on successful health check completion.
 */
export default async function checkOpenaiHealth(orm: DataSource) {
    const openaiProvider = await orm.getRepository(Provider).findOne({ where: { name: Providers.CHAT_OPENAI } });

    if (!openaiProvider) {
        throw new ApiError(400, "Provider openai does not exist");
    }
    const azureProvider = await orm.getRepository(Provider).findOne({ where: { name: Providers.AZURE_CHAT_OPENAI } });
    if (!azureProvider) {
        throw new ApiError(400, "Provider azure does not exist");
    }

    const openaiModels = await orm.getRepository(Model).find({ where: { providerId: openaiProvider.id } });
    const azureModels = await orm.getRepository(Model).find({ where: { providerId: azureProvider.id } });

    const openaiPromises = openaiModels.map(async (model) => {
        const params = {
            model: model.name,
            temperature: 0.7,
            max_tokens: 2,
            frequency_penalty: 0,
            presence_penalty: 0,
            messages: messages,
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
                providerId: openaiProvider.id,
                isAvailable: true,
                status: response?.data?.choices[0]?.message?.content || "ok",
                latency: (endTime - startTime),
            }, orm);
        } catch (error: any) {
            await updateHealthCheck({
                modelId: model.id,
                providerId: openaiProvider.id,
                isAvailable: false,
                status: error?.message || "error"
            }, orm);
        }
        return true;
    });

    const azurePromises = azureModels.map(async (model) => {
        const params = {
            model: model.name,
            temperature: 0.7,
            max_tokens: 2,
            frequency_penalty: 0,
            presence_penalty: 0,
            messages: messages,
        };

        try {
            const startTime = Date.now();
            const response = await generateResponse({
                params: params, isAzure: true,
                timeout: DEFAULT_TIMEOUT_IN_MS,
                maxRetries: DEFAULT_MAX_RETRIES
            });
            const endTime = Date.now();
            await updateHealthCheck({
                modelId: model.id,
                providerId: azureProvider.id,
                isAvailable: true,
                status: response?.data?.choices[0]?.message?.content || "ok",
                latency: (endTime - startTime),
            }, orm);
        } catch (error: any) {
            await updateHealthCheck({
                modelId: model.id,
                providerId: azureProvider.id,
                isAvailable: false,
                status: error?.message || "error"
            }, orm);
        }
        return true;
    });

    // combine both promises
    await Promise.all([...openaiPromises, ...azurePromises]);

    console.log("ChatOpenai/Azure health check completed");
    return true;
}
