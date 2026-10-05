import type {Object3D,Group} from 'three';
export function createMapTile(options:{landmark:Object3D;overview?:boolean;seed?:number}):{object:Group;update(seconds:number):void;dispose():void};
