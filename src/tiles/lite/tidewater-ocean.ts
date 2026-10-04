import * as T from 'three';
import {BOUNDS} from './landscape';
import {createWaterPatterns,createWaterSpectrum,WAVE_PERIOD,RIPPLE_PERIOD} from './water-spectrum';
import {createWaterCaustics} from './water-caustics';
import {OCEAN_PERIODS} from './ocean-spectrum-data';
import {createSwimmerRefraction,swimmerRefractionShader} from './swimmer-refraction';
import type {HoverEngineUniforms} from './hover-city';

// WebGL map adaptation of Dan Greenheck's Tidewater (MIT). See the vendored
// OceanFFT, WaterMaterial, SeaDetail, FoamTexture and ShoreWaves sources. The
// Native four-cascade spectrum and optical model, with WebGL FFT passes and
// baked bathymetry in place of the walking world's WebGPU compute stack.
const common=`
  uniform float uTime;uniform sampler2D uGround;uniform sampler2D uWaves;uniform vec4 uBounds;
  uniform sampler2D uSwellDisplacement;uniform sampler2D uWindDisplacement;
  vec4 groundAt(vec2 p){
    vec2 uv=(p-uBounds.xy)/uBounds.zw;
    if(any(lessThan(uv,vec2(0.)))||any(greaterThan(uv,vec2(1.))))return vec4(-10.,0.,0.,30.);
    return texture2D(uGround,uv);
  }
  float shelterAt(vec2 p){
    float lagoon=1.-smoothstep(5.7,8.1,length(p));
    float river=(1.-smoothstep(2.2,4.,abs(p.x+9.5)))*smoothstep(-26.,-22.,p.y)*(1.-smoothstep(-6.,-3.,p.y));
    return max(lagoon,river);
  }
  float attenuation(vec2 p,float depth){return smoothstep(0.,1.2,depth)*mix(1.,.18,shelterAt(p));}
`;

export function createTidewaterOcean(depth:T.Texture,time:{value:number},sunDirection:T.Vector3,sunColor:T.Color,engines:HoverEngineUniforms,wake:{pose:{value:T.Vector4};surface:{value:number}},swimmer:T.Mesh){
  const spectrum=createWaterSpectrum(time),patterns=createWaterPatterns();
  const marine=createSwimmerRefraction(swimmer);
  const caustics=createWaterCaustics(spectrum.ripples,sunDirection);
  const reflection=new T.WebGLRenderTarget(768,576,{type:T.HalfFloatType,depthBuffer:true});
  const refractionDepth=new T.DepthTexture(1024,768,T.UnsignedIntType);
  const refraction=new T.WebGLRenderTarget(1024,768,{type:T.HalfFloatType,depthTexture:refractionDepth});
  reflection.texture.name='Live island reflection';refraction.texture.name='Live refracted island';
  const reflectionCamera=new T.OrthographicCamera(),textureMatrix=new T.Matrix4(),bias=new T.Matrix4().set(.5,0,0,.5,0,.5,0,.5,0,0,.5,.5,0,0,0,1);
  // Capture the submerged height field from above. A view-camera capture
  // loses the far side of these steep, miniature shores behind the near bank.
  const bedCamera=new T.OrthographicCamera(-BOUNDS.width/2,BOUNDS.width/2,BOUNDS.depth/2,-BOUNDS.depth/2,1,48);
  bedCamera.position.set(BOUNDS.x+BOUNDS.width/2,24,BOUNDS.z+BOUNDS.depth/2);bedCamera.up.set(0,0,-1);
  bedCamera.lookAt(bedCamera.position.x,0,bedCamera.position.z);bedCamera.updateMatrixWorld();
  const material=new T.ShaderMaterial({name:'Tidewater map water',lights:true,transparent:true,uniforms:{
    ...T.UniformsUtils.clone(T.UniformsLib.lights),...engines,...marine.uniforms,uTime:time,uWhale:wake.pose,uWhaleSurface:wake.surface,
    uGround:{value:depth},uBounds:{value:new T.Vector4(BOUNDS.x,BOUNDS.z,BOUNDS.width,BOUNDS.depth)},
    uWaves:{value:spectrum.target.texture},uWindWaves:{value:spectrum.target.textures[1]},uRipples:{value:spectrum.ripples},uCapillary:{value:spectrum.target.textures[3]},
    uSwellDisplacement:{value:spectrum.displacement.textures[0]},uWindDisplacement:{value:spectrum.displacement.textures[1]},uMeshSpacing:{value:84/96},
    uPatterns:{value:patterns},uCaustics:{value:caustics.target.texture},
    uReflection:{value:reflection.texture},uRefraction:{value:refraction.texture},uRefractionDepth:{value:refractionDepth},
    uReflectionMatrix:{value:textureMatrix},uRefractionMatrix:{value:new T.Matrix4()},uInverseProjection:{value:new T.Matrix4()},uCameraWorld:{value:new T.Matrix4()},
    uViewDirection:{value:new T.Vector3()},uSun:{value:sunDirection},uSunColor:{value:sunColor},
    uClarity:{value:1},uSurf:{value:1},uFoam:{value:1},uReflections:{value:1}
  },
  vertexShader:`#include <common>\n#include <shadowmap_pars_vertex>\n`+common+`
    varying vec3 vWorld;varying vec2 vOceanXZ;varying vec2 vOceanCrest;uniform float uMeshSpacing;
    void main(){
      vec3 p=position;vec4 bed=groundAt(p.xz);float depth=-bed.r;
      vOceanXZ=p.xz;
      float lod0=max(log2(uMeshSpacing/${WAVE_PERIOD/256})+.7,0.),lod1=max(log2(uMeshSpacing/${OCEAN_PERIODS[1]/256})+.7,0.);
      vec4 swell=textureLod(uSwellDisplacement,p.xz/${WAVE_PERIOD},lod0),wind=textureLod(uWindDisplacement,p.xz/${OCEAN_PERIODS[1]},lod1);
      float att=attenuation(p.xz,depth)*smoothstep(1.5,4.,bed.a);
      // Choppy crests move horizontally as well as vertically. Keep the
      // original surface coordinate for fragment normals on that same wave.
      p+=(swell.xyz+wind.xyz)*att;vOceanCrest=vec2(p.y,max(swell.w,wind.w)*att);
      vec4 worldPosition=modelMatrix*vec4(p,1.),mvPosition=viewMatrix*worldPosition;
      vWorld=worldPosition.xyz;vec3 transformedNormal=normalMatrix*normal;
      #include <shadowmap_vertex>
      gl_Position=projectionMatrix*mvPosition;
    }
  `,
  fragmentShader:common+swimmerRefractionShader+`
    #include <common>
    #include <packing>
    #include <lights_pars_begin>
    #include <shadowmap_pars_fragment>
    #include <shadowmask_pars_fragment>
    uniform sampler2D uRipples;uniform sampler2D uWindWaves;uniform sampler2D uCapillary;uniform sampler2D uPatterns;uniform sampler2D uCaustics;uniform sampler2D uReflection;uniform sampler2D uRefraction;uniform sampler2D uRefractionDepth;
    uniform mat4 uReflectionMatrix;uniform mat4 uRefractionMatrix;uniform mat4 uInverseProjection;uniform mat4 uCameraWorld;
    uniform vec3 uViewDirection;uniform vec3 uSun;uniform vec3 uSunColor;
    uniform float uBoosterThrust[6];uniform float uHoverOffset;
    uniform float uClarity;uniform float uSurf;uniform float uFoam;uniform float uReflections;
    uniform vec4 uWhale;uniform float uWhaleSurface;
    varying vec3 vWorld;varying vec2 vOceanXZ;varying vec2 vOceanCrest;
    float fresnel(float c){float g=sqrt(1.333*1.333-1.+c*c);float a=(g-c)/(g+c),b=(c*(g+c)-1.)/(c*(g-c)+1.);return .5*a*a*(1.+b*b);}
    float phaseHG(float c,float g){return (1.-g*g)/(4.*PI*pow(max(1.+g*g-2.*g*c,.001),1.5));}
    vec3 skyAt(vec3 ray){
      float up=max(ray.y,0.);
      // A bright maritime horizon and blue zenith give broad facets something
      // to reflect. The old low-contrast grey dome made the sea look metallic.
      vec3 sky=mix(vec3(1.32,1.66,2.0),vec3(.34,.62,.90),pow(up,.58));
      float sunGlow=pow(max(dot(ray,uSun),0.),8.);
      sky+=vec3(.45,.39,.27)*sunGlow;
      vec2 cloudUv=ray.xz/(.2+up)*.27+vec2(uTime*.0007,0.);
      float cloud=texture2D(uPatterns,cloudUv).r*.72+texture2D(uPatterns,cloudUv*2.3+.41).a*.28;
      return mix(sky,vec3(1.75,1.87,2.),smoothstep(.49,.65,cloud)*.60);
    }
    void main(){
      vec2 p=vWorld.xz;vec4 bed=groundAt(p);float depth=max(vWorld.y-bed.r,0.);
      if(depth<.003)discard;
      float sheltered=shelterAt(p),att=attenuation(p,depth),sunlight=getShadowMask();
      mat2 turn=mat2(.8,-.6,.6,.8);
      vec4 large=texture2D(uWaves,vOceanXZ/${WAVE_PERIOD}),windWaves=texture2D(uWindWaves,vOceanXZ/${OCEAN_PERIODS[1]}),ripple=texture2D(uRipples,vOceanXZ/${RIPPLE_PERIOD}),capillary=texture2D(uCapillary,vOceanXZ/${OCEAN_PERIODS[3]});
      // Broad travelling gusts and stretched calm lanes break up the small
      // waves without weakening the underlying swell. No scaled copies of
      // one wave texture, and no temporal noise in the specular highlight.
      vec4 sea=texture2D(uPatterns,p/83.-vec2(uTime*.00055,uTime*.00018));
      vec2 wind=turn*p;
      float gust=smoothstep(.23,.78,sea.r);
      float slick=smoothstep(.47,.64,texture2D(uPatterns,wind/vec2(135.,23.)+vec2(uTime*.0003,.3)).a)*(1.-gust*.5);
      float smallWaves=mix(.5,1.5,gust)*(1.-slick*.8)*mix(1.,.35,sheltered);
      vec4 derivatives=(large+windWaves*mix(1.,smallWaves,.4)+(ripple+capillary)*smallWaves)*att;
      vec2 slope=derivatives.xy/max(vec2(.25),vec2(1.)+derivatives.zw);
      vec4 swell=vec4(slope,vOceanCrest);
      // Small shoreward waves follow the distance field, not hex/tile edges.
      float shorePhase=bed.a*2.8+uTime*.9+(sea.r-.5)*2.5;
      float surf=(1.-smoothstep(.5,3.5,bed.a))*smoothstep(.03,.3,depth)*(1.-sheltered*.9)*uSurf;
      slope+=bed.gb*cos(shorePhase)*surf*.12;
      // A narrow, quiet wake follows the surfacing humpback. It shares the
      // existing water draw and disappears as the animal submerges.
      vec2 whaleDelta=p-uWhale.xy;
      vec2 whaleLocal=vec2(dot(whaleDelta,vec2(uWhale.w,-uWhale.z)),dot(whaleDelta,uWhale.zw));
      float wakeWidth=.24+max(-whaleLocal.y-.6,0.)*.24;
      float wakeEdge=abs(whaleLocal.x)-wakeWidth;
      float whaleWake=exp(-wakeEdge*wakeEdge*65.)*smoothstep(-5.8,-3.,whaleLocal.y)*(1.-smoothstep(-.6,.9,whaleLocal.y))*uWhaleSurface;
      slope+=vec2(uWhale.w,-uWhale.z)*sign(whaleLocal.x)*whaleWake*sin(wakeEdge*16.-uTime*2.)*.075;
      vec3 V=normalize(uViewDirection),N=normalize(vec3(-slope.x,1.,-slope.y)),L=uSun;
      N=normalize(N+V*max(-dot(N,V)+.03,0.));
      float NoV=max(dot(N,V),.001),F=fresnel(NoV);

      // Project the refracted endpoint into the overhead submerged scene.
      // Its depth image includes the actual rocks and dock piles,
      // without the missing seabed behind an oblique camera's near bank.
      vec3 viewRay=refract(-V,N,1./1.333);
      float muV=max(-viewRay.y,.15),columnLength=depth/muV;
      float rayLength=columnLength;
      for(int i=0;i<3;i++){
        vec2 q=p+viewRay.xz*rayLength;
        float nextDepth=max(vWorld.y-groundAt(q).r,0.)/muV;
        rayLength=mix(rayLength,nextDepth,.5);
      }
      vec4 endClip=uRefractionMatrix*vec4(vWorld+viewRay*rayLength,1.);
      vec2 captureUv=endClip.xy/endClip.w*.5+.5;
      float inCapture=step(0.,min(min(captureUv.x,1.-captureUv.x),min(captureUv.y,1.-captureUv.y)));
      vec2 refractedUv=clamp(captureUv,vec2(.001),vec2(.999));
      vec4 bottom=texture2D(uRefraction,refractedUv);
      float opaqueDepth=texture2D(uRefractionDepth,refractedUv).r;
      vec4 viewBottom=uInverseProjection*vec4(refractedUv*2.-1.,opaqueDepth*2.-1.,1.);
      vec3 worldBottom=(uCameraWorld*vec4(viewBottom.xyz/viewBottom.w,1.)).xyz;
      // Rocks and pylons shorten the optical path. Do not tint these
      // with the depth of the seabed behind them.
      float validBottom=step(.5,bottom.a)*step(opaqueDepth,.9999)*inCapture;
      bottom.rgb*=inCapture;
      // Intersect the animal at its actual depth, from this displaced wave.
      // Sampling it at the seabed endpoint stretches its body into strips.
      vec4 marineColour;vec3 marineHit;
      if(refractSwimmer(vWorld,viewRay,marineColour,marineHit)&&marineHit.y>worldBottom.y){
        bottom=marineColour;worldBottom=marineHit;validBottom=1.;
      }
      // Shorten for actual objects above the bed, not another terrain bank
      // that happens to occlude the endpoint in the screen-space capture.
      float objectAboveBed=smoothstep(.06,.25,worldBottom.y-groundAt(worldBottom.xz).r)*validBottom;
      float path=mix(columnLength,min(columnLength,length(worldBottom-vWorld)),objectAboveBed);
      float opticalDepth=path*muV;
      float tropical=1.-smoothstep(6.,11.,length(p));
      // Tidewater's single + multiple scattering model, with optical lengths
      // scaled to the map. Light is integrated along the water column instead
      // of mixing in a painted turquoise tint at a fixed depth.
      float openSea=smoothstep(2.5,7.,depth)*(1.-sheltered);
      vec3 absorption=mix(mix(vec3(.95,.18,.085),vec3(1.45,.28,.19),tropical),vec3(.75,.095,.037),openSea)/uClarity;
      vec3 scattering=mix(mix(vec3(.042,.066,.078),vec3(.038,.068,.056),tropical),vec3(.020,.040,.070),openSea);
      vec3 extinction=absorption+scattering;
      vec3 lightRay=-refract(-L,vec3(0.,1.,0.),1./1.333);
      float muS=max(lightRay.y,.1);
      vec3 transmission=exp(-extinction*path);
      float phase=phaseHG(dot(viewRay,lightRay),.86)*.7+.3/(4.*PI);
      vec3 backscatter=scattering*.035,albedo=1.32*backscatter/(absorption+backscatter);
      vec3 kSun=extinction*(1.+muV/muS),kAmbient=extinction*(1.+muV/.75);
      vec3 inSun=uSunColor*4.4*(1.-fresnel(max(L.y,.02)))*sunlight*(scattering*phase+albedo*extinction/PI)*(1.-exp(-kSun*path))/kSun;
      vec3 ambientSky=mix(vec3(.38,.56,.78)*.68,vec3(.36,.75,1.15)*.92,openSea);
      vec3 inAmbient=ambientSky*(scattering*.25+albedo*extinction)*(1.-exp(-kAmbient*path))/kAmbient;

      // Sunlight loses energy on the way to the bed AND on its return to the
      // surface. Focused light comes from the actual animated wave normals.
      float bedDepth=mix(opticalDepth,max(-worldBottom.y,0.),validBottom);
      vec3 sunRay=refract(-L,N,1./1.333);
      vec2 entry=worldBottom.xz-sunRay.xz*bedDepth/max(-sunRay.y,.2);
      float caustic=texture2D(uCaustics,entry/${RIPPLE_PERIOD},min(2.,bedDepth*.3)).r;
      bottom.rgb*=exp(-extinction*bedDepth/muS);
      bottom.rgb*=mix(1.,clamp(caustic,.3,3.5),.30*exp(-bedDepth*.24)*sunlight*validBottom);
      // The host bed ends beyond the island. Extinguish it before that finite
      // boundary, so a rectangular terrain edge cannot show through the sea.
      bottom.rgb*=1.-smoothstep(6.,9.,bedDepth);
      vec3 water=bottom.rgb*transmission+inSun+inAmbient;

      float footprint=max(length(dFdx(vOceanXZ)),length(dFdy(vOceanXZ)));
      // Tidewater's Cox–Munk unresolved slope variance: short waves become
      // a continuous highlight as they shrink below a pixel, not glitter.
      float unresolved=clamp(log2(max(.001,110.*footprint/${Math.PI*.16}))/9.,0.,1.);
      float mss=.003+.00512*7.,roughVariance=smallWaves*smallWaves;
      float sigmaUnresolved=sqrt(mss*unresolved*roughVariance);
      vec3 reflectedRay=reflect(-V,N);
      vec3 skyRay=normalize(vec3(reflectedRay.x,max(reflectedRay.y,.004)+sigmaUnresolved*1.3*(1.-max(reflectedRay.y,0.)),reflectedRay.z));
      vec3 sky=mix(vec3(.035,.11,.18),skyAt(skyRay),smoothstep(-.12,.08,reflectedRay.y));
      vec4 rp=uReflectionMatrix*vec4(vWorld+vec3(N.x,0.,N.z)*.62,1.);
      vec2 reflectionUv=rp.xy/rp.w;
      vec4 reflected=texture2D(uReflection,clamp(reflectionUv,vec2(.001),vec2(.999)));
      float edge=smoothstep(0.,.035,min(min(reflectionUv.x,1.-reflectionUv.x),min(reflectionUv.y,1.-reflectionUv.y)));
      water=mix(water,mix(sky,reflected.rgb,reflected.a*edge*uReflections),F);
      // Parallel orthographic rays put every patch of ocean at the same
      // sun-glint angle. Give direct highlights a finite shading eye, 36 map
      // metres from the centre ray's sea intersection. The real orthographic
      // camera sits 130 metres away; using it still blankets the whole map
      // with the same broad lobe. Refraction/reflections keep true map rays.
      vec3 highlightEye=cameraPosition-V*(cameraPosition.y/max(V.y,.05)-36.);
      vec3 sunView=normalize(highlightEye-vWorld),H=normalize(sunView+L);
      float NoH=max(dot(N,H),0.),NoL=max(dot(N,L),0.),sunNoV=max(dot(N,sunView),.001);
      float normalVariance=max(dot(dFdx(N),dFdx(N)),dot(dFdy(N),dFdy(N)));
      float a2=max(.0004+mss*2.*unresolved*roughVariance,min(.035,normalVariance*.3));
      float den=NoH*NoH*(a2-1.)+1.,D=a2/(PI*den*den);
      float visibility=.5/max(NoL*sqrt(sunNoV*sunNoV*(1.-a2)+a2)+sunNoV*sqrt(NoL*NoL*(1.-a2)+a2),.001);
      float sunGlint=D*visibility*fresnel(max(dot(sunView,H),0.))*NoL*4.4;
      // A smooth highlight shoulder preserves the wave contrast without
      // sending entire shallow-water patches into the display's white limit.
      sunGlint=sunGlint/(1.+sunGlint/.24);
      water+=uSunColor*sunGlint*sunlight;
      water+=uSunColor*vec3(.003,.018,.015)*max(swell.b,0.)*att*sunlight;

      // Broken foam rafts and a thin lace edge; never a uniform white outline.
      vec2 foamUv=p/5.7-bed.gb*uTime*.008;
      float lace=texture2D(uPatterns,foamUv).g*.65+texture2D(uPatterns,turn*foamUv*1.91+uTime*.003).g*.35;
      float crest=pow(max(cos(shorePhase),0.),18.);
      float runup=(1.-smoothstep(.015,.19,depth))*(.38+.62*sin(uTime*.65+sea.a*5.)*.5+.31);
      float breakup=smoothstep(.28,.68,texture2D(uPatterns,p/9.7+vec2(.3,uTime*.003)).r);
      float coverage=(crest*surf*.46+runup*.14)*(1.-sheltered*.9)*mix(.05,1.,breakup);
      coverage+=smoothstep(.40,.72,swell.a)*.08*att;
      float foam=smoothstep(.52-coverage*.25,.78-coverage*.20,lace)*coverage;
      foam+=whaleWake*.08*smoothstep(.35,.75,lace);
      water=mix(water,vec3(.78,.88,.86)*mix(.45,1.,sunlight),clamp(foam*.84*uFoam,0.,1.));

      vec2 city=p-vec2(7.794,-13.5);
      for(int i=0;i<6;i++){float a=float(i)*PI/3.+PI/6.;vec2 engine=vec2(cos(a)*6.22,sin(a)*6.22*.8-1.2);float glow=exp(-dot(city-engine,city-engine)*1.6);water+=vec3(.008,.14,.42)*glow*uBoosterThrust[i]/(1.+uHoverOffset*.5);}
      // Blend the last millimetres over the actual beach already in the scene.
      // The clipped refraction texture has holes here; mixing its clear RGB
      // into the edge produces black dashes along the sand.
      float edgeAA=smoothstep(.0,max(fwidth(depth)*1.5,.018),depth);
      gl_FragColor=vec4(water,edgeAA);
      #include <tonemapping_fragment>
      #include <colorspace_fragment>
    }
  `});
  // Concentrate vertices around the island, retaining the full ocean extent.
  // Finer local geometry than the old uniform grid, with fewer triangles.
  const waterGrid=(segments:number)=>{
    const grid=new T.PlaneGeometry(240,240,segments,segments);grid.rotateX(-Math.PI/2);
    const position=grid.attributes.position;
    const stretch=(v:number)=>{const a=Math.abs(v)/120;return Math.sign(v)*(a<=.75?a/.75*42:42+(a-.75)/.25*78);};
    for(let i=0;i<position.count;i++){position.setX(i,stretch(position.getX(i)));position.setZ(i,stretch(position.getZ(i)));}
    return grid;
  };
  const geometry=waterGrid(128),overview=waterGrid(64);
  // Edge blending moves water into the transparent queue. Draw it first in
  // that queue so additive thrusters and neon above the sea remain visible.
  const mesh=new T.Mesh(geometry,material);mesh.name='Tidewater ocean · river · tropical lagoon';mesh.frustumCulled=false;mesh.renderOrder=-1;mesh.receiveShadow=true;
  let lastCapture=-Infinity,lastMarineTime=NaN,dirty=true;
  const direction=new T.Vector3(),target=new T.Vector3(),clearColor=new T.Color();
  const underwaterPlane=new T.Plane(new T.Vector3(0,-1,0),.025),aboveWaterPlane=new T.Plane(new T.Vector3(0,1,0),.02);
  const hullClip=new T.Plane(new T.Vector3(0,1,0),-.04);
  return {mesh,material,reflection,refraction,marine,spectrum,caustics,patterns,
    setOverview(low:boolean){const next=low?overview:geometry;if(mesh.geometry!==next){mesh.geometry=next;material.uniforms.uMeshSpacing.value=low?84/48:84/96;dirty=true;}},
    markDirty(){dirty=true;},
    setTerrainDepth(texture:T.Texture,bounds:{x:number;z:number;width:number;depth:number}){
      material.uniforms.uGround.value=texture;material.uniforms.uBounds.value.set(bounds.x,bounds.z,bounds.width,bounds.depth);
      Object.assign(bedCamera,{left:-bounds.width/2,right:bounds.width/2,top:bounds.depth/2,bottom:-bounds.depth/2});
      bedCamera.position.set(bounds.x+bounds.width/2,24,bounds.z+bounds.depth/2);bedCamera.lookAt(bedCamera.position.x,0,bedCamera.position.z);bedCamera.updateProjectionMatrix();bedCamera.updateMatrixWorld();dirty=true;
    },
    resize(w:number,h:number){const ratio=Math.min(1,1440/w,1000/h);refraction.setSize(Math.round(w*ratio),Math.round(h*ratio));reflection.setSize(Math.round(w*ratio*.625),Math.round(h*ratio*.625));dirty=true;},
    capture(renderer:T.WebGLRenderer,scene:T.Scene,camera:T.OrthographicCamera){
      const before={drawCalls:renderer.info.render.calls,triangles:renderer.info.render.triangles};
      const refreshMarine=dirty||lastMarineTime!==time.value;
      let passes=Number(spectrum.update(renderer));
      if(passes){caustics.update(renderer);passes++;}
      camera.getWorldDirection(direction);material.uniforms.uViewDirection.value.copy(direction).negate();
      material.uniforms.uInverseProjection.value.copy(bedCamera.projectionMatrixInverse);material.uniforms.uCameraWorld.value.copy(bedCamera.matrixWorld);
      material.uniforms.uRefractionMatrix.value.multiplyMatrices(bedCamera.projectionMatrix,bedCamera.matrixWorldInverse);
      if(dirty||time.value-lastCapture>=1/15||time.value<lastCapture){
        dirty=false;lastCapture=time.value;
        const oldTarget=renderer.getRenderTarget(),oldShadow=renderer.shadowMap.autoUpdate,oldBackground=scene.background,oldPlanes=renderer.clippingPlanes,wasVisible=mesh.visible,alpha=renderer.getClearAlpha();
        const localClipping=renderer.localClippingEnabled,hulls=new Map<T.Material,T.Plane[]|null>();
        const swimmerWrites=[swimmer.material].flat().map(material=>({material,color:material.colorWrite,depth:material.depthWrite}));
        const aboveOnly=new Map<T.Object3D,boolean>();
        const captureHidden=new Map<T.Object3D,boolean>();
        // The tiny floating hulls are open meshes at the waterline. An overhead
        // capture would project that cross-section as a second boat outline
        // on the bed. Clip only their refraction colour, retaining sun shadows
        // (clipShadows=false), their normal rendering and their reflection.
        scene.traverse(o=>{if(o.userData.skipWaterCapture){captureHidden.set(o,o.visible);o.visible=false;}if(o.userData.aboveWaterOnly){aboveOnly.set(o,o.visible);o.visible=false;}if((o as T.Mesh).isMesh)for(const m of [(o as T.Mesh).material].flat()){
          if(o.userData.role==='boat'&&!hulls.has(m)){hulls.set(m,m.clippingPlanes);m.clippingPlanes=[hullClip];}
        }});
        // Suppress its bed colour/depth, but keep the mesh present for the sun
        // shadow update. Its separate shadow material still writes normally.
        for(const {material} of swimmerWrites)material.colorWrite=material.depthWrite=false;
        const restoreHulls=()=>{for(const [m,planes] of hulls)m.clippingPlanes=planes;for(const {material,color,depth} of swimmerWrites){material.colorWrite=color;material.depthWrite=depth;}for(const [object,visible] of aboveOnly)object.visible=visible;renderer.localClippingEnabled=localClipping;};
        renderer.getClearColor(clearColor);mesh.visible=false;renderer.shadowMap.autoUpdate=false;
        try {
          // Alpha distinguishes reflected objects from the sky. Sky radiance
          // is sampled using the moving normal instead of a flat clear colour.
          scene.background=null;renderer.setClearColor(0x000000,0);
          renderer.localClippingEnabled=true;renderer.clippingPlanes=[underwaterPlane];renderer.setRenderTarget(refraction);renderer.render(scene,bedCamera);restoreHulls();
          passes++;
          if(material.uniforms.uReflections.value){
            reflectionCamera.copy(camera);reflectionCamera.position.y=-camera.position.y;target.copy(camera.position).add(direction);target.y=-target.y;reflectionCamera.up.set(0,-1,0);reflectionCamera.lookAt(target);reflectionCamera.updateMatrixWorld();
            textureMatrix.copy(bias).multiply(reflectionCamera.projectionMatrix).multiply(reflectionCamera.matrixWorldInverse);
            renderer.clippingPlanes=[aboveWaterPlane];renderer.setRenderTarget(reflection);renderer.render(scene,reflectionCamera);passes++;
          }
        } finally {
          restoreHulls();
          for(const [object,visible] of captureHidden)object.visible=visible;
          renderer.clippingPlanes=oldPlanes;scene.background=oldBackground;renderer.setRenderTarget(oldTarget);renderer.setClearColor(clearColor,alpha);renderer.shadowMap.autoUpdate=oldShadow;mesh.visible=wasVisible;
        }
      }
      if(refreshMarine){marine.capture(renderer,scene,camera);lastMarineTime=time.value;passes++;}
      return {passes,drawCalls:renderer.info.render.calls-before.drawCalls,triangles:renderer.info.render.triangles-before.triangles};
    },
    inspect:()=>({...spectrum.inspect(),causticsResolution:[caustics.target.width,caustics.target.height],causticsBytes:256*256*8*4/3,reflectionResolution:[reflection.width,reflection.height],reflections:!!material.uniforms.uReflections.value,refractionResolution:[refraction.width,refraction.height],captureHz:15,swimmerResolution:[marine.target.width,marine.target.height],swimmerBytes:256*256*12,patternBytes:256*256*4*4/3}),
    dispose(){geometry.dispose();overview.dispose();material.dispose();reflection.dispose();refraction.dispose();refractionDepth.dispose();spectrum.dispose();caustics.dispose();patterns.dispose();marine.dispose();}
  };
}
