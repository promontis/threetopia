import * as T from 'three';
import {mergeGeometries} from 'three/addons/utils/BufferGeometryUtils.js';

export interface HoverEngineUniforms {
  uBoosterThrust:{value:Float32Array};
  uHoverOffset:{value:number};
}

// Three substantial rings per engine, with clear air gaps. Even the lowest
// ring stays well above the sea at the bottom of the platform's hover cycle.
const RINGS=[{radius:.61,y:2.07},{radius:.52,y:1.48},{radius:.44,y:.89}] as const;

/** Eighteen real, open rings share one draw. The vertex motion uses the host
 * clock, so the same floating pose appears in the scene and water reflection. */
export function createThrusterRings(time:{value:number},engines:HoverEngineUniforms){
  const parts:T.BufferGeometry[]=[];
  for(let engine=0;engine<6;engine++){
    const angle=engine*Math.PI/3+Math.PI/6,x=Math.cos(angle)*6.22,z=Math.sin(angle)*6.22*.8-1.2;
    RINGS.forEach(({radius,y},ring)=>{
      const g=new T.TorusGeometry(radius,.062-ring*.005,6,32);
      g.rotateX(Math.PI/2);g.translate(x,y,z);
      g.setAttribute('aEngine',new T.Float32BufferAttribute(new Float32Array(g.attributes.position.count).fill(engine),1));
      g.setAttribute('aRing',new T.Float32BufferAttribute(new Float32Array(g.attributes.position.count).fill(ring),1));
      parts.push(g);
    });
  }
  const geometry=mergeGeometries(parts);parts.forEach(g=>g.dispose());
  const material=new T.ShaderMaterial({name:'Punk floating neon-blue rings',toneMapped:false,
    uniforms:{uTime:time,...engines},vertexShader:`
      uniform float uTime;attribute float aEngine;attribute float aRing;
      varying float vEngine;varying float vRing;varying vec2 vUv;
      varying vec3 vNormal;varying vec3 vEye;
      void main(){
        vEngine=aEngine;vRing=aRing;vUv=uv;
        vec3 transformed=position;
        float phase=aEngine*1.13+aRing*1.55;
        transformed.y+=(.052+aRing*.009)*sin(uTime*(1.55-aRing*.13)+phase);
        #include <project_vertex>
        vNormal=normalize(normalMatrix*normal);
        vEye=isOrthographic?vec3(0.,0.,1.):-mvPosition.xyz;
      }`,fragmentShader:`
      uniform float uTime;uniform float uBoosterThrust[6];
      varying float vEngine;varying float vRing;varying vec2 vUv;
      varying vec3 vNormal;varying vec3 vEye;
      void main(){
        // A continuous blue tube with a brighter centre retains its round
        // section and open hole, without flame cards or a filled light cone.
        float facing=max(0.,dot(normalize(vNormal),normalize(vEye)));
        float pulse=.91+.09*uBoosterThrust[int(vEngine+.5)];
        float flow=.94+.06*sin(vUv.x*6.2831853-uTime*1.2+vEngine+vRing*.8);
        vec3 blue=mix(vec3(.018,.28,1.7),vec3(.14,1.25,3.8),pow(facing,2.));
        gl_FragColor=vec4(blue*pulse*flow,1.);
      }`});
  const rings=new T.Mesh(geometry,material);rings.name='Eighteen floating neon-blue thruster rings';
  rings.castShadow=false;rings.receiveShadow=false;
  // Every ring remains above the sea, including its full hover/bob range.
  rings.userData.aboveWaterOnly=true;
  geometry.computeBoundingSphere();geometry.boundingSphere!.radius+=.08;
  return rings;
}
