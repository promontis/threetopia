import {cp,copyFile,mkdir,readFile,rename,writeFile,readdir} from 'node:fs/promises';
import './build-thumbnail-revision.mjs';
const out='dist/creators';await rename(`${out}/creators/index.html`,`${out}/index.html`);
// Reuse the map-only build, never copy the walking world or full source assets.
for(const f of await readdir('dist/world-map'))if(!['index.html','_headers','_redirects'].includes(f))await cp(`dist/world-map/${f}`,`${out}/${f}`,{recursive:true});
await mkdir(`${out}/map-preview`,{recursive:true});await copyFile('dist/world-map/index.html',`${out}/map-preview/index.html`);
await cp('public/map/hosts',`${out}/map/hosts`,{recursive:true});
await copyFile('public/llms.txt',`${out}/llms.txt`);
await writeFile(`${out}/_headers`,`/*\n  X-Content-Type-Options: nosniff\n  Content-Security-Policy: frame-ancestors 'self'
  Referrer-Policy: same-origin\n  X-Robots-Tag: noindex\n  Link: <https://docs.threetopia.com/llms.txt>; rel="describedby"\n/assets/*\n  Cache-Control: public, max-age=31536000, immutable\n`);
console.log('Built Threetopia Creators with the actual map-only scene.');
