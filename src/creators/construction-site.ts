import * as T from 'three';
import {mergeGeometries} from 'three/addons/utils/BufferGeometryUtils.js';
import {MAP_SCALE} from '../../packages/platform/tiles.js';

/** Temporary editor scenery. The immutable terrain and creator slot stay intact. */
export function createConstructionSite(contract:any){
  const root=new T.Group();root.name='Under construction';
  const regions=contract.slot.regions||[{x:0,z:0,radius:contract.slot.radius}];
  const region=regions.reduce((a:any,b:any)=>a.radius>=b.radius?a:b);
  const site=new T.Group();site.position.set(region.x*MAP_SCALE,(region.floorY??contract.slot.floorY)*MAP_SCALE,region.z*MAP_SCALE);root.add(site);
  const parts:T.BufferGeometry[]=[];
  function part(geometry:T.BufferGeometry,color:string,position:number[],rotation=0){
    const g=geometry.index?geometry.toNonIndexed():geometry;
    if(g!==geometry)geometry.dispose();g.deleteAttribute('uv');g.rotateY(rotation);g.translate(...position as [number,number,number]);
    const c=new T.Color(color),colors=new Float32Array(g.getAttribute('position').count*3);
    for(let i=0;i<colors.length;i+=3)c.toArray(colors,i);
    g.setAttribute('color',new T.BufferAttribute(colors,3));parts.push(g);
  }
  const dark='#37423d',amber='#f1ba55';
  for(const [x,z,angle] of [[-.8,.6,.15],[.85,-.55,-.3]]){
    const p=(dx:number,y:number,dz:number)=>[x+Math.cos(angle)*dx+Math.sin(angle)*dz,y,z-Math.sin(angle)*dx+Math.cos(angle)*dz];
    part(new T.BoxGeometry(1.6,.28,.075),amber,p(0,.4,0),angle);
    for(const dx of [-.58,.58]){
      part(new T.BoxGeometry(.065,.53,.075),dark,p(dx,.265,0),angle);
      part(new T.BoxGeometry(.26,.06,.42),dark,p(dx,.03,0),angle);
    }
    // Flush black diagonals on both sides; separate enough to avoid z-fighting.
    for(const dx of [-.56,-.16,.24])for(const side of [-1,1]){
      const shape=new T.Shape();shape.moveTo(dx,-.14);shape.lineTo(dx+.14,-.14);shape.lineTo(dx+.32,.14);shape.lineTo(dx+.18,.14);shape.closePath();
      part(new T.ShapeGeometry(shape),dark,p(0,.4,side*.04),angle);
    }
  }
  const geometry=mergeGeometries(parts)!;for(const p of parts)p.dispose();
  const barriers=new T.Mesh(geometry,new T.MeshStandardMaterial({vertexColors:true,roughness:.85,side:T.DoubleSide}));
  barriers.name='Construction barriers';barriers.castShadow=true;barriers.receiveShadow=true;
  barriers.rotation.y=-(contract.rotation||0)*Math.PI/3;site.add(barriers);

  const canvas=document.createElement('canvas');canvas.width=768;canvas.height=128;
  const ctx=canvas.getContext('2d')!;
  const font='500 52px "Geist", sans-serif';ctx.font=font;
  canvas.width=Math.ceil(95+ctx.measureText('Under construction').width+34);
  ctx.fillStyle='#233a35';ctx.beginPath();ctx.roundRect(2,2,canvas.width-4,124,36);ctx.fill();
  ctx.fillStyle=amber;ctx.beginPath();ctx.arc(57,64,13,0,Math.PI*2);ctx.fill();
  ctx.fillStyle='#fff9e9';ctx.font=font;ctx.textBaseline='middle';ctx.fillText('Under construction',95,66);
  const texture=new T.CanvasTexture(canvas);texture.colorSpace=T.SRGBColorSpace;
  const label=new T.Sprite(new T.SpriteMaterial({map:texture,transparent:true,depthWrite:false,toneMapped:false}));
  label.name='Under construction label';label.userData.skipWaterCapture=true;
  label.scale.set(5.7,5.7*canvas.height/canvas.width,1);label.position.y=1.7;site.add(label);

  const guide=new T.Group();guide.name='Reserved build area';guide.visible=false;root.add(guide);
  for(const r of regions){
    const ring=new T.Mesh(new T.RingGeometry((r.radius-.55)*MAP_SCALE,(r.radius+.55)*MAP_SCALE,96),new T.MeshBasicMaterial({color:'#e9e8cc',transparent:true,opacity:.38,side:T.DoubleSide,depthWrite:false}));
    ring.rotation.x=-Math.PI/2;ring.position.set(r.x*MAP_SCALE,((r.floorY??contract.slot.floorY)+1.5)*MAP_SCALE,r.z*MAP_SCALE);ring.userData.skipWaterCapture=true;guide.add(ring);
  }
  return root;
}
