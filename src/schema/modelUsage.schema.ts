import { Static, Type } from '@sinclair/typebox'

/**
 * ModelUsageSchema defines the schema for the model usage.
 */
export const ModelUsageSchema = Type.Object({
    id: Type.String({ format: 'uuid' }),
    modelId: Type.String({ format: 'uuid' }),
    providerId: Type.String({ format: 'uuid' }),
    userId: Type.String({ format: 'uuid' }),
    promptTokens: Type.Number(),
    completionTokens: Type.Number(),
    totalTokens: Type.Number(),
    createdAt: Type.Date(),
})

/**
 * ModelUsageOutput defines the output schema for the model usage.
 */
export const ModelUsageOutput = Type.Object({
    promptTokens: Type.Number(),
    completionTokens: Type.Number(),
    totalTokens: Type.Number(),
    cost: Type.Number({ format: 'float' }),
    createdAt: Type.String({ format: 'date-time' }),
})

/**
 * GetAllUsageByModelSchema defines the schema for getting all usage for a model.
 */
export const GetAllUsageByModelSchema = {
    summary: 'Get All Usage by Model',
    params: {
        startDate: Type.String({ format: 'date-time' }),
        endDate: Type.String({ format: 'date-time' }),
    },
    response: {
        200: Type.Array(Type.Object({
            modelId: Type.String({ format: 'uuid' }),
            data: Type.Array(ModelUsageOutput)
        })),
        404: Type.Object({
            message: Type.String(),
        }),
    }
}

/**
 * ModelUsageSchema represents the static type of ModelUsageSchema.
 */
export type ModelUsageSchema = Static<typeof ModelUsageSchema>