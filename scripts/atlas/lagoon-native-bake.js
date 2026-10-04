// Offline only. Beauty and semantic mattes come from the SAME native scene,
// camera, frame and original material vertex/alpha programs. No colour keying.
export async function prepareBake() {
  const q=window.__lagoon, e=q.engine, review=window.lagoonNativeReview;
  const T=(await import('/assets/three.module-CA589J5f.js')).i;
  e.stop(); e.params.freeze=10; e.time=10;
  for(const name of ['ambient-birds','ambient-motes','ambient-critters','lagoon-particulates']) {
    const object=e.scene.getObjectByName(name);if(object)object.visible=false;
  }
  const p=e.pipeline;
  p.settings.grain=0; p.settings.ca=0; p.settings.taa=false;
  // Screen-space lens darkening cannot be stitched into a shared ocean.
  p.compositeMat.uniforms.uVignette.value=0;
  for(let i=0;i<12;i++)await review.render();
  // Keep native exposure, reflections and lighting in the beauty capture.
  p.adapt.update=()=>{};
  await review.render();
  const assignments=new Map(),components=[];
  for(const tree of q.registry.get('trees').trees) {
    const id=`canopy-${tree.id}`;
    assignments.set(tree.meshes.leaves,id);
    components.push({id,effect:'foliage',sourceObject:tree.meshes.leaves.name});
  }
  assignments.set(q.registry.get('palms').meshes.fronds,'palms');
  components.push({id:'palms',effect:'foliage',sourceObject:'palmFronds'});
  const falls=q.registry.get('waterfalls');
  for(const mesh of [falls.sheetMesh,falls.mist,falls.streamMesh])assignments.set(mesh,'falls');
  components.push({id:'falls',effect:'waterfall',sourceObject:'waterfall-sheets, waterfall-mist, waterfall-streams'});
  const water=q.registry.get('water').mesh;
  assignments.set(water,'water');
  components.unshift({id:'water',effect:'water',sourceObject:'lagoon-surface'});
  const originals=[],mattes=[];
  let selected='island';
  const coastGLSL=`float tileCoast(vec2 p) {
    vec2 d=p-vec2(-12.,4.);float a=atan(d.y,d.x);
    float r=1./length(vec2(cos(a)/102.,sin(a)/73.));
    return r+2.1*sin(a*5.+.7)+1.3*sin(a*9.-1.2)-length(d);
  }`;
  const append=(shader,body)=>shader.replace(/}\s*$/,`${body}\n}`);
  e.scene.traverse(object=>{
    if(!object.material)return;
    const materials=Array.isArray(object.material)?object.material:[object.material];
    const clones=materials.map(original=>{
      const material=original.clone(),ink={value:0};
      // MeshStandardMaterial.copy does not copy custom shader defines.
      material.defines={...original.defines};
      const isWater=object===water;
      const header=`uniform float uTileInk;\n${isWater?coastGLSL:''}\n`;
      const final=`gl_FragColor=vec4(vec3(uTileInk${isWater?'*smoothstep(-23.,-12.,tileCoast(vWorld.xz))':''}),1.);`;
      if(original.isShaderMaterial) {
        // Share the source's live uniform references, including wind + depth.
        material.uniforms={...original.uniforms,uTileInk:ink};
        material.fragmentShader=header+append(original.fragmentShader,final);
      }else{
        material.onBeforeCompile=(shader,renderer)=>{
          original.onBeforeCompile(shader,renderer);
          shader.uniforms.uTileInk=ink;
          shader.fragmentShader=header+append(shader.fragmentShader,final);
        };
        material.customProgramCacheKey=()=>`tile-matte:${original.customProgramCacheKey()}`;
      }
      // A coverage pass must replace colour. The native renderer's translucent
      // foliage pass otherwise leaks low-level tint into every semantic matte.
      material.blending=T.NoBlending;material.transparent=false;
      material.toneMapped=false;
      material.needsUpdate=true;
      mattes.push({object,material,ink,id:assignments.get(object)});
      return material;
    });
    originals.push({object,original:object.material,matte:Array.isArray(object.material)?clones:clones[0]});
  });
  const renderer=e.renderer;
  const size=renderer.getDrawingBufferSize(new T.Vector2());
  const target=new T.WebGLRenderTarget(size.x,size.y,{samples:4,depthBuffer:true});
  const quad=new T.Mesh(new T.PlaneGeometry(2,2),new T.ShaderMaterial({
    uniforms:{map:{value:target.texture}},
    vertexShader:'varying vec2 uv0;void main(){uv0=uv;gl_Position=vec4(position.xy,0.,1.);}',
    fragmentShader:'uniform sampler2D map;varying vec2 uv0;void main(){gl_FragColor=texture2D(map,uv0);}',
    depthTest:false,depthWrite:false,toneMapped:false,
  }));
  const screen=new T.Scene();screen.add(quad);
  window.lagoonBake={async mask(id){
    selected=id;
    for(const {object,matte} of originals)object.material=matte;
    for(const item of mattes) {
      // Sky remains black. All source surfaces participate in occlusion;
      // a canopy behind a house is NOT painted over that house in the map.
      item.ink.value=selected==='island'?(item.object.name==='sky'?0:1):Number(item.id===selected);
    }
    const oldMask=e.camera.layers.mask;
    e.camera.layers.mask=1|2|4|8; // source opaque, water, FX, non-reflected
    renderer.shadowMap.autoUpdate=false;renderer.shadowMap.needsUpdate=false;
    renderer.setRenderTarget(target);renderer.setClearColor(0,1);renderer.clear();
    renderer.render(e.scene,e.camera);
    renderer.setRenderTarget(null);renderer.render(screen,p.fsCamera);
    e.camera.layers.mask=oldMask;
    await e.gpuIdle();
  }};
  return {
    version:1,source:'packages/world-sources/lagoon/original',
    projection:{type:'fixed-perspective',position:e.camera.position.toArray(),quaternion:e.camera.quaternion.toArray(),fov:e.camera.fov,aspect:e.camera.aspect,near:e.camera.near,far:e.camera.far},
    frozenTime:10,width:size.x,height:size.y,components,
    note:'Native beauty plus visibility mattes. Fixed viewpoint; no orbit. Perimeter adapted by lagoon-native-view.js.',
  };
}
