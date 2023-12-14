import * as Sentry from "@sentry/node";

import { Provider } from "../models/Provider";
import { GetAllProvidersSchema } from "../schema/provider.schema";
import { FastifyReplyTypebox, FastifyRequestTypebox } from "../server";

/**
 * Get the active providers
 * @param {FastifyRequestTypebox<typeof GetAllProvidersSchema>} request - The request object
 * @param {FastifyReplyTypebox<typeof GetAllProvidersSchema>} reply - The reply object
 * @returns {Promise<void>} The response from the active providers
 */
export const getActiveProviders = async (
  request: FastifyRequestTypebox<typeof GetAllProvidersSchema>,
  reply: FastifyReplyTypebox<typeof GetAllProvidersSchema>,
) => {
  try {
    const response = await request.server.orm.getRepository(Provider).find();
    reply.code(200).send(response);
  } catch (e: any) {
    Sentry.captureException(e);
    reply.code(500).send(e);
  }
};
