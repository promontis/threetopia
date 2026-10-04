import {copyFile,cp,mkdir,readFile,rename,writeFile} from 'node:fs/promises';

const root=new URL('../',import.meta.url),out=new URL('dist/world-map/',root);
// Vite bundles only map/lite/index.html. Publish that document at the host root.
const html=await readFile(new URL('map/lite/index.html',out),'utf8');
if(!html.includes('Map preview only')||html.includes('/src/explore/'))throw Error('Expected the map preview entry.');
await rename(new URL('map/lite/index.html',out),new URL('index.html',out));

// Deliberate allowlist, never public/ or dist/client/: both contain the full world.
const assets=[
  'brand-mark.svg','favicon.svg','llms.txt','map/lite','licenses',
  ...['component.json','village.glb','village-overview.glb','village-ground.json'].map(file=>`map/lagoon-lite/${file}`),
  ...new Set(Array.from(html.matchAll(/(?:src|href)="(\/creators\/[^"?#]+)"/g),match=>match[1].slice(1))),
];
for(const path of assets){
  const target=new URL(path,out);await mkdir(new URL('.',target),{recursive:true});
  await cp(new URL(`public/${path}`,root),target,{recursive:true});
}
for(const [source,target] of [
  ['packages/world-sources/tidewater/LICENSE','tidewater.txt'],
  ['packages/world-sources/tidewater/CREDITS.md','tidewater-credits.md'],
])await copyFile(new URL(source,root),new URL(`licenses/${target}`,out));

await writeFile(new URL('_headers',out),`/*
  X-Robots-Tag: noindex
  X-Content-Type-Options: nosniff
  Cache-Control: no-cache
/assets/*
  Cache-Control: public, max-age=31536000, immutable
`);
await writeFile(new URL('_redirects',out),[
  '/world / 302','/world/ / 302','/world/index.html / 302',
  '/map / 302','/map/ / 302','/map/lite / 302','/map/lite/ / 302','/map/lite/index.html / 302',
].join('\n')+'\n');
console.log('Built the map preview at dist/world-map/index.html, with only map assets and creator images.');
