import './settings-panel.css';
// Original Tidewater SVGs (Dan Greenheck, MIT), without its walking-game HUD.
import {icon} from '../../../packages/world-sources/tidewater/src/ui/icons.js';
import {PIXEL_RATIOS,SETTING_RANGES,type MapSettings,type SettingKey} from './settings-model';

interface SettingsOptions {
  root:HTMLElement;settings:MapSettings;maxSamples:number;
  change:(key:SettingKey,value:number|boolean)=>boolean;
  reset:()=>boolean;resetView:()=>void;zoom:(fraction:number)=>void;
  opened?:()=>void;
  stats:()=>{fps:number|null;cpuMs:number;width:number;height:number;dpr:number;paused:boolean};
}

/** A non-modal panel: the map stays live and can still be orbited beside it. */
export function createSettingsPanel(options:SettingsOptions){
  const {root,settings}=options,abort=new AbortController(),on={signal:abort.signal};
  const tabs=[['ocean','Ocean','ocean'],['shore','Shore','shore'],['lighting','Lighting','sun'],['camera','Camera','camera'],['effects','Effects','effects'],['performance','Performance','performance']];
  const button=(name:string,symbol:string,action:string)=>`<button type="button" class="settings-icon" data-settings-action="${action}" aria-label="${name}" title="${name}">${icon(symbol)}</button>`;
  const section=(title:string,symbol:string,body:string)=>`<details class="settings-section" open><summary>${icon(symbol)}<span>${title}</span>${icon('chevron-down','settings-chevron')}</summary><div class="settings-fields">${body}</div></details>`;
  const slider=(key:keyof typeof SETTING_RANGES,label:string,step:number,tip:string)=>{
    const [min,max]=SETTING_RANGES[key];
    return `<div class="settings-range"><div class="settings-field-head"><label for="setting-${key}" title="${tip}">${label}</label><output for="setting-${key}" data-value="${key}"></output></div><input id="setting-${key}" data-setting="${key}" type="range" min="${min}" max="${max}" step="${step}"></div>`;
  };
  const toggle=(key:SettingKey,label:string,tip:string)=>`<label class="settings-toggle" title="${tip}"><span>${label}</span><input type="checkbox" role="switch" data-setting="${key}" aria-label="${label}"><span class="settings-switch" aria-hidden="true"></span></label>`;
  const pages:Record<string,string>={
    ocean:section('Sea state','wind',slider('waveStrength','Wave strength',.05,'Height and texture of the ocean waves.'))+section('Water','droplet',slider('clarity','Clarity',.05,'How far sunlight travels through the water.')),
    shore:section('Surf','wave',slider('surfStrength','Shore waves',.05,'Small waves rolling towards the shoreline.')+slider('foamStrength','Sea foam',.05,'Foam around the shoreline and wave crests.')),
    lighting:section('Light','sun',slider('exposure','Exposure',.1,'Brightness of the whole view, measured in exposure stops.')+slider('environmentLight','Sky light',.05,'Soft light from the sky and reflected light from the ground.')),
    camera:section('View','camera',`<div class="settings-range"><div class="settings-field-head"><label for="setting-zoom">Zoom</label><output for="setting-zoom" data-zoom-value>Overview</output></div><input id="setting-zoom" type="range" min="0" max="100" step="1" value="0"></div>${toggle('labels','World cards','Show the names and creators of each world.')}<button type="button" class="settings-wide-button" data-settings-action="view">${icon('viewfinder')}Show all worlds<kbd>0</kbd></button>`)+section('Navigation','compass','<dl class="settings-help-list"><div><dt>Rotate</dt><dd>Drag</dd></div><div><dt>Zoom</dt><dd>Scroll or pinch</dd></div><div><dt>Pan when zoomed in</dt><dd>Right-drag / two fingers</dd></div></dl>'),
    effects:section('Atmosphere','cloud',toggle('clouds','Clouds','Show drifting clouds and their reflections in the water.'))+section('Post-processing','sparkles',slider('ao','Contact shadows',.05,'Adds soft depth where objects and surfaces meet.')+slider('bloom','Bloom',.01,'The glow around neon signs and floating thruster rings.')),
    performance:section('Live','gauge',`<dl class="settings-stats"><div><dt>Frame rate</dt><dd data-stat="fps">—</dd></div><div><dt title="Time the CPU spends submitting each frame; excludes GPU execution.">CPU per frame</dt><dd data-stat="cpu">—</dd></div><div><dt>Render size</dt><dd data-stat="size">—</dd></div><div><dt>Active DPR</dt><dd data-stat="dpr">—</dd></div></dl>`)+section('Quality','layers',
      `<label class="settings-select"><span>Pixel ratio</span><span class="settings-select-wrap"><select aria-label="Pixel ratio" aria-describedby="setting-pixelRatio-help" data-setting="pixelRatio">${PIXEL_RATIOS.map(n=>`<option value="${n}">${n?`DPR ${n}`:'Auto'}</option>`).join('')}</select>${icon('chevron-down')}</span></label><p class="settings-note" id="setting-pixelRatio-help">Auto balances detail and speed. Higher DPR gives sharper detail at a higher GPU cost.</p>`+
      slider('renderScale','Render scale',.05,'Percentage of the selected pixel ratio. Lower it for faster rendering.')+`<label class="settings-select"><span title="Smooths edges, including fine foliage.">Anti-aliasing</span><span class="settings-select-wrap"><select aria-label="Anti-aliasing" data-setting="antiAliasing">${[0,2,4].filter(n=>n<=options.maxSamples).map(n=>`<option value="${n}">${n?`${n}x`:'Off'}</option>`).join('')}</select>${icon('chevron-down')}</span></label>`+toggle('shadows','Shadows','Sun shadows cast by buildings, trees and terrain.')+toggle('reflections','Water reflections','Reflect the island in the water. Turning this off reduces rendering work.')),
  };
  const trigger=document.createElement('button');trigger.type='button';trigger.className='map-settings-trigger';trigger.setAttribute('aria-label','Open settings');trigger.title='Settings (H)';trigger.setAttribute('aria-expanded','false');trigger.setAttribute('aria-controls','map-settings');trigger.innerHTML=icon('settings');
  const panel=document.createElement('aside');panel.id='map-settings';panel.className='map-settings';panel.hidden=true;panel.setAttribute('role','dialog');panel.setAttribute('aria-modal','false');panel.setAttribute('aria-labelledby','map-settings-title');
  panel.innerHTML=`<header class="settings-header"><h2 id="map-settings-title">Settings</h2><div>${button('Show all worlds','viewfinder','view')}${button('Settings help','help','help')}${button('Close settings','chevrons-right','close')}</div></header>
    <div class="settings-tabs" role="tablist" aria-label="Settings categories">${tabs.map(([id,label,symbol])=>`<button type="button" role="tab" id="settings-tab-${id}" aria-controls="settings-page-${id}" aria-selected="${id==='performance'}" tabindex="${id==='performance'?0:-1}" aria-label="${label}" title="${label}">${icon(symbol)}<span>${label}</span></button>`).join('')}</div>
    <div class="settings-help" hidden><strong>Make the map your own</strong><p>Changes appear immediately and are saved on this device. Drag the map beside this panel to look around.</p><p><kbd>H</kbd> settings <span>·</span> <kbd>Esc</kbd> close</p></div>
    <div class="settings-pages">${tabs.map(([id,label])=>`<section id="settings-page-${id}" role="tabpanel" aria-labelledby="settings-tab-${id}" ${id==='performance'?'':'hidden'}>${pages[id]}</section>`).join('')}</div>
    <footer class="settings-footer"><span data-settings-saved>Changes apply instantly</span><button type="button" data-settings-action="reset">${icon('reset')}Reset</button></footer>`;
  root.append(trigger,panel);
  const fields=Array.from(panel.querySelectorAll<HTMLInputElement|HTMLSelectElement>('[data-setting]'));
  const tabButtons=Array.from(panel.querySelectorAll<HTMLButtonElement>('[role="tab"]'));
  let timer:ReturnType<typeof setInterval>|undefined,lastZoom=-1,cameraLocked=false;
  function format(key:SettingKey,value:number){
    if(key==='exposure')return `${value>0?'+':''}${value.toFixed(1)} EV`;
    return `${Math.round(value*100)}%`;
  }
  function paintRange(input:HTMLInputElement){input.style.setProperty('--range-fill',`${100*(Number(input.value)-Number(input.min))/(Number(input.max)-Number(input.min))}%`);}
  function sync(){
    for(const field of fields){
      const key=field.dataset.setting as SettingKey,value=settings[key];
      if(field instanceof HTMLInputElement&&field.type==='checkbox')field.checked=value as boolean;
      else {field.value=String(value);if(field instanceof HTMLInputElement){paintRange(field);panel.querySelector(`[data-value="${key}"]`)!.textContent=format(key,value as number);}}
    }
  }
  function saved(ok:boolean){panel.querySelector('[data-settings-saved]')!.textContent=ok?'Saved on this device':'Applied for this visit';}
  function updateStats(){
    if(panel.hidden||document.hidden)return;
    const s=options.stats();panel.querySelector('[data-stat="fps"]')!.textContent=s.paused?'Paused':s.fps===null?'Measuring…':`${Math.round(s.fps)} fps`;
    panel.querySelector('[data-stat="cpu"]')!.textContent=s.paused?'—':`${s.cpuMs.toFixed(2)} ms`;
    panel.querySelector('[data-stat="size"]')!.textContent=`${s.width} × ${s.height}`;
    panel.querySelector('[data-stat="dpr"]')!.textContent=s.dpr.toFixed(2);
  }
  function setOpen(open:boolean,returnFocus=true){
    panel.hidden=!open;trigger.setAttribute('aria-expanded',String(open));root.classList.toggle('settings-open',open);
    if(timer)clearInterval(timer);timer=undefined;
    if(open){options.opened?.();sync();updateStats();timer=setInterval(updateStats,500);tabButtons.find(t=>t.getAttribute('aria-selected')==='true')?.focus({preventScroll:true});}
    else if(returnFocus)trigger.focus({preventScroll:true});
  }
  function selectTab(tab:HTMLButtonElement){
    for(const other of tabButtons){const active=other===tab;other.setAttribute('aria-selected',String(active));other.tabIndex=active?0:-1;panel.querySelector<HTMLElement>(`#${other.getAttribute('aria-controls')}`)!.hidden=!active;}
    panel.querySelector('.settings-pages')!.scrollTop=0;updateStats();
  }
  trigger.addEventListener('click',()=>setOpen(panel.hidden),on);
  for(const field of fields)field.addEventListener('input',()=>{
    const value=field instanceof HTMLInputElement&&field.type==='checkbox'?field.checked:Number(field.value);
    saved(options.change(field.dataset.setting as SettingKey,value));sync();updateStats();
  },on);
  for(const tab of tabButtons){
    tab.addEventListener('click',()=>selectTab(tab),on);
    tab.addEventListener('keydown',e=>{
      if(!['ArrowLeft','ArrowRight','Home','End'].includes(e.key))return;e.preventDefault();
      const i=tabButtons.indexOf(tab),next=e.key==='Home'?0:e.key==='End'?tabButtons.length-1:(i+(e.key==='ArrowRight'?1:-1)+tabButtons.length)%tabButtons.length;
      selectTab(tabButtons[next]);tabButtons[next].focus();
    },on);
  }
  const zoom=panel.querySelector<HTMLInputElement>('#setting-zoom')!;
  const navigation=Array.from(panel.querySelectorAll<HTMLElement>('.settings-help-list dd')),navigationHelp=navigation.map(el=>el.textContent);
  zoom.addEventListener('input',()=>{paintRange(zoom);options.zoom(Number(zoom.value)/100);},on);
  for(const action of panel.querySelectorAll<HTMLButtonElement>('[data-settings-action]'))action.addEventListener('click',()=>{
    switch(action.dataset.settingsAction){
      case 'close':setOpen(false);break;
      case 'view':options.resetView();break;
      case 'help':{const help=panel.querySelector<HTMLElement>('.settings-help')!;help.hidden=!help.hidden;action.setAttribute('aria-expanded',String(!help.hidden));break;}
      case 'reset':saved(options.reset());sync();updateStats();break;
    }
  },on);
  document.addEventListener('keydown',e=>{
    if(e.defaultPrevented||e.ctrlKey||e.metaKey||e.altKey||root.classList.contains('video-busy')||document.querySelector('dialog[open]'))return;
    const editing=e.target instanceof Element&&!!e.target.closest('input,select,textarea,[contenteditable="true"]');
    if(e.key.toLowerCase()==='h'&&!editing){e.preventDefault();setOpen(panel.hidden);}
    else if(e.key==='Escape'&&!panel.hidden){e.preventDefault();setOpen(false);}
  },on);
  sync();
  return {
    get open(){return !panel.hidden;},
    close(){if(!panel.hidden)setOpen(false,false);},
    setCameraLocked(locked:boolean){
      cameraLocked=locked;lastZoom=-1;zoom.disabled=locked;zoom.title=locked?'Cancel the tile selection to zoom':'';
      panel.querySelectorAll<HTMLButtonElement>('[data-settings-action="view"]').forEach(button=>button.disabled=locked);
      navigation.forEach((el,i)=>el.textContent=locked?(i===0?'Drag around selected tile':'Cancel selection to unlock'):navigationHelp[i]);
    },
    syncZoom(fraction:number){const value=Math.round(fraction*100);if(value===lastZoom)return;lastZoom=value;zoom.value=String(value);paintRange(zoom);panel.querySelector('[data-zoom-value]')!.textContent=cameraLocked?'Tile selected':value===0?'Overview':value===100?'Whole tile':`${value}%`;},
    dispose(){abort.abort();if(timer)clearInterval(timer);trigger.remove();panel.remove();root.classList.remove('settings-open');},
  };
}
