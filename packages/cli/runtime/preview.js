var Di={LEFT:0,MIDDLE:1,RIGHT:2,ROTATE:0,DOLLY:1,PAN:2},Ni={ROTATE:0,PAN:1,DOLLY_PAN:2,DOLLY_ROTATE:3},jh=0,xl=1,Jh=2;var hi=1,Qh=2,Js=3,vn=0,zt=1,on=2,Hn=0,Qs=1,yl=2,vl=3,Ml=4,eu=5;var as=100,tu=101,nu=102,iu=103,su=104,ru=200,ou=201,au=202,cu=203,bl=204,Sl=205,lu=206,hu=207,uu=208,du=209,fu=210,pu=211,mu=212,gu=213,_u=214,$o=0,jo=1,Jo=2,Os=3,Qo=4,ea=5,ta=6,na=7,Qr=0,xu=1,yu=2,Ln=0,wl=1,Tl=2,Al=3,cs=4,El=5,Rl=6,Cl=7,ll="attached",vu="detached",Il=300,Ui=301,ls=302,Aa=303,Ea=304,eo=306,Ai=1e3,_n=1001,Fs=1002,Mt=1003,Ra=1004;var hs=1005;var gt=1006,er=1007;var un=1008;var Xt=1009,Pl=1010,Ll=1011,tr=1012,Ca=1013,Dn=1014,dn=1015,Nn=1016,Ia=1017,Pa=1018,nr=1020,Dl=35902,Nl=35899,Ul=1021,Ol=1022,fn=1023,kn=1026,Oi=1027,ir=1028,La=1029,Fi=1030,Da=1031;var Na=1033,to=33776,no=33777,io=33778,so=33779,Ua=35840,Oa=35841,Fa=35842,Ba=35843,ka=36196,za=37492,Ha=37496,Va=37488,Ga=37489,ro=37490,Wa=37491,Xa=37808,qa=37809,Ya=37810,Za=37811,Ka=37812,$a=37813,ja=37814,Ja=37815,Qa=37816,ec=37817,tc=37818,nc=37819,ic=37820,sc=37821,rc=36492,oc=36494,ac=36495,cc=36283,lc=36284,oo=36285,hc=36286,Mu=2200,bu=2201,Su=2202,Ki=2300,$i=2301,Yo=2302,hl=2303,Yi=2400,Zi=2401,Rr=2402,uc=2500,wu=2501,Fl=0,ao=1,sr=2,Tu=3200,Bl=3201;var ui=0,Au=1,di="",Ct="srgb",$t="srgb-linear",Cr="linear",Je="srgb";var Zo=7680;var Eu=519,Ru=512,Cu=513,Iu=514,dc=515,Pu=516,Lu=517,fc=518,Du=519,kl=35044;var zl="300 es",Rn=2e3,Bs=2001;function lf(i){for(let e=i.length-1;e>=0;--e)if(i[e]>=65535)return!0;return!1}function hf(i){return ArrayBuffer.isView(i)&&!(i instanceof DataView)}function ks(i){return document.createElementNS("http://www.w3.org/1999/xhtml",i)}function Nu(){let i=ks("canvas");return i.style.display="block",i}var fh={},zs=null;function Ir(...i){let e="THREE."+i.shift();zs?zs("log",e,...i):console.log(e,...i)}function Uu(i){let e=i[0];if(typeof e=="string"&&e.startsWith("TSL:")){let t=i[1];t&&t.isStackTrace?i[0]+=" "+t.getLocation():i[1]='Stack trace not available. Enable "THREE.Node.captureStackTrace" to capture stack traces.'}return i}function Ae(...i){i=Uu(i);let e="THREE."+i.shift();if(zs)zs("warn",e,...i);else{let t=i[0];t&&t.isStackTrace?console.warn(t.getError(e)):console.warn(e,...i)}}function Pe(...i){i=Uu(i);let e="THREE."+i.shift();if(zs)zs("error",e,...i);else{let t=i[0];t&&t.isStackTrace?console.error(t.getError(e)):console.error(e,...i)}}function Ti(...i){let e=i.join(" ");e in fh||(fh[e]=!0,Ae(...i))}function Ou(i,e,t){return new Promise(function(n,s){function r(){switch(i.clientWaitSync(e,i.SYNC_FLUSH_COMMANDS_BIT,0)){case i.WAIT_FAILED:s();break;case i.TIMEOUT_EXPIRED:setTimeout(r,t);break;default:n()}}setTimeout(r,t)})}var Fu={[$o]:jo,[Jo]:ta,[Qo]:na,[Os]:ea,[jo]:$o,[ta]:Jo,[na]:Qo,[ea]:Os},xn=class{addEventListener(e,t){this._listeners===void 0&&(this._listeners={});let n=this._listeners;n[e]===void 0&&(n[e]=[]),n[e].indexOf(t)===-1&&n[e].push(t)}hasEventListener(e,t){let n=this._listeners;return n===void 0?!1:n[e]!==void 0&&n[e].indexOf(t)!==-1}removeEventListener(e,t){let n=this._listeners;if(n===void 0)return;let s=n[e];if(s!==void 0){let r=s.indexOf(t);r!==-1&&s.splice(r,1)}}dispatchEvent(e){let t=this._listeners;if(t===void 0)return;let n=t[e.type];if(n!==void 0){e.target=this;let s=n.slice(0);for(let r=0,o=s.length;r<o;r++)s[r].call(this,e);e.target=null}}},Gt=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"],ph=1234567,Ar=Math.PI/180,ji=180/Math.PI;function Cn(){let i=Math.random()*4294967295|0,e=Math.random()*4294967295|0,t=Math.random()*4294967295|0,n=Math.random()*4294967295|0;return(Gt[i&255]+Gt[i>>8&255]+Gt[i>>16&255]+Gt[i>>24&255]+"-"+Gt[e&255]+Gt[e>>8&255]+"-"+Gt[e>>16&15|64]+Gt[e>>24&255]+"-"+Gt[t&63|128]+Gt[t>>8&255]+"-"+Gt[t>>16&255]+Gt[t>>24&255]+Gt[n&255]+Gt[n>>8&255]+Gt[n>>16&255]+Gt[n>>24&255]).toLowerCase()}function ke(i,e,t){return Math.max(e,Math.min(t,i))}function Hl(i,e){return(i%e+e)%e}function uf(i,e,t,n,s){return n+(i-e)*(s-n)/(t-e)}function df(i,e,t){return i!==e?(t-i)/(e-i):0}function Er(i,e,t){return(1-t)*i+t*e}function ff(i,e,t,n){return Er(i,e,1-Math.exp(-t*n))}function pf(i,e=1){return e-Math.abs(Hl(i,e*2)-e)}function mf(i,e,t){return i<=e?0:i>=t?1:(i=(i-e)/(t-e),i*i*(3-2*i))}function gf(i,e,t){return i<=e?0:i>=t?1:(i=(i-e)/(t-e),i*i*i*(i*(i*6-15)+10))}function _f(i,e){return i+Math.floor(Math.random()*(e-i+1))}function xf(i,e){return i+Math.random()*(e-i)}function yf(i){return i*(.5-Math.random())}function vf(i){i!==void 0&&(ph=i);let e=ph+=1831565813;return e=Math.imul(e^e>>>15,e|1),e^=e+Math.imul(e^e>>>7,e|61),((e^e>>>14)>>>0)/4294967296}function Mf(i){return i*Ar}function bf(i){return i*ji}function Sf(i){return i>0&&Number.isInteger(i)&&2**Math.round(Math.log2(i))===i}function wf(i){return Math.pow(2,Math.ceil(Math.log(i)/Math.LN2))}function Tf(i){return Math.pow(2,Math.floor(Math.log(i)/Math.LN2))}function Af(i,e,t,n,s){let r=Math.cos,o=Math.sin,a=r(t/2),c=o(t/2),l=r((e+n)/2),h=o((e+n)/2),d=r((e-n)/2),u=o((e-n)/2),p=r((n-e)/2),g=o((n-e)/2);switch(s){case"XYX":i.set(a*h,c*d,c*u,a*l);break;case"YZY":i.set(c*u,a*h,c*d,a*l);break;case"ZXZ":i.set(c*d,c*u,a*h,a*l);break;case"XZX":i.set(a*h,c*g,c*p,a*l);break;case"YXY":i.set(c*p,a*h,c*g,a*l);break;case"ZYZ":i.set(c*g,c*p,a*h,a*l);break;default:Ae("MathUtils: .setQuaternionFromProperEuler() encountered an unknown order: "+s)}}function En(i,e){switch(e.constructor){case Float32Array:return i;case Uint32Array:return i/4294967295;case Uint16Array:return i/65535;case Uint8Array:case Uint8ClampedArray:return i/255;case Int32Array:return Math.max(i/2147483647,-1);case Int16Array:return Math.max(i/32767,-1);case Int8Array:return Math.max(i/127,-1);default:throw new Error("THREE.MathUtils: Invalid component type.")}}function et(i,e){switch(e.constructor){case Float32Array:return i;case Uint32Array:return Math.round(i*4294967295);case Uint16Array:return Math.round(i*65535);case Uint8Array:case Uint8ClampedArray:return Math.round(i*255);case Int32Array:return Math.round(i*2147483647);case Int16Array:return Math.round(i*32767);case Int8Array:return Math.round(i*127);default:throw new Error("THREE.MathUtils: Invalid component type.")}}var co={DEG2RAD:Ar,RAD2DEG:ji,generateUUID:Cn,clamp:ke,euclideanModulo:Hl,mapLinear:uf,inverseLerp:df,lerp:Er,damp:ff,pingpong:pf,smoothstep:mf,smootherstep:gf,randInt:_f,randFloat:xf,randFloatSpread:yf,seededRandom:vf,degToRad:Mf,radToDeg:bf,isPowerOfTwo:Sf,ceilPowerOfTwo:wf,floorPowerOfTwo:Tf,setQuaternionFromProperEuler:Af,normalize:et,denormalize:En},we=class i{static{i.prototype.isVector2=!0}constructor(e=0,t=0){this.x=e,this.y=t}get width(){return this.x}set width(e){this.x=e}get height(){return this.y}set height(e){this.y=e}set(e,t){return this.x=e,this.y=t,this}setScalar(e){return this.x=e,this.y=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;default:throw new Error("THREE.Vector2: index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;default:throw new Error("THREE.Vector2: index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y)}copy(e){return this.x=e.x,this.y=e.y,this}add(e){return this.x+=e.x,this.y+=e.y,this}addScalar(e){return this.x+=e,this.y+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this}subScalar(e){return this.x-=e,this.y-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this}multiply(e){return this.x*=e.x,this.y*=e.y,this}multiplyScalar(e){return this.x*=e,this.y*=e,this}divide(e){return this.x/=e.x,this.y/=e.y,this}divideScalar(e){return this.multiplyScalar(1/e)}applyMatrix3(e){let t=this.x,n=this.y,s=e.elements;return this.x=s[0]*t+s[3]*n+s[6],this.y=s[1]*t+s[4]*n+s[7],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this}clamp(e,t){return this.x=ke(this.x,e.x,t.x),this.y=ke(this.y,e.y,t.y),this}clampScalar(e,t){return this.x=ke(this.x,e,t),this.y=ke(this.y,e,t),this}clampLength(e,t){let n=this.length();return this.divideScalar(n||1).multiplyScalar(ke(n,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(e){return this.x*e.x+this.y*e.y}cross(e){return this.x*e.y-this.y*e.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(e){let t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;let n=this.dot(e)/t;return Math.acos(ke(n,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){let t=this.x-e.x,n=this.y-e.y;return t*t+n*n}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this}equals(e){return e.x===this.x&&e.y===this.y}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this}rotateAround(e,t){let n=Math.cos(t),s=Math.sin(t),r=this.x-e.x,o=this.y-e.y;return this.x=r*n-o*s+e.x,this.y=r*s+o*n+e.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}},It=class{constructor(e=0,t=0,n=0,s=1){this.isQuaternion=!0,this._x=e,this._y=t,this._z=n,this._w=s}static slerpFlat(e,t,n,s,r,o,a){let c=n[s+0],l=n[s+1],h=n[s+2],d=n[s+3],u=r[o+0],p=r[o+1],g=r[o+2],b=r[o+3];if(d!==b||c!==u||l!==p||h!==g){let m=c*u+l*p+h*g+d*b;m<0&&(u=-u,p=-p,g=-g,b=-b,m=-m);let f=1-a;if(m<.9995){let v=Math.acos(m),T=Math.sin(v);f=Math.sin(f*v)/T,a=Math.sin(a*v)/T,c=c*f+u*a,l=l*f+p*a,h=h*f+g*a,d=d*f+b*a}else{c=c*f+u*a,l=l*f+p*a,h=h*f+g*a,d=d*f+b*a;let v=1/Math.sqrt(c*c+l*l+h*h+d*d);c*=v,l*=v,h*=v,d*=v}}e[t]=c,e[t+1]=l,e[t+2]=h,e[t+3]=d}static multiplyQuaternionsFlat(e,t,n,s,r,o){let a=n[s],c=n[s+1],l=n[s+2],h=n[s+3],d=r[o],u=r[o+1],p=r[o+2],g=r[o+3];return e[t]=a*g+h*d+c*p-l*u,e[t+1]=c*g+h*u+l*d-a*p,e[t+2]=l*g+h*p+a*u-c*d,e[t+3]=h*g-a*d-c*u-l*p,e}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get w(){return this._w}set w(e){this._w=e,this._onChangeCallback()}set(e,t,n,s){return this._x=e,this._y=t,this._z=n,this._w=s,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(e){return this._x=e.x,this._y=e.y,this._z=e.z,this._w=e.w,this._onChangeCallback(),this}setFromEuler(e,t=!0){let n=e._x,s=e._y,r=e._z,o=e._order,a=Math.cos,c=Math.sin,l=a(n/2),h=a(s/2),d=a(r/2),u=c(n/2),p=c(s/2),g=c(r/2);switch(o){case"XYZ":this._x=u*h*d+l*p*g,this._y=l*p*d-u*h*g,this._z=l*h*g+u*p*d,this._w=l*h*d-u*p*g;break;case"YXZ":this._x=u*h*d+l*p*g,this._y=l*p*d-u*h*g,this._z=l*h*g-u*p*d,this._w=l*h*d+u*p*g;break;case"ZXY":this._x=u*h*d-l*p*g,this._y=l*p*d+u*h*g,this._z=l*h*g+u*p*d,this._w=l*h*d-u*p*g;break;case"ZYX":this._x=u*h*d-l*p*g,this._y=l*p*d+u*h*g,this._z=l*h*g-u*p*d,this._w=l*h*d+u*p*g;break;case"YZX":this._x=u*h*d+l*p*g,this._y=l*p*d+u*h*g,this._z=l*h*g-u*p*d,this._w=l*h*d-u*p*g;break;case"XZY":this._x=u*h*d-l*p*g,this._y=l*p*d-u*h*g,this._z=l*h*g+u*p*d,this._w=l*h*d+u*p*g;break;default:Ae("Quaternion: .setFromEuler() encountered an unknown order: "+o)}return t===!0&&this._onChangeCallback(),this}setFromAxisAngle(e,t){let n=t/2,s=Math.sin(n);return this._x=e.x*s,this._y=e.y*s,this._z=e.z*s,this._w=Math.cos(n),this._onChangeCallback(),this}setFromRotationMatrix(e){let t=e.elements,n=t[0],s=t[4],r=t[8],o=t[1],a=t[5],c=t[9],l=t[2],h=t[6],d=t[10],u=n+a+d;if(u>0){let p=.5/Math.sqrt(u+1);this._w=.25/p,this._x=(h-c)*p,this._y=(r-l)*p,this._z=(o-s)*p}else if(n>a&&n>d){let p=2*Math.sqrt(1+n-a-d);this._w=(h-c)/p,this._x=.25*p,this._y=(s+o)/p,this._z=(r+l)/p}else if(a>d){let p=2*Math.sqrt(1+a-n-d);this._w=(r-l)/p,this._x=(s+o)/p,this._y=.25*p,this._z=(c+h)/p}else{let p=2*Math.sqrt(1+d-n-a);this._w=(o-s)/p,this._x=(r+l)/p,this._y=(c+h)/p,this._z=.25*p}return this._onChangeCallback(),this}setFromUnitVectors(e,t){let n=e.dot(t)+1;return n<1e-8?(n=0,Math.abs(e.x)>Math.abs(e.z)?(this._x=-e.y,this._y=e.x,this._z=0,this._w=n):(this._x=0,this._y=-e.z,this._z=e.y,this._w=n)):(this._x=e.y*t.z-e.z*t.y,this._y=e.z*t.x-e.x*t.z,this._z=e.x*t.y-e.y*t.x,this._w=n),this.normalize()}angleTo(e){return 2*Math.acos(Math.abs(ke(this.dot(e),-1,1)))}rotateTowards(e,t){let n=this.angleTo(e);if(n===0)return this;let s=Math.min(1,t/n);return this.slerp(e,s),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(e){return this._x*e._x+this._y*e._y+this._z*e._z+this._w*e._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let e=this.length();return e===0?(this._x=0,this._y=0,this._z=0,this._w=1):(e=1/e,this._x=this._x*e,this._y=this._y*e,this._z=this._z*e,this._w=this._w*e),this._onChangeCallback(),this}multiply(e){return this.multiplyQuaternions(this,e)}premultiply(e){return this.multiplyQuaternions(e,this)}multiplyQuaternions(e,t){let n=e._x,s=e._y,r=e._z,o=e._w,a=t._x,c=t._y,l=t._z,h=t._w;return this._x=n*h+o*a+s*l-r*c,this._y=s*h+o*c+r*a-n*l,this._z=r*h+o*l+n*c-s*a,this._w=o*h-n*a-s*c-r*l,this._onChangeCallback(),this}slerp(e,t){let n=e._x,s=e._y,r=e._z,o=e._w,a=this.dot(e);a<0&&(n=-n,s=-s,r=-r,o=-o,a=-a);let c=1-t;if(a<.9995){let l=Math.acos(a),h=Math.sin(l);c=Math.sin(c*l)/h,t=Math.sin(t*l)/h,this._x=this._x*c+n*t,this._y=this._y*c+s*t,this._z=this._z*c+r*t,this._w=this._w*c+o*t,this._onChangeCallback()}else this._x=this._x*c+n*t,this._y=this._y*c+s*t,this._z=this._z*c+r*t,this._w=this._w*c+o*t,this.normalize();return this}slerpQuaternions(e,t,n){return this.copy(e).slerp(t,n)}random(){let e=2*Math.PI*Math.random(),t=2*Math.PI*Math.random(),n=Math.random(),s=Math.sqrt(1-n),r=Math.sqrt(n);return this.set(s*Math.sin(e),s*Math.cos(e),r*Math.sin(t),r*Math.cos(t))}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._w===this._w}fromArray(e,t=0){return this._x=e[t],this._y=e[t+1],this._z=e[t+2],this._w=e[t+3],this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._w,e}fromBufferAttribute(e,t){return this._x=e.getX(t),this._y=e.getY(t),this._z=e.getZ(t),this._w=e.getW(t),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}},N=class i{static{i.prototype.isVector3=!0}constructor(e=0,t=0,n=0){this.x=e,this.y=t,this.z=n}set(e,t,n){return n===void 0&&(n=this.z),this.x=e,this.y=t,this.z=n,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;default:throw new Error("THREE.Vector3: index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("THREE.Vector3: index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this}multiplyVectors(e,t){return this.x=e.x*t.x,this.y=e.y*t.y,this.z=e.z*t.z,this}applyEuler(e){return this.applyQuaternion(mh.setFromEuler(e))}applyAxisAngle(e,t){return this.applyQuaternion(mh.setFromAxisAngle(e,t))}applyMatrix3(e){let t=this.x,n=this.y,s=this.z,r=e.elements;return this.x=r[0]*t+r[3]*n+r[6]*s,this.y=r[1]*t+r[4]*n+r[7]*s,this.z=r[2]*t+r[5]*n+r[8]*s,this}applyNormalMatrix(e){return this.applyMatrix3(e).normalize()}applyMatrix4(e){let t=this.x,n=this.y,s=this.z,r=e.elements,o=1/(r[3]*t+r[7]*n+r[11]*s+r[15]);return this.x=(r[0]*t+r[4]*n+r[8]*s+r[12])*o,this.y=(r[1]*t+r[5]*n+r[9]*s+r[13])*o,this.z=(r[2]*t+r[6]*n+r[10]*s+r[14])*o,this}applyQuaternion(e){let t=this.x,n=this.y,s=this.z,r=e.x,o=e.y,a=e.z,c=e.w,l=2*(o*s-a*n),h=2*(a*t-r*s),d=2*(r*n-o*t);return this.x=t+c*l+o*d-a*h,this.y=n+c*h+a*l-r*d,this.z=s+c*d+r*h-o*l,this}project(e){return this.applyMatrix4(e.matrixWorldInverse).applyMatrix4(e.projectionMatrix)}unproject(e){return this.applyMatrix4(e.projectionMatrixInverse).applyMatrix4(e.matrixWorld)}transformDirection(e){let t=this.x,n=this.y,s=this.z,r=e.elements;return this.x=r[0]*t+r[4]*n+r[8]*s,this.y=r[1]*t+r[5]*n+r[9]*s,this.z=r[2]*t+r[6]*n+r[10]*s,this.normalize()}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this}divideScalar(e){return this.multiplyScalar(1/e)}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this}clamp(e,t){return this.x=ke(this.x,e.x,t.x),this.y=ke(this.y,e.y,t.y),this.z=ke(this.z,e.z,t.z),this}clampScalar(e,t){return this.x=ke(this.x,e,t),this.y=ke(this.y,e,t),this.z=ke(this.z,e,t),this}clampLength(e,t){let n=this.length();return this.divideScalar(n||1).multiplyScalar(ke(n,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this.z=e.z+(t.z-e.z)*n,this}cross(e){return this.crossVectors(this,e)}crossVectors(e,t){let n=e.x,s=e.y,r=e.z,o=t.x,a=t.y,c=t.z;return this.x=s*c-r*a,this.y=r*o-n*c,this.z=n*a-s*o,this}projectOnVector(e){let t=e.lengthSq();if(t===0)return this.set(0,0,0);let n=e.dot(this)/t;return this.copy(e).multiplyScalar(n)}projectOnPlane(e){return kc.copy(this).projectOnVector(e),this.sub(kc)}reflect(e){return this.sub(kc.copy(e).multiplyScalar(2*this.dot(e)))}angleTo(e){let t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;let n=this.dot(e)/t;return Math.acos(ke(n,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){let t=this.x-e.x,n=this.y-e.y,s=this.z-e.z;return t*t+n*n+s*s}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)+Math.abs(this.z-e.z)}setFromSpherical(e){return this.setFromSphericalCoords(e.radius,e.phi,e.theta)}setFromSphericalCoords(e,t,n){let s=Math.sin(t)*e;return this.x=s*Math.sin(n),this.y=Math.cos(t)*e,this.z=s*Math.cos(n),this}setFromCylindrical(e){return this.setFromCylindricalCoords(e.radius,e.theta,e.y)}setFromCylindricalCoords(e,t,n){return this.x=e*Math.sin(t),this.y=n,this.z=e*Math.cos(t),this}setFromMatrixPosition(e){let t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this}setFromMatrixScale(e){let t=this.setFromMatrixColumn(e,0).length(),n=this.setFromMatrixColumn(e,1).length(),s=this.setFromMatrixColumn(e,2).length();return this.x=t,this.y=n,this.z=s,this}setFromMatrixColumn(e,t){return this.fromArray(e.elements,t*4)}setFromMatrix3Column(e,t){return this.fromArray(e.elements,t*3)}setFromEuler(e){return this.x=e._x,this.y=e._y,this.z=e._z,this}setFromColor(e){return this.x=e.r,this.y=e.g,this.z=e.b,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){let e=Math.random()*Math.PI*2,t=Math.random()*2-1,n=Math.sqrt(1-t*t);return this.x=n*Math.cos(e),this.y=t,this.z=n*Math.sin(e),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}},kc=new N,mh=new It,Le=class i{static{i.prototype.isMatrix3=!0}constructor(e,t,n,s,r,o,a,c,l){this.elements=[1,0,0,0,1,0,0,0,1],e!==void 0&&this.set(e,t,n,s,r,o,a,c,l)}set(e,t,n,s,r,o,a,c,l){let h=this.elements;return h[0]=e,h[1]=s,h[2]=a,h[3]=t,h[4]=r,h[5]=c,h[6]=n,h[7]=o,h[8]=l,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(e){let t=this.elements,n=e.elements;return t[0]=n[0],t[1]=n[1],t[2]=n[2],t[3]=n[3],t[4]=n[4],t[5]=n[5],t[6]=n[6],t[7]=n[7],t[8]=n[8],this}extractBasis(e,t,n){return e.setFromMatrix3Column(this,0),t.setFromMatrix3Column(this,1),n.setFromMatrix3Column(this,2),this}setFromMatrix4(e){let t=e.elements;return this.set(t[0],t[4],t[8],t[1],t[5],t[9],t[2],t[6],t[10]),this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){let n=e.elements,s=t.elements,r=this.elements,o=n[0],a=n[3],c=n[6],l=n[1],h=n[4],d=n[7],u=n[2],p=n[5],g=n[8],b=s[0],m=s[3],f=s[6],v=s[1],T=s[4],y=s[7],S=s[2],w=s[5],R=s[8];return r[0]=o*b+a*v+c*S,r[3]=o*m+a*T+c*w,r[6]=o*f+a*y+c*R,r[1]=l*b+h*v+d*S,r[4]=l*m+h*T+d*w,r[7]=l*f+h*y+d*R,r[2]=u*b+p*v+g*S,r[5]=u*m+p*T+g*w,r[8]=u*f+p*y+g*R,this}multiplyScalar(e){let t=this.elements;return t[0]*=e,t[3]*=e,t[6]*=e,t[1]*=e,t[4]*=e,t[7]*=e,t[2]*=e,t[5]*=e,t[8]*=e,this}determinant(){let e=this.elements,t=e[0],n=e[1],s=e[2],r=e[3],o=e[4],a=e[5],c=e[6],l=e[7],h=e[8];return t*o*h-t*a*l-n*r*h+n*a*c+s*r*l-s*o*c}invert(){let e=this.elements,t=e[0],n=e[1],s=e[2],r=e[3],o=e[4],a=e[5],c=e[6],l=e[7],h=e[8],d=h*o-a*l,u=a*c-h*r,p=l*r-o*c,g=t*d+n*u+s*p;if(g===0)return this.set(0,0,0,0,0,0,0,0,0);let b=1/g;return e[0]=d*b,e[1]=(s*l-h*n)*b,e[2]=(a*n-s*o)*b,e[3]=u*b,e[4]=(h*t-s*c)*b,e[5]=(s*r-a*t)*b,e[6]=p*b,e[7]=(n*c-l*t)*b,e[8]=(o*t-n*r)*b,this}transpose(){let e,t=this.elements;return e=t[1],t[1]=t[3],t[3]=e,e=t[2],t[2]=t[6],t[6]=e,e=t[5],t[5]=t[7],t[7]=e,this}getNormalMatrix(e){return this.setFromMatrix4(e).invert().transpose()}transposeIntoArray(e){let t=this.elements;return e[0]=t[0],e[1]=t[3],e[2]=t[6],e[3]=t[1],e[4]=t[4],e[5]=t[7],e[6]=t[2],e[7]=t[5],e[8]=t[8],this}setUvTransform(e,t,n,s,r,o,a){let c=Math.cos(r),l=Math.sin(r);return this.set(n*c,n*l,-n*(c*o+l*a)+o+e,-s*l,s*c,-s*(-l*o+c*a)+a+t,0,0,1),this}scale(e,t){return Ti("Matrix3: .scale() is deprecated. Use .makeScale() instead."),this.premultiply(zc.makeScale(e,t)),this}rotate(e){return Ti("Matrix3: .rotate() is deprecated. Use .makeRotation() instead."),this.premultiply(zc.makeRotation(-e)),this}translate(e,t){return Ti("Matrix3: .translate() is deprecated. Use .makeTranslation() instead."),this.premultiply(zc.makeTranslation(e,t)),this}makeTranslation(e,t){return e.isVector2?this.set(1,0,e.x,0,1,e.y,0,0,1):this.set(1,0,e,0,1,t,0,0,1),this}makeRotation(e){let t=Math.cos(e),n=Math.sin(e);return this.set(t,-n,0,n,t,0,0,0,1),this}makeScale(e,t){return this.set(e,0,0,0,t,0,0,0,1),this}equals(e){let t=this.elements,n=e.elements;for(let s=0;s<9;s++)if(t[s]!==n[s])return!1;return!0}fromArray(e,t=0){for(let n=0;n<9;n++)this.elements[n]=e[n+t];return this}toArray(e=[],t=0){let n=this.elements;return e[t]=n[0],e[t+1]=n[1],e[t+2]=n[2],e[t+3]=n[3],e[t+4]=n[4],e[t+5]=n[5],e[t+6]=n[6],e[t+7]=n[7],e[t+8]=n[8],e}clone(){return new this.constructor().fromArray(this.elements)}},zc=new Le,gh=new Le().set(.4123908,.3575843,.1804808,.212639,.7151687,.0721923,.0193308,.1191948,.9505322),_h=new Le().set(3.2409699,-1.5373832,-.4986108,-.9692436,1.8759675,.0415551,.0556301,-.203977,1.0569715);function Ef(){let i={enabled:!0,workingColorSpace:$t,spaces:{},convert:function(s,r,o){return this.enabled===!1||r===o||!r||!o||(this.spaces[r].transfer===Je&&(s.r=Qn(s.r),s.g=Qn(s.g),s.b=Qn(s.b)),this.spaces[r].primaries!==this.spaces[o].primaries&&(s.applyMatrix3(this.spaces[r].toXYZ),s.applyMatrix3(this.spaces[o].fromXYZ)),this.spaces[o].transfer===Je&&(s.r=Us(s.r),s.g=Us(s.g),s.b=Us(s.b))),s},workingToColorSpace:function(s,r){return this.convert(s,this.workingColorSpace,r)},colorSpaceToWorking:function(s,r){return this.convert(s,r,this.workingColorSpace)},getPrimaries:function(s){return this.spaces[s].primaries},getTransfer:function(s){return s===di?Cr:this.spaces[s].transfer},getToneMappingMode:function(s){return this.spaces[s].outputColorSpaceConfig.toneMappingMode||"standard"},getLuminanceCoefficients:function(s,r=this.workingColorSpace){return s.fromArray(this.spaces[r].luminanceCoefficients)},define:function(s){Object.assign(this.spaces,s)},_getMatrix:function(s,r,o){return s.copy(this.spaces[r].toXYZ).multiply(this.spaces[o].fromXYZ)},_getDrawingBufferColorSpace:function(s){return this.spaces[s].outputColorSpaceConfig.drawingBufferColorSpace},_getUnpackColorSpace:function(s=this.workingColorSpace){return this.spaces[s].workingColorSpaceConfig.unpackColorSpace},fromWorkingColorSpace:function(s,r){return Ti("ColorManagement: .fromWorkingColorSpace() has been renamed to .workingToColorSpace()."),i.workingToColorSpace(s,r)},toWorkingColorSpace:function(s,r){return Ti("ColorManagement: .toWorkingColorSpace() has been renamed to .colorSpaceToWorking()."),i.colorSpaceToWorking(s,r)}},e=[.64,.33,.3,.6,.15,.06],t=[.2126,.7152,.0722],n=[.3127,.329];return i.define({[$t]:{primaries:e,whitePoint:n,transfer:Cr,toXYZ:gh,fromXYZ:_h,luminanceCoefficients:t,workingColorSpaceConfig:{unpackColorSpace:Ct},outputColorSpaceConfig:{drawingBufferColorSpace:Ct}},[Ct]:{primaries:e,whitePoint:n,transfer:Je,toXYZ:gh,fromXYZ:_h,luminanceCoefficients:t,outputColorSpaceConfig:{drawingBufferColorSpace:Ct}}}),i}var Be=Ef();function Qn(i){return i<.04045?i*.0773993808:Math.pow(i*.9478672986+.0521327014,2.4)}function Us(i){return i<.0031308?i*12.92:1.055*Math.pow(i,.41666)-.055}var Ms,ia=class{static getDataURL(e,t="image/png"){if(/^data:/i.test(e.src)||typeof HTMLCanvasElement>"u")return e.src;let n;if(e instanceof HTMLCanvasElement)n=e;else{Ms===void 0&&(Ms=ks("canvas")),Ms.width=e.width,Ms.height=e.height;let s=Ms.getContext("2d");e instanceof ImageData?s.putImageData(e,0,0):s.drawImage(e,0,0,e.width,e.height),n=Ms}return n.toDataURL(t)}static sRGBToLinear(e){if(typeof HTMLImageElement<"u"&&e instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&e instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&e instanceof ImageBitmap){let t=ks("canvas");t.width=e.width,t.height=e.height;let n=t.getContext("2d");n.drawImage(e,0,0,e.width,e.height);let s=n.getImageData(0,0,e.width,e.height),r=s.data;for(let o=0;o<r.length;o++)r[o]=Qn(r[o]/255)*255;return n.putImageData(s,0,0),t}else if(e.data){let t=e.data.slice(0);for(let n=0;n<t.length;n++)t instanceof Uint8Array||t instanceof Uint8ClampedArray?t[n]=Math.floor(Qn(t[n]/255)*255):t[n]=Qn(t[n]);return{data:t,width:e.width,height:e.height}}else return Ae("ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),e}},Rf=0,Hs=class{constructor(e=null){this.isTextureSource=!0,Object.defineProperty(this,"id",{value:Rf++}),this.uuid=Cn(),this.data=e,this.dataReady=!0,this.version=0}getSize(e){let t=this.data;return typeof HTMLVideoElement<"u"&&t instanceof HTMLVideoElement?e.set(t.videoWidth,t.videoHeight,0):typeof VideoFrame<"u"&&t instanceof VideoFrame?e.set(t.displayWidth,t.displayHeight,0):t!==null?e.set(t.width,t.height,t.depth||0):e.set(0,0,0),e}set needsUpdate(e){e===!0&&this.version++}toJSON(e){let t=e===void 0||typeof e=="string";if(!t&&e.images[this.uuid]!==void 0)return e.images[this.uuid];let n={uuid:this.uuid,url:""},s=this.data;if(s!==null){let r;if(Array.isArray(s)){r=[];for(let o=0,a=s.length;o<a;o++)s[o].isDataTexture?r.push(Hc(s[o].image)):r.push(Hc(s[o]))}else r=Hc(s);n.url=r}return t||(e.images[this.uuid]=n),n}};function Hc(i){return typeof HTMLImageElement<"u"&&i instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&i instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&i instanceof ImageBitmap?ia.getDataURL(i):i.data?{data:Array.from(i.data),width:i.width,height:i.height,type:i.data.constructor.name}:(Ae("Texture: Unable to serialize Texture."),{})}var Cf=0,Vc=new N,Ft=class i extends xn{constructor(e=i.DEFAULT_IMAGE,t=i.DEFAULT_MAPPING,n=_n,s=_n,r=gt,o=un,a=fn,c=Xt,l=i.DEFAULT_ANISOTROPY,h=di){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:Cf++}),this.uuid=Cn(),this.name="",this.source=new Hs(e),this.mipmaps=[],this.mapping=t,this.channel=0,this.wrapS=n,this.wrapT=s,this.magFilter=r,this.minFilter=o,this.anisotropy=l,this.format=a,this.internalFormat=null,this.type=c,this.offset=new we(0,0),this.repeat=new we(1,1),this.center=new we(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new Le,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=h,this.userData={},this.updateRanges=[],this.version=0,this.onUpdate=null,this.renderTarget=null,this.isRenderTargetTexture=!1,this.isArrayTexture=!!(e&&e.depth&&e.depth>1),this.pmremVersion=0,this.normalized=!1}get width(){return this.source.getSize(Vc).x}get height(){return this.source.getSize(Vc).y}get depth(){return this.source.getSize(Vc).z}get image(){return this.source.data}set image(e){this.source.data=e}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}clone(){return new this.constructor().copy(this)}copy(e){return this.name=e.name,this.source=e.source,this.mipmaps=e.mipmaps.slice(0),this.mapping=e.mapping,this.channel=e.channel,this.wrapS=e.wrapS,this.wrapT=e.wrapT,this.magFilter=e.magFilter,this.minFilter=e.minFilter,this.anisotropy=e.anisotropy,this.format=e.format,this.internalFormat=e.internalFormat,this.type=e.type,this.normalized=e.normalized,this.offset.copy(e.offset),this.repeat.copy(e.repeat),this.center.copy(e.center),this.rotation=e.rotation,this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrix.copy(e.matrix),this.generateMipmaps=e.generateMipmaps,this.premultiplyAlpha=e.premultiplyAlpha,this.flipY=e.flipY,this.unpackAlignment=e.unpackAlignment,this.colorSpace=e.colorSpace,this.renderTarget=e.renderTarget,this.isRenderTargetTexture=e.isRenderTargetTexture,this.isArrayTexture=e.isArrayTexture,this.userData=JSON.parse(JSON.stringify(e.userData)),this.needsUpdate=!0,this}setValues(e){for(let t in e){let n=e[t];if(n===void 0){Ae(`Texture.setValues(): parameter '${t}' has value of undefined.`);continue}let s=this[t];if(s===void 0){Ae(`Texture.setValues(): property '${t}' does not exist.`);continue}s&&n&&s.isVector2&&n.isVector2||s&&n&&s.isVector3&&n.isVector3||s&&n&&s.isMatrix3&&n.isMatrix3?s.copy(n):this[t]=n}}toJSON(e){let t=e===void 0||typeof e=="string";if(!t&&e.textures[this.uuid]!==void 0)return e.textures[this.uuid];let n={metadata:{version:4.7,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(e).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,normalized:this.normalized,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(n.userData=this.userData),t||(e.textures[this.uuid]=n),n}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(e){if(this.mapping!==Il)return e;if(e.applyMatrix3(this.matrix),e.x<0||e.x>1)switch(this.wrapS){case Ai:e.x=e.x-Math.floor(e.x);break;case _n:e.x=e.x<0?0:1;break;case Fs:Math.abs(Math.floor(e.x)%2)===1?e.x=Math.ceil(e.x)-e.x:e.x=e.x-Math.floor(e.x);break}if(e.y<0||e.y>1)switch(this.wrapT){case Ai:e.y=e.y-Math.floor(e.y);break;case _n:e.y=e.y<0?0:1;break;case Fs:Math.abs(Math.floor(e.y)%2)===1?e.y=Math.ceil(e.y)-e.y:e.y=e.y-Math.floor(e.y);break}return this.flipY&&(e.y=1-e.y),e}set needsUpdate(e){e===!0&&(this.version++,this.source.needsUpdate=!0)}set needsPMREMUpdate(e){e===!0&&this.pmremVersion++}};Ft.DEFAULT_IMAGE=null;Ft.DEFAULT_MAPPING=Il;Ft.DEFAULT_ANISOTROPY=1;var tt=class i{static{i.prototype.isVector4=!0}constructor(e=0,t=0,n=0,s=1){this.x=e,this.y=t,this.z=n,this.w=s}get width(){return this.z}set width(e){this.z=e}get height(){return this.w}set height(e){this.w=e}set(e,t,n,s){return this.x=e,this.y=t,this.z=n,this.w=s,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this.w=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setW(e){return this.w=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;case 3:this.w=t;break;default:throw new Error("THREE.Vector4: index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("THREE.Vector4: index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this.w=e.w!==void 0?e.w:1,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this.w+=e.w,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this.w+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this.w=e.w+t.w,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this.w+=e.w*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this.w-=e.w,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this.w-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this.w=e.w-t.w,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this.w*=e.w,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this.w*=e,this}applyMatrix4(e){let t=this.x,n=this.y,s=this.z,r=this.w,o=e.elements;return this.x=o[0]*t+o[4]*n+o[8]*s+o[12]*r,this.y=o[1]*t+o[5]*n+o[9]*s+o[13]*r,this.z=o[2]*t+o[6]*n+o[10]*s+o[14]*r,this.w=o[3]*t+o[7]*n+o[11]*s+o[15]*r,this}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this.w/=e.w,this}divideScalar(e){return this.multiplyScalar(1/e)}setAxisAngleFromQuaternion(e){this.w=2*Math.acos(e.w);let t=Math.sqrt(1-e.w*e.w);return t<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=e.x/t,this.y=e.y/t,this.z=e.z/t),this}setAxisAngleFromRotationMatrix(e){let t,n,s,r,c=e.elements,l=c[0],h=c[4],d=c[8],u=c[1],p=c[5],g=c[9],b=c[2],m=c[6],f=c[10];if(Math.abs(h-u)<.01&&Math.abs(d-b)<.01&&Math.abs(g-m)<.01){if(Math.abs(h+u)<.1&&Math.abs(d+b)<.1&&Math.abs(g+m)<.1&&Math.abs(l+p+f-3)<.1)return this.set(1,0,0,0),this;t=Math.PI;let T=(l+1)/2,y=(p+1)/2,S=(f+1)/2,w=(h+u)/4,R=(d+b)/4,x=(g+m)/4;return T>y&&T>S?T<.01?(n=0,s=.707106781,r=.707106781):(n=Math.sqrt(T),s=w/n,r=R/n):y>S?y<.01?(n=.707106781,s=0,r=.707106781):(s=Math.sqrt(y),n=w/s,r=x/s):S<.01?(n=.707106781,s=.707106781,r=0):(r=Math.sqrt(S),n=R/r,s=x/r),this.set(n,s,r,t),this}let v=Math.sqrt((m-g)*(m-g)+(d-b)*(d-b)+(u-h)*(u-h));return Math.abs(v)<.001&&(v=1),this.x=(m-g)/v,this.y=(d-b)/v,this.z=(u-h)/v,this.w=Math.acos((l+p+f-1)/2),this}setFromMatrixPosition(e){let t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this.w=t[15],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this.w=Math.min(this.w,e.w),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this.w=Math.max(this.w,e.w),this}clamp(e,t){return this.x=ke(this.x,e.x,t.x),this.y=ke(this.y,e.y,t.y),this.z=ke(this.z,e.z,t.z),this.w=ke(this.w,e.w,t.w),this}clampScalar(e,t){return this.x=ke(this.x,e,t),this.y=ke(this.y,e,t),this.z=ke(this.z,e,t),this.w=ke(this.w,e,t),this}clampLength(e,t){let n=this.length();return this.divideScalar(n||1).multiplyScalar(ke(n,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z+this.w*e.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this.w+=(e.w-this.w)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this.z=e.z+(t.z-e.z)*n,this.w=e.w+(t.w-e.w)*n,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z&&e.w===this.w}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this.w=e[t+3],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e[t+3]=this.w,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this.w=e.getW(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}},sa=class extends xn{constructor(e=1,t=1,n={}){super(),n=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:gt,depthBuffer:!0,stencilBuffer:!1,resolveColorBuffer:!0,resolveDepthBuffer:!0,resolveStencilBuffer:!0,storeMultisampledColorBuffer:!0,storeMultisampledDepthBuffer:!0,storeMultisampledStencilBuffer:!0,depthTexture:null,samples:0,count:1,depth:1,multiview:!1,useArrayDepthTexture:!1},n),this.isRenderTarget=!0,this.width=e,this.height=t,this.depth=n.depth,this.scissor=new tt(0,0,e,t),this.scissorTest=!1,this.viewport=new tt(0,0,e,t),this.textures=[];let s={width:e,height:t,depth:n.depth},r=new Ft(s),o=n.count;for(let a=0;a<o;a++)this.textures[a]=r.clone(),this.textures[a].isRenderTargetTexture=!0,this.textures[a].renderTarget=this;this._setTextureOptions(n),this.depthBuffer=n.depthBuffer,this.stencilBuffer=n.stencilBuffer,this.resolveColorBuffer=n.resolveColorBuffer,this.resolveDepthBuffer=n.resolveDepthBuffer,this.resolveStencilBuffer=n.resolveStencilBuffer,this.storeMultisampledColorBuffer=n.storeMultisampledColorBuffer,this.storeMultisampledDepthBuffer=n.storeMultisampledDepthBuffer,this.storeMultisampledStencilBuffer=n.storeMultisampledStencilBuffer,this._depthTexture=null,this.depthTexture=n.depthTexture,this.samples=n.samples,this.multiview=n.multiview,this.useArrayDepthTexture=n.useArrayDepthTexture}_setTextureOptions(e={}){let t={minFilter:gt,generateMipmaps:!1,flipY:!1,internalFormat:null};e.mapping!==void 0&&(t.mapping=e.mapping),e.wrapS!==void 0&&(t.wrapS=e.wrapS),e.wrapT!==void 0&&(t.wrapT=e.wrapT),e.wrapR!==void 0&&(t.wrapR=e.wrapR),e.magFilter!==void 0&&(t.magFilter=e.magFilter),e.minFilter!==void 0&&(t.minFilter=e.minFilter),e.format!==void 0&&(t.format=e.format),e.type!==void 0&&(t.type=e.type),e.anisotropy!==void 0&&(t.anisotropy=e.anisotropy),e.colorSpace!==void 0&&(t.colorSpace=e.colorSpace),e.flipY!==void 0&&(t.flipY=e.flipY),e.generateMipmaps!==void 0&&(t.generateMipmaps=e.generateMipmaps),e.internalFormat!==void 0&&(t.internalFormat=e.internalFormat);for(let n=0;n<this.textures.length;n++)this.textures[n].setValues(t)}get texture(){return this.textures[0]}set texture(e){this.textures[0]=e}set depthTexture(e){this._depthTexture!==null&&this._depthTexture.renderTarget===this&&(this._depthTexture.renderTarget=null),e!==null&&e.renderTarget===null&&(e.renderTarget=this),this._depthTexture=e}get depthTexture(){return this._depthTexture}setSize(e,t,n=1){if(this.width!==e||this.height!==t||this.depth!==n){this.width=e,this.height=t,this.depth=n;for(let s=0,r=this.textures.length;s<r;s++)this.textures[s].image.width=e,this.textures[s].image.height=t,this.textures[s].image.depth=n,this.textures[s].isData3DTexture!==!0&&(this.textures[s].isArrayTexture=this.textures[s].image.depth>1);this.dispose()}this.viewport.set(0,0,e,t),this.scissor.set(0,0,e,t)}clone(){return new this.constructor().copy(this)}copy(e){this.width=e.width,this.height=e.height,this.depth=e.depth,this.scissor.copy(e.scissor),this.scissorTest=e.scissorTest,this.viewport.copy(e.viewport),this.textures.length=0;for(let t=0,n=e.textures.length;t<n;t++){this.textures[t]=e.textures[t].clone(),this.textures[t].isRenderTargetTexture=!0,this.textures[t].renderTarget=this;let s=Object.assign({},e.textures[t].image);this.textures[t].source=new Hs(s)}if(this.depthBuffer=e.depthBuffer,this.stencilBuffer=e.stencilBuffer,this.resolveColorBuffer=e.resolveColorBuffer,this.resolveDepthBuffer=e.resolveDepthBuffer,this.resolveStencilBuffer=e.resolveStencilBuffer,this.storeMultisampledColorBuffer=e.storeMultisampledColorBuffer,this.storeMultisampledDepthBuffer=e.storeMultisampledDepthBuffer,this.storeMultisampledStencilBuffer=e.storeMultisampledStencilBuffer,e.depthTexture!==null)if(e.depthTexture.renderTarget===e){let t=e.depthTexture.clone();t.renderTarget=null,this.depthTexture=t}else this.depthTexture=e.depthTexture;return this.samples=e.samples,this.multiview=e.multiview,this.useArrayDepthTexture=e.useArrayDepthTexture,this}dispose(){this.dispatchEvent({type:"dispose"})}},tn=class extends sa{constructor(e=1,t=1,n={}){super(e,t,n),this.isWebGLRenderTarget=!0}},Pr=class extends Ft{constructor(e=null,t=1,n=1,s=1){super(null),this.isDataArrayTexture=!0,this.image={data:e,width:t,height:n,depth:s},this.magFilter=Mt,this.minFilter=Mt,this.wrapR=_n,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.layerUpdates=new Set}copy(e){return super.copy(e),this.wrapR=e.wrapR,this}addLayerUpdate(e){this.layerUpdates.add(e)}clearLayerUpdates(){this.layerUpdates.clear()}};var ra=class extends Ft{constructor(e=null,t=1,n=1,s=1){super(null),this.isData3DTexture=!0,this.image={data:e,width:t,height:n,depth:s},this.magFilter=Mt,this.minFilter=Mt,this.wrapR=_n,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}copy(e){return super.copy(e),this.wrapR=e.wrapR,this}};var Ue=class i{static{i.prototype.isMatrix4=!0}constructor(e,t,n,s,r,o,a,c,l,h,d,u,p,g,b,m){this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],e!==void 0&&this.set(e,t,n,s,r,o,a,c,l,h,d,u,p,g,b,m)}set(e,t,n,s,r,o,a,c,l,h,d,u,p,g,b,m){let f=this.elements;return f[0]=e,f[4]=t,f[8]=n,f[12]=s,f[1]=r,f[5]=o,f[9]=a,f[13]=c,f[2]=l,f[6]=h,f[10]=d,f[14]=u,f[3]=p,f[7]=g,f[11]=b,f[15]=m,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new i().fromArray(this.elements)}copy(e){let t=this.elements,n=e.elements;return t[0]=n[0],t[1]=n[1],t[2]=n[2],t[3]=n[3],t[4]=n[4],t[5]=n[5],t[6]=n[6],t[7]=n[7],t[8]=n[8],t[9]=n[9],t[10]=n[10],t[11]=n[11],t[12]=n[12],t[13]=n[13],t[14]=n[14],t[15]=n[15],this}copyPosition(e){let t=this.elements,n=e.elements;return t[12]=n[12],t[13]=n[13],t[14]=n[14],this}setFromMatrix3(e){let t=e.elements;return this.set(t[0],t[3],t[6],0,t[1],t[4],t[7],0,t[2],t[5],t[8],0,0,0,0,1),this}extractBasis(e,t,n){return this.determinantAffine()===0?(e.set(1,0,0),t.set(0,1,0),n.set(0,0,1),this):(e.setFromMatrixColumn(this,0),t.setFromMatrixColumn(this,1),n.setFromMatrixColumn(this,2),this)}makeBasis(e,t,n){return this.set(e.x,t.x,n.x,0,e.y,t.y,n.y,0,e.z,t.z,n.z,0,0,0,0,1),this}extractRotation(e){if(e.determinantAffine()===0)return this.identity();let t=this.elements,n=e.elements,s=1/bs.setFromMatrixColumn(e,0).length(),r=1/bs.setFromMatrixColumn(e,1).length(),o=1/bs.setFromMatrixColumn(e,2).length();return t[0]=n[0]*s,t[1]=n[1]*s,t[2]=n[2]*s,t[3]=0,t[4]=n[4]*r,t[5]=n[5]*r,t[6]=n[6]*r,t[7]=0,t[8]=n[8]*o,t[9]=n[9]*o,t[10]=n[10]*o,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromEuler(e){let t=this.elements,n=e.x,s=e.y,r=e.z,o=Math.cos(n),a=Math.sin(n),c=Math.cos(s),l=Math.sin(s),h=Math.cos(r),d=Math.sin(r);if(e.order==="XYZ"){let u=o*h,p=o*d,g=a*h,b=a*d;t[0]=c*h,t[4]=-c*d,t[8]=l,t[1]=p+g*l,t[5]=u-b*l,t[9]=-a*c,t[2]=b-u*l,t[6]=g+p*l,t[10]=o*c}else if(e.order==="YXZ"){let u=c*h,p=c*d,g=l*h,b=l*d;t[0]=u+b*a,t[4]=g*a-p,t[8]=o*l,t[1]=o*d,t[5]=o*h,t[9]=-a,t[2]=p*a-g,t[6]=b+u*a,t[10]=o*c}else if(e.order==="ZXY"){let u=c*h,p=c*d,g=l*h,b=l*d;t[0]=u-b*a,t[4]=-o*d,t[8]=g+p*a,t[1]=p+g*a,t[5]=o*h,t[9]=b-u*a,t[2]=-o*l,t[6]=a,t[10]=o*c}else if(e.order==="ZYX"){let u=o*h,p=o*d,g=a*h,b=a*d;t[0]=c*h,t[4]=g*l-p,t[8]=u*l+b,t[1]=c*d,t[5]=b*l+u,t[9]=p*l-g,t[2]=-l,t[6]=a*c,t[10]=o*c}else if(e.order==="YZX"){let u=o*c,p=o*l,g=a*c,b=a*l;t[0]=c*h,t[4]=b-u*d,t[8]=g*d+p,t[1]=d,t[5]=o*h,t[9]=-a*h,t[2]=-l*h,t[6]=p*d+g,t[10]=u-b*d}else if(e.order==="XZY"){let u=o*c,p=o*l,g=a*c,b=a*l;t[0]=c*h,t[4]=-d,t[8]=l*h,t[1]=u*d+b,t[5]=o*h,t[9]=p*d-g,t[2]=g*d-p,t[6]=a*h,t[10]=b*d+u}return t[3]=0,t[7]=0,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromQuaternion(e){return this.compose(If,e,Pf)}lookAt(e,t,n){let s=this.elements;return cn.subVectors(e,t),cn.lengthSq()===0&&(cn.z=1),cn.normalize(),xi.crossVectors(n,cn),xi.lengthSq()===0&&(Math.abs(n.z)===1?cn.x+=1e-4:cn.z+=1e-4,cn.normalize(),xi.crossVectors(n,cn)),xi.normalize(),bo.crossVectors(cn,xi),s[0]=xi.x,s[4]=bo.x,s[8]=cn.x,s[1]=xi.y,s[5]=bo.y,s[9]=cn.y,s[2]=xi.z,s[6]=bo.z,s[10]=cn.z,this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){let n=e.elements,s=t.elements,r=this.elements,o=n[0],a=n[4],c=n[8],l=n[12],h=n[1],d=n[5],u=n[9],p=n[13],g=n[2],b=n[6],m=n[10],f=n[14],v=n[3],T=n[7],y=n[11],S=n[15],w=s[0],R=s[4],x=s[8],A=s[12],C=s[1],L=s[5],O=s[9],W=s[13],I=s[2],B=s[6],V=s[10],X=s[14],j=s[3],H=s[7],Y=s[11],ee=s[15];return r[0]=o*w+a*C+c*I+l*j,r[4]=o*R+a*L+c*B+l*H,r[8]=o*x+a*O+c*V+l*Y,r[12]=o*A+a*W+c*X+l*ee,r[1]=h*w+d*C+u*I+p*j,r[5]=h*R+d*L+u*B+p*H,r[9]=h*x+d*O+u*V+p*Y,r[13]=h*A+d*W+u*X+p*ee,r[2]=g*w+b*C+m*I+f*j,r[6]=g*R+b*L+m*B+f*H,r[10]=g*x+b*O+m*V+f*Y,r[14]=g*A+b*W+m*X+f*ee,r[3]=v*w+T*C+y*I+S*j,r[7]=v*R+T*L+y*B+S*H,r[11]=v*x+T*O+y*V+S*Y,r[15]=v*A+T*W+y*X+S*ee,this}multiplyScalar(e){let t=this.elements;return t[0]*=e,t[4]*=e,t[8]*=e,t[12]*=e,t[1]*=e,t[5]*=e,t[9]*=e,t[13]*=e,t[2]*=e,t[6]*=e,t[10]*=e,t[14]*=e,t[3]*=e,t[7]*=e,t[11]*=e,t[15]*=e,this}determinant(){let e=this.elements,t=e[0],n=e[4],s=e[8],r=e[12],o=e[1],a=e[5],c=e[9],l=e[13],h=e[2],d=e[6],u=e[10],p=e[14],g=e[3],b=e[7],m=e[11],f=e[15],v=c*p-l*u,T=a*p-l*d,y=a*u-c*d,S=o*p-l*h,w=o*u-c*h,R=o*d-a*h;return t*(b*v-m*T+f*y)-n*(g*v-m*S+f*w)+s*(g*T-b*S+f*R)-r*(g*y-b*w+m*R)}determinantAffine(){let e=this.elements,t=e[0],n=e[4],s=e[8],r=e[1],o=e[5],a=e[9],c=e[2],l=e[6],h=e[10];return t*(o*h-a*l)-n*(r*h-a*c)+s*(r*l-o*c)}transpose(){let e=this.elements,t;return t=e[1],e[1]=e[4],e[4]=t,t=e[2],e[2]=e[8],e[8]=t,t=e[6],e[6]=e[9],e[9]=t,t=e[3],e[3]=e[12],e[12]=t,t=e[7],e[7]=e[13],e[13]=t,t=e[11],e[11]=e[14],e[14]=t,this}setPosition(e,t,n){let s=this.elements;return e.isVector3?(s[12]=e.x,s[13]=e.y,s[14]=e.z):(s[12]=e,s[13]=t,s[14]=n),this}invert(){let e=this.elements,t=e[0],n=e[1],s=e[2],r=e[3],o=e[4],a=e[5],c=e[6],l=e[7],h=e[8],d=e[9],u=e[10],p=e[11],g=e[12],b=e[13],m=e[14],f=e[15],v=t*a-n*o,T=t*c-s*o,y=t*l-r*o,S=n*c-s*a,w=n*l-r*a,R=s*l-r*c,x=h*b-d*g,A=h*m-u*g,C=h*f-p*g,L=d*m-u*b,O=d*f-p*b,W=u*f-p*m,I=v*W-T*O+y*L+S*C-w*A+R*x;if(I===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);let B=1/I;return e[0]=(a*W-c*O+l*L)*B,e[1]=(s*O-n*W-r*L)*B,e[2]=(b*R-m*w+f*S)*B,e[3]=(u*w-d*R-p*S)*B,e[4]=(c*C-o*W-l*A)*B,e[5]=(t*W-s*C+r*A)*B,e[6]=(m*y-g*R-f*T)*B,e[7]=(h*R-u*y+p*T)*B,e[8]=(o*O-a*C+l*x)*B,e[9]=(n*C-t*O-r*x)*B,e[10]=(g*w-b*y+f*v)*B,e[11]=(d*y-h*w-p*v)*B,e[12]=(a*A-o*L-c*x)*B,e[13]=(t*L-n*A+s*x)*B,e[14]=(b*T-g*S-m*v)*B,e[15]=(h*S-d*T+u*v)*B,this}scale(e){let t=this.elements,n=e.x,s=e.y,r=e.z;return t[0]*=n,t[4]*=s,t[8]*=r,t[1]*=n,t[5]*=s,t[9]*=r,t[2]*=n,t[6]*=s,t[10]*=r,t[3]*=n,t[7]*=s,t[11]*=r,this}getMaxScaleOnAxis(){let e=this.elements,t=e[0]*e[0]+e[1]*e[1]+e[2]*e[2],n=e[4]*e[4]+e[5]*e[5]+e[6]*e[6],s=e[8]*e[8]+e[9]*e[9]+e[10]*e[10];return Math.sqrt(Math.max(t,n,s))}makeTranslation(e,t,n){return e.isVector3?this.set(1,0,0,e.x,0,1,0,e.y,0,0,1,e.z,0,0,0,1):this.set(1,0,0,e,0,1,0,t,0,0,1,n,0,0,0,1),this}makeRotationX(e){let t=Math.cos(e),n=Math.sin(e);return this.set(1,0,0,0,0,t,-n,0,0,n,t,0,0,0,0,1),this}makeRotationY(e){let t=Math.cos(e),n=Math.sin(e);return this.set(t,0,n,0,0,1,0,0,-n,0,t,0,0,0,0,1),this}makeRotationZ(e){let t=Math.cos(e),n=Math.sin(e);return this.set(t,-n,0,0,n,t,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(e,t){let n=Math.cos(t),s=Math.sin(t),r=1-n,o=e.x,a=e.y,c=e.z,l=r*o,h=r*a;return this.set(l*o+n,l*a-s*c,l*c+s*a,0,l*a+s*c,h*a+n,h*c-s*o,0,l*c-s*a,h*c+s*o,r*c*c+n,0,0,0,0,1),this}makeScale(e,t,n){return this.set(e,0,0,0,0,t,0,0,0,0,n,0,0,0,0,1),this}makeShear(e,t,n,s,r,o){return this.set(1,n,r,0,e,1,o,0,t,s,1,0,0,0,0,1),this}compose(e,t,n){let s=this.elements,r=t._x,o=t._y,a=t._z,c=t._w,l=r+r,h=o+o,d=a+a,u=r*l,p=r*h,g=r*d,b=o*h,m=o*d,f=a*d,v=c*l,T=c*h,y=c*d,S=n.x,w=n.y,R=n.z;return s[0]=(1-(b+f))*S,s[1]=(p+y)*S,s[2]=(g-T)*S,s[3]=0,s[4]=(p-y)*w,s[5]=(1-(u+f))*w,s[6]=(m+v)*w,s[7]=0,s[8]=(g+T)*R,s[9]=(m-v)*R,s[10]=(1-(u+b))*R,s[11]=0,s[12]=e.x,s[13]=e.y,s[14]=e.z,s[15]=1,this}decompose(e,t,n){let s=this.elements;e.x=s[12],e.y=s[13],e.z=s[14];let r=this.determinantAffine();if(r===0)return n.set(1,1,1),t.identity(),this;let o=bs.set(s[0],s[1],s[2]).length(),a=bs.set(s[4],s[5],s[6]).length(),c=bs.set(s[8],s[9],s[10]).length();r<0&&(o=-o),wn.copy(this);let l=1/o,h=1/a,d=1/c;return wn.elements[0]*=l,wn.elements[1]*=l,wn.elements[2]*=l,wn.elements[4]*=h,wn.elements[5]*=h,wn.elements[6]*=h,wn.elements[8]*=d,wn.elements[9]*=d,wn.elements[10]*=d,t.setFromRotationMatrix(wn),n.x=o,n.y=a,n.z=c,this}makePerspective(e,t,n,s,r,o,a=Rn,c=!1){let l=this.elements,h=2*r/(t-e),d=2*r/(n-s),u=(t+e)/(t-e),p=(n+s)/(n-s),g,b;if(c)g=r/(o-r),b=o*r/(o-r);else if(a===Rn)g=-(o+r)/(o-r),b=-2*o*r/(o-r);else if(a===Bs)g=-o/(o-r),b=-o*r/(o-r);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+a);return l[0]=h,l[4]=0,l[8]=u,l[12]=0,l[1]=0,l[5]=d,l[9]=p,l[13]=0,l[2]=0,l[6]=0,l[10]=g,l[14]=b,l[3]=0,l[7]=0,l[11]=-1,l[15]=0,this}makeOrthographic(e,t,n,s,r,o,a=Rn,c=!1){let l=this.elements,h=2/(t-e),d=2/(n-s),u=-(t+e)/(t-e),p=-(n+s)/(n-s),g,b;if(c)g=1/(o-r),b=o/(o-r);else if(a===Rn)g=-2/(o-r),b=-(o+r)/(o-r);else if(a===Bs)g=-1/(o-r),b=-r/(o-r);else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+a);return l[0]=h,l[4]=0,l[8]=0,l[12]=u,l[1]=0,l[5]=d,l[9]=0,l[13]=p,l[2]=0,l[6]=0,l[10]=g,l[14]=b,l[3]=0,l[7]=0,l[11]=0,l[15]=1,this}equals(e){let t=this.elements,n=e.elements;for(let s=0;s<16;s++)if(t[s]!==n[s])return!1;return!0}fromArray(e,t=0){for(let n=0;n<16;n++)this.elements[n]=e[n+t];return this}toArray(e=[],t=0){let n=this.elements;return e[t]=n[0],e[t+1]=n[1],e[t+2]=n[2],e[t+3]=n[3],e[t+4]=n[4],e[t+5]=n[5],e[t+6]=n[6],e[t+7]=n[7],e[t+8]=n[8],e[t+9]=n[9],e[t+10]=n[10],e[t+11]=n[11],e[t+12]=n[12],e[t+13]=n[13],e[t+14]=n[14],e[t+15]=n[15],e}},bs=new N,wn=new Ue,If=new N(0,0,0),Pf=new N(1,1,1),xi=new N,bo=new N,cn=new N,xh=new Ue,yh=new It,In=class i{constructor(e=0,t=0,n=0,s=i.DEFAULT_ORDER){this.isEuler=!0,this._x=e,this._y=t,this._z=n,this._order=s}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get order(){return this._order}set order(e){this._order=e,this._onChangeCallback()}set(e,t,n,s=this._order){return this._x=e,this._y=t,this._z=n,this._order=s,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(e){return this._x=e._x,this._y=e._y,this._z=e._z,this._order=e._order,this._onChangeCallback(),this}setFromRotationMatrix(e,t=this._order,n=!0){let s=e.elements,r=s[0],o=s[4],a=s[8],c=s[1],l=s[5],h=s[9],d=s[2],u=s[6],p=s[10];switch(t){case"XYZ":this._y=Math.asin(ke(a,-1,1)),Math.abs(a)<.9999999?(this._x=Math.atan2(-h,p),this._z=Math.atan2(-o,r)):(this._x=Math.atan2(u,l),this._z=0);break;case"YXZ":this._x=Math.asin(-ke(h,-1,1)),Math.abs(h)<.9999999?(this._y=Math.atan2(a,p),this._z=Math.atan2(c,l)):(this._y=Math.atan2(-d,r),this._z=0);break;case"ZXY":this._x=Math.asin(ke(u,-1,1)),Math.abs(u)<.9999999?(this._y=Math.atan2(-d,p),this._z=Math.atan2(-o,l)):(this._y=0,this._z=Math.atan2(c,r));break;case"ZYX":this._y=Math.asin(-ke(d,-1,1)),Math.abs(d)<.9999999?(this._x=Math.atan2(u,p),this._z=Math.atan2(c,r)):(this._x=0,this._z=Math.atan2(-o,l));break;case"YZX":this._z=Math.asin(ke(c,-1,1)),Math.abs(c)<.9999999?(this._x=Math.atan2(-h,l),this._y=Math.atan2(-d,r)):(this._x=0,this._y=Math.atan2(a,p));break;case"XZY":this._z=Math.asin(-ke(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(u,l),this._y=Math.atan2(a,r)):(this._x=Math.atan2(-h,p),this._y=0);break;default:Ae("Euler: .setFromRotationMatrix() encountered an unknown order: "+t)}return this._order=t,n===!0&&this._onChangeCallback(),this}setFromQuaternion(e,t,n){return xh.makeRotationFromQuaternion(e),this.setFromRotationMatrix(xh,t,n)}setFromVector3(e,t=this._order){return this.set(e.x,e.y,e.z,t)}reorder(e){return yh.setFromEuler(this),this.setFromQuaternion(yh,e)}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._order===this._order}fromArray(e){return this._x=e[0],this._y=e[1],this._z=e[2],e[3]!==void 0&&(this._order=e[3]),this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._order,e}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}};In.DEFAULT_ORDER="XYZ";var Lr=class{constructor(){this.mask=1}set(e){this.mask=(1<<e|0)>>>0}enable(e){this.mask|=1<<e|0}enableAll(){this.mask=-1}toggle(e){this.mask^=1<<e|0}disable(e){this.mask&=~(1<<e|0)}disableAll(){this.mask=0}test(e){return(this.mask&e.mask)!==0}isEnabled(e){return(this.mask&(1<<e|0))!==0}},Lf=0,vh=new N,Ss=new It,Yn=new Ue,So=new N,xr=new N,Df=new N,Nf=new It,Mh=new N(1,0,0),bh=new N(0,1,0),Sh=new N(0,0,1),wh={type:"added"},Uf={type:"removed"},ws={type:"childadded",child:null},Gc={type:"childremoved",child:null},ht=class i extends xn{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:Lf++}),this.uuid=Cn(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=i.DEFAULT_UP.clone();let e=new N,t=new In,n=new It,s=new N(1,1,1);function r(){n.setFromEuler(t,!1)}function o(){t.setFromQuaternion(n,void 0,!1)}t._onChange(r),n._onChange(o),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:e},rotation:{configurable:!0,enumerable:!0,value:t},quaternion:{configurable:!0,enumerable:!0,value:n},scale:{configurable:!0,enumerable:!0,value:s},modelViewMatrix:{value:new Ue},normalMatrix:{value:new Le}}),this.matrix=new Ue,this.matrixWorld=new Ue,this.matrixAutoUpdate=i.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=i.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new Lr,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.customDepthMaterial=void 0,this.customDistanceMaterial=void 0,this.static=!1,this.userData={},this.pivot=null}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(e){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(e),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(e){return this.quaternion.premultiply(e),this}setRotationFromAxisAngle(e,t){this.quaternion.setFromAxisAngle(e,t)}setRotationFromEuler(e){this.quaternion.setFromEuler(e,!0)}setRotationFromMatrix(e){this.quaternion.setFromRotationMatrix(e)}setRotationFromQuaternion(e){this.quaternion.copy(e)}rotateOnAxis(e,t){return Ss.setFromAxisAngle(e,t),this.quaternion.multiply(Ss),this}rotateOnWorldAxis(e,t){return Ss.setFromAxisAngle(e,t),this.quaternion.premultiply(Ss),this}rotateX(e){return this.rotateOnAxis(Mh,e)}rotateY(e){return this.rotateOnAxis(bh,e)}rotateZ(e){return this.rotateOnAxis(Sh,e)}translateOnAxis(e,t){return vh.copy(e).applyQuaternion(this.quaternion),this.position.add(vh.multiplyScalar(t)),this}translateX(e){return this.translateOnAxis(Mh,e)}translateY(e){return this.translateOnAxis(bh,e)}translateZ(e){return this.translateOnAxis(Sh,e)}localToWorld(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(this.matrixWorld)}worldToLocal(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(Yn.copy(this.matrixWorld).invert())}lookAt(e,t,n){e.isVector3?So.copy(e):So.set(e,t,n);let s=this.parent;this.updateWorldMatrix(!0,!1),xr.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?Yn.lookAt(xr,So,this.up):Yn.lookAt(So,xr,this.up),this.quaternion.setFromRotationMatrix(Yn),s&&(Yn.extractRotation(s.matrixWorld),Ss.setFromRotationMatrix(Yn),this.quaternion.premultiply(Ss.invert()))}add(e){if(arguments.length>1){for(let t=0;t<arguments.length;t++)this.add(arguments[t]);return this}return e===this?(Pe("Object3D.add: object can't be added as a child of itself.",e),this):(e&&e.isObject3D?(e.removeFromParent(),e.parent=this,this.children.push(e),e.dispatchEvent(wh),ws.child=e,this.dispatchEvent(ws),ws.child=null):Pe("Object3D.add: object not an instance of THREE.Object3D.",e),this)}remove(e){if(arguments.length>1){for(let n=0;n<arguments.length;n++)this.remove(arguments[n]);return this}let t=this.children.indexOf(e);return t!==-1&&(e.parent=null,this.children.splice(t,1),e.dispatchEvent(Uf),Gc.child=e,this.dispatchEvent(Gc),Gc.child=null),this}removeFromParent(){let e=this.parent;return e!==null&&e.remove(this),this}clear(){return this.remove(...this.children)}attach(e){return this.updateWorldMatrix(!0,!1),Yn.copy(this.matrixWorld).invert(),e.parent!==null&&(e.parent.updateWorldMatrix(!0,!1),Yn.multiply(e.parent.matrixWorld)),e.applyMatrix4(Yn),e.removeFromParent(),e.parent=this,this.children.push(e),e.updateWorldMatrix(!1,!0),e.dispatchEvent(wh),ws.child=e,this.dispatchEvent(ws),ws.child=null,this}getObjectById(e){return this.getObjectByProperty("id",e)}getObjectByName(e){return this.getObjectByProperty("name",e)}getObjectByProperty(e,t){if(this[e]===t)return this;for(let n=0,s=this.children.length;n<s;n++){let o=this.children[n].getObjectByProperty(e,t);if(o!==void 0)return o}}getObjectsByProperty(e,t,n=[]){this[e]===t&&n.push(this);let s=this.children;for(let r=0,o=s.length;r<o;r++)s[r].getObjectsByProperty(e,t,n);return n}getWorldPosition(e){return this.updateWorldMatrix(!0,!1),e.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(xr,e,Df),e}getWorldScale(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(xr,Nf,e),e}getWorldDirection(e){this.updateWorldMatrix(!0,!1);let t=this.matrixWorld.elements;return e.set(t[8],t[9],t[10]).normalize()}raycast(){}intersectsFrustum(){}traverse(e){e(this);let t=this.children;for(let n=0,s=t.length;n<s;n++)t[n].traverse(e)}traverseVisible(e){if(this.visible===!1)return;e(this);let t=this.children;for(let n=0,s=t.length;n<s;n++)t[n].traverseVisible(e)}traverseAncestors(e){let t=this.parent;t!==null&&(e(t),t.traverseAncestors(e))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale);let e=this.pivot;if(e!==null){let t=e.x,n=e.y,s=e.z,r=this.matrix.elements;r[12]+=t-r[0]*t-r[4]*n-r[8]*s,r[13]+=n-r[1]*t-r[5]*n-r[9]*s,r[14]+=s-r[2]*t-r[6]*n-r[10]*s}this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(e){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||e)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,e=!0);let t=this.children;for(let n=0,s=t.length;n<s;n++)t[n].updateMatrixWorld(e)}updateWorldMatrix(e,t,n=!1){let s=this.parent;if(e===!0&&s!==null&&s.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||n)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,n=!0),t===!0){let r=this.children;for(let o=0,a=r.length;o<a;o++)r[o].updateWorldMatrix(!1,!0,n)}}toJSON(e){let t=e===void 0||typeof e=="string",n={};t&&(e={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},n.metadata={version:4.7,type:"Object",generator:"Object3D.toJSON"});let s={};s.uuid=this.uuid,s.type=this.type,s.name=this.name,s.castShadow=this.castShadow,s.receiveShadow=this.receiveShadow,s.visible=this.visible,s.frustumCulled=this.frustumCulled,s.renderOrder=this.renderOrder,s.static=this.static,s.matrixAutoUpdate=this.matrixAutoUpdate,Object.keys(this.userData).length>0&&(s.userData=this.userData),s.layers=this.layers.mask,s.matrix=this.matrix.toArray(),s.up=this.up.toArray(),this.pivot!==null&&(s.pivot=this.pivot.toArray()),this.morphTargetDictionary!==void 0&&(s.morphTargetDictionary=Object.assign({},this.morphTargetDictionary)),this.morphTargetInfluences!==void 0&&(s.morphTargetInfluences=this.morphTargetInfluences.slice()),this.isInstancedMesh&&(s.type="InstancedMesh",s.count=this.count,s.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(s.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(s.type="BatchedMesh",s.perObjectFrustumCulled=this.perObjectFrustumCulled,s.sortObjects=this.sortObjects,s.drawRanges=this._drawRanges,s.reservedRanges=this._reservedRanges,s.geometryInfo=this._geometryInfo.map(a=>({...a,boundingBox:a.boundingBox?a.boundingBox.toJSON():void 0,boundingSphere:a.boundingSphere?a.boundingSphere.toJSON():void 0})),s.instanceInfo=this._instanceInfo.map(a=>({...a})),s.availableInstanceIds=this._availableInstanceIds.slice(),s.availableGeometryIds=this._availableGeometryIds.slice(),s.nextIndexStart=this._nextIndexStart,s.nextVertexStart=this._nextVertexStart,s.geometryCount=this._geometryCount,s.maxInstanceCount=this._maxInstanceCount,s.maxVertexCount=this._maxVertexCount,s.maxIndexCount=this._maxIndexCount,s.geometryInitialized=this._geometryInitialized,s.matricesTexture=this._matricesTexture.toJSON(e),s.indirectTexture=this._indirectTexture.toJSON(e),this._colorsTexture!==null&&(s.colorsTexture=this._colorsTexture.toJSON(e)),this.boundingSphere!==null&&(s.boundingSphere=this.boundingSphere.toJSON()),this.boundingBox!==null&&(s.boundingBox=this.boundingBox.toJSON()));function r(a,c){return a[c.uuid]===void 0&&(a[c.uuid]=c.toJSON(e)),c.uuid}if(this.isScene)this.background&&(this.background.isColor?s.background=this.background.toJSON():this.background.isTexture&&(s.background=this.background.toJSON(e).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(s.environment=this.environment.toJSON(e).uuid);else if(this.isMesh||this.isLine||this.isPoints){s.geometry=r(e.geometries,this.geometry);let a=this.geometry.parameters;if(a!==void 0&&a.shapes!==void 0){let c=a.shapes;if(Array.isArray(c))for(let l=0,h=c.length;l<h;l++){let d=c[l];r(e.shapes,d)}else r(e.shapes,c)}}if(this.isSkinnedMesh&&(s.bindMode=this.bindMode,s.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(r(e.skeletons,this.skeleton),s.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){let a=[];for(let c=0,l=this.material.length;c<l;c++)a.push(r(e.materials,this.material[c]));s.material=a}else s.material=r(e.materials,this.material);if(this.children.length>0){s.children=[];for(let a=0;a<this.children.length;a++)s.children.push(this.children[a].toJSON(e).object)}if(this.animations.length>0){s.animations=[];for(let a=0;a<this.animations.length;a++){let c=this.animations[a];s.animations.push(r(e.animations,c))}}if(t){let a=o(e.geometries),c=o(e.materials),l=o(e.textures),h=o(e.images),d=o(e.shapes),u=o(e.skeletons),p=o(e.animations),g=o(e.nodes);a.length>0&&(n.geometries=a),c.length>0&&(n.materials=c),l.length>0&&(n.textures=l),h.length>0&&(n.images=h),d.length>0&&(n.shapes=d),u.length>0&&(n.skeletons=u),p.length>0&&(n.animations=p),g.length>0&&(n.nodes=g)}return n.object=s,n;function o(a){let c=[];for(let l in a){let h=a[l];delete h.metadata,c.push(h)}return c}}clone(e){return new this.constructor().copy(this,e)}copy(e,t=!0){if(this.name=e.name,this.up.copy(e.up),this.position.copy(e.position),this.rotation.order=e.rotation.order,this.quaternion.copy(e.quaternion),this.scale.copy(e.scale),this.pivot=e.pivot!==null?e.pivot.clone():null,this.matrix.copy(e.matrix),this.matrixWorld.copy(e.matrixWorld),this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrixWorldAutoUpdate=e.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=e.matrixWorldNeedsUpdate,this.layers.mask=e.layers.mask,this.visible=e.visible,this.castShadow=e.castShadow,this.receiveShadow=e.receiveShadow,this.frustumCulled=e.frustumCulled,this.renderOrder=e.renderOrder,this.static=e.static,this.animations=e.animations.slice(),this.userData=JSON.parse(JSON.stringify(e.userData)),t===!0)for(let n=0;n<e.children.length;n++){let s=e.children[n];this.add(s.clone())}return this}dispose(){this.dispatchEvent({type:"dispose"})}};ht.DEFAULT_UP=new N(0,1,0);ht.DEFAULT_MATRIX_AUTO_UPDATE=!0;ht.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;var Bt=class extends ht{constructor(){super(),this.isGroup=!0,this.type="Group"}},Of={type:"move"},Vs=class{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new Bt,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new Bt,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new N,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new N),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new Bt,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new N,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new N,this._grip.eventsEnabled=!1),this._grip}dispatchEvent(e){return this._targetRay!==null&&this._targetRay.dispatchEvent(e),this._grip!==null&&this._grip.dispatchEvent(e),this._hand!==null&&this._hand.dispatchEvent(e),this}connect(e){if(e&&e.hand){let t=this._hand;if(t)for(let n of e.hand.values())this._getHandJoint(t,n)}return this.dispatchEvent({type:"connected",data:e}),this}disconnect(e){return this.dispatchEvent({type:"disconnected",data:e}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(e,t,n){let s=null,r=null,o=null,a=this._targetRay,c=this._grip,l=this._hand;if(e&&t.session.visibilityState!=="visible-blurred"){if(l&&e.hand){o=!0;for(let b of e.hand.values()){let m=t.getJointPose(b,n),f=this._getHandJoint(l,b);m!==null&&(f.matrix.fromArray(m.transform.matrix),f.matrix.decompose(f.position,f.rotation,f.scale),f.matrixWorldNeedsUpdate=!0,f.jointRadius=m.radius),f.visible=m!==null}let h=l.joints["index-finger-tip"],d=l.joints["thumb-tip"],u=h.position.distanceTo(d.position),p=.02,g=.005;l.inputState.pinching&&u>p+g?(l.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:e.handedness,target:this})):!l.inputState.pinching&&u<=p-g&&(l.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:e.handedness,target:this}))}else c!==null&&e.gripSpace&&(r=t.getPose(e.gripSpace,n),r!==null&&(c.matrix.fromArray(r.transform.matrix),c.matrix.decompose(c.position,c.rotation,c.scale),c.matrixWorldNeedsUpdate=!0,r.linearVelocity?(c.hasLinearVelocity=!0,c.linearVelocity.copy(r.linearVelocity)):c.hasLinearVelocity=!1,r.angularVelocity?(c.hasAngularVelocity=!0,c.angularVelocity.copy(r.angularVelocity)):c.hasAngularVelocity=!1,c.eventsEnabled&&c.dispatchEvent({type:"gripUpdated",data:e,target:this})));a!==null&&(s=t.getPose(e.targetRaySpace,n),s===null&&r!==null&&(s=r),s!==null&&(a.matrix.fromArray(s.transform.matrix),a.matrix.decompose(a.position,a.rotation,a.scale),a.matrixWorldNeedsUpdate=!0,s.linearVelocity?(a.hasLinearVelocity=!0,a.linearVelocity.copy(s.linearVelocity)):a.hasLinearVelocity=!1,s.angularVelocity?(a.hasAngularVelocity=!0,a.angularVelocity.copy(s.angularVelocity)):a.hasAngularVelocity=!1,this.dispatchEvent(Of)))}return a!==null&&(a.visible=s!==null),c!==null&&(c.visible=r!==null),l!==null&&(l.visible=o!==null),this}_getHandJoint(e,t){if(e.joints[t.jointName]===void 0){let n=new Bt;n.matrixAutoUpdate=!1,n.visible=!1,e.joints[t.jointName]=n,e.add(n)}return e.joints[t.jointName]}},Bu={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},yi={h:0,s:0,l:0},wo={h:0,s:0,l:0};function Wc(i,e,t){return t<0&&(t+=1),t>1&&(t-=1),t<1/6?i+(e-i)*6*t:t<1/2?e:t<2/3?i+(e-i)*6*(2/3-t):i}var pe=class{constructor(e,t,n){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(e,t,n)}set(e,t,n){if(t===void 0&&n===void 0){let s=e;s&&s.isColor?this.copy(s):typeof s=="number"?this.setHex(s):typeof s=="string"&&this.setStyle(s)}else this.setRGB(e,t,n);return this}setScalar(e){return this.r=e,this.g=e,this.b=e,this}setHex(e,t=Ct){return e=Math.floor(e),this.r=(e>>16&255)/255,this.g=(e>>8&255)/255,this.b=(e&255)/255,Be.colorSpaceToWorking(this,t),this}setRGB(e,t,n,s=Be.workingColorSpace){return this.r=e,this.g=t,this.b=n,Be.colorSpaceToWorking(this,s),this}setHSL(e,t,n,s=Be.workingColorSpace){if(e=Hl(e,1),t=ke(t,0,1),n=ke(n,0,1),t===0)this.r=this.g=this.b=n;else{let r=n<=.5?n*(1+t):n+t-n*t,o=2*n-r;this.r=Wc(o,r,e+1/3),this.g=Wc(o,r,e),this.b=Wc(o,r,e-1/3)}return Be.colorSpaceToWorking(this,s),this}setStyle(e,t=Ct){function n(r){r!==void 0&&parseFloat(r)<1&&Ae("Color: Alpha component of "+e+" will be ignored.")}let s;if(s=/^(\w+)\(([^\)]*)\)/.exec(e)){let r,o=s[1],a=s[2];switch(o){case"rgb":case"rgba":if(r=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return n(r[4]),this.setRGB(Math.min(255,parseInt(r[1],10))/255,Math.min(255,parseInt(r[2],10))/255,Math.min(255,parseInt(r[3],10))/255,t);if(r=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return n(r[4]),this.setRGB(Math.min(100,parseInt(r[1],10))/100,Math.min(100,parseInt(r[2],10))/100,Math.min(100,parseInt(r[3],10))/100,t);break;case"hsl":case"hsla":if(r=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return n(r[4]),this.setHSL(parseFloat(r[1])/360,parseFloat(r[2])/100,parseFloat(r[3])/100,t);break;default:Ae("Color: Unknown color model "+e)}}else if(s=/^\#([A-Fa-f\d]+)$/.exec(e)){let r=s[1],o=r.length;if(o===3)return this.setRGB(parseInt(r.charAt(0),16)/15,parseInt(r.charAt(1),16)/15,parseInt(r.charAt(2),16)/15,t);if(o===6)return this.setHex(parseInt(r,16),t);Ae("Color: Invalid hex color "+e)}else if(e&&e.length>0)return this.setColorName(e,t);return this}setColorName(e,t=Ct){let n=Bu[e.toLowerCase()];return n!==void 0?this.setHex(n,t):Ae("Color: Unknown color "+e),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(e){return this.r=e.r,this.g=e.g,this.b=e.b,this}copySRGBToLinear(e){return this.r=Qn(e.r),this.g=Qn(e.g),this.b=Qn(e.b),this}copyLinearToSRGB(e){return this.r=Us(e.r),this.g=Us(e.g),this.b=Us(e.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(e=Ct){return Be.workingToColorSpace(Wt.copy(this),e),Math.round(ke(Wt.r*255,0,255))*65536+Math.round(ke(Wt.g*255,0,255))*256+Math.round(ke(Wt.b*255,0,255))}getHexString(e=Ct){return("000000"+this.getHex(e).toString(16)).slice(-6)}getHSL(e,t=Be.workingColorSpace){Be.workingToColorSpace(Wt.copy(this),t);let n=Wt.r,s=Wt.g,r=Wt.b,o=Math.max(n,s,r),a=Math.min(n,s,r),c,l,h=(a+o)/2;if(a===o)c=0,l=0;else{let d=o-a;switch(l=h<=.5?d/(o+a):d/(2-o-a),o){case n:c=(s-r)/d+(s<r?6:0);break;case s:c=(r-n)/d+2;break;case r:c=(n-s)/d+4;break}c/=6}return e.h=c,e.s=l,e.l=h,e}getRGB(e,t=Be.workingColorSpace){return Be.workingToColorSpace(Wt.copy(this),t),e.r=Wt.r,e.g=Wt.g,e.b=Wt.b,e}getStyle(e=Ct){Be.workingToColorSpace(Wt.copy(this),e);let t=Wt.r,n=Wt.g,s=Wt.b;return e!==Ct?`color(${e} ${t.toFixed(3)} ${n.toFixed(3)} ${s.toFixed(3)})`:`rgb(${Math.round(t*255)},${Math.round(n*255)},${Math.round(s*255)})`}offsetHSL(e,t,n){return this.getHSL(yi),this.setHSL(yi.h+e,yi.s+t,yi.l+n)}add(e){return this.r+=e.r,this.g+=e.g,this.b+=e.b,this}addColors(e,t){return this.r=e.r+t.r,this.g=e.g+t.g,this.b=e.b+t.b,this}addScalar(e){return this.r+=e,this.g+=e,this.b+=e,this}sub(e){return this.r=Math.max(0,this.r-e.r),this.g=Math.max(0,this.g-e.g),this.b=Math.max(0,this.b-e.b),this}multiply(e){return this.r*=e.r,this.g*=e.g,this.b*=e.b,this}multiplyScalar(e){return this.r*=e,this.g*=e,this.b*=e,this}lerp(e,t){return this.r+=(e.r-this.r)*t,this.g+=(e.g-this.g)*t,this.b+=(e.b-this.b)*t,this}lerpColors(e,t,n){return this.r=e.r+(t.r-e.r)*n,this.g=e.g+(t.g-e.g)*n,this.b=e.b+(t.b-e.b)*n,this}lerpHSL(e,t){this.getHSL(yi),e.getHSL(wo);let n=Er(yi.h,wo.h,t),s=Er(yi.s,wo.s,t),r=Er(yi.l,wo.l,t);return this.setHSL(n,s,r),this}setFromVector3(e){return this.r=e.x,this.g=e.y,this.b=e.z,this}applyMatrix3(e){let t=this.r,n=this.g,s=this.b,r=e.elements;return this.r=r[0]*t+r[3]*n+r[6]*s,this.g=r[1]*t+r[4]*n+r[7]*s,this.b=r[2]*t+r[5]*n+r[8]*s,this}equals(e){return e.r===this.r&&e.g===this.g&&e.b===this.b}fromArray(e,t=0){return this.r=e[t],this.g=e[t+1],this.b=e[t+2],this}toArray(e=[],t=0){return e[t]=this.r,e[t+1]=this.g,e[t+2]=this.b,e}fromBufferAttribute(e,t){return this.r=e.getX(t),this.g=e.getY(t),this.b=e.getZ(t),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}},Wt=new pe;pe.NAMES=Bu;var ei=class extends ht{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new In,this.environmentIntensity=1,this.environmentRotation=new In,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(e,t){return super.copy(e,t),e.background!==null&&(this.background=e.background.clone()),e.environment!==null&&(this.environment=e.environment.clone()),e.fog!==null&&(this.fog=e.fog.clone()),this.backgroundBlurriness=e.backgroundBlurriness,this.backgroundIntensity=e.backgroundIntensity,this.backgroundRotation.copy(e.backgroundRotation),this.environmentIntensity=e.environmentIntensity,this.environmentRotation.copy(e.environmentRotation),e.overrideMaterial!==null&&(this.overrideMaterial=e.overrideMaterial.clone()),this.matrixAutoUpdate=e.matrixAutoUpdate,this}toJSON(e){let t=super.toJSON(e);return this.fog!==null&&(t.object.fog=this.fog.toJSON()),t.object.backgroundBlurriness=this.backgroundBlurriness,t.object.backgroundIntensity=this.backgroundIntensity,t.object.backgroundRotation=this.backgroundRotation.toArray(),t.object.environmentIntensity=this.environmentIntensity,t.object.environmentRotation=this.environmentRotation.toArray(),t}},Tn=new N,Zn=new N,Xc=new N,Kn=new N,Ts=new N,As=new N,Th=new N,qc=new N,Yc=new N,Zc=new N,Kc=new tt,$c=new tt,jc=new tt,wi=class i{constructor(e=new N,t=new N,n=new N){this.a=e,this.b=t,this.c=n}static getNormal(e,t,n,s){s.subVectors(n,t),Tn.subVectors(e,t),s.cross(Tn);let r=s.lengthSq();return r>0?s.multiplyScalar(1/Math.sqrt(r)):s.set(0,0,0)}static getBarycoord(e,t,n,s,r){Tn.subVectors(s,t),Zn.subVectors(n,t),Xc.subVectors(e,t);let o=Tn.dot(Tn),a=Tn.dot(Zn),c=Tn.dot(Xc),l=Zn.dot(Zn),h=Zn.dot(Xc),d=o*l-a*a;if(d===0)return r.set(0,0,0),null;let u=1/d,p=(l*c-a*h)*u,g=(o*h-a*c)*u;return r.set(1-p-g,g,p)}static containsPoint(e,t,n,s){return this.getBarycoord(e,t,n,s,Kn)===null?!1:Kn.x>=0&&Kn.y>=0&&Kn.x+Kn.y<=1}static getInterpolation(e,t,n,s,r,o,a,c){return this.getBarycoord(e,t,n,s,Kn)===null?(c.x=0,c.y=0,"z"in c&&(c.z=0),"w"in c&&(c.w=0),null):(c.setScalar(0),c.addScaledVector(r,Kn.x),c.addScaledVector(o,Kn.y),c.addScaledVector(a,Kn.z),c)}static getInterpolatedAttribute(e,t,n,s,r,o){return Kc.setScalar(0),$c.setScalar(0),jc.setScalar(0),Kc.fromBufferAttribute(e,t),$c.fromBufferAttribute(e,n),jc.fromBufferAttribute(e,s),o.setScalar(0),o.addScaledVector(Kc,r.x),o.addScaledVector($c,r.y),o.addScaledVector(jc,r.z),o}static isFrontFacing(e,t,n,s){return Tn.subVectors(n,t),Zn.subVectors(e,t),Tn.cross(Zn).dot(s)<0}set(e,t,n){return this.a.copy(e),this.b.copy(t),this.c.copy(n),this}setFromPointsAndIndices(e,t,n,s){return this.a.copy(e[t]),this.b.copy(e[n]),this.c.copy(e[s]),this}setFromAttributeAndIndices(e,t,n,s){return this.a.fromBufferAttribute(e,t),this.b.fromBufferAttribute(e,n),this.c.fromBufferAttribute(e,s),this}clone(){return new this.constructor().copy(this)}copy(e){return this.a.copy(e.a),this.b.copy(e.b),this.c.copy(e.c),this}getArea(){return Tn.subVectors(this.c,this.b),Zn.subVectors(this.a,this.b),Tn.cross(Zn).length()*.5}getMidpoint(e){return e.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(e){return i.getNormal(this.a,this.b,this.c,e)}getPlane(e){return e.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(e,t){return i.getBarycoord(e,this.a,this.b,this.c,t)}getInterpolation(e,t,n,s,r){return i.getInterpolation(e,this.a,this.b,this.c,t,n,s,r)}containsPoint(e){return i.containsPoint(e,this.a,this.b,this.c)}isFrontFacing(e){return i.isFrontFacing(this.a,this.b,this.c,e)}intersectsBox(e){return e.intersectsTriangle(this)}closestPointToPoint(e,t){let n=this.a,s=this.b,r=this.c,o,a;Ts.subVectors(s,n),As.subVectors(r,n),qc.subVectors(e,n);let c=Ts.dot(qc),l=As.dot(qc);if(c<=0&&l<=0)return t.copy(n);Yc.subVectors(e,s);let h=Ts.dot(Yc),d=As.dot(Yc);if(h>=0&&d<=h)return t.copy(s);let u=c*d-h*l;if(u<=0&&c>=0&&h<=0)return o=c/(c-h),t.copy(n).addScaledVector(Ts,o);Zc.subVectors(e,r);let p=Ts.dot(Zc),g=As.dot(Zc);if(g>=0&&p<=g)return t.copy(r);let b=p*l-c*g;if(b<=0&&l>=0&&g<=0)return a=l/(l-g),t.copy(n).addScaledVector(As,a);let m=h*g-p*d;if(m<=0&&d-h>=0&&p-g>=0)return Th.subVectors(r,s),a=(d-h)/(d-h+(p-g)),t.copy(s).addScaledVector(Th,a);let f=1/(m+b+u);return o=b*f,a=u*f,t.copy(n).addScaledVector(Ts,o).addScaledVector(As,a)}equals(e){return e.a.equals(this.a)&&e.b.equals(this.b)&&e.c.equals(this.c)}},jt=class{constructor(e=new N(1/0,1/0,1/0),t=new N(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=e,this.max=t}set(e,t){return this.min.copy(e),this.max.copy(t),this}setFromArray(e){this.makeEmpty();for(let t=0,n=e.length;t<n;t+=3)this.expandByPoint(An.fromArray(e,t));return this}setFromBufferAttribute(e){this.makeEmpty();for(let t=0,n=e.count;t<n;t++)this.expandByPoint(An.fromBufferAttribute(e,t));return this}setFromPoints(e){this.makeEmpty();for(let t=0,n=e.length;t<n;t++)this.expandByPoint(e[t]);return this}setFromCenterAndSize(e,t){let n=An.copy(t).multiplyScalar(.5);return this.min.copy(e).sub(n),this.max.copy(e).add(n),this}setFromObject(e,t=!1){return this.makeEmpty(),this.expandByObject(e,t)}clone(){return new this.constructor().copy(this)}copy(e){return this.min.copy(e.min),this.max.copy(e.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(e){return this.isEmpty()?e.set(0,0,0):e.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(e){return this.isEmpty()?e.set(0,0,0):e.subVectors(this.max,this.min)}expandByPoint(e){return this.min.min(e),this.max.max(e),this}expandByVector(e){return this.min.sub(e),this.max.add(e),this}expandByScalar(e){return this.min.addScalar(-e),this.max.addScalar(e),this}expandByObject(e,t=!1){e.updateWorldMatrix(!1,!1);let n=e.geometry;if(n!==void 0){let r=n.getAttribute("position");if(t===!0&&r!==void 0&&e.isInstancedMesh!==!0)for(let o=0,a=r.count;o<a;o++)e.isMesh===!0?e.getVertexPosition(o,An):An.fromBufferAttribute(r,o),An.applyMatrix4(e.matrixWorld),this.expandByPoint(An);else e.boundingBox!==void 0?(e.boundingBox===null&&e.computeBoundingBox(),To.copy(e.boundingBox)):(n.boundingBox===null&&n.computeBoundingBox(),To.copy(n.boundingBox)),To.applyMatrix4(e.matrixWorld),this.union(To)}let s=e.children;for(let r=0,o=s.length;r<o;r++)this.expandByObject(s[r],t);return this}containsPoint(e){return e.x>=this.min.x&&e.x<=this.max.x&&e.y>=this.min.y&&e.y<=this.max.y&&e.z>=this.min.z&&e.z<=this.max.z}containsBox(e){return this.min.x<=e.min.x&&e.max.x<=this.max.x&&this.min.y<=e.min.y&&e.max.y<=this.max.y&&this.min.z<=e.min.z&&e.max.z<=this.max.z}getParameter(e,t){return t.set((e.x-this.min.x)/(this.max.x-this.min.x),(e.y-this.min.y)/(this.max.y-this.min.y),(e.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(e){return e.max.x>=this.min.x&&e.min.x<=this.max.x&&e.max.y>=this.min.y&&e.min.y<=this.max.y&&e.max.z>=this.min.z&&e.min.z<=this.max.z}intersectsSphere(e){return this.clampPoint(e.center,An),An.distanceToSquared(e.center)<=e.radius*e.radius}intersectsPlane(e){let t,n;return e.normal.x>0?(t=e.normal.x*this.min.x,n=e.normal.x*this.max.x):(t=e.normal.x*this.max.x,n=e.normal.x*this.min.x),e.normal.y>0?(t+=e.normal.y*this.min.y,n+=e.normal.y*this.max.y):(t+=e.normal.y*this.max.y,n+=e.normal.y*this.min.y),e.normal.z>0?(t+=e.normal.z*this.min.z,n+=e.normal.z*this.max.z):(t+=e.normal.z*this.max.z,n+=e.normal.z*this.min.z),t<=-e.constant&&n>=-e.constant}intersectsTriangle(e){if(this.isEmpty())return!1;this.getCenter(yr),Ao.subVectors(this.max,yr),Es.subVectors(e.a,yr),Rs.subVectors(e.b,yr),Cs.subVectors(e.c,yr),vi.subVectors(Rs,Es),Mi.subVectors(Cs,Rs),Gi.subVectors(Es,Cs);let t=[0,-vi.z,vi.y,0,-Mi.z,Mi.y,0,-Gi.z,Gi.y,vi.z,0,-vi.x,Mi.z,0,-Mi.x,Gi.z,0,-Gi.x,-vi.y,vi.x,0,-Mi.y,Mi.x,0,-Gi.y,Gi.x,0];return!Jc(t,Es,Rs,Cs,Ao)||(t=[1,0,0,0,1,0,0,0,1],!Jc(t,Es,Rs,Cs,Ao))?!1:(Eo.crossVectors(vi,Mi),t=[Eo.x,Eo.y,Eo.z],Jc(t,Es,Rs,Cs,Ao))}clampPoint(e,t){return t.copy(e).clamp(this.min,this.max)}distanceToPoint(e){return this.clampPoint(e,An).distanceTo(e)}getBoundingSphere(e){return this.isEmpty()?e.makeEmpty():(this.getCenter(e.center),e.radius=this.getSize(An).length()*.5),e}intersect(e){return this.min.max(e.min),this.max.min(e.max),this.isEmpty()&&this.makeEmpty(),this}union(e){return this.min.min(e.min),this.max.max(e.max),this}applyMatrix4(e){return this.isEmpty()?this:($n[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(e),$n[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(e),$n[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(e),$n[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(e),$n[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(e),$n[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(e),$n[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(e),$n[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(e),this.setFromPoints($n),this)}translate(e){return this.min.add(e),this.max.add(e),this}equals(e){return e.min.equals(this.min)&&e.max.equals(this.max)}toJSON(){return{min:this.min.toArray(),max:this.max.toArray()}}fromJSON(e){return this.min.fromArray(e.min),this.max.fromArray(e.max),this}},$n=[new N,new N,new N,new N,new N,new N,new N,new N],An=new N,To=new jt,Es=new N,Rs=new N,Cs=new N,vi=new N,Mi=new N,Gi=new N,yr=new N,Ao=new N,Eo=new N,Wi=new N;function Jc(i,e,t,n,s){for(let r=0,o=i.length-3;r<=o;r+=3){Wi.fromArray(i,r);let a=s.x*Math.abs(Wi.x)+s.y*Math.abs(Wi.y)+s.z*Math.abs(Wi.z),c=e.dot(Wi),l=t.dot(Wi),h=n.dot(Wi);if(Math.max(-Math.max(c,l,h),Math.min(c,l,h))>a)return!1}return!0}var At=new N,Ro=new we,Ff=0,yt=class extends xn{constructor(e,t,n=!1){if(super(),Array.isArray(e))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,Object.defineProperty(this,"id",{value:Ff++}),this.name="",this.array=e,this.itemSize=t,this.count=e!==void 0?e.length/t:0,this.normalized=n,this.usage=kl,this.updateRanges=[],this.gpuType=dn,this.version=0}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}setUsage(e){return this.usage=e,this}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.name=e.name,this.array=new e.array.constructor(e.array),this.itemSize=e.itemSize,this.count=e.count,this.normalized=e.normalized,this.usage=e.usage,this.gpuType=e.gpuType,this}copyAt(e,t,n){e*=this.itemSize,n*=t.itemSize;for(let s=0,r=this.itemSize;s<r;s++)this.array[e+s]=t.array[n+s];return this}copyArray(e){return this.array.set(e),this}applyMatrix3(e){if(this.itemSize===2)for(let t=0,n=this.count;t<n;t++)Ro.fromBufferAttribute(this,t),Ro.applyMatrix3(e),this.setXY(t,Ro.x,Ro.y);else if(this.itemSize===3)for(let t=0,n=this.count;t<n;t++)At.fromBufferAttribute(this,t),At.applyMatrix3(e),this.setXYZ(t,At.x,At.y,At.z);return this}applyMatrix4(e){for(let t=0,n=this.count;t<n;t++)At.fromBufferAttribute(this,t),At.applyMatrix4(e),this.setXYZ(t,At.x,At.y,At.z);return this}applyNormalMatrix(e){for(let t=0,n=this.count;t<n;t++)At.fromBufferAttribute(this,t),At.applyNormalMatrix(e),this.setXYZ(t,At.x,At.y,At.z);return this}transformDirection(e){for(let t=0,n=this.count;t<n;t++)At.fromBufferAttribute(this,t),At.transformDirection(e),this.setXYZ(t,At.x,At.y,At.z);return this}set(e,t=0){return this.array.set(e,t),this}getComponent(e,t){let n=this.array[e*this.itemSize+t];return this.normalized&&(n=En(n,this.array)),n}setComponent(e,t,n){return this.normalized&&(n=et(n,this.array)),this.array[e*this.itemSize+t]=n,this}getX(e){let t=this.array[e*this.itemSize];return this.normalized&&(t=En(t,this.array)),t}setX(e,t){return this.normalized&&(t=et(t,this.array)),this.array[e*this.itemSize]=t,this}getY(e){let t=this.array[e*this.itemSize+1];return this.normalized&&(t=En(t,this.array)),t}setY(e,t){return this.normalized&&(t=et(t,this.array)),this.array[e*this.itemSize+1]=t,this}getZ(e){let t=this.array[e*this.itemSize+2];return this.normalized&&(t=En(t,this.array)),t}setZ(e,t){return this.normalized&&(t=et(t,this.array)),this.array[e*this.itemSize+2]=t,this}getW(e){let t=this.array[e*this.itemSize+3];return this.normalized&&(t=En(t,this.array)),t}setW(e,t){return this.normalized&&(t=et(t,this.array)),this.array[e*this.itemSize+3]=t,this}setXY(e,t,n){return e*=this.itemSize,this.normalized&&(t=et(t,this.array),n=et(n,this.array)),this.array[e+0]=t,this.array[e+1]=n,this}setXYZ(e,t,n,s){return e*=this.itemSize,this.normalized&&(t=et(t,this.array),n=et(n,this.array),s=et(s,this.array)),this.array[e+0]=t,this.array[e+1]=n,this.array[e+2]=s,this}setXYZW(e,t,n,s,r){return e*=this.itemSize,this.normalized&&(t=et(t,this.array),n=et(n,this.array),s=et(s,this.array),r=et(r,this.array)),this.array[e+0]=t,this.array[e+1]=n,this.array[e+2]=s,this.array[e+3]=r,this}onUpload(e){return this.onUploadCallback=e,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){let e={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return e.name=this.name,e.usage=this.usage,e.gpuType=this.gpuType,e}dispose(){this.dispatchEvent({type:"dispose"})}};var Dr=class extends yt{constructor(e,t,n){super(new Uint16Array(e),t,n)}};var Nr=class extends yt{constructor(e,t,n){super(new Uint32Array(e),t,n)}};var Et=class extends yt{constructor(e,t,n){super(new Float32Array(e),t,n)}},Bf=new jt,vr=new N,Qc=new N,nn=class{constructor(e=new N,t=-1){this.isSphere=!0,this.center=e,this.radius=t}set(e,t){return this.center.copy(e),this.radius=t,this}setFromPoints(e,t){let n=this.center;t!==void 0?n.copy(t):Bf.setFromPoints(e).getCenter(n);let s=0;for(let r=0,o=e.length;r<o;r++)s=Math.max(s,n.distanceToSquared(e[r]));return this.radius=Math.sqrt(s),this}copy(e){return this.center.copy(e.center),this.radius=e.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(e){return e.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(e){return e.distanceTo(this.center)-this.radius}intersectsSphere(e){let t=this.radius+e.radius;return e.center.distanceToSquared(this.center)<=t*t}intersectsBox(e){return e.intersectsSphere(this)}intersectsPlane(e){return Math.abs(e.distanceToPoint(this.center))<=this.radius}clampPoint(e,t){let n=this.center.distanceToSquared(e);return t.copy(e),n>this.radius*this.radius&&(t.sub(this.center).normalize(),t.multiplyScalar(this.radius).add(this.center)),t}getBoundingBox(e){return this.isEmpty()?(e.makeEmpty(),e):(e.set(this.center,this.center),e.expandByScalar(this.radius),e)}applyMatrix4(e){return this.center.applyMatrix4(e),this.radius=this.radius*e.getMaxScaleOnAxis(),this}translate(e){return this.center.add(e),this}expandByPoint(e){if(this.isEmpty())return this.center.copy(e),this.radius=0,this;vr.subVectors(e,this.center);let t=vr.lengthSq();if(t>this.radius*this.radius){let n=Math.sqrt(t),s=(n-this.radius)*.5;this.center.addScaledVector(vr,s/n),this.radius+=s}return this}union(e){return e.isEmpty()?this:this.isEmpty()?(this.copy(e),this):(this.center.equals(e.center)===!0?this.radius=Math.max(this.radius,e.radius):(Qc.subVectors(e.center,this.center).setLength(e.radius),this.expandByPoint(vr.copy(e.center).add(Qc)),this.expandByPoint(vr.copy(e.center).sub(Qc))),this)}equals(e){return e.center.equals(this.center)&&e.radius===this.radius}clone(){return new this.constructor().copy(this)}toJSON(){return{radius:this.radius,center:this.center.toArray()}}fromJSON(e){return this.radius=e.radius,this.center.fromArray(e.center),this}},kf=0,gn=new Ue,el=new ht,Is=new N,ln=new jt,Mr=new jt,Ot=new N,bt=class i extends xn{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:kf++}),this.uuid=Cn(),this.name="",this.type="BufferGeometry",this.index=null,this.indirect=null,this.indirectOffset=0,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={},this._transformed=!1}getIndex(){return this.index}setIndex(e){return Array.isArray(e)?this.index=new(lf(e)?Nr:Dr)(e,1):this.index=e,this}setIndirect(e,t=0){return this.indirect=e,this.indirectOffset=t,this}getIndirect(){return this.indirect}getAttribute(e){return this.attributes[e]}setAttribute(e,t){return this.attributes[e]=t,this}deleteAttribute(e){return delete this.attributes[e],this}hasAttribute(e){return this.attributes[e]!==void 0}addGroup(e,t,n=0){this.groups.push({start:e,count:t,materialIndex:n})}clearGroups(){this.groups=[]}setDrawRange(e,t){this.drawRange.start=e,this.drawRange.count=t}applyMatrix4(e){let t=this.attributes.position;t!==void 0&&(t.applyMatrix4(e),t.needsUpdate=!0);let n=this.attributes.normal;if(n!==void 0){let r=new Le().getNormalMatrix(e);n.applyNormalMatrix(r),n.needsUpdate=!0}let s=this.attributes.tangent;return s!==void 0&&(s.transformDirection(e),s.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this._transformed=!0,this}applyQuaternion(e){return gn.makeRotationFromQuaternion(e),this.applyMatrix4(gn),this}rotateX(e){return gn.makeRotationX(e),this.applyMatrix4(gn),this}rotateY(e){return gn.makeRotationY(e),this.applyMatrix4(gn),this}rotateZ(e){return gn.makeRotationZ(e),this.applyMatrix4(gn),this}translate(e,t,n){return gn.makeTranslation(e,t,n),this.applyMatrix4(gn),this}scale(e,t,n){return gn.makeScale(e,t,n),this.applyMatrix4(gn),this}lookAt(e){return el.lookAt(e),el.updateMatrix(),this.applyMatrix4(el.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(Is).negate(),this.translate(Is.x,Is.y,Is.z),this}setFromPoints(e){let t=this.getAttribute("position");if(t===void 0){let n=[];for(let s=0,r=e.length;s<r;s++){let o=e[s];n.push(o.x,o.y,o.z||0)}this.setAttribute("position",new Et(n,3))}else{let n=Math.min(e.length,t.count);for(let s=0;s<n;s++){let r=e[s];t.setXYZ(s,r.x,r.y,r.z||0)}e.length>t.count&&Ae("BufferGeometry: Buffer size too small for points data. Use .dispose() and create a new geometry."),t.needsUpdate=!0}return this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new jt);let e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){Pe("BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.",this),this.boundingBox.set(new N(-1/0,-1/0,-1/0),new N(1/0,1/0,1/0));return}if(e!==void 0){if(this.boundingBox.setFromBufferAttribute(e),t)for(let n=0,s=t.length;n<s;n++){let r=t[n];ln.setFromBufferAttribute(r),this.morphTargetsRelative?(Ot.addVectors(this.boundingBox.min,ln.min),this.boundingBox.expandByPoint(Ot),Ot.addVectors(this.boundingBox.max,ln.max),this.boundingBox.expandByPoint(Ot)):(this.boundingBox.expandByPoint(ln.min),this.boundingBox.expandByPoint(ln.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&Pe('BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new nn);let e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){Pe("BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.",this),this.boundingSphere.set(new N,1/0);return}if(e){let n=this.boundingSphere.center;if(ln.setFromBufferAttribute(e),t)for(let r=0,o=t.length;r<o;r++){let a=t[r];Mr.setFromBufferAttribute(a),this.morphTargetsRelative?(Ot.addVectors(ln.min,Mr.min),ln.expandByPoint(Ot),Ot.addVectors(ln.max,Mr.max),ln.expandByPoint(Ot)):(ln.expandByPoint(Mr.min),ln.expandByPoint(Mr.max))}ln.getCenter(n);let s=0;for(let r=0,o=e.count;r<o;r++)Ot.fromBufferAttribute(e,r),s=Math.max(s,n.distanceToSquared(Ot));if(t)for(let r=0,o=t.length;r<o;r++){let a=t[r],c=this.morphTargetsRelative;for(let l=0,h=a.count;l<h;l++)Ot.fromBufferAttribute(a,l),c&&(Is.fromBufferAttribute(e,l),Ot.add(Is)),s=Math.max(s,n.distanceToSquared(Ot))}this.boundingSphere.radius=Math.sqrt(s),isNaN(this.boundingSphere.radius)&&Pe('BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){let e=this.index,t=this.attributes;if(e===null||t.position===void 0||t.normal===void 0||t.uv===void 0){Pe("BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}let n=t.position,s=t.normal,r=t.uv,o=this.getAttribute("tangent");(o===void 0||o.count!==n.count)&&(o=new yt(new Float32Array(4*n.count),4),this.setAttribute("tangent",o));let a=[],c=[];for(let x=0;x<n.count;x++)a[x]=new N,c[x]=new N;let l=new N,h=new N,d=new N,u=new we,p=new we,g=new we,b=new N,m=new N;function f(x,A,C){l.fromBufferAttribute(n,x),h.fromBufferAttribute(n,A),d.fromBufferAttribute(n,C),u.fromBufferAttribute(r,x),p.fromBufferAttribute(r,A),g.fromBufferAttribute(r,C),h.sub(l),d.sub(l),p.sub(u),g.sub(u);let L=1/(p.x*g.y-g.x*p.y);isFinite(L)&&(b.copy(h).multiplyScalar(g.y).addScaledVector(d,-p.y).multiplyScalar(L),m.copy(d).multiplyScalar(p.x).addScaledVector(h,-g.x).multiplyScalar(L),a[x].add(b),a[A].add(b),a[C].add(b),c[x].add(m),c[A].add(m),c[C].add(m))}let v=this.groups;v.length===0&&(v=[{start:0,count:e.count}]);for(let x=0,A=v.length;x<A;++x){let C=v[x],L=C.start,O=C.count;for(let W=L,I=L+O;W<I;W+=3)f(e.getX(W+0),e.getX(W+1),e.getX(W+2))}let T=new N,y=new N,S=new N,w=new N;function R(x){S.fromBufferAttribute(s,x),w.copy(S);let A=a[x];T.copy(A),T.sub(S.multiplyScalar(S.dot(A))).normalize(),y.crossVectors(w,A);let L=y.dot(c[x])<0?-1:1;o.setXYZW(x,T.x,T.y,T.z,L)}for(let x=0,A=v.length;x<A;++x){let C=v[x],L=C.start,O=C.count;for(let W=L,I=L+O;W<I;W+=3)R(e.getX(W+0)),R(e.getX(W+1)),R(e.getX(W+2))}this._transformed=!0}computeVertexNormals(){let e=this.index,t=this.getAttribute("position");if(t!==void 0){let n=this.getAttribute("normal");if(n===void 0||n.count!==t.count)n=new yt(new Float32Array(t.count*3),3),this.setAttribute("normal",n);else for(let u=0,p=n.count;u<p;u++)n.setXYZ(u,0,0,0);let s=new N,r=new N,o=new N,a=new N,c=new N,l=new N,h=new N,d=new N;if(e)for(let u=0,p=e.count;u<p;u+=3){let g=e.getX(u+0),b=e.getX(u+1),m=e.getX(u+2);s.fromBufferAttribute(t,g),r.fromBufferAttribute(t,b),o.fromBufferAttribute(t,m),h.subVectors(o,r),d.subVectors(s,r),h.cross(d),a.fromBufferAttribute(n,g),c.fromBufferAttribute(n,b),l.fromBufferAttribute(n,m),a.add(h),c.add(h),l.add(h),n.setXYZ(g,a.x,a.y,a.z),n.setXYZ(b,c.x,c.y,c.z),n.setXYZ(m,l.x,l.y,l.z)}else for(let u=0,p=t.count;u<p;u+=3)s.fromBufferAttribute(t,u+0),r.fromBufferAttribute(t,u+1),o.fromBufferAttribute(t,u+2),h.subVectors(o,r),d.subVectors(s,r),h.cross(d),n.setXYZ(u+0,h.x,h.y,h.z),n.setXYZ(u+1,h.x,h.y,h.z),n.setXYZ(u+2,h.x,h.y,h.z);this.normalizeNormals(),n.needsUpdate=!0}}normalizeNormals(){let e=this.attributes.normal;for(let t=0,n=e.count;t<n;t++)Ot.fromBufferAttribute(e,t),Ot.normalize(),e.setXYZ(t,Ot.x,Ot.y,Ot.z)}toNonIndexed(){function e(a,c){let l=a.array,h=a.itemSize,d=a.normalized,u=new l.constructor(c.length*h),p=0,g=0;for(let b=0,m=c.length;b<m;b++){a.isInterleavedBufferAttribute?p=c[b]*a.data.stride+a.offset:p=c[b]*h;for(let f=0;f<h;f++)u[g++]=l[p++]}return new yt(u,h,d)}if(this.index===null)return Ae("BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;let t=new i,n=this.index.array,s=this.attributes;for(let a in s){let c=s[a],l=e(c,n);t.setAttribute(a,l)}let r=this.morphAttributes;for(let a in r){let c=[],l=r[a];for(let h=0,d=l.length;h<d;h++){let u=l[h],p=e(u,n);c.push(p)}t.morphAttributes[a]=c}t.morphTargetsRelative=this.morphTargetsRelative;let o=this.groups;for(let a=0,c=o.length;a<c;a++){let l=o[a];t.addGroup(l.start,l.count,l.materialIndex)}return t}toJSON(){let e={metadata:{version:4.7,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(e.uuid=this.uuid,e.type=this.parameters!==void 0&&this._transformed===!0?"BufferGeometry":this.type,e.name=this.name,Object.keys(this.userData).length>0&&(e.userData=this.userData),this.parameters!==void 0&&this._transformed!==!0){let c=this.parameters;for(let l in c)c[l]!==void 0&&(e[l]=c[l]);return e}e.data={attributes:{}};let t=this.index;t!==null&&(e.data.index={type:t.array.constructor.name,array:Array.prototype.slice.call(t.array)});let n=this.attributes;for(let c in n){let l=n[c];e.data.attributes[c]=l.toJSON(e.data)}let s={},r=!1;for(let c in this.morphAttributes){let l=this.morphAttributes[c],h=[];for(let d=0,u=l.length;d<u;d++){let p=l[d];h.push(p.toJSON(e.data))}h.length>0&&(s[c]=h,r=!0)}r&&(e.data.morphAttributes=s,e.data.morphTargetsRelative=this.morphTargetsRelative);let o=this.groups;o.length>0&&(e.data.groups=JSON.parse(JSON.stringify(o)));let a=this.boundingSphere;return a!==null&&(e.data.boundingSphere=a.toJSON()),e}clone(){return new this.constructor().copy(this)}copy(e){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;let t={};this.name=e.name;let n=e.index;n!==null&&this.setIndex(n.clone());let s=e.attributes;for(let l in s){let h=s[l];this.setAttribute(l,h.clone(t))}let r=e.morphAttributes;for(let l in r){let h=[],d=r[l];for(let u=0,p=d.length;u<p;u++)h.push(d[u].clone(t));this.morphAttributes[l]=h}this.morphTargetsRelative=e.morphTargetsRelative;let o=e.groups;for(let l=0,h=o.length;l<h;l++){let d=o[l];this.addGroup(d.start,d.count,d.materialIndex)}let a=e.boundingBox;a!==null&&(this.boundingBox=a.clone());let c=e.boundingSphere;return c!==null&&(this.boundingSphere=c.clone()),this.drawRange.start=e.drawRange.start,this.drawRange.count=e.drawRange.count,this.userData=e.userData,this._transformed=e._transformed,this}dispose(){this.dispatchEvent({type:"dispose"})}},Gs=class{constructor(e,t){this.isInterleavedBuffer=!0,this.array=e,this.stride=t,this.count=e!==void 0?e.length/t:0,this.usage=kl,this.updateRanges=[],this.version=0,this.uuid=Cn()}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}setUsage(e){return this.usage=e,this}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.array=new e.array.constructor(e.array),this.count=e.count,this.stride=e.stride,this.usage=e.usage,this}copyAt(e,t,n){e*=this.stride,n*=t.stride;for(let s=0,r=this.stride;s<r;s++)this.array[e+s]=t.array[n+s];return this}set(e,t=0){return this.array.set(e,t),this}clone(e){e.arrayBuffers===void 0&&(e.arrayBuffers={}),this.array.buffer._uuid===void 0&&(this.array.buffer._uuid=Cn()),e.arrayBuffers[this.array.buffer._uuid]===void 0&&(e.arrayBuffers[this.array.buffer._uuid]=this.array.slice(0).buffer);let t=new this.array.constructor(e.arrayBuffers[this.array.buffer._uuid]),n=new this.constructor(t,this.stride);return n.setUsage(this.usage),n}onUpload(e){return this.onUploadCallback=e,this}toJSON(e){e.arrayBuffers===void 0&&(e.arrayBuffers={}),this.array.buffer._uuid===void 0&&(this.array.buffer._uuid=Cn()),e.arrayBuffers[this.array.buffer._uuid]===void 0&&(e.arrayBuffers[this.array.buffer._uuid]=Array.from(new Uint32Array(this.array.buffer)));let t={uuid:this.uuid,buffer:this.array.buffer._uuid,type:this.array.constructor.name,stride:this.stride};return t.usage=this.usage,t}},Kt=new N,Ws=class i{constructor(e,t,n,s=!1){this.isInterleavedBufferAttribute=!0,this.name="",this.data=e,this.itemSize=t,this.offset=n,this.normalized=s}get count(){return this.data.count}get array(){return this.data.array}set needsUpdate(e){this.data.needsUpdate=e}applyMatrix4(e){for(let t=0,n=this.data.count;t<n;t++)Kt.fromBufferAttribute(this,t),Kt.applyMatrix4(e),this.setXYZ(t,Kt.x,Kt.y,Kt.z);return this}applyNormalMatrix(e){for(let t=0,n=this.count;t<n;t++)Kt.fromBufferAttribute(this,t),Kt.applyNormalMatrix(e),this.setXYZ(t,Kt.x,Kt.y,Kt.z);return this}transformDirection(e){for(let t=0,n=this.count;t<n;t++)Kt.fromBufferAttribute(this,t),Kt.transformDirection(e),this.setXYZ(t,Kt.x,Kt.y,Kt.z);return this}getComponent(e,t){let n=this.array[e*this.data.stride+this.offset+t];return this.normalized&&(n=En(n,this.array)),n}setComponent(e,t,n){return this.normalized&&(n=et(n,this.array)),this.data.array[e*this.data.stride+this.offset+t]=n,this}setX(e,t){return this.normalized&&(t=et(t,this.array)),this.data.array[e*this.data.stride+this.offset]=t,this}setY(e,t){return this.normalized&&(t=et(t,this.array)),this.data.array[e*this.data.stride+this.offset+1]=t,this}setZ(e,t){return this.normalized&&(t=et(t,this.array)),this.data.array[e*this.data.stride+this.offset+2]=t,this}setW(e,t){return this.normalized&&(t=et(t,this.array)),this.data.array[e*this.data.stride+this.offset+3]=t,this}getX(e){let t=this.data.array[e*this.data.stride+this.offset];return this.normalized&&(t=En(t,this.array)),t}getY(e){let t=this.data.array[e*this.data.stride+this.offset+1];return this.normalized&&(t=En(t,this.array)),t}getZ(e){let t=this.data.array[e*this.data.stride+this.offset+2];return this.normalized&&(t=En(t,this.array)),t}getW(e){let t=this.data.array[e*this.data.stride+this.offset+3];return this.normalized&&(t=En(t,this.array)),t}setXY(e,t,n){return e=e*this.data.stride+this.offset,this.normalized&&(t=et(t,this.array),n=et(n,this.array)),this.data.array[e+0]=t,this.data.array[e+1]=n,this}setXYZ(e,t,n,s){return e=e*this.data.stride+this.offset,this.normalized&&(t=et(t,this.array),n=et(n,this.array),s=et(s,this.array)),this.data.array[e+0]=t,this.data.array[e+1]=n,this.data.array[e+2]=s,this}setXYZW(e,t,n,s,r){return e=e*this.data.stride+this.offset,this.normalized&&(t=et(t,this.array),n=et(n,this.array),s=et(s,this.array),r=et(r,this.array)),this.data.array[e+0]=t,this.data.array[e+1]=n,this.data.array[e+2]=s,this.data.array[e+3]=r,this}clone(e){if(e===void 0){Ir("InterleavedBufferAttribute.clone(): Cloning an interleaved buffer attribute will de-interleave buffer data.");let t=[];for(let n=0;n<this.count;n++){let s=n*this.data.stride+this.offset;for(let r=0;r<this.itemSize;r++)t.push(this.data.array[s+r])}return new yt(new this.array.constructor(t),this.itemSize,this.normalized)}else return e.interleavedBuffers===void 0&&(e.interleavedBuffers={}),e.interleavedBuffers[this.data.uuid]===void 0&&(e.interleavedBuffers[this.data.uuid]=this.data.clone(e)),new i(e.interleavedBuffers[this.data.uuid],this.itemSize,this.offset,this.normalized)}toJSON(e){if(e===void 0){Ir("InterleavedBufferAttribute.toJSON(): Serializing an interleaved buffer attribute will de-interleave buffer data.");let t=[];for(let n=0;n<this.count;n++){let s=n*this.data.stride+this.offset;for(let r=0;r<this.itemSize;r++)t.push(this.data.array[s+r])}return{itemSize:this.itemSize,type:this.array.constructor.name,array:t,normalized:this.normalized}}else return e.interleavedBuffers===void 0&&(e.interleavedBuffers={}),e.interleavedBuffers[this.data.uuid]===void 0&&(e.interleavedBuffers[this.data.uuid]=this.data.toJSON(e)),{isInterleavedBufferAttribute:!0,itemSize:this.itemSize,data:this.data.uuid,offset:this.offset,normalized:this.normalized}}},tl=new N,zf=new N,Hf=new Le,hn=class{constructor(e=new N(1,0,0),t=0){this.isPlane=!0,this.normal=e,this.constant=t}set(e,t){return this.normal.copy(e),this.constant=t,this}setComponents(e,t,n,s){return this.normal.set(e,t,n),this.constant=s,this}setFromNormalAndCoplanarPoint(e,t){return this.normal.copy(e),this.constant=-t.dot(this.normal),this}setFromCoplanarPoints(e,t,n){let s=tl.subVectors(n,t).cross(zf.subVectors(e,t)).normalize();return this.setFromNormalAndCoplanarPoint(s,e),this}copy(e){return this.normal.copy(e.normal),this.constant=e.constant,this}normalize(){let e=1/this.normal.length();return this.normal.multiplyScalar(e),this.constant*=e,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(e){return this.normal.dot(e)+this.constant}distanceToSphere(e){return this.distanceToPoint(e.center)-e.radius}projectPoint(e,t){return t.copy(e).addScaledVector(this.normal,-this.distanceToPoint(e))}intersectLine(e,t,n=!0){let s=e.delta(tl),r=this.normal.dot(s);if(r===0)return this.distanceToPoint(e.start)===0?t.copy(e.start):null;let o=-(e.start.dot(this.normal)+this.constant)/r;return n===!0&&(o<0||o>1)?null:t.copy(e.start).addScaledVector(s,o)}intersectsLine(e){let t=this.distanceToPoint(e.start),n=this.distanceToPoint(e.end);return t<0&&n>0||n<0&&t>0}intersectsBox(e){return e.intersectsPlane(this)}intersectsSphere(e){return e.intersectsPlane(this)}coplanarPoint(e){return e.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(e,t){let n=t||Hf.getNormalMatrix(e),s=this.coplanarPoint(tl).applyMatrix4(e),r=this.normal.applyMatrix3(n).normalize();return this.constant=-s.dot(r),this}translate(e){return this.constant-=e.dot(this.normal),this}equals(e){return e.normal.equals(this.normal)&&e.constant===this.constant}clone(){return new this.constructor().copy(this)}toJSON(){return{normal:this.normal.toArray(),constant:this.constant}}fromJSON(e){return this.normal.fromArray(e.normal),this.constant=e.constant,this}},Vf=0,_t=class extends xn{constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:Vf++}),this.uuid=Cn(),this.name="",this.type="Material",this.blending=Qs,this.side=vn,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=bl,this.blendDst=Sl,this.blendEquation=as,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new pe(0,0,0),this.blendAlpha=0,this.depthFunc=Os,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=Eu,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=Zo,this.stencilZFail=Zo,this.stencilZPass=Zo,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.allowOverride=!0,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(e){this._alphaTest>0!=e>0&&this.version++,this._alphaTest=e}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(e){if(e!==void 0)for(let t in e){let n=e[t];if(n===void 0){Ae(`Material: parameter '${t}' has value of undefined.`);continue}let s=this[t];if(s===void 0){Ae(`Material: '${t}' is not a property of THREE.${this.type}.`);continue}s&&s.isColor?s.set(n):s&&s.isVector2&&n&&n.isVector2||s&&s.isEuler&&n&&n.isEuler||s&&s.isVector3&&n&&n.isVector3?s.copy(n):this[t]=n}}toJSON(e){let t=e===void 0||typeof e=="string";t&&(e={textures:{},images:{}});let n={metadata:{version:4.7,type:"Material",generator:"Material.toJSON"}};n.uuid=this.uuid,n.type=this.type,n.blending=this.blending,n.side=this.side,n.shadowSide=this.shadowSide,n.vertexColors=this.vertexColors,n.opacity=this.opacity,n.transparent=this.transparent,n.blendSrc=this.blendSrc,n.blendDst=this.blendDst,n.blendEquation=this.blendEquation,n.blendSrcAlpha=this.blendSrcAlpha,n.blendDstAlpha=this.blendDstAlpha,n.blendEquationAlpha=this.blendEquationAlpha,n.blendColor=this.blendColor.getHex(),n.blendAlpha=this.blendAlpha,n.depthFunc=this.depthFunc,n.depthTest=this.depthTest,n.depthWrite=this.depthWrite,n.colorWrite=this.colorWrite,n.clipIntersection=this.clipIntersection,n.clipShadows=this.clipShadows,n.stencilWriteMask=this.stencilWriteMask,n.stencilFunc=this.stencilFunc,n.stencilRef=this.stencilRef,n.stencilFuncMask=this.stencilFuncMask,n.stencilFail=this.stencilFail,n.stencilZFail=this.stencilZFail,n.stencilZPass=this.stencilZPass,n.stencilWrite=this.stencilWrite,n.polygonOffset=this.polygonOffset,n.polygonOffsetFactor=this.polygonOffsetFactor,n.polygonOffsetUnits=this.polygonOffsetUnits,n.dithering=this.dithering,n.alphaTest=this.alphaTest,n.alphaHash=this.alphaHash,n.alphaToCoverage=this.alphaToCoverage,n.premultipliedAlpha=this.premultipliedAlpha,n.forceSinglePass=this.forceSinglePass,n.allowOverride=this.allowOverride,n.visible=this.visible,n.toneMapped=this.toneMapped,n.name=this.name,this.color&&this.color.isColor&&(n.color=this.color.getHex()),this.roughness!==void 0&&(n.roughness=this.roughness),this.metalness!==void 0&&(n.metalness=this.metalness),this.sheen!==void 0&&(n.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(n.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(n.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(n.emissive=this.emissive.getHex()),this.emissiveIntensity!==void 0&&(n.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(n.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(n.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(n.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(n.shininess=this.shininess),this.clearcoat!==void 0&&(n.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(n.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(n.clearcoatMap=this.clearcoatMap.toJSON(e).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(n.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(e).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(n.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(e).uuid,n.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.sheenColorMap&&this.sheenColorMap.isTexture&&(n.sheenColorMap=this.sheenColorMap.toJSON(e).uuid),this.sheenRoughnessMap&&this.sheenRoughnessMap.isTexture&&(n.sheenRoughnessMap=this.sheenRoughnessMap.toJSON(e).uuid),this.dispersion!==void 0&&(n.dispersion=this.dispersion),this.retroreflectivity!==void 0&&(n.retroreflectivity=this.retroreflectivity),this.iridescence!==void 0&&(n.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(n.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(n.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(n.iridescenceMap=this.iridescenceMap.toJSON(e).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(n.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(e).uuid),this.anisotropy!==void 0&&(n.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(n.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(n.anisotropyMap=this.anisotropyMap.toJSON(e).uuid),this.map&&this.map.isTexture&&(n.map=this.map.toJSON(e).uuid),this.matcap&&this.matcap.isTexture&&(n.matcap=this.matcap.toJSON(e).uuid),this.alphaMap&&this.alphaMap.isTexture&&(n.alphaMap=this.alphaMap.toJSON(e).uuid),this.lightMap&&this.lightMap.isTexture&&(n.lightMap=this.lightMap.toJSON(e).uuid,n.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(n.aoMap=this.aoMap.toJSON(e).uuid,n.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(n.bumpMap=this.bumpMap.toJSON(e).uuid,n.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(n.normalMap=this.normalMap.toJSON(e).uuid,n.normalMapType=this.normalMapType,n.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(n.displacementMap=this.displacementMap.toJSON(e).uuid,n.displacementScale=this.displacementScale,n.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(n.roughnessMap=this.roughnessMap.toJSON(e).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(n.metalnessMap=this.metalnessMap.toJSON(e).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(n.emissiveMap=this.emissiveMap.toJSON(e).uuid),this.specularMap&&this.specularMap.isTexture&&(n.specularMap=this.specularMap.toJSON(e).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(n.specularIntensityMap=this.specularIntensityMap.toJSON(e).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(n.specularColorMap=this.specularColorMap.toJSON(e).uuid),this.envMap&&this.envMap.isTexture&&(n.envMap=this.envMap.toJSON(e).uuid,this.combine!==void 0&&(n.combine=this.combine)),this.envMapRotation!==void 0&&(n.envMapRotation=this.envMapRotation.toArray()),this.envMapIntensity!==void 0&&(n.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(n.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(n.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(n.gradientMap=this.gradientMap.toJSON(e).uuid),this.transmission!==void 0&&(n.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(n.transmissionMap=this.transmissionMap.toJSON(e).uuid),this.thickness!==void 0&&(n.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(n.thicknessMap=this.thicknessMap.toJSON(e).uuid),this.attenuationDistance!==void 0&&(n.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(n.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(n.size=this.size),this.sizeAttenuation!==void 0&&(n.sizeAttenuation=this.sizeAttenuation),Array.isArray(this.clippingPlanes)&&this.clippingPlanes.length>0&&(n.clippingPlanes=this.clippingPlanes.map(r=>r.toJSON())),this.rotation!==void 0&&(n.rotation=this.rotation),this.depthPacking!==void 0&&(n.depthPacking=this.depthPacking),this.linewidth!==void 0&&(n.linewidth=this.linewidth),this.linecap!==void 0&&(n.linecap=this.linecap),this.linejoin!==void 0&&(n.linejoin=this.linejoin),this.dashSize!==void 0&&(n.dashSize=this.dashSize),this.gapSize!==void 0&&(n.gapSize=this.gapSize),this.scale!==void 0&&(n.scale=this.scale),this.wireframe!==void 0&&(n.wireframe=this.wireframe),this.wireframeLinewidth!==void 0&&(n.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!==void 0&&(n.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!==void 0&&(n.wireframeLinejoin=this.wireframeLinejoin),this.flatShading!==void 0&&(n.flatShading=this.flatShading),this.fog!==void 0&&(n.fog=this.fog),Object.keys(this.userData).length>0&&(n.userData=this.userData);function s(r){let o=[];for(let a in r){let c=r[a];delete c.metadata,o.push(c)}return o}if(t){let r=s(e.textures),o=s(e.images);r.length>0&&(n.textures=r),o.length>0&&(n.images=o)}return n}fromJSON(e,t){if(e.uuid!==void 0&&(this.uuid=e.uuid),e.name!==void 0&&(this.name=e.name),e.color!==void 0&&this.color!==void 0&&this.color.setHex(e.color),e.roughness!==void 0&&(this.roughness=e.roughness),e.metalness!==void 0&&(this.metalness=e.metalness),e.sheen!==void 0&&(this.sheen=e.sheen),e.sheenColor!==void 0&&(this.sheenColor=new pe().setHex(e.sheenColor)),e.sheenRoughness!==void 0&&(this.sheenRoughness=e.sheenRoughness),e.emissive!==void 0&&this.emissive!==void 0&&this.emissive.setHex(e.emissive),e.specular!==void 0&&this.specular!==void 0&&this.specular.setHex(e.specular),e.specularIntensity!==void 0&&(this.specularIntensity=e.specularIntensity),e.specularColor!==void 0&&this.specularColor!==void 0&&this.specularColor.setHex(e.specularColor),e.shininess!==void 0&&(this.shininess=e.shininess),e.clearcoat!==void 0&&(this.clearcoat=e.clearcoat),e.clearcoatRoughness!==void 0&&(this.clearcoatRoughness=e.clearcoatRoughness),e.dispersion!==void 0&&(this.dispersion=e.dispersion),e.retroreflectivity!==void 0&&(this.retroreflectivity=e.retroreflectivity),e.iridescence!==void 0&&(this.iridescence=e.iridescence),e.iridescenceIOR!==void 0&&(this.iridescenceIOR=e.iridescenceIOR),e.iridescenceThicknessRange!==void 0&&(this.iridescenceThicknessRange=e.iridescenceThicknessRange),e.transmission!==void 0&&(this.transmission=e.transmission),e.thickness!==void 0&&(this.thickness=e.thickness),e.attenuationDistance!==void 0&&(this.attenuationDistance=e.attenuationDistance),e.attenuationColor!==void 0&&this.attenuationColor!==void 0&&this.attenuationColor.setHex(e.attenuationColor),e.anisotropy!==void 0&&(this.anisotropy=e.anisotropy),e.anisotropyRotation!==void 0&&(this.anisotropyRotation=e.anisotropyRotation),e.fog!==void 0&&(this.fog=e.fog),e.flatShading!==void 0&&(this.flatShading=e.flatShading),e.blending!==void 0&&(this.blending=e.blending),e.combine!==void 0&&(this.combine=e.combine),e.side!==void 0&&(this.side=e.side),e.shadowSide!==void 0&&(this.shadowSide=e.shadowSide),e.opacity!==void 0&&(this.opacity=e.opacity),e.transparent!==void 0&&(this.transparent=e.transparent),e.alphaTest!==void 0&&(this.alphaTest=e.alphaTest),e.alphaHash!==void 0&&(this.alphaHash=e.alphaHash),e.depthFunc!==void 0&&(this.depthFunc=e.depthFunc),e.depthTest!==void 0&&(this.depthTest=e.depthTest),e.depthWrite!==void 0&&(this.depthWrite=e.depthWrite),e.colorWrite!==void 0&&(this.colorWrite=e.colorWrite),e.clippingPlanes!==void 0&&(this.clippingPlanes=e.clippingPlanes.map(n=>new hn().fromJSON(n))),e.clipIntersection!==void 0&&(this.clipIntersection=e.clipIntersection),e.clipShadows!==void 0&&(this.clipShadows=e.clipShadows),e.depthPacking!==void 0&&(this.depthPacking=e.depthPacking),e.blendSrc!==void 0&&(this.blendSrc=e.blendSrc),e.blendDst!==void 0&&(this.blendDst=e.blendDst),e.blendEquation!==void 0&&(this.blendEquation=e.blendEquation),e.blendSrcAlpha!==void 0&&(this.blendSrcAlpha=e.blendSrcAlpha),e.blendDstAlpha!==void 0&&(this.blendDstAlpha=e.blendDstAlpha),e.blendEquationAlpha!==void 0&&(this.blendEquationAlpha=e.blendEquationAlpha),e.blendColor!==void 0&&this.blendColor!==void 0&&this.blendColor.setHex(e.blendColor),e.blendAlpha!==void 0&&(this.blendAlpha=e.blendAlpha),e.stencilWriteMask!==void 0&&(this.stencilWriteMask=e.stencilWriteMask),e.stencilFunc!==void 0&&(this.stencilFunc=e.stencilFunc),e.stencilRef!==void 0&&(this.stencilRef=e.stencilRef),e.stencilFuncMask!==void 0&&(this.stencilFuncMask=e.stencilFuncMask),e.stencilFail!==void 0&&(this.stencilFail=e.stencilFail),e.stencilZFail!==void 0&&(this.stencilZFail=e.stencilZFail),e.stencilZPass!==void 0&&(this.stencilZPass=e.stencilZPass),e.stencilWrite!==void 0&&(this.stencilWrite=e.stencilWrite),e.wireframe!==void 0&&(this.wireframe=e.wireframe),e.wireframeLinewidth!==void 0&&(this.wireframeLinewidth=e.wireframeLinewidth),e.wireframeLinecap!==void 0&&(this.wireframeLinecap=e.wireframeLinecap),e.wireframeLinejoin!==void 0&&(this.wireframeLinejoin=e.wireframeLinejoin),e.rotation!==void 0&&(this.rotation=e.rotation),e.linewidth!==void 0&&(this.linewidth=e.linewidth),e.linecap!==void 0&&(this.linecap=e.linecap),e.linejoin!==void 0&&(this.linejoin=e.linejoin),e.dashSize!==void 0&&(this.dashSize=e.dashSize),e.gapSize!==void 0&&(this.gapSize=e.gapSize),e.scale!==void 0&&(this.scale=e.scale),e.polygonOffset!==void 0&&(this.polygonOffset=e.polygonOffset),e.polygonOffsetFactor!==void 0&&(this.polygonOffsetFactor=e.polygonOffsetFactor),e.polygonOffsetUnits!==void 0&&(this.polygonOffsetUnits=e.polygonOffsetUnits),e.dithering!==void 0&&(this.dithering=e.dithering),e.alphaToCoverage!==void 0&&(this.alphaToCoverage=e.alphaToCoverage),e.premultipliedAlpha!==void 0&&(this.premultipliedAlpha=e.premultipliedAlpha),e.forceSinglePass!==void 0&&(this.forceSinglePass=e.forceSinglePass),e.allowOverride!==void 0&&(this.allowOverride=e.allowOverride),e.visible!==void 0&&(this.visible=e.visible),e.toneMapped!==void 0&&(this.toneMapped=e.toneMapped),e.userData!==void 0&&(this.userData=e.userData),e.vertexColors!==void 0&&(typeof e.vertexColors=="number"?this.vertexColors=e.vertexColors>0:this.vertexColors=e.vertexColors),e.size!==void 0&&(this.size=e.size),e.sizeAttenuation!==void 0&&(this.sizeAttenuation=e.sizeAttenuation),e.map!==void 0&&(this.map=t[e.map]||null),e.matcap!==void 0&&(this.matcap=t[e.matcap]||null),e.alphaMap!==void 0&&(this.alphaMap=t[e.alphaMap]||null),e.bumpMap!==void 0&&(this.bumpMap=t[e.bumpMap]||null),e.bumpScale!==void 0&&(this.bumpScale=e.bumpScale),e.normalMap!==void 0&&(this.normalMap=t[e.normalMap]||null),e.normalMapType!==void 0&&(this.normalMapType=e.normalMapType),e.normalScale!==void 0){let n=e.normalScale;Array.isArray(n)===!1&&(n=[n,n]),this.normalScale=new we().fromArray(n)}return e.displacementMap!==void 0&&(this.displacementMap=t[e.displacementMap]||null),e.displacementScale!==void 0&&(this.displacementScale=e.displacementScale),e.displacementBias!==void 0&&(this.displacementBias=e.displacementBias),e.roughnessMap!==void 0&&(this.roughnessMap=t[e.roughnessMap]||null),e.metalnessMap!==void 0&&(this.metalnessMap=t[e.metalnessMap]||null),e.emissiveMap!==void 0&&(this.emissiveMap=t[e.emissiveMap]||null),e.emissiveIntensity!==void 0&&(this.emissiveIntensity=e.emissiveIntensity),e.specularMap!==void 0&&(this.specularMap=t[e.specularMap]||null),e.specularIntensityMap!==void 0&&(this.specularIntensityMap=t[e.specularIntensityMap]||null),e.specularColorMap!==void 0&&(this.specularColorMap=t[e.specularColorMap]||null),e.envMap!==void 0&&(this.envMap=t[e.envMap]||null),e.envMapRotation!==void 0&&this.envMapRotation.fromArray(e.envMapRotation),e.envMapIntensity!==void 0&&(this.envMapIntensity=e.envMapIntensity),e.reflectivity!==void 0&&(this.reflectivity=e.reflectivity),e.refractionRatio!==void 0&&(this.refractionRatio=e.refractionRatio),e.lightMap!==void 0&&(this.lightMap=t[e.lightMap]||null),e.lightMapIntensity!==void 0&&(this.lightMapIntensity=e.lightMapIntensity),e.aoMap!==void 0&&(this.aoMap=t[e.aoMap]||null),e.aoMapIntensity!==void 0&&(this.aoMapIntensity=e.aoMapIntensity),e.gradientMap!==void 0&&(this.gradientMap=t[e.gradientMap]||null),e.clearcoatMap!==void 0&&(this.clearcoatMap=t[e.clearcoatMap]||null),e.clearcoatRoughnessMap!==void 0&&(this.clearcoatRoughnessMap=t[e.clearcoatRoughnessMap]||null),e.clearcoatNormalMap!==void 0&&(this.clearcoatNormalMap=t[e.clearcoatNormalMap]||null),e.clearcoatNormalScale!==void 0&&(this.clearcoatNormalScale=new we().fromArray(e.clearcoatNormalScale)),e.iridescenceMap!==void 0&&(this.iridescenceMap=t[e.iridescenceMap]||null),e.iridescenceThicknessMap!==void 0&&(this.iridescenceThicknessMap=t[e.iridescenceThicknessMap]||null),e.transmissionMap!==void 0&&(this.transmissionMap=t[e.transmissionMap]||null),e.thicknessMap!==void 0&&(this.thicknessMap=t[e.thicknessMap]||null),e.anisotropyMap!==void 0&&(this.anisotropyMap=t[e.anisotropyMap]||null),e.sheenColorMap!==void 0&&(this.sheenColorMap=t[e.sheenColorMap]||null),e.sheenRoughnessMap!==void 0&&(this.sheenRoughnessMap=t[e.sheenRoughnessMap]||null),this}clone(){return new this.constructor().copy(this)}copy(e){this.name=e.name,this.blending=e.blending,this.side=e.side,this.vertexColors=e.vertexColors,this.opacity=e.opacity,this.transparent=e.transparent,this.blendSrc=e.blendSrc,this.blendDst=e.blendDst,this.blendEquation=e.blendEquation,this.blendSrcAlpha=e.blendSrcAlpha,this.blendDstAlpha=e.blendDstAlpha,this.blendEquationAlpha=e.blendEquationAlpha,this.blendColor.copy(e.blendColor),this.blendAlpha=e.blendAlpha,this.depthFunc=e.depthFunc,this.depthTest=e.depthTest,this.depthWrite=e.depthWrite,this.stencilWriteMask=e.stencilWriteMask,this.stencilFunc=e.stencilFunc,this.stencilRef=e.stencilRef,this.stencilFuncMask=e.stencilFuncMask,this.stencilFail=e.stencilFail,this.stencilZFail=e.stencilZFail,this.stencilZPass=e.stencilZPass,this.stencilWrite=e.stencilWrite;let t=e.clippingPlanes,n=null;if(t!==null){let s=t.length;n=new Array(s);for(let r=0;r!==s;++r)n[r]=t[r].clone()}return this.clippingPlanes=n,this.clipIntersection=e.clipIntersection,this.clipShadows=e.clipShadows,this.shadowSide=e.shadowSide,this.colorWrite=e.colorWrite,this.precision=e.precision,this.polygonOffset=e.polygonOffset,this.polygonOffsetFactor=e.polygonOffsetFactor,this.polygonOffsetUnits=e.polygonOffsetUnits,this.dithering=e.dithering,this.alphaTest=e.alphaTest,this.alphaHash=e.alphaHash,this.alphaToCoverage=e.alphaToCoverage,this.premultipliedAlpha=e.premultipliedAlpha,this.forceSinglePass=e.forceSinglePass,this.allowOverride=e.allowOverride,this.visible=e.visible,this.toneMapped=e.toneMapped,this.userData=JSON.parse(JSON.stringify(e.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(e){e===!0&&this.version++}},oa=class extends _t{constructor(e){super(),this.isSpriteMaterial=!0,this.type="SpriteMaterial",this.color=new pe(16777215),this.map=null,this.alphaMap=null,this.rotation=0,this.sizeAttenuation=!0,this.transparent=!0,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.alphaMap=e.alphaMap,this.rotation=e.rotation,this.sizeAttenuation=e.sizeAttenuation,this.fog=e.fog,this}};var jn=new N,nl=new N,Co=new N,Io=new N,ti=class{constructor(e=new N,t=new N(0,0,-1)){this.origin=e,this.direction=t}set(e,t){return this.origin.copy(e),this.direction.copy(t),this}copy(e){return this.origin.copy(e.origin),this.direction.copy(e.direction),this}at(e,t){return t.copy(this.origin).addScaledVector(this.direction,e)}lookAt(e){return this.direction.copy(e).sub(this.origin).normalize(),this}recast(e){return this.origin.copy(this.at(e,jn)),this}closestPointToPoint(e,t){t.subVectors(e,this.origin);let n=t.dot(this.direction);return n<0?t.copy(this.origin):t.copy(this.origin).addScaledVector(this.direction,n)}distanceToPoint(e){return Math.sqrt(this.distanceSqToPoint(e))}distanceSqToPoint(e){let t=jn.subVectors(e,this.origin).dot(this.direction);return t<0?this.origin.distanceToSquared(e):(jn.copy(this.origin).addScaledVector(this.direction,t),jn.distanceToSquared(e))}distanceSqToSegment(e,t,n,s){nl.copy(e).add(t).multiplyScalar(.5),Co.copy(t).sub(e).normalize(),Io.copy(this.origin).sub(nl);let r=e.distanceTo(t)*.5,o=-this.direction.dot(Co),a=Io.dot(this.direction),c=-Io.dot(Co),l=Io.lengthSq(),h=Math.abs(1-o*o),d,u,p,g;if(h>0)if(d=o*c-a,u=o*a-c,g=r*h,d>=0)if(u>=-g)if(u<=g){let b=1/h;d*=b,u*=b,p=d*(d+o*u+2*a)+u*(o*d+u+2*c)+l}else u=r,d=Math.max(0,-(o*u+a)),p=-d*d+u*(u+2*c)+l;else u=-r,d=Math.max(0,-(o*u+a)),p=-d*d+u*(u+2*c)+l;else u<=-g?(d=Math.max(0,-(-o*r+a)),u=d>0?-r:Math.min(Math.max(-r,-c),r),p=-d*d+u*(u+2*c)+l):u<=g?(d=0,u=Math.min(Math.max(-r,-c),r),p=u*(u+2*c)+l):(d=Math.max(0,-(o*r+a)),u=d>0?r:Math.min(Math.max(-r,-c),r),p=-d*d+u*(u+2*c)+l);else u=o>0?-r:r,d=Math.max(0,-(o*u+a)),p=-d*d+u*(u+2*c)+l;return n&&n.copy(this.origin).addScaledVector(this.direction,d),s&&s.copy(nl).addScaledVector(Co,u),p}intersectSphere(e,t){if(e.radius<0)return null;jn.subVectors(e.center,this.origin);let n=jn.dot(this.direction),s=jn.dot(jn)-n*n,r=e.radius*e.radius;if(s>r)return null;let o=Math.sqrt(r-s),a=n-o,c=n+o;return c<0?null:a<0?this.at(c,t):this.at(a,t)}intersectsSphere(e){return e.radius<0?!1:this.distanceSqToPoint(e.center)<=e.radius*e.radius}distanceToPlane(e){let t=e.normal.dot(this.direction);if(t===0)return e.distanceToPoint(this.origin)===0?0:null;let n=-(this.origin.dot(e.normal)+e.constant)/t;return n>=0?n:null}intersectPlane(e,t){let n=this.distanceToPlane(e);return n===null?null:this.at(n,t)}intersectsPlane(e){let t=e.distanceToPoint(this.origin);return t===0||e.normal.dot(this.direction)*t<0}intersectBox(e,t){let n,s,r,o,a,c,l=1/this.direction.x,h=1/this.direction.y,d=1/this.direction.z,u=this.origin;return l>=0?(n=(e.min.x-u.x)*l,s=(e.max.x-u.x)*l):(n=(e.max.x-u.x)*l,s=(e.min.x-u.x)*l),h>=0?(r=(e.min.y-u.y)*h,o=(e.max.y-u.y)*h):(r=(e.max.y-u.y)*h,o=(e.min.y-u.y)*h),n>o||r>s||((r>n||isNaN(n))&&(n=r),(o<s||isNaN(s))&&(s=o),d>=0?(a=(e.min.z-u.z)*d,c=(e.max.z-u.z)*d):(a=(e.max.z-u.z)*d,c=(e.min.z-u.z)*d),n>c||a>s)||((a>n||n!==n)&&(n=a),(c<s||s!==s)&&(s=c),s<0)?null:this.at(n>=0?n:s,t)}intersectsBox(e){return this.intersectBox(e,jn)!==null}intersectTriangle(e,t,n,s,r){let o=this.origin,a=this.direction,c=a.x,l=a.y,h=a.z,d=e.x-o.x,u=e.y-o.y,p=e.z-o.z,g=t.x-o.x,b=t.y-o.y,m=t.z-o.z,f=n.x-o.x,v=n.y-o.y,T=n.z-o.z,y=Math.abs(c),S=Math.abs(l),w=Math.abs(h),R,x,A,C,L,O,W,I,B,V,X,j;if(y>=S&&y>=w?(A=c,O=d,B=g,j=f,c>=0?(R=l,x=h,C=u,L=p,W=b,I=m,V=v,X=T):(R=h,x=l,C=p,L=u,W=m,I=b,V=T,X=v)):S>=w?(A=l,O=u,B=b,j=v,l>=0?(R=h,x=c,C=p,L=d,W=m,I=g,V=T,X=f):(R=c,x=h,C=d,L=p,W=g,I=m,V=f,X=T)):(A=h,O=p,B=m,j=T,h>=0?(R=c,x=l,C=d,L=u,W=g,I=b,V=f,X=v):(R=l,x=c,C=u,L=d,W=b,I=g,V=v,X=f)),A===0)return null;let H=R/A,Y=x/A,ee=1/A,Te=C-H*O,Me=L-Y*O,ot=W-H*B,Xe=I-Y*B,Ze=V-H*j,K=X-Y*j,te=Ze*Xe-K*ot,xe=Te*K-Me*Ze,De=ot*Me-Xe*Te;if(s){if(te<0||xe<0||De<0)return null}else if((te<0||xe<0||De<0)&&(te>0||xe>0||De>0))return null;let ge=te+xe+De;if(ge===0)return null;let ze=ee*(te*O+xe*B+De*j);return(ge>0?ze<0:ze>0)?null:this.at(ze/ge,r)}applyMatrix4(e){return this.origin.applyMatrix4(e),this.direction.transformDirection(e),this}equals(e){return e.origin.equals(this.origin)&&e.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}},yn=class extends _t{constructor(e){super(),this.isMeshBasicMaterial=!0,this.type="MeshBasicMaterial",this.color=new pe(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new In,this.combine=Qr,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.combine=e.combine,this.reflectivity=e.reflectivity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.fog=e.fog,this}},Ah=new Ue,Xi=new ti,Po=new nn,Eh=new N,Lo=new N,Do=new N,No=new N,il=new N,Uo=new N,Rh=new N,Oo=new N,Ke=class extends ht{constructor(e=new bt,t=new yn){super(),this.isMesh=!0,this.type="Mesh",this.geometry=e,this.material=t,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.count=1,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),e.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=e.morphTargetInfluences.slice()),e.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},e.morphTargetDictionary)),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}updateMorphTargets(){let t=this.geometry.morphAttributes,n=Object.keys(t);if(n.length>0){let s=t[n[0]];if(s!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,o=s.length;r<o;r++){let a=s[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=r}}}}getVertexPosition(e,t){let n=this.geometry,s=n.attributes.position,r=n.morphAttributes.position,o=n.morphTargetsRelative;t.fromBufferAttribute(s,e);let a=this.morphTargetInfluences;if(r&&a){Uo.set(0,0,0);for(let c=0,l=r.length;c<l;c++){let h=a[c],d=r[c];h!==0&&(il.fromBufferAttribute(d,e),o?Uo.addScaledVector(il,h):Uo.addScaledVector(il.sub(t),h))}t.add(Uo)}return t}intersectsFrustum(e){return e.intersectsObject(this)}raycast(e,t){let n=this.geometry,s=this.material,r=this.matrixWorld;s!==void 0&&(n.boundingSphere===null&&n.computeBoundingSphere(),Po.copy(n.boundingSphere),Po.applyMatrix4(r),Xi.copy(e.ray).recast(e.near),!(Po.containsPoint(Xi.origin)===!1&&(Xi.intersectSphere(Po,Eh)===null||Xi.origin.distanceToSquared(Eh)>(e.far-e.near)**2))&&(Ah.copy(r).invert(),Xi.copy(e.ray).applyMatrix4(Ah),!(n.boundingBox!==null&&Xi.intersectsBox(n.boundingBox)===!1)&&this._computeIntersections(e,t,Xi)))}_computeIntersections(e,t,n){let s,r=this.geometry,o=this.material,a=r.index,c=r.attributes.position,l=r.attributes.uv,h=r.attributes.uv1,d=r.attributes.normal,u=r.groups,p=r.drawRange;if(a!==null)if(Array.isArray(o))for(let g=0,b=u.length;g<b;g++){let m=u[g],f=o[m.materialIndex],v=Math.max(m.start,p.start),T=Math.min(a.count,Math.min(m.start+m.count,p.start+p.count));for(let y=v,S=T;y<S;y+=3){let w=a.getX(y),R=a.getX(y+1),x=a.getX(y+2);s=Fo(this,f,e,n,l,h,d,w,R,x),s&&(s.faceIndex=Math.floor(y/3),s.face.materialIndex=m.materialIndex,t.push(s))}}else{let g=Math.max(0,p.start),b=Math.min(a.count,p.start+p.count);for(let m=g,f=b;m<f;m+=3){let v=a.getX(m),T=a.getX(m+1),y=a.getX(m+2);s=Fo(this,o,e,n,l,h,d,v,T,y),s&&(s.faceIndex=Math.floor(m/3),t.push(s))}}else if(c!==void 0)if(Array.isArray(o))for(let g=0,b=u.length;g<b;g++){let m=u[g],f=o[m.materialIndex],v=Math.max(m.start,p.start),T=Math.min(c.count,Math.min(m.start+m.count,p.start+p.count));for(let y=v,S=T;y<S;y+=3){let w=y,R=y+1,x=y+2;s=Fo(this,f,e,n,l,h,d,w,R,x),s&&(s.faceIndex=Math.floor(y/3),s.face.materialIndex=m.materialIndex,t.push(s))}}else{let g=Math.max(0,p.start),b=Math.min(c.count,p.start+p.count);for(let m=g,f=b;m<f;m+=3){let v=m,T=m+1,y=m+2;s=Fo(this,o,e,n,l,h,d,v,T,y),s&&(s.faceIndex=Math.floor(m/3),t.push(s))}}}};function Gf(i,e,t,n,s,r,o,a){let c;if(e.side===zt?c=n.intersectTriangle(o,r,s,!0,a):c=n.intersectTriangle(s,r,o,e.side===vn,a),c===null)return null;Oo.copy(a),Oo.applyMatrix4(i.matrixWorld);let l=t.ray.origin.distanceTo(Oo);return l<t.near||l>t.far?null:{distance:l,point:Oo.clone(),object:i}}function Fo(i,e,t,n,s,r,o,a,c,l){i.getVertexPosition(a,Lo),i.getVertexPosition(c,Do),i.getVertexPosition(l,No);let h=Gf(i,e,t,n,Lo,Do,No,Rh);if(h){let d=new N;wi.getBarycoord(Rh,Lo,Do,No,d),s&&(h.uv=wi.getInterpolatedAttribute(s,a,c,l,d,new we)),r&&(h.uv1=wi.getInterpolatedAttribute(r,a,c,l,d,new we)),o&&(h.normal=wi.getInterpolatedAttribute(o,a,c,l,d,new N),h.normal.dot(n.direction)>0&&h.normal.multiplyScalar(-1));let u={a,b:c,c:l,normal:new N,materialIndex:0};wi.getNormal(Lo,Do,No,u.normal),h.face=u,h.barycoord=d}return h}var br=new tt,Ch=new tt,Ih=new tt,Wf=new tt,Ph=new Ue,Bo=new N,sl=new nn,Lh=new Ue,rl=new ti,Ur=class extends Ke{constructor(e,t){super(e,t),this.isSkinnedMesh=!0,this.type="SkinnedMesh",this.bindMode=ll,this.bindMatrix=new Ue,this.bindMatrixInverse=new Ue,this.boundingBox=null,this.boundingSphere=null}computeBoundingBox(){let e=this.geometry;this.boundingBox===null&&(this.boundingBox=new jt),this.boundingBox.makeEmpty();let t=e.getAttribute("position");for(let n=0;n<t.count;n++)this.getVertexPosition(n,Bo),this.boundingBox.expandByPoint(Bo)}computeBoundingSphere(){let e=this.geometry;this.boundingSphere===null&&(this.boundingSphere=new nn),this.boundingSphere.makeEmpty();let t=e.getAttribute("position");for(let n=0;n<t.count;n++)this.getVertexPosition(n,Bo),this.boundingSphere.expandByPoint(Bo)}copy(e,t){return super.copy(e,t),this.bindMode=e.bindMode,this.bindMatrix.copy(e.bindMatrix),this.bindMatrixInverse.copy(e.bindMatrixInverse),this.skeleton=e.skeleton,e.boundingBox!==null&&(this.boundingBox=e.boundingBox.clone()),e.boundingSphere!==null&&(this.boundingSphere=e.boundingSphere.clone()),this}raycast(e,t){let n=this.material,s=this.matrixWorld;n!==void 0&&(this.boundingSphere===null&&this.computeBoundingSphere(),sl.copy(this.boundingSphere),sl.applyMatrix4(s),e.ray.intersectsSphere(sl)!==!1&&(Lh.copy(s).invert(),rl.copy(e.ray).applyMatrix4(Lh),!(this.boundingBox!==null&&rl.intersectsBox(this.boundingBox)===!1)&&this._computeIntersections(e,t,rl)))}getVertexPosition(e,t){return super.getVertexPosition(e,t),this.applyBoneTransform(e,t),t}bind(e,t){this.skeleton=e,t===void 0&&(this.updateMatrixWorld(!0),this.skeleton.calculateInverses(),t=this.matrixWorld),this.bindMatrix.copy(t),this.bindMatrixInverse.copy(t).invert()}pose(){this.skeleton.pose()}normalizeSkinWeights(){let e=new tt,t=this.geometry.attributes.skinWeight;for(let n=0,s=t.count;n<s;n++){e.fromBufferAttribute(t,n);let r=1/e.manhattanLength();r!==1/0?e.multiplyScalar(r):e.set(1,0,0,0),t.setXYZW(n,e.x,e.y,e.z,e.w)}}updateMatrixWorld(e){super.updateMatrixWorld(e),this.bindMode===ll?this.bindMatrixInverse.copy(this.matrixWorld).invert():this.bindMode===vu?this.bindMatrixInverse.copy(this.bindMatrix).invert():Ae("SkinnedMesh: Unrecognized bindMode: "+this.bindMode)}applyBoneTransform(e,t){let n=this.skeleton,s=this.geometry;Ch.fromBufferAttribute(s.attributes.skinIndex,e),Ih.fromBufferAttribute(s.attributes.skinWeight,e),t.isVector4?(br.copy(t),t.set(0,0,0,0)):(br.set(...t,1),t.set(0,0,0)),br.applyMatrix4(this.bindMatrix);for(let r=0;r<4;r++){let o=Ih.getComponent(r);if(o!==0){let a=Ch.getComponent(r);Ph.multiplyMatrices(n.bones[a].matrixWorld,n.boneInverses[a]),t.addScaledVector(Wf.copy(br).applyMatrix4(Ph),o)}}return t.isVector4&&(t.w=br.w),t.applyMatrix4(this.bindMatrixInverse)}},Xs=class extends ht{constructor(){super(),this.isBone=!0,this.type="Bone"}},Ei=class extends Ft{constructor(e=null,t=1,n=1,s,r,o,a,c,l=Mt,h=Mt,d,u){super(null,o,a,c,l,h,s,r,d,u),this.isDataTexture=!0,this.image={data:e,width:t,height:n},this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}},Dh=new Ue,Xf=new Ue,Or=class i{constructor(e=[],t=[]){this.uuid=Cn(),this.bones=e.slice(0),this.boneInverses=t,this.boneMatrices=null,this.boneTexture=null,this.init()}init(){let e=this.bones,t=this.boneInverses;if(this.boneMatrices=new Float32Array(e.length*16),t.length===0)this.calculateInverses();else if(e.length!==t.length){Ae("Skeleton: Number of inverse bone matrices does not match amount of bones."),this.boneInverses=[];for(let n=0,s=this.bones.length;n<s;n++)this.boneInverses.push(new Ue)}}calculateInverses(){this.boneInverses.length=0;for(let e=0,t=this.bones.length;e<t;e++){let n=new Ue;this.bones[e]&&n.copy(this.bones[e].matrixWorld).invert(),this.boneInverses.push(n)}}pose(){for(let e=0,t=this.bones.length;e<t;e++){let n=this.bones[e];n&&n.matrixWorld.copy(this.boneInverses[e]).invert()}for(let e=0,t=this.bones.length;e<t;e++){let n=this.bones[e];n&&(n.parent&&n.parent.isBone?(n.matrix.copy(n.parent.matrixWorld).invert(),n.matrix.multiply(n.matrixWorld)):n.matrix.copy(n.matrixWorld),n.matrix.decompose(n.position,n.quaternion,n.scale))}}update(){let e=this.bones,t=this.boneInverses,n=this.boneMatrices,s=this.boneTexture;for(let r=0,o=e.length;r<o;r++){let a=e[r]?e[r].matrixWorld:Xf;Dh.multiplyMatrices(a,t[r]),Dh.toArray(n,r*16)}s!==null&&(s.needsUpdate=!0)}clone(){return new i(this.bones,this.boneInverses)}computeBoneTexture(){let e=Math.sqrt(this.bones.length*4);e=Math.ceil(e/4)*4,e=Math.max(e,4);let t=new Float32Array(e*e*4);t.set(this.boneMatrices);let n=new Ei(t,e,e,fn,dn);return n.needsUpdate=!0,this.boneMatrices=t,this.boneTexture=n,this}getBoneByName(e){for(let t=0,n=this.bones.length;t<n;t++){let s=this.bones[t];if(s.name===e)return s}}dispose(){this.boneTexture!==null&&(this.boneTexture.dispose(),this.boneTexture=null)}fromJSON(e,t){this.uuid=e.uuid;for(let n=0,s=e.bones.length;n<s;n++){let r=e.bones[n],o=t[r];o===void 0&&(Ae("Skeleton: No bone found with UUID:",r),o=new Xs),this.bones.push(o),this.boneInverses.push(new Ue().fromArray(e.boneInverses[n]))}return this.init(),this}toJSON(){let e={metadata:{version:4.7,type:"Skeleton",generator:"Skeleton.toJSON"},bones:[],boneInverses:[]};e.uuid=this.uuid;let t=this.bones,n=this.boneInverses;for(let s=0,r=t.length;s<r;s++){let o=t[s];e.bones.push(o.uuid);let a=n[s];e.boneInverses.push(a.toArray())}return e}},ni=class extends yt{constructor(e,t,n,s=1){super(e,t,n),this.isInstancedBufferAttribute=!0,this.meshPerAttribute=s}copy(e){return super.copy(e),this.meshPerAttribute=e.meshPerAttribute,this}toJSON(){let e=super.toJSON();return e.meshPerAttribute=this.meshPerAttribute,e.isInstancedBufferAttribute=!0,e}},Ps=new Ue,Nh=new Ue,ko=[],Uh=new jt,qf=new Ue,Sr=new Ke,wr=new nn,Ji=class extends Ke{constructor(e,t,n){super(e,t),this.isInstancedMesh=!0,this.instanceMatrix=new ni(new Float32Array(n*16),16),this.instanceColor=null,this.morphTexture=null,this.count=n,this.boundingBox=null,this.boundingSphere=null;for(let s=0;s<n;s++)this.setMatrixAt(s,qf)}computeBoundingBox(){let e=this.geometry,t=this.count;this.boundingBox===null&&(this.boundingBox=new jt),e.boundingBox===null&&e.computeBoundingBox(),this.boundingBox.makeEmpty();for(let n=0;n<t;n++)this.getMatrixAt(n,Ps),Uh.copy(e.boundingBox).applyMatrix4(Ps),this.boundingBox.union(Uh)}computeBoundingSphere(){let e=this.geometry,t=this.count;this.boundingSphere===null&&(this.boundingSphere=new nn),e.boundingSphere===null&&e.computeBoundingSphere(),this.boundingSphere.makeEmpty();for(let n=0;n<t;n++)this.getMatrixAt(n,Ps),wr.copy(e.boundingSphere).applyMatrix4(Ps),this.boundingSphere.union(wr)}copy(e,t){return super.copy(e,t),this.instanceMatrix.copy(e.instanceMatrix),e.morphTexture!==null&&(this.morphTexture=e.morphTexture.clone()),e.instanceColor!==null&&(this.instanceColor=e.instanceColor.clone()),this.count=e.count,e.boundingBox!==null&&(this.boundingBox=e.boundingBox.clone()),e.boundingSphere!==null&&(this.boundingSphere=e.boundingSphere.clone()),this}getColorAt(e,t){return this.instanceColor===null?t.setRGB(1,1,1):t.fromArray(this.instanceColor.array,e*3)}getMatrixAt(e,t){return t.fromArray(this.instanceMatrix.array,e*16)}getMorphAt(e,t){let n=t.morphTargetInfluences,s=this.morphTexture.source.data.data,r=n.length+1,o=e*r+1;for(let a=0;a<n.length;a++)n[a]=s[o+a]}raycast(e,t){let n=this.matrixWorld,s=this.count;if(Sr.geometry=this.geometry,Sr.material=this.material,Sr.material!==void 0&&(this.boundingSphere===null&&this.computeBoundingSphere(),wr.copy(this.boundingSphere),wr.applyMatrix4(n),e.ray.intersectsSphere(wr)!==!1))for(let r=0;r<s;r++){this.getMatrixAt(r,Ps),Nh.multiplyMatrices(n,Ps),Sr.matrixWorld=Nh,Sr.raycast(e,ko);for(let o=0,a=ko.length;o<a;o++){let c=ko[o];c.instanceId=r,c.object=this,t.push(c)}ko.length=0}}setColorAt(e,t){return this.instanceColor===null&&(this.instanceColor=new ni(new Float32Array(this.instanceMatrix.count*3).fill(1),3)),t.toArray(this.instanceColor.array,e*3),this}setMatrixAt(e,t){return t.toArray(this.instanceMatrix.array,e*16),this}setMorphAt(e,t){let n=t.morphTargetInfluences,s=n.length+1;this.morphTexture===null&&(this.morphTexture=new Ei(new Float32Array(s*this.count),s,this.count,ir,dn));let r=this.morphTexture.source.data.data,o=0;for(let l=0;l<n.length;l++)o+=n[l];let a=this.geometry.morphTargetsRelative?1:1-o,c=s*e;return r[c]=a,r.set(n,c+1),this}updateMorphTargets(){}dispose(){super.dispose(),this.morphTexture!==null&&(this.morphTexture.dispose(),this.morphTexture=null)}},qi=new nn,Yf=new we(.5,.5),zo=new N,qs=class{constructor(e=new hn,t=new hn,n=new hn,s=new hn,r=new hn,o=new hn){this.planes=[e,t,n,s,r,o]}set(e,t,n,s,r,o){let a=this.planes;return a[0].copy(e),a[1].copy(t),a[2].copy(n),a[3].copy(s),a[4].copy(r),a[5].copy(o),this}copy(e){let t=this.planes;for(let n=0;n<6;n++)t[n].copy(e.planes[n]);return this}setFromProjectionMatrix(e,t=Rn,n=!1){let s=this.planes,r=e.elements,o=r[0],a=r[1],c=r[2],l=r[3],h=r[4],d=r[5],u=r[6],p=r[7],g=r[8],b=r[9],m=r[10],f=r[11],v=r[12],T=r[13],y=r[14],S=r[15];if(s[0].setComponents(l-o,p-h,f-g,S-v).normalize(),s[1].setComponents(l+o,p+h,f+g,S+v).normalize(),s[2].setComponents(l+a,p+d,f+b,S+T).normalize(),s[3].setComponents(l-a,p-d,f-b,S-T).normalize(),n)s[4].setComponents(c,u,m,y).normalize(),s[5].setComponents(l-c,p-u,f-m,S-y).normalize();else if(s[4].setComponents(l-c,p-u,f-m,S-y).normalize(),t===Rn)s[5].setComponents(l+c,p+u,f+m,S+y).normalize();else if(t===Bs)s[5].setComponents(c,u,m,y).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+t);return this}intersectsObject(e){if(e.boundingSphere!==void 0)e.boundingSphere===null&&e.computeBoundingSphere(),qi.copy(e.boundingSphere).applyMatrix4(e.matrixWorld);else{let t=e.geometry;t.boundingSphere===null&&t.computeBoundingSphere(),qi.copy(t.boundingSphere).applyMatrix4(e.matrixWorld)}return this.intersectsSphere(qi)}intersectsSprite(e){qi.center.set(0,0,0);let t=Yf.distanceTo(e.center);return qi.radius=.7071067811865476+t,qi.applyMatrix4(e.matrixWorld),this.intersectsSphere(qi)}intersectsSphere(e){let t=this.planes,n=e.center,s=-e.radius;for(let r=0;r<6;r++)if(t[r].distanceToPoint(n)<s)return!1;return!0}intersectsBox(e){let t=this.planes;for(let n=0;n<6;n++){let s=t[n];if(zo.x=s.normal.x>0?e.max.x:e.min.x,zo.y=s.normal.y>0?e.max.y:e.min.y,zo.z=s.normal.z>0?e.max.z:e.min.z,s.distanceToPoint(zo)<0)return!1}return!0}containsPoint(e){let t=this.planes;for(let n=0;n<6;n++)if(t[n].distanceToPoint(e)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}};var Ri=class extends _t{constructor(e){super(),this.isLineBasicMaterial=!0,this.type="LineBasicMaterial",this.color=new pe(16777215),this.map=null,this.linewidth=1,this.linecap="round",this.linejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.linewidth=e.linewidth,this.linecap=e.linecap,this.linejoin=e.linejoin,this.fog=e.fog,this}},aa=new N,ca=new N,Oh=new Ue,Tr=new ti,Ho=new nn,ol=new N,Fh=new N,Qi=class extends ht{constructor(e=new bt,t=new Ri){super(),this.isLine=!0,this.type="Line",this.geometry=e,this.material=t,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}computeLineDistances(){let e=this.geometry;if(e.index===null){let t=e.attributes.position,n=[0];for(let s=1,r=t.count;s<r;s++)aa.fromBufferAttribute(t,s-1),ca.fromBufferAttribute(t,s),n[s]=n[s-1],n[s]+=aa.distanceTo(ca);e.setAttribute("lineDistance",new Et(n,1))}else Ae("Line.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}intersectsFrustum(e){return e.intersectsObject(this)}raycast(e,t){let n=this.geometry,s=this.matrixWorld,r=e.params.Line.threshold,o=n.drawRange;if(n.boundingSphere===null&&n.computeBoundingSphere(),Ho.copy(n.boundingSphere),Ho.applyMatrix4(s),Ho.radius+=r,e.ray.intersectsSphere(Ho)===!1)return;Oh.copy(s).invert(),Tr.copy(e.ray).applyMatrix4(Oh);let a=r/((this.scale.x+this.scale.y+this.scale.z)/3),c=a*a,l=this.isLineSegments?2:1,h=n.index,u=n.attributes.position;if(h!==null){let p=Math.max(0,o.start),g=Math.min(h.count,o.start+o.count);for(let b=p,m=g-1;b<m;b+=l){let f=h.getX(b),v=h.getX(b+1),T=Vo(this,e,Tr,c,f,v,b);T&&t.push(T)}if(this.isLineLoop){let b=h.getX(g-1),m=h.getX(p),f=Vo(this,e,Tr,c,b,m,g-1);f&&t.push(f)}}else{let p=Math.max(0,o.start),g=Math.min(u.count,o.start+o.count);for(let b=p,m=g-1;b<m;b+=l){let f=Vo(this,e,Tr,c,b,b+1,b);f&&t.push(f)}if(this.isLineLoop){let b=Vo(this,e,Tr,c,g-1,p,g-1);b&&t.push(b)}}}updateMorphTargets(){let t=this.geometry.morphAttributes,n=Object.keys(t);if(n.length>0){let s=t[n[0]];if(s!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,o=s.length;r<o;r++){let a=s[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=r}}}}};function Vo(i,e,t,n,s,r,o){let a=i.geometry.attributes.position;if(aa.fromBufferAttribute(a,s),ca.fromBufferAttribute(a,r),t.distanceSqToSegment(aa,ca,ol,Fh)>n)return;ol.applyMatrix4(i.matrixWorld);let l=e.ray.origin.distanceTo(ol);if(!(l<e.near||l>e.far))return{distance:l,point:Fh.clone().applyMatrix4(i.matrixWorld),index:o,face:null,faceIndex:null,barycoord:null,object:i}}var Bh=new N,kh=new N,Fr=class extends Qi{constructor(e,t){super(e,t),this.isLineSegments=!0,this.type="LineSegments"}computeLineDistances(){let e=this.geometry;if(e.index===null){let t=e.attributes.position,n=[];for(let s=0,r=t.count;s<r;s+=2)Bh.fromBufferAttribute(t,s),kh.fromBufferAttribute(t,s+1),n[s]=s===0?0:n[s-1],n[s+1]=n[s]+Bh.distanceTo(kh);e.setAttribute("lineDistance",new Et(n,1))}else Ae("LineSegments.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}},Br=class extends Qi{constructor(e,t){super(e,t),this.isLineLoop=!0,this.type="LineLoop"}},es=class extends _t{constructor(e){super(),this.isPointsMaterial=!0,this.type="PointsMaterial",this.color=new pe(16777215),this.map=null,this.alphaMap=null,this.size=1,this.sizeAttenuation=!0,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.alphaMap=e.alphaMap,this.size=e.size,this.sizeAttenuation=e.sizeAttenuation,this.fog=e.fog,this}},zh=new Ue,ul=new ti,Go=new nn,Wo=new N,kr=class extends ht{constructor(e=new bt,t=new es){super(),this.isPoints=!0,this.type="Points",this.geometry=e,this.material=t,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}intersectsFrustum(e){return e.intersectsObject(this)}raycast(e,t){let n=this.geometry,s=this.matrixWorld,r=e.params.Points.threshold,o=n.drawRange;if(n.boundingSphere===null&&n.computeBoundingSphere(),Go.copy(n.boundingSphere),Go.applyMatrix4(s),Go.radius+=r,e.ray.intersectsSphere(Go)===!1)return;zh.copy(s).invert(),ul.copy(e.ray).applyMatrix4(zh);let a=r/((this.scale.x+this.scale.y+this.scale.z)/3),c=a*a,l=n.index,d=n.attributes.position;if(l!==null){let u=Math.max(0,o.start),p=Math.min(l.count,o.start+o.count);for(let g=u,b=p;g<b;g++){let m=l.getX(g);Wo.fromBufferAttribute(d,m),Hh(Wo,m,c,s,e,t,this)}}else{let u=Math.max(0,o.start),p=Math.min(d.count,o.start+o.count);for(let g=u,b=p;g<b;g++)Wo.fromBufferAttribute(d,g),Hh(Wo,g,c,s,e,t,this)}}updateMorphTargets(){let t=this.geometry.morphAttributes,n=Object.keys(t);if(n.length>0){let s=t[n[0]];if(s!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,o=s.length;r<o;r++){let a=s[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=r}}}}};function Hh(i,e,t,n,s,r,o){let a=ul.distanceSqToPoint(i);if(a<t){let c=new N;ul.closestPointToPoint(i,c),c.applyMatrix4(n);let l=s.ray.origin.distanceTo(c);if(l<s.near||l>s.far)return;r.push({distance:l,distanceToRay:Math.sqrt(a),point:c,index:e,face:null,faceIndex:null,barycoord:null,object:o})}}var zr=class extends Ft{constructor(e=[],t=Ui,n,s,r,o,a,c,l,h){super(e,t,n,s,r,o,a,c,l,h),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(e){this.image=e}};var Ci=class extends Ft{constructor(e,t,n=Dn,s,r,o,a=Mt,c=Mt,l,h=kn,d=1){if(h!==kn&&h!==Oi)throw new Error("THREE.DepthTexture: format must be either THREE.DepthFormat or THREE.DepthStencilFormat");let u={width:e,height:t,depth:d};super(u,s,r,o,a,c,h,n,l),this.isDepthTexture=!0,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(e){return super.copy(e),this.source=new Hs(Object.assign({},e.image)),this.compareFunction=e.compareFunction,this}toJSON(e){let t=super.toJSON(e);return t.compareFunction=this.compareFunction,t}},la=class extends Ci{constructor(e,t=Dn,n=Ui,s,r,o=Mt,a=Mt,c,l=kn){let h={width:e,height:e,depth:1},d=[h,h,h,h,h,h];super(e,e,t,n,s,r,o,a,c,l),this.image=d,this.isCubeDepthTexture=!0,this.isCubeTexture=!0}get images(){return this.image}set images(e){this.image=e}},Hr=class extends Ft{constructor(e=null){super(),this.sourceTexture=e,this.isExternalTexture=!0}copy(e){return super.copy(e),this.sourceTexture=e.sourceTexture,this}},Ii=class i extends bt{constructor(e=1,t=1,n=1,s=1,r=1,o=1){super(),this.type="BoxGeometry",this.parameters={width:e,height:t,depth:n,widthSegments:s,heightSegments:r,depthSegments:o};let a=this;s=Math.floor(s),r=Math.floor(r),o=Math.floor(o);let c=[],l=[],h=[],d=[],u=0,p=0;g("z","y","x",-1,-1,n,t,e,o,r,0),g("z","y","x",1,-1,n,t,-e,o,r,1),g("x","z","y",1,1,e,n,t,s,o,2),g("x","z","y",1,-1,e,n,-t,s,o,3),g("x","y","z",1,-1,e,t,n,s,r,4),g("x","y","z",-1,-1,e,t,-n,s,r,5),this.setIndex(c),this.setAttribute("position",new Et(l,3)),this.setAttribute("normal",new Et(h,3)),this.setAttribute("uv",new Et(d,2));function g(b,m,f,v,T,y,S,w,R,x,A){let C=y/R,L=S/x,O=y/2,W=S/2,I=w/2,B=R+1,V=x+1,X=0,j=0,H=new N;for(let Y=0;Y<V;Y++){let ee=Y*L-W;for(let Te=0;Te<B;Te++){let Me=Te*C-O;H[b]=Me*v,H[m]=ee*T,H[f]=I,l.push(H.x,H.y,H.z),H[b]=0,H[m]=0,H[f]=w>0?1:-1,h.push(H.x,H.y,H.z),d.push(Te/R),d.push(1-Y/x),X+=1}}for(let Y=0;Y<x;Y++)for(let ee=0;ee<R;ee++){let Te=u+ee+B*Y,Me=u+ee+B*(Y+1),ot=u+(ee+1)+B*(Y+1),Xe=u+(ee+1)+B*Y;c.push(Te,Me,Xe),c.push(Me,ot,Xe),j+=6}a.addGroup(p,j,A),p+=j,u+=X}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new i(e.width,e.height,e.depth,e.widthSegments,e.heightSegments,e.depthSegments)}};var ha=class i extends bt{constructor(e=[],t=[],n=1,s=0){super(),this.type="PolyhedronGeometry",this.parameters={vertices:e,indices:t,radius:n,detail:s};let r=[],o=[];a(s),l(n),h(),this.setAttribute("position",new Et(r,3)),this.setAttribute("normal",new Et(r.slice(),3)),this.setAttribute("uv",new Et(o,2)),s===0?this.computeVertexNormals():this.normalizeNormals();function a(v){let T=new N,y=new N,S=new N;for(let w=0;w<t.length;w+=3)p(t[w+0],T),p(t[w+1],y),p(t[w+2],S),c(T,y,S,v)}function c(v,T,y,S){let w=S+1,R=[];for(let x=0;x<=w;x++){R[x]=[];let A=v.clone().lerp(y,x/w),C=T.clone().lerp(y,x/w),L=w-x;for(let O=0;O<=L;O++)O===0&&x===w?R[x][O]=A:R[x][O]=A.clone().lerp(C,O/L)}for(let x=0;x<w;x++)for(let A=0;A<2*(w-x)-1;A++){let C=Math.floor(A/2);A%2===0?(u(R[x][C+1]),u(R[x+1][C]),u(R[x][C])):(u(R[x][C+1]),u(R[x+1][C+1]),u(R[x+1][C]))}}function l(v){let T=new N;for(let y=0;y<r.length;y+=3)T.x=r[y+0],T.y=r[y+1],T.z=r[y+2],T.normalize().multiplyScalar(v),r[y+0]=T.x,r[y+1]=T.y,r[y+2]=T.z}function h(){let v=new N;for(let T=0;T<r.length;T+=3){v.x=r[T+0],v.y=r[T+1],v.z=r[T+2];let y=m(v)/2/Math.PI+.5,S=f(v)/Math.PI+.5;o.push(y,1-S)}g(),d()}function d(){for(let v=0;v<o.length;v+=6){let T=o[v+0],y=o[v+2],S=o[v+4],w=Math.max(T,y,S),R=Math.min(T,y,S);w>.9&&R<.1&&(T<.2&&(o[v+0]+=1),y<.2&&(o[v+2]+=1),S<.2&&(o[v+4]+=1))}}function u(v){r.push(v.x,v.y,v.z)}function p(v,T){let y=v*3;T.x=e[y+0],T.y=e[y+1],T.z=e[y+2]}function g(){let v=new N,T=new N,y=new N,S=new N,w=new we,R=new we,x=new we;for(let A=0,C=0;A<r.length;A+=9,C+=6){v.set(r[A+0],r[A+1],r[A+2]),T.set(r[A+3],r[A+4],r[A+5]),y.set(r[A+6],r[A+7],r[A+8]),w.set(o[C+0],o[C+1]),R.set(o[C+2],o[C+3]),x.set(o[C+4],o[C+5]),S.copy(v).add(T).add(y).divideScalar(3);let L=m(S);b(w,C+0,v,L),b(R,C+2,T,L),b(x,C+4,y,L)}}function b(v,T,y,S){S<0&&v.x===1&&(o[T]=v.x-1),y.x===0&&y.z===0&&(o[T]=S/2/Math.PI+.5)}function m(v){return Math.atan2(v.z,-v.x)}function f(v){return Math.atan2(-v.y,Math.sqrt(v.x*v.x+v.z*v.z))}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new i(e.vertices,e.indices,e.radius,e.detail)}};var Ys=class i extends ha{constructor(e=1,t=0){let n=(1+Math.sqrt(5))/2,s=[-1,n,0,1,n,0,-1,-n,0,1,-n,0,0,-1,n,0,1,n,0,-1,-n,0,1,-n,n,0,-1,n,0,1,-n,0,-1,-n,0,1],r=[0,11,5,0,5,1,0,1,7,0,7,10,0,10,11,1,5,9,5,11,4,11,10,2,10,7,6,7,1,8,3,9,4,3,4,2,3,2,6,3,6,8,3,8,9,4,9,5,2,4,11,6,2,10,8,6,7,9,8,1];super(s,r,e,t),this.type="IcosahedronGeometry",this.parameters={radius:e,detail:t}}static fromJSON(e){return new i(e.radius,e.detail)}};var ii=class i extends bt{constructor(e=1,t=1,n=1,s=1){super(),this.type="PlaneGeometry",this.parameters={width:e,height:t,widthSegments:n,heightSegments:s};let r=e/2,o=t/2,a=Math.floor(n),c=Math.floor(s),l=a+1,h=c+1,d=e/a,u=t/c,p=[],g=[],b=[],m=[];for(let f=0;f<h;f++){let v=f*u-o;for(let T=0;T<l;T++){let y=T*d-r;g.push(y,-v,0),b.push(0,0,1),m.push(T/a),m.push(1-f/c)}}for(let f=0;f<c;f++)for(let v=0;v<a;v++){let T=v+l*f,y=v+l*(f+1),S=v+1+l*(f+1),w=v+1+l*f;p.push(T,y,w),p.push(y,S,w)}this.setIndex(p),this.setAttribute("position",new Et(g,3)),this.setAttribute("normal",new Et(b,3)),this.setAttribute("uv",new Et(m,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new i(e.width,e.height,e.widthSegments,e.heightSegments)}};var Zs=class extends _t{constructor(e){super(),this.isShadowMaterial=!0,this.type="ShadowMaterial",this.color=new pe(0),this.transparent=!0,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.fog=e.fog,this}};function us(i){let e={};for(let t in i){e[t]={};for(let n in i[t]){let s=i[t][n];if(Vh(s))s.isRenderTargetTexture?(Ae("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),e[t][n]=null):e[t][n]=s.clone();else if(Array.isArray(s))if(Vh(s[0])){let r=[];for(let o=0,a=s.length;o<a;o++)r[o]=s[o].clone();e[t][n]=r}else e[t][n]=s.slice();else e[t][n]=s}}return e}function qt(i){let e={};for(let t=0;t<i.length;t++){let n=us(i[t]);for(let s in n)e[s]=n[s]}return e}function Vh(i){return i&&(i.isColor||i.isMatrix3||i.isMatrix4||i.isVector2||i.isVector3||i.isVector4||i.isTexture||i.isQuaternion)}function Zf(i){let e=[];for(let t=0;t<i.length;t++)e.push(i[t].clone());return e}function Vl(i){let e=i.getRenderTarget();return e===null?i.outputColorSpace:e.isXRRenderTarget===!0?e.texture.colorSpace:Be.workingColorSpace}var ku={clone:us,merge:qt},Kf=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,$f=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`,sn=class extends _t{constructor(e){super(),this.isShaderMaterial=!0,this.type="ShaderMaterial",this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=Kf,this.fragmentShader=$f,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,e!==void 0&&this.setValues(e)}copy(e){return super.copy(e),this.fragmentShader=e.fragmentShader,this.vertexShader=e.vertexShader,this.uniforms=us(e.uniforms),this.uniformsGroups=Zf(e.uniformsGroups),this.defines=Object.assign({},e.defines),this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.fog=e.fog,this.lights=e.lights,this.clipping=e.clipping,this.extensions=Object.assign({},e.extensions),this.glslVersion=e.glslVersion,this.defaultAttributeValues=Object.assign({},e.defaultAttributeValues),this.index0AttributeName=e.index0AttributeName,this.uniformsNeedUpdate=e.uniformsNeedUpdate,this}toJSON(e){let t=super.toJSON(e);t.glslVersion=this.glslVersion,t.uniforms={};for(let s in this.uniforms){let o=this.uniforms[s].value;o&&o.isTexture?t.uniforms[s]={type:"t",value:o.toJSON(e).uuid}:o&&o.isColor?t.uniforms[s]={type:"c",value:o.getHex()}:o&&o.isVector2?t.uniforms[s]={type:"v2",value:o.toArray()}:o&&o.isVector3?t.uniforms[s]={type:"v3",value:o.toArray()}:o&&o.isVector4?t.uniforms[s]={type:"v4",value:o.toArray()}:o&&o.isMatrix3?t.uniforms[s]={type:"m3",value:o.toArray()}:o&&o.isMatrix4?t.uniforms[s]={type:"m4",value:o.toArray()}:t.uniforms[s]={value:o}}Object.keys(this.defines).length>0&&(t.defines=this.defines),t.vertexShader=this.vertexShader,t.fragmentShader=this.fragmentShader,t.lights=this.lights,t.clipping=this.clipping;let n={};for(let s in this.extensions)this.extensions[s]===!0&&(n[s]=!0);return Object.keys(n).length>0&&(t.extensions=n),t}fromJSON(e,t){if(super.fromJSON(e,t),e.uniforms!==void 0)for(let n in e.uniforms){let s=e.uniforms[n];switch(this.uniforms[n]={},s.type){case"t":this.uniforms[n].value=t[s.value]||null;break;case"c":this.uniforms[n].value=new pe().setHex(s.value);break;case"v2":this.uniforms[n].value=new we().fromArray(s.value);break;case"v3":this.uniforms[n].value=new N().fromArray(s.value);break;case"v4":this.uniforms[n].value=new tt().fromArray(s.value);break;case"m3":this.uniforms[n].value=new Le().fromArray(s.value);break;case"m4":this.uniforms[n].value=new Ue().fromArray(s.value);break;default:this.uniforms[n].value=s.value}}if(e.defines!==void 0&&(this.defines=e.defines),e.vertexShader!==void 0&&(this.vertexShader=e.vertexShader),e.fragmentShader!==void 0&&(this.fragmentShader=e.fragmentShader),e.glslVersion!==void 0&&(this.glslVersion=e.glslVersion),e.extensions!==void 0)for(let n in e.extensions)this.extensions[n]=e.extensions[n];return e.lights!==void 0&&(this.lights=e.lights),e.clipping!==void 0&&(this.clipping=e.clipping),this}},Vr=class extends sn{constructor(e){super(e),this.isRawShaderMaterial=!0,this.type="RawShaderMaterial"}},kt=class extends _t{constructor(e){super(),this.isMeshStandardMaterial=!0,this.type="MeshStandardMaterial",this.defines={STANDARD:""},this.color=new pe(16777215),this.roughness=1,this.metalness=0,this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new pe(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=ui,this.normalScale=new we(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.roughnessMap=null,this.metalnessMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new In,this.envMapIntensity=1,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.defines={STANDARD:""},this.color.copy(e.color),this.roughness=e.roughness,this.metalness=e.metalness,this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.emissive.copy(e.emissive),this.emissiveMap=e.emissiveMap,this.emissiveIntensity=e.emissiveIntensity,this.bumpMap=e.bumpMap,this.bumpScale=e.bumpScale,this.normalMap=e.normalMap,this.normalMapType=e.normalMapType,this.normalScale.copy(e.normalScale),this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.roughnessMap=e.roughnessMap,this.metalnessMap=e.metalnessMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.envMapIntensity=e.envMapIntensity,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.flatShading=e.flatShading,this.fog=e.fog,this}},Jt=class extends kt{constructor(e){super(),this.isMeshPhysicalMaterial=!0,this.defines={STANDARD:"",PHYSICAL:""},this.type="MeshPhysicalMaterial",this.anisotropyRotation=0,this.anisotropyMap=null,this.clearcoatMap=null,this.clearcoatRoughness=0,this.clearcoatRoughnessMap=null,this.clearcoatNormalScale=new we(1,1),this.clearcoatNormalMap=null,this.ior=1.5,Object.defineProperty(this,"reflectivity",{get:function(){return ke(2.5*(this.ior-1)/(this.ior+1),0,1)},set:function(t){this.ior=(1+.4*t)/(1-.4*t)}}),this.iridescenceMap=null,this.iridescenceIOR=1.3,this.iridescenceThicknessRange=[100,400],this.iridescenceThicknessMap=null,this.sheenColor=new pe(0),this.sheenColorMap=null,this.sheenRoughness=1,this.sheenRoughnessMap=null,this.transmissionMap=null,this.thickness=0,this.thicknessMap=null,this.attenuationDistance=1/0,this.attenuationColor=new pe(1,1,1),this.specularIntensity=1,this.specularIntensityMap=null,this.specularColor=new pe(1,1,1),this.specularColorMap=null,this._anisotropy=0,this._clearcoat=0,this._dispersion=0,this._iridescence=0,this._retroreflectivity=0,this._sheen=0,this._transmission=0,this.setValues(e)}get anisotropy(){return this._anisotropy}set anisotropy(e){this._anisotropy>0!=e>0&&this.version++,this._anisotropy=e}get clearcoat(){return this._clearcoat}set clearcoat(e){this._clearcoat>0!=e>0&&this.version++,this._clearcoat=e}get iridescence(){return this._iridescence}set iridescence(e){this._iridescence>0!=e>0&&this.version++,this._iridescence=e}get dispersion(){return this._dispersion}set dispersion(e){this._dispersion>0!=e>0&&this.version++,this._dispersion=e}get retroreflectivity(){return this._retroreflectivity}set retroreflectivity(e){this._retroreflectivity>0!=e>0&&this.version++,this._retroreflectivity=e}get sheen(){return this._sheen}set sheen(e){this._sheen>0!=e>0&&this.version++,this._sheen=e}get transmission(){return this._transmission}set transmission(e){this._transmission>0!=e>0&&this.version++,this._transmission=e}copy(e){return super.copy(e),this.defines={STANDARD:"",PHYSICAL:""},this.anisotropy=e.anisotropy,this.anisotropyRotation=e.anisotropyRotation,this.anisotropyMap=e.anisotropyMap,this.clearcoat=e.clearcoat,this.clearcoatMap=e.clearcoatMap,this.clearcoatRoughness=e.clearcoatRoughness,this.clearcoatRoughnessMap=e.clearcoatRoughnessMap,this.clearcoatNormalMap=e.clearcoatNormalMap,this.clearcoatNormalScale.copy(e.clearcoatNormalScale),this.dispersion=e.dispersion,this.ior=e.ior,this.iridescence=e.iridescence,this.iridescenceMap=e.iridescenceMap,this.iridescenceIOR=e.iridescenceIOR,this.iridescenceThicknessRange=[...e.iridescenceThicknessRange],this.iridescenceThicknessMap=e.iridescenceThicknessMap,this.retroreflectivity=e.retroreflectivity,this.sheen=e.sheen,this.sheenColor.copy(e.sheenColor),this.sheenColorMap=e.sheenColorMap,this.sheenRoughness=e.sheenRoughness,this.sheenRoughnessMap=e.sheenRoughnessMap,this.transmission=e.transmission,this.transmissionMap=e.transmissionMap,this.thickness=e.thickness,this.thicknessMap=e.thicknessMap,this.attenuationDistance=e.attenuationDistance,this.attenuationColor.copy(e.attenuationColor),this.specularIntensity=e.specularIntensity,this.specularIntensityMap=e.specularIntensityMap,this.specularColor.copy(e.specularColor),this.specularColorMap=e.specularColorMap,this}},ua=class extends _t{constructor(e){super(),this.isMeshPhongMaterial=!0,this.type="MeshPhongMaterial",this.color=new pe(16777215),this.specular=new pe(1118481),this.shininess=30,this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new pe(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=ui,this.normalScale=new we(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new In,this.combine=Qr,this.reflectivity=1,this.envMapIntensity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.specular.copy(e.specular),this.shininess=e.shininess,this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.emissive.copy(e.emissive),this.emissiveMap=e.emissiveMap,this.emissiveIntensity=e.emissiveIntensity,this.bumpMap=e.bumpMap,this.bumpScale=e.bumpScale,this.normalMap=e.normalMap,this.normalMapType=e.normalMapType,this.normalScale.copy(e.normalScale),this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.combine=e.combine,this.reflectivity=e.reflectivity,this.envMapIntensity=e.envMapIntensity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.flatShading=e.flatShading,this.fog=e.fog,this}},da=class extends _t{constructor(e){super(),this.isMeshToonMaterial=!0,this.defines={TOON:""},this.type="MeshToonMaterial",this.color=new pe(16777215),this.map=null,this.gradientMap=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new pe(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=ui,this.normalScale=new we(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.alphaMap=null,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.gradientMap=e.gradientMap,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.emissive.copy(e.emissive),this.emissiveMap=e.emissiveMap,this.emissiveIntensity=e.emissiveIntensity,this.bumpMap=e.bumpMap,this.bumpScale=e.bumpScale,this.normalMap=e.normalMap,this.normalMapType=e.normalMapType,this.normalScale.copy(e.normalScale),this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.alphaMap=e.alphaMap,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.fog=e.fog,this}},fa=class extends _t{constructor(e){super(),this.isMeshNormalMaterial=!0,this.type="MeshNormalMaterial",this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=ui,this.normalScale=new we(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.flatShading=!1,this.setValues(e)}copy(e){return super.copy(e),this.bumpMap=e.bumpMap,this.bumpScale=e.bumpScale,this.normalMap=e.normalMap,this.normalMapType=e.normalMapType,this.normalScale.copy(e.normalScale),this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.flatShading=e.flatShading,this}},Ks=class extends _t{constructor(e){super(),this.isMeshLambertMaterial=!0,this.type="MeshLambertMaterial",this.color=new pe(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new pe(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=ui,this.normalScale=new we(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new In,this.combine=Qr,this.reflectivity=1,this.envMapIntensity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.emissive.copy(e.emissive),this.emissiveMap=e.emissiveMap,this.emissiveIntensity=e.emissiveIntensity,this.bumpMap=e.bumpMap,this.bumpScale=e.bumpScale,this.normalMap=e.normalMap,this.normalMapType=e.normalMapType,this.normalScale.copy(e.normalScale),this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.combine=e.combine,this.reflectivity=e.reflectivity,this.envMapIntensity=e.envMapIntensity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.flatShading=e.flatShading,this.fog=e.fog,this}},ts=class extends _t{constructor(e){super(),this.isMeshDepthMaterial=!0,this.type="MeshDepthMaterial",this.depthPacking=Tu,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(e)}copy(e){return super.copy(e),this.depthPacking=e.depthPacking,this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this}},Gr=class extends _t{constructor(e){super(),this.isMeshDistanceMaterial=!0,this.type="MeshDistanceMaterial",this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(e)}copy(e){return super.copy(e),this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this}},pa=class extends _t{constructor(e){super(),this.isMeshMatcapMaterial=!0,this.defines={MATCAP:""},this.type="MeshMatcapMaterial",this.color=new pe(16777215),this.matcap=null,this.map=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=ui,this.normalScale=new we(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.alphaMap=null,this.wireframe=!1,this.wireframeLinewidth=1,this.flatShading=!1,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.defines={MATCAP:""},this.color.copy(e.color),this.matcap=e.matcap,this.map=e.map,this.bumpMap=e.bumpMap,this.bumpScale=e.bumpScale,this.normalMap=e.normalMap,this.normalMapType=e.normalMapType,this.normalScale.copy(e.normalScale),this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.alphaMap=e.alphaMap,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.flatShading=e.flatShading,this.fog=e.fog,this}},ma=class extends Ri{constructor(e){super(),this.isLineDashedMaterial=!0,this.type="LineDashedMaterial",this.scale=1,this.dashSize=3,this.gapSize=1,this.setValues(e)}copy(e){return super.copy(e),this.scale=e.scale,this.dashSize=e.dashSize,this.gapSize=e.gapSize,this}};function Si(i,e){return!i||i.constructor===e?i:typeof e.BYTES_PER_ELEMENT=="number"?new e(i):Array.prototype.slice.call(i)}function Ko(i){return i!==void 0&&i.inTangents!==void 0&&i.outTangents!==void 0}function jf(i){function e(s,r){return i[s]-i[r]}let t=i.length,n=new Array(t);for(let s=0;s!==t;++s)n[s]=s;return n.sort(e),n}function Gh(i,e,t){let n=i.length,s=new i.constructor(n);for(let r=0,o=0;o!==n;++r){let a=t[r]*e;for(let c=0;c!==e;++c)s[o++]=i[a+c]}return s}function Jf(i,e,t,n){let s=1,r=i[0];for(;r!==void 0&&r[n]===void 0;)r=i[s++];if(r===void 0)return;let o=r[n];if(o!==void 0)if(Array.isArray(o))do o=r[n],o!==void 0&&(e.push(r.time),t.push(...o)),r=i[s++];while(r!==void 0);else if(o.toArray!==void 0)do o=r[n],o!==void 0&&(e.push(r.time),o.toArray(t,t.length)),r=i[s++];while(r!==void 0);else do o=r[n],o!==void 0&&(e.push(r.time),t.push(o)),r=i[s++];while(r!==void 0)}var zn=class{constructor(e,t,n,s){this.parameterPositions=e,this._cachedIndex=0,this.resultBuffer=s!==void 0?s:new t.constructor(n),this.sampleValues=t,this.valueSize=n,this.settings=null,this.DefaultSettings_={}}evaluate(e){let t=this.parameterPositions,n=this._cachedIndex,s=t[n],r=t[n-1];e:{t:{let o;n:{i:if(!(e<s)){for(let a=n+2;;){if(s===void 0){if(e<r)break i;return n=t.length,this._cachedIndex=n,this.copySampleValue_(n-1)}if(n===a)break;if(r=s,s=t[++n],e<s)break t}o=t.length;break n}if(!(e>=r)){let a=t[1];e<a&&(n=2,r=a);for(let c=n-2;;){if(r===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(n===c)break;if(s=r,r=t[--n-1],e>=r)break t}o=n,n=0;break n}break e}for(;n<o;){let a=n+o>>>1;e<t[a]?o=a:n=a+1}if(s=t[n],r=t[n-1],r===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(s===void 0)return n=t.length,this._cachedIndex=n,this.copySampleValue_(n-1)}this._cachedIndex=n,this.intervalChanged_(n,r,s)}return this.interpolate_(n,r,e,s)}getSettings_(){return this.settings||this.DefaultSettings_}copySampleValue_(e){let t=this.resultBuffer,n=this.sampleValues,s=this.valueSize,r=e*s;for(let o=0;o!==s;++o)t[o]=n[r+o];return t}interpolate_(){throw new Error("THREE.Interpolant: Call to abstract method.")}intervalChanged_(){}},ga=class extends zn{constructor(e,t,n,s){super(e,t,n,s),this._weightPrev=-0,this._offsetPrev=-0,this._weightNext=-0,this._offsetNext=-0,this.DefaultSettings_={endingStart:Yi,endingEnd:Yi}}intervalChanged_(e,t,n){let s=this.parameterPositions,r=e-2,o=e+1,a=s[r],c=s[o];if(a===void 0)switch(this.getSettings_().endingStart){case Zi:r=e,a=2*t-n;break;case Rr:r=s.length-2,a=t+s[r]-s[r+1];break;default:r=e,a=n}if(c===void 0)switch(this.getSettings_().endingEnd){case Zi:o=e,c=2*n-t;break;case Rr:o=1,c=n+s[1]-s[0];break;default:o=e-1,c=t}let l=(n-t)*.5,h=this.valueSize;this._weightPrev=l/(t-a),this._weightNext=l/(c-n),this._offsetPrev=r*h,this._offsetNext=o*h}interpolate_(e,t,n,s){let r=this.resultBuffer,o=this.sampleValues,a=this.valueSize,c=e*a,l=c-a,h=this._offsetPrev,d=this._offsetNext,u=this._weightPrev,p=this._weightNext,g=(n-t)/(s-t),b=g*g,m=b*g,f=-u*m+2*u*b-u*g,v=(1+u)*m+(-1.5-2*u)*b+(-.5+u)*g+1,T=(-1-p)*m+(1.5+p)*b+.5*g,y=p*m-p*b;for(let S=0;S!==a;++S)r[S]=f*o[h+S]+v*o[l+S]+T*o[c+S]+y*o[d+S];return r}},Wr=class extends zn{constructor(e,t,n,s){super(e,t,n,s)}interpolate_(e,t,n,s){let r=this.resultBuffer,o=this.sampleValues,a=this.valueSize,c=e*a,l=c-a,h=(n-t)/(s-t),d=1-h;for(let u=0;u!==a;++u)r[u]=o[l+u]*d+o[c+u]*h;return r}},_a=class extends zn{constructor(e,t,n,s){super(e,t,n,s)}interpolate_(e){return this.copySampleValue_(e-1)}},xa=class extends zn{interpolate_(e,t,n,s){let r=this.resultBuffer,o=this.sampleValues,a=this.valueSize,c=e*a,l=c-a,h=this.inTangents,d=this.outTangents;if(!h||!d){let g=(n-t)/(s-t),b=1-g;for(let m=0;m!==a;++m)r[m]=o[l+m]*b+o[c+m]*g;return r}let u=a*2,p=e-1;for(let g=0;g!==a;++g){let b=o[l+g],m=o[c+g],f=p*u+g*2,v=d[f],T=d[f+1],y=e*u+g*2,S=h[y],w=h[y+1],R=e1(n,t,v,S,s);r[g]=zu(R,b,T,w,m)}return r}};function zu(i,e,t,n,s){let r=1-i;return r*r*r*e+3*r*r*i*t+3*r*i*i*n+i*i*i*s}function Qf(i,e,t,n,s){let r=1-i;return 3*r*r*(t-e)+6*r*i*(n-t)+3*i*i*(s-n)}function e1(i,e,t,n,s){let r=(i-e)/(s-e);for(let o=0;o<8;o++){let a=zu(r,e,t,n,s)-i;if(Math.abs(a)<1e-10)break;let c=Qf(r,e,t,n,s);if(Math.abs(c)<1e-10)break;r=Math.max(0,Math.min(1,r-a/c))}return r}var rn=class{constructor(e,t,n,s){if(e===void 0)throw new Error("THREE.KeyframeTrack: track name is undefined");if(t===void 0||t.length===0)throw new Error("THREE.KeyframeTrack: no keyframes in track named "+e);this.name=e,this.times=Si(t,this.TimeBufferType),this.values=Si(n,this.ValueBufferType),this.setInterpolation(s||this.DefaultInterpolation)}static toJSON(e){let t=e.constructor,n;if(t.toJSON!==this.toJSON)n=t.toJSON(e);else{n={name:e.name,times:Si(e.times,Array),values:Si(e.values,Array)};let s=e.getInterpolation();s!==e.DefaultInterpolation&&(n.interpolation=s),Ko(e.settings)&&(n.settings={inTangents:Si(e.settings.inTangents,Array),outTangents:Si(e.settings.outTangents,Array)})}return n.type=e.ValueTypeName,n}InterpolantFactoryMethodDiscrete(e){return new _a(this.times,this.values,this.getValueSize(),e)}InterpolantFactoryMethodLinear(e){return new Wr(this.times,this.values,this.getValueSize(),e)}InterpolantFactoryMethodSmooth(e){return new ga(this.times,this.values,this.getValueSize(),e)}InterpolantFactoryMethodBezier(e){let t=new xa(this.times,this.values,this.getValueSize(),e);return this.settings&&(t.inTangents=this.settings.inTangents,t.outTangents=this.settings.outTangents),t}setInterpolation(e){let t;switch(e){case Ki:t=this.InterpolantFactoryMethodDiscrete;break;case $i:t=this.InterpolantFactoryMethodLinear;break;case Yo:t=this.InterpolantFactoryMethodSmooth;break;case hl:t=this.InterpolantFactoryMethodBezier;break}if(t===void 0){let n="unsupported interpolation for "+this.ValueTypeName+" keyframe track named "+this.name;if(this.createInterpolant===void 0)if(e!==this.DefaultInterpolation)this.setInterpolation(this.DefaultInterpolation);else throw new Error(n);return Ae("KeyframeTrack:",n),this}return this.createInterpolant=t,this}getInterpolation(){switch(this.createInterpolant){case this.InterpolantFactoryMethodDiscrete:return Ki;case this.InterpolantFactoryMethodLinear:return $i;case this.InterpolantFactoryMethodSmooth:return Yo;case this.InterpolantFactoryMethodBezier:return hl}}getValueSize(){return this.values.length/this.times.length}shift(e){if(e!==0){let t=this.times;for(let n=0,s=t.length;n!==s;++n)t[n]+=e}return this}scale(e){if(e!==1){let t=this.times;for(let n=0,s=t.length;n!==s;++n)t[n]*=e;Ko(this.settings)&&(Wh(this.settings.inTangents,e),Wh(this.settings.outTangents,e))}return this}trim(e,t){let n=this.times,s=n.length,r=0,o=s-1;for(;r!==s&&n[r]<e;)++r;for(;o!==-1&&n[o]>t;)--o;if(++o,r!==0||o!==s){r>=o&&(o=Math.max(o,1),r=o-1);let a=this.getValueSize();this.times=n.slice(r,o),this.values=this.values.slice(r*a,o*a)}return this}validate(){let e=!0,t=this.getValueSize();t-Math.floor(t)!==0&&(Pe("KeyframeTrack: Invalid value size in track.",this),e=!1);let n=this.times,s=this.values,r=n.length;r===0&&(Pe("KeyframeTrack: Track is empty.",this),e=!1);let o=null;for(let a=0;a!==r;a++){let c=n[a];if(typeof c=="number"&&isNaN(c)){Pe("KeyframeTrack: Time is not a valid number.",this,a,c),e=!1;break}if(o!==null&&o>c){Pe("KeyframeTrack: Out of order keys.",this,a,c,o),e=!1;break}o=c}if(s!==void 0&&hf(s))for(let a=0,c=s.length;a!==c;++a){let l=s[a];if(isNaN(l)){Pe("KeyframeTrack: Value is not a valid number.",this,a,l),e=!1;break}}return e}optimize(){let e=this.times.slice(),t=this.values.slice(),n=this.getValueSize(),s=this.getInterpolation()===Yo,r=e.length-1,o=1;for(let a=1;a<r;++a){let c=!1,l=e[a],h=e[a+1];if(l!==h&&(a!==1||l!==e[0]))if(s)c=!0;else{let d=a*n,u=d-n,p=d+n;for(let g=0;g!==n;++g){let b=t[d+g];if(b!==t[u+g]||b!==t[p+g]){c=!0;break}}}if(c){if(a!==o){e[o]=e[a];let d=a*n,u=o*n;for(let p=0;p!==n;++p)t[u+p]=t[d+p]}++o}}if(r>0){e[o]=e[r];for(let a=r*n,c=o*n,l=0;l!==n;++l)t[c+l]=t[a+l];++o}return o!==e.length?(this.times=e.slice(0,o),this.values=t.slice(0,o*n)):(this.times=e,this.values=t),this}clone(){let e=this.times.slice(),t=this.values.slice(),n=this.constructor,s=new n(this.name,e,t);return s.createInterpolant=this.createInterpolant,Ko(this.settings)&&(s.settings={inTangents:this.settings.inTangents.slice(),outTangents:this.settings.outTangents.slice()}),s}};function Wh(i,e){for(let t=0,n=i.length;t!==n;t+=2)i[t]*=e}rn.prototype.ValueTypeName="";rn.prototype.TimeBufferType=Float32Array;rn.prototype.ValueBufferType=Float32Array;rn.prototype.DefaultInterpolation=$i;var si=class extends rn{constructor(e,t,n){super(e,t,n)}};si.prototype.ValueTypeName="bool";si.prototype.ValueBufferType=Array;si.prototype.DefaultInterpolation=Ki;si.prototype.InterpolantFactoryMethodLinear=void 0;si.prototype.InterpolantFactoryMethodSmooth=void 0;var Xr=class extends rn{constructor(e,t,n,s){super(e,t,n,s)}};Xr.prototype.ValueTypeName="color";var ri=class extends rn{constructor(e,t,n,s){super(e,t,n,s)}};ri.prototype.ValueTypeName="number";var ya=class extends zn{constructor(e,t,n,s){super(e,t,n,s)}interpolate_(e,t,n,s){let r=this.resultBuffer,o=this.sampleValues,a=this.valueSize,c=(n-t)/(s-t),l=e*a;for(let h=l+a;l!==h;l+=4)It.slerpFlat(r,0,o,l-a,o,l,c);return r}},oi=class extends rn{constructor(e,t,n,s){super(e,t,n,s)}InterpolantFactoryMethodLinear(e){return new ya(this.times,this.values,this.getValueSize(),e)}};oi.prototype.ValueTypeName="quaternion";oi.prototype.InterpolantFactoryMethodSmooth=void 0;var ai=class extends rn{constructor(e,t,n){super(e,t,n)}};ai.prototype.ValueTypeName="string";ai.prototype.ValueBufferType=Array;ai.prototype.DefaultInterpolation=Ki;ai.prototype.InterpolantFactoryMethodLinear=void 0;ai.prototype.InterpolantFactoryMethodSmooth=void 0;var Pi=class extends rn{constructor(e,t,n,s){super(e,t,n,s)}};Pi.prototype.ValueTypeName="vector";var ns=class{constructor(e="",t=-1,n=[],s=uc){this.name=e,this.tracks=n,this.duration=t,this.blendMode=s,this.uuid=Cn(),this.userData={},this.duration<0&&this.resetDuration()}static parse(e){let t=[],n=e.tracks,s=1/(e.fps||1);for(let o=0,a=n.length;o!==a;++o)t.push(n1(n[o]).scale(s));let r=new this(e.name,e.duration,t,e.blendMode);return r.uuid=e.uuid,r.userData=JSON.parse(e.userData||"{}"),r}static toJSON(e){let t=[],n=e.tracks,s={name:e.name,duration:e.duration,tracks:t,uuid:e.uuid,blendMode:e.blendMode,userData:JSON.stringify(e.userData)};for(let r=0,o=n.length;r!==o;++r)t.push(rn.toJSON(n[r]));return s}static CreateFromMorphTargetSequence(e,t,n,s){let r=t.length,o=[];for(let a=0;a<r;a++){let c=[],l=[];c.push((a+r-1)%r,a,(a+1)%r),l.push(0,1,0);let h=jf(c);c=Gh(c,1,h),l=Gh(l,1,h),!s&&c[0]===0&&(c.push(r),l.push(l[0])),o.push(new ri(".morphTargetInfluences["+t[a].name+"]",c,l).scale(1/n))}return new this(e,-1,o)}static findByName(e,t){let n=e;if(!Array.isArray(e)){let s=e;n=s.geometry&&s.geometry.animations||s.animations}for(let s=0;s<n.length;s++)if(n[s].name===t)return n[s];return null}static CreateClipsFromMorphTargetSequences(e,t,n){let s={},r=/^([\w-]*?)([\d]+)$/;for(let a=0,c=e.length;a<c;a++){let l=e[a],h=l.name.match(r);if(h&&h.length>1){let d=h[1],u=s[d];u||(s[d]=u=[]),u.push(l)}}let o=[];for(let a in s)o.push(this.CreateFromMorphTargetSequence(a,s[a],t,n));return o}resetDuration(){let e=this.tracks,t=0;for(let n=0,s=e.length;n!==s;++n){let r=this.tracks[n];t=Math.max(t,r.times[r.times.length-1])}return this.duration=t,this}trim(){for(let e=0;e<this.tracks.length;e++)this.tracks[e].trim(0,this.duration);return this}validate(){let e=!0;for(let t=0;t<this.tracks.length;t++)e=e&&this.tracks[t].validate();return e}optimize(){for(let e=0;e<this.tracks.length;e++)this.tracks[e].optimize();return this}clone(){let e=[];for(let n=0;n<this.tracks.length;n++)e.push(this.tracks[n].clone());let t=new this.constructor(this.name,this.duration,e,this.blendMode);return t.userData=JSON.parse(JSON.stringify(this.userData)),t}toJSON(){return this.constructor.toJSON(this)}};function t1(i){switch(i.toLowerCase()){case"scalar":case"double":case"float":case"number":case"integer":return ri;case"vector":case"vector2":case"vector3":case"vector4":return Pi;case"color":return Xr;case"quaternion":return oi;case"bool":case"boolean":return si;case"string":return ai}throw new Error("THREE.KeyframeTrack: Unsupported typeName: "+i)}function n1(i){if(i.type===void 0)throw new Error("THREE.KeyframeTrack: track type undefined, can not parse");let e=t1(i.type);if(i.times===void 0){let n=[],s=[];Jf(i.keys,n,s,"value"),i.times=n,i.values=s}let t;return e.parse!==void 0?t=e.parse(i):t=new e(i.name,i.times,i.values,i.interpolation),Ko(i.settings)&&(t.settings={inTangents:Si(i.settings.inTangents,Float32Array),outTangents:Si(i.settings.outTangents,Float32Array)}),t}var Bn={enabled:!1,files:{},add:function(i,e){this.enabled!==!1&&(Xh(i)||(this.files[i]=e))},get:function(i){if(this.enabled!==!1&&!Xh(i))return this.files[i]},remove:function(i){delete this.files[i]},clear:function(){this.files={}}};function Xh(i){try{let e=i.slice(i.indexOf(":")+1);return new URL(e).protocol==="blob:"}catch{return!1}}var va=class{constructor(e,t,n){let s=this,r=!1,o=0,a=0,c,l=[];this.onStart=void 0,this.onLoad=e,this.onProgress=t,this.onError=n,this._abortController=null,this.itemStart=function(h){a++,r===!1&&s.onStart!==void 0&&s.onStart(h,o,a),r=!0},this.itemEnd=function(h){o++,s.onProgress!==void 0&&s.onProgress(h,o,a),o===a&&(r=!1,s.onLoad!==void 0&&s.onLoad())},this.itemError=function(h){s.onError!==void 0&&s.onError(h)},this.resolveURL=function(h){return h=h.normalize("NFC"),c?c(h):h},this.setURLModifier=function(h){return c=h,this},this.addHandler=function(h,d){return l.push(h,d),this},this.removeHandler=function(h){let d=l.indexOf(h);return d!==-1&&l.splice(d,2),this},this.getHandler=function(h){for(let d=0,u=l.length;d<u;d+=2){let p=l[d],g=l[d+1];if(p.global&&(p.lastIndex=0),p.test(h))return g}return null},this.abort=function(){return this.abortController.abort(),this._abortController=null,this}}get abortController(){return this._abortController||(this._abortController=new AbortController),this._abortController}},Hu=new va,Pn=class{constructor(e){this.manager=e!==void 0?e:Hu,this.crossOrigin="anonymous",this.withCredentials=!1,this.path="",this.resourcePath="",this.requestHeader={},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}load(){}loadAsync(e,t){let n=this;return new Promise(function(s,r){n.load(e,s,t,r)})}parse(){}setCrossOrigin(e){return this.crossOrigin=e,this}setWithCredentials(e){return this.withCredentials=e,this}setPath(e){return this.path=e,this}setResourcePath(e){return this.resourcePath=e,this}setRequestHeader(e){return this.requestHeader=e,this}abort(){return this}};Pn.DEFAULT_MATERIAL_NAME="__DEFAULT";var Jn={},dl=class extends Error{constructor(e,t){super(e),this.response=t}},is=class extends Pn{constructor(e){super(e),this.mimeType="",this.responseType="",this._abortController=new AbortController}load(e,t,n,s){e===void 0&&(e=""),this.path!==void 0&&(e=this.path+e),e=this.manager.resolveURL(e);let r=Bn.get(`file:${e}`);if(r!==void 0){this.manager.itemStart(e),setTimeout(()=>{t&&t(r),this.manager.itemEnd(e)},0);return}if(Jn[e]!==void 0){Jn[e].push({onLoad:t,onProgress:n,onError:s});return}Jn[e]=[],Jn[e].push({onLoad:t,onProgress:n,onError:s});let o=new Request(e,{headers:new Headers(this.requestHeader),credentials:this.withCredentials?"include":"same-origin",signal:typeof AbortSignal.any=="function"?AbortSignal.any([this._abortController.signal,this.manager.abortController.signal]):this._abortController.signal}),a=this.mimeType,c=this.responseType;fetch(o).then(l=>{if(l.status===200||l.status===0){if(l.status===0&&Ae("FileLoader: HTTP Status 0 received."),typeof ReadableStream>"u"||l.body===void 0||l.body.getReader===void 0)return l;let h=Jn[e],d=l.body.getReader(),u=l.headers.get("X-File-Size")||l.headers.get("Content-Length"),p=u?parseInt(u):0,g=p!==0,b=0,m=new ReadableStream({start(f){v();function v(){d.read().then(({done:T,value:y})=>{if(T)f.close();else{b+=y.byteLength;let S=new ProgressEvent("progress",{lengthComputable:g,loaded:b,total:p});for(let w=0,R=h.length;w<R;w++){let x=h[w];x.onProgress&&x.onProgress(S)}f.enqueue(y),v()}},T=>{f.error(T)})}}});return new Response(m)}else throw new dl(`fetch for "${l.url}" responded with ${l.status}: ${l.statusText}`,l)}).then(l=>{switch(c){case"arraybuffer":return l.arrayBuffer();case"blob":return l.blob();case"document":return l.text().then(h=>new DOMParser().parseFromString(h,a));case"json":return l.json();default:if(a==="")return l.text();{let d=/charset="?([^;"\s]*)"?/i.exec(a),u=d&&d[1]?d[1].toLowerCase():void 0,p=new TextDecoder(u);return l.arrayBuffer().then(g=>p.decode(g))}}}).then(l=>{Bn.add(`file:${e}`,l);let h=Jn[e];delete Jn[e];for(let d=0,u=h.length;d<u;d++){let p=h[d];p.onLoad&&p.onLoad(l)}}).catch(l=>{let h=Jn[e];if(h===void 0)throw this.manager.itemError(e),l;delete Jn[e];for(let d=0,u=h.length;d<u;d++){let p=h[d];p.onError&&p.onError(l)}this.manager.itemError(e)}).finally(()=>{this.manager.itemEnd(e)}),this.manager.itemStart(e)}setResponseType(e){return this.responseType=e,this}setMimeType(e){return this.mimeType=e,this}abort(){return this._abortController.abort(),this._abortController=new AbortController,this}};var Ls=new WeakMap,Ma=class extends Pn{constructor(e){super(e)}load(e,t,n,s){this.path!==void 0&&(e=this.path+e),e=this.manager.resolveURL(e);let r=this,o=Bn.get(`image:${e}`);if(o!==void 0){if(o.complete===!0)r.manager.itemStart(e),setTimeout(function(){t&&t(o),r.manager.itemEnd(e)},0);else{let d=Ls.get(o);d===void 0&&(d=[],Ls.set(o,d)),d.push({onLoad:t,onError:s})}return o}let a=ks("img");function c(){h(),t&&t(this);let d=Ls.get(this)||[];for(let u=0;u<d.length;u++){let p=d[u];p.onLoad&&p.onLoad(this)}Ls.delete(this),r.manager.itemEnd(e)}function l(d){h(),s&&s(d),Bn.remove(`image:${e}`);let u=Ls.get(this)||[];for(let p=0;p<u.length;p++){let g=u[p];g.onError&&g.onError(d)}Ls.delete(this),r.manager.itemError(e),r.manager.itemEnd(e)}function h(){a.removeEventListener("load",c,!1),a.removeEventListener("error",l,!1)}return a.addEventListener("load",c,!1),a.addEventListener("error",l,!1),e.slice(0,5)!=="data:"&&this.crossOrigin!==void 0&&(a.crossOrigin=this.crossOrigin),Bn.add(`image:${e}`,a),r.manager.itemStart(e),a.src=e,a}};var qr=class extends Pn{constructor(e){super(e)}load(e,t,n,s){let r=new Ft,o=new Ma(this.manager);return o.setCrossOrigin(this.crossOrigin),o.setPath(this.path),o.load(e,function(a){r.image=a,r.needsUpdate=!0,t!==void 0&&t(r)},n,s),r}},ss=class extends ht{constructor(e,t=1){super(),this.isLight=!0,this.type="Light",this.color=new pe(e),this.intensity=t}copy(e,t){return super.copy(e,t),this.color.copy(e.color),this.intensity=e.intensity,this}toJSON(e){let t=super.toJSON(e);return t.object.color=this.color.getHex(),t.object.intensity=this.intensity,t}},rs=class extends ss{constructor(e,t,n){super(e,n),this.isHemisphereLight=!0,this.type="HemisphereLight",this.position.copy(ht.DEFAULT_UP),this.updateMatrix(),this.groundColor=new pe(t)}copy(e,t){return super.copy(e,t),this.groundColor.copy(e.groundColor),this}toJSON(e){let t=super.toJSON(e);return t.object.groundColor=this.groundColor.getHex(),t}},al=new Ue,qh=new N,Yh=new N,$s=class{constructor(e){this.camera=e,this.intensity=1,this.bias=0,this.biasNode=null,this.normalBias=0,this.radius=1,this.blurSamples=8,this.mapSize=new we(512,512),this.mapType=Xt,this.map=null,this.mapPass=null,this.matrix=new Ue,this.autoUpdate=!0,this.needsUpdate=!1,this._frustum=new qs,this._frameExtents=new we(1,1),this._viewportCount=1,this._viewports=[new tt(0,0,1,1)]}getViewportCount(){return this._viewportCount}getCamera(){return this.camera}getFrustum(){return this._frustum}updateMatrices(e){let t=this.camera;qh.setFromMatrixPosition(e.matrixWorld),t.position.copy(qh),Yh.setFromMatrixPosition(e.target.matrixWorld),t.lookAt(Yh),t.updateMatrixWorld(),this._updateMatrix(t,this.matrix,this._frustum)}_updateMatrix(e,t,n,s){al.multiplyMatrices(e.projectionMatrix,e.matrixWorldInverse),n.setFromProjectionMatrix(al,e.coordinateSystem,e.reversedDepth);let r=this._frameExtents,o=s?s.z/r.x:1,a=s?s.w/r.y:1,c=s?s.x/r.x:0,l=s?s.y/r.y:0;e.coordinateSystem===Bs||e.reversedDepth?t.set(.5*o,0,0,.5*o+c,0,.5*a,0,.5*a+l,0,0,1,0,0,0,0,1):t.set(.5*o,0,0,.5*o+c,0,.5*a,0,.5*a+l,0,0,.5,.5,0,0,0,1),t.multiply(al)}getViewport(e){return this._viewports[e]}getFrameExtents(){return this._frameExtents}dispose(){this.map&&this.map.dispose(),this.mapPass&&this.mapPass.dispose()}copy(e){return this.camera=e.camera.clone(),this.intensity=e.intensity,this.bias=e.bias,this.radius=e.radius,this.autoUpdate=e.autoUpdate,this.needsUpdate=e.needsUpdate,this.normalBias=e.normalBias,this.blurSamples=e.blurSamples,this.mapSize.copy(e.mapSize),this.biasNode=e.biasNode,this}clone(){return new this.constructor().copy(this)}toJSON(){let e={};return e.intensity=this.intensity,e.bias=this.bias,e.normalBias=this.normalBias,e.radius=this.radius,e.blurSamples=this.blurSamples,e.mapSize=this.mapSize.toArray(),e.camera=this.camera.toJSON(!1).object,delete e.camera.matrix,e}},Xo=new N,qo=new It,Fn=new N,Yr=class extends ht{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new Ue,this.projectionMatrix=new Ue,this.projectionMatrixInverse=new Ue,this.coordinateSystem=Rn,this._reversedDepth=!1}get reversedDepth(){return this._reversedDepth}copy(e,t){return super.copy(e,t),this.matrixWorldInverse.copy(e.matrixWorldInverse),this.projectionMatrix.copy(e.projectionMatrix),this.projectionMatrixInverse.copy(e.projectionMatrixInverse),this.coordinateSystem=e.coordinateSystem,this}getWorldDirection(e){return super.getWorldDirection(e).negate()}updateMatrixWorld(e){super.updateMatrixWorld(e),this.matrixWorld.decompose(Xo,qo,Fn),Fn.x===1&&Fn.y===1&&Fn.z===1?this.matrixWorldInverse.copy(this.matrixWorld).invert():this.matrixWorldInverse.compose(Xo,qo,Fn.set(1,1,1)).invert()}updateWorldMatrix(e,t,n=!1){super.updateWorldMatrix(e,t,n),this.matrixWorld.decompose(Xo,qo,Fn),Fn.x===1&&Fn.y===1&&Fn.z===1?this.matrixWorldInverse.copy(this.matrixWorld).invert():this.matrixWorldInverse.compose(Xo,qo,Fn.set(1,1,1)).invert()}clone(){return new this.constructor().copy(this)}},bi=new N,Zh=new we,Kh=new we,xt=class extends Yr{constructor(e=50,t=1,n=.1,s=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=e,this.zoom=1,this.near=n,this.far=s,this.focus=10,this.aspect=t,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.fov=e.fov,this.zoom=e.zoom,this.near=e.near,this.far=e.far,this.focus=e.focus,this.aspect=e.aspect,this.view=e.view===null?null:Object.assign({},e.view),this.filmGauge=e.filmGauge,this.filmOffset=e.filmOffset,this}setFocalLength(e){let t=.5*this.getFilmHeight()/e;this.fov=ji*2*Math.atan(t),this.updateProjectionMatrix()}getFocalLength(){let e=Math.tan(Ar*.5*this.fov);return .5*this.getFilmHeight()/e}getEffectiveFOV(){return ji*2*Math.atan(Math.tan(Ar*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(e,t,n){bi.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),t.set(bi.x,bi.y).multiplyScalar(-e/bi.z),bi.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),n.set(bi.x,bi.y).multiplyScalar(-e/bi.z)}getViewSize(e,t){return this.getViewBounds(e,Zh,Kh),t.subVectors(Kh,Zh)}setViewOffset(e,t,n,s,r,o){this.aspect=e/t,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=n,this.view.offsetY=s,this.view.width=r,this.view.height=o,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){let e=this.near,t=e*Math.tan(Ar*.5*this.fov)/this.zoom,n=2*t,s=this.aspect*n,r=-.5*s,o=this.view;if(this.view!==null&&this.view.enabled){let c=o.fullWidth,l=o.fullHeight;r+=o.offsetX*s/c,t-=o.offsetY*n/l,s*=o.width/c,n*=o.height/l}let a=this.filmOffset;a!==0&&(r+=e*a/this.getFilmWidth()),this.projectionMatrix.makePerspective(r,r+s,t,t-n,e,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){let t=super.toJSON(e);return t.object.fov=this.fov,t.object.zoom=this.zoom,t.object.near=this.near,t.object.far=this.far,t.object.focus=this.focus,t.object.aspect=this.aspect,this.view!==null&&(t.object.view=Object.assign({},this.view)),t.object.filmGauge=this.filmGauge,t.object.filmOffset=this.filmOffset,t}},fl=class extends $s{constructor(){super(new xt(50,1,.5,500)),this.isSpotLightShadow=!0,this.focus=1,this.aspect=1}updateMatrices(e){let t=this.camera,n=ji*2*e.angle*this.focus,s=this.mapSize.width/this.mapSize.height*this.aspect,r=e.distance||t.far;(n!==t.fov||s!==t.aspect||r!==t.far)&&(t.fov=n,t.aspect=s,t.far=r,t.updateProjectionMatrix()),super.updateMatrices(e)}copy(e){return super.copy(e),this.focus=e.focus,this.aspect=e.aspect,this}toJSON(){let e=super.toJSON();return e.focus=this.focus,e.aspect=this.aspect,e}},Zr=class extends ss{constructor(e,t,n=0,s=Math.PI/3,r=0,o=2){super(e,t),this.isSpotLight=!0,this.type="SpotLight",this.position.copy(ht.DEFAULT_UP),this.updateMatrix(),this.target=new ht,this.distance=n,this.angle=s,this.penumbra=r,this.decay=o,this.map=null,this.shadow=new fl}get power(){return this.intensity*Math.PI}set power(e){this.intensity=e/Math.PI}dispose(){super.dispose(),this.shadow.dispose()}copy(e,t){return super.copy(e,t),this.distance=e.distance,this.angle=e.angle,this.penumbra=e.penumbra,this.decay=e.decay,this.target=e.target.clone(),this.map=e.map,this.shadow=e.shadow.clone(),this}toJSON(e){let t=super.toJSON(e);return t.object.distance=this.distance,t.object.angle=this.angle,t.object.decay=this.decay,t.object.penumbra=this.penumbra,t.object.target=this.target.uuid,this.map&&this.map.isTexture&&(t.object.map=this.map.toJSON(e).uuid),t.object.shadow=this.shadow.toJSON(),t}},pl=class extends $s{constructor(){super(new xt(90,1,.5,500)),this.isPointLightShadow=!0}},os=class extends ss{constructor(e,t,n=0,s=2){super(e,t),this.isPointLight=!0,this.type="PointLight",this.distance=n,this.decay=s,this.shadow=new pl}get power(){return this.intensity*4*Math.PI}set power(e){this.intensity=e/(4*Math.PI)}dispose(){super.dispose(),this.shadow.dispose()}copy(e,t){return super.copy(e,t),this.distance=e.distance,this.decay=e.decay,this.shadow=e.shadow.clone(),this}toJSON(e){let t=super.toJSON(e);return t.object.distance=this.distance,t.object.decay=this.decay,t.object.shadow=this.shadow.toJSON(),t}},Li=class extends Yr{constructor(e=-1,t=1,n=1,s=-1,r=.1,o=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=e,this.right=t,this.top=n,this.bottom=s,this.near=r,this.far=o,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.left=e.left,this.right=e.right,this.top=e.top,this.bottom=e.bottom,this.near=e.near,this.far=e.far,this.zoom=e.zoom,this.view=e.view===null?null:Object.assign({},e.view),this}setViewOffset(e,t,n,s,r,o){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=n,this.view.offsetY=s,this.view.width=r,this.view.height=o,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){let e=(this.right-this.left)/(2*this.zoom),t=(this.top-this.bottom)/(2*this.zoom),n=(this.right+this.left)/2,s=(this.top+this.bottom)/2,r=n-e,o=n+e,a=s+t,c=s-t;if(this.view!==null&&this.view.enabled){let l=(this.right-this.left)/this.view.fullWidth/this.zoom,h=(this.top-this.bottom)/this.view.fullHeight/this.zoom;r+=l*this.view.offsetX,o=r+l*this.view.width,a-=h*this.view.offsetY,c=a-h*this.view.height}this.projectionMatrix.makeOrthographic(r,o,a,c,this.near,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){let t=super.toJSON(e);return t.object.zoom=this.zoom,t.object.left=this.left,t.object.right=this.right,t.object.top=this.top,t.object.bottom=this.bottom,t.object.near=this.near,t.object.far=this.far,this.view!==null&&(t.object.view=Object.assign({},this.view)),t}},ml=class extends $s{constructor(){super(new Li(-5,5,5,-5,.5,500)),this.isDirectionalLightShadow=!0}},ci=class extends ss{constructor(e,t){super(e,t),this.isDirectionalLight=!0,this.type="DirectionalLight",this.position.copy(ht.DEFAULT_UP),this.updateMatrix(),this.target=new ht,this.shadow=new ml}dispose(){super.dispose(),this.shadow.dispose()}copy(e){return super.copy(e),this.target=e.target.clone(),this.shadow=e.shadow.clone(),this}toJSON(e){let t=super.toJSON(e);return t.object.shadow=this.shadow.toJSON(),t.object.target=this.target.uuid,t}};var $h={},Kr=class i extends Pn{constructor(e){super(e),this.textures={}}load(e,t,n,s){let r=this,o=new is(r.manager);o.setPath(r.path),o.setRequestHeader(r.requestHeader),o.setWithCredentials(r.withCredentials),o.load(e,function(a){try{t(r.parse(JSON.parse(a)))}catch(c){s?s(c):Pe(c),r.manager.itemError(e)}},n,s)}parse(e){let t=this.createMaterialFromType(e.type);return t.fromJSON(e,this.textures),t}setTextures(e){return this.textures=e,this}createMaterialFromType(e){return i.createMaterialFromType(e)}static createMaterialFromType(e){let n={ShadowMaterial:Zs,SpriteMaterial:oa,RawShaderMaterial:Vr,ShaderMaterial:sn,PointsMaterial:es,MeshPhysicalMaterial:Jt,MeshStandardMaterial:kt,MeshPhongMaterial:ua,MeshToonMaterial:da,MeshNormalMaterial:fa,MeshLambertMaterial:Ks,MeshDepthMaterial:ts,MeshDistanceMaterial:Gr,MeshBasicMaterial:yn,MeshMatcapMaterial:pa,LineDashedMaterial:ma,LineBasicMaterial:Ri,Material:_t,...$h}[e],s;return n===void 0?(Ti(`MaterialLoader: Unknown material type "${e}". Use .registerMaterial() before starting the deserialization process.`),s=new _t):s=new n,s}static registerMaterial(e,t){$h[e]=t}},li=class{static extractUrlBase(e){let t=e.lastIndexOf("/");return t===-1?"./":e.slice(0,t+1)}static resolveURL(e,t){return typeof e!="string"||e===""?"":(/^https?:\/\//i.test(t)&&/^\//.test(e)&&(t=t.replace(/(^https?:\/\/[^\/]+).*/i,"$1")),/^(https?:)?\/\//i.test(e)||/^data:.*,.*$/i.test(e)||/^blob:.*$/i.test(e)?e:t+e)}};var cl=new WeakMap,$r=class extends Pn{constructor(e){super(e),this.isImageBitmapLoader=!0,typeof createImageBitmap>"u"&&Ae("ImageBitmapLoader: createImageBitmap() not supported."),typeof fetch>"u"&&Ae("ImageBitmapLoader: fetch() not supported."),this.options={premultiplyAlpha:"none"},this._abortController=new AbortController}setOptions(e){return this.options=e,this}load(e,t,n,s){e===void 0&&(e=""),this.path!==void 0&&(e=this.path+e),e=this.manager.resolveURL(e);let r=this,o=Bn.get(`image-bitmap:${e}`);if(o!==void 0){if(r.manager.itemStart(e),o.then){o.then(l=>{cl.has(o)===!0?(s&&s(cl.get(o)),r.manager.itemError(e),r.manager.itemEnd(e)):(t&&t(l),r.manager.itemEnd(e))});return}setTimeout(function(){t&&t(o),r.manager.itemEnd(e)},0);return}let a={};a.credentials=this.crossOrigin==="anonymous"?"same-origin":"include",a.headers=this.requestHeader,a.signal=typeof AbortSignal.any=="function"?AbortSignal.any([this._abortController.signal,this.manager.abortController.signal]):this._abortController.signal;let c=fetch(e,a).then(function(l){return l.blob()}).then(function(l){return createImageBitmap(l,Object.assign({},r.options,{colorSpaceConversion:"none"}))}).then(function(l){return Bn.add(`image-bitmap:${e}`,l),t&&t(l),r.manager.itemEnd(e),l}).catch(function(l){s&&s(l),cl.set(c,l),Bn.remove(`image-bitmap:${e}`),r.manager.itemError(e),r.manager.itemEnd(e)});Bn.add(`image-bitmap:${e}`,c),r.manager.itemStart(e)}abort(){return this._abortController.abort(),this._abortController=new AbortController,this}};var Ds=-90,Ns=1,ba=class extends ht{constructor(e,t,n){super(),this.type="CubeCamera",this.renderTarget=n,this.coordinateSystem=null,this.activeMipmapLevel=0;let s=new xt(Ds,Ns,e,t);s.layers=this.layers,this.add(s);let r=new xt(Ds,Ns,e,t);r.layers=this.layers,this.add(r);let o=new xt(Ds,Ns,e,t);o.layers=this.layers,this.add(o);let a=new xt(Ds,Ns,e,t);a.layers=this.layers,this.add(a);let c=new xt(Ds,Ns,e,t);c.layers=this.layers,this.add(c);let l=new xt(Ds,Ns,e,t);l.layers=this.layers,this.add(l)}updateCoordinateSystem(){let e=this.coordinateSystem,t=this.children.concat(),[n,s,r,o,a,c]=t;for(let l of t)this.remove(l);if(e===Rn)n.up.set(0,1,0),n.lookAt(1,0,0),s.up.set(0,1,0),s.lookAt(-1,0,0),r.up.set(0,0,-1),r.lookAt(0,1,0),o.up.set(0,0,1),o.lookAt(0,-1,0),a.up.set(0,1,0),a.lookAt(0,0,1),c.up.set(0,1,0),c.lookAt(0,0,-1);else if(e===Bs)n.up.set(0,-1,0),n.lookAt(-1,0,0),s.up.set(0,-1,0),s.lookAt(1,0,0),r.up.set(0,0,1),r.lookAt(0,1,0),o.up.set(0,0,-1),o.lookAt(0,-1,0),a.up.set(0,-1,0),a.lookAt(0,0,1),c.up.set(0,-1,0),c.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+e);for(let l of t)this.add(l),l.updateMatrixWorld()}update(e,t){this.parent===null&&this.updateMatrixWorld();let{renderTarget:n,activeMipmapLevel:s}=this;this.coordinateSystem!==e.coordinateSystem&&(this.coordinateSystem=e.coordinateSystem,this.updateCoordinateSystem());let[r,o,a,c,l,h]=this.children,d=e.getRenderTarget(),u=e.getActiveCubeFace(),p=e.getActiveMipmapLevel(),g=e.xr.enabled;e.xr.enabled=!1;let b=n.texture.generateMipmaps;n.texture.generateMipmaps=!1;let m=!1;e.isWebGLRenderer===!0?m=e.state.buffers.depth.getReversed():m=e.reversedDepthBuffer,e.setRenderTarget(n,0,s),m&&e.autoClear===!1&&e.clearDepth(),e.render(t,r),e.setRenderTarget(n,1,s),m&&e.autoClear===!1&&e.clearDepth(),e.render(t,o),e.setRenderTarget(n,2,s),m&&e.autoClear===!1&&e.clearDepth(),e.render(t,a),e.setRenderTarget(n,3,s),m&&e.autoClear===!1&&e.clearDepth(),e.render(t,c),e.setRenderTarget(n,4,s),m&&e.autoClear===!1&&e.clearDepth(),e.render(t,l),n.texture.generateMipmaps=b,e.setRenderTarget(n,5,s),m&&e.autoClear===!1&&e.clearDepth(),e.render(t,h),e.setRenderTarget(d,u,p),e.xr.enabled=g,n.texture.needsPMREMUpdate=!0}},Sa=class extends xt{constructor(e=[]){super(),this.isArrayCamera=!0,this.isMultiViewCamera=!1,this.cameras=e}};var wa=class{constructor(e,t,n){this.binding=e,this.valueSize=n;let s,r,o;switch(t){case"quaternion":s=this._slerp,r=this._slerpAdditive,o=this._setAdditiveIdentityQuaternion,this.buffer=new Float64Array(n*6),this._workIndex=5;break;case"string":case"bool":s=this._select,r=this._select,o=this._setAdditiveIdentityOther,this.buffer=new Array(n*5);break;default:s=this._lerp,r=this._lerpAdditive,o=this._setAdditiveIdentityNumeric,this.buffer=new Float64Array(n*5)}this._mixBufferRegion=s,this._mixBufferRegionAdditive=r,this._setIdentity=o,this._origIndex=3,this._addIndex=4,this.cumulativeWeight=0,this.cumulativeWeightAdditive=0,this.useCount=0,this.referenceCount=0}accumulate(e,t){let n=this.buffer,s=this.valueSize,r=e*s+s,o=this.cumulativeWeight;if(o===0){for(let a=0;a!==s;++a)n[r+a]=n[a];o=t}else{o+=t;let a=t/o;this._mixBufferRegion(n,r,0,a,s)}this.cumulativeWeight=o}accumulateAdditive(e){let t=this.buffer,n=this.valueSize,s=n*this._addIndex;this.cumulativeWeightAdditive===0&&this._setIdentity(),this._mixBufferRegionAdditive(t,s,0,e,n),this.cumulativeWeightAdditive+=e}apply(e){let t=this.valueSize,n=this.buffer,s=e*t+t,r=this.cumulativeWeight,o=this.cumulativeWeightAdditive,a=this.binding;if(this.cumulativeWeight=0,this.cumulativeWeightAdditive=0,r<1){let c=t*this._origIndex;this._mixBufferRegion(n,s,c,1-r,t)}o>0&&this._mixBufferRegionAdditive(n,s,this._addIndex*t,1,t);for(let c=t,l=t+t;c!==l;++c)if(n[c]!==n[c+t]){a.setValue(n,s);break}}saveOriginalState(){let e=this.binding,t=this.buffer,n=this.valueSize,s=n*this._origIndex;e.getValue(t,s);for(let r=n,o=s;r!==o;++r)t[r]=t[s+r%n];this._setIdentity(),this.cumulativeWeight=0,this.cumulativeWeightAdditive=0}restoreOriginalState(){let e=this.valueSize*3;this.binding.setValue(this.buffer,e)}_setAdditiveIdentityNumeric(){let e=this._addIndex*this.valueSize,t=e+this.valueSize;for(let n=e;n<t;n++)this.buffer[n]=0}_setAdditiveIdentityQuaternion(){this._setAdditiveIdentityNumeric(),this.buffer[this._addIndex*this.valueSize+3]=1}_setAdditiveIdentityOther(){let e=this._origIndex*this.valueSize,t=this._addIndex*this.valueSize;for(let n=0;n<this.valueSize;n++)this.buffer[t+n]=this.buffer[e+n]}_select(e,t,n,s,r){if(s>=.5)for(let o=0;o!==r;++o)e[t+o]=e[n+o]}_slerp(e,t,n,s){It.slerpFlat(e,t,e,t,e,n,s)}_slerpAdditive(e,t,n,s,r){let o=this._workIndex*r;It.multiplyQuaternionsFlat(e,o,e,t,e,n),It.slerpFlat(e,t,e,t,e,o,s)}_lerp(e,t,n,s,r){let o=1-s;for(let a=0;a!==r;++a){let c=t+a;e[c]=e[c]*o+e[n+a]*s}}_lerpAdditive(e,t,n,s,r){for(let o=0;o!==r;++o){let a=t+o;e[a]=e[a]+e[n+o]*s}}},Gl="\\[\\]\\.:\\/",i1=new RegExp("["+Gl+"]","g"),Wl="[^"+Gl+"]",s1="[^"+Gl.replace("\\.","")+"]",r1=/((?:WC+[\/:])*)/.source.replace("WC",Wl),o1=/(WCOD+)?/.source.replace("WCOD",s1),a1=/(?:\.(WC+)(?:\[(.+)\])?)?/.source.replace("WC",Wl),c1=/\.(WC+)(?:\[(.+)\])?/.source.replace("WC",Wl),l1=new RegExp("^"+r1+o1+a1+c1+"$"),h1=["material","materials","bones","map"],gl=class{constructor(e,t,n){let s=n||st.parseTrackName(t);this._targetGroup=e,this._bindings=e.subscribe_(t,s)}getValue(e,t){this.bind();let n=this._targetGroup.nCachedObjects_,s=this._bindings[n];s!==void 0&&s.getValue(e,t)}setValue(e,t){let n=this._bindings;for(let s=this._targetGroup.nCachedObjects_,r=n.length;s!==r;++s)n[s].setValue(e,t)}bind(){let e=this._bindings;for(let t=this._targetGroup.nCachedObjects_,n=e.length;t!==n;++t)e[t].bind()}unbind(){let e=this._bindings;for(let t=this._targetGroup.nCachedObjects_,n=e.length;t!==n;++t)e[t].unbind()}},st=class i{constructor(e,t,n){this.path=t,this.parsedPath=n||i.parseTrackName(t),this.node=i.findNode(e,this.parsedPath.nodeName),this.rootNode=e,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}static create(e,t,n){return e&&e.isAnimationObjectGroup?new i.Composite(e,t,n):new i(e,t,n)}static sanitizeNodeName(e){return e.replace(/\s/g,"_").replace(i1,"")}static parseTrackName(e){let t=l1.exec(e);if(t===null)throw new Error("THREE.PropertyBinding: Cannot parse trackName: "+e);let n={nodeName:t[2],objectName:t[3],objectIndex:t[4],propertyName:t[5],propertyIndex:t[6]},s=n.nodeName&&n.nodeName.lastIndexOf(".");if(s!==void 0&&s!==-1){let r=n.nodeName.substring(s+1);h1.indexOf(r)!==-1&&(n.nodeName=n.nodeName.substring(0,s),n.objectName=r)}if(n.propertyName===null||n.propertyName.length===0)throw new Error("THREE.PropertyBinding: can not parse propertyName from trackName: "+e);return n}static findNode(e,t){if(t===void 0||t===""||t==="."||t===-1||t===e.name||t===e.uuid)return e;if(e.skeleton){let n=e.skeleton.getBoneByName(t);if(n!==void 0)return n}if(e.children){let n=function(r){for(let o=0;o<r.length;o++){let a=r[o];if(a.name===t||a.uuid===t)return a;let c=n(a.children);if(c)return c}return null},s=n(e.children);if(s)return s}return null}_getValue_unavailable(){}_setValue_unavailable(){}_getValue_direct(e,t){e[t]=this.targetObject[this.propertyName]}_getValue_array(e,t){let n=this.resolvedProperty;for(let s=0,r=n.length;s!==r;++s)e[t++]=n[s]}_getValue_arrayElement(e,t){e[t]=this.resolvedProperty[this.propertyIndex]}_getValue_toArray(e,t){this.resolvedProperty.toArray(e,t)}_setValue_direct(e,t){this.targetObject[this.propertyName]=e[t]}_setValue_direct_setNeedsUpdate(e,t){this.targetObject[this.propertyName]=e[t],this.targetObject.needsUpdate=!0}_setValue_direct_setMatrixWorldNeedsUpdate(e,t){this.targetObject[this.propertyName]=e[t],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_array(e,t){let n=this.resolvedProperty;for(let s=0,r=n.length;s!==r;++s)n[s]=e[t++]}_setValue_array_setNeedsUpdate(e,t){let n=this.resolvedProperty;for(let s=0,r=n.length;s!==r;++s)n[s]=e[t++];this.targetObject.needsUpdate=!0}_setValue_array_setMatrixWorldNeedsUpdate(e,t){let n=this.resolvedProperty;for(let s=0,r=n.length;s!==r;++s)n[s]=e[t++];this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_arrayElement(e,t){this.resolvedProperty[this.propertyIndex]=e[t]}_setValue_arrayElement_setNeedsUpdate(e,t){this.resolvedProperty[this.propertyIndex]=e[t],this.targetObject.needsUpdate=!0}_setValue_arrayElement_setMatrixWorldNeedsUpdate(e,t){this.resolvedProperty[this.propertyIndex]=e[t],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_fromArray(e,t){this.resolvedProperty.fromArray(e,t)}_setValue_fromArray_setNeedsUpdate(e,t){this.resolvedProperty.fromArray(e,t),this.targetObject.needsUpdate=!0}_setValue_fromArray_setMatrixWorldNeedsUpdate(e,t){this.resolvedProperty.fromArray(e,t),this.targetObject.matrixWorldNeedsUpdate=!0}_getValue_unbound(e,t){this.bind(),this.getValue(e,t)}_setValue_unbound(e,t){this.bind(),this.setValue(e,t)}bind(){let e=this.node,t=this.parsedPath,n=t.objectName,s=t.propertyName,r=t.propertyIndex;if(e||(e=i.findNode(this.rootNode,t.nodeName),this.node=e),this.getValue=this._getValue_unavailable,this.setValue=this._setValue_unavailable,!e){Ae("PropertyBinding: No target node found for track: "+this.path+".");return}if(n){let l=t.objectIndex;switch(n){case"materials":if(!e.material){Pe("PropertyBinding: Can not bind to material as node does not have a material.",this);return}if(!e.material.materials){Pe("PropertyBinding: Can not bind to material.materials as node.material does not have a materials array.",this);return}e=e.material.materials;break;case"bones":if(!e.skeleton){Pe("PropertyBinding: Can not bind to bones as node does not have a skeleton.",this);return}e=e.skeleton.bones;for(let h=0;h<e.length;h++)if(e[h].name===l){l=h;break}break;case"map":if("map"in e){e=e.map;break}if(!e.material){Pe("PropertyBinding: Can not bind to material as node does not have a material.",this);return}if(!e.material.map){Pe("PropertyBinding: Can not bind to material.map as node.material does not have a map.",this);return}e=e.material.map;break;default:if(e[n]===void 0){Pe("PropertyBinding: Can not bind to objectName of node undefined.",this);return}e=e[n]}if(l!==void 0){if(e[l]===void 0){Pe("PropertyBinding: Trying to bind to objectIndex of objectName, but is undefined.",this,e);return}e=e[l]}}let o=e[s];if(o===void 0){let l=t.nodeName;Pe("PropertyBinding: Trying to update property for track: "+l+"."+s+" but it wasn't found.",e);return}let a=this.Versioning.None;this.targetObject=e,e.isMaterial===!0?a=this.Versioning.NeedsUpdate:e.isObject3D===!0&&(a=this.Versioning.MatrixWorldNeedsUpdate);let c=this.BindingType.Direct;if(r!==void 0){if(s==="morphTargetInfluences"){if(!e.geometry){Pe("PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.",this);return}if(!e.geometry.morphAttributes){Pe("PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.morphAttributes.",this);return}e.morphTargetDictionary[r]!==void 0&&(r=e.morphTargetDictionary[r])}c=this.BindingType.ArrayElement,this.resolvedProperty=o,this.propertyIndex=r}else o.fromArray!==void 0&&o.toArray!==void 0?(c=this.BindingType.HasFromToArray,this.resolvedProperty=o):Array.isArray(o)?(c=this.BindingType.EntireArray,this.resolvedProperty=o):this.propertyName=s;this.getValue=this.GetterByBindingType[c],this.setValue=this.SetterByBindingTypeAndVersioning[c][a]}unbind(){this.node=null,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}};st.Composite=gl;st.prototype.BindingType={Direct:0,EntireArray:1,ArrayElement:2,HasFromToArray:3};st.prototype.Versioning={None:0,NeedsUpdate:1,MatrixWorldNeedsUpdate:2};st.prototype.GetterByBindingType=[st.prototype._getValue_direct,st.prototype._getValue_array,st.prototype._getValue_arrayElement,st.prototype._getValue_toArray];st.prototype.SetterByBindingTypeAndVersioning=[[st.prototype._setValue_direct,st.prototype._setValue_direct_setNeedsUpdate,st.prototype._setValue_direct_setMatrixWorldNeedsUpdate],[st.prototype._setValue_array,st.prototype._setValue_array_setNeedsUpdate,st.prototype._setValue_array_setMatrixWorldNeedsUpdate],[st.prototype._setValue_arrayElement,st.prototype._setValue_arrayElement_setNeedsUpdate,st.prototype._setValue_arrayElement_setMatrixWorldNeedsUpdate],[st.prototype._setValue_fromArray,st.prototype._setValue_fromArray_setNeedsUpdate,st.prototype._setValue_fromArray_setMatrixWorldNeedsUpdate]];var Ta=class{constructor(e,t,n=null,s=t.blendMode){this._mixer=e,this._clip=t,this._localRoot=n,this.blendMode=s;let r=t.tracks,o=r.length,a=new Array(o),c={endingStart:Yi,endingEnd:Yi};for(let l=0;l!==o;++l){let h=r[l].createInterpolant(null);a[l]=h,h.settings=c}this._interpolantSettings=c,this._interpolants=a,this._propertyBindings=new Array(o),this._cacheIndex=null,this._byClipCacheIndex=null,this._timeScaleInterpolant=null,this._restoreTimeScale=null,this._weightInterpolant=null,this.loop=bu,this._loopCount=-1,this._startTime=null,this.time=0,this.timeScale=1,this._effectiveTimeScale=1,this.weight=1,this._effectiveWeight=1,this.repetitions=1/0,this.paused=!1,this.enabled=!0,this.clampWhenFinished=!1,this.zeroSlopeAtStart=!0,this.zeroSlopeAtEnd=!0}play(){return this._mixer._activateAction(this),this}stop(){return this._mixer._deactivateAction(this),this.reset()}reset(){return this.paused=!1,this.enabled=!0,this.time=0,this._loopCount=-1,this._startTime=null,this.stopFading().stopWarping()}isRunning(){return this.enabled&&!this.paused&&this.timeScale!==0&&this._startTime===null&&this._mixer._isActiveAction(this)}isScheduled(){return this._mixer._isActiveAction(this)}startAt(e){return this._startTime=e,this}setLoop(e,t){return this.loop=e,this.repetitions=t,this}setEffectiveWeight(e){return this.weight=e,this._effectiveWeight=this.enabled?e:0,this.stopFading()}getEffectiveWeight(){return this._effectiveWeight}fadeIn(e){return this._scheduleFading(e,0,1)}fadeOut(e){return this._scheduleFading(e,1,0)}crossFadeFrom(e,t,n=!1){if(e.fadeOut(t),this.fadeIn(t),n===!0){let s=this._clip.duration,r=e._clip.duration,o=r/s,a=s/r;e._restoreTimeScale=e.timeScale,this._restoreTimeScale=this.timeScale,e.warp(1,o,t),this.warp(a,1,t)}return this}crossFadeTo(e,t,n=!1){return e.crossFadeFrom(this,t,n)}stopFading(){let e=this._weightInterpolant;return e!==null&&(this._weightInterpolant=null,this._mixer._takeBackControlInterpolant(e)),this}setEffectiveTimeScale(e){return this.timeScale=e,this._effectiveTimeScale=this.paused?0:e,this.stopWarping()}getEffectiveTimeScale(){return this._effectiveTimeScale}setDuration(e){return this.timeScale=this._clip.duration/e,this.stopWarping()}syncWith(e){return this.time=e.time,this.timeScale=e.timeScale,this.stopWarping()}halt(e){return this.warp(this._effectiveTimeScale,0,e)}warp(e,t,n){let s=this._mixer,r=s.time,o=this.timeScale,a=this._timeScaleInterpolant;a===null&&(a=s._lendControlInterpolant(),this._timeScaleInterpolant=a);let c=a.parameterPositions,l=a.sampleValues;return c[0]=r,c[1]=r+n,l[0]=e/o,l[1]=t/o,this}stopWarping(){let e=this._timeScaleInterpolant;return e!==null&&(this._timeScaleInterpolant=null,this._mixer._takeBackControlInterpolant(e)),this._restoreTimeScale=null,this}getMixer(){return this._mixer}getClip(){return this._clip}getRoot(){return this._localRoot||this._mixer._root}_update(e,t,n,s){if(!this.enabled){this._updateWeight(e);return}let r=this._startTime;if(r!==null){let c=(e-r)*n;c<0||n===0?t=0:(this._startTime=null,t=n*c)}t*=this._updateTimeScale(e);let o=this._updateTime(t),a=this._updateWeight(e);if(a>0){let c=this._interpolants,l=this._propertyBindings;switch(this.blendMode){case wu:for(let h=0,d=c.length;h!==d;++h)c[h].evaluate(o),l[h].accumulateAdditive(a);break;case uc:default:for(let h=0,d=c.length;h!==d;++h)c[h].evaluate(o),l[h].accumulate(s,a)}}}_updateWeight(e){let t=0;if(this.enabled){t=this.weight;let n=this._weightInterpolant;if(n!==null){let s=n.evaluate(e)[0];t*=s,e>n.parameterPositions[1]&&(this.stopFading(),s===0&&(this.enabled=!1))}}return this._effectiveWeight=t,t}_updateTimeScale(e){let t=0;if(!this.paused){t=this.timeScale;let n=this._timeScaleInterpolant;if(n!==null){let s=n.evaluate(e)[0];t*=s,e>n.parameterPositions[1]&&(t===0?this.paused=!0:(this._restoreTimeScale!==null&&(t=this._restoreTimeScale),this.timeScale=t),this.stopWarping())}}return this._effectiveTimeScale=t,t}_updateTime(e){let t=this._clip.duration,n=this.loop,s=this.time+e,r=this._loopCount,o=n===Su;if(e===0)return r===-1?s:o&&(r&1)===1?t-s:s;if(n===Mu){r===-1&&(this._loopCount=0,this._setEndings(!0,!0,!1));e:{if(s>=t)s=t;else if(s<0)s=0;else{this.time=s;break e}this.clampWhenFinished?this.paused=!0:this.enabled=!1,this.time=s,this._mixer.dispatchEvent({type:"finished",action:this,direction:e<0?-1:1})}}else{if(r===-1&&(e>=0?(r=0,this._setEndings(!0,this.repetitions===0,o)):this._setEndings(this.repetitions===0,!0,o)),s>=t||s<0){let a=Math.floor(s/t);s-=t*a,r+=Math.abs(a);let c=this.repetitions-r;if(c<=0)this.clampWhenFinished?this.paused=!0:this.enabled=!1,s=e>0?t:0,this.time=s,this._mixer.dispatchEvent({type:"finished",action:this,direction:e>0?1:-1});else{if(c===1){let l=e<0;this._setEndings(l,!l,o)}else this._setEndings(!1,!1,o);this._loopCount=r,this.time=s,this._mixer.dispatchEvent({type:"loop",action:this,loopDelta:a})}}else this._loopCount=r,this.time=s;if(o&&(r&1)===1)return t-s}return s}_setEndings(e,t,n){let s=this._interpolantSettings;n?(s.endingStart=Zi,s.endingEnd=Zi):(e?s.endingStart=this.zeroSlopeAtStart?Zi:Yi:s.endingStart=Rr,t?s.endingEnd=this.zeroSlopeAtEnd?Zi:Yi:s.endingEnd=Rr)}_scheduleFading(e,t,n){let s=this._mixer,r=s.time,o=this._weightInterpolant;o===null&&(o=s._lendControlInterpolant(),this._weightInterpolant=o);let a=o.parameterPositions,c=o.sampleValues;return a[0]=r,c[0]=t,a[1]=r+e,c[1]=n,this}},u1=new Float32Array(1),jr=class extends xn{constructor(e){super(),this._root=e,this._initMemoryManager(),this._accuIndex=0,this.time=0,this.timeScale=1,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}_bindAction(e,t){let n=e._localRoot||this._root,s=e._clip.tracks,r=s.length,o=e._propertyBindings,a=e._interpolants,c=n.uuid,l=this._bindingsByRootAndName,h=l[c];h===void 0&&(h={},l[c]=h);for(let d=0;d!==r;++d){let u=s[d],p=u.name,g=h[p];if(g!==void 0)++g.referenceCount,o[d]=g;else{if(g=o[d],g!==void 0){g._cacheIndex===null&&(++g.referenceCount,this._addInactiveBinding(g,c,p));continue}let b=t&&t._propertyBindings[d].binding.parsedPath;g=new wa(st.create(n,p,b),u.ValueTypeName,u.getValueSize()),++g.referenceCount,this._addInactiveBinding(g,c,p),o[d]=g}a[d].resultBuffer=g.buffer}}_activateAction(e){if(!this._isActiveAction(e)){if(e._cacheIndex===null){let n=(e._localRoot||this._root).uuid,s=e._clip.uuid,r=this._actionsByClip[s];this._bindAction(e,r&&r.knownActions[0]),this._addInactiveAction(e,s,n)}let t=e._propertyBindings;for(let n=0,s=t.length;n!==s;++n){let r=t[n];r.useCount++===0&&(this._lendBinding(r),r.saveOriginalState())}this._lendAction(e)}}_deactivateAction(e){if(this._isActiveAction(e)){let t=e._propertyBindings;for(let n=0,s=t.length;n!==s;++n){let r=t[n];--r.useCount===0&&(r.restoreOriginalState(),this._takeBackBinding(r))}this._takeBackAction(e)}}_initMemoryManager(){this._actions=[],this._nActiveActions=0,this._actionsByClip={},this._bindings=[],this._nActiveBindings=0,this._bindingsByRootAndName={},this._controlInterpolants=[],this._nActiveControlInterpolants=0;let e=this;this.stats={actions:{get total(){return e._actions.length},get inUse(){return e._nActiveActions}},bindings:{get total(){return e._bindings.length},get inUse(){return e._nActiveBindings}},controlInterpolants:{get total(){return e._controlInterpolants.length},get inUse(){return e._nActiveControlInterpolants}}}}_isActiveAction(e){let t=e._cacheIndex;return t!==null&&t<this._nActiveActions}_addInactiveAction(e,t,n){let s=this._actions,r=this._actionsByClip,o=r[t];if(o===void 0)o={knownActions:[e],actionByRoot:{}},e._byClipCacheIndex=0,r[t]=o;else{let a=o.knownActions;e._byClipCacheIndex=a.length,a.push(e)}e._cacheIndex=s.length,s.push(e),o.actionByRoot[n]=e}_removeInactiveAction(e){let t=this._actions,n=t[t.length-1],s=e._cacheIndex;n._cacheIndex=s,t[s]=n,t.pop(),e._cacheIndex=null;let r=e._clip.uuid,o=this._actionsByClip,a=o[r],c=a.knownActions,l=c[c.length-1],h=e._byClipCacheIndex;l._byClipCacheIndex=h,c[h]=l,c.pop(),e._byClipCacheIndex=null;let d=a.actionByRoot,u=(e._localRoot||this._root).uuid;delete d[u],c.length===0&&delete o[r],this._removeInactiveBindingsForAction(e)}_removeInactiveBindingsForAction(e){let t=e._propertyBindings;for(let n=0,s=t.length;n!==s;++n){let r=t[n];--r.referenceCount===0&&this._removeInactiveBinding(r)}}_lendAction(e){let t=this._actions,n=e._cacheIndex,s=this._nActiveActions++,r=t[s];e._cacheIndex=s,t[s]=e,r._cacheIndex=n,t[n]=r}_takeBackAction(e){let t=this._actions,n=e._cacheIndex,s=--this._nActiveActions,r=t[s];e._cacheIndex=s,t[s]=e,r._cacheIndex=n,t[n]=r}_addInactiveBinding(e,t,n){let s=this._bindingsByRootAndName,r=this._bindings,o=s[t];o===void 0&&(o={},s[t]=o),o[n]=e,e._cacheIndex=r.length,r.push(e)}_removeInactiveBinding(e){let t=this._bindings,n=e.binding,s=n.rootNode.uuid,r=n.path,o=this._bindingsByRootAndName,a=o[s],c=t[t.length-1],l=e._cacheIndex;c._cacheIndex=l,t[l]=c,t.pop(),delete a[r],Object.keys(a).length===0&&delete o[s]}_lendBinding(e){let t=this._bindings,n=e._cacheIndex,s=this._nActiveBindings++,r=t[s];e._cacheIndex=s,t[s]=e,r._cacheIndex=n,t[n]=r}_takeBackBinding(e){let t=this._bindings,n=e._cacheIndex,s=--this._nActiveBindings,r=t[s];e._cacheIndex=s,t[s]=e,r._cacheIndex=n,t[n]=r}_lendControlInterpolant(){let e=this._controlInterpolants,t=this._nActiveControlInterpolants++,n=e[t];return n===void 0&&(n=new Wr(new Float32Array(2),new Float32Array(2),1,u1),n.__cacheIndex=t,e[t]=n),n}_takeBackControlInterpolant(e){let t=this._controlInterpolants,n=e.__cacheIndex,s=--this._nActiveControlInterpolants,r=t[s];e.__cacheIndex=s,t[s]=e,r.__cacheIndex=n,t[n]=r}clipAction(e,t,n){let s=t||this._root,r=s.uuid,o=typeof e=="string"?ns.findByName(s,e):e,a=o!==null?o.uuid:e,c=this._actionsByClip[a],l=null;if(n===void 0&&(o!==null?n=o.blendMode:n=uc),c!==void 0){let d=c.actionByRoot[r];if(d!==void 0&&d.blendMode===n)return d;l=c.knownActions[0],o===null&&(o=l._clip)}if(o===null)return null;let h=new Ta(this,o,t,n);return this._bindAction(h,l),this._addInactiveAction(h,a,r),h}existingAction(e,t){let n=t||this._root,s=n.uuid,r=typeof e=="string"?ns.findByName(n,e):e,o=r?r.uuid:e,a=this._actionsByClip[o];return a!==void 0&&a.actionByRoot[s]||null}stopAllAction(){let e=this._actions,t=this._nActiveActions;for(let n=t-1;n>=0;--n)e[n].stop();return this}update(e){e*=this.timeScale;let t=this._actions,n=this._nActiveActions,s=this.time+=e,r=Math.sign(e),o=this._accuIndex^=1;for(let l=0;l!==n;++l)t[l]._update(s,e,r,o);let a=this._bindings,c=this._nActiveBindings;for(let l=0;l!==c;++l)a[l].apply(o);return this}setTime(e){this.time=0;for(let t=0;t<this._actions.length;t++)this._actions[t].time=0;return this.update(e)}getRoot(){return this._root}uncacheClip(e){let t=this._actions,n=e.uuid,s=this._actionsByClip,r=s[n];if(r!==void 0){let o=r.knownActions;for(let a=0,c=o.length;a!==c;++a){let l=o[a];this._deactivateAction(l);let h=l._cacheIndex,d=t[t.length-1];l._cacheIndex=null,l._byClipCacheIndex=null,d._cacheIndex=h,t[h]=d,t.pop(),this._removeInactiveBindingsForAction(l)}delete s[n]}}uncacheRoot(e){let t=e.uuid,n=this._actionsByClip;for(let o in n){let a=n[o].actionByRoot,c=a[t];c!==void 0&&(this._deactivateAction(c),this._removeInactiveAction(c))}let s=this._bindingsByRootAndName,r=s[t];if(r!==void 0)for(let o in r){let a=r[o];a.restoreOriginalState(),this._removeInactiveBinding(a)}}uncacheAction(e,t){let n=this.existingAction(e,t);n!==null&&(this._deactivateAction(n),this._removeInactiveAction(n))}};var js=class{constructor(e=1,t=0,n=0){this.radius=e,this.phi=t,this.theta=n}set(e,t,n){return this.radius=e,this.phi=t,this.theta=n,this}copy(e){return this.radius=e.radius,this.phi=e.phi,this.theta=e.theta,this}makeSafe(){return this.phi=ke(this.phi,1e-6,Math.PI-1e-6),this}setFromVector3(e){return this.setFromCartesianCoords(e.x,e.y,e.z)}setFromCartesianCoords(e,t,n){return this.radius=Math.sqrt(e*e+t*t+n*n),this.radius===0?(this.theta=0,this.phi=0):(this.theta=Math.atan2(e,n),this.phi=Math.acos(ke(t/this.radius,-1,1))),this}clone(){return new this.constructor().copy(this)}};var _l=class i{static{i.prototype.isMatrix2=!0}constructor(e,t,n,s){this.elements=[1,0,0,1],e!==void 0&&this.set(e,t,n,s)}identity(){return this.set(1,0,0,1),this}fromArray(e,t=0){for(let n=0;n<4;n++)this.elements[n]=e[n+t];return this}set(e,t,n,s){let r=this.elements;return r[0]=e,r[2]=t,r[1]=n,r[3]=s,this}};var Jr=class extends xn{constructor(e,t=null){super(),this.object=e,this.domElement=t,this.enabled=!0,this.state=-1,this.keys={},this.mouseButtons={LEFT:null,MIDDLE:null,RIGHT:null},this.touches={ONE:null,TWO:null}}connect(e){this.domElement!==null&&this.disconnect(),this.domElement=e}disconnect(){}dispose(){}update(){}};function Xl(i,e,t,n){let s=d1(n);switch(t){case Ul:return i*e;case ir:return i*e/s.components*s.byteLength;case La:return i*e/s.components*s.byteLength;case Fi:return i*e*2/s.components*s.byteLength;case Da:return i*e*2/s.components*s.byteLength;case Ol:return i*e*3/s.components*s.byteLength;case fn:return i*e*4/s.components*s.byteLength;case Na:return i*e*4/s.components*s.byteLength;case to:case no:return Math.floor((i+3)/4)*Math.floor((e+3)/4)*8;case io:case so:return Math.floor((i+3)/4)*Math.floor((e+3)/4)*16;case Oa:case Ba:return Math.max(i,16)*Math.max(e,8)/4;case Ua:case Fa:return Math.max(i,8)*Math.max(e,8)/2;case ka:case za:case Va:case Ga:return Math.floor((i+3)/4)*Math.floor((e+3)/4)*8;case Ha:case ro:case Wa:return Math.floor((i+3)/4)*Math.floor((e+3)/4)*16;case Xa:return Math.floor((i+3)/4)*Math.floor((e+3)/4)*16;case qa:return Math.floor((i+4)/5)*Math.floor((e+3)/4)*16;case Ya:return Math.floor((i+4)/5)*Math.floor((e+4)/5)*16;case Za:return Math.floor((i+5)/6)*Math.floor((e+4)/5)*16;case Ka:return Math.floor((i+5)/6)*Math.floor((e+5)/6)*16;case $a:return Math.floor((i+7)/8)*Math.floor((e+4)/5)*16;case ja:return Math.floor((i+7)/8)*Math.floor((e+5)/6)*16;case Ja:return Math.floor((i+7)/8)*Math.floor((e+7)/8)*16;case Qa:return Math.floor((i+9)/10)*Math.floor((e+4)/5)*16;case ec:return Math.floor((i+9)/10)*Math.floor((e+5)/6)*16;case tc:return Math.floor((i+9)/10)*Math.floor((e+7)/8)*16;case nc:return Math.floor((i+9)/10)*Math.floor((e+9)/10)*16;case ic:return Math.floor((i+11)/12)*Math.floor((e+9)/10)*16;case sc:return Math.floor((i+11)/12)*Math.floor((e+11)/12)*16;case rc:case oc:case ac:return Math.ceil(i/4)*Math.ceil(e/4)*16;case cc:case lc:return Math.ceil(i/4)*Math.ceil(e/4)*8;case oo:case hc:return Math.ceil(i/4)*Math.ceil(e/4)*16}throw new Error(`Unable to determine texture byte length for ${t} format.`)}function d1(i){switch(i){case Xt:case Pl:return{byteLength:1,components:1};case tr:case Ll:case Nn:return{byteLength:2,components:1};case Ia:case Pa:return{byteLength:2,components:4};case Dn:case Ca:case dn:return{byteLength:4,components:1};case Dl:case Nl:return{byteLength:4,components:3}}throw new Error(`THREE.TextureUtils: Unknown texture type ${i}.`)}typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:"186"}}));typeof window<"u"&&(window.__THREE__?Ae("WARNING: Multiple instances of Three.js being imported."):window.__THREE__="186");function ld(){let i=null,e=!1,t=null,n=null;function s(r,o){n=i.requestAnimationFrame(s),t(r,o)}return{start:function(){e!==!0&&t!==null&&i!==null&&(n=i.requestAnimationFrame(s),e=!0)},stop:function(){i!==null&&i.cancelAnimationFrame(n),e=!1},setAnimationLoop:function(r){t=r},setContext:function(r){i=r}}}function p1(i){let e=new WeakMap;function t(a,c){let l=a.array,h=a.usage,d=l.byteLength,u=i.createBuffer();i.bindBuffer(c,u),i.bufferData(c,l,h),a.onUploadCallback();let p;if(l instanceof Float32Array)p=i.FLOAT;else if(typeof Float16Array<"u"&&l instanceof Float16Array)p=i.HALF_FLOAT;else if(l instanceof Uint16Array)a.isFloat16BufferAttribute?p=i.HALF_FLOAT:p=i.UNSIGNED_SHORT;else if(l instanceof Int16Array)p=i.SHORT;else if(l instanceof Uint32Array)p=i.UNSIGNED_INT;else if(l instanceof Int32Array)p=i.INT;else if(l instanceof Int8Array)p=i.BYTE;else if(l instanceof Uint8Array)p=i.UNSIGNED_BYTE;else if(l instanceof Uint8ClampedArray)p=i.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+l);return{buffer:u,type:p,bytesPerElement:l.BYTES_PER_ELEMENT,version:a.version,size:d}}function n(a,c,l){let h=c.array,d=c.updateRanges;if(i.bindBuffer(l,a),d.length===0)i.bufferSubData(l,0,h);else{d.sort((p,g)=>p.start-g.start);let u=0;for(let p=1;p<d.length;p++){let g=d[u],b=d[p];b.start<=g.start+g.count+1?g.count=Math.max(g.count,b.start+b.count-g.start):(++u,d[u]=b)}d.length=u+1;for(let p=0,g=d.length;p<g;p++){let b=d[p];i.bufferSubData(l,b.start*h.BYTES_PER_ELEMENT,h,b.start,b.count)}c.clearUpdateRanges()}c.onUploadCallback()}function s(a){return a.isInterleavedBufferAttribute&&(a=a.data),e.get(a)}function r(a){a.isInterleavedBufferAttribute&&(a=a.data);let c=e.get(a);c&&(i.deleteBuffer(c.buffer),e.delete(a))}function o(a,c){if(a.isInterleavedBufferAttribute&&(a=a.data),a.isGLBufferAttribute){let h=e.get(a);(!h||h.version<a.version)&&e.set(a,{buffer:a.buffer,type:a.type,bytesPerElement:a.elementSize,version:a.version});return}let l=e.get(a);if(l===void 0)e.set(a,t(a,c));else if(l.version<a.version){if(l.size!==a.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");n(l.buffer,a,c),l.version=a.version}}return{get:s,remove:r,update:o}}var m1=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,g1=`#ifdef USE_ALPHAHASH
	const float ALPHA_HASH_SCALE = 0.05;
	float hash2D( vec2 value ) {
		return fract( 1.0e4 * sin( 17.0 * value.x + 0.1 * value.y ) * ( 0.1 + abs( sin( 13.0 * value.y + value.x ) ) ) );
	}
	float hash3D( vec3 value ) {
		return hash2D( vec2( hash2D( value.xy ), value.z ) );
	}
	float getAlphaHashThreshold( vec3 position ) {
		float maxDeriv = max(
			length( dFdx( position.xyz ) ),
			length( dFdy( position.xyz ) )
		);
		float pixScale = 1.0 / ( ALPHA_HASH_SCALE * maxDeriv );
		vec2 pixScales = vec2(
			exp2( floor( log2( pixScale ) ) ),
			exp2( ceil( log2( pixScale ) ) )
		);
		vec2 alpha = vec2(
			hash3D( floor( pixScales.x * position.xyz ) ),
			hash3D( floor( pixScales.y * position.xyz ) )
		);
		float lerpFactor = fract( log2( pixScale ) );
		float x = ( 1.0 - lerpFactor ) * alpha.x + lerpFactor * alpha.y;
		float a = min( lerpFactor, 1.0 - lerpFactor );
		vec3 cases = vec3(
			x * x / ( 2.0 * a * ( 1.0 - a ) ),
			( x - 0.5 * a ) / ( 1.0 - a ),
			1.0 - ( ( 1.0 - x ) * ( 1.0 - x ) / ( 2.0 * a * ( 1.0 - a ) ) )
		);
		float threshold = ( x < ( 1.0 - a ) )
			? ( ( x < a ) ? cases.x : cases.y )
			: cases.z;
		return clamp( threshold , 1.0e-6, 1.0 );
	}
#endif`,_1=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,x1=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,y1=`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,v1=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,M1=`#ifdef USE_AOMAP
	float ambientOcclusion = ( texture2D( aoMap, vAoMapUv ).r - 1.0 ) * aoMapIntensity + 1.0;
	reflectedLight.indirectDiffuse *= ambientOcclusion;
	#if defined( USE_CLEARCOAT ) 
		clearcoatSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_SHEEN ) 
		sheenSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_ENVMAP ) && defined( STANDARD )
		float dotNV = saturate( dot( geometryNormal, geometryViewDir ) );
		reflectedLight.indirectSpecular *= computeSpecularOcclusion( dotNV, ambientOcclusion, material.roughness );
	#endif
#endif`,b1=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,S1=`#ifdef USE_BATCHING
	#if ! defined( GL_ANGLE_multi_draw )
	#define gl_DrawID _gl_DrawID
	uniform int _gl_DrawID;
	#endif
	uniform highp sampler2D batchingTexture;
	uniform highp usampler2D batchingIdTexture;
	mat4 getBatchingMatrix( const in float i ) {
		int size = textureSize( batchingTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( batchingTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( batchingTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( batchingTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( batchingTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
	float getIndirectIndex( const in int i ) {
		int size = textureSize( batchingIdTexture, 0 ).x;
		int x = i % size;
		int y = i / size;
		return float( texelFetch( batchingIdTexture, ivec2( x, y ), 0 ).r );
	}
#endif
#ifdef USE_BATCHING_COLOR
	uniform sampler2D batchingColorTexture;
	vec4 getBatchingColor( const in float i ) {
		int size = textureSize( batchingColorTexture, 0 ).x;
		int j = int( i );
		int x = j % size;
		int y = j / size;
		return texelFetch( batchingColorTexture, ivec2( x, y ), 0 );
	}
#endif`,w1=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif`,T1=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,A1=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,E1=`float G_BlinnPhong_Implicit( ) {
	return 0.25;
}
float D_BlinnPhong( const in float shininess, const in float dotNH ) {
	return RECIPROCAL_PI * ( shininess * 0.5 + 1.0 ) * pow( dotNH, shininess );
}
vec3 BRDF_BlinnPhong( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in vec3 specularColor, const in float shininess ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( specularColor, 1.0, dotVH );
	float G = G_BlinnPhong_Implicit( );
	float D = D_BlinnPhong( shininess, dotNH );
	return F * ( G * D );
} // validated`,R1=`#ifdef USE_IRIDESCENCE
	const mat3 XYZ_TO_REC709 = mat3(
		 3.2404542, -0.9692660,  0.0556434,
		-1.5371385,  1.8760108, -0.2040259,
		-0.4985314,  0.0415560,  1.0572252
	);
	vec3 Fresnel0ToIor( vec3 fresnel0 ) {
		vec3 sqrtF0 = sqrt( fresnel0 );
		return ( vec3( 1.0 ) + sqrtF0 ) / ( vec3( 1.0 ) - sqrtF0 );
	}
	vec3 IorToFresnel0( vec3 transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - vec3( incidentIor ) ) / ( transmittedIor + vec3( incidentIor ) ) );
	}
	float IorToFresnel0( float transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - incidentIor ) / ( transmittedIor + incidentIor ));
	}
	vec3 evalSensitivity( float OPD, vec3 shift ) {
		float phase = 2.0 * PI * OPD * 1.0e-9;
		vec3 val = vec3( 5.4856e-13, 4.4201e-13, 5.2481e-13 );
		vec3 pos = vec3( 1.6810e+06, 1.7953e+06, 2.2084e+06 );
		vec3 var = vec3( 4.3278e+09, 9.3046e+09, 6.6121e+09 );
		vec3 xyz = val * sqrt( 2.0 * PI * var ) * cos( pos * phase + shift ) * exp( - pow2( phase ) * var );
		xyz.x += 9.7470e-14 * sqrt( 2.0 * PI * 4.5282e+09 ) * cos( 2.2399e+06 * phase + shift[ 0 ] ) * exp( - 4.5282e+09 * pow2( phase ) );
		xyz /= 1.0685e-7;
		vec3 rgb = XYZ_TO_REC709 * xyz;
		return rgb;
	}
	vec3 evalIridescence( float outsideIOR, float eta2, float cosTheta1, float thinFilmThickness, vec3 baseF0 ) {
		vec3 I;
		float iridescenceIOR = mix( outsideIOR, eta2, smoothstep( 0.0, 0.03, thinFilmThickness ) );
		float sinTheta2Sq = pow2( outsideIOR / iridescenceIOR ) * ( 1.0 - pow2( cosTheta1 ) );
		float cosTheta2Sq = 1.0 - sinTheta2Sq;
		if ( cosTheta2Sq < 0.0 ) {
			return vec3( 1.0 );
		}
		float cosTheta2 = sqrt( cosTheta2Sq );
		float R0 = IorToFresnel0( iridescenceIOR, outsideIOR );
		float R12 = F_Schlick( R0, 1.0, cosTheta1 );
		float T121 = 1.0 - R12;
		float phi12 = 0.0;
		if ( iridescenceIOR < outsideIOR ) phi12 = PI;
		float phi21 = PI - phi12;
		vec3 baseIOR = Fresnel0ToIor( clamp( baseF0, 0.0, 0.9999 ) );		vec3 R1 = IorToFresnel0( baseIOR, iridescenceIOR );
		vec3 R23 = F_Schlick( R1, 1.0, cosTheta2 );
		vec3 phi23 = vec3( 0.0 );
		if ( baseIOR[ 0 ] < iridescenceIOR ) phi23[ 0 ] = PI;
		if ( baseIOR[ 1 ] < iridescenceIOR ) phi23[ 1 ] = PI;
		if ( baseIOR[ 2 ] < iridescenceIOR ) phi23[ 2 ] = PI;
		float OPD = 2.0 * iridescenceIOR * thinFilmThickness * cosTheta2;
		vec3 phi = vec3( phi21 ) + phi23;
		vec3 R123 = clamp( R12 * R23, 1e-5, 0.9999 );
		vec3 r123 = sqrt( R123 );
		vec3 Rs = pow2( T121 ) * R23 / ( vec3( 1.0 ) - R123 );
		vec3 C0 = R12 + Rs;
		I = C0;
		vec3 Cm = Rs - T121;
		for ( int m = 1; m <= 2; ++ m ) {
			Cm *= r123;
			vec3 Sm = 2.0 * evalSensitivity( float( m ) * OPD, float( m ) * phi );
			I += Cm * Sm;
		}
		return max( I, vec3( 0.0 ) );
	}
#endif`,C1=`#ifdef USE_BUMPMAP
	uniform sampler2D bumpMap;
	uniform float bumpScale;
	vec2 dHdxy_fwd() {
		vec2 dSTdx = dFdx( vBumpMapUv );
		vec2 dSTdy = dFdy( vBumpMapUv );
		float Hll = bumpScale * texture2D( bumpMap, vBumpMapUv ).x;
		float dBx = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdx ).x - Hll;
		float dBy = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdy ).x - Hll;
		return vec2( dBx, dBy );
	}
	vec3 perturbNormalArb( vec3 surf_pos, vec3 surf_norm, vec2 dHdxy, float faceDirection ) {
		vec3 vSigmaX = normalize( dFdx( surf_pos.xyz ) );
		vec3 vSigmaY = normalize( dFdy( surf_pos.xyz ) );
		vec3 vN = surf_norm;
		vec3 R1 = cross( vSigmaY, vN );
		vec3 R2 = cross( vN, vSigmaX );
		float fDet = dot( vSigmaX, R1 ) * faceDirection;
		vec3 vGrad = sign( fDet ) * ( dHdxy.x * R1 + dHdxy.y * R2 );
		return normalize( abs( fDet ) * surf_norm - vGrad );
	}
#endif`,I1=`#if NUM_CLIPPING_PLANES > 0
	vec4 plane;
	#ifdef ALPHA_TO_COVERAGE
		float distanceToPlane, distanceGradient;
		float clipOpacity = 1.0;
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
			distanceGradient = fwidth( distanceToPlane ) / 2.0;
			clipOpacity *= smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			if ( clipOpacity == 0.0 ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			float unionClipOpacity = 1.0;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
				distanceGradient = fwidth( distanceToPlane ) / 2.0;
				unionClipOpacity *= 1.0 - smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			}
			#pragma unroll_loop_end
			clipOpacity *= 1.0 - unionClipOpacity;
		#endif
		diffuseColor.a *= clipOpacity;
		if ( diffuseColor.a == 0.0 ) discard;
	#else
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			if ( dot( vClipPosition, plane.xyz ) > plane.w ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			bool clipped = true;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				clipped = ( dot( vClipPosition, plane.xyz ) > plane.w ) && clipped;
			}
			#pragma unroll_loop_end
			if ( clipped ) discard;
		#endif
	#endif
#endif`,P1=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,L1=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,D1=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,N1=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#endif`,U1=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#endif`,O1=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec4 vColor;
#endif`,F1=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	vColor = vec4( 1.0 );
#endif
#ifdef USE_COLOR_ALPHA
	vColor *= color;
#elif defined( USE_COLOR )
	vColor.rgb *= color;
#endif
#ifdef USE_INSTANCING_COLOR
	vColor.rgb *= instanceColor.rgb;
#endif
#ifdef USE_BATCHING_COLOR
	vColor *= getBatchingColor( getIndirectIndex( gl_DrawID ) );
#endif`,B1=`#define PI 3.141592653589793
#define PI2 6.283185307179586
#define PI_HALF 1.5707963267948966
#define RECIPROCAL_PI 0.3183098861837907
#define RECIPROCAL_PI2 0.15915494309189535
#define EPSILON 1e-6
#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
#define whiteComplement( a ) ( 1.0 - saturate( a ) )
float pow2( const in float x ) { return x*x; }
vec3 pow2( const in vec3 x ) { return x*x; }
float pow3( const in float x ) { return x*x*x; }
float pow4( const in float x ) { float x2 = x*x; return x2*x2; }
float max3( const in vec3 v ) { return max( max( v.x, v.y ), v.z ); }
float average( const in vec3 v ) { return dot( v, vec3( 0.3333333 ) ); }
highp float rand( const in vec2 uv ) {
	const highp float a = 12.9898, b = 78.233, c = 43758.5453;
	highp float dt = dot( uv.xy, vec2( a,b ) ), sn = mod( dt, PI );
	return fract( sin( sn ) * c );
}
#ifdef HIGH_PRECISION
	float precisionSafeLength( vec3 v ) { return length( v ); }
#else
	float precisionSafeLength( vec3 v ) {
		float maxComponent = max3( abs( v ) );
		return length( v / maxComponent ) * maxComponent;
	}
#endif
struct IncidentLight {
	vec3 color;
	vec3 direction;
	bool visible;
};
struct ReflectedLight {
	vec3 directDiffuse;
	vec3 directSpecular;
	vec3 indirectDiffuse;
	vec3 indirectSpecular;
};
#ifdef USE_ALPHAHASH
	varying vec3 vPosition;
#endif
vec3 transformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );
}
#define inverseTransformDirection transformDirectionByInverseViewMatrix
vec3 transformNormalByInverseViewMatrix( in vec3 normal, in mat4 viewMatrix ) {
	return normalize( ( vec4( normal, 0.0 ) * viewMatrix ).xyz );
}
vec3 transformDirectionByInverseViewMatrix( in vec3 dir, in mat4 viewMatrix ) {
	return normalize( ( vec4( dir, 0.0 ) * viewMatrix ).xyz );
}
bool isPerspectiveMatrix( mat4 m ) {
	return m[ 2 ][ 3 ] == - 1.0;
}
vec2 equirectUv( in vec3 dir ) {
	float u = atan( dir.z, dir.x ) * RECIPROCAL_PI2 + 0.5;
	float v = asin( clamp( dir.y, - 1.0, 1.0 ) ) * RECIPROCAL_PI + 0.5;
	return vec2( u, v );
}
vec3 BRDF_Lambert( const in vec3 diffuseColor ) {
	return RECIPROCAL_PI * diffuseColor;
}
vec3 F_Schlick( const in vec3 f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
}
float F_Schlick( const in float f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
} // validated`,k1=`#ifdef ENVMAP_TYPE_CUBE_UV
	#define cubeUV_minMipLevel 4.0
	#define cubeUV_minTileSize 16.0
	float getFace( vec3 direction ) {
		vec3 absDirection = abs( direction );
		float face = - 1.0;
		if ( absDirection.x > absDirection.z ) {
			if ( absDirection.x > absDirection.y )
				face = direction.x > 0.0 ? 0.0 : 3.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		} else {
			if ( absDirection.z > absDirection.y )
				face = direction.z > 0.0 ? 2.0 : 5.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		}
		return face;
	}
	vec2 getUV( vec3 direction, float face ) {
		vec2 uv;
		if ( face == 0.0 ) {
			uv = vec2( direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 1.0 ) {
			uv = vec2( - direction.x, - direction.z ) / abs( direction.y );
		} else if ( face == 2.0 ) {
			uv = vec2( - direction.x, direction.y ) / abs( direction.z );
		} else if ( face == 3.0 ) {
			uv = vec2( - direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 4.0 ) {
			uv = vec2( - direction.x, direction.z ) / abs( direction.y );
		} else {
			uv = vec2( direction.x, direction.y ) / abs( direction.z );
		}
		return 0.5 * ( uv + 1.0 );
	}
	vec3 bilinearCubeUV( sampler2D envMap, vec3 direction, float mipInt ) {
		float face = getFace( direction );
		float filterInt = max( cubeUV_minMipLevel - mipInt, 0.0 );
		mipInt = max( mipInt, cubeUV_minMipLevel );
		float faceSize = exp2( mipInt );
		highp vec2 uv = getUV( direction, face ) * ( faceSize - 2.0 ) + 1.0;
		if ( face > 2.0 ) {
			uv.y += faceSize;
			face -= 3.0;
		}
		uv.x += face * faceSize;
		uv.x += filterInt * 3.0 * cubeUV_minTileSize;
		uv.y += 4.0 * ( exp2( CUBEUV_MAX_MIP ) - faceSize );
		uv.x *= CUBEUV_TEXEL_WIDTH;
		uv.y *= CUBEUV_TEXEL_HEIGHT;
		#ifdef texture2DGradEXT
			return texture2DGradEXT( envMap, uv, vec2( 0.0 ), vec2( 0.0 ) ).rgb;
		#else
			return texture2D( envMap, uv ).rgb;
		#endif
	}
	#define cubeUV_r0 1.0
	#define cubeUV_m0 - 2.0
	#define cubeUV_r1 0.8
	#define cubeUV_m1 - 1.0
	#define cubeUV_r4 0.4
	#define cubeUV_m4 2.0
	#define cubeUV_r5 0.305
	#define cubeUV_m5 3.0
	#define cubeUV_r6 0.21
	#define cubeUV_m6 4.0
	float roughnessToMip( float roughness ) {
		float mip = 0.0;
		if ( roughness >= cubeUV_r1 ) {
			mip = ( cubeUV_r0 - roughness ) * ( cubeUV_m1 - cubeUV_m0 ) / ( cubeUV_r0 - cubeUV_r1 ) + cubeUV_m0;
		} else if ( roughness >= cubeUV_r4 ) {
			mip = ( cubeUV_r1 - roughness ) * ( cubeUV_m4 - cubeUV_m1 ) / ( cubeUV_r1 - cubeUV_r4 ) + cubeUV_m1;
		} else if ( roughness >= cubeUV_r5 ) {
			mip = ( cubeUV_r4 - roughness ) * ( cubeUV_m5 - cubeUV_m4 ) / ( cubeUV_r4 - cubeUV_r5 ) + cubeUV_m4;
		} else if ( roughness >= cubeUV_r6 ) {
			mip = ( cubeUV_r5 - roughness ) * ( cubeUV_m6 - cubeUV_m5 ) / ( cubeUV_r5 - cubeUV_r6 ) + cubeUV_m5;
		} else {
			mip = - 2.0 * log2( 1.16 * roughness );		}
		return mip;
	}
	vec4 textureCubeUV( sampler2D envMap, vec3 sampleDir, float roughness ) {
		float mip = clamp( roughnessToMip( roughness ), cubeUV_m0, CUBEUV_MAX_MIP );
		float mipF = fract( mip );
		float mipInt = floor( mip );
		vec3 color0 = bilinearCubeUV( envMap, sampleDir, mipInt );
		if ( mipF == 0.0 ) {
			return vec4( color0, 1.0 );
		} else {
			vec3 color1 = bilinearCubeUV( envMap, sampleDir, mipInt + 1.0 );
			return vec4( mix( color0, color1, mipF ), 1.0 );
		}
	}
#endif`,z1=`vec3 transformedNormal = objectNormal;
#ifdef USE_TANGENT
	vec3 transformedTangent = objectTangent;
#endif
#ifdef USE_BATCHING
	mat3 bm = mat3( batchingMatrix );
	transformedNormal /= vec3( dot( bm[ 0 ], bm[ 0 ] ), dot( bm[ 1 ], bm[ 1 ] ), dot( bm[ 2 ], bm[ 2 ] ) );
	transformedNormal = bm * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = bm * transformedTangent;
	#endif
#endif
#ifdef USE_INSTANCING
	mat3 im = mat3( instanceMatrix );
	transformedNormal /= vec3( dot( im[ 0 ], im[ 0 ] ), dot( im[ 1 ], im[ 1 ] ), dot( im[ 2 ], im[ 2 ] ) );
	transformedNormal = im * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = im * transformedTangent;
	#endif
#endif
transformedNormal = normalMatrix * transformedNormal;
#ifdef FLIP_SIDED
	transformedNormal = - transformedNormal;
#endif
#ifdef USE_TANGENT
	transformedTangent = ( modelViewMatrix * vec4( transformedTangent, 0.0 ) ).xyz;
#endif`,H1=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,V1=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,G1=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	#ifdef DECODE_VIDEO_TEXTURE_EMISSIVE
		emissiveColor = sRGBTransferEOTF( emissiveColor );
	#endif
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,W1=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,X1="gl_FragColor = linearToOutputTexel( gl_FragColor );",q1=`vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferEOTF( in vec4 value ) {
	return vec4( mix( pow( value.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), value.rgb * 0.0773993808, vec3( lessThanEqual( value.rgb, vec3( 0.04045 ) ) ) ), value.a );
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}`,Y1=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vec3 cameraToFrag;
		if ( isOrthographic ) {
			cameraToFrag = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToFrag = normalize( vWorldPosition - cameraPosition );
		}
		vec3 worldNormal = transformNormalByInverseViewMatrix( normal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vec3 reflectVec = reflect( cameraToFrag, worldNormal );
		#else
			vec3 reflectVec = refract( cameraToFrag, worldNormal, refractionRatio );
		#endif
	#else
		vec3 reflectVec = vReflect;
	#endif
	#ifdef ENVMAP_TYPE_CUBE
		vec4 envColor = textureCube( envMap, envMapRotation * reflectVec );
		#ifdef ENVMAP_BLENDING_MULTIPLY
			outgoingLight = mix( outgoingLight, outgoingLight * envColor.xyz, specularStrength * reflectivity );
		#elif defined( ENVMAP_BLENDING_MIX )
			outgoingLight = mix( outgoingLight, envColor.xyz, specularStrength * reflectivity );
		#elif defined( ENVMAP_BLENDING_ADD )
			outgoingLight += envColor.xyz * specularStrength * reflectivity;
		#endif
	#endif
#endif`,Z1=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform mat3 envMapRotation;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
#endif`,K1=`#ifdef USE_ENVMAP
	uniform float reflectivity;
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		varying vec3 vWorldPosition;
		uniform float refractionRatio;
	#else
		varying vec3 vReflect;
	#endif
#endif`,$1=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,j1=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vWorldPosition = worldPosition.xyz;
	#else
		vec3 cameraToVertex;
		if ( isOrthographic ) {
			cameraToVertex = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToVertex = normalize( worldPosition.xyz - cameraPosition );
		}
		vec3 worldNormal = transformNormalByInverseViewMatrix( transformedNormal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vReflect = reflect( cameraToVertex, worldNormal );
		#else
			vReflect = refract( cameraToVertex, worldNormal, refractionRatio );
		#endif
	#endif
#endif`,J1=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,Q1=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,ep=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,tp=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,np=`#ifdef USE_GRADIENTMAP
	uniform sampler2D gradientMap;
#endif
vec3 getGradientIrradiance( vec3 normal, vec3 lightDirection ) {
	float dotNL = dot( normal, lightDirection );
	vec2 coord = vec2( dotNL * 0.5 + 0.5, 0.0 );
	#ifdef USE_GRADIENTMAP
		return vec3( texture2D( gradientMap, coord ).r );
	#else
		vec2 fw = fwidth( coord ) * 0.5;
		return mix( vec3( 0.7 ), vec3( 1.0 ), smoothstep( 0.7 - fw.x, 0.7 + fw.x, coord.x ) );
	#endif
}`,ip=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,sp=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,rp=`varying vec3 vViewPosition;
struct LambertMaterial {
	vec3 diffuseColor;
	float specularStrength;
};
void RE_Direct_Lambert( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Lambert( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Lambert
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,op=`uniform bool receiveShadow;
uniform vec3 ambientLightColor;
#if defined( USE_LIGHT_PROBES )
	uniform vec3 lightProbe[ 9 ];
#endif
vec3 shGetIrradianceAt( in vec3 normal, in vec3 shCoefficients[ 9 ] ) {
	float x = normal.x, y = normal.y, z = normal.z;
	vec3 result = shCoefficients[ 0 ] * 0.886227;
	result += shCoefficients[ 1 ] * 2.0 * 0.511664 * y;
	result += shCoefficients[ 2 ] * 2.0 * 0.511664 * z;
	result += shCoefficients[ 3 ] * 2.0 * 0.511664 * x;
	result += shCoefficients[ 4 ] * 2.0 * 0.429043 * x * y;
	result += shCoefficients[ 5 ] * 2.0 * 0.429043 * y * z;
	result += shCoefficients[ 6 ] * ( 0.743125 * z * z - 0.247708 );
	result += shCoefficients[ 7 ] * 2.0 * 0.429043 * x * z;
	result += shCoefficients[ 8 ] * 0.429043 * ( x * x - y * y );
	return result;
}
vec3 getLightProbeIrradiance( const in vec3 lightProbe[ 9 ], const in vec3 normal ) {
	vec3 worldNormal = transformNormalByInverseViewMatrix( normal, viewMatrix );
	vec3 irradiance = shGetIrradianceAt( worldNormal, lightProbe );
	return irradiance;
}
vec3 getAmbientLightIrradiance( const in vec3 ambientLightColor ) {
	vec3 irradiance = ambientLightColor;
	return irradiance;
}
float getDistanceAttenuation( const in float lightDistance, const in float cutoffDistance, const in float decayExponent ) {
	float distanceFalloff = 1.0 / max( pow( lightDistance, decayExponent ), 0.01 );
	if ( cutoffDistance > 0.0 ) {
		distanceFalloff *= pow2( saturate( 1.0 - pow4( lightDistance / cutoffDistance ) ) );
	}
	return distanceFalloff;
}
float getSpotAttenuation( const in float coneCosine, const in float penumbraCosine, const in float angleCosine ) {
	return smoothstep( coneCosine, penumbraCosine, angleCosine );
}
#if NUM_SUN_LIGHTS > 0
	struct SunLight {
		vec3 direction;
		vec3 color;
	};
	uniform SunLight sunLights[ NUM_SUN_LIGHTS ];
	void getSunLightInfo( const in SunLight sunLight, out IncidentLight light ) {
		light.color = sunLight.color;
		light.direction = sunLight.direction;
		light.visible = true;
	}
#endif
#if NUM_DIR_LIGHTS > 0
	struct DirectionalLight {
		vec3 direction;
		vec3 color;
	};
	uniform DirectionalLight directionalLights[ NUM_DIR_LIGHTS ];
	void getDirectionalLightInfo( const in DirectionalLight directionalLight, out IncidentLight light ) {
		light.color = directionalLight.color;
		light.direction = directionalLight.direction;
		light.visible = true;
	}
#endif
#if NUM_POINT_LIGHTS > 0
	struct PointLight {
		vec3 position;
		vec3 color;
		float distance;
		float decay;
	};
	uniform PointLight pointLights[ NUM_POINT_LIGHTS ];
	void getPointLightInfo( const in PointLight pointLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = pointLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float lightDistance = length( lVector );
		light.color = pointLight.color;
		light.color *= getDistanceAttenuation( lightDistance, pointLight.distance, pointLight.decay );
		light.visible = ( light.color != vec3( 0.0 ) );
	}
#endif
#if NUM_SPOT_LIGHTS > 0
	struct SpotLight {
		vec3 position;
		vec3 direction;
		vec3 color;
		float distance;
		float decay;
		float coneCos;
		float penumbraCos;
	};
	uniform SpotLight spotLights[ NUM_SPOT_LIGHTS ];
	void getSpotLightInfo( const in SpotLight spotLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = spotLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float angleCos = dot( light.direction, spotLight.direction );
		float spotAttenuation = getSpotAttenuation( spotLight.coneCos, spotLight.penumbraCos, angleCos );
		if ( spotAttenuation > 0.0 ) {
			float lightDistance = length( lVector );
			light.color = spotLight.color * spotAttenuation;
			light.color *= getDistanceAttenuation( lightDistance, spotLight.distance, spotLight.decay );
			light.visible = ( light.color != vec3( 0.0 ) );
		} else {
			light.color = vec3( 0.0 );
			light.visible = false;
		}
	}
#endif
#if NUM_RECT_AREA_LIGHTS > 0
	struct RectAreaLight {
		vec3 color;
		vec3 position;
		vec3 halfWidth;
		vec3 halfHeight;
	};
	uniform sampler2D ltc_1;	uniform sampler2D ltc_2;
	uniform RectAreaLight rectAreaLights[ NUM_RECT_AREA_LIGHTS ];
#endif
#if NUM_HEMI_LIGHTS > 0
	struct HemisphereLight {
		vec3 direction;
		vec3 skyColor;
		vec3 groundColor;
	};
	uniform HemisphereLight hemisphereLights[ NUM_HEMI_LIGHTS ];
	vec3 getHemisphereLightIrradiance( const in HemisphereLight hemiLight, const in vec3 normal ) {
		float dotNL = dot( normal, hemiLight.direction );
		float hemiDiffuseWeight = 0.5 * dotNL + 0.5;
		vec3 irradiance = mix( hemiLight.groundColor, hemiLight.skyColor, hemiDiffuseWeight );
		return irradiance;
	}
#endif
#include <lightprobes_pars_fragment>`,ap=`#ifdef USE_ENVMAP
	vec3 getIBLIrradiance( const in vec3 normal ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 worldNormal = transformNormalByInverseViewMatrix( normal, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * worldNormal, 1.0 );
			return PI * envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	vec3 getIBLRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 reflectVec = reflect( - viewDir, normal );
			reflectVec = normalize( mix( reflectVec, normal, pow4( roughness ) ) );
			reflectVec = transformDirectionByInverseViewMatrix( reflectVec, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * reflectVec, roughness );
			return envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	#ifdef USE_RETROREFLECTION
		vec3 getIBLRetroRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness ) {
			#ifdef ENVMAP_TYPE_CUBE_UV
				vec3 retroVec = normalize( mix( viewDir, normal, pow4( roughness ) ) );
				retroVec = transformDirectionByInverseViewMatrix( retroVec, viewMatrix );
				vec4 envMapColor = textureCubeUV( envMap, envMapRotation * retroVec, roughness );
				return envMapColor.rgb * envMapIntensity;
			#else
				return vec3( 0.0 );
			#endif
		}
	#endif
	#ifdef USE_ANISOTROPY
		vec3 getIBLAnisotropyRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness, const in vec3 bitangent, const in float anisotropy ) {
			#ifdef ENVMAP_TYPE_CUBE_UV
				vec3 bentNormal = cross( bitangent, viewDir );
				bentNormal = normalize( cross( bentNormal, bitangent ) );
				bentNormal = normalize( mix( bentNormal, normal, pow2( pow2( 1.0 - anisotropy * ( 1.0 - roughness ) ) ) ) );
				return getIBLRadiance( viewDir, bentNormal, roughness );
			#else
				return vec3( 0.0 );
			#endif
		}
		#ifdef USE_RETROREFLECTION
			vec3 getIBLAnisotropyRetroRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness, const in vec3 bitangent, const in float anisotropy ) {
				#ifdef ENVMAP_TYPE_CUBE_UV
					vec3 bentNormal = cross( bitangent, viewDir );
					bentNormal = normalize( cross( bentNormal, bitangent ) );
					bentNormal = normalize( mix( bentNormal, normal, pow2( pow2( 1.0 - anisotropy * ( 1.0 - roughness ) ) ) ) );
					return getIBLRetroRadiance( viewDir, bentNormal, roughness );
				#else
					return vec3( 0.0 );
				#endif
			}
		#endif
	#endif
#endif`,cp=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,lp=`varying vec3 vViewPosition;
struct ToonMaterial {
	vec3 diffuseColor;
};
void RE_Direct_Toon( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	vec3 irradiance = getGradientIrradiance( geometryNormal, directLight.direction ) * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Toon( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Toon
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,hp=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,up=`varying vec3 vViewPosition;
struct BlinnPhongMaterial {
	vec3 diffuseColor;
	vec3 specularColor;
	float specularShininess;
	float specularStrength;
};
void RE_Direct_BlinnPhong( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
	reflectedLight.directSpecular += irradiance * BRDF_BlinnPhong( directLight.direction, geometryViewDir, geometryNormal, material.specularColor, material.specularShininess ) * material.specularStrength;
}
void RE_IndirectDiffuse_BlinnPhong( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_BlinnPhong
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,dp=`PhysicalMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.diffuseContribution = diffuseColor.rgb * ( 1.0 - metalnessFactor );
material.metalness = metalnessFactor;
vec3 dxy = max( abs( dFdx( nonPerturbedNormal ) ), abs( dFdy( nonPerturbedNormal ) ) );
float geometryRoughness = max( max( dxy.x, dxy.y ), dxy.z );
material.roughness = max( roughnessFactor, 0.0525 );material.roughness += geometryRoughness;
material.roughness = min( material.roughness, 1.0 );
#ifdef IOR
	material.ior = ior;
	#ifdef USE_SPECULAR
		float specularIntensityFactor = specularIntensity;
		vec3 specularColorFactor = specularColor;
		#ifdef USE_SPECULAR_COLORMAP
			specularColorFactor *= texture2D( specularColorMap, vSpecularColorMapUv ).rgb;
		#endif
		#ifdef USE_SPECULAR_INTENSITYMAP
			specularIntensityFactor *= texture2D( specularIntensityMap, vSpecularIntensityMapUv ).a;
		#endif
		material.specularF90 = mix( specularIntensityFactor, 1.0, metalnessFactor );
	#else
		float specularIntensityFactor = 1.0;
		vec3 specularColorFactor = vec3( 1.0 );
		material.specularF90 = 1.0;
	#endif
	material.specularColor = min( pow2( ( material.ior - 1.0 ) / ( material.ior + 1.0 ) ) * specularColorFactor, vec3( 1.0 ) ) * specularIntensityFactor;
	material.specularColorBlended = mix( material.specularColor, diffuseColor.rgb, metalnessFactor );
#else
	material.specularColor = vec3( 0.04 );
	material.specularColorBlended = mix( material.specularColor, diffuseColor.rgb, metalnessFactor );
	material.specularF90 = 1.0;
#endif
#ifdef USE_CLEARCOAT
	material.clearcoat = clearcoat;
	material.clearcoatRoughness = clearcoatRoughness;
	material.clearcoatF0 = vec3( 0.04 );
	material.clearcoatF90 = 1.0;
	#ifdef USE_CLEARCOATMAP
		material.clearcoat *= texture2D( clearcoatMap, vClearcoatMapUv ).x;
	#endif
	#ifdef USE_CLEARCOAT_ROUGHNESSMAP
		material.clearcoatRoughness *= texture2D( clearcoatRoughnessMap, vClearcoatRoughnessMapUv ).y;
	#endif
	material.clearcoat = saturate( material.clearcoat );	material.clearcoatRoughness = max( material.clearcoatRoughness, 0.0525 );
	material.clearcoatRoughness += geometryRoughness;
	material.clearcoatRoughness = min( material.clearcoatRoughness, 1.0 );
#endif
#ifdef USE_DISPERSION
	material.dispersion = dispersion;
#endif
#ifdef USE_RETROREFLECTION
	material.retroreflectivity = retroreflectivity;
#endif
#ifdef USE_IRIDESCENCE
	material.iridescence = iridescence;
	material.iridescenceIOR = iridescenceIOR;
	#ifdef USE_IRIDESCENCEMAP
		material.iridescence *= texture2D( iridescenceMap, vIridescenceMapUv ).r;
	#endif
	#ifdef USE_IRIDESCENCE_THICKNESSMAP
		material.iridescenceThickness = (iridescenceThicknessMaximum - iridescenceThicknessMinimum) * texture2D( iridescenceThicknessMap, vIridescenceThicknessMapUv ).g + iridescenceThicknessMinimum;
	#else
		material.iridescenceThickness = iridescenceThicknessMaximum;
	#endif
#endif
#ifdef USE_SHEEN
	material.sheenColor = sheenColor;
	#ifdef USE_SHEEN_COLORMAP
		material.sheenColor *= texture2D( sheenColorMap, vSheenColorMapUv ).rgb;
	#endif
	material.sheenRoughness = clamp( sheenRoughness, 0.0001, 1.0 );
	#ifdef USE_SHEEN_ROUGHNESSMAP
		material.sheenRoughness *= texture2D( sheenRoughnessMap, vSheenRoughnessMapUv ).a;
	#endif
#endif
#ifdef USE_ANISOTROPY
	#ifdef USE_ANISOTROPYMAP
		mat2 anisotropyMat = mat2( anisotropyVector.x, anisotropyVector.y, - anisotropyVector.y, anisotropyVector.x );
		vec3 anisotropyPolar = texture2D( anisotropyMap, vAnisotropyMapUv ).rgb;
		vec2 anisotropyV = anisotropyMat * normalize( 2.0 * anisotropyPolar.rg - vec2( 1.0 ) ) * anisotropyPolar.b;
	#else
		vec2 anisotropyV = anisotropyVector;
	#endif
	material.anisotropy = length( anisotropyV );
	if( material.anisotropy == 0.0 ) {
		anisotropyV = vec2( 1.0, 0.0 );
	} else {
		anisotropyV /= material.anisotropy;
		material.anisotropy = saturate( material.anisotropy );
	}
	material.alphaT = mix( pow2( material.roughness ), 1.0, pow2( material.anisotropy ) );
	material.anisotropyT = tbn[ 0 ] * anisotropyV.x + tbn[ 1 ] * anisotropyV.y;
	material.anisotropyB = tbn[ 1 ] * anisotropyV.x - tbn[ 0 ] * anisotropyV.y;
#endif`,fp=`uniform sampler2D dfgLUT;
struct PhysicalMaterial {
	vec3 diffuseColor;
	vec3 diffuseContribution;
	vec3 specularColor;
	vec3 specularColorBlended;
	float roughness;
	float metalness;
	float specularF90;
	float dispersion;
	vec2 dfg;
	vec3 multiScatteringCompensation;
	#ifdef USE_RETROREFLECTION
		float retroreflectivity;
	#endif
	#ifdef USE_CLEARCOAT
		float clearcoat;
		float clearcoatRoughness;
		vec3 clearcoatF0;
		float clearcoatF90;
	#endif
	#ifdef USE_IRIDESCENCE
		float iridescence;
		float iridescenceIOR;
		float iridescenceThickness;
		vec3 iridescenceFresnel;
		vec3 iridescenceF0Dielectric;
		vec3 iridescenceF0Metallic;
	#endif
	#ifdef USE_SHEEN
		vec3 sheenColor;
		float sheenRoughness;
	#endif
	#ifdef IOR
		float ior;
	#endif
	#ifdef USE_TRANSMISSION
		float transmission;
		float transmissionAlpha;
		float thickness;
		float attenuationDistance;
		vec3 attenuationColor;
	#endif
	#ifdef USE_ANISOTROPY
		float anisotropy;
		float alphaT;
		vec3 anisotropyT;
		vec3 anisotropyB;
	#endif
};
vec3 clearcoatSpecularDirect = vec3( 0.0 );
vec3 clearcoatSpecularIndirect = vec3( 0.0 );
vec3 sheenSpecularDirect = vec3( 0.0 );
vec3 sheenSpecularIndirect = vec3(0.0 );
vec3 Schlick_to_F0( const in vec3 f, const in float f90, const in float dotVH ) {
    float x = clamp( 1.0 - dotVH, 0.0, 1.0 );
    float x2 = x * x;
    float x5 = clamp( x * x2 * x2, 0.0, 0.9999 );
    return ( f - vec3( f90 ) * x5 ) / ( 1.0 - x5 );
}
float V_GGX_SmithCorrelated( const in float alpha, const in float dotNL, const in float dotNV ) {
	float a2 = pow2( alpha );
	float gv = dotNL * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNV ) );
	float gl = dotNV * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNL ) );
	return 0.5 / max( gv + gl, EPSILON );
}
float D_GGX( const in float alpha, const in float dotNH ) {
	float a2 = pow2( alpha );
	float denom = pow2( dotNH ) * ( a2 - 1.0 ) + 1.0;
	return RECIPROCAL_PI * a2 / pow2( denom );
}
#ifdef USE_ANISOTROPY
	float V_GGX_SmithCorrelated_Anisotropic( const in float alphaT, const in float alphaB, const in float dotTV, const in float dotBV, const in float dotTL, const in float dotBL, const in float dotNV, const in float dotNL ) {
		float gv = dotNL * length( vec3( alphaT * dotTV, alphaB * dotBV, dotNV ) );
		float gl = dotNV * length( vec3( alphaT * dotTL, alphaB * dotBL, dotNL ) );
		return 0.5 / max( gv + gl, EPSILON );
	}
	float D_GGX_Anisotropic( const in float alphaT, const in float alphaB, const in float dotNH, const in float dotTH, const in float dotBH ) {
		float a2 = alphaT * alphaB;
		highp vec3 v = vec3( alphaB * dotTH, alphaT * dotBH, a2 * dotNH );
		highp float v2 = dot( v, v );
		float w2 = a2 / v2;
		return RECIPROCAL_PI * a2 * pow2 ( w2 );
	}
#endif
#ifdef USE_CLEARCOAT
	vec3 BRDF_GGX_Clearcoat( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material) {
		vec3 f0 = material.clearcoatF0;
		float f90 = material.clearcoatF90;
		float roughness = material.clearcoatRoughness;
		float alpha = pow2( roughness );
		vec3 halfDir = normalize( lightDir + viewDir );
		float dotNL = saturate( dot( normal, lightDir ) );
		float dotNV = saturate( dot( normal, viewDir ) );
		float dotNH = saturate( dot( normal, halfDir ) );
		float dotVH = saturate( dot( viewDir, halfDir ) );
		vec3 F = F_Schlick( f0, f90, dotVH );
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
		return F * ( V * D );
	}
#endif
vec3 BRDF_GGX( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material ) {
	vec3 f0 = material.specularColorBlended;
	float f90 = material.specularF90;
	float roughness = material.roughness;
	float alpha = pow2( roughness );
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( f0, f90, dotVH );
	#ifdef USE_IRIDESCENCE
		F = mix( F, material.iridescenceFresnel, material.iridescence );
	#endif
	#ifdef USE_ANISOTROPY
		float dotTL = dot( material.anisotropyT, lightDir );
		float dotTV = dot( material.anisotropyT, viewDir );
		float dotTH = dot( material.anisotropyT, halfDir );
		float dotBL = dot( material.anisotropyB, lightDir );
		float dotBV = dot( material.anisotropyB, viewDir );
		float dotBH = dot( material.anisotropyB, halfDir );
		float V = V_GGX_SmithCorrelated_Anisotropic( material.alphaT, alpha, dotTV, dotBV, dotTL, dotBL, dotNV, dotNL );
		float D = D_GGX_Anisotropic( material.alphaT, alpha, dotNH, dotTH, dotBH );
	#else
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
	#endif
	return F * ( V * D );
}
vec2 LTC_Uv( const in vec3 N, const in vec3 V, const in float roughness ) {
	const float LUT_SIZE = 64.0;
	const float LUT_SCALE = ( LUT_SIZE - 1.0 ) / LUT_SIZE;
	const float LUT_BIAS = 0.5 / LUT_SIZE;
	float dotNV = saturate( dot( N, V ) );
	vec2 uv = vec2( roughness, sqrt( 1.0 - dotNV ) );
	uv = uv * LUT_SCALE + LUT_BIAS;
	return uv;
}
float LTC_ClippedSphereFormFactor( const in vec3 f ) {
	float l = length( f );
	return max( ( l * l + f.z ) / ( l + 1.0 ), 0.0 );
}
vec3 LTC_EdgeVectorFormFactor( const in vec3 v1, const in vec3 v2 ) {
	float x = dot( v1, v2 );
	float y = abs( x );
	float a = 0.8543985 + ( 0.4965155 + 0.0145206 * y ) * y;
	float b = 3.4175940 + ( 4.1616724 + y ) * y;
	float v = a / b;
	float theta_sintheta = ( x > 0.0 ) ? v : 0.5 * inversesqrt( max( 1.0 - x * x, 1e-7 ) ) - v;
	return cross( v1, v2 ) * theta_sintheta;
}
vec3 LTC_Evaluate( const in vec3 N, const in vec3 V, const in vec3 P, const in mat3 mInv, const in vec3 rectCoords[ 4 ] ) {
	vec3 v1 = rectCoords[ 1 ] - rectCoords[ 0 ];
	vec3 v2 = rectCoords[ 3 ] - rectCoords[ 0 ];
	vec3 lightNormal = cross( v1, v2 );
	if( dot( lightNormal, P - rectCoords[ 0 ] ) < 0.0 ) return vec3( 0.0 );
	vec3 T1, T2;
	T1 = normalize( V - N * dot( V, N ) );
	T2 = - cross( N, T1 );
	mat3 mat = mInv * transpose( mat3( T1, T2, N ) );
	vec3 coords[ 4 ];
	coords[ 0 ] = mat * ( rectCoords[ 0 ] - P );
	coords[ 1 ] = mat * ( rectCoords[ 1 ] - P );
	coords[ 2 ] = mat * ( rectCoords[ 2 ] - P );
	coords[ 3 ] = mat * ( rectCoords[ 3 ] - P );
	coords[ 0 ] = normalize( coords[ 0 ] );
	coords[ 1 ] = normalize( coords[ 1 ] );
	coords[ 2 ] = normalize( coords[ 2 ] );
	coords[ 3 ] = normalize( coords[ 3 ] );
	vec3 vectorFormFactor = vec3( 0.0 );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 0 ], coords[ 1 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 1 ], coords[ 2 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 2 ], coords[ 3 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 3 ], coords[ 0 ] );
	float result = LTC_ClippedSphereFormFactor( vectorFormFactor );
	return vec3( result );
}
#if defined( USE_SHEEN )
float D_Charlie( float roughness, float dotNH ) {
	float alpha = pow2( roughness );
	float invAlpha = 1.0 / alpha;
	float cos2h = dotNH * dotNH;
	float sin2h = max( 1.0 - cos2h, 0.0078125 );
	return ( 2.0 + invAlpha ) * pow( sin2h, invAlpha * 0.5 ) / ( 2.0 * PI );
}
float V_Neubelt( float dotNV, float dotNL ) {
	return saturate( 1.0 / ( 4.0 * ( dotNL + dotNV - dotNL * dotNV ) ) );
}
vec3 BRDF_Sheen( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, vec3 sheenColor, const in float sheenRoughness ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float D = D_Charlie( sheenRoughness, dotNH );
	float V = V_Neubelt( dotNV, dotNL );
	return sheenColor * ( D * V );
}
#endif
float IBLSheenBRDF( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	float r2 = roughness * roughness;
	float rInv = 1.0 / ( roughness + 0.1 );
	float a = -1.9362 + 1.0678 * roughness + 0.4573 * r2 - 0.8469 * rInv;
	float b = -0.6014 + 0.5538 * roughness - 0.4670 * r2 - 0.1255 * rInv;
	float DG = exp( a * dotNV + b );
	return saturate( DG );
}
vec3 EnvironmentBRDF( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	vec2 fab = texture2D( dfgLUT, vec2( roughness, dotNV ) ).rg;
	return specularColor * fab.x + specularF90 * fab.y;
}
#ifdef USE_IRIDESCENCE
void computeMultiscatteringIridescence( const in vec2 fab, const in vec3 specularColor, const in float specularF90, const in float iridescence, const in vec3 iridescenceF0, inout vec3 singleScatter, inout vec3 multiScatter ) {
#else
void computeMultiscattering( const in vec2 fab, const in vec3 specularColor, const in float specularF90, inout vec3 singleScatter, inout vec3 multiScatter ) {
#endif
	#ifdef USE_IRIDESCENCE
		vec3 Fr = mix( specularColor, iridescenceF0, iridescence );
	#else
		vec3 Fr = specularColor;
	#endif
	vec3 FssEss = Fr * fab.x + specularF90 * fab.y;
	float Ess = fab.x + fab.y;
	float Ems = 1.0 - Ess;
	vec3 Favg = Fr + ( 1.0 - Fr ) * 0.047619;	vec3 Fms = FssEss * Favg / ( 1.0 - Ems * Favg );
	singleScatter += FssEss;
	multiScatter += Fms * Ems;
}
#if NUM_RECT_AREA_LIGHTS > 0
	void RE_Direct_RectArea_Physical( const in RectAreaLight rectAreaLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
		vec3 normal = geometryNormal;
		vec3 viewDir = geometryViewDir;
		vec3 position = geometryPosition;
		vec3 lightPos = rectAreaLight.position;
		vec3 halfWidth = rectAreaLight.halfWidth;
		vec3 halfHeight = rectAreaLight.halfHeight;
		vec3 lightColor = rectAreaLight.color;
		float roughness = material.roughness;
		vec3 rectCoords[ 4 ];
		rectCoords[ 0 ] = lightPos + halfWidth - halfHeight;		rectCoords[ 1 ] = lightPos - halfWidth - halfHeight;
		rectCoords[ 2 ] = lightPos - halfWidth + halfHeight;
		rectCoords[ 3 ] = lightPos + halfWidth + halfHeight;
		vec2 uv = LTC_Uv( normal, viewDir, roughness );
		vec4 t1 = texture2D( ltc_1, uv );
		vec4 t2 = texture2D( ltc_2, uv );
		mat3 mInv = mat3(
			vec3( t1.x, 0, t1.y ),
			vec3(    0, 1,    0 ),
			vec3( t1.z, 0, t1.w )
		);
		vec3 fresnel = ( material.specularColorBlended * t2.x + ( material.specularF90 - material.specularColorBlended ) * t2.y );
		reflectedLight.directSpecular += lightColor * fresnel * LTC_Evaluate( normal, viewDir, position, mInv, rectCoords );
		reflectedLight.directDiffuse += lightColor * material.diffuseContribution * LTC_Evaluate( normal, viewDir, position, mat3( 1.0 ), rectCoords );
		#ifdef USE_CLEARCOAT
			vec3 Ncc = geometryClearcoatNormal;
			vec2 uvClearcoat = LTC_Uv( Ncc, viewDir, material.clearcoatRoughness );
			vec4 t1Clearcoat = texture2D( ltc_1, uvClearcoat );
			vec4 t2Clearcoat = texture2D( ltc_2, uvClearcoat );
			mat3 mInvClearcoat = mat3(
				vec3( t1Clearcoat.x, 0, t1Clearcoat.y ),
				vec3(             0, 1,             0 ),
				vec3( t1Clearcoat.z, 0, t1Clearcoat.w )
			);
			vec3 fresnelClearcoat = material.clearcoatF0 * t2Clearcoat.x + ( material.clearcoatF90 - material.clearcoatF0 ) * t2Clearcoat.y;
			clearcoatSpecularDirect += lightColor * fresnelClearcoat * LTC_Evaluate( Ncc, viewDir, position, mInvClearcoat, rectCoords );
		#endif
	}
#endif
void RE_Direct_Physical( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	#ifdef USE_CLEARCOAT
		float dotNLcc = saturate( dot( geometryClearcoatNormal, directLight.direction ) );
		vec3 ccIrradiance = dotNLcc * directLight.color;
		clearcoatSpecularDirect += ccIrradiance * BRDF_GGX_Clearcoat( directLight.direction, geometryViewDir, geometryClearcoatNormal, material );
	#endif
	#ifdef USE_SHEEN
 
 		sheenSpecularDirect += irradiance * BRDF_Sheen( directLight.direction, geometryViewDir, geometryNormal, material.sheenColor, material.sheenRoughness );
 
 		float sheenAlbedoV = IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
 		float sheenAlbedoL = IBLSheenBRDF( geometryNormal, directLight.direction, material.sheenRoughness );
 
 		float sheenEnergyComp = 1.0 - max3( material.sheenColor ) * max( sheenAlbedoV, sheenAlbedoL );
 
 		irradiance *= sheenEnergyComp;
 
 	#endif
	vec3 specularBRDF = BRDF_GGX( directLight.direction, geometryViewDir, geometryNormal, material );
	#ifdef USE_RETROREFLECTION
		vec3 retroViewDir = reflect( - geometryViewDir, geometryNormal );
		vec3 retroSpecularBRDF = BRDF_GGX( directLight.direction, retroViewDir, geometryNormal, material );
		specularBRDF = mix( specularBRDF, retroSpecularBRDF, saturate( material.retroreflectivity ) );
	#endif
	reflectedLight.directSpecular += irradiance * specularBRDF * material.multiScatteringCompensation;
	vec3 halfDir = normalize( directLight.direction + geometryViewDir );
	float dotVH = saturate( dot( geometryViewDir, halfDir ) );
	vec3 F = F_Schlick( material.specularColor, material.specularF90, dotVH );
	#ifdef USE_RETROREFLECTION
		vec3 retroHalfDir = normalize( directLight.direction + retroViewDir );
		float dotRetroVH = saturate( dot( retroViewDir, retroHalfDir ) );
		vec3 retroF = F_Schlick( material.specularColor, material.specularF90, dotRetroVH );
		F = mix( F, retroF, saturate( material.retroreflectivity ) );
	#endif
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseContribution ) * ( 1.0 - F );
}
void RE_IndirectDiffuse_Physical( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	vec3 singleScattering = vec3( 0.0 );
	vec3 multiScattering = vec3( 0.0 );
	#ifdef USE_IRIDESCENCE
		computeMultiscatteringIridescence( material.dfg, material.specularColor, material.specularF90, material.iridescence, material.iridescenceF0Dielectric, singleScattering, multiScattering );
	#else
		computeMultiscattering( material.dfg, material.specularColor, material.specularF90, singleScattering, multiScattering );
	#endif
	vec3 diffuse = irradiance * BRDF_Lambert( material.diffuseContribution ) * ( 1.0 - singleScattering - multiScattering );
	#ifdef USE_SHEEN
		float sheenAlbedo = IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
		sheenSpecularIndirect += irradiance * material.sheenColor * sheenAlbedo * RECIPROCAL_PI;
		float sheenEnergyComp = 1.0 - max3( material.sheenColor ) * sheenAlbedo;
		diffuse *= sheenEnergyComp;
	#endif
	reflectedLight.indirectDiffuse += diffuse;
}
void RE_IndirectSpecular_Physical( const in vec3 radiance, const in vec3 irradiance, const in vec3 clearcoatRadiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight) {
	#ifdef USE_CLEARCOAT
		clearcoatSpecularIndirect += clearcoatRadiance * EnvironmentBRDF( geometryClearcoatNormal, geometryViewDir, material.clearcoatF0, material.clearcoatF90, material.clearcoatRoughness );
	#endif
	#ifdef USE_SHEEN
		sheenSpecularIndirect += irradiance * material.sheenColor * IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness ) * RECIPROCAL_PI;
 	#endif
	vec3 singleScatteringDielectric = vec3( 0.0 );
	vec3 multiScatteringDielectric = vec3( 0.0 );
	vec3 singleScatteringMetallic = vec3( 0.0 );
	vec3 multiScatteringMetallic = vec3( 0.0 );
	#ifdef USE_IRIDESCENCE
		computeMultiscatteringIridescence( material.dfg, material.specularColor, material.specularF90, material.iridescence, material.iridescenceF0Dielectric, singleScatteringDielectric, multiScatteringDielectric );
		computeMultiscatteringIridescence( material.dfg, material.diffuseColor, material.specularF90, material.iridescence, material.iridescenceF0Metallic, singleScatteringMetallic, multiScatteringMetallic );
	#else
		computeMultiscattering( material.dfg, material.specularColor, material.specularF90, singleScatteringDielectric, multiScatteringDielectric );
		computeMultiscattering( material.dfg, material.diffuseColor, material.specularF90, singleScatteringMetallic, multiScatteringMetallic );
	#endif
	vec3 singleScattering = mix( singleScatteringDielectric, singleScatteringMetallic, material.metalness );
	vec3 multiScattering = mix( multiScatteringDielectric, multiScatteringMetallic, material.metalness );
	vec3 totalScatteringDielectric = singleScatteringDielectric + multiScatteringDielectric;
	vec3 diffuse = material.diffuseContribution * ( 1.0 - totalScatteringDielectric );
	vec3 cosineWeightedIrradiance = irradiance * RECIPROCAL_PI;
	vec3 indirectSpecular = radiance * singleScattering;
	indirectSpecular += multiScattering * cosineWeightedIrradiance;
	vec3 indirectDiffuse = diffuse * cosineWeightedIrradiance;
	#ifdef USE_SHEEN
		float sheenAlbedo = IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
		float sheenEnergyComp = 1.0 - max3( material.sheenColor ) * sheenAlbedo;
		indirectSpecular *= sheenEnergyComp;
		indirectDiffuse *= sheenEnergyComp;
	#endif
	reflectedLight.indirectSpecular += indirectSpecular;
	reflectedLight.indirectDiffuse += indirectDiffuse;
}
#define RE_Direct				RE_Direct_Physical
#define RE_Direct_RectArea		RE_Direct_RectArea_Physical
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Physical
#define RE_IndirectSpecular		RE_IndirectSpecular_Physical
float computeSpecularOcclusion( const in float dotNV, const in float ambientOcclusion, const in float roughness ) {
	return saturate( pow( dotNV + ambientOcclusion, exp2( - 16.0 * roughness - 1.0 ) ) - 1.0 + ambientOcclusion );
}`,pp=`
vec3 geometryPosition = - vViewPosition;
vec3 geometryNormal = normal;
vec3 geometryViewDir = ( isOrthographic ) ? vec3( 0, 0, 1 ) : normalize( vViewPosition );
vec3 geometryClearcoatNormal = vec3( 0.0 );
#ifdef USE_CLEARCOAT
	geometryClearcoatNormal = clearcoatNormal;
#endif
#ifdef USE_IRIDESCENCE
	float dotNVi = saturate( dot( normal, geometryViewDir ) );
	if ( material.iridescenceThickness == 0.0 ) {
		material.iridescence = 0.0;
	} else {
		material.iridescence = saturate( material.iridescence );
	}
	if ( material.iridescence > 0.0 ) {
		vec3 iridescenceFresnelDielectric = evalIridescence( 1.0, material.iridescenceIOR, dotNVi, material.iridescenceThickness, material.specularColor );
		vec3 iridescenceFresnelMetallic = evalIridescence( 1.0, material.iridescenceIOR, dotNVi, material.iridescenceThickness, material.diffuseColor );
		material.iridescenceFresnel = mix( iridescenceFresnelDielectric, iridescenceFresnelMetallic, material.metalness );
		material.iridescenceF0Dielectric = Schlick_to_F0( iridescenceFresnelDielectric, 1.0, dotNVi );
		material.iridescenceF0Metallic = Schlick_to_F0( iridescenceFresnelMetallic, 1.0, dotNVi );
	}
#endif
#ifdef STANDARD
	float dotNVms = saturate( dot( geometryNormal, geometryViewDir ) );
	material.dfg = texture2D( dfgLUT, vec2( material.roughness, dotNVms ) ).rg;
	#if ( NUM_SUN_LIGHTS > 0 || NUM_DIR_LIGHTS > 0 || NUM_POINT_LIGHTS > 0 || NUM_SPOT_LIGHTS > 0 )
		float EssMs = material.dfg.x + material.dfg.y;
		material.multiScatteringCompensation = 1.0 + material.specularColorBlended * ( 1.0 / EssMs - 1.0 );
	#endif
#endif
IncidentLight directLight;
#if ( NUM_POINT_LIGHTS > 0 ) && defined( RE_Direct )
	PointLight pointLight;
	#if defined( USE_SHADOWMAP ) && NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHTS; i ++ ) {
		pointLight = pointLights[ i ];
		getPointLightInfo( pointLight, geometryPosition, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_POINT_LIGHT_SHADOWS ) && ( defined( SHADOWMAP_TYPE_PCF ) || defined( SHADOWMAP_TYPE_BASIC ) )
		pointLightShadow = pointLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getPointShadow( pointShadowMap[ i ], pointLightShadow.shadowMapSize, pointLightShadow.shadowIntensity, pointLightShadow.shadowBias, pointLightShadow.shadowRadius, vPointShadowCoord[ i ], pointLightShadow.shadowCameraNear, pointLightShadow.shadowCameraFar ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_SPOT_LIGHTS > 0 ) && defined( RE_Direct )
	SpotLight spotLight;
	vec4 spotColor;
	vec3 spotLightCoord;
	bool inSpotLightMap;
	#if defined( USE_SHADOWMAP ) && NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHTS; i ++ ) {
		spotLight = spotLights[ i ];
		getSpotLightInfo( spotLight, geometryPosition, directLight );
		#if ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#define SPOT_LIGHT_MAP_INDEX UNROLLED_LOOP_INDEX
		#elif ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		#define SPOT_LIGHT_MAP_INDEX NUM_SPOT_LIGHT_MAPS
		#else
		#define SPOT_LIGHT_MAP_INDEX ( UNROLLED_LOOP_INDEX - NUM_SPOT_LIGHT_SHADOWS + NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#endif
		#if ( SPOT_LIGHT_MAP_INDEX < NUM_SPOT_LIGHT_MAPS )
			spotLightCoord = vSpotLightCoord[ i ].xyz / vSpotLightCoord[ i ].w;
			inSpotLightMap = all( lessThan( abs( spotLightCoord * 2. - 1. ), vec3( 1.0 ) ) );
			spotColor = texture2D( spotLightMap[ SPOT_LIGHT_MAP_INDEX ], spotLightCoord.xy );
			directLight.color = inSpotLightMap ? directLight.color * spotColor.rgb : directLight.color;
		#endif
		#undef SPOT_LIGHT_MAP_INDEX
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		spotLightShadow = spotLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( spotShadowMap[ i ], spotLightShadow.shadowMapSize, spotLightShadow.shadowIntensity, spotLightShadow.shadowBias, spotLightShadow.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_SUN_LIGHTS > 0 ) && defined( RE_Direct )
	SunLight sunLight;
	#if defined( USE_SHADOWMAP ) && NUM_SUN_LIGHT_SHADOWS > 0
	SunLightShadow sunLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SUN_LIGHTS; i ++ ) {
		sunLight = sunLights[ i ];
		getSunLightInfo( sunLight, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_SUN_LIGHT_SHADOWS )
		sunLightShadow = sunLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getSunShadow( sunShadowMap[ i ], sunLightShadow, UNROLLED_LOOP_INDEX ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_DIR_LIGHTS > 0 ) && defined( RE_Direct )
	DirectionalLight directionalLight;
	#if defined( USE_SHADOWMAP ) && NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHTS; i ++ ) {
		directionalLight = directionalLights[ i ];
		getDirectionalLightInfo( directionalLight, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_DIR_LIGHT_SHADOWS )
		directionalLightShadow = directionalLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( directionalShadowMap[ i ], directionalLightShadow.shadowMapSize, directionalLightShadow.shadowIntensity, directionalLightShadow.shadowBias, directionalLightShadow.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_RECT_AREA_LIGHTS > 0 ) && defined( RE_Direct_RectArea )
	RectAreaLight rectAreaLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_RECT_AREA_LIGHTS; i ++ ) {
		rectAreaLight = rectAreaLights[ i ];
		RE_Direct_RectArea( rectAreaLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if defined( RE_IndirectDiffuse )
	vec3 iblIrradiance = vec3( 0.0 );
	vec3 irradiance = getAmbientLightIrradiance( ambientLightColor );
	#if defined( USE_LIGHT_PROBES )
		irradiance += getLightProbeIrradiance( lightProbe, geometryNormal );
	#endif
	#if ( NUM_HEMI_LIGHTS > 0 )
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_HEMI_LIGHTS; i ++ ) {
			irradiance += getHemisphereLightIrradiance( hemisphereLights[ i ], geometryNormal );
		}
		#pragma unroll_loop_end
	#endif
	#ifdef USE_LIGHT_PROBES_GRID
		vec3 probeWorldPos = ( ( vec4( geometryPosition, 1.0 ) - viewMatrix[ 3 ] ) * viewMatrix ).xyz;
		vec3 probeWorldNormal = transformNormalByInverseViewMatrix( geometryNormal, viewMatrix );
		irradiance += getLightProbeGridIrradiance( probeWorldPos, probeWorldNormal );
	#endif
#endif
#if defined( RE_IndirectSpecular )
	vec3 radiance = vec3( 0.0 );
	vec3 clearcoatRadiance = vec3( 0.0 );
#endif`,mp=`#if defined( RE_IndirectDiffuse )
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		vec3 lightMapIrradiance = lightMapTexel.rgb * lightMapIntensity;
		irradiance += lightMapIrradiance;
	#endif
	#if defined( USE_ENVMAP ) && defined( ENVMAP_TYPE_CUBE_UV )
		#if defined( STANDARD ) || defined( LAMBERT ) || defined( PHONG )
			iblIrradiance += getIBLIrradiance( geometryNormal );
		#endif
	#endif
#endif
#if defined( USE_ENVMAP ) && defined( RE_IndirectSpecular )
	#ifdef USE_ANISOTROPY
		vec3 iblRadiance = getIBLAnisotropyRadiance( geometryViewDir, geometryNormal, material.roughness, material.anisotropyB, material.anisotropy );
	#else
		vec3 iblRadiance = getIBLRadiance( geometryViewDir, geometryNormal, material.roughness );
	#endif
	#ifdef USE_RETROREFLECTION
		#ifdef USE_ANISOTROPY
			vec3 retroIBLRadiance = getIBLAnisotropyRetroRadiance( geometryViewDir, geometryNormal, material.roughness, material.anisotropyB, material.anisotropy );
		#else
			vec3 retroIBLRadiance = getIBLRetroRadiance( geometryViewDir, geometryNormal, material.roughness );
		#endif
		iblRadiance = mix( iblRadiance, retroIBLRadiance, saturate( material.retroreflectivity ) );
	#endif
	radiance += iblRadiance;
	#ifdef USE_CLEARCOAT
		clearcoatRadiance += getIBLRadiance( geometryViewDir, geometryClearcoatNormal, material.clearcoatRoughness );
	#endif
#endif`,gp=`#if defined( RE_IndirectDiffuse )
	#if defined( LAMBERT ) || defined( PHONG )
		irradiance += iblIrradiance;
	#endif
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,_p=`#ifdef USE_LIGHT_PROBES_GRID
uniform highp sampler3D probesSH;
uniform vec3 probesMin;
uniform vec3 probesMax;
uniform vec3 probesResolution;
vec3 getLightProbeGridIrradiance( vec3 worldPos, vec3 worldNormal ) {
	vec3 res = probesResolution;
	vec3 gridRange = probesMax - probesMin;
	vec3 resMinusOne = res - 1.0;
	vec3 probeSpacing = gridRange / resMinusOne;
	vec3 samplePos = worldPos + worldNormal * probeSpacing * 0.5;
	vec3 uvw = clamp( ( samplePos - probesMin ) / gridRange, 0.0, 1.0 );
	uvw = uvw * resMinusOne / res + 0.5 / res;
	float nz          = res.z;
	float paddedSlices = nz + 2.0;
	float atlasDepth  = 7.0 * paddedSlices;
	float uvZBase     = uvw.z * nz + 1.0;
	vec4 s0 = texture( probesSH, vec3( uvw.xy, ( uvZBase                       ) / atlasDepth ) );
	vec4 s1 = texture( probesSH, vec3( uvw.xy, ( uvZBase +       paddedSlices   ) / atlasDepth ) );
	vec4 s2 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 2.0 * paddedSlices   ) / atlasDepth ) );
	vec4 s3 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 3.0 * paddedSlices   ) / atlasDepth ) );
	vec4 s4 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 4.0 * paddedSlices   ) / atlasDepth ) );
	vec4 s5 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 5.0 * paddedSlices   ) / atlasDepth ) );
	vec4 s6 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 6.0 * paddedSlices   ) / atlasDepth ) );
	vec3 c0 = s0.xyz;
	vec3 c1 = vec3( s0.w, s1.xy );
	vec3 c2 = vec3( s1.zw, s2.x );
	vec3 c3 = s2.yzw;
	vec3 c4 = s3.xyz;
	vec3 c5 = vec3( s3.w, s4.xy );
	vec3 c6 = vec3( s4.zw, s5.x );
	vec3 c7 = s5.yzw;
	vec3 c8 = s6.xyz;
	float x = worldNormal.x, y = worldNormal.y, z = worldNormal.z;
	vec3 result = c0 * 0.886227;
	result += c1 * 2.0 * 0.511664 * y;
	result += c2 * 2.0 * 0.511664 * z;
	result += c3 * 2.0 * 0.511664 * x;
	result += c4 * 2.0 * 0.429043 * x * y;
	result += c5 * 2.0 * 0.429043 * y * z;
	result += c6 * ( 0.743125 * z * z - 0.247708 );
	result += c7 * 2.0 * 0.429043 * x * z;
	result += c8 * 0.429043 * ( x * x - y * y );
	return max( result, vec3( 0.0 ) );
}
#endif`,xp=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,yp=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,vp=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,Mp=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,bp=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = sRGBTransferEOTF( sampledDiffuseColor );
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,Sp=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,wp=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
	#if defined( USE_POINTS_UV )
		vec2 uv = vUv;
	#else
		vec2 uv = ( uvTransform * vec3( gl_PointCoord.x, 1.0 - gl_PointCoord.y, 1 ) ).xy;
	#endif
#endif
#ifdef USE_MAP
	diffuseColor *= texture2D( map, uv );
#endif
#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, uv ).g;
#endif`,Tp=`#if defined( USE_POINTS_UV )
	varying vec2 vUv;
#else
	#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
		uniform mat3 uvTransform;
	#endif
#endif
#ifdef USE_MAP
	uniform sampler2D map;
#endif
#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,Ap=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,Ep=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,Rp=`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,Cp=`#if defined( USE_MORPHCOLORS )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,Ip=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,Pp=`#ifdef USE_MORPHTARGETS
	#ifndef USE_INSTANCING_MORPH
		uniform float morphTargetBaseInfluence;
		uniform float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	#endif
	uniform sampler2DArray morphTargetsTexture;
	uniform ivec2 morphTargetsTextureSize;
	vec4 getMorph( const in int vertexIndex, const in int morphTargetIndex, const in int offset ) {
		int texelIndex = vertexIndex * MORPHTARGETS_TEXTURE_STRIDE + offset;
		int y = texelIndex / morphTargetsTextureSize.x;
		int x = texelIndex - y * morphTargetsTextureSize.x;
		ivec3 morphUV = ivec3( x, y, morphTargetIndex );
		return texelFetch( morphTargetsTexture, morphUV, 0 );
	}
#endif`,Lp=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,Dp=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
#ifdef FLAT_SHADED
	vec3 fdx = dFdx( vViewPosition );
	vec3 fdy = dFdy( vViewPosition );
	vec3 normal = normalize( cross( fdx, fdy ) );
#else
	vec3 normal = normalize( vNormal );
	#ifdef DOUBLE_SIDED
		normal *= faceDirection;
	#endif
#endif
#if defined( USE_NORMALMAP_TANGENTSPACE ) || defined( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY )
	#ifdef USE_TANGENT
		mat3 tbn = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn = getTangentFrame( - vViewPosition, normal,
		#if defined( USE_NORMALMAP )
			vNormalMapUv
		#elif defined( USE_CLEARCOAT_NORMALMAP )
			vClearcoatNormalMapUv
		#else
			vUv
		#endif
		);
	#endif
	#ifdef DOUBLE_SIDED
		tbn[0] *= faceDirection;
		tbn[1] *= faceDirection;
	#endif
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	#ifdef USE_TANGENT
		mat3 tbn2 = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn2 = getTangentFrame( - vViewPosition, normal, vClearcoatNormalMapUv );
	#endif
	#ifdef DOUBLE_SIDED
		tbn2[0] *= faceDirection;
		tbn2[1] *= faceDirection;
	#endif
#endif
vec3 nonPerturbedNormal = normal;`,Np=`#ifdef USE_NORMALMAP_OBJECTSPACE
	normal = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	#ifdef FLIP_SIDED
		normal = - normal;
	#endif
	#ifdef DOUBLE_SIDED
		normal = normal * faceDirection;
	#endif
	normal = normalize( normalMatrix * normal );
#elif defined( USE_NORMALMAP_TANGENTSPACE )
	vec3 mapN = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	#if defined( USE_PACKED_NORMALMAP )
		mapN = vec3( mapN.xy, sqrt( saturate( 1.0 - dot( mapN.xy, mapN.xy ) ) ) );
	#endif
	mapN.xy *= normalScale;
	normal = normalize( tbn * mapN );
#elif defined( USE_BUMPMAP )
	normal = perturbNormalArb( - vViewPosition, normal, dHdxy_fwd(), faceDirection );
#endif`,Up=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,Op=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,Fp=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
		#ifdef FLIP_SIDED
			vBitangent = - vBitangent;
		#endif
	#endif
#endif`,Bp=`#ifdef USE_NORMALMAP
	uniform sampler2D normalMap;
	uniform vec2 normalScale;
#endif
#ifdef USE_NORMALMAP_OBJECTSPACE
	uniform mat3 normalMatrix;
#endif
#if ! defined ( USE_TANGENT ) && ( defined ( USE_NORMALMAP_TANGENTSPACE ) || defined ( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY ) )
	mat3 getTangentFrame( vec3 eye_pos, vec3 surf_norm, vec2 uv ) {
		vec3 q0 = dFdx( eye_pos.xyz );
		vec3 q1 = dFdy( eye_pos.xyz );
		vec2 st0 = dFdx( uv.st );
		vec2 st1 = dFdy( uv.st );
		vec3 N = surf_norm;
		vec3 q1perp = cross( q1, N );
		vec3 q0perp = cross( N, q0 );
		vec3 T = q1perp * st0.x + q0perp * st1.x;
		vec3 B = q1perp * st0.y + q0perp * st1.y;
		float det = max( dot( T, T ), dot( B, B ) );
		float scale = ( det == 0.0 ) ? 0.0 : inversesqrt( det );
		return mat3( T * scale, B * scale, N );
	}
#endif`,kp=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,zp=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,Hp=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,Vp=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,Gp=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,Wp=`vec3 packNormalToRGB( const in vec3 normal ) {
	return normalize( normal ) * 0.5 + 0.5;
}
vec3 unpackRGBToNormal( const in vec3 rgb ) {
	return 2.0 * rgb.xyz - 1.0;
}
const float PackUpscale = 256. / 255.;const float UnpackDownscale = 255. / 256.;const float ShiftRight8 = 1. / 256.;
const float Inv255 = 1. / 255.;
const vec4 PackFactors = vec4( 1.0, 256.0, 256.0 * 256.0, 256.0 * 256.0 * 256.0 );
const vec2 UnpackFactors2 = vec2( UnpackDownscale, 1.0 / PackFactors.g );
const vec3 UnpackFactors3 = vec3( UnpackDownscale / PackFactors.rg, 1.0 / PackFactors.b );
const vec4 UnpackFactors4 = vec4( UnpackDownscale / PackFactors.rgb, 1.0 / PackFactors.a );
vec4 packDepthToRGBA( const in float v ) {
	if( v <= 0.0 )
		return vec4( 0., 0., 0., 0. );
	if( v >= 1.0 )
		return vec4( 1., 1., 1., 1. );
	float vuf;
	float af = modf( v * PackFactors.a, vuf );
	float bf = modf( vuf * ShiftRight8, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec4( vuf * Inv255, gf * PackUpscale, bf * PackUpscale, af );
}
vec3 packDepthToRGB( const in float v ) {
	if( v <= 0.0 )
		return vec3( 0., 0., 0. );
	if( v >= 1.0 )
		return vec3( 1., 1., 1. );
	float vuf;
	float bf = modf( v * PackFactors.b, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec3( vuf * Inv255, gf * PackUpscale, bf );
}
vec2 packDepthToRG( const in float v ) {
	if( v <= 0.0 )
		return vec2( 0., 0. );
	if( v >= 1.0 )
		return vec2( 1., 1. );
	float vuf;
	float gf = modf( v * 256., vuf );
	return vec2( vuf * Inv255, gf );
}
float unpackRGBAToDepth( const in vec4 v ) {
	return dot( v, UnpackFactors4 );
}
float unpackRGBToDepth( const in vec3 v ) {
	return dot( v, UnpackFactors3 );
}
float unpackRGToDepth( const in vec2 v ) {
	return v.r * UnpackFactors2.r + v.g * UnpackFactors2.g;
}
vec4 pack2HalfToRGBA( const in vec2 v ) {
	vec4 r = vec4( v.x, fract( v.x * 255.0 ), v.y, fract( v.y * 255.0 ) );
	return vec4( r.x - r.y / 255.0, r.y, r.z - r.w / 255.0, r.w );
}
vec2 unpackRGBATo2Half( const in vec4 v ) {
	return vec2( v.x + ( v.y / 255.0 ), v.z + ( v.w / 255.0 ) );
}
float viewZToOrthographicDepth( const in float viewZ, const in float near, const in float far ) {
	return ( viewZ + near ) / ( near - far );
}
float orthographicDepthToViewZ( const in float depth, const in float near, const in float far ) {
	#ifdef USE_REVERSED_DEPTH_BUFFER
	
		return depth * ( far - near ) - far;
	#else
		return depth * ( near - far ) - near;
	#endif
}
float viewZToPerspectiveDepth( const in float viewZ, const in float near, const in float far ) {
	return ( ( near + viewZ ) * far ) / ( ( far - near ) * viewZ );
}
float perspectiveDepthToViewZ( const in float depth, const in float near, const in float far ) {
	
	#ifdef USE_REVERSED_DEPTH_BUFFER
		return ( near * far ) / ( ( near - far ) * depth - near );
	#else
		return ( near * far ) / ( ( far - near ) * depth - far );
	#endif
}`,Xp=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,qp=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,Yp=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,Zp=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,Kp=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,$p=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,jp=`#if NUM_SPOT_LIGHT_COORDS > 0
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#if NUM_SPOT_LIGHT_MAPS > 0
	uniform sampler2D spotLightMap[ NUM_SPOT_LIGHT_MAPS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_SUN_LIGHT_SHADOWS > 0
		#define SUN_LIGHT_CASCADES 2
		#if defined( SHADOWMAP_TYPE_PCF )
			uniform sampler2DShadow sunShadowMap[ NUM_SUN_LIGHT_SHADOWS ];
		#else
			uniform sampler2D sunShadowMap[ NUM_SUN_LIGHT_SHADOWS ];
		#endif
		uniform mat4 sunShadowMatrix[ NUM_SUN_LIGHT_SHADOWS * SUN_LIGHT_CASCADES ];
		uniform vec4 sunShadowCascade[ NUM_SUN_LIGHT_SHADOWS * SUN_LIGHT_CASCADES ];
		varying vec4 vSunShadowWorldPosition;
		varying vec3 vSunShadowWorldNormal;
		struct SunLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SunLightShadow sunLightShadows[ NUM_SUN_LIGHT_SHADOWS ];
	#endif
	#if NUM_DIR_LIGHT_SHADOWS > 0
		#if defined( SHADOWMAP_TYPE_PCF )
			uniform sampler2DShadow directionalShadowMap[ NUM_DIR_LIGHT_SHADOWS ];
		#else
			uniform sampler2D directionalShadowMap[ NUM_DIR_LIGHT_SHADOWS ];
		#endif
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		#if defined( SHADOWMAP_TYPE_PCF )
			uniform sampler2DShadow spotShadowMap[ NUM_SPOT_LIGHT_SHADOWS ];
		#else
			uniform sampler2D spotShadowMap[ NUM_SPOT_LIGHT_SHADOWS ];
		#endif
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		#if defined( SHADOWMAP_TYPE_PCF )
			uniform samplerCubeShadow pointShadowMap[ NUM_POINT_LIGHT_SHADOWS ];
		#elif defined( SHADOWMAP_TYPE_BASIC )
			uniform samplerCube pointShadowMap[ NUM_POINT_LIGHT_SHADOWS ];
		#endif
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
	#if defined( SHADOWMAP_TYPE_PCF )
		float interleavedGradientNoise( vec2 position ) {
			return fract( 52.9829189 * fract( dot( position, vec2( 0.06711056, 0.00583715 ) ) ) );
		}
		vec2 vogelDiskSample( int sampleIndex, int samplesCount, float phi ) {
			const float goldenAngle = 2.399963229728653;
			float r = sqrt( ( float( sampleIndex ) + 0.5 ) / float( samplesCount ) );
			float theta = float( sampleIndex ) * goldenAngle + phi;
			return vec2( cos( theta ), sin( theta ) ) * r;
		}
	#endif
	#if defined( SHADOWMAP_TYPE_PCF )
		float getShadow( sampler2DShadow shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
			float shadow = 1.0;
			shadowCoord.xyz /= shadowCoord.w;
			shadowCoord.z += shadowBias;
			bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
			bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
			if ( frustumTest ) {
				vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
				float radius = shadowRadius * texelSize.x;
				float phi = interleavedGradientNoise( gl_FragCoord.xy ) * PI2;
				shadow = (
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 0, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 1, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 2, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 3, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 4, 5, phi ) * radius, shadowCoord.z ) )
				) * 0.2;
			}
			return mix( 1.0, shadow, shadowIntensity );
		}
	#elif defined( SHADOWMAP_TYPE_VSM )
		float getShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
			float shadow = 1.0;
			shadowCoord.xyz /= shadowCoord.w;
			#ifdef USE_REVERSED_DEPTH_BUFFER
				shadowCoord.z -= shadowBias;
			#else
				shadowCoord.z += shadowBias;
			#endif
			bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
			bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
			if ( frustumTest ) {
				vec2 distribution = texture2D( shadowMap, shadowCoord.xy ).rg;
				float mean = distribution.x;
				float variance = distribution.y * distribution.y;
				#ifdef USE_REVERSED_DEPTH_BUFFER
					float hard_shadow = step( mean, shadowCoord.z );
				#else
					float hard_shadow = step( shadowCoord.z, mean );
				#endif
				
				if ( hard_shadow == 1.0 ) {
					shadow = 1.0;
				} else {
					variance = max( variance, 0.0000001 );
					float d = shadowCoord.z - mean;
					float p_max = variance / ( variance + d * d );
					p_max = clamp( ( p_max - 0.3 ) / 0.65, 0.0, 1.0 );
					shadow = max( hard_shadow, p_max );
				}
			}
			return mix( 1.0, shadow, shadowIntensity );
		}
	#else
		float getShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
			float shadow = 1.0;
			shadowCoord.xyz /= shadowCoord.w;
			#ifdef USE_REVERSED_DEPTH_BUFFER
				shadowCoord.z -= shadowBias;
			#else
				shadowCoord.z += shadowBias;
			#endif
			bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
			bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
			if ( frustumTest ) {
				float depth = texture2D( shadowMap, shadowCoord.xy ).r;
				#ifdef USE_REVERSED_DEPTH_BUFFER
					shadow = step( depth, shadowCoord.z );
				#else
					shadow = step( shadowCoord.z, depth );
				#endif
			}
			return mix( 1.0, shadow, shadowIntensity );
		}
	#endif
	#if NUM_SUN_LIGHT_SHADOWS > 0
		float getSunShadow(
			#if defined( SHADOWMAP_TYPE_PCF )
				sampler2DShadow shadowMap,
			#else
				sampler2D shadowMap,
			#endif
			SunLightShadow sunLightShadow,
			int shadowIndex
		) {
			vec4 shadowWorldPosition = vec4( vSunShadowWorldPosition.xyz + vSunShadowWorldNormal * sunLightShadow.shadowNormalBias, 1.0 );
			float viewDepth = vSunShadowWorldPosition.w;
			int cascadeOffset = shadowIndex * SUN_LIGHT_CASCADES;
			float shadow = 1.0;
			for ( int i = SUN_LIGHT_CASCADES - 1; i >= 0; i -- ) {
				vec4 cascade = sunShadowCascade[ cascadeOffset + i ];
				if ( viewDepth >= cascade.x && viewDepth < cascade.y ) {
					float cascadeShadow = getShadow(
						shadowMap,
						sunLightShadow.shadowMapSize,
						sunLightShadow.shadowIntensity,
						sunLightShadow.shadowBias,
						sunLightShadow.shadowRadius,
						sunShadowMatrix[ cascadeOffset + i ] * shadowWorldPosition
					);
					shadow = mix( cascadeShadow, shadow, smoothstep( cascade.z, cascade.y, viewDepth ) );
				}
			}
			return shadow;
		}
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
	#if defined( SHADOWMAP_TYPE_PCF )
	float getPointShadow( samplerCubeShadow shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord, float shadowCameraNear, float shadowCameraFar ) {
		float shadow = 1.0;
		vec3 lightToPosition = shadowCoord.xyz;
		vec3 bd3D = normalize( lightToPosition );
		vec3 absVec = abs( lightToPosition );
		float viewSpaceZ = max( max( absVec.x, absVec.y ), absVec.z );
		if ( viewSpaceZ - shadowCameraFar <= 0.0 && viewSpaceZ - shadowCameraNear >= 0.0 ) {
			#ifdef USE_REVERSED_DEPTH_BUFFER
				float dp = ( shadowCameraNear * ( shadowCameraFar - viewSpaceZ ) ) / ( viewSpaceZ * ( shadowCameraFar - shadowCameraNear ) );
				dp -= shadowBias;
			#else
				float dp = ( shadowCameraFar * ( viewSpaceZ - shadowCameraNear ) ) / ( viewSpaceZ * ( shadowCameraFar - shadowCameraNear ) );
				dp += shadowBias;
			#endif
			float texelSize = shadowRadius / shadowMapSize.x;
			vec3 absDir = abs( bd3D );
			vec3 tangent = absDir.x > absDir.z ? vec3( 0.0, 1.0, 0.0 ) : vec3( 1.0, 0.0, 0.0 );
			tangent = normalize( cross( bd3D, tangent ) );
			vec3 bitangent = cross( bd3D, tangent );
			float phi = interleavedGradientNoise( gl_FragCoord.xy ) * PI2;
			vec2 sample0 = vogelDiskSample( 0, 5, phi );
			vec2 sample1 = vogelDiskSample( 1, 5, phi );
			vec2 sample2 = vogelDiskSample( 2, 5, phi );
			vec2 sample3 = vogelDiskSample( 3, 5, phi );
			vec2 sample4 = vogelDiskSample( 4, 5, phi );
			shadow = (
				texture( shadowMap, vec4( bd3D + ( tangent * sample0.x + bitangent * sample0.y ) * texelSize, dp ) ) +
				texture( shadowMap, vec4( bd3D + ( tangent * sample1.x + bitangent * sample1.y ) * texelSize, dp ) ) +
				texture( shadowMap, vec4( bd3D + ( tangent * sample2.x + bitangent * sample2.y ) * texelSize, dp ) ) +
				texture( shadowMap, vec4( bd3D + ( tangent * sample3.x + bitangent * sample3.y ) * texelSize, dp ) ) +
				texture( shadowMap, vec4( bd3D + ( tangent * sample4.x + bitangent * sample4.y ) * texelSize, dp ) )
			) * 0.2;
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
	#elif defined( SHADOWMAP_TYPE_BASIC )
	float getPointShadow( samplerCube shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord, float shadowCameraNear, float shadowCameraFar ) {
		float shadow = 1.0;
		vec3 lightToPosition = shadowCoord.xyz;
		vec3 absVec = abs( lightToPosition );
		float viewSpaceZ = max( max( absVec.x, absVec.y ), absVec.z );
		if ( viewSpaceZ - shadowCameraFar <= 0.0 && viewSpaceZ - shadowCameraNear >= 0.0 ) {
			float dp = ( shadowCameraFar * ( viewSpaceZ - shadowCameraNear ) ) / ( viewSpaceZ * ( shadowCameraFar - shadowCameraNear ) );
			dp += shadowBias;
			vec3 bd3D = normalize( lightToPosition );
			float depth = textureCube( shadowMap, bd3D ).r;
			#ifdef USE_REVERSED_DEPTH_BUFFER
				depth = 1.0 - depth;
			#endif
			shadow = step( dp, depth );
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
	#endif
	#endif
#endif`,Jp=`#if NUM_SPOT_LIGHT_COORDS > 0
	uniform mat4 spotLightMatrix[ NUM_SPOT_LIGHT_COORDS ];
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_SUN_LIGHT_SHADOWS > 0
		varying vec4 vSunShadowWorldPosition;
		varying vec3 vSunShadowWorldNormal;
	#endif
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform mat4 directionalShadowMatrix[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		uniform mat4 pointShadowMatrix[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
#endif`,Qp=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_SUN_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
	#ifdef HAS_NORMAL
		vec3 shadowWorldNormal = transformNormalByInverseViewMatrix( transformedNormal, viewMatrix );
	#else
		vec3 shadowWorldNormal = vec3( 0.0 );
	#endif
	vec4 shadowWorldPosition;
#endif
#if defined( USE_SHADOWMAP )
	#if NUM_SUN_LIGHT_SHADOWS > 0
		vSunShadowWorldPosition = vec4( worldPosition.xyz, - mvPosition.z );
		vSunShadowWorldNormal = shadowWorldNormal;
	#endif
	#if NUM_DIR_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * directionalLightShadows[ i ].shadowNormalBias, 0 );
			vDirectionalShadowCoord[ i ] = directionalShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * pointLightShadows[ i ].shadowNormalBias, 0 );
			vPointShadowCoord[ i ] = pointShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
#endif
#if NUM_SPOT_LIGHT_COORDS > 0
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_COORDS; i ++ ) {
		shadowWorldPosition = worldPosition;
		#if ( defined( USE_SHADOWMAP ) && UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
			shadowWorldPosition.xyz += shadowWorldNormal * spotLightShadows[ i ].shadowNormalBias;
		#endif
		vSpotLightCoord[ i ] = spotLightMatrix[ i ] * shadowWorldPosition;
	}
	#pragma unroll_loop_end
#endif`,em=`float getShadowMask() {
	float shadow = 1.0;
	#ifdef USE_SHADOWMAP
	#if NUM_SUN_LIGHT_SHADOWS > 0
	SunLightShadow sunLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SUN_LIGHT_SHADOWS; i ++ ) {
		sunLight = sunLightShadows[ i ];
		shadow *= receiveShadow ? getSunShadow( sunShadowMap[ i ], sunLight, UNROLLED_LOOP_INDEX ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
		directionalLight = directionalLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( directionalShadowMap[ i ], directionalLight.shadowMapSize, directionalLight.shadowIntensity, directionalLight.shadowBias, directionalLight.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_SHADOWS; i ++ ) {
		spotLight = spotLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( spotShadowMap[ i ], spotLight.shadowMapSize, spotLight.shadowIntensity, spotLight.shadowBias, spotLight.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0 && ( defined( SHADOWMAP_TYPE_PCF ) || defined( SHADOWMAP_TYPE_BASIC ) )
	PointLightShadow pointLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
		pointLight = pointLightShadows[ i ];
		shadow *= receiveShadow ? getPointShadow( pointShadowMap[ i ], pointLight.shadowMapSize, pointLight.shadowIntensity, pointLight.shadowBias, pointLight.shadowRadius, vPointShadowCoord[ i ], pointLight.shadowCameraNear, pointLight.shadowCameraFar ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#endif
	return shadow;
}`,tm=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,nm=`#ifdef USE_SKINNING
	uniform mat4 bindMatrix;
	uniform mat4 bindMatrixInverse;
	uniform highp sampler2D boneTexture;
	mat4 getBoneMatrix( const in float i ) {
		int size = textureSize( boneTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( boneTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( boneTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( boneTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( boneTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
#endif`,im=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,sm=`#ifdef USE_SKINNING
	mat4 skinMatrix = mat4( 0.0 );
	skinMatrix += skinWeight.x * boneMatX;
	skinMatrix += skinWeight.y * boneMatY;
	skinMatrix += skinWeight.z * boneMatZ;
	skinMatrix += skinWeight.w * boneMatW;
	skinMatrix = bindMatrixInverse * skinMatrix * bindMatrix;
	objectNormal = vec4( skinMatrix * vec4( objectNormal, 0.0 ) ).xyz;
	#ifdef USE_TANGENT
		objectTangent = vec4( skinMatrix * vec4( objectTangent, 0.0 ) ).xyz;
	#endif
#endif`,rm=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,om=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,am=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,cm=`#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
uniform float toneMappingExposure;
vec3 LinearToneMapping( vec3 color ) {
	return saturate( toneMappingExposure * color );
}
vec3 ReinhardToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	return saturate( color / ( vec3( 1.0 ) + color ) );
}
vec3 CineonToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	color = max( vec3( 0.0 ), color - 0.004 );
	return pow( ( color * ( 6.2 * color + 0.5 ) ) / ( color * ( 6.2 * color + 1.7 ) + 0.06 ), vec3( 2.2 ) );
}
vec3 RRTAndODTFit( vec3 v ) {
	vec3 a = v * ( v + 0.0245786 ) - 0.000090537;
	vec3 b = v * ( 0.983729 * v + 0.4329510 ) + 0.238081;
	return a / b;
}
vec3 ACESFilmicToneMapping( vec3 color ) {
	const mat3 ACESInputMat = mat3(
		vec3( 0.59719, 0.07600, 0.02840 ),		vec3( 0.35458, 0.90834, 0.13383 ),
		vec3( 0.04823, 0.01566, 0.83777 )
	);
	const mat3 ACESOutputMat = mat3(
		vec3(  1.60475, -0.10208, -0.00327 ),		vec3( -0.53108,  1.10813, -0.07276 ),
		vec3( -0.07367, -0.00605,  1.07602 )
	);
	color *= toneMappingExposure / 0.6;
	color = ACESInputMat * color;
	color = RRTAndODTFit( color );
	color = ACESOutputMat * color;
	return saturate( color );
}
const mat3 LINEAR_REC2020_TO_LINEAR_SRGB = mat3(
	vec3( 1.6605, - 0.1246, - 0.0182 ),
	vec3( - 0.5876, 1.1329, - 0.1006 ),
	vec3( - 0.0728, - 0.0083, 1.1187 )
);
const mat3 LINEAR_SRGB_TO_LINEAR_REC2020 = mat3(
	vec3( 0.6274, 0.0691, 0.0164 ),
	vec3( 0.3293, 0.9195, 0.0880 ),
	vec3( 0.0433, 0.0113, 0.8956 )
);
vec3 agxDefaultContrastApprox( vec3 x ) {
	vec3 x2 = x * x;
	vec3 x4 = x2 * x2;
	return + 15.5 * x4 * x2
		- 40.14 * x4 * x
		+ 31.96 * x4
		- 6.868 * x2 * x
		+ 0.4298 * x2
		+ 0.1191 * x
		- 0.00232;
}
vec3 AgXToneMapping( vec3 color ) {
	const mat3 AgXInsetMatrix = mat3(
		vec3( 0.856627153315983, 0.137318972929847, 0.11189821299995 ),
		vec3( 0.0951212405381588, 0.761241990602591, 0.0767994186031903 ),
		vec3( 0.0482516061458583, 0.101439036467562, 0.811302368396859 )
	);
	const mat3 AgXOutsetMatrix = mat3(
		vec3( 1.1271005818144368, - 0.1413297634984383, - 0.14132976349843826 ),
		vec3( - 0.11060664309660323, 1.157823702216272, - 0.11060664309660294 ),
		vec3( - 0.016493938717834573, - 0.016493938717834257, 1.2519364065950405 )
	);
	const float AgxMinEv = - 12.47393;	const float AgxMaxEv = 4.026069;
	color *= toneMappingExposure;
	color = LINEAR_SRGB_TO_LINEAR_REC2020 * color;
	color = AgXInsetMatrix * color;
	color = max( color, 1e-10 );	color = log2( color );
	color = ( color - AgxMinEv ) / ( AgxMaxEv - AgxMinEv );
	color = clamp( color, 0.0, 1.0 );
	color = agxDefaultContrastApprox( color );
	color = AgXOutsetMatrix * color;
	color = pow( max( vec3( 0.0 ), color ), vec3( 2.2 ) );
	color = LINEAR_REC2020_TO_LINEAR_SRGB * color;
	color = clamp( color, 0.0, 1.0 );
	return color;
}
vec3 NeutralToneMapping( vec3 color ) {
	const float StartCompression = 0.8 - 0.04;
	const float Desaturation = 0.15;
	color *= toneMappingExposure;
	float x = min( color.r, min( color.g, color.b ) );
	float offset = x < 0.08 ? x - 6.25 * x * x : 0.04;
	color -= offset;
	float peak = max( color.r, max( color.g, color.b ) );
	if ( peak < StartCompression ) return color;
	float d = 1. - StartCompression;
	float newPeak = 1. - d * d / ( peak + d - StartCompression );
	color *= newPeak / peak;
	float g = 1. - 1. / ( Desaturation * ( peak - newPeak ) + 1. );
	return mix( color, vec3( newPeak ), g );
}
vec3 CustomToneMapping( vec3 color ) { return color; }`,lm=`#ifdef USE_TRANSMISSION
	material.transmission = transmission;
	material.transmissionAlpha = 1.0;
	material.thickness = thickness;
	material.attenuationDistance = attenuationDistance;
	material.attenuationColor = attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		material.transmission *= texture2D( transmissionMap, vTransmissionMapUv ).r;
	#endif
	#ifdef USE_THICKNESSMAP
		material.thickness *= texture2D( thicknessMap, vThicknessMapUv ).g;
	#endif
	vec3 pos = vWorldPosition;
	vec3 v = normalize( cameraPosition - pos );
	vec3 n = transformNormalByInverseViewMatrix( normal, viewMatrix );
	vec4 transmitted = getIBLVolumeRefraction(
		n, v, material.roughness, material.diffuseContribution, material.specularColorBlended, material.specularF90,
		pos, modelMatrix, viewMatrix, projectionMatrix, material.dispersion, material.ior, material.thickness,
		material.attenuationColor, material.attenuationDistance );
	material.transmissionAlpha = mix( material.transmissionAlpha, transmitted.a, material.transmission );
	totalDiffuse = mix( totalDiffuse, transmitted.rgb, material.transmission );
#endif`,hm=`#ifdef USE_TRANSMISSION
	uniform float transmission;
	uniform float thickness;
	uniform float attenuationDistance;
	uniform vec3 attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		uniform sampler2D transmissionMap;
	#endif
	#ifdef USE_THICKNESSMAP
		uniform sampler2D thicknessMap;
	#endif
	uniform vec2 transmissionSamplerSize;
	uniform sampler2D transmissionSamplerMap;
	uniform mat4 modelMatrix;
	uniform mat4 projectionMatrix;
	varying vec3 vWorldPosition;
	float w0( float a ) {
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - a + 3.0 ) - 3.0 ) + 1.0 );
	}
	float w1( float a ) {
		return ( 1.0 / 6.0 ) * ( a *  a * ( 3.0 * a - 6.0 ) + 4.0 );
	}
	float w2( float a ){
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - 3.0 * a + 3.0 ) + 3.0 ) + 1.0 );
	}
	float w3( float a ) {
		return ( 1.0 / 6.0 ) * ( a * a * a );
	}
	float g0( float a ) {
		return w0( a ) + w1( a );
	}
	float g1( float a ) {
		return w2( a ) + w3( a );
	}
	float h0( float a ) {
		return - 1.0 + w1( a ) / ( w0( a ) + w1( a ) );
	}
	float h1( float a ) {
		return 1.0 + w3( a ) / ( w2( a ) + w3( a ) );
	}
	vec4 bicubic( sampler2D tex, vec2 uv, vec4 texelSize, float lod ) {
		uv = uv * texelSize.zw + 0.5;
		vec2 iuv = floor( uv );
		vec2 fuv = fract( uv );
		float g0x = g0( fuv.x );
		float g1x = g1( fuv.x );
		float h0x = h0( fuv.x );
		float h1x = h1( fuv.x );
		float h0y = h0( fuv.y );
		float h1y = h1( fuv.y );
		vec2 p0 = ( vec2( iuv.x + h0x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p1 = ( vec2( iuv.x + h1x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p2 = ( vec2( iuv.x + h0x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		vec2 p3 = ( vec2( iuv.x + h1x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		return g0( fuv.y ) * ( g0x * textureLod( tex, p0, lod ) + g1x * textureLod( tex, p1, lod ) ) +
			g1( fuv.y ) * ( g0x * textureLod( tex, p2, lod ) + g1x * textureLod( tex, p3, lod ) );
	}
	vec4 textureBicubic( sampler2D sampler, vec2 uv, float lod ) {
		vec2 fLodSize = vec2( textureSize( sampler, int( lod ) ) );
		vec2 cLodSize = vec2( textureSize( sampler, int( lod + 1.0 ) ) );
		vec2 fLodSizeInv = 1.0 / fLodSize;
		vec2 cLodSizeInv = 1.0 / cLodSize;
		vec4 fSample = bicubic( sampler, uv, vec4( fLodSizeInv, fLodSize ), floor( lod ) );
		vec4 cSample = bicubic( sampler, uv, vec4( cLodSizeInv, cLodSize ), ceil( lod ) );
		return mix( fSample, cSample, fract( lod ) );
	}
	vec3 getVolumeTransmissionRay( const in vec3 n, const in vec3 v, const in float thickness, const in float ior, const in mat4 modelMatrix ) {
		vec3 refractionVector = refract( - v, normalize( n ), 1.0 / ior );
		vec3 modelScale;
		modelScale.x = length( vec3( modelMatrix[ 0 ].xyz ) );
		modelScale.y = length( vec3( modelMatrix[ 1 ].xyz ) );
		modelScale.z = length( vec3( modelMatrix[ 2 ].xyz ) );
		return normalize( refractionVector ) * thickness * modelScale;
	}
	float applyIorToRoughness( const in float roughness, const in float ior ) {
		return roughness * clamp( ior * 2.0 - 2.0, 0.0, 1.0 );
	}
	vec4 getTransmissionSample( const in vec2 fragCoord, const in float roughness, const in float ior ) {
		float lod = log2( transmissionSamplerSize.x ) * applyIorToRoughness( roughness, ior );
		return textureBicubic( transmissionSamplerMap, fragCoord.xy, lod );
	}
	vec3 volumeAttenuation( const in float transmissionDistance, const in vec3 attenuationColor, const in float attenuationDistance ) {
		if ( isinf( attenuationDistance ) ) {
			return vec3( 1.0 );
		} else {
			vec3 attenuationCoefficient = -log( attenuationColor ) / attenuationDistance;
			vec3 transmittance = exp( - attenuationCoefficient * transmissionDistance );			return transmittance;
		}
	}
	vec4 getIBLVolumeRefraction( const in vec3 n, const in vec3 v, const in float roughness, const in vec3 diffuseColor,
		const in vec3 specularColor, const in float specularF90, const in vec3 position, const in mat4 modelMatrix,
		const in mat4 viewMatrix, const in mat4 projMatrix, const in float dispersion, const in float ior, const in float thickness,
		const in vec3 attenuationColor, const in float attenuationDistance ) {
		vec4 transmittedLight;
		vec3 transmittance;
		#ifdef USE_DISPERSION
			float halfSpread = ( ior - 1.0 ) * 0.025 * dispersion;
			vec3 iors = vec3( ior - halfSpread, ior, ior + halfSpread );
			for ( int i = 0; i < 3; i ++ ) {
				vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, iors[ i ], modelMatrix );
				vec3 refractedRayExit = position + transmissionRay;
				vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
				vec2 refractionCoords = ndcPos.xy / ndcPos.w;
				refractionCoords += 1.0;
				refractionCoords /= 2.0;
				vec4 transmissionSample = getTransmissionSample( refractionCoords, roughness, iors[ i ] );
				transmittedLight[ i ] = transmissionSample[ i ];
				transmittedLight.a += transmissionSample.a;
				transmittance[ i ] = diffuseColor[ i ] * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance )[ i ];
			}
			transmittedLight.a /= 3.0;
		#else
			vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, ior, modelMatrix );
			vec3 refractedRayExit = position + transmissionRay;
			vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
			vec2 refractionCoords = ndcPos.xy / ndcPos.w;
			refractionCoords += 1.0;
			refractionCoords /= 2.0;
			transmittedLight = getTransmissionSample( refractionCoords, roughness, ior );
			transmittance = diffuseColor * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance );
		#endif
		vec3 attenuatedColor = transmittance * transmittedLight.rgb;
		vec3 F = EnvironmentBRDF( n, v, specularColor, specularF90, roughness );
		float transmittanceFactor = ( transmittance.r + transmittance.g + transmittance.b ) / 3.0;
		return vec4( ( 1.0 - F ) * attenuatedColor, 1.0 - ( 1.0 - transmittedLight.a ) * transmittanceFactor );
	}
#endif`,um=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_SPECULARMAP
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,dm=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	uniform mat3 mapTransform;
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	uniform mat3 alphaMapTransform;
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	uniform mat3 lightMapTransform;
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	uniform mat3 aoMapTransform;
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	uniform mat3 bumpMapTransform;
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	uniform mat3 normalMapTransform;
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_DISPLACEMENTMAP
	uniform mat3 displacementMapTransform;
	varying vec2 vDisplacementMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	uniform mat3 emissiveMapTransform;
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	uniform mat3 metalnessMapTransform;
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	uniform mat3 roughnessMapTransform;
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	uniform mat3 anisotropyMapTransform;
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	uniform mat3 clearcoatMapTransform;
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform mat3 clearcoatNormalMapTransform;
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform mat3 clearcoatRoughnessMapTransform;
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	uniform mat3 sheenColorMapTransform;
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	uniform mat3 sheenRoughnessMapTransform;
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	uniform mat3 iridescenceMapTransform;
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform mat3 iridescenceThicknessMapTransform;
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SPECULARMAP
	uniform mat3 specularMapTransform;
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	uniform mat3 specularColorMapTransform;
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	uniform mat3 specularIntensityMapTransform;
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,fm=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	vUv = vec3( uv, 1 ).xy;
#endif
#ifdef USE_MAP
	vMapUv = ( mapTransform * vec3( MAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ALPHAMAP
	vAlphaMapUv = ( alphaMapTransform * vec3( ALPHAMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_LIGHTMAP
	vLightMapUv = ( lightMapTransform * vec3( LIGHTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_AOMAP
	vAoMapUv = ( aoMapTransform * vec3( AOMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_BUMPMAP
	vBumpMapUv = ( bumpMapTransform * vec3( BUMPMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_NORMALMAP
	vNormalMapUv = ( normalMapTransform * vec3( NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_DISPLACEMENTMAP
	vDisplacementMapUv = ( displacementMapTransform * vec3( DISPLACEMENTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_EMISSIVEMAP
	vEmissiveMapUv = ( emissiveMapTransform * vec3( EMISSIVEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_METALNESSMAP
	vMetalnessMapUv = ( metalnessMapTransform * vec3( METALNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ROUGHNESSMAP
	vRoughnessMapUv = ( roughnessMapTransform * vec3( ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ANISOTROPYMAP
	vAnisotropyMapUv = ( anisotropyMapTransform * vec3( ANISOTROPYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOATMAP
	vClearcoatMapUv = ( clearcoatMapTransform * vec3( CLEARCOATMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	vClearcoatNormalMapUv = ( clearcoatNormalMapTransform * vec3( CLEARCOAT_NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	vClearcoatRoughnessMapUv = ( clearcoatRoughnessMapTransform * vec3( CLEARCOAT_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCEMAP
	vIridescenceMapUv = ( iridescenceMapTransform * vec3( IRIDESCENCEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	vIridescenceThicknessMapUv = ( iridescenceThicknessMapTransform * vec3( IRIDESCENCE_THICKNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_COLORMAP
	vSheenColorMapUv = ( sheenColorMapTransform * vec3( SHEEN_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	vSheenRoughnessMapUv = ( sheenRoughnessMapTransform * vec3( SHEEN_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULARMAP
	vSpecularMapUv = ( specularMapTransform * vec3( SPECULARMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_COLORMAP
	vSpecularColorMapUv = ( specularColorMapTransform * vec3( SPECULAR_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	vSpecularIntensityMapUv = ( specularIntensityMapTransform * vec3( SPECULAR_INTENSITYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_TRANSMISSIONMAP
	vTransmissionMapUv = ( transmissionMapTransform * vec3( TRANSMISSIONMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_THICKNESSMAP
	vThicknessMapUv = ( thicknessMapTransform * vec3( THICKNESSMAP_UV, 1 ) ).xy;
#endif`,pm=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`,mm=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,gm=`uniform sampler2D t2D;
uniform float backgroundIntensity;
varying vec2 vUv;
void main() {
	vec4 texColor = texture2D( t2D, vUv );
	#ifdef DECODE_VIDEO_TEXTURE
		texColor = vec4( mix( pow( texColor.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), texColor.rgb * 0.0773993808, vec3( lessThanEqual( texColor.rgb, vec3( 0.04045 ) ) ) ), texColor.w );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,_m=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,xm=`#ifdef ENVMAP_TYPE_CUBE
	uniform samplerCube envMap;
#elif defined( ENVMAP_TYPE_CUBE_UV )
	uniform sampler2D envMap;
#endif
uniform float backgroundBlurriness;
uniform float backgroundIntensity;
uniform mat3 backgroundRotation;
varying vec3 vWorldDirection;
#include <cube_uv_reflection_fragment>
void main() {
	#ifdef ENVMAP_TYPE_CUBE
		vec4 texColor = textureCube( envMap, backgroundRotation * vWorldDirection );
	#elif defined( ENVMAP_TYPE_CUBE_UV )
		vec4 texColor = textureCubeUV( envMap, backgroundRotation * vWorldDirection, backgroundBlurriness );
	#else
		vec4 texColor = vec4( 0.0, 0.0, 0.0, 1.0 );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,ym=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,vm=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Mm=`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
varying vec2 vHighPrecisionZW;
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vHighPrecisionZW = gl_Position.zw;
}`,bm=`#if DEPTH_PACKING == 3200
	uniform float opacity;
#endif
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
varying vec2 vHighPrecisionZW;
void main() {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#if DEPTH_PACKING == 3200
		diffuseColor.a = opacity;
	#endif
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <logdepthbuf_fragment>
	#ifdef USE_REVERSED_DEPTH_BUFFER
		float fragCoordZ = vHighPrecisionZW[ 0 ] / vHighPrecisionZW[ 1 ];
	#else
		float fragCoordZ = 0.5 * vHighPrecisionZW[ 0 ] / vHighPrecisionZW[ 1 ] + 0.5;
	#endif
	#if DEPTH_PACKING == 3200
		gl_FragColor = vec4( vec3( 1.0 - fragCoordZ ), opacity );
	#elif DEPTH_PACKING == 3201
		gl_FragColor = packDepthToRGBA( fragCoordZ );
	#elif DEPTH_PACKING == 3202
		gl_FragColor = vec4( packDepthToRGB( fragCoordZ ), 1.0 );
	#elif DEPTH_PACKING == 3203
		gl_FragColor = vec4( packDepthToRG( fragCoordZ ), 0.0, 1.0 );
	#endif
}`,Sm=`#define DISTANCE
varying vec3 vWorldPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <worldpos_vertex>
	#include <clipping_planes_vertex>
	vWorldPosition = worldPosition.xyz;
}`,wm=`#define DISTANCE
uniform vec3 referencePosition;
uniform float nearDistance;
uniform float farDistance;
varying vec3 vWorldPosition;
#include <common>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	float dist = length( vWorldPosition - referencePosition );
	dist = ( dist - nearDistance ) / ( farDistance - nearDistance );
	dist = saturate( dist );
	gl_FragColor = vec4( dist, 0.0, 0.0, 1.0 );
}`,Tm=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,Am=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Em=`uniform float scale;
attribute float lineDistance;
varying float vLineDistance;
#include <common>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	vLineDistance = scale * lineDistance;
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,Rm=`uniform vec3 diffuse;
uniform float opacity;
uniform float dashSize;
uniform float totalSize;
varying float vLineDistance;
#include <common>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	if ( mod( vLineDistance, totalSize ) > dashSize ) {
		discard;
	}
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,Cm=`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#if defined ( USE_ENVMAP ) || defined ( USE_SKINNING )
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinbase_vertex>
		#include <skinnormal_vertex>
		#include <defaultnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <fog_vertex>
}`,Im=`uniform vec3 diffuse;
uniform float opacity;
#ifndef FLAT_SHADED
	varying vec3 vNormal;
#endif
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		reflectedLight.indirectDiffuse += lightMapTexel.rgb * lightMapIntensity * RECIPROCAL_PI;
	#else
		reflectedLight.indirectDiffuse += vec3( 1.0 );
	#endif
	#include <aomap_fragment>
	reflectedLight.indirectDiffuse *= diffuseColor.rgb;
	vec3 outgoingLight = reflectedLight.indirectDiffuse;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,Pm=`#define LAMBERT
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,Lm=`#define LAMBERT
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <cube_uv_reflection_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_lambert_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_lambert_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,Dm=`#define MATCAP
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <displacementmap_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
	vViewPosition = - mvPosition.xyz;
}`,Nm=`#define MATCAP
uniform vec3 diffuse;
uniform float opacity;
uniform sampler2D matcap;
varying vec3 vViewPosition;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	vec3 viewDir = normalize( vViewPosition );
	vec3 x = normalize( vec3( viewDir.z, 0.0, - viewDir.x ) );
	vec3 y = cross( viewDir, x );
	vec2 uv = vec2( dot( x, normal ), dot( y, normal ) ) * 0.495 + 0.5;
	#ifdef USE_MATCAP
		vec4 matcapColor = texture2D( matcap, uv );
	#else
		vec4 matcapColor = vec4( vec3( mix( 0.2, 0.8, uv.y ) ), 1.0 );
	#endif
	vec3 outgoingLight = diffuseColor.rgb * matcapColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,Um=`#define NORMAL
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	vViewPosition = - mvPosition.xyz;
#endif
}`,Om=`#define NORMAL
uniform float opacity;
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <uv_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( 0.0, 0.0, 0.0, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	gl_FragColor = vec4( normalize( normal ) * 0.5 + 0.5, diffuseColor.a );
	#ifdef OPAQUE
		gl_FragColor.a = 1.0;
	#endif
}`,Fm=`#define PHONG
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,Bm=`#define PHONG
uniform vec3 diffuse;
uniform vec3 emissive;
uniform vec3 specular;
uniform float shininess;
uniform float opacity;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <cube_uv_reflection_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_phong_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_phong_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + reflectedLight.directSpecular + reflectedLight.indirectSpecular + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,km=`#define STANDARD
varying vec3 vViewPosition;
#ifdef USE_TRANSMISSION
	varying vec3 vWorldPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
#ifdef USE_TRANSMISSION
	vWorldPosition = worldPosition.xyz;
#endif
}`,zm=`#define STANDARD
#ifdef PHYSICAL
	#define IOR
	#define USE_SPECULAR
#endif
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float roughness;
uniform float metalness;
uniform float opacity;
#ifdef IOR
	uniform float ior;
#endif
#ifdef USE_SPECULAR
	uniform float specularIntensity;
	uniform vec3 specularColor;
	#ifdef USE_SPECULAR_COLORMAP
		uniform sampler2D specularColorMap;
	#endif
	#ifdef USE_SPECULAR_INTENSITYMAP
		uniform sampler2D specularIntensityMap;
	#endif
#endif
#ifdef USE_CLEARCOAT
	uniform float clearcoat;
	uniform float clearcoatRoughness;
#endif
#ifdef USE_DISPERSION
	uniform float dispersion;
#endif
#ifdef USE_RETROREFLECTION
	uniform float retroreflectivity;
#endif
#ifdef USE_IRIDESCENCE
	uniform float iridescence;
	uniform float iridescenceIOR;
	uniform float iridescenceThicknessMinimum;
	uniform float iridescenceThicknessMaximum;
#endif
#ifdef USE_SHEEN
	uniform vec3 sheenColor;
	uniform float sheenRoughness;
	#ifdef USE_SHEEN_COLORMAP
		uniform sampler2D sheenColorMap;
	#endif
	#ifdef USE_SHEEN_ROUGHNESSMAP
		uniform sampler2D sheenRoughnessMap;
	#endif
#endif
#ifdef USE_ANISOTROPY
	uniform vec2 anisotropyVector;
	#ifdef USE_ANISOTROPYMAP
		uniform sampler2D anisotropyMap;
	#endif
#endif
varying vec3 vViewPosition;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <iridescence_fragment>
#include <cube_uv_reflection_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_physical_pars_fragment>
#include <transmission_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <clearcoat_pars_fragment>
#include <iridescence_pars_fragment>
#include <roughnessmap_pars_fragment>
#include <metalnessmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <roughnessmap_fragment>
	#include <metalnessmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <clearcoat_normal_fragment_begin>
	#include <clearcoat_normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_physical_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 totalDiffuse = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse;
	vec3 totalSpecular = reflectedLight.directSpecular + reflectedLight.indirectSpecular;
	#include <transmission_fragment>
	vec3 outgoingLight = totalDiffuse + totalSpecular + totalEmissiveRadiance;
	#ifdef USE_SHEEN
 
		outgoingLight = outgoingLight + sheenSpecularDirect + sheenSpecularIndirect;
 
 	#endif
	#ifdef USE_CLEARCOAT
		float dotNVcc = saturate( dot( geometryClearcoatNormal, geometryViewDir ) );
		vec3 Fcc = F_Schlick( material.clearcoatF0, material.clearcoatF90, dotNVcc );
		outgoingLight = outgoingLight * ( 1.0 - material.clearcoat * Fcc ) + ( clearcoatSpecularDirect + clearcoatSpecularIndirect ) * material.clearcoat;
	#endif
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,Hm=`#define TOON
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,Vm=`#define TOON
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <gradientmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_toon_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_toon_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,Gm=`uniform float size;
uniform float scale;
#include <common>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
#ifdef USE_POINTS_UV
	varying vec2 vUv;
	uniform mat3 uvTransform;
#endif
void main() {
	#ifdef USE_POINTS_UV
		vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	#endif
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	gl_PointSize = size;
	#ifdef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) gl_PointSize *= ( scale / - mvPosition.z );
	#endif
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <fog_vertex>
}`,Wm=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <color_pars_fragment>
#include <map_particle_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_particle_fragment>
	#include <color_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,Xm=`#include <common>
#include <batching_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <shadowmap_pars_vertex>
void main() {
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,qm=`uniform vec3 color;
uniform float opacity;
#include <common>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <logdepthbuf_pars_fragment>
#include <shadowmap_pars_fragment>
#include <shadowmask_pars_fragment>
void main() {
	#include <logdepthbuf_fragment>
	gl_FragColor = vec4( color, opacity * ( 1.0 - getShadowMask() ) );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,Ym=`uniform float rotation;
uniform vec2 center;
#include <common>
#include <uv_pars_vertex>
#include <fog_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	vec4 mvPosition = modelViewMatrix[ 3 ];
	vec2 scale = vec2( length( modelMatrix[ 0 ].xyz ), length( modelMatrix[ 1 ].xyz ) );
	#ifndef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) scale *= - mvPosition.z;
	#endif
	vec2 alignedPosition = ( position.xy - ( center - vec2( 0.5 ) ) ) * scale;
	vec2 rotatedPosition;
	rotatedPosition.x = cos( rotation ) * alignedPosition.x - sin( rotation ) * alignedPosition.y;
	rotatedPosition.y = sin( rotation ) * alignedPosition.x + cos( rotation ) * alignedPosition.y;
	mvPosition.xy += rotatedPosition;
	gl_Position = projectionMatrix * mvPosition;
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,Zm=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
}`,Fe={alphahash_fragment:m1,alphahash_pars_fragment:g1,alphamap_fragment:_1,alphamap_pars_fragment:x1,alphatest_fragment:y1,alphatest_pars_fragment:v1,aomap_fragment:M1,aomap_pars_fragment:b1,batching_pars_vertex:S1,batching_vertex:w1,begin_vertex:T1,beginnormal_vertex:A1,bsdfs:E1,iridescence_fragment:R1,bumpmap_pars_fragment:C1,clipping_planes_fragment:I1,clipping_planes_pars_fragment:P1,clipping_planes_pars_vertex:L1,clipping_planes_vertex:D1,color_fragment:N1,color_pars_fragment:U1,color_pars_vertex:O1,color_vertex:F1,common:B1,cube_uv_reflection_fragment:k1,defaultnormal_vertex:z1,displacementmap_pars_vertex:H1,displacementmap_vertex:V1,emissivemap_fragment:G1,emissivemap_pars_fragment:W1,colorspace_fragment:X1,colorspace_pars_fragment:q1,envmap_fragment:Y1,envmap_common_pars_fragment:Z1,envmap_pars_fragment:K1,envmap_pars_vertex:$1,envmap_physical_pars_fragment:ap,envmap_vertex:j1,fog_vertex:J1,fog_pars_vertex:Q1,fog_fragment:ep,fog_pars_fragment:tp,gradientmap_pars_fragment:np,lightmap_pars_fragment:ip,lights_lambert_fragment:sp,lights_lambert_pars_fragment:rp,lights_pars_begin:op,lights_toon_fragment:cp,lights_toon_pars_fragment:lp,lights_phong_fragment:hp,lights_phong_pars_fragment:up,lights_physical_fragment:dp,lights_physical_pars_fragment:fp,lights_fragment_begin:pp,lights_fragment_maps:mp,lights_fragment_end:gp,lightprobes_pars_fragment:_p,logdepthbuf_fragment:xp,logdepthbuf_pars_fragment:yp,logdepthbuf_pars_vertex:vp,logdepthbuf_vertex:Mp,map_fragment:bp,map_pars_fragment:Sp,map_particle_fragment:wp,map_particle_pars_fragment:Tp,metalnessmap_fragment:Ap,metalnessmap_pars_fragment:Ep,morphinstance_vertex:Rp,morphcolor_vertex:Cp,morphnormal_vertex:Ip,morphtarget_pars_vertex:Pp,morphtarget_vertex:Lp,normal_fragment_begin:Dp,normal_fragment_maps:Np,normal_pars_fragment:Up,normal_pars_vertex:Op,normal_vertex:Fp,normalmap_pars_fragment:Bp,clearcoat_normal_fragment_begin:kp,clearcoat_normal_fragment_maps:zp,clearcoat_pars_fragment:Hp,iridescence_pars_fragment:Vp,opaque_fragment:Gp,packing:Wp,premultiplied_alpha_fragment:Xp,project_vertex:qp,dithering_fragment:Yp,dithering_pars_fragment:Zp,roughnessmap_fragment:Kp,roughnessmap_pars_fragment:$p,shadowmap_pars_fragment:jp,shadowmap_pars_vertex:Jp,shadowmap_vertex:Qp,shadowmask_pars_fragment:em,skinbase_vertex:tm,skinning_pars_vertex:nm,skinning_vertex:im,skinnormal_vertex:sm,specularmap_fragment:rm,specularmap_pars_fragment:om,tonemapping_fragment:am,tonemapping_pars_fragment:cm,transmission_fragment:lm,transmission_pars_fragment:hm,uv_pars_fragment:um,uv_pars_vertex:dm,uv_vertex:fm,worldpos_vertex:pm,background_vert:mm,background_frag:gm,backgroundCube_vert:_m,backgroundCube_frag:xm,cube_vert:ym,cube_frag:vm,depth_vert:Mm,depth_frag:bm,distance_vert:Sm,distance_frag:wm,equirect_vert:Tm,equirect_frag:Am,linedashed_vert:Em,linedashed_frag:Rm,meshbasic_vert:Cm,meshbasic_frag:Im,meshlambert_vert:Pm,meshlambert_frag:Lm,meshmatcap_vert:Dm,meshmatcap_frag:Nm,meshnormal_vert:Um,meshnormal_frag:Om,meshphong_vert:Fm,meshphong_frag:Bm,meshphysical_vert:km,meshphysical_frag:zm,meshtoon_vert:Hm,meshtoon_frag:Vm,points_vert:Gm,points_frag:Wm,shadow_vert:Xm,shadow_frag:qm,sprite_vert:Ym,sprite_frag:Zm},he={common:{diffuse:{value:new pe(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new Le},alphaMap:{value:null},alphaMapTransform:{value:new Le},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new Le}},envmap:{envMap:{value:null},envMapRotation:{value:new Le},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98},dfgLUT:{value:null}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new Le}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new Le}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new Le},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new Le},normalScale:{value:new we(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new Le},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new Le}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new Le}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new Le}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new pe(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},sunLights:{value:[],properties:{direction:{},color:{}}},sunLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},sunShadowMatrix:{value:[]},sunShadowCascade:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null},probesSH:{value:null},probesMin:{value:new N},probesMax:{value:new N},probesResolution:{value:new N}},points:{diffuse:{value:new pe(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new Le},alphaTest:{value:0},uvTransform:{value:new Le}},sprite:{diffuse:{value:new pe(16777215)},opacity:{value:1},center:{value:new we(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new Le},alphaMap:{value:null},alphaMapTransform:{value:new Le},alphaTest:{value:0}}},Gn={basic:{uniforms:qt([he.common,he.specularmap,he.envmap,he.aomap,he.lightmap,he.fog]),vertexShader:Fe.meshbasic_vert,fragmentShader:Fe.meshbasic_frag},lambert:{uniforms:qt([he.common,he.specularmap,he.envmap,he.aomap,he.lightmap,he.emissivemap,he.bumpmap,he.normalmap,he.displacementmap,he.fog,he.lights,{emissive:{value:new pe(0)},envMapIntensity:{value:1}}]),vertexShader:Fe.meshlambert_vert,fragmentShader:Fe.meshlambert_frag},phong:{uniforms:qt([he.common,he.specularmap,he.envmap,he.aomap,he.lightmap,he.emissivemap,he.bumpmap,he.normalmap,he.displacementmap,he.fog,he.lights,{emissive:{value:new pe(0)},specular:{value:new pe(1118481)},shininess:{value:30},envMapIntensity:{value:1}}]),vertexShader:Fe.meshphong_vert,fragmentShader:Fe.meshphong_frag},standard:{uniforms:qt([he.common,he.envmap,he.aomap,he.lightmap,he.emissivemap,he.bumpmap,he.normalmap,he.displacementmap,he.roughnessmap,he.metalnessmap,he.fog,he.lights,{emissive:{value:new pe(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:Fe.meshphysical_vert,fragmentShader:Fe.meshphysical_frag},toon:{uniforms:qt([he.common,he.aomap,he.lightmap,he.emissivemap,he.bumpmap,he.normalmap,he.displacementmap,he.gradientmap,he.fog,he.lights,{emissive:{value:new pe(0)}}]),vertexShader:Fe.meshtoon_vert,fragmentShader:Fe.meshtoon_frag},matcap:{uniforms:qt([he.common,he.bumpmap,he.normalmap,he.displacementmap,he.fog,{matcap:{value:null}}]),vertexShader:Fe.meshmatcap_vert,fragmentShader:Fe.meshmatcap_frag},points:{uniforms:qt([he.points,he.fog]),vertexShader:Fe.points_vert,fragmentShader:Fe.points_frag},dashed:{uniforms:qt([he.common,he.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:Fe.linedashed_vert,fragmentShader:Fe.linedashed_frag},depth:{uniforms:qt([he.common,he.displacementmap]),vertexShader:Fe.depth_vert,fragmentShader:Fe.depth_frag},normal:{uniforms:qt([he.common,he.bumpmap,he.normalmap,he.displacementmap,{opacity:{value:1}}]),vertexShader:Fe.meshnormal_vert,fragmentShader:Fe.meshnormal_frag},sprite:{uniforms:qt([he.sprite,he.fog]),vertexShader:Fe.sprite_vert,fragmentShader:Fe.sprite_frag},background:{uniforms:{uvTransform:{value:new Le},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:Fe.background_vert,fragmentShader:Fe.background_frag},backgroundCube:{uniforms:{envMap:{value:null},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new Le}},vertexShader:Fe.backgroundCube_vert,fragmentShader:Fe.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:Fe.cube_vert,fragmentShader:Fe.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:Fe.equirect_vert,fragmentShader:Fe.equirect_frag},distance:{uniforms:qt([he.common,he.displacementmap,{referencePosition:{value:new N},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:Fe.distance_vert,fragmentShader:Fe.distance_frag},shadow:{uniforms:qt([he.lights,he.fog,{color:{value:new pe(0)},opacity:{value:1}}]),vertexShader:Fe.shadow_vert,fragmentShader:Fe.shadow_frag}};Gn.physical={uniforms:qt([Gn.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new Le},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new Le},clearcoatNormalScale:{value:new we(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new Le},dispersion:{value:0},retroreflectivity:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new Le},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new Le},sheen:{value:0},sheenColor:{value:new pe(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new Le},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new Le},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new Le},transmissionSamplerSize:{value:new we},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new Le},attenuationDistance:{value:0},attenuationColor:{value:new pe(0)},specularColor:{value:new pe(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new Le},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new Le},anisotropyVector:{value:new we},anisotropyMap:{value:null},anisotropyMapTransform:{value:new Le}}]),vertexShader:Fe.meshphysical_vert,fragmentShader:Fe.meshphysical_frag};var pc={r:0,b:0,g:0},Km=new Ue,hd=new Le;hd.set(-1,0,0,0,1,0,0,0,1);function $m(i,e,t,n,s,r){let o=new pe(0),a=s===!0?0:1,c,l,h=null,d=0,u=null;function p(v){let T=v.isScene===!0?v.background:null;if(T&&T.isTexture){let y=v.backgroundBlurriness>0;T=e.get(T,y)}return T}function g(v){let T=!1,y=p(v);y===null?m(o,a):y&&y.isColor&&(m(y,1),T=!0);let S=i.xr.getEnvironmentBlendMode();S==="additive"?t.buffers.color.setClear(0,0,0,1,r):S==="alpha-blend"&&t.buffers.color.setClear(0,0,0,0,r),(i.autoClear||T)&&(t.buffers.depth.setTest(!0),t.buffers.depth.setMask(!0),t.buffers.color.setMask(!0),i.clear(i.autoClearColor,i.autoClearDepth,i.autoClearStencil))}function b(v,T){let y=p(T);y&&(y.isCubeTexture||y.mapping===eo)?(l===void 0&&(l=new Ke(new Ii(1,1,1),new sn({name:"BackgroundCubeMaterial",uniforms:us(Gn.backgroundCube.uniforms),vertexShader:Gn.backgroundCube.vertexShader,fragmentShader:Gn.backgroundCube.fragmentShader,side:zt,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),l.geometry.deleteAttribute("normal"),l.geometry.deleteAttribute("uv"),l.onBeforeRender=function(S,w,R){this.matrixWorld.copyPosition(R.matrixWorld)},Object.defineProperty(l.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),n.update(l)),l.material.uniforms.envMap.value=y,l.material.uniforms.backgroundBlurriness.value=T.backgroundBlurriness,l.material.uniforms.backgroundIntensity.value=T.backgroundIntensity,l.material.uniforms.backgroundRotation.value.setFromMatrix4(Km.makeRotationFromEuler(T.backgroundRotation)).transpose(),y.isCubeTexture&&y.isRenderTargetTexture===!1&&l.material.uniforms.backgroundRotation.value.premultiply(hd),l.material.toneMapped=Be.getTransfer(y.colorSpace)!==Je,(h!==y||d!==y.version||u!==i.toneMapping)&&(l.material.needsUpdate=!0,h=y,d=y.version,u=i.toneMapping),l.layers.enableAll(),v.unshift(l,l.geometry,l.material,0,0,null)):y&&y.isTexture&&(c===void 0&&(c=new Ke(new ii(2,2),new sn({name:"BackgroundMaterial",uniforms:us(Gn.background.uniforms),vertexShader:Gn.background.vertexShader,fragmentShader:Gn.background.fragmentShader,side:vn,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),c.geometry.deleteAttribute("normal"),Object.defineProperty(c.material,"map",{get:function(){return this.uniforms.t2D.value}}),n.update(c)),c.material.uniforms.t2D.value=y,c.material.uniforms.backgroundIntensity.value=T.backgroundIntensity,c.material.toneMapped=Be.getTransfer(y.colorSpace)!==Je,y.matrixAutoUpdate===!0&&y.updateMatrix(),c.material.uniforms.uvTransform.value.copy(y.matrix),(h!==y||d!==y.version||u!==i.toneMapping)&&(c.material.needsUpdate=!0,h=y,d=y.version,u=i.toneMapping),c.layers.enableAll(),v.unshift(c,c.geometry,c.material,0,0,null))}function m(v,T){v.getRGB(pc,Vl(i)),t.buffers.color.setClear(pc.r,pc.g,pc.b,T,r)}function f(){l!==void 0&&(l.geometry.dispose(),l.material.dispose(),l=void 0),c!==void 0&&(c.geometry.dispose(),c.material.dispose(),c=void 0)}return{getClearColor:function(){return o},setClearColor:function(v,T=1){o.set(v),a=T,m(o,a)},getClearAlpha:function(){return a},setClearAlpha:function(v){a=v,m(o,a)},render:g,addToRenderList:b,dispose:f}}function jm(i,e){let t=i.getParameter(i.MAX_VERTEX_ATTRIBS),n={},s=u(null),r=s,o=!1;function a(L,O,W,I,B){let V=!1,X=d(L,I,W,O);r!==X&&(r=X,l(r.object)),V=p(L,I,W,B),V&&g(L,I,W,B),B!==null&&e.update(B,i.ELEMENT_ARRAY_BUFFER),(V||o)&&(o=!1,y(L,O,W,I),B!==null&&i.bindBuffer(i.ELEMENT_ARRAY_BUFFER,e.get(B).buffer))}function c(){return i.createVertexArray()}function l(L){return i.bindVertexArray(L)}function h(L){return i.deleteVertexArray(L)}function d(L,O,W,I){let B=I.wireframe===!0,V=n[O.id];V===void 0&&(V={},n[O.id]=V);let X=L.isInstancedMesh===!0?L.id:0,j=V[X];j===void 0&&(j={},V[X]=j);let H=j[W.id];H===void 0&&(H={},j[W.id]=H);let Y=H[B];return Y===void 0&&(Y=u(c()),H[B]=Y),Y}function u(L){let O=[],W=[],I=[];for(let B=0;B<t;B++)O[B]=0,W[B]=0,I[B]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:O,enabledAttributes:W,attributeDivisors:I,object:L,attributes:{},index:null}}function p(L,O,W,I){let B=r.attributes,V=O.attributes,X=0,j=W.getAttributes();for(let H in j)if(j[H].location>=0){let ee=B[H],Te=V[H];if(Te===void 0&&(H==="instanceMatrix"&&L.instanceMatrix&&(Te=L.instanceMatrix),H==="instanceColor"&&L.instanceColor&&(Te=L.instanceColor)),ee===void 0||ee.attribute!==Te||Te&&ee.data!==Te.data)return!0;X++}return r.attributesNum!==X||r.index!==I}function g(L,O,W,I){let B={},V=O.attributes,X=0,j=W.getAttributes();for(let H in j)if(j[H].location>=0){let ee=V[H];ee===void 0&&(H==="instanceMatrix"&&L.instanceMatrix&&(ee=L.instanceMatrix),H==="instanceColor"&&L.instanceColor&&(ee=L.instanceColor));let Te={};Te.attribute=ee,ee&&ee.data&&(Te.data=ee.data),B[H]=Te,X++}r.attributes=B,r.attributesNum=X,r.index=I}function b(){let L=r.newAttributes;for(let O=0,W=L.length;O<W;O++)L[O]=0}function m(L){f(L,0)}function f(L,O){let W=r.newAttributes,I=r.enabledAttributes,B=r.attributeDivisors;W[L]=1,I[L]===0&&(i.enableVertexAttribArray(L),I[L]=1),B[L]!==O&&(i.vertexAttribDivisor(L,O),B[L]=O)}function v(){let L=r.newAttributes,O=r.enabledAttributes;for(let W=0,I=O.length;W<I;W++)O[W]!==L[W]&&(i.disableVertexAttribArray(W),O[W]=0)}function T(L,O,W,I,B,V,X){X===!0?i.vertexAttribIPointer(L,O,W,B,V):i.vertexAttribPointer(L,O,W,I,B,V)}function y(L,O,W,I){b();let B=I.attributes,V=W.getAttributes(),X=O.defaultAttributeValues;for(let j in V){let H=V[j];if(H.location>=0){let Y=B[j];if(Y===void 0&&(j==="instanceMatrix"&&L.instanceMatrix&&(Y=L.instanceMatrix),j==="instanceColor"&&L.instanceColor&&(Y=L.instanceColor)),Y!==void 0){let ee=Y.normalized,Te=Y.itemSize,Me=e.get(Y);if(Me===void 0)continue;let ot=Me.buffer,Xe=Me.type,Ze=Me.bytesPerElement,K=Xe===i.INT||Xe===i.UNSIGNED_INT||Y.gpuType===Ca;if(Y.isInterleavedBufferAttribute){let te=Y.data,xe=te.stride,De=Y.offset;if(te.isInstancedInterleavedBuffer){for(let ge=0;ge<H.locationSize;ge++)f(H.location+ge,te.meshPerAttribute);L.isInstancedMesh!==!0&&I._maxInstanceCount===void 0&&(I._maxInstanceCount=te.meshPerAttribute*te.count)}else for(let ge=0;ge<H.locationSize;ge++)m(H.location+ge);i.bindBuffer(i.ARRAY_BUFFER,ot);for(let ge=0;ge<H.locationSize;ge++)T(H.location+ge,Te/H.locationSize,Xe,ee,xe*Ze,(De+Te/H.locationSize*ge)*Ze,K)}else{if(Y.isInstancedBufferAttribute){for(let te=0;te<H.locationSize;te++)f(H.location+te,Y.meshPerAttribute);L.isInstancedMesh!==!0&&I._maxInstanceCount===void 0&&(I._maxInstanceCount=Y.meshPerAttribute*Y.count)}else for(let te=0;te<H.locationSize;te++)m(H.location+te);i.bindBuffer(i.ARRAY_BUFFER,ot);for(let te=0;te<H.locationSize;te++)T(H.location+te,Te/H.locationSize,Xe,ee,Te*Ze,Te/H.locationSize*te*Ze,K)}}else if(X!==void 0){let ee=X[j];if(ee!==void 0)switch(ee.length){case 2:i.vertexAttrib2fv(H.location,ee);break;case 3:i.vertexAttrib3fv(H.location,ee);break;case 4:i.vertexAttrib4fv(H.location,ee);break;default:i.vertexAttrib1fv(H.location,ee)}}}}v()}function S(){A();for(let L in n){let O=n[L];for(let W in O){let I=O[W];for(let B in I){let V=I[B];for(let X in V)h(V[X].object),delete V[X];delete I[B]}}delete n[L]}}function w(L){if(n[L.id]===void 0)return;let O=n[L.id];for(let W in O){let I=O[W];for(let B in I){let V=I[B];for(let X in V)h(V[X].object),delete V[X];delete I[B]}}delete n[L.id]}function R(L){for(let O in n){let W=n[O];for(let I in W){let B=W[I];if(B[L.id]===void 0)continue;let V=B[L.id];for(let X in V)h(V[X].object),delete V[X];delete B[L.id]}}}function x(L){for(let O in n){let W=n[O],I=L.isInstancedMesh===!0?L.id:0,B=W[I];if(B!==void 0){for(let V in B){let X=B[V];for(let j in X)h(X[j].object),delete X[j];delete B[V]}delete W[I],Object.keys(W).length===0&&delete n[O]}}}function A(){C(),o=!0,r!==s&&(r=s,l(r.object))}function C(){s.geometry=null,s.program=null,s.wireframe=!1}return{setup:a,reset:A,resetDefaultState:C,dispose:S,releaseStatesOfGeometry:w,releaseStatesOfObject:x,releaseStatesOfProgram:R,initAttributes:b,enableAttribute:m,disableUnusedAttributes:v}}function Jm(i,e,t){let n;function s(c){n=c}function r(c,l){i.drawArrays(n,c,l),t.update(l,n,1)}function o(c,l,h){h!==0&&(i.drawArraysInstanced(n,c,l,h),t.update(l,n,h))}function a(c,l,h){if(h===0)return;e.get("WEBGL_multi_draw").multiDrawArraysWEBGL(n,c,0,l,0,h);let u=0;for(let p=0;p<h;p++)u+=l[p];t.update(u,n,1)}this.setMode=s,this.render=r,this.renderInstances=o,this.renderMultiDraw=a}function Qm(i,e,t,n){let s;function r(){if(s!==void 0)return s;if(e.has("EXT_texture_filter_anisotropic")===!0){let R=e.get("EXT_texture_filter_anisotropic");s=i.getParameter(R.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else s=0;return s}function o(R){return!(R!==fn&&n.convert(R)!==i.getParameter(i.IMPLEMENTATION_COLOR_READ_FORMAT))}function a(R){let x=R===Nn&&(e.has("EXT_color_buffer_half_float")||e.has("EXT_color_buffer_float"));return!(R!==Xt&&R!==dn&&!x&&n.convert(R)!==i.getParameter(i.IMPLEMENTATION_COLOR_READ_TYPE))}function c(R){if(R==="highp"){if(i.getShaderPrecisionFormat(i.VERTEX_SHADER,i.HIGH_FLOAT).precision>0&&i.getShaderPrecisionFormat(i.FRAGMENT_SHADER,i.HIGH_FLOAT).precision>0)return"highp";R="mediump"}return R==="mediump"&&i.getShaderPrecisionFormat(i.VERTEX_SHADER,i.MEDIUM_FLOAT).precision>0&&i.getShaderPrecisionFormat(i.FRAGMENT_SHADER,i.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}let l=t.precision!==void 0?t.precision:"highp",h=c(l);h!==l&&(Ae("WebGLRenderer:",l,"not supported, using",h,"instead."),l=h);let d=t.logarithmicDepthBuffer===!0,u=t.reversedDepthBuffer===!0&&e.has("EXT_clip_control");t.reversedDepthBuffer===!0&&u===!1&&Ae("WebGLRenderer: Unable to use reversed depth buffer due to missing EXT_clip_control extension. Fallback to default depth buffer.");let p=i.getParameter(i.MAX_TEXTURE_IMAGE_UNITS),g=i.getParameter(i.MAX_VERTEX_TEXTURE_IMAGE_UNITS),b=i.getParameter(i.MAX_TEXTURE_SIZE),m=i.getParameter(i.MAX_CUBE_MAP_TEXTURE_SIZE),f=i.getParameter(i.MAX_VERTEX_ATTRIBS),v=i.getParameter(i.MAX_VERTEX_UNIFORM_VECTORS),T=i.getParameter(i.MAX_VARYING_VECTORS),y=i.getParameter(i.MAX_FRAGMENT_UNIFORM_VECTORS),S=i.getParameter(i.MAX_SAMPLES),w=i.getParameter(i.SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:r,getMaxPrecision:c,textureFormatReadable:o,textureTypeReadable:a,precision:l,logarithmicDepthBuffer:d,reversedDepthBuffer:u,maxTextures:p,maxVertexTextures:g,maxTextureSize:b,maxCubemapSize:m,maxAttributes:f,maxVertexUniforms:v,maxVaryings:T,maxFragmentUniforms:y,maxSamples:S,samples:w}}function e2(i){let e=this,t=null,n=0,s=!1,r=!1,o=new hn,a=new Le,c={value:null,needsUpdate:!1};this.uniform=c,this.numPlanes=0,this.numIntersection=0,this.init=function(d,u){let p=d.length!==0||u||n!==0||s;return s=u,n=d.length,p},this.beginShadows=function(){r=!0,h(null)},this.endShadows=function(){r=!1},this.setGlobalState=function(d,u){t=h(d,u,0)},this.setState=function(d,u,p){let g=d.clippingPlanes,b=d.clipIntersection,m=d.clipShadows,f=i.get(d);if(!s||g===null||g.length===0||r&&!m)r?h(null):l();else{let v=r?0:n,T=v*4,y=f.clippingState||null;c.value=y,y=h(g,u,T,p);for(let S=0;S!==T;++S)y[S]=t[S];f.clippingState=y,this.numIntersection=b?this.numPlanes:0,this.numPlanes+=v}};function l(){c.value!==t&&(c.value=t,c.needsUpdate=n>0),e.numPlanes=n,e.numIntersection=0}function h(d,u,p,g){let b=d!==null?d.length:0,m=null;if(b!==0){if(m=c.value,g!==!0||m===null){let f=p+b*4,v=u.matrixWorldInverse;a.getNormalMatrix(v),(m===null||m.length<f)&&(m=new Float32Array(f));for(let T=0,y=p;T!==b;++T,y+=4)o.copy(d[T]).applyMatrix4(v,a),o.normal.toArray(m,y),m[y+3]=o.constant}c.value=m,c.needsUpdate=!0}return e.numPlanes=b,e.numIntersection=0,m}}var or=4,t2=6,n2=20,i2=256,lo=new Li,Vu=new pe,ql=null,Yl=0,Zl=0,Kl=!1,s2=new N,ds=new N,Bi=class{constructor(e){this._renderer=e,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._sizeLods=[],this._lodMeshes=[],this._backgroundBox=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._blurMaterial=null,this._ggxMaterial=null}fromScene(e,t=0,n=.1,s=100,r={}){let{size:o=256,position:a=s2}=r;ql=this._renderer.getRenderTarget(),Yl=this._renderer.getActiveCubeFace(),Zl=this._renderer.getActiveMipmapLevel(),Kl=this._renderer.xr.enabled,this._renderer.xr.enabled=!1,this._setSize(o);let c=this._allocateTargets();return c.depthBuffer=!0,this._sceneToCubeUV(e,n,s,c,a),t>0&&this._blur(c,0,0,t),this._applyPMREM(c),this._cleanup(c),c}fromEquirectangular(e,t=null){return this._fromTexture(e,t)}fromCubemap(e,t=null){return this._fromTexture(e,t)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=Xu(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=Wu(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose(),this._backgroundBox!==null&&(this._backgroundBox.geometry.dispose(),this._backgroundBox.material.dispose())}_setSize(e){this._lodMax=Math.floor(Math.log2(e)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._ggxMaterial!==null&&this._ggxMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let e=0;e<this._lodMeshes.length;e++)this._lodMeshes[e].geometry.dispose()}_cleanup(e){this._renderer.setRenderTarget(ql,Yl,Zl),this._renderer.xr.enabled=Kl,e.scissorTest=!1,rr(e,0,0,e.width,e.height)}_fromTexture(e,t){e.mapping===Ui||e.mapping===ls?this._setSize(e.image.length===0?16:e.image[0].width||e.image[0].image.width):this._setSize(e.image.width/4),ql=this._renderer.getRenderTarget(),Yl=this._renderer.getActiveCubeFace(),Zl=this._renderer.getActiveMipmapLevel(),Kl=this._renderer.xr.enabled,this._renderer.xr.enabled=!1;let n=t||this._allocateTargets();return this._textureToCubeUV(e,n),this._applyPMREM(n),this._cleanup(n),n}_allocateTargets(){let e=3*Math.max(this._cubeSize,112),t=4*this._cubeSize,n={magFilter:gt,minFilter:gt,generateMipmaps:!1,type:Nn,format:fn,colorSpace:$t,depthBuffer:!1},s=Gu(e,t,n);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==e||this._pingPongRenderTarget.height!==t){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=Gu(e,t,n);let{_lodMax:r}=this;({lodMeshes:this._lodMeshes,sizeLods:this._sizeLods}=r2(r)),this._blurMaterial=a2(r,e,t),this._ggxMaterial=o2(r,e,t)}return s}_compileMaterial(e){let t=new Ke(new bt,e);this._renderer.compile(t,lo)}_sceneToCubeUV(e,t,n,s,r){let c=new xt(90,1,t,n),l=[1,-1,1,1,1,1],h=[1,1,1,-1,-1,-1],d=this._renderer,u=d.autoClear,p=d.toneMapping;d.getClearColor(Vu),d.toneMapping=Ln,d.autoClear=!1,d.state.buffers.depth.getReversed()&&(d.setRenderTarget(s),d.clearDepth(),d.setRenderTarget(null)),this._backgroundBox===null&&(this._backgroundBox=new Ke(new Ii,new yn({name:"PMREM.Background",side:zt,depthWrite:!1,depthTest:!1})));let b=this._backgroundBox,m=b.material,f=!1,v=e.background;v?v.isColor&&(m.color.copy(v),e.background=null,f=!0):(m.color.copy(Vu),f=!0);for(let T=0;T<6;T++){let y=T%3;y===0?(c.up.set(0,l[T],0),c.position.set(r.x,r.y,r.z),c.lookAt(r.x+h[T],r.y,r.z)):y===1?(c.up.set(0,0,l[T]),c.position.set(r.x,r.y,r.z),c.lookAt(r.x,r.y+h[T],r.z)):(c.up.set(0,l[T],0),c.position.set(r.x,r.y,r.z),c.lookAt(r.x,r.y,r.z+h[T]));let S=this._cubeSize;rr(s,y*S,T>2?S:0,S,S),d.setRenderTarget(s),f&&d.render(b,c),d.render(e,c)}d.toneMapping=p,d.autoClear=u,e.background=v}_textureToCubeUV(e,t){let n=this._renderer,s=e.mapping===Ui||e.mapping===ls;s?(this._cubemapMaterial===null&&(this._cubemapMaterial=Xu()),this._cubemapMaterial.uniforms.flipEnvMap.value=e.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=Wu());let r=s?this._cubemapMaterial:this._equirectMaterial,o=this._lodMeshes[0];o.material=r;let a=r.uniforms;a.envMap.value=e;let c=this._cubeSize;rr(t,0,0,3*c,2*c),n.setRenderTarget(t),n.render(o,lo)}_applyPMREM(e){let t=this._renderer,n=t.autoClear;t.autoClear=!1;let s=this._lodMeshes.length;for(let r=1;r<s;r++)this._applyGGXFilter(e,r-1,r);t.autoClear=n}_applyGGXFilter(e,t,n){let s=this._renderer,r=this._pingPongRenderTarget,o=this._ggxMaterial,a=this._lodMeshes[n];a.material=o;let c=o.uniforms,l=n/(this._lodMeshes.length-1),h=t/(this._lodMeshes.length-1),d=Math.sqrt(l*l-h*h),u=l*1.25,p=d*u,{_lodMax:g}=this,b=this._sizeLods[n],m=3*b*(n>g-or?n-g+or:0),f=4*(this._cubeSize-b);c.envMap.value=e.texture,c.roughness.value=p,c.mipInt.value=g-t,rr(r,m,f,3*b,2*b),s.setRenderTarget(r),s.render(a,lo),c.envMap.value=r.texture,c.roughness.value=0,c.mipInt.value=g-n,rr(e,m,f,3*b,2*b),s.setRenderTarget(e),s.render(a,lo)}_blur(e,t,n,s){let r=this._pingPongRenderTarget,o=Math.min(s,Math.PI)/Math.SQRT2;this._blurPass(e,r,t,n,o),this._blurPass(r,e,n,n,o)}_blurPass(e,t,n,s,r){let o=this._renderer,a=this._blurMaterial,c=this._lodMeshes[s];c.material=a;let l=a.uniforms;l.envMap.value=e.texture,l.sigma.value=r,l.mipInt.value=this._lodMax-n;let h=this._sizeLods[s],d=3*h*(s>this._lodMax-or?s-this._lodMax+or:0),u=4*(this._cubeSize-h);rr(t,d,u,3*h,2*h),o.setRenderTarget(t),o.render(c,lo)}};function r2(i){let e=[],t=[],n=i,s=i-or+1+t2;for(let r=0;r<s;r++){let o=Math.pow(2,n);e.push(o);let a=1/(o-2),c=-a,l=1+a,h=[c,c,l,c,l,l,c,c,l,l,c,l],d=6,u=6,p=3,g=new Float32Array(p*u*d),b=new Float32Array(p*u*d);for(let f=0;f<d;f++){let v=f%3*2/3-1,T=f>2?0:-1,y=[v,T,0,v+2/3,T,0,v+2/3,T+1,0,v,T,0,v+2/3,T+1,0,v,T+1,0];g.set(y,p*u*f);for(let S=0;S<u;S++){let w=h[S*2]*2-1,R=h[S*2+1]*2-1;f===0?ds.set(1,R,w):f===1?ds.set(-w,1,-R):f===2?ds.set(-w,R,1):f===3?ds.set(-1,R,-w):f===4?ds.set(-w,-1,R):ds.set(w,R,-1),ds.toArray(b,(f*u+S)*p)}}let m=new bt;m.setAttribute("position",new yt(g,p)),m.setAttribute("outputDirection",new yt(b,p)),t.push(new Ke(m,null)),n>or&&n--}return{lodMeshes:t,sizeLods:e}}function Gu(i,e,t){let n=new tn(i,e,t);return n.texture.mapping=eo,n.texture.name="PMREM.cubeUv",n.scissorTest=!0,n}function rr(i,e,t,n,s){i.viewport.set(e,t,n,s),i.scissor.set(e,t,n,s)}function o2(i,e,t){return new sn({name:"PMREMGGXConvolution",defines:{GGX_SAMPLES:i2,CUBEUV_TEXEL_WIDTH:1/e,CUBEUV_TEXEL_HEIGHT:1/t,CUBEUV_MAX_MIP:`${i}.0`},uniforms:{envMap:{value:null},roughness:{value:0},mipInt:{value:0}},vertexShader:_c(),fragmentShader:`

			precision highp float;
			precision highp int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;
			uniform float roughness;
			uniform float mipInt;

			#define ENVMAP_TYPE_CUBE_UV
			#include <cube_uv_reflection_fragment>

			#define PI 3.14159265359

			// Van der Corput radical inverse
			float radicalInverse_VdC(uint bits) {
				bits = (bits << 16u) | (bits >> 16u);
				bits = ((bits & 0x55555555u) << 1u) | ((bits & 0xAAAAAAAAu) >> 1u);
				bits = ((bits & 0x33333333u) << 2u) | ((bits & 0xCCCCCCCCu) >> 2u);
				bits = ((bits & 0x0F0F0F0Fu) << 4u) | ((bits & 0xF0F0F0F0u) >> 4u);
				bits = ((bits & 0x00FF00FFu) << 8u) | ((bits & 0xFF00FF00u) >> 8u);
				return float(bits) * 2.3283064365386963e-10; // / 0x100000000
			}

			// Hammersley sequence
			vec2 hammersley(uint i, uint N) {
				return vec2(float(i) / float(N), radicalInverse_VdC(i));
			}

			// GGX VNDF importance sampling (Eric Heitz 2018)
			// "Sampling the GGX Distribution of Visible Normals"
			// https://jcgt.org/published/0007/04/01/
			vec3 importanceSampleGGX_VNDF(vec2 Xi, vec3 V, float roughness) {
				float alpha = roughness * roughness;

				// Section 4.1: Orthonormal basis
				vec3 T1 = vec3(1.0, 0.0, 0.0);
				vec3 T2 = cross(V, T1);

				// Section 4.2: Parameterization of projected area
				float r = sqrt(Xi.x);
				float phi = 2.0 * PI * Xi.y;
				float t1 = r * cos(phi);
				float t2 = r * sin(phi);
				float s = 0.5 * (1.0 + V.z);
				t2 = (1.0 - s) * sqrt(1.0 - t1 * t1) + s * t2;

				// Section 4.3: Reprojection onto hemisphere
				vec3 Nh = t1 * T1 + t2 * T2 + sqrt(max(0.0, 1.0 - t1 * t1 - t2 * t2)) * V;

				// Section 3.4: Transform back to ellipsoid configuration
				return normalize(vec3(alpha * Nh.x, alpha * Nh.y, max(0.0, Nh.z)));
			}

			void main() {
				vec3 N = normalize(vOutputDirection);
				vec3 V = N; // Assume view direction equals normal for pre-filtering

				vec3 prefilteredColor = vec3(0.0);
				float totalWeight = 0.0;

				// For very low roughness, just sample the environment directly
				if (roughness < 0.001) {
					gl_FragColor = vec4(bilinearCubeUV(envMap, N, mipInt), 1.0);
					return;
				}

				// Tangent space basis for VNDF sampling
				vec3 up = abs(N.z) < 0.999 ? vec3(0.0, 0.0, 1.0) : vec3(1.0, 0.0, 0.0);
				vec3 tangent = normalize(cross(up, N));
				vec3 bitangent = cross(N, tangent);

				for(uint i = 0u; i < uint(GGX_SAMPLES); i++) {
					vec2 Xi = hammersley(i, uint(GGX_SAMPLES));

					// For PMREM, V = N, so in tangent space V is always (0, 0, 1)
					vec3 H_tangent = importanceSampleGGX_VNDF(Xi, vec3(0.0, 0.0, 1.0), roughness);

					// Transform H back to world space
					vec3 H = normalize(tangent * H_tangent.x + bitangent * H_tangent.y + N * H_tangent.z);
					vec3 L = normalize(2.0 * dot(V, H) * H - V);

					float NdotL = max(dot(N, L), 0.0);

					if(NdotL > 0.0) {
						// Sample environment at fixed mip level
						// VNDF importance sampling handles the distribution filtering
						vec3 sampleColor = bilinearCubeUV(envMap, L, mipInt);

						// Weight by NdotL for the split-sum approximation
						// VNDF PDF naturally accounts for the visible microfacet distribution
						prefilteredColor += sampleColor * NdotL;
						totalWeight += NdotL;
					}
				}

				if (totalWeight > 0.0) {
					prefilteredColor = prefilteredColor / totalWeight;
				}

				gl_FragColor = vec4(prefilteredColor, 1.0);
			}
		`,blending:Hn,depthTest:!1,depthWrite:!1})}function a2(i,e,t){return new sn({name:"SphericalGaussianBlur",defines:{SAMPLES:n2,CUBEUV_TEXEL_WIDTH:1/e,CUBEUV_TEXEL_HEIGHT:1/t,CUBEUV_MAX_MIP:`${i}.0`},uniforms:{envMap:{value:null},sigma:{value:0},mipInt:{value:0}},vertexShader:_c(),fragmentShader:`

			precision highp float;
			precision highp int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;
			uniform float sigma;
			uniform float mipInt;

			#define ENVMAP_TYPE_CUBE_UV
			#include <cube_uv_reflection_fragment>

			#define PI 3.14159265359
			#define GOLDEN_ANGLE 2.39996322973

			void main() {

				if ( sigma == 0.0 ) {

					gl_FragColor = vec4( bilinearCubeUV( envMap, vOutputDirection, mipInt ), 1.0 );
					return;

				}

				vec3 outputDirection = normalize( vOutputDirection );

				vec3 up = abs( outputDirection.z ) < 0.999 ? vec3( 0.0, 0.0, 1.0 ) : vec3( 1.0, 0.0, 0.0 );
				vec3 tangent = normalize( cross( up, outputDirection ) );
				vec3 bitangent = cross( outputDirection, tangent );

				// Truncate the kernel at three standard deviations or at the antipode.
				float thetaMax = min( 3.0 * sigma, PI );
				float truncation = 1.0 - exp( - 0.5 * thetaMax * thetaMax / ( sigma * sigma ) );

				vec3 accumColor = vec3( 0.0 );
				float accumWeight = 0.0;

				for ( int i = 0; i < SAMPLES; i ++ ) {

					// Stratified inverse-CDF sampling of the Gaussian, placed on a golden-angle spiral.
					float stratum = ( float( i ) + 0.5 ) / float( SAMPLES );
					float theta = sigma * sqrt( - 2.0 * log( 1.0 - stratum * truncation ) );
					float phi = float( i ) * GOLDEN_ANGLE;

					vec3 offset = cos( phi ) * tangent + sin( phi ) * bitangent;
					vec3 sampleDirection = cos( theta ) * outputDirection + sin( theta ) * offset;

					// Correct the planar sample density to solid angle.
					float weight = sin( theta ) / theta;

					accumColor += weight * bilinearCubeUV( envMap, sampleDirection, mipInt );
					accumWeight += weight;

				}

				gl_FragColor = vec4( accumColor / accumWeight, 1.0 );

			}
		`,blending:Hn,depthTest:!1,depthWrite:!1})}function Wu(){return new sn({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:_c(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;

			#include <common>

			void main() {

				vec3 outputDirection = normalize( vOutputDirection );
				vec2 uv = equirectUv( outputDirection );

				gl_FragColor = vec4( texture2D ( envMap, uv ).rgb, 1.0 );

			}
		`,blending:Hn,depthTest:!1,depthWrite:!1})}function Xu(){return new sn({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:_c(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:Hn,depthTest:!1,depthWrite:!1})}function _c(){return`

		precision mediump float;
		precision mediump int;

		attribute vec3 outputDirection;

		varying vec3 vOutputDirection;

		void main() {

			vOutputDirection = outputDirection;
			gl_Position = vec4( position, 1.0 );

		}
	`}var gc=class extends tn{constructor(e=1,t={}){super(e,e,t),this.isWebGLCubeRenderTarget=!0;let n={width:e,height:e,depth:1},s=[n,n,n,n,n,n];this.texture=new zr(s),this._setTextureOptions(t),this.texture.isRenderTargetTexture=!0}fromEquirectangularTexture(e,t){this.texture.type=t.type,this.texture.colorSpace=t.colorSpace,this.texture.generateMipmaps=t.generateMipmaps,this.texture.minFilter=t.minFilter,this.texture.magFilter=t.magFilter;let n={uniforms:{tEquirect:{value:null}},vertexShader:`

				varying vec3 vWorldDirection;

				vec3 transformDirection( in vec3 dir, in mat4 matrix ) {

					return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );

				}

				void main() {

					vWorldDirection = transformDirection( position, modelMatrix );

					#include <begin_vertex>
					#include <project_vertex>

				}
			`,fragmentShader:`

				uniform sampler2D tEquirect;

				varying vec3 vWorldDirection;

				#include <common>

				void main() {

					vec3 direction = normalize( vWorldDirection );

					vec2 sampleUV = equirectUv( direction );

					gl_FragColor = texture2D( tEquirect, sampleUV );

				}
			`},s=new Ii(5,5,5),r=new sn({name:"CubemapFromEquirect",uniforms:us(n.uniforms),vertexShader:n.vertexShader,fragmentShader:n.fragmentShader,side:zt,blending:Hn});r.uniforms.tEquirect.value=t;let o=new Ke(s,r),a=t.minFilter;return t.minFilter===un&&(t.minFilter=gt),new ba(1,10,this).update(e,o),t.minFilter=a,o.geometry.dispose(),o.material.dispose(),this}clear(e,t=!0,n=!0,s=!0){let r=e.getRenderTarget();for(let o=0;o<6;o++)e.setRenderTarget(this,o),e.clear(t,n,s);e.setRenderTarget(r)}};function c2(i){let e=new WeakMap,t=new WeakMap,n=null;function s(u,p=!1){return u==null?null:p?o(u):r(u)}function r(u){if(u&&u.isTexture){let p=u.mapping;if(p===Aa||p===Ea)if(e.has(u)){let g=e.get(u).texture;return a(g,u.mapping)}else{let g=u.image;if(g&&g.height>0){let b=new gc(g.height);return b.fromEquirectangularTexture(i,u),e.set(u,b),u.addEventListener("dispose",l),a(b.texture,u.mapping)}else return null}}return u}function o(u){if(u&&u.isTexture){let p=u.mapping,g=p===Aa||p===Ea,b=p===Ui||p===ls;if(g||b){let m=t.get(u),f=m!==void 0?m.texture.pmremVersion:0;if(u.isRenderTargetTexture&&u.pmremVersion!==f)return n===null&&(n=new Bi(i)),m=g?n.fromEquirectangular(u,m):n.fromCubemap(u,m),m.texture.pmremVersion=u.pmremVersion,t.set(u,m),m.texture;if(m!==void 0)return m.texture;{let v=u.image;return g&&v&&v.height>0||b&&v&&c(v)?(n===null&&(n=new Bi(i)),m=g?n.fromEquirectangular(u):n.fromCubemap(u),m.texture.pmremVersion=u.pmremVersion,t.set(u,m),u.addEventListener("dispose",h),m.texture):null}}}return u}function a(u,p){return p===Aa?u.mapping=Ui:p===Ea&&(u.mapping=ls),u}function c(u){let p=0,g=6;for(let b=0;b<g;b++)u[b]!==void 0&&p++;return p===g}function l(u){let p=u.target;p.removeEventListener("dispose",l);let g=e.get(p);g!==void 0&&(e.delete(p),g.dispose())}function h(u){let p=u.target;p.removeEventListener("dispose",h);let g=t.get(p);g!==void 0&&(t.delete(p),g.dispose())}function d(){e=new WeakMap,t=new WeakMap,n!==null&&(n.dispose(),n=null)}return{get:s,dispose:d}}function l2(i){let e={};function t(n){if(e[n]!==void 0)return e[n];let s=i.getExtension(n);return e[n]=s,s}return{has:function(n){return t(n)!==null},init:function(){t("EXT_color_buffer_float"),t("WEBGL_clip_cull_distance"),t("OES_texture_float_linear"),t("EXT_color_buffer_half_float"),t("WEBGL_multisampled_render_to_texture"),t("WEBGL_render_shared_exponent")},get:function(n){let s=t(n);return s===null&&Ti("WebGLRenderer: "+n+" extension not supported."),s}}}function h2(i,e,t,n){let s={},r=new WeakMap;function o(d){let u=d.target;u.index!==null&&e.remove(u.index);for(let g in u.attributes)e.remove(u.attributes[g]);u.removeEventListener("dispose",o),delete s[u.id];let p=r.get(u);p&&(e.remove(p),r.delete(u)),n.releaseStatesOfGeometry(u),u.isInstancedBufferGeometry===!0&&delete u._maxInstanceCount,t.memory.geometries--}function a(d,u){return s[u.id]===!0||(u.addEventListener("dispose",o),s[u.id]=!0,t.memory.geometries++),u}function c(d){let u=d.attributes;for(let p in u)e.update(u[p],i.ARRAY_BUFFER)}function l(d){let u=[],p=d.index,g=d.attributes.position,b=0;if(g===void 0)return;if(p!==null){let v=p.array;b=p.version;for(let T=0,y=v.length;T<y;T+=3){let S=v[T+0],w=v[T+1],R=v[T+2];u.push(S,w,w,R,R,S)}}else{let v=g.array;b=g.version;for(let T=0,y=v.length/3-1;T<y;T+=3){let S=T+0,w=T+1,R=T+2;u.push(S,w,w,R,R,S)}}let m=new(g.count>=65535?Nr:Dr)(u,1);m.version=b;let f=r.get(d);f&&e.remove(f),r.set(d,m)}function h(d){let u=r.get(d);if(u){let p=d.index;p!==null&&u.version<p.version&&l(d)}else l(d);return r.get(d)}return{get:a,update:c,getWireframeAttribute:h}}function u2(i,e,t){let n;function s(d){n=d}let r,o;function a(d){r=d.type,o=d.bytesPerElement}function c(d,u){i.drawElements(n,u,r,d*o),t.update(u,n,1)}function l(d,u,p){p!==0&&(i.drawElementsInstanced(n,u,r,d*o,p),t.update(u,n,p))}function h(d,u,p){if(p===0)return;e.get("WEBGL_multi_draw").multiDrawElementsWEBGL(n,u,0,r,d,0,p);let b=0;for(let m=0;m<p;m++)b+=u[m];t.update(b,n,1)}this.setMode=s,this.setIndex=a,this.render=c,this.renderInstances=l,this.renderMultiDraw=h}function d2(i){let e={geometries:0,textures:0},t={frame:0,calls:0,triangles:0,points:0,lines:0};function n(r,o,a){switch(t.calls++,o){case i.TRIANGLES:t.triangles+=a*(r/3);break;case i.LINES:t.lines+=a*(r/2);break;case i.LINE_STRIP:t.lines+=a*(r-1);break;case i.LINE_LOOP:t.lines+=a*r;break;case i.POINTS:t.points+=a*r;break;default:Pe("WebGLInfo: Unknown draw mode:",o);break}}function s(){t.calls=0,t.triangles=0,t.points=0,t.lines=0}return{memory:e,render:t,programs:null,autoReset:!0,reset:s,update:n}}function f2(i,e,t){let n=new WeakMap,s=new tt;function r(o,a,c){let l=o.morphTargetInfluences,h=a.morphAttributes.position||a.morphAttributes.normal||a.morphAttributes.color,d=h!==void 0?h.length:0,u=n.get(a);if(u===void 0||u.count!==d){let A=function(){R.dispose(),n.delete(a),a.removeEventListener("dispose",A)};u!==void 0&&u.texture.dispose();let p=a.morphAttributes.position!==void 0,g=a.morphAttributes.normal!==void 0,b=a.morphAttributes.color!==void 0,m=a.morphAttributes.position||[],f=a.morphAttributes.normal||[],v=a.morphAttributes.color||[],T=0;p===!0&&(T=1),g===!0&&(T=2),b===!0&&(T=3);let y=a.attributes.position.count*T,S=1;y>e.maxTextureSize&&(S=Math.ceil(y/e.maxTextureSize),y=e.maxTextureSize);let w=new Float32Array(y*S*4*d),R=new Pr(w,y,S,d);R.type=dn,R.needsUpdate=!0;let x=T*4;for(let C=0;C<d;C++){let L=m[C],O=f[C],W=v[C],I=y*S*4*C;for(let B=0;B<L.count;B++){let V=B*x;p===!0&&(s.fromBufferAttribute(L,B),w[I+V+0]=s.x,w[I+V+1]=s.y,w[I+V+2]=s.z,w[I+V+3]=0),g===!0&&(s.fromBufferAttribute(O,B),w[I+V+4]=s.x,w[I+V+5]=s.y,w[I+V+6]=s.z,w[I+V+7]=0),b===!0&&(s.fromBufferAttribute(W,B),w[I+V+8]=s.x,w[I+V+9]=s.y,w[I+V+10]=s.z,w[I+V+11]=W.itemSize===4?s.w:1)}}u={count:d,texture:R,size:new we(y,S)},n.set(a,u),a.addEventListener("dispose",A)}if(o.isInstancedMesh===!0&&o.morphTexture!==null)c.getUniforms().setValue(i,"morphTexture",o.morphTexture,t);else{let p=0;for(let b=0;b<l.length;b++)p+=l[b];let g=a.morphTargetsRelative?1:1-p;c.getUniforms().setValue(i,"morphTargetBaseInfluence",g),c.getUniforms().setValue(i,"morphTargetInfluences",l)}c.getUniforms().setValue(i,"morphTargetsTexture",u.texture,t),c.getUniforms().setValue(i,"morphTargetsTextureSize",u.size)}return{update:r}}function p2(i,e,t,n,s){let r=new WeakMap;function o(l){let h=s.render.frame,d=l.geometry,u=e.get(l,d);if(r.get(u)!==h&&(e.update(u),r.set(u,h)),l.isInstancedMesh&&(l.hasEventListener("dispose",c)===!1&&l.addEventListener("dispose",c),r.get(l)!==h&&(t.update(l.instanceMatrix,i.ARRAY_BUFFER),l.instanceColor!==null&&t.update(l.instanceColor,i.ARRAY_BUFFER),r.set(l,h))),l.isSkinnedMesh){let p=l.skeleton;r.get(p)!==h&&(p.update(),r.set(p,h))}return u}function a(){r=new WeakMap}function c(l){let h=l.target;h.removeEventListener("dispose",c),n.releaseStatesOfObject(h),t.remove(h.instanceMatrix),h.instanceColor!==null&&t.remove(h.instanceColor)}return{update:o,dispose:a}}var m2={[wl]:"LINEAR_TONE_MAPPING",[Tl]:"REINHARD_TONE_MAPPING",[Al]:"CINEON_TONE_MAPPING",[cs]:"ACES_FILMIC_TONE_MAPPING",[Rl]:"AGX_TONE_MAPPING",[Cl]:"NEUTRAL_TONE_MAPPING",[El]:"CUSTOM_TONE_MAPPING"};function g2(i,e,t,n,s,r){let o=new tn(e,t,{type:i,depthBuffer:s,stencilBuffer:r,samples:n?4:0,storeMultisampledDepthBuffer:!1,storeMultisampledStencilBuffer:!1,resolveDepthBuffer:!1,resolveStencilBuffer:!1}),a=null,c=null,l=new bt;l.setAttribute("position",new Et([-1,3,0,-1,-1,0,3,-1,0],3)),l.setAttribute("uv",new Et([0,2,0,0,2,0],2));let h=new Vr({uniforms:{tDiffuse:{value:null}},vertexShader:`
			precision highp float;

			uniform mat4 modelViewMatrix;
			uniform mat4 projectionMatrix;

			attribute vec3 position;
			attribute vec2 uv;

			varying vec2 vUv;

			void main() {
				vUv = uv;
				gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
			}`,fragmentShader:`
			precision highp float;

			uniform sampler2D tDiffuse;

			varying vec2 vUv;

			#include <tonemapping_pars_fragment>
			#include <colorspace_pars_fragment>

			void main() {
				gl_FragColor = texture2D( tDiffuse, vUv );

				#ifdef LINEAR_TONE_MAPPING
					gl_FragColor.rgb = LinearToneMapping( gl_FragColor.rgb );
				#elif defined( REINHARD_TONE_MAPPING )
					gl_FragColor.rgb = ReinhardToneMapping( gl_FragColor.rgb );
				#elif defined( CINEON_TONE_MAPPING )
					gl_FragColor.rgb = CineonToneMapping( gl_FragColor.rgb );
				#elif defined( ACES_FILMIC_TONE_MAPPING )
					gl_FragColor.rgb = ACESFilmicToneMapping( gl_FragColor.rgb );
				#elif defined( AGX_TONE_MAPPING )
					gl_FragColor.rgb = AgXToneMapping( gl_FragColor.rgb );
				#elif defined( NEUTRAL_TONE_MAPPING )
					gl_FragColor.rgb = NeutralToneMapping( gl_FragColor.rgb );
				#elif defined( CUSTOM_TONE_MAPPING )
					gl_FragColor.rgb = CustomToneMapping( gl_FragColor.rgb );
				#endif

				#ifdef SRGB_TRANSFER
					gl_FragColor = sRGBTransferOETF( gl_FragColor );
				#endif
			}`,depthTest:!1,depthWrite:!1}),d=new Ke(l,h),u=new Li(-1,1,1,-1,0,1),p=null,g=null,b=!1,m,f=null,v=[],T=!1;this.setSize=function(y,S){o.setSize(y,S),a!==null&&a.setSize(y,S),c!==null&&c.setSize(y,S);for(let w=0;w<v.length;w++){let R=v[w];R.setSize&&R.setSize(y,S)}},this.setEffects=function(y){v=y,T=v.length>0&&v[0].isRenderPass===!0;let S=o.width,w=o.height;v.length>0&&a===null&&(a=new tn(S,w,{type:Nn,depthBuffer:!1,stencilBuffer:!1}),c=new tn(S,w,{type:Nn,depthBuffer:!1,stencilBuffer:!1}));for(let R=0;R<v.length;R++){let x=v[R];x.setSize&&x.setSize(S,w)}},this.begin=function(y,S){if(b||y.toneMapping===Ln&&v.length===0)return!1;if(f=S,S!==null){let w=S.width,R=S.height;(o.width!==w||o.height!==R)&&this.setSize(w,R)}return T===!1&&y.setRenderTarget(o),m=y.toneMapping,y.toneMapping=Ln,!0},this.hasRenderPass=function(){return T},this.end=function(y,S){y.toneMapping=m,b=!0;let w=o,R=a;for(let x=0;x<v.length;x++){let A=v[x];A.enabled!==!1&&(A.render(y,R,w,S),A.needsSwap!==!1&&(w=R,R=R===a?c:a))}if(p!==y.outputColorSpace||g!==y.toneMapping){p=y.outputColorSpace,g=y.toneMapping,h.defines={},Be.getTransfer(p)===Je&&(h.defines.SRGB_TRANSFER="");let x=m2[g];x&&(h.defines[x]=""),h.needsUpdate=!0}h.uniforms.tDiffuse.value=w.texture,y.setRenderTarget(f),y.render(d,u),f=null,b=!1},this.isCompositing=function(){return b},this.dispose=function(){o.dispose(),a!==null&&a.dispose(),c!==null&&c.dispose(),l.dispose(),h.dispose()}}var ud=new Ft,Jl=new Ci(1,1),dd=new Pr,fd=new ra,pd=new zr,qu=[],Yu=[],Zu=new Float32Array(16),Ku=new Float32Array(9),$u=new Float32Array(4);function lr(i,e,t){let n=i[0];if(n<=0||n>0)return i;let s=e*t,r=qu[s];if(r===void 0&&(r=new Float32Array(s),qu[s]=r),e!==0){n.toArray(r,0);for(let o=1,a=0;o!==e;++o)a+=t,i[o].toArray(r,a)}return r}function Pt(i,e){if(i.length!==e.length)return!1;for(let t=0,n=i.length;t<n;t++)if(i[t]!==e[t])return!1;return!0}function Lt(i,e){for(let t=0,n=e.length;t<n;t++)i[t]=e[t]}function xc(i,e){let t=Yu[e];t===void 0&&(t=new Int32Array(e),Yu[e]=t);for(let n=0;n!==e;++n)t[n]=i.allocateTextureUnit();return t}function _2(i,e){let t=this.cache;t[0]!==e&&(i.uniform1f(this.addr,e),t[0]=e)}function x2(i,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(i.uniform2f(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(Pt(t,e))return;i.uniform2fv(this.addr,e),Lt(t,e)}}function y2(i,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(i.uniform3f(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else if(e.r!==void 0)(t[0]!==e.r||t[1]!==e.g||t[2]!==e.b)&&(i.uniform3f(this.addr,e.r,e.g,e.b),t[0]=e.r,t[1]=e.g,t[2]=e.b);else{if(Pt(t,e))return;i.uniform3fv(this.addr,e),Lt(t,e)}}function v2(i,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(i.uniform4f(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(Pt(t,e))return;i.uniform4fv(this.addr,e),Lt(t,e)}}function M2(i,e){let t=this.cache,n=e.elements;if(n===void 0){if(Pt(t,e))return;i.uniformMatrix2fv(this.addr,!1,e),Lt(t,e)}else{if(Pt(t,n))return;$u.set(n),i.uniformMatrix2fv(this.addr,!1,$u),Lt(t,n)}}function b2(i,e){let t=this.cache,n=e.elements;if(n===void 0){if(Pt(t,e))return;i.uniformMatrix3fv(this.addr,!1,e),Lt(t,e)}else{if(Pt(t,n))return;Ku.set(n),i.uniformMatrix3fv(this.addr,!1,Ku),Lt(t,n)}}function S2(i,e){let t=this.cache,n=e.elements;if(n===void 0){if(Pt(t,e))return;i.uniformMatrix4fv(this.addr,!1,e),Lt(t,e)}else{if(Pt(t,n))return;Zu.set(n),i.uniformMatrix4fv(this.addr,!1,Zu),Lt(t,n)}}function w2(i,e){let t=this.cache;t[0]!==e&&(i.uniform1i(this.addr,e),t[0]=e)}function T2(i,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(i.uniform2i(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(Pt(t,e))return;i.uniform2iv(this.addr,e),Lt(t,e)}}function A2(i,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(i.uniform3i(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(Pt(t,e))return;i.uniform3iv(this.addr,e),Lt(t,e)}}function E2(i,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(i.uniform4i(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(Pt(t,e))return;i.uniform4iv(this.addr,e),Lt(t,e)}}function R2(i,e){let t=this.cache;t[0]!==e&&(i.uniform1ui(this.addr,e),t[0]=e)}function C2(i,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(i.uniform2ui(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(Pt(t,e))return;i.uniform2uiv(this.addr,e),Lt(t,e)}}function I2(i,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(i.uniform3ui(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(Pt(t,e))return;i.uniform3uiv(this.addr,e),Lt(t,e)}}function P2(i,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(i.uniform4ui(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(Pt(t,e))return;i.uniform4uiv(this.addr,e),Lt(t,e)}}function L2(i,e,t){let n=this.cache,s=t.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s);let r;this.type===i.SAMPLER_2D_SHADOW?(Jl.compareFunction=t.isReversedDepthBuffer()?fc:dc,r=Jl):r=ud,t.setTexture2D(e||r,s)}function D2(i,e,t){let n=this.cache,s=t.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s),t.setTexture3D(e||fd,s)}function N2(i,e,t){let n=this.cache,s=t.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s),t.setTextureCube(e||pd,s)}function U2(i,e,t){let n=this.cache,s=t.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s),t.setTexture2DArray(e||dd,s)}function O2(i){switch(i){case 5126:return _2;case 35664:return x2;case 35665:return y2;case 35666:return v2;case 35674:return M2;case 35675:return b2;case 35676:return S2;case 5124:case 35670:return w2;case 35667:case 35671:return T2;case 35668:case 35672:return A2;case 35669:case 35673:return E2;case 5125:return R2;case 36294:return C2;case 36295:return I2;case 36296:return P2;case 35678:case 36198:case 36298:case 36306:case 35682:return L2;case 35679:case 36299:case 36307:return D2;case 35680:case 36300:case 36308:case 36293:return N2;case 36289:case 36303:case 36311:case 36292:return U2}}function F2(i,e){i.uniform1fv(this.addr,e)}function B2(i,e){let t=lr(e,this.size,2);i.uniform2fv(this.addr,t)}function k2(i,e){let t=lr(e,this.size,3);i.uniform3fv(this.addr,t)}function z2(i,e){let t=lr(e,this.size,4);i.uniform4fv(this.addr,t)}function H2(i,e){let t=lr(e,this.size,4);i.uniformMatrix2fv(this.addr,!1,t)}function V2(i,e){let t=lr(e,this.size,9);i.uniformMatrix3fv(this.addr,!1,t)}function G2(i,e){let t=lr(e,this.size,16);i.uniformMatrix4fv(this.addr,!1,t)}function W2(i,e){i.uniform1iv(this.addr,e)}function X2(i,e){i.uniform2iv(this.addr,e)}function q2(i,e){i.uniform3iv(this.addr,e)}function Y2(i,e){i.uniform4iv(this.addr,e)}function Z2(i,e){i.uniform1uiv(this.addr,e)}function K2(i,e){i.uniform2uiv(this.addr,e)}function $2(i,e){i.uniform3uiv(this.addr,e)}function j2(i,e){i.uniform4uiv(this.addr,e)}function J2(i,e,t){let n=this.cache,s=e.length,r=xc(t,s);Pt(n,r)||(i.uniform1iv(this.addr,r),Lt(n,r));let o;this.type===i.SAMPLER_2D_SHADOW?o=Jl:o=ud;for(let a=0;a!==s;++a)t.setTexture2D(e[a]||o,r[a])}function Q2(i,e,t){let n=this.cache,s=e.length,r=xc(t,s);Pt(n,r)||(i.uniform1iv(this.addr,r),Lt(n,r));for(let o=0;o!==s;++o)t.setTexture3D(e[o]||fd,r[o])}function e3(i,e,t){let n=this.cache,s=e.length,r=xc(t,s);Pt(n,r)||(i.uniform1iv(this.addr,r),Lt(n,r));for(let o=0;o!==s;++o)t.setTextureCube(e[o]||pd,r[o])}function t3(i,e,t){let n=this.cache,s=e.length,r=xc(t,s);Pt(n,r)||(i.uniform1iv(this.addr,r),Lt(n,r));for(let o=0;o!==s;++o)t.setTexture2DArray(e[o]||dd,r[o])}function n3(i){switch(i){case 5126:return F2;case 35664:return B2;case 35665:return k2;case 35666:return z2;case 35674:return H2;case 35675:return V2;case 35676:return G2;case 5124:case 35670:return W2;case 35667:case 35671:return X2;case 35668:case 35672:return q2;case 35669:case 35673:return Y2;case 5125:return Z2;case 36294:return K2;case 36295:return $2;case 36296:return j2;case 35678:case 36198:case 36298:case 36306:case 35682:return J2;case 35679:case 36299:case 36307:return Q2;case 35680:case 36300:case 36308:case 36293:return e3;case 36289:case 36303:case 36311:case 36292:return t3}}var Ql=class{constructor(e,t,n){this.id=e,this.addr=n,this.cache=[],this.type=t.type,this.setValue=O2(t.type)}},e0=class{constructor(e,t,n){this.id=e,this.addr=n,this.cache=[],this.type=t.type,this.size=t.size,this.setValue=n3(t.type)}},t0=class{constructor(e){this.id=e,this.seq=[],this.map={}}setValue(e,t,n){let s=this.seq;for(let r=0,o=s.length;r!==o;++r){let a=s[r];a.setValue(e,t[a.id],n)}}},$l=/(\w+)(\])?(\[|\.)?/g;function ju(i,e){i.seq.push(e),i.map[e.id]=e}function i3(i,e,t){let n=i.name,s=n.length;for($l.lastIndex=0;;){let r=$l.exec(n),o=$l.lastIndex,a=r[1],c=r[2]==="]",l=r[3];if(c&&(a=a|0),l===void 0||l==="["&&o+2===s){ju(t,l===void 0?new Ql(a,i,e):new e0(a,i,e));break}else{let d=t.map[a];d===void 0&&(d=new t0(a),ju(t,d)),t=d}}}var ar=class{constructor(e,t){this.seq=[],this.map={};let n=e.getProgramParameter(t,e.ACTIVE_UNIFORMS);for(let o=0;o<n;++o){let a=e.getActiveUniform(t,o),c=e.getUniformLocation(t,a.name);i3(a,c,this)}let s=[],r=[];for(let o of this.seq)o.type===e.SAMPLER_2D_SHADOW||o.type===e.SAMPLER_CUBE_SHADOW||o.type===e.SAMPLER_2D_ARRAY_SHADOW?s.push(o):r.push(o);s.length>0&&(this.seq=s.concat(r))}setValue(e,t,n,s){let r=this.map[t];r!==void 0&&r.setValue(e,n,s)}setOptional(e,t,n){let s=t[n];s!==void 0&&this.setValue(e,n,s)}static upload(e,t,n,s){for(let r=0,o=t.length;r!==o;++r){let a=t[r],c=n[a.id];c.needsUpdate!==!1&&a.setValue(e,c.value,s)}}static seqWithValue(e,t){let n=[];for(let s=0,r=e.length;s!==r;++s){let o=e[s];o.id in t&&n.push(o)}return n}};function Ju(i,e,t){let n=i.createShader(e);return i.shaderSource(n,t),i.compileShader(n),n}var s3=37297,r3=0;function o3(i,e){let t=i.split(`
`),n=[],s=Math.max(e-6,0),r=Math.min(e+6,t.length);for(let o=s;o<r;o++){let a=o+1;n.push(`${a===e?">":" "} ${a}: ${t[o]}`)}return n.join(`
`)}var Qu=new Le;function a3(i){Be._getMatrix(Qu,Be.workingColorSpace,i);let e=`mat3( ${Qu.elements.map(t=>t.toFixed(4))} )`;switch(Be.getTransfer(i)){case Cr:return[e,"LinearTransferOETF"];case Je:return[e,"sRGBTransferOETF"];default:return Ae("WebGLProgram: Unsupported color space: ",i),[e,"LinearTransferOETF"]}}function ed(i,e,t){let n=i.getShaderParameter(e,i.COMPILE_STATUS),r=(i.getShaderInfoLog(e)||"").trim();if(n&&r==="")return"";let o=/ERROR: 0:(\d+)/.exec(r);if(o){let a=parseInt(o[1]);return t.toUpperCase()+`

`+r+`

`+o3(i.getShaderSource(e),a)}else return r}function c3(i,e){let t=a3(e);return[`vec4 ${i}( vec4 value ) {`,`	return ${t[1]}( vec4( value.rgb * ${t[0]}, value.a ) );`,"}"].join(`
`)}var l3={[wl]:"Linear",[Tl]:"Reinhard",[Al]:"Cineon",[cs]:"ACESFilmic",[Rl]:"AgX",[Cl]:"Neutral",[El]:"Custom"};function h3(i,e){let t=l3[e];return t===void 0?(Ae("WebGLProgram: Unsupported toneMapping:",e),"vec3 "+i+"( vec3 color ) { return LinearToneMapping( color ); }"):"vec3 "+i+"( vec3 color ) { return "+t+"ToneMapping( color ); }"}var mc=new N;function u3(){Be.getLuminanceCoefficients(mc);let i=mc.x.toFixed(4),e=mc.y.toFixed(4),t=mc.z.toFixed(4);return["float luminance( const in vec3 rgb ) {",`	const vec3 weights = vec3( ${i}, ${e}, ${t} );`,"	return dot( weights, rgb );","}"].join(`
`)}function d3(i){return[i.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":"",i.extensionMultiDraw?"#extension GL_ANGLE_multi_draw : require":""].filter(uo).join(`
`)}function f3(i){let e=[];for(let t in i){let n=i[t];n!==!1&&e.push("#define "+t+" "+n)}return e.join(`
`)}function p3(i,e){let t={},n=i.getProgramParameter(e,i.ACTIVE_ATTRIBUTES);for(let s=0;s<n;s++){let r=i.getActiveAttrib(e,s),o=r.name,a=1;r.type===i.FLOAT_MAT2&&(a=2),r.type===i.FLOAT_MAT3&&(a=3),r.type===i.FLOAT_MAT4&&(a=4),t[o]={type:r.type,location:i.getAttribLocation(e,o),locationSize:a}}return t}function uo(i){return i!==""}function td(i,e){let t=e.numSpotLightShadows+e.numSpotLightMaps-e.numSpotLightShadowsWithMaps;return i.replace(/NUM_SUN_LIGHTS/g,e.numSunLights).replace(/NUM_DIR_LIGHTS/g,e.numDirLights).replace(/NUM_SPOT_LIGHTS/g,e.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,e.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,t).replace(/NUM_RECT_AREA_LIGHTS/g,e.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,e.numPointLights).replace(/NUM_HEMI_LIGHTS/g,e.numHemiLights).replace(/NUM_SUN_LIGHT_SHADOWS/g,e.numSunLightShadows).replace(/NUM_DIR_LIGHT_SHADOWS/g,e.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,e.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,e.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,e.numPointLightShadows)}function nd(i,e){return i.replace(/NUM_CLIPPING_PLANES/g,e.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,e.numClippingPlanes-e.numClipIntersection)}var m3=/^[ \t]*#include +<([\w\d./]+)>/gm;function n0(i){return i.replace(m3,_3)}var g3=new Map;function _3(i,e){let t=Fe[e];if(t===void 0){let n=g3.get(e);if(n!==void 0)t=Fe[n],Ae('WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',e,n);else throw new Error("THREE.WebGLProgram: Can not resolve #include <"+e+">")}return n0(t)}var x3=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function id(i){return i.replace(x3,y3)}function y3(i,e,t,n){let s="";for(let r=parseInt(e);r<parseInt(t);r++)s+=n.replace(/\[\s*i\s*\]/g,"[ "+r+" ]").replace(/UNROLLED_LOOP_INDEX/g,r);return s}function sd(i){let e=`precision ${i.precision} float;
	precision ${i.precision} int;
	precision ${i.precision} sampler2D;
	precision ${i.precision} samplerCube;
	precision ${i.precision} sampler3D;
	precision ${i.precision} sampler2DArray;
	precision ${i.precision} sampler2DShadow;
	precision ${i.precision} samplerCubeShadow;
	precision ${i.precision} sampler2DArrayShadow;
	precision ${i.precision} isampler2D;
	precision ${i.precision} isampler3D;
	precision ${i.precision} isamplerCube;
	precision ${i.precision} isampler2DArray;
	precision ${i.precision} usampler2D;
	precision ${i.precision} usampler3D;
	precision ${i.precision} usamplerCube;
	precision ${i.precision} usampler2DArray;
	`;return i.precision==="highp"?e+=`
#define HIGH_PRECISION`:i.precision==="mediump"?e+=`
#define MEDIUM_PRECISION`:i.precision==="lowp"&&(e+=`
#define LOW_PRECISION`),e}var v3={[hi]:"SHADOWMAP_TYPE_PCF",[Js]:"SHADOWMAP_TYPE_VSM"};function M3(i){return v3[i.shadowMapType]||"SHADOWMAP_TYPE_BASIC"}var b3={[Ui]:"ENVMAP_TYPE_CUBE",[ls]:"ENVMAP_TYPE_CUBE",[eo]:"ENVMAP_TYPE_CUBE_UV"};function S3(i){return i.envMap===!1?"ENVMAP_TYPE_CUBE":b3[i.envMapMode]||"ENVMAP_TYPE_CUBE"}var w3={[ls]:"ENVMAP_MODE_REFRACTION"};function T3(i){return i.envMap===!1?"ENVMAP_MODE_REFLECTION":w3[i.envMapMode]||"ENVMAP_MODE_REFLECTION"}var A3={[Qr]:"ENVMAP_BLENDING_MULTIPLY",[xu]:"ENVMAP_BLENDING_MIX",[yu]:"ENVMAP_BLENDING_ADD"};function E3(i){return i.envMap===!1?"ENVMAP_BLENDING_NONE":A3[i.combine]||"ENVMAP_BLENDING_NONE"}function R3(i){let e=i.envMapCubeUVHeight;if(e===null)return null;let t=Math.log2(e)-2,n=1/e;return{texelWidth:1/(3*Math.max(Math.pow(2,t),112)),texelHeight:n,maxMip:t}}function C3(i,e,t,n){let s=i.getContext(),r=t.defines,o=t.vertexShader,a=t.fragmentShader,c=M3(t),l=S3(t),h=T3(t),d=E3(t),u=R3(t),p=d3(t),g=f3(r),b=s.createProgram(),m,f,v=t.glslVersion?"#version "+t.glslVersion+`
`:"";t.isRawShaderMaterial?(m=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,g].filter(uo).join(`
`),m.length>0&&(m+=`
`),f=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,g].filter(uo).join(`
`),f.length>0&&(f+=`
`)):(m=[sd(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,g,t.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",t.batching?"#define USE_BATCHING":"",t.batchingColor?"#define USE_BATCHING_COLOR":"",t.instancing?"#define USE_INSTANCING":"",t.instancingColor?"#define USE_INSTANCING_COLOR":"",t.instancingMorph?"#define USE_INSTANCING_MORPH":"",t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.map?"#define USE_MAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+h:"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.displacementMap?"#define USE_DISPLACEMENTMAP":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.mapUv?"#define MAP_UV "+t.mapUv:"",t.alphaMapUv?"#define ALPHAMAP_UV "+t.alphaMapUv:"",t.lightMapUv?"#define LIGHTMAP_UV "+t.lightMapUv:"",t.aoMapUv?"#define AOMAP_UV "+t.aoMapUv:"",t.emissiveMapUv?"#define EMISSIVEMAP_UV "+t.emissiveMapUv:"",t.bumpMapUv?"#define BUMPMAP_UV "+t.bumpMapUv:"",t.normalMapUv?"#define NORMALMAP_UV "+t.normalMapUv:"",t.displacementMapUv?"#define DISPLACEMENTMAP_UV "+t.displacementMapUv:"",t.metalnessMapUv?"#define METALNESSMAP_UV "+t.metalnessMapUv:"",t.roughnessMapUv?"#define ROUGHNESSMAP_UV "+t.roughnessMapUv:"",t.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+t.anisotropyMapUv:"",t.clearcoatMapUv?"#define CLEARCOATMAP_UV "+t.clearcoatMapUv:"",t.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+t.clearcoatNormalMapUv:"",t.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+t.clearcoatRoughnessMapUv:"",t.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+t.iridescenceMapUv:"",t.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+t.iridescenceThicknessMapUv:"",t.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+t.sheenColorMapUv:"",t.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+t.sheenRoughnessMapUv:"",t.specularMapUv?"#define SPECULARMAP_UV "+t.specularMapUv:"",t.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+t.specularColorMapUv:"",t.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+t.specularIntensityMapUv:"",t.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+t.transmissionMapUv:"",t.thicknessMapUv?"#define THICKNESSMAP_UV "+t.thicknessMapUv:"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexNormals?"#define HAS_NORMAL":"",t.vertexColors?"#define USE_COLOR":"",t.vertexAlphas?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.flatShading?"#define FLAT_SHADED":"",t.skinning?"#define USE_SKINNING":"",t.morphTargets?"#define USE_MORPHTARGETS":"",t.morphNormals&&t.flatShading===!1?"#define USE_MORPHNORMALS":"",t.morphColors?"#define USE_MORPHCOLORS":"",t.morphTargetsCount>0?"#define MORPHTARGETS_TEXTURE_STRIDE "+t.morphTextureStride:"",t.morphTargetsCount>0?"#define MORPHTARGETS_COUNT "+t.morphTargetsCount:"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+c:"",t.sizeAttenuation?"#define USE_SIZEATTENUATION":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",t.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","#ifdef USE_INSTANCING_MORPH","	uniform sampler2D morphTexture;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(uo).join(`
`),f=[sd(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,g,t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.alphaToCoverage?"#define ALPHA_TO_COVERAGE":"",t.map?"#define USE_MAP":"",t.matcap?"#define USE_MATCAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+l:"",t.envMap?"#define "+h:"",t.envMap?"#define "+d:"",u?"#define CUBEUV_TEXEL_WIDTH "+u.texelWidth:"",u?"#define CUBEUV_TEXEL_HEIGHT "+u.texelHeight:"",u?"#define CUBEUV_MAX_MIP "+u.maxMip+".0":"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.packedNormalMap?"#define USE_PACKED_NORMALMAP":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoat?"#define USE_CLEARCOAT":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.dispersion?"#define USE_DISPERSION":"",t.retroreflection?"#define USE_RETROREFLECTION":"",t.iridescence?"#define USE_IRIDESCENCE":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaTest?"#define USE_ALPHATEST":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.sheen?"#define USE_SHEEN":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexColors||t.instancingColor?"#define USE_COLOR":"",t.vertexAlphas||t.batchingColor?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.gradientMap?"#define USE_GRADIENTMAP":"",t.flatShading?"#define FLAT_SHADED":"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+c:"",t.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.numLightProbeGrids>0?"#define USE_LIGHT_PROBES_GRID":"",t.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",t.decodeVideoTextureEmissive?"#define DECODE_VIDEO_TEXTURE_EMISSIVE":"",t.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",t.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",t.toneMapping!==Ln?"#define TONE_MAPPING":"",t.toneMapping!==Ln?Fe.tonemapping_pars_fragment:"",t.toneMapping!==Ln?h3("toneMapping",t.toneMapping):"",t.dithering?"#define DITHERING":"",t.opaque?"#define OPAQUE":"",Fe.colorspace_pars_fragment,c3("linearToOutputTexel",t.outputColorSpace),u3(),t.useDepthPacking?"#define DEPTH_PACKING "+t.depthPacking:"",`
`].filter(uo).join(`
`)),o=n0(o),o=td(o,t),o=nd(o,t),a=n0(a),a=td(a,t),a=nd(a,t),o=id(o),a=id(a),t.isRawShaderMaterial!==!0&&(v=`#version 300 es
`,m=[p,"#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+m,f=["#define varying in",t.glslVersion===zl?"":"layout(location = 0) out highp vec4 pc_fragColor;",t.glslVersion===zl?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+f);let T=v+m+o,y=v+f+a,S=Ju(s,s.VERTEX_SHADER,T),w=Ju(s,s.FRAGMENT_SHADER,y);s.attachShader(b,S),s.attachShader(b,w),t.index0AttributeName!==void 0?s.bindAttribLocation(b,0,t.index0AttributeName):t.hasPositionAttribute===!0&&s.bindAttribLocation(b,0,"position"),s.linkProgram(b);function R(L){if(i.debug.checkShaderErrors){let O=s.getProgramInfoLog(b)||"",W=s.getShaderInfoLog(S)||"",I=s.getShaderInfoLog(w)||"",B=O.trim(),V=W.trim(),X=I.trim(),j=!0,H=!0;if(s.getProgramParameter(b,s.LINK_STATUS)===!1)if(j=!1,typeof i.debug.onShaderError=="function")i.debug.onShaderError(s,b,S,w);else{let Y=ed(s,S,"vertex"),ee=ed(s,w,"fragment");Pe("WebGLProgram: Shader Error "+s.getError()+" - VALIDATE_STATUS "+s.getProgramParameter(b,s.VALIDATE_STATUS)+`

Material Name: `+L.name+`
Material Type: `+L.type+`

Program Info Log: `+B+`
`+Y+`
`+ee)}else B!==""?Ae("WebGLProgram: Program Info Log:",B):(V===""||X==="")&&(H=!1);H&&(L.diagnostics={runnable:j,programLog:B,vertexShader:{log:V,prefix:m},fragmentShader:{log:X,prefix:f}})}s.deleteShader(S),s.deleteShader(w),x=new ar(s,b),A=p3(s,b)}let x;this.getUniforms=function(){return x===void 0&&R(this),x};let A;this.getAttributes=function(){return A===void 0&&R(this),A};let C=t.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return C===!1&&(C=s.getProgramParameter(b,s3)),C},this.destroy=function(){n.releaseStatesOfProgram(this),s.deleteProgram(b),this.program=void 0},this.type=t.shaderType,this.name=t.shaderName,this.id=r3++,this.cacheKey=e,this.usedTimes=1,this.program=b,this.vertexShader=S,this.fragmentShader=w,this}var I3=0,i0=class{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(e,t,n){let s=this._getShaderCacheForMaterial(e);return s.has(t)===!1&&(s.add(t),t.usedTimes++),s.has(n)===!1&&(s.add(n),n.usedTimes++),this}remove(e){let t=this.materialCache.get(e);for(let n of t)n.usedTimes--,n.usedTimes===0&&this.shaderCache.delete(n.code);return this.materialCache.delete(e),this}getVertexShaderStage(e){return this._getShaderStage(e.vertexShader)}getFragmentShaderStage(e){return this._getShaderStage(e.fragmentShader)}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(e){let t=this.materialCache,n=t.get(e);return n===void 0&&(n=new Set,t.set(e,n)),n}_getShaderStage(e){let t=this.shaderCache,n=t.get(e);return n===void 0&&(n=new s0(e),t.set(e,n)),n}},s0=class{constructor(e){this.id=I3++,this.code=e,this.usedTimes=0}};function P3(i){return i===Fi||i===ro||i===oo}function L3(i,e,t,n,s,r){let o=new Lr,a=new i0,c=new Set,l=[],h=new Map,d=n.logarithmicDepthBuffer,u=n.precision,p={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distance",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function g(x){return c.add(x),x===0?"uv":`uv${x}`}function b(x,A,C,L,O,W){let I=L.fog,B=O.geometry,V=x.isMeshStandardMaterial||x.isMeshLambertMaterial||x.isMeshPhongMaterial?L.environment:null,X=x.isMeshStandardMaterial||x.isMeshLambertMaterial&&!x.envMap||x.isMeshPhongMaterial&&!x.envMap,j=e.get(x.envMap||V,X),H=j&&j.mapping===eo?j.image.height:null,Y=p[x.type];x.precision!==null&&(u=n.getMaxPrecision(x.precision),u!==x.precision&&Ae("WebGLProgram.getParameters:",x.precision,"not supported, using",u,"instead."));let ee=B.morphAttributes.position||B.morphAttributes.normal||B.morphAttributes.color,Te=ee!==void 0?ee.length:0,Me=0;B.morphAttributes.position!==void 0&&(Me=1),B.morphAttributes.normal!==void 0&&(Me=2),B.morphAttributes.color!==void 0&&(Me=3);let ot,Xe,Ze,K;if(Y){let ct=Gn[Y];ot=ct.vertexShader,Xe=ct.fragmentShader}else{ot=x.vertexShader,Xe=x.fragmentShader;let ct=a.getVertexShaderStage(x),$e=a.getFragmentShaderStage(x);a.update(x,ct,$e),Ze=ct.id,K=$e.id}let te=i.getRenderTarget(),xe=i.state.buffers.depth.getReversed(),De=O.isInstancedMesh===!0,ge=O.isBatchedMesh===!0,ze=!!x.map,Rt=!!x.matcap,Ve=!!j,Ye=!!x.aoMap,at=!!x.lightMap,We=!!x.bumpMap&&x.wireframe===!1,pt=!!x.normalMap,Ut=!!x.displacementMap,en=!!x.emissiveMap,mt=!!x.metalnessMap,wt=!!x.roughnessMap,U=x.anisotropy>0,Ht=x.clearcoat>0,Qe=x.dispersion>0,E=x.retroreflectivity>0,_=x.iridescence>0,F=x.sheen>0,G=x.transmission>0,Z=U&&!!x.anisotropyMap,ie=Ht&&!!x.clearcoatMap,se=Ht&&!!x.clearcoatNormalMap,$=Ht&&!!x.clearcoatRoughnessMap,Q=_&&!!x.iridescenceMap,re=_&&!!x.iridescenceThicknessMap,Ee=F&&!!x.sheenColorMap,le=F&&!!x.sheenRoughnessMap,oe=!!x.specularMap,Re=!!x.specularColorMap,Ie=!!x.specularIntensityMap,Ne=G&&!!x.transmissionMap,D=G&&!!x.thicknessMap,ae=!!x.gradientMap,J=!!x.alphaMap,ce=x.alphaTest>0,fe=!!x.alphaHash,ne=!!x.extensions,Ce=Ln;x.toneMapped&&(te===null||te.isXRRenderTarget===!0)&&(Ce=i.toneMapping);let be={shaderID:Y,shaderType:x.type,shaderName:x.name,vertexShader:ot,fragmentShader:Xe,defines:x.defines,customVertexShaderID:Ze,customFragmentShaderID:K,isRawShaderMaterial:x.isRawShaderMaterial===!0,glslVersion:x.glslVersion,precision:u,batching:ge,batchingColor:ge&&O._colorsTexture!==null,instancing:De,instancingColor:De&&O.instanceColor!==null,instancingMorph:De&&O.morphTexture!==null,outputColorSpace:te===null?i.outputColorSpace:te.isXRRenderTarget===!0?te.texture.colorSpace:Be.workingColorSpace,alphaToCoverage:!!x.alphaToCoverage,map:ze,matcap:Rt,envMap:Ve,envMapMode:Ve&&j.mapping,envMapCubeUVHeight:H,aoMap:Ye,lightMap:at,bumpMap:We,normalMap:pt,displacementMap:Ut,emissiveMap:en,normalMapObjectSpace:pt&&x.normalMapType===Au,normalMapTangentSpace:pt&&x.normalMapType===ui,packedNormalMap:pt&&x.normalMapType===ui&&P3(x.normalMap.format),metalnessMap:mt,roughnessMap:wt,anisotropy:U,anisotropyMap:Z,clearcoat:Ht,clearcoatMap:ie,clearcoatNormalMap:se,clearcoatRoughnessMap:$,dispersion:Qe,retroreflection:E,iridescence:_,iridescenceMap:Q,iridescenceThicknessMap:re,sheen:F,sheenColorMap:Ee,sheenRoughnessMap:le,specularMap:oe,specularColorMap:Re,specularIntensityMap:Ie,transmission:G,transmissionMap:Ne,thicknessMap:D,gradientMap:ae,opaque:x.transparent===!1&&x.blending===Qs&&x.alphaToCoverage===!1,alphaMap:J,alphaTest:ce,alphaHash:fe,combine:x.combine,mapUv:ze&&g(x.map.channel),aoMapUv:Ye&&g(x.aoMap.channel),lightMapUv:at&&g(x.lightMap.channel),bumpMapUv:We&&g(x.bumpMap.channel),normalMapUv:pt&&g(x.normalMap.channel),displacementMapUv:Ut&&g(x.displacementMap.channel),emissiveMapUv:en&&g(x.emissiveMap.channel),metalnessMapUv:mt&&g(x.metalnessMap.channel),roughnessMapUv:wt&&g(x.roughnessMap.channel),anisotropyMapUv:Z&&g(x.anisotropyMap.channel),clearcoatMapUv:ie&&g(x.clearcoatMap.channel),clearcoatNormalMapUv:se&&g(x.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:$&&g(x.clearcoatRoughnessMap.channel),iridescenceMapUv:Q&&g(x.iridescenceMap.channel),iridescenceThicknessMapUv:re&&g(x.iridescenceThicknessMap.channel),sheenColorMapUv:Ee&&g(x.sheenColorMap.channel),sheenRoughnessMapUv:le&&g(x.sheenRoughnessMap.channel),specularMapUv:oe&&g(x.specularMap.channel),specularColorMapUv:Re&&g(x.specularColorMap.channel),specularIntensityMapUv:Ie&&g(x.specularIntensityMap.channel),transmissionMapUv:Ne&&g(x.transmissionMap.channel),thicknessMapUv:D&&g(x.thicknessMap.channel),alphaMapUv:J&&g(x.alphaMap.channel),vertexTangents:!!B.attributes.tangent&&(pt||U),vertexNormals:!!B.attributes.normal,vertexColors:x.vertexColors,vertexAlphas:x.vertexColors===!0&&!!B.attributes.color&&B.attributes.color.itemSize===4,pointsUvs:O.isPoints===!0&&!!B.attributes.uv&&(ze||J),fog:!!I,useFog:x.fog===!0,fogExp2:!!I&&I.isFogExp2,flatShading:x.wireframe===!1&&(x.flatShading===!0||B.attributes.normal===void 0&&pt===!1&&(x.isMeshLambertMaterial||x.isMeshPhongMaterial||x.isMeshStandardMaterial||x.isMeshPhysicalMaterial)),sizeAttenuation:x.sizeAttenuation===!0,logarithmicDepthBuffer:d,reversedDepthBuffer:xe,skinning:O.isSkinnedMesh===!0,hasPositionAttribute:B.attributes.position!==void 0,morphTargets:B.morphAttributes.position!==void 0,morphNormals:B.morphAttributes.normal!==void 0,morphColors:B.morphAttributes.color!==void 0,morphTargetsCount:Te,morphTextureStride:Me,numSunLights:A.sun.length,numDirLights:A.directional.length,numPointLights:A.point.length,numSpotLights:A.spot.length,numSpotLightMaps:A.spotLightMap.length,numRectAreaLights:A.rectArea.length,numHemiLights:A.hemi.length,numSunLightShadows:A.sunShadowMap.length,numDirLightShadows:A.directionalShadowMap.length,numPointLightShadows:A.pointShadowMap.length,numSpotLightShadows:A.spotShadowMap.length,numSpotLightShadowsWithMaps:A.numSpotLightShadowsWithMaps,numLightProbes:A.numLightProbes,numLightProbeGrids:W.length,numClippingPlanes:r.numPlanes,numClipIntersection:r.numIntersection,dithering:x.dithering,shadowMapEnabled:i.shadowMap.enabled&&C.length>0,shadowMapType:i.shadowMap.type,toneMapping:Ce,decodeVideoTexture:ze&&x.map.isVideoTexture===!0&&Be.getTransfer(x.map.colorSpace)===Je,decodeVideoTextureEmissive:en&&x.emissiveMap.isVideoTexture===!0&&Be.getTransfer(x.emissiveMap.colorSpace)===Je,premultipliedAlpha:x.premultipliedAlpha,doubleSided:x.side===on,flipSided:x.side===zt,useDepthPacking:x.depthPacking>=0,depthPacking:x.depthPacking||0,index0AttributeName:x.index0AttributeName,extensionClipCullDistance:ne&&x.extensions.clipCullDistance===!0&&t.has("WEBGL_clip_cull_distance"),extensionMultiDraw:(ne&&x.extensions.multiDraw===!0||ge)&&t.has("WEBGL_multi_draw"),rendererExtensionParallelShaderCompile:t.has("KHR_parallel_shader_compile"),customProgramCacheKey:x.customProgramCacheKey()};return be.vertexUv1s=c.has(1),be.vertexUv2s=c.has(2),be.vertexUv3s=c.has(3),c.clear(),be}function m(x){let A=[];if(x.shaderID?A.push(x.shaderID):(A.push(x.customVertexShaderID),A.push(x.customFragmentShaderID)),x.defines!==void 0)for(let C in x.defines)A.push(C),A.push(x.defines[C]);return x.isRawShaderMaterial===!1&&(f(A,x),v(A,x),A.push(i.outputColorSpace)),A.push(x.customProgramCacheKey),A.join()}function f(x,A){x.push(A.precision),x.push(A.outputColorSpace),x.push(A.envMapMode),x.push(A.envMapCubeUVHeight),x.push(A.mapUv),x.push(A.alphaMapUv),x.push(A.lightMapUv),x.push(A.aoMapUv),x.push(A.bumpMapUv),x.push(A.normalMapUv),x.push(A.displacementMapUv),x.push(A.emissiveMapUv),x.push(A.metalnessMapUv),x.push(A.roughnessMapUv),x.push(A.anisotropyMapUv),x.push(A.clearcoatMapUv),x.push(A.clearcoatNormalMapUv),x.push(A.clearcoatRoughnessMapUv),x.push(A.iridescenceMapUv),x.push(A.iridescenceThicknessMapUv),x.push(A.sheenColorMapUv),x.push(A.sheenRoughnessMapUv),x.push(A.specularMapUv),x.push(A.specularColorMapUv),x.push(A.specularIntensityMapUv),x.push(A.transmissionMapUv),x.push(A.thicknessMapUv),x.push(A.combine),x.push(A.fogExp2),x.push(A.sizeAttenuation),x.push(A.morphTargetsCount),x.push(A.morphAttributeCount),x.push(A.numSunLights),x.push(A.numDirLights),x.push(A.numPointLights),x.push(A.numSpotLights),x.push(A.numSpotLightMaps),x.push(A.numHemiLights),x.push(A.numRectAreaLights),x.push(A.numSunLightShadows),x.push(A.numDirLightShadows),x.push(A.numPointLightShadows),x.push(A.numSpotLightShadows),x.push(A.numSpotLightShadowsWithMaps),x.push(A.numLightProbes),x.push(A.shadowMapType),x.push(A.toneMapping),x.push(A.numClippingPlanes),x.push(A.numClipIntersection),x.push(A.depthPacking)}function v(x,A){o.disableAll(),A.instancing&&o.enable(0),A.instancingColor&&o.enable(1),A.instancingMorph&&o.enable(2),A.matcap&&o.enable(3),A.envMap&&o.enable(4),A.normalMapObjectSpace&&o.enable(5),A.normalMapTangentSpace&&o.enable(6),A.clearcoat&&o.enable(7),A.iridescence&&o.enable(8),A.alphaTest&&o.enable(9),A.vertexColors&&o.enable(10),A.vertexAlphas&&o.enable(11),A.vertexUv1s&&o.enable(12),A.vertexUv2s&&o.enable(13),A.vertexUv3s&&o.enable(14),A.vertexTangents&&o.enable(15),A.anisotropy&&o.enable(16),A.alphaHash&&o.enable(17),A.batching&&o.enable(18),A.dispersion&&o.enable(19),A.retroreflection&&o.enable(24),A.batchingColor&&o.enable(20),A.gradientMap&&o.enable(21),A.packedNormalMap&&o.enable(22),A.vertexNormals&&o.enable(23),x.push(o.mask),o.disableAll(),A.fog&&o.enable(0),A.useFog&&o.enable(1),A.flatShading&&o.enable(2),A.logarithmicDepthBuffer&&o.enable(3),A.reversedDepthBuffer&&o.enable(4),A.skinning&&o.enable(5),A.morphTargets&&o.enable(6),A.morphNormals&&o.enable(7),A.morphColors&&o.enable(8),A.premultipliedAlpha&&o.enable(9),A.shadowMapEnabled&&o.enable(10),A.doubleSided&&o.enable(11),A.flipSided&&o.enable(12),A.useDepthPacking&&o.enable(13),A.dithering&&o.enable(14),A.transmission&&o.enable(15),A.sheen&&o.enable(16),A.opaque&&o.enable(17),A.pointsUvs&&o.enable(18),A.decodeVideoTexture&&o.enable(19),A.decodeVideoTextureEmissive&&o.enable(20),A.alphaToCoverage&&o.enable(21),A.numLightProbeGrids>0&&o.enable(22),A.hasPositionAttribute&&o.enable(23),x.push(o.mask)}function T(x){let A=p[x.type],C;if(A){let L=Gn[A];C=ku.clone(L.uniforms)}else C=x.uniforms;return C}function y(x,A){let C=h.get(A);return C!==void 0?++C.usedTimes:(C=new C3(i,A,x,s),l.push(C),h.set(A,C)),C}function S(x){if(--x.usedTimes===0){let A=l.indexOf(x);l[A]=l[l.length-1],l.pop(),h.delete(x.cacheKey),x.destroy()}}function w(x){a.remove(x)}function R(){a.dispose()}return{getParameters:b,getProgramCacheKey:m,getUniforms:T,acquireProgram:y,releaseProgram:S,releaseShaderCache:w,programs:l,dispose:R}}function D3(){let i=new WeakMap;function e(o){return i.has(o)}function t(o){let a=i.get(o);return a===void 0&&(a={},i.set(o,a)),a}function n(o){i.delete(o)}function s(o,a,c){i.get(o)[a]=c}function r(){i=new WeakMap}return{has:e,get:t,remove:n,update:s,dispose:r}}function N3(i,e){return i.groupOrder!==e.groupOrder?i.groupOrder-e.groupOrder:i.renderOrder!==e.renderOrder?i.renderOrder-e.renderOrder:i.material.id!==e.material.id?i.material.id-e.material.id:i.materialVariant!==e.materialVariant?i.materialVariant-e.materialVariant:i.z!==e.z?i.z-e.z:i.id-e.id}function rd(i,e){return i.groupOrder!==e.groupOrder?i.groupOrder-e.groupOrder:i.renderOrder!==e.renderOrder?i.renderOrder-e.renderOrder:i.z!==e.z?e.z-i.z:i.id-e.id}function od(){let i=[],e=0,t=[],n=[],s=[];function r(){e=0,t.length=0,n.length=0,s.length=0}function o(u){let p=0;return u.isInstancedMesh&&(p+=2),u.isSkinnedMesh&&(p+=1),p}function a(u,p,g,b,m,f){let v=i[e];return v===void 0?(v={id:u.id,object:u,geometry:p,material:g,materialVariant:o(u),groupOrder:b,renderOrder:u.renderOrder,z:m,group:f},i[e]=v):(v.id=u.id,v.object=u,v.geometry=p,v.material=g,v.materialVariant=o(u),v.groupOrder=b,v.renderOrder=u.renderOrder,v.z=m,v.group=f),e++,v}function c(u,p,g,b,m,f,v){v.reversedDepth===!0&&(m=-m);let T=a(u,p,g,b,m,f);g.transmission>0?n.push(T):g.transparent===!0?s.push(T):t.push(T)}function l(u,p,g,b,m,f){let v=a(u,p,g,b,m,f);g.transmission>0?n.unshift(v):g.transparent===!0?s.unshift(v):t.unshift(v)}function h(u,p){t.length>1&&t.sort(u||N3),n.length>1&&n.sort(p||rd),s.length>1&&s.sort(p||rd)}function d(){for(let u=e,p=i.length;u<p;u++){let g=i[u];if(g.id===null)break;g.id=null,g.object=null,g.geometry=null,g.material=null,g.group=null}}return{opaque:t,transmissive:n,transparent:s,init:r,push:c,unshift:l,finish:d,sort:h}}function U3(){let i=new WeakMap;function e(n,s){let r=i.get(n),o;return r===void 0?(o=new od,i.set(n,[o])):s>=r.length?(o=new od,r.push(o)):o=r[s],o}function t(){i=new WeakMap}return{get:e,dispose:t}}function O3(){let i={};return{get:function(e){if(i[e.id]!==void 0)return i[e.id];let t;switch(e.type){case"SunLight":case"DirectionalLight":t={direction:new N,color:new pe};break;case"SpotLight":t={position:new N,direction:new N,color:new pe,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":t={position:new N,color:new pe,distance:0,decay:0};break;case"HemisphereLight":t={direction:new N,skyColor:new pe,groundColor:new pe};break;case"RectAreaLight":t={color:new pe,position:new N,halfWidth:new N,halfHeight:new N};break}return i[e.id]=t,t}}}function F3(){let i={};return{get:function(e){if(i[e.id]!==void 0)return i[e.id];let t;switch(e.type){case"SunLight":case"DirectionalLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new we};break;case"SpotLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new we};break;case"PointLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new we,shadowCameraNear:1,shadowCameraFar:1e3};break}return i[e.id]=t,t}}}var B3=0;function k3(i,e){return(e.castShadow?2:0)-(i.castShadow?2:0)+(e.map?1:0)-(i.map?1:0)}function z3(i){let e=new O3,t=F3(),n={version:0,hash:{sunLength:-1,directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numSunShadows:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],sun:[],sunShadow:[],sunShadowMap:[],sunShadowMatrix:[],sunShadowCascade:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let l=0;l<9;l++)n.probe.push(new N);let s=new N,r=new Ue,o=new Ue;function a(l){let h=0,d=0,u=0;for(let O=0;O<9;O++)n.probe[O].set(0,0,0);let p=0,g=0,b=0,m=0,f=0,v=0,T=0,y=0,S=0,w=0,R=0,x=0,A=0,C=0;l.sort(k3);for(let O=0,W=l.length;O<W;O++){let I=l[O],B=I.color,V=I.intensity,X=I.distance,j=null;if(I.shadow&&I.shadow.map&&(I.shadow.map.texture.format===Fi?j=I.shadow.map.texture:j=I.shadow.map.depthTexture||I.shadow.map.texture),I.isAmbientLight)h+=B.r*V,d+=B.g*V,u+=B.b*V;else if(I.isLightProbe){for(let H=0;H<9;H++)n.probe[H].addScaledVector(I.sh.coefficients[H],V);C++}else if(I.isSunLight){let H=e.get(I);if(H.color.copy(I.color).multiplyScalar(I.intensity),I.castShadow){let Y=I.shadow,ee=t.get(I);ee.shadowIntensity=Y.intensity,ee.shadowBias=Y.bias,ee.shadowNormalBias=Y.normalBias,ee.shadowRadius=Y.radius,ee.shadowMapSize.copy(Y.mapSize).multiply(Y.getFrameExtents()),n.sunShadow[g]=ee,n.sunShadowMap[g]=j;let Te=Y.getViewportCount();for(let Me=0;Me<Te;Me++)n.sunShadowMatrix[b+Me]=Y.getMatrix(Me),n.sunShadowCascade[b+Me]=Y._cascadeData[Me];b+=Te,g++}n.sun[p]=H,p++}else if(I.isDirectionalLight){let H=e.get(I);if(H.color.copy(I.color).multiplyScalar(I.intensity),I.castShadow){let Y=I.shadow,ee=t.get(I);ee.shadowIntensity=Y.intensity,ee.shadowBias=Y.bias,ee.shadowNormalBias=Y.normalBias,ee.shadowRadius=Y.radius,ee.shadowMapSize=Y.mapSize,n.directionalShadow[m]=ee,n.directionalShadowMap[m]=j,n.directionalShadowMatrix[m]=I.shadow.matrix,S++}n.directional[m]=H,m++}else if(I.isSpotLight){let H=e.get(I);H.position.setFromMatrixPosition(I.matrixWorld),H.color.copy(B).multiplyScalar(V),H.distance=X,H.coneCos=Math.cos(I.angle),H.penumbraCos=Math.cos(I.angle*(1-I.penumbra)),H.decay=I.decay,n.spot[v]=H;let Y=I.shadow;if(I.map&&(n.spotLightMap[x]=I.map,x++,Y.updateMatrices(I),I.castShadow&&A++),n.spotLightMatrix[v]=Y.matrix,I.castShadow){let ee=t.get(I);ee.shadowIntensity=Y.intensity,ee.shadowBias=Y.bias,ee.shadowNormalBias=Y.normalBias,ee.shadowRadius=Y.radius,ee.shadowMapSize=Y.mapSize,n.spotShadow[v]=ee,n.spotShadowMap[v]=j,R++}v++}else if(I.isRectAreaLight){let H=e.get(I);H.color.copy(B).multiplyScalar(V),H.halfWidth.set(I.width*.5,0,0),H.halfHeight.set(0,I.height*.5,0),n.rectArea[T]=H,T++}else if(I.isPointLight){let H=e.get(I);if(H.color.copy(I.color).multiplyScalar(I.intensity),H.distance=I.distance,H.decay=I.decay,I.castShadow){let Y=I.shadow,ee=t.get(I);ee.shadowIntensity=Y.intensity,ee.shadowBias=Y.bias,ee.shadowNormalBias=Y.normalBias,ee.shadowRadius=Y.radius,ee.shadowMapSize=Y.mapSize,ee.shadowCameraNear=Y.camera.near,ee.shadowCameraFar=Y.camera.far,n.pointShadow[f]=ee,n.pointShadowMap[f]=j,n.pointShadowMatrix[f]=I.shadow.matrix,w++}n.point[f]=H,f++}else if(I.isHemisphereLight){let H=e.get(I);H.skyColor.copy(I.color).multiplyScalar(V),H.groundColor.copy(I.groundColor).multiplyScalar(V),n.hemi[y]=H,y++}}T>0&&(i.has("OES_texture_float_linear")===!0?(n.rectAreaLTC1=he.LTC_FLOAT_1,n.rectAreaLTC2=he.LTC_FLOAT_2):(n.rectAreaLTC1=he.LTC_HALF_1,n.rectAreaLTC2=he.LTC_HALF_2)),n.ambient[0]=h,n.ambient[1]=d,n.ambient[2]=u;let L=n.hash;(L.sunLength!==p||L.directionalLength!==m||L.pointLength!==f||L.spotLength!==v||L.rectAreaLength!==T||L.hemiLength!==y||L.numSunShadows!==g||L.numDirectionalShadows!==S||L.numPointShadows!==w||L.numSpotShadows!==R||L.numSpotMaps!==x||L.numLightProbes!==C)&&(n.sun.length=p,n.directional.length=m,n.spot.length=v,n.rectArea.length=T,n.point.length=f,n.hemi.length=y,n.sunShadow.length=g,n.sunShadowMap.length=g,n.sunShadowMatrix.length=b,n.sunShadowCascade.length=b,n.directionalShadow.length=S,n.directionalShadowMap.length=S,n.directionalShadowMatrix.length=S,n.pointShadow.length=w,n.pointShadowMap.length=w,n.pointShadowMatrix.length=w,n.spotShadow.length=R,n.spotShadowMap.length=R,n.spotLightMatrix.length=R+x-A,n.spotLightMap.length=x,n.numSpotLightShadowsWithMaps=A,n.numLightProbes=C,L.sunLength=p,L.directionalLength=m,L.pointLength=f,L.spotLength=v,L.rectAreaLength=T,L.hemiLength=y,L.numSunShadows=g,L.numDirectionalShadows=S,L.numPointShadows=w,L.numSpotShadows=R,L.numSpotMaps=x,L.numLightProbes=C,n.version=B3++)}function c(l,h){let d=0,u=0,p=0,g=0,b=0,m=0,f=h.matrixWorldInverse;for(let v=0,T=l.length;v<T;v++){let y=l[v];if(y.isSunLight){let S=n.sun[d];S.direction.setFromMatrixPosition(y.matrixWorld),S.direction.transformDirection(f),d++}else if(y.isDirectionalLight){let S=n.directional[u];S.direction.setFromMatrixPosition(y.matrixWorld),s.setFromMatrixPosition(y.target.matrixWorld),S.direction.sub(s),S.direction.transformDirection(f),u++}else if(y.isSpotLight){let S=n.spot[g];S.position.setFromMatrixPosition(y.matrixWorld),S.position.applyMatrix4(f),S.direction.setFromMatrixPosition(y.matrixWorld),s.setFromMatrixPosition(y.target.matrixWorld),S.direction.sub(s),S.direction.transformDirection(f),g++}else if(y.isRectAreaLight){let S=n.rectArea[b];S.position.setFromMatrixPosition(y.matrixWorld),S.position.applyMatrix4(f),o.identity(),r.copy(y.matrixWorld),r.premultiply(f),o.extractRotation(r),S.halfWidth.set(y.width*.5,0,0),S.halfHeight.set(0,y.height*.5,0),S.halfWidth.applyMatrix4(o),S.halfHeight.applyMatrix4(o),b++}else if(y.isPointLight){let S=n.point[p];S.position.setFromMatrixPosition(y.matrixWorld),S.position.applyMatrix4(f),p++}else if(y.isHemisphereLight){let S=n.hemi[m];S.direction.setFromMatrixPosition(y.matrixWorld),S.direction.transformDirection(f),m++}}}return{setup:a,setupView:c,state:n}}function ad(i){let e=new z3(i),t=[],n=[],s=[];function r(u){d.camera=u,t.length=0,n.length=0,s.length=0}function o(u){t.push(u)}function a(u){n.push(u)}function c(u){s.push(u)}function l(){e.setup(t)}function h(u){e.setupView(t,u)}let d={lightsArray:t,shadowsArray:n,lightProbeGridArray:s,camera:null,lights:e,transmissionRenderTarget:{},textureUnits:0};return{init:r,state:d,setupLights:l,setupLightsView:h,pushLight:o,pushShadow:a,pushLightProbeGrid:c}}function H3(i){let e=new WeakMap;function t(s,r=0){let o=e.get(s),a;return o===void 0?(a=new ad(i),e.set(s,[a])):r>=o.length?(a=new ad(i),o.push(a)):a=o[r],a}function n(){e=new WeakMap}return{get:t,dispose:n}}var V3=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,G3=`uniform sampler2D shadow_pass;
uniform vec2 resolution;
uniform float radius;
void main() {
	const float samples = float( VSM_SAMPLES );
	float mean = 0.0;
	float squared_mean = 0.0;
	float uvStride = samples <= 1.0 ? 0.0 : 2.0 / ( samples - 1.0 );
	float uvStart = samples <= 1.0 ? 0.0 : - 1.0;
	for ( float i = 0.0; i < samples; i ++ ) {
		float uvOffset = uvStart + i * uvStride;
		#ifdef HORIZONTAL_PASS
			vec2 distribution = texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( uvOffset, 0.0 ) * radius ) / resolution ).rg;
			mean += distribution.x;
			squared_mean += distribution.y * distribution.y + distribution.x * distribution.x;
		#else
			float depth = texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( 0.0, uvOffset ) * radius ) / resolution ).r;
			mean += depth;
			squared_mean += depth * depth;
		#endif
	}
	mean = mean / samples;
	squared_mean = squared_mean / samples;
	float std_dev = sqrt( max( 0.0, squared_mean - mean * mean ) );
	gl_FragColor = vec4( mean, std_dev, 0.0, 1.0 );
}`,W3=[new N(1,0,0),new N(-1,0,0),new N(0,1,0),new N(0,-1,0),new N(0,0,1),new N(0,0,-1)],X3=[new N(0,-1,0),new N(0,-1,0),new N(0,0,1),new N(0,0,-1),new N(0,-1,0),new N(0,-1,0)],cd=new Ue,ho=new N,jl=new N;function q3(i,e,t){let n=new qs,s=new we,r=new we,o=new tt,a=new ts,c=new Gr,l={},h=t.maxTextureSize,d={[vn]:zt,[zt]:vn,[on]:on},u=new sn({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new we},radius:{value:4}},vertexShader:V3,fragmentShader:G3}),p=u.clone();p.defines.HORIZONTAL_PASS=1;let g=new bt;g.setAttribute("position",new yt(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));let b=new Ke(g,u),m=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=hi;let f=this.type;this.render=function(w,R,x){if(m.enabled===!1||m.autoUpdate===!1&&m.needsUpdate===!1||w.length===0)return;this.type===Qh&&(Ae("WebGLShadowMap: PCFSoftShadowMap has been removed. Using PCFShadowMap instead."),this.type=hi);let A=i.getRenderTarget(),C=i.getActiveCubeFace(),L=i.getActiveMipmapLevel(),O=i.state;O.setBlending(Hn),O.buffers.depth.getReversed()===!0?O.buffers.color.setClear(0,0,0,0):O.buffers.color.setClear(1,1,1,1),O.buffers.depth.setTest(!0),O.setScissorTest(!1);let W=f!==this.type;W&&R.traverse(function(I){I.material&&(Array.isArray(I.material)?I.material.forEach(B=>B.needsUpdate=!0):I.material.needsUpdate=!0)});for(let I=0,B=w.length;I<B;I++){let V=w[I],X=V.shadow;if(X===void 0){Ae("WebGLShadowMap:",V,"has no shadow.");continue}if(X.autoUpdate===!1&&X.needsUpdate===!1)continue;s.copy(X.mapSize);let j=X.getFrameExtents();s.multiply(j),r.copy(X.mapSize),(s.x>h||s.y>h)&&(s.x>h&&(r.x=Math.floor(h/j.x),s.x=r.x*j.x,X.mapSize.x=r.x),s.y>h&&(r.y=Math.floor(h/j.y),s.y=r.y*j.y,X.mapSize.y=r.y));let H=i.state.buffers.depth.getReversed();if(X.camera._reversedDepth=H,X.map===null||W===!0){if(X.map!==null&&(X.map.depthTexture!==null&&(X.map.depthTexture.dispose(),X.map.depthTexture=null),X.map.dispose()),this.type===Js){if(V.isPointLight){Ae("WebGLShadowMap: VSM shadow maps are not supported for PointLights. Use PCF or BasicShadowMap instead.");continue}X.map=new tn(s.x,s.y,{format:Fi,type:Nn,minFilter:gt,magFilter:gt,generateMipmaps:!1}),X.map.texture.name=V.name+".shadowMap",X.map.depthTexture=new Ci(s.x,s.y,dn),X.map.depthTexture.name=V.name+".shadowMapDepth",X.map.depthTexture.format=kn,X.map.depthTexture.compareFunction=null,X.map.depthTexture.minFilter=Mt,X.map.depthTexture.magFilter=Mt}else V.isPointLight?(X.map=new gc(s.x),X.map.depthTexture=new la(s.x,Dn)):(X.map=new tn(s.x,s.y),X.map.depthTexture=new Ci(s.x,s.y,Dn)),X.map.depthTexture.name=V.name+".shadowMap",X.map.depthTexture.format=kn,this.type===hi?(X.map.depthTexture.compareFunction=H?fc:dc,X.map.depthTexture.minFilter=gt,X.map.depthTexture.magFilter=gt):(X.map.depthTexture.compareFunction=null,X.map.depthTexture.minFilter=Mt,X.map.depthTexture.magFilter=Mt);X.camera.updateProjectionMatrix()}X.map.isWebGLCubeRenderTarget!==!0&&(X.map.width!==s.x||X.map.height!==s.y)&&X.map.setSize(s.x,s.y);let Y=X.map.isWebGLCubeRenderTarget?6:X.getViewportCount();V.isPointLight!==!0&&X.updateMatrices(V,x);for(let ee=0;ee<Y;ee++){let Te=X.getCamera(ee);if(V.isPointLight){let Me=X.camera,ot=X.matrix,Xe=V.distance||Me.far;Xe!==Me.far&&(Me.far=Xe,Me.updateProjectionMatrix()),ho.setFromMatrixPosition(V.matrixWorld),Me.position.copy(ho),jl.copy(Me.position),jl.add(W3[ee]),Me.up.copy(X3[ee]),Me.lookAt(jl),Me.updateMatrixWorld(),ot.makeTranslation(-ho.x,-ho.y,-ho.z),cd.multiplyMatrices(Me.projectionMatrix,Me.matrixWorldInverse),X._frustum.setFromProjectionMatrix(cd,Me.coordinateSystem,Me.reversedDepth)}if(X.map.isWebGLCubeRenderTarget)i.setRenderTarget(X.map,ee),i.clear();else{ee===0&&(i.setRenderTarget(X.map),i.clear());let Me=X.getViewport(ee);o.set(r.x*Me.x,r.y*Me.y,r.x*Me.z,r.y*Me.w),O.viewport(o)}n=X.getFrustum(ee),y(R,x,Te,V,this.type)}X.isPointLightShadow!==!0&&this.type===Js&&v(X,x),X.needsUpdate=!1}f=this.type,m.needsUpdate=!1,i.setRenderTarget(A,C,L)};function v(w,R){let x=e.update(b);u.defines.VSM_SAMPLES!==w.blurSamples&&(u.defines.VSM_SAMPLES=w.blurSamples,p.defines.VSM_SAMPLES=w.blurSamples,u.needsUpdate=!0,p.needsUpdate=!0),w.mapPass===null?w.mapPass=new tn(s.x,s.y,{format:Fi,type:Nn}):(w.mapPass.width!==w.map.width||w.mapPass.height!==w.map.height)&&w.mapPass.setSize(w.map.width,w.map.height),u.uniforms.shadow_pass.value=w.map.depthTexture,u.uniforms.resolution.value.set(w.map.width,w.map.height),u.uniforms.radius.value=w.radius,i.setRenderTarget(w.mapPass),i.clear(),i.renderBufferDirect(R,null,x,u,b,null),p.uniforms.shadow_pass.value=w.mapPass.texture,p.uniforms.resolution.value.set(w.map.width,w.map.height),p.uniforms.radius.value=w.radius,i.setRenderTarget(w.map),i.clear(),i.renderBufferDirect(R,null,x,p,b,null)}function T(w,R,x,A){let C=null,L=x.isPointLight===!0?w.customDistanceMaterial:w.customDepthMaterial;if(L!==void 0)C=L;else if(C=x.isPointLight===!0?c:a,i.localClippingEnabled&&R.clipShadows===!0&&Array.isArray(R.clippingPlanes)&&R.clippingPlanes.length!==0||R.displacementMap&&R.displacementScale!==0||R.alphaMap&&R.alphaTest>0||R.map&&R.alphaTest>0||R.alphaToCoverage===!0){let O=C.uuid,W=R.uuid,I=l[O];I===void 0&&(I={},l[O]=I);let B=I[W];B===void 0&&(B=C.clone(),I[W]=B,R.addEventListener("dispose",S)),C=B}if(C.visible=R.visible,C.wireframe=R.wireframe,A===Js?C.side=R.shadowSide!==null?R.shadowSide:R.side:C.side=R.shadowSide!==null?R.shadowSide:d[R.side],C.alphaMap=R.alphaMap,C.alphaTest=R.alphaToCoverage===!0?.5:R.alphaTest,C.map=R.map,C.clipShadows=R.clipShadows,C.clippingPlanes=R.clippingPlanes,C.clipIntersection=R.clipIntersection,C.displacementMap=R.displacementMap,C.displacementScale=R.displacementScale,C.displacementBias=R.displacementBias,C.wireframeLinewidth=R.wireframeLinewidth,C.linewidth=R.linewidth,x.isPointLight===!0&&C.isMeshDistanceMaterial===!0){let O=i.properties.get(C);O.light=x}return C}function y(w,R,x,A,C){if(w.visible===!1)return;if(w.layers.test(R.layers)&&(w.isMesh||w.isLine||w.isPoints)&&(w.castShadow||w.receiveShadow&&C===Js)&&(!w.frustumCulled||w.intersectsFrustum(n))){w.modelViewMatrix.multiplyMatrices(x.matrixWorldInverse,w.matrixWorld);let W=e.update(w),I=w.material;if(Array.isArray(I)){let B=W.groups;for(let V=0,X=B.length;V<X;V++){let j=B[V],H=I[j.materialIndex];if(H&&H.visible){let Y=T(w,H,A,C);w.onBeforeShadow(i,w,R,x,W,Y,j),i.renderBufferDirect(x,null,W,Y,w,j),w.onAfterShadow(i,w,R,x,W,Y,j)}}}else if(I.visible){let B=T(w,I,A,C);w.onBeforeShadow(i,w,R,x,W,B,null),i.renderBufferDirect(x,null,W,B,w,null),w.onAfterShadow(i,w,R,x,W,B,null)}}let O=w.children;for(let W=0,I=O.length;W<I;W++)y(O[W],R,x,A,C)}function S(w){w.target.removeEventListener("dispose",S);for(let x in l){let A=l[x],C=w.target.uuid;C in A&&(A[C].dispose(),delete A[C])}}}function Y3(i,e){function t(){let D=!1,ae=new tt,J=null,ce=new tt(0,0,0,0);return{setMask:function(fe){J!==fe&&!D&&(i.colorMask(fe,fe,fe,fe),J=fe)},setLocked:function(fe){D=fe},setClear:function(fe,ne,Ce,be,ct){ct===!0&&(fe*=be,ne*=be,Ce*=be),ae.set(fe,ne,Ce,be),ce.equals(ae)===!1&&(i.clearColor(fe,ne,Ce,be),ce.copy(ae))},reset:function(){D=!1,J=null,ce.set(-1,0,0,0)}}}function n(){let D=!1,ae=!1,J=null,ce=null,fe=null;return{setReversed:function(ne){if(ae!==ne){let Ce=e.get("EXT_clip_control");ne?Ce.clipControlEXT(Ce.LOWER_LEFT_EXT,Ce.ZERO_TO_ONE_EXT):Ce.clipControlEXT(Ce.LOWER_LEFT_EXT,Ce.NEGATIVE_ONE_TO_ONE_EXT),ae=ne;let be=fe;fe=null,this.setClear(be)}},getReversed:function(){return ae},setTest:function(ne){ne?te(i.DEPTH_TEST):xe(i.DEPTH_TEST)},setMask:function(ne){J!==ne&&!D&&(i.depthMask(ne),J=ne)},setFunc:function(ne){if(ae&&(ne=Fu[ne]),ce!==ne){switch(ne){case $o:i.depthFunc(i.NEVER);break;case jo:i.depthFunc(i.ALWAYS);break;case Jo:i.depthFunc(i.LESS);break;case Os:i.depthFunc(i.LEQUAL);break;case Qo:i.depthFunc(i.EQUAL);break;case ea:i.depthFunc(i.GEQUAL);break;case ta:i.depthFunc(i.GREATER);break;case na:i.depthFunc(i.NOTEQUAL);break;default:i.depthFunc(i.LEQUAL)}ce=ne}},setLocked:function(ne){D=ne},setClear:function(ne){fe!==ne&&(fe=ne,ae&&(ne=1-ne),i.clearDepth(ne))},reset:function(){D=!1,J=null,ce=null,fe=null,ae=!1}}}function s(){let D=!1,ae=null,J=null,ce=null,fe=null,ne=null,Ce=null,be=null,ct=null;return{setTest:function($e){D||($e?te(i.STENCIL_TEST):xe(i.STENCIL_TEST))},setMask:function($e){ae!==$e&&!D&&(i.stencilMask($e),ae=$e)},setFunc:function($e,Sn,Un){(J!==$e||ce!==Sn||fe!==Un)&&(i.stencilFunc($e,Sn,Un),J=$e,ce=Sn,fe=Un)},setOp:function($e,Sn,Un){(ne!==$e||Ce!==Sn||be!==Un)&&(i.stencilOp($e,Sn,Un),ne=$e,Ce=Sn,be=Un)},setLocked:function($e){D=$e},setClear:function($e){ct!==$e&&(i.clearStencil($e),ct=$e)},reset:function(){D=!1,ae=null,J=null,ce=null,fe=null,ne=null,Ce=null,be=null,ct=null}}}let r=new t,o=new n,a=new s,c=new WeakMap,l=new WeakMap,h={},d={},u={},p=new WeakMap,g=[],b=null,m=!1,f=null,v=null,T=null,y=null,S=null,w=null,R=null,x=new pe(0,0,0),A=0,C=!1,L=null,O=null,W=null,I=null,B=null,V=i.getParameter(i.MAX_COMBINED_TEXTURE_IMAGE_UNITS),X=!1,j=0,H=i.getParameter(i.VERSION);H.indexOf("WebGL")!==-1?(j=parseFloat(/^WebGL (\d)/.exec(H)[1]),X=j>=1):H.indexOf("OpenGL ES")!==-1&&(j=parseFloat(/^OpenGL ES (\d)/.exec(H)[1]),X=j>=2);let Y=null,ee={},Te=i.getParameter(i.SCISSOR_BOX),Me=i.getParameter(i.VIEWPORT),ot=new tt().fromArray(Te),Xe=new tt().fromArray(Me);function Ze(D,ae,J,ce){let fe=new Uint8Array(4),ne=i.createTexture();i.bindTexture(D,ne),i.texParameteri(D,i.TEXTURE_MIN_FILTER,i.NEAREST),i.texParameteri(D,i.TEXTURE_MAG_FILTER,i.NEAREST);for(let Ce=0;Ce<J;Ce++)D===i.TEXTURE_3D||D===i.TEXTURE_2D_ARRAY?i.texImage3D(ae,0,i.RGBA,1,1,ce,0,i.RGBA,i.UNSIGNED_BYTE,fe):i.texImage2D(ae+Ce,0,i.RGBA,1,1,0,i.RGBA,i.UNSIGNED_BYTE,fe);return ne}let K={};K[i.TEXTURE_2D]=Ze(i.TEXTURE_2D,i.TEXTURE_2D,1),K[i.TEXTURE_CUBE_MAP]=Ze(i.TEXTURE_CUBE_MAP,i.TEXTURE_CUBE_MAP_POSITIVE_X,6),K[i.TEXTURE_2D_ARRAY]=Ze(i.TEXTURE_2D_ARRAY,i.TEXTURE_2D_ARRAY,1,1),K[i.TEXTURE_3D]=Ze(i.TEXTURE_3D,i.TEXTURE_3D,1,1),r.setClear(0,0,0,1),o.setClear(1),a.setClear(0),te(i.DEPTH_TEST),o.setFunc(Os),We(!1),pt(xl),te(i.CULL_FACE),Ye(Hn);function te(D){h[D]!==!0&&(i.enable(D),h[D]=!0)}function xe(D){h[D]!==!1&&(i.disable(D),h[D]=!1)}function De(D,ae){return u[D]!==ae?(i.bindFramebuffer(D,ae),u[D]=ae,D===i.DRAW_FRAMEBUFFER&&(u[i.FRAMEBUFFER]=ae),D===i.FRAMEBUFFER&&(u[i.DRAW_FRAMEBUFFER]=ae),!0):!1}function ge(D,ae){let J=g,ce=!1;if(D){J=p.get(ae),J===void 0&&(J=[],p.set(ae,J));let fe=D.textures;if(J.length!==fe.length||J[0]!==i.COLOR_ATTACHMENT0){for(let ne=0,Ce=fe.length;ne<Ce;ne++)J[ne]=i.COLOR_ATTACHMENT0+ne;J.length=fe.length,ce=!0}}else J[0]!==i.BACK&&(J[0]=i.BACK,ce=!0);ce&&i.drawBuffers(J)}function ze(D){return b!==D?(i.useProgram(D),b=D,!0):!1}let Rt={[as]:i.FUNC_ADD,[tu]:i.FUNC_SUBTRACT,[nu]:i.FUNC_REVERSE_SUBTRACT};Rt[iu]=i.MIN,Rt[su]=i.MAX;let Ve={[ru]:i.ZERO,[ou]:i.ONE,[au]:i.SRC_COLOR,[bl]:i.SRC_ALPHA,[fu]:i.SRC_ALPHA_SATURATE,[uu]:i.DST_COLOR,[lu]:i.DST_ALPHA,[cu]:i.ONE_MINUS_SRC_COLOR,[Sl]:i.ONE_MINUS_SRC_ALPHA,[du]:i.ONE_MINUS_DST_COLOR,[hu]:i.ONE_MINUS_DST_ALPHA,[pu]:i.CONSTANT_COLOR,[mu]:i.ONE_MINUS_CONSTANT_COLOR,[gu]:i.CONSTANT_ALPHA,[_u]:i.ONE_MINUS_CONSTANT_ALPHA};function Ye(D,ae,J,ce,fe,ne,Ce,be,ct,$e){if(D===Hn){m===!0&&(xe(i.BLEND),m=!1);return}if(m===!1&&(te(i.BLEND),m=!0),D!==eu){if(D!==f||$e!==C){if((v!==as||S!==as)&&(i.blendEquation(i.FUNC_ADD),v=as,S=as),$e)switch(D){case Qs:i.blendFuncSeparate(i.ONE,i.ONE_MINUS_SRC_ALPHA,i.ONE,i.ONE_MINUS_SRC_ALPHA);break;case yl:i.blendFunc(i.ONE,i.ONE);break;case vl:i.blendFuncSeparate(i.ZERO,i.ONE_MINUS_SRC_COLOR,i.ZERO,i.ONE);break;case Ml:i.blendFuncSeparate(i.DST_COLOR,i.ONE_MINUS_SRC_ALPHA,i.ZERO,i.ONE);break;default:Pe("WebGLState: Invalid blending: ",D);break}else switch(D){case Qs:i.blendFuncSeparate(i.SRC_ALPHA,i.ONE_MINUS_SRC_ALPHA,i.ONE,i.ONE_MINUS_SRC_ALPHA);break;case yl:i.blendFuncSeparate(i.SRC_ALPHA,i.ONE,i.ONE,i.ONE);break;case vl:Pe("WebGLState: SubtractiveBlending requires material.premultipliedAlpha = true");break;case Ml:Pe("WebGLState: MultiplyBlending requires material.premultipliedAlpha = true");break;default:Pe("WebGLState: Invalid blending: ",D);break}T=null,y=null,w=null,R=null,x.set(0,0,0),A=0,f=D,C=$e}return}fe=fe||ae,ne=ne||J,Ce=Ce||ce,(ae!==v||fe!==S)&&(i.blendEquationSeparate(Rt[ae],Rt[fe]),v=ae,S=fe),(J!==T||ce!==y||ne!==w||Ce!==R)&&(i.blendFuncSeparate(Ve[J],Ve[ce],Ve[ne],Ve[Ce]),T=J,y=ce,w=ne,R=Ce),(be.equals(x)===!1||ct!==A)&&(i.blendColor(be.r,be.g,be.b,ct),x.copy(be),A=ct),f=D,C=!1}function at(D,ae){D.side===on?xe(i.CULL_FACE):te(i.CULL_FACE);let J=D.side===zt;ae&&(J=!J),We(J),D.blending===Qs&&D.transparent===!1?Ye(Hn):Ye(D.blending,D.blendEquation,D.blendSrc,D.blendDst,D.blendEquationAlpha,D.blendSrcAlpha,D.blendDstAlpha,D.blendColor,D.blendAlpha,D.premultipliedAlpha),o.setFunc(D.depthFunc),o.setTest(D.depthTest),o.setMask(D.depthWrite),r.setMask(D.colorWrite);let ce=D.stencilWrite;a.setTest(ce),ce&&(a.setMask(D.stencilWriteMask),a.setFunc(D.stencilFunc,D.stencilRef,D.stencilFuncMask),a.setOp(D.stencilFail,D.stencilZFail,D.stencilZPass)),en(D.polygonOffset,D.polygonOffsetFactor,D.polygonOffsetUnits),D.alphaToCoverage===!0?te(i.SAMPLE_ALPHA_TO_COVERAGE):xe(i.SAMPLE_ALPHA_TO_COVERAGE)}function We(D){L!==D&&(D?i.frontFace(i.CW):i.frontFace(i.CCW),L=D)}function pt(D){D!==jh?(te(i.CULL_FACE),D!==O&&(D===xl?i.cullFace(i.BACK):D===Jh?i.cullFace(i.FRONT):i.cullFace(i.FRONT_AND_BACK))):xe(i.CULL_FACE),O=D}function Ut(D){D!==W&&(X&&i.lineWidth(D),W=D)}function en(D,ae,J){D?(te(i.POLYGON_OFFSET_FILL),(I!==ae||B!==J)&&(I=ae,B=J,o.getReversed()&&(ae=-ae),i.polygonOffset(ae,J))):xe(i.POLYGON_OFFSET_FILL)}function mt(D){D?te(i.SCISSOR_TEST):xe(i.SCISSOR_TEST)}function wt(D){D===void 0&&(D=i.TEXTURE0+V-1),Y!==D&&(i.activeTexture(D),Y=D)}function U(D,ae,J){J===void 0&&(Y===null?J=i.TEXTURE0+V-1:J=Y);let ce=ee[J];ce===void 0&&(ce={type:void 0,texture:void 0},ee[J]=ce),(ce.type!==D||ce.texture!==ae)&&(Y!==J&&(i.activeTexture(J),Y=J),i.bindTexture(D,ae||K[D]),ce.type=D,ce.texture=ae)}function Ht(){let D=ee[Y];D!==void 0&&D.type!==void 0&&(i.bindTexture(D.type,null),D.type=void 0,D.texture=void 0)}function Qe(){try{i.compressedTexImage2D(...arguments)}catch(D){Pe("WebGLState:",D)}}function E(){try{i.compressedTexImage3D(...arguments)}catch(D){Pe("WebGLState:",D)}}function _(){try{i.texSubImage2D(...arguments)}catch(D){Pe("WebGLState:",D)}}function F(){try{i.texSubImage3D(...arguments)}catch(D){Pe("WebGLState:",D)}}function G(){try{i.compressedTexSubImage2D(...arguments)}catch(D){Pe("WebGLState:",D)}}function Z(){try{i.compressedTexSubImage3D(...arguments)}catch(D){Pe("WebGLState:",D)}}function ie(){try{i.texStorage2D(...arguments)}catch(D){Pe("WebGLState:",D)}}function se(){try{i.texStorage3D(...arguments)}catch(D){Pe("WebGLState:",D)}}function $(){try{i.texImage2D(...arguments)}catch(D){Pe("WebGLState:",D)}}function Q(){try{i.texImage3D(...arguments)}catch(D){Pe("WebGLState:",D)}}function re(D){return d[D]!==void 0?d[D]:i.getParameter(D)}function Ee(D,ae){d[D]!==ae&&(i.pixelStorei(D,ae),d[D]=ae)}function le(D){ot.equals(D)===!1&&(i.scissor(D.x,D.y,D.z,D.w),ot.copy(D))}function oe(D){Xe.equals(D)===!1&&(i.viewport(D.x,D.y,D.z,D.w),Xe.copy(D))}function Re(D,ae){let J=l.get(ae);J===void 0&&(J=new WeakMap,l.set(ae,J));let ce=J.get(D);ce===void 0&&(ce=i.getUniformBlockIndex(ae,D.name),J.set(D,ce))}function Ie(D,ae){let ce=l.get(ae).get(D);c.get(ae)!==ce&&(i.uniformBlockBinding(ae,ce,D.__bindingPointIndex),c.set(ae,ce))}function Ne(){i.disable(i.BLEND),i.disable(i.CULL_FACE),i.disable(i.DEPTH_TEST),i.disable(i.POLYGON_OFFSET_FILL),i.disable(i.SCISSOR_TEST),i.disable(i.STENCIL_TEST),i.disable(i.SAMPLE_ALPHA_TO_COVERAGE),i.blendEquation(i.FUNC_ADD),i.blendFunc(i.ONE,i.ZERO),i.blendFuncSeparate(i.ONE,i.ZERO,i.ONE,i.ZERO),i.blendColor(0,0,0,0),i.colorMask(!0,!0,!0,!0),i.clearColor(0,0,0,0),i.depthMask(!0),i.depthFunc(i.LESS),o.setReversed(!1),i.clearDepth(1),i.stencilMask(4294967295),i.stencilFunc(i.ALWAYS,0,4294967295),i.stencilOp(i.KEEP,i.KEEP,i.KEEP),i.clearStencil(0),i.cullFace(i.BACK),i.frontFace(i.CCW),i.polygonOffset(0,0),i.activeTexture(i.TEXTURE0),i.bindFramebuffer(i.FRAMEBUFFER,null),i.bindFramebuffer(i.DRAW_FRAMEBUFFER,null),i.bindFramebuffer(i.READ_FRAMEBUFFER,null),i.useProgram(null),i.lineWidth(1),i.scissor(0,0,i.canvas.width,i.canvas.height),i.viewport(0,0,i.canvas.width,i.canvas.height),i.pixelStorei(i.PACK_ALIGNMENT,4),i.pixelStorei(i.UNPACK_ALIGNMENT,4),i.pixelStorei(i.UNPACK_FLIP_Y_WEBGL,!1),i.pixelStorei(i.UNPACK_PREMULTIPLY_ALPHA_WEBGL,!1),i.pixelStorei(i.UNPACK_COLORSPACE_CONVERSION_WEBGL,i.BROWSER_DEFAULT_WEBGL),i.pixelStorei(i.PACK_ROW_LENGTH,0),i.pixelStorei(i.PACK_SKIP_PIXELS,0),i.pixelStorei(i.PACK_SKIP_ROWS,0),i.pixelStorei(i.UNPACK_ROW_LENGTH,0),i.pixelStorei(i.UNPACK_IMAGE_HEIGHT,0),i.pixelStorei(i.UNPACK_SKIP_PIXELS,0),i.pixelStorei(i.UNPACK_SKIP_ROWS,0),i.pixelStorei(i.UNPACK_SKIP_IMAGES,0),h={},d={},Y=null,ee={},u={},p=new WeakMap,g=[],b=null,m=!1,f=null,v=null,T=null,y=null,S=null,w=null,R=null,x=new pe(0,0,0),A=0,C=!1,L=null,O=null,W=null,I=null,B=null,ot.set(0,0,i.canvas.width,i.canvas.height),Xe.set(0,0,i.canvas.width,i.canvas.height),r.reset(),o.reset(),a.reset()}return{buffers:{color:r,depth:o,stencil:a},enable:te,disable:xe,bindFramebuffer:De,drawBuffers:ge,useProgram:ze,setBlending:Ye,setMaterial:at,setFlipSided:We,setCullFace:pt,setLineWidth:Ut,setPolygonOffset:en,setScissorTest:mt,activeTexture:wt,bindTexture:U,unbindTexture:Ht,compressedTexImage2D:Qe,compressedTexImage3D:E,texImage2D:$,texImage3D:Q,pixelStorei:Ee,getParameter:re,updateUBOMapping:Re,uniformBlockBinding:Ie,texStorage2D:ie,texStorage3D:se,texSubImage2D:_,texSubImage3D:F,compressedTexSubImage2D:G,compressedTexSubImage3D:Z,scissor:le,viewport:oe,reset:Ne}}function Z3(i,e,t,n,s,r,o){let a=e.has("WEBGL_multisampled_render_to_texture")?e.get("WEBGL_multisampled_render_to_texture"):null,c=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),l=new we,h=new WeakMap,d=new Set,u,p=new WeakMap,g=!1;try{g=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function b(E,_){return g?new OffscreenCanvas(E,_):ks("canvas")}function m(E,_,F){let G=1,Z=Qe(E);if((Z.width>F||Z.height>F)&&(G=F/Math.max(Z.width,Z.height)),G<1)if(typeof HTMLImageElement<"u"&&E instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&E instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&E instanceof ImageBitmap||typeof VideoFrame<"u"&&E instanceof VideoFrame){let ie=Math.floor(G*Z.width),se=Math.floor(G*Z.height);u===void 0&&(u=b(ie,se));let $=_?b(ie,se):u;return $.width=ie,$.height=se,$.getContext("2d").drawImage(E,0,0,ie,se),Ae("WebGLRenderer: Texture has been resized from ("+Z.width+"x"+Z.height+") to ("+ie+"x"+se+")."),$}else return"data"in E&&Ae("WebGLRenderer: Image in DataTexture is too big ("+Z.width+"x"+Z.height+")."),E;return E}function f(E){return E.generateMipmaps}function v(E){i.generateMipmap(E)}function T(E){return E.isWebGLCubeRenderTarget?i.TEXTURE_CUBE_MAP:E.isWebGL3DRenderTarget?i.TEXTURE_3D:E.isWebGLArrayRenderTarget||E.isCompressedArrayTexture?i.TEXTURE_2D_ARRAY:i.TEXTURE_2D}function y(E,_,F,G,Z,ie=!1){if(E!==null){if(i[E]!==void 0)return i[E];Ae("WebGLRenderer: Attempt to use non-existing WebGL internal format '"+E+"'")}let se;G&&(se=e.get("EXT_texture_norm16"),se||Ae("WebGLRenderer: Unable to use normalized textures without EXT_texture_norm16 extension"));let $=_;if(_===i.RED&&(F===i.FLOAT&&($=i.R32F),F===i.HALF_FLOAT&&($=i.R16F),F===i.UNSIGNED_BYTE&&($=i.R8),F===i.UNSIGNED_SHORT&&se&&($=se.R16_EXT),F===i.SHORT&&se&&($=se.R16_SNORM_EXT)),_===i.RED_INTEGER&&(F===i.UNSIGNED_BYTE&&($=i.R8UI),F===i.UNSIGNED_SHORT&&($=i.R16UI),F===i.UNSIGNED_INT&&($=i.R32UI),F===i.BYTE&&($=i.R8I),F===i.SHORT&&($=i.R16I),F===i.INT&&($=i.R32I)),_===i.RG&&(F===i.FLOAT&&($=i.RG32F),F===i.HALF_FLOAT&&($=i.RG16F),F===i.UNSIGNED_BYTE&&($=i.RG8),F===i.UNSIGNED_SHORT&&se&&($=se.RG16_EXT),F===i.SHORT&&se&&($=se.RG16_SNORM_EXT)),_===i.RG_INTEGER&&(F===i.UNSIGNED_BYTE&&($=i.RG8UI),F===i.UNSIGNED_SHORT&&($=i.RG16UI),F===i.UNSIGNED_INT&&($=i.RG32UI),F===i.BYTE&&($=i.RG8I),F===i.SHORT&&($=i.RG16I),F===i.INT&&($=i.RG32I)),_===i.RGB_INTEGER&&(F===i.UNSIGNED_BYTE&&($=i.RGB8UI),F===i.UNSIGNED_SHORT&&($=i.RGB16UI),F===i.UNSIGNED_INT&&($=i.RGB32UI),F===i.BYTE&&($=i.RGB8I),F===i.SHORT&&($=i.RGB16I),F===i.INT&&($=i.RGB32I)),_===i.RGBA_INTEGER&&(F===i.UNSIGNED_BYTE&&($=i.RGBA8UI),F===i.UNSIGNED_SHORT&&($=i.RGBA16UI),F===i.UNSIGNED_INT&&($=i.RGBA32UI),F===i.BYTE&&($=i.RGBA8I),F===i.SHORT&&($=i.RGBA16I),F===i.INT&&($=i.RGBA32I)),_===i.RGB&&(F===i.UNSIGNED_SHORT&&se&&($=se.RGB16_EXT),F===i.SHORT&&se&&($=se.RGB16_SNORM_EXT),F===i.UNSIGNED_INT_5_9_9_9_REV&&($=i.RGB9_E5),F===i.UNSIGNED_INT_10F_11F_11F_REV&&($=i.R11F_G11F_B10F)),_===i.RGBA){let Q=ie?Cr:Be.getTransfer(Z);F===i.FLOAT&&($=i.RGBA32F),F===i.HALF_FLOAT&&($=i.RGBA16F),F===i.UNSIGNED_BYTE&&($=Q===Je?i.SRGB8_ALPHA8:i.RGBA8),F===i.UNSIGNED_SHORT&&se&&($=se.RGBA16_EXT),F===i.SHORT&&se&&($=se.RGBA16_SNORM_EXT),F===i.UNSIGNED_SHORT_4_4_4_4&&($=i.RGBA4),F===i.UNSIGNED_SHORT_5_5_5_1&&($=i.RGB5_A1)}return($===i.R16F||$===i.R32F||$===i.RG16F||$===i.RG32F||$===i.RGBA16F||$===i.RGBA32F)&&e.get("EXT_color_buffer_float"),$}function S(E,_){let F;return E?_===null||_===Dn||_===nr?F=i.DEPTH24_STENCIL8:_===dn?F=i.DEPTH32F_STENCIL8:_===tr&&(F=i.DEPTH24_STENCIL8,Ae("DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.")):_===null||_===Dn||_===nr?F=i.DEPTH_COMPONENT24:_===dn?F=i.DEPTH_COMPONENT32F:_===tr&&(F=i.DEPTH_COMPONENT16),F}function w(E,_){return f(E)===!0||E.isFramebufferTexture&&E.minFilter!==Mt&&E.minFilter!==gt?Math.log2(Math.max(_.width,_.height))+1:E.mipmaps!==void 0&&E.mipmaps.length>0?E.mipmaps.length:E.isCompressedTexture&&Array.isArray(E.image)?_.mipmaps.length:1}function R(E){let _=E.target;_.removeEventListener("dispose",R),A(_),_.isVideoTexture&&h.delete(_),_.isHTMLTexture&&d.delete(_)}function x(E){let _=E.target;_.removeEventListener("dispose",x),L(_)}function A(E){let _=n.get(E);if(_.__webglInit===void 0)return;let F=E.source,G=p.get(F);if(G){let Z=G[_.__cacheKey];Z.usedTimes--,Z.usedTimes===0&&C(E),Object.keys(G).length===0&&p.delete(F)}n.remove(E)}function C(E){let _=n.get(E);i.deleteTexture(_.__webglTexture);let F=E.source,G=p.get(F);delete G[_.__cacheKey],o.memory.textures--}function L(E){let _=n.get(E);if(E.depthTexture&&(E.depthTexture.dispose(),n.remove(E.depthTexture)),E.isWebGLCubeRenderTarget)for(let G=0;G<6;G++){if(Array.isArray(_.__webglFramebuffer[G]))for(let Z=0;Z<_.__webglFramebuffer[G].length;Z++)i.deleteFramebuffer(_.__webglFramebuffer[G][Z]);else i.deleteFramebuffer(_.__webglFramebuffer[G]);_.__webglDepthbuffer&&i.deleteRenderbuffer(_.__webglDepthbuffer[G])}else{if(Array.isArray(_.__webglFramebuffer))for(let G=0;G<_.__webglFramebuffer.length;G++)i.deleteFramebuffer(_.__webglFramebuffer[G]);else i.deleteFramebuffer(_.__webglFramebuffer);if(_.__webglDepthbuffer&&i.deleteRenderbuffer(_.__webglDepthbuffer),_.__webglMultisampledFramebuffer&&i.deleteFramebuffer(_.__webglMultisampledFramebuffer),_.__webglColorRenderbuffer)for(let G=0;G<_.__webglColorRenderbuffer.length;G++)_.__webglColorRenderbuffer[G]&&i.deleteRenderbuffer(_.__webglColorRenderbuffer[G]);_.__webglDepthRenderbuffer&&i.deleteRenderbuffer(_.__webglDepthRenderbuffer)}let F=E.textures;for(let G=0,Z=F.length;G<Z;G++){let ie=n.get(F[G]);ie.__webglTexture&&(i.deleteTexture(ie.__webglTexture),o.memory.textures--),n.remove(F[G])}n.remove(E)}let O=0;function W(){O=0}function I(){return O}function B(E){O=E}function V(){let E=O;return E>=s.maxTextures&&Ae("WebGLTextures: Trying to use "+(E+1)+" texture units while this GPU supports only "+s.maxTextures),O+=1,E}function X(E){let _=[];return _.push(E.wrapS),_.push(E.wrapT),_.push(E.wrapR||0),_.push(E.magFilter),_.push(E.minFilter),_.push(E.anisotropy),_.push(E.internalFormat),_.push(E.format),_.push(E.type),_.push(E.generateMipmaps),_.push(E.premultiplyAlpha),_.push(E.flipY),_.push(E.unpackAlignment),_.push(E.colorSpace),_.join()}function j(E,_){let F=n.get(E);if(E.isVideoTexture&&U(E),E.isRenderTargetTexture===!1&&E.isExternalTexture!==!0&&E.version>0&&F.__version!==E.version){let G=E.image;if(G===null)Ae("WebGLRenderer: Texture marked for update but no image data found.");else if(G.complete===!1)Ae("WebGLRenderer: Texture marked for update but image is incomplete");else{xe(F,E,_);return}}else E.isExternalTexture&&(F.__webglTexture=E.sourceTexture?E.sourceTexture:null);t.bindTexture(i.TEXTURE_2D,F.__webglTexture,i.TEXTURE0+_)}function H(E,_){let F=n.get(E);if(E.isRenderTargetTexture===!1&&E.version>0&&F.__version!==E.version){xe(F,E,_);return}else E.isExternalTexture&&(F.__webglTexture=E.sourceTexture?E.sourceTexture:null);t.bindTexture(i.TEXTURE_2D_ARRAY,F.__webglTexture,i.TEXTURE0+_)}function Y(E,_){let F=n.get(E);if(E.isRenderTargetTexture===!1&&E.version>0&&F.__version!==E.version){xe(F,E,_);return}t.bindTexture(i.TEXTURE_3D,F.__webglTexture,i.TEXTURE0+_)}function ee(E,_){let F=n.get(E);if(E.isCubeDepthTexture!==!0&&E.version>0&&F.__version!==E.version){De(F,E,_);return}t.bindTexture(i.TEXTURE_CUBE_MAP,F.__webglTexture,i.TEXTURE0+_)}let Te={[Ai]:i.REPEAT,[_n]:i.CLAMP_TO_EDGE,[Fs]:i.MIRRORED_REPEAT},Me={[Mt]:i.NEAREST,[Ra]:i.NEAREST_MIPMAP_NEAREST,[hs]:i.NEAREST_MIPMAP_LINEAR,[gt]:i.LINEAR,[er]:i.LINEAR_MIPMAP_NEAREST,[un]:i.LINEAR_MIPMAP_LINEAR},ot={[Ru]:i.NEVER,[Du]:i.ALWAYS,[Cu]:i.LESS,[dc]:i.LEQUAL,[Iu]:i.EQUAL,[fc]:i.GEQUAL,[Pu]:i.GREATER,[Lu]:i.NOTEQUAL};function Xe(E,_){if(_.type===dn&&e.has("OES_texture_float_linear")===!1&&(_.magFilter===gt||_.magFilter===er||_.magFilter===hs||_.magFilter===un||_.minFilter===gt||_.minFilter===er||_.minFilter===hs||_.minFilter===un)&&Ae("WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device."),i.texParameteri(E,i.TEXTURE_WRAP_S,Te[_.wrapS]),i.texParameteri(E,i.TEXTURE_WRAP_T,Te[_.wrapT]),(E===i.TEXTURE_3D||E===i.TEXTURE_2D_ARRAY)&&i.texParameteri(E,i.TEXTURE_WRAP_R,Te[_.wrapR]),i.texParameteri(E,i.TEXTURE_MAG_FILTER,Me[_.magFilter]),i.texParameteri(E,i.TEXTURE_MIN_FILTER,Me[_.minFilter]),_.compareFunction&&(i.texParameteri(E,i.TEXTURE_COMPARE_MODE,i.COMPARE_REF_TO_TEXTURE),i.texParameteri(E,i.TEXTURE_COMPARE_FUNC,ot[_.compareFunction])),e.has("EXT_texture_filter_anisotropic")===!0){if(_.magFilter===Mt||_.minFilter!==hs&&_.minFilter!==un||_.type===dn&&e.has("OES_texture_float_linear")===!1)return;if(_.anisotropy>1||n.get(_).__currentAnisotropy){let F=e.get("EXT_texture_filter_anisotropic");i.texParameterf(E,F.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(_.anisotropy,s.getMaxAnisotropy())),n.get(_).__currentAnisotropy=_.anisotropy}}}function Ze(E,_){let F=!1;E.__webglInit===void 0&&(E.__webglInit=!0,_.addEventListener("dispose",R));let G=_.source,Z=p.get(G);Z===void 0&&(Z={},p.set(G,Z));let ie=X(_);if(ie!==E.__cacheKey){Z[ie]===void 0&&(Z[ie]={texture:i.createTexture(),usedTimes:0},o.memory.textures++,F=!0),Z[ie].usedTimes++;let se=Z[E.__cacheKey];se!==void 0&&(Z[E.__cacheKey].usedTimes--,se.usedTimes===0&&C(_)),E.__cacheKey=ie,E.__webglTexture=Z[ie].texture}return F}function K(E,_,F){return Math.floor(Math.floor(E/F)/_)}function te(E,_,F,G){let ie=E.updateRanges;if(ie.length===0)t.texSubImage2D(i.TEXTURE_2D,0,0,0,_.width,_.height,F,G,_.data);else{ie.sort((Ee,le)=>Ee.start-le.start);let se=0;for(let Ee=1;Ee<ie.length;Ee++){let le=ie[se],oe=ie[Ee],Re=le.start+le.count,Ie=K(oe.start,_.width,4),Ne=K(le.start,_.width,4);oe.start<=Re+1&&Ie===Ne&&K(oe.start+oe.count-1,_.width,4)===Ie?le.count=Math.max(le.count,oe.start+oe.count-le.start):(++se,ie[se]=oe)}ie.length=se+1;let $=t.getParameter(i.UNPACK_ROW_LENGTH),Q=t.getParameter(i.UNPACK_SKIP_PIXELS),re=t.getParameter(i.UNPACK_SKIP_ROWS);t.pixelStorei(i.UNPACK_ROW_LENGTH,_.width);for(let Ee=0,le=ie.length;Ee<le;Ee++){let oe=ie[Ee],Re=Math.floor(oe.start/4),Ie=Math.ceil(oe.count/4),Ne=Re%_.width,D=Math.floor(Re/_.width),ae=Ie,J=1;t.pixelStorei(i.UNPACK_SKIP_PIXELS,Ne),t.pixelStorei(i.UNPACK_SKIP_ROWS,D),t.texSubImage2D(i.TEXTURE_2D,0,Ne,D,ae,J,F,G,_.data)}E.clearUpdateRanges(),t.pixelStorei(i.UNPACK_ROW_LENGTH,$),t.pixelStorei(i.UNPACK_SKIP_PIXELS,Q),t.pixelStorei(i.UNPACK_SKIP_ROWS,re)}}function xe(E,_,F){let G=i.TEXTURE_2D;(_.isDataArrayTexture||_.isCompressedArrayTexture)&&(G=i.TEXTURE_2D_ARRAY),_.isData3DTexture&&(G=i.TEXTURE_3D);let Z=Ze(E,_),ie=_.source;t.bindTexture(G,E.__webglTexture,i.TEXTURE0+F);let se=n.get(ie);if(ie.version!==se.__version||Z===!0){if(t.activeTexture(i.TEXTURE0+F),(typeof ImageBitmap<"u"&&_.image instanceof ImageBitmap)===!1){let J=Be.getPrimaries(Be.workingColorSpace),ce=_.colorSpace===di?null:Be.getPrimaries(_.colorSpace),fe=_.colorSpace===di||J===ce?i.NONE:i.BROWSER_DEFAULT_WEBGL;t.pixelStorei(i.UNPACK_FLIP_Y_WEBGL,_.flipY),t.pixelStorei(i.UNPACK_PREMULTIPLY_ALPHA_WEBGL,_.premultiplyAlpha),t.pixelStorei(i.UNPACK_COLORSPACE_CONVERSION_WEBGL,fe)}t.pixelStorei(i.UNPACK_ALIGNMENT,_.unpackAlignment);let Q=m(_.image,!1,s.maxTextureSize);Q=Ht(_,Q);let re=r.convert(_.format,_.colorSpace),Ee=r.convert(_.type),le=y(_.internalFormat,re,Ee,_.normalized,_.colorSpace,_.isVideoTexture);Xe(G,_);let oe,Re=_.mipmaps,Ie=_.isVideoTexture!==!0,Ne=se.__version===void 0||Z===!0,D=ie.dataReady,ae=w(_,Q);if(_.isDepthTexture)le=S(_.format===Oi,_.type),Ne&&(Ie?t.texStorage2D(i.TEXTURE_2D,1,le,Q.width,Q.height):t.texImage2D(i.TEXTURE_2D,0,le,Q.width,Q.height,0,re,Ee,null));else if(_.isDataTexture)if(Re.length>0){Ie&&Ne&&t.texStorage2D(i.TEXTURE_2D,ae,le,Re[0].width,Re[0].height);for(let J=0,ce=Re.length;J<ce;J++)oe=Re[J],Ie?D&&t.texSubImage2D(i.TEXTURE_2D,J,0,0,oe.width,oe.height,re,Ee,oe.data):t.texImage2D(i.TEXTURE_2D,J,le,oe.width,oe.height,0,re,Ee,oe.data);_.generateMipmaps=!1}else Ie?(Ne&&t.texStorage2D(i.TEXTURE_2D,ae,le,Q.width,Q.height),D&&te(_,Q,re,Ee)):t.texImage2D(i.TEXTURE_2D,0,le,Q.width,Q.height,0,re,Ee,Q.data);else if(_.isCompressedTexture)if(_.isCompressedArrayTexture){Ie&&Ne&&t.texStorage3D(i.TEXTURE_2D_ARRAY,ae,le,Re[0].width,Re[0].height,Q.depth);for(let J=0,ce=Re.length;J<ce;J++)if(oe=Re[J],_.format!==fn)if(re!==null)if(Ie){if(D)if(_.layerUpdates.size>0){let fe=Xl(oe.width,oe.height,_.format,_.type);for(let ne of _.layerUpdates){let Ce=oe.data.subarray(ne*fe/oe.data.BYTES_PER_ELEMENT,(ne+1)*fe/oe.data.BYTES_PER_ELEMENT);t.compressedTexSubImage3D(i.TEXTURE_2D_ARRAY,J,0,0,ne,oe.width,oe.height,1,re,Ce)}}else t.compressedTexSubImage3D(i.TEXTURE_2D_ARRAY,J,0,0,0,oe.width,oe.height,Q.depth,re,oe.data)}else t.compressedTexImage3D(i.TEXTURE_2D_ARRAY,J,le,oe.width,oe.height,Q.depth,0,oe.data,0,0);else Ae("WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");else Ie?D&&t.texSubImage3D(i.TEXTURE_2D_ARRAY,J,0,0,0,oe.width,oe.height,Q.depth,re,Ee,oe.data):t.texImage3D(i.TEXTURE_2D_ARRAY,J,le,oe.width,oe.height,Q.depth,0,re,Ee,oe.data);_.layerUpdates.size>0&&_.clearLayerUpdates()}else{Ie&&Ne&&t.texStorage2D(i.TEXTURE_2D,ae,le,Re[0].width,Re[0].height);for(let J=0,ce=Re.length;J<ce;J++)oe=Re[J],_.format!==fn?re!==null?Ie?D&&t.compressedTexSubImage2D(i.TEXTURE_2D,J,0,0,oe.width,oe.height,re,oe.data):t.compressedTexImage2D(i.TEXTURE_2D,J,le,oe.width,oe.height,0,oe.data):Ae("WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):Ie?D&&t.texSubImage2D(i.TEXTURE_2D,J,0,0,oe.width,oe.height,re,Ee,oe.data):t.texImage2D(i.TEXTURE_2D,J,le,oe.width,oe.height,0,re,Ee,oe.data)}else if(_.isDataArrayTexture)if(Ie){if(Ne&&t.texStorage3D(i.TEXTURE_2D_ARRAY,ae,le,Q.width,Q.height,Q.depth),D)if(_.layerUpdates.size>0){let J=Xl(Q.width,Q.height,_.format,_.type);for(let ce of _.layerUpdates){let fe=Q.data.subarray(ce*J/Q.data.BYTES_PER_ELEMENT,(ce+1)*J/Q.data.BYTES_PER_ELEMENT);t.texSubImage3D(i.TEXTURE_2D_ARRAY,0,0,0,ce,Q.width,Q.height,1,re,Ee,fe)}_.clearLayerUpdates()}else t.texSubImage3D(i.TEXTURE_2D_ARRAY,0,0,0,0,Q.width,Q.height,Q.depth,re,Ee,Q.data)}else t.texImage3D(i.TEXTURE_2D_ARRAY,0,le,Q.width,Q.height,Q.depth,0,re,Ee,Q.data);else if(_.isData3DTexture)Ie?(Ne&&t.texStorage3D(i.TEXTURE_3D,ae,le,Q.width,Q.height,Q.depth),D&&t.texSubImage3D(i.TEXTURE_3D,0,0,0,0,Q.width,Q.height,Q.depth,re,Ee,Q.data)):t.texImage3D(i.TEXTURE_3D,0,le,Q.width,Q.height,Q.depth,0,re,Ee,Q.data);else if(_.isFramebufferTexture){if(Ne)if(Ie)t.texStorage2D(i.TEXTURE_2D,ae,le,Q.width,Q.height);else{let J=Q.width,ce=Q.height;for(let fe=0;fe<ae;fe++)t.texImage2D(i.TEXTURE_2D,fe,le,J,ce,0,re,Ee,null),J>>=1,ce>>=1}}else if(_.isHTMLTexture){if("texElementImage2D"in i){let J=i.canvas;if(J.hasAttribute("layoutsubtree")||J.setAttribute("layoutsubtree","true"),Q.parentNode!==J){J.appendChild(Q),d.add(_),J.onpaint=ce=>{let fe=ce.changedElements;for(let ne of d)fe.includes(ne.image)&&(ne.needsUpdate=!0)},J.requestPaint();return}if(i.texElementImage2D.length===3)i.texElementImage2D(i.TEXTURE_2D,i.RGBA8,Q);else{let fe=i.RGBA,ne=i.RGBA,Ce=i.UNSIGNED_BYTE;i.texElementImage2D(i.TEXTURE_2D,0,fe,ne,Ce,Q)}i.texParameteri(i.TEXTURE_2D,i.TEXTURE_MIN_FILTER,i.LINEAR),i.texParameteri(i.TEXTURE_2D,i.TEXTURE_WRAP_S,i.CLAMP_TO_EDGE),i.texParameteri(i.TEXTURE_2D,i.TEXTURE_WRAP_T,i.CLAMP_TO_EDGE)}}else if(Re.length>0){if(Ie&&Ne){let J=Qe(Re[0]);t.texStorage2D(i.TEXTURE_2D,ae,le,J.width,J.height)}for(let J=0,ce=Re.length;J<ce;J++)oe=Re[J],Ie?D&&t.texSubImage2D(i.TEXTURE_2D,J,0,0,re,Ee,oe):t.texImage2D(i.TEXTURE_2D,J,le,re,Ee,oe);_.generateMipmaps=!1}else if(Ie){if(Ne){let J=Qe(Q);t.texStorage2D(i.TEXTURE_2D,ae,le,J.width,J.height)}D&&t.texSubImage2D(i.TEXTURE_2D,0,0,0,re,Ee,Q)}else t.texImage2D(i.TEXTURE_2D,0,le,re,Ee,Q);f(_)&&v(G),se.__version=ie.version,_.onUpdate&&_.onUpdate(_)}E.__version=_.version}function De(E,_,F){if(_.image.length!==6)return;let G=Ze(E,_),Z=_.source;t.bindTexture(i.TEXTURE_CUBE_MAP,E.__webglTexture,i.TEXTURE0+F);let ie=n.get(Z);if(Z.version!==ie.__version||G===!0){t.activeTexture(i.TEXTURE0+F);let se=Be.getPrimaries(Be.workingColorSpace),$=_.colorSpace===di?null:Be.getPrimaries(_.colorSpace),Q=_.colorSpace===di||se===$?i.NONE:i.BROWSER_DEFAULT_WEBGL;t.pixelStorei(i.UNPACK_FLIP_Y_WEBGL,_.flipY),t.pixelStorei(i.UNPACK_PREMULTIPLY_ALPHA_WEBGL,_.premultiplyAlpha),t.pixelStorei(i.UNPACK_ALIGNMENT,_.unpackAlignment),t.pixelStorei(i.UNPACK_COLORSPACE_CONVERSION_WEBGL,Q);let re=_.isCompressedTexture||_.image[0].isCompressedTexture,Ee=_.image[0]&&_.image[0].isDataTexture,le=[];for(let ne=0;ne<6;ne++)!re&&!Ee?le[ne]=m(_.image[ne],!0,s.maxCubemapSize):le[ne]=Ee?_.image[ne].image:_.image[ne],le[ne]=Ht(_,le[ne]);let oe=le[0],Re=r.convert(_.format,_.colorSpace),Ie=r.convert(_.type),Ne=y(_.internalFormat,Re,Ie,_.normalized,_.colorSpace),D=_.isVideoTexture!==!0,ae=ie.__version===void 0||G===!0,J=Z.dataReady,ce=w(_,oe);Xe(i.TEXTURE_CUBE_MAP,_);let fe;if(re){D&&ae&&t.texStorage2D(i.TEXTURE_CUBE_MAP,ce,Ne,oe.width,oe.height);for(let ne=0;ne<6;ne++){fe=le[ne].mipmaps;for(let Ce=0;Ce<fe.length;Ce++){let be=fe[Ce];_.format!==fn?Re!==null?D?J&&t.compressedTexSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+ne,Ce,0,0,be.width,be.height,Re,be.data):t.compressedTexImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+ne,Ce,Ne,be.width,be.height,0,be.data):Ae("WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):D?J&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+ne,Ce,0,0,be.width,be.height,Re,Ie,be.data):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+ne,Ce,Ne,be.width,be.height,0,Re,Ie,be.data)}}}else{if(fe=_.mipmaps,D&&ae){fe.length>0&&ce++;let ne=Qe(le[0]);t.texStorage2D(i.TEXTURE_CUBE_MAP,ce,Ne,ne.width,ne.height)}for(let ne=0;ne<6;ne++)if(Ee){D?J&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+ne,0,0,0,le[ne].width,le[ne].height,Re,Ie,le[ne].data):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+ne,0,Ne,le[ne].width,le[ne].height,0,Re,Ie,le[ne].data);for(let Ce=0;Ce<fe.length;Ce++){let ct=fe[Ce].image[ne].image;D?J&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+ne,Ce+1,0,0,ct.width,ct.height,Re,Ie,ct.data):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+ne,Ce+1,Ne,ct.width,ct.height,0,Re,Ie,ct.data)}}else{D?J&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+ne,0,0,0,Re,Ie,le[ne]):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+ne,0,Ne,Re,Ie,le[ne]);for(let Ce=0;Ce<fe.length;Ce++){let be=fe[Ce];D?J&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+ne,Ce+1,0,0,Re,Ie,be.image[ne]):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+ne,Ce+1,Ne,Re,Ie,be.image[ne])}}}f(_)&&v(i.TEXTURE_CUBE_MAP),ie.__version=Z.version,_.onUpdate&&_.onUpdate(_)}E.__version=_.version}function ge(E,_,F,G,Z,ie){let se=r.convert(F.format,F.colorSpace),$=r.convert(F.type),Q=y(F.internalFormat,se,$,F.normalized,F.colorSpace),re=n.get(_),Ee=n.get(F);if(Ee.__renderTarget=_,!re.__hasExternalTextures){let le=Math.max(1,_.width>>ie),oe=Math.max(1,_.height>>ie);Z===i.TEXTURE_3D||Z===i.TEXTURE_2D_ARRAY?t.texImage3D(Z,ie,Q,le,oe,_.depth,0,se,$,null):t.texImage2D(Z,ie,Q,le,oe,0,se,$,null)}t.bindFramebuffer(i.FRAMEBUFFER,E),wt(_)?a.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,G,Z,Ee.__webglTexture,0,mt(_)):(Z===i.TEXTURE_2D||Z>=i.TEXTURE_CUBE_MAP_POSITIVE_X&&Z<=i.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&i.framebufferTexture2D(i.FRAMEBUFFER,G,Z,Ee.__webglTexture,ie),t.bindFramebuffer(i.FRAMEBUFFER,null)}function ze(E,_,F){if(i.bindRenderbuffer(i.RENDERBUFFER,E),_.depthBuffer){let G=_.depthTexture,Z=G&&G.isDepthTexture?G.type:null,ie=S(_.stencilBuffer,Z),se=_.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT;wt(_)?a.renderbufferStorageMultisampleEXT(i.RENDERBUFFER,mt(_),ie,_.width,_.height):F?i.renderbufferStorageMultisample(i.RENDERBUFFER,mt(_),ie,_.width,_.height):i.renderbufferStorage(i.RENDERBUFFER,ie,_.width,_.height),i.framebufferRenderbuffer(i.FRAMEBUFFER,se,i.RENDERBUFFER,E)}else{let G=_.textures;for(let Z=0;Z<G.length;Z++){let ie=G[Z],se=r.convert(ie.format,ie.colorSpace),$=r.convert(ie.type),Q=y(ie.internalFormat,se,$,ie.normalized,ie.colorSpace);wt(_)?a.renderbufferStorageMultisampleEXT(i.RENDERBUFFER,mt(_),Q,_.width,_.height):F?i.renderbufferStorageMultisample(i.RENDERBUFFER,mt(_),Q,_.width,_.height):i.renderbufferStorage(i.RENDERBUFFER,Q,_.width,_.height)}}i.bindRenderbuffer(i.RENDERBUFFER,null)}function Rt(E,_,F){let G=_.isWebGLCubeRenderTarget===!0;if(t.bindFramebuffer(i.FRAMEBUFFER,E),!(_.depthTexture&&_.depthTexture.isDepthTexture))throw new Error("THREE.WebGLTextures: renderTarget.depthTexture must be an instance of THREE.DepthTexture.");let Z=n.get(_.depthTexture);if(Z.__renderTarget=_,(!Z.__webglTexture||_.depthTexture.image.width!==_.width||_.depthTexture.image.height!==_.height)&&(_.depthTexture.image.width=_.width,_.depthTexture.image.height=_.height,_.depthTexture.needsUpdate=!0),G){if(Z.__webglInit===void 0&&(Z.__webglInit=!0,_.depthTexture.addEventListener("dispose",R)),Z.__webglTexture===void 0){Z.__webglTexture=i.createTexture(),t.bindTexture(i.TEXTURE_CUBE_MAP,Z.__webglTexture),Xe(i.TEXTURE_CUBE_MAP,_.depthTexture);let re=r.convert(_.depthTexture.format),Ee=r.convert(_.depthTexture.type),le;_.depthTexture.format===kn?le=i.DEPTH_COMPONENT24:_.depthTexture.format===Oi&&(le=i.DEPTH24_STENCIL8);for(let oe=0;oe<6;oe++)i.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+oe,0,le,_.width,_.height,0,re,Ee,null)}}else j(_.depthTexture,0);let ie=Z.__webglTexture,se=mt(_),$=G?i.TEXTURE_CUBE_MAP_POSITIVE_X+F:i.TEXTURE_2D,Q=_.depthTexture.format===Oi?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT;if(_.depthTexture.format===kn)wt(_)?a.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,Q,$,ie,0,se):i.framebufferTexture2D(i.FRAMEBUFFER,Q,$,ie,0);else if(_.depthTexture.format===Oi)wt(_)?a.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,Q,$,ie,0,se):i.framebufferTexture2D(i.FRAMEBUFFER,Q,$,ie,0);else throw new Error("THREE.WebGLTextures: Unknown depthTexture format.")}function Ve(E){let _=n.get(E),F=E.isWebGLCubeRenderTarget===!0;if(_.__boundDepthTexture!==E.depthTexture){let G=E.depthTexture;if(_.__depthDisposeCallback&&_.__depthDisposeCallback(),G){let Z=()=>{delete _.__boundDepthTexture,delete _.__depthDisposeCallback,G.removeEventListener("dispose",Z)};G.addEventListener("dispose",Z),_.__depthDisposeCallback=Z}_.__boundDepthTexture=G}if(E.depthTexture&&!_.__autoAllocateDepthBuffer)if(F)for(let G=0;G<6;G++)Rt(_.__webglFramebuffer[G],E,G);else{let G=E.texture.mipmaps;G&&G.length>0?Rt(_.__webglFramebuffer[0],E,0):Rt(_.__webglFramebuffer,E,0)}else if(F){_.__webglDepthbuffer=[];for(let G=0;G<6;G++)if(t.bindFramebuffer(i.FRAMEBUFFER,_.__webglFramebuffer[G]),_.__webglDepthbuffer[G]===void 0)_.__webglDepthbuffer[G]=i.createRenderbuffer(),ze(_.__webglDepthbuffer[G],E,!1);else{let Z=E.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,ie=_.__webglDepthbuffer[G];i.bindRenderbuffer(i.RENDERBUFFER,ie),i.framebufferRenderbuffer(i.FRAMEBUFFER,Z,i.RENDERBUFFER,ie)}}else{let G=E.texture.mipmaps;if(G&&G.length>0?t.bindFramebuffer(i.FRAMEBUFFER,_.__webglFramebuffer[0]):t.bindFramebuffer(i.FRAMEBUFFER,_.__webglFramebuffer),_.__webglDepthbuffer===void 0)_.__webglDepthbuffer=i.createRenderbuffer(),ze(_.__webglDepthbuffer,E,!1);else{let Z=E.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,ie=_.__webglDepthbuffer;i.bindRenderbuffer(i.RENDERBUFFER,ie),i.framebufferRenderbuffer(i.FRAMEBUFFER,Z,i.RENDERBUFFER,ie)}}t.bindFramebuffer(i.FRAMEBUFFER,null)}function Ye(E,_,F){let G=n.get(E);_!==void 0&&ge(G.__webglFramebuffer,E,E.texture,i.COLOR_ATTACHMENT0,i.TEXTURE_2D,0),F!==void 0&&Ve(E)}function at(E){let _=E.texture,F=n.get(E),G=n.get(_);E.addEventListener("dispose",x);let Z=E.textures,ie=E.isWebGLCubeRenderTarget===!0,se=Z.length>1;if(se||(G.__webglTexture===void 0&&(G.__webglTexture=i.createTexture()),G.__version=_.version,o.memory.textures++),ie){F.__webglFramebuffer=[];for(let $=0;$<6;$++)if(_.mipmaps&&_.mipmaps.length>0){F.__webglFramebuffer[$]=[];for(let Q=0;Q<_.mipmaps.length;Q++)F.__webglFramebuffer[$][Q]=i.createFramebuffer()}else F.__webglFramebuffer[$]=i.createFramebuffer()}else{if(_.mipmaps&&_.mipmaps.length>0){F.__webglFramebuffer=[];for(let $=0;$<_.mipmaps.length;$++)F.__webglFramebuffer[$]=i.createFramebuffer()}else F.__webglFramebuffer=i.createFramebuffer();if(se)for(let $=0,Q=Z.length;$<Q;$++){let re=n.get(Z[$]);re.__webglTexture===void 0&&(re.__webglTexture=i.createTexture(),o.memory.textures++)}if(E.samples>0&&wt(E)===!1){F.__webglMultisampledFramebuffer=i.createFramebuffer(),F.__webglColorRenderbuffer=[],t.bindFramebuffer(i.FRAMEBUFFER,F.__webglMultisampledFramebuffer);for(let $=0;$<Z.length;$++){let Q=Z[$];F.__webglColorRenderbuffer[$]=i.createRenderbuffer(),i.bindRenderbuffer(i.RENDERBUFFER,F.__webglColorRenderbuffer[$]);let re=r.convert(Q.format,Q.colorSpace),Ee=r.convert(Q.type),le=y(Q.internalFormat,re,Ee,Q.normalized,Q.colorSpace,E.isXRRenderTarget===!0),oe=mt(E);i.renderbufferStorageMultisample(i.RENDERBUFFER,oe,le,E.width,E.height),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+$,i.RENDERBUFFER,F.__webglColorRenderbuffer[$])}i.bindRenderbuffer(i.RENDERBUFFER,null),E.depthBuffer&&(F.__webglDepthRenderbuffer=i.createRenderbuffer(),ze(F.__webglDepthRenderbuffer,E,!0)),t.bindFramebuffer(i.FRAMEBUFFER,null)}}if(ie){t.bindTexture(i.TEXTURE_CUBE_MAP,G.__webglTexture),Xe(i.TEXTURE_CUBE_MAP,_);for(let $=0;$<6;$++)if(_.mipmaps&&_.mipmaps.length>0)for(let Q=0;Q<_.mipmaps.length;Q++)ge(F.__webglFramebuffer[$][Q],E,_,i.COLOR_ATTACHMENT0,i.TEXTURE_CUBE_MAP_POSITIVE_X+$,Q);else ge(F.__webglFramebuffer[$],E,_,i.COLOR_ATTACHMENT0,i.TEXTURE_CUBE_MAP_POSITIVE_X+$,0);f(_)&&v(i.TEXTURE_CUBE_MAP),t.unbindTexture()}else if(se){for(let $=0,Q=Z.length;$<Q;$++){let re=Z[$],Ee=n.get(re),le=i.TEXTURE_2D;(E.isWebGL3DRenderTarget||E.isWebGLArrayRenderTarget)&&(le=E.isWebGL3DRenderTarget?i.TEXTURE_3D:i.TEXTURE_2D_ARRAY),t.bindTexture(le,Ee.__webglTexture),Xe(le,re),ge(F.__webglFramebuffer,E,re,i.COLOR_ATTACHMENT0+$,le,0),f(re)&&v(le)}t.unbindTexture()}else{let $=i.TEXTURE_2D;if((E.isWebGL3DRenderTarget||E.isWebGLArrayRenderTarget)&&($=E.isWebGL3DRenderTarget?i.TEXTURE_3D:i.TEXTURE_2D_ARRAY),t.bindTexture($,G.__webglTexture),Xe($,_),_.mipmaps&&_.mipmaps.length>0)for(let Q=0;Q<_.mipmaps.length;Q++)ge(F.__webglFramebuffer[Q],E,_,i.COLOR_ATTACHMENT0,$,Q);else ge(F.__webglFramebuffer,E,_,i.COLOR_ATTACHMENT0,$,0);f(_)&&v($),t.unbindTexture()}E.depthBuffer&&Ve(E)}function We(E){let _=E.textures;for(let F=0,G=_.length;F<G;F++){let Z=_[F];if(f(Z)){let ie=T(E),se=n.get(Z).__webglTexture;t.bindTexture(ie,se),v(ie),t.unbindTexture()}}}let pt=[],Ut=[];function en(E){if(E.samples>0){if(wt(E)===!1){let _=E.textures,F=E.width,G=E.height,Z=i.COLOR_BUFFER_BIT,ie=E.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,se=n.get(E),$=_.length>1;if($)for(let re=0;re<_.length;re++)t.bindFramebuffer(i.FRAMEBUFFER,se.__webglMultisampledFramebuffer),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+re,i.RENDERBUFFER,null),t.bindFramebuffer(i.FRAMEBUFFER,se.__webglFramebuffer),i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0+re,i.TEXTURE_2D,null,0);t.bindFramebuffer(i.READ_FRAMEBUFFER,se.__webglMultisampledFramebuffer);let Q=E.texture.mipmaps;Q&&Q.length>0?t.bindFramebuffer(i.DRAW_FRAMEBUFFER,se.__webglFramebuffer[0]):t.bindFramebuffer(i.DRAW_FRAMEBUFFER,se.__webglFramebuffer);for(let re=0;re<_.length;re++){if(E.resolveDepthBuffer&&(E.depthBuffer&&(Z|=i.DEPTH_BUFFER_BIT),E.stencilBuffer&&E.resolveStencilBuffer&&(Z|=i.STENCIL_BUFFER_BIT)),$){i.framebufferRenderbuffer(i.READ_FRAMEBUFFER,i.COLOR_ATTACHMENT0,i.RENDERBUFFER,se.__webglColorRenderbuffer[re]);let Ee=n.get(_[re]).__webglTexture;i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0,i.TEXTURE_2D,Ee,0)}i.blitFramebuffer(0,0,F,G,0,0,F,G,Z,i.NEAREST),c===!0&&(pt.length=0,Ut.length=0,pt.push(i.COLOR_ATTACHMENT0+re),E.depthBuffer&&E.storeMultisampledDepthBuffer===!1&&(pt.push(ie),Ut.push(ie),i.invalidateFramebuffer(i.DRAW_FRAMEBUFFER,Ut)),i.invalidateFramebuffer(i.READ_FRAMEBUFFER,pt))}if(t.bindFramebuffer(i.READ_FRAMEBUFFER,null),t.bindFramebuffer(i.DRAW_FRAMEBUFFER,null),$)for(let re=0;re<_.length;re++){t.bindFramebuffer(i.FRAMEBUFFER,se.__webglMultisampledFramebuffer),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+re,i.RENDERBUFFER,se.__webglColorRenderbuffer[re]);let Ee=n.get(_[re]).__webglTexture;t.bindFramebuffer(i.FRAMEBUFFER,se.__webglFramebuffer),i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0+re,i.TEXTURE_2D,Ee,0)}t.bindFramebuffer(i.DRAW_FRAMEBUFFER,se.__webglMultisampledFramebuffer)}else if(E.depthBuffer&&E.storeMultisampledDepthBuffer===!1&&c){let _=E.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT;i.invalidateFramebuffer(i.DRAW_FRAMEBUFFER,[_])}}}function mt(E){return Math.min(s.maxSamples,E.samples)}function wt(E){let _=n.get(E);return E.samples>0&&e.has("WEBGL_multisampled_render_to_texture")===!0&&_.__useRenderToTexture!==!1}function U(E){let _=o.render.frame;h.get(E)!==_&&(h.set(E,_),E.update())}function Ht(E,_){let F=E.colorSpace,G=E.format,Z=E.type;return E.isCompressedTexture===!0||E.isVideoTexture===!0||F!==$t&&F!==di&&(Be.getTransfer(F)===Je?(G!==fn||Z!==Xt)&&Ae("WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):Pe("WebGLTextures: Unsupported texture color space:",F)),_}function Qe(E){return typeof HTMLImageElement<"u"&&E instanceof HTMLImageElement?(l.width=E.naturalWidth||E.width,l.height=E.naturalHeight||E.height):typeof VideoFrame<"u"&&E instanceof VideoFrame?(l.width=E.displayWidth,l.height=E.displayHeight):(l.width=E.width,l.height=E.height),l}this.allocateTextureUnit=V,this.resetTextureUnits=W,this.getTextureUnits=I,this.setTextureUnits=B,this.setTexture2D=j,this.setTexture2DArray=H,this.setTexture3D=Y,this.setTextureCube=ee,this.rebindTextures=Ye,this.setupRenderTarget=at,this.updateRenderTargetMipmap=We,this.updateMultisampleRenderTarget=en,this.setupDepthRenderbuffer=Ve,this.setupFrameBufferTexture=ge,this.useMultisampledRTT=wt,this.isReversedDepthBuffer=function(){return t.buffers.depth.getReversed()}}function K3(i,e){function t(n,s=di){let r,o=Be.getTransfer(s);if(n===Xt)return i.UNSIGNED_BYTE;if(n===Ia)return i.UNSIGNED_SHORT_4_4_4_4;if(n===Pa)return i.UNSIGNED_SHORT_5_5_5_1;if(n===Dl)return i.UNSIGNED_INT_5_9_9_9_REV;if(n===Nl)return i.UNSIGNED_INT_10F_11F_11F_REV;if(n===Pl)return i.BYTE;if(n===Ll)return i.SHORT;if(n===tr)return i.UNSIGNED_SHORT;if(n===Ca)return i.INT;if(n===Dn)return i.UNSIGNED_INT;if(n===dn)return i.FLOAT;if(n===Nn)return i.HALF_FLOAT;if(n===Ul)return i.ALPHA;if(n===Ol)return i.RGB;if(n===fn)return i.RGBA;if(n===kn)return i.DEPTH_COMPONENT;if(n===Oi)return i.DEPTH_STENCIL;if(n===ir)return i.RED;if(n===La)return i.RED_INTEGER;if(n===Fi)return i.RG;if(n===Da)return i.RG_INTEGER;if(n===Na)return i.RGBA_INTEGER;if(n===to||n===no||n===io||n===so)if(o===Je)if(r=e.get("WEBGL_compressed_texture_s3tc_srgb"),r!==null){if(n===to)return r.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(n===no)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(n===io)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(n===so)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(r=e.get("WEBGL_compressed_texture_s3tc"),r!==null){if(n===to)return r.COMPRESSED_RGB_S3TC_DXT1_EXT;if(n===no)return r.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(n===io)return r.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(n===so)return r.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(n===Ua||n===Oa||n===Fa||n===Ba)if(r=e.get("WEBGL_compressed_texture_pvrtc"),r!==null){if(n===Ua)return r.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(n===Oa)return r.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(n===Fa)return r.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(n===Ba)return r.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(n===ka||n===za||n===Ha||n===Va||n===Ga||n===ro||n===Wa)if(r=e.get("WEBGL_compressed_texture_etc"),r!==null){if(n===ka||n===za)return o===Je?r.COMPRESSED_SRGB8_ETC2:r.COMPRESSED_RGB8_ETC2;if(n===Ha)return o===Je?r.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:r.COMPRESSED_RGBA8_ETC2_EAC;if(n===Va)return r.COMPRESSED_R11_EAC;if(n===Ga)return r.COMPRESSED_SIGNED_R11_EAC;if(n===ro)return r.COMPRESSED_RG11_EAC;if(n===Wa)return r.COMPRESSED_SIGNED_RG11_EAC}else return null;if(n===Xa||n===qa||n===Ya||n===Za||n===Ka||n===$a||n===ja||n===Ja||n===Qa||n===ec||n===tc||n===nc||n===ic||n===sc)if(r=e.get("WEBGL_compressed_texture_astc"),r!==null){if(n===Xa)return o===Je?r.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:r.COMPRESSED_RGBA_ASTC_4x4_KHR;if(n===qa)return o===Je?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:r.COMPRESSED_RGBA_ASTC_5x4_KHR;if(n===Ya)return o===Je?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:r.COMPRESSED_RGBA_ASTC_5x5_KHR;if(n===Za)return o===Je?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:r.COMPRESSED_RGBA_ASTC_6x5_KHR;if(n===Ka)return o===Je?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:r.COMPRESSED_RGBA_ASTC_6x6_KHR;if(n===$a)return o===Je?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:r.COMPRESSED_RGBA_ASTC_8x5_KHR;if(n===ja)return o===Je?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:r.COMPRESSED_RGBA_ASTC_8x6_KHR;if(n===Ja)return o===Je?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:r.COMPRESSED_RGBA_ASTC_8x8_KHR;if(n===Qa)return o===Je?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:r.COMPRESSED_RGBA_ASTC_10x5_KHR;if(n===ec)return o===Je?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:r.COMPRESSED_RGBA_ASTC_10x6_KHR;if(n===tc)return o===Je?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:r.COMPRESSED_RGBA_ASTC_10x8_KHR;if(n===nc)return o===Je?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:r.COMPRESSED_RGBA_ASTC_10x10_KHR;if(n===ic)return o===Je?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:r.COMPRESSED_RGBA_ASTC_12x10_KHR;if(n===sc)return o===Je?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:r.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(n===rc||n===oc||n===ac)if(r=e.get("EXT_texture_compression_bptc"),r!==null){if(n===rc)return o===Je?r.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:r.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(n===oc)return r.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(n===ac)return r.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(n===cc||n===lc||n===oo||n===hc)if(r=e.get("EXT_texture_compression_rgtc"),r!==null){if(n===cc)return r.COMPRESSED_RED_RGTC1_EXT;if(n===lc)return r.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(n===oo)return r.COMPRESSED_RED_GREEN_RGTC2_EXT;if(n===hc)return r.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return n===nr?i.UNSIGNED_INT_24_8:i[n]!==void 0?i[n]:null}return{convert:t}}var $3=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,j3=`
uniform sampler2DArray depthColor;
uniform float depthWidth;
uniform float depthHeight;

void main() {

	vec2 coord = vec2( gl_FragCoord.x / depthWidth, gl_FragCoord.y / depthHeight );

	if ( coord.x >= 1.0 ) {

		gl_FragDepth = texture( depthColor, vec3( coord.x - 1.0, coord.y, 1 ) ).r;

	} else {

		gl_FragDepth = texture( depthColor, vec3( coord.x, coord.y, 0 ) ).r;

	}

}`,r0=class{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(e,t){if(this.texture===null){let n=new Hr(e.texture);(e.depthNear!==t.depthNear||e.depthFar!==t.depthFar)&&(this.depthNear=e.depthNear,this.depthFar=e.depthFar),this.texture=n}}getMesh(e){if(this.texture!==null&&this.mesh===null){let t=e.cameras[0].viewport,n=new sn({vertexShader:$3,fragmentShader:j3,uniforms:{depthColor:{value:this.texture},depthWidth:{value:t.z},depthHeight:{value:t.w}}});this.mesh=new Ke(new ii(20,20),n)}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}},o0=class extends xn{constructor(e,t){super();let n=this,s=null,r=1,o=null,a="local-floor",c=1,l=null,h=null,d=null,u=null,p=null,g=null,b=typeof XRWebGLBinding<"u",m=new r0,f={},v=t.getContextAttributes(),T=null,y=null,S=[],w=[],R=new we,x=null,A=null,C=new xt;C.viewport=new tt;let L=new xt;L.viewport=new tt;let O=[C,L],W=new Sa,I=null,B=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(K){let te=S[K];return te===void 0&&(te=new Vs,S[K]=te),te.getTargetRaySpace()},this.getControllerGrip=function(K){let te=S[K];return te===void 0&&(te=new Vs,S[K]=te),te.getGripSpace()},this.getHand=function(K){let te=S[K];return te===void 0&&(te=new Vs,S[K]=te),te.getHandSpace()};function V(K){let te=w.indexOf(K.inputSource);if(te===-1)return;let xe=S[te];xe!==void 0&&(xe.update(K.inputSource,K.frame,l||o),xe.dispatchEvent({type:K.type,data:K.inputSource}))}function X(){s.removeEventListener("select",V),s.removeEventListener("selectstart",V),s.removeEventListener("selectend",V),s.removeEventListener("squeeze",V),s.removeEventListener("squeezestart",V),s.removeEventListener("squeezeend",V),s.removeEventListener("end",X),s.removeEventListener("inputsourceschange",j);for(let K=0;K<S.length;K++){let te=w[K];te!==null&&(w[K]=null,S[K].disconnect(te))}I=null,B=null,m.reset();for(let K in f)delete f[K];if(e.setRenderTarget(T),p=null,u=null,d=null,s=null,y=null,Ze.stop(),n.isPresenting=!1,e.setPixelRatio(x),e.setSize(R.width,R.height,!1),A!==null){let K=A.camera;K.fov=A.fov,K.zoom=A.zoom,K.updateProjectionMatrix(),A=null}n.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(K){r=K,n.isPresenting===!0&&Ae("WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(K){a=K,n.isPresenting===!0&&Ae("WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return l||o},this.setReferenceSpace=function(K){l=K},this.getBaseLayer=function(){return u!==null?u:p},this.getBinding=function(){return d===null&&b&&(d=new XRWebGLBinding(s,t)),d},this.getFrame=function(){return g},this.getSession=function(){return s},this.setSession=async function(K){if(s=K,s!==null){if(T=e.getRenderTarget(),s.addEventListener("select",V),s.addEventListener("selectstart",V),s.addEventListener("selectend",V),s.addEventListener("squeeze",V),s.addEventListener("squeezestart",V),s.addEventListener("squeezeend",V),s.addEventListener("end",X),s.addEventListener("inputsourceschange",j),v.xrCompatible!==!0&&await t.makeXRCompatible(),x=e.getPixelRatio(),e.getSize(R),b&&"createProjectionLayer"in XRWebGLBinding.prototype){let xe=null,De=null,ge=null;v.depth&&(ge=v.stencil?t.DEPTH24_STENCIL8:t.DEPTH_COMPONENT24,xe=v.stencil?Oi:kn,De=v.stencil?nr:Dn);let ze={colorFormat:t.RGBA8,depthFormat:ge,scaleFactor:r};d=this.getBinding(),u=d.createProjectionLayer(ze),s.updateRenderState({layers:[u]}),e.setPixelRatio(1),e.setSize(u.textureWidth,u.textureHeight,!1),y=new tn(u.textureWidth,u.textureHeight,{format:fn,type:Xt,depthTexture:new Ci(u.textureWidth,u.textureHeight,De,void 0,void 0,void 0,void 0,void 0,void 0,xe),stencilBuffer:v.stencil,colorSpace:e.outputColorSpace,samples:v.antialias?4:0,resolveDepthBuffer:u.ignoreDepthValues===!1,resolveStencilBuffer:u.ignoreDepthValues===!1,storeMultisampledDepthBuffer:u.ignoreDepthValues===!1,storeMultisampledStencilBuffer:u.ignoreDepthValues===!1})}else{let xe={antialias:v.antialias,alpha:!0,depth:v.depth,stencil:v.stencil,framebufferScaleFactor:r};p=new XRWebGLLayer(s,t,xe),s.updateRenderState({baseLayer:p}),e.setPixelRatio(1),e.setSize(p.framebufferWidth,p.framebufferHeight,!1),y=new tn(p.framebufferWidth,p.framebufferHeight,{format:fn,type:Xt,colorSpace:e.outputColorSpace,stencilBuffer:v.stencil,resolveDepthBuffer:p.ignoreDepthValues===!1,resolveStencilBuffer:p.ignoreDepthValues===!1,storeMultisampledDepthBuffer:p.ignoreDepthValues===!1,storeMultisampledStencilBuffer:p.ignoreDepthValues===!1})}y.isXRRenderTarget=!0,this.setFoveation(c),l=null,o=await s.requestReferenceSpace(a),Ze.setContext(s),Ze.start(),n.isPresenting=!0,n.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(s!==null)return s.environmentBlendMode},this.getDepthTexture=function(){return m.getDepthTexture()};function j(K){for(let te=0;te<K.removed.length;te++){let xe=K.removed[te],De=w.indexOf(xe);De>=0&&(w[De]=null,S[De].disconnect(xe))}for(let te=0;te<K.added.length;te++){let xe=K.added[te],De=w.indexOf(xe);if(De===-1){for(let ze=0;ze<S.length;ze++)if(ze>=w.length){w.push(xe),De=ze;break}else if(w[ze]===null){w[ze]=xe,De=ze;break}if(De===-1)break}let ge=S[De];ge&&ge.connect(xe)}}let H=new N,Y=new N;function ee(K,te,xe){H.setFromMatrixPosition(te.matrixWorld),Y.setFromMatrixPosition(xe.matrixWorld);let De=H.distanceTo(Y),ge=te.projectionMatrix.elements,ze=xe.projectionMatrix.elements,Rt=ge[14]/(ge[10]-1),Ve=ge[14]/(ge[10]+1),Ye=(ge[9]+1)/ge[5],at=(ge[9]-1)/ge[5],We=(ge[8]-1)/ge[0],pt=(ze[8]+1)/ze[0],Ut=Rt*We,en=Rt*pt,mt=De/(-We+pt),wt=mt*-We;if(te.matrixWorld.decompose(K.position,K.quaternion,K.scale),K.translateX(wt),K.translateZ(mt),K.matrixWorld.compose(K.position,K.quaternion,K.scale),K.matrixWorldInverse.copy(K.matrixWorld).invert(),ge[10]===-1)K.projectionMatrix.copy(te.projectionMatrix),K.projectionMatrixInverse.copy(te.projectionMatrixInverse);else{let U=Rt+mt,Ht=Ve+mt,Qe=Ut-wt,E=en+(De-wt),_=Ye*Ve/Ht*U,F=at*Ve/Ht*U;K.projectionMatrix.makePerspective(Qe,E,_,F,U,Ht),K.projectionMatrixInverse.copy(K.projectionMatrix).invert()}}function Te(K,te){te===null?K.matrixWorld.copy(K.matrix):K.matrixWorld.multiplyMatrices(te.matrixWorld,K.matrix),K.matrixWorldInverse.copy(K.matrixWorld).invert()}this.updateCamera=function(K){if(s===null)return;let te=K.near,xe=K.far;m.texture!==null&&(m.depthNear>0&&(te=m.depthNear),m.depthFar>0&&(xe=m.depthFar)),W.near=L.near=C.near=te,W.far=L.far=C.far=xe,(I!==W.near||B!==W.far)&&(s.updateRenderState({depthNear:W.near,depthFar:W.far}),I=W.near,B=W.far),W.layers.mask=K.layers.mask|6,C.layers.mask=W.layers.mask&-5,L.layers.mask=W.layers.mask&-3;let De=K.parent,ge=W.cameras;Te(W,De);for(let ze=0;ze<ge.length;ze++)Te(ge[ze],De);ge.length===2?ee(W,C,L):W.projectionMatrix.copy(C.projectionMatrix),A===null&&K.isPerspectiveCamera&&(A={camera:K,fov:K.fov,zoom:K.zoom}),Me(K,W,De)};function Me(K,te,xe){xe===null?K.matrix.copy(te.matrixWorld):(K.matrix.copy(xe.matrixWorld),K.matrix.invert(),K.matrix.multiply(te.matrixWorld)),K.matrix.decompose(K.position,K.quaternion,K.scale),K.updateMatrixWorld(!0),K.projectionMatrix.copy(te.projectionMatrix),K.projectionMatrixInverse.copy(te.projectionMatrixInverse),K.isPerspectiveCamera&&(K.fov=ji*2*Math.atan(1/K.projectionMatrix.elements[5]),K.zoom=1)}this.getCamera=function(){return W},this.getFoveation=function(){if(!(u===null&&p===null))return c},this.setFoveation=function(K){c=K,u!==null&&(u.fixedFoveation=K),p!==null&&p.fixedFoveation!==void 0&&(p.fixedFoveation=K)},this.hasDepthSensing=function(){return m.texture!==null},this.getDepthSensingMesh=function(){return m.getMesh(W)},this.getCameraTexture=function(K){return f[K]};let ot=null;function Xe(K,te){if(h=te.getViewerPose(l||o),g=te,h!==null){let xe=h.views;p!==null&&(e.setRenderTargetFramebuffer(y,p.framebuffer),e.setRenderTarget(y));let De=!1;xe.length!==W.cameras.length&&(W.cameras.length=0,De=!0);for(let Ve=0;Ve<xe.length;Ve++){let Ye=xe[Ve],at=null;if(p!==null)at=p.getViewport(Ye);else{let pt=d.getViewSubImage(u,Ye);at=pt.viewport,Ve===0&&(e.setRenderTargetTextures(y,pt.colorTexture,pt.depthStencilTexture),e.setRenderTarget(y))}let We=O[Ve];We===void 0&&(We=new xt,We.layers.enable(Ve),We.viewport=new tt,O[Ve]=We),We.matrix.fromArray(Ye.transform.matrix),We.matrix.decompose(We.position,We.quaternion,We.scale),We.projectionMatrix.fromArray(Ye.projectionMatrix),We.projectionMatrixInverse.copy(We.projectionMatrix).invert(),We.viewport.set(at.x,at.y,at.width,at.height),Ve===0&&(W.matrix.copy(We.matrix),W.matrix.decompose(W.position,W.quaternion,W.scale)),De===!0&&W.cameras.push(We)}let ge=s.enabledFeatures;if(ge&&ge.includes("depth-sensing")&&s.depthUsage=="gpu-optimized"&&b){d=n.getBinding();let Ve=d.getDepthInformation(xe[0]);Ve&&Ve.isValid&&Ve.texture&&m.init(Ve,s.renderState)}if(ge&&ge.includes("camera-access")&&b){e.state.unbindTexture(),d=n.getBinding();for(let Ve=0;Ve<xe.length;Ve++){let Ye=xe[Ve].camera;if(Ye){let at=f[Ye];at||(at=new Hr,f[Ye]=at);let We=d.getCameraImage(Ye);at.sourceTexture=We}}}}for(let xe=0;xe<S.length;xe++){let De=w[xe],ge=S[xe];De!==null&&ge!==void 0&&ge.update(De,te,l||o)}ot&&ot(K,te),te.detectedPlanes&&n.dispatchEvent({type:"planesdetected",data:te}),g=null}let Ze=new ld;Ze.setAnimationLoop(Xe),this.setAnimationLoop=function(K){ot=K},this.dispose=function(){}}},J3=new Ue,md=new Le;md.set(-1,0,0,0,1,0,0,0,1);function Q3(i,e){function t(m,f){m.matrixAutoUpdate===!0&&m.updateMatrix(),f.value.copy(m.matrix)}function n(m,f){f.color.getRGB(m.fogColor.value,Vl(i)),f.isFog?(m.fogNear.value=f.near,m.fogFar.value=f.far):f.isFogExp2&&(m.fogDensity.value=f.density)}function s(m,f,v,T,y){f.isNodeMaterial?f.uniformsNeedUpdate=!1:f.isMeshBasicMaterial?r(m,f):f.isMeshLambertMaterial?(r(m,f),f.envMap&&(m.envMapIntensity.value=f.envMapIntensity)):f.isMeshToonMaterial?(r(m,f),d(m,f)):f.isMeshPhongMaterial?(r(m,f),h(m,f),f.envMap&&(m.envMapIntensity.value=f.envMapIntensity)):f.isMeshStandardMaterial?(r(m,f),u(m,f),f.isMeshPhysicalMaterial&&p(m,f,y)):f.isMeshMatcapMaterial?(r(m,f),g(m,f)):f.isMeshDepthMaterial?r(m,f):f.isMeshDistanceMaterial?(r(m,f),b(m,f)):f.isMeshNormalMaterial?r(m,f):f.isLineBasicMaterial?(o(m,f),f.isLineDashedMaterial&&a(m,f)):f.isPointsMaterial?c(m,f,v,T):f.isSpriteMaterial?l(m,f):f.isShadowMaterial?(m.color.value.copy(f.color),m.opacity.value=f.opacity):f.isShaderMaterial&&(f.uniformsNeedUpdate=!1)}function r(m,f){m.opacity.value=f.opacity,f.color&&m.diffuse.value.copy(f.color),f.emissive&&m.emissive.value.copy(f.emissive).multiplyScalar(f.emissiveIntensity),f.map&&(m.map.value=f.map,t(f.map,m.mapTransform)),f.alphaMap&&(m.alphaMap.value=f.alphaMap,t(f.alphaMap,m.alphaMapTransform)),f.bumpMap&&(m.bumpMap.value=f.bumpMap,t(f.bumpMap,m.bumpMapTransform),m.bumpScale.value=f.bumpScale,f.side===zt&&(m.bumpScale.value*=-1)),f.normalMap&&(m.normalMap.value=f.normalMap,t(f.normalMap,m.normalMapTransform),m.normalScale.value.copy(f.normalScale),f.side===zt&&m.normalScale.value.negate()),f.displacementMap&&(m.displacementMap.value=f.displacementMap,t(f.displacementMap,m.displacementMapTransform),m.displacementScale.value=f.displacementScale,m.displacementBias.value=f.displacementBias),f.emissiveMap&&(m.emissiveMap.value=f.emissiveMap,t(f.emissiveMap,m.emissiveMapTransform)),f.specularMap&&(m.specularMap.value=f.specularMap,t(f.specularMap,m.specularMapTransform)),f.alphaTest>0&&(m.alphaTest.value=f.alphaTest);let v=e.get(f),T=v.envMap,y=v.envMapRotation;T&&(m.envMap.value=T,m.envMapRotation.value.setFromMatrix4(J3.makeRotationFromEuler(y)).transpose(),T.isCubeTexture&&T.isRenderTargetTexture===!1&&m.envMapRotation.value.premultiply(md),m.reflectivity.value=f.reflectivity,m.ior.value=f.ior,m.refractionRatio.value=f.refractionRatio),f.lightMap&&(m.lightMap.value=f.lightMap,m.lightMapIntensity.value=f.lightMapIntensity,t(f.lightMap,m.lightMapTransform)),f.aoMap&&(m.aoMap.value=f.aoMap,m.aoMapIntensity.value=f.aoMapIntensity,t(f.aoMap,m.aoMapTransform))}function o(m,f){m.diffuse.value.copy(f.color),m.opacity.value=f.opacity,f.map&&(m.map.value=f.map,t(f.map,m.mapTransform))}function a(m,f){m.dashSize.value=f.dashSize,m.totalSize.value=f.dashSize+f.gapSize,m.scale.value=f.scale}function c(m,f,v,T){m.diffuse.value.copy(f.color),m.opacity.value=f.opacity,m.size.value=f.size*v,m.scale.value=T*.5,f.map&&(m.map.value=f.map,t(f.map,m.uvTransform)),f.alphaMap&&(m.alphaMap.value=f.alphaMap,t(f.alphaMap,m.alphaMapTransform)),f.alphaTest>0&&(m.alphaTest.value=f.alphaTest)}function l(m,f){m.diffuse.value.copy(f.color),m.opacity.value=f.opacity,m.rotation.value=f.rotation,f.map&&(m.map.value=f.map,t(f.map,m.mapTransform)),f.alphaMap&&(m.alphaMap.value=f.alphaMap,t(f.alphaMap,m.alphaMapTransform)),f.alphaTest>0&&(m.alphaTest.value=f.alphaTest)}function h(m,f){m.specular.value.copy(f.specular),m.shininess.value=Math.max(f.shininess,1e-4)}function d(m,f){f.gradientMap&&(m.gradientMap.value=f.gradientMap)}function u(m,f){m.metalness.value=f.metalness,f.metalnessMap&&(m.metalnessMap.value=f.metalnessMap,t(f.metalnessMap,m.metalnessMapTransform)),m.roughness.value=f.roughness,f.roughnessMap&&(m.roughnessMap.value=f.roughnessMap,t(f.roughnessMap,m.roughnessMapTransform)),f.envMap&&(m.envMapIntensity.value=f.envMapIntensity)}function p(m,f,v){m.ior.value=f.ior,f.sheen>0&&(m.sheenColor.value.copy(f.sheenColor).multiplyScalar(f.sheen),m.sheenRoughness.value=f.sheenRoughness,f.sheenColorMap&&(m.sheenColorMap.value=f.sheenColorMap,t(f.sheenColorMap,m.sheenColorMapTransform)),f.sheenRoughnessMap&&(m.sheenRoughnessMap.value=f.sheenRoughnessMap,t(f.sheenRoughnessMap,m.sheenRoughnessMapTransform))),f.clearcoat>0&&(m.clearcoat.value=f.clearcoat,m.clearcoatRoughness.value=f.clearcoatRoughness,f.clearcoatMap&&(m.clearcoatMap.value=f.clearcoatMap,t(f.clearcoatMap,m.clearcoatMapTransform)),f.clearcoatRoughnessMap&&(m.clearcoatRoughnessMap.value=f.clearcoatRoughnessMap,t(f.clearcoatRoughnessMap,m.clearcoatRoughnessMapTransform)),f.clearcoatNormalMap&&(m.clearcoatNormalMap.value=f.clearcoatNormalMap,t(f.clearcoatNormalMap,m.clearcoatNormalMapTransform),m.clearcoatNormalScale.value.copy(f.clearcoatNormalScale),f.side===zt&&m.clearcoatNormalScale.value.negate())),f.dispersion>0&&(m.dispersion.value=f.dispersion),f.retroreflectivity>0&&(m.retroreflectivity.value=f.retroreflectivity),f.iridescence>0&&(m.iridescence.value=f.iridescence,m.iridescenceIOR.value=f.iridescenceIOR,m.iridescenceThicknessMinimum.value=f.iridescenceThicknessRange[0],m.iridescenceThicknessMaximum.value=f.iridescenceThicknessRange[1],f.iridescenceMap&&(m.iridescenceMap.value=f.iridescenceMap,t(f.iridescenceMap,m.iridescenceMapTransform)),f.iridescenceThicknessMap&&(m.iridescenceThicknessMap.value=f.iridescenceThicknessMap,t(f.iridescenceThicknessMap,m.iridescenceThicknessMapTransform))),f.transmission>0&&(m.transmission.value=f.transmission,m.transmissionSamplerMap.value=v.texture,m.transmissionSamplerSize.value.set(v.width,v.height),f.transmissionMap&&(m.transmissionMap.value=f.transmissionMap,t(f.transmissionMap,m.transmissionMapTransform)),m.thickness.value=f.thickness,f.thicknessMap&&(m.thicknessMap.value=f.thicknessMap,t(f.thicknessMap,m.thicknessMapTransform)),m.attenuationDistance.value=f.attenuationDistance,m.attenuationColor.value.copy(f.attenuationColor)),f.anisotropy>0&&(m.anisotropyVector.value.set(f.anisotropy*Math.cos(f.anisotropyRotation),f.anisotropy*Math.sin(f.anisotropyRotation)),f.anisotropyMap&&(m.anisotropyMap.value=f.anisotropyMap,t(f.anisotropyMap,m.anisotropyMapTransform))),m.specularIntensity.value=f.specularIntensity,m.specularColor.value.copy(f.specularColor),f.specularColorMap&&(m.specularColorMap.value=f.specularColorMap,t(f.specularColorMap,m.specularColorMapTransform)),f.specularIntensityMap&&(m.specularIntensityMap.value=f.specularIntensityMap,t(f.specularIntensityMap,m.specularIntensityMapTransform))}function g(m,f){f.matcap&&(m.matcap.value=f.matcap)}function b(m,f){let v=e.get(f).light;m.referencePosition.value.setFromMatrixPosition(v.matrixWorld),m.nearDistance.value=v.shadow.camera.near,m.farDistance.value=v.shadow.camera.far}return{refreshFogUniforms:n,refreshMaterialUniforms:s}}function eg(i,e,t,n){let s={},r={},o=[],a=i.getParameter(i.MAX_UNIFORM_BUFFER_BINDINGS);function c(y,S){let w=S.program;n.uniformBlockBinding(y,w)}function l(y,S){let w=s[y.id];w===void 0&&(m(y),w=h(y),s[y.id]=w,y.addEventListener("dispose",v));let R=S.program;n.updateUBOMapping(y,R);let x=e.render.frame;r[y.id]!==x&&(u(y),r[y.id]=x)}function h(y){let S=d();y.__bindingPointIndex=S;let w=i.createBuffer(),R=y.__size,x=y.usage;return i.bindBuffer(i.UNIFORM_BUFFER,w),i.bufferData(i.UNIFORM_BUFFER,R,x),i.bindBuffer(i.UNIFORM_BUFFER,null),i.bindBufferBase(i.UNIFORM_BUFFER,S,w),w}function d(){for(let y=0;y<a;y++)if(o.indexOf(y)===-1)return o.push(y),y;return Pe("WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function u(y){let S=s[y.id],w=y.uniforms,R=y.__cache;i.bindBuffer(i.UNIFORM_BUFFER,S);for(let x=0,A=w.length;x<A;x++){let C=w[x];if(Array.isArray(C))for(let L=0,O=C.length;L<O;L++)p(C[L],x,L,R);else p(C,x,0,R)}i.bindBuffer(i.UNIFORM_BUFFER,null)}function p(y,S,w,R){if(b(y,S,w,R)===!0){let x=y.__offset,A=y.value;if(Array.isArray(A)){let C=0;for(let L=0;L<A.length;L++){let O=A[L],W=f(O);g(O,y.__data,C),typeof O!="number"&&typeof O!="boolean"&&!O.isMatrix3&&!ArrayBuffer.isView(O)&&(C+=W.storage/Float32Array.BYTES_PER_ELEMENT)}}else g(A,y.__data,0);i.bufferSubData(i.UNIFORM_BUFFER,x,y.__data)}}function g(y,S,w){typeof y=="number"||typeof y=="boolean"?S[0]=y:y.isMatrix3?(S[0]=y.elements[0],S[1]=y.elements[1],S[2]=y.elements[2],S[3]=0,S[4]=y.elements[3],S[5]=y.elements[4],S[6]=y.elements[5],S[7]=0,S[8]=y.elements[6],S[9]=y.elements[7],S[10]=y.elements[8],S[11]=0):ArrayBuffer.isView(y)?S.set(new y.constructor(y.buffer,y.byteOffset,S.length)):y.toArray(S,w)}function b(y,S,w,R){let x=y.value,A=S+"_"+w;if(R[A]===void 0)return typeof x=="number"||typeof x=="boolean"?R[A]=x:ArrayBuffer.isView(x)?R[A]=x.slice():R[A]=x.clone(),!0;{let C=R[A];if(typeof x=="number"||typeof x=="boolean"){if(C!==x)return R[A]=x,!0}else{if(ArrayBuffer.isView(x))return!0;if(C.equals(x)===!1)return C.copy(x),!0}}return!1}function m(y){let S=y.uniforms,w=0,R=16;for(let A=0,C=S.length;A<C;A++){let L=Array.isArray(S[A])?S[A]:[S[A]];for(let O=0,W=L.length;O<W;O++){let I=L[O],B=Array.isArray(I.value)?I.value:[I.value];for(let V=0,X=B.length;V<X;V++){let j=B[V],H=f(j),Y=w%R,ee=Y%H.boundary,Te=Y+ee;w+=ee,Te!==0&&R-Te<H.storage&&(w+=R-Te),I.__data=new Float32Array(H.storage/Float32Array.BYTES_PER_ELEMENT),I.__offset=w,w+=H.storage}}}let x=w%R;return x>0&&(w+=R-x),y.__size=w,y.__cache={},this}function f(y){let S={boundary:0,storage:0};return typeof y=="number"||typeof y=="boolean"?(S.boundary=4,S.storage=4):y.isVector2?(S.boundary=8,S.storage=8):y.isVector3||y.isColor?(S.boundary=16,S.storage=12):y.isVector4?(S.boundary=16,S.storage=16):y.isMatrix3?(S.boundary=48,S.storage=48):y.isMatrix4?(S.boundary=64,S.storage=64):y.isTexture?Ae("WebGLRenderer: Texture samplers can not be part of an uniforms group."):ArrayBuffer.isView(y)?(S.boundary=16,S.storage=y.byteLength):Ae("WebGLRenderer: Unsupported uniform value type.",y),S}function v(y){let S=y.target;S.removeEventListener("dispose",v);let w=o.indexOf(S.__bindingPointIndex);o.splice(w,1),i.deleteBuffer(s[S.id]),delete s[S.id],delete r[S.id]}function T(){for(let y in s)i.deleteBuffer(s[y]);o=[],s={},r={}}return{bind:c,update:l,dispose:T}}var tg=new Uint16Array([12469,15057,12620,14925,13266,14620,13807,14376,14323,13990,14545,13625,14713,13328,14840,12882,14931,12528,14996,12233,15039,11829,15066,11525,15080,11295,15085,10976,15082,10705,15073,10495,13880,14564,13898,14542,13977,14430,14158,14124,14393,13732,14556,13410,14702,12996,14814,12596,14891,12291,14937,11834,14957,11489,14958,11194,14943,10803,14921,10506,14893,10278,14858,9960,14484,14039,14487,14025,14499,13941,14524,13740,14574,13468,14654,13106,14743,12678,14818,12344,14867,11893,14889,11509,14893,11180,14881,10751,14852,10428,14812,10128,14765,9754,14712,9466,14764,13480,14764,13475,14766,13440,14766,13347,14769,13070,14786,12713,14816,12387,14844,11957,14860,11549,14868,11215,14855,10751,14825,10403,14782,10044,14729,9651,14666,9352,14599,9029,14967,12835,14966,12831,14963,12804,14954,12723,14936,12564,14917,12347,14900,11958,14886,11569,14878,11247,14859,10765,14828,10401,14784,10011,14727,9600,14660,9289,14586,8893,14508,8533,15111,12234,15110,12234,15104,12216,15092,12156,15067,12010,15028,11776,14981,11500,14942,11205,14902,10752,14861,10393,14812,9991,14752,9570,14682,9252,14603,8808,14519,8445,14431,8145,15209,11449,15208,11451,15202,11451,15190,11438,15163,11384,15117,11274,15055,10979,14994,10648,14932,10343,14871,9936,14803,9532,14729,9218,14645,8742,14556,8381,14461,8020,14365,7603,15273,10603,15272,10607,15267,10619,15256,10631,15231,10614,15182,10535,15118,10389,15042,10167,14963,9787,14883,9447,14800,9115,14710,8665,14615,8318,14514,7911,14411,7507,14279,7198,15314,9675,15313,9683,15309,9712,15298,9759,15277,9797,15229,9773,15166,9668,15084,9487,14995,9274,14898,8910,14800,8539,14697,8234,14590,7790,14479,7409,14367,7067,14178,6621,15337,8619,15337,8631,15333,8677,15325,8769,15305,8871,15264,8940,15202,8909,15119,8775,15022,8565,14916,8328,14804,8009,14688,7614,14569,7287,14448,6888,14321,6483,14088,6171,15350,7402,15350,7419,15347,7480,15340,7613,15322,7804,15287,7973,15229,8057,15148,8012,15046,7846,14933,7611,14810,7357,14682,7069,14552,6656,14421,6316,14251,5948,14007,5528,15356,5942,15356,5977,15353,6119,15348,6294,15332,6551,15302,6824,15249,7044,15171,7122,15070,7050,14949,6861,14818,6611,14679,6349,14538,6067,14398,5651,14189,5311,13935,4958,15359,4123,15359,4153,15356,4296,15353,4646,15338,5160,15311,5508,15263,5829,15188,6042,15088,6094,14966,6001,14826,5796,14678,5543,14527,5287,14377,4985,14133,4586,13869,4257,15360,1563,15360,1642,15358,2076,15354,2636,15341,3350,15317,4019,15273,4429,15203,4732,15105,4911,14981,4932,14836,4818,14679,4621,14517,4386,14359,4156,14083,3795,13808,3437,15360,122,15360,137,15358,285,15355,636,15344,1274,15322,2177,15281,2765,15215,3223,15120,3451,14995,3569,14846,3567,14681,3466,14511,3305,14344,3121,14037,2800,13753,2467,15360,0,15360,1,15359,21,15355,89,15346,253,15325,479,15287,796,15225,1148,15133,1492,15008,1749,14856,1882,14685,1886,14506,1783,14324,1608,13996,1398,13702,1183]),Vn=null;function ng(){return Vn===null&&(Vn=new Ei(tg,16,16,Fi,Nn),Vn.name="DFG_LUT",Vn.minFilter=gt,Vn.magFilter=gt,Vn.wrapS=_n,Vn.wrapT=_n,Vn.generateMipmaps=!1,Vn.needsUpdate=!0),Vn}var cr=class{constructor(e={}){let{canvas:t=Nu(),context:n=null,depth:s=!0,stencil:r=!1,alpha:o=!1,antialias:a=!1,premultipliedAlpha:c=!0,preserveDrawingBuffer:l=!1,powerPreference:h="default",failIfMajorPerformanceCaveat:d=!1,reversedDepthBuffer:u=!1,outputBufferType:p=Xt}=e;this.isWebGLRenderer=!0;let g;if(n!==null){if(typeof WebGLRenderingContext<"u"&&n instanceof WebGLRenderingContext)throw new Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.");g=n.getContextAttributes().alpha}else g=o;let b=p,m=new Set([Na,Da,La]),f=new Set([Xt,Dn,tr,nr,Ia,Pa]),v=new Uint32Array(4),T=new Int32Array(4),y=new N,S=null,w=null,R=[],x=[],A=null;this.domElement=t,this.debug={checkShaderErrors:!0,diagnostics:{keywords:!1},onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this.toneMapping=Ln,this.toneMappingExposure=1,this.transmissionResolutionScale=1;let C=this,L=!1,O=null,W=null,I=null,B=null;this._outputColorSpace=Ct;let V=0,X=0,j=null,H=-1,Y=null,ee=new tt,Te=new tt,Me=null,ot=new pe(0),Xe=0,Ze=t.width,K=t.height,te=1,xe=null,De=null,ge=new tt(0,0,Ze,K),ze=new tt(0,0,Ze,K),Rt=!1,Ve=new qs,Ye=!1,at=!1,We=new Ue,pt=new N,Ut=new tt,en={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0},mt=!1;function wt(){return j===null?te:1}let U=n;function Ht(M,P){return t.getContext(M,P)}let Qe,E,_,F,G,Z,ie,se,$,Q,re,Ee,le,oe,Re,Ie,Ne,D,ae,J,ce,fe,ne;try{let M={alpha:!0,depth:s,stencil:r,antialias:a,premultipliedAlpha:c,preserveDrawingBuffer:l,powerPreference:h,failIfMajorPerformanceCaveat:d};if("setAttribute"in t&&t.setAttribute("data-engine",`three.js r${"186"}`),t.addEventListener("webglcontextlost",ct,!1),t.addEventListener("webglcontextrestored",$e,!1),t.addEventListener("webglcontextcreationerror",Sn,!1),U===null){let P="webgl2";if(U=Ht(P,M),U===null)throw Ht(P)?new Error("THREE.WebGLRenderer: Error creating WebGL context with your selected attributes."):new Error("THREE.WebGLRenderer: Error creating WebGL context.")}Ce()}catch(M){throw t.removeEventListener("webglcontextlost",ct,!1),t.removeEventListener("webglcontextrestored",$e,!1),t.removeEventListener("webglcontextcreationerror",Sn,!1),Pe("WebGLRenderer: "+M.message),M}function Ce(){Qe=new l2(U),Qe.init(),ce=new K3(U,Qe),E=new Qm(U,Qe,e,ce),_=new Y3(U,Qe),E.reversedDepthBuffer&&u&&_.buffers.depth.setReversed(!0),W=U.createFramebuffer(),I=U.createFramebuffer(),B=U.createFramebuffer(),F=new d2(U),G=new D3,Z=new Z3(U,Qe,_,G,E,ce,F),ie=new c2(C),se=new p1(U),fe=new jm(U,se),$=new h2(U,se,F,fe),Q=new p2(U,$,se,fe,F),D=new f2(U,E,Z),Re=new e2(G),re=new L3(C,ie,Qe,E,fe,Re),Ee=new Q3(C,G),le=new U3,oe=new H3(Qe),Ne=new $m(C,ie,_,Q,g,c),Ie=new q3(C,Q,E),ne=new eg(U,F,E,_),ae=new Jm(U,Qe,F),J=new u2(U,Qe,F),F.programs=re.programs,C.capabilities=E,C.extensions=Qe,C.properties=G,C.renderLists=le,C.shadowMap=Ie,C.state=_,C.info=F}b!==Xt&&(A=new g2(b,t.width,t.height,a,s,r));let be=new o0(C,U);this.xr=be,this.getContext=function(){return U},this.getContextAttributes=function(){return U.getContextAttributes()},this.forceContextLoss=function(){let M=Qe.get("WEBGL_lose_context");M&&M.loseContext()},this.forceContextRestore=function(){let M=Qe.get("WEBGL_lose_context");M&&M.restoreContext()},this.getPixelRatio=function(){return te},this.setPixelRatio=function(M){M!==void 0&&(te=M,this.setSize(Ze,K,!1))},this.getSize=function(M){return M.set(Ze,K)},this.setSize=function(M,P,q=!0){if(be.isPresenting){Ae("WebGLRenderer: Can't change size while VR device is presenting.");return}Ze=M,K=P,t.width=Math.floor(M*te),t.height=Math.floor(P*te),q===!0&&(t.style.width=M+"px",t.style.height=P+"px"),A!==null&&A.setSize(t.width,t.height),this.setViewport(0,0,M,P)},this.getDrawingBufferSize=function(M){return M.set(Ze*te,K*te).floor()},this.setDrawingBufferSize=function(M,P,q){Ze=M,K=P,te=q,t.width=Math.floor(M*q),t.height=Math.floor(P*q),this.setViewport(0,0,M,P)},this.setEffects=function(M){if(b===Xt){Pe("WebGLRenderer: setEffects() requires outputBufferType set to HalfFloatType or FloatType.");return}if(M){for(let P=0;P<M.length;P++)if(M[P].isOutputPass===!0){Ae("WebGLRenderer: OutputPass is not needed in setEffects(). Tone mapping and color space conversion are applied automatically.");break}}A.setEffects(M||[])},this.getCurrentViewport=function(M){return M.copy(ee)},this.getViewport=function(M){return M.copy(ge)},this.setViewport=function(M,P,q,k){M.isVector4?ge.set(M.x,M.y,M.z,M.w):ge.set(M,P,q,k),_.viewport(ee.copy(ge).multiplyScalar(te).round())},this.getScissor=function(M){return M.copy(ze)},this.setScissor=function(M,P,q,k){M.isVector4?ze.set(M.x,M.y,M.z,M.w):ze.set(M,P,q,k),_.scissor(Te.copy(ze).multiplyScalar(te).round())},this.getScissorTest=function(){return Rt},this.setScissorTest=function(M){_.setScissorTest(Rt=M)},this.setOpaqueSort=function(M){xe=M},this.setTransparentSort=function(M){De=M},this.getClearColor=function(M){return M.copy(Ne.getClearColor())},this.setClearColor=function(){Ne.setClearColor(...arguments)},this.getClearAlpha=function(){return Ne.getClearAlpha()},this.setClearAlpha=function(){Ne.setClearAlpha(...arguments)},this.clear=function(M=!0,P=!0,q=!0){let k=0;if(M){let z=!1;if(j!==null){let de=j.texture.format;z=m.has(de)}if(z){let de=j.texture.type,_e=f.has(de),ue=Ne.getClearColor(),ye=Ne.getClearAlpha(),Se=ue.r,Oe=ue.g,Ge=ue.b;_e?(v[0]=Se,v[1]=Oe,v[2]=Ge,v[3]=ye,U.clearBufferuiv(U.COLOR,0,v)):(T[0]=Se,T[1]=Oe,T[2]=Ge,T[3]=ye,U.clearBufferiv(U.COLOR,0,T))}else k|=U.COLOR_BUFFER_BIT}P&&(k|=U.DEPTH_BUFFER_BIT,this.state.buffers.depth.setMask(!0)),q&&(k|=U.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),k!==0&&U.clear(k)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.setNodesHandler=function(M){M.setRenderer(this),O=M},this.dispose=function(){t.removeEventListener("webglcontextlost",ct,!1),t.removeEventListener("webglcontextrestored",$e,!1),t.removeEventListener("webglcontextcreationerror",Sn,!1),Ne.dispose(),le.dispose(),oe.dispose(),G.dispose(),ie.dispose(),Q.dispose(),fe.dispose(),ne.dispose(),re.dispose(),be.dispose(),be.removeEventListener("sessionstart",sh),be.removeEventListener("sessionend",rh),Vi.stop()};function ct(M){M.preventDefault(),Ir("WebGLRenderer: Context Lost."),L=!0}function $e(){Ir("WebGLRenderer: Context Restored."),L=!1;let M=F.autoReset,P=Ie.enabled,q=Ie.autoUpdate,k=Ie.needsUpdate,z=Ie.type;Ce(),F.autoReset=M,Ie.enabled=P,Ie.autoUpdate=q,Ie.needsUpdate=k,Ie.type=z}function Sn(M){Pe("WebGLRenderer: A WebGL context could not be created. Reason: ",M.statusMessage)}function Un(M){let P=M.target;P.removeEventListener("dispose",Un),tf(P)}function tf(M){nf(M),G.remove(M)}function nf(M){let P=G.get(M).programs;P!==void 0&&(P.forEach(function(q){re.releaseProgram(q)}),M.isShaderMaterial&&re.releaseShaderCache(M))}this.renderBufferDirect=function(M,P,q,k,z,de){P===null&&(P=en);let _e=z.isMesh&&z.matrixWorld.determinantAffine()<0,ue=of(M,P,q,k,z);_.setMaterial(k,_e);let ye=q.index,Se=1;if(k.wireframe===!0){if(ye=$.getWireframeAttribute(q),ye===void 0)return;Se=2}let Oe=q.drawRange,Ge=q.attributes.position,ve=Oe.start*Se,je=(Oe.start+Oe.count)*Se;de!==null&&(ve=Math.max(ve,de.start*Se),je=Math.min(je,(de.start+de.count)*Se)),ye!==null?(ve=Math.max(ve,0),je=Math.min(je,ye.count)):Ge!=null&&(ve=Math.max(ve,0),je=Math.min(je,Ge.count));let Tt=je-ve;if(Tt<0||Tt===1/0)return;fe.setup(z,k,ue,q,ye);let dt,rt=ae;if(ye!==null&&(dt=se.get(ye),rt=J,rt.setIndex(dt)),z.isMesh)k.wireframe===!0?(_.setLineWidth(k.wireframeLinewidth*wt()),rt.setMode(U.LINES)):rt.setMode(U.TRIANGLES);else if(z.isLine){let Vt=k.linewidth;Vt===void 0&&(Vt=1),_.setLineWidth(Vt*wt()),z.isLineSegments?rt.setMode(U.LINES):z.isLineLoop?rt.setMode(U.LINE_LOOP):rt.setMode(U.LINE_STRIP)}else z.isPoints?rt.setMode(U.POINTS):z.isSprite&&rt.setMode(U.TRIANGLES);if(z.isBatchedMesh)if(Qe.get("WEBGL_multi_draw"))rt.renderMultiDraw(z._multiDrawStarts,z._multiDrawCounts,z._multiDrawCount);else{let Vt=z._multiDrawStarts,me=z._multiDrawCounts,Zt=z._multiDrawCount,qe=ye?se.get(ye).bytesPerElement:1,mn=G.get(k).currentProgram.getUniforms();for(let On=0;On<Zt;On++)mn.setValue(U,"_gl_DrawID",On),rt.render(Vt[On]/qe,me[On])}else if(z.isInstancedMesh)rt.renderInstances(ve,Tt,z.count);else if(q.isInstancedBufferGeometry){let Vt=q._maxInstanceCount!==void 0?q._maxInstanceCount:1/0,me=Math.min(q.instanceCount,Vt);rt.renderInstances(ve,Tt,me)}else rt.render(ve,Tt)};function ih(M,P,q,k){O!==null&&M.isNodeMaterial&&O.setObject(k,M),Ye===!0&&Re.setState(M,q,!1),M.transparent===!0&&M.side===on&&M.forceSinglePass===!1?(M.side=zt,M.needsUpdate=!0,Mo(M,P,k),M.side=vn,M.needsUpdate=!0,Mo(M,P,k),M.side=on):Mo(M,P,k)}this.compile=function(M,P,q=null){q===null&&(q=M),O!==null&&O.renderStart(M,P,q),w=oe.get(q),w.init(P),x.push(w),q.traverseVisible(function(z){z.isLight&&z.layers.test(P.layers)&&(w.pushLight(z),z.castShadow&&w.pushShadow(z))}),M!==q&&M.traverseVisible(function(z){z.isLight&&z.layers.test(P.layers)&&(w.pushLight(z),z.castShadow&&w.pushShadow(z))}),w.setupLights(),O!==null&&O.updateLights(w.state.lightsArray),at=this.localClippingEnabled,Ye=Re.init(this.clippingPlanes,at),Ye===!0&&Re.setGlobalState(this.clippingPlanes,P),O!==null&&Ie.render(w.state.shadowsArray,q,P);let k=new Set;return M.traverse(function(z){if(!(z.isMesh||z.isPoints||z.isLine||z.isSprite))return;let de=z.material;if(de)if(Array.isArray(de))for(let _e=0;_e<de.length;_e++){let ue=de[_e];ih(ue,q,P,z),k.add(ue)}else ih(de,q,P,z),k.add(de)}),w=x.pop(),O!==null&&O.renderEnd(),k},this.compileAsync=function(M,P,q=null){let k=this.compile(M,P,q);return new Promise(z=>{function de(){if(k.forEach(function(_e){let ye=G.get(_e).currentProgram;(ye===void 0||ye.isReady())&&k.delete(_e)}),k.size===0){z(M);return}setTimeout(de,10)}Qe.get("KHR_parallel_shader_compile")!==null?de():setTimeout(de,10)})};let Fc=null;function sf(M){Fc&&Fc(M)}function sh(){Vi.stop()}function rh(){Vi.start()}let Vi=new ld;Vi.setAnimationLoop(sf),typeof self<"u"&&Vi.setContext(self),this.setAnimationLoop=function(M){Fc=M,be.setAnimationLoop(M),M===null?Vi.stop():Vi.start()},be.addEventListener("sessionstart",sh),be.addEventListener("sessionend",rh),this.render=function(M,P){if(P!==void 0&&P.isCamera!==!0){Pe("WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(L===!0)return;O!==null&&O.renderStart(M,P);let q=be.enabled===!0&&be.isPresenting===!0,k=A!==null&&(j===null||q)&&A.begin(C,j);if(M.matrixWorldAutoUpdate===!0&&M.updateMatrixWorld(),P.parent===null&&P.matrixWorldAutoUpdate===!0&&P.updateMatrixWorld(),be.enabled===!0&&be.isPresenting===!0&&(A===null||A.isCompositing()===!1)&&(be.cameraAutoUpdate===!0&&be.updateCamera(P),P=be.getCamera()),M.isScene===!0&&M.onBeforeRender(C,M,P,j),w=oe.get(M,x.length),w.init(P),w.state.textureUnits=Z.getTextureUnits(),x.push(w),We.multiplyMatrices(P.projectionMatrix,P.matrixWorldInverse),Ve.setFromProjectionMatrix(We,Rn,P.reversedDepth),at=this.localClippingEnabled,Ye=Re.init(this.clippingPlanes,at),S=le.get(M,R.length),S.init(),R.push(S),be.enabled===!0&&be.isPresenting===!0){let _e=C.xr.getDepthSensingMesh();_e!==null&&Bc(_e,P,-1/0,C.sortObjects)}Bc(M,P,0,C.sortObjects),S.finish(),O!==null&&O.updateLights(w.state.lightsArray),C.sortObjects===!0&&S.sort(xe,De),mt=be.enabled===!1||be.isPresenting===!1||be.hasDepthSensing()===!1,mt&&Ne.addToRenderList(S,M),this.info.render.frame++,this.info.autoReset===!0&&this.info.reset(),Ye===!0&&Re.beginShadows();let z=w.state.shadowsArray;if(Ie.render(z,M,P),Ye===!0&&Re.endShadows(),(k&&A.hasRenderPass())===!1){let _e=S.opaque,ue=S.transmissive;if(w.setupLights(),P.isArrayCamera){let ye=P.cameras;if(ue.length>0)for(let Se=0,Oe=ye.length;Se<Oe;Se++){let Ge=ye[Se];ah(_e,ue,M,Ge)}mt&&Ne.render(M);for(let Se=0,Oe=ye.length;Se<Oe;Se++){let Ge=ye[Se];oh(S,M,Ge,Ge.viewport)}}else ue.length>0&&ah(_e,ue,M,P),mt&&Ne.render(M),oh(S,M,P)}j!==null&&X===0&&(Z.updateMultisampleRenderTarget(j),Z.updateRenderTargetMipmap(j)),k&&A.end(C),M.isScene===!0&&M.onAfterRender(C,M,P),fe.resetDefaultState(),H=-1,Y=null,x.pop(),x.length>0?(w=x[x.length-1],Z.setTextureUnits(w.state.textureUnits),Ye===!0&&Re.setGlobalState(C.clippingPlanes,w.state.camera)):w=null,R.pop(),R.length>0?S=R[R.length-1]:S=null,O!==null&&O.renderEnd()};function Bc(M,P,q,k){if(M.visible===!1)return;if(M.layers.test(P.layers)){if(M.isGroup)q=M.renderOrder;else if(M.isLOD)M.autoUpdate===!0&&M.update(P);else if(M.isLightProbeGrid)w.pushLightProbeGrid(M);else if(M.isLight)w.pushLight(M),M.castShadow&&w.pushShadow(M);else if(M.isSprite){if(!M.frustumCulled||M.intersectsFrustum(Ve)){k&&Ut.setFromMatrixPosition(M.matrixWorld).applyMatrix4(We);let _e=Q.update(M),ue=M.material;ue.visible&&S.push(M,_e,ue,q,Ut.z,null,P)}}else if((M.isMesh||M.isLine||M.isPoints)&&(!M.frustumCulled||M.intersectsFrustum(Ve))){let _e=Q.update(M),ue=M.material;if(k&&(M.boundingSphere!==void 0?(M.boundingSphere===null&&M.computeBoundingSphere(),Ut.copy(M.boundingSphere.center)):(_e.boundingSphere===null&&_e.computeBoundingSphere(),Ut.copy(_e.boundingSphere.center)),Ut.applyMatrix4(M.matrixWorld).applyMatrix4(We)),Array.isArray(ue)){let ye=_e.groups;for(let Se=0,Oe=ye.length;Se<Oe;Se++){let Ge=ye[Se],ve=ue[Ge.materialIndex];ve&&ve.visible&&S.push(M,_e,ve,q,Ut.z,Ge,P)}}else ue.visible&&S.push(M,_e,ue,q,Ut.z,null,P)}}let de=M.children;for(let _e=0,ue=de.length;_e<ue;_e++)Bc(de[_e],P,q,k)}function oh(M,P,q,k){let{opaque:z,transmissive:de,transparent:_e}=M;w.setupLightsView(q),Ye===!0&&Re.setGlobalState(C.clippingPlanes,q),k&&_.viewport(ee.copy(k)),z.length>0&&vo(z,P,q),de.length>0&&vo(de,P,q),_e.length>0&&vo(_e,P,q),_.buffers.depth.setTest(!0),_.buffers.depth.setMask(!0),_.buffers.color.setMask(!0),_.setPolygonOffset(!1)}function ah(M,P,q,k){if((q.isScene===!0?q.overrideMaterial:null)!==null)return;if(w.state.transmissionRenderTarget[k.id]===void 0){let ve=Qe.has("EXT_color_buffer_half_float")||Qe.has("EXT_color_buffer_float");w.state.transmissionRenderTarget[k.id]=new tn(1,1,{generateMipmaps:!0,type:ve?Nn:Xt,minFilter:un,samples:Math.max(4,E.samples),stencilBuffer:r,resolveDepthBuffer:!1,resolveStencilBuffer:!1,storeMultisampledDepthBuffer:!1,storeMultisampledStencilBuffer:!1,colorSpace:Be.workingColorSpace})}let de=w.state.transmissionRenderTarget[k.id],_e=k.viewport||ee;de.setSize(_e.z*C.transmissionResolutionScale,_e.w*C.transmissionResolutionScale);let ue=C.getRenderTarget(),ye=C.getActiveCubeFace(),Se=C.getActiveMipmapLevel();C.setRenderTarget(de),C.getClearColor(ot),Xe=C.getClearAlpha(),Xe<1&&C.setClearColor(16777215,.5),C.clear(),mt&&Ne.render(q);let Oe=C.toneMapping;C.toneMapping=Ln;let Ge=k.viewport;if(k.viewport!==void 0&&(k.viewport=void 0),w.setupLightsView(k),Ye===!0&&Re.setGlobalState(C.clippingPlanes,k),vo(M,q,k),Z.updateMultisampleRenderTarget(de),Z.updateRenderTargetMipmap(de),Qe.has("WEBGL_multisampled_render_to_texture")===!1){let ve=!1;for(let je=0,Tt=P.length;je<Tt;je++){let dt=P[je],{object:rt,geometry:Vt,material:me,group:Zt}=dt;if(me.side===on&&rt.layers.test(k.layers)){let qe=me.side;me.side=zt,me.needsUpdate=!0,ch(rt,q,k,Vt,me,Zt),me.side=qe,me.needsUpdate=!0,ve=!0}}ve===!0&&(Z.updateMultisampleRenderTarget(de),Z.updateRenderTargetMipmap(de))}C.setRenderTarget(ue,ye,Se),C.setClearColor(ot,Xe),Ge!==void 0&&(k.viewport=Ge),C.toneMapping=Oe}function vo(M,P,q){let k=P.isScene===!0?P.overrideMaterial:null;for(let z=0,de=M.length;z<de;z++){let _e=M[z],{object:ue,geometry:ye,group:Se}=_e,Oe=_e.material;Oe.allowOverride===!0&&k!==null&&(Oe=k),ue.layers.test(q.layers)&&ch(ue,P,q,ye,Oe,Se)}}function ch(M,P,q,k,z,de){O!==null&&z.isNodeMaterial&&O.setObject(M,z),M.onBeforeRender(C,P,q,k,z,de),M.modelViewMatrix.multiplyMatrices(q.matrixWorldInverse,M.matrixWorld),M.normalMatrix.getNormalMatrix(M.modelViewMatrix),z.onBeforeRender(C,P,q,k,M,de),z.transparent===!0&&z.side===on&&z.forceSinglePass===!1?(z.side=zt,z.needsUpdate=!0,C.renderBufferDirect(q,P,k,z,M,de),z.side=vn,z.needsUpdate=!0,C.renderBufferDirect(q,P,k,z,M,de),z.side=on):C.renderBufferDirect(q,P,k,z,M,de),M.onAfterRender(C,P,q,k,z,de)}function Mo(M,P,q){P.isScene!==!0&&(P=en);let k=G.get(M),z=w.state.lights,de=w.state.shadowsArray,_e=z.state.version,ue=re.getParameters(M,z.state,de,P,q,w.state.lightProbeGridArray),ye=re.getProgramCacheKey(ue),Se=k.programs;k.environment=M.isMeshStandardMaterial||M.isMeshLambertMaterial||M.isMeshPhongMaterial?P.environment:null,k.fog=P.fog;let Oe=M.isMeshStandardMaterial||M.isMeshLambertMaterial&&!M.envMap||M.isMeshPhongMaterial&&!M.envMap;k.envMap=ie.get(M.envMap||k.environment,Oe),k.envMapRotation=k.environment!==null&&M.envMap===null?P.environmentRotation:M.envMapRotation,Se===void 0&&(M.addEventListener("dispose",Un),Se=new Map,k.programs=Se);let Ge=Se.get(ye);if(Ge!==void 0){if(k.currentProgram===Ge&&k.lightsStateVersion===_e)return hh(M,ue),Ge}else ue.uniforms=re.getUniforms(M),O!==null&&M.isNodeMaterial&&O.build(M,q,ue),M.onBeforeCompile(ue,C),Ge=re.acquireProgram(ue,ye),Se.set(ye,Ge),k.uniforms=ue.uniforms;let ve=k.uniforms;return(!M.isShaderMaterial&&!M.isRawShaderMaterial||M.clipping===!0)&&(ve.clippingPlanes=Re.uniform),hh(M,ue),k.needsLights=cf(M),k.lightsStateVersion=_e,k.needsLights&&(ve.ambientLightColor.value=z.state.ambient,ve.lightProbe.value=z.state.probe,ve.sunLights.value=z.state.sun,ve.sunLightShadows.value=z.state.sunShadow,ve.directionalLights.value=z.state.directional,ve.directionalLightShadows.value=z.state.directionalShadow,ve.spotLights.value=z.state.spot,ve.spotLightShadows.value=z.state.spotShadow,ve.rectAreaLights.value=z.state.rectArea,ve.ltc_1.value=z.state.rectAreaLTC1,ve.ltc_2.value=z.state.rectAreaLTC2,ve.pointLights.value=z.state.point,ve.pointLightShadows.value=z.state.pointShadow,ve.hemisphereLights.value=z.state.hemi,ve.sunShadowMatrix.value=z.state.sunShadowMatrix,ve.sunShadowCascade.value=z.state.sunShadowCascade,ve.directionalShadowMatrix.value=z.state.directionalShadowMatrix,ve.spotLightMatrix.value=z.state.spotLightMatrix,ve.spotLightMap.value=z.state.spotLightMap,ve.pointShadowMatrix.value=z.state.pointShadowMatrix),k.lightProbeGrid=w.state.lightProbeGridArray.length>0,k.currentProgram=Ge,k.uniformsList=null,Ge}function lh(M){if(M.uniformsList===null){let P=M.currentProgram.getUniforms();M.uniformsList=ar.seqWithValue(P.seq,M.uniforms)}return M.uniformsList}function hh(M,P){let q=G.get(M);q.outputColorSpace=P.outputColorSpace,q.batching=P.batching,q.batchingColor=P.batchingColor,q.instancing=P.instancing,q.instancingColor=P.instancingColor,q.instancingMorph=P.instancingMorph,q.skinning=P.skinning,q.morphTargets=P.morphTargets,q.morphNormals=P.morphNormals,q.morphColors=P.morphColors,q.morphTargetsCount=P.morphTargetsCount,q.numClippingPlanes=P.numClippingPlanes,q.numIntersection=P.numClipIntersection,q.vertexAlphas=P.vertexAlphas,q.vertexTangents=P.vertexTangents,q.toneMapping=P.toneMapping}function rf(M,P){if(M.length===0)return null;if(M.length===1)return M[0].texture!==null?M[0]:null;y.setFromMatrixPosition(P.matrixWorld);for(let q=0,k=M.length;q<k;q++){let z=M[q];if(z.texture!==null&&z.boundingBox.containsPoint(y))return z}return null}function of(M,P,q,k,z){P.isScene!==!0&&(P=en),Z.resetTextureUnits();let de=P.fog,_e=k.isMeshStandardMaterial||k.isMeshLambertMaterial||k.isMeshPhongMaterial?P.environment:null,ue=j===null?C.outputColorSpace:j.isXRRenderTarget===!0?j.texture.colorSpace:Be.workingColorSpace,ye=k.isMeshStandardMaterial||k.isMeshLambertMaterial&&!k.envMap||k.isMeshPhongMaterial&&!k.envMap,Se=ie.get(k.envMap||_e,ye),Oe=k.vertexColors===!0&&!!q.attributes.color&&q.attributes.color.itemSize===4,Ge=!!q.attributes.tangent&&(!!k.normalMap||k.anisotropy>0),ve=!!q.morphAttributes.position,je=!!q.morphAttributes.normal,Tt=!!q.morphAttributes.color,dt=Ln;k.toneMapped&&(j===null||j.isXRRenderTarget===!0)&&(dt=C.toneMapping);let rt=q.morphAttributes.position||q.morphAttributes.normal||q.morphAttributes.color,Vt=rt!==void 0?rt.length:0,me=G.get(k),Zt=w.state.lights;if(Ye===!0&&(at===!0||M!==Y)){let lt=M===Y&&k.id===H;Re.setState(k,M,lt)}let qe=!1;k.version===me.__version?(me.needsLights&&me.lightsStateVersion!==Zt.state.version||me.outputColorSpace!==ue||z.isBatchedMesh&&me.batching===!1||!z.isBatchedMesh&&me.batching===!0||z.isBatchedMesh&&me.batchingColor===!0&&z._colorsTexture===null||z.isBatchedMesh&&me.batchingColor===!1&&z._colorsTexture!==null||z.isInstancedMesh&&me.instancing===!1||!z.isInstancedMesh&&me.instancing===!0||z.isSkinnedMesh&&me.skinning===!1||!z.isSkinnedMesh&&me.skinning===!0||z.isInstancedMesh&&me.instancingColor===!0&&z.instanceColor===null||z.isInstancedMesh&&me.instancingColor===!1&&z.instanceColor!==null||z.isInstancedMesh&&me.instancingMorph===!0&&z.morphTexture===null||z.isInstancedMesh&&me.instancingMorph===!1&&z.morphTexture!==null||me.envMap!==Se||k.fog===!0&&me.fog!==de||me.numClippingPlanes!==void 0&&(me.numClippingPlanes!==Re.numPlanes||me.numIntersection!==Re.numIntersection)||me.vertexAlphas!==Oe||me.vertexTangents!==Ge||me.morphTargets!==ve||me.morphNormals!==je||me.morphColors!==Tt||me.toneMapping!==dt||me.morphTargetsCount!==Vt||!!me.lightProbeGrid!=w.state.lightProbeGridArray.length>0)&&(qe=!0):(qe=!0,me.__version=k.version);let mn=me.currentProgram;qe===!0&&(mn=Mo(k,P,z),O&&k.isNodeMaterial&&O.onUpdateProgram(k,mn,me));let On=!1,mi=!1,ys=!1,it=mn.getUniforms(),vt=me.uniforms;if(_.useProgram(mn.program)&&(On=!0,mi=!0,ys=!0),k.id!==H&&(H=k.id,mi=!0),me.needsLights){let lt=rf(w.state.lightProbeGridArray,z);me.lightProbeGrid!==lt&&(me.lightProbeGrid=lt,mi=!0)}if(On||Y!==M){_.buffers.depth.getReversed()&&M.reversedDepth!==!0&&(M._reversedDepth=!0,M.updateProjectionMatrix()),it.setValue(U,"projectionMatrix",M.projectionMatrix),it.setValue(U,"viewMatrix",M.matrixWorldInverse);let _i=it.map.cameraPosition;_i!==void 0&&_i.setValue(U,pt.setFromMatrixPosition(M.matrixWorld)),E.logarithmicDepthBuffer&&it.setValue(U,"logDepthBufFC",2/(Math.log(M.far+1)/Math.LN2)),(k.isMeshPhongMaterial||k.isMeshToonMaterial||k.isMeshLambertMaterial||k.isMeshBasicMaterial||k.isMeshStandardMaterial||k.isShaderMaterial)&&it.setValue(U,"isOrthographic",M.isOrthographicCamera===!0),Y!==M&&(Y=M,mi=!0,ys=!0)}if(me.needsLights&&(Zt.state.sunShadowMap.length>0&&it.setValue(U,"sunShadowMap",Zt.state.sunShadowMap,Z),Zt.state.directionalShadowMap.length>0&&it.setValue(U,"directionalShadowMap",Zt.state.directionalShadowMap,Z),Zt.state.spotShadowMap.length>0&&it.setValue(U,"spotShadowMap",Zt.state.spotShadowMap,Z),Zt.state.pointShadowMap.length>0&&it.setValue(U,"pointShadowMap",Zt.state.pointShadowMap,Z)),z.isSkinnedMesh){it.setOptional(U,z,"bindMatrix"),it.setOptional(U,z,"bindMatrixInverse");let lt=z.skeleton;lt&&(lt.boneTexture===null&&lt.computeBoneTexture(),it.setValue(U,"boneTexture",lt.boneTexture,Z))}z.isBatchedMesh&&(it.setOptional(U,z,"batchingTexture"),it.setValue(U,"batchingTexture",z._matricesTexture,Z),it.setOptional(U,z,"batchingIdTexture"),it.setValue(U,"batchingIdTexture",z._indirectTexture,Z),it.setOptional(U,z,"batchingColorTexture"),z._colorsTexture!==null&&it.setValue(U,"batchingColorTexture",z._colorsTexture,Z));let gi=q.morphAttributes;if((gi.position!==void 0||gi.normal!==void 0||gi.color!==void 0)&&D.update(z,q,mn),(mi||me.receiveShadow!==z.receiveShadow)&&(me.receiveShadow=z.receiveShadow,it.setValue(U,"receiveShadow",z.receiveShadow)),(k.isMeshStandardMaterial||k.isMeshLambertMaterial||k.isMeshPhongMaterial)&&k.envMap===null&&P.environment!==null&&(vt.envMapIntensity.value=P.environmentIntensity),vt.dfgLUT!==void 0&&(vt.dfgLUT.value=ng()),mi){if(it.setValue(U,"toneMappingExposure",C.toneMappingExposure),me.needsLights&&af(vt,ys),de&&k.fog===!0&&Ee.refreshFogUniforms(vt,de),Ee.refreshMaterialUniforms(vt,k,te,K,w.state.transmissionRenderTarget[M.id]),me.needsLights&&me.lightProbeGrid){let lt=me.lightProbeGrid;vt.probesSH.value=lt.texture,vt.probesMin.value.copy(lt.boundingBox.min),vt.probesMax.value.copy(lt.boundingBox.max),vt.probesResolution.value.copy(lt.resolution)}ar.upload(U,lh(me),vt,Z)}if(k.isShaderMaterial&&k.uniformsNeedUpdate===!0&&(ar.upload(U,lh(me),vt,Z),k.uniformsNeedUpdate=!1),k.isSpriteMaterial&&it.setValue(U,"center",z.center),it.setValue(U,"modelViewMatrix",z.modelViewMatrix),it.setValue(U,"normalMatrix",z.normalMatrix),it.setValue(U,"modelMatrix",z.matrixWorld),k.uniformsGroups!==void 0){let lt=k.uniformsGroups;for(let _i=0,vs=lt.length;_i<vs;_i++){let dh=lt[_i];ne.update(dh,mn),ne.bind(dh,mn)}}return mn}function af(M,P){M.ambientLightColor.needsUpdate=P,M.lightProbe.needsUpdate=P,M.sunLights.needsUpdate=P,M.sunLightShadows.needsUpdate=P,M.directionalLights.needsUpdate=P,M.directionalLightShadows.needsUpdate=P,M.pointLights.needsUpdate=P,M.pointLightShadows.needsUpdate=P,M.spotLights.needsUpdate=P,M.spotLightShadows.needsUpdate=P,M.rectAreaLights.needsUpdate=P,M.hemisphereLights.needsUpdate=P}function cf(M){return M.isMeshLambertMaterial||M.isMeshToonMaterial||M.isMeshPhongMaterial||M.isMeshStandardMaterial||M.isShadowMaterial||M.isShaderMaterial&&M.lights===!0}this.getActiveCubeFace=function(){return V},this.getActiveMipmapLevel=function(){return X},this.getRenderTarget=function(){return j},this.setRenderTargetTextures=function(M,P,q){let k=G.get(M);k.__autoAllocateDepthBuffer=M.resolveDepthBuffer===!1,k.__autoAllocateDepthBuffer===!1&&(k.__useRenderToTexture=!1),G.get(M.texture).__webglTexture=P,G.get(M.depthTexture).__webglTexture=k.__autoAllocateDepthBuffer?void 0:q,k.__hasExternalTextures=!0},this.setRenderTargetFramebuffer=function(M,P){let q=G.get(M);q.__webglFramebuffer=P,q.__useDefaultFramebuffer=P===void 0},this.setRenderTarget=function(M,P=0,q=0){j=M,V=P,X=q;let k=null,z=!1,de=!1;if(M){let ue=G.get(M);if(ue.__useDefaultFramebuffer!==void 0){_.bindFramebuffer(U.FRAMEBUFFER,ue.__webglFramebuffer),ee.copy(M.viewport),Te.copy(M.scissor),Me=M.scissorTest,_.viewport(ee),_.scissor(Te),_.setScissorTest(Me),H=-1;return}else if(ue.__webglFramebuffer===void 0)Z.setupRenderTarget(M);else if(ue.__hasExternalTextures)Z.rebindTextures(M,G.get(M.texture).__webglTexture,G.get(M.depthTexture).__webglTexture);else if(M.depthBuffer){let Oe=M.depthTexture;if(ue.__boundDepthTexture!==Oe){if(Oe!==null&&G.has(Oe)&&(M.width!==Oe.image.width||M.height!==Oe.image.height))throw new Error("THREE.WebGLRenderer: Attached DepthTexture is initialized to the incorrect size.");Z.setupDepthRenderbuffer(M)}}let ye=M.texture;(ye.isData3DTexture||ye.isDataArrayTexture||ye.isCompressedArrayTexture)&&(de=!0);let Se=G.get(M).__webglFramebuffer;M.isWebGLCubeRenderTarget?(Array.isArray(Se[P])?k=Se[P][q]:k=Se[P],z=!0):M.samples>0&&Z.useMultisampledRTT(M)===!1?k=G.get(M).__webglMultisampledFramebuffer:Array.isArray(Se)?k=Se[q]:k=Se,ee.copy(M.viewport),Te.copy(M.scissor),Me=M.scissorTest}else ee.copy(ge).multiplyScalar(te).floor(),Te.copy(ze).multiplyScalar(te).floor(),Me=Rt;if(q!==0&&(k=W),_.bindFramebuffer(U.FRAMEBUFFER,k)&&_.drawBuffers(M,k),_.viewport(ee),_.scissor(Te),_.setScissorTest(Me),z){let ue=G.get(M.texture);U.framebufferTexture2D(U.FRAMEBUFFER,U.COLOR_ATTACHMENT0,U.TEXTURE_CUBE_MAP_POSITIVE_X+P,ue.__webglTexture,q)}else if(de){let ue=P;for(let ye=0;ye<M.textures.length;ye++){let Se=G.get(M.textures[ye]);U.framebufferTextureLayer(U.FRAMEBUFFER,U.COLOR_ATTACHMENT0+ye,Se.__webglTexture,q,ue)}}else if(M!==null&&q!==0){let ue=G.get(M.texture);U.framebufferTexture2D(U.FRAMEBUFFER,U.COLOR_ATTACHMENT0,U.TEXTURE_2D,ue.__webglTexture,q)}H=-1};function uh(M){let P=G.get(M);return(P.__readFormat!==M.format||P.__readType!==M.type)&&(P.__readFormat=M.format,P.__readType=M.type,P.__formatReadable=E.textureFormatReadable(M.format),P.__typeReadable=E.textureTypeReadable(M.type)),P}this.readRenderTargetPixels=function(M,P,q,k,z,de,_e,ue=0){if(!(M&&M.isWebGLRenderTarget)){Pe("WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let ye=G.get(M).__webglFramebuffer;if(M.isWebGLCubeRenderTarget&&_e!==void 0&&(ye=ye[_e]),ye){_.bindFramebuffer(U.FRAMEBUFFER,ye);try{let Se=M.textures[ue],Oe=Se.format,Ge=Se.type;M.textures.length>1&&U.readBuffer(U.COLOR_ATTACHMENT0+ue);let ve=uh(Se);if(ve.__formatReadable===!1){Pe("WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}if(ve.__typeReadable===!1){Pe("WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}P>=0&&P<=M.width-k&&q>=0&&q<=M.height-z&&U.readPixels(P,q,k,z,ce.convert(Oe),ce.convert(Ge),de)}finally{let Se=j!==null?G.get(j).__webglFramebuffer:null;_.bindFramebuffer(U.FRAMEBUFFER,Se)}}},this.readRenderTargetPixelsAsync=async function(M,P,q,k,z,de,_e,ue=0){if(!(M&&M.isWebGLRenderTarget))throw new Error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");let ye=G.get(M).__webglFramebuffer;if(M.isWebGLCubeRenderTarget&&_e!==void 0&&(ye=ye[_e]),ye)if(P>=0&&P<=M.width-k&&q>=0&&q<=M.height-z){_.bindFramebuffer(U.FRAMEBUFFER,ye);let Se=M.textures[ue],Oe=Se.format,Ge=Se.type;M.textures.length>1&&U.readBuffer(U.COLOR_ATTACHMENT0+ue);let ve=uh(Se);if(ve.__formatReadable===!1)throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.");if(ve.__typeReadable===!1)throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.");let je=U.createBuffer();U.bindBuffer(U.PIXEL_PACK_BUFFER,je),U.bufferData(U.PIXEL_PACK_BUFFER,de.byteLength,U.STREAM_READ),U.readPixels(P,q,k,z,ce.convert(Oe),ce.convert(Ge),0),U.bindBuffer(U.PIXEL_PACK_BUFFER,null);let Tt=j!==null?G.get(j).__webglFramebuffer:null;_.bindFramebuffer(U.FRAMEBUFFER,Tt);let dt=U.fenceSync(U.SYNC_GPU_COMMANDS_COMPLETE,0);return U.flush(),await Ou(U,dt,4),U.bindBuffer(U.PIXEL_PACK_BUFFER,je),U.getBufferSubData(U.PIXEL_PACK_BUFFER,0,de),U.bindBuffer(U.PIXEL_PACK_BUFFER,null),U.deleteBuffer(je),U.deleteSync(dt),de}else throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.")},this.copyFramebufferToTexture=function(M,P=null,q=0){let k=Math.pow(2,-q),z=Math.floor(M.image.width*k),de=Math.floor(M.image.height*k),_e=P!==null?P.x:0,ue=P!==null?P.y:0;Z.setTexture2D(M,0),U.copyTexSubImage2D(U.TEXTURE_2D,q,0,0,_e,ue,z,de),_.unbindTexture()},this.copyTextureToTexture=function(M,P,q=null,k=null,z=0,de=0){let _e,ue,ye,Se,Oe,Ge,ve,je,Tt,dt=M.isCompressedTexture?M.mipmaps[de]:M.image;if(q!==null)_e=q.max.x-q.min.x,ue=q.max.y-q.min.y,ye=q.isBox3?q.max.z-q.min.z:1,Se=q.min.x,Oe=q.min.y,Ge=q.isBox3?q.min.z:0;else{let vt=Math.pow(2,-z);_e=Math.floor(dt.width*vt),ue=Math.floor(dt.height*vt),M.isDataArrayTexture?ye=dt.depth:M.isData3DTexture?ye=Math.floor(dt.depth*vt):ye=1,Se=0,Oe=0,Ge=0}k!==null?(ve=k.x,je=k.y,Tt=k.z):(ve=0,je=0,Tt=0);let rt=ce.convert(P.format),Vt=ce.convert(P.type),me;P.isData3DTexture?(Z.setTexture3D(P,0),me=U.TEXTURE_3D):P.isDataArrayTexture||P.isCompressedArrayTexture?(Z.setTexture2DArray(P,0),me=U.TEXTURE_2D_ARRAY):(Z.setTexture2D(P,0),me=U.TEXTURE_2D),_.activeTexture(U.TEXTURE0),_.pixelStorei(U.UNPACK_FLIP_Y_WEBGL,P.flipY),_.pixelStorei(U.UNPACK_PREMULTIPLY_ALPHA_WEBGL,P.premultiplyAlpha),_.pixelStorei(U.UNPACK_ALIGNMENT,P.unpackAlignment);let Zt=_.getParameter(U.UNPACK_ROW_LENGTH),qe=_.getParameter(U.UNPACK_IMAGE_HEIGHT),mn=_.getParameter(U.UNPACK_SKIP_PIXELS),On=_.getParameter(U.UNPACK_SKIP_ROWS),mi=_.getParameter(U.UNPACK_SKIP_IMAGES);_.pixelStorei(U.UNPACK_ROW_LENGTH,dt.width),_.pixelStorei(U.UNPACK_IMAGE_HEIGHT,dt.height),_.pixelStorei(U.UNPACK_SKIP_PIXELS,Se),_.pixelStorei(U.UNPACK_SKIP_ROWS,Oe),_.pixelStorei(U.UNPACK_SKIP_IMAGES,Ge);let ys=M.isDataArrayTexture||M.isData3DTexture,it=P.isDataArrayTexture||P.isData3DTexture;if(M.isDepthTexture){let vt=G.get(M),gi=G.get(P),lt=G.get(vt.__renderTarget),_i=G.get(gi.__renderTarget);_.bindFramebuffer(U.READ_FRAMEBUFFER,lt.__webglFramebuffer),_.bindFramebuffer(U.DRAW_FRAMEBUFFER,_i.__webglFramebuffer);for(let vs=0;vs<ye;vs++)ys&&(U.framebufferTextureLayer(U.READ_FRAMEBUFFER,U.COLOR_ATTACHMENT0,G.get(M).__webglTexture,z,Ge+vs),U.framebufferTextureLayer(U.DRAW_FRAMEBUFFER,U.COLOR_ATTACHMENT0,G.get(P).__webglTexture,de,Tt+vs)),U.blitFramebuffer(Se,Oe,_e,ue,ve,je,_e,ue,U.DEPTH_BUFFER_BIT,U.NEAREST);_.bindFramebuffer(U.READ_FRAMEBUFFER,null),_.bindFramebuffer(U.DRAW_FRAMEBUFFER,null)}else if(z!==0||M.isRenderTargetTexture||G.has(M)){let vt=G.get(M),gi=G.get(P);_.bindFramebuffer(U.READ_FRAMEBUFFER,I),_.bindFramebuffer(U.DRAW_FRAMEBUFFER,B);for(let lt=0;lt<ye;lt++)ys?U.framebufferTextureLayer(U.READ_FRAMEBUFFER,U.COLOR_ATTACHMENT0,vt.__webglTexture,z,Ge+lt):U.framebufferTexture2D(U.READ_FRAMEBUFFER,U.COLOR_ATTACHMENT0,U.TEXTURE_2D,vt.__webglTexture,z),it?U.framebufferTextureLayer(U.DRAW_FRAMEBUFFER,U.COLOR_ATTACHMENT0,gi.__webglTexture,de,Tt+lt):U.framebufferTexture2D(U.DRAW_FRAMEBUFFER,U.COLOR_ATTACHMENT0,U.TEXTURE_2D,gi.__webglTexture,de),z!==0?U.blitFramebuffer(Se,Oe,_e,ue,ve,je,_e,ue,U.COLOR_BUFFER_BIT,U.NEAREST):it?U.copyTexSubImage3D(me,de,ve,je,Tt+lt,Se,Oe,_e,ue):U.copyTexSubImage2D(me,de,ve,je,Se,Oe,_e,ue);_.bindFramebuffer(U.READ_FRAMEBUFFER,null),_.bindFramebuffer(U.DRAW_FRAMEBUFFER,null)}else it?M.isDataTexture||M.isData3DTexture?U.texSubImage3D(me,de,ve,je,Tt,_e,ue,ye,rt,Vt,dt.data):P.isCompressedArrayTexture?U.compressedTexSubImage3D(me,de,ve,je,Tt,_e,ue,ye,rt,dt.data):U.texSubImage3D(me,de,ve,je,Tt,_e,ue,ye,rt,Vt,dt):M.isDataTexture?U.texSubImage2D(U.TEXTURE_2D,de,ve,je,_e,ue,rt,Vt,dt.data):M.isCompressedTexture?U.compressedTexSubImage2D(U.TEXTURE_2D,de,ve,je,dt.width,dt.height,rt,dt.data):U.texSubImage2D(U.TEXTURE_2D,de,ve,je,_e,ue,rt,Vt,dt);_.pixelStorei(U.UNPACK_ROW_LENGTH,Zt),_.pixelStorei(U.UNPACK_IMAGE_HEIGHT,qe),_.pixelStorei(U.UNPACK_SKIP_PIXELS,mn),_.pixelStorei(U.UNPACK_SKIP_ROWS,On),_.pixelStorei(U.UNPACK_SKIP_IMAGES,mi),de===0&&P.generateMipmaps&&U.generateMipmap(me),_.unbindTexture()},this.initRenderTarget=function(M){G.get(M).__webglFramebuffer===void 0&&Z.setupRenderTarget(M)},this.initTexture=function(M){M.isCubeTexture?Z.setTextureCube(M,0):M.isData3DTexture?Z.setTexture3D(M,0):M.isDataArrayTexture||M.isCompressedArrayTexture?Z.setTexture2DArray(M,0):Z.setTexture2D(M,0),_.unbindTexture()},this.resetState=function(){V=0,X=0,j=null,_.reset(),fe.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return Rn}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(e){this._outputColorSpace=e;let t=this.getContext();t.drawingBufferColorSpace=Be._getDrawingBufferColorSpace(e),t.unpackColorSpace=Be._getUnpackColorSpace()}};var yc=`
  float mapHash(vec2 p){return fract(sin(dot(p,vec2(127.1,311.7)))*43758.5453);}
  float mapNoise(vec2 p){vec2 i=floor(p),f=fract(p);f=f*f*(3.-2.*f);return mix(mix(mapHash(i),mapHash(i+vec2(1.,0.)),f.x),mix(mapHash(i+vec2(0.,1.)),mapHash(i+vec2(1.,1.)),f.x),f.y);}
  vec3 mapRelief(vec3 n,vec3 p,float height){vec3 px=dFdx(p),py=dFdy(p),a=cross(py,n),b=cross(n,px);float det=dot(px,a);return normalize(abs(det)*n-sign(det)*(dFdx(height)*a+dFdy(height)*b));}
`;var gd=new Set,ig=null;function fo(i=1,e="#d4c4a0"){let t=new kt({vertexColors:!0,roughness:.94}),n={value:null};return gd.add(n),t.addEventListener("dispose",()=>gd.delete(n)),n.value=ig,t.onBeforeCompile=s=>{s.uniforms.uSeabedDetail=n,s.uniforms.uTerrainScale={value:i},s.uniforms.uGroundSand={value:new pe(e)},s.vertexShader=`varying vec3 vGround;uniform float uTerrainScale;
`+s.vertexShader.replace("#include <begin_vertex>",`#include <begin_vertex>
vGround=(modelMatrix*vec4(position,1.)).xyz*uTerrainScale;`),s.fragmentShader=`varying vec3 vGround;uniform sampler2D uSeabedDetail;uniform vec3 uGroundSand;
`+yc+s.fragmentShader.replace("#include <color_fragment>",`#include <color_fragment>
      diffuseColor.rgb=mix(uGroundSand,diffuseColor.rgb,smoothstep(.22,.70,vGround.y));
      diffuseColor.rgb=mix(diffuseColor.rgb,vec3(.337,.377,.25),(1.-smoothstep(-.05,.38,vGround.y))*.36);
      float grain=mapNoise(vGround.xz*35.);
      float mottling=mapNoise(vGround.xz*2.2)*.65+mapNoise(vGround.xz*7.1)*.35;
      diffuseColor.rgb*=.90+mottling*.18+(grain-.5)*.04;
      // Tidewater Terrain.js seabed layers, scaled for the map: pale ripple
      // fields, ragged seagrass meadows and dark algae-covered rubble heads.
      // The same mipmapped detail lookup as the ocean keeps distant grain stable.
      vec2 bedUv=vGround.xz;mat2 bedTurn=mat2(.76,-.65,.65,.76);
      vec4 bedMacro=texture2D(uSeabedDetail,bedTurn*bedUv/19.7+.23);
      vec4 bedMedium=texture2D(uSeabedDetail,bedUv/5.3+.61);
      vec4 bedFine=texture2D(uSeabedDetail,bedTurn*bedUv/1.7+.47);
      float under=smoothstep(.08,.55,-vGround.y);
      float meadow=smoothstep(.46,.56,bedMacro.r*.78+bedMedium.a*.22+(bedFine.r-.5)*.12)*smoothstep(.24,.8,-vGround.y);
      float rubble=smoothstep(.52,.62,bedMacro.a*.70+bedMedium.r*.30+(bedFine.g-.5)*.13)*under;
      vec3 seabed=mix(vec3(.67,.56,.38),vec3(.42,.44,.32),smoothstep(.5,5.,-vGround.y));
      seabed*=.82+bedMedium.a*.30+(bedFine.r-.5)*.22;
      vec3 seagrass=mix(vec3(.019,.029,.012),vec3(.056,.070,.028),bedFine.a);
      seabed=mix(seabed,seagrass,meadow*.93);
      vec3 reef=mix(vec3(.043,.046,.030),vec3(.115,.105,.069),bedFine.g);
      reef=mix(reef,vec3(.18,.085,.094),smoothstep(.69,.83,bedMedium.g)*.3);
      seabed=mix(seabed,reef,rubble*.88);
      float ripplePhase=dot(bedUv,vec2(.81,.59))*37.+bedMedium.r*15.;
      float rippleFade=1.-smoothstep(.5,2.,fwidth(ripplePhase));
      float ripple=(sin(ripplePhase)*.5+.5)*rippleFade;
      seabed*=1.+(ripple-.5)*.12*(1.-meadow)*(1.-rubble);
      diffuseColor.rgb=mix(diffuseColor.rgb,seabed,under);
    `),s.fragmentShader=s.fragmentShader.replace("#include <normal_fragment_maps>",`#include <normal_fragment_maps>
      float relief=mapNoise(vGround.xz*9.)*.012+mapNoise(vGround.xz*29.)*.003;
      relief+=under*(rubble*(bedFine.g*.036+bedMedium.r*.03)+meadow*bedFine.a*.025+ripple*.009*(1.-meadow));
      normal=mapRelief(normal,-vViewPosition,relief);
    `).replace("#include <roughnessmap_fragment>",`#include <roughnessmap_fragment>
      roughnessFactor=mix(.63,.97,smoothstep(-.1,.3,vGround.y));
    `)},t.userData.terrain=!0,t.userData.sandColor=e,t.customProgramCacheKey=()=>"threetopia-ground-v3",t}var _d={value:0},c0=i=>{_d.value=i};function a0(i,e,t){return["leaves","engine"].includes(e)&&(i.onBeforeCompile=n=>{n.uniforms.uHostTime=_d,n.uniforms.uHostScale={value:t},n.vertexShader=`uniform float uHostTime;uniform float uHostScale;
`+n.vertexShader.replace("#include <begin_vertex>",`#include <begin_vertex>
   vec3 hp=position*uHostScale;
   ${e==="leaves"?"transformed.x+=sin(uHostTime*1.15+hp.z*.67)*smoothstep(.45,2.9,hp.y)*.018/uHostScale;transformed.z+=cos(uHostTime*.81+hp.x*.5)*smoothstep(.5,3.1,hp.y)*.012/uHostScale;":"transformed.y+=sin(uHostTime*1.7+hp.y*3.2+hp.x*.3)*.055/uHostScale;"}
  `)},i.customProgramCacheKey=()=>`host-motion-1-${e}`),i}function l0(i,e=1){return i==="leaves"?a0(new ts({depthPacking:Bl}),i,e):void 0}function h0(i,e=1,t="#d4c4a0"){if(i==="terrain")return fo(e,t);let n=new kt({vertexColors:!0,roughness:i==="metal"?.64:.91,metalness:i==="metal"?.28:0,side:i==="leaves"?on:vn,flatShading:i==="stone"});return n.userData.hostSurface={kind:i,scale:e,sand:t},i==="neon"||i==="engine"?(n.emissive.set("#0e95cb"),n.emissiveIntensity=1.7,n.toneMapped=!1,a0(n,i,e)):i==="leaves"||i==="flowers"?a0(n,i,e):(n.onBeforeCompile=s=>{s.uniforms.uHostScale={value:e},s.vertexShader=`varying vec3 vHostPoint;uniform float uHostScale;
`+s.vertexShader.replace("#include <begin_vertex>",`#include <begin_vertex>
vHostPoint=position*uHostScale;`),s.fragmentShader=`varying vec3 vHostPoint;
`+yc+s.fragmentShader;let r="float fleck=mapNoise(vHostPoint.xz*26.);diffuseColor.rgb*=.93+fleck*.12;";i==="stone"&&(r+="float strata=mapNoise(vec2(vHostPoint.x*.55+vHostPoint.z*.31,vHostPoint.y*8.));diffuseColor.rgb*=.87+strata*.23;"),i==="paving"&&(r+="vec2 p=vHostPoint.xz*3.0;vec2 f=fract(p);vec2 aa=max(fwidth(p),vec2(.006));vec2 seam=smoothstep(vec2(.015),vec2(.015)+aa,min(f,1.-f));diffuseColor.rgb*=.86+.14*min(seam.x,seam.y);"),i==="wood"&&(r+="float grain=mapNoise(vec2(vHostPoint.x*5.,vHostPoint.z*45.));diffuseColor.rgb*=.86+.26*grain;"),i==="metal"&&(r+="vec2 p=vHostPoint.xz*1.65;vec2 f=fract(p);vec2 aa=max(fwidth(p),vec2(.003));vec2 seam=smoothstep(vec2(.008),vec2(.008)+aa,min(f,1.-f));diffuseColor.rgb*=.80+.20*min(seam.x,seam.y);"),s.fragmentShader=s.fragmentShader.replace("#include <color_fragment>",`#include <color_fragment>
`+r)},n.customProgramCacheKey=()=>`host-kit-1-${i}`,n)}var vc=class{constructor(e){this.worker=e;e.onmessage=({data:t})=>{let n=this.active;!n||t.id!==n.id||(this.active=void 0,t.error?n.reject(new Error(t.error)):n.resolve(t.result),this.startQueued())},e.onerror=t=>{t.preventDefault(),this.failure=new Error(t.message||"Tile preparation failed."),this.active?.reject(this.failure),this.queued?.reject(this.failure),this.active=this.queued=void 0,e.terminate()}}worker;sequence=0;active;queued;disposed=!1;failure;startQueued(){this.active||!this.queued||this.disposed||(this.active=this.queued,this.queued=void 0,this.worker.postMessage({id:this.active.id,input:this.active.input}))}run(e){return this.disposed?Promise.resolve(null):this.failure?Promise.reject(this.failure):(this.cancel(),new Promise((t,n)=>{this.queued={id:++this.sequence,input:e,resolve:t,reject:n},this.startQueued()}))}cancel(){this.active?.resolve(null),this.queued?.resolve(null),this.queued=void 0}dispose(){this.disposed=!0,this.cancel(),this.worker.terminate(),this.active=void 0}};var Mc={edges:{"259.808,-150.000|259.808,150.000":[-38.574035820085825,-36.87525797733441,-32.05070804015839,-27.33601681991266,-22.646368812487104,-16.758270502393145,-9.22351936451508,.4405877075135697,9.343606431944156,16.39513142189196,21.633014287290624,23.91769116795614,23.9427399266102,23.51168644824598,22.761245261289236,22.161295476315246,20.829316483107146,19.163916777125383,16.22237103493293,12.361160697131861,7.4611313534073656,1.9032226181713223,-4.0790483856121424,-11.175680022441686,-16.853615696564006],"0.000,300.000|259.808,150.000":[-45.576167434219116,-41.29791460751111,-37.962403287359635,-35.13630791919802,-32.39045891317491,-29.409872257620922,-26.066207590185897,-22.45472729369619,-18.921403234052885,-15.929337774088026,-13.868819120968942,-11.97456355689539,-9.468100916987451,-6.950955649951082,-4.8540996935105465,-3.5657207950784198,-3.432518207307389,-4.381892162259801,-6.694510740274792,-10.583201213673732,-14.757449604913475,-19.305226775093175,-24.764280547562894,-28.058020072737005,-16.853615696564006],"-259.808,150.000|0.000,300.000":[-36.08492383172995,-29.66986957245451,-23.103923035347762,-16.852388236335734,-11.110236316135355,-4.8542011610292,.2701092273652487,4.295549885866379,6.750259176963111,8.112991407268666,9.383202520969114,10.39957261898857,10.607166617715613,9.589193436474908,6.870084792771003,2.803573222180411,-3.71787358999575,-11.661139783882687,-17.444462883174815,-23.099129920030435,-28.25515729506396,-32.79469716720609,-36.926318672439315,-41.042131402368774,-45.576167434219116],"-259.808,-150.000|-259.808,150.000":[-42.99174944811064,-53.568142022564246,-48.4885318777866,-43.559657369817316,-38.9942204267399,-35.00930021220974,-31.624553631354146,-28.84707970345204,-26.66689431147713,-25.053469716368326,-23.95875787471257,-23.34255012685477,-23.151213472859133,-22.307567741045514,-20.166423582614062,-17.299835913644895,-14.329330925517189,-11.763127217821179,-9.614766920585065,-9.495144941866823,-12.235351213454967,-16.895600151231232,-22.69419830052956,-29.13823912526521,-36.08492383172995],"-0.000,-300.000|-259.808,-150.000":[-28.626291310167556,-27.74657286543049,-19.99080495896338,-12.57091200113809,-4.037995580725292,2.593563445477365,7.07764182943856,9.70364746363052,11.928034406824572,13.334217305629892,-2.079720708868453,-19.872916048634497,-20.16817037838384,-20.00402751672805,-19.343595840191046,-18.80498694518759,-18.87562708319012,-19.233253757178304,-19.798255763360533,-20.378065063897093,-20.977369746972368,-24.27167533469573,-31.02203825039715,-38.13266256470129,-42.99174944811064],"-0.000,-300.000|259.808,-150.000":[-28.626291310167556,-21.41656030838893,-14.750561151126895,-8.039610206548769,-2.01252744399613,2.1011648730146013,4.290991987384629,4.598734031973706,2.9384615739374453,1.411224498013297,.8223766533858405,.15689725500642737,-.42411671778050203,-1.2985966415073473,-2.6801107116839993,-4.82379983517068,-7.786369597384517,-11.226381385607453,-14.141505745469967,-17.401851173159066,-20.883502609652698,-24.396861107004085,-28.331872428902887,-33.00370941620455,-38.574035820085825],"779.423,-150.000|779.423,150.000":[-43.204219016807066,-43.29372759786061,-43.33333333333336,-43.33333333333336,-43.33333333333336,-43.33333333333336,-43.33333333333336,-43.33333333333336,-43.33333333333336,-43.33333333333336,-43.33333333333336,-43.33333333333336,-43.33333333333336,-43.33333333333336,-43.33333333333336,-43.33333333333336,-43.33333333333336,-43.33333333333336,-43.33333333333336,-43.33333333333336,-43.33333333333336,-43.33333333333336,-43.33333333333336,-43.24558681409497,-42.88491710743111],"519.615,300.000|779.423,150.000":[-43.333398955737756,-43.33333333333336,-43.33333333333336,-43.33333333333336,-43.33333333333336,-43.33333333333336,-43.33333333333336,-43.33333333333336,-43.33333333333336,-43.33333333333336,-43.33333333333336,-43.33333333333336,-43.33333333333336,-43.33333333333336,-43.33333333333336,-43.33333333333336,-43.33333333333336,-43.33333333333336,-43.33333333333336,-43.33333333333336,-43.33333333333336,-43.33333333333336,-43.33333333333336,-43.29902400807709,-42.88491710743111],"259.808,150.000|519.615,300.000":[-16.853615696564006,-11.95897508049549,-7.402668062657429,-6.422945694501436,-8.510889112103115,-13.273976726041425,-20.093668273087378,-28.37018058501831,-36.22155784117822,-41.65790893028998,-43.33333333333336,-43.33333333333336,-43.33333333333336,-43.33333333333336,-43.33333333333336,-43.33333333333336,-43.33333333333336,-43.33333333333336,-43.33333333333336,-43.33333333333336,-43.33333333333336,-43.33333333333336,-43.33333333333336,-43.33333333333336,-43.333398955737756],"259.808,-150.000|519.615,-300.000":[-38.574035820085825,-31.22091375642177,-24.2914665370049,-19.409749230619454,-16.697409776126726,-15.626103285774267,-15.662136081761169,-15.294856090407787,-13.662488207943529,-10.656356187693147,-7.027507111536539,-4.026895995991827,-.342150860359484,3.643719358311278,7.80542775774998,12.733560762420975,16.492782777606745,17.630053041084835,16.092020521845996,13.330584593988348,10.282196035780208,7.903017158979017,5.2305537210690645,1.3179982450135224,-3.7443605064389374],"519.615,-300.000|779.423,-150.000":[-3.7443605064389374,-2.477364818947218,2.113607016897194,6.133018453705219,10.087662088767443,14.105447016599134,17.917337991905434,20.421322302977174,21.36617957550081,21.996561048198636,21.230271658784616,19.38051198500137,15.634784111092811,9.8680861397409,.506502989043689,-10.16385160724802,-20.278857512054554,-28.718585167263083,-34.566601573484235,-38.29819232041748,-40.83798103081484,-42.51248892807193,-43.272736132206546,-43.31951584316792,-43.204219016807066],"0.000,-300.000|0.000,-600.000":[-28.626291310167556,-23.626887323364976,-16.701103621534646,16.30302049090986,25.33333333333333,25.33333333333333,25.33333333333333,25.33333333333333,25.33333333333333,25.845369975381338,27.535907251189983,26.7739205335016,26.18819036899621,25.68930617804674,21.806520742800295,16.234600493915607,10.932204295974834,5.791359331014867,.9978246200675519,-4.593850794239707,-11.746553343758492,-18.360497136647602,-25.803979738955363,-33.539144191181336,-41.22068171004791],"-259.808,-150.000|0.000,-300.000":[-42.99174944811064,-38.13266256470129,-31.022038250397088,-24.27167533469573,-20.977369746972368,-20.378065063897093,-19.798255763360533,-19.233253757178304,-18.87562708319012,-18.80498694518759,-19.343595840191046,-20.00402751672805,-20.16817037838384,-19.872916048634497,-2.0797207088683933,13.334217305629892,11.928034406824514,9.70364746363052,7.07764182943856,2.5935634454772467,-4.03799558072541,-12.57091200113815,-19.990804958963437,-27.746572865430608,-28.626291310167556],"-259.808,-150.000|-519.615,-300.000":[-42.99174944811064,-36.5564955238004,-30.58864680743264,-25.25469059382027,-20.59694266339,-16.758165505450034,-13.428954306206661,-9.6873659035154,-5.298569517624507,-1.1317292060680255,2.5700659833518698,6.3735643832096995,10.631692966102513,14.12885831706768,15.499093789871962,14.951191416852202,12.153722424745558,8.950506838180655,6.605045533226554,4.496680737828029,1.96641031859901,-.591113175917298,-4.095454275131338,-8.760805063811716,-13.646666577877772],"-519.615,-300.000|-519.615,-600.000":[-13.646666577877772,-4.530298645436659,.8504229192390393,3.397811758726673,4.177815951837971,3.1807440438261856,1.2096159760921785,-.5262941568357012,-1.4660403864899862,-1.343717782367667,1.1401178577013837,5.800686719953123,11.896551443149939,18.576972489228066,23.86007015810551,27.2672300886392,28.567824779319416,27.70639909145262,24.619592756311626,17.78388801418919,6.476681641421619,-8.116369272574708,-21.28209460214959,-33.980306443577454,-45.61017505953551],"-259.808,-750.000|-519.615,-600.000":[-26.437609309157217,-20.707124714725644,-19.57635193824032,-19.33780653173424,-19.41629733489254,-19.687544832251962,-19.970133795576633,-20.064367384394487,-19.9709687596742,-19.74558505031515,-19.348314952879107,-13.781024450641748,-5.746105166782082,-.06904952295041511,.3481787980218106,.0004298285710172915,-2.3139743531329415,-6.63435443067583,-12.197700041537434,-17.494790595738507,-23.901285294384305,-30.609326766358674,-36.617817380931626,-41.65052486817557,-45.61017505953551],"-259.808,-750.000|0.000,-600.000":[-26.437609309157217,-27.0439509550832,-23.900745934830603,-20.10701043974752,-16.29825861147681,-12.19194099584821,-7.574889118764598,-4.129039778154938,-2.055400933348099,-1.105480267807124,-1.4877073784214545,-3.312934205288028,-5.401685195740728,-7.794282439143234,-10.206121960032752,-12.115331312339883,-13.963577377563396,-16.540569160388095,-19.858569913858425,-23.85496461945683,-28.258511718807533,-32.78715012370128,-37.51126405761453,-42.44271261727401,-41.22068171004791],"519.615,-300.000|519.615,-600.000":[-3.7443605064389374,5.818317014955869,11.294805925511339,15.22351669300613,18.608942375435333,19.778780649800492,19.07209438840821,18.72885352228456,18.956037168457307,19.942132975749754,21.62678173879448,22.673305265650317,23.86839115301663,24.360100092814463,24.484400822084496,24.625626850796856,23.415043488422427,21.91876776364475,20.66565521004448,18.902281621612303,15.751751659764917,9.914044497519944,1.5294743426197854,-8.636783511977402,-17.301421520028804],"0.000,-300.000|259.808,-150.000":[-28.626291310167556,-21.41656030838887,-14.750561151126837,-8.03961020654865,-2.0125274439960705,2.1011648730146013,4.290991987384629,4.598734031973706,2.9384615739374453,1.411224498013297,.8223766533858405,.15689725500642737,-.42411671778050203,-1.2985966415073473,-2.6801107116839993,-4.82379983517068,-7.786369597384517,-11.226381385607453,-14.141505745469967,-17.401851173159066,-20.883502609652698,-24.396861107004085,-28.331872428902887,-33.00370941620455,-38.574035820085825],"0.000,-600.000|259.808,-750.000":[-41.22068171004791,-36.05538704419497,-31.075049128115083,-26.34348051427201,-21.926671825449223,-17.684663524394395,-13.34584539904847,-7.742424237679954,-1.3796190780373863,4.146446620069237,8.240282010703126,12.08542991600492,14.96731517739279,16.044134473220122,14.290504481219202,10.601834451954359,4.52814522142635,-4.575010475682184,-14.242634819498731,-20.922441383326234,-25.61970918557357,-28.819339021982003,-30.86604243886093,-32.42556095003859,-34.20755179987219],"259.808,-750.000|519.615,-600.000":[-34.20755179987219,-25.863896794482066,-17.638841742672305,-9.81455696507562,-1.8132114229138927,3.3200598062750926,6.430914980713354,8.67392021490545,10.292403164628777,11.116347372481469,12.400092710775706,12.812756051601209,11.53780042531724,9.487030303732524,6.836579747659796,3.6074760760013667,.2542967562506012,-2.6358173665620654,-4.257889058984254,-4.974913543380903,-5.939864685307169,-7.766029044983055,-10.102845934392413,-13.106761496898045,-17.301421520028804]},vertices:{"259.808,-150.000":-38.574035820085825,"259.808,150.000":-16.853615696564006,"0.000,300.000":-45.576167434219116,"-259.808,150.000":-36.08492383172995,"-259.808,-150.000":-42.99174944811064,"-0.000,-300.000":-28.626291310167556,"779.423,-150.000":-43.204219016807066,"779.423,150.000":-42.88491710743111,"519.615,300.000":-43.333398955737756,"519.615,-300.000":-3.7443605064389374,"0.000,-600.000":-41.22068171004791,"0.000,-300.000":-28.626291310167556,"-519.615,-300.000":-13.646666577877772,"-519.615,-600.000":-45.61017505953551,"-259.808,-750.000":-26.437609309157217,"519.615,-600.000":-17.301421520028804,"259.808,-750.000":-34.20755179987219}};async function hr(i){let e=await crypto.subtle.digest("SHA-256",typeof i=="string"?new TextEncoder().encode(i):i);return Array.from(new Uint8Array(e),t=>t.toString(16).padStart(2,"0")).join("")}var rg=1,fi=300,ut=.03,ki=Object.freeze({radius:190,height:480,floorY:24,mapRadius:5.7,mapHeight:14.4}),Wn=[[1,0],[0,1],[-1,1],[-1,0],[0,-1],[1,-1]],pn=[{q:0,r:0,title:"Lagoon",id:"lagoon"},{q:1,r:0,title:"Tidewater",id:"tidewater",requiredOpenWater:[{id:"whale",reason:"Kept clear for Tidewater\u2019s whale.",oceanConnected:!0,cells:[{q:1,r:0},{q:0,r:1}]}]},{q:0,r:-1,title:"Sakura",id:"sakura"},{q:1,r:-1,title:"Punk",id:"punk"}],og=[["dunes","Dunes","#d6bb80",20],["oasis","Oasis","#c6b87c",12],["coast","Coast","#cbbf96",9],["pine","Pine coast","#65856c",32],["meadow","Meadow","#86a869",13],["highland","Highland","#8c947d",48],["volcanic","Volcanic","#666d76",44],["canyon","Canyon","#b88463",34],["tundra","Tundra","#b5c8c6",25],["blossom","Blossom","#afbc87",18],["wetland","Wetland","#7d9f83",10],["basalt","Basalt","#788c94",38]],bc=og.flatMap(([i,e,t,n],s)=>Array.from({length:12},(r,o)=>({id:`${i}-${String(o+1).padStart(2,"0")}`,family:i,title:`${e} ${String(o+1).padStart(2,"0")}`,color:t,relief:n,seed:s*97+o*13+7,ridges:2+o%4,orientation:o*Math.PI/6,description:["Sheltered terraces","Low rolling banks","Split ridge","Scattered rocky outcrops"][o%4]}))),zi=(i,e)=>Math.max(Math.abs(i),Math.abs(e),Math.abs(i+e)),Mn=(i,e,t=1)=>({x:Math.sqrt(3)*fi*(i+e/2)*t,z:1.5*fi*e*t});function Xn(i,e,t){if(!Number.isInteger(i)||!Number.isInteger(e)||zi(i,e)>99)throw Error("Invalid tile coordinate.");let n=bc.find(s=>s.id===t);if(!n)throw Error("Unknown tile variant.");return{version:rg,q:i,r:e,variant:t,radius:fi,slot:{...ki},mapScale:ut,boundaries:ag(i,e),edges:Wn.map(([s,r])=>[`${i},${e}`,`${i+s},${e+r}`].sort().join("|")),recipe:{...n}}}var u0=i=>JSON.stringify(i,(e,t)=>t&&typeof t=="object"&&!Array.isArray(t)?Object.fromEntries(Object.keys(t).sort().map(n=>[n,t[n]])):t);function Yt(i=fi){return Array.from({length:6},(e,t)=>{let n=(t*60-30)*Math.PI/180;return[Math.cos(n)*i,Math.sin(n)*i]})}function ag(i,e){let t=Mn(i,e),n=Yt(),s=(r,o)=>`${r.toFixed(3)},${o.toFixed(3)}`;return n.map((r,o)=>{let a=n[(o+1)%6],c=s(r[0]+t.x,r[1]+t.z),l=s(a[0]+t.x,a[1]+t.z),h=Mc.edges[[c,l].sort().join("|")];if(h)return c<l?[...h]:[...h].reverse();let d=Mc.vertices[c]??ki.floorY,u=Mc.vertices[l]??ki.floorY;return Array.from({length:25},(p,g)=>ki.floorY+(d-ki.floorY)*Math.max(0,1-g/6)+(u-ki.floorY)*Math.max(0,1-(24-g)/6))})}var vd={dunes:{title:"Dunes",land:"#c9ad78",sand:"#ebd49f",rock:"#a39176",path:"#e9dac0"},oasis:{title:"Oasis",land:"#9aa778",sand:"#dccb99",rock:"#9a9c83",path:"#e3cf9d"},coast:{title:"Coast",land:"#9ba884",sand:"#e1d0ab",rock:"#87928d",path:"#e8d9b8"},pine:{title:"Pine",land:"#648674",sand:"#c9c5a7",rock:"#7f9390",path:"#d0c6a4"},meadow:{title:"Meadow",land:"#92aa7d",sand:"#d8cbaa",rock:"#909b89",path:"#e0ccaa"},highland:{title:"Highland",land:"#899783",sand:"#c6c2ac",rock:"#899394",path:"#d0c6b1"},volcanic:{title:"Volcanic",land:"#59666a",sand:"#87887b",rock:"#657074",path:"#b0a68e"},canyon:{title:"Canyon",land:"#ba8d70",sand:"#d6b18a",rock:"#a57d69",path:"#e0be92"},tundra:{title:"Tundra",land:"#b4c7be",sand:"#cbd0bf",rock:"#8d9fa0",path:"#e1deca"},blossom:{title:"Blossom",land:"#96ab8b",sand:"#d4c9b2",rock:"#8c9d93",path:"#d9c0ae"},wetland:{title:"Wetland",land:"#7a9b86",sand:"#b9b79a",rock:"#7e9690",path:"#cec7aa"},basalt:{title:"Basalt",land:"#718784",sand:"#aaa996",rock:"#667d83",path:"#c4bdad"},urban:{title:"Urban",land:"#8d9995",sand:"#bdbaa8",rock:"#75848a",path:"#cdd0c4"},industrial:{title:"Industrial",land:"#727e80",sand:"#aeb09f",rock:"#536971",path:"#bac3bc"},scifi:{title:"Sci-fi",land:"#334c59",sand:"#829b9d",rock:"#253f4d",path:"#91aeb4"}},Md=[{id:"commons",title:"Open commons",description:"A connected path around one generous building green.",wet:[],rivers:[],regions:[[0,0,140]],styles:["meadow","pine","blossom","tundra"]},{id:"pass",title:"Mountain pass",description:"A sheltered building terrace between two rocky ridges.",wet:[],rivers:[],regions:[[0,0,105]],styles:["highland","canyon","volcanic","basalt"]},{id:"oasis",title:"Oasis basin",description:"A crescent pool with a dry terrace along its western bank.",wet:[],rivers:[],regions:[[-55,0,108]],styles:["dunes","oasis"]},{id:"river",title:"River crossing",description:"A broad river, two building banks and connected footbridges.",wet:[],rivers:[0,3],regions:[[0,-116,62],[0,116,62]],styles:["meadow","blossom","pine"]},{id:"bend",title:"River bend",description:"A curved channel around a sheltered inner-bank building area.",wet:[],rivers:[0,2],regions:[[-55,-73,88]],styles:["blossom","wetland","oasis"]},{id:"fork",title:"River confluence",description:"Three channels meet between three small building terraces.",wet:[],rivers:[0,2,4],regions:[[62,-107,48],[62,107,48],[-124,0,48]],styles:["wetland","pine","tundra"]},{id:"estuary",title:"River mouth",description:"An inland river opens into the sea between two banks.",wet:[0,1],rivers:[3],regions:[[-25,-126,55],[-25,126,55]],styles:["coast","wetland","basalt"]},{id:"headland",title:"Headland",description:"A broad headland with beaches on two sea-facing sides.",wet:[0,1,2],rivers:[],regions:[[-60,-35,112]],styles:["coast","pine","volcanic"]},{id:"bay",title:"Sheltered bay",description:"A curved sandy inlet beside a compact building terrace.",wet:[0,1],rivers:[],regions:[[-76,0,98]],styles:["coast","dunes","oasis"]},{id:"harbor",title:"Harbor basin",description:"A sheltered water basin framed by stone quays and a promenade.",wet:[0,1],rivers:[],regions:[[-85,0,90]],styles:["urban","industrial","basalt"]},{id:"canal",title:"Canal quarter",description:"A straight canal, paved banks and two bridge-connected plots.",wet:[],rivers:[0,3],regions:[[0,-118,60],[0,118,60]],styles:["urban","industrial","scifi"]},{id:"skyport",title:"Floating platform",description:"A suspended deck with approach bridges and cyan support rings.",wet:[],rivers:[],regions:[[0,0,120]],styles:["scifi","industrial"]}],lg=Md.flatMap(i=>i.styles.map(e=>({id:`${i.id}-${e}`,layout:i.id,family:e,title:i.title,color:vd[e].land,description:i.description,orientation:0}))),Sc=Yt(),hg=i=>Math.max(0,Math.min(1,i)),xd=i=>(i=hg(i),i*i*(3-2*i)),ug=(i,e)=>{let t=e*Math.PI/3,n=Math.cos(t),s=Math.sin(t);return[i[0]*n-i[1]*s,i[0]*s+i[1]*n]};var dg=i=>`${i.q},${i.r}`,ps=i=>Math.round(i*1e6)/1e6;function fg(i,e,t){let n=i!==e?"shore":i==="water"?"sea":t?"river":"land",s=Array.from({length:25},(r,o)=>{let a=o/24;if(n==="land")return 24;if(n==="sea")return-40;if(n==="river")return ps(24-56*(1-xd((Math.abs(a-.5)*300-33)/26)));let c=i==="land"?a:1-a;return ps(24-64*xd((c-.28)/.44))});return{kind:n,start:i,end:e,samples:s,waterY:0,ports:n==="land"?[{kind:"path",t:.5,width:22,y:24}]:n==="shore"?[{kind:"path",t:i==="land"?.18:.82,width:22,y:24}]:[],...n==="river"?{channel:{t:.5,width:66,bedY:-32}}:{}}}var po=new Map;function pg(i,e){let t=dg({q:i,r:e});if(po.has(t))return po.get(t);let n=Mn(i,e),s=Sc.map(r=>{for(let o of pn){let a=Mn(o.q,o.r);for(let c=0;c<6;c++)if(Math.hypot(a.x+Sc[c][0]-n.x-r[0],a.z+Sc[c][1]-n.z-r[1])<.001)return Xn(o.q,o.r,"coast-01").boundaries[c][0]}return null});return po.size>512&&po.clear(),po.set(t,s),s}function bd(i,e,t,n=0,s=[]){if(!Number.isInteger(i)||!Number.isInteger(e)||zi(i,e)>99)throw Error("Invalid tile coordinate.");if(!Number.isInteger(n)||n<0||n>5)throw Error("Rotation must be 0\u20135.");if(!Array.isArray(s)||s.some(f=>!Number.isInteger(f)||f<0||f>5))throw Error("Invalid legacy adapters.");let r=lg.find(f=>f.id===t);if(!r)throw Error("Unknown tile variant.");let o=Md.find(f=>f.id===r.layout),a=new Set(o.wet.map(f=>(f+n)%6)),c=new Set(o.rivers.map(f=>(f+n)%6)),l=Xn(i,e,"coast-01"),h=[...new Set([...s,...Wn.flatMap(([f,v],T)=>pn.some(y=>y.q===i+f&&y.r===e+v)?[T]:[])])].sort(),d=Sc.map((f,v)=>fg(a.has(v)?"water":"land",a.has((v+1)%6)?"water":"land",c.has(v)));for(let f of h){let v=l.boundaries[f],T=v.map((S,w)=>({y:S,j:w})).filter(S=>S.y>8&&S.j>2&&S.j<22),y=T.sort((S,w)=>Math.abs(S.j-12)-Math.abs(w.j-12))[0];d[f]={kind:"legacy",start:v[0]>0?"land":"water",end:v[24]>0?"land":"water",samples:[...v],waterY:0,ports:y?[{kind:"path",t:y.j/24,width:18,y:y.y}]:[]}}let u=[...pg(i,e)];for(let f of h)u[f]=d[f].samples[0],u[(f+1)%6]=d[f].samples[24];for(let f=0;f<6;f++)if(!h.includes(f))for(let[v,T]of[[0,f],[24,(f+1)%6]]){if(u[T]===null)continue;let y=u[T]-d[f].samples[v];for(let S=0;S<=4;S++)d[f].samples[v===0?S:24-S]=ps(d[f].samples[v===0?S:24-S]+y*(1-S/5));d[f].samples[v]=u[T]}let p=o.regions.map(([f,v,T])=>{let y=ug([f,v],n);return{x:ps(y[0]),z:ps(y[1]),radius:T}}),g=o.id==="skyport"?36:24,b={x:p[0].x,y:g,z:p[0].z},m=Math.max(...p.map(f=>Math.hypot(f.x-b.x,f.z-b.z)+f.radius));return{version:2,q:i,r:e,variant:t,rotation:n,legacyEdges:h,radius:fi,mapScale:ut,recipe:{...r},slot:{origin:b,regions:p,radius:ps(m),height:480,floorY:g,mapRadius:ps(m*ut),mapHeight:14.4},edges:d,boundaries:d.map(f=>f.samples),connections:{path:"connected",water:o.rivers.length?"connected":o.wet.length?"sea":"enclosed",waterY:0}}}var Sd={version:1,kind:"sampled-tile-surface",source:{world:"lagoon",revision:"index-BjH0GYGf",origin:[-8,0,-2],scale:.1077134479080076},size:101,step:.25851227497921825,x0:-12.925613748960913,z0:-12.925613748960913,heights:[1.2245,1.1809,1.1463,1.1436,1.2036,1.2633,1.2853,1.3481,1.4246,1.4159,1.3614,1.3113,1.3005,1.3196,1.381,1.4005,1.2876,1.2203,1.163,1.132,1.1272,1.1748,1.2083,1.2059,1.1335,1.0925,1.1306,1.1741,1.1523,1.2105,1.2724,1.3503,1.3409,1.271,1.2469,1.2176,1.2273,1.2473,1.2735,1.2689,1.22,1.2207,1.2357,1.168,1.1302,1.1176,1.1693,1.2682,1.331,1.3321,1.2914,1.2827,1.296,1.2497,1.1864,1.1182,1.1367,1.1871,1.2027,1.2271,1.2816,1.3541,1.2392,1.215,1.2233,1.2472,1.2032,1.1525,1.1515,1.1888,1.2364,1.2028,1.1864,1.1726,1.1328,1.1412,1.1692,1.1965,1.2457,1.292,1.2805,1.3071,1.3857,1.4321,1.4372,1.4408,1.4339,1.4019,1.3617,1.2827,1.225,1.1886,1.1911,1.2169,1.2663,1.2795,1.2975,1.3222,1.3091,1.3083,1.3201,1.2251,1.1603,1.1247,1.1531,1.2168,1.2582,1.2647,1.3109,1.4002,1.4367,1.4037,1.3539,1.3304,1.3286,1.398,1.3815,1.2792,1.1943,1.1383,1.1241,1.1387,1.199,1.238,1.2253,1.201,1.168,1.168,1.0931,1.1092,1.193,1.2366,1.3201,1.3081,1.2638,1.2353,1.2146,1.2078,1.1882,1.1959,1.1994,1.1699,1.1565,1.1423,1.1256,1.121,1.1287,1.1859,1.2916,1.3541,1.3117,1.2626,1.2751,1.275,1.2181,1.1623,1.1254,1.1578,1.191,1.1758,1.2138,1.2524,1.2995,1.2804,1.2514,1.2792,1.3043,1.2503,1.1619,1.1488,1.1657,1.2174,1.1956,1.1673,1.1401,1.1397,1.1513,1.163,1.181,1.2129,1.253,1.2328,1.3065,1.4213,1.4409,1.4065,1.3523,1.31,1.2834,1.2622,1.2264,1.1654,1.1683,1.1491,1.1932,1.2426,1.2597,1.3063,1.3508,1.3437,1.3205,1.3072,1.2392,1.2067,1.1889,1.1847,1.1954,1.2688,1.3192,1.3074,1.3655,1.4322,1.3948,1.3504,1.2796,1.2892,1.2973,1.2903,1.2737,1.1876,1.1005,1.106,1.1937,1.2411,1.2602,1.3018,1.2609,1.2079,1.1483,1.0998,1.1146,1.2013,1.2802,1.2471,1.2597,1.2502,1.2534,1.2474,1.2167,1.1774,1.1515,1.1683,1.158,1.127,1.0963,1.0862,1.1449,1.1572,1.2272,1.3242,1.3795,1.3049,1.2514,1.2327,1.2243,1.1911,1.2034,1.1801,1.1547,1.1507,1.1758,1.2344,1.2357,1.2279,1.2441,1.2728,1.281,1.283,1.2733,1.2169,1.2032,1.2229,1.2502,1.239,1.1836,1.1496,1.1661,1.1806,1.1868,1.2129,1.2171,1.2372,1.2093,1.276,1.4025,1.3994,1.3366,1.2707,1.2176,1.206,1.2042,1.1659,1.1888,1.1725,1.1644,1.2243,1.2346,1.2276,1.2936,1.373,1.3576,1.3665,1.3458,1.2709,1.2657,1.2544,1.199,1.1954,1.2995,1.3169,1.3156,1.3398,1.4253,1.3826,1.3024,1.2609,1.2626,1.2273,1.19,1.1922,1.1518,1.1439,1.1523,1.1661,1.2137,1.2529,1.3193,1.3143,1.2176,1.16,1.1356,1.1694,1.2672,1.1927,1.2213,1.2274,1.2423,1.2777,1.2462,1.2503,1.2121,1.1869,1.1882,1.1896,1.1568,1.0736,1.0901,1.1679,1.2057,1.262,1.3308,1.3646,1.2867,1.2689,1.2273,1.2012,1.2163,1.2277,1.1941,1.1389,1.1366,1.1834,1.2362,1.2328,1.2027,1.2257,1.2112,1.2272,1.2623,1.2629,1.2314,1.2327,1.2585,1.3013,1.2793,1.2467,1.2098,1.1991,1.2112,1.2102,1.2341,1.2336,1.2579,1.2192,1.2181,1.3378,1.3255,1.2744,1.2147,1.1771,1.1898,1.1438,1.1479,1.183,1.1883,1.1738,1.2145,1.2078,1.2053,1.28,1.3685,1.3363,1.3251,1.3088,1.1978,1.2083,1.2584,1.1991,1.2293,1.3143,1.3257,1.3337,1.3484,1.3733,1.3588,1.3114,1.252,1.2263,1.1957,1.1564,1.153,1.1445,1.0909,1.1301,1.1994,1.2622,1.2789,1.3378,1.2985,1.263,1.2175,1.2041,1.2639,1.2346,1.2266,1.2693,1.2558,1.2786,1.2822,1.2434,1.2391,1.2341,1.2007,1.2014,1.2022,1.1745,1.1078,1.1044,1.1581,1.2191,1.2711,1.3277,1.3437,1.2543,1.2697,1.2583,1.2462,1.246,1.2426,1.2285,1.1665,1.1442,1.1945,1.2599,1.2825,1.2188,1.1764,1.1478,1.2123,1.2878,1.2551,1.2531,1.2806,1.2857,1.2824,1.2416,1.213,1.2107,1.2014,1.2469,1.2686,1.2975,1.2941,1.264,1.2498,1.2455,1.2596,1.2934,1.2637,1.2223,1.2253,1.2137,1.1574,1.1842,1.2256,1.1946,1.1366,1.1549,1.1899,1.1716,1.2249,1.3222,1.295,1.254,1.2504,1.1731,1.1702,1.2221,1.2358,1.2413,1.3367,1.3309,1.2774,1.2945,1.2942,1.2804,1.3288,1.2979,1.2329,1.1774,1.1413,1.1532,1.1781,1.132,1.1727,1.2541,1.2891,1.3332,1.3517,1.2723,1.2497,1.2357,1.2851,1.2453,1.2451,1.2534,1.2787,1.2909,1.2791,1.2641,1.2655,1.2489,1.2328,1.2017,1.1874,1.1802,1.2277,1.1423,1.1113,1.1228,1.1629,1.2255,1.2989,1.3302,1.278,1.2674,1.2577,1.2891,1.26,1.2523,1.2599,1.1949,1.1698,1.1907,1.2374,1.1898,1.1674,1.1314,1.1427,1.1876,1.232,1.2867,1.2824,1.3298,1.3539,1.3157,1.2229,1.206,1.2115,1.2022,1.2619,1.2834,1.3049,1.3212,1.281,1.2598,1.2311,1.2316,1.2381,1.2088,1.2251,1.2638,1.2242,1.1701,1.1885,1.1972,1.1311,1.0723,1.0709,1.1534,1.1678,1.2035,1.2573,1.2684,1.209,1.1929,1.1804,1.1832,1.2207,1.3114,1.3165,1.3628,1.3242,1.2329,1.2252,1.2574,1.2995,1.3485,1.2883,1.1926,1.1508,1.1225,1.123,1.1414,1.1511,1.2167,1.2859,1.3095,1.302,1.3377,1.2794,1.2514,1.2375,1.2263,1.2164,1.2344,1.2556,1.3016,1.2704,1.2586,1.2634,1.2712,1.2174,1.199,1.2464,1.1962,1.194,1.2396,1.1992,1.1588,1.158,1.2151,1.2743,1.3254,1.3188,1.3025,1.3041,1.24,1.2859,1.2635,1.2664,1.2865,1.2581,1.2409,1.2102,1.2169,1.1334,1.1311,1.1362,1.1794,1.1939,1.1805,1.2303,1.3309,1.3571,1.3688,1.3439,1.2523,1.2084,1.2404,1.2803,1.3438,1.348,1.3368,1.3126,1.2806,1.2746,1.2681,1.2706,1.2399,1.2301,1.2185,1.2474,1.1953,1.152,1.1781,1.1609,1.0847,1.0325,1.0487,1.1138,1.1577,1.174,1.2359,1.2602,1.1962,1.1428,1.2175,1.2343,1.2681,1.3152,1.3039,1.2958,1.2755,1.2517,1.222,1.242,1.3484,1.3072,1.23,1.1819,1.1555,1.1199,1.1409,1.1348,1.1319,1.2051,1.3411,1.3494,1.2971,1.2916,1.3274,1.2588,1.1722,1.1798,1.1956,1.2201,1.2587,1.2234,1.233,1.263,1.3059,1.2876,1.2056,1.2076,1.2768,1.2503,1.2523,1.2899,1.24,1.2078,1.2818,1.2993,1.3055,1.2934,1.2963,1.2946,1.2265,1.2182,1.2427,1.2748,1.2668,1.2921,1.3045,1.2879,1.2464,1.2493,1.1351,1.1076,1.1319,1.1616,1.188,1.2031,1.2272,1.2802,1.3268,1.3238,1.3146,1.2616,1.242,1.2984,1.3391,1.3489,1.3866,1.347,1.3047,1.2807,1.2545,1.2113,1.2126,1.1496,1.1357,1.1501,1.1991,1.1726,1.1305,1.1396,1.1367,1.137,1.1034,1.1219,1.1668,1.1797,1.1922,1.2321,1.2623,1.2373,1.1687,1.2725,1.2709,1.2751,1.2852,1.2951,1.274,1.2754,1.3225,1.2584,1.2895,1.3304,1.2242,1.1797,1.1487,1.1186,1.1091,1.1325,1.1468,1.1641,1.286,1.3069,1.3031,1.2383,1.2342,1.2977,1.2297,1.1635,1.1395,1.1746,1.1977,1.2009,1.2352,1.2298,1.2598,1.293,1.275,1.2299,1.2487,1.3139,1.2639,1.2353,1.2719,1.2855,1.3215,1.2852,1.2855,1.2986,1.2605,1.272,1.263,1.1847,1.2074,1.2412,1.2541,1.2766,1.3069,1.3221,1.3275,1.3352,1.316,1.17,1.0989,1.1022,1.1238,1.19,1.2263,1.2386,1.3167,1.3553,1.3138,1.3119,1.2903,1.3005,1.3676,1.3562,1.3382,1.3565,1.4079,1.3342,1.3109,1.2327,1.1595,1.148,1.105,1.0791,1.0824,1.1394,1.1364,1.1029,1.1084,1.1111,1.1434,1.1494,1.2001,1.2658,1.2207,1.2004,1.2483,1.2777,1.2879,1.2913,1.349,1.2978,1.2867,1.2985,1.3042,1.2641,1.2714,1.2937,1.3032,1.3369,1.2616,1.1984,1.1604,1.1434,1.1476,1.1223,1.1413,1.1543,1.2551,1.2641,1.3088,1.3416,1.2676,1.2476,1.2666,1.2263,1.1969,1.1635,1.2237,1.155,1.1573,1.2244,1.2399,1.2576,1.3181,1.3132,1.2622,1.2887,1.301,1.2164,1.193,1.2083,1.2662,1.3432,1.3573,1.3482,1.3117,1.2711,1.2479,1.2255,1.1372,1.1574,1.2339,1.2765,1.2889,1.2992,1.3111,1.3652,1.3898,1.3866,1.2188,1.1193,1.0958,1.134,1.2069,1.2318,1.2694,1.3363,1.378,1.349,1.335,1.3382,1.3234,1.3872,1.3557,1.3432,1.3393,1.3417,1.3439,1.3051,1.225,1.1613,1.1312,1.1022,1.0783,1.0968,1.1794,1.1804,1.127,1.1204,1.1336,1.1424,1.1515,1.1935,1.2396,1.3095,1.2014,1.2401,1.2787,1.3439,1.3811,1.4179,1.3326,1.2976,1.2921,1.2885,1.2773,1.2525,1.2745,1.3412,1.3426,1.2939,1.2154,1.1989,1.2201,1.235,1.1782,1.1488,1.1675,1.2304,1.2935,1.3349,1.3535,1.3174,1.2816,1.3181,1.2858,1.2493,1.2042,1.1729,1.1666,1.1598,1.1811,1.1865,1.1953,1.2856,1.3196,1.2569,1.2629,1.2554,1.1865,1.1791,1.2178,1.2711,1.3389,1.4042,1.3993,1.3844,1.3058,1.2419,1.1638,1.1212,1.1268,1.1866,1.2493,1.2372,1.2459,1.3038,1.3697,1.4379,1.3533,1.2619,1.1476,1.1309,1.1559,1.1927,1.2608,1.2779,1.2929,1.3812,1.3808,1.3602,1.31,1.3086,1.3225,1.297,1.2884,1.2901,1.3124,1.3251,1.2986,1.2227,1.169,1.121,1.1062,1.1268,1.2119,1.1719,1.1658,1.1666,1.1689,1.1575,1.1525,1.1638,1.1978,1.2061,1.2488,1.2848,1.3182,1.3548,1.4174,1.3398,1.395,1.3807,1.3422,1.3199,1.2824,1.2613,1.2452,1.2803,1.373,1.4189,1.4138,1.346,1.279,1.2383,1.2774,1.2814,1.1857,1.1555,1.2004,1.2875,1.306,1.3534,1.3322,1.3086,1.3179,1.2874,1.2728,1.2319,1.1825,1.1484,1.1768,1.1602,1.1393,1.1502,1.1942,1.252,1.2468,1.2125,1.2244,1.2419,1.222,1.257,1.2903,1.3564,1.3411,1.3023,1.2528,1.2363,1.2178,1.206,1.2035,1.2125,1.1951,1.1894,1.1951,1.2158,1.289,1.368,1.3807,1.3038,1.2258,1.1454,1.1293,1.1423,1.235,1.2403,1.2634,1.2593,1.3247,1.2689,1.2403,1.261,1.294,1.3294,1.2969,1.2739,1.293,1.282,1.3063,1.3144,1.2609,1.1803,1.1324,1.1321,1.1462,1.1732,1.1477,1.1321,1.1847,1.1977,1.1615,1.1876,1.1965,1.1966,1.1811,1.221,1.2755,1.3567,1.3791,1.3433,1.2913,1.3471,1.3369,1.3559,1.3276,1.2806,1.2552,1.2316,1.2785,1.3599,1.3865,1.4203,1.3239,1.2911,1.2957,1.3069,1.3294,1.2025,1.1579,1.2026,1.2485,1.2592,1.2886,1.2848,1.2728,1.2981,1.2813,1.2099,1.2518,1.2187,1.1752,1.19,1.1816,1.1453,1.1385,1.1605,1.2157,1.2098,1.1748,1.175,1.2531,1.2749,1.2852,1.2961,1.319,1.252,1.2145,1.2116,1.229,1.2608,1.2751,1.2043,1.1658,1.1572,1.1552,1.2006,1.1991,1.2362,1.3246,1.3059,1.2632,1.2181,1.1675,1.1204,1.1608,1.2205,1.2331,1.2294,1.193,1.2331,1.185,1.1824,1.254,1.3003,1.3714,1.3174,1.3042,1.3518,1.3434,1.3409,1.3509,1.2872,1.219,1.2106,1.2386,1.2556,1.2473,1.1997,1.1934,1.1846,1.2266,1.2469,1.2322,1.2251,1.2125,1.2227,1.2719,1.29,1.3018,1.3325,1.3335,1.3146,1.2911,1.2867,1.2809,1.2504,1.2366,1.2019,1.1883,1.2691,1.3308,1.3581,1.3409,1.3035,1.2906,1.3123,1.3019,1.2878,1.1777,1.159,1.206,1.2565,1.2027,1.1944,1.2031,1.2175,1.265,1.2287,1.2222,1.2615,1.2598,1.2455,1.2354,1.2438,1.1953,1.2006,1.2084,1.2392,1.2089,1.1539,1.1398,1.1502,1.2203,1.308,1.2942,1.2737,1.1838,1.1602,1.2102,1.2306,1.2672,1.3004,1.2262,1.1365,1.1205,1.1581,1.2271,1.1982,1.2053,1.2876,1.234,1.227,1.2272,1.1525,1.1494,1.154,1.1789,1.1934,1.1899,1.1685,1.1786,1.1991,1.2384,1.2864,1.3494,1.419,1.3617,1.321,1.3658,1.3647,1.3197,1.2958,1.2777,1.2928,1.31,1.3457,1.374,1.3117,1.2507,1.2197,1.2052,1.2586,1.3074,1.3051,1.2838,1.2514,1.2601,1.2869,1.2833,1.3102,1.3396,1.3324,1.3394,1.2688,1.2414,1.1939,1.1688,1.1694,1.1689,1.1803,1.2464,1.3431,1.3582,1.3014,1.2768,1.2857,1.3289,1.3086,1.2711,1.188,1.1856,1.1993,1.2285,1.2377,1.2029,1.1711,1.1841,1.1429,1.1791,1.2187,1.2863,1.3027,1.2977,1.3124,1.2949,1.2402,1.2446,1.2342,1.2542,1.2067,1.1716,1.107,1.0978,1.1491,1.2471,1.2189,1.1515,1.0951,1.0887,1.1756,1.2185,1.2714,1.2872,1.286,1.1422,1.1291,1.1685,1.2204,1.1972,1.1845,1.2298,1.2442,1.2176,1.1928,1.138,1.1255,1.1603,1.1522,1.1666,1.1775,1.1913,1.1843,1.1575,1.1727,1.2285,1.2726,1.2816,1.2861,1.3375,1.3506,1.3529,1.3119,1.2682,1.2397,1.2563,1.3004,1.3308,1.3401,1.3749,1.3553,1.3237,1.2841,1.2894,1.3479,1.307,1.2976,1.2653,1.271,1.2573,1.2845,1.3419,1.3671,1.326,1.3862,1.2246,1.2074,1.1826,1.1419,1.1566,1.2325,1.2081,1.2386,1.3057,1.3379,1.3123,1.2913,1.3018,1.2999,1.2817,1.2781,1.2468,1.2383,1.2068,1.2328,1.1958,1.1271,1.1189,1.1266,1.1718,1.1862,1.2591,1.3055,1.32,1.345,1.3005,1.2385,1.1887,1.2151,1.1902,1.1929,1.214,1.185,1.1272,1.1006,1.1312,1.1646,1.1451,1.0944,1.0692,1.1184,1.2158,1.2271,1.2375,1.2175,1.1715,1.2155,1.151,1.1861,1.2373,1.2424,1.2262,1.2388,1.2592,1.2183,1.2018,1.1766,1.1162,1.1804,1.2278,1.2119,1.2141,1.1941,1.1854,1.1669,1.1823,1.2221,1.2262,1.2122,1.1857,1.2458,1.3401,1.3482,1.2976,1.2716,1.2625,1.2725,1.3395,1.3551,1.3506,1.4431,1.3757,1.338,1.2633,1.2468,1.314,1.3185,1.326,1.3219,1.3238,1.2988,1.3344,1.3352,1.2823,1.292,1.321,1.2148,1.205,1.2063,1.172,1.2264,1.3046,1.2618,1.255,1.3187,1.3681,1.3136,1.3011,1.3157,1.3063,1.2676,1.2403,1.3299,1.2944,1.281,1.2702,1.1893,1.1069,1.0879,1.1679,1.1665,1.2331,1.2793,1.2849,1.2979,1.2958,1.2773,1.2062,1.2123,1.2237,1.1867,1.1777,1.1701,1.1727,1.1398,1.1244,1.1455,1.1944,1.2306,1.1838,1.1615,1.1775,1.2231,1.2328,1.2366,1.206,1.1566,1.1376,1.2721,1.24,1.2388,1.2284,1.2215,1.1911,1.2189,1.2112,1.1866,1.181,1.1689,1.2167,1.2028,1.2069,1.2327,1.2094,1.2218,1.1961,1.1989,1.1732,1.1632,1.1443,1.1428,1.2071,1.2951,1.3675,1.3009,1.2885,1.3058,1.3504,1.3663,1.3569,1.3235,1.389,1.3751,1.3305,1.2703,1.2099,1.2982,1.3502,1.3983,1.3927,1.361,1.3209,1.296,1.2853,1.2669,1.2841,1.2436,1.1359,1.0898,1.0863,1.1429,1.215,1.2789,1.2936,1.3073,1.3179,1.3541,1.3521,1.378,1.3512,1.2751,1.2244,1.2116,1.2539,1.3565,1.377,1.3136,1.2438,1.1789,1.1555,1.1124,1.1079,1.1641,1.1969,1.2203,1.239,1.268,1.257,1.2101,1.2118,1.2199,1.2498,1.2154,1.1635,1.1757,1.1642,1.1329,1.1308,1.2298,1.2832,1.2518,1.2293,1.1759,1.2154,1.2909,1.2655,1.2313,1.1838,1.0811,1.1923,1.28,1.2241,1.168,1.1588,1.2055,1.223,1.2566,1.1991,1.2105,1.2526,1.2308,1.2295,1.2398,1.2263,1.1837,1.1617,1.1288,1.1203,1.1433,1.1975,1.1288,1.1133,1.1786,1.2869,1.3388,1.3028,1.2476,1.3661,1.3838,1.3951,1.3536,1.2716,1.2916,1.3677,1.3307,1.2608,1.2329,1.3072,1.3153,1.3373,1.2915,1.2663,1.2955,1.3196,1.3048,1.2805,1.2904,1.2369,1.103,1.0621,1.0823,1.1139,1.1825,1.2297,1.2555,1.25,1.2806,1.3311,1.3513,1.3471,1.3576,1.2518,1.2213,1.1948,1.1999,1.2856,1.3069,1.2527,1.2014,1.1959,1.161,1.1243,1.1364,1.1344,1.1296,1.1453,1.2138,1.2558,1.2526,1.2098,1.1732,1.2042,1.2241,1.1383,1.1072,1.1788,1.1959,1.1642,1.1669,1.2486,1.2566,1.243,1.2414,1.1884,1.1643,1.2163,1.2908,1.3125,1.2525,1.0895,1.1371,1.1822,1.2708,1.1645,1.1285,1.195,1.2185,1.2614,1.2604,1.2672,1.3016,1.2692,1.3181,1.2788,1.2224,1.1717,1.1297,1.1258,1.1168,1.1199,1.1406,1.186,1.1648,1.1805,1.2945,1.332,1.2781,1.2048,1.3659,1.3848,1.3384,1.3305,1.2278,1.2201,1.2664,1.3555,1.3049,1.271,1.2926,1.3158,1.2608,1.221,1.2411,1.2774,1.2851,1.2733,1.2639,1.2971,1.2447,1.154,1.1677,1.1518,1.1921,1.226,1.2336,1.2609,1.2534,1.2753,1.3529,1.28,1.2727,1.2679,1.3141,1.2303,1.2137,1.2121,1.2775,1.3143,1.2788,1.2485,1.2333,1.2131,1.1634,1.1479,1.1278,1.1539,1.1945,1.2371,1.2404,1.2471,1.2274,1.1764,1.2103,1.2067,1.134,1.1343,1.1983,1.2621,1.2456,1.2498,1.2726,1.2041,1.1953,1.1976,1.1772,1.1525,1.2014,1.2088,1.2399,1.2778,1.1408,1.097,1.1359,1.1422,1.1622,1.1158,1.1908,1.2481,1.2873,1.2647,1.2274,1.2135,1.2196,1.2552,1.2851,1.2588,1.2035,1.1623,1.1498,1.1225,1.1487,1.1663,1.2206,1.2274,1.2092,1.2748,1.3026,1.2228,1.1867,1.3784,1.3158,1.2707,1.2705,1.2714,1.2384,1.2433,1.2447,1.3105,1.2657,1.2321,1.2527,1.2901,1.3085,1.2943,1.2456,1.2261,1.2487,1.2545,1.1866,1.1573,1.2207,1.247,1.2344,1.2576,1.2507,1.2521,1.2996,1.2934,1.3254,1.3827,1.258,1.2083,1.2047,1.1959,1.253,1.2739,1.2571,1.308,1.3509,1.3365,1.3261,1.2958,1.2465,1.1825,1.1694,1.1404,1.2442,1.2946,1.3222,1.2934,1.2772,1.2772,1.2195,1.2782,1.2438,1.2176,1.2406,1.2767,1.3032,1.3526,1.3208,1.2625,1.2061,1.2012,1.1575,1.1649,1.2012,1.2574,1.2668,1.2599,1.3024,1.1834,1.0663,1.12,1.0763,1.075,1.1776,1.215,1.2663,1.3137,1.2993,1.2462,1.2255,1.2616,1.3177,1.3152,1.2808,1.2395,1.2305,1.2266,1.1998,1.2006,1.1791,1.2038,1.2047,1.1855,1.1962,1.2546,1.1799,1.1747,1.3573,1.2633,1.274,1.313,1.287,1.2484,1.2329,1.2083,1.1996,1.2781,1.2545,1.214,1.1936,1.225,1.2629,1.2193,1.1538,1.1735,1.2204,1.1649,1.1628,1.2248,1.2032,1.1616,1.1885,1.2321,1.2554,1.3001,1.3393,1.3587,1.3219,1.2143,1.1559,1.1363,1.1352,1.2034,1.2806,1.2819,1.3549,1.3896,1.4381,1.4203,1.3255,1.2444,1.2,1.1954,1.2225,1.2586,1.2697,1.3169,1.332,1.2942,1.2374,1.2209,1.2135,1.2697,1.2919,1.3129,1.3351,1.3285,1.3418,1.2902,1.249,1.237,1.2098,1.1871,1.1961,1.2133,1.2846,1.3079,1.3397,1.3318,1.2125,1.0611,1.1056,1.0876,1.0915,1.178,1.2859,1.3019,1.3424,1.3723,1.3861,1.3251,1.3165,1.3672,1.36,1.3225,1.2971,1.2928,1.2821,1.2424,1.2169,1.1882,1.2311,1.2391,1.168,1.1554,1.276,1.1754,1.1884,1.3135,1.2636,1.2719,1.3056,1.3129,1.3191,1.3164,1.2391,1.1642,1.1747,1.2898,1.2279,1.1944,1.2037,1.2125,1.247,1.1454,1.1603,1.2235,1.1575,1.1541,1.2266,1.1682,1.1328,1.144,1.1934,1.2105,1.2194,1.2511,1.3119,1.2926,1.2526,1.1778,1.1241,1.0953,1.1969,1.2668,1.2737,1.3568,1.4319,1.3887,1.3837,1.3528,1.2532,1.2107,1.2594,1.2611,1.2399,1.2667,1.3472,1.3785,1.3593,1.3141,1.2554,1.2433,1.287,1.3392,1.3488,1.3722,1.3803,1.3787,1.2862,1.2511,1.2221,1.2103,1.2364,1.2285,1.2637,1.3148,1.3559,1.3262,1.2681,1.2381,1.0924,1.0824,1.095,1.1364,1.1871,1.2373,1.296,1.3085,1.3347,1.4026,1.4062,1.3844,1.4024,1.3332,1.3015,1.2881,1.3021,1.2792,1.2871,1.2514,1.2266,1.2389,1.2691,1.2036,1.1868,1.2557,1.1645,1.2287,1.3119,1.3039,1.2838,1.3062,1.2965,1.334,1.2878,1.2063,1.1691,1.1315,1.167,1.2213,1.1969,1.1853,1.1762,1.253,1.202,1.2465,1.2748,1.1629,1.1319,1.2043,1.1266,1.1103,1.14,1.1972,1.1858,1.204,1.2349,1.2749,1.3073,1.2543,1.1802,1.1221,1.0917,1.1731,1.2066,1.2234,1.3182,1.4323,1.3503,1.3279,1.331,1.3021,1.2508,1.2406,1.2283,1.2413,1.2981,1.3676,1.4005,1.4182,1.3549,1.313,1.3014,1.3309,1.394,1.406,1.3418,1.3745,1.3436,1.2733,1.2448,1.2311,1.2243,1.1684,1.202,1.3279,1.4196,1.3533,1.2727,1.2469,1.2221,1.1452,1.0587,1.1157,1.1594,1.1966,1.2292,1.2548,1.2828,1.2867,1.3649,1.4264,1.3288,1.335,1.322,1.2858,1.2974,1.3418,1.3764,1.3726,1.3158,1.2509,1.2416,1.2829,1.2109,1.2143,1.2133,1.1476,1.2426,1.2776,1.2698,1.2037,1.2267,1.2451,1.3264,1.2332,1.1788,1.1925,1.1404,1.1391,1.1652,1.2514,1.1754,1.1319,1.2329,1.2387,1.2892,1.2963,1.178,1.1031,1.1391,1.1019,1.0981,1.1379,1.1786,1.2035,1.2362,1.255,1.2585,1.2627,1.279,1.1579,1.0682,1.0504,1.1116,1.1991,1.2116,1.2894,1.4236,1.3512,1.3041,1.2828,1.3348,1.2692,1.2284,1.2409,1.2606,1.3327,1.3924,1.3132,1.3532,1.3646,1.3745,1.3031,1.3157,1.3262,1.3408,1.2683,1.2625,1.3048,1.2448,1.2252,1.2107,1.134,1.1246,1.193,1.3223,1.3681,1.3079,1.2704,1.2517,1.2389,1.1749,1.0414,1.1238,1.2062,1.2527,1.2492,1.2685,1.2833,1.2809,1.3841,1.3432,1.2871,1.272,1.2309,1.1989,1.2079,1.2926,1.3605,1.3797,1.3645,1.3019,1.3083,1.3224,1.2364,1.2224,1.1745,1.1376,1.2068,1.2243,1.1838,1.1818,1.197,1.2098,1.3313,1.1939,1.149,1.1903,1.1912,1.1637,1.1772,1.2011,1.1989,1.1683,1.1817,1.1982,1.2809,1.2356,1.1603,1.0665,1.1159,1.114,1.0946,1.1089,1.1703,1.2263,1.244,1.2577,1.1743,1.1255,1.1343,1.1743,1.053,1.0472,1.1283,1.2714,1.2791,1.3395,1.4421,1.333,1.2757,1.2977,1.3114,1.2773,1.3053,1.2773,1.2614,1.2666,1.2993,1.2672,1.2743,1.3055,1.3223,1.3172,1.3079,1.2686,1.3044,1.2109,1.2052,1.1739,1.1946,1.1773,1.1626,1.1061,1.0775,1.1728,1.2745,1.2583,1.2716,1.2635,1.2692,1.279,1.2131,1.0595,1.0834,1.1673,1.2367,1.2711,1.275,1.3125,1.3462,1.2921,1.2928,1.2461,1.235,1.2284,1.2148,1.2253,1.2866,1.3328,1.3448,1.323,1.2917,1.2751,1.3,1.2704,1.2123,1.1536,1.1325,1.2034,1.1952,1.1885,1.1928,1.1903,1.2062,1.3138,1.1875,1.1392,1.1753,1.1948,1.1588,1.1571,1.1722,1.1551,1.0974,1.0911,1.1463,1.183,1.1501,1.1197,1.0682,1.056,1.0795,1.0654,1.0611,1.1143,1.1981,1.2493,1.1803,1.1257,1.1306,1.1398,1.1646,1.1433,1.1003,1.1674,1.3128,1.3495,1.3899,1.4105,1.3611,1.3373,1.3453,1.241,1.1836,1.1755,1.2357,1.2469,1.2089,1.2246,1.2576,1.2411,1.287,1.2889,1.3031,1.2818,1.2369,1.2313,1.2012,1.1802,1.1519,1.0838,1.0866,1.1105,1.0916,1.0866,1.1808,1.1501,1.1427,1.163,1.2102,1.2914,1.34,1.2759,1.1017,1.0735,1.1917,1.2245,1.2766,1.3017,1.4025,1.3131,1.2732,1.2959,1.2615,1.2647,1.2521,1.2317,1.2172,1.2823,1.2495,1.2155,1.2258,1.2339,1.189,1.2309,1.325,1.2279,1.1468,1.1586,1.1755,1.163,1.17,1.1693,1.2023,1.2038,1.2405,1.1431,1.1103,1.1056,1.2024,1.1281,1.116,1.147,1.1517,1.1021,1.0924,1.1465,1.1338,1.1258,1.1292,1.1117,1.0437,1.0218,1.0324,1.0608,1.1259,1.2638,1.2033,1.1692,1.1558,1.2023,1.2343,1.2006,1.1838,1.2053,1.2396,1.2763,1.3409,1.3841,1.3445,1.3387,1.3262,1.3162,1.2488,1.1866,1.1633,1.152,1.2348,1.1902,1.1633,1.244,1.2638,1.2616,1.2483,1.2694,1.2186,1.2063,1.247,1.2118,1.2003,1.1525,1.0834,1.1002,1.1019,1.1271,1.1672,1.1803,1.1451,1.1545,1.154,1.2315,1.304,1.3122,1.2512,1.1236,1.0434,1.1366,1.2132,1.267,1.2764,1.3634,1.3195,1.3257,1.3373,1.3666,1.324,1.3192,1.2396,1.1773,1.2019,1.169,1.1289,1.1317,1.2006,1.1401,1.16,1.3144,1.2506,1.1362,1.1679,1.1953,1.1813,1.1884,1.1824,1.161,1.184,1.2021,1.1029,1.0773,1.0974,1.142,1.1675,1.1482,1.1701,1.2001,1.1784,1.1728,1.2197,1.1785,1.1627,1.1565,1.1487,1.0802,1.0488,1.0719,1.1452,1.2323,1.2851,1.2581,1.221,1.2403,1.2945,1.2863,1.2292,1.2235,1.2541,1.2726,1.251,1.2782,1.3137,1.285,1.2515,1.2454,1.2539,1.306,1.2602,1.1726,1.1497,1.2166,1.1289,1.1341,1.1685,1.228,1.2262,1.2359,1.2545,1.2003,1.2176,1.2394,1.2431,1.1986,1.1401,1.1036,1.1145,1.1616,1.2014,1.2025,1.1982,1.1965,1.2462,1.2237,1.2612,1.328,1.3113,1.2478,1.1508,1.0212,1.1169,1.1856,1.1817,1.177,1.2626,1.3749,1.4159,1.4064,1.3163,1.3054,1.3326,1.2485,1.1598,1.1372,1.1237,1.1097,1.116,1.1534,1.0771,1.134,1.2409,1.2577,1.1222,1.1962,1.2568,1.1989,1.2172,1.2049,1.1511,1.1361,1.1589,1.0973,1.0628,1.0853,1.1075,1.1954,1.1624,1.1703,1.2157,1.2238,1.2309,1.2382,1.2034,1.1873,1.1815,1.2313,1.1177,1.1172,1.1617,1.2557,1.2529,1.2995,1.3072,1.2926,1.3271,1.361,1.3623,1.3263,1.2903,1.2634,1.2429,1.2381,1.2595,1.2955,1.2837,1.2064,1.1658,1.2006,1.2543,1.3281,1.2375,1.2024,1.2273,1.1461,1.1394,1.1401,1.1617,1.2093,1.2178,1.1848,1.2081,1.2046,1.232,1.3076,1.186,1.1395,1.1062,1.1549,1.1629,1.153,1.2099,1.166,1.1728,1.1912,1.2022,1.2794,1.3353,1.3757,1.2991,1.2283,1.0129,1.1457,1.2095,1.0866,1.1182,1.1875,1.2616,1.3514,1.3276,1.3149,1.3298,1.3604,1.2455,1.1356,1.0806,1.0694,1.0779,1.1059,1.1456,1.11,1.1678,1.2299,1.3037,1.1183,1.2053,1.2847,1.2122,1.2137,1.2242,1.1726,1.1323,1.1281,1.0472,1.0588,1.0968,1.1197,1.185,1.1758,1.2093,1.2858,1.2871,1.2319,1.2605,1.2099,1.2366,1.2818,1.3233,.7913,.843,.9093,1.0296,1.1885,1.2776,1.3037,1.2895,1.2958,1.3518,1.38,1.3356,1.271,1.2333,1.245,1.2219,1.2333,1.0651,.9957,.9575,.9268,.9038,.9222,.9974,1.1051,1.0398,.9897,.8743,.7764,.8085,1.0504,1.2235,1.1713,1.1568,1.2182,1.0483,.9516,.9136,.8807,1.0282,1.1605,1.142,1.1114,1.1082,1.0562,1.07,1.1392,1.1513,1.2413,1.3126,1.3302,1.3015,1.2412,1.2356,1.0264,1.1646,1.2356,1.096,1.087,1.1601,1.2429,1.1102,.9069,.9222,1.168,1.3185,1.2384,1.1149,1.0605,1.0515,1.0792,1.0998,1.1717,1.171,1.2168,1.2565,1.3326,1.1138,1.2228,1.2986,1.2628,1.2609,1.2441,1.2375,1.2246,1.0733,1.0428,1.0418,1.0433,1.0445,1.0799,1.0586,1.1108,1.1927,1.2983,1.2894,1.2787,1.2554,1.2992,1.2953,1.2911,.3657,.3796,.3915,.432,.5633,.7672,.8964,.8897,.8841,.8956,.8168,.719,.8,.9988,1.0279,.7952,.5377,.3648,.3242,.3416,.3362,.3034,.2951,.3164,.3559,.3637,.3148,.2553,.2272,.2456,.3898,.7239,.9227,.8543,.6569,.4033,.2841,.2355,.2514,.405,.7034,.8564,.8008,.5311,.3503,.4049,.6803,.9975,1.2083,1.287,1.3418,1.3167,1.2405,1.1759,1.0381,1.0926,1.1951,1.1371,1.1184,1.1016,.6503,.3242,.2016,.2152,.4123,.8045,1.0196,1.0445,1.0877,1.089,1.0773,1.1032,1.179,1.2287,1.229,1.2875,1.3038,1.1117,1.2678,1.2956,1.3495,1.2847,1.2692,1.1915,.7105,.5329,.5238,.4987,.4201,.3898,.4089,.4333,.4451,.4488,.5747,.8151,.9948,1.0842,1.0107,.9327,.941,.332,.3339,.3296,.3207,.3102,.3052,.3199,.3263,.3259,.3186,.2934,.286,.2998,.373,.3831,.2789,.2461,.2377,.2323,.2294,.2257,.2228,.2194,.2125,.2063,.2016,.1954,.1921,.195,.1988,.1992,.2081,.2752,.2436,.202,.1924,.1846,.1789,.176,.1842,.1981,.2667,.2286,.1628,.1586,.1575,.1682,.3298,.515,.5894,.8379,1.3489,1.2745,1.2049,1.0512,1.0589,1.18,1.0886,.9781,.3698,.1325,.1358,.1402,.1435,.1492,.1731,.2999,.4275,.6604,.9753,1.1078,1.114,1.176,1.2796,1.2556,1.2774,1.2682,1.1149,1.2955,1.3066,1.3657,1.3237,1.2385,.4455,.1844,.179,.1764,.1764,.1873,.2057,.228,.2436,.2486,.2484,.2528,.2774,.3669,.3991,.3539,.3279,.3457,.3237,.3237,.3192,.3126,.3058,.2998,.2956,.2908,.2835,.2771,.2769,.2804,.2808,.2711,.2544,.2426,.2369,.232,.2285,.2257,.2206,.2165,.2127,.2077,.2007,.1922,.1859,.1861,.1913,.1942,.1917,.1872,.1858,.1926,.1967,.1894,.1796,.1724,.1702,.1743,.1784,.1737,.1635,.1541,.1508,.1512,.1486,.1428,.1398,.1439,.179,.6315,1.3077,1.2537,1.073,1.047,1.1705,1.0455,.3447,.1071,.1188,.1248,.1273,.1302,.1341,.1358,.1335,.1286,.1322,.2962,.6278,.891,1.1313,1.285,1.2665,1.2609,1.2187,1.1111,1.2471,1.2744,1.3177,1.2704,.479,.1604,.1663,.169,.1685,.1703,.1837,.2064,.2272,.2394,.2447,.2475,.2542,.2636,.2659,.2625,.264,.2739,.29,.3151,.3141,.3108,.3058,.3016,.2983,.2945,.2857,.2728,.2645,.2655,.2694,.2667,.253,.2354,.2256,.2236,.2231,.2216,.218,.2131,.2101,.2062,.2025,.1969,.1867,.1812,.1856,.189,.1866,.1801,.1733,.1719,.1816,.1908,.1873,.1779,.1706,.1662,.1645,.1638,.1601,.1549,.1493,.1464,.1449,.1405,.1372,.1338,.1314,.1312,.1274,.6204,1.2436,1.0772,1.0262,1.1303,.4597,.0807,.0881,.1006,.1099,.1149,.1173,.1188,.1193,.1165,.1089,.101,.0956,.0981,.2243,.5147,1.0014,1.2586,1.2322,1.1451,1.0807,1.1612,1.2197,1.2339,.6201,.1401,.1462,.1545,.1596,.1631,.1716,.1857,.2053,.2201,.2293,.2355,.2417,.2502,.2567,.2557,.2537,.2574,.2658,.2798,.3067,.3068,.3066,.3036,.2997,.2956,.2918,.2817,.265,.2544,.2545,.2566,.251,.2365,.221,.2111,.2065,.2061,.2066,.2037,.1999,.2002,.1994,.1958,.1883,.1769,.1733,.1764,.1771,.1692,.1587,.1526,.1545,.1678,.1813,.1793,.1677,.1598,.1552,.1505,.1471,.1457,.1441,.1392,.1344,.1287,.121,.1178,.1135,.1055,.0991,.0941,.0953,.42,.4634,.4114,.3864,.0518,.0514,.0557,.067,.0826,.0974,.1045,.1053,.1043,.1013,.0964,.0861,.0712,.0687,.0745,.0746,.2343,.7375,.9523,.7447,.6519,.8657,.941,.5599,.1203,.123,.1299,.1413,.1508,.159,.1708,.1828,.1958,.2069,.2164,.2228,.2299,.2404,.2476,.2464,.247,.2529,.2606,.2711,.3005,.302,.3038,.3021,.2978,.292,.2866,.2765,.2599,.2489,.2473,.248,.2427,.23,.2164,.2058,.1977,.1919,.1901,.1888,.1874,.1908,.1928,.1887,.1796,.1678,.16,.1587,.1589,.1498,.138,.135,.1399,.1507,.1604,.158,.1482,.1432,.1407,.1373,.1365,.1391,.1404,.1351,.128,.1212,.1116,.1045,.0961,.0872,.0818,.0718,.0654,.0337,-.1149,-.1492,-.0227,.0044,.0101,.0194,.0319,.0544,.0801,.0954,.098,.0917,.0856,.0836,.0731,.0516,.0442,.0469,.0415,.0393,.0596,.1347,-.0977,-.1735,.1023,.1988,.0802,.0945,.1061,.1147,.1281,.1412,.1511,.1631,.1735,.179,.1897,.2023,.2087,.2154,.2289,.2399,.2421,.2442,.2491,.2547,.2634,.2948,.2979,.3011,.3002,.2956,.2879,.2803,.2692,.255,.2475,.2462,.2442,.2369,.2248,.2139,.2056,.1964,.1852,.1784,.1771,.1789,.1844,.1859,.1801,.1716,.1603,.1493,.1432,.1411,.1304,.1175,.1142,.1209,.1323,.1411,.141,.1341,.1304,.1317,.1316,.131,.131,.1313,.1269,.1204,.1139,.1007,.0883,.0754,.0679,.067,.0531,.0291,.0108,-.0422,-.0653,-.0587,-.0508,-.0389,-.0185,-.0033,.0267,.0553,.0732,.0812,.0781,.0724,.0695,.0564,.0323,.0207,.0127,-6e-4,-.0118,-.0048,-.0829,-.2089,-.2333,-.0937,.0088,.0446,.0682,.0907,.1047,.1185,.1333,.1443,.1554,.1644,.169,.1751,.1898,.2003,.2107,.2254,.2371,.2425,.2452,.2469,.2504,.2595,.2924,.2952,.2984,.2984,.2931,.2825,.2727,.2624,.2533,.2516,.2502,.2425,.2301,.2172,.207,.2,.1923,.1826,.1783,.1754,.1746,.1782,.1777,.1701,.1617,.1522,.1411,.1281,.1221,.1112,.1,.096,.105,.1189,.1272,.1276,.1184,.1113,.113,.1162,.1181,.1186,.1177,.1149,.1136,.1056,.0864,.0683,.0533,.0439,.0421,.0301,.0044,-.0293,-.0472,-.0589,-.0883,-.078,-.0727,-.0703,-.053,-.0153,.0201,.0409,.056,.0619,.0601,.0519,.0287,.0062,-.0109,-.0222,-.0545,-.0487,-.0361,-.0818,-.1195,-.1242,-.0603,-.0072,.0207,.0528,.0796,.0935,.107,.1262,.1418,.1521,.1581,.1618,.1689,.1816,.1979,.2131,.2273,.2368,.2402,.2425,.2448,.2501,.2603,.2952,.2948,.295,.2965,.293,.2809,.2683,.2584,.2534,.2553,.254,.2432,.227,.2109,.1984,.1904,.1861,.1832,.1778,.1721,.1693,.1717,.1704,.1617,.1499,.1391,.1243,.1182,.1115,.0962,.0839,.08,.0884,.0982,.1013,.1034,.0986,.092,.0884,.0895,.0992,.1075,.107,.1024,.1024,.0945,.0723,.0514,.0359,.0211,.0149,.0103,-.0083,-.0437,-.0557,-.074,-.093,-.109,-.0925,-.0874,-.0902,-.0535,-.0168,.0174,.0292,.0368,.0418,.0325,.0053,-.0178,-.0301,-.0448,-.0735,-.0757,-.0672,-.0827,-.0858,-.0743,-.0724,-.0287,.0061,.0413,.0688,.0821,.0955,.1178,.1364,.1462,.1502,.155,.1643,.1778,.1989,.2147,.2249,.2308,.2319,.2352,.242,.251,.262,.2992,.2936,.2905,.2933,.2935,.283,.2677,.2549,.2487,.2511,.2526,.2434,.2256,.2085,.1964,.1891,.186,.1814,.172,.1644,.1638,.1647,.1601,.1494,.1349,.117,.1067,.1029,.0874,.065,.0548,.0564,.064,.0698,.0707,.0731,.0716,.0711,.068,.0652,.0784,.0951,.0966,.0911,.0874,.0776,.0584,.0405,.0208,-.0152,-.0108,-.0261,-.0475,-.0734,-.079,-.073,-.1084,-.1289,-.1347,-.1083,-.0995,-.0698,-.0375,-.0018,-.0082,2e-4,.0097,.005,-.0201,-.04,-.0404,-.0716,-.081,-.0897,-.1047,-.1016,-.102,-.0824,-.0622,-.0317,.0068,.0338,.0597,.076,.093,.1128,.1268,.1381,.1465,.1545,.1647,.1784,.1998,.2143,.2209,.2239,.2247,.231,.2425,.2547,.2654,.2994,.2903,.2849,.2875,.2897,.2812,.2661,.2505,.2402,.2412,.2448,.236,.2195,.2065,.1988,.1928,.1874,.1807,.17,.1605,.1593,.1544,.1423,.1297,.1154,.1036,.0946,.0795,.0572,.0344,.0225,.0172,.0198,.0267,.0323,.0369,.0394,.048,.0526,.0507,.0601,.0759,.0818,.0793,.0699,.0555,.0413,.0291,.0045,-.0383,-.0575,-.0561,-.0652,-.0824,-.0945,-.0967,-.1175,-.1379,-.1308,-.1203,-.1168,-.1191,-.0838,-.0612,-.0445,-.0278,-.0474,-.0499,-.0546,-.0638,-.0811,-.1057,-.105,-.1126,-.1373,-.1463,-.121,-.0987,-.0668,-.0249,.0034,.0315,.0605,.0802,.0973,.1133,.1237,.1368,.1522,.1636,.1726,.1809,.1964,.2098,.2169,.2204,.2229,.2335,.2494,.2636,.2722,.2976,.2854,.2781,.2795,.2823,.2759,.2619,.2463,.2341,.2315,.232,.2236,.2123,.2039,.1975,.1914,.186,.1774,.1676,.1563,.1463,.1325,.1131,.1019,.0965,.0909,.0774,.061,.0359,.0103,-.0088,-.0287,-.0349,-.0383,-.0423,-.0277,-.0037,.0123,.0236,.0306,.043,.0523,.0573,.0619,.0567,.0429,.0256,.0098,-.0316,-.0573,-.0642,-.056,-.0699,-.0855,-.0961,-.1163,-.1318,-.1437,-.1323,-.1034,-.1129,-.1284,-.0839,-.0811,5e-4,.0926,.038,.0678,.0026,-.089,-.1352,-.1462,-.1401,-.1435,-.1376,-.1691,-.1462,-.1002,-.0532,-.0235,.0075,.0238,.0603,.0851,.102,.1168,.1277,.1419,.1594,.1728,.1798,.1837,.1927,.2056,.2154,.2216,.227,.2415,.2594,.2708,.2748,.2956,.2804,.2711,.2704,.2729,.2679,.2554,.2421,.2309,.2242,.2193,.2117,.2044,.1993,.1932,.1875,.1795,.1677,.1573,.1447,.128,.1052,.087,.0814,.0739,.06,.0521,.0343,-.0037,-.0487,-.0592,-.0597,-.0695,-.066,-.08,-.0716,-.0601,-.0401,-.0376,4e-4,.0187,.0251,.0263,.0366,.0419,.0319,.0096,-.0357,-.0411,-.0732,-.0715,-.0776,-.0596,-.069,-.0875,-.0832,-.0812,-.1104,-.1105,-.1098,-.1145,-.1042,-.0169,.0942,.0698,.1653,.1617,.1471,.0891,-.0032,-.0432,-.1758,-.182,-.1745,-.1652,-.1541,-.1388,-.089,-.0431,-.0095,.0066,.0206,.0553,.0849,.1052,.121,.134,.147,.1629,.1767,.1817,.1825,.1894,.2038,.2164,.2265,.2357,.2508,.2648,.2693,.2693,.2904,.2751,.2659,.2622,.2601,.2549,.2468,.24,.231,.2201,.2105,.2022,.195,.1913,.1868,.1801,.1698,.1564,.1436,.1282,.1109,.0884,.0738,.0668,.0443,.0239,.0163,-.0111,-.0618,-.0823,-.079,-.0999,-.1111,-.1203,-.1369,-.1113,-.0764,-.0604,-.0697,-.0553,-.0305,-.01,-.0176,-3e-4,.0067,.0015,-.0205,.0072,.1172,.0163,.0159,-.031,-.0527,-.069,-.0554,-.063,-.0686,-.0852,-.1047,-.1052,-.1239,-.0381,.0533,.136,.1681,.1673,.1698,.1635,.1448,.1193,-.0349,-.2172,-.2006,-.1811,-.1565,-.1442,-.1202,-.0905,-.0512,-.0193,.014,.0313,.061,.0895,.1114,.1247,.1372,.1489,.1621,.1747,.1786,.1774,.1829,.1995,.217,.2317,.2426,.2543,.2608,.2595,.2581,.2845,.2726,.2651,.2571,.2484,.2406,.2369,.2374,.233,.2201,.2077,.1964,.1853,.1792,.1763,.1701,.1605,.1478,.1318,.1116,.0942,.0734,.0577,.0429,.0172,-.0109,-.0383,-.0591,-.0455,.0191,-.0207,-.1523,-.1573,-.1734,-.2038,-.1874,-.1344,-.116,-.1051,-.0898,-.0633,-.0452,-.0543,-.0541,-.0526,-.0352,.0963,.1349,.1331,.1391,.154,-.0085,-.0792,-.075,-.0717,-.0757,-.0905,-.0883,-.0833,-.0986,-.1284,-.0116,.1216,.1621,.1667,.1912,.1939,.1848,.1434,.1089,-.0199,-.1426,-.257,-.2226,-.1751,-.1457,-.1143,-.068,-.054,-.0121,.0151,.0417,.0734,.0968,.1159,.1271,.1394,.1505,.1591,.1668,.1706,.1713,.1763,.1945,.216,.2332,.2438,.2514,.2528,.249,.2475,.2808,.2738,.2666,.2549,.2425,.2332,.2288,.2315,.232,.2225,.2093,.1936,.1765,.1707,.1675,.1616,.1509,.1361,.1188,.0982,.0784,.0563,.0391,.022,-.0061,-.0308,-.0604,-.0763,-.0251,.0849,.0094,-.1244,-.2202,-.2163,-.1945,-.2483,-.1824,-.158,-.1383,-.1022,-.1038,-.0993,-.0946,-.0703,-.0687,-.001,.1426,.1532,.1706,.1677,.1535,.0734,-.0617,-.0958,-.0848,-.0727,-.0781,-.0828,-.0791,-.1029,-.1583,-.0362,.0976,.1659,.1694,.1939,.1939,.1914,.1677,.1463,.0704,-.0483,-.2388,-.2834,-.2197,-.1583,-.1183,-.0893,-.04,.0029,.0128,.0433,.0766,.0965,.1143,.1277,.1412,.1525,.1573,.1606,.1647,.1674,.1729,.1898,.2113,.2289,.2397,.2449,.2457,.2441,.2434,.2792,.2743,.2667,.2551,.2444,.2364,.2291,.2278,.2274,.2207,.2086,.1919,.179,.1724,.1664,.1568,.1416,.1234,.1071,.0897,.066,.0392,.0237,.0131,-.0085,-.0478,-.0722,-.0805,-.0772,-.0211,-.0416,-.1922,-.1418,-.0516,-.0401,-.0618,-.0381,-.0338,-.0898,-.1338,-.1612,-.0816,-.0051,.0085,-.0697,-.0434,.1214,.1511,.1723,.1708,.1258,.0302,-.1095,-.1238,-.11,-.0898,-.1084,-.0973,-.0993,-.1234,-.1471,-.0264,.0804,.1615,.1591,.1855,.1895,.1765,.1565,.1063,-1e-4,-.1011,-.2588,-.3691,-.2987,-.2084,-.1476,-.0937,-.0377,.004,.0139,.0429,.0744,.0953,.1122,.1261,.1388,.1505,.1561,.158,.1624,.167,.1735,.189,.2084,.2242,.2331,.2362,.2392,.2426,.2459,.2811,.2756,.2686,.261,.2531,.2447,.2349,.2287,.2243,.2175,.2061,.1913,.1843,.1786,.1676,.1503,.1321,.1151,.0986,.0829,.0602,.0289,.0079,-.0052,-.0186,-.0527,-.0732,-.0931,-.1433,-.1757,-.2137,-.1237,-.0485,.0324,.0964,.0713,.0884,.0918,.0131,.0042,-.0477,-.0543,.0843,.0836,-.0434,-.0304,.1142,.1548,.1513,.1439,.1396,-.0099,-.1507,-.1705,-.1629,-.1548,-.1735,-.1466,-.1377,-.1485,-.1692,-.0902,-.0252,.1039,.1537,.1643,.1519,.1648,.1524,.1253,-.007,-.169,-.3227,-.3729,-.2834,-.2167,-.1483,-.0762,-.0421,.0042,.0211,.0431,.0676,.0952,.1079,.12,.133,.1458,.1537,.1562,.1616,.1689,.1777,.1947,.2119,.2234,.2298,.2334,.2387,.2449,.2524,.286,.2779,.2714,.2673,.2621,.2527,.2424,.2328,.2246,.2154,.2023,.1884,.1847,.1783,.1622,.1405,.1231,.109,.0919,.078,.0591,.0313,.0025,-.0181,-.019,-.0546,-.0769,-.0972,-.1466,-.2122,-.2415,-.0604,.0806,.1499,.1604,.1621,.149,.1813,.1686,.1381,-.027,-.0978,-.0269,-.0173,-.1036,-.0814,-.0309,.0464,.0947,.1073,.1029,-.04,-.1863,-.2182,-.2039,-.2082,-.2062,-.1767,-.1715,-.1981,-.2149,-.2,-.0578,.0495,.1055,.1114,.1021,.1105,.1042,-.0146,-.0697,-.1973,-.3375,-.3593,-.2789,-.2121,-.1411,-.094,-.0461,-.0126,.0237,.0452,.0644,.0872,.0967,.1114,.1288,.1415,.15,.1547,.1623,.1721,.1818,.1983,.2137,.2239,.2319,.2396,.2457,.2509,.2573,.2908,.2805,.2737,.27,.2658,.2585,.2497,.2386,.2256,.2121,.1978,.1854,.1807,.1718,.156,.137,.1207,.107,.0907,.0772,.0577,.0351,.0092,-.0052,-.0198,-.0493,-.0784,-.1119,-.1737,-.2585,-.2069,-.0613,.0902,.2024,.1848,.1833,.1955,.1867,.2001,.1132,.0487,-.0694,-.1524,-.1525,-.2226,-.2427,-.1524,-.0432,-.0628,-.0381,-.0657,-.0908,-.2593,-.2736,-.2401,-.2656,-.2502,-.1985,-.1908,-.2139,-.1237,-.0435,-.0585,-.0259,-.0144,-.0234,-.0285,-.0116,-.0212,-.0852,-.2073,-.235,-.1815,-.2112,-.2717,-.1926,-.1303,-.1126,-.0638,-.017,.0196,.0431,.0604,.0795,.0921,.1102,.1277,.1382,.1451,.1513,.1609,.1724,.1833,.1988,.2145,.2267,.2383,.2485,.2553,.2592,.2615,.2905,.2799,.2742,.2714,.2677,.2615,.2532,.2421,.2274,.2106,.1964,.1854,.1775,.1671,.1524,.1368,.1225,.1073,.0904,.0759,.0563,.0383,.0178,-.0034,-.0341,-.054,-.0872,-.1422,-.2019,-.2512,-.1121,-.0319,.094,.195,.1823,.2062,.2106,.1991,.1776,.1884,.0396,-.0657,-.2181,-.3055,-.2658,-.2402,-.262,-.229,-.22,-.1854,-.2098,-.2719,-.332,-.3443,-.3249,-.315,-.3043,-.2602,-.234,-.2096,-.0476,.0707,.009,-.117,-.1914,-.1446,-.1662,-.1234,-.1448,-.2236,-.2401,-.0902,-.0357,-.0681,-.2002,-.1694,-.1218,-.0991,-.0599,-.0156,.0223,.0485,.0626,.077,.094,.1112,.1227,.1322,.1402,.1471,.1572,.1699,.1835,.2016,.2188,.2327,.2448,.2557,.264,.2692,.2701,.2836,.2752,.2723,.2719,.2707,.265,.2561,.2461,.2329,.2152,.1989,.187,.1764,.1661,.1504,.1345,.1218,.1078,.0932,.0801,.0623,.0513,.0349,.0123,-.0222,-.0608,-.1034,-.151,-.2033,-.164,-.031,.1148,.1768,.1854,.1972,.2154,.2154,.2133,.183,.1796,.1015,-.0221,-.1592,-.2951,-.2417,-.2373,-.2807,-.3295,-.367,-.3429,-.3716,-.4198,-.4031,-.4078,-.387,-.2788,-.2561,-.2667,-.2449,-.23,-.0718,.0034,-.0193,-.1193,-.2919,-.2955,-.3322,-.2927,-.3176,-.3429,-.1812,-.0298,.0636,-.0234,-.1741,-.1408,-.0983,-.0609,-.0132,.0196,.0404,.0652,.0751,.0828,.0965,.1105,.119,.1282,.1385,.1472,.1575,.1692,.1833,.2053,.2233,.2345,.2457,.2578,.2673,.2745,.2781,.2754,.2708,.2704,.2711,.2705,.2645,.2558,.2469,.236,.2203,.2043,.1904,.1773,.1672,.1522,.1363,.1242,.1154,.1051,.0932,.0734,.0629,.0474,.0248,-.0058,-.0553,-.1007,-.1742,-.2245,-.2094,-.0551,.0735,.1466,.1967,.1991,.2154,.2154,.2141,.1937,.1716,.1589,.0284,-.0888,-.2542,-.2112,-.1924,-.2452,-.3295,-.4077,-.4508,-.4655,-.4503,-.4355,-.3181,-.2197,-.1549,-.0608,-.096,-.0995,-.2205,-.1741,-.1181,-.1262,-.2228,-.346,-.3589,-.341,-.3243,-.3311,-.3467,-.2318,-.0595,-.0309,-.0439,-.177,-.1267,-.0717,-.0402,.0096,.0317,.0483,.076,.0896,.0966,.1084,.1201,.1268,.1336,.1423,.152,.163,.1732,.187,.2097,.2253,.2336,.2447,.2581,.2679,.2747,.2797,.2691,.2668,.2682,.2692,.2672,.261,.253,.2435,.2331,.2222,.2109,.1966,.1798,.169,.1563,.1433,.1316,.1234,.1155,.1059,.0868,.0729,.0545,.0319,4e-4,-.0646,-.1225,-.176,-.2392,-.2747,-.0682,.073,.1262,.1855,.1877,.2012,.2103,.2007,.1858,.1635,.1539,.0191,-.084,-.2089,-.1818,-.1833,-.2473,-.3315,-.4016,-.4512,-.4628,-.4613,-.4265,-.2467,-.0908,-.0153,.0585,.0382,-.0248,-.1295,-.2168,-.2296,-.219,-.2551,-.3222,-.3349,-.3077,-.3044,-.3417,-.3339,-.3003,-.2182,-.1672,-.1796,-.1245,-.0897,-.0549,-.0023,.0206,.0362,.0539,.0791,.0927,.1045,.1214,.1344,.1418,.146,.153,.1634,.1738,.1819,.1956,.2124,.224,.2332,.2463,.2607,.27,.2755,.2793,.2668,.2652,.2667,.2685,.2662,.2606,.2542,.2442,.232,.2235,.2166,.2037,.1856,.1721,.1592,.1485,.1391,.1287,.1191,.113,.0964,.0792,.0609,.0352,-.0014,-.0641,-.1163,-.1567,-.2034,-.2265,-.1139,.0297,.1273,.1684,.1744,.1902,.1879,.1966,.1654,.1859,.1303,-.018,-.1344,-.1349,-.1443,-.1611,-.2329,-.3202,-.3795,-.4075,-.4194,-.4328,-.3869,-.2322,-.0743,.1137,.1262,.1262,.0749,-.0318,-.1706,-.1918,-.1691,-.1939,-.2306,-.2611,-.2625,-.2682,-.299,-.3044,-.2932,-.243,-.1678,-.108,-.0908,-.0634,-.0099,.0179,.0351,.0522,.0688,.0847,.0921,.109,.1273,.1391,.1477,.1547,.1644,.1762,.1853,.1901,.1999,.2105,.2197,.2302,.2444,.2598,.2696,.2747,.2771,.2696,.2692,.2694,.2685,.2631,.2579,.255,.2469,.2338,.2231,.217,.2085,.1938,.1785,.163,.1534,.1483,.1397,.1279,.1198,.1015,.0799,.0657,.0443,.0089,-.0534,-.0888,-.1146,-.1567,-.1593,-.1881,-.0579,.0652,.1103,.1535,.1861,.1866,.187,.1447,.1137,.0153,-.0905,-.142,-.1067,-.1078,-.1521,-.204,-.2792,-.3382,-.3679,-.3661,-.3482,-.3567,-.236,-.0669,.0848,.1339,.14,.1076,-.0298,-.1411,-.1524,-.1316,-.1238,-.1458,-.1726,-.1847,-.1787,-.2286,-.265,-.2331,-.1782,-.1099,-.0763,-.0402,-.0187,.0145,.0309,.0527,.0731,.0856,.0949,.1045,.1224,.1342,.1421,.1502,.16,.1707,.1811,.1887,.1939,.2027,.21,.2176,.2258,.2382,.2547,.2668,.2728,.2745,.272,.2733,.2723,.2679,.2588,.2518,.2494,.242,.2296,.2174,.2107,.2076,.1995,.1871,.1724,.162,.158,.1514,.1393,.1266,.1072,.0869,.0774,.0608,.0339,-.008,-.0623,-.0765,-.1014,-.1073,-.1392,-.1271,-.0498,-.0288,.0906,.1813,.1274,.1209,.0215,.0095,-.0517,-.1161,-.1141,-.0894,-.0717,-.0991,-.1568,-.2441,-.2998,-.3322,-.3387,-.2989,-.2829,-.2625,-.1014,.0024,.1032,.1087,.1193,-.0308,-.1049,-.1134,-.0997,-.0801,-.0909,-.1087,-.1128,-.1207,-.1462,-.1666,-.1496,-.1133,-.0732,-.0465,.0016,.0151,.0312,.0457,.0666,.0858,.0967,.1043,.1186,.136,.1449,.1514,.1559,.1629,.1714,.1793,.1863,.1967,.2076,.214,.2186,.2246,.2347,.2489,.2635,.2747,.2783,.2736,.2753,.2749,.2696,.2595,.25,.2425,.2327,.2211,.2114,.2064,.2041,.1995,.1916,.1812,.1709,.1632,.1546,.1415,.1258,.1112,.0963,.0857,.0667,.0435,.0183,-.0107,-.0307,-.0647,-.0646,-.0829,-.1003,-.1245,-.1153,-.0329,.0197,.0196,-.0097,-.0624,-.1396,-.0841,-.0762,-.0707,-.0626,-.0717,-.0811,-.1226,-.1885,-.2516,-.2849,-.2852,-.2187,-.1745,-.2126,-.1867,-.0681,-.0301,.0083,-.0368,-.1034,-.1099,-.1048,-.1046,-.0646,-.0595,-.0668,-.062,-.0597,-.083,-.0806,-.0735,-.0584,-.0427,.0103,.0309,.0386,.0512,.0641,.079,.0941,.1051,.1146,.1302,.1424,.1521,.1587,.1592,.1612,.1675,.1742,.1812,.1964,.2097,.2181,.2242,.2315,.2388,.2489,.2656,.281,.2871,.276,.2777,.278,.2727,.2627,.2503,.2377,.2264,.2174,.2125,.2089,.2031,.195,.1873,.1823,.1773,.1672,.1534,.1399,.1276,.1195,.1047,.0868,.0707,.0511,.0374,.0261,.0097,-.0126,-.034,-.047,-.072,-.0774,-.0952,-.1095,-.096,-.0923,-.1088,-.1036,-.0895,-.0584,-.0393,-.0248,-.0467,-.0629,-.0759,-.0766,-.0994,-.1532,-.1987,-.1984,-.0684,-.032,-.0578,-.1213,-.1343,-.122,-.1024,-.1141,-.1098,-.12,-.0986,-.1015,-.081,-.0652,-.0539,-.0372,-.0317,-.0371,-.043,-.0223,-.0115,.0056,.0361,.0545,.0626,.0721,.0782,.087,.0999,.1093,.1254,.1424,.1479,.1548,.1588,.159,.1615,.1675,.1731,.1831,.1992,.2122,.2215,.2331,.2444,.2513,.2592,.2741,.2871,.2902,.2804,.2829,.2836,.2773,.2669,.2543,.2404,.2289,.2225,.2208,.2163,.2066,.1935,.1806,.1792,.1827,.1761,.1592,.1437,.1335,.1267,.116,.0968,.0822,.0706,.0597,.0498,.0363,.0203,.006,-4e-4,-.0353,-.0519,-.0487,-.0541,-.0626,-.0627,-.0668,-.0547,-.0315,-.0102,.0135,.0197,.0165,-.0088,-.0346,-.0414,-.0517,-.0839,-.1047,-.0991,-.0126,.0815,.0245,-.0999,-.1044,-.1037,-.0994,-.1199,-.1032,-.1087,-.1091,-.0828,-.0799,-.0587,-.0385,-.0401,-.0245,-.0222,.0016,.0157,.0229,.0329,.0504,.0687,.0824,.0907,.0911,.0949,.1029,.1119,.1313,.1486,.1522,.1554,.1566,.1582,.1653,.1732,.1777,.189,.2065,.2194,.2276,.2408,.2555,.2637,.2698,.2794,.2847,.2837,.288,.2889,.2891,.2835,.2747,.2644,.2532,.2431,.2371,.2337,.2268,.2151,.1989,.1817,.1783,.1848,.1824,.1668,.1506,.1405,.1327,.1225,.11,.0954,.084,.0745,.0633,.0556,.0478,.0364,.0265,.0182,.011,.0054,5e-4,.0037,-.0022,-.0054,.0014,.0145,.0329,.0432,.0444,.0438,.0307,.0193,.0114,-.0074,-.0308,-.0404,-.0434,-.0106,.0744,-2e-4,-.0675,-.074,-.0843,-.0844,-.1046,-.1098,-.0976,-.1031,-.0934,-.0749,-.0604,-.0339,-.0223,-.0055,.0083,.0293,.0452,.0526,.0558,.0676,.0864,.0994,.1065,.1077,.1079,.1126,.1239,.142,.1504,.1545,.1582,.1595,.162,.1706,.1819,.1873,.1965,.2133,.2264,.2348,.2466,.2609,.2694,.2752,.2802,.2801,.2783,.2933,.2905,.2897,.2864,.2796,.2722,.2642,.2554,.2478,.2425,.2352,.2233,.2066,.1898,.1817,.1843,.1834,.171,.1564,.1494,.1449,.1332,.1201,.1057,.0942,.0875,.0818,.0762,.0696,.0658,.0629,.0523,.0443,.0448,.042,.039,.0335,.0267,.036,.0492,.0597,.0632,.0654,.0682,.0595,.0479,.0416,.0339,.0237,.0115,-.0014,4e-4,.001,-.027,-.0385,-.0436,-.0615,-.083,-.0991,-.0985,-.0754,-.0792,-.0729,-.0418,-.0222,-.0277,-.0095,.0113,.0334,.0531,.0668,.0745,.0795,.0928,.109,.1143,.1158,.1172,.1155,.1245,.1442,.1562,.1608,.1659,.1702,.1712,.1728,.1812,.1925,.1999,.2092,.2228,.2343,.2418,.2512,.2645,.2748,.2812,.2832,.2802,.2788,.2944,.2906,.289,.2866,.2821,.2759,.2685,.2601,.2524,.2472,.2419,.2313,.2149,.2001,.1903,.1877,.1859,.1768,.1637,.1595,.1586,.1482,.133,.1213,.1078,.1011,.1031,.0983,.0889,.0883,.0884,.0773,.0687,.0681,.0638,.0578,.0546,.0547,.0601,.0707,.0765,.0727,.0756,.0842,.0823,.0712,.0646,.0626,.0596,.0499,.0437,.0382,.0329,.0306,.0208,.0051,-.0268,-.0645,-.0767,-.0787,-.0734,-.0713,-.0533,-.0444,-.0249,-.0028,.0121,.0317,.0507,.0646,.0768,.0879,.0969,.1093,.1204,.121,.1173,.1072,.1171,.1402,.1582,.1729,.1784,.1821,.1834,.1844,.1889,.1971,.2063,.2154,.2239,.234,.2439,.2495,.2563,.2682,.2795,.2852,.2846,.2808,.2804,.2992,.2966,.2938,.2889,.2821,.2752,.2683,.262,.2561,.2522,.2495,.2402,.2242,.2098,.2,.1964,.1949,.1865,.1776,.1734,.1704,.1612,.1495,.1368,.126,.117,.1196,.1218,.1156,.1162,.1154,.106,.0965,.0912,.0868,.0794,.0755,.0794,.0832,.0908,.0953,.0889,.086,.0919,.0941,.0884,.0835,.0851,.0844,.0755,.07,.067,.0622,.06,.0475,.0267,.005,-.0512,-.0623,-.0652,-.0507,-.0297,-.0214,-.0204,.0019,.0241,.0414,.0558,.0684,.0764,.0841,.0944,.1035,.1142,.1274,.1366,.1367,.1286,.1367,.1531,.1722,.1859,.1896,.1885,.1886,.193,.2025,.2123,.2225,.2319,.2374,.2435,.251,.2552,.2607,.2704,.2805,.2852,.2847,.2826,.2824,.3103,.3068,.3015,.2923,.2808,.2714,.2669,.2638,.2586,.2545,.254,.2482,.2343,.22,.211,.2067,.2061,.2024,.1922,.1865,.1789,.1684,.1577,.1465,.1387,.1419,.1438,.1444,.1398,.1401,.14,.1359,.1271,.12,.1173,.1086,.1008,.1006,.1032,.1078,.1108,.1085,.1074,.1113,.1136,.1076,.1015,.1053,.1084,.1004,.092,.0876,.0812,.0756,.0611,.0389,.0211,.005,-.0144,-.0326,-.0238,.0032,.0108,.01,.0218,.0425,.057,.0702,.0851,.0937,.0999,.1102,.1205,.1305,.1436,.1581,.1634,.1628,.1583,.1631,.1787,.1913,.1914,.1872,.187,.1938,.2061,.2196,.2321,.2419,.2463,.25,.2542,.2565,.2609,.269,.2803,.2881,.2899,.2885,.2869,.3221,.3168,.3089,.2987,.2855,.2735,.2691,.2669,.2608,.2567,.2578,.2559,.2453,.2307,.2216,.2184,.2188,.2181,.2085,.1944,.1839,.1729,.162,.1528,.1481,.1499,.1526,.1508,.1468,.1471,.1536,.1544,.1466,.1396,.1372,.1299,.1224,.1227,.1239,.1213,.1185,.1195,.1243,.1302,.1327,.1272,.1219,.1256,.1299,.1244,.1177,.1123,.1009,.0874,.0717,.0551,.0424,.0319,.0249,.0206,.0184,.024,.0304,.0344,.0474,.0574,.0653,.0826,.0986,.105,.113,.1276,.1388,.1458,.1547,.1661,.1715,.1691,.1672,.1679,.1778,.1925,.195,.1883,.188,.1957,.2075,.2214,.2343,.2441,.2489,.2527,.2545,.2552,.2591,.2673,.2815,.2942,.2989,.298,.2958,.3284,.3229,.3155,.3068,.2946,.2812,.2735,.2687,.2624,.2598,.2631,.2641,.2557,.2393,.2284,.2273,.2289,.2285,.2198,.2056,.1921,.1791,.1699,.1623,.158,.1548,.153,.1536,.1532,.1541,.1605,.1626,.1581,.1539,.15,.1444,.1404,.1391,.1398,.1367,.1333,.1376,.1433,.1443,.1432,.1401,.1383,.1386,.1377,.1347,.1337,.1303,.1187,.1052,.0955,.0846,.0723,.062,.057,.053,.0515,.056,.0618,.0679,.079,.0827,.0847,.0979,.1076,.1102,.1199,.1366,.1466,.1528,.1626,.1696,.1699,.1663,.1658,.1734,.1838,.1931,.198,.1946,.1973,.2059,.2147,.2236,.2318,.2398,.247,.2531,.2554,.2567,.2617,.2699,.2835,.2984,.3071,.309,.307,.3266,.3236,.3192,.3116,.2994,.2853,.275,.2689,.264,.2617,.2651,.2676,.2622,.2471,.235,.2332,.2352,.2341,.2252,.2131,.2025,.1931,.1832,.1752,.1681,.1622,.1589,.1602,.1614,.1618,.1635,.1644,.1628,.1619,.1586,.1544,.1524,.1499,.1495,.1494,.1512,.1583,.1618,.1566,.1525,.1531,.1546,.154,.1496,.1439,.1404,.136,.1286,.124,.123,.1158,.106,.1002,.0919,.0843,.0837,.0872,.0913,.0968,.1047,.1058,.1052,.112,.1163,.1201,.131,.1428,.1498,.1561,.1644,.1674,.1658,.1647,.1673,.1792,.1967,.2033,.2059,.209,.2135,.2191,.2229,.2253,.2276,.234,.2454,.2571,.2631,.2664,.2705,.2748,.2837,.2969,.3076,.313,.3136,.3224,.3235,.324,.3158,.3003,.285,.2748,.2704,.2677,.2641,.2645,.2667,.2653,.2561,.2446,.2408,.2415,.2363,.2254,.2173,.2138,.2108,.2034,.1898,.1795,.1737,.1717,.1708,.1704,.1688,.1676,.1677,.1667,.1667,.167,.1667,.1685,.1666,.1634,.1632,.1676,.1751,.1737,.164,.1596,.1626,.1672,.1689,.1647,.1558,.1479,.1441,.1432,.1449,.1443,.1378,.1309,.1254,.1158,.1094,.1102,.11,.112,.1185,.1252,.1259,.1267,.1299,.1284,.1296,.1361,.1424,.1493,.1576,.1659,.169,.1692,.1715,.1761,.1879,.2042,.2174,.2191,.2202,.2277,.2298,.2299,.2303,.2302,.2351,.2488,.2656,.2766,.2806,.2816,.2811,.2826,.289,.2978,.3062,.3119,.3207,.3251,.3288,.3203,.3034,.2883,.2794,.2759,.2733,.269,.2678,.269,.2699,.264,.253,.2463,.2425,.2334,.2231,.2201,.223,.2247,.2187,.2073,.196,.1897,.1888,.1846,.1807,.179,.1781,.1782,.1763,.1756,.1783,.182,.1861,.1858,.1811,.1774,.1805,.1853,.1805,.168,.1622,.1658,.172,.1757,.1736,.1654,.1574,.1542,.1549,.1554,.1541,.151,.1457,.1391,.1331,.1343,.1409,.1402,.1374,.1392,.1413,.1411,.1423,.144,.1407,.139,.142,.1456,.1526,.1634,.1747,.1812,.1827,.1832,.187,.1936,.2045,.2177,.2266,.227,.23,.2366,.2378,.2399,.2405,.2443,.2539,.2692,.2826,.2885,.2888,.2862,.2823,.2826,.289,.2986,.307,.3235,.3267,.33,.3234,.3095,.2975,.2889,.2835,.2792,.2755,.2755,.2762,.2763,.2708,.2587,.2484,.2411,.2319,.2246,.2226,.227,.2313,.2271,.2204,.215,.2105,.2059,.1974,.1915,.1914,.1932,.1964,.1961,.1928,.1914,.1935,.1951,.1932,.1891,.1862,.1869,.1875,.1806,.1688,.1635,.1663,.1715,.1758,.1769,.1747,.1704,.1664,.163,.1593,.1574,.1569,.1544,.1512,.1514,.1578,.1656,.1651,.1581,.1513,.1484,.1482,.1511,.1549,.154,.1514,.1523,.1568,.1646,.1737,.1846,.1921,.193,.1923,.1916,.194,.2012,.2135,.2265,.2316,.2323,.2377,.2453,.2474,.2495,.2526,.2572,.2671,.2797,.2877,.2891,.2871,.2838,.2839,.2909,.3001,.3082,.3301,.329,.3279,.3227,.3156,.3082,.298,.2899,.2855,.2844,.2852,.2848,.2829,.2775,.2655,.2539,.2457,.2386,.2323,.2296,.2338,.2384,.2355,.2322,.23,.2261,.22,.2115,.2066,.2065,.2073,.2119,.2151,.2108,.2042,.2019,.1998,.1963,.1949,.1946,.1938,.1921,.1841,.172,.1666,.168,.1726,.1774,.1817,.1848,.1846,.1801,.1741,.1696,.1682,.1668,.164,.1637,.1671,.1724,.1774,.1769,.1705,.1626,.1581,.1582,.1621,.1677,.1686,.1635,.1618,.1677,.1758,.1821,.1893,.1983,.1999,.1989,.1981,.1969,.2012,.2137,.227,.2351,.2394,.2445,.2505,.2555,.2569,.2589,.2621,.2691,.2808,.29,.2914,.2902,.2908,.2939,.3013,.3087,.3151,.3365,.3322,.3265,.3206,.3173,.3128,.3027,.2942,.293,.2948,.2952,.2924,.2874,.2819,.2725,.2612,.2532,.2498,.2463,.2443,.2464,.248,.2457,.2443,.2436,.2413,.2337,.2239,.22,.2188,.217,.2197,.2249,.2224,.2156,.2107,.2051,.2013,.2034,.2056,.2048,.2039,.2013,.1912,.1796,.1774,.1827,.1894,.1956,.1993,.2008,.1966,.1887,.1854,.1847,.1807,.1759,.1756,.1785,.1818,.184,.1821,.1789,.1768,.1758,.1755,.1787,.1847,.1866,.1779,.1732,.1793,.1866,.191,.1965,.2,.201,.2062,.2105,.2084,.2108,.2221,.2334,.2414,.2517,.2565,.2607,.2661,.2681,.2673,.2697,.278,.2915,.3022,.3038,.3018,.3039,.3088,.3145,.3184,.3204,.3445,.3406,.3327,.3242,.3193,.3148,.3071,.3011,.3027,.3062,.3048,.2988,.2929,.2875,.2794,.269,.2634,.2643,.2642,.2609,.2583,.2565,.2546,.2531,.2534,.2517,.2429,.2329,.2298,.2285,.2254,.2262,.2312,.2326,.2304,.2252,.2162,.2112,.2145,.2168,.2168,.2192,.2228,.2159,.2016,.1945,.1977,.2047,.2103,.2139,.2161,.2126,.2062,.2043,.2034,.1969,.1898,.1891,.1903,.1925,.193,.1871,.184,.1874,.1926,.195,.1996,.2089,.2123,.2049,.1978,.1966,.1985,.2028,.2062,.2054,.2079,.2178,.2251,.224,.2257,.234,.2433,.2516,.2607,.2705,.2721,.2738,.2776,.279,.2831,.2932,.3062,.316,.3171,.3146,.3175,.3225,.3252,.3256,.325,.3549,.3525,.3448,.3341,.3271,.3228,.3173,.3116,.3113,.3145,.3133,.3076,.3033,.2987,.2908,.2818,.2793,.2813,.2788,.2712,.2654,.2636,.2617,.2581,.2563,.2536,.2458,.239,.2364,.2347,.2324,.2351,.241,.2459,.2496,.2468,.2358,.2264,.2249,.2251,.2261,.2315,.238,.2346,.2211,.2132,.2159,.2231,.2274,.2288,.2286,.225,.2195,.2167,.2138,.2073,.2017,.1995,.1969,.1977,.1995,.1945,.1894,.1939,.2038,.2121,.2189,.2268,.2309,.229,.2239,.217,.2129,.2155,.2182,.2186,.224,.2349,.2405,.239,.2379,.2417,.2504,.2589,.265,.2731,.2793,.276,.278,.2886,.2972,.3081,.3179,.323,.3237,.3241,.3277,.3313,.3318,.3323,.3332,.3616,.3621,.3571,.3464,.3378,.333,.3276,.3202,.3167,.3185,.3188,.3164,.3143,.3114,.3048,.2975,.2951,.295,.2889,.2785,.2706,.269,.2677,.263,.258,.2536,.2492,.2461,.2442,.2436,.2436,.2466,.2529,.2599,.2654,.264,.2533,.2412,.2323,.2282,.2298,.2366,.2453,.2466,.2368,.2287,.2309,.2383,.2419,.2391,.2338,.2294,.2252,.2214,.2194,.2166,.2134,.2092,.2021,.1987,.2003,.1991,.1965,.2023,.2131,.222,.23,.2371,.24,.2412,.2402,.235,.2288,.2276,.2282,.2313,.2402,.2514,.2561,.2539,.2497,.2496,.2568,.2636,.2669,.2719,.2774,.2799,.2807,.2878,.3017,.3132,.3227,.3263,.3269,.3299,.3336,.335,.3355,.3385,.3431,.3625,.367,.366,.357,.3463,.3392,.3325,.3249,.3197,.3206,.3232,.3224,.3203,.3188,.3151,.3083,.3039,.3014,.2944,.2833,.2755,.2747,.2747,.2706,.2638,.2587,.2558,.2528,.2522,.2558,.2589,.261,.2659,.2719,.2741,.2677,.2571,.2476,.2386,.233,.2329,.2375,.246,.2519,.2491,.2436,.2443,.2477,.2477,.2427,.2363,.2344,.2327,.2282,.228,.2299,.2284,.2214,.2114,.2062,.2062,.2049,.2056,.2136,.222,.2281,.2357,.2417,.2427,.2435,.2463,.2475,.2448,.2406,.2383,.2418,.2511,.2635,.2708,.2691,.2635,.2612,.2658,.271,.2734,.2762,.2799,.285,.2881,.2883,.2955,.3106,.3218,.3274,.3297,.334,.337,.337,.3376,.3423,.3506,.3604,.3643,.3658,.3608,.3524,.345,.337,.3284,.3214,.3214,.326,.3254,.3213,.3197,.3182,.3132,.3089,.3054,.2971,.2871,.2826,.2829,.2819,.2782,.2737,.2703,.2659,.2607,.2598,.2657,.2714,.2749,.2788,.2811,.2785,.2669,.2557,.252,.2496,.2457,.2433,.2448,.2511,.2584,.2614,.2594,.2574,.2547,.2489,.2434,.2406,.2432,.2457,.2429,.241,.241,.2391,.231,.2223,.2202,.2198,.2177,.2202,.2267,.2309,.2351,.2417,.2448,.2434,.2436,.2497,.2579,.2608,.2564,.2512,.2508,.2571,.2708,.2824,.2826,.2779,.276,.2807,.2864,.2883,.2888,.2889,.2918,.2965,.2958,.2964,.3058,.3195,.3268,.331,.3354,.3368,.3364,.337,.3441,.3556,.359,.3586,.3592,.3579,.3573,.3544,.3462,.3349,.3249,.3228,.327,.3259,.3203,.3182,.3183,.3166,.3152,.3114,.3017,.2936,.292,.2905,.2872,.2846,.2838,.2822,.2766,.2698,.2677,.2733,.2801,.2852,.2883,.2871,.2818,.2706,.2605,.2583,.2596,.2586,.256,.2585,.2645,.2704,.2734,.2707,.2661,.2608,.2531,.2476,.2461,.2498,.256,.2569,.2531,.2477,.2445,.2398,.2346,.2343,.2345,.2338,.2372,.2405,.2406,.2433,.2492,.25,.2463,.2458,.2533,.2655,.2726,.2715,.2666,.2628,.2654,.2778,.2906,.2932,.2901,.2897,.297,.3045,.3054,.3029,.3004,.3014,.3055,.3084,.3062,.3092,.3206,.329,.3311,.3325,.3314,.3316,.336,.345,.3561,.3625,.3599,.3577,.3574,.362,.3643,.3574,.3455,.3342,.3302,.3318,.329,.3229,.3207,.3216,.3229,.3225,.3169,.307,.3017,.302,.3,.2957,.2933,.2932,.2916,.2859,.2794,.2764,.2812,.2889,.2941,.296,.2927,.2875,.2795,.2698,.264,.2649,.267,.2681,.2735,.279,.2805,.2796,.2755,.2708,.2678,.2615,.2556,.2532,.2563,.2628,.2664,.2627,.255,.2514,.2506,.2485,.2468,.2454,.2449,.2486,.2516,.2512,.2537,.258,.2586,.255,.2531,.2589,.2711,.281,.2837,.281,.2767,.2782,.2861,.2927,.2946,.2945,.2976,.3066,.3138,.3134,.3097,.3075,.3108,.3159,.3187,.3218,.3194,.324,.3312,.3324,.3297,.3279,.331,.3387,.3467,.3534,.3734,.3715,.3676,.3639,.3673,.371,.3663,.357,.3471,.3426,.3417,.3368,.3295,.3257,.3278,.3308,.3294,.3212,.3115,.3075,.3096,.3114,.3099,.3073,.3062,.304,.2979,.2913,.2877,.2915,.2985,.3025,.3035,.3013,.2992,.2947,.2835,.2746,.2743,.2781,.2826,.289,.2913,.2867,.2808,.2756,.2735,.2733,.2693,.2644,.2637,.2675,.2722,.272,.2668,.2609,.2602,.263,.2616,.2574,.2547,.2542,.2578,.2634,.2662,.2675,.2684,.2677,.2648,.2629,.2657,.2764,.2878,.2931,.2927,.2899,.291,.2937,.2924,.2909,.2936,.3014,.3108,.3153,.3134,.3095,.3091,.3165,.3248,.3288,.3324,.3337,.3288,.3286,.3299,.3299,.3315,.3377,.346,.3516,.3542,.3887,.3865,.3801,.3723,.3714,.3725,.3698,.365,.359,.3542,.3504,.3437,.3359,.3318,.3346,.3382,.3346,.3256,.3165,.3116,.3153,.3228,.3249,.3223,.3206,.3172,.3104,.3036,.3002,.3018,.3066,.3095,.3101,.3118,.3157,.3139,.3014,.29,.289,.2944,.3011,.3056,.3029,.2941,.2837,.2766,.2759,.276,.2733,.2706,.2715,.2754,.2785,.2746,.2679,.2668,.2726,.2778,.275,.2683,.2662,.2672,.2708,.276,.2788,.2788,.2781,.2762,.2728,.271,.2723,.2811,.2924,.2994,.3024,.3028,.3038,.303,.2971,.2921,.2931,.3022,.3119,.3132,.3089,.3057,.3085,.3181,.3274,.3325,.3379,.3405,.3374,.3291,.326,.3308,.3378,.3469,.3563,.3605,.3598,.4014,.3977,.3894,.3812,.3765,.373,.3696,.3679,.3673,.3642,.358,.349,.3398,.3362,.3403,.3432,.3392,.3318,.3236,.3187,.3237,.3323,.335,.3336,.3315,.3282,.3224,.3152,.3103,.3095,.3116,.3141,.3151,.3192,.326,.3262,.3154,.3045,.3033,.3102,.3183,.3202,.3145,.3052,.2943,.2857,.283,.2823,.2802,.2785,.2776,.2782,.2808,.2798,.2759,.278,.2886,.2947,.29,.2807,.2776,.2793,.2825,.2859,.2891,.29,.2897,.2875,.2824,.2792,.2799,.2869,.2975,.3058,.3108,.3131,.3133,.3105,.3038,.2978,.297,.3048,.3131,.3118,.3063,.3053,.3108,.3186,.3239,.3281,.3353,.3419,.3424,.3394,.3337,.3343,.3429,.3542,.364,.3681,.3653,.4054,.4019,.3976,.3932,.3868,.3784,.3711,.3688,.3719,.3731,.3668,.3552,.3435,.3395,.3443,.3474,.3451,.3402,.3335,.3296,.332,.335,.3351,.3367,.3384,.3381,.3341,.3257,.3183,.3157,.316,.317,.317,.3204,.3267,.3288,.3231,.3144,.313,.3199,.3262,.3258,.3212,.3164,.311,.3041,.2993,.2974,.2958,.2931,.2871,.2826,.2854,.2904,.2919,.2955,.3047,.3092,.3033,.2929,.2872,.2876,.2899,.2945,.3016,.3048,.3034,.2989,.2923,.2879,.2874,.2927,.3041,.3145,.3187,.3192,.3192,.3171,.3116,.3061,.3046,.3096,.3145,.3131,.311,.3141,.3214,.3251,.323,.3235,.3298,.3385,.346,.3499,.3521,.3487,.3497,.3576,.3662,.371,.3705,.4076,.4042,.4042,.4044,.3984,.388,.3782,.3731,.3766,.3797,.3736,.362,.3507,.3461,.348,.3495,.3487,.3465,.3437,.3429,.342,.3368,.3318,.3337,.3406,.3461,.3445,.3356,.3265,.3225,.322,.3215,.3199,.321,.3244,.3264,.3218,.3144,.3148,.3221,.3257,.324,.3209,.3212,.3235,.3209,.3162,.3147,.3133,.3085,.299,.2915,.2934,.3007,.3055,.3091,.3141,.3156,.3087,.2978,.2915,.2916,.2951,.3029,.3127,.3167,.3128,.3062,.2998,.2952,.2938,.2983,.3098,.3202,.3225,.3216,.3231,.3237,.3201,.3151,.311,.3113,.3142,.3162,.3204,.3279,.3367,.3387,.3332,.3296,.3325,.3416,.3538,.363,.367,.3682,.3627,.3604,.3645,.3707,.3759,.4106,.406,.4088,.4121,.4064,.3954,.3858,.3803,.3816,.3839,.3789,.3704,.3618,.3557,.3524,.3499,.3496,.3504,.3524,.3558,.3546,.3464,.3367,.3348,.3422,.3503,.3511,.3444,.3353,.3302,.33,.3291,.325,.3228,.3242,.3228,.3162,.311,.3156,.3246,.3266,.3227,.3195,.3216,.3271,.3284,.326,.326,.3257,.3213,.3124,.3045,.3035,.3071,.3103,.3119,.3157,.3167,.3094,.2986,.2933,.2944,.3005,.3101,.319,.3208,.3157,.3101,.3057,.3035,.304,.3072,.3148,.3221,.3249,.3265,.3295,.3304,.3272,.3225,.3164,.3133,.3176,.326,.3338,.3411,.3492,.3532,.3495,.3445,.3435,.3501,.3633,.3737,.3772,.3781,.3779,.3684,.3634,.3691,.3787,.4143,.4089,.4124,.4166,.4119,.4009,.3923,.387,.3851,.385,.3824,.3789,.3733,.3664,.3602,.3555,.3555,.3576,.3612,.3663,.3673,.3611,.3503,.3444,.3477,.3537,.3553,.351,.345,.3415,.3408,.3376,.3302,.3255,.3259,.3243,.3178,.3157,.324,.3324,.3323,.3259,.3212,.3224,.3278,.3309,.3299,.3297,.3304,.3286,.3227,.3155,.3102,.3094,.3103,.311,.315,.3175,.313,.3054,.3021,.3041,.31,.3165,.321,.3198,.3146,.3116,.3113,.3126,.3144,.3157,.32,.3266,.3321,.3355,.3376,.3367,.333,.3286,.3238,.3216,.3286,.3408,.3487,.3532,.3583,.3628,.3629,.3603,.357,.358,.3667,.3754,.3795,.3816,.3829,.3797,.3704,.3696,.3797,.4212,.4137,.4148,.4186,.4163,.4078,.4002,.3941,.3888,.3859,.3852,.3857,.3829,.3782,.3732,.3691,.3683,.3688,.3709,.3758,.379,.3752,.3647,.3567,.3578,.3625,.3636,.3598,.3556,.3542,.3524,.3467,.3378,.331,.3304,.3297,.3255,.3266,.3359,.3424,.3406,.3325,.3257,.3249,.3285,.3313,.3294,.3273,.3283,.328,.3251,.3206,.315,.3125,.313,.3147,.3184,.3215,.3204,.3179,.3174,.3197,.3225,.3238,.3246,.3225,.3178,.3165,.3176,.3185,.3188,.3197,.3237,.3319,.3394,.3417,.3402,.3375,.3351,.3335,.3337,.3362,.3441,.3547,.3601,.3594,.3607,.3637,.3678,.3707,.3687,.366,.3685,.3739,.3786,.3839,.3883,.3888,.3863,.3807,.3841,.4295,.4214,.42,.4226,.4218,.4159,.4092,.4037,.3983,.394,.3924,.3934,.3925,.3906,.3887,.3858,.3838,.3822,.3802,.3811,.3846,.3843,.3762,.3688,.3695,.3736,.3741,.3704,.3671,.3664,.3643,.3573,.3469,.3383,.3359,.3356,.335,.3392,.3481,.3523,.3491,.3394,.3302,.3288,.3334,.3362,.3324,.3279,.3279,.3274,.3268,.3267,.3255,.3242,.3251,.3269,.3287,.3297,.331,.3325,.3333,.3338,.335,.3356,.3357,.3341,.3308,.3294,.3295,.3269,.3232,.3238,.3277,.3348,.3424,.344,.3397,.3355,.3343,.3367,.3427,.3489,.356,.3644,.3663,.3591,.3556,.3575,.3648,.3727,.3751,.3742,.3759,.3796,.3837,.3891,.3952,.3994,.4008,.3996,.397,.4351,.429,.4277,.4298,.4305,.4265,.4201,.4153,.4118,.4086,.4062,.4047,.4027,.4024,.4022,.3991,.3962,.3933,.3864,.382,.3842,.3871,.383,.3774,.377,.38,.3802,.3774,.376,.3771,.3766,.3701,.359,.3489,.345,.345,.3468,.3513,.3567,.3578,.3529,.3436,.3366,.3365,.3418,.3458,.3427,.338,.3368,.3362,.3355,.3371,.3404,.3422,.3421,.3415,.3402,.3396,.3422,.3454,.3455,.3445,.3464,.3493,.3495,.3474,.3455,.3448,.3447,.3417,.3368,.3362,.3377,.3412,.3472,.349,.3433,.3382,.3387,.3436,.3504,.3557,.3609,.3674,.3656,.3584,.3546,.3569,.3654,.3736,.3787,.3827,.3864,.3897,.3927,.396,.4006,.4067,.4127,.415,.4145,.4393,.4369,.4358,.4371,.4402,.4389,.4321,.4263,.4241,.423,.4215,.4172,.4121,.4121,.4131,.4095,.4037,.397,.3887,.3838,.3852,.3874,.3859,.3811,.379,.381,.3814,.3789,.3784,.3823,.3862,.3827,.3736,.3633,.3575,.3567,.3587,.3611,.3623,.3598,.3535,.3478,.3459,.3468,.3502,.3541,.3548,.3534,.3534,.3534,.3503,.3489,.3527,.3562,.3561,.3532,.3499,.3487,.3518,.3558,.3557,.3546,.3559,.3584,.3577,.3537,.3519,.3524,.3553,.3565,.3552,.3556,.3549,.3538,.3563,.3563,.3509,.348,.3513,.3564,.3595,.3605,.3632,.3664,.3644,.364,.3657,.3689,.375,.3804,.385,.3912,.3962,.3992,.4014,.4021,.4046,.4117,.4208,.4239,.4225,.445,.4452,.4439,.4429,.4461,.4469,.4404,.4347,.4339,.4334,.4304,.4243,.4189,.4197,.4215,.4175,.408,.3969,.3898,.389,.392,.3946,.3932,.3866,.3808,.3804,.3806,.379,.38,.3852,.3902,.3892,.3841,.3752,.3676,.3662,.3681,.3696,.3697,.3653,.3589,.3566,.3577,.3593,.3605,.362,.365,.3671,.3684,.3688,.3644,.3588,.359,.3616,.3635,.3618,.3574,.3556,.36,.366,.3669,.3653,.3636,.3632,.3606,.355,.3524,.3555,.3622,.3675,.3699,.3715,.3683,.3639,.3648,.3658,.3639,.3645,.369,.3723,.3712,.369,.3688,.3687,.3704,.3739,.3795,.3838,.387,.3891,.3914,.3978,.4041,.4073,.4067,.4047,.4063,.4148,.4246,.4269,.4254,.4547,.4537,.4513,.4498,.4518,.4523,.4473,.443,.4428,.4405,.4343,.4276,.4244,.426,.4274,.4231,.4121,.4016,.397,.3981,.4027,.4068,.4046,.3962,.3877,.3838,.3822,.3823,.3855,.3895,.3915,.3894,.3868,.3809,.3752,.3738,.3765,.3794,.3797,.3748,.3691,.37,.3737,.3762,.3762,.3742,.3752,.3775,.3784,.3776,.3716,.3645,.3612,.3622,.3653,.3651,.3611,.3589,.365,.3736,.376,.3737,.3699,.3663,.3629,.3572,.3546,.3583,.3653,.3703,.3743,.3766,.3726,.3691,.3727,.3781,.3823,.3857,.389,.3904,.3868,.3788,.3788,.3811,.3812,.3841,.3909,.3961,.397,.3947,.393,.3978,.4062,.411,.4088,.4063,.4095,.4189,.4288,.4317,.4303,.4669,.4634,.4609,.4603,.4609,.4602,.4563,.4529,.4514,.4477,.4401,.4324,.4283,.4283,.4295,.4275,.4201,.4138,.4109,.4103,.4131,.417,.4155,.4096,.403,.3971,.3934,.3942,.3975,.3984,.3963,.3921,.3895,.3845,.382,.3814,.3852,.3897,.39,.3852,.382,.3862,.3911,.392,.3895,.3846,.3836,.3867,.3877,.3834,.3759,.3714,.3685,.3679,.3687,.3677,.3641,.3618,.3665,.3751,.3789,.3785,.3759,.3716,.3671,.3627,.362,.3644,.3661,.367,.3709,.3753,.3754,.3762,.3821,.3899,.3983,.4024,.4044,.4037,.3967,.395,.3951,.3933,.3898,.3912,.3982,.4041,.4021,.3949,.391,.3948,.4046,.4118,.4107,.4097,.4152,.4268,.4382,.4422,.4398,.4771,.4726,.47,.4686,.4679,.4663,.4639,.4622,.4595,.4549,.4465,.4369,.4302,.4265,.4273,.429,.4279,.4261,.424,.4208,.4219,.4251,.4249,.4227,.4194,.415,.4116,.4123,.4142,.412,.4061,.3999,.3967,.3909,.39,.3901,.3933,.3967,.3969,.3944,.3947,.4005,.4039,.4006,.3943,.3892,.3886,.3934,.3965,.3921,.3856,.3852,.3835,.3811,.3793,.3768,.3713,.3669,.3689,.3754,.3806,.3849,.3863,.3824,.3769,.3734,.3751,.3766,.3737,.3701,.3725,.3784,.3828,.3881,.3949,.4026,.4108,.4141,.4077,.4054,.4101,.4108,.4074,.3993,.3924,.3934,.401,.4076,.404,.396,.3942,.3999,.4102,.4185,.4179,.4157,.4218,.4353,.4465,.4499,.448,.486,.4817,.4761,.4708,.4693,.4684,.468,.4676,.4641,.4583,.4506,.4424,.4367,.4315,.4309,.4338,.4339,.4323,.4316,.4314,.4342,.4366,.4345,.4313,.4292,.4264,.4231,.4241,.4273,.427,.4201,.4117,.4082,.4031,.4034,.4022,.4018,.402,.4017,.4014,.4039,.4102,.4136,.4079,.3971,.3913,.3929,.3986,.4038,.4022,.3992,.4,.3978,.3948,.3929,.3896,.3826,.3773,.3781,.3825,.3874,.3938,.3979,.3969,.3923,.3894,.3902,.3916,.3897,.3846,.3821,.3862,.3924,.4005,.4091,.4164,.4222,.4155,.4077,.4111,.4174,.4192,.413,.4027,.397,.3995,.4072,.4132,.4103,.4046,.4063,.4153,.4258,.4325,.4305,.4255,.4302,.4424,.4505,.4522,.4525,.4954,.4913,.4832,.4753,.4729,.4726,.4724,.4711,.4673,.4626,.4579,.4533,.4493,.4437,.4428,.4461,.4444,.4407,.4413,.4453,.4491,.4482,.4417,.4365,.4339,.4309,.4272,.4285,.4346,.4384,.4333,.425,.4198,.4189,.4202,.4162,.4111,.4079,.4067,.4081,.4119,.4183,.4232,.4174,.4038,.3972,.3999,.4053,.41,.4101,.4092,.4102,.4069,.4053,.403,.3972,.3912,.39,.3923,.3948,.3975,.4018,.4059,.4072,.4041,.4014,.4032,.4078,.4094,.4034,.3967,.3983,.4055,.4149,.4233,.4276,.4211,.4103,.4111,.4151,.4207,.4222,.4159,.4079,.4072,.4131,.4217,.4267,.4232,.4181,.4206,.4312,.441,.4442,.4408,.4367,.4416,.4509,.4549,.4549,.4565,.5025,.4989,.4921,.4848,.4816,.4813,.4808,.4785,.4756,.4737,.4709,.4676,.4633,.4578,.4576,.4613,.4597,.4554,.4575,.4627,.4637,.4575,.4469,.4395,.4358,.4338,.4321,.4333,.4382,.4427,.4409,.4362,.4277,.4316,.4329,.4273,.4198,.4138,.4109,.413,.4181,.4249,.4302,.4259,.4135,.4075,.41,.4131,.4145,.412,.4107,.4129,.4109,.4109,.4074,.3993,.3952,.3997,.4052,.4063,.4063,.407,.4083,.4081,.4054,.4058,.4125,.4215,.4256,.4203,.4132,.4144,.4225,.4327,.4408,.4357,.4136,.4106,.4136,.4198,.4257,.4281,.4232,.4173,.4192,.4287,.4389,.4415,.4358,.4312,.4339,.4425,.4484,.4467,.4437,.4457,.4551,.4631,.4633,.4599,.4604,.508,.5045,.4996,.4944,.4925,.4941,.4953,.4934,.4903,.4876,.4847,.4817,.4781,.4745,.4742,.4749,.4734,.4734,.4786,.4816,.4775,.468,.4564,.4471,.4416,.4394,.4391,.439,.4402,.4441,.4461,.4439,.4362,.4402,.4397,.4337,.4265,.4203,.4156,.4156,.4201,.4268,.4319,.4314,.4242,.4191,.418,.4171,.4157,.4111,.4082,.4105,.4117,.4114,.4082,.4016,.4014,.4109,.4187,.4195,.4172,.4134,.4093,.4065,.4056,.4087,.4169,.427,.4332,.4317,.4262,.4265,.4343,.445,.4522,.4319,.4217,.4147,.4172,.4243,.4324,.4368,.4342,.4299,.4333,.4429,.4512,.4503,.4446,.4435,.4471,.4512,.4501,.4439,.4422,.4515,.4669,.4757,.4742,.4687,.4673,.5107,.5079,.5046,.5035,.506,.5109,.5135,.512,.5074,.5029,.5003,.4985,.497,.4949,.4931,.4903,.4883,.4909,.496,.4951,.4877,.4786,.4683,.4593,.4527,.448,.4452,.444,.4444,.4499,.4551,.4446,.4439,.4458,.4421,.4346,.4295,.4264,.4223,.4197,.4219,.4274,.4331,.4373,.4358,.431,.4259,.4215,.4194,.4162,.4136,.416,.4191,.415,.413,.4116,.4173,.4288,.4357,.4346,.429,.4209,.415,.4131,.4133,.415,.4214,.4318,.4409,.4441,.439,.4359,.4416,.4509,.4407,.4399,.4309,.4226,.4234,.4304,.4388,.4433,.4424,.4415,.4463,.4534,.4567,.4547,.4523,.4546,.4589,.4603,.4558,.4474,.4458,.4571,.4756,.4866,.4868,.483,.4815],waterLevel:0,waveScale:.1077134479080076,waves:["water-wave-a.png","water-wave-b.png"],adaptations:["Native terrain heights sampled at 2.4 source metres","All four treehouses, three bridges, terrain and water use the same origin and uniform scale","Only the outer 1.5 map metres blend into the shared desert edge"]};var pi={approach:{x:-1.8041071509290307,z:-9.234415682341485},shore:{x:-.4,y:.8,z:-11.2}},ur={x:-25,z:-31,width:56,depth:49},ft=(i,e,t)=>{let n=Math.max(0,Math.min(1,(t-i)/(e-i)));return n*n*(3-2*n)},Dt=(i,e,t)=>i+(e-i)*t;function wc(i,e){let t=Math.sin(i*127.1+e*311.7)*43758.5453;return t-Math.floor(t)}function ms(i,e){let t=Math.floor(i),n=Math.floor(e),s=ft(0,1,i-t),r=ft(0,1,e-n);return Dt(Dt(wc(t,n),wc(t+1,n),s),Dt(wc(t,n+1),wc(t+1,n+1),s),r)}function gg(i,e,t){let n=Math.max(0,Math.min(i.size-1,(e-i.x0)/i.step)),s=Math.max(0,Math.min(i.size-1,(t-i.z0)/i.step)),r=Math.min(i.size-2,Math.floor(n)),o=Math.min(i.size-2,Math.floor(s));return Dt(Dt(i.heights[o*i.size+r],i.heights[o*i.size+r+1],n-r),Dt(i.heights[(o+1)*i.size+r],i.heights[(o+1)*i.size+r+1],n-r),s-o)}var d0=(i,e,t,n)=>{let s=n[0]-t[0],r=n[1]-t[1],o=Math.max(0,Math.min(1,((i-t[0])*s+(e-t[1])*r)/(s*s+r*r)));return Math.hypot(i-t[0]-o*s,e-t[1]-o*r)},f0=[[-5.4,6.8],[1.7,6.7],[6.1,4.4],[7.2,-.8],[6.5,-5.9],[3,-7.1],[.6,-8.4],[-3.4,-10.2],[-5.5,-11.9],[-13.4,-11.9],[-13.1,-6.5],[-8.8,-3.2],[-7.4,2.6],[-5.4,6.8]],_g=i=>-9.69+Math.sin((i+12.25)*.35)*.65+ft(-11,-5,i)*4.8;function wd(i,e=!0){function t(r,o){let a=1/0;for(let c=1;c<f0.length;c++)a=Math.min(a,d0(r,o,f0[c-1],f0[c]));return a=Math.min(a,d0(r,o,[6.5,-5.9],[13.7,-6.5])),e&&(a=Math.min(a,d0(r,o,[pi.approach.x,pi.approach.z],[pi.shore.x,pi.shore.z]),Math.hypot(r-pi.shore.x,o-pi.shore.z)-.35)),1-ft(.36,.95,a)}function n(r,o){let a=(ms(r*.58,o*.58)-.5)*.38+(ms(r*1.5,o*1.5)-.5)*.1,c=[[0,0,8.25],[-7.79,-13.5,8.8],[7.79,-13.5,9],[15.59,0,8.9]].map(([A,C,L])=>L-Math.hypot(r-A,o-C)),l=Math.max(...c)+(ms(r*.32,o*.32)-.5)*1.5,h=Dt(-2.8,.72,ft(-2,1.8,l))-7.2*(1-ft(-9,-2,l))+a*ft(-.1,2,l);if(h<-.35){let A=-h;h=-Dt(.35+(A-.35)*.72,A,ft(3.5,10,A))}let d=2.3*Math.exp(-(((r+10)/5.5)**2+((o+20)/3.5)**2))+1.15*Math.exp(-(((r+15)/2.8)**2+((o+14)/5)**2));h+=d*ft(.5,3.2,l);let u=Math.hypot(r,o*.97),p=Math.min(...[[-3.662,.646],[-.431,-.862],[1.723,1.508],[4.093,-1.077]].map(([A,C])=>Math.hypot(r-A,o-C))),g=gg(i,r,o)-.64*ft(.65,1.5,p);h=Dt(h,g,1-ft(5.6,7.15,u));let b=_g(o),m=Math.abs(r-b),f=Dt(1.18,1.85,ft(-18,-7,o)),v=(1-ft(f,f+1.05,m))*ft(-24,-22,o)*(1-ft(-5,-2.5,o));h=Dt(h,-.66+ms(r*.8,o*.8)*.1,v);let T=ft(-7.1,-4.8,o)*(1-ft(7.2,10.3,Math.hypot((r-16)*.88,o*.8)))*ft(8.1,11,r);h=Dt(h,-1.3,T);let y=1-ft(6.05,7.45,Math.hypot(r-7.79,(o+13.5)*1.06));h=Dt(h,-1.65,y);let S=1-ft(1.03,1.6,Math.max(Math.abs(r+5.29),Math.abs(o+16.1)));h=Dt(h,.85,S);let w=Math.exp(-(((r-13.67)/1.05)**2+((o+6.69)/1.15)**2));h=Dt(h,1.04,w);let R=e?1-ft(.95,1.55,Math.hypot(r-pi.shore.x,o-pi.shore.z)):0;h=Dt(h,pi.shore.y-.04,R);let x=Math.min(r-ur.x,o-ur.z,ur.x+ur.width-r,ur.z+ur.depth-o);return Dt(-10,h,ft(0,4,x))}function s(r,o){let a=n(r,o),c=Math.hypot(r,o),l=t(r,o);return ft(.22,.7,a)*(1-l)*Dt(.57,1,ms(r*.31,o*.31))*(1-.35*(1-ft(6.2,8.1,c)))}return{heightAt:n,pathAt:t,grassAt:s}}var g0=wd(Sd),Td=Yt(),p0=new Map,xg={lagoon:"coast",sakura:"blossom",tidewater:"coast",punk:"scifi"},m0=i=>Math.round(i*1e6)/1e6;function Tc(i){if(p0.has(i))return p0.get(i);let e=pn.find(c=>c.id===i);if(!e)throw Error("Unknown original tile.");let{q:t,r:n}=e,s=Mn(t,n,ut),r=Xn(t,n,"coast-01").boundaries,o=r.map((c,l)=>{let h=Td[l],d=Td[(l+1)%6],u=[];for(let m=1;m<24;m++){let f=m/24,v=s.x+(h[0]+(d[0]-h[0])*f)*ut,T=s.z+(h[1]+(d[1]-h[1])*f)*ut;c[m]>8&&g0.pathAt(v,T)>.45&&u.push({j:m,strength:g0.pathAt(v,T)})}let p=[];for(let m of u){if(u.some(T=>T.j===m.j-1))continue;let v=u.filter(T=>T.j>=m.j&&T.j<(u.find(y=>y.j>m.j&&!u.some(S=>S.j===y.j-1))?.j??25)).sort((T,y)=>y.strength-T.strength||Math.abs(T.j-12)-Math.abs(y.j-12))[0];p.push({kind:"path",t:v.j/24,width:22,y:v.strength?c[v.j]:24})}let g=[],b=-1;for(let m=0;m<=25;m++)m<25&&c[m]<0?b<0&&(b=m):b>=0&&(g.push({start:b/24,end:(m-1)/24}),b=-1);return{kind:"authored",start:c[0]>0?"land":"water",end:c[24]>0?"land":"water",samples:[...c],waterY:0,ports:p,waterSpans:g}}),a={version:3,builtin:i,q:t,r:n,variant:`authored-${i}`,rotation:0,legacyEdges:[],radius:300,mapScale:ut,recipe:{id:`authored-${i}`,title:e.title,layout:"authored",family:xg[i],description:`Original ${e.title} host terrain and its creator content.`},slot:{origin:{x:0,y:0,z:0},regions:[{x:0,z:0,radius:250}],radius:250,height:540,floorY:0,mapRadius:7.5,mapHeight:16.2},edges:o,boundaries:r,connections:{path:"authored",water:"authored",waterY:0}};return p0.set(i,a),a}var Ac=pn.map(i=>Tc(i.id));function Ad(i){return{...i,start:i.end,end:i.start,samples:[...i.samples].reverse(),ports:[...i.ports].reverse().map(e=>({...e,t:m0(1-e.t)})),...i.waterSpans?{waterSpans:[...i.waterSpans].reverse().map(e=>({start:m0(1-e.end),end:m0(1-e.start)}))}:{}}}var go={dunes:{title:"Dunes",land:"#c9ad78",sand:"#ebd49f",rock:"#a39176",path:"#e9dac0"},oasis:{title:"Oasis",land:"#9aa778",sand:"#dccb99",rock:"#9a9c83",path:"#e3cf9d"},coast:{title:"Coast",land:"#9ba884",sand:"#e1d0ab",rock:"#87928d",path:"#e8d9b8"},pine:{title:"Pine",land:"#648674",sand:"#c9c5a7",rock:"#7f9390",path:"#d0c6a4"},meadow:{title:"Meadow",land:"#92aa7d",sand:"#d8cbaa",rock:"#909b89",path:"#e0ccaa"},highland:{title:"Highland",land:"#899783",sand:"#c6c2ac",rock:"#899394",path:"#d0c6b1"},volcanic:{title:"Volcanic",land:"#59666a",sand:"#87887b",rock:"#657074",path:"#b0a68e"},canyon:{title:"Canyon",land:"#ba8d70",sand:"#d6b18a",rock:"#a57d69",path:"#e0be92"},tundra:{title:"Tundra",land:"#b4c7be",sand:"#cbd0bf",rock:"#8d9fa0",path:"#e1deca"},blossom:{title:"Blossom",land:"#96ab8b",sand:"#d4c9b2",rock:"#8c9d93",path:"#d9c0ae"},wetland:{title:"Wetland",land:"#7a9b86",sand:"#b9b79a",rock:"#7e9690",path:"#cec7aa"},basalt:{title:"Basalt",land:"#718784",sand:"#aaa996",rock:"#667d83",path:"#c4bdad"},urban:{title:"Urban",land:"#8d9995",sand:"#bdbaa8",rock:"#75848a",path:"#cdd0c4"},industrial:{title:"Industrial",land:"#727e80",sand:"#aeb09f",rock:"#536971",path:"#bac3bc"},scifi:{title:"Sci-fi",land:"#334c59",sand:"#829b9d",rock:"#253f4d",path:"#91aeb4"}},Rd=[{id:"commons",title:"Open commons",description:"A connected path around one generous building green.",wet:[],rivers:[],regions:[[0,0,140]],styles:["meadow","pine","blossom","tundra"]},{id:"pass",title:"Mountain pass",description:"A sheltered building terrace between two rocky ridges.",wet:[],rivers:[],regions:[[0,0,105]],styles:["highland","canyon","volcanic","basalt"]},{id:"oasis",title:"Oasis basin",description:"A crescent pool with a dry terrace along its western bank.",wet:[],rivers:[],regions:[[-55,0,108]],styles:["dunes","oasis"]},{id:"river",title:"River crossing",description:"A broad river, two building banks and connected footbridges.",wet:[],rivers:[0,3],regions:[[0,-136,62],[0,136,62]],styles:["meadow","blossom","pine"]},{id:"bend",title:"River bend",description:"A curved channel around a sheltered inner-bank building area.",wet:[],rivers:[0,2],regions:[[-55,-73,88]],styles:["blossom","wetland","oasis"]},{id:"fork",title:"River confluence",description:"Three channels meet between three small building terraces.",wet:[],rivers:[0,2,4],regions:[[62,-107,48],[62,107,48],[-124,0,48]],styles:["wetland","pine","tundra"]},{id:"estuary",title:"River mouth",description:"An inland river opens into the sea between two banks.",wet:[0,1],rivers:[3],regions:[[-25,-126,55],[-25,126,55]],styles:["coast","wetland","basalt"]},{id:"headland",title:"Headland",description:"A broad headland with beaches on two sea-facing sides.",wet:[0,1,2],rivers:[],regions:[[-60,-35,112]],styles:["coast","pine","volcanic"]},{id:"bay",title:"Sheltered bay",description:"A curved sandy inlet beside a compact building terrace.",wet:[0,1],rivers:[],regions:[[-76,0,98]],styles:["coast","dunes","oasis"]},{id:"harbor",title:"Harbor basin",description:"A sheltered water basin framed by stone quays and a promenade.",wet:[0,1],rivers:[],regions:[[-85,0,90]],styles:["urban","industrial","basalt"]},{id:"canal",title:"Canal quarter",description:"A straight canal, paved banks and two bridge-connected plots.",wet:[],rivers:[0,3],regions:[[0,-118,60],[0,118,60]],styles:["urban","industrial","scifi"]},{id:"skyport",title:"Floating platform",description:"A suspended deck with approach bridges and cyan support rings.",wet:[],rivers:[],regions:[[0,0,120]],styles:["scifi","industrial"]}],_0=Rd.flatMap(i=>i.styles.map(e=>({id:`${i.id}-${e}`,layout:i.id,family:e,title:i.title,color:go[e].land,description:i.description,orientation:0}))),Ec=Yt(),bg=i=>Math.max(0,Math.min(1,i)),Ed=i=>(i=bg(i),i*i*(3-2*i)),Sg=(i,e)=>{let t=e*Math.PI/3,n=Math.cos(t),s=Math.sin(t);return[i[0]*n-i[1]*s,i[0]*s+i[1]*n]};var wg=i=>`${i.q},${i.r}`,gs=i=>Math.round(i*1e6)/1e6;function Tg(i,e,t){let n=i!==e?"shore":i==="water"?"sea":t?"river":"land",s=Array.from({length:25},(r,o)=>{let a=o/24;if(n==="land")return 24;if(n==="sea")return-40;if(n==="river")return gs(24-56*(1-Ed((Math.abs(a-.5)*300-33)/26)));let c=i==="land"?a:1-a;return gs(24-64*Ed((c-.28)/.44))});return{kind:n,start:i,end:e,samples:s,waterY:0,ports:n==="land"?[{kind:"path",t:.5,width:22,y:24}]:n==="shore"?[{kind:"path",t:i==="land"?.18:.82,width:22,y:24}]:[],...n==="river"?{channel:{t:.5,width:66,bedY:-32}}:{}}}var mo=new Map;function Ag(i,e){let t=wg({q:i,r:e});if(mo.has(t))return mo.get(t);let n=Mn(i,e),s=Ec.map(r=>{for(let o of pn){let a=Mn(o.q,o.r);for(let c=0;c<6;c++)if(Math.hypot(a.x+Ec[c][0]-n.x-r[0],a.z+Ec[c][1]-n.z-r[1])<.001)return Xn(o.q,o.r,"coast-01").boundaries[c][0]}return null});return mo.size>512&&mo.clear(),mo.set(t,s),s}function Rc(i,e,t,n=0,s=[]){if(!Number.isInteger(i)||!Number.isInteger(e)||zi(i,e)>99)throw Error("Invalid tile coordinate.");if(!Number.isInteger(n)||n<0||n>5)throw Error("Rotation must be 0\u20135.");if(!Array.isArray(s)||s.some(f=>!Number.isInteger(f)||f<0||f>5))throw Error("Invalid legacy adapters.");let r=_0.find(f=>f.id===t);if(!r)throw Error("Unknown tile variant.");let o=Rd.find(f=>f.id===r.layout),a=new Set(o.wet.map(f=>(f+n)%6)),c=new Set(o.rivers.map(f=>(f+n)%6)),l=Xn(i,e,"coast-01"),h=[...new Set([...s,...Wn.flatMap(([f,v],T)=>pn.some(y=>y.q===i+f&&y.r===e+v)?[T]:[])])].sort(),d=Ec.map((f,v)=>Tg(a.has(v)?"water":"land",a.has((v+1)%6)?"water":"land",c.has(v)));for(let f of h){let v=l.boundaries[f],T=v.map((S,w)=>({y:S,j:w})).filter(S=>S.y>8&&S.j>2&&S.j<22),y=T.sort((S,w)=>Math.abs(S.j-12)-Math.abs(w.j-12))[0];d[f]={kind:"legacy",start:v[0]>0?"land":"water",end:v[24]>0?"land":"water",samples:[...v],waterY:0,ports:y?[{kind:"path",t:y.j/24,width:18,y:y.y}]:[]}}for(let f of h){let[v,T]=Wn[f],y=Ac.find(S=>S.q===i+v&&S.r===e+T);y&&(d[f]=Ad(y.edges[(f+3)%6]))}let u=[...Ag(i,e)];for(let f of h)u[f]=d[f].samples[0],u[(f+1)%6]=d[f].samples[24];for(let f=0;f<6;f++)if(!h.includes(f))for(let[v,T]of[[0,f],[24,(f+1)%6]]){if(u[T]===null)continue;let y=u[T]-d[f].samples[v];for(let S=0;S<=4;S++)d[f].samples[v===0?S:24-S]=gs(d[f].samples[v===0?S:24-S]+y*(1-S/5));d[f].samples[v]=u[T]}let p=o.regions.map(([f,v,T])=>{let y=Sg([f,v],n);return{x:gs(y[0]),z:gs(y[1]),radius:T}}),g=o.id==="skyport"?36:24,b={x:p[0].x,y:g,z:p[0].z},m=Math.max(...p.map(f=>Math.hypot(f.x-b.x,f.z-b.z)+f.radius));return{version:3,q:i,r:e,variant:t,rotation:n,legacyEdges:h,radius:fi,mapScale:ut,recipe:{...r},slot:{origin:b,regions:p,radius:gs(m),height:480,floorY:g,mapRadius:gs(m*ut),mapHeight:14.4},edges:d,boundaries:d.map(f=>f.samples),connections:{path:"connected",water:o.rivers.length?"connected":o.wet.length?"sea":"enclosed",waterY:0}}}var Cd=i=>i?.slot?.origin||{x:0,y:i?.slot?.floorY??24,z:0};var _s=[{id:"tropical-inlet",title:"Tropical inlet",family:"tropical",base:"bay-coast",kind:"inlet",wet:[0,1],rivers:[],regions:[[-78,-35,101]],description:"A turquoise inlet, pale sand, mangrove roots and palm-lined rock gardens."},{id:"alpine-pass",title:"Alpine pass",family:"alpine",base:"pass-highland",kind:"alpine",wet:[],rivers:[],regions:[[12,4,103]],description:"An open alpine meadow between sculpted granite shoulders and evergreen groves."},{id:"desert-oasis",title:"Desert oasis",family:"dunes",base:"oasis-dunes",kind:"oasis",wet:[],rivers:[],regions:[[-70,-10,105]],description:"Warm sandstone, wind-shaped dunes and palms around a clear spring."},{id:"tidal-wetland",title:"Tidal wetland",family:"wetland",base:"fork-wetland",kind:"wetland",floor:12,wet:[],rivers:[0,2,4],regions:[[-103,0,69],[55,-115,54]],description:"Winding tidal creeks, mangrove islands and short timber crossings."},{id:"autumn-woodland",title:"Autumn woodland",family:"autumn",base:"commons-meadow",kind:"woodland",wet:[],rivers:[],regions:[[18,5,124]],description:"An open woodland clearing surrounded by amber trees, mossy stones and branching paths."},{id:"basalt-coast",title:"Basalt coast",family:"basalt",base:"headland-volcanic",kind:"basalt",wet:[0,1,2],rivers:[],regions:[[-65,-43,108]],description:"Dark columnar cliffs above a deep cove, with weathered pines and hardy shrubs."},{id:"sakura-river",title:"Sakura river",family:"blossom",base:"river-blossom",kind:"sakura",wet:[],rivers:[0,3],regions:[[-28,-131,66],[30,129,64]],description:"Cherry-lined riverbanks, a red arched bridge and two open temple gardens."},{id:"sheltered-marina",title:"Sheltered marina",family:"coast",base:"harbor-urban",kind:"marina",wet:[0,1],rivers:[],regions:[[-109,0,94]],description:"A protected harbor with timber pontoons, a boulder breakwater and an open waterfront plot."},{id:"canal-quarter",title:"Canal quarter",family:"urban",base:"canal-urban",kind:"canal",wet:[],rivers:[0,3],regions:[[0,-130,67],[0,130,67]],description:"A navigable canal between clean stone quays, a masonry bridge and tree-lined streets."},{id:"coastal-terraces",title:"Coastal terraces",family:"limestone",base:"headland-coast",kind:"terraces",wet:[0,1,2],rivers:[],regions:[[-55,-60,99,49]],description:"Limestone terraces, broad stairs, cypress trees and a small rocky cove."},{id:"industrial-docks",title:"Industrial docks",family:"industrial",base:"harbor-industrial",kind:"docks",wet:[0,1],rivers:[],regions:[[-103,-8,90]],description:"A concrete working quay with cargo stacks, fenders, service rails and deep harbor water."},{id:"garden-boulevard",title:"Garden boulevard",family:"urban",base:"commons-meadow",kind:"boulevard",wet:[],rivers:[],regions:[[-128,-132,54],[128,-132,54],[107,135,56]],description:"An asphalt boulevard, generous paved plots, rain gardens and planted sidewalks."},{id:"circuit-deck",title:"Circuit deck",family:"scifi",base:"skyport-scifi",kind:"circuit",floating:!0,wet:[0,1,2,3,4,5],rivers:[],floor:84,regions:[[0,0,154,84]],description:"A charcoal floating deck with an oval race loop, teleport pads and cyan ring engines."},{id:"neon-docks",title:"Neon docks",family:"scifi",base:"skyport-scifi",kind:"neon",floating:!0,wet:[0,1,2,3,4,5],rivers:[],floor:84,regions:[[-31,-30,137,84]],description:"An asymmetric suspended dock, a service road and a broad open city deck."},{id:"sky-terraces",title:"Sky terraces",family:"scifi",base:"skyport-scifi",kind:"sky",floating:!0,wet:[0,1,2,3,4,5],rivers:[],floor:108,regions:[[-81,-78,86,108],[92,128,52,74]],description:"Two floating city terraces joined by a wide supported ramp, with pocket gardens."},{id:"open-water",title:"Open water",family:"water",base:"skyport-scifi",kind:"water",wet:[0,1,2,3,4,5],rivers:[],floor:0,regions:[[0,0,190]],description:"Uninterrupted open sea on all six sides, with a submerged seabed and a water-level build area for floating creations."}],_o={tropical:{title:"Tropical",land:"#769052",sand:"#e2d4af",rock:"#92958a",path:"#dbca9e"},alpine:{title:"Alpine",land:"#839265",sand:"#bcb696",rock:"#92928b",path:"#c9b890"},autumn:{title:"Autumn",land:"#8a9261",sand:"#b8a482",rock:"#898d7b",path:"#c9b38d"},limestone:{title:"Limestone",land:"#cabf9d",sand:"#dfd0ac",rock:"#b4ae96",path:"#e1d5b7"},water:{title:"Water",land:"#579f9d",sand:"#c8d7cf",rock:"#879b99",path:"#c8d7cf"}},Cc=_s.map(i=>({id:i.id,layout:i.id,family:i.family,title:i.title,description:i.description,orientation:0,color:_o[i.family]?.land||"#8b9b7a"}));var dr=(i,e)=>{let t=e*Math.PI/3,n=Math.cos(t),s=Math.sin(t);return[i[0]*n-i[1]*s,i[0]*s+i[1]*n]},S4=Yt(),xo=i=>Math.round(i*1e6)/1e6;function Id(i,e,t,n=0,s=[]){let r=_s.find(u=>u.id===t);if(!r)throw Error("Unknown tile design.");let o=Rc(i,e,r.base,n,s),a=o.edges.map(u=>structuredClone(u));if(r.floating||r.kind==="water"){for(let u=0;u<6;u++)o.legacyEdges.includes(u)||(a[u]={kind:"sea",start:"water",end:"water",samples:Array(25).fill(-40),waterY:0,ports:[]});for(let u of o.legacyEdges)for(let[p,g,b]of[[(u+5)%6,24,a[u].samples[0]],[(u+1)%6,0,a[u].samples[24]]]){if(o.legacyEdges.includes(p))continue;let m=a[p];for(let f=0;f<5;f++)m.samples[g===0?f:24-f]=xo(-40+(b+40)*(1-f/5));m.samples[g]=b,m[g===0?"start":"end"]=b>0?"land":"water"}}let c=r.floor??24,l=r.regions.map(([u,p,g,b=c])=>{let m=dr([u,p],n);return{x:xo(m[0]),z:xo(m[1]),radius:g,floorY:b}}),h={x:l[0].x,y:l[0].floorY,z:l[0].z},d=Math.max(...l.map(u=>Math.hypot(u.x-h.x,u.z-h.z)+u.radius));return{...o,version:4,variant:t,recipe:{...Cc.find(u=>u.id===t),kind:r.kind,floating:!!r.floating},slot:{origin:h,regions:l,radius:xo(d),height:480,floorY:c,mapRadius:xo(d*ut),mapHeight:14.4},edges:a,boundaries:a.map(u=>u.samples),connections:{path:r.kind==="water"?"none":r.floating?"deck-and-teleport":"connected",water:r.floating||r.kind==="water"?"open-sea":r.rivers.length?"connected":r.wet.length?"sea":"enclosed",waterY:0},navigation:{minimumWidth:42,minimumDepth:10,minimumClearance:16,protectedBuildAreas:!0},art:{kit:"host-designs-1",seed:_s.indexOf(r)+103}}}function y0({bytes:i,size:e}){let t=new Ei(i,e,e,ir,Xt);return t.generateMipmaps=!0,t.minFilter=un,t.magFilter=gt,t.needsUpdate=!0,t}function v0(i,e,{finish:t="natural",pathColor:n="#c8b792",sand:s="#d4c4a0"}={}){let r=i.onBeforeCompile;i.hostPathTexture=e,i.userData.hostSurface={kind:"terrain",finish:t,pathColor:n,sand:s},i.onBeforeCompile=o=>{r(o),o.uniforms.uHostPaths={value:e},o.uniforms.uHostPathColor={value:new pe(n)},o.vertexShader=`varying vec2 vHostPathUv;
`+o.vertexShader.replace("#include <begin_vertex>",`#include <begin_vertex>
vHostPathUv=position.xz*uTerrainScale/18.+.5;`),o.fragmentShader=`varying vec2 vHostPathUv;uniform sampler2D uHostPaths;uniform vec3 uHostPathColor;
`+o.fragmentShader;let a=t==="paved"?"vec2 pave=vHostPathUv*vec2(110.,110.);vec2 f=fract(pave);vec2 aa=max(fwidth(pave),vec2(.01));vec2 joint=smoothstep(vec2(.016),vec2(.016)+aa,min(f,1.-f));diffuseColor.rgb*=.92+.08*min(joint.x,joint.y);":"";o.fragmentShader=o.fragmentShader.replace("float grain=mapNoise(vGround.xz*35.);",`float hostPath=texture2D(uHostPaths,vHostPathUv).r*smoothstep(.29,.62,vGround.y);diffuseColor.rgb=mix(diffuseColor.rgb,uHostPathColor,hostPath*.86);${a}
float grain=mapNoise(vGround.xz*35.);`)},i.customProgramCacheKey=()=>`threetopia-host-ground-4-${t}`}function Pd(i,e=!0){let t=new Bt;t.name=i.name,t.userData.contract=i.contract;for(let n of i.meshes){let s=new bt;for(let[a,c]of Object.entries(n.attributes))s.setAttribute(a,new yt(c.array,c.itemSize,c.normalized));n.index&&s.setIndex(new yt(n.index,1));let r=n.materials.map(a=>{if(a.userData?.hostSurface){let l=a.userData.hostSurface,h=h0(l.kind,e?1:.03,l.sand);return l.kind==="terrain"&&i.pathMask&&v0(h,y0(i.pathMask),l),h}if(!a.userData?.terrain)return new Kr().parse(a);let c=fo(e?1:.03,a.userData.sandColor);return c.side=a.side,c}),o=new Ke(s,n.arrayMaterial?r:r[0]);o.name=n.name,o.visible=n.visible!==!1,o.userData=n.userData||{},o.matrix.fromArray(n.matrix),o.matrix.decompose(o.position,o.quaternion,o.scale),o.castShadow=n.castShadow,o.receiveShadow=n.receiveShadow,o.customDepthMaterial=l0(n.materials[0]?.userData?.hostSurface?.kind,e?1:.03),t.add(o)}return t}function Ld(){let i=new vc(new Worker(new URL("./registry-host.worker.js",import.meta.url),{type:"module"}));return{async load(e,t={map:!0}){let n=await i.run({contract:e,options:t});return n?Pd(n,t.map):null},dispose(){i.dispose()}}}var Dd={type:"change"},b0={type:"start"},Ud={type:"end"},Pc=new ti,Nd=new hn,Ig=Math.cos(70*co.DEG2RAD),Nt=new N,an=2*Math.PI,nt={NONE:-1,ROTATE:0,DOLLY:1,PAN:2,TOUCH_ROTATE:3,TOUCH_PAN:4,TOUCH_DOLLY_PAN:5,TOUCH_DOLLY_ROTATE:6},M0=1e-6,fr=class extends Jr{constructor(e,t=null){super(e,t),this.state=nt.NONE,this.target=new N,this.cursor=new N,this.minDistance=0,this.maxDistance=1/0,this.minZoom=0,this.maxZoom=1/0,this.minTargetRadius=0,this.maxTargetRadius=1/0,this.minPolarAngle=0,this.maxPolarAngle=Math.PI,this.minAzimuthAngle=-1/0,this.maxAzimuthAngle=1/0,this.enableDamping=!1,this.dampingFactor=.05,this.enableZoom=!0,this.zoomSpeed=1,this.enableRotate=!0,this.rotateSpeed=1,this.keyRotateSpeed=1,this.enablePan=!0,this.panSpeed=1,this.screenSpacePanning=!0,this.keyPanSpeed=7,this.zoomToCursor=!1,this.autoRotate=!1,this.autoRotateSpeed=2,this.keys={LEFT:"ArrowLeft",UP:"ArrowUp",RIGHT:"ArrowRight",BOTTOM:"ArrowDown"},this.mouseButtons={LEFT:Di.ROTATE,MIDDLE:Di.DOLLY,RIGHT:Di.PAN},this.touches={ONE:Ni.ROTATE,TWO:Ni.DOLLY_PAN},this.target0=this.target.clone(),this.position0=this.object.position.clone(),this.zoom0=this.object.zoom,this._cursorStyle="auto",this._domElementKeyEvents=null,this._lastPosition=new N,this._lastQuaternion=new It,this._lastTargetPosition=new N,this._quat=new It().setFromUnitVectors(e.up,new N(0,1,0)),this._quatInverse=this._quat.clone().invert(),this._spherical=new js,this._sphericalDelta=new js,this._scale=1,this._panOffset=new N,this._rotateStart=new we,this._rotateEnd=new we,this._rotateDelta=new we,this._panStart=new we,this._panEnd=new we,this._panDelta=new we,this._dollyStart=new we,this._dollyEnd=new we,this._dollyDelta=new we,this._dollyDirection=new N,this._mouse=new we,this._performCursorZoom=!1,this._pointers=[],this._pointerPositions={},this._controlActive=!1,this._onPointerMove=Lg.bind(this),this._onPointerDown=Pg.bind(this),this._onPointerUp=Dg.bind(this),this._onContextMenu=zg.bind(this),this._onMouseWheel=Og.bind(this),this._onKeyDown=Fg.bind(this),this._onTouchStart=Bg.bind(this),this._onTouchMove=kg.bind(this),this._onMouseDown=Ng.bind(this),this._onMouseMove=Ug.bind(this),this._interceptControlDown=Hg.bind(this),this._interceptControlUp=Vg.bind(this),this.domElement!==null&&this.connect(this.domElement),this.update()}set cursorStyle(e){this._cursorStyle=e,e==="grab"?this.domElement.style.cursor="grab":this.domElement.style.cursor="auto"}get cursorStyle(){return this._cursorStyle}connect(e){super.connect(e),this.domElement.addEventListener("pointerdown",this._onPointerDown),this.domElement.addEventListener("pointercancel",this._onPointerUp),this.domElement.addEventListener("contextmenu",this._onContextMenu),this.domElement.addEventListener("wheel",this._onMouseWheel,{passive:!1}),this.domElement.getRootNode().addEventListener("keydown",this._interceptControlDown,{passive:!0,capture:!0}),this.domElement.style.touchAction="none"}disconnect(){this.state=nt.NONE,this.domElement.removeEventListener("pointerdown",this._onPointerDown),this.domElement.ownerDocument.removeEventListener("pointermove",this._onPointerMove),this.domElement.ownerDocument.removeEventListener("pointerup",this._onPointerUp),this.domElement.removeEventListener("pointercancel",this._onPointerUp),this.domElement.removeEventListener("wheel",this._onMouseWheel),this.domElement.removeEventListener("contextmenu",this._onContextMenu),this.stopListenToKeyEvents();let e=this.domElement.getRootNode();e.removeEventListener("keydown",this._interceptControlDown,{capture:!0}),e.removeEventListener("keyup",this._interceptControlUp,{capture:!0}),this._controlActive=!1,this._pointers.length=0,this._pointerPositions={},this.domElement.style.touchAction="",this.domElement.style.cursor="auto"}dispose(){this.disconnect()}getPolarAngle(){return this._spherical.phi}getAzimuthalAngle(){return this._spherical.theta}getDistance(){return this.object.position.distanceTo(this.target)}listenToKeyEvents(e){e.addEventListener("keydown",this._onKeyDown),this._domElementKeyEvents=e}stopListenToKeyEvents(){this._domElementKeyEvents!==null&&(this._domElementKeyEvents.removeEventListener("keydown",this._onKeyDown),this._domElementKeyEvents=null)}saveState(){this.target0.copy(this.target),this.position0.copy(this.object.position),this.zoom0=this.object.zoom}reset(){this.target.copy(this.target0),this.object.position.copy(this.position0),this.object.zoom=this.zoom0,this.object.updateProjectionMatrix(),this.dispatchEvent(Dd),this.update(),this.state=nt.NONE}pan(e,t){this._pan(e,t),this.update()}dollyIn(e){this._dollyIn(e),this.update()}dollyOut(e){this._dollyOut(e),this.update()}rotateLeft(e){this._rotateLeft(e),this.update()}rotateUp(e){this._rotateUp(e),this.update()}update(e=null){let t=this.object.position;Nt.copy(t).sub(this.target),Nt.applyQuaternion(this._quat),this._spherical.setFromVector3(Nt),this.autoRotate&&this.state===nt.NONE&&this._rotateLeft(this._getAutoRotationAngle(e)),this.enableDamping?(this._spherical.theta+=this._sphericalDelta.theta*this.dampingFactor,this._spherical.phi+=this._sphericalDelta.phi*this.dampingFactor):(this._spherical.theta+=this._sphericalDelta.theta,this._spherical.phi+=this._sphericalDelta.phi);let n=this.minAzimuthAngle,s=this.maxAzimuthAngle;isFinite(n)&&isFinite(s)&&(n<-Math.PI?n+=an:n>Math.PI&&(n-=an),s<-Math.PI?s+=an:s>Math.PI&&(s-=an),n<=s?this._spherical.theta=Math.max(n,Math.min(s,this._spherical.theta)):this._spherical.theta=this._spherical.theta>(n+s)/2?Math.max(n,this._spherical.theta):Math.min(s,this._spherical.theta)),this._spherical.phi=Math.max(this.minPolarAngle,Math.min(this.maxPolarAngle,this._spherical.phi)),this._spherical.makeSafe(),this.enableDamping===!0?this.target.addScaledVector(this._panOffset,this.dampingFactor):this.target.add(this._panOffset),this.target.sub(this.cursor),this.target.clampLength(this.minTargetRadius,this.maxTargetRadius),this.target.add(this.cursor);let r=!1;if(this.zoomToCursor&&this._performCursorZoom||this.object.isOrthographicCamera)this._spherical.radius=this._clampDistance(this._spherical.radius);else{let o=this._spherical.radius;this._spherical.radius=this._clampDistance(this._spherical.radius*this._scale),r=o!=this._spherical.radius}if(Nt.setFromSpherical(this._spherical),Nt.applyQuaternion(this._quatInverse),t.copy(this.target).add(Nt),this.object.lookAt(this.target),this.enableDamping===!0?(this._sphericalDelta.theta*=1-this.dampingFactor,this._sphericalDelta.phi*=1-this.dampingFactor,this._panOffset.multiplyScalar(1-this.dampingFactor)):(this._sphericalDelta.set(0,0,0),this._panOffset.set(0,0,0)),this.zoomToCursor&&this._performCursorZoom){let o=null;if(this.object.isPerspectiveCamera){let a=Nt.length();o=this._clampDistance(a*this._scale);let c=a-o;this.object.position.addScaledVector(this._dollyDirection,c),this.object.updateMatrixWorld(),r=!!c}else if(this.object.isOrthographicCamera){let a=new N(this._mouse.x,this._mouse.y,0);a.unproject(this.object);let c=this.object.zoom;this.object.zoom=Math.max(this.minZoom,Math.min(this.maxZoom,this.object.zoom/this._scale)),this.object.updateProjectionMatrix(),r=c!==this.object.zoom;let l=new N(this._mouse.x,this._mouse.y,0);l.unproject(this.object),this.object.position.sub(l).add(a),this.object.updateMatrixWorld(),o=Nt.length()}else console.warn("WARNING: OrbitControls.js encountered an unknown camera type - zoom to cursor disabled."),this.zoomToCursor=!1;o!==null&&(this.screenSpacePanning?this.target.set(0,0,-1).transformDirection(this.object.matrix).multiplyScalar(o).add(this.object.position):(Pc.origin.copy(this.object.position),Pc.direction.set(0,0,-1).transformDirection(this.object.matrix),Math.abs(this.object.up.dot(Pc.direction))<Ig?this.object.lookAt(this.target):(Nd.setFromNormalAndCoplanarPoint(this.object.up,this.target),Pc.intersectPlane(Nd,this.target))))}else if(this.object.isOrthographicCamera){let o=this.object.zoom;this.object.zoom=Math.max(this.minZoom,Math.min(this.maxZoom,this.object.zoom/this._scale)),o!==this.object.zoom&&(this.object.updateProjectionMatrix(),r=!0)}return this._scale=1,this._performCursorZoom=!1,r||this._lastPosition.distanceToSquared(this.object.position)>M0||8*(1-this._lastQuaternion.dot(this.object.quaternion))>M0||this._lastTargetPosition.distanceToSquared(this.target)>M0?(this.dispatchEvent(Dd),this._lastPosition.copy(this.object.position),this._lastQuaternion.copy(this.object.quaternion),this._lastTargetPosition.copy(this.target),!0):!1}_getAutoRotationAngle(e){return e!==null?an/60*this.autoRotateSpeed*e:an/60/60*this.autoRotateSpeed}_getZoomScale(e){let t=Math.abs(e*.01);return Math.pow(.95,this.zoomSpeed*t)}_rotateLeft(e){this._sphericalDelta.theta-=e}_rotateUp(e){this._sphericalDelta.phi-=e}_panLeft(e,t){Nt.setFromMatrixColumn(t,0),Nt.multiplyScalar(-e),this._panOffset.add(Nt)}_panUp(e,t){this.screenSpacePanning===!0?Nt.setFromMatrixColumn(t,1):(Nt.setFromMatrixColumn(t,0),Nt.crossVectors(this.object.up,Nt)),Nt.multiplyScalar(e),this._panOffset.add(Nt)}_pan(e,t){let n=this.domElement;if(this.object.isPerspectiveCamera){let s=this.object.position;Nt.copy(s).sub(this.target);let r=Nt.length();r*=Math.tan(this.object.fov/2*Math.PI/180),this._panLeft(2*e*r/n.clientHeight,this.object.matrix),this._panUp(2*t*r/n.clientHeight,this.object.matrix)}else this.object.isOrthographicCamera?(this._panLeft(e*(this.object.right-this.object.left)/this.object.zoom/n.clientWidth,this.object.matrix),this._panUp(t*(this.object.top-this.object.bottom)/this.object.zoom/n.clientHeight,this.object.matrix)):(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - pan disabled."),this.enablePan=!1)}_dollyOut(e){this.object.isPerspectiveCamera||this.object.isOrthographicCamera?this._scale/=e:(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled."),this.enableZoom=!1)}_dollyIn(e){this.object.isPerspectiveCamera||this.object.isOrthographicCamera?this._scale*=e:(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled."),this.enableZoom=!1)}_updateZoomParameters(e,t){if(!this.zoomToCursor)return;this._performCursorZoom=!0;let n=this.domElement.getBoundingClientRect(),s=e-n.left,r=t-n.top,o=n.width,a=n.height;this._mouse.x=s/o*2-1,this._mouse.y=-(r/a)*2+1,this._dollyDirection.set(this._mouse.x,this._mouse.y,1).unproject(this.object).sub(this.object.position).normalize()}_clampDistance(e){return Math.max(this.minDistance,Math.min(this.maxDistance,e))}_handleMouseDownRotate(e){this._rotateStart.set(e.clientX,e.clientY)}_handleMouseDownDolly(e){this._updateZoomParameters(e.clientX,e.clientX),this._dollyStart.set(e.clientX,e.clientY)}_handleMouseDownPan(e){this._panStart.set(e.clientX,e.clientY)}_handleMouseMoveRotate(e){this._rotateEnd.set(e.clientX,e.clientY),this._rotateDelta.subVectors(this._rotateEnd,this._rotateStart).multiplyScalar(this.rotateSpeed);let t=this.domElement;this._rotateLeft(an*this._rotateDelta.x/t.clientHeight),this._rotateUp(an*this._rotateDelta.y/t.clientHeight),this._rotateStart.copy(this._rotateEnd),this.update()}_handleMouseMoveDolly(e){this._dollyEnd.set(e.clientX,e.clientY),this._dollyDelta.subVectors(this._dollyEnd,this._dollyStart),this._dollyDelta.y>0?this._dollyOut(this._getZoomScale(this._dollyDelta.y)):this._dollyDelta.y<0&&this._dollyIn(this._getZoomScale(this._dollyDelta.y)),this._dollyStart.copy(this._dollyEnd),this.update()}_handleMouseMovePan(e){this._panEnd.set(e.clientX,e.clientY),this._panDelta.subVectors(this._panEnd,this._panStart).multiplyScalar(this.panSpeed),this._pan(this._panDelta.x,this._panDelta.y),this._panStart.copy(this._panEnd),this.update()}_handleMouseWheel(e){this._updateZoomParameters(e.clientX,e.clientY),e.deltaY<0?this._dollyIn(this._getZoomScale(e.deltaY)):e.deltaY>0&&this._dollyOut(this._getZoomScale(e.deltaY)),this.update()}_handleKeyDown(e){let t=!1;switch(e.code){case this.keys.UP:e.ctrlKey||e.metaKey||e.shiftKey?this.enableRotate&&this._rotateUp(an*this.keyRotateSpeed/this.domElement.clientHeight):this.enablePan&&this._pan(0,this.keyPanSpeed),t=!0;break;case this.keys.BOTTOM:e.ctrlKey||e.metaKey||e.shiftKey?this.enableRotate&&this._rotateUp(-an*this.keyRotateSpeed/this.domElement.clientHeight):this.enablePan&&this._pan(0,-this.keyPanSpeed),t=!0;break;case this.keys.LEFT:e.ctrlKey||e.metaKey||e.shiftKey?this.enableRotate&&this._rotateLeft(an*this.keyRotateSpeed/this.domElement.clientHeight):this.enablePan&&this._pan(this.keyPanSpeed,0),t=!0;break;case this.keys.RIGHT:e.ctrlKey||e.metaKey||e.shiftKey?this.enableRotate&&this._rotateLeft(-an*this.keyRotateSpeed/this.domElement.clientHeight):this.enablePan&&this._pan(-this.keyPanSpeed,0),t=!0;break}t&&(e.preventDefault(),this.update())}_handleTouchStartRotate(e){if(this._pointers.length===1)this._rotateStart.set(e.pageX,e.pageY);else{let t=this._getSecondPointerPosition(e),n=.5*(e.pageX+t.x),s=.5*(e.pageY+t.y);this._rotateStart.set(n,s)}}_handleTouchStartPan(e){if(this._pointers.length===1)this._panStart.set(e.pageX,e.pageY);else{let t=this._getSecondPointerPosition(e),n=.5*(e.pageX+t.x),s=.5*(e.pageY+t.y);this._panStart.set(n,s)}}_handleTouchStartDolly(e){let t=this._getSecondPointerPosition(e),n=e.pageX-t.x,s=e.pageY-t.y,r=Math.sqrt(n*n+s*s);this._dollyStart.set(0,r)}_handleTouchStartDollyPan(e){this.enableZoom&&this._handleTouchStartDolly(e),this.enablePan&&this._handleTouchStartPan(e)}_handleTouchStartDollyRotate(e){this.enableZoom&&this._handleTouchStartDolly(e),this.enableRotate&&this._handleTouchStartRotate(e)}_handleTouchMoveRotate(e){if(this._pointers.length==1)this._rotateEnd.set(e.pageX,e.pageY);else{let n=this._getSecondPointerPosition(e),s=.5*(e.pageX+n.x),r=.5*(e.pageY+n.y);this._rotateEnd.set(s,r)}this._rotateDelta.subVectors(this._rotateEnd,this._rotateStart).multiplyScalar(this.rotateSpeed);let t=this.domElement;this._rotateLeft(an*this._rotateDelta.x/t.clientHeight),this._rotateUp(an*this._rotateDelta.y/t.clientHeight),this._rotateStart.copy(this._rotateEnd)}_handleTouchMovePan(e){if(this._pointers.length===1)this._panEnd.set(e.pageX,e.pageY);else{let t=this._getSecondPointerPosition(e),n=.5*(e.pageX+t.x),s=.5*(e.pageY+t.y);this._panEnd.set(n,s)}this._panDelta.subVectors(this._panEnd,this._panStart).multiplyScalar(this.panSpeed),this._pan(this._panDelta.x,this._panDelta.y),this._panStart.copy(this._panEnd)}_handleTouchMoveDolly(e){let t=this._getSecondPointerPosition(e),n=e.pageX-t.x,s=e.pageY-t.y,r=Math.sqrt(n*n+s*s);this._dollyEnd.set(0,r),this._dollyDelta.set(0,Math.pow(this._dollyEnd.y/this._dollyStart.y,this.zoomSpeed)),this._dollyOut(this._dollyDelta.y),this._dollyStart.copy(this._dollyEnd);let o=(e.pageX+t.x)*.5,a=(e.pageY+t.y)*.5;this._updateZoomParameters(o,a)}_handleTouchMoveDollyPan(e){this.enableZoom&&this._handleTouchMoveDolly(e),this.enablePan&&this._handleTouchMovePan(e)}_handleTouchMoveDollyRotate(e){this.enableZoom&&this._handleTouchMoveDolly(e),this.enableRotate&&this._handleTouchMoveRotate(e)}_addPointer(e){this._pointers.push(e.pointerId)}_removePointer(e){delete this._pointerPositions[e.pointerId];for(let t=0;t<this._pointers.length;t++)if(this._pointers[t]==e.pointerId){this._pointers.splice(t,1);return}}_isTrackingPointer(e){for(let t=0;t<this._pointers.length;t++)if(this._pointers[t]==e.pointerId)return!0;return!1}_trackPointer(e){let t=this._pointerPositions[e.pointerId];t===void 0&&(t=new we,this._pointerPositions[e.pointerId]=t),t.set(e.pageX,e.pageY)}_getSecondPointerPosition(e){let t=e.pointerId===this._pointers[0]?this._pointers[1]:this._pointers[0];return this._pointerPositions[t]}_customWheelEvent(e){let t=e.deltaMode,n={clientX:e.clientX,clientY:e.clientY,deltaY:e.deltaY};switch(t){case 1:n.deltaY*=16;break;case 2:n.deltaY*=100;break}return e.ctrlKey&&!this._controlActive&&(n.deltaY*=10),n}};function Pg(i){this.enabled!==!1&&(this._pointers.length===0&&(this.domElement.setPointerCapture(i.pointerId),this.domElement.ownerDocument.addEventListener("pointermove",this._onPointerMove),this.domElement.ownerDocument.addEventListener("pointerup",this._onPointerUp)),!this._isTrackingPointer(i)&&(this._addPointer(i),i.pointerType==="touch"?this._onTouchStart(i):this._onMouseDown(i),this._cursorStyle==="grab"&&(this.domElement.style.cursor="grabbing")))}function Lg(i){this.enabled!==!1&&(i.pointerType==="touch"?this._onTouchMove(i):this._onMouseMove(i))}function Dg(i){switch(this._removePointer(i),this._pointers.length){case 0:this.domElement.releasePointerCapture(i.pointerId),this.domElement.ownerDocument.removeEventListener("pointermove",this._onPointerMove),this.domElement.ownerDocument.removeEventListener("pointerup",this._onPointerUp),this.dispatchEvent(Ud),this.state=nt.NONE,this._cursorStyle==="grab"&&(this.domElement.style.cursor="grab");break;case 1:let e=this._pointers[0],t=this._pointerPositions[e];this._onTouchStart({pointerId:e,pageX:t.x,pageY:t.y});break}}function Ng(i){let e;switch(i.button){case 0:e=this.mouseButtons.LEFT;break;case 1:e=this.mouseButtons.MIDDLE;break;case 2:e=this.mouseButtons.RIGHT;break;default:e=-1}switch(e){case Di.DOLLY:if(this.enableZoom===!1)return;this._handleMouseDownDolly(i),this.state=nt.DOLLY;break;case Di.ROTATE:if(i.ctrlKey||i.metaKey||i.shiftKey){if(this.enablePan===!1)return;this._handleMouseDownPan(i),this.state=nt.PAN}else{if(this.enableRotate===!1)return;this._handleMouseDownRotate(i),this.state=nt.ROTATE}break;case Di.PAN:if(i.ctrlKey||i.metaKey||i.shiftKey){if(this.enableRotate===!1)return;this._handleMouseDownRotate(i),this.state=nt.ROTATE}else{if(this.enablePan===!1)return;this._handleMouseDownPan(i),this.state=nt.PAN}break;default:this.state=nt.NONE}this.state!==nt.NONE&&this.dispatchEvent(b0)}function Ug(i){switch(this.state){case nt.ROTATE:if(this.enableRotate===!1)return;this._handleMouseMoveRotate(i);break;case nt.DOLLY:if(this.enableZoom===!1)return;this._handleMouseMoveDolly(i);break;case nt.PAN:if(this.enablePan===!1)return;this._handleMouseMovePan(i);break}}function Og(i){this.enabled===!1||this.enableZoom===!1||this.state!==nt.NONE||(i.preventDefault(),this.dispatchEvent(b0),this._handleMouseWheel(this._customWheelEvent(i)),this.dispatchEvent(Ud))}function Fg(i){this.enabled!==!1&&this._handleKeyDown(i)}function Bg(i){switch(this._trackPointer(i),this._pointers.length){case 1:switch(this.touches.ONE){case Ni.ROTATE:if(this.enableRotate===!1)return;this._handleTouchStartRotate(i),this.state=nt.TOUCH_ROTATE;break;case Ni.PAN:if(this.enablePan===!1)return;this._handleTouchStartPan(i),this.state=nt.TOUCH_PAN;break;default:this.state=nt.NONE}break;case 2:switch(this.touches.TWO){case Ni.DOLLY_PAN:if(this.enableZoom===!1&&this.enablePan===!1)return;this._handleTouchStartDollyPan(i),this.state=nt.TOUCH_DOLLY_PAN;break;case Ni.DOLLY_ROTATE:if(this.enableZoom===!1&&this.enableRotate===!1)return;this._handleTouchStartDollyRotate(i),this.state=nt.TOUCH_DOLLY_ROTATE;break;default:this.state=nt.NONE}break;default:this.state=nt.NONE}this.state!==nt.NONE&&this.dispatchEvent(b0)}function kg(i){switch(this._trackPointer(i),this.state){case nt.TOUCH_ROTATE:if(this.enableRotate===!1)return;this._handleTouchMoveRotate(i),this.update();break;case nt.TOUCH_PAN:if(this.enablePan===!1)return;this._handleTouchMovePan(i),this.update();break;case nt.TOUCH_DOLLY_PAN:if(this.enableZoom===!1&&this.enablePan===!1)return;this._handleTouchMoveDollyPan(i),this.update();break;case nt.TOUCH_DOLLY_ROTATE:if(this.enableZoom===!1&&this.enableRotate===!1)return;this._handleTouchMoveDollyRotate(i),this.update();break;default:this.state=nt.NONE}}function zg(i){this.enabled!==!1&&i.preventDefault()}function Hg(i){i.key==="Control"&&(this._controlActive=!0,this.domElement.getRootNode().addEventListener("keyup",this._interceptControlUp,{passive:!0,capture:!0}))}function Vg(i){i.key==="Control"&&(this._controlActive=!1,this.domElement.getRootNode().removeEventListener("keyup",this._interceptControlUp,{passive:!0,capture:!0}))}function S0(i,e){if(e===Fl)return console.warn("THREE.BufferGeometryUtils.toTrianglesDrawMode(): Geometry already defined as triangles."),i;if(e===sr||e===ao){let t=i.getIndex();if(t===null){let r=[],o=i.getAttribute("position");if(o!==void 0){for(let a=0;a<o.count;a++)r.push(a);i.setIndex(r),t=i.getIndex()}else return console.error("THREE.BufferGeometryUtils.toTrianglesDrawMode(): Undefined position attribute. Processing not possible."),i}let n=t.count-2,s=[];if(e===sr)for(let r=1;r<=n;r++)s.push(t.getX(0)),s.push(t.getX(r)),s.push(t.getX(r+1));else for(let r=0;r<n;r++)r%2===0?(s.push(t.getX(r)),s.push(t.getX(r+1)),s.push(t.getX(r+2))):(s.push(t.getX(r+2)),s.push(t.getX(r+1)),s.push(t.getX(r)));return s.length/3!==n&&console.error("THREE.BufferGeometryUtils.toTrianglesDrawMode(): Unable to generate correct amount of triangles."),i.setIndex(s),i.clearGroups(),i}else return console.error("THREE.BufferGeometryUtils.toTrianglesDrawMode(): Unknown draw mode:",e),i}function Od(i){let e=new Map,t=new Map,n=i.clone();return Fd(i,n,function(s,r){e.set(r,s),t.set(s,r)}),n.traverse(function(s){if(!s.isSkinnedMesh)return;let r=s,o=e.get(s),a=o.skeleton.bones;r.skeleton=o.skeleton.clone(),r.bindMatrix.copy(o.bindMatrix),r.skeleton.bones=a.map(function(c){return t.get(c)}),r.bind(r.skeleton,r.bindMatrix)}),n}function Fd(i,e,t){t(i,e);for(let n=0;n<i.children.length;n++)Fd(i.children[n],e.children[n],t)}var mr=class extends Pn{constructor(e){super(e),this.dracoLoader=null,this.ktx2Loader=null,this.meshoptDecoder=null,this.pluginCallbacks=[],this.register(function(t){return new I0(t)}),this.register(function(t){return new P0(t)}),this.register(function(t){return new z0(t)}),this.register(function(t){return new H0(t)}),this.register(function(t){return new V0(t)}),this.register(function(t){return new D0(t)}),this.register(function(t){return new N0(t)}),this.register(function(t){return new U0(t)}),this.register(function(t){return new O0(t)}),this.register(function(t){return new C0(t)}),this.register(function(t){return new F0(t)}),this.register(function(t){return new L0(t)}),this.register(function(t){return new k0(t)}),this.register(function(t){return new B0(t)}),this.register(function(t){return new E0(t)}),this.register(function(t){return new Lc(t,He.EXT_MESHOPT_COMPRESSION)}),this.register(function(t){return new Lc(t,He.KHR_MESHOPT_COMPRESSION)}),this.register(function(t){return new G0(t)})}load(e,t,n,s){let r=this,o;if(this.resourcePath!=="")o=this.resourcePath;else if(this.path!==""){let l=li.extractUrlBase(e);o=li.resolveURL(l,this.path)}else o=li.extractUrlBase(e);this.manager.itemStart(e);let a=function(l){s?s(l):console.error(l),r.manager.itemError(e),r.manager.itemEnd(e)},c=new is(this.manager);c.setPath(this.path),c.setResponseType("arraybuffer"),c.setRequestHeader(this.requestHeader),c.setWithCredentials(this.withCredentials),c.load(e,function(l){try{r.parse(l,o,function(h){t(h),r.manager.itemEnd(e)},a)}catch(h){a(h)}},n,a)}setDRACOLoader(e){return this.dracoLoader=e,this}setKTX2Loader(e){return this.ktx2Loader=e,this}setMeshoptDecoder(e){return this.meshoptDecoder=e,this}register(e){return this.pluginCallbacks.indexOf(e)===-1&&this.pluginCallbacks.push(e),this}unregister(e){return this.pluginCallbacks.indexOf(e)!==-1&&this.pluginCallbacks.splice(this.pluginCallbacks.indexOf(e),1),this}parse(e,t,n,s){let r,o={},a={},c=new TextDecoder;if(typeof e=="string")r=JSON.parse(e);else if(e instanceof ArrayBuffer)if(c.decode(new Uint8Array(e,0,4))===Vd){try{o[He.KHR_BINARY_GLTF]=new W0(e)}catch(d){s&&s(d);return}r=JSON.parse(o[He.KHR_BINARY_GLTF].content)}else r=JSON.parse(c.decode(e));else r=e;if(r.asset===void 0||r.asset.version[0]<2){s&&s(new Error("THREE.GLTFLoader: Unsupported asset. glTF versions >=2.0 are supported."));return}let l=new j0(r,{path:t||this.resourcePath||"",crossOrigin:this.crossOrigin,requestHeader:this.requestHeader,manager:this.manager,ktx2Loader:this.ktx2Loader,meshoptDecoder:this.meshoptDecoder});l.fileLoader.setRequestHeader(this.requestHeader);for(let h=0;h<this.pluginCallbacks.length;h++){let d=this.pluginCallbacks[h](l);d.name||console.error("THREE.GLTFLoader: Invalid plugin found: missing name"),a[d.name]=d,o[d.name]=!0}if(r.extensionsUsed)for(let h=0;h<r.extensionsUsed.length;++h){let d=r.extensionsUsed[h],u=r.extensionsRequired||[];switch(d){case He.KHR_MATERIALS_UNLIT:o[d]=new R0;break;case He.KHR_DRACO_MESH_COMPRESSION:o[d]=new X0(r,this.dracoLoader);break;case He.KHR_TEXTURE_TRANSFORM:o[d]=new q0;break;case He.KHR_MESH_QUANTIZATION:o[d]=new Y0;break;default:u.indexOf(d)>=0&&a[d]===void 0&&console.warn('THREE.GLTFLoader: Unknown extension "'+d+'".')}}l.setExtensions(o),l.setPlugins(a),l.parse(n,s)}parseAsync(e,t){let n=this;return new Promise(function(s,r){n.parse(e,t,s,r)})}};function Gg(){let i={};return{get:function(e){return i[e]},add:function(e,t){i[e]=t},remove:function(e){delete i[e]},removeAll:function(){i={}}}}function St(i,e,t){let n=i.json.materials[e];return n.extensions&&n.extensions[t]?n.extensions[t]:null}var He={KHR_BINARY_GLTF:"KHR_binary_glTF",KHR_DRACO_MESH_COMPRESSION:"KHR_draco_mesh_compression",KHR_LIGHTS_PUNCTUAL:"KHR_lights_punctual",KHR_MATERIALS_CLEARCOAT:"KHR_materials_clearcoat",KHR_MATERIALS_DISPERSION:"KHR_materials_dispersion",KHR_MATERIALS_IOR:"KHR_materials_ior",KHR_MATERIALS_SHEEN:"KHR_materials_sheen",KHR_MATERIALS_SPECULAR:"KHR_materials_specular",KHR_MATERIALS_TRANSMISSION:"KHR_materials_transmission",KHR_MATERIALS_IRIDESCENCE:"KHR_materials_iridescence",KHR_MATERIALS_ANISOTROPY:"KHR_materials_anisotropy",KHR_MATERIALS_UNLIT:"KHR_materials_unlit",KHR_MATERIALS_VOLUME:"KHR_materials_volume",KHR_TEXTURE_BASISU:"KHR_texture_basisu",KHR_TEXTURE_TRANSFORM:"KHR_texture_transform",KHR_MESH_QUANTIZATION:"KHR_mesh_quantization",KHR_MATERIALS_EMISSIVE_STRENGTH:"KHR_materials_emissive_strength",EXT_MATERIALS_BUMP:"EXT_materials_bump",EXT_TEXTURE_WEBP:"EXT_texture_webp",EXT_TEXTURE_AVIF:"EXT_texture_avif",EXT_MESHOPT_COMPRESSION:"EXT_meshopt_compression",KHR_MESHOPT_COMPRESSION:"KHR_meshopt_compression",EXT_MESH_GPU_INSTANCING:"EXT_mesh_gpu_instancing"},E0=class{constructor(e){this.parser=e,this.name=He.KHR_LIGHTS_PUNCTUAL,this.cache={refs:{},uses:{}}}_markDefs(){let e=this.parser,t=this.parser.json.nodes||[];for(let n=0,s=t.length;n<s;n++){let r=t[n];r.extensions&&r.extensions[this.name]&&r.extensions[this.name].light!==void 0&&e._addNodeRef(this.cache,r.extensions[this.name].light)}}_loadLight(e){let t=this.parser,n="light:"+e,s=t.cache.get(n);if(s)return s;let r=t.json,c=((r.extensions&&r.extensions[this.name]||{}).lights||[])[e],l,h=new pe(16777215);c.color!==void 0&&h.setRGB(c.color[0],c.color[1],c.color[2],$t);let d=c.range!==void 0?c.range:0;switch(c.type){case"directional":l=new ci(h),l.target.position.set(0,0,-1),l.add(l.target);break;case"point":l=new os(h),l.distance=d;break;case"spot":l=new Zr(h),l.distance=d,c.spot=c.spot||{},c.spot.innerConeAngle=c.spot.innerConeAngle!==void 0?c.spot.innerConeAngle:0,c.spot.outerConeAngle=c.spot.outerConeAngle!==void 0?c.spot.outerConeAngle:Math.PI/4,l.angle=c.spot.outerConeAngle,l.penumbra=1-c.spot.innerConeAngle/c.spot.outerConeAngle,l.target.position.set(0,0,-1),l.add(l.target);break;default:throw new Error("THREE.GLTFLoader: Unexpected light type: "+c.type)}return l.position.set(0,0,0),qn(l,c),c.intensity!==void 0&&(l.intensity=c.intensity),l.name=t.createUniqueName(c.name||"light_"+e),s=Promise.resolve(l),t.cache.add(n,s),s}getDependency(e,t){if(e==="light")return this._loadLight(t)}createNodeAttachment(e){let t=this,n=this.parser,r=n.json.nodes[e],a=(r.extensions&&r.extensions[this.name]||{}).light;return a===void 0?null:this._loadLight(a).then(function(c){return n._getNodeRef(t.cache,a,c)})}},R0=class{constructor(){this.name=He.KHR_MATERIALS_UNLIT}getMaterialType(){return yn}extendParams(e,t,n){let s=[];e.color=new pe(1,1,1),e.opacity=1;let r=t.pbrMetallicRoughness;if(r){if(Array.isArray(r.baseColorFactor)){let o=r.baseColorFactor;e.color.setRGB(o[0],o[1],o[2],$t),e.opacity=o[3]}r.baseColorTexture!==void 0&&s.push(n.assignTexture(e,"map",r.baseColorTexture,Ct))}return Promise.all(s)}},C0=class{constructor(e){this.parser=e,this.name=He.KHR_MATERIALS_EMISSIVE_STRENGTH}extendMaterialParams(e,t){let n=St(this.parser,e,this.name);return n===null||n.emissiveStrength!==void 0&&(t.emissiveIntensity=n.emissiveStrength),Promise.resolve()}},I0=class{constructor(e){this.parser=e,this.name=He.KHR_MATERIALS_CLEARCOAT}getMaterialType(e){return St(this.parser,e,this.name)!==null?Jt:null}extendMaterialParams(e,t){let n=St(this.parser,e,this.name);if(n===null)return Promise.resolve();let s=[];if(n.clearcoatFactor!==void 0&&(t.clearcoat=n.clearcoatFactor),n.clearcoatTexture!==void 0&&s.push(this.parser.assignTexture(t,"clearcoatMap",n.clearcoatTexture)),n.clearcoatRoughnessFactor!==void 0&&(t.clearcoatRoughness=n.clearcoatRoughnessFactor),n.clearcoatRoughnessTexture!==void 0&&s.push(this.parser.assignTexture(t,"clearcoatRoughnessMap",n.clearcoatRoughnessTexture)),n.clearcoatNormalTexture!==void 0&&(s.push(this.parser.assignTexture(t,"clearcoatNormalMap",n.clearcoatNormalTexture)),n.clearcoatNormalTexture.scale!==void 0)){let r=n.clearcoatNormalTexture.scale;t.clearcoatNormalScale=new we(r,r)}return Promise.all(s)}},P0=class{constructor(e){this.parser=e,this.name=He.KHR_MATERIALS_DISPERSION}getMaterialType(e){return St(this.parser,e,this.name)!==null?Jt:null}extendMaterialParams(e,t){let n=St(this.parser,e,this.name);return n===null||(t.dispersion=n.dispersion!==void 0?n.dispersion:0),Promise.resolve()}},L0=class{constructor(e){this.parser=e,this.name=He.KHR_MATERIALS_IRIDESCENCE}getMaterialType(e){return St(this.parser,e,this.name)!==null?Jt:null}extendMaterialParams(e,t){let n=St(this.parser,e,this.name);if(n===null)return Promise.resolve();let s=[];return n.iridescenceFactor!==void 0&&(t.iridescence=n.iridescenceFactor),n.iridescenceTexture!==void 0&&s.push(this.parser.assignTexture(t,"iridescenceMap",n.iridescenceTexture)),n.iridescenceIor!==void 0&&(t.iridescenceIOR=n.iridescenceIor),t.iridescenceThicknessRange===void 0&&(t.iridescenceThicknessRange=[100,400]),n.iridescenceThicknessMinimum!==void 0&&(t.iridescenceThicknessRange[0]=n.iridescenceThicknessMinimum),n.iridescenceThicknessMaximum!==void 0&&(t.iridescenceThicknessRange[1]=n.iridescenceThicknessMaximum),n.iridescenceThicknessTexture!==void 0&&s.push(this.parser.assignTexture(t,"iridescenceThicknessMap",n.iridescenceThicknessTexture)),Promise.all(s)}},D0=class{constructor(e){this.parser=e,this.name=He.KHR_MATERIALS_SHEEN}getMaterialType(e){return St(this.parser,e,this.name)!==null?Jt:null}extendMaterialParams(e,t){let n=St(this.parser,e,this.name);if(n===null)return Promise.resolve();let s=[];if(t.sheenColor=new pe(0,0,0),t.sheenRoughness=0,t.sheen=1,n.sheenColorFactor!==void 0){let r=n.sheenColorFactor;t.sheenColor.setRGB(r[0],r[1],r[2],$t)}return n.sheenRoughnessFactor!==void 0&&(t.sheenRoughness=n.sheenRoughnessFactor),n.sheenColorTexture!==void 0&&s.push(this.parser.assignTexture(t,"sheenColorMap",n.sheenColorTexture,Ct)),n.sheenRoughnessTexture!==void 0&&s.push(this.parser.assignTexture(t,"sheenRoughnessMap",n.sheenRoughnessTexture)),Promise.all(s)}},N0=class{constructor(e){this.parser=e,this.name=He.KHR_MATERIALS_TRANSMISSION}getMaterialType(e){return St(this.parser,e,this.name)!==null?Jt:null}extendMaterialParams(e,t){let n=St(this.parser,e,this.name);if(n===null)return Promise.resolve();let s=[];return n.transmissionFactor!==void 0&&(t.transmission=n.transmissionFactor),n.transmissionTexture!==void 0&&s.push(this.parser.assignTexture(t,"transmissionMap",n.transmissionTexture)),Promise.all(s)}},U0=class{constructor(e){this.parser=e,this.name=He.KHR_MATERIALS_VOLUME}getMaterialType(e){return St(this.parser,e,this.name)!==null?Jt:null}extendMaterialParams(e,t){let n=St(this.parser,e,this.name);if(n===null)return Promise.resolve();let s=[];t.thickness=n.thicknessFactor!==void 0?n.thicknessFactor:0,n.thicknessTexture!==void 0&&s.push(this.parser.assignTexture(t,"thicknessMap",n.thicknessTexture)),t.attenuationDistance=n.attenuationDistance||1/0;let r=n.attenuationColor||[1,1,1];return t.attenuationColor=new pe().setRGB(r[0],r[1],r[2],$t),Promise.all(s)}},O0=class{constructor(e){this.parser=e,this.name=He.KHR_MATERIALS_IOR}getMaterialType(e){return St(this.parser,e,this.name)!==null?Jt:null}extendMaterialParams(e,t){let n=St(this.parser,e,this.name);return n===null||(t.ior=n.ior!==void 0?n.ior:1.5,t.ior===0&&(t.ior=1e3)),Promise.resolve()}},F0=class{constructor(e){this.parser=e,this.name=He.KHR_MATERIALS_SPECULAR}getMaterialType(e){return St(this.parser,e,this.name)!==null?Jt:null}extendMaterialParams(e,t){let n=St(this.parser,e,this.name);if(n===null)return Promise.resolve();let s=[];t.specularIntensity=n.specularFactor!==void 0?n.specularFactor:1,n.specularTexture!==void 0&&s.push(this.parser.assignTexture(t,"specularIntensityMap",n.specularTexture));let r=n.specularColorFactor||[1,1,1];return t.specularColor=new pe().setRGB(r[0],r[1],r[2],$t),n.specularColorTexture!==void 0&&s.push(this.parser.assignTexture(t,"specularColorMap",n.specularColorTexture,Ct)),Promise.all(s)}},B0=class{constructor(e){this.parser=e,this.name=He.EXT_MATERIALS_BUMP}getMaterialType(e){return St(this.parser,e,this.name)!==null?Jt:null}extendMaterialParams(e,t){let n=St(this.parser,e,this.name);if(n===null)return Promise.resolve();let s=[];return t.bumpScale=n.bumpFactor!==void 0?n.bumpFactor:1,n.bumpTexture!==void 0&&s.push(this.parser.assignTexture(t,"bumpMap",n.bumpTexture)),Promise.all(s)}},k0=class{constructor(e){this.parser=e,this.name=He.KHR_MATERIALS_ANISOTROPY}getMaterialType(e){return St(this.parser,e,this.name)!==null?Jt:null}extendMaterialParams(e,t){let n=St(this.parser,e,this.name);if(n===null)return Promise.resolve();let s=[];return n.anisotropyStrength!==void 0&&(t.anisotropy=n.anisotropyStrength),n.anisotropyRotation!==void 0&&(t.anisotropyRotation=n.anisotropyRotation),n.anisotropyTexture!==void 0&&s.push(this.parser.assignTexture(t,"anisotropyMap",n.anisotropyTexture)),Promise.all(s)}},z0=class{constructor(e){this.parser=e,this.name=He.KHR_TEXTURE_BASISU}loadTexture(e){let t=this.parser,n=t.json,s=n.textures[e];if(!s.extensions||!s.extensions[this.name])return null;let r=s.extensions[this.name],o=t.options.ktx2Loader;if(!o){if(n.extensionsRequired&&n.extensionsRequired.indexOf(this.name)>=0)throw new Error("THREE.GLTFLoader: setKTX2Loader must be called before loading KTX2 textures");return null}return t.loadTextureImage(e,r.source,o)}},H0=class{constructor(e){this.parser=e,this.name=He.EXT_TEXTURE_WEBP}loadTexture(e){let t=this.name,n=this.parser,s=n.json,r=s.textures[e];if(!r.extensions||!r.extensions[t])return null;let o=r.extensions[t],a=s.images[o.source],c=n.textureLoader;if(a.uri){let l=n.options.manager.getHandler(a.uri);l!==null&&(c=l)}return n.loadTextureImage(e,o.source,c)}},V0=class{constructor(e){this.parser=e,this.name=He.EXT_TEXTURE_AVIF}loadTexture(e){let t=this.name,n=this.parser,s=n.json,r=s.textures[e];if(!r.extensions||!r.extensions[t])return null;let o=r.extensions[t],a=s.images[o.source],c=n.textureLoader;if(a.uri){let l=n.options.manager.getHandler(a.uri);l!==null&&(c=l)}return n.loadTextureImage(e,o.source,c)}},Lc=class{constructor(e,t){this.name=t,this.parser=e}loadBufferView(e){let t=this.parser.json,n=t.bufferViews[e];if(n.extensions&&n.extensions[this.name]){let s=n.extensions[this.name],r=this.parser.getDependency("buffer",s.buffer),o=this.parser.options.meshoptDecoder;if(!o||!o.supported){if(t.extensionsRequired&&t.extensionsRequired.indexOf(this.name)>=0)throw new Error("THREE.GLTFLoader: setMeshoptDecoder must be called before loading compressed files");return null}return r.then(function(a){let c=s.byteOffset||0,l=s.byteLength||0,h=s.count,d=s.byteStride,u=new Uint8Array(a,c,l);return o.decodeGltfBufferAsync?o.decodeGltfBufferAsync(h,d,u,s.mode,s.filter).then(function(p){return p.buffer}):o.ready.then(function(){let p=new ArrayBuffer(h*d);return o.decodeGltfBuffer(new Uint8Array(p),h,d,u,s.mode,s.filter),p})})}else return null}},G0=class{constructor(e){this.name=He.EXT_MESH_GPU_INSTANCING,this.parser=e}createNodeMesh(e){let t=this.parser.json,n=t.nodes[e];if(!n.extensions||!n.extensions[this.name]||n.mesh===void 0)return null;let s=t.meshes[n.mesh];for(let l of s.primitives)if(l.mode!==bn.TRIANGLES&&l.mode!==bn.TRIANGLE_STRIP&&l.mode!==bn.TRIANGLE_FAN&&l.mode!==void 0)return null;let o=n.extensions[this.name].attributes,a=[],c={};for(let l in o)a.push(this.parser.getDependency("accessor",o[l]).then(h=>(c[l]=h,c[l])));return a.length<1?null:(a.push(this.parser.createNodeMesh(e)),Promise.all(a).then(l=>{let h=l.pop(),d=h.isGroup?h.children:[h],u=l[0].count,p=[];for(let g of d){let b=new Ue,m=new N,f=new It,v=new N(1,1,1),T=new Ji(g.geometry,g.material,u);for(let S=0;S<u;S++)c.TRANSLATION&&m.fromBufferAttribute(c.TRANSLATION,S),c.ROTATION&&f.fromBufferAttribute(c.ROTATION,S),c.SCALE&&v.fromBufferAttribute(c.SCALE,S),T.setMatrixAt(S,b.compose(m,f,v));let y=null;for(let S in c)if(S==="_COLOR_0"){let w=c[S];T.instanceColor=new ni(w.array,w.itemSize,w.normalized)}else if(S!=="TRANSLATION"&&S!=="ROTATION"&&S!=="SCALE"){if(y===null){let R=T.geometry;y=new bt,y.name=R.name;for(let x in R.attributes)y.setAttribute(x,R.attributes[x]);for(let x in R.morphAttributes)y.morphAttributes[x]=R.morphAttributes[x];R.index!==null&&y.setIndex(R.index),y.morphTargetsRelative=R.morphTargetsRelative;for(let x of R.groups)y.addGroup(x.start,x.count,x.materialIndex);R.boundingBox!==null&&(y.boundingBox=R.boundingBox.clone()),R.boundingSphere!==null&&(y.boundingSphere=R.boundingSphere.clone()),y.drawRange.start=R.drawRange.start,y.drawRange.count=R.drawRange.count,y.userData=Object.assign({},R.userData),T.geometry=y}let w=c[S];y.setAttribute(S,new ni(w.array,w.itemSize,w.normalized))}ht.prototype.copy.call(T,g),this.parser.assignFinalMaterial(T),p.push(T)}return h.isGroup?(h.clear(),h.add(...p),h):p[0]}))}},Vd="glTF",yo=12,Bd={JSON:1313821514,BIN:5130562},W0=class{constructor(e){this.name=He.KHR_BINARY_GLTF,this.content=null,this.body=null;let t=new DataView(e,0,yo),n=new TextDecoder;if(this.header={magic:n.decode(new Uint8Array(e.slice(0,4))),version:t.getUint32(4,!0),length:t.getUint32(8,!0)},this.header.magic!==Vd)throw new Error("THREE.GLTFLoader: Unsupported glTF-Binary header.");if(this.header.version<2)throw new Error("THREE.GLTFLoader: Legacy binary file detected.");let s=this.header.length-yo,r=new DataView(e,yo),o=0;for(;o<s;){let a=r.getUint32(o,!0);o+=4;let c=r.getUint32(o,!0);if(o+=4,c===Bd.JSON){let l=new Uint8Array(e,yo+o,a);this.content=n.decode(l)}else if(c===Bd.BIN){let l=yo+o;this.body=e.slice(l,l+a)}o+=a}if(this.content===null)throw new Error("THREE.GLTFLoader: JSON content not found.")}},X0=class{constructor(e,t){if(!t)throw new Error("THREE.GLTFLoader: No DRACOLoader instance provided.");this.name=He.KHR_DRACO_MESH_COMPRESSION,this.json=e,this.dracoLoader=t,this.dracoLoader.preload()}decodePrimitive(e,t){let n=this.json,s=this.dracoLoader,r=e.extensions[this.name].bufferView,o=e.extensions[this.name].attributes,a={},c={},l={};for(let h in o){let d=K0[h]||h.toLowerCase();a[d]=o[h]}for(let h in e.attributes){let d=K0[h]||h.toLowerCase();if(o[h]!==void 0){let u=n.accessors[e.attributes[h]],p=pr[u.componentType];l[d]=p.name,c[d]=u.normalized===!0}}return t.getDependency("bufferView",r).then(function(h){return new Promise(function(d,u){s.decodeDracoFile(h,function(p){for(let g in p.attributes){let b=p.attributes[g],m=c[g];m!==void 0&&(b.normalized=m)}d(p)},a,l,$t,u)})})}},q0=class{constructor(){this.name=He.KHR_TEXTURE_TRANSFORM}extendTexture(e,t){if((t.texCoord===void 0||t.texCoord===e.channel)&&t.offset===void 0&&t.rotation===void 0&&t.scale===void 0)return e;if(e=e.clone(),t.texCoord!==void 0&&(e.channel=t.texCoord),t.offset!==void 0&&e.offset.fromArray(t.offset),t.rotation!==void 0&&(e.rotation=t.rotation),t.scale!==void 0&&e.repeat.fromArray(t.scale),t.rotation!==void 0){let n=Math.cos(e.rotation),s=Math.sin(e.rotation);e.matrix.set(e.repeat.x*n,e.repeat.y*s,e.offset.x,-e.repeat.x*s,e.repeat.y*n,e.offset.y,0,0,1),e.matrixAutoUpdate=!1}return e.needsUpdate=!0,e}},Y0=class{constructor(){this.name=He.KHR_MESH_QUANTIZATION}},Dc=class extends zn{constructor(e,t,n,s){super(e,t,n,s)}copySampleValue_(e){let t=this.resultBuffer,n=this.sampleValues,s=this.valueSize,r=e*s*3+s;for(let o=0;o!==s;o++)t[o]=n[r+o];return t}interpolate_(e,t,n,s){let r=this.resultBuffer,o=this.sampleValues,a=this.valueSize,c=a*2,l=a*3,h=s-t,d=(n-t)/h,u=d*d,p=u*d,g=e*l,b=g-l,m=-2*p+3*u,f=p-u,v=1-m,T=f-u+d;for(let y=0;y!==a;y++){let S=o[b+y+a],w=o[b+y+c]*h,R=o[g+y+a],x=o[g+y]*h;r[y]=v*S+T*w+m*R+f*x}return r}},Wg=new It,Z0=class extends Dc{interpolate_(e,t,n,s){let r=super.interpolate_(e,t,n,s);return Wg.fromArray(r).normalize().toArray(r),r}},bn={FLOAT:5126,FLOAT_MAT3:35675,FLOAT_MAT4:35676,FLOAT_VEC2:35664,FLOAT_VEC3:35665,FLOAT_VEC4:35666,LINEAR:9729,REPEAT:10497,SAMPLER_2D:35678,POINTS:0,LINES:1,LINE_LOOP:2,LINE_STRIP:3,TRIANGLES:4,TRIANGLE_STRIP:5,TRIANGLE_FAN:6,UNSIGNED_BYTE:5121,UNSIGNED_SHORT:5123},pr={5120:Int8Array,5121:Uint8Array,5122:Int16Array,5123:Uint16Array,5125:Uint32Array,5126:Float32Array},kd={9728:Mt,9729:gt,9984:Ra,9985:er,9986:hs,9987:un},zd={33071:_n,33648:Fs,10497:Ai},w0={SCALAR:1,VEC2:2,VEC3:3,VEC4:4,MAT2:4,MAT3:9,MAT4:16},K0={POSITION:"position",NORMAL:"normal",TANGENT:"tangent",TEXCOORD_0:"uv",TEXCOORD_1:"uv1",TEXCOORD_2:"uv2",TEXCOORD_3:"uv3",COLOR_0:"color",WEIGHTS_0:"skinWeight",JOINTS_0:"skinIndex"},Hi={scale:"scale",translation:"position",rotation:"quaternion",weights:"morphTargetInfluences"},Xg={CUBICSPLINE:void 0,LINEAR:$i,STEP:Ki},T0={OPAQUE:"OPAQUE",MASK:"MASK",BLEND:"BLEND"};function qg(i){return i.DefaultMaterial===void 0&&(i.DefaultMaterial=new kt({color:16777215,emissive:0,metalness:1,roughness:1,transparent:!1,depthTest:!0,side:vn})),i.DefaultMaterial}function xs(i,e,t){for(let n in t.extensions)i[n]===void 0&&(e.userData.gltfExtensions=e.userData.gltfExtensions||{},e.userData.gltfExtensions[n]=t.extensions[n])}function qn(i,e){e.extras!==void 0&&(typeof e.extras=="object"?Object.assign(i.userData,e.extras):console.warn("THREE.GLTFLoader: Ignoring primitive type .extras, "+e.extras))}function Yg(i,e,t){let n=!1,s=!1,r=!1;for(let l=0,h=e.length;l<h;l++){let d=e[l];if(d.POSITION!==void 0&&(n=!0),d.NORMAL!==void 0&&(s=!0),d.COLOR_0!==void 0&&(r=!0),n&&s&&r)break}if(!n&&!s&&!r)return Promise.resolve(i);let o=[],a=[],c=[];for(let l=0,h=e.length;l<h;l++){let d=e[l];if(n){let u=d.POSITION!==void 0?t.getDependency("accessor",d.POSITION):i.attributes.position;o.push(u)}if(s){let u=d.NORMAL!==void 0?t.getDependency("accessor",d.NORMAL):i.attributes.normal;a.push(u)}if(r){let u=d.COLOR_0!==void 0?t.getDependency("accessor",d.COLOR_0):i.attributes.color;c.push(u)}}return Promise.all([Promise.all(o),Promise.all(a),Promise.all(c)]).then(function(l){let h=l[0],d=l[1],u=l[2];return n&&(i.morphAttributes.position=h),s&&(i.morphAttributes.normal=d),r&&(i.morphAttributes.color=u),i.morphTargetsRelative=!0,i})}function Zg(i,e){if(i.updateMorphTargets(),e.weights!==void 0)for(let t=0,n=e.weights.length;t<n;t++)i.morphTargetInfluences[t]=e.weights[t];if(e.extras&&Array.isArray(e.extras.targetNames)){let t=e.extras.targetNames;if(i.morphTargetInfluences.length===t.length){i.morphTargetDictionary={};for(let n=0,s=t.length;n<s;n++)i.morphTargetDictionary[t[n]]=n}else console.warn("THREE.GLTFLoader: Invalid extras.targetNames length. Ignoring names.")}}function Kg(i){let e,t=i.extensions&&i.extensions[He.KHR_DRACO_MESH_COMPRESSION];if(t?e="draco:"+t.bufferView+":"+t.indices+":"+A0(t.attributes):e=i.indices+":"+A0(i.attributes)+":"+i.mode,i.targets!==void 0)for(let n=0,s=i.targets.length;n<s;n++)e+=":"+A0(i.targets[n]);return e}function A0(i){let e="",t=Object.keys(i).sort();for(let n=0,s=t.length;n<s;n++)e+=t[n]+":"+i[t[n]]+";";return e}function $0(i){switch(i){case Int8Array:return 1/127;case Uint8Array:return 1/255;case Int16Array:return 1/32767;case Uint16Array:return 1/65535;default:throw new Error("THREE.GLTFLoader: Unsupported normalized accessor component type.")}}function $g(i){return i.search(/\.jpe?g($|\?)/i)>0||i.search(/^data\:image\/jpeg/)===0?"image/jpeg":i.search(/\.webp($|\?)/i)>0||i.search(/^data\:image\/webp/)===0?"image/webp":i.search(/\.ktx2($|\?)/i)>0||i.search(/^data\:image\/ktx2/)===0?"image/ktx2":"image/png"}var jg=new Ue,j0=class{constructor(e={},t={}){this.json=e,this.extensions={},this.plugins={},this.options=t,this.cache=new Gg,this.associations=new Map,this.primitiveCache={},this.nodeCache={},this.meshCache={refs:{},uses:{}},this.cameraCache={refs:{},uses:{}},this.lightCache={refs:{},uses:{}},this.sourceCache={},this.textureCache={},this.nodeNamesUsed={};let n=!1,s=-1,r=!1,o=-1;if(typeof navigator<"u"&&typeof navigator.userAgent<"u"){let a=navigator.userAgent;n=/^((?!chrome|android).)*safari/i.test(a)===!0;let c=a.match(/Version\/(\d+)/);s=n&&c?parseInt(c[1],10):-1,r=a.indexOf("Firefox")>-1,o=r?a.match(/Firefox\/([0-9]+)\./)[1]:-1}typeof createImageBitmap>"u"||n&&s<17||r&&o<98?this.textureLoader=new qr(this.options.manager):this.textureLoader=new $r(this.options.manager),this.textureLoader.setCrossOrigin(this.options.crossOrigin),this.textureLoader.setRequestHeader(this.options.requestHeader),this.fileLoader=new is(this.options.manager),this.fileLoader.setResponseType("arraybuffer"),this.options.crossOrigin==="use-credentials"&&this.fileLoader.setWithCredentials(!0)}setExtensions(e){this.extensions=e}setPlugins(e){this.plugins=e}parse(e,t){let n=this,s=this.json,r=this.extensions;this.cache.removeAll(),this.nodeCache={},this._invokeAll(function(o){return o._markDefs&&o._markDefs()}),Promise.all(this._invokeAll(function(o){return o.beforeRoot&&o.beforeRoot()})).then(function(){return Promise.all([n.getDependencies("scene"),n.getDependencies("animation"),n.getDependencies("camera")])}).then(function(o){let a={scene:o[0][s.scene||0],scenes:o[0],animations:o[1],cameras:o[2],asset:s.asset,parser:n,userData:{}};return xs(r,a,s),qn(a,s),Promise.all(n._invokeAll(function(c){return c.afterRoot&&c.afterRoot(a)})).then(function(){for(let c of a.scenes)c.updateMatrixWorld();e(a)})}).catch(t)}_markDefs(){let e=this.json.nodes||[],t=this.json.skins||[],n=this.json.meshes||[];for(let s=0,r=t.length;s<r;s++){let o=t[s].joints;for(let a=0,c=o.length;a<c;a++)e[o[a]].isBone=!0}for(let s=0,r=e.length;s<r;s++){let o=e[s];o.mesh!==void 0&&(this._addNodeRef(this.meshCache,o.mesh),o.skin!==void 0&&(n[o.mesh].isSkinnedMesh=!0)),o.camera!==void 0&&this._addNodeRef(this.cameraCache,o.camera)}}_addNodeRef(e,t){t!==void 0&&(e.refs[t]===void 0&&(e.refs[t]=e.uses[t]=0),e.refs[t]++)}_getNodeRef(e,t,n){if(e.refs[t]<=1)return n;let s=n.clone(),r=(o,a)=>{let c=this.associations.get(o);c!=null&&this.associations.set(a,c);for(let[l,h]of o.children.entries())r(h,a.children[l])};return r(n,s),s.name+="_instance_"+e.uses[t]++,s}_invokeOne(e){let t=Object.values(this.plugins);t.push(this);for(let n=0;n<t.length;n++){let s=e(t[n]);if(s)return s}return null}_invokeAll(e){let t=Object.values(this.plugins);t.unshift(this);let n=[];for(let s=0;s<t.length;s++){let r=e(t[s]);r&&n.push(r)}return n}getDependency(e,t){let n=e+":"+t,s=this.cache.get(n);if(!s){switch(e){case"scene":s=this.loadScene(t);break;case"node":s=this._invokeOne(function(r){return r.loadNode&&r.loadNode(t)});break;case"mesh":s=this._invokeOne(function(r){return r.loadMesh&&r.loadMesh(t)});break;case"accessor":s=this.loadAccessor(t);break;case"bufferView":s=this._invokeOne(function(r){return r.loadBufferView&&r.loadBufferView(t)});break;case"buffer":s=this.loadBuffer(t);break;case"material":s=this._invokeOne(function(r){return r.loadMaterial&&r.loadMaterial(t)});break;case"texture":s=this._invokeOne(function(r){return r.loadTexture&&r.loadTexture(t)});break;case"skin":s=this.loadSkin(t);break;case"animation":s=this._invokeOne(function(r){return r.loadAnimation&&r.loadAnimation(t)});break;case"camera":s=this.loadCamera(t);break;default:if(s=this._invokeOne(function(r){return r!=this&&r.getDependency&&r.getDependency(e,t)}),!s)throw new Error("Unknown type: "+e);break}this.cache.add(n,s)}return s}getDependencies(e){let t=this.cache.get(e);if(!t){let n=this,s=this.json[e+(e==="mesh"?"es":"s")]||[];t=Promise.all(s.map(function(r,o){return n.getDependency(e,o)})),this.cache.add(e,t)}return t}loadBuffer(e){let t=this.json.buffers[e],n=this.fileLoader;if(t.type&&t.type!=="arraybuffer")throw new Error("THREE.GLTFLoader: "+t.type+" buffer type is not supported.");if(t.uri===void 0&&e===0)return Promise.resolve(this.extensions[He.KHR_BINARY_GLTF].body);let s=this.options;return new Promise(function(r,o){n.load(li.resolveURL(t.uri,s.path),r,void 0,function(){o(new Error('THREE.GLTFLoader: Failed to load buffer "'+t.uri+'".'))})})}loadBufferView(e){let t=this.json.bufferViews[e];return this.getDependency("buffer",t.buffer).then(function(n){let s=t.byteLength||0,r=t.byteOffset||0;return n.slice(r,r+s)})}loadAccessor(e){let t=this,n=this.json,s=this.json.accessors[e];if(s.bufferView===void 0&&s.sparse===void 0){let o=w0[s.type],a=pr[s.componentType],c=s.normalized===!0,l=new a(s.count*o);return Promise.resolve(new yt(l,o,c))}let r=[];return s.bufferView!==void 0?r.push(this.getDependency("bufferView",s.bufferView)):r.push(null),s.sparse!==void 0&&(r.push(this.getDependency("bufferView",s.sparse.indices.bufferView)),r.push(this.getDependency("bufferView",s.sparse.values.bufferView))),Promise.all(r).then(function(o){let a=o[0],c=w0[s.type],l=pr[s.componentType],h=l.BYTES_PER_ELEMENT,d=h*c,u=s.byteOffset||0,p=s.bufferView!==void 0?n.bufferViews[s.bufferView].byteStride:void 0,g=s.normalized===!0,b,m;if(p&&p!==d){let f=Math.floor(u/p),v="InterleavedBuffer:"+s.bufferView+":"+s.componentType+":"+f+":"+s.count,T=t.cache.get(v);T||(b=new l(a,f*p,s.count*p/h),T=new Gs(b,p/h),t.cache.add(v,T)),m=new Ws(T,c,u%p/h,g)}else a===null?b=new l(s.count*c):b=new l(a,u,s.count*c),m=new yt(b,c,g);if(s.sparse!==void 0){let f=w0.SCALAR,v=pr[s.sparse.indices.componentType],T=s.sparse.indices.byteOffset||0,y=s.sparse.values.byteOffset||0,S=new v(o[1],T,s.sparse.count*f),w=new l(o[2],y,s.sparse.count*c);a!==null&&(m=new yt(m.array.slice(),m.itemSize,m.normalized)),m.normalized=!1;for(let R=0,x=S.length;R<x;R++){let A=S[R];if(m.setX(A,w[R*c]),c>=2&&m.setY(A,w[R*c+1]),c>=3&&m.setZ(A,w[R*c+2]),c>=4&&m.setW(A,w[R*c+3]),c>=5)throw new Error("THREE.GLTFLoader: Unsupported itemSize in sparse BufferAttribute.")}m.normalized=g}return m})}loadTexture(e){let t=this.json,n=this.options,r=t.textures[e].source,o=t.images[r],a=this.textureLoader;if(o.uri){let c=n.manager.getHandler(o.uri);c!==null&&(a=c)}return this.loadTextureImage(e,r,a)}loadTextureImage(e,t,n){let s=this,r=this.json,o=r.textures[e],a=r.images[t],c=(a.uri||a.bufferView)+":"+o.sampler;if(this.textureCache[c])return this.textureCache[c];let l=this.loadImageSource(t,n).then(function(h){h.flipY=!1,h.name=o.name||a.name||"",h.name===""&&typeof a.uri=="string"&&a.uri.startsWith("data:image/")===!1&&(h.name=a.uri);let u=(r.samplers||{})[o.sampler]||{};return h.magFilter=kd[u.magFilter]||gt,h.minFilter=kd[u.minFilter]||un,h.wrapS=zd[u.wrapS]||Ai,h.wrapT=zd[u.wrapT]||Ai,h.generateMipmaps=!h.isCompressedTexture&&h.minFilter!==Mt&&h.minFilter!==gt,s.associations.set(h,{textures:e}),h}).catch(function(){return null});return this.textureCache[c]=l,l}loadImageSource(e,t){let n=this,s=this.json,r=this.options;if(this.sourceCache[e]!==void 0)return this.sourceCache[e].then(d=>d.clone());let o=s.images[e],a=self.URL||self.webkitURL,c=o.uri||"",l=!1;if(o.bufferView!==void 0)c=n.getDependency("bufferView",o.bufferView).then(function(d){l=!0;let u=new Blob([d],{type:o.mimeType});return c=a.createObjectURL(u),c});else if(o.uri===void 0)throw new Error("THREE.GLTFLoader: Image "+e+" is missing URI and bufferView");let h=Promise.resolve(c).then(function(d){return new Promise(function(u,p){let g=u;t.isImageBitmapLoader===!0&&(g=function(b){let m=new Ft(b);m.needsUpdate=!0,u(m)}),t.load(li.resolveURL(d,r.path),g,void 0,p)})}).then(function(d){return l===!0&&a.revokeObjectURL(c),qn(d,o),d.userData.mimeType=o.mimeType||$g(o.uri),d}).catch(function(d){throw console.error("THREE.GLTFLoader: Couldn't load texture",c),d});return this.sourceCache[e]=h,h}assignTexture(e,t,n,s){let r=this;return this.getDependency("texture",n.index).then(function(o){if(!o)return null;if(n.texCoord!==void 0&&n.texCoord>0&&(o=o.clone(),o.channel=n.texCoord),r.extensions[He.KHR_TEXTURE_TRANSFORM]){let a=n.extensions!==void 0?n.extensions[He.KHR_TEXTURE_TRANSFORM]:void 0;if(a){let c=r.associations.get(o);o=r.extensions[He.KHR_TEXTURE_TRANSFORM].extendTexture(o,a),r.associations.set(o,c)}}return s!==void 0&&(o.colorSpace=s),e[t]=o,o})}assignFinalMaterial(e){let t=e.geometry,n=e.material,s=t.attributes.tangent===void 0,r=t.attributes.color!==void 0,o=t.attributes.normal===void 0;if(e.isPoints){let a="PointsMaterial:"+n.uuid,c=this.cache.get(a);c||(c=new es,_t.prototype.copy.call(c,n),c.color.copy(n.color),c.map=n.map,c.sizeAttenuation=!1,this.cache.add(a,c)),n=c}else if(e.isLine){let a="LineBasicMaterial:"+n.uuid,c=this.cache.get(a);c||(c=new Ri,_t.prototype.copy.call(c,n),c.color.copy(n.color),c.map=n.map,this.cache.add(a,c)),n=c}if(s||r||o){let a="ClonedMaterial:"+n.uuid+":";s&&(a+="derivative-tangents:"),r&&(a+="vertex-colors:"),o&&(a+="flat-shading:");let c=this.cache.get(a);c||(c=n.clone(),r&&(c.vertexColors=!0),o&&(c.flatShading=!0),s&&(c.normalScale&&(c.normalScale.y*=-1),c.clearcoatNormalScale&&(c.clearcoatNormalScale.y*=-1)),this.cache.add(a,c),this.associations.set(c,this.associations.get(n))),n=c}e.material=n}getMaterialType(){return kt}loadMaterial(e){let t=this,n=this.json,s=this.extensions,r=n.materials[e],o,a={},c=r.extensions||{},l=[];if(c[He.KHR_MATERIALS_UNLIT]){let d=s[He.KHR_MATERIALS_UNLIT];o=d.getMaterialType(),l.push(d.extendParams(a,r,t))}else{let d=r.pbrMetallicRoughness||{};if(a.color=new pe(1,1,1),a.opacity=1,Array.isArray(d.baseColorFactor)){let u=d.baseColorFactor;a.color.setRGB(u[0],u[1],u[2],$t),a.opacity=u[3]}d.baseColorTexture!==void 0&&l.push(t.assignTexture(a,"map",d.baseColorTexture,Ct)),a.metalness=d.metallicFactor!==void 0?d.metallicFactor:1,a.roughness=d.roughnessFactor!==void 0?d.roughnessFactor:1,d.metallicRoughnessTexture!==void 0&&(l.push(t.assignTexture(a,"metalnessMap",d.metallicRoughnessTexture)),l.push(t.assignTexture(a,"roughnessMap",d.metallicRoughnessTexture))),o=this._invokeOne(function(u){return u.getMaterialType&&u.getMaterialType(e)}),l.push(Promise.all(this._invokeAll(function(u){return u.extendMaterialParams&&u.extendMaterialParams(e,a)})))}r.doubleSided===!0&&(a.side=on);let h=r.alphaMode||T0.OPAQUE;if(h===T0.BLEND?(a.transparent=!0,a.depthWrite=!1):(a.transparent=!1,h===T0.MASK&&(a.alphaTest=r.alphaCutoff!==void 0?r.alphaCutoff:.5)),r.normalTexture!==void 0&&o!==yn&&(l.push(t.assignTexture(a,"normalMap",r.normalTexture)),a.normalScale=new we(1,1),r.normalTexture.scale!==void 0)){let d=r.normalTexture.scale;a.normalScale.set(d,d)}if(r.occlusionTexture!==void 0&&o!==yn&&(l.push(t.assignTexture(a,"aoMap",r.occlusionTexture)),r.occlusionTexture.strength!==void 0&&(a.aoMapIntensity=r.occlusionTexture.strength)),r.emissiveFactor!==void 0&&o!==yn){let d=r.emissiveFactor;a.emissive=new pe().setRGB(d[0],d[1],d[2],$t)}return r.emissiveTexture!==void 0&&o!==yn&&l.push(t.assignTexture(a,"emissiveMap",r.emissiveTexture,Ct)),Promise.all(l).then(function(){let d=new o(a);return r.name&&(d.name=r.name),qn(d,r),t.associations.set(d,{materials:e}),r.extensions&&xs(s,d,r),d})}createUniqueName(e){let t=st.sanitizeNodeName(e||"");return t in this.nodeNamesUsed?t+"_"+ ++this.nodeNamesUsed[t]:(this.nodeNamesUsed[t]=0,t)}loadGeometries(e){let t=this,n=this.extensions,s=this.primitiveCache;function r(a){return n[He.KHR_DRACO_MESH_COMPRESSION].decodePrimitive(a,t).then(function(c){return Hd(c,a,t)})}let o=[];for(let a=0,c=e.length;a<c;a++){let l=e[a],h=Kg(l),d=s[h];if(d)o.push(d.promise);else{let u;l.extensions&&l.extensions[He.KHR_DRACO_MESH_COMPRESSION]?u=r(l):u=Hd(new bt,l,t),l.mode===bn.TRIANGLE_STRIP?u=u.then(p=>S0(p,ao)):l.mode===bn.TRIANGLE_FAN&&(u=u.then(p=>S0(p,sr))),s[h]={primitive:l,promise:u},o.push(u)}}return Promise.all(o)}loadMesh(e){let t=this,n=this.json,s=this.extensions,r=n.meshes[e],o=r.primitives,a=[];for(let c=0,l=o.length;c<l;c++){let h=o[c].material===void 0?qg(this.cache):this.getDependency("material",o[c].material);a.push(h)}return a.push(t.loadGeometries(o)),Promise.all(a).then(async function(c){let l=c.slice(0,c.length-1),h=c[c.length-1],d=[];for(let p=0,g=h.length;p<g;p++){let b=h[p],m=o[p],f,v=l[p];if(m.mode===bn.TRIANGLES||m.mode===bn.TRIANGLE_STRIP||m.mode===bn.TRIANGLE_FAN||m.mode===void 0){let T=r.isSkinnedMesh===!0,y=b.hasAttribute("skinIndex")&&b.hasAttribute("skinWeight");T&&y===!1&&console.warn("THREE.GLTFLoader: Missing skinIndex or skinWeight attributes. Skinning disabled."),f=T&&y?new Ur(b,v):new Ke(b,v),f.isSkinnedMesh===!0&&f.normalizeSkinWeights()}else if(m.mode===bn.LINES)f=new Fr(b,v);else if(m.mode===bn.LINE_STRIP)f=new Qi(b,v);else if(m.mode===bn.LINE_LOOP)f=new Br(b,v);else if(m.mode===bn.POINTS)f=new kr(b,v);else throw new Error("THREE.GLTFLoader: Primitive mode unsupported: "+m.mode);Object.keys(f.geometry.morphAttributes).length>0&&Zg(f,r),f.name=t.createUniqueName(r.name||"mesh_"+e),qn(f,r),m.extensions&&xs(s,f,m),t.assignFinalMaterial(f),d.push(f)}for(let p=0,g=d.length;p<g;p++)t.associations.set(d[p],{meshes:e,primitives:p});if(d.length===1)return r.extensions&&xs(s,d[0],r),d[0];let u=new Bt;r.extensions&&xs(s,u,r),t.associations.set(u,{meshes:e});for(let p=0,g=d.length;p<g;p++)u.add(d[p]);return u})}loadCamera(e){let t,n=this.json.cameras[e],s=n[n.type];if(!s){console.warn("THREE.GLTFLoader: Missing camera parameters.");return}return n.type==="perspective"?t=new xt(co.radToDeg(s.yfov),s.aspectRatio||1,s.znear||1,s.zfar||2e6):n.type==="orthographic"&&(t=new Li(-s.xmag,s.xmag,s.ymag,-s.ymag,s.znear,s.zfar)),n.name&&(t.name=this.createUniqueName(n.name)),qn(t,n),Promise.resolve(t)}loadSkin(e){let t=this.json.skins[e],n=[];for(let s=0,r=t.joints.length;s<r;s++)n.push(this._loadNodeShallow(t.joints[s]));return t.inverseBindMatrices!==void 0?n.push(this.getDependency("accessor",t.inverseBindMatrices)):n.push(null),Promise.all(n).then(function(s){let r=s.pop(),o=s,a=[],c=[];for(let l=0,h=o.length;l<h;l++){let d=o[l];if(d){a.push(d);let u=new Ue;r!==null&&u.fromArray(r.array,l*16),c.push(u)}else console.warn('THREE.GLTFLoader: Joint "%s" could not be found.',t.joints[l])}return new Or(a,c)})}loadAnimation(e){let t=this.json,n=this,s=t.animations[e],r=s.name?s.name:"animation_"+e,o=[],a=[],c=[],l=[],h=[];for(let d=0,u=s.channels.length;d<u;d++){let p=s.channels[d],g=s.samplers[p.sampler],b=p.target,m=b.node,f=s.parameters!==void 0?s.parameters[g.input]:g.input,v=s.parameters!==void 0?s.parameters[g.output]:g.output;b.node!==void 0&&(o.push(this.getDependency("node",m)),a.push(this.getDependency("accessor",f)),c.push(this.getDependency("accessor",v)),l.push(g),h.push(b))}return Promise.all([Promise.all(o),Promise.all(a),Promise.all(c),Promise.all(l),Promise.all(h)]).then(function(d){let u=d[0],p=d[1],g=d[2],b=d[3],m=d[4],f=[];for(let T=0,y=u.length;T<y;T++){let S=u[T],w=p[T],R=g[T],x=b[T],A=m[T];if(S===void 0)continue;S.updateMatrix&&S.updateMatrix();let C=n._createAnimationTracks(S,w,R,x,A);if(C)for(let L=0;L<C.length;L++)f.push(C[L])}let v=new ns(r,void 0,f);return qn(v,s),v})}createNodeMesh(e){let t=this.json,n=this,s=t.nodes[e];return s.mesh===void 0?null:n.getDependency("mesh",s.mesh).then(function(r){let o=n._getNodeRef(n.meshCache,s.mesh,r);return s.weights!==void 0&&o.traverse(function(a){if(a.isMesh)for(let c=0,l=s.weights.length;c<l;c++)a.morphTargetInfluences[c]=s.weights[c]}),o})}loadNode(e){let t=this.json,n=this,s=t.nodes[e],r=n._loadNodeShallow(e),o=[],a=s.children||[];for(let l=0,h=a.length;l<h;l++)o.push(n.getDependency("node",a[l]));let c=s.skin===void 0?Promise.resolve(null):n.getDependency("skin",s.skin);return Promise.all([r,Promise.all(o),c]).then(function(l){let h=l[0],d=l[1],u=l[2];u!==null&&h.traverse(function(p){p.isSkinnedMesh&&p.bind(u,jg)});for(let p=0,g=d.length;p<g;p++)h.add(d[p]);if(h.userData.pivot!==void 0&&d.length>0){let p=h.userData.pivot,g=d[0];h.pivot=new N().fromArray(p),h.position.x-=p[0],h.position.y-=p[1],h.position.z-=p[2],g.position.set(0,0,0),delete h.userData.pivot}return h})}_loadNodeShallow(e){let t=this.json,n=this.extensions,s=this;if(this.nodeCache[e]!==void 0)return this.nodeCache[e];let r=t.nodes[e],o=r.name?s.createUniqueName(r.name):"",a=[],c=s._invokeOne(function(l){return l.createNodeMesh&&l.createNodeMesh(e)});return c&&a.push(c),r.camera!==void 0&&a.push(s.getDependency("camera",r.camera).then(function(l){return s._getNodeRef(s.cameraCache,r.camera,l)})),s._invokeAll(function(l){return l.createNodeAttachment&&l.createNodeAttachment(e)}).forEach(function(l){a.push(l)}),this.nodeCache[e]=Promise.all(a).then(function(l){let h;if(r.isBone===!0?h=new Xs:l.length>1?h=new Bt:l.length===1?h=l[0]:h=new ht,h!==l[0])for(let d=0,u=l.length;d<u;d++)h.add(l[d]);if(r.name&&(h.userData.name=r.name,h.name=o),qn(h,r),r.extensions&&xs(n,h,r),r.matrix!==void 0){let d=new Ue;d.fromArray(r.matrix),h.applyMatrix4(d)}else r.translation!==void 0&&h.position.fromArray(r.translation),r.rotation!==void 0&&h.quaternion.fromArray(r.rotation),r.scale!==void 0&&h.scale.fromArray(r.scale);if(!s.associations.has(h))s.associations.set(h,{});else if(r.mesh!==void 0&&s.meshCache.refs[r.mesh]>1){let d=s.associations.get(h);s.associations.set(h,{...d})}return s.associations.get(h).nodes=e,h}),this.nodeCache[e]}loadScene(e){let t=this.extensions,n=this.json.scenes[e],s=this,r=new Bt;n.name&&(r.name=s.createUniqueName(n.name)),qn(r,n),n.extensions&&xs(t,r,n);let o=n.nodes||[],a=[];for(let c=0,l=o.length;c<l;c++)a.push(s.getDependency("node",o[c]));return Promise.all(a).then(function(c){for(let h=0,d=c.length;h<d;h++){let u=c[h];u.parent!==null?r.add(Od(u)):r.add(u)}let l=h=>{let d=new Map;for(let[u,p]of s.associations)(u instanceof _t||u instanceof Ft)&&d.set(u,p);return h.traverse(u=>{let p=s.associations.get(u);p!=null&&d.set(u,p)}),d};return s.associations=l(r),r})}_createAnimationTracks(e,t,n,s,r){let o=[],a=e.name?e.name:e.uuid,c=[];function l(p){p.morphTargetInfluences&&c.push(p.name?p.name:p.uuid)}Hi[r.path]===Hi.weights?(l(e),e.isGroup&&e.children.forEach(l)):c.push(a);let h;switch(Hi[r.path]){case Hi.weights:h=ri;break;case Hi.rotation:h=oi;break;case Hi.translation:case Hi.scale:h=Pi;break;default:n.itemSize===1?h=ri:h=Pi;break}let d=s.interpolation!==void 0?Xg[s.interpolation]:$i,u=this._getArrayFromAccessor(n);for(let p=0,g=c.length;p<g;p++){let b=new h(c[p]+"."+Hi[r.path],t.array,u,d);s.interpolation==="CUBICSPLINE"&&this._createCubicSplineTrackInterpolant(b),o.push(b)}return o}_getArrayFromAccessor(e){let t=e.array;if(e.normalized){let n=$0(t.constructor),s=new Float32Array(t.length);for(let r=0,o=t.length;r<o;r++)s[r]=t[r]*n;t=s}return t}_createCubicSplineTrackInterpolant(e){e.createInterpolant=function(n){let s=this instanceof oi?Z0:Dc;return new s(this.times,this.values,this.getValueSize()/3,n)},e.createInterpolant.isInterpolantFactoryMethodGLTFCubicSpline=!0}};function Jg(i,e,t){let n=e.attributes,s=new jt;if(n.POSITION!==void 0){let a=t.json.accessors[n.POSITION],c=a.min,l=a.max;if(c!==void 0&&l!==void 0){if(s.set(new N(c[0],c[1],c[2]),new N(l[0],l[1],l[2])),a.normalized){let h=$0(pr[a.componentType]);s.min.multiplyScalar(h),s.max.multiplyScalar(h)}}else{console.warn("THREE.GLTFLoader: Missing min/max properties for accessor POSITION.");return}}else return;let r=e.targets;if(r!==void 0){let a=new N,c=new N;for(let l=0,h=r.length;l<h;l++){let d=r[l];if(d.POSITION!==void 0){let u=t.json.accessors[d.POSITION],p=u.min,g=u.max;if(p!==void 0&&g!==void 0){if(c.setX(Math.max(Math.abs(p[0]),Math.abs(g[0]))),c.setY(Math.max(Math.abs(p[1]),Math.abs(g[1]))),c.setZ(Math.max(Math.abs(p[2]),Math.abs(g[2]))),u.normalized){let b=$0(pr[u.componentType]);c.multiplyScalar(b)}a.max(c)}else console.warn("THREE.GLTFLoader: Missing min/max properties for accessor POSITION.")}}s.expandByVector(a)}i.boundingBox=s;let o=new nn;s.getCenter(o.center),o.radius=s.min.distanceTo(s.max)/2,i.boundingSphere=o}function Hd(i,e,t){let n=e.attributes,s=[];function r(o,a){return t.getDependency("accessor",o).then(function(c){i.setAttribute(a,c)})}for(let o in n){let a=K0[o]||o.toLowerCase();a in i.attributes||s.push(r(n[o],a))}if(e.indices!==void 0&&!i.index){let o=t.getDependency("accessor",e.indices).then(function(a){i.setIndex(a)});s.push(o)}return Be.workingColorSpace!==$t&&"COLOR_0"in n&&console.warn(`THREE.GLTFLoader: Converting vertex colors from "srgb-linear" to "${Be.workingColorSpace}" not supported.`),qn(i,e),Jg(i,e,t),Promise.all(s).then(function(){return e.targets!==void 0?Yg(i,e.targets,t):i})}var _r=class extends ei{constructor(){super(),this.name="RoomEnvironment",this.position.y=-3.5;let e=new Ii;e.deleteAttribute("uv");let t=new kt({side:zt}),n=new kt,s=new os(16777215,900,28,2);s.position.set(.418,16.199,.3),this.add(s);let r=new Ke(e,t);r.position.set(-.757,13.219,.717),r.scale.set(31.713,28.305,28.591),this.add(r);let o=new Ji(e,n,6),a=new ht;a.position.set(-10.906,2.009,1.846),a.rotation.set(0,-.195,0),a.scale.set(2.328,7.905,4.651),a.updateMatrix(),o.setMatrixAt(0,a.matrix),a.position.set(-5.607,-.754,-.758),a.rotation.set(0,.994,0),a.scale.set(1.97,1.534,3.955),a.updateMatrix(),o.setMatrixAt(1,a.matrix),a.position.set(6.167,.857,7.803),a.rotation.set(0,.561,0),a.scale.set(3.927,6.285,3.687),a.updateMatrix(),o.setMatrixAt(2,a.matrix),a.position.set(-2.017,.018,6.124),a.rotation.set(0,.333,0),a.scale.set(2.002,4.566,2.064),a.updateMatrix(),o.setMatrixAt(3,a.matrix),a.position.set(2.291,-.756,-2.621),a.rotation.set(0,-.286,0),a.scale.set(1.546,1.552,1.496),a.updateMatrix(),o.setMatrixAt(4,a.matrix),a.position.set(-2.193,-.369,-5.547),a.rotation.set(0,.516,0),a.scale.set(3.875,3.487,2.986),a.updateMatrix(),o.setMatrixAt(5,a.matrix),this.add(o);let c=new Ke(e,gr(50));c.position.set(-16.116,14.37,8.208),c.scale.set(.1,2.428,2.739),this.add(c);let l=new Ke(e,gr(50));l.position.set(-16.109,18.021,-8.207),l.scale.set(.1,2.425,2.751),this.add(l);let h=new Ke(e,gr(17));h.position.set(14.904,12.198,-1.832),h.scale.set(.15,4.265,6.331),this.add(h);let d=new Ke(e,gr(43));d.position.set(-.462,8.89,14.52),d.scale.set(4.38,5.441,.088),this.add(d);let u=new Ke(e,gr(20));u.position.set(3.235,11.486,-12.541),u.scale.set(2.5,2,.1),this.add(u);let p=new Ke(e,gr(100));p.position.set(0,20,0),p.scale.set(1,.1,1),this.add(p)}dispose(){let e=new Set;this.traverse(t=>{t.isMesh&&(e.add(t.geometry),e.add(t.material))});for(let t of e)t.dispose()}};function gr(i){return new Ks({color:0,emissive:16777215,emissiveIntensity:i})}function J0(i=pn){return i.flatMap(e=>(e.requiredOpenWater||[]).flatMap(t=>t.cells.map(n=>{let{q:s,r}=n;for(let o=0;o<((e.rotation||0)%6+6)%6;o++)[s,r]=[-r,s+r];return{q:e.q+s,r:e.r+r,protection:{id:`${e.id}:${t.id}`,reason:t.reason,oceanConnected:!!t.oceanConnected,source:{id:e.id,title:e.title,q:e.q,r:e.r}}}})))}var Qg=J0(),Y4=new Map(Qg.map(i=>[`${i.q},${i.r}`,i.protection]));var nv=Object.freeze({id:"tidewater-harbor",source:{q:1,r:0},edge:1,t:.660848,width:42,depth:10,clearance:16}),iv=Yt();var th={...go,..._o},i_=_s.map(i=>({...i,styles:[i.family]})),s_=Cc.map(i=>({...i,color:th[i.family].land})),Wd=_0,Xd=(i,e,t,n=0,s=[])=>_s.some(r=>r.id===t)?Id(i,e,t,n,s):Rc(i,e,t,n,s);var nh=Cd;function Qt(i){let e=new Set,t=new Set,n=new Set;i.traverse(s=>{s.geometry&&e.add(s.geometry),s.customDepthMaterial&&t.add(s.customDepthMaterial);for(let r of Array.isArray(s.material)?s.material:s.material?[s.material]:[]){t.add(r);for(let o of Object.values(r))o?.isTexture&&n.add(o)}});for(let s of e)s.dispose();for(let s of t)s.dispose();for(let s of n)s.dispose();i.removeFromParent()}var Vv=new Ys(1,0),Gv=new Ys(1,1),Zd=new bt;Zd.setAttribute("position",new Et([0,0,-1,-.52,0,-.2,0,.16,0,0,.16,0,-.52,0,-.2,0,0,1,0,0,-1,0,.16,0,.52,0,-.2,.52,0,-.2,0,.16,0,0,0,1],3));Zd.computeVertexNormals();var dM={...go,..._o};var FM=[...bc,...Wd];function o_(i,e,t,n=0,s=[],r=4){if(bc.some(o=>o.id===t))return Xn(i,e,t);if(t.startsWith("authored-")){let o=Tc(t.slice(9));if(o.q!==i||o.r!==e)throw Error("Original tile coordinate is fixed.");return o}return r===2?bd(i,e,t,n,s):Xd(i,e,t,n,s)}async function Kd(i,e,t,n=0,s=[],r=4){let o=o_(i,e,t,n,s,r);return{...o,hash:await hr(u0(o))}}async function $d(i,{contract:e,load:t,mode:n="map",showSlot:s=!0,signal:r}={}){r?.throwIfAborted();let o=new ei;o.background=new pe("#c6d7d2");let a=new cr({antialias:!0,alpha:!1});a.setPixelRatio(Math.min(devicePixelRatio,2)),a.shadowMap.enabled=!0,a.shadowMap.type=hi,a.toneMapping=cs,a.toneMappingExposure=.9;let c=new Bi(a),l=new _r,h=c.fromScene(l,.04);o.environment=h.texture,o.environmentIntensity=.45,l.dispose(),c.dispose(),i.replaceChildren(a.domElement),a.domElement.setAttribute("aria-label","Interactive 3D tile preview"),a.domElement.setAttribute("tabindex","0");let d=new xt(38,1,.05,150),u=new fr(d,a.domElement);d.position.set(15,18,22),u.target.set(0,1.5,0),u.minDistance=12,u.maxDistance=48,u.maxPolarAngle=Math.PI*.46,u.enableDamping=!0,u.update(),u.saveState();let p=new rs("#e7f3ff","#799172",.85);o.add(p);let g=new ci("#fff0d5",2.4);g.position.set(-14,27,14),g.castShadow=!0,g.shadow.mapSize.set(2048,2048),Object.assign(g.shadow.camera,{left:-13,right:13,top:16,bottom:-13,near:.1,far:70}),g.shadow.normalBias=.03,o.add(g);let b=new Ke(new ii(200,200),new kt({color:"#579f9d",roughness:.3,metalness:.18}));b.rotation.x=-Math.PI/2,b.position.y=-.16,o.add(b);let m=new Bt;o.add(m);let f=e||await Kd(8,0,"tropical-inlet"),v=Ld(),T=()=>v.dispose(),y=()=>T();r?.addEventListener("abort",y,{once:!0}),r?.aborted&&y();let S;try{let V=await v.load(f,{map:!0,slot:s});if(!V)throw Error("Tile preview was interrupted.");S=V,m.add(S)}catch(V){throw r?.removeEventListener("abort",y),v.dispose(),u.dispose(),Qt(o),g.shadow.dispose(),h.dispose(),a.dispose(),a.domElement.remove(),V}let w=new Map([[JSON.stringify(f),S]]),R=0,x=!1,A=0,C=!0,L;u.addEventListener("change",()=>{C=!0});let O=()=>{let{width:V,height:X}=i.getBoundingClientRect();!V||!X||(a.setSize(V,X),d.aspect=V/X,d.updateProjectionMatrix(),C=!0)},W=new ResizeObserver(O);W.observe(i),O();function I(){x||(a.domElement.isConnected&&(u.update(),C&&(C=!1,c0(performance.now()/1e3),a.render(o,d))),A=requestAnimationFrame(I))}let B=Object.assign(()=>{if(!x){x=!0,r?.removeEventListener("abort",y),v.dispose(),R++,cancelAnimationFrame(A),W.disconnect(),u.dispose();for(let V of w.values())Qt(V);w.clear(),Qt(o),g.shadow.dispose(),h.dispose(),a.dispose(),a.domElement.remove()}},{reset(){u.reset(),C=!0},attach(V){x||(W.unobserve(i),i=V,i.replaceChildren(a.domElement),W.observe(i),O())},async update(V){let X=++R,j=JSON.stringify(V),H=w.get(j);if(!H){if(H=await v.load(V,{map:!0,slot:s})||void 0,!H||x||X!==R){H&&Qt(H);return}w.set(j,H),await a.compileAsync(H,d,o)}if(!(x||X!==R)){w.delete(j),w.set(j,H),S.removeFromParent(),S=H,m.add(H),C=!0;for(let[Y,ee]of w){if(w.size<=12)break;ee!==S&&(w.delete(Y),Qt(ee))}}}});T=B,r?.aborted&&(B(),r.throwIfAborted());try{if(a.setSize(300,152,!1),await a.compileAsync(o,d),x)return B;if(a.render(o,d),O(),I(),t)try{let V=await t();if(!x){let X=await new mr().parseAsync(V,"");if(x)return Qt(X.scene),B;L=X.scene,n==="world"&&L.scale.setScalar(ut);let j=nh(f);L.position.set(j.x*ut,j.y*ut,j.z*ut),L.traverse(H=>{H.isMesh&&(H.castShadow=!0,H.receiveShadow=!0)}),m.add(L),C=!0}}catch(V){throw B(),V}return B}catch(V){throw B(),V}}function jd(i){let e=i.runtime?[{id:"scene",label:i.runtime.purpose==="component-preview"?"Component preview":"Complete scene",file:i.runtime.entry}]:i.preview?[{id:"context",label:"Component in Tidewater",file:""}]:[];return i.kind==="world"?[...e,...["map","world","overview"].filter(t=>typeof i.content?.[t]=="string").map(t=>({id:t,label:t[0].toUpperCase()+t.slice(1),file:i.content[t]}))]:[...e,...Object.entries(i.exports||{}).filter(t=>typeof t[1]=="string"&&/\.glb$/i.test(t[1])).map(([t,n])=>({id:t,label:t.replace(/[-_]/g," ").replace(/^./,s=>s.toUpperCase()),file:n}))]}function Nc(i,e,t=35){let n=Math.max(i,.001),s=t*Math.PI/360,r=Math.atan(Math.tan(s)*Math.max(e,.05)),o=n/Math.sin(Math.min(s,r))*1.16;return{distance:o,near:n/1e3,far:o*30,minDistance:n*.45,maxDistance:o*4}}async function Jd(i,e,t){let n=await e();t.throwIfAborted();let s=await new mr().parseAsync(n,"");t.aborted&&(Qt(s.scene),t.throwIfAborted());let r=s.scene,o=new jt().setFromObject(r,!0);if(o.isEmpty())throw Qt(r),Error("This model contains no visible geometry.");let a=o.getSize(new N),c=o.getCenter(new N),l=Math.max(a.length()/2,.001),h=new ei;h.background=new pe("#f5f5f4");let d=new Bt;d.position.set(-c.x,-o.min.y,-c.z),d.add(r),h.add(d),r.traverse(Y=>{Y.isMesh&&(Y.castShadow=!0,Y.receiveShadow=!0)});let u;try{u=new cr({antialias:!0})}catch(Y){throw Qt(h),Y}u.setPixelRatio(Math.min(devicePixelRatio,2)),u.toneMapping=cs,u.toneMappingExposure=1.05,u.shadowMap.enabled=!0,u.shadowMap.type=hi,u.shadowMap.autoUpdate=!1,u.domElement.setAttribute("aria-label","Interactive 3D model. Drag to rotate, scroll to zoom."),u.domElement.tabIndex=0;let p=new xt(35,1,.01,100),g=new fr(p,u.domElement);g.enableDamping=!0,g.enablePan=!1,g.minPolarAngle=.06,g.maxPolarAngle=Math.PI-.06,g.target.set(0,a.y/2,0),g.listenToKeyEvents(u.domElement),g.keyPanSpeed=0;let b=new Bi(u),m=new _r,f=b.fromScene(m,.04);h.environment=f.texture,h.environmentIntensity=.65,m.dispose(),b.dispose(),h.add(new rs("#ffffff","#b4aaa0",1.5));let v=new ci("#fff4e5",3);v.position.set(-l*2,l*3,l*2),v.target.position.copy(g.target),h.add(v,v.target),v.castShadow=!0,v.shadow.mapSize.set(2048,2048),Object.assign(v.shadow.camera,{left:-l*1.7,right:l*1.7,top:l*2,bottom:-l*1.7,near:l*.02,far:l*9}),v.shadow.normalBias=l*.002,v.shadow.bias=-15e-5;let T=new Ke(new ii(l*12,l*12),new Zs({color:"#5a5147",opacity:.19}));T.rotation.x=-Math.PI/2,T.position.y=-l*.002,T.receiveShadow=!0,h.add(T);let y=s.animations.length?new jr(r):void 0;s.animations.forEach(Y=>y.clipAction(Y).play());let S=matchMedia("(prefers-reduced-motion: reduce)"),w=!1,R=!0,x=!1,A=0,C=0,L=!0;function O(){x&&!w&&!A&&R&&!document.hidden&&(A=requestAnimationFrame(W))}function W(Y){if(A=0,w||!R||document.hidden)return;let ee=g.update(),Te=!!y&&!S.matches;Te&&(y.update(C?Math.min((Y-C)/1e3,.05):0),u.shadowMap.needsUpdate=!0),C=Y,u.render(h,p),(ee||Te)&&O()}function I(){let Y=Nc(l,p.aspect,p.fov);p.near=Y.near,p.far=Y.far,p.updateProjectionMatrix(),g.minDistance=Y.minDistance,g.maxDistance=Y.maxDistance,g.target.set(0,a.y/2,0),p.position.copy(new N(1,.65,1.45).normalize().multiplyScalar(Y.distance).add(g.target)),g.update(),g.saveState(),O()}function B(){let{width:Y,height:ee}=i.getBoundingClientRect();if(!Y||!ee)return;let Te=Nc(l,p.aspect,p.fov),Me=Nc(l,Y/ee,p.fov);p.aspect=Y/ee,p.near=Me.near,p.far=Me.far,p.updateProjectionMatrix(),u.setSize(Y,ee),g.maxDistance=Me.maxDistance,L?(L=!1,I()):(p.position.sub(g.target).multiplyScalar(Me.distance/Te.distance).add(g.target),O())}let V=new ResizeObserver(B),X=new IntersectionObserver(Y=>{R=Y[0].isIntersecting,C=0,O()}),j=()=>{C=0,O()};g.addEventListener("change",O),document.addEventListener("visibilitychange",j),S.addEventListener("change",j);let H=Object.assign(()=>{w||(w=!0,t.removeEventListener("abort",H),cancelAnimationFrame(A),V.disconnect(),X.disconnect(),document.removeEventListener("visibilitychange",j),S.removeEventListener("change",j),g.dispose(),y?.stopAllAction(),y?.uncacheRoot(r),Qt(h),v.shadow.dispose(),f.dispose(),u.dispose(),u.domElement.remove())},{reset:I});t.addEventListener("abort",H,{once:!0});try{return i.replaceChildren(u.domElement),V.observe(i),X.observe(i),B(),await u.compileAsync(h,p),t.throwIfAborted(),x=!0,u.shadowMap.needsUpdate=!0,u.render(h,p),O(),H}catch(Y){throw H(),Y}}function Uc(i){let e=i.runtime,t=[],n=i.preview;if(n!==void 0&&(!n||n.format!=="scene-reference-v1"||!/^@[a-z][a-z0-9-]{2,29}\/[a-z][a-z0-9-]{1,59}$/.test(n.package)||!/^(0|[1-9][0-9]*)\.(0|[1-9][0-9]*)\.(0|[1-9][0-9]*)$/.test(n.version)||!/^[a-z][a-z0-9-]{0,49}$/.test(n.focus)||n.package===i.name||e)&&t.push("Preview references require another scoped package, an exact version and a focus ID; they cannot also declare a runtime."),e===void 0)return t;let s=new Set((Array.isArray(i.files)?i.files:[]).filter(o=>o&&typeof o.path=="string").map(o=>o.path)),r=o=>typeof o=="string"&&/^[a-zA-Z0-9_./-]+$/.test(o)&&o.length<=180&&!o.startsWith("/")&&!o.split("/").some(a=>!a||a==="."||a==="..");return!e||typeof e!="object"||Array.isArray(e)||e.format!=="iframe-scene-v1"?["runtime.format must be iframe-scene-v1."]:((!r(e.entry)||!e.entry.endsWith(".js")||!s.has(e.entry))&&t.push("Runtime entry must be an included, bundled JavaScript file."),e.preload!==void 0&&(!Array.isArray(e.preload)||e.preload.length>8||new Set(e.preload).size!==e.preload.length||e.preload.some(o=>!r(o)||!o.endsWith(".js")||!s.has(o)||o===e.entry))&&t.push("Runtime preloads must name up to eight unique included JavaScript bundles."),(!r(e.style)||!e.style.endsWith(".css")||!s.has(e.style))&&t.push("Runtime style must be an included CSS file."),(!e.assets||typeof e.assets!="object"||Array.isArray(e.assets)||Object.keys(e.assets).length>120||Object.entries(e.assets).some(([o,a])=>!r(o)||!r(a)||!s.has(a)))&&t.push("Runtime assets must map safe relative resource names to included files (maximum 120)."),(!Array.isArray(e.features)||!e.features.length||e.features.length>64||new Set(e.features).size!==e.features.length||e.features.some(o=>typeof o!="string"||!/^[a-z][a-z0-9-]{0,49}$/.test(o)))&&t.push("Declare unique runtime feature IDs (maximum 64)."),(!r(e.coverage)||!e.coverage.endsWith(".json")||!s.has(e.coverage))&&t.push("Include the scene conversion coverage report."),e.purpose!==void 0&&!["scene","component-preview"].includes(e.purpose)&&t.push("Runtime purpose must be scene or component-preview."),e.previewTargets!==void 0&&(!Array.isArray(e.previewTargets)||e.previewTargets.length>64||new Set(e.previewTargets).size!==e.previewTargets.length||e.previewTargets.some(o=>typeof o!="string"||!/^[a-z][a-z0-9-]{0,49}$/.test(o)))&&t.push("Preview targets must be unique focus IDs (maximum 64)."),t)}function Qd(i){return{ogg:"audio/ogg",mp3:"audio/mpeg",wav:"audio/wav",jpg:"image/jpeg",jpeg:"image/jpeg",png:"image/png",webp:"image/webp",ttf:"font/ttf",woff:"font/woff",woff2:"font/woff2",json:"application/json",glb:"model/gltf-binary"}[i.split(".").pop()]||"application/octet-stream"}function a_(i){let e=(n,s)=>parent.postMessage({channel:i,type:n,detail:s},"*"),t=!1;addEventListener("message",async n=>{if(n.source!==parent||n.data?.channel!==i)return;let s=n.data;if(s.type==="load"&&!t){t=!0;let r=new Map(s.assets.map(({path:h,bytes:d,mime:u})=>[h,URL.createObjectURL(new Blob([d],{type:u}))])),o=fetch.bind(globalThis);globalThis.fetch=(h,d)=>{let u=typeof h=="string"?h:h instanceof URL?h.href:h.url,p="https://threetopia.invalid/assets/",g=u.startsWith(p)?u.slice(p.length):null,b=g===null?u:r.get(g);return!b||!b.startsWith("blob:")?Promise.reject(Error(`Undeclared scene resource: ${g??u}`)):o(b,d)};let a=new Map(Object.entries(s.preferences||{}));Object.defineProperty(globalThis,"localStorage",{value:{getItem:h=>a.get(String(h))??null,setItem(h,d){a.set(String(h),String(d)),e("preferences",Object.fromEntries(a))},removeItem(h){a.delete(String(h)),e("preferences",Object.fromEntries(a))},clear(){a.clear(),e("preferences",{})}}}),globalThis.__threetopiaHost={previewFocus:s.focus,progress:(h,d)=>e("progress",{value:h,message:d}),ready:h=>e("ready",h),error:h=>e("error",h)};let c=s.css;for(let[h,d]of r)c=c.replaceAll(`@asset(${h})`,d);let l=document.createElement("style");l.textContent=c,document.head.append(l);for(let h of s.code){let d=document.createElement("script");d.textContent=h,document.body.append(d)}}else if(s.type==="dispose")try{await globalThis.__threetopiaRuntime?.dispose()}finally{e("disposed")}else["pause","resume","reset"].includes(s.type)&&globalThis.__threetopiaRuntime?.[s.type]?.()}),addEventListener("error",n=>e("error",n.message)),addEventListener("unhandledrejection",n=>e("error",n.reason?.message||String(n.reason))),e("boot")}async function Oc(i,{manifest:e,loadFile:t,signal:n,focus:s,onProgress:r=()=>{}}){let o=Uc(e);if(!e.runtime||o.length)throw Error(o.join(" ")||"No complete scene runtime.");if(s&&!e.runtime.previewTargets?.includes(s))throw Error("This scene does not provide the requested component preview.");n?.throwIfAborted();let a=e.runtime,c=new Map(e.files.map(I=>[I.path,I])),l=new Map;async function h(I){if(l.has(I))return l.get(I);let B=new Uint8Array(await t(I)),V=c.get(I);if(n?.throwIfAborted(),B.length!==V.bytes||await hr(B)!==V.sha256)throw Error(`Scene integrity check failed: ${I}`);return l.set(I,B),B}let d=[...a.preload||[],a.entry],u=[...new Set([...d,a.style,...Object.values(a.assets)])],p=0;await Promise.all(Array.from({length:4},async()=>{for(;p<u.length;)await h(u[p++])}));let g=Object.entries(a.assets).map(([I,B])=>({path:I,bytes:l.get(B).slice().buffer,mime:Qd(I)})),b=d.map(I=>new TextDecoder().decode(l.get(I))),m=new TextDecoder().decode(l.get(a.style));l.clear();let f=crypto.randomUUID(),v=document.createElement("iframe");v.title=`${e.title} \u2014 complete scene`,v.setAttribute("sandbox","allow-scripts allow-pointer-lock allow-downloads"),v.setAttribute("allow","autoplay; fullscreen"),v.referrerPolicy="no-referrer",Object.assign(v.style,{border:"0",width:"100%",height:"100%",display:"block",background:"#000"});let T=`threetopia.scene.${e.name}${s?"."+s:""}`,y={};try{y=JSON.parse(localStorage.getItem(T)||"{}")}catch{}let S=I=>v.contentWindow?.postMessage({channel:f,type:I},"*"),w=!1,R,x,A,C,L=()=>{clearTimeout(R),clearTimeout(x),removeEventListener("message",A),v.remove(),n?.removeEventListener("abort",C)},O=Object.assign(()=>{w||(w=!0,S("dispose"),v.hidden=!0,R=setTimeout(L,1500))},{reset:()=>S("reset"),pause:()=>S("pause"),resume:()=>S("resume"),frame:v}),W=new Promise((I,B)=>{x=setTimeout(()=>{O(),B(Error("Scene initialization timed out. WebGPU shader compilation may require a more capable GPU."))},3e5),A=V=>{if(V.source!==v.contentWindow||V.data?.channel!==f)return;let{type:X,detail:j}=V.data;if(!(w&&X!=="disposed")){if(X==="boot"&&v.contentWindow.postMessage({channel:f,type:"load",code:b,css:m,assets:g,preferences:y,focus:s},"*",g.map(H=>H.bytes)),X==="progress"&&r(j),X==="ready"){let H=a.features.filter(Y=>j?.features?.[Y]!==!0);if(H.length){O(),B(Error(`Incomplete scene: ${H.join(", ")}`));return}clearTimeout(x),i.dataset.ready="true",I(O)}if(X==="error"&&(clearTimeout(x),O(),i.dataset.ready="false",i.textContent=`Scene error: ${String(j)}`,B(Error(String(j)))),X==="disposed"&&L(),X==="preferences"&&j&&typeof j=="object"&&Object.keys(j).length<=32&&Object.values(j).every(H=>typeof H=="string")&&JSON.stringify(j).length<=16384)try{localStorage.setItem(T,JSON.stringify(j))}catch{}}},addEventListener("message",A),C=()=>{O(),B(n.reason)},n?.addEventListener("abort",C,{once:!0})});return v.srcdoc=`<!doctype html><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><meta http-equiv="Content-Security-Policy" content="default-src 'none'; script-src 'unsafe-inline' blob:; style-src 'unsafe-inline'; connect-src blob:; img-src blob: data:; font-src blob:; media-src blob:; worker-src blob:; base-uri 'none'; form-action 'none'"><style>html,body,#app{width:100%;height:100%;margin:0;overflow:hidden;background:#000}</style><div id="app"></div><div id="fps"></div><script>(${a_.toString()})(${JSON.stringify(f)})<\/script>`,i.replaceChildren(v),W}async function ef(i,e,t,n,s){let r=Uc(e);if(r.length)throw Error(r.join(" "));let o=e.preview,a=await fetch(`${t}/api/resolve?name=${encodeURIComponent(o.package)}&version=${encodeURIComponent(o.version)}`,{signal:n,credentials:"omit"});if(!a.ok)throw Error("The referenced preview scene is not published yet.");let c=await a.json();if(c.state!=="published"||c.manifest?.name!==o.package||c.manifest?.version!==o.version)throw Error("Preview identity does not match the requested release.");return Oc(i,{manifest:c.manifest,focus:o.focus,signal:n,onProgress:s,loadFile:async l=>{let h=await fetch(`${t}/api/packages/${encodeURIComponent(c.package.id)}/versions/${encodeURIComponent(o.version)}/files?path=${encodeURIComponent(l)}`,{signal:n,credentials:"omit"});if(!h.ok)throw Error("Preview resource could not be loaded.");return h.arrayBuffer()}})}async function c_(){let i=new URLSearchParams(location.search),e=await(await fetch("./preview.json")).json(),t=e.manifest,n=jd(t),s=n.find(l=>l.id===i.get("mode"))??n[0];if(!s)throw Error("Add a static GLB export to preview this code package.");document.title=`${t.title} \xB7 Threetopia preview`,document.querySelector("h1").textContent=t.title,document.querySelector("small").textContent=`${t.kind==="asset"?"Reusable asset":"Fixed host tile"} \xB7 Drag to orbit \xB7 Scroll to zoom`;for(let l of n){let h=document.createElement("a");h.href=`?mode=${encodeURIComponent(l.id)}`,h.textContent=l.label,h.classList.toggle("active",l===s),document.querySelector("nav").append(h)}let r=new AbortController;addEventListener("pagehide",()=>r.abort(),{once:!0});let o=async()=>{let l=await fetch(`./files/${s.file}`,{signal:r.signal});if(!l.ok)throw Error("Preview file missing.");return l.arrayBuffer()},a=document.querySelector("#preview");if(s.id==="context")document.querySelector("small").textContent="Component preview in Tidewater \xB7 Settings inside the scene",document.querySelector("details").hidden=!0,await ef(a,t,e.registry,r.signal);else if(s.id==="scene"&&t.runtime){document.querySelector("small").textContent=t.runtime.purpose==="component-preview"?"Component preview \xB7 Drag to orbit \xB7 Settings inside":"Complete playable scene \xB7 Original controls";let l=document.querySelector("details");l.hidden=!0,await Oc(a,{manifest:t,focus:i.get("focus")||void 0,signal:r.signal,loadFile:async h=>{let d=await fetch(`./files/${h}`,{signal:r.signal});if(!d.ok)throw Error(`Scene file missing: ${h}`);return d.arrayBuffer()}})}else t.kind==="asset"?await Jd(a,o,r.signal):await $d(a,{contract:t.tile,mode:s.id,load:o,signal:r.signal});let c=t.kind==="asset"?"asset":s.id;document.querySelector("[data-metrics]").textContent=JSON.stringify(e.files?.[s.file]?.[c]??e.report[c]??{},null,2),a.dataset.ready="true"}c_().catch(i=>{document.querySelector("#preview").textContent=i.message});
/*! Bundled license information:

three/build/three.core.js:
three/build/three.module.js:
  (**
   * @license
   * Copyright 2010-2026 Three.js Authors
   * SPDX-License-Identifier: MIT
   *)
*/
