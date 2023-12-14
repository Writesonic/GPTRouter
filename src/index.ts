import buildServer from "./server";

/**
 * The entry point for initializing and starting the Fastify server.
 * It loads the server configuration, starts listening on a given port and sets up
 * signal handlers for a graceful shutdown.
 *
 * @async
 * @function main
 * @returns {Promise<void>} A promise that resolves when the server is successfully started
 */
async function main() {
  const server = await buildServer();
  try {
    await server.listen({
      port: 8000,
      host: "0.0.0.0",
    });

    ["SIGINT", "SIGTERM"].forEach((signal) => {
      process.on(signal, async () => {
        server.log.info("Shutting down server...");
        await server.close();
        process.exit(0);
      });
    });
  } catch (err) {
    console.log(err);
    process.exit(1);
  }
}

main();
