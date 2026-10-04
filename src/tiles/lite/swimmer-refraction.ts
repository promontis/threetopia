import * as T from 'three';

// Keep near-surface animals out of the seabed image. Their optical distance is
// centimetres, not the metres between the surface and the ocean floor.
export function createSwimmerRefraction(mesh:T.Mesh){
  const depth=new T.DepthTexture(256,256,T.UnsignedIntType);
  const target=new T.WebGLRenderTarget(256,256,{type:T.HalfFloatType,depthTexture:depth});
  target.texture.name='Near-surface swimmer colour';depth.name='Near-surface swimmer depth';
  const camera=new T.OrthographicCamera();camera.layers.set(31);
  const bounds=new T.Box3(),viewBounds=new T.Box3(),centre=new T.Vector3(),direction=new T.Vector3(),clear=new T.Color();
  const uniforms={uSwimmer:{value:target.texture},uSwimmerDepth:{value:depth},
    uSwimmerMin:{value:new T.Vector3()},uSwimmerMax:{value:new T.Vector3()},uSwimmerMatrix:{value:new T.Matrix4()}};
  function capture(renderer:T.WebGLRenderer,scene:T.Scene,view:T.Camera){
    bounds.copy(mesh.geometry.boundingBox!).applyMatrix4(mesh.matrixWorld).expandByScalar(.12);
    uniforms.uSwimmerMin.value.copy(bounds.min);uniforms.uSwimmerMax.value.copy(bounds.max);
    // Capture along the mean refracted view, so its depth includes the sides
    // of the body and flippers instead of extruding a top-down silhouette.
    view.getWorldDirection(direction);const eta=1/1.333;
    direction.set(direction.x*eta,-Math.sqrt(1-eta*eta*(1-direction.y*direction.y)),direction.z*eta);
    bounds.getCenter(centre);camera.position.copy(centre).addScaledVector(direction,-8);
    camera.lookAt(centre);camera.updateMatrixWorld();
    viewBounds.copy(bounds).applyMatrix4(camera.matrixWorldInverse);
    camera.left=viewBounds.min.x;camera.right=viewBounds.max.x;camera.bottom=viewBounds.min.y;camera.top=viewBounds.max.y;
    camera.near=-viewBounds.max.z;camera.far=-viewBounds.min.z;camera.updateProjectionMatrix();
    uniforms.uSwimmerMatrix.value.multiplyMatrices(camera.projectionMatrix,camera.matrixWorldInverse);
    const previous={target:renderer.getRenderTarget(),alpha:renderer.getClearAlpha(),background:scene.background,
      planes:renderer.clippingPlanes,shadows:renderer.shadowMap.autoUpdate,shadowDirty:renderer.shadowMap.needsUpdate};
    renderer.getClearColor(clear);
    const layers=new Map<T.Object3D,number>();
    scene.traverse(o=>{if(o===mesh||(o as T.Light).isLight){layers.set(o,o.layers.mask);o.layers.enable(31);}});
    try{
      // The full animal must be captured, including its back above mean sea
      // level: a crest can cover it. The visible wave depth handles that seam.
      renderer.clippingPlanes=[];renderer.shadowMap.autoUpdate=false;renderer.shadowMap.needsUpdate=false;
      scene.background=null;renderer.setClearColor(0,0);renderer.setRenderTarget(target);renderer.render(scene,camera);
    }finally{
      for(const [object,mask] of layers)object.layers.mask=mask;
      renderer.setRenderTarget(previous.target);renderer.setClearColor(clear,previous.alpha);scene.background=previous.background;
      renderer.clippingPlanes=previous.planes;renderer.shadowMap.autoUpdate=previous.shadows;renderer.shadowMap.needsUpdate=previous.shadowDirty;
    }
  }
  return {target,uniforms,capture,dispose(){target.dispose();depth.dispose();}};
}

export const swimmerRefractionShader=`
  uniform sampler2D uSwimmer;uniform sampler2D uSwimmerDepth;
  uniform vec3 uSwimmerMin;uniform vec3 uSwimmerMax;uniform mat4 uSwimmerMatrix;
  vec3 swimmerProjection(vec3 p){vec4 clip=uSwimmerMatrix*vec4(p,1.);return clip.xyz/clip.w*.5+.5;}
  bool swimmerAt(vec3 p){
    vec3 projection=swimmerProjection(p);vec2 uv=projection.xy;
    if(any(lessThan(uv,vec2(0.)))||any(greaterThan(uv,vec2(1.))))return false;
    return texture2D(uSwimmer,uv).a>.5&&projection.z>=texture2D(uSwimmerDepth,uv).r;
  }
  bool refractSwimmer(vec3 origin,vec3 ray,out vec4 colour,out vec3 hit){
    vec3 inverseRay=1./mix(vec3(.00001),ray,step(vec3(.00001),abs(ray)));
    vec3 a=(uSwimmerMin-origin)*inverseRay,b=(uSwimmerMax-origin)*inverseRay;
    vec3 entry=min(a,b),exit=max(a,b);
    float start=max(0.,max(entry.x,max(entry.y,entry.z))),end=min(exit.x,min(exit.y,exit.z));
    if(end<=start)return false;
    // Only pixels whose refracted rays cross this small animal run the march.
    // Refine the first intersection so fins and the surface seam stay smooth.
    float stride=(end-start)/16.;
    for(int i=0;i<=16;i++){
      float t=start+float(i)*stride;
      if(swimmerAt(origin+ray*t)){
        float lo=max(start,t-stride),hi=t;
        for(int j=0;j<4;j++){float mid=(lo+hi)*.5;if(swimmerAt(origin+ray*mid))hi=mid;else lo=mid;}
        hit=origin+ray*hi;colour=texture2D(uSwimmer,swimmerProjection(hit).xy);return true;
      }
    }
    return false;
  }
`;
