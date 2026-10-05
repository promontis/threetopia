import {Group,Mesh,MeshStandardMaterial,Float32BufferAttribute} from 'three';
import {createRocks} from '@dgreenheck/tidewater-rocks';
import {createGulls} from '@dgreenheck/tidewater-gulls';
import {buildPalmFar} from '@dgreenheck/tidewater-vegetation/world/vegetation/PlantGeometry.js';

/** The caller owns the loaded landmark and the renderer. Each composition owns
 * its generated components; cloning the landmark keeps transforms independent. */
export function createMapTile({landmark,overview=false,seed=17}={}) {
  if(!landmark?.isObject3D)throw Error('Supply the decoded native boat/pier landmark.');
  const object=new Group();object.name='Tidewater map tile';object.add(landmark.clone(true));
  const rocks=createRocks({count:overview?2:3,spread:1,detail:1,seed});rocks.object.scale.setScalar(.22);rocks.object.position.set(-3.7,.1,-1);object.add(rocks.object);
  const gulls=createGulls({count:overview?2:3,seed,spread:[1,1],radius:[1,2],height:[2,3]});gulls.object.scale.setScalar(.6);object.add(gulls.object);
  const {geometry}=buildPalmFar(seed),part=geometry.attributes.aMat,p=geometry.attributes.position,colors=[];
  for(let i=0;i<p.count;i++){
    if(part.getX(i)>0)p.setY(i,p.getY(i)+10);
    colors.push(...(part.getX(i)>0?[.19,.36,.055]:[.26,.18,.09]));
  }
  geometry.setAttribute('color',new Float32BufferAttribute(colors,3));
  const material=new MeshStandardMaterial({vertexColors:true,roughness:1,side:2}),palm=new Mesh(geometry,material);
  palm.scale.setScalar(.22);palm.position.set(-3,.1,-1.5);object.add(palm);
  let disposed=false;
  return {object,update(seconds){if(!disposed)gulls.update(seconds);},dispose(){if(disposed)return;disposed=true;rocks.dispose();gulls.dispose();geometry.dispose();material.dispose();object.removeFromParent();}};
}
