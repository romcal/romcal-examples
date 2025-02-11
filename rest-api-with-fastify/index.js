import fastify from './app.js';

const port = Number.parseInt(process.env.ROMCAL_APP_PORT ?? '3000', 10);

/**
 * Run the server.
 * @returns {Promise<void>}
 */
const start = async () => {
  try {
    await fastify.listen({ port });
    console.log(`Romcal server listening on port ${port}`);
    console.log(`url: http://localhost:${port}`);
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
};
start();
