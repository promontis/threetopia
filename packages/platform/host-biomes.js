import * as T from 'three';
import {centre,DIRECTIONS} from './legacy-tiles.js';
import {rotate,hexInset,smooth} from './wang-v4.js';
import {noise} from './authored-landscape.js';
import {designColor} from './render-v4.js';

const natural=new Set(['inlet','oasis','alpine','wetland','woodland','basalt','sakura']);
const key=t=>`${t.q},${t.r}`,width=48,originals=new WeakMap(),applied=new WeakMap();
const eligible=t=>t.version>=4&&natural.has(t.recipe?.kind);
const signature=t=>[t.q,t.r,t.variant,t.rotation,t.legacyEdges];

/** A shared world-space palette at natural host boundaries. Both sides sample
 * the same field, including at three-way corners. Only adjacent terrain mixes;
 * a lone tile keeps its own coast and the middle of every biome stays intact. */
export function createBiomeSampler(tiles){
  const hosts=new Map(tiles.filter(eligible).map(tile=>[key(tile),{tile,c:centre(tile.q,tile.r)}]));
  const neighborhoods=new Map();
  for(const host of hosts.values()){
    const adjacent=DIRECTIONS.map(([q,r])=>hosts.get(`${host.tile.q+q},${host.tile.r+r}`)).filter(Boolean);
    if(adjacent.length)neighborhoods.set(key(host.tile),[host,...adjacent].sort((a,b)=>a.tile.q-b.tile.q||a.tile.r-b.tile.r));
  }
  function colorAt(tile,x,z,height){
    const nearby=neighborhoods.get(key(tile));if(!nearby)return null;
    const c=centre(tile.q,tile.r),wx=c.x+x,wz=c.z+z;
    // Slow, shared noise breaks up a ruler-straight biome transition without
    // changing geometry, the terrain contract or any build area.
    const drift=(noise(wx/37,wz/37)-.5)*24;
    const contributors=nearby.map(h=>({h,weight:smooth((hexInset(wx-h.c.x,wz-h.c.z)+width+drift*Math.sin(h.tile.q*12.9898+h.tile.r*78.233))/(width*2))})).filter(v=>v.weight>0);
    if(contributors.length<2)return null;
    const color=new T.Color(0,0,0),total=contributors.reduce((n,v)=>n+v.weight,0);
    for(const {h,weight} of contributors){
      const local=rotate([wx-h.c.x,wz-h.c.z],-h.tile.rotation);
      color.add(designColor(h.tile,...local,height).multiplyScalar(weight/total));
    }
    return color;
  }
  return {colorAt,signatureFor:tile=>JSON.stringify((neighborhoods.get(key(tile))||[]).map(h=>signature(h.tile)))};
}

/** Recolor the cached geometry in place after a neighborhood is committed.
 * No extra meshes, materials, textures or draw calls. Releasing a neighbor
 * restores the original colors; repeated updates never accumulate blending. */
export function blendHostBiomes(roots,{map=true}={}){
  const sampler=createBiomeSampler(roots.map(root=>root.userData.contract).filter(Boolean)),scale=map?.03:1;
  for(const root of roots){
    const tile=root.userData.contract;if(!tile||!eligible(tile))continue;
    const signature=sampler.signatureFor(tile);if(applied.get(root)===signature)continue;
    for(const mesh of root.children){
      if(mesh.name!=='Host terrain')continue;
      const {position,color}=mesh.geometry.attributes;
      if(!originals.has(color))originals.set(color,color.array.slice());
      color.array.set(originals.get(color));
      for(let i=0;i<position.count;i++){
        const blended=sampler.colorAt(tile,position.getX(i)/scale,position.getZ(i)/scale,position.getY(i)/scale);
        if(blended)color.setXYZ(i,blended.r,blended.g,blended.b);
      }
      color.needsUpdate=true;
    }
    applied.set(root,signature);
  }
}
