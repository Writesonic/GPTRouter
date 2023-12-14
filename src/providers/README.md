# Adding a New Provider: A Walkthrough for Developers

This guide explains the process of integrating a new provider into our existing system, which is designed to handle interactions with various LLMs.

## Step 1: Define Provider-Specific Schema

Create a TypeScript schema file that defines the parameters accepted by the new provider's API. Place this file in the `schema/providerSchemas` directory.

```typescript
// src/schema/providerSchemas/yourProvider.schema.ts

import { object, string, number, TypeOf } from "zod";

export const YourProviderInputParamsSchema = object({
  // Define the schema based on the API's expected parameters
  model: string(),
  prompt: string(),
  max_tokens: number().optional(), // Example parameter
  // Add other necessary parameters here
});

export type YourProviderInputParams = TypeOf<typeof YourProviderInputParamsSchema>;
```

## Step 2: Implement Provider Class

Create a new class for the provider in the `providers` directory. This class should extend the abstract `Provider` class and implement the required methods.

```typescript
// src/providers/yourProvider/provider.ts

import { DataSource } from "typeorm";
import { Provider } from "../../base";
import {
  YourProviderInputParams,
  YourProviderInputParamsSchema,
} from "../../schema/providerSchemas/yourProvider.schema";
import { validateData } from "../../utils/schemaValidator";
import { GenerationResponseSchema } from "../../schema";

export class YourProvider extends Provider<YourProviderInputParams> {
  protected mapParameters(params: BasePromptParams): YourProviderInputParams {
    // If your provider needs specific parameter transformation, define it here
    // Otherwise, keep the default behavior by returning the params as is
  }

  protected validateParams(params: YourProviderInputParams): YourProviderInputParams {
    return validateData<YourProviderInputParams>(YourProviderInputParamsSchema, params);
  }

  // Implement performGeneration, performStreamGeneration, tokenUsage, and healthCheck
  // according to your provider's API documentation and the structure of the abstract Provider class
}
```

## Step 3: Add to Provider Factory

Include your new provider in the provider factory `ProviderFactory` to allow dynamic instantiation based on the provider's name.

```typescript
// src/providers/factory.ts

import { YourProvider } from "./yourProvider/provider";
// Other imports

export class ProviderFactory {
  static createProvider(providerName: string): Provider<any> {
    switch (providerName) {
      // Other cases
      case "YourProvider":
        return new YourProvider();
      default:
        throw new Error(`Provider ${providerName} not supported.`);
    }
  }
}
```

## Step 4: Provider-Specific Methods

Implement additional methods required by your provider's API. If your provider supports streaming, for example, ensure you have implemented the generator functions correctly.

## Step 5: Test ✅✅

By following these steps, you'll be able to integrate a new provider into the system smoothly. Always ensure that you adhere to best practices, such as code readability, maintainability, and comprehensive testing.
