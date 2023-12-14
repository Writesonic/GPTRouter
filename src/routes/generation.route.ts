import { FastifyInstance } from 'fastify'
import { GenerateFromImageResponseSchema, GenerateFromPromptResponseSchema, GenerateImageResponseSchema, GenerateResponseSchema } from '../schema'
import { generateImageResponse, generateResponse, generateResponseFromImage, generateResponseFromPrompt } from '../controllers'

/**
 * Attach generation routes to the Fastify server.
 * @param {FastifyInstance} server - The Fastify server instance.
 * @returns {Promise<void>} - A promise that resolves after attaching the generation routes.
 */

async function generationRouter(server: FastifyInstance) {

    await server.register(import('@fastify/rate-limit'), {
        max: 10,
        timeWindow: '1440 minute',
        keyGenerator: (request) => {
            return request.headers['ws-secret']?.toString() || "";
        },
        allowList: (request) => {
            return request.headers['ws-secret']?.toString() === process.env.WS_SECRET;
        }
    })

    server.post('', { schema: GenerateResponseSchema, onRequest: [server.authenticate] }, generateResponse)
    server.post('/prompt', { schema: GenerateFromPromptResponseSchema, onRequest: [server.authenticate] }, generateResponseFromPrompt)
    server.post('/image', { schema: GenerateFromImageResponseSchema, onRequest: [server.authenticate] }, generateResponseFromImage)
    server.post('/generate-image', { schema: GenerateImageResponseSchema, onRequest: [server.authenticate] }, generateImageResponse)
}

export default generationRouter
