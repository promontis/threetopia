import {afterAll,beforeAll,beforeEach,describe,expect,it,vi} from 'vitest';
import {readFileSync} from 'node:fs';
import {getPlatformProxy,unstable_splitSqlQuery,type PlatformProxy} from 'wrangler';
import type {D1Database,R2Bucket} from '@cloudflare/workers-types';
import {canonicalTile,sha256} from '../../packages/platform/tiles.js';
import {dispatchThumbnails,processThumbnail,thumbnailRoutes,tilePhotos} from '../../src/creators/server/thumbnails';
import {thumbnailPlan,type ThumbnailJob} from '../../src/creators/server/thumbnail-plan';
import {thumbnailResource} from '../../src/creators/server/thumbnail-render';
import * as thumbnailRendering from '../../src/creators/server/thumbnail-render';
import registryWorker from '../../src/creators/server/index';
import {THUMBNAIL_RENDERER_REVISION} from '../../src/creators/thumbnail-revision';
import type {Env} from '../../src/creators/server/common';

let platform:PlatformProxy<{DB:D1Database;PACKAGES:R2Bucket}>,env:Env,db:D1Database,backfill:number;
const own='aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa',neighbor='bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb',far='cccccccc-cccc-cccc-cccc-cccccccccccc';
const run=(sql:string,...values:any[])=>db.prepare(sql).bind(...values).run();
const row=(id=own,audience='owner')=>db.prepare('SELECT * FROM tile_thumbnails WHERE tile_id=? AND audience=?').bind(id,audience).first<any>();
const job=async(id=own,audience:'owner'|'public'='owner'):Promise<ThumbnailJob>=>({tileId:id,audience,generation:(await row(id,audience)).generation});
const image=new Uint8Array(1500).fill(10),render=vi.fn(async()=>image);
async function tile(id:string,q:number,r:number,owner='alice'){
  await run('INSERT INTO tiles VALUES(?,?,?,?,?,?,?)',id,owner,q,r,'desert-oasis',JSON.stringify(canonicalTile(q,r,'desert-oasis',2)),Date.now());
}
async function pkg(id='package-a',tileId=own,owner='alice'){
  await run('INSERT INTO packages(id,creator_id,name,kind,title,tile_id,created_at,updated_at) VALUES(?,?,?,?,?,?,?,?)',id,owner,`@${owner}/${id}`,'world',id,tileId,1,1);
}
async function version(id:string,packageId:string,state='ready',time=100,hash=id){
  const manifest={name:`@alice/${packageId}`,kind:'world',version:id,content:{map:'map.glb',overview:'overview.glb'},files:[]};
  await run('INSERT INTO versions VALUES(?,?,?,?,?,?,?,?)',id,packageId,id,state,JSON.stringify(manifest),null,time,state==='published'?time:null);
  for(const path of ['map.glb','overview.glb'])await run('INSERT INTO files VALUES(?,?,?,?,?,1)',id,path,100,hash,`${id}/${path}`);
}
async function clean(){
  await run("UPDATE tile_thumbnails SET rendered_generation=generation,state='ready',renderer_revision=?,queued_until=0,lease_until=0,attempts=0,retry_at=0",THUMBNAIL_RENDERER_REVISION);
}
const request=(id=own,audience='owner',etag='',user='alice',headers:Record<string,string>={})=>new Request(`https://creators.threetopia.com/api/tiles/${id}/thumbnail?audience=${audience}&v=${etag}`,{headers:{...(user?{Authorization:`Bearer ${(user==='alice'?'a':'b').repeat(64)}`} :{}),...headers}});

beforeAll(async()=>{
  platform=await getPlatformProxy({configPath:'tests/fixtures/thumbnails.wrangler.json',persist:false,remoteBindings:false,envFiles:[]});
  db=platform.env.DB;env={DB:db,PACKAGES:platform.env.PACKAGES,SITE_URL:'https://creators.threetopia.com',ASSETS:{fetch:vi.fn(async()=>new Response('asset'))}} as any;
  for(const file of ['0001_platform.sql','0002_package_discovery.sql','0004_managed_namespaces.sql'])await db.batch(unstable_splitSqlQuery(readFileSync(`migrations-creators/${file}`,'utf8')).map(sql=>db.prepare(sql)));
  await run("INSERT INTO creators VALUES('alice','alice@example.test','alice','Alice',1)");await tile(own,-1,1);
  await db.batch(unstable_splitSqlQuery(readFileSync('migrations-creators/0003_tile_thumbnails.sql','utf8')).map(sql=>db.prepare(sql)));
  backfill=(await db.prepare('SELECT COUNT(*) AS n FROM tile_thumbnails').first<any>()).n;
},60_000);
afterAll(async()=>{await platform?.dispose();});
beforeEach(async()=>{
  for(const table of ['installations','dependencies','files','versions','packages','tiles','credentials','creators'])await run(`DELETE FROM ${table}`);
  const objects=await env.PACKAGES.list();if(objects.objects.length)await env.PACKAGES.delete(objects.objects.map(o=>o.key));
  await run("INSERT INTO creators VALUES('alice','alice@example.test','alice','Alice',1),('bob','bob@example.test','bob','Bob',1)");
  for(const user of ['alice','bob'])await run('INSERT INTO credentials VALUES(?,?,?,?,?,?,?)',await sha256((user==='alice'?'a':'b').repeat(64)),user,'cli','test',1,Date.now()+3600000,1);
  await tile(own,-1,1);await tile(neighbor,-2,1,'bob');await tile(far,8,0,'bob');await pkg();
  env.THUMBNAIL_QUEUE=undefined;render.mockClear();
});

describe('durable tile photographs',()=>{
  it('backfills both audiences and invalidates all nearby photos on reservation, preset changes and expiry',async()=>{
    expect(backfill).toBe(2);await clean();
    await tile('dddddddd-dddd-dddd-dddd-dddddddddddd',-2,2);
    expect((await row()).state).toBe('pending');expect((await row(neighbor,'public')).state).toBe('pending');expect((await row(far)).state).toBe('ready');
    await clean();await run('UPDATE tiles SET contract=? WHERE id=?',JSON.stringify(canonicalTile(-1,1,'desert-oasis',1)),own);
    expect((await row(neighbor,'public')).state).toBe('pending');
    await clean();await run('DELETE FROM tiles WHERE id=?',neighbor);
    expect((await row(own,'public')).state).toBe('pending');expect(await row(neighbor)).toBeNull();
  });
  it('waits for validation, refreshes only the owner for private uploads, and refreshes neighbours on publication',async()=>{
    await clean();await version('1.0.0','package-a','uploading');
    await run('UPDATE files SET uploaded=1 WHERE version_id=?','1.0.0');expect((await row()).state).toBe('ready');
    await run("UPDATE versions SET state='rejected' WHERE id='1.0.0'");expect((await row()).state).toBe('ready');
    await run("UPDATE versions SET state='ready' WHERE id='1.0.0'");expect((await row()).state).toBe('pending');expect((await row(own,'public')).state).toBe('ready');expect((await row(neighbor)).state).toBe('ready');
    await clean();await run("UPDATE versions SET state='published',published_at=100 WHERE id='1.0.0'");
    expect((await row(own,'public')).state).toBe('pending');expect((await row(neighbor,'public')).state).toBe('pending');expect((await row(far)).state).toBe('ready');
  });
  it('refreshes after draft/package deletion, while title/tag changes do not render new pixels',async()=>{
    await version('1.0.0','package-a');await clean();
    await run("UPDATE packages SET title='Renamed',tags='[\"coastal\"]' WHERE id='package-a'");expect((await row()).state).toBe('ready');
    await run("DELETE FROM versions WHERE id='1.0.0'");expect((await row()).state).toBe('pending');
    await clean();await run("DELETE FROM packages WHERE id='package-a'");expect((await row()).state).toBe('pending');
  });
  it('includes the latest validated target upload, never a neighbour’s private draft',async()=>{
    await version('1.0.0','package-a','published',100);await version('2.0.0','package-a','ready',200);await version('3.0.0','package-a','uploading',300);
    await pkg('package-b',neighbor,'bob');await version('private-neighbor','package-b','ready',400);
    const mine=await thumbnailPlan(env,own,'owner'),pub=await thumbnailPlan(env,own,'public');
    expect(mine!.data.tiles.find((t:any)=>t.id===own).version).toBe('2.0.0');expect(pub!.data.tiles.find((t:any)=>t.id===own).version).toBe('1.0.0');
    expect(mine!.data.tiles.find((t:any)=>t.id===neighbor).version).toBeNull();expect(mine!.files.map(f=>f.version)).not.toContain('private-neighbor');
    expect(mine!.etag).not.toBe(pub!.etag);
    await run("DELETE FROM versions WHERE id='2.0.0'");expect((await thumbnailPlan(env,own,'owner'))!.etag).toBe(pub!.etag);
    await version('2.0.0','package-a','ready',200,'changed-bytes');expect((await thumbnailPlan(env,own,'owner'))!.etag).not.toBe(mine!.etag);
  });
  it('renders once for duplicate deliveries and shares identical public/owner pixels',async()=>{
    const ownJob=await job();await processThumbnail(env,ownJob,render);await processThumbnail(env,ownJob,render);await processThumbnail(env,await job(own,'public'),render);
    expect(render).toHaveBeenCalledTimes(1);expect((await row()).object_key).toBe((await row(own,'public')).object_key);
    expect((await row()).state).toBe('ready');expect((await row()).lease_token).toBeNull();
  });
  it('keeps the last successful image when a newer update arrives during rendering',async()=>{
    await processThumbnail(env,await job(),render);const original=await row();
    await version('1.0.0','package-a');const stale=await job();
    await processThumbnail(env,stale,async()=>{await version('2.0.0','package-a','ready',200);return image;});
    const interrupted=await row();expect(interrupted.object_key).toBe(original.object_key);expect(interrupted.state).toBe('pending');expect(interrupted.generation).toBeGreaterThan(stale.generation);
    await processThumbnail(env,await job(),render);expect((await row()).state).toBe('ready');expect((await row()).object_key).not.toBe(original.object_key);
  });
  it('retains a working photograph on render failure and schedules a retry',async()=>{
    await processThumbnail(env,await job(),render);const original=await row();await version('1.0.0','package-a');
    const log=vi.spyOn(console,'error').mockImplementation(()=>{});
    await processThumbnail(env,await job(),async()=>{throw Error('Temporary browser failure');});log.mockRestore();
    const failed=await row();expect(failed.object_key).toBe(original.object_key);expect(failed.state).toBe('failed');expect(failed.retry_at).toBeGreaterThan(Date.now());expect(failed.lease_until).toBe(0);
  });
  it('dispatches durably, avoids repeat enqueues, and recovers a failed queue send',async()=>{
    const sendBatch=vi.fn(async()=>({}));env.THUMBNAIL_QUEUE={sendBatch} as any;
    await dispatchThumbnails(env);expect(sendBatch).toHaveBeenCalledTimes(1);await dispatchThumbnails(env);expect(sendBatch).toHaveBeenCalledTimes(1);
    expect(sendBatch).toHaveBeenCalledWith(expect.arrayContaining([{body:await job(),contentType:'json'}]));
    await run("UPDATE tile_thumbnails SET generation=generation+1,queued_until=0,state='pending'");
    sendBatch.mockRejectedValueOnce(Error('Queue unavailable'));await expect(dispatchThumbnails(env)).rejects.toThrow();
    expect((await row()).queued_until).toBe(0);expect((await row(far)).queued_until).toBe(0);
    await dispatchThumbnails(env);expect(sendBatch).toHaveBeenCalledTimes(3);
  });
  it('runs the HTTP mutation, deferred dispatch, queue consumer and saved-image response together',async()=>{
    await run('DELETE FROM packages');await clean();
    const queued:Array<{body:ThumbnailJob}>=[],deferred:Promise<unknown>[]=[];
    env.THUMBNAIL_QUEUE={sendBatch:async(messages:any[])=>{queued.push(...messages);}} as any;
    const response=await registryWorker.fetch(new Request(`${env.SITE_URL}/api/packages`,{method:'POST',headers:{Authorization:`Bearer ${'a'.repeat(64)}`,'Content-Type':'application/json'},body:JSON.stringify({name:'@alice/new-world',title:'New world',kind:'world',tileId:own})}),env,{waitUntil:(task:Promise<unknown>)=>deferred.push(task)} as any);
    expect(response.status).toBe(201);await Promise.all(deferred);
    expect(queued).toHaveLength(1);expect(queued[0].body).toEqual(await job());expect((await row()).state).toBe('queued');
    const capture=vi.spyOn(thumbnailRendering,'renderThumbnail').mockResolvedValue(image),ack=vi.fn(),retry=vi.fn();
    try{
      await registryWorker.queue({messages:[{body:JSON.parse(JSON.stringify(queued[0].body)),ack,retry}]} as any,env);
      expect(ack).toHaveBeenCalledOnce();expect(retry).not.toHaveBeenCalled();expect(capture).toHaveBeenCalledOnce();
      const saved=await row();expect(saved.state).toBe('ready');expect(saved.rendered_generation).toBe(saved.generation);
      const result=await registryWorker.fetch(request(own,'owner',saved.etag),env);expect(result.status).toBe(200);expect((await result.arrayBuffer()).byteLength).toBe(image.length);
      // A status read recovers work even if a mutation's dispatch was interrupted.
      await run("UPDATE tile_thumbnails SET generation=generation+1,state='pending',queued_until=0 WHERE tile_id=? AND audience='owner'",own);
      const status=await registryWorker.fetch(new Request(`${env.SITE_URL}/api/tiles/thumbnails`,{headers:{Authorization:`Bearer ${'a'.repeat(64)}`}}),env,{waitUntil:(task:Promise<unknown>)=>deferred.push(task)} as any);
      expect((await status.json() as any).thumbnails[0].pending).toBe(true);await Promise.all(deferred);expect(queued).toHaveLength(2);expect((await row()).state).toBe('queued');
      await registryWorker.queue({messages:[{body:queued[1].body,ack,retry}]} as any,env);
      expect((await row()).state).toBe('ready');expect(capture).toHaveBeenCalledOnce();
    }finally{capture.mockRestore();}
  });
  it('invalidates stored photographs on a renderer/assets deployment',async()=>{
    await clean();await run("UPDATE tile_thumbnails SET renderer_revision='previous-assets'");env.THUMBNAIL_QUEUE={sendBatch:vi.fn(async()=>({}))} as any;
    expect((await tilePhotos(env,'alice')).get(own)!.pending).toBe(true);
    await dispatchThumbnails(env);const changed=await row();expect(changed.generation).toBeGreaterThan(changed.rendered_generation);expect(changed.renderer_revision).toBe(THUMBNAIL_RENDERER_REVISION);
  });
  it('serves R2 files with ETags and enforces ownership before conditional cache responses',async()=>{
    await version('1.0.0','package-a');await processThumbnail(env,await job(),render);await processThumbnail(env,await job(own,'public'),render);
    const ownPhoto=await row(),publicPhoto=await row(own,'public'),path=`/api/tiles/${own}/thumbnail`;
    const response=await thumbnailRoutes(request(own,'owner',ownPhoto.etag),env,path);expect(response!.status).toBe(200);expect(response!.headers.get('Cache-Control')).toBe('private, no-cache');expect((await response!.arrayBuffer()).byteLength).toBe(image.length);
    await expect(thumbnailRoutes(request(own,'owner',ownPhoto.etag,'bob'),env,path)).rejects.toMatchObject({status:404});
    await expect(thumbnailRoutes(request(own,'owner',ownPhoto.etag,'',{'If-None-Match':`"${ownPhoto.etag}"`}),env,path)).rejects.toMatchObject({status:401});
    const cached=await thumbnailRoutes(request(own,'owner',ownPhoto.etag,'alice',{'If-None-Match':`"${ownPhoto.etag}"`}),env,path);expect(cached!.status).toBe(304);
    expect((await thumbnailRoutes(request(own,'public',publicPhoto.etag,''),env,path))!.headers.get('Cache-Control')).toContain('immutable');
    const stale=await thumbnailRoutes(request(own,'public','stale',''),env,path);expect(stale!.status).toBe(302);expect(stale!.headers.get('Cache-Control')).toBe('no-store');
    const publicInfo=await tilePhotos(env),privateInfo=await tilePhotos(env,'alice');expect(publicInfo.get(own)!.url).toContain('audience=public');expect(privateInfo.get(own)!.url).toContain('audience=owner');
    expect(publicInfo.get(own)!.url).not.toContain(ownPhoto.etag);
  });
  it('allows only this render snapshot’s models and static assets into the browser',async()=>{
    await version('1.0.0','package-a');const plan=(await thumbnailPlan(env,own,'owner'))!;
    await env.PACKAGES.put('1.0.0/map.glb',new Uint8Array([1,2,3]));
    const get=(path:string)=>thumbnailResource(env,plan,new URL(path,env.SITE_URL));
    expect((await get('/api/packages/package-a/versions/1.0.0/files?path=map.glb')).status).toBe(200);
    expect((await get('/api/packages/package-b/versions/private/files?path=map.glb')).status).toBe(404);
    expect((await get('/api/me')).status).toBe(403);expect((await get('https://external.example/track')).status).toBe(403);
    expect((await get('/assets/map.js')).status).toBe(200);
  });
});
