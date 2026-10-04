import './video-recorder.css';
import {resampleVideoPath,videoDimensions,VIDEO_FPS,VIDEO_MAX_SECONDS,VIDEO_SIZES,VIDEO_SMOOTHING,type VideoPose,type VideoSample,type VideoSize,type VideoSmoothing} from './video-path';
import {createVideoUIRecording,type VideoUIRecording,type VideoUIProjection} from './video-ui';

const PREFS_KEY='threetopia.map.video.v1';
const videoIcon='<svg viewBox="0 0 24 24" aria-hidden="true"><rect x="3" y="6" width="12" height="12" rx="3"/><path d="m15 10 5-3v10l-5-3"/></svg>';
const closeIcon='<svg viewBox="0 0 24 24" aria-hidden="true"><path d="m6 6 12 12M6 18 18 6"/></svg>';
type Playback={render:(pose:VideoPose)=>void;projectUI:(width:number,height:number)=>VideoUIProjection;restore:()=>void};
type Options={root:HTMLElement;canvas:HTMLCanvasElement;canRecord:()=>boolean;pose:()=>VideoPose;
  beginPlayback:(size:{width:number;height:number})=>Playback;requestFrame:()=>void;open:()=>void;beforeExport:()=>void};
export type MapVideoRecorder=ReturnType<typeof createMapVideoRecorder>;

/** Meadow's camera-path workflow, with HTML composited into the offline MP4. */
export function createMapVideoRecorder(options:Options){
  const {root,canvas}=options,abort=new AbortController(),on={signal:abort.signal};
  const supported=typeof VideoEncoder!=='undefined';
  let includeUI=true,size:VideoSize='window',smoothing:VideoSmoothing='light';
  try{
    const saved=JSON.parse(localStorage.getItem(PREFS_KEY)??'null');
    if(typeof saved?.includeUI==='boolean')includeUI=saved.includeUI;
    if(VIDEO_SIZES.includes(saved?.size))size=saved.size;
    if(Object.hasOwn(VIDEO_SMOOTHING,saved?.smoothing??''))smoothing=saved.smoothing;
  }catch{/* Storage can be unavailable; recording still works. */}
  const trigger=document.createElement('button');trigger.type='button';trigger.className='map-video-trigger';trigger.disabled=true;
  trigger.setAttribute('aria-label','Record video');trigger.title='Record video (R)';trigger.setAttribute('aria-expanded','false');trigger.setAttribute('aria-controls','map-video');trigger.innerHTML=videoIcon;
  const panel=document.createElement('aside');panel.id='map-video';panel.className='map-video-panel';panel.hidden=true;panel.setAttribute('role','dialog');panel.setAttribute('aria-modal','false');panel.setAttribute('aria-labelledby','video-title');
  panel.innerHTML=`<header><div>${videoIcon}<h2 id="video-title">Record the map</h2></div><button type="button" class="video-close" aria-label="Close video recorder">${closeIcon}</button></header>
    <p class="video-intro">Record your journey around the map.</p>
    <label class="video-field"><span>Video size</span><select data-video-size aria-label="Video size"><option value="window">Same as window</option><option value="1080p">1080p · 1920 × 1080</option><option value="1440p">1440p · 2560 × 1440</option><option value="2160p">4K · 3840 × 2160</option></select></label>
    <label class="video-field"><span>Camera smoothing</span><select data-video-smoothing aria-label="Camera smoothing"><option value="off">Off</option><option value="light">Light</option><option value="cinematic">Cinematic</option></select></label>
    <label class="video-interface"><input type="checkbox" data-video-ui>Include interface</label>
    <div class="video-format"><span>MP4</span><span>60 fps</span><span>Up to 2 minutes</span></div>
    <p class="video-note">Move around and open world cards during your take. Stop to render your video with smooth animation.</p>
    <button type="button" class="video-start"><span class="video-dot" aria-hidden="true"></span>Start recording<kbd>R</kbd></button>
    <p class="video-message" role="status" hidden></p><a class="video-download" hidden>Download MP4</a>`;
  const take=document.createElement('div');take.className='video-take';take.hidden=true;
  take.innerHTML='<span class="video-dot" aria-hidden="true"></span><span>REC</span><span class="video-timer" aria-label="Recording duration">0:00</span><button type="button" aria-label="Stop recording"><span aria-hidden="true">■</span> Stop <kbd>R</kbd></button>';
  const dialog=document.createElement('dialog');dialog.className='video-render';dialog.setAttribute('aria-labelledby','video-render-title');
  dialog.innerHTML='<span class="video-render-icon" aria-hidden="true">'+videoIcon+'</span><h2 id="video-render-title">Rendering your video</h2><p data-video-detail role="status">Preparing the first frame…</p><progress aria-label="Video rendering progress"></progress><p class="video-note">Keep this tab visible while your video renders.</p><button type="button" class="video-cancel">Cancel export</button>';
  root.append(trigger,panel,take,dialog);
  const uiToggle=panel.querySelector<HTMLInputElement>('[data-video-ui]')!,sizeSelect=panel.querySelector<HTMLSelectElement>('[data-video-size]')!,smoothSelect=panel.querySelector<HTMLSelectElement>('[data-video-smoothing]')!;
  const startButton=panel.querySelector<HTMLButtonElement>('.video-start')!,message=panel.querySelector<HTMLElement>('.video-message')!,download=panel.querySelector<HTMLAnchorElement>('.video-download')!;
  const detail=dialog.querySelector<HTMLElement>('[data-video-detail]')!,progress=dialog.querySelector<HTMLProgressElement>('progress')!;
  uiToggle.checked=includeUI;sizeSelect.value=size;smoothSelect.value=smoothing;
  let phase:'idle'|'recording'|'rendering'|'disposed'='idle',samples:VideoSample[]=[],cancel:AbortController|undefined,ui:VideoUIRecording|undefined;
  let available=false,shownSecond=-1,limited=false,downloadURL='',frameCount=0,encodedFrames=0;
  let locked:Array<{element:HTMLElement;inert:boolean}>=[];
  const persist=()=>{try{localStorage.setItem(PREFS_KEY,JSON.stringify({includeUI,size,smoothing}));}catch{/* Optional preference. */}};
  uiToggle.addEventListener('change',()=>{includeUI=uiToggle.checked;persist();},on);
  sizeSelect.addEventListener('change',()=>{size=sizeSelect.value as VideoSize;persist();},on);
  smoothSelect.addEventListener('change',()=>{smoothing=smoothSelect.value as VideoSmoothing;persist();},on);
  const showMessage=(text:string)=>{message.textContent=text;message.hidden=false;};
  function setOpen(open:boolean,focus=true){
    panel.hidden=!open;trigger.setAttribute('aria-expanded',String(open));
    if(open){options.open();if(focus)sizeSelect.focus({preventScroll:true});}
    else if(focus)trigger.focus({preventScroll:true});
  }
  function setBusy(busy:boolean){
    root.classList.toggle('video-busy',busy);
    if(busy){
      // World cards stay interactive during a take. The export's modal dialog
      // locks the map only once we start rendering the captured camera path.
      locked=Array.from(root.querySelectorAll<HTMLElement>('.map-settings,.map-settings-trigger,.map-brand')).map(element=>({element,inert:element.inert}));
      locked.forEach(({element})=>{element.inert=true;});
    }else{locked.forEach(({element,inert})=>{element.inert=inert;});locked=[];}
  }
  function update(){
    take.hidden=phase!=='recording';trigger.disabled=!available||phase==='rendering';
    root.classList.toggle('video-recording',phase==='recording');
    trigger.classList.toggle('is-recording',phase==='recording');trigger.setAttribute('aria-label',phase==='recording'?'Stop recording':'Record video');
    trigger.title=phase==='recording'?'Stop recording (R)':'Record video (R)';
    startButton.disabled=!available||!supported||phase!=='idle';
    uiToggle.disabled=sizeSelect.disabled=smoothSelect.disabled=phase!=='idle';
    if(!supported)showMessage('Video export needs a browser with WebCodecs, such as Chrome or Edge.');
  }
  function timer(seconds:number){
    if(Math.floor(seconds)!==shownSecond){shownSecond=Math.floor(seconds);take.querySelector('.video-timer')!.textContent=`${Math.floor(seconds/60)}:${String(Math.floor(seconds%60)).padStart(2,'0')}`;}
  }
  function sample(now:number){
    if(phase!=='recording'||limited)return;
    const first=samples[0],time=first?Math.min(now,first.time+VIDEO_MAX_SECONDS*1000):now;
    if(samples.length&&time<=samples.at(-1)!.time)return;
    samples.push({...options.pose(),time,ui:ui?.capture()});
    const seconds=(time-samples[0].time)/1000;
    timer(seconds);
    if(seconds>=VIDEO_MAX_SECONDS){limited=true;queueMicrotask(()=>stop(false));}
  }
  function start(){
    if(phase!=='idle'||!available||!options.canRecord())return;
    if(!supported){setOpen(true);return;}
    phase='recording';samples=[];shownSecond=-1;limited=false;frameCount=encodedFrames=0;message.hidden=true;download.hidden=true;
    ui=includeUI?createVideoUIRecording(root):undefined;
    options.open();setOpen(false,false);setBusy(true);update();sample(performance.now());
    canvas.parentElement?.focus({preventScroll:true});options.requestFrame();
  }
  function stop(includeLast=true){
    if(phase!=='recording')return;
    if(includeLast)sample(performance.now());
    const recorded=samples,interfaceTake=ui;samples=[];ui=undefined;
    if(recorded.length<2||recorded.at(-1)!.time-recorded[0].time<100){
      interfaceTake?.dispose();phase='idle';setBusy(false);update();showMessage('That take was too short. Record for a moment before stopping.');setOpen(true);return;
    }
    phase='rendering';options.beforeExport();update();void render(recorded,interfaceTake);
  }
  async function render(recorded:VideoSample[],interfaceTake?:VideoUIRecording){
    const controller=cancel=new AbortController();
    let playback:Playback|undefined,overlay:Awaited<ReturnType<VideoUIRecording['prepare']>>|undefined;
    dialog.querySelector('h2')!.textContent='Rendering your video';progress.removeAttribute('value');detail.textContent='Preparing the first frame…';dialog.showModal();
    try{
      const poses=resampleVideoPath(recorded,VIDEO_FPS,VIDEO_SMOOTHING[smoothing]);frameCount=poses.length;progress.max=frameCount;
      const dimensions=videoDimensions(size,canvas.width,canvas.height);
      const {encodeMapVideo}=await import('./video-encoder');controller.signal.throwIfAborted();
      if(interfaceTake){
        detail.textContent='Preparing cards and interface…';
        overlay=await interfaceTake.prepare(dimensions,recorded.flatMap(p=>p.ui?[p.ui]:[]),controller.signal);
      }
      controller.signal.throwIfAborted();
      const {blob}=await encodeMapVideo({canvas:overlay?.canvas??canvas,...dimensions,frames:frameCount,signal:controller.signal,
        prepare:()=>{playback=options.beginPlayback(dimensions);},renderFrame:i=>{
          const pose=poses[i];playback!.render(pose);
          if(overlay&&pose.ui)overlay.draw(canvas,pose.ui,pose.azimuth,playback!.projectUI);
        },
        progress:n=>{encodedFrames=n;progress.value=n;if(n%15===0||n===frameCount)detail.textContent=`${Math.round(n/frameCount*100)}% · ${n.toLocaleString('en-US')} / ${frameCount.toLocaleString('en-US')} frames`;}});
      controller.signal.throwIfAborted();
      saveVideo(blob,`${(frameCount/VIDEO_FPS).toFixed(1)} s · ${dimensions.width} × ${dimensions.height} · 60 fps`);
    }catch(error){
      if(phase!=='disposed')showMessage(controller.signal.aborted?'Export cancelled. Your map is ready.':`Could not export: ${error instanceof Error?error.message:String(error)}`);
    }finally{
      overlay?.dispose();interfaceTake?.dispose();
      cancel=undefined;
      if(phase!=='disposed'){
        phase='idle';playback?.restore();setBusy(false);update();dialog.close();setOpen(true,false);trigger.focus({preventScroll:true});options.requestFrame();
      }
    }
  }
  function saveVideo(blob:Blob,description:string){
    if(downloadURL)URL.revokeObjectURL(downloadURL);downloadURL=URL.createObjectURL(blob);
    const stamp=new Date().toISOString().replace(/[:.]/g,'-');download.href=downloadURL;download.download=`threetopia-map-${stamp}.mp4`;download.hidden=false;
    showMessage(`Video ready · ${description} · ${(blob.size/1048576).toFixed(1)} MB${limited?' · 2-minute limit reached.':''}`);download.click();
  }
  trigger.addEventListener('click',()=>{if(phase==='recording')stop();else setOpen(panel.hidden);},on);
  panel.querySelector('.video-close')!.addEventListener('click',()=>setOpen(false),on);
  startButton.addEventListener('click',start,on);take.querySelector('button')!.addEventListener('click',()=>stop(),on);
  dialog.querySelector('button')!.addEventListener('click',()=>cancel?.abort(),on);
  dialog.addEventListener('cancel',e=>{e.preventDefault();cancel?.abort();},on);
  document.addEventListener('keydown',e=>{
    if(e.defaultPrevented||e.repeat||e.ctrlKey||e.metaKey||e.altKey||phase==='disposed')return;
    if(e.target instanceof Element&&e.target.closest('input,select,textarea,[contenteditable="true"]'))return;
    const modalOpen=!!document.querySelector('dialog[open]');
    if(e.key.toLowerCase()==='r'&&(phase==='recording'||!modalOpen)){
      e.preventDefault();if(phase==='idle')start();else if(phase==='recording')stop();
    }else if(e.key==='Escape'&&phase==='recording'&&!modalOpen){e.preventDefault();stop();}
    else if(e.key==='Escape'&&!panel.hidden){e.preventDefault();setOpen(false);}
  },on);
  document.addEventListener('visibilitychange',()=>{if(document.hidden&&phase==='recording')stop(false);},on);
  update();
  return {
    get recording(){return phase==='recording';},get rendering(){return phase==='rendering';},sample,
    close(){setOpen(false,false);},
    enable(){available=true;update();},
    inspect:()=>({phase,includeUI,size,smoothing,samples:samples.length,duration:samples.length?(samples.at(-1)!.time-samples[0].time)/1000:0,frames:frameCount,encodedFrames,ui:ui?.inspect()??null,supported}),
    dispose(){phase='disposed';abort.abort();cancel?.abort();ui?.dispose();ui=undefined;samples=[];setBusy(false);if(downloadURL)URL.revokeObjectURL(downloadURL);dialog.close();[trigger,panel,take,dialog].forEach(el=>el.remove());root.classList.remove('video-recording');},
  };
}
