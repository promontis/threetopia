import {readFile} from 'node:fs/promises';
import {fileURLToPath} from 'node:url';
import {Group,Mesh,MeshStandardMaterial,Float32BufferAttribute,Uint8BufferAttribute,Vector3} from 'three-world';
import {GLTFLoader} from 'three-world/addons/loaders/GLTFLoader.js';
import {GLTFExporter} from 'three-world/addons/exporters/GLTFExporter.js';
import {mergeGeometries,mergeVertices} from 'three-world/addons/utils/BufferGeometryUtils.js';
import {MeshoptDecoder} from 'meshoptimizer';
import {createMapTile} from '@dgreenheck/tidewater-map-tile';
import {inspectGLB} from '../../packages/platform/index.js';

const root=fileURLToPath(new URL('../../packages/components/tidewater-map-tile/',import.meta.url));
class ExportFileReader {readAsArrayBuffer(blob){blob.arrayBuffer().then(result=>{this.result=result;this.onloadend?.();},error=>this.onerror?.(error));}}
export async function exportMap(role,{tile}={}) {
  const raw=await readFile(root+`assets/${role==='overview'?'overview':'landmark'}.glb`);
  const loader=new GLTFLoader().setMeshoptDecoder(MeshoptDecoder);
  const {scene:landmark}=await loader.parseAsync(raw.buffer.slice(raw.byteOffset,raw.byteOffset+raw.byteLength),'');
  const composition=createMapTile({landmark,overview:role==='overview'}),geometries=[];
  composition.object.updateMatrixWorld(true);
  composition.object.traverse(object=>{
    if(!object.isMesh)return;
    if(object.isInstancedMesh)throw Error('Bake map instances before exporting.');
    const g=object.geometry.clone().applyMatrix4(object.matrixWorld),p=g.attributes.position,n=g.attributes.normal,c=g.attributes.color;
    const colors=[],normals=[],positions=[];
    for(let i=0;i<p.count;i++){
      const color=object.material.color;
      colors.push(...(c?[c.getX(i),c.getY(i),c.getZ(i)]:[color.r,color.g,color.b]));
      normals.push(n.getX(i),n.getY(i),n.getZ(i));
      positions.push(p.getX(i),p.getY(i),p.getZ(i));
    }
    for(const key of Object.keys(g.attributes))if(key!=='position')g.deleteAttribute(key);
    g.setAttribute('position',new Float32BufferAttribute(positions,3));g.setAttribute('normal',new Float32BufferAttribute(normals,3));g.setAttribute('color',new Float32BufferAttribute(colors,3));
    if(!g.index)g.setIndex(Array.from({length:p.count},(_,i)=>i));geometries.push(g);
  });
  const merged=mergeGeometries(geometries),geometry=mergeVertices(merged,1e-5),material=new MeshStandardMaterial({vertexColors:true,roughness:1,side:2}),object=new Group();
  merged.dispose();geometry.normalizeNormals();
  const normals=geometry.attributes.normal;
  for(let i=0;i<normals.count;i++)if(Math.hypot(normals.getX(i),normals.getY(i),normals.getZ(i))<.01)normals.setXYZ(i,0,1,0);
  geometry.setAttribute('color',new Uint8BufferAttribute(Uint8Array.from(geometry.attributes.color.array,value=>Math.round(Math.max(0,Math.min(1,value))*255)),3,true));
  geometry.computeBoundingBox();const center=geometry.boundingBox.getCenter(new Vector3());
  geometry.translate(-center.x,-geometry.boundingBox.min.y,-center.z);
  let radius=0;const p=geometry.attributes.position;for(let i=0;i<p.count;i++)radius=Math.max(radius,Math.hypot(p.getX(i),p.getZ(i)));
  const scale=role==='world'?1/.03:1;
  const region=tile?.slot.regions?.[0],limit=tile?(region?.radius??tile.slot.radius)*(role==='world'?1:.03)*.70:(role==='world'?180:5.4);
  geometry.scale(Math.min(scale,limit/radius),Math.min(scale,limit/radius),Math.min(scale,limit/radius));
  object.add(new Mesh(geometry,material));object.updateMatrixWorld(true);
  const previous=globalThis.FileReader;globalThis.FileReader??=ExportFileReader;
  try{
    const bytes=new Uint8Array(await new GLTFExporter().parseAsync(object,{binary:true}));
    inspectGLB(bytes,role,tile);return bytes;
  }finally{
    if(previous===undefined)delete globalThis.FileReader;
    composition.dispose();landmark.traverse(o=>{if(o.isMesh){o.geometry.dispose();[].concat(o.material).forEach(m=>m.dispose());}});
    geometry.dispose();geometries.forEach(g=>g.dispose());material.dispose();
  }
}
