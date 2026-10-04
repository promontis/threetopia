import {mountPreview} from './preview';
const params=new URLSearchParams(location.search),mode=params.get('mode')||'map';
async function main(){const data=await (await fetch('./preview.json')).json(),manifest=data.manifest;document.title=`${manifest.title} · Threetopia preview`;document.querySelector('h1')!.textContent=manifest.title;const bar=document.querySelector('nav')!;
  for(const role of manifest.kind==='world'?['world','map','overview']:['asset']){const a=document.createElement('a');a.href=`?mode=${role}`;a.textContent=role==='world'?'World':role==='overview'?'Overview':role==='asset'?'Asset':'Map';a.classList.toggle('active',manifest.kind==='asset'||mode===role);bar.append(a);}
  const role=manifest.kind==='asset'?'asset':mode,file=manifest.kind==='asset'?Object.values(manifest.exports).find((f:any)=>f.endsWith('.glb')):manifest.content[role];if(!file)throw Error('Choose a GLB export to preview.');
  await mountPreview(document.querySelector('#preview')!,{contract:manifest.tile,mode:role,load:async()=>{const r=await fetch(`./files/${file}`);if(!r.ok)throw Error('Preview file missing.');return r.arrayBuffer();}});
  document.querySelector('[data-metrics]')!.textContent=JSON.stringify(data.report[role]||{},null,2);
}
main().catch(e=>{document.querySelector('#preview')!.textContent=e.message;});
