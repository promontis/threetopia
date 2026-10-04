import * as T from 'three';
// Cumulus shaping and scattering adapted from CK42BB/procedural-clouds-threejs
// (MIT, Kingsley). See public/licenses/procedural-clouds-threejs.txt.
// Three small density volumes are baked once, then six banks share one draw.
const SIZE=96,VARIANTS=3;
const banks=[
  [-18,10,8,7.8,5.0,4.8],[-5,7,-19,5.3,3.5,3.7],
  [22,10,-17,6.5,4.1,4.2],[32,11,1,5.0,3.5,3.6],
  [27,9,17,8.2,5.1,5.2],[-3,8,24,4.6,3.3,3.3],
];

export function createMapClouds(time:{value:number},sunDirection=new T.Vector3(-.62,.74,.27).normalize()){
  const geometry=new T.BoxGeometry(2,2,2);
  const density=new T.Data3DTexture(new Uint8Array(4),1,1,1);
  density.name='Cumulus density and sunlight · three 96³ fields';
  density.format=T.RGBAFormat;density.minFilter=density.magFilter=T.LinearFilter;
  density.unpackAlignment=1;
  let disposed=false;
  async function load(signal?:AbortSignal){
    const response=await fetch('/map/lite/clouds/cumulus.bin.gz',{signal});
    if(!response.ok)throw Error('Could not load the cloud volumes.');
    let bytes=await response.arrayBuffer();
    // Vite inflates .gz itself; static hosts may serve the stored gzip bytes.
    const magic=new Uint8Array(bytes,0,Math.min(2,bytes.byteLength));
    if(magic[0]===31&&magic[1]===139)
      bytes=await new Response(new Blob([bytes]).stream().pipeThrough(new DecompressionStream('gzip'))).arrayBuffer();
    if(disposed||signal?.aborted)return;
    if(bytes.byteLength!==SIZE**3*2*4)throw Error('Invalid cloud volume.');
    density.image={data:new Uint8Array(bytes),width:SIZE,height:SIZE,depth:SIZE*2};density.needsUpdate=true;
  }
  geometry.setAttribute('cloudVariant',new T.InstancedBufferAttribute(new Float32Array(banks.map((_,i)=>i%VARIANTS)),1));
  const material=new T.ShaderMaterial({name:'Sunlit cumulus volumes',transparent:true,depthWrite:false,side:T.BackSide,
    uniforms:{uDensity:{value:density},uSun:{value:sunDirection},uTime:time,uOpacity:{value:.76}},
    vertexShader:`
      attribute float cloudVariant;
      uniform vec3 uSun;
      varying vec3 vLocal;varying vec3 vEye;varying vec3 vDirection;varying vec3 vSun;
      varying float vVariant;varying float vWorldScale;varying float vLightScale;varying float vCosTheta;
      void main(){
        vLocal=position;vVariant=cloudVariant;
        mat4 world=modelMatrix*instanceMatrix;
        mat4 inverseWorld=inverse(world);
        vec3 viewDirection=vec3(-viewMatrix[0][2],-viewMatrix[1][2],-viewMatrix[2][2]);
        vEye=(inverseWorld*vec4(cameraPosition,1.)).xyz;
        vDirection=(inverseWorld*vec4(viewDirection,0.)).xyz;
        vSun=(inverseWorld*vec4(uSun,0.)).xyz;vLightScale=1./length(vSun);
        vWorldScale=length((world*vec4(normalize(vDirection),0.)).xyz);
        vCosTheta=dot(viewDirection,uSun);
        gl_Position=projectionMatrix*viewMatrix*world*vec4(position,1.);
      }
    `,
    fragmentShader:`
      precision highp sampler3D;
      uniform sampler3D uDensity;uniform float uOpacity;uniform float uTime;
      varying vec3 vLocal;varying vec3 vEye;varying vec3 vDirection;varying vec3 vSun;
      varying float vVariant;varying float vWorldScale;varying float vLightScale;varying float vCosTheta;
      vec2 cloudField(vec3 p){
        // Coherent, slow turbulence deforms density and its baked lighting
        // together. No frame-random noise, so paused views never shimmer.
        float t=uTime*.19+vVariant*2.1;
        p+=vec3(sin(p.y*6.+p.z*3.+t),sin(p.z*5.-p.x*3.+t*.83),sin(p.x*5.+p.y*4.+t*.71))*.038;
        if(any(greaterThan(abs(p),vec3(.99))))return vec2(0.);
        vec3 uv=p*.5+.5;uv.z=(uv.z+floor(vVariant*.5))*.5;
        vec4 field=texture(uDensity,uv);
        return vVariant<.5||vVariant>1.5?field.rg:field.ba;
      }
      float henyeyGreenstein(float mu,float g){
        float g2=g*g;
        return (1.-g2)/(4.*3.14159265*pow(1.+g2-2.*g*mu,1.5));
      }
      void main(){
        vec3 ray=normalize(isOrthographic?vDirection:vLocal-vEye);
        vec3 origin=isOrthographic?vLocal-ray*10.:vEye;
        vec3 inv=1./(ray+vec3(.000001));
        vec3 t0=(-vec3(1.)-origin)*inv,t1=(vec3(1.)-origin)*inv;
        vec3 lo=min(t0,t1),hi=max(t0,t1);
        float enter=max(0.,max(max(lo.x,lo.y),lo.z)),leave=min(min(hi.x,hi.y),hi.z);
        if(leave<=enter)discard;
        float stepSize=(leave-enter)/64.;
        float phase=henyeyGreenstein(vCosTheta,.6)*.7+henyeyGreenstein(vCosTheta,-.3)*.3;
        vec4 colour=vec4(0.);
        for(int i=0;i<64;i++){
          vec3 p=origin+ray*(enter+(float(i)+.5)*stepSize);
          vec2 field=cloudField(p);float d=field.r;
          if(d<.008)continue;
          float alpha=1.-exp(-d*stepSize*vWorldScale*1.05);
          float depth=field.g*2.5*vLightScale,direct=exp(-depth*2.2),multiple=exp(-depth*.5);
          float powder=1.-exp(-depth*2.5);
          float sky=smoothstep(-.5,.55,p.y);
          vec3 ambient=mix(vec3(.10,.14,.20),vec3(.28,.34,.43),sky);
          vec3 scattering=ambient+vec3(1.4,1.4,1.38)*(direct*mix(.72,1.,powder)*(phase*3.+.6)+multiple*.16);
          colour.rgb+=(1.-colour.a)*alpha*scattering;
          colour.a+=(1.-colour.a)*alpha;
          if(colour.a>.995)break;
        }
        if(colour.a<.008)discard;
        gl_FragColor=vec4(colour.rgb/max(.001,colour.a),colour.a*uOpacity);
        #include <tonemapping_fragment>
        #include <colorspace_fragment>
      }
    `,
  });
  const mesh=new T.InstancedMesh(geometry,material,banks.length),pose=new T.Object3D();
  mesh.name='Drifting cumulus cloud banks';mesh.frustumCulled=false;mesh.renderOrder=3;
  // The custom volume shader does not implement geometry clipping. Keep it
  // out of the submerged-bed capture, while retaining its water reflection.
  mesh.userData.aboveWaterOnly=true;
  mesh.instanceMatrix.setUsage(T.DynamicDrawUsage);mesh.raycast=()=>{};
  let lastTime=NaN;
  function update(zoomFraction=0){
    material.uniforms.uOpacity.value=T.MathUtils.lerp(.76,.18,T.MathUtils.smoothstep(zoomFraction,0,1));
    if(lastTime===time.value)return;lastTime=time.value;
    for(let i=0;i<banks.length;i++){
      const [x,y,z,sx,sy,sz]=banks[i],phase=time.value*.023+i*.7;
      // A continuous path, shared by live views, reduced motion and export.
      pose.position.set(x+Math.sin(phase)*4.5,y+Math.sin(phase*.7)*.3,z+Math.cos(phase)*2.4);
      pose.rotation.y=.18;pose.scale.set(sx,sy,sz);
      pose.updateMatrix();mesh.setMatrixAt(i,pose.matrix);
    }
    mesh.instanceMatrix.needsUpdate=true;
  }
  update();
  return {mesh,update,load,inspect:()=>({banks:banks.length,drawCalls:1,triangles:12*banks.length,textures:1}),dispose(){disposed=true;mesh.removeFromParent();geometry.dispose();material.dispose();density.dispose();mesh.dispose();}};
}
