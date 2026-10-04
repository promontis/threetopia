import {WebGLRenderer,Scene,OrthographicCamera,PlaneGeometry,Mesh,ShaderMaterial,
  TextureLoader,Vector2,Vector3,Vector4,Color,Group,MeshBasicMaterial,BufferGeometry,LineLoop,LineDashedMaterial,SRGBColorSpace,NoToneMapping} from 'three';
import {mapPixelRatio,componentMotion} from './map-motion.js';
import {hexCorners} from './index.js';
import {projectMap} from './image-format.js';

const vertex=`varying vec2 vUv; void main(){vUv=uv;gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.);}`;
const noise=`
float hash(vec2 p){return fract(sin(dot(p,vec2(127.1,311.7)))*43758.5453);}
float noise(vec2 p){vec2 i=floor(p),f=fract(p);f=f*f*(3.-2.*f);return mix(mix(hash(i),hash(i+vec2(1.,0.)),f.x),mix(hash(i+vec2(0.,1.)),hash(i+1.),f.x),f.y);}
float fbm(vec2 p){return noise(p)*.57+noise(p*2.07+9.2)*.28+noise(p*4.11-4.3)*.15;}
`;
const oceanFragment=`
varying vec2 vUv;
uniform sampler2D uMap;
uniform float uTime,uReady;
uniform vec2 uCenter,uExtent;
${noise}
float heightAt(vec2 p){
  return sin(p.x*.026+p.y*.037+uTime*.85)*.52
    +sin(p.x*.061-p.y*.071-uTime*1.1)*.23
    +sin(p.x*.134+p.y*.081+uTime*1.6)*.12
    +fbm(p*.024+vec2(uTime*.1,-uTime*.12))*.4;
}
void main(){
  vec2 p=uCenter+(vec2(vUv.x,1.-vUv.y)-.5)*uExtent;
  float h=heightAt(p);
  vec2 slope=vec2(heightAt(p+vec2(2.,0.))-h,heightAt(p+vec2(0.,2.))-h);
  // Shared sea palette; small waves are generated, never painted into the map.
  float depth=fbm(p*.0025)*.22;
  vec3 base=mix(vec3(.028,.15,.16),vec3(.08,.25,.25),depth);
  vec3 normal=normalize(vec3(-slope.x*3.,-slope.y*3.,1.));
  float glint=pow(max(0.,dot(normal,normalize(vec3(-.21,.42,1.)))),48.);
  float crest=smoothstep(.64,1.02,h)*(.3+.7*noise(p*.075+uTime*.16));
  base*=.97+h*.035;
  base+=vec3(.37,.59,.58)*glint*.035+vec3(.29,.52,.53)*crest*.06;
  gl_FragColor=vec4(base,1.);
  #include <colorspace_fragment>
}`;
export const cloudFragment=`
varying vec2 vUv;uniform float uTime,uSeed,uOpacity;
${noise}
float puff(vec3 p,vec3 c,vec3 r){return 1.-length((p-c)/r);}
float field(vec3 p){
  float d=max(puff(p,vec3(-.73,-.12,0.),vec3(.43,.38,.43)),puff(p,vec3(-.3,.12,.05),vec3(.53,.58,.52)));
  d=max(d,puff(p,vec3(.25,.02,-.05),vec3(.59,.49,.55)));
  d=max(d,puff(p,vec3(.79,-.18,.03),vec3(.35,.32,.37)));
  return max(d,puff(p,vec3(.04,-.25,.08),vec3(.72,.3,.49)));
}
void main(){
  vec2 xy=(vUv-.5)*vec2(2.8,2.35);float t=uTime*.022;vec4 sum=vec4(0.);
  // Sixteen bounded volume samples: actual procedural cloud depth and sunlit lobes.
  for(int i=0;i<16;i++){
    vec3 p=vec3(xy,1.-float(i)*.125);
    float shape=field(p);
    float n=fbm(p.xy*7.+p.z*3.+vec2(t+uSeed,-t*.7));
    float density=max(0.,shape+(n-.5)*.3);
    float alpha=1.-exp(-density*.8);
    float sun=clamp((shape-field(p+vec3(-.12,.16,.14)))*3.6+.46,.2,1.);
    vec3 colour=mix(vec3(.29,.43,.48),vec3(1.,.97,.86),sun);
    sum.rgb+=(1.-sum.a)*alpha*colour;sum.a+=(1.-sum.a)*alpha;
  }
  if(sum.a<.008)discard;
  gl_FragColor=vec4(sum.rgb/max(.001,sum.a),sum.a*uOpacity);
  #include <colorspace_fragment>
}`;
const surfaceFragment=`
varying vec2 vUv;
uniform sampler2D uMap;uniform vec4 uCrop;
uniform float uTime,uSeed,uOpacity,uSpeed,uKind,uHasMap,uIsolated;
uniform vec3 uColor;
${noise}
vec4 sampleArt(vec2 p){return texture2D(uMap,vec2(uCrop.x+p.x*uCrop.z,1.-uCrop.y-p.y*uCrop.w));}
void main(){
  vec2 p=vec2(vUv.x,1.-vUv.y);float t=uTime*uSpeed+uSeed;
  float edge=smoothstep(0.,.09,p.x)*smoothstep(0.,.09,1.-p.x)*smoothstep(0.,.045,p.y)*smoothstep(0.,.08,1.-p.y);
  vec4 art=sampleArt(p);vec3 col=art.rgb;float alpha=0.;
  if(uKind<.5){
    // Waterfall: downward streaks, flowing refraction, foamy impact at the foot.
    vec2 flow=vec2(sin(p.y*19.-t*5.+p.x*11.)*.01,sin(t*3.+p.x*12.)*.015);
    col=mix(sampleArt(p+flow).rgb,vec3(.31,.65,.7),.2);
    float white=smoothstep(.17,.55,min(art.r,min(art.g,art.b)))*smoothstep(-.045,.06,art.b-art.r);
    float streak=pow(.5+.5*sin(p.x*86.+sin(p.x*27.)*4.+p.y*8.-t*7.),5.);
    float tumble=fbm(vec2(p.x*15.,p.y*6.-t*2.));
    float impact=smoothstep(.67,.95,p.y)*noise(p*32.-vec2(0.,t*4.));
    col=mix(col,vec3(.88,1.,1.),streak*.62+tumble*.22+impact*.27);
    alpha=edge*mix(1.,white,uHasMap)*uOpacity;
  }else if(uKind<1.5){
    // Only water-coloured pixels refract; docks, rocks and buildings stay still.
    float water=smoothstep(.01,.085,art.g-art.r)*smoothstep(-.01,.06,art.b-art.r);
    vec2 shift=vec2(sin(p.y*41.+t*1.7),cos(p.x*37.-t*1.3))*.009;
    col=sampleArt(p+shift).rgb;
    float ripple=pow(.5+.5*sin(p.x*50.+p.y*62.-t*2.1+noise(p*6.)*5.),10.);
    col+=vec3(.1,.17,.16)*ripple*.21;
    alpha=edge*water*uOpacity;
  }else if(uKind<2.5){
    // Irregular, slow neon dips. No rapid flash or global screen pulse.
    float pulse=.2+.8*smoothstep(-.18,.65,sin(t*1.23)*sin(t*.53+uSeed));
    float peak=max(art.r,max(art.g,art.b)),low=min(art.r,min(art.g,art.b));
    float mask=smoothstep(.09,.42,peak)*smoothstep(.05,.27,peak-low);
    col=art.rgb*(.22+pulse*1.1)+uColor*pulse*.12;
    alpha=edge*mix(1.,mask,uHasMap)*uOpacity;
  }else{
    // Local foliage refraction moves leaf detail, while trunks/houses stay rooted.
    float green=smoothstep(.015,.065,art.g-max(art.r*.88,art.b));
    float blossom=smoothstep(.025,.14,art.r-art.g)*smoothstep(.02,.12,art.b-art.g*.78);
    float bend=pow(1.-p.y,1.5)*(sin(t*.85)*.0005+sin(t*.33+uSeed)*.00025);
    vec4 leaves=sampleArt(p+vec2(bend,sin(t+p.x*4.)*.0018*(1.-p.y)));
    col=mix(art.rgb,leaves.rgb,step(.97,leaves.a));
    alpha=edge*max(green,blossom)*uOpacity;
  }
  alpha=mix(alpha,art.a*uOpacity,uIsolated);
  alpha*=mix(1.,art.a,uHasMap*(1.-uIsolated));
  if(alpha<.003)discard;gl_FragColor=vec4(col,alpha);
  #include <colorspace_fragment>
}`;
/** All map art, sprites, water and weather share one scene, camera and render call.
 * There is no independent animation loop or screen-space art overlay here. */
export class MapComposition {
  constructor(root,{invalidate=()=>{},onError=()=>{}}={}) {
    Object.assign(this,{root,invalidate,onError});this.tiles=new Map();this.textures=new Map();this.lines=[];
    this.geometry=new PlaneGeometry(1,1);this.scene=new Scene();this.camera=new OrthographicCamera(-1,1,1,-1,.1,100);this.camera.position.z=10;
    this.loader=new TextureLoader();this.abort=new AbortController();this.renders=0;
    try{
      this.renderer=new WebGLRenderer({alpha:false,antialias:true,powerPreference:'low-power',depth:false,stencil:false});
      this.renderer.outputColorSpace=SRGBColorSpace;this.renderer.toneMapping=NoToneMapping;this.renderer.setClearColor('#124e5c');
      const canvas=this.renderer.domElement;canvas.className='image-map-webgl';canvas.dataset.mapPass='composition';canvas.setAttribute('aria-label','Map rendered from the walking world');root.prepend(canvas);
      canvas.addEventListener('webglcontextlost',e=>{e.preventDefault();this.lost=true;root.dataset.mapState='recovering';this.onError(Error('The map graphics paused. Waiting for the browser to restore them.'));},{signal:this.abort.signal});
      canvas.addEventListener('webglcontextrestored',()=>{this.lost=false;root.dataset.mapState='ready';this.invalidate();},{signal:this.abort.signal});
      const uniforms={uMap:{value:null},uReady:{value:0},uTime:{value:0},uCenter:{value:new Vector2()},uExtent:{value:new Vector2(1,1)}};
      this.waterMaterial=new ShaderMaterial({vertexShader:vertex,fragmentShader:oceanFragment,uniforms,depthTest:false,depthWrite:false});
      this.water=new Mesh(this.geometry,this.waterMaterial);this.water.frustumCulled=false;this.water.renderOrder=-1;this.scene.add(this.water);
      root.dataset.atmosphere='three';
    }catch(error){this.dispose();throw Error('The map needs WebGL. Enable hardware acceleration and reload.');}
  }
  texture(url){
    let cached=this.textures.get(url);if(cached){cached.refs++;return cached;}
    let resolve,reject;const ready=new Promise((yes,no)=>{resolve=yes;reject=no;});
    const texture=this.loader.load(url,()=>{resolve();if(!this.disposed)this.invalidate();},undefined,()=>reject(Error('A map image could not load. Reload to retry.')));
    texture.colorSpace=SRGBColorSpace;texture.anisotropy=Math.min(4,this.renderer.capabilities.getMaxAnisotropy());
    cached={texture,ready,refs:1};this.textures.set(url,cached);return cached;
  }
  async addTile(tile,data,center,baseUrl,rank){
    const group=new Group();group.name=tile.id;group.position.set(center.x,-center.y,0);this.scene.add(group);
    const item={group,layers:new Map(),visible:true};this.tiles.set(tile.id,item);const pending=[];
    for(const layer of [{...data.terrain,id:'terrain'},...data.components]){
      const effect=layer.effect,isCloud=effect?.kind==='cloud',url=layer.src?new URL(layer.src,baseUrl).href:null;
      const asset=url?this.texture(url):null;if(asset)pending.push(asset.ready);
      let material;
      if(effect){
        material=new ShaderMaterial({vertexShader:vertex,fragmentShader:isCloud?cloudFragment:surfaceFragment,
          uniforms:{uTime:{value:0},uSeed:{value:effect.seed??1},uOpacity:{value:layer.opacity??1},uSpeed:{value:effect.speed??1},uColor:{value:new Color(effect.color??'#ffc98a')},uKind:{value:{waterfall:0,ripple:1,light:2,foliage:3}[effect.kind]??0},uHasMap:{value:asset?1:0},uIsolated:{value:effect.isolated?1:0},uMap:{value:asset?.texture??this.ocean},uCrop:{value:new Vector4(...(layer.crop??[0,0,1,1]))}},transparent:true,depthWrite:false,depthTest:false});
      }else material=new MeshBasicMaterial({map:asset.texture,transparent:true,opacity:layer.opacity??1,depthWrite:false,depthTest:false,toneMapped:false});
      // The pivot is a child of the tile. Camera changes never alter local transforms.
      const pivot=new Group();pivot.name=layer.id;pivot.position.set(layer.position[0],-layer.position[1],0);group.add(pivot);
      const mesh=new Mesh(this.geometry,material);mesh.frustumCulled=false;
      mesh.position.set((.5-layer.anchor[0])*layer.size[0],-(.5-layer.anchor[1])*layer.size[1],0);mesh.scale.set(...layer.size,1);
      mesh.renderOrder=isCloud&&!effect.grounded?100000+rank:rank*100+(layer.id==='terrain'?0:layer.order??2);pivot.add(mesh);
      item.layers.set(layer.id,{layer,pivot,mesh,url,visible:true});
    }
    await Promise.all(pending);if(!this.disposed){item.loaded=true;this.invalidate();}
  }
  addBoundary(tile,kind){
    const points=hexCorners(tile.q,tile.r).map(([x,z])=>{const p=projectMap(x,z);return new Vector3(p.x,-p.y,0);});
    const mesh=new LineLoop(new BufferGeometry().setFromPoints(points),new LineDashedMaterial({color:'#f5e9bb',transparent:true,opacity:.5,depthTest:false,depthWrite:false,dashSize:7,gapSize:7}));
    mesh.computeLineDistances();mesh.renderOrder=200000;this.scene.add(mesh);this.lines.push({mesh,kind,tile});
  }
  setLayerVisible(id,layer,visible){const tile=this.tiles.get(id);if(!tile)return;if(layer==='tile')tile.visible=visible;else{const item=tile.layers.get(layer);if(item)item.visible=visible;}}
  setView({width:w,height:h,span,center,mini}){
    this.view={width:w,height:h,span,center,mini};const ratio=mapPixelRatio(w,h,window.devicePixelRatio||1,mini),size=`${w}/${h}/${ratio}`;
    if(size!==this.size){this.renderer.setPixelRatio(ratio);this.renderer.setSize(w,h,false);this.size=size;}
    const aspect=w/h;Object.assign(this.camera,{left:center.x-span*aspect/2,right:center.x+span*aspect/2,top:-center.y+span/2,bottom:-center.y-span/2});this.camera.updateProjectionMatrix();this.camera.updateMatrixWorld();
    this.water.position.set(center.x,-center.y,0);this.water.scale.set(span*aspect,span,1);
    this.waterMaterial.uniforms.uCenter.value.set(center.x,center.y);this.waterMaterial.uniforms.uExtent.value.set(span*aspect,span);
  }
  project(x,y){const p=new Vector3(x,-y,0).project(this.camera);return{x:(p.x+1)*this.view.width/2,y:(1-p.y)*this.view.height/2};}
  render(time,{boundaries,creators,mini}){
    if(this.disposed||this.lost)return;
    this.waterMaterial.uniforms.uTime.value=time;let effects=0;
    for(const tile of this.tiles.values()){
      tile.group.visible=tile.visible;
      for(const item of tile.layers.values()){
        const {layer,pivot,mesh}=item,effect=layer.effect,motion=componentMotion(layer,time);
        // Captured plants/buildings remain part of the mini view; only their
        // animation clock stops. Optional atmospheric overlays can be omitted.
        pivot.visible=item.visible&&(!mini||!effect||effect.isolated);if(!pivot.visible)continue;
        let dx=motion.x,dy=motion.y;
        if(effect?.kind==='cloud'){const phase=time*.028*(effect.speed??1)+(effect.seed??1),travel=effect.travel??[0,0];dx+=Math.sin(phase)*travel[0];dy+=Math.sin(phase*.73)*travel[1];}
        pivot.position.set(layer.position[0]+dx,-layer.position[1]-dy,0);pivot.rotation.z=-motion.rotation;
        if(effect){mesh.material.uniforms.uTime.value=time;effects++;}else mesh.material.opacity=(layer.opacity??1)*motion.opacity;
      }
    }
    for(const line of this.lines)line.mesh.visible=!mini&&(line.kind==='slot'?creators:boundaries);
    this.renderer.render(this.scene,this.camera);this.root.dataset.frames=String(++this.renders);this.root.dataset.webglEffects=String(effects);
  }
  /** Creator diagnostics use the real scene graph/camera, never a parallel CSS transform. */
  inspect(){
    this.scene.updateMatrixWorld(true);
    return [...this.tiles].map(([id,tile])=>({id,visible:tile.group.visible,layers:[...tile.layers].map(([id,l])=>{
      const anchor=l.pivot.getWorldPosition(new Vector3()),p=anchor.clone().project(this.camera);
      return {id,visible:l.pivot.visible,position:anchor.toArray(),pixel:[(p.x+1)*this.view.width/2,(1-p.y)*this.view.height/2],parent:l.pivot.parent.name};
    })}));
  }
  dispose(){
    this.disposed=true;this.abort.abort();
    for(const tile of this.tiles.values())for(const layer of tile.layers.values())layer.mesh.material.dispose();this.tiles.clear();
    for(const {mesh} of this.lines){mesh.geometry.dispose();mesh.material.dispose();}this.lines=[];
    for(const {texture} of this.textures.values())texture.dispose();this.textures.clear();
    this.waterMaterial?.dispose();this.ocean?.dispose();this.geometry.dispose();
    if(this.renderer){this.renderer.domElement.remove();this.renderer.dispose();this.renderer.forceContextLoss();}
  }
}
