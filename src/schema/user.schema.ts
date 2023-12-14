import { Static, Type } from "@sinclair/typebox";

import { UserRole } from "../constants";

/**
 * Represents the user schema with id, email, password, and role.
 */
export const UserSchema = Type.Object({
  id: Type.String({ format: "uuid" }),
  email: Type.String(),
  password: Type.String(),
  role: Type.Enum(UserRole),
  apikey: Type.Optional(Type.String()),
});

/**
 * Represents the user schema with id, email, password, role, and token.
 */
export const UserSchemaWithToken = Type.Object({
  id: Type.String({ format: "uuid" }),
  email: Type.String(),
  password: Type.String(),
  role: Type.Enum(UserRole),
  token: Type.String(),
});

/**
 * Represents the login schema for request and response.
 */
export const LoginSchema = {
  body: Type.Object({
    email: Type.String(),
    password: Type.String(),
  }),
  response: {
    200: UserSchemaWithToken,
    401: Type.Object({
      message: Type.String(),
    }),
    404: Type.Object({
      message: Type.String(),
    }),
  },
};

/**
 * Represents the static type of the user schema.
 */
export type UserSchema = Static<typeof UserSchema>;
