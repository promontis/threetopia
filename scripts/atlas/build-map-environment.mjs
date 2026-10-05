import {writeFile,mkdir} from 'node:fs/promises';
import {createHash} from 'node:crypto';
import * as T from 'three-world';
import {buildRockGeometry} from '@dgreenheck/tidewater-rocks';
import {buildPalmFar,buildYoungPalm,buildFern} from '@dgreenheck/tidewater-vegetation/world/vegetation/PlantGeometry.js';
import {writeLandmarkGLB} from './landmark-glb.mjs';

// Build-time imports only: the map ships small geometry, not the source game's
// terrain, compute, physics, or vegetation runtime.
const meshes=[];
for(let i=0;i<6;i++){
  const g=buildRockGeometry(i%4,17+i*29,2),p=g.attributes.position,ao=g.attributes.ao,c=[];
  for(let j=0;j<p.count;j++){
    const f=(.85+.15*Math.sin(p.getX(j)*11+p.getY(j)*7))*ao.getX(j);
    c.push(.39*f,.405*f,.36*f);
  }
  g.setAttribute('color',new T.Float32BufferAttribute(c,3));
  meshes.push({name:`rock-${i}`,role:'rock',g,material:0});
}
for(const [name,{geometry:g}] of [['palm',buildPalmFar(11)],['young-palm',buildYoungPalm(5)],['fern',buildFern(3)]]){
  const c=[],p=g.attributes.position,part=g.attributes.aMat;
  for(let i=0;i<p.count;i++){
    const leaf=part.getX(i)>0,variation=.8+.2*Math.sin(i*1.38);
    c.push(...(leaf?[.19*variation,.36*variation,.055*variation]:[.26,.18,.09]));
  }
  g.setAttribute('color',new T.Float32BufferAttribute(c,3));
  for(const key of ['position','normal','uv']){const a=g.attributes[key],v=[];for(let i=0;i<a.count;i++)for(let k=0;k<a.itemSize;k++)v.push(a.getComponent(i,k));g.setAttribute(key,new T.Float32BufferAttribute(v,a.itemSize));}
  // Tidewater's crown positions are relative to the trunk tip; its vertex
  // shader normally applies this offset. Bake it for the static map asset.
  const position=g.attributes.position;
  for(let i=0;i<position.count;i++)if(part.getX(i)>0)position.setY(i,position.getY(i)+(name==='palm'?10:name==='young-palm'?.6:0));
  meshes.push({name,role:'plant',g,material:1});
}
const bytes=writeLandmarkGLB(meshes,null,{generator:'Threetopia / native Tidewater map environment',materials:[0,1].map(i=>({name:i?'Tidewater plants':'Tidewater rock',doubleSided:!!i,pbrMetallicRoughness:{baseColorFactor:[1,1,1,1],roughnessFactor:1,metallicFactor:0}}))});
await mkdir('public/map/lite/environment',{recursive:true});
await writeFile('public/map/lite/environment/tidewater.glb',bytes);
await writeFile('public/map/lite/environment/source.json',JSON.stringify({source:'https://github.com/dgreenheck/tidewater',creator:'Dan Greenheck',geometry:['world/terrain/RockGeometry.js','world/vegetation/PlantGeometry.js'],adaptations:['Native rock fracture geometry and cavity colours, subdivision 2','Native far palm, young palm and fern geometry; native material palettes baked as vertex colour','Instanced, seeded placement belongs to the map host'],bytes:bytes.length,sha256:createHash('sha256').update(bytes).digest('hex'),meshes:meshes.map(m=>({name:m.name,triangles:m.g.index.count/3}))},null,2)+'\n');
console.log(`Native Tidewater environment: ${bytes.length} bytes`);
