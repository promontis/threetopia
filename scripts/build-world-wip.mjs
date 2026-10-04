import {copyFile,cp,mkdir,readFile,rm,writeFile} from 'node:fs/promises';

// An independent static bundle: never include the playable world's assets.
const root=new URL('../',import.meta.url),out=new URL('dist/world-wip/',root);
await rm(out,{recursive:true,force:true});await mkdir(new URL('fonts/',out),{recursive:true});
await copyFile(new URL('world-wip/index.html',root),new URL('index.html',out));
const css=await Promise.all(['src/typography.css','src/brand.css','world-wip/style.css'].map(file=>readFile(new URL(file,root),'utf8')));
await writeFile(new URL('style.css',out),css.join('\n'));
for(const file of ['favicon.svg','brand-mark.svg'])await copyFile(new URL(`public/${file}`,root),new URL(file,out));
await cp(new URL('src/fonts/',root),new URL('fonts/',out),{recursive:true});
await writeFile(new URL('_headers',out),'/*\n  Cache-Control: no-store\n  X-Robots-Tag: noindex\n  X-Content-Type-Options: nosniff\n');
await writeFile(new URL('_redirects',out),'/world / 302\n/world/ / 302\n/world/index.html / 302\n');
console.log('Built static WIP page in dist/world-wip (HTML, CSS, logo and fonts only).');
