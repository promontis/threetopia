import {ImageAtlasRenderer} from '@threetopia/world-map/image-renderer';
import {availableSlots,hexCenter,SIDE_NAMES,type AtlasRegistry,type AtlasTile,type Slot} from '@threetopia/world-map';
import '@threetopia/world-map/image-renderer.css';
import './atlas.css';
export interface AtlasControls {view:ImageAtlasRenderer;setPlayer(x:number,z:number,yaw:number,height?:number):void;dispose():void}
const escape=(s:string)=>s.replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]!));
export async function mountAtlas(root:HTMLElement,{miniHost,walkTo,onError}:{miniHost?:HTMLElement;walkTo?:(id:string)=>void;onError?:(error:unknown)=>void}={}):Promise<AtlasControls>{
  const response=await fetch('/atlas/registry.json');if(!response.ok)throw new Error('The map could not load. Reload to try again.');
  const registry:AtlasRegistry=await response.json();
  const $=<T extends HTMLElement=HTMLElement>(s:string)=>root.querySelector<T>(s)!;
  const details=$('[data-atlas-details]'),status=$('[data-atlas-status]'),events=new AbortController(),signal=events.signal;
  let player:{x:number;z:number}|null=null,creator=false,loading=true;
  const view=new ImageAtlasRenderer(miniHost??$('[data-atlas-stage]'),registry,{
    onSelect:showDetails,
    onError:(error:Error)=>{loading=false;status.textContent=error.message;onError?.(error);},
    onStats:(s:any)=>{$('[data-atlas-scale]').textContent=`${s.zoom}% · ${s.lod==='detail'?'Detail':'Overview'}`;root.dataset.atlasLod=s.lod;$<HTMLButtonElement>('[data-atlas-plus]').disabled=s.atMin;$<HTMLButtonElement>('[data-atlas-minus]').disabled=s.atMax;root.dataset.atlasStats=JSON.stringify(s);if(loading&&s.loadedTiles===registry.tiles.length){status.textContent='';loading=false;}},
    onLayers:addLayers,
  });
  if(miniHost)view.setMode('mini');
  $('[data-atlas-motion]').setAttribute('aria-pressed',String(view.motion));$('[data-atlas-motion]').setAttribute('aria-label',view.motion?'Pause map animations':'Play map animations');$('[data-motion-label]').textContent=view.motion?'Motion on':'Motion paused';
  const dock=$('[data-atlas-worlds]');
  const sub:{[id:string]:string}={lagoon:'Tree village',sakura:'River valley',tidewater:'Fishing village',punk:'Neon city'};
  for(const tile of registry.tiles){
    const button=document.createElement('button');button.className='atlas-world-card';button.setAttribute('aria-label',`Explore ${tile.short}`);button.setAttribute('aria-pressed','false');button.dataset.worldCard=tile.id;
    button.innerHTML=`<img src="/map/renders/${escape(tile.id)}-all.webp" alt=""><span><strong>${escape(tile.short)}</strong><small>${escape(sub[tile.id]??'World')}</small></span>`;
    button.addEventListener('click',()=>{view.select({kind:'world',tile});const c=hexCenter(tile.q,tile.r);view.focus(c.x,c.z,1500);},{signal});dock.append(button);
  }
  const slots=availableSlots(registry.tiles);
  for(const slot of slots){const button=document.createElement('button');button.className='atlas-slot-card';button.setAttribute('aria-label',`Plan a world at tile ${slot.q},${slot.r}`);button.innerHTML=`<span>＋ Tile ${slot.q}, ${slot.r}</span><small>Ring ${slot.ring}</small>`;button.addEventListener('click',()=>view.select({kind:'slot',slot}),{signal});$('[data-atlas-slots]').append(button);}
  function setCreator(enabled:boolean){creator=enabled;view.setOptions({creators:enabled,boundaries:enabled});$('[data-atlas-build]').setAttribute('aria-pressed',String(enabled));$('[data-atlas-build-panel]').hidden=!enabled;$<HTMLInputElement>('[data-atlas-boundaries]').checked=enabled;if(enabled)toggleLayers(false);view.fit();}
  function toggleLayers(enabled:boolean){$('[data-atlas-layers-panel]').hidden=!enabled;$('[data-atlas-layers-toggle]').setAttribute('aria-expanded',String(enabled));if(enabled)$('[data-atlas-build-panel]').hidden=true;}
  function addLayers(tile:AtlasTile,map:any){
    const list=$('[data-atlas-layer-list]');if(list.querySelector(`[data-layer-tile="${tile.id}"]`))return;
    const section=document.createElement('details');section.className='atlas-layer-world';section.dataset.layerTile=tile.id;section.open=true;
    section.innerHTML=`<summary>${escape(tile.short)}<small>${map.components.length+1} layers</small></summary>`;
    const rows=[{id:'tile',label:'Whole tile',note:'group'},{id:'terrain',label:'Landscape',note:'world render'},...map.components.map((c:any)=>({id:c.id,label:c.label,note:c.effect?'effect':c.animation?'animated':'image'}))];
    for(const row of rows){const label=document.createElement('label');label.className='atlas-layer-row';const input=document.createElement('input');input.type='checkbox';input.checked=true;input.setAttribute('aria-label',`${row.label} · ${tile.short}`);input.dataset.layerToggle=`${tile.id}:${row.id}`;input.addEventListener('change',()=>view.setLayerVisible(tile.id,row.id,input.checked),{signal});label.append(input,document.createTextNode(row.label));const small=document.createElement('small');small.textContent=row.note;label.append(small);section.append(label);}
    section.style.order=String(registry.tiles.findIndex(t=>t.id===tile.id));list.append(section);
  }
  function showDetails(item:any){
    root.querySelectorAll('[data-world-card]').forEach(b=>b.setAttribute('aria-pressed',String((b as HTMLElement).dataset.worldCard===item.tile?.id)));
    const close='<button data-detail-close aria-label="Close place details">×</button>';
    if(item.kind==='slot'){
      const slot:Slot=item.slot,neighbour=slot.neighbours.find(n=>n.tile==='lagoon')??slot.neighbours[0],connect=neighbour?` --connect ${SIDE_NAMES[neighbour.side]}`:'';
      const cmd=`pnpm threetopia create my-world --tile ${slot.q},${slot.r} --registry public/atlas/registry.json${connect}`;
      details.innerHTML=`<div class="atlas-panel-header"><p>AVAILABLE OCEAN TILE</p>${close}</div><h3>Tile ${slot.q}, ${slot.r}</h3><p>Expansion ring ${slot.ring} · 693 × 800 metres</p><div class="atlas-neighbours">${slot.neighbours.map(n=>`<span><b>${SIDE_NAMES[n.side]}</b>${escape(registry.tiles.find(t=>t.id===n.tile)!.short)}<small>${n.signature==='shore-path'?'shared path':'coast'}</small></span>`).join('')}</div><p class="atlas-detail-note">A walking connection needs matching edges on both tiles. Selecting this space creates a proposal, not a reservation.</p><button class="atlas-primary" data-copy-plan>Copy starter command <span>↗</span></button><button class="atlas-text-button" data-download-plan>Download placement proposal ↓</button><br><a href="/docs/#image-layers">Map layers & shared edges ↗</a>`;
      details.querySelector('[data-copy-plan]')!.addEventListener('click',async()=>{try{await navigator.clipboard.writeText(cmd);status.textContent='Starter command copied.';}catch{status.textContent=cmd;}});
      details.querySelector('[data-download-plan]')!.addEventListener('click',()=>{
        const proposal={version:1,status:'proposal',tile:{q:slot.q,r:slot.r},edges:slot.edges,mapRequired:true,mapFormat:'scene-tile',neighbours:slot.neighbours,proposedConnection:neighbour?{side:SIDE_NAMES[neighbour.side],neighbour:neighbour.tile,signature:'shore-path',requiresNeighbourUpdate:neighbour.signature!=='shore-path'}:null};
        const url=URL.createObjectURL(new Blob([JSON.stringify(proposal,null,2)],{type:'application/json'}));const a=document.createElement('a');a.href=url;a.download=`threetopia-tile-${slot.q}-${slot.r}.json`;a.click();setTimeout(()=>URL.revokeObjectURL(url),1000);
      });
      if(!miniHost)history.replaceState(null,'',`?tile=${slot.q},${slot.r}`);
    }else{
      const tile:AtlasTile=item.tile,landmark=item.landmark;
      details.innerHTML=`<div class="atlas-panel-header"><p>${landmark?'LANDMARK':'WORLD'}</p>${close}</div><h3>${escape(landmark?.label??tile.title)}</h3><p>${escape(tile.description)}</p><p class="atlas-detail-note">By ${escape(tile.creator)}<br>Tile ${tile.q}, ${tile.r}</p><button class="atlas-primary" data-walk-world>Walk to ${escape(tile.short)} <span>↗</span></button><button class="atlas-text-button" data-focus-world>Look closer ＋</button>`;
      details.querySelector('[data-walk-world]')!.addEventListener('click',()=>{if(walkTo)walkTo(tile.id);else location.href=`${import.meta.env.DEV?'/world/':'https://world.threetopia.com/'}?destination=${tile.id}`;});
      details.querySelector('[data-focus-world]')!.addEventListener('click',()=>{const c=hexCenter(tile.q,tile.r);view.focus(c.x,c.z,1050);});
      if(!miniHost)history.replaceState(null,'',`?world=${tile.id}`);
    }
    details.querySelector('[data-detail-close]')!.addEventListener('click',()=>{details.hidden=true;});details.hidden=false;
  }
  $('[data-atlas-build]').addEventListener('click',()=>setCreator(!creator),{signal});$('[data-atlas-explore]').addEventListener('click',()=>setCreator(false),{signal});
  $('[data-atlas-layers-toggle]').addEventListener('click',()=>toggleLayers($('[data-atlas-layers-panel]').hidden),{signal});$('[data-atlas-layers-close]').addEventListener('click',()=>toggleLayers(false),{signal});
  $('[data-atlas-plus]').addEventListener('click',()=>view.zoom(.72),{signal});$('[data-atlas-minus]').addEventListener('click',()=>view.zoom(1.45),{signal});$('[data-atlas-fit]').addEventListener('click',()=>view.fit(),{signal});
  $('[data-atlas-location]').addEventListener('click',()=>{if(player)view.focus(player.x,player.z,1250);else view.focus(0,0,1500);},{signal});
  $('[data-atlas-motion]').addEventListener('click',()=>{view.setOptions({motion:!view.motion});$('[data-atlas-motion]').setAttribute('aria-pressed',String(view.motion));$('[data-atlas-motion]').setAttribute('aria-label',view.motion?'Pause map animations':'Play map animations');$('[data-motion-label]').textContent=view.motion?'Motion on':'Motion paused';$('[data-motion-icon]').textContent=view.motion?'Ⅱ':'▷';},{signal});
  $('[data-atlas-boundaries]').addEventListener('change',e=>view.setOptions({boundaries:(e.target as HTMLInputElement).checked}),{signal});
  root.addEventListener('keydown',e=>{if(e.key!=='Escape')return;if(!details.hidden){details.hidden=true;e.preventDefault();e.stopPropagation();}else if(!$('[data-atlas-layers-panel]').hidden){toggleLayers(false);e.preventDefault();e.stopPropagation();}},{signal});
  const params=new URLSearchParams(location.search),tileParam=params.get('tile'),worldParam=params.get('world');
  if(tileParam){const slot=slots.find(s=>`${s.q},${s.r}`===tileParam);if(slot){setCreator(true);view.select({kind:'slot',slot});}}
  if(worldParam){const tile=registry.tiles.find(t=>t.id===worldParam);if(tile){view.select({kind:'world',tile});const c=hexCenter(tile.q,tile.r);view.focus(c.x,c.z,1500);}}
  return{view,setPlayer(x,z,yaw,height){player={x,z};view.updatePlayer(x,z,yaw,height);},dispose(){events.abort();view.dispose();}};
}
