import { defineConfig } from 'cypress';

const port = Number.parseInt(process.env.ROMCAL_APP_PORT ?? '3000', 10);

export default defineConfig({
  reporter: 'junit',
  reporterOptions: {
    mochaFile: 'html-web-page-cypress-report.xml',
    toConsole: true,
  },
  e2e: {
    baseUrl: `http://localhost:${port}`,
    supportFile: false,
  },
  env: {
    ROMCAL_APP_PORT: port,
  }
});
