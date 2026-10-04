import{$r as e,A as t,Dr as n,E as r,Hn as i,Ja as a,Lt as o,Qi as s,Rn as c,U as l,V as u,ar as d,do as f,ea as p,fa as m,in as h,j as g,ja as _,jr as v,mr as y,no as b,ro as x,sn as S,sr as C,ta as w,wn as T}from"./three.core-DtjtRha-.js";import{n as E}from"./three.module-CA589J5f.js";import{a as D,i as O,n as k,s as A,t as j}from"./noise-RmOKhMMB.js";import{c as M,n as N}from"./index-BjH0GYGf.js";var P=2.7,F=.8,I=2.8;function L(e,t){let n=e.outer+.7;if(t>n)return-1/0;let r=e.y+I;if(e.roof===`thatchCone`)return Math.max(r,e.y+P+Math.max(0,n+.3-t)*F);if(e.roof===`thatchDome`){let i=Math.min(1,t/n);return Math.max(r,e.y+.5+(e.outer+.4)*1.05*Math.sqrt(Math.max(0,1-i*i)))}return e.roof===`linenShade`?e.y+3.7:e.type===`deck`?r:e.y+3.5}function R(e,t,n=null){let r=n||((e,n)=>t.groundHeight(e,n)),i=[];for(let t of e.HOUSES){if(!t.tree||!t.levels)continue;let n=e.HERO_TREES.find(e=>e.id===t.tree);if(!n)continue;let r=Math.max(...t.levels.map(e=>e.outer+.7)),a=-1/0;for(let e of t.levels)a=Math.max(a,L(e,0));let o=t.stairs?.find(e=>e.from===`ground`);i.push({tree:n.id,x:n.x,z:n.z,g:n.groundY,levels:t.levels,rMax:r,yMax:a,stairDeg:o?o.startDeg:null})}function a(e,t){let n=-1/0;for(let r of e.levels){let e=L(r,t);e>n&&(n=e)}return n}let o=e.BRIDGES.map(e=>{let t=e.a[0],n=e.a[2],r=e.b[0],i=e.b[2],a=r-t,o=i-n;return{B:e,ax:t,az:n,ay:e.a[1],by:e.b[1],dx:a,dz:o,len2:a*a+o*o,half:e.width/2+.9,sag:e.sag,minX:Math.min(t,r)-4,maxX:Math.max(t,r)+4,minZ:Math.min(n,i)-4,maxZ:Math.max(n,i)+4,yTop:Math.max(e.a[1],e.b[1])+3.5}}),s=e.BOARDWALKS.map(e=>{let t=1e9,n=-1e9,r=1e9,i=-1e9;for(let[a,o]of e.path)t=Math.min(t,a),n=Math.max(n,a),r=Math.min(r,o),i=Math.max(i,o);let a=e.width/2+1+(e.platformEnd?e.platformEnd.r:0);return{W:e,minX:t-a,maxX:n+a,minZ:r-a,maxZ:i+a,half:e.width/2+.8,plat:e.platformEnd}}),c=e.TRAILS.map(e=>{let t=1e9,n=-1e9,r=1e9,i=-1e9;for(let[a,o]of e.path)t=Math.min(t,a),n=Math.max(n,a),r=Math.min(r,o),i=Math.max(i,o);return{T:e,minX:t-4,maxX:n+4,minZ:r-4,maxZ:i+4,half:e.width/2+.6}}),l=e.HOUSES.find(e=>e.kind===`overwater`),u=f(i,o,s,c,l);function d(e,t,n){let r=(r,i,a,o)=>e+n>=r&&e-n<=i&&t+n>=a&&t-n<=o;return f(i.filter(e=>r(e.x-e.rMax,e.x+e.rMax,e.z-e.rMax,e.z+e.rMax)),o.filter(e=>r(e.minX,e.maxX,e.minZ,e.maxZ)),s.filter(e=>r(e.minX,e.maxX,e.minZ,e.maxZ)),c.filter(e=>r(e.minX,e.maxX,e.minZ,e.maxZ)),l&&r(l.x-l.deckR-1,l.x+l.deckR+1,l.z-l.deckR-1,l.z+l.deckR+1)?l:null)}function f(e,t,n,i,o){return function(s,c,l,u=0){for(let t=0;t<e.length;t++){let n=e[t];if(c>n.yMax+u)continue;let r=s-n.x,i=l-n.z,o=Math.sqrt(r*r+i*i);if(!(o>n.rMax+u)&&c<a(n,Math.max(0,o-u))+u)return!0}for(let e=0;e<t.length;e++){let n=t[e];if(s<n.minX||s>n.maxX||l<n.minZ||l>n.maxZ||c>n.yTop+u)continue;let r=((s-n.ax)*n.dx+(l-n.az)*n.dz)/n.len2;r=r<0?0:r>1?1:r;let i=n.ax+n.dx*r-s,a=n.az+n.dz*r-l;if(Math.sqrt(i*i+a*a)>n.half+u)continue;let o=n.ay+(n.by-n.ay)*r-n.sag*4*r*(1-r);if(c>o-.9-u&&c<o+2.6+u)return!0}if(c<8+u){for(let e=0;e<n.length;e++){let t=n[e];if(s<t.minX||s>t.maxX||l<t.minZ||l>t.maxZ||c<t.W.y-1.5-u||c>t.W.y+3+u)continue;let r=M(s,l,t.W.path);if(t.plat){let e=t.W.path[t.W.path.length-1];r=Math.min(r,Math.hypot(s-e[0],l-e[1])-t.plat.r+t.half)}if(r<t.half+u)return!0}for(let e=0;e<i.length;e++){let t=i[e];if(!(s<t.minX||s>t.maxX||l<t.minZ||l>t.maxZ)&&!(M(s,l,t.T.path)>t.half+u)&&c<r(s,l)+3+u)return!0}}if(o){let e=s-o.x,t=l-o.z;if(e*e+t*t<(o.deckR+1+u)**2&&c<o.deckY+8+u)return!0}return!1}}let p=re(e),m=new Map;for(let e of p)m.has(e.tree)||m.set(e.tree,[]),m.get(e.tree).push(e);function h(e,t,n=0){for(let r=0;r<p.length;r++){let i=p[r],a=e-i.x,o=t-i.z,s=Math.sqrt(a*a+o*o);if(s>i.rout+n||s<i.rin-n)continue;let c=U(a,o),l=Math.min(n,s)/Math.max(s,.5)*z;if(ne(i.d0-l,i.d1+l,c))return!0}return!1}function g(e,n,r=0){return t.distToPaths(e,n)<.35+r||h(e,n,r)}function _(e){return(m.get(e)||[]).filter(e=>e.rin<=.01).map(e=>({d0:e.d0,d1:e.d1,rout:e.rout,kind:e.kind}))}function v(e,t,n,r=0){for(let i=0;i<p.length;i++){let a=p[i];if(a.kind!==`stair`)continue;let o=e-a.x,s=n-a.z;if(Math.sqrt(o*o+s*s)>a.walkR+a.width*.6+.3+r)continue;let c=(U(o,s)-a.startDeg)*a.dir%360;if(c<0&&(c+=360),c>a.fullSpan+8)continue;let l=a.y0+Math.max(0,c)*a.risePerDeg;if(t>l-.45-r&&t<l+2.2+r)return!0}return!1}function y(e){return i.find(t=>t.tree===e)||null}let b={blocked:u,rootBlocked:g,inZone:h,trunkArcsFor:_,stairHit:v,envelopeFor:y,envTop:a,envs:i,zones:p};return b.forArea=(e,t,n)=>({...b,blocked:d(e,t,n)}),b}var z=180/Math.PI,B=.19,V=.3,ee=2.6,te=1.5,H={origin:{padH:.9,walk:`originWalk`,end:`last`,padR:7.3,pad:(e,t)=>[Math.min(e,e+4*(t-e)),Math.max(e,e+4*(t-e))]},canopy:{padH:.8,walk:`canopyWalk`,end:`first`,padR:7.5,pad:e=>[e-24,e],ramp:!0}};function U(e,t){let n=Math.atan2(e,-t)*z;return n<0?n+360:n}function ne(e,t,n){if(t-e>=360)return!0;let r=(n-e)%360;return r<0&&(r+=360),r<=t-e}function re(e){let t=[];for(let n of e.HOUSES){if(!n.tree||!n.stairs)continue;let r=e.HERO_TREES.find(e=>e.id===n.tree),i=n.stairs.find(e=>e.from===`ground`);if(!r||!i)continue;let a=r.groundY??0,o=i.dir??1,s=n.levels.find(e=>e.id===i.to)||n.levels[0],c=H[n.id],l=c?c.padH:0,u=e.trunkRadiusAt(r,a+l+.3),d=1.15,f=u+.08+.03*u+d*.55,p=B/(V/f*z),m=Math.max(c?45:90,(ee-l)/p),h=(s.y-a-l)/p,g=Math.max(...n.levels.map(e=>e.outer+.7)),_=o>0?i.startDeg-7:i.startDeg-m,v=o>0?i.startDeg+m:i.startDeg+7,y={tree:r.id,x:r.x,z:r.z};if(t.push({...y,kind:`stair`,d0:_,d1:v,rin:0,rout:e.trunkRadiusAt(r,a+l)+te,startDeg:i.startDeg,dir:o,walkR:f,width:d,y0:a+l,risePerDeg:p,fullSpan:h}),!c){t.push({...y,kind:`foot`,d0:i.startDeg-15,d1:i.startDeg+15,rin:0,rout:g+1.5});continue}let b=e.BOARDWALKS.find(e=>e.id===c.walk);if(!b)continue;let x=c.end===`last`?b.path[b.path.length-1]:b.path[0],S=U(x[0]-r.x,x[1]-r.z),C=Math.hypot(x[0]-r.x,x[1]-r.z),[w,T]=c.pad(i.startDeg,S);if(t.push({...y,kind:`pad`,d0:w-5,d1:T+5,rin:0,rout:c.padR+.5}),c.ramp){let e=Math.min(i.startDeg,S)-3,n=Math.max(i.startDeg,S)+6;t.push({...y,kind:`ramp`,d0:e,d1:n,rin:5.2,rout:C+1})}else t.push({...y,kind:`entry`,d0:S-9,d1:S+9,rin:c.padR-.6,rout:C+1.3})}return t}var ie=Math.PI*2;function ae(e,t){let n=(e-t)%ie;return n>Math.PI&&(n-=ie),n<-Math.PI&&(n+=ie),n}function oe(e,t,n,r=[]){let i=new j(e.seed*131+7),a=e.forkH,o=e.radiusAt(a*.5),s=Math.max(1.2,o*1.55),c=(e.seed%2?1:-1)*(.045+e.seed%5*.006),l=e.hero?.04:.07,u=e.hero?.024:.05,d=5+e.seed%4,f=a+e.r1*(e.hero?1.7:.35),p=e.r1*(e.hero?.9:.3),m=e.r1*(e.hero?.35:.12),h=r.map(e=>{let t=[],n=e.pts;for(let r=n[0].y;r<=f+.2;r+=.1){let i=null;for(let t=1;t<n.length;t++){let a=n[t-1],o=n[t];if(a.y<=r&&o.y>=r||a.y>=r&&o.y<=r){let n=Math.abs(o.y-a.y)>1e-6?(r-a.y)/(o.y-a.y):0;i={x:a.x+(o.x-a.x)*n,z:a.z+(o.z-a.z)*n,r:e.rad[t-1]+(e.rad[t]-e.rad[t-1])*n};break}}t.push(i)}return{y0:n[0].y,rows:t}});function g(e,t){let n=Math.cos(e),r=Math.sin(e),i=0;for(let e of h){let a=Math.round((t-e.y0)/.1);if(a<0||a>=e.rows.length)continue;let o=e.rows[a];if(!o)continue;let s=o.x*n+o.z*r,c=o.x*o.x+o.z*o.z-s*s,l=o.r*o.r-c;if(l<=0)continue;let u=s+Math.sqrt(l);u>i&&(i=u)}return i}let _=t.map(t=>.16+.55*t.r/Math.max(.5,e.r0*1.9)),v=new Float32Array(721);if(e.trunkArcs&&e.trunkArcs.length)for(let t=0;t<=720;t++){let n=t/720*360,r=0;for(let t of e.trunkArcs){let e=(n-t.d0)%360;e<0&&(e+=360);let i=t.d1-t.d0,a=e<=i?0:Math.min(e-i,360-e);r=Math.max(r,1-A(0,12,a))}v[t]=r}function y(e){let t=180/Math.PI*e+90;return t=(t%360+360)%360,v[Math.round(t/360*720)]}function b(e){let t=1-A(-.9,2.1,e);return t*Math.sqrt(t)}function x(t){return t>=0?e.radiusAt(t):e.radiusAt(0)+-t*.55}function S(n,r){let o=x(r),h=n+c*r,v=Math.cos(h)*s,S=Math.sin(h)*s,C=i.noise3(v,S,r*.2),w=1-2*Math.abs(C);w=w*.85+.15*i.noise3(v*.5+9,S*.5,r*.08);let T=i.noise3(v*3.1+3,S*3.1,r*.9),E=Math.sin(d*h+1.7*i.noise2(r*.07,e.seed)+e.seed),D=o*(1+l*Math.max(-1,Math.min(1,w))+u*E+.01*T),O=b(r)*(1-y(n));if(O>1e-4){let i=0;for(let e=0;e<t.length;e++){let r=ae(n,t[e].az)/_[e];i+=Math.exp(-r*r)*t[e].r}let a=o-e.radiusAt(Math.max(r,2.1))*.98,s=Math.max(0,a)*.62+o*.05;D+=O*(i*1.35-s*Math.max(0,1-i/Math.max(.3,e.r0*.28)))}if(r>a){let e=A(a,a+p,r),t=g(n,r),i=D*(1-.7*A(a,f,r)),o=t>0?Math.max(i,t*.97):i*(1-.35*e);D+=(o-D)*e,r>f-m&&(D*=1-.12*A(f-m,f,r))}return Math.max(.05,D)}function C(e,t=48){let n=0;for(let r=0;r<t;r++)n+=S(r/t*ie,e);return n/t}function w(e,t=48){let n=1e9;for(let r=0;r<t;r++)n=Math.min(n,S(r/t*ie,e));return n}return{R:S,meanR:x,sampledMeanR:C,sampledMinR:w,yBottom:-1.3,yTop:f,twist:c,buttressE:b,clearW:y}}var W=x,se=new W(0,1,0),G=Math.PI*2,K=class{constructor(e,t,n=null){this.kind=e,this.level=t,this.parent=n,this.pts=[],this.rad=[],this.len=0,this.children=[],this.flat=null,this.collar=0,this.hang=null,this.tint=0}push(e,t){let n=this.pts.length;n&&(this.len+=e.distanceTo(this.pts[n-1])),this.pts.push(e.clone()),this.rad.push(t)}sample(e,t,n){let r=this.pts,i=0;for(let a=1;a<r.length;a++){let o=r[a].distanceTo(r[a-1]);if(i+o>=e||a===r.length-1){let s=o>1e-6?k((e-i)/o,0,1):0;return t.lerpVectors(r[a-1],r[a],s),n&&n.subVectors(r[a],r[a-1]).normalize(),this.rad[a-1]+(this.rad[a]-this.rad[a-1])*s}i+=o}return t.copy(r[0]),n&&n.set(0,1,0),this.rad[0]}},ce=[{lat:[2,4],latSpan:[.42,.92],latAng:[34,55],latR:[.42,.6],latLen:[.45,.62],fork:[2,3],forkAng:[20,34],forkR:[.66,.8],forkLen:[.5,.68],rEnd:.58},{lat:[2,4],latSpan:[.3,.9],latAng:[34,58],latR:[.42,.62],latLen:[.42,.6],fork:[2,3],forkAng:[22,38],forkR:[.66,.8],forkLen:[.55,.72],rEnd:.56},{lat:[2,3],latSpan:[.25,.92],latAng:[36,60],latR:[.45,.62],latLen:[.45,.62],fork:[2,2],forkAng:[24,40],forkR:[.66,.8],forkLen:[.58,.75],rEnd:.5},{lat:[2,3],latSpan:[.2,.95],latAng:[38,62],latR:[.5,.7],latLen:[.5,.7],fork:[1,2],forkAng:[26,44],forkR:[.7,.85],forkLen:[.6,.8],rEnd:.42},{rEnd:.3}],q=new W,le=new W,ue=new W,de=new W,fe=new W,J=new W,pe=new W;function Y(e,t){return O(t[0],t[1],e())}function me(e,t,n){let r=Math.cos(n),i=Math.sin(n),a=e.dot(t);return J.crossVectors(t,e),e.multiplyScalar(r).addScaledVector(J,i).addScaledVector(t,a*(1-r)),e}function he(e,t){return Math.abs(e.y)<.9?t.crossVectors(e,se):t.set(1,0,0).cross(e),t.normalize()}function ge(e,t){let n=D(e.seed*7919+13),r=new j(e.seed*31+5),{cons:i}=t,a=e.x,o=e.g,s=e.z,c=e.crownR,l=e.topH,u=e.forkH,d=e.hero?i.envelopeFor(e.id):null,f=e.crownCenter,p=[];for(let e=0;e<7;e++)p.push({az:n()*G,a:(n()-.35)*.3,w:.5+n()*.6});let m=new Float32Array(257);for(let e=0;e<=256;e++){let t=e/256*G-Math.PI,n=1;for(let e of p){let r=t-e.az;r=Math.atan2(Math.sin(r),Math.cos(r)),n+=e.a*Math.exp(-(r*r)/(e.w*e.w))}m[e]=c*k(n,.72,1.25)}function h(e){let t=(e+Math.PI)/G*256,n=Math.max(0,Math.min(255,Math.floor(t))),r=t-n;return m[n]+(m[n+1]-m[n])*r}let g=(l-u)*(e.hero?.7:.62);function _(e,t){let n=e/h(t);return l-g*n*n}function v(e){let t=e.x-f[0],n=e.z-f[1],r=Math.hypot(t,n),i=Math.atan2(n,t);return Math.min(_(r,i)-e.y,h(i)-r)}let y=t=>t<=u?e.radiusAt(t):e.r1*1.3;function b(e,t,n=.25){let r=e.x+a,c=e.y+o,l=e.z+s;return d&&Math.hypot(e.x,e.z)+t<=y(e.y)+.05&&e.y<d.yMax+3?!1:i.blocked(r,c,l,t+n)}function x(e,n){return t.surf(e+a,n+s)-o}let S=[],C=[];function w(e,t,i,a,o,s,c,l={}){let u=q.copy(t),d=ue.copy(i).normalize();e.push(u,o);let f=0,p=0,m=l.turn??.22,h=n()*100;for(;f<a-.001&&p++<400;){let t=o+(s-o)*(f/a)**.9,n=k(t*1.6,l.minStep??.22,l.maxStep??.85);if(f+n>a&&(n=a-f),n<.05)break;c(u,d,f,a,de);let i=l.meander??.16;de.x+=r.noise2(h,f*.22)*i,de.y+=r.noise2(h+31,f*.22)*i*.6,de.z+=r.noise2(h+57,f*.22)*i,de.normalize(),pe.copy(d).lerp(de,m).normalize();let p=!1;if(l.constrain!==!1){for(let e=0;e<5;e++)if(fe.copy(pe),e>0&&fe.lerp(se,e===4?1:e*.28).normalize(),le.copy(u).addScaledVector(fe,n),!b(le,t,l.pad??.25)){pe.copy(fe),p=!0;break}if(!p)break}if(d.copy(pe),u.addScaledVector(d,n),f+=n,e.push(u,o+(s-o)*Math.min(1,f/a)**.9),l.stopOutside&&v(u)<-.4||l.stopBelow!==void 0&&u.y<l.stopBelow)break}return e}let T=e.nLimbs,E=[],M=n()*G,N=0;for(let e=0;e<T;e++){let t=.75+n()*.5;N+=t,E.push({az:M+e/T*G+(n()-.5)*(G/T)*.45,w:t})}for(let t of E)t.r=e.r1*Math.sqrt(t.w/N)*1.12;let P=e.axisAt(u,new W),F=d?d.yMax-o+.3:-1/0;for(let t=0;t<T;t++){let r=E[t],i=new K(`limb`,0,null),a=new W(Math.cos(r.az),0,Math.sin(r.az)),o=P.clone().addScaledVector(a,e.r1*.32);o.y=u-e.r1*.25+(n()-.5)*.3*e.r1;let s=(e.hero?10:26)*(Math.PI/180)+n()*.12,d=(e.hero?84+n()*14:60+n()*16)*(Math.PI/180),f=(e.hero?58:50)*(Math.PI/180)+n()*.2,p=new W().copy(a).multiplyScalar(Math.sin(s)).setY(Math.cos(s)),m=c*(.55+n()*.17),h=e.hero?Math.max(F,u+2):u+(l-u)*(.45+n()*.15);w(i,o,p,(e.hero?Math.max(0,F-u):0)+Math.hypot(m,e.hero?2:h-u)*1.08,r.r,r.r*ce[0].rEnd,(t,n,r,i,o)=>{let c=r/i,l;l=r<e.r1*.8?s:O(d,f,A(.62,1,c)),o.copy(a).multiplyScalar(Math.sin(l)).setY(Math.cos(l)),v(t)<.5&&(o.y-=.6)},{turn:e.hero?.3:.22,meander:.12,minStep:.3,maxStep:.75,pad:.3}),i.az=r.az,S.push(i)}if(!e.hero){let t=1+ +(n()<.6);for(let r=0;r<t;r++){let t=E[r].az+Math.PI*(.8+n()*.4),i=u*(.45+n()*.25),a=e.axisAt(i,new W),o=new W(Math.cos(t),0,Math.sin(t)),s=e.radiusAt(i)*(.42+n()*.12),l=new K(`limb`,0,null);l.collar=e.radiusAt(i),w(l,a.clone().addScaledVector(o,e.radiusAt(i)*.3),o.clone().multiplyScalar(.85).setY(.5),c*(.75+n()*.25),s,s*.5,(e,t,n,r,i)=>{i.copy(o).multiplyScalar(.95).setY(.12+A(.55,1,n/r)*.6),v(e)<.5&&(i.y-=.4)},{turn:.18,meander:.14,minStep:.3,maxStep:.8,pad:.3}),l.az=t,S.push(l),E.push({az:t,r:s,low:!0})}}let I=e.maxLevel,L=e.twigLen,R=.012;function z(e,t,n,r,i,a){he(e,fe),me(fe,e,n),a.copy(e),me(a,fe,r),J.set(t.x-f[0],0,t.z-f[1]);let o=J.length();return o>.001&&J.multiplyScalar(1/o),a.addScaledVector(J,.35+i*.05),a.y+=.18+i*.06,a.normalize()}function B(e,t,n){le.copy(e);let r=0,i=.5;for(;r<n;)if(le.addScaledVector(t,i),r+=i,v(le)<0)return r;return n}let V=[...S],ee=0,te=0;for(;te<V.length;){let t=V[te++];if(t.level>=I||t.pts.length<2)continue;let r=ce[Math.min(t.level,3)],i=t.level+1,a=i>=I,o=n()*G,s=k(t.len/(c*.35),.6,1.5),l=Math.round(Y(n,r.lat)*s+ +!!a);for(let e=0;e<l;e++){let s=O(r.latSpan[0],r.latSpan[1],(e+.3+n()*.5)/l),u=t.len*s,p=t.sample(u,q,ue),m=q.clone(),h=ue.clone();o+=2.39996+(n()-.5)*.6;let g=Math.max(R,p*Y(n,r.latR));if(g<R*1.05&&!a)continue;let _=z(h,m,o,Y(n,r.latAng)*Math.PI/180,i,new W);if(_.y<-.45||d&&b(m,g+.4,.3))continue;let y=a?L*(.7+n()*.6):(t.len-u)*Y(n,r.latLen)+c*.06;if(a||(y=Math.min(y,B(m,_,y*1.3)+.6)),y<.4)continue;let x=new K(a?`twig`:`branch`,i,t);x.collar=p,x.attachS=u,w(x,m,_,y,g,Math.max(R*.7,g*(a?ce[4].rEnd:ce[Math.min(i,3)].rEnd)),(e,t,n,r,o)=>{o.copy(t),o.y+=.06+i*.02-(a?0:.03*A(.2,.8,n/r)),v(e)<.6&&(J.set(e.x-f[0],0,e.z-f[1]).normalize(),o.addScaledVector(J,-.3),o.y-=.35)},{turn:a?.1:.2,meander:a?.25:.18,minStep:a?.35:.25,maxStep:a?.7:.8,pad:.25,constrain:!a}),!(x.pts.length<2)&&(t.children.push(x),S.push(x),a?C.push(x):V.push(x),ee++)}if(e.hero&&t.level===0&&!t.collar){let e=-1,r=0;for(let n=1;n<t.pts.length;n++)if(r+=t.pts[n].distanceTo(t.pts[n-1]),Math.hypot(t.pts[n].x,t.pts[n].z)>y(t.pts[n].y)+.6){e=r;break}if(e>0){let r=1+ +(n()<.65);for(let i=0;i<r;i++){let r=e+(t.len-e)*(.08+.4*n()),i=t.sample(r,q,ue),a=q.clone(),o=(n()-.5)*1.3,s=new W(a.x,0,a.z).normalize(),l=Math.cos(o),u=Math.sin(o);s.set(s.x*l-s.z*u,0,s.x*u+s.z*l);let d=s.clone().multiplyScalar(.85).setY(-.35).normalize(),f=i*(.5+n()*.12),p=c*(.5+n()*.2),m=new K(`branch`,1,t);m.collar=i,m.attachS=r,w(m,a,d,p,f,f*.5,(e,t,n,r,i)=>{let a=n/r;i.copy(s).multiplyScalar(.9).setY(O(-.55,.45,A(.35,.95,a)))},{turn:.18,meander:.14,minStep:.3,maxStep:.75,pad:.3}),!(m.pts.length<3)&&(t.children.push(m),S.push(m),V.push(m))}}}let u=Math.round(Y(n,r.fork)),p=t.pts[t.pts.length-1],m=new W().subVectors(p,t.pts[Math.max(0,t.pts.length-3)]).normalize(),h=t.rad[t.rad.length-1],g=n()*G;for(let e=0;e<u;e++){let o=Math.max(R,h*Y(n,r.forkR)*(e===0?1.08:.95)),s=Y(n,r.forkAng)*Math.PI/180*(e===0?.6:1),l=z(m,p,g+e/u*G,s,i,new W);if(l.y<-.5)continue;let d=a?L*(.8+n()*.6):t.len*Y(n,r.forkLen)+c*.05;if(a||(d=Math.min(d,B(p,l,d*1.3)+.8)),d<.4)continue;let _=new K(a?`twig`:`branch`,i,t);_.collar=h*.9,_.attachS=t.len,w(_,p,l,d,o,Math.max(R*.7,o*(a?ce[4].rEnd:ce[Math.min(i,3)].rEnd)),(e,t,n,r,a)=>{a.copy(t),a.y+=.05+i*.025,v(e)<.6&&(J.set(e.x-f[0],0,e.z-f[1]).normalize(),a.addScaledVector(J,-.35),a.y-=.35)},{turn:a?.1:.2,meander:a?.25:.16,minStep:a?.35:.25,maxStep:a?.7:.8,pad:.25,constrain:!a}),!(_.pts.length<2)&&(t.children.push(_),S.push(_),a?C.push(_):V.push(_),ee++)}!t.children.length&&t.level>=I-2&&C.push(t)}let H=[],U=e.clumpR,ne=e.crownBaseH,re=[];for(let t of S){if(t.level<2)continue;let r=U*(t.kind===`twig`?1.1:1.25),i=t.kind===`twig`?t.len*.35:Math.max(r*.6,t.len*.25);for(let a=i;a<=t.len+.001;a+=r)t.sample(Math.min(a,t.len),q,ue),!(v(q)>e.shellDepth)&&re.push({p:q.clone(),h:n(),tip:t.kind===`twig`});(t.kind===`twig`||!t.children.length)&&(t.sample(t.len,q,ue),re.push({p:q.clone(),h:n()*.6,tip:!0}))}let ie=Math.round(e.clumpBudget);re.length>ie&&(re.sort((e,t)=>e.h-t.h),re.length=ie);{let t=new Map,r=(e,t,n)=>((Math.floor(e/2)+512)*1024+(Math.floor(t/2)+512))*1024+(Math.floor(n/2)+512);for(let e of S)if(!(e.level<1))for(let n=0;n<=e.len;n+=.8){e.sample(n,q);let i=r(q.x,q.y,q.z),a=t.get(i);a||t.set(i,a=[]),a.push(q.x,q.y,q.z)}let i=(e,n)=>{let r=n*n,i=Math.floor(e.x/2),a=Math.floor(e.y/2),o=Math.floor(e.z/2);for(let n=-1;n<=1;n++)for(let s=-1;s<=1;s++)for(let c=-1;c<=1;c++){let l=t.get(((i+n+512)*1024+(a+s+512))*1024+(o+c+512));if(l)for(let t=0;t<l.length;t+=3){let n=l[t]-e.x,i=l[t+1]-e.y,a=l[t+2]-e.z;if(n*n+i*i+a*a<r)return!0}}return!1},a=Math.round(ie*e.fillFrac),o=new W,s=0;for(let t=0;t<a*4&&s<a;t++){let t=n()*G,r=h(t)*Math.sqrt(n())*.97,a=_(r,t)-n()**1.6*e.shellDepth;a<ne||(o.set(f[0]+Math.cos(t)*r,a,f[1]+Math.sin(t)*r),i(o,e.fillAttach)&&(re.push({p:o.clone(),h:0,tip:!1,fill:!0}),s++))}}for(let e of re){let t=e.p;J.set(t.x-f[0],0,t.z-f[1]);let r=J.length();r>1e-4&&J.multiplyScalar(1/r),t.addScaledVector(J,U*.3).addScaledVector(se,U*.2);let c=_(r,Math.atan2(t.z-f[1],t.x-f[0]))+.3;t.y>c&&(t.y=c-n()*.8);let l=U*(.75+n()*.5);if(t.y<ne-1.5||t.y<x(t.x,t.z)+2.4||i.blocked(t.x+a,t.y+o,t.z+s,l*.7))continue;let u=v(t),d=1-.42*A(.2,4.5,u);d*=.74+.26*A(ne,ne+4,t.y),H.push({p:t,r:l,ao:d,seed:n()})}return{all:S,twigs:C,clumps:H,limbPlan:E,crownDepth:v,crownRAt:h,crownTop:_,woodBlocked:b,surfLocal:x,rng:n,N:r,houseEnv:d,cc:f}}function _e(e,t){let n=e.nRoots,r=[],i=t()*G;for(let a=0;a<n;a++){let o=a%2==0||t()<.3;r.push({az:i+a/n*G+(t()-.5)*(G/n)*.55,r:e.r0*(o?.34+t()*.1:.2+t()*.08),big:o})}return e.trunkArcs&&e.trunkArcs.length&&ve(r,e,i),r}function ve(e,t,n){let r=1440,i=t.radiusAt(.4),a=0;for(let t of e)a+=t.r/e.length;let o=e=>(e-90)*Math.PI/180,s=t.trunkArcs.map(e=>[o(e.d0),o(e.d1)]),c=e=>{let t=1/0;for(let[n,r]of s){let i=(e-n)%G;if(i<0&&(i+=G),i<=r-n)return 0;t=Math.min(t,i-(r-n),G-i)}return t},l=(.6*a+.25)/i,u=new Uint8Array(r),d=0;for(let e=0;e<r;e++)c(n+(e+.5)/r*G)>l&&(u[e]=1,d++);if(d<r*.15)return;let f=new Uint16Array(1441);for(let e=0;e<r;e++)f[e+1]=f[e]+u[e];for(let t of e){let e=(t.az-n)%G/G;e<0&&(e+=1);let a=e*d,o=0;for(;o<1439&&f[o+1]<a;)o++;t.az=n+(o+.5)/r*G;let s=(.85*t.r+.3)/i;for(let e=0;e<24&&c(t.az)<s;e++){let e=.02;t.az+=c(t.az+e)>c(t.az-e)?e:-.02}}}var ye=[.3,-.3,.6,-.6,.95,-.95];function be(e,t,n,r,i,a){let o=[],s=new j(e.seed*17+3),c=e.x,l=e.g,u=e.z,d=r.surf,f=new W;new W;let p=i.inZone,m=new W;function h(t,r,i,a,o){if(!p||(e.axisAt(Math.max(0,o),m),Math.hypot(t.x-m.x,t.z-m.z)<n.meanR(o)*.92))return r;let s=a*.9+.15,l=.8+a,d=e=>p(t.x+c+Math.cos(e)*l,t.z+u+Math.sin(e)*l,s)||p(t.x+c+Math.cos(e)*i,t.z+u+Math.sin(e)*i,s);if(!d(r))return r;for(let e of ye)if(!d(r+e))return r+e;return null}function g(t,n,r,o,p,m,g){let _=new K(`root`,m,g);_.flat=[];let v=e.axisAt(Math.max(0,o),new W),y=t;f.set(v.x+Math.cos(t)*p,o,v.z+Math.sin(t)*p),_.push(f,n),_.flat.push(m===0?1.5:1);let b=0,x=o,S=a()*50,C=a()*.3,w=!1,T=0,E=y;for(let e=0;e<220&&b<r;e++){let e=b/r,t=Math.max(.03,n*(1-e)**.75+.03*(1-e)),a=Math.max(.2,Math.min(.32,t*1.2+.12));y+=s.noise2(S,b*.12)*.16,w||(y=h(f,y,a,t,x)),y===null&&(w=!0,y=E),E=y;let p=f.x+Math.cos(y)*a,g=f.z+Math.sin(y)*a,v=p+c,D=g+u;i.rootBlocked(v,D,t*.8)&&(w=!0);let j=t*.75,M=d(v,D);M=Math.max(M,d(v+Math.cos(y+1.57)*j,D+Math.sin(y+1.57)*j)),M=Math.max(M,d(v-Math.cos(y+1.57)*j,D-Math.sin(y+1.57)*j)),M=Math.max(M,d(v+Math.cos(y)*j,D+Math.sin(y)*j)),M-=l;let N=O(m===0?1.35:1,.62,A(0,.35,e)),P=t*N,F=.25+C+.35*s.noise2(S+9,b*.18);w&&(T-=.35),F+=T-2.2*A(.68,1,e),M+l<.05&&(F-=.25);let I=M+P*F,L=1-A(0,2.8+n,b);I=O(I,Math.max(I,o-b*.55),L);let R=a*1.4,z=a*1.1;if(x=k(I,x-z,x+R),f.set(p,x,g),b+=a,_.push(f,t),_.flat.push(N),x<M-P*1.4)break}return _}for(let r of t){let t=.55+a()*.55+r.r*.35,i=n.meanR(t)*.5,s=e.rootLen*(r.big?.8+a()*.45:.45+a()*.35),c=g(r.az,r.r,s,t,i,0,null);o.push(c);let l=r.big?1+Math.floor(a()*2.2):+(a()<.4);for(let t=0;t<l&&!(c.pts.length<8);t++){let t=Math.floor(c.pts.length*(.3+a()*.35)),n=c.pts[t],r=c.rad[t]*(.45+a()*.2),i=Math.atan2(n.z-c.pts[t-1].z,n.x-c.pts[t-1].x)+(a()<.5?1:-1)*(.5+a()*.5),l=e.axisAt(0,new W),u=Math.hypot(n.x-l.x,n.z-l.z),d=_(n,i,r,s*(.35+a()*.3),u);d&&(d.collar=c.rad[t],o.push(d))}}function _(e,t,n,r){let o=new K(`root`,1,null);o.flat=[];let p=a()*50,m=t,g=0,_=e.y;f.copy(e),o.push(f,n),o.flat.push(.8);let v=a()*.3,y=!1,b=0;for(let e=0;e<160&&g<r;e++){let e=g/r,t=Math.max(.025,n*(1-e)**.8+.02*(1-e)),a=Math.max(.18,Math.min(.3,t*1.2+.1));if(m+=s.noise2(p,g*.14)*.2,!y){let e=h(f,m,a,t,_);e===null?y=!0:m=e}let x=f.x+Math.cos(m)*a,S=f.z+Math.sin(m)*a,C=x+c,w=S+u;i.rootBlocked(C,w,t*.8)&&(y=!0);let T=t*.75,E=Math.max(d(C,w),d(C+Math.cos(m+1.57)*T,w+Math.sin(m+1.57)*T),d(C-Math.cos(m+1.57)*T,w-Math.sin(m+1.57)*T))-l,D=.65,O=.2+v+.35*s.noise2(p+4,g*.2);y&&(b-=.35),O+=b-2.2*A(.65,1,e),E+l<.05&&(O-=.25);let j=E+t*D*O;if(_=k(j,_-a*1.1,_+a*1.4),f.set(x,_,S),g+=a,o.push(f,t),o.flat.push(D),_<E-t*D*1.4)break}return o.pts.length>3?o:null}return o}var xe=x;function Se(e,t,n,r,i,a){let o=e.x,s=e.g,c=e.z,l=t.N,u=[],d=[],f=[],p=(e,t)=>i.surf(e+o,t+c)-s,m=t.houseEnv;function h(e,t,n,i){let a=p(e,n);for(let l=t-.3;l>a;l-=.6)if(r.blocked(e+o,l+s,n+c,i))return{floor:l+.6,ground:!1,g:a};return{floor:a,ground:!0,g:a}}let g=(e,t)=>i.hf.distToPaths(e+o,t+c)<1.2,_=[],v=new xe;for(let e of t.all)if(!(e.level>2||e.kind===`twig`))for(let t=.8;t<e.len-.5;t+=1.7){let n=e.sample(t,v);n<.06||v.y<2.5||m&&Math.hypot(v.x,v.z)<m.rMax+1||_.push({p:v.clone(),r:n,b:e,s:t,h:a()})}_.sort((e,t)=>e.h-t.h);let y=Math.round(e.aerialBunches),b=0;for(let t of _){if(b>=y)break;let n=t.p.clone();n.y-=t.r*.6;let i=h(n.x,n.y,n.z,.35),s=n.y-i.floor;if(s<1.4)continue;b++;let d=i.ground&&!g(n.x,n.z)&&!(r.inZone&&r.inZone(n.x+o,n.z+c,.6))&&s<e.pillarMaxDrop&&a()<e.pillarChance,f=3+Math.floor(a()*4);for(let r=0;r<f+ +!!d;r++){let i=d&&r===0,o=(a()-.5)*.5*(i?.3:1),c=(a()-.5)*.5*(i?.3:1),f=i?s+.35:Math.min(s-.3,O(1.5,e.hangMax,a()**1.3)*(.55+a()*.5));if(f<.8)continue;let p=i?.06+a()*.07*e.scale:.014+a()*.022,m=new K(`aerial`,9,t.b);m.hang=[],m.tint=2;let h=a()*40,g=Math.max(3,Math.ceil(f/.4));for(let e=0;e<=g;e++){let t=e/g,r=n.y-t*f,a=i?.12:.18,s=n.x+o*t+l.noise2(h,t*3.1)*a*t,u=n.z+c*t+l.noise2(h+7,t*3.1)*a*t,d=i?p*(1+.8*A(.85,1,t)):p*(1-.6*t)+.004;m.push(new xe(s,r,u),d),m.hang.push(i?0:t*f)}m.pillar=i,m.attach=n.clone(),u.push(m)}}let x=Math.round(e.vineCurtains);b=0;for(let t=_.length-1;t>=0&&b<x;t--){let n=_[t],r=n.p.clone();r.y-=n.r*.5;let i=h(r.x,r.y,r.z,.4),o=r.y-i.floor-.4;if(o<1.5)continue;b++;let s=3+Math.floor(a()*4);for(let t=0;t<s;t++){let t=Math.min(o,1.8+a()**1.2*e.hangMax*.8),i=new K(`vine`,9,n.b);i.hang=[],i.tint=1;let s=(a()-.5)*.9,c=(a()-.5)*.9,u=a()*40,f=Math.max(3,Math.ceil(t/.3));for(let e=0;e<=f;e++){let n=e/f,a=r.x+s*Math.sqrt(n)+l.noise2(u,n*4)*.14,o=r.z+c*Math.sqrt(n)+l.noise2(u+3,n*4)*.14;i.push(new xe(a,r.y-n*t,o),.015+.01*(1-n)),i.hang.push(n*t)}i.attach=r.clone(),d.push(i),T(i,.22,.38,null)}}let S=Math.round(e.lianas);b=0;for(let e=0;e<60&&b<S&&_.length>4;e++){let e=_[Math.floor(a()*_.length)],t=_[Math.floor(a()*_.length)];if(e.b===t.b)continue;let n=e.p.distanceTo(t.p);if(n<3||n>10)continue;let i=n*(.15+a()*.18),l=[],u=Math.ceil(n/.3),f=!0;for(let n=0;n<=u;n++){let a=n/u,d=new xe().lerpVectors(e.p,t.p,a);if(d.y-=e.r*.5*(1-a)+t.r*.5*a+i*4*a*(1-a),r.blocked(d.x+o,d.y+s,d.z+c,.3)||d.y<p(d.x,d.z)+2.6){f=!1;break}l.push(d)}if(!f)continue;b++;let m=new K(`vine`,9,e.b);m.hang=[],m.tint=1;let h=.014+a()*.014;for(let e=0;e<l.length;e++){let t=e/(l.length-1);m.push(l[e],h),m.hang.push(i*4*t*(1-t))}m.attach=e.p.clone(),d.push(m),T(m,.24,.4,null)}let C=Math.round(e.climbers),w=e.climbTop;for(let t=0;t<C;t++){let t=new K(`vine`,9,null);t.hang=[],t.tint=1;let r=a()*Math.PI*2,i=a()<.5?1:-1,o=.1+a()*.18,s=w*(.45+a()*.55),c=a()*30,u=new xe,f=[];for(let a=.05;a<=s;a+=.22){r+=i*o*.22+l.noise2(c,a*.35)*.05,e.axisAt(a,u);let d=n.R(r,a)+.03;t.push(new xe(u.x+Math.cos(r)*d,a,u.z+Math.sin(r)*d),.016*(1-.4*a/Math.max(s,1))+.006),t.hang.push(0),f.push(new xe(Math.cos(r),0,Math.sin(r)))}t.pts.length<4||(t.attach=t.pts[0].clone(),t.climber=!0,d.push(t),T(t,.16,.24,f))}function T(t,n,i,l){let u=t.pts,d=new xe,p=new xe;for(let m=1;m<u.length-1;m++){if(a()<.12||(d.subVectors(u[m-1],u[m+1]),d.lengthSq()<1e-8)||(d.normalize(),d.y<0&&d.negate(),l?p.copy(l[m]).addScaledVector(d,-l[m].dot(d)):p.set(a()-.5,(a()-.3)*.4,a()-.5).addScaledVector(d,-0),p.addScaledVector(d,-p.dot(d)),p.lengthSq()<1e-6))continue;p.normalize();let h=O(n,i,a())*e.vineLeafScale;l&&r.stairHit&&r.stairHit(u[m].x+o,u[m].y+s,u[m].z+c,h*.5)||f.push({p:u[m].clone().addScaledVector(p,h*.2),up:d.clone(),n:p.clone(),s:h,strand:t})}}return{aerial:u,vines:d,leaves:f}}var Ce=Math.PI*2,we=new x(0,1,0),Te=class{constructor(e=16384){this.cap=e,this.pos=new Float32Array(e*3),this.nor=new Float32Array(e*3),this.uv=new Float32Array(e*2),this.col=new Float32Array(e*3),this.bark=new Float32Array(e*4),this.icap=e*6,this.idx=new Uint32Array(this.icap),this.n=0,this.ni=0}_grow(){let e=this.cap*2,t=(t,n)=>{let r=new Float32Array(e*n);return r.set(t),r};this.pos=t(this.pos,3),this.nor=t(this.nor,3),this.uv=t(this.uv,2),this.col=t(this.col,3),this.bark=t(this.bark,4),this.cap=e}vert(e,t,n,r,i,a,o,s,c,l){this.n>=this.cap&&this._grow();let u=this.n;return this.pos[u*3]=e,this.pos[u*3+1]=t,this.pos[u*3+2]=n,this.nor[u*3]=r,this.nor[u*3+1]=i,this.nor[u*3+2]=a,this.uv[u*2]=o,this.uv[u*2+1]=s,this.col[u*3]=c[0],this.col[u*3+1]=c[1],this.col[u*3+2]=c[2],this.bark[u*4]=l[0],this.bark[u*4+1]=l[1],this.bark[u*4+2]=l[2],this.bark[u*4+3]=l[3],this.n++}tri(e,t,n){if(this.ni+3>this.icap){let e=new Uint32Array(this.icap*2);e.set(this.idx),this.idx=e,this.icap*=2}this.idx[this.ni++]=e,this.idx[this.ni++]=t,this.idx[this.ni++]=n}get triangles(){return this.ni/3}build(){let e=this.n,n=new g;n.setAttribute(`position`,new t(this.pos.slice(0,e*3),3)),n.setAttribute(`normal`,new t(this.nor.slice(0,e*3),3)),n.setAttribute(`uv`,new t(this.uv.slice(0,e*2),2)),n.setAttribute(`color`,new t(this.col.slice(0,e*3),3)),n.setAttribute(`aBark`,new t(this.bark.slice(0,e*4),4));let i=this.idx.subarray(0,this.ni);n.setIndex(new t(e>65535?i.slice():Uint16Array.from(i),1));let a=this.pos,o=1/0,s=1/0,c=1/0,l=-1/0,u=-1/0,d=-1/0;for(let t=0;t<e*3;t+=3){let e=a[t],n=a[t+1],r=a[t+2];e<o&&(o=e),e>l&&(l=e),n<s&&(s=n),n>u&&(u=n),r<c&&(c=r),r>d&&(d=r)}n.boundingBox=new r(new x(o,s,c),new x(l,u,d));let f=(o+l)/2,p=(s+u)/2,h=(c+d)/2,_=0;for(let t=0;t<e*3;t+=3){let e=a[t]-f,n=a[t+1]-p,r=a[t+2]-h,i=e*e+n*n+r*r;i>_&&(_=i)}return n.boundingSphere=new m(new x(f,p,h),Math.sqrt(_)),n}},Ee=[1,1,1],De=[0,0,0,0],Oe=new Map;function ke(e){let t=Oe.get(e);if(!t){let n=new Float64Array(e+1),r=new Float64Array(e+1);for(let t=0;t<=e;t++){let i=t%e/e*Ce;n[t]=Math.cos(i),r[t]=Math.sin(i)}t={c:n,s:r},Oe.set(e,t)}return t}var Ae=e=>ke(e).c,je=e=>ke(e).s;function Me(e,t,n){let{ys:r,M:i,base:a}=t,o=i+1,s=r.length,c=[];for(let e=0;e<s-1;e+=2)c.push(e);c.push(s-1);let l=i>>1,u=l+1,d=e.n,f=[0,0,0],p=[0,0,0,0],m=n.pos,h=n.nor,g=n.uv,_=n.col,v=n.bark;for(let t of c)for(let n=0;n<=l;n++){let r=a+t*o+Math.min(i,n*2);f[0]=_[r*3],f[1]=_[r*3+1],f[2]=_[r*3+2],p[0]=v[r*4],p[1]=v[r*4+1],p[2]=v[r*4+2],p[3]=v[r*4+3],e.vert(m[r*3],m[r*3+1],m[r*3+2],h[r*3],h[r*3+1],h[r*3+2],g[r*2],g[r*2+1],f,p)}let y=c.length;for(let t=0;t<y-1;t++)for(let n=0;n<l;n++){let r=d+t*u+n,i=r+1,a=r+u,o=a+1;e.tri(r,a,i),e.tri(i,a,o)}let b=a+s*o,x=e.vert(m[b*3],m[b*3+1],m[b*3+2],0,1,0,0,g[b*2+1],[.3,.3,.3],[0,0,0,0]);for(let t=0;t<l;t++)e.tri(d+(y-1)*u+t,x,d+(y-1)*u+t+1)}function Ne(e,t,n,r){let i=r.radial,a=r.uRepeat,o=[],s=n.yBottom;for(;s<n.yTop-.05;){o.push(s);let e=(s<2.4?.13:s>t.forkH-1.2?.17:.28)*(r.ringScale||1);s+=e}o.push(n.yTop);let c=o.length,l=i+1,u=new Float32Array(c*l*3),d=new x;for(let e=0;e<c;e++){t.axisAt(Math.max(0,o[e]),d);for(let t=0;t<=i;t++){let r=t%i/i*Ce,a=n.R(r,o[e]),s=(e*l+t)*3;u[s]=d.x+Math.cos(r)*a,u[s+1]=o[e],u[s+2]=d.z+Math.sin(r)*a}}let f=new Float32Array(c*l),p=new Float32Array(c),m=new Float32Array(c*l),h=new Float32Array(c),g=r.vScale||1;for(let e=0;e<c;e++){let t=0;m[e*l]=0;for(let n=1;n<=i;n++){let r=(e*l+n)*3,i=(e*l+n-1)*3;t+=Math.hypot(u[r]-u[i],u[r+2]-u[i+2]),m[e*l+n]=t}for(let n=0;n<=i;n++)m[e*l+n]=t>1e-6?m[e*l+n]/t:n/i;h[e]=t}let _=.7;for(let e=0;e<c;e++){let t=0;for(let n=e;n>=0&&o[e]-o[n]<_*2.5;n--)t+=Math.exp(-(((o[e]-o[n])/_)**2));for(let n=e+1;n<c&&o[n]-o[e]<_*2.5;n++)t+=Math.exp(-(((o[n]-o[e])/_)**2));for(let n=0;n<=i;n++){let r=0;for(let t=e;t>=0&&o[e]-o[t]<_*2.5;t--)r+=m[t*l+n]*Math.exp(-(((o[e]-o[t])/_)**2));for(let t=e+1;t<c&&o[t]-o[e]<_*2.5;t++)r+=m[t*l+n]*Math.exp(-(((o[t]-o[e])/_)**2));f[e*l+n]=(r/t*.75+n/i*.25)*a}}let v=0,y=0;for(let e=0;e<c;e++){let t=h[e],n=Math.min(1.5*g,Math.max(.6*g,t>1e-6?a/t:g));e>0?v+=(o[e]-o[e-1])*.5*(n+y):v=o[0]*n,p[e]=v,y=n}let b=e.n;for(let t=0;t<c;t++){let n=Math.max(0,t-1),a=Math.min(c-1,t+1);for(let o=0;o<=i;o++){let s=(o-1+i)%i,c=(o+1)%i,d=(t*l+o)*3,m=(t*l+s)*3,h=(t*l+c)*3,g=(n*l+o)*3,_=(a*l+o)*3,v=u[h]-u[m],y=u[h+1]-u[m+1],b=u[h+2]-u[m+2],x=u[_]-u[g],S=u[_+1]-u[g+1],C=u[_+2]-u[g+2],w=S*b-C*y,T=C*v-x*b,E=x*y-S*v,D=Math.hypot(w,T,E)||1;w/=D,T/=D,E/=D;let O=u[d],k=u[d+1],A=u[d+2];r.shade(O,k,A,w,T,E,`trunk`,Ee,De),e.vert(O,k,A,w,T,E,f[t*l+o],p[t]+r.vOff,Ee,De)}}for(let t=0;t<c-1;t++)for(let n=0;n<i;n++){let r=b+t*l+n,i=r+1,a=r+l,o=a+1;e.tri(r,a,i),e.tri(i,a,o)}let S=o[c-1];if(t.axisAt(S,d),t.hero){let t=e.vert(d.x,S+.1,d.z,0,1,0,0,S,[.3,.3,.3],[0,0,0,0]);for(let n=0;n<i;n++)e.tri(b+(c-1)*l+n,t,b+(c-1)*l+n+1);return{ys:o,P:u,radial:i,M:i,base:b}}let C=b+(c-1)*l,w=0,T=[0,0,0],E=[0,0,0,0],D=[0,0,0],O=[0,0,0,0];for(let t=0;t<i;t++){let n=((c-1)*l+t)*3,r=C+t;w+=Math.hypot(u[n]-d.x,u[n+2]-d.z)/i;for(let t=0;t<3;t++)T[t]+=e.col[r*3+t]*.5/i;for(let t=0;t<4;t++)E[t]+=e.bark[r*4+t]/i}E[0]=Math.max(E[0],.6);let k=-.34*w,A=e.vert(d.x,S+k,d.z,0,1,0,0,p[c-1]+k+r.vOff,T,E),j=C;for(let t=0;t<Ge.length;t+=2){let n=Ge[t],a=Ge[t+1],o=e.n,s=.82-.3*(1-a);for(let t=0;t<=i;t++){let i=((c-1)*l+t)*3,o=C+t,m=u[i]-d.x,h=u[i+2]-d.z,g=Math.hypot(m,h)||1;for(let t=0;t<3;t++)D[t]=e.col[o*3+t]*s;for(let t=0;t<4;t++)O[t]=e.bark[o*4+t];O[0]=Math.max(O[0],.7*(1-a));let _=Math.hypot(.35,1);e.vert(d.x+m*a,S+n*w,d.z+h*a,-m/g*.35/_,1/_,-h/g*.35/_,f[(c-1)*l+t],p[c-1]+n*w+r.vOff,D,O)}for(let t=0;t<i;t++){let n=j+t,r=n+1,i=o+t,a=i+1;e.tri(n,i,r),e.tri(r,i,a)}j=o}for(let t=0;t<i;t++)e.tri(j+t,A,j+t+1);return{ys:o,P:u,radial:i,M:i,base:b}}var X=new x,Z=new x,Pe=new x,Fe=new x,Ie=new x,Le=0,Q,Re,ze,Be,Ve;function He(e){e<=Le||(Le=Math.max(e,Le*2,512),Q=new Float64Array(Le*3),Re=new Float64Array(Le),ze=new Float64Array(Le),Be=new Float64Array(Le),Ve=new Float64Array(Le))}var Ue=new Float64Array(256),We=[.52,.86,.9,.5],Ge=[-.08,.8,-.22,.5,-.31,.22];function Ke(e,t,n,r,i,a){let o=e.length;Ue.length<o&&(Ue=new Float64Array(o*2));let s=Ue;s[0]=0;for(let t=1;t<o;t++)s[t]=s[t-1]+e[t].distanceTo(e[t-1]);let c=s[o-1];if(c<1e-4)return 0;let l=0,u=0,d=0,f=(e,t,n,r,i)=>{let a=i*i,o=a*i;return .5*(2*t+(-e+n)*i+(2*e-5*t+4*n-r)*a+(-e+3*t-3*n+r)*o)},p=t[0];for(He(64);;){for(;u<o-2&&s[u+1]<l;)u++;let m=s[u],h=s[u+1],g=h>m?Math.min(1,Math.max(0,(l-m)/(h-m))):0,_=e[Math.max(0,u-1)],v=e[u],y=e[u+1],b=e[Math.min(o-1,u+2)];He(d+1),Q[d*3]=f(_.x,v.x,y.x,b.x,g),Q[d*3+1]=f(_.y,v.y,y.y,b.y,g),Q[d*3+2]=f(_.z,v.z,y.z,b.z,g);let x=t[u]+(t[u+1]-t[u])*g;if(Re[d]=x,ze[d]=n?n[u]+(n[u+1]-n[u])*g:1,Be[d]=r?r[u]+(r[u+1]-r[u])*g:0,Ve[d]=l,d++,l>=c-1e-5)break;let S=a>.09&&l<a*2.2+p,C=Math.max(.15,Math.min(1.1,x*2.2+.08))*i;S&&(C=Math.min(C,Math.max(.07,p*.5))),l=Math.min(c,l+C)}return d}function qe(e,t,n,r){if(t.length<2)return 0;let i=Math.max(3,r.radial|0),a=Ke(t,n,r.flat,r.hang,r.step??1,r.collar||0);if(a<2)return 0;let o=r.uRepeat,s=r.collar||0,c=Re[0],l=e.n,u=r.onRing||null;X.set(Q[3]-Q[0],Q[4]-Q[1],Q[5]-Q[2]).normalize(),r.flat?(Z.crossVectors(we,X),Z.lengthSq()<1e-6&&Z.set(1,0,0),Z.normalize()):Math.abs(X.y)<.9?Z.crossVectors(X,we).normalize():Z.set(1,0,0).cross(X).normalize(),Pe.crossVectors(X,Z).normalize();let d=Ie.copy(X),f=Ae(i),p=je(i);for(let t=0;t<a;t++){let n=Q[t*3],l=Q[t*3+1],m=Q[t*3+2],h=Math.max(0,t-1),g=Math.min(a-1,t+1);if(X.set(Q[g*3]-Q[h*3],Q[g*3+1]-Q[h*3+1],Q[g*3+2]-Q[h*3+2]),X.lengthSq()<1e-10?X.copy(d):X.normalize(),r.flat)Z.crossVectors(we,X),Z.lengthSq()<1e-6&&Z.set(1,0,0),Z.normalize(),Pe.crossVectors(X,Z).normalize();else{let e=Fe.crossVectors(d,X),t=e.length();if(t>1e-6){e.multiplyScalar(1/t);let n=Math.asin(Math.min(1,t));Z.applyAxisAngle(e,n),Pe.applyAxisAngle(e,n)}Z.addScaledVector(X,-Z.dot(X)).normalize(),Pe.crossVectors(X,Z).normalize()}d.copy(X);let _=Ve[t],v=Re[t];if(s>0){let e=s*.9+c*.8;v*=1+Math.min(.75,.55*s/Math.max(c,.001))*Math.exp(-_/e)*.8}let y=Math.max(1e-4,Ve[g]-Ve[h]),b=(Re[g]-Re[h])/y,x=ze[t],S=Math.sqrt(Math.max(.2,x)),C=v/S,w=v*S,T=Be[t];u&&u(n,l,m);let E=Z.x,D=Z.y,O=Z.z,k=Pe.x,A=Pe.y,j=Pe.z,M=X.x,N=X.y,P=X.z;for(let t=0;t<=i;t++){let a=f[t],s=p[t],c=E*a*C+k*s*w,u=D*a*C+A*s*w,d=O*a*C+j*s*w,h=E*a/C+k*s/w,g=D*a/C+A*s/w,y=O*a/C+j*s/w,x=Math.sqrt(h*h+g*g+y*y)||1;h/=x,g/=x,y/=x,h-=M*b,g-=N*b,y-=P*b,x=Math.sqrt(h*h+g*g+y*y)||1,h/=x,g/=x,y/=x;let S=n+c,F=l+u,I=m+d;r.shade(S,F,I,h,g,y,r.kind,Ee,De,_,v,T),e.vert(S,F,I,h,g,y,t/i*o,_+r.vOff,Ee,De)}}let m=i+1;for(let t=0;t<a-1;t++)for(let n=0;n<i;n++){let r=l+t*m+n,i=r+1,a=r+m,o=a+1;e.tri(r,i,a),e.tri(i,o,a)}if(r.cap){let t=(a-1)*3,n=(a-2)*3,o=Q[t],s=Q[t+1],c=Q[t+2];X.set(o-Q[n],s-Q[n+1],c-Q[n+2]).normalize();let u=Re[a-1],d=l+(a-1)*m,f=d,p=u>.05;if(p)for(let t=0;t<We.length;t+=2){let n=We[t],l=We[t+1],p=Math.sqrt(1-l*l),m=e.n;for(let t=0;t<=i;t++){let i=(d+t)*3,f=e.pos[i]-o,m=e.pos[i+1]-s,h=e.pos[i+2]-c,g=Math.sqrt(f*f+m*m+h*h)||1,_=f/g*l+X.x*p,v=m/g*l+X.y*p,y=h/g*l+X.z*p,b=Math.sqrt(_*_+v*v+y*y)||1;_/=b,v/=b,y/=b;let x=o+f*l+X.x*n*u,S=s+m*l+X.y*n*u,C=c+h*l+X.z*n*u;r.shade(x,S,C,_,v,y,r.kind,Ee,De,Ve[a-1],u,Be[a-1]),e.vert(x,S,C,_,v,y,e.uv[(d+t)*2],Ve[a-1]+n*u+r.vOff,Ee,De)}for(let t=0;t<i;t++)e.tri(f+t,f+t+1,m+t),e.tri(f+t+1,m+t+1,m+t);f=m}let h=p?1.12:.9;r.shade(o,s,c,X.x,X.y,X.z,r.kind,Ee,De,Ve[a-1],u,Be[a-1]);let g=e.vert(o+X.x*u*h,s+X.y*u*h,c+X.z*u*h,X.x,X.y,X.z,0,Ve[a-1]+u*h+r.vOff,Ee,De);for(let t=0;t<i;t++)e.tri(f+t,f+t+1,g)}return a}var Je=`
uniform float uTime;
uniform vec2 uWindDir;
uniform float uWindStrength;
vec3 treeWind(vec3 base, vec3 lp, float flex, float hang) {
  float t = uTime;
  float ph = dot(base.xz, vec2(0.071, 0.113));
  vec3 wd = vec3(uWindDir.x, 0.0, uWindDir.y);
  vec3 pd = vec3(-wd.z, 0.0, wd.x);
  float gust = 0.55 + 0.45 * sin(t * 0.29 + ph) * sin(t * 0.13 + ph * 1.7 + 1.3);
  float sway = sin(t * 0.85 + ph + dot(lp.xz, vec2(0.09, 0.06))) * 0.65 + sin(t * 1.63 + ph * 2.3 + lp.y * 0.21) * 0.35;
  float side = sin(t * 1.21 + ph * 3.1 + lp.x * 0.13 - lp.z * 0.08);
  vec3 off = wd * (gust * 0.55 + sway * 0.45 * gust) + pd * side * 0.3 * gust;
  off.y = sway * 0.12 * gust;
  vec3 res = off * (flex * uWindStrength);
  if (hang > 0.0) {
    float sw = sin(t * (1.9 / sqrt(1.0 + hang * 0.25)) + ph * 5.0 + lp.x * 0.7 + lp.z * 0.5);
    res += (wd * (0.6 + 0.4 * sw) * gust + pd * sw * 0.5) * (hang * 0.035 * uWindStrength);
  }
  return res;
}
`;function Ye(e,t,n,r){let i=Math.max(n-e.forkH*.75,0),a=Math.hypot(t,r),o=i*.035+a*.045;return .2*o*o}var Xe=`
#define PI 3.14159265
uniform float uPx;     // texel size in cell units at the level being rendered
uniform int uMode;     // 0 albedo + coverage, 1 normal, 2 data (ao, rough, trans)
uniform int uNStem;    // loop bounds are uniforms so the D3D compiler never unrolls them
uniform int uNTwig;
uniform int uNLeaf;
uniform int uNMain;
uniform int uNVine;

float hsh(float a, float b) { return bk_hash12(vec2(a * 17.13 + 3.7, b * 5.71 + 11.3)); }
vec2 bez(vec2 a, vec2 b, vec2 c, float t) { float u = 1.0 - t; return u * u * a + 2.0 * u * t * b + t * t * c; }
vec2 bezd(vec2 a, vec2 b, vec2 c, float t) { return normalize(2.0 * (1.0 - t) * (b - a) + 2.0 * t * (c - b)); }
vec2 rot2(vec2 v, float a) { float c = cos(a), s = sin(a); return vec2(c * v.x - s * v.y, s * v.x + c * v.y); }
float segD(vec2 p, vec2 a, vec2 b, out float h) {
  vec2 pa = p - a, ba = b - a;
  h = clamp(dot(pa, ba) / max(dot(ba, ba), 1e-8), 0.0, 1.0);
  return length(pa - ba * h);
}

// accumulated surface: premultiplied colour / normal / data with a WIDE weight
// (dilates each element ~3 texels into uncovered space) + sharp coverage gA
vec3 gC; vec3 gN; vec3 gO; float gW; float gA;

void over(vec3 col, vec3 n, vec3 o, float cov, float wide) {
  float w = max(cov, wide * (1.0 - gA));
  gC = gC * (1.0 - w) + col * w;
  gN = gN * (1.0 - w) + n * w;
  gO = gO * (1.0 - w) + o * w;
  gW = gW * (1.0 - w) + w;
  gA = cov + gA * (1.0 - cov);
}

void stem(vec2 p, vec2 a, vec2 b, float w0, float w1) {
  float h; float d = segD(p, a, b, h);
  float w = mix(w0, w1, h);
  float dpx = (w - d) / uPx;
  if (dpx < -3.0) return;
  float cov = clamp(dpx + 0.5, 0.0, 1.0);
  float wide = clamp(dpx / 3.0 + 1.0, 0.0, 1.0);
  vec2 dir = normalize(b - a);
  vec2 perp = vec2(-dir.y, dir.x);
  float x = clamp(dot(p - mix(a, b, h), perp) / max(w, 1e-5), -1.0, 1.0);
  vec3 n = normalize(vec3(perp * x * 0.9, sqrt(max(0.0, 1.0 - x * x)) + 0.1));
  vec3 col = vec3(0.07, 0.056, 0.036) * (0.8 + 0.4 * hsh(a.x * 91.0, a.y * 37.0));
  over(col, n, vec3(0.8, 0.82, 0.06), cov, wide);
}

// one leaf: base point, direction, length, width ratio, seed, layer 0..1,
// heart (vine) shape, youth 0 (old, inner) .. 1 (young, twig tip)
// Ficus-like: entire margin, ovate-elliptic blade with a short acuminate drip
// tip, pale midrib, 7-10 pairs of secondary veins that leave the midrib at
// ~50 deg and curve up toward the tip, looping into a faint intramarginal
// vein, fine reticulate tertiary net (only where a texel resolves it).
// Per leaf: age (young tip leaves lighter, yellower), sun / shade tone, rare
// yellowing and brown leaves, necrotic tips / margins and small spots.
void leaf(vec2 p, vec2 base, vec2 dir, float L, float wr, float sd, float layer, bool heart, float youth) {
  vec2 d = p - base;
  float along = dot(d, dir);
  float mg = 3.5 * uPx;
  if (along < -mg || along > L + mg) return;
  vec2 perp = vec2(-dir.y, dir.x);
  float across = dot(d, perp);
  if (abs(across) > L * (wr * 0.62 + 0.06) + mg) return;
  float t = along / L;
  float curv = (hsh(sd, 3.0) - 0.5) * 0.2;
  float s = across / L - curv * (t - 0.5) * (t - 0.5) * 4.0 + curv * 0.25;
  float tt = clamp(t, 0.0, 1.0);
  float shape;
  if (heart) shape = pow(max(tt, 1e-4), 0.28) * pow(max(1.0 - tt, 1e-4), 1.05) / 0.52;
  else {
    shape = pow(max(tt, 1e-4), 0.5) * pow(max(1.0 - tt, 1e-4), 0.9) / 0.405;
    // acuminate drip tip: concave sides over the last third
    shape *= 1.0 - (0.28 + 0.3 * hsh(sd, 23.0)) * smoothstep(0.6, 0.93, tt);
  }
  float hw = 0.5 * wr * shape;
  float e = min(hw - abs(s), min(t, 1.0 - t) * 0.5);
  float dpx = e * L / uPx;
  if (dpx < -3.0) return;
  float cov = clamp(dpx + 0.5, 0.0, 1.0);
  float wide = clamp(dpx / 3.0 + 1.0, 0.0, 1.0);
  // detail fades out once it is below a texel (keeps every level alias-free)
  float vf = 1.0 - smoothstep(0.0022, 0.0085, uPx);
  float vf2 = 1.0 - smoothstep(0.0007, 0.0028, uPx);
  float edge = clamp(abs(s) / max(hw, 1e-4), 0.0, 1.0);
  // ---- colour (linear): coherent masses, not a mosaic
  float h1 = hsh(sd, 1.0), h2 = hsh(sd, 2.0), h3 = hsh(sd, 4.0), h4 = hsh(sd, 26.0);
  vec3 col = mix(vec3(0.038, 0.071, 0.021), vec3(0.062, 0.106, 0.028), h1);
  col = mix(col, vec3(0.088, 0.124, 0.03), youth * (0.45 + 0.3 * h2));          // young: lighter, yellower
  col = mix(col, vec3(0.086, 0.1, 0.034), smoothstep(0.7, 1.0, h2) * 0.55);     // olive, sun-worn
  float aged = 0.0;
  if (h3 > 0.986) { col = mix(col, vec3(0.15, 0.14, 0.036), 0.5 + 0.35 * h4); aged = 0.6; }   // yellowing
  else if (h3 < 0.009) { col = vec3(0.105, 0.07, 0.034) * (0.8 + 0.4 * h4); aged = 1.0; }  // dead, brown
  col *= 0.9 + 0.1 * tt + 0.06 * edge;
  col *= 1.0 + 0.06 * (bk_vnoise(p * 140.0 + sd * 13.0, vec2(4096.0)) - 0.5) * 2.0 * vf;
  // ---- venation
  float midW = 0.011 + 0.012 * (1.0 - tt);
  float aa = uPx / L;                                             // one texel in leaf units
  float mid_ = 1.0 - smoothstep(midW - aa, midW + aa, abs(s));
  float nV = 7.0 + 3.0 * hsh(sd, 25.0);
  float side = s >= 0.0 ? 0.0 : 0.37;                             // sub-opposite pairs
  float ph = tt * nV - pow(edge, 0.75) * (1.5 + 0.4 * hsh(sd, 27.0)) + hsh(sd, 7.0) + side;
  float pw = nV * aa * 1.2;                                       // phase units per texel
  float lat = 1.0 - smoothstep(0.035 - pw, 0.035 + pw, abs(fract(ph) - 0.5));
  lat *= smoothstep(midW, midW + 0.05, abs(s)) * (1.0 - smoothstep(0.82, 0.93, edge)) * smoothstep(0.04, 0.1, tt) * (1.0 - smoothstep(0.9, 0.98, tt));
  lat *= 1.0 - smoothstep(0.04, 0.1, pw);
  float marg = (1.0 - smoothstep(0.0, 0.03 + pw * 0.3, abs(edge - 0.88))) * 0.5 * smoothstep(0.1, 0.2, tt) * (1.0 - smoothstep(0.02, 0.06, pw));
  float net = 0.0;
  if (vf2 > 0.0) {
    vec2 q = vec2(s * 90.0, tt * 60.0) + sd * 7.3;
    float c1 = bk_vnoise(q, vec2(4096.0)), c2 = bk_vnoise(q * 2.3 + 3.1, vec2(4096.0));
    net = (1.0 - smoothstep(0.03, 0.09, abs(c1 - 0.5))) * 0.6 + (1.0 - smoothstep(0.03, 0.08, abs(c2 - 0.5))) * 0.4;
    net *= vf2 * (1.0 - edge * 0.5);
  }
  float vein = max(max(mid_, lat * 0.6), marg * 0.45) * vf;
  col = mix(col, col * vec3(1.5, 1.5, 1.2) + vec3(0.012, 0.014, 0.002), vein * 0.62);
  col *= 1.0 + 0.1 * net;
  // necrotic tip / margin on some old leaves, small dark spots on a few
  float necT = step(0.88, h4) * (1.0 - youth) * smoothstep(0.8 - 0.25 * h2, 1.0, max(edge * 0.93, tt));
  col = mix(col, vec3(0.1, 0.066, 0.03) * (0.8 + 0.4 * h1), necT * 0.85);
  if (h4 > 0.8 && h4 < 0.86) {
    vec2 sp = vec2(s * 30.0, tt * 18.0) + sd * 3.1;
    float spot = smoothstep(0.78, 0.84, bk_vnoise(sp, vec2(4096.0)));
    col = mix(col, vec3(0.055, 0.05, 0.022), spot * 0.8 * vf);
  }
  // ---- normal: the leaf's own 3D tilt (matches its foreshortened outline) +
  // fold along the midrib + lengthwise curl + vein grooves + blistering
  float sg = s >= 0.0 ? 1.0 : -1.0;
  float tA = hsh(sd, 19.0), tB = hsh(sd, 21.0);
  float roll = sqrt(max(0.0, 1.0 - (0.8 + 0.2 * tB) * (0.8 + 0.2 * tB))) * (hsh(sd, 5.0) < 0.5 ? -1.0 : 1.0);
  float pitch = sqrt(max(0.0, 1.0 - (0.78 + 0.22 * tA) * (0.78 + 0.22 * tA))) * (hsh(sd, 6.0) < 0.5 ? -0.8 : 0.8);
  float fold = 0.2 + 0.18 * hsh(sd, 8.0);
  vec2 nxy = perp * roll + dir * pitch;
  nxy += perp * sg * fold * smoothstep(0.0, 0.06, abs(s)) + dir * (tt - 0.45) * 0.45;
  // margins curl down a little (convex blade)
  nxy += perp * sg * 0.35 * smoothstep(0.7, 1.0, edge);
  nxy += (perp * sg * lat * 0.12 - perp * sg * mid_ * 0.15) * vf;
  nxy += vec2(cos(ph * 6.2832), sin(ph * 6.2832)) * 0.05 * vf * (1.0 - edge);
  vec3 n = normalize(vec3(nxy, 1.0));
  float ao = (0.78 + 0.22 * layer) * (0.86 + 0.14 * smoothstep(0.0, 0.35, tt)) * (1.0 - 0.08 * net);
  // waxy upper cuticle: fairly glossy; veins and old / dead leaves duller
  float rough = 0.36 + 0.1 * hsh(sd, 9.0) + vein * 0.08 + aged * 0.25 + necT * 0.3;
  float trans = mix(0.92, 0.78, vein) * (1.0 - 0.65 * aged * step(0.9, aged)) * (1.0 - 0.6 * necT);
  over(col, n, vec3(ao, rough, trans), cov, wide);
}

void cluster(vec2 p, float cid) {
  gC = vec3(0.0); gN = vec3(0.0); gO = vec3(0.0); gW = 0.0; gA = 0.0;
  bool vine = cid > 2.5;
  // three spray characters: slender fig, broad ficus, small dense oak-like
  float leafScale = cid < 0.5 ? 1.0 : (cid < 1.5 ? 1.1 : 0.86);
  float wrBase = cid < 0.5 ? 0.44 : (cid < 1.5 ? 0.58 : 0.5);
  vec2 P0 = vec2(0.5, 0.02);
  vec2 P1 = vec2(0.5 + (hsh(cid, 2.0) - 0.5) * 0.3, 0.46);
  vec2 P2 = vec2(0.5 + (hsh(cid, 1.0) - 0.5) * 0.26, 0.9);
  if (vine) { P0 = vec2(0.5, 0.0); P1 = vec2(0.5 + (hsh(cid, 2.0) - 0.5) * 0.2, 0.5); P2 = vec2(0.5, 1.0); }
  // main stem
  float nS = float(uNStem);
  for (int k = 0; k < uNStem; k++) {
    float t0 = float(k) / nS, t1 = float(k + 1) / nS;
    float w0 = vine ? 0.0035 : mix(0.0072, 0.0026, t0), w1 = vine ? 0.0035 : mix(0.0072, 0.0026, t1);
    stem(p, bez(P0, P1, P2, t0), bez(P0, P1, P2, t1), w0, w1);
  }
  if (vine) {
    float nV = float(uNVine);
    for (int i = 0; i < uNVine; i++) {
      float fi = float(i);
      float u = 0.05 + fi * (0.9 / nV);
      vec2 a = bez(P0, P1, P2, u);
      vec2 td = bezd(P0, P1, P2, u);
      float side = mod(fi, 2.0) < 0.5 ? 1.0 : -1.0;
      float sd = cid * 100.0 + fi;
      vec2 ld = normalize(rot2(td, side * (1.1 + 0.4 * hsh(sd, 11.0))) + vec2(0.0, -0.35));
      vec2 b = a + ld * 0.028;
      stem(p, a, b, 0.0022, 0.0018);
      float L = 0.15 + 0.05 * hsh(sd, 12.0);
      leaf(p, b, normalize(ld + vec2(0.0, -0.5)), L, 0.9, sd, fi / nV, true, 0.3 + 0.5 * fi / nV);
    }
    return;
  }
  // leaves on the main stem (drawn first: the side twigs overlap them)
  float nM = float(uNMain);
  for (int i = 0; i < uNMain; i++) {
    float fi = float(i);
    float sd = cid * 100.0 + 70.0 + fi;
    bool term = i == uNMain - 1;
    float u = term ? 1.0 : 0.24 + fi * (0.72 / max(nM - 1.0, 1.0));
    vec2 a = bez(P0, P1, P2, u);
    vec2 td = bezd(P0, P1, P2, u);
    float side = mod(fi, 2.0) < 0.5 ? 1.0 : -1.0;
    vec2 ld = term ? td : normalize(rot2(td, side * (0.7 + 0.4 * hsh(sd, 13.0))));
    ld = normalize(ld + vec2(0.0, 0.1));
    vec2 b = a + ld * (0.014 + 0.008 * hsh(sd, 14.0));
    float L = (0.12 + 0.035 * hsh(sd, 15.0)) * leafScale * (1.05 - 0.22 * fi / nM) * (0.8 + 0.2 * hsh(sd, 19.0));
    float wr = wrBase * (0.86 + 0.24 * hsh(sd, 16.0)) * (0.8 + 0.2 * hsh(sd, 21.0));
    leaf(p, b, ld, L, wr, sd, fi / 64.0, false, term ? 1.0 : 0.15 + 0.6 * fi / nM);
  }
  // side twigs with their leaves, bottom up
  float nT = float(uNTwig), nL = float(uNLeaf);
  for (int j = 0; j < uNTwig; j++) {
    float fj = float(j);
    float u = 0.1 + fj * (0.64 / nT) + (hsh(cid, 20.0 + fj) - 0.5) * 0.04;
    float side = mod(fj + cid, 2.0) < 0.5 ? 1.0 : -1.0;
    vec2 a = bez(P0, P1, P2, u);
    vec2 td = bezd(P0, P1, P2, u);
    vec2 dd = normalize(rot2(td, side * (0.85 + 0.35 * hsh(cid, 30.0 + fj))) + vec2(0.0, 0.1 + 0.05 * fj));
    float l = (0.36 - fj * 0.034) * (0.85 + 0.25 * hsh(cid, 40.0 + fj));
    // whole-twig bounding circle (twig + leaves) early-out
    if (length(p - (a + dd * l * 0.5)) > l * 0.5 + 0.2 * leafScale + 4.0 * uPx) continue;
    stem(p, a, a + dd * l, 0.0044, 0.002);
    for (int i = 0; i < uNLeaf; i++) {
      float fi = float(i);
      float sd = cid * 100.0 + fj * 13.0 + fi;
      bool term = i == uNLeaf - 1;
      float k = fi / max(nL - 1.0, 1.0);
      vec2 b0 = a + dd * l * (term ? 1.0 : 0.14 + 0.8 * k);
      float sideL = mod(fi, 2.0) < 0.5 ? 1.0 : -1.0;
      vec2 ld = term ? dd : normalize(rot2(dd, sideL * (0.6 + 0.45 * hsh(sd, 13.0))));
      ld = normalize(ld + vec2(0.0, 0.1) + (vec2(hsh(sd, 17.0), hsh(sd, 18.0)) - 0.5) * 0.25);
      vec2 b = b0 + ld * (0.012 + 0.008 * hsh(sd, 14.0));
      float L = (0.115 + 0.035 * hsh(sd, 15.0)) * leafScale * (1.0 - 0.2 * k) * (0.78 + 0.22 * hsh(sd, 19.0));
      float wr = wrBase * (0.85 + 0.25 * hsh(sd, 16.0)) * (0.8 + 0.2 * hsh(sd, 21.0));
      leaf(p, b, ld, L, wr, sd, (fj * nL + fi + nM) / 64.0, false, term ? 0.95 : 0.1 + 0.55 * k + 0.25 * fj / nT);
    }
  }
}

vec4 bake(vec2 uv) {
  vec2 cell = floor(uv * 2.0);
  vec2 p = fract(uv * 2.0);
  float cid = cell.x + cell.y * 2.0;
  cluster(p, cid);
  // clean gutter at the cell borders (no clipping seams / neighbour bleed)
  float gut = smoothstep(0.0, 0.03, p.x) * (1.0 - smoothstep(0.97, 1.0, p.x)) * smoothstep(0.0, 0.015, p.y) * (1.0 - smoothstep(0.985, 1.0, p.y));
  float A = gA * gut;
  float wOk = step(1e-5, gW);
  if (uMode == 0) {
    vec3 c = wOk > 0.5 ? gC / gW : vec3(0.05, 0.085, 0.024);
    return vec4(max(c, vec3(0.0)), A);
  }
  if (uMode == 1) {
    vec3 n = wOk > 0.5 ? gN / gW : vec3(0.0, 0.0, 1.0);
    n = normalize(mix(vec3(0.0, 0.0, 1.0), n, clamp(gW * 1.5, 0.0, 1.0)) + vec3(0.0, 0.0, 1e-4));
    return vec4(n * 0.5 + 0.5, 1.0);
  }
  vec3 o = wOk > 0.5 ? gO / gW : vec3(1.0, 0.6, 0.6);
  return vec4(clamp(o, 0.0, 1.0), 1.0);
}
`,Ze=`
varying vec2 vUv;
void main() { vUv = uv; gl_Position = vec4(position.xy, 0.0, 1.0); }
`;function Qe(t){let r=Math.min(t.quality.cinematic?4096:2048,(t.quality.textureSize||1024)*2),o=t.renderer;if(!o){let e=()=>new _;return{map:e(),normalMap:e(),dataMap:e(),size:r,ready:Promise.resolve(),bake(){},stats:{}}}let l=Math.round(Math.log2(r))+1,m=Math.min(t.quality.anisotropy??8,o.capabilities.getMaxAnisotropy()),h=(t,n)=>{let o=new f(r,r,{type:a,format:e,colorSpace:t?s:``,depthBuffer:!1,stencilBuffer:!1,generateMipmaps:!1,minFilter:i,magFilter:c,wrapS:u,wrapT:u,anisotropy:m});return o.texture.mipmaps=Array.from({length:l},()=>({})),o.texture.name=n,o},g=[h(!0,`leafAtlas.map`),h(!1,`leafAtlas.normal`),h(!1,`leafAtlas.orm`)],y=new w({uniforms:{uPx:{value:2/r},uMode:{value:0},uNStem:{value:10},uNTwig:{value:6},uNLeaf:{value:9},uNMain:{value:9},uNVine:{value:11}},vertexShader:Ze,fragmentShader:`precision highp float;\nprecision highp int;\nvarying vec2 vUv;\n${N}\n${Xe}\nvoid main(){ gl_FragColor = bake(vUv); }`,depthTest:!1,depthWrite:!1});y.name=`leafAtlasBake`;let b=new d(new v(2,2),y);b.frustumCulled=!1;let x=new p;x.add(b);let S=new n(-1,1,1,-1,0,1),C={parallel:!!o.extensions.get(`KHR_parallel_shader_compile`),compileMs:0,bakeMs:0},T=performance.now(),E=o.getRenderTarget(),D;try{o.setRenderTarget(g[1]),D=o.compileAsync?o.compileAsync(x,S):(o.compile(x,S),Promise.resolve())}finally{o.setRenderTarget(E)}D=D.then(()=>{C.compileMs=Math.round(performance.now()-T)});let O=!1;function k(){if(O)return;O=!0;let e=performance.now(),t=o.getRenderTarget(),n=o.autoClear;o.autoClear=!1;try{for(let e=0;e<3;e++){y.uniforms.uMode.value=e;let t=g[e];for(let e=0;e<l;e++){let n=Math.max(1,r>>e);y.uniforms.uPx.value=2/n,t.viewport.set(0,0,n,n),t.scissor.set(0,0,n,n),o.setRenderTarget(t,0,e),o.render(x,S)}t.viewport.set(0,0,r,r),t.scissor.set(0,0,r,r)}}finally{o.setRenderTarget(t),o.autoClear=n}y.dispose(),b.geometry.dispose(),C.bakeMs=Math.round(performance.now()-e)}return{map:g[0].texture,normalMap:g[1].texture,dataMap:g[2].texture,size:r,ready:D,bake:k,stats:C}}function $e(e=!1){let n=.13,r=new g;if(e){let e=.11,t=[],i=[],a=[];for(let r=0;r<3;r++)for(let o=0;o<3;o++){let s=o*.5-.5,c=r*.5-.5,l=n*2*Math.abs(s)+e*(1-4*c*c)-e*.5;t.push(s,c,l),i.push(s+.5,c+.5);let u=o===1?0:Math.sign(s)*2*n,d=-8*e*c,f=Math.hypot(u,d,1);a.push(-u/f,-d/f,1/f)}let s=[];for(let e=0;e<2;e++)for(let t=0;t<2;t++){let n=e*3+t;s.push(n,n+1,n+3,n+1,n+4,n+3)}return r.setAttribute(`position`,new o(t,3)),r.setAttribute(`uv`,new o(i,2)),r.setAttribute(`normal`,new o(a,3)),r.setIndex(s),r}let i=new Float32Array([-.5,-.5,n,0,-.5,0,.5,-.5,n,-.5,.5,n,0,.5,0,.5,.5,n]),a=new Float32Array([0,0,.5,0,1,0,0,1,.5,1,1,1]),s=Math.hypot(n,.5),c=[n/s,0,.5/s],l=[-.13/s,0,.5/s],u=new Float32Array([...c,0,0,1,...l,...c,0,0,1,...l]);return r.setAttribute(`position`,new t(i,3)),r.setAttribute(`uv`,new t(a,2)),r.setAttribute(`normal`,new t(u,3)),r.setIndex([0,1,3,1,4,3,1,2,4,2,5,4]),r}var et={uTreeEye:{value:new x},uLeafLodD0:{value:36},uLeafLodMin:{value:.15},tLeafData:{value:null},uLeafTrans:{value:new l(.9,1,.3)},uLeafTransStrength:{value:1},uLeafTransLobe:{value:new x(.42,1.1,.3)},uLeafSkyTrans:{value:.55},uLeafBacklit:{value:new b(.2,.25)}},tt=2.6;function nt(e){let t=Math.max(e,1),n=(et.uLeafLodD0.value/t)**1.15;return Math.min(1,Math.max(et.uLeafLodMin.value,n))}var rt=`
attribute vec4 aClump;   // xyz clump centre (model space), w = branch flex
attribute vec4 aInfo;    // x = LOD rank, y = atlas variant, z = crown AO, w = tint
attribute float aHang;   // pendulum length (vine leaves)
uniform vec3 uTreeEye;
uniform float uLeafLodD0;
uniform float uLeafLodMin;
${Je}
float leafLodFrac() {
  vec3 wc = (modelMatrix * vec4(aClump.xyz, 1.0)).xyz;
  float d = max(distance(uTreeEye, wc), 1.0);
  return clamp(pow(uLeafLodD0 / d, 1.15), uLeafLodMin, 1.0);
}
`,it=`
float lodF = leafLodFrac();
float lodVis = 1.0 - smoothstep(lodF * 0.8, lodF, aInfo.x);
float lodGrow = min(inversesqrt(lodF), ${tt.toFixed(2)});
vec3 transformed = position * (lodVis * lodGrow);
float flut = sin(uTime * (5.0 + aInfo.w * 3.0) + aClump.w * 7.0 + aInfo.x * 211.0 + position.y * 2.0);
transformed.z += flut * 0.05 * uWindStrength * (0.25 + abs(position.x) + position.y + 0.5) * lodGrow;
`,at=`
#include <uv_vertex>
vec2 atlasOff = vec2(mod(aInfo.y, 2.0), floor(aInfo.y * 0.5 + 0.01)) * 0.5;
#ifdef USE_MAP
vMapUv = vMapUv * 0.5 + atlasOff;
#endif
#ifdef USE_NORMALMAP
vNormalMapUv = vNormalMapUv * 0.5 + atlasOff;
#endif
`,ot=`
vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_INSTANCING
mvPosition = instanceMatrix * mvPosition;
#endif
vec3 leafWind = treeWind(modelMatrix[3].xyz, aClump.xyz, aClump.w, aHang);
mvPosition.xyz += leafWind;
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;
`,st=`
#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
vec4 worldPosition = vec4( transformed, 1.0 );
#ifdef USE_INSTANCING
worldPosition = instanceMatrix * worldPosition;
#endif
worldPosition.xyz += leafWind;
worldPosition = modelMatrix * worldPosition;
#endif
`,ct=`
#include <defaultnormal_vertex>
{
  vec3 vpM = (instanceMatrix * vec4(position, 1.0)).xyz;
  vec3 sph = normalize(vpM - aClump.xyz + vec3(0.0, 0.25, 0.0));
  vec3 crownN = normalize(aClump.xyz * vec3(1.0, 1.7, 1.0) + vec3(0.0, 0.5, 0.0));
  vec3 geoN = normalize(mat3(instanceMatrix) * objectNormal);
  vec3 cardN = geoN * sign(dot(geoN, sph) + 1e-3);
  vec3 bent = normalize(cardN * 0.2 + sph * 0.5 + crownN * 0.42);
  transformedNormal = normalMatrix * bent;
  float outer = clamp(dot(sph, crownN) * 0.5 + 0.5, 0.0, 1.0);
  vLeafInfo = vec4(aInfo.z * (0.8 + 0.2 * outer), aInfo.w, aInfo.y, geoN.y);
}
`,lt=`
varying vec4 vLeafInfo;
uniform sampler2D tLeafData;
uniform vec3 uLeafTrans;
uniform float uLeafTransStrength;
uniform vec3 uLeafTransLobe;
uniform float uLeafSkyTrans;
uniform vec2 uLeafBacklit;
vec3 gLeafAlbedo;
float gLeafThick;
float gLeafUnder;
`,ut=`
#include <lights_physical_pars_fragment>
// normal for the specular terms: the bent (volume) normals are two-sided and
// face away from the eye on the far side of a clump; specular evaluated there
// is taken at grazing incidence (Fresnel -> 1, Smith visibility -> 1 / alpha)
// and throws a sun- / sky-coloured sheen over leaves seen against the light.
// The blades that face the eye there are what reflects: turn it toward the eye.
vec3 leafSpecNormal( const in vec3 n, const in vec3 v ) {
  float nv = dot( n, v );
  return nv < 0.35 ? normalize( n + v * ( 0.35 - nv ) ) : n;
}
void RE_Direct_Leaf( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
  vec3 L = directLight.direction;
  float fw = clamp(dot(-geometryViewDir, L), 0.0, 1.0);
  // Looking toward the light, the viewer and the light are on opposite sides
  // of nearly every blade (a random plane separates them with probability
  // angle / pi): we see the unlit face, lit only by what crosses the leaf.
  // The bent (volume) normal would still show the sunlit reflection there
  // (pale lemon rims on the sun side of a crown seen from below), so fade the
  // reflected sun out and leave the transmission lobes below.
  float seeLit = 1.0 - uLeafBacklit.y * smoothstep(0.15, 0.95, fw);
  // diffuse on the smooth volume normal (RE_Direct_Physical, glTF fresnel_mix)
  vec3 irradiance = saturate( dot( geometryNormal, L ) ) * directLight.color;
  vec3 halfDir = normalize( L + geometryViewDir + vec3( 0.0, 1e-5, 0.0 ) );
  vec3 Fd = F_Schlick( material.specularColor, material.specularF90, saturate( dot( geometryViewDir, halfDir ) ) );
  reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseContribution ) * ( 1.0 - Fd ) * seeLit;
  // specular on the eye-facing normal
  vec3 nS = leafSpecNormal( geometryNormal, geometryViewDir );
  reflectedLight.directSpecular += saturate( dot( nS, L ) ) * directLight.color * BRDF_GGX( L, geometryViewDir, nS, material ) * material.multiScatteringCompensation * mix( 1.0, seeLit, 0.5 );
  float back = clamp(dot(-geometryNormal, directLight.direction) * 0.6 + 0.4, 0.0, 1.0);
  float f2 = fw * fw; float f4 = f2 * f2; float f8 = f4 * f4;
  vec3 tcol = gLeafAlbedo * uLeafTrans;
  reflectedLight.directDiffuse += directLight.color * tcol * gLeafThick * uLeafTransStrength * (uLeafTransLobe.x * back + uLeafTransLobe.y * f8 + uLeafTransLobe.z * f2) * RECIPROCAL_PI;
}
#undef RE_Direct
#define RE_Direct RE_Direct_Leaf
`,dt=`
#include <map_fragment>
{
  // leaves below a texel at the deepest levels: small coverage boost
  vec2 dx = dFdx(vMapUv * LEAF_ATLAS_PX), dy = dFdy(vMapUv * LEAF_ATLAS_PX);
  float mip = 0.5 * log2(max(max(dot(dx, dx), dot(dy, dy)), 1e-6));
  diffuseColor.a *= 1.0 + max(mip - 5.0, 0.0) * 0.12;
  // per-clump tint: 0 deep green .. 1 sun-bleached olive
  float tn = vLeafInfo.y * 2.0 - 1.0;
  diffuseColor.rgb *= mix(vec3(0.84, 0.92, 0.82), vec3(1.16, 1.1, 0.82), vLeafInfo.y);
  diffuseColor.rgb *= 0.94 + 0.1 * tn * tn;
  // sunlight that crossed the blade takes the upper-side (chlorophyll)
  // colour, not the paler underside sheen below
  gLeafAlbedo = diffuseColor.rgb;
  // the visible side faces down: we see leaf undersides (paler, matte)
  float visY = gl_FrontFacing ? vLeafInfo.w : -vLeafInfo.w;
  gLeafUnder = smoothstep(0.15, -0.45, visY);
  diffuseColor.rgb = mix(diffuseColor.rgb, diffuseColor.rgb * vec3(1.2, 1.24, 1.02) + vec3(0.010, 0.013, 0.004), gLeafUnder * 0.85);
}
vec4 leafData = texture2D(tLeafData, vMapUv);
gLeafThick = leafData.b * (1.0 + uLeafBacklit.x * gLeafUnder);
`,ft=`
#ifdef USE_ALPHATEST
  #ifdef ALPHA_TO_COVERAGE
  diffuseColor.a = clamp((diffuseColor.a - alphaTest) / max(fwidth(diffuseColor.a), 1e-4) + 0.5, 0.0, 1.0);
  if (diffuseColor.a <= 0.0) discard;
  #else
  if (diffuseColor.a < alphaTest) discard;
  #endif
#endif
`,pt=`
float roughnessFactor = mix(roughness * leafData.g, 0.82, gLeafUnder);
`,mt=`
#if defined( USE_ENVMAP ) && defined( RE_IndirectDiffuse )
  iblIrradiance += getIBLIrradiance( -geometryNormal ) * uLeafTrans * ( gLeafThick * uLeafSkyTrans );
#endif
#ifdef STANDARD
{
  // The bent (volume) normals are two-sided: on the far side of a clump they
  // face away from the eye, and the sky reflection + Fresnel would be taken at
  // grazing incidence, mirroring the sky BEHIND the leaves - the blinding
  // circumsolar sky when looking toward the sun - as a white sheen over the
  // backlit rims. The blades that face the eye there reflect the sky around the
  // viewer: re-evaluate the specular with the normal turned toward the eye.
  if ( dot( geometryNormal, geometryViewDir ) < 0.35 ) {
    vec3 nS = leafSpecNormal( geometryNormal, geometryViewDir );
    material.dfg = texture2D( dfgLUT, vec2( material.roughness, saturate( dot( nS, geometryViewDir ) ) ) ).rg;
    #if defined( USE_ENVMAP ) && defined( RE_IndirectSpecular )
    radiance = getIBLRadiance( geometryViewDir, nS, material.roughness );
    #endif
  }
}
#endif
#include <lights_fragment_end>
`,ht=`
{
  float ambientOcclusion = mix(0.35, 1.0, leafData.r * vLeafInfo.x);
  reflectedLight.indirectDiffuse *= ambientOcclusion;
  #if defined( USE_ENVMAP ) && defined( STANDARD )
    float dotNV = saturate( dot( geometryNormal, geometryViewDir ) );
    reflectedLight.indirectSpecular *= computeSpecularOcclusion( dotNV, ambientOcclusion, material.roughness );
  #endif
  // crown self-occlusion also dims direct light a little (inner leaves)
  reflectedLight.directDiffuse *= mix(0.7, 1.0, vLeafInfo.x);
}
`;function gt(e,t){let n=e.vertexShader;n=n.replace(`#include <common>`,`#include <common>
`+rt+(t?`varying vec4 vLeafInfo;
`:``)),n=n.replace(`#include <begin_vertex>`,it),n=n.replace(`#include <uv_vertex>`,at),n=n.replace(`#include <project_vertex>`,ot),n=n.replace(`#include <worldpos_vertex>`,st),t&&(n=n.replace(`#include <defaultnormal_vertex>`,ct)),e.vertexShader=n}function _t(e,t){et.tLeafData.value=t.dataMap,et.uLeafLodD0.value=36*(e.quality.treeLeafLOD??1);let n=new y({map:t.map,normalMap:t.normalMap,normalScale:new b(.8,.8),roughness:1,metalness:0,alphaTest:.5,alphaToCoverage:(e.quality.msaa??0)>0,side:2,envMapIntensity:.92});n.name=`treeLeaves`,n.onBeforeCompile=n=>{for(let e of[`uTreeEye`,`uLeafLodD0`,`uLeafLodMin`,`tLeafData`,`uLeafTrans`,`uLeafTransStrength`,`uLeafTransLobe`,`uLeafSkyTrans`,`uLeafBacklit`])n.uniforms[e]=et[e];for(let t of[`uTime`,`uWindDir`,`uWindStrength`])n.uniforms[t]=e.G[t];gt(n,!0);let r=n.fragmentShader;r=r.replace(`#include <common>`,`#include <common>\n#define LEAF_ATLAS_PX ${t.size.toFixed(1)}\n`+lt),r=r.replace(`#include <lights_physical_pars_fragment>`,ut),r=r.replace(`#include <map_fragment>`,dt),r=r.replace(`#include <alphatest_fragment>`,ft),r=r.replace(`#include <roughnessmap_fragment>`,pt),r=r.replace(`#include <lights_fragment_end>`,mt),r=r.replace(`#include <aomap_fragment>`,ht),r=r.replace(`#include <normal_fragment_begin>`,E.normal_fragment_begin.replace(`gl_FrontFacing ? 1.0 : - 1.0`,`1.0`)),n.fragmentShader=r},n.customProgramCacheKey=()=>`treeLeaves4`,e.patchMaterial(n);let r=new C;return r.name=`treeLeavesDepth`,r.onBeforeCompile=t=>{for(let e of[`uTreeEye`,`uLeafLodD0`,`uLeafLodMin`])t.uniforms[e]=et[e];for(let n of[`uTime`,`uWindDir`,`uWindStrength`])t.uniforms[n]=e.G[n];gt(t,!1)},r.customProgramCacheKey=()=>`treeLeavesDepth2`,r.userData.noPatch=!0,{mat:n,depth:r}}function vt(e,t,n,r,i){let a=n.n,o=e.clone(),s=new S(o,t.mat,a);s.instanceMatrix.array.set(n.mat.subarray(0,a*16)),o.setAttribute(`aClump`,new h(n.clump.slice(0,a*4),4)),o.setAttribute(`aInfo`,new h(n.info.slice(0,a*4),4)),o.setAttribute(`aHang`,new h(n.hang.slice(0,a),1)),s.instanceMatrix.needsUpdate=!0,s.position.copy(r),s.customDepthMaterial=t.depth,s.castShadow=!0,s.receiveShadow=!0,s.name=i;let c=n.maxR*1.05+1.5;return s.boundingSphere=new m(new x,c),s.geometry.boundingSphere=new m(new x,c),s.userData.total=a,s.matrixAutoUpdate=!1,s.updateMatrix(),s}var yt=x,bt=1.35,xt=.86;function St(e){return{n:0,cap:e,mat:new Float32Array(e*16),clump:new Float32Array(e*4),info:new Float32Array(e*4),hang:new Float32Array(e),maxR:0}}function Ct(e){let t=e.cap*2,n=(e,n)=>{let r=new Float32Array(t*n);return r.set(e),r};e.mat=n(e.mat,16),e.clump=n(e.clump,4),e.info=n(e.info,4),e.hang=n(e.hang,1),e.cap=t}function wt(e,t,n,r,i,a,o,s,c,l,u,d,f,p,m,h){e.n>=e.cap&&Ct(e);let g=e.n++,_=e.mat,v=g*16;_[v]=t.x*i,_[v+1]=t.y*i,_[v+2]=t.z*i,_[v+3]=0,_[v+4]=n.x*i,_[v+5]=n.y*i,_[v+6]=n.z*i,_[v+7]=0,_[v+8]=r.x*i,_[v+9]=r.y*i,_[v+10]=r.z*i,_[v+11]=0,_[v+12]=a,_[v+13]=o,_[v+14]=s,_[v+15]=1;let y=e.clump,b=g*4;y[b]=c,y[b+1]=l,y[b+2]=u,y[b+3]=d;let x=e.info;x[b+1]=p,x[b+2]=m,x[b+3]=h,e.hang[g]=f||0;let S=Math.sqrt(a*a+o*o+s*s)+i*2.2;S>e.maxR&&(e.maxR=S)}function Tt(e,t){let n=e.n,r=new Uint32Array(n);for(let e=0;e<n;e++)r[e]=e;for(let e=n-1;e>0;e--){let n=Math.floor(t()*(e+1)),i=r[e];r[e]=r[n],r[n]=i}let i=new Float32Array(n*16),a=new Float32Array(n*4),o=new Float32Array(n*4),s=new Float32Array(n),c=e.mat,l=e.clump,u=e.info;for(let t=0;t<n;t++){let d=r[t],f=d*16,p=t*16;for(let e=0;e<16;e++)i[p+e]=c[f+e];let m=d*4,h=t*4;a[h]=l[m],a[h+1]=l[m+1],a[h+2]=l[m+2],a[h+3]=l[m+3],o[h]=(t+.5)/n,o[h+1]=u[m+1],o[h+2]=u[m+2],o[h+3]=u[m+3],s[t]=e.hang[d]}e.mat=i,e.clump=a,e.info=o,e.hang=s,e.cap=n}function Et(e){return(Math.abs(e.y)<.9?new yt(0,1,0).cross(e):new yt(1,0,0).cross(e)).normalize()}var Dt=new yt,Ot=new yt,kt=new yt,At=new yt,jt=new yt,Mt=new yt;function Nt(e,t,n){let{spec:r,rng:i,density:a,cardSize:o,cc:s}=n,c=Math.max(3,Math.round((6.5+i()*3)*a*bt)),l=k(.5+(i()-.5)*.9+r.tintBias,0,1),u=Ye(r,t.p.x,t.p.y,t.p.z);At.set(t.p.x-s[0],0,t.p.z-s[1]),At.lengthSq()<1e-6&&At.set(1,0,0),At.normalize();let d=t.face||null;for(let n=0;n<c;n++){let r=n<c*.75,a=O(-.55,1,Math.sqrt(i())),s=i()*Math.PI*2,f=Math.sqrt(Math.max(0,1-a*a));jt.set(f*Math.cos(s),a,f*Math.sin(s)).addScaledVector(At,.35),d&&jt.addScaledVector(d,.6),jt.normalize();let p=r?t.r*(.45+.25*i()):t.r*.4*Math.cbrt(i()),m=o*(.75+i()*.5);r?Ot.copy(jt).add(Mt.set(i()-.5,i()-.5,i()-.5).multiplyScalar(.9)):Ot.set(i()-.5,i()-.3,i()-.5),Ot.lengthSq()<1e-6&&Ot.set(0,1,0),Ot.normalize();let h=(i()-.5)*2.4;Dt.set(Math.sin(h)*.8,1,Math.cos(h)*.8-.8).addScaledVector(jt,.6),Dt.addScaledVector(Ot,-Dt.dot(Ot)),Dt.lengthSq()<1e-6&&Dt.copy(Et(Ot)),Dt.normalize(),kt.crossVectors(Dt,Ot).normalize(),wt(e,kt,Dt,Ot,m,t.p.x+jt.x*p,t.p.y+jt.y*p,t.p.z+jt.z*p,t.p.x,t.p.y,t.p.z,u,0,Math.floor(i()*2.999),k(t.ao*(r?.97+.03*i():.86),.22,1),k(l+(i()-.5)*.1,0,1))}}var Pt=x,Ft=new Pt(0,1,0),$=.25,It=.5,Lt=.35,Rt=1.6;function zt(e,t,n,r=It){let i=new Pt().crossVectors(Ft,n).normalize(),a=new Pt().crossVectors(n,i).normalize(),o=t.cc,s=e.crownR*1.3,c=e.crownBaseH+.5,l=e.topH+.5,u=1/0,d=-1/0,f=1/0,p=-1/0,m=new Pt;for(let e of[-1,1])for(let t of[-1,1])for(let n of[c-2,l]){m.set(o[0]+e*s,n,o[1]+t*s);let r=m.dot(i),c=m.dot(a);u=Math.min(u,r),d=Math.max(d,r),f=Math.min(f,c),p=Math.max(p,c)}--u,--f,d+=1,p+=1;let h=Math.ceil((d-u)/$),g=Math.ceil((p-f)/$),_=h*g,v=new Float32Array(_),y=new Float32Array(_),b=new Float32Array(_).fill(NaN),x=new Pt(o[0],(c+l)*.5,o[1]),S=Math.hypot(s,(l-c)*.5+1),C=x.dot(n),w=.3,T=new Pt,E=e=>e.y>c&&e.y<l&&t.crownDepth(e)>0;for(let e=0;e<g;e++)for(let t=0;t<h;t++){let r=u+(t+.5)*$,o=f+(e+.5)*$,s=0,c=NaN;for(let e=C+S;e>=C-S;e-=w)T.set(i.x*r+a.x*o+n.x*e,i.y*r+a.y*o+n.y*e,i.z*r+a.z*o+n.z*e),E(T)&&(s+=w,c!==c&&(c=e));let l=e*h+t;y[l]=s,b[l]=c}let D={U:i,V:a,L:n,u0:u,v0:f,nx:h,ny:g,logT:v,chord:y,entry:b,cell:$};D.addCards=(e,t,n)=>{let o=e.mat;for(let e=t;e<n;e++){let t=e*16,n=o[t]*i.x+o[t+1]*i.y+o[t+2]*i.z,s=o[t]*a.x+o[t+1]*a.y+o[t+2]*a.z,c=o[t+4]*i.x+o[t+5]*i.y+o[t+6]*i.z,l=o[t+4]*a.x+o[t+5]*a.y+o[t+6]*a.z,d=n*l-s*c,p=o[t]*o[t]+o[t+1]*o[t+1]+o[t+2]*o[t+2];if(Math.abs(d)<.03*p)continue;let m=o[t+12]*i.x+o[t+13]*i.y+o[t+14]*i.z,_=o[t+12]*a.x+o[t+13]*a.y+o[t+14]*a.z,y=.5*(Math.abs(n)+Math.abs(c)),b=.5*(Math.abs(s)+Math.abs(l)),x=Math.max(0,Math.floor((m-y-u)/$)),S=Math.min(h-1,Math.floor((m+y-u)/$)),C=Math.max(0,Math.floor((_-b-f)/$)),w=Math.min(g-1,Math.floor((_+b-f)/$)),T=1/d;for(let e=C;e<=w;e++){let t=f+(e+.5)*$-_;for(let i=x;i<=S;i++){let a=u+(i+.5)*$-m,o=Math.abs((a*l-t*c)*T),d=Math.abs((n*t-s*a)*T),f=Math.max(o,d);if(f>=.5)continue;let p=r*(1-A(.22,.5,Math.hypot(o,d)*.85+f*.15));p>.001&&(v[e*h+i]+=Math.log(1-p))}}}},D.addWood=t=>{let n=new Pt,r=(e,t,n,r)=>{let o=e*i.x+t*i.y+n*i.z,s=e*a.x+t*a.y+n*a.z,c=Math.max(0,Math.floor((o-r-u)/$)),l=Math.min(h-1,Math.floor((o+r-u)/$)),d=Math.max(0,Math.floor((s-r-f)/$)),p=Math.min(g-1,Math.floor((s+r-f)/$));for(let e=d;e<=p;e++)for(let t=c;t<=l;t++){let n=u+(t+.5)*$-o,i=f+(e+.5)*$-s;n*n+i*i<=r*r&&(v[e*h+t]=Math.min(v[e*h+t],-8))}};for(let t=0;t<=e.forkH;t+=.3)e.axisAt(t,n),r(n.x,t,n.z,e.radiusAt(t)*.95);for(let e of t)for(let t=0;t<e.pts.length;t++){let n=e.rad[t];if(n<.08)break;let i=e.pts[t],a=e.pts[Math.min(e.pts.length-1,t+1)],o=Math.max(1,Math.ceil(i.distanceTo(a)/Math.max(n,$)));for(let e=0;e<o;e++){let t=e/o;r(i.x+(a.x-i.x)*t,i.y+(a.y-i.y)*t,i.z+(a.z-i.z)*t,n)}}};let O=new Uint8Array(_),k=Math.log(.5);function j(){O.fill(0);let e=new Int32Array(h).fill(g),t=new Int32Array(h).fill(-1);for(let n=0;n<h;n++){let r=0;for(let t=0;t<g;t++)if(r=v[t*h+n]<k?r+1:0,r>=3){e[n]=t-3+1;break}r=0;for(let e=g-1;e>=0;e--)if(r=v[e*h+n]<k?r+1:0,r>=3){t[n]=e+3-1;break}}for(let n=0;n<g;n++){let r=h,i=-1,a=0;for(let e=0;e<h;e++)if(a=v[n*h+e]<k?a+1:0,a>=3){r=e-3+1;break}a=0;for(let e=h-1;e>=0;e--)if(a=v[n*h+e]<k?a+1:0,a>=3){i=e+3-1;break}for(let a=Math.max(r,0);a<=i;a++)n>=e[a]&&n<=t[a]&&(O[n*h+a]=1)}}return D.inside=O,D.gaps=(e,t=Lt)=>{j();let n=Math.log(t),r=e=>O[e]&&y[e]>=Rt&&v[e]>n,i=new Uint8Array(_),a=[],o=0,s=[];for(let t=0;t<_;t++){if(i[t]||!r(t))continue;let n=[];for(s.push(t),i[t]=1;s.length;){let e=s.pop();n.push(e);let t=e%h,a=(e-t)/h,o=[t>0?e-1:-1,t<h-1?e+1:-1,a>0?e-h:-1,a<g-1?e+h:-1];for(let e of o)e<0||i[e]||r(e)&&(i[e]=1,s.push(e))}let c=n.length*$*$;c>=e&&(a.push({cells:n,area:c}),o+=c)}return a.sort((e,t)=>t.area-e.area),{comps:a,area:o}},D}function Bt(e,t,n,r,i,a={}){let o=new Pt().fromArray(i.sunDir).normalize(),s=zt(n,r,o,a.cardA??It);s.addWood(r.all),s.addCards(e,0,e.n);let c=a.minArea??.2,l=a.tGap??Lt,u=a.passes??4,d=D(n.seed*977+331),f=Vt(r.all),p=n.clumpR,m=n.crownBaseH,{U:h,V:g,u0:_,v0:v,nx:y,cell:b}=s,x=s.gaps(c,l).area,S=[],C=new Pt,w=new Pt;for(let n=0;n<u;n++){let{comps:n}=s.gaps(c,l);if(!n.length)break;let a=e.n,u=[];for(let e of n){let t=new Set(e.cells),n=0;for(;t.size*b*b>=c*.5&&n++<40;){let e=0,n=0;for(let r of t)e+=r%y,n+=Math.floor(r/y);e/=t.size,n/=t.size;let a=-1,c=1/0;for(let r of t){let t=(r%y-e)**2+(Math.floor(r/y)-n)**2;t<c&&(c=t,a=r)}let l=a%y,x=Math.floor(a/y),S=_+(l+.5)*b,T=v+(x+.5)*b,E=s.entry[a],D=Math.min(s.chord[a],4.5),O=p*(.8+.3*d()),k=1/0;for(let e=.35;e<=D;e+=.35){let t=E-e;if(C.set(h.x*S+g.x*T+o.x*t,h.y*S+g.y*T+o.y*t,h.z*S+g.z*T+o.z*t),r.crownDepth(C)<=0||C.y<m||C.y<i.surfLocal(C.x,C.z)+2.4||i.cons.blocked(C.x+i.BX,C.y+i.BY,C.z+i.BZ,O*.7))continue;let n=Math.min(f(C),5)+.3*e;n<k&&(k=n,w.copy(C))}let j=((k<1/0?O*.8+.3:b*1.5)/b)**2;for(let e of[...t])(e%y-l)**2+(Math.floor(e/y)-x)**2<=j&&t.delete(e);if(k===1/0)continue;let M=r.crownDepth(w),N=1-.42*A(.2,4.5,M);N*=.74+.26*A(m,m+4,w.y);let P={p:w.clone(),r:O,ao:N,seed:d(),face:o,fill:`sun`};u.push(P)}}for(let e of u)t(e);if(s.addCards(e,a,e.n),S.push(...u),!u.length)break}return{before:x,after:s.gaps(c,l).area,added:S.length,clumps:S,map:s}}function Vt(e){let t=new Map,n=(e,t,n)=>((e+512)*1024+(t+512))*1024+(n+512),r=new Pt;for(let i of e)for(let e=0;e<=i.len;e+=.6){i.sample(e,r);let a=n(Math.floor(r.x/2),Math.floor(r.y/2),Math.floor(r.z/2)),o=t.get(a);o||t.set(a,o=[]),o.push(r.x,r.y,r.z)}return e=>{let r=Math.floor(e.x/2),i=Math.floor(e.y/2),a=Math.floor(e.z/2),o=1/0;for(let s=-1;s<=1;s++)for(let c=-1;c<=1;c++)for(let l=-1;l<=1;l++){let u=t.get(n(r+s,i+c,a+l));if(u)for(let t=0;t<u.length;t+=3){let n=u[t]-e.x,r=u[t+1]-e.y,i=u[t+2]-e.z,a=n*n+r*r+i*i;a<o&&(o=a)}}return Math.sqrt(o)}}var Ht=x,Ut={origin:{nLimbs:5,maxLevel:4,aerial:16,curtains:10,lianas:6,climbers:6,moss:1},nest:{nLimbs:4,maxLevel:4,aerial:9,curtains:7,lianas:4,climbers:4,moss:.9},perch:{nLimbs:3,maxLevel:4,aerial:6,curtains:5,lianas:3,climbers:3,moss:.8},canopy:{nLimbs:5,maxLevel:4,aerial:13,curtains:9,lianas:5,climbers:5,moss:.9}},Wt={spawnTree:{sunFill:!0}};function Gt(e){let{hf:t}=e,n=t.GRID_STEP,r=new Map,i=e.registry.get(`terrain`)?.heightGrid,a=!!(i&&i.grid&&Math.abs(i.step-n)<1e-9),o=a?Math.round(i.x0/n):0,s=a?Math.round(i.z0/n):0,c=(e,c)=>{if(a){let t=e-o,n=c-s;if(t>=0&&n>=0&&t<i.nx&&n<i.nz)return i.grid[n*i.nx+t]}let l=(e+4e4)*8e4+(c+4e4),u=r.get(l);return u===void 0&&(u=t.heightAt(e*n,c*n),r.set(l,u)),u},l=typeof t.lodLevelAt==`function`;function u(e,r){if(l&&t.lodLevelAt(e,r)!==0)return t.groundHeight(e,r);let i=e/n,a=r/n,o=Math.floor(i),s=Math.floor(a),u=i-o,d=a-s,f=c(o,s),p=c(o+1,s),m=c(o,s+1),h=c(o+1,s+1);return u+d<=1?f+(p-f)*u+(m-f)*d:h+(m-h)*(1-u)+(p-h)*(1-d)}let d=null,f=e.registry.get(`rocks`);if(f){let e=f.raycastDown||f.heightAt||f.topAt;typeof e==`function`&&(d=(t,n)=>{try{let r=e.length>=3?e.call(f,t,60,n):e.call(f,t,n);if(typeof r==`number`)return Number.isFinite(r)?r:-1/0;if(r&&typeof r.y==`number`)return r.y;if(r&&r.point&&typeof r.point.y==`number`)return r.point.y;if(Array.isArray(r))return r[1]}catch{d=null}return-1/0})}let p=.2,m=new Map,h=(e,t)=>{let n=(e+1e5)*2e5+(t+1e5),r=m.get(n);if(r===void 0){let i=e*p,a=t*p;if(r=u(i,a),d){let e=d(i,a);e>r&&(r=e)}m.set(n,r)}return r};function g(e,t){if(!d)return u(e,t);let n=e/p,r=t/p,i=Math.floor(n),a=Math.floor(r),o=n-i,s=r-a,c=h(i,a),l=h(i+1,a),f=h(i,a+1),m=h(i+1,a+1);return(c+(l-c)*o)*(1-s)+(f+(m-f)*o)*s}return{surf:g,terrain:u,hasRocks:()=>!!d}}function Kt(e,t,n,r,i,a){let o=D(e.seed*101+1),s;if(t)s=e.groundY;else{s=r.terrain(e.x,e.z);for(let t=0;t<8;t++){let n=t/8*Math.PI*2;s=Math.min(s,r.terrain(e.x+Math.cos(n)*e.r0*1.1,e.z+Math.sin(n)*e.r0*1.1))}s-=.05}let c=t?e.forkY-s:e.forkY,l=e.height,u={r0:e.r0,r1:e.r1,forkY:t?e.forkY:c,groundY:t?s:0},d=t?t=>n.trunkRadiusAt(e,t+s):e=>n.trunkRadiusAt(u,e),f=[0,0];if(!t){let t=Math.hypot(e.x,e.z)||1,n=l*(.05+o()*.07),r=(o()-.5)*.9,i=-e.x/t,a=-e.z/t;f=[(i*Math.cos(r)-a*Math.sin(r))*n,(i*Math.sin(r)+a*Math.cos(r))*n]}let p=(e,n)=>{if(t)return n.set(0,e,0);let r=Math.max(0,e)/c,i=r<=1?r**1.6:1+(r-1)*1.6;return n.set(f[0]*i,e,f[1]*i)},m=e.crown,h=t?Ut[e.id]:{nLimbs:3+e.seed%3,maxLevel:4,aerial:7,curtains:5,lianas:3,climbers:4,moss:.7},g=t?n.HOUSES.find(t=>t.tree===e.id):null,_=g?Math.min(...g.levels.map(e=>e.y)):1/0,v=k(m/12,.7,1.6);return{id:e.id,hero:t,x:e.x,z:e.z,g:s,r0:e.r0,r1:e.r1,forkH:c,topH:l,crownR:m,seed:e.seed,radiusAt:d,axisAt:p,lean:f,crownCenter:t?[0,0]:[f[0]*1.3,f[1]*1.3],nLimbs:h.nLimbs,maxLevel:h.maxLevel,nRoots:k(Math.round(7+e.r0*3),8,16),rootLen:e.r0*3.1+2.6,twigLen:.8+m*.03,clumpR:.9+m*.035,shellDepth:3.5+m*.1,fillFrac:.4,fillAttach:1.6+m*.06,cardSize:(.95+m*.03)*(i.foliageDensity<.8?1.12:1),crownBaseH:t?c*.6:c*.7,clumpBudget:m*m*4.6*(t?1:.95),aerialBunches:h.aerial,vineCurtains:h.curtains,lianas:h.lianas,climbers:h.climbers,hangMax:4+m*.45,pillarChance:t?.2:.3,pillarMaxDrop:t?14:11,climbTop:t?Math.max(1.5,_-s-1.3):c+e.r1*.25,vineLeafScale:1,moss:h.moss,scale:v,trunkArcs:t&&a?a.trunkArcsFor(e.id):[],tintBias:(o()-.5)*.3,sunFill:!t&&!!Wt[e.id]?.sunFill}}var qt=`
varying vec4 vBark;
float gBarkMoss;
float gBarkSoil;
float gBarkLichen;
vec2 gBarkDx, gBarkDy;
float gBarkNear;
float gBarkSelfShadow = 1.0;
uniform sampler2D tBarkHeight;
float ridgeLo(float h) { return smoothstep(0.2, 0.7, h); }
float barkH3(vec3 p) { p = fract(p * vec3(0.1031, 0.1030, 0.0973)); p += dot(p, p.yxz + 33.33); return fract((p.x + p.y) * p.z); }
float barkVN3(vec3 x) {
  vec3 i = floor(x), f = fract(x);
  f = f * f * (3.0 - 2.0 * f);
  return mix(mix(mix(barkH3(i), barkH3(i + vec3(1, 0, 0)), f.x), mix(barkH3(i + vec3(0, 1, 0)), barkH3(i + vec3(1, 1, 0)), f.x), f.y),
             mix(mix(barkH3(i + vec3(0, 0, 1)), barkH3(i + vec3(1, 0, 1)), f.x), mix(barkH3(i + vec3(0, 1, 1)), barkH3(i + vec3(1, 1, 1)), f.x), f.y), f.z);
}
`,Jt=`
gBarkDx = dFdx( vMapUv ); gBarkDy = dFdy( vMapUv );
vec2 barkUv = vMapUv;
float barkDist = length( vViewPosition );
gBarkNear = 1.0 - smoothstep( 6.0, 14.0, barkDist );
#if BARK_POM_STEPS > 0
{
  float pomFade = 1.0 - smoothstep( 10.0, 18.0, barkDist );
  if ( pomFade > 0.0 ) {
    vec3 vp = - vViewPosition;
    vec3 nrm = normalize( vNormal );
    vec3 dp1 = dFdx( vp ), dp2 = dFdy( vp );
    vec3 dp2perp = cross( dp2, nrm ), dp1perp = cross( nrm, dp1 );
    vec3 T = dp2perp * gBarkDx.x + dp1perp * gBarkDy.x;
    vec3 B = dp2perp * gBarkDx.y + dp1perp * gBarkDy.y;
    float tl = length( T ), bl = length( B );
    if ( tl > 1e-8 && bl > 1e-8 ) {
      vec3 V = normalize( vViewPosition );
      vec3 Vts = vec3( dot( V, T / tl ), dot( V, B / bl ), dot( V, nrm ) );
      // grazing views: limit the ray length (offset limiting) and ease the
      // relief out before the silhouette
      pomFade *= smoothstep( 0.05, 0.3, Vts.z );
      vec2 maxOff = - Vts.xy / ( max( Vts.z, 0.0 ) + 0.28 ) * ( BARK_POM_DEPTH * pomFade );
      float nS = floor( mix( float( BARK_POM_STEPS ), float( BARK_POM_STEPS ) * 0.45, Vts.z ) );
      float stepL = 1.0 / nS;
      vec2 dUV = maxOff * stepL;
      float layer = 0.0, prevLayer = 0.0;
      vec2 cuv = barkUv;
      float d = 1.0 - textureGrad( tBarkHeight, cuv, gBarkDx, gBarkDy ).r, prevD = d;
      bool moved = false;
      for ( int i = 0; i < BARK_POM_STEPS; i ++ ) {
        if ( layer >= d || float( i ) >= nS ) break;
        prevD = d; prevLayer = layer;
        cuv += dUV; layer += stepL; moved = true;
        d = 1.0 - textureGrad( tBarkHeight, cuv, gBarkDx, gBarkDy ).r;
      }
      if ( moved ) {
        // refine between the last layer above and the first below the surface
        vec2 lo = cuv - dUV, hi = cuv;
        float loL = prevLayer, hiL = layer;
        for ( int j = 0; j < 5; j ++ ) {
          vec2 mid = 0.5 * ( lo + hi );
          float midL = 0.5 * ( loL + hiL );
          float midD = 1.0 - textureGrad( tBarkHeight, mid, gBarkDx, gBarkDy ).r;
          if ( midL >= midD ) { hi = mid; hiL = midL; d = midD; }
          else { lo = mid; loL = midL; prevD = midD; }
        }
        float ea = prevD - loL, eb = d - hiL;        // > 0 above, <= 0 below the surface
        barkUv = mix( lo, hi, clamp( ea / max( ea - eb, 1e-5 ), 0.0, 1.0 ) );
      }
      #if BARK_SHADOW_STEPS > 0
      // relief self-shadowing: march from the hit point toward the sun; the
      // low evening sun leaves the furrow floors and the lee walls in shade.
      // Soft: the occlusion ramps over a fifth of the relief, weighted down
      // with distance along the ray (penumbra), so no hard banding.
      vec3 Lv = normalize( ( viewMatrix * vec4( uSunDir, 0.0 ) ).xyz );
      vec3 Lts = vec3( dot( Lv, T / tl ), dot( Lv, B / bl ), dot( Lv, nrm ) );
      if ( Lts.z > 0.02 ) {
        float d0 = 1.0 - textureGrad( tBarkHeight, barkUv, gBarkDx, gBarkDy ).r;
        if ( d0 > 0.02 ) {
          const float nL = float( BARK_SHADOW_STEPS );
          vec2 sUV = Lts.xy / ( Lts.z + 0.1 ) * ( BARK_POM_DEPTH * pomFade ) * d0 / nL;
          float occ = 0.0;
          for ( int i = 1; i <= BARK_SHADOW_STEPS; i ++ ) {
            float fi = float( i );
            float rayD = d0 * ( 1.0 - fi / nL );
            float sd = 1.0 - textureGrad( tBarkHeight, barkUv + sUV * fi, gBarkDx, gBarkDy ).r;
            occ = max( occ, ( rayD - sd ) * ( 1.0 - 0.6 * fi / nL ) );
          }
          gBarkSelfShadow = 1.0 - 0.85 * smoothstep( 0.0, 0.2, occ ) * pomFade;
        }
      }
      #endif
    }
  }
}
#endif
#define vMapUv barkUv
#define vNormalMapUv barkUv
#define vRoughnessMapUv barkUv
#define vMetalnessMapUv barkUv
#define vAoMapUv barkUv
`,Yt=`
{
  vec4 ormS = textureGrad( roughnessMap, barkUv, gBarkDx, gBarkDy );
  float hB = textureGrad( tBarkHeight, barkUv, gBarkDx, gBarkDy ).r;
  float crev = 1.0 - ormS.r;
  vec3 wN = normalize( ( vec4( vNormal, 0.0 ) * viewMatrix ).xyz );
  vec3 wp = vLagoonWorldPos;
  #ifdef BARK_DETAIL
  if ( gBarkNear > 0.0 ) {
    // finer copy of the set: breaks up smooth plates at arm's length
    vec3 dA = textureGrad( map, barkUv * 3.17 + vec2( 0.37, 0.61 ), gBarkDx * 3.17, gBarkDy * 3.17 ).rgb;
    vec3 mA = textureLod( map, vec2( 0.5 ), 16.0 ).rgb;
    float dl = dot( dA, vec3( 0.3, 0.59, 0.11 ) ) / max( dot( mA, vec3( 0.3, 0.59, 0.11 ) ), 1e-3 );
    diffuseColor.rgb *= mix( 1.0, clamp( dl, 0.55, 1.6 ), 0.4 * gBarkNear );
  }
  #endif
  // weathering: darker grey-brown runoff streaks and patches (vertically
  // stretched), so a trunk is not one even tone up close
  float stn = barkVN3( wp * vec3( 1.9, 0.28, 1.9 ) + 5.0 ) * 0.7 + barkVN3( wp * vec3( 6.0, 0.9, 6.0 ) ) * 0.3;
  diffuseColor.rgb *= mix( 1.0, 0.72, smoothstep( 0.52, 0.8, stn ) ) * mix( 0.9, 1.08, ridgeLo( hB ) );
  // moss: shaded crevices / wet foot (vertex mask)
  float mm = smoothstep( 0.32, 0.78, vBark.x + crev * 0.45 - 0.12 );
  vec3 moss = vec3( 0.085, 0.098, 0.034 ) * ( 0.7 + 0.6 * ormS.g );
  diffuseColor.rgb = mix( diffuseColor.rgb, moss, mm * 0.9 );
  // sun-weathered bark: raised plates on upward / sun-facing wood bleach to a
  // pale warm grey (the crevices keep the dark inner bark)
  float up = smoothstep( 0.05, 0.85, wN.y );
  float sunF = max( dot( wN, uSunDir ), 0.0 );
  // (limb tops high in the crown; the sun-side term is small: the trunk foot
  // faces the evening sun but lives in the crown's shade most of the day)
  float expo = clamp( up * 0.85 + sunF * 0.2, 0.0, 1.0 ) * smoothstep( 2.5, 7.0, wp.y );
  float ridge = smoothstep( 0.45, 0.82, hB );
  float bn = barkVN3( wp * 0.9 ) * 0.7 + barkVN3( wp * 3.1 ) * 0.3;
  float bleach = expo * ridge * smoothstep( 0.35, 0.75, bn ) * ( 1.0 - mm );
  float lum = dot( diffuseColor.rgb, vec3( 0.3, 0.59, 0.11 ) );
  diffuseColor.rgb = mix( diffuseColor.rgb, vec3( lum ) * vec3( 1.38, 1.34, 1.27 ) + vec3( 0.008, 0.0075, 0.006 ), bleach * 0.5 );
  // crustose lichen: small mottled crusts on exposed plates (lichens want
  // light, moss shade); mostly grey-green, a few orange (Xanthoria)
  float ln = barkVN3( wp * 3.7 + 7.1 ) * 0.55 + barkVN3( wp * 11.0 + 2.3 ) * 0.3 + barkVN3( wp * 47.0 ) * 0.15;
  gBarkLichen = smoothstep( 0.66, 0.69, ln ) * smoothstep( 0.25, 0.7, expo + 0.3 * up * smoothstep( 1.5, 4.0, wp.y ) ) * smoothstep( 0.4, 0.65, hB ) * ( 1.0 - mm ) * ( 1.0 - min( vBark.y, 1.0 ) );
  float orange = step( 0.86, barkVN3( wp * 1.3 + 3.3 ) );
  vec3 lcol = mix( vec3( 0.135, 0.145, 0.112 ), vec3( 0.2, 0.105, 0.028 ), orange ) * ( 0.75 + 0.5 * barkVN3( wp * 90.0 ) );
  diffuseColor.rgb = mix( diffuseColor.rgb, lcol, gBarkLichen * 0.8 );
  // sand dusted into the crevices where roots / the trunk foot meet the ground
  float soilV = max( - vBark.w, 0.0 );
  float sn = barkVN3( wp * 6.0 ) * 0.6 + barkVN3( wp * 19.0 ) * 0.4;
  gBarkSoil = clamp( soilV * ( 0.55 + 0.9 * ( 1.0 - hB ) ) + ( sn - 0.5 ) * 0.5 * soilV, 0.0, 1.0 );
  vec3 sand = vec3( 0.44, 0.37, 0.27 );
  // wet wood: darker and a little more saturated (water fills the pores), still
  // wood; fully submerged wood (vBark.y 1..2) also carries a dark green-brown biofilm
  float wetK = min( vBark.y, 1.0 ), subK = clamp( vBark.y - 1.0, 0.0, 1.0 );
  diffuseColor.rgb = mix( diffuseColor.rgb, sand * mix( 1.0, 0.55, wetK ), gBarkSoil * 0.85 );
  diffuseColor.rgb *= mix( vec3( 1.0 ), vec3( 0.66, 0.62, 0.57 ), wetK );
  diffuseColor.rgb *= mix( vec3( 1.0 ), vec3( 0.62, 0.68, 0.52 ), subK );
  gBarkMoss = mm;
}
`,Xt=`
float crevS = 1.0 - textureGrad( roughnessMap, barkUv, gBarkDx, gBarkDy ).r;
roughnessFactor = mix( roughnessFactor, 0.97, max( gBarkMoss, gBarkSoil ) );
roughnessFactor = mix( roughnessFactor, 0.9, gBarkLichen );
roughnessFactor = mix( roughnessFactor, 0.36, min( vBark.y, 1.0 ) * ( 1.0 - 0.5 * crevS ) );
`,Zt=`
#if defined( BARK_DETAIL ) && defined( USE_NORMALMAP_TANGENTSPACE )
if ( gBarkNear > 0.0 ) {
  vec3 dN = textureGrad( normalMap, barkUv * 3.17 + vec2( 0.37, 0.61 ), gBarkDx * 3.17, gBarkDy * 3.17 ).xyz * 2.0 - 1.0;
  normal = normalize( normal + tbn * vec3( dN.xy * ( 0.5 * gBarkNear ), 0.0 ) );
}
#endif
`,Qt=`
reflectedLight.directDiffuse *= gBarkSelfShadow;
reflectedLight.directSpecular *= gBarkSelfShadow;
`;function $t(e){return e.replace(/texture2D\( map, vMapUv \)/g,`textureGrad( map, vMapUv, gBarkDx, gBarkDy )`).replace(/texture2D\( normalMap, vNormalMapUv \)/g,`textureGrad( normalMap, vNormalMapUv, gBarkDx, gBarkDy )`).replace(/texture2D\( roughnessMap, vRoughnessMapUv \)/g,`textureGrad( roughnessMap, vRoughnessMapUv, gBarkDx, gBarkDy )`).replace(/texture2D\( metalnessMap, vMetalnessMapUv \)/g,`textureGrad( metalnessMap, vMetalnessMapUv, gBarkDx, gBarkDy )`).replace(/texture2D\( aoMap, vAoMapUv \)/g,`textureGrad( aoMap, vAoMapUv, gBarkDx, gBarkDy )`)}function en(e){let t=e.quality,n=e.tex.get(`bark`),r=e.mats.create(`bark`,{vertexColors:!0,pom:!1});r.name=`treeBark`;let i=t.cinematic?3:t.name===`ultra`?2:+(t.name===`high`),a=n.heightMap?[0,14,24,32][i]:0,o=a?[0,6,10,14][i]:0,s=(n.depth??.09)/(n.worldSize||2)*.8,c={value:n.heightMap||null},l=E,u=r.onBeforeCompile;r.onBeforeCompile=function(t,n){u.call(this,t,n);for(let n of[`uTime`,`uWindDir`,`uWindStrength`])t.uniforms[n]=e.G[n];t.uniforms.tBarkHeight=c,t.vertexShader=t.vertexShader.replace(`#include <common>`,`#include <common>
attribute vec4 aBark;
varying vec4 vBark;
`+Je).replace(`#include <begin_vertex>`,`#include <begin_vertex>
transformed += treeWind(modelMatrix[3].xyz, position, aBark.z, aBark.w);
vBark = aBark;`);let r=`#define BARK_POM_STEPS ${a}\n#define BARK_SHADOW_STEPS ${o}\n#define BARK_POM_DEPTH ${s.toFixed(4)}\n${i>=1?`#define BARK_DETAIL
`:``}`;t.fragmentShader=t.fragmentShader.replace(`#include <common>`,`#include <common>
`+r+qt).replace(`#include <map_fragment>`,Jt+$t(l.map_fragment)).replace(`#include <color_fragment>`,`#include <color_fragment>
`+Yt).replace(`#include <roughnessmap_fragment>`,$t(l.roughnessmap_fragment)+Xt).replace(`#include <metalnessmap_fragment>`,$t(l.metalnessmap_fragment)).replace(`#include <normal_fragment_begin>`,`#undef vNormalMapUv
#include <normal_fragment_begin>
#define vNormalMapUv barkUv`).replace(`#include <normal_fragment_maps>`,$t(l.normal_fragment_maps)+Zt).replace(`#include <aomap_fragment>`,Qt+$t(l.aomap_fragment))};let d=r.customProgramCacheKey.bind(r);return r.customProgramCacheKey=()=>d()+`|treeBark7|${a}|${i}`,r.needsUpdate=!0,r}async function tn(e){let{scene:t,layout:n,hf:r,quality:i,collision:a,camera:o}=e,s=performance.now(),c=Gt(e),l=R(n,r,c.terrain),u={surf:c.surf,hf:r,layout:n},f=performance.now(),p=Qe(e);e.tex.register(`leafAtlas`,p.map),e.tex.register(`leafAtlas.normal`,p.normalMap),e.tex.register(`leafAtlas.orm`,p.dataMap);let m=performance.now(),h=_t(e,p),g=performance.now(),_=en(e),v=$e(!!i.cinematic||i.name===`ultra`),y=e.tex.get(`bark`).worldSize||1.6,b=k(i.foliageDensity??1,.3,1.5),x=[...n.HERO_TREES.map(e=>Kt(e,!0,n,c,i,l)),...n.EXTRA_TREES.map(e=>Kt(e,!1,n,c,i,l))],S=[],C=[],w=0,E=0,O=[];for(let o=0;o<x.length;o++){let s=x[o];e.progress(o/x.length,`Growing ${s.id}`),await e.yieldFrame();let f=performance.now(),p=D(s.seed*4099+77),m=_e(s,p),g=l.forArea(s.x,s.z,s.crownR*1.3+s.rootLen+6),M=ge(s,{cons:g,surf:c.surf,hf:r,layout:n}),N=oe(s,m,M.limbPlan.filter(e=>!e.low),M.all.filter(e=>e.level===0&&!e.collar)),P=be(s,m,N,u,g,p),F=Se(s,M,N,g,u,p);await e.yieldFrame();let I=s.x,L=s.g,R=s.z,z=new j(s.seed*7+99),B=new Ht,V=0,ee=-1,te=0,H=new Float32Array(Math.ceil((s.topH+4)/.5)),U={maxDev:0,limbViolations:0},ne=(e,t)=>c.surf(e+I,t+R)-L,re=s.moss,ie=s.r1*1.3+.6,ae=s.hero&&n.HOUSES.find(e=>e.tree===s.id)?.levels||[],W=!1,se=0,G=0,K=0,ce=0;function q(e,t,n){let r=e+I,i=t+L,a=n+R;se=z.noise3(r*.21,i*.21,a*.21),G=z.noise3(r*.8+11,i*.8,a*.8),K=.5+.5*z.noise3(r*.55+3,i*.55,a*.55),ce=t<4?ne(e,n):-1e9}function le(e,t,n,r,i,a,o,c,l,u=0,d=0,f=0){let p=e+I,m=t+L,h=n+R,g=W?se:z.noise3(p*.21,m*.21,h*.21),_=W?G:z.noise3(p*.8+11,m*.8,h*.8),v=.72,y=.68,b=.65,x=k(.35+.65*g,0,1)*(.35+.65*Math.max(0,i))*.2;v+=x*.55,y+=x*.62,b+=x*.72;let S=k(-_-.1,0,1)*.28;v-=S,y-=S,b-=S*.9;let C=1,w=0,T=0,E=0,D=0,O=0,j=W?K:.5+.5*z.noise3(p*.55+3,m*.55,h*.55);if(o===`trunk`||o===`root`){let r=t-(W?ce:ne(e,n)),a=o===`root`?1:1-A(.4,3.2,t),s=1+.16*a;v*=s*(1+.05*a),y*=s,b*=s*(1-.06*a),O=1-A(-.05,o===`root`?.3:.45,r),o===`root`&&(O=Math.max(O,A(.35,.9,i)*.4*(1-A(.25,.9,r)))),O*=k((m+.3)/.3,0,1),C*=o===`root`?.58+.42*A(-.12,Math.min(.45,.15+d*.4),r):.5+.5*A(-.1,1.2,r),T=A(.35,-.15,m),T=Math.max(T,.5*A(.6,.05,m)*(1-A(0,.6,r)))}else o===`wood`&&(v*=1.1,y*=1.1,b*=1.08);if(o===`trunk`){s.axisAt(Math.max(0,t),B);let r=Math.hypot(e-B.x,n-B.z),o=r/N.meanR(t)-1;if(C*=k(1+o*3.2,.45,1.05),w=(1-A(0,2.2,t))*.45*A(.35,.8,j)+A(.5,.95,i)*.35*j+Math.max(0,-a)*.25*j*(1-A(1,7,t)),E=Ye(s,e,t,n),ue&&s.hero&&t>=2&&t<=s.forkH){let e=Math.abs(r/s.radiusAt(t)-1);e>U.maxDev&&(U.maxDev=e)}}else if(o===`root`)w=A(.3,.95,i)*.22*A(.45,.85,j)+Math.max(0,-a)*.22*j,C*=.9+.1*(i*.5+.5);else if(o===`wood`){C*=.78+.22*(i*.5+.5),V>0&&(C*=.72+.28*A(0,V*1.2+.1,u)),w=A(.45,.95,i)*(te<=1?.55:.25)*A(.25,.8,j),E=Ye(s,e,t,n);let r=Math.hypot(e,n);if(ue&&s.hero&&t<s.forkH&&r>s.radiusAt(t)*1.08){for(let e of ae)if(Math.abs(t+L-e.y)<=2.8&&r<=e.outer){U.limbViolations++;break}}}else if(o===`aerial`){v*=1.12,y*=1.02,b*=.92;let r=A(.6,1,f/6);v*=1+.25*r,y*=1-.05*r,E=ee,D=f,t-(W?ce:ne(e,n))<.4&&(C*=.6),T=A(.3,-.1,m)}else o===`vine`&&(v*=.62,y*=.72,b*=.42,E=ee,D=f,w=.15);w=k(w*re,0,1),c[0]=Math.max(.05,v*C),c[1]=Math.max(.05,y*C),c[2]=Math.max(.05,b*C),l[0]=w,l[1]=k(T,0,1)+(o===`trunk`||o===`root`?A(-.05,-.4,m):0),l[2]=E,l[3]=O>.004?-O:D}let ue=!0,de=k(.9+s.r0*.25,1,1.7),fe=null,J=null;function pe(e){let t=new Te(e?8192:32768),n=D(s.seed*31+5),r=2*(s.hero?k(Math.round(s.r0*20),28,64):k(Math.round(s.r0*18),22,44)),i=Math.PI*2*s.radiusAt(s.forkH*.4),a={radial:r,ringScale:1,uRepeat:Math.max(1,Math.round(i/(y*de)))*y,vScale:1/de,vOff:n()*10,shade:le};e&&fe?Me(t,fe,J):fe=Ne(t,s,N,a);let o=e?q:null,c=new Set;for(let t of M.all){let n=t.rad[0];n<(e?.12:t.level>=3?.05:.035)||e&&t.level>1&&n<.2||c.add(t)}let l=e=>e.children.filter(t=>(t.attachS??0)>=e.len-.05);if(!e)for(let e of[...c]){let t=e;for(let e=0;e<6;e++){let e=l(t);if(!e.length||e.some(e=>c.has(e)))break;let n=e[0];for(let t of e)t.rad[0]>n.rad[0]&&(n=t);if(n.rad[0]<.008||n.pts.length<2||M.crownDepth&&M.crownDepth(n.pts[n.pts.length-1])<.6)break;c.add(n),t=n}}for(let r of M.all){let i=r.rad[0],a=n()*10;if(!c.has(r))continue;let o=k(Math.round(i*22)+4,i<.02?4:5,24);e&&(o=Math.max(4,Math.round(o*.55))),V=r.collar||0,te=r.level,W=e||i<.16,qe(t,r.pts,r.rad,{radial:o,uRepeat:Math.max(1,Math.round(Math.PI*2*i/y))*y,vOff:a,collar:V,kind:`wood`,cap:!l(r).some(e=>c.has(e)),shade:le,onRing:W?q:null,step:(r.level>=3?2.5:r.level===2?1.6:1)*(e?1.8:1)})}W=!1,V=0;for(let r of P){let i=r.rad[0],a=n()*10;if(e&&i<.12)continue;let s=k(Math.round(i*20)+6,6,16);e&&(s=Math.max(5,Math.round(s*.55))),W=e,qe(t,r.pts,r.rad,{radial:s,uRepeat:Math.max(1,Math.round(Math.PI*2*i/y))*y,vOff:a,collar:r.collar||0,flat:r.flat,kind:`root`,cap:!0,shade:le,onRing:o,step:e?.9:.5}),W=!1}W=!0;for(let r of[...F.aerial,...F.vines]){if(e&&!r.pillar)continue;let i=r.attach||r.pts[0];ee=Ye(s,i.x,i.y,i.z);let a=r.rad[0];qe(t,r.pts,r.rad,{radial:r.pillar?e?5:8:a>.02?5:4,uRepeat:y*.5,vOff:n()*10,hang:r.hang,kind:r.kind===`aerial`?`aerial`:`vine`,cap:!0,shade:le,onRing:q,step:r.pillar?1.3:2.5})}return W=!1,ue=!1,t}let Y=pe(!1);J=Y;let me=pe(!0),he=new T;he.name=`tree-${s.id}-bark`,he.position.set(I,L,R);let ve=(s.hero?85:70)*(i.treeLeafLOD??1);for(let[e,t,n]of[[Y,0,`near`],[me,ve,`far`]]){let r=new d(e.build(),_);r.castShadow=!0,r.receiveShadow=!0,r.name=`tree-${s.id}-bark-${n}`,r.matrixAutoUpdate=!1,he.addLevel(r,t,t>0?8/t:0)}he.updateMatrix(),he.updateMatrixWorld(!0),t.add(he),w+=Y.triangles,s.hero&&await e.yieldFrame();let ye=St(M.clumps.length*Math.ceil((9.5*b+1)*bt)+F.leaves.length+16),xe=new Ht,Ce=M.cc,we={spec:s,rng:p,density:b,cardSize:s.cardSize*xt,cc:Ce};for(let e of M.clumps)Nt(ye,e,we);for(let e of F.leaves){let t=e.strand.attach||e.p,n=Ye(s,t.x,t.y,t.z);xe.crossVectors(e.up,e.n).normalize();let r=Math.max(0,(e.strand.attach?e.strand.attach.y:e.p.y)-e.p.y);wt(ye,xe,e.up,e.n,e.s,e.p.x,e.p.y,e.p.z,e.p.x,e.p.y,e.p.z,n,e.strand.climber?0:r,3,.8,.35+p()*.3)}let Ee=``,De=null;if(s.sunFill&&e.params?.get?.(`sunfill`)!==`0`){let t=Bt(ye,e=>Nt(ye,e,we),s,M,{cons:g,surfLocal:ne,BX:I,BY:L,BZ:R,sunDir:e.G.uSunDir.value.toArray()});Ee=` sunGaps=${t.before.toFixed(1)}->${t.after.toFixed(1)}m2 (+${t.added} clumps)`,e.params?.has?.(`sundebug`)&&(De={map:t.map,clumps:t.clumps})}Tt(ye,D(s.seed*613+29));let Oe=vt(v,h,ye,new Ht(I,L,R),`tree-${s.id}-leaves`);e.params?.get?.(`treeleaves`)===`0`&&(Oe.visible=!1),t.add(Oe),E+=ye.n;let ke=a?a.count:0,Ae=nn(a,s,N,P,M,F,c,g),je=a?a.count-ke:0,X=rn(s,M,g,c,n);{let e=new Ht;for(let e=0;e<H.length;e++){let t=e*.5+.25,n=0;if(t<=N.yTop)for(let e=0;e<64;e++)n=Math.max(n,N.R(e/64*Math.PI*2,t));H[e]=n}for(let t of M.all)if(!(t.level!==0||t.collar))for(let n=0;n<=t.len;n+=.2){let r=t.sample(n,e);s.axisAt(Math.max(0,e.y),B);let i=Math.hypot(e.x-B.x,e.z-B.z);if(i>ie)break;let a=Math.floor(e.y/.5);a>=0&&a<H.length&&(H[a]=Math.max(H[a],i+r))}for(let e=1;e<H.length;e++)H[e]===0&&(H[e]=H[e-1])}let Z=.25,Pe=Math.floor(N.yTop/Z)*Z,Fe=[];for(let e=Pe;e<=s.topH;e+=Z){let t=[];for(let n of M.all){if(n.level!==0||n.collar)continue;let r=n.pts;for(let i=1;i<r.length;i++){let a=r[i-1],o=r[i];if((a.y-e)*(o.y-e)>0)continue;let s=Math.abs(o.y-a.y)>1e-6?(e-a.y)/(o.y-a.y):0;t.push(a.x+(o.x-a.x)*s,a.z+(o.z-a.z)*s,n.rad[i-1]+(n.rad[i]-n.rad[i-1])*s);break}}Fe.push(t)}let Ie=(e,t)=>{let n=t-L,r=(e-90)*(Math.PI/180);if(n<=N.yTop)return N.R(r,Math.max(n,N.yBottom));let i=Fe[Math.min(Fe.length-1,Math.max(0,Math.round((n-Pe)/Z)))];if(!i||!i.length)return 0;s.axisAt(n,B);let a=Math.cos(r),o=Math.sin(r),c=0;for(let e=0;e<i.length;e+=3)c=Math.max(c,(i[e]-B.x)*a+(i[e+1]-B.z)*o+i[e+2]);return c},Le=0;if(s.hero)for(let e of P)for(let t=0;t<e.pts.length;t++){let n=e.pts[t];n.y+e.rad[t]*Math.sqrt(e.flat?e.flat[t]:1)<ne(n.x,n.z)+.05||g.inZone(n.x+I,n.z+R,e.rad[t]*.3)&&Le++}let Q=new Ht(I+Ce[0],L+(s.forkH+s.topH)*.5,R+Ce[1]),Re={id:s.id,x:I,z:R,groundY:L,hero:s.hero,forkY:L+s.forkH,crownRadius:s.crownR,height:s.topH,trunkRadiusAt:e=>s.radiusAt(e-L),woodRadiusAt:e=>{let t=Math.floor((e-L)/.5);return t<0?s.radiusAt(0):H[Math.min(H.length-1,t)]},axisAt:e=>(s.axisAt(e-L,B),[I+B.x,R+B.z]),surfaceRadiusAt:Ie,hangPoints:X,contract:U,crown:{x:I+Ce[0],z:R+Ce[1],radius:s.crownR,baseY:L+s.crownBaseH,topY:L+s.topH},rootPaths:P.map(e=>e.pts.map((t,n)=>[+(t.x+I).toFixed(3),+(t.y+L).toFixed(3),+(t.z+R).toFixed(3),+e.rad[n].toFixed(3)])),meshes:{bark:he,leaves:Oe},...De?{sunDebug:De}:{}};S.push(Re),C.push({leaves:Oe,crownMid:Q,reach:s.crownR*.95+2}),O.push(`${s.id}: barkTris=${Y.triangles}/${me.triangles} cards=${ye.n} branches=${M.all.length} roots=${P.length} aerial=${F.aerial.length} vines=${F.vines.length} hang=${X.length} col=${je}${s.hero?` stairRootPts=${Le} stairColSkip=${Ae.skipped}`:``}${s.hero?` maxDev=${(U.maxDev*100).toFixed(2)}% limbViol=${U.limbViolations}`:``}${Ee} ${Math.round(performance.now()-f)}ms`)}console.log(`[lagoon] trees: ${x.length} trees, bark ${w} tris, ${E} leaf cards (${E*4} tris) in ${Math.round(performance.now()-s)} ms; rocks=${c.hasRocks()}\n  `+O.join(`
  `));let M=performance.now();await p.ready;let N=performance.now();p.bake(),console.log(`[lagoon] trees timing: atlas setup ${Math.round(m-f)} ms (compile ${p.stats.compileMs} ms parallel=${p.stats.parallel}, waited ${Math.round(N-M)} ms, bake ${p.stats.bakeMs} ms), leafMats ${Math.round(g-m)} ms, loop ${Math.round(M-g)} ms, total ${Math.round(performance.now()-s)} ms`),e.progress(1,`Trees grown`);let P=et.uTreeEye.value;function F(){P.copy(o.position);for(let e=0;e<C.length;e++){let t=C[e],n=nt(Math.max(1,t.crownMid.distanceTo(P)-t.reach)),r=t.leaves.userData.total;t.leaves.count=Math.min(r,Math.ceil(r*n)+16)}}return F(),{trees:S,update:F,order:5,leafUniforms:et}}function nn(e,t,n,r,i,a,o,s){let c={skipped:0};if(!e)return c;let l=t.x,u=t.g,d=t.z,f=new Ht,p=t.forkH+t.r1*.6;for(let r=-.4;r<p;r+=1.2){let i=Math.min(1.2,p-r),a=r+i*.5,o=a<2?Math.min(n.sampledMeanR(a,32),t.radiusAt(Math.max(a,0))):t.radiusAt(a);t.axisAt(Math.max(0,a),f),e.addCylinder([l+f.x,u+r,d+f.z],o,i,20)}for(let t of r){let n=t.pts,r=0;for(;r<n.length-1;){let i=r+1,a=0;for(;i<n.length-1&&a<.9;)a+=n[i].distanceTo(n[i-1]),i++;let f=n[r],p=n[i],m=t.rad[r],h=t.flat?t.flat[r]:1,g=Math.max(f.y,p.y)+m*Math.sqrt(h)*.9,_=(f.x+p.x)*.5,v=(f.z+p.z)*.5,y=o.surf(_+l,v+u*0+d)-u;if(g-y>.12){let t=y-.3,n=p.x-f.x,a=p.z-f.z,o=Math.hypot(n,a);if(o>.05){let y=Math.max(.12,1.6*m/Math.sqrt(h)),b=y*.5+.05;if(s&&(s.inZone(_+l,v+d,b)||s.inZone(f.x+l,f.z+d,b)||s.inZone(p.x+l,p.z+d,b))){c.skipped++,r=i;continue}e.addBox([_+l,u+(g+t)*.5,v+d],[y,g-t,o+y*.4],Math.atan2(n,a))}}r=i}}for(let t of i.all)if(!(t.level>1))for(let n=0;n<t.pts.length-1;n+=2){let r=t.pts[n],i=t.pts[Math.min(t.pts.length-1,n+2)],a=t.rad[n];if(a<.12)break;let s=o.surf((r.x+i.x)*.5+l,(r.z+i.z)*.5+d)-u,c=Math.min(r.y,i.y)-a;if(c-s>2.6)continue;let f=i.x-r.x,p=i.z-r.z,m=Math.hypot(f,p);if(m<.05)continue;let h=Math.max(r.y,i.y)+a;e.addBox([(r.x+i.x)*.5+l,u+(h+c)*.5,(r.z+i.z)*.5+d],[a*1.8,h-c,m+a],Math.atan2(f,p))}for(let t of a.aerial){if(!t.pillar)continue;let n=t.pts[t.pts.length-1];e.addCylinder([n.x+l,n.y+u-.3,n.z+d],Math.max(.08,t.rad[t.rad.length-1]),2.6,8)}return c}function rn(e,t,n,r,i){let a=e.x,o=e.g,s=e.z,c=e.hero?i.HOUSES.find(t=>t.tree===e.id):null,l=[],u=new Ht;for(let e of t.all)if(!(e.level>2))for(let t=.6;t<e.len-.3;t+=1.1){let d=e.sample(t,u);if(d<.1)continue;let f=u.x+a,p=u.z+s,m=u.y+o-d,h=-1/0,g=null,_=!1;if(c){let e=Math.hypot(u.x,u.z),t=null;for(let n of c.levels)e<=n.outer&&n.y<m-1&&(!t||n.y>t.y)&&(t=n);t&&(t.roof&&e<=t.outer+.7?_=!0:(h=t.y,g=`deck`))}if(_)continue;if(g===null){let e=r.terrain(f,p);h=Math.max(e,i.WATER_Y),g=e>i.WATER_Y?`ground`:`water`;for(let e of i.BOARDWALKS){let t=1e9;for(let n=0;n<e.path.length-1;n++){let r=e.path[n],i=e.path[n+1],a=i[0]-r[0],o=i[1]-r[1],s=k(((f-r[0])*a+(p-r[1])*o)/(a*a+o*o),0,1);t=Math.min(t,Math.hypot(r[0]+a*s-f,r[1]+o*s-p))}t<e.width/2&&e.y>h&&(h=e.y,g=`deck`)}}let v=m-h;v<2||v>6||n.blocked(f,m-.3,p,0)||l.some(e=>(e.position[0]-f)**2+(e.position[2]-p)**2<2.2)||l.push({position:[+f.toFixed(3),+m.toFixed(3),+p.toFixed(3)],clearance:+v.toFixed(2),over:g})}return l}export{tn as build,Kt as makeSpec};