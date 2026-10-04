import * as THREE from 'three/webgpu';
import {mix,positionLocal,uniform} from 'three/tsl';
import {HDRLoader} from 'three/addons/loaders/HDRLoader.js';
import {REGIONS} from './config.ts';
import {WorldHeight} from './hex-world.ts';
import {loadCapturedPackage,fitCapturedPlants} from './package-loader.ts';
import {loadPunk,loadTidewater,updateSourceGlobals} from './native-packages.js';
import {createTerrain} from './terrain.js';
import {createWater} from './water.js';
import {worldTime,overviewQuality} from './materials.js';
import {plantCoasts} from './landscape.js';
const nextFrame=()=>new Promise(resolve=>setTimeout(resolve,0));

/** Both the walking world and its map use these source factories and placements. */
export async function loadSharedScene(renderer,camera,progress=()=>{},{overview=false,capture=false}={}) {
  const scene=new THREE.Scene();
    scene.background=new THREE.Color('#b9ccc3');scene.fog=new THREE.FogExp2('#b9ccc3',.0028);
    const skyDay=uniform(new THREE.Color('#7baeb2')),skyHorizon=uniform(new THREE.Color('#e7ddba'));
    const skyMat=new THREE.MeshBasicNodeMaterial({side:THREE.BackSide,depthWrite:false,fog:false});skyMat.colorNode=mix(skyHorizon,skyDay,positionLocal.normalize().y.max(0).pow(.6));
    const sky=new THREE.Mesh(new THREE.SphereGeometry(1500,32,16),skyMat);sky.name='Shared sky';sky.renderOrder=-100;scene.add(sky);
    const hemi=new THREE.HemisphereLight('#d1e1e3','#95835e',1.55),sun=new THREE.DirectionalLight('#ffe9bd',3.1);
    sun.castShadow=true;sun.shadow.mapSize.set(2048,2048);sun.shadow.camera.left=-80;sun.shadow.camera.right=80;sun.shadow.camera.top=80;sun.shadow.camera.bottom=-80;sun.shadow.camera.far=420;sun.shadow.normalBias=.06;sun.shadow.bias=-.0001;scene.add(hemi,sun,sun.target);
    const environment=await new HDRLoader().loadAsync('/world-assets/punk/hdri/sunflowers_puresky_1k.hdr');environment.mapping=THREE.EquirectangularReflectionMapping;scene.environment=environment;scene.environmentIntensity=.4;
    progress('Loading Lagoon Tree Village',13);await nextFrame();
    const lagoon=await loadCapturedPackage(REGIONS[0],message=>progress(message));scene.add(lagoon.group);
    progress('Loading Sakura River Valley',32);await nextFrame();
    const sakura=await loadCapturedPackage(REGIONS[1],message=>progress(message));scene.add(sakura.group);
    progress('Loading Tidewater',48);await nextFrame();
    const tide=await loadTidewater(REGIONS[2],progress);scene.add(tide.group);
    progress('Loading Threejs-Punk',62);await nextFrame();const punk=await loadPunk(REGIONS[3],scene,renderer,camera,progress,{overview});
    const height=new WorldHeight();height.fields.set('lagoon',lagoon.field);height.fields.set('sakura',sakura.field);height.tidewater=tide.terrain;height.buildTrails();fitCapturedPlants(sakura,REGIONS[1],height);
    plantCoasts(tide,height,scene,renderer);
    progress('Joining shared terrain edges',76);await nextFrame();const terrain=createTerrain(scene,height,[lagoon,sakura],{spacing:overview&&!capture?8:2});

  progress('Connecting Tidewater’s ocean',91);await nextFrame();
  const water=createWater(scene,renderer,{spacing:overview?18:6});
  const packs=[lagoon,sakura,tide,punk],groups=packs.map(p=>p.group);
  const micro=/grass|flowers|reeds|pebbles|ferns|roots|understory|insects|firefl/i;
  const vegetation=/tree|palm|veg-|forest|bark|foliage|shrubs|bamboo/i;
  const tileObjects=REGIONS.map((r,i)=>{
    const layers={terrain:[terrain.group.children[i]],vegetation:[],structures:[],details:[]};
    groups[i].traverse(o=>{if(!o.isMesh)return;const name=o.name;const category=micro.test(name)?'details':vegetation.test(name)?'vegetation':'structures';layers[category].push(o);});
    return layers;
  });
  // Separate lighting layers keep the walking shadow graph stable when a map pass is rendered.
  const overviewLayer=3,overviewHemi=new THREE.HemisphereLight('#e8f0f5','#706744',1.15),overviewSun=new THREE.DirectionalLight('#fff0d9',2.5);
  overviewHemi.layers.set(overviewLayer);overviewSun.layers.set(overviewLayer);overviewSun.position.set(-450,900,300);scene.add(overviewHemi,overviewSun);
  if(capture){
    overviewSun.castShadow=true;overviewSun.position.set(-650,1500,-900);
    overviewSun.shadow.mapSize.set(4096,4096);
    Object.assign(overviewSun.shadow.camera,{left:-1200,right:1200,top:1200,bottom:-1200,near:1,far:4000});
    overviewSun.shadow.normalBias=.12;overviewSun.shadow.bias=-.00005;
    overviewSun.shadow.camera.layers.enable(overviewLayer);
  }
  scene.traverse(o=>{if(o.isMesh||o.isLine)o.layers.enable(overviewLayer);});
  const defaults=new Map();scene.traverse(o=>defaults.set(o,o.visible));
  const hidden=new Set();
  function setLayerVisible(tile,layer,visible){const key=tile+':'+layer;visible?hidden.delete(key):hidden.add(key);}
  function renderOverview(camera,dt=0,{boundaries=false,mini=false,beforeRender}={}) {
    const changes=[],save=(o,key,value)=>{changes.push([o,key,o[key]]);o[key]=value;};
    save(overviewQuality,'value',1);
    save(scene,'fog',null);save(sky,'visible',false);save(scene,'environmentIntensity',.55);
    const cameraLayers=camera.layers.mask;camera.layers.set(overviewLayer);
    save(terrain.grid,'visible',boundaries&&!mini);
    for(let i=0;i<groups.length;i++) {
      const id=REGIONS[i].id,visible=!hidden.has(id+':tile');save(groups[i],'visible',visible);
      for(const [layer,objects] of Object.entries(tileObjects[i]))for(const o of objects){
        // Preserve source-hidden collision/debug objects; only view-distance culling is overridden.
        save(o,'visible',visible&&layer!=='details'&&!hidden.has(id+':'+layer)&&defaults.get(o));
      }
    }
    const ground=punk.ground,reflection=ground.uniforms.reflectionEnabled.value;
    save(ground.mesh,'visible',false); // The shared terrain supplies the same city floor, without street mirror passes.
    if(punk.rain)save(punk.rain.group,'visible',false);
    let restoreTide=()=>{},restoreCapture=()=>{};
    try {
      if(!mini){worldTime.value+=dt;updateSourceGlobals(dt,worldTime.value,0);water.update(dt);punk.overview(dt,camera);}
      restoreTide=tide.updateOverview(mini?0:dt,camera,renderer);
      // Vegetation's source LOD update may change mesh visibility; apply creator switches afterwards.
      if(hidden.has('tidewater:vegetation')||hidden.has('tidewater:tile'))save(tide.group.children.find(o=>o.name==='Tidewater source trees · overview LOD'),'visible',false);
      tide.vegetation.grass.levels.forEach(l=>l.meshes?.forEach(m=>save(m,'visible',false)));
      restoreCapture=beforeRender?.(scene)??restoreCapture;
      renderer.render(scene,camera);
    } finally {
      restoreCapture();
      restoreTide();
      ground.setReflectionEnabled(!!reflection);camera.layers.mask=cameraLayers;
      for(let i=changes.length-1;i>=0;i--){const [o,k,v]=changes[i];o[k]=v;}
    }
  }
  function dispose(){
    tide.dispose();punk.dispose();water.dispose();
    const geometries=new Set(),materials=new Set(),textures=new Set();
    scene.traverse(o=>{if(o.isMesh){geometries.add(o.geometry);for(const m of [].concat(o.material)){materials.add(m);for(const v of Object.values(m))if(v?.isTexture)textures.add(v);}}});
    geometries.forEach(g=>g.dispose());materials.forEach(m=>m.dispose());textures.forEach(t=>t.dispose());environment.dispose();
  }
  return {scene,sky,skyDay,skyHorizon,hemi,sun,environment,lagoon,sakura,tide,punk,height,terrain,water,
    renderOverview,setLayerVisible,dispose,
    getLayers:()=>REGIONS.map(r=>({id:r.id,components:[{id:'vegetation',label:'Trees & plants'},{id:'structures',label:'Buildings & objects'}]}))};
}
