import {readFile,writeFile,mkdir,rm,copyFile,readdir,cp} from 'node:fs/promises';
import {marked} from 'marked';
import {build} from 'esbuild';
import {siteNavigation} from '../../src/shared/site-navigation.js';
const out='dist/docs';await rm(out,{recursive:true,force:true});await mkdir(out,{recursive:true});
const groups=[['START HERE',['index','quickstart','accounts','creators']],['BUILD',['conversion','tidewater','scenes','tiles','world-packages','packages','preview','validation']],['SHIP',['publishing','cli','api']]];
const pages=[];for(const [,ids] of groups)for(const id of ids){const content=await readFile(`docs/content/${id}.md`,'utf8');pages.push({id,title:content.match(/^# (.+)/)[1],content});}
const esc=s=>s.replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const css=await Promise.all(['src/typography.css','src/theme.css','src/shared/site-ui.css','src/shared/site-navigation.css','docs/content/site.css'].map(file=>readFile(file,'utf8')));await writeFile(`${out}/docs.css`,css.join('\n'));
await cp('src/fonts',`${out}/fonts`,{recursive:true});
const cliURL='/downloads/threetopia-cli-0.7.2.tgz';
for(const page of pages){const dir=page.id==='index'?out:`${out}/${page.id}`;await mkdir(dir,{recursive:true});const html=marked.parse(page.content);const headings=[...page.content.matchAll(/^## (.+)$/gm)].map(m=>m[1]);
  const document=`<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width"><title>${esc(page.title)} · Threetopia Docs</title><meta name="theme-color" content="#fafaf9"><meta name="description" content="Creator documentation for Threetopia: fixed tiles, world and asset packages, previews, authentication and CLI."><link rel="canonical" href="https://docs.threetopia.com/${page.id==='index'?'':page.id}"><link rel="alternate" type="text/markdown" href="/${page.id}.md"><link rel="describedby" href="/llms.txt"><link rel="icon" href="/favicon.svg"><link rel="stylesheet" href="/docs.css"></head><body>${siteNavigation('docs',{actions:'<label class="search-label"><svg viewBox="0 0 20 20" fill="none" aria-hidden="true"><circle cx="8.5" cy="8.5" r="5.5"/><path d="m13 13 4 4"/></svg><input type="search" id="search" placeholder="Search docs…" aria-label="Search documentation" aria-controls="search-results" autocomplete="off"><kbd aria-hidden="true">⌘ K</kbd></label>'})}<div id="search-results" hidden></div><div class="shell"><nav class="site-sidebar" aria-label="Documentation">${groups.map(([title,ids])=>`<section><h2>${title}</h2>${ids.map(id=>`<a class="${id===page.id?'active':''}"${id===page.id?' aria-current="page"':''} href="/${id==='index'?'':id}">${esc(pages.find(p=>p.id===id).title)}</a>`).join('')}</section>`).join('')}<a class="agent-link" href="/llms.txt">For AI agents ↗</a><a class="agent-link" href="/downloads/threetopia-sdk-0.7.2.tgz">Download SDK ↘</a></nav><main><div class="doc-meta"><span>CREATOR PLATFORM · v0.7</span><a href="/${page.id}.md">Read as Markdown ↗</a></div><article>${html}</article><footer><span>Threetopia · A shared place to build.</span><a href="https://creators.threetopia.com/tiles">Find your tile →</a></footer></main></div><script src="/search.js" defer></script><script type="module" src="/site-account.js"></script></body></html>`;
  await writeFile(`${dir}/index.html`,document);await writeFile(`${out}/${page.id}.md`,page.content);
}
await writeFile(`${out}/search-index.json`,JSON.stringify(pages.map(p=>({title:p.title,url:`/${p.id==='index'?'':p.id}`,text:p.content.replace(/[#*\x60]/g,'')}))));
await copyFile('docs/content/search.js',`${out}/search.js`);
await build({entryPoints:['src/shared/site-account-entry.ts'],outfile:`${out}/site-account.js`,bundle:true,format:'esm',target:'es2022',minify:true});
// One canonical agent entry is shared by all sites and Markdown mirrors.
const llms=await readFile('public/llms.txt','utf8');
await writeFile(`${out}/llms.txt`,llms);await writeFile(`${out}/llms-full.txt`,llms+'\n\n'+pages.map(p=>p.content).join('\n\n---\n\n'));
await mkdir(`${out}/schema`,{recursive:true});await copyFile('packages/platform/package.schema.json',`${out}/schema/package.json`);
await mkdir(`${out}/downloads`,{recursive:true});for(const f of await readdir('.context/creator-platform/releases'))await copyFile(`.context/creator-platform/releases/${f}`,`${out}/downloads/${f}`);
for(const f of ['brand-mark.svg','favicon.svg'])await copyFile(`public/${f}`,`${out}/${f}`);
await writeFile(`${out}/robots.txt`,'User-agent: *\nAllow: /\nSitemap: https://docs.threetopia.com/sitemap.xml\n');await writeFile(`${out}/sitemap.xml`,`<?xml version="1.0"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${pages.map(p=>`<url><loc>https://docs.threetopia.com/${p.id==='index'?'':p.id}</loc></url>`).join('')}</urlset>`);
await writeFile(`${out}/_headers`,'/*\n  X-Content-Type-Options: nosniff\n  Referrer-Policy: strict-origin-when-cross-origin\n  Link: <https://docs.threetopia.com/llms.txt>; rel="describedby"\n/downloads/*\n  Cache-Control: public, max-age=31536000, immutable\n');
await writeFile('public/llms.txt',llms);console.log(`Built ${pages.length} documentation pages, Markdown mirrors, search, schema and LLM entries.`);
