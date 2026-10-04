#!/usr/bin/env node
import {readFile,writeFile,mkdir,stat,copyFile} from 'node:fs/promises';
import {resolve,dirname,join,relative,isAbsolute} from 'node:path';
import {fileURLToPath} from 'node:url';
import {createServer} from 'node:http';
import {availableSlots,starterSceneMap,starterSceneGLB,starterImageMap,IMAGE_MAP_BUDGET,validateWorld,SIDE_NAMES,SCENE_MAP_BUDGET} from '@threetopia/world-map';

import {inspectGLB} from '../glb.js';

const args=process.argv.slice(2),command=args.shift(),options={},positionals=[];
for(let i=0;i<args.length;i++){if(args[i].startsWith('--')){const key=args[i].slice(2);if(!['tile','registry','port','connect','format'].includes(key))throw new Error(`Unknown option --${key}`);if(!args[i+1]||args[i+1].startsWith('--'))throw new Error(`Missing value for --${key}`);options[key]=args[++i];}else positionals.push(args[i]);}
const readJSON=async p=>JSON.parse(await readFile(p,'utf8'));
const registry=async()=>options.registry?readJSON(resolve(options.registry)):undefined;
const within=(root,p)=>{const file=resolve(root,p),rel=relative(root,file);if(rel.startsWith('..')||isAbsolute(rel))throw new Error('Map files must stay inside the world package.');return file;};
const sdkRoot=dirname(fileURLToPath(import.meta.resolve('@threetopia/world-map')));
const threeRoot=dirname(fileURLToPath(import.meta.resolve('three')));

const rendererFiles=['index.js','image-format.js','scene-format.js','scene-renderer.js','scene-renderer.css','scene-camera.js','gltf-scene.js'];
const threeFiles=['three.webgpu.js','three.core.js','three.tsl.js'];
const addonFiles=['loaders/GLTFLoader.js','utils/BufferGeometryUtils.js','utils/SkeletonUtils.js'];
const previewPage=`<!doctype html><html lang="en"><meta charset="utf-8"><meta name="viewport" content="width=device-width"><title>Threetopia · scene map preview</title><link rel="icon" href="data:,"><link rel="stylesheet" href="./scene-renderer.css"><style>body{margin:0;font-family:system-ui;background:#144d5b;color:#eee2c4}#map{position:absolute;inset:0}nav{position:absolute;left:24px;top:24px;z-index:5;display:flex;gap:8px;align-items:center}button{padding:12px;border:1px solid #dfc98f77;border-radius:8px;background:#123d42;color:#eee2c4}output{position:absolute;bottom:20px;left:24px;font:12px monospace;z-index:5}</style><div id="map"></div><nav><strong id="title">Map preview</strong><button id="fit">Fit tile</button><button id="motion">Pause motion</button></nav><output id="stats" role="status"></output><script type="importmap">{"imports":{"three":"./three.webgpu.js","three/webgpu":"./three.webgpu.js","three/tsl":"./three.tsl.js","three/addons/":"./addons/"}}</script><script type="module">import {SceneAtlasRenderer} from './scene-renderer.js';import {loadGLTFScene} from './gltf-scene.js';const world=await fetch('./world.json').then(r=>r.json()),map=await fetch('./map.json').then(r=>r.json());document.getElementById('title').textContent=world.title;const tile={...world,...world.tile,short:world.title,creator:'You',color:'#85966b',sceneMap:'./map.json',sceneData:map,minHeight:map.bounds.minY,maxHeight:map.bounds.maxY,landmarks:map.landmarks};const registry={version:1,tiles:[tile]};const view=new SceneAtlasRenderer(document.getElementById('map'),registry,{loadScene:(r,c,p)=>loadGLTFScene(registry,r,c,p),onStats:s=>document.getElementById('stats').textContent=s.loadedTiles?'Actual scene · full tile · '+s.triangles.toLocaleString()+' triangles':'Loading scene…',onError:e=>document.getElementById('stats').textContent=e.message});document.getElementById('fit').onclick=()=>view.fit();document.getElementById('motion').onclick=e=>{view.setOptions({motion:!view.motion});e.target.textContent=view.motion?'Pause motion':'Play motion';};</script></html>`;
const imageRendererFiles=['index.js','image-format.js','scene-format.js','image-renderer.js','image-renderer.css','image-camera.js','scene-camera.js','map-atmosphere.js','map-motion.js'];
const imagePreviewPage=previewPage.replaceAll('scene map preview','illustrated map preview').replaceAll('scene-renderer.css','image-renderer.css').replace('"three":"./three.webgpu.js"','"three":"./three.module.js"').replace(/<script type="module">[\s\S]*?<\/script>/,`<script type="module">import {ImageAtlasRenderer} from './image-renderer.js';const world=await fetch('./world.json').then(r=>r.json());document.getElementById('title').textContent=world.title;const view=new ImageAtlasRenderer(document.getElementById('map'),{version:1,tiles:[{...world,...world.tile,short:world.title,imageMap:'./map.json'}]},{onStats:s=>document.getElementById('stats').textContent=s.loadedTiles?'Illustrated tile · '+s.layers+' layers · one scene':'Loading map…',onError:e=>document.getElementById('stats').textContent=e.message});document.getElementById('fit').onclick=()=>view.fit();document.getElementById('motion').onclick=e=>{view.setOptions({motion:!view.motion});e.target.textContent=view.motion?'Pause motion':'Play motion';};</script>`);
async function imageAssets(root,world,map){
  const assets=new Map();
  for(const layer of [map.terrain,...map.components])for(const file of [layer.src,layer.preview].filter(Boolean)){
    if(file.startsWith('/')||file.includes('..'))throw Error('Portable map images must use package-relative paths.');
    const path=within(dirname(within(root,world.map)),file),info=await stat(path);
    if(!info.isFile()||info.size>IMAGE_MAP_BUDGET.assetBytes)throw Error(file+': image missing or exceeds the 2 MiB budget.');
    assets.set(file,path);
  }
  return {assets,geometry:null};
}
const mime=file=>file.endsWith('.css')?'text/css':file.endsWith('.glb')?'model/gltf-binary':/\.(webp|png|avif)$/.test(file)?'image/'+file.split('.').at(-1):'text/javascript';
async function sceneAssets(root,world,map){
  if(map.version!==3||map.source.kind!=='gltf')throw Error('Build and preview require a version 3 scene-tile with a local GLB. Runtime adapters are integrated in the shared application.');
  const file=map.source.url,path=within(dirname(within(root,world.map)),file),info=await stat(path);
  if(!info.isFile()||info.size>SCENE_MAP_BUDGET.assetBytes)throw Error(file+': scene missing or exceeds the 64 MiB budget.');
  const geometry=inspectGLB(await readFile(path),map.bounds);
  return {assets:new Map([[file,path]]),geometry};
}
async function runtimeAssets(map){
  const images=map.version===2;
  const files=new Map();
  for(const file of images?imageRendererFiles:rendererFiles)files.set(file,join(sdkRoot,file));
  for(const file of images?['three.module.js','three.core.js']:threeFiles)files.set(file,join(threeRoot,file));
  for(const file of images?[]:addonFiles)files.set('addons/'+file,join(threeRoot,'../examples/jsm',file));
  return files;
}

async function check(root){
  const world=await readJSON(join(root,'world.json'));let map;
  if(typeof world.map==='string')try{map=await readJSON(within(root,world.map));}catch(e){throw new Error(`Map representation could not be read: ${e.message}`);}
  const errors=validateWorld(world,map,await registry());if(errors.length)throw new Error(errors.map(e=>'  • '+e).join('\n'));
  const {assets,geometry}=await (map.version===2?imageAssets:sceneAssets)(root,world,map);
  return {world,map,assets,geometry};
}
try{
  if(command==='create'){
    const target=positionals[0];if(!target)throw new Error('Usage: threetopia create <directory> --tile q,r');
    const root=resolve(target),id=root.split(/[\\/]/).at(-1);if(!/^[a-z][a-z0-9-]{1,63}$/.test(id))throw new Error('Use a lowercase name such as coral-garden.');
    const coords=(options.tile??'0,0').split(',').map(Number);if(coords.length!==2||coords.some(n=>!Number.isInteger(n)||Math.abs(n)>1000))throw new Error('--tile must be integer q,r coordinates within ±1000.');
    const [q,r]=coords,reg=await registry(),slot=reg?availableSlots(reg.tiles).find(t=>t.q===q&&t.r===r):null;
    if(reg&&!slot)throw new Error('This tile is occupied or outside the first incomplete expansion ring. Run threetopia slots.');
    const edges=slot?.edges??Array(6).fill('open-sea');if(options.connect){const side=SIDE_NAMES.indexOf(options.connect.toUpperCase());if(side<0)throw new Error('--connect must be E, SE, SW, W, NW or NE.');edges[side]='shore-path';}
    const format=options.format??'scene';if(!['image','scene'].includes(format))throw Error('--format must be image or scene.');
    const images=format==='image';
    // Never overwrite a creator's existing project.
    await mkdir(root,{recursive:false});
    const world={version:1,id,title:id.split('-').map(s=>s[0].toUpperCase()+s.slice(1)).join(' '),tile:{q,r},edges,...(images?{}:{scene:{kind:'gltf',url:'assets/world.glb'}}),map:'map.json'};
    await writeFile(join(root,'world.json'),JSON.stringify(world,null,2)+'\n');await writeFile(join(root,'map.json'),JSON.stringify(images?starterImageMap():starterSceneMap(),null,2)+'\n');
    await mkdir(join(root,'assets'));if(images)await copyFile(join(sdkRoot,'assets/starter.webp'),join(root,'assets/landscape.webp'));else await writeFile(join(root,'assets/world.glb'),starterSceneGLB(edges));
    await writeFile(join(root,'README.md'),images?`# ${world.title}\n\nYour required map.json defines an illustrated tile: a transparent landscape plus separate components and landmarks. Replace assets/landscape.webp with your artwork and add tile-local layers. All art, sprites, Three.js water and clouds share one scene, camera and clock; do not add screen-space art overlays.\n\n    pnpm threetopia check ${target}\n    pnpm threetopia preview ${target}\n    pnpm threetopia build ${target}\n\nThe map is a designed representation. Integrate your playable world separately. Match the six Wang edges with your neighbours. Selecting a tile is a placement proposal, not a reservation. See /docs/#image-layers.\n`:`# ${world.title}\n\nThe same assets/world.glb is the playable scene and map source. The example is a real terrain mesh. Replace it with your world, in metres, Y up and centred inside a radius-400 hexagon. Keep world.scene and map.source identical.\n\nmap.json is mandatory: declare the real height bounds, exact small-detail node names to omit in overview, and landmark positions in tile-local XYZ metres. Do not add separate illustrated terrain. Export an uncompressed GLB with embedded textures for this portable preview; custom shaders or instancing need a registered source adapter.\n\n    pnpm threetopia check ${target}\n    pnpm threetopia preview ${target}\n    pnpm threetopia build ${target}\n\nZoom is bounded between one full tile and all occupied tiles. A one-tile preview therefore has one zoom scale. Placement remains a proposal. Coordinate shore-path signatures on both neighbours before integration. See /docs/#scene-map.\n`);
    console.log(`Created ${target} at (${q}, ${r}), including its required map.json.\nNext: threetopia check ${target} && threetopia preview ${target}\nThis is a local placement proposal; no tile has been reserved.`);
  }else if(command==='slots'){
    const reg=await registry();if(!reg)throw new Error('Use --registry path/to/registry.json.');
    for(const s of availableSlots(reg.tiles))console.log(`(${s.q}, ${s.r}) · ring ${s.ring} · ${s.neighbours.map(n=>SIDE_NAMES[n.side]+': '+n.tile+' / '+n.signature).join(' · ')}`);
  }else if(['check','build','preview'].includes(command)){
    const root=resolve(positionals[0]??'.'),{world,map,assets:sceneFiles,geometry}=await check(root);
    const page=map.version===2?imagePreviewPage:previewPage;
    if(command==='check'){console.log(geometry?`✓ ${world.id}: actual scene and required map match, ${geometry.triangles.toLocaleString()} triangles; geometry fits the tile.\n${options.registry?'✓ Placement and neighbour signatures match.':'Use --registry to check placement and connections.'}`:`✓ ${world.id}: illustrated map, local image assets and bounded components are valid.\n${options.registry?'✓ Placement and neighbour signatures match.':'Use --registry to check placement and connections.'}`);}
    else if(command==='build'){
      const output=join(root,'dist-map');await mkdir(output,{recursive:true});await writeFile(join(output,'world.json'),JSON.stringify({...world,map:'map.json'},null,2));await writeFile(join(output,'map.json'),JSON.stringify(map));await writeFile(join(output,'index.html'),page);
      for(const [file,path] of [...await runtimeAssets(map),...sceneFiles]){const dest=within(output,file);await mkdir(dirname(dest),{recursive:true});await copyFile(path,dest);}
      console.log(`Built ${output}. Serve this folder with any static HTTP server.`);
    }else{
      const port=Number(options.port??5195);if(!Number.isInteger(port)||port<1024||port>65535)throw new Error('--port must be 1024–65535.');
      const assets=new Map([['/',{body:page,type:'text/html'}],['/world.json',{body:JSON.stringify({...world,map:'map.json'}),type:'application/json'}],['/map.json',{body:JSON.stringify(map),type:'application/json'}]]);
      for(const [file,path] of [...await runtimeAssets(map),...sceneFiles])assets.set('/'+file,{body:await readFile(path),type:mime(file)});
      const server=createServer((req,res)=>{const asset=assets.get(new URL(req.url,'http://localhost').pathname);if(req.method!=='GET'||!asset){res.writeHead(404);res.end('Not found');return;}res.writeHead(200,{'Content-Type':asset.type,'Cache-Control':'no-store','X-Content-Type-Options':'nosniff'});res.end(asset.body);});
      server.on('error',error=>{console.error(error.message);process.exitCode=1;});server.listen(port,'127.0.0.1',()=>console.log(`Preview ${world.title}: http://127.0.0.1:${port}/\nCtrl+C to stop.`));
    }
  }else{
    console.log('Threetopia CLI 0.1\n\n  create <directory> --tile q,r [--registry file] [--connect E] [--format image|scene]\n  check [directory] [--registry file]\n  preview [directory] [--port 5195]\n  build [directory]\n  slots --registry file\n\nEvery world requires a map version. Budgets and coordinates: /docs/.');if(command&&command!=='help')process.exitCode=1;
  }
}catch(error){console.error(`Threetopia: ${error.message}`);process.exitCode=1;}
