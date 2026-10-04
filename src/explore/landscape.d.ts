import type {Scene,WebGPURenderer} from 'three/webgpu';
import type {WorldHeight} from './hex-world.ts';
export function fitTidewaterPlants(tide:unknown,height:{base(x:number,z:number):number;nearest(x:number,z:number):{distance:number}}):void;
export function plantCoasts(tide:unknown,height:WorldHeight,scene:Scene,renderer:WebGPURenderer):{palms:Record<string,number>[];trees:Record<string,number>[]};
