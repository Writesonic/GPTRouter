import * as Sentry from "@sentry/node";
import { Between } from "typeorm";

import { ERROR_MESSAGES } from "../constants";
import { ModelHealthCheck } from "../models/ModelHealthCheck";
import checkAnthropicHealth from "../providers/anthropic/healthCheck";
import checkChatOpenaiHealth from "../providers/chatOpenai/healthCheck";
import checkCohereHealth from "../providers/cohere/healthCheck";
import checkOpenaiHealth from "../providers/openai/healthCheck";
import { GetHealthCheckDataSchema, HealthCheckSchema } from "../schema";
import { FastifyReplyTypebox, FastifyRequestTypebox } from "../server";

/**
 * Trigger health check for all providers and return the health check data
 *
 * @param {import('../server').FastifyRequestTypebox<import('../schema').HealthCheckSchema>} request - The Fastify request object
 * @param {import('../server').FastifyReplyTypebox<import('../schema').HealthCheckSchema>} reply - The Fastify reply object
 * @returns {Promise<import('../models/ModelHealthCheck')[]>} - The health check data from the database
 */
export const triggerHealthCheck = async (
  request: FastifyRequestTypebox<typeof HealthCheckSchema>,
  reply: FastifyReplyTypebox<typeof HealthCheckSchema>,
) => {
  try {
    const promises = [
      checkOpenaiHealth(request.server.orm),
      checkChatOpenaiHealth(request.server.orm),
      checkAnthropicHealth(request.server.orm),
      checkCohereHealth(request.server.orm),
    ];
    await Promise.all(promises);
    return await request.server.orm.getRepository(ModelHealthCheck).find();
  } catch (e: any) {
    Sentry.captureException(e);
    reply.code(500).send(e);
  }
};

/**
 * Get health check data within a specific date range
 *
 * @param {import('../server').FastifyRequestTypebox<import('../schema').GetHealthCheckDataSchema>} request - The Fastify request object
 * @param {import('../server').FastifyReplyTypebox<import('../schema').GetHealthCheckDataSchema>} reply - The Fastify reply object
 * @returns {Promise<void>} - The health check data in the specified date range
 */

export const getHealthCheckData = async (
  request: FastifyRequestTypebox<typeof GetHealthCheckDataSchema>,
  reply: FastifyReplyTypebox<typeof GetHealthCheckDataSchema>,
) => {
  try {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const { startDate, endDate } = request.query;
    const endDatePlus1 = new Date(endDate);
    const newStartDate = new Date(startDate);
    endDatePlus1.setDate(endDatePlus1.getDate() + 1);

    const data = await request.server.orm.getRepository(ModelHealthCheck).find({
      where: {
        lastChecked: Between(newStartDate, endDatePlus1),
      },
      order: {
        lastChecked: "ASC",
      },
    });

    if (!data) {
      return reply.code(404).send({
        message: ERROR_MESSAGES.HEALTH_CHECK_DATA_NOT_FOUND,
      });
    }

    const res: any = {};
    for (const healthCheck of data) {
      const { modelId, lastChecked, isAvailable, latency } = healthCheck;
      if (!res[modelId]) {
        res[modelId] = [];
      }
      res[modelId].push({
        time: lastChecked.toISOString(),
        isAvailable,
        latency,
      });
    }

    const output = Object.keys(res).map(modelId => ({
      modelId,
      data: res[modelId],
    }));

    reply.code(200).send(output);
  } catch (e: any) {
    Sentry.captureException(e);
    reply.code(500).send(e);
  }
};
