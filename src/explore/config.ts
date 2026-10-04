import lagoonSource from '@threetopia/source-lagoon/package.json' with { type: 'json' };
import sakuraSource from '@threetopia/source-sakura/package.json' with { type: 'json' };
import tidewaterSource from '@threetopia/source-tidewater/package.json' with { type: 'json' };
import punkSource from '@threetopia/source-punk/package.json' with { type: 'json' };
import { hexCenter } from './tile-layout.ts';
export { HEX_RADIUS, HEX_WIDTH } from './tile-layout.ts';
export type RegionId = 'lagoon' | 'sakura' | 'tidewater' | 'punk';
export type DestinationId = Exclude<RegionId,'lagoon'>;
export const HUB_REGION:RegionId='lagoon';
export type WangEdgeId = 'shore-path' | 'open-sea';
export type TileEdges = readonly [WangEdgeId,WangEdgeId,WangEdgeId,WangEdgeId,WangEdgeId,WangEdgeId];
export interface RegionDefinition {
  id: RegionId;
  title: string;
  short: string;
  creator: string;
  source: string;
  revision: string;
  origin: [number, number, number];
  tile: {q:number;r:number;edges:TileEdges};
  color: string;
  bounds: [number, number, number, number];
  description: string;
  retained: string;
}

// Edge order: E, SE, SW, W, NW, NE. Only matching signatures may touch.
const edges=(...paths:number[]):TileEdges=>Array.from({length:6},(_,i)=>paths.includes(i)?'shore-path':'open-sea') as unknown as TileEdges;
const sourceOrigin=(q:number,r:number,x:number,z:number,y=0):[number,number,number]=>{
  const center=hexCenter(q,r);return[center.x-x,y,center.z-z];
};
// Source origins recenter each source footprint inside its large hex, without scaling it.
export const REGIONS: RegionDefinition[] = [
  { id:'lagoon', title:'Lagoon Tree Village', short:'Lagoon', creator:'cryptomanavan', source:'https://lagoon-tree-village-creatures.netlify.app/', revision:lagoonSource.upstream.revision.slice(0,16), origin:[0,0,0], tile:{q:0,r:0,edges:edges(0,2,4)}, color:'#b9aa79', bounds:[-190,-180,190,180], description:'Winding stairs, woven homes and a village among the trees.', retained:'Original generated treehouses, bridges, trees, PBR textures and collision geometry.' },
  { id:'sakura', title:'Sakura River Valley', short:'Sakura', creator:'Meng To', source:'https://valley.mengto.here.now/', revision:sakuraSource.upstream.revision.slice(0,16), origin:sourceOrigin(1,0,0,-90), tile:{q:1,r:0,edges:edges(3)}, color:'#b6818d', bounds:[-150,-355,150,175], description:'Follow the river beneath the blossoms, across the red bridge.', retained:'Original valley heights, temple, bridge, trees, boat, rocks and textures.' },
  { id:'tidewater', title:'Tidewater', short:'Tidewater', creator:'Dan Greenheck', source:'https://github.com/dgreenheck/tidewater', revision:tidewaterSource.upstream.revision.slice(0,16), origin:sourceOrigin(-1,1,10,-37.5), tile:{q:-1,r:1,edges:edges(5)}, color:'#6eaaa4', bounds:[-210,-245,230,170], description:'A fishing village where the forest opens onto the sea.', retained:'Original procedural village and pier builders, terrain, colliders and TSL materials.' },
  { id:'punk', title:'Threejs-Punk', short:'Punk', creator:'Anderson Mancini & Sunag', source:'https://github.com/ektogamat/threejs-conference', revision:punkSource.upstream.revision.slice(0,16), origin:sourceOrigin(0,-1,-57.5,25,7.6), tile:{q:0,r:-1,edges:edges(1)}, color:'#8683b1', bounds:[-285,-160,170,210], description:'The coast becomes a city of neon, wet streets and distant towers.', retained:'Original city and car assets, GLTF loader, wet-ground and rain shader components.' },
];
export const regionById = (id: RegionId) => REGIONS.find(region => region.id === id)!;
export const PLAYER = { eyeHeight:1.68, height:1.8, radius:0.32, walkSpeed:4.8, runSpeed:10.5, stepHeight:0.42, gravity:20, jumpSpeed:6.2, maxSlope:Math.cos(Math.PI*48/180) };
export const SPAWN = { x:-57, z:27.5, yaw:-32*Math.PI/180, pitch:0.13 };

export interface TrailPoint { x:number; z:number; region:RegionId; landmark?:string }
const localTrail=(id:RegionId,points:readonly (readonly [number,number,string?])[]):TrailPoint[]=>{
  const r=regionById(id);return points.map(([x,z,landmark])=>({x:x+r.origin[0],z:z+r.origin[2],region:id,landmark}));
};
const crossing=(region:DestinationId):TrailPoint[]=>{
  const {tile}=regionById(region),c=hexCenter(tile.q,tile.r),length=Math.hypot(c.x,c.z);
  return[-14,0,14].map(offset=>({x:c.x/2+c.x/length*offset,z:c.z/2+c.z/length*offset,region}));
};
// Keep the branching junction on the open beach, clear of the village colliders.
const hub=localTrail('lagoon',[[-57,27.5,'Tree village'],[-64,42],[-34,65],[5,75],[5,100]]);
export const TRAILS:{id:DestinationId;points:TrailPoint[]}[]=[
  {id:'sakura',points:[...hub,
    ...localTrail('lagoon',[[50,100],[98,80],[150,70],[210,62]]),...crossing('sakura'),
    ...localTrail('sakura',[[-150,55],[-80,48],[-34,36],[-26,5],[-14.5,-10],[-8,-10],[2,-10,'Sakura bridge'],[11,-10],[18.5,-10],[27,-10],[27,-1],[45,20],[75,52,'Sakura valley']])]},
  {id:'tidewater',points:[...hub,
    ...localTrail('lagoon',[[-60,110],[-105,175],[-150,235]]),...crossing('tidewater'),
    ...localTrail('tidewater',[[150,-285],[-140,-285],[-260,-200],[-260,5],[-210,5],[-145,-30],[-80,-50],[-20,-65],[18,-60,'Tidewater beach'],[42,-60],[48,-62],[55,-62],[62,-62],[62,-46],[78,-46,'Fishing pier']])]},
  {id:'punk',points:[...hub,
    ...localTrail('lagoon',[[-90,95],[-160,115],[-230,100],[-250,20],[-240,-120],[-210,-220]]),...crossing('punk'),
    ...localTrail('punk',[[-10,250],[-240,250],[-310,180],[-310,45],[-280,45],[-230,46],[-199,46],[-174,43],[-167,36],[-138,34.2,'Neon streets']])]},
];

export const inPunkStreets=(x:number,z:number)=>{
  const r=regionById('punk'),rx=x-r.origin[0],rz=z-r.origin[2];
  return rx>-205&&rx<r.bounds[2]&&rz>r.bounds[1]&&rz<r.bounds[3];
};
export const trailHalfWidth=(x:number,z:number)=>inPunkStreets(x,z)?.85:1.4;
