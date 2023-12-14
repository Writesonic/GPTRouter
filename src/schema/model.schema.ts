import { Static, Type } from "@sinclair/typebox";
import { ModelInputType } from "../constants";

/**
 * Define the schema for a model including its properties and types.
 */
export const ModelSchema = Type.Object({
  id: Type.String({ format: "uuid" }),
  name: Type.String(),
  providerId: Type.String({ format: "uuid" }),
  createdAt: Type.Date(),
  updatedAt: Type.Date(),
  providerName: Type.Optional(Type.String()),
  inputType: Type.Enum(ModelInputType),
  order: Type.Number(),
});

/**
 * Define the response schema for getting all models.
 */
export const GetAllModelsSchema = {
  description: "Get all models",
  summary: "Get All Models",
  response: {
    200: Type.Array(ModelSchema),
  },
};

/**
 * Define the parameter and response schema for getting a model by its identifier.
 */
export const GetModelByIdSchema = {
  summary: "Get All Models by Id",
  params: {
    id: Type.String({ format: "uuid" }),
  },
  response: {
    200: ModelSchema,
    404: Type.Object({
      message: Type.String(),
    }),
  },
};

/**
 * Define the TypeScript type for the model schema.
 */
export type ModelSchema = Static<typeof ModelSchema>;
