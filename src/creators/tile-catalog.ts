import {LAYOUTS,STYLES,type TileChoice,type TileVariant} from '../../packages/platform/tiles.js';
import {tileThumbnail} from './tile-glyph';

const esc=(value:unknown)=>String(value??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]!));
const categories=['All','Nature','Water','Urban','Sci-fi'] as const;
type Category=typeof categories[number];
type Entry={variant:TileVariant;choices:TileChoice[];style:string;categories:Category[];search:string};
const normalize=(text:string)=>text.toLowerCase().normalize('NFKD').replace(/[\u0300-\u036f]/g,'').replace(/[^a-z0-9]+/g,' ').trim();
const arrow='<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M4 9a8 8 0 1 1 0 6M4 3v6h6"/></svg>';
const check='<svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="m4 8 2.5 2.5L12 5"/></svg>';

/** Only cycle through orientations accepted by the registry for this position. */
export function nextTileRotation(choices:TileChoice[],rotation:number,direction:1|-1){
  return choices.filter(c=>c.rotation!==rotation).sort((a,b)=>
    ((a.rotation-rotation)*direction+6)%6-((b.rotation-rotation)*direction+6)%6
  )[0]?.rotation??rotation;
}

/** Catalog rows are cached host thumbnails. Only the selected tile owns a live 3D preview. */
export function mountTileCatalog(root:HTMLElement,{onSelect,onRotate}:{onSelect:(id:string)=>void;onRotate:(direction:1|-1)=>void}){
  root.innerHTML=`<section class="tile-catalog" aria-label="Choose a tile">
    <div class="tile-catalog-toolbar">
      <div class="tile-catalog-heading"><h2>Tiles</h2><span data-tile-count role="status" aria-live="polite"></span></div>
      <div class="tile-catalog-search"><svg viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="1.6" aria-hidden="true"><circle cx="8.5" cy="8.5" r="5.5"/><path d="m13 13 4 4"/></svg><input type="search" placeholder="Search tiles…" aria-label="Search tiles" autocomplete="off" spellcheck="false" aria-controls="tile-catalog-list"/></div>
      <div class="tile-catalog-filters" role="group" aria-label="Filter tiles">${categories.map(c=>`<button type="button" data-tile-category="${c}" aria-pressed="${c==='All'}" aria-controls="tile-catalog-list">${c}</button>`).join('')}</div>
    </div>
    <div class="tile-catalog-results" tabindex="0" aria-label="Available tiles"><ul id="tile-catalog-list"></ul><div class="tile-catalog-empty" hidden><strong>No matching tiles</strong><p>Try another filter or search.</p><button type="button" class="button secondary" data-clear-tile-filters>Clear filters</button></div></div>
  </section>
  <section class="tile-selected" aria-label="Selected tile">
    <div class="tile-selected-heading"><div><h3 data-selected-title></h3><p data-selected-style></p></div><span class="tile-selected-badge">Selected</span></div>
    <div class="tile-mini-preview" id="tile-preview"></div>
    <div class="tile-rotation"><span>Rotation</span><div role="group" aria-label="Rotate selected tile"><button type="button" data-rotate="-1" aria-label="Rotate counterclockwise">${arrow}</button><output aria-label="Tile rotation" aria-live="polite">0°</output><button type="button" data-rotate="1" aria-label="Rotate clockwise">${arrow}</button></div></div>
    <p class="tile-selected-facts" data-selected-facts></p>
  </section>`;
  const search=root.querySelector<HTMLInputElement>('input')!,list=root.querySelector<HTMLUListElement>('ul')!,results=root.querySelector<HTMLElement>('.tile-catalog-results')!;
  const count=root.querySelector<HTMLElement>('[data-tile-count]')!,empty=root.querySelector<HTMLElement>('.tile-catalog-empty')!;
  const glyphs=new Map<string,string>();
  let entries:Entry[]=[],chosen='',rotation=0,category:Category='All',signature='';
  function glyph(id:string,angle:number){
    const key=`${id}:${angle}`;
    if(!glyphs.has(key)){if(glyphs.size>=600)glyphs.delete(glyphs.keys().next().value!);glyphs.set(key,tileThumbnail(id,angle));}
    return glyphs.get(key)!;
  }
  function renderRows(resetScroll=false){
    const tokens=normalize(search.value).split(' ').filter(Boolean),visible=entries.filter(e=>(category==='All'||e.categories.includes(category))&&tokens.every(t=>e.search.includes(t)));
    const scroll=resetScroll?0:results.scrollTop;
    list.innerHTML=visible.map(e=>{
      const selected=e.variant.id===chosen,angle=selected?rotation:e.choices[0].rotation;
      return `<li><button type="button" class="tile-catalog-item" data-tile-variant="${esc(e.variant.id)}" aria-label="${esc(e.variant.title)}, ${esc(e.style)}" aria-pressed="${selected}"><span class="tile-catalog-thumbnail">${glyph(e.variant.id,angle)}</span><span class="tile-catalog-copy"><strong>${esc(e.variant.title)}</strong><small>${esc(e.style)}</small></span><span class="tile-catalog-check">${check}</span></button></li>`;
    }).join('');
    empty.hidden=visible.length>0;
    count.textContent=visible.length===entries.length?`${entries.length} available`:`${visible.length} of ${entries.length}`;
    results.scrollTop=scroll;
  }
  function selectCategory(next:Category){
    category=next;
    root.querySelectorAll<HTMLButtonElement>('[data-tile-category]').forEach(button=>button.setAttribute('aria-pressed',String(button.dataset.tileCategory===category)));
    renderRows(true);
  }
  search.addEventListener('input',()=>renderRows(true));
  // Escape clears a search first; a second Escape still closes the inspector.
  search.addEventListener('keydown',event=>{if(event.key==='Escape'&&search.value){event.preventDefault();event.stopPropagation();search.value='';renderRows(true);}});
  root.querySelectorAll<HTMLButtonElement>('[data-tile-category]').forEach(button=>button.onclick=()=>selectCategory(button.dataset.tileCategory as Category));
  root.querySelector<HTMLButtonElement>('[data-clear-tile-filters]')!.onclick=()=>{search.value='';selectCategory('All');search.focus({preventScroll:true});};
  list.addEventListener('click',event=>{
    const button=(event.target as Element).closest<HTMLButtonElement>('[data-tile-variant]');
    if(button&&button.dataset.tileVariant!==chosen)onSelect(button.dataset.tileVariant!);
  });
  list.addEventListener('keydown',event=>{
    if(!['ArrowDown','ArrowUp','Home','End'].includes(event.key))return;
    const buttons=[...list.querySelectorAll<HTMLButtonElement>('button')],index=buttons.indexOf(document.activeElement as HTMLButtonElement);
    if(index<0)return;
    event.preventDefault();
    buttons[event.key==='Home'?0:event.key==='End'?buttons.length-1:Math.max(0,Math.min(buttons.length-1,index+(event.key==='ArrowDown'?1:-1)))]?.focus();
  });
  root.querySelectorAll<HTMLButtonElement>('[data-rotate]').forEach(button=>button.onclick=()=>onRotate(Number(button.dataset.rotate) as 1|-1));
  return {
    previewElement:root.querySelector<HTMLElement>('#tile-preview')!,
    update(variants:TileVariant[],choices:TileChoice[],selected:string,angle:number,contract:any,resetScroll=false){
      const nextSignature=JSON.stringify([variants,choices]),changed=signature!==nextSignature;
      if(changed){
        signature=nextSignature;
        const byVariant=new Map<string,TileChoice[]>();
        for(const c of choices){const group=byVariant.get(c.variant)||[];group.push(c);byVariant.set(c.variant,group);}
        entries=variants.flatMap(variant=>{
          const options=byVariant.get(variant.id);if(!options?.length)return [];
          const layout=LAYOUTS.find(l=>l.id===variant.layout),style=STYLES[variant.family]?.title||variant.family,tags:Category[]=[];
          if(!['urban','industrial','scifi'].includes(variant.family))tags.push('Nature');
          if(layout&&(layout.wet.length||layout.rivers.length||layout.id==='oasis'||layout.id==='desert-oasis'))tags.push('Water');
          if(['urban','industrial'].includes(variant.family))tags.push('Urban');
          if(variant.family==='scifi'||variant.layout==='skyport')tags.push('Sci-fi');
          return [{variant,choices:options.slice().sort((a,b)=>a.rotation-b.rotation),style,categories:tags,search:normalize([variant.title,style,variant.description,...tags].join(' '))}];
        });
      }
      chosen=selected;rotation=angle;
      const entry=entries.find(e=>e.variant.id===chosen)!;
      if(changed||!list.childElementCount)renderRows(resetScroll);
      else {
        // Keep row focus and list scroll stable while selecting or rotating.
        for(const button of list.querySelectorAll<HTMLButtonElement>('[data-tile-variant]')){
          const active=button.dataset.tileVariant===chosen;button.setAttribute('aria-pressed',String(active));
          if(active)button.querySelector('.tile-catalog-thumbnail')!.innerHTML=glyph(chosen,rotation);
        }
        if(resetScroll)results.scrollTop=0;
      }
      root.querySelector<HTMLElement>('[data-selected-title]')!.textContent=entry.variant.title;
      root.querySelector<HTMLElement>('[data-selected-title]')!.title=entry.variant.description;
      root.querySelector<HTMLElement>('[data-selected-style]')!.textContent=entry.style;
      root.querySelector('output')!.textContent=`${rotation*60}°`;
      const total=contract.slot.regions?.length||1,sizes=contract.slot.regions?.map((r:any)=>`${r.radius*2} m`).join(' · ')||'380 m';
      root.querySelector<HTMLElement>('[data-selected-facts]')!.textContent=`${total} build ${total===1?'area':'areas'} · ${sizes} diameter`;
      for(const button of root.querySelectorAll<HTMLButtonElement>('[data-rotate]')){
        const direction=Number(button.dataset.rotate) as 1|-1,next=nextTileRotation(entry.choices,rotation,direction);
        button.disabled=next===rotation;
        button.title=button.disabled?'Only this orientation fits here':`Rotate ${direction===1?'clockwise':'counterclockwise'} to ${next*60}°`;
      }
    },
  };
}
