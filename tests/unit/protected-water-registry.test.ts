import {afterAll,beforeAll,beforeEach,describe,expect,it} from 'vitest';
import {readFileSync} from 'node:fs';
import {getPlatformProxy,unstable_splitSqlQuery,type PlatformProxy} from 'wrangler';
import type {D1Database} from '@cloudflare/workers-types';
import {registryRoutes} from '../../src/creators/server/registry';
import type {Env} from '../../src/creators/server/common';
import {sha256,tileContract,compatibleChoices} from '../../packages/platform/tiles.js';

let platform:PlatformProxy<{DB:D1Database}>,db:D1Database,env:Env;
const id='aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa',packageId='bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb',secret='a'.repeat(64);
const run=(sql:string,...values:any[])=>db.prepare(sql).bind(...values).run();
const request=(path:string,body?:any)=>registryRoutes(new Request(`https://creators.threetopia.com${path}`,{method:body?'POST':'GET',headers:{Authorization:`Bearer ${secret}`,'Content-Type':'application/json'},...(body?{body:JSON.stringify(body)}:{})}),env,path);
async function reserveLegacy(tileId:string,q:number,r:number){
  await run('INSERT INTO tiles VALUES(?,?,?,?,?,?,?)',tileId,'alice',q,r,'open-water',JSON.stringify(await tileContract(q,r,'open-water')),Date.now());
}
beforeAll(async()=>{
  platform=await getPlatformProxy({configPath:'tests/fixtures/catalog.wrangler.json',persist:false,remoteBindings:false,envFiles:[]});db=platform.env.DB;env={DB:db} as Env;
  for(const file of ['0001_platform.sql','0002_package_discovery.sql','0003_tile_thumbnails.sql','0004_managed_namespaces.sql'])await db.batch(unstable_splitSqlQuery(readFileSync(`migrations-creators/${file}`,'utf8')).map(sql=>db.prepare(sql)));
},60000);
afterAll(async()=>{await platform?.dispose();});
beforeEach(async()=>{
  for(const table of ['files','dependencies','versions','packages','tiles','credentials','creators'])await run(`DELETE FROM ${table}`);
  await run("INSERT INTO creators VALUES('alice','alice@example.test','alice','Alice',1)");
  await run('INSERT INTO credentials VALUES(?,?,?,?,?,?,?)',await sha256(secret),'alice','cli','test',1,Date.now()+3600000,1);
});

describe('registry habitat enforcement',()=>{
  it('exposes the owning tile and protection while preserving existing reservation records',async()=>{
    await reserveLegacy(id,1,1);
    const data=await (await request('/api/tiles'))!.json();
    const slot=data.slots.find((s:any)=>s.q===1&&s.r===1);
    expect(slot.status).toBe('protected');expect(slot.choices).toBeUndefined();expect(slot.protection.source.id).toBe('tidewater');
    expect(data.original.find((s:any)=>s.id==='tidewater').requiredOpenWater).toHaveLength(1);
    expect(data.tiles.find((t:any)=>t.id===id).protection).toEqual(slot.protection);
    expect((await (await request(`/api/tiles/${id}`))!.json()).protection).toEqual(slot.protection);
  });
  it('rejects direct reservations and package creation from an earlier water reservation',async()=>{
    for(const [q,r] of [[1,1],[2,0]])await expect(request('/api/tiles/reserve',{q,r,variant:'open-water'})).rejects.toMatchObject({status:409,message:expect.stringContaining('Tidewater’s whale')});
    await reserveLegacy(id,1,1);
    await expect(request('/api/packages',{name:'@alice/whale-water',kind:'world',title:'Whale water',tileId:id})).rejects.toMatchObject({status:409,message:expect.stringContaining('cannot be reserved or built on')});
    expect((await db.prepare('SELECT COUNT(*) AS n FROM packages').first<any>()).n).toBe(0);
  });
  it('does not count protected reservations against the two usable reservation limit',async()=>{
    await reserveLegacy(id,1,1);await reserveLegacy('cccccccc-cccc-cccc-cccc-cccccccccccc',2,0);
    for(const [q,r] of [[-1,1],[-1,0]]){
      const rows=(await db.prepare('SELECT * FROM tiles').all<any>()).results,choice=compatibleChoices(q,r,rows,{lookahead:true})[0];
      expect(choice).toBeTruthy();expect((await request('/api/tiles/reserve',{q,r,...choice}))!.status).toBe(201);
    }
    await expect(request('/api/tiles/reserve',{q:0,r:1,variant:'open-water'})).rejects.toMatchObject({status:409,message:expect.stringContaining('existing reservations')});
    expect((await db.prepare('SELECT COUNT(*) AS n FROM tiles').first<any>()).n).toBe(4);
  });
  it('blocks upload and publication for a package bound before the protection existed',async()=>{
    await reserveLegacy(id,1,1);
    await run('INSERT INTO packages(id,creator_id,name,kind,title,tile_id,created_at,updated_at) VALUES(?,?,?,?,?,?,?,?)',packageId,'alice','@alice/old-water','world','Old water',id,1,1);
    await run('INSERT INTO versions VALUES(?,?,?,?,?,?,?,?)','ready-version',packageId,'1.0.0','ready',JSON.stringify({title:'Old water',description:''}),null,1,null);
    await expect(request(`/api/packages/${packageId}/versions`,{version:'2.0.0'})).rejects.toMatchObject({status:409,message:expect.stringContaining('Tidewater’s whale')});
    await expect(request(`/api/packages/${packageId}/versions/1.0.0/publish`,{})).rejects.toMatchObject({status:409,message:expect.stringContaining('Tidewater’s whale')});
    expect((await db.prepare('SELECT state FROM versions').first<any>()).state).toBe('ready');
  });
});
