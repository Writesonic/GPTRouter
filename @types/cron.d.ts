declare module 'cron' {
    export class CronJob {
        constructor(
            cronTime: string,
            onTick: () => void,
            onComplete?: () => void,
            start?: boolean,
            timeZone?: string,
            context?: any
        );

        start(): void;
        stop(): void;
        // Add other methods and properties as needed
    }
    export = CronJob;
}
