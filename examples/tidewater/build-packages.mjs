import {mkdir,readFile,writeFile,readdir} from 'node:fs/promises';
import {resolve,join,relative,dirname} from 'node:path';
import {fileURLToPath} from 'node:url';
import {parseArgs} from 'node:util';
import {entries,name} from './package-layout.mjs';
import {exportMap} from './export-map.mjs';
import {buildFullTidewater} from './build-full.mjs';
import {buildComponentPreview} from './build-component-preview.mjs';
import {checkProject} from '../../packages/cli/lib/project-check.js';

const root=fileURLToPath(new URL('../../packages/components/',import.meta.url));
async function files(dir){const result=[];for(const e of await readdir(dir,{withFileTypes:true})){if(e.name==='node_modules'||e.name.startsWith('.'))continue;const p=join(dir,e.name);if(e.isDirectory())result.push(...await files(p));else result.push(p);}return result.sort();}
export async function buildTidewaterPackages(output,{creator='dgreenheck',registry='https://creators.threetopia.com',tile}={}) {
  if(!/^[a-z][a-z0-9-]{2,29}$/.test(creator))throw Error('Use your lowercase creator handle.');
  await mkdir(output,{recursive:true});
  const roles=[...Object.keys(entries).filter(role=>role!=='world-tile'),'rocks','gulls','map-tile'];
  const metadata=new Map(await Promise.all(roles.map(async role=>[name(role),{role,...JSON.parse(await readFile(join(root,`tidewater-${role}/package.json`),'utf8'))}])));
  const ordered=[],visiting=new Set(),visited=new Set();
  function visit(key){if(visiting.has(key))throw Error(`Circular package dependency: ${key}`);if(visited.has(key))return;const p=metadata.get(key);if(!p)throw Error(`Missing extracted dependency: ${key}`);visiting.add(key);for(const dep of Object.keys(p.dependencies||{}))visit(dep);visiting.delete(key);visited.add(key);ordered.push(p);}
  roles.forEach(role=>visit(name(role)));
  const projects=[];
  for(const p of ordered){
    const source=join(root,`tidewater-${p.role}`),directory=join(output,`tidewater-${p.role}`);await mkdir(directory);
    const included=[];
    const add=async(path,data)=>{await mkdir(dirname(join(directory,path)),{recursive:true});await writeFile(join(directory,path),data);included.push(path);};
    const dependencies=Object.fromEntries(Object.keys(p.dependencies||{}).map(dep=>[dep.replace('@dgreenheck/',`@${creator}/`),'0.1.0']));
    for(const path of await files(source)){
      const file=relative(source,path);if(file==='package.json'||p.role==='map-tile'&&file.startsWith('assets/'))continue;
      let data=await readFile(path);if(/\.(?:js|json|md)$/.test(file))data=Buffer.from(data.toString().replaceAll('@dgreenheck/tidewater-',`@${creator}/tidewater-`));
      await add(file,data);
    }
    const {role,...pkg}=p;delete pkg.devDependencies;
    await add('package.json',JSON.stringify({...pkg,name:`@${creator}/tidewater-${role}`,dependencies},null,2)+'\n');
    const exports={component:'index.js'};
    if(role==='map-tile')for(const lod of ['map','overview']){await add(`${lod}.glb`,await exportMap(lod,{tile}));exports[lod]=`${lod}.glb`;}
    const presentation=['rocks','gulls','map-tile'].includes(role)?{runtime:await buildComponentPreview(role,add)}:{preview:{format:'scene-reference-v1',package:`@${creator}/tidewater-world-tile`,version:'0.1.0',focus:role}};
    const manifest={...presentation,schemaVersion:1,name:pkg.name.replace('@dgreenheck/',`@${creator}/`),version:'0.1.0',kind:'asset',title:`Tidewater ${role}`,description:p.description,license:['audio','debris','whale','ui'].includes(role)?'MIT; asset licenses and credits included':'MIT',changelog:'Extract reusable implementation with explicit dependencies and original source provenance.',exports,dependencies};
    await writeFile(join(directory,'threetopia.json'),JSON.stringify({registry,manifest,files:included},null,2)+'\n');await checkProject(directory);
    projects.push({name:manifest.name,role,kind:'asset',directory,dependencies});
  }
  const world=await buildFullTidewater(join(output,'tidewater-world-tile'),{creator,registry,tile});
  projects.push({...world,role:'world-tile'});
  await writeFile(join(output,'packages.json'),JSON.stringify({schemaVersion:1,previewOnly:!tile,projects},null,2)+'\n');
  return projects;
}
if(resolve(process.argv[1]||'')===fileURLToPath(import.meta.url)){
  const {values}=parseArgs({options:{output:{type:'string',default:'.context/tidewater-packages-complete'},creator:{type:'string',default:'dgreenheck'},registry:{type:'string',default:'https://creators.threetopia.com'},tile:{type:'string'}}});
  const projects=await buildTidewaterPackages(resolve(values.output),{...values,tile:values.tile?JSON.parse(await readFile(values.tile,'utf8')):undefined});
  console.log(JSON.stringify({projects,notice:values.tile?'World export uses the supplied tile lock.':'World output is a local preview. Supply --tile <reserved-world/tile.lock.json> to build the registrable world package.'},null,2));
}
