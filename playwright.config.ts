import { defineConfig } from '@playwright/test';

export default defineConfig({
  testDir: 'tests/e2e',
  timeout: 90_000,
  fullyParallel: false,
  // Keep GPU-backed screenshots stable when several spec files use WebGL.
  workers: 1,
  reporter: [['list']],
  use: {
    baseURL: 'http://127.0.0.1:5192',
    ...(process.env.THREETOPIA_GPU_TESTS ? { channel: 'chrome', headless: false } : {}),
  },
  webServer: {
    command: 'corepack pnpm dev --port 5192 --strictPort --host 127.0.0.1',
    url: 'http://127.0.0.1:5192',
    reuseExistingServer: !process.env.CI,
  },
});
