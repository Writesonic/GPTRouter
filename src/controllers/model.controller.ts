import * as Sentry from "@sentry/node";

import { ERROR_MESSAGES } from "../constants";
import { Model } from "../models/Model";
import { GetAllModelsSchema, GetModelByIdSchema } from "../schema";
import { FastifyReplyTypebox, FastifyRequestTypebox } from "../server";

/**
 * Get all models from the database.
 * @param {FastifyRequestTypebox<typeof GetAllModelsSchema>} request - The Fastify request object.
 * @param {FastifyReplyTypebox<typeof GetAllModelsSchema>} reply - The Fastify reply object.
 * @returns {Promise<void>} - A Promise that resolves when the operation is complete.
 */
export const getAllModels = async (
  request: FastifyRequestTypebox<typeof GetAllModelsSchema>,
  reply: FastifyReplyTypebox<typeof GetAllModelsSchema>,
) => {
  try {
    const data = await request.server.orm
      .getRepository(Model)
      .find({ relations: ["provider"], order: { order: "ASC" } });
    const res = data.map(model => ({
      id: model.id,
      name: model.name,
      providerId: model.providerId,
      providerName: model.provider.name,
      createdAt: model.createdAt,
      updatedAt: model.updatedAt,
      inputType: model.inputType,
      order: model.order,
    }));
    reply.code(200).send(res);
  } catch (e: any) {
    Sentry.captureException(e);
    reply.code(500).send(e);
  }
};

/**
 * Get a model by its ID from the database.
 * @param {FastifyRequestTypebox<typeof GetModelByIdSchema>} request - The Fastify request object.
 * @param {FastifyReplyTypebox<typeof GetModelByIdSchema>} reply - The Fastify reply object.
 * @returns {Promise<void>} - A Promise that resolves when the operation is complete.
 */
export const getModelById = async (
  request: FastifyRequestTypebox<typeof GetModelByIdSchema>,
  reply: FastifyReplyTypebox<typeof GetModelByIdSchema>,
) => {
  try {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const { id } = request.params;
    const response = await request.server.orm.getRepository(Model).findOne({ where: { id: id } });
    if (!response) {
      reply.code(404).send({ message: ERROR_MESSAGES.MODEL_NOT_FOUND });
    }
    if (response) reply.code(200).send(response);
  } catch (e: any) {
    Sentry.captureException(e);
    reply.code(500).send(e);
  }
};
