import {MeshoptEncoder as encoder} from 'meshoptimizer';
await encoder.ready;
// Standard glTF with native leaf cutouts; two materials and one embedded texture.
export function writeLandmarkGLB(meshes,atlas,options={}){
  const gltf={asset:{version:'2.0',generator:'Threetopia / decimated native Lagoon village'},scene:0,scenes:[{nodes:[]}],nodes:[],meshes:[],
    materials:[{name:'Matte wood and linen',doubleSided:true,pbrMetallicRoughness:{baseColorFactor:[1,1,1,1],metallicFactor:0,roughnessFactor:1}},{name:'Native Lagoon foliage',doubleSided:true,alphaMode:'MASK',alphaCutoff:.45,pbrMetallicRoughness:{baseColorFactor:[1,1,1,1],baseColorTexture:{index:0},metallicFactor:0,roughnessFactor:1}}],buffers:[{byteLength:0},{byteLength:0,extensions:{EXT_meshopt_compression:{fallback:true}}}],bufferViews:[],accessors:[],extensionsUsed:['EXT_meshopt_compression','KHR_mesh_quantization'],extensionsRequired:['EXT_meshopt_compression','KHR_mesh_quantization']};
  if(options.materials)gltf.materials=options.materials;
  if(options.generator)gltf.asset.generator=options.generator;
  if(gltf.materials.some(m=>m.extensions?.KHR_materials_unlit))gltf.extensionsUsed.push('KHR_materials_unlit');
  const chunks=[];let offset=0,decodedOffset=0;
  function accessor(array,semantic){
    if(!array.every(Number.isFinite))throw Error('Non-finite landmark geometry.');
    const itemSize=semantic==='TEXCOORD_0'?2:3,count=array.length/itemSize,packed=semantic==='NORMAL'||semantic==='COLOR_0',stride=packed?4:itemSize*4;
    let buffer;
    if(packed){
      buffer=semantic==='NORMAL'?new Int8Array(count*4):new Uint8Array(count*4);
      for(let i=0;i<count;i++)for(let k=0;k<3;k++)buffer[i*4+k]=Math.round(Math.max(semantic==='NORMAL'?-1:0,Math.min(1,array[i*3+k]))*(semantic==='NORMAL'?127:255));
    }else buffer=Float32Array.from(array,v=>Math.round(v*(itemSize===2?4096:1024))/(itemSize===2?4096:1024));
    const raw=new Uint8Array(buffer.buffer),bytes=encoder.encodeGltfBuffer(raw,count,stride,'ATTRIBUTES',0),padded=new Uint8Array(Math.ceil(bytes.length/4)*4);padded.set(bytes);
    const view=gltf.bufferViews.push({buffer:1,byteOffset:decodedOffset,byteLength:raw.length,byteStride:stride,target:34962,extensions:{EXT_meshopt_compression:{buffer:0,byteOffset:offset,byteLength:bytes.length,byteStride:stride,count,mode:'ATTRIBUTES',filter:'NONE'}}})-1;
    chunks.push(padded);offset+=padded.length;decodedOffset+=raw.length;
    const a={bufferView:view,componentType:packed?(semantic==='NORMAL'?5120:5121):5126,count,type:itemSize===2?'VEC2':'VEC3'};
    if(packed)a.normalized=true;
    else {a.min=Array(itemSize).fill(Infinity);a.max=Array(itemSize).fill(-Infinity);for(let i=0;i<buffer.length;i++){a.min[i%itemSize]=Math.min(a.min[i%itemSize],buffer[i]);a.max[i%itemSize]=Math.max(a.max[i%itemSize],buffer[i]);}}
    return gltf.accessors.push(a)-1;
  }
  function indexAccessor(array){
    const values=Uint32Array.from(array),raw=new Uint8Array(values.buffer),bytes=encoder.encodeGltfBuffer(raw,values.length,4,'TRIANGLES'),padded=new Uint8Array(Math.ceil(bytes.length/4)*4);padded.set(bytes);
    const bufferView=gltf.bufferViews.push({buffer:1,byteOffset:decodedOffset,byteLength:raw.length,target:34963,extensions:{EXT_meshopt_compression:{buffer:0,byteOffset:offset,byteLength:bytes.length,byteStride:4,count:values.length,mode:'TRIANGLES',filter:'NONE'}}})-1;
    chunks.push(padded);offset+=padded.length;decodedOffset+=raw.length;
    return gltf.accessors.push({bufferView,componentType:5125,count:values.length,type:'SCALAR'})-1;
  }
  for(const [i,{name,g,role,material=i,attributes:customAttributes={},extras={}}] of meshes.entries()){
    const attributes={};for(const [key,semantic] of [['position','POSITION'],['normal','NORMAL'],['color','COLOR_0'],['uv','TEXCOORD_0']])if(g.attributes[key])attributes[semantic]=accessor(g.attributes[key].array,semantic);
    // Optional VEC3 creator data, e.g. a window's centre and dimensions. Keep
    // it in the measured GLB, so material effects do not add hidden geometry.
    for(const [key,semantic] of Object.entries(customAttributes))attributes[semantic]=accessor(g.attributes[key].array,semantic);
    gltf.meshes.push({name,primitives:[{attributes,indices:indexAccessor(g.index.array),material}]});gltf.nodes.push({name,mesh:i,extras:{...extras,role:role??(i?'foliage':'structure')}});gltf.scenes[0].nodes.push(i);
  }
  if(atlas){
  const imageView=gltf.bufferViews.push({buffer:0,byteOffset:offset,byteLength:atlas.length})-1;
  const padded=new Uint8Array(Math.ceil(atlas.length/4)*4);padded.set(atlas);chunks.push(padded);offset+=padded.length;
  gltf.images=[{bufferView:imageView,mimeType:'image/png'}];gltf.samplers=[{magFilter:9729,minFilter:9987,wrapS:33071,wrapT:33071}];gltf.textures=[{sampler:0,source:0}];
  }
  gltf.buffers[0].byteLength=offset;
  gltf.buffers[1].byteLength=decodedOffset;
  const json=Buffer.from(JSON.stringify(gltf)),jsonLength=Math.ceil(json.length/4)*4,total=28+jsonLength+offset,result=Buffer.alloc(total);
  result.writeUInt32LE(0x46546c67,0);result.writeUInt32LE(2,4);result.writeUInt32LE(total,8);result.writeUInt32LE(jsonLength,12);result.writeUInt32LE(0x4e4f534a,16);result.fill(32,20,20+jsonLength);json.copy(result,20);result.writeUInt32LE(offset,20+jsonLength);result.writeUInt32LE(0x004e4942,24+jsonLength);
  let at=28+jsonLength;for(const b of chunks){result.set(b,at);at+=b.length;}return result;
}
