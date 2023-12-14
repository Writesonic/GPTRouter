/**
 * Asynchronously converts a stream of chunks into lines.
 * @param {AsyncIterable<any>} chunksAsync - Stream of chunks to convert into lines.
 * @returns {AsyncIterable<string>} - An asynchronous iterable that yields lines from the input chunks.
 */
async function* chunksToLines(chunksAsync: any) {
  let previous = "";
  for await (const chunk of chunksAsync) {
    const bufferChunk = Buffer.isBuffer(chunk) ? chunk : Buffer.from(chunk);
    previous += bufferChunk;
    let eolIndex;
    while ((eolIndex = previous.indexOf("\n")) >= 0) {
      // line includes the EOL
      const line = previous.slice(0, eolIndex + 1).trimEnd();
      if (line === "data: [DONE]") break;
      if (line.startsWith("data: ")) yield line;
      previous = previous.slice(eolIndex + 1);
    }
  }
}

/**
 * Asynchronously converts a stream of lines into messages.
 * @param {AsyncIterable<any>} linesAsync - Stream of lines to convert into messages.
 * @returns {AsyncIterable<any>} - An asynchronous iterable that yields parsed messages from the input lines.
 */
async function* linesToMessages(linesAsync: any) {
  for await (const line of linesAsync) {
    const message = line.substring("data :".length);
    try {
      const parsedMessage = JSON.parse(message);
      yield parsedMessage;
    } catch (error) {
      console.error("Could not JSON parse stream message", message, error);
    }
  }
}

/**
 * Asynchronously completes the stream by converting chunks to lines and then to messages.
 * @param {any} data - Input data to process.
 * @returns {AsyncIterable<any>} - An asynchronous iterable that yields parsed messages from the input data stream.
 */
export default async function* streamCompletion(data: any) {
  yield* linesToMessages(chunksToLines(data));
}
