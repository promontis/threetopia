import {defineConfig} from '@playwright/test';
// This is an actual GPU acceptance gate. Missing WebGPU is a failure, not a skip.
export default defineConfig({testDir:'tests/full-scene',workers:1,timeout:420_000,reporter:'list',use:{channel:'chrome',headless:false,baseURL:'http://127.0.0.1:55198',viewport:{width:1280,height:850}},webServer:{command:'node scripts/creators/serve-full-scene.mjs --port 55198',url:'http://127.0.0.1:55198',reuseExistingServer:false,timeout:60_000}});
