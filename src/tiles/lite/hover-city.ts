import * as T from 'three';
import {mergeGeometries} from 'three/addons/utils/BufferGeometryUtils.js';
import {PUNK_ACCESS} from './layout';
import {createTeleportPads} from './teleport-pads';
import {createThrusterRings,type HoverEngineUniforms} from './hover-thrusters';
export type {HoverEngineUniforms} from './hover-thrusters';

function addCaptureClipping(material:T.ShaderMaterial){
  material.clipping=true;
  material.vertexShader='#include <clipping_planes_pars_vertex>\n'+material.vertexShader.replace('#include <project_vertex>','#include <project_vertex>\n#include <clipping_planes_vertex>');
  material.fragmentShader='#include <clipping_planes_pars_fragment>\n'+material.fragmentShader.replace('void main(){','void main(){\n#include <clipping_planes_fragment>\n');
}

/** Host-owned hover foundation. The district is an independently budgeted
 * creator landmark; the deck owns its engines and shoreline connection. */
export function createHoverCity(time:{value:number}){
  const root=new T.Group();root.name='Punk antigravity platform';root.position.set(PUNK_ACCESS.origin.x,0,PUNK_ACCESS.origin.z);
  const body=new T.Group();body.name='Floating Punk body';root.add(body);
  const deckY=PUNK_ACCESS.deckY,engines:HoverEngineUniforms={uBoosterThrust:{value:new Float32Array(6).fill(1)},uHoverOffset:{value:0}};
  let landmarkSlot:T.Group|undefined;
  const solid:T.BufferGeometry[]=[],trim:T.BufferGeometry[]=[],neon:T.BufferGeometry[]=[];
  const matrix=new T.Matrix4(),q=new T.Quaternion(),p=new T.Vector3(),scale=new T.Vector3(1,1,1);
  function add(list:T.BufferGeometry[],g:T.BufferGeometry,x:number,y:number,z:number,rotation=0){q.setFromEuler(new T.Euler(0,rotation,0));matrix.compose(p.set(x,y,z),q,scale);g.applyMatrix4(matrix);if(g.attributes.uv)g.deleteAttribute('uv');if(!g.index)g.setIndex(Array.from({length:g.attributes.position.count},(_,i)=>i));list.push(g);}
  function hex(radius:number,height:number,y:number,list=solid){const g=new T.CylinderGeometry(radius,radius,height,6);g.rotateY(Math.PI/6);add(list,g,0,y,0);}
  hex(7.45,.28,2.98);hex(7.22,.20,2.72);hex(6.98,.24,2.49);hex(7.5,.07,3.155,trim);hex(7.27,.055,2.63,trim);
  // Shallow sockets above the floating rings, plus the deck's metal ribs.
  for(let i=0;i<6;i++){
    const a=i*Math.PI/3+Math.PI/6,x=Math.cos(a)*6.22,z=Math.sin(a)*6.22;
    add(solid,new T.CylinderGeometry(.51,.52,.08,24),x,2.34,z);
    add(trim,new T.TorusGeometry(.49,.022,4,24).rotateX(Math.PI/2),x,2.30,z);
    // One narrow illuminated panel per outer side; end caps frame the light.
    const side=i*Math.PI/3,edge=6.455;
    add(solid,new T.BoxGeometry(3.65,.3,.13),Math.sin(side)*edge,2.92,Math.cos(side)*edge,side);
    add(neon,new T.BoxGeometry(2.9,.045,.145),Math.sin(side)*(edge+.02),2.94,Math.cos(side)*(edge+.02),side);
    for(let j=0;j<3;j++)add(trim,new T.BoxGeometry(.30,.055,.09),Math.sin(side)*edge+Math.cos(side)*(j-.8)*.44,2.72,Math.cos(side)*edge-Math.sin(side)*(j-.8)*.44,side);
  }
  // The compact platform leaves a promenade around the generated district.
  for(const g of [...solid,...trim,...neon]){g.scale(1,1,.8);g.translate(0,0,-1.2);}
  const plate=new T.MeshStandardMaterial({color:'#2c3840',metalness:.25,roughness:.68,envMapIntensity:.8}),edge=new T.MeshStandardMaterial({color:'#526771',metalness:.35,roughness:.58,envMapIntensity:.8});
  function merged(list:T.BufferGeometry[],material:T.Material,name:string,parent:T.Group=body){const g=mergeGeometries(list);list.forEach(g=>g.dispose());const mesh=new T.Mesh(g,material);mesh.name=name;mesh.castShadow=mesh.receiveShadow=true;parent.add(mesh);return mesh;}
  merged(solid,plate,'Layered graphite hover deck and six engines');merged(trim,edge,'Machined metal trim');
  const lightMaterial=new T.ShaderMaterial({toneMapped:false,uniforms:{uTime:time,...engines},vertexShader:`
    varying vec3 vP;
    void main(){vP=position;vec3 transformed=position;
      #include <project_vertex>
    }`,fragmentShader:`
    uniform float uTime;varying vec3 vP;
    void main(){
      vec3 c=vP.x>2.&&vP.y>2.?vec3(1.,.035,.38):vec3(.06,.78,1.);
      float pulse=.88+.12*sin(uTime*2.5+vP.x*.5);
      gl_FragColor=vec4(c*pulse*3.6,1.);
    }`});
  const rings=createThrusterRings(time,engines);body.add(rings);
  addCaptureClipping(lightMaterial);addCaptureClipping(rings.material);
  const glow=merged(neon,lightMaterial,'Deck neon strips');glow.castShadow=false;glow.userData.aboveWaterOnly=true;
  const teleports=createTeleportPads(time,engines);root.add(teleports.root);
  // Three bounded local lights give the neon a real effect on nearby metal.
  // The shared sun owns shadows; no additional cube shadow maps per engine.
  const lamps=[new T.PointLight('#52dfff',9,5.5,2),new T.PointLight('#ff55b8',8,5.5,2),new T.PointLight('#279fff',12,8,2)];
  lamps[0].position.set(-4.3,4.0,.2);lamps[1].position.set(4.1,4.0,.0);lamps[2].position.set(0,1.6,-1.2);
  lamps.forEach((l,i)=>{l.name=i===2?'Booster bounce':'Neon street bounce';body.add(l);});
  return {root,body,teleports,deckY,engines,rings,get offset(){return body.position.y;},
    bindLandmark(slot:T.Group){landmarkSlot=slot;slot.position.y=deckY+body.position.y;},
    update(){
      const t=time.value,phase=t*Math.PI*2/7,offset=.13*Math.sin(phase);
      body.position.y=engines.uHoverOffset.value=offset;
      if(landmarkSlot)landmarkSlot.position.y=deckY+offset;
      teleports.update();
      let thrust=0;
      for(let i=0;i<6;i++){const power=1+.12*Math.sin(t*1.9+i*1.3)+.04*Math.sin(t*3+i*2.1)+.04*Math.cos(phase);engines.uBoosterThrust.value[i]=power;thrust+=power;}
      lamps[0].intensity=9*(.9+.1*Math.sin(t*2.5));lamps[1].intensity=8*(.9+.1*Math.sin(t*2.5+2.1));lamps[2].intensity=12*thrust/6;
    },
    dispose(){landmarkSlot=undefined;const geometries=new Set<T.BufferGeometry>(),materials=new Set<T.Material>();root.traverse(o=>{if((o as T.Mesh).isMesh){geometries.add((o as T.Mesh).geometry);materials.add((o as T.Mesh).material as T.Material);if((o as T.Mesh).customDepthMaterial)materials.add((o as T.Mesh).customDepthMaterial!);if((o as T.InstancedMesh).isInstancedMesh)(o as T.InstancedMesh).dispose();}});geometries.forEach(g=>g.dispose());materials.forEach(m=>m.dispose());}
  };
}
