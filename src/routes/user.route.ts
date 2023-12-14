import { FastifyInstance } from "fastify";

import { verifyUser } from "../controllers";
import { LoginSchema } from "../schema";

/**
 * Handles the user routes for login
 * @param {FastifyInstance} server - The Fastify server instance
 * @returns {Promise<void>} - A Promise that resolves when the route handling is complete
 */
async function userRouter(server: FastifyInstance) {
  server.post("/login", { schema: LoginSchema }, verifyUser);
}

export default userRouter;
