// Development capture entry. Not part of any production page or bundle.
import * as THREE from 'three/webgpu';
import {loadSharedScene} from './scene-runtime.js';
import {REGIONS} from './config.ts';
import {hexCenter,hexCorners} from './tile-layout.ts';
import {projectScene,CAMERA_DIRECTION,bounds} from '../../packages/world-map/scene-camera.js';

const renderer=new THREE.WebGPURenderer({alpha:true,antialias:true,powerPreference:'high-performance'});
await renderer.init();renderer.setPixelRatio(1);renderer.setClearColor(0,0);
renderer.toneMapping=THREE.ACESFilmicToneMapping;renderer.toneMappingExposure=1.05;
renderer.shadowMap.enabled=true;renderer.shadowMap.type=THREE.PCFShadowMap;
document.body.append(renderer.domElement);
const camera=new THREE.OrthographicCamera(-1,1,1,-1,.1,6000);
const world=await loadSharedScene(renderer,camera,message=>document.querySelector('output').textContent=message,{overview:true,capture:true});
world.scene.background=null;
const clipped=new THREE.ClippingGroup();clipped.name='Map capture extent';clipped.layers.enable(3);
for(const object of [...world.scene.children])if(!object.isLight)clipped.add(object);
world.scene.add(clipped);
const category=mesh=>/waterfall/i.test(mesh.name)?'waterfalls':/billboard/i.test(mesh.name+' '+mesh.parent?.name)?'lights':/tree|palm|veg-|forest|bark|foliage|shrubs|bamboo/i.test(mesh.name)?'vegetation':'terrain';
function frame(region){
  const center=hexCenter(region.tile.q,region.tile.r),p=projectScene(center.x,0,center.z);
  const f=bounds(hexCorners(region.tile.q,region.tile.r).flatMap(c=>[-12,240].map(y=>projectScene(c.x,y,c.z))));
  const width=f.width+24,height=f.height+24;
  return {center,p,x:f.x,y:f.y,width,height};
}
function setup(region){
  const f=frame(region),target=new THREE.Vector3(f.center.x,0,f.center.z);
  camera.position.copy(target).add(new THREE.Vector3(...CAMERA_DIRECTION).multiplyScalar(2400));camera.lookAt(target);
  Object.assign(camera,{left:f.x-f.p.x-f.width/2,right:f.x-f.p.x+f.width/2,top:-(f.y-f.p.y)+f.height/2,bottom:-(f.y-f.p.y)-f.height/2});
  camera.updateProjectionMatrix();camera.updateMatrixWorld();
  renderer.setSize(1536,Math.round(1536*f.height/f.width));
  const corners=hexCorners(region.tile.q,region.tile.r);
  clipped.clippingPlanes=corners.map((a,i)=>{
    const b=corners[(i+1)%6],n=new THREE.Vector3(-(b.z-a.z),0,b.x-a.x).normalize();
    return new THREE.Plane(n,-n.x*a.x-n.z*a.z);
  });
  clipped.clippingPlanes.push(new THREE.Plane(new THREE.Vector3(0,1,0),-.02));
  return f;
}
function prepare(pass){
  const changes=[],set=(o,k,v)=>{changes.push([o,k,o[k]]);o[k]=v;};
  return scene=>{
    const materials=new Map();
    scene.traverse(o=>{
      if(!o.isMesh)return;
      if(o===world.sky||o===world.water.mesh||o.name==='Distant shared sea'){set(o,'visible',false);return;}
      const kind=category(o);
      for(const m of [].concat(o.material))materials.set(m,(materials.get(m)??false)||pass==='all'||kind===pass);
    });
    for(const [m,visible] of materials){set(m,'colorWrite',visible);if(pass==='terrain'&&!visible)set(m,'depthWrite',false);}
    return ()=>{for(let i=changes.length-1;i>=0;i--){const [o,k,v]=changes[i];o[k]=v;}};
  };
}
window.worldCapture={
  async render(id,pass='all'){
    const region=REGIONS.find(r=>r.id===id);if(!region)throw Error('Unknown tile');
    const f=setup(region);document.querySelector('output').hidden=true;
    // The first render compiles source materials and bakes their real leaf atlas.
    for(let i=0;i<3;i++){
      world.renderOverview(camera,0,{beforeRender:prepare(pass)});
      await renderer.backend.device.queue.onSubmittedWorkDone();
      await new Promise(requestAnimationFrame);
    }
    world.renderOverview(camera,0,{beforeRender:prepare(pass)});
    await renderer.backend.device.queue.onSubmittedWorkDone();
    return {position:[f.x-f.p.x,f.y-f.p.y],size:[f.width,f.height],anchor:[.5,.5],camera:{yaw:-20,elevation:45,projection:'orthographic'},pixels:[renderer.domElement.width,renderer.domElement.height]};
  },
  stats(){return {triangles:renderer.info.render.triangles,calls:renderer.info.render.calls,coastPlants:world.tide.vegetation.coastTypes.reduce((n,t)=>n+t.inst.count,0)};}
};
document.querySelector('output').textContent='Ready to capture';
