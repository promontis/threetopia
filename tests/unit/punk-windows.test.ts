import {beforeAll,describe,it,expect} from 'vitest';
import {readFileSync} from 'node:fs';
import * as T from 'three';
import {GLTFLoader} from 'three/addons/loaders/GLTFLoader.js';
import {MeshoptDecoder} from 'meshoptimizer';
import {MeshBVH} from 'three-mesh-bvh';

type Sample={point:T.Vector3;normal:T.Vector3;area:number};
type Building={id:string;node:string;x:number;z:number;scale:number;yaw:number};
const samples=new Map<string,Sample[]>();
const loader=new GLTFLoader().setMeshoptDecoder(MeshoptDecoder);
const load=(path:string)=>loader.parseAsync(new Uint8Array(readFileSync(path)).buffer,'');

beforeAll(async()=>{
  await MeshoptDecoder.ready;
  const source=await load('packages/world-sources/punk/map-assets/kit.glb');source.scene.updateMatrixWorld(true);
  const {palette}=JSON.parse(readFileSync('packages/world-sources/punk/map-assets/kit.json','utf8'));
  const {buildings}=JSON.parse(readFileSync('public/map/lite/punk/component.json','utf8')) as {buildings:Building[]};
  const isWindow=(id:number)=>palette[id].kind===4||['window','old window','light'].includes(palette[id].name);
  for(const spec of buildings){
    const mesh=source.scene.getObjectByName(spec.node) as T.Mesh,g=mesh.geometry;
    const transform=new T.Matrix4().compose(new T.Vector3(spec.x,.065,spec.z),new T.Quaternion().setFromAxisAngle(new T.Vector3(0,1,0),spec.yaw),new T.Vector3().setScalar(spec.scale)).multiply(mesh.matrixWorld);
    const normals=new T.Matrix3().getNormalMatrix(transform),original=g.clone();
    // Decode quantized source positions before transforming them. Applying a
    // world transform directly to normalized Int16 attributes would overflow.
    original.setAttribute('position',new T.Float32BufferAttribute(Array.from({length:g.attributes.position.count},(_,i)=>new T.Vector3().fromBufferAttribute(g.attributes.position,i).toArray()).flat(),3));
    original.deleteAttribute('normal');original.applyMatrix4(transform);
    const bvh=new MeshBVH(original,{indirect:true}),ray=new T.Ray(),selected:Sample[]=[];
    for(let i=0;i<g.index!.count;i+=3){
      const ids=[0,1,2].map(k=>g.index!.getX(i+k));
      if(!isWindow(Math.round(g.attributes._matid.getX(ids[0]))))continue;
      const normal=new T.Vector3().fromBufferAttribute(g.attributes.normal,ids[0]).applyNormalMatrix(normals);
      if(Math.abs(normal.y)>.1)continue;
      const [a,b,c]=ids.map(id=>new T.Vector3().fromBufferAttribute(g.attributes.position,id).applyMatrix4(transform));
      const area=b.clone().sub(a).cross(c.clone().sub(a)).length()/2;if(area<.00001)continue;
      const point=a.clone().add(b).add(c).multiplyScalar(1/3);
      // Reference the actual source exterior, excluding the invisible backs
      // of panes inside the building. Other city buildings are not occluders.
      ray.origin.copy(point).addScaledVector(normal,30);ray.direction.copy(normal).negate();
      const hit=bvh.raycastFirst(ray,T.DoubleSide);
      if(!hit||hit.point.distanceTo(point)>.001||!isWindow(Math.round(g.attributes._matid.getX(hit.face!.a))))continue;
      selected.push({point,normal,area});
    }
    expect(selected.length,spec.id).toBeGreaterThan(10);samples.set(spec.id,selected);original.dispose();
  }
});

describe('native Punk window openings',()=>{
  for(const [file,minimum] of [['landmark',.99],['overview',.95]] as const){
    it(`${file} keeps the source windows open on every building`,async()=>{
      const asset=await load(`public/map/lite/punk/${file}.glb`);
      const mesh=asset.scene.children.find(o=>o.userData.role==='structure') as T.Mesh;
      const g=mesh.geometry,bvh=new MeshBVH(g,{indirect:true}),ray=new T.Ray();
      for(const [building,points] of samples){
        let visible=0,total=0;
        for(const {point,normal,area} of points){
          // Only inspect the local opening; another building across the road
          // may legitimately hide this facade from a distant camera.
          ray.origin.copy(point).addScaledVector(normal,.03);ray.direction.copy(normal).negate();
          const hit=bvh.raycastFirst(ray,T.DoubleSide);
          if(hit&&hit.point.distanceTo(point)<.012&&g.attributes._surface.getX(hit.face!.a)>.5)visible+=area;
          total+=area;
        }
        expect(visible/total,`${building}: plaster occludes original window area`).toBeGreaterThan(minimum);
      }
    });
  }
});
