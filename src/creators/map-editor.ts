import {softenMapShadows} from '../tiles/lite/shadows';
import * as T from 'three';
import {createHostLoader} from './host-loader';
import {createReservedTiles} from './reserved-tiles';
import {frameOffset,setFrameOffset} from '../tiles/lite/orthographic-frame';
import {registryWater} from './registry-water';
import {GLTFLoader} from 'three/addons/loaders/GLTFLoader.js';
import {disposeObject,setHostDetail} from '../../packages/platform/render.js';
import {centre,MAP_SCALE,tileContract,contentOrigin} from '../../packages/platform/tiles.js';
import {createBlankTile,fitTileView,tileOverviewPoints,type PickerPanel,type TileCoordinate} from './tile-picker';
/** Host terrain and published packages share the real map scene and camera. */
export async function mountRegistryMap(world:any,{editor=false,signal}:{editor?:boolean;signal:AbortSignal}){
  const thumbnailMode=editor&&new URLSearchParams(location.search).has('thumbnail');
  const water=registryWater(world),hostLoader=createHostLoader();
  const reserved=createReservedTiles(hostLoader.load);
  const registry=editor?location.origin:'https://creators.threetopia.com',group=new T.Group();group.name='Creator registry tiles';world.scene.add(group);
  const raycaster=new T.Raycaster(),pointer=new T.Vector2(),hitTargets:T.Object3D[]=[],published=new Map<string,T.Group>();
  const lods:Array<{near:T.Group;far:T.Group}>=[];
  const canvas=world.renderer.domElement as HTMLCanvasElement,camera=world.camera as T.OrthographicCamera;
  let selection:TileCoordinate|null=null,panel:PickerPanel={width:340,height:570,placement:'right'},lastFocus='',mapPanelOpen=false;
  const editorRoot=editor?document.querySelector<HTMLElement>('.tile-study'):null;
  const hint=editorRoot?.querySelector<HTMLElement>('.gesture-hint'),originalHint=hint?.innerHTML||'';
  const help=editorRoot?.querySelector<HTMLElement>('#map-help'),originalHelp=help?.textContent||'';
  function setCameraLocked(locked:boolean){
    world.setRegistryCameraLocked(locked);
    if(hint){if(locked)hint.textContent='Drag to orbit the selected tile';else hint.innerHTML=originalHint;}
    if(help)help.textContent=locked?'Drag or use the left and right arrow keys to orbit the selected tile. Zoom and pan are locked. Press Escape or choose Cancel to return to your previous view. Press H for settings or R to record.':originalHelp;
  }
  function syncPanelInset(){
    const visible=!!selection&&!mapPanelOpen;
    const right=selection&&panel.placement==='right'?panel.width:0,bottom=selection&&panel.placement==='bottom'?panel.height:0;
    editorRoot?.style.setProperty('--creator-panel-right',`${visible?right:0}px`);
    editorRoot?.style.setProperty('--creator-panel-bottom',`${visible?bottom:0}px`);
    if(editorRoot)editorRoot.dataset.creatorPanel=visible?panel.placement:'none';
    // Opening settings hides the picker, but must not move its locked camera.
    if(editor)world.setRegistryViewport({right,bottom});
  }
  interface Pose {target:T.Vector3;position:T.Vector3;height:number;offset:T.Vector2}
  let overview:Pose|null=null,lastFraming='';
  let transition:{from:Pose;to:Pose;start:number;duration:number;release:boolean}|null=null;
  const pose=():Pose=>({target:world.controls.target.clone(),position:camera.position.clone(),height:(camera.top-camera.bottom)/camera.zoom,offset:frameOffset(camera)});
  function moveView(view:Pose){
    camera.position.copy(view.position);world.controls.target.copy(view.target);
    camera.zoom=(camera.top-camera.bottom)/view.height;
    setFrameOffset(camera,canvas.clientWidth,canvas.clientHeight,view.offset);
    camera.updateProjectionMatrix();world.controls.update();
  }
  function finishTransition(){
    const current=transition;if(!current)return;
    transition=null;moveView(current.to);group.userData.focused=true;
    if(current.release)setCameraLocked(false);
  }
  function animateView(view:Pose,release=false){
    transition={from:pose(),to:view,start:performance.now(),duration:matchMedia('(prefers-reduced-motion: reduce)').matches?0:700,release};
    group.userData.focused=false;world.requestFrame();
  }
  const framingKey=()=>[canvas.clientWidth,canvas.clientHeight,camera.top-camera.bottom,panel.width,panel.height,panel.placement,panel.top].join(':');
  function selectionPose():Pose{
    const fitted=fitTileView(camera,selection!,canvas.clientWidth,canvas.clientHeight,{...panel,bottom:24},world.controls.maxZoom);
    return {target:fitted.target,position:camera.position.clone().sub(world.controls.target).add(fitted.target),height:(camera.top-camera.bottom)/fitted.zoom,offset:fitted.offset};
  }
  function focusSelection(animate=true){
    if(!selection)return;
    lastFraming=framingKey();const view=selectionPose();
    if(animate)animateView(view);else {transition=null;moveView(view);group.userData.focused=true;world.requestFrame();}
  }
  function publishFocus(){
    if(!selection)return;
    const settled=!transition,key=`${selection.q},${selection.r}:${settled}`;
    if(key!==lastFocus){lastFocus=key;parent.postMessage({type:'creator:focus',...selection,settled},location.origin);}
  }
  const projected=new T.Vector3();
  const tick=()=>{
    const hostRadius=9*canvas.clientHeight/((camera.top-camera.bottom)/camera.zoom);camera.updateMatrixWorld();
    for(const host of [...published.values(),...reserved.hosts]){projected.copy(host.position).project(camera);const outside=Math.abs(projected.x)>1+hostRadius*2/canvas.clientWidth||Math.abs(projected.y)>1+hostRadius*2/canvas.clientHeight;setHostDetail(host,hostRadius<125||outside);}

    // Export owns its camera pose; restore the live lock when playback finishes.
    if(world.video?.rendering)return;
    if(editor&&selection&&lastFraming!==framingKey()){
      lastFraming=framingKey();
      if(transition&&!transition.release)transition.to=selectionPose();else focusSelection(false);
    }
    if(transition){
      const {from,to}=transition,t=transition.duration?Math.min(1,(performance.now()-transition.start)/transition.duration):1,ease=1-(1-t)**3;
      moveView({target:from.target.clone().lerp(to.target,ease),position:from.position.clone().lerp(to.position,ease),height:T.MathUtils.lerp(from.height,to.height,ease),offset:from.offset.clone().lerp(to.offset,ease)});
      if(t===1)finishTransition();else world.requestFrame();
    }
    const near=9*canvas.clientHeight/((camera.top-camera.bottom)/camera.zoom)>=110;
    for(const lod of lods){lod.near.visible=near;lod.far.visible=!near;}
    if(editor)publishFocus();
  };
  const stopTick=world.onFrame(tick);
  let selectedGroup:T.Group|null=null,request=0,disposed=false,lastGhosts='';
  const hostCache=new Map<string,T.Group>();
  const clearGhosts=()=>{for(const o of [...group.children])if(o.userData.ghost)disposeObject(o);hitTargets.length=0;};
  async function update(info:any,selected?:any,variant='autumn-woodland',allowSelection=true,restoreView=true,rotation=0,legacyEdges:number[]=[]){
    const serial=++request;let nextSelected:T.Group|null=null;group.userData.preparing=true;
    try{
    let extent=0;
    for(const tile of info.tiles)if(tile.version){const c=centre(tile.q,tile.r,MAP_SCALE);extent=Math.max(extent,Math.abs(c.x)+12,Math.abs(c.z)+12);}
    if(editor)for(const s of info.slots){const c=centre(s.q,s.r,MAP_SCALE);extent=Math.max(extent,Math.abs(c.x)+10,Math.abs(c.z)+10);}
    if(extent)world.setRegistryExtent(extent,editor?tileOverviewPoints(info.slots):undefined);
    if(editor){
      const changed=selection?.q!==selected?.q||selection?.r!==selected?.r;
      if(selected&&!selection){finishTransition();overview=pose();setCameraLocked(true);}
      const previousPose=pose();
      selection=selected?{q:selected.q,r:selected.r}:null;group.userData.selection=selection;
      syncPanelInset();
      if(changed){
        lastFocus='';moveView(previousPose);
        if(selection)focusSelection();
        else {
          if(overview&&restoreView)animateView(overview,true);
          else {transition=null;camera.clearViewOffset();setCameraLocked(false);}
          overview=null;
        }
      }
    }

    for(const tile of info.tiles){if(tile.version&&!published.has(`${tile.id}:${tile.version}`)){
      try{const r=await fetch(`${registry}/api/resolve?name=${encodeURIComponent(tile.name)}&version=${tile.version}`,{signal});if(!r.ok){if(thumbnailMode)throw Error('Thumbnail package could not load.');continue;}const v=await r.json();const loaded=await Promise.allSettled(['map','overview'].map(async role=>{const f=await fetch(`${registry}/api/packages/${tile.packageId}/versions/${tile.version}/files?path=${encodeURIComponent(v.manifest.content[role])}`,{signal});if(!f.ok)throw Error('Package file not found.');return (await new GLTFLoader().parseAsync(await f.arrayBuffer(),'')).scene;}));
        if(loaded.some(r=>r.status==='rejected')){for(const r of loaded)if(r.status==='fulfilled')disposeObject(r.value);if(thumbnailMode)throw Error('Thumbnail models could not load.');continue;}
        const [near,far]=loaded.map(r=>(r as PromiseFulfilledResult<T.Group>).value);if(disposed||serial!==request){disposeObject(near);disposeObject(far);return;}
        const host=await hostLoader.load(tile.contract,{map:true,lod:true});if(!host||disposed||serial!==request){if(host)disposeObject(host);disposeObject(near);disposeObject(far);return;}softenMapShadows(host);const c=centre(tile.q,tile.r,MAP_SCALE);host.position.set(c.x,0,c.z);for(const root of [near,far]){const origin=contentOrigin(tile.contract);root.position.set(origin.x*MAP_SCALE,origin.y*MAP_SCALE,origin.z*MAP_SCALE);root.traverse((o:any)=>{if(o.isMesh){o.castShadow=true;o.receiveShadow=true;}});host.add(root);}host.userData.packageId=tile.packageId;host.userData.title=tile.title;host.userData.creator=tile.creator.handle;host.userData.version=tile.version;group.add(host);lods.push({near,far});published.set(`${tile.id}:${tile.version}`,host);tick();

      }catch(e){if(thumbnailMode)throw e;if(!signal.aborted)console.warn('A published creator tile could not be loaded.');}
    }if(tile.version){const c=centre(tile.q,tile.r,MAP_SCALE);extent=Math.max(extent,Math.abs(c.x)+12,Math.abs(c.z)+12);}}
    if(serial!==request||disposed)return;
    const nextReserved=await reserved.prepare(editor?info.tiles:[],selected);
    if(!nextReserved||serial!==request||disposed)return;
    if(editor){
      for(const contract of info.studyTiles||[]){const id=`study:${contract.q},${contract.r}`;if(!published.has(id)){const host=await hostLoader.load(contract,{map:true,lod:true});if(!host||disposed||serial!==request){if(host)disposeObject(host);return;}softenMapShadows(host);const c=centre(contract.q,contract.r,MAP_SCALE);host.position.set(c.x,0,c.z);host.name=`Study: ${contract.recipe.title}`;group.add(host);published.set(id,host);}}
      if(selected){const t=info.tiles.find((t:any)=>t.q===selected.q&&t.r===selected.r);if(!t&&!info.studyTiles?.some((t:any)=>t.q===selected.q&&t.r===selected.r)){const contract=await tileContract(selected.q,selected.r,variant,rotation,legacyEdges);if(serial!==request||disposed)return;const key=JSON.stringify(contract);nextSelected=hostCache.get(key)||await hostLoader.load(contract,{map:true,slot:true});if(!nextSelected||serial!==request||disposed){if(nextSelected&&!hostCache.has(key))disposeObject(nextSelected);return;}softenMapShadows(nextSelected);hostCache.delete(key);hostCache.set(key,nextSelected);const c=centre(selected.q,selected.r,MAP_SCALE);nextSelected.position.set(c.x,0,c.z);nextSelected.name='Selected creator tile';}}
    }
    group.userData.preparing=true;
    const contracts=[...published.values()].map(host=>host.userData.contract).filter(Boolean).concat(nextReserved.contracts,nextSelected?.userData.contract?[nextSelected.userData.contract]:[]);
    const [commitWater]=await Promise.all([
      water.prepare(contracts),
      // Warm shaders before a newly reserved host becomes visible, just as for a selection.
      (async()=>{for(const host of [...nextReserved.hosts,...(nextSelected?[nextSelected]:[])])if(!host.parent)await world.renderer.compileAsync(host,camera,world.scene);})(),
    ]);
    if(disposed||serial!==request||!commitWater)return;
    commitWater();nextReserved.commit(group);world.nature?.setTiles(contracts);selectedGroup?.removeFromParent();selectedGroup=nextSelected;if(selectedGroup)group.add(selectedGroup);tick();
    const ghosts=JSON.stringify([info.slots,selected?.q,selected?.r,allowSelection,info.studyTiles]);
    if(editor&&!thumbnailMode&&ghosts!==lastGhosts){
      lastGhosts=ghosts;clearGhosts();
      const drawnEdges=new Set<string>();
      for(const s of info.slots){if(s.status!=='available')continue;const c=centre(s.q,s.r,MAP_SCALE);extent=Math.max(extent,Math.abs(c.x)+10,Math.abs(c.z)+10);
        if(selected?.q===s.q&&selected?.r===s.r)continue;
        const mesh=createBlankTile(s,drawnEdges);if(info.studyTiles?.some((t:any)=>t.q===s.q&&t.r===s.r)){for(const c of [...mesh.children])disposeObject(c);}group.add(mesh);if(allowSelection&&s.status==='available')hitTargets.push(mesh);
      }
    }
    for(const [key,host]of hostCache){if(hostCache.size<=12)break;if(host!==selectedGroup){hostCache.delete(key);disposeObject(host);}}
    group.userData.preparing=false;

    world.renderer.shadowMap.needsUpdate=true;world.ocean?.markDirty();world.requestFrame();
    return true;
    }catch(error){
      if(disposed||signal.aborted||serial!==request)return;
      group.userData.preparing=false;
      console.warn('Tile preview could not be prepared.',error);
      if(editor)parent.postMessage({type:'creator:tile-error',q:selected?.q,r:selected?.r,variant,rotation},location.origin);
    }
  }
  if(editor){
    let revealed=false;
    const message=(e:MessageEvent)=>{
      if(e.origin!==location.origin||e.source!==parent)return;
      if(thumbnailMode&&e.data?.type==='creator:thumbnail'){
        void (async()=>{
          try{
            if(!await update(e.data.data,undefined,undefined,false,false))throw Error('Tile preparation was interrupted.');
            const tile=e.data.data.tiles.find((t:any)=>t.id===e.data.tileId);
            const host=[...reserved.hosts,...published.values()].find(h=>h.userData.contract?.q===tile?.q&&h.userData.contract?.r===tile?.r);
            if(!tile||!host)throw Error('Tile is unavailable.');
            const blob=await world.captureTileThumbnail(tile.contract,host);
            if(!signal.aborted)parent.postMessage({type:'creator:thumbnail-result',id:e.data.id,blob},location.origin);
          }catch{if(!signal.aborted)parent.postMessage({type:'creator:thumbnail-result',id:e.data.id,error:true},location.origin);}
        })();
      }else if(e.data?.type==='creator:tiles'){
        if(e.data.panel)panel=e.data.panel;
        void update(e.data.data,e.data.selected,e.data.variant,e.data.allowSelection!==false,e.data.restoreView!==false,e.data.rotation,e.data.legacyEdges).then(async committed=>{
          if(!committed||revealed||signal.aborted)return;
          const prepared=request;
          parent.postMessage({type:'creator:loading',stage:'view'},location.origin);
          if(await world.whenRendered()&&!signal.aborted&&prepared===request&&!revealed){
            revealed=true;parent.postMessage({type:'creator:loaded'},location.origin);
          }
        });
      }else if(e.data?.type==='creator:viewport'){
        panel=e.data.panel;syncPanelInset();focusSelection(false);
      }
    };
    window.addEventListener('message',message,{signal});parent.postMessage({type:'creator:ready'},location.origin);
    const interrupt=()=>{finishTransition();group.userData.focused=true;};world.controls.addEventListener('start',interrupt);
    const root=document.querySelector<HTMLElement>('.tile-study')!;
    root.addEventListener('click',e=>{if(!selection&&(e.target as Element).closest('[data-reset],[data-in],[data-out],[data-settings-action="view"]'))interrupt();},{signal,capture:true});
    root.addEventListener('input',e=>{if(!selection&&(e.target as Element).matches('#setting-zoom'))interrupt();},{signal,capture:true});
    const panels=[...root.querySelectorAll<HTMLElement>('.map-settings,.map-video-panel,.video-render')];
    const syncPanels=()=>{mapPanelOpen=panels.some(p=>p instanceof HTMLDialogElement?p.open:!p.hidden);syncPanelInset();parent.postMessage({type:'creator:map-panel',open:mapPanelOpen},location.origin);};
    const panelObserver=new MutationObserver(syncPanels);for(const p of panels)panelObserver.observe(p,{attributes:true,attributeFilter:['hidden','open']});syncPanels();
    const hitAt=(e:PointerEvent)=>{const rect=canvas.getBoundingClientRect();pointer.set((e.clientX-rect.left)/rect.width*2-1,-(e.clientY-rect.top)/rect.height*2+1);camera.updateMatrixWorld();raycaster.setFromCamera(pointer,camera);return raycaster.intersectObjects(hitTargets,false)[0];};
    let down:{x:number;y:number}|null=null;
    canvas.addEventListener('pointerdown',(e:PointerEvent)=>{down=e.button===0?{x:e.clientX,y:e.clientY}:null;},{signal});
    canvas.addEventListener('pointerup',(e:PointerEvent)=>{const start=down;down=null;if(selection||!start||Math.hypot(e.clientX-start.x,e.clientY-start.y)>5)return;const hit=hitAt(e);if(hit){world.closeMapPanels();const {q,r}=hit.object.userData;parent.postMessage({type:'creator:select',q,r},location.origin);}},{signal});
    canvas.addEventListener('pointercancel',()=>{down=null;},{signal});
    canvas.addEventListener('pointermove',(e:PointerEvent)=>{if(!down)canvas.style.cursor=!selection&&hitAt(e)?'pointer':'grab';},{signal});
    window.addEventListener('keydown',(e:KeyboardEvent)=>{if(!e.defaultPrevented&&e.key==='Escape'&&selection){e.preventDefault();parent.postMessage({type:'creator:deselect'},location.origin);}},{signal});
    root.addEventListener('keydown',(e:KeyboardEvent)=>{if((['ArrowLeft','ArrowRight'].includes(e.key)||!selection&&['0','+','=','-'].includes(e.key))&&!(e.target as Element).closest('input,select,textarea'))interrupt();},{signal,capture:true});
    signal.addEventListener('abort',()=>{panelObserver.disconnect();world.controls.removeEventListener('start',interrupt);},{once:true});
  }else {
    let down:{x:number;y:number}|null=null;const canvas=world.renderer.domElement;
    canvas.addEventListener('pointerdown',(e:PointerEvent)=>{down={x:e.clientX,y:e.clientY};},{signal});
    canvas.addEventListener('click',(e:MouseEvent)=>{if(!down||Math.hypot(e.clientX-down.x,e.clientY-down.y)>5)return;const rect=canvas.getBoundingClientRect();pointer.set((e.clientX-rect.left)/rect.width*2-1,-(e.clientY-rect.top)/rect.height*2+1);raycaster.setFromCamera(pointer,world.camera);const hit=raycaster.intersectObjects([...published.values()],true)[0];if(!hit)return;let object:T.Object3D|null=hit.object;while(object&&!object.userData.packageId)object=object.parent;if(!object)return;e.stopImmediatePropagation();const card=document.createElement('dialog');card.className='creator-package-dialog';card.style.cssText='background:var(--stone-800);color:#fff;border:1px solid #ffffff24;border-radius:15px;padding:28px;max-width:400px;box-shadow:0 20px 70px rgba(var(--theme-shadow-rgb),.5);font:14px var(--sans)';const title=document.createElement('h2'),credit=document.createElement('p'),version=document.createElement('p'),link=document.createElement('a'),close=document.createElement('button');title.textContent=object.userData.title;credit.textContent='By @'+object.userData.creator;version.textContent='World package · v'+object.userData.version;link.textContent='Package details & changelog ↗';link.href=`https://creators.threetopia.com/packages/${object.userData.packageId}`;link.target='_blank';link.rel='noopener noreferrer';link.style.color='var(--stone-200)';close.textContent='Close';close.style.cssText='display:block;margin-top:24px;border:1px solid #ffffff44;border-radius:5px;background:transparent;color:white;padding:8px 15px;cursor:pointer';close.onclick=()=>card.close();card.addEventListener('close',()=>card.remove());card.append(title,credit,version,link,close);document.querySelector('.tile-study')!.append(card);card.showModal();},{signal,capture:true});
    try{const res=await fetch(`${registry}/api/tiles`,{signal});if(res.ok)await update(await res.json());}catch{/* The original four worlds remain available if the registry is offline. */}}
  signal.addEventListener('abort',()=>{disposed=true;stopTick();if(editor){transition=null;if(overview)moveView(overview);camera.clearViewOffset();setCameraLocked(false);}hostLoader.dispose();reserved.dispose();water.dispose();world.nature?.setTiles([]);for(const host of hostCache.values())disposeObject(host);hostCache.clear();disposeObject(group);},{once:true});
}
