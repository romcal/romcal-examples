const app = require('./app');

const port = Number.parseInt(process.env.ROMCAL_APP_PORT ?? '3000', 10);

/**
 * Run the server.
 */
app.listen(port, () => {
  console.log(`Romcal server listening on port ${port}`);
  console.log(`url: http://127.0.0.1:${port}`);
});
