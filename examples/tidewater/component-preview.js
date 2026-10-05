import * as THREE from 'three';
import {OrbitControls} from 'three/addons/controls/OrbitControls.js';
import {GLTFLoader} from 'three/addons/loaders/GLTFLoader.js';
import {createRocks} from '@dgreenheck/tidewater-rocks';
import {createGulls} from '@dgreenheck/tidewater-gulls';

const role=__TIDEWATER_PREVIEW_ROLE__,host=globalThis.__threetopiaHost;
const scene=new THREE.Scene();scene.background=new THREE.Color('#c7e4eb');
const renderer=new THREE.WebGLRenderer({antialias:true});renderer.setPixelRatio(Math.min(devicePixelRatio,2));
renderer.setSize(innerWidth,innerHeight);renderer.toneMapping=THREE.ACESFilmicToneMapping;
document.getElementById('app').append(renderer.domElement);
const camera=new THREE.PerspectiveCamera(40,innerWidth/innerHeight,.05,200);
camera.position.set(15,10,18);
const controls=new OrbitControls(camera,renderer.domElement);controls.target.set(0,2,0);controls.enableDamping=true;
scene.add(new THREE.HemisphereLight(0xd3efff,0x6e7161,2.5));
const sun=new THREE.DirectionalLight(0xfff2ce,3);sun.position.set(8,20,12);scene.add(sun);
const settings={seed:17,count:role==='rocks'?4:7,detail:2,speed:1,wireframe:false,exposure:1,representation:'map'};
let instance,paused=false,disposed=false,time=0,last=performance.now(),revision=0;
const panel=document.createElement('aside');panel.innerHTML=`<h1>Tidewater ${role}</h1><p>Drag to orbit. Scroll to zoom.</p>`;document.body.append(panel);
const output=document.createElement('output');panel.append(output);
function range(key,label,min,max,step,change){const row=document.createElement('label');row.textContent=label;const input=document.createElement('input');input.type='range';input.min=min;input.max=max;input.step=step;input.value=settings[key];input.setAttribute('aria-label',label);const value=document.createElement('span');value.textContent=input.value;input.oninput=()=>{settings[key]=Number(input.value);value.textContent=input.value;void change();};row.append(input,value);panel.append(row);}
async function rebuild(){
  const current=++revision;
  let next;
  if(role==='map-tile') {
    const response=await fetch(`https://threetopia.invalid/assets/${settings.representation}.glb`);
    const model=(await new GLTFLoader().parseAsync(await response.arrayBuffer(),'')).scene;
    next={object:model,dispose(){model.removeFromParent();model.traverse(o=>{o.geometry?.dispose();if(o.material)for(const m of Array.isArray(o.material)?o.material:[o.material])m.dispose();});}};
  } else next=role==='rocks'?createRocks({seed:settings.seed,count:settings.count,detail:settings.detail,spread:7}):createGulls({seed:settings.seed,count:settings.count});
  if(disposed||current!==revision){next.dispose();return;}
  instance?.dispose();instance=next;scene.add(instance.object);
  wireframe();const metric=instance.inspect?.();output.textContent=metric?`${metric.triangles.toLocaleString()} triangles · ${metric.drawCalls} draws`:'Published map geometry';
}
function wireframe(){instance?.object.traverse(o=>{if(o.material)for(const m of Array.isArray(o.material)?o.material:[o.material])m.wireframe=settings.wireframe;});}
if(role!=='map-tile') {
  range('seed','Seed',1,99,1,rebuild);range('count','Count',1,role==='rocks'?20:64,1,rebuild);
  if(role==='rocks')range('detail','Geometry detail',0,4,1,rebuild);
  else range('speed','Animation speed',0,3,.1,()=>{});
}else{
  const label=document.createElement('label');label.textContent='Representation';const select=document.createElement('select');select.setAttribute('aria-label','Representation');
  for(const value of ['map','overview']){const option=document.createElement('option');option.value=value;option.textContent=value;select.append(option);}select.onchange=()=>{settings.representation=select.value;void rebuild();};label.append(select);panel.append(label);
}
range('exposure','Exposure',.2,2,.05,()=>{renderer.toneMappingExposure=settings.exposure;});
const check=document.createElement('input');check.type='checkbox';check.setAttribute('aria-label','Wireframe');check.onchange=()=>{settings.wireframe=check.checked;wireframe();};const label=document.createElement('label');label.append(check,document.createTextNode('Wireframe'));panel.append(label);
function frame(){if(disposed)return;const now=performance.now();if(!paused)time+=Math.min((now-last)/1000,.1)*settings.speed;last=now;instance?.update?.(time);controls.update();renderer.render(scene,camera);}
function resize(){camera.aspect=innerWidth/innerHeight;camera.updateProjectionMatrix();renderer.setSize(innerWidth,innerHeight);}
addEventListener('resize',resize);
const inspect=()=>({ready:!!instance,features:{[role]:!!instance},settings:{...settings},metrics:instance?.inspect?.(),time,paused,disposed});
globalThis.__threetopiaRuntime={inspect,pause(){paused=true;},resume(){paused=false;},reset(){controls.reset();time=0;},dispose(){disposed=true;renderer.setAnimationLoop(null);instance?.dispose();controls.dispose();renderer.dispose();removeEventListener('resize',resize);}};
controls.update();controls.saveState();
rebuild().then(()=>{renderer.setAnimationLoop(frame);host.ready(inspect());}).catch(e=>host.error(e.message));
