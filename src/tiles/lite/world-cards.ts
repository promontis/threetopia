interface CardAnchor {label:HTMLElement;x:number;y:number;hidden:boolean}
export interface Rect {x:number;y:number;width:number;height:number}
export interface WorldCardAnchor {id:string;x:number;y:number;hidden:boolean}
const clamp=(v:number,min:number,max:number)=>Math.max(min,Math.min(max,v));
const intersects=(a:Rect,b:Rect)=>a.x<b.x+b.width+8&&a.x+a.width+8>b.x&&a.y<b.y+b.height+8&&a.y+a.height+8>b.y;

/** Shared by live HTML and offline video, using the actual rendered camera. */
export function placeWorldCards(anchors:WorldCardAnchor[],viewportWidth:number,viewportHeight:number,width:number,height:number,keepClear:Rect[]=[],interfaceAreas:Rect[]=[]){
  const placed:Rect[]=[],margin=12,top=viewportHeight<560?66:80,bottom=viewportHeight<560?68:108;
  const maxX=Math.max(margin,viewportWidth-width-margin),maxY=Math.max(top,viewportHeight-height-bottom);
  return anchors.map(anchor=>{
    const {x,y}=anchor,preferred={x:x-width/2,y:y+10};
    const occupied=[...interfaceAreas,...keepClear,...placed];
    const xs=[preferred.x,margin,maxX,...occupied.flatMap(r=>[r.x-width-8,r.x+r.width+8])];
    const ys=[preferred.y,y-height-10,top,maxY,...occupied.flatMap(r=>[r.y-height-8,r.y+r.height+8])];
    let best:Rect|undefined,bestScore=Infinity;
    for(const px of xs)for(const py of ys){
      const rect={x:clamp(px,margin,maxX),y:clamp(py,top,maxY),width,height};
      // On narrow screens prefer covering a bit of scenery to covering another
      // button. All four creator cards must remain independently clickable.
      const overlaps=placed.filter(other=>intersects(rect,other)).length;
      const reserved=interfaceAreas.filter(other=>intersects(rect,other)).length;
      const scenery=keepClear.filter(other=>intersects(rect,other)).length;
      const score=reserved*1e12+overlaps*1e10+scenery*1e8+(rect.x-preferred.x)**2+(rect.y-preferred.y)**2;
      if(score<bestScore){bestScore=score;best=rect;}
    }
    const rect=best!;if(!anchor.hidden)placed.push(rect);
    const inside=x>=rect.x&&x<=rect.x+width&&y>=rect.y&&y<=rect.y+height;
    const endX=clamp(x,rect.x+10,rect.x+width-10),endY=clamp(y,rect.y+10,rect.y+height-10);
    return {...anchor,rect,line:inside?'':`M ${x} ${y} L ${endX} ${endY}`};
  });
}

/** Keep the projected tile point separate from the card's screen placement.
 * Four small cards can move aside without losing their connection to a tile.
 * Measure only on resize; the animated frame never reads element rectangles. */
export function createWorldCardLayout(layer:HTMLElement){
  const ns='http://www.w3.org/2000/svg',leaders=document.createElementNS(ns,'svg');
  leaders.classList.add('world-card-leaders');leaders.setAttribute('aria-hidden','true');layer.prepend(leaders);
  const paths=new Map<HTMLElement,SVGPathElement>();
  let viewportWidth=0,viewportHeight=0,width=184,height=64;
  let reserved:Rect[]=[];
  return {
    resize(){
      viewportWidth=layer.clientWidth;viewportHeight=layer.clientHeight;
      const card=layer.querySelector<HTMLElement>('.world-label');
      if(card){const style=getComputedStyle(card);width=parseFloat(style.width);height=parseFloat(style.height);}
      reserved=Array.from(layer.parentElement!.querySelectorAll<HTMLElement>('[data-card-keep-clear]'),el=>{
        const {x,y,width,height}=el.getBoundingClientRect();return {x,y,width,height};
      });
      leaders.setAttribute('viewBox',`0 0 ${viewportWidth} ${viewportHeight}`);
    },
    update(anchors:CardAnchor[],keepClear:Rect[]=[]){
      const positions=placeWorldCards(anchors.map((a,i)=>({...a,id:String(i)})),viewportWidth,viewportHeight,width,height,keepClear,reserved);
      for(const {id,x,y,hidden,rect,line} of positions){
        const label=anchors[Number(id)].label;
        let path=paths.get(label);if(!path){path=document.createElementNS(ns,'path');paths.set(label,path);leaders.append(path);}
        label.hidden=hidden;path.style.display=hidden?'none':'';
        label.style.left=`${x}px`;label.style.top=`${y}px`;
        if(hidden)continue;
        label.style.setProperty('--card-x',`${rect.x-x}px`);label.style.setProperty('--card-y',`${rect.y-y}px`);
        path.setAttribute('d',line);
      }
    },
    dispose(){leaders.remove();paths.clear();},
  };
}
