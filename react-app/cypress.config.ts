import { defineConfig } from 'cypress';
import vitePreprocessor from 'cypress-vite';

export default defineConfig({
  e2e: {
    supportFile: false,
    baseUrl: 'http://localhost:3000',
    setupNodeEvents(on) {
      on('file:preprocessor', vitePreprocessor('./vite.config.ts'));
    },
  },
});
