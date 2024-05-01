import { defineConfig } from 'cypress';

const port = Number.parseInt(process.env.ROMCAL_APP_PORT ?? '3000', 10);

export default defineConfig({
  e2e: {
    baseUrl: `http://localhost:${port}`,
    supportFile: false,
  },
});
