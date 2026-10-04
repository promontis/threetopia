import * as THREE from 'three/webgpu';
import { MeshBVH, acceleratedRaycast } from 'three-mesh-bvh';
import { mergeGeometries } from 'three/addons/utils/BufferGeometryUtils.js';
import { PLAYER } from './config.ts';
import type { WorldHeight } from './hex-world.ts';
interface Collider {mesh:THREE.Mesh;bounds:THREE.Box3;bvh:any}
export class CollisionWorld {
  colliders:Collider[]=[];
  ray=new THREE.Raycaster();down=new THREE.Vector3(0,-1,0);
  private box=new THREE.Box3();private segment=new THREE.Line3();private trianglePoint=new THREE.Vector3();private capsulePoint=new THREE.Vector3();private correction=new THREE.Vector3();
  constructor(public terrain:WorldHeight){}
  addGeometry(geometry:THREE.BufferGeometry,matrix?:THREE.Matrix4) {
    const g=new THREE.BufferGeometry();g.setAttribute('position',geometry.getAttribute('position').clone());if(geometry.index)g.setIndex(geometry.index.clone());
    if(matrix)g.applyMatrix4(matrix);g.computeBoundingBox();
    const bvh=new MeshBVH(g,{targetLeafSize:12,maxDepth:60});(g as any).boundsTree=bvh;
    const mesh=new THREE.Mesh(g,new THREE.MeshBasicMaterial({side:THREE.DoubleSide}));mesh.raycast=acceleratedRaycast;
    this.colliders.push({mesh,bvh,bounds:g.boundingBox!.clone()});
  }
  addObjects(objects:THREE.Object3D[]) {
    const geometries:THREE.BufferGeometry[]=[];
    for(const object of objects)object.traverse((o:any)=>{
      if(!o.isMesh||o.isInstancedMesh||!o.geometry.attributes.position)return;
      const g=new THREE.BufferGeometry();const original=o.geometry.attributes.position;const positions=new Float32Array(original.count*3);for(let i=0;i<original.count;i++){positions[i*3]=original.getX(i);positions[i*3+1]=original.getY(i);positions[i*3+2]=original.getZ(i);}g.setAttribute('position',new THREE.Float32BufferAttribute(positions,3));if(o.geometry.index){const range=o.geometry.drawRange,idx=o.geometry.index.array;g.setIndex(new THREE.BufferAttribute(idx.slice(range.start,Math.min(idx.length,range.start+range.count)),1));}g.applyMatrix4(o.matrixWorld);geometries.push(g);
    });
    if(geometries.length){const merged=mergeGeometries(geometries.map(g=>g.index?g.toNonIndexed():g));this.addGeometry(merged);merged.dispose();geometries.forEach(g=>g.dispose());}
  }
  floor(x:number,z:number,maxY:number) {
    let ground=this.terrain.floorAt(x,z);this.ray.set(new THREE.Vector3(x,maxY,z),this.down);this.ray.far=50;
    for(const c of this.colliders) {
      if(x<c.bounds.min.x||x>c.bounds.max.x||z<c.bounds.min.z||z>c.bounds.max.z)continue;
      const hits=this.ray.intersectObject(c.mesh,false);
      for(const hit of hits)if(hit.face&&hit.face.normal.y>.6){ground=Math.max(ground,hit.point.y);break;}
    }
    return ground;
  }
  resolve(position:THREE.Vector3) {
    const r=PLAYER.radius;this.segment.start.set(position.x,position.y+r,position.z);this.segment.end.set(position.x,position.y+PLAYER.height-r,position.z);
    let collided=false;
    for(const c of this.colliders) {
      this.box.makeEmpty().expandByPoint(this.segment.start).expandByPoint(this.segment.end).expandByScalar(r);
      if(!this.box.intersectsBox(c.bounds))continue;
      c.bvh.shapecast({intersectsBounds:(bounds:THREE.Box3)=>bounds.intersectsBox(this.box),intersectsTriangle:(tri:any)=>{
        const d=tri.closestPointToSegment(this.segment,this.trianglePoint,this.capsulePoint);
        if(d<r && d>1e-7) {
          this.correction.subVectors(this.capsulePoint,this.trianglePoint).multiplyScalar((r-d)/d);
          this.segment.start.add(this.correction);this.segment.end.add(this.correction);collided=true;
        }
      }});
    }
    position.copy(this.segment.start);position.y-=r;return collided;
  }
  dispose(){for(const c of this.colliders){c.mesh.geometry.dispose();(c.mesh.material as THREE.Material).dispose();}}
}
