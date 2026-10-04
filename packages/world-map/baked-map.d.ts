import type {Group,WebGLRenderer,Scene,OrthographicCamera} from 'three';

export interface BakedLayer {
  id:string;
  effect:'still'|'foliage'|'water'|'waterfall';
  src:string;
  pixels:[number,number];
  /** Left, top, width, height in the common baked projection; y points up. */
  rect:[number,number,number,number];
  bytes:number;
  sourceObject?:string;
}
export interface BakedTier {resolution:number;layers:BakedLayer[];bytes:number;textureBytes:number}
export interface BakedTileManifest {
  version:1;id:string;name:string;frame:{width:number;height:number};oceanColor:string;
  credit:{name:string;url:string};tiers:[BakedTier,BakedTier,BakedTier];
  capture:Record<string,unknown>;sourceHashes:Record<string,string>;
}
export interface BakedMapView {width:number;height:number;span:number;center?:{x:number;y:number}}
/** Experimental fixed-view sprite renderer. This is not the Wang edge contract. */
export class BakedMap {
  constructor(root:HTMLElement,options?:{invalidate?:()=>void;onError?:(error:Error)=>void});
  scene:Scene;camera:OrthographicCamera;renderer:WebGLRenderer;
  addTile(manifest:BakedTileManifest,url:string,position?:{x:number;y:number},id?:string):Promise<void>;
  setView(view:BakedMapView):void;
  render(time:number,options?:{clouds?:boolean}):void;
  inspect():{frames:number;time:number;drawCalls:number;triangles:number;textures:number;textureBytes:number;tiles:{id:string;visible:boolean;resolution:number;pending?:number;layers:{id:string;position:number[];size:number[]}[]}[]};
  removeTile(id:string):void;
  dispose():void;
}
