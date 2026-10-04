import * as T from 'three';
import {createTerrainMaterial} from '../../packages/platform/terrain-material.js';
import {createHostMaterial,createHostDepthMaterial} from '../../packages/platform/host-material.js';
import {applyHostPaths,pathTexture} from '../../packages/platform/host-paths.js';
export function serializeHost(root:T.Group){
 const meshes:any[]=[],transfer:ArrayBuffer[]=[];
 root.traverse((object:any)=>{if(!object.isMesh)return;object.updateMatrix();const attributes:any={};
  for(const [name,attribute] of Object.entries(object.geometry.attributes) as Array<[string,T.BufferAttribute]>){attributes[name]={array:attribute.array,itemSize:attribute.itemSize,normalized:attribute.normalized};transfer.push(attribute.array.buffer as ArrayBuffer);}
  const index=object.geometry.index?.array;if(index)transfer.push(index.buffer);
  meshes.push({name:object.name,visible:object.visible,userData:object.userData,attributes,index,materials:[object.material].flat().map(m=>m.toJSON()),arrayMaterial:Array.isArray(object.material),matrix:object.matrix.toArray(),castShadow:object.castShadow,receiveShadow:object.receiveShadow});
 });
 if(root.userData.pathMask)transfer.push(root.userData.pathMask.bytes.buffer);
 return {data:{name:root.name,contract:root.userData.contract,meshes,pathMask:root.userData.pathMask},transfer:[...new Set(transfer)]};
}
export function restoreHost(data:any,map=true){
 const root=new T.Group();root.name=data.name;root.userData.contract=data.contract;
 for(const item of data.meshes){const geometry=new T.BufferGeometry();for(const [name,attribute] of Object.entries(item.attributes) as Array<[string,any]>)geometry.setAttribute(name,new T.BufferAttribute(attribute.array,attribute.itemSize,attribute.normalized));if(item.index)geometry.setIndex(new T.BufferAttribute(item.index,1));
  const materials=item.materials.map((m:any)=>{if(m.userData?.hostSurface){const options=m.userData.hostSurface,material=createHostMaterial(options.kind,map?1:.03,options.sand);if(options.kind==='terrain'&&data.pathMask)applyHostPaths(material,pathTexture(data.pathMask),options);return material;}if(!m.userData?.terrain)return new T.MaterialLoader().parse(m);const material=createTerrainMaterial(map?1:.03,m.userData.sandColor);material.side=m.side;return material;});
  const mesh=new T.Mesh(geometry,item.arrayMaterial?materials:materials[0]);mesh.name=item.name;mesh.visible=item.visible!==false;mesh.userData=item.userData||{};mesh.matrix.fromArray(item.matrix);mesh.matrix.decompose(mesh.position,mesh.quaternion,mesh.scale);mesh.castShadow=item.castShadow;mesh.receiveShadow=item.receiveShadow;mesh.customDepthMaterial=createHostDepthMaterial(item.materials[0]?.userData?.hostSurface?.kind,map?1:.03);root.add(mesh);
 }
 return root;
}
