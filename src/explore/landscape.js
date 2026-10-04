import {VegType,VegInstances} from '@threetopia/source-tidewater/world/vegetation/InstanceLOD.js';
import {Group} from 'three/webgpu';
import {REGIONS} from './config.ts';
import {sourceWeight,tileAt} from './hex-world.ts';
import {hexCenter} from './tile-layout.ts';

/** Source instances keep their exact shape and root offsets while the shared
 * coastline replaces the old rectangular heightfield margin. */
export function fitTidewaterPlants(tide,height) {
  const {vegetation,terrain,group}=tide;
  for(const type of vegetation.types){
    const old=type.inst,records=[],indices=[];
    for(let i=0;i<old.count;i++){
      const x=old.px[i],z=old.pz[i],wx=x+group.position.x,wz=z+group.position.z,y=height.base(wx,wz);
      if(y<1.8||height.nearest(wx,wz).distance<6)continue;
      records.push({x,z,y:old.py[i]+y-terrain.heightAt(x,z),s:old.iPos[i*4+3],yaw:0,la:old.iDat[i*4],l:old.iDat[i*4+1],H:old.iDat[i*4+2],seed:old.iDat[i*4+3],qr:Math.sqrt(old.qr2[i])});indices.push(i);
    }
    const inst=new VegInstances(records);
    indices.forEach((oldIndex,i)=>{inst.matrices.set(old.matrices.subarray(oldIndex*16,oldIndex*16+16),i*16);inst.matrices[i*16+13]=records[i].y;});
    type.inst=inst;type.far?.fill(inst);
  }
  // Keep the native grass shader's terrain sampler on this same ground, without
  // mutating the original TerrainData (which WorldHeight still samples).
  if(vegetation.grass){
    const data=new Float32Array(terrain.heights.length).fill(-12),bounds=REGIONS[2].bounds;
    for(let j=Math.floor((bounds[1]-terrain.origin)/terrain.texel);j<=Math.ceil((bounds[3]-terrain.origin)/terrain.texel);j++)for(let i=Math.floor((bounds[0]-terrain.origin)/terrain.texel);i<=Math.ceil((bounds[2]-terrain.origin)/terrain.texel);i++){
      data[j*terrain.res+i]=height.base(terrain.origin+(i+.5)*terrain.texel+group.position.x,terrain.origin+(j+.5)*terrain.texel+group.position.z);
    }
    vegetation.grass.heightTex.image.data=data;vegetation.grass.heightTex.needsUpdate=true;
  }
}

/** Real source palms and trees planted in the shared walking terrain. The source
 * LOD, wind, geometry and materials are also used by the map capture. */
export function plantCoasts(tide,height,scene,renderer) {
  fitTidewaterPlants(tide,height);
  let seed=7193;
  const random=()=>{seed=(Math.imul(seed,1664525)+1013904223)>>>0;return seed/4294967296;};
  const vegetation=tide.vegetation,records={palms:[],trees:[]};
  for(const region of REGIONS.filter(r=>r.id==='lagoon'||r.id==='tidewater')){
    const {x:center,z:cz}=hexCenter(region.tile.q,region.tile.r);
    for(let z=cz-365;z<cz+365;z+=12)for(let x=center-335;x<center+335;x+=12){
      const wx=x+random()*11,wz=z+random()*11;
      if(tileAt(wx,wz)?.region.id!==region.id)continue;
      if(sourceWeight(region,wx-region.origin[0],wz-region.origin[2])>.05)continue;
      const y=height.base(wx,wz);
      if(y<2.1||height.nearest(wx,wz).distance<10)continue;
      const slope=Math.hypot(height.base(wx+2,wz)-height.base(wx-2,wz),height.base(wx,wz+2)-height.base(wx,wz-2))/4;
      if(slope>.4||random()>.72)continue;
      const kind=y<5?'palms':'trees',sources=vegetation.records[kind];
      const original=sources[Math.floor(random()*sources.length)];
      records[kind].push({...original,x:wx-tide.group.position.x,y:y-.12,z:wz-tide.group.position.z,yaw:random()*Math.PI*2,seed:random()});
    }
  }
  vegetation.coastTypes=[];
  const coast=new Group();coast.name='Shared coastal vegetation';coast.position.copy(tide.group.position);scene.add(coast);
  vegetation.coastGroup=coast;vegetation.renderer=renderer;
  for(const [kind,list] of Object.entries(records)){
    const source=kind==='palms'?vegetation.palms:vegetation.canopy;
    const parts=level=>level.meshes.map(m=>({geometry:m.geometry.clone(),material:m.material,castShadow:m.castShadow,name:`veg-coast-${kind}`}));
    const type=new VegType(`coast-${kind}`,list,{near:parts(source.near),far:{parts:parts(source.far),fade:[2600,2800]},nearRange:source.nearRange,margin:14,farExcludeNear:true,sortNear:true});
    vegetation.types.push(type);vegetation.coastTypes.push(type);
    for(const mesh of type.meshes){mesh.material.mrtNode=null;coast.add(mesh);}
  }
  return records;
}
