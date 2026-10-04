import type {WebGPURenderer,Camera} from 'three/webgpu';
export function loadSharedScene(renderer:WebGPURenderer,camera:Camera,progress?:(message:string,amount?:number)=>void,options?:{overview?:boolean;capture?:boolean}):Promise<any>;
