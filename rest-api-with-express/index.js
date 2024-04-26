const app = require('./app');

/**
 * Run the server.
 */
app.listen(3000, () => {
  console.log('Romcal server listening on port 3000');
  console.log('url: http://127.0.0.1:3000');
});
