import '../../sections/creator-details.css';
import type {MapTileId} from './layout';

/** The original Punk city and car retain Anderson Mancini and Sunag's credit. */
function describePunkDistrict(){
  const card=document.querySelector<HTMLDialogElement>('[data-world-details="punk"]');if(!card)return;
  card.querySelector('.creator-category')!.textContent='Racing world · with Sunag';
  card.querySelector('h2')!.textContent='Punk';
  card.querySelector('.creator-description')!.textContent='Anderson Mancini and Sunag’s Threejs-Punk Drive: a racing city of black towers, glowing signs and wet streets. Its original buildings, neon and Quadra Turbo-R form this compact floating map district.';
  // Keep the shared creator preview from the original Threejs-Punk site.
  // The tile's own preview belongs to its map manifest, not the creator card.
  card.querySelector('.creator-links')!.innerHTML=`
    <a href="https://www.threejspunk.com/" target="_blank" rel="noopener noreferrer">Explore Threejs-Punk <span aria-hidden="true">↗</span></a>
    <a href="https://three-fenestra.codedgar.com/" target="_blank" rel="noopener noreferrer">Map interiors · Edgar Pérez <span aria-hidden="true">↗</span></a>`;
}

/** The map and landing share the dialog shell and native interaction. */
export function createWorldDetails(onOpen:(id:MapTileId)=>void,onClose:()=>void){
  describePunkDistrict();
  const events=new AbortController(),on={signal:events.signal};
  const dialogs=new Map(Array.from(document.querySelectorAll<HTMLDialogElement>('[data-world-details]'),dialog=>[dialog.dataset.worldDetails as MapTileId,dialog]));
  let active:HTMLDialogElement|undefined;
  const expanded=(dialog:HTMLDialogElement,value:boolean)=>document.querySelectorAll(`[aria-controls="${dialog.id}"]`).forEach(el=>el.setAttribute('aria-expanded',String(value)));
  for(const dialog of dialogs.values()){
    dialog.addEventListener('close',()=>{
      // Native close events are queued. A quick reopen must not clear the
      // newly active dialog when the previous close event arrives.
      if(dialog.open)return;
      expanded(dialog,false);
      if(active===dialog){active=undefined;onClose();}
    },on);
    // Support backdrop dismissal where the native closedby attribute is absent.
    dialog.addEventListener('click',event=>{
      if(event.target!==dialog)return;
      const r=dialog.getBoundingClientRect();
      if(event.clientX<r.left||event.clientX>r.right||event.clientY<r.top||event.clientY>r.bottom)dialog.close();
    },on);
  }
  return {
    get open(){return Boolean(active?.open);},
    get selected(){return active?.open?active.dataset.worldDetails:null;},
    close(){active?.close();},
    connect(button:HTMLElement,id:MapTileId){
      button.setAttribute('aria-controls',dialogs.get(id)!.id);button.setAttribute('aria-haspopup','dialog');button.setAttribute('aria-expanded','false');
    },
    createCard(id:MapTileId,title:string){
      const dialog=dialogs.get(id)!,button=document.createElement('button');
      button.type='button';button.className='world-label';button.dataset.mapTile=id;
      button.setAttribute('aria-label',`View details for ${dialog.querySelector('h2')!.textContent}`);
      button.setAttribute('aria-describedby',`map-card-${id}-creator`);
      // A small portrait identifies the maker without repeating the whole
      // scene preview. Full information stays in the creator dialog.
      const avatar=dialog.querySelector<HTMLImageElement>('.creator-profile img')!.cloneNode() as HTMLImageElement;
      avatar.className='world-card-avatar';avatar.alt='';avatar.width=44;avatar.height=44;avatar.decoding='async';avatar.draggable=false;
      const copy=document.createElement('span');copy.className='world-card-copy';
      const name=document.createElement('strong');name.className='world-card-title';name.textContent=title;
      const creator=document.createElement('span');creator.className='world-card-creator';creator.id=`map-card-${id}-creator`;creator.textContent=dialog.querySelector('.creator-profile strong')!.textContent;
      const arrow=document.createElement('span');arrow.className='world-card-arrow';arrow.textContent='›';arrow.setAttribute('aria-hidden','true');
      copy.append(name,creator);button.append(avatar,copy,arrow);
      return button;
    },
    show(id:MapTileId,trigger:HTMLElement){
      const dialog=dialogs.get(id)!;
      if(active===dialog&&dialog.open)return;
      active?.close();active=dialog;
      onOpen(id);trigger.focus({preventScroll:true});dialog.showModal();dialog.scrollTop=0;expanded(dialog,true);
    },
    dispose(){events.abort();active?.close();active=undefined;},
  };
}
