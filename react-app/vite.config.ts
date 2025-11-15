import { execSync } from 'node:child_process';

import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import viteTsconfigPaths from 'vite-tsconfig-paths';
import eslint from 'vite-plugin-eslint';

const port = Number.parseInt(process.env.ROMCAL_APP_PORT ?? '3000', 10);

function getCommitHash() {
  try {
    const hash = execSync('git rev-parse --short HEAD').toString().trim();
    return /^[\da-f]{7}$/.test(hash) ? hash : 'unknown';
  } catch (/* eslint-disable-line @typescript-eslint/no-unused-vars */ error) {
    return 'unknown';
  }
}

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    viteTsconfigPaths(),
    eslint({
      fix: true,
      lintOnStart: false,
      exclude: ['/virtual:/', '/node_modules/**'],
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
  define: {
    COMMIT_HASH: JSON.stringify(getCommitHash()),
  },
});
