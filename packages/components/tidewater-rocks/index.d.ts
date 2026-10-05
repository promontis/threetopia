import type {Group, BufferGeometry, ColorRepresentation} from 'three';
export interface RockOptions {seed?:number;count?:number;spread?:number;size?:number;detail?:number;color?:ColorRepresentation}
export function createRocks(options?:RockOptions):{object:Group;inspect():{triangles:number;drawCalls:number;disposed:boolean};dispose():void};
export function buildRockGeometry(styleIndex:number,seed:number,subdiv:number):BufferGeometry;
export const ROCK_STYLES: {name:string;scale:number[];planes:number;cut:number[];soft:number;rough:number}[];
