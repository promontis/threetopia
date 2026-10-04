import {setHostTime} from '../../packages/platform/host-material.js';
import * as T from 'three';
import {createHostLoader} from './host-loader';
import {OrbitControls} from 'three/addons/controls/OrbitControls.js';
import {GLTFLoader} from 'three/addons/loaders/GLTFLoader.js';
import {RoomEnvironment} from 'three/addons/environments/RoomEnvironment.js';
import {createHostTile,disposeObject} from '../../packages/platform/render.js';
import {MAP_SCALE,SLOT,tileContract,contentOrigin} from '../../packages/platform/tiles.js';
export async function mountPreview(el:HTMLElement,{contract,load,mode='map',showSlot=true,signal}:{contract?:any;load?:()=>Promise<ArrayBuffer>;mode?:string;showSlot?:boolean;signal?:AbortSignal}={}){
  signal?.throwIfAborted();
  const scene=new T.Scene();scene.background=new T.Color('#c6d7d2');
  const renderer=new T.WebGLRenderer({antialias:true,alpha:false});renderer.setPixelRatio(Math.min(devicePixelRatio,2));renderer.shadowMap.enabled=true;renderer.shadowMap.type=T.PCFShadowMap;renderer.toneMapping=T.ACESFilmicToneMapping;renderer.toneMappingExposure=.9;
  const pmrem=new T.PMREMGenerator(renderer),room=new RoomEnvironment(),env=pmrem.fromScene(room,.04);scene.environment=env.texture;scene.environmentIntensity=.45;room.dispose();pmrem.dispose();
  el.replaceChildren(renderer.domElement);renderer.domElement.setAttribute('aria-label','Interactive 3D tile preview');renderer.domElement.setAttribute('tabindex','0');
  const camera=new T.PerspectiveCamera(38,1,.05,150),controls=new OrbitControls(camera,renderer.domElement);camera.position.set(15,18,22);controls.target.set(0,1.5,0);controls.minDistance=12;controls.maxDistance=48;controls.maxPolarAngle=Math.PI*.46;controls.enableDamping=true;
  controls.update();controls.saveState();
  const hemi=new T.HemisphereLight('#e7f3ff','#799172',.85);scene.add(hemi);
  const sun=new T.DirectionalLight('#fff0d5',2.4);sun.position.set(-14,27,14);sun.castShadow=true;sun.shadow.mapSize.set(2048,2048);Object.assign(sun.shadow.camera,{left:-13,right:13,top:16,bottom:-13,near:.1,far:70});sun.shadow.normalBias=.03;scene.add(sun);
  const water=new T.Mesh(new T.PlaneGeometry(200,200),new T.MeshStandardMaterial({color:'#579f9d',roughness:.3,metalness:.18}));water.rotation.x=-Math.PI/2;water.position.y=-.16;scene.add(water);
  const group=new T.Group();scene.add(group);const tile=contract||await tileContract(8,0,'tropical-inlet');
  const hostLoader=createHostLoader();
  let cancel=()=>hostLoader.dispose();const abort=()=>cancel();signal?.addEventListener('abort',abort,{once:true});if(signal?.aborted)abort();
  let activeHost:T.Group;
  try{const loaded=await hostLoader.load(tile,{map:true,slot:showSlot});if(!loaded)throw Error('Tile preview was interrupted.');activeHost=loaded;group.add(activeHost);}
  catch(error){signal?.removeEventListener('abort',abort);hostLoader.dispose();controls.dispose();disposeObject(scene);sun.shadow.dispose();env.dispose();renderer.dispose();renderer.domElement.remove();throw error;}
  const hosts=new Map<string,T.Group>([[JSON.stringify(tile),activeHost]]);let updateTicket=0;
  let disposed=false,raf=0,dirty=true,model:T.Group|undefined;controls.addEventListener('change',()=>{dirty=true;});
  const resize=()=>{const {width,height}=el.getBoundingClientRect();if(!width||!height)return;renderer.setSize(width,height);camera.aspect=width/height;camera.updateProjectionMatrix();dirty=true;};const observer=new ResizeObserver(resize);observer.observe(el);resize();
  function frame(){if(disposed)return;if(renderer.domElement.isConnected){controls.update();if(dirty){dirty=false;setHostTime(performance.now()/1000);renderer.render(scene,camera);}}raf=requestAnimationFrame(frame);}
  const cleanup=Object.assign(()=>{if(disposed)return;disposed=true;signal?.removeEventListener('abort',abort);hostLoader.dispose();updateTicket++;cancelAnimationFrame(raf);observer.disconnect();controls.dispose();for(const host of hosts.values())disposeObject(host);hosts.clear();disposeObject(scene);sun.shadow.dispose();env.dispose();renderer.dispose();renderer.domElement.remove();},{
    reset(){controls.reset();dirty=true;},
    attach(container:HTMLElement){if(disposed)return;observer.unobserve(el);el=container;el.replaceChildren(renderer.domElement);observer.observe(el);resize();},
    async update(next:any){
      const ticket=++updateTicket,key=JSON.stringify(next);let host=hosts.get(key);
      if(!host){host=await hostLoader.load(next,{map:true,slot:showSlot})||undefined;if(!host||disposed||ticket!==updateTicket){if(host)disposeObject(host);return;}hosts.set(key,host);await renderer.compileAsync(host,camera,scene);}
      if(disposed||ticket!==updateTicket)return;
      hosts.delete(key);hosts.set(key,host);activeHost.removeFromParent();activeHost=host;group.add(host);dirty=true;
      for(const [key,cached]of hosts){if(hosts.size<=12)break;if(cached!==activeHost){hosts.delete(key);disposeObject(cached);}}
    },
  });
  cancel=cleanup;if(signal?.aborted){cleanup();signal.throwIfAborted();}
  try{
  // Warm the single context/program set during page loading, including when the
  // picker preview is detached. Swapping terrain never recreates this context.
  renderer.setSize(300,152,false);await renderer.compileAsync(scene,camera);if(disposed)return cleanup;renderer.render(scene,camera);resize();frame();
  if(load){try{const data=await load();if(!disposed){const gltf=await new GLTFLoader().parseAsync(data,'');if(disposed){disposeObject(gltf.scene);return cleanup;}model=gltf.scene;if(mode==='world')model.scale.setScalar(MAP_SCALE);const origin=contentOrigin(tile);model.position.set(origin.x*MAP_SCALE,origin.y*MAP_SCALE,origin.z*MAP_SCALE);model.traverse((o:any)=>{if(o.isMesh){o.castShadow=true;o.receiveShadow=true;}});group.add(model);dirty=true;}}catch(error){cleanup();throw error;}}
  return cleanup;
  }catch(error){cleanup();throw error;}
}
