import * as T from 'three';
import {designFor} from './tile-designs.js';
import {rawHeight,designHeight,designFootprint,waterDistance,rotate,segment,hexInset} from './wang-v4.js';
export function random(seed){return ()=>{seed|=0;seed=seed+0x6D2B79F5|0;let t=Math.imul(seed^seed>>>15,1|seed);t=t+Math.imul(t^t>>>7,61|t)^t;return ((t^t>>>14)>>>0)/4294967296;};}
const leaf=new T.IcosahedronGeometry(1,0),softLeaf=new T.IcosahedronGeometry(1,1);
const leaflet=new T.BufferGeometry();leaflet.setAttribute('position',new T.Float32BufferAttribute([0,0,-1,-.52,0,-.2,0,.16,0,0,.16,0,-.52,0,-.2,0,0,1,0,0,-1,0,.16,0,.52,0,-.2,.52,0,-.2,0,.16,0,0,0,1],3));leaflet.computeVertexNormals();
/** Opaque, branched crowns avoid the alpha-card shimmer of faraway forests. */
export function tree(kit,x,y,z,h,type,rand){
 const evergreen=type==='pine'||type==='cypress',mangrove=type==='mangrove',bark=type==='blossom'?'#665547':'#72624d';
 const palette=type==='autumn'?['#b97423','#d9a637','#cb762a','#994d29']:type==='blossom'?['#d995ad','#efb8c7','#f3ccd3']:evergreen?['#344e38','#476449','#58734d']:['#58723c','#668343','#7a914a'];
 kit.rod('wood',[x,y,z],[x+h*.026,y+h*.70,z-h*.035],h*.033,bark,7,h*.018);
 if(mangrove)for(let i=0;i<7;i++){const a=i*Math.PI*2/7;kit.rod('wood',[x+Math.cos(a)*h*.26,y-h*.025,z+Math.sin(a)*h*.26],[x,y+h*.32,z],h*.027,bark,5,h*.014);}
 if(type==='cypress'){
  for(let i=0;i<9;i++){const f=i/9;kit.add(softLeaf,'leaves',[x+Math.sin(i*2)*h*.025,y+h*(.25+f*.69),z],[h*(.12-f*.085),h*.13,h*(.12-f*.085)],[0,i,0],palette[i%3]);}return;
 }
 const levels=evergreen?6:3;
 for(let level=0;level<levels;level++){
  const fraction=level/levels,cy=y+h*(evergreen?.25+fraction*.65:.49+fraction*.28),spread=h*(evergreen?.26*(1-fraction)+.045:.27-fraction*.06),branches=4;
  for(let j=0;j<branches;j++){
   const a=j*Math.PI*2/branches+level*1.17+rand()*.25,bx=x+Math.cos(a)*spread,bz=z+Math.sin(a)*spread,by=cy+h*(evergreen?-.025:.095);
   kit.rod('wood',[x,cy-h*.035,z],[bx,by,bz],h*.012,bark,5,h*.006);
   const clusters=evergreen?2:3;
   for(let k=0;k<clusters;k++){
    const a2=a+k*2.399,cx=bx+Math.cos(a2)*spread*.34,cz=bz+Math.sin(a2)*spread*.34,cy2=by+(rand()-.3)*h*.07,r=h*(evergreen?.083:.09+rand()*.025);
    // A crown consists of individual opaque folded leaves. This keeps a fine,
    // irregular silhouette without alpha textures or faceted green balloons.
    const leaves=evergreen?11:20;
    for(let k=0;k<leaves;k++){
     const a3=rand()*6.28,py=rand()*2-1,rr=Math.sqrt(1-py*py),radius=(.55+rand()*.45)*r,dx=Math.cos(a3)*rr*radius,dz=Math.sin(a3)*rr*radius,leafSize=h*(evergreen?.044:.039)*( .72+rand()*.5)*(kit.detail==='overview'?1.85:1);
     const rotation=[(rand()-.5)*2,rand()*6.28,(rand()-.5)*1.8],tint=palette[Math.floor(rand()*palette.length)];if(kit.detail==='overview'&&k%4!==0)continue;
     kit.add(leaflet,'leaves',[cx+dx,cy2+py*radius*(evergreen?.4:.72),cz+dz],[leafSize*(evergreen?.72:1),leafSize,leafSize*1.25],rotation,tint);
    }
   }
  }
 }
 for(let i=0;i<30;i++){const a=rand()*6.28,r=rand()*h*.09,s=h*.029;kit.add(leaflet,'leaves',[x+Math.cos(a)*r,y+h*(.89+rand()*.09),z+Math.sin(a)*r],[s,s,s*1.2],[rand(),a,rand()],palette[i%palette.length]);}
}
export function shrub(kit,x,y,z,r,rand,tint='#718a4c'){
 for(let i=0;i<4;i++){const a=i*2.4;kit.add(leaf,'leaves',[x+Math.cos(a)*r*.43,y+r*.38+rand()*r*.2,z+Math.sin(a)*r*.43],[r*.55,r*.48,r*.6],[.1,a,0],new T.Color(tint).multiplyScalar(.85+rand()*.3));}
}
export function lamp(kit,x,y,z,modern=false){
 const color=modern?'#374047':'#5e665b';kit.rod('metal',[x,y,z],[x,y+25,z],1.1,color,6,.75);kit.box('metal',x,y+1,z,4,2,4,color);
 kit.box('metal',x,y+26,z,5.2,1.6,5.2,color);kit.box('paving',x,y+23.5,z,3.7,4,3.7,'#f2e7cb');kit.box('metal',x,y+21,z,5,1,5,color);
}
export function dressHost(tile,kit){
 const d=designFor(tile),rand=random(tile.art.seed*891),routes=designFootprint(tile).routes,placed=[],world=(x,z)=>rotate([x,z],tile.rotation);
 const height=(x,z)=>{const p=world(x,z);return designHeight(tile,...p);};
 const wet=(x,z)=>{const p=world(x,z);return waterDistance(tile,...p);};
 function clear(x,z,r=5,shore=false){
  if(hexInset(x,z)<r+6)return false;const p=world(x,z);
  if(tile.slot.regions.some(s=>Math.hypot(p[0]-s.x,p[1]-s.z)<s.radius+r+3))return false;
  if(routes.some(line=>line.some((b,i)=>i&&segment(...p,line[i-1],b).d<r+15)))return false;
  const y=height(x,z);return shore?y>-27&&y<40:y>7&&y<95;
 }
 function rock(x,z,r,kind='rock',tall=1){
  if(!clear(x,z,r*1.30,true)||wet(x,z)<r*.8+3)return;let y=height(x,z);
  if(kind==='sandstone'){
   const levels=3+Math.floor(rand()*3),angle=rand()*6.28;
   for(let l=0;l<levels;l++){
    const h=r*(.28+rand()*.13),radius=r*(.84+rand()*.16-l*.055),cut=.24;
    const poly=[[-1,-1+cut],[-1+cut,-1],[1-cut,-1],[1,-1+cut],[1,1-cut],[1-cut,1],[-1+cut,1],[-1,1-cut]].map(([a,b])=>{a*=radius*(.91+rand()*.12);b*=radius*(.73+rand()*.12);return [x+a*Math.cos(angle)-b*Math.sin(angle)+(rand()-.5)*r*.10,z+a*Math.sin(angle)+b*Math.cos(angle)+(rand()-.5)*r*.10];});
    kit.polygon('stone',poly,y+h,y-.8,l%2?'#af845f':'#bd926a','#aa8260');y+=h*.93;
   }
  }else if(kind==='basalt'){
   const h=r*tall,angle=rand()*6.28,poly=Array.from({length:7},(_,i)=>{const a=i/7*6.28+angle,k=r*(.65+rand()*.14);return [x+Math.cos(a)*k,z+Math.sin(a)*k];});
   kit.polygon('stone',poly,y+h*.65,y-h*.45,'#71797a','#566066');
   kit.asset('rock-'+Math.floor(rand()*3)+'-small','stone',[x,y+h*.64,z],[r*.73,r*.22,r*.64],angle,'#8e9697');
  }else kit.asset('rock-'+Math.floor(rand()*(r>28?3:6))+(r<19?'-small':''),'stone',[x,y+r*.25,z],[r,r*tall,r*.86],rand()*6.28,d.kind==='alpine'?'#babbb3':'#ffffff');
  placed.push({kind:'rock',x,z,radius:r*1.30});
 }
 if(d.floating)return placed;
 const arid=d.kind==='oasis',coastal=['inlet','marina'].includes(d.kind),engineered=['canal','docks','boulevard'].includes(d.kind);
 if(d.kind==='alpine')for(const [cx,cz,count]of [[-86,-187,18],[74,198,14]])for(let i=0;i<count;i++){const a=rand()*6.28,r=rand()*67;rock(cx+Math.cos(a)*r,cz+Math.sin(a)*r,20+rand()*30,'rock',1+rand()*.5);}
 if(arid)for(const [cx,cz]of [[-149,-167],[-195,85],[122,-171]])for(let i=0;i<5;i++)rock(cx+(rand()-.5)*65,cz+(rand()-.5)*55,18+rand()*28,'sandstone');
 if(d.kind==='basalt')for(const dist of [25,43])for(let x=-235;x<=235;x+=17){const z=(55-x*.77-dist)/.45;rock(x,z,10+rand()*6,'basalt',1.5+rand()*1.7);}
 const rockCount=engineered?12:55;
 for(let i=0,added=0;i<2000&&added<rockCount;i++){
  const x=-250+rand()*500,z=-280+rand()*560,r=5+rand()**2*22;
  if(!clear(x,z,r*1.30,true)||(engineered&&wet(x,z)>40))continue;
  if(!arid&&!engineered&&rand()>.42&&Math.abs(wet(x,z))>65&&Math.hypot(x,z)<185)continue;
  rock(x,z,r,arid?'sandstone':d.kind==='basalt'?'basalt':'rock');added++;
 }
 const treeCount=d.kind==='woodland'?23:d.kind==='alpine'?18:arid?7:d.kind==='basalt'?6:coastal?15:d.kind==='sakura'?13:d.kind==='wetland'?10:engineered?0:12;
 for(let i=0,added=0;i<3000&&added<treeCount;i++){
  const x=-240+rand()*480,z=-260+rand()*520,h=49+rand()*35,r=h*.48;
  if(!clear(x,z,r)||placed.some(p=>p.kind==='tree'&&Math.hypot(x-p.x,z-p.z)<r*1.45))continue;
  if(arid&&(wet(x,z)<25||wet(x,z)>75))continue;
  if(d.kind==='wetland'&&wet(x,z)>80)continue;
  const y=height(x,z);
  if(arid||coastal&&rand()<.76)kit.asset('palm','leaves',[x,y-.4,z],h/12.8,rand()*6.28);
  else tree(kit,x,y,z,h,d.kind==='sakura'?'blossom':d.kind==='woodland'?'autumn':d.kind==='wetland'||d.kind==='inlet'?'mangrove':d.kind==='alpine'||d.kind==='basalt'?'pine':d.kind==='terraces'?'cypress':'oak',rand);
  placed.push({kind:'tree',x,z,radius:r});added++;
 }
 const shrubs=engineered?0:arid?30:86;
 for(let i=0,added=0;i<3000&&added<shrubs;i++){
  const x=-252+rand()*504,z=-280+rand()*560,r=4+rand()*6;if(!clear(x,z,r))continue;
  const y=height(x,z);
  if(arid&&wet(x,z)>90){if(rand()>.38)continue;shrub(kit,x,y,z,r,rand,'#9b9b75');}
  else if((coastal||d.kind==='wetland')&&rand()<.7)kit.asset(rand()<.5?'young-palm':'fern','leaves',[x,y,z],r/(rand()<.5?2:1.3),rand()*6.28);
  else shrub(kit,x,y,z,r,rand,d.kind==='basalt'?'#8b975b':'#74884b');
  if(!arid&&rand()<.38)for(let j=0;j<4;j++){const a=rand()*6.28,g=new T.IcosahedronGeometry(1,0);kit.add(g,'flowers',[x+Math.cos(a)*r,y+r*.63,z+Math.sin(a)*r],[1.4,1,1.4],[0,a,0],d.kind==='sakura'?'#e0b1c1':rand()<.6?'#dfcca0':'#a99bb5');g.dispose();}
  added++;
 }
 // Reeds are compact opaque geometry, not a field of flickering grass cards.
 if(d.kind==='wetland')for(let i=0,added=0;i<1800&&added<38;i++){
  const x=-250+rand()*500,z=-265+rand()*530;if(!clear(x,z,5,true)||Math.abs(wet(x,z)-6)>13)continue;
  const y=height(x,z);for(let j=0;j<7;j++){const a=rand()*6.28,h=10+rand()*14;kit.rod('leaves',[x+Math.cos(a)*3,y,z+Math.sin(a)*3],[x+Math.cos(a)*7,y+h,z+Math.sin(a)*7],.8,rand()<.5?'#859257':'#acaa6c',3,.3);}added++;
 }
 return placed;
}
