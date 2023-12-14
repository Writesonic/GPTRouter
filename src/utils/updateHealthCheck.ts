import { DataSource } from "typeorm";
import { ModelHealthCheck } from "../models/ModelHealthCheck";

interface HealthCheckParams {
    modelId: string;
    providerId: string;
    isAvailable: boolean;
    status: string;
    latency?: number;
}

/**
 * Update the health check for a given model and provider in the database
 * @param {HealthCheckParams} params - The parameters for the health check update
 * @param {DataSource} orm - The TypeORM data source
 * @returns {Promise<void>} - A promise that resolves when the health check is updated
 */
export default async function updateHealthCheck(params: HealthCheckParams, orm: DataSource) {
    const { modelId, providerId, isAvailable, status, latency } = params;
    const updateData = { isAvailable, status, latency };

    const healthCheckObj = await orm.getRepository(ModelHealthCheck).findOne({ where: { modelId: modelId, providerId: providerId } });

    await orm.getRepository(ModelHealthCheck).create({ modelId, providerId, ...updateData }).save();

}