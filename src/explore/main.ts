import { mountExplore, type ExploreControls } from './world.ts';

const root=document.getElementById('world-view')!;
let world:ExploreControls|undefined;
const events=new AbortController();
root.querySelector('[data-world-retry]')!.addEventListener('click',()=>location.reload(),{signal:events.signal});
void mountExplore(root).then(controls=>{world=controls;world.setActive(!document.hidden);}).catch(error=>{
  root.dataset.worldState='error';
  root.querySelector('[data-world-status]')!.textContent=error instanceof Error?error.message:'The world could not load.';
  root.querySelector<HTMLElement>('[data-world-retry]')!.hidden=false;
});
window.addEventListener('pagehide',()=>world?.setActive(false),{signal:events.signal});
window.addEventListener('pageshow',()=>world?.setActive(!document.hidden),{signal:events.signal});
import.meta.hot?.dispose(()=>{events.abort();world?.dispose();});
