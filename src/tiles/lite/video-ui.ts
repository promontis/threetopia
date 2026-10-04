import {placeWorldCards,type Rect,type WorldCardAnchor} from './world-cards';

type Anchor='left'|'right'|'centre';
interface Placement {asset:string;rect:Rect;horizontal:Anchor;bottom:boolean;rotation?:boolean;keepClear?:boolean}
interface Sprite {node:HTMLElement;width:number;height:number;pad:number;radius:number;glass:string}
export interface VideoUIFrame {
  width:number;height:number;layers:Placement[];labels:Array<{id:string;asset:string}>;
  dialog?:{skin:string;body:string;close:string;scroll:number;closeX:number;closeY:number;backdrop:string;blur:string};
}
export interface VideoUIProjection {anchors:WorldCardAnchor[];keepClear:Rect[]}

/** Freeze computed HTML only when a visual state changes. No image encoding or
 * full-page screenshots run in the live animation loop. */
function freeze(node:Element):HTMLElement {
  const clone=node.cloneNode(false) as HTMLElement,style=getComputedStyle(node);
  if(clone.style){
    for(const key of style)clone.style.setProperty(key,style.getPropertyValue(key));
    clone.style.animation='none';clone.style.transition='none';clone.style.caretColor='transparent';
    clone.style.setProperty('backdrop-filter','none');clone.style.setProperty('-webkit-backdrop-filter','none');
  }
  if(clone instanceof HTMLImageElement){clone.src=(node as HTMLImageElement).currentSrc||(node as HTMLImageElement).src;clone.srcset='';clone.loading='eager';}
  for(const child of node.childNodes)clone.append(child instanceof Element?freeze(child):child.cloneNode(true));
  return clone;
}

export function createVideoUIRecording(root:HTMLElement){
  const sprites=new Map<string,Sprite>(),layouts=new Map<string,{layers:Placement[];labels:Array<{id:string;asset:string}>}>();
  const query=(selector:string)=>root.querySelector<HTMLElement>(selector)!;
  function sprite(key:string,element:HTMLElement,mutate?:(clone:HTMLElement)=>void){
    if(sprites.has(key))return key;
    const style=getComputedStyle(element),box=element.getBoundingClientRect();
    const width=parseFloat(style.width)||box.width,height=parseFloat(style.height)||box.height,pad=element.matches('dialog')?128:32;
    const clone=freeze(element);clone.removeAttribute('hidden');
    Object.assign(clone.style,{position:'absolute',left:`${pad}px`,top:`${pad}px`,right:'auto',bottom:'auto',margin:'0',transform:'none',
      width:`${width}px`,height:`${height}px`,maxWidth:'none',maxHeight:'none',visibility:'visible',display:style.display==='none'?'grid':style.display});
    mutate?.(clone);
    const wrapper=document.createElement('div');
    wrapper.style.cssText=`position:relative;width:${width+pad*2}px;height:${height+pad*2}px;overflow:hidden;background:transparent;`;
    wrapper.append(clone);
    sprites.set(key,{node:wrapper,width,height,pad,radius:parseFloat(style.borderTopLeftRadius)||0,glass:style.backdropFilter||'none'});
    return key;
  }
  function capture():VideoUIFrame {
    const width=root.clientWidth,height=root.clientHeight;
    const selected=query('.world-label[data-selected="true"]')?.dataset.mapTile??'all';
    const disabled=`${query('[data-out]').hasAttribute('disabled')}/${query('[data-in]').hasAttribute('disabled')}`;
    const labelHidden=root.classList.contains('hide-world-cards');
    const layoutKey=`${width}/${height}/${selected}/${disabled}/${labelHidden}`;
    let layout=layouts.get(layoutKey);
    if(!layout){
      const layers:Placement[]=[],labels:Array<{id:string;asset:string}>=[];
      const layer=(selector:string,horizontal:Anchor,bottom=false,variant='',mutate?:(clone:HTMLElement)=>void,rotation=false)=>{
        const el=query(selector);if(!el||getComputedStyle(el).visibility==='hidden')return;
        const r=el.getBoundingClientRect();if(!r.width||!r.height)return;
        const asset=sprite(`${width}/${height}/${selector}/${variant}`,el,mutate);
        const s=sprites.get(asset)!;
        // A rotated compass has a larger bounding box; keep its original size.
        const rect=rotation?{x:r.x+(r.width-s.width)/2,y:r.y+(r.height-s.height)/2,width:s.width,height:s.height}
          :{x:r.x,y:r.y,width:r.width,height:r.height};
        layers.push({asset,rect,horizontal,bottom,rotation,keepClear:el.hasAttribute('data-card-keep-clear')});
      };
      layer('.map-brand','left');layer('.north','right',false,'',clone=>clone.replaceChildren());layer('.north span','right',false,'',undefined,true);
      layer('.map-settings-trigger','right');layer('.map-video-trigger','right');layer('.map-controls','centre',true,disabled);
      layer('.gesture-hint','centre',true);
      layer('.map-preview-notice','left');
      if(!labelHidden)for(const label of root.querySelectorAll<HTMLElement>('.world-label')){
        const id=label.dataset.mapTile!;labels.push({id,asset:sprite(`${width}/${height}/label/${id}/${label.dataset.selected}`,label)});
      }
      layout={layers,labels};layouts.set(layoutKey,layout);
    }
    const frame:VideoUIFrame={width,height,...layout};
    const dialog=document.querySelector<HTMLDialogElement>('[data-world-details][open]');
    if(dialog){
      const key=`${width}/${height}/dialog/${dialog.dataset.worldDetails}`,r=dialog.getBoundingClientRect(),button=dialog.querySelector<HTMLElement>('.creator-close')!,b=button.getBoundingClientRect();
      const backdrop=getComputedStyle(dialog,'::backdrop');
      frame.dialog={skin:sprite(`${key}/skin`,dialog,clone=>clone.replaceChildren()),
        body:sprite(`${key}/body`,dialog.querySelector<HTMLElement>('.creator-dialog-content')!),
        close:sprite(`${key}/close`,button),scroll:dialog.scrollTop,closeX:b.x-r.x,closeY:b.y-r.y,
        backdrop:backdrop.backgroundColor,blur:backdrop.backdropFilter||'none'};
    }
    return frame;
  }

  async function prepare(size:{width:number;height:number},frames:VideoUIFrame[],signal:AbortSignal){
    signal.throwIfAborted();
    const {toCanvas,getFontEmbedCSS}=await import('html-to-image');
    const fontEmbedCSS=await getFontEmbedCSS(document.body);signal.throwIfAborted();
    const ratio=Math.min(4,Math.max(...frames.map(f=>Math.min(size.width/f.width,size.height/f.height))));
    const images=new Map<string,HTMLCanvasElement>(),externalSVG=new Map<string,Promise<Document>>();
    // html-to-image embeds images/fonts; expand our external SVG <use> first.
    async function inlineSymbols(node:HTMLElement){
      for(const use of node.querySelectorAll('use')){
        const href=use.getAttribute('href')||use.getAttribute('xlink:href');if(!href)continue;
        const url=new URL(href,location.href);if(!url.hash)continue;
        const id=url.hash.slice(1);url.hash='';
        let source=externalSVG.get(url.href);
        if(!source){source=fetch(url,{signal}).then(async response=>{if(!response.ok)throw Error('Could not load the map logo.');return new DOMParser().parseFromString(await response.text(),'image/svg+xml');});externalSVG.set(url.href,source);}
        const original=(await source).getElementById(id);if(!original)throw Error('Could not load the map logo.');
        use.replaceWith(original.cloneNode(true));
      }
    }
    try{
      for(const [key,asset] of sprites){
        signal.throwIfAborted();await inlineSymbols(asset.node);
        const image=await toCanvas(asset.node,{width:asset.width+asset.pad*2,height:asset.height+asset.pad*2,pixelRatio:ratio,fontEmbedCSS,
          // Every original style is already frozen, including exact font sizes.
          includeStyleProperties:[],onImageErrorHandler:()=>{throw Error('Could not load an image in the recorded interface.');}});
        images.set(key,image);signal.throwIfAborted();
      }
    }catch(error){for(const image of images.values())image.width=image.height=0;throw error;}
    const canvas=document.createElement('canvas');canvas.width=size.width;canvas.height=size.height;
    const ctx=canvas.getContext('2d',{alpha:false})!,glass=document.createElement('canvas'),glassCtx=glass.getContext('2d')!;
    function backdrop(rect:Rect,radius:number,filter:string,scale:number){
      if(!filter||filter==='none')return;
      const x=rect.x*scale,y=rect.y*scale,w=rect.width*scale,h=rect.height*scale,pad=60*scale;
      const sx=Math.max(0,Math.floor(x-pad)),sy=Math.max(0,Math.floor(y-pad)),sw=Math.min(canvas.width-sx,Math.ceil(w+pad*2)),sh=Math.min(canvas.height-sy,Math.ceil(h+pad*2));
      if(sw<=0||sh<=0)return;
      glass.width=sw;glass.height=sh;glassCtx.drawImage(canvas,sx,sy,sw,sh,0,0,sw,sh);
      ctx.save();ctx.setTransform(1,0,0,1,0,0);ctx.beginPath();ctx.roundRect(x,y,w,h,radius*scale);ctx.clip();
      ctx.filter=filter.replace(/([\d.]+)px/g,(_,n)=>`${Number(n)*scale}px`);ctx.drawImage(glass,sx,sy);ctx.restore();
    }
    function draw(key:string,x:number,y:number,scale:number){
      const asset=sprites.get(key)!,image=images.get(key)!;
      backdrop({x,y,width:asset.width,height:asset.height},asset.radius,asset.glass,scale);
      ctx.drawImage(image,x-asset.pad,y-asset.pad,asset.width+asset.pad*2,asset.height+asset.pad*2);
    }
    return {
      canvas,
      draw(map:HTMLCanvasElement,frame:VideoUIFrame,azimuth:number,project:(width:number,height:number)=>VideoUIProjection){
        ctx.setTransform(1,0,0,1,0,0);ctx.drawImage(map,0,0,canvas.width,canvas.height);
        const scale=Math.min(size.width/frame.width,size.height/frame.height),width=size.width/scale,height=size.height/scale;
        ctx.setTransform(scale,0,0,scale,0,0);
        const reserved:Rect[]=[];
        for(const layer of frame.layers){
          const {rect}=layer,x=layer.horizontal==='right'?width-(frame.width-rect.x):layer.horizontal==='centre'?(width-rect.width)/2:rect.x;
          const y=layer.bottom?height-(frame.height-rect.y):rect.y;
          if(layer.keepClear)reserved.push({x,y,width:rect.width,height:rect.height});
          if(layer.rotation){ctx.save();ctx.translate(x+rect.width/2,y+rect.height/2);ctx.rotate(-azimuth);draw(layer.asset,-rect.width/2,-rect.height/2,scale);ctx.restore();}
          else draw(layer.asset,x,y,scale);
        }
        if(frame.labels.length){
          const first=sprites.get(frame.labels[0].asset)!,projection=project(width,height);
          const positions=placeWorldCards(projection.anchors.sort((a,b)=>a.id.localeCompare(b.id)),width,height,first.width,first.height,projection.keepClear,reserved);
          ctx.strokeStyle='#d6f4f07a';ctx.lineWidth=1;ctx.lineCap='round';
          for(const p of positions)if(!p.hidden&&p.line)ctx.stroke(new Path2D(p.line));
          for(const p of positions)if(!p.hidden){const card=frame.labels.find(l=>l.id===p.id);if(card)draw(card.asset,p.rect.x,p.rect.y,scale);}
        }
        if(frame.dialog){
          const dialog=frame.dialog,skin=sprites.get(dialog.skin)!,x=(width-skin.width)/2,y=(height-skin.height)/2;
          backdrop({x:0,y:0,width,height},0,dialog.blur,scale);ctx.fillStyle=dialog.backdrop;ctx.fillRect(0,0,width,height);
          draw(dialog.skin,x,y,scale);
          ctx.save();ctx.beginPath();ctx.roundRect(x+1,y+1,skin.width-2,skin.height-2,Math.max(0,skin.radius-1));ctx.clip();
          draw(dialog.body,x+1,y+1-dialog.scroll,scale);ctx.restore();
          draw(dialog.close,x+dialog.closeX,y+dialog.closeY,scale);
        }
      },
      dispose(){for(const image of images.values())image.width=image.height=0;images.clear();canvas.width=canvas.height=glass.width=glass.height=0;},
    };
  }
  return {capture,prepare,dispose(){sprites.clear();layouts.clear();},inspect:()=>({sprites:sprites.size,layouts:layouts.size})};
}

export type VideoUIRecording=ReturnType<typeof createVideoUIRecording>;
