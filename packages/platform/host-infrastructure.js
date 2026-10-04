import * as T from 'three';
import {designFor} from './tile-designs.js';
import {designFootprint,rawHeight,designHeight,rotate,hexInset} from './wang-v4.js';
import {tree,shrub,lamp,random} from './host-dressing.js';
const local=(tile,p)=>{const [x,z]=rotate([p[0],p[2]],-tile.rotation);return [x,p[1],z];};
const distance=(a,b)=>Math.hypot(a[0]-b[0],a[2]-b[2]);
function ribbon(kit,kind,points,width,tint){
 const sides=points.map((p,i)=>{const a=points[Math.max(0,i-1)],b=points[Math.min(points.length-1,i+1)],length=distance(a,b)||1,dx=-(b[2]-a[2])/length*width/2,dz=(b[0]-a[0])/length*width/2;return [[p[0]+dx,p[1],p[2]+dz],[p[0]-dx,p[1],p[2]-dz]];});
 for(let i=1;i<sides.length;i++)kit.quad(kind,[sides[i-1][0],sides[i][0],sides[i][1],sides[i-1][1]],tint);
}
function railing(kit,points,width,tint='#76684e',stone=false){
 for(let i=1;i<points.length;i++){
  const a=points[i-1],b=points[i],length=distance(a,b);if(length<.01)continue;const dx=-(b[2]-a[2])/length*width/2,dz=(b[0]-a[0])/length*width/2;
  for(const side of [-1,1]){
   const p=[a[0]+dx*side,a[1],a[2]+dz*side],q=[b[0]+dx*side,b[1],b[2]+dz*side];
   if(stone){kit.rod('stone',[...p.slice(0,1),p[1]+6,p[2]],[q[0],q[1]+6,q[2]],2.5,tint,4);}
   else for(const h of [4,9])kit.rod('wood',[p[0],p[1]+h,p[2]],[q[0],q[1]+h,q[2]],.8,tint,5);
   if(i%2===1)kit.rod(stone?'stone':'wood',p,[p[0],p[1]+(stone?8:11),p[2]],stone?2:1.35,tint,4);
  }
 }
}
export function routes(tile,kit){
 const d=designFor(tile),footprint=designFootprint(tile),bridges=[];
 for(const line of footprint.routes){
  const points=line.map(p=>local(tile,p)),wet=line.map(p=>rawHeight(tile,p[0],p[2])<5),height=p=>{const w=rotate([p[0],p[2]],tile.rotation);return designHeight(tile,...w);};
  const bridgeSegments=new Set();
  for(let i=1;i<wet.length-1;i++)if(wet[i]&&!wet[i-1]){
   const start=i-1;while(i<wet.length-1&&wet[i])i++;const end=i,part=points.slice(start,end+1),span=part.reduce((n,p,k)=>n+(k?distance(p,part[k-1]):0),0);
   if(span<10)continue;
   for(let j=start+1;j<=end;j++)bridgeSegments.add(j);
   const red=d.kind==='sakura',stone=d.kind==='canal',deck=part.map((p,j)=>[p[0],Math.max(24,p[1])+1.1+Math.sin(j/(part.length-1)*Math.PI)*(red?15:stone?12:4),p[2]]);
   ribbon(kit,stone?'paving':'wood',deck,stone?30:22,stone?'#c5c0aa':red?'#b98568':'#a28c66');
   railing(kit,deck,stone?30:22,stone?'#b7b2a0':red?'#923d32':'#7b6a50',stone);
   // Continuous side beams; no overlapping miniature bridge boxes per segment.
   for(let j=1;j<deck.length;j++){
    const a=deck[j-1],b=deck[j],len=distance(a,b)||1,nx=-(b[2]-a[2])/len*(stone?15:11),nz=(b[0]-a[0])/len*(stone?15:11);
    for(const s of [-1,1])kit.quad(stone?'stone':'wood',[[a[0]+nx*s,a[1]-.1,a[2]+nz*s],[a[0]+nx*s,a[1]-4,a[2]+nz*s],[b[0]+nx*s,b[1]-4,b[2]+nz*s],[b[0]+nx*s,b[1]-.1,b[2]+nz*s]],stone?'#a6a28f':'#77634a');
    const count=Math.ceil(len/4);for(let k=0;k<count;k++){const t=k/count,x=a[0]+(b[0]-a[0])*t,z=a[2]+(b[2]-a[2])*t,y=a[1]+(b[1]-a[1])*t+.22;kit.box(stone?'stone':'wood',x,y,z,stone?30:22,.36,.65,stone?'#b4af9a':'#857156',Math.atan2(b[2]-a[2],b[0]-a[0])+Math.PI/2);}
   }
   if(!stone)for(const p of [deck[1],deck[deck.length-2]]){
    const a=deck[0],b=deck.at(-1),len=distance(a,b)||1,dx=-(b[2]-a[2])/len*9,dz=(b[0]-a[0])/len*9;
    for(const s of [-1,1])kit.rod('wood',[p[0]+dx*s,-27,p[2]+dz*s],[p[0]+dx*s,p[1]-2,p[2]+dz*s],2.1,'#786f56',6);
   }
   bridges.push({points:line.slice(start,end+1),width:stone?30:22,clearance:20});
  }
  for(let i=1;i<points.length;i++)if(!bridgeSegments.has(i)){
   const a=points[i-1],b=points[i];if(d.floating){ribbon(kit,'metal',[[a[0],a[1]+.5,a[2]],[b[0],b[1]+.5,b[2]]],24,'#454e52');continue;}
   // All ground paths are part of the terrain material. Only genuine spans
   // above the water need separate deck geometry.
  }
 }
 return bridges;
}
function bollard(kit,x,y,z){kit.rod('metal',[x,y,z],[x,y+6,z],2,'#444b48',7);kit.box('metal',x,y+6,z,6,2,3,'#3e4645');}
function bench(kit,x,y,z,angle=0){kit.box('wood',x,y+4,z,16,2,6,'#978365',angle);kit.box('wood',x,y+9,z+3,16,6,1,'#978365',angle);for(const dx of [-5,5])kit.box('metal',x+dx,y+1.5,z,1.4,4,5,'#62695e');}
function planter(kit,x,y,z,rand,kind='oak'){kit.box('stone',x,y+2,z,24,4,24,'#b4b9a6');kit.box('paving',x,y+4.1,z,20,1,20,'#796e55');tree(kit,x,y+4,z,38+rand()*12,kind,rand);}
function boat(kit,x,y,z){kit.asset('lobster-boat','boat',[x,y,z],4.8,0);}
export function infrastructure(tile,kit){
 const d=designFor(tile),rand=random(tile.art.seed*131),world=(x,z)=>rotate([x,z],tile.rotation),height=(x,z)=>designHeight(tile,...world(x,z));
 if(['canal','docks','boulevard'].includes(d.kind)){
  const perimeter=Array.from({length:6},(_,i)=>{const a=Math.PI/6+i*Math.PI/3;return [Math.cos(a)*300,Math.sin(a)*300];});
  for(let edge=0;edge<6;edge++){const a=perimeter[edge],b=perimeter[(edge+1)%6];for(let i=0;i<48;i++){
   const t=i/48,u=(i+1)/48,p=[a[0]+(b[0]-a[0])*t,a[1]+(b[1]-a[1])*t],q=[a[0]+(b[0]-a[0])*u,a[1]+(b[1]-a[1])*u],yp=height(...p),yq=height(...q);
   if(yp<2&&yq<2)continue;
   kit.quad('stone',[[p[0],yp,p[1]],[q[0],yq,q[1]],[q[0],-28,q[1]],[p[0],-28,p[1]]],d.kind==='docks'?'#737e7b':'#b1ae99');
  }}
 }
 if(d.kind==='canal'){
  for(const s of [-1,1]){
   kit.box('stone',0,-4,s*48,422,57,9,'#afa997');kit.box('paving',0,25.25,s*51,430,2,18,'#ccc7af');
   for(let x=-204;x<=204;x+=26){kit.box('stone',x,13,s*43.2,25,12,.8,'#a7a492');kit.box('stone',x+8,-2,s*43.3,25,12,.8,'#9fa08d');}
   for(const x of [-190,-83,36,198]){if(hexInset(x,s*68)>20){lamp(kit,x,26,s*67);if(x!==36)planter(kit,x,26,s*89,rand);}}
   bench(kit,-108,26,s*73);
  }
 }
 if(['marina','docks'].includes(d.kind)){
  kit.box('stone',45,-4,0,10,58,266,d.kind==='docks'?'#7a807b':'#b0ab94');kit.box('paving',42,25.5,0,22,3,270,d.kind==='docks'?'#a3a797':'#c9c0a5');
  for(const z of [-128,128]){kit.box('stone',142,-4,z,197,58,9,'#93958a');kit.box('paving',140,25.5,z,202,3,16,'#b9b9a3');}
  for(let z=-112;z<=112;z+=37){bollard(kit,48,27,z);if(d.kind==='docks'){const g=new T.TorusGeometry(5,1.8,6,12);kit.add(g,'metal',[51,9,z],[1,1,1],[0,Math.PI/2,0],'#343a38');g.dispose();}}
  for(const z of [-106,100])lamp(kit,27,27,z,true);
  if(d.kind==='marina'){
   const pier=(x,z,w,depth)=>{kit.box('wood',x,14,z,w,4,depth,'#a58e69');for(let a=x-w/2+3;a<x+w/2;a+=5)kit.box('wood',a,16.2,z,.55,.35,depth,'#776b51');for(const xx of [x-w/2+4,x+w/2-4])for(const zz of [z-depth/2+4,z+depth/2-4]){kit.rod('wood',[xx,-28,zz],[xx,23,zz],2,'#817659',6);bollard(kit,xx,21,zz);}};
   pier(111,-38,140,17);pier(110,16,15,113);pier(173,8,15,98);boat(kit,136,.8,27);
   for(let i=0;i<15;i++){const x=95+i*10,z=110+Math.sin(i*.7)*8;kit.asset('rock-'+i%6,'stone',[x,0,z],13+rand()*10,rand()*6.28);}
  }else {
   for(const [x,z,w,dpth,color]of [[-169,-142,69,24,'#975e44'],[-165,-109,65,24,'#527280'],[-179,-140,47,22,'#9a7153']]){
    const y=z===-140?48:35;kit.box('metal',x,y,z,w,20,dpth,color);for(let xx=x-w/2+3;xx<x+w/2;xx+=5)kit.box('metal',xx,y,z+dpth/2+.4,1,17,.8,'#62706b');}
   for(const [x,z]of [[-204,116],[-189,148],[-173,157],[-212,88]]){kit.box('wood',x,32,z,13,14,14,'#a68d68');kit.box('wood',x,40,z,12,2,15,'#9c815c');kit.box('metal',x,32,z,1,15,14.5,'#716f55');}
   boat(kit,133,1,19);
   for(let z=-100;z<95;z+=34)kit.box('paving',20,27,z,3,.3,17,'#d2b557');
   for(const x of [-11,-6])kit.box('metal',x,25.3,0,1,.5,243,'#776953');
   kit.box('stone',185,-3,115,31,61,29,'#838b80');kit.box('paving',185,28,115,34,2,32,'#aaa996');kit.box('metal',185,39,115,17,20,16,'#6e7770');kit.rod('metal',[185,47,115],[185,98,115],3,'#9b865a',6);kit.rod('metal',[185,98,115],[127,98,113],2.2,'#b59b58',5);kit.rod('metal',[133,97,114],[133,51,114],.7,'#636f6a',4);
  }
 }
 if(d.kind==='terraces'){
  const upper=[[-203,-157],[-152,-222],[-20,-215],[89,-151],[105,-40],[62,64],[-101,92],[-208,-23]];
  kit.polygon('paving',upper,49,24,'#d6ceb3','#b3ad98');
  railing(kit,upper.slice(0,6).map(([x,z])=>[x,49,z]),0,'#babda9',true);
  // The main plot is level; stairs land on the lower promenade, never the sea.
  for(const [a,b]of [[[-135,51],[-135,109]],[[-201,-86],[-246,-86]]]){
   const steps=11,angle=Math.atan2(b[1]-a[1],b[0]-a[0]),length=Math.hypot(b[0]-a[0],b[1]-a[1]);
   for(let i=0;i<steps;i++){const t=(i+.5)/steps,y=49-(i+1)/steps*25;kit.box('stone',a[0]+(b[0]-a[0])*t,(y+22)/2,a[1]+(b[1]-a[1])*t,length/steps+.1,y-22,28,'#d2cbb3',angle);}
   railing(kit,[[a[0],49,a[1]],[b[0],24,b[1]]],31,'#bbc0ac',true);
  }
  for(const [x,z]of [[-193,-149],[-135,-202],[63,-137],[-155,37],[40,66]]){planter(kit,x,50,z,rand,'cypress');}
  bench(kit,-125,50,65);lamp(kit,67,50,-71);
 }
 if(d.kind==='boulevard'){
  const road=(points)=>{const line=[];for(let i=1;i<points.length;i++)for(let j=0;j<=32;j++){const t=j/32,x=points[i-1][0]+(points[i][0]-points[i-1][0])*t,z=points[i-1][1]+(points[i][1]-points[i-1][1])*t;line.push([x,Math.max(24,height(x,z))+.8,z]);}ribbon(kit,'paving',line,58,'#ccc9b7');ribbon(kit,'asphalt',line.map(p=>[p[0],p[1]+.5,p[2]]),40,'#465053');};
  road([[-245,0],[245,0]]);road([[-24,-271],[-24,0]]);
  for(let x=-225;x<228;x+=30)if(Math.abs(x+24)>32)kit.box('paving',x,25.9,0,15,.35,1.2,'#e1dfc8');
  for(let z=-250;z<-50;z+=28)kit.box('paving',-24,25.9,z,1.2,.35,14,'#e1dfc8');
  for(let x=-41;x<0;x+=7)kit.box('paving',x,26,-38,3,.5,17,'#dfddcb');
  for(const x of [-196,-114,87,191])for(const s of [-1,1]){
   const z=s*48;if(hexInset(x,z)>24){planter(kit,x,26,z,rand);lamp(kit,x+15,26,z,true);}}
  for(const z of [-184,-97])for(const x of [-68,21]){kit.box('stone',x,27,z,20,3,24,'#b4b9aa');for(const dz of [-12,8])shrub(kit,x,29,z+dz,7,rand);}
  bench(kit,156,26,56);
 }
 if(d.floating)floating(tile,kit,rand);
}
function floating(tile,kit,rand){
 const d=designFor(tile),h=d.floor??84,metal='#41494b',rim='#323b40',hex=Array.from({length:6},(_,i)=>{const a=Math.PI/6+i*Math.PI/3;return [Math.cos(a)*284,Math.sin(a)*284];});
 const slab=(poly,y)=>{kit.polygon('metal',poly,y,y-13,metal,rim);kit.polygon('metal',poly.map(([x,z])=>[x*.97,z*.97]),y-13,y-20,'#25343d','#293840');
  for(let i=0;i<poly.length;i++){const a=poly[i],b=poly[(i+1)%poly.length],len=Math.hypot(b[0]-a[0],b[1]-a[1]),angle=Math.atan2(b[1]-a[1],b[0]-a[0]);
   for(let j=0;j<=Math.ceil(len/23);j++){const t=j/Math.ceil(len/23),x=a[0]+(b[0]-a[0])*t,z=a[1]+(b[1]-a[1])*t;kit.rod('metal',[x*.98,y,z*.98],[x*.98,y+8,z*.98],.65,'#8c989d',5);}
   kit.rod('metal',[a[0]*.98,y+8,a[1]*.98],[b[0]*.98,y+8,b[1]*.98],.75,'#859299',5);
   const mx=(a[0]+b[0])/2,mz=(a[1]+b[1])/2;kit.box('metal',mx,y-6,mz,len*.48,5,3,'#202e38',angle);kit.box('neon',mx*1.003,y-6,mz*1.003,len*.34,1.7,2,'#68d1f1',angle);
  }
 };
 if(d.kind==='sky'){
  slab([[-245,-147],[-136,-263],[48,-230],[108,-120],[16,20],[-170,43],[-246,-48]],108);
  slab([[-116,63],[36,10],[224,78],[231,159],[37,278],[-120,212]],74);
  const ramp=[[-43,108,22],[39,74,83]];ribbon(kit,'asphalt',ramp,57,'#586065');railing(kit,ramp,59,'#8e9996',true);
  for(let i=0;i<9;i++){const t=i/9,x=-43+82*t,z=22+61*t,y=108-34*t;kit.box('paving',x,y+.4,z,51,.6,1.4,'#b2b9aa',Math.atan2(61,82)+Math.PI/2);}
  for(const [x,y,z]of [[-183,108,-162],[-198,108,-43],[150,74,190],[32,74,240]])planter(kit,x,y,z,rand);
 }else {
  if(d.kind==='neon'){
   const outline=[[-242,-145],[0,-281],[207,-163],[221,12],[164,60],[209,124],[30,265],[-213,159],[-242,57]];slab(outline,h);
   slab([[164,52],[251,79],[227,160],[171,191],[141,131]],h-9);
   ribbon(kit,'asphalt',[[-193,h+.4,135],[-193,h+.4,-111],[-43,h+.4,-223],[147,h+.4,-166]],34,'#29343a');
   for(const [x,z]of [[-195,-120],[-195,-60],[-195,10],[-195,90],[20,-210],[90,-185]])kit.box('paving',x,h+.8,z,2,.5,13,'#cbbb7b');
   kit.box('metal',202,h+6,93,12,27,12,'#ac934e');kit.rod('metal',[202,h+18,93],[162,h+41,117],2,'#c0a35c',5);
   for(let i=0;i<6;i++)kit.box('paving',184+i*3.2,h-8.5,133-i*2,2,.5,12,'#ceb65e',.55);
  }else {
   slab(hex,h);
   const loop=Array.from({length:97},(_,i)=>{const a=i/96*Math.PI*2,c=Math.cos(a),s=Math.sin(a),x=Math.sign(c)*Math.abs(c)**.78*207,z=Math.sign(s)*Math.abs(s)**.78*226;return [x,h+.65,z];});
   ribbon(kit,'paving',loop,38,'#92998f');ribbon(kit,'asphalt',loop.map(p=>[p[0],p[1]+.35,p[2]]),33,'#29353b');
   for(let i=0;i<96;i+=3){const a=loop[i],b=loop[i+1];ribbon(kit,'paving',[[a[0],h+1.2,a[2]],[b[0],h+1.2,b[2]]],1.4,'#c8b57c');}
  }
 }
 const engines=d.kind==='sky'?[[-165,-154,108],[27,-135,108],[-59,169,74],[165,120,74]]:[[-176,-125,h],[163,-125,h],[-157,136,h],[128,174,h]];
 for(const [x,z,y]of engines){
  const g=new T.CylinderGeometry(23,18,21,12);kit.add(g,'metal',[x,y-26,z],[1,1,1],[0,0,0],'#293c48');g.dispose();
  for(let i=0;i<3;i++)kit.ring('engine',x,y-40-i*12,z,23-i*2.7,1.4,'#a8f3ff');
 }
 const pads=d.kind==='sky'?[[204,92,74]]:d.kind==='neon'?[[-233,0,h]]:[[-240,0,h],[240,0,h]];
 for(const [x,z,y]of pads){const g=new T.CylinderGeometry(25,27,4,16);kit.add(g,'metal',[x,y+1,z],[1,1,1],[0,0,0],'#415967');g.dispose();kit.ring('neon',x,y+3.5,z,18,.7,'#a9e7f4');kit.ring('neon',x,y+3.5,z,7,.5,'#bceef6');kit.box('neon',x,y+3.6,z,3,.3,3,'#e2fbff');}
 for(const [x,z,y]of engines){kit.box('metal',x*.98,y+.5,z*.98,12,1,8,'#667278');kit.box('paving',x*.98,y+1.1,z*.98,7,.2,4,'#c3caba');lamp(kit,x,y+1,z,true);kit.box('neon',x,y-8,z,22,1.8,2,'#baf5ff');}
}
