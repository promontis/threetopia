import * as T from 'three';
import {mergeVertices} from 'three/addons/utils/BufferGeometryUtils.js';
import {createHostMaterial,createHostDepthMaterial} from './host-material.js';
import kit from './host-kit.json' with {type:'json'};
const native=new Map();
function nativeGeometry(name){
 if(!native.has(name)){const data=kit.meshes[name];if(!data)throw Error('Missing host asset '+name);const g=new T.BufferGeometry();g.setAttribute('position',new T.Float32BufferAttribute(data.p,3));g.setAttribute('normal',new T.Float32BufferAttribute(data.n,3));g.setAttribute('color',new T.Float32BufferAttribute(data.c,3));g.setIndex(data.i);native.set(name,g);}return native.get(name);
}
export function meshKit(tile,map=true,detail='tile'){
 const scale=map?.03:1,batches=new Map(),matrix=new T.Matrix4(),normalMatrix=new T.Matrix3(),o=new T.Object3D(),v=new T.Vector3(),n=new T.Vector3();
 const tileRotation=new T.Matrix4().makeRotationY(-tile.rotation*Math.PI/3),color=new T.Color();
 const batch=kind=>{if(!batches.has(kind))batches.set(kind,{p:[],n:[],c:[]});return batches.get(kind);};
 function add(g,kind,position=[0,0,0],size=[1,1,1],rotation=[0,0,0],tint='#ffffff',vertexColors=false){
  o.position.fromArray(position);o.scale.fromArray(size);o.rotation.set(...rotation);o.updateMatrix();matrix.multiplyMatrices(tileRotation,o.matrix);normalMatrix.getNormalMatrix(matrix);color.set(tint);
  const p=g.attributes.position,nn=g.attributes.normal,cc=vertexColors?g.attributes.color:null,b=batch(kind);
  for(let j=0;j<(g.index?.count??p.count);j++){const i=g.index?g.index.getX(j):j;v.fromBufferAttribute(p,i).applyMatrix4(matrix);n.fromBufferAttribute(nn,i).applyMatrix3(normalMatrix).normalize();b.p.push(v.x*scale,v.y*scale,v.z*scale);b.n.push(n.x,n.y,n.z);b.c.push(color.r*(cc?cc.getX(i):1),color.g*(cc?cc.getY(i):1),color.b*(cc?cc.getZ(i):1));}
 }
 const box=(kind,x,y,z,w,h,d,tint,angle=0)=>{const g=new T.BoxGeometry(w,h,d);add(g,kind,[x,y,z],[1,1,1],[0,-angle,0],tint);g.dispose();};
 function rod(kind,a,b,radius,tint,sides=6,endRadius=radius){if(detail==='overview'&&kind==='wood'&&radius<1)return;const aa=new T.Vector3(...a),bb=new T.Vector3(...b),dir=bb.clone().sub(aa),g=new T.CylinderGeometry(endRadius,radius,dir.length(),sides,1);const q=new T.Quaternion().setFromUnitVectors(new T.Vector3(0,1,0),dir.normalize()),e=new T.Euler().setFromQuaternion(q);add(g,kind,aa.add(bb).multiplyScalar(.5).toArray(),[1,1,1],[e.x,e.y,e.z],tint);g.dispose();}
 function polygon(kind,points,top,bottom,tint,side=tint){
  const shape=new T.Shape(points.map(([x,z])=>new T.Vector2(x,-z))),g=new T.ShapeGeometry(shape);g.rotateX(-Math.PI/2);g.translate(0,top,0);add(g,kind,[0,0,0],[1,1,1],[0,0,0],tint);g.dispose();
  if(bottom===undefined)return;
  for(let i=0;i<points.length;i++){const a=points[i],b=points[(i+1)%points.length];quad(kind,[[a[0],top,a[1]],[b[0],top,b[1]],[b[0],bottom,b[1]],[a[0],bottom,a[1]]],side);}
 }
 function quad(kind,points,tint){const g=new T.BufferGeometry();g.setAttribute('position',new T.Float32BufferAttribute([points[0],points[1],points[2],points[0],points[2],points[3]].flat(),3));g.computeVertexNormals();add(g,kind,[0,0,0],[1,1,1],[0,0,0],tint);g.dispose();}
 function ring(kind,x,y,z,radius,tube,tint){const g=new T.TorusGeometry(radius,tube,5,40);add(g,kind,[x,y,z],[1,1,1],[Math.PI/2,0,0],tint);g.dispose();}
 function asset(name,kind,position,size,rotation,tint='#ffffff'){if(detail==='overview'&&name.startsWith('rock-')&&!name.endsWith('-small'))name+='-small';add(nativeGeometry(name),kind,position,Array.isArray(size)?size:[size,size,size],[0,rotation,0],tint,true);}
 function finish(group,sand){
  for(const [kind,b]of batches){if(!b.p.length)continue;let g=new T.BufferGeometry();g.setAttribute('position',new T.Float32BufferAttribute(b.p,3));g.setAttribute('normal',new T.Float32BufferAttribute(b.n,3));g.setAttribute('color',new T.Float32BufferAttribute(b.c,3));const indexed=mergeVertices(g,1e-5*scale);g.dispose();g=indexed;
   const m=createHostMaterial(kind,map?1:.03,sand),mesh=new T.Mesh(g,m);mesh.name='Host '+kind;mesh.castShadow=!['terrain','paths','neon','engine','flowers'].includes(kind);mesh.receiveShadow=!['neon','engine'].includes(kind);mesh.customDepthMaterial=createHostDepthMaterial(kind,map?1:.03);group.add(mesh);
  }
 }
 return {add,box,rod,polygon,quad,ring,asset,finish,detail};
}
