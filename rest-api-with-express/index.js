const app = require('./app');

const port = Number.parseInt(process.env.ROMCAL_APP_PORT ?? '3000', 10);

/**
 * Run the server.
 */
app.listen(port, () => {
  console.log(`Romcal server listening on port ${port}`);
  console.log(`url: http://localhost:${port}`);
});
