import { FastifyInstance } from "fastify";

import { createPrompt, deletePrompt, getAllPrompts, getPromptById, optimizePrompt, updatePrompt } from "../controllers";
import {
  CreatePromptSchema,
  DeletePromptSchema,
  GetAllPromptsSchema,
  GetPromptByIdSchema,
  OptimizePromptSchema,
  UpdatePromptSchema,
} from "../schema";

/**
 * Registers prompt related routes and their corresponding handlers.
 * @param {FastifyInstance} server - The Fastify server instance.
 * @returns {void}
 */
async function promptRouter(server: FastifyInstance) {
  server.get("/all", { schema: GetAllPromptsSchema, onRequest: [server.authenticate] }, getAllPrompts);
  server.get("/:id", { schema: GetPromptByIdSchema, onRequest: [server.authenticate] }, getPromptById);
  server.post("", { schema: CreatePromptSchema, onRequest: [server.authenticate] }, createPrompt);
  server.put("/:id", { schema: UpdatePromptSchema, onRequest: [server.authenticate] }, updatePrompt);
  server.delete("/:id", { schema: DeletePromptSchema, onRequest: [server.authenticate] }, deletePrompt);
  server.post("/optimize", { schema: OptimizePromptSchema, onRequest: [server.authenticate] }, optimizePrompt);
}

export default promptRouter;
