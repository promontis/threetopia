import {readFile,writeFile,mkdir} from 'node:fs/promises';
import {createHash} from 'node:crypto';
import {gzipSync} from 'node:zlib';
import {execFileSync} from 'node:child_process';
import * as THREE from 'three-world';

// Retain the light whale body, with the original medium-LOD flukes so the
// notched, curved tail silhouette holds up when a whole tile fills the map.
// The map ships neither the high-poly whale nor the source world's renderer.
const revision='d32799fcd85b79fb2fde3c4254f9d3805edecee3';
const cache='.context/tidewater-wildlife/source',output='public/map/lite/tidewater/wildlife';
const hashes={
  'humpback.json':'c47390c365da1c8c6fa73bea4996bf51073a973770c1942e8993f545e283a354',
  'humpback.bin':'b3a31801a393489331bc3dd4fd5be64cbad32ac4e159f5180e0eb028d489a92d',
  'humpback_albedo.png':'5daaa6727f5304aaa3b6f6ef86cedcebc7cf922376a5c0e7caad66c4f4a5efe1',
};
const hash=bytes=>createHash('sha256').update(bytes).digest('hex');
await mkdir(cache,{recursive:true});await mkdir(output,{recursive:true});
async function source(name){
  let bytes;try{bytes=await readFile(`${cache}/${name}`);}catch(error){if(error.code!=='ENOENT')throw error;}
  if(!bytes){
    const response=await fetch(`https://raw.githubusercontent.com/dgreenheck/tidewater/${revision}/public/models/whale/${name}`);
    if(!response.ok)throw Error(`Tidewater ${name}: ${response.status}`);
    bytes=Buffer.from(await response.arrayBuffer());await writeFile(`${cache}/${name}`,bytes);
  }
  if(hash(bytes)!==hashes[name])throw Error(`Unexpected source hash: ${name}`);
  return bytes;
}
const [raw,bin]=await Promise.all([source('humpback.json'),source('humpback.bin'),source('humpback_albedo.png')]);
const manifest=JSON.parse(raw);
const gullSource=await readFile('packages/world-sources/tidewater/src/world/Gulls.js','utf8');
const gullHash=hash(gullSource);
if(gullHash!=='134c21634d3b766d2d445b941bef44f5d5df555f5fb5db4ec884a5ce48a4e3c9')throw Error('Review the updated Tidewater gull before rebaking.');
// Evaluate only the source's standalone geometry factory; no TSL/world imports.
const gull=new Function('THREE',`${gullSource.slice(gullSource.indexOf('function gullGeometry()'))}\nreturn gullGeometry();`)(THREE);
const chunks=[];let length=0;
function pack(array){
  const padding=(4-length%4)%4;if(padding){chunks.push(Buffer.alloc(padding));length+=padding;}
  const offset=length,bytes=Buffer.from(array.buffer,array.byteOffset,array.byteLength);chunks.push(bytes);length+=bytes.length;
  return {offset,count:array.length};
}
const merged={position:[],normal:[],uv:[],rig:[],index:[]};
for(const [lod,flukes] of [[manifest.levels.at(-1),false],[manifest.levels[1],true]]){
  const attributes=Object.fromEntries([['position',Float32Array,3],['normal',Int16Array,3],['uv',Float32Array,2],['rig',Float32Array,4]]
    .map(([name,Type,size])=>[name,{array:new Type(bin.buffer,bin.byteOffset+lod[name],lod.vertices*size),size}]));
  // The native fluke UV island puts its ventral white pattern on the dorsal
  // face, opposite both pectoral fins. Flip within this island only, keeping
  // its original slate upper skin and white underside on the correct faces.
  let flukeVMin=Infinity,flukeVMax=-Infinity;
  if(flukes)for(let i=0;i<lod.vertices;i++)if(attributes.rig.array[i*4+1]===3){
    flukeVMin=Math.min(flukeVMin,attributes.uv.array[i*2+1]);flukeVMax=Math.max(flukeVMax,attributes.uv.array[i*2+1]);
  }
  const indices=new Uint32Array(bin.buffer,bin.byteOffset+lod.index,lod.indices),remap=new Map();
  for(let i=0;i<indices.length;i+=3){
    const face=Array.from(indices.subarray(i,i+3));
    if(!face.every(vertex=>(attributes.rig.array[vertex*4+1]===3)===flukes))continue;
    for(const vertex of face){
      if(!remap.has(vertex)){
        remap.set(vertex,merged.position.length/3);
        for(const [name,{array,size}] of Object.entries(attributes)){
          const values=Array.from(array.subarray(vertex*size,(vertex+1)*size));
          if(flukes&&name==='uv')values[1]=flukeVMin+flukeVMax-values[1];
          merged[name].push(...values);
        }
      }
      merged.index.push(remap.get(vertex));
    }
  }
}
const whale={vertices:merged.position.length/3,triangles:merged.index.length/3,
  position:pack(Float32Array.from(merged.position)),normal:pack(Int16Array.from(merged.normal)),
  uv:pack(Float32Array.from(merged.uv)),rig:pack(Float32Array.from(merged.rig)),index:pack(Uint16Array.from(merged.index)),
  snoutZ:manifest.snoutZ,notchZ:manifest.notchZ,centerline:manifest.centerline,pectoral:manifest.pectoral,
};
const bird={vertices:gull.attributes.position.count,triangles:gull.index.count/3,index:pack(Uint16Array.from(gull.index.array))};
for(const name of ['position','normal','color','side','span'])bird[name]=pack(gull.attributes[name].array);
gull.dispose();
const bytes=gzipSync(Buffer.concat(chunks),{level:9});await writeFile(`${output}/geometry.bin.gz`,bytes);
execFileSync('python3',['-c',
  'from PIL import Image\nimport sys\nim=Image.open(sys.argv[1]).convert("RGB")\nim.resize((1024,512),Image.Resampling.LANCZOS).save(sys.argv[2],quality=88,method=6)',
  `${cache}/humpback_albedo.png`,`${output}/humpback.webp`]);
await writeFile(`${output}/wildlife.json`,JSON.stringify({version:1,
  source:{creator:'Dan Greenheck',url:'https://github.com/dgreenheck/tidewater',revision,license:'MIT',hashes:{...hashes,'Gulls.js':gullHash}},
  adaptations:['Original whale lod2 body and pectoral fins, with lod1 flukes and the native rig','Fluke UV island flipped vertically to place slate skin above and the white pattern underneath','Whale albedo reduced from 4096×2048 to 1024×512','Exact native gull geometry; compact flight and swim routes use the map clock'],
  geometry:'geometry.bin.gz',albedo:'humpback.webp',whale,gull:bird,
},null,2)+'\n');
await writeFile(`${output}/LICENSE`,await readFile('packages/world-sources/tidewater/LICENSE'));
console.log(`Tidewater wildlife: ${whale.triangles} whale + ${bird.triangles} triangles/gull, ${(bytes.length/1024).toFixed(1)} KiB geometry`);
