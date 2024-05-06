import { defineConfig } from 'cypress';
import vitePreprocessor from 'cypress-vite';

const port = Number.parseInt(process.env.ROMCAL_APP_PORT ?? '3000', 10);

export default defineConfig({
  e2e: {
    supportFile: false,
    baseUrl: `http://localhost:${port}`,
    setupNodeEvents(on) {
      on('file:preprocessor', vitePreprocessor('./vite.config.ts'));
    },
    env: {
      ROMCAL_APP_PORT: port,
    },
  },
});
