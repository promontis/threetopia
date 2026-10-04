import type {Group,Object3D} from 'three';
import type {LandmarkMetrics,LandmarkLOD} from './tile-slot.js';
export interface LoadedLandmark {root:Group;metrics:LandmarkMetrics;lod:LandmarkLOD;dispose():void}
export function loadLandmark(url:string,lod?:LandmarkLOD,options?:{signal?:AbortSignal}):Promise<LoadedLandmark>;
export function addLandmarkWind(root:Object3D,time:{value:number}):void;
export function disposeLandmark(root:Object3D):void;
