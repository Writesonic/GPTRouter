import { Static, Type } from '@sinclair/typebox'

/**
 * Defines the structure of a base health check object.
 */
export const BaseHealthCheck = Type.Object({
    id: Type.String({ format: 'uuid' }),
    modelId: Type.String({ format: 'uuid' }),
    providerId: Type.String({ format: 'uuid' }),
    status: Type.String(),
    isAvailable: Type.Boolean(),
    latency: Type.Optional(Type.Number()),
    lastChecked: Type.String({ format: 'date-time' }),
})

/**
 * Defines the structure of a health check output object.
 */
export const HealthCheckOutput = Type.Object({
    time: Type.String({ format: 'date-time' }),
    isAvailable: Type.Boolean(),
    latency: Type.Number({ format: 'float' }),
})

/**
 * Defines the response schema for the health check endpoint.
 */
export const HealthCheckSchema = {
    summary: 'Application Health Check',
    response: {
        200: Type.Array(BaseHealthCheck)
    }
}

/**
 * Defines the request and response schema for the GetHealthCheckData endpoint.
 */
export const GetHealthCheckDataSchema = {
    summary: 'Get Health Check Data',
    params: {
        startDate: Type.String({ format: 'date-time' }),
        endDate: Type.String({ format: 'date-time' }),
    },
    response: {
        200: Type.Array(Type.Object({
            modelId: Type.String({ format: 'uuid' }),
            data: Type.Array(HealthCheckOutput)
        })),
        404: Type.Object({
            message: Type.String(),
        }),
    }
}



/**
 * Defines the type for the base health check object.
 */
export type BaseHealthCheck = Static<typeof BaseHealthCheck>
