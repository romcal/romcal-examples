import { defineConfig } from 'cypress';
import { getVitePrebuilder } from 'cypress-vite';

const port = Number.parseInt(process.env.ROMCAL_APP_PORT ?? '3000', 10);
const { vitePrebuild, vitePreprocessor } = getVitePrebuilder();

export default defineConfig({
  reporter: 'junit',
  reporterOptions: {
    mochaFile: 'react-app-cypress-report.xml',
    toConsole: false,
  },
  e2e: {
    supportFile: false,
    baseUrl: `http://localhost:${port}`,
    setupNodeEvents(on, config) {
      on('before:run', (details) => vitePrebuild(details, config));
      on('file:preprocessor', vitePreprocessor);
    },
    env: {
      ROMCAL_APP_PORT: port,
    },
  },
});
