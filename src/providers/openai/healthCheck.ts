import { DataSource } from "typeorm";
import { DEFAULT_MAX_RETRIES, DEFAULT_TIMEOUT_IN_MS, Providers } from "../../constants";
import generateResponse from "./generate";
import { Provider } from "../../models/Provider";
import { Model } from "../../models/Model";
import { ModelHealthCheck } from "../../models/ModelHealthCheck";
import updateHealthCheck from "../../utils/updateHealthCheck";

const prompt = "ping";

/**
 * Perform a health check for the OpenAI provider by sending a ping request to the configured models and updating the health status in the database.
 * @param orm The TypeORM DataSource instance for database operations.
 * @returns A boolean indicating whether the health check was successfully completed.
 */
export default async function checkOpenaiHealth(orm: DataSource) {
  const openaiProvider = await orm.getRepository(Provider).findOne({ where: { name: Providers.OPENAI } });

  if (!openaiProvider) {
    throw new Error("Provider openai does not exist");
  }

  const openaiModels = await orm.getRepository(Model).find({ where: { providerId: openaiProvider.id } });

  const promises = openaiModels.map(async model => {
    const params = {
      model: model.name,
      temperature: 0.7,
      max_tokens: 2,
      frequency_penalty: 0,
      presence_penalty: 0,
      prompt: prompt,
    };

    const obj = await orm
      .getRepository(ModelHealthCheck)
      .findOne({ where: { modelId: model.id, providerId: openaiProvider.id } });

    try {
      const startTime = Date.now();
      const response = await generateResponse({
        params,
        timeout: DEFAULT_TIMEOUT_IN_MS,
        maxRetries: DEFAULT_MAX_RETRIES,
      });
      const endTime = Date.now();
      await updateHealthCheck(
        {
          modelId: model.id,
          providerId: openaiProvider.id,
          isAvailable: true,
          status: response?.data?.choices?.[0]?.text || "ok",
          latency: endTime - startTime,
        },
        orm,
      );
    } catch (error: any) {
      await updateHealthCheck(
        {
          modelId: model.id,
          providerId: openaiProvider.id,
          isAvailable: false,
          status: error?.message || "error",
        },
        orm,
      );
    }
  });

  await Promise.allSettled(promises);

  console.log("Openai health check completed");
  return true;
}
