import './package-preview.css';
import {mountPreview} from './preview';
import {previewChoices,previewVersions,type PreviewVersion} from './preview-content';

const esc=(value:string)=>value.replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]!));
const resetIcon='<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" aria-hidden="true"><path d="M4 10a8 8 0 1 1 1 7M4 4v6h6"/></svg>';
const chevronIcon='<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="m6 9 6 6 6-6"/></svg>';
type Handle=(()=>void)&{reset?:()=>void};
type Options={version?:string;choice?:string;expanded?:boolean};

export function mountPackagePreview(root:HTMLElement,data:any,options:Options={}){
  const versions=previewVersions(data.versions),isWorld=data.package.kind==='world';
  const initial=options.version?versions.find(v=>v.version===options.version):versions[0];
  let selection=options.choice,disposed=false,ticket=0;
  let current:Handle|undefined,loadScope=new AbortController();
  root.classList.add('package-preview');if(options.expanded)root.classList.add('package-preview-expanded');
  root.setAttribute('aria-label','3D package preview');
  if(!initial){
    root.innerHTML=`<div class="package-preview-empty"><span aria-hidden="true">◇</span><h2>${data.versions.some((v:PreviewVersion)=>['ready','published'].includes(v.state))?'No 3D model in this package':'No preview yet'}</h2><p>${data.versions.some((v:PreviewVersion)=>['ready','published'].includes(v.state))?'This package contains other reusable files. Install it to use them.':'A 3D preview appears here after the first upload passes validation.'}</p></div>`;
    return ()=>{disposed=true;};
  }
  let selected:PreviewVersion=initial;
  root.innerHTML=`<header class="package-preview-toolbar"><strong>3D preview</strong><label class="package-preview-version">Version<span class="package-preview-select"><select aria-label="Preview version">${versions.map(v=>`<option value="${esc(v.version)}">v${esc(v.version)}${v.state==='ready'?' · Private':''}</option>`).join('')}</select>${chevronIcon}</span></label>${isWorld?`<label class="package-preview-choice">View<span class="package-preview-select"><select aria-label="Preview representation"></select>${chevronIcon}</span></label>`:''}<div class="package-preview-actions"><button type="button" data-preview-reset title="Reset view" aria-label="Reset view" disabled>${resetIcon}</button></div></header><div class="package-preview-stage"><div class="package-preview-canvas"></div><div class="package-preview-status" role="status"><span class="package-preview-spinner" aria-hidden="true"></span><p>Loading 3D preview…</p></div></div><footer class="package-preview-footer"><span>Drag to rotate <i>·</i> Scroll or pinch to zoom</span><span data-preview-state></span></footer>`;
  const versionSelect=root.querySelector<HTMLSelectElement>('[aria-label="Preview version"]')!,choiceSelect=root.querySelector<HTMLSelectElement>('.package-preview-choice select'),canvas=root.querySelector<HTMLElement>('.package-preview-canvas')!,status=root.querySelector<HTMLElement>('.package-preview-status')!,reset=root.querySelector<HTMLButtonElement>('[data-preview-reset]')!;
  versionSelect.value=selected.version;
  function setChoices(){
    const choices=previewChoices(selected.manifest);if(!choices.some(c=>c.id===selection))selection=choices[0].id;
    if(choiceSelect){
      choiceSelect.innerHTML=choices.map(c=>`<option value="${esc(c.id)}">${esc(c.label)}</option>`).join('');choiceSelect.value=selection!;
      root.querySelector<HTMLElement>('.package-preview-choice')!.hidden=choices.length<2;
    }
  }
  async function show(){
    const request=++ticket;loadScope.abort();current?.();current=undefined;loadScope=new AbortController();const {signal}=loadScope;
    const v=selected,choice=previewChoices(v.manifest).find(c=>c.id===selection)!;
    root.dataset.previewState='loading';canvas.setAttribute('aria-busy','true');reset.disabled=true;
    status.hidden=false;status.innerHTML='<span class="package-preview-spinner" aria-hidden="true"></span><p>Loading 3D preview…</p>';
    root.querySelector('[data-preview-state]')!.textContent=v.state==='published'?'Published':'Private preview';
    const load=async()=>{const response=await fetch(`/api/packages/${data.package.id}/versions/${v.version}/files?path=${encodeURIComponent(choice.file)}`,{signal});if(!response.ok)throw Error('This model could not be loaded.');return response.arrayBuffer();};
    try{
      let handle:Handle;
      if(isWorld){signal.throwIfAborted();handle=await mountPreview(canvas,{contract:v.manifest.tile,mode:choice.id,showSlot:!!(options.expanded&&data.owner),load,signal});}
      else{const {mountAssetPreview}=await import('./asset-preview');signal.throwIfAborted();handle=await mountAssetPreview(canvas,load,signal);}
      if(disposed||request!==ticket){handle();return;}current=handle;root.dataset.previewState='ready';canvas.setAttribute('aria-busy','false');status.hidden=true;reset.disabled=false;
    }catch(error){
      if(disposed||signal.aborted||request!==ticket)return;
      canvas.replaceChildren();canvas.setAttribute('aria-busy','false');root.dataset.previewState='error';
      status.innerHTML='<p>We couldn’t load this 3D preview.</p><button type="button" class="button secondary">Try again</button>';
      status.querySelector('button')!.addEventListener('click',()=>void show(),{once:true});
      console.warn('Package preview could not load.',error instanceof Error?error.message:'Preview error');
    }
  }
  versionSelect.onchange=()=>{selected=versions.find(v=>v.version===versionSelect.value)!;setChoices();void show();};
  if(choiceSelect)choiceSelect.onchange=()=>{selection=choiceSelect.value;void show();};
  reset.onclick=()=>current?.reset?.();
  setChoices();void show();
  return ()=>{disposed=true;ticket++;loadScope.abort();current?.();};
}
