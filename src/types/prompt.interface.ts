import { Roles } from "../schema";

/**
 * Represents a message with role and content
 */
export interface Messages {
  role: Roles;
  content: string;
}

/**
 * Represents the properties required for prompting parameters
 */
export interface PromptParamsProperties {
  messages: Messages[];
  prompt: string;
  temperature: number;
  top_p: number;
  max_tokens: number;
  presence_penalty: number;
  frequency_penalty: number;
  n: number;
  stop: string | string[];
}
