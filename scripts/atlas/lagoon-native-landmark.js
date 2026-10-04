// Build-time extraction of the four native treehouses and their connecting bridges.
// Runs inside Lagoon's preserved original runtime; never loaded by the map.
export async function extractVillageSource(){
  const q=window.__lagoon,e=q.engine,T=(await import('/assets/three.module-CA589J5f.js')).i;
  e.stop();e.scene.updateMatrixWorld(true);
  const layout=(await import('/assets/layout-DXlv_L6y.js')).u;
  const trees=layout.HERO_TREES.map(def=>q.registry.get('trees').trees.find(t=>t.id===def.id));
  if(trees.some(t=>!t))throw Error('Native village trees are missing.');
  const defs=layout.HERO_TREES;
  const origin=new T.Vector3((Math.min(...defs.map(t=>t.x-t.crown))+Math.max(...defs.map(t=>t.x+t.crown)))/2,layout.WATER_Y,(Math.min(...defs.map(t=>t.z-t.crown))+Math.max(...defs.map(t=>t.z+t.crown)))/2);
  const renderer=e.renderer,previous=renderer.getRenderTarget(),tone=renderer.toneMapping;
  const scene=new T.Scene(),camera=new T.OrthographicCamera(-1,1,1,-1,0,1),textures=new Map();
  const material=new T.ShaderMaterial({uniforms:{map:{value:null},encode:{value:0}},vertexShader:'varying vec2 vUv;void main(){vUv=uv;gl_Position=vec4(position.xy,0.,1.);}',fragmentShader:'uniform sampler2D map;uniform float encode;varying vec2 vUv;void main(){vec4 c=texture2D(map,vUv);if(encode>.5)c.rgb=mix(c.rgb*12.92,1.055*pow(max(c.rgb,vec3(0.)),vec3(1./2.4))-.055,step(vec3(.0031308),c.rgb));gl_FragColor=c;}',depthTest:false,depthWrite:false,toneMapped:false,blending:T.NoBlending});
  const quad=new T.Mesh(new T.PlaneGeometry(2,2),material);scene.add(quad);renderer.toneMapping=T.NoToneMapping;
  const encode=a=>{const b=new Uint8Array(a.buffer,a.byteOffset,a.byteLength);let s='';for(let i=0;i<b.length;i+=32768)s+=String.fromCharCode(...b.subarray(i,i+32768));return btoa(s);};
  function pixels(texture,size=512,srgb=false){
    const target=new T.WebGLRenderTarget(size,size,{depthBuffer:false});
    material.uniforms.map.value=texture;material.uniforms.encode.value=Number(srgb);
    renderer.setRenderTarget(target);renderer.clear();renderer.render(scene,camera);
    const bytes=new Uint8Array(size*size*4);renderer.readRenderTargetPixels(target,0,0,size,size,bytes);
    renderer.setRenderTarget(previous);target.dispose();return bytes;
  }
  function sampler(texture){
    if(textures.has(texture))return textures.get(texture);
    const size=512,bytes=pixels(texture,size);texture.updateMatrix();const uv=new T.Vector2();
    const sample=(u,v)=>{
      uv.set(u,v).applyMatrix3(texture.matrix);
      const wrap=(n,mode)=>mode===T.RepeatWrapping?n-Math.floor(n):Math.min(1,Math.max(0,n));
      const x=wrap(uv.x,texture.wrapS)*(size-1),y=wrap(uv.y,texture.wrapT)*(size-1),ix=Math.floor(x),iy=Math.floor(y),fx=x-ix,fy=y-iy;
      const result=[];for(let c=0;c<3;c++){const at=(a,b)=>bytes[(b*size+a)*4+c]/255;result.push((at(ix,iy)*(1-fx)+at(Math.min(ix+1,size-1),iy)*fx)*(1-fy)+(at(ix,Math.min(iy+1,size-1))*(1-fx)+at(Math.min(ix+1,size-1),Math.min(iy+1,size-1))*fx)*fy);}return result;
    };textures.set(texture,sample);return sample;
  }
  const records=[],v=new T.Vector3(),normal=new T.Vector3();
  function mesh(object){
    const g=object.geometry,m=object.material,p=g.attributes.position,n=g.attributes.normal,c=g.attributes.color,uv=g.attributes.uv;
    const positions=new Float32Array(p.count*3),normals=new Float32Array(p.count*3),colors=new Float32Array(p.count*3),normalMatrix=new T.Matrix3().getNormalMatrix(object.matrixWorld),sample=m.map?sampler(m.map):null;
    for(let i=0;i<p.count;i++){
      v.fromBufferAttribute(p,i).applyMatrix4(object.matrixWorld).sub(origin).toArray(positions,i*3);
      normal.fromBufferAttribute(n,i).applyNormalMatrix(normalMatrix).toArray(normals,i*3);
      const albedo=sample&&uv?sample(uv.getX(i),uv.getY(i)):[1,1,1];
      for(let k=0;k<3;k++)colors[i*3+k]=albedo[k]*(m.color?.getComponent?.(k)??[m.color?.r??1,m.color?.g??1,m.color?.b??1][k])*(m.vertexColors&&c?c.array[i*3+k]:1);
    }
    const indices=g.index?Uint32Array.from(g.index.array):Uint32Array.from({length:p.count},(_,i)=>i);
    records.push({name:object.name,material:m.name,triangles:indices.length/3,positions:encode(positions),normals:encode(normals),colors:encode(colors),indices:encode(indices),alphaTest:m.alphaTest??0});
  }
  try{
    const png=(texture,size,srgb=false)=>{const canvas=document.createElement('canvas');canvas.width=canvas.height=size;canvas.getContext('2d').putImageData(new ImageData(new Uint8ClampedArray(pixels(texture,size,srgb)),size,size),0,0);return canvas.toDataURL('image/png').split(',')[1];};
    const leaves=[];
    for(const tree of trees){
      mesh(tree.meshes.bark.children[0]);
      const house=e.scene.getObjectByName(`arch:${tree.id}`);if(!house)throw Error(`Native ${tree.id} architecture is missing.`);
      house.traverse(object=>{if(object.isMesh&&object.material.colorWrite!==false&&!/proxy|collid/i.test(object.name))mesh(object);});
      const leaf=tree.meshes.leaves,g=leaf.geometry,count=leaf.userData.total;
      leaves.push({id:tree.id,name:leaf.name,count,worldMatrix:leaf.matrixWorld.toArray(),positions:encode(Float32Array.from(g.attributes.position.array)),normals:encode(Float32Array.from(g.attributes.normal.array)),uv:encode(Float32Array.from(g.attributes.uv.array)),indices:encode(Uint32Array.from(g.index.array)),matrices:encode(leaf.instanceMatrix.array.subarray(0,count*16)),clumps:encode(g.attributes.aClump.array.subarray(0,count*4)),info:encode(g.attributes.aInfo.array.subarray(0,count*4))});
    }
    const connections=e.scene.getObjectByName('arch:connections.west');if(!connections)throw Error('Native connecting bridges are missing.');
    connections.traverse(object=>{if(object.isMesh&&object.material.colorWrite!==false&&!/proxy|collid/i.test(object.name))mesh(object);});
    // This source group also contains Origin's approach boardwalk. Keep that
    // native geometry, and all three bridges, at their original coordinates.
    const terrain=q.registry.get('terrain'),water=q.registry.get('water'),size=101,step=2.4,extent=(size-1)*step/2,heights=[];
    for(let z=0;z<size;z++)for(let x=0;x<size;x++)heights.push(Math.round(terrain.groundHeight(origin.x-extent+x*step,origin.z-extent+z*step)*1000)/1000);
    const ground={size,step,x0:-extent,z0:-extent,heights,waterLevel:0,waveA:png(water.textures.waveA,128),waveB:png(water.textures.waveB,128)};
    const atlas=trees[0].meshes.leaves.material.map;
    if(trees.some(t=>t.meshes.leaves.material.map!==atlas))throw Error('Village leaf atlases differ; they must be packed before merging.');
    return {version:3,source:'Lagoon / Tree Village',revision:'index-BjH0GYGf',root:origin.toArray(),sourceObjects:records.map(r=>r.name).concat(leaves.map(l=>l.name)),meshes:records,
      trees:defs,bridges:layout.BRIDGES,ground,leaves,atlas512:png(atlas,512,true),atlas256:png(atlas,256,true),
      counts:{structure:records.reduce((n,r)=>n+r.triangles,0),leaves:leaves.reduce((n,l)=>n+l.count*8,0)},errors:q.errors};
  }finally{renderer.setRenderTarget(previous);renderer.toneMapping=tone;quad.geometry.dispose();material.dispose();}
}
