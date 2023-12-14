// ProviderFactory.ts

import { Provider } from "./base";
import ApiError from "../library/customError";
import { Providers } from "../constants";

import { ChatOpenAIProvider } from "./chatOpenai/provider";
import { AzureChatOpenAIProvider } from "./azureChatOpenAI/provider";
import { AnthropicProvider } from "./anthropic/provider";
import { CohereProvider } from "./cohere/provider";
import { OpenAIProvider } from "./openai/provider";
import { ReplicateProvider } from "./replicate/provider";

export class ProviderFactory {
  public static createProvider(providerName: string): Provider<any> {
    console.log(providerName);
    switch (providerName) {
      case Providers.CHAT_OPENAI: {
        return new ChatOpenAIProvider();
      }
      case Providers.AZURE_CHAT_OPENAI: {
        return new AzureChatOpenAIProvider();
      }
      case Providers.OPENAI: {
        return new OpenAIProvider();
      }
      case Providers.ANTHROPIC: {
        return new AnthropicProvider();
      }
      case Providers.COHERE: {
        return new CohereProvider();
      }
      case Providers.REPLICATE: {
        return new ReplicateProvider();
      }
      default:
        throw new ApiError(400, `The provider named ${providerName} is not supported.`);
    }
  }
}
