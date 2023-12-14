import { FastifyInstance } from "fastify";

/**
 * Initializes Swagger for Fastify server to generate API documentation
 * @param {FastifyInstance} server - The Fastify instance to which Swagger will be added
 * @returns {Promise<void>} - A Promise that resolves once Swagger is successfully initialized
 */
export default async function initSwagger(server: FastifyInstance) {
  await server.register(require("@fastify/swagger"), {
    openapi: {
      info: {
        title: "Test swagger",
        description: "testing the fastify swagger api",
        version: "0.1.0",
      },
      servers: [
        {
          url: "http://localhost:8000",
        },
      ],
      components: {
        securitySchemes: {
          apiKey: {
            type: "apiKey",
            name: "apiKey",
            in: "header",
          },
        },
      },
    },
  });
  await server.register(require("@fastify/swagger-ui"), {
    routePrefix: "/docs",
  });
}
