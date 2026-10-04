import assert from 'node:assert/strict';
import {spawn} from 'node:child_process';
import {readFile,writeFile,mkdir,stat} from 'node:fs/promises';
import {resolve,join} from 'node:path';
import {sha256,starterGLB,DIRECTIONS} from '../../packages/platform/index.js';
const origin=process.env.THREETOPIA_TEST_ORIGIN||'http://127.0.0.1:55020';if(!/^http:\/\/(127\.0\.0\.1|localhost):/.test(origin))throw Error('Integration test is local-only.');
const root=resolve('.context/creator-platform/integration-'+Date.now());await mkdir(root,{recursive:true});
async function request(path,{cookie,token,method='GET',body,raw,expected=200,originHeader=origin}={}){const r=await fetch(origin+'/api'+path,{method,headers:{...(cookie?{Cookie:cookie}:{}),...(token?{Authorization:'Bearer '+token}:{}),...(body?{'Content-Type':'application/json'}:{}),Origin:originHeader},body:raw||body&&JSON.stringify(body)});const data=await r.json();assert.equal(r.status,expected,`${method} ${path}: ${JSON.stringify(data)}`);return {data,cookie:r.headers.get('set-cookie')?.split(';')[0]};}
async function account(label){const handle=label+'-'+Date.now().toString(36),email=handle+'@example.test';const start=await request('/auth/start',{method:'POST',body:{email}});assert.match(start.data.developmentCode,/^\d{8}$/);const verify=await request('/auth/verify',{method:'POST',body:{challenge:start.data.challenge,code:start.data.developmentCode}});const cookie=verify.cookie;await request('/auth/verify',{method:'POST',body:{challenge:start.data.challenge,code:start.data.developmentCode},expected:401});await request('/profile',{cookie,method:'PATCH',body:{handle,displayName:label==='alpha'?'River Maker':'Coast Builder'}});const grant=(await request('/auth/device',{method:'POST',body:{}})).data;await request('/auth/device/poll',{method:'POST',body:{deviceCode:grant.deviceCode},expected:202});await request('/auth/device/approve',{cookie,method:'POST',body:{userCode:grant.userCode,approve:true}});const approved=(await request('/auth/device/poll',{method:'POST',body:{deviceCode:grant.deviceCode}})).data;await request('/auth/device/poll',{method:'POST',body:{deviceCode:grant.deviceCode},expected:410});const home=join(root,label);await mkdir(home);await writeFile(join(home,'credentials.json'),JSON.stringify({[origin]:{token:approved.accessToken}}),{mode:0o600});return {handle,cookie,token:approved.accessToken,home};}
async function run(who,args,cwd=root){return new Promise((resolvePromise,reject)=>{const p=spawn(process.execPath,[resolve('packages/cli/bin/threetopia.js'),...args,'--registry',origin],{cwd,env:{...process.env,THREETOPIA_HOME:who.home},stdio:['ignore','pipe','pipe']});let output='';p.stdout.on('data',d=>output+=d);p.stderr.on('data',d=>output+=d);p.on('close',code=>code?reject(Error(output)):resolvePromise(output));});}
const a=await account('alpha'),b=await account('bravo');
await request('/profile',{cookie:a.cookie,method:'PATCH',body:{handle:a.handle,displayName:'Changed'},originHeader:'https://evil.example',expected:403});
const catalog=(await request('/tiles')).data;assert.equal(catalog.variants.length,15);
const harbor=catalog.slots.find(t=>t.q===1&&t.r===1);if(harbor?.status==='available'){
 assert.ok(!harbor.choices.some(c=>['alpine-pass','desert-oasis','autumn-woodland'].includes(c.variant)));
 const blocked=await request('/tiles/reserve',{token:a.token,method:'POST',body:{q:1,r:1,variant:'alpine-pass'},expected:409});assert.match(blocked.data.message,/harbor/);
 const passage=(await request('/tiles/reserve',{token:a.token,method:'POST',body:{q:1,r:1,variant:'circuit-deck'},expected:201})).data;
 await request('/tiles/'+passage.id,{token:a.token,method:'DELETE'});
 console.log('✓ Harbor filter and independent server rejection; a navigable floating host can be reserved.');
}
const available=catalog.slots.find(t=>t.status==='available'&&t.ring>1&&DIRECTIONS.some(([dq,dr])=>!catalog.slots.some(s=>s.q===t.q+dq&&s.r===t.r+dr)));assert.ok(available,'Local integration needs an available outer position.');
const [dq,dr]=DIRECTIONS.find(([dq,dr])=>!catalog.slots.some(s=>s.q===available.q+dq&&s.r===available.r+dr)),next={q:available.q+dq,r:available.r+dr};
const disconnected=await request('/tiles/reserve',{token:a.token,method:'POST',body:{...next,variant:'coast-02'},expected:409});assert.match(disconnected.data.message,/shares an edge/);
const reserved=(await request('/tiles/reserve',{token:a.token,method:'POST',body:{q:available.q,r:available.r,...(available.choices.find(c=>c.variant==='sakura-river')||available.choices.find(c=>c.variant==='autumn-woodland')||available.choices[0])},expected:201})).data;
await request('/tiles/reserve',{token:b.token,method:'POST',body:{...next,variant:'coast-02'},expected:409});
const cliGrid=JSON.parse(await run(a,['tiles','--json']));assert.equal(cliGrid.slots.find(t=>t.q===available.q&&t.r===available.r).status,'reserved');assert.equal(cliGrid.slots.some(t=>t.q===next.q&&t.r===next.r),false);
await request('/tiles/reserve',{token:b.token,method:'POST',body:{...available,variant:'coast-02'},expected:409});
await request('/packages',{token:b.token,method:'POST',body:{name:`@${b.handle}/stolen-world`,kind:'world',title:'Stolen world',tileId:reserved.id},expected:422});
await request('/packages',{token:a.token,method:'POST',body:{name:`@${a.handle}/no-tile`,kind:'world',title:'No tile'},expected:422});
console.log('✓ Email-code login, device approval, replay protection, CSRF and tile ownership.');
await run(a,['create','coral-garden','--kind','world','--tile',reserved.id]);const projectDir=join(root,'coral-garden'),project=JSON.parse(await readFile(join(projectDir,'threetopia.json'),'utf8'));
await run(a,['check'],projectDir);await run(a,['push'],projectDir);
const own=(await request('/packages/'+project.packageId,{token:a.token})).data;assert.equal(own.versions[0].state,'ready');assert.equal(own.versions[0].manifest.changelog,'Initial version.');
await request('/packages/'+project.packageId,{token:b.token,expected:404});await request('/packages/'+project.packageId,{expected:404});
const privateFile=await fetch(`${origin}/api/packages/${project.packageId}/versions/0.1.0/files?path=content%2Fmap.glb`);assert.equal(privateFile.status,404);
const tampered=structuredClone(own.versions[0].manifest);tampered.version='0.2.1';tampered.tile.slot.radius=1000;await request(`/packages/${project.packageId}/versions`,{token:a.token,method:'POST',body:tampered,expected:422});
const missing=structuredClone(own.versions[0].manifest);missing.version='0.2.1';delete missing.content.map;await request(`/packages/${project.packageId}/versions`,{token:a.token,method:'POST',body:missing,expected:422});
console.log('✓ Real CLI world creation, geometry checks, private push and required map/immutable tile enforcement.');
// Bypass the CLI: the registry must reject actual out-of-bounds uploaded vertices itself.
const bad=structuredClone(own.versions[0].manifest),oversized=starterGLB(100);bad.version='9.0.0';bad.files=bad.files.map(f=>f.path==='content/map.glb'?{...f,bytes:oversized.length,sha256:null}:f);bad.files.find(f=>f.path==='content/map.glb').sha256=await sha256(oversized);
await request(`/packages/${project.packageId}/versions`,{token:a.token,method:'POST',body:bad,expected:201});
for(const f of bad.files)await request(`/packages/${project.packageId}/versions/9.0.0/files?path=${encodeURIComponent(f.path)}`,{token:a.token,method:'PUT',raw:f.path==='content/map.glb'?oversized:await readFile(join(projectDir,f.path))});
const rejected=(await request(`/packages/${project.packageId}/versions/9.0.0/validate`,{token:a.token,method:'POST',body:{},expected:422})).data;assert.ok(rejected.report.errors.some(e=>/leaves its (slot|build area)/.test(e)));
await request(`/packages/${project.packageId}/versions/9.0.0/publish`,{token:a.token,method:'POST',body:{},expected:409});
await request(`/packages/${project.packageId}/versions/9.0.0`,{token:a.token,method:'DELETE'});
await run(a,['publish'],projectDir);const published=(await request('/resolve?name='+encodeURIComponent(project.manifest.name))).data;assert.equal(published.state,'published');
await request(`/packages/${project.packageId}/versions/0.1.0/files?path=content%2Fmap.glb`,{token:a.token,method:'PUT',raw:starterGLB(),expected:409});
const grid=(await request('/tiles')).data;assert.equal(grid.slots.find(t=>t.q===available.q&&t.r===available.r).status,'occupied');
assert.equal(grid.slots.find(t=>t.q===next.q&&t.r===next.r)?.status,'available');
console.log('✓ Connected outer positions work before inner rings fill; disconnected positions and reservation-only neighbors are rejected. Publication opens the new frontier.');
console.log('✓ Server measures actual GLBs, rejects bad geometry, keeps published versions immutable and fills the bound tile.');
await run(a,['create','coastal-beacon','--kind','asset']);const assetDir=join(root,'coastal-beacon'),asset=JSON.parse(await readFile(join(assetDir,'threetopia.json'),'utf8'));await run(a,['push'],assetDir);await run(a,['publish'],assetDir);
await run(b,['create','new-build','--kind','asset']);const bDir=join(root,'new-build');await run(b,['install',asset.manifest.name+'@0.1.0'],bDir);
const locked=JSON.parse(await readFile(join(bDir,'threetopia-lock.json'),'utf8'));assert.equal(locked.packages[asset.manifest.name].version,'0.1.0');const installed=(await request('/packages/'+asset.packageId,{token:a.token})).data;assert.equal(installed.installers[0].handle,b.handle);assert.equal(installed.installers[0].version,'0.1.0');assert.equal('email' in installed.installers[0],false);
await run(a,['install',asset.manifest.name+'@0.1.0'],projectDir);await run(a,['use',asset.manifest.name,'--export','model','--as','map'],projectDir);await run(a,['check'],projectDir);
await run(b,['uninstall',asset.manifest.name],bDir);const after=(await request('/packages/'+asset.packageId,{token:a.token})).data;assert.equal(after.installers.some(i=>i.handle===b.handle),false);
await run(a,['build'],projectDir);assert.ok((await stat(join(projectDir,'dist-threetopia','preview.js'))).size>10000);
console.log('✓ Asset publishing, checksum-verified installation, package reuse, installer visibility, uninstall and portable previews.');
// Browser regression tests reuse local-only authenticated cookies and owned project IDs.
await writeFile('.context/creator-platform/test-auth.json',JSON.stringify({origin,creator:a,other:b,project,asset,projectDir,root},null,2),{mode:0o600});
await run(b,['logout']);await request('/packages?mine=1',{token:b.token,expected:401});
console.log('✓ Token revocation. Local integration passed; no real emails were sent.');
