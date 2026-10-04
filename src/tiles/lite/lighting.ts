import * as T from 'three';

/** One outdoor light rig for the host, creator materials and the water. */
export function createMapLighting(renderer:T.WebGLRenderer,scene:T.Scene){
  const direction=new T.Vector3(-.62,.74,.27).normalize();
  const sun=new T.DirectionalLight('#ffe1b2',4.4);
  sun.name='Warm island sun';sun.target.position.set(3,0,-8);
  sun.position.copy(sun.target.position).addScaledVector(direction,65);
  sun.castShadow=true;sun.shadow.mapSize.set(3072,3072);
  Object.assign(sun.shadow.camera,{left:-27,right:27,top:24,bottom:-24,near:15,far:105});
  sun.shadow.normalBias=.012;sun.shadow.bias=-.000045;sun.shadow.radius=5.5;
  const skyFill=new T.HemisphereLight('#d8eaff','#bba786',.5);
  skyFill.name='Cool sky and warm sand bounce';
  scene.add(sun,sun.target,skyFill);

  // A linear HDR outdoor dome, convolved once. No indoor studio reflections,
  // external HDR download or unshadowed second sun in the environment map.
  const sky=new T.Scene(),geometry=new T.SphereGeometry(10,24,12);
  const material=new T.ShaderMaterial({side:T.BackSide,depthWrite:false,
    vertexShader:'varying vec3 vDirection;void main(){vDirection=position;gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.);}',
    fragmentShader:`varying vec3 vDirection;void main(){
      vec3 d=normalize(vDirection);
      vec3 sky=mix(vec3(.93,.97,1.02),vec3(.38,.56,.78),pow(max(d.y,0.),.45));
      vec3 ground=mix(vec3(.40,.32,.23),vec3(.69,.66,.58),pow(1.-max(-d.y,0.),4.));
      gl_FragColor=vec4(mix(ground,sky,smoothstep(-.08,.08,d.y)),1.);
    }`});
  sky.add(new T.Mesh(geometry,material));
  const pmrem=new T.PMREMGenerator(renderer),environment=pmrem.fromScene(sky,.06);
  environment.texture.name='Island sky irradiance';scene.environment=environment.texture;scene.environmentIntensity=.68;
  geometry.dispose();material.dispose();pmrem.dispose();
  return {sun,direction,skyFill,dispose(){scene.remove(sun,sun.target,skyFill);sun.shadow.dispose();environment.dispose();}};
}
