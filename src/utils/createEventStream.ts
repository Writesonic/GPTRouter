import * as Sentry from "@sentry/node";
import EventSource from "eventsource";

export function createEventStream(url: string): AsyncIterable<any> {
  return {
    async *[Symbol.asyncIterator]() {
      const source = new EventSource(url, { withCredentials: true });
      let pullControl: (value: any) => void;
      let pushValue: any | Promise<any> = new Promise(resolve => (pullControl = resolve));

      const push = (value: any) => {
        if (pullControl) {
          pullControl(value);
          pushValue = new Promise(resolve => (pullControl = resolve));
        }
      };

      source.addEventListener("output", e => {
        push(e);
      });

      source.addEventListener("error", e => {
        Sentry.captureException(e);
        push({
          type: "error",
          lastEventId: e.lastEventId,
          data: e?.data || "Error in response stream",
        });
      });

      source.addEventListener("done", () => {
        source.close();
        push(undefined); // Signal the iterator to finish
      });

      while (true) {
        const value = await pushValue;
        if (value === undefined) return; // If undefined is pushed, break out of the loop
        if (value instanceof Error) throw value; // If an error is pushed, throw it
        yield value; // Yield the event data
      }
    },
  };
}
