import * as T from 'three';
import {OrbitControls} from 'three/addons/controls/OrbitControls.js';
import {GLTFLoader} from 'three/addons/loaders/GLTFLoader.js';
import {RoomEnvironment} from 'three/addons/environments/RoomEnvironment.js';
import {disposeObject} from '../../packages/platform/render.js';
import {assetCameraFit} from './preview-content';

/** An asset is shown on its own, at its actual proportions, without invented terrain. */
export async function mountAssetPreview(el:HTMLElement,load:()=>Promise<ArrayBuffer>,signal:AbortSignal){
  const data=await load();signal.throwIfAborted();
  const gltf=await new GLTFLoader().parseAsync(data,'');
  if(signal.aborted){disposeObject(gltf.scene);signal.throwIfAborted();}
  const model=gltf.scene,bounds=new T.Box3().setFromObject(model,true);
  if(bounds.isEmpty()){disposeObject(model);throw Error('This model contains no visible geometry.');}
  const size=bounds.getSize(new T.Vector3()),centre=bounds.getCenter(new T.Vector3()),radius=Math.max(size.length()/2,.001);
  const scene=new T.Scene();scene.background=new T.Color('#f5f5f4');
  const object=new T.Group();object.position.set(-centre.x,-bounds.min.y,-centre.z);object.add(model);scene.add(object);
  model.traverse((o:any)=>{if(o.isMesh){o.castShadow=true;o.receiveShadow=true;}});
  let renderer:T.WebGLRenderer;
  try{renderer=new T.WebGLRenderer({antialias:true});}catch(error){disposeObject(scene);throw error;}
  renderer.setPixelRatio(Math.min(devicePixelRatio,2));renderer.toneMapping=T.ACESFilmicToneMapping;renderer.toneMappingExposure=1.05;
  renderer.shadowMap.enabled=true;renderer.shadowMap.type=T.PCFShadowMap;renderer.shadowMap.autoUpdate=false;
  renderer.domElement.setAttribute('aria-label','Interactive 3D model. Drag to rotate, scroll to zoom.');renderer.domElement.tabIndex=0;
  const camera=new T.PerspectiveCamera(35,1,.01,100),controls=new OrbitControls(camera,renderer.domElement);
  controls.enableDamping=true;controls.enablePan=false;controls.minPolarAngle=.06;controls.maxPolarAngle=Math.PI-.06;
  controls.target.set(0,size.y/2,0);controls.listenToKeyEvents(renderer.domElement);controls.keyPanSpeed=0;
  const pmrem=new T.PMREMGenerator(renderer),room=new RoomEnvironment(),environment=pmrem.fromScene(room,.04);
  scene.environment=environment.texture;scene.environmentIntensity=.65;room.dispose();pmrem.dispose();
  scene.add(new T.HemisphereLight('#ffffff','#b4aaa0',1.5));
  const sun=new T.DirectionalLight('#fff4e5',3);sun.position.set(-radius*2,radius*3,radius*2);sun.target.position.copy(controls.target);scene.add(sun,sun.target);
  sun.castShadow=true;sun.shadow.mapSize.set(2048,2048);Object.assign(sun.shadow.camera,{left:-radius*1.7,right:radius*1.7,top:radius*2,bottom:-radius*1.7,near:radius*.02,far:radius*9});sun.shadow.normalBias=radius*.002;sun.shadow.bias=-.00015;
  const floor=new T.Mesh(new T.PlaneGeometry(radius*12,radius*12),new T.ShadowMaterial({color:'#5a5147',opacity:.19}));
  floor.rotation.x=-Math.PI/2;floor.position.y=-radius*.002;floor.receiveShadow=true;scene.add(floor);
  const mixer=gltf.animations.length?new T.AnimationMixer(model):undefined;
  gltf.animations.forEach(clip=>mixer!.clipAction(clip).play());
  const reduced=matchMedia('(prefers-reduced-motion: reduce)');
  let disposed=false,visible=true,ready=false,raf=0,last=0,initial=true;
  function requestFrame(){if(ready&&!disposed&&!raf&&visible&&!document.hidden)raf=requestAnimationFrame(frame);}
  function frame(time:number){
    raf=0;if(disposed||!visible||document.hidden)return;
    const moving=controls.update(),animate=!!mixer&&!reduced.matches;
    if(animate){mixer!.update(last?Math.min((time-last)/1000,.05):0);renderer.shadowMap.needsUpdate=true;}
    last=time;renderer.render(scene,camera);if(moving||animate)requestFrame();
  }
  function reset(){
    const fit=assetCameraFit(radius,camera.aspect,camera.fov);
    camera.near=fit.near;camera.far=fit.far;camera.updateProjectionMatrix();
    controls.minDistance=fit.minDistance;controls.maxDistance=fit.maxDistance;
    controls.target.set(0,size.y/2,0);camera.position.copy(new T.Vector3(1,.65,1.45).normalize().multiplyScalar(fit.distance).add(controls.target));
    controls.update();controls.saveState();requestFrame();
  }
  function resize(){
    const {width,height}=el.getBoundingClientRect();if(!width||!height)return;
    const old=assetCameraFit(radius,camera.aspect,camera.fov),next=assetCameraFit(radius,width/height,camera.fov);
    camera.aspect=width/height;camera.near=next.near;camera.far=next.far;camera.updateProjectionMatrix();renderer.setSize(width,height);
    controls.maxDistance=next.maxDistance;
    if(initial){initial=false;reset();}else{camera.position.sub(controls.target).multiplyScalar(next.distance/old.distance).add(controls.target);requestFrame();}
  }
  const observer=new ResizeObserver(resize),visibility=new IntersectionObserver(entries=>{visible=entries[0].isIntersecting;last=0;requestFrame();});
  const resume=()=>{last=0;requestFrame();};
  controls.addEventListener('change',requestFrame);document.addEventListener('visibilitychange',resume);reduced.addEventListener('change',resume);
  const cleanup=Object.assign(()=>{
    if(disposed)return;disposed=true;signal.removeEventListener('abort',cleanup);cancelAnimationFrame(raf);observer.disconnect();visibility.disconnect();
    document.removeEventListener('visibilitychange',resume);reduced.removeEventListener('change',resume);controls.dispose();mixer?.stopAllAction();mixer?.uncacheRoot(model);
    disposeObject(scene);sun.shadow.dispose();environment.dispose();renderer.dispose();renderer.domElement.remove();
  },{reset});
  signal.addEventListener('abort',cleanup,{once:true});
  try{
    el.replaceChildren(renderer.domElement);observer.observe(el);visibility.observe(el);resize();
    await renderer.compileAsync(scene,camera);signal.throwIfAborted();ready=true;renderer.shadowMap.needsUpdate=true;renderer.render(scene,camera);requestFrame();return cleanup;
  }catch(error){cleanup();throw error;}
}
