import { DataSource } from "typeorm";
import { Provider } from '../base';
import { AnthropicInputParamsSchema } from '../../schema/providerSchemas/anthropic.schema';
import { validateData } from '../../utils/schemaValidator';
import { BasePromptParams, GenerationResponseSchema, MessagesSchema, Roles } from '../../schema'
import { SSE_EVENTS } from "../../constants";
import generateResponse from "./generate";
import getTokenUsage from "./tokenUsage";
import checkAnthropicHealth from "./healthCheck";

export class AnthropicProvider extends Provider<AnthropicInputParamsSchema> {

  protected validateParams(params: any): AnthropicInputParamsSchema {
    return validateData<AnthropicInputParamsSchema>(AnthropicInputParamsSchema, params);
  }

  protected async performGeneration(params: AnthropicInputParamsSchema, timeout: number, maxRetries: number): Promise<GenerationResponseSchema> {
    const response = await generateResponse({ params: params, stream: false, timeout, maxRetries });
    return {
      id: response?.log_id,
      choices: [
        {
          index: 0,
          text: response?.completion,
          finish_reason: response?.stop_reason,
        }
      ],
      model: response?.model,
      meta: {
        usage: await this.tokenUsage(params, response?.completion),
      },
    }
  }

  protected convertMessagesToAnthropicPrompt(messages: Array<MessagesSchema>) {
    let text = "";

    for (const message of messages) {
      if (message.role === Roles.user) {
        text += `\n\nHuman: ${message.content}`;
      } else if (message.role === Roles.assistant) {
        text += `\n\nAssistant: ${message.content}`;
      } else if (message.role === Roles.system) {
        text += message.content;
      }
    }
    if (!text.endsWith('\n\nAssistant:')) {
      text += '\n\nAssistant:';
    }
    return text;
  }

  protected override transform(promptParams: BasePromptParams): Record<string, unknown> {
    let params: Record<string, unknown> = { ...promptParams } 
    if (promptParams?.max_tokens !== undefined && promptParams?.max_tokens !== null) {
      params.max_tokens_to_sample = params?.max_tokens;
    } else {
      params.max_tokens_to_sample = 1000;
    }
    if (promptParams?.messages !== undefined && promptParams?.messages) {
      params.prompt = this.convertMessagesToAnthropicPrompt(promptParams?.messages);
    }
    delete params.messages;
    return params
  }

  protected async *performStreamGeneration(params: AnthropicInputParamsSchema, timeout: number, maxRetries: number): AsyncGenerator<any> {
    const response = await generateResponse({ params: params, stream: true, timeout, maxRetries });
    let texts = "";
    for await (const message of response) {
      const text = message?.completion;
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

  public async tokenUsage(params: AnthropicInputParamsSchema, completionText: string): Promise<any> {
    return getTokenUsage(params.prompt, completionText);
  }

  public async healthCheck(orm: DataSource): Promise<boolean> {
    return checkAnthropicHealth(orm);
  }
}
