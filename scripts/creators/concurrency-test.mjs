import assert from 'node:assert/strict';
import {readFile} from 'node:fs/promises';
const state=JSON.parse(await readFile('.context/creator-platform/test-auth.json','utf8')),origin=state.origin,token=state.creator.token;if(!origin.startsWith('http://127.0.0.1:'))throw Error('Local-only test.');
async function api(path,method='GET',body,raw,cookie){const r=await fetch(origin+'/api'+path,{method,headers:{...(cookie?{Cookie:cookie}:{Authorization:'Bearer '+token}),Origin:origin,...(!raw&&body?{'Content-Type':'application/json'}:{})},body:raw||body&&JSON.stringify(body)});return {status:r.status,data:await r.json(),cookie:r.headers.get('set-cookie')?.split(';')[0]};}
async function ok(...args){const result=await api(...args);assert.ok(result.status<300,JSON.stringify(result));return result.data;}
const pkg=await ok('/packages/'+state.asset.packageId),base=pkg.versions.find(v=>v.state==='published').manifest,files=new Map();for(const f of base.files){const r=await fetch(`${origin}/api/packages/${pkg.package.id}/versions/${base.version}/files?path=${encodeURIComponent(f.path)}`);files.set(f.path,new Uint8Array(await r.arrayBuffer()));}
async function stage(p,m){await ok(`/packages/${p}/versions`,'POST',m);for(const [path,data] of files)await ok(`/packages/${p}/versions/${m.version}/files?path=${encodeURIComponent(path)}`,'PUT',null,data);await ok(`/packages/${p}/versions/${m.version}/validate`,'POST',{});}
for(let i=0;i<4;i++){
 const m={...base,version:`0.9.${i}`,changelog:'Local concurrency regression.'};await stage(pkg.package.id,m);const path=`/packages/${pkg.package.id}/versions/${m.version}`;
 const result=await Promise.all([api(path+'/publish','POST',{}),api(path,'DELETE')]);assert.equal(result.filter(r=>r.status===200).length,1,JSON.stringify(result));
 if(result[0].status===200){const f=await fetch(`${origin}/api${path}/files?path=${encodeURIComponent(base.files[0].path)}`);assert.equal(f.status,200,'A concurrent delete must not remove published R2 bytes.');await f.arrayBuffer();}
}
const created=await ok('/packages','POST',{name:`@${state.creator.handle}/race-${Date.now()}`,title:'Local delete race',kind:'asset'}),m={...base,name:created.name,version:'0.1.0'};await stage(created.id,m);
const race=await Promise.all([api(`/packages/${created.id}/versions/0.1.0/publish`,'POST',{}),api('/packages/'+created.id,'DELETE')]);assert.equal(race.filter(r=>r.status===200).length,1,JSON.stringify(race));if(race[0].status===200){const f=await fetch(`${origin}/api/packages/${created.id}/versions/0.1.0/files?path=${encodeURIComponent(base.files[0].path)}`);assert.equal(f.status,200);await f.arrayBuffer();}
const stamp=Date.now().toString(36),start=await ok('/auth/start','POST',{email:`race-${stamp}@example.test`}),login=await api('/auth/verify','POST',{challenge:start.challenge,code:start.developmentCode});assert.equal(login.status,200);
const handles=await Promise.all(['left','right'].map(s=>api('/profile','PATCH',{handle:s+'-'+stamp,displayName:'Concurrency test'},null,login.cookie)));assert.equal(handles.filter(r=>r.status===200).length,1);assert.equal(handles.filter(r=>r.status===409).length,1);
console.log('✓ Concurrent publish/delete preserves immutable files, package deletion is atomic, and a creator handle can only be claimed once.');
