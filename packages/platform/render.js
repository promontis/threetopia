import {createHostTile as legacyHost} from './render-v3.js';
import {createDesignHost} from './render-v4.js';
export {disposeObject} from './legacy-render.js';
/** Geometry follows the immutable contract version, including saved v1–v3 hosts. */
export function createHostTile(tile,options={}){
 if(tile.version<4)return legacyHost(tile,options);
 const root=createDesignHost(tile,options);
 if(options.lod&&options.map){const far=createDesignHost(tile,{...options,slot:false,detail:'overview'});for(const mesh of [...far.children]){mesh.visible=false;root.add(mesh);}}
 return root;
}
export function setHostDetail(root,overview){for(const mesh of root.children){if(mesh.userData.hostLOD)mesh.visible=mesh.userData.hostLOD===(overview?'overview':'tile');}}


export {setHostTime} from './host-material.js';
export {blendHostBiomes} from './host-biomes.js';
