import {build} from 'esbuild';
import {copyFile} from 'node:fs/promises';

await build({stdin: {contents: "export {parse} from '@babel/parser';", resolveDir: process.cwd()}, bundle: true, format: 'esm', platform: 'neutral', mainFields: ['module', 'main'], target: 'es2022', minify: true, outfile: 'packages/platform/syntax.js'});
await copyFile('node_modules/@babel/parser/LICENSE', 'packages/platform/BABEL-LICENSE.txt');
