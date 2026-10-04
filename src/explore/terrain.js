import * as THREE from 'three/webgpu';
import { attribute, color, mix, positionWorld, sin, texture, vec2, vec4, uv } from 'three/tsl';
import { buildHexTopology } from './hex-world.ts';
import { HEX_RADIUS, REGIONS, trailHalfWidth } from './config.ts';
import { mergeGeometries } from 'three/addons/utils/BufferGeometryUtils.js';

export function createTerrain(scene,height,packages,{spacing=2}={}) {
  const topology=buildHexTopology(),group=new THREE.Group();group.name='Four level tiles · matching Wang edges';
  const mat=new THREE.MeshStandardNodeMaterial({roughness:.94});
  const w=attribute('regionWeight','vec4'),p=positionWorld;
  const grain=sin(p.x.mul(2.7).add(sin(p.z.mul(3.1)))).mul(.035).add(1);
  const cover=sin(p.x.mul(.014).add(sin(p.z.mul(.02)))).mul(sin(p.z.mul(.019))).mul(.5).add(.5);
  let surface=mix(color('#496348'),color('#88926a'),cover).mul(grain);
  for(let i=0;i<2;i++) {
    const r=REGIONS[i],b=r.bounds,offset=r.origin;
    const uv=vec2(p.x.sub(offset[0]+b[0]).div(b[2]-b[0]),p.z.sub(offset[2]+b[1]).div(b[3]-b[1]).oneMinus());
    surface=mix(surface,texture(packages[i].atlas,uv).rgb,w.element(i));
  }
  const tide=mix(color('#aca481'),color('#58643b'),p.y.smoothstep(2,7)).mul(grain);
  surface=mix(surface,tide,w.z);surface=mix(surface,color('#333744').mul(grain),w.w);
  const slope=attribute('normal','vec3').y;
  surface=mix(color('#777a6b').mul(grain),surface,slope.smoothstep(.55,.85));
  surface=mix(color('#c4b58d').mul(grain),surface,p.y.smoothstep(.25,1.8));
  mat.colorNode=vec4(surface,1);
  const gridMat=new THREE.LineBasicMaterial({color:'#f9d996',transparent:true,opacity:.46,depthWrite:false});const grid=new THREE.Group();grid.visible=false;
  // Preserve the original ~2 m surface detail inside each much larger level tile.
  const n=Math.ceil(HEX_RADIUS/spacing);
  for(const cell of topology.cells) {
    const pos=[],norm=[],weights=[],indices=[];
    for(let side=0;side<6;side++) {
      const c=cell.center,a=cell.corners[side],b=cell.corners[(side+1)%6],base=pos.length/3,rows=[];
      for(let i=0;i<=n;i++) {
        rows[i]=pos.length/3;
        for(let j=0;j<=n-i;j++) {
          const x=Math.round((c.x+(a.x-c.x)*i/n+(b.x-c.x)*j/n)*1e6)/1e6,z=Math.round((c.z+(a.z-c.z)*i/n+(b.z-c.z)*j/n)*1e6)/1e6;
          const y=height.heightAt(x,z);pos.push(x,y,z);
          const v=new THREE.Vector3(height.heightAt(x-.4,z)-height.heightAt(x+.4,z),.8,height.heightAt(x,z-.4)-height.heightAt(x,z+.4)).normalize();norm.push(v.x,v.y,v.z);weights.push(...height.weights(x,z));
        }
      }
      for(let i=0;i<n;i++)for(let j=0;j<n-i;j++) {
        const a0=rows[i]+j,b0=rows[i+1]+j,c0=a0+1;indices.push(a0,c0,b0);
        if(j<n-i-1)indices.push(c0,rows[i+1]+j+1,b0);
      }
    }
    const g=new THREE.BufferGeometry();g.setAttribute('position',new THREE.Float32BufferAttribute(pos,3));g.setAttribute('normal',new THREE.Float32BufferAttribute(norm,3));g.setAttribute('regionWeight',new THREE.Float32BufferAttribute(weights,4));g.setIndex(indices);g.computeBoundingSphere();
    const mesh=new THREE.Mesh(g,mat);mesh.name=`${cell.region.short} tile (${cell.q},${cell.r})`;mesh.userData.tile=cell.region.id;mesh.receiveShadow=true;group.add(mesh);
    const line=[];
    for(let side=0;side<6;side++) {
      const a=cell.corners[side],b=cell.corners[(side+1)%6];for(let i=0;i<100;i++)for(const t of [i/100,(i+1)/100]){const x=a.x+(b.x-a.x)*t,z=a.z+(b.z-a.z)*t;line.push(x,Math.max(.12,height.heightAt(x,z)+.08),z);}
    }
    const lineGeo=new THREE.BufferGeometry();lineGeo.setAttribute('position',new THREE.Float32BufferAttribute(line,3));grid.add(new THREE.LineSegments(lineGeo,gridMat));
  }
  scene.add(group,grid);
  const deckGeos=[],supportGeos=[],seen=new Set();
  for(const trail of height.trails.values())for(let i=1;i<trail.route.length;i++) {
    const a=trail.route[i-1],b=trail.route[i],key=[a.x,a.z,a.y,b.x,b.z,b.y].map(n=>n.toFixed(5)).join(',');
    if(seen.has(key))continue;seen.add(key);
    const dx=b.x-a.x,dz=b.z-a.z,len=Math.hypot(dx,dz),width=trailHalfWidth(a.x,a.z),nx=-dz/len*width,nz=dx/len*width;
    const g=new THREE.BufferGeometry();g.setAttribute('position',new THREE.Float32BufferAttribute([a.x+nx,a.y,a.z+nz,a.x-nx,a.y,a.z-nz,b.x+nx,b.y,b.z+nz,b.x-nx,b.y,b.z-nz],3));g.setAttribute('uv',new THREE.Float32BufferAttribute([0,a.distance,1,a.distance,0,b.distance,1,b.distance],2));g.setIndex([0,2,1,1,2,3]);g.computeVertexNormals();deckGeos.push(g);
    if(i%5===0&&a.y-height.base(a.x,a.z)>.65)for(const sign of [-1,1]){const bottom=height.base(a.x+nx*sign,a.z+nz*sign),h=a.y-bottom;const pole=new THREE.BoxGeometry(.16,h,.16);pole.translate(a.x+nx*sign,bottom+h/2,a.z+nz*sign);supportGeos.push(pole);}
  }
  const deckMat=new THREE.MeshStandardNodeMaterial({roughness:.88,side:THREE.DoubleSide});
  // A continuous distance coordinate joins plank spacing at tile boundaries.
  const planks=mix(color('#665640'),color('#a6926f'),sin(uv().y.mul(25)).smoothstep(-.96,-.85));
  const city=REGIONS[3],cx=positionWorld.x.sub(city.origin[0]),cz=positionWorld.z.sub(city.origin[2]);
  const cityBlend=cx.smoothstep(-215,-175).mul(cx.smoothstep(city.bounds[2]-35,city.bounds[2]).oneMinus()).mul(cz.smoothstep(city.bounds[1],city.bounds[1]+35)).mul(cz.smoothstep(city.bounds[3]-35,city.bounds[3]).oneMinus());
  deckMat.colorNode=mix(planks,color('#3a3e47'),cityBlend);
  const deck=new THREE.Mesh(mergeGeometries(deckGeos),deckMat);deck.name='Paths from the central tile';deck.receiveShadow=true;deck.castShadow=true;scene.add(deck);deckGeos.forEach(g=>g.dispose());
  if(supportGeos.length){const supports=new THREE.Mesh(mergeGeometries(supportGeos),new THREE.MeshStandardMaterial({color:'#63533a',roughness:1}));supports.name='Trail trestles';scene.add(supports);supportGeos.forEach(g=>g.dispose());}
  return{topology,group,grid,deck};
}
