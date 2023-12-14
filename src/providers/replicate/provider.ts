import { DataSource } from "typeorm";

import { ImageChatModels, SSE_EVENTS } from "../../constants";
import ApiError from "../../library/customError";
import { GenerationResponseSchema } from "../../schema";
import { ReplicateInputParamsSchema } from "../../schema/providerSchemas/replicate.schema";
import { createEventStream } from "../../utils/createEventStream";
import { validateData } from "../../utils/schemaValidator";
import { Provider } from "../base";
import generateResponse from "./generate";

export class ReplicateProvider extends Provider<ReplicateInputParamsSchema> {
  protected validateParams(params: any): ReplicateInputParamsSchema {
    return validateData<ReplicateInputParamsSchema>(ReplicateInputParamsSchema, params);
  }

  protected async performGeneration(
    params: ReplicateInputParamsSchema,
    timeout: number,
    maxRetries: number,
  ): Promise<GenerationResponseSchema> {
    const response = await generateResponse({ params: params, stream: false, timeout, maxRetries });
    return {
      id: response?.id,
      choices: [
        {
          index: 0,
          text: response,
          finish_reason: "",
        },
      ],
      model: ImageChatModels.LLAVA,
      meta: {},
    };
  }

  protected async *performStreamGeneration(
    params: ReplicateInputParamsSchema,
    timeout: number,
    maxRetries: number,
  ): AsyncGenerator<any> {
    const response = await generateResponse({ params: params, stream: true, timeout, maxRetries });

    if (response && response.urls && response.urls.stream) {
      for await (const event of createEventStream(response.urls.stream)) {
        if (event?.type === "output") {
          yield {
            id: event?.lastEventId,
            event: SSE_EVENTS.UPDATE,
            data: {
              text: event?.data,
              model: ImageChatModels.LLAVA,
            },
          };
        } else if (event?.type === "error") {
          yield {
            id: event?.lastEventId,
            event: SSE_EVENTS.ERROR,
            message: event?.data,
          };
        }
      }
    } else {
      throw new ApiError(500, "No stream url found");
    }
  }

  public async tokenUsage(params: ReplicateInputParamsSchema, completionText: string): Promise<any> {
    // TODO: Implement tokenUsage for replicate
    throw new Error("Method 'tokenUsage()' not implemented.");
  }

  public async healthCheck(orm: DataSource): Promise<boolean> {
    // TODO: Implement healthCheck for replicate
    throw new Error("Method 'healthCheck()' not implemented.");
  }
}
