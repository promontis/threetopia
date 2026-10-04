import { REGIONS, TRAILS, trailHalfWidth, type DestinationId, type RegionDefinition, type RegionId, type WangEdgeId } from './config.ts';
import { clamp, edgeWeight, lerp, nearestSegment, sampleHeightfield, smooth, type Heightfield } from './heightfield.ts';
import { HEX_RADIUS, hexCenter, hexCorners } from './tile-layout.ts';
export { HEX_DIRECTIONS, hexCenter, hexCorners } from './tile-layout.ts';
const round=(n:number)=>Math.round(n*1e6)/1e6;
export interface EdgeContract {
  key:string; signature:WangEdgeId; endpoints:{x:number;z:number}[]; heights:number[];
  kind:'path'|'water'; waterLevel:number; pathWidth:number; tiles:RegionId[];
}
export interface HexTile {
  q:number;r:number;region:RegionDefinition;center:{x:number;z:number};
  corners:{x:number;z:number}[];edges:EdgeContract[];
}
/** Reusable Wang profiles. Both ends meet the same seabed height at hex corners. */
export function edgeContract(a:{x:number;z:number},b:{x:number;z:number},signature:WangEdgeId):EdgeContract {
  const ends=[a,b].sort((p,q)=>p.x-q.x||p.z-q.z);
  const road=signature==='shore-path';
  const heights=Array.from({length:17},(_,i)=>road?lerp(-12,2.4,smooth(0,.2,Math.min(i/16,1-i/16))):-12);
  return{key:ends.map(p=>`${round(p.x)},${round(p.z)}`).join('|'),signature,endpoints:ends,heights,kind:road?'path':'water',waterLevel:0,pathWidth:road?2.8:0,tiles:[]};
}
/** Exactly one level per tile. Placement fails if neighbouring Wang signatures differ. */
export function buildHexTopology(regions:readonly RegionDefinition[]=REGIONS) {
  const edges=new Map<string,EdgeContract>(),cells:HexTile[]=[],occupied=new Set<string>();
  for(const region of regions) {
    const {q,r}=region.tile,key=`${q},${r}`;
    if(occupied.has(key))throw new Error(`Two levels occupy tile ${key}`);occupied.add(key);
    const center=hexCenter(q,r),corners=hexCorners(q,r);
    const ports=corners.map((a,i)=>{
      const proposed=edgeContract(a,corners[(i+1)%6],region.tile.edges[i]),existing=edges.get(proposed.key);
      if(existing&&existing.signature!==proposed.signature)throw new Error(`Wang edge mismatch: ${existing.tiles[0]} / ${region.id}`);
      const edge=existing??proposed;edge.tiles.push(region.id);edges.set(edge.key,edge);return edge;
    });
    cells.push({q,r,region,center,corners,edges:ports});
  }
  return{cells,edges,sharedEdges:[...edges.values()].filter(e=>e.tiles.length===2)};
}
const footprint=buildHexTopology();
const domain=new Map(footprint.cells.map(c=>[`${c.q},${c.r}`,c]));
/** Source interiors retain their exact ground. An irregular, rounded margin blends
 * the captured rectangles into the physical landscape, in metres. */
export function sourceWeight(region:RegionDefinition,x:number,z:number) {
  const [x0,z0,x1,z1]=region.bounds;
  const dx=Math.abs(x-(x0+x1)/2)-(x1-x0)/2+45;
  const dz=Math.abs(z-(z0+z1)/2)-(z1-z0)/2+45;
  const inside=45-Math.hypot(Math.max(0,dx),Math.max(0,dz))-Math.min(0,Math.max(dx,dz));
  const inlet=8+7*Math.sin(x*.043+Math.sin(z*.027))+5*Math.cos(z*.061);
  return smooth(Math.max(0,inlet),55,inside);
}
export function tileAt(x:number,z:number):HexTile|undefined {
  const q=(Math.sqrt(3)*x-z)/(3*HEX_RADIUS),r=2*z/(3*HEX_RADIUS),s=-q-r;
  let iq=Math.round(q),ir=Math.round(r),is=Math.round(s);
  const dq=Math.abs(iq-q),dr=Math.abs(ir-r),ds=Math.abs(is-s);
  if(dq>dr&&dq>ds)iq=-ir-is;else if(dr>ds)ir=-iq-is;else is=-iq-ir;
  return domain.get(`${iq},${ir}`);
}
export function worldLandWeight(x:number,z:number) {
  const cell=tileAt(x,z);if(!cell)return 0;
  const boundary=cell.edges.filter(e=>e.tiles.length===1);if(!boundary.length)return 1;
  const distance=Math.min(...boundary.map(e=>nearestSegment(x,z,e.endpoints[0],e.endpoints[1]).distance));
  return smooth(0,28,distance);
}
export function edgeHeightAt(edge:EdgeContract,t:number) {
  const u=clamp(t,0,1)*(edge.heights.length-1),i=Math.min(edge.heights.length-2,Math.floor(u));
  return lerp(edge.heights[i],edge.heights[i+1],u-i);
}
export interface RoutePoint {x:number;z:number;y:number;distance:number}
export class WalkingTrail {
  id:DestinationId;route:RoutePoint[];
  constructor(id:DestinationId,route:RoutePoint[]){this.id=id;this.route=route;}
  get length(){return this.route.at(-1)!.distance;}
  nearest(x:number,z:number) {
    let distance=Infinity,index=0,t=0;
    for(let i=1;i<this.route.length;i++){const n=nearestSegment(x,z,this.route[i-1],this.route[i]);if(n.distance<distance){distance=n.distance;index=i;t=n.t;}}
    const a=this.route[Math.max(0,index-1)],b=this.route[index];return{distance,index,t,y:lerp(a.y,b.y,t),along:lerp(a.distance,b.distance,t)};
  }
  pointAt(distance:number) {
    const d=clamp(distance,0,this.length);let i=1;
    while(i<this.route.length-1&&this.route[i].distance<d)i++;
    const a=this.route[i-1],b=this.route[i],t=(d-a.distance)/(b.distance-a.distance);
    return{x:lerp(a.x,b.x,t),y:lerp(a.y,b.y,t),z:lerp(a.z,b.z,t),index:i};
  }
}
export class WorldHeight {
  fields=new Map<string,Heightfield>();tidewater:any;
  trails=new Map<DestinationId,WalkingTrail>();
  weights(x:number,z:number) {return REGIONS.map(r=>sourceWeight(r,x-r.origin[0],z-r.origin[2]));}
  base(x:number,z:number) {
    const cell=tileAt(x,z);if(!cell)return -12;
    const r=cell.region,rx=x-r.origin[0],rz=z-r.origin[2],w=sourceWeight(r,rx,rz);
    const rolling=Math.sin(x*.017+Math.sin(z*.009))*Math.cos(z*.013)+.45*Math.sin(x*.041-z*.023);
    const ridge=(1+Math.sin(x*.008+z*.009))*.5;
    let h=r.id==='sakura'?16+18*ridge+9*rolling:r.id==='punk'?4+2*ridge+1.4*rolling:7+7*ridge+4*rolling;
    // Tidewater faces open ocean. Continue the source bay to the coast instead of
    // surrounding its captured rectangle with a new ring of land.
    if(r.id==='tidewater')h=lerp(h,-12,smooth(-65,65,rz+18*Math.sin(rx*.022)));
    if(w) {
      const f=this.fields.get(r.id);let ground=f?sampleHeightfield(f,rx,rz):r.id==='tidewater'&&this.tidewater?this.tidewater.heightAt(rx,rz):2.15;
      if(r.id!=='punk')ground+=r.origin[1];h=lerp(h,ground,w);
    }
    // The declared edge profile drives both terrain and collision, not just the map.
    let distance=Infinity,border=-12,coast=false;
    for(const edge of cell.edges) {
      const near=nearestSegment(x,z,edge.endpoints[0],edge.endpoints[1]);
      if(near.distance<distance){distance=near.distance;border=edgeHeightAt(edge,near.t);coast=edge.signature==='open-sea';}
    }
    // Erode the outside coastline inside the tile; shared Wang ports stay unchanged.
    const shore=coast?125+42*Math.sin(x*.015+Math.sin(z*.019))+24*Math.cos(z*.037-x*.011):65;
    return lerp(border,h,smooth(0,shore,distance));
  }
  trailHeight(x:number,z:number) {
    let h=Math.max(1.25,this.base(x,z)+.08);
    const rx=x-REGIONS[1].origin[0],rz=z-REGIONS[1].origin[2];
    // The source bridge has a 3.1 m arch and raised stone abutments.
    if(Math.abs(rz+10)<3&&rx>=-17&&rx<=21){
      const u=clamp((rx+14.5)/33,0,1);h=Math.max(h,1.63+3.1*(1-(2*u-1)**2));
      const field=this.fields.get('sakura');
      if(field&&rx<-13.4)h=Math.max(h,sampleHeightfield(field,-14.5,-10)+.64);
      if(field&&rx>17.4)h=Math.max(h,sampleHeightfield(field,18.5,-10)+.64);
    }
    const tx=x-REGIONS[2].origin[0],tz=z-REGIONS[2].origin[2];if(Math.abs(tx-55)<4&&tz>-66&&tz<-58)h=Math.max(h,2.4);
    return h;
  }
  buildTrails() {
    this.trails.clear();
    for(const {id,points} of TRAILS){
      const route:RoutePoint[]=[];let distance=0;
      for(let i=1;i<points.length;i++) {
        const a=points[i-1],b=points[i],length=Math.hypot(b.x-a.x,b.z-a.z),n=Math.ceil(length/2);
        for(let j=0;j<n;j++){const f=j/n,x=lerp(a.x,b.x,f),z=lerp(a.z,b.z,f);route.push({x,z,y:this.trailHeight(x,z),distance:distance+length*f});}
        distance+=length;
      }
      const last=points.at(-1)!;route.push({...last,y:this.trailHeight(last.x,last.z),distance});
      // Each branch meets the same central path, with a walkable grade in both directions.
      for(let pass=0;pass<2;pass++) {
        for(let i=1;i<route.length;i++){const a=route[i-1],b=route[i];b.y=Math.max(b.y,a.y-(b.distance-a.distance)*.4);}
        for(let i=route.length-2;i>=0;i--){const a=route[i],b=route[i+1];a.y=Math.max(a.y,b.y-(b.distance-a.distance)*.4);}
      }
      this.trails.set(id,new WalkingTrail(id,route));
    }
  }
  nearest(x:number,z:number) {
    let best={distance:Infinity,index:0,t:0,y:0,along:0,trail:undefined as WalkingTrail|undefined};
    for(const trail of this.trails.values()){
      const n=trail.nearest(x,z);
      if(n.distance<best.distance||(n.distance===best.distance&&n.y>best.y))best={...n,trail};
    }
    return best;
  }
  heightAt=(x:number,z:number)=>this.base(x,z);
  floorAt(x:number,z:number) {const n=this.nearest(x,z);return n.distance<trailHalfWidth(x,z)?Math.max(this.base(x,z),n.y):this.base(x,z);}
}
