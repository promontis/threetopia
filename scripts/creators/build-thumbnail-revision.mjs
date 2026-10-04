import {createHash} from 'node:crypto';
import {readdir,readFile,writeFile} from 'node:fs/promises';

// The actual deployed renderer and host assets determine the photographs.
// A new build invalidates stored photos automatically without a manual version bump.
const hash=createHash('sha256');
async function walk(folder){
  for(const entry of (await readdir(folder,{withFileTypes:true})).sort((a,b)=>a.name.localeCompare(b.name))){
    const path=`${folder}/${entry.name}`;
    if(entry.isDirectory())await walk(path);
    else {hash.update(path);hash.update(await readFile(path));}
  }
}
await walk('dist/world-map/assets');await walk('dist/world-map/map');await walk('public/map/hosts');
await writeFile('src/creators/thumbnail-revision.ts',`// Generated from the deployed renderer and host assets.\nexport const THUMBNAIL_RENDERER_REVISION = '${hash.digest('hex')}';\n`);
