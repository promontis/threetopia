import type {AtlasRegistry,AtlasTile,Slot} from './index.js';
export interface SceneRendererOptions {shared?:{renderer:any;runtime:any};loadScene?:(renderer:any,camera:any,progress:(message:string)=>void)=>Promise<any>;onSelect?:(item:any)=>void;onStats?:(stats:any)=>void;onLayers?:(tile:AtlasTile,map:any)=>void;onError?:(error:Error)=>void;onProgress?:(message:string)=>void}
export class SceneAtlasRenderer {
  constructor(host:HTMLElement,registry:AtlasRegistry,options:SceneRendererOptions);
  ready:Promise<void>;root:HTMLElement;motion:boolean;boundaries:boolean;creators:boolean;
  mount(host:HTMLElement):void;setMode(mode:'mini'|'overview'):void;setOptions(options:Partial<Pick<SceneAtlasRenderer,'motion'|'boundaries'|'creators'>>):void;
  fit():void;focus(x:number,z:number,span?:number):void;zoom(factor:number,clientX?:number,clientY?:number):void;
  select(item:any):void;updatePlayer(x:number,z:number,yaw:number,height?:number):void;setLayerVisible(tileId:string,layerId:string,visible:boolean):void;getLayers():any[];renderMini():void;dispose():void;
}
