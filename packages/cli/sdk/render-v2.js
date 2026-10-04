import * as T from 'three';
import {mergeVertices} from 'three/addons/utils/BufferGeometryUtils.js';
import {corners,MAP_SCALE} from './legacy-tiles.js';
import {STYLES,hostHeight,tileFootprint} from './wang-v2.js';
import {createHostTile as legacyHost} from './legacy-render.js';
export {disposeObject} from './legacy-render.js';
/** Fixed terrain, routes, water beds and platforms; creator content is separate. */
export function createHostTile(tile,{map=false,ghost=false,slot=false}={}){
  if(tile.version!==2){const host=legacyHost(tile,{map,ghost,slot});host.userData.contract=tile;return host;}
  const group=new T.Group(),scale=map?MAP_SCALE:1,style=STYLES[tile.recipe.family],cs=corners();
  group.name='Threetopia Wang host';group.userData.contract=tile;
  const batches=new Map();
  const material=(id,color,extra={})=>{if(!batches.has(id))batches.set(id,{p:[],c:[],material:new T.MeshStandardMaterial({color,roughness:.88,...extra})});return id;};
  const ground=material('terrain','#ffffff',{vertexColors:true}),walls=material('bedrock',style.rock),road=material('paths',style.path),metal=material('bridge structure',style.rock,{metalness:.22,roughness:.65});
  const neon=material('cyan support rings','#59e6ef',{emissive:'#43ddea',emissiveIntensity:2,toneMapped:false});
  function triangle(id,a,b,c,colors){const batch=batches.get(id);for(const [i,p] of [a,b,c].entries()){batch.p.push(...p.map(v=>v*scale));if(colors)batch.c.push(...colors[i]);}}
  const quad=(id,a,b,c,d)=>{triangle(id,a,b,c);triangle(id,a,c,d);};
  function box(id,x,y,z,w,h,d,angle=0){const c=Math.cos(angle),s=Math.sin(angle),p=(i,j,k)=>[x+i*w/2*c-k*d/2*s,y+j*h/2,z+i*w/2*s+k*d/2*c],v=[p(-1,-1,-1),p(1,-1,-1),p(1,1,-1),p(-1,1,-1),p(-1,-1,1),p(1,-1,1),p(1,1,1),p(-1,1,1)];for(const [a,b,c,d]of [[0,3,2,1],[4,5,6,7],[0,4,7,3],[1,2,6,5],[0,1,5,4],[3,7,6,2]])quad(id,v[a],v[b],v[c],v[d]);}
  const base=new T.Color(style.land),sand=new T.Color(style.sand),rock=new T.Color(style.rock),cache=new Map();
  function vertex(p){const k=p.map(x=>Math.round(x*1e5)).join(',');if(cache.has(k))return cache.get(k);
    const y=hostHeight(tile,p[0],p[1]),color=base.clone().lerp(sand,1-T.MathUtils.smoothstep(y,2,23)).lerp(rock,T.MathUtils.smoothstep(y,39,85)).multiplyScalar(.97+.025*Math.sin(p[0]*.08)*Math.cos(p[1]*.06));
    const v={p:[p[0],y,p[1]],c:color.toArray()};cache.set(k,v);return v;}
  const n=map?24:48;
  for(let s=0;s<6;s++){const a=cs[s],b=cs[(s+1)%6],at=(i,j)=>vertex([(a[0]*i+b[0]*j)/n,(a[1]*i+b[1]*j)/n]);
    const face=(...vs)=>triangle(ground,...vs.map(v=>v.p),vs.map(v=>v.c));
    for(let i=0;i<n;i++)for(let j=0;j<n-i;j++){face(at(i,j),at(i,j+1),at(i+1,j));if(i+j<n-1)face(at(i+1,j),at(i,j+1),at(i+1,j+1));}}
  for(let e=0;e<6;e++)for(let j=0;j<24;j++){const a=cs[e],b=cs[(e+1)%6],p=t=>[a[0]+(b[0]-a[0])*t,a[1]+(b[1]-a[1])*t],v0=vertex(p(j/24)).p,v1=vertex(p((j+1)/24)).p;quad(walls,v0,[v0[0],-90,v0[2]],[v1[0],-90,v1[2]],v1);}
  const routes=tileFootprint(tile).routes;
  for(const route of routes){const points=map?route.filter((_,i)=>i%3===0||i===route.length-1):route;for(let i=1;i<points.length;i++){
    const a=points[i-1],b=points[i],dx=b[0]-a[0],dz=b[2]-a[2],length=Math.hypot(dx,dz);if(length<.001)continue;
    const nx=-dz/length*11,nz=dx/length*11,y0=a[1]+.65,y1=b[1]+.65;
    quad(road,[a[0]+nx,y0,a[2]+nz],[b[0]+nx,y1,b[2]+nz],[b[0]-nx,y1,b[2]-nz],[a[0]-nx,y0,a[2]-nz]);
    const x=(a[0]+b[0])/2,z=(a[2]+b[2])/2,bed=hostHeight(tile,x,z,{paths:false}),y=(y0+y1)/2;
    if(bed<y-6||tile.recipe.layout==='skyport'){
      // Solid bridge deck and slim railings, merged into two shared meshes.
      for(const sign of [-1,1])quad(metal,[a[0]+nx*sign,y0-.2,a[2]+nz*sign],[b[0]+nx*sign,y1-.2,b[2]+nz*sign],[b[0]+nx*sign,y1-4,b[2]+nz*sign],[a[0]+nx*sign,y0-4,a[2]+nz*sign]);
      quad(metal,[a[0]+nx,y0-4,a[2]+nz],[b[0]+nx,y1-4,b[2]+nz],[b[0]-nx,y1-4,b[2]-nz],[a[0]-nx,y0-4,a[2]-nz]);
      for(const sign of [-1,1]){box(metal,x+nx*sign,y+4,z+nz*sign,length+1,1.2,1.2,Math.atan2(dz,dx));if(i%3===0)box(metal,x+nx*sign,y+2,z+nz*sign,1.5,5,1.5);}
      if(i%5===0&&tile.recipe.layout!=='skyport')box(metal,x,(y+bed)/2,z,5,y-bed,5);
    }
  }
  }
  if(['harbor','canal'].includes(tile.recipe.layout)){
    const angle=tile.rotation*Math.PI/3,c=Math.cos(angle),s=Math.sin(angle);
    const quay=(x,z,w,d)=>{const rx=x*c-z*s,rz=x*s+z*c;box(metal,rx,-4,rz,w,56,d,angle);box(road,rx,24.3,rz,w+3,.5,d+3,angle);};
    if(tile.recipe.layout==='harbor'){quay(39,0,6,220);quay(131,110,190,6);quay(131,-110,190,6);}
    else {quay(0,37,380,5);quay(0,-37,380,5);}
  }
  if(tile.recipe.layout==='skyport'){
    const deck=material('floating deck',style.land,{metalness:.35,roughness:.6});
    // An actual suspended deck: no terrain mound hidden underneath it.
    for(let i=0;i<6;i++){const a=cs[i].map(v=>v*.52),b=cs[(i+1)%6].map(v=>v*.52);triangle(deck,[0,36,0],[b[0],36,b[1]],[a[0],36,a[1]]);quad(metal,[a[0],36,a[1]],[b[0],36,b[1]],[b[0],24,b[1]],[a[0],24,a[1]]);}
    for(let i=0;i<3;i++){const a=i*Math.PI*2/3,x=Math.cos(a)*122,z=Math.sin(a)*122;for(let ring=0;ring<3;ring++){
      const radius=23-ring*3,y=18-ring*7;for(let k=0;k<32;k++){const a=k*Math.PI/16,b=(k+1)*Math.PI/16;quad(neon,[x+Math.cos(a)*radius,y,z+Math.sin(a)*radius],[x+Math.cos(b)*radius,y,z+Math.sin(b)*radius],[x+Math.cos(b)*(radius-2.4),y,z+Math.sin(b)*(radius-2.4)],[x+Math.cos(a)*(radius-2.4),y,z+Math.sin(a)*(radius-2.4)]);}
    }}
  }
  for(const [name,b]of batches){if(!b.p.length){b.material.dispose();continue;}
    let g=new T.BufferGeometry();g.setAttribute('position',new T.Float32BufferAttribute(b.p,3));if(b.c.length)g.setAttribute('color',new T.Float32BufferAttribute(b.c,3));if(name==='terrain'){const smooth=mergeVertices(g,scale*.001);g.dispose();g=smooth;}g.computeVertexNormals();
    b.material.side=T.DoubleSide;if(ghost){b.material.transparent=true;b.material.opacity=.35;b.material.depthWrite=false;}
    const mesh=new T.Mesh(g,b.material);mesh.name=name;mesh.castShadow=!ghost&&name!=='terrain'&&name!=='paths'&&name!=='floating deck';mesh.receiveShadow=true;group.add(mesh);
  }
  if(slot)for(const r of tile.slot.regions){const mesh=new T.Mesh(new T.RingGeometry((r.radius-1)*scale,r.radius*scale,64),new T.MeshBasicMaterial({color:'#efffdd',transparent:true,opacity:.85,side:T.DoubleSide,depthWrite:false}));mesh.rotation.x=-Math.PI/2;mesh.position.set(r.x*scale,(tile.slot.floorY+1)*scale,r.z*scale);mesh.name='Creator build area';group.add(mesh);}
  return group;
}
