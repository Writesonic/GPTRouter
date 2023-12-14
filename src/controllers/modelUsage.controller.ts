import * as Sentry from "@sentry/node";
import { Between } from "typeorm";

import { ERROR_MESSAGES } from "../constants";
import { ModelUsage } from "../models/ModelUsage";
import { GetAllUsageByModelSchema } from "../schema/modelUsage.schema";
import { FastifyReplyTypebox, FastifyRequestTypebox } from "../server";

/**
 * Get usage data by model
 * @param {FastifyRequestTypebox<typeof GetAllUsageByModelSchema>} request - the request object
 * @param {FastifyReplyTypebox<typeof GetAllUsageByModelSchema>} reply - the reply object
 * @returns {Promise<void>} - returns a promise with the usage data as response
 */
export const getUsageDataByModel = async (
  request: FastifyRequestTypebox<typeof GetAllUsageByModelSchema>,
  reply: FastifyReplyTypebox<typeof GetAllUsageByModelSchema>,
) => {
  try {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const { startDate, endDate } = request.query;
    const endDatePlus1 = new Date(endDate);
    const newStartDate = new Date(startDate);
    endDatePlus1.setDate(endDatePlus1.getDate() + 1);

    const data = await request.server.orm.getRepository(ModelUsage).find({
      where: {
        createdAt: Between(newStartDate, endDatePlus1),
      },
      order: {
        createdAt: "ASC",
      },
    });

    if (!data) {
      return reply.code(404).send({
        message: ERROR_MESSAGES.MODEL_USAGE_DATA_NOT_FOUND,
      });
    }

    const res: any = {};
    for (const usage of data) {
      const { modelId, promptTokens, completionTokens, totalTokens, createdAt, cost } = usage;
      if (!res[modelId]) {
        res[modelId] = [];
      }
      res[modelId].push({
        promptTokens: promptTokens,
        completionTokens: completionTokens,
        totalTokens: totalTokens,
        createdAt: createdAt?.toISOString(),
        cost: cost,
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
