/** Portable image composition and bounded effect descriptions, independent of the playable scene. */
export const IMAGE_MAP_BUDGET = Object.freeze({jsonBytes:65536,components:32,landmarks:32,assetBytes:2097152});
import {projectScene,unprojectScene} from './scene-camera.js';
export const projectMap = (x,z,height=0) => projectScene(x,height,z);
export const unprojectMap = unprojectScene;
const pair = v => Array.isArray(v)&&v.length===2&&v.every(Number.isFinite);
const imagePath = v => typeof v==='string'&&v.length<512&&!/^(?:data:|javascript:|https?:|\/\/)/i.test(v)&&!v.includes('..')&&!v.includes('\\')&&/\.(?:webp|png|avif)$/.test(v);
export function validateImageMap(map) {
  if(!map||typeof map!=='object')return ['An image map is required.'];
  const errors=[],check=(condition,message)=>{if(!condition)errors.push(message);};
  check(map.version===2&&map.kind==='image-tile','Use version 2 and kind "image-tile".');
  check(map.radius===400&&map.origin==='tile-centre','Use radius 400 and origin "tile-centre".');
  check(new TextEncoder().encode(JSON.stringify(map)).length<=IMAGE_MAP_BUDGET.jsonBytes,'Image map JSON exceeds 64 KiB.');
  if(map.capture!==undefined){
    const c=map.capture;
    check(c?.kind==='world-render'&&/^[a-f0-9]{64}$/.test(c?.revision??'')&&c?.source?.kind==='runtime'&&typeof c.source.id==='string'&&c.camera?.yaw===-20&&c.camera?.elevation===45&&c.camera?.projection==='orthographic','World renders need source, revision and the shared orthographic camera.');
  }
  const layer=(p,name,needsImage=true)=>{
    if(needsImage||p?.src!==undefined)check(p&&imagePath(p.src),`${name}: supply a local PNG, WebP or AVIF image.`);
    if(p?.preview)check(imagePath(p.preview),`${name}: invalid preview image.`);
    check(pair(p?.size)&&p.size.every(n=>n>0&&n<=1600),`${name}: size must be two values in (0,1600].`);
    check(pair(p?.position)&&p.position.every(n=>Math.abs(n)<=1200),`${name}: position must stay inside the map envelope.`);
    check(pair(p?.anchor)&&p.anchor.every(n=>n>=0&&n<=1),`${name}: anchor must be two values from 0 to 1.`);
    if(p?.crop!==undefined)check(Array.isArray(p.crop)&&p.crop.length===4&&p.crop.every(Number.isFinite)&&p.crop[0]>=0&&p.crop[1]>=0&&p.crop[2]>0&&p.crop[3]>0&&p.crop[0]+p.crop[2]<=1.000001&&p.crop[1]+p.crop[3]<=1.000001,`${name}: crop must be [x,y,width,height] inside the source image, from 0 to 1.`);
  };
  layer(map.terrain,'terrain');
  check(map.terrain?.crop===undefined,'terrain: crops are only supported on effect components.');
  check(Array.isArray(map.components)&&map.components.length<=32,'At most 32 separate components are allowed.');
  const ids=new Set();
  for(const c of Array.isArray(map.components)?map.components:[]){
    if(!c||typeof c!=='object'){check(false,'Each component must be an object.');continue;}
    check(typeof c.id==='string'&&/^[a-z][a-z0-9-]{0,63}$/.test(c.id)&&!ids.has(c.id),'Components need unique lowercase IDs.');ids.add(c.id);
    check(typeof c.label==='string'&&c.label.length>0&&c.label.length<=80,'Every component needs a label.');
    layer(c,c.id,c.effect?.kind!=='cloud');
    if(c.crop!==undefined)check(!!c.effect&&c.effect.kind!=='cloud',`${c.id}: crops are only supported on image-based effects.`);
    if(c.opacity!==undefined)check(Number.isFinite(c.opacity)&&c.opacity>=0&&c.opacity<=1,`${c.id}: opacity must be from 0 to 1.`);
    if(c.order!==undefined)check(Number.isInteger(c.order)&&c.order>=0&&c.order<=20,`${c.id}: order must be an integer from 0 to 20.`);
    if(c.animation){const a=c.animation;check(!c.effect&&['float','sail','drift','petals','sway'].includes(a.kind)&&Number.isFinite(a.duration)&&a.duration>=4&&a.duration<=180&&pair(a.travel)&&a.travel.every(v=>Math.abs(v)<=300)&&Number.isFinite(a.rotate??0)&&Math.abs(a.rotate??0)<=45&&Number.isFinite(a.delay??0),`${c.id}: invalid animation. Use a bounded built-in animation.`);}
    if(c.effect){const e=c.effect;check(['cloud','waterfall','ripple','light','foliage'].includes(e.kind)&&Number.isFinite(e.speed??1)&&(e.speed??1)>=.1&&(e.speed??1)<=3&&Number.isFinite(e.seed??1)&&(e.seed??1)>=0&&(e.seed??1)<=10000&&(e.color===undefined||/^#[0-9a-f]{6}$/i.test(e.color))&&(e.travel===undefined||pair(e.travel)&&e.travel.every(v=>Math.abs(v)<=300))&&(e.grounded===undefined||typeof e.grounded==='boolean')&&(e.isolated===undefined||typeof e.isolated==='boolean'),`${c.id}: invalid effect. Use a bounded cloud, waterfall, ripple, light or foliage.`);if(e.kind==='cloud')check(c.src===undefined,`${c.id}: clouds are procedural Three.js layers; omit src.`);}
  }
  check(Array.isArray(map.landmarks)&&map.landmarks.length<=32,'At most 32 landmarks are allowed.');
  const landmarks=new Set();
  for(const p of Array.isArray(map.landmarks)?map.landmarks:[]){check(typeof p.id==='string'&&!landmarks.has(p.id)&&typeof p.label==='string'&&p.label.length>0&&p.label.length<=80&&pair(p.position)&&p.position.every(v=>Math.abs(v)<=1000),'Invalid or duplicate image landmark.');landmarks.add(p.id);}
  return errors;
}
export function defineImageMap(map){const errors=validateImageMap(map);if(errors.length)throw new Error(errors.join('\n'));return map;}
export function starterImageMap(src='assets/landscape.webp'){
  return {version:2,kind:'image-tile',origin:'tile-centre',radius:400,terrain:{src,position:[0,-30],size:[1040,840],anchor:[.5,.58]},components:[],landmarks:[{id:'arrival',label:'Arrival',position:[0,0]}]};
}
