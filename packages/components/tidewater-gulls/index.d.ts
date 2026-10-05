import type {Mesh, BufferGeometry, MeshStandardMaterial, InstancedBufferGeometry} from 'three';
export interface GullOptions {count?:number;seed?:number;center?:number[];spread?:number[];radius?:number[];height?:number[];speed?:number[];size?:number[];bob?:number;flapSpeed?:number}
export function createGullGeometry():InstancedBufferGeometry;
export function createGulls(options?:GullOptions):{object:Mesh<BufferGeometry,MeshStandardMaterial>;update(timeInSeconds:number):void;inspect():{count:number;triangles:number;drawCalls:number;time:number;disposed:boolean};dispose():void};
