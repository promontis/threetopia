import {Box3,Vector3} from 'three/webgpu';
import {G} from '@dgreenheck/tidewater-core/core/Globals.js';

export const PREVIEW_TARGETS=['core','lighting','sky','terrain','village','vegetation','ocean','reef','wildlife','whale','debris','boat','player','postprocessing','audio','ui'];
export function previewControls(role, app) {
  const range=(label,object,key,min,max,step,onChange)=>({type:'slider',label,object,key,min,max,step,...(onChange?{onChange}:{})});
  const toggle=(label,object,key)=>({type:'toggle',label,object,key});
  const fov=()=>range('Field of view',app.camera,'fov',35,100,1,()=>app.camera.updateProjectionMatrix());
  const time=()=>range('Time of day',app.settings,'timeOfDay',0,24,.1);
  const visible=(label,object)=>object?[toggle(label,object,'visible')]:[];
  switch(role) {
    case 'core': return [fov(),toggle('Dynamic resolution',app.settings,'dynamicResolution')];
    case 'lighting': return [time(),range('Exposure',app.settings,'exposure',.05,2,.05,v=>{app.renderer.toneMappingExposure=v;}),toggle('Sun shadows',app.sun,'castShadow')];
    case 'sky': return [time(),range('Cloud coverage',app.clouds.coverage,'value',0,1,.01),range('Cirrus',app.clouds.cirrus,'value',0,1,.01)];
    case 'terrain': return [...visible('Terrain visible',app.terrain.mesh),...visible('Rocks visible',app.rocks.group)];
    case 'village': return [...visible('Village visible',app.village.group),time()];
    case 'vegetation': return visible('Vegetation visible',app.vegetation.group);
    case 'ocean': return [range('Wind speed',app.fft.local,'windSpeed',.5,30,.1,v=>{app.fft.updateSpectrumUniforms();G.windSpeed.value=v;}),range('Choppiness',app.fft.choppiness,'value',0,1.6,.01),range('Surf amplitude',app.shore.amplitude,'value',0,1.4,.01)];
    case 'reef': return visible('Reef visible',app.reef.group);
    case 'wildlife': return [...visible('Birds visible',app.wildlife.birdBatch?.mesh),...visible('Beach wildlife visible',app.wildlife.critterBatch?.mesh)];
    case 'whale': return visible('Whale visible',app.whale.group);
    case 'debris': return visible('Debris visible',app.debris.group);
    case 'boat': return visible('Boat visible',app.boat.group);
    case 'player': return [fov(),range('Free camera speed',app.fly,'speed',1,40,1)];
    case 'postprocessing': return [range('Bloom',app.post.params.bloom,'value',0,2,.01),range('Saturation',app.post.params.saturation,'value',0,2,.01),range('Film grain',app.post.params.grain,'value',0,1,.01)];
    case 'audio': {const state={volume:app.audio.volume,muted:app.audio.muted};return [range('Master volume',state,'volume',0,1,.01,v=>app.audio.setMasterVolume(v)),{type:'toggle',label:'Mute',object:state,key:'muted',onChange:v=>app.audio.setMuted(v)}];}
    case 'ui': return [fov(),time()];
    default: throw Error(`Unknown component preview: ${role}`);
  }
}

export function mountComponentPreview(role,app,ui) {
  if(!PREVIEW_TARGETS.includes(role))throw Error('Unknown Tidewater component preview.');
  const tab=ui.addTab('component',`Tidewater ${role}`,'settings');
  const folder=tab.addFolder('Component settings');
  for(const {type,...control} of previewControls(role,app))folder[type==='slider'?'addSlider':'addToggle'](control);
  folder.addButton({label:'Enable audio',onClick:()=>void app.audio.resume()});
  folder.addButton({label:'Free camera',onClick:()=>app.setFreeCam(!app.freeCam)});
  const groups={village:app.village.group,boat:app.boat.group,whale:app.whale.group,debris:app.debris.group};
  const subject=groups[role];
  if(subject) {
    const bounds=new Box3().setFromObject(subject,true),center=bounds.getCenter(new Vector3()),distance=Math.min(100,Math.max(10,bounds.getSize(new Vector3()).length()*.8));
    app.setFreeCam(true);app.fly.setPose(center.clone().add(new Vector3(0,distance*.4,distance)),0,-Math.atan(.4));
  }
  if(role==='sky'){app.setFreeCam(true);app.fly.setPose(new Vector3(20,12,-20),Math.PI*.9,.2);}
  ui.selectTab('component');ui.togglePanel(true);
  document.body.dataset.previewFocus=role;
}
