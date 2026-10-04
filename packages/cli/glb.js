import {Matrix4,Quaternion,Vector3} from 'three';
import {insideTile,SCENE_MAP_BUDGET} from '@threetopia/world-map';

/** Check portable, embedded glTF assets without executing creator code. */
export function inspectGLB(buffer,bounds){
  if(buffer.length<28||buffer.readUInt32LE(0)!==0x46546c67||buffer.readUInt32LE(4)!==2||buffer.readUInt32LE(8)!==buffer.length)throw Error('Invalid glTF 2 GLB header.');
  let json,bin;for(let offset=12;offset<buffer.length;){const length=buffer.readUInt32LE(offset),type=buffer.readUInt32LE(offset+4);if(offset+8+length>buffer.length)throw Error('Truncated GLB chunk.');const data=buffer.subarray(offset+8,offset+8+length);if(type===0x4e4f534a)json=JSON.parse(data.toString('utf8'));if(type===0x004e4942)bin=data;offset+=8+length;}
  if(!json||!bin)throw Error('GLB needs JSON and embedded geometry.');
  if((json.buffers??[]).some(b=>b.uri)||(json.images??[]).some(i=>i.uri))throw Error('Embed all geometry and textures in the GLB; external resources are not supported.');
  const unsupported=['KHR_draco_mesh_compression','KHR_texture_basisu','EXT_meshopt_compression','EXT_mesh_gpu_instancing'];
  if((json.extensionsUsed??[]).some(e=>unsupported.includes(e)))throw Error('Portable preview needs an uncompressed GLB with ordinary mesh nodes. Use a registered source adapter for custom compression or instancing.');
  const root=json.scenes?.[json.scene??0];if(!root)throw Error('GLB needs a default scene.');
  let triangles=0,vertices=0;const seen=new Set();
  const typeInfo={5120:[1,'readInt8',127],5121:[1,'readUInt8',255],5122:[2,'readInt16LE',32767],5123:[2,'readUInt16LE',65535],5125:[4,'readUInt32LE',4294967295],5126:[4,'readFloatLE',1]};
  function node(index,parent,ancestors){
    if(ancestors.has(index)||seen.has(index))throw Error('GLB nodes must form a tree.');seen.add(index);const n=json.nodes?.[index];if(!n)throw Error('GLB references a missing node.');
    const local=n.matrix?new Matrix4().fromArray(n.matrix):new Matrix4().compose(new Vector3().fromArray(n.translation??[0,0,0]),new Quaternion().fromArray(n.rotation??[0,0,0,1]),new Vector3().fromArray(n.scale??[1,1,1]));
    const world=new Matrix4().multiplyMatrices(parent,local);
    if(n.mesh!==undefined){const mesh=json.meshes?.[n.mesh];if(!mesh)throw Error('GLB references a missing mesh.');
      for(const primitive of mesh.primitives){if((primitive.mode??4)!==4)throw Error('Use triangle meshes in the portable preview.');
        const position=json.accessors?.[primitive.attributes?.POSITION],count=primitive.indices===undefined?position?.count:json.accessors?.[primitive.indices]?.count;
        if(!position||position.type!=='VEC3'||position.sparse||!Number.isInteger(count)||count%3)throw Error('Invalid triangle or position accessor.');
        triangles+=count/3;if(triangles>SCENE_MAP_BUDGET.triangles)throw Error('Scene exceeds the 2,000,000 triangle preview budget.');
        const view=json.bufferViews?.[position.bufferView],format=typeInfo[position.componentType];if(!view||!format||view.buffer!==0)throw Error('Unsupported position buffer.');
        const [size,read,normalizer]=format,stride=view.byteStride??size*3,start=(view.byteOffset??0)+(position.byteOffset??0),p=new Vector3();
        for(let i=0;i<position.count;i++){const offset=start+i*stride;if(offset+3*size>bin.length)throw Error('Position data exceeds the GLB buffer.');const values=[0,1,2].map(k=>bin[read](offset+k*size)/(position.normalized?normalizer:1));p.fromArray(values).applyMatrix4(world);if(!insideTile(p.x,p.z)||!Number.isFinite(p.y)||p.y<bounds.minY-.01||p.y>bounds.maxY+.01)throw Error('Scene geometry leaves its Wang tile or declared height bounds.');vertices++;}
      }
    }
    const path=new Set(ancestors).add(index);for(const child of n.children??[])node(child,world,path);
  }
  for(const index of root.nodes??[])node(index,new Matrix4(),new Set());if(!vertices)throw Error('The GLB contains no scene geometry.');return {triangles,vertices};
}
