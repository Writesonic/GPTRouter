import { FastifyInstance } from "fastify";

import { getUsageDataByModel } from "../controllers/modelUsage.controller";
import { GetAllUsageByModelSchema } from "../schema/modelUsage.schema";

/**
 * Adds route for getting usage data by model
 *
 * @param {FastifyInstance} server - The Fastify server instance
 * @returns {Promise<void>} - A promise that resolves after adding the route
 */
async function modelUsageRouter(server: FastifyInstance) {
  server.get("/model", { schema: GetAllUsageByModelSchema, onRequest: [server.authenticate] }, getUsageDataByModel);
}

export default modelUsageRouter;
