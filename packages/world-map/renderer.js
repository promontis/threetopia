import * as THREE from 'three';
import { availableSlots, hexCenter, hexCorners, validateMap } from './index.js';

const icons={village:'⌂',nature:'♣',harbour:'⚓',bridge:'↔',city:'▥',spawn:'✦'};
/** A single, on-demand renderer. The same canvas moves between minimap and atlas. */
export class AtlasRenderer {
  constructor(host,registry,{onSelect=()=>{},onStats=()=>{},onError=()=>{}}={}) {
    this.registry=registry;this.onSelect=onSelect;this.onStats=onStats;this.onError=onError;
    this.scene=new THREE.Scene();this.scene.background=new THREE.Color('#8bb7bc');
    this.camera=new THREE.OrthographicCamera();this.camera.near=1;this.camera.far=16000;
    this.renderer=new THREE.WebGLRenderer({antialias:true,alpha:false,powerPreference:'low-power'});
    this.renderer.setPixelRatio(Math.min(devicePixelRatio,1.5));this.renderer.outputColorSpace=THREE.SRGBColorSpace;
    this.renderer.setClearColor('#8bb7bc');this.renderer.domElement.setAttribute('aria-label','Interactive relief map of Threetopia');
    this.renderer.domElement.tabIndex=0;
    this.scene.add(new THREE.HemisphereLight('#fff4d5','#597d82',2.2));
    const sun=new THREE.DirectionalLight('#fff7da',2.6);sun.position.set(-800,1800,600);this.scene.add(sun);
    this.ocean=new THREE.Mesh(new THREE.PlaneGeometry(40000,40000),new THREE.MeshBasicMaterial({color:'#8bb7bc'}));this.ocean.rotation.x=-Math.PI/2;this.ocean.position.y=-.6;this.scene.add(this.ocean);
    this.root=new THREE.Group();this.scene.add(this.root);
    this.slots=availableSlots(registry.tiles);this.cache=new Map();this.pending=new Set();this.failed=new Set();this.labels=[];
    this.center={x:40,z:30};this.span=2450;this.mode='overview';this.relief=true;this.boundaries=false;this.creators=false;this.player=null;this.selected=null;this.frame=0;this.disposed=false;this.controller=new AbortController();
    this.layer=document.createElement('div');this.layer.className='atlas-labels';
    this.selection=new THREE.Group();this.root.add(this.selection);
    this.grid=new THREE.Group();this.root.add(this.grid);
    const lineMaterial=new THREE.LineBasicMaterial({color:'#f5efd6',transparent:true,opacity:.26,depthTest:false});
    for(const tile of registry.tiles){const c=hexCenter(tile.q,tile.r);this.addLabel(tile.short,c.x,100,c.z-60,'world',()=>this.select({kind:'world',tile}),tile.id);
      const pts=hexCorners(tile.q,tile.r).map(([x,z])=>new THREE.Vector3(x,.8,z));pts.push(pts[0]);const line=new THREE.Line(new THREE.BufferGeometry().setFromPoints(pts),lineMaterial);line.renderOrder=20;this.grid.add(line);
    }
    this.frontier=new THREE.Group();this.root.add(this.frontier);
    for(const slot of this.slots){const c=hexCenter(slot.q,slot.r),pts=hexCorners(slot.q,slot.r).map(([x,z])=>new THREE.Vector3(x,1,z));pts.push(pts[0]);
      const line=new THREE.Line(new THREE.BufferGeometry().setFromPoints(pts),new THREE.LineDashedMaterial({color:'#e7f0dc',dashSize:16,gapSize:14,transparent:true,opacity:.55}));line.computeLineDistances();this.frontier.add(line);
      this.addLabel('+',c.x,3,c.z,'slot',()=>this.select({kind:'slot',slot}),`${slot.q},${slot.r}`);
    }
    this.playerLabel=this.addLabel('',0,10,0,'player',()=>{},'player');this.playerLabel.el.innerHTML='<i>↑</i>';
    this.raycaster=new THREE.Raycaster();this.plane=new THREE.Plane(new THREE.Vector3(0,1,0),0);
    this.resizeObserver=new ResizeObserver(()=>this.invalidate());
    this.mount(host);
    const signal=this.controller.signal,canvas=this.renderer.domElement;this.pointers=new Map();
    canvas.addEventListener('wheel',e=>{if(this.mode==='mini')return;e.preventDefault();this.zoom(Math.exp(Math.max(-.35,Math.min(.35,e.deltaY*.0012))),e.clientX,e.clientY);},{passive:false,signal});
    canvas.addEventListener('pointerdown',e=>{if(this.mode==='mini')return;canvas.setPointerCapture(e.pointerId);this.pointers.set(e.pointerId,{x:e.clientX,y:e.clientY});this.dragged=false;},{signal});
    canvas.addEventListener('pointermove',e=>{
      if(!this.pointers.has(e.pointerId))return;const before=[...this.pointers.values()],old=this.pointers.get(e.pointerId);this.pointers.set(e.pointerId,{x:e.clientX,y:e.clientY});const after=[...this.pointers.values()];
      if(before.length===2){const a=Math.hypot(before[0].x-before[1].x,before[0].y-before[1].y),b=Math.hypot(after[0].x-after[1].x,after[0].y-after[1].y);if(a&&b)this.zoom(a/b);}
      else{const a=this.groundAt(old.x,old.y),b=this.groundAt(e.clientX,e.clientY);if(a&&b){this.center.x+=a.x-b.x;this.center.z+=a.z-b.z;this.constrain();this.invalidate();}}
      this.dragged=true;
    },{signal});
    const end=e=>this.pointers.delete(e.pointerId);canvas.addEventListener('pointerup',end,{signal});canvas.addEventListener('pointercancel',end,{signal});
    canvas.addEventListener('keydown',e=>{if(this.mode==='mini')return;const keys=['ArrowLeft','ArrowRight','ArrowUp','ArrowDown','+','=','-','0'];if(!keys.includes(e.key))return;e.preventDefault();
      if(e.key==='+'||e.key==='=')this.zoom(.75);else if(e.key==='-')this.zoom(1.35);else if(e.key==='0')this.fit();else{this.center.x+=(e.key==='ArrowRight'?1:e.key==='ArrowLeft'?-1:0)*this.span*.08;this.center.z+=(e.key==='ArrowDown'?1:e.key==='ArrowUp'?-1:0)*this.span*.08;this.constrain();this.invalidate();}
    },{signal});
    canvas.addEventListener('webglcontextlost',e=>{e.preventDefault();this.onError(new Error('The map renderer paused. Reload to restore the map.'));},{signal});
  }
  addLabel(text,x,y,z,kind,click,id){
    const el=document.createElement(kind==='player'?'span':'button');el.className=`atlas-marker atlas-marker--${kind}`;el.textContent=text;
    if(kind!=='player'){el.type='button';el.addEventListener('click',e=>{e.stopPropagation();click();});}
    el.setAttribute('aria-label',kind==='slot'?`Plan a world at tile ${id}`:kind==='player'?'Your position':text);el.dataset.mapMarker=id;this.layer.append(el);
    const label={el,x,y,z,kind,id};this.labels.push(label);return label;
  }
  mount(host){this.resizeObserver?.disconnect();this.host=host;host.append(this.renderer.domElement,this.layer);this.resizeObserver?.observe(host);this.invalidate();}
  setMode(mode){this.mode=mode;if(mode==='mini'){this.span=1250;this.creators=false;this.boundaries=false;}else this.fit();this.invalidate();}
  setOptions({relief=this.relief,boundaries=this.boundaries,creators=this.creators}){this.relief=relief;this.boundaries=boundaries;this.creators=creators;this.invalidate();}
  fit(){const points=this.registry.tiles.map(t=>hexCenter(t.q,t.r));if(this.creators)points.push(...this.slots.map(t=>hexCenter(t.q,t.r)));const xs=points.map(p=>p.x),zs=points.map(p=>p.z);this.center={x:(Math.min(...xs)+Math.max(...xs))/2,z:(Math.min(...zs)+Math.max(...zs))/2};const aspect=Math.max(1,this.host.clientWidth/Math.max(1,this.host.clientHeight));this.span=Math.max(Math.max(...xs)-Math.min(...xs)+1050,(Math.max(...zs)-Math.min(...zs)+1100)*(this.relief?.8:1)*aspect);this.invalidate();}
  focus(x,z,span=1100){this.center={x,z};this.span=span;this.constrain();this.invalidate();}
  constrain(){this.span=Math.max(280,Math.min(14000,this.span));this.center.x=Math.max(-10000,Math.min(10000,this.center.x));this.center.z=Math.max(-10000,Math.min(10000,this.center.z));}
  groundAt(x,y){const r=this.renderer.domElement.getBoundingClientRect();this.raycaster.setFromCamera(new THREE.Vector2((x-r.left)/r.width*2-1,-(y-r.top)/r.height*2+1),this.camera);return this.raycaster.ray.intersectPlane(this.plane,new THREE.Vector3());}
  zoom(factor,x,y){const before=x===undefined?null:this.groundAt(x,y);this.span*=factor;this.constrain();this.configureCamera();const after=x===undefined?null:this.groundAt(x,y);if(before&&after){this.center.x+=before.x-after.x;this.center.z+=before.z-after.z;}this.invalidate();}
  updatePlayer(x,z,yaw){if(this.player&&Math.hypot(x-this.player.x,z-this.player.z)<.4&&Math.abs(yaw-this.player.yaw)<.03)return;this.player={x,z,yaw};if(this.mode==='mini')this.center={x,z};this.invalidate();}
  select(item){this.selected=item;this.selection.clear();const t=item.tile??item.slot,c=hexCenter(t.q,t.r);const pts=hexCorners(t.q,t.r).map(([x,z])=>new THREE.Vector3(x,2,z));pts.push(pts[0]);
    if(this.selectedLine){this.selectedLine.geometry.dispose();this.selectedLine.material.dispose();}
    this.selectedLine=new THREE.Line(new THREE.BufferGeometry().setFromPoints(pts),new THREE.LineBasicMaterial({color:'#fff4ca',depthTest:false}));this.selectedLine.renderOrder=30;this.selection.add(this.selectedLine);this.onSelect(item);this.invalidate();}
  configureCamera(){const w=Math.max(1,this.host.clientWidth),h=Math.max(1,this.host.clientHeight),aspect=w/h,extent=this.span/Math.max(1,aspect);this.camera.left=-extent*aspect/2;this.camera.right=extent*aspect/2;this.camera.top=extent/2;this.camera.bottom=-extent/2;
    const tilted=this.mode!=='mini'&&this.relief;this.camera.position.set(this.center.x,this.center.y??4000,this.center.z+(tilted?3000:0));this.camera.up.set(0,tilted?1:0,tilted?0:-1);this.camera.lookAt(this.center.x,0,this.center.z);this.camera.updateProjectionMatrix();this.camera.updateMatrixWorld();
  }
  invalidate(){if(this.disposed||this.frame)return;this.frame=requestAnimationFrame(()=>{this.frame=0;this.draw();});}
  async load(tile){
    if(this.pending.has(tile.id)||this.failed.has(tile.id)||this.disposed)return;this.pending.add(tile.id);
    try{const response=await fetch(tile.map,{signal:this.controller.signal});if(!response.ok)throw new Error(`${tile.short}: map unavailable (${response.status})`);const data=await response.json(),errors=validateMap(data);if(errors.length)throw new Error(`${tile.short}: ${errors[0]}`);if(this.disposed)return;
      const group=this.buildTile(tile,data);this.cache.set(tile.id,{group,last:performance.now()});this.root.add(group);this.invalidate();
    }catch(error){if(!this.disposed){this.failed.add(tile.id);this.onError(error);}}finally{this.pending.delete(tile.id);}
  }
  buildTile(tile,map){
    const group=new THREE.Group(),center=hexCenter(tile.q,tile.r);group.position.set(center.x,0,center.z);group.scale.y=1.6;
    const terrain=m=>{const g=new THREE.BufferGeometry();g.setAttribute('position',new THREE.Float32BufferAttribute(m.positions,3));g.setAttribute('color',new THREE.Float32BufferAttribute(m.colors,3));g.setIndex(m.indices);g.computeVertexNormals();return new THREE.Mesh(g,new THREE.MeshStandardMaterial({vertexColors:true,roughness:1,flatShading:true}));};
    group.fine=terrain(map.terrain);group.coarse=terrain(map.distant);group.add(group.fine,group.coarse);
    group.detail=new THREE.Group();group.add(group.detail);
    const geometries={tree:new THREE.IcosahedronGeometry(.5,0),pine:new THREE.ConeGeometry(.5,1,6),house:new THREE.BoxGeometry(1,1,1),tower:new THREE.BoxGeometry(1,1,1),rock:new THREE.DodecahedronGeometry(.5,0),bridge:new THREE.BoxGeometry(1,1,1)};
    const matrix=new THREE.Matrix4(),quaternion=new THREE.Quaternion(),up=new THREE.Vector3(0,1,0),position=new THREE.Vector3(),scale=new THREE.Vector3(),tint=new THREE.Color();
    for(const kind of Object.keys(geometries)){
      const props=map.props.filter(p=>p.kind===kind);if(!props.length){geometries[kind].dispose();continue;}
      const mesh=new THREE.InstancedMesh(geometries[kind],new THREE.MeshStandardMaterial({roughness:1,flatShading:true}),props.length);
      props.forEach((p,i)=>{position.fromArray(p.position);scale.fromArray(p.scale);position.y+=p.scale[1]/2;quaternion.setFromAxisAngle(up,p.rotation??0);matrix.compose(position,quaternion,scale);mesh.setMatrixAt(i,matrix);mesh.setColorAt(i,tint.set(p.color));});mesh.computeBoundingSphere();group.detail.add(mesh);
      if(kind==='house'){
        const roof=new THREE.InstancedMesh(new THREE.ConeGeometry(.8,.6,4),new THREE.MeshStandardMaterial({color:'#9d6651',roughness:1,flatShading:true}),props.length);
        props.forEach((p,i)=>{position.fromArray(p.position);position.y+=p.scale[1]+p.scale[0]*.22;scale.set(p.scale[0],p.scale[0],p.scale[2]);quaternion.setFromAxisAngle(up,(p.rotation??0)+Math.PI/4);matrix.compose(position,quaternion,scale);roof.setMatrixAt(i,matrix);});roof.computeBoundingSphere();group.detail.add(roof);
      }
    }
    for(const path of map.paths){
      const pts=path.points.map(p=>new THREE.Vector3(p[0],Math.max(1,p[1])+1.4,p[2]));
      const ribbon=[];for(let i=1;i<pts.length;i++){const a=pts[i-1],b=pts[i],length=Math.hypot(b.x-a.x,b.z-a.z)||1,nx=-(b.z-a.z)/length*path.width,nz=(b.x-a.x)/length*path.width;ribbon.push(a.x+nx,a.y,a.z+nz,a.x-nx,a.y,a.z-nz,b.x+nx,b.y,b.z+nz,a.x-nx,a.y,a.z-nz,b.x-nx,b.y,b.z-nz,b.x+nx,b.y,b.z+nz);}
      const geometry=new THREE.BufferGeometry();geometry.setAttribute('position',new THREE.Float32BufferAttribute(ribbon,3));geometry.computeVertexNormals();group.add(new THREE.Mesh(geometry,new THREE.MeshBasicMaterial({color:path.color,side:THREE.DoubleSide})));
    }
    for(const p of map.landmarks)this.addLabel(`${icons[p.kind]} ${p.label}`,p.position[0]+center.x,p.position[1]+20,p.position[2]+center.z,'poi',()=>this.onSelect({kind:'landmark',tile,landmark:p}),tile.id+':'+p.id);
    return group;
  }
  draw(){
    if(this.disposed||!this.host.isConnected||!this.host.clientWidth||!this.host.clientHeight)return;
    const started=performance.now(),w=this.host.clientWidth,h=this.host.clientHeight;this.renderer.setSize(w,h,false);this.configureCamera();
    this.grid.visible=this.mode!=='mini';this.grid.children.forEach(l=>{l.material.opacity=this.boundaries?.68:.13;});this.frontier.visible=this.creators&&this.mode!=='mini';this.selection.visible=this.mode!=='mini';
    const visible=this.registry.tiles.filter(t=>{const c=hexCenter(t.q,t.r);return Math.hypot(c.x-this.center.x,c.z-this.center.z)<this.span*.85+800;}).sort((a,b)=>{const x=hexCenter(a.q,a.r),y=hexCenter(b.q,b.r);return Math.hypot(x.x-this.center.x,x.z-this.center.z)-Math.hypot(y.x-this.center.x,y.z-this.center.z);}).slice(0,24),shown=new Set(visible.map(t=>t.id));
    for(const tile of visible)if(!this.cache.has(tile.id))void this.load(tile);
    for(const [id,item] of this.cache){item.group.visible=shown.has(id);if(item.group.visible)item.last=performance.now();item.group.fine.visible=this.span<4000;item.group.coarse.visible=this.span>=4000;item.group.detail.visible=this.span<4200;}
    // Keep only a bounded number of decoded maps; distant worlds remain discoverable by name.
    if(this.cache.size>24)for(const [id,item] of [...this.cache].sort((a,b)=>a[1].last-b[1].last)){if(this.cache.size<=24)break;if(shown.has(id))continue;this.release(item.group);this.root.remove(item.group);this.cache.delete(id);this.labels=this.labels.filter(l=>{if(l.kind==='poi'&&l.id.startsWith(id+':')){l.el.remove();return false;}return true;});}
    const projected=[];for(const label of this.labels){
      if(label.kind==='player'){label.el.hidden=!this.player;if(!this.player)continue;label.x=this.player.x;label.z=this.player.z;label.el.firstElementChild.style.transform=`rotate(${this.player.yaw}rad)`;}
      if(label.kind==='slot'&&!this.creators||label.kind==='poi'&&(this.span>2000||this.mode==='mini')){label.el.hidden=true;continue;}
      const p=new THREE.Vector3(label.x,label.y,label.z).project(this.camera),x=(p.x*.5+.5)*w,y=(-p.y*.5+.5)*h,mini=this.mode==='mini';
      label.el.hidden=x<-20||x>w+20||y<-20||y>h+20;if(label.el.hidden)continue;
      const width=label.kind==='world'?100:label.kind==='poi'?120:35;
      if(label.kind==='poi'&&projected.some(q=>Math.abs(q.x-x)<width&&Math.abs(q.y-y)<26)){label.el.hidden=true;continue;}
      projected.push({x,y});label.el.style.transform=`translate(${x}px,${y}px) translate(-50%, -50%)`;label.el.classList.toggle('is-mini',mini);label.el.tabIndex=mini?-1:0;
    }
    this.renderer.render(this.scene,this.camera);
    const stats={triangles:this.renderer.info.render.triangles,drawCalls:this.renderer.info.render.calls,loadedTiles:this.cache.size,span:Math.round(this.span),lod:this.span>=4000?'distant':'detail',renderMs:+(performance.now()-started).toFixed(1)};
    this.host.dataset.mapStats=JSON.stringify(stats);this.onStats(stats);
  }
  release(group){group.traverse(o=>{o.geometry?.dispose();if(o.material)(Array.isArray(o.material)?o.material:[o.material]).forEach(m=>m.dispose());});}
  dispose(){this.disposed=true;cancelAnimationFrame(this.frame);this.controller.abort();this.resizeObserver.disconnect();this.release(this.scene);this.renderer.dispose();this.renderer.domElement.remove();this.layer.remove();}
}
