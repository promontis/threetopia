import './preview.css';
import {BakedMap} from '../../../packages/world-map/baked-map.js';
import type {BakedTileManifest} from '../../../packages/world-map/baked-map.js';

const root=document.querySelector<HTMLElement>('.tile-canvas')!;
const status=document.querySelector<HTMLElement>('[data-status]')!;
const motionButton=document.querySelector<HTMLButtonElement>('[data-motion]')!;
const zoomIn=document.querySelector<HTMLButtonElement>('[data-in]')!;
const zoomOut=document.querySelector<HTMLButtonElement>('[data-out]')!;
const reduced=matchMedia('(prefers-reduced-motion: reduce)');
const listeners=new AbortController();
let motion=!reduced.matches,disposed=false,raf=0,time=0,last=0,dirty=true,ready=false;
let zoom=.92,center={x:0,y:0},span=200;
let composition:BakedMap,manifest:BakedTileManifest;
const pointers=new Map<number,{x:number;y:number}>();
const intervals:number[]=[];

function schedule(){if(!raf&&!disposed&&!document.hidden)raf=requestAnimationFrame(frame);}
function invalidate(){dirty=true;schedule();}
function updateMotion(){
  motionButton.textContent=motion?'Pause':'Play';
  motionButton.setAttribute('aria-pressed',String(motion));last=0;invalidate();
}
function view(){
  const width=root.clientWidth,height=root.clientHeight;
  const usableWidth=Math.max(150,width-56),usableHeight=Math.max(180,height-170);
  const fit=Math.max(manifest.frame.height*height/usableHeight,manifest.frame.width*height/usableWidth);
  // The COMPLETE tile fits at maximum zoom. A single-tile overview only adds
  // a small amount of surrounding ocean; it never zooms into houses.
  span=fit/zoom;
  const limitX=Math.max(0,(span*width/height-manifest.frame.width)/2-16*span/height);
  const limitY=Math.max(0,(span-manifest.frame.height)/2-70*span/height);
  center.x=Math.max(-limitX,Math.min(limitX,center.x));center.y=Math.max(-limitY,Math.min(limitY,center.y));
  composition.setView({width,height,span,center});
  zoomIn.disabled=zoom>=1;zoomOut.disabled=zoom<=.8;
}
function frame(now:number){
  raf=0;if(disposed||!ready||document.hidden)return;
  const elapsed=last?now-last:16.67;
  if(motion){time+=Math.min(elapsed,100)/1000;if(last&&elapsed<250){intervals.push(elapsed);if(intervals.length>180)intervals.shift();}}
  last=now;
  if(dirty){view();dirty=false;}
  composition.render(time);root.dataset.ready='true';
  if(motion)schedule();
}
function setZoom(value:number){zoom=Math.max(.8,Math.min(1,value));invalidate();}
function reset(){zoom=.92;center={x:0,y:0};invalidate();}

async function init(){
  const url=new URL('/map/lagoon/baked/tile.json',location.href).href;
  const response=await fetch(url,{signal:listeners.signal});if(!response.ok)throw Error('Could not load Lagoon. Reload the page to try again.');
  manifest=await response.json();
  composition=new BakedMap(root,{invalidate,onError:(error:Error)=>{status.textContent=error.message;}});
  await composition.addTile(manifest,url);
  if(disposed)return;
  ready=true;status.textContent='';updateMotion();invalidate();
  const on={signal:listeners.signal};
  motionButton.addEventListener('click',()=>{motion=!motion;updateMotion();},on);
  zoomIn.addEventListener('click',()=>setZoom(zoom+.05),on);
  zoomOut.addEventListener('click',()=>setZoom(zoom-.05),on);
  document.querySelector('[data-reset]')!.addEventListener('click',reset,on);
  root.addEventListener('wheel',e=>{e.preventDefault();setZoom(zoom*Math.exp(-e.deltaY*.001));},{...on,passive:false});
  root.addEventListener('pointerdown',e=>{root.focus({preventScroll:true});root.setPointerCapture(e.pointerId);pointers.set(e.pointerId,{x:e.clientX,y:e.clientY});root.dataset.dragging='true';},on);
  root.addEventListener('pointermove',e=>{
    const previous=pointers.get(e.pointerId);if(!previous)return;
    if(pointers.size===2){
      const other=[...pointers.entries()].find(([id])=>id!==e.pointerId)![1];
      const before=Math.hypot(previous.x-other.x,previous.y-other.y),after=Math.hypot(e.clientX-other.x,e.clientY-other.y);
      if(before>0)setZoom(zoom*after/before);
    }else{
      const scale=span/root.clientHeight;center.x-=(e.clientX-previous.x)*scale;center.y+=(e.clientY-previous.y)*scale;invalidate();
    }
    pointers.set(e.pointerId,{x:e.clientX,y:e.clientY});
  },on);
  const release=(e:PointerEvent)=>{pointers.delete(e.pointerId);root.dataset.dragging=String(pointers.size>0);};
  root.addEventListener('pointerup',release,on);root.addEventListener('pointercancel',release,on);root.addEventListener('lostpointercapture',release,on);
  root.addEventListener('keydown',e=>{
    if(!['+','=','-','0','ArrowUp','ArrowDown','ArrowLeft','ArrowRight',' '].includes(e.key))return;
    e.preventDefault();
    if(e.key==='+'||e.key==='=')setZoom(zoom+.05);
    else if(e.key==='-')setZoom(zoom-.05);
    else if(e.key==='0')reset();
    else if(e.key===' '){motion=!motion;updateMotion();}
    else {const amount=span*.025;center.x+=e.key==='ArrowRight'?amount:e.key==='ArrowLeft'?-amount:0;center.y+=e.key==='ArrowUp'?amount:e.key==='ArrowDown'?-amount:0;invalidate();}
  },on);
  document.addEventListener('visibilitychange',()=>{last=0;if(document.hidden){cancelAnimationFrame(raf);raf=0;}else invalidate();},on);
  reduced.addEventListener('change',()=>{motion=!reduced.matches;updateMotion();},on);
  const resize=new ResizeObserver(invalidate);resize.observe(root);
  (window as any).lagoonTile={inspect:()=>({...composition.inspect(),zoom,center:{...center},span,motion,
    fps:intervals.length?1000/(intervals.reduce((s,v)=>s+v,0)/intervals.length):null}),composition};
  window.addEventListener('pagehide',()=>{disposed=true;listeners.abort();cancelAnimationFrame(raf);resize.disconnect();composition.dispose();},{once:true});
}
void init().catch(error=>{status.textContent=error.message;composition?.dispose();});
