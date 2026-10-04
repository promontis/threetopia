import type {Landmark} from './index.js';
export interface SceneTileMap {version:3;kind:'scene-tile';units:'metres';origin:'tile-centre';radius:400;source:{kind:'gltf';url:string}|{kind:'runtime';id:string};bounds:{minY:number;maxY:number};omit:string[];landmarks:Landmark[]}
export const SCENE_MAP_BUDGET:{bytes:number;assetBytes:number;triangles:number;landmarks:number};
export function validateSceneMap(map:unknown):string[];
export function defineSceneMap<T extends SceneTileMap>(map:T):T;
export function starterSceneMap():SceneTileMap;
export function starterSceneGLB(edges?:string[]):Uint8Array;
