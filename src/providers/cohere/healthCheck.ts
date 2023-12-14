import { DataSource } from "typeorm";
import { DEFAULT_MAX_RETRIES, DEFAULT_TIMEOUT_IN_MS, Providers } from "../../constants";
import generateResponse from "./generate";
import { Provider } from "../../models/Provider";
import { Model } from "../../models/Model";
import updateHealthCheck from "../../utils/updateHealthCheck";

/**
 * Checks the health of Cohere provider by querying the database using the specified Orm.
 * @param {DataSource} orm - The TypeORM DataSource for the database connection.
 * @returns {Promise<boolean>} - A promise that resolves to true when the health check is completed.
 */
export default async function checkCohereHealth(orm: DataSource) {
  const cohereProvider = await orm.getRepository(Provider).findOne({ where: { name: Providers.COHERE } });

  if (!cohereProvider) {
    throw new Error("Provider cohere does not exist");
  }

  const cohereModels = await orm.getRepository(Model).find({ where: { providerId: cohereProvider.id } });

  const promises = cohereModels.map(async model => {
    const params = {
      model: model.name,
      prompt: "ping",
      temperature: 0.7,
      max_tokens: 2,
    };

    try {
      const startTime = Date.now();
      const response = await generateResponse({
        params: params,
        timeout: DEFAULT_TIMEOUT_IN_MS,
        maxRetries: DEFAULT_MAX_RETRIES,
      });
      const endTime = Date.now();
      await updateHealthCheck(
        {
          modelId: model.id,
          providerId: cohereProvider.id,
          isAvailable: true,
          status: response?.generations?.[0]?.text || "ok",
          latency: endTime - startTime,
        },
        orm,
      );
    } catch (error: any) {
      await updateHealthCheck(
        {
          modelId: model.id,
          providerId: cohereProvider.id,
          isAvailable: false,
          status: error?.message || "error",
        },
        orm,
      );
    }
    return true;
  });

  await Promise.all(promises);

  console.log("Cohere health check completed");
  return true;
}
