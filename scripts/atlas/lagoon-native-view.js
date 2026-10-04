// Review render using the pinned Lagoon renderer, shaders and complete geometry.
// The upstream files stay byte-identical. Only the perimeter becomes coastline.
export async function prepareLagoonReview({ island = true } = {}) {
  if (window.lagoonNativeReview) return window.lagoonNativeReview.report;
  const q = window.__lagoon;
  if (!q?.ready) throw new Error('Wait for the original Lagoon scene to finish loading.');
  const THREE = (await import('/assets/three.module-CA589J5f.js')).i;
  const globals = (await import('/assets/index-BjH0GYGf.js')).d;
  const e = q.engine;
  e.stop();
  for (const element of document.body.children) {
    if (element.id !== 'app' && !element.hasAttribute('data-lagoon-review-ui')) element.style.display = 'none';
  }
  const smooth = (a, b, x) => { const t = Math.max(0, Math.min(1, (x-a)/(b-a))); return t*t*(3-2*t); };
  const coast = (x, z) => {
    const dx = x + 12, dz = z - 4, angle = Math.atan2(dz, dx);
    const radius = 1 / Math.hypot(Math.cos(angle)/102, Math.sin(angle)/73);
    return radius + 2.1*Math.sin(angle*5+.7) + 1.3*Math.sin(angle*9-1.2) - Math.hypot(dx,dz);
  };
  const height = q.registry.get('terrain').groundHeight;
  const coastalHeight = (x,z,y=height(x,z)) => {
    const d = coast(x,z), shore = smooth(-7, 11, d);
    const seabed = -4 - 28*smooth(-8, -100, d);
    return seabed + (y-seabed)*shore;
  };
  const delta = (x,z) => coastalHeight(x,z)-height(x,z);
  const hiddenInstances = [];
  if (island) {
    const visited = new Set();
    // Vertex positions are native world coordinates in these merged batches.
    // Include the separate cliff shadow proxy used by the original renderer.
    for (const mesh of e.scene.getObjectByName('terrain').children) {
      const g = mesh.geometry;
      if (visited.has(g)) continue;
      visited.add(g);
      const p = g.attributes.position;
      for (let i=0;i<p.count;i++) p.setY(i,coastalHeight(p.getX(i),p.getZ(i),p.getY(i)));
      p.needsUpdate = true;
      g.computeVertexNormals(); g.computeBoundingBox(); g.computeBoundingSphere();
    }
    // Native rock batches share a buffer containing both local small-rock
    // shapes and world-space cliff strips (with identity instance matrices).
    // The cliff strips must follow the coast as well as the terrain itself.
    for(const mesh of e.scene.children.filter(m=>m.isBatchedMesh&&m.name.startsWith('rocks-'))) {
      const g=mesh.geometry;
      if(visited.has(g)) continue;
      visited.add(g);
      const p=g.attributes.position;
      for(let i=0;i<p.count;i++) {
        const x=p.getX(i),z=p.getZ(i),d=coast(x,z);
        if(d<11) p.setY(i,d < -6 ? -100 : p.getY(i)+delta(x,z));
      }
      p.needsUpdate=true;
      // BatchedMesh keeps per-shape bounds. Disabling its culling avoids stale
      // original cliff bounds after the review-only perimeter deformation.
      mesh.perObjectFrustumCulled=false;
    }
    // Keep every house, bridge and hero tree untouched. Remove peripheral
    // scatter triangles rather than stretching their cards down into the sea.
    e.scene.traverse(mesh => {
      if (!mesh.geometry || mesh.isBatchedMesh || visited.has(mesh.geometry)) return;
      const g=mesh.geometry;
      const peripheral = /^(rocks-|veg-|waterfall-streams|trails:)/.test(mesh.name);
      if (!peripheral) return;
      visited.add(g);
      const instances=g.attributes.iPos;
      if(instances) {
        for(let i=0;i<instances.count;i++) {
          if(coast(instances.getX(i),instances.getZ(i))<11) instances.setY(i,-100);
        }
        instances.needsUpdate=true;
      }else {
        const p=g.attributes.position,indices=g.index?.array,kept=[];
        const count=indices?.length??p.count;
        for(let i=0;i<count;i+=3) {
          const triangle=[indices?.[i]??i,indices?.[i+1]??i+1,indices?.[i+2]??i+2];
          if(triangle.every(v=>coast(p.getX(v),p.getZ(v))>=11)) kept.push(...triangle);
        }
        g.setIndex(kept);
        g.computeBoundingBox();g.computeBoundingSphere();
      }
    });
    const matrix=new THREE.Matrix4();
    const palms=q.registry.get('palms');
    for(const mesh of e.scene.children.filter(m=>m.isBatchedMesh&&m.name.startsWith('rocks-'))) {
      const ids=[];
      for(let i=0;i<mesh._instanceInfo.length;i++) {
        if(!mesh._instanceInfo[i].active) continue;
        mesh.getMatrixAt(i,matrix);
        const x=matrix.elements[12],z=matrix.elements[14],d=coast(x,z);
        if(d<5) ids.push(i);
        else if(d<11) { matrix.elements[13]+=delta(x,z);mesh.setMatrixAt(i,matrix); }
      }
      hiddenInstances.push({mesh,ids});
    }
    for(const mesh of [palms.meshes.fronds,palms.meshes.trunksDate,palms.meshes.trunksFan]) {
      const ids=[];
      for(let i=0;i<mesh._instanceInfo.length;i++) {
        if(!mesh._instanceInfo[i].active) continue;
        mesh.getMatrixAt(i,matrix);
        if(coast(matrix.elements[12],matrix.elements[14])<12) ids.push(i);
      }
      hiddenInstances.push({mesh,ids});
    }
    palms.meshes.impostors.visible=false;
    const water=q.registry.get('water');
    water.mesh.geometry=new THREE.PlaneGeometry(3000,3000).rotateX(-Math.PI/2);
    water.mesh.frustumCulled=false;
    // Retain the original lagoon mask inside, extend its shore distance/depth
    // channels to the new ocean. Water still uses the original depth, reflection,
    // absorption, scattering, foam and wave shaders.
    const texture=water.mask, {width,height:h,data}=texture.image;
    const bounds=globals.uLagoonMaskBounds.value;
    for(let iy=0;iy<h;iy++) for(let ix=0;ix<width;ix++) {
      const x=bounds.x+(ix+.5)/width*bounds.z, z=bounds.y+(iy+.5)/h*bounds.w;
      const d=coast(x,z),offset=(iy*width+ix)*4;
      if(d>18) continue;
      const y=coastalHeight(x,z);
      data[offset]=Math.max(data[offset],Math.round((1-smooth(-2,6,d))*255));
      data[offset+1]=Math.max(data[offset+1],Math.round(Math.max(0,Math.min(1,.5-(d+1)/32))*255));
      data[offset+2]=Math.max(data[offset+2],Math.round(Math.max(0,Math.min(1,-y/8))*255));
    }
    texture.needsUpdate=true;
    water.reflection.useRect=false;
    // The source's baked desert floor/light textures end at rectangular bounds.
    // Beyond the new coast, transition to its own deep-water scattering model;
    // the inner lagoon keeps the original floor refraction and water shader.
    const coastGLSL=`float reviewCoast(vec2 p) {
      vec2 d=p-vec2(-12.0,4.0); float a=atan(d.y,d.x);
      float r=1.0/length(vec2(cos(a)/102.0,sin(a)/73.0));
      return r+2.1*sin(a*5.0+.7)+1.3*sin(a*9.0-1.2)-length(d);
    }\n`;
    const below='vec3 below = refr * Tf + wInScatter(pathV, colD, sunVis);';
    if(!water.material.fragmentShader.includes(below)) throw new Error('Pinned Lagoon water shader changed.');
    water.material.fragmentShader=water.material.fragmentShader
      .replace('vec3 shadeAbove(',coastGLSL+'vec3 shadeAbove(')
      .replace(below,below+'\n below=mix(below,wInScatter(120.0,40.0,1.0),smoothstep(-2.0,5.0,-reviewCoast(vWorld.xz)));');
    water.material.needsUpdate=true;
  }
  const trees=q.registry.get('trees');
  trees.leafUniforms.uLeafLodD0.value=10000;
  trees.leafUniforms.uLeafLodMin.value=1;
  const details=()=>{
    for(const tree of trees.trees) {
      tree.meshes.leaves.count=tree.meshes.leaves.userData.total;
      tree.meshes.bark.autoUpdate=false;
      tree.meshes.bark.children.forEach((mesh,i)=>mesh.visible=i===0);
    }
    for(const {mesh,ids} of hiddenInstances) for(const id of ids) mesh.setVisibleAt(id,false);
  };
  const camera=e.camera;
  camera.position.set(-30,165,180);
  camera.fov=48;
  camera.lookAt(-12,0,20);
  camera.updateProjectionMatrix(); camera.updateMatrixWorld(true);
  e.update(1/60);details();
  if(island) q.registry.get('lighting').rebakeStatic();
  for(let i=0;i<24;i++) {
    e.update(1/60);details();e.render(1/60);
    await new Promise(requestAnimationFrame);
  }
  await e.gpuIdle();
  const report={
    source:'packages/world-sources/lagoon/original',
    renderer:'Original WebGL, materials, water and post-processing',
    island,
    adaptations:['Compact perimeter and seabed','Peripheral scatter removed','Native water extended with deep-water scattering outside coast','Full tree leaf counts and near palm geometry'],
    leafCards:trees.trees.map(t=>({id:t.id,count:t.meshes.leaves.count})),
    untouchedTreeRoots:trees.trees.map(t=>({id:t.id,heightChange:delta(t.x,t.z)})),
    errors:q.errors,
  };
  window.lagoonNativeReview={report,coast,coastalHeight,details,render:async()=>{e.update(1/60);details();e.render(1/60);await e.gpuIdle();}};
  return report;
}
