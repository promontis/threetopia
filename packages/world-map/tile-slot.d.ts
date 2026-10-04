export type LandmarkLOD='tile'|'overview';
export type TileRepresentation='map'|'world';
export interface TileDimensions {radius:number;floorY:number;slotRadius:number;slotHeight:number}
export interface LandmarkMetrics {triangles:number;drawCalls:number;bytes:number;radius:number;minY:number;maxY:number;textureBytes:number;textures:number;forbiddenNodes:number}
export const DESERT_TILE:Readonly<{id:string;slotFraction:number;map:TileDimensions;world:TileDimensions}>;
export const COMPACT_TILE:Readonly<{id:string;map:TileDimensions;world:TileDimensions}>;
export const LANDMARK_BUDGET:Readonly<{tile:{triangles:number;drawCalls:number;bytes:number};overview:{triangles:number;drawCalls:number;bytes:number};textureBytes:number;textures:number}>;
export function tileCentre(q:number,r:number,radius?:number):{x:number;z:number};
export function tileCorners(radius?:number):{x:number;z:number}[];
export function tileInward(x:number,z:number,radius?:number):number;
export function desertHeightAt(x:number,z:number,representation?:TileRepresentation):number;
export interface SampledTileSurface {version:1;kind:'sampled-tile-surface';size:number;step:number;x0:number;z0:number;heights:number[];waterLevel:number;waveScale:number;waves:[string,string];source:{world:string;revision:string;origin:[number,number,number];scale:number}}
export function sampledTileHeightAt(x:number,z:number,surface:SampledTileSurface,representation?:TileRepresentation,compact?:boolean):number;
export function validateLandmarkMetrics(metrics:LandmarkMetrics,lod?:LandmarkLOD):string[];
