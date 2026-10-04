// Development-only build entry: no source-world code ships with the map viewer.
import * as T from 'three';
import {GLTFLoader} from 'three/addons/loaders/GLTFLoader.js';
import {DRACOLoader} from 'three/addons/loaders/DRACOLoader.js';
import {KTX2Loader} from 'three/addons/loaders/KTX2Loader.js';
import {MeshoptDecoder} from 'three/addons/libs/meshopt_decoder.module.js';
import {TerrainData} from '@threetopia/source-tidewater/world/TerrainData.js';
import {Noise2D} from '@threetopia/source-tidewater/util/Noise.js';
import {Village} from '@threetopia/source-tidewater/world/Village.js';
import {Colliders} from '@threetopia/source-tidewater/world/Colliders.js';
import {BoatModel} from '@threetopia/source-tidewater/world/BoatModel.js';
import {WORLD} from '@threetopia/source-tidewater/world/WorldLayout.js';

const renderer=new T.WebGLRenderer();renderer.setSize(64,64);document.body.append(renderer.domElement);
const encode=a=>{const b=new Uint8Array(a.buffer,a.byteOffset,a.byteLength);let s='';for(let i=0;i<b.length;i+=32768)s+=String.fromCharCode(...b.subarray(i,i+32768));return btoa(s);};
const scene=new T.Scene(),camera=new T.OrthographicCamera(-1,1,1,-1,0,1);
const mat=new T.ShaderMaterial({uniforms:{map:{value:null},encode:{value:0}},vertexShader:'varying vec2 vUv;void main(){vUv=uv;gl_Position=vec4(position.xy,0.,1.);}',fragmentShader:'uniform sampler2D map;uniform float encode;varying vec2 vUv;void main(){vec4 c=texture2D(map,vUv);if(encode>.5)c.rgb=mix(c.rgb*12.92,1.055*pow(max(c.rgb,vec3(0.)),vec3(1./2.4))-.055,step(vec3(.0031308),c.rgb));gl_FragColor=c;}',depthTest:false,depthWrite:false,blending:T.NoBlending,toneMapped:false});
scene.add(new T.Mesh(new T.PlaneGeometry(2,2),mat));
function pixels(texture,size=256,srgb=false){
  const rt=new T.WebGLRenderTarget(size,size,{depthBuffer:false});mat.uniforms.map.value=texture;mat.uniforms.encode.value=Number(srgb);
  renderer.setRenderTarget(rt);renderer.render(scene,camera);const bytes=new Uint8Array(size*size*4);renderer.readRenderTargetPixels(rt,0,0,size,size,bytes);renderer.setRenderTarget(null);rt.dispose();return bytes;
}
function png(texture,size){const canvas=document.createElement('canvas');canvas.width=canvas.height=size;canvas.getContext('2d').putImageData(new ImageData(new Uint8ClampedArray(pixels(texture,size,true)),size,size),0,0);return canvas.toDataURL('image/png').split(',')[1];}
const samples=new Map();
function sample(texture,u,v){
  if(!samples.has(texture))samples.set(texture,pixels(texture));const bytes=samples.get(texture);
  texture.updateMatrix();const uv=new T.Vector2(u,v).applyMatrix3(texture.matrix);
  const wrap=(v,mode)=>mode===T.RepeatWrapping?v-Math.floor(v):Math.max(0,Math.min(1,v));
  const x=Math.round(wrap(uv.x,texture.wrapS)*255),y=Math.round(wrap(uv.y,texture.wrapT)*255);return [0,1,2].map(c=>bytes[(y*256+x)*4+c]/255);
}
// Low-frequency equivalents of the native Tidewater color nodes. The source
// stores tint multipliers, not albedo: using them directly turns raw wood white.
// Fine grain, weather masks and normal maps are deliberately omitted at map size.
function tidewaterAlbedo(m,g,i,tint){
  const data=g.attributes.vdata;
  if(m.name==='VillageWood'){
    const paint=data.getY(i),pattern=data.getZ(i),weather=data.getW(i);
    if(pattern>8.5)return tint.map(v=>v*.04+.014);
    const warm=1-Math.min(1,Math.max(0,(weather-.12)/.48));
    const raw=[.28*(1+warm*.42),.267,.247*(1-warm*.4)];
    const coverage=paint>.001?Math.min(.97,paint*1.3):0;
    return tint.map((v,k)=>(raw[k]*(coverage?1.2:v)*(1-coverage)+v*coverage)*.9);
  }
  if(m.name==='VillageThatch')return [.36,.29,.18];
  if(m.name==='boatWood'){
    const plain=g.attributes.aux?.getZ(i)===1;
    return tint.map((v,k)=>v*(plain?1:[.18,.068,.022][k]));
  }
  if(m.name==='boatHull'){
    const p=g.attributes.position,boot=p.getY(i)-Math.max(0,Math.min(1,(p.getZ(i)-.8)/3.5))*.06;
    return new T.Color(boot<.05?0x7a1d15:boot<.15?0x0f1a30:0xf2efe6).toArray();
  }
  return tint;
}
function extractMesh(object,{origin,crop,contained=false,role='structure',foliage=false,mapNightMaterials=false,preserveSubmerged=false}={}){
  const g=object.geometry,p=g.attributes.position;if(!p)return[];
  const index=g.index?.array??Uint32Array.from({length:p.count},(_,i)=>i),groups=g.groups.length?g.groups:[{start:0,count:index.length,materialIndex:0}],records=[];
  const local=new T.Matrix4(),matrix=new T.Matrix4(),point=new T.Vector3(),normal=new T.Vector3();
  for(let instance=0;instance<(object.isInstancedMesh?object.count:1);instance++){
    if(object.isInstancedMesh)object.getMatrixAt(instance,local);else local.identity();matrix.multiplyMatrices(object.matrixWorld,local);
    const normalMatrix=new T.Matrix3().getNormalMatrix(matrix),instanceColor=new T.Color(1,1,1);if(object.instanceColor)object.getColorAt(instance,instanceColor);
    for(const group of groups){
      const m=[].concat(object.material)[group.materialIndex]??object.material;
      const emissive=m.emissive??new T.Color(0,0,0),isLight=role!=='car'&&(role==='lights'||(!foliage&&Math.max(emissive.r,emissive.g,emissive.b)>.08));
      const positions=new Float32Array(p.count*3),normals=new Float32Array(p.count*3),colors=new Float32Array(p.count*3),uvs=foliage?new Float32Array(p.count*2):null;
      const emissions=role==='car'?new Float32Array(p.count*3):null;
      const c=g.attributes.tint??g.attributes.color,useColor=m.vertexColors||!!g.attributes.tint||object.name.startsWith('boat-'),uv=g.attributes[m.map?.channel?`uv${m.map.channel}`:'uv'],n=g.attributes.normal;
      for(let i=0;i<p.count;i++){
        point.fromBufferAttribute(p,i).applyMatrix4(matrix).sub(origin).toArray(positions,i*3);
        if(n)normal.fromBufferAttribute(n,i).applyNormalMatrix(normalMatrix);else normal.set(0,1,0);normal.toArray(normals,i*3);
        const albedo=!foliage&&m.map&&uv?sample(m.map,uv.getX(i),uv.getY(i)):[1,1,1],colour=isLight?emissive:m.color??new T.Color(1,1,1);
        let values=[0,1,2].map(k=>albedo[k]*[colour.r,colour.g,colour.b][k]*(useColor&&c?c[['getX','getY','getZ'][k]](i):1)*[instanceColor.r,instanceColor.g,instanceColor.b][k]);
        if(g.attributes.tint||object.name.startsWith('boat-'))values=tidewaterAlbedo(m,g,i,values);
        // The night city's black plaster depends on reflections and local neon
        // lights. Lift just that albedo for the small, daylight map component.
        if(mapNightMaterials&&['Black Painted Plaster','Material.001','Material','3232'].includes(m.name))values=values.map((v,k)=>v*1.5+[.035,.049,.069][k]);
        for(let k=0;k<3;k++)colors[i*3+k]=Math.max(0,Math.min(1,values[k]));
        if(emissions){
          const euv=g.attributes[m.emissiveMap?.channel?`uv${m.emissiveMap.channel}`:'uv'];
          const light=m.emissiveMap&&euv?sample(m.emissiveMap,euv.getX(i),euv.getY(i)):[1,1,1];
          for(let k=0;k<3;k++)emissions[i*3+k]=Math.min(1,light[k]*emissive.toArray()[k]*(m.emissiveIntensity??1));
        }
        if(uvs){uvs[i*2]=uv?.getX(i)??0;uvs[i*2+1]=uv?.getY(i)??0;}
      }
      const kept=[],start=Math.max(group.start,g.drawRange.start),end=Math.min(group.start+group.count,g.drawRange.start+g.drawRange.count,index.length);
      for(let i=start;i<end;i+=3){
        const ids=[index[i],index[i+1],index[i+2]];
        if(crop){const x=ids.reduce((a,j)=>a+positions[j*3]+origin.x,0)/3,z=ids.reduce((a,j)=>a+positions[j*3+2]+origin.z,0)/3;if(x<crop[0]||x>crop[2]||z<crop[1]||z>crop[3])continue;}
        if(crop&&contained&&ids.some(j=>{const x=positions[j*3]+origin.x,z=positions[j*3+2]+origin.z;return x<crop[0]||x>crop[2]||z<crop[1]||z>crop[3];}))continue;
        if(!preserveSubmerged&&Math.max(...ids.map(j=>positions[j*3+1]))<0)continue;
        // A reflected source node needs the opposite winding after its transform.
        kept.push(...(matrix.determinant()<0?[ids[0],ids[2],ids[1]]:ids));
      }
      if(kept.length)records.push({name:object.name,material:m.name,role:foliage?'foliage':isLight?'lights':role,positions:encode(positions),normals:encode(normals),colors:encode(colors),...(emissions?{emissions:encode(emissions)}:{}),...(uvs?{uv:encode(uvs)}:{}),indices:encode(Uint32Array.from(kept)),triangles:kept.length/3});
    }
  }
  return records;
}
function ground(heightAt,origin,extent,step=extent/40){const size=81,heights=[];for(let z=0;z<size;z++)for(let x=0;x<size;x++)heights.push(Math.round(heightAt(origin.x-extent+x*step,origin.z-extent+z*step)*1000)/1000);return {size,step,x0:-extent,z0:-extent,heights,waterLevel:0};}

async function tidewater(){
  const data=await(await fetch('/world-assets/tidewater/terrain.json')).json(),terrain=Object.assign(Object.create(TerrainData.prototype),data);
  for(const [key,info]of Object.entries(data.arrays)){const b=await(await fetch('/world-assets/tidewater/'+info.file)).arrayBuffer();terrain[key]=info.type==='Float32Array'?new Float32Array(b):new Uint8Array(b);}
  terrain.noise=new Noise2D(7);terrain.noise2=new Noise2D(222);terrain.noise3=new Noise2D(934);terrain.pads=[];terrain._F={};terrain._out={};terrain.timings={};
  const root=new T.Group(),village=new Village({scene:root,terrain,colliders:new Colliders()}),boat=new BoatModel();
  boat.group.position.copy(WORLD.boatDock.position);boat.group.rotation.y=WORLD.boatDock.heading;root.add(boat.group);root.updateMatrixWorld(true);
  const origin=new T.Vector3(59,0,34),crop=[44,20,74,49],meshes=[];
  root.traverse(o=>{if(o.isMesh&&!/net|fabric|fish|lantern|radar|propeller|rudder|throttle|wheel/.test(o.name))meshes.push(...extractMesh(o,{origin,crop,contained:true,role:o.name.startsWith('boat-')?'boat':'structure'}));});
  return {version:1,id:'tidewater',title:'Tidewater',creator:'Dan Greenheck',url:'https://dgreenheck.github.io/tidewater/',revision:'workspace-source-tidewater',root:origin.toArray(),selection:'Native lobster boat and dock head, with the last 20 metres of the pier; original relative positions',crop,adaptations:['Native wood, paint and hull color-node palettes baked at low frequency; no grain or weather-mask shaders'],meshes,ground:ground(terrain.heightAt.bind(terrain),origin,38)};
}
async function sakura(forest=false){
  const base='/world-assets/sakura/',manifest=await(await fetch(base+'scene.json')).json(),buffers=await Promise.all(manifest.buffers.map(async f=>(await fetch(base+f)).arrayBuffer()));
  const types={Float32Array,Uint32Array,Uint16Array,Uint8Array,Int32Array,Int16Array,Int8Array},array=d=>{const a=new types[d.type](buffers[d.buffer],d.offset,d.length);if(!d.decode)return a;return Float32Array.from(a,(v,i)=>v*d.decode.scale[i%d.decode.scale.length]+d.decode.min[i%d.decode.min.length]);};
  const textureLoader=new T.TextureLoader(),textureCache=new Map();
  async function texture(id){if(textureCache.has(id))return textureCache.get(id);const d=manifest.textures[id],t=await textureLoader.loadAsync(base+manifest.images[d.image].file);Object.assign(t,{flipY:d.flipY,colorSpace:d.colorSpace,wrapS:d.wrapS,wrapT:d.wrapT,rotation:d.rotation,channel:d.channel});t.repeat.fromArray(d.repeat);t.offset.fromArray(d.offset);t.center.fromArray(d.center);t.needsUpdate=true;textureCache.set(id,t);return t;}
  const origin=new T.Vector3(31,0,-115),crop=[17,-138,46,-109],treeCrop=[6,-136,58,-96],meshes=[];
  // Each native landmark is scaled uniformly, then composed into a small river
  // valley. The boat and bridge are hundreds of source metres from the pagoda.
  // Preserve their actual geometry, rather than crushing that distance into a tile.
  const reframe=(records,sourceOrigin,scale,position)=>records.map(record=>{
    const bytes=Uint8Array.from(atob(record.positions),c=>c.charCodeAt(0)),p=new Float32Array(bytes.buffer);
    for(let i=0;i<p.length;i+=3)for(let k=0;k<3;k++)p[i+k]=(p[i+k]+origin.toArray()[k]-sourceOrigin[k])*scale+position[k];
    return {...record,positions:encode(p)};
  });
  for(const [itemIndex,item] of manifest.meshes.entries()){
    const foliage=forest?itemIndex===63:item.name==='foliage-sakura'&&item.center[2]<-90&&item.center[2]>-145;
    const bark=forest?itemIndex===62:item.name==='bark'&&item.center[2]<-110&&item.center[2]>-125;
    const boat=!forest&&itemIndex>=215&&!['Left-fist','Right-fist','boatman-mesh','pole'].includes(item.name);
    if(!foliage&&!bark&&(forest||!item.name.startsWith('arch-'))&&!boat)continue;
    const d=manifest.geometries[item.geometry],g=new T.BufferGeometry();
    for(const [key,info]of Object.entries(d.attributes))g.setAttribute(key,new T.BufferAttribute(array(info),info.itemSize,info.normalized));
    if(d.index)g.setIndex(new T.BufferAttribute(array(d.index),1));
    for(const group of d.groups)g.addGroup(group.start,group.count,group.materialIndex);
    const materials=[];for(const id of item.materials){const s=manifest.materials[id],m=new T.MeshStandardMaterial({color:new T.Color(...s.color),vertexColors:s.vertexColors});if(s.maps.map!==undefined)m.map=await texture(s.maps.map);m.name=s.mesh;materials.push(m);}
    const mesh=new T.Mesh(g,materials.length===1?materials[0]:materials);mesh.name=item.name;mesh.matrix.fromArray(item.matrix);mesh.matrix.decompose(mesh.position,mesh.quaternion,mesh.scale);mesh.updateMatrixWorld();
    if(forest){
      meshes.push(...reframe(extractMesh(mesh,{origin,crop:[-26,-143,-7,-117],contained:true,foliage}),[-22.5,.15,-130],.30,[0,0,0]));
    }else if(boat){
      meshes.push(...reframe(extractMesh(mesh,{origin,role:'boat',preserveSubmerged:true}),[-2.76325,0,75],.26,[-1.5,.015,4.3]));
    }else if(foliage||bark){
      for(const [sx,sz,scale,position] of [[18,-116,.30,[1.1,.72,-.7]],[45.5,-106,.31,[4.25,.7,-.1]],[18,-116,.29,[-4.5,1.3,-.4]],[45.5,-106,.28,[-4.1,2.2,-3.5]]]){
        const tree=extractMesh(mesh,{origin,crop:[sx-8.8,sz-8.8,sx+8.8,sz+8.8],contained:true,foliage});
        const transformed=reframe(tree,[sx,sx===18?7.8:2.96,sz],scale,position);
        if(foliage)for(const record of transformed){const bytes=Uint8Array.from(atob(record.colors),c=>c.charCodeAt(0)),c=new Float32Array(bytes.buffer);for(let i=0;i<c.length;i+=3){c[i]=Math.min(1,c[i]*1.12);c[i+1]*=.60;c[i+2]*=.78;}record.colors=encode(c);}
        meshes.push(...transformed);
      }
    }else{
      meshes.push(...reframe(extractMesh(mesh,{origin,crop,contained:true}),[31,9.6,-122],.14,[2.5,.85,-2.6]));
      meshes.push(...reframe(extractMesh(mesh,{origin,crop:[-17,-12.5,20,-7.5],contained:true}),[2,0,-10],.18,[-1.9,.22,1.25]));
    }
  }
  const f=manifest.heightfield,heights=array(f),heightAt=(x,z)=>{const gx=Math.max(0,Math.min(f.nx-1,(x-f.bounds[0])/f.step)),gz=Math.max(0,Math.min(f.nz-1,(z-f.bounds[1])/f.step)),ix=Math.min(f.nx-2,Math.floor(gx)),iz=Math.min(f.nz-2,Math.floor(gz)),a=gx-ix,b=gz-iz,at=(x,z)=>heights[z*f.nx+x];return (at(ix,iz)*(1-a)+at(ix+1,iz)*a)*(1-b)+(at(ix,iz+1)*(1-a)+at(ix+1,iz+1)*a)*b;};
  return {version:1,id:forest?'forest':'sakura',title:forest?'Sakura pine':'Sakura',creator:'Meng To',url:'https://valley.mengto.here.now/',revision:manifest.sourceRevision,root:[0,0,0],mapComposition:true,...(forest?{triangleBudget:[1200,600],leafBudget:[850,400]}:{}),selection:forest?'Native pine at (-16, -130), for instancing on the map ridge':'Native five-storey pagoda, red arched bridge, covered riverboat and cherry trees, composed into a compact river valley',adaptations:['Native landmark groups are individually scaled and positioned in a shared map riverbed; source-world distances are intentionally compressed'],crop,meshes,atlas512:png(await texture(forest?12:8),512),atlas256:png(await texture(forest?12:8),256)};
}
async function punk(){
  const draco=new DRACOLoader().setDecoderPath('/world-assets/punk/libs/draco/'),ktx=new KTX2Loader().setTranscoderPath('/world-assets/punk/libs/basis/').detectSupport(renderer);
  const loader=new GLTFLoader().setDRACOLoader(draco).setKTX2Loader(ktx),asset=await loader.loadAsync('/world-assets/punk/models/cyberpunk_compressed.glb');
  asset.scene.position.y=-20;asset.scene.updateMatrixWorld(true);const box=new T.Box3().setFromObject(asset.scene),origin=box.getCenter(new T.Vector3());origin.y=-5.4;
  const meshes=[];asset.scene.traverse(o=>{if(o.isMesh)meshes.push(...extractMesh(o,{origin,mapNightMaterials:true}));});draco.dispose();ktx.dispose();
  return {version:1,id:'punk',title:'Punk',creator:'Anderson Mancini',url:'https://github.com/ektogamat/threejs-conference',revision:'cyberpunk_compressed.glb',root:origin.toArray(),selection:'Original city model and its original neon lettering and windows',adaptations:['Dark architectural albedo lifted for a daylight map; source night reflections and bloom are omitted'],meshes};
}
async function punkCar(){
  const draco=new DRACOLoader().setDecoderPath('/world-assets/punk/libs/draco/');
  try{
    const loader=new GLTFLoader().setDRACOLoader(draco).setMeshoptDecoder(MeshoptDecoder);
    const asset=await loader.loadAsync('/packages/world-sources/punk/map-assets/quadra_rig.glb');
    asset.scene.updateMatrixWorld(true);
    const rig=asset.scene.getObjectByName('QuadraRig').userData,meshes=[];
    asset.scene.traverse(object=>{
      if(!object.isMesh)return;
      let parent=object;while(parent&&!rig.wheels.some(w=>w.node===parent.name))parent=parent.parent;
      const wheel=rig.wheels.find(w=>w.node===parent?.name)??null;
      meshes.push(...extractMesh(object,{origin:new T.Vector3(),role:'car'}).map(m=>({...m,wheel})));
    });
    return {version:1,id:'punk-car',url:'https://www.threejspunk.com/models/game/quadra_rig.glb',rig,meshes};
  }finally{draco.dispose();}
}
window.extractMapLandmark=async id=>{samples.clear();return {tidewater,sakura,punk,'punk-car':punkCar,forest:()=>sakura(true)}[id]();};
