import {createWangTile as previous,boundaryAt} from './wang-v3.js';
import {DESIGNS,DESIGN_VARIANTS,designFor} from './tile-designs.js';
import {corners,MAP_SCALE} from './legacy-tiles.js';
export const clamp=x=>Math.max(0,Math.min(1,x));
export const smooth=x=>{x=clamp(x);return x*x*(3-2*x);};
export const rotate=(p,r)=>{const a=r*Math.PI/3,c=Math.cos(a),s=Math.sin(a);return [p[0]*c-p[1]*s,p[0]*s+p[1]*c];};
const cs=corners(),round=x=>Math.round(x*1e6)/1e6;
export const edgePoint=(i,t=.5)=>cs[i].map((v,j)=>v+(cs[(i+1)%6][j]-v)*t);
export const hexInset=(x,z)=>Math.sqrt(3)*150-Math.max(Math.abs(x),Math.abs(x)*.5+Math.abs(z)*Math.sqrt(3)/2);
export function segment(x,z,a,b){const dx=b[0]-a[0],dz=b[b.length-1]-a[a.length-1],t=clamp(((x-a[0])*dx+(z-a[a.length-1])*dz)/(dx*dx+dz*dz||1));return {d:Math.hypot(x-a[0]-t*dx,z-a[a.length-1]-t*dz),t};}
export const regionFloor=(tile,r)=>r.floorY??tile.slot.floorY;
export function createDesignTile(q,r,id,rotation=0,legacyEdges=[]){
 const d=DESIGNS.find(d=>d.id===id);if(!d)throw Error('Unknown tile design.');
 const inherited=previous(q,r,d.base,rotation,legacyEdges),edges=inherited.edges.map(e=>structuredClone(e));
 if(d.floating){
  for(let i=0;i<6;i++)if(!inherited.legacyEdges.includes(i))edges[i]={kind:'sea',start:'water',end:'water',samples:Array(25).fill(-40),waterY:0,ports:[]};
  // Measured native corners remain fixed, including the ends of a sea socket.
  for(const i of inherited.legacyEdges)for(const [neighbor,end,value]of [[(i+5)%6,24,edges[i].samples[0]],[(i+1)%6,0,edges[i].samples[24]]]){
   if(inherited.legacyEdges.includes(neighbor))continue;const e=edges[neighbor];for(let k=0;k<5;k++)e.samples[end===0?k:24-k]=round(-40+(value+40)*(1-k/5));e.samples[end]=value;e[end===0?'start':'end']=value>0?'land':'water';
  }
 }
 const floor=d.floor??24,regions=d.regions.map(([x,z,radius,y=floor])=>{const p=rotate([x,z],rotation);return {x:round(p[0]),z:round(p[1]),radius,floorY:y};});
 const origin={x:regions[0].x,y:regions[0].floorY,z:regions[0].z},radius=Math.max(...regions.map(r=>Math.hypot(r.x-origin.x,r.z-origin.z)+r.radius));
 return {...inherited,version:4,variant:id,recipe:{...DESIGN_VARIANTS.find(v=>v.id===id),kind:d.kind,floating:!!d.floating},
  slot:{origin,regions,radius:round(radius),height:480,floorY:floor,mapRadius:round(radius*MAP_SCALE),mapHeight:14.4},edges,boundaries:edges.map(e=>e.samples),
  connections:{path:d.floating?'deck-and-teleport':'connected',water:d.floating?'open-sea':d.rivers.length?'connected':d.wet.length?'sea':'enclosed',waterY:0},
  navigation:{minimumWidth:42,minimumDepth:10,minimumClearance:16,protectedBuildAreas:true},art:{kit:'host-designs-1',seed:DESIGNS.indexOf(d)+103}}
}
function curve(a,b,bend=0){const dx=b[0]-a[0],dz=b[1]-a[1],length=Math.hypot(dx,dz)||1;return Array.from({length:33},(_,i)=>{const t=i/32,k=Math.sin(t*Math.PI)*bend;return [a[0]+dx*t-dz/length*k,a[1]+dz*t+dx/length*k];});}
const plans=new WeakMap();
export function waterPlan(tile){
 let cached=plans.get(tile);if(cached)return cached;
 const d=designFor(tile),channels=[],edgeEnds=[];
 for(const i of d.rivers){const edge=(i+tile.rotation)%6,e=tile.edges[edge];let from=-1,best=null;
  for(let j=0;j<=25;j++){if(j<25&&e.samples[j]<-10){if(from<0)from=j;}else if(from>=0){const run={start:from/24,end:(j-1)/24};if(!best||run.end-run.start>best.end-best.start)best=run;from=-1;}}
  if(best&&best.end-best.start>.06)edgeEnds.push(edgePoint(edge,(best.start+best.end)/2));
 }
 if(edgeEnds.length===2)channels.push(curve(edgeEnds[0],edgeEnds[1],d.kind==='sakura'?18:d.kind==='canal'?0:35));
 else for(const end of edgeEnds)channels.push(curve(end,[0,0],d.kind==='wetland'?26:0));
 // Adapt actual native waterways into water-bearing designs. A dry design
 // does not invent a creek to pretend it meets a protected harbor exit.
 if((d.wet.length||d.rivers.length)&&!d.floating)for(const i of tile.legacyEdges){
  const e=tile.edges[i],spans=e.waterSpans||[];
  for(const s of spans.filter(s=>s.end-s.start>.12)){
   const start=edgePoint(i,(s.start+s.end)/2),inside=rotate(d.rivers.length?[0,0]:[160,45],tile.rotation);
   if(!edgeEnds.some(p=>Math.hypot(p[0]-start[0],p[1]-start[1])<35))channels.push(curve(start,inside,0));
  }
 }
 // Keep the water body outside the immutable build plots. This avoids
 // round, cliff-sided islands produced by flattening a plot across a creek.
 if(['wetland','sakura','canal'].includes(d.kind))for(const line of channels)for(let i=1;i<line.length-1;i++){
  let [x,z]=line[i];for(let pass=0;pass<5;pass++)for(const r of tile.slot.regions){const dx=x-r.x,dz=z-r.z,n=Math.hypot(dx,dz),safe=r.radius+(d.kind==='wetland'?37:31);if(n<safe){x=r.x+dx/(n||1)*safe;z=r.z+dz/(n||1)*safe;}}
  line[i]=[x,z];
 }
 cached={channels,design:d};plans.set(tile,cached);return cached;
}
export function waterDistance(tile,x,z){
 const {design:d,channels}=waterPlan(tile),[u,v]=rotate([x,z],-tile.rotation);
 if(d.floating)return -100;
 let signed=Infinity;
 const width=d.kind==='canal'?39:d.kind==='wetland'?31:37;
 for(const line of channels)for(let i=1;i<line.length;i++)signed=Math.min(signed,segment(x,z,line[i-1],line[i]).d-width);
 if(d.kind==='inlet')signed=Math.min(signed,Math.hypot((u-214)*.85,(v-40)*.92)-176);
 if(d.kind==='oasis')signed=Math.min(signed,Math.hypot((u-134)*.93,v-36)-59);
 if(['marina','docks'].includes(d.kind))signed=Math.min(signed,Math.max(49-u,Math.abs(v)-130));
 if(d.kind==='basalt'||d.kind==='terraces')signed=Math.min(signed,55-u*.77-v*.45);
 return signed;
}
export function rawHeight(tile,x,z){
 const d=designFor(tile),[u,v]=rotate([x,z],-tile.rotation),sd=waterDistance(tile,x,z);
 let h=d.floating?-240:24;
 if(!d.floating){
  const beach=d.kind==='canal'||d.kind==='docks'?12:d.kind==='basalt'?18:d.kind==='wetland'?34:44;
  h=-34+(34+(d.floor??24))*smooth((sd+12)/beach);
  if(sd>beach){
   const hill=['canal','docks','boulevard','marina','terraces'].includes(d.kind)?0:d.kind==='oasis'?8:d.kind==='alpine'?5:3;
   h+=hill*Math.sin(u*.015+.6)*Math.cos(v*.014-.9)*smooth((sd-beach)/30);
  }
  if(d.kind==='terraces')h=Math.min(h,24);
  for(const r of tile.slot.regions){const dist=Math.hypot(x-r.x,z-r.z);h+=(regionFloor(tile,r)-h)*(1-smooth((dist-r.radius)/19));}
 }
 const {nearest,best}=boundaryAt(tile,x,z);h+=(best-h)*(1-smooth(nearest/(d.floating?95:38)));
 return h;
}

const footprints=new WeakMap();
export function designFootprint(tile){
 if(footprints.has(tile))return footprints.get(tile);
 const d=designFor(tile),nodes=tile.edges.flatMap((e,i)=>e.ports.map(p=>({p:edgePoint(i,p.t),y:p.y}))),routes=[];
 if(d.floating){
  for(const n of nodes){const p=n.p,inner=p.map(v=>v*.77);routes.push([[...p.slice(0,1),n.y,p[1]],[inner[0],d.floor,inner[1]]]);}
 }else {
  for(const r of tile.slot.regions){const nearest=nodes.slice().sort((a,b)=>Math.hypot(a.p[0]-r.x,a.p[1]-r.z)-Math.hypot(b.p[0]-r.x,b.p[1]-r.z))[0];const dx=(nearest?.p[0]??0)-r.x||1,dz=(nearest?.p[1]??0)-r.z,n=Math.hypot(dx,dz);nodes.push({p:[r.x+dx/n*(r.radius+17),r.z+dz/n*(r.radius+17)],y:regionFloor(tile,r)});}
  let crossing=-1;
  if(['sakura','canal'].includes(d.kind)&&waterPlan(tile).channels.length){crossing=nodes.length;for(const z of [-88,88])nodes.push({p:rotate([118,z],tile.rotation),y:24});}
  const joined=new Set(nodes.length?[0]:[]);
  while(joined.size<nodes.length){let best;
   for(const a of joined)for(let b=0;b<nodes.length;b++)if(!joined.has(b)){
    let distance=Math.hypot(nodes[a].p[0]-nodes[b].p[0],nodes[a].p[1]-nodes[b].p[1]);
    if(crossing>=0&&!(Math.min(a,b)===crossing&&Math.max(a,b)===crossing+1)&&Array.from({length:9},(_,i)=>{const t=(i+1)/10;return waterDistance(tile,nodes[a].p[0]*(1-t)+nodes[b].p[0]*t,nodes[a].p[1]*(1-t)+nodes[b].p[1]*t)<0;}).some(Boolean))distance+=2000;
    if(!best||distance<best.distance)best={a,b,distance};
   }
   if(!best)break;joined.add(best.b);const a=nodes[best.a],b=nodes[best.b];
   const line=curve(a.p,b.p,8).map((p,i)=>{
    let [x,z]=p;
    for(let pass=0;pass<4;pass++)for(const r of tile.slot.regions){const dx=x-r.x,dz=z-r.z,n=Math.hypot(dx,dz);if(n<r.radius+17){x=r.x+dx/(n||1)*(r.radius+17);z=r.z+dz/(n||1)*(r.radius+17);}}
    const t=i/32,land=rawHeight(tile,x,z),y=land>8?land:a.y*(1-t)+b.y*t;
    return [x,i===0?a.y:i===32?b.y:Math.max(land>8?(d.floor??24):24,y),z];
   });routes.push(line);
  }
 }
 const result={channels:waterPlan(tile).channels,routes};footprints.set(tile,result);return result;
}
export function designHeight(tile,x,z,{paths=true}={}){
 let height=rawHeight(tile,x,z);if(!paths||designFor(tile).floating||height<8)return height;
 for(const route of designFootprint(tile).routes)for(let i=1;i<route.length;i++){
  const a=route[i-1],b=route[i],{d,t}=segment(x,z,a,b);if(d>22)continue;
  const y=a[1]+(b[1]-a[1])*t; height+=(y-height)*(1-smooth((d-12)/10))*smooth(hexInset(x,z)/8);
 }
 return height;
}
