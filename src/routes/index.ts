import { FastifyInstance } from 'fastify';
import modelRouter from './model.route';
import healthCheckRouter from './healthCheck.route';
import providerRouter from './provider.route';
import generationRouter from './generation.route';
import promptRouter from './prompt.route';
import userRouter from './user.route';
import modelUsageRouter from './modelUsage.route';


/**
 * Initialize the routes for the Fastify server.
 * @param {FastifyInstance} server - The Fastify server instance.
 */
export default function initRoutes(server: FastifyInstance) {
    server.register(modelRouter, { prefix: "api/v1/model" });
    server.register(healthCheckRouter, { prefix: "api/v1/healthcheck" });
    server.register(providerRouter, { prefix: "api/v1/provider" });
    server.register(generationRouter, { prefix: "api/v1/generate" });
    server.register(promptRouter, { prefix: "api/v1/prompt" });
    server.register(userRouter, { prefix: "api/v1/user" });
    server.register(modelUsageRouter, { prefix: "api/v1/model-usage" })
}