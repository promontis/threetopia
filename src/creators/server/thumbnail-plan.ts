import type {Env} from './common';
import {sha256} from '../../../packages/platform/tiles.js';
import {THUMBNAIL_RENDERER_REVISION} from '../thumbnail-revision';

export type ThumbnailAudience='public'|'owner';
export type ThumbnailJob={tileId:string;audience:ThumbnailAudience;generation:number};
export type ThumbnailFile={packageId:string;version:string;path:string;key:string;hash:string};
export type ThumbnailPlan={tileId:string;etag:string;objectKey:string;data:any;packages:Array<{name:string;version:string;manifest:any}>;files:ThumbnailFile[]};

/** Neighbours always use public content. Only the owner's target can use a draft. */
export async function thumbnailPlan(env:Env,tileId:string,audience:ThumbnailAudience):Promise<ThumbnailPlan|null>{
  const target=await env.DB.prepare('SELECT q,r FROM tiles WHERE id=?').bind(tileId).first<any>();
  if(!target)return null;
  const rows=(await env.DB.prepare(`SELECT t.*,p.id AS package_id,p.name,p.title,c.handle,c.display_name,
    (SELECT v.id FROM versions v WHERE v.package_id=p.id AND v.state='published' ORDER BY v.published_at DESC,v.id DESC LIMIT 1) AS public_id,
    (SELECT v.id FROM versions v WHERE v.package_id=p.id AND v.state IN ('ready','published') ORDER BY v.created_at DESC,v.id DESC LIMIT 1) AS owner_id
    FROM tiles t JOIN creators c ON c.id=t.creator_id LEFT JOIN packages p ON p.tile_id=t.id
    WHERE MAX(ABS(t.q-?),ABS(t.r-?),ABS(t.q+t.r-?-?))<=2 ORDER BY t.id`).bind(target.q,target.r,target.q,target.r).all<any>()).results;
  const tiles:any[]=[],packages:ThumbnailPlan['packages']=[],files:ThumbnailFile[]=[];
  for(const row of rows){
    const versionId=audience==='owner'&&row.id===tileId?row.owner_id:row.public_id;
    const v=versionId?await env.DB.prepare("SELECT * FROM versions WHERE id=? AND state IN ('ready','published')").bind(versionId).first<any>():null;
    if(versionId&&!v)throw Error('Thumbnail content changed while preparing.');
    const tile:any={id:row.id,q:row.q,r:row.r,contract:JSON.parse(row.contract),variant:row.variant,version:v?.version||null,
      packageId:v?row.package_id:null,name:v?row.name:null,title:v?row.title:null,creator:{handle:row.handle,displayName:row.display_name}};
    if(v){
      const manifest=JSON.parse(v.manifest);
      packages.push({name:row.name,version:v.version,manifest});
      const hashes:Record<string,string>={};
      for(const role of ['map','overview']){
        const f=await env.DB.prepare('SELECT * FROM files WHERE version_id=? AND path=? AND uploaded=1').bind(v.id,manifest.content[role]).first<any>();
        if(!f)throw Error('Validated thumbnail content is missing.');
        files.push({packageId:row.package_id,version:v.version,path:f.path,key:f.object_key,hash:f.sha256});hashes[role]=f.sha256;
      }
      tile.thumbnailHashes=hashes;
    }
    tiles.push(tile);
  }
  // Content hashes detect deleted/re-uploaded versions with the same semver.
  // Names and draft descriptions have no effect on the pixels.
  const etag=await sha256(JSON.stringify([THUMBNAIL_RENDERER_REVISION,tileId,tiles.map(t=>[t.id,t.contract,t.version,t.thumbnailHashes||null])]));
  return {tileId,etag,objectKey:`tile-thumbnails/${tileId}/${etag}.webp`,data:{tiles,slots:tiles.map(t=>({q:t.q,r:t.r,status:t.version?'occupied':'reserved'}))},packages,files};
}
