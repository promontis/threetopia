import * as THREE from 'three/webgpu';
import { color, Fn, float, mix, normalize, positionGeometry, positionWorld, texture, transformNormalToView, vec3 } from 'three/tsl';
import { OceanFFT } from '@threetopia/source-tidewater/ocean/OceanFFT.js';
import { SeaDetail } from '@threetopia/source-tidewater/ocean/SeaDetail.js';
import { HEX_RADIUS, HEX_WIDTH, REGIONS } from './config.ts';
import { hexCenter } from './hex-world.ts';
/** The shared sea uses Tidewater's real FFT spectrum/compute system. */
export function createWater(scene,renderer,{spacing=6}={}) {
  const fft=new OceanFFT(renderer,{cascades:2,sizes:[157,33.3],local:{scale:.22,windSpeed:5,windDirection:25,fetch:120},swell:{scale:.08,windSpeed:4,windDirection:5,fetch:300}});
  const detail=new SeaDetail(128),material=new THREE.MeshStandardNodeMaterial({roughness:.16,metalness:.35,transparent:true,opacity:.86,depthWrite:false});
  material.name='Tidewater FFT · shared water';
  material.positionNode=Fn(()=>{
    const p=positionGeometry.toVar();
    const a=texture(fft.displacementTexture,p.xz.div(157)).depth(0).level(0);
    const b=texture(fft.displacementTexture,p.xz.div(33.3)).depth(1).level(0);
    return p.add(a.xyz.add(b.xyz).mul(.4));
  })();
  material.normalNode=Fn(()=>{
    const p=positionWorld.xz;
    const a=texture(fft.derivativeTexture,p.div(157)).depth(0);
    const b=texture(fft.derivativeTexture,p.div(33.3)).depth(1);
    return transformNormalToView(normalize(vec3(a.x.add(b.x).negate(),1,a.y.add(b.y).negate())));
  })();
  material.colorNode=Fn(()=>{
    const s=detail.sample(positionWorld.xz);
    return mix(color('#146b6f'),color('#659787'),s.gust.mul(.35));
  })();
  const centers=REGIONS.map(r=>hexCenter(r.tile.q,r.tile.r)),margin=600;
  const x0=Math.min(...centers.map(c=>c.x))-HEX_WIDTH/2-margin,x1=Math.max(...centers.map(c=>c.x))+HEX_WIDTH/2+margin;
  const z0=Math.min(...centers.map(c=>c.z))-HEX_RADIUS-margin,z1=Math.max(...centers.map(c=>c.z))+HEX_RADIUS+margin;
  const geo=new THREE.PlaneGeometry(x1-x0,z1-z0,Math.ceil((x1-x0)/spacing),Math.ceil((z1-z0)/spacing));geo.rotateX(-Math.PI/2);geo.translate((x0+x1)/2,-.03,(z0+z1)/2);
  const mesh=new THREE.Mesh(geo,material);mesh.name='One continuous sea';mesh.receiveShadow=true;scene.add(mesh);
  // A low-density continuation keeps the sea unbroken at tall/wide overview viewports.
  const outerPositions=[],outerIndices=[];
  for(const [a,b,c,d] of [[-15000,-15000,15000,z0],[-15000,z1,15000,15000],[-15000,z0,x0,z1],[x1,z0,15000,z1]]){
    const base=outerPositions.length/3;outerPositions.push(a,-.03,b,c,-.03,b,c,-.03,d,a,-.03,d);outerIndices.push(base,base+2,base+1,base,base+3,base+2);
  }
  const outerGeo=new THREE.BufferGeometry();outerGeo.setAttribute('position',new THREE.Float32BufferAttribute(outerPositions,3));outerGeo.setIndex(outerIndices);outerGeo.computeVertexNormals();
  const outer=new THREE.Mesh(outerGeo,material);outer.name='Distant shared sea';scene.add(outer);
  return {mesh,fft,update(dt){fft.update(dt);detail.update(dt);},dispose(){geo.dispose();outerGeo.dispose();material.dispose();detail.texture.dispose();}};
}
