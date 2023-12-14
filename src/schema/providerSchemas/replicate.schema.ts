import { Static, Type } from "@sinclair/typebox";

export const ReplicateInputParamsSchema = Type.Object({
  prompt: Type.String(),
  image_url: Type.String(),
  temperature: Type.Optional(Type.Number()),
  top_p: Type.Optional(Type.Number()),
  max_tokens: Type.Optional(Type.Number()),
});

export type ReplicateInputParamsSchema = Static<typeof ReplicateInputParamsSchema>;
