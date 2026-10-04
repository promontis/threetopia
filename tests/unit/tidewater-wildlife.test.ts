import {it,expect} from 'vitest';
import {readFileSync} from 'node:fs';
import {gunzipSync} from 'node:zlib';
import {Box3,BufferAttribute,Texture,Vector3} from 'three';
import {createTidewaterWildlife,WHALE_PERIOD} from '../../src/tiles/lite/tidewater-wildlife';
import {createLandscapeSampler} from '../../src/tiles/lite/landscape';

it('keeps the native whale rig above the seabed, clear of the pier and boat, and continuous around its route',()=>{
  const base='public/map/lite/tidewater/wildlife/',manifest=JSON.parse(readFileSync(base+'wildlife.json','utf8'));
  const raw=gunzipSync(readFileSync(base+manifest.geometry)),buffer=raw.buffer.slice(raw.byteOffset,raw.byteOffset+raw.byteLength);
  const time={value:0},wildlife=createTidewaterWildlife(manifest,buffer,new Texture(),time);
  const sampler=createLandscapeSampler(JSON.parse(readFileSync('public/map/lagoon-lite/village-ground.json','utf8')));
  const boat=new Box3(new Vector3(17.2,-.3,-.95),new Vector3(19.1,2.5,3.5)),pier=new Box3(new Vector3(8.4,-3,-7),new Vector3(17,2,3.5));
  const whale=wildlife.whale,p=new Vector3(),initial=Array.from(whale.geometry.attributes.position.array);
  const used=new Set(whale.geometry.index!.array);
  let clearance=Infinity,maxY=-Infinity,minTop=Infinity,changed=false,collision=false,normalError=0;
  const n=new Vector3();
  try{
    for(let t=0;t<=WHALE_PERIOD;t+=.5){
      time.value=t;wildlife.update();let top=-Infinity;
      const positions=whale.geometry.attributes.position as BufferAttribute,normals=whale.geometry.attributes.normal;
      for(const i of used){
        p.fromBufferAttribute(positions,i).applyMatrix4(whale.matrixWorld);
        clearance=Math.min(clearance,p.y-sampler.heightAt(p.x,p.z));top=Math.max(top,p.y);
        collision||=boat.containsPoint(p)||pier.containsPoint(p);
        const length=n.fromBufferAttribute(normals,i).length();
        // The source contains collapsed pole faces with zero-area normals.
        normalError=Math.max(normalError,!Number.isFinite(length)?Infinity:length>0?Math.abs(length-1):0);
      }
      maxY=Math.max(maxY,top);minTop=Math.min(minTop,top);
      if(t===4)changed=initial.some((v,i)=>Math.abs(v-positions.array[i])>.2);
      const before=positions.version;wildlife.update();expect(positions.version).toBe(before);
    }
    expect(clearance).toBeGreaterThan(.1);expect(maxY).toBeGreaterThan(.15);expect(minTop).toBeLessThan(-.1);expect(changed).toBe(true);
    expect(collision).toBe(false);expect(normalError).toBeLessThan(.001);
    const final=whale.geometry.attributes.position.array;
    expect(Math.max(...initial.map((v,i)=>Math.abs(v-final[i])))).toBeLessThan(.00001);
    expect(wildlife.inspect().triangles).toBeLessThan(3200);expect(wildlife.inspect().drawCalls).toBe(2);
  }finally{wildlife.dispose();}
});
