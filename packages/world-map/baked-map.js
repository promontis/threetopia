import {WebGLRenderer,Scene,OrthographicCamera,PlaneGeometry,Mesh,ShaderMaterial,
  MeshBasicMaterial,Texture,Vector2,Color,Group,SRGBColorSpace,NoToneMapping} from 'three';
import {cloudFragment} from './map-atmosphere.js';
import {mapPixelRatio} from './map-motion.js';

const vertex=`varying vec2 vUv;void main(){vUv=uv;gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.);}`;
const sea=`varying vec2 vUv;uniform float uTime;uniform vec2 uCenter,uExtent;uniform vec3 uColor;
float waves(vec2 p){return sin(p.x*2.+p.y*3.+uTime*.8)*.45+sin(p.x*5.-p.y*4.-uTime*1.1)*.2+sin(p.x*13.+p.y*9.+uTime*.7)*.08;}
void main(){
 vec2 p=(uCenter+(vUv-.5)*uExtent)*.21;
 float h=waves(p);vec2 slope=vec2(waves(p+vec2(.02,0.))-h,waves(p+vec2(0.,.02))-h);
 vec3 normal=normalize(vec3(-slope*2.,1.));
 float light=pow(max(0.,dot(normal,normalize(vec3(-.1,.16,1.)))),50.);
 vec3 col=uColor*(.995+h*.006)+vec3(.006,.012,.012)*(light-.35);
 gl_FragColor=vec4(col,1.);
 #include <colorspace_fragment>
}`;
const animated=`varying vec2 vUv;uniform sampler2D uMap;uniform float uTime,uKind,uSeed;uniform vec2 uPixels;
void main(){
 vec4 art=texture2D(uMap,vUv);if(art.a<.003)discard;
 float t=uTime+uSeed;vec2 offset;vec3 col=art.rgb;
 if(uKind<.5){
   // Subtle local wind. The semantic silhouette stays fixed so a leaf cannot
   // slide across the original foreground house, branch or bridge.
   offset=vec2(sin(t*.9+vUv.y*9.)*.7+sin(t*.37)*.5,cos(t*.65+vUv.x*8.)*.5)/uPixels;
 }else if(uKind<1.5){
   // Native floor/reflection colour with live refraction and wave normals.
   offset=vec2(sin(vUv.y*210.+t*1.7),cos(vUv.x*174.-t*1.3))*1.2/uPixels;
   float wave=sin(vUv.x*175.+vUv.y*261.-t*1.7)+sin(vUv.x*321.-vUv.y*148.+t*1.3)*.4;
   col+=vec3(.012,.029,.028)*pow(max(0.,wave)*.72,7.);
 }else{
   // Feather the sheet/spray effect inside its native visibility mask. The
   // pale flowing water moves; surrounding sandstone/foliage stays unchanged.
   float spray=smoothstep(.09,.5,min(art.r,min(art.g,art.b)))*smoothstep(-.04,.04,art.b-art.r);
   offset=vec2(sin(vUv.y*77.-t*4.)*.65,sin(t*3.+vUv.x*17.))*.8/uPixels;
   offset*=spray;
   float flow=pow(.5+.5*sin(vUv.y*170.+t*8.+sin(vUv.x*71.)*3.),5.);
   col+=vec3(.07,.095,.1)*flow*spray;
 }
 vec4 shifted=texture2D(uMap,vUv+offset);
 // Native matte, never a guessed green/blue colour selection. Water cannot
 // refract the bridge above it. Fixed alpha also prevents seams at tile joins.
 col+= (shifted.rgb-art.rgb)*smoothstep(.9,.995,shifted.a);
 gl_FragColor=vec4(col,art.a);
 #include <colorspace_fragment>
}`;

/** Fixed-view native captures in ONE scene/camera. Geometry is never loaded.
 * Visible pixel size controls texture LOD; offscreen detail is released.
 * Low resolution stays available during atomic swaps, failed loads and zooms.
 */
export class BakedMap {
  constructor(root,{invalidate=()=>{},onError=()=>{}}={}) {
    this.root=root;this.invalidate=invalidate;this.onError=onError;this.tiles=new Map();
    this.geometry=new PlaneGeometry(1,1);this.scene=new Scene();this.camera=new OrthographicCamera(-1,1,1,-1,.1,100);this.camera.position.z=10;
    this.renderer=new WebGLRenderer({alpha:false,antialias:false,depth:false,stencil:false,powerPreference:'low-power'});
    this.renderer.outputColorSpace=SRGBColorSpace;this.renderer.toneMapping=NoToneMapping;
    root.append(this.renderer.domElement);this.abort=new AbortController();this.frames=0;this.time=0;
    this.renderer.domElement.addEventListener('webglcontextlost',e=>{e.preventDefault();this.lost=true;onError(Error('The map is temporarily paused.'));},{signal:this.abort.signal});
    this.renderer.domElement.addEventListener('webglcontextrestored',()=>{this.lost=false;invalidate();},{signal:this.abort.signal});
    const material=new ShaderMaterial({vertexShader:vertex,fragmentShader:sea,depthTest:false,depthWrite:false,uniforms:{uTime:{value:0},uColor:{value:new Color('#56b5be')},uCenter:{value:new Vector2()},uExtent:{value:new Vector2()}}});
    this.ocean=new Mesh(this.geometry,material);this.ocean.frustumCulled=false;this.ocean.renderOrder=-10;this.scene.add(this.ocean);
    this.clouds=[];
    for(let i=0;i<2;i++) {
      const material=new ShaderMaterial({vertexShader:vertex,fragmentShader:cloudFragment,transparent:true,depthTest:false,depthWrite:false,uniforms:{uTime:{value:0},uSeed:{value:i*7.3+1},uOpacity:{value:.4}}});
      const mesh=new Mesh(this.geometry,material);mesh.scale.set(i?34:46,i?24:31,1);mesh.renderOrder=100000;this.scene.add(mesh);this.clouds.push(mesh);
    }
  }
  async addTile(manifest,url,position={x:0,y:0},id=manifest.id) {
    if(this.tiles.has(id))throw Error(`Duplicate tile ${id}`);
    const group=new Group();group.position.set(position.x,position.y,0);group.name=id;this.scene.add(group);
    const tile={id,manifest,url,position,group,serial:0,overview:null,detail:null,pending:null,failed:null};this.tiles.set(id,tile);
    this.ocean.material.uniforms.uColor.value.set(manifest.oceanColor);
    tile.overview=await this.loadTier(tile,manifest.tiers[0],this.abort.signal);
    if(this.disposed||this.tiles.get(id)!==tile){this.release(tile.overview);return;}
    group.add(tile.overview.group);this.invalidate();
  }
  async loadTier(tile,tier,signal) {
    const bundle={resolution:tier.resolution,group:new Group(),textures:[],materials:[],bytes:tier.bytes,textureBytes:tier.textureBytes};
    const results=await Promise.allSettled(tier.layers.map(async(layer,index)=>{
      const response=await fetch(new URL(layer.src,tile.url),{signal});if(!response.ok)throw Error(`Map layer ${layer.id}: HTTP ${response.status}`);
      const bitmap=await createImageBitmap(await response.blob(),{imageOrientation:'flipY',premultiplyAlpha:'none',colorSpaceConversion:'none'});
      if(signal.aborted||this.disposed){bitmap.close();throw new DOMException('Aborted','AbortError');}
      const texture=new Texture(bitmap);texture.colorSpace=SRGBColorSpace;texture.needsUpdate=true;texture.flipY=false;
      texture.anisotropy=Math.min(4,this.renderer.capabilities.getMaxAnisotropy());bundle.textures.push(texture);
      let material;
      if(layer.effect==='still')material=new MeshBasicMaterial({map:texture,transparent:true,depthTest:false,depthWrite:false,toneMapped:false});
      else material=new ShaderMaterial({vertexShader:vertex,fragmentShader:animated,transparent:true,depthTest:false,depthWrite:false,uniforms:{uMap:{value:texture},uTime:{value:this.time},uKind:{value:{foliage:0,water:1,waterfall:2}[layer.effect]},uSeed:{value:index*1.71},uPixels:{value:new Vector2(...layer.pixels)}}});
      bundle.materials.push(material);
      const mesh=new Mesh(this.geometry,material),[x,y,w,h]=layer.rect;
      mesh.name=layer.id;mesh.position.set(x+w/2,y-h/2,0);mesh.scale.set(w,h,1);mesh.renderOrder=index;bundle.group.add(mesh);
    }));
    const failed=results.find(r=>r.status==='rejected');if(failed){this.release(bundle);throw failed.reason;}
    return bundle;
  }
  setView({width,height,span,center={x:0,y:0}}) {
    this.view={width,height,span,center};const ratio=mapPixelRatio(width,height,window.devicePixelRatio||1);
    const size=`${width}/${height}/${ratio}`;
    if(this.size!==size){this.renderer.setPixelRatio(ratio);this.renderer.setSize(width,height,false);this.size=size;}
    const extent=span*width/height;
    Object.assign(this.camera,{left:center.x-extent/2,right:center.x+extent/2,top:center.y+span/2,bottom:center.y-span/2});this.camera.updateProjectionMatrix();
    this.ocean.position.set(center.x,center.y,0);this.ocean.scale.set(extent,span,1);
    this.ocean.material.uniforms.uCenter.value.set(center.x,center.y);this.ocean.material.uniforms.uExtent.value.set(extent,span);
    for(const tile of this.tiles.values()) {
      const {frame,tiers}=tile.manifest;
      const visible=Math.abs(tile.position.x-center.x)<(extent+frame.width)/2&&Math.abs(tile.position.y-center.y)<(span+frame.height)/2;
      tile.group.visible=visible;
      const pixels=frame.width*height/span*ratio;
      // A small hysteresis band keeps detail from thrashing at an LOD boundary.
      const current=tile.pending?.resolution??tile.detail?.resolution??tiers[0].resolution;
      const detail=visible&&pixels>(current>384?320:420);
      const tier=detail?(pixels>(current===2048?1000:1150)?tiers[2]:tiers[1]):tiers[0];
      this.selectTier(tile,tier);
    }
  }
  selectTier(tile,tier) {
    if(!tile.overview||tile.failed===tier.resolution)return;
    if((tile.pending?.resolution??tile.detail?.resolution??tile.overview.resolution)===tier.resolution)return;
    tile.pending?.abort.abort();tile.pending=null;const serial=++tile.serial;
    if(tile.detail?.resolution===tier.resolution)return;
    if(tier===tile.manifest.tiers[0]) {
      if(tile.detail)this.release(tile.detail);tile.detail=null;tile.overview.group.visible=true;this.invalidate();return;
    }
    const abort=new AbortController();tile.pending={resolution:tier.resolution,abort};
    this.loadTier(tile,tier,abort.signal).then(bundle=>{
      if(this.disposed||serial!==tile.serial||!this.tiles.has(tile.id)){this.release(bundle);return;}
      if(tile.detail)this.release(tile.detail);
      tile.detail=bundle;tile.group.add(bundle.group);tile.overview.group.visible=false;tile.pending=null;this.invalidate();
    }).catch(error=>{
      if(serial!==tile.serial||this.disposed)return;
      tile.pending=null;
      if(error.name!=='AbortError'){tile.failed=tier.resolution;this.onError(Error('Could not load map detail. The overview is still available.'));}
    });
  }
  render(time,{clouds=true}={}) {
    if(this.disposed||this.lost)return;
    this.time=time;this.ocean.material.uniforms.uTime.value=time;
    for(const tile of this.tiles.values())if(tile.group.visible&&tile.detail)for(const material of tile.detail.materials)if(material.uniforms)material.uniforms.uTime.value=time;
    this.clouds.forEach((mesh,i)=>{
      mesh.visible=clouds;mesh.position.set((i?104:-104)+Math.sin(time*.015+i)*12,(i?-58:62)+Math.cos(time*.009+i)*4,0);
      mesh.material.uniforms.uTime.value=time;
    });
    this.renderer.render(this.scene,this.camera);this.frames++;
  }
  inspect() {
    return {frames:this.frames,time:this.time,drawCalls:this.renderer.info.render.calls,triangles:this.renderer.info.render.triangles,
      textures:this.renderer.info.memory.textures,textureBytes:[...this.tiles.values()].reduce((s,t)=>s+(t.overview?.textureBytes??0)+(t.detail?.textureBytes??0),0),
      tiles:[...this.tiles.values()].map(t=>({id:t.id,visible:t.group.visible,resolution:t.detail?.resolution??t.overview?.resolution,pending:t.pending?.resolution,
        layers:(t.detail??t.overview)?.group.children.map(m=>({id:m.name,position:m.position.toArray(),size:m.scale.toArray()}))}))};
  }
  release(bundle) {
    if(!bundle)return;bundle.group.removeFromParent();
    bundle.materials.forEach(m=>m.dispose());bundle.textures.forEach(t=>{t.dispose();t.image.close();});
  }
  removeTile(id) {
    const tile=this.tiles.get(id);if(!tile)return;tile.serial++;tile.pending?.abort.abort();
    this.release(tile.overview);this.release(tile.detail);tile.group.removeFromParent();this.tiles.delete(id);
  }
  dispose() {
    this.disposed=true;this.abort.abort();for(const id of this.tiles.keys())this.removeTile(id);
    this.ocean.material.dispose();this.clouds.forEach(m=>m.material.dispose());this.geometry.dispose();this.renderer.dispose();this.renderer.domElement.remove();
  }
}
