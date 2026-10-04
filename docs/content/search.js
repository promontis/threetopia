const input=document.querySelector('#search');
const results=document.querySelector('#search-results');
let pages=null,queryVersion=0;
input.addEventListener('input',async()=>{
  const version=++queryVersion,q=input.value.toLowerCase().trim();
  if(!q){results.hidden=true;return;}
  try{
    pages??=await(await fetch('/search-index.json')).json();
    if(version!==queryVersion)return;
    results.replaceChildren();
    for(const page of pages.filter(p=>(p.title+' '+p.text).toLowerCase().includes(q)).slice(0,7)){
      const a=document.createElement('a'),strong=document.createElement('strong'),p=document.createElement('p');
      a.href=page.url;strong.textContent=page.title;
      const at=Math.max(0,page.text.toLowerCase().indexOf(q)-35);
      p.textContent=page.text.slice(at,at+135).split(String.fromCharCode(10)).join(' ')+'…';
      a.append(strong,p);results.append(a);
    }
    if(!results.childElementCount)results.textContent='No matching documentation.';
    results.hidden=false;
  }catch{results.textContent='Search is unavailable. Use the documentation navigation.';results.hidden=false;}
});
document.addEventListener('keydown',e=>{if(e.key==='Escape'){results.hidden=true;input.blur();}if((e.metaKey||e.ctrlKey)&&e.key==='k'){e.preventDefault();input.focus();}});
document.addEventListener('click',e=>{if(!results.contains(e.target)&&e.target!==input)results.hidden=true;});
for(const pre of document.querySelectorAll('pre')){
  const b=document.createElement('button');b.textContent='Copy';b.setAttribute('aria-label','Copy code');
  b.onclick=async()=>{try{await navigator.clipboard.writeText(pre.querySelector('code').textContent);b.textContent='Copied';setTimeout(()=>b.textContent='Copy',1500);}catch{b.textContent='Select code to copy';}};
  pre.append(b);
}
