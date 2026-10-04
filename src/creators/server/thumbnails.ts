import {auth,fail,json,uuid,type Env} from './common';
import {THUMBNAIL_RENDERER_REVISION} from '../thumbnail-revision';
import {thumbnailPlan,type ThumbnailJob,type ThumbnailAudience,type ThumbnailPlan} from './thumbnail-plan';

export async function dispatchThumbnails(env:Env){
  if(!env.THUMBNAIL_QUEUE)return;
  await env.DB.prepare("UPDATE tile_thumbnails SET renderer_revision=?,generation=generation+1,state='pending',attempts=0,retry_at=0,queued_until=0 WHERE renderer_revision!=?").bind(THUMBNAIL_RENDERER_REVISION,THUMBNAIL_RENDERER_REVISION).run();
  const now=Date.now();
  const jobs=(await env.DB.prepare(`UPDATE tile_thumbnails SET queued_until=?,state='queued' WHERE (tile_id,audience) IN
    (SELECT tile_id,audience FROM tile_thumbnails WHERE generation>rendered_generation AND retry_at<=? AND queued_until<=? AND lease_until<=?
     ORDER BY object_key IS NOT NULL,rendered_at,tile_id,audience DESC LIMIT 25) RETURNING tile_id,audience,generation`).bind(now+30*60_000,now,now,now).all<any>()).results;
  if(!jobs.length)return;
  try{await env.THUMBNAIL_QUEUE.sendBatch(jobs.map(job=>({body:{tileId:job.tile_id,audience:job.audience,generation:job.generation},contentType:'json' as const})));}
  catch(error){await env.DB.batch(jobs.map(job=>env.DB.prepare("UPDATE tile_thumbnails SET queued_until=0,state='pending' WHERE tile_id=? AND audience=? AND generation=?").bind(job.tile_id,job.audience,job.generation)));throw error;}
}

export async function processThumbnail(env:Env,job:ThumbnailJob,render:(env:Env,plan:ThumbnailPlan)=>Promise<Uint8Array>){
  if(!job||!['public','owner'].includes(job.audience)||!Number.isSafeInteger(job.generation))return;
  const lease=uuid(),now=Date.now();
  const claimed=await env.DB.prepare(`UPDATE tile_thumbnails SET lease_token=?,lease_until=?,state='rendering',attempts=attempts+1
    WHERE tile_id=? AND audience=? AND generation=? AND rendered_generation<generation AND lease_until<=? RETURNING attempts`)
    .bind(lease,now+10*60_000,job.tileId,job.audience,job.generation,now).first<any>();
  if(!claimed)return;
  try{
    const plan=await thumbnailPlan(env,job.tileId,job.audience);if(!plan)return;
    let object=await env.PACKAGES.head(plan.objectKey);
    if(!object){const bytes=await render(env,plan);object=await env.PACKAGES.put(plan.objectKey,bytes,{httpMetadata:{contentType:'image/webp'},customMetadata:{tileId:job.tileId,etag:plan.etag}});}
    if(!object)throw Error('Tile image could not be stored.');
    // An older capture must never replace a newer upload/reservation snapshot.
    await env.DB.prepare(`UPDATE tile_thumbnails SET object_key=?,etag=?,bytes=?,rendered_at=?,rendered_generation=?,state='ready',last_error=NULL,retry_at=0,queued_until=0
      WHERE tile_id=? AND audience=? AND generation=? AND lease_token=?`)
      .bind(plan.objectKey,plan.etag,object.size,Date.now(),job.generation,job.tileId,job.audience,job.generation,lease).run();
  }catch(error){
    console.error('Tile thumbnail failed',job.tileId,job.audience,error instanceof Error?error.message:'Render error');
    const delay=Math.min(3600,30*2**Math.min(claimed.attempts,7));
    await env.DB.prepare("UPDATE tile_thumbnails SET state='failed',last_error='Rendering failed; retry scheduled.',queued_until=0,retry_at=? WHERE tile_id=? AND audience=? AND generation=? AND lease_token=?")
      .bind(Date.now()+delay*1000,job.tileId,job.audience,job.generation,lease).run();
  }finally{
    await env.DB.prepare('UPDATE tile_thumbnails SET lease_token=NULL,lease_until=0 WHERE tile_id=? AND audience=? AND lease_token=?').bind(job.tileId,job.audience,lease).run();
  }
}

const photo=(row:any)=>({url:row?.object_key?`/api/tiles/${row.tile_id}/thumbnail?audience=${row.audience}&v=${row.etag}`:null,
  updatedAt:row?.rendered_at||null,status:row?.state||'pending',pending:!row||row.generation>row.rendered_generation||row.renderer_revision!==THUMBNAIL_RENDERER_REVISION});
export async function tilePhotos(env:Env,creatorId?:string){
  const rows=(await env.DB.prepare(`SELECT t.id,t.creator_id,pub.*,own.audience AS own_audience,own.object_key AS own_key,own.etag AS own_etag,own.rendered_at AS own_at,
    own.state AS own_state,own.generation AS own_generation,own.rendered_generation AS own_rendered,own.renderer_revision AS own_revision FROM tiles t
    LEFT JOIN tile_thumbnails pub ON pub.tile_id=t.id AND pub.audience='public'
    LEFT JOIN tile_thumbnails own ON own.tile_id=t.id AND own.audience='owner'`).all<any>()).results;
  return new Map(rows.map(row=>{
    if(row.creator_id===creatorId&&row.own_audience){
      const own={...row,audience:'owner',object_key:row.own_key,etag:row.own_etag,rendered_at:row.own_at,state:row.own_state,generation:row.own_generation,rendered_generation:row.own_rendered,renderer_revision:row.own_revision};
      const info=photo(own);if(!info.url&&row.object_key)info.url=photo(row).url;
      return [row.id,info];
    }
    return [row.id,photo(row)];
  }));
}

export async function thumbnailRoutes(req:Request,env:Env,path:string):Promise<Response|null>{
  if(path==='/api/tiles/thumbnails'&&req.method==='GET'){
    const a=(await auth(req,env))!,images=await tilePhotos(env,a.user.id);
    const own=(await env.DB.prepare('SELECT id FROM tiles WHERE creator_id=?').bind(a.user.id).all<{id:string}>()).results;
    return json({thumbnails:own.map(t=>({id:t.id,...images.get(t.id)}))});
  }
  const match=path.match(/^\/api\/tiles\/([a-f0-9-]+)\/thumbnail$/);
  if(!match||!['GET','HEAD'].includes(req.method))return null;
  const url=new URL(req.url),audience:ThumbnailAudience=url.searchParams.get('audience')==='owner'?'owner':'public';
  const tile=await env.DB.prepare('SELECT creator_id FROM tiles WHERE id=?').bind(match[1]).first<any>();if(!tile)fail(404,'Tile not found.');
  if(audience==='owner'){const a=(await auth(req,env))!;if(a.user.id!==tile.creator_id)fail(404,'Tile image not found.');}
  const row=await env.DB.prepare('SELECT * FROM tile_thumbnails WHERE tile_id=? AND audience=?').bind(match[1],audience).first<any>();
  if(!row?.object_key)return json({message:'Tile image is being prepared.'},404,{'Retry-After':'5'});
  if(url.searchParams.get('v')!==row.etag)return new Response(null,{status:302,headers:{Location:photo(row).url!,'Cache-Control':'no-store'}});
  const headers={'Content-Type':'image/webp','ETag':`"${row.etag}"`,'X-Content-Type-Options':'nosniff','Cache-Control':audience==='public'?'public, max-age=31536000, immutable':'private, no-cache','Vary':'Cookie, Authorization'};
  if(req.headers.get('If-None-Match')===headers.ETag)return new Response(null,{status:304,headers});
  const object=req.method==='HEAD'?await env.PACKAGES.head(row.object_key):await env.PACKAGES.get(row.object_key);
  if(!object)fail(404,'Tile image is unavailable.');
  return new Response(req.method==='HEAD'?null:(object as any).body,{headers:{...headers,'Content-Length':String(object.size)}});
}
