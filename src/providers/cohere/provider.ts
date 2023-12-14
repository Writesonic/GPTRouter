import { DataSource } from "typeorm";

import { Providers } from "../../constants";
import ApiError from "../../library/customError";
import { BasePromptParams, GenerationResponseSchema } from "../../schema";
import { CohereInputParamsSchema } from "../../schema/providerSchemas/cohere.schema";
import { validateData } from "../../utils/schemaValidator";
import { Provider } from "../base";
import generateResponse from "./generate";
import checkCohereHealth from "./healthCheck";
import getTokenUsage from "./tokenUsage";

export class CohereProvider extends Provider<CohereInputParamsSchema> {
  protected validateParams(params: any): CohereInputParamsSchema {
    return validateData<CohereInputParamsSchema>(CohereInputParamsSchema, params);
  }

  protected async performGeneration(
    params: CohereInputParamsSchema,
    timeout: number,
    maxRetries: number,
  ): Promise<GenerationResponseSchema> {
    const response = await generateResponse({ params: params, stream: false, timeout, maxRetries });
    return {
      id: response?.id,
      choices: response?.generations?.map((generation: any, index: number) => {
        return {
          text: generation?.text,
          index: index,
          finish_reason: generation?.finish_reason || "",
        };
      }),
      model: params.model,
      meta: {
        usage: await this.tokenUsage(params, response?.generations[0]?.text),
      },
    };
  }

  protected override transform(promptParams: BasePromptParams): Record<string, unknown> {
    let params: Record<string, unknown> = { ...promptParams };
    if (promptParams?.n !== undefined && promptParams?.n !== null) {
      params.num_generations = params?.n;
    }
    return params;
  }

  protected async *performStreamGeneration(
    params: CohereInputParamsSchema,
    timeout: number,
    maxRetries: number,
  ): AsyncGenerator<any> {
    throw new ApiError(400, `Stream not supported for provider ${Providers.COHERE}`);
  }

  public async tokenUsage(params: CohereInputParamsSchema, completionText: string): Promise<any> {
    return getTokenUsage(params.prompt, completionText);
  }

  public async healthCheck(orm: DataSource): Promise<boolean> {
    return checkCohereHealth(orm);
  }
}
