import {verifyTile,SLOT,canonicalJSON,buildContains} from './tiles.js';
export const BUDGETS=Object.freeze({
  world:{triangles:500000,drawCalls:160,bytes:32*1024*1024,textures:24,textureBytes:128*1024*1024},
  map:{triangles:36000,drawCalls:4,bytes:768*1024,textures:2,textureBytes:2*1024*1024},
  overview:{triangles:24000,drawCalls:3,bytes:512*1024,textures:2,textureBytes:2*1024*1024},
  asset:{triangles:500000,drawCalls:160,bytes:32*1024*1024,textures:24,textureBytes:128*1024*1024},
});
export const MAX_PACKAGE_BYTES=64*1024*1024;
export const validVersion = v=>typeof v==='string'&&/^(0|[1-9]\d*)\.(0|[1-9]\d*)\.(0|[1-9]\d*)$/.test(v)&&v.length<40;
export const validName = n=>typeof n==='string'&&/^@[a-z][a-z0-9-]{2,29}\/[a-z][a-z0-9-]{1,49}$/.test(n);
export const validPath = p=>typeof p==='string'&&p.length<=180&&/^[a-zA-Z0-9_./-]+$/.test(p)&&!p.startsWith('/')&&!p.split('/').some(x=>!x||x==='.'||x==='..');
export const versionCompare=(a,b)=>{const av=a.split('.').map(Number),bv=b.split('.').map(Number);return av[0]-bv[0]||av[1]-bv[1]||av[2]-bv[2];};
export async function validateManifest(m,tile){
  const errors=[];
  if(!m||typeof m!=='object'||Array.isArray(m))return ['Manifest must be an object.'];
  if(m.schemaVersion!==1)errors.push('schemaVersion must be 1.');
  if(!validName(m.name))errors.push('Use a scoped name: @your-handle/package-name.');
  if(!validVersion(m.version))errors.push('Use an exact version: major.minor.patch.');
  if(!['asset','world'].includes(m.kind))errors.push('kind must be asset or world.');
  if(typeof m.title!=='string'||m.title.length<2||m.title.length>100)errors.push('title must be 2–100 characters.');
  if(typeof m.description!=='string'||m.description.length>1000)errors.push('description is required (at most 1,000 characters).');
  if(typeof m.license!=='string'||!m.license.trim()||m.license.length>100)errors.push('A license is required.');
  if(typeof m.changelog!=='string'||!m.changelog.trim()||m.changelog.length>8000)errors.push('A changelog is required for every version (at most 8,000 characters).');
  if(!Array.isArray(m.files)||!m.files.length||m.files.length>128)errors.push('List between 1 and 128 package files.');
  else {
    const seen=new Set();let size=0;
    for(const f of m.files){if(!f||!validPath(f.path)||seen.has(f.path))errors.push('File paths must be unique, relative, and safe.');else seen.add(f.path);if(!Number.isSafeInteger(f?.bytes)||f.bytes<1||f.bytes>BUDGETS.asset.bytes)errors.push(`Invalid file size: ${f?.path}.`);else size+=f.bytes;if(!/^[a-f0-9]{64}$/.test(f?.sha256))errors.push(`Missing SHA-256: ${f?.path}.`);}
    if(size>MAX_PACKAGE_BYTES)errors.push('A package may contain at most 64 MiB.');
    if(m.kind==='world')for(const role of ['world','map','overview'])if(!m.content?.[role]||!seen.has(m.content[role])||!m.content[role].endsWith('.glb'))errors.push(`${role} content must name an included GLB file.`);
    if(m.kind==='asset'&&(!m.exports||typeof m.exports!=='object'||Array.isArray(m.exports)||!Object.keys(m.exports).length||Object.entries(m.exports).some(([k,v])=>!/^[a-z][a-z0-9-]{0,39}$/.test(k)||!seen.has(v))))errors.push('An asset needs named exports that refer to included files.');
  }
  if(m.dependencies!==undefined && (!m.dependencies||Array.isArray(m.dependencies)||typeof m.dependencies!=='object'||Object.keys(m.dependencies).length>32||Object.entries(m.dependencies).some(([n,v])=>!validName(n)||!validVersion(v)||n===m.name)))errors.push('Dependencies must use exact package names and versions (maximum 32).');
  if(m.kind==='world'){
    if(!await verifyTile(m.tile))errors.push('The host tile is immutable. Restore tile.lock.json from your reservation.');
    if(tile&&canonicalJSON(tile)!==canonicalJSON(m.tile))errors.push('This world does not match its reserved tile.');
  }else if(m.tile!==undefined)errors.push('Asset packages cannot own a world tile.');
  return [...new Set(errors)];
}
const identity=()=>[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1];
function multiply(a,b){const out=Array(16).fill(0);for(let c=0;c<4;c++)for(let r=0;r<4;r++)for(let k=0;k<4;k++)out[c*4+r]+=a[k*4+r]*b[c*4+k];return out;}
function transform(n){if(n.matrix){if(!Array.isArray(n.matrix)||n.matrix.length!==16||n.matrix[3]!==0||n.matrix[7]!==0||n.matrix[11]!==0||n.matrix[15]!==1)throw Error('Node matrices must be affine.');const m=n.matrix,cols=[[m[0],m[1],m[2]],[m[4],m[5],m[6]],[m[8],m[9],m[10]]],lengths=cols.map(c=>Math.hypot(...c));if(lengths.some(n=>!Number.isFinite(n)||n<1e-12)||[[0,1],[0,2],[1,2]].some(([a,b])=>Math.abs(cols[a].reduce((v,n,i)=>v+n*cols[b][i],0))/(lengths[a]*lengths[b])>1e-6))throw Error('Matrix transforms must be decomposable TRS without shear or zero scale.');return n.matrix;}const [x,y,z,w]=n.rotation||[0,0,0,1],[sx,sy,sz]=n.scale||[1,1,1],[tx,ty,tz]=n.translation||[0,0,0];return [(1-2*(y*y+z*z))*sx,2*(x*y+z*w)*sx,2*(x*z-y*w)*sx,0,2*(x*y-z*w)*sy,(1-2*(x*x+z*z))*sy,2*(y*z+x*w)*sy,0,2*(x*z+y*w)*sz,2*(y*z-x*w)*sz,(1-2*(x*x+y*y))*sz,0,tx,ty,tz,1];}
/** Inspect actual transformed vertices; never trust glTF accessor min/max or a CLI report. */
export function inspectGLB(input,role='asset',tile){
  const bytes=input instanceof Uint8Array?input:new Uint8Array(input),view=new DataView(bytes.buffer,bytes.byteOffset,bytes.byteLength),budget=BUDGETS[role];
  if(!budget)throw Error('Unknown content role.');
  if(bytes.length>budget.bytes)throw Error(`${role} exceeds ${budget.bytes} bytes.`);
  if(bytes.length<28||view.getUint32(0,true)!==0x46546c67||view.getUint32(4,true)!==2||view.getUint32(8,true)!==bytes.length)throw Error('Expected a complete GLB 2.0.');
  let gltf,bin,offset=12;
  while(offset<bytes.length){if(offset+8>bytes.length)throw Error('Invalid GLB chunk.');const size=view.getUint32(offset,true),type=view.getUint32(offset+4,true);offset+=8;if(size%4||offset+size>bytes.length)throw Error('Invalid GLB length.');if(type===0x4e4f534a){if(gltf)throw Error('Duplicate GLB JSON.');gltf=JSON.parse(new TextDecoder().decode(bytes.subarray(offset,offset+size)));}else if(type===0x004e4942){if(bin)throw Error('Duplicate GLB buffer.');bin=bytes.subarray(offset,offset+size);}offset+=size;}
  if(!gltf||!bin||gltf.asset?.version!=='2.0'||gltf.buffers?.length!==1||gltf.buffers[0].uri)throw Error('Use a self-contained GLB with embedded buffers and textures.');
  if((gltf.extensionsRequired||[]).some(e=>!['KHR_materials_unlit','KHR_materials_emissive_strength'].includes(e))||JSON.stringify(gltf).match(/EXT_meshopt_compression|KHR_draco_mesh_compression|EXT_mesh_gpu_instancing|KHR_texture_basisu/))throw Error('Export uncompressed GLB; compressed or instanced accessors are not supported by the validator.');
  if(gltf.animations?.length||gltf.skins?.length||gltf.cameras?.length||gltf.extensions?.KHR_lights_punctual)throw Error('Use static geometry without cameras, lights, skins or animation; the host owns the runtime.');
  if((gltf.materials?.length||0)>budget.drawCalls+8)throw Error('Remove unused materials before exporting.');
  if(gltf.scenes?.length!==1||!gltf.scenes[0].nodes?.length)throw Error('Export one scene with at least one mesh.');
  let triangles=0,drawCalls=0,maxRadius=0,minY=Infinity,maxY=-Infinity,textureBytes=0;
  const visited=new Set(),meshRefs=new Set(),bdv=new DataView(bin.buffer,bin.byteOffset,bin.byteLength);
  const array=(idx,position=false)=>{const a=gltf.accessors?.[idx],b=gltf.bufferViews?.[a?.bufferView];if(!a||!b||b.buffer!==0||a.sparse||!Number.isSafeInteger(a.count)||a.count<1||a.count>2_000_000)throw Error('Invalid or unsupported accessor.');const widths={5121:1,5123:2,5125:4,5126:4},width=widths[a.componentType];if(!width||(position&&(a.type!=='VEC3'||a.componentType!==5126||a.normalized)))throw Error('Positions must be FLOAT VEC3.');const n={SCALAR:1,VEC2:2,VEC3:3,VEC4:4}[a.type];if(!n)throw Error('Invalid accessor type.');const stride=b.byteStride||width*n,start=(b.byteOffset||0)+(a.byteOffset||0),end=start+(a.count-1)*stride+n*width;if(start<0||!Number.isSafeInteger(start)||stride<n*width||stride>252||end>bin.length||end>(b.byteOffset||0)+b.byteLength)throw Error('Accessor exceeds its buffer.');return {a,start,stride,width,n};};
  function visit(i,parent){if(visited.has(i))throw Error('Scene nodes must form a tree.');visited.add(i);const node=gltf.nodes?.[i];if(!node||visited.size>4096||node.skin!==undefined||node.camera!==undefined||node.extensions||node.weights)throw Error('Unsupported scene node.');const matrix=multiply(parent,transform(node));if(matrix.length!==16||matrix.some(n=>!Number.isFinite(n)))throw Error('Invalid transform.');if(node.mesh!==undefined){meshRefs.add(node.mesh);const mesh=gltf.meshes?.[node.mesh];if(!mesh?.primitives?.length)throw Error('Missing mesh.');for(const p of mesh.primitives){if((p.mode??4)!==4||p.targets||p.extensions)throw Error('Use static triangle meshes.');const pos=array(p.attributes?.POSITION,true);for(const [name,index] of Object.entries(p.attributes||{})){const attribute=array(index,name==='POSITION');if(attribute.a.count!==pos.a.count)throw Error('Vertex attribute counts must match.');}if(p.material!==undefined&&!gltf.materials?.[p.material])throw Error('Missing material.');let count=pos.a.count;if(p.indices!==undefined){const ids=array(p.indices);if(ids.a.type!=='SCALAR'||ids.a.componentType===5126)throw Error('Invalid indices.');count=ids.a.count;for(let j=0;j<count;j++){const at=ids.start+j*ids.stride,v=ids.width===1?bdv.getUint8(at):ids.width===2?bdv.getUint16(at,true):bdv.getUint32(at,true);if(v>=pos.a.count)throw Error('Index exceeds positions.');}}if(count%3)throw Error('Triangle counts must be divisible by three.');triangles+=count/3;drawCalls++;
      const transformed=[];
      for(let j=0;j<pos.a.count;j++){const at=pos.start+j*pos.stride,x=bdv.getFloat32(at,true),y=bdv.getFloat32(at+4,true),z=bdv.getFloat32(at+8,true),px=matrix[0]*x+matrix[4]*y+matrix[8]*z+matrix[12],py=matrix[1]*x+matrix[5]*y+matrix[9]*z+matrix[13],pz=matrix[2]*x+matrix[6]*y+matrix[10]*z+matrix[14];if(![px,py,pz].every(Number.isFinite))throw Error('Non-finite geometry.');maxRadius=Math.max(maxRadius,Math.hypot(px,pz));minY=Math.min(minY,py);maxY=Math.max(maxY,py);if(tile?.version>=2&&role!=='asset')transformed.push([px,py,pz]);}
      if(transformed.length){const ids=p.indices===undefined?null:array(p.indices),atIndex=j=>{if(!ids)return j;const at=ids.start+j*ids.stride;return ids.width===1?bdv.getUint8(at):ids.width===2?bdv.getUint16(at,true):bdv.getUint32(at,true);};for(let j=0;j<count;j+=3)if(!buildContains(tile,[transformed[atIndex(j)],transformed[atIndex(j+1)],transformed[atIndex(j+2)]],role))throw Error(`${role} geometry leaves its build area or crosses a protected river, path or platform boundary. Export inside the locked build regions.`);}
    }}for(const child of node.children||[])visit(child,matrix);}
  for(const n of gltf.scenes[0].nodes)visit(n,identity());
  if(!triangles||meshRefs.size!==(gltf.meshes?.length||0)||visited.size!==(gltf.nodes?.length||0))throw Error('Remove unused nodes and meshes before exporting.');
  if(triangles>budget.triangles||drawCalls>budget.drawCalls)throw Error(`${role}: ${triangles} triangles / ${drawCalls} draw calls exceeds ${budget.triangles} / ${budget.drawCalls}.`);
  for(const material of gltf.materials||[])if(!['OPAQUE','MASK'].includes(material.alphaMode||'OPAQUE')||material.extensions&&Object.keys(material.extensions).some(k=>!['KHR_materials_unlit','KHR_materials_emissive_strength'].includes(k)))throw Error('Use opaque or alpha-mask standard materials.');
  const images=gltf.images||[];if(images.length>budget.textures)throw Error(`${role} has too many textures.`);
  for(const img of images){const b=gltf.bufferViews?.[img.bufferView];if(img.uri||!b||b.buffer!==0||!['image/png','image/jpeg'].includes(img.mimeType))throw Error('Embed PNG or JPEG textures in the GLB.');const data=bin.subarray(b.byteOffset||0,(b.byteOffset||0)+b.byteLength);let w=0,h=0;if(img.mimeType==='image/png'&&data.length>=24&&data[0]===137&&data[1]===80){const d=new DataView(data.buffer,data.byteOffset,data.byteLength);w=d.getUint32(16);h=d.getUint32(20);}else if(img.mimeType==='image/jpeg'){let j=2;while(j+9<data.length){if(data[j]!==255)break;const type=data[j+1],len=(data[j+2]<<8)|data[j+3];if([192,193,194].includes(type)){h=(data[j+5]<<8)|data[j+6];w=(data[j+7]<<8)|data[j+8];break;}if(len<2)break;j+=len+2;}}if(!w||!h||w>4096||h>4096)throw Error('Invalid texture or texture larger than 4096 × 4096.');textureBytes+=w*h*4*4/3;}
  if(textureBytes>budget.textureBytes)throw Error(`${role} exceeds decoded texture memory budget.`);
  if(role!=='asset'&&!(tile?.version>=2)){const radius=role==='world'?SLOT.radius:SLOT.mapRadius,height=role==='world'?SLOT.height:SLOT.mapHeight;if(maxRadius>radius+.001||minY<-.01||maxY>height+.001)throw Error(`${role} geometry leaves its slot: radius ${maxRadius.toFixed(2)}/${radius}, height ${minY.toFixed(2)}–${maxY.toFixed(2)}/${height}. Keep content above local y=0.`);}
  return {triangles,drawCalls,bytes:bytes.length,textures:images.length,textureBytes:Math.ceil(textureBytes),bounds:{radius:maxRadius,minY,maxY}};
}
