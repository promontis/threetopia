const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["assets/origin-MZAXedR9.js","assets/util-BOJ-hp-d.js","assets/noise-RmOKhMMB.js","assets/treehouse-BVyJClv1.js","assets/canopy-BbfuMePA.js","assets/nest-DO6wsLt-.js","assets/mesher-VCyixKF_.js","assets/three.core-DtjtRha-.js","assets/common-nVKQ2M6S.js","assets/perch-BLghb-Ow.js","assets/drifter-BOshlbY_.js","assets/bridges-B-ttb_DG.js","assets/deckPath-D7KbQHld.js","assets/common-heIScLVL.js","assets/boardwalks-CMe3LciN.js","assets/gatherings-1iXgoKsd.js","assets/trails-BM7MUqCh.js","assets/index-BjH0GYGf.js","assets/rolldown-runtime-DK3Fl9T5.js","assets/three.module-CA589J5f.js","assets/layout-DXlv_L6y.js","assets/farfield-C_pc_rD2.js"])))=>i.map(i=>d[i]);
import{t as e}from"./rolldown-runtime-DK3Fl9T5.js";import{A as t,Lt as n,U as r,Wi as i,ar as a,in as o,ir as s,j as c,mr as l,no as u,oa as d,qt as f,ro as p,sn as m}from"./three.core-DtjtRha-.js";import{t as h}from"./index-BjH0GYGf.js";import{a as g,c as _,d as v,f as y,i as b,l as x,m as S,n as C,o as w,r as T,s as E,t as D,u as O}from"./util-BOJ-hp-d.js";import{n as k,t as A}from"./mesher-VCyixKF_.js";var j=[.3,.29,.28];function M(e,t=1){let n=1+e.jit(.16*t),r=n*(1+e.jit(.04*t)),i=n,a=n*(1+e.jit(.07*t));if(e.chance(.14*t)){let t=.35+e.next()*.3,n=(r+i+a)/3*1.08;r+=(n-r)*t,i+=(n*.99-i)*t,a+=(n*.96-a)*t}else e.chance(.1*t)&&(r*=.82,i*=.8,a*=.78);return[r,i,a]}function N(e,t){return t?typeof t==`string`?e.ctx.layout.getHeroTree(t)??e.ctx.layout.EXTRA_TREES?.find(e=>e.id===t)??null:t:null}var P={plank(e,t,n={}){let r=this.rng,i=n.jitter??1,a=(n.width??.15)*(1+r.jit(.05*i)),o=n.thick??.035,s=S.sub(t,e),c=S.len(s);if(c<.02)return;let l=A.dir(e,s,n.up??[0,1,0]);if(i>0){l=l.rot(`y`,r.jit(.006*i)).rot(`z`,r.jit(.012*i)).move(0,r.jit(.0025*i),0);let e=r.jit(.008*i),t=r.jit(.008*i);l=l.move(0,0,e),c+=t-e}let u=n.e0??[0,0],d=n.e1??[0,0],f=n.mat??`plank`,p=this.m(f);p.color(n.tint??M(r,i||.5));let m=r.next()*7,h=m*7.31%1,g=n.nail??(f===`dark`||c<.2?0:.034+.012*(h*13.7%1));p.board(l,c,a,o,{bevel:n.bevel??.006,u0:m,v0:r.next()*7,e0:[-u[0],-u[1]],e1:[c+d[0],c+d[1]],bottom:n.bottom,kit:{seed:h,nail:Math.min(g,c*.45),nailMid:!!n.nailMid,wear:n.wear??0,lane:!!n.lane}})},beam(e,t,n={}){let r=this.m(n.mat??`beam`);r.color(n.tint??M(this.rng,.6));let i=this.rng.next()*5;r.beam(e,t,n.w??.12,n.h??.2,{chamfer:n.chamfer??.012,up:n.up,extend:n.extend??0,u0:i,v0:this.rng.next()*5,kit:{seed:i*5.17%1}})},joist(e,t,n={}){let r=n.h??.2;this.beam([e[0],e[1]-r/2,e[2]],[t[0],t[1]-r/2,t[2]],{w:.09,...n,h:r})},vBoard(e,t,n,r,i={}){let a=i.extend??0,o=S.sub(t,e),s=S.len(o);if(s<.01)return;let c=A.dir(e,o,n),l=-r/2/(Math.abs(c.x[1])>.3?c.x[1]:1),u=this.m(i.mat??`plank`);u.color(i.tint??M(this.rng,.8));let d=this.rng.next()*5;u.board(c.move(l,0,-a),s+2*a,r,i.thick??.035,{u0:d,v0:this.rng.next()*5,kit:{seed:d*5.17%1}})},log(e,t,n=.06,r={}){let i=Math.max(2,Math.ceil(S.dist(e,t)/.6)+1),a=[],o=this.rng,s=r.wobble??.12,c=[],l=o.next()*6.28,u=o.next()*6.28,d=S.dist(e,t);for(let o=0;o<i;o++){let f=o/(i-1);a.push(S.lerp(e,t,f)),c.push(n*(1-(r.taper??0)*f)*(1+s*.3*Math.sin(f*d*1.9+l)+s*.15*Math.sin(f*d*5.3+u)))}let f=r.mat??`beam`,p=this.m(f);p.color(r.tint??M(o,.6));let m=o.next()*3;p.tube(a,e=>c[e],r.segs??7,{caps:r.caps??!0,u0:m,v0:o.next()*3,colorFn:r.colorFn,grainAlong:f!==`bark`&&f!==`rope`,seed:m*3.37%1})},boltPlate(e,t,n={}){let r=this.m(`metal`);r.color(n.tint??j);let i=S.norm(t),a=Math.abs(i[1])>.9?[1,0,0]:n.up??[0,1,0],o=A.dir(e,i,a),s=n.w??.16,c=n.h??.22,l=.012;r.box(o.move(0,0,l/2),s,c,l,{u0:this.rng.next(),v0:this.rng.next()});let u=s*.3,d=c*.33;for(let[e,t]of[[-1,-1],[1,-1],[1,1],[-1,1]]){let n=o.move(e*u,t*d,l);r.prism(n,F(.018),.014,{u0:this.rng.next(),capStart:!1})}},kneeBrace(e,t,n={}){this.beam(e,t,{w:n.w??.09,h:n.h??.11,mat:n.mat??`beam`,chamfer:.01,extend:.03}),n.plates!==!1&&n.trunkNormal&&this.boltPlate(S.add(t,S.scale(n.trunkNormal,-.04)),n.trunkNormal,{w:.14,h:.2})},post(e){let{hf:t,layout:n}=this.ctx,r=e.x,i=e.z,a=e.r??.09,o=e.ground??t.groundHeight(r,i),s=n.WATER_Y,c=o<s-.02,l=e.embed??(c?.35:.2),u=e.base??o-l,d=e.top,f=this.rng,p=Math.max(3,Math.ceil((d-u)/.35)+1),m=[],h=[],g=e.lean??[f.jit(.006),f.jit(.006)],_=f.next()*6.28,v=f.next()*6.28;for(let e=0;e<p;e++){let t=e/(p-1),n=u+(d-u)*t;m.push([r+g[0]*(n-u),n,i+g[1]*(n-u)]),h.push(a*(1.06-.08*t)*(1+.025*Math.sin(n*1.3+_)+.012*Math.sin(n*3.7+v)))}let y=this.m(e.mat??`beam`),b=e.tint??M(f,.7);y.color(1);let x=f.next()*3,S=c?0:Math.max(1,Math.min(250,(o-u)*100));y.tube(m,e=>h[e],e.segs??8,{caps:`end`,u0:x,v0:f.next()*3,grainAlong:(e.mat??`beam`)!==`bark`,seed:x*3.37%1,kitWear:()=>S/255,colorFn:(e,t,n)=>{let r=m[e][1],i=1;c?r<s-.05?i=.72:r<s+.35&&(i=.78+(r-s)*.6):i=.8+Math.min(1,(r-o)/.45)*.2,n[0]=b[0]*i*(c&&r<s?.94:1),n[1]=b[1]*i,n[2]=b[2]*i*(c&&r<s?.9:1)}});let C=e.footing??(c?`none`:`stone`);if(C!==`none`&&!c){let e=this.m(`stone`),t=C===`rock`?2.6:1.9;e.color(.8+f.jit(.08),.76+f.jit(.06),.7+f.jit(.06));let n=A.yaw([r,o-(C===`rock`?.12:.05),i],f.next()*360);C===`rock`?e.ellipsoid(n,a*t,a*1.6,a*t*.85,10,6,{disp:I(f)}):e.roundBox(n.move(0,.03,0),a*t*2.1,.16,a*t*2,.3,12,6,{u0:f.next()*2})}return e.foot!==!1&&!c&&this.footCircle(r,i,a*2.2+.1),{top:m[p-1],base:m[0],ground:o,inWater:c}},stilt(e){return this.post({r:.12,footing:`none`,...e})},ringDeck(e){let{layout:t}=this.ctx,n=N(this,e.tree),[r,i]=n?[n.x,n.z]:w(e.center),a=e.y,o=e.plankW??.15,s=e.gap??.012,c=e.thick??.04,l=e.joistDepth??.22,u=n?t.trunkRadiusAt(n,a-.1):0,d=e.inner??(n?u+(e.trunkGap??.06+.03*u):0),f=e.outer,p=e.arc??[0,360],m=p[0],h=Math.min(360,p[1]-p[0]),v=h>=359.99,y=e.sectors??Math.max(3,Math.round(h*D*f/(e.sectorChord??1.8))),b=h/y,x=b/2*D,C=f*Math.cos(x),T=e.seamW??.13,E=this.rng,k=[r,a,i],j=(e,t,n=a)=>{let o=g(e);return[r+o[0]*t,n,i+o[1]*t]},M=[];for(let e=0;e<=y;e++)M.push(m+e*b);let P=(e.holes??[]).map(e=>({d0:e.arc[0],d1:e.arc[1],r0:e.r[0],r1:e.r[1]})),F=e=>(e%360+540)%360-180,I=(e,t,n=0)=>{let r=(t.d0+t.d1)/2,i=(t.d1-t.d0)/2+n;return Math.abs(F(e-r))<=i},L=(e,t,n)=>P.some(r=>n>=r.r0-.1&&n<=r.r1+.1&&(I(e,r,.5)||I(t,r,.5)||I((e+t)/2,r,.5))),R=(e,t,n)=>{let r=[[t,n]];for(let t of P){if(!I(e,t,1.5))continue;let n=[];for(let[e,i]of r){if(t.r1<=e||t.r0>=i){n.push([e,i]);continue}t.r0-e>.1&&n.push([e,t.r0]),i-t.r1>.1&&n.push([t.r1,i])}r=n}return r},z=e.indoor?typeof e.indoor==`number`?e.indoor:e.indoor.r:0,B=e.indoor?.arc??[0,360],V=(e,t)=>z>0&&t<z-.02&&_(e,B[0],B[1]),H=(e,t)=>e?this.scope({indoor:!0},t):t(),U=Math.max(d,.25),W=z>0?(Math.max(z,U)+f)/2:(U+f)/2,ee=f-Math.max(z,U)>1.1,te=(e,t)=>t?.18:ee?.08+.7*Math.exp(-(((e-W)/.55)**2)):.45;for(let e=0;e<y;e++){let t=m+(e+.5)*b,n=g(t),l=g(t+90),u=Math.tan(x),d=T/(2*Math.cos(x))+.004,f=U*Math.cos(x)+o/2+.01;for(;f-o/2<U;)f+=.02;for(;f+o/2<=C-.005;){let e=(f-o/2)*u-d,p=(f+o/2)*u-d;if(e>.06){let s=[[-e,e,!0,!0]];for(let e of P){if(f+o/2<e.r0||f-o/2>e.r1)continue;let n=F(e.d0-t),r=F(e.d1-t);if(Math.abs(n)>85&&Math.abs(r)>85)continue;let i=f*Math.tan(Math.max(-85,Math.min(85,n))*D)-.012,a=f*Math.tan(Math.max(-85,Math.min(85,r))*D)+.012,c=[];for(let e of s){if(a<=e[0]||i>=e[1]){c.push(e);continue}i-e[0]>.08&&c.push([e[0],i,e[2],!1]),e[1]-a>.08&&c.push([a,e[1],!1,e[3]])}s=c}let u=p-e;for(let[e,d,p,m]of s){let s=[r+n[0]*f+l[0]*e,a,i+n[1]*f+l[1]*e],h=[r+n[0]*f+l[0]*d,a,i+n[1]*f+l[1]*d],g=A.dir(s,S.sub(h,s)),_=g.x[0]*n[0]+g.x[2]*n[1]>0?[0,u]:[u,0],v=V(t,f+o/2);H(v,()=>this.plank(s,h,{width:o,thick:c,e0:p?_:[0,0],e1:m?_:[0,0],jitter:.8,wear:te(f,v)}))}}f+=o+s+E.jit(.002)}}for(let e=0;e<=y&&!(v&&e===y);e++){let t=M[e];for(let[e,n]of R(t,d+.02,f-.01))if(z>0&&_(t,B[0],B[1])&&e<z-.1&&n>z-.1){let r=z-.08;this.scope({indoor:!0},()=>this.plank(j(t,e),j(t,r),{width:T,thick:c+.004,jitter:.5})),this.plank(j(t,r),j(t,n),{width:T,thick:c+.004,jitter:.5})}else H(V(t,n),()=>this.plank(j(t,e),j(t,n),{width:T,thick:c+.004,jitter:.5}))}let G=a-c;for(let r=0;r<=y&&!(v&&r===y);r++){let i=M[r],a=g(i),o=[a[0],0,a[1]],s=R(i,Math.max(.05,d-.12),f-.06);for(let[e,t]of s)this.joist(j(i,e,G),j(i,t,G),{h:l,w:.1});if(n&&s.length===1&&s[0][0]<d){let a=t.trunkRadiusAt(n,G-l/2);if(this.boltPlate(j(i,a-.01,G-l/2),o,{w:.22,h:l+.1}),(e.braces===`all`||(e.braces??`alternate`)===`alternate`&&r%2==0)&&f-d>1){let e=d+(f-d)*.62,r=G-l,a=r-Math.min(3.2,(e-d)*1.05),s=t.trunkRadiusAt(n,a);this.kneeBrace(j(i,e,r-.04),j(i,s+.03,a),{trunkNormal:o})}}}let ne=(e,t,n)=>{for(let r=0;r<y;r++)P.length&&L(M[r],M[r+1],e)||n(j(M[r],e,t),j(M[r+1],e,t),r)},K=(d+f)*.55;f-d>1.6&&ne(K,G-.08,(e,t)=>this.beam(e,t,{w:.08,h:.16})),ne(f-.06,G-l/2,(e,t)=>this.beam(e,t,{w:.08,h:l})),e.fascia!==!1&&ne(f+.035,a-.012,(e,t)=>{let n=S.lerp(e,t,.5),a=S.norm([n[0]-r,0,n[2]-i]);this.vBoard(e,t,a,l+.08,{extend:.03})}),n&&d>.3&&ne(d-.05,G-.1,(e,t)=>this.beam(e,t,{w:.09,h:.18}));for(let e of P){for(let t of[e.d0,e.d1])this.joist(j(t,e.r0,G),j(t,e.r1,G),{h:l*.8,w:.08});let t=Math.max(2,Math.ceil((e.d1-e.d0)*D*e.r1/1.2));for(let n=0;n<t;n++){let r=e.d0+(e.d1-e.d0)*n/t,i=e.d0+(e.d1-e.d0)*(n+1)/t;this.joist(j(r,e.r1+.04,G),j(i,e.r1+.04,G),{h:l*.8,w:.08})}}if(!v)for(let e of[M[0],M[y]]){g(e);let t=e===M[0]?-1:1,n=g(e+90*t),r=j(e,d+.05,a-.012),i=j(e,f+.03,a-.012),o=[n[0]*(T/2+.035),0,n[1]*(T/2+.035)];this.vBoard(S.add(r,o),S.add(i,o),[n[0],0,n[1]],l+.08)}if(e.posts){let t=e.posts.rings??[f-.35],n=e.posts.every??1;for(let r of t)for(let t=0;t<=y&&!(v&&t===y);t+=n){let n=j(M[t],r);this.post({x:n[0],z:n[2],top:G-l,r:e.posts.r??.11,footing:e.posts.footing})}}if(e.collider!==!1)for(let e=0;e<y;e++){let t=M[e],n=M[e+1];if(!(P.length&&P.some(e=>I(t,e,b)||I(n,e,b)))){let e=[j(t,d),j(t,f),j(n,f),j(n,d)].map(e=>[e[0],e[2]]);this.colSlab(e,a,.2,`walk`);continue}let r=Math.max(2,Math.ceil(b/2.5));for(let e=0;e<r;e++){let n=t+b*e/r,i=t+b*(e+1)/r;for(let[e,t]of R((n+i)/2,d,f)){let r=[j(n,e),j(n,t),j(i,t),j(i,e)].map(e=>[e[0],e[2]]);this.colSlab(r,a,.2,`walk`)}}}let q=(e,t=0)=>{let n=O(e-m),r=Math.min(y-1,Math.floor(n/b)),i=(e-(m+(r+.5)*b))*D,a=(C-t)/Math.cos(i);return j(e,a)};return{center:[r,i],C:k,y:a,inner:d,outer:f,apothem:C,arc:[m,m+h],full:v,sectors:y,seams:M,edge:q,polyPoints:(e,t,n=.07)=>{let a=[q(e,n)];for(let r of M){let i=r;for(;i<e;)i+=360;for(;i-360>e;)i-=360;i>e+.5&&i<t-.5&&a.push(j(i,(C-n)/Math.cos(x)))}let o=a.slice(1).map(t=>({p:t,k:O(Math.atan2(t[0]-r,-(t[2]-i))/D-e)}));return o.sort((e,t)=>e.k-t.k),[a[0],...o.map(e=>e.p),q(t,n)]},tree:n}},polyDeck(e){let t=e.pts.map(e=>e.length>2?[e[0],e[2]]:[e[0],e[1]]),n=e.y,r=e.plankW??.15,i=e.gap??.012,a=e.thick??.04,o=e.joistDepth??.2,s=this.rng,c=t.length,l=e.plankDeg;if(l===void 0){let e=0;for(let n=0;n<c;n++){let r=t[n],i=t[(n+1)%c],a=Math.hypot(i[0]-r[0],i[1]-r[1]);a>e&&(e=a,l=Math.atan2(i[0]-r[0],-(i[1]-r[1]))/D)}}let u=g(l),d=g(l+90),f=e=>{let n=1/0,r=-1/0;for(let i=0;i<c;i++){let a=t[i],o=t[(i+1)%c],s=a[0]*d[0]+a[1]*d[1]-e,l=o[0]*d[0]+o[1]*d[1]-e;if(s<=0&&l>=0||s>=0&&l<=0){let e=Math.abs(s-l)<1e-9?0:s/(s-l),t=a[0]+(o[0]-a[0])*e,i=a[1]+(o[1]-a[1])*e,c=t*u[0]+i*u[1];n=Math.min(n,c),r=Math.max(r,c)}}return n<r?[n,r]:null},p=1/0,m=-1/0,h=1/0,_=-1/0;for(let e of t){let t=e[0]*d[0]+e[1]*d[1],n=e[0]*u[0]+e[1]*u[1];p=Math.min(p,t),m=Math.max(m,t),h=Math.min(h,n),_=Math.max(_,n)}let v=(e,t,r=n)=>[u[0]*e+d[0]*t,r,u[1]*e+d[1]*t];for(let e=p+r/2+.01;e<=m-r/2;e+=r+i+s.jit(.002)){let t=f(e-r/2+.002),n=f(e+r/2-.002),i=f(e);if(!i||!t||!n)continue;let o=i[0],s=i[1];if(s-o<.1)continue;let c=v(o,e),l=v(s,e),u=A.dir(c,S.sub(l,c)),p=u.x[0]*d[0]+u.x[2]*d[1]>0,m=p?t:n,h=p?n:t;this.plank(c,l,{width:r,thick:a,jitter:.8,e0:[o-m[0],o-h[0]],e1:[m[1]-s,h[1]-s]})}let y=n-a,b=e.joistSpacing??.6,x=e=>{let n=1/0,r=-1/0;for(let i=0;i<c;i++){let a=t[i],o=t[(i+1)%c],s=a[0]*u[0]+a[1]*u[1]-e,l=o[0]*u[0]+o[1]*u[1]-e;if(s<=0&&l>=0||s>=0&&l<=0){let e=Math.abs(s-l)<1e-9?0:s/(s-l),t=a[0]+(o[0]-a[0])*e,i=a[1]+(o[1]-a[1])*e,c=t*d[0]+i*d[1];n=Math.min(n,c),r=Math.max(r,c)}}return n<r?[n,r]:null};for(let e=h+.12;e<=_-.1;e+=b){let t=x(e);!t||t[1]-t[0]<.3||this.joist(v(e,t[0]+.08,y),v(e,t[1]-.08,y),{h:o,w:.08})}let C=t.reduce((e,t)=>[e[0]+t[0]/c,e[1]+t[1]/c],[0,0]);if(e.fascia!==!1)for(let e=0;e<c;e++){let r=t[e],i=t[(e+1)%c],a=[i[0]-r[0],i[1]-r[1]],s=Math.hypot(a[0],a[1]),l=[a[1]/s,-a[0]/s],u=[(r[0]+i[0])/2-C[0],(r[1]+i[1])/2-C[1]];l[0]*u[0]+l[1]*u[1]<0&&(l=[-l[0],-l[1]]);let d=[r[0]+l[0]*.035,n-.012,r[1]+l[1]*.035],f=[i[0]+l[0]*.035,n-.012,i[1]+l[1]*.035];this.vBoard(d,f,[l[0],0,l[1]],o+.1,{extend:.035})}if(e.posts){let n=e.posts.spacing??2.2,r=L(t,e.posts.inset??.25),i=y-o;for(let t=0;t<c;t++){let a=r[t],o=r[(t+1)%c],s=Math.hypot(o[0]-a[0],o[1]-a[1]),l=Math.max(1,Math.round(s/n));for(let t=0;t<l;t++){let n=[a[0]+(o[0]-a[0])*(t/l),a[1]+(o[1]-a[1])*(t/l)];this.post({x:n[0],z:n[1],top:i,r:e.posts.r??.1,footing:e.posts.footing})}this.beam([a[0],i-.1,a[1]],[o[0],i-.1,o[1]],{w:.12,h:.2,extend:.12})}}return e.collider!==!1&&this.colSlab(t,n,.2,`walk`),{y:n,pts:t,edgeLoop:(e=.07)=>L(t,e).map(e=>[e[0],n,e[1]]),plankDeg:l}},walkway(e){let t=e.width??1.8,n=e.plankW??.16,r=e.gap??.014,i=e.thick??.045,a=e.stringerDepth??.2,o=this.rng,s=e.path,c=y(s),l=e.smooth??Math.max(s.length,Math.ceil(c.length/.5)+1),u=s.length>2&&e.curve!==!1?z(s,l):R(c,l),d=y(u),f=t/2,p=e=>{let{p:t,t:n}=d.at(e),r=Math.hypot(n[0],n[2])||1,i=[-n[2]/r,0,n[0]/r],a=S.cross(n,i);return a[1]<0&&(a=S.scale(a,-1)),{p:t,t:n,across:i,up:S.norm(a)}};for(let t=n/2+.01;t<=d.length-n/2;t+=n+r+o.jit(.003)){let r=p(t),a=f+o.jit(.02),s=S.add(r.p,S.scale(r.across,-a)),c=S.add(r.p,S.scale(r.across,a));this.plank(s,c,{width:n,thick:i,up:r.up,jitter:1,lane:!0,nail:e.stringers===!1?void 0:a-(f-.14)})}let m=(e,t,n)=>{let r=p(e);return S.add(S.add(r.p,S.scale(r.across,t*(f-.14))),S.scale(r.up,-n))};if(e.stringers!==!1){let e=Math.max(1,Math.ceil(d.length/1.2));for(let t of[-1,1])for(let n=0;n<e;n++){let r=n/e*d.length,o=(n+1)/e*d.length;this.beam(m(r,t,i+a/2),m(o,t,i+a/2),{w:.09,h:a,extend:.02})}}let{hf:h,layout:g}=this.ctx;if(e.posts){let t=e.posts.spacing??2.4,n=Math.max(1,Math.round(d.length/t));for(let t=0;t<=n;t++){let r=p(Math.min(d.length-.15,Math.max(.15,t/n*d.length))),o=r.p[1]-i-a,s=[];for(let t of[-1,1]){let n=S.add(r.p,S.scale(r.across,t*(f-.1))),i=this.post({x:n[0],z:n[2],top:o-.17,r:e.posts.r??.1,footing:e.posts.footing});s.push(i)}let c=S.add(r.p,S.scale(r.across,-(f+.08))),l=S.add(r.p,S.scale(r.across,f+.08));c[1]=l[1]=o-.09,this.beam(c,l,{w:.1,h:.16});let u=o-Math.max(s[0].ground,s[1].ground,g.WATER_Y-.4);if((e.posts.bracing??!0)&&u>1.1){let e=o-Math.min(u-.2,1.4),t=s[0].top,n=s[1].top;this.beam([t[0],o-.3,t[2]],[n[0],e,n[2]],{w:.06,h:.1,extend:-.08})}}}let _=Math.max(1,Math.ceil(d.length/1));for(let n=0;n<_;n++){let r=n/_*d.length,i=(n+1)/_*d.length,a=d.at(r).p,o=d.at(i).p;if(e.collider!==!1&&this.colRamp(a,o,t,.2,`walk`),e.foot!==!1){let e=h.groundHeight(a[0],a[2]),t=h.groundHeight(o[0],o[2]);(e>g.WATER_Y-.1||t>g.WATER_Y-.1)&&this.footSegment(a,o,f+.3)}}return{path:u,length:d.length,at:e=>d.at(e),frameAt:p,left:(e,t=.08)=>{let n=p(e);return S.add(n.p,S.scale(n.across,-(f-t)))},right:(e,t=.08)=>{let n=p(e);return S.add(n.p,S.scale(n.across,f-t))},width:t}}};function F(e){let t=[];for(let n=0;n<6;n++){let r=n/6*Math.PI*2+Math.PI/6;t.push([Math.cos(r)*e,Math.sin(r)*e])}return t}function I(e){let t=e.next()*6,n=e.next()*6,r=e.next()*6;return(e,i,a)=>1+.12*Math.sin(e*3.1+t)*Math.sin(a*2.7+n)+.08*Math.sin(i*4.3+r+e*2)-(i<-.3?.25*(-i-.3):0)}function L(e,t){let n=e.length,r=0;for(let t=0;t<n;t++){let i=e[t],a=e[(t+1)%n];r+=i[0]*a[1]-a[0]*i[1]}let i=r>0?1:-1,a=[];for(let r=0;r<n;r++){let o=e[r],s=e[(r+1)%n],c=[s[0]-o[0],s[1]-o[1]],l=Math.hypot(c[0],c[1])||1,u=[-c[1]/l*i,c[0]/l*i];a.push({p:[o[0]+u[0]*t,o[1]+u[1]*t],e:c})}let o=[];for(let e=0;e<n;e++){let t=a[(e-1+n)%n],r=a[e],i=t.e[0]*r.e[1]-t.e[1]*r.e[0];if(Math.abs(i)<1e-9){o.push(r.p);continue}let s=r.p[0]-t.p[0],c=r.p[1]-t.p[1],l=(s*r.e[1]-c*r.e[0])/i;o.push([t.p[0]+t.e[0]*l,t.p[1]+t.e[1]*l])}return o}function R(e,t){let n=[];for(let r=0;r<t;r++)n.push(e.at(r/(t-1)*e.length).p);return n}function z(e,t){let n=[],r=e.length;for(let t=0;t<r-1;t++){let i=e[Math.max(0,t-1)],a=e[t],o=e[t+1],s=e[Math.min(r-1,t+2)];for(let e=0;e<12;e++){let t=e/12,r=t*t,c=r*t,l=[0,0,0];for(let e=0;e<3;e++)l[e]=.5*(2*a[e]+(-i[e]+o[e])*t+(2*i[e]-5*a[e]+4*o[e]-s[e])*r+(-i[e]+3*a[e]-3*o[e]+s[e])*c);n.push(l)}}return n.push(e[r-1].slice()),R(y(n),t)}var B=new Set([`rope`,`metal`]),V=new Set([`cloth`,`rug`,`leaf`,`glow`,`window`,`stone`,`linen`,`straw`]),H=new Set([`plank`,`beam`,`dark`]),U=class{constructor(e,t,n={}){this.kit=e,this.ctx=e.ctx,this.name=t,this.opts=n,this.rng=x(E(t)^(n.seed??24301)),this.buckets=new Map,this._scope=[{layer:n.layer??0,castShadow:n.castShadow??!0,receiveShadow:n.receiveShadow??!0,indoor:!1}],this.root=new f,this.root.name=`arch:`+t,this.finalized=!1,this.meshes=[]}get state(){return this._scope[this._scope.length-1]}scope(e,t){this._scope.push({...this.state,...e});try{return t(this)}finally{this._scope.pop()}}interior(e){return this.scope({layer:this.ctx.LAYERS.NO_REFLECT,castShadow:!1,indoor:!0},e)}clutter(e){return this.scope({layer:this.ctx.LAYERS.NO_REFLECT,castShadow:!1},e)}sheltered(e){return this.scope({castShadow:!1,indoor:!0},e)}noReflect(...e){for(let t of e)(this._noReflect??=new Set).add(t);return this}m(e){let t=this.state,n=`${e}|${t.layer}|${+!!t.castShadow}|${+!!t.receiveShadow}|${+!!t.indoor}`,r=this.buckets.get(n);return r||(this.finalized&&console.warn(`[arch-kit] group '${this.name}' already finalized; geometry for '${e}' will be flushed by kit.finalize()`),r={key:e,layer:t.layer,castShadow:t.castShadow,receiveShadow:t.receiveShadow,indoor:!!t.indoor,mesher:new k},r.mesher.kit=H.has(e),this.buckets.set(n,r)),r.mesher}colBox(e,t,n=0,r=`solid`){return this.ctx.collision.addBox(e,t,n,r)}colRamp(e,t,n,r=.12,i=`walk`){return this.ctx.collision.addRamp(e,t,n,r,i)}colCyl(e,t,n,r=10,i=`solid`){return this.ctx.collision.addCylinder(e,t,n,r,i)}colGeom(e,t=null,n=`solid`){return this.ctx.collision.addGeometry(e,t,n)}colSlab(e,t,r=.16,i=`walk`){let a=e.map(e=>new u(e[0],e.length>2?e[2]:e[1])),o=d.triangulateShape(a,[]),s=[],l=t-r;for(let[e,n,r]of o){for(let i of[e,n,r])s.push(a[i].x,t,a[i].y);for(let t of[e,r,n])s.push(a[t].x,l,a[t].y)}for(let e=0;e<a.length;e++){let n=a[e],r=a[(e+1)%a.length];s.push(n.x,t,n.y,r.x,t,r.y,r.x,l,r.y,n.x,t,n.y,r.x,l,r.y,n.x,l,n.y)}let f=new c;f.setAttribute(`position`,new n(s,3));let p=this.ctx.collision.addGeometry(f,null,i);return f.dispose(),p}colWall(e,t,n,r=.1,i=`wall`){let a=t[0]-e[0],o=t[2]-e[2],s=Math.hypot(a,o);if(s<.001)return null;if(Math.abs(t[1]-e[1])<.02){let c=Math.atan2(a,o);return this.colBox([(e[0]+t[0])/2,(e[1]+t[1])/2+n/2,(e[2]+t[2])/2],[r,n,s],c,i)}return this.colRamp([e[0],e[1]+n,e[2]],[t[0],t[1]+n,t[2]],r,n,i)}footCircle(e,t,n,r=this.name){return this.kit.footprints.circle(e,t,n,r)}footSegment(e,t,n,r=this.name){return this.kit.footprints.segment(e,t,n,r)}footPoly(e,t=0,n=this.name){return this.kit.footprints.poly(e,t,n)}footIfGround(e,t,n,r){let i=this.ctx.hf.groundHeight(e,n);t<=i+.6&&i>this.ctx.layout.WATER_Y-.05&&this.footCircle(e,n,r)}finalize(){let e=this.kit.materials,t=this.ctx.LAYERS,n=0,r=0,i=this.ctx.params?.get?.(`archlegacy`)===`1`;if(i)for(let[e,n]of[...this.buckets]){if(n.flushed||n.mesher.empty)continue;let r=n.indoor&&n.layer===t.NO_REFLECT,i=n.indoor&&!r?0:n.layer,a=r?!1:n.indoor?!0:n.castShadow;if(!n.indoor)continue;let o=`${n.key}|${i}|${+!!a}|${+!!n.receiveShadow}|0`,s=this.buckets.get(o);if(this.buckets.delete(e),n.indoor=!1,s&&!s.flushed){s.mesher.append(n.mesher);continue}n.layer=i,n.castShadow=a,this.buckets.set(o,n)}if(!this.opts?.keepDetail&&!i){for(let[e,n]of[...this.buckets]){if(n.flushed||n.mesher.empty)continue;let{layer:r,castShadow:i}=n;if((B.has(n.key)||this._noReflect?.has(n.key))&&(r=t.NO_REFLECT,i=!1),V.has(n.key)&&(i=!1),r===n.layer&&i===n.castShadow)continue;let a=`${n.key}|${r}|${+!!i}|${+!!n.receiveShadow}|${+!!n.indoor}`,o=this.buckets.get(a);if(this.buckets.delete(e),o&&!o.flushed){o.mesher.append(n.mesher);continue}n.layer=r,n.castShadow=i,this.buckets.set(a,n)}for(let[e,n]of[...this.buckets]){if(n.flushed||n.mesher.empty||n.indoor||n.layer!==t.NO_REFLECT||B.has(n.key)||this._noReflect?.has(n.key))continue;let r=null;for(let e of this.buckets.values())if(e!==n&&!e.flushed&&e.key===n.key&&!e.indoor&&e.layer===0&&e.receiveShadow===n.receiveShadow){r=e;break}r&&(r.mesher.append(n.mesher),this.buckets.delete(e))}}for(let[t,i]of this.buckets){if(i.flushed||i.mesher.empty)continue;let o=i.mesher.toGeometry(),s=i.indoor?e.indoor(i.key):e.get(i.key),c=new a(o,s);c.name=`${this.name}:${i.key}${i.indoor?`@in`:``}`,s.userData?.depthMaterial&&(c.customDepthMaterial=s.userData.depthMaterial),this._noReflect?.has(i.key)&&!i.indoor&&(c.userData.keepFar=!0),c.castShadow=i.castShadow,c.receiveShadow=i.receiveShadow,c.layers.set(i.layer),c.matrixAutoUpdate=!1,c.updateMatrix(),this.root.add(c),this.meshes.push(c),n+=i.mesher.I.length/3,r+=i.mesher.vertexCount,i.flushed=!0,i.mesher=new k,this.buckets.delete(t)}return this.root.parent||(this.root.matrixAutoUpdate=!1,this.ctx.scene.add(this.root)),this.finalized=!0,this.stats={meshes:this.meshes.length,tris:n,verts:r},this.root}},W=class{constructor(e=8){this.cell=e,this.list=[],this.grid=new Map}_key(e,t){return e*73856093^t*19349663}_insert(e,t,n,r,i){e.minX=t,e.minZ=n,e.maxX=r,e.maxZ=i,this.list.push(e);let a=this.cell,o=Math.floor(t/a),s=Math.floor(r/a),c=Math.floor(n/a),l=Math.floor(i/a);for(let t=o;t<=s;t++)for(let n=c;n<=l;n++){let r=this._key(t,n),i=this.grid.get(r);i||(i=[],this.grid.set(r,i)),i.push(e)}return e}circle(e,t,n,r=``){return this._insert({type:`circle`,x:e,z:t,r:n,tag:r},e-n,t-n,e+n,t+n)}segment(e,t,n,r=``){let i=e[0],a=e.length>2?e[2]:e[1],o=t[0],s=t.length>2?t[2]:t[1];return this._insert({type:`segment`,ax:i,az:a,bx:o,bz:s,r:n,tag:r},Math.min(i,o)-n,Math.min(a,s)-n,Math.max(i,o)+n,Math.max(a,s)+n)}poly(e,t=0,n=``){let r=1/0,i=1/0,a=-1/0,o=-1/0,s=e.map(e=>e.length>2?[e[0],e[2]]:[e[0],e[1]]);for(let[e,t]of s)r=Math.min(r,e),a=Math.max(a,e),i=Math.min(i,t),o=Math.max(o,t);return this._insert({type:`poly`,pts:s,r:t,tag:n},r-t,i-t,a+t,o+t)}_dist(e,t,n){if(e.type===`circle`)return Math.hypot(t-e.x,n-e.z)-e.r;if(e.type===`segment`){let r=e.bx-e.ax,i=e.bz-e.az,a=r*r+i*i,o=a>0?((t-e.ax)*r+(n-e.az)*i)/a:0;return o=o<0?0:o>1?1:o,Math.hypot(t-(e.ax+r*o),n-(e.az+i*o))-e.r}let r=e.pts,i=!1,a=1/0;for(let e=0,o=r.length-1;e<r.length;o=e++){let[s,c]=r[e],[l,u]=r[o];c>n!=u>n&&t<(l-s)*(n-c)/(u-c+1e-12)+s&&(i=!i);let d=s-l,f=c-u,p=d*d+f*f,m=p>0?((t-l)*d+(n-u)*f)/p:0;m=m<0?0:m>1?1:m,a=Math.min(a,Math.hypot(t-(l+d*m),n-(u+f*m)))}return(i?-a:a)-e.r}blocked(e,t,n=0){let r=this.cell,i=Math.floor((e-n)/r),a=Math.floor((e+n)/r),o=Math.floor((t-n)/r),s=Math.floor((t+n)/r);for(let r=i;r<=a;r++)for(let i=o;i<=s;i++){let a=this.grid.get(this._key(r,i));if(a)for(let r=0;r<a.length;r++){let i=a[r];if(!(e+n<i.minX||e-n>i.maxX||t+n<i.minZ||t-n>i.maxZ)&&this._dist(i,e,t)<n)return!0}}return!1}clearance(e,t,n=6){let r=this.cell,i=n,a=Math.floor((e-n)/r),o=Math.floor((e+n)/r),s=Math.floor((t-n)/r),c=Math.floor((t+n)/r);for(let n=a;n<=o;n++)for(let r=s;r<=c;r++){let a=this.grid.get(this._key(n,r));if(a)for(let n of a)e+i<n.minX||e-i>n.maxX||t+i<n.minZ||t-i>n.maxZ||(i=Math.min(i,Math.max(0,this._dist(n,e,t))))}return i}},ee=`
attribute vec4 kitA;
attribute vec4 kitB;
varying vec4 vKitA;
varying vec4 vKitB;
`,te=`
  vKitA = kitA * 0.001;
  vKitB = kitB;
`,G=`
float kitHash(vec2 p) { vec3 p3 = fract(vec3(p.xyx) * 0.1031); p3 += dot(p3, p3.yzx + 33.33); return fract((p3.x + p3.y) * p3.z); }
float kitNoise(vec2 x) {
  vec2 i = floor(x), f = fract(x);
  vec2 u = f * f * (3.0 - 2.0 * f);
  return mix(mix(kitHash(i), kitHash(i + vec2(1.0, 0.0)), u.x), mix(kitHash(i + vec2(0.0, 1.0)), kitHash(i + vec2(1.0, 1.0)), u.x), u.y);
}
float kitFbm(vec2 p) { return kitNoise(p) * 0.55 + kitNoise(p * 2.13 + 7.1) * 0.3 + kitNoise(p * 4.37 + 3.3) * 0.15; }
`,ne=`
varying vec4 vKitA;
varying vec4 vKitB;
uniform float uKitOutdoor;
uniform float uKitWeather;
`,K=`
  reflectedLight.directDiffuse = max(reflectedLight.directDiffuse - lagoonSunDiffuse * kKitNoSun, 0.0);
  reflectedLight.directSpecular = max(reflectedLight.directSpecular - lagoonSunSpecular * kKitNoSun, 0.0);
  lagoonSunDiffuse *= 1.0 - kKitNoSun;
  lagoonSunSpecular *= 1.0 - kKitNoSun;
`,q=`
vec3 kKitGN = vec3(0.0, 0.0, 1.0);
float kKitNoSun = 0.0;
#if NUM_POINT_LIGHTS > 0
void kitWoodPointInfo(const in PointLight pl, const in vec3 gp, out IncidentLight dl) {
  getPointLightInfo(pl, gp, dl);
  dl.color *= smoothstep(-0.02, 0.2, dot(kKitGN, dl.direction));
}
#define getPointLightInfo kitWoodPointInfo
#endif
`,re=`
{
  vec3 kN = normalize((vec4(nonPerturbedNormal, 0.0) * viewMatrix).xyz);
#ifdef KIT_WOOD_PT
  kKitGN = normalize(nonPerturbedNormal);
#endif
  vec3 kP = vLagoonWorldPos;
  vec3 kC = diffuseColor.rgb;
  float kLen = vKitA.z, kHw = vKitA.w;
  float kCls = floor(vKitB.w + 0.5);
  float kNoSun = step(15.5, kCls);                  // +16: roof framing, never sunlit
  kCls -= 16.0 * kNoSun;
#ifdef KIT_WOOD_PT
  kKitNoSun = kNoSun;
#endif
  float kLane = step(8.5, kCls);
  kCls -= 8.0 * kLane;
  float kHas = step(0.02, kLen) * step(0.004, kHw);
  float kSeed = vKitB.x * (1.0 / 255.0);
  float kOut = uKitOutdoor;
  float kWx = uKitWeather;
  // surface gradients of the board coordinates (view space), taken in uniform control flow
  vec3 kQ0 = dFdx(-vViewPosition), kQ1 = dFdy(-vViewPosition);
  vec3 kQ1p = cross(kQ1, nonPerturbedNormal), kQ0p = cross(nonPerturbedNormal, kQ0);
  vec3 kGA = kQ1p * dFdx(vKitA.x) + kQ0p * dFdy(vKitA.x);
  vec3 kGX = kQ1p * dFdx(vKitA.y) + kQ0p * dFdy(vKitA.y);
  kGA *= inversesqrt(max(dot(kGA, kGA), 1e-24));
  kGX *= inversesqrt(max(dot(kGX, kGX), 1e-24));
  float kAA = max(fwidth(vKitA.x), fwidth(vKitA.y)) + 1e-5;
  float kIsTop = kHas * (1.0 - step(0.5, abs(kCls - 1.0)));
  float kIsRound = kHas * (1.0 - step(0.5, abs(kCls - 5.0)));
  float kIsEnd = kHas * max(1.0 - step(0.5, abs(kCls - 3.0)), 1.0 - step(0.5, abs(kCls - 6.0)));
  float kIsBSide = kHas * (1.0 - step(0.5, abs(kCls - 7.0)));

  // ---- exposure: sun + weather on tops and sun-facing sides, none under decks / eaves
  float kNhl = length(kN.xz);
  float kSunF = kNhl > 1e-3 ? max(dot(kN.xz / kNhl, normalize(uSunDir.xz + vec2(1e-5))), 0.0) * kNhl : 0.0;
  float kExp = kOut * kWx * clamp(smoothstep(-0.2, 0.85, kN.y) + 0.35 * kSunF, 0.0, 1.0);
  float kL = dot(kC, vec3(0.2126, 0.7152, 0.0722));
  float kB = kExp * (0.26 + 0.34 * fract(kSeed * 3.71));
  // UV-bleached wood goes silver AND lighter (the brown lignin weathers out of the surface
  // fibres, leaving pale grey cellulose): pulled toward a light silver, per board
  vec3 kSil = vec3(mix(kL * 1.1, 0.26, 0.45)) * vec3(1.03, 1.0, 0.95) + 0.006;
  kC = mix(kC, kSil, kB);
  kC *= mix(vec3(1.0), vec3(1.07, 0.96, 0.83), kOut * kWx * (1.0 - kExp) * 0.6);
  // indoors: waxed, handled timber (warmer, richer, a little satin)
  float kIn = 1.0 - kOut;
  kC = mix(kC, max(vec3(kL) + (kC - vec3(kL)) * 1.28, 0.0) * vec3(1.05, 0.98, 0.89), kIn * (0.35 + 0.45 * kWx));
  roughnessFactor *= 1.0 - 0.12 * kIn;
  // per-board tone: boards from different logs / years (value + warmth)
  float kT1 = fract(kSeed * 17.13), kT2 = fract(kSeed * 29.71);
  kC *= (0.9 + 0.2 * kT1) * mix(vec3(1.0), vec3(1.05, 0.99, 0.9), kT2 * kHas * (0.4 + 0.6 * (1.0 - kB)));

#if KIT_WOOD_DETAIL
  // ---- foot traffic (top faces): sand-scoured feet wear the grey patina off -> warm tan
  //      wood shows through, polished smoother (a faint sheen at grazing light), grit in the grain
  float kWear = vKitB.z * (1.0 / 255.0) * kIsTop;
  kWear = max(kWear, kLane * kIsTop * 0.85 * (1.0 - smoothstep(0.14, 0.42, abs(vKitA.x / max(kLen, 0.01) - 0.5))));
  kWear *= smoothstep(0.2, 0.72, kitFbm(kP.xz * vec2(2.3, 2.9) + kSeed * 13.0) + 0.2);
  float kLw = dot(kC, vec3(0.2126, 0.7152, 0.0722));
  kC = mix(kC, vec3(kLw) * vec3(1.16, 0.97, 0.76) * 1.03, kWear * 0.55);
  roughnessFactor = mix(roughnessFactor, roughnessFactor * 0.78, kWear);
  // ---- wind-blown sand: settles along board edges, away from the lane, less up in the trees
  float kEdge = kHas > 0.5 ? smoothstep(0.5, 1.0, abs(vKitA.y) / kHw) : 0.4;
  float kDust = kOut * smoothstep(0.55, 0.9, kN.y) * (0.2 + 0.8 * kEdge) * (1.0 - 0.85 * kWear);
  kDust *= smoothstep(0.35, 0.75, kitFbm(kP.xz * 6.3 + 3.0)) * (1.0 - 0.6 * smoothstep(2.0, 14.0, kP.y - uWaterLevel));
  kC = mix(kC, vec3(0.6, 0.51, 0.38), kDust * 0.38);
  roughnessFactor = mix(roughnessFactor, 1.0, kDust * 0.5);

  // ---- board ends: darker (end grain wicks water), end checks running in from the end
  float kDE = min(vKitA.x, kLen - vKitA.x);
  float kEndSel = step(kLen * 0.5, vKitA.x);
  float kLongF = min(1.0, kHas * step(kCls, 2.5) + kIsBSide + kIsRound);
  kC *= 1.0 - 0.1 * kOut * kLongF * (1.0 - smoothstep(0.0, 0.06, kDE));
  if (kIsTop > 0.5) {
    for (int i = 0; i < 2; i++) {
      float fi = float(i);
      vec3 h = vec3(kitHash(vec2(kSeed * 113.0 + fi, kEndSel + 1.0)), kitHash(vec2(kSeed * 71.0 + fi, kEndSel + 5.0)), kitHash(vec2(kSeed * 37.0 + fi, kEndSel + 9.0)));
      if (h.x < 0.5) {
        float cx = (h.y - 0.5) * 1.5 * kHw;
        float t = kDE / (0.025 + 0.1 * h.z);
        float w = 0.0013 * (1.0 - t);
        float d = abs(vKitA.y - cx);
        float cr = step(t, 1.0) * (1.0 - smoothstep(w, w + kAA * 0.8, d)) * min(1.0, (w + 0.0003) / kAA);
        kC *= 1.0 - 0.8 * cr;
      }
    }
  }
  // ---- posts / logs: long drying checks; ground contact (sand build-up + dust)
  if (kIsRound > 0.5) {
    float circ = 6.2832 * kHw;
    for (int i = 0; i < 2; i++) {
      float fi = float(i);
      vec3 h = vec3(kitHash(vec2(kSeed * 91.0 + fi, 2.0)), kitHash(vec2(kSeed * 53.0 + fi, 4.0)), kitHash(vec2(kSeed * 29.0 + fi, 6.0)));
      if (h.x < 0.75 - 0.4 * fi) {
        float a0 = (h.y - 0.5) * circ;
        float s0 = kLen * (0.03 + 0.4 * h.z), s1 = min(kLen * 0.99, s0 + kLen * (0.3 + 0.55 * fract(h.z * 7.1)));
        float t = clamp((vKitA.x - s0) / max(s1 - s0, 1e-3), 0.0, 1.0);
        float inside = step(s0, vKitA.x) * step(vKitA.x, s1);
        float wob = 0.003 * sin(vKitA.x * 9.0 + h.y * 20.0);
        float d = abs(mod(vKitA.y - a0 - wob + 0.5 * circ, circ) - 0.5 * circ);
        float w = (0.0007 + 0.02 * kHw) * sqrt(max(sin(3.1416 * t), 0.0));
        float cr = inside * (1.0 - smoothstep(w, w + kAA * 0.8, d)) * min(1.0, (w + 0.0003) / kAA);
        kC *= 1.0 - 0.78 * cr;
      }
    }
    float kG = vKitB.z * 0.01;
    if (kG > 0.005) {
      float hG = vKitA.x - kG;
      float sandUp = 1.0 - smoothstep(0.0, 0.035 + 0.05 * kitNoise(vec2(vKitA.y * 45.0, kSeed * 50.0)), hG);
      float dust = (1.0 - smoothstep(0.0, 0.5, hG)) * 0.4;
      float s = max(sandUp, dust);
      kC = mix(kC, vec3(0.58, 0.49, 0.36), s);
      roughnessFactor = mix(roughnessFactor, 1.0, s);
    }
  }
  // ---- nail pair over each support (heads, rust bleeding along the grain)
  float kNraw = floor(vKitB.y + 0.5);
  float kNmid = step(127.5, kNraw);
  float kNI = (kNraw - 128.0 * kNmid) * 0.002;
  if (kIsTop > 0.5 && kNI > 0.0) {
    float kNa = mix(kNI, kLen - kNI, kEndSel);
    float kMidSel = kNmid * step(abs(vKitA.x - 0.5 * kLen), abs(vKitA.x - kNa));
    kNa = mix(kNa, 0.5 * kLen, kMidSel);
    kEndSel += 2.0 * kMidSel;
    float kTwo = step(0.055, kHw);
    float kSide = vKitA.y >= 0.0 ? 1.0 : -1.0;
    vec2 kJ = (vec2(kitHash(vec2(kSeed * 37.0 + kEndSel, kSide)), kitHash(vec2(kSeed * 59.0 + kEndSel, kSide + 3.0))) - 0.5) * vec2(0.01, 0.008);
    float kx = mix(vKitA.y, abs(vKitA.y) - 0.5 * kHw, kTwo);
    vec2 kD = vec2(vKitA.x - kNa - kJ.x, kx - kJ.y);
    float kR = length(kD);
    float kHead = 1.0 - smoothstep(0.0048 - kAA * 0.7, 0.0048 + kAA * 0.7, kR);
    float kFar = smoothstep(0.004, 0.011, kAA);
    float kRs = kitNoise(kD * 300.0 + kSeed * 40.0);
    // rust + tannin stain: a dark halo, bleeding further along the grain than across it
    float kRust = (1.0 - smoothstep(0.004, 0.018 + 0.014 * kRs, length(kD * vec2(0.38, 1.0)))) * (0.5 + 0.5 * kRs);
    kC = mix(kC, kC * vec3(0.5, 0.36, 0.25), kRust * (0.4 + 0.45 * kOut) * mix(1.0, 0.6, kFar));
    // slight dent around the head (hammer rim) reads as a dark ring at low sun
    kC *= 1.0 - 0.3 * (1.0 - smoothstep(0.0, 0.0015, abs(kR - 0.0058))) * (1.0 - kFar);
    vec3 kHc = mix(vec3(0.05, 0.046, 0.043), vec3(0.2, 0.09, 0.035), kitNoise(kD * 900.0) * (0.3 + 0.6 * kOut));
    kC = mix(kC, kHc, kHead * (1.0 - kFar));
    roughnessFactor = mix(roughnessFactor, 0.55, kHead * (1.0 - kFar));
    normal = normalize(normal + (kGA * kD.x + kGX * (kD.y * mix(1.0, kSide, kTwo))) * (60.0 * kHead * (1.0 - kFar)));
  }
  // ---- end grain: growth rings around the pith (outside a flat-sawn board, inside a
  //      boxed-heart beam / post), darker and thirsty, radial splits
  if (kIsEnd > 0.5) {
    vec2 kS = vec2(vKitA.y, vKitA.x);
    float kHeart = step(5.5, kCls);
    vec2 kPi = mix(vec2((kSeed - 0.5) * 2.2 * kHw, -0.08 - 0.3 * fract(kSeed * 3.7)), (vec2(fract(kSeed * 5.3), fract(kSeed * 9.1)) - 0.5) * 0.35 * kHw, kHeart);
    vec2 kd = kS - kPi;
    float kRr = length(kd);
    float kRing = fract(kRr * (150.0 + 90.0 * fract(kSeed * 5.1)) + 0.35 * kitNoise(kS * 60.0 + kSeed * 9.0));
    float kLate = smoothstep(0.55, 0.8, kRing) * (1.0 - smoothstep(0.88, 1.0, kRing));
    kC = mix(kC, vec3(kL), 0.45) * vec3(0.66, 0.56, 0.45) * (1.0 - 0.3 * kLate);
    float kAng = atan(kd.y, kd.x);
    for (int i = 0; i < 2; i++) {
      float th = 6.2832 * kitHash(vec2(kSeed * 17.0 + float(i), 7.0));
      float da = abs(mod(kAng - th + 3.1416, 6.2832) - 3.1416) * kRr;
      float w = 0.0016 * smoothstep(0.1 * kHw, kHw, kRr) * kHeart + 0.0006 * (1.0 - kHeart) * (1.0 - float(i));
      float cr = (1.0 - smoothstep(w, w + kAA * 0.8, da)) * min(1.0, (w + 0.0002) / kAA);
      kC *= 1.0 - 0.8 * cr;
    }
    roughnessFactor = mix(roughnessFactor, 0.97, 0.7);
  }
  // board sides face into the narrow gaps between boards
  kC *= 1.0 - 0.22 * kIsBSide;
#endif

  // ---- lagoon waterline: wet film above, pale mineral ring, algae film below
  float kH = kP.y - uWaterLevel;
  if (kH < 0.5 && kOut > 0.5) {
    float kn = kitNoise(kP.xz * 9.0 + vec2(kP.y * 3.0));
    float kWet = 1.0 - smoothstep(0.02, 0.26 + 0.14 * kn, kH);
    float kSub = 1.0 - smoothstep(-0.07, 0.01, kH);
    float kq = kH - 0.1 - 0.05 * kn;
    float kRingM = exp(-kq * kq * 500.0) * (1.0 - kSub);
    kC = mix(kC, kC * 0.6, kWet * (1.0 - kSub));
    kC = mix(kC, kC * vec3(0.62, 0.7, 0.5) + vec3(0.012, 0.03, 0.01), kSub * (0.6 + 0.4 * kn));
    kC = mix(kC, vec3(0.46, 0.44, 0.4), kRingM * 0.3);
    roughnessFactor = mix(roughnessFactor, 0.35, kWet * (1.0 - kSub));
  }
  // ---- rain / dew runs on vertical faces (faint: a desert)
  float kV = 1.0 - abs(kN.y);
  if (kOut > 0.5 && kV > 0.5) {
    vec2 sp = vec2(dot(kP.xz, vec2(-kN.z, kN.x)) * 24.0, kP.y * 1.4);
    float st = smoothstep(0.6, 0.92, kitNoise(sp) * 0.65 + kitNoise(sp * vec2(2.7, 0.6) + 5.0) * 0.35);
    kC *= 1.0 - 0.1 * st * smoothstep(0.5, 1.0, kV);
  }
  // ---- cupped (edges proud) or crowned boards: each board catches the low sun on its own
  if (kIsTop > 0.5) {
    float kAx = clamp(vKitA.y / kHw, -1.0, 1.0);
    float kCup = (0.03 + 0.05 * fract(kSeed * 11.3)) * (fract(kSeed * 23.7) < 0.72 ? 1.0 : -0.7) * (0.4 + 0.6 * kOut);
    normal = normalize(normal - kGX * (kAx * kCup));
  }
  diffuseColor.rgb = max(kC, 0.0);
#ifdef KIT_WOOD_DEBUG
  // ?kitwood=1 face class, 2 wear / ground line, 3 board seed, 4 nails byte, 5 along/len
  vec3 kDbg = vec3(0.0);
  #if KIT_WOOD_DEBUG == 1
    kDbg = kHas < 0.5 ? vec3(0.2) : kCls < 1.5 ? vec3(0.9, 0.9, 0.2) : kCls < 2.5 ? vec3(0.2, 0.9, 0.2) : kCls < 3.5 ? vec3(0.9, 0.2, 0.2) : kCls < 4.5 ? vec3(0.2, 0.2, 0.9) : kCls < 5.5 ? vec3(0.2, 0.9, 0.9) : kCls < 6.5 ? vec3(0.9, 0.2, 0.9) : vec3(1.0, 0.5, 0.1);
    kDbg *= 1.0 - 0.5 * kLane;
  #elif KIT_WOOD_DEBUG == 2
    kDbg = vec3(vKitB.z / 255.0);
  #elif KIT_WOOD_DEBUG == 3
    kDbg = vec3(fract(kSeed * 7.0), fract(kSeed * 13.0), fract(kSeed * 3.0));
  #elif KIT_WOOD_DEBUG == 4
    kDbg = vec3(vKitB.y / 255.0, kNmid, 0.0);
  #else
    kDbg = vec3(fract(vKitA.x), vKitA.x / max(kLen, 0.01), 0.0);
  #endif
  diffuseColor.rgb = kDbg;
#endif
}
`;function J({sway:e=!1,glow:t=!1,flame:n=!1,lamp:r=!1,windowSky:i=!1,pane:a=!1,metal:o=!1,cloth:s=!1,fibre:c=!1,sail:l=!1,noSun:u=!1,wood:d=!1,woodDetail:f=1,woodDebug:p=0}){return function(m){let h=m.vertexShader,g=m.fragmentShader;if((d||n||i||a||o||s||l)&&(g=g.replace(`#include <common>`,`#include <common>
`+G)),d){let e=this;m.uniforms.uKitOutdoor={get value(){return e.userData?.kitOutdoor??1},set value(e){}},m.uniforms.uKitWeather={get value(){return e.userData?.kitWeather??1},set value(e){}},h=h.replace(`#include <common>`,`#include <common>
`+ee).replace(`#include <begin_vertex>`,`#include <begin_vertex>
`+te),g=g.replace(`#include <common>`,`#include <common>\n#define KIT_WOOD_DETAIL ${f}\n${p?`#define KIT_WOOD_DEBUG ${p}\n`:``}`+ne).replace(`#include <normal_fragment_maps>`,`#include <normal_fragment_maps>
`+re).replace(`#include <lights_pars_begin>`,`#include <lights_pars_begin>
#define KIT_WOOD_PT
`+q).replace(`#include <lights_fragment_maps>`,K+`#include <lights_fragment_maps>`)}let _=n||r,v=t||r,y=e||v,b=n||o,x=``;y&&(x+=`uniform float uTime;
`),e&&(x+=`#ifdef USE_INSTANCING
attribute vec2 aKitSway;
#endif
`),v&&(x+=`#ifdef USE_INSTANCING
attribute vec2 aKitFlick;
#endif
varying float vKitFlicker;
`),_&&(x+=`attribute vec4 aFlame;
varying vec3 vKitFlame;
varying float vKitScale;
varying float vKitTop;
`),b&&(x+=`varying vec3 vKitLocal;
`),h=h.replace(`#include <common>`,`#include <common>
`+x);let S=``;_&&(S+=`      vec3 kFl = aFlame.xyz;
      vKitTop = aFlame.w;
`),e&&(S+=`
#ifdef USE_INSTANCING
      {
        float kPh = aKitSway.x;
        float kAmp = aKitSway.y;
        float kAx = kAmp * (sin(uTime * 1.13 + kPh) * 0.6 + sin(uTime * 2.71 + kPh * 1.7) * 0.4);
        float kAz = kAmp * (sin(uTime * 0.93 + kPh * 2.3) * 0.6 + sin(uTime * 2.13 + kPh * 0.7) * 0.4);
        float kcx = cos(kAx), ksx = sin(kAx), kcz = cos(kAz), ksz = sin(kAz);
        mat2 kR1 = mat2(kcx, ksx, -ksx, kcx), kR2 = mat2(kcz, ksz, -ksz, kcz);
        transformed.yz = kR1 * transformed.yz;
        transformed.xy = kR2 * transformed.xy;
        ${_?`kFl.yz = kR1 * kFl.yz; kFl.xy = kR2 * kFl.xy;`:``}
      }
#endif
`),v&&(S+=`
#ifdef USE_INSTANCING
      {
        float kf = sin(uTime * 7.3 + aKitFlick.x) * 0.5 + sin(uTime * 13.1 + aKitFlick.x * 2.1) * 0.3 + sin(uTime * 2.3 + aKitFlick.x) * 0.2;
        vKitFlicker = 1.0 + kf * aKitFlick.y;
      }
#else
      vKitFlicker = 1.0;
#endif
`),_&&(S+=`
#ifdef USE_INSTANCING
      vKitFlame = (modelMatrix * instanceMatrix * vec4(kFl, 1.0)).xyz;
      vKitScale = length(instanceMatrix[1].xyz);
#else
      vKitFlame = (modelMatrix * vec4(kFl, 1.0)).xyz;
      vKitScale = 1.0;
#endif
`),b&&(S+=`      vKitLocal = position;
`),S&&(h=h.replace(`#include <begin_vertex>`,`#include <begin_vertex>
`+S));let C=``;v&&(C+=`varying float vKitFlicker;
`),_&&(C+=`varying vec3 vKitFlame;
varying float vKitScale;
varying float vKitTop;
`),b&&(C+=`varying vec3 vKitLocal;
`),C&&(g=g.replace(`#include <common>`,`#include <common>
`+C)),t&&(g=g.replace(`#include <emissivemap_fragment>`,`#include <emissivemap_fragment>
      {
        vec3 kPane = totalEmissiveRadiance;
#ifdef USE_COLOR
        kPane *= vColor.rgb;
#endif
        totalEmissiveRadiance = kPane;
        ${n?`
        // Clear lantern glass (the material is blended: rgb added, background scaled by 1 - a).
        // What shows: the candle flame where the view ray passes it, a faint glow its light
        // makes in the glass, soot filming the top of the panes, Fresnel reflections that
        // ripple over drawn-glass waves and seeds. The candle, cap and far corner bars are
        // real geometry seen through the glass.
        vec3 kV = normalize(vLagoonWorldPos - cameraPosition);
        float kS = max(vKitScale, 0.3);
        vec3 kLp = vKitLocal;
        // drawn-glass ripples (horizontal waves) + a few seeds: bump from local noise
        float kRip = kS * (0.00022 * sin(kLp.y * 230.0 + 3.0 * kitNoise(kLp.xz * 37.0 + kLp.y * 11.0))
                   + 0.00018 * kitNoise(kLp.xz * 140.0 + kLp.y * 90.0));
        vec2 kDh = vec2(dFdx(kRip), dFdy(kRip));
        vec3 kSx = dFdx(-vViewPosition), kSy = dFdy(-vViewPosition);
        vec3 kR1 = cross(kSy, normal), kR2 = cross(normal, kSx);
        float kDet = dot(kSx, kR1);
        normal = normalize(abs(kDet) * normal - sign(kDet) * (kDh.x * kR1 + kDh.y * kR2));
        // flame: a teardrop 3.6 cm tall x 1.3 cm wide (x lantern scale) standing on the wick,
        // licking slightly with the flicker. Far away it is kept >= ~1 px (energy conserved)
        // so distant lanterns still read as points of flame.
        float kPix = max(length(fwidth(vLagoonWorldPos)), 1e-5);
        float kH0 = 0.036 * kS * (0.92 + 0.12 * vKitFlicker);
        float kW0 = 0.0068 * kS;
        float kGw = max(1.0, 1.2 * kPix / (0.62 * kW0));
        float kGh = max(1.0, 1.6 * kPix / kH0);
        vec3 kTo = vKitFlame - cameraPosition;
        vec3 kOff = kTo - kV * dot(kTo, kV);                 // wick -> view ray (perpendicular)
        float kH = kH0 * kGh;
        float kFy = -kOff.y / kH;                             // 0 at the wick, 1 at the tip
        float kFh = length(kOff - vec3(0.0, kOff.y, 0.0));
        float kFyc = clamp(kFy, 0.0, 1.0);
        float kW = kW0 * kGw * (0.25 + 1.6 * sqrt(kFyc) * (1.0 - kFyc)) + 0.0006;
        float kIn = kFh / kW;
        float kCore = (1.0 - smoothstep(0.55, 1.0, kIn)) * smoothstep(-0.05, 0.08, kFy) * (1.0 - smoothstep(0.85, 1.05, kFy));
        float kHot = kCore * (1.0 - smoothstep(0.0, 0.55, kIn)) * (1.0 - smoothstep(0.15, 0.6, kFy));
        float kBlue = kCore * (1.0 - smoothstep(0.02, 0.14, kFy));
        // glow: light scattered by dust / the seeded glass around the flame (~5 cm)
        vec3 kCtr = vec3(kOff.x, kOff.y + 0.4 * kH0, kOff.z);
        float kHalo = exp(-length(kCtr) / (0.026 * kS));
        float kGl = 0.8 + 0.4 * kitNoise(kLp.xy * 95.0 + kLp.z * 43.0) * kitNoise(kLp.zy * 37.0 + 3.1);
        vec3 kFlameC = mix(vec3(1.0, 0.55, 0.16), vec3(1.0, 0.86, 0.6), kHot);
        kFlameC = mix(kFlameC, vec3(0.35, 0.45, 1.0), kBlue * 0.6);
        // soot: a brown-black film under the cap, thickest at the top, patchy
        float kSn = kitNoise(vec2(atan(kLp.z, kLp.x) * 3.0, kLp.y * 30.0));
        float kSoot = (1.0 - smoothstep(0.0, 0.03 + 0.03 * kSn, vKitTop - kLp.y)) * (0.55 + 0.45 * kSn);
        float kFlameI = (9.0 + 22.0 * kHot) / (kGw * kGh);
        totalEmissiveRadiance = (kPane * 0.018 + vec3(1.0, 0.45, 0.12) * (kHalo * 1.1 * kGl)) * (1.0 - 0.8 * kSoot) + kFlameC * (kCore * kFlameI);
        diffuseColor.rgb = mix(diffuseColor.rgb, vec3(0.018, 0.014, 0.011), kSoot);
        // coverage: clean glass passes ~92 %; Fresnel reflectance, soot and the flame cover more
        float kNV = clamp(abs(dot(normal, normalize(vViewPosition))), 0.0, 1.0);
        float kG = 1.0 - kNV; float kG2 = kG * kG;
        float kFr = 0.04 + 0.96 * kG2 * kG2 * kG;
        diffuseColor.a = clamp(0.06 + kFr + 0.7 * kSoot + min(1.0, kCore * 1.5 / (kGw * kGh)) + 0.2 * kHalo, 0.0, 1.0);`:``}
        ${i?`
        // inner daylight panes (vertex colour bluish / neutral; outer panes are amber)
        float kDay = smoothstep(0.25, 0.45, vColor.b / max(vColor.r, 1e-3));
        if (kDay > 0.0) {
          vec3 kDir = normalize(vLagoonWorldPos - cameraPosition);
          vec2 kWv = vec2(kitNoise(vLagoonWorldPos.xy * 23.0 + vLagoonWorldPos.z * 11.0), kitNoise(vLagoonWorldPos.zy * 23.0 + 5.0)) - 0.5;
          kDir = normalize(kDir + vec3(kWv.x, kWv.y * 0.6, -kWv.x) * 0.035);
          vec3 kSky = lagoonSkyRadiance(kDir);
          kSky = kSky / (1.0 + dot(kSky, vec3(0.3333))) * 1.45;
          vec3 kHz = lagoonSkyRadiance(normalize(vec3(kDir.x, 0.02, kDir.z)));
          kHz = kHz / (1.0 + dot(kHz, vec3(0.3333))) * 1.45;
          // the oasis outside, soft as through old glass: a ragged line of palm / tree crowns
          // just above the horizon (hazed toward the sky), and below it, looking down past the
          // crowns, sand, green scrub and turquoise lagoon water in the sun
          float kAz = atan(kDir.z, kDir.x);
          float kTl = 0.03 + 0.06 * kitFbm(vec2(kAz * 7.0, 1.7)) + 0.025 * kitNoise(vec2(kAz * 55.0, 3.1));
          float kTree = (1.0 - smoothstep(kTl - 0.01, kTl + 0.004, kDir.y)) * smoothstep(-0.2, -0.08, kDir.y);
          vec3 kFol = vec3(0.075, 0.1, 0.045) * (0.7 + 0.6 * kitNoise(vec2(kAz * 140.0, kDir.y * 110.0)));
          kFol = mix(kFol * 2.2, kHz, 0.3 + 0.3 * smoothstep(-0.02, kTl, kDir.y));
          float kDown = max(-kDir.y, 0.0);
          vec2 kGp = kDir.xz / max(kDown, 0.08);
          float kF1 = kitFbm(kGp * 0.16 + 3.0), kF2 = kitFbm(kGp * 0.33 + 9.0);
          vec3 kAlb = mix(vec3(0.56, 0.47, 0.34), vec3(0.11, 0.15, 0.07), smoothstep(0.42, 0.62, kF1));
          kAlb = mix(kAlb, vec3(0.08, 0.34, 0.34), smoothstep(0.46, 0.62, kF2) * smoothstep(0.15, 0.35, kDown));
          vec3 kGround = mix(kAlb * 1.9, kHz * 0.9, exp(-kDown * 8.0) * 0.8);
          vec3 kView = mix(kSky, kGround, 1.0 - smoothstep(-0.04, 0.0, kDir.y));
          kView = mix(kView, kFol, kTree);
          float kLum = dot(vColor.rgb, vec3(0.3333));
          totalEmissiveRadiance = mix(kPane, kView * clamp(kLum * 1.35, 0.6, 1.25) * emissive, kDay);
        }`:``}
        ${a?`
        // Clear window glass (blended like the lantern glass: rgb added, background x (1 - a)).
        // Near, the REAL room shows through from outside and the real oasis from inside; the
        // glass adds its Fresnel reflection, the wobble of old drawn glass bending that
        // reflection, and dust / grime (thicker toward the bottom corners). Far away (room
        // interiors are hidden beyond ~70 m) and in the water mirror (camera below the
        // surface) the pane turns opaque and shows the lantern-lit room as a warm glow
        // (vertex colour = that radiance).
        vec3 kWp = vLagoonWorldPos;
        float kDist = length(kWp - cameraPosition);
        float kFar = max(smoothstep(30.0, 60.0, kDist), 1.0 - step(uWaterLevel - 0.02, cameraPosition.y));
        float kRip = 0.0006 * sin(kWp.y * 26.0 + dot(kWp.xz, vec2(2.3, 1.7)) + 2.5 * kitNoise(kWp.xz * 7.0 + kWp.y * 3.0))
                   + 0.00025 * kitNoise(vec2(kWp.x + kWp.z, kWp.y) * 60.0);
        vec2 kDh = vec2(dFdx(kRip), dFdy(kRip));
        vec3 kSx = dFdx(-vViewPosition), kSy = dFdy(-vViewPosition);
        vec3 kR1 = cross(kSy, normal), kR2 = cross(normal, kSx);
        float kDet = dot(kSx, kR1);
        normal = normalize(abs(kDet) * normal - sign(kDet) * (kDh.x * kR1 + kDh.y * kR2) * (1.0 - kFar));
        float kNV = clamp(abs(dot(normal, normalize(vViewPosition))), 0.0, 1.0);
        float kG = 1.0 - kNV; float kG2 = kG * kG;
        float kFr = 0.04 + 0.96 * kG2 * kG2 * kG;
        // dust film: patchy, heavier low on the pane (rain splash / settled dust)
        float kDustN = kitFbm(kWp.xz * 3.7 + kWp.y * 5.3);
        float kDust = 0.035 + 0.09 * smoothstep(0.35, 0.8, kDustN) + 0.05 * kitNoise(kWp.xz * 40.0 + kWp.y * 31.0);
        diffuseColor.rgb = mix(vec3(0.3, 0.27, 0.22) * kDust, vec3(0.01), kFar);
        roughnessFactor = mix(0.04, 0.12, kFar);
        // lamp glow: the pooled lantern lights only reach the room while you are near it, so
        // the warm light of the room is carried by the pane itself from ~10 m out
        // (inner panes, vertex colour bluish / neutral, face into the room: no glow)
        float kInner = smoothstep(0.25, 0.45, vColor.b / max(vColor.r, 1e-3));
        totalEmissiveRadiance = kPane * ((0.55 * kFar + 0.12 * smoothstep(10.0, 35.0, kDist) * (1.0 - kFar)) * (1.0 - kInner));
        diffuseColor.a = mix(clamp(kFr + 0.85 * kDust, 0.0, 1.0), 1.0, kFar);`:``}
        totalEmissiveRadiance *= vKitFlicker;
      }
`),(n||a)&&(g=g.replace(`#include <dithering_fragment>`,`#include <dithering_fragment>
      gl_FragColor.rgb = max(gl_FragColor.rgb - (1.0 - gl_FragColor.a) * lagoonAtmosphere(vec3(0.0), vLagoonWorldPos), 0.0);`))),o&&(g=g.replace(`#include <metalnessmap_fragment>`,`#include <metalnessmap_fragment>
      float kWaxM = 0.0;
#ifdef USE_COLOR
      {
        float kLum = dot(vColor.rgb, vec3(0.3333));
        float kIron = 1.0 - smoothstep(0.38, 0.62, kLum);
        vec3 kLp = vKitLocal * 48.0;
        float kN1 = kitNoise(kLp.xy + kLp.z * 0.71) * 0.55 + kitNoise(kLp.zy * 1.31 + 5.0) * 0.45;
        float kN2 = kitNoise(kLp.xz * 3.1 + kLp.y * 1.7 + 11.0);
        // blackened wrought iron: dark, satin, partly metallic; rust blooms (non-metal) + pits
        float kRust = smoothstep(0.64, 0.86, kN1 + 0.16 * kN2) * ${r?`0.3`:`0.85`};   // lanterns: kept blacked / oiled
        vec3 kIronC = vec3(0.045, 0.043, 0.04) * (0.8 + 0.4 * kN2);
        vec3 kRustC = mix(vec3(0.11, 0.05, 0.026), vec3(0.19, 0.09, 0.042), kN2);
        diffuseColor.rgb = mix(diffuseColor.rgb, mix(kIronC, kRustC, kRust), kIron);
        metalnessFactor = mix(metalnessFactor, mix(0.5, 0.0, kRust), kIron);
        roughnessFactor = mix(roughnessFactor, mix(0.48, 0.92, kRust), kIron);
        // brass: grime settles low, the polish survives where hands / cloths reach
        float kGrime = (1.0 - kIron) * smoothstep(0.35, 0.8, kN1) * 0.45;
        diffuseColor.rgb *= 1.0 - kGrime;
        roughnessFactor = mix(roughnessFactor, 0.75, kGrime);
        ${r?`
        // candle wax (lantern interiors: tint b/r > 0.84 and bright): creamy, soft sheen
        kWaxM = step(0.84, vColor.b / max(vColor.r, 1e-3)) * step(0.7, kLum);
        diffuseColor.rgb = mix(diffuseColor.rgb, vec3(0.62, 0.57, 0.47) * (0.94 + 0.06 * kN2), kWaxM);
        metalnessFactor = mix(metalnessFactor, 0.0, kWaxM);
        roughnessFactor = mix(roughnessFactor, 0.42, kWaxM);`:``}
      }
#endif
`)),r&&(g=g.replace(`#include <lights_pars_begin>`,`#include <lights_pars_begin>
float kKitPtScale = 1.0;
#if NUM_POINT_LIGHTS > 0
void kitPointLightInfo(const in PointLight pl, const in vec3 gp, out IncidentLight dl) { getPointLightInfo(pl, gp, dl); dl.color *= kKitPtScale; }
#define getPointLightInfo kitPointLightInfo
#endif`),g=g.replace(`#include <lights_fragment_begin>`,`{
        float kS0 = max(vKitScale, 0.3);
        float kD0 = length(vKitFlame + vec3(0.0, 0.012 * kS0, 0.0) - vLagoonWorldPos) / kS0;
        kKitPtScale = 0.03 + 0.97 * smoothstep(0.2, 0.3, kD0);
      }
#include <lights_fragment_begin>`),g=g.replace(`#include <lights_fragment_end>`,`#include <lights_fragment_end>
      {
        float kS = max(vKitScale, 0.3);
        vec3 kToF = vKitFlame + vec3(0.0, 0.012 * kS, 0.0) - vLagoonWorldPos;   // flame centre
        float kDw = max(length(kToF), 1e-4);
        vec3 kLw = kToF / kDw;
        float kDl = kDw / kS;
        float kInL = 1.0 - smoothstep(0.2, 0.3, kDl);
        vec3 kLv = normalize((viewMatrix * vec4(kLw, 0.0)).xyz);
        float kNL = max(dot(normal, kLv), 0.0);
        vec3 kIrr = vec3(1.0, 0.56, 0.22) * (0.03 * vKitFlicker * kS * kS / (kDw * kDw + 0.0004 * kS * kS)) * kNL * kInL;
        reflectedLight.directDiffuse += kIrr * BRDF_Lambert(material.diffuseColor);
        reflectedLight.directSpecular += kIrr * BRDF_GGX(kLv, normalize(vViewPosition), normal, material);
        totalEmissiveRadiance += kWaxM * vec3(1.0, 0.52, 0.2) * (1.1 * vKitFlicker * exp(-kDl / 0.017));   // flame light scattered in the wax top
      }`)),s&&(g=g.replace(`#include <normal_fragment_maps>`,`#include <normal_fragment_maps>
      {
        // slack wrinkles + compression hollows: bump from world-space noise (screen derivatives)
        vec3 kWp = vLagoonWorldPos;
        float kH = 0.0016 * (kitNoise(kWp.xz * 7.3 + kWp.y * 5.1) + 0.6 * kitNoise(kWp.zy * 13.7 + kWp.x * 4.3)
                   + 0.35 * kitNoise(vec2(kWp.x + kWp.z, kWp.y) * 31.0));
        vec2 kDh = vec2(dFdx(kH), dFdy(kH));
        vec3 kSx = dFdx(-vViewPosition), kSy = dFdy(-vViewPosition);
        vec3 kR1 = cross(kSy, normal), kR2 = cross(normal, kSx);
        float kDet = dot(kSx, kR1);
        vec3 kGrad = sign(kDet) * (kDh.x * kR1 + kDh.y * kR2);
        normal = normalize(abs(kDet) * normal - kGrad);
        // fibre asperity scattering: cloth brightens toward grazing angles (the fuzz catches
        // light), which reads as fabric instead of a plastic highlight
        vec3 kVw = normalize(cameraPosition - vLagoonWorldPos);
        vec3 kNw = normalize((vec4(normal, 0.0) * viewMatrix).xyz);
        float kNV = clamp(abs(dot(kNw, kVw)), 0.0, 1.0);
        float kG = 1.0 - kNV; float kG3 = kG * kG * kG;
        diffuseColor.rgb *= 1.0 + 0.5 * kG3;
        roughnessFactor = max(roughnessFactor, 0.86);
        // sun fading on exposed tops (outdoor textiles; interiors are dimmed by the sky term anyway)
        float kUp = smoothstep(0.4, 0.95, kNw.y);
        float kL = dot(diffuseColor.rgb, vec3(0.2126, 0.7152, 0.0722));
        diffuseColor.rgb = mix(diffuseColor.rgb, vec3(kL) * 1.08 + 0.02, kUp * 0.14 * uLagoonEnvScale);
      }
`)),u&&(g=g.replace(`#include <lights_fragment_maps>`,`{
  float kKitNoSun = 1.0;
`+K+`}
#include <lights_fragment_maps>`)),c&&(g=g.replace(`#include <normal_fragment_maps>`,`#include <normal_fragment_maps>
      {
        vec3 kVw = normalize(cameraPosition - vLagoonWorldPos);
        vec3 kNw = normalize((vec4(normal, 0.0) * viewMatrix).xyz);
        float kG = 1.0 - clamp(abs(dot(kNw, kVw)), 0.0, 1.0);
        diffuseColor.rgb *= 1.0 + 0.4 * kG * kG * kG;
        roughnessFactor = max(roughnessFactor, 0.78);
      }
`)),l&&(g=g.replace(`#include <normal_fragment_maps>`,`#include <normal_fragment_maps>
      {
        vec3 kWp = vLagoonWorldPos;
        float kM = kitFbm(kWp.xz * 0.9 + kWp.y * 0.7);
        float kTide = smoothstep(0.55, 0.62, kM) * (1.0 - smoothstep(0.62, 0.72, kM));   // dried water-mark rings
        float kGr = smoothstep(0.45, 0.85, kitFbm(kWp.xz * 2.7 + 11.0)) * 0.12;          // dust / grime
        diffuseColor.rgb *= 1.0 - kTide * 0.1 - kGr;
        diffuseColor.rgb = mix(diffuseColor.rgb, diffuseColor.rgb * vec3(0.97, 0.93, 0.85), kGr);
      }
`),g=g.replace(`#include <opaque_fragment>`,`{
        vec3 kN = normalize((vec4(normal, 0.0) * viewMatrix).xyz);
        float kBack = max(dot(-kN, uSunDir), 0.0);
        if (kBack > 0.0) {
          vec3 kV = normalize(cameraPosition - vLagoonWorldPos);
          float kF = max(dot(-kV, uSunDir), 0.0);
          float kF2 = kF * kF; float kF4 = kF2 * kF2; float kF8 = kF4 * kF4;
          float kLobe = 0.55 + 1.1 * kF4 + 2.6 * kF8 * kF4;
          float kSh = lagoonSunShadow(vLagoonWorldPos - kN * 0.02, -kN);
          vec3 kT = diffuseColor.rgb * (0.5 + 0.5 * diffuseColor.rgb) * vec3(1.0, 0.9, 0.74);
          outgoingLight += kT * uSunColor * (uSunIntensity * 0.3 * (0.35 + 0.65 * kBack) * kBack * kLobe * kSh);
        }
      }
#include <opaque_fragment>`)),m.vertexShader=h,m.fragmentShader=g}}var ie=`
vec3 rugPal(float k) {
  if (k < 0.5) return vec3(0.27, 0.05, 0.034);        // 0 madder red
  if (k < 1.5) return vec3(0.034, 0.047, 0.1);        // 1 indigo
  if (k < 2.5) return vec3(0.5, 0.43, 0.32);          // 2 undyed ivory
  if (k < 3.5) return vec3(0.4, 0.24, 0.07);          // 3 weld ochre
  if (k < 4.5) return vec3(0.07, 0.045, 0.03);        // 4 walnut brown
  if (k < 5.5) return vec3(0.15, 0.2, 0.27);          // 5 pale indigo
  return vec3(0.15, 0.035, 0.03);                     // 6 deep madder
}
// stepped (woven) diamond distance: |dx|/a + |dy|/b in quantized coordinates
float rugDia(vec2 q, vec2 c, vec2 ab) { vec2 d = abs(q - c) / ab; return d.x + d.y; }
vec4 bake(vec2 uv) {
  vec2 p = uv * vec2(2.0, 1.4);
  // weave grid: 4.5 mm rows along x, 6 mm warp pairs along y
  vec2 q = (floor(p / vec2(0.0045, 0.006)) + 0.5) * vec2(0.0045, 0.006);
  float eY = min(q.y, 1.4 - q.y);                     // to the long sides (selvedges)
  float eX = min(q.x, 2.0 - q.x);                     // to the ends
  float k = 0.0;
  if (eX < 0.03) {
    // plain weft-faced end bands (ivory with two red stripes)
    k = (abs(eX - 0.012) < 0.004 || abs(eX - 0.022) < 0.003) ? 0.0 : 2.0;
  } else {
    float e = min(eY, eX - 0.03);
    float s = eY < eX - 0.03 ? q.x : q.y;              // coordinate along the nearest edge
    if (e < 0.012) k = 4.0;                            // overcast selvedge
    else if (e < 0.032) {
      // guard: ivory ground, red / indigo running teeth
      float t = abs(fract(s / 0.048) - 0.5) * 2.0;
      float h = (e - 0.012) / 0.02;
      k = h < t * 0.8 ? (fract(s / 0.096) < 0.5 ? 0.0 : 1.0) : 2.0;
    } else if (e < 0.16) {
      // main border: indigo ground, reciprocal madder triangles, ivory outline
      float z = abs(fract(s / 0.13) - 0.5) * 2.0;
      float h = (e - 0.032) / 0.128;
      float dd = h - z;
      k = abs(dd) < 0.09 ? 2.0 : (dd < 0.0 ? 0.0 : 1.0);
      // small ochre diamonds in the indigo peaks
      vec2 cc = vec2(floor(s / 0.13) * 0.13 + 0.065, 0.0);
      float sd = abs(s - cc.x) / 0.028 + abs(h - 0.8) / 0.12;
      if (sd < 1.0) k = 3.0;
    } else if (e < 0.19) {
      k = 6.0;                                         // inner guard: deep madder, ivory dots
      float t = abs(fract(s / 0.04) - 0.5) * 0.04;
      if (t + abs(e - 0.175) < 0.009) k = 2.0;
    } else if (e < 0.198) k = 4.0;
    else {
      // field: madder ground, three hooked medallions along the length, small stars between
      k = 0.0;
      float mx = clamp(floor((q.x - 0.25) / 0.5 + 0.5), 0.0, 2.0) * 0.5 + 0.5;
      vec2 c = vec2(mx, 0.7);
      float d = rugDia(q, c, vec2(0.22, 0.4));
      if (d < 1.0) {
        k = 1.0;
        if (d > 0.86) k = 2.0;
        if (d < 0.62) k = 3.0;
        if (d < 0.5) k = 0.0;
        if (d < 0.3) k = 2.0;
        if (d < 0.18) k = 1.0;
        vec2 cr = abs(q - c);
        if (d < 0.5 && d > 0.3 && (cr.x < 0.009 || cr.y < 0.012)) k = 4.0;
      }
      // hooks at the medallion tips (along its long axis)
      for (int i = 0; i < 2; i++) {
        float sg = i == 0 ? -1.0 : 1.0;
        vec2 hc = c + vec2(0.0, sg * 0.43);
        vec2 hd = abs(q - hc);
        if (hd.x < 0.045 && hd.y < 0.03 && !(hd.x < 0.02 && hd.y < 0.012)) k = 1.0;
      }
      // eight-point stars between the medallions and in the corners of the field
      vec2 sc = vec2(floor(q.x / 0.25) * 0.25 + 0.125, q.y < 0.7 ? 0.36 : 1.04);
      if (abs(sc.x - 1.0) > 0.1 && abs(sc.x - 0.5) > 0.1 && abs(sc.x - 1.5) > 0.1) {
        vec2 sd2 = abs(q - sc);
        float star = min(sd2.x / 0.05 + sd2.y / 0.02, sd2.x / 0.02 + sd2.y / 0.05);
        if (star < 1.0) k = star < 0.45 ? 3.0 : 2.0;
      }
      // scattered little diamonds (the weaver's fillers)
      vec2 fc = (floor(q / vec2(0.09, 0.12)) + 0.5) * vec2(0.09, 0.12);
      float fh = bk_hash12(floor(q / vec2(0.09, 0.12)) + 3.0);
      if (k == 0.0 && fh > 0.72 && rugDia(q, fc, vec2(0.014, 0.02)) < 1.0) k = fh > 0.86 ? 5.0 : 2.0;
    }
  }
  vec3 col = rugPal(k);
  // abrash: dye-lot bands across the rug (irregular widths), each colour shifting on its own
  float band = floor(p.x * 4.2 + 0.7 * bk_vnoise(vec2(p.x * 6.0, 0.5), vec2(64.0, 8.0)));
  float ab = bk_hash12(vec2(band, k * 7.3 + 1.0));
  col *= 0.88 + 0.22 * ab;
  col = mix(col, col * vec3(1.04, 1.0, 0.92), bk_hash12(vec2(band, 13.0)) * 0.6);
  // yarn slubs (streaks along the weft rows) + fibre fuzz
  float sl = bk_vnoise(vec2(p.x * 222.0, p.y * 18.0), vec2(444.0, 26.0));
  float fz = bk_fbm(uv, vec2(96.0, 67.0), 3);
  col *= 0.9 + 0.14 * sl + 0.07 * fz;
  // traffic wear: abraded wool in the middle goes duller / greyer, warps start to show
  vec2 wc = (p - vec2(1.0, 0.7)) * vec2(0.85, 1.35);
  float w = (1.0 - smoothstep(0.1, 0.75, length(wc))) * (0.55 + 0.45 * bk_fbm(uv + 7.1, vec2(5.0, 4.0), 3));
  float L = dot(col, vec3(0.2126, 0.7152, 0.0722));
  col = mix(col, vec3(L) * vec3(1.05, 1.0, 0.92) + 0.02, clamp(w, 0.0, 1.0) * 0.28);
  // grime in the outer border (feet, dust)
  col *= 1.0 - 0.1 * (1.0 - smoothstep(0.0, 0.12, min(eX, eY)));
  return vec4(max(col, 0.0), 1.0);
}`,ae=`
float stH(vec2 p) { return bk_hash12(p); }
// top-most stem at uv: x = layer (-1 none), y = signed position across the stem (-1..1),
// z = stem random, w = distance to the nearer stem end (tile-v units)
vec4 strawHit(vec2 uv) {
  float sway = 0.005 * bk_fbm(vec2(uv.x, uv.y * 0.5), vec2(5.0, 2.0), 3);
  float cx = uv.x * 14.0 + 0.4 * bk_fbm(vec2(uv.x, uv.y * 0.25), vec2(3.0, 1.0), 2);
  float cid = mod(floor(cx), 14.0);
  float up = uv.y < 0.5 ? 1.0 : 0.0;                 // which end is nearer
  float cl = stH(vec2(cid, 5.3 + up * 17.0));
  // clump reach from the middle: most clumps trimmed near the end (0.36 .. 0.46), a few short
  float clumpEnd = cl > 0.86 ? 0.25 + 0.5 * (cl - 0.86) : 0.36 + 0.1 * (1.0 - cl);
  vec4 best = vec4(-1.0, 0.0, 0.0, 0.0);
  float bestH = -1.0;
  float dm = abs(uv.y - 0.5);
  for (int k = 0; k < 3; k++) {
    float fk = float(k);
    float NS = k == 0 ? 120.0 : (k == 1 ? 89.0 : 67.0);
    float slant = k == 0 ? 0.0 : (k == 1 ? 0.07 : -0.09);    // layers cross at a few degrees
    float x = (uv.x + sway * (1.0 + 0.7 * fk) + slant * (uv.y - 0.5)) * NS + fk * 0.37;
    float sid = mod(floor(x), NS);
    float fx = fract(x);
    float r1 = stH(vec2(sid, fk * 13.1 + 1.0));
    float r2 = stH(vec2(sid, fk * 7.7 + 3.0));
    float r3 = stH(vec2(sid, fk * 3.3 + 7.0 + up * 11.0));
    float reach = clumpEnd + 0.04 * (r3 - 0.5) + (r3 > 0.95 ? 0.05 : 0.0) - 0.02 * fk;
    reach = min(reach, 0.475);
    float left = reach - dm;                          // > 0 inside the stem
    float w = (0.42 + 0.38 * r2) * (0.3 + 0.7 * smoothstep(0.0, 0.05, left));
    float e = (fx - 0.5) / (0.5 * w);
    if (left > 0.0 && abs(e) < 1.0) {
      float h = (1.0 - 0.2 * fk) * (0.7 + 0.3 * sqrt(1.0 - e * e));
      if (h > bestH) { bestH = h; best = vec4(fk, e, r1, left); }
    }
  }
  return best;
}
`,oe=ae+`
vec4 bake(vec2 uv) {
  vec4 s = strawHit(uv);
  float dm = abs(uv.y - 0.5);
  float gapA = 1.0 - smoothstep(0.2, 0.26, dm);       // gaps opaque in the dense middle
  if (s.x < 0.0) return vec4(0.035, 0.024, 0.012, gapA);
  float r1 = s.z, fk = s.x;
  float r2 = stH(vec2(r1 * 997.0, 3.7 + fk));
  vec3 col = mix(vec3(0.34, 0.22, 0.085), vec3(0.66, 0.5, 0.25), r1 * r1 * (3.0 - 2.0 * r1));
  if (r2 < 0.1) col = mix(col, vec3(0.34, 0.3, 0.24), 0.7);              // weathered grey stems
  else if (r2 > 0.95) col = vec3(0.22, 0.14, 0.07);                       // old dark stems
  // along-stem variation (nodes, dirt) and bleached, greyer cut tips
  col *= 0.86 + 0.28 * bk_vnoise(vec2(uv.x * 120.0 + fk * 3.1, uv.y * 40.0), vec2(120.0, 40.0));
  col = mix(col, vec3(0.6, 0.54, 0.42), 0.4 * (1.0 - smoothstep(0.0, 0.07, s.w)));
  col *= 1.0 - 0.24 * fk;                                                   // lower layers shaded
  col *= 0.78 + 0.22 * sqrt(max(1.0 - s.y * s.y, 0.0));                     // stem edges
  col *= 0.9 + 0.2 * bk_fbm(uv, vec2(4.0, 3.0), 3);                         // bundle tone
  return vec4(max(col, 0.0), 1.0);
}`,se=ae+`
vec4 bake(vec2 uv) {
  vec4 s = strawHit(uv);
  if (s.x < 0.0) return vec4(0.5, 0.5, 1.0, 1.0);
  float e = s.y;
  float ny = 0.12 * bk_gnoise(vec2(uv.x * 120.0, uv.y * 60.0), vec2(120.0, 60.0));
  vec3 n = normalize(vec3(0.85 * e, ny, sqrt(max(1.0 - 0.72 * e * e, 0.05))));
  return vec4(n * 0.5 + 0.5, 1.0);
}`,Y=[.5,1];function ce(e){let{mats:t,tex:n,patchMaterial:a}=e,o=new Map,s=new Map,c=new Map,u={vertexColors:!0},d=(e,t,n=null)=>(t.name=`kit.`+e,o.set(e,t),n&&s.set(e,n),t),f=(e,n,r={})=>d(e,t.create(n,{...u,...r}),e=>t.create(n,{...u,...r,...e})),p=+((e.quality?.rank??2)>=1),m=parseInt(e.params?.get?.(`kitwood`)??`0`,10)||0,h=J({wood:!0,woodDetail:p,woodDebug:m}),g=()=>`kitWood`+p+(m?`d`+m:``),_=(e,n,r)=>d(e,t.create(n,{...u,onBeforeCompile:h,customProgramCacheKey:g,userData:{kitOutdoor:1,kitWeather:r}}),e=>t.create(n,{...u,onBeforeCompile:h,customProgramCacheKey:g,userData:{kitOutdoor:0,kitWeather:r},...e}));_(`plank`,`woodPlank`,1),_(`beam`,`woodBeam`,.9),_(`dark`,`woodDark`,.45),f(`bark`,`bark`),f(`thatch`,`thatch`),f(`rope`,`rope`,{onBeforeCompile:J({fibre:!0}),customProgramCacheKey:()=>`kitRope`});let v={side:2,onBeforeCompile:J({cloth:!0}),customProgramCacheKey:()=>`kitCloth`};f(`cloth`,`linen`,v),f(`linen`,`linen`,v),d(`sail`,t.create(`linen`,{...u,side:2,onBeforeCompile:J({sail:!0}),customProgramCacheKey:()=>`kitSail`})),f(`wicker`,`wicker`),f(`metal`,`metal`,{onBeforeCompile:J({metal:!0}),customProgramCacheKey:()=>`kitMetal`}),f(`stone`,`stone`),f(`leaf`,`linen`,{side:2,roughness:.75});let y=null;try{y=n.bake(ie,{size:Math.min(1024,e.quality?.textureSize??1024),srgb:!0,anisotropy:8,name:`kit.rug`}),y.repeat.set(1/2,1/1.4),y.wrapS=y.wrapT=i,n.register(`kit.rug`,y)}catch(e){console.warn(`[arch-kit] rug bake failed`,e)}f(`rug`,`fabric`,y?{map:y,...v}:{});let b=null,x=null;try{let t=Math.min(1024,e.quality?.textureSize??1024);b=n.bake(oe,{size:t,srgb:!0,anisotropy:8,name:`kit.straw`}),x=n.bake(se,{size:t,anisotropy:8,name:`kit.strawNormal`});for(let e of[b,x])e.wrapS=e.wrapT=i,e.repeat.set(1/Y[0],1/Y[1]);n.register(`kit.straw`,b),n.register(`kit.strawNormal`,x)}catch(e){console.warn(`[arch-kit] straw bake failed`,e),b=x=null}let S=b?{map:b,normalMap:x,aoMapIntensity:0}:{};f(`thatchUnder`,`thatch`,{...S,onBeforeCompile:J({noSun:!0}),customProgramCacheKey:()=>`kitThatchUnder`}),d(`straw`,t.create(`thatch`,{...u,...S,side:2,...b?{alphaTest:.5,alphaToCoverage:!0}:{}}));let C=new l({color:789e3,roughness:.22,metalness:0,emissive:new r(1,1,1),emissiveIntensity:1,vertexColors:!0});C.onBeforeCompile=J({glow:!0}),C.customProgramCacheKey=()=>`kitGlow`,a(C),d(`glow`,C);let w=new l({color:657929,roughness:.05,metalness:0,emissive:new r(1,1,1),emissiveIntensity:1,vertexColors:!0,transparent:!0,depthWrite:!1,blending:5,blendEquation:100,blendSrc:201,blendDst:205});w.onBeforeCompile=J({glow:!0,pane:!0}),w.customProgramCacheKey=()=>`kitWindow`,a(w),d(`window`,w),d(`lanternMetal`,t.create(`metal`,{...u,onBeforeCompile:J({sway:!0,metal:!0,lamp:!0}),customProgramCacheKey:()=>`kitSwayMetalLamp`}));let T=new l({color:657414,roughness:.06,metalness:0,emissive:new r(1,1,1),emissiveIntensity:4,vertexColors:!0,transparent:!0,depthWrite:!1,blending:5,blendEquation:100,blendSrc:201,blendDst:205});return T.onBeforeCompile=J({sway:!0,glow:!0,flame:!0}),T.customProgramCacheKey=()=>`kitLanternGlass`,a(T),d(`lanternGlass`,T),d(`basket`,t.create(`wicker`,{...u,onBeforeCompile:J({sway:!0}),customProgramCacheKey:()=>`kitSway`})),d(`basketCloth`,t.create(`linen`,{...u,onBeforeCompile:J({sway:!0}),customProgramCacheKey:()=>`kitSway`})),{get(e){let t=o.get(e);if(!t)throw Error(`arch-kit: unknown material '${e}' (have: ${[...o.keys()].join(`, `)})`);return t},indoor(e){if(c.has(e))return c.get(e);let t=s.get(e);if(!t)return this.get(e);let n=t({envMapIntensity:(o.get(e).envMapIntensity??1)*le});return n.name=`kit.`+e+`@in`,c.set(e,n),n},has:e=>o.has(e),keys:()=>[...o.keys()],map:o}}var le=.3,X={amber:[1,.38,.08],daylight:[.95,.93,.88]},ue=[1,.92,.78],de=[.32,.3,.29],fe=[.12,.11,.1],pe=[.95,.92,.86],me=16752714;function he(e,t,n,r,i,a,o,s=0){let c=i-.007;e.color(pe),e.lathe(t,[[0,r],[n,r],[n*1.02,r+.004],[n,r+.012],[n*.995,c-.006],[n*.97,c-.001],[n*.9,c],[n*.55,c-.0035],[0,c-.004]],10);for(let r of[.6,2.9]){let i=Math.cos(r)*n,a=Math.sin(r)*n;e.ellipsoid(t.move(i,c-.012,a),.0045,.012,.0045,6,4)}e.color(.06,.055,.05),e.tube([t.at(0,c-.004,0),t.at(8e-4,i-.002,0),t.at(.002,i+.003,5e-4)],.0011,4,{}),e.color(fe);let l=[];for(let e=0;e<12;e++){let n=e/12*Math.PI*2;l.push(t.at(Math.cos(n)*o,a,Math.sin(n)*o))}if(e.face(l,t.vec(0,-1,0),l.map(e=>[e[0],e[2]])),s>0){e.color(ue[0]*.62,ue[1]*.6,ue[2]*.56);let n=[];for(let e=0;e<12;e++){let i=e/12*Math.PI*2;n.push(t.at(Math.cos(i)*s,r,Math.sin(i)*s))}e.face(n,t.vec(0,1,0),n.map(e=>[e[0],e[2]]))}}function ge(e){return[X.amber[0]*e,X.amber[1]*e,X.amber[2]*e]}var _e=()=>new A([0,0,0],[1,0,0],[0,1,0],[0,0,1]);function ve(e,t,n=_e(),r=ue){e.color(r);let i=[];for(let e=0;e<=16;e++){let t=e/16*Math.PI*2;i.push(n.at(Math.sin(t)*.028,-.034+Math.cos(t)*.028,0))}e.tube(i,.0055,5,{closed:!1}),e.ellipsoid(n.move(0,-.072,0),.016,.016,.016,8,5),e.lathe(n,[[.108,-.162],[.13,-.16],[.125,-.152],[.075,-.115],[.03,-.09],[.004,-.08]],6,{a0:Math.PI/6,a1:Math.PI/6+Math.PI*2}),e.lathe(n,[[.108,-.188],[.112,-.186],[.112,-.164],[.108,-.162]],6,{a0:Math.PI/6,a1:Math.PI/6+Math.PI*2});for(let t=0;t<6;t++){let r=Math.PI/6+t/6*Math.PI*2,i=Math.cos(r)*.104,a=Math.sin(r)*.104;e.box(n.move(i,-.29,a).rot(`x`,Math.PI/2),.013,.013,.215)}e.lathe(n,[[0,-.445],[.05,-.44],[.1,-.415],[.112,-.402],[.108,-.392],[.108,-.39]],6,{a0:Math.PI/6,a1:Math.PI/6+Math.PI*2}),e.ellipsoid(n.move(0,-.455,0),.014,.014,.014,8,5);let a=[[.097,-.392],[.097,-.33],[.097,-.26],[.097,-.188]],o=[.75,1.25,1,.55];t.color(1),t.lathe(n,a,6,{a0:Math.PI/6,a1:Math.PI/6+Math.PI*2,colorFn:(e,t)=>{let n=ge(o[e]);t[0]=n[0],t[1]=n[1],t[2]=n[2]}}),t.color(ge(.5)),t.face(ye(n,.097,-.391,6),n.vec(0,-1,0)),he(e,n,.024,-.3895,-.31,-.1875,.106,.1),e.color(r)}function ye(e,t,n,r,i=Math.PI/6){let a=[];for(let o=0;o<r;o++){let s=i+o/r*Math.PI*2;a.push(e.at(Math.cos(s)*t,n,Math.sin(s)*t))}return a}function be(e,t){let n=_e();e.color(de);let r=Math.PI/4;e.box(n.move(0,.004,0),.25,.008,.25,{chamfer:.002}),e.lathe(n,[[0,0],[.11,0],[.11,.03],[.09,.05],[0,.05]],4,{a0:r,a1:r+Math.PI*2});for(let t=0;t<4;t++){let i=r+t/4*Math.PI*2;e.box(n.move(Math.cos(i)*.1,.2,Math.sin(i)*.1).rot(`x`,Math.PI/2),.016,.016,.3)}e.lathe(n,[[.12,.345],[.14,.35],[.1,.4],[.03,.45],[0,.46]],4,{a0:r,a1:r+Math.PI*2}),e.ellipsoid(n.move(0,.475,0),.02,.02,.02,8,5),e.lathe(n,[[.095,.33],[.11,.33],[.11,.345]],4,{a0:r,a1:r+Math.PI*2});let i=[.7,1.2,.9,.55];t.lathe(n,[[.098,.05],[.098,.14],[.098,.24],[.098,.33]],4,{a0:r,a1:r+Math.PI*2,colorFn:(e,t)=>{let n=ge(i[e]);t[0]=n[0],t[1]=n[1],t[2]=n[2]}}),he(e,n,.034,.05,.175,.3295,.1)}function xe(e,t){let n=_e();e.color(de),e.box(n.move(0,.05,.008),.08,.2,.016);let r=[];for(let e=0;e<=12;e++){let t=e/12;r.push([0,0+.16*Math.sin(t*Math.PI*.5)-.04*t,.02+.28*t])}e.tube(r,.009,6,{caps:!0}),e.tube([[0,-.05,.02],[0,.07,.17]],.007,5,{caps:!0}),e.tube([[0,.12,.3],[0,.05,.3]],.004,4,{}),ve(e,t,n.move(0,.05,.3).rot(`y`,0),de)}function Se(e,t){let n=_e();e.color(de),e.lathe(n,[[0,0],[.07,0],[.075,.015],[.055,.03],[0,.03]],10),e.lathe(n,[[.052,.17],[.06,.18],[.03,.21],[0,.215]],10);let r=[];for(let e=0;e<=12;e++){let t=e/12*Math.PI;r.push([Math.cos(t)*.065,.19+Math.sin(t)*.07,0])}e.tube(r,.004,4,{});let i=[.7,1.4,1,.6];t.lathe(n,[[.045,.03],[.058,.08],[.056,.13],[.045,.17]],10,{colorFn:(e,t)=>{let n=ge(i[e]);t[0]=n[0],t[1]=n[1],t[2]=n[2]}}),he(e,n,.02,.03,.082,.1695,.05)}var Ce={hanging:{build:ve,glass:[0,-.29,0],flame:[0,-.31,0],top:-.188,sway:.035,light:{intensity:5,distance:8}},post:{build:be,glass:[0,.2,0],flame:[0,.175,0],top:.33,sway:0,light:{intensity:4,distance:8}},wall:{build:xe,glass:[0,-.24,.3],flame:[0,-.26,.3],top:-.138,sway:0,light:{intensity:4,distance:7}},table:{build:Se,glass:[0,.1,0],flame:[0,.082,0],top:.17,sway:0,light:{intensity:2.5,distance:5}}};function we(e,t){let n=.5,r=.58,i=-.66,a=.05,o=.5,s=e=>1.05*(1-.35*Math.abs(e-a)/o),c=(e,t)=>{let n=Math.cos(t),r=(n-a)/o;return Math.abs(r)>=1?!1:Math.abs(Math.atan2(Math.sin(e),Math.cos(e)))<s(n)*Math.sqrt(1-r*r)},l=(e,t,a,o,s)=>{let c=Math.sin(a)*Math.sin(t);-Math.cos(a)*-1;let l=Math.sin(a)*Math.cos(t),u=1-o,d=[c*n*u,i+Math.cos(a)*r*u,l*n*u],f=S.norm([c/n,Math.cos(a)/r,l/n]);return s&&(f=S.scale(f,-1)),{p:d,n:f,u:t*n,v:a*r}},u=(e,t,n,r,i,a)=>{let o=e.P.length/3;for(let a of[t,n,r,i])e.vert(a.p,a.n,a.u,a.v);let s=S.cross(S.sub(n.p,t.p),S.sub(r.p,t.p));S.dot(s,a)<0?e.I.push(o,o+2,o+1,o,o+3,o+2):e.I.push(o,o+1,o+2,o,o+2,o+3)};e.color(1);for(let[t,n,r]of[[0,!1,1],[.06,!0,.7]]){e.color(r);for(let r=0;r<16;r++)for(let i=0;i<28;i++){let a=.12+r/16*(Math.PI-.12),o=.12+(r+1)/16*(Math.PI-.12),s=i/28*Math.PI*2,d=(i+1)/28*Math.PI*2;if(c((s+d)/2,(a+o)/2))continue;let f=l(e,s,a,t,n);u(e,f,l(e,d,a,t,n),l(e,d,o,t,n),l(e,s,o,t,n),f.n)}}e.color(.82);let d=(e,t,a=1.018)=>[Math.sin(t)*Math.sin(e)*n*a,i+Math.cos(t)*r*a,Math.sin(t)*Math.cos(e)*n*a],f=(t,n)=>{let r=[];for(let i=0;i<=n;i++){let[a,o]=t(i/n);if(c(a,o)){r.length>1&&e.tube(r,.011,3,{}),r=[];continue}r.push(d(a,o))}r.length>1&&e.tube(r,.011,3,{})};for(let e of[.6,1.05,1.5,1.95,2.4,2.8])f(t=>[t*Math.PI*2,e],32);for(let e=0;e<12;e++){let t=e/12*Math.PI*2+.11;f(e=>[t,.2+e*(Math.PI-.3)],16)}e.color(.9);let p=[];for(let e=0;e<=40;e++){let t=e/40*Math.PI*2,c=a+Math.sin(t)*o,l=Math.acos(Math.max(-.99,Math.min(.99,c))),u=Math.cos(t)*s(c);p.push([Math.sin(l)*Math.sin(u)*n*.97,i+Math.cos(l)*r*.97,Math.sin(l)*Math.cos(u)*n*.97])}e.tube(p,.028,6,{closed:!0}),e.lathe(new A([0,i,0],[1,0,0],[0,1,0],[0,0,1]),[[.12,.52],[.12,r],[.07,.6],[0,.61]],12,{inside:!1});let m=[];for(let e=0;e<=16;e++){let t=e/16*Math.PI*2;m.push([Math.sin(t)*.04,-.045+Math.cos(t)*.04,0])}e.tube(m,.009,5,{}),t.color(.95,.9,.82),t.roundBox(new A([0,-.99,.02],[1,0,0],[0,1,0],[0,0,1]),.72,.15,.72,.3,16,8,{bulge:.25}),t.roundBox(new A([0,-.7100000000000001,-.3],[1,0,0],[0,1,0],[0,0,1]).rot(`x`,-.35),.62,.5,.13,.35,14,8,{bulge:.2}),t.color(.72,.36,.2),t.roundBox(new A([.16,-.8200000000000001,-.14],[1,0,0],[0,1,0],[0,0,1]).rot(`x`,-.5).rot(`y`,.3),.3,.26,.1,.4,10,6,{bulge:.3})}var Te=class{constructor(e){this.kit=e,this.types=new Map,this._m=new s}define(e,t){this.types.set(e,{parts:t,items:[]})}has(e){return this.types.has(e)}add(e,t,n=[0,0],r=[0,0]){this.types.get(e).items.push({m:t.clone(),sway:n,flick:r})}count(){let e=0;for(let t of this.types.values())e+=t.items.length;return e}finalize(e){let t=[];for(let[n,r]of this.types){let i=r.items.length;if(i)for(let a of r.parts){let s=(a.geometry??=a.mesher.toGeometry()).clone(),c=new Float32Array(i*2),l=new Float32Array(i*2);r.items.forEach((e,t)=>{c[t*2]=e.sway[0],c[t*2+1]=e.sway[1],l[t*2]=e.flick[0],l[t*2+1]=e.flick[1]}),s.setAttribute(`aKitSway`,new o(c,2)),s.setAttribute(`aKitFlick`,new o(l,2));let u=new m(s,this.kit.materials.get(a.mat),i);r.items.forEach((e,t)=>u.setMatrixAt(t,e.m)),u.instanceMatrix.needsUpdate=!0,u.computeBoundingSphere(),u.castShadow=!!a.castShadow,u.receiveShadow=!0;let d=this.kit.ctx.params?.get?.(`archlegacy`)===`1`;a.noReflect&&!d&&u.layers.set(this.kit.ctx.LAYERS.NO_REFLECT),d&&a.mat===`basketCloth`&&(u.castShadow=!0),u.name=`kit:${n}:${a.mat}`,u.matrixAutoUpdate=!1,e.add(u),t.push(u)}}return t}};function Ee(e){for(let[n,r]of Object.entries(Ce)){let i=new k,a=new k;r.build(i,a);let o=e=>{let n=new Float32Array(e.attributes.position.count*4);for(let e=0;e<n.length;e+=4)n[e]=r.flame[0],n[e+1]=r.flame[1],n[e+2]=r.flame[2],n[e+3]=r.top;return e.setAttribute(`aFlame`,new t(n,4)),e};e.define(`lantern.`+n,[{mesher:i,geometry:o(i.toGeometry()),mat:`lanternMetal`,castShadow:!1,noReflect:!0},{mesher:a,geometry:o(a.toGeometry()),mat:`lanternGlass`,castShadow:!1}])}let n=new k,r=new k;we(n,r),e.define(`basket`,[{mesher:n,mat:`basket`,castShadow:!0},{mesher:r,mat:`basketCloth`,castShadow:!1}])}var De={lantern(e){let t=e.style??`hanging`,n=Ce[t];if(!n)throw Error(`arch-kit: unknown lantern style `+t);let r=e.scale??1,i=e.position,a=(e.yaw??this.rng.next()*360)*Math.PI/180,o=A.yaw(i,a*180/Math.PI),c=new s().makeBasis(new p(...o.x).multiplyScalar(r),new p(0,r,0),new p(...o.z).multiplyScalar(r)).setPosition(i[0],i[1],i[2]);if(t===`hanging`){let t=e.hangFrom??(e.hang?[i[0],i[1]+e.hang,i[2]]:null);if(t){let n=[i[0],i[1]-.006*r,i[2]];if(e.chain){let e=this.m(`metal`);e.color(.3,.29,.28),e.tube([t,n],.006,4,{})}else this.rope([t,n],.007,{segs:4})}}let l=n.glass,u=o.at(l[0]*r,l[1]*r,l[2]*r),d=null,f=e.flicker??.08;if(e.light!==!1){let t=typeof e.light==`object`?e.light:{};d=this.ctx.lanterns.register({position:u,color:t.color??me,intensity:(t.intensity??n.light.intensity)*r,distance:t.distance??n.light.distance,flicker:f})}let m=d?d.phase:this.rng.next()*6.283;return this.kit.instancer.add(`lantern.`+t,c,[this.rng.next()*6.283,n.sway*(e.swayScale??1)],[m,f]),d},lanternLight(e,t={}){return this.ctx.lanterns.register({position:e,color:t.color??me,intensity:t.intensity??3.5,distance:t.distance??7,flicker:t.flicker??.05})},basketChair(e){let t=e.hangFrom,n=e.drop??1.6,r=e.scale??1,i=[t[0],t[1]-n,t[2]],a=A.yaw(i,e.yaw??this.rng.next()*360),o=new s().makeBasis(new p(...a.x).multiplyScalar(r),new p(0,r,0),new p(...a.z).multiplyScalar(r)).setPosition(i[0],i[1],i[2]);return this.kit.instancer.add(`basket`,o,[this.rng.next()*6.283,.022],[0,0]),this.rope([t,[i[0],i[1]-.01,i[2]]],.014),this.lashing([t[0],t[1]-.05,t[2]],[0,1,0],.03,{turns:3,width:.06,r:.01}),{top:i}}};function Oe(e){let t=.86+e.jit(.09),n=t*7919.3%1*.35,r=1-.06*n,i=.97-.02*n,a=.9+.04*n;return[t*r*(1+e.jit(.03)),t*i,t*a*(1+e.jit(.04))]}var ke=e=>e>=.012?7:e>=.0085?6:5,Ae={rope(e,t=.016,n={}){if(e.length<2)return;let r=this.m(n.mat??`rope`);r.color(n.tint??Oe(this.rng));let i=n.segs!==void 0&&t<.0085?n.segs:Math.max(n.segs??0,ke(t));r.tube(e,t,i,{caps:n.caps??!1,u0:this.rng.next(),v0:this.rng.next()*3,uAround:(n.mat??`rope`)===`rope`?.1:void 0})},ropeSpan(e,t,n=.05,r=.016,i={}){let a=i.n??Math.max(4,Math.min(48,Math.ceil(S.dist(e,t)/.2))),o=b(e,t,n,a);return this.rope(o,r,i),o},catenary(e,t,n,r=12){return b(e,t,n,r)},lashing(e,t,n,r={}){let i=r.turns??4,a=r.width??.07,o=r.r??.009,s=A.dir(e,t),c=n+o*.85,l=Math.ceil(i*14),u=[],d=this.rng.next()*Math.PI*2;for(let e=0;e<=l;e++){let t=e/l,n=d+t*i*Math.PI*2;u.push(s.at(Math.cos(n)*c,Math.sin(n)*c,(t-.5)*a))}if(this.rope(u,o,{segs:4}),r.cross){let e=[];for(let t=0;t<=16;t++){let n=t/16,r=d+n*Math.PI*2;e.push(s.at(Math.cos(r)*(c+o*1.6),Math.sin(r)*(c+o*1.6),(n-.5)*a*1.9))}this.rope(e,o,{segs:4})}},knot(e,t=.035){let n=this.m(`rope`);n.color(Oe(this.rng));let r=A.yaw(e,this.rng.next()*360);n.ellipsoid(r,t,t*.8,t*1.1,8,5,{u0:this.rng.next()}),n.ellipsoid(r.move(t*.6,-t*.2,0).rot(`z`,.6),t*.7,t*.55,t*.8,7,4)},ropeNet(e,t,n={}){let r=n.r??.008,i=e.length,a=(e,t)=>{let n=t*(e.length-1),r=Math.min(e.length-2,Math.floor(n));return S.lerp(e[r],e[r+1],n-r)},o=0;for(let t=1;t<i;t++)o+=S.dist(e[t-1],e[t]);let s=n.cells??Math.max(2,Math.round(o/.22));for(let n=0;n<s;n++){let i=n/s,o=(n+1)/s;this.rope([a(e,i),a(t,o)],r,{segs:4}),this.rope([a(t,i),a(e,o)],r,{segs:4})}}},je={railing(e,t={}){let n=e.slice();if(t.closed&&n.push(e[0]),n.length<2)return{posts:[]};let r=t.height??1,i=t.style??`rope`,a=t.maxSpacing??1.6,o=t.postR??.055,s=t.postBelow??.3,c=this.rng,l=[];for(let e=0;e<n.length-1;e++){let t=n[e],r=n[e+1],i=S.dist(t,r),o=Math.max(1,Math.ceil(i/a-.05));for(let e=0;e<o;e++)l.push(S.lerp(t,r,e/o))}t.closed?l.push(l[0]):l.push(n[n.length-1]);let u=t.closed?l.length-1:l.length;for(let e=0;e<u;e++){if(!t.closed&&t.endPosts===!1&&(e===0||e===u-1))continue;let n=l[e],i=[c.jit(.012),c.jit(.012)];this.log([n[0],n[1]-s,n[2]],[n[0]+i[0],n[1]+r+.04,n[2]+i[1]],o,{segs:7,wobble:.1,caps:!0})}let d=e=>[e[0],e[1]+r,e[2]];for(let e=0;e<l.length-1;e++){let n=l[e],a=l[e+1],s=S.dist(n,a);if(s<.05)continue;t.topRail!==!1&&this.beam(S.add(d(n),[0,.02,0]),S.add(d(a),[0,.02,0]),{w:.095,h:.06,extend:.06,chamfer:.015});let f=(e,t)=>[e[0],e[1]+r*t,e[2]];if(i===`rope`)for(let e of[.34,.66])this.ropeSpan(f(n,e),f(a,e),.02+s*.018,.015);else if(i===`cross`)this.beam(f(n,.1),f(a,.1),{w:.06,h:.07,extend:.03}),this.beam(f(n,.14),f(a,.9),{w:.045,h:.05,extend:-.03,chamfer:.008}),this.beam(f(a,.14),f(n,.9),{w:.045,h:.05,extend:-.03,chamfer:.008});else if(i===`sticks`){this.beam(f(n,.1),f(a,.1),{w:.06,h:.07,extend:.03});let e=Math.max(1,Math.round(s/.14));for(let t=1;t<e;t++){let i=S.lerp(n,a,t/e);this.log(f(i,.1),[i[0]+c.jit(.02),i[1]+r,i[2]+c.jit(.02)],.019,{mat:`bark`,segs:5,caps:!1,wobble:.25})}}else if(i===`plank`)this.beam(f(n,.28),f(a,.28),{w:.035,h:.14,extend:.05}),this.beam(f(n,.58),f(a,.58),{w:.035,h:.14,extend:.05});else if(i===`net`){let e=Math.max(2,Math.ceil(s/.25)),t=[],r=[];for(let i=0;i<=e;i++){let o=S.lerp(n,a,i/e);t.push(f(o,.93)),r.push(f(o,.06))}this.ropeNet(t,r),this.ropeSpan(f(n,.06),f(a,.06),.02,.013)}if(i===`rope`&&e<u)for(let e of[.34,.66])this.lashing(f(n,e),[0,1,0],o,{turns:2,width:.04,r:.008});t.collider!==!1&&this.colWall(n,a,t.colliderHeight??1.15,.12,`wall`)}return{posts:l.slice(0,u)}},deckRailing(e,t={}){let n=t.inset??.07,[r,i]=e.arc,a=i-r,o=a>=359.99,s=(t.openings??[]).map(([e,t])=>{let n=O(e-r),i=t-e;return i<0&&(i+=360),[n,n+i]}).sort((e,t)=>e[0]-t[0]),c=[];if(!s.length){if(o)return[this.railing(e.polyPoints(r,r+360,n).slice(0,-1),{...t,closed:!0})];c.push([0,a])}else if(o)for(let e=0;e<s.length;e++){let t=s[e][1],n=e+1<s.length?s[e+1][0]:s[0][0]+360;n-t>2&&c.push([t,n])}else{let e=0;for(let[t,n]of s)t-e>2&&c.push([e,Math.min(t,a)]),e=Math.max(e,n);a-e>2&&c.push([e,a])}return c.map(([i,a])=>this.railing(e.polyPoints(r+i,r+a,n),t))},railingArc(e){let[t,n]=w(e.tree?typeof e.tree==`string`?this.ctx.layout.getHeroTree(e.tree):e.tree:e.center),r=e.radius,i=e.y,a={arc:e.arc??[0,360],polyPoints:(a,o)=>{let s=Math.max(1,Math.ceil((o-a)*D*r/(e.spacing??1.5))),c=[];for(let e=0;e<=s;e++){let l=g(a+(o-a)*e/s);c.push([t+l[0]*r,i,n+l[1]*r])}return c}};return this.deckRailing(a,{...e,inset:0,maxSpacing:99})},railingPath(e,t=`left`,n={}){let r=n.from??0,i=n.to??e.length,a=Math.max(1,Math.round((i-r)/(n.spacing??1.8))),o=[];for(let s=0;s<=a;s++)o.push(e[t](r+(i-r)*s/a,n.inset??.06));return this.railing(o,{...n,maxSpacing:99})}};function Me(e,t){return t?typeof t==`string`?e.ctx.layout.getHeroTree(t)??e.ctx.layout.EXTRA_TREES?.find(e=>e.id===t):t:null}var Ne={spiralStair(e){let{layout:t,hf:n}=this.ctx,r=Me(this,e.tree),i=r?[r.x,r.z]:e.center,a=e.width??1,o=t=>e.gap??.08+.03*t,s=typeof e.inner==`function`?e.inner:typeof e.inner==`number`?()=>e.inner:e=>{let n=t.trunkRadiusAt(r,e);return n+o(n)},c=e.dir??1,l=(e,t,n)=>{let r=g(e);return[i[0]+r[0]*t,n,i[1]+r[1]*t]},u=e=>s(e)+a*.55,d=e=>s(e)+Math.min(a*.5,a-.475),f=r?e=>t.trunkRadiusAt(r,e)*.99:e=>s(e)-.03,p=e.fromY,m=e.startDeg??0;if(p===`ground`||p===void 0){let e=r?r.groundY??0:0;for(let t=0;t<3;t++){let t=l(m,u(e+.2),0);e=n.groundHeight(t[0],t[2])}p=e}let h=e.toY,_=Math.max(2,Math.round((h-p)/(e.rise??.19))),v=(h-p)/_,y=e.tread??.3,b=new Set(e.landings??[]),x=this.rng,w=[],T=m,E=[l(m,d(p+.1),p)];for(let e=1;e<_;e++){let t=p+e*v;if(b.has(e)){let e=1.1/u(t-v)*C,n=t-v;w.push({landing:!0,deg0:T,deg1:T+c*e,y:n}),T+=c*e,E.push(l(T,d(n),n))}let n=y/u(t)*C,r=T+c*n*.5;w.push({deg:r,dA:n,y:t,rin:s(t),k:e}),E.push(l(r,d(t),t)),T+=c*n}let O=T+c*(.18/u(h))*C;E.push(l(O,d(h),h));let k=[];for(let e of w){if(e.landing){let t=s(e.y),n=t+a,r=Math.abs(e.deg1-e.deg0),i=Math.max(3,Math.round(r*D*(t+a/2)/.155));for(let r=0;r<i;r++){let a=e.deg0+(e.deg1-e.deg0)*((r+.5)/i);this.plank(l(a,t,e.y),l(a,n,e.y),{width:.145,thick:.05,jitter:1})}for(let t of[e.deg0,(e.deg0+e.deg1)/2,e.deg1]){let r=e.y-.05-a*.8;this.bracket(l(t,n-.08,e.y-.05),l(t,f(r),r),t)}k.push({p:l(e.deg0,n-.07,e.y),c:l(e.deg0,n-.02,e.y),y:e.y},{p:l(e.deg1,n-.07,e.y),c:l(e.deg1,n-.02,e.y),y:e.y});continue}let t=e.rin,n=t+a;for(let r of[-.25,.25]){let i=e.deg+r*e.dA;this.plank(l(i,t,e.y),l(i,n+x.jit(.02),e.y),{width:.14,thick:.05,jitter:1.2})}let r=e.y-.055,i=r-a*.75;this.bracket(l(e.deg,n-.12,r),l(e.deg,f(i),i),e.deg),this.beam(l(e.deg-e.dA*.4,t+.05,r-.05),l(e.deg+e.dA*.4,t+.05,r-.05),{w:.08,h:.1}),k.push({p:l(e.deg,n-.07,e.y),c:l(e.deg,n-.02,e.y),y:e.y,deg:e.deg})}for(let e=0;e<k.length-1;e++){let t=k[e].p,n=k[e+1].p;this.beam(S.add(t,[0,-.16,0]),S.add(n,[0,-.16,0]),{w:.07,h:.2,extend:.05})}let j=e.rail??`outer`,M=e.postEvery??3,N=[];if(j!==`none`){let t=e.railToTop?1/0:h-.85,n=k.filter(e=>e.y<=t),r=n.length>=2?n:k;for(let e=0;e<r.length;e+=M)N.push(r[e]);N[N.length-1]!==r[r.length-1]&&N.push(r[r.length-1]);for(let e=0;e<k.length-1;e++){let t=k[e].c,n=k[e+1].c;this.colWall([t[0],k[e].y,t[2]],[n[0],k[e+1].y,n[2]],1.15,.1,`wall`)}let i=.95;for(let e of N){let t=e.p;this.log([t[0],e.y-.22,t[2]],[t[0]+x.jit(.01),e.y+i+.05,t[2]+x.jit(.01)],.05,{segs:7})}for(let e=0;e<N.length-1;e++){let t=N[e],n=N[e+1];for(let[e,a]of[[i,.02],[i*.5,.015]]){let i=r.indexOf(t),o=r.indexOf(n),s=[];for(let t=i;t<=o;t++){let n=r[t],a=(t-i)/Math.max(1,o-i),c=.05*Math.sin(Math.PI*a);s.push([n.p[0],n.y+e-c,n.p[2]])}s.length>=2&&this.rope(s,a)}this.lashing([t.p[0],t.y+i,t.p[2]],[0,1,0],.05,{turns:3,width:.05,r:.008})}if(j===`both`)for(let e=0;e<w.length-M;e+=M){let t=w[e],n=w[Math.min(w.length-1,e+M)];if(t.landing||n.landing)continue;let r=l(t.deg,t.rin+.02,t.y+.9),i=l(n.deg,n.rin+.02,n.y+.9);this.ropeSpan(r,i,.04,.018)}}if((e.bottomStep??!0)&&e.fromY===`ground`){let e=this.m(`stone`);e.color(.85,.8,.72);let t=l(m-c*(.25/u(p))*C,u(p),p-.06);e.roundBox(A.yaw(t,m+90),a*1.05,.2,.5,.3,12,6,{u0:x.next()*3}),this.footCircle(t[0],t[2],a*.8)}if(e.fromY===`ground`||e.fromY===void 0){let e=E[0];this.footCircle(e[0],e[2],a*.9)}if(e.collider!==!1)for(let e=0;e<E.length-1;e++)this.colRamp(E[e],E[e+1],a,.18,`walk`);let P=w.filter(e=>!e.landing&&h-e.y<2.15),F=O,I=O;for(let e of P)F=Math.min(F,e.deg-e.dA),I=Math.max(I,e.deg+e.dA);let L={arc:[Math.min(F,I),Math.max(F,I)],r:[s(h)-.05,s(h)+a+.08]};return{startDeg:m,endDeg:O,dir:c,start:E[0],end:E[E.length-1],walk:E,treads:w,rise:v,width:a,inner:s,walkR:u,walkC:d,hole:L,center:i}},bracket(e,t,n){this.beam(e,t,{w:.07,h:.09,extend:.025,chamfer:.01});let r=g(n);this.boltPlate(S.add(t,[-r[0]*.004,0,-r[1]*.004]),[r[0],0,r[1]],{w:.1,h:.16})},straightStair(e,t,n={}){let r=n.width??1,i=t[1]-e[1],a=Math.max(2,Math.round(i/(n.rise??.18))),o=[t[0]-e[0],0,t[2]-e[2]],s=Math.hypot(o[0],o[2]),c=S.norm(o),l=[-c[2],0,c[0]],u=r/2;this.rng;for(let t=1;t<a;t++){let n=t/a,r=[e[0]+o[0]*n,e[1]+i*n,e[2]+o[2]*n],d=Math.min(.32,s/a+.03);for(let e of[-.25,.25]){let t=S.add(r,S.scale(c,e*d));this.plank(S.add(t,S.scale(l,-u)),S.add(t,S.scale(l,u)),{width:d*.48,thick:.05,jitter:1})}}let d=n.stringer??.25;for(let n of[-1,1]){let r=S.scale(l,n*(u+.035));this.beam(S.add(S.add(e,r),[0,-d*.4,0]),S.add(S.add(t,r),[0,-d*.55,0]),{w:.06,h:d,extend:.04})}let f=n.rails??`both`,p=f===`both`?[-1,1]:f===`left`?[1]:f===`right`?[-1]:[];for(let r of p){let i=S.scale(l,r*(u+.09));this.railing([S.add(e,i),S.add(t,i)],{style:n.railStyle??`rope`,maxSpacing:1.5,postBelow:.2})}if(n.collider!==!1&&this.colRamp(e,t,r,.2,`walk`),n.foot!==!1){let t=this.ctx.hf.groundHeight(e[0],e[2]);e[1]<t+.5&&this.footSegment(e,S.add(e,S.scale(c,Math.min(s,1.6))),u+.25)}return{a:e,b:t,steps:a,dir:c}},ladder(e,t,n={}){let r=n.width??.5,i=S.sub(t,e),a=S.len(i),o=S.norm([i[0],0,i[2]]),s=Math.hypot(i[0],i[2])>.001?[-o[2],0,o[0]]:[1,0,0];for(let n of[-1,1]){let i=S.scale(s,n*r/2);this.log(S.add(e,i),S.add(S.add(t,i),[0,.4,0]),.035,{segs:7})}let c=Math.floor(a/(n.rung??.28));for(let n=1;n<=c;n++){let a=S.lerp(e,t,n/(c+.5)),o=S.add(a,S.scale(s,-r/2)),l=S.add(a,S.scale(s,r/2));this.log(o,l,.02,{segs:6,caps:!1}),this.lashing(o,S.norm(i),.035,{turns:2,width:.035,r:.006}),this.lashing(l,S.norm(i),.035,{turns:2,width:.035,r:.006})}n.collider!==!1&&this.colRamp(e,t,r+.1,.12,`walk`);let l=this.ctx.hf.groundHeight(e[0],e[2]);return e[1]<l+.4&&this.footCircle(e[0],e[2],r),{a:e,b:t}}},Pe=[.24,.23,.22];function Fe(e,t){let n=e.width/2;if(Math.abs(t)>=n)return null;if(e.type===`roundWindow`){let r=n,i=e.cy,a=Math.sqrt(Math.max(0,r*r-t*t));return[i-a,i+a]}let r=e.lo;return e.type===`door`||e.type===`archWindow`||e.type===`opening`&&e.arched!==!1?[r,e.hi-n+Math.sqrt(Math.max(0,n*n-t*t))]:[r,e.hi]}function Ie(e,t=14){let n=e.width/2,r=[];if(e.type===`roundWindow`){for(let i=0;i<t+6;i++){let a=i/(t+6)*Math.PI*2;r.push([Math.cos(a)*n,e.cy+Math.sin(a)*n])}return{pts:r,closed:!0}}let i=e.type===`door`||e.type===`archWindow`||e.type===`opening`&&e.arched!==!1;if(r.push([-n,e.lo],[n,e.lo]),i){let i=e.hi-n;for(let e=0;e<=t;e++){let a=e/t*Math.PI;r.push([Math.cos(a)*n,i+Math.sin(a)*n])}}else r.push([n,e.hi],[-n,e.hi]);return{pts:r,closed:!0,arched:i}}var Le={wallRound(e){let t=e.tree?typeof e.tree==`string`?this.ctx.layout.getHeroTree(e.tree):e.tree:null,[n,r]=w(t??e.center),i=e.radius,a=e.arc??[0,360],o=Math.min(360,a[1]-a[0]),s=o*D*i,c=e=>{let t=a[0]+e/i/D,o=g(t),s=g(t+90);return{p:[n+o[0]*i,r+o[1]*i],t:s,n:o,deg:t}},l=(e.openings??[]).map(e=>({...e,s:e.s??((e.deg-a[0])%360+360)%360*D*i}));return this._wallRun({...e,at:c,length:s,closed:o>=359.99,openings:l,curvedR:i,center:[n,r]})},wallStraight(e){let t=w(e.a),n=w(e.b),r=Math.hypot(n[0]-t[0],n[1]-t[1]),i=[(n[0]-t[0])/r,(n[1]-t[1])/r],a=e.outward??[-i[1],i[0]],o=Math.hypot(a[0],a[1])||1;a=[a[0]/o,a[1]/o];let s=e=>({p:[t[0]+i[0]*e,t[1]+i[1]*e],t:i,n:a}),c=(e.openings??[]).map(e=>({...e,s:e.s??(e.t??.5)*r}));return this._wallRun({...e,at:s,length:r,closed:!1,openings:c})},wallPoly(e){let t=e.pts.map(w),n=t.length,r=t.reduce((e,t)=>[e[0]+t[0]/n,e[1]+t[1]/n],[0,0]),i=[],a=e.height??2.5;for(let o=0;o<n;o++){let s=t[o],c=t[(o+1)%n],l=[(s[0]+c[0])/2-r[0],(s[1]+c[1])/2-r[1]],u=this.wallStraight({...e,a:s,b:c,outward:l,openings:(e.openings??[]).filter(e=>e.side===o)});if(i.push(u),e.cornerPosts!==!1){let t=S.norm([s[0]-r[0],0,s[1]-r[1]]),n=[s[0]-t[0]*(e.thick??.14)*.5,e.y-.05,s[1]-t[2]*(e.thick??.14)*.5];this.beam(n,[n[0],e.y+a+.02,n[2]],{w:.2,h:.2,up:[t[0],0,t[2]],chamfer:.02,mat:`dark`})}}return i},_wallRun(e){let t=e.y,n=e.height??2.5,r=e.thick??.14,i=e.boardW??.16,a=e.length;this.rng,this.ctx.LAYERS;let o=e.openings.map(e=>{let r=e.type??`window`,i=e.width??(r===`door`?1:r===`roundWindow`?.7:.8),a,o,s;return r===`door`||r===`opening`?(a=t,o=t+(e.height??2.15)):r===`roundWindow`?(s=t+(e.centerY??1.55),a=s-i/2,o=s+i/2):(a=t+(e.sill??.95),o=a+(e.height??(r===`archWindow`?1.2:.9))),o=Math.min(o,t+n-.12),{...e,type:r,width:i,lo:a,hi:o,cy:s,floor:t}}),s=e=>{let r=[{a:t-.06,b:t+n,aOp:null,bOp:null}];for(let t of o){let n=Fe(t,e-t.s);if(!n)continue;let i=[];for(let e of r){if(n[1]<=e.a||n[0]>=e.b){i.push(e);continue}n[0]-e.a>.03&&i.push({a:e.a,b:n[0],aOp:e.aOp,bOp:t}),e.b-n[1]>.03&&i.push({a:n[1],b:e.b,aOp:t,bOp:e.bOp})}r=i}return r},c=e=>s(e).map(e=>[e.a,e.b]),l=(e,t,n)=>{let r=e.width/2-1e-4,i=Fe(e,Math.max(-r,Math.min(r,t)));return i?i[+!!n]:null},u=(e,t,n)=>s(e).map(r=>{let i=[0,0],a=[0,0],o=e-n*t,s=e+n*t;if(r.aOp){let e=l(r.aOp,o-r.aOp.s,!0),t=l(r.aOp,s-r.aOp.s,!0);e!==null&&t!==null&&(i[0]=Math.max(-.2,Math.min(.25,r.a-e)),i[1]=Math.max(-.2,Math.min(.25,r.a-t)))}if(r.bOp){let e=l(r.bOp,o-r.bOp.s,!1),t=l(r.bOp,s-r.bOp.s,!1);e!==null&&t!==null&&(a[0]=Math.max(-.2,Math.min(.25,e-r.b)),a[1]=Math.max(-.2,Math.min(.25,t-r.b)))}return{a:r.a,b:r.b,e0:i,e1:a}}),d=(e,t)=>{let n=t?-e.n[0]:e.n[0];return-(t?-e.n[1]:e.n[1])*e.t[0]+n*e.t[1]>=0?1:-1},f=Math.max(1,Math.round(a/i)),p=a/f;if(e.style===`woven`)this._wovenSkin(e,c,o,a,t,n);else for(let t=0;t<f;t++){let n=(t+.5)*p,r=this._wallFrame(e,n);for(let e of u(n,(p-.005)/2,d(r,!1)))this.plank([r.p[0],e.a,r.p[1]],[r.p[0],e.b,r.p[1]],{up:[r.n[0],0,r.n[1]],width:p-.005,thick:.026,jitter:.5,bevel:.004,e0:e.e0,e1:e.e1,nail:.05})}let m=()=>{if(e.lining===!1)return;let s=Math.max(1,Math.round(a/(i*1.15))),c=a/s;for(let t=0;t<s;t++){let n=(t+.5)*c,i=this._wallFrame(e,n,r);for(let e of u(n,(c+.003)/2,d(i,!0)))this.plank([i.p[0],e.a,i.p[1]],[i.p[0],e.b,i.p[1]],{up:[-i.n[0],0,-i.n[1]],width:c+.003,thick:.02,jitter:.3,bottom:!1,bevel:.004,e0:e.e0,e1:e.e1,nail:.04})}if(e.studs!==!1){let i=Math.max(1,Math.round(a/1.25));for(let s=0;s<=i&&!(e.closed&&s===i);s++){let c=Math.min(a-.06,Math.max(.06,s/i*a));if(o.some(e=>Math.abs(c-e.s)<e.width/2+.12))continue;let l=this._wallFrame(e,c,r+.05);this.beam([l.p[0],t,l.p[1]],[l.p[0],t+n-.05,l.p[1]],{w:.1,h:.09,up:[l.n[0],0,l.n[1]],mat:`beam`})}}};e.interior===!1?m():this.interior(m);let h=Math.max(1,Math.ceil(a/.9));for(let i=0;i<h;i++){let s=i/h*a,c=(i+1)/h*a,l=this._wallFrame(e,s,r*.5),u=this._wallFrame(e,c,r*.5);this.beam([l.p[0],t+n+.06,l.p[1]],[u.p[0],t+n+.06,u.p[1]],{w:r+.06,h:.12,extend:.01,mat:`beam`});let d=(s+c)/2;if(!o.some(e=>(e.type===`door`||e.type===`opening`)&&Math.abs(d-e.s)<e.width/2+.05)){let n=this._wallFrame(e,s,-.02),r=this._wallFrame(e,c,-.02);this.beam([n.p[0],t+.02,n.p[1]],[r.p[0],t+.02,r.p[1]],{w:.04,h:.16,extend:.01,mat:`dark`})}}let g=[];for(let t of o)g.push(this._opening(e,t,r));if(e.collider!==!1){let i=.7,s=o.filter(e=>e.type===`door`||e.type===`opening`).map(e=>[e.s-e.width/2,e.s+e.width/2]),c=[0];for(let e=i;e<a-.05;e+=i)c.push(e);for(let[e,t]of s)c.push(e,t);c.push(a),c.sort((e,t)=>e-t);for(let i=0;i<c.length-1;i++){let a=c[i],o=c[i+1];if(o-a<.02)continue;let l=(a+o)/2;if(s.some(([e,t])=>l>e&&l<t))continue;let u=this._wallFrame(e,a,r/2),d=this._wallFrame(e,o,r/2);this.colWall([u.p[0],t,u.p[1]],[d.p[0],t,d.p[1]],n,r,`wall`)}}return{openings:g,top:t+n}},_wovenSkin(e,t,n,r,i,a){let o=this.m(`wicker`),s=e.bulge??.08,c=Math.max(3,Math.round(r/.12)),l=r/c,u=e=>s*Math.sin(Math.PI*Math.min(1,Math.max(0,(e-i)/a))),d=(t,n,r=0)=>{let i=e.at(t),a=u(n)+r;return[i.p[0]+i.n[0]*a,n,i.p[1]+i.n[1]*a]},f=t=>{let n=e.at(t);return[n.n[0],0,n.n[1]]};for(let e=0;e<c;e++){let n=e*l,r=(e+1)*l,i=(n+r)/2;for(let[a,s]of t(i)){let t=Math.max(1,Math.ceil((s-a)/.25));for(let c=0;c<t;c++){let l=a+(s-a)*c/t,u=a+(s-a)*(c+1)/t;o.color(.92+.08*Math.sin(e*1.7)*Math.sin(c*2.3)),o.face([d(n,l),d(r,l),d(r,u),d(n,u)],f(i),[[n,l],[r,l],[r,u],[n,u]])}}}o.color(.8);for(let e=i+.2;e<i+a-.05;e+=.28){let n=[],i=()=>{n.length>1&&o.tube(n,.018,4,{}),n=[]},a=Math.max(8,Math.ceil(r/.2));for(let o=0;o<=a;o++){let s=o/a*r;if(!t(s).some(([t,n])=>e>=t&&e<=n)){i();continue}n.push(d(s,e,.012))}i()}},_wallFrame(e,t,n=0){let r=e.at(t);return{p:[r.p[0]-r.n[0]*n,r.p[1]-r.n[1]*n],n:r.n,t:r.t}},_opening(e,t,n){let r=e.at(t.s),i=[r.n[0],0,r.n[1]],a=[r.t[0],0,r.t[1]],o=[r.p[0]-r.n[0]*n/2,0,r.p[1]-r.n[1]*n/2],s=(e,t,n=0)=>[o[0]+a[0]*e+i[0]*n,t,o[2]+a[2]*e+i[2]*n],c=Ie(t),l=n+.07,u=t.type===`door`?.11:.085,d=this.m(`dark`),f=c.pts,p=[0,(t.lo+t.hi)/2],m=f.length;for(let e=0;e<m;e++){let n=f[e],r=f[(e+1)%m];if(t.type!==`roundWindow`&&e===0&&(t.type===`door`||t.type===`opening`))continue;let a=r[0]-n[0],o=r[1]-n[1],c=Math.hypot(a,o);if(c<.001)continue;let h=o/c,g=-a/c,_=(n[0]+r[0])/2-p[0],v=(n[1]+r[1])/2-p[1];h*_+g*v<0&&(h=-h,g=-g);let y=u/2,b=s(n[0]+h*y,n[1]+g*y),x=s(r[0]+h*y,r[1]+g*y),C=S.sub(x,b),w=A.dir(b,C,i);d.color(M(this.rng,.4)),d.box(w.move(0,0,S.len(C)/2),u,l,S.len(C)+u*.35,{chamfer:.012,u0:this.rng.next()*3})}(t.type===`window`||t.type===`archWindow`)&&this.plank(s(-t.width/2-.1,t.lo-.02,n/2+.07),s(t.width/2+.1,t.lo-.02,n/2+.07),{width:n+.16,thick:.045,mat:`dark`,jitter:.3,up:[0,1,0]});let h={...t,center:s(0,(t.lo+t.hi)/2),normal:i,tangent:a};return t.type===`door`?h.door=this.door({op:t,W:s,n:i,t:a,thick:n}):t.type!==`opening`&&this._glass(t,c,s,i,n),h},_glass(e,t,n,r,i){let a=this.m(`window`),o=e.glow??X.amber,s=e.intensity??4,c=e.type===`roundWindow`?e.cy:e.lo+(e.hi-e.lo)*.42,l=(e,r,i,o)=>{let s=n(0,c,e),l=t.pts.map(t=>n(t[0],t[1],e)),u=a.P.length/3;a.vert(s,o,0,0,r);for(let e of l)a.vert(e,o,0,0,i);let d=l.length,f=s,p=l[0],m=l[1],h=S.cross(S.sub(p,f),S.sub(m,f)),g=S.dot(h,o)<0;for(let e=0;e<d;e++){let t=u+1+e,n=u+1+(e+1)%d;g?a.I.push(u,n,t):a.I.push(u,t,n)}},u=(e,t)=>[e[0]*t,e[1]*t,e[2]*t];l(.012,u(o,s*1.25),u(o,s*.7),r),this._viewPane(a,e,n,r,-.012);let d=this.m(`dark`);d.color(.8);let f=(e,t,i,a)=>{let o=n(e,t),s=n(i,a),c=A.dir(o,S.sub(s,o),r);d.box(c.move(0,0,S.dist(o,s)/2),.038,.06,S.dist(o,s),{chamfer:.006})},p=e.width/2;if(e.type===`roundWindow`)f(-p,e.cy,p,e.cy),f(0,e.cy-p,0,e.cy+p);else if(e.type===`archWindow`){let t=e.hi-p;f(0,e.lo,0,e.hi),f(-p,t,p,t),f(-p,e.lo+(t-e.lo)*.5,p,e.lo+(t-e.lo)*.5);for(let e of[Math.PI/4,3*Math.PI/4])f(0,t,Math.cos(e)*p,t+Math.sin(e)*p)}else f(0,e.lo,0,e.hi),f(-p,(e.lo+e.hi)/2,p,(e.lo+e.hi)/2)},_viewPane(e,t,n,r,i){let a=t.width/2-.004,o=(t.floor??t.lo-(t.sill??.95))+1.6,s=this.ctx.layout.sunDirection([0,0,0]),c=Math.hypot(s[0],s[2])||1,l=.84+.26*Math.max(0,(r[0]*s[0]+r[2]*s[2])/c),u=[.36,.53,.84],d=[.98,.9,.76],f=[.86,.71,.5],p=[.36,.37,.22],m=(e,t,n)=>[e[0]+(t[0]-e[0])*n,e[1]+(t[1]-e[1])*n,e[2]+(t[2]-e[2])*n],h=e=>(e=Math.min(1,Math.max(0,e)),e*e*(3-2*e)),g=e=>{let t=e-o,n=t>=0?m(d,u,h(t/.75)):m(f,p,h(-t/.7)),r=(t>=0?.95-.12*h(t/.9):.8-.25*h(-t/.8))*l;return[n[0]*r,n[1]*r,n[2]*r]},_=[-r[0],-r[1],-r[2]];e.grid(6,10,(e,r,o)=>{let s=-a+2*a*e/6,c=Fe(t,Math.max(-a,Math.min(a,s)))??[t.lo,t.lo],l=c[0]+(c[1]-c[0])*r/10;o.p=n(s,l,i),o.n=_,o.u=0,o.v=0,o.c=g(l)})},door(e){let t,n,r,i,a,o,s;if(e.op){let{op:s,W:c,t:l}=e;i=s.width-.02,a=s.hi-s.lo-.01;let u=(s.hinge??`left`)===`left`;t=c((u?-1:1)*s.width/2,s.lo+.005,-e.thick/2+.03),n=u?l:S.scale(l,-1),r=e.n,o=s.open??95}else t=e.hinge,n=S.norm(e.dirAcross),r=S.norm(e.normal),i=e.width??1,a=e.height??2.15,o=e.open??95;s=a-i/2;let c=o*D,l=S.scale(r,-1),u=S.norm(S.add(S.scale(n,Math.cos(c)),S.scale(l,Math.sin(c)))),d=S.norm(S.add(S.scale(r,Math.cos(c)),S.scale(n,Math.sin(c)))),f=A.from(t,u,[0,1,0],d),p=S.cross(u,[0,1,0]);S.dot(p,d)<0&&(f=A.from(t,u,[0,1,0],S.scale(d,-1)));let m=S.dot(f.z,d)>0?1:-1,h=.055,g=Math.max(3,Math.round(i/.17)),_=i/g;for(let e=0;e<g;e++){let t=(e+.5)*_,n=t-i/2,r=s+Math.sqrt(Math.max(0,(i/2)**2-n*n)),a=f.at(t,0,m*h),o=f.at(t,r,m*h);this.plank(a,o,{up:S.scale(f.z,m),width:_-.006,thick:h,mat:`dark`,jitter:.6,bevel:.006})}let v=(e,t,n,r)=>{let i=f.at(e,t,0-m*.018),a=f.at(n,r,0-m*.018),o=this.m(`dark`);o.color(M(this.rng,.5));let s=S.sub(a,i),c=A.dir(i,s,S.scale(f.z,-m));o.box(c.move(0,0,S.len(s)/2),.11,.035,S.len(s),{chamfer:.008,u0:this.rng.next()*3})};v(.06,.3,i-.06,.3),v(.06,s*.92,i-.06,s*.92),v(.1,.36,i-.1,s*.86);let y=this.m(`metal`);y.color(Pe);let b=(e,t)=>{let n=f.at(.02,e,m*.059),r=f.at(t,e,m*.059),i=S.sub(r,n),a=A.dir(n,i,S.scale(f.z,m));y.box(a.move(0,-.002,S.len(i)/2),.052,.007,S.len(i),{u0:this.rng.next()});let o=[],s=f.at(t+.028,e,m*.063);for(let e=0;e<=12;e++){let t=e/12*Math.PI*1.7-Math.PI*.85;o.push(S.add(s,S.add(S.scale(f.x,Math.cos(t)*.026),[0,Math.sin(t)*.026,0])))}y.tube(o,.006,5,{});for(let n=1;n<=Math.floor(t/.15);n++){let t=f.at(n*.15,e,m*.064);y.ellipsoid(A.dir(t,S.scale(f.z,m)),.009,.009,.005,6,3)}};b(.28,i*.78),b(s*.5+.15,i*.72),b(s*.92,i*.66);for(let e of[.28,s*.5+.15,s*.92]){let t=f.at(0,e-.05,h*.5*m),n=f.at(0,e+.05,h*.5*m);y.tube([t,n],.014,7,{caps:!0})}for(let e of[1,-1]){let t=e>0?m*.067:-m*.012,n=f.at(i-.14,.98,t);y.ellipsoid(A.dir(n,S.scale(f.z,e*m)),.04,.04,.008,10,3);let r=[];for(let n=0;n<=18;n++){let a=n/18*Math.PI*2;r.push(S.add(f.at(i-.14,.98-.06+Math.cos(a)*.055,t+e*m*.012),S.scale(f.x,Math.sin(a)*.055)))}y.tube(r,.007,6,{closed:!0})}let x=f.at(0,0,0),C=f.at(i,0,0);return this.colWall(x,C,a,.07,`wall`),{hinge:t,width:i,height:a,open:o}}},Z={straw:.03,sag:.012,battenR:.017,pitch:.3};Z.batten=Z.straw+.6*Z.battenR,Z.rafterTop=Z.straw+1.6*Z.battenR;function Re(e,t){let n=e.length,r=[];for(let t=0;t<n-1;t++){let n=e[t],i=e[t+1],a=Math.hypot(i[0]-n[0],i[1]-n[1])||1,o=(i[1]-n[1])/a,s=-(i[0]-n[0])/a;o<0&&(o=-o,s=-s),r.push([o,s])}return e.map((e,i)=>{let a=r[Math.max(0,i-1)],o=r[Math.min(n-2,i)],s=a[0]+o[0],c=a[1]+o[1],l=Math.hypot(s,c)||1;s/=l,c/=l;let u=t/Math.max(.35,s*o[0]+c*o[1]);return[e[0]-s*u,e[1]-c*u]})}function ze(e,t,n){let r=[],i=0,a=(e,t,n)=>[e[0]+(t[0]-e[0])*n,e[1]+(t[1]-e[1])*n];for(let o=0;o<e.length-1;o++){let s=e[o],c=e[o+1],l=Math.hypot(c[0]-s[0],c[1]-s[1]),u=i,d=i+l;if(d>=t&&u<=n&&l>1e-9){if(r.length||r.push(a(s,c,Math.max(0,(t-u)/l))),d<n)r.push(c.slice());else{r.push(a(s,c,Math.min(1,(n-u)/l)));break}}i=d}return r}function Be(e){let t=[0];for(let n=1;n<e.length;n++)t.push(t[n-1]+Math.hypot(e[n][0]-e[n-1][0],e[n][1]-e[n-1][1]));let n=t[t.length-1];function r(t){let n=e[t],r=e[t+1],i=Math.hypot(r[0]-n[0],r[1]-n[1])||1;return[(r[0]-n[0])/i,(r[1]-n[1])/i]}function i(i){let a=0;if(i<=0)a=0;else if(i>=n)a=e.length-2;else for(;a<e.length-2&&t[a+1]<i;)a++;let o=r(a),s=i-t[a],c=e[a][0]+o[0]*s,l=e[a][1]+o[1]*s,u=o[1],d=-o[0];return u<0&&(u=-u,d=-d),{r:c,y:l,tr:o[0],ty:o[1],nr:u,ny:d}}function a(t){for(let n=0;n<e.length-1;n++){let r=e[n],i=e[n+1];if(t<=r[0]&&t>=i[0]||t>=r[0]&&t<=i[0]){let e=Math.abs(i[0]-r[0])<1e-9?0:(t-r[0])/(i[0]-r[0]);return r[1]+(i[1]-r[1])*e}}return t>e[0][0]?-1/0:e[e.length-1][1]}return{at:i,length:n,yAtR:a}}var Ve=e=>e<0?0:e>1?1:e,He=e=>(e=Ve(e),e*e*(3-2*e)),Ue=(e,t,n)=>[e[0]+(t[0]-e[0])*n,e[1]+(t[1]-e[1])*n,e[2]+(t[2]-e[2])*n],We=[.97,.87,.71],Q=[.8,.76,.7],Ge=[.62,.55,.45],Ke=.84,qe=[.54,.46,.38],Je={thatchCone(e){let t=e.tree?typeof e.tree==`string`?this.ctx.layout.getHeroTree(e.tree):e.tree:null,[n,r]=w(t??e.center),i=e.radius,a=e.overhang??.9,o=e.baseY,s=(e.pitch??42)*D,c=e.height??i*Math.tan(s),l=c/i,u=i+a,d=o-a*l,f=o+c,p=0,m=f;if(e.collar){if(typeof e.collar==`object`&&e.collar.radius)p=e.collar.radius,m=f-p*l;else if(t){let e=this.ctx.layout,n=f-1.5*l;for(let r=0;r<20;r++)n=f-(e.trunkRadiusAt(t,n)+.12)*l;m=n,p=e.trunkRadiusAt(t,n)+.12}}let h=Math.max(8,Math.round(2*Math.PI*i/(e.rafterSpacing??.8))),g=.13,_=Math.min(.35,i*.1),v=[[u,o-a*l*(e.eaveDrop??.78)],[i-_,o+_*l],[p,m]],y=this._thatch([n,r],v,{...e,closedTop:p<.05,rafters:e.rafters===!1?null:{n:h,phase:g}});return e.rafters!==!1&&this.interior(()=>{let t=this.m(`beam`),a=t.vertexCount,s=(e,t,a)=>Math.hypot(e-n,a-r)<i-.08,c=e.rafterR??.055,u=Math.max(p+.05,.12),d=Re(v,Z.rafterTop+c),f=Be(d),_=f.length;for(let e=0;e<=f.length;e+=.02)if(f.at(e).r<=u){_=e;break}let y=ze(d,.16,_),b=[y[0]];for(let e=1;e<y.length;e++){let t=y[e-1],n=y[e],r=Math.max(1,Math.ceil(Math.hypot(n[0]-t[0],n[1]-t[1])/.6));for(let e=1;e<=r;e++)b.push([t[0]+(n[0]-t[0])*(e/r),t[1]+(n[1]-t[1])*(e/r)])}let x=this.m(`beam`),S=this.rng;for(let e=0;e<h;e++){let t=e/h*Math.PI*2+g,i=Math.sin(t),a=Math.cos(t),o=b.map(([e,t])=>[n+i*e,t,r-a*e]),s=S.next()*6.28,l=S.next()*6.28,u=b.map((e,t)=>{let n=t/(b.length-1);return c*(1-.25*n)*(1+.036*Math.sin(n*5.7+s)+.018*Math.sin(n*15.9+l))});x.color(M(S,.6)),x.tube(o,e=>u[e],6,{caps:!0,u0:S.next()*3,v0:S.next()*3,grainAlong:!0})}let C=(Z.rafterTop+2*c)*Math.hypot(1,l)+.045;for(let e of[.35,.68]){let t=i*(1-e)+p*e-.05;if(t<.4)continue;let a=o+(i-t)*l-C,s=Math.max(6,Math.round(2*Math.PI*t/1.1));for(let e=0;e<s;e++){let i=e/s*Math.PI*2,o=(e+1)/s*Math.PI*2;this.log([n+Math.sin(i)*t,a,r-Math.cos(i)*t],[n+Math.sin(o)*t,a,r-Math.cos(o)*t],.045,{segs:6})}}if(p>.1){let e=p+.08,t=m-.18,i=Math.max(8,Math.round(2*Math.PI*e/.6));for(let a=0;a<i;a++){let o=a/i*Math.PI*2,s=(a+1)/i*Math.PI*2;this.beam([n+Math.sin(o)*e,t,r-Math.cos(o)*e],[n+Math.sin(s)*e,t,r-Math.cos(s)*e],{w:.12,h:.16,extend:.02})}}t.flagNoSun(a,t.vertexCount,s)}),e.ridge!==!1&&this._ridgeCap([n,r],y.sampler,{...e,top:p>.05?`collar`:`apex`}),p>.05?this._collar([n,r],p,m):e.finial!==!1&&this._finial([n,r],f),{...y,apexY:f,eaveY:d,eaveR:u,collarY:p>0?m:null,collarR:p}},thatchDome(e){let[t,n]=w(e.center??(typeof e.tree==`string`?this.ctx.layout.getHeroTree(e.tree):e.tree)),r=e.radius,i=e.overhang??.6,a=e.height??r*.78,o=e.baseY,s=r+i,c=[];c.push([s,o-i*.55]);for(let e=1;e<=14;e++){let t=e/14*(Math.PI/2),n=s*Math.cos(t)*(1-.05*Math.sin(t)),r=o-i*.55*(1-Math.sin(t))+(a+i*.55)*Math.sin(t)*(.9+.1*Math.sin(t));c.push([Math.max(0,n),r])}c[c.length-1][0]=0;let l=Math.max(8,Math.round(2*Math.PI*r/.75)),u=this._thatch([t,n],c,{bands:6,...e,closedTop:!0,rafters:e.rafters===!1?null:{n:l,phase:.2}}),d=c[c.length-1][1];return e.rafters!==!1&&this.interior(()=>{let e=Re(c,Z.rafterTop+.04);for(let r=0;r<l;r++){let i=r/l*Math.PI*2+.2,a=[Math.sin(i),-Math.cos(i)],o=[];for(let r=1;r<e.length-1;r++){let[i,s]=e[r];o.push([t+a[0]*Math.max(.05,i),s,n+a[1]*Math.max(.05,i)])}let s=this.m(`bark`);s.color(.85),s.tube(o,.04,5,{caps:!0,u0:this.rng.next()})}}),e.ridge!==!1&&this._ridgeCap([t,n],u.sampler,{...e,top:`apex`}),e.finial!==!1&&this._finial([t,n],d-.1,.7),{...u,topY:d}},_thatch(e,t,n){let r=Be(t),i=r.length,a=this.rng,o=Math.max(n.bands??5,Math.round(i/(n.courseLen??.56))),s=i/o,c=Math.min(.42,s*.75),l=[];for(let e=0;e<o;e++)l.push((e===0?1.15:1)*(1+a.jit(.22)));let u=l.reduce((e,t)=>e+t,0),d=[0];for(let e=0;e<o;e++)d.push(d[e]+l[e]/u*i);let f=.035,p=n.fringe??.14,m=n.thickness??.2,h=n.tint??[1,1,1],[g,_]=e,v=(e,t,n)=>[g+Math.sin(e)*t,n,_-Math.cos(e)*t],y=n.grid??((e,t,n,r)=>e.grid(t,n,r)),b=n.snap??null,S=this.m(`thatch`),C=Array.from({length:12},()=>a.next()*Math.PI*2),w=e=>.016*Math.sin(e+C[0])+.011*Math.sin(2*e+C[1])+.007*Math.sin(3*e+C[2]),T=e=>.07*Math.sin(5*e+C[3])+.05*Math.sin(11*e+C[4])+.04*Math.sin(23*e+C[5])+.035*Math.sin(47*e+C[6]),O=(e,t)=>He(.5+.8*Math.sin(3*e+C[7]+t*.9)*Math.sin(7*e+C[8]-t*1.7)),k=(this.ctx.layout.SUN?.azimuthDeg??248)*D,A=e=>.5-.5*Math.cos(e-k),j=n.rafters?.n??0,M=n.rafters?.phase??0,N=(e,t)=>j?.03*(.5-.5*Math.cos(j*(e-M)))*Math.sin(Math.PI*Ve(t)):0,P=(e,t)=>j?.015*j*Math.sin(j*(e-M))*Math.sin(Math.PI*Ve(t)):0,F=x(E(this.name+`:thatch`)^(g*7919+_*104729|0)^(t[0][1]*1e3|0)),I=n.fringeCards!==!1;for(let e=0;e<o;e++){let t=e===0,s=e===o-1,l=d[e],u=d[e+1]-d[e],g=s?i:Math.min(i,l+u+c),_=Math.min(1,u/(g-l)),x=r.at(l),C=Math.max(.3,x.r),E=t?.028:.045,D=Math.max(24,Math.ceil(2*Math.PI*C/E)),k=t?.15:.085,j=t?m*1.4:m*.55,M=Math.min(p*(t?2:.85),u*(t?.9:.45)),L=Math.max(6,Math.round(2*Math.PI*C/(.24+a.next()*.06))),R=e%2*Math.PI+a.jit(.4),z=e=>.5-.5*Math.cos(L*e+R),B=Math.max(2,Math.round(C*9)),V=Math.max(3,Math.round(C*23)),H=Math.max(4,Math.round(C*57)),U=Math.max(1,Math.round(C*1.3)),W=Math.max(2,Math.round(C*3.7)),ee=a.next()*6.28,te=a.next()*6.28,G=a.next()*6.28,ne=a.next()*6.28,K=new Float32Array(D+1),q=new Float32Array(D+1),re=new Float32Array(D+1),J=new Float32Array(D+1);for(let e=0;e<D;e++){let n=e/D*Math.PI*2,r=.5+.3*Math.sin(n*B+ee)+.2*Math.sin(n*V+te),i=.5+.5*Math.sin(n*H+te*1.7),o=a.next(),s=a.next(),c=z(n);K[e]=M*(.28+.26*r+.2*c+.16*i+.18*s+.42*o*o*o*o*o)*(t&&I?.42:1),q[e]=(t?.03:.055)*Math.sin(n*U+G)+.028*Math.sin(n*W+ne)-.035*c,re[e]=1+a.jit(.12),J[e]=a.next()<.07?.55+a.next()*.45:0}K[D]=K[0],q[D]=q[0],re[D]=re[0],J[D]=J[0];let ie=t?.04:.032,ae=(e,t)=>(ie*z(e)+.008*Math.sin(e*B*.5+ee))*(1-.75*t),oe=(e,t)=>(ie*.5*L*Math.sin(L*e+R)+.004*B*Math.cos(e*B*.5+ee))*(1-.75*t),se=a.next(),Y=Ue(We,Q,.2+.7*se*se),ce=(.88+a.next()*.16)*Ke*(t?.86:1)*(1+.08*(e/Math.max(1,o-1)));Y=[Y[0]*h[0]*ce,Y[1]*h[1]*ce,Y[2]*h[2]*ce];let le=[{kind:`rim`,c:t?I?.5:.3:.46},{kind:`tip`,c:1.04},{kind:`body`,f:.04,c:1},{kind:`body`,f:_*.5,c:.93},{kind:`body`,f:_,c:s?.86:.64},{kind:`body`,f:1,c:s?.82:.46}],X=(n,a,o)=>{let s=le[a],c=n/D*Math.PI*2,u=l+q[n],d,p,m=0;s.kind===`rim`?(d=u-K[n]*.45,p=f+k-j):s.kind===`tip`?(d=u-K[n],p=f+k+.012):(d=u+(g-u)*s.f,p=f+k*(1-(d-l)/(g-l+1e-6)),m=-k/(g-l+1e-6));let h=Ve((d-l)/(g-l+1e-6)),_=0;s.kind!==`rim`&&(p+=ae(c,h),_=oe(c,h));let y=d/i;p-=N(c,y),_-=P(c,y);let x=r.at(d),S=1+w(c)*Math.max(0,1-y),E=(x.r+x.nr*p)*S,M=x.y+x.ny*p;if(s.kind===`tip`){let e=K[n];M-=(t?.38:.16)*e+.012,E+=(t?.07:.03)*e}else s.kind===`rim`&&t&&(M-=.025);E<0&&(E=0),o.p=v(c,E,M);let F=Math.sin(c),I=Math.cos(c),L=[F*x.nr,x.ny,-I*x.nr],R=[F*x.tr,x.ty,-I*x.tr],z=[I,0,F],B;if(s.kind===`rim`)B=[-R[0]*.8-L[0]*.25,-R[1]*.8-L[1]*.25-.4,-R[2]*.8-L[2]*.25];else if(s.kind===`tip`)B=[L[0]*.75-R[0]*.6,L[1]*.75-R[1]*.6-.1,L[2]*.75-R[2]*.6];else{let e=1/Math.max(.3,E);B=[L[0]-R[0]*m-z[0]*_*e,L[1]-R[1]*m,L[2]-R[2]*m-z[2]*_*e]}let V=Math.hypot(B[0],B[1],B[2])||1;o.n=[B[0]/V,B[1]/V,B[2]/V],o.u=c*C,o.v=d+e*.37-(s.kind===`rim`?j*.8:0);let H=s.c*re[n]*(1+T(c)),U=[Y[0]*H,Y[1]*H,Y[2]*H],W=(U[0]+U[1]+U[2])/3,ee=Ve(J[n]*.8+.35*O(c,d)+.18*A(c)+(s.kind===`tip`?.25:0));U=Ue(U,[Q[0]*W*1.08,Q[1]*W*1.08,Q[2]*W*1.08],ee*.6),(t||s.kind===`rim`)&&(U=Ue(U,[Ge[0]*W,Ge[1]*W,Ge[2]*W],(t?.25:0)+.15*A(c))),o.c=U,b&&b(o.p)&&(o.snapped=!0)};if(t&&I){let e=this.sheltered(()=>this.m(`thatchUnder`)),t=F.next()*3;y(e,D,1,(e,n,r)=>{X(e,n,r);let i=e/D*Math.PI*2;r.u=t+i*C,r.v=n===0?.35:.35+Math.min(.3,Math.max(.12,j*.8+K[e]*.4));let a=(n===0?.55:.78)*re[e]*(1+T(i)),o=[Y[0]*a,Y[1]*a,Y[2]*a],s=(o[0]+o[1]+o[2])/3;o=Ue(o,[Q[0]*s*1.05,Q[1]*s*1.05,Q[2]*s*1.05],.25+.2*A(i)),r.c=o}),y(S,D,le.length-2,(e,t,n)=>X(e,t+1,n))}else y(S,D,le.length-1,X);if(t){let e=Math.max(24,Math.ceil(2*Math.PI*C/.034));for(let t=0;t<4*e+2;t++)a.next();I&&this._fringeCards({P:r,W:v,grid:y,snap:b,wob:w,streak:T,lee:A,rr:F,b:l,wave:q,nA:D,rBand:C,d0:f,flare:k,rimK:j,vis:u,jag:p,tintK:Y,trim:n.fringeTrim??null})}}return n.ceiling!==!1&&(a.next(),this._underside({P:r,Stot:i,W:v,grid:y,snap:b,wob:w,streak:T,rr:F,baseTint:h,closedTop:!!n.closedTop,prof:t})),{profile:t,slopeLength:i,sampler:r,at:r.at,yAtR:r.yAtR}},_fringeCards(e){let{P:t,W:n,grid:r,snap:i,wob:a,streak:o,lee:s,rr:c,b:l,wave:u,nA:d,rBand:f,d0:p,flare:m,rimK:h,vis:g,jag:_,tintK:v,trim:y}=e,b=this.m(`straw`),x=Math.max(24,Math.ceil(2*Math.PI*f/.055)),S=Math.max(.1,Math.min(_*1.25,g*.6)),C=c.next()*6.28,w=c.next()*6.28,T=c.next()*6.28,E=Math.max(3,Math.round(f*4)),D=Math.max(5,Math.round(f*11)),O=new Float32Array(x+1),k=[c.next()*3,c.next()*3,c.next()*3,c.next()*3];for(let e=0;e<x;e++){let t=e/x*Math.PI*2,n=c.next();O[e]=.82+.16*Math.sin(t*E+C)+.12*Math.sin(t*D+w)+.34*n*n*n-.06,y&&(O[e]*=Math.max(.15,Math.min(1,y(t))))}O[x]=O[0];let A=e=>{let t=(e/(Math.PI*2)%1+1)%1*d,n=Math.floor(t)%d,r=t-Math.floor(t);return u[n]+(u[(n+1)%d]-u[n])*r},j=[{s0:.1,o0:p+m*.55,o1:p+m*.15,reach:1,droop:.36,out:.04,v:1,k:1},{s0:.05,o0:p+m-h+.035,o1:p+m-h-.03,reach:1.05,droop:.6,out:.015,v:-1,k:.62},{s0:.22,o0:-(Z.straw+.014),o1:p+m-h-.04,reach:.5,droop:.28,out:0,v:1,k:.48},{band:!0,s0:.02,reach:.8,droop:.55,out:.02,v:-1,k:.6}],M=[0,0,.62,1],N=.45,P=(e,n,r,i)=>{let o=S*e.reach*O[r],s=l+A(n);if(e.band){let r=p+m-h-.012,c=p+m+.03,l=Math.min(1,i/N),u=Math.max(0,(i-N)/.55),d=t.at(s+e.s0-(.035+e.s0)*l-.55*o*u),f=r+(c-r)*l;return[(d.r+d.nr*f)*(1+a(n))+e.out*u,d.y+d.ny*f-e.droop*o*u*u,d.nr-d.tr,d.ny-d.ty]}let c=s+e.s0-i*(e.s0+o),u=e.s0/(e.s0+o),d=Math.max(0,(i-u)/(1-u)),f=e.o0+(e.o1-e.o0)*i,g=t.at(c),_=1+a(n);return[(g.r+g.nr*f)*_+e.out*d,g.y+g.ny*f-e.droop*o*d*d,g.nr,g.ny]};for(let e=0;e<j.length;e++){let t=j[e];r(b,x,3,(r,a,c)=>{let l=r/x*Math.PI*2,u=S*t.reach*O[r],d=a===1?t.band?N:t.s0/(t.s0+u):M[a],[p,m,h,g]=P(t,l,r,d),_=P(t,l,r,Math.min(1,d+.05)),y=P(t,l,r,Math.max(0,d-.05)),b=-(_[1]-y[1]),C=_[0]-y[0];b*h+C*g<0&&(b=-b,C=-C);let w=Math.hypot(b,C)||1,E=Math.sin(l),D=Math.cos(l);c.p=n(l,Math.max(0,p),m),c.n=[E*b/w,C/w,-D*b/w],c.u=l*f+k[e],c.v=.5+t.v*.47*d;let A=t.k*(1+o(l))*(.92+.16*Math.sin(l*37+T)),j=[v[0]*A,v[1]*A,v[2]*A],F=(j[0]+j[1]+j[2])/3;j=Ue(j,[Q[0]*F*1.05,Q[1]*F*1.05,Q[2]*F*1.05],.25+.2*s(l)),c.c=j,i&&i(c.p)&&(c.snapped=!0)})}let F=[0,.32,.66,1];for(let e=0;e<x;e++){let t=(e+c.jit(.35)+x)%x/x*Math.PI*2,a=Math.sin(t),l=Math.cos(t),u=.8*(1+o(t))*(.9+.2*c.next()),d=[v[0]*u,v[1]*u,v[2]*u],f=(d[0]+d[1]+d[2])/3;d=Ue(d,[Q[0]*f*1.05,Q[1]*f*1.05,Q[2]*f*1.05],.25+.2*s(t));let p=c.next()*3;r(b,1,3,(r,o,s)=>{let[c,u]=P(r===0?j[1]:j[0],t,e,F[o]);s.p=n(t,Math.max(0,c),u),s.n=[l,0,a],s.u=p+r*.2,s.v=.5+.47*F[o],s.c=d.slice(),i&&i(s.p)&&(s.snapped=!0)})}},_underside(e){let{P:t,Stot:n,W:r,grid:i,snap:a,wob:o,streak:s,rr:c,baseTint:l,closedTop:u}=e,d=[],f=n-(u?.14:.12);for(let e=.16+c.next()*.05;e<f&&!(t.at(e).r-Z.batten<.18);e+=Z.pitch+c.jit(.025))d.push(e);let p=[-.02,...d,n],m=c.next()*6.28;this.sheltered(()=>{let e=this.m(`thatchUnder`);for(let u=0;u<p.length-1;u++){let d=p[u],f=p[u+1],h=Math.max(.12,t.at((d+f)/2).r),g=Math.max(5,Math.round(2*Math.PI*h/.19)),_=[],v=0;for(let e=0;e<g;e++){let e=1+c.jit(.35);_.push(e),v+=e}let y=[],b=[],x=[],S=c.next()*(2*Math.PI/g);for(let e=0;e<g;e++){let t=_[e]/v*Math.PI*2,n=1+c.jit(.14);y.push(S),b.push(0),x.push(n),y.push(S+t*(.3+c.jit(.05))),b.push(-1),x.push(n),y.push(S+t*(.7+c.jit(.05))),b.push(1),x.push(n),S+=t}y.push(y[0]+Math.PI*2),b.push(0),x.push(x[0]);let C=(.9+c.next()*.2)*Ke,w=c.next()*5,T=f-d,E=Math.min(1,.38/Math.max(.05,T)),D=u===0;i(e,y.length-1,3,(e,i,c)=>{let f=y[e],g=i/3,_=d+T*g+(i===0&&!D?-.015:i===3&&u<p.length-2?.015:0),v=t.at(_),S=Math.sin(Math.PI*g),O=Math.cos(Math.PI*g),k=b[e],A=Z.straw+Z.sag*S*(k===0?.4:1)+(k?.008*(.35+.65*S):0),j=.6*Z.sag*(Math.PI/Math.max(.05,T))*O*(k===0?.5:1);D&&i===0?(A=.075,j=0):(i===0||i===3&&u<p.length-2)&&(A-=.004);let M=Ve(_/n),N=1+o(f)*Math.max(0,1-M),P=Math.max(0,(v.r-v.nr*A)*N),F=v.y-v.ny*A;c.p=r(f,P,F);let I=Math.sin(f),L=Math.cos(f),R=[I*v.nr,v.ny,-L*v.nr],z=[I*v.tr,v.ty,-L*v.tr],B=[L,0,I],V=k*.3*(.35+.65*S),H=[-R[0]-z[0]*j+B[0]*V,-R[1]-z[1]*j,-R[2]-z[2]*j+B[2]*V],U=Math.hypot(H[0],H[1],H[2])||1;c.n=[H[0]/U,H[1]/U,H[2]/U],c.u=w+f*h,c.v=.31+(_-d)*E;let W=C*x[e]*(k===0?.48:1)*(.62+.38*Math.sqrt(Math.max(0,S)));W*=(1-.32*M*M)*(1+.35*s(f+.7))*(.94+.12*Math.sin(f*3+_*2.1+m)),D&&i===0&&(W*=.55),c.c=[qe[0]*l[0]*W,qe[1]*l[1]*W,qe[2]*l[2]*W],a&&a(c.p)&&(c.snapped=!0)})}}),this.interior(()=>{let e=this.m(`bark`);for(let i of d){let s=t.at(i),l=s.r-s.nr*Z.batten,u=s.y-s.ny*Z.batten,d=Math.max(12,Math.ceil(2*Math.PI*l/.22)),f=Math.max(0,1-i/n),p=c.next()*6.28,m=[];for(let e=0;e<d;e++){let t=e/d*Math.PI*2;m.push(r(t,l*(1+o(t)*f),u+.004*Math.sin(t*5+p)))}let h=.6+c.next()*.1;if(e.color(h*1.02,h*.95,h*.86),!a){e.tube(m,Z.battenR,5,{closed:!0,u0:c.next()});continue}let g=[],_=()=>{g.length>1&&e.tube(g,Z.battenR,5,{caps:!0,u0:c.next()}),g=[]};for(let e=0;e<=d;e++){let t=m[e%d];a(t.slice())?_():g.push(t)}_()}})},_ridgeCap(e,t,n){let[r,i]=e,a=this.rng,o=t.length,s=Math.min(.95,Math.max(.45,o*.2)),c=o-s,l=n.top===`apex`?o-Math.min(.28,s*.35):o,u=Math.max(.3,t.at(c).r),d=Math.max(8,Math.round(2*Math.PI*u/.36)),f=Math.max(32,d*6),p=(e,t,n)=>[r+Math.sin(e)*t,n,i-Math.cos(e)*t],m=this.m(`thatch`),h=n.tint??[1,1,1],g=Ke*.95,_=[.98*h[0]*g,.88*h[1]*g,.68*h[2]*g],v=e=>{let t=e/(Math.PI*2)*d,n=t-Math.floor(t);return Math.abs(n-.5)*2},y=[{edge:!0,off:.07,c:.38},{edge:!0,off:.17,c:1},{f:.35,off:.18000000000000002,c:.95},{f:.7,off:.17500000000000002,c:.92},{f:1,off:n.top===`apex`?.15000000000000002:.13,c:.85}];if((n.grid??((e,t,n,r)=>e.grid(t,n,r)))(m,f,y.length-1,(e,r,i)=>{let a=e/f*Math.PI*2,o=y[r],s=v(a),m=c-.14*(1-s)-.02,h=o.edge?m:m+(l-m)*o.f,g=t.at(h),b=o.off+.012*Math.sin(a*d*2),x=Math.max(0,g.r+g.nr*b),S=g.y+g.ny*b;i.p=p(a,x,S);let C=Math.sin(a),w=Math.cos(a),T=[C*g.nr,g.ny,-w*g.nr];r===0&&(T=[C*-g.tr,-g.ty-.3,-w*-g.tr]);let E=Math.hypot(T[0],T[1],T[2])||1;i.n=[T[0]/E,T[1]/E,T[2]/E],i.u=a*u,i.v=h*1.3;let D=o.c*(1+.08*Math.sin(a*13+1.7));i.c=[_[0]*D,_[1]*D,_[2]*D],n.snap&&n.snap(i.p)&&(i.snapped=!0)}),n.snap)return;let b=e=>{let n=t.at(e),r=.19;return{r:Math.max(.05,n.r+n.nr*r),y:n.y+n.ny*r}},x=b(c+s*.22),S=b(c+s*.7),C=this.m(`beam`),w=.013;for(let e of[x,S]){if(e.r<.25)continue;let t=Math.max(16,Math.round(2*Math.PI*e.r/.25)),n=[];for(let r=0;r<t;r++){let i=r/t*Math.PI*2;n.push(p(i,e.r,e.y))}C.color(.5+a.jit(.05),.46,.4),C.tube(n,w,4,{closed:!0,u0:a.next(),grainAlong:!0})}if(S.r>.25){let e=Math.max(8,Math.round(2*Math.PI*x.r/.32));for(let t=0;t<e;t++){let n=t/e*Math.PI*2,r=(t+1)/e*Math.PI*2;C.color(.48+a.jit(.05),.44,.38),C.tube([p(n,x.r+.01,x.y),p(r,S.r+.01,S.y)],w*.8,4,{u0:a.next(),grainAlong:!0}),C.tube([p(r,x.r+.01,x.y),p(n,S.r+.01,S.y)],w*.8,4,{u0:a.next(),grainAlong:!0})}}},_collar(e,t,n){let[r,i]=e,a=this.rng,o=Math.max(24,Math.ceil(2*Math.PI*t/.1)),s=[a.next()*6.28,a.next()*6.28,a.next()*6.28],c=(e,t)=>{let n=[];for(let a=0;a<o;a++){let c=a/o*Math.PI*2;n.push([r+Math.sin(c)*e,t+.02*Math.sin(c*5+s[2]),i-Math.cos(c)*e])}return n},l=e=>t=>{let n=t/o*Math.PI*2;return e*(1+.12*Math.sin(n*7+s[0])+.07*Math.sin(n*19+s[1]))},u=this.m(`thatch`),d=Ke;u.color(.86*d,.77*d,.6*d);let f=c(t+.1,n+.05),p=l(.2);u.tube(f,p,10,{closed:!0,u0:a.next(),colorFn:(e,t,n)=>{let r=.9+.2*Math.sin(e*.37+s[1]);n[0]=r,n[1]=r*.98,n[2]=r*.95}}),u.color(.7*d,.63*d,.5*d),u.tube(c(t+.04,n+.3),l(.12),8,{closed:!0,u0:a.next()});let m=Math.max(8,Math.round(2*Math.PI*(t+.1)/.45));for(let e=0;e<m;e++){let t=Math.floor(e/m*o),n=f[t],r=f[(t+1)%o],i=S.norm(S.sub(r,n));this.lashing(n,i,p(t)-.012,{turns:2,width:.05,r:.011})}let h=this.m(`rope`);h.color(.95),h.tube(c(t+.03,n+.2),.026,6,{closed:!0})},_finial(e,t,n=1){let[r,i]=e,a=this.rng,o=n,s=A.from([r,t,i],[1,0,0],[0,1,0],[0,0,1]),c=this.m(`thatch`),l=Ke;c.color(.92*l,.82*l,.64*l),c.lathe(s,[[.2*o,-.08*o],[.25*o,.02*o],[.2*o,.14*o],[.13*o,.26*o],[.1*o,.34*o],[.12*o,.4*o],[.08*o,.47*o],[0,.5*o]],20,{u0:a.next()});let u=new Float32Array(65),d=new Float32Array(65);for(let e=0;e<64;e++){let t=a.next();u[e]=(.14+.1*a.next()+.16*t*t*t)*o,d[e]=.9+.2*a.next()}u[64]=u[0],d[64]=d[0],c.grid(64,2,(e,n,a)=>{let s=e/64*Math.PI*2,c=n===0?.22*o:n===1?.34*o:.36*o+u[e]*.9,f=n===0?0:n===1?-.12*o:-.12*o-u[e];a.p=[r+Math.sin(s)*c,t+f,i-Math.cos(s)*c],a.n=[Math.sin(s)*.82,.57,-Math.cos(s)*.82],a.u=s*.3*o,a.v=-f;let p=(n===2?1:.85)*d[e];a.c=[.9*p*l,.8*p*l,.62*p*l]});let f=this.m(`rope`);f.color(1);for(let[e,n]of[[.02,.255],[.3,.12]]){let a=[];for(let s=0;s<18;s++){let c=s/18*Math.PI*2;a.push([r+Math.sin(c)*n*o,t+e*o,i-Math.cos(c)*n*o])}f.tube(a,.022*o,6,{closed:!0})}this.log([r,t+.42*o,i],[r,t+.98*o,i],.034*o,{mat:`dark`,segs:7,taper:.55});let p=this.m(`dark`);p.color(.8),p.ellipsoid(A.from([r,t+1*o,i],[1,0,0],[0,1,0],[0,0,1]),.042*o,.05*o,.042*o,10,6)},linenShade(e){let t=e.anchors,n=t.length,r=e.sag??.22,i=e.edgeCurve??.1,a=e.res??14,o=t.reduce((e,t)=>S.add(e,S.scale(t,1/n)),[0,0,0]),s=(e,a)=>{let s=t[e],c=t[(e+1)%n],l=S.lerp(s,c,a),u=S.dist(s,c),d=S.lerp(s,c,.5),f=S.norm([o[0]-d[0],0,o[2]-d[2]]),p=4*a*(1-a);return[l[0]+f[0]*i*u*p,l[1]-r*.25*p,l[2]+f[2]*i*u*p]},c=this.m(`sail`);c.color(e.tint??[1,.99,.96]);let l;if(n===4){l=(e,n)=>{let i=s(0,e),a=s(2,1-e),o=s(3,1-n),c=s(1,n),l=[0,0,0];for(let r=0;r<3;r++)l[r]=(1-n)*i[r]+n*a[r]+(1-e)*o[r]+e*c[r]-((1-e)*(1-n)*t[0][r]+e*(1-n)*t[1][r]+e*n*t[2][r]+(1-e)*n*t[3][r]);return l[1]-=r*16*e*(1-e)*n*(1-n)*.75,l},this._sailGrid(c,l,a,a);let e=S.dist(t[0],t[1]),n=S.dist(t[1],t[2]),i=S.dist(t[2],t[3]),o=S.dist(t[3],t[0]),u=.045/Math.max(.5,(n+o)/2),d=.045/Math.max(.5,(e+i)/2),f=(e,t=18)=>{let n=[],r=[];for(let i=0;i<=t;i++){let[a,o]=e(i/t);n.push(l(a,o)),r.push(this._sailNormal(l,a,o))}return[n,r]};for(let e of[e=>[e,u],e=>[1-d,e],e=>[1-e,1-u],e=>[d,1-e]])this._sailBand(c,...f(e),.035,.62);let p=Math.max(2,Math.round((e+i)/2/1.05));for(let e=1;e<p;e++)this._sailBand(c,...f(t=>[e/p+.012*Math.sin(t*3),u*2+t*(1-u*4)]),.012,.7);for(let[t,r,a,s]of[[0,0,1,1],[1,0,-1,1],[1,1,-1,-1],[0,1,1,-1]]){let u=.42/Math.max(.5,r?i:e),d=.42/Math.max(.5,t?n:o);this._sailPatch(c,l,[[t,r],[t+a*u,r],[t,r+s*d]],.66)}}else{let e=[o[0],o[1]-r,o[2]];for(let i=0;i<n;i++){l=(t,n)=>{let a=s(i,t),o=S.lerp(e,a,n);return o[1]+=r*.35*n*(1-n),o},this._sailGrid(c,l,a,Math.ceil(a*.6));let u=S.dist(t[i],t[(i+1)%n]),d=S.dist(o,S.lerp(t[i],t[(i+1)%n],.5)),f=.045/Math.max(.5,d),p=(e,t=16)=>{let n=[],r=[];for(let i=0;i<=t;i++){let[a,o]=e(i/t);n.push(l(a,o)),r.push(this._sailNormal(l,a,o))}return[n,r]};this._sailBand(c,...p(e=>[e,1-f]),.035,.62),this._sailBand(c,...p(e=>[.004,.1+e*(.9-f*2)]),.012,.7);let m=.42/Math.max(.5,u),h=.42/Math.max(.5,d);this._sailPatch(c,l,[[0,1],[m,1],[0,1-h]],.66)}}if(e.hem!==!1)for(let e=0;e<n;e++){let t=[];for(let n=0;n<=16;n++)t.push(s(e,n/16));this.rope(t,.011,{segs:5,mat:`rope`})}let u=this.m(`metal`);u.color(.35,.33,.3);for(let r=0;r<n;r++){let n=t[r],i=[];for(let e=0;e<=14;e++){let t=e/14*Math.PI*2;i.push([n[0]+Math.cos(t)*.035,n[1]+Math.sin(t)*.035,n[2]])}u.tube(i,.006,5,{});let a=e.ties?.[r];a&&this.rope([n,a],.012)}return{centroid:o}},_sailNormal(e,t,n){let r=.001,i=e(Math.min(1,t+r),n),a=e(Math.max(0,t-r),n),o=e(t,Math.min(1,n+r)),s=e(t,Math.max(0,n-r)),c=S.cross(S.sub(i,a),S.sub(o,s));return S.len(c)<1e-12&&(c=[0,1,0]),c=S.norm(c),c[1]<0?S.scale(c,-1):c},_sailBand(e,t,n,r,i){let a=t.length,o=e.cr,s=e.cg,c=e.cb;e.color(o*i,s*i,c*i);for(let i of[1,-1])e.grid(1,a-1,(e,o,s)=>{let c=t[o],l=n[o],u=S.norm(S.sub(t[Math.min(a-1,o+1)],t[Math.max(0,o-1)])),d=S.norm(S.cross(l,u)),f=e===0?-r:r,p=.0035*i;s.p=[c[0]+d[0]*f+l[0]*p,c[1]+d[1]*f+l[1]*p,c[2]+d[2]*f+l[2]*p],s.n=i>0?l:[-l[0],-l[1],-l[2]],s.u=e*.05,s.v=o*.1});e.color(o,s,c)},_sailPatch(e,t,n,r){let i=e.cr,a=e.cg,o=e.cb;e.color(i*r,a*r,o*r);let[s,c,l]=n;for(let n of[1,-1])e.grid(4,4,(e,r,i)=>{let a=e/4,o=r/4,u=s[0]+(c[0]-s[0])*a*(1-o)+(l[0]-s[0])*o,d=s[1]+(c[1]-s[1])*a*(1-o)+(l[1]-s[1])*o,f=t(u,d),p=this._sailNormal(t,u,d),m=.004*n;i.p=[f[0]+p[0]*m,f[1]+p[1]*m,f[2]+p[2]*m],i.n=n>0?p:[-p[0],-p[1],-p[2]],i.u=u*3,i.v=d*3});e.color(i,a,o)},_sailGrid(e,t,n,r){let i=.001;e.grid(n,r,(e,a,o)=>{let s=e/n,c=a/r,l=t(s,c),u=t(Math.min(1,s+i),c),d=t(Math.max(0,s-i),c),f=t(s,Math.min(1,c+i)),p=t(s,Math.max(0,c-i)),m=S.cross(S.sub(u,d),S.sub(f,p));S.len(m)<1e-12&&(m=[0,1,0]),m=S.norm(m),m[1]<0&&(m=S.scale(m,-1)),o.p=l,o.n=m,o.u=s*3,o.v=c*3})}},Ye={cream:[1,.97,.9],white:[1.08,1.06,1.02],terracotta:[.72,.34,.21],ochre:[.84,.58,.26],indigo:[.28,.34,.55],sage:[.56,.62,.46],rust:[.62,.26,.15],charcoal:[.34,.32,.31],sand:[.88,.79,.62],olive:[.52,.5,.3]},Xe=[.95,.55,.36],Ze=[1,.9,.72];function $(e,t){return typeof t==`string`?Ye[t]??Ye.cream:t??Ye.cream}Object.assign(U.prototype,P,Ae,je,Ne,Le,Je,De,{softCushion(e,t,n,r,i,a={}){let o=a.kind??`box`,s=n/2,c=i/2,l=r/2,u=a.plan??(o===`box`?7:3.2),d=a.bulge??(o===`box`?.2:0),f=(e,t)=>Math.sign(e)*Math.abs(e)**+t,p=e=>[s*f(Math.cos(e),2/u),c*f(Math.sin(e),2/u)],m=e=>{let t=Math.sin(2*e);return t*t},h=(e,t)=>{let[n,r]=p(e),i=Math.max(0,Math.cos(t)),a=Math.sin(t),s,c;if(o===`box`){s=i**.4*(1+.035*i),c=l*f(a,.4);let e=(1-Math.min(1,s*s))*d*l;c+=a>0?e*a:-.25*e*-a}else s=i**.38,c=l*a*(1-.45*m(e)*s*s);return[n*s,c,r*s]},g=e=>t.at(e[0],e[1],e[2]),_=a.nu??(o===`box`?32:24),v=a.nv??(o===`box`?14:12),y=.001,b=e.cr,x=e.cg,C=e.cb;if(e.grid(_,v,(e,n,r)=>{let i=e/_*Math.PI*2,s=-Math.PI/2+n/v*Math.PI,c=h(i,s),l;if(n===0)l=[0,-1,0];else if(n===v)l=[0,1,0];else{let e=h(i-y,s),t=h(i+y,s),n=h(i,s-y),r=h(i,s+y),a=[t[0]-e[0],t[1]-e[1],t[2]-e[2]],o=[r[0]-n[0],r[1]-n[1],r[2]-n[2]];l=S.cross(a,o),S.dot(l,c)<0&&(l=S.scale(l,-1)),l=S.norm(l)}r.p=g(c),r.n=t.vec(l[0],l[1],l[2]),r.u=(a.u0??0)+c[0]+(o===`box`?.35*Math.abs(c[1])*Math.sign(c[2]||1):0),r.v=c[2]+.5*c[1];let u=.94+.06*Math.abs(Math.sin(s))-(s<0?.06:0);r.c=[b*u,x*u,C*u]}),a.pipe!==!1){let t=a.pipe??.72,n=a.pipeR??Math.min(.009,r*.08);e.color(b*t,x*t,C*t);let i=o===`box`?[.61,-.61]:[0];for(let t of i){let r=[],i=_*2;for(let e=0;e<i;e++){let a=e/i*Math.PI*2,o=h(a,t),[s,c]=p(a),l=Math.hypot(s,c)||1;r.push(g([o[0]+s/l*n*.55,o[1],o[2]+c/l*n*.55]))}e.tube(r,n,5,{closed:!0,u0:this.rng.next()})}e.color(b,x,C)}if(a.tuft){let n=h(0,Math.PI/2);e.color(b*.62,x*.62,C*.62),e.ellipsoid(t.move(0,n[1]-.004,0),.02,.009,.02,8,4),e.color(b,x,C)}},_F(e){return A.yaw(e.pos,e.yaw??0)},_collide(e,t,n,r,i,a,o,s){if(s.collide===!1)return;let c=e.at(t,n,r);this.colBox(c,[i,a,o],Math.atan2(e.z[0],e.z[2]),`solid`)},_lb(e,t,n,r,i,a=`dark`,o=.008){this.beam(e.at(...t),e.at(...n),{w:r,h:i,mat:a,chamfer:o,up:e.y})},_lplank(e,t,n,r,i,a=`dark`,o=.4){this.plank(e.at(...t),e.at(...n),{width:r,thick:i,mat:a,jitter:o,up:e.y})},bed(e){let t=this._F(e),n=e.w??1.5,r=e.l??2.05,i=n/2,a=r/2;for(let[e,n,r]of[[-i,-a,1.05],[i,-a,1.05],[-i,a,.62],[i,a,.62]])this._lb(t,[e,0,n],[e,r,n],.085,.085,`dark`,.012);for(let e of[-i,i])this._lb(t,[e,.3,-a],[e,.3,a],.05,.16);for(let e of[-a,a])this._lb(t,[-i,.3,e],[i,.3,e],.05,.16);let o=Math.round(n/.16);for(let e=0;e<o;e++){let r=-i+(e+.5)*(n/o);this.plank(t.at(r,.36,-a+.01),t.at(r,.98,-a+.01),{up:t.z,width:n/o-.008,thick:.03,mat:`dark`,jitter:.4})}this._lb(t,[-i-.05,1,-a],[i+.05,1,-a],.07,.06);let s=this.m(`cloth`);s.color(Ye.cream),this.softCushion(s,t.move(0,.47,.01),n-.06,.22,r-.08,{bulge:.1,plan:9,pipe:.85,u0:this.rng.next()}),s.color($(this,e.blanket??`terracotta`)),s.roundBox(t.move(0,.5,a*.33),n+.02,.2,r*.62,.3,18,9,{bulge:.1,u0:this.rng.next()}),s.color(Ye.white);for(let e of[-n*.24,n*.24])this.softCushion(s,t.move(e,.66,-a+.28).rot(`x`,-.3),n*.42,.15,.36,{kind:`pillow`,pipe:.9});this._collide(t,0,.35,0,n+.1,.7,r+.1,e)},table(e){let t=this._F(e),n=e.h??.76;if(e.round){let r=e.r??.45,i=this.m(`dark`);i.color(M(this.rng,.4)),i.lathe(t,[[0,n-.045],[r-.01,n-.045],[r,n-.03],[r,n-.012],[r-.01,n],[0,n]],28,{u0:this.rng.next()*2}),this._lb(t,[0,0,0],[0,n-.04,0],.09,.09);for(let e=0;e<3;e++){let n=e/3*Math.PI*2;this._lb(t,[0,.05,0],[Math.cos(n)*r*.75,.03,Math.sin(n)*r*.75],.06,.06)}this._collide(t,0,n/2,0,r*1.6,n,r*1.6,e);return}let r=e.w??1.2,i=e.d??.72,a=r/2,o=i/2,s=Math.max(3,Math.round(i/.18));for(let e=0;e<s;e++){let r=-o+(e+.5)*(i/s);this._lplank(t,[-a,n,r],[a,n,r],i/s-.006,.04,`dark`,.3)}for(let[e,r]of[[-a+.07,-o+.07],[a-.07,-o+.07],[-a+.07,o-.07],[a-.07,o-.07]])this._lb(t,[e,0,r],[e,n-.04,r],.07,.07);this._lb(t,[-a+.07,n-.1,-o+.07],[a-.07,n-.1,-o+.07],.03,.09),this._lb(t,[-a+.07,n-.1,o-.07],[a-.07,n-.1,o-.07],.03,.09),this._lb(t,[-a+.07,.15,0],[a-.07,.15,0],.05,.05),this._collide(t,0,n/2,0,r,n,i,e)},chair(e){let t=this._F(e),n=.44,r=.45,i=n/2;for(let[e,n,a]of[[-.22,i,r],[i,i,r],[-.22,-.22,.95],[i,-.22,.95]]){let i=a>r?-.06:0;this._lb(t,[e,0,n],[e,a,n+i],.045,.045)}for(let e=0;e<3;e++){let i=-.22+(e+.5)*(n/3);this._lplank(t,[-.24,r,i],[.24,r,i],n/3-.008,.03,`dark`,.3)}for(let e of[.62,.8,.93])this._lb(t,[-.22,e,-.22-.05*(e-r)/.5],[i,e,-.22-.05*(e-r)/.5],.025,e>.9?.07:.06);if(this._lb(t,[-.22,.16,-.22],[-.22,.16,i],.025,.03),this._lb(t,[i,.16,-.22],[i,.16,i],.025,.03),e.cushion){let n=this.m(`cloth`);n.color($(this,e.cushion)),this.softCushion(n,t.move(0,.49,.01),.41000000000000003,.065,.41000000000000003,{bulge:.35,plan:5,tuft:!0,nu:24,nv:10})}this._collide(t,0,.45,0,.5,.9,.5,e)},bench(e){let t=this._F(e),n=e.len??1.6,r=e.h??.45,i=n/2;for(let e of[-.1,.1])this._lplank(t,[-i,r,e],[i,r,e],.19,.05,`beam`,.6);for(let e of[-i+.18,i-.18])this._lb(t,[e,0,-.16],[e,r-.05,-.08],.07,.07,`beam`),this._lb(t,[e,0,.16],[e,r-.05,.08],.07,.07,`beam`),this._lb(t,[e,r-.08,-.2],[e,r-.08,.2],.08,.06,`beam`);if(this._lb(t,[-i+.18,.18,0],[i-.18,.18,0],.05,.06,`beam`),e.back){for(let e of[-i+.18,i-.18])this._lb(t,[e,r-.02,-.22],[e,r+.45,-.3],.06,.06,`beam`);for(let e of[r+.22,r+.4])this._lplank(t,[-i,e,-.26-(e-r)*.12],[i,e,-.26-(e-r)*.12],.12,.03,`beam`,.5)}this._collide(t,0,r/2,0,n,r,.45,e)},sofa(e){let t=this._F(e),n=e.len??2,r=n/2;this._lb(t,[-r,.14,.395],[r,.14,.395],.05,.22),this._lb(t,[-r,.14,-.395],[r,.14,-.395],.05,.22);for(let e of[-r+.06,r-.06])this._lb(t,[e,.3,-.425],[e,.3,.425],.12,.6,`dark`,.02);let i=Math.round((n-.2)/.16);for(let e=0;e<i;e++){let a=-r+.1+(e+.5)*((n-.2)/i);this.plank(t.at(a,.26,-.425+.02),t.at(a,.26,.40499999999999997),{up:t.y,width:(n-.2)/i-.01,thick:.03,mat:`dark`,jitter:.4})}let a=this.m(`cloth`),o=$(this,e.color??`sand`);a.color(o);let s=n>1.6?2:1,c=(n-.26)/s;for(let e=0;e<s;e++){let n=-r+.13+(e+.5)*c;this.softCushion(a,t.move(n,.35,.06),c-.02,.17,.6499999999999999,{bulge:.22,u0:this.rng.next()}),this.softCushion(a,t.move(n,.61,-.275).rot(`x`,Math.PI/2-.22),c-.04,.18,.44,{bulge:.3,plan:5,u0:this.rng.next()})}(e.pillows??[`terracotta`,`indigo`]).forEach((e,n)=>{a.color($(this,e));let i=(n%2?1:-1)*(r-.32-Math.floor(n/2)*.38)+this.rng.jit(.05);this.softCushion(a,t.move(i,.57,-.425+.31+Math.floor(n/2)*.04).rot(`x`,Math.PI/2-.35).rot(`y`,this.rng.jit(.3)),.42,.14,.4,{kind:`pillow`})}),this._collide(t,0,.35,0,n,.7,.85,e)},rug(e){let t=this._F(e).move(0,.006,0),n=this.m(`rug`);n.color(e.tint??[1,1,1]);let r=e.w??2,i=e.l??1.4,a=2/r,o=1.4/i;if(e.round){let r=e.r??.8,i=[],a=[];for(let e=0;e<32;e++){let n=e/32*Math.PI*2,o=Math.cos(n)*r,s=Math.sin(n)*r;i.push(t.at(o,.008,s)),a.push([(o/(2*r)+.5)*2,(s/(2*r)+.5)*1.4])}n.face(i,t.y,a);return}let s=[[-r/2,-i/2],[r/2,-i/2],[r/2,i/2],[-r/2,i/2]];n.face(s.map(([e,n])=>t.at(e,.008,n)),t.y,s.map(([e,t])=>[(e+r/2)*a,(t+i/2)*o]));for(let e=0;e<4;e++){let[r,i]=s[e],[a,o]=s[(e+1)%4],c=[t.at(r,.008,i),t.at(a,.008,o),t.at(a,-.004,o),t.at(r,-.004,i)],l=S.norm(S.sub(t.at((r+a)/2,0,(i+o)/2),t.at(0,0,0)));n.face(c,l,[[0,0],[.01,0],[.01,.01],[0,.01]])}let c=this.m(`cloth`);c.color(Ye.cream);for(let e of[-r/2,r/2]){let n=Math.round(i/.05);for(let r=0;r<n;r++){let a=-i/2+(r+.5)*(i/n),o=Math.sign(e);c.face([t.at(e,.007,a-.012),t.at(e+o*.07,.004,a-.01),t.at(e+o*.07,.004,a+.01),t.at(e,.007,a+.012)],t.y)}}},shelves(e){let t=this._F(e),n=e.w??1,r=e.h??1.8,i=e.d??.32,a=n/2;for(let e of[-a,a])this.plank(t.at(e,0,0),t.at(e,r,0),{up:t.x,width:i,thick:.03,mat:`dark`,jitter:.2});let o=e.levels??4,s=this.rng;for(let n=0;n<o;n++){let c=.08+n/(o-1)*(r-.12);if(this._lplank(t,[-a,c,0],[a,c,0],i,.03,`dark`,.2),e.fill===!1||n===o-1)continue;let l=-a+.06;for(;l<a-.1;){let e=s.next();if(e<.45){let e=s.int(3,8),n=this.m(`cloth`);for(let r=0;r<e&&l<a-.05;r++){let e=.025+s.next()*.03,r=.18+s.next()*.1;n.color($(this,s.pick([`rust`,`indigo`,`olive`,`ochre`,`charcoal`,`terracotta`,`sand`])).map(e=>e*.8)),n.box(t.move(l+e/2,c+r/2+.001,s.jit(.02)).rot(`z`,s.jit(.04)),e,r,i*.7,{chamfer:.003}),l+=e+.002}l+=.05}else if(e<.8){let e=this.m(`stone`);e.color(Xe.map(e=>e*(.85+s.next()*.25)));let n=.045+s.next()*.04,r=.1+s.next()*.14;e.lathe(t.move(l+n,c+.001,0),[[0,0],[n*.7,0],[n,r*.3],[n*.95,r*.75],[n*.55,r*.9],[n*.6,r],[0,r]],12,{u0:s.next()}),l+=2*n+.05}else this.wickerBasket({pos:t.at(l+.09,c,0),r:.09,h:.12}),l+=.24}}let c=Math.round(n/.18);for(let e=0;e<c;e++){let o=-a+(e+.5)*(n/c);this.plank(t.at(o,0,-i/2),t.at(o,r,-i/2),{up:t.z,width:n/c-.006,thick:.015,mat:`plank`,jitter:.3})}this._collide(t,0,r/2,0,n,r,i,e)},wickerBasket(e){let t=A.yaw(e.pos,e.yaw??this.rng.next()*360),n=e.r??.18,r=e.h??.2,i=this.m(`wicker`);i.color(.95+this.rng.jit(.08)),i.lathe(t,[[0,.005],[n*.8,0],[n,r*.35],[n*1.05,r],[n*1.08,r+.012],[n*.99,r+.01],[n*.95,r*.4],[n*.75,.02],[0,.02]],16,{u0:this.rng.next()})},pottedPlant(e){let t=e.size??1,n=A.yaw(e.pos,e.yaw??this.rng.next()*360),r=this.m(`stone`);r.color(Xe);let i=.17*t,a=.32*t;r.lathe(n,[[0,0],[i*.7,0],[i*.95,a*.85],[i*1.12,a*.88],[i*1.12,a],[i*.98,a],[i*.92,a*.9]],18,{u0:this.rng.next()});let o=this.m(`bark`);o.color(.4),o.face(Array.from({length:14},(e,t)=>{let r=t/14*Math.PI*2;return n.at(Math.cos(r)*i*.92,a*.9,Math.sin(r)*i*.92)}),n.y);let s=this.m(`leaf`),c=this.rng,l=Math.round(9+5*t);for(let e=0;e<l;e++){let r=e/l*Math.PI*2+c.jit(.3),i=(.45+c.next()*.4)*t,o=(.05+c.next()*.03)*t,u=.35+c.next()*.7,d=.75+c.next()*.35,f=[.22*d,.45*d,.16*d],p=[];for(let e=0;e<=5;e++){let t=e/5,n=Math.sin(u)*i*t,s=Math.cos(u)*i*t-.55*i*t*t*Math.sin(u);p.push([Math.cos(r)*n,a*.9+s,Math.sin(r)*n,o*Math.sin(Math.PI*Math.min(1,t*1.1+.05))])}let m=[-Math.sin(r),0,Math.cos(r)];s.grid(1,5,(e,t,r)=>{let i=p[t],a=e===0?-1:1;r.p=n.at(i[0]+m[0]*i[3]*a,i[1],i[2]+m[2]*i[3]*a),r.n=n.vec(0,1,0),r.u=e*.1,r.v=t*.1,r.c=f})}},telescope(e){let t=this._F(e),n=[0,1.15,0];for(let e=0;e<3;e++){let r=e/3*Math.PI*2+.5;this.log(t.at(Math.cos(r)*.45,0,Math.sin(r)*.45),t.at(n[0],n[1],n[2]),.022,{mat:`dark`,segs:6})}let r=this.m(`metal`);r.color(Ze),r.ellipsoid(t.move(0,1.18,0),.05,.05,.05,10,6);let i=(e.pitch??28)*Math.PI/180,a=t.move(0,1.24,0).rot(`x`,-(Math.PI/2-i));r.lathe(a,[[0,-.45],[.03,-.45],[.03,-.36],[.042,-.34],[.042,.2],[.052,.22],[.056,.55],[.062,.58],[.062,.62],[0,.62]],16,{u0:this.rng.next()}),r.color(.2,.19,.18),r.lathe(a,[[0,.615],[.056,.615],[.056,.63],[0,.63]],16),this._collide(t,0,.6,0,.8,1.2,.8,e)},crate(e){let t=this._F(e),n=e.size??.6,r=e.h??n*.75,i=n/2;for(let[e,n]of[[-i,-i],[i,-i],[i,i],[-i,i]])this._lb(t,[e,0,n],[e,r,n],.045,.045,`beam`);for(let e=0;e<4;e++){let n=t.rot(`y`,e*Math.PI/2);for(let e=0;e<3;e++){let t=.06+(e+.5)*((r-.06)/3);this.plank(n.at(-i,t,i+.012),n.at(i,t,i+.012),{up:n.z,width:(r-.08)/3-.02,thick:.018,mat:`plank`,jitter:.6})}}for(let e=0;e<4;e++){let a=-i+(e+.5)*(n/4);this._lplank(t,[a,r+.015,-i],[a,r+.015,i],n/4-.015,.018,`plank`,.6)}this._collide(t,0,r/2,0,n+.04,r,n+.04,e)},jug(e){let t=e.size??1,n=A.yaw(e.pos,e.yaw??this.rng.next()*360),r=this.m(`stone`);r.color(Xe.map(e=>e*(.9+this.rng.next()*.2)));let i=[[0,0],[.06,0],[.11,.06],[.14,.17],[.13,.27],[.08,.34],[.05,.38],[.06,.43],[.055,.44],[.042,.405]].map(([e,n])=>[e*t,n*t]);r.lathe(n,i,18,{u0:this.rng.next()});let a=[];for(let e=0;e<=10;e++){let r=e/10,i=-.3+r*2.6;a.push(n.at((.12+Math.sin(i)*.1)*t,(.34-r*.14+Math.cos(i)*.02)*t,0))}r.tube(a,.014*t,6,{caps:!0})},daybed(e){let t=this._F(e),n=e.len??2,r=e.w??.95,i=n/2,a=r/2;for(let[e,n]of[[-a,-i],[a,-i],[-a,i],[a,i]])this._lb(t,[e,0,n],[e,.32,n],.08,.08,`beam`);for(let e of[-a,a])this._lb(t,[e,.26,-i],[e,.26,i],.05,.12,`beam`);let o=Math.round(n/.16);for(let e=0;e<o;e++){let r=-i+(e+.5)*(n/o);this._lplank(t,[-a-.03,.34,r],[a+.03,.34,r],n/o-.012,.03,`beam`,.6)}let s=this.m(`cloth`);s.color($(this,e.color??`cream`)),this.softCushion(s,t.move(0,.43,0),r-.04,.15,n-.06,{bulge:.14,plan:9,u0:this.rng.next()}),e.back&&(this.softCushion(s,t.move(0,.63,-i+.36).rot(`x`,.9),r-.1,.13,.62,{bulge:.25,plan:6}),this._lb(t,[-a,.35,-i+.05],[-a,.8,-i+.4],.05,.05,`beam`),this._lb(t,[a,.35,-i+.05],[a,.8,-i+.4],.05,.05,`beam`));for(let[n,r]of[[e.pillow??`terracotta`,-.18],[`ochre`,.2]]){s.color($(this,n));let a=e.back?t.move(r,.78,-i+.44).rot(`x`,.78):t.move(r,.6,-i+.3).rot(`x`,-.35);this.softCushion(s,a.rot(`y`,this.rng.jit(.25)),.42,.14,.36,{kind:`pillow`})}this._collide(t,0,.3,0,r+.1,.6,n+.1,e),e.foot!==!1&&this.footIfGround(e.pos[0],e.pos[1],e.pos[2],Math.max(n,r)*.6)},cushion(e){let t=A.yaw(e.pos,e.yaw??this.rng.next()*360),n=e.size??.6,r=this.m(`cloth`);r.color($(this,e.color??this.rng.pick([`terracotta`,`ochre`,`indigo`,`sage`,`rust`,`cream`]))),this.softCushion(r,t.move(0,.075,0),n,.15,n*(.94+this.rng.jit(.04)),{bulge:.4,plan:4.5,tuft:!0,u0:this.rng.next()})},firePit(e){let[t,n,r]=e.pos,i=e.r??.75,a=this.rng,o=this.m(`stone`),s=Math.round(2*Math.PI*i/.3);for(let e=0;e<s;e++){let c=e/s*Math.PI*2+a.jit(.08),l=i+a.jit(.04),u=A.yaw([t+Math.sin(c)*l,n+.02,r-Math.cos(c)*l],c*180/Math.PI+a.jit(20)),d=.72+a.next()*.25;o.color(d*1.02,d*.95,d*.86),o.ellipsoid(u,.13+a.next()*.05,.1+a.next()*.06,.12+a.next()*.05,9,6,{disp:I(a)})}o.color(.22,.21,.2),o.ellipsoid(A.yaw([t,n-.02,r],0),i*.9,.05,i*.9,18,5);let c=e.logs??4;for(let e=0;e<c;e++){let o=e/c*Math.PI*2+.4,s=[t+Math.sin(o)*i*.62,n+.05,r-Math.cos(o)*i*.62],l=[t-Math.sin(o)*.05,n+.25,r+Math.cos(o)*.05];this.log(s,l,.055+a.next()*.02,{mat:`bark`,segs:7,caps:!0,colorFn:(e,t,n)=>{let r=.25+.75*(1-t)*(1-t);n[0]=r,n[1]=r*.95,n[2]=r*.9}})}if(e.embers!==!1){let e=this.m(`glow`);for(let o=0;o<7;o++){let o=a.next()*Math.PI*2,s=a.next()*i*.4,c=1.2+a.next()*1.4;e.color(1*c,.32*c,.08*c),e.ellipsoid(A.yaw([t+Math.sin(o)*s,n+.03,r-Math.cos(o)*s],a.next()*360),.05,.025,.04,7,4)}}e.foot!==!1&&this.footCircle(t,r,i+.35),this.colCyl([t,n-.1,r],i+.15,.35,12,`solid`)}},{stairwellRailing(e,t,n={}){let r=t.hole,[i,a]=r.arc,[o,s]=e.center,c=r.r[1]+.06,l=r.r[0]+.02,u=(t,n)=>{let r=g(t);return[o+r[0]*n,e.y,s+r[1]*n]},d=Math.max(2,Math.ceil((a-i)*D*c/1.4)),f=[];for(let e=0;e<=d;e++)f.push(u(i+(a-i)*e/d,c));let p=t.dir>0,m=p?[u(i,l),u(i,c)]:[u(a,c),u(a,l)],h=p?[...m,...f.slice(1)]:[...f.slice(0,-1),...m];return this.railing(h,{maxSpacing:1.5,...n})}});var Qe=70;async function $e(e){let t=ce(e),n=[],r=null,i={ctx:e,layout:e.layout,hf:e.hf,materials:t,footprints:new W(8),instancer:null,groups:n,DYES:Ye,GLOW:X,Frame:A,Mesher:k,woodTint:M,v3:S,finalized:!1,group(e,t={}){let r=new U(i,e,t);return n.push(r),r},shared(){return r??=i.group(`kit.shared`)},addLantern(e){return(e.group??i.shared()).lantern(e)},tree(t){return typeof t==`string`?e.layout.getHeroTree(t)??e.layout.EXTRA_TREES.find(e=>e.id===t):t},trunkR(t,n){return e.layout.trunkRadiusAt(i.tree(t),n)},polar:v,compass:g,bearing:T,catenary:b,rng:e=>x(typeof e==`string`?E(e):e),blocked(e,t,n=0){return i.footprints.blocked(e,t,n)},clearance(e,t,n=6){return i.footprints.clearance(e,t,n)},finalize(){for(let e of n)(!e.finalized||e.buckets.size)&&e.finalize();i.finalized||(i.instancedMeshes=i.instancer.finalize(e.scene)),i.finalized=!0,i._detail=[];let t=e.params?.get?.(`archlegacy`)===`1`;for(let r of n)if(!(r.detailManaged||t))for(let t of r.meshes){if(!t.layers.isEnabled(e.LAYERS.NO_REFLECT)||t.userData.keepFar)continue;let n=t.geometry.boundingSphere;if(!n)continue;let r=Qe+n.radius;i._detail.push({m:t,x:n.center.x,y:n.center.y,z:n.center.z,r2:r*r,shown:!0})}let r=i.stats();return console.log(`[lagoon] arch-kit: ${r.groups} groups, ${r.meshes} meshes, ${r.tris} tris, ${r.instances} instances, ${r.footprints} footprints`),r},update(){let t=i._detail;if(!t||!t.length)return;let n=e.camera.position;for(let e=0;e<t.length;e++){let r=t[e],i=n.x-r.x,a=n.y-r.y,o=n.z-r.z,s=i*i+a*a+o*o<r.r2;s!==r.shown&&(r.shown=s,r.m.visible=s)}},stats(){let e=0,t=0;for(let r of n){e+=r.meshes.length;for(let e of r.meshes)t+=(e.geometry.index?.count??0)/3}return{groups:n.length,meshes:e,tris:t,instances:i.instancer.count(),footprints:i.footprints.list.length}}};return i.instancer=new Te(i),Ee(i.instancer),i}var et=e({build:()=>rt}),tt=[[`origin`,()=>h(()=>import(`./origin-MZAXedR9.js`),__vite__mapDeps([0,1,2,3]))],[`canopy`,()=>h(()=>import(`./canopy-BbfuMePA.js`),__vite__mapDeps([4,1,2,3]))],[`nest`,()=>h(()=>import(`./nest-DO6wsLt-.js`),__vite__mapDeps([5,1,2,6,7,8]))],[`perch`,()=>h(()=>import(`./perch-BLghb-Ow.js`),__vite__mapDeps([9,3,1,2,8,6,7]))],[`drifter`,()=>h(()=>import(`./drifter-BOshlbY_.js`),__vite__mapDeps([10,1,2,6,7,8]))],[`bridges`,()=>h(()=>import(`./bridges-B-ttb_DG.js`),__vite__mapDeps([11,1,2,12,13,6,7]))],[`boardwalks`,()=>h(()=>import(`./boardwalks-CMe3LciN.js`),__vite__mapDeps([14,1,2,6,7,12,13]))],[`gatherings`,()=>h(()=>import(`./gatherings-1iXgoKsd.js`),__vite__mapDeps([15,1,2,6,7,13]))],[`trails`,()=>h(()=>import(`./trails-BM7MUqCh.js`),__vite__mapDeps([16,17,18,7,19,20,2,21,1,6,13]))],[`_kitdemo`,()=>h(()=>import(`./_kitdemo-Bafs5GuI.js`),[]),{explicit:!0}]];function nt(e,t){console.error(`[lagoon] ${e}:`,t),window.__lagoon?.errors?.push({where:e,message:String(t?.stack||t)})}async function rt(e){let t=await $e(e),n=e.params.get(`arch`)?.split(`,`).map(e=>e.trim()),r={};for(let i=0;i<tt.length;i++){let[a,o,s]=tt[i];if((!n||n.includes(a))&&(!s?.explicit||n?.includes(a))){e.progress(i/tt.length,`Raising ${a}`);try{r[a]=await(await o()).build(e,t)??{},window.__lagoon&&(window.__lagoon.modules[`architecture/`+a]=`ok`)}catch(e){nt(`architecture/${a}`,e),window.__lagoon&&(window.__lagoon.modules[`architecture/`+a]=`error`)}await e.yieldFrame()}}try{await t.finalize?.()}catch(e){nt(`architecture/kit.finalize`,e)}e.progress(1);let i=Object.values(r).filter(e=>e.update);return{kit:t,parts:r,footprints:t.footprints.list,blocked:(e,n,r=0)=>t.footprints.blocked(e,n,r),clearance:(e,n,r=6)=>t.footprints.clearance(e,n,r),update(e,n){t.update?.(e,n);for(let t of i)t.update(e,n)}}}export{rt as build,M as i,X as n,I as r,et as t};