import * as T from 'three';
import {mergeGeometries} from 'three/addons/utils/BufferGeometryUtils.js';
import {PUNK_ACCESS} from './layout';
import type {HoverEngineUniforms} from './hover-thrusters';

/** A matching departure and arrival landmark for the overview map. One pad
 * stays on the shore; the other follows the city's existing hover clock. */
export function createTeleportPads(time:{value:number},engines:HoverEngineUniforms){
  const root=new T.Group();root.name='Punk paired teleport pads';
  const {origin,shore,arrival,padRadius}=PUNK_ACCESS;
  const anchors=[new T.Vector3(shore.x-origin.x,shore.y,shore.z-origin.z),new T.Vector3(arrival.x,arrival.y,arrival.z)];
  const solid:T.BufferGeometry[]=[],light:T.BufferGeometry[]=[],frame=new T.Matrix4();
  function surface(g:T.BufferGeometry,colour:string){
    const c=new T.Color(colour),values=new Float32Array(g.attributes.position.count*3);
    for(let i=0;i<values.length;i+=3){values[i]=c.r;values[i+1]=c.g;values[i+2]=c.b;}
    g.setAttribute('color',new T.BufferAttribute(values,3));g.deleteAttribute('uv');solid.push(g);
  }
  // Broad, low bevels seat the shore pad into the sand and attach the city's
  // projecting arrival bay to its deck, without a connecting bridge or ramp.
  surface(new T.CylinderGeometry(.86,padRadius,.12,32).translate(0,-.02,0),'#31404e');
  surface(new T.CylinderGeometry(.78,.86,.09,32).translate(0,.075,0),'#152430');
  surface(new T.CylinderGeometry(.64,.64,.012,32).translate(0,.126,0),'#233844');
  const angles=[-Math.PI/2,Math.PI/6,Math.PI*5/6];
  for(const a of angles){
    const x=Math.cos(a)*.76,z=Math.sin(a)*.76;
    surface(new T.CylinderGeometry(.045,.08,.68,6).translate(x,.38,z),'#344858');
    surface(new T.CylinderGeometry(.08,.08,.075,6).translate(x,.735,z),'#637d8c');
  }
  const baseGeometry=mergeGeometries(solid);solid.forEach(g=>g.dispose());
  const material=new T.MeshStandardMaterial({vertexColors:true,metalness:.42,roughness:.5,envMapIntensity:.9});
  const bases=new T.InstancedMesh(baseGeometry,material,2);bases.name='Teleport pad foundations';bases.castShadow=bases.receiveShadow=true;
  bases.instanceMatrix.setUsage(T.DynamicDrawUsage);root.add(bases);

  function emit(g:T.BufferGeometry,pad:number,kind:number,seed=0){
    const count=g.attributes.position.count;
    for(const [name,value] of [['aPad',pad],['aKind',kind],['aSeed',seed]] as const)g.setAttribute(name,new T.Float32BufferAttribute(new Float32Array(count).fill(value),1));
    if(!g.index)g.setIndex(Array.from({length:count},(_,i)=>i));
    g.translate(...anchors[pad].toArray());light.push(g);
  }
  for(let pad=0;pad<2;pad++){
    emit(new T.TorusGeometry(.72,.022,5,48).rotateX(Math.PI/2).translate(0,.151,0),pad,0);
    emit(new T.TorusGeometry(.27,.012,4,32).rotateX(Math.PI/2).translate(0,.144,0),pad,0);
    for(const a of angles){
      emit(new T.TorusGeometry(.82,.022,4,16,Math.PI*.4).rotateX(Math.PI/2).rotateY(a).translate(0,.09,0),pad,0);
      emit(new T.CylinderGeometry(.042,.042,.22,6).translate(Math.cos(a)*.76,.61,Math.sin(a)*.76),pad,0);
      emit(new T.CircleGeometry(.09,3).rotateX(-Math.PI/2).rotateY(a).translate(Math.cos(a)*.46,.146,Math.sin(a)*.46),pad,0);
    }
    // A soft, open-sided light field: no opaque disc hides the floor marks.
    emit(new T.CylinderGeometry(.57,.60,1.5,32,1,true).translate(0,.90,0),pad,1);
    for(let i=0;i<16;i++){
      const angle=i*2.39996323,radius=.18+.31*((i*7%16)/15);
      emit(new T.OctahedronGeometry(.021+(i%3)*.006).translate(Math.cos(angle)*radius,.17,Math.sin(angle)*radius),pad,2,i);
    }
  }
  const lightGeometry=mergeGeometries(light);light.forEach(g=>g.dispose());
  const glowMaterial=new T.ShaderMaterial({name:'Teleport rings, light fields and rising motes',transparent:true,depthWrite:false,blending:T.AdditiveBlending,side:T.DoubleSide,toneMapped:false,
    uniforms:{uTime:time,uHoverOffset:engines.uHoverOffset},vertexShader:`
      #include <clipping_planes_pars_vertex>
      uniform float uTime;uniform float uHoverOffset;
      attribute float aPad;attribute float aKind;attribute float aSeed;
      varying float vKind;varying float vAge;varying vec2 vUv;
      void main(){
        vKind=aKind;vUv=uv;vAge=0.;vec3 transformed=position;
        transformed.y+=uHoverOffset*aPad;
        if(aKind>1.5){
          vAge=fract(uTime*.23+aSeed*.61803399);
          transformed.y+=vAge*1.35;
          transformed.x+=sin(uTime*.6+aSeed*2.4)*.035;
          transformed.z+=cos(uTime*.6+aSeed*2.4)*.035;
        }
        #include <project_vertex>
        #include <clipping_planes_vertex>
      }`,fragmentShader:`
      #include <clipping_planes_pars_fragment>
      uniform float uTime;varying float vKind;varying float vAge;varying vec2 vUv;
      void main(){
        #include <clipping_planes_fragment>
        vec3 blue=vec3(.025,.85,2.7);float alpha=1.;
        if(vKind>.5&&vKind<1.5){
          float height=vUv.y;
          float fade=smoothstep(0.,.065,height)*(1.-smoothstep(.22,1.,height));
          float ribbons=pow(.5+.5*sin(vUv.x*18.8496-uTime*.8+height*2.),5.);
          float scan=pow(.5+.5*sin(height*18.-uTime*1.8),12.);
          alpha=fade*(.035+.06*ribbons+.035*scan);
        }else if(vKind>1.5){
          alpha=smoothstep(0.,.12,vAge)*(1.-smoothstep(.55,1.,vAge));blue=vec3(.35,1.4,3.2);
        }else{
          blue*=.94+.06*sin(uTime*1.7);
        }
        gl_FragColor=vec4(blue,alpha);
      }`});
  glowMaterial.clipping=true;glowMaterial.forceSinglePass=true;
  const glow=new T.Mesh(lightGeometry,glowMaterial);glow.name='Paired blue teleport signals';root.add(glow);
  glow.userData.aboveWaterOnly=true;
  lightGeometry.computeBoundingSphere();lightGeometry.boundingSphere!.radius+=1.5;
  function update(){
    anchors.forEach((at,i)=>{frame.makeTranslation(at.x,at.y+engines.uHoverOffset.value*i,at.z);bases.setMatrixAt(i,frame);});
    bases.instanceMatrix.needsUpdate=true;
  }
  update();bases.computeBoundingSphere();bases.boundingSphere!.radius+=.14;
  return {root,bases,glow,anchors,update};
}
