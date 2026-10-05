import {defineConfig} from 'vite';
import {worldSources} from './scripts/vite-shared.ts';
export default defineConfig({root:'examples/tidewater',publicDir:false,optimizeDeps:{include:['marked']},plugins:[worldSources()],server:{host:'127.0.0.1',port:5196,strictPort:true},build:{outDir:'../../dist/tidewater-example',emptyOutDir:true}});
