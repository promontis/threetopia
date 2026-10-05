import * as T from 'three';
import {createGulls} from '@dgreenheck/tidewater-gulls';
import {mapCentre,MAP_TILES} from './layout';

// Dan Greenheck's Tidewater, MIT: native Gulls.js geometry/flight and Whale.js
// spine rig. Only routes, scale and LOD are adapted for this small map.
interface Field {offset:number;count:number}
interface WildlifeManifest {
  geometry:string;albedo:string;
  whale:{vertices:number;triangles:number;position:Field;normal:Field;uv:Field;rig:Field;index:Field;
    snoutZ:number;notchZ:number;centerline:{z:number[];y:number[]};
    pectoral:{left:{origin:number[]};right:{origin:number[]}}};
  gull:{vertices:number;triangles:number;position:Field;normal:Field;color:Field;side:Field;span:Field;index:Field};
}
const TAU=Math.PI*2,SPINE=40,GULLS=7,SCALE=.30;
export const WHALE_PERIOD=96;
const origin=mapCentre(MAP_TILES.find(t=>t.id==='tidewater')!);
const route=new T.EllipseCurve(origin.x+8.8,5.6,2.6,2.5,0,TAU,false,0);
route.arcLengthDivisions=256;
const start=.30,up=new T.Vector3(0,1,0),axisX=new T.Vector3(1,0,0);

export function createTidewaterWildlife(manifest:WildlifeManifest,buffer:ArrayBuffer,albedo:T.Texture,time:{value:number}){
  const f32=(f:Field)=>new Float32Array(buffer,f.offset,f.count),u16=(f:Field)=>new Uint16Array(buffer,f.offset,f.count);
  const root=new T.Group();root.name='Tidewater wildlife';root.userData.creator='Dan Greenheck';
  const w=manifest.whale,rest=f32(w.position),rig=f32(w.rig);
  const packedNormals=new Int16Array(buffer,w.normal.offset,w.normal.count),restNormals=Float32Array.from(packedNormals,n=>Math.max(-1,n/32767));
  const geometry=new T.BufferGeometry();
  geometry.setIndex(new T.BufferAttribute(u16(w.index),1));
  geometry.setAttribute('position',new T.BufferAttribute(rest.slice(),3).setUsage(T.DynamicDrawUsage));
  geometry.setAttribute('normal',new T.BufferAttribute(restNormals.slice(),3).setUsage(T.DynamicDrawUsage));
  geometry.setAttribute('uv',new T.BufferAttribute(f32(w.uv),2));
  // Its native slate back / mottled white belly and flippers, with a wet sheen.
  const skin=new T.MeshStandardMaterial({name:'Native Tidewater humpback skin',map:albedo,roughness:.43,metalness:0});
  const whale=new T.Mesh(geometry,skin);whale.name='Native Tidewater humpback';whale.scale.setScalar(SCALE);whale.castShadow=whale.receiveShadow=true;
  root.add(whale);
  const zHead=w.snoutZ+.15,dz=(zHead-w.notchZ+1.2)/(SPINE-1),ri=Math.round(zHead/dz);
  const centreY=(z:number)=>{
    const {z:zs,y:ys}=w.centerline;if(z>=zs[0])return ys[0];
    for(let i=1;i<zs.length;i++)if(z>=zs[i])return T.MathUtils.lerp(ys[i-1],ys[i],(z-zs[i-1])/(zs[i]-zs[i-1]));
    return ys.at(-1)!;
  };
  const frames=Array.from({length:SPINE},(_,k)=>{const z=zHead-k*dz;return {z,y:centreY(z),p:new T.Vector3(),q:new T.Quaternion()};});
  const roots=[new T.Vector3().fromArray(w.pectoral.left.origin),new T.Vector3().fromArray(w.pectoral.right.origin)];
  const joints=Array.from({length:w.vertices},(_,i)=>{
    const fi=T.MathUtils.clamp((zHead-rig[i*4])/dz,0,SPINE-1.001),k=Math.floor(fi),t=fi-k;
    return {k,t,y:T.MathUtils.lerp(frames[k].y,frames[k+1].y,t),part:Math.round(rig[i*4+1])};
  });
  const q=new T.Quaternion(),finQ=new T.Quaternion(),v=new T.Vector3(),n=new T.Vector3(),pivot=new T.Vector3();
  const routePoint=new T.Vector2(),tangent=new T.Vector2(),euler=new T.Euler(0,0,0,'YXZ');
  // Shared with the water shader: position, forward direction and emergence.
  const wake={pose:{value:new T.Vector4()},surface:{value:0}};
  function updateWhale(t:number){
    const phase=t*TAU/8;
    route.getPointAt((t/WHALE_PERIOD+start)%1,routePoint);route.getTangentAt((t/WHALE_PERIOD+start)%1,tangent);
    whale.position.set(routePoint.x,-.24-.40*T.MathUtils.smoothstep(routePoint.x,24.6,26.4)+.025*Math.sin(t*TAU/12),routePoint.y);
    whale.quaternion.setFromEuler(euler.set(-.025*Math.sin(t*TAU/12),Math.atan2(tangent.x,tangent.y),.012*Math.sin(t*TAU/16)));
    wake.pose.value.set(routePoint.x,routePoint.y,tangent.x,tangent.y);
    wake.surface.value=1-T.MathUtils.smoothstep(-whale.position.y,.24,.6);
    // Tidewater's travelling spine wave grows toward the tail, whose flukes
    // lead the stroke. Integrating rest-frame lengths keeps the body intact.
    for(const f of frames){
      let beta;
      if(f.z>=0)beta=-.014*Math.sin(phase+.6)*Math.min(1,f.z/5);
      else{
        const d=-f.z,u=Math.min(d/9.6,1.15),ph=phase-d*.52;
        beta=.14*(u*u*1.1+.05*u)*(Math.sin(ph)+.22*Math.sin(2*ph));
        if(d>7.6)beta+=.28*Math.sin(ph+1.35)*Math.min(1,(d-7.6)/1.2);
      }
      f.q.setFromAxisAngle(up,Math.min(0,f.z)*-.016).multiply(q.setFromAxisAngle(axisX,beta));
    }
    frames[ri].p.set(0,frames[ri].y,frames[ri].z).applyQuaternion(frames[ri].q);
    for(const dir of [-1,1])for(let k=ri+dir;k>=0&&k<SPINE;k+=dir){
      const a=frames[k],b=frames[k-dir];q.copy(a.q).slerp(b.q,.5);
      a.p.copy(b.p).add(v.set(0,a.y-b.y,a.z-b.z).applyQuaternion(q));
    }
    const positions=geometry.attributes.position,normals=geometry.attributes.normal;
    for(let i=0;i<w.vertices;i++){
      const joint=joints[i],a=frames[joint.k],b=frames[joint.k+1];
      v.fromArray(rest,i*3);n.fromArray(restNormals,i*3);
      if(joint.part===1||joint.part===2){
        const side=joint.part===1?1:-1,flex=rig[i*4+2]*.35+.8;
        finQ.setFromEuler(euler.set(.025*Math.sin(phase*.5),side*.06*Math.sin(phase*.5+.6),side*.09*Math.sin(phase*.5+1.2)));
        q.identity().slerp(finQ,flex);const shoulder=roots[joint.part-1];
        v.sub(shoulder).applyQuaternion(q).add(shoulder);n.applyQuaternion(q);
      }
      q.copy(a.q).slerp(b.q,joint.t);pivot.copy(a.p).lerp(b.p,joint.t);
      v.y-=joint.y;v.z-=rig[i*4];v.applyQuaternion(q).add(pivot);n.applyQuaternion(q);
      positions.setXYZ(i,v.x,v.y,v.z);normals.setXYZ(i,n.x,n.y,n.z);
    }
    positions.needsUpdate=normals.needsUpdate=true;geometry.computeBoundingSphere();geometry.computeBoundingBox();
  }

  const flock=createGulls({center:[origin.x+1,0,1]});
  const gulls=flock.object;root.add(gulls);gulls.userData.aboveWaterOnly=true;
  let last=NaN;
  function update(){if(last===time.value)return;last=time.value;updateWhale(last);flock.update(last);root.updateMatrixWorld(true);}
  update();
  return {root,whale,gulls,wake,update,
    inspect:()=>({gulls:GULLS,whales:1,triangles:w.triangles+flock.inspect().triangles,drawCalls:2,whalePosition:whale.position.toArray(),routeSeconds:WHALE_PERIOD}),
    dispose(){geometry.dispose();skin.dispose();flock.dispose();albedo.dispose();root.removeFromParent();},
  };
}

export async function loadTidewaterWildlife(time:{value:number},signal:AbortSignal){
  const base='/map/lite/tidewater/wildlife/';
  const fetchAsset=async(path:string)=>{const response=await fetch(base+path,{signal});if(!response.ok)throw Error('Could not load Tidewater wildlife.');return response;};
  const manifest=await(await fetchAsset('wildlife.json')).json() as WildlifeManifest;
  const assets=await Promise.allSettled([
    fetchAsset(manifest.geometry).then(r=>r.arrayBuffer()).then(bytes=>{
      // Vite serves .gz with Content-Encoding, so fetch already inflates it.
      // Static hosting may serve the stored gzip unchanged. Support both.
      const magic=new Uint8Array(bytes,0,Math.min(2,bytes.byteLength));
      return magic[0]===31&&magic[1]===139?new Response(new Blob([bytes]).stream().pipeThrough(new DecompressionStream('gzip'))).arrayBuffer():bytes;
    }),
    fetchAsset(manifest.albedo).then(r=>r.blob()).then(b=>createImageBitmap(b)),
  ]);
  if(signal.aborted||assets.some(r=>r.status==='rejected')){
    if(assets[1].status==='fulfilled')assets[1].value.close();
    const failure=assets.find(r=>r.status==='rejected');
    throw failure?.status==='rejected'?failure.reason:Error('Tidewater wildlife loading aborted.');
  }
  const buffer=(assets[0] as PromiseFulfilledResult<ArrayBuffer>).value,image=(assets[1] as PromiseFulfilledResult<ImageBitmap>).value;
  const albedo=new T.Texture(image);albedo.name='Tidewater humpback 1024×512';albedo.colorSpace=T.SRGBColorSpace;albedo.flipY=false;albedo.anisotropy=4;albedo.needsUpdate=true;
  try{
    const wildlife=createTidewaterWildlife(manifest,buffer,albedo,time),dispose=wildlife.dispose;
    return {...wildlife,dispose(){dispose();image.close();}};
  }catch(error){albedo.dispose();image.close();throw error;}
}
