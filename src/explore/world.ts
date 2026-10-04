import {loadSharedScene} from './scene-runtime.js';
import * as THREE from 'three/webgpu';
import { REGIONS, regionById, type RegionId } from './config.ts';
import { smooth } from './heightfield.ts';
import { tileAt } from './hex-world.ts';
import { updateSourceGlobals } from './native-packages.js';
import { worldTime } from './materials.js';
import { CollisionWorld } from './collision.ts';
import { Walker } from './player.ts';
import { mountAtlas, type AtlasControls } from '../atlas/atlas-ui.ts';
import { expansionRing } from './tile-layout.ts';

export interface ExploreControls {setActive(active:boolean):void;dispose():void}
const nextFrame=()=>new Promise<void>(r=>requestAnimationFrame(()=>r()));
export async function mountExplore(root:HTMLElement):Promise<ExploreControls> {
  const $=<T extends HTMLElement=HTMLElement>(selector:string)=>root.querySelector<T>(selector)!;
  const status=$('[data-world-status]'),progress=$('[data-world-progress]'),curtain=$('[data-world-loading]');
  const guide=$<HTMLButtonElement>('[data-world-guide]');
  const events=new AbortController(),signal=events.signal;
  let active=document.documentElement.dataset.view==='world',entered=false,disposed=false,ready=false,elapsed=0,lastTime=0,timeScale=1,frame=0,toastTimer=0;
  let atlas:AtlasControls|undefined;
  let renderer:THREE.WebGPURenderer|undefined,walker:Walker|undefined,punk:any,tide:any,collision:CollisionWorld|undefined;
  let scene=new THREE.Scene();const camera=new THREE.PerspectiveCamera(67,1,.08,1700);
  const showProgress=(message:string,amount?:number)=>{status.textContent=message;if(amount!==undefined){progress.style.width=amount+'%';$('[data-world-progressbar]').setAttribute('aria-valuenow',String(amount));}};
  const toast=(message:string)=>{const el=$('[data-world-toast]');el.textContent=message;el.classList.add('is-visible');clearTimeout(toastTimer);toastTimer=window.setTimeout(()=>el.classList.remove('is-visible'),4000);};
  const map=$<HTMLDialogElement>('[data-world-map-dialog]'),credits=$<HTMLDialogElement>('[data-world-credits-dialog]');
  const syncGuide=()=>{
    guide.innerHTML=walker?.guide?'Pause the walk <span>Ⅱ</span>':walker&&(walker.destination==='lagoon'||walker.atDestination)?'Return to centre <span>↩</span>':`Walk to ${regionById(walker?.destination??'sakura').short} <span>↗</span>`;
    if(walker?.blocked)toast('The path is obstructed here. You can continue with WASD.');
  };
  function setActive(value:boolean){active=value;root.dataset.worldActive=String(value);if(value&&renderer){const w=root.clientWidth||innerWidth,h=root.clientHeight||innerHeight;renderer.setSize(w,h);camera.aspect=w/h;camera.updateProjectionMatrix();}walker?.setActive(value&&entered&&!map.open&&!credits.open&&!document.hidden);if(!value){punk?.pause();if(map.open)map.close();if(credits.open)credits.close();}lastTime=performance.now();}
  function openDialog(dialog:HTMLDialogElement){if(document.pointerLockElement)document.exitPointerLock();walker?.setActive(false);dialog.showModal();if(dialog===map){atlas?.view.mount($('[data-atlas-stage]'));atlas?.view.setMode('overview');$('[data-world-map]').setAttribute('aria-expanded','true');}}
  $('[data-world-map]').addEventListener('click',()=>openDialog(map),{signal});$('[data-world-minimap-open]').addEventListener('click',()=>openDialog(map),{signal});$('[data-world-credits]').addEventListener('click',()=>openDialog(credits),{signal});
  for(const dialog of [map,credits]) {
    dialog.querySelector('[data-close-dialog]')!.addEventListener('click',()=>dialog.close(),{signal});
    dialog.addEventListener('close',()=>{if(dialog===map){atlas?.view.mount($('[data-world-minimap-stage]'));atlas?.view.setMode('mini');if(walker)atlas?.setPlayer(walker.position.x,walker.position.z,walker.yaw,walker.position.y);$('[data-world-minimap-open]').focus();}setActive(active);$('[data-world-map]').setAttribute('aria-expanded','false');},{signal});
    dialog.addEventListener('click',e=>{if(e.target===dialog){const box=dialog.getBoundingClientRect();if(e.clientX<box.left||e.clientX>box.right||e.clientY<box.top||e.clientY>box.bottom)dialog.close();}},{signal});
  }
  window.addEventListener('keydown',e=>{if(active&&ready&&e.code==='KeyM'&&!e.repeat&&!e.ctrlKey&&!e.metaKey&&!e.altKey&&!(e.target instanceof HTMLElement&&e.target.closest('input,textarea,select,[contenteditable=true]'))){e.preventDefault();if(map.open)map.close();else if(!credits.open)openDialog(map);}},{signal});
  document.addEventListener('visibilitychange',()=>setActive(active),{signal});
  $('[data-world-sources]').innerHTML=REGIONS.map(r=>`<article><h3>${r.title}</h3><a href="${r.source}" target="_blank" rel="noreferrer">${r.creator} ↗</a><p>${r.retained}</p><p><code>Source revision ${r.revision}</code></p></article>`).join('');

  
  try {
    if(!navigator.gpu)throw new Error('This world needs WebGPU. Open it in an up-to-date browser with hardware acceleration enabled.');
    showProgress('Starting the shared renderer',5);
    renderer=new THREE.WebGPURenderer({antialias:true,powerPreference:'high-performance'});await renderer.init();
    if(!(renderer.backend as any).isWebGPUBackend)throw new Error('WebGPU could not start on this device. Check hardware acceleration and try again.');
    renderer.setPixelRatio(Math.min(devicePixelRatio,matchMedia('(pointer:coarse)').matches?1.1:1.5));
    renderer.toneMapping=THREE.ACESFilmicToneMapping;renderer.toneMappingExposure=1.05;
    renderer.shadowMap.enabled=true;renderer.shadowMap.type=THREE.PCFShadowMap;
    renderer.domElement.setAttribute('aria-label','Connected world: Lagoon, Sakura, Tidewater and Punk');renderer.domElement.tabIndex=-1;
    $('[data-world-canvas]').append(renderer.domElement);
    const resize=()=>{if(!renderer||map.open)return;const w=root.clientWidth||innerWidth,h=root.clientHeight||innerHeight;renderer.setSize(w,h);camera.aspect=w/h;camera.updateProjectionMatrix();};resize();window.addEventListener('resize',resize,{signal});
    const runtime=await loadSharedScene(renderer,camera,showProgress);
    const {sky,skyDay,skyHorizon,hemi,sun,lagoon,sakura,height,terrain,water}=runtime;
    scene=runtime.scene;tide=runtime.tide;punk=runtime.punk;
    $('[data-world-grid]').addEventListener('change',e=>{terrain.grid.visible=(e.target as HTMLInputElement).checked;},{signal});
    const expansion=expansionRing(terrain.topology.cells);
    showProgress('Building walkable floors and collisions',84);await nextFrame();
    scene.updateMatrixWorld(true);collision=new CollisionWorld(height);
    if(lagoon.collider)collision.addGeometry(lagoon.collider,lagoon.group.matrixWorld);
    collision.addObjects(sakura.meshes.filter(m=>/^arch-/.test(m.name)&&!/paper|lanternGlow|shide|rope/.test(m.name)));
    collision.addObjects([tide.village.group,punk.city,punk.quadra.collider]);
    walker=new Walker(camera,renderer.domElement,collision,syncGuide);
    $('[data-world-destination]').addEventListener('change',e=>walker!.setDestination((e.target as HTMLSelectElement).value as RegionId),{signal});
    guide.addEventListener('click',()=>{if(walker!.guide)walker!.stopGuide();else{walker!.startGuide();const returning=walker!.guideDirection<0&&walker!.guideLegs.length===1;toast(returning?'Walking back to the centre. WASD takes back control.':`Walking to ${regionById(walker!.destination).short}${walker!.guideLegs.length>1?' via Lagoon':''}. WASD takes back control.`);}},{signal});guide.disabled=false;syncGuide();
    const joystick=$('[data-world-joystick]'),stick=joystick.querySelector('span')!;
    let touchId:number|null=null;
    const moveTouch=(e:PointerEvent)=>{if(touchId!==e.pointerId||!walker)return;const box=joystick.getBoundingClientRect(),x=(e.clientX-box.left-box.width/2)/35,y=(e.clientY-box.top-box.height/2)/35,len=Math.max(1,Math.hypot(x,y));walker.touch.x=x/len;walker.touch.y=y/len;stick.style.transform=`translate(${x/len*27}px,${y/len*27}px)`;};
    joystick.addEventListener('pointerdown',e=>{touchId=e.pointerId;joystick.setPointerCapture(e.pointerId);walker!.stopGuide();moveTouch(e);},{signal});joystick.addEventListener('pointermove',moveTouch,{signal});
    for(const event of ['pointerup','pointercancel'])joystick.addEventListener(event,()=>{touchId=null;walker!.touch.x=walker!.touch.y=0;stick.style.transform='';},{signal});
    $('[data-world-jump]').addEventListener('pointerdown',()=>walker!.keys.add('Space'),{signal});
    try {
      atlas=await mountAtlas($('[data-world-atlas]'),{miniHost:$('[data-world-minimap-stage]'),walkTo:(id)=>{walker!.setDestination(id as RegionId);$<HTMLSelectElement>('[data-world-destination]').value=id;map.close();walker!.startGuide();syncGuide();}});
      $('[data-world-minimap]').hidden=false;
    } catch(error){$('[data-atlas-status]').textContent=error instanceof Error?error.message:'The map could not load.';}
    const requestedDestination=new URLSearchParams(location.search).get('destination');
    if(REGIONS.some(r=>r.id===requestedDestination)){walker.setDestination(requestedDestination as RegionId);$<HTMLSelectElement>('[data-world-destination]').value=requestedDestination!;}
    const inspect=new URLSearchParams(location.search).has('inspect');$('[data-world-inspector]').hidden=!inspect;
    $('[data-world-hide-inspector]').addEventListener('click',()=>{$('[data-world-inspector]').hidden=true;},{signal});
    $('[data-world-timescale]').addEventListener('change',e=>{timeScale=Number((e.target as HTMLSelectElement).value);},{signal});
    const effects=()=>punk.setEffects($<HTMLInputElement>('[data-world-rain]').checked,$<HTMLInputElement>('[data-world-reflections]').checked);
    for(const selector of ['[data-world-rain]','[data-world-reflections]'])$(selector).addEventListener('change',effects,{signal});
    let currentRegion=REGIONS[0],visited=new Set<string>(),averageFrame=.016;
    const regionHistory:string[]=['lagoon'];
    renderer.setAnimationLoop(()=>{
      if(disposed||!renderer)return;const now=performance.now(),frameTime=(now-lastTime)/1000||.016,dt=Math.min(.04,frameTime);lastTime=now;
      if(!active||document.hidden||map.open)return;
      try {
        renderer.info.reset();averageFrame=averageFrame*.95+frameTime*.05;worldTime.value+=dt;elapsed=worldTime.value;walker!.update(dt*timeScale);
        const pos=walker!.position,distances=REGIONS.map(r=>Math.hypot(pos.x-r.origin[0],pos.z-r.origin[2])),night=1-smooth(220,430,distances[3]);
        updateSourceGlobals(dt,elapsed,night);
        const groups=[lagoon.group,sakura.group,tide.group,punk.group];groups.forEach((g,i)=>g.visible=distances[i]<520);
        for(const pack of [lagoon,sakura])if(pack.group.visible)for(const mesh of pack.meshes){const d=mesh.userData.worldCenter.distanceTo(pos);mesh.visible=d<mesh.userData.drawDistance;mesh.castShadow=mesh.userData.sourceShadow&&d<100;}
        const region=tileAt(pos.x,pos.z)?.region??currentRegion;
        if(region!==currentRegion){currentRegion=region;if(entered)regionHistory.push(region.id);$('[data-world-location] h1').textContent=region.title;$('[data-world-creator]').textContent='by '+region.creator;}
        if(entered)visited.add(region.id);
        hemi.intensity=1.5*(1-night)+.35*night;sun.intensity=3.1*(1-night)+.23*night;
        scene.environmentIntensity=.4*(1-night)+.16*night;
        skyDay.value.set('#7baeb2').lerp(new THREE.Color('#10142b'),night);skyHorizon.value.set('#e7ddba').lerp(new THREE.Color('#39374e'),night);
        (scene.fog as THREE.FogExp2).color.copy(skyHorizon.value);(scene.fog as THREE.FogExp2).density=.0028+night*.004;
        sun.position.set(pos.x-65,pos.y+160,pos.z-90);sun.target.position.copy(pos);sky.position.copy(camera.position);
        tide.update(dt,camera,distances[2]<400);
        punk.update(dt,distances[3]<400);
        water.update(dt);renderer.render(scene,camera);
        if(frame++%12===0){
          atlas?.setPlayer(pos.x,pos.z,walker!.yaw,pos.y);
          $('[data-world-distance]').textContent=Math.round(walker!.distance)+' m walked';
          root.dataset.worldRegion=region.id;root.dataset.worldState=entered?'exploring':'ready';
          if(inspect){const track=walker!.currentTrail,along=track.nearest(pos.x,pos.z).along;$('[data-world-diagnostics]').textContent=JSON.stringify({renderer:'WebGPU r'+THREE.REVISION,renderTarget:renderer.getRenderTarget()?.texture.name??'screen',camera:camera.rotation.toArray().slice(0,3),canvases:$('[data-world-canvas]').querySelectorAll('canvas').length,region:region.id,position:pos.toArray().map(n=>+n.toFixed(2)),walked:+walker!.distance.toFixed(1),trailId:track.id,trail:+along.toFixed(1),trailLength:+track.length.toFixed(1),destination:walker!.destination,guide:walker!.guide,guideLeg:walker!.guideLegIndex,direction:walker!.guideDirection,blocked:walker!.blocked,aheadFloors:walker!.blocked?[0,1,2,4,8].map(d=>{const p=track.pointAt(along+d*walker!.guideDirection);return[p.x,p.z,collision!.floor(p.x,p.z,pos.y+6)].map(n=>+n.toFixed(2));}):undefined,visited:[...visited],regionHistory:regionHistory.slice(-16),centre:'lagoon',hexes:terrain.topology.cells.length,sharedEdges:terrain.topology.sharedEdges.length,tileLevels:terrain.topology.cells.map(c=>c.region.id),expansionRing:expansion.radius,oceanSlots:expansion.slots.length,drawCalls:renderer.info.render.drawCalls,fps:Math.round(1/averageFrame),triangles:renderer.info.render.triangles,packages:{lagoon:lagoon.manifest.counts,sakura:sakura.manifest.counts,tidewater:tide.village.buildings.length,punk:punk.city.children.length}},null,2);}
        }
        if(!ready){
          ready=true;entered=true;showProgress('Ready',100);
          curtain.classList.add('is-entered');curtain.inert=true;
          $('footer').inert=false;$('[data-world-joystick]').inert=false;$('[data-world-jump]').inert=false;
          renderer.domElement.tabIndex=0;$<HTMLButtonElement>('[data-world-map]').disabled=false;
          root.dataset.worldState='exploring';setActive(active);renderer.domElement.focus({preventScroll:true});
        }
      } catch(error){renderer.setAnimationLoop(null);fail(error);}
    });
    return {setActive,dispose(){disposed=true;events.abort();atlas?.dispose();walker?.dispose();collision?.dispose();renderer?.setAnimationLoop(null);runtime.dispose();renderer?.dispose();renderer?.domElement.remove();}};
  } catch(error){fail(error);return{setActive,dispose(){disposed=true;events.abort();renderer?.dispose();renderer?.domElement.remove();}};}
  function fail(error:unknown){console.error('[threetopia world]',error instanceof Error?error.stack:error);status.textContent=error instanceof Error?error.message:String(error);progress.style.background='#ae735a';$('[data-world-retry]').hidden=false;entered=false;walker?.setActive(false);$<HTMLButtonElement>('[data-world-map]').disabled=true;root.dataset.worldState='error';$('[data-world-loading] h2').textContent='Unable to load world';curtain.classList.remove('is-entered');curtain.inert=false;$('footer').inert=true;$('[data-world-joystick]').inert=true;$('[data-world-jump]').inert=true;}
}
