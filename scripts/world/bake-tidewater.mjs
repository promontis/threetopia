import { TerrainData } from '../../packages/world-sources/tidewater/src/world/TerrainData.js';
import { writeFile, mkdir } from 'node:fs/promises';
import { gzipSync } from 'node:zlib';
const data=new TerrainData(7);
const root=new URL('../../public/world-assets/tidewater/',import.meta.url);await mkdir(root,{recursive:true});
const arrays={};
for(const key of ['heights','rock','sand','path','gully','seagrass','rubble']) {
 const array=data[key];const file=key+'.bin.gz';arrays[key]={file,type:array.constructor.name};await writeFile(new URL(file,root),gzipSync(new Uint8Array(array.buffer),{level:9}));
}
await writeFile(new URL('terrain.json',root),JSON.stringify({size:data.size,res:data.res,texel:data.texel,origin:data.origin,rockSites:data.rockSites,paths:data.paths,arrays}));
console.log('Baked original Tidewater terrain',data.timings);
