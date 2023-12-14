export const STABLE_DIFFUSION_API_URL = "https://api.stability.ai/v1/generation";

export const STABLE_DIFFUSION_TEXT_TO_IMAGE = "text-to-image";

export enum Providers {
  OPENAI = "openai",
  CHAT_OPENAI = "chat_openai",
  ANTHROPIC = "anthropic",
  AZURE_CHAT_OPENAI = "azure_chat_openai",
  COHERE = "cohere",
  REPLICATE = "replicate",
}

/**
 * Enum representing the different types of model input.
 */
export enum ModelInputType {
  PROMPT = "prompt",
  MESSAGES = "messages",
}

/**
 * Enum representing different user roles.
 */
export enum UserRole {
  SUPER_ADMIN = "super_admin",
  ADMIN = "admin",
}

export enum ResponseFormatType {
  TEXT = "text",
  JSON_OBJECT = "json_object",
}

/**
 * Array of model objects with provider, name, input type, order, input and output cost, and cost factor.
 */
export const models = [
  {
    provider: Providers.CHAT_OPENAI,
    name: "gpt-3.5-turbo-1106",
    inputType: ModelInputType.MESSAGES,
    order: 1,
    inputCost: 0.001,
    outputCost: 0.002,
    costFactor: 1000,
  },
  {
    provider: Providers.CHAT_OPENAI,
    name: "gpt-3.5-turbo-0613",
    inputType: ModelInputType.MESSAGES,
    order: 2,
    inputCost: 0.0015,
    outputCost: 0.002,
    costFactor: 1000,
  },
  {
    provider: Providers.CHAT_OPENAI,
    name: "gpt-3.5-turbo-16k-0613",
    inputType: ModelInputType.MESSAGES,
    order: 3,
    inputCost: 0.003,
    outputCost: 0.004,
    costFactor: 1000,
  },
  {
    provider: Providers.CHAT_OPENAI,
    name: "gpt-4-0613",
    inputType: ModelInputType.MESSAGES,
    order: 4,
    inputCost: 0.03,
    outputCost: 0.06,
    costFactor: 1000,
  },
  {
    provider: Providers.CHAT_OPENAI,
    name: "gpt-4-1106-preview",
    inputType: ModelInputType.MESSAGES,
    order: 5,
    inputCost: 0.01,
    outputCost: 0.03,
    costFactor: 1000,
  },
  {
    provider: Providers.CHAT_OPENAI,
    name: "gpt-4-32k-0613",
    inputType: ModelInputType.MESSAGES,
    order: 6,
    inputCost: 0.06,
    outputCost: 0.12,
    costFactor: 1000,
  },
  {
    provider: Providers.AZURE_CHAT_OPENAI,
    name: "gpt-35-turbo",
    inputType: ModelInputType.MESSAGES,
    order: 7,
    inputCost: 0.0015,
    outputCost: 0.002,
    costFactor: 1000,
  },
  {
    provider: Providers.AZURE_CHAT_OPENAI,
    name: "gpt-35-turbo-16k",
    inputType: ModelInputType.MESSAGES,
    order: 8,
    inputCost: 0.003,
    outputCost: 0.004,
    costFactor: 1000,
  },
  {
    provider: Providers.AZURE_CHAT_OPENAI,
    name: "gpt-4",
    inputType: ModelInputType.MESSAGES,
    order: 9,
    inputCost: 0.03,
    outputCost: 0.06,
    costFactor: 1000,
  },
  {
    provider: Providers.AZURE_CHAT_OPENAI,
    name: "gpt-4-turbo",
    inputType: ModelInputType.MESSAGES,
    order: 10,
    inputCost: 0.01,
    outputCost: 0.03,
    costFactor: 1000,
  },
  {
    provider: Providers.AZURE_CHAT_OPENAI,
    name: "gpt-4-32k",
    inputType: ModelInputType.MESSAGES,
    order: 11,
    inputCost: 0.06,
    outputCost: 0.12,
    costFactor: 1000,
  },
  {
    provider: Providers.OPENAI,
    name: "gpt-3.5-turbo-instruct",
    inputType: ModelInputType.PROMPT,
    order: 12,
    inputCost: 0.0015,
    outputCost: 0.002,
    costFactor: 1000,
  },
  {
    provider: Providers.OPENAI,
    name: "text-davinci-003",
    inputType: ModelInputType.PROMPT,
    order: 13,
    inputCost: 0.02,
    outputCost: 0.02,
    costFactor: 1000,
  },
  {
    provider: Providers.OPENAI,
    name: "text-ada-001",
    inputType: ModelInputType.PROMPT,
    order: 14,
    inputCost: 0.02,
    outputCost: 0.02,
    costFactor: 1000,
  },
  {
    provider: Providers.OPENAI,
    name: "text-babbage-001",
    inputType: ModelInputType.PROMPT,
    order: 15,
    inputCost: 0.02,
    outputCost: 0.02,
    costFactor: 1000,
  },
  {
    provider: Providers.OPENAI,
    name: "text-curie-001",
    inputType: ModelInputType.PROMPT,
    order: 16,
    inputCost: 0.02,
    outputCost: 0.02,
    costFactor: 1000,
  },
  {
    provider: Providers.OPENAI,
    name: "ada-instruct-beta",
    inputType: ModelInputType.PROMPT,
    order: 17,
    inputCost: 0.02,
    outputCost: 0.02,
    costFactor: 1000,
  },
  {
    provider: Providers.OPENAI,
    name: "babbage-instruct-beta",
    inputType: ModelInputType.PROMPT,
    order: 18,
    inputCost: 0.02,
    outputCost: 0.02,
    costFactor: 1000,
  },
  {
    provider: Providers.OPENAI,
    name: "curie-instruct-beta",
    inputType: ModelInputType.PROMPT,
    order: 19,
    inputCost: 0.02,
    outputCost: 0.02,
    costFactor: 1000,
  },
  {
    provider: Providers.ANTHROPIC,
    name: "claude-instant-1.1",
    inputType: ModelInputType.PROMPT,
    order: 20,
    inputCost: 1.63,
    outputCost: 5.51,
    costFactor: 1000000,
  },
  {
    provider: Providers.ANTHROPIC,
    name: "claude-instant-1.2",
    inputType: ModelInputType.PROMPT,
    order: 21,
    inputCost: 1.63,
    outputCost: 5.51,
    costFactor: 1000000,
  },
  {
    provider: Providers.ANTHROPIC,
    name: "claude-2",
    inputType: ModelInputType.PROMPT,
    order: 22,
    inputCost: 8.0,
    outputCost: 24.0,
    costFactor: 1000000,
  },
  {
    provider: Providers.ANTHROPIC,
    name: "claude-2.1",
    inputType: ModelInputType.PROMPT,
    order: 23,
    inputCost: 8.0,
    outputCost: 24.0,
    costFactor: 1000000,
  },
  {
    provider: Providers.COHERE,
    name: "command",
    inputType: ModelInputType.PROMPT,
    order: 24,
    inputCost: 15.0,
    outputCost: 15.0,
    costFactor: 1000000,
  },
];
/**
 * Enum representing error messages.
 */

export enum ImageVendor {
  DALL_E = "dall-e",
  STABLE_DIFFUSION = "stable-diffusion",
}
export enum ERROR_MESSAGES {
  INCORRECT_PASSWORD = "Incorrect Password",
  USER_NOT_FOUND = "User not found",
  PROMPT_NOT_FOUND = "Prompt not found",
  MODEL_NOT_FOUND = "Model not found",
  NO_MODELS_AVAILABLE = "No models available",
  HEALTH_CHECK_DATA_NOT_FOUND = "No health check data found",
  MODEL_USAGE_DATA_NOT_FOUND = "No model usage data found",
}

/**
 * Enum representing server-sent events.
 */
export enum SSE_EVENTS {
  UPDATE = "update",
  META = "meta",
  ERROR = "error",
  GENERATION_SOURCE = "generation_source",
  END = "end",
}

export enum ImageChatModels {
  GPT_4_VISION_PREVIEW = "gpt-4-vision-preview",
  LLAVA = "llava",
}
/**
 * Expression representing the cron job for health check.
 */

export const HEALTH_CHECK_CRON_JOB_EXPRESSION = "*/5 * * * *";

export const DEFAULT_TIMEOUT_IN_MS = 60 * 1000;
export const DEFAULT_MAX_RETRIES = 3;

export const MODEL_LATENCY_LIMIT_FOR_GENERATION = 4000;

export const STABLE_DIFFUSION_IMAGE_GENERATION_PARAMS = {
  steps: 40,
  seed: 0,
  cfg_scale: 5,
};

export const STABLE_DIFFUSION_IMAGE_GENERATION_PARAMS_HEIGHT = 1024;
export const STABLE_DIFFUSION_IMAGE_GENERATION_PARAMS_WIDTH = 1024;
