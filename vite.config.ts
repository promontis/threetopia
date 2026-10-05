/// <reference types="vitest/config" />
import { fileURLToPath } from 'node:url';
import { defineConfig } from 'vite';
import { partials, siteNavigationHtml, worldSources } from './scripts/vite-shared.ts';
import { cloudflare } from '@cloudflare/vite-plugin';

const root = fileURLToPath(new URL('.', import.meta.url));

export default defineConfig(({ command, isPreview }) => ({
  plugins: [partials(command==='serve'), siteNavigationHtml(), worldSources(), ...(!process.env.VITEST ? [cloudflare({
    inspectorPort: false,
    config: command === 'serve' && !isPreview ? { vars: { WAITLIST_LOCAL: 'true' } } : undefined,
  })] : [])],
  server: { port: 5190, strictPort: false },
  preview: { port: 5191 },
  optimizeDeps: { exclude: ['three-world', 'three-mesh-bvh', 'three-fenestra'] },
  build: {
    target: 'es2022', chunkSizeWarningLimit: 1600,
  },
  environments: {
    client: { build: { rollupOptions: { input: { home: root + 'index.html', world: root + 'world/index.html', atlas: root + 'atlas/index.html', map: root + 'map/index.html', lagoon: root + 'map/lagoon/index.html', lagoonLite: root + 'map/lagoon-lite/index.html', mapLite: root + 'map/lite/index.html', docs: root + 'docs/index.html' } } } },
  },
  // Geometry builds and local D1 tests compete for CPU and memory. Bound workers
  // so their existing per-test deadlines remain meaningful on laptops and CI.
  test: { include: ['src/**/*.test.ts', 'tests/unit/**/*.test.ts'], maxWorkers: 4 },
}));
