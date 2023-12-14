import { Static, Type } from '@sinclair/typebox'

/**
 * Provider Schema
 */
export const ProviderSchema = Type.Object({
    id: Type.String({ format: 'uuid' }),
    name: Type.String(),
    createdAt: Type.Date(),
    updatedAt: Type.Date(),
})

/**
 * Get All Providers Schema
 */
export const GetAllProvidersSchema = {
    summary: 'Get all providers',
    response: {
        200: Type.Array(ProviderSchema)
    }
}

/**
 * Type definition for Provider Schema
 */
export type ProviderSchema = Static<typeof ProviderSchema>