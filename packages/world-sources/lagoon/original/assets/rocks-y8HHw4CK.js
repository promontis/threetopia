import{$r as e,A as t,Ha as n,Ii as r,Rt as i,Va as a,Wi as o,Wr as s,_r as c,ft as l,io as u,ir as d,j as f,jt as p,mr as m,no as h,ro as g,x as _}from"./three.core-DtjtRha-.js";import{a as v,r as y,t as b}from"./noise-RmOKhMMB.js";import{o as x,t as S}from"./farfield-C_pc_rD2.js";import{o as C}from"./index-BjH0GYGf.js";var w=(e,t,n)=>{let r=Math.min(1,Math.max(0,(n-e)/(t-e)));return r*r*(3-2*r)};function T(e){let t=new Map,n=e.TERRAIN_LOD,r=(n,r,i)=>{let a=(n*8192+(r+4096))*8192+(i+4096),o=t.get(a);return o===void 0&&(o=e.latticeHeight(n,r,i),t.set(a,o)),o};return function(t,i){let a=e.lodLevelAt(t,i),o=n[a].step,s=t/o,c=i/o,l=Math.floor(s),u=Math.floor(c),d=s-l,f=c-u,p=r(a,l+1,u),m=r(a,l,u+1);if(d+f<=1){let e=r(a,l,u);return e+(p-e)*d+(m-e)*f}let h=r(a,l+1,u+1);return h+(m-h)*(1-d)+(p-h)*(1-f)}}function E(e,n=null){return new t(n||new Uint8Array(e*4),4,!0)}function D(e){let n=e.attributes.position.array,r=e.index.array,i=e.attributes.position.count,a=new Float32Array(i*3);for(let e=0;e<r.length;e+=3){let t=r[e]*3,i=r[e+1]*3,o=r[e+2]*3,s=n[i]-n[t],c=n[i+1]-n[t+1],l=n[i+2]-n[t+2],u=n[o]-n[t],d=n[o+1]-n[t+1],f=n[o+2]-n[t+2],p=c*f-l*d,m=l*u-s*f,h=s*d-c*u;a[t]+=p,a[t+1]+=m,a[t+2]+=h,a[i]+=p,a[i+1]+=m,a[i+2]+=h,a[o]+=p,a[o+1]+=m,a[o+2]+=h}for(let e=0;e<i*3;e+=3){let t=Math.hypot(a[e],a[e+1],a[e+2]);t>1e-12?(a[e]/=t,a[e+1]/=t,a[e+2]/=t):(a[e]=0,a[e+1]=1,a[e+2]=0)}return e.setAttribute(`normal`,new t(a,3)),a}function O(e,n=null,r=null,i=!1){i||D(e);let a=e.attributes.position.array,o=e.attributes.normal.array,s=e.index.array,c=e.attributes.position.count,l=new Float32Array(c*3),u=new Float32Array(c),d=0,f=0;for(let e=0;e<s.length;e+=3)for(let t=0;t<3;t++){let n=s[e+t],r=s[e+(t+1)%3];if(l[n*3]+=a[r*3],l[n*3+1]+=a[r*3+1],l[n*3+2]+=a[r*3+2],u[n]++,l[r*3]+=a[n*3],l[r*3+1]+=a[n*3+1],l[r*3+2]+=a[n*3+2],u[r]++,t===0&&f<1500){let e=Math.hypot(a[n*3]-a[r*3],a[n*3+1]-a[r*3+1],a[n*3+2]-a[r*3+2]);e>1e-5&&(d+=e,f++)}}let p=d/Math.max(1,f)||1,m=new Float32Array(c);for(let e=0;e<c;e++){let t=u[e]||1,i=l[e*3]/t-a[e*3],s=l[e*3+1]/t-a[e*3+1],c=l[e*3+2]/t-a[e*3+2],d=(i*o[e*3]+s*o[e*3+1]+c*o[e*3+2])/p,f=1-Math.max(0,d)*2.2+Math.max(0,-d)*.15;n&&(f*=1-.55*n[e]),f*=.72+.28*w(-.9,.2,o[e*3+1]),r&&(f*=r[e]),m[e]=Math.min(1,Math.max(.2,f))}let h=new Float32Array(c),g=new Float32Array(c);for(let e=0;e<s.length;e+=3){let t=s[e],n=s[e+1],r=s[e+2],i=(m[t]+m[n]+m[r])/3;h[t]+=i,h[n]+=i,h[r]+=i,g[t]++,g[n]++,g[r]++}let _=new Float32Array(c);for(let e=0;e<c;e++)_[e]=.5*m[e]+.5*(g[e]?h[e]/g[e]:m[e]);return e.setAttribute(`rockAO`,new t(_,1)),e}function k(e,n,r,i,a={}){let{wrap:o=!1,pole:s=null,poleC:c=null,colStep:l=1,outward:u=null}=a,d=a.rowSel||Array.from({length:i},(e,t)=>t),p=[];for(let e=0;e<r;e+=l)p.push(e);!o&&p[p.length-1]!==r-1&&p.push(r-1);let m=p.length,h=d.length,g=m*h+ +!!s,_=new Float32Array(g*3),v=new Uint8Array(g*4),y=a.groove?new Float32Array(g):null,b=a.aoMul?new Float32Array(g):null;for(let t=0;t<m;t++){let r=p[t];for(let o=0;o<h;o++){let s=r*i+d[o],c=t*h+o;_[c*3]=e[s*3],_[c*3+1]=e[s*3+1],_[c*3+2]=e[s*3+2],n&&(v[c*4]=n[s*4],v[c*4+1]=n[s*4+1],v[c*4+2]=n[s*4+2],v[c*4+3]=n[s*4+3]),y&&(y[c]=a.groove[s]),b&&(b[c]=a.aoMul[s])}}let x=m*h;s&&(_[x*3]=s[0],_[x*3+1]=s[1],_[x*3+2]=s[2],c&&(v[x*4]=c[0],v[x*4+1]=c[1],v[x*4+2]=c[2],v[x*4+3]=c[3]),y&&(y[x]=0),b&&(b[x]=1));let S=o?m:m-1,C=S*(h-1)*2+(s?S:0),w=g>65535?new Uint32Array(C*3):new Uint16Array(C*3),T=0;for(let e=0;e<S;e++){let t=(e+1)%m;for(let n=0;n<h-1;n++){let r=e*h+n,i=t*h+n,a=t*h+n+1,o=e*h+n+1,s=r*3,c=i*3,l=a*3,u=o*3,d=_[s]-_[l],f=_[s+1]-_[l+1],p=_[s+2]-_[l+2],m=_[c]-_[u],g=_[c+1]-_[u+1],v=_[c+2]-_[u+2];d*d+f*f+p*p<=m*m+g*g+v*v?(w[T++]=r,w[T++]=i,w[T++]=a,w[T++]=r,w[T++]=a,w[T++]=o):(w[T++]=r,w[T++]=i,w[T++]=o,w[T++]=i,w[T++]=a,w[T++]=o)}s&&(w[T++]=e*h+h-1,w[T++]=t*h+h-1,w[T++]=x)}let k=new f;k.setAttribute(`position`,new t(_,3)),k.setIndex(new t(w,1));let A=D(k);if(u){let e=0,t=Math.max(1,Math.floor(m/24));for(let n=0;n<m;n+=t){let t=n*h+Math.floor(h*.4),r=u(t,_);e+=A[t*3]*r[0]+A[t*3+1]*r[1]+A[t*3+2]*r[2]}if(e<0){for(let e=0;e<w.length;e+=3){let t=w[e+1];w[e+1]=w[e+2],w[e+2]=t}for(let e=0;e<A.length;e++)A[e]=-A[e]}}return O(k,y,b,!0),k.setAttribute(`color`,E(g,v)),k.computeBoundingBox(),k.computeBoundingSphere(),k}function A(e){let n=e.attributes.position.array,r=e.index.array,i=new Float32Array(r.length*3);for(let e=0;e<r.length;e++){let t=r[e]*3;i[e*3]=n[t],i[e*3+1]=n[t+1],i[e*3+2]=n[t+2]}let a=new f;return a.setAttribute(`position`,new t(i,3)),a}function j(e,t,n=null){let r=[];for(let i=0;i<e;i++)(i%t===0||i===e-1||n&&n[i])&&r.push(i);return r}var M=new Map;function N(e){if(M.has(e))return M.get(e);let t=(1+Math.sqrt(5))/2,n=[-1,t,0,1,t,0,-1,-t,0,1,-t,0,0,-1,t,0,1,t,0,-1,-t,0,1,-t,t,0,-1,t,0,1,-t,0,-1,-t,0,1],r=[0,11,5,0,5,1,0,1,7,0,7,10,0,10,11,1,5,9,5,11,4,11,10,2,10,7,6,7,1,8,3,9,4,3,4,2,3,2,6,3,6,8,3,8,9,4,9,5,2,4,11,6,2,10,8,6,7,9,8,1],i=[];for(let e=0;e<n.length;e+=3){let t=Math.hypot(n[e],n[e+1],n[e+2]);i.push(n[e]/t,n[e+1]/t,n[e+2]/t)}for(let t=0;t<e;t++){let e=new Map,t=(t,n)=>{let r=t<n?t*1048576+n:n*1048576+t,a=e.get(r);if(a!==void 0)return a;let o=i[t*3]+i[n*3],s=i[t*3+1]+i[n*3+1],c=i[t*3+2]+i[n*3+2],l=Math.hypot(o,s,c);return a=i.length/3,i.push(o/l,s/l,c/l),e.set(r,a),a},n=[];for(let e=0;e<r.length;e+=3){let i=r[e],a=r[e+1],o=r[e+2],s=t(i,a),c=t(a,o),l=t(o,i);n.push(i,s,l,a,c,s,o,l,c,s,c,l)}r=n}let a={pos:new Float32Array(i),index:r,count:i.length/3};return M.set(e,a),a}function P(e,t){let n=e()*2-1,r=e()*Math.PI*2,i=Math.sqrt(1-n*n);return t[0]=i*Math.cos(r),t[1]=n,t[2]=i*Math.sin(r),t}function F(e,t,n,r){let i=Math.hypot(e,t,n);return{nx:e/i,ny:t/i,nz:n/i,h:r}}var I=(e,t,n)=>t+(n-t)*e(),L={boulder(e){let t=[],n=7+Math.floor(e()*4),r=[0,0,0];for(let i=0;i<n;i++)P(e,r),r[1]*=.75,t.push(F(r[0],r[1],r[2],I(e,.74,.93)));return t.push(F(I(e,-.1,.1),-1,I(e,-.1,.1),I(e,.5,.62))),{axes:[1,I(e,.62,.8),I(e,.74,.95)],planes:t,k:I(e,.09,.14),cap:1.12,noise:{amp:.045,freq:1.1,oct:3,fine:.014,fineFreq:4.2},crack:{amp:I(e,.035,.05),freq:I(e,.8,1.05),width:.075,mask:.05,stretchY:1},strata:e()<.5?{amp:.012,freq:I(e,3.5,5),groove:.012,warp:.08,step:0,edgeW:.25}:null,flat:.5}},slab(e){let t=[],n=()=>I(e,-.22,.22);t.push(F(1,n(),n(),I(e,.62,.8)),F(-1,n(),n(),I(e,.62,.8))),t.push(F(n(),1,n(),I(e,.6,.72)),F(n(),-1,n(),I(e,.55,.7))),t.push(F(n(),n(),1,I(e,.62,.8)),F(n(),n(),-1,I(e,.62,.8)));let r=[0,0,0],i=3+Math.floor(e()*3);for(let n=0;n<i;n++)P(e,r),t.push(F(r[0],r[1],r[2],I(e,.62,.8)));return{axes:[1,I(e,.42,.6),I(e,.62,.85)],planes:t,k:I(e,.035,.055),cap:1.3,noise:{amp:.035,freq:1.3,oct:3,fine:.012,fineFreq:4.8},crack:{amp:.035,freq:I(e,.9,1.2),width:.07,mask:0,stretchY:1},strata:{amp:.024,freq:I(e,3.5,5),groove:.014,warp:.06,step:.6,edgeW:.2},flat:.62}},standing(e){let t=[],n=5+Math.floor(e()*3),r=e()*Math.PI*2;for(let i=0;i<n;i++){let a=r+i/n*Math.PI*2+I(e,-.3,.3);t.push(F(Math.cos(a),I(e,-.15,.25),Math.sin(a),I(e,.55,.75)))}return t.push(F(I(e,-.35,.35),1,I(e,-.35,.35),I(e,.84,.95))),t.push(F(0,-1,0,.9)),{axes:[I(e,.52,.68),1,I(e,.48,.62)],planes:t,k:I(e,.045,.07),cap:1.25,noise:{amp:.04,freq:1.2,oct:3,fine:.008,fineFreq:6},crack:{amp:.05,freq:1,width:.07,mask:-.05,stretchY:.2},strata:{amp:.035,freq:I(e,3.5,4.5),groove:.02,warp:.07,step:.7,edgeW:.22},flat:.9}},strata(e){let t=[],n=()=>I(e,-.08,.08);t.push(F(1,n(),n(),I(e,.82,.92)),F(-1,n(),n(),I(e,.82,.92))),t.push(F(n(),1,n(),.86),F(n(),-1,n(),.86)),t.push(F(n(),n(),1,I(e,.76,.86)),F(n(),n(),-1,I(e,.76,.86)));let r=3+Math.floor(e()*3);for(let n=0;n<r;n++){let n=e()*Math.PI*2;t.push(F(Math.cos(n),I(e,-.5,.5),Math.sin(n),I(e,.8,.9)))}return{axes:[1,I(e,.4,.5),I(e,.55,.7)],planes:t,k:I(e,.03,.045),cap:1.6,noise:{amp:.025,freq:1.4,oct:3,fine:.006,fineFreq:7},crack:{amp:.05,freq:I(e,.9,1.2),width:.06,mask:-.1,stretchY:.18},strata:{amp:.075,freq:I(e,6,8.5),groove:.018,warp:.04,step:.92,edgeW:.13},flat:0}},pebble(e){let t=[],n=[0,0,0],r=3+Math.floor(e()*3);for(let i=0;i<r;i++)P(e,n),t.push(F(n[0],n[1]*.6,n[2],I(e,.75,.9)));return{axes:[1,I(e,.5,.66),I(e,.7,.9)],planes:t,k:.24,cap:1,noise:{amp:.05,freq:1.2,oct:3,fine:.01,fineFreq:5},crack:null,strata:null,flat:.55}}},R={boulder:{variants:4,lods:[5,4,3,2]},slab:{variants:3,lods:[5,4,3,2]},standing:{variants:2,lods:[4,4,3,2]},strata:{variants:3,lods:[4,4,3,2]},pebble:{variants:2,lods:[3,3,2,1]}};function ee(e,t,n){let r=Math.min(1,Math.max(0,(n-e)/(t-e)));return r*r*(3-2*r)}function z(e,t,n,r,i){let a=0,o=1,s=1,c=0;for(let l=0;l<i;l++)a+=o*e.noise3(t*s,n*s,r*s),c+=o,o*=.5,s*=2.03;return a/c}function te(e,t,n,r,i){let a=e.planes,o=e.k,s=e.cap??1,c=s,l=e._ts,u=0;for(let e=0;e<a.length;e++){let i=a[e],o=t*i.nx+n*i.ny+r*i.nz;if(o>.001){let e=i.h/o;l[u++]=e,e<c&&(c=e)}}let d=Math.exp(-(s-c)/o);for(let e=0;e<u;e++)d+=Math.exp(-(l[e]-c)/o);let f=c-o*Math.log(d),p=e.axes,m=t*f*p[0],h=n*f*p[1],g=r*f*p[2],_=Math.hypot(m,h,g)||1,v=m/_,y=h/_,b=g/_,x=e._off[0],S=e._off[1],C=e._off[2],w=e.noise,T=w.amp*z(e.N,m*w.freq+x,h*w.freq+S,g*w.freq+C,w.oct);T+=w.fine*z(e.N2,m*w.fineFreq,h*w.fineFreq,g*w.fineFreq,2);let E=0,D=e.crack;if(D){let t=D.freq,n=e.N3.noise3(m*t+11.3,h*t*D.stretchY-4.1,g*t+7.7),r=1-ee(0,D.width,Math.abs(n)),i=ee(D.mask-.15,D.mask+.15,e.N3.noise3(m*.6-3,h*.6+5,g*.6+1));E=r*r*i,T-=D.amp*E}m+=v*T,h+=y*T,g+=b*T;let O=e.strata;if(O){let t=O.warp*e.N2.noise3(m*1.3+3.1,h*.4,g*1.3-2.2),n=(h+t)*O.freq+.8*e.N.noise3(3.7,h*O.freq*.35,1.9)+e._strataOff,r=Math.floor(n),i=n-r,a=(Math.imul(r+7919,2654435761)>>>0)%1e3/1e3;a=O.step*a+(1-O.step)*.5;let o=1-ee(0,O.edgeW,i),s=O.amp*a+O.groove*o;E=Math.max(E,o*.7);let c=Math.hypot(m,g);if(c>.001){let e=Math.max(.2,1-s/Math.max(c,.25));m*=e,g*=e}}if(e.flat>0){let t=-p[1]*e.flat;h<t&&(h=t+(h-t)*.28)}return i[0]=m,i[1]=h,i[2]=g,E}function ne(e,t){let n=N(t),r=n.count,i=new Float32Array(r*3),a=new Float32Array(r),o=[0,0,0];for(let t=0;t<r;t++)a[t]=te(e,n.pos[t*3],n.pos[t*3+1],n.pos[t*3+2],o),i[t*3]=o[0],i[t*3+1]=o[1],i[t*3+2]=o[2];return{pos:i,groove:a}}function re(e,r){let i=N(r),o=i.count,s=new f;return s.setAttribute(`position`,new t(e.pos.slice(0,o*3),3)),s.setIndex(o>65535?new n(i.index,1):new a(i.index,1)),O(s,e.groove.subarray(0,o)),s.setAttribute(`color`,E(o)),s.computeBoundingBox(),s.computeBoundingSphere(),s}async function ie(e=4242,t=null,n=null){let r=[],i={},a=Object.keys(R),o=a.reduce((e,t)=>e+R[t].variants,0),s=0;for(let c=0;c<a.length;c++){let l=a[c],u=R[l];i[l]=[];for(let a=0;a<u.variants;a++){let d=e+c*1009+a*131,f=v(d),p=L[l](f);p.N=new b(d+1),p.N2=new b(d+2),p.N3=new b(d+3),p._ts=new Float64Array(p.planes.length),p._off=[f()*50,f()*50,f()*50],p._strataOff=f()*10;let m=ne(p,Math.max(...u.lods,2)),h=new Map,g=e=>(h.has(e)||h.set(e,re(m,e)),h.get(e)),_=u.lods.map(g),y={1:g(1),2:g(2)},x={1:A(y[1]),2:A(y[2])},S=_[0].boundingBox.clone(),C={family:l,index:r.length,params:p,lods:_,proxy:y,proxyPos:x,hull:y[2].attributes.position.array,bbox:S};i[l].push(C.index),r.push(C),s++,n?.(s/o),t&&s%4==0&&await t()}}return{variants:r,byFamily:i}}var B=8,ae=(e,t)=>(e+4096)*8192+(t+4096),oe=new g,V=new g,H=new g,U=new r,se=class{constructor(e){this.recs=[],this.map=new Map,this.stamp=1,this.bvh=e.variants.map(e=>{let t=e.family===`pebble`?e.lods[1]:e.lods[2],n=new f;return n.setAttribute(`position`,t.attributes.position.clone()),n.setIndex(t.index.clone()),new C(n)})}addShape(e){let t=new f;return t.setAttribute(`position`,e.attributes.position.clone()),t.setIndex(e.index.clone()),this.bvh.push(new C(t)),this.bvh.length-1}add(e){e._q=0,this.recs.push(e);let t=e.radius,n=Math.floor((e.x-t)/B),r=Math.floor((e.x+t)/B),i=Math.floor((e.z-t)/B),a=Math.floor((e.z+t)/B);for(let t=n;t<=r;t++)for(let n=i;n<=a;n++){let r=ae(t,n),i=this.map.get(r);i||(i=[],this.map.set(r,i)),i.push(e)}}_visit(e,t,n,r){let i=++this.stamp,a=Math.floor((e-n)/B),o=Math.floor((e+n)/B),s=Math.floor((t-n)/B),c=Math.floor((t+n)/B);for(let e=a;e<=o;e++)for(let t=s;t<=c;t++){let n=this.map.get(ae(e,t));if(n)for(let e=0;e<n.length;e++){let t=n[e];if(t._q!==i&&(t._q=i,r(t)))return!0}}return!1}hitRec(e,t,n){oe.set(t,e.top+1,n).applyMatrix4(e.inv),V.set(t,e.bottom-1,n).applyMatrix4(e.inv),U.origin.copy(oe),U.direction.subVectors(V,oe).normalize();let r=this.bvh[e.vi].raycastFirst(U,2);return r?(H.copy(r.point).applyMatrix4(e.matrix),H.y):null}raycastDown(e,t){let n=null;return this._visit(e,t,0,r=>{let i=e-r.x,a=t-r.z;if(i*i+a*a>r.radius*r.radius||n!==null&&r.top<=n)return!1;let o=this.hitRec(r,e,t);return o!==null&&(n===null||o>n)&&(n=o),!1}),n}isRock(e,t,n=0){return this._visit(e,t,n,r=>{let i=e-r.x,a=t-r.z,o=Math.sqrt(i*i+a*a);if(o>r.radius+n)return!1;if(o<r.core+n)return!0;let s=o>1e-6?Math.min(n,o)/o:0;return this.hitRec(r,e-i*s,t-a*s)!==null})}near(e,t,n,r=[]){return r.length=0,this._visit(e,t,n,i=>{let a=e-i.x,o=t-i.z,s=n+i.radius;return a*a+o*o<=s*s&&r.push(i),!1}),r}},W=Math.PI/180,G=Math.PI*2,ce=(e,t,n)=>{let r=Math.min(1,Math.max(0,(n-e)/(t-e)));return r*r*(3-2*r)},le=(e,t,n)=>e<t?t:e>n?n:e,ue=(e,t)=>(Math.atan2(e,-t)/W+360)%360,de=(e,t)=>(e-t+540)%360-180;function fe(e,t,n,r,i,a){let o=i-n,s=a-r,c=o*o+s*s,l=c>0?le(((e-n)*o+(t-r)*s)/c,0,1):0;return{d:Math.hypot(n+o*l-e,r+s*l-t),t:l}}function pe(e,t,n){let r=1e9;for(let i=0;i<n.length-1;i++)r=Math.min(r,fe(e,t,n[i][0],n[i][1],n[i+1][0],n[i+1][1]).d);return r}var me=new d,he=new s,ge=new p,_e=new g,ve=new g,ye=class{constructor(e,t,n,r={}){this.ctx=e,this.esc=r.escarpment||null,this.formations=r.formations||[],this.L=e.layout,this.hf=e.hf,this.lib=t,this.index=n,this.recs=[],this.noise=new b(9091),this._near=[],this._setupConstraints()}_setupConstraints(){let{L:e,hf:t}=this;this.trees=[];for(let t of e.HERO_TREES)this.trees.push({...t,hero:!0,Rt:e.trunkRadiusAt(t,t.groundY)});for(let n of e.EXTRA_TREES){let r=t.heightAt(n.x,n.z),i={...n,groundY:r,hero:!1};i.Rt=e.trunkRadiusAt(i,r),this.trees.push(i)}this.stairs=[];for(let t of e.HOUSES){if(!t.tree||!t.stairs)continue;let n=this.trees.find(e=>e.id===t.tree);if(n)for(let r of t.stairs){if(r.from!==`ground`)continue;let t=e.ISLANDS.find(e=>Math.hypot(e.x-n.x,e.z-n.z)<1);this.stairs.push({tx:n.x,tz:n.z,Rt:n.Rt,start:r.startDeg,dir:r.dir||1,reach:(t?t.r:8)+5})}}this.zones=[];let n=e.HOUSES.find(e=>e.kind===`overwater`);n&&this.zones.push({x:n.x,z:n.z,r:(n.deckR||6)+2.5});for(let t of e.GATHERINGS)this.zones.push({x:t.x,z:t.z,r:t.kind===`linenLounge`?8:t.kind===`firepit`?6.5:4.5});for(let t of e.BOARDWALKS){let e=t.path[0],n=t.path[t.path.length-1];this.zones.push({x:e[0],z:e[1],r:2.4},{x:n[0],z:n[1],r:t.platformEnd?t.platformEnd.r+1.4:2.8})}this.zones.push({x:e.PLAYER.spawn.x,z:e.PLAYER.spawn.z,r:3.6});for(let n of Object.values(e.VIEWS)){let r=t.heightAt(n.pos[0],n.pos[2]);(n.eye?n.pos[1]===0?r:n.pos[1]:n.pos[1]-1.7)-Math.max(r,e.WATER_Y)<2.5&&this.zones.push({x:n.pos[0],z:n.pos[2],r:n.eye?2.2:3.5})}this.bridges=e.BRIDGES,this.fallsBands=e.WATERFALLS.map(e=>({x:e.lip[0],hw:e.width/2+1.5,z0:e.lip[2]-1.5,z1:e.pool[2]+(e.plungeR||4)})),this.houseRings=[];for(let t of e.HOUSES){let e=t.tree&&this.trees.find(e=>e.id===t.tree);if(!e||!t.levels?.length)continue;let n=t.levels.reduce((e,t)=>t.y<e.y?t:e),r=Math.max(...t.levels.map(e=>e.outer||0));this.houseRings.push({x:e.x,z:e.z,y:n.y,outer:r})}}blocked(e,t,n,r={}){let{hf:i}=this;if(!r.noPaths&&i.distToPaths(e,t)-n*.85<.45)return!0;if(!r.noZones){for(let r of this.zones)if(Math.hypot(e-r.x,t-r.z)<r.r+n*.8)return!0}if(!r.noTrunks){for(let r of this.trees)if(Math.hypot(e-r.x,t-r.z)-n*.45<r.Rt*.86)return!0}if(!r.noStairs)for(let r of this.stairs){let i=e-r.tx,a=t-r.tz,o=r.start*W,s=Math.sin(o),c=-Math.cos(o),l=i*s+a*c,u=Math.abs(i*c-a*s);if(l>r.Rt-2&&l<r.reach&&u<1.35+n*.9)return!0;let d=Math.hypot(i,a),f=de(ue(i,a),r.start)*r.dir;if(f>-20&&f<55&&d<r.Rt+2.8+n*.6)return!0}if(!r.noFalls){for(let r of this.fallsBands)if(Math.abs(e-r.x)<r.hw+n&&t>r.z0-n&&t<r.z1+n)return!0;for(let r of this.L.WATERFALLS)if(pe(e,t,r.stream)<1.4+n*.8)return!0}return!1}crowded(e,t,n,r=.62){let i=this.index.near(e,t,n,this._near);for(let a of i)if(!a.unique&&Math.hypot(e-a.x,t-a.z)<(n+a.radius)*r)return!0;return!1}mossAt(e,t,n){let r=0;for(let n of this.trees){let i=Math.hypot(e-n.x,t-n.z),a=1-ce(n.Rt,n.Rt+(n.crown||10)*.65,i);r=Math.max(r,a*(n.hero?.7:.55))}let i=this.hf.waterSDF(e,t);return r=Math.max(r,(1-ce(0,7,i))*.45),n>3.5&&(r*=.6),le(r,0,1)}dustAt(e,t){let n=this.hf.waterSDF(e,t);return n<0?.1:le(.25+ce(1.5,30,n)*.6,0,.9)}pickVariant(e,t){let n=this.lib.byFamily[e];return n[Math.min(n.length-1,Math.floor(t*n.length))]}add(e,t,n,r,i){let a=i.rng,o=i.vi??this.pickVariant(e,a()),s=this.lib.variants[o],c=s.bbox,l=(c.max.x-c.min.x)/2,u=(c.max.y-c.min.y)/2,f=(c.max.z-c.min.z)/2,p,m,h;if(i.size)p=i.size[0]/l,m=i.size[1]/u,h=i.size[2]/f;else{let e=r/Math.max(l,f);p=e*(.9+.2*a()),h=e*(.9+.2*a()),m=e*(i.flat??1)*(.88+.24*a())}let g=i.yaw??a()*G,_=i.tilt??.12,v=i.tiltX??(a()*2-1)*_,y=i.tiltZ??(a()*2-1)*_;ge.set(v,g,y,`YXZ`),he.setFromEuler(ge),_e.set(p,m,h),me.compose(ve.set(0,0,0),he,_e);let b=s.hull,x=me.elements,S=1e9,C=-1e9,w=0,T=i.allowFalls?null:this.fallsBands,E=!1;for(let e=0;e<b.length;e+=3){let r=b[e],i=b[e+1],a=b[e+2],o=x[0]*r+x[4]*i+x[8]*a,s=x[1]*r+x[5]*i+x[9]*a,c=x[2]*r+x[6]*i+x[10]*a;s<S&&(S=s),s>C&&(C=s);let l=o*o+c*c;if(l>w&&(w=l),T)for(let e of T)Math.abs(t+o-e.x)<e.hw&&n+c>e.z0&&n+c<e.z1&&(E=!0)}if(E)return null;let D=Math.sqrt(w),O=C-S,{hf:k}=this,A=k.groundHeight(t,n),j=A,M=D*.72;for(let e=0;e<8;e++){let r=e/8*G;j=Math.min(j,k.groundHeight(t+Math.cos(r)*M,n+Math.sin(r)*M))}let N=i.mode??`ground`,P=i.sink??.28,F;if(N===`fixed`)F=i.y;else if(N===`top`)F=i.top-C;else if(N===`rocks`){let e=-1e9,r=D*.4;for(let i=0;i<5;i++){let a=i===0?t:t+Math.cos(i*1.5708)*r,o=i===0?n:n+Math.sin(i*1.5708)*r,s=this.index.raycastDown(a,o);s!==null&&s>e&&(e=s)}F=Math.max(j,e-O*.18)-S-O*.1}else F=(i.base??j)-S-P*O;ve.set(t,F,n);let I=new d().compose(ve,he,_e),L={kind:e,group:i.group||`misc`,vi:o,x:t,y:F,z:n,radius:D,core:.5*Math.min(p*l,h*f),top:F+C,bottom:F+S,height:F+C-A,groundY:A,submerged:F+C<this.L.WATER_Y,matrix:I,inv:I.clone().invert(),big:i.big??(D>=.5&&e!==`pebble`),collide:i.collide??D>=.22,proxyDetail:D>3||D>1.1&&i.group!==`desert`&&i.group!==`outcrop`?2:1,tint:i.tint??.86+.24*a(),warmth:i.warmth??a()*1.45-.8,cliffBlend:i.cliffBlend??{boulder:.4,slab:.5,standing:.7,strata:1,pebble:.2}[e],seed:a(),moss:i.moss??this.mossAt(t,n,F+C),wetBoost:i.wetBoost??0,varnish:i.varnish??{boulder:.2,slab:.35,standing:.6,strata:.85,pebble:.05}[e],dust:i.dust??this.dustAt(t,n),band:i.band??{boulder:.12,slab:.2,standing:.3,strata:.3,pebble:.08}[e],lichen:i.lichen??.4};return!i.noBridgeCheck&&(!this.bridgeClear(L)||!this.houseClear(L))?null:(!L.big&&e!==`boulder`&&e!==`slab`&&e!==`pebble`&&(L.big=!0),this.index.add(L),this.recs.push(L),L)}bridgeClear(e){for(let t of this.bridges){let{d:n,t:r}=fe(e.x,e.z,t.a[0],t.a[2],t.b[0],t.b[2]);if(n<e.radius+t.width/2+.8){let n=t.a[1]+(t.b[1]-t.a[1])*r-t.sag*4*r*(1-r);if(e.top>n-2.4)return!1}}return!0}houseClear(e){for(let t of this.houseRings)if(Math.hypot(e.x-t.x,e.z-t.z)-e.radius*.5<t.outer+1&&e.top>t.y-2.5)return!1;return!0}waterlineR(e,t){let n=t*W,r=Math.sin(n),i=-Math.cos(n),a=.3,o=this.hf.heightAt;for(;a<e.r*2.2&&o(e.x+r*a,e.z+i*a)>this.L.WATER_Y;)a+=.25;let s=a-.25,c=a;for(let t=0;t<6;t++){let t=(s+c)/2;o(e.x+r*t,e.z+i*t)>this.L.WATER_Y?s=t:c=t}return(s+c)/2}heroPiles(){let{L:e}=this;for(let t of this.trees.filter(e=>e.hero)){let n=v(1e3+t.seed*17),r=t.r0/3,i=e.ISLANDS.find(e=>Math.hypot(e.x-t.x,e.z-t.z)<1),a=[],o=t.Rt+1.2,s=(1.7*r+1.1)/o;for(let e=n()*s;e<G;e+=s*(.8+.45*n())){if(n()>.9)continue;let i=(1.2+1.6*n())*(.42+.58*r),o=t.Rt+i*(.45+.25*n())+n()*.5,c=t.x+Math.sin(e)*o,l=t.z-Math.cos(e)*o;if(this.blocked(c,l,i,{noTrunks:!0})||this.crowded(c,l,i,.5))continue;let u=n()<.72?`boulder`:`slab`,d=.22+.12*n(),f=u===`boulder`?.95:.85,p=this.add(u,c,l,i,{rng:n,group:`heroPile`,sink:d,tilt:.2,flat:f})||this.add(u,c,l,i*.9,{rng:n,group:`heroPile`,sink:d+.1,tilt:.12,flat:f*.7});if(p&&(a.push(p),n()<.6*r+.15)){let r=e+(n()-.5)*s,a=i*(.5+.3*n()),c=o+i*.85+a*.6,l=t.x+Math.sin(r)*c,u=t.z-Math.cos(r)*c;!this.blocked(l,u,a)&&!this.crowded(l,u,a,.55)&&this.add(n()<.65?`boulder`:`slab`,l,u,a,{rng:n,group:`heroPile`,sink:.25+.12*n(),tilt:.25})}}if(r>.7){let e=Math.round(4+5*r);for(let r=0;r<e&&a.length>2;r++){let e=a[Math.floor(n()*a.length)],r=null,i=1e9;for(let t of a){if(t===e)continue;let n=Math.hypot(t.x-e.x,t.z-e.z);n<i&&(i=n,r=t)}if(!r||i>(e.radius+r.radius)*1.6)continue;let o=(e.x+r.x)/2-t.x,s=(e.z+r.z)/2-t.z,c=Math.hypot(o,s)||1,l=t.x+o/c*(c+.3),u=t.z+s/c*(c+.3),d=Math.min(e.radius,r.radius)*(.55+.25*n());this.blocked(l,u,d,{noTrunks:!0})||this.add(`boulder`,l,u,d,{rng:n,group:`heroPile`,mode:`rocks`,tilt:.3})}}if(i){let e=Math.round(10+22*r*i.rocky);for(let a=0;a<e;a++){let e=n()*360,a=this.waterlineR(i,e),o=t.Rt+2.2+(a+1.2-t.Rt-2.2)*Math.sqrt(n()),s=e*W,c=t.x+Math.sin(s)*o,l=t.z-Math.cos(s)*o,u=(n()<.3?.8+.8*n():.4+.45*n())*(.55+.45*r);if(this.blocked(c,l,u)||this.crowded(c,l,u,.7))continue;let d=n()<.6?`boulder`:`slab`;this.add(d,c,l,u,{rng:n,group:`heroPile`,sink:.25+.15*n(),tilt:.25})}let a=Math.round(14+16*r);for(let e=0;e<a;e++){let e=n()*360,r=t.Rt+.6+(this.waterlineR(i,e)+.5-t.Rt)*n(),a=e*W,o=t.x+Math.sin(a)*r,s=t.z-Math.cos(a)*r,c=.12+.22*n();this.blocked(o,s,c)||this.add(n()<.5?`pebble`:`boulder`,o,s,c,{rng:n,group:`heroPile`,sink:.35,tilt:.4,big:!1})}}}}extraTreePiles(){for(let e of this.trees.filter(e=>!e.hero)){let t=v(2e3+e.seed*13),n=3+Math.floor(t()*3),r=t()*G;for(let i=0;i<n;i++){let a=r+i/n*G+(t()-.5)*.9,o=.5+.6*t(),s=e.Rt+o*.5+t()*.8,c=e.x+Math.sin(a)*s,l=e.z-Math.cos(a)*s;this.blocked(c,l,o,{noTrunks:!0})||this.add(t()<.7?`boulder`:`slab`,c,l,o,{rng:t,group:`treeBase`,sink:.3,tilt:.2})}}}islets(){for(let e of this.L.ISLANDS.filter(e=>e.id.startsWith(`islet`))){let t=v(3e3+Math.round(e.x*31+e.z*7)),n=t()<.55?`boulder`:`slab`;this.add(n,e.x+(t()-.5)*.6,e.z+(t()-.5)*.6,e.r*(.7+.12*t()),{rng:t,group:`islet`,sink:.18,tilt:.15,flat:.9,noBridgeCheck:!1});let r=3+Math.floor(t()*3),i=t()*G;for(let n=0;n<r;n++){let a=i+n/r*G+(t()-.5)*.8,o=e.r*(.85+.45*t()),s=.35+.55*t(),c=e.x+Math.sin(a)*o,l=e.z-Math.cos(a)*o;this.blocked(c,l,s)||this.add(t()<.6?`boulder`:`slab`,c,l,s,{rng:t,group:`islet`,sink:.3,tilt:.3})}for(let n=0;n<4;n++){let n=t()*G,r=e.r*(1+.8*t()),i=e.x+Math.sin(n)*r,a=e.z-Math.cos(n)*r;this.add(`pebble`,i,a,.15+.2*t(),{rng:t,group:`islet`,sink:.3,tilt:.4,big:!1})}}}islandRims(){for(let e of this.L.ISLANDS.filter(e=>!e.id.startsWith(`islet`))){let t=v(4e3+Math.round(e.x*13+e.z*29)),n=G*e.r,r=Math.round(n/1.9);for(let n=0;n<r;n++){let i=n/r*360+(t()-.5)*(300/r),a=this.noise.noise2(Math.cos(i*W)*1.6+e.x,Math.sin(i*W)*1.6+e.z)*.5+.5;if(t()>e.rocky*(.25+.7*a))continue;let o=this.waterlineR(e,i)+(t()-.62)*1.8,s=i*W,c=e.x+Math.sin(s)*o,l=e.z-Math.cos(s)*o,u=t()<.25?.9+.8*t():.4+.55*t();if(this.blocked(c,l,u)||this.crowded(c,l,u,.6))continue;let d=t()<.55?`boulder`:`slab`;if(this.add(d,c,l,u,{rng:t,group:`islandRim`,sink:.25+.15*t(),tilt:.25}),t()<.5){let n=s+(t()-.5)*.4,r=o+(t()-.3)*1.5;this.add(`pebble`,e.x+Math.sin(n)*r,e.z-Math.cos(n)*r,.12+.2*t(),{rng:t,group:`islandRim`,sink:.3,tilt:.4,big:!1})}}}}cliff(){let e=this.esc?.foot;if(!e||!e.length)return;let t=v(5151),n=t=>{let n=0,r=e.length-1;for(;n<r;){let i=n+r>>1;e[i].x<t?n=i+1:r=i}return e[n]},r={varnish:.65,dust:.6,cliffBlend:.8,lichen:.5,band:.28},i=e[0].x+t()*3,a=e[e.length-1].x;for(;i<a;){let e=n(i),a=e.gully>.3?1.4+1.4*t():2+3.4*t();if(i+=a,e.buried>.6||Math.abs(e.x-i)>3)continue;let o=n(e.x-2),s=n(e.x+2),c=(s.z-o.z)/Math.max(.5,s.x-o.x),l=Math.hypot(c,1),u=-c/l,d=1/l;if(e.H<3){if(t()<.45){let n=.8+1*t(),i=e.x+u*(.6+n*.5),a=e.z+d*(.6+n*.5);!this.blocked(i,a,n)&&!this.crowded(i,a,n,.6)&&this.add(t()<.6?`slab`:`strata`,i,a,n,{rng:t,group:`talus`,sink:.3,tilt:.25,...r})}continue}let f=e.gully>.3,p=f?4+Math.floor(t()*3):2+Math.floor(t()*2.4);for(let n=0;n<p;n++){let i=n===0&&t()<.75,a=i?.9+1.7*t()*(.5+.5*t())+(f?.3:0):.35+.8*t()*t(),o=(i?.2+1.2*t():.4+5.5*t()*t())+a*.55,s=(t()-.5)*(f?2.6:2),c=e.x+s*d+u*o,l=e.z-s*u+d*o;if(this.blocked(c,l,a)||this.crowded(c,l,a,.45))continue;let p=t(),m=i?p<.55?`strata`:p<.85?`slab`:`boulder`:p<.5?`slab`:p<.8?`boulder`:`strata`;this.add(m,c,l,a,{rng:t,group:`talus`,sink:.18+.15*t(),tilt:i?.5:.4,...r,mode:i?`ground`:`rocks`,warmth:t()*1.2-.5})}if(t()<.22){let n=.7+1.1*t(),r=e.x+(t()-.5)*3,i=e.zTop-1.2-t()*5;this.blocked(r,i,n)||this.add(t()<.5?`boulder`:`slab`,r,i,n,{rng:t,group:`plateau`,sink:.3,tilt:.2,collide:!1,varnish:.5,dust:.8})}}}falls(){let{L:e,hf:t}=this;for(let n of e.WATERFALLS){let e=v(6e3+Math.round(n.lip[0]*11)),r=n.width>3,[i,a,o]=n.lip;for(let a of[-1,1]){let s=r?2.1+.6*e():1.4+.45*e(),c=e()<.6?`strata`:`slab`,l=i+a*(n.width/2+s*.95+.35),u=o-.9-e()*.8,d=t.groundHeight(l,u-1.2),f=((r?1.6:1.2)+.8*e()+1)/2,p=[s,f,s*(.75+.15*e())];this.add(c,l,u,s,{rng:e,group:`fallsFrame`,size:p,yaw:a*.3+(e()-.5)*.5,tilt:.06,base:d,sink:1/(2*f),wetBoost:1.2,moss:.55,varnish:.6,noBridgeCheck:!0,collide:!0,allowFalls:!0});let m=r?1+.5*e():.7+.35*e(),h=l+a*(s+m*.4),g=u-1.5-e()*1.5;this.add(`boulder`,h,g,m,{rng:e,group:`fallsFrame`,sink:.25,tilt:.2,moss:.5,wetBoost:.6,noBridgeCheck:!0});for(let t=0;t<3;t++){let r=.3+.22*t+.1*e(),i=n.stream,o=i[i.length-2],s=i[i.length-1],c=s[0]+(o[0]-s[0])*r,l=s[1]+(o[1]-s[1])*r,u=o[0]-s[0],d=o[1]-s[1],f=Math.hypot(u,d)||1,p=-d/f*a,m=u/f*a,h=.45+.5*e(),g=1.7+h*.7+e()*.8;this.add(e()<.6?`boulder`:`slab`,c+p*g,l+m*g,h,{rng:e,group:`stream`,sink:.3,tilt:.25,moss:.7,wetBoost:.35,noBridgeCheck:!0})}}let[,,s]=n.pool,c=n.plungeR||4,l=n.width/2+1.5;for(let t of[-1,1]){let n=r?3:2;for(let a=0;a<n;a++){let o=(r?.65:.5)+.75*e(),u=i+t*(l+o*.9+.15+.9*e()),d=s-c*.7+a/Math.max(1,n-1)*c*1.1+(e()-.5)*1.2;this.hf.heightAt(u,d)>1.2||this.blocked(u,d,o,{noFalls:!0,noPaths:!1})||this.crowded(u,d,o,.6)||this.add(e()<.65?`boulder`:`slab`,u,d,o,{rng:e,group:`plungePool`,sink:.25,tilt:.3,wetBoost:1.6+e(),moss:.85,dust:0,lichen:.2})}}}}shoreClusters(){let{hf:e,L:t}=this,n=[],r=1.5;for(let i=-100;i<=96;i+=r)for(let a=-48;a<=46;a+=r){let o=e.heightAt(i,a);if(o<0||o>.4||e.heightAt(i+r,a)>=0&&e.heightAt(i-r,a)>=0&&e.heightAt(i,a+r)>=0&&e.heightAt(i,a-r)>=0||e.islandSDF(i,a)<3||e.cliffMask(i,a)>.03)continue;let s=!1;for(let e of t.WATERFALLS)Math.hypot(i-e.pool[0],a-e.pool[2])<(e.plungeR||4)*1.7&&(s=!0);s||n.push([i,a,y(Math.round(i*10),Math.round(a*10),77)])}this.shorePoints=n,n.sort((e,t)=>e[2]-t[2]);let i=[],a=v(7070);for(let[e,t,r]of n){if(r>.62)continue;let n=!0;for(let r of i)if(Math.hypot(r[0]-e,r[1]-t)<12.5){n=!1;break}if(!n||this.blocked(e,t,1.4)||this.crowded(e,t,1.4,.8))continue;i.push([e,t]);let o=a()<.35?2:1,s=[];for(let n=0;n<o;n++){let n=.85+.9*a(),r=e+(a()-.5)*2.4,i=t+(a()-.5)*2.4;if(this.blocked(r,i,n)||this.crowded(r,i,n,.6))continue;let o=a()<.6?`boulder`:a()<.8?`slab`:`standing`,c=this.add(o,r,i,n,{rng:a,group:`shore`,sink:.22+.12*a(),tilt:o===`standing`?.1:.25,flat:o===`standing`?.7:1});c&&s.push(c)}let c=2+Math.floor(a()*5);for(let n=0;n<c;n++){let n=a()*G,r=1.2+2.6*a(),i=e+Math.cos(n)*r,o=t+Math.sin(n)*r,s=.3+.5*a();this.blocked(i,o,s)||this.crowded(i,o,s,.6)||this.add(a()<.6?`boulder`:`slab`,i,o,s,{rng:a,group:`shore`,sink:.25+.15*a(),tilt:.3})}let l=3+Math.floor(a()*5);for(let n=0;n<l;n++){let n=a()*G,r=.8+3.5*a(),i=e+Math.cos(n)*r,o=t+Math.sin(n)*r;this.blocked(i,o,.2)||this.add(a()<.6?`pebble`:`boulder`,i,o,.1+.2*a(),{rng:a,group:`shore`,sink:.3,tilt:.4,big:!1})}}}submerged(){let{hf:e}=this,t=v(8080);for(let n=-86;n<=72;n+=4.5)for(let r=-40;r<=40;r+=4.5){let i=n+(t()-.5)*3.6,a=r+(t()-.5)*3.6,o=t(),s=-e.heightAt(i,a);if(s<.35||s>3.6||e.islandSDF(i,a)<.6||o>.07+.26*(1-ce(.8,3.4,s)))continue;let c=.3+.8*t()*t()+.15;this.blocked(i,a,c)||this.crowded(i,a,c,.7)||(t()<.18||(c=Math.min(c,(s-.12)/.75*1.1)),!(c<.2)&&this.add(t()<.55?`boulder`:`slab`,i,a,c,{rng:t,group:`submerged`,sink:.3,tilt:.3,dust:0,lichen:.1}))}}steppingStones(){let{hf:e,L:t}=this,n=v(9090),r=(r,i,a,o,s)=>{let c=Math.hypot(a-r,o-i),l=(a-r)/c,u=(o-i)/c,d=1;for(let a=s*.5;a<c;a+=s*(.85+.35*n())){let o=d*(.12+.25*n());d=-d;let s=r+l*a-u*o,c=i+u*a+l*o,f=e.groundHeight(s,c);if(f>.3)continue;let p=.3+.2*n();if(this.crowded(s,c,p,.9))continue;let m=Math.max(f,t.WATER_Y)+.08+.06*n(),h=m-f+.12,g=this.lib.variants[this.pickVariant(`slab`,n())],_=g.bbox,v=(_.max.x-_.min.x)/2,y=(_.max.z-_.min.z)/2,b=Math.max(h/2,.12);this.add(`slab`,s,c,p,{rng:n,vi:g.index,group:`stepping`,size:[p,b,y/v*p*(.8+.2*n())],mode:`top`,top:m,tilt:.03,noBridgeCheck:!0,collide:!0,big:!1,moss:.3,dust:.2,lichen:.2,band:.2})}};for(let e of t.TRAILS)for(let t=0;t<e.path.length-1;t++)r(e.path[t][0],e.path[t][1],e.path[t+1][0],e.path[t+1][1],.8);let i=t.ISLANDS.find(e=>e.id===`islet3`);i&&r(i.x,i.z+i.r*.8,i.x-.3,i.z+i.r+3.5,.75)}outcrops(){let e={varnish:.75,dust:.85,moss:0,lichen:.8,noBridgeCheck:!0};this.formations.forEach((t,n)=>{let r=v(11e3+n*97),i=t.kind===`spire`?3:7+Math.floor(r()*6);for(let n=0;n<i;n++){let n=r()*G,i=t.radius*(.55+.45*Math.sqrt(r())),a=t.x+Math.cos(n)*i,o=t.z+Math.sin(n)*i,s=(1.2+3.2*r()*r())*(t.kind===`spire`?.6:1);if(this.hf.distToPaths(a,o)<s+2)continue;let c=r();this.add(c<.45?`strata`:c<.8?`slab`:`boulder`,a,o,s,{rng:r,group:`outcrop`,mode:`rocks`,tilt:.45,...e})}}),[{x:222,z:182,w:30},{x:-62,z:252,w:36},{x:142,z:38,w:22},{x:-152,z:62,w:24}].forEach((t,n)=>{let r=v(11500+n*97);this._talus(t.x,t.z,2,6+Math.floor(r()*4),1.5,4.5,r,e,t.w*.5)})}_talus(e,t,n,r,i,a,o,s,c=12){for(let l=0;l<r;l++){let r=o()*G,l=n+c*Math.sqrt(o()),u=e+Math.cos(r)*l,d=t+Math.sin(r)*l,f=i+(a-i)*o()*o();this.hf.distToPaths(u,d)<f+2||this.add(o()<.55?`boulder`:`slab`,u,d,f,{rng:o,group:`outcrop`,sink:.3,tilt:.3,...s})}}desertScatter(){let{hf:e}=this,t=v(12120);for(let n=-300;n<=300;n+=20)for(let r=-300;r<=300;r+=20){let i=n+(t()-.5)*16,a=r+(t()-.5)*16,o=t(),s=e.waterSDF(i,a);if(s<20)continue;let c=e.cliffMask(i,a);if(c>.03&&c<.97||o>.2*ce(20,70,s))continue;let l=1+Math.floor(t()*3.5);for(let e=0;e<l;e++){let e=.4+1.5*t()*t(),n=i+(t()-.5)*5,r=a+(t()-.5)*5;this.blocked(n,r,e)||this.crowded(n,r,e,.6)||this.add(t()<.6?`boulder`:`slab`,n,r,e,{rng:t,group:`desert`,sink:.3+.15*t(),tilt:.25,dust:.85,moss:0,lichen:.8,varnish:.45})}}}beachPebbles(){let e=v(13130),t=this.shorePoints||[];for(let n=0;n<t.length;n+=3){if(e()>.35)continue;let[r,i]=t[n],a=1+Math.floor(e()*3);for(let t=0;t<a;t++){let t=r+(e()-.5)*5,n=i+(e()-.5)*5;this.blocked(t,n,.2)||this.add(e()<.6?`pebble`:`boulder`,t,n,.1+.18*e(),{rng:e,group:`beach`,sink:.35,tilt:.4,big:!1})}}}};async function be(e,t,n,r=null,i={}){let a=new ye(e,t,n,i),o=[`heroPiles`,`extraTreePiles`,`islets`,`islandRims`,`cliff`,`falls`,`shoreClusters`,`submerged`,`steppingStones`,`outcrops`,`desertScatter`,`beachPebbles`];for(let e=0;e<o.length;e++)a[o[e]](),r&&await r((e+1)/o.length);return a.recs}var xe=256;function Se(t){let n=Math.max(1,Math.ceil(t/xe)),r=new Float32Array(xe*3*n*4),a=new l(r,xe*3,n,e,i);return a.minFilter=a.magFilter=c,a.generateMipmaps=!1,a.needsUpdate=!0,a}function Ce(e,t,n){let r=e.image.data,i=t*3*4;r[i+0]=n.tint,r[i+1]=n.warmth,r[i+2]=n.cliffBlend,r[i+3]=n.seed,r[i+4]=n.moss,r[i+5]=n.wetBoost,r[i+6]=n.varnish,r[i+7]=n.dust,r[i+8]=n.groundY,r[i+9]=n.band,r[i+10]=n.lichen,r[i+11]=n.talus||0}var we=`
uniform highp sampler2D tRockInst;
attribute float rockAO;
varying vec3 vRkPosW;
varying vec3 vRkNrmW;
varying float vRkAO;
varying float vRkStrata;
flat varying vec4 vRkI0;
flat varying vec4 vRkI1;
flat varying vec4 vRkI2;
`,Te=`
#ifdef USE_BATCHING
  float rkId = getIndirectIndex( gl_DrawID );
  mat4 rkM = modelMatrix * batchingMatrix;
#else
  float rkId = 0.0;
  mat4 rkM = modelMatrix;
#endif
  vec4 rkWP = rkM * vec4( transformed, 1.0 );
  vRkPosW = rkWP.xyz;
  vRkNrmW = normalize( ( vec4( transformedNormal, 0.0 ) * viewMatrix ).xyz );
  vRkAO = rockAO;
  vec3 rkUp = normalize( rkM[ 1 ].xyz );
  vRkStrata = dot( rkWP.xyz - rkM[ 3 ].xyz, rkUp );
  int rkJ = int( rkId + 0.5 );
  ivec2 rkC = ivec2( ( rkJ % ${xe} ) * 3, rkJ / ${xe} );
  vRkI0 = texelFetch( tRockInst, rkC, 0 );
  vRkI1 = texelFetch( tRockInst, rkC + ivec2( 1, 0 ), 0 );
  vRkI2 = texelFetch( tRockInst, rkC + ivec2( 2, 0 ), 0 );
`,Ee=`
uniform sampler2D tRkMapA;
uniform sampler2D tRkNrmA;
uniform sampler2D tRkOrmA;
uniform sampler2D tRkMapB;
uniform sampler2D tRkNrmB;
uniform sampler2D tRkOrmB;
uniform vec2 uRkScale;
uniform vec2 uRkNormal;
uniform vec4 uRkFallA[2];   // waterfall sheet: lip centre xyz, half width
uniform vec4 uRkFallB[2];   // plunge point xyz, spray radius
varying vec3 vRkPosW;
varying vec3 vRkNrmW;
varying float vRkAO;
varying float vRkStrata;
flat varying vec4 vRkI0;
flat varying vec4 vRkI1;
flat varying vec4 vRkI2;

// 1 while a procedural feature of spatial frequency freq (1/m) is resolved at
// pix metres per pixel, fading to 0 before it can alias (distant cliffs, buttes)
float rkAAf( float freq, float pix ) {
  return 1.0 - smoothstep( 0.22, 0.6, freq * pix );
}

// hash without sine (safe at large coordinates when fed lattice points)
float rkHash13( vec3 p3 ) {
  p3 = fract( p3 * 0.1031 );
  p3 += dot( p3, p3.zyx + 31.32 );
  return fract( ( p3.x + p3.y ) * p3.z );
}
float rkNoise( vec3 x ) {
  vec3 i = floor( x );
  vec3 f = fract( x );
  f = f * f * ( 3.0 - 2.0 * f );
  float a = rkHash13( i );
  float b = rkHash13( i + vec3( 1.0, 0.0, 0.0 ) );
  float c = rkHash13( i + vec3( 0.0, 1.0, 0.0 ) );
  float d = rkHash13( i + vec3( 1.0, 1.0, 0.0 ) );
  float e = rkHash13( i + vec3( 0.0, 0.0, 1.0 ) );
  float g = rkHash13( i + vec3( 1.0, 0.0, 1.0 ) );
  float h = rkHash13( i + vec3( 0.0, 1.0, 1.0 ) );
  float k = rkHash13( i + vec3( 1.0, 1.0, 1.0 ) );
  return mix( mix( mix( a, b, f.x ), mix( c, d, f.x ), f.y ), mix( mix( e, g, f.x ), mix( h, k, f.x ), f.y ), f.z );
}
// value noise with analytic derivatives: (value, d/dx, d/dy, d/dz)
vec4 rkNoiseD( vec3 x ) {
  vec3 i = floor( x );
  vec3 f = fract( x );
  vec3 u = f * f * ( 3.0 - 2.0 * f );
  vec3 du = 6.0 * f * ( 1.0 - f );
  float a = rkHash13( i );
  float b = rkHash13( i + vec3( 1.0, 0.0, 0.0 ) );
  float c = rkHash13( i + vec3( 0.0, 1.0, 0.0 ) );
  float d = rkHash13( i + vec3( 1.0, 1.0, 0.0 ) );
  float e = rkHash13( i + vec3( 0.0, 0.0, 1.0 ) );
  float g = rkHash13( i + vec3( 1.0, 0.0, 1.0 ) );
  float h = rkHash13( i + vec3( 0.0, 1.0, 1.0 ) );
  float k = rkHash13( i + vec3( 1.0, 1.0, 1.0 ) );
  float k1 = b - a, k2 = c - a, k3 = e - a;
  float k4 = a - b - c + d, k5 = a - c - e + h, k6 = a - b - e + g;
  float k7 = -a + b + c - d + e - g - h + k;
  float v = a + k1 * u.x + k2 * u.y + k3 * u.z + k4 * u.x * u.y + k5 * u.y * u.z + k6 * u.z * u.x + k7 * u.x * u.y * u.z;
  vec3 dv = du * vec3( k1 + k4 * u.y + k6 * u.z + k7 * u.y * u.z,
                       k2 + k5 * u.z + k4 * u.x + k7 * u.z * u.x,
                       k3 + k6 * u.x + k5 * u.y + k7 * u.x * u.y );
  return vec4( v, dv );
}
float rkFbm( vec3 p ) {
  float s = 0.0;
  float a = 0.5;
  for ( int i = 0; i < 4; i++ ) {
    s += a * rkNoise( p );
    p = p * 2.03 + vec3( 1.7, 9.2, 3.1 );
    a *= 0.5;
  }
  return s * 1.0667;
}


// Spray / seep wetness beside the waterfalls (0..1): distance to the falling
// sheet (lip -> plunge segment, widened by its half width) plus a splash dome
// around the plunge point that is strongest low down.
float rkSprayWet( vec3 p ) {
  float w = 0.0;
  for ( int i = 0; i < 2; i++ ) {
    vec3 a = uRkFallA[ i ].xyz, b = uRkFallB[ i ].xyz;
    vec3 ab = b - a;
    float t = clamp( dot( p - a, ab ) / max( dot( ab, ab ), 1e-4 ), 0.0, 1.0 );
    vec3 q = a + ab * t;
    vec3 d = p - q;
    // the sheet is a curtain: its half width counts as distance zero
    float lat = max( length( d.xz ) - uRkFallA[ i ].w, 0.0 );
    float dist = sqrt( lat * lat + d.y * d.y );
    float r = uRkFallB[ i ].w;
    float sheet = 1.0 - smoothstep( 0.4, r * 0.75, dist );
    // splash zone: a wide, low dome around the plunge point
    vec3 e = p - b;
    float splash = ( 1.0 - smoothstep( r * 0.5, r * 1.5, length( e.xz ) ) ) * ( 1.0 - smoothstep( 0.4, r * 0.7, e.y ) );
    w = max( w, max( sheet, splash * 0.85 ) );
  }
  return w;
}

// Tafoni (cavernous weathering): isolated, rounded pits scattered in the face
// plane (p in cell units). Each occupied cell holds one elliptical pit (wider
// along the bedding, as the pits follow the weaker beds) around its own jittered
// centre; neighbouring pits merge by max depth, so there are no polygon walls
// (a Voronoi honeycomb of equal cells reads as reptile scales). Sizes are skewed
// small: many little pits, few large ones. dens 0..1 = occupied fraction.
// returns vec4( depth 0..1, d(depth)/dp (cells), pit radius (cells) );
// oc = offset from the deepest pit's centre to p (cells)
vec4 rkTafoni( vec2 p, float dens, out vec2 oc ) {
  vec2 i = floor( p ), f = fract( p );
  vec4 best = vec4( 0.0, 0.0, 0.0, 0.3 );
  oc = vec2( 9.0 );
  for ( int y = -1; y <= 1; y++ )
  for ( int x = -1; x <= 1; x++ ) {
    vec2 g = vec2( float( x ), float( y ) );
    vec3 c = vec3( i + g, 17.0 );
    vec3 h = vec3( rkHash13( c + 0.37 ), rkHash13( c + 5.71 ), rkHash13( c + 2.93 ) );
    if ( h.z > dens ) continue;
    vec2 r = g + 0.15 + 0.7 * h.xy - f;                   // p -> pit centre
    float hs = fract( h.z * 7.31 + h.x * 3.7 );
    float rad = ( 0.14 + 0.36 * hs * hs ) * ( 0.8 + 0.3 * dens );
    vec2 e = vec2( r.x * 0.72, r.y );                     // wider than tall
    float s = length( e ) / rad;
    if ( s >= 1.0 ) continue;
    float s2 = s * s;
    float dw = 0.55 + 0.45 * fract( h.y * 5.13 );         // depth varies pit to pit
    float dep = ( 1.0 - s2 * s2 ) * dw;                   // steep walls, flat-ish floor
    if ( dep > best.x ) {
      // d(dep)/dp = 4 s^2 (M^T e) / rad^2 * dw, M = diag(0.72, 1); points to the centre
      best = vec4( dep, vec2( e.x * 0.72, e.y ) * ( 4.0 * s2 / ( rad * rad ) ) * dw, rad );
      oc = -r;
    }
  }
  return best;
}

// Triplanar sample of one texture set, accumulated with weight wt.
// All fetches use explicit gradients (dpx/dpy = screen derivatives of p taken
// OUTSIDE any branch), so skipping near-zero axes never breaks mip selection.
void rkTriSet( sampler2D tMap, sampler2D tNrm, sampler2D tOrm, vec3 p, vec3 dpx, vec3 dpy, vec3 n, vec3 w,
               float sc, vec2 off, float wt, float nStr, inout vec3 alb, inout vec3 nrm, inout vec3 orm ) {
  vec2 uvX = p.zy * sc + off;
  vec2 uvY = p.xz * sc + off.yx;
  vec2 uvZ = p.xy * sc - off;
  vec2 gxX = dpx.zy * sc, gyX = dpy.zy * sc;
  vec2 gxY = dpx.xz * sc, gyY = dpy.xz * sc;
  vec2 gxZ = dpx.xy * sc, gyZ = dpy.xy * sc;
  vec3 a = vec3( 0.0 );
  vec3 a2 = vec3( 0.0 );
  vec3 o = vec3( 0.0 );
  vec3 nn = vec3( 0.0 );
  const float S2 = 0.29; // second, larger-scale albedo sample breaks up repetition
  if ( w.x > 0.004 ) {
    a += textureGrad( tMap, uvX, gxX, gyX ).rgb * w.x;
    a2 += textureGrad( tMap, uvX * S2 + off * 1.7, gxX * S2, gyX * S2 ).rgb * w.x;
    o += textureGrad( tOrm, uvX, gxX, gyX ).rgb * w.x;
    vec3 t = textureGrad( tNrm, uvX, gxX, gyX ).xyz * 2.0 - 1.0;
    t.xy *= nStr;
    t = vec3( t.xy + n.zy, abs( t.z ) * n.x );
    nn += t.zyx * w.x;
  }
  if ( w.y > 0.004 ) {
    a += textureGrad( tMap, uvY, gxY, gyY ).rgb * w.y;
    a2 += textureGrad( tMap, uvY * S2 - off.yx * 1.3, gxY * S2, gyY * S2 ).rgb * w.y;
    o += textureGrad( tOrm, uvY, gxY, gyY ).rgb * w.y;
    vec3 t = textureGrad( tNrm, uvY, gxY, gyY ).xyz * 2.0 - 1.0;
    t.xy *= nStr;
    t = vec3( t.xy + n.xz, abs( t.z ) * n.y );
    nn += t.xzy * w.y;
  }
  if ( w.z > 0.004 ) {
    a += textureGrad( tMap, uvZ, gxZ, gyZ ).rgb * w.z;
    a2 += textureGrad( tMap, uvZ * S2 + off.yx, gxZ * S2, gyZ * S2 ).rgb * w.z;
    o += textureGrad( tOrm, uvZ, gxZ, gyZ ).rgb * w.z;
    vec3 t = textureGrad( tNrm, uvZ, gxZ, gyZ ).xyz * 2.0 - 1.0;
    t.xy *= nStr;
    t = vec3( t.xy + n.xy, abs( t.z ) * n.z );
    nn += t * w.z;
  }
  a = mix( a, a2, 0.3 );
  alb += a * wt;
  orm += o * wt;
  nrm += nn * wt;
}

// Detail normal only (triplanar, whiteout), returns a world-space normal.
vec3 rkTriNormal( sampler2D tNrm, vec3 p, vec3 dpx, vec3 dpy, vec3 n, vec3 w, float sc, vec2 off, float nStr ) {
  vec3 nn = vec3( 0.0 );
  if ( w.x > 0.004 ) {
    vec3 t = textureGrad( tNrm, p.zy * sc + off, dpx.zy * sc, dpy.zy * sc ).xyz * 2.0 - 1.0;
    t.xy *= nStr;
    t = vec3( t.xy + n.zy, abs( t.z ) * n.x );
    nn += t.zyx * w.x;
  }
  if ( w.y > 0.004 ) {
    vec3 t = textureGrad( tNrm, p.xz * sc + off.yx, dpx.xz * sc, dpy.xz * sc ).xyz * 2.0 - 1.0;
    t.xy *= nStr;
    t = vec3( t.xy + n.xz, abs( t.z ) * n.y );
    nn += t.xzy * w.y;
  }
  if ( w.z > 0.004 ) {
    vec3 t = textureGrad( tNrm, p.xy * sc - off, dpx.xy * sc, dpy.xy * sc ).xyz * 2.0 - 1.0;
    t.xy *= nStr;
    t = vec3( t.xy + n.xy, abs( t.z ) * n.z );
    nn += t * w.z;
  }
  return normalize( nn + n * 1e-4 );
}
`,De=`
  vec3 rkP = vRkPosW;
  vec3 rkN = normalize( vRkNrmW );
  float rkSeed = vRkI0.w;
  vec3 rkW = abs( rkN );
  rkW = rkW * rkW;
  rkW = rkW * rkW;
  rkW /= ( rkW.x + rkW.y + rkW.z + 1e-5 );
  vec2 rkOff = vec2( rkSeed * 37.13, rkSeed * 91.71 );
  vec3 rkAlb = vec3( 0.0 );
  vec3 rkNW = vec3( 0.0 );
  vec3 rkOrm = vec3( 0.0 );
  // texture-set blend: per instance, broken up in space so boulders mix both looks
  float rkCB = clamp( vRkI0.z + ( rkNoise( rkP * 0.35 + rkSeed * 5.0 ) - 0.5 ) * 0.9 * ( 1.0 - abs( vRkI0.z * 2.0 - 1.0 ) * 0.6 ), 0.0, 1.0 );
  rkCB = smoothstep( 0.1, 0.9, rkCB );
  // formations: skirts / benches / caps are rubble and sand, not cliff strata
  rkCB *= 1.0 - vRkI2.w * smoothstep( 0.45, 0.78, rkN.y );
  vec3 rkDpx = dFdx( rkP );
  vec3 rkDpy = dFdy( rkP );
  float rkPix = max( length( rkDpx ), length( rkDpy ) ); // metres per pixel
  // baked aux (cliff wall / formations; zero on plain boulders):
  // r = varnish streak, g = sand dust, b = seep stain, a = bed tone (0 = none)
#if defined( USE_COLOR_ALPHA )
  vec4 rkAux = vColor;
#else
  vec4 rkAux = vec4( 0.0 );
#endif
  if ( rkCB < 0.995 ) rkTriSet( tRkMapA, tRkNrmA, tRkOrmA, rkP, rkDpx, rkDpy, rkN, rkW, uRkScale.x, rkOff, 1.0 - rkCB, uRkNormal.x, rkAlb, rkNW, rkOrm );
  if ( rkCB > 0.005 ) rkTriSet( tRkMapB, tRkNrmB, tRkOrmB, rkP, rkDpx, rkDpy, rkN, rkW, uRkScale.y, rkOff + 3.7, rkCB, uRkNormal.y, rkAlb, rkNW, rkOrm );
  rkNW = normalize( rkNW + rkN * 1e-4 );
#ifdef RK_DEBUG_ALB
  vec3 rkDbgAlb = rkAlb;
#endif

  // close-up detail: the rock set's normal map again at ~1/3 scale (fades out by 16 m)
  float rkDist = length( rkP - cameraPosition );
  float rkRelief = 0.5;
  if ( rkDist < 16.0 ) {
    vec3 rkDN = rkTriNormal( tRkNrmA, rkP, rkDpx, rkDpy, rkN, rkW, uRkScale.x * 3.1, rkOff * 1.9 + 0.7, 1.3 );
    rkNW = normalize( rkNW + ( rkDN - rkN ) * ( 1.0 - smoothstep( 9.0, 16.0, rkDist ) ) * 0.8 );
  }
  // procedural micro-relief (weathered knobbly surface, 0.1-0.3 m bumps) from an
  // analytic-gradient noise height field; fades out before it can alias
  if ( rkDist < 30.0 ) {
    vec4 rkBA = rkNoiseD( rkP * 3.2 + rkSeed * 7.0 );
    vec4 rkBB = rkNoiseD( rkP * 8.7 + 3.1 );
    float rkBF = 1.0 - smoothstep( 14.0, 30.0, rkDist );
    vec3 rkG = rkBA.yzw * ( 3.2 * 0.075 ) + rkBB.yzw * ( 8.7 * 0.018 ) * ( 1.0 - smoothstep( 6.0, 14.0, rkDist ) );
    rkG -= dot( rkG, rkN ) * rkN;
    rkNW = normalize( rkNW - rkG * rkBF );
    rkRelief = mix( 0.5, rkBA.x * 0.7 + rkBB.x * 0.3, rkBF );
  }

  // granular sandstone: loose grains and grain clusters roughen the surface up
  // close (weathered sandstone is sugary, never smooth)
#if RK_Q >= 3
  if ( rkDist < 5.0 ) {
    vec4 rkGA = rkNoiseD( rkP * 41.0 + rkSeed * 3.0 );
    vec4 rkGB = rkNoiseD( rkP * 97.0 + 7.7 );
    vec3 rkGG = rkGA.yzw * ( 41.0 * 0.0016 ) + rkGB.yzw * ( 97.0 * 0.0006 ) * rkAAf( 97.0, rkPix );
    rkGG *= rkAAf( 41.0, rkPix ) * ( 1.0 - smoothstep( 2.5, 5.0, rkDist ) );
    rkGG -= dot( rkGG, rkN ) * rkN;
    rkNW = normalize( rkNW - rkGG );
  }
#endif

  // face-plane coordinates (dominant horizontal triplanar axis) for pits / laminae
  vec2 rkFP = rkW.x > rkW.z ? rkP.zy : rkP.xy;
  vec3 rkFU = rkW.x > rkW.z ? vec3( 0.0, 0.0, 1.0 ) : vec3( 1.0, 0.0, 0.0 );
  float rkSteepF = 1.0 - smoothstep( 0.35, 0.7, abs( rkN.y ) );

  // sharper erosion up close: rain flutes (vertical V-grooves down steep faces)
  // and a fine crazing network of weathered joints on every face. Both are
  // V-profile grooves along the zero lines of analytic-gradient noise, so they
  // stay crisp where the knobbly relief above is rounded.
  float rkGroove = 0.0;
#if RK_Q >= 2
  if ( rkDist < 14.0 ) {
    float eF = 1.0 - smoothstep( 7.0, 14.0, rkDist );
    // flutes: noise stretched ~5x along the vertical
    const vec3 FQ = vec3( 2.3, 0.45, 2.3 );
    const float FW = 0.09;
    vec4 fn = rkNoiseD( rkP * FQ + rkSeed * 19.0 );
    float fc = fn.x - 0.5;
    float ft = clamp( abs( fc ) / FW, 0.0, 1.0 );
    float fg = 1.0 - ft * ft * ( 3.0 - 2.0 * ft );
    float fk = rkSteepF * smoothstep( 0.35, 0.65, rkNoise( rkP * 0.4 + 5.5 ) ) * rkAAf( 2.3, rkPix * 3.0 );
    // groove height h = -A fg  ->  dh/dp = A 6 t (1 - t) sign(c) / W * dn/dp
    vec3 dh = fn.yzw * FQ * ( 0.01 * 6.0 * ft * ( 1.0 - ft ) * sign( fc ) / FW ) * fk;
    // crazing: finer isotropic network, shallower
    const float CW = 0.05;
    vec4 cn = rkNoiseD( rkP * 4.5 + rkSeed * 23.0 + 1.7 );
    float cc = cn.x - 0.5;
    float ct = clamp( abs( cc ) / CW, 0.0, 1.0 );
    float cg = 1.0 - ct * ct * ( 3.0 - 2.0 * ct );
    // patchy (case-hardened crusts craze, fresh faces do not); zero lines of value
    // noise close into loops, so keep it faint or it reads as contour lines
    float ck = rkAAf( 4.5, rkPix * 3.0 ) * smoothstep( 0.5, 0.78, rkNoise( rkP * 0.7 + 2.2 ) );
    dh += cn.yzw * ( 4.5 * 0.002 * 6.0 * ct * ( 1.0 - ct ) * sign( cc ) / CW ) * ck;
    dh -= dot( dh, rkN ) * rkN;
    rkNW = normalize( rkNW - dh * eF );
    rkGroove = max( fg * fk, cg * ck * 0.35 ) * eF;
  }
#endif

  // tafoni: patches of cavernous weathering pits on steep faces, most under
  // overhangs and low on the face where salt and seep water collect. The pits
  // tilt the normal toward their centre, darken inside (AO, iron-stained crumbly
  // floor) and the sun-side lip shades the pit (rkPitSun, applied to direct light).
  float rkTaf = 0.0;
  float rkPitSun = 1.0;
#if RK_Q >= 2
  {
    float tafPatch = rkFbm( rkP * 0.17 + rkSeed * 13.0 ) + 0.2 * ( 1.0 - smoothstep( -0.6, 0.15, rkN.y ) )
                   + 0.08 * ( 1.0 - smoothstep( 1.0, 4.0, rkP.y - vRkI2.x ) );
    // patchy: most of a face has none, a few patches carry scattered pits
    float tafDens = smoothstep( 0.62, 0.86, tafPatch ) * 0.62 * rkSteepF * smoothstep( 0.6, 1.4, rkP.y - uWaterLevel )
                  * smoothstep( 0.3, 0.8, rkP.y - vRkI2.x );
    if ( tafDens > 0.01 ) {
      vec3 L = uSunDir;
      float Ln = dot( L, rkN );
      vec2 Lf = vec2( dot( L, rkFU ), L.y ) / max( Ln, 0.08 );  // face-plane drift per metre of depth
      vec3 grad3 = vec3( 0.0 );
    #if RK_Q >= 3
      const int TN = 2;
    #else
      const int TN = 1;
    #endif
      for ( int k = 0; k < TN; k++ ) {
        // k = 0: pits (0.2 m cells); k = 1 (ultra+): wide cavities (0.5 m cells) in the patch cores
        float TC = k == 0 ? ( RK_Q >= 3 ? 0.16 : 0.2 ) : 0.5;
        float dk = k == 0 ? tafDens : smoothstep( 0.3, 0.62, tafDens ) * 0.45;
        float res = rkAAf( 1.0 / TC, rkPix * 1.6 );
        if ( dk * res < 0.01 ) continue;
        vec2 oc;
        vec4 tf = rkTafoni( rkFP / TC + rkSeed * ( 31.0 + float( k ) * 17.0 ), dk, oc );
        float dep = ( k == 0 ? 0.05 : 0.14 ) * res;         // pit depth (m)
        grad3 += ( rkFU * tf.y + vec3( 0.0, tf.z, 0.0 ) ) * ( dep / TC );
        float z = tf.x * dep;                                 // local depth below the face (m)
        rkTaf = max( rkTaf, tf.x * res );
        // sun-side lip shadow: the ray toward the sun leaves the pit through its wall
        if ( tf.x > 0.001 && Ln > 0.02 ) {
          vec2 q = oc + Lf * ( z / TC );
          float ex = length( vec2( q.x * 0.72, q.y ) ) / tf.w;
          rkPitSun = min( rkPitSun, mix( 1.0, 0.32, smoothstep( 0.9, 1.1, ex ) ) );
        }
      }
      grad3 -= dot( grad3, rkN ) * rkN;
      rkNW = normalize( rkNW + grad3 * 1.1 );              // pit walls tilt toward the centre
    }
  }
#endif

  // macro variation (large, soft): kills tiling at distance
  float rkMacro = rkFbm( rkP * 0.11 + rkSeed * 17.0 );
  rkAlb *= 0.8 + 0.4 * rkMacro;

  // mid-scale mottling and iron staining (sandstone is never one flat colour)
  float rkMot = rkFbm( rkP * 1.6 + rkSeed * 9.0 );
  rkAlb *= mix( 1.0, 0.8 + 0.4 * rkMot, rkAAf( 1.6, rkPix ) );
  float rkIron = smoothstep( 0.56, 0.8, rkNoise( rkP * 0.75 + 13.0 ) * 0.7 + mix( 0.15, rkNoise( rkP * 3.1 ) * 0.3, rkAAf( 3.1, rkPix ) ) );
  rkIron *= rkAAf( 0.75, rkPix ) * 0.7 + 0.3;
  rkAlb = mix( rkAlb, rkAlb * vec3( 1.05, 0.76, 0.58 ), rkIron * 0.55 );
  // pores / crevices of the baked texture collect dirt (reads in direct light too)
  rkAlb *= mix( 0.66, 1.0, clamp( rkOrm.r, 0.0, 1.0 ) );
  rkAlb *= 0.9 + 0.2 * rkRelief; // micro-relief hollows slightly darker
  rkAlb *= 1.0 - 0.16 * rkGroove; // grit and shade in the flutes / joints

  // bedding laminae: thin darker lines following each rock's own layering
  float rkLamC = vRkStrata * 9.0 + ( rkNoise( rkP * 1.2 + rkSeed * 4.0 ) - 0.5 ) * 2.4;
  float rkLamT = abs( fract( rkLamC ) - 0.5 ) * 2.0;
  float rkLam = smoothstep( 0.78, 0.96, rkLamT ) * smoothstep( 0.35, 0.6, rkNoise( rkP * 0.9 + 3.3 ) );
  rkAlb *= 1.0 - 0.08 * rkLam * ( 1.0 - smoothstep( 25.0, 60.0, rkDist ) );
#if RK_Q >= 2
  // cross-bedding: inside the thick beds, fine inclined foresets (former dune
  // slip faces) truncated by the bed above, curving tangentially into the bed
  // base; dip direction and angle vary from bed to bed
  {
    float cbC = vRkStrata * 1.25 + ( rkNoise( rkP * 0.35 + rkSeed * 2.0 ) - 0.5 ) * 0.5;
    float cbId = floor( cbC ), cbF = fract( cbC );
    float cbH = rkHash13( vec3( cbId, rkSeed * 3.0, 7.7 ) );
    float cbOn = step( 0.35, cbH ) * rkSteepF;
    if ( cbOn > 0.01 ) {
      float dipDir = cbH > 0.67 ? 1.0 : -1.0;
      float dip = 0.35 + 0.45 * fract( cbH * 7.3 );         // tan of the foreset dip
      float along = dot( rkP, rkFU ) * dipDir;
      float tang = sqrt( max( cbF, 0.0 ) );                  // tangential toe at the bed base
      float lc = ( vRkStrata - along * dip * tang ) * 16.0 + ( rkNoise( rkP * 2.1 ) - 0.5 ) * 1.4;
      float lt = abs( fract( lc ) - 0.5 ) * 2.0;
      float cbLine = smoothstep( 0.72, 0.95, lt ) * rkAAf( 16.0, rkPix * 1.3 );
      float cbFade = smoothstep( 0.0, 0.08, cbF ) * ( 1.0 - smoothstep( 0.9, 1.0, cbF ) );
      float cbAmt = cbLine * cbFade * cbOn * ( 0.35 + 0.65 * smoothstep( 0.3, 0.7, rkNoise( rkP * 0.6 + 9.1 ) ) );
      rkAlb *= 1.0 - 0.12 * cbAmt;
      // the laminae weather out as fine ribs
      vec3 cbUp = normalize( vec3( 0.0, 1.0, 0.0 ) - rkN * rkN.y + 1e-4 );
      rkNW = normalize( rkNW + cbUp * ( cbAmt * 0.12 * ( 1.0 - smoothstep( 6.0, 18.0, rkDist ) ) ) );
    }
  }
#endif

  // per-instance tint + warmth (rusty vs pale)
  float rkWarm = vRkI0.y;
  // warm = rustier; cool = paler, greyer (weathered, bleached boulders)
  float rkLum = dot( rkAlb, vec3( 0.3, 0.59, 0.11 ) );
  if ( rkWarm > 0.0 ) rkAlb *= mix( vec3( 1.0 ), vec3( 1.1, 0.94, 0.82 ), rkWarm );
  else rkAlb = mix( rkAlb, vec3( rkLum ) * vec3( 1.1, 1.02, 0.92 ), -rkWarm * 0.45 );
  rkAlb *= vRkI0.x;

  // strata colour bands along the rock's own up axis
  float rkBandCoord = vRkStrata * 1.9 + ( rkFbm( rkP * 0.45 ) - 0.5 ) * 1.6 + rkSeed * 13.0;
  float rkBandId = floor( rkBandCoord );
  float rkBandF = fract( rkBandCoord );
  float rkBandH = rkHash13( vec3( rkBandId, rkSeed * 7.0, 3.1 ) );
  vec3 rkBandCol = mix( vec3( 1.08, 1.0, 0.9 ), vec3( 0.86, 0.72, 0.6 ), rkBandH );
  float rkBandEdge = smoothstep( 0.0, 0.07, rkBandF ) * ( 1.0 - smoothstep( 0.9, 1.0, rkBandF ) );
  // (bed joints only a little darker: the ledge geometry / normals shade them; dark
  // albedo lines at every joint read as wood grain)
  rkAlb *= mix( vec3( 1.0 ), rkBandCol * mix( 0.9, 1.0, rkBandEdge ), vRkI2.y * rkAAf( 1.9, rkPix ) );

  // bed tone baked per sandstone bed (escarpment wall, mesas, buttes):
  // pale cream caprock / cross-bedded beds vs rust-red thin-bedded siltstone
  if ( rkAux.a > 0.002 ) {
    float rkTn = clamp( ( rkAux.a * 255.0 - 1.0 ) / 254.0 * 2.0 - 1.0, -1.0, 1.0 );
    rkAlb *= rkTn > 0.0 ? mix( vec3( 1.0 ), vec3( 1.15, 1.07, 0.94 ), rkTn ) : mix( vec3( 1.0 ), vec3( 0.84, 0.62, 0.47 ), -rkTn );
  }

  // desert varnish: dark streaks running down steep faces (fine streaks fade out
  // with distance; broad streaks and the baked ones carry the look far away)
  float rkSteep = 1.0 - smoothstep( 0.3, 0.75, abs( rkN.y ) );
  float rkStreak = rkNoise( vec3( rkP.x * 1.3, rkP.y * 0.06, rkP.z * 1.3 ) + rkSeed * 11.0 ) * 0.7
                 + rkNoise( vec3( rkP.x * 4.1, rkP.y * 0.2, rkP.z * 4.1 ) ) * 0.3 * rkAAf( 4.1, rkPix );
  rkStreak = mix( 0.45, rkStreak, rkAAf( 1.3, rkPix ) );
  float rkStreakB = rkNoise( vec3( rkP.x * 0.3, rkP.y * 0.025, rkP.z * 0.3 ) + rkSeed * 5.0 );
  rkStreak = max( smoothstep( 0.5, 0.85, rkStreak ), smoothstep( 0.55, 0.8, rkStreakB ) * 0.8 * rkAAf( 0.3, rkPix ) );
  rkStreak = max( rkStreak, rkAux.r ) * rkSteep * vRkI1.z;
  rkAlb *= mix( vec3( 1.0 ), vec3( 0.42, 0.32, 0.26 ), rkStreak * mix( 0.4, 0.62, step( 0.002, rkAux.a ) ) );
  // dark seep stains (below the rim in gullies, spray beside the falls)
  rkAlb *= 1.0 - 0.42 * rkAux.b;

  // sandstone grain (fine speckle) so close-ups never look smooth-plastic
  float rkGrain = rkNoise( rkP * 23.0 + rkSeed * 3.0 ) * 0.6 + rkNoise( rkP * 61.0 ) * 0.4;
  rkAlb *= 1.0 + ( rkGrain - 0.5 ) * 0.08 * ( 1.0 - smoothstep( 8.0, 25.0, rkDist ) );

  // cavity dirt
  float rkCav = clamp( vRkAO, 0.0, 1.0 );
  rkAlb *= mix( 0.7, 1.0, rkCav );
  // tafoni interiors: shadowed, iron-stained, crumbly; walls case-hardened, paler
  rkAlb = mix( rkAlb, rkAlb * vec3( 0.8, 0.68, 0.56 ), rkTaf * 0.5 );

  float rkAbove = rkP.y - uWaterLevel;
  float rkGround = rkP.y - vRkI2.x;

  // lichen: pale grey-green and ochre crust spots on exposed dry faces
  float rkLn = rkNoise( rkP * 2.3 + 17.0 ) * 0.62 + rkNoise( rkP * 7.3 ) * 0.38;
  float rkLichen = smoothstep( 0.6, 0.7, rkLn ) * smoothstep( 0.5, 1.4, rkAbove )
                 * ( 0.3 + 0.7 * smoothstep( -0.3, 0.6, rkN.y ) ) * vRkI2.z;
  rkLichen = mix( 0.12 * vRkI2.z * smoothstep( 0.5, 1.4, rkAbove ), rkLichen, rkAAf( 2.3, rkPix ) );
  vec3 rkLichenCol = mix( vec3( 0.44, 0.45, 0.35 ), vec3( 0.56, 0.36, 0.12 ), step( 0.62, rkHash13( floor( rkP * 0.9 ) + rkSeed ) ) );
  float rkLichenNear = 0.0;
#if RK_Q >= 2
  // crustose lichen up close: discrete lobed rosettes (1-5 cm) of a few species
  // (grey-green, chartreuse, orange) clustered where the blotch field is high,
  // paler at the growing rim, darker and cracked toward the older centre
  if ( rkDist < 9.0 && vRkI2.z > 0.02 ) {
    float lF = ( 1.0 - smoothstep( 5.0, 9.0, rkDist ) ) * rkAAf( 1.0 / 0.07, rkPix * 1.2 );
    float lDen = smoothstep( 0.46, 0.72, rkLn ) * vRkI2.z * smoothstep( 0.5, 1.4, rkAbove )
               * ( 0.3 + 0.7 * smoothstep( -0.3, 0.6, rkN.y ) ) * 0.85;
    if ( lF * lDen > 0.01 ) {
      vec2 lp = ( rkW.y > max( rkW.x, rkW.z ) ? rkP.xz : rkFP ) / 0.07 + rkSeed * 53.0;
      vec2 li = floor( lp ), lf = fract( lp );
      float lBest = 0.0, lS = 1.0, lId = 0.0;
      for ( int y = -1; y <= 1; y++ )
      for ( int x = -1; x <= 1; x++ ) {
        vec2 g = vec2( float( x ), float( y ) );
        vec3 c = vec3( li + g, 29.0 );
        float hz = rkHash13( c + 1.9 );
        if ( hz > lDen ) continue;
        vec2 r = g + 0.2 + 0.6 * vec2( rkHash13( c + 0.3 ), rkHash13( c + 4.4 ) ) - lf;
        float rad = 0.22 + 0.5 * fract( hz * 13.7 );
        float th = atan( r.y, r.x + 1e-5 );
        float lob = 1.0 + 0.12 * sin( 7.0 * th + hz * 40.0 ) + 0.07 * sin( 13.0 * th + hz * 17.0 );
        float s = length( r ) / ( rad * lob );
        float cov = 1.0 - smoothstep( 0.82, 1.0, s );
        if ( cov > lBest ) { lBest = cov; lS = s; lId = fract( hz * 71.3 ); }
      }
      if ( lBest > 0.0 ) {
        vec3 lc = lId < 0.5 ? vec3( 0.43, 0.45, 0.37 ) : ( lId < 0.78 ? vec3( 0.47, 0.5, 0.2 ) : vec3( 0.6, 0.31, 0.07 ) );
        lc *= mix( 0.78, 1.08, smoothstep( 0.35, 0.95, lS ) );
        rkLichenNear = lBest * lF;
        rkAlb = mix( rkAlb, lc, rkLichenNear * 0.85 );
      }
    }
  }
#endif
  rkAlb = mix( rkAlb, rkLichenCol, rkLichen * 0.45 * ( 1.0 - 0.6 * ( 1.0 - smoothstep( 5.0, 9.0, rkDist ) ) * step( 1.5, float( RK_Q ) ) ) );

  // moss on top-facing surfaces and in crevices (near vegetation / water)
  float rkMossAmt = vRkI1.x;
  float rkMn = rkFbm( rkP * 0.8 + 5.0 ) * 0.86 + rkNoise( rkP * 4.2 + 2.0 ) * 0.14;
  float rkMossTop = smoothstep( 0.45, 0.9, rkNW.y * 0.5 + rkN.y * 0.5 + ( rkMn - 0.5 ) * 0.7 );
  float rkMossCover = smoothstep( 0.64 - rkMossAmt * 0.22, 0.78 - rkMossAmt * 0.22, rkMn );
  float rkMoss = rkMossTop * rkMossCover;
  rkMoss = max( rkMoss, ( 1.0 - rkCav ) * smoothstep( 0.55, 0.7, rkMn ) * 0.6 );
  rkMoss *= smoothstep( 0.05, 0.4, rkMossAmt ) * smoothstep( 0.02, 0.3, rkAbove );
  vec3 rkMossCol = mix( vec3( 0.045, 0.06, 0.018 ), vec3( 0.12, 0.13, 0.045 ), rkNoise( rkP * 5.0 ) );
  rkAlb = mix( rkAlb, rkMossCol, clamp( rkMoss, 0.0, 1.0 ) );

  // sand dust on flat tops and at the ground contact
  float rkDust = smoothstep( 0.6, 0.92, rkN.y ) * smoothstep( 0.35, 0.7, rkFbm( rkP * 0.9 + 3.0 ) )
               + ( 1.0 - smoothstep( 0.0, 0.3, rkGround ) ) * 0.75;
  rkDust = max( rkDust, rkAux.g * ( 0.55 + 0.45 * smoothstep( -0.2, 0.6, rkN.y ) ) );
  rkDust = clamp( rkDust * vRkI1.w, 0.0, 1.0 ) * smoothstep( 0.15, 0.5, rkAbove ) * ( 1.0 - rkMoss );
  rkAlb = mix( rkAlb, vec3( 0.64, 0.52, 0.38 ), rkDust * 0.8 );

  // roughness / AO from the texture sets
  float rkRough = clamp( rkOrm.g * ( 0.92 + 0.16 * rkMacro ), 0.3, 1.0 );
  rkRough = mix( rkRough, 0.95, clamp( rkMoss + rkDust * 0.5, 0.0, 1.0 ) );
  rkRough *= 1.0 - 0.25 * rkAux.b;
  float rkAO = rkOrm.r * mix( 0.42, 1.0, rkCav ) * mix( 0.55, 1.0, smoothstep( 0.0, 0.55, rkGround ) );
  rkAO *= 1.0 - 0.6 * rkTaf;

  // wetness band just above the water (higher near falls spray)
  float rkWetH = 0.4 + vRkI1.y + ( rkNoise( vec3( rkP.xz * 0.9, 2.0 ) ) - 0.5 ) * 0.14;
  float rkWet = 1.0 - smoothstep( rkWetH * 0.35, rkWetH, rkAbove );
  // spray-soaked rock beside the falls: dark, glossy, streaked with a black-green
  // algae / cyanobacteria film where it never dries, moss at the spray fringe
  float rkSpray = clamp( rkSprayWet( rkP ) * ( 0.75 + 0.5 * rkNoise( rkP * vec3( 1.7, 0.35, 1.7 ) + 4.0 ) ), 0.0, 1.0 );
  rkWet = max( rkWet, rkSpray * 0.95 );
  float rkFilm = smoothstep( 0.55, 0.9, rkSpray ) * smoothstep( 0.45, 0.7, rkNoise( vec3( rkP.x * 2.3, rkP.y * 0.4, rkP.z * 2.3 ) + 1.3 ) );
  rkAlb = mix( rkAlb, vec3( 0.045, 0.055, 0.03 ), rkFilm * 0.55 );
  float rkSprayMoss = smoothstep( 0.3, 0.55, rkSpray ) * ( 1.0 - smoothstep( 0.8, 0.98, rkSpray ) )
                    * smoothstep( 0.5, 0.72, rkMn ) * smoothstep( -0.2, 0.5, rkN.y );
  rkAlb *= mix( 1.0, 0.56, rkWet );
  rkAlb = mix( rkAlb, rkAlb * rkAlb * 1.7, rkWet * 0.22 );
  float rkDry = smoothstep( -0.05, 0.05, rkAbove );
  rkRough = mix( rkRough, 0.16, rkWet * mix( 0.35, 0.9, rkDry ) );
  // spray-fringe moss (after the wet band so it stays dark green, not black)
  rkAlb = mix( rkAlb, rkMossCol * 0.85, rkSprayMoss * 0.85 );
  rkRough = mix( rkRough, 0.7, rkSprayMoss * 0.6 );
  // faint pale mineral line just above the wet band
  float rkTide = ( rkAbove - rkWetH * 1.08 ) / 0.05;
  rkAlb *= 1.0 + 0.1 * exp( -rkTide * rkTide ) * step( rkAbove, 3.0 );

  // algae underwater
  float rkUnder = smoothstep( 0.02, 0.9, -rkAbove );
  float rkAn = rkFbm( rkP * 1.1 + 9.0 );
  float rkAlgae = rkUnder * smoothstep( 0.32, 0.68, rkAn + rkN.y * 0.25 + ( 1.0 - smoothstep( 0.2, 1.2, -rkAbove ) ) * 0.2 );
  rkAlb = mix( rkAlb, vec3( 0.13, 0.19, 0.08 ) * ( 0.6 + 0.8 * rkAn ), rkAlgae * 0.7 );

  // moss / water film / baked sand drifts (talus skirts, benches) soften the detail normal;
  // so does distance on the gentler slopes of the baked formations (the cliff set's
  // strata ridges would read as wood grain on a far talus skirt or cap)
  float rkFarFlat = step( 0.002, rkAux.a ) * smoothstep( 0.45, 0.85, rkN.y ) * smoothstep( 120.0, 320.0, rkDist ) * 0.6;
  rkNW = normalize( mix( rkNW, rkN, clamp( rkMoss * 0.6 + rkWet * 0.3 + rkAux.g * rkDust * 0.75 + rkFarFlat, 0.0, 0.9 ) ) );
  diffuseColor.rgb = max( rkAlb, vec3( 0.0 ) );
#ifdef RK_DEBUG_ALB
  diffuseColor.rgb = rkDbgAlb;
#endif
`,Oe=`
  float ambientOcclusion = rkAO;
  reflectedLight.indirectDiffuse *= ambientOcclusion;
  #if defined( USE_ENVMAP ) && defined( STANDARD )
    float rkDotNV = saturate( dot( geometryNormal, geometryViewDir ) );
    reflectedLight.indirectSpecular *= computeSpecularOcclusion( rkDotNV, ambientOcclusion, material.roughness );
  #endif
`;function K(e){return e&&(e.wrapS=e.wrapT=o),e}function ke(e,t,n=`rocks`,r={}){let i=e.tex.get(`rock`),a=e.tex.get(`cliff`),o={tRockInst:{value:t},tRkMapA:{value:K(i.map)},tRkNrmA:{value:K(i.normalMap)},tRkOrmA:{value:K(i.ormMap)},tRkMapB:{value:K(a.map)},tRkNrmB:{value:K(a.normalMap)},tRkOrmB:{value:K(a.ormMap)},uRkScale:{value:new h(1/(i.worldSize||2.5),1/(a.worldSize||6))},uRkNormal:{value:new h(1.5,1.15)},uRkFallA:{value:[new u(0,-999,0,0),new u(0,-999,0,0)]},uRkFallB:{value:[new u(0,-999,0,.001),new u(0,-999,0,.001)]}};(e.layout?.WATERFALLS||[]).slice(0,2).forEach((e,t)=>{o.uRkFallA.value[t].set(e.lip[0],e.lip[1],e.lip[2],(e.width||2)*.5),o.uRkFallB.value[t].set(e.pool[0],e.pool[1]??0,e.pool[2],(e.plungeR||4)*1.1)});let s=new m({color:16777215,roughness:1,metalness:0});s.name=n,s.userData.rockUniforms=o,r.aux&&(s.vertexColors=!0);let c=e.params?.get?.(`rockdbg`);return s.defines={RK_Q:Math.max(0,Math.min(4,e.quality?.rank??2))},c===`alb`&&(s.defines.RK_DEBUG_ALB=``),c===`nrm`&&(s.defines.RK_DEBUG_NRM=``),s.onBeforeCompile=e=>{Object.assign(e.uniforms,o),e.vertexShader=e.vertexShader.replace(`void main() {`,we+`
void main() {`).replace(`#include <worldpos_vertex>`,`#include <worldpos_vertex>
`+Te),e.fragmentShader=e.fragmentShader.replace(`void main() {`,Ee+`
void main() {`).replace(`#include <map_fragment>`,De).replace(`#include <color_fragment>`,``).replace(`#include <roughnessmap_fragment>`,`float roughnessFactor = rkRough;`).replace(`#include <metalnessmap_fragment>`,`float metalnessFactor = 0.0;`).replace(`#include <normal_fragment_maps>`,`normal = normalize( ( viewMatrix * vec4( rkNW, 0.0 ) ).xyz );`).replace(`#include <aomap_fragment>`,Oe).replace(`#include <lights_fragment_end>`,`#include <lights_fragment_end>
  reflectedLight.directDiffuse *= rkPitSun;
  reflectedLight.directSpecular *= rkPitSun;`).replace(`#include <emissivemap_fragment>`,`#include <emissivemap_fragment>
#ifdef RK_DEBUG_NRM
  totalEmissiveRadiance = rkNW * 0.5 + 0.5;
  diffuseColor.rgb = vec3( 0.0 );
#endif`)},s.customProgramCacheKey=()=>r.aux?`lagoon-rocks-v4`:`lagoon-rocks-v4a`,e.patchMaterial(s),s}var Ae=.5,je=52,q=5,Me=57,Ne=104,Pe=36,Fe=5,Ie=.5,Le=Math.round(Fe/Ie),J=(e,t,n)=>{let r=Math.min(1,Math.max(0,(n-e)/(t-e)));return r*r*(3-2*r)},Y=(e,t,n)=>e<t?t:e>n?n:e,Re=(e,t,n)=>e+(t-e)*n,ze=e=>Y(Math.round(e*255),0,255);function Be(e){let t=[],n=[],r=[],i=[],a=[],o=[],s=[],c=-4,l=0,u=(e,u,d,f,p)=>{t.push(c),n.push(e),r.push(u),i.push(d),a.push(f),o.push(l),s.push(p),c+=e};for(;c<18;){let t=2.4+2.6*e(),n=1+Math.floor(e()*3),r=-.2+.6*e();for(let i=0;i<n;i++)u(t/n,1,.04+.1*e(),Y(r+(e()-.5)*.25,-1,1),1);l++;let i=2+Math.floor(e()*2.5),a=-.75+.45*e();for(let t=0;t<i;t++){let n=t%2;u(.12+.3*e(),n,n?.25+.4*e():.2+.35*e(),Y(a+(e()-.5)*.3,-1,1),0)}l++}return{yb:t,th:n,hard:r,amp:i,tone:a,pkg:o,massive:s,n:t.length}}function Ve(e,t){let{layout:n,hf:r}=e,i=r.HF_NOISE.N,a=n.CLIFF,o=e=>{let t=a.baseZ;for(let n of a.bulges){let r=(e-n.x)/n.width;t+=n.amount*Math.exp(-r*r)}return t+i.noise2(e*.05,3.3)*2.2},s=v(5151),c=new b(5152),l=new b(5153),u=Be(s),d=-176,f=Math.floor(372/Ae)+1,p=[];for(let e=0;e<f;e++){let n=d+e*Ae,i=o(n);if(r.heightAt(n,i-7)-r.heightAt(n,i+.5)<.4){p.push({x:n,fz:i,hs:null,hB:0,hT:0,hMax:0,H:0});continue}let a=new Float32Array(Pe),s=-1e9;for(let e=0;e<Pe;e++)a[e]=t(n,i+Fe-e*Ie),a[e]>s&&(s=a[e]);let c=Math.min(a[Le],a[9],a[8]),l=0;for(let e=23;e<=27;e++)l+=a[e]/5;p.push({x:n,fz:i,hs:a,hB:c,hT:l,hMax:s,H:l-c})}let m=(e,t,n=0)=>{let r=e.hs;if(t<=r[6])return e.fz+Fe-6*Ie;for(let i=Math.max(7,n);i<Pe;i++)if(r[i]>=t){let n=Y((t-r[i-1])/Math.max(1e-4,r[i]-r[i-1]),0,1);return m.k=i,e.fz+Fe-(i-1+n)*Ie}return null};m.k=0;let h=[];for(let e=d+s()*3;e<196;e+=1.3+4.2*s()**1.3){let t=s()<.62,n=t?-20:-2+13*s();h.push({x:e,w:.35+.7*s(),d:.55+1.4*s()*(t?1:.7),y0:n,y1:t?99:n+2+7*s(),lean:(s()-.5)*.18})}let g=u.pkg[u.n-1]+1,_=h.map(()=>{let e=(s()-.42)*1.3,t=new Float32Array(g);for(let n=0;n<g;n++)t[n]=e+(s()-.5)*.4,s()<.075&&(t[n]-=.8+.9*s());return t}),y=[];for(let e=d+10*s();e<196;e+=20+26*s())y.push({x:e,w:2.2+2.6*s(),d:1+1.8*s(),drop:.35+.9*s()});let x=n.WATERFALLS.map(e=>({x:e.lip[0],hw:e.width/2+1.5}));for(let e of p){if(!e.hs){e.b=1,e.inBand=!1;continue}let t=e.x,n=(e,n)=>c.noise2(t*e+n,n*.37);e.p0=.3+.5*(n(.045,1.3)*.5+.5)+1.3*Math.max(0,n(.032,6.6)+.15),e.lean=.05+.15*(n(.02,7.1)*.5+.5),e.dip=.45*n(.011,2.9)+.0022*t,e.rr=.45+.75*(n(.06,9.4)*.5+.5),e.flute=.28*(1-Math.abs(l.noise2(t*.75,4.4)))**3*(.5+.5*(n(.05,12.1)*.5+.5)),e.hf=1+1.3*(n(.05,4.4)*.5+.5);let i=0,a=0,o=0;for(let e of y){let n=(t-e.x)/e.w;if(Math.abs(n)<1){let t=(1-n*n)**2;t>i&&(i=t,a=e.d,o=e.drop)}}e.gf=i,e.gd=a,e.flare=.45+.75*(n(.07,5.2)*.5+.5)+1.4*i,e.yRim=e.hT+.12+.28*n(.08,3.3)-o*i,e.sv=J(-.05,.42,l.noise2(t*.33,1.7)*.62+l.noise2(t*1.05,8.2)*.38);let s=1-J(1.6,3.4,e.H),u=!1;for(let e of x){let n=Math.abs(t-e.x)-e.hw;n<0&&(u=!0),s=Math.max(s,1-J(0,3.2,n))}e.b=s,e.inBand=u;let d=0;for(let e of x)d=Math.max(d,1-J(e.hw+1,e.hw+8,Math.abs(t-e.x)));e.seep=d,e.jt=[];for(let n=0;n<h.length;n++)Math.abs(h[n].x-t)<h[n].w+2&&e.jt.push(n);let f=0,p=h.length-1,g=-1;for(;f<=p;){let e=f+p>>1;h[e].x<=t?(g=e,f=e+1):p=e-1}e.block=Math.max(0,g),e.zFootFace=m(e,e.hB+.35)??e.fz;let _=r.distToPaths(t,e.zFootFace+e.p0+e.flare);if(_<1.6){let t=Y(_/1.6,0,1);e.flare*=t,e.p0*=.5+.5*t}e.zD=e.zFootFace+e.p0}let S=e=>{let t=u.yb,n=0,r=u.n-1,i=0;for(;n<=r;){let a=n+r>>1;t[a]<=e?(i=a,n=a+1):r=a-1}return i},C={layerTone:0,dust:0,jn:0};function w(e,t){let n=e.x,r=t+e.dip,i=S(r),a=Y((r-u.yb[i])/u.th[i],0,1),o=u.amp[i]*(.65+.7*(l.noise2(n*.035,i*3.1)*.5+.5)),s;s=u.hard[i]?o*(.2+.8*J(0,.1,a))-.12*o*J(.88,1,a):-o*J(0,.22,a)*(1-J(.78,1,a)),u.massive[i]&&(s-=e.flute*(.35+.65*Y((t-e.hB)/Math.max(1,e.H),0,1))),s+=_[e.block][u.pkg[i]];let c=0;for(let i of e.jt){let a=h[i];if(r<a.y0||r>a.y1)continue;let o=(n-(a.x+a.lean*(t-e.hB)))/a.w;if(Math.abs(o)>=1)continue;let s=J(a.y0,a.y0+.8,r)*(1-J(a.y1-.8,a.y1,r));c=Math.max(c,a.d*(1-o*o)**2*s)}return C.jn=c,C.layerTone=u.tone[i],C.dust=u.hard[i]&&a>.85?.3:0,s-c}function T(e,n,r,i,a){let o=e.x,s=e.hB,c=Math.max(.5,e.yRim-s),u=e.zD,d=0;for(let t=0;t<je;t++){let l=t===0?s-.9:s+c*((t-1)/50),f=Y((l-s)/c,0,1),p=e.zD-e.lean*Math.max(0,l-s);p+=w(e,l);let h=C.jn;p-=e.gd*e.gf*J(.12,1,f);let g=1-J(0,e.hf,l-s);p+=e.flare*g*g;let _=e.yRim-e.rr;if(l>_){let t=Math.min(e.rr,l-_);p-=e.rr-Math.sqrt(Math.max(0,e.rr*e.rr-t*t))}if(l>s-.15){let t=m(e,l,d),n=l>s+.3?.3:.12;t!==null&&(d=Math.max(0,m.k-1),p<t+n&&(p=t+n))}let v=l;if(e.b>0){let t=Math.min(l,e.hMax-.8),n=(m(e,Math.max(t,s+.35))??e.fz-4)-1;v=Re(l,t,e.b),p=Re(p,n,e.b)}t===51&&(u=p);let y=a+t;n[y*3]=o,n[y*3+1]=v,n[y*3+2]=p;let b=e.sv*J(.1,.5,f)*(1-.7*J(.9,1,f)),x=Math.max(.9*(1-J(0,1.1,l-s)),C.dust),S=Math.max(.7*e.gf*J(.25,.85,f),.75*e.seep*(1-.5*J(.8,1,f)));r[y*4]=ze(b),r[y*4+1]=ze(x),r[y*4+2]=ze(S),r[y*4+3]=1+Math.round((Y(C.layerTone,-1,1)*.5+.5)*254),i[y]=(1-.4*Math.min(1,h/.7))*(1-.25*e.gf*f)*(.62+.38*J(0,.7,l-s))}let f=m(e,e.yRim-.3),p=Math.min(f??e.fz-6,e.fz-5)-1.6;for(let s=0;s<q;s++){let c=(s+1)/q,d=Re(u,p,c),f=t(o,d),m=s===4?f-.5:Math.max(f+.1,e.yRim-.1*(s+1)+.12*l.noise2(o*.4,d*.4));e.b>0&&(m=Re(m,f-.6,e.b));let h=a+je+s;n[h*3]=o,n[h*3+1]=m,n[h*3+2]=d,r[h*4]=0,r[h*4+1]=ze(.5),r[h*4+2]=0,r[h*4+3]=r[(a+je-1)*4+3],i[h]=1}}let E=[],D=null;for(let e=0;e<f;e++){let t=p[e];!t.inBand&&t.H>.8?D?D[1]=e:(D=[e,e],E.push(D)):D=null}let O=[];for(let[e,t]of E){let n=e,r=t;for(;n<r-1&&p[n+1].b>.999;)n++;for(;r>n+1&&p[r-1].b>.999;)r--;if(!(r-n<4))for(let e=n;e<r;e+=Ne)O.push([e,Math.min(r,e+Ne+2)])}let M=new Uint8Array(Me);M[0]=M[1]=M[51]=M[50]=1;for(let e=je;e<Me;e++)M[e]=1;let N=[0,1,Math.round(je*.2),Math.round(je*.45),Math.round(je*.7),49,51,53,56],P=()=>[0,.3,1],F=[];for(let[e,t]of O){let n=t-e+1,r=new Float32Array(n*Me*3),i=new Uint8Array(n*Me*4),a=new Float32Array(n*Me),o=1e9;for(let t=0;t<n;t++)T(p[e+t],r,i,a,t*Me),o=Math.min(o,p[e+t].hB);let s=[1,2,4,8].map((e,t)=>k(r,i,n,Me,{colStep:e,rowSel:t===0?null:j(Me,e,M),outward:P,aoMul:a})),c=k(r,null,n,Me,{colStep:5,rowSel:N,outward:P}),l=s[0].boundingBox,u=(l.min.x+l.max.x)/2,d=(l.min.z+l.max.z)/2;F.push({lods:s,proxy:A(c),bvhGeo:s[1],x:u,z:d,radius:Math.hypot(l.max.x-l.min.x,l.max.z-l.min.z)/2,top:l.max.y,bottom:l.min.y,groundY:o,x0:p[e].x,x1:p[t].x})}return{segments:F,foot:p.filter(e=>e.H>1.2).map(e=>({x:e.x,z:e.zD+e.flare*.6,zFace:e.fz,hB:e.hB,H:e.H,gully:e.gf,buried:e.b,zTop:e.fz-6.5,hT:e.hT})),rows:Me,strata:u}}var He=9,Ue=46,We=6,X=61,Ge=[.94,.84,.68,.5,.32,.14],Z=Math.PI*2,Q=(e,t,n)=>{let r=Math.min(1,Math.max(0,(n-e)/(t-e)));return r*r*(3-2*r)},$=(e,t,n)=>e<t?t:e>n?n:e,Ke=(e,t,n)=>e+(t-e)*n,qe=e=>$(Math.round(e*255),0,255),Je=e=>{let t=1-e*e;return t>0?t*t:0},Ye=e=>{let t=1-Math.abs(e);return t>0?t**1.6:0},Xe=(e,t)=>{let n=(e-t)%Z;return n>Math.PI&&(n-=Z),n<-Math.PI&&(n+=Z),n},Ze=[{kind:`mesa`,x:250,z:-190,R:24,H:21,e:1.8,rot:.5,tiers:2,seed:21},{kind:`butte`,x:300,z:-42,R:11,H:25,e:1.3,rot:.2,tiers:3,seed:12},{kind:`spire`,x:318,z:-18,R:3.5,H:24,e:1.3,rot:.9,tiers:2,seed:13},{kind:`mesa`,x:-262,z:172,R:20,H:19,e:1.7,rot:1.1,tiers:2,seed:14,waist:.22},{kind:`butte`,x:-300,z:58,R:10.5,H:21,e:1.35,rot:2,tiers:3,seed:15},{kind:`spire`,x:-284,z:80,R:3,H:20,e:1.2,rot:.3,tiers:2,seed:16},{kind:`spire`,x:-236,z:124,R:2.4,H:15,e:1.35,rot:2.2,tiers:1,seed:19},{kind:`mesa`,x:-210,z:-252,R:25,H:21,e:1.6,rot:2.6,tiers:2,seed:17},{kind:`butte`,x:60,z:-292,R:12,H:23,e:1.2,rot:.9,tiers:2,seed:18}],Qe={mesa:{lobe:.12,spurs:[4,7],emb:[3,5],tA:[.34,.42],setback:[.7,.84],taper:.05,gully:1,flare:.05,notch:1},butte:{lobe:.09,spurs:[3,5],emb:[2,3],tA:[.4,.48],setback:[.62,.8],taper:.07,gully:.8,flare:.05,notch:1},spire:{lobe:.08,spurs:[1,2],emb:[0,1],tA:[.16,.24],setback:[.78,.98],taper:.22,gully:0,flare:.07,notch:.4},crown:{lobe:.14,spurs:[3,5],emb:[1,3],tA:[.1,.18],setback:[.55,.75],taper:.22,gully:.5,flare:.06,notch:1},shell:{lobe:0,spurs:[10,16],emb:[0,0],tA:[.44,.52],setback:[1,1],taper:.08,gully:1,flare:.035,notch:0}};function $e(e,t,n,r){let i=[],a=[],o=[],s=[],c=[],l=[],u=[],d=-.35*t,f=0,p=(e,t,n,r,p)=>{i.push(d),a.push(e),o.push(t),s.push(n),c.push($(r,-1,1)),l.push(f),u.push(p),d+=e};for(;d<r*t;)p(t*(.04+.05*e()),0,n*(.1+.2*e()),-.62+.25*e(),0),e()<.5&&f++;f++;let m=t*(.035+.035*e()),h=e()<.5?1:2,g=t-d-m;for(let r=0;r<h;r++){let i=r===h-1?g:g*(.45+.17*e()),a=[];if(r<h-1){let n=2+Math.floor(e()*2);for(let r=0;r<n;r++)a.push(t*(.012+.016*e()));i-=a.reduce((e,t)=>e+t,0)}let o=1+Math.floor(e()*2),s=-.15+.5*e();for(let t=0;t<o;t++)p(i/o,1,n*(.05+.1*e()),s+(e()-.5)*.25,1);f++;let c=-.6+.3*e();a.forEach((t,r)=>p(t,r%2,n*(r%2?.35+.35*e():.3+.3*e()),c+(e()-.5)*.2,0)),f++,g-=i+a.reduce((e,t)=>e+t,0)}return p(m,1,n*(.5+.3*e()),.7+.15*e(),0),f++,p(t*.2,1,n*.3,.75,0),{yb:i,th:a,hard:o,amp:s,tone:c,pkg:l,massive:u,n:i.length,npkg:f+1,capT:m}}function et(e,t){let n=v(90001+e.seed*7919),r=new b(4400+e.seed),{x:i,z:a,R:o,e:s,rot:c}=e,l=e.shell||null,u=l?`shell`:e.kind,d=Qe[u]||Qe.butte,f=Math.cos(c),p=Math.sin(c),m=$(e.H/25,.7,3.2),h=Math.sqrt(m),g=u===`spire`,_=(e,t)=>e+(t-e)*n(),y;if(l)y=l.base;else if(e.base!=null)y=e.base;else{let n=1e9,r=0;for(let c=0;c<24;c++){let l=c/24*Z,u=o*1.25+e.H*.5,d=Math.cos(l)*u*s,m=Math.sin(l)*u,h=t(i+d*f-m*p,a+d*p+m*f);n=Math.min(n,h),r+=h/24}y=Ke(n,r,.35)}let x=l?l.capY:y+e.H,S=x-y,C=Z*o*(1+s)*.5,w=Z*(o+S*.8)*(1+s)*.5,T=!!(l||e.far),E=$(Math.ceil(Math.max(C/(l?4.6:T?2.6:1.6),w/(T?8:4.5))/8)*8,32,256),D=o*(1+s)*.5,O=[];if(!e.footFn)for(let e=2;e<=6;e++)O.push({k:e,a:d.lobe*(n()*1.2)/(e*.55),ph:n()*Z});let M=[],N=d.spurs[0]+Math.floor(n()*(d.spurs[1]-d.spurs[0]+1)),P=n()*Z;for(let e=0;e<N;e++){let t=l?_(.1,.22)*o:g?_(.6,1.2)*o:_(.25,.55)*o,r=l?P+(e+.5+(n()-.5)*.55)/N*Z:n()*Z;M.push({a:r,w:t/D,amp:l?_(.06,.16):g?_(.12,.26):_(.05,.14),sp:1})}let F=d.emb[0]+Math.floor(n()*(d.emb[1]-d.emb[0]+1));for(let e=0;e<F;e++)M.push({a:n()*Z,w:_(.15,.35)*o/D,amp:_(.08,.2),sp:0});let I=t=>{if(e.footFn)return e.footFn(t)+.03*r.noise2(Math.cos(t)*3.1,Math.sin(t)*3.1);let n=1;for(let e of O)n+=e.a*Math.cos(e.k*t+e.ph);return n+=.05*r.noise2(Math.cos(t)*2.2,Math.sin(t)*2.2),e.waist&&(n-=e.waist*Math.abs(Math.sin(t))**6),n},L=l?l.tA:_(d.tA[0],d.tA[1]),R=[];if(l){let e=L+(1-L)*_(.28,.38),t=L+(1-L)*_(.6,.7);R.push({t1:e,s:1,ou:0,ov:0,taper:.02,benchH:0}),R.push({t1:t,s:1,ou:0,ov:0,taper:.025,benchH:.05*S}),R.push({t1:1,s:1,ou:0,ov:0,taper:d.taper,benchH:.045*S})}else{let t=e.tiers||2,r=L,i=1,a=0;for(let e=0;e<t;e++){let o=e===t-1?1:r+(1-r)*(u===`mesa`?_(.5,.72):g?_(.78,.9):_(.38,.62)),s=g?e===0?d.taper*_(.8,1.2):.04:d.taper*_(.6,1.3),c=e===0?1:i*(1-a)*_(d.setback[0],d.setback[1]),l=n()*Z,f=e===0||g?0:(1-c/i)*_(.55,.9);R.push({t1:o,s:c,ou:Math.cos(l)*f,ov:Math.sin(l)*f,taper:s,benchH:(g?.035:_(.05,.1))*S}),r=o,i=c,a=s}}let ee=R.length,z=$e(n,S,m*(g?.8:1),L),te=e=>{let t=0,n=z.n-1,r=0;for(;t<=n;){let i=t+n>>1;z.yb[i]<=e?(r=i,t=i+1):n=i-1}return r},ne=l?.7:.9,re=e=>1+Math.round(($(e*ne,-1,1)*.5+.5)*254),ie=[],B=C;for(let e=n()*.3;e<Z-.05;e+=Z*(3+6*n())*h/B){let t=n()<.6,r=t?-1:L+(1-L)*n()*.7;ie.push({a:e,w:Z*(.6+.9*n())*h/B,d:(.4+1.1*n())*h*(g?.4:1),y0:r,y1:t?2:r+.2+.4*n(),lean:(n()-.5)*.05})}let ae=ie.map(()=>{let e=(n()-.45)*.9*h*(g?.4:1),t=new Float32Array(z.npkg);for(let r=0;r<z.npkg;r++)t[r]=e+(n()-.5)*.45*h,n()<.06&&(t[r]-=(1+n())*h);return t}),oe=[],V=d.gully<=0?0:l?N:Math.max(3,Math.round(B/(15*h)));for(let e=0;e<V;e++){let t=l?P+(e+(n()-.5)*.3)/V*Z:(e+.2+.6*n())/V*Z;oe.push({a:t,w:Z*(2.5+5*n())*h/B,d:(2+4.5*n())*h*d.gully,drop:(.6+2*n())*h*d.gully})}let H=new Float32Array(E*X*3),U=new Uint8Array(E*X*4),se=new Float32Array(E*X),W=new Float32Array(E*3),G=new Float32Array(E*4),ce=new Float32Array(E),le=u===`crown`,ue=le?_(.12,.2)*S:(.8+1.2*n())*h*(g?.5:1),de=(.25+.5*n())*h*(g?.8:le?.3:1),fe=le?_(.1,.22)*S:(g?.4:.6+1.2*n())*h,pe=g?_(1.2,1.5):_(1.6,2.1),me=g?1.3:1.8,he=n()*Z,ge=g?_(.01,.045):0,_e=Math.cos(he)*ge,ve=Math.sin(he)*ge,ye=d.flare*S*_(.7,1.3),be=l?o*_(.09,.16):0,xe=l?o*_(.06,.11):0,Se=l?_(.03,.045)*S:0,Ce=l?l.wallMargin:0,we=new Float64Array(ee),Te=[],Ee=e=>{let t=0;for(;t<ee-1&&e>=R[t].t1;)t++;return t};for(let e=0;e<E;e++){let t=e/E*Z,n=I(t),c=Math.cos(t),u=Math.sin(t),m=c*s,_=u,v=m*f-_*p,b=m*p+_*f,C=Math.hypot(v,b);W[e*3]=v/C,W[e*3+1]=b/C,W[e*3+2]=C;let w=0,T=0;for(let e of M){let n=Xe(t,e.a)/e.w;e.sp?w+=e.amp*Je(n):T=Math.max(T,e.amp*Ye(n))}let D=0,O=0,k=0;for(let e of oe){let n=Xe(t,e.a)/e.w;if(Math.abs(n)<1){let t=Ye(n);t>D&&(D=t,O=e.d,k=e.drop)}}let A=$(L+(g?.1:l?.09:.07)*r.noise2(c*1.3+5,u*1.3)+.035*r.noise2(c*4.1-7,u*4.1)+.5*T+(l?.1:.06)*D*D,.08,.72),j=y+A*S;if(l){let t=o*n+Ce+o*w,s=Math.abs(c)**1.5,l=.14*Math.max(0,-(W[e*3]*i+W[e*3+1]*a)/(Math.hypot(i,a)||1)),d=Q(.22,.5,.35*s+l+.65*(.5+.5*r.noise2(c*1.7-3,u*1.7+8))),f=Q(.26,.52,.25*s+l+.75*(.5+.5*r.noise2(c*2.3+14,u*2.3-6)));we[2]=t,we[1]=t+xe*f*(1-.5*D),we[0]=we[1]+be*d*(1-.5*D)}else{let e=Math.max(.3,n+w-T);for(let t=0;t<ee;t++){let n=R[t];we[t]=o*e*n.s*(1+n.ou*c+n.ov*u)}}Te.length=0;for(let e of ie)Math.abs(Xe(t,e.a))<e.w*1.2&&Te.push(e);let N=0;for(let e=0;e<ie.length;e++)ie[e].a<=t&&(N=e);let P=Q(-.1,.45,r.noise2(c*9+3,u*9)*.6+r.noise2(c*23,u*23+7)*.4),F=$(.35+.9*r.noise2(c*2.3+9,u*2.3-4),0,.999),ne=z.capT*Math.floor(F*3)*d.notch,B=Q(-.15,.3,r.noise2(c*3.3-2,u*3.3+6)),V=l||g?0:.11*S*Q(.15,.75,r.noise2(c*1.15+21,u*1.15-13)),le=k*D+ne+V+.25*h*r.noise2(c*3.1+11,u*3.1)+.035*S*Math.max(0,r.noise2(c*1.4-5,u*1.4)),fe=0;if(l){let e=$(.45+.9*r.noise2(c*1.9+31,u*1.9-17)+.14*r.noise2(c*5.3,u*5.3+3),0,.999)*3,t=Math.floor(e),n=Q(.62,1,e-t),i=e=>e<=0?0:e===1?1:1.7;fe=Se*Ke(i(t),i(t+1),t<2?n:0)*(1-Q(.2,.6,D))}ce[e]=fe;let pe=x-le*(l?.35:1)+fe,me=Math.max(1,pe-j),he=Math.max(1,.16*(R[0].t1-A)*S);G[e*4]=D,G[e*4+1]=O,G[e*4+2]=j,G[e*4+3]=w;let ge=r.noise2(c*2.7,u*2.7)*.5+.5,De=Math.max(2,o*(1+s)*.5/2.5),Oe=(g?.12:.34)*h*(1-Math.abs(r.noise2(c*De+17,u*De)))**3,K=ue*(1+1.2*(1-B));for(let n=0;n<Ue;n++){let r=n/45,s=j+me*r,c=(s-y)/S,u=Ee(c),d=R[u],f=u===0?A:R[u-1].t1,p=$((c-f)/Math.max(.02,d.t1-f),0,1),m=we[u]*(1-d.taper*p**1.2),g=1;if(u>0){let e=we[u-1]*(1-R[u-1].taper);g=d.benchH>0?$((s-(y+f*S))/d.benchH,0,1):1,m=Ke(e-.5*h,m,Q(0,1,g)**.7)}else{let e=$(1-(s-j)/he,0,1);m+=ye*e*e}let _=s-y,x=te(_),C=$((_-z.yb[x])/z.th[x],0,1),w=z.amp[x]*(.6+.8*((ge+.37*x)%1));z.hard[x]?m+=w*(.2+.8*Q(0,.1,C))-.12*w*Q(.88,1,C):m-=w*Q(0,.22,C)*(1-Q(.78,1,C)),m+=ae[N][z.pkg[x]],z.massive[x]&&(m-=Oe*(.4+.6*r));let T=0;for(let e=0;e<Te.length;e++){let n=Te[e];if(c<n.y0||c>n.y1)continue;let r=(Xe(t,n.a)-n.lean*(c-A))/n.w;Math.abs(r)>=1||(T=Math.max(T,n.d*(1-r*r)**2*Q(n.y0,n.y0+.04,c)*(1-Q(n.y1-.04,n.y1,c))))}m-=T,m-=O*D*(.35+.65*r)*(l?1:d.s),r>.93&&(m+=de*B*Q(.93,.97,r));let E=pe-K;if(s>E){let e=Math.min(K,s-E);m-=K-Math.sqrt(Math.max(0,K*K-e*e))}m=Math.max(m,o*.15);let k=e*X+He+n,M=s-j;H[k*3]=i+v*m+_e*M,H[k*3+1]=s,H[k*3+2]=a+b*m+ve*M;let F=P*Q(.08,.4,r)*(1-.6*Q(.92,1,r)),I=u>0?.55*(1-Q(0,1,g)):.45*Q(.4,1,1-(s-j)/he);U[k*4]=qe(F),U[k*4+1]=qe(Math.max(I,z.hard[x]&&C>.85?.25:0)),U[k*4+2]=qe(.55*D*Q(.2,.8,r)),U[k*4+3]=re(z.tone[x]),se[k]=(1-.4*Math.min(1,T/(.8*h)))*(1-.3*D*(1-r))*(.7+.3*Q(0,.12,r))}}if(l){let e=new Float32Array(E*X),n=2.5,r=[];for(let e=He;e<54;e+=4)r.push(e);r.push(54);for(let i=0;i<E;i++){let a=W[i*3],o=W[i*3+1],s=-1,c=0;for(let l of r){let r=i*X+l,u=H[r*3],d=H[r*3+1],f=H[r*3+2],p=e=>t(u+a*(e-n),f+o*(e-n))<=d-.4&&t(u+a*e,f+o*e)<=d-1,m=0;if(!p(0)){let e=0,t=48;for(let n=0;n<7;n++){let n=(e+t)/2;p(n)?t=n:e=n}m=t+.5}if(e[r]=m,s>=0)for(let t=s+1;t<l;t++)e[i*X+t]=Math.max(c,m);s=l,c=m}}for(let t=0;t<E;t++){let n=W[t*3],r=W[t*3+1];for(let i=He;i<55;i++){let a=0;for(let n=-1;n<=1;n++){let r=(t+n+E)%E;for(let t=-2;t<=2;t++){let o=i+t;o>=He&&o<55&&(a=Math.max(a,e[r*X+o]*(t===0&&n===0?1:.85)))}}let o=t*X+i;H[o*3]+=n*a,H[o*3+2]+=r*a}}}let De=(l?.05:.04)*S*(g?.25:1),Oe=1/Math.max(4,.3*o),K=0,ke=0;for(let e=0;e<E;e++)ke+=H[(e*X+He+Ue-1)*3+1]-ce[e];ke/=E;for(let e=0;e<E;e++){let n=W[e*3],s=W[e*3+1],c=G[e*4],u=G[e*4+1],d=G[e*4+2],f=G[e*4+3],p=e*X+He,m=H[p*3],_=H[p*3+2],v=(d-y)*pe;for(let e=0;e<2;e++)v=Math.max(2,(d-t(m+n*v,_+s*v))*pe);if(l){let e=4,r=t(m,_),i=Math.min(140,S*.9);for(;e<i;){let i=t(m+n*e,_+s*e);if(i<=y+1.2||i>r+1.2)break;r=Math.min(r,i),e+=4}v=Math.max(v,e*1.04)}let b=(.25*h*(1-c)+.6*f*o*.15)*(g?.5:1),x=e/E*Z,C=Math.cos(x),w=Math.sin(x),T=Math.max(3,D/(l?22:9)),O=(l?.13:.09)*(d-y)*(g?.6:1);for(let i=0;i<He;i++){let a=i===0?1.06:((8-i)/8)**1.1*.97+.012,o=v*a+u*c*.25*Math.max(0,1-a),p=m+n*o,h=_+s*o,g=t(p,h),y;if(i===0)y=l||g<=d?g-1.4:d-1.4;else{let e=(1-a)**me;if(y=Ke(g,d,e),y+=O*r.noise2(C*T+31+a*.7,w*T-17)*Math.sin(Math.PI*Math.min(1,a))**.8,y-=c*u*.35*(1-a)*(1-a),y+=b*r.noise2(p*.12,h*.12)*e*(.5+.5*Math.min(1,f*12)),y=Math.max(y,g+.05),!l&&g>d&&(y=d-.5),l){let e=.15+.65*Q(.55,.2,a);y=Math.max(y,g+e,t(p-n*1.5,h-s*1.5)+e*.4)}}let x=e*X+i;H[x*3]=p,H[x*3+1]=y,H[x*3+2]=h,U[x*4]=0,U[x*4+1]=qe(.18+.82*Math.min(1,a)**1.1),U[x*4+2]=qe(.3*c*Math.max(0,1-a)),U[x*4+3]=re(z.tone[0]),se[x]=.85+.15*Math.min(1,a)}let k=e*X+He+Ue-1,A=H[k*3+1],j=i+_e*(A-d),M=a+ve*(A-d),N=H[k*3]-j,P=H[k*3+2]-M;K+=Math.hypot(N,P);for(let n=0;n<We;n++){let i=Ge[n],a=j+N*i,o=M+P*i,s=Ke(A,ke,1-Q(.62,.92,i))+fe*(1-i*i)-.12*h*(n===0)+.35*h*r.noise2(a*.05,o*.05);s+=De*Q(.25,.65,r.noise2(a*Oe+7.7,o*Oe-3.1))*Q(.97,.8,i),l&&(s=Math.max(s,t(a,o)+1.2));let c=e*X+He+Ue+n;H[c*3]=a,H[c*3+1]=s,H[c*3+2]=o,U[c*4]=0,U[c*4+1]=qe(.35),U[c*4+2]=0,U[c*4+3]=re(.75),se[c]=1}}let Ae=y+L*S,je=[i+_e*(ke-Ae),ke+fe,a+ve*(ke-Ae)];l&&(je[1]=Math.max(je[1],t(i,a)+1.2));let q=new Uint8Array(X);q[0]=q[8]=q[He]=q[54]=q[53]=1;for(let e=55;e<X;e++)q[e]=1;let Me=(e,t)=>{let n=t[e*3]-i,r=t[e*3+2]-a,o=Math.hypot(n,r)||1;return[n/o,0,r/o]},Ne=(e,t)=>({wrap:!0,pole:je,poleC:[0,90,0,re(.75)],colStep:e,rowSel:t,outward:Me,aoMul:se}),Pe=k(H,U,E,X,Ne(2,j(X,2,q))),Fe=[T?Pe:k(H,U,E,X,Ne(1,null)),Pe,k(H,U,E,X,Ne(4,j(X,3,q))),k(H,U,E,X,Ne(8,j(X,5,q)))],Ie=null;if(e.shadowSquash){let t=e.shadowSquash,n=e.shadowBase??y;Ie=Fe[3].clone();let r=Ie.attributes.position.array;for(let e=1;e<r.length;e+=3)r[e]>n&&(r[e]=n+(r[e]-n)*t);Ie.attributes.position.needsUpdate=!0,Ie.computeBoundingBox(),Ie.computeBoundingSphere()}let Le=Fe[0].boundingBox,J=0,Y=Fe[3].attributes.position.array;for(let e=0;e<Y.length;e+=3)J=Math.max(J,Math.hypot(Y[e]-i,Y[e+2]-a));return{lods:Fe,proxy:A(Fe[3]),bvhGeo:Fe[2],shadowGeo:Ie,x:i,z:a,radius:J,core:K/E*.6,top:Le.max.y,bottom:Le.min.y,groundY:y,kind:e.kind}}var tt=.84;function nt(e){let t=[];return e.forEach((e,n)=>{let r=v(777+n*131);if(r()>.6)return;let i=1+ +(r()<.35),a=r()<.5?0:Math.PI;for(let o=0;o<i;o++){let i=a+(r()-.5)*1.6+o*.5,s=Math.cos(e.rot),c=Math.sin(e.rot),l=e.r*1.15+.6*e.h+8+22*r(),u=Math.cos(i)*l*e.e,d=Math.sin(i)*l,f=e.h*(.34+.26*r());t.push({kind:`spire`,x:e.x+u*s-d*c,z:e.z+u*c+d*s,R:f*(.1+.05*r()),H:f,e:1.1+.4*r(),rot:r()*Z,tiers:2,seed:60+n*3+o,far:!0,shadowSquash:tt})}}),t}function rt(e,t,n=null){return e.map((e,r)=>{let i=Math.cos(e.rot),a=Math.sin(e.rot),o=(t,n)=>[e.x+t*e.e*i-n*a,e.z+t*e.e*a+n*i],s=n?t=>{let i=Math.cos(t),a=Math.sin(t),s=1+.16*n.noise2(i*1.6+r*5.1,a*1.6),[c,l]=o(i*e.r*s,a*e.r*s);return s+.07*n.noise2(c*.02,l*.02+r)}:null,c=1e9;for(let n=0;n<24;n++){let r=n/24*Z,i=e.r*1.25+.62*e.h,[a,s]=o(Math.cos(r)*i,Math.sin(r)*i);c=Math.min(c,t(a,s))}let l=-1e9;for(let n=0;n<40;n++){let r=n/40*Z;for(let n of[0,.3,.55,.75]){let[i,a]=o(Math.cos(r)*e.r*n,Math.sin(r)*e.r*n);l=Math.max(l,t(i,a))}}l+=1.6;let u=v(3301+r*57);return{kind:`shell`,x:e.x,z:e.z,R:s?e.r:e.r*.93,H:l-c,e:e.e,rot:e.rot,tiers:2,seed:40+r,footFn:s,shell:{base:c,capY:l,tA:.49+.08*u(),wallMargin:8},shadowSquash:tt,butte:e}})}function it(e,t){let n=[];return e.forEach((e,r)=>{let i=e.butte;if(!i)return;let a=v(5150+r*211);if(a()>.7)return;let o=Math.cos(i.rot),s=Math.sin(i.rot),c=a()<.5?-1:1,l=(.05+.25*a())*i.r*i.e*c,u=(a()-.5)*.3*i.r,d=i.r*(.3+.15*a()),f=1.2+.5*a(),p=i.rot+(a()-.5)*.7,m=i.h*(.18+.08*a()),h=e.shell.base+.84*(e.shell.capY-1.6-e.shell.base),g=!1,_=i.x,y=i.z;for(let e=0;e<8&&!g;e++){_=i.x+l*o-u*s,y=i.z+l*s+u*o,g=!0;let e=d*1.15,n=Math.cos(p),r=Math.sin(p);for(let i=0;i<20&&g;i++){let a=i/20*Z,o=Math.cos(a)*e*f,s=Math.sin(a)*e;t(_+o*n-s*r,y+o*r+s*n)<h&&(g=!1)}g||(l*=.7,d*=.92)}if(!g)return;let b=-1e9;for(let e=0;e<9;e++){let n=e/8*Z,r=e===8?0:d*.7;b=Math.max(b,t(_+Math.cos(n)*r,y+Math.sin(n)*r))}n.push({kind:`crown`,x:_,z:y,R:d,H:m,e:f,rot:p,tiers:a()<.5?2:1,seed:90+r,base:b+.6,far:!0,shadowSquash:tt,shadowBase:e.shell.base})}),n}function at(e){let t=[];return e.forEach((e,n)=>{let r=e.butte;if(!r)return;let i=v(6907+n*173),a=Math.cos(r.rot),o=Math.sin(r.rot),s=Math.sign(r.x*o-r.z*a)||1;for(let c of[-1,1]){if(i()>(r.e>=1.3?.8:.45))continue;let l=r.r*(.24+.12*i()),u=c*(r.r*r.e+r.h*(.3+.25*i())+l*.6),d=s*(.1+.3*i())*r.r,f=r.h*(.5+.2*i());t.push({kind:`butte`,x:r.x+u*a-d*o,z:r.z+u*o+d*a,R:l,H:f,e:1.1+.4*i(),rot:r.rot+(i()-.5)*.9,tiers:i()<.5?3:2,seed:100+n*2+ +(c>0),base:e.shell.base,far:!0,shadowSquash:tt})}}),t}var ot=[5,14,40],st=2.6,ct=[12,34],lt=[45,95],ut=[45,120,320],dt=[380,950,2100],ft=64,pt=16,mt=new d;function ht(e,t){let n=0;for(;n<t.length&&e>=t[n];)n++;return n}function gt(e,t,n,r){let i=new _(Math.max(1,t),1,1,n);return i.name=r,i.geometry=e.geometry,i._geometryInfo=e._geometryInfo,i._geometryCount=e._geometryCount,i._geometryInitialized=!0,i._maxVertexCount=e._maxVertexCount,i._maxIndexCount=e._maxIndexCount,i._nextVertexStart=e._nextVertexStart,i._nextIndexStart=e._nextIndexStart,i}async function _t(e){let{scene:t,camera:n,collision:r,LAYERS:i,progress:a,yieldFrame:o,hf:s}=e,c=performance.now(),l={},u=c,d=e=>{let t=performance.now();l[e]=Math.round(t-u),u=t},f=T(s),p=await ie(4242,o,e=>a(.3*e,`Shaping boulders`)),m=new se(p);d(`library`),a(.32,`Raising the escarpment`),await o();let h=p.variants.map(e=>({lods:e.lods,proxyPos:e.proxyPos,proxy1:e.proxy[1],family:e.family})),v=[],y=(e,t)=>{let n=m.addShape(e.bvhGeo);h[n]={lods:e.lods,uniqueProxy:e.proxy,family:`unique`,shadowGeo:e.shadowGeo||null};let r=e.lods[0].boundingBox,i={kind:`strata`,group:t.group,vi:n,unique:!0,lodTable:t.lodTable,x:e.x,y:0,z:e.z,radius:e.radius,core:e.core||0,top:e.top,bottom:e.bottom,height:e.top-e.groundY,groundY:-100,submerged:!1,box:[r.min.x,r.max.x,r.min.y,r.max.y,r.min.z,r.max.z],matrix:mt,inv:mt,big:!0,collide:t.collide!==!1,tint:t.tint??1,warmth:t.warmth??.1,cliffBlend:t.cliffBlend??.85,seed:t.seed,moss:.02,wetBoost:0,varnish:t.varnish??.8,dust:t.dust??.8,band:t.band??.3,lichen:t.lichen??.45,talus:t.talus??0};return m.add(i),v.push(i),i},b=null;try{b=Ve(e,f),b.segments.forEach((e,t)=>y(e,{group:`cliff`,lodTable:ut,seed:(t*.37+.11)%1,varnish:.85,dust:.85,band:.3,warmth:.05}))}catch(e){console.warn(`[lagoon] rocks: escarpment failed`,e)}d(`escarpment`),await o(),a(.4,`Eroding the buttes`);let C=[];for(let e=0;e<Ze.length;e++){let t=Ze[e],n=et(t,f),r=y(n,{group:`outcrop`,lodTable:dt,seed:(e*.29+.07)%1,warmth:.25+.4*(e*.53%1),tint:.95+.1*(e*.71%1),dust:.95,talus:1});r.formationKind=t.kind,C.push({x:n.x,z:n.z,radius:n.radius,kind:t.kind}),e%3==2&&await o()}if(Array.isArray(S)&&S.length){let e=rt(S,f,x||null),t=[...e,...it(e,f),...at(e),...nt(S)];for(let e=0;e<t.length;e++)y(et(t[e],f),{group:`butte`,lodTable:dt,seed:(e*.41+.19)%1,warmth:.35+.35*(e*.37%1),dust:.95,talus:1}),e%3==2&&await o()}d(`formations`),a(.55,`Placing rocks`),await o();let w=await be(e,p,m,async e=>{a(.55+.25*e,`Placing rocks`),await o()},{escarpment:b,formations:C}),E=[...v,...w];d(`place`);let D=E.filter(e=>e.big),O=E.filter(e=>!e.big),k=[],A=0,j=0,M=e=>{k.push(e),A+=e.attributes.position.count,j+=e.index.count},N=new Set,P=e=>{N.has(e)||(N.add(e),M(e))};for(let e of h){for(let t of e.lods)P(t);e.proxy1&&P(e.proxy1),e.shadowGeo&&P(e.shadowGeo)}let F=Se(D.length),I=Se(O.length),L=ke(e,F,`rocks-big`,{aux:!0}),R=ke(e,I,`rocks-small`,{aux:!0}),ee=new _(1,A,j,L);ee.name=`rocks-store`;let z=new Map,te=e=>(z.has(e)||z.set(e,ee.addGeometry(e)),z.get(e));for(let e of h)e.gids=e.lods.map(te),e.proxy1&&(e.gidProxy1=te(e.proxy1)),e.shadowGeo&&(e.gidShadowGeo=te(e.shadowGeo));let ne=(e,t,n)=>`${Math.floor(e/n)},${Math.floor(t/n)}`,re=new Map;for(let e of D){if(e.group===`outcrop`||e.group===`butte`)continue;let t=ne(e.x,e.z,ft);re.set(t,(re.get(t)||0)+1)}let B=new Map;for(let e of D){let t;e.unique&&(e.group===`outcrop`||e.group===`butte`)?t=`far`:(t=ne(e.x,e.z,ft),(re.get(t)||0)<pt&&(t=`outer`)),B.has(t)||B.set(t,[]),B.get(t).push(e)}let ae=[],oe=0;for(let[e,n]of B){let r=gt(ee,oe+n.length,L,`rocks-big:`+e);for(let e=0;e<oe;e++)r.addInstance(0);for(let e of n){let t=h[e.vi].gids,n=r.addInstance(t[t.length-1]);r.setMatrixAt(n,e.matrix),Ce(F,n,e),e._mesh=r,e._id=n,e._lod=-1}for(let e=0;e<oe;e++)r.deleteInstance(e);oe+=n.length,r.castShadow=!0,r.receiveShadow=!0,r.computeBoundingBox(),r.computeBoundingSphere(),r.userData.recs=n,t.add(r),ae.push(r)}F.needsUpdate=!0;let V=gt(ee,O.length,R,`rocks-small`),H=e=>{let t=h[e.vi];return t.family===`pebble`?[t.gids[1],t.gids[2],t.gids[3]]:[t.gids[2],t.gids[3],t.gidProxy1]};for(let e of O){e._sg=H(e);let t=V.addInstance(e._sg[2]);V.setMatrixAt(t,e.matrix),Ce(I,t,e),e._mesh=V,e._id=t,e._lod=-1}I.needsUpdate=!0,V.computeBoundingBox(),V.computeBoundingSphere(),V.castShadow=!1,V.receiveShadow=!0,V.layers.set(i.NO_REFLECT),t.add(V),d(`batch`),a(.88,`Placing rocks`),await o();let U=0;for(let e of E){if(!e.collide)continue;let t=h[e.vi];t.uniqueProxy?r.addGeometry(t.uniqueProxy,null,`solid`):r.addGeometry(t.proxyPos[e.proxyDetail],e.matrix,`solid`),U++}d(`collision`);let W=new g(1e9,0,0),G=new g;function ce(e){if(e.unique){let t=e.box,n=Math.max(0,t[0]-G.x,G.x-t[1]),r=Math.max(0,t[2]-G.y,G.y-t[3]),i=Math.max(0,t[4]-G.z,G.z-t[5]);return ht(Math.sqrt(n*n+r*r+i*i),e.lodTable)}let t=e.x-G.x,n=(e.top+e.bottom)*.5-G.y,r=e.z-G.z,i=Math.sqrt(t*t+n*n+r*r),a=Math.max(e.radius,.3),o=Math.min(a,st),s=ht(i/a,ot);return i>ot[0]*o&&s<1&&(s=1),i>ot[1]*o*2.2&&s<2&&(s=2),s}function le(e){if(n.getWorldPosition(G),!(!e&&G.distanceToSquared(W)<.5)){W.copy(G);for(let e=0;e<D.length;e++){let t=D[e],n=ce(t);if(n!==t._lod){let e=h[t.vi],r=e.gids;t._mesh.setGeometryIdAt(t._id,r[n]),t._lod=n,t._gid=r[n],t._gidShadow=e.gidShadowGeo??r[Math.min(n+1,3)]}}for(let e=0;e<O.length;e++){let t=O[e],n=t.x-G.x,r=t.top-G.y,i=t.z-G.z,a=Math.sqrt(n*n+r*r+i*i),o=a<lt[0]+lt[1]*t.radius?ht(a/Math.max(t.radius,.1),ct):-2;o!==t._lod&&(o===-2?V.setVisibleAt(t._id,!1):(t._lod===-2&&V.setVisibleAt(t._id,!0),V.setGeometryIdAt(t._id,t._sg[o])),t._lod=o)}}}le(!0);let ue=_.prototype.onBeforeShadow;for(let e of ae){let t=e.userData.recs;e.onBeforeShadow=function(e,n,r,i,a,o,s){for(let e=0;e<t.length;e++){let n=t[e];n._gidShadow!==n._gid&&this.setGeometryIdAt(n._id,n._gidShadow)}this.sortObjects=!1,ue.call(this,e,n,r,i,a,o,s),this.sortObjects=!0;for(let e=0;e<t.length;e++){let n=t[e];n._gidShadow!==n._gid&&this.setGeometryIdAt(n._id,n._gid)}}}let de=e.params?.has?.(`rockstats`),fe=0;function pe(e){let t=0;for(let n=0;n<e._multiDrawCount;n++)t+=e._multiDrawCounts[n];return{inst:e._multiDrawCount,tris:Math.round(t/3)}}let me=E.map(e=>({x:e.x,y:e.y,z:e.z,radius:e.radius,height:e.height,top:e.top,bottom:e.bottom,kind:e.kind,group:e.group,submerged:e.submerged,unique:!!e.unique})),he=0;for(let e of k)he+=e.index.count/3;return l.total=Math.round(performance.now()-c),console.log(`[lagoon] rocks: ${w.length} rocks (${D.length-v.length} big / ${O.length} small) + ${b?b.segments.length:0} wall segments + ${v.length-(b?b.segments.length:0)} formations, ${ae.length} big chunks, ${U} colliders, store ${Math.round(A/1e3)}k verts / ${Math.round(he/1e3)}k tris, built in ${l.total} ms ${JSON.stringify(l)}`),{list:me,raycastDown(e,t){return m.raycastDown(e,t)},isRock(e,t,n=0){return m.isRock(e,t,n)},blocked(e,t,n){return m.isRock(e,t,n||0)},near(e,t,n,r){return m.near(e,t,n,r)},meshes:{big:ae,small:V},timings:l,update(){if(le(!1),de&&++fe%10==0){let e=0,t=0,n=0;for(let r of ae){let i=pe(r);e+=i.inst,t+=i.tris,i.inst&&n++}let r=pe(V);console.log(`[lagoon] rockstats big ${n}/${ae.length} chunks ${e} inst ${t} tris | small ${r.inst} inst ${r.tris} tris`)}},order:-5}}export{_t as build};