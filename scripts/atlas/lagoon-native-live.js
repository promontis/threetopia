import {prepareLagoonReview} from '/__native-view.js';

document.title='Lagoon · Threetopia';
const ui=document.createElement('div');
ui.dataset.lagoonReviewUi='';
ui.innerHTML=`
  <style>
    body > :not(#app):not([data-lagoon-review-ui]) { display:none!important }
    [data-lagoon-review-ui] { font:13px/1.4 system-ui,sans-serif;color:#163c40 }
    .review-loading { position:fixed;inset:0;z-index:30;display:grid;place-content:center;text-align:center;background:#e8efec;gap:12px;padding:28px }
    .review-loading[hidden] { display:none }
    .review-loading strong { font-size:25px;font-weight:550;letter-spacing:-.04em }
    .review-loading p { margin:0;color:#577478 }
    .review-spinner { width:24px;height:24px;border:2px solid #bdd0cb;border-top-color:#236d68;border-radius:50%;margin:0 auto 12px;animation:review-spin 1s linear infinite }
    @keyframes review-spin { to { transform:rotate(360deg) } }
    .review-controls { position:fixed;z-index:20;bottom:max(22px,env(safe-area-inset-bottom));left:50%;transform:translateX(-50%);display:flex;align-items:center;gap:12px;white-space:nowrap;padding:10px 12px 10px 18px;border:1px solid #fff8;border-radius:16px;background:#f6faf0ed;box-shadow:0 6px 28px #124b4f20;backdrop-filter:blur(14px) }
    .review-controls[hidden] { display:none }
    .review-controls button,.review-controls select { font:inherit;color:inherit;border:1px solid #244e4120;background:transparent;border-radius:9px;padding:8px 12px;cursor:pointer }
    .review-controls button:hover { background:#dae9e1 }
    .review-controls button:focus-visible,.review-controls select:focus-visible { outline:2px solid #246d67;outline-offset:3px }
    .review-name { position:fixed;z-index:20;left:24px;top:22px;font-size:16px;font-weight:550;text-shadow:0 1px 10px #ffffff80;pointer-events:none }
    .review-name[hidden] { display:none }
    #app canvas { touch-action:none;cursor:grab }
    #app canvas:active { cursor:grabbing }
    #app canvas:focus-visible { outline:2px solid #ecf6eb;outline-offset:-5px }
    @media(max-width:650px) { .review-controls { bottom:16px;gap:7px;padding:9px;max-width:calc(100vw - 38px);flex-wrap:wrap;justify-content:center } .review-hint { width:100%;font-size:12px;text-align:center } .review-name { left:18px;top:18px } }
    @media(prefers-reduced-motion:reduce) { .review-spinner { animation:none } }
  </style>
  <div class="review-loading" role="status" aria-live="polite"><div class="review-spinner"></div><strong>Lagoon wordt geladen</strong><p>Even geduld, de wereld wordt opgebouwd.</p></div>
  <div class="review-name" hidden>Lagoon Tree Village</div>
  <nav class="review-controls" aria-label="Kaartbediening" hidden>
    <span class="review-hint">Sleep om te draaien · Scroll om te zoomen</span>
    <select data-action="quality" aria-label="Beeldkwaliteit" title="Meer detail vraagt meer rekenkracht"><option value="medium">Detail: basis</option><option value="high">Detail: hoog</option><option value="ultra">Detail: maximaal</option></select>
    <button type="button" data-action="reset" title="Beginstand (R)">Beginstand</button>
    <button type="button" data-action="motion" title="Animatie aan of uit (spatie)" aria-pressed="false">Pauzeren</button>
  </nav>`;
document.body.append(ui);
const quality=ui.querySelector('[data-action="quality"]');
quality.value=new URL(location.href).searchParams.get('q')??'ultra';
quality.addEventListener('change',()=>{
  const url=new URL(location.href);url.searchParams.set('q',quality.value);url.searchParams.set('palmsforce','0');
  location.href=url.href;
});

async function start() {
  const begun=performance.now();
  while(!window.__lagoon?.ready) {
    if(window.__lagoon?.fatal || window.__lagoon?.errors?.length) throw new Error('De wereld kon niet worden geladen.');
    if(performance.now()-begun>240000) throw new Error('Het laden duurt te lang. Probeer de pagina opnieuw te laden.');
    await new Promise(resolve=>setTimeout(resolve,100));
  }
  ui.querySelector('.review-loading p').textContent='De kust en het water worden klaargezet.';
  await prepareLagoonReview();
  const q=window.__lagoon,e=q.engine,review=window.lagoonNativeReview,camera=e.camera,canvas=e.canvas;
  // The still used a fixed native time. Release it and use the original engine
  // animation loop; keep the full foliage and coastal visibility each frame.
  e.params.freeze=null;
  e.addUpdate(review.details,1000);
  const target={x:-12,y:0,z:20};
  let theta=Math.atan2(-18,160),phi=Math.atan2(Math.hypot(18,160),165),zoom=1;
  let playing=!matchMedia('(prefers-reduced-motion: reduce)').matches;
  let pendingFrame=0;
  const baseDistance=Math.hypot(18,165,160);
  const clamp=(v,a,b)=>Math.min(b,Math.max(a,v));
  const renderPaused=()=>{
    if(e.running||pendingFrame||document.hidden)return;
    pendingFrame=requestAnimationFrame(()=>{pendingFrame=0;e.update(0);e.render(0);});
  };
  function positionCamera() {
    // Preserve the whole tile when the viewport becomes narrow.
    const distance=baseDistance*Math.max(1,1.3/camera.aspect)*zoom;
    camera.position.set(target.x+distance*Math.sin(phi)*Math.sin(theta),target.y+distance*Math.cos(phi),target.z+distance*Math.sin(phi)*Math.cos(theta));
    camera.lookAt(target.x,target.y,target.z);
    camera.updateMatrixWorld(true);
    renderPaused();
  }
  function reset() {
    theta=Math.atan2(-18,160);phi=Math.atan2(Math.hypot(18,160),165);zoom=1;
    positionCamera();
  }
  const motionButton=ui.querySelector('[data-action="motion"]');
  function syncPlayback() {
    if(playing&&!document.hidden)e.start();else e.stop();
    motionButton.textContent=playing?'Pauzeren':'Afspelen';
    motionButton.setAttribute('aria-pressed',String(!playing));
    renderPaused();
  }
  function toggleMotion() { playing=!playing;syncPlayback(); }
  function dolly(factor) { zoom=clamp(zoom*factor,.94,1.5);positionCamera(); }
  const pointers=new Map();
  const span=()=>{const [a,b]=[...pointers.values()];return Math.hypot(a.x-b.x,a.y-b.y);};
  let pinch=0;
  canvas.tabIndex=0;
  canvas.setAttribute('aria-label','Lagoon. Sleep of gebruik de pijltjestoetsen om te draaien. Plus en min om te zoomen, R voor beginstand, spatie om te pauzeren.');
  canvas.addEventListener('pointerdown',event=>{
    if(event.button!==0&&event.pointerType==='mouse')return;
    event.preventDefault();canvas.focus({preventScroll:true});canvas.setPointerCapture(event.pointerId);
    pointers.set(event.pointerId,{x:event.clientX,y:event.clientY});
    if(pointers.size===2)pinch=span();
  });
  canvas.addEventListener('pointermove',event=>{
    const previous=pointers.get(event.pointerId);if(!previous)return;
    pointers.set(event.pointerId,{x:event.clientX,y:event.clientY});
    if(pointers.size===2) {const next=span();if(next>0&&pinch>0)dolly(pinch/next);pinch=next;return;}
    theta-=(event.clientX-previous.x)*.005;
    phi=clamp(phi+(event.clientY-previous.y)*.004,.52,1.12);
    positionCamera();
  });
  for(const event of ['pointerup','pointercancel','lostpointercapture'])canvas.addEventListener(event,e=>{pointers.delete(e.pointerId);pinch=0;});
  canvas.addEventListener('wheel',event=>{event.preventDefault();dolly(Math.exp(clamp(event.deltaY,-160,160)*.0015));},{passive:false});
  canvas.addEventListener('keydown',event=>{
    if(event.key==='ArrowLeft')theta+=.09;
    else if(event.key==='ArrowRight')theta-=.09;
    else if(event.key==='ArrowUp')phi=clamp(phi-.06,.52,1.12);
    else if(event.key==='ArrowDown')phi=clamp(phi+.06,.52,1.12);
    else if(event.key==='+'||event.key==='=')dolly(.93);
    else if(event.key==='-')dolly(1.07);
    else if(event.key.toLowerCase()==='r')reset();
    else if(event.key===' ')toggleMotion();
    else return;
    event.preventDefault();positionCamera();
  });
  ui.querySelector('[data-action="reset"]').addEventListener('click',reset);
  motionButton.addEventListener('click',toggleMotion);
  document.addEventListener('visibilitychange',syncPlayback);
  e.onResize(positionCamera);
  window.addEventListener('pagehide',()=>e.stop());
  positionCamera();
  ui.querySelector('.review-loading').hidden=true;
  ui.querySelector('.review-controls').hidden=false;
  ui.querySelector('.review-name').hidden=false;
  review.live={reset,toggleMotion,get playing(){return playing;},get zoom(){return zoom;}};
  syncPlayback();
}
start().catch(error=>{
  console.error(error);
  const loader=ui.querySelector('.review-loading');loader.hidden=false;
  loader.querySelector('.review-spinner').hidden=true;
  loader.querySelector('strong').textContent='Lagoon kon niet worden geopend';
  loader.querySelector('p').textContent=error.message;
});
