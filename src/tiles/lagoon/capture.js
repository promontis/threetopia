import * as THREE from 'three/webgpu';
import { createCompactLagoon } from './scene.js';
import { projectScene,CAMERA_DIRECTION,bounds } from '../../../packages/world-map/scene-camera.js';
import { corners,edges,LAGOON_TILE,APOTHEM,connectionHeight } from './layout.ts';

const renderer=new THREE.WebGPURenderer({alpha:true,antialias:true});
await renderer.init();renderer.setPixelRatio(1);renderer.setClearColor(0,0);
renderer.toneMapping=THREE.ACESFilmicToneMapping;renderer.toneMappingExposure=1.05;
renderer.shadowMap.enabled=true;renderer.shadowMap.type=THREE.PCFShadowMap;
document.body.append(renderer.domElement);
const world=await createCompactLagoon(message=>document.querySelector('output').textContent=message);
const frame=bounds(corners.flatMap(p=>[-2,40].map(y=>projectScene(p.x,y,p.z))));
frame.width+=74;frame.height+=58;
const camera=new THREE.OrthographicCamera(frame.x-frame.width/2,frame.x+frame.width/2,-frame.y+frame.height/2,-frame.y-frame.height/2,.1,1500);
camera.position.fromArray(CAMERA_DIRECTION).multiplyScalar(600);camera.lookAt(0,0,0);camera.updateMatrixWorld();
renderer.setSize(1800,Math.round(1800*frame.height/frame.width));
const category=mesh=>/waterfall/i.test(mesh.name)?'waterfall':/tree|palm|veg-/i.test(mesh.name)?'vegetation':'terrain';
window.lagoonCapture={
  async render(pass='all') {
    const changes=[],save=(o,k,v)=>{changes.push([o,k,o[k]]);o[k]=v;};
    save(world.connections,'visible',pass==='connections');
    if(pass==='connections') {
      save(world.terrain,'visible',false);
      // Keep the original source shadow casters for the adjoining ground.
      const materials=new Set();world.pack.group.traverse(o=>{if(o.isMesh)for(const m of [].concat(o.material))materials.add(m);});
      for(const m of materials){save(m,'colorWrite',false);save(m,'depthWrite',false);}
    }
    else {
      const materials=new Map();world.scene.traverse(o=>{if(o.isMesh)for(const m of [].concat(o.material))materials.set(m,(materials.get(m)??false)||pass==='all'||category(o)===pass);});
      for(const [m,visible] of materials){save(m,'colorWrite',visible);if(pass==='terrain'&&!visible)save(m,'depthWrite',false);}
    }
    try {
      document.querySelector('output').hidden=true;
      for(let i=0;i<4;i++){renderer.render(world.scene,camera);await renderer.backend.device.queue.onSubmittedWorkDone();await new Promise(requestAnimationFrame);}
      return {position:[frame.x,frame.y],size:[frame.width,frame.height],anchor:[.5,.5]};
    } finally {for(const [o,k,v] of changes.reverse())o[k]=v;}
  },
  metadata() {return {radius:LAGOON_TILE.radius,sourceCenter:LAGOON_TILE.sourceCenter,sourceRevision:world.pack.manifest.sourceRevision,source:'@threetopia/source-lagoon',camera:{yaw:-20,elevation:45},frame,boundary:corners.map(c=>projectScene(c.x,0,c.z)),connections:edges.filter(e=>e.connected).map(e=>({edge:e.id,width:40,height:connectionHeight(0),position:projectScene(e.nx*(APOTHEM+24),2.4,e.nz*(APOTHEM+24))})),landmarks:[{name:'Tree village',source:[-42,16,4]},{name:'Waterfall',source:[30,7,-36]},{name:'Lagoon',source:[-12,0,15]}].map(l=>({...l,position:projectScene(l.source[0]-LAGOON_TILE.sourceCenter.x,l.source[1],l.source[2]-LAGOON_TILE.sourceCenter.z)}))};}
};
document.querySelector('output').textContent='Ready';
