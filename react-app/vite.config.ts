import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import viteTsconfigPaths from 'vite-tsconfig-paths';
import eslint from 'vite-plugin-eslint';

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
    port: 3000,
  },
  build: {
    outDir: 'build',
  },
  optimizeDeps: {
    force: true,
  },
});
