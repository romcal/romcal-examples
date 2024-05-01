const { defineConfig } = require('cypress');

const port = Number.parseInt(process.env.ROMCAL_APP_PORT ?? '3000', 10);

module.exports = defineConfig({
  e2e: {
    baseUrl: `http://localhost:${port}`,
    supportFile: false,
  },
});
