import {defineConfig} from '@playwright/test';
// Use a dedicated port and own this server; never test an unrelated open preview.
export default defineConfig({testDir:'tests/conversion',workers:1,timeout:60_000,reporter:'list',use:{baseURL:'http://127.0.0.1:55196',launchOptions:{args:['--enable-unsafe-swiftshader']}},webServer:{command:'corepack pnpm dev:example:tidewater --port 55196',url:'http://127.0.0.1:55196',reuseExistingServer:false}});
