import {setHostTime} from '../../../packages/platform/host-material.js';
import * as T from 'three';
import {OrbitControls} from 'three/addons/controls/OrbitControls.js';
import {createCompositionSlot} from './composition-slot';
import {createLandscapeSampler,createTerrain,createCoastalNature} from './landscape';
import {createTidewaterOcean} from './tidewater-ocean';
import {loadTidewaterWildlife} from './tidewater-wildlife';
import {createHoverCity} from './hover-city';
import {installPunkMaterials,type PunkInteriors} from './punk-materials';
import {createWorldDetails} from './world-details';
import {createWorldCardLayout} from './world-cards';
import {mountTileSelection} from './tile-selection';
import {createMapLighting} from './lighting';
import {createMapClouds} from './clouds';
import {createMapPostProcessing} from './post-processing';
import {createSettingsPanel} from './settings-panel';
import {createMapVideoRecorder} from './video-recorder';
import type {VideoPose} from './video-path';
import {DEFAULT_CREATOR_MAP_SETTINGS,DEFAULT_MAP_SETTINGS,mapPixelRatio,normalizeMapSettings,readMapSettings,saveMapSettings,type SettingKey} from './settings-model';
import {animateMapLandmark,disposeMapDeformations} from './materials';
import {createSakuraBoatMotion} from './sakura-boat';
import {createPunkCarMotion} from './punk-car';
import {softenMapShadows,trackMapShadowDraws} from './shadows';
import {loadLandmark} from '../../../packages/world-map/landmark.js';
import type {SampledTileSurface,LandmarkLOD} from '../../../packages/world-map/tile-slot.js';
import {MAP_TILES,COMPOSITION_RADIUS,mapCentre} from './layout';
import {fitMapOverview,MAP_OVERVIEW_OFFSET,type MapInsets} from './map-overview';
import {framedTarget} from './orthographic-frame';
import {frameTileSnapshot} from '../../creators/tile-snapshot';

type Asset=Awaited<ReturnType<typeof loadLandmark>>;
type Definition=typeof MAP_TILES[number];
interface Manifest {title:string;surface:string|null;source:{creator:string;url:string};bounds:{height:number};lods:Array<{level:LandmarkLOD;url:string}>;interiors?:PunkInteriors}
interface Tile {definition:Definition;manifest:Manifest;host:ReturnType<typeof createCompositionSlot>;near:Asset;far:Asset;lod:LandmarkLOD;label:HTMLElement;riverboat?:ReturnType<typeof createSakuraBoatMotion>;car?:ReturnType<typeof createPunkCarMotion>;disposeInteriors?:()=>void}
const $=<E extends HTMLElement=HTMLElement>(s:string)=>document.querySelector<E>(s)!;
const creatorMode=new URLSearchParams(location.search).has('creator');
const loadProgress=(stage:string,completed?:number,total?:number)=>{if(creatorMode)parent.postMessage({type:'creator:loading',stage,completed,total},location.origin);};
const thumbnailMode=creatorMode&&new URLSearchParams(location.search).has('thumbnail');
const host=$('.tile-canvas'),status=$('[data-status]'),abort=new AbortController(),on={signal:abort.signal},reduced=matchMedia('(prefers-reduced-motion: reduce)');
const scene=new T.Scene();scene.background=new T.Color('#438b96');
const camera=new T.OrthographicCamera(-30,30,30,-30,1,360),renderer=new T.WebGLRenderer({antialias:true,powerPreference:'high-performance'});
const gl=renderer.getContext(),maxRenderSize=Math.min(renderer.capabilities.maxTextureSize,gl.getParameter(gl.MAX_RENDERBUFFER_SIZE),...gl.getParameter(gl.MAX_VIEWPORT_DIMS));
renderer.outputColorSpace=T.SRGBColorSpace;renderer.toneMapping=T.ACESFilmicToneMapping;renderer.toneMappingExposure=1;
renderer.shadowMap.enabled=true;renderer.shadowMap.type=T.PCFShadowMap;renderer.shadowMap.autoUpdate=false;host.append(renderer.domElement);
const lighting=createMapLighting(renderer,scene),post=createMapPostProcessing(renderer,camera),bufferSize=new T.Vector2();
const settingsDefaults=creatorMode?DEFAULT_CREATOR_MAP_SETTINGS:DEFAULT_MAP_SETTINGS;
const settings=thumbnailMode?normalizeMapSettings({...DEFAULT_MAP_SETTINGS,pixelRatio:1,clouds:false,labels:false},renderer.capabilities.maxSamples):readMapSettings(renderer.capabilities.maxSamples,creatorMode);
renderer.info.autoReset=false;
const controls=new OrbitControls(camera,renderer.domElement);controls.enableDamping=false;controls.enablePan=false;controls.screenSpacePanning=false;controls.rotateSpeed=.55;controls.zoomSpeed=.65;controls.minPolarAngle=Math.PI*.20;controls.maxPolarAngle=Math.PI*.36;
const time={value:0},tiles:Tile[]=[],allCentre=new T.Vector3(3.6,1.1,-7.2);
const clouds=createMapClouds(time,lighting.direction);scene.add(clouds.mesh);
let ready=false,disposed=false,motion=!thumbnailMode&&!reduced.matches,raf=0,last=0,span=50,selected='all',frames:number[]=[];
let cpuMs=0;
let registryExtent=0;
let registryOutline:T.Vector3[]|undefined;
let registryInsets:MapInsets={right:0,bottom:0};
let registryCameraLocked=false;
const registryTicks=new Set<()=>void>();
const frameWaiters=new Set<(rendered:boolean)=>void>();
function whenRendered():Promise<boolean>{if(disposed)return Promise.resolve(false);return new Promise(resolve=>{frameWaiters.add(resolve);schedule();});}
let videoSize:{width:number;height:number}|null=null;
let captureCost={passes:0,drawCalls:0,triangles:0},sceneCost={drawCalls:0,triangles:0},lastShadow=-Infinity,shadowUpdated=false;
const shadowCost={drawCalls:0,triangles:0};
let observer:ResizeObserver|undefined;
let terrain:Awaited<ReturnType<typeof createTerrain>>|undefined,ocean:ReturnType<typeof createTidewaterOcean>|undefined,nature:Awaited<ReturnType<typeof createCoastalNature>>|undefined;
let wildlife:Awaited<ReturnType<typeof loadTidewaterWildlife>>|undefined;
const hover=createHoverCity(time);scene.add(hover.root);
const details=createWorldDetails(id=>{last=0;focus(id);},()=>{last=0;schedule();});
const cards=createWorldCardLayout($('.world-labels'));
const settingsUI=createSettingsPanel({root:$('.tile-study'),settings,maxSamples:renderer.capabilities.maxSamples,
  opened:()=>video.close(),
  change(key,value){Object.assign(settings,normalizeMapSettings({...settings,[key]:value},renderer.capabilities.maxSamples,settingsDefaults));applySettings(key);return saveMapSettings(settings,creatorMode);},
  reset(){Object.assign(settings,normalizeMapSettings(settingsDefaults,renderer.capabilities.maxSamples));applySettings();return saveMapSettings(settings,creatorMode);},
  resetView:reset,
  zoom(fraction){zoom((1+fraction*(controls.maxZoom-1))/camera.zoom);},
  stats:()=>({fps:frameRate(),cpuMs,width:bufferSize.x,height:bufferSize.y,dpr:renderer.getPixelRatio(),paused:!animating()}),
});
const video=createMapVideoRecorder({root:$('.tile-study'),canvas:renderer.domElement,
  canRecord:()=>ready&&!details.open,open:()=>settingsUI.close(),beforeExport:()=>details.close(),requestFrame:schedule,
  pose:()=>{
    const orbit=new T.Spherical().setFromVector3(camera.position.clone().sub(controls.target));
    return {target:framedTarget(camera,controls.target).toArray() as [number,number,number],azimuth:orbit.theta,polar:orbit.phi,radius:orbit.radius,
      height:(camera.top-camera.bottom)/camera.zoom,aspect:(camera.right-camera.left)/(camera.top-camera.bottom),worldTime:time.value};
  },
  beginPlayback(size){
    const live={position:camera.position.clone(),quaternion:camera.quaternion.clone(),target:controls.target.clone(),zoom:camera.zoom,view:camera.view?{...camera.view}:null,time:time.value,enabled:controls.enabled};
    cancelAnimationFrame(raf);raf=0;controls.enabled=false;videoSize=size;
    camera.clearViewOffset();
    renderer.setPixelRatio(1);renderer.setSize(size.width,size.height,false);renderer.getDrawingBufferSize(bufferSize);
    post.resize(size.width,size.height);ocean?.resize(size.width,size.height);renderer.domElement.style.objectFit='contain';
    const orbit=new T.Spherical();
    return {
      render(pose:VideoPose){
        const aspect=size.width/size.height,height=pose.height*Math.max(1,pose.aspect/aspect);
        controls.target.fromArray(pose.target);camera.position.setFromSpherical(orbit.set(pose.radius,pose.polar,pose.azimuth)).add(controls.target);
        camera.zoom=1;camera.left=-height*aspect/2;camera.right=height*aspect/2;camera.top=height/2;camera.bottom=-height/2;
        camera.lookAt(controls.target);camera.updateProjectionMatrix();time.value=pose.worldTime;
        // Offline export can afford matching reflections on every output frame.
        ocean?.markDirty();renderScene();
      },
      projectUI:projectCards,
      restore(){
        if(disposed)return;
        camera.position.copy(live.position);camera.quaternion.copy(live.quaternion);camera.zoom=live.zoom;camera.view=live.view;controls.target.copy(live.target);
        time.value=live.time;controls.enabled=live.enabled;renderer.domElement.style.objectFit='';
        // Keep resize/control callbacks suspended until the original pose is back.
        controls.update();videoSize=null;last=0;lastShadow=-Infinity;ocean?.markDirty();resize();
      },
    };
  },
});

function schedule(){if(!raf&&!disposed&&!document.hidden&&!video.rendering)raf=requestAnimationFrame(frame);}
function animating(){return motion&&(!details.open||video.recording);}
function frameRate(){return frames.length?1000/(frames.reduce((n,f)=>n+f,0)/frames.length):null;}
function applySettings(key?:SettingKey){
  const shadowsChanged=renderer.shadowMap.enabled!==settings.shadows;
  renderer.shadowMap.enabled=settings.shadows;lighting.sun.castShadow=settings.shadows;
  if(shadowsChanged)renderer.shadowMap.needsUpdate=settings.shadows;
  renderer.toneMappingExposure=2**settings.exposure;
  lighting.skyFill.intensity=.5*settings.environmentLight;scene.environmentIntensity=.68*settings.environmentLight;
  post.setSamples(settings.antiAliasing);post.output.uniforms.uAO.value=settings.ao;post.output.uniforms.uBloom.value=settings.bloom;
  clouds.mesh.visible=settings.clouds;
  if(ocean){
    ocean.material.uniforms.uReflections.value=Number(settings.reflections);
    ocean.material.uniforms.uClarity.value=settings.clarity;ocean.material.uniforms.uSurf.value=settings.surfStrength;ocean.material.uniforms.uFoam.value=settings.foamStrength;
    ocean.spectrum.strength.value=settings.waveStrength;ocean.markDirty();
  }
  $('.tile-study').classList.toggle('hide-world-cards',!settings.labels);
  if(!key||key==='renderScale'||key==='pixelRatio')resize();schedule();
}
function moveTarget(target:T.Vector3){const delta=target.clone().sub(controls.target);camera.position.add(delta);controls.target.copy(target);controls.update();}
function resize(){
  if(video.rendering)return;
  const w=host.clientWidth,h=host.clientHeight,ui=w<650?148:124;
  renderer.setPixelRatio(mapPixelRatio(settings,w,h,devicePixelRatio,maxRenderSize));renderer.setSize(w,h);
  renderer.getDrawingBufferSize(bufferSize);post.resize(bufferSize.x,bufferSize.y);
  const shadowSize=w<650?2048:3072;
  if(lighting.sun.shadow.mapSize.x!==shadowSize){lighting.sun.shadow.mapSize.set(shadowSize,shadowSize);renderer.shadowMap.needsUpdate=true;ocean?.markDirty();}
  ocean?.resize(bufferSize.x,bufferSize.y);
  const single=Math.max(17.5*h/Math.max(180,h-ui),19.8*h/Math.max(180,w-44));
  const overview=registryOutline?.length?fitMapOverview(registryOutline,w,h,registryInsets):null;
  span=overview?Math.max(single,overview.span):Math.max(25*h/Math.max(180,h-ui),45*h/Math.max(180,w-44),registryExtent*2.1*h/Math.max(180,w-44),registryExtent*1.65*h/Math.max(180,h-ui));
  if(overview)allCentre.copy(overview.target);
  camera.left=-span*w/h/2;camera.right=span*w/h/2;camera.top=span/2;camera.bottom=-span/2;
  controls.minZoom=1;controls.maxZoom=span/single;camera.zoom=Math.max(1,Math.min(controls.maxZoom,camera.zoom));camera.updateProjectionMatrix();cards.resize();updateView();schedule();
  if(!registryCameraLocked&&overview&&camera.zoom<=1.001)moveTarget(allCentre);
}
function reset(){if(registryCameraLocked)return;selected='all';controls.target.copy(allCentre);camera.position.copy(MAP_OVERVIEW_OFFSET).add(controls.target);camera.zoom=1;controls.update();resize();selectionUI();}
function setRegistryExtent(extent:number,outline?:T.Vector3[]){
  const sameOutline=outline===registryOutline||!!outline&&!!registryOutline&&outline.length===registryOutline.length&&outline.every((point,i)=>point.equals(registryOutline![i]));
  if(extent===registryExtent&&sameOutline)return;
  registryExtent=extent;registryOutline=outline;allCentre.set(0,1.1,0);if(registryCameraLocked)resize();else reset();
}
function setRegistryCameraLocked(locked:boolean){
  if(!creatorMode||registryCameraLocked===locked)return;
  registryCameraLocked=locked;
  $('.tile-study').dataset.creatorCameraLocked=String(locked);
  controls.enableZoom=!locked;controls.enablePan=!locked&&camera.zoom>1.02;
  // Disable the gesture itself: an early return in OrbitControls can otherwise
  // leave the first finger's rotate state active when the second finger lands.
  controls.touches.TWO=locked?null:T.TOUCH.DOLLY_PAN;
  settingsUI.setCameraLocked(locked);updateView();schedule();
}
function setRegistryViewport(insets:MapInsets){
  if(insets.right===registryInsets.right&&insets.bottom===registryInsets.bottom)return;
  const previousSpan=span,previousZoom=camera.zoom;
  registryInsets=insets;resize();
  // Preserve the scale of a closer view when the panel opens or changes size.
  if(previousZoom>1.001){camera.zoom=T.MathUtils.clamp(previousZoom*span/previousSpan,1,controls.maxZoom);camera.updateProjectionMatrix();controls.update();updateView();schedule();}
}
function selectionUI(){
  tiles.forEach(t=>t.label.dataset.selected=String(t.definition.id===selected));schedule();
}
function focus(id:string){if(registryCameraLocked)return;if(id==='all'){reset();return;}const tile=tiles.find(t=>t.definition.id===id);if(!tile)return;selected=id;camera.zoom=controls.maxZoom;camera.updateProjectionMatrix();moveTarget(new T.Vector3(tile.host.root.position.x,id==='punk'?4.2:1.4,tile.host.root.position.z));selectionUI();schedule();}
function zoom(factor:number){if(registryCameraLocked)return;camera.zoom=Math.max(1,Math.min(controls.maxZoom,camera.zoom*factor));camera.updateProjectionMatrix();if(camera.zoom===1){selected='all';moveTarget(allCentre);selectionUI();}controls.update();schedule();}
function updateMotion(){last=0;schedule();}
function projectCards(width:number,height:number){
  const anchors=tiles.map(tile=>{
    const anchor={lagoon:[0,.25,6.9],tidewater:[16.7,.4,5.8],sakura:[-11.8,3.6,-13.5],punk:[10.3,2.7+hover.offset,-8.7]}[tile.definition.id];
    const p=new T.Vector3(...anchor).project(camera);
    return {id:tile.definition.id,x:(p.x*.5+.5)*width,y:(-p.y*.5+.5)*height,hidden:Math.abs(p.x)>1.03||Math.abs(p.y)>.84};
  }).sort((a,b)=>a.id.localeCompare(b.id));
  const keepClear=width<=650?tiles.map(tile=>{
    // Leave the small, tappable world centres exposed in mobile overview.
    const centre=tile.host.root.position.clone();centre.y=tile.definition.id==='punk'?5:1.2;centre.project(camera);
    return {x:(centre.x*.5+.5)*width-32,y:(-centre.y*.5+.5)*height-25,width:64,height:50};
  }):[];
  return {anchors,keepClear};
}
function updateView(){
  if(!ready)return;
  // OrbitControls changes the camera quaternion after lookAt's matrix update.
  // Project labels from this frame's camera, including a single paused orbit.
  camera.updateMatrixWorld();
  controls.enablePan=!registryCameraLocked&&camera.zoom>1.02;
  controls.enableZoom=!registryCameraLocked;
  const pixelRadius=COMPOSITION_RADIUS*(videoSize?.height??host.clientHeight)/(camera.top-camera.bottom)*camera.zoom;
  const low=pixelRadius<110;terrain?.setOverview(low);ocean?.setOverview(low);
  for(const tile of tiles){
    const lod=pixelRadius<(tile.lod==='tile'?110:125)?'overview':'tile';
    if(lod!==tile.lod){const asset=lod==='tile'?tile.near:tile.far;tile.host.mount(asset.root,asset.metrics,lod);tile.lod=lod;renderer.shadowMap.needsUpdate=true;ocean?.markDirty();}
  }
  if(videoSize)return;
  // Stable priority, regardless of which creator asset finished downloading first.
  const {anchors,keepClear}=projectCards(host.clientWidth,host.clientHeight);
  cards.update(anchors.map(a=>({...a,label:tiles.find(t=>t.definition.id===a.id)!.label})),keepClear);
  $('.north span').style.transform=`rotate(${-controls.getAzimuthalAngle()*180/Math.PI}deg)`;
  $<HTMLButtonElement>('[data-out]').disabled=registryCameraLocked||camera.zoom<=1.001;$<HTMLButtonElement>('[data-in]').disabled=registryCameraLocked||camera.zoom>=controls.maxZoom-.001;
  $<HTMLButtonElement>('[data-reset]').disabled=registryCameraLocked;
  settingsUI.syncZoom((camera.zoom-1)/Math.max(.001,controls.maxZoom-1));
}
function frame(now:number){
  raf=0;if(!ready||disposed||document.hidden||video.rendering)return;
  const cpuStart=performance.now();
  if(animating()&&last){const dt=now-last;time.value+=Math.min(dt,100)/1000;if(dt<250){frames.push(dt);if(frames.length>180)frames.shift();}}
  last=now;renderScene();video.sample(now);
  host.dataset.ready='true';cpuMs=cpuMs?T.MathUtils.lerp(cpuMs,performance.now()-cpuStart,.08):performance.now()-cpuStart;
  for(const resolve of frameWaiters)resolve(true);frameWaiters.clear();
  if(animating()||video.recording)schedule();
}
function renderScene(){
  setHostTime(time.value);
  registryTicks.forEach(tick=>tick());
  // Video playback expresses zoom through the orthographic span, not zoom=1.
  const cloudFocus=(span/((camera.top-camera.bottom)/camera.zoom)-1)/Math.max(.001,controls.maxZoom-1);
  hover.update();wildlife?.update();clouds.update(cloudFocus);for(const tile of tiles){tile.riverboat?.update();tile.car?.update();}updateView();renderer.info.reset();shadowCost.drawCalls=shadowCost.triangles=0;
  // The shadow pose must match the visible wind pose on every animated frame.
  // Water captures keep their separate 15 Hz budget; paused scenes stay idle.
  shadowUpdated=settings.shadows&&(renderer.shadowMap.needsUpdate||time.value!==lastShadow);
  if(shadowUpdated){renderer.shadowMap.needsUpdate=true;lastShadow=time.value;}
  captureCost=ocean?.capture(renderer,scene,camera)??{passes:0,drawCalls:0,triangles:0};
  const calls=renderer.info.render.calls,triangles=renderer.info.render.triangles;
  const shadowBefore={...shadowCost};
  renderer.setRenderTarget(post.target);renderer.render(scene,camera);
  sceneCost={drawCalls:renderer.info.render.calls-calls-shadowCost.drawCalls+shadowBefore.drawCalls,triangles:renderer.info.render.triangles-triangles-shadowCost.triangles+shadowBefore.triangles};
  post.render();
}
async function captureTileThumbnail(tile:any,root:T.Object3D):Promise<Blob>{
  if(!thumbnailMode||disposed)throw Error('Thumbnail renderer is unavailable.');
  const size={width:800,height:500};videoSize=size;cancelAnimationFrame(raf);raf=0;
  controls.enabled=false;renderer.setPixelRatio(1);renderer.setSize(size.width,size.height,false);
  renderer.getDrawingBufferSize(bufferSize);post.resize(size.width,size.height);ocean?.resize(size.width,size.height);
  controls.target.copy(frameTileSnapshot(camera,tile,root,size.width,size.height));controls.update();
  const hidden:T.Object3D[]=[];
  scene.traverse(o=>{if(o.visible&&(o.userData.ghost||o.name==='Under construction label'||o.name==='Reserved build area')){hidden.push(o);o.visible=false;}});
  try{
    renderer.shadowMap.needsUpdate=true;ocean?.markDirty();renderScene();
    // Read immediately after the final post-processing pass; no permanent
    // preserveDrawingBuffer or animation loop is needed for card photographs.
    return await new Promise<Blob>((resolve,reject)=>renderer.domElement.toBlob(blob=>blob?resolve(blob):reject(Error('Could not capture tile.')),'image/webp',.9));
  }finally{for(const o of hidden)o.visible=true;}
}
async function loadTile(definition:Definition):Promise<Tile>{
  const manifestURL=new URL(definition.manifest,location.href),response=await fetch(manifestURL,{signal:abort.signal});if(!response.ok)throw Error(`Could not load ${definition.title}.`);const manifest=await response.json() as Manifest;
  const results=await Promise.allSettled(['tile','overview'].map(lod=>loadLandmark(new URL(manifest.lods.find(l=>l.level===lod)!.url,manifestURL).href,lod as LandmarkLOD,{signal:abort.signal})));
  if(disposed||results.some(r=>r.status==='rejected')){for(const r of results)if(r.status==='fulfilled')r.value.dispose();throw Error(`Could not load ${definition.title}.`);}
  const [near,far]=results.map(r=>(r as PromiseFulfilledResult<Asset>).value);animateMapLandmark(near.root,time,lighting.direction);animateMapLandmark(far.root,time,lighting.direction);
  for(const asset of [near,far])asset.root.traverse(o=>{
    if(!(o as T.Mesh).isMesh)return;const m=(o as T.Mesh).material as T.MeshStandardMaterial;
    // The native foliage albedos were tuned for their source worlds' much
    // brighter light rigs. Calibrate them against this shared outdoor sky.
    if(o.userData.role==='foliage')m.color.multiplyScalar(definition.id==='lagoon'?2.1:1.22);
    if(definition.id==='lagoon'&&o.userData.role==='structure')m.color.setRGB(1.2,1.09,.9);
  });
  let disposeInteriors:(()=>void)|undefined;
  if(definition.id==='punk'&&manifest.interiors){
    try{disposeInteriors=await installPunkMaterials([near,far],manifest.interiors,manifestURL,abort.signal);}
    catch(error){disposeMapDeformations(near.root);disposeMapDeformations(far.root);near.dispose();far.dispose();throw error;}
  }
  const car=definition.id==='punk'?createPunkCarMotion([near.root,far.root],time):undefined;
  softenMapShadows(near.root);softenMapShadows(far.root);
  trackMapShadowDraws(near.root,shadowCost);trackMapShadowDraws(far.root,shadowCost);
  const tile=createCompositionSlot(definition.id,terrain?.hosts.get(definition.id)),centre=mapCentre(definition);tile.root.position.set(centre.x,0,centre.z);tile.mount(near.root,near.metrics);scene.add(tile.root);
  if(definition.id==='punk')hover.bindLandmark(tile.slot);
  const riverboat=definition.id==='sakura'?createSakuraBoatMotion([near.root,far.root],time):undefined;
  const label=details.createCard(definition.id,definition.title);details.connect(label,definition.id);$('.world-labels').append(label);
  label.addEventListener('click',()=>{if(!creatorMode&&ready&&!video.rendering)details.show(definition.id,label);},on);
  return {definition,manifest,host:tile,near,far,lod:'tile',label,riverboat,car,disposeInteriors};
}
async function init(){
  loadProgress('terrain');
  const [response]=await Promise.all([fetch('/map/lagoon-lite/village-ground.json',{signal:abort.signal}),clouds.load(abort.signal)]);if(!response.ok)throw Error('Could not load the landscape.');
  const surface=await response.json() as SampledTileSurface,sampler=createLandscapeSampler(surface);terrain=await createTerrain();scene.add(terrain.mesh);
  const inhabitants=await Promise.allSettled([createCoastalNature(createLandscapeSampler(surface,false),time,lighting.direction),loadTidewaterWildlife(time,abort.signal)]);
  if(disposed||inhabitants.some(r=>r.status==='rejected')){for(const r of inhabitants)if(r.status==='fulfilled')r.value.dispose();const failure=inhabitants.find(r=>r.status==='rejected');throw failure?.status==='rejected'?failure.reason:Error('Island loading aborted.');}
  nature=(inhabitants[0] as PromiseFulfilledResult<NonNullable<typeof nature>>).value;wildlife=(inhabitants[1] as PromiseFulfilledResult<NonNullable<typeof wildlife>>).value;scene.add(nature.root,wildlife.root);
  ocean=createTidewaterOcean(terrain.depth,time,lighting.direction,lighting.sun.color,hover.engines,wildlife.wake,wildlife.whale);terrain.setWaterDetail(ocean.patterns);scene.add(ocean.mesh);
  loadProgress('worlds',0,MAP_TILES.length);
  const results=await Promise.allSettled(MAP_TILES.map(async definition=>{const t=await loadTile(definition);tiles.push(t);status.textContent=`${tiles.length} of ${MAP_TILES.length} worlds loaded…`;loadProgress('worlds',tiles.length,MAP_TILES.length);return t;}));
  if(disposed||results.some(r=>r.status==='rejected'))throw Error('Some worlds could not load. Reload the page to try again.');
  softenMapShadows(scene);trackMapShadowDraws(scene,shadowCost);ready=true;video.enable();status.textContent='';renderer.shadowMap.needsUpdate=true;reset();applySettings();updateMotion();
  controls.addEventListener('change',()=>{
    if(videoSize)return;
    ocean?.markDirty();
    const target=controls.target.clone();
    if(!registryCameraLocked){
      if(!creatorMode){target.x=Math.max(-Math.max(8,registryExtent),Math.min(Math.max(16,registryExtent),target.x));target.z=Math.max(-Math.max(14,registryExtent),Math.min(registryExtent,target.z));}
      target.y=selected==='punk'?4.2:1.4;
      if(camera.zoom<=1.001){target.copy(allCentre);if(selected!=='all'){selected='all';selectionUI();}}
    }
    if(target.distanceToSquared(controls.target)>.00001)moveTarget(target);updateView();schedule();
  });
  if(!creatorMode)mountTileSelection(renderer.domElement,camera,terrain.mesh,[...tiles.map(t=>({root:t.host.root,id:t.definition.id})),{root:hover.root,id:'punk'},{root:wildlife.root,id:'tidewater'}],id=>{if(!video.rendering)details.show(id,host);},abort.signal);
  $('[data-reset]').addEventListener('click',reset,on);$('[data-in]').addEventListener('click',()=>zoom(1.18),on);$('[data-out]').addEventListener('click',()=>zoom(1/1.18),on);
  host.addEventListener('pointerdown',()=>host.focus({preventScroll:true}),on);host.addEventListener('keydown',e=>{if(!['+','=','-','0',' ','ArrowLeft','ArrowRight'].includes(e.key))return;e.preventDefault();if(e.key==='0')reset();else if(e.key===' '){motion=!motion;updateMotion();}else if(e.key==='+'||e.key==='=')zoom(1.18);else if(e.key==='-')zoom(1/1.18);else{camera.position.sub(controls.target).applyAxisAngle(new T.Vector3(0,1,0),e.key==='ArrowRight'?.15:-.15).add(controls.target);controls.update();}schedule();},on);
  document.addEventListener('visibilitychange',()=>{last=0;if(document.hidden){cancelAnimationFrame(raf);raf=0;}else schedule();},on);reduced.addEventListener('change',()=>{motion=!reduced.matches;updateMotion();},on);
  observer=new ResizeObserver(resize);observer.observe(host);
  (window as any).worldTiles={scene,camera,controls,tiles,ocean,hover,wildlife,clouds,sampler,terrain,nature,landscapeSurface:surface,lighting,post,renderer,video,closeMapPanels:()=>{settingsUI.close();video.close();},captureTileThumbnail,requestFrame:schedule,onFrame:(fn:()=>void)=>{registryTicks.add(fn);return()=>registryTicks.delete(fn);},setRegistryExtent,setRegistryViewport,setRegistryCameraLocked,inspect:()=>({selected,registryCameraLocked,details:details.selected,settings:{...settings},settingsOpen:settingsUI.open,cpuMs,tiles:tiles.map(t=>({id:t.definition.id,lod:t.lod,position:t.host.root.position.toArray(),radius:t.host.config.radius,component:(t.lod==='tile'?t.near:t.far).metrics})),zoom:camera.zoom,zoomLimits:[1,controls.maxZoom],motion,time:time.value,water:'tidewater-spectral-map',waterSurface:ocean?.inspect(),wildlife:wildlife?.inspect(),clouds:clouds.inspect(),boosters:6,drawCalls:sceneCost.drawCalls,triangles:sceneCost.triangles,renderPasses:1+captureCost.passes+post.inspect().passes+Number(shadowUpdated),totalFrameDrawCalls:renderer.info.render.calls,totalFrameTriangles:renderer.info.render.triangles,textures:renderer.info.memory.textures,post:post.inspect(),shadows:{updated:shadowUpdated,resolution:lighting.sun.shadow.mapSize.x,water:ocean?.mesh.receiveShadow},fps:frameRate(),video:video.inspect()})};
  (window as any).worldTiles.whenRendered=whenRendered;
  if(location.hostname==='world.threetopia.com'||creatorMode){loadProgress('tiles');await import('../../creators/map-editor').then(m=>m.mountRegistryMap((window as any).worldTiles,{editor:creatorMode,signal:abort.signal}));}
}
function disposeTiles(){for(const tile of tiles){disposeMapDeformations(tile.near.root);disposeMapDeformations(tile.far.root);tile.near.dispose();tile.far.dispose();tile.disposeInteriors?.();tile.host.dispose();tile.label.remove();}tiles.length=0;}
window.addEventListener('pagehide',()=>{disposed=true;abort.abort();video.dispose();cancelAnimationFrame(raf);observer?.disconnect();details.dispose();cards.dispose();settingsUI.dispose();controls.dispose();disposeTiles();terrain?.dispose();nature?.dispose();wildlife?.dispose();ocean?.dispose();hover.dispose();clouds.dispose();lighting.dispose();post.dispose();renderer.dispose();renderer.forceContextLoss();},{once:true});
abort.signal.addEventListener('abort',()=>{for(const resolve of frameWaiters)resolve(false);frameWaiters.clear();},{once:true});
export const mapReady=init().catch(error=>{disposeTiles();wildlife?.dispose();wildlife=undefined;if(!disposed)throw error;});
