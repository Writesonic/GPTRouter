import { DataSource } from "typeorm";
import { BasePromptParams, GenerationResponseSchema } from "../schema";

export abstract class Provider<T> {

    protected abstract validateParams(params: any): T;

    protected transform(promptParams: BasePromptParams): Record<string, unknown> {
        return { ...promptParams }
    }

    async generate(modelName: string, promptParams: BasePromptParams, timeout: number, maxRetries: number): Promise<GenerationResponseSchema> {
        let params = this.transform(promptParams);
        params = { ...params, model: modelName, stream: false };
        const validatedParams = this.validateParams(params);
        return this.performGeneration(validatedParams, timeout, maxRetries);
    }

    async *generateStream(modelName: string, promptParams: BasePromptParams, timeout: number, maxRetries: number): AsyncGenerator<any> {
        let params = this.transform(promptParams);
        params = { ...params, model: modelName, stream: true };
        const validatedParams = this.validateParams(params);
        for await (const messageEvent of this.performStreamGeneration(validatedParams, timeout, maxRetries)) {
            yield messageEvent;
        }
    }

    protected abstract performGeneration(params: T, timeout: number, maxRetries: number): Promise<GenerationResponseSchema>;

    protected abstract performStreamGeneration(params: T, timeout: number, maxRetries: number): AsyncGenerator<any>;

    public abstract tokenUsage(params: T, completionText: string): Promise<any>;

    // TODO: Handle orm related operations outside the abstract class
    public abstract healthCheck(orm: DataSource): Promise<boolean>;
}


export default Provider;
