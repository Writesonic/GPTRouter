import { getAllModels, getModelById } from "../controllers";
import { GetAllModelsSchema, GetModelByIdSchema } from "../schema";
import { FastifyInstance } from "fastify";

/**
 * Attach model routes to the Fastify server instance
 * @param {FastifyInstance} server - The Fastify server instance
 * @returns {Promise<void>}
 */
async function modelRouter(server: FastifyInstance) {
    server.get("/all", { schema: GetAllModelsSchema, onRequest: [server.authenticate] }, getAllModels);
    server.get("/:id", { schema: GetModelByIdSchema, onRequest: [server.authenticate] }, getModelById);
}

export default modelRouter;
