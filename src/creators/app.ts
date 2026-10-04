import {mountSiteAccount} from '../shared/site-account';
import {accountReturnTo} from '../shared/account-links';
import {mountPackageCatalog,discoveryFields} from './package-catalog';
import {catalogReturnHref} from './package-discovery';
import {MY_PACKAGES_PATH,EXPLORE_PACKAGES_PATH,MY_TILES_PATH,canonicalCreatorPath} from './routes';
import {mountPreview} from './preview';
import {mountPackagePreview} from './package-preview';
import {previewChoices} from './preview-content';
import {mountTileThumbnails} from './tile-thumbnails';
import {mapFrameMarkup,mountMapFrame} from './map-frame';
import study from './tile-study.json';
import {tileGlyph,tileThumbnail} from './tile-glyph';
import {mountTileCatalog,nextTileRotation} from './tile-catalog';
import {tileContract,STYLES,LEGACY_VARIANTS,compatibleChoices,canonicalTile,ORIGINAL_TILES} from '../../packages/platform/tiles.js';
const app=document.querySelector<HTMLDivElement>('#app')!;
const esc=(v:any)=>String(v??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]!));
const date=(n:number)=>new Intl.DateTimeFormat('en',{dateStyle:'medium'}).format(n);
const icon=(name:string)=>({grid:'▦',world:'⬡',package:'◈',arrow:'↗',plus:'+',back:'←',code:'⌘',check:'✓'}[name]||name);
let fetchScope=new AbortController();
let creator:any=null,cleanups:Array<()=>void>=[],view=0;
const siteAccount=mountSiteAccount({loadSession:false,onLogout:()=>{creator=null;go('/login');},onSessionChange:value=>{creator=value;void render();}});
function cleanup(){for(const f of cleanups)f();cleanups=[];}
function notice(message:string){const el=document.querySelector('#toast')!;el.textContent=message;el.classList.add('visible');setTimeout(()=>el.classList.remove('visible'),5000);}
async function api(path:string,options:RequestInit={}){const res=await fetch(`/api${path}`,{...options,signal:options.signal??fetchScope.signal,headers:{...(options.body?{'Content-Type':'application/json'}:{}),...options.headers}}),value=await res.json();if(!res.ok)throw Error(value.message+(value.details?` ${value.details.join(' ')}`:''));return value;}
const post=(path:string,value:any={})=>api(path,{method:'POST',body:JSON.stringify(value)});
function go(path:string){const url=new URL(path,location.href);url.pathname=canonicalCreatorPath(url.pathname);history.pushState({},'',url.pathname+url.search+url.hash);void render();}
window.addEventListener('popstate',()=>void render());
document.addEventListener('click',e=>{const a=(e.target as HTMLElement).closest<HTMLAnchorElement>('a[data-nav]');if(a&&a.origin===location.origin&&e.button===0&&!e.ctrlKey&&!e.metaKey&&!e.shiftKey&&!e.altKey){e.preventDefault();go(a.pathname+a.search);}});
function form(id:string,submit:(data:FormData)=>Promise<void>){const el=document.querySelector<HTMLFormElement>(id)!;el.addEventListener('submit',async event=>{event.preventDefault();const button=el.querySelector<HTMLButtonElement>('button[type=submit]')!,error=el.querySelector<HTMLElement>('[data-error]')!;error.textContent='';button.disabled=true;try{await submit(new FormData(el));}catch(e){error.textContent=(e as Error).message;}finally{button.disabled=false;}});}
const errorField='<p class="form-error" data-error role="alert"></p>';
const field=(label:string,name:string,placeholder='',type='text',value='')=>`<label>${label}<input name="${name}" type="${type}" placeholder="${esc(placeholder)}" value="${esc(value)}" required ${name==='email'?'autocomplete="email"':name==='code'?'inputmode="numeric" autocomplete="one-time-code" maxlength="8"':''}></label>`;
function layout(content:string,workspaceClass=''){
  siteAccount.setCreator(creator);
  if(!creator){app.innerHTML=content;return;}
  const groups=[{title:'Packages',links:[[MY_PACKAGES_PATH,'package','My packages'],[EXPLORE_PACKAGES_PATH,'arrow','Explore']]},{title:'Tiles',links:[[MY_TILES_PATH,'world','My tiles'],['/tiles','arrow','Explore']]}];
  const navigation=groups.map(({title,links})=>`<div class="nav-group" role="group" aria-labelledby="nav-${title.toLowerCase()}"><h2 id="nav-${title.toLowerCase()}">${title}</h2>${links.map(([href,i,label])=>`<a href="${href}" data-nav ${location.pathname===href?'class="active" aria-current="page"':''} title="${label==='Explore'?`Explore ${title.toLowerCase()}`:label}"><svg viewBox="0 0 24 24" fill="none" aria-hidden="true">${i==='package'?'<path d="m12 3 9 5v8l-9 5-9-5V8Zm0 10 9-5M12 13 3 8m9 5v8M7.5 5.5l9 5V15"/>':i==='world'?'<path d="m12 3 9 5v8l-9 5-9-5V8Z"/>':'<path d="M6 18 18 6M6 6h12v12"/>'}</svg>${label}</a>`).join('')}</div>`).join('');
  app.innerHTML=`<aside class="sidebar site-sidebar"><nav aria-label="Creator navigation">${navigation}</nav></aside><main class="workspace ${workspaceClass}">${content}</main>`;
}
const heading=(eyebrow:string,title:string,desc:string,action='')=>`<header class="page-heading"><div>${eyebrow?`<p class="eyebrow">${eyebrow}</p>`:''}<h1>${title}</h1><p>${desc}</p></div>${action}</header>`;
const badge=(state:string)=>`<span class="badge ${esc(state||'draft')}">${esc(state||'draft')}</span>`;
function command(value:string){return `<div class="command"><code>${esc(value)}</code><button type="button" data-copy="${esc(value)}" aria-label="Copy command">Copy</button></div>`;}
function bindCopy(){document.querySelectorAll<HTMLButtonElement>('[data-copy]').forEach(b=>b.onclick=()=>{navigator.clipboard.writeText(b.dataset.copy!).then(()=>notice('Copied to clipboard.')).catch(()=>notice('Select the command to copy it.'));});}
function packageCard(p:any){return `<a href="/packages/${p.id}" data-nav class="package-card"><div class="package-art ${p.kind}"><span>${p.kind==='world'?'⬡':'◈'}</span><small>${p.kind==='world'?'WORLD PACKAGE':'ASSET PACKAGE'}</small></div><div class="package-copy"><div>${badge(p.state)}<span class="version">${p.latest_version?'v'+esc(p.latest_version):'No version yet'}</span></div><h2>${esc(p.title)}</h2><p class="mono">${esc(p.name)}</p><p>${esc(p.description||'Ready for your first contribution.')}</p><footer><span>@${esc(p.handle)}</span><span>${p.installers||0} creator${p.installers===1?'':'s'} installed</span></footer></div></a>`;}
function finishSignIn(next:string){
  const target=accountReturnTo(next,location.origin);
  if(!creator.handle){go('/profile?next='+encodeURIComponent(target));return;}
  if(new URL(target,location.origin).origin!==location.origin)location.assign(target);else go(target);
}
async function login(){
  const signup=location.pathname==='/signup',explicit=signup||location.pathname==='/login';
  const next=accountReturnTo(explicit?new URLSearchParams(location.search).get('next'):location.pathname+location.search,location.origin);
  const alternate=(signup?'/login':'/signup')+'?next='+encodeURIComponent(next);
  layout(`<main class="login-layout"><section class="login-story"><p class="eyebrow">A PLACE FOR YOUR IDEAS</p><h1>Make something.<br>Build somewhere.</h1><p>Your assets can become someone’s starting point. Your world can become part of ours.</p><div class="login-tiles" aria-hidden="true"><i></i><i></i><i></i><i></i><i></i></div><a href="https://world.threetopia.com" target="_blank" rel="noreferrer">Explore the map preview ↗</a></section><section class="login-card"><span class="step-label">THREETOPIA CREATORS</span><h2>${signup?'Create your account':'Sign in to Threetopia'}</h2><p>${signup?'Join Threetopia with your email.':'Welcome back. Enter your email to sign in.'} We’ll send you a one-time code.</p><form id="login">${field('Email address','email','you@example.com','email')}${errorField}<button type="submit" class="primary">${signup?'Send verification code':'Send sign-in code'} <span>→</span></button></form><p class="login-switch">${signup?'Already have an account?':'New to Threetopia?'} <a href="${esc(alternate)}" data-nav>${signup?'Sign in':'Sign up'}</a></p><p class="fine">Your email stays private. Your creator handle is shown when you publish or install packages.</p></section></main>`);
  form('#login',async d=>{const email=d.get('email'),result=await post('/auth/start',{email});document.querySelector('.login-card')!.innerHTML=`<span class="step-label">CHECK YOUR INBOX</span><h2>You’ve got a code.</h2><p>Enter the eight-digit code sent to <strong>${esc(email)}</strong>. It expires in 10 minutes.</p><form id="verify">${field('Sign-in code','code','00000000')}${result.developmentCode?`<p class="development-code">Local development code: <strong>${result.developmentCode}</strong></p>`:''}${errorField}<button class="primary" type="submit">Sign in →</button></form><button class="text-button" type="button" data-retry>Use another email</button>`;
    document.querySelector<HTMLInputElement>('[name=code]')!.focus();document.querySelector<HTMLButtonElement>('[data-retry]')!.onclick=()=>void login();
    form('#verify',async data=>{creator=(await post('/auth/verify',{challenge:result.challenge,code:String(data.get('code')).trim()})).creator;finishSignIn(next);});
  });
}
async function profilePage(){layout(heading('',creator.handle?'Profile':'Complete your profile','Your display name and permanent creator handle identify your packages.')+`<section class="panel narrow"><form id="profile">${field('Display name','displayName','Your name','text',creator.displayName)}${field('Creator handle','handle','your-handle','text',creator.handle||'')}<p class="fine">3–30 lowercase letters, numbers and hyphens. Package names look like <code>@your-handle/my-world</code>.</p>${errorField}<button class="primary" type="submit">${creator.handle?'Save profile':'Complete profile'} →</button></form></section>`);if(creator.handle)document.querySelector<HTMLInputElement>('[name=handle]')!.readOnly=true;form('#profile',async d=>{creator=(await api('/profile',{method:'PATCH',body:JSON.stringify(Object.fromEntries(d))})).creator;finishSignIn(accountReturnTo(new URLSearchParams(location.search).get('next'),location.origin));});}
async function dashboard(){const data=await api('/packages?mine=1');layout(heading('','My packages','Manage your asset and world packages.',`<a href="/new?kind=asset" data-nav class="button secondary">+ New asset</a><a href="/tiles" data-nav class="button primary">Choose a world tile ↗</a>`)+`<div class="stats-row"><div><strong>${data.packages.length}</strong><span>Your packages</span></div><div><strong>${data.packages.filter((p:any)=>p.state==='published').length}</strong><span>Published</span></div><div><strong>${data.packages.reduce((n:number,p:any)=>n+p.installers,0)}</strong><span>Creator installations</span></div></div><div class="collection-body"><div class="section-heading"><h2>Your packages</h2><a href="${EXPLORE_PACKAGES_PATH}" data-nav>Explore reusable packages ↗</a></div>${data.packages.length?`<div class="package-grid">${data.packages.map(packageCard).join('')}</div>`:`<section class="empty-state"><span class="empty-icon">⬡</span><h2>Every world starts somewhere.</h2><p>Choose an available tile, explore its terrain variations, and make its fixed slot your own.</p><a href="/tiles" data-nav class="button primary">Find my tile →</a><a href="/new?kind=asset" data-nav>Or start with a reusable asset</a></section>`}</div><aside class="getting-started"><div><p class="eyebrow">FROM YOUR TERMINAL</p><h3>Your tools, connected.</h3><p>Preview locally. Validate both representations. Publish when you’re ready.</p></div><div>${command('threetopia login')}<a href="https://docs.threetopia.com/quickstart" target="_blank" rel="noreferrer">Install the CLI & get started ↗</a></div></aside>`,'collection-workspace');bindCopy();}
async function catalog(){
  layout(heading('','Explore packages','Find assets and worlds to build with.')+'<div class="package-catalog"></div>','collection-workspace');
  cleanups.push(mountPackageCatalog(document.querySelector('.package-catalog')!,(path,signal)=>api(path,{signal})));
}
async function myTiles(){
  const pageView=view;
  const [data,packages]=await Promise.all([api('/tiles'),api('/packages?mine=1')]);
  if(pageView!==view)return;
  const tiles=data.tiles.filter((t:any)=>t.mine),byId=new Map<string,any>(packages.packages.map((p:any)=>[p.id,p]));
  layout(heading('','My tiles','Your reserved tiles and published worlds.',`<a href="/tiles" data-nav class="button primary">Explore tiles ↗</a>`)+'<div class="collection-body">'+(tiles.length?`<div class="owned-tiles">${tiles.map((t:any)=>{
    const p=byId.get(t.packageId),state=t.version?'published':'reserved';
    const title=p?.title||t.contract.recipe.title,url=`${MY_TILES_PATH}?tile=${t.id}`;
    return `<article class="owned-tile"><a href="${url}" data-nav class="owned-tile-image" data-tile-preview="${t.id}" data-preview-state="loading" aria-busy="true" aria-label="View tile ${t.q}, ${t.r} on the map"><span class="owned-tile-placeholder" aria-hidden="true">${tileThumbnail(t.contract.variant,t.contract.rotation)}</span><img data-tile-photo ${t.thumbnail?.url?`src="${esc(t.thumbnail.url)}"`:""} alt="Map view of ${esc(title)}, tile ${t.q}, ${t.r}" width="800" height="500" decoding="async" loading="lazy"><span class="owned-tile-preview-status" data-preview-status>Loading preview…</span></a><div class="owned-tile-copy"><div class="owned-tile-heading"><span class="owned-tile-coordinate">Tile ${t.q}, ${t.r}</span>${badge(state)}</div><h2><a href="${url}" data-nav>${esc(title)}</a></h2><p>${esc(t.contract.recipe.title)}${t.version?` <span aria-hidden="true">·</span> v${esc(t.version)}`:''}</p><div class="owned-tile-actions"><a href="${url}" data-nav class="button secondary">View on map ↗</a>${t.packageId?`<a href="/packages/${t.packageId}" data-nav class="owned-tile-package">Open package →</a>`:`<a href="/new?kind=world&tile=${t.id}" data-nav class="owned-tile-package">Create package →</a>`}</div></div></article>`;
  }).join('')}</div>`:`<section class="empty-state"><span class="empty-icon" aria-hidden="true">⬡</span><h2>No tiles yet.</h2><p>Explore the map and reserve a tile for your world.</p><a href="/tiles" data-nav class="button primary">Explore tiles ↗</a></section>`)+'</div>','collection-workspace');
  if(tiles.length)cleanups.push(mountTileThumbnails(document.querySelector('.owned-tiles')!,data));
}
async function tilesStudyPage(){
  const contracts=study.map(t=>canonicalTile(t.q,t.r,t.variant,t.rotation)),data={tiles:[],studyTiles:contracts,slots:[...ORIGINAL_TILES.map(t=>({...t,status:'occupied'})),...study.map(t=>({...t,status:'available'}))]};
  layout(heading('','Tile study','Fifteen host designs connected to the four original worlds. Explore their terrain, waterways and floating platforms.','<a href="/tiles" data-nav class="button secondary">Explore tiles →</a>')+`<div class="tile-editor">${mapFrameMarkup('Connected Wang tile study')}<aside class="tile-inspector" id="tile-inspector" hidden></aside></div>`);
  document.querySelector('.workspace')!.classList.add('tile-workspace');
  const mapFrame=mountMapFrame(document.querySelector('.map-board')!);cleanups.push(()=>mapFrame.dispose());
  const frame=mapFrame.frame,inspector=document.querySelector<HTMLElement>('#tile-inspector')!,editor=document.querySelector<HTMLElement>('.tile-editor')!;
  let selected:any;
  const send=()=>{const placement=editor.clientWidth<760?'bottom':'right';editor.dataset.panelLayout=placement;mapFrame.send({type:'creator:tiles',data,selected,allowSelection:true,panel:{placement,width:340,height:inspector.offsetHeight||400,top:88,bottom:116}});};
  function close(){selected=undefined;inspector.hidden=true;send();}
  const message=(e:MessageEvent)=>{if(e.origin!==location.origin||e.source!==frame.contentWindow)return;
    if(e.data?.type==='creator:select'){const t=contracts.find(t=>t.q===e.data.q&&t.r===e.data.r);if(!t)return;selected=t;inspector.hidden=false;delete inspector.dataset.ready;
      inspector.innerHTML=`<div class="tile-inspector-content"><div class="study-glyph">${tileThumbnail(t.variant,t.rotation)}</div><h2>${esc(t.recipe.title)}</h2><p class="fine">${STYLES[t.recipe.family].title} · ${t.rotation*60}°</p><p class="fine">${esc(t.recipe.description)}</p><div class="slot-facts"><span><strong>${t.slot.regions.length} build ${t.slot.regions.length===1?'area':'areas'}</strong>${t.slot.regions.map((r:any)=>`${r.radius*2} m`).join(' · ')} diameter</span></div><p class="fine">This is an unreserved study tile. Choose your own place in Explore tiles.</p></div><footer class="tile-inspector-footer"><div class="tile-inspector-actions"><button class="button secondary" data-study-close>Cancel</button><a href="/tiles" data-nav class="button primary">Explore tiles</a></div></footer>`;
      inspector.querySelector<HTMLButtonElement>('[data-study-close]')!.onclick=close;send();}
    if(e.data?.type==='creator:focus'&&e.data.settled)inspector.dataset.ready='true';
    if(e.data?.type==='creator:deselect')close();
    if(e.data?.type==='creator:map-panel'){editor.dataset.mapPanelOpen=String(e.data.open);inspector.inert=!!e.data.open;}
  };
  window.addEventListener('message',message);send();
  const resize=new ResizeObserver(()=>send());resize.observe(editor);
  cleanups.push(()=>{resize.disconnect();window.removeEventListener('message',message);});
}
async function tilesPage(ownedId?:string){
  const pageView=view;
  layout(heading('',ownedId?'My tile':'Explore tiles',ownedId?'View your tile and manage its world package.':'Choose any free tile connected to a published world. Reserve it, then create the world that belongs inside.',ownedId?`<a href="${MY_TILES_PATH}" data-nav class="button secondary">← My tiles</a>`:'')+`<div class="tile-editor">${mapFrameMarkup('Interactive Threetopia map with available tiles')}<aside class="tile-inspector" id="tile-inspector" role="dialog" aria-label="Tile options" tabindex="-1" hidden></aside></div>`);
  document.querySelector('.workspace')!.classList.add('tile-workspace');
  const editor=document.querySelector<HTMLElement>('.tile-editor')!,board=document.querySelector<HTMLElement>('.map-board')!;
  const mapFrame=mountMapFrame(board);cleanups.push(()=>mapFrame.dispose());
  const frame=mapFrame.frame,inspector=document.querySelector<HTMLElement>('#tile-inspector')!;
  let data:any;try{data=await api('/tiles');}catch(error){if(pageView===view)mapFrame.fail('We couldn’t load the available tiles. Please try again.');return;}
  const owned=ownedId?data.tiles.find((t:any)=>t.id===ownedId&&t.mine):undefined;
  if(pageView!==view)return;
  if(ownedId&&!owned){go(MY_TILES_PATH);return;}
  const choices=owned?[]:data.slots.filter((t:any)=>t.status==='available');
  for(const t of choices)t.choices??=compatibleChoices(t.q,t.r,data.tiles,{lookahead:true});
  const link=new URLSearchParams(location.search),coordinate=link.get('tile')?.split(',').map(Number);
  let selected=owned?data.slots.find((t:any)=>t.q===owned.q&&t.r===owned.r):coordinate?.length===2&&coordinate.every(Number.isInteger)?choices.find((t:any)=>t.q===coordinate[0]&&t.r===coordinate[1]):undefined;
  let chosen=owned?.variant||selected?.choices?.find((c:any)=>c.variant===link.get('variant'))?.variant||'tropical-inlet',rotation=owned?.contract?.rotation||0,legacyEdges:number[]=owned?.contract?.legacyEdges||[],previewTicket=0;
  let catalog:ReturnType<typeof mountTileCatalog>|null=null;
  let pendingFocus=false,lastViewport='';
  if(!owned&&!choices.length)editor.insertAdjacentHTML('beforeend','<div class="tile-empty-notice" role="status"><h2>All connected positions are reserved.</h2><p>New positions open when neighboring worlds are published.</p></div>');
  const previewSlot=document.createElement('div');
  let preview:Awaited<ReturnType<typeof mountPreview>>;
  try{
    const first=choices[0],initial=owned?.contract||await tileContract(first?.q??8,first?.r??0,first?.choices?.[0]?.variant||'tropical-inlet',first?.choices?.[0]?.rotation||0,first?.choices?.[0]?.legacyEdges||[]);
    if(pageView!==view)return;
    preview=await mountPreview(previewSlot,{contract:initial});
  }catch(error){if(pageView===view)mapFrame.fail('We couldn’t prepare the tile preview. Please try again.');return;}
  if(pageView!==view){preview();return;}

  function panelLayout(){
    const placement=board.clientWidth<760?'bottom':'right';editor.dataset.panelLayout=placement;
    return {placement,width:inspector.offsetWidth||360,height:inspector.offsetHeight||540,top:placement==='bottom'?72:88,bottom:placement==='bottom'?84:116};
  }
  function send(restoreView=true){
    const panel=panelLayout();lastViewport=JSON.stringify([board.clientWidth,board.clientHeight,panel]);
    mapFrame.send({type:'creator:tiles',data,selected,variant:chosen,rotation,legacyEdges,allowSelection:!owned,panel,restoreView});
  }
  function close(restoreView=true){
    if(owned){go(MY_TILES_PATH);return;}
    selected=undefined;pendingFocus=false;previewTicket++;preview.attach(previewSlot);catalog=null;
    inspector.hidden=true;inspector.replaceChildren();delete inspector.dataset.ready;send(restoreView);frame.focus({preventScroll:true});
  }
  async function show(focus=false){
    const ticket=++previewTicket;
    const previousReserve=inspector.querySelector<HTMLButtonElement>('[data-reserve]');
    if(previousReserve)previousReserve.disabled=true;
    if(!selected){inspector.hidden=true;send();return;}
    const coordinate={q:selected.q,r:selected.r},options=selected.choices||[];
    if(!owned){const option=options.find((c:any)=>c.variant===chosen&&c.rotation===rotation)||options.find((c:any)=>c.variant===chosen)||options[0];if(!option){notice('No compatible layout is currently available here.');close();return;}chosen=option.variant;rotation=option.rotation;legacyEdges=option.legacyEdges;}
    const variant=[...data.variants,...LEGACY_VARIANTS].find((v:any)=>v.id===chosen);
    const contract=owned?.contract||await tileContract(coordinate.q,coordinate.r,chosen,rotation,legacyEdges);if(ticket!==previewTicket)return;
    if(inspector.hidden||focus){delete inspector.dataset.ready;pendingFocus=true;}
    inspector.hidden=false;inspector.setAttribute('aria-label',`Tile options at ${coordinate.q}, ${coordinate.r}`);
    const footer=`<footer class="tile-inspector-footer"><p class="form-error" data-reserve-error role="alert"></p><div class="tile-inspector-actions"><button type="button" class="button secondary" data-close-tile>Cancel</button>${!owned?'<button type="button" class="primary" data-reserve disabled>Reserve</button>':''}</div></footer>`;
    if(owned){
      inspector.innerHTML=`<div class="tile-inspector-content">
        <div class="owned-tile-status">${badge(owned.version?'published':'reserved')}<p class="fine">Your tile. Its host terrain is locked.</p></div>
        <div class="tile-mini-preview" id="tile-preview"></div>
        <h3>${esc(variant.title)}</h3><p class="fine">${esc(variant.description)}</p>
        <div class="slot-facts"><span><strong>${contract.slot.regions?.length||1} build ${(contract.slot.regions?.length||1)===1?'area':'areas'}</strong>${contract.slot.regions?contract.slot.regions.map((r:any)=>`${r.radius*2} m`).join(' · '):'380 m'} diameter</span><span><strong>600 m tile</strong>18 map units</span></div>
        ${owned.packageId?`<a href="/packages/${owned.packageId}" data-nav class="button primary">Open world package →</a>`:`<a href="/new?kind=world&tile=${owned.id}" data-nav class="button primary">Create a world package →</a><button type="button" class="text-button" data-release>Release reservation</button>`}
      </div>${footer}`;
      preview.attach(inspector.querySelector('#tile-preview')!);
    }else{
      if(!catalog){
        inspector.innerHTML=`<div class="tile-catalog-body"></div>${footer}`;
        catalog=mountTileCatalog(inspector.querySelector('.tile-catalog-body')!,{
          onSelect:id=>{chosen=id;void show();},
          onRotate:direction=>{rotation=nextTileRotation((selected?.choices||[]).filter((c:any)=>c.variant===chosen),rotation,direction);void show();},
        });
        preview.attach(catalog.previewElement);
      }
      catalog.update(data.variants,options,chosen,rotation,contract,focus);
    }
    inspector.querySelector('[data-reserve-error]')!.textContent='';
    send();
    inspector.querySelector<HTMLButtonElement>('[data-close-tile]')!.onclick=()=>close();
    const reserve=inspector.querySelector<HTMLButtonElement>('[data-reserve]');
    if(reserve)reserve.onclick=async()=>{
      reserve.disabled=true;
      try{const result=await post('/tiles/reserve',{...coordinate,variant:chosen,rotation});go(`/new?kind=world&tile=${result.id}`);}
      catch(e){const error=inspector.querySelector('[data-reserve-error]');if(ticket===previewTicket&&error)error.textContent=(e as Error).message;else notice((e as Error).message);reserve.disabled=false;}
    };
    inspector.querySelector<HTMLButtonElement>('[data-release]')?.addEventListener('click',async()=>{try{await api(`/tiles/${owned.id}`,{method:'DELETE'});go(MY_TILES_PATH);}catch(e){notice((e as Error).message);}});
    try{
      if(ticket!==previewTicket)return;
      await preview.update(contract);
      if(ticket===previewTicket&&reserve)reserve.disabled=false;
    }catch(e){if(ticket===previewTicket)notice((e as Error).message);}
  }
  const message=(e:MessageEvent)=>{
    if(e.origin!==location.origin||e.source!==frame.contentWindow)return;
    if(e.data?.type==='creator:select'){
      const tile=choices.find((s:any)=>s.q===e.data.q&&s.r===e.data.r);
      if(tile&&(selected?.q!==tile.q||selected?.r!==tile.r)){selected=tile;void show(true);}
    }
    if(e.data?.type==='creator:deselect'&&selected)close(e.data.restoreView!==false);
    if(e.data?.type==='creator:tile-error'&&selected?.q===e.data.q&&selected?.r===e.data.r&&chosen===e.data.variant&&rotation===e.data.rotation){
      const error=inspector.querySelector('[data-reserve-error]'),reserve=inspector.querySelector<HTMLButtonElement>('[data-reserve]');
      if(error)error.textContent='The tile preview could not be loaded. Refresh the page to try again.';
      else notice('The tile preview could not be loaded. Refresh the page to try again.');
      if(reserve)reserve.disabled=true;
    }
    if(e.data?.type==='creator:map-panel'){editor.dataset.mapPanelOpen=String(e.data.open);inspector.inert=!!e.data.open;}
    if(e.data?.type==='creator:focus'&&selected?.q===e.data.q&&selected?.r===e.data.r){
      if(e.data.settled){inspector.dataset.ready='true';if(pendingFocus){pendingFocus=false;inspector.focus({preventScroll:true});}}
    }
  };
  const keydown=(e:KeyboardEvent)=>{if(e.key==='Escape'&&selected){e.preventDefault();close();}};
  const resize=new ResizeObserver(()=>{
    const panel=panelLayout(),key=JSON.stringify([board.clientWidth,board.clientHeight,panel]);
    if(selected&&key!==lastViewport){lastViewport=key;frame.contentWindow?.postMessage({type:'creator:viewport',panel},location.origin);}
  });
  resize.observe(board);resize.observe(inspector);window.addEventListener('message',message);window.addEventListener('keydown',keydown);
  cleanups.push(()=>{resize.disconnect();window.removeEventListener('message',message);window.removeEventListener('keydown',keydown);previewTicket++;preview();});
  await show();
}
async function newPackage(){const params=new URLSearchParams(location.search),kind=params.get('kind')==='world'?'world':'asset',tileId=params.get('tile'),tile=tileId?await api(`/tiles/${tileId}`):null;if(kind==='world'&&!tile){go('/tiles');return;}
  layout(heading(kind==='world'?'YOUR RESERVED TILE':'A REUSABLE BUILDING BLOCK',kind==='world'?'Give your world a name.':'Make something others can use.',kind==='world'?`Tile (${tile.q}, ${tile.r}) · ${tile.variant}. Both world and map content are required.`:'Models, materials, textures and reusable code can all live in an asset package.')+`<section class="panel narrow"><form id="new-package">${field('Package title','title',kind==='world'?'Coral garden':'Coastal rocks')}${field('Package name','slug','coral-garden')}<p class="fine">Namespace: <code>@${esc(creator.handle)}/…</code></p><label>Description<textarea name="description" maxlength="1000" placeholder="What will you create?"></textarea></label>${discoveryFields()}${errorField}<button class="primary" type="submit">Create ${kind} package →</button></form></section>`);form('#new-package',async d=>{const result=await post('/packages',{name:`@${creator.handle}/${d.get('slug')}`,title:d.get('title'),description:d.get('description'),category:d.get('category'),tags:String(d.get('tags')||'').split(',').map(tag=>tag.trim()).filter(Boolean),kind,tileId});go(`/packages/${result.id}`);});}
async function packagePage(id:string){const n=view,data=await api(`/packages/${id}`);if(n!==view)return;const {package:p,versions,tile,installers,owner}=data,latest=versions[0],returnTo=catalogReturnHref(location.search);layout(`<a href="${esc(returnTo||(owner?MY_PACKAGES_PATH:EXPLORE_PACKAGES_PATH))}" data-nav class="back">← ${returnTo?'Search results':owner?'My packages':'Package library'}</a>`+heading(`${p.kind.toUpperCase()} PACKAGE`,esc(p.title),esc(p.description||'Your next contribution to Threetopia.'),badge(latest?.state))+`<div class="package-detail"><section><section id="package-preview"></section><div class="panel package-overview"><div class="identity"><span class="large-icon">${p.kind==='world'?'⬡':'◈'}</span><div><h2>${esc(p.name)}</h2><p>By ${esc(p.display_name||p.handle)} · Created ${date(p.created_at)}</p></div></div>${tile?`<div class="tile-binding"><span>⬡</span><div><strong>Tile ${tile.contract.q}, ${tile.contract.r} · ${esc(tile.contract.recipe.title)}</strong><p>Host tile locked · World + map + overview required</p></div></div>`:''}${owner?command(`threetopia clone ${p.name}`):command(`threetopia install ${p.name}${latest?'@'+latest.version:''}`)}<p class="fine">${owner?'Open the project locally, edit the content, and run threetopia preview.':'CLI installations are visible to this package’s creator under your public handle.'}</p></div><div class="section-heading"><h2>Versions & changelog</h2><span>${versions.length} version${versions.length===1?'':'s'}</span></div>${versions.length?versions.map((v:any)=>`<article class="version-card"><header><div><strong>v${esc(v.version)}</strong>${badge(v.state)}</div><time>${date(v.created_at)}</time></header><p class="changelog">${esc(v.manifest.changelog)}</p><div class="version-actions">${owner&&v.state==='ready'?`<button type="button" data-publish="${v.version}" class="primary">${p.kind==='world'?'Publish to this tile':'Publish version'} ↗</button>`:''}${owner&&v.state!=='published'?`<button type="button" class="text-button danger" data-delete-version="${v.version}">Delete draft</button>`:''}</div>${v.report?.errors?.length?`<div class="validation-errors">${v.report.errors.map((s:string)=>`<p>${esc(s)}</p>`).join('')}</div>`:''}${v.report?.metrics?`<details><summary>Validated geometry</summary><div class="metrics">${Object.entries(v.report.metrics).map(([role,m]:[string,any])=>`<div><strong>${esc(role)}</strong><span>${m.triangles.toLocaleString()} triangles</span><span>${m.drawCalls} draw calls</span><span>${Math.round(m.bytes/1024)} KiB</span></div>`).join('')}</div></details>`:''}</article>`).join(''):`<div class="panel empty-versions"><h3>Your first version starts locally.</h3><p>Clone this package to get the starter files and fixed tile contract.</p>${command(`threetopia clone ${p.name}`)}${command(`cd ${p.name.split('/')[1]} && threetopia preview`)}${command('threetopia push')}<p class="fine">Push creates a private, validated preview. Publish it here when it is ready.</p></div>`}</section><aside><section class="panel"><p class="eyebrow">${owner?'YOUR COLLABORATORS':'PACKAGE DETAILS'}</p><h2>${owner?'Installed by creators':'Use this package'}</h2>${owner?`<p class="fine">Active CLI installations. Public handles only; no emails or private project names.</p>${installers.length?installers.map((i:any)=>`<div class="installer"><span class="avatar">${esc(i.display_name?.[0]||i.handle[0])}</span><div><strong>${esc(i.display_name||i.handle)}</strong><p>@${esc(i.handle)} · v${esc(i.version)}</p></div></div>`).join(''):'<p class="muted">No installations yet.</p>'}`:`<p>Exact versions make your project reproducible. The CLI downloads and verifies every file.</p><a href="https://docs.threetopia.com/packages" target="_blank" rel="noreferrer">Using packages ↗</a>`}</section>${owner?`<section class="panel"><h3>Discoverability</h3><p>Help other creators find this package.</p><form id="package-discovery" class="package-discovery-form">${discoveryFields(p.category,JSON.parse(p.tags||'[]'))}${errorField}<button type="submit" class="button secondary">Save details</button><p data-save-status role="status"></p></form></section>`:''}<section class="panel"><h3>Next steps</h3><ol class="steps"><li>Clone or create locally</li><li>Preview your content</li><li>Push a validated version</li><li>Publish when ready</li></ol><a href="https://docs.threetopia.com/quickstart" target="_blank" rel="noreferrer">Read the creator guide ↗</a></section>${owner&&!versions.some((v:any)=>v.state==='published')?'<button class="text-button danger" type="button" data-delete-package>Delete unpublished package</button>':''}</aside></div>`);bindCopy();cleanups.push(mountPackagePreview(document.querySelector<HTMLElement>('#package-preview')!,data));
  if(owner)form('#package-discovery',async data=>{
    document.querySelector('[data-save-status]')!.textContent='';
    const result=await api(`/packages/${id}`,{method:'PATCH',body:JSON.stringify({category:data.get('category'),tags:String(data.get('tags')||'').split(',').map(tag=>tag.trim()).filter(Boolean)})});
    document.querySelector<HTMLInputElement>('#package-discovery [name=tags]')!.value=result.tags.join(', ');
    document.querySelector('[data-save-status]')!.textContent=versions.some((v:any)=>v.state==='published')?'Saved. Your listing is updated.':'Saved. Visible in search when you publish.';
  });
  document.querySelectorAll<HTMLButtonElement>('[data-publish]').forEach(b=>b.onclick=async()=>{b.disabled=true;try{await post(`/packages/${id}/versions/${b.dataset.publish}/publish`);notice('Published. Your package is available to other creators.');await render();}catch(e){notice((e as Error).message);b.disabled=false;}});
  document.querySelectorAll<HTMLButtonElement>('[data-delete-version]').forEach(b=>b.onclick=async()=>{if(!confirm(`Delete unpublished version ${b.dataset.deleteVersion}?`))return;try{await api(`/packages/${id}/versions/${b.dataset.deleteVersion}`,{method:'DELETE'});await render();}catch(e){notice((e as Error).message);}});
  document.querySelector<HTMLButtonElement>('[data-delete-package]')?.addEventListener('click',async()=>{if(!confirm('Delete this unpublished package? Your tile reservation will remain available to you.'))return;try{await api(`/packages/${id}`,{method:'DELETE'});go(MY_PACKAGES_PATH);}catch(e){notice((e as Error).message);}});
}
async function previewPage(id:string,version:string){
  const n=view,data=await api(`/packages/${id}`);if(n!==view)return;
  const v=data.versions.find((v:any)=>v.version===version);if(!v)throw Error('Version not found.');
  const isWorld=data.package.kind==='world',params=new URLSearchParams(location.search),choice=params.get(isWorld?'mode':'export')||undefined;
  if(choice&&!previewChoices(v.manifest).some(c=>c.id===choice))throw Error('Unknown preview view.');
  layout(`<a href="/packages/${id}" data-nav class="back">← ${esc(data.package.title)}</a>`+heading('PACKAGE PREVIEW',esc(data.package.title),isWorld?'Explore the map, world and overview content.':'Explore the model and switch between versions.')+`<section id="full-package-preview"></section>${isWorld&&data.owner?'<div class="preview-note"><strong>Fixed host tile</strong><span>The white line marks your content slot. It is hidden on the public map.</span><a href="https://docs.threetopia.com/validation" target="_blank" rel="noreferrer">Bounds & budgets ↗</a></div>':''}`);
  cleanups.push(mountPackagePreview(document.querySelector<HTMLElement>('#full-package-preview')!,data,{version,choice,expanded:true}));
}
async function settings(){const {tokens}=await api('/tokens');layout(heading('','Settings','Manage your account and connected terminals.')+`<div class="two-columns"><section class="panel"><h2>Install the Threetopia CLI</h2><p>Node.js 22.13 or later. The download includes the validator and local preview renderer.</p>${command('npm install -g https://docs.threetopia.com/downloads/threetopia-cli-0.5.1.tgz')}${command('threetopia login')}<a href="https://docs.threetopia.com/cli" target="_blank" rel="noreferrer">Full command reference ↗</a><h3>Your account</h3><p>${esc(creator.email)}<br>@${esc(creator.handle)}</p><a href="/profile" data-nav class="button secondary">Edit profile</a> <button type="button" class="button secondary" data-logout>Sign out of this browser</button></section><section class="panel"><h2>Connected CLI sessions</h2><p class="fine">Browser approval grants access for 90 days. Revoke a token to sign that terminal out.</p>${tokens.length?tokens.map((t:any)=>`<div class="token-row"><div><strong>${esc(t.label)}</strong><p>Connected ${date(t.created_at)} · Expires ${date(t.expires_at)}</p></div><button class="text-button danger" data-revoke="${t.id}">Revoke</button></div>`).join(''):'<p class="muted">No terminals connected yet.</p>'}</section></div>`);bindCopy();document.querySelector<HTMLButtonElement>('[data-logout]')!.onclick=async()=>{try{await siteAccount.logout();}catch{notice('Could not log out. Please try again.');}};document.querySelectorAll<HTMLButtonElement>('[data-revoke]').forEach(b=>b.onclick=async()=>{await api('/tokens/'+b.dataset.revoke,{method:'DELETE'});await render();});}
async function device(){const code=new URLSearchParams(location.search).get('code')||'';layout(heading('CONNECT YOUR TERMINAL','Approve CLI sign-in.','Only approve a code that appeared in a terminal where you ran threetopia login.')+`<section class="panel narrow"><p>This will let your CLI create, upload, install and publish packages as <strong>@${esc(creator.handle)}</strong>.</p><form id="approve">${field('Code shown in your terminal','userCode','AB12CD34','text',code)}${errorField}<button class="primary" type="submit">Approve CLI access →</button></form><button class="text-button" data-deny>Decline</button></section>`);form('#approve',async d=>{await post('/auth/device/approve',{userCode:String(d.get('userCode')).trim().toUpperCase(),approve:true});layout(heading('CONNECTED','Your terminal is ready.','You can close this tab and return to the CLI.')+`<a class="button primary" href="${MY_PACKAGES_PATH}" data-nav>Open my packages →</a>`);});document.querySelector<HTMLButtonElement>('[data-deny]')!.onclick=async()=>{try{await post('/auth/device/approve',{userCode:code,approve:false});go(MY_PACKAGES_PATH);}catch(e){notice((e as Error).message);}};}
async function render(){const seq=++view;fetchScope.abort();fetchScope=new AbortController();cleanup();try{
  const canonicalPath=canonicalCreatorPath(location.pathname);if(canonicalPath!==location.pathname)history.replaceState({},'',canonicalPath+location.search+location.hash);
  if(!creator){await login();return;}if(location.pathname==='/login'||location.pathname==='/signup'){finishSignIn(accountReturnTo(new URLSearchParams(location.search).get('next'),location.origin));return;}if(!creator.handle&&location.pathname!=='/profile'){go('/profile?next='+encodeURIComponent(location.pathname+location.search));return;}
  const path=location.pathname;if(path==='/profile')await profilePage();else if(path===MY_TILES_PATH){const id=new URLSearchParams(location.search).get('tile');if(id)await tilesPage(id);else await myTiles();}else if(path==='/tiles/study')await tilesStudyPage();else if(path==='/tiles')await tilesPage();else if(path===EXPLORE_PACKAGES_PATH)await catalog();else if(path==='/new')await newPackage();else if(path==='/settings')await settings();else if(path==='/device')await device();else if(path===MY_PACKAGES_PATH)await dashboard();else if(path.startsWith('/packages/'))await packagePage(path.split('/')[2]);else if(path.startsWith('/preview/'))await previewPage(path.split('/')[2],path.split('/')[3]);else await dashboard();
  if(seq===view)window.scrollTo(0,0);
}catch(e){if(seq!==view)return;layout(heading('PLEASE TRY AGAIN','We couldn’t open this view.',esc((e as Error).message))+`<a href="${MY_PACKAGES_PATH}" data-nav class="button primary">Back to my packages →</a>`);}}
void api('/me').then(data=>{creator=data.creator;void render();}).catch(e=>{app.innerHTML=`<main class="empty-state"><h1>Unable to load Threetopia</h1><p>${esc(e.message)}</p><button onclick="location.reload()">Try again</button></main>`;});
