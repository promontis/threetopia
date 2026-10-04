import './preview.css';
import * as T from 'three';
import {OrbitControls} from 'three/addons/controls/OrbitControls.js';
import {createDesertTile} from '../../../packages/world-map/desert-tile.js';
import {tileCentre,LANDMARK_BUDGET} from '../../../packages/world-map/tile-slot.js';
import type {SampledTileSurface} from '../../../packages/world-map/tile-slot.js';
import {loadLandmark,addLandmarkWind} from '../../../packages/world-map/landmark.js';

const $=<E extends HTMLElement=HTMLElement>(selector:string)=>document.querySelector<E>(selector)!;
const host=$('.tile-canvas'),status=$('[data-status]'),motionButton=$('[data-motion]');
const listeners=new AbortController(),on={signal:listeners.signal},reduced=matchMedia('(prefers-reduced-motion: reduce)');
const scene=new T.Scene();scene.background=new T.Color('#8bbfbc');scene.fog=new T.Fog('#8bbfbc',150,280);
const camera=new T.OrthographicCamera(-20,20,20,-20,20,180);
const renderer=new T.WebGLRenderer({antialias:true,alpha:false,powerPreference:'low-power'});
renderer.setPixelRatio(Math.min(devicePixelRatio,1.6));renderer.outputColorSpace=T.SRGBColorSpace;
renderer.toneMapping=T.ACESFilmicToneMapping;renderer.toneMappingExposure=1.17;
renderer.shadowMap.enabled=true;renderer.shadowMap.type=T.PCFShadowMap;renderer.shadowMap.autoUpdate=false;
host.append(renderer.domElement);
const controls=new OrbitControls(camera,renderer.domElement);controls.enablePan=false;controls.enableDamping=false;
controls.minPolarAngle=Math.PI*.19;controls.maxPolarAngle=Math.PI*.34;controls.rotateSpeed=.6;controls.zoomSpeed=.6;
controls.minZoom=1;controls.maxZoom=1;controls.target.set(0,1.6,0);
const time={value:0};let motion=!reduced.matches,ready=false,disposed=false,raf=0,last=0;
let mode='tile',neighbours=false,currentLod='tile',lastStatsLod='',span=33,frames:number[]=[];
let resizeObserver:ResizeObserver|undefined;
let near:Awaited<ReturnType<typeof loadLandmark>>,far:Awaited<ReturnType<typeof loadLandmark>>;
let tile:ReturnType<typeof createDesertTile>;const waveTextures:T.Texture[]=[];
const neighbouringTiles:Array<ReturnType<typeof createDesertTile>>=[];
for(const [q,r] of [[1,0],[0,1],[-1,1],[-1,0],[0,-1],[1,-1]]){
  const next=createDesertTile({seed:q*3+r+20}),centre=tileCentre(q,r);
  next.root.position.set(centre.x,0,centre.z);next.root.visible=false;scene.add(next.root);neighbouringTiles.push(next);
}
scene.add(new T.HemisphereLight('#fbf4d8','#809b92',2.15));
const sun=new T.DirectionalLight('#fff0c6',3.7);sun.position.set(-22,38,20);sun.castShadow=true;
sun.shadow.mapSize.set(2048,2048);sun.shadow.camera.left=-42;sun.shadow.camera.right=42;sun.shadow.camera.top=42;sun.shadow.camera.bottom=-42;
sun.shadow.camera.far=110;sun.shadow.normalBias=.035;sun.shadow.bias=-.0001;sun.shadow.radius=3;scene.add(sun);
const waterMaterial=new T.ShaderMaterial({toneMapped:false,uniforms:{uTime:time,uDeep:{value:new T.Color('#629b9d')},uShallow:{value:new T.Color('#87b7ac')}},vertexShader:`
  varying vec3 vWorld;
  void main(){vWorld=(modelMatrix*vec4(position,1.)).xyz;gl_Position=projectionMatrix*viewMatrix*vec4(vWorld,1.);}
`,fragmentShader:`
  uniform float uTime;uniform vec3 uDeep;uniform vec3 uShallow;varying vec3 vWorld;
  void main(){
    vec2 p=vWorld.xz;
    float d=length(p);float shallow=1.-smoothstep(10.,65.,d);
    vec3 colour=mix(uDeep,uShallow,shallow);
    float a=sin(p.x*.75+p.y*.4+sin(p.y*.23+uTime*.3)*1.2-uTime*.4);
    float b=sin(p.x*1.3-p.y*.73+uTime*.24);
    float ripple=smoothstep(.90,1.,a)*smoothstep(.3,1.,b);
    colour+=ripple*.012+sin(p.x*.12+p.y*.18)*.007;
    gl_FragColor=vec4(colour,1.);
    #include <tonemapping_fragment>
    #include <colorspace_fragment>
  }
`});
const sea=new T.Mesh(new T.PlaneGeometry(1000,1000),waterMaterial);sea.rotation.x=-Math.PI/2;sea.position.y=-.57;scene.add(sea);

function schedule(){if(!raf&&!disposed&&!document.hidden)raf=requestAnimationFrame(frame);}
function reset(){camera.position.set(24,38,60).normalize().multiplyScalar(100).add(controls.target);camera.zoom=1;controls.update();resize();}
function resize(){
  const w=host.clientWidth,h=host.clientHeight;
  renderer.setSize(w,h);renderer.setPixelRatio(Math.min(devicePixelRatio,1.6,Math.sqrt(2_100_000/(w*h))));
  // Both ends are bounded: one whole tile, or the entire displayed composition.
  const single=Math.max(24*h/Math.max(200,h-(w<650?260:210)),28*h/Math.max(200,w-56));
  span=neighbours?single*2.58:single;
  camera.left=-span*w/h/2;camera.right=span*w/h/2;camera.top=span/2;camera.bottom=-span/2;
  controls.maxZoom=neighbours?2.58:1;controls.minZoom=1;camera.zoom=Math.max(1,Math.min(controls.maxZoom,camera.zoom));
  camera.updateProjectionMatrix();updateView();schedule();
}
function zoom(amount:number){camera.zoom=Math.max(controls.minZoom,Math.min(controls.maxZoom,camera.zoom*amount));camera.updateProjectionMatrix();controls.update();schedule();}
function updateMotion(){motionButton.textContent=motion?'Ⅱ':'▷';motionButton.setAttribute('aria-pressed',String(motion));motionButton.setAttribute('aria-label',motion?'Pause animation':'Play animation');last=0;schedule();}
function stats(){
  const asset=currentLod==='tile'?near:far;if(!asset)return;
  const budget=LANDMARK_BUDGET[currentLod as 'tile'|'overview'];
  $('[data-triangles]').textContent=`${asset.metrics.triangles.toLocaleString('en-US')} / ${budget.triangles.toLocaleString('en-US')}`;
  $('[data-draws]').textContent=`${asset.metrics.drawCalls} / ${currentLod==='tile'?4:3}`;
  $('[data-bytes]').textContent=`${Math.round(asset.metrics.bytes/1024)} / ${budget.bytes/1024} KB`;
  $('[data-textures]').textContent=String(asset.metrics.textures);
  $('[data-lod]').textContent=currentLod==='tile'?'Tile':'Overview';
}
function updateView(){
  if(!ready)return;
  const pixelRadius=12*host.clientHeight/span*camera.zoom;
  const next=pixelRadius<(currentLod==='tile'?190:210)?'overview':'tile';
  if(next!==currentLod){tile.slot.clear();const asset=next==='tile'?near:far;tile.mount(asset.root,asset.metrics,next);currentLod=next;renderer.shadowMap.needsUpdate=true;}
  tile.slot.visible=mode!=='slot';tile.terrain.visible=mode!=='component';tile.guide.visible=mode==='slot';
  if(tile.water)tile.water.visible=mode!=='component';
  for(const next of neighbouringTiles){next.root.visible=neighbours&&mode!=='component';next.guide.visible=mode==='slot';}
  const label=$('.slot-label');label.hidden=mode!=='slot';
  if(!label.hidden){const p=new T.Vector3(0,.75,0).project(camera);label.style.left=`${(p.x*.5+.5)*host.clientWidth}px`;label.style.top=`${(-p.y*.5+.5)*host.clientHeight}px`;}
  $('.north span').style.transform=`rotate(${-controls.getAzimuthalAngle()*180/Math.PI}deg)`;
  $<HTMLButtonElement>('[data-in]').disabled=camera.zoom>=controls.maxZoom-.001;
  $<HTMLButtonElement>('[data-out]').disabled=camera.zoom<=controls.minZoom+.001;
  if(lastStatsLod!==currentLod){stats();lastStatsLod=currentLod;}
}
function frame(now:number){
  raf=0;if(!ready||disposed||document.hidden)return;
  if(motion&&last){const dt=now-last;time.value+=Math.min(dt,100)/1000;if(dt<250){frames.push(dt);if(frames.length>180)frames.shift();}}
  last=now;updateView();renderer.render(scene,camera);host.dataset.ready='true';
  if(motion)schedule();
}
function setMode(value:string){
  mode=value;
  document.querySelectorAll('[data-view]').forEach(button=>button.setAttribute('aria-pressed',String((button as HTMLElement).dataset.view===mode)));
  $('[data-caption]').textContent=mode==='slot'?'Desert · Threetopia':'Lagoon Tree Village';
  $('[data-description]').textContent=mode==='slot'?'The tile and slot are provided by Threetopia':mode==='component'?'The connected village as one 3D component':'Four treehouses · three rope bridges';
  renderer.shadowMap.needsUpdate=true;updateView();schedule();
}
async function init(){
  const surfaceURL=new URL('/map/lagoon-lite/village-ground.json',location.href),surfaceResponse=await fetch(surfaceURL,{signal:listeners.signal});
  if(!surfaceResponse.ok)throw Error('Could not load the original Lagoon terrain.');
  const surface=await surfaceResponse.json() as SampledTileSurface;
  const textureLoader=new T.TextureLoader();
  const waveResults=await Promise.allSettled(surface.waves.map(file=>textureLoader.loadAsync(new URL(file,surfaceURL).href)));
  for(const result of waveResults)if(result.status==='fulfilled'){result.value.wrapS=result.value.wrapT=T.RepeatWrapping;waveTextures.push(result.value);}
  if(waveResults.some(result=>result.status==='rejected')||disposed){waveTextures.forEach(texture=>texture.dispose());if(disposed)return;throw Error('Could not load the original water textures.');}
  tile=createDesertTile({surface,waveTextures,time});scene.add(tile.root);
  const loaded=await Promise.allSettled(['village.glb','village-overview.glb'].map((file,i)=>loadLandmark(new URL(`/map/lagoon-lite/${file}`,location.href).href,i?'overview':'tile',{signal:listeners.signal})));
  const failed=loaded.find(result=>result.status==='rejected');
  if(failed){loaded.forEach(result=>{if(result.status==='fulfilled')result.value.dispose();});throw failed.reason;}
  [near,far]=loaded.map(result=>(result as PromiseFulfilledResult<typeof near>).value);
  if(disposed){near.dispose();far.dispose();return;}
  addLandmarkWind(near.root,time);addLandmarkWind(far.root,time);tile.mount(near.root,near.metrics);
  ready=true;status.textContent='';renderer.shadowMap.needsUpdate=true;reset();updateMotion();
  controls.addEventListener('change',()=>{updateView();schedule();});
  document.querySelectorAll<HTMLElement>('[data-view]').forEach(button=>button.addEventListener('click',()=>setMode(button.dataset.view!),on));
  $('[data-neighbours]').addEventListener('click',()=>{neighbours=!neighbours;$('[data-neighbours]').setAttribute('aria-pressed',String(neighbours));renderer.shadowMap.needsUpdate=true;reset();},on);
  motionButton.addEventListener('click',()=>{motion=!motion;updateMotion();},on);
  $('[data-in]').addEventListener('click',()=>zoom(1.18),on);$('[data-out]').addEventListener('click',()=>zoom(1/1.18),on);
  $('[data-reset]').addEventListener('click',reset,on);
  host.addEventListener('pointerdown',()=>host.focus({preventScroll:true}),on);
  host.addEventListener('keydown',e=>{
    if(!['+','=','-','0','ArrowLeft','ArrowRight',' '].includes(e.key))return;e.preventDefault();
    if(e.key==='+'||e.key==='=')zoom(1.18);else if(e.key==='-')zoom(1/1.18);else if(e.key==='0')reset();else if(e.key===' '){motion=!motion;updateMotion();}
    else{const offset=camera.position.clone().sub(controls.target);offset.applyAxisAngle(new T.Vector3(0,1,0),e.key==='ArrowRight'?.15:-.15);camera.position.copy(controls.target).add(offset);controls.update();}
  },on);
  document.addEventListener('visibilitychange',()=>{last=0;if(document.hidden){cancelAnimationFrame(raf);raf=0;}else schedule();},on);
  reduced.addEventListener('change',()=>{motion=!reduced.matches;updateMotion();},on);
  resizeObserver=new ResizeObserver(resize);resizeObserver.observe(host);
  (window as any).lagoonLite={inspect:()=>({mode,neighbours,lod:currentLod,component:(currentLod==='tile'?near:far).metrics,zoom:camera.zoom,zoomLimits:[controls.minZoom,controls.maxZoom],motion,time:time.value,drawCalls:renderer.info.render.calls,triangles:renderer.info.render.triangles,geometries:renderer.info.memory.geometries,textures:renderer.info.memory.textures,fps:frames.length?1000/(frames.reduce((s,v)=>s+v,0)/frames.length):null}),scene,camera,controls,tile};
}
window.addEventListener('pagehide',()=>{disposed=true;listeners.abort();cancelAnimationFrame(raf);resizeObserver?.disconnect();controls.dispose();near?.dispose();far?.dispose();tile?.dispose();waveTextures.forEach(texture=>texture.dispose());neighbouringTiles.forEach(t=>t.dispose());sea.geometry.dispose();waterMaterial.dispose();sun.shadow.dispose();renderer.dispose();renderer.forceContextLoss();},{once:true});
void init().catch(error=>{waveTextures.forEach(texture=>texture.dispose());if(!disposed){status.textContent=`Could not load the tile: ${error.message}`;console.error(error);}});
