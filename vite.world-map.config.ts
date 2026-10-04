import { fileURLToPath } from 'node:url';
import { defineConfig } from 'vite';
import { partials, worldSources } from './scripts/vite-shared.ts';

// A map-only entry and explicit asset list keep the unreleased walking world
// out of this deployment. The main site's Worker and waitlist are independent.
export default defineConfig({
  plugins: [partials(false), worldSources()],
  publicDir: false,
  build: {
    outDir: 'dist/world-map',
    emptyOutDir: true,
    target: 'es2022',
    chunkSizeWarningLimit: 1600,
    rollupOptions: { input: fileURLToPath(new URL('map/lite/index.html', import.meta.url)) },
  },
});
