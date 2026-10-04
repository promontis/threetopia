export type Point = [number,number,number];
export type Edge = 'open-sea'|'shore-path';
export interface MapMesh {positions:number[];colors:number[];indices:number[]}
export interface Landmark {id:string;label:string;kind:'village'|'nature'|'harbour'|'bridge'|'city'|'spawn';position:Point}
export interface MapRepresentation {version:1;units:'metres';origin:'tile-centre';radius:400;palette:{land:string;sand:string};terrain:MapMesh;distant:MapMesh;props:{kind:'tree'|'pine'|'house'|'tower'|'rock'|'bridge';position:Point;scale:Point;rotation?:number;color:string}[];landmarks:Landmark[];paths:{color:string;width:number;points:Point[]}[]}
export interface AtlasTile {id:string;title:string;short:string;creator:string;q:number;r:number;edges:Edge[];color:string;map:string;imageMap?:string;sceneMap?:string;minHeight?:number;maxHeight?:number;landmarks?:Landmark[];description:string}
export interface AtlasRegistry {version:1;tiles:AtlasTile[]}
export interface Slot {q:number;r:number;ring:number;edges:Edge[];neighbours:{side:number;opposite:number;tile:string;signature:Edge}[]}
export const MAP_VERSION:number,TILE_RADIUS:number,MAP_BUDGET:{bytes:number;triangles:number;props:number;landmarks:number;pathPoints:number};
export const DIRECTIONS:number[][],SIDE_NAMES:string[];
export function hexCenter(q:number,r:number):{x:number;z:number};
export function hexCorners(q?:number,r?:number):number[][];
export function hexDistance(p:{q:number;r:number}):number;
export function insideTile(x:number,z:number,margin?:number):boolean;
export function availableSlots(tiles:AtlasTile[]):Slot[];
export function validateMap(map:unknown):string[];
export function validateWorld(world:unknown,map:unknown,registry?:AtlasRegistry):string[];
export function defineMap<T extends MapRepresentation>(map:T):T;
export function edgeHeight(signature:Edge,t:number):number;
export function makeTerrain(height:(x:number,z:number)=>number,colorAt:(x:number,y:number,z:number)=>number[],segments?:number):MapMesh;
export function starterMap(edges?:Edge[]):MapRepresentation;
export {validateImageMap,defineImageMap,projectMap,unprojectMap,IMAGE_MAP_BUDGET,starterImageMap} from './image-format.js';
export type {ImageTileMap,ImageComponent,ImageLayer,ImageLandmark} from './image-format.js';

export {validateSceneMap,defineSceneMap,starterSceneMap,starterSceneGLB,SCENE_MAP_BUDGET} from './scene-format.js';
export type {SceneTileMap} from './scene-format.js';
