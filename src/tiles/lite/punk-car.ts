import * as T from 'three';
import {deformMapMesh} from './materials';
import {createPunkDrivePose,createPunkDriveRoute} from './punk-drive';

/** One merged native Quadra, including its rolling/steering wheel vertices. */
export function createPunkCarMotion(roots:readonly T.Object3D[],time:{value:number}){
  const cars:T.Mesh[]=[],route=createPunkDriveRoute(),pose=createPunkDrivePose();
  const steer={value:0},travel={value:0},boost={value:0};
  for(const root of roots)root.traverse(object=>{
    const mesh=object as T.Mesh;if(!mesh.isMesh||mesh.userData.role!=='car')return;
    cars.push(mesh);
    const declarations=`attribute vec3 _wheel;attribute vec3 _drive;attribute vec3 _effect;
      uniform float uPunkSteer;uniform float uPunkTravel;uniform float uPunkBoost;
      vec3 punkWheel(vec3 p){
        float roll=uPunkTravel/max(_drive.x,.001),s=sin(roll),c=cos(roll);
        p.yz=mat2(c,s,-s,c)*p.yz;
        float turn=uPunkSteer*_drive.y;s=sin(turn);c=cos(turn);
        p.xz=mat2(c,-s,s,c)*p.xz;return p;
      }`;
    deformMapMesh(mesh,time,'punk-quadra-drift-boost-v2',`
      if(_drive.x>0.)transformed=_wheel+punkWheel(transformed-_wheel);
      if(_effect.x>0.){
        vec3 nozzle=vec3(_effect.y,.13,-.535);
        vec3 flame=transformed-nozzle;
        flame.xy*=uPunkBoost;
        flame.z*=uPunkBoost*(.82+.18*sin(uMapTime*34.+_effect.y*40.));
        transformed=nozzle+flame;
      }
    `,declarations);
    const material=mesh.material as T.MeshStandardMaterial;material.roughness=.35;material.metalness=.42;material.envMapIntensity=1.2;
    const previous=material.onBeforeCompile.bind(material);
    material.onBeforeCompile=(shader,renderer)=>{
      previous(shader,renderer);shader.uniforms.uPunkSteer=steer;shader.uniforms.uPunkTravel=travel;shader.uniforms.uPunkBoost=boost;
      shader.vertexShader='attribute vec3 _emission;varying vec3 vCarGlow;\n'+shader.vertexShader.replace('#include <begin_vertex>','#include <begin_vertex>\nvCarGlow=_emission;').replace('#include <beginnormal_vertex>','#include <beginnormal_vertex>\nif(_drive.x>0.)objectNormal=punkWheel(objectNormal);');
      shader.fragmentShader='varying vec3 vCarGlow;\n'+shader.fragmentShader.replace('#include <emissivemap_fragment>','#include <emissivemap_fragment>\ntotalEmissiveRadiance+=vCarGlow*3.;');
    };
    const depth=mesh.customDepthMaterial!,previousDepth=depth.onBeforeCompile.bind(depth);
    depth.onBeforeCompile=(shader,renderer)=>{previousDepth(shader,renderer);shader.uniforms.uPunkSteer=steer;shader.uniforms.uPunkTravel=travel;shader.uniforms.uPunkBoost=boost;};
  });
  function update(){
    route.sample(time.value,pose);steer.value=pose.steer;travel.value=pose.distance;boost.value=pose.boost;
    for(const car of cars){car.position.copy(pose.position);car.rotation.set(0,pose.heading,0);}
  }
  update();return {update,position:pose.position,forward:pose.forward,steer,boost,pose,duration:route.duration};
}
