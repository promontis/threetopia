import * as THREE from 'three/webgpu';
import { attribute, color, cos, mix, positionGeometry, positionWorld, sin, texture, vec2, vec3 } from 'three/tsl';
import { HDRLoader } from 'three/addons/loaders/HDRLoader.js';
import { loadCapturedPackage } from '../../explore/package-loader.ts';
import { REGIONS } from '../../explore/config.ts';
import { sampleHeightfield } from '../../explore/heightfield.ts';
import { overviewQuality, worldTime, windStrength } from '../../explore/materials.js';
import { LAGOON_TILE, APOTHEM, corners, edges, compactHeight, neighbourHeight } from './layout.ts';

/** Actual Lagoon source assets with a new terrain footprint. No model scaling or invented scenery. */
export async function createCompactLagoon(progress = () => {}) {
  const scene = new THREE.Scene();
  const pack = await loadCapturedPackage(REGIONS[0], progress);
  pack.group.position.set(-LAGOON_TILE.sourceCenter.x, 0, -LAGOON_TILE.sourceCenter.z);
  const clipped = new THREE.ClippingGroup();
  clipped.name = 'Compact Lagoon tile';
  clipped.clippingPlanes = edges.map(e => new THREE.Plane(new THREE.Vector3(-e.nx, 0, -e.nz), APOTHEM));
  clipped.clippingPlanes.push(new THREE.Plane(new THREE.Vector3(0, 1, 0), -.025));
  clipped.add(pack.group);scene.add(clipped);
  const heightAt = (x,z) => compactHeight(pack.field,x,z);
  // The original distant cliffs and scatter were background scenery. Retain the
  // village, its ten trees, five houses, bridges, palms and actual waterfall.
  for (const mesh of pack.meshes) {
    if (mesh.name === 'rocks-big:far') { mesh.visible = false;continue; }
    if (/^veg-grass/.test(mesh.name)) {
      const roots=mesh.geometry.attributes.iPos.clone();mesh.geometry.setAttribute('iPos',roots);
      for(let i=0;i<roots.count;i++){
        const x=roots.getX(i),z=roots.getZ(i);
        roots.setY(i,roots.getY(i)+heightAt(x-LAGOON_TILE.sourceCenter.x,z-LAGOON_TILE.sourceCenter.z)-sampleHeightfield(pack.field,x,z));
      }
      // Same captured grass and wind as the walking source. Keep the cards at
      // their actual height when baking from an orthographic camera far above.
      const p=positionGeometry,base=attribute('iPos','vec4'),shape=attribute('iShape','vec4'),lean=attribute('aLean','vec2');
      const phase=base.x.mul(.371).add(base.z.mul(.529)),cy=cos(base.w),sy=sin(base.w),h=p.y;
      const local=p.xz.mul(shape.x).add(lean.mul(shape.z).mul(shape.y).mul(h.pow(2)));
      const gust=sin(worldTime.mul(.55).sub(base.x.mul(.024)).sub(base.z.mul(.065))).mul(.45).add(.55);
      const bend=sin(worldTime.mul(1.8).add(phase)).mul(.12).add(gust.mul(.8)).add(.25).mul(windStrength).mul(h.pow(2)).mul(shape.y).mul(.55);
      mesh.material.positionNode=vec3(base.x.add(local.x.mul(cy).sub(local.y.mul(sy))).add(bend.mul(.35)),base.y.add(shape.y.mul(h)).sub(bend.pow(2).mul(.25)),base.z.add(local.x.mul(sy).add(local.y.mul(cy))).add(bend.mul(.94)));
      continue;
    }
    if (!/^(rocks-|veg-plants|palm|trails:|waterfall-streams)/.test(mesh.name)) continue;
    // Move source rock/plant roots with the coastal strip instead of leaving a
    // floating cut-out above the new shore. Clone attributes: packed buffers can be shared.
    const position = mesh.geometry.attributes.position.clone();
    mesh.geometry.setAttribute('position',position);
    for (let i=0;i<position.count;i++) {
      const x=position.getX(i), z=position.getZ(i);
      const delta=heightAt(x-LAGOON_TILE.sourceCenter.x,z-LAGOON_TILE.sourceCenter.z)-sampleHeightfield(pack.field,x,z);
      position.setY(i,position.getY(i)+delta);
    }
    position.needsUpdate=true;mesh.geometry.computeVertexNormals();mesh.geometry.computeBoundingSphere();
  }
  overviewQuality.value=1;
  const material=new THREE.MeshStandardNodeMaterial({roughness:.96});
  const p=positionWorld, b=pack.field.bounds;
  const sourceUV=vec2(p.x.add(LAGOON_TILE.sourceCenter.x-b[0]).div(b[2]-b[0]),p.z.add(LAGOON_TILE.sourceCenter.z-b[1]).div(b[3]-b[1]).oneMinus());
  const grain=sin(p.x.mul(2.7).add(sin(p.z.mul(3.1)))).mul(.025).add(1);
  material.colorNode=mix(color('#c7b892').mul(grain),texture(pack.atlas,sourceUV).rgb,p.y.smoothstep(.2,2));
  const positions=[],indices=[];
  const steps=115;
  for(let side=0;side<6;side++) {
    const a=corners[side],b=corners[(side+1)%6],rows=[];
    for(let i=0;i<=steps;i++) {
      rows[i]=positions.length/3;
      for(let j=0;j<=steps-i;j++) {
        const x=(a.x*i+b.x*j)/steps,z=(a.z*i+b.z*j)/steps;
        positions.push(x,heightAt(x,z),z);
      }
    }
    for(let i=0;i<steps;i++)for(let j=0;j<steps-i;j++) {
      const a=rows[i]+j,b=rows[i+1]+j,c=a+1;indices.push(a,c,b);
      if(j<steps-i-1)indices.push(c,rows[i+1]+j+1,b);
    }
  }
  const geometry=new THREE.BufferGeometry();geometry.setAttribute('position',new THREE.Float32BufferAttribute(positions,3));geometry.setIndex(indices);geometry.computeVertexNormals();
  const terrain=new THREE.Mesh(geometry,material);terrain.name='Lagoon compact terrain';terrain.receiveShadow=true;clipped.add(terrain);
  const connections=new THREE.ClippingGroup();connections.name='Neighbour edge samples';
  connections.clippingPlanes=[new THREE.Plane(new THREE.Vector3(0,1,0),-.025)];scene.add(connections);
  for(const e of edges.filter(e=>e.connected)) {
    const positions=[],indices=[],width=80,depth=38;
    for(let d=0;d<=depth;d++)for(let u=0;u<=width;u++) {
      // A one-metre image gutter sits beneath Lagoon. Without overlap, two
      // separately antialiased alpha edges let a hairline of sea show through.
      const outward=d-1,along=u-width/2,x=e.nx*(APOTHEM+outward)-e.nz*along,z=e.nz*(APOTHEM+outward)+e.nx*along;
      positions.push(x,outward<0?heightAt(x,z):neighbourHeight(outward,along),z);
    }
    for(let d=0;d<depth;d++)for(let u=0;u<width;u++) {
      const a=d*(width+1)+u,b=a+width+1;indices.push(a,a+1,b,a+1,b+1,b);
    }
    const g=new THREE.BufferGeometry();g.setAttribute('position',new THREE.Float32BufferAttribute(positions,3));g.setIndex(indices);g.computeVertexNormals();
    const m=new THREE.Mesh(g,material);m.name=`Neighbour sample ${e.id}`;m.receiveShadow=true;connections.add(m);
  }
  connections.visible=false;
  const hemi=new THREE.HemisphereLight('#d8e9e7','#807459',1.2),sun=new THREE.DirectionalLight('#fff1d5',2.6);
  sun.position.set(-130,230,-170);sun.castShadow=true;
  sun.shadow.mapSize.set(4096,4096);Object.assign(sun.shadow.camera,{left:-170,right:170,top:170,bottom:-170,near:1,far:600});
  sun.shadow.bias=-.00005;sun.shadow.normalBias=.04;scene.add(hemi,sun);
  const environment=await new HDRLoader().loadAsync('/world-assets/punk/hdri/sunflowers_puresky_1k.hdr');
  environment.mapping=THREE.EquirectangularReflectionMapping;scene.environment=environment;scene.environmentIntensity=.45;
  return {scene,pack,terrain,connections,heightAt};
}
