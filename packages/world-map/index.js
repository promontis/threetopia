import {validateSceneMap} from './scene-format.js';
export {validateSceneMap,defineSceneMap,starterSceneMap,starterSceneGLB,SCENE_MAP_BUDGET} from './scene-format.js';
import {validateImageMap} from './image-format.js';
export {validateImageMap,defineImageMap,projectMap,unprojectMap,IMAGE_MAP_BUDGET,starterImageMap} from './image-format.js';
/** Data-only entry point. Safe in Node, browsers and build tools; no renderer import. */
export const MAP_VERSION = 1;
export const TILE_RADIUS = 400;
export const DIRECTIONS = [[1,0],[0,1],[-1,1],[-1,0],[0,-1],[1,-1]];
export const SIDE_NAMES = ['E','SE','SW','W','NW','NE'];
export const MAP_BUDGET = Object.freeze({ bytes: 262144, triangles: 6000, props: 400, landmarks: 32, pathPoints: 1024 });
export const hexCenter = (q,r) => ({x:Math.sqrt(3)*TILE_RADIUS*(q+r/2),z:TILE_RADIUS*1.5*r});
export const hexDistance = (p) => Math.max(Math.abs(p.q),Math.abs(p.r),Math.abs(p.q+p.r));
export const hexCorners = (q=0,r=0) => {const c=hexCenter(q,r);return Array.from({length:6},(_,i)=>{const a=(i*60-30)*Math.PI/180;return [c.x+400*Math.cos(a),c.z+400*Math.sin(a)];});};
export function insideTile(x,z,margin=0){return Number.isFinite(x)&&Number.isFinite(z)&&Math.abs(x)<=Math.sqrt(3)/2*(400-margin)+.01&&Math.sqrt(3)*Math.abs(z)+Math.abs(x)<=Math.sqrt(3)*(400-margin)+.02;}
export function availableSlots(tiles) {
  const occupied=new Map(tiles.map(t=>[`${t.q},${t.r}`,t]));
  for(let ring=1;ring<=1000;ring++) {
    const slots=[];
    for(let q=-ring;q<=ring;q++)for(let r=-ring;r<=ring;r++)if(hexDistance({q,r})===ring&&!occupied.has(`${q},${r}`)){
      const neighbours=DIRECTIONS.map(([dq,dr],side)=>{const tile=occupied.get(`${q+dq},${r+dr}`);return tile?{side,opposite:(side+3)%6,tile:tile.id,signature:tile.edges[(side+3)%6]}:null;}).filter(Boolean);
      slots.push({q,r,ring,neighbours,edges:DIRECTIONS.map((_,s)=>neighbours.find(n=>n.side===s)?.signature??'open-sea')});
    }
    if(slots.length)return slots;
  }
  throw new Error('World exceeds the supported planning radius.');
}
const finite = a => Array.isArray(a)&&a.every(Number.isFinite);
const color = x => typeof x==='string'&&/^#[\da-f]{6}$/i.test(x);
const slug = x => typeof x==='string'&&/^[a-z][a-z0-9-]{1,63}$/.test(x);
export function validateMap(map) {
  if(map?.version===3)return validateSceneMap(map);
  if(map?.version===2)return validateImageMap(map);
  const errors=[],add=(ok,message)=>{if(!ok)errors.push(message);};
  if(!map||typeof map!=='object')return ['A map representation is required.'];
  add(map.version===MAP_VERSION,'map.version must be 1.');
  add(map.units==='metres'&&map.origin==='tile-centre','Use metres, Y up, with origin "tile-centre".');
  add(map.radius===TILE_RADIUS,'map.radius must be 400.');
  add(new TextEncoder().encode(JSON.stringify(map)).length<=MAP_BUDGET.bytes,'Map exceeds the 256 KiB uncompressed budget.');
  add(color(map.palette?.land)&&color(map.palette?.sand),'palette.land and palette.sand must be #rrggbb colours.');
  const mesh=(m,name)=>{
    if(!m||!finite(m.positions)||!finite(m.indices)||!finite(m.colors)){errors.push(`${name} needs finite positions, indices and colours.`);return;}
    add(m.positions.length>=9&&m.positions.length%3===0,`${name}: positions must contain complete XYZ vertices.`);
    add(m.colors.length===m.positions.length&&m.colors.every(c=>c>=0&&c<=1),`${name}: one RGB colour (0–1) per vertex is required.`);
    add(m.indices.length%3===0&&m.indices.length/3<=MAP_BUDGET.triangles,`${name}: triangle budget exceeded or incomplete triangles.`);
    add(m.indices.every(i=>Number.isInteger(i)&&i>=0&&i<m.positions.length/3),`${name}: invalid vertex index.`);
    for(let i=0;i<m.positions.length;i+=3)if(!insideTile(m.positions[i],m.positions[i+2])||Math.abs(m.positions[i+1])>500){errors.push(`${name}: terrain leaves the tile bounds.`);break;}
  };
  mesh(map.terrain,'terrain');mesh(map.distant,'distant');
  if(map.terrain&&map.distant)add(map.distant.indices?.length<=map.terrain.indices?.length/2,'distant must have at most half the terrain triangles.');
  add(Array.isArray(map.props)&&map.props.length<=MAP_BUDGET.props,'At most 400 map props are allowed.');
  for(const p of map.props??[])add(['tree','pine','house','tower','rock','bridge'].includes(p.kind)&&finite(p.position)&&p.position.length===3&&insideTile(p.position[0],p.position[2],2)&&Math.abs(p.position[1])<500&&finite(p.scale)&&p.scale.length===3&&p.scale.every(n=>n>0&&n<=120)&&Number.isFinite(p.rotation??0)&&color(p.color),`Invalid map prop ${p.kind??''}.`);
  add(Array.isArray(map.landmarks)&&map.landmarks.length<=MAP_BUDGET.landmarks,'At most 32 landmarks are allowed.');
  const ids=new Set();
  for(const p of map.landmarks??[]){add(slug(p.id)&&!ids.has(p.id)&&typeof p.label==='string'&&p.label.length>0&&p.label.length<=64&&finite(p.position)&&p.position.length===3&&insideTile(p.position[0],p.position[2])&&Math.abs(p.position[1])<500&&['village','nature','harbour','bridge','city','spawn'].includes(p.kind),`Invalid or duplicate landmark ${p.id??''}.`);ids.add(p.id);}
  add(Array.isArray(map.paths)&&map.paths.reduce((n,p)=>n+(p.points?.length??0),0)<=MAP_BUDGET.pathPoints,'Map paths exceed the 1,024 point budget.');
  for(const p of map.paths??[])add(color(p.color)&&Number.isFinite(p.width)&&p.width>0&&p.width<=20&&Array.isArray(p.points)&&p.points.length>=2&&p.points.every(v=>finite(v)&&v.length===3&&insideTile(v[0],v[2])&&Math.abs(v[1])<500),'Invalid map path.');
  return errors;
}
export function validateWorld(world,map,registry) {
  const errors=[];
  if(!world||typeof world!=='object')return ['world.json is required.'];
  if(world.version!==1||!slug(world.id))errors.push('world.version must be 1 and id must be a lowercase slug.');
  if(typeof world.title!=='string'||!world.title.trim()||world.title.length>80)errors.push('A title (1–80 characters) is required.');
  if(!Number.isInteger(world.tile?.q)||!Number.isInteger(world.tile?.r)||Math.abs(world.tile.q)>1000||Math.abs(world.tile.r)>1000)errors.push('tile.q and tile.r must be integer axial coordinates within ±1000.');
  const edges=world.edges;
  if(!Array.isArray(edges)||edges.length!==6||edges.some(x=>!['open-sea','shore-path'].includes(x)))errors.push('Declare six Wang edges in E, SE, SW, W, NW, NE order.');
  if(typeof world.map!=='string'||!world.map.endsWith('.json'))errors.push('A world must declare a map JSON representation.');
  errors.push(...validateMap(map));
  if(map?.version===3&&(!world.scene||world.scene.kind!==map.source?.kind||(map.source?.kind==='gltf'?world.scene.url!==map.source.url:world.scene.id!==map.source?.id)))errors.push('world.scene and map.source must reference the same actual scene asset.');
  if(registry&&errors.length===0){
    const all=registry.tiles.filter(t=>t.id!==world.id),at=all.find(t=>t.q===world.tile.q&&t.r===world.tile.r);
    if(at)errors.push(`Tile (${world.tile.q}, ${world.tile.r}) is occupied by ${at.id}.`);
    if(!registry.tiles.some(t=>t.id===world.id)&&!availableSlots(all).some(t=>t.q===world.tile.q&&t.r===world.tile.r))errors.push('Choose a free tile in the first incomplete expansion ring.');
    let connections=0;
    for(let side=0;side<6;side++){
      const [dq,dr]=DIRECTIONS[side],neighbour=all.find(t=>t.q===world.tile.q+dq&&t.r===world.tile.r+dr);
      if(neighbour){if(neighbour.edges[(side+3)%6]!==edges[side])errors.push(`${SIDE_NAMES[side]} edge does not match ${neighbour.id}. Coordinate both sides of the new crossing.`);else if(edges[side]==='shore-path')connections++;}
    }
    if(all.length&&!connections)errors.push('A new world needs a matching shore-path to an occupied neighbour. Coastline changes require a joint placement proposal.');
  }
  return errors;
}
export function defineMap(map){const errors=validateMap(map);if(errors.length)throw new Error(errors.join('\n'));return map;}
/** Standard shared shoreline: both adjacent packages receive identical height samples. */
export function edgeHeight(signature,t){const s=v=>{v=Math.max(0,Math.min(1,v));return v*v*(3-2*v);};const u=Math.min(t,1-t);return signature==='shore-path'?-12+14.4*s(u/.2):-12;}
export function makeTerrain(height,colorAt,segments=16){
  const corners=hexCorners(),positions=[],colors=[],indices=[];
  for(let side=0;side<6;side++){
    const a=corners[side],b=corners[(side+1)%6],rows=[];
    for(let i=0;i<=segments;i++){rows[i]=positions.length/3;for(let j=0;j<=segments-i;j++){
      const x=(a[0]*i+b[0]*j)/segments,z=(a[1]*i+b[1]*j)/segments,y=height(x,z);
      positions.push(...[x,y,z].map(n=>+n.toFixed(3)));colors.push(...colorAt(x,y,z).map(n=>+n.toFixed(3)));
    }}
    for(let i=0;i<segments;i++)for(let j=0;j<segments-i;j++){const a=rows[i]+j,b=rows[i+1]+j,c=a+1;indices.push(a,c,b);if(j<segments-i-1)indices.push(c,rows[i+1]+j+1,b);}
  }
  return{positions,colors,indices};
}
export function starterMap(edges=Array(6).fill('open-sea')){
  const corners=hexCorners(),height=(x,z)=>{
    let distance=Infinity,edge=0,t=0;
    for(let i=0;i<6;i++){const a=corners[i],b=corners[(i+1)%6],dx=b[0]-a[0],dz=b[1]-a[1],u=Math.max(0,Math.min(1,((x-a[0])*dx+(z-a[1])*dz)/(dx*dx+dz*dz))),d=Math.hypot(x-a[0]-dx*u,z-a[1]-dz*u);if(d<distance){distance=d;edge=i;t=u;}}
    const u=Math.min(1,distance/45),v=u*u*(3-2*u);return edgeHeight(edges[edge],t)*(1-v)+3*v;
  },colour=(_,y)=>y<1?[.77,.72,.52]:[.39,.52,.32];
  return{version:1,units:'metres',origin:'tile-centre',radius:400,palette:{land:'#75864e',sand:'#c9b67f'},terrain:makeTerrain(height,colour),distant:makeTerrain(height,colour,8),props:[{kind:'tree',position:[0,3,0],scale:[22,40,22],rotation:0,color:'#68824d'}],landmarks:[{id:'arrival',label:'Arrival',kind:'spawn',position:[0,4,0]}],paths:[]};
}
