import {marked} from 'marked';
import {sha256} from '../../packages/platform/integrity.js';
import './package-readme.css';

// Package Markdown is untrusted. Build a small semantic DOM from tokens; raw
// HTML, scripts, event attributes, embedded media and unsafe URLs never execute.
export function renderReadme(root:HTMLElement,text:string) {
  function append(parent:HTMLElement,tokens:any[]) {
    for(const token of tokens){
      if(token.type==='space')continue;
      if(token.type==='code'){const pre=document.createElement('pre'),code=document.createElement('code');code.textContent=token.text;pre.append(code);parent.append(pre);continue;}
      if(token.type==='list'){const list=document.createElement(token.ordered?'ol':'ul');for(const item of token.items){const li=document.createElement('li');append(li,item.tokens);list.append(li);}parent.append(list);continue;}
      if(token.type==='link'){
        let url:URL|undefined;try{const candidate=new URL(token.href);if(['https:','http:'].includes(candidate.protocol))url=candidate;}catch{}
        if(url){const a=document.createElement('a');a.href=url.href;a.rel='noopener noreferrer';a.target='_blank';append(a,token.tokens||[]);parent.append(a);}else append(parent,token.tokens||[{type:'text',text:token.text}]);continue;
      }
      const tag=({heading:`h${Math.min(6,Math.max(1,token.depth||1))}`,paragraph:'p',strong:'strong',em:'em',del:'del',codespan:'code',blockquote:'blockquote',br:'br',hr:'hr'} as Record<string,string>)[token.type];
      if(tag){const el=document.createElement(tag);if(token.tokens)append(el,token.tokens);else el.textContent=token.text||'';parent.append(el);}
      else if(token.tokens)append(parent,token.tokens);
      else parent.append(document.createTextNode(token.text||token.raw||''));
    }
  }
  root.replaceChildren();append(root,marked.lexer(text));
}

export function mountPackageReadme(root:HTMLElement,data:any) {
  const controller=new AbortController();
  const version=data.versions.find((v:any)=>['ready','published'].includes(v.state)&&v.manifest.files?.some((f:any)=>f.path==='README.md'));
  if(!version){root.hidden=true;return ()=>controller.abort();}
  const descriptor=version.manifest.files.find((f:any)=>f.path==='README.md');
  root.classList.add('package-readme','panel');root.setAttribute('aria-label',`Package README v${version.version}`);root.textContent='Loading README…';
  void (async()=>{
    if(descriptor.bytes>512*1024)throw Error('README is too large for inline display. Install the package to read it.');
    const response=await fetch(`/api/packages/${encodeURIComponent(data.package.id)}/versions/${encodeURIComponent(version.version)}/files?path=README.md`,{signal:controller.signal});
    if(!response.ok)throw Error('README could not be loaded.');const bytes=new Uint8Array(await response.arrayBuffer());
    if(bytes.length!==descriptor.bytes||await sha256(bytes)!==descriptor.sha256)throw Error('README integrity check failed.');
    if(!controller.signal.aborted)renderReadme(root,new TextDecoder().decode(bytes));
  })().catch(error=>{if(!controller.signal.aborted)root.textContent=error.message;});
  return ()=>controller.abort();
}
