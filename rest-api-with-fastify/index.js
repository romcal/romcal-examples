import fastify from './app.js';

/**
 * Run the server.
 * @returns {Promise<void>}
 */
const start = async () => {
  try {
    await fastify.listen({ port: 3000 });
    console.log('Romcal server listening on port 3000');
    console.log('url: http://127.0.0.1:3000');
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
};
start();
