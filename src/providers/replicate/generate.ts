import dotenv from "dotenv";
import Replicate from "replicate";

import { ReplicateInputParamsSchema } from "../../schema/providerSchemas/replicate.schema";
dotenv.config();

export default async function generateResponse({
  params,
  stream = false,
  timeout,
  maxRetries,
}: {
  params: ReplicateInputParamsSchema;
  stream?: boolean;
  timeout: number;
  maxRetries: number;
}): Promise<any> {
  const replicate = new Replicate({
    auth: process.env.REPLICATE_API_TOKEN,
  });

  if (stream) {
    const response = await replicate.deployments.predictions.create("writesonic", "sonic-image-gpt", {
      input: {
        prompt: params.prompt,
        image: params.image_url,
      },
      stream: stream,
    });
    return response;
  } else {
    let prediction = await replicate.deployments.predictions.create("writesonic", "sonic-image-gpt", {
      input: {
        prompt: params.prompt,
        image: params.image_url,
      },
    });
    prediction = await replicate.wait(prediction);
    const response = prediction.output.join("");
    return response;
  }
}
