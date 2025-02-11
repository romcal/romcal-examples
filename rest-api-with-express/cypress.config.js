const { defineConfig } = require('cypress');

const port = Number.parseInt(process.env.ROMCAL_APP_PORT ?? '3000', 10);

module.exports = defineConfig({
  reporter: 'junit',
  reporterOptions: {
    mochaFile: 'rest-api-with-express-cypress-report.xml',
    toConsole: true,
  },
  e2e: {
    baseUrl: `http://localhost:${port}`,
    supportFile: false,
  },
  env: {
    ROMCAL_APP_PORT: port,
  },
});
