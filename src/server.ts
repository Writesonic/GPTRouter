import Fastify from "fastify";
import initSwagger from "./swagger";
import initRoutes from "./routes";
import dbConn from "typeorm-fastify-plugin";
import PostgresDataSource from "./plugins/db";
import { FastifySSEPlugin } from "fastify-sse-v2";

import {
  FastifyReply,
  FastifyRequest,
  RawRequestDefaultExpression,
  RawServerDefault,
  RawReplyDefaultExpression,
  ContextConfigDefault,
} from "fastify";
import { RouteGenericInterface } from "fastify/types/route";
import { FastifySchema } from "fastify/types/schema";
import { TypeBoxTypeProvider } from "@fastify/type-provider-typebox";
import fastifyCron from "fastify-cron";
import { HEALTH_CHECK_CRON_JOB_EXPRESSION } from "./constants";
import initData from "./scripts";
import * as Sentry from "@sentry/node";
import { User } from "./models/User";

export type FastifyRequestTypebox<TSchema extends FastifySchema> =
  FastifyRequest<
    RouteGenericInterface,
    RawServerDefault,
    RawRequestDefaultExpression<RawServerDefault>,
    TSchema,
    TypeBoxTypeProvider
  >;

export type FastifyReplyTypebox<TSchema extends FastifySchema> = FastifyReply<
  RawServerDefault,
  RawRequestDefaultExpression,
  RawReplyDefaultExpression,
  RouteGenericInterface,
  ContextConfigDefault,
  TSchema,
  TypeBoxTypeProvider
>;

/**
 * Initializes and configures the Fastify server, including database connection,
 * authentication, CORS settings, cron jobs, error handling, and routes.
 *
 * @returns {Promise<FastifyInstance>} A promise that resolves to the configured Fastify server instance.
 */
async function buildServer() {
  // Create a new Fastify server instance with pretty print logging enabled.
  const server = Fastify({
    logger: {
      transport: {
        target: "pino-pretty",
      },
    },
  }).withTypeProvider<TypeBoxTypeProvider>();

  try {
    // Connect to the database using the TypeORM plugin.
    await server.register(dbConn, { connection: PostgresDataSource });
  } catch (err) {
    // Log and exit if the database connection fails.
    console.log("Error connecting to database");
    console.log(err);
    process.exit(1);
  }

  // server.setErrorHandler(async (error, request, reply) => {
  //   console.log('Error: ', error);
  //   Sentry.captureException(error);
  //   reply.status(500).send({ error: error.message || "Something went wrong" });
  // });
  // Register JWT support for authentication.
  server.register(require("@fastify/jwt"), {
    secret: process.env.JWT_SECRET,
    sign: {
      expiresIn: "14d",
    },
  });

  // Register the authentication decorator for the server.
  server.decorate("authenticate", async (request, reply) => {
    try {
      const secret = request.headers["ws-secret"];
      if (!secret) {
        await request.jwtVerify();
        return;
      }

      if (secret === process.env.WS_SECRET) {
        return;
      }

      const orm = request.server.orm;
      const user = await orm
        .getRepository(User)
        .findOne({ where: { apikey: secret } });
      if (user) {
        request.user = user;
        return;
      }

      reply.code(401).send({ message: "Unauthorized" });
    } catch (err) {
      reply.code(401).send({ message: "Unauthorized" });
    }
  });

  // Register the Server-Sent Events (SSE) plugin.
  server.register(FastifySSEPlugin);

  // Register CORS handling.
  server.register(require("@fastify/cors"), (instance) => {
    return (req: any, callback: any) => {
      const corsOptions = {
        // This is NOT recommended for production as it enables reflection exploits
        origin: true,
      };

      // TODO: Add a whitelist of allowed origins

      // do not include CORS headers for requests from localhost
      if (/^localhost$/m.test(req.headers.origin)) {
        corsOptions.origin = false;
      }

      // callback expects two parameters: error and options
      callback(null, corsOptions);
    };
  });

  server.register(fastifyCron, {
    jobs: [
      {
        cronTime: HEALTH_CHECK_CRON_JOB_EXPRESSION,
        onTick: async (server) => {
          try {
            // @ts-ignore
            const token = server.jwt.sign({});
            const response = await server.inject({
              url: "api/v1/healthcheck",
              method: "POST",
              headers: { Authorization: `Bearer ${token}` },
            });
          } catch (err) {
            console.log(err);
            Sentry.captureException(err);
          }
        },
        start: true,
      },
    ],
  });

  Sentry.init({
    dsn: process.env.SENTRY_DSN,
    tracesSampleRate: 1.0,
  });

  // Set a custom error handler for the server that sends errors to Sentry.
  server.setErrorHandler(async (error, request, reply) => {
    console.log("Error: ", error);
    if (error.statusCode === 429) {
      return reply
        .code(429)
        .send({ message: "You've reached a limit on preview generations" });
    }
    Sentry.captureException(error);
    reply.status(500).send({ error: "Something went wrong" });
  });

  // Register a default root route.
  server.get("/", async function (request: any, reply: any) {
    reply.code(200).send({ hello: "Writesonic's model router" });
  });

  // Register a health check route.
  server.get("/healthcheck", async function (request: any, reply: any) {
    reply.code(200).send({ status: "ok" });
  });

  // Initialize Swagger documentation plugin and define the API structure.
  await initSwagger(server);

  // Initialize all routes within the application.
  initRoutes(server);

  // Run any initialization scripts needed for the application.
  await initData(server.orm);

  // Signals that server is ready to accept requests.
  await server.ready();

  // Serve Swagger-generated API documentation.
  // @ts-ignore
  server.swagger();

  return server;
}

export default buildServer;
