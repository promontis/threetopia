type Photo={url:string|null;pending:boolean;status:string};

/** Cards load saved WebP files. A small metadata poll swaps in finished updates;
 * the browser never loads a map iframe or creates a WebGL context for this grid. */
export function mountTileThumbnails(root:HTMLElement,info:any){
  const abort=new AbortController(),photos=new Map<string,Photo>(info.tiles.map((t:any)=>[t.id,t.thumbnail]));
  const cards=new Map<string,HTMLElement>(Array.from(root.querySelectorAll<HTMLElement>('[data-tile-preview]')).map(el=>[el.dataset.tilePreview!,el]));
  const requested=new Map<string,string>();let timer:ReturnType<typeof setTimeout>|undefined,delay=3000,polling=false,expired=false;
  function loaded(el:HTMLElement){el.dataset.previewState='ready';el.setAttribute('aria-busy','false');}
  function unavailable(el:HTMLElement){
    if(el.dataset.previewState==='ready')return;
    el.dataset.previewState='fallback';el.setAttribute('aria-busy','false');el.querySelector('[data-preview-status]')!.textContent='Preview unavailable';
  }
  for(const el of cards.values()){
    const image=el.querySelector<HTMLImageElement>('[data-tile-photo]')!;
    image.addEventListener('load',()=>loaded(el),{signal:abort.signal});
    image.addEventListener('error',()=>unavailable(el),{signal:abort.signal});
    if(image.complete&&image.naturalWidth)loaded(el);
  }
  function show(id:string,photo:Photo){
    const el=cards.get(id);if(!el||!photo)return;
    photos.set(id,photo);const image=el.querySelector<HTMLImageElement>('[data-tile-photo]')!;
    if(!photo.url){
      if(photo.status==='failed')unavailable(el);
      else if(el.dataset.previewState!=='ready')el.querySelector('[data-preview-status]')!.textContent='Preparing preview…';
      return;
    }
    if(requested.get(id)===photo.url)return;requested.set(id,photo.url);
    if(!image.getAttribute('src')){image.src=photo.url;return;}
    if(image.getAttribute('src')===photo.url){if(image.complete&&image.naturalWidth)loaded(el);return;}
    // Keep the previous photograph visible until its replacement has decoded.
    const next=new Image();next.src=photo.url;
    void next.decode().then(()=>{
      if(!abort.signal.aborted&&requested.get(id)===photo.url){image.src=photo.url!;loaded(el);}
    }).catch(()=>{if(!abort.signal.aborted)unavailable(el);});
  }
  function schedule(){
    clearTimeout(timer);
    if(!abort.signal.aborted&&!expired&&!document.hidden&&[...cards.keys()].some(id=>photos.get(id)?.pending))timer=setTimeout(poll,delay);
  }
  async function poll(){
    if(polling||abort.signal.aborted)return;polling=true;
    try{
      const response=await fetch('/api/tiles/thumbnails',{signal:abort.signal});
      if(response.status===401||response.status===403){expired=true;return;}
      if(!response.ok)throw Error('Thumbnail status unavailable.');
      const data=await response.json();for(const photo of data.thumbnails)show(photo.id,photo);
    }catch{/* Existing photographs remain usable during a temporary API failure. */}
    finally{polling=false;delay=Math.min(30000,delay*1.5);schedule();}
  }
  for(const [id,photo] of photos)show(id,photo);
  document.addEventListener('visibilitychange',schedule,{signal:abort.signal});schedule();
  return ()=>{abort.abort();clearTimeout(timer);};
}
