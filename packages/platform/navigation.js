import {DIRECTIONS,centre,corners} from './legacy-tiles.js';
import {BUILTIN_TILES} from './builtin-tiles.js';
import {hostHeight as legacyHeight} from './wang-v3.js';
import {rawHeight,rotate,hexInset} from './wang-v4.js';
import {designFor} from './tile-designs.js';
import {protectedWaterTiles,waterProtectionAt,protectedWaterIssue} from './tile-requirements.js';
// The native lobster boat faces +Z at local X=5.5*0.4806299 map metres.
// Its approach crosses Tidewater's south-east edge at t=.6608476. This
// registry policy is separate from the already published native contract.
export const PROTECTED_WATER_ACCESS=Object.freeze({id:'tidewater-harbor',source:{q:1,r:0},edge:1,t:.660848,width:42,depth:10,clearance:16});
const cs=corners(),N=61,STEP=10,cache=new Map(),key=t=>`${t.q},${t.r}`;
const actual=rows=>rows.map(t=>t.contract?(typeof t.contract==='string'?JSON.parse(t.contract):t.contract):t);
const edgePoint=(i,t)=>cs[i].map((v,j)=>v+(cs[(i+1)%6][j]-v)*t);
function obstruction(tile,x,z){
 if(tile.version<4)return false;const d=designFor(tile),[u,v]=rotate([x,z],-tile.rotation),pad=PROTECTED_WATER_ACCESS.width/2;
 const box=(x,z,w,h)=>Math.abs(u-x)<w/2+pad&&Math.abs(v-z)<h/2+pad;
 if(d.kind==='canal'&&[-48,48].some(z=>box(0,z,422,9)))return true;
 if(['marina','docks'].includes(d.kind)){
  if(box(45,0,10,266)||[-128,128].some(z=>box(142,z,197,9)))return true;
  if(d.kind==='marina'&&(box(111,-38,140,17)||box(110,16,15,113)||box(173,8,15,98)||box(163,115,165,38)||box(136,27,18,46)))return true;
  if(d.kind==='docks'&&(box(185,115,34,32)||box(133,19,18,46)))return true;
 }
 // The lowest rings of the lower Sky terrace enter the clearance envelope.
 if(d.kind==='sky'&&[[-59,169],[165,120]].some(([x,z])=>Math.hypot(u-x,v-z)<45))return true;
 return false;
}
/** Conservative, width-eroded water components. A shoreline sliver or an
 * isolated pond cannot masquerade as a navigable route across a host. */
export function navigationGraph(tile){
 const signature=JSON.stringify([tile.version,tile.q,tile.r,tile.variant,tile.rotation,tile.legacyEdges]);if(cache.has(signature))return cache.get(signature);
 const empty={ports:[],componentAt:()=>0};
 if(tile.version>=4){const d=designFor(tile);if(!d.floating&&!d.wet.length&&!d.rivers.length){cache.set(signature,empty);return empty;}}
 const bed=new Float32Array(N*N),clear=new Uint8Array(N*N),labels=new Uint16Array(N*N),height=(x,z)=>tile.version>=4?rawHeight(tile,x,z):legacyHeight(tile,x,z,{paths:false});
 for(let j=0;j<N;j++)for(let i=0;i<N;i++){
  let x=i*STEP-300,z=j*STEP-300,inset=hexInset(x,z);
  if(inset<0){const f=259.807621/(259.807621-inset);x*=f;z*=f;}
  bed[j*N+i]=height(x,z);
 }
 const sample=(x,z)=>{const gx=(x+300)/STEP,gz=(z+300)/STEP,i=Math.max(0,Math.min(N-2,Math.floor(gx))),j=Math.max(0,Math.min(N-2,Math.floor(gz))),u=Math.max(0,Math.min(1,gx-i)),v=Math.max(0,Math.min(1,gz-j));return bed[j*N+i]*(1-u)*(1-v)+bed[j*N+i+1]*u*(1-v)+bed[(j+1)*N+i]*(1-u)*v+bed[(j+1)*N+i+1]*u*v;};
 const offsets=Array.from({length:16},(_,i)=>[Math.cos(i*Math.PI/8)*23,Math.sin(i*Math.PI/8)*23]);
 for(let j=0;j<N;j++)for(let i=0;i<N;i++){const x=i*STEP-300,z=j*STEP-300;if(hexInset(x,z)<-2||bed[j*N+i]>-10||obstruction(tile,x,z))continue;clear[j*N+i]=Number(offsets.every(([dx,dz])=>sample(x+dx,z+dz)<=-10));}
 let component=0;
 for(let start=0;start<clear.length;start++)if(clear[start]&&!labels[start]){component++;const queue=[start];labels[start]=component;for(let n=0;n<queue.length;n++){const index=queue[n],i=index%N,j=Math.floor(index/N);for(const next of [i?index-1:-1,i<N-1?index+1:-1,j?index-N:-1,j<N-1?index+N:-1])if(next>=0&&clear[next]&&!labels[next]){labels[next]=component;queue.push(next);}}}
 const componentAt=(x,z)=>{const i=Math.round((x+300)/STEP),j=Math.round((z+300)/STEP);let best=0,distance=Infinity;for(let dj=-1;dj<=1;dj++)for(let di=-1;di<=1;di++){const u=i+di,v=j+dj;if(u<0||u>=N||v<0||v>=N)continue;const label=labels[v*N+u],d=Math.hypot(u*STEP-300-x,v*STEP-300-z);if(label&&d<16&&d<distance){best=label;distance=d;}}return best;};
 const ports=[];for(let edge=0;edge<6;edge++)for(let i=2;i<39;i++){const t=i/40,p=edgePoint(edge,t),component=componentAt(...p);if(component)ports.push({edge,t,component});}
 const result={ports,componentAt};if(cache.size>600)cache.clear();cache.set(signature,result);return result;
}
/** Flood-fill the unoccupied sea from outside the finite occupied bounds.
 * Empty holes surrounded by land are not classified as exterior ocean. */
export function exteriorOcean(tiles){
 const occupied=new Set(tiles.map(key)),qs=tiles.map(t=>t.q),rs=tiles.map(t=>t.r),minQ=Math.min(...qs)-1,maxQ=Math.max(...qs)+1,minR=Math.min(...rs)-1,maxR=Math.max(...rs)+1,sea=new Set(),queue=[];
 const add=(q,r)=>{const k=key({q,r});if(!occupied.has(k)&&!sea.has(k)){sea.add(k);queue.push({q,r});}};
 for(let q=minQ;q<=maxQ;q++){add(q,minR);add(q,maxR);}for(let r=minR;r<=maxR;r++){add(minQ,r);add(maxQ,r);}
 for(let i=0;i<queue.length;i++)for(const [dq,dr]of DIRECTIONS){const q=queue[i].q+dq,r=queue[i].r+dr;if(q>=minQ&&q<=maxQ&&r>=minR&&r<=maxR)add(q,r);}
 return sea;
}
export function navigationIssue(candidate,rows=[]){
 const protectedIssue=protectedWaterIssue(candidate);if(protectedIssue)return protectedIssue;
 const tiles=[...BUILTIN_TILES,...actual(rows).filter(t=>key(t)!==key(candidate)&&!waterProtectionAt(t.q,t.r)),candidate],byKey=new Map(tiles.map(t=>[key(t),t])),sea=exteriorOcean(tiles);
 // Whale habitat needs an unoccupied connection to exterior sea. A narrow
 // canal, floating deck or buildable water tile cannot replace that space.
 for(const tile of protectedWaterTiles())if(tile.protection.oceanConnected&&!sea.has(key(tile)))return `Keep ${tile.protection.source.title}’s whale connected to the open ocean. This placement encloses its protected water.`;
 const port=PROTECTED_WATER_ACCESS,[dq,dr]=DIRECTIONS[port.edge],start={q:port.source.q+dq,r:port.source.r+dr,edge:(port.edge+3)%6,t:1-port.t},queue=[start],seen=new Set();
 for(let i=0;i<queue.length;i++){
  const node=queue[i],k=key(node);if(k===key(port.source))continue;if(sea.has(k))return null;
  const tile=byKey.get(k);
  if(!tile){if(seen.has(k))continue;seen.add(k);for(const [edge,[dq,dr]]of DIRECTIONS.entries())for(const t of [.2,.35,.5,.65,.8])queue.push({q:node.q+dq,r:node.r+dr,edge:(edge+3)%6,t});continue;}
  const graph=navigationGraph(tile),component=graph.componentAt(...edgePoint(node.edge,node.t)),visited=k+':'+component;if(!component||seen.has(visited))continue;seen.add(visited);
  for(const exit of graph.ports)if(exit.component===component){const [dq,dr]=DIRECTIONS[exit.edge];queue.push({q:node.q+dq,r:node.r+dr,edge:(exit.edge+3)%6,t:1-exit.t});}
 }
 return 'Keep Tidewater’s harbor connected to the open ocean. This placement blocks its navigable water route.';
}
