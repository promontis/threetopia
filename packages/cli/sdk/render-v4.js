import * as T from 'three';
import {corners,MAP_SCALE} from './legacy-tiles.js';
import {STYLES as oldStyles} from './wang-v3.js';
import {DESIGN_STYLES,designFor} from './tile-designs.js';
import {designHeight,rotate,waterDistance} from './wang-v4.js';
import {meshKit} from './host-mesh.js';
import {dressHost} from './host-dressing.js';
import {routes,infrastructure} from './host-infrastructure.js';
import {bakeHostPaths,pathTexture,applyHostPaths} from './host-paths.js';
const styles={...oldStyles,...DESIGN_STYLES},clamp=x=>Math.max(0,Math.min(1,x));
export function designColor(tile,x,z,height){
 const d=designFor(tile),s=styles[d.family],land=new T.Color(s.land),sand=new T.Color(s.sand),w=rotate([x,z],tile.rotation),distance=waterDistance(tile,...w);
 if(d.floating)return new T.Color('#8c9e9b');
 if(d.kind==='oasis')return sand.multiplyScalar(.94+.045*Math.sin(x*.067+z*.032));
 if(['canal','boulevard','docks','marina','terraces'].includes(d.kind))return new T.Color(d.kind==='docks'?'#8c928a':d.kind==='boulevard'?'#c0bfae':d.kind==='canal'?'#b9b8a5':'#cbbfa1');
 if(d.kind==='basalt')return new T.Color('#818981').lerp(land,.15).multiplyScalar(.92+.09*Math.sin(x*.052)*Math.cos(z*.076));
 const plot=tile.slot.regions.some(r=>Math.hypot(w[0]-r.x,w[1]-r.z)<r.radius+10);
 if(d.kind==='inlet'&&plot)return sand.multiplyScalar(.97);
 const greenness=(plot?1:clamp((distance-24)/28))*clamp((height-14)/10),variation=.93+.09*Math.sin(x*.044+.4)*Math.cos(z*.053-.8);
 return sand.lerp(land,greenness).multiplyScalar(variation);
}
export function createDesignHost(tile,{map=false,ghost=false,slot=false,detail='tile'}={}){
 const group=new T.Group(),kit=meshKit(tile,map,detail),d=designFor(tile),scale=map?MAP_SCALE:1,cs=corners(),n=map?(detail==='overview'?20:42):84,points=[],colors=[],indices=[],cache=new Map();
 group.name='Threetopia '+d.title;group.userData.contract=tile;
 function vertex(x,z){const key=`${x.toFixed(5)}:${z.toFixed(5)}`;if(cache.has(key))return cache.get(key);const w=rotate([x,z],tile.rotation),y=d.kind==='terraces'?Math.min(24,designHeight(tile,...w)):designHeight(tile,...w),i=points.length/3;points.push(x,y,z);colors.push(...designColor(tile,x,z,y).toArray());cache.set(key,i);return i;}
 for(let side=0;side<6;side++){
  const a=cs[side],b=cs[(side+1)%6],at=(i,j)=>vertex((a[0]*i+b[0]*j)/n,(a[1]*i+b[1]*j)/n);
  for(let i=0;i<n;i++)for(let j=0;j<n-i;j++){indices.push(at(i,j),at(i,j+1),at(i+1,j));if(i+j<n-1)indices.push(at(i+1,j),at(i,j+1),at(i+1,j+1));}
 }
 const g=new T.BufferGeometry();g.setAttribute('position',new T.Float32BufferAttribute(points,3));g.setAttribute('color',new T.Float32BufferAttribute(colors,3));g.setIndex(indices);g.computeVertexNormals();kit.add(g,'terrain',[0,0,0],[1,1,1],[0,0,0],'#ffffff',true);g.dispose();
 group.userData.crossings=routes(tile,kit);infrastructure(tile,kit);group.userData.dressing=dressHost(tile,kit);
 kit.finish(group,styles[d.family].sand);
 if(!d.floating){
  const pathMask=bakeHostPaths(tile);group.userData.pathMask=pathMask;
  const material=group.getObjectByName('Host terrain').material;
  applyHostPaths(material,pathTexture(pathMask),{finish:['canal','docks','boulevard','marina','terraces'].includes(d.kind)?'paved':'natural',pathColor:['canal','boulevard','docks','marina','terraces'].includes(d.kind)?'#b2b3a2':d.kind==='oasis'?'#d8c49e':d.kind==='basalt'?'#7b8580':'#c5b38b',sand:styles[d.family].sand});
 }
 if(ghost)group.traverse(o=>{if(o.isMesh){o.material.transparent=true;o.material.opacity=.3;o.material.depthWrite=false;o.castShadow=false;}});
 for(const mesh of group.children)mesh.userData.hostLOD=detail;
 if(slot)for(const r of tile.slot.regions){
  const geom=new T.RingGeometry((r.radius-.55)*scale,(r.radius+.55)*scale,96,1,0,Math.PI*2),m=new T.MeshBasicMaterial({color:'#e9e8cc',transparent:true,opacity:.38,side:T.DoubleSide,depthWrite:false});
  const mesh=new T.Mesh(geom,m);mesh.rotation.x=-Math.PI/2;mesh.position.set(r.x*scale,(r.floorY+1.5)*scale,r.z*scale);mesh.name='Creator build area';group.add(mesh);
 }
 return group;
}
