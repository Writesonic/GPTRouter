import { DataSource } from "typeorm";
import { Provider } from '../base';
import { OpenaiInputParamsSchema } from '../../schema/providerSchemas/openai.schema';
import { validateData } from '../../utils/schemaValidator';
import { GenerationResponseSchema } from '../../schema'
import { SSE_EVENTS } from "../../constants";
import generateResponse from "./generate";
import getTokenUsage from "./tokenUsage";
import checkOpenaiHealth from "./healthCheck";


export class OpenAIProvider extends Provider<OpenaiInputParamsSchema> {

  protected validateParams(params: any): OpenaiInputParamsSchema {
    return validateData<OpenaiInputParamsSchema>(OpenaiInputParamsSchema, params);
  }

  protected async performGeneration(params: OpenaiInputParamsSchema, timeout: number, maxRetries: number): Promise<GenerationResponseSchema> {
    const response = await generateResponse({ params: params, stream: false, isAzure: false, timeout, maxRetries });
    return {
      id: response?.id,
      choices: response?.choices?.map((choice: Record<string, any>) => {
        return {
          text: choice?.text,
          index: choice?.index,
          finish_reason: choice?.finish_reason,
        }
      }),
      model: response?.model,
      meta: {
        usage: response?.usage,
      }
    }
  }

  protected async *performStreamGeneration(params: OpenaiInputParamsSchema, timeout: number, maxRetries: number): AsyncGenerator<any> {
    const response = await generateResponse({ params: params, stream: true, isAzure: false, timeout, maxRetries });
    let texts = ""
    for await (const message of response) {
      const text = message?.choices?.[0]?.text;
      if (text) {
        texts += text;
        yield {
          id: message?.id,
          event: SSE_EVENTS.UPDATE,
          data: {
            text: text,
            model: message?.model,
          }
        };
      }
    }
    yield {
      event: SSE_EVENTS.META,
      data: {
        text: texts,
        usage: await this.tokenUsage(params, texts)
      }
    }
  }

  public async tokenUsage(params: OpenaiInputParamsSchema, completionText: string): Promise<any> {
    return getTokenUsage(params.prompt, completionText, params.model);
  }

  public async healthCheck(orm: DataSource): Promise<boolean> {
    return checkOpenaiHealth(orm);
  }
}
