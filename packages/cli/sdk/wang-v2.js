import {TILE_RADIUS,MAP_SCALE,DIRECTIONS,ORIGINAL_TILES,centre,corners,ring,canonicalTile as legacyTile,terrainHeight as legacyHeight} from './legacy-tiles.js';
export const STYLES={
  dunes:{title:'Dunes',land:'#c9ad78',sand:'#ebd49f',rock:'#a39176',path:'#e9dac0'},
  oasis:{title:'Oasis',land:'#9aa778',sand:'#dccb99',rock:'#9a9c83',path:'#e3cf9d'},
  coast:{title:'Coast',land:'#9ba884',sand:'#e1d0ab',rock:'#87928d',path:'#e8d9b8'},
  pine:{title:'Pine',land:'#648674',sand:'#c9c5a7',rock:'#7f9390',path:'#d0c6a4'},
  meadow:{title:'Meadow',land:'#92aa7d',sand:'#d8cbaa',rock:'#909b89',path:'#e0ccaa'},
  highland:{title:'Highland',land:'#899783',sand:'#c6c2ac',rock:'#899394',path:'#d0c6b1'},
  volcanic:{title:'Volcanic',land:'#59666a',sand:'#87887b',rock:'#657074',path:'#b0a68e'},
  canyon:{title:'Canyon',land:'#ba8d70',sand:'#d6b18a',rock:'#a57d69',path:'#e0be92'},
  tundra:{title:'Tundra',land:'#b4c7be',sand:'#cbd0bf',rock:'#8d9fa0',path:'#e1deca'},
  blossom:{title:'Blossom',land:'#96ab8b',sand:'#d4c9b2',rock:'#8c9d93',path:'#d9c0ae'},
  wetland:{title:'Wetland',land:'#7a9b86',sand:'#b9b79a',rock:'#7e9690',path:'#cec7aa'},
  basalt:{title:'Basalt',land:'#718784',sand:'#aaa996',rock:'#667d83',path:'#c4bdad'},
  urban:{title:'Urban',land:'#8d9995',sand:'#bdbaa8',rock:'#75848a',path:'#cdd0c4'},
  industrial:{title:'Industrial',land:'#727e80',sand:'#aeb09f',rock:'#536971',path:'#bac3bc'},
  scifi:{title:'Sci-fi',land:'#334c59',sand:'#829b9d',rock:'#253f4d',path:'#91aeb4'},
};
// Edge 0 points east; corners and edges run clockwise from north-east.
export const LAYOUTS=[
  {id:'commons',title:'Open commons',description:'A connected path around one generous building green.',wet:[],rivers:[],regions:[[0,0,140]],styles:['meadow','pine','blossom','tundra']},
  {id:'pass',title:'Mountain pass',description:'A sheltered building terrace between two rocky ridges.',wet:[],rivers:[],regions:[[0,0,105]],styles:['highland','canyon','volcanic','basalt']},
  {id:'oasis',title:'Oasis basin',description:'A crescent pool with a dry terrace along its western bank.',wet:[],rivers:[],regions:[[-55,0,108]],styles:['dunes','oasis']},
  {id:'river',title:'River crossing',description:'A broad river, two building banks and connected footbridges.',wet:[],rivers:[0,3],regions:[[0,-116,62],[0,116,62]],styles:['meadow','blossom','pine']},
  {id:'bend',title:'River bend',description:'A curved channel around a sheltered inner-bank building area.',wet:[],rivers:[0,2],regions:[[-55,-73,88]],styles:['blossom','wetland','oasis']},
  {id:'fork',title:'River confluence',description:'Three channels meet between three small building terraces.',wet:[],rivers:[0,2,4],regions:[[62,-107,48],[62,107,48],[-124,0,48]],styles:['wetland','pine','tundra']},
  {id:'estuary',title:'River mouth',description:'An inland river opens into the sea between two banks.',wet:[0,1],rivers:[3],regions:[[-25,-126,55],[-25,126,55]],styles:['coast','wetland','basalt']},
  {id:'headland',title:'Headland',description:'A broad headland with beaches on two sea-facing sides.',wet:[0,1,2],rivers:[],regions:[[-60,-35,112]],styles:['coast','pine','volcanic']},
  {id:'bay',title:'Sheltered bay',description:'A curved sandy inlet beside a compact building terrace.',wet:[0,1],rivers:[],regions:[[-76,0,98]],styles:['coast','dunes','oasis']},
  {id:'harbor',title:'Harbor basin',description:'A sheltered water basin framed by stone quays and a promenade.',wet:[0,1],rivers:[],regions:[[-85,0,90]],styles:['urban','industrial','basalt']},
  {id:'canal',title:'Canal quarter',description:'A straight canal, paved banks and two bridge-connected plots.',wet:[],rivers:[0,3],regions:[[0,-118,60],[0,118,60]],styles:['urban','industrial','scifi']},
  {id:'skyport',title:'Floating platform',description:'A suspended deck with approach bridges and cyan support rings.',wet:[],rivers:[],regions:[[0,0,120]],styles:['scifi','industrial']},
];
export const WANG_VARIANTS=LAYOUTS.flatMap(l=>l.styles.map(family=>({id:`${l.id}-${family}`,layout:l.id,family,title:l.title,color:STYLES[family].land,description:l.description,orientation:0})));
const cs=corners(),clamp=x=>Math.max(0,Math.min(1,x)),smooth=x=>{x=clamp(x);return x*x*(3-2*x);};
const rotate=(p,r)=>{const a=r*Math.PI/3,c=Math.cos(a),s=Math.sin(a);return [p[0]*c-p[1]*s,p[0]*s+p[1]*c];};
const edgePoint=(i,t=.5)=>cs[i].map((x,j)=>x+(cs[(i+1)%6][j]-x)*t);
const key=t=>`${t.q},${t.r}`,round=n=>Math.round(n*1e6)/1e6;
function socket(start,end,river){
  const kind=start!==end?'shore':start==='water'?'sea':river?'river':'land';
  const samples=Array.from({length:25},(_,i)=>{
    const t=i/24;if(kind==='land')return 24;if(kind==='sea')return -40;
    if(kind==='river')return round(24-56*(1-smooth((Math.abs(t-.5)*300-33)/26)));
    const land=start==='land'?t:1-t;return round(24-64*smooth((land-.28)/.44));
  });
  return {kind,start,end,samples,waterY:0,ports:kind==='land'?[{kind:'path',t:.5,width:22,y:24}]:kind==='shore'?[{kind:'path',t:start==='land'?.18:.82,width:22,y:24}]:[],...(kind==='river'?{channel:{t:.5,width:66,bedY:-32}}:{})};
}
const cornerCache=new Map();
function originalCorners(q,r){
  const k=key({q,r});if(cornerCache.has(k))return cornerCache.get(k);
  const c=centre(q,r),heights=cs.map(p=>{
    for(const t of ORIGINAL_TILES){const o=centre(t.q,t.r);for(let j=0;j<6;j++)if(Math.hypot(o.x+cs[j][0]-c.x-p[0],o.z+cs[j][1]-c.z-p[1])<.001)return legacyTile(t.q,t.r,'coast-01').boundaries[j][0];}return null;
  });if(cornerCache.size>512)cornerCache.clear();cornerCache.set(k,heights);return heights;
}
export function createWangTile(q,r,variantId,rotation=0,legacyEdges=[]){
  if(!Number.isInteger(q)||!Number.isInteger(r)||ring(q,r)>99)throw Error('Invalid tile coordinate.');
  if(!Number.isInteger(rotation)||rotation<0||rotation>5)throw Error('Rotation must be 0–5.');
  if(!Array.isArray(legacyEdges)||legacyEdges.some(i=>!Number.isInteger(i)||i<0||i>5))throw Error('Invalid legacy adapters.');
  const recipe=WANG_VARIANTS.find(v=>v.id===variantId);if(!recipe)throw Error('Unknown tile variant.');
  const layout=LAYOUTS.find(l=>l.id===recipe.layout),wet=new Set(layout.wet.map(i=>(i+rotation)%6)),rivers=new Set(layout.rivers.map(i=>(i+rotation)%6));
  const old=legacyTile(q,r,'coast-01');
  const adapters=[...new Set([...legacyEdges,...DIRECTIONS.flatMap(([dq,dr],i)=>ORIGINAL_TILES.some(t=>t.q===q+dq&&t.r===r+dr)?[i]:[])])].sort();
  const edges=cs.map((_,i)=>socket(wet.has(i)?'water':'land',wet.has((i+1)%6)?'water':'land',rivers.has(i)));
  for(const i of adapters){const samples=old.boundaries[i],dry=samples.map((y,j)=>({y,j})).filter(v=>v.y>8&&v.j>2&&v.j<22),best=dry.sort((a,b)=>Math.abs(a.j-12)-Math.abs(b.j-12))[0];edges[i]={kind:'legacy',start:samples[0]>0?'land':'water',end:samples[24]>0?'land':'water',samples:[...samples],waterY:0,ports:best?[{kind:'path',t:best.j/24,width:18,y:best.y}]:[]};}
  const measured=[...originalCorners(q,r)];
  for(const i of adapters){measured[i]=edges[i].samples[0];measured[(i+1)%6]=edges[i].samples[24];}
  for(let i=0;i<6;i++)if(!adapters.includes(i))for(const [j,corner] of [[0,i],[24,(i+1)%6]]){
    if(measured[corner]===null)continue;const delta=measured[corner]-edges[i].samples[j];
    for(let k=0;k<=4;k++)edges[i].samples[j===0?k:24-k]=round(edges[i].samples[j===0?k:24-k]+delta*(1-k/5));
    edges[i].samples[j]=measured[corner];
  }
  const regions=layout.regions.map(([x,z,radius])=>{const p=rotate([x,z],rotation);return {x:round(p[0]),z:round(p[1]),radius};});
  const floorY=layout.id==='skyport'?36:24,origin={x:regions[0].x,y:floorY,z:regions[0].z},radius=Math.max(...regions.map(b=>Math.hypot(b.x-origin.x,b.z-origin.z)+b.radius));
  return {version:2,q,r,variant:variantId,rotation,legacyEdges:adapters,radius:TILE_RADIUS,mapScale:MAP_SCALE,recipe:{...recipe},
    slot:{origin,regions,radius:round(radius),height:480,floorY,mapRadius:round(radius*MAP_SCALE),mapHeight:14.4},edges,boundaries:edges.map(e=>e.samples),
    connections:{path:'connected',water:layout.rivers.length?'connected':layout.wet.length?'sea':'enclosed',waterY:0}};
}
function distance(x,z,a,b){const dx=b[0]-a[0],dz=b[1]-a[1],t=clamp(((x-a[0])*dx+(z-a[1])*dz)/(dx*dx+dz*dz||1));return Math.hypot(x-a[0]-t*dx,z-a[1]-t*dz);}
function curve(a,b,bend=0){return Array.from({length:25},(_,i)=>{const t=i/24;return [a[0]*(1-t)+b[0]*t+Math.sin(t*Math.PI)*bend,a[1]*(1-t)+b[1]*t+Math.sin(t*Math.PI)*bend*.55];});}
const geometryCache=new WeakMap();
export function tileFootprint(tile){
  if(geometryCache.has(tile))return geometryCache.get(tile);
  const l=LAYOUTS.find(l=>l.id===tile.recipe.layout),channels=[];
  if(l.rivers.length===2)channels.push(curve(edgePoint(l.rivers[0]),edgePoint(l.rivers[1]),l.id==='bend'?-60:0));
  else for(const i of l.rivers)channels.push(curve(edgePoint(i),[0,0]));
  if(l.id==='estuary')channels.push(curve([0,0],edgePoint(0)));
  const routes=[],nodes=tile.edges.flatMap((e,i)=>e.ports.map(p=>({p:edgePoint(i,p.t),y:p.y}))).concat(tile.slot.regions.map(r=>({p:[r.x||.01,r.z||.01],y:tile.slot.floorY,region:r})));
  const angles=nodes.map(n=>Math.atan2(n.p[1],n.p[0])).sort((a,b)=>a-b);let gap=-1,start=0;
  for(let i=0;i<angles.length;i++){const d=(angles[(i+1)%angles.length]-angles[i]+Math.PI*2)%(Math.PI*2);if(d>gap){gap=d;start=angles[(i+1)%angles.length];}}
  const length=angles.length>1?Math.PI*2-gap:0;
  if(length)routes.push(Array.from({length:65},(_,i)=>[Math.cos(start+length*i/64)*203,24,Math.sin(start+length*i/64)*203]));
  for(const n of nodes){const len=Math.hypot(...n.p),dir=n.p.map(x=>x/len),end=n.region?[n.p[0]+dir[0]*n.region.radius,n.p[1]+dir[1]*n.region.radius]:n.p;
    routes.push(Array.from({length:13},(_,i)=>{const t=i/12;return [dir[0]*203*(1-t)+end[0]*t,24*(1-t)+n.y*t,dir[1]*203*(1-t)+end[1]*t];}));}
  const result={channels:channels.map(points=>points.map(p=>rotate(p,tile.rotation))),routes};geometryCache.set(tile,result);return result;
}
export function hostHeight(tile,x,z,{paths=true}={}){
  if(tile.version!==2)return legacyHeight(x,z,tile.recipe,tile.boundaries);
  const l=tile.recipe.layout,[u,v]=rotate([x,z],-tile.rotation),rad=Math.hypot(x,z),{channels,routes}=tileFootprint(tile);
  let height=24,wetDistance=Infinity;
  for(const points of channels)for(let i=1;i<points.length;i++)wetDistance=Math.min(wetDistance,distance(x,z,points[i-1],points[i]));
  if(channels.length){let width=l==='canal'?27:33;if(l==='estuary')width+=Math.max(0,u)*.32;height-=56*(1-smooth((wetDistance-width)/(l==='canal'?9:26)));}
  if(l==='bay'||l==='harbor'){const inlet=l==='harbor'?Math.max(48-u,Math.abs(v)-103):Math.hypot((u-213)*.85,v)-165;height=Math.min(height,-40+64*smooth((inlet+4)/(l==='harbor'?16:49)));}
  if(l==='headland')height=Math.min(height,-40+64*smooth((70-u*.82-v*.42)/65));
  if(l==='oasis')height=Math.min(height,-25+49*smooth((Math.hypot((u-122)*1.1,v)-61)/31));
  if(l==='pass')height+=79*Math.exp(-((u+45)**2/7500+(Math.abs(v)-168)**2/1800));
  if(l==='skyport')height=-36+60*smooth((rad-185)/45);
  if(height>12&&l!=='skyport')height+=3*Math.sin(x*.017)*Math.cos(z*.023)*smooth((rad-80)/65);
  if(l!=='skyport')for(const r of tile.slot.regions){const d=Math.hypot(x-r.x,z-r.z);height=height+(tile.slot.floorY-height)*(1-smooth((d-r.radius)/15));}
  let nearest=Infinity,best=24;
  for(let i=0;i<6;i++){const a=cs[i],b=cs[(i+1)%6],dx=b[0]-a[0],dz=b[1]-a[1],t=clamp(((x-a[0])*dx+(z-a[1])*dz)/(dx*dx+dz*dz)),d=distance(x,z,a,b);if(d<nearest){nearest=d;const f=t*24,j=Math.min(23,Math.floor(f)),s=tile.boundaries[i];best=s[j]+(s[j+1]-s[j])*(f-j);}}
  height+=(best-height)*(1-smooth(nearest/54));
  if(paths&&l!=='skyport'&&nearest>1)for(const line of routes)for(let j=1;j<line.length;j++){const a=line[j-1],b=line[j],d=distance(x,z,[a[0],a[2]],[b[0],b[2]]);if(d<18&&height>9){const target=(a[1]+b[1])/2;height+=(target-height)*(1-smooth((d-11)/7))*smooth(nearest/8);}}
  return height;
}
export const contentOrigin=tile=>tile?.slot?.origin||{x:0,y:tile?.slot?.floorY??24,z:0};
// A triangle must be wholly inside one convex build region; checking only the
// union of vertex locations would allow geometry to bridge protected water.
export function buildContains(tile,points,role='world'){
  const scale=role==='world'?1:MAP_SCALE,origin=contentOrigin(tile),regions=tile?.slot?.regions||[{x:0,z:0,radius:190}];
  return regions.some(r=>points.every(p=>p[1]>=-.001&&p[1]<=480*scale+.001&&Math.hypot(p[0]/scale+origin.x-r.x,p[2]/scale+origin.z-r.z)<=r.radius+.001));
}
function neighboring(tile,other){return DIRECTIONS.findIndex(([dq,dr])=>other.q===tile.q+dq&&other.r===tile.r+dr);}
function edgesMatch(a,b){return a.kind===b.kind&&a.waterY===b.waterY&&a.start===b.end&&a.end===b.start&&a.samples.every((h,i)=>Math.abs(h-b.samples[24-i])<.0001)&&a.ports.length===b.ports.length&&a.ports.every((p,i)=>p.kind===b.ports[b.ports.length-1-i].kind&&p.width===b.ports[b.ports.length-1-i].width&&Math.abs(p.t+b.ports[b.ports.length-1-i].t-1)<.0001&&Math.abs(p.y-b.ports[b.ports.length-1-i].y)<.0001);}
function actualTiles(tiles){return tiles.map(t=>t.contract?(typeof t.contract==='string'?JSON.parse(t.contract):t.contract):t);}
export function compatibleChoices(q,r,tiles=[],{lookahead=false}={}){
  const neighbors=actualTiles(tiles).filter(t=>neighboring({q,r},t)!==-1),legacyEdges=neighbors.flatMap(t=>t.version===1?[neighboring({q,r},t)]:[]),choices=[];
  for(const v of WANG_VARIANTS)for(let rotation=0;rotation<6;rotation++){
    const tile=createWangTile(q,r,v.id,rotation,legacyEdges);
    if(neighbors.some(n=>n.version===2&&!edgesMatch(tile.edges[neighboring(tile,n)],n.edges[neighboring(n,tile)])))continue;
    if(lookahead&&placementIssue(tile,tiles,{checkNeighbors:false}))continue;
    choices.push({variant:v.id,rotation,legacyEdges:tile.legacyEdges});
  }return choices;
}
export function placementIssue(tile,tiles=[],{checkNeighbors=true}={}){
  const all=actualTiles(tiles),occupied=new Set([...all,...ORIGINAL_TILES].map(key));
  if(checkNeighbors&&all.some(n=>{const i=neighboring(tile,n);return i>=0&&n.version===2&&!edgesMatch(tile.edges[i],n.edges[(i+3)%6]);}))return 'This layout does not match the neighboring paths, water or corner heights.';
  // One-ring forward checking, not a claim of global WFC solvability.
  for(const [dq,dr] of DIRECTIONS){const q=tile.q+dq,r=tile.r+dr;if(ring(q,r)>99||occupied.has(`${q},${r}`))continue;
    const neighbors=[...all,tile].filter(t=>neighboring({q,r},t)!==-1);if(neighbors.filter(t=>t.version===2).length<2)continue;
    const adapters=neighbors.flatMap(t=>t.version===1?[neighboring({q,r},t)]:[]);
    const possible=LAYOUTS.some(l=>Array.from({length:6},(_,rotation)=>createWangTile(q,r,`${l.id}-${l.styles[0]}`,rotation,adapters)).some(candidate=>neighbors.every(n=>n.version!==2||edgesMatch(candidate.edges[neighboring(candidate,n)],n.edges[neighboring(n,candidate)]))));
    if(!possible)return 'This placement would leave a neighboring position without a compatible layout. Choose another layout or rotation.';
  }return null;
}
