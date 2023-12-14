import { FastifyInstance } from 'fastify'
import { GetHealthCheckDataSchema, HealthCheckSchema } from '../schema'
import { getHealthCheckData, triggerHealthCheck } from '../controllers'

/**
 * Define routes for health check endpoint
 * @param {FastifyInstance} server - The Fastify server instance
 * @returns {Promise<void>} - A Promise that resolves once the routes are defined
 */
async function healthCheckRouter(server: FastifyInstance) {
    server.post('', { schema: HealthCheckSchema, onRequest: [server.authenticate] }, triggerHealthCheck)
    server.get('', { schema: GetHealthCheckDataSchema, onRequest: [server.authenticate] }, getHealthCheckData)
}

export default healthCheckRouter
