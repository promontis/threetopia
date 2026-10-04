import {defineConfig} from 'vite';
import {resolve} from 'node:path';
import {siteNavigationHtml} from './scripts/vite-shared.ts';
export default defineConfig({plugins:[siteNavigationHtml()],publicDir:false,build:{outDir:'dist/creators',target:'es2022',rollupOptions:{input:resolve('creators/index.html')},chunkSizeWarningLimit:900}});
