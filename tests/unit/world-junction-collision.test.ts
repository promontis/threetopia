import {expect,it,vi} from 'vitest';
import {readFileSync} from 'node:fs';
import {gunzipSync} from 'node:zlib';
import * as THREE from 'three';
import {WorldHeight} from '../../src/explore/hex-world.ts';
import {CollisionWorld} from '../../src/explore/collision.ts';
import {Walker} from '../../src/explore/player.ts';
import {SPAWN} from '../../src/explore/config.ts';

it('returns through the central junction from every branch without catching the original village colliders',()=>{
  const root=new URL('../../public/world-assets/lagoon/',import.meta.url),manifest=JSON.parse(readFileSync(new URL('scene.json',root),'utf8'));
  const buffers=manifest.buffers.map((file:string)=>gunzipSync(readFileSync(new URL(file,root))));
  const unpack=(f:any)=>{
    const bytes=buffers[f.buffer],Ctor=f.type==='Uint32Array'?Uint32Array:Uint16Array,raw=new Ctor(bytes.buffer,bytes.byteOffset+f.offset,f.length);
    return f.decode?Float32Array.from(raw,(n,i)=>n*f.decode.scale[i%f.decode.scale.length]+f.decode.min[i%f.decode.min.length]):raw;
  };
  const world=new WorldHeight();world.fields.set('lagoon',{...manifest.heightfield,data:unpack(manifest.heightfield)});world.buildTrails();
  const source=manifest.geometries[manifest.collision],geometry=new THREE.BufferGeometry();
  geometry.setAttribute('position',new THREE.BufferAttribute(unpack(source.attributes.position),3));geometry.setIndex(new THREE.BufferAttribute(unpack(source.index),1));
  const collision=new CollisionWorld(world);collision.addGeometry(geometry);
  vi.stubGlobal('window',new EventTarget());vi.stubGlobal('document',Object.assign(new EventTarget(),{pointerLockElement:null,hidden:false}));
  try {
    for(const trail of world.trails.values()){
      const walker=new Walker(new THREE.PerspectiveCamera(),new EventTarget() as HTMLCanvasElement,collision,()=>{});
      try {
        const p=trail.pointAt(220);walker.position.set(p.x,collision.floor(p.x,p.z,100),p.z);walker.setActive(true);walker.setDestination('lagoon');walker.startGuide();
        for(let step=0;walker.guide&&step<2400;step++)walker.update(1/60);
        expect(walker.blocked,trail.id).toBe(false);expect(walker.guide,trail.id).toBe(false);
        expect(Math.hypot(walker.position.x-SPAWN.x,walker.position.z-SPAWN.z),trail.id).toBeLessThan(1.1);
      } finally {walker.dispose();}
    }
  } finally {vi.unstubAllGlobals();collision.dispose();geometry.dispose();}
},15_000); // Simulates thousands of collision frames across all routes on shared CI CPUs.
