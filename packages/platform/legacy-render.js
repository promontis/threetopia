import * as THREE from 'three';
import {corners,terrainHeight,SLOT,MAP_SCALE} from './legacy-tiles.js';
/** Both map and world host tiles use this same geometry recipe. */
export function createHostTile(contract,{map=false,ghost=false,slot=false}={}){
  const group=new THREE.Group(),positions=[],colors=[],scale=map?MAP_SCALE:1,cs=corners(),base=new THREE.Color(contract.recipe.color),stone=new THREE.Color('#788378');
  function vertex(p){const y=terrainHeight(p[0],p[1],contract.recipe,contract.boundaries);positions.push(p[0]*scale,y*scale,p[1]*scale);const c=base.clone().lerp(stone,Math.max(0,(y-SLOT.floorY)/55)).multiplyScalar(.95+.06*Math.sin(p[0]*.06+p[1]*.04));colors.push(c.r,c.g,c.b);}
  const n=24;
  for(let s=0;s<6;s++){const a=cs[s],b=cs[(s+1)%6],at=(i,j)=>[(a[0]*i+b[0]*j)/n,(a[1]*i+b[1]*j)/n];for(let i=0;i<n;i++)for(let j=0;j<n-i;j++){[at(i,j),at(i,j+1),at(i+1,j)].forEach(vertex);if(i+j<n-1)[at(i+1,j),at(i,j+1),at(i+1,j+1)].forEach(vertex);}}
  const geometry=new THREE.BufferGeometry();geometry.setAttribute('position',new THREE.Float32BufferAttribute(positions,3));geometry.setAttribute('color',new THREE.Float32BufferAttribute(colors,3));geometry.computeVertexNormals();
  const mesh=new THREE.Mesh(geometry,new THREE.MeshStandardMaterial({vertexColors:true,roughness:.95,transparent:ghost,opacity:ghost?.38:1,depthWrite:!ghost,side:THREE.DoubleSide}));mesh.receiveShadow=true;mesh.castShadow=true;mesh.name='Threetopia host tile (locked)';group.add(mesh);
  if(!ghost){const wallP=[];for(let i=0;i<6;i++){const a=cs[i],b=cs[(i+1)%6];for(let j=0;j<24;j++){const x0=a[0]+(b[0]-a[0])*j/24,z0=a[1]+(b[1]-a[1])*j/24,x1=a[0]+(b[0]-a[0])*(j+1)/24,z1=a[1]+(b[1]-a[1])*(j+1)/24,y0=terrainHeight(x0,z0,contract.recipe,contract.boundaries),y1=terrainHeight(x1,z1,contract.recipe,contract.boundaries),bottom=Math.min(-340,y0-12,y1-12);for(const p of [[x0,y0,z0],[x1,bottom,z1],[x1,y1,z1],[x0,y0,z0],[x0,bottom,z0],[x1,bottom,z1]])wallP.push(...p.map(v=>v*scale));}}const g=new THREE.BufferGeometry();g.setAttribute('position',new THREE.Float32BufferAttribute(wallP,3));g.computeVertexNormals();const wall=new THREE.Mesh(g,new THREE.MeshStandardMaterial({color:'#748775',roughness:1,side:THREE.DoubleSide}));wall.castShadow=true;group.add(wall);}

  if(slot){const ring=new THREE.Mesh(new THREE.RingGeometry((SLOT.radius-1)*scale,SLOT.radius*scale,96),new THREE.MeshBasicMaterial({color:'#faffea',transparent:true,opacity:.8,side:THREE.DoubleSide}));ring.rotation.x=-Math.PI/2;ring.position.y=(SLOT.floorY+.3)*scale;group.add(ring);}
  return group;
}
export function disposeObject(root){const geometries=new Set(),materials=new Set(),textures=new Set();root.traverse(o=>{if(o.geometry)geometries.add(o.geometry);if(o.customDepthMaterial)materials.add(o.customDepthMaterial);for(const m of (Array.isArray(o.material)?o.material:o.material?[o.material]:[])){materials.add(m);for(const v of Object.values(m))if(v?.isTexture)textures.add(v);}});for(const g of geometries)g.dispose();for(const m of materials)m.dispose();for(const t of textures)t.dispose();root.removeFromParent();}
