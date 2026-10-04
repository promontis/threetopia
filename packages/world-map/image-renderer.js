import {availableSlots,hexCenter,insideTile} from './index.js';
import {projectMap,validateImageMap} from './image-format.js';
import {MapComposition} from './map-atmosphere.js';
import {MAP_FPS,motionEnabled,advanceMapTime} from './map-motion.js';
import {imageLimits} from './image-camera.js';
import {frameCenter,clampSceneView} from './scene-camera.js';

const element=(tag,className,parent)=>{const el=document.createElement(tag);el.className=className;parent?.append(el);return el;};
const clamp=(v,a,b)=>Math.max(a,Math.min(b,v));

/** Illustrated tile groups in one Three.js scene. DOM contains only accessible controls/labels. */
export class ImageAtlasRenderer {
  constructor(host,registry,{onSelect=()=>{},onStats=()=>{},onError=()=>{},onLayers=()=>{}}={}) {
    Object.assign(this,{registry,onSelect,onStats,onError,onLayers});
    this.mode='overview';this.view={span:1,x:0,y:0};this.boundaries=false;this.creators=false;
    this.cache=new Map();this.maps=new Map();this.pointers=new Map();this.markers=[];this.player=null;this.selected=null;this.frame=0;this.time=0;this.dirty=true;
    this.controller=new AbortController();this.events=this.controller.signal;this.slots=availableSlots(registry.tiles);
    this.reduced=matchMedia('(prefers-reduced-motion: reduce)');this.motion=!this.reduced.matches;
    this.root=element('div','image-map');this.root.tabIndex=0;this.root.setAttribute('role','region');this.root.setAttribute('aria-label','World map. Drag to pan, scroll to zoom. Home shows all worlds.');this.root.dataset.renderer='composition';
    this.labels=element('div','image-map-labels',this.root);
    for(const tile of registry.tiles){const c=hexCenter(tile.q,tile.r);this.addMarker(tile.short,projectMap(c.x,c.z),'world',tile.id,()=>this.select({kind:'world',tile}),tile);}
    for(const slot of this.slots){const c=hexCenter(slot.q,slot.r);this.addMarker('+',projectMap(c.x,c.z),'slot',`${slot.q},${slot.r}`,()=>this.select({kind:'slot',slot}));}
    this.playerMarker=element('span','image-map-player',this.labels);this.playerMarker.innerHTML='<i></i>';this.playerMarker.setAttribute('aria-label','Your position');this.playerMarker.hidden=true;
    this.reduced.addEventListener('change',()=>{this.last=0;this.invalidate();},{signal:this.events});
    document.addEventListener('visibilitychange',()=>{this.last=0;this.invalidate();},{signal:this.events});
    this.resizeObserver=new ResizeObserver(()=>{this.resize();this.invalidate();});this.bind();this.mount(host);
    this.ready=this.init().catch(error=>{if(!this.disposed){this.failed=true;this.root.dataset.mapState='error';onError(error);}throw error;});this.ready.catch(()=>{});
  }
  async init(){
    this.composition=new MapComposition(this.root,{invalidate:()=>this.invalidate(),onError:this.onError});
    await Promise.all(this.registry.tiles.map(async tile=>{
      if(!tile.imageMap)throw Error(`${tile.short} needs a map representation.`);
      const r=await fetch(tile.imageMap,{signal:this.events});if(!r.ok)throw Error(`${tile.short}: map unavailable (${r.status}).`);
      const data=await r.json(),errors=validateImageMap(data);if(errors.length)throw Error(`${tile.short}: ${errors[0]}`);this.maps.set(tile.id,data);
    }));
    if(this.disposed)return;
    const ranked=[...this.registry.tiles].sort((a,b)=>{const ac=hexCenter(a.q,a.r),bc=hexCenter(b.q,b.r);return projectMap(ac.x,ac.z).y-projectMap(bc.x,bc.z).y;});
    for(const tile of this.registry.tiles)this.composition.addBoundary(tile,'world');
    for(const slot of this.slots)this.composition.addBoundary(slot,'slot');
    this.resize();
    await Promise.all(ranked.map(async(tile,index)=>{
      const c=hexCenter(tile.q,tile.r),p=projectMap(c.x,c.z),data=this.maps.get(tile.id);
      await this.composition.addTile(tile,data,p,new URL(tile.imageMap,location.href).href,index+1);if(this.disposed)return;
      for(const l of data.landmarks)this.addMarker(l.label,{x:p.x+l.position[0],y:p.y+l.position[1]},'poi',`${tile.id}:${l.id}`,()=>this.select({kind:'landmark',tile,landmark:l}),tile);
      this.cache.set(tile.id,{tile,data});this.onLayers(tile,data);this.invalidate();
    }));
    if(this.disposed)return;
    if(this.focusTarget)this.focus(...this.focusTarget);else this.fit();
    this.root.dataset.mapState='ready';this.invalidate();
  }
  addMarker(text,p,kind,id,onClick,tile){
    const b=element('button',`image-map-marker image-map-marker--${kind}`,this.labels);b.type='button';b.textContent=text;b.dataset.mapMarker=id;b.setAttribute('aria-label',kind==='slot'?`Plan a world at tile ${id}`:text);
    b.addEventListener('click',e=>{e.stopPropagation();if(this.mode==='mini'||performance.now()<(this.suppressClickUntil??0))return;onClick();},{signal:this.events});
    this.markers.push({el:b,p,kind,id,tile});
  }
  bind(){
    const signal=this.events,root=this.root;
    root.addEventListener('wheel',e=>{if(this.mode==='mini')return;e.preventDefault();this.zoom(Math.exp(clamp(e.deltaY*.0012,-.3,.3)),e.clientX,e.clientY);},{signal,passive:false});
    root.addEventListener('pointerdown',e=>{if(this.mode==='mini'||e.button>0||e.target.closest('button'))return;root.focus({preventScroll:true});root.setPointerCapture(e.pointerId);this.pointers.set(e.pointerId,{x:e.clientX,y:e.clientY});this.dragged=0;},{signal});
    root.addEventListener('pointermove',e=>{
      const last=this.pointers.get(e.pointerId);if(!last||!this.limits)return;
      const before=[...this.pointers.values()];this.pointers.set(e.pointerId,{x:e.clientX,y:e.clientY});const after=[...this.pointers.values()];
      if(after.length===2){const a=Math.hypot(before[0].x-before[1].x,before[0].y-before[1].y),b=Math.hypot(after[0].x-after[1].x,after[0].y-after[1].y);if(a>0&&b>0)this.zoom(a/b,(after[0].x+after[1].x)/2,(after[0].y+after[1].y)/2);}
      else{const dx=e.clientX-last.x,dy=e.clientY-last.y;this.view.x-=dx*this.view.span/this.height;this.view.y-=dy*this.view.span/this.height;this.dragged+=Math.hypot(dx,dy);this.constrain();this.invalidate();}
      if(this.dragged>4||after.length===2){this.suppressClickUntil=performance.now()+350;root.classList.add('is-dragging');}
    },{signal});
    const up=e=>{this.pointers.delete(e.pointerId);root.classList.remove('is-dragging');};
    root.addEventListener('pointerup',up,{signal});root.addEventListener('pointercancel',up,{signal});root.addEventListener('lostpointercapture',up,{signal});
    root.addEventListener('dblclick',e=>{if(this.mode!=='mini'&&!e.target.closest('button'))this.zoom(.65,e.clientX,e.clientY);},{signal});
    root.addEventListener('keydown',e=>{
      if(this.mode==='mini'||e.target!==root||e.ctrlKey||e.metaKey||e.altKey)return;
      if(['+','=','-','ArrowLeft','ArrowRight','ArrowUp','ArrowDown','Home'].includes(e.key))e.preventDefault();
      if(e.key==='+'||e.key==='=')this.zoom(.75);else if(e.key==='-')this.zoom(1.35);else if(e.key==='Home')this.fit();else if(e.key.startsWith('Arrow')){const delta=this.view.span*.08;this.view.x+=e.key==='ArrowLeft'?-delta:e.key==='ArrowRight'?delta:0;this.view.y+=e.key==='ArrowUp'?-delta:e.key==='ArrowDown'?delta:0;this.constrain();this.invalidate();}
    },{signal});
  }
  mount(host){this.resizeObserver.disconnect();this.host=host;host.prepend(this.root);this.resizeObserver.observe(host);this.resize();this.invalidate();}
  setMode(mode){this.mode=mode;this.root.dataset.mode=mode;this.root.tabIndex=mode==='mini'?-1:0;this.last=0;this.resize();if(mode==='mini'&&this.player)this.focus(this.player.x,this.player.z);else this.fit();this.invalidate();}
  setOptions(options){for(const key of ['motion','boundaries','creators'])if(typeof options[key]==='boolean')this[key]=options[key];this.last=0;this.invalidate();}
  insets(){return this.mode==='mini'?{top:5,right:5,bottom:5,left:5}:this.width<650?{top:82,right:58,bottom:148,left:18}:this.height<500?{top:65,right:85,bottom:95,left:30}:{top:78,right:75,bottom:100,left:38};}
  resize(){
    if(this.maps.size!==this.registry.tiles.length||!this.host.clientWidth||!this.host.clientHeight)return;
    const fit=!this.limits||Math.abs(this.view.span-this.limits.maxSpan)<.01,relative=this.limits?this.view.span/this.limits.minSpan:1;
    this.width=this.host.clientWidth;this.height=this.host.clientHeight;
    this.limits=imageLimits(this.registry.tiles,this.maps,this.width,this.height,this.insets());
    if(fit)this.view={...frameCenter(this.limits.area,this.limits.maxSpan,this.limits),span:this.limits.maxSpan};else if(relative<=1.01&&this.focusTarget)this.focus(...this.focusTarget);else{this.view.span=relative*this.limits.minSpan;this.constrain();}
  }
  constrain(){if(this.limits)this.view=clampSceneView(this.view,this.limits);}
  fit(){this.focusTarget=null;if(!this.limits)return;this.view={...frameCenter(this.limits.area,this.limits.maxSpan,this.limits),span:this.limits.maxSpan};this.invalidate();}
  focus(x,z){
    this.focusTarget=[x,z];if(!this.limits)return;
    const tile=this.registry.tiles.find(t=>{const c=hexCenter(t.q,t.r);return insideTile(x-c.x,z-c.z);})??this.registry.tiles.reduce((a,b)=>{const c=hexCenter(a.q,a.r),d=hexCenter(b.q,b.r);return Math.hypot(c.x-x,c.z-z)<Math.hypot(d.x-x,d.z-z)?a:b;});
    this.view={...frameCenter(this.limits.frames.find(f=>f.id===tile.id),this.limits.minSpan,this.limits),span:this.limits.minSpan};this.constrain();this.invalidate();
  }
  zoom(factor,clientX,clientY){
    if(!this.limits||!Number.isFinite(factor)||factor<=0)return;
    const r=this.root.getBoundingClientRect(),old=this.view.span,next=clamp(old*factor,this.limits.minSpan,this.limits.maxSpan);
    if(clientX!==undefined){this.view.x+=(clientX-r.left-this.width/2)*(old-next)/this.height;this.view.y+=(clientY-r.top-this.height/2)*(old-next)/this.height;}
    this.view.span=next;this.constrain();this.invalidate();
  }
  select(item){this.selected=item;this.onSelect(item);this.invalidate();}
  updatePlayer(x,z,yaw,height=0){if(this.player&&Math.hypot(x-this.player.x,z-this.player.z)<1&&Math.abs(yaw-this.player.yaw)<.05&&Math.abs(height-this.player.height)<.2)return;this.player={x,z,yaw,height};if(this.mode==='mini')this.focus(x,z);this.invalidate();}
  setLayerVisible(tileId,layerId,visible){this.composition?.setLayerVisible(tileId,layerId,visible);if(layerId==='tile')for(const m of this.markers)if(m.tile?.id===tileId)m.disabled=!visible;this.invalidate();}
  getLayers(){return [...this.cache.values()];}
  getLayout(){return this.composition?.inspect()??[];}
  draw(){
    if(!this.limits||!this.composition||this.composition.disposed)return;
    const {width:w,height:h}=this,detail=this.view.span<this.limits.maxSpan*.8;
    this.composition.setView({width:w,height:h,span:this.view.span,center:{x:this.view.x,y:this.view.y},mini:this.mode==='mini'});
    // Project controls through the very camera used to draw the images this frame.
    const projected=[];
    for(const m of this.markers){let p={...m.p};
      if(m.kind==='world'){const shift=m.tile.id==='sakura'?[350,50]:m.tile.id==='punk'?[-380,-10]:m.tile.id==='tidewater'?[-320,170]:[270,75];p.x+=shift[0];p.y+=shift[1];}
      const {x,y}=this.composition.project(p.x,p.y);
      m.el.hidden=!!m.disabled||x<-90||x>w+90||y<-30||y>h+30||this.mode==='mini'||(m.kind==='slot'&&!this.creators)||(m.kind==='poi'&&!detail);
      if(m.el.hidden)continue;if(m.kind==='poi'&&projected.some(p=>Math.abs(p.x-x)<125&&Math.abs(p.y-y)<32)){m.el.hidden=true;continue;}projected.push({x,y});m.el.style.transform=`translate(${x}px,${y}px) translate(-50%,-50%)`;m.el.setAttribute('aria-pressed',String(m.kind==='world'&&this.selected?.tile?.id===m.id));
    }
    this.playerMarker.hidden=!this.player;if(this.player){const p=projectMap(this.player.x,this.player.z,this.player.height),s=this.composition.project(p.x,p.y),d=projectMap(-Math.sin(this.player.yaw),-Math.cos(this.player.yaw));this.playerMarker.style.transform=`translate(${s.x}px,${s.y}px)`;this.playerMarker.firstElementChild.style.transform=`rotate(${Math.atan2(d.x,-d.y)}rad)`;}
    this.composition.render(this.time,{boundaries:this.boundaries,creators:this.creators,mini:this.mode==='mini'});
    const {minSpan,maxSpan}=this.limits,stats={renderer:'composition',loadedTiles:this.cache.size,layers:[...this.cache.values()].reduce((n,i)=>n+i.data.components.length+1,0),span:this.view.span,minSpan,maxSpan,atMin:this.view.span<=minSpan+.01,atMax:this.view.span>=maxSpan-.01,lod:detail?'detail':'overview',canvases:1,effects:Number(this.root.dataset.webglEffects??0),zoom:Math.round(maxSpan/this.view.span*100),center:{x:this.view.x,y:this.view.y},frames:this.composition.renders};
    this.host.dataset.mapStats=JSON.stringify(stats);this.onStats(stats);
  }
  invalidate(){this.dirty=true;this.schedule();}
  schedule(){
    if(this.disposed||this.frame)return;
    this.frame=requestAnimationFrame(now=>{
      this.frame=0;if(this.disposed)return;
      const visible=!document.hidden&&this.root.isConnected&&this.host.clientWidth>0&&this.host.clientHeight>0;
      const active=motionEnabled({motion:this.motion,reduced:this.reduced.matches,hidden:!visible,mini:this.mode==='mini'});
      this.root.dataset.motion=String(active);this.root.dataset.mode=this.mode;
      if(!visible){this.last=0;return;}
      const elapsed=this.last?now-this.last:1000/MAP_FPS;
      if(this.dirty||elapsed>=1000/MAP_FPS-1){this.time=advanceMapTime(this.time,elapsed,active);this.last=now;this.dirty=false;this.draw();}
      if(active&&!this.failed)this.schedule();
    });
  }
  dispose(){this.disposed=true;cancelAnimationFrame(this.frame);this.controller.abort();this.resizeObserver.disconnect();this.composition?.dispose();this.root.remove();this.cache.clear();}
}
