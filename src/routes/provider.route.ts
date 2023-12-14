import { FastifyInstance } from "fastify";

import { getActiveProviders } from "../controllers/provider.controller";
import { GetAllProvidersSchema } from "../schema/provider.schema";

/**
 * Define routes for handling provider related operations.
 *
 * @param {FastifyInstance} server - The Fastify server instance
 * @returns {Promise<void>} - A promise that resolves when the route is successfully registered
 */
async function providerRouter(server: FastifyInstance) {
  server.get("/all", { schema: GetAllProvidersSchema, onRequest: [server.authenticate] }, getActiveProviders);
}

export default providerRouter;
