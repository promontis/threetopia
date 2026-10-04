export const TILE_THUMBNAIL_REVISION=1;

/** Nearby reservations/publications affect the coastline and the photo, too. */
export function tileThumbnailContext(tile:any,info:any){
  const tiles=info.tiles.filter((other:any)=>{
    const q=other.q-tile.q,r=other.r-tile.r;return Math.max(Math.abs(q),Math.abs(r),Math.abs(q+r))<=2;
  });
  return {tiles,slots:tiles.map((t:any)=>({q:t.q,r:t.r,status:t.version?'occupied':'reserved'}))};
}
export async function tileThumbnailKey(tile:any,info:any){
  const neighborhood=tileThumbnailContext(tile,info).tiles.map((t:any)=>[t.id,t.contract,t.version||null,t.version?t.packageId:null]).sort((a:any,b:any)=>a[0].localeCompare(b[0]));
  const digest=await crypto.subtle.digest('SHA-256',new TextEncoder().encode(JSON.stringify([TILE_THUMBNAIL_REVISION,tile.id,neighborhood])));
  return '/__tile-thumbnails/'+Array.from(new Uint8Array(digest),b=>b.toString(16).padStart(2,'0')).join('')+'.webp';
}
