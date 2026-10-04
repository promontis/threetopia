import * as THREE from 'three/webgpu';
import {uv,float} from 'three/tsl';
import {hexCenter,hexCorners,availableSlots,insideTile} from './index.js';
import {CAMERA_DIRECTION,projectScene,unprojectScene,tileFrame,sceneLimits,frameCenter,clampSceneView} from './scene-camera.js';

/** Camera and interaction only. The application supplies its actual playable scene. */
export class SceneAtlasRenderer {
  constructor(host,registry,options={}) {
    this.registry=registry;this.options=options;this.mode=options.shared?'mini':'overview';
    this.motion=!matchMedia('(prefers-reduced-motion: reduce)').matches;this.boundaries=false;this.creators=false;
    this.events=new AbortController();this.labels=[];this.hidden=new Set();this.dirty=true;this.miniDirty=true;
    this.root=document.createElement('div');this.root.className='scene-atlas';this.root.tabIndex=0;
    this.root.setAttribute('aria-label','World map. Drag to pan, scroll to zoom. Home shows all worlds.');
    this.overlay=document.createElement('div');this.overlay.className='scene-map-labels';this.root.append(this.overlay);
    this.player=document.createElement('span');this.player.className='scene-map-player';this.player.hidden=true;this.player.setAttribute('aria-label','Your position');this.overlay.append(this.player);
    this.camera=new THREE.OrthographicCamera(-1,1,1,-1,1,7000);
    this.view={x:0,y:0,span:1};this.mount(host);this.bindInputs();this.buildLabels();
    this.resizeObserver=new ResizeObserver(()=>this.resize());this.resizeObserver.observe(this.root);
    this.ready=this.init().catch(error=>{this.failed=true;this.options.onError?.(error);throw error;});
    // Consumers can await ready; an error callback also supports lazy embedded maps.
    this.ready.catch(()=>{});
  }
  async init(){
    if(this.options.shared){
      this.renderer=this.options.shared.renderer;this.runtime=this.options.shared.runtime;
      this.canvasHome=this.renderer.domElement.parentElement;
      this.miniTarget=new THREE.RenderTarget(320,240,{depthBuffer:true});this.miniTarget.texture.name='Actual world minimap';
      const material=new THREE.MeshBasicNodeMaterial({map:this.miniTarget.texture,depthTest:false,depthWrite:false,toneMapped:false});
      material.opacityNode=float(1).sub(uv().sub(.5).length().smoothstep(.485,.5));material.transparent=true;
      this.miniQuad=new THREE.QuadMesh(material);
    }else{
      if(!navigator.gpu)throw Error('The 3D map needs WebGPU. Use a browser with hardware acceleration enabled.');
      this.renderer=new THREE.WebGPURenderer({antialias:true,powerPreference:'high-performance'});await this.renderer.init();
      if(!this.renderer.backend.isWebGPUBackend)throw Error('WebGPU could not start. Check hardware acceleration and reload.');
      this.renderer.setPixelRatio(Math.min(devicePixelRatio,1.5));this.renderer.toneMapping=THREE.ACESFilmicToneMapping;this.renderer.toneMappingExposure=1.05;
      this.root.prepend(this.renderer.domElement);
      this.runtime=await this.options.loadScene(this.renderer,this.camera,message=>this.options.onProgress?.(message));
    }
    if(this.disposed){this.disposeResources();return;}
    this.renderer.domElement.dataset.sceneMap='true';
    for(const tile of this.registry.tiles){const layer=this.runtime.getLayers().find(l=>l.id===tile.id);if(layer)this.options.onLayers?.(tile,layer);}
    this.resize();if(this.focusTarget)this.focus(...this.focusTarget);else this.fit();this.startLoop();this.emitStats();
  }
  mount(host){this.host=host;host.prepend(this.root);if(this.renderer&&this.mode==='overview')this.root.prepend(this.renderer.domElement);this.resize();}
  setMode(mode){
    if(this.mode===mode)return;this.mode=mode;this.root.dataset.mode=mode;
    if(this.options.shared){
      if(mode==='overview'){this.root.prepend(this.renderer.domElement);this.fit();}
      else{this.canvasHome.append(this.renderer.domElement);this.miniDirty=true;this.miniTile=null;}
    }
    this.resize();if(mode==='mini'&&this.playerPosition)this.updatePlayer(...this.playerPosition);this.dirty=true;
  }
  insets(){return this.mode==='mini'?{top:8,right:8,bottom:8,left:8}:this.width<650?{top:125,right:30,bottom:170,left:30}:{top:115,right:120,bottom:125,left:70};}
  resize(){
    const box=this.root.getBoundingClientRect();if(box.width<1||box.height<1)return;
    const wasFit=!this.limits||Math.abs(this.view.span-this.limits.maxSpan)<1;
    const relative=this.limits?this.view.span/this.limits.minSpan:1;
    this.width=box.width;this.height=box.height;
    this.limits=sceneLimits(this.registry.tiles,this.width,this.height,this.insets());
    if(wasFit){this.view={...frameCenter(this.limits.area,this.limits.maxSpan,this.limits),span:this.limits.maxSpan};}
    else{this.view.span=relative*this.limits.minSpan;this.view=clampSceneView(this.view,this.limits);}
    if(this.renderer&&this.mode==='overview')this.renderer.setSize(this.width,this.height);
    if(this.miniTarget&&this.mode==='mini'){this.miniTarget.setSize(Math.round(this.width*1.25),Math.round(this.height*1.25));this.miniDirty=true;}
    if(this.focusTarget&&relative<=1.01)this.focus(...this.focusTarget);else this.syncCamera();
  }
  syncCamera(){
    if(!this.limits)return;
    this.view=clampSceneView(this.view,this.limits);const {x,z}=unprojectScene(this.view.x,this.view.y),s=this.view.span/2;
    this.camera.left=-s*this.limits.aspect;this.camera.right=s*this.limits.aspect;this.camera.top=s;this.camera.bottom=-s;
    this.camera.position.set(x+CAMERA_DIRECTION[0]*1800,CAMERA_DIRECTION[1]*1800,z+CAMERA_DIRECTION[2]*1800);this.camera.lookAt(x,0,z);
    this.camera.updateProjectionMatrix();this.camera.updateMatrixWorld();this.dirty=true;this.miniDirty=true;this.layoutLabels();this.emitStats();
  }
  fit(){this.focusTarget=null;if(!this.limits)return;this.view={...frameCenter(this.limits.area,this.limits.maxSpan,this.limits),span:this.limits.maxSpan};this.syncCamera();}
  focus(x,z){
    this.focusTarget=[x,z];if(!this.limits)return;
    const tile=this.registry.tiles.reduce((a,b)=>{const ac=hexCenter(a.q,a.r),bc=hexCenter(b.q,b.r);return Math.hypot(ac.x-x,ac.z-z)<Math.hypot(bc.x-x,bc.z-z)?a:b;});
    this.view={...frameCenter(tileFrame(tile),this.limits.minSpan,this.limits),span:this.limits.minSpan};this.syncCamera();
  }
  zoom(factor,clientX,clientY){
    if(!this.limits||!Number.isFinite(factor)||factor<=0)return;
    const old=this.view.span,span=Math.max(this.limits.minSpan,Math.min(this.limits.maxSpan,old*factor));
    if(clientX!==undefined){const b=this.root.getBoundingClientRect();this.view.x+=(clientX-b.left-this.width/2)*(old-span)/this.height;this.view.y+=(clientY-b.top-this.height/2)*(old-span)/this.height;}
    this.view.span=span;this.syncCamera();
  }
  setOptions(options){Object.assign(this,options);this.dirty=true;this.miniDirty=true;this.layoutLabels();this.emitStats();}
  setLayerVisible(tile,layer,visible){const key=tile+':'+layer;visible?this.hidden.delete(key):this.hidden.add(key);this.runtime?.setLayerVisible(tile,layer,visible);this.dirty=true;this.miniDirty=true;this.layoutLabels();}
  getLayers(){return this.runtime?.getLayers()??[];}
  select(item){this.options.onSelect?.(item);}
  updatePlayer(x,z,yaw,height=0){
    this.playerPosition=[x,z,yaw,height];this.player.hidden=false;
    if(this.mode==='mini'&&this.limits){const tile=this.registry.tiles.find(t=>{const c=hexCenter(t.q,t.r);return insideTile(x-c.x,z-c.z);});if(tile?.id!==this.miniTile&&tile){this.miniTile=tile.id;const c=hexCenter(tile.q,tile.r);this.focus(c.x,c.z);}}
    this.layoutLabels();
  }
  pixel(x,y,z){const p=projectScene(x,y,z);return{x:this.width/2+(p.x-this.view.x)*this.height/this.view.span,y:this.height/2+(p.y-this.view.y)*this.height/this.view.span};}
  buildLabels(){
    const make=(text,position,className,item,tileId)=>{
      const button=document.createElement('button');button.className=className;button.textContent=text;button.type='button';button.addEventListener('click',e=>{e.stopPropagation();if(this.mode==='mini')return;this.select(item);},{signal:this.events.signal});
      this.overlay.append(button);this.labels.push({element:button,position,item,tileId});
    };
    for(const tile of this.registry.tiles){
      const c=hexCenter(tile.q,tile.r);make(tile.short,[c.x,12,c.z+210],'scene-world-label',{kind:'world',tile},tile.id);
      for(const landmark of tile.landmarks??[])make(landmark.label,[landmark.position[0]+c.x,landmark.position[1]+8,landmark.position[2]+c.z],'scene-landmark',{kind:'landmark',tile,landmark},tile.id);
    }
    for(const slot of availableSlots(this.registry.tiles)){const c=hexCenter(slot.q,slot.r);make(`＋ ${slot.q}, ${slot.r}`,[c.x,1,c.z],'scene-slot',{kind:'slot',slot});}
  }
  layoutLabels(){
    if(!this.width)return;
    const detail=this.view.span<this.limits.maxSpan*.8;
    for(const l of this.labels){const p=this.pixel(...l.position),slot=l.item.kind==='slot';
      l.element.hidden=this.mode==='mini'||(slot?!this.creators:this.hidden.has(l.tileId+':tile'))||(l.item.kind==='landmark'&&!detail)||p.x<20||p.x>this.width-20||p.y<25||p.y>this.height-30;
      l.element.style.transform=`translate(${p.x}px,${p.y}px) translate(-50%,-50%)`;
    }
    if(this.playerPosition){const [x,z,yaw,height]=this.playerPosition,p=this.pixel(x,height+3,z),a=this.pixel(x-Math.sin(yaw)*10,height+3,z-Math.cos(yaw)*10),angle=Math.atan2(a.x-p.x,-(a.y-p.y));this.player.style.transform=`translate(${p.x}px,${p.y}px) translate(-50%,-50%) rotate(${angle}rad)`;}
    this.root.dataset.mode=this.mode;this.root.dataset.motion=String(this.motion);
  }
  bindInputs(){
    const signal=this.events.signal,pointers=new Map();let moved=false,lastPinch=0;
    this.root.addEventListener('wheel',e=>{if(this.mode==='mini')return;e.preventDefault();this.zoom(Math.exp(Math.max(-120,Math.min(120,e.deltaY))*.0025),e.clientX,e.clientY);},{passive:false,signal});
    this.root.addEventListener('pointerdown',e=>{if(this.mode==='mini'||e.target.closest('button')||e.button>0)return;this.root.focus({preventScroll:true});this.root.setPointerCapture(e.pointerId);pointers.set(e.pointerId,{x:e.clientX,y:e.clientY});moved=false;lastPinch=0;},{signal});
    this.root.addEventListener('pointermove',e=>{
      const last=pointers.get(e.pointerId);if(!last)return;const dx=e.clientX-last.x,dy=e.clientY-last.y;if(Math.abs(dx)+Math.abs(dy)>2)moved=true;pointers.set(e.pointerId,{x:e.clientX,y:e.clientY});
      if(pointers.size===2){const [a,b]=[...pointers.values()],distance=Math.hypot(a.x-b.x,a.y-b.y);if(lastPinch)this.zoom(lastPinch/distance,(a.x+b.x)/2,(a.y+b.y)/2);lastPinch=distance;}
      else{this.view.x-=dx*this.view.span/this.height;this.view.y-=dy*this.view.span/this.height;this.syncCamera();}
    },{signal});
    const up=e=>{if(!pointers.has(e.pointerId))return;pointers.delete(e.pointerId);lastPinch=0;if(!moved&&e.type==='pointerup'){
      const box=this.root.getBoundingClientRect(),p=unprojectScene(this.view.x+(e.clientX-box.left-this.width/2)*this.view.span/this.height,this.view.y+(e.clientY-box.top-this.height/2)*this.view.span/this.height);
      const tile=this.registry.tiles.find(t=>{const c=hexCenter(t.q,t.r);return insideTile(p.x-c.x,p.z-c.z);});if(tile)this.select({kind:'world',tile});
    }};
    this.root.addEventListener('pointerup',up,{signal});this.root.addEventListener('pointercancel',up,{signal});
    this.root.addEventListener('keydown',e=>{
      if(this.mode==='mini'||e.target.closest('button,input')||e.ctrlKey||e.metaKey||e.altKey)return;
      if(['+','=','-','_','Home','ArrowLeft','ArrowRight','ArrowUp','ArrowDown'].includes(e.key))e.preventDefault();
      if(['+','='].includes(e.key))this.zoom(.8);else if(['-','_'].includes(e.key))this.zoom(1.25);else if(e.key==='Home')this.fit();
      else if(e.key.startsWith('Arrow')){const d=this.view.span*.08;this.view.x+=e.key==='ArrowLeft'?-d:e.key==='ArrowRight'?d:0;this.view.y+=e.key==='ArrowUp'?-d:e.key==='ArrowDown'?d:0;this.syncCamera();}
    },{signal});
    document.addEventListener('visibilitychange',()=>{this.lastFrame=performance.now();this.dirty=true;},{signal});
  }
  startLoop(){
    let last=performance.now(),lastRender=last;const tick=now=>{
      if(this.disposed)return;this.raf=requestAnimationFrame(tick);
      if(this.mode==='mini'||document.hidden||!this.root.isConnected||this.width<1){last=now;lastRender=now;return;}
      if(now-last<1000/30-.25||(!this.motion&&!this.dirty))return;
      const dt=this.motion?Math.min(.06,(now-lastRender)/1000):0;lastRender=now;last=now-((now-last)%(1000/30));
      try{this.renderer.info.reset();this.runtime.renderOverview(this.camera,dt,{boundaries:this.boundaries});this.dirty=false;this.frames=(this.frames??0)+1;this.root.dataset.frames=String(this.frames);if(this.frames%15===1)this.emitStats();}
      catch(error){cancelAnimationFrame(this.raf);this.failed=true;this.options.onError?.(error);}
    };this.raf=requestAnimationFrame(tick);
  }
  /** Composite a cached camera render into the walking canvas: no second GPU context. */
  renderMini(){
    if(this.mode!=='mini'||!this.runtime||this.failed||document.hidden||!this.root.isConnected)return;
    const box=this.root.getBoundingClientRect();if(box.width<1||box.height<1)return;
    const r=this.renderer,viewport=r.getViewport(new THREE.Vector4()),scissor=r.getScissor(new THREE.Vector4()),scissorTest=r.getScissorTest(),target=r.getRenderTarget(),autoClear=r.autoClear;
    try{
      if(this.miniDirty){r.setRenderTarget(this.miniTarget);r.autoClear=true;this.runtime.renderOverview(this.camera,0,{mini:true});r.setRenderTarget(target);this.miniDirty=false;}
      const canvas=r.domElement.getBoundingClientRect();r.setViewport(box.left-canvas.left,box.top-canvas.top,box.width,box.height);r.setScissor(box.left-canvas.left,box.top-canvas.top,box.width,box.height);r.setScissorTest(true);r.autoClear=false;this.miniQuad.render(r);
    }finally{r.setRenderTarget(target);r.setViewport(viewport);r.setScissor(scissor);r.setScissorTest(scissorTest);r.autoClear=autoClear;}
  }
  emitStats(){
    if(!this.limits)return;
    const {minSpan,maxSpan}=this.limits,s=this.view.span;
    this.options.onStats?.({renderer:'scene',loadedTiles:this.runtime?this.registry.tiles.length:0,span:s,minSpan,maxSpan,atMin:s<=minSpan+.01,atMax:s>=maxSpan-.01,lod:s<maxSpan*.8?'detail':'overview',zoom:Math.round(maxSpan/s*100),center:{x:this.view.x,y:this.view.y},drawCalls:this.renderer?.info.render.drawCalls??0,triangles:this.renderer?.info.render.triangles??0,canvases:1,shared:!!this.options.shared,frames:this.frames??0});
  }
  disposeResources(){this.miniTarget?.dispose();this.miniQuad?.material.dispose();if(!this.options.shared){this.runtime?.dispose();this.renderer?.dispose();}else if(this.renderer?.domElement.parentElement===this.root)this.canvasHome.append(this.renderer.domElement);}
  dispose(){this.disposed=true;cancelAnimationFrame(this.raf);this.events.abort();this.resizeObserver.disconnect();this.disposeResources();this.root.remove();}
}
