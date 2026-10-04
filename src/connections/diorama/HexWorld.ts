import {
  ACESFilmicToneMapping, DirectionalLight, HemisphereLight,
  OrthographicCamera, PCFShadowMap, Scene, Vector3, WebGLRenderer,
} from 'three';
import { createHexModel, type Landscape } from './model.ts';

export interface HexWorldControls {
  select(scene: Landscape): void;
  setActive(active: boolean): void;
  dispose(): void;
}

/** A local illustration, independent of the coming-soon world destination. */
export function mountHexWorld(stage: HTMLElement, initial: Landscape): HexWorldControls | undefined {
  const canvas = document.createElement('canvas');
  canvas.className = 'hex-world-canvas';
  canvas.setAttribute('aria-hidden', 'true');
  const context = canvas.getContext('webgl2', { alpha:true, antialias:true, preserveDrawingBuffer:true, powerPreference:'low-power' });
  if (!context) { stage.dataset.worldState = 'fallback'; return; }
  const renderer = new WebGLRenderer({canvas,context,alpha:true,antialias:true,preserveDrawingBuffer:true});
  renderer.setClearColor(0x000000,0);
  renderer.toneMapping = ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.05;
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = PCFShadowMap;
  renderer.shadowMap.autoUpdate = false;
  const scene = new Scene();
  const model = createHexModel();
  model.select(initial);
  scene.add(model.root);
  scene.add(new HemisphereLight(0xedf1f3,0x87948b,1.35));
  const sun = new DirectionalLight(0xfff7ec,2.7);
  sun.position.set(-3.6,7,4);
  sun.castShadow = true;
  sun.shadow.mapSize.set(2048,2048);
  sun.shadow.camera.left=-6; sun.shadow.camera.right=6;
  sun.shadow.camera.top=6; sun.shadow.camera.bottom=-6;
  sun.shadow.camera.near=.1; sun.shadow.camera.far=24;
  sun.shadow.normalBias=.025; sun.shadow.bias=-.00015;
  scene.add(sun);
  const fill = new DirectionalLight(0xcbdde4,.65);
  fill.position.set(4,3,-6); scene.add(fill);
  const camera = new OrthographicCamera(-6,6,4,-4,.1,60);
  camera.position.set(3.3,9.8,12.5);
  camera.lookAt(0,.15,0);
  const label = stage.querySelector<HTMLElement>('.hex-caption')!;
  const motion = matchMedia('(prefers-reduced-motion: reduce)');
  const compact = matchMedia('(max-width: 760px), (pointer: coarse)');
  const events = new AbortController();
  let active=true, pageActive=true, disposed=false, frame=0, time=0, last=0;
  let pointerX=0, pointerY=0;
  let width=0, height=0;
  let needsShadow=true;
  const labelPoint = new Vector3();
  const cameraTarget = new Vector3(0,.15,0);
  stage.append(canvas);

  const draw = () => {
    if(disposed||!active||!pageActive||document.hidden)return;
    // Move the viewpoint slightly, so the shared world and its baked shadow
    // map stay aligned. No orbit controls or wheel handler capture scrolling.
    camera.position.x += (3.3+(motion.matches?0:pointerX*.45)-camera.position.x)*(motion.matches?1:.08);
    camera.position.y += (9.8+(motion.matches?0:pointerY*.2)-camera.position.y)*(motion.matches?1:.08);
    camera.lookAt(cameraTarget);
    model.animate(motion.matches?0:time);
    if(needsShadow) { renderer.shadowMap.needsUpdate=true; needsShadow=false; }
    renderer.render(scene,camera);
    labelPoint.set(0,.06,.6).applyMatrix4(model.root.matrixWorld).project(camera);
    label.style.left=`${(labelPoint.x*.5+.5)*width}px`;
    label.style.top=`${(-labelPoint.y*.5+.5)*height}px`;
  };
  const tick = (now: number) => {
    if(!active||!pageActive||disposed||document.hidden)return;
    if(now-last>=1000/30) {
      time+=Math.min((now-last)/1000,.06); last=now; draw();
    }
    frame=requestAnimationFrame(tick);
  };
  const resume = () => {
    cancelAnimationFrame(frame);
    draw();
    if(active&&pageActive&&!disposed&&!document.hidden&&!motion.matches) {
      last=performance.now(); frame=requestAnimationFrame(tick);
    }
  };
  const resize = () => {
    if(disposed||!active||!pageActive)return;
    width=stage.clientWidth; height=stage.clientHeight;
    if(!width||!height)return;
    renderer.setPixelRatio(Math.min(devicePixelRatio,compact.matches?1.5:1.75));
    renderer.setSize(width,height,false);
    const aspect=width/height;
    camera.updateMatrixWorld();
    const points=model.framingPoints.map(point=>point.clone().applyMatrix4(camera.matrixWorldInverse));
    const minX=Math.min(...points.map(p=>p.x)), maxX=Math.max(...points.map(p=>p.x));
    const minY=Math.min(...points.map(p=>p.y)), maxY=Math.max(...points.map(p=>p.y));
    const middleX=(minX+maxX)/2, middleY=(minY+maxY)/2;
    const halfHeight=Math.max((maxY-minY)/2,(maxX-minX)/2/aspect)*1.12;
    camera.left=middleX-halfHeight*aspect; camera.right=middleX+halfHeight*aspect;
    camera.top=middleY+halfHeight; camera.bottom=middleY-halfHeight;
    camera.updateProjectionMatrix();
    resume();
  };
  const observer = new ResizeObserver(resize); observer.observe(stage);
  const {signal}=events;
  stage.addEventListener('pointermove',event=>{
    if(event.pointerType==='touch'||motion.matches)return;
    const rect=stage.getBoundingClientRect();
    pointerX=(event.clientX-rect.left)/rect.width*2-1;
    pointerY=(event.clientY-rect.top)/rect.height*2-1;
  },{signal});
  stage.addEventListener('pointerleave',()=>{pointerX=pointerY=0;},{signal});
  document.addEventListener('visibilitychange',resume,{signal});
  motion.addEventListener('change',()=>{pointerX=pointerY=0;resume();},{signal});
  window.addEventListener('pagehide',()=>{pageActive=false;cancelAnimationFrame(frame);},{signal});
  window.addEventListener('pageshow',()=>{pageActive=true;resize();},{signal});
  const dispose = () => {
    if(disposed)return;
    disposed=true; cancelAnimationFrame(frame); events.abort(); observer.disconnect();
    model.dispose(); sun.shadow.dispose(); renderer.dispose(); canvas.remove();
    label.style.removeProperty('left'); label.style.removeProperty('top');
    stage.dataset.worldState='fallback';
  };
  canvas.addEventListener('webglcontextlost',event=>{event.preventDefault();dispose();},{signal});
  import.meta.hot?.dispose(dispose);
  resize();
  stage.dataset.worldState='ready';
  stage.dataset.renderedScene=initial;
  return {
    select(landscape) {
      if(disposed)return;
      model.select(landscape); needsShadow=true;
      stage.dataset.renderedScene=landscape;
      draw();
    },
    setActive(value) {
      if(disposed||active===value)return;
      active=value;
      if(value)resize();else cancelAnimationFrame(frame);
    },
    dispose,
  };
}
