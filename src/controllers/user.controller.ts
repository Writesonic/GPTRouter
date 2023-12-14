import { ERROR_MESSAGES } from "../constants";
import { User } from "../models/User"
import { LoginSchema } from "../schema"
import { FastifyReplyTypebox, FastifyRequestTypebox } from "../server"
import * as Sentry from "@sentry/node";


/**
 * Verify the user based on the given request and reply objects
 * @async
 * @param {FastifyRequestTypebox<typeof LoginSchema>} request - The Fastify request object with validated body schema
 * @param {FastifyReplyTypebox<typeof LoginSchema>} reply - The Fastify reply object with validated body schema
 * @returns {Promise<void>}  A Promise that resolves with the user data and token if successful
 */
export const verifyUser = async (
    request: FastifyRequestTypebox<typeof LoginSchema>,
    reply: FastifyReplyTypebox<typeof LoginSchema>
) => {
    try {
        const user = await request.server.orm.getRepository(User).findOne({ where: { email: request.body.email } })
        if (!user) {
            reply.code(404).send({ message: ERROR_MESSAGES.USER_NOT_FOUND })
            return;
        }
        if (user?.password !== request.body.password) {
            reply.code(401).send(
                {
                    message: ERROR_MESSAGES.INCORRECT_PASSWORD
                }
            )
            return;
        }
        else {
            // @ts-ignore
            const token = await reply.jwtSign({
                id: user?.id,
                email: user?.email,
                password: user?.password
            })
            reply.code(200).send({
                ...user,
                token
            })
        }
    }
    catch (e: any) {
        Sentry.captureException(e);
        reply.code(500).send(e)
    }
}