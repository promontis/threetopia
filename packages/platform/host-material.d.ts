import type {MeshStandardMaterial} from 'three';
export function createHostMaterial(kind:string,scale?:number,sand?:string):MeshStandardMaterial;

export function setHostTime(time:number):void;
export function createHostDepthMaterial(kind:string,scale?:number):import('three').MeshDepthMaterial|undefined;
