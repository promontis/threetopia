// Publish only Threetopia's own, original example. No email is sent by this script.
import {readFile,writeFile} from 'node:fs/promises';
import {homedir} from 'node:os';
import {join} from 'node:path';
import {randomBytes} from 'node:crypto';
import {starterGLB,sha256} from '../../packages/platform/index.js';
const account='403d2b98d35ee85533629161a1b24a03',database='1d80815b-5dfa-4955-bebe-c50c98f3138f',origin='https://creators.threetopia.com';
const config=await readFile(join(homedir(),'Library/Preferences/.wrangler/config/default.toml'),'utf8'),oauth=config.match(/^oauth_token\s*=\s*"([^"]+)"/m)?.[1];if(!oauth)throw Error('Cloudflare login required.');
async function sql(sql,params=[]){const r=await fetch(`https://api.cloudflare.com/client/v4/accounts/${account}/d1/database/${database}/query`,{method:'POST',headers:{Authorization:`Bearer ${oauth}`,'Content-Type':'application/json'},body:JSON.stringify({sql,params})}),data=await r.json();if(!data.success)throw Error('D1 seed query failed: '+data.errors.map(e=>e.message).join('; '));return data.result[0]?.results||[];}
const secret=randomBytes(32).toString('hex'),hash=await sha256(secret),now=Date.now();
await sql('INSERT INTO creators(id,email,handle,display_name,created_at) VALUES(?,?,?,?,?) ON CONFLICT(handle) DO NOTHING',['threetopia-platform','packages@threetopia.com','threetopia','Threetopia',now]);
const [owner]=await sql('SELECT id FROM creators WHERE handle=?',['threetopia']);
await sql('INSERT INTO credentials(hash,creator_id,kind,label,created_at,expires_at,last_used_at) VALUES(?,?,?,?,?,?,?)',[hash,owner.id,'cli','Platform example publisher',now,now+15*60000,now]);
async function api(path,{method='GET',body,raw}={}){const r=await fetch(origin+'/api'+path,{method,headers:{Authorization:`Bearer ${secret}`,...(body?{'Content-Type':'application/json'}:{})},body:raw||body&&JSON.stringify(body)}),data=await r.json();if(!r.ok)throw Error(`${path}: ${data.message}`);return data;}
try{
  const {packages}=await api('/packages?mine=1');let p=packages.find(p=>p.name==='@threetopia/beacon');
  if(!p)p=await api('/packages',{method:'POST',body:{name:'@threetopia/beacon',title:'Coastal Beacon',kind:'asset',description:'A small, original lighthouse for coastal worlds. One material, no textures, and map- and world-scale exports. MIT licensed.'}});
  const own=await api('/packages/'+p.id);if(own.versions.some(v=>v.version==='1.0.0'&&v.state==='published')){console.log('Original Threetopia beacon already published.');}
  else{
    const license=`MIT License\n\nCopyright (c) 2026 Threetopia\n\nPermission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:\n\nThe above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.\n\nTHE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.\n`;
    const files=new Map([['assets/beacon.glb',starterGLB()],['assets/beacon-world.glb',starterGLB(33.333333)],['LICENSE',new TextEncoder().encode(license)]]);
    const manifest={schemaVersion:1,name:'@threetopia/beacon',version:'1.0.0',kind:'asset',title:'Coastal Beacon',description:'An original low-poly lighthouse. One material, no textures. Includes map and world scale exports.',license:'MIT',changelog:'First release. Original Threetopia geometry with map-scale and world-scale GLBs, embedded colors and one draw call.',exports:{model:'assets/beacon.glb',world:'assets/beacon-world.glb'},dependencies:{},files:await Promise.all([...files].map(async([path,data])=>({path,bytes:data.length,sha256:await sha256(data)})))};
    await api(`/packages/${p.id}/versions`,{method:'POST',body:manifest});for(const [path,data] of files)await api(`/packages/${p.id}/versions/1.0.0/files?path=${encodeURIComponent(path)}`,{method:'PUT',raw:data});await api(`/packages/${p.id}/versions/1.0.0/validate`,{method:'POST',body:{}});await api(`/packages/${p.id}/versions/1.0.0/publish`,{method:'POST',body:{}});console.log('Published @threetopia/beacon@1.0.0 through the production upload and validation API.');
  }
  await writeFile('.context/creator-platform/seed-result.json',JSON.stringify({packageId:p.id,ownerId:owner.id,name:p.name,url:origin+'/packages/'+p.id},null,2)+'\n');
}finally{await sql('DELETE FROM credentials WHERE hash=?',[hash]);console.log('Temporary publisher credential revoked.');}
