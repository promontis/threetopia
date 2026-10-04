import {tileCentre,COMPACT_TILE} from '../../../packages/world-map/tile-slot.js';
export const MAP_TILES=[
  {id:'lagoon',title:'Lagoon',q:0,r:0,biome:'desert',manifest:'/map/lagoon-lite/component.json',description:'Four treehouses and their rope bridges'},
  {id:'tidewater',title:'Tidewater',q:1,r:0,biome:'coast',manifest:'/map/lite/tidewater/component.json',description:'The fishing boat at the wooden pier'},
  {id:'sakura',title:'Sakura',q:0,r:-1,biome:'valley',manifest:'/map/lite/sakura/component.json',description:'The river, red bridge and temple among cherry blossoms'},
  {id:'punk',title:'Punk',q:1,r:-1,biome:'city',manifest:'/map/lite/punk/component.json',description:'A floating city above the water'},
] as const;
export type MapTileId=typeof MAP_TILES[number]['id'];
export const COMPOSITION_RADIUS=COMPACT_TILE.map.radius;
const offsets=[[1,0],[0,1],[-1,1],[-1,0],[0,-1],[1,-1]];
export function sharedEdges(tile:{q:number;r:number}){return offsets.flatMap(([q,r],i)=>MAP_TILES.some(t=>t.q===tile.q+q&&t.r===tile.r+r)?[i]:[]);}
export function mapCentre(tile:{q:number;r:number}){return tileCentre(tile.q,tile.r,COMPOSITION_RADIUS);}

// The paired teleport pads share anchors with the dry shore and vegetation
// clearance. Arrival is a small bay on the west edge, outside the racing road.
const punkOrigin=mapCentre(MAP_TILES.find(t=>t.id==='punk')!);
export const PUNK_ACCESS={
  origin:punkOrigin,deckY:3.21,padRadius:.94,
  approach:{x:-1.8041071509290307,z:-9.234415682341485},
  shore:{x:-.4,y:.80,z:-11.2},
  arrival:{x:-6.2,y:3.21,z:1.05},
};
