import * as THREE from 'three/webgpu';
import {GLTFLoader} from 'three/addons/loaders/GLTFLoader.js';
import {hexCenter} from './index.js';

/** Portable creator adapter; the GLB is the very same world.scene asset. */
export async function loadGLTFScene(registry,renderer,camera,progress=()=>{}){
  const scene=new THREE.Scene();scene.background=new THREE.Color('#20535e');
  scene.add(new THREE.HemisphereLight('#e8f0f5','#706744',2.3));const sun=new THREE.DirectionalLight('#fff0d9',3.4);sun.position.set(-450,900,300);scene.add(sun);
  const entries=[],mixers=[];
  for(const tile of registry.tiles){
    progress(`Loading ${tile.title}`);const map=tile.sceneData??await fetch(tile.sceneMap).then(r=>{if(!r.ok)throw Error('Map metadata could not load.');return r.json();});
    const url=new URL(map.source.url,new URL(tile.sceneMap??'./map.json',location.href));
    const gltf=await new GLTFLoader().loadAsync(url.href),group=gltf.scene,c=hexCenter(tile.q,tile.r);group.position.set(c.x,0,c.z);scene.add(group);
    group.traverse(o=>{if(map.omit.includes(o.name))o.visible=false;});
    const mixer=new THREE.AnimationMixer(group);for(const clip of gltf.animations)mixer.clipAction(clip).play();mixers.push(mixer);entries.push({id:tile.id,group});
  }
  return{scene,getLayers:()=>entries.map(e=>({id:e.id,components:[{id:'structures',label:'Scene geometry'}]})),setLayerVisible(id,layer,visible){const e=entries.find(e=>e.id===id);if(e&&(layer==='tile'||layer==='structures'))e.group.visible=visible;},renderOverview(camera,dt){mixers.forEach(m=>m.update(dt));renderer.render(scene,camera);},dispose(){for(const mixer of mixers)mixer.stopAllAction();scene.traverse(o=>{if(o.isMesh){o.geometry.dispose();for(const m of [].concat(o.material)){for(const v of Object.values(m))if(v?.isTexture)v.dispose();m.dispose();}}});}};
}
