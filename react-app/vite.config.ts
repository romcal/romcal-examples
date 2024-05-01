import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import viteTsconfigPaths from 'vite-tsconfig-paths';
import eslint from 'vite-plugin-eslint';

const port = Number.parseInt(process.env.ROMCAL_APP_PORT ?? '3000', 10);

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    viteTsconfigPaths(),
    eslint({
      fix: true,
      lintOnStart: false,
    }),
  ],
  server: {
    port,
  },
  build: {
    outDir: 'build',
  },
  optimizeDeps: {
    force: true,
  },
});
