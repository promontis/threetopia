import type {Object3D,Group} from 'three';
export function createHostTile(contract:any,options?:{map?:boolean;ghost?:boolean;slot?:boolean;lod?:boolean;detail?:string}):Group;
export function disposeObject(root:Object3D):void;

export function setHostDetail(root:Group,overview:boolean):void;

export function setHostTime(time:number):void;
export function blendHostBiomes(roots:Group[],options?:{map?:boolean}):void;
