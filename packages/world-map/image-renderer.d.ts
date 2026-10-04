import type {AtlasRegistry,AtlasTile,Slot} from './index.js';
import type {ImageTileMap,ImageLandmark} from './image-format.js';
export type MapSelection={kind:'world';tile:AtlasTile}|{kind:'landmark';tile:AtlasTile;landmark:ImageLandmark}|{kind:'slot';slot:Slot};
export interface ImageMapStats {renderer:'composition';loadedTiles:number;layers:number;span:number;minSpan:number;maxSpan:number;atMin:boolean;atMax:boolean;frames:number;lod:'detail'|'overview';canvases:1;effects:number;zoom:number;center:{x:number;y:number}}
export interface ImageRendererOptions {onSelect?:(item:MapSelection)=>void;onStats?:(stats:ImageMapStats)=>void;onError?:(error:Error)=>void;onLayers?:(tile:AtlasTile,map:ImageTileMap)=>void}
export class ImageAtlasRenderer {
  constructor(host:HTMLElement,registry:AtlasRegistry,options?:ImageRendererOptions);
  motion:boolean;boundaries:boolean;creators:boolean;root:HTMLElement;ready:Promise<void>;
  mount(host:HTMLElement):void;
  setMode(mode:'mini'|'overview'):void;
  setOptions(options:Partial<Pick<ImageAtlasRenderer,'motion'|'boundaries'|'creators'>>):void;
  fit():void;
  focus(x:number,z:number,span?:number):void;
  zoom(factor:number,clientX?:number,clientY?:number):void;
  select(item:MapSelection):void;
  updatePlayer(x:number,z:number,yaw:number,height?:number):void;
  setLayerVisible(tileId:string,layerId:string,visible:boolean):void;
  getLayers():Array<{tile:AtlasTile;data:ImageTileMap}>;
  getLayout():Array<{id:string;visible:boolean;layers:Array<{id:string;visible:boolean;position:number[];pixel:number[];parent:string}>}>;
  dispose():void;
}
