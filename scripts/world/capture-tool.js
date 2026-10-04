// Build-time source capture. This code is never imported by the public world.
const panel = document.createElement('section');
panel.setAttribute('aria-label', 'World package capture');
panel.style.cssText = 'position:fixed;z-index:100000;top:16px;left:16px;background:#faf8f0;color:#123;padding:20px;max-width:650px;max-height:85vh;overflow:auto;font:13px/1.5 monospace';
panel.innerHTML = '<strong>Threetopia source package capture</strong><p id="capture-status">Waiting for original builders…</p><button id="capture-start" disabled>Capture original assets</button><select id="capture-mode"><option value="surface">Surface</option><option value="solid">Solid</option><option value="splat">Splat</option></select><pre id="capture-report"></pre>';
document.body.append(panel);
const status = panel.querySelector('#capture-status');
const button = panel.querySelector('button');
const report = panel.querySelector('pre');
const nextFrame = () => new Promise(resolve => setTimeout(resolve, 0));
const fetchOriginal = window.fetch.bind(window);
window.fetch = (input, init) => fetchOriginal(input, {...init,cache:'no-store'});

let source;
const poll = setInterval(() => {
  const a = window.__lagoon;
  const b = window.__v;
  if (!a?.ready && !b?.scene) {
    status.textContent = 'Building original scene… ' + JSON.stringify(a?.modules || {});
    if (a?.errors?.length) report.textContent=JSON.stringify(a.errors,null,2);
    return;
  }
  clearInterval(poll);
  source = a ? { name:'lagoon', THREE:a.THREE, renderer:a.engine.renderer, scene:a.engine.scene, heightAt:a.captureContext.hf.groundHeight, collider:a.collision.mesh, engine:a.engine, bounds:[-190,-180,190,180] } : { name:'sakura', THREE:b.THREE, renderer:b.renderer, scene:b.scene, heightAt:b.heightAt, bounds:[-150,-355,150,175] };
  source.engine?.stop();
  source.scene.updateMatrixWorld(true);
  const inventory = [];
  source.scene.traverse(o => { if (o.isMesh) inventory.push({ name:o.name, parent:o.parent?.name, type:o.type, vertices:o.geometry?.attributes?.position?.count, visible:o.visible, material:[].concat(o.material).map(m => ({ name:m.name,type:m.type,uniforms:m.uniforms?Object.keys(m.uniforms):[],maps:Object.keys(m).filter(k=>m[k]?.isTexture),attributes:Object.keys(o.geometry.attributes) })) }); });
  report.textContent = JSON.stringify({ready:true,project:source.name,meshes:inventory.length,inventory}, null, 2);
  status.textContent = 'Original scene ready. Geometry and GPU-baked textures can be captured.';
  button.disabled = false;
}, 700);

button.addEventListener('click', async () => {
  button.disabled = true;
  try { await capture(source); } catch (error) { status.textContent='Capture failed: '+error; report.textContent=error.stack; button.disabled=false; }
});

async function capture({name,THREE:T,renderer,scene,heightAt,collider,bounds}) {
  const manifest = { version:1, project:name, sourceRevision:name==='lagoon'?'index-BjH0GYGf.js':'scene-SV5IBQX7.js', bounds, geometries:[],materials:[],textures:[],images:[],meshes:[],captureNotes:'Original generated geometry and texture maps. Runtime materials are adapted for shared WebGPU; standalone skies, water and postprocessing are host-owned.' };
  const geometryMap = new Map(), materialMap = new Map(), textureMap = new Map(), imageMap = new Map(), arrayMap = new WeakMap();
  const save = async (file,data) => {
    const response = await fetch('/__capture/'+name+'/'+file,{method:'POST',body:data});
    if (!response.ok) throw new Error('Saving '+file+': '+response.status);
    return (await response.json()).file;
  };
  const saveArray = async (file, array) => {
    const cached=arrayMap.get(array);if(cached)return cached;
    const result={file:await save(file+'.bin',array.buffer.slice(array.byteOffset,array.byteOffset+array.byteLength)),type:array.constructor.name,length:array.length};arrayMap.set(array,result);return result;
  };
  const progress = async text => { status.textContent=text; await nextFrame(); };
  const workScene = new T.Scene(), camera = new T.OrthographicCamera(-1,1,1,-1,0,1);
  const quadMat = new T.ShaderMaterial({ uniforms:{map:{value:null},encode:{value:0}}, vertexShader:'varying vec2 vUv; void main(){vUv=uv;gl_Position=vec4(position.xy,0.,1.);}', fragmentShader:'uniform sampler2D map;uniform float encode;varying vec2 vUv;void main(){vec4 c=texture2D(map,vUv);if(encode>.5)c.rgb=mix(c.rgb*12.92,1.055*pow(max(c.rgb,vec3(0.)),vec3(1./2.4))-.055,step(vec3(.0031308),c.rgb));gl_FragColor=c;}',depthTest:false,depthWrite:false,toneMapped:false });
  const quad = new T.Mesh(new T.PlaneGeometry(2,2),quadMat);workScene.add(quad);
  const previousTarget=renderer.getRenderTarget();
  const previousTone=renderer.toneMapping;renderer.toneMapping=T.NoToneMapping;

  async function texture(tex) {
    if (!tex?.isTexture || tex.isCubeTexture || tex.isData3DTexture || tex.isDataArrayTexture) return null;
    if (textureMap.has(tex)) return textureMap.get(tex);
    const id=manifest.textures.length; textureMap.set(tex,id);manifest.textures.push(null);
    const key=tex.source?.uuid || tex.uuid;
    let image=imageMap.get(key);
    if (image === undefined) {
      image=manifest.images.length; imageMap.set(key,image);
      const data=tex.image;
      const w=Math.min(2048,data?.width || data?.videoWidth || 1),h=Math.min(2048,data?.height || data?.videoHeight || 1);
      const rt=new T.WebGLRenderTarget(w,h,{depthBuffer:false,type:T.UnsignedByteType,format:T.RGBAFormat});
      quadMat.uniforms.map.value=tex;quadMat.uniforms.encode.value=tex.colorSpace===T.SRGBColorSpace?1:0;
      renderer.setRenderTarget(rt);renderer.clear();renderer.render(workScene,camera);
      const pixels=new Uint8Array(w*h*4);renderer.readRenderTargetPixels(rt,0,0,w,h,pixels);
      const canvas=document.createElement('canvas');canvas.width=w;canvas.height=h;
      canvas.getContext('2d').putImageData(new ImageData(new Uint8ClampedArray(pixels),w,h),0,0);
      const blob=await new Promise(resolve=>canvas.toBlob(resolve,'image/webp',0.96));
      const file=await save('texture-'+image+'.webp',blob);
      manifest.images.push({file,width:w,height:h});
      renderer.setRenderTarget(previousTarget);rt.dispose();
    }
    manifest.textures[id]={image,repeat:tex.repeat.toArray(),offset:tex.offset.toArray(),center:tex.center.toArray(),rotation:tex.rotation,wrapS:tex.wrapS,wrapT:tex.wrapT,colorSpace:tex.colorSpace,channel:tex.channel||0,flipY:false};
    return id;
  }

  async function material(m,mesh) {
    if (materialMap.has(m)) return materialMap.get(m);
    const id=manifest.materials.length;materialMap.set(m,id);manifest.materials.push(null);
    const item={name:m.name,type:m.type,mesh:mesh.name,color:m.color?.toArray(),emissive:m.emissive?.toArray(),emissiveIntensity:m.emissiveIntensity,roughness:m.roughness,metalness:m.metalness,opacity:m.opacity,transparent:m.transparent,alphaTest:m.alphaTest,side:m.side,depthWrite:m.depthWrite,vertexColors:m.vertexColors,normalScale:m.normalScale?.toArray(),maps:{},uniforms:{},defines:m.defines||{}};
    for (const key of ['map','normalMap','roughnessMap','metalnessMap','aoMap','emissiveMap','alphaMap','bumpMap']) if (m[key]) item.maps[key]=await texture(m[key]);
    if (m.uniforms) for (const [key,{value}] of Object.entries(m.uniforms)) {
      if (value?.isTexture) { const t=await texture(value); if(t!==null)item.uniforms[key]={texture:t}; }
      else if(typeof value==='number') item.uniforms[key]=value;
      else if(value?.toArray) item.uniforms[key]=value.toArray();
    }
    if (m.isShaderMaterial) { item.vertexShader=m.vertexShader;item.fragmentShader=m.fragmentShader; }
    else if(Object.hasOwn(m,'onBeforeCompile')) {
      const template=T.ShaderLib[m.isMeshBasicMaterial?'basic':'standard'];
      const shader={uniforms:T.UniformsUtils.clone(template.uniforms),vertexShader:template.vertexShader,fragmentShader:template.fragmentShader};
      try {m.onBeforeCompile(shader,renderer);item.vertexShader=shader.vertexShader;item.fragmentShader=shader.fragmentShader;}catch(error){item.captureHookError=String(error);}
    }
    manifest.materials[id]=item;return id;
  }

  async function geometry(g, label) {
    if (geometryMap.has(g)) return geometryMap.get(g);
    const id=manifest.geometries.length;geometryMap.set(g,id);manifest.geometries.push(null);
    const item={name:label,attributes:{},groups:g.groups,instanced:!!g.isInstancedBufferGeometry,instanceCount:Number.isFinite(g.instanceCount)?g.instanceCount:null,drawRange:{start:g.drawRange.start,count:Number.isFinite(g.drawRange.count)?g.drawRange.count:null}};
    for (const [key,a] of Object.entries(g.attributes)) {
      let array;
      if(a.isInterleavedBufferAttribute) {
        array=new a.data.array.constructor(a.count*a.itemSize);
        for(let i=0;i<a.count;i++)for(let j=0;j<a.itemSize;j++)array[i*a.itemSize+j]=a.data.array[i*a.data.stride+a.offset+j];
      } else array=a.array;
      item.attributes[key]={...await saveArray('g'+id+'-'+key,array),itemSize:a.itemSize,normalized:a.normalized,float16:!!a.isFloat16BufferAttribute,instanced:!!(a.isInstancedBufferAttribute||a.data?.isInstancedInterleavedBuffer),meshPerAttribute:a.meshPerAttribute||a.data?.meshPerAttribute||1};
    }
    if(g.index)item.index={...await saveArray('g'+id+'-index',g.index.array),itemSize:1};
    g.computeBoundingBox();item.bounds=[...g.boundingBox.min.toArray(),...g.boundingBox.max.toArray()];
    manifest.geometries[id]=item;return id;
  }

  const excluded = name==='lagoon' ? /^(sky|lagoon-surface|waterfx|waterfall-mist|terrain|ambient|.*impostor|.*-bark-far|.*shadow-proxy|.*collid)/i : /^(sky|water|terrain|rain|splashes|bolt|birds|.*-lo)$/i;
  const atlasOnly=new URLSearchParams(location.search).has("atlas");
  const candidates=[];
  scene.traverse(o=>{
    if(!o.isMesh || o===collider || excluded.test(o.name))return;
    let parent=o;let allowed=true;
    while(parent&&parent!==scene){if((!parent.visible&&!parent.name.endsWith('-bark-near')) || /^(mountains|particles|wisps)$/.test(parent.name))allowed=false;parent=parent.parent;}
    if(!allowed || [].concat(o.material).every(m=>m.colorWrite===false))return;
    candidates.push(o);
  });
  for(let i=0;!atlasOnly && i<candidates.length;i++) {
    const mesh=candidates[i];await progress(`Capturing ${name}: ${i+1}/${candidates.length} · ${mesh.name || mesh.parent?.name}`);
    const box=new T.Box3().setFromObject(mesh),center=box.getCenter(new T.Vector3());
    if(box.max.x<bounds[0]||box.min.x>bounds[2]||box.max.z<bounds[1]||box.min.z>bounds[3])continue;
    let g=mesh.geometry;
    // Capture the posed characters as static geometry. Their source rigs stay in the source package.
    if(mesh.isSkinnedMesh) {
      g=g.clone();const p=g.attributes.position;const v=new T.Vector3();
      for(let j=0;j<p.count;j++){v.fromBufferAttribute(p,j);mesh.applyBoneTransform(j,v);p.setXYZ(j,v.x,v.y,v.z);}g.computeVertexNormals();
      g.deleteAttribute('skinIndex');g.deleteAttribute('skinWeight');
    }
    const mats=[];for(const m of [].concat(mesh.material))mats.push(await material(m,mesh));
    const entry={name:mesh.name,parent:mesh.parent?.name,matrix:mesh.matrixWorld.toArray(),geometry:await geometry(g,mesh.name),materials:mats,castShadow:mesh.castShadow,receiveShadow:mesh.receiveShadow,center:center.toArray()};
    if(mesh.isInstancedMesh) {
      const keep=[];const matrix=new T.Matrix4();const position=new T.Vector3();
      for(let j=0;j<mesh.count;j++){
        mesh.getMatrixAt(j,matrix);position.setFromMatrixPosition(matrix).applyMatrix4(mesh.matrixWorld);
        if(position.x>=bounds[0]-10&&position.x<=bounds[2]+10&&position.z>=bounds[1]-10&&position.z<=bounds[3]+10)keep.push(j);
      }
      if(!keep.length)continue;
      const matrices=new Float32Array(keep.length*16);
      keep.forEach((j,k)=>matrices.set(mesh.instanceMatrix.array.subarray(j*16,j*16+16),k*16));
      entry.instances={count:keep.length,matrix:await saveArray('m'+i+'-instances',matrices)};
      if(mesh.instanceColor){const colors=new Float32Array(keep.length*3);keep.forEach((j,k)=>colors.set(mesh.instanceColor.array.subarray(j*3,j*3+3),k*3));entry.instances.color=await saveArray('m'+i+'-colors',colors);}
    }
    manifest.meshes.push(entry);
  }
  await progress('Capturing original ground heights…');
  const step=1,nx=Math.round((bounds[2]-bounds[0])/step)+1,nz=Math.round((bounds[3]-bounds[1])/step)+1;
  const heights=new Float32Array(nx*nz);
  for(let z=0;z<nz;z++)for(let x=0;x<nx;x++)heights[z*nx+x]=heightAt(bounds[0]+x*step,bounds[1]+z*step);
  manifest.heightfield={...await saveArray('heights',heights),nx,nz,step,bounds};
  await progress('Baking the original terrain surface colors…');
  const bakeScene = new T.Scene();bakeScene.fog=scene.fog;
  scene.traverse(o=>{if(o.isLight)bakeScene.add(o.clone());});
  const terrainMaterials=[];
  scene.traverse(o=>{
    if(!o.isMesh||!(o.name.startsWith('terrain')||o.parent?.name==='terrain')||/mirror|proxy/.test(o.name))return;
    const clone=o.clone(false);clone.matrixAutoUpdate=false;clone.matrix.copy(o.matrixWorld);clone.layers.mask=1;clone.visible=true;
    clone.material=[].concat(o.material).map(original=>{
      const m=original.clone();m.defines={...original.defines};m.side=T.DoubleSide;m.colorWrite=true;m.depthTest=false;m.depthWrite=false;if(name==='lagoon')m.defines.TERR_Q=2;m.onBeforeCompile=(shader,r)=>{
        original.onBeforeCompile.call(original,shader,r);
        const mode=document.querySelector('#capture-mode').value;const code='vec3 bakeC='+ (mode==='solid'?'vec3(1.,0.,0.)':mode==='splat'?'vSplat.xyz':'diffuseColor.rgb')+';gl_FragColor=vec4(mix(bakeC*12.92,1.055*pow(max(bakeC,vec3(0.)),vec3(1./2.4))-.055,step(vec3(.0031308),bakeC)),1.0);return;';
        if(!shader.fragmentShader.includes('#include <opaque_fragment>'))throw new Error('Terrain albedo capture needs an opaque fragment output');
        shader.fragmentShader=shader.fragmentShader.replace('#include <opaque_fragment>',code);if(name==='sakura'){shader.fragmentShader=shader.fragmentShader.replace('#include <color_fragment>',code);}
      };m.customProgramCacheKey=()=>original.uuid+'-capture-albedo-'+document.querySelector('#capture-mode').value;m.needsUpdate=true;terrainMaterials.push(m);return m;
    });if(clone.material.length===1)clone.material=clone.material[0];
    if(name==='sakura') {
      const original=[].concat(o.material)[0], template=T.ShaderLib.standard;
      const shader={uniforms:T.UniformsUtils.clone(template.uniforms),vertexShader:template.vertexShader,fragmentShader:template.fragmentShader};original.onBeforeCompile(shader,renderer);
      const prelude=shader.fragmentShader.split('#include <common>')[1].split('#include <dithering_pars_fragment>')[0];
      const surface=shader.fragmentShader.split('#include <logdepthbuf_fragment>')[1].split('#include <color_fragment>')[0];
      const mode=document.querySelector('#capture-mode').value;
      const output=mode==='splat'?'vSplat.rgb':mode==='solid'?'vec3(1.,0.,0.)':'diffuseColor.rgb';
      clone.material=new T.ShaderMaterial({uniforms:shader.uniforms,side:T.DoubleSide,depthTest:false,depthWrite:false,toneMapped:false,
        vertexShader:'attribute vec4 aSplat;attribute vec2 aAux;varying vec4 vSplat;varying vec2 vAux;varying vec3 vTW;varying vec3 vTN;void main(){vSplat=aSplat;vAux=aAux;vTW=(modelMatrix*vec4(position,1.)).xyz;vTN=normal;gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.);}',
        fragmentShader:'#include <common>\n'+prelude+'\nvoid main(){vec4 diffuseColor=vec4(1.);'+surface+'vec3 c='+output+';gl_FragColor=vec4(mix(c*12.92,1.055*pow(max(c,vec3(0.)),vec3(1./2.4))-.055,step(vec3(.0031308),c)),1.);}'});
    }
    bakeScene.add(clone);
  });
  const width=4096,height=Math.round(4096*(bounds[3]-bounds[1])/(bounds[2]-bounds[0]));
  const terrainRT=new T.WebGLRenderTarget(width,height,{type:T.UnsignedByteType,depthBuffer:true});
  const terrainCamera=new T.OrthographicCamera(-(bounds[2]-bounds[0])/2,(bounds[2]-bounds[0])/2,(bounds[3]-bounds[1])/2,-(bounds[3]-bounds[1])/2,.1,2000);
  terrainCamera.position.set((bounds[0]+bounds[2])/2,1000,(bounds[1]+bounds[3])/2);terrainCamera.up.set(0,0,-1);terrainCamera.lookAt(terrainCamera.position.x,0,terrainCamera.position.z);terrainCamera.layers.enableAll();
  if(document.querySelector('#capture-mode').value==='solid')bakeScene.overrideMaterial=new T.MeshBasicMaterial({color:0xff0000,side:T.DoubleSide,depthTest:false});bakeScene.updateMatrixWorld(true);terrainCamera.updateMatrixWorld(true);renderer.setRenderTarget(terrainRT);renderer.setViewport(0,0,width,height);renderer.setScissorTest(false);renderer.autoClear=true;renderer.clear();renderer.render(bakeScene,terrainCamera);
  const terrainPixels=new Uint8Array(width*height*4);renderer.readRenderTargetPixels(terrainRT,0,0,width,height,terrainPixels);
  const terrainCanvas=document.createElement('canvas');terrainCanvas.width=width;terrainCanvas.height=height;terrainCanvas.getContext('2d').putImageData(new ImageData(new Uint8ClampedArray(terrainPixels),width,height),0,0);
  const terrainBlob=await new Promise(resolve=>terrainCanvas.toBlob(resolve,'image/webp',.95));
  manifest.terrainAtlas={file:await save('terrain-albedo.webp',terrainBlob),bounds,width,height,flipY:false,flipZ:true};
  renderer.setRenderTarget(previousTarget);terrainRT.dispose();terrainMaterials.forEach(m=>m.dispose());
  if(atlasOnly){renderer.toneMapping=previousTone;status.textContent='Terrain atlas complete';button.disabled=false;report.textContent=JSON.stringify({...manifest.terrainAtlas,children:bakeScene.children.map(o=>({name:o.name,verts:o.geometry?.attributes.position.count,drawRange:o.geometry?.drawRange,defines:o.material?.defines,visible:o.visible,bounds:o.geometry?.boundingBox,matrix:o.matrix.toArray()})),render:renderer.info.render,clipping:renderer.clippingPlanes,reverse:renderer.capabilities.reverseDepthBuffer});return;}
  if(collider?.geometry) {await progress('Capturing original collision geometry…');manifest.collision=await geometry(collider.geometry,'original-collision');}
  manifest.counts={meshes:manifest.meshes.length,materials:manifest.materials.length,geometries:manifest.geometries.length,images:manifest.images.length,instances:manifest.meshes.reduce((n,m)=>n+(m.instances?.count||1),0)};
  await save('scene.json',JSON.stringify(manifest));
  renderer.setRenderTarget(previousTarget);renderer.toneMapping=previousTone;
  quad.geometry.dispose();quadMat.dispose();
  status.textContent='Capture complete';report.textContent=JSON.stringify({ready:true,project:name,...manifest.counts},null,2);
}
