var Ci={LEFT:0,MIDDLE:1,RIGHT:2,ROTATE:0,DOLLY:1,PAN:2},Ii={ROTATE:0,PAN:1,DOLLY_PAN:2,DOLLY_ROTATE:3},Vh=0,gl=1,Hh=2;var ss=1,Gh=2,Ws=3,an=0,kt=1,en=2,Vn=0,Gi=1,_l=2,xl=3,yl=4,Wh=5;var bi=100,Xh=101,qh=102,Yh=103,Zh=104,Kh=200,jh=201,$h=202,Jh=203,Bo=204,ko=205,Qh=206,eu=207,tu=208,nu=209,iu=210,su=211,ru=212,ou=213,au=214,zo=0,Vo=1,Ho=2,Wi=3,Go=4,Wo=5,Xo=6,qo=7,zr=0,cu=1,lu=2,Rn=0,vl=1,Ml=2,bl=3,Vr=4,Sl=5,Tl=6,wl=7,il="attached",hu="detached",Al=300,Pi=301,rs=302,xa=303,ya=304,Hr=306,Si=1e3,gn=1001,Ps=1002,St=1003,va=1004;var os=1005;var gt=1006,Xs=1007;var hn=1008;var Wt=1009,El=1010,Rl=1011,qs=1012,Ma=1013,Cn=1014,un=1015,Hn=1016,ba=1017,Sa=1018,Ys=1020,Cl=35902,Il=35899,Pl=1021,Ll=1022,dn=1023,Fn=1026,Li=1027,Zs=1028,Ta=1029,Di=1030,wa=1031;var Aa=1033,Gr=33776,Wr=33777,Xr=33778,qr=33779,Ea=35840,Ra=35841,Ca=35842,Ia=35843,Pa=36196,La=37492,Da=37496,Na=37488,Ua=37489,Yr=37490,Fa=37491,Oa=37808,Ba=37809,ka=37810,za=37811,Va=37812,Ha=37813,Ga=37814,Wa=37815,Xa=37816,qa=37817,Ya=37818,Za=37819,Ka=37820,ja=37821,$a=36492,Ja=36494,Qa=36495,ec=36283,tc=36284,Zr=36285,nc=36286;var Xi=2300,qi=2301,Oo=2302,sl=2303,rl=2400,ol=2401,al=2402,uu=2500;var Dl=0,Kr=1,Ks=2,du=3200,Nl=3201;var ai=0,fu=1,ci="",Pt="srgb",Kt="srgb-linear",mr="linear",Ke="srgb";var Hi=7680;var cl=519,pu=512,mu=513,gu=514,ic=515,_u=516,xu=517,sc=518,yu=519,Yo=35044;var Ul="300 es",Sn=2e3,Ls=2001;function Yd(i){for(let e=i.length-1;e>=0;--e)if(i[e]>=65535)return!0;return!1}function Zd(i){return ArrayBuffer.isView(i)&&!(i instanceof DataView)}function Ds(i){return document.createElementNS("http://www.w3.org/1999/xhtml",i)}function vu(){let i=Ds("canvas");return i.style.display="block",i}var rh={},Ns=null;function gr(...i){let e="THREE."+i.shift();Ns?Ns("log",e,...i):console.log(e,...i)}function Mu(i){let e=i[0];if(typeof e=="string"&&e.startsWith("TSL:")){let t=i[1];t&&t.isStackTrace?i[0]+=" "+t.getLocation():i[1]='Stack trace not available. Enable "THREE.Node.captureStackTrace" to capture stack traces.'}return i}function ve(...i){i=Mu(i);let e="THREE."+i.shift();if(Ns)Ns("warn",e,...i);else{let t=i[0];t&&t.isStackTrace?console.warn(t.getError(e)):console.warn(e,...i)}}function Ee(...i){i=Mu(i);let e="THREE."+i.shift();if(Ns)Ns("error",e,...i);else{let t=i[0];t&&t.isStackTrace?console.error(t.getError(e)):console.error(e,...i)}}function Zo(...i){let e=i.join(" ");e in rh||(rh[e]=!0,ve(...i))}function bu(i,e,t){return new Promise(function(n,s){function r(){switch(i.clientWaitSync(e,i.SYNC_FLUSH_COMMANDS_BIT,0)){case i.WAIT_FAILED:s();break;case i.TIMEOUT_EXPIRED:setTimeout(r,t);break;default:n()}}setTimeout(r,t)})}var Su={[zo]:Vo,[Ho]:Xo,[Go]:qo,[Wi]:Wo,[Vo]:zo,[Xo]:Ho,[qo]:Go,[Wo]:Wi},wn=class{addEventListener(e,t){this._listeners===void 0&&(this._listeners={});let n=this._listeners;n[e]===void 0&&(n[e]=[]),n[e].indexOf(t)===-1&&n[e].push(t)}hasEventListener(e,t){let n=this._listeners;return n===void 0?!1:n[e]!==void 0&&n[e].indexOf(t)!==-1}removeEventListener(e,t){let n=this._listeners;if(n===void 0)return;let s=n[e];if(s!==void 0){let r=s.indexOf(t);r!==-1&&s.splice(r,1)}}dispatchEvent(e){let t=this._listeners;if(t===void 0)return;let n=t[e.type];if(n!==void 0){e.target=this;let s=n.slice(0);for(let r=0,o=s.length;r<o;r++)s[r].call(this,e);e.target=null}}},Vt=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"],oh=1234567,fr=Math.PI/180,Yi=180/Math.PI;function Tn(){let i=Math.random()*4294967295|0,e=Math.random()*4294967295|0,t=Math.random()*4294967295|0,n=Math.random()*4294967295|0;return(Vt[i&255]+Vt[i>>8&255]+Vt[i>>16&255]+Vt[i>>24&255]+"-"+Vt[e&255]+Vt[e>>8&255]+"-"+Vt[e>>16&15|64]+Vt[e>>24&255]+"-"+Vt[t&63|128]+Vt[t>>8&255]+"-"+Vt[t>>16&255]+Vt[t>>24&255]+Vt[n&255]+Vt[n>>8&255]+Vt[n>>16&255]+Vt[n>>24&255]).toLowerCase()}function Ve(i,e,t){return Math.max(e,Math.min(t,i))}function Fl(i,e){return(i%e+e)%e}function Kd(i,e,t,n,s){return n+(i-e)*(s-n)/(t-e)}function jd(i,e,t){return i!==e?(t-i)/(e-i):0}function pr(i,e,t){return(1-t)*i+t*e}function $d(i,e,t,n){return pr(i,e,1-Math.exp(-t*n))}function Jd(i,e=1){return e-Math.abs(Fl(i,e*2)-e)}function Qd(i,e,t){return i<=e?0:i>=t?1:(i=(i-e)/(t-e),i*i*(3-2*i))}function ef(i,e,t){return i<=e?0:i>=t?1:(i=(i-e)/(t-e),i*i*i*(i*(i*6-15)+10))}function tf(i,e){return i+Math.floor(Math.random()*(e-i+1))}function nf(i,e){return i+Math.random()*(e-i)}function sf(i){return i*(.5-Math.random())}function rf(i){i!==void 0&&(oh=i);let e=oh+=1831565813;return e=Math.imul(e^e>>>15,e|1),e^=e+Math.imul(e^e>>>7,e|61),((e^e>>>14)>>>0)/4294967296}function of(i){return i*fr}function af(i){return i*Yi}function cf(i){return(i&i-1)===0&&i!==0}function lf(i){return Math.pow(2,Math.ceil(Math.log(i)/Math.LN2))}function hf(i){return Math.pow(2,Math.floor(Math.log(i)/Math.LN2))}function uf(i,e,t,n,s){let r=Math.cos,o=Math.sin,a=r(t/2),c=o(t/2),l=r((e+n)/2),u=o((e+n)/2),d=r((e-n)/2),h=o((e-n)/2),p=r((n-e)/2),g=o((n-e)/2);switch(s){case"XYX":i.set(a*u,c*d,c*h,a*l);break;case"YZY":i.set(c*h,a*u,c*d,a*l);break;case"ZXZ":i.set(c*d,c*h,a*u,a*l);break;case"XZX":i.set(a*u,c*g,c*p,a*l);break;case"YXY":i.set(c*p,a*u,c*g,a*l);break;case"ZYZ":i.set(c*g,c*p,a*u,a*l);break;default:ve("MathUtils: .setQuaternionFromProperEuler() encountered an unknown order: "+s)}}function bn(i,e){switch(e.constructor){case Float32Array:return i;case Uint32Array:return i/4294967295;case Uint16Array:return i/65535;case Uint8Array:return i/255;case Int32Array:return Math.max(i/2147483647,-1);case Int16Array:return Math.max(i/32767,-1);case Int8Array:return Math.max(i/127,-1);default:throw new Error("Invalid component type.")}}function je(i,e){switch(e.constructor){case Float32Array:return i;case Uint32Array:return Math.round(i*4294967295);case Uint16Array:return Math.round(i*65535);case Uint8Array:return Math.round(i*255);case Int32Array:return Math.round(i*2147483647);case Int16Array:return Math.round(i*32767);case Int8Array:return Math.round(i*127);default:throw new Error("Invalid component type.")}}var jr={DEG2RAD:fr,RAD2DEG:Yi,generateUUID:Tn,clamp:Ve,euclideanModulo:Fl,mapLinear:Kd,inverseLerp:jd,lerp:pr,damp:$d,pingpong:Jd,smoothstep:Qd,smootherstep:ef,randInt:tf,randFloat:nf,randFloatSpread:sf,seededRandom:rf,degToRad:of,radToDeg:af,isPowerOfTwo:cf,ceilPowerOfTwo:lf,floorPowerOfTwo:hf,setQuaternionFromProperEuler:uf,normalize:je,denormalize:bn},be=class i{static{i.prototype.isVector2=!0}constructor(e=0,t=0){this.x=e,this.y=t}get width(){return this.x}set width(e){this.x=e}get height(){return this.y}set height(e){this.y=e}set(e,t){return this.x=e,this.y=t,this}setScalar(e){return this.x=e,this.y=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y)}copy(e){return this.x=e.x,this.y=e.y,this}add(e){return this.x+=e.x,this.y+=e.y,this}addScalar(e){return this.x+=e,this.y+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this}subScalar(e){return this.x-=e,this.y-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this}multiply(e){return this.x*=e.x,this.y*=e.y,this}multiplyScalar(e){return this.x*=e,this.y*=e,this}divide(e){return this.x/=e.x,this.y/=e.y,this}divideScalar(e){return this.multiplyScalar(1/e)}applyMatrix3(e){let t=this.x,n=this.y,s=e.elements;return this.x=s[0]*t+s[3]*n+s[6],this.y=s[1]*t+s[4]*n+s[7],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this}clamp(e,t){return this.x=Ve(this.x,e.x,t.x),this.y=Ve(this.y,e.y,t.y),this}clampScalar(e,t){return this.x=Ve(this.x,e,t),this.y=Ve(this.y,e,t),this}clampLength(e,t){let n=this.length();return this.divideScalar(n||1).multiplyScalar(Ve(n,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(e){return this.x*e.x+this.y*e.y}cross(e){return this.x*e.y-this.y*e.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(e){let t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;let n=this.dot(e)/t;return Math.acos(Ve(n,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){let t=this.x-e.x,n=this.y-e.y;return t*t+n*n}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this}equals(e){return e.x===this.x&&e.y===this.y}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this}rotateAround(e,t){let n=Math.cos(t),s=Math.sin(t),r=this.x-e.x,o=this.y-e.y;return this.x=r*n-o*s+e.x,this.y=r*s+o*n+e.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}},Gt=class{constructor(e=0,t=0,n=0,s=1){this.isQuaternion=!0,this._x=e,this._y=t,this._z=n,this._w=s}static slerpFlat(e,t,n,s,r,o,a){let c=n[s+0],l=n[s+1],u=n[s+2],d=n[s+3],h=r[o+0],p=r[o+1],g=r[o+2],v=r[o+3];if(d!==v||c!==h||l!==p||u!==g){let m=c*h+l*p+u*g+d*v;m<0&&(h=-h,p=-p,g=-g,v=-v,m=-m);let f=1-a;if(m<.9995){let _=Math.acos(m),b=Math.sin(_);f=Math.sin(f*_)/b,a=Math.sin(a*_)/b,c=c*f+h*a,l=l*f+p*a,u=u*f+g*a,d=d*f+v*a}else{c=c*f+h*a,l=l*f+p*a,u=u*f+g*a,d=d*f+v*a;let _=1/Math.sqrt(c*c+l*l+u*u+d*d);c*=_,l*=_,u*=_,d*=_}}e[t]=c,e[t+1]=l,e[t+2]=u,e[t+3]=d}static multiplyQuaternionsFlat(e,t,n,s,r,o){let a=n[s],c=n[s+1],l=n[s+2],u=n[s+3],d=r[o],h=r[o+1],p=r[o+2],g=r[o+3];return e[t]=a*g+u*d+c*p-l*h,e[t+1]=c*g+u*h+l*d-a*p,e[t+2]=l*g+u*p+a*h-c*d,e[t+3]=u*g-a*d-c*h-l*p,e}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get w(){return this._w}set w(e){this._w=e,this._onChangeCallback()}set(e,t,n,s){return this._x=e,this._y=t,this._z=n,this._w=s,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(e){return this._x=e.x,this._y=e.y,this._z=e.z,this._w=e.w,this._onChangeCallback(),this}setFromEuler(e,t=!0){let n=e._x,s=e._y,r=e._z,o=e._order,a=Math.cos,c=Math.sin,l=a(n/2),u=a(s/2),d=a(r/2),h=c(n/2),p=c(s/2),g=c(r/2);switch(o){case"XYZ":this._x=h*u*d+l*p*g,this._y=l*p*d-h*u*g,this._z=l*u*g+h*p*d,this._w=l*u*d-h*p*g;break;case"YXZ":this._x=h*u*d+l*p*g,this._y=l*p*d-h*u*g,this._z=l*u*g-h*p*d,this._w=l*u*d+h*p*g;break;case"ZXY":this._x=h*u*d-l*p*g,this._y=l*p*d+h*u*g,this._z=l*u*g+h*p*d,this._w=l*u*d-h*p*g;break;case"ZYX":this._x=h*u*d-l*p*g,this._y=l*p*d+h*u*g,this._z=l*u*g-h*p*d,this._w=l*u*d+h*p*g;break;case"YZX":this._x=h*u*d+l*p*g,this._y=l*p*d+h*u*g,this._z=l*u*g-h*p*d,this._w=l*u*d-h*p*g;break;case"XZY":this._x=h*u*d-l*p*g,this._y=l*p*d-h*u*g,this._z=l*u*g+h*p*d,this._w=l*u*d+h*p*g;break;default:ve("Quaternion: .setFromEuler() encountered an unknown order: "+o)}return t===!0&&this._onChangeCallback(),this}setFromAxisAngle(e,t){let n=t/2,s=Math.sin(n);return this._x=e.x*s,this._y=e.y*s,this._z=e.z*s,this._w=Math.cos(n),this._onChangeCallback(),this}setFromRotationMatrix(e){let t=e.elements,n=t[0],s=t[4],r=t[8],o=t[1],a=t[5],c=t[9],l=t[2],u=t[6],d=t[10],h=n+a+d;if(h>0){let p=.5/Math.sqrt(h+1);this._w=.25/p,this._x=(u-c)*p,this._y=(r-l)*p,this._z=(o-s)*p}else if(n>a&&n>d){let p=2*Math.sqrt(1+n-a-d);this._w=(u-c)/p,this._x=.25*p,this._y=(s+o)/p,this._z=(r+l)/p}else if(a>d){let p=2*Math.sqrt(1+a-n-d);this._w=(r-l)/p,this._x=(s+o)/p,this._y=.25*p,this._z=(c+u)/p}else{let p=2*Math.sqrt(1+d-n-a);this._w=(o-s)/p,this._x=(r+l)/p,this._y=(c+u)/p,this._z=.25*p}return this._onChangeCallback(),this}setFromUnitVectors(e,t){let n=e.dot(t)+1;return n<1e-8?(n=0,Math.abs(e.x)>Math.abs(e.z)?(this._x=-e.y,this._y=e.x,this._z=0,this._w=n):(this._x=0,this._y=-e.z,this._z=e.y,this._w=n)):(this._x=e.y*t.z-e.z*t.y,this._y=e.z*t.x-e.x*t.z,this._z=e.x*t.y-e.y*t.x,this._w=n),this.normalize()}angleTo(e){return 2*Math.acos(Math.abs(Ve(this.dot(e),-1,1)))}rotateTowards(e,t){let n=this.angleTo(e);if(n===0)return this;let s=Math.min(1,t/n);return this.slerp(e,s),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(e){return this._x*e._x+this._y*e._y+this._z*e._z+this._w*e._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let e=this.length();return e===0?(this._x=0,this._y=0,this._z=0,this._w=1):(e=1/e,this._x=this._x*e,this._y=this._y*e,this._z=this._z*e,this._w=this._w*e),this._onChangeCallback(),this}multiply(e){return this.multiplyQuaternions(this,e)}premultiply(e){return this.multiplyQuaternions(e,this)}multiplyQuaternions(e,t){let n=e._x,s=e._y,r=e._z,o=e._w,a=t._x,c=t._y,l=t._z,u=t._w;return this._x=n*u+o*a+s*l-r*c,this._y=s*u+o*c+r*a-n*l,this._z=r*u+o*l+n*c-s*a,this._w=o*u-n*a-s*c-r*l,this._onChangeCallback(),this}slerp(e,t){let n=e._x,s=e._y,r=e._z,o=e._w,a=this.dot(e);a<0&&(n=-n,s=-s,r=-r,o=-o,a=-a);let c=1-t;if(a<.9995){let l=Math.acos(a),u=Math.sin(l);c=Math.sin(c*l)/u,t=Math.sin(t*l)/u,this._x=this._x*c+n*t,this._y=this._y*c+s*t,this._z=this._z*c+r*t,this._w=this._w*c+o*t,this._onChangeCallback()}else this._x=this._x*c+n*t,this._y=this._y*c+s*t,this._z=this._z*c+r*t,this._w=this._w*c+o*t,this.normalize();return this}slerpQuaternions(e,t,n){return this.copy(e).slerp(t,n)}random(){let e=2*Math.PI*Math.random(),t=2*Math.PI*Math.random(),n=Math.random(),s=Math.sqrt(1-n),r=Math.sqrt(n);return this.set(s*Math.sin(e),s*Math.cos(e),r*Math.sin(t),r*Math.cos(t))}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._w===this._w}fromArray(e,t=0){return this._x=e[t],this._y=e[t+1],this._z=e[t+2],this._w=e[t+3],this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._w,e}fromBufferAttribute(e,t){return this._x=e.getX(t),this._y=e.getY(t),this._z=e.getZ(t),this._w=e.getW(t),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}},L=class i{static{i.prototype.isVector3=!0}constructor(e=0,t=0,n=0){this.x=e,this.y=t,this.z=n}set(e,t,n){return n===void 0&&(n=this.z),this.x=e,this.y=t,this.z=n,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this}multiplyVectors(e,t){return this.x=e.x*t.x,this.y=e.y*t.y,this.z=e.z*t.z,this}applyEuler(e){return this.applyQuaternion(ah.setFromEuler(e))}applyAxisAngle(e,t){return this.applyQuaternion(ah.setFromAxisAngle(e,t))}applyMatrix3(e){let t=this.x,n=this.y,s=this.z,r=e.elements;return this.x=r[0]*t+r[3]*n+r[6]*s,this.y=r[1]*t+r[4]*n+r[7]*s,this.z=r[2]*t+r[5]*n+r[8]*s,this}applyNormalMatrix(e){return this.applyMatrix3(e).normalize()}applyMatrix4(e){let t=this.x,n=this.y,s=this.z,r=e.elements,o=1/(r[3]*t+r[7]*n+r[11]*s+r[15]);return this.x=(r[0]*t+r[4]*n+r[8]*s+r[12])*o,this.y=(r[1]*t+r[5]*n+r[9]*s+r[13])*o,this.z=(r[2]*t+r[6]*n+r[10]*s+r[14])*o,this}applyQuaternion(e){let t=this.x,n=this.y,s=this.z,r=e.x,o=e.y,a=e.z,c=e.w,l=2*(o*s-a*n),u=2*(a*t-r*s),d=2*(r*n-o*t);return this.x=t+c*l+o*d-a*u,this.y=n+c*u+a*l-r*d,this.z=s+c*d+r*u-o*l,this}project(e){return this.applyMatrix4(e.matrixWorldInverse).applyMatrix4(e.projectionMatrix)}unproject(e){return this.applyMatrix4(e.projectionMatrixInverse).applyMatrix4(e.matrixWorld)}transformDirection(e){let t=this.x,n=this.y,s=this.z,r=e.elements;return this.x=r[0]*t+r[4]*n+r[8]*s,this.y=r[1]*t+r[5]*n+r[9]*s,this.z=r[2]*t+r[6]*n+r[10]*s,this.normalize()}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this}divideScalar(e){return this.multiplyScalar(1/e)}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this}clamp(e,t){return this.x=Ve(this.x,e.x,t.x),this.y=Ve(this.y,e.y,t.y),this.z=Ve(this.z,e.z,t.z),this}clampScalar(e,t){return this.x=Ve(this.x,e,t),this.y=Ve(this.y,e,t),this.z=Ve(this.z,e,t),this}clampLength(e,t){let n=this.length();return this.divideScalar(n||1).multiplyScalar(Ve(n,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this.z=e.z+(t.z-e.z)*n,this}cross(e){return this.crossVectors(this,e)}crossVectors(e,t){let n=e.x,s=e.y,r=e.z,o=t.x,a=t.y,c=t.z;return this.x=s*c-r*a,this.y=r*o-n*c,this.z=n*a-s*o,this}projectOnVector(e){let t=e.lengthSq();if(t===0)return this.set(0,0,0);let n=e.dot(this)/t;return this.copy(e).multiplyScalar(n)}projectOnPlane(e){return Pc.copy(this).projectOnVector(e),this.sub(Pc)}reflect(e){return this.sub(Pc.copy(e).multiplyScalar(2*this.dot(e)))}angleTo(e){let t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;let n=this.dot(e)/t;return Math.acos(Ve(n,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){let t=this.x-e.x,n=this.y-e.y,s=this.z-e.z;return t*t+n*n+s*s}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)+Math.abs(this.z-e.z)}setFromSpherical(e){return this.setFromSphericalCoords(e.radius,e.phi,e.theta)}setFromSphericalCoords(e,t,n){let s=Math.sin(t)*e;return this.x=s*Math.sin(n),this.y=Math.cos(t)*e,this.z=s*Math.cos(n),this}setFromCylindrical(e){return this.setFromCylindricalCoords(e.radius,e.theta,e.y)}setFromCylindricalCoords(e,t,n){return this.x=e*Math.sin(t),this.y=n,this.z=e*Math.cos(t),this}setFromMatrixPosition(e){let t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this}setFromMatrixScale(e){let t=this.setFromMatrixColumn(e,0).length(),n=this.setFromMatrixColumn(e,1).length(),s=this.setFromMatrixColumn(e,2).length();return this.x=t,this.y=n,this.z=s,this}setFromMatrixColumn(e,t){return this.fromArray(e.elements,t*4)}setFromMatrix3Column(e,t){return this.fromArray(e.elements,t*3)}setFromEuler(e){return this.x=e._x,this.y=e._y,this.z=e._z,this}setFromColor(e){return this.x=e.r,this.y=e.g,this.z=e.b,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){let e=Math.random()*Math.PI*2,t=Math.random()*2-1,n=Math.sqrt(1-t*t);return this.x=n*Math.cos(e),this.y=t,this.z=n*Math.sin(e),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}},Pc=new L,ah=new Gt,Ie=class i{static{i.prototype.isMatrix3=!0}constructor(e,t,n,s,r,o,a,c,l){this.elements=[1,0,0,0,1,0,0,0,1],e!==void 0&&this.set(e,t,n,s,r,o,a,c,l)}set(e,t,n,s,r,o,a,c,l){let u=this.elements;return u[0]=e,u[1]=s,u[2]=a,u[3]=t,u[4]=r,u[5]=c,u[6]=n,u[7]=o,u[8]=l,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(e){let t=this.elements,n=e.elements;return t[0]=n[0],t[1]=n[1],t[2]=n[2],t[3]=n[3],t[4]=n[4],t[5]=n[5],t[6]=n[6],t[7]=n[7],t[8]=n[8],this}extractBasis(e,t,n){return e.setFromMatrix3Column(this,0),t.setFromMatrix3Column(this,1),n.setFromMatrix3Column(this,2),this}setFromMatrix4(e){let t=e.elements;return this.set(t[0],t[4],t[8],t[1],t[5],t[9],t[2],t[6],t[10]),this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){let n=e.elements,s=t.elements,r=this.elements,o=n[0],a=n[3],c=n[6],l=n[1],u=n[4],d=n[7],h=n[2],p=n[5],g=n[8],v=s[0],m=s[3],f=s[6],_=s[1],b=s[4],S=s[7],E=s[2],w=s[5],C=s[8];return r[0]=o*v+a*_+c*E,r[3]=o*m+a*b+c*w,r[6]=o*f+a*S+c*C,r[1]=l*v+u*_+d*E,r[4]=l*m+u*b+d*w,r[7]=l*f+u*S+d*C,r[2]=h*v+p*_+g*E,r[5]=h*m+p*b+g*w,r[8]=h*f+p*S+g*C,this}multiplyScalar(e){let t=this.elements;return t[0]*=e,t[3]*=e,t[6]*=e,t[1]*=e,t[4]*=e,t[7]*=e,t[2]*=e,t[5]*=e,t[8]*=e,this}determinant(){let e=this.elements,t=e[0],n=e[1],s=e[2],r=e[3],o=e[4],a=e[5],c=e[6],l=e[7],u=e[8];return t*o*u-t*a*l-n*r*u+n*a*c+s*r*l-s*o*c}invert(){let e=this.elements,t=e[0],n=e[1],s=e[2],r=e[3],o=e[4],a=e[5],c=e[6],l=e[7],u=e[8],d=u*o-a*l,h=a*c-u*r,p=l*r-o*c,g=t*d+n*h+s*p;if(g===0)return this.set(0,0,0,0,0,0,0,0,0);let v=1/g;return e[0]=d*v,e[1]=(s*l-u*n)*v,e[2]=(a*n-s*o)*v,e[3]=h*v,e[4]=(u*t-s*c)*v,e[5]=(s*r-a*t)*v,e[6]=p*v,e[7]=(n*c-l*t)*v,e[8]=(o*t-n*r)*v,this}transpose(){let e,t=this.elements;return e=t[1],t[1]=t[3],t[3]=e,e=t[2],t[2]=t[6],t[6]=e,e=t[5],t[5]=t[7],t[7]=e,this}getNormalMatrix(e){return this.setFromMatrix4(e).invert().transpose()}transposeIntoArray(e){let t=this.elements;return e[0]=t[0],e[1]=t[3],e[2]=t[6],e[3]=t[1],e[4]=t[4],e[5]=t[7],e[6]=t[2],e[7]=t[5],e[8]=t[8],this}setUvTransform(e,t,n,s,r,o,a){let c=Math.cos(r),l=Math.sin(r);return this.set(n*c,n*l,-n*(c*o+l*a)+o+e,-s*l,s*c,-s*(-l*o+c*a)+a+t,0,0,1),this}scale(e,t){return this.premultiply(Lc.makeScale(e,t)),this}rotate(e){return this.premultiply(Lc.makeRotation(-e)),this}translate(e,t){return this.premultiply(Lc.makeTranslation(e,t)),this}makeTranslation(e,t){return e.isVector2?this.set(1,0,e.x,0,1,e.y,0,0,1):this.set(1,0,e,0,1,t,0,0,1),this}makeRotation(e){let t=Math.cos(e),n=Math.sin(e);return this.set(t,-n,0,n,t,0,0,0,1),this}makeScale(e,t){return this.set(e,0,0,0,t,0,0,0,1),this}equals(e){let t=this.elements,n=e.elements;for(let s=0;s<9;s++)if(t[s]!==n[s])return!1;return!0}fromArray(e,t=0){for(let n=0;n<9;n++)this.elements[n]=e[n+t];return this}toArray(e=[],t=0){let n=this.elements;return e[t]=n[0],e[t+1]=n[1],e[t+2]=n[2],e[t+3]=n[3],e[t+4]=n[4],e[t+5]=n[5],e[t+6]=n[6],e[t+7]=n[7],e[t+8]=n[8],e}clone(){return new this.constructor().fromArray(this.elements)}},Lc=new Ie,ch=new Ie().set(.4123908,.3575843,.1804808,.212639,.7151687,.0721923,.0193308,.1191948,.9505322),lh=new Ie().set(3.2409699,-1.5373832,-.4986108,-.9692436,1.8759675,.0415551,.0556301,-.203977,1.0569715);function df(){let i={enabled:!0,workingColorSpace:Kt,spaces:{},convert:function(s,r,o){return this.enabled===!1||r===o||!r||!o||(this.spaces[r].transfer===Ke&&(s.r=ti(s.r),s.g=ti(s.g),s.b=ti(s.b)),this.spaces[r].primaries!==this.spaces[o].primaries&&(s.applyMatrix3(this.spaces[r].toXYZ),s.applyMatrix3(this.spaces[o].fromXYZ)),this.spaces[o].transfer===Ke&&(s.r=Is(s.r),s.g=Is(s.g),s.b=Is(s.b))),s},workingToColorSpace:function(s,r){return this.convert(s,this.workingColorSpace,r)},colorSpaceToWorking:function(s,r){return this.convert(s,r,this.workingColorSpace)},getPrimaries:function(s){return this.spaces[s].primaries},getTransfer:function(s){return s===ci?mr:this.spaces[s].transfer},getToneMappingMode:function(s){return this.spaces[s].outputColorSpaceConfig.toneMappingMode||"standard"},getLuminanceCoefficients:function(s,r=this.workingColorSpace){return s.fromArray(this.spaces[r].luminanceCoefficients)},define:function(s){Object.assign(this.spaces,s)},_getMatrix:function(s,r,o){return s.copy(this.spaces[r].toXYZ).multiply(this.spaces[o].fromXYZ)},_getDrawingBufferColorSpace:function(s){return this.spaces[s].outputColorSpaceConfig.drawingBufferColorSpace},_getUnpackColorSpace:function(s=this.workingColorSpace){return this.spaces[s].workingColorSpaceConfig.unpackColorSpace},fromWorkingColorSpace:function(s,r){return Zo("ColorManagement: .fromWorkingColorSpace() has been renamed to .workingToColorSpace()."),i.workingToColorSpace(s,r)},toWorkingColorSpace:function(s,r){return Zo("ColorManagement: .toWorkingColorSpace() has been renamed to .colorSpaceToWorking()."),i.colorSpaceToWorking(s,r)}},e=[.64,.33,.3,.6,.15,.06],t=[.2126,.7152,.0722],n=[.3127,.329];return i.define({[Kt]:{primaries:e,whitePoint:n,transfer:mr,toXYZ:ch,fromXYZ:lh,luminanceCoefficients:t,workingColorSpaceConfig:{unpackColorSpace:Pt},outputColorSpaceConfig:{drawingBufferColorSpace:Pt}},[Pt]:{primaries:e,whitePoint:n,transfer:Ke,toXYZ:ch,fromXYZ:lh,luminanceCoefficients:t,outputColorSpaceConfig:{drawingBufferColorSpace:Pt}}}),i}var ze=df();function ti(i){return i<.04045?i*.0773993808:Math.pow(i*.9478672986+.0521327014,2.4)}function Is(i){return i<.0031308?i*12.92:1.055*Math.pow(i,.41666)-.055}var gs,Ko=class{static getDataURL(e,t="image/png"){if(/^data:/i.test(e.src)||typeof HTMLCanvasElement>"u")return e.src;let n;if(e instanceof HTMLCanvasElement)n=e;else{gs===void 0&&(gs=Ds("canvas")),gs.width=e.width,gs.height=e.height;let s=gs.getContext("2d");e instanceof ImageData?s.putImageData(e,0,0):s.drawImage(e,0,0,e.width,e.height),n=gs}return n.toDataURL(t)}static sRGBToLinear(e){if(typeof HTMLImageElement<"u"&&e instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&e instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&e instanceof ImageBitmap){let t=Ds("canvas");t.width=e.width,t.height=e.height;let n=t.getContext("2d");n.drawImage(e,0,0,e.width,e.height);let s=n.getImageData(0,0,e.width,e.height),r=s.data;for(let o=0;o<r.length;o++)r[o]=ti(r[o]/255)*255;return n.putImageData(s,0,0),t}else if(e.data){let t=e.data.slice(0);for(let n=0;n<t.length;n++)t instanceof Uint8Array||t instanceof Uint8ClampedArray?t[n]=Math.floor(ti(t[n]/255)*255):t[n]=ti(t[n]);return{data:t,width:e.width,height:e.height}}else return ve("ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),e}},ff=0,Us=class{constructor(e=null){this.isSource=!0,Object.defineProperty(this,"id",{value:ff++}),this.uuid=Tn(),this.data=e,this.dataReady=!0,this.version=0}getSize(e){let t=this.data;return typeof HTMLVideoElement<"u"&&t instanceof HTMLVideoElement?e.set(t.videoWidth,t.videoHeight,0):typeof VideoFrame<"u"&&t instanceof VideoFrame?e.set(t.displayWidth,t.displayHeight,0):t!==null?e.set(t.width,t.height,t.depth||0):e.set(0,0,0),e}set needsUpdate(e){e===!0&&this.version++}toJSON(e){let t=e===void 0||typeof e=="string";if(!t&&e.images[this.uuid]!==void 0)return e.images[this.uuid];let n={uuid:this.uuid,url:""},s=this.data;if(s!==null){let r;if(Array.isArray(s)){r=[];for(let o=0,a=s.length;o<a;o++)s[o].isDataTexture?r.push(Dc(s[o].image)):r.push(Dc(s[o]))}else r=Dc(s);n.url=r}return t||(e.images[this.uuid]=n),n}};function Dc(i){return typeof HTMLImageElement<"u"&&i instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&i instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&i instanceof ImageBitmap?Ko.getDataURL(i):i.data?{data:Array.from(i.data),width:i.width,height:i.height,type:i.data.constructor.name}:(ve("Texture: Unable to serialize Texture."),{})}var pf=0,Nc=new L,Ot=class i extends wn{constructor(e=i.DEFAULT_IMAGE,t=i.DEFAULT_MAPPING,n=gn,s=gn,r=gt,o=hn,a=dn,c=Wt,l=i.DEFAULT_ANISOTROPY,u=ci){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:pf++}),this.uuid=Tn(),this.name="",this.source=new Us(e),this.mipmaps=[],this.mapping=t,this.channel=0,this.wrapS=n,this.wrapT=s,this.magFilter=r,this.minFilter=o,this.anisotropy=l,this.format=a,this.internalFormat=null,this.type=c,this.offset=new be(0,0),this.repeat=new be(1,1),this.center=new be(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new Ie,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=u,this.userData={},this.updateRanges=[],this.version=0,this.onUpdate=null,this.renderTarget=null,this.isRenderTargetTexture=!1,this.isArrayTexture=!!(e&&e.depth&&e.depth>1),this.pmremVersion=0,this.normalized=!1}get width(){return this.source.getSize(Nc).x}get height(){return this.source.getSize(Nc).y}get depth(){return this.source.getSize(Nc).z}get image(){return this.source.data}set image(e){this.source.data=e}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}clone(){return new this.constructor().copy(this)}copy(e){return this.name=e.name,this.source=e.source,this.mipmaps=e.mipmaps.slice(0),this.mapping=e.mapping,this.channel=e.channel,this.wrapS=e.wrapS,this.wrapT=e.wrapT,this.magFilter=e.magFilter,this.minFilter=e.minFilter,this.anisotropy=e.anisotropy,this.format=e.format,this.internalFormat=e.internalFormat,this.type=e.type,this.normalized=e.normalized,this.offset.copy(e.offset),this.repeat.copy(e.repeat),this.center.copy(e.center),this.rotation=e.rotation,this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrix.copy(e.matrix),this.generateMipmaps=e.generateMipmaps,this.premultiplyAlpha=e.premultiplyAlpha,this.flipY=e.flipY,this.unpackAlignment=e.unpackAlignment,this.colorSpace=e.colorSpace,this.renderTarget=e.renderTarget,this.isRenderTargetTexture=e.isRenderTargetTexture,this.isArrayTexture=e.isArrayTexture,this.userData=JSON.parse(JSON.stringify(e.userData)),this.needsUpdate=!0,this}setValues(e){for(let t in e){let n=e[t];if(n===void 0){ve(`Texture.setValues(): parameter '${t}' has value of undefined.`);continue}let s=this[t];if(s===void 0){ve(`Texture.setValues(): property '${t}' does not exist.`);continue}s&&n&&s.isVector2&&n.isVector2||s&&n&&s.isVector3&&n.isVector3||s&&n&&s.isMatrix3&&n.isMatrix3?s.copy(n):this[t]=n}}toJSON(e){let t=e===void 0||typeof e=="string";if(!t&&e.textures[this.uuid]!==void 0)return e.textures[this.uuid];let n={metadata:{version:4.7,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(e).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,normalized:this.normalized,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(n.userData=this.userData),t||(e.textures[this.uuid]=n),n}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(e){if(this.mapping!==Al)return e;if(e.applyMatrix3(this.matrix),e.x<0||e.x>1)switch(this.wrapS){case Si:e.x=e.x-Math.floor(e.x);break;case gn:e.x=e.x<0?0:1;break;case Ps:Math.abs(Math.floor(e.x)%2)===1?e.x=Math.ceil(e.x)-e.x:e.x=e.x-Math.floor(e.x);break}if(e.y<0||e.y>1)switch(this.wrapT){case Si:e.y=e.y-Math.floor(e.y);break;case gn:e.y=e.y<0?0:1;break;case Ps:Math.abs(Math.floor(e.y)%2)===1?e.y=Math.ceil(e.y)-e.y:e.y=e.y-Math.floor(e.y);break}return this.flipY&&(e.y=1-e.y),e}set needsUpdate(e){e===!0&&(this.version++,this.source.needsUpdate=!0)}set needsPMREMUpdate(e){e===!0&&this.pmremVersion++}};Ot.DEFAULT_IMAGE=null;Ot.DEFAULT_MAPPING=Al;Ot.DEFAULT_ANISOTROPY=1;var $e=class i{static{i.prototype.isVector4=!0}constructor(e=0,t=0,n=0,s=1){this.x=e,this.y=t,this.z=n,this.w=s}get width(){return this.z}set width(e){this.z=e}get height(){return this.w}set height(e){this.w=e}set(e,t,n,s){return this.x=e,this.y=t,this.z=n,this.w=s,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this.w=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setW(e){return this.w=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;case 3:this.w=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this.w=e.w!==void 0?e.w:1,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this.w+=e.w,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this.w+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this.w=e.w+t.w,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this.w+=e.w*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this.w-=e.w,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this.w-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this.w=e.w-t.w,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this.w*=e.w,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this.w*=e,this}applyMatrix4(e){let t=this.x,n=this.y,s=this.z,r=this.w,o=e.elements;return this.x=o[0]*t+o[4]*n+o[8]*s+o[12]*r,this.y=o[1]*t+o[5]*n+o[9]*s+o[13]*r,this.z=o[2]*t+o[6]*n+o[10]*s+o[14]*r,this.w=o[3]*t+o[7]*n+o[11]*s+o[15]*r,this}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this.w/=e.w,this}divideScalar(e){return this.multiplyScalar(1/e)}setAxisAngleFromQuaternion(e){this.w=2*Math.acos(e.w);let t=Math.sqrt(1-e.w*e.w);return t<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=e.x/t,this.y=e.y/t,this.z=e.z/t),this}setAxisAngleFromRotationMatrix(e){let t,n,s,r,c=e.elements,l=c[0],u=c[4],d=c[8],h=c[1],p=c[5],g=c[9],v=c[2],m=c[6],f=c[10];if(Math.abs(u-h)<.01&&Math.abs(d-v)<.01&&Math.abs(g-m)<.01){if(Math.abs(u+h)<.1&&Math.abs(d+v)<.1&&Math.abs(g+m)<.1&&Math.abs(l+p+f-3)<.1)return this.set(1,0,0,0),this;t=Math.PI;let b=(l+1)/2,S=(p+1)/2,E=(f+1)/2,w=(u+h)/4,C=(d+v)/4,y=(g+m)/4;return b>S&&b>E?b<.01?(n=0,s=.707106781,r=.707106781):(n=Math.sqrt(b),s=w/n,r=C/n):S>E?S<.01?(n=.707106781,s=0,r=.707106781):(s=Math.sqrt(S),n=w/s,r=y/s):E<.01?(n=.707106781,s=.707106781,r=0):(r=Math.sqrt(E),n=C/r,s=y/r),this.set(n,s,r,t),this}let _=Math.sqrt((m-g)*(m-g)+(d-v)*(d-v)+(h-u)*(h-u));return Math.abs(_)<.001&&(_=1),this.x=(m-g)/_,this.y=(d-v)/_,this.z=(h-u)/_,this.w=Math.acos((l+p+f-1)/2),this}setFromMatrixPosition(e){let t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this.w=t[15],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this.w=Math.min(this.w,e.w),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this.w=Math.max(this.w,e.w),this}clamp(e,t){return this.x=Ve(this.x,e.x,t.x),this.y=Ve(this.y,e.y,t.y),this.z=Ve(this.z,e.z,t.z),this.w=Ve(this.w,e.w,t.w),this}clampScalar(e,t){return this.x=Ve(this.x,e,t),this.y=Ve(this.y,e,t),this.z=Ve(this.z,e,t),this.w=Ve(this.w,e,t),this}clampLength(e,t){let n=this.length();return this.divideScalar(n||1).multiplyScalar(Ve(n,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z+this.w*e.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this.w+=(e.w-this.w)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this.z=e.z+(t.z-e.z)*n,this.w=e.w+(t.w-e.w)*n,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z&&e.w===this.w}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this.w=e[t+3],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e[t+3]=this.w,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this.w=e.getW(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}},jo=class extends wn{constructor(e=1,t=1,n={}){super(),n=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:gt,depthBuffer:!0,stencilBuffer:!1,resolveDepthBuffer:!0,resolveStencilBuffer:!0,depthTexture:null,samples:0,count:1,depth:1,multiview:!1},n),this.isRenderTarget=!0,this.width=e,this.height=t,this.depth=n.depth,this.scissor=new $e(0,0,e,t),this.scissorTest=!1,this.viewport=new $e(0,0,e,t),this.textures=[];let s={width:e,height:t,depth:n.depth},r=new Ot(s),o=n.count;for(let a=0;a<o;a++)this.textures[a]=r.clone(),this.textures[a].isRenderTargetTexture=!0,this.textures[a].renderTarget=this;this._setTextureOptions(n),this.depthBuffer=n.depthBuffer,this.stencilBuffer=n.stencilBuffer,this.resolveDepthBuffer=n.resolveDepthBuffer,this.resolveStencilBuffer=n.resolveStencilBuffer,this._depthTexture=null,this.depthTexture=n.depthTexture,this.samples=n.samples,this.multiview=n.multiview}_setTextureOptions(e={}){let t={minFilter:gt,generateMipmaps:!1,flipY:!1,internalFormat:null};e.mapping!==void 0&&(t.mapping=e.mapping),e.wrapS!==void 0&&(t.wrapS=e.wrapS),e.wrapT!==void 0&&(t.wrapT=e.wrapT),e.wrapR!==void 0&&(t.wrapR=e.wrapR),e.magFilter!==void 0&&(t.magFilter=e.magFilter),e.minFilter!==void 0&&(t.minFilter=e.minFilter),e.format!==void 0&&(t.format=e.format),e.type!==void 0&&(t.type=e.type),e.anisotropy!==void 0&&(t.anisotropy=e.anisotropy),e.colorSpace!==void 0&&(t.colorSpace=e.colorSpace),e.flipY!==void 0&&(t.flipY=e.flipY),e.generateMipmaps!==void 0&&(t.generateMipmaps=e.generateMipmaps),e.internalFormat!==void 0&&(t.internalFormat=e.internalFormat);for(let n=0;n<this.textures.length;n++)this.textures[n].setValues(t)}get texture(){return this.textures[0]}set texture(e){this.textures[0]=e}set depthTexture(e){this._depthTexture!==null&&(this._depthTexture.renderTarget=null),e!==null&&(e.renderTarget=this),this._depthTexture=e}get depthTexture(){return this._depthTexture}setSize(e,t,n=1){if(this.width!==e||this.height!==t||this.depth!==n){this.width=e,this.height=t,this.depth=n;for(let s=0,r=this.textures.length;s<r;s++)this.textures[s].image.width=e,this.textures[s].image.height=t,this.textures[s].image.depth=n,this.textures[s].isData3DTexture!==!0&&(this.textures[s].isArrayTexture=this.textures[s].image.depth>1);this.dispose()}this.viewport.set(0,0,e,t),this.scissor.set(0,0,e,t)}clone(){return new this.constructor().copy(this)}copy(e){this.width=e.width,this.height=e.height,this.depth=e.depth,this.scissor.copy(e.scissor),this.scissorTest=e.scissorTest,this.viewport.copy(e.viewport),this.textures.length=0;for(let t=0,n=e.textures.length;t<n;t++){this.textures[t]=e.textures[t].clone(),this.textures[t].isRenderTargetTexture=!0,this.textures[t].renderTarget=this;let s=Object.assign({},e.textures[t].image);this.textures[t].source=new Us(s)}return this.depthBuffer=e.depthBuffer,this.stencilBuffer=e.stencilBuffer,this.resolveDepthBuffer=e.resolveDepthBuffer,this.resolveStencilBuffer=e.resolveStencilBuffer,e.depthTexture!==null&&(this.depthTexture=e.depthTexture.clone()),this.samples=e.samples,this.multiview=e.multiview,this}dispose(){this.dispatchEvent({type:"dispose"})}},cn=class extends jo{constructor(e=1,t=1,n={}){super(e,t,n),this.isWebGLRenderTarget=!0}},_r=class extends Ot{constructor(e=null,t=1,n=1,s=1){super(null),this.isDataArrayTexture=!0,this.image={data:e,width:t,height:n,depth:s},this.magFilter=St,this.minFilter=St,this.wrapR=gn,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.layerUpdates=new Set}addLayerUpdate(e){this.layerUpdates.add(e)}clearLayerUpdates(){this.layerUpdates.clear()}};var $o=class extends Ot{constructor(e=null,t=1,n=1,s=1){super(null),this.isData3DTexture=!0,this.image={data:e,width:t,height:n,depth:s},this.magFilter=St,this.minFilter=St,this.wrapR=gn,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}};var Ue=class i{static{i.prototype.isMatrix4=!0}constructor(e,t,n,s,r,o,a,c,l,u,d,h,p,g,v,m){this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],e!==void 0&&this.set(e,t,n,s,r,o,a,c,l,u,d,h,p,g,v,m)}set(e,t,n,s,r,o,a,c,l,u,d,h,p,g,v,m){let f=this.elements;return f[0]=e,f[4]=t,f[8]=n,f[12]=s,f[1]=r,f[5]=o,f[9]=a,f[13]=c,f[2]=l,f[6]=u,f[10]=d,f[14]=h,f[3]=p,f[7]=g,f[11]=v,f[15]=m,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new i().fromArray(this.elements)}copy(e){let t=this.elements,n=e.elements;return t[0]=n[0],t[1]=n[1],t[2]=n[2],t[3]=n[3],t[4]=n[4],t[5]=n[5],t[6]=n[6],t[7]=n[7],t[8]=n[8],t[9]=n[9],t[10]=n[10],t[11]=n[11],t[12]=n[12],t[13]=n[13],t[14]=n[14],t[15]=n[15],this}copyPosition(e){let t=this.elements,n=e.elements;return t[12]=n[12],t[13]=n[13],t[14]=n[14],this}setFromMatrix3(e){let t=e.elements;return this.set(t[0],t[3],t[6],0,t[1],t[4],t[7],0,t[2],t[5],t[8],0,0,0,0,1),this}extractBasis(e,t,n){return this.determinant()===0?(e.set(1,0,0),t.set(0,1,0),n.set(0,0,1),this):(e.setFromMatrixColumn(this,0),t.setFromMatrixColumn(this,1),n.setFromMatrixColumn(this,2),this)}makeBasis(e,t,n){return this.set(e.x,t.x,n.x,0,e.y,t.y,n.y,0,e.z,t.z,n.z,0,0,0,0,1),this}extractRotation(e){if(e.determinant()===0)return this.identity();let t=this.elements,n=e.elements,s=1/_s.setFromMatrixColumn(e,0).length(),r=1/_s.setFromMatrixColumn(e,1).length(),o=1/_s.setFromMatrixColumn(e,2).length();return t[0]=n[0]*s,t[1]=n[1]*s,t[2]=n[2]*s,t[3]=0,t[4]=n[4]*r,t[5]=n[5]*r,t[6]=n[6]*r,t[7]=0,t[8]=n[8]*o,t[9]=n[9]*o,t[10]=n[10]*o,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromEuler(e){let t=this.elements,n=e.x,s=e.y,r=e.z,o=Math.cos(n),a=Math.sin(n),c=Math.cos(s),l=Math.sin(s),u=Math.cos(r),d=Math.sin(r);if(e.order==="XYZ"){let h=o*u,p=o*d,g=a*u,v=a*d;t[0]=c*u,t[4]=-c*d,t[8]=l,t[1]=p+g*l,t[5]=h-v*l,t[9]=-a*c,t[2]=v-h*l,t[6]=g+p*l,t[10]=o*c}else if(e.order==="YXZ"){let h=c*u,p=c*d,g=l*u,v=l*d;t[0]=h+v*a,t[4]=g*a-p,t[8]=o*l,t[1]=o*d,t[5]=o*u,t[9]=-a,t[2]=p*a-g,t[6]=v+h*a,t[10]=o*c}else if(e.order==="ZXY"){let h=c*u,p=c*d,g=l*u,v=l*d;t[0]=h-v*a,t[4]=-o*d,t[8]=g+p*a,t[1]=p+g*a,t[5]=o*u,t[9]=v-h*a,t[2]=-o*l,t[6]=a,t[10]=o*c}else if(e.order==="ZYX"){let h=o*u,p=o*d,g=a*u,v=a*d;t[0]=c*u,t[4]=g*l-p,t[8]=h*l+v,t[1]=c*d,t[5]=v*l+h,t[9]=p*l-g,t[2]=-l,t[6]=a*c,t[10]=o*c}else if(e.order==="YZX"){let h=o*c,p=o*l,g=a*c,v=a*l;t[0]=c*u,t[4]=v-h*d,t[8]=g*d+p,t[1]=d,t[5]=o*u,t[9]=-a*u,t[2]=-l*u,t[6]=p*d+g,t[10]=h-v*d}else if(e.order==="XZY"){let h=o*c,p=o*l,g=a*c,v=a*l;t[0]=c*u,t[4]=-d,t[8]=l*u,t[1]=h*d+v,t[5]=o*u,t[9]=p*d-g,t[2]=g*d-p,t[6]=a*u,t[10]=v*d+h}return t[3]=0,t[7]=0,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromQuaternion(e){return this.compose(mf,e,gf)}lookAt(e,t,n){let s=this.elements;return rn.subVectors(e,t),rn.lengthSq()===0&&(rn.z=1),rn.normalize(),mi.crossVectors(n,rn),mi.lengthSq()===0&&(Math.abs(n.z)===1?rn.x+=1e-4:rn.z+=1e-4,rn.normalize(),mi.crossVectors(n,rn)),mi.normalize(),ho.crossVectors(rn,mi),s[0]=mi.x,s[4]=ho.x,s[8]=rn.x,s[1]=mi.y,s[5]=ho.y,s[9]=rn.y,s[2]=mi.z,s[6]=ho.z,s[10]=rn.z,this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){let n=e.elements,s=t.elements,r=this.elements,o=n[0],a=n[4],c=n[8],l=n[12],u=n[1],d=n[5],h=n[9],p=n[13],g=n[2],v=n[6],m=n[10],f=n[14],_=n[3],b=n[7],S=n[11],E=n[15],w=s[0],C=s[4],y=s[8],A=s[12],I=s[1],R=s[5],O=s[9],G=s[13],X=s[2],U=s[6],F=s[10],V=s[14],j=s[3],$=s[7],ae=s[11],ye=s[15];return r[0]=o*w+a*I+c*X+l*j,r[4]=o*C+a*R+c*U+l*$,r[8]=o*y+a*O+c*F+l*ae,r[12]=o*A+a*G+c*V+l*ye,r[1]=u*w+d*I+h*X+p*j,r[5]=u*C+d*R+h*U+p*$,r[9]=u*y+d*O+h*F+p*ae,r[13]=u*A+d*G+h*V+p*ye,r[2]=g*w+v*I+m*X+f*j,r[6]=g*C+v*R+m*U+f*$,r[10]=g*y+v*O+m*F+f*ae,r[14]=g*A+v*G+m*V+f*ye,r[3]=_*w+b*I+S*X+E*j,r[7]=_*C+b*R+S*U+E*$,r[11]=_*y+b*O+S*F+E*ae,r[15]=_*A+b*G+S*V+E*ye,this}multiplyScalar(e){let t=this.elements;return t[0]*=e,t[4]*=e,t[8]*=e,t[12]*=e,t[1]*=e,t[5]*=e,t[9]*=e,t[13]*=e,t[2]*=e,t[6]*=e,t[10]*=e,t[14]*=e,t[3]*=e,t[7]*=e,t[11]*=e,t[15]*=e,this}determinant(){let e=this.elements,t=e[0],n=e[4],s=e[8],r=e[12],o=e[1],a=e[5],c=e[9],l=e[13],u=e[2],d=e[6],h=e[10],p=e[14],g=e[3],v=e[7],m=e[11],f=e[15],_=c*p-l*h,b=a*p-l*d,S=a*h-c*d,E=o*p-l*u,w=o*h-c*u,C=o*d-a*u;return t*(v*_-m*b+f*S)-n*(g*_-m*E+f*w)+s*(g*b-v*E+f*C)-r*(g*S-v*w+m*C)}transpose(){let e=this.elements,t;return t=e[1],e[1]=e[4],e[4]=t,t=e[2],e[2]=e[8],e[8]=t,t=e[6],e[6]=e[9],e[9]=t,t=e[3],e[3]=e[12],e[12]=t,t=e[7],e[7]=e[13],e[13]=t,t=e[11],e[11]=e[14],e[14]=t,this}setPosition(e,t,n){let s=this.elements;return e.isVector3?(s[12]=e.x,s[13]=e.y,s[14]=e.z):(s[12]=e,s[13]=t,s[14]=n),this}invert(){let e=this.elements,t=e[0],n=e[1],s=e[2],r=e[3],o=e[4],a=e[5],c=e[6],l=e[7],u=e[8],d=e[9],h=e[10],p=e[11],g=e[12],v=e[13],m=e[14],f=e[15],_=t*a-n*o,b=t*c-s*o,S=t*l-r*o,E=n*c-s*a,w=n*l-r*a,C=s*l-r*c,y=u*v-d*g,A=u*m-h*g,I=u*f-p*g,R=d*m-h*v,O=d*f-p*v,G=h*f-p*m,X=_*G-b*O+S*R+E*I-w*A+C*y;if(X===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);let U=1/X;return e[0]=(a*G-c*O+l*R)*U,e[1]=(s*O-n*G-r*R)*U,e[2]=(v*C-m*w+f*E)*U,e[3]=(h*w-d*C-p*E)*U,e[4]=(c*I-o*G-l*A)*U,e[5]=(t*G-s*I+r*A)*U,e[6]=(m*S-g*C-f*b)*U,e[7]=(u*C-h*S+p*b)*U,e[8]=(o*O-a*I+l*y)*U,e[9]=(n*I-t*O-r*y)*U,e[10]=(g*w-v*S+f*_)*U,e[11]=(d*S-u*w-p*_)*U,e[12]=(a*A-o*R-c*y)*U,e[13]=(t*R-n*A+s*y)*U,e[14]=(v*b-g*E-m*_)*U,e[15]=(u*E-d*b+h*_)*U,this}scale(e){let t=this.elements,n=e.x,s=e.y,r=e.z;return t[0]*=n,t[4]*=s,t[8]*=r,t[1]*=n,t[5]*=s,t[9]*=r,t[2]*=n,t[6]*=s,t[10]*=r,t[3]*=n,t[7]*=s,t[11]*=r,this}getMaxScaleOnAxis(){let e=this.elements,t=e[0]*e[0]+e[1]*e[1]+e[2]*e[2],n=e[4]*e[4]+e[5]*e[5]+e[6]*e[6],s=e[8]*e[8]+e[9]*e[9]+e[10]*e[10];return Math.sqrt(Math.max(t,n,s))}makeTranslation(e,t,n){return e.isVector3?this.set(1,0,0,e.x,0,1,0,e.y,0,0,1,e.z,0,0,0,1):this.set(1,0,0,e,0,1,0,t,0,0,1,n,0,0,0,1),this}makeRotationX(e){let t=Math.cos(e),n=Math.sin(e);return this.set(1,0,0,0,0,t,-n,0,0,n,t,0,0,0,0,1),this}makeRotationY(e){let t=Math.cos(e),n=Math.sin(e);return this.set(t,0,n,0,0,1,0,0,-n,0,t,0,0,0,0,1),this}makeRotationZ(e){let t=Math.cos(e),n=Math.sin(e);return this.set(t,-n,0,0,n,t,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(e,t){let n=Math.cos(t),s=Math.sin(t),r=1-n,o=e.x,a=e.y,c=e.z,l=r*o,u=r*a;return this.set(l*o+n,l*a-s*c,l*c+s*a,0,l*a+s*c,u*a+n,u*c-s*o,0,l*c-s*a,u*c+s*o,r*c*c+n,0,0,0,0,1),this}makeScale(e,t,n){return this.set(e,0,0,0,0,t,0,0,0,0,n,0,0,0,0,1),this}makeShear(e,t,n,s,r,o){return this.set(1,n,r,0,e,1,o,0,t,s,1,0,0,0,0,1),this}compose(e,t,n){let s=this.elements,r=t._x,o=t._y,a=t._z,c=t._w,l=r+r,u=o+o,d=a+a,h=r*l,p=r*u,g=r*d,v=o*u,m=o*d,f=a*d,_=c*l,b=c*u,S=c*d,E=n.x,w=n.y,C=n.z;return s[0]=(1-(v+f))*E,s[1]=(p+S)*E,s[2]=(g-b)*E,s[3]=0,s[4]=(p-S)*w,s[5]=(1-(h+f))*w,s[6]=(m+_)*w,s[7]=0,s[8]=(g+b)*C,s[9]=(m-_)*C,s[10]=(1-(h+v))*C,s[11]=0,s[12]=e.x,s[13]=e.y,s[14]=e.z,s[15]=1,this}decompose(e,t,n){let s=this.elements;e.x=s[12],e.y=s[13],e.z=s[14];let r=this.determinant();if(r===0)return n.set(1,1,1),t.identity(),this;let o=_s.set(s[0],s[1],s[2]).length(),a=_s.set(s[4],s[5],s[6]).length(),c=_s.set(s[8],s[9],s[10]).length();r<0&&(o=-o),yn.copy(this);let l=1/o,u=1/a,d=1/c;return yn.elements[0]*=l,yn.elements[1]*=l,yn.elements[2]*=l,yn.elements[4]*=u,yn.elements[5]*=u,yn.elements[6]*=u,yn.elements[8]*=d,yn.elements[9]*=d,yn.elements[10]*=d,t.setFromRotationMatrix(yn),n.x=o,n.y=a,n.z=c,this}makePerspective(e,t,n,s,r,o,a=Sn,c=!1){let l=this.elements,u=2*r/(t-e),d=2*r/(n-s),h=(t+e)/(t-e),p=(n+s)/(n-s),g,v;if(c)g=r/(o-r),v=o*r/(o-r);else if(a===Sn)g=-(o+r)/(o-r),v=-2*o*r/(o-r);else if(a===Ls)g=-o/(o-r),v=-o*r/(o-r);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+a);return l[0]=u,l[4]=0,l[8]=h,l[12]=0,l[1]=0,l[5]=d,l[9]=p,l[13]=0,l[2]=0,l[6]=0,l[10]=g,l[14]=v,l[3]=0,l[7]=0,l[11]=-1,l[15]=0,this}makeOrthographic(e,t,n,s,r,o,a=Sn,c=!1){let l=this.elements,u=2/(t-e),d=2/(n-s),h=-(t+e)/(t-e),p=-(n+s)/(n-s),g,v;if(c)g=1/(o-r),v=o/(o-r);else if(a===Sn)g=-2/(o-r),v=-(o+r)/(o-r);else if(a===Ls)g=-1/(o-r),v=-r/(o-r);else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+a);return l[0]=u,l[4]=0,l[8]=0,l[12]=h,l[1]=0,l[5]=d,l[9]=0,l[13]=p,l[2]=0,l[6]=0,l[10]=g,l[14]=v,l[3]=0,l[7]=0,l[11]=0,l[15]=1,this}equals(e){let t=this.elements,n=e.elements;for(let s=0;s<16;s++)if(t[s]!==n[s])return!1;return!0}fromArray(e,t=0){for(let n=0;n<16;n++)this.elements[n]=e[n+t];return this}toArray(e=[],t=0){let n=this.elements;return e[t]=n[0],e[t+1]=n[1],e[t+2]=n[2],e[t+3]=n[3],e[t+4]=n[4],e[t+5]=n[5],e[t+6]=n[6],e[t+7]=n[7],e[t+8]=n[8],e[t+9]=n[9],e[t+10]=n[10],e[t+11]=n[11],e[t+12]=n[12],e[t+13]=n[13],e[t+14]=n[14],e[t+15]=n[15],e}},_s=new L,yn=new Ue,mf=new L(0,0,0),gf=new L(1,1,1),mi=new L,ho=new L,rn=new L,hh=new Ue,uh=new Gt,An=class i{constructor(e=0,t=0,n=0,s=i.DEFAULT_ORDER){this.isEuler=!0,this._x=e,this._y=t,this._z=n,this._order=s}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get order(){return this._order}set order(e){this._order=e,this._onChangeCallback()}set(e,t,n,s=this._order){return this._x=e,this._y=t,this._z=n,this._order=s,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(e){return this._x=e._x,this._y=e._y,this._z=e._z,this._order=e._order,this._onChangeCallback(),this}setFromRotationMatrix(e,t=this._order,n=!0){let s=e.elements,r=s[0],o=s[4],a=s[8],c=s[1],l=s[5],u=s[9],d=s[2],h=s[6],p=s[10];switch(t){case"XYZ":this._y=Math.asin(Ve(a,-1,1)),Math.abs(a)<.9999999?(this._x=Math.atan2(-u,p),this._z=Math.atan2(-o,r)):(this._x=Math.atan2(h,l),this._z=0);break;case"YXZ":this._x=Math.asin(-Ve(u,-1,1)),Math.abs(u)<.9999999?(this._y=Math.atan2(a,p),this._z=Math.atan2(c,l)):(this._y=Math.atan2(-d,r),this._z=0);break;case"ZXY":this._x=Math.asin(Ve(h,-1,1)),Math.abs(h)<.9999999?(this._y=Math.atan2(-d,p),this._z=Math.atan2(-o,l)):(this._y=0,this._z=Math.atan2(c,r));break;case"ZYX":this._y=Math.asin(-Ve(d,-1,1)),Math.abs(d)<.9999999?(this._x=Math.atan2(h,p),this._z=Math.atan2(c,r)):(this._x=0,this._z=Math.atan2(-o,l));break;case"YZX":this._z=Math.asin(Ve(c,-1,1)),Math.abs(c)<.9999999?(this._x=Math.atan2(-u,l),this._y=Math.atan2(-d,r)):(this._x=0,this._y=Math.atan2(a,p));break;case"XZY":this._z=Math.asin(-Ve(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(h,l),this._y=Math.atan2(a,r)):(this._x=Math.atan2(-u,p),this._y=0);break;default:ve("Euler: .setFromRotationMatrix() encountered an unknown order: "+t)}return this._order=t,n===!0&&this._onChangeCallback(),this}setFromQuaternion(e,t,n){return hh.makeRotationFromQuaternion(e),this.setFromRotationMatrix(hh,t,n)}setFromVector3(e,t=this._order){return this.set(e.x,e.y,e.z,t)}reorder(e){return uh.setFromEuler(this),this.setFromQuaternion(uh,e)}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._order===this._order}fromArray(e){return this._x=e[0],this._y=e[1],this._z=e[2],e[3]!==void 0&&(this._order=e[3]),this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._order,e}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}};An.DEFAULT_ORDER="XYZ";var xr=class{constructor(){this.mask=1}set(e){this.mask=(1<<e|0)>>>0}enable(e){this.mask|=1<<e|0}enableAll(){this.mask=-1}toggle(e){this.mask^=1<<e|0}disable(e){this.mask&=~(1<<e|0)}disableAll(){this.mask=0}test(e){return(this.mask&e.mask)!==0}isEnabled(e){return(this.mask&(1<<e|0))!==0}},_f=0,dh=new L,xs=new Gt,Kn=new Ue,uo=new L,rr=new L,xf=new L,yf=new Gt,fh=new L(1,0,0),ph=new L(0,1,0),mh=new L(0,0,1),gh={type:"added"},vf={type:"removed"},ys={type:"childadded",child:null},Uc={type:"childremoved",child:null},lt=class i extends wn{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:_f++}),this.uuid=Tn(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=i.DEFAULT_UP.clone();let e=new L,t=new An,n=new Gt,s=new L(1,1,1);function r(){n.setFromEuler(t,!1)}function o(){t.setFromQuaternion(n,void 0,!1)}t._onChange(r),n._onChange(o),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:e},rotation:{configurable:!0,enumerable:!0,value:t},quaternion:{configurable:!0,enumerable:!0,value:n},scale:{configurable:!0,enumerable:!0,value:s},modelViewMatrix:{value:new Ue},normalMatrix:{value:new Ie}}),this.matrix=new Ue,this.matrixWorld=new Ue,this.matrixAutoUpdate=i.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=i.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new xr,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.customDepthMaterial=void 0,this.customDistanceMaterial=void 0,this.static=!1,this.userData={},this.pivot=null}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(e){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(e),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(e){return this.quaternion.premultiply(e),this}setRotationFromAxisAngle(e,t){this.quaternion.setFromAxisAngle(e,t)}setRotationFromEuler(e){this.quaternion.setFromEuler(e,!0)}setRotationFromMatrix(e){this.quaternion.setFromRotationMatrix(e)}setRotationFromQuaternion(e){this.quaternion.copy(e)}rotateOnAxis(e,t){return xs.setFromAxisAngle(e,t),this.quaternion.multiply(xs),this}rotateOnWorldAxis(e,t){return xs.setFromAxisAngle(e,t),this.quaternion.premultiply(xs),this}rotateX(e){return this.rotateOnAxis(fh,e)}rotateY(e){return this.rotateOnAxis(ph,e)}rotateZ(e){return this.rotateOnAxis(mh,e)}translateOnAxis(e,t){return dh.copy(e).applyQuaternion(this.quaternion),this.position.add(dh.multiplyScalar(t)),this}translateX(e){return this.translateOnAxis(fh,e)}translateY(e){return this.translateOnAxis(ph,e)}translateZ(e){return this.translateOnAxis(mh,e)}localToWorld(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(this.matrixWorld)}worldToLocal(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(Kn.copy(this.matrixWorld).invert())}lookAt(e,t,n){e.isVector3?uo.copy(e):uo.set(e,t,n);let s=this.parent;this.updateWorldMatrix(!0,!1),rr.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?Kn.lookAt(rr,uo,this.up):Kn.lookAt(uo,rr,this.up),this.quaternion.setFromRotationMatrix(Kn),s&&(Kn.extractRotation(s.matrixWorld),xs.setFromRotationMatrix(Kn),this.quaternion.premultiply(xs.invert()))}add(e){if(arguments.length>1){for(let t=0;t<arguments.length;t++)this.add(arguments[t]);return this}return e===this?(Ee("Object3D.add: object can't be added as a child of itself.",e),this):(e&&e.isObject3D?(e.removeFromParent(),e.parent=this,this.children.push(e),e.dispatchEvent(gh),ys.child=e,this.dispatchEvent(ys),ys.child=null):Ee("Object3D.add: object not an instance of THREE.Object3D.",e),this)}remove(e){if(arguments.length>1){for(let n=0;n<arguments.length;n++)this.remove(arguments[n]);return this}let t=this.children.indexOf(e);return t!==-1&&(e.parent=null,this.children.splice(t,1),e.dispatchEvent(vf),Uc.child=e,this.dispatchEvent(Uc),Uc.child=null),this}removeFromParent(){let e=this.parent;return e!==null&&e.remove(this),this}clear(){return this.remove(...this.children)}attach(e){return this.updateWorldMatrix(!0,!1),Kn.copy(this.matrixWorld).invert(),e.parent!==null&&(e.parent.updateWorldMatrix(!0,!1),Kn.multiply(e.parent.matrixWorld)),e.applyMatrix4(Kn),e.removeFromParent(),e.parent=this,this.children.push(e),e.updateWorldMatrix(!1,!0),e.dispatchEvent(gh),ys.child=e,this.dispatchEvent(ys),ys.child=null,this}getObjectById(e){return this.getObjectByProperty("id",e)}getObjectByName(e){return this.getObjectByProperty("name",e)}getObjectByProperty(e,t){if(this[e]===t)return this;for(let n=0,s=this.children.length;n<s;n++){let o=this.children[n].getObjectByProperty(e,t);if(o!==void 0)return o}}getObjectsByProperty(e,t,n=[]){this[e]===t&&n.push(this);let s=this.children;for(let r=0,o=s.length;r<o;r++)s[r].getObjectsByProperty(e,t,n);return n}getWorldPosition(e){return this.updateWorldMatrix(!0,!1),e.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(rr,e,xf),e}getWorldScale(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(rr,yf,e),e}getWorldDirection(e){this.updateWorldMatrix(!0,!1);let t=this.matrixWorld.elements;return e.set(t[8],t[9],t[10]).normalize()}raycast(){}traverse(e){e(this);let t=this.children;for(let n=0,s=t.length;n<s;n++)t[n].traverse(e)}traverseVisible(e){if(this.visible===!1)return;e(this);let t=this.children;for(let n=0,s=t.length;n<s;n++)t[n].traverseVisible(e)}traverseAncestors(e){let t=this.parent;t!==null&&(e(t),t.traverseAncestors(e))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale);let e=this.pivot;if(e!==null){let t=e.x,n=e.y,s=e.z,r=this.matrix.elements;r[12]+=t-r[0]*t-r[4]*n-r[8]*s,r[13]+=n-r[1]*t-r[5]*n-r[9]*s,r[14]+=s-r[2]*t-r[6]*n-r[10]*s}this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(e){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||e)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,e=!0);let t=this.children;for(let n=0,s=t.length;n<s;n++)t[n].updateMatrixWorld(e)}updateWorldMatrix(e,t){let n=this.parent;if(e===!0&&n!==null&&n.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),t===!0){let s=this.children;for(let r=0,o=s.length;r<o;r++)s[r].updateWorldMatrix(!1,!0)}}toJSON(e){let t=e===void 0||typeof e=="string",n={};t&&(e={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},n.metadata={version:4.7,type:"Object",generator:"Object3D.toJSON"});let s={};s.uuid=this.uuid,s.type=this.type,this.name!==""&&(s.name=this.name),this.castShadow===!0&&(s.castShadow=!0),this.receiveShadow===!0&&(s.receiveShadow=!0),this.visible===!1&&(s.visible=!1),this.frustumCulled===!1&&(s.frustumCulled=!1),this.renderOrder!==0&&(s.renderOrder=this.renderOrder),this.static!==!1&&(s.static=this.static),Object.keys(this.userData).length>0&&(s.userData=this.userData),s.layers=this.layers.mask,s.matrix=this.matrix.toArray(),s.up=this.up.toArray(),this.pivot!==null&&(s.pivot=this.pivot.toArray()),this.matrixAutoUpdate===!1&&(s.matrixAutoUpdate=!1),this.morphTargetDictionary!==void 0&&(s.morphTargetDictionary=Object.assign({},this.morphTargetDictionary)),this.morphTargetInfluences!==void 0&&(s.morphTargetInfluences=this.morphTargetInfluences.slice()),this.isInstancedMesh&&(s.type="InstancedMesh",s.count=this.count,s.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(s.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(s.type="BatchedMesh",s.perObjectFrustumCulled=this.perObjectFrustumCulled,s.sortObjects=this.sortObjects,s.drawRanges=this._drawRanges,s.reservedRanges=this._reservedRanges,s.geometryInfo=this._geometryInfo.map(a=>({...a,boundingBox:a.boundingBox?a.boundingBox.toJSON():void 0,boundingSphere:a.boundingSphere?a.boundingSphere.toJSON():void 0})),s.instanceInfo=this._instanceInfo.map(a=>({...a})),s.availableInstanceIds=this._availableInstanceIds.slice(),s.availableGeometryIds=this._availableGeometryIds.slice(),s.nextIndexStart=this._nextIndexStart,s.nextVertexStart=this._nextVertexStart,s.geometryCount=this._geometryCount,s.maxInstanceCount=this._maxInstanceCount,s.maxVertexCount=this._maxVertexCount,s.maxIndexCount=this._maxIndexCount,s.geometryInitialized=this._geometryInitialized,s.matricesTexture=this._matricesTexture.toJSON(e),s.indirectTexture=this._indirectTexture.toJSON(e),this._colorsTexture!==null&&(s.colorsTexture=this._colorsTexture.toJSON(e)),this.boundingSphere!==null&&(s.boundingSphere=this.boundingSphere.toJSON()),this.boundingBox!==null&&(s.boundingBox=this.boundingBox.toJSON()));function r(a,c){return a[c.uuid]===void 0&&(a[c.uuid]=c.toJSON(e)),c.uuid}if(this.isScene)this.background&&(this.background.isColor?s.background=this.background.toJSON():this.background.isTexture&&(s.background=this.background.toJSON(e).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(s.environment=this.environment.toJSON(e).uuid);else if(this.isMesh||this.isLine||this.isPoints){s.geometry=r(e.geometries,this.geometry);let a=this.geometry.parameters;if(a!==void 0&&a.shapes!==void 0){let c=a.shapes;if(Array.isArray(c))for(let l=0,u=c.length;l<u;l++){let d=c[l];r(e.shapes,d)}else r(e.shapes,c)}}if(this.isSkinnedMesh&&(s.bindMode=this.bindMode,s.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(r(e.skeletons,this.skeleton),s.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){let a=[];for(let c=0,l=this.material.length;c<l;c++)a.push(r(e.materials,this.material[c]));s.material=a}else s.material=r(e.materials,this.material);if(this.children.length>0){s.children=[];for(let a=0;a<this.children.length;a++)s.children.push(this.children[a].toJSON(e).object)}if(this.animations.length>0){s.animations=[];for(let a=0;a<this.animations.length;a++){let c=this.animations[a];s.animations.push(r(e.animations,c))}}if(t){let a=o(e.geometries),c=o(e.materials),l=o(e.textures),u=o(e.images),d=o(e.shapes),h=o(e.skeletons),p=o(e.animations),g=o(e.nodes);a.length>0&&(n.geometries=a),c.length>0&&(n.materials=c),l.length>0&&(n.textures=l),u.length>0&&(n.images=u),d.length>0&&(n.shapes=d),h.length>0&&(n.skeletons=h),p.length>0&&(n.animations=p),g.length>0&&(n.nodes=g)}return n.object=s,n;function o(a){let c=[];for(let l in a){let u=a[l];delete u.metadata,c.push(u)}return c}}clone(e){return new this.constructor().copy(this,e)}copy(e,t=!0){if(this.name=e.name,this.up.copy(e.up),this.position.copy(e.position),this.rotation.order=e.rotation.order,this.quaternion.copy(e.quaternion),this.scale.copy(e.scale),this.pivot=e.pivot!==null?e.pivot.clone():null,this.matrix.copy(e.matrix),this.matrixWorld.copy(e.matrixWorld),this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrixWorldAutoUpdate=e.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=e.matrixWorldNeedsUpdate,this.layers.mask=e.layers.mask,this.visible=e.visible,this.castShadow=e.castShadow,this.receiveShadow=e.receiveShadow,this.frustumCulled=e.frustumCulled,this.renderOrder=e.renderOrder,this.static=e.static,this.animations=e.animations.slice(),this.userData=JSON.parse(JSON.stringify(e.userData)),t===!0)for(let n=0;n<e.children.length;n++){let s=e.children[n];this.add(s.clone())}return this}};lt.DEFAULT_UP=new L(0,1,0);lt.DEFAULT_MATRIX_AUTO_UPDATE=!0;lt.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;var Zt=class extends lt{constructor(){super(),this.isGroup=!0,this.type="Group"}},Mf={type:"move"},Fs=class{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new Zt,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new Zt,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new L,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new L),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new Zt,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new L,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new L,this._grip.eventsEnabled=!1),this._grip}dispatchEvent(e){return this._targetRay!==null&&this._targetRay.dispatchEvent(e),this._grip!==null&&this._grip.dispatchEvent(e),this._hand!==null&&this._hand.dispatchEvent(e),this}connect(e){if(e&&e.hand){let t=this._hand;if(t)for(let n of e.hand.values())this._getHandJoint(t,n)}return this.dispatchEvent({type:"connected",data:e}),this}disconnect(e){return this.dispatchEvent({type:"disconnected",data:e}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(e,t,n){let s=null,r=null,o=null,a=this._targetRay,c=this._grip,l=this._hand;if(e&&t.session.visibilityState!=="visible-blurred"){if(l&&e.hand){o=!0;for(let v of e.hand.values()){let m=t.getJointPose(v,n),f=this._getHandJoint(l,v);m!==null&&(f.matrix.fromArray(m.transform.matrix),f.matrix.decompose(f.position,f.rotation,f.scale),f.matrixWorldNeedsUpdate=!0,f.jointRadius=m.radius),f.visible=m!==null}let u=l.joints["index-finger-tip"],d=l.joints["thumb-tip"],h=u.position.distanceTo(d.position),p=.02,g=.005;l.inputState.pinching&&h>p+g?(l.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:e.handedness,target:this})):!l.inputState.pinching&&h<=p-g&&(l.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:e.handedness,target:this}))}else c!==null&&e.gripSpace&&(r=t.getPose(e.gripSpace,n),r!==null&&(c.matrix.fromArray(r.transform.matrix),c.matrix.decompose(c.position,c.rotation,c.scale),c.matrixWorldNeedsUpdate=!0,r.linearVelocity?(c.hasLinearVelocity=!0,c.linearVelocity.copy(r.linearVelocity)):c.hasLinearVelocity=!1,r.angularVelocity?(c.hasAngularVelocity=!0,c.angularVelocity.copy(r.angularVelocity)):c.hasAngularVelocity=!1,c.eventsEnabled&&c.dispatchEvent({type:"gripUpdated",data:e,target:this})));a!==null&&(s=t.getPose(e.targetRaySpace,n),s===null&&r!==null&&(s=r),s!==null&&(a.matrix.fromArray(s.transform.matrix),a.matrix.decompose(a.position,a.rotation,a.scale),a.matrixWorldNeedsUpdate=!0,s.linearVelocity?(a.hasLinearVelocity=!0,a.linearVelocity.copy(s.linearVelocity)):a.hasLinearVelocity=!1,s.angularVelocity?(a.hasAngularVelocity=!0,a.angularVelocity.copy(s.angularVelocity)):a.hasAngularVelocity=!1,this.dispatchEvent(Mf)))}return a!==null&&(a.visible=s!==null),c!==null&&(c.visible=r!==null),l!==null&&(l.visible=o!==null),this}_getHandJoint(e,t){if(e.joints[t.jointName]===void 0){let n=new Zt;n.matrixAutoUpdate=!1,n.visible=!1,e.joints[t.jointName]=n,e.add(n)}return e.joints[t.jointName]}},Tu={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},gi={h:0,s:0,l:0},fo={h:0,s:0,l:0};function Fc(i,e,t){return t<0&&(t+=1),t>1&&(t-=1),t<1/6?i+(e-i)*6*t:t<1/2?e:t<2/3?i+(e-i)*6*(2/3-t):i}var ge=class{constructor(e,t,n){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(e,t,n)}set(e,t,n){if(t===void 0&&n===void 0){let s=e;s&&s.isColor?this.copy(s):typeof s=="number"?this.setHex(s):typeof s=="string"&&this.setStyle(s)}else this.setRGB(e,t,n);return this}setScalar(e){return this.r=e,this.g=e,this.b=e,this}setHex(e,t=Pt){return e=Math.floor(e),this.r=(e>>16&255)/255,this.g=(e>>8&255)/255,this.b=(e&255)/255,ze.colorSpaceToWorking(this,t),this}setRGB(e,t,n,s=ze.workingColorSpace){return this.r=e,this.g=t,this.b=n,ze.colorSpaceToWorking(this,s),this}setHSL(e,t,n,s=ze.workingColorSpace){if(e=Fl(e,1),t=Ve(t,0,1),n=Ve(n,0,1),t===0)this.r=this.g=this.b=n;else{let r=n<=.5?n*(1+t):n+t-n*t,o=2*n-r;this.r=Fc(o,r,e+1/3),this.g=Fc(o,r,e),this.b=Fc(o,r,e-1/3)}return ze.colorSpaceToWorking(this,s),this}setStyle(e,t=Pt){function n(r){r!==void 0&&parseFloat(r)<1&&ve("Color: Alpha component of "+e+" will be ignored.")}let s;if(s=/^(\w+)\(([^\)]*)\)/.exec(e)){let r,o=s[1],a=s[2];switch(o){case"rgb":case"rgba":if(r=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return n(r[4]),this.setRGB(Math.min(255,parseInt(r[1],10))/255,Math.min(255,parseInt(r[2],10))/255,Math.min(255,parseInt(r[3],10))/255,t);if(r=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return n(r[4]),this.setRGB(Math.min(100,parseInt(r[1],10))/100,Math.min(100,parseInt(r[2],10))/100,Math.min(100,parseInt(r[3],10))/100,t);break;case"hsl":case"hsla":if(r=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return n(r[4]),this.setHSL(parseFloat(r[1])/360,parseFloat(r[2])/100,parseFloat(r[3])/100,t);break;default:ve("Color: Unknown color model "+e)}}else if(s=/^\#([A-Fa-f\d]+)$/.exec(e)){let r=s[1],o=r.length;if(o===3)return this.setRGB(parseInt(r.charAt(0),16)/15,parseInt(r.charAt(1),16)/15,parseInt(r.charAt(2),16)/15,t);if(o===6)return this.setHex(parseInt(r,16),t);ve("Color: Invalid hex color "+e)}else if(e&&e.length>0)return this.setColorName(e,t);return this}setColorName(e,t=Pt){let n=Tu[e.toLowerCase()];return n!==void 0?this.setHex(n,t):ve("Color: Unknown color "+e),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(e){return this.r=e.r,this.g=e.g,this.b=e.b,this}copySRGBToLinear(e){return this.r=ti(e.r),this.g=ti(e.g),this.b=ti(e.b),this}copyLinearToSRGB(e){return this.r=Is(e.r),this.g=Is(e.g),this.b=Is(e.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(e=Pt){return ze.workingToColorSpace(Ht.copy(this),e),Math.round(Ve(Ht.r*255,0,255))*65536+Math.round(Ve(Ht.g*255,0,255))*256+Math.round(Ve(Ht.b*255,0,255))}getHexString(e=Pt){return("000000"+this.getHex(e).toString(16)).slice(-6)}getHSL(e,t=ze.workingColorSpace){ze.workingToColorSpace(Ht.copy(this),t);let n=Ht.r,s=Ht.g,r=Ht.b,o=Math.max(n,s,r),a=Math.min(n,s,r),c,l,u=(a+o)/2;if(a===o)c=0,l=0;else{let d=o-a;switch(l=u<=.5?d/(o+a):d/(2-o-a),o){case n:c=(s-r)/d+(s<r?6:0);break;case s:c=(r-n)/d+2;break;case r:c=(n-s)/d+4;break}c/=6}return e.h=c,e.s=l,e.l=u,e}getRGB(e,t=ze.workingColorSpace){return ze.workingToColorSpace(Ht.copy(this),t),e.r=Ht.r,e.g=Ht.g,e.b=Ht.b,e}getStyle(e=Pt){ze.workingToColorSpace(Ht.copy(this),e);let t=Ht.r,n=Ht.g,s=Ht.b;return e!==Pt?`color(${e} ${t.toFixed(3)} ${n.toFixed(3)} ${s.toFixed(3)})`:`rgb(${Math.round(t*255)},${Math.round(n*255)},${Math.round(s*255)})`}offsetHSL(e,t,n){return this.getHSL(gi),this.setHSL(gi.h+e,gi.s+t,gi.l+n)}add(e){return this.r+=e.r,this.g+=e.g,this.b+=e.b,this}addColors(e,t){return this.r=e.r+t.r,this.g=e.g+t.g,this.b=e.b+t.b,this}addScalar(e){return this.r+=e,this.g+=e,this.b+=e,this}sub(e){return this.r=Math.max(0,this.r-e.r),this.g=Math.max(0,this.g-e.g),this.b=Math.max(0,this.b-e.b),this}multiply(e){return this.r*=e.r,this.g*=e.g,this.b*=e.b,this}multiplyScalar(e){return this.r*=e,this.g*=e,this.b*=e,this}lerp(e,t){return this.r+=(e.r-this.r)*t,this.g+=(e.g-this.g)*t,this.b+=(e.b-this.b)*t,this}lerpColors(e,t,n){return this.r=e.r+(t.r-e.r)*n,this.g=e.g+(t.g-e.g)*n,this.b=e.b+(t.b-e.b)*n,this}lerpHSL(e,t){this.getHSL(gi),e.getHSL(fo);let n=pr(gi.h,fo.h,t),s=pr(gi.s,fo.s,t),r=pr(gi.l,fo.l,t);return this.setHSL(n,s,r),this}setFromVector3(e){return this.r=e.x,this.g=e.y,this.b=e.z,this}applyMatrix3(e){let t=this.r,n=this.g,s=this.b,r=e.elements;return this.r=r[0]*t+r[3]*n+r[6]*s,this.g=r[1]*t+r[4]*n+r[7]*s,this.b=r[2]*t+r[5]*n+r[8]*s,this}equals(e){return e.r===this.r&&e.g===this.g&&e.b===this.b}fromArray(e,t=0){return this.r=e[t],this.g=e[t+1],this.b=e[t+2],this}toArray(e=[],t=0){return e[t]=this.r,e[t+1]=this.g,e[t+2]=this.b,e}fromBufferAttribute(e,t){return this.r=e.getX(t),this.g=e.getY(t),this.b=e.getZ(t),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}},Ht=new ge;ge.NAMES=Tu;var Zi=class extends lt{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new An,this.environmentIntensity=1,this.environmentRotation=new An,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(e,t){return super.copy(e,t),e.background!==null&&(this.background=e.background.clone()),e.environment!==null&&(this.environment=e.environment.clone()),e.fog!==null&&(this.fog=e.fog.clone()),this.backgroundBlurriness=e.backgroundBlurriness,this.backgroundIntensity=e.backgroundIntensity,this.backgroundRotation.copy(e.backgroundRotation),this.environmentIntensity=e.environmentIntensity,this.environmentRotation.copy(e.environmentRotation),e.overrideMaterial!==null&&(this.overrideMaterial=e.overrideMaterial.clone()),this.matrixAutoUpdate=e.matrixAutoUpdate,this}toJSON(e){let t=super.toJSON(e);return this.fog!==null&&(t.object.fog=this.fog.toJSON()),this.backgroundBlurriness>0&&(t.object.backgroundBlurriness=this.backgroundBlurriness),this.backgroundIntensity!==1&&(t.object.backgroundIntensity=this.backgroundIntensity),t.object.backgroundRotation=this.backgroundRotation.toArray(),this.environmentIntensity!==1&&(t.object.environmentIntensity=this.environmentIntensity),t.object.environmentRotation=this.environmentRotation.toArray(),t}},vn=new L,jn=new L,Oc=new L,$n=new L,vs=new L,Ms=new L,_h=new L,Bc=new L,kc=new L,zc=new L,Vc=new $e,Hc=new $e,Gc=new $e,Mi=class i{constructor(e=new L,t=new L,n=new L){this.a=e,this.b=t,this.c=n}static getNormal(e,t,n,s){s.subVectors(n,t),vn.subVectors(e,t),s.cross(vn);let r=s.lengthSq();return r>0?s.multiplyScalar(1/Math.sqrt(r)):s.set(0,0,0)}static getBarycoord(e,t,n,s,r){vn.subVectors(s,t),jn.subVectors(n,t),Oc.subVectors(e,t);let o=vn.dot(vn),a=vn.dot(jn),c=vn.dot(Oc),l=jn.dot(jn),u=jn.dot(Oc),d=o*l-a*a;if(d===0)return r.set(0,0,0),null;let h=1/d,p=(l*c-a*u)*h,g=(o*u-a*c)*h;return r.set(1-p-g,g,p)}static containsPoint(e,t,n,s){return this.getBarycoord(e,t,n,s,$n)===null?!1:$n.x>=0&&$n.y>=0&&$n.x+$n.y<=1}static getInterpolation(e,t,n,s,r,o,a,c){return this.getBarycoord(e,t,n,s,$n)===null?(c.x=0,c.y=0,"z"in c&&(c.z=0),"w"in c&&(c.w=0),null):(c.setScalar(0),c.addScaledVector(r,$n.x),c.addScaledVector(o,$n.y),c.addScaledVector(a,$n.z),c)}static getInterpolatedAttribute(e,t,n,s,r,o){return Vc.setScalar(0),Hc.setScalar(0),Gc.setScalar(0),Vc.fromBufferAttribute(e,t),Hc.fromBufferAttribute(e,n),Gc.fromBufferAttribute(e,s),o.setScalar(0),o.addScaledVector(Vc,r.x),o.addScaledVector(Hc,r.y),o.addScaledVector(Gc,r.z),o}static isFrontFacing(e,t,n,s){return vn.subVectors(n,t),jn.subVectors(e,t),vn.cross(jn).dot(s)<0}set(e,t,n){return this.a.copy(e),this.b.copy(t),this.c.copy(n),this}setFromPointsAndIndices(e,t,n,s){return this.a.copy(e[t]),this.b.copy(e[n]),this.c.copy(e[s]),this}setFromAttributeAndIndices(e,t,n,s){return this.a.fromBufferAttribute(e,t),this.b.fromBufferAttribute(e,n),this.c.fromBufferAttribute(e,s),this}clone(){return new this.constructor().copy(this)}copy(e){return this.a.copy(e.a),this.b.copy(e.b),this.c.copy(e.c),this}getArea(){return vn.subVectors(this.c,this.b),jn.subVectors(this.a,this.b),vn.cross(jn).length()*.5}getMidpoint(e){return e.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(e){return i.getNormal(this.a,this.b,this.c,e)}getPlane(e){return e.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(e,t){return i.getBarycoord(e,this.a,this.b,this.c,t)}getInterpolation(e,t,n,s,r){return i.getInterpolation(e,this.a,this.b,this.c,t,n,s,r)}containsPoint(e){return i.containsPoint(e,this.a,this.b,this.c)}isFrontFacing(e){return i.isFrontFacing(this.a,this.b,this.c,e)}intersectsBox(e){return e.intersectsTriangle(this)}closestPointToPoint(e,t){let n=this.a,s=this.b,r=this.c,o,a;vs.subVectors(s,n),Ms.subVectors(r,n),Bc.subVectors(e,n);let c=vs.dot(Bc),l=Ms.dot(Bc);if(c<=0&&l<=0)return t.copy(n);kc.subVectors(e,s);let u=vs.dot(kc),d=Ms.dot(kc);if(u>=0&&d<=u)return t.copy(s);let h=c*d-u*l;if(h<=0&&c>=0&&u<=0)return o=c/(c-u),t.copy(n).addScaledVector(vs,o);zc.subVectors(e,r);let p=vs.dot(zc),g=Ms.dot(zc);if(g>=0&&p<=g)return t.copy(r);let v=p*l-c*g;if(v<=0&&l>=0&&g<=0)return a=l/(l-g),t.copy(n).addScaledVector(Ms,a);let m=u*g-p*d;if(m<=0&&d-u>=0&&p-g>=0)return _h.subVectors(r,s),a=(d-u)/(d-u+(p-g)),t.copy(s).addScaledVector(_h,a);let f=1/(m+v+h);return o=v*f,a=h*f,t.copy(n).addScaledVector(vs,o).addScaledVector(Ms,a)}equals(e){return e.a.equals(this.a)&&e.b.equals(this.b)&&e.c.equals(this.c)}},ln=class{constructor(e=new L(1/0,1/0,1/0),t=new L(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=e,this.max=t}set(e,t){return this.min.copy(e),this.max.copy(t),this}setFromArray(e){this.makeEmpty();for(let t=0,n=e.length;t<n;t+=3)this.expandByPoint(Mn.fromArray(e,t));return this}setFromBufferAttribute(e){this.makeEmpty();for(let t=0,n=e.count;t<n;t++)this.expandByPoint(Mn.fromBufferAttribute(e,t));return this}setFromPoints(e){this.makeEmpty();for(let t=0,n=e.length;t<n;t++)this.expandByPoint(e[t]);return this}setFromCenterAndSize(e,t){let n=Mn.copy(t).multiplyScalar(.5);return this.min.copy(e).sub(n),this.max.copy(e).add(n),this}setFromObject(e,t=!1){return this.makeEmpty(),this.expandByObject(e,t)}clone(){return new this.constructor().copy(this)}copy(e){return this.min.copy(e.min),this.max.copy(e.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(e){return this.isEmpty()?e.set(0,0,0):e.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(e){return this.isEmpty()?e.set(0,0,0):e.subVectors(this.max,this.min)}expandByPoint(e){return this.min.min(e),this.max.max(e),this}expandByVector(e){return this.min.sub(e),this.max.add(e),this}expandByScalar(e){return this.min.addScalar(-e),this.max.addScalar(e),this}expandByObject(e,t=!1){e.updateWorldMatrix(!1,!1);let n=e.geometry;if(n!==void 0){let r=n.getAttribute("position");if(t===!0&&r!==void 0&&e.isInstancedMesh!==!0)for(let o=0,a=r.count;o<a;o++)e.isMesh===!0?e.getVertexPosition(o,Mn):Mn.fromBufferAttribute(r,o),Mn.applyMatrix4(e.matrixWorld),this.expandByPoint(Mn);else e.boundingBox!==void 0?(e.boundingBox===null&&e.computeBoundingBox(),po.copy(e.boundingBox)):(n.boundingBox===null&&n.computeBoundingBox(),po.copy(n.boundingBox)),po.applyMatrix4(e.matrixWorld),this.union(po)}let s=e.children;for(let r=0,o=s.length;r<o;r++)this.expandByObject(s[r],t);return this}containsPoint(e){return e.x>=this.min.x&&e.x<=this.max.x&&e.y>=this.min.y&&e.y<=this.max.y&&e.z>=this.min.z&&e.z<=this.max.z}containsBox(e){return this.min.x<=e.min.x&&e.max.x<=this.max.x&&this.min.y<=e.min.y&&e.max.y<=this.max.y&&this.min.z<=e.min.z&&e.max.z<=this.max.z}getParameter(e,t){return t.set((e.x-this.min.x)/(this.max.x-this.min.x),(e.y-this.min.y)/(this.max.y-this.min.y),(e.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(e){return e.max.x>=this.min.x&&e.min.x<=this.max.x&&e.max.y>=this.min.y&&e.min.y<=this.max.y&&e.max.z>=this.min.z&&e.min.z<=this.max.z}intersectsSphere(e){return this.clampPoint(e.center,Mn),Mn.distanceToSquared(e.center)<=e.radius*e.radius}intersectsPlane(e){let t,n;return e.normal.x>0?(t=e.normal.x*this.min.x,n=e.normal.x*this.max.x):(t=e.normal.x*this.max.x,n=e.normal.x*this.min.x),e.normal.y>0?(t+=e.normal.y*this.min.y,n+=e.normal.y*this.max.y):(t+=e.normal.y*this.max.y,n+=e.normal.y*this.min.y),e.normal.z>0?(t+=e.normal.z*this.min.z,n+=e.normal.z*this.max.z):(t+=e.normal.z*this.max.z,n+=e.normal.z*this.min.z),t<=-e.constant&&n>=-e.constant}intersectsTriangle(e){if(this.isEmpty())return!1;this.getCenter(or),mo.subVectors(this.max,or),bs.subVectors(e.a,or),Ss.subVectors(e.b,or),Ts.subVectors(e.c,or),_i.subVectors(Ss,bs),xi.subVectors(Ts,Ss),Bi.subVectors(bs,Ts);let t=[0,-_i.z,_i.y,0,-xi.z,xi.y,0,-Bi.z,Bi.y,_i.z,0,-_i.x,xi.z,0,-xi.x,Bi.z,0,-Bi.x,-_i.y,_i.x,0,-xi.y,xi.x,0,-Bi.y,Bi.x,0];return!Wc(t,bs,Ss,Ts,mo)||(t=[1,0,0,0,1,0,0,0,1],!Wc(t,bs,Ss,Ts,mo))?!1:(go.crossVectors(_i,xi),t=[go.x,go.y,go.z],Wc(t,bs,Ss,Ts,mo))}clampPoint(e,t){return t.copy(e).clamp(this.min,this.max)}distanceToPoint(e){return this.clampPoint(e,Mn).distanceTo(e)}getBoundingSphere(e){return this.isEmpty()?e.makeEmpty():(this.getCenter(e.center),e.radius=this.getSize(Mn).length()*.5),e}intersect(e){return this.min.max(e.min),this.max.min(e.max),this.isEmpty()&&this.makeEmpty(),this}union(e){return this.min.min(e.min),this.max.max(e.max),this}applyMatrix4(e){return this.isEmpty()?this:(Jn[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(e),Jn[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(e),Jn[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(e),Jn[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(e),Jn[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(e),Jn[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(e),Jn[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(e),Jn[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(e),this.setFromPoints(Jn),this)}translate(e){return this.min.add(e),this.max.add(e),this}equals(e){return e.min.equals(this.min)&&e.max.equals(this.max)}toJSON(){return{min:this.min.toArray(),max:this.max.toArray()}}fromJSON(e){return this.min.fromArray(e.min),this.max.fromArray(e.max),this}},Jn=[new L,new L,new L,new L,new L,new L,new L,new L],Mn=new L,po=new ln,bs=new L,Ss=new L,Ts=new L,_i=new L,xi=new L,Bi=new L,or=new L,mo=new L,go=new L,ki=new L;function Wc(i,e,t,n,s){for(let r=0,o=i.length-3;r<=o;r+=3){ki.fromArray(i,r);let a=s.x*Math.abs(ki.x)+s.y*Math.abs(ki.y)+s.z*Math.abs(ki.z),c=e.dot(ki),l=t.dot(ki),u=n.dot(ki);if(Math.max(-Math.max(c,l,u),Math.min(c,l,u))>a)return!1}return!0}var wt=new L,_o=new be,bf=0,mt=class extends wn{constructor(e,t,n=!1){if(super(),Array.isArray(e))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,Object.defineProperty(this,"id",{value:bf++}),this.name="",this.array=e,this.itemSize=t,this.count=e!==void 0?e.length/t:0,this.normalized=n,this.usage=Yo,this.updateRanges=[],this.gpuType=un,this.version=0}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}setUsage(e){return this.usage=e,this}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.name=e.name,this.array=new e.array.constructor(e.array),this.itemSize=e.itemSize,this.count=e.count,this.normalized=e.normalized,this.usage=e.usage,this.gpuType=e.gpuType,this}copyAt(e,t,n){e*=this.itemSize,n*=t.itemSize;for(let s=0,r=this.itemSize;s<r;s++)this.array[e+s]=t.array[n+s];return this}copyArray(e){return this.array.set(e),this}applyMatrix3(e){if(this.itemSize===2)for(let t=0,n=this.count;t<n;t++)_o.fromBufferAttribute(this,t),_o.applyMatrix3(e),this.setXY(t,_o.x,_o.y);else if(this.itemSize===3)for(let t=0,n=this.count;t<n;t++)wt.fromBufferAttribute(this,t),wt.applyMatrix3(e),this.setXYZ(t,wt.x,wt.y,wt.z);return this}applyMatrix4(e){for(let t=0,n=this.count;t<n;t++)wt.fromBufferAttribute(this,t),wt.applyMatrix4(e),this.setXYZ(t,wt.x,wt.y,wt.z);return this}applyNormalMatrix(e){for(let t=0,n=this.count;t<n;t++)wt.fromBufferAttribute(this,t),wt.applyNormalMatrix(e),this.setXYZ(t,wt.x,wt.y,wt.z);return this}transformDirection(e){for(let t=0,n=this.count;t<n;t++)wt.fromBufferAttribute(this,t),wt.transformDirection(e),this.setXYZ(t,wt.x,wt.y,wt.z);return this}set(e,t=0){return this.array.set(e,t),this}getComponent(e,t){let n=this.array[e*this.itemSize+t];return this.normalized&&(n=bn(n,this.array)),n}setComponent(e,t,n){return this.normalized&&(n=je(n,this.array)),this.array[e*this.itemSize+t]=n,this}getX(e){let t=this.array[e*this.itemSize];return this.normalized&&(t=bn(t,this.array)),t}setX(e,t){return this.normalized&&(t=je(t,this.array)),this.array[e*this.itemSize]=t,this}getY(e){let t=this.array[e*this.itemSize+1];return this.normalized&&(t=bn(t,this.array)),t}setY(e,t){return this.normalized&&(t=je(t,this.array)),this.array[e*this.itemSize+1]=t,this}getZ(e){let t=this.array[e*this.itemSize+2];return this.normalized&&(t=bn(t,this.array)),t}setZ(e,t){return this.normalized&&(t=je(t,this.array)),this.array[e*this.itemSize+2]=t,this}getW(e){let t=this.array[e*this.itemSize+3];return this.normalized&&(t=bn(t,this.array)),t}setW(e,t){return this.normalized&&(t=je(t,this.array)),this.array[e*this.itemSize+3]=t,this}setXY(e,t,n){return e*=this.itemSize,this.normalized&&(t=je(t,this.array),n=je(n,this.array)),this.array[e+0]=t,this.array[e+1]=n,this}setXYZ(e,t,n,s){return e*=this.itemSize,this.normalized&&(t=je(t,this.array),n=je(n,this.array),s=je(s,this.array)),this.array[e+0]=t,this.array[e+1]=n,this.array[e+2]=s,this}setXYZW(e,t,n,s,r){return e*=this.itemSize,this.normalized&&(t=je(t,this.array),n=je(n,this.array),s=je(s,this.array),r=je(r,this.array)),this.array[e+0]=t,this.array[e+1]=n,this.array[e+2]=s,this.array[e+3]=r,this}onUpload(e){return this.onUploadCallback=e,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){let e={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return this.name!==""&&(e.name=this.name),this.usage!==Yo&&(e.usage=this.usage),e}dispose(){this.dispatchEvent({type:"dispose"})}};var yr=class extends mt{constructor(e,t,n){super(new Uint16Array(e),t,n)}};var vr=class extends mt{constructor(e,t,n){super(new Uint32Array(e),t,n)}};var Et=class extends mt{constructor(e,t,n){super(new Float32Array(e),t,n)}},Sf=new ln,ar=new L,Xc=new L,$t=class{constructor(e=new L,t=-1){this.isSphere=!0,this.center=e,this.radius=t}set(e,t){return this.center.copy(e),this.radius=t,this}setFromPoints(e,t){let n=this.center;t!==void 0?n.copy(t):Sf.setFromPoints(e).getCenter(n);let s=0;for(let r=0,o=e.length;r<o;r++)s=Math.max(s,n.distanceToSquared(e[r]));return this.radius=Math.sqrt(s),this}copy(e){return this.center.copy(e.center),this.radius=e.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(e){return e.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(e){return e.distanceTo(this.center)-this.radius}intersectsSphere(e){let t=this.radius+e.radius;return e.center.distanceToSquared(this.center)<=t*t}intersectsBox(e){return e.intersectsSphere(this)}intersectsPlane(e){return Math.abs(e.distanceToPoint(this.center))<=this.radius}clampPoint(e,t){let n=this.center.distanceToSquared(e);return t.copy(e),n>this.radius*this.radius&&(t.sub(this.center).normalize(),t.multiplyScalar(this.radius).add(this.center)),t}getBoundingBox(e){return this.isEmpty()?(e.makeEmpty(),e):(e.set(this.center,this.center),e.expandByScalar(this.radius),e)}applyMatrix4(e){return this.center.applyMatrix4(e),this.radius=this.radius*e.getMaxScaleOnAxis(),this}translate(e){return this.center.add(e),this}expandByPoint(e){if(this.isEmpty())return this.center.copy(e),this.radius=0,this;ar.subVectors(e,this.center);let t=ar.lengthSq();if(t>this.radius*this.radius){let n=Math.sqrt(t),s=(n-this.radius)*.5;this.center.addScaledVector(ar,s/n),this.radius+=s}return this}union(e){return e.isEmpty()?this:this.isEmpty()?(this.copy(e),this):(this.center.equals(e.center)===!0?this.radius=Math.max(this.radius,e.radius):(Xc.subVectors(e.center,this.center).setLength(e.radius),this.expandByPoint(ar.copy(e.center).add(Xc)),this.expandByPoint(ar.copy(e.center).sub(Xc))),this)}equals(e){return e.center.equals(this.center)&&e.radius===this.radius}clone(){return new this.constructor().copy(this)}toJSON(){return{radius:this.radius,center:this.center.toArray()}}fromJSON(e){return this.radius=e.radius,this.center.fromArray(e.center),this}},Tf=0,pn=new Ue,qc=new lt,ws=new L,on=new ln,cr=new ln,Ft=new L,Rt=class i extends wn{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:Tf++}),this.uuid=Tn(),this.name="",this.type="BufferGeometry",this.index=null,this.indirect=null,this.indirectOffset=0,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={}}getIndex(){return this.index}setIndex(e){return Array.isArray(e)?this.index=new(Yd(e)?vr:yr)(e,1):this.index=e,this}setIndirect(e,t=0){return this.indirect=e,this.indirectOffset=t,this}getIndirect(){return this.indirect}getAttribute(e){return this.attributes[e]}setAttribute(e,t){return this.attributes[e]=t,this}deleteAttribute(e){return delete this.attributes[e],this}hasAttribute(e){return this.attributes[e]!==void 0}addGroup(e,t,n=0){this.groups.push({start:e,count:t,materialIndex:n})}clearGroups(){this.groups=[]}setDrawRange(e,t){this.drawRange.start=e,this.drawRange.count=t}applyMatrix4(e){let t=this.attributes.position;t!==void 0&&(t.applyMatrix4(e),t.needsUpdate=!0);let n=this.attributes.normal;if(n!==void 0){let r=new Ie().getNormalMatrix(e);n.applyNormalMatrix(r),n.needsUpdate=!0}let s=this.attributes.tangent;return s!==void 0&&(s.transformDirection(e),s.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this}applyQuaternion(e){return pn.makeRotationFromQuaternion(e),this.applyMatrix4(pn),this}rotateX(e){return pn.makeRotationX(e),this.applyMatrix4(pn),this}rotateY(e){return pn.makeRotationY(e),this.applyMatrix4(pn),this}rotateZ(e){return pn.makeRotationZ(e),this.applyMatrix4(pn),this}translate(e,t,n){return pn.makeTranslation(e,t,n),this.applyMatrix4(pn),this}scale(e,t,n){return pn.makeScale(e,t,n),this.applyMatrix4(pn),this}lookAt(e){return qc.lookAt(e),qc.updateMatrix(),this.applyMatrix4(qc.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(ws).negate(),this.translate(ws.x,ws.y,ws.z),this}setFromPoints(e){let t=this.getAttribute("position");if(t===void 0){let n=[];for(let s=0,r=e.length;s<r;s++){let o=e[s];n.push(o.x,o.y,o.z||0)}this.setAttribute("position",new Et(n,3))}else{let n=Math.min(e.length,t.count);for(let s=0;s<n;s++){let r=e[s];t.setXYZ(s,r.x,r.y,r.z||0)}e.length>t.count&&ve("BufferGeometry: Buffer size too small for points data. Use .dispose() and create a new geometry."),t.needsUpdate=!0}return this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new ln);let e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){Ee("BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.",this),this.boundingBox.set(new L(-1/0,-1/0,-1/0),new L(1/0,1/0,1/0));return}if(e!==void 0){if(this.boundingBox.setFromBufferAttribute(e),t)for(let n=0,s=t.length;n<s;n++){let r=t[n];on.setFromBufferAttribute(r),this.morphTargetsRelative?(Ft.addVectors(this.boundingBox.min,on.min),this.boundingBox.expandByPoint(Ft),Ft.addVectors(this.boundingBox.max,on.max),this.boundingBox.expandByPoint(Ft)):(this.boundingBox.expandByPoint(on.min),this.boundingBox.expandByPoint(on.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&Ee('BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new $t);let e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){Ee("BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.",this),this.boundingSphere.set(new L,1/0);return}if(e){let n=this.boundingSphere.center;if(on.setFromBufferAttribute(e),t)for(let r=0,o=t.length;r<o;r++){let a=t[r];cr.setFromBufferAttribute(a),this.morphTargetsRelative?(Ft.addVectors(on.min,cr.min),on.expandByPoint(Ft),Ft.addVectors(on.max,cr.max),on.expandByPoint(Ft)):(on.expandByPoint(cr.min),on.expandByPoint(cr.max))}on.getCenter(n);let s=0;for(let r=0,o=e.count;r<o;r++)Ft.fromBufferAttribute(e,r),s=Math.max(s,n.distanceToSquared(Ft));if(t)for(let r=0,o=t.length;r<o;r++){let a=t[r],c=this.morphTargetsRelative;for(let l=0,u=a.count;l<u;l++)Ft.fromBufferAttribute(a,l),c&&(ws.fromBufferAttribute(e,l),Ft.add(ws)),s=Math.max(s,n.distanceToSquared(Ft))}this.boundingSphere.radius=Math.sqrt(s),isNaN(this.boundingSphere.radius)&&Ee('BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){let e=this.index,t=this.attributes;if(e===null||t.position===void 0||t.normal===void 0||t.uv===void 0){Ee("BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}let n=t.position,s=t.normal,r=t.uv;this.hasAttribute("tangent")===!1&&this.setAttribute("tangent",new mt(new Float32Array(4*n.count),4));let o=this.getAttribute("tangent"),a=[],c=[];for(let y=0;y<n.count;y++)a[y]=new L,c[y]=new L;let l=new L,u=new L,d=new L,h=new be,p=new be,g=new be,v=new L,m=new L;function f(y,A,I){l.fromBufferAttribute(n,y),u.fromBufferAttribute(n,A),d.fromBufferAttribute(n,I),h.fromBufferAttribute(r,y),p.fromBufferAttribute(r,A),g.fromBufferAttribute(r,I),u.sub(l),d.sub(l),p.sub(h),g.sub(h);let R=1/(p.x*g.y-g.x*p.y);isFinite(R)&&(v.copy(u).multiplyScalar(g.y).addScaledVector(d,-p.y).multiplyScalar(R),m.copy(d).multiplyScalar(p.x).addScaledVector(u,-g.x).multiplyScalar(R),a[y].add(v),a[A].add(v),a[I].add(v),c[y].add(m),c[A].add(m),c[I].add(m))}let _=this.groups;_.length===0&&(_=[{start:0,count:e.count}]);for(let y=0,A=_.length;y<A;++y){let I=_[y],R=I.start,O=I.count;for(let G=R,X=R+O;G<X;G+=3)f(e.getX(G+0),e.getX(G+1),e.getX(G+2))}let b=new L,S=new L,E=new L,w=new L;function C(y){E.fromBufferAttribute(s,y),w.copy(E);let A=a[y];b.copy(A),b.sub(E.multiplyScalar(E.dot(A))).normalize(),S.crossVectors(w,A);let R=S.dot(c[y])<0?-1:1;o.setXYZW(y,b.x,b.y,b.z,R)}for(let y=0,A=_.length;y<A;++y){let I=_[y],R=I.start,O=I.count;for(let G=R,X=R+O;G<X;G+=3)C(e.getX(G+0)),C(e.getX(G+1)),C(e.getX(G+2))}}computeVertexNormals(){let e=this.index,t=this.getAttribute("position");if(t!==void 0){let n=this.getAttribute("normal");if(n===void 0)n=new mt(new Float32Array(t.count*3),3),this.setAttribute("normal",n);else for(let h=0,p=n.count;h<p;h++)n.setXYZ(h,0,0,0);let s=new L,r=new L,o=new L,a=new L,c=new L,l=new L,u=new L,d=new L;if(e)for(let h=0,p=e.count;h<p;h+=3){let g=e.getX(h+0),v=e.getX(h+1),m=e.getX(h+2);s.fromBufferAttribute(t,g),r.fromBufferAttribute(t,v),o.fromBufferAttribute(t,m),u.subVectors(o,r),d.subVectors(s,r),u.cross(d),a.fromBufferAttribute(n,g),c.fromBufferAttribute(n,v),l.fromBufferAttribute(n,m),a.add(u),c.add(u),l.add(u),n.setXYZ(g,a.x,a.y,a.z),n.setXYZ(v,c.x,c.y,c.z),n.setXYZ(m,l.x,l.y,l.z)}else for(let h=0,p=t.count;h<p;h+=3)s.fromBufferAttribute(t,h+0),r.fromBufferAttribute(t,h+1),o.fromBufferAttribute(t,h+2),u.subVectors(o,r),d.subVectors(s,r),u.cross(d),n.setXYZ(h+0,u.x,u.y,u.z),n.setXYZ(h+1,u.x,u.y,u.z),n.setXYZ(h+2,u.x,u.y,u.z);this.normalizeNormals(),n.needsUpdate=!0}}normalizeNormals(){let e=this.attributes.normal;for(let t=0,n=e.count;t<n;t++)Ft.fromBufferAttribute(e,t),Ft.normalize(),e.setXYZ(t,Ft.x,Ft.y,Ft.z)}toNonIndexed(){function e(a,c){let l=a.array,u=a.itemSize,d=a.normalized,h=new l.constructor(c.length*u),p=0,g=0;for(let v=0,m=c.length;v<m;v++){a.isInterleavedBufferAttribute?p=c[v]*a.data.stride+a.offset:p=c[v]*u;for(let f=0;f<u;f++)h[g++]=l[p++]}return new mt(h,u,d)}if(this.index===null)return ve("BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;let t=new i,n=this.index.array,s=this.attributes;for(let a in s){let c=s[a],l=e(c,n);t.setAttribute(a,l)}let r=this.morphAttributes;for(let a in r){let c=[],l=r[a];for(let u=0,d=l.length;u<d;u++){let h=l[u],p=e(h,n);c.push(p)}t.morphAttributes[a]=c}t.morphTargetsRelative=this.morphTargetsRelative;let o=this.groups;for(let a=0,c=o.length;a<c;a++){let l=o[a];t.addGroup(l.start,l.count,l.materialIndex)}return t}toJSON(){let e={metadata:{version:4.7,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(e.uuid=this.uuid,e.type=this.type,this.name!==""&&(e.name=this.name),Object.keys(this.userData).length>0&&(e.userData=this.userData),this.parameters!==void 0){let c=this.parameters;for(let l in c)c[l]!==void 0&&(e[l]=c[l]);return e}e.data={attributes:{}};let t=this.index;t!==null&&(e.data.index={type:t.array.constructor.name,array:Array.prototype.slice.call(t.array)});let n=this.attributes;for(let c in n){let l=n[c];e.data.attributes[c]=l.toJSON(e.data)}let s={},r=!1;for(let c in this.morphAttributes){let l=this.morphAttributes[c],u=[];for(let d=0,h=l.length;d<h;d++){let p=l[d];u.push(p.toJSON(e.data))}u.length>0&&(s[c]=u,r=!0)}r&&(e.data.morphAttributes=s,e.data.morphTargetsRelative=this.morphTargetsRelative);let o=this.groups;o.length>0&&(e.data.groups=JSON.parse(JSON.stringify(o)));let a=this.boundingSphere;return a!==null&&(e.data.boundingSphere=a.toJSON()),e}clone(){return new this.constructor().copy(this)}copy(e){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;let t={};this.name=e.name;let n=e.index;n!==null&&this.setIndex(n.clone());let s=e.attributes;for(let l in s){let u=s[l];this.setAttribute(l,u.clone(t))}let r=e.morphAttributes;for(let l in r){let u=[],d=r[l];for(let h=0,p=d.length;h<p;h++)u.push(d[h].clone(t));this.morphAttributes[l]=u}this.morphTargetsRelative=e.morphTargetsRelative;let o=e.groups;for(let l=0,u=o.length;l<u;l++){let d=o[l];this.addGroup(d.start,d.count,d.materialIndex)}let a=e.boundingBox;a!==null&&(this.boundingBox=a.clone());let c=e.boundingSphere;return c!==null&&(this.boundingSphere=c.clone()),this.drawRange.start=e.drawRange.start,this.drawRange.count=e.drawRange.count,this.userData=e.userData,this}dispose(){this.dispatchEvent({type:"dispose"})}},Os=class{constructor(e,t){this.isInterleavedBuffer=!0,this.array=e,this.stride=t,this.count=e!==void 0?e.length/t:0,this.usage=Yo,this.updateRanges=[],this.version=0,this.uuid=Tn()}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}setUsage(e){return this.usage=e,this}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.array=new e.array.constructor(e.array),this.count=e.count,this.stride=e.stride,this.usage=e.usage,this}copyAt(e,t,n){e*=this.stride,n*=t.stride;for(let s=0,r=this.stride;s<r;s++)this.array[e+s]=t.array[n+s];return this}set(e,t=0){return this.array.set(e,t),this}clone(e){e.arrayBuffers===void 0&&(e.arrayBuffers={}),this.array.buffer._uuid===void 0&&(this.array.buffer._uuid=Tn()),e.arrayBuffers[this.array.buffer._uuid]===void 0&&(e.arrayBuffers[this.array.buffer._uuid]=this.array.slice(0).buffer);let t=new this.array.constructor(e.arrayBuffers[this.array.buffer._uuid]),n=new this.constructor(t,this.stride);return n.setUsage(this.usage),n}onUpload(e){return this.onUploadCallback=e,this}toJSON(e){return e.arrayBuffers===void 0&&(e.arrayBuffers={}),this.array.buffer._uuid===void 0&&(this.array.buffer._uuid=Tn()),e.arrayBuffers[this.array.buffer._uuid]===void 0&&(e.arrayBuffers[this.array.buffer._uuid]=Array.from(new Uint32Array(this.array.buffer))),{uuid:this.uuid,buffer:this.array.buffer._uuid,type:this.array.constructor.name,stride:this.stride}}},Yt=new L,Bs=class i{constructor(e,t,n,s=!1){this.isInterleavedBufferAttribute=!0,this.name="",this.data=e,this.itemSize=t,this.offset=n,this.normalized=s}get count(){return this.data.count}get array(){return this.data.array}set needsUpdate(e){this.data.needsUpdate=e}applyMatrix4(e){for(let t=0,n=this.data.count;t<n;t++)Yt.fromBufferAttribute(this,t),Yt.applyMatrix4(e),this.setXYZ(t,Yt.x,Yt.y,Yt.z);return this}applyNormalMatrix(e){for(let t=0,n=this.count;t<n;t++)Yt.fromBufferAttribute(this,t),Yt.applyNormalMatrix(e),this.setXYZ(t,Yt.x,Yt.y,Yt.z);return this}transformDirection(e){for(let t=0,n=this.count;t<n;t++)Yt.fromBufferAttribute(this,t),Yt.transformDirection(e),this.setXYZ(t,Yt.x,Yt.y,Yt.z);return this}getComponent(e,t){let n=this.array[e*this.data.stride+this.offset+t];return this.normalized&&(n=bn(n,this.array)),n}setComponent(e,t,n){return this.normalized&&(n=je(n,this.array)),this.data.array[e*this.data.stride+this.offset+t]=n,this}setX(e,t){return this.normalized&&(t=je(t,this.array)),this.data.array[e*this.data.stride+this.offset]=t,this}setY(e,t){return this.normalized&&(t=je(t,this.array)),this.data.array[e*this.data.stride+this.offset+1]=t,this}setZ(e,t){return this.normalized&&(t=je(t,this.array)),this.data.array[e*this.data.stride+this.offset+2]=t,this}setW(e,t){return this.normalized&&(t=je(t,this.array)),this.data.array[e*this.data.stride+this.offset+3]=t,this}getX(e){let t=this.data.array[e*this.data.stride+this.offset];return this.normalized&&(t=bn(t,this.array)),t}getY(e){let t=this.data.array[e*this.data.stride+this.offset+1];return this.normalized&&(t=bn(t,this.array)),t}getZ(e){let t=this.data.array[e*this.data.stride+this.offset+2];return this.normalized&&(t=bn(t,this.array)),t}getW(e){let t=this.data.array[e*this.data.stride+this.offset+3];return this.normalized&&(t=bn(t,this.array)),t}setXY(e,t,n){return e=e*this.data.stride+this.offset,this.normalized&&(t=je(t,this.array),n=je(n,this.array)),this.data.array[e+0]=t,this.data.array[e+1]=n,this}setXYZ(e,t,n,s){return e=e*this.data.stride+this.offset,this.normalized&&(t=je(t,this.array),n=je(n,this.array),s=je(s,this.array)),this.data.array[e+0]=t,this.data.array[e+1]=n,this.data.array[e+2]=s,this}setXYZW(e,t,n,s,r){return e=e*this.data.stride+this.offset,this.normalized&&(t=je(t,this.array),n=je(n,this.array),s=je(s,this.array),r=je(r,this.array)),this.data.array[e+0]=t,this.data.array[e+1]=n,this.data.array[e+2]=s,this.data.array[e+3]=r,this}clone(e){if(e===void 0){gr("InterleavedBufferAttribute.clone(): Cloning an interleaved buffer attribute will de-interleave buffer data.");let t=[];for(let n=0;n<this.count;n++){let s=n*this.data.stride+this.offset;for(let r=0;r<this.itemSize;r++)t.push(this.data.array[s+r])}return new mt(new this.array.constructor(t),this.itemSize,this.normalized)}else return e.interleavedBuffers===void 0&&(e.interleavedBuffers={}),e.interleavedBuffers[this.data.uuid]===void 0&&(e.interleavedBuffers[this.data.uuid]=this.data.clone(e)),new i(e.interleavedBuffers[this.data.uuid],this.itemSize,this.offset,this.normalized)}toJSON(e){if(e===void 0){gr("InterleavedBufferAttribute.toJSON(): Serializing an interleaved buffer attribute will de-interleave buffer data.");let t=[];for(let n=0;n<this.count;n++){let s=n*this.data.stride+this.offset;for(let r=0;r<this.itemSize;r++)t.push(this.data.array[s+r])}return{itemSize:this.itemSize,type:this.array.constructor.name,array:t,normalized:this.normalized}}else return e.interleavedBuffers===void 0&&(e.interleavedBuffers={}),e.interleavedBuffers[this.data.uuid]===void 0&&(e.interleavedBuffers[this.data.uuid]=this.data.toJSON(e)),{isInterleavedBufferAttribute:!0,itemSize:this.itemSize,data:this.data.uuid,offset:this.offset,normalized:this.normalized}}},wf=0,yt=class extends wn{constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:wf++}),this.uuid=Tn(),this.name="",this.type="Material",this.blending=Gi,this.side=an,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=Bo,this.blendDst=ko,this.blendEquation=bi,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new ge(0,0,0),this.blendAlpha=0,this.depthFunc=Wi,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=cl,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=Hi,this.stencilZFail=Hi,this.stencilZPass=Hi,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.allowOverride=!0,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(e){this._alphaTest>0!=e>0&&this.version++,this._alphaTest=e}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(e){if(e!==void 0)for(let t in e){let n=e[t];if(n===void 0){ve(`Material: parameter '${t}' has value of undefined.`);continue}let s=this[t];if(s===void 0){ve(`Material: '${t}' is not a property of THREE.${this.type}.`);continue}s&&s.isColor?s.set(n):s&&s.isVector3&&n&&n.isVector3?s.copy(n):this[t]=n}}toJSON(e){let t=e===void 0||typeof e=="string";t&&(e={textures:{},images:{}});let n={metadata:{version:4.7,type:"Material",generator:"Material.toJSON"}};n.uuid=this.uuid,n.type=this.type,this.name!==""&&(n.name=this.name),this.color&&this.color.isColor&&(n.color=this.color.getHex()),this.roughness!==void 0&&(n.roughness=this.roughness),this.metalness!==void 0&&(n.metalness=this.metalness),this.sheen!==void 0&&(n.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(n.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(n.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(n.emissive=this.emissive.getHex()),this.emissiveIntensity!==void 0&&this.emissiveIntensity!==1&&(n.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(n.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(n.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(n.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(n.shininess=this.shininess),this.clearcoat!==void 0&&(n.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(n.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(n.clearcoatMap=this.clearcoatMap.toJSON(e).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(n.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(e).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(n.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(e).uuid,n.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.sheenColorMap&&this.sheenColorMap.isTexture&&(n.sheenColorMap=this.sheenColorMap.toJSON(e).uuid),this.sheenRoughnessMap&&this.sheenRoughnessMap.isTexture&&(n.sheenRoughnessMap=this.sheenRoughnessMap.toJSON(e).uuid),this.dispersion!==void 0&&(n.dispersion=this.dispersion),this.iridescence!==void 0&&(n.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(n.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(n.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(n.iridescenceMap=this.iridescenceMap.toJSON(e).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(n.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(e).uuid),this.anisotropy!==void 0&&(n.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(n.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(n.anisotropyMap=this.anisotropyMap.toJSON(e).uuid),this.map&&this.map.isTexture&&(n.map=this.map.toJSON(e).uuid),this.matcap&&this.matcap.isTexture&&(n.matcap=this.matcap.toJSON(e).uuid),this.alphaMap&&this.alphaMap.isTexture&&(n.alphaMap=this.alphaMap.toJSON(e).uuid),this.lightMap&&this.lightMap.isTexture&&(n.lightMap=this.lightMap.toJSON(e).uuid,n.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(n.aoMap=this.aoMap.toJSON(e).uuid,n.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(n.bumpMap=this.bumpMap.toJSON(e).uuid,n.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(n.normalMap=this.normalMap.toJSON(e).uuid,n.normalMapType=this.normalMapType,n.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(n.displacementMap=this.displacementMap.toJSON(e).uuid,n.displacementScale=this.displacementScale,n.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(n.roughnessMap=this.roughnessMap.toJSON(e).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(n.metalnessMap=this.metalnessMap.toJSON(e).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(n.emissiveMap=this.emissiveMap.toJSON(e).uuid),this.specularMap&&this.specularMap.isTexture&&(n.specularMap=this.specularMap.toJSON(e).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(n.specularIntensityMap=this.specularIntensityMap.toJSON(e).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(n.specularColorMap=this.specularColorMap.toJSON(e).uuid),this.envMap&&this.envMap.isTexture&&(n.envMap=this.envMap.toJSON(e).uuid,this.combine!==void 0&&(n.combine=this.combine)),this.envMapRotation!==void 0&&(n.envMapRotation=this.envMapRotation.toArray()),this.envMapIntensity!==void 0&&(n.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(n.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(n.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(n.gradientMap=this.gradientMap.toJSON(e).uuid),this.transmission!==void 0&&(n.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(n.transmissionMap=this.transmissionMap.toJSON(e).uuid),this.thickness!==void 0&&(n.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(n.thicknessMap=this.thicknessMap.toJSON(e).uuid),this.attenuationDistance!==void 0&&this.attenuationDistance!==1/0&&(n.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(n.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(n.size=this.size),this.shadowSide!==null&&(n.shadowSide=this.shadowSide),this.sizeAttenuation!==void 0&&(n.sizeAttenuation=this.sizeAttenuation),this.blending!==Gi&&(n.blending=this.blending),this.side!==an&&(n.side=this.side),this.vertexColors===!0&&(n.vertexColors=!0),this.opacity<1&&(n.opacity=this.opacity),this.transparent===!0&&(n.transparent=!0),this.blendSrc!==Bo&&(n.blendSrc=this.blendSrc),this.blendDst!==ko&&(n.blendDst=this.blendDst),this.blendEquation!==bi&&(n.blendEquation=this.blendEquation),this.blendSrcAlpha!==null&&(n.blendSrcAlpha=this.blendSrcAlpha),this.blendDstAlpha!==null&&(n.blendDstAlpha=this.blendDstAlpha),this.blendEquationAlpha!==null&&(n.blendEquationAlpha=this.blendEquationAlpha),this.blendColor&&this.blendColor.isColor&&(n.blendColor=this.blendColor.getHex()),this.blendAlpha!==0&&(n.blendAlpha=this.blendAlpha),this.depthFunc!==Wi&&(n.depthFunc=this.depthFunc),this.depthTest===!1&&(n.depthTest=this.depthTest),this.depthWrite===!1&&(n.depthWrite=this.depthWrite),this.colorWrite===!1&&(n.colorWrite=this.colorWrite),this.stencilWriteMask!==255&&(n.stencilWriteMask=this.stencilWriteMask),this.stencilFunc!==cl&&(n.stencilFunc=this.stencilFunc),this.stencilRef!==0&&(n.stencilRef=this.stencilRef),this.stencilFuncMask!==255&&(n.stencilFuncMask=this.stencilFuncMask),this.stencilFail!==Hi&&(n.stencilFail=this.stencilFail),this.stencilZFail!==Hi&&(n.stencilZFail=this.stencilZFail),this.stencilZPass!==Hi&&(n.stencilZPass=this.stencilZPass),this.stencilWrite===!0&&(n.stencilWrite=this.stencilWrite),this.rotation!==void 0&&this.rotation!==0&&(n.rotation=this.rotation),this.polygonOffset===!0&&(n.polygonOffset=!0),this.polygonOffsetFactor!==0&&(n.polygonOffsetFactor=this.polygonOffsetFactor),this.polygonOffsetUnits!==0&&(n.polygonOffsetUnits=this.polygonOffsetUnits),this.linewidth!==void 0&&this.linewidth!==1&&(n.linewidth=this.linewidth),this.dashSize!==void 0&&(n.dashSize=this.dashSize),this.gapSize!==void 0&&(n.gapSize=this.gapSize),this.scale!==void 0&&(n.scale=this.scale),this.dithering===!0&&(n.dithering=!0),this.alphaTest>0&&(n.alphaTest=this.alphaTest),this.alphaHash===!0&&(n.alphaHash=!0),this.alphaToCoverage===!0&&(n.alphaToCoverage=!0),this.premultipliedAlpha===!0&&(n.premultipliedAlpha=!0),this.forceSinglePass===!0&&(n.forceSinglePass=!0),this.allowOverride===!1&&(n.allowOverride=!1),this.wireframe===!0&&(n.wireframe=!0),this.wireframeLinewidth>1&&(n.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!=="round"&&(n.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!=="round"&&(n.wireframeLinejoin=this.wireframeLinejoin),this.flatShading===!0&&(n.flatShading=!0),this.visible===!1&&(n.visible=!1),this.toneMapped===!1&&(n.toneMapped=!1),this.fog===!1&&(n.fog=!1),Object.keys(this.userData).length>0&&(n.userData=this.userData);function s(r){let o=[];for(let a in r){let c=r[a];delete c.metadata,o.push(c)}return o}if(t){let r=s(e.textures),o=s(e.images);r.length>0&&(n.textures=r),o.length>0&&(n.images=o)}return n}clone(){return new this.constructor().copy(this)}copy(e){this.name=e.name,this.blending=e.blending,this.side=e.side,this.vertexColors=e.vertexColors,this.opacity=e.opacity,this.transparent=e.transparent,this.blendSrc=e.blendSrc,this.blendDst=e.blendDst,this.blendEquation=e.blendEquation,this.blendSrcAlpha=e.blendSrcAlpha,this.blendDstAlpha=e.blendDstAlpha,this.blendEquationAlpha=e.blendEquationAlpha,this.blendColor.copy(e.blendColor),this.blendAlpha=e.blendAlpha,this.depthFunc=e.depthFunc,this.depthTest=e.depthTest,this.depthWrite=e.depthWrite,this.stencilWriteMask=e.stencilWriteMask,this.stencilFunc=e.stencilFunc,this.stencilRef=e.stencilRef,this.stencilFuncMask=e.stencilFuncMask,this.stencilFail=e.stencilFail,this.stencilZFail=e.stencilZFail,this.stencilZPass=e.stencilZPass,this.stencilWrite=e.stencilWrite;let t=e.clippingPlanes,n=null;if(t!==null){let s=t.length;n=new Array(s);for(let r=0;r!==s;++r)n[r]=t[r].clone()}return this.clippingPlanes=n,this.clipIntersection=e.clipIntersection,this.clipShadows=e.clipShadows,this.shadowSide=e.shadowSide,this.colorWrite=e.colorWrite,this.precision=e.precision,this.polygonOffset=e.polygonOffset,this.polygonOffsetFactor=e.polygonOffsetFactor,this.polygonOffsetUnits=e.polygonOffsetUnits,this.dithering=e.dithering,this.alphaTest=e.alphaTest,this.alphaHash=e.alphaHash,this.alphaToCoverage=e.alphaToCoverage,this.premultipliedAlpha=e.premultipliedAlpha,this.forceSinglePass=e.forceSinglePass,this.allowOverride=e.allowOverride,this.visible=e.visible,this.toneMapped=e.toneMapped,this.userData=JSON.parse(JSON.stringify(e.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(e){e===!0&&this.version++}},Jo=class extends yt{constructor(e){super(),this.isSpriteMaterial=!0,this.type="SpriteMaterial",this.color=new ge(16777215),this.map=null,this.alphaMap=null,this.rotation=0,this.sizeAttenuation=!0,this.transparent=!0,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.alphaMap=e.alphaMap,this.rotation=e.rotation,this.sizeAttenuation=e.sizeAttenuation,this.fog=e.fog,this}};var Qn=new L,Yc=new L,xo=new L,yi=new L,Zc=new L,yo=new L,Kc=new L,ni=class{constructor(e=new L,t=new L(0,0,-1)){this.origin=e,this.direction=t}set(e,t){return this.origin.copy(e),this.direction.copy(t),this}copy(e){return this.origin.copy(e.origin),this.direction.copy(e.direction),this}at(e,t){return t.copy(this.origin).addScaledVector(this.direction,e)}lookAt(e){return this.direction.copy(e).sub(this.origin).normalize(),this}recast(e){return this.origin.copy(this.at(e,Qn)),this}closestPointToPoint(e,t){t.subVectors(e,this.origin);let n=t.dot(this.direction);return n<0?t.copy(this.origin):t.copy(this.origin).addScaledVector(this.direction,n)}distanceToPoint(e){return Math.sqrt(this.distanceSqToPoint(e))}distanceSqToPoint(e){let t=Qn.subVectors(e,this.origin).dot(this.direction);return t<0?this.origin.distanceToSquared(e):(Qn.copy(this.origin).addScaledVector(this.direction,t),Qn.distanceToSquared(e))}distanceSqToSegment(e,t,n,s){Yc.copy(e).add(t).multiplyScalar(.5),xo.copy(t).sub(e).normalize(),yi.copy(this.origin).sub(Yc);let r=e.distanceTo(t)*.5,o=-this.direction.dot(xo),a=yi.dot(this.direction),c=-yi.dot(xo),l=yi.lengthSq(),u=Math.abs(1-o*o),d,h,p,g;if(u>0)if(d=o*c-a,h=o*a-c,g=r*u,d>=0)if(h>=-g)if(h<=g){let v=1/u;d*=v,h*=v,p=d*(d+o*h+2*a)+h*(o*d+h+2*c)+l}else h=r,d=Math.max(0,-(o*h+a)),p=-d*d+h*(h+2*c)+l;else h=-r,d=Math.max(0,-(o*h+a)),p=-d*d+h*(h+2*c)+l;else h<=-g?(d=Math.max(0,-(-o*r+a)),h=d>0?-r:Math.min(Math.max(-r,-c),r),p=-d*d+h*(h+2*c)+l):h<=g?(d=0,h=Math.min(Math.max(-r,-c),r),p=h*(h+2*c)+l):(d=Math.max(0,-(o*r+a)),h=d>0?r:Math.min(Math.max(-r,-c),r),p=-d*d+h*(h+2*c)+l);else h=o>0?-r:r,d=Math.max(0,-(o*h+a)),p=-d*d+h*(h+2*c)+l;return n&&n.copy(this.origin).addScaledVector(this.direction,d),s&&s.copy(Yc).addScaledVector(xo,h),p}intersectSphere(e,t){Qn.subVectors(e.center,this.origin);let n=Qn.dot(this.direction),s=Qn.dot(Qn)-n*n,r=e.radius*e.radius;if(s>r)return null;let o=Math.sqrt(r-s),a=n-o,c=n+o;return c<0?null:a<0?this.at(c,t):this.at(a,t)}intersectsSphere(e){return e.radius<0?!1:this.distanceSqToPoint(e.center)<=e.radius*e.radius}distanceToPlane(e){let t=e.normal.dot(this.direction);if(t===0)return e.distanceToPoint(this.origin)===0?0:null;let n=-(this.origin.dot(e.normal)+e.constant)/t;return n>=0?n:null}intersectPlane(e,t){let n=this.distanceToPlane(e);return n===null?null:this.at(n,t)}intersectsPlane(e){let t=e.distanceToPoint(this.origin);return t===0||e.normal.dot(this.direction)*t<0}intersectBox(e,t){let n,s,r,o,a,c,l=1/this.direction.x,u=1/this.direction.y,d=1/this.direction.z,h=this.origin;return l>=0?(n=(e.min.x-h.x)*l,s=(e.max.x-h.x)*l):(n=(e.max.x-h.x)*l,s=(e.min.x-h.x)*l),u>=0?(r=(e.min.y-h.y)*u,o=(e.max.y-h.y)*u):(r=(e.max.y-h.y)*u,o=(e.min.y-h.y)*u),n>o||r>s||((r>n||isNaN(n))&&(n=r),(o<s||isNaN(s))&&(s=o),d>=0?(a=(e.min.z-h.z)*d,c=(e.max.z-h.z)*d):(a=(e.max.z-h.z)*d,c=(e.min.z-h.z)*d),n>c||a>s)||((a>n||n!==n)&&(n=a),(c<s||s!==s)&&(s=c),s<0)?null:this.at(n>=0?n:s,t)}intersectsBox(e){return this.intersectBox(e,Qn)!==null}intersectTriangle(e,t,n,s,r){Zc.subVectors(t,e),yo.subVectors(n,e),Kc.crossVectors(Zc,yo);let o=this.direction.dot(Kc),a;if(o>0){if(s)return null;a=1}else if(o<0)a=-1,o=-o;else return null;yi.subVectors(this.origin,e);let c=a*this.direction.dot(yo.crossVectors(yi,yo));if(c<0)return null;let l=a*this.direction.dot(Zc.cross(yi));if(l<0||c+l>o)return null;let u=-a*yi.dot(Kc);return u<0?null:this.at(u/o,r)}applyMatrix4(e){return this.origin.applyMatrix4(e),this.direction.transformDirection(e),this}equals(e){return e.origin.equals(this.origin)&&e.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}},_n=class extends yt{constructor(e){super(),this.isMeshBasicMaterial=!0,this.type="MeshBasicMaterial",this.color=new ge(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new An,this.combine=zr,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.combine=e.combine,this.reflectivity=e.reflectivity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.fog=e.fog,this}},xh=new Ue,zi=new ni,vo=new $t,yh=new L,Mo=new L,bo=new L,So=new L,jc=new L,To=new L,vh=new L,wo=new L,Je=class extends lt{constructor(e=new Rt,t=new _n){super(),this.isMesh=!0,this.type="Mesh",this.geometry=e,this.material=t,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.count=1,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),e.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=e.morphTargetInfluences.slice()),e.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},e.morphTargetDictionary)),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}updateMorphTargets(){let t=this.geometry.morphAttributes,n=Object.keys(t);if(n.length>0){let s=t[n[0]];if(s!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,o=s.length;r<o;r++){let a=s[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=r}}}}getVertexPosition(e,t){let n=this.geometry,s=n.attributes.position,r=n.morphAttributes.position,o=n.morphTargetsRelative;t.fromBufferAttribute(s,e);let a=this.morphTargetInfluences;if(r&&a){To.set(0,0,0);for(let c=0,l=r.length;c<l;c++){let u=a[c],d=r[c];u!==0&&(jc.fromBufferAttribute(d,e),o?To.addScaledVector(jc,u):To.addScaledVector(jc.sub(t),u))}t.add(To)}return t}raycast(e,t){let n=this.geometry,s=this.material,r=this.matrixWorld;s!==void 0&&(n.boundingSphere===null&&n.computeBoundingSphere(),vo.copy(n.boundingSphere),vo.applyMatrix4(r),zi.copy(e.ray).recast(e.near),!(vo.containsPoint(zi.origin)===!1&&(zi.intersectSphere(vo,yh)===null||zi.origin.distanceToSquared(yh)>(e.far-e.near)**2))&&(xh.copy(r).invert(),zi.copy(e.ray).applyMatrix4(xh),!(n.boundingBox!==null&&zi.intersectsBox(n.boundingBox)===!1)&&this._computeIntersections(e,t,zi)))}_computeIntersections(e,t,n){let s,r=this.geometry,o=this.material,a=r.index,c=r.attributes.position,l=r.attributes.uv,u=r.attributes.uv1,d=r.attributes.normal,h=r.groups,p=r.drawRange;if(a!==null)if(Array.isArray(o))for(let g=0,v=h.length;g<v;g++){let m=h[g],f=o[m.materialIndex],_=Math.max(m.start,p.start),b=Math.min(a.count,Math.min(m.start+m.count,p.start+p.count));for(let S=_,E=b;S<E;S+=3){let w=a.getX(S),C=a.getX(S+1),y=a.getX(S+2);s=Ao(this,f,e,n,l,u,d,w,C,y),s&&(s.faceIndex=Math.floor(S/3),s.face.materialIndex=m.materialIndex,t.push(s))}}else{let g=Math.max(0,p.start),v=Math.min(a.count,p.start+p.count);for(let m=g,f=v;m<f;m+=3){let _=a.getX(m),b=a.getX(m+1),S=a.getX(m+2);s=Ao(this,o,e,n,l,u,d,_,b,S),s&&(s.faceIndex=Math.floor(m/3),t.push(s))}}else if(c!==void 0)if(Array.isArray(o))for(let g=0,v=h.length;g<v;g++){let m=h[g],f=o[m.materialIndex],_=Math.max(m.start,p.start),b=Math.min(c.count,Math.min(m.start+m.count,p.start+p.count));for(let S=_,E=b;S<E;S+=3){let w=S,C=S+1,y=S+2;s=Ao(this,f,e,n,l,u,d,w,C,y),s&&(s.faceIndex=Math.floor(S/3),s.face.materialIndex=m.materialIndex,t.push(s))}}else{let g=Math.max(0,p.start),v=Math.min(c.count,p.start+p.count);for(let m=g,f=v;m<f;m+=3){let _=m,b=m+1,S=m+2;s=Ao(this,o,e,n,l,u,d,_,b,S),s&&(s.faceIndex=Math.floor(m/3),t.push(s))}}}};function Af(i,e,t,n,s,r,o,a){let c;if(e.side===kt?c=n.intersectTriangle(o,r,s,!0,a):c=n.intersectTriangle(s,r,o,e.side===an,a),c===null)return null;wo.copy(a),wo.applyMatrix4(i.matrixWorld);let l=t.ray.origin.distanceTo(wo);return l<t.near||l>t.far?null:{distance:l,point:wo.clone(),object:i}}function Ao(i,e,t,n,s,r,o,a,c,l){i.getVertexPosition(a,Mo),i.getVertexPosition(c,bo),i.getVertexPosition(l,So);let u=Af(i,e,t,n,Mo,bo,So,vh);if(u){let d=new L;Mi.getBarycoord(vh,Mo,bo,So,d),s&&(u.uv=Mi.getInterpolatedAttribute(s,a,c,l,d,new be)),r&&(u.uv1=Mi.getInterpolatedAttribute(r,a,c,l,d,new be)),o&&(u.normal=Mi.getInterpolatedAttribute(o,a,c,l,d,new L),u.normal.dot(n.direction)>0&&u.normal.multiplyScalar(-1));let h={a,b:c,c:l,normal:new L,materialIndex:0};Mi.getNormal(Mo,bo,So,h.normal),u.face=h,u.barycoord=d}return u}var lr=new $e,Mh=new $e,bh=new $e,Ef=new $e,Sh=new Ue,Eo=new L,$c=new $t,Th=new Ue,Jc=new ni,Mr=class extends Je{constructor(e,t){super(e,t),this.isSkinnedMesh=!0,this.type="SkinnedMesh",this.bindMode=il,this.bindMatrix=new Ue,this.bindMatrixInverse=new Ue,this.boundingBox=null,this.boundingSphere=null}computeBoundingBox(){let e=this.geometry;this.boundingBox===null&&(this.boundingBox=new ln),this.boundingBox.makeEmpty();let t=e.getAttribute("position");for(let n=0;n<t.count;n++)this.getVertexPosition(n,Eo),this.boundingBox.expandByPoint(Eo)}computeBoundingSphere(){let e=this.geometry;this.boundingSphere===null&&(this.boundingSphere=new $t),this.boundingSphere.makeEmpty();let t=e.getAttribute("position");for(let n=0;n<t.count;n++)this.getVertexPosition(n,Eo),this.boundingSphere.expandByPoint(Eo)}copy(e,t){return super.copy(e,t),this.bindMode=e.bindMode,this.bindMatrix.copy(e.bindMatrix),this.bindMatrixInverse.copy(e.bindMatrixInverse),this.skeleton=e.skeleton,e.boundingBox!==null&&(this.boundingBox=e.boundingBox.clone()),e.boundingSphere!==null&&(this.boundingSphere=e.boundingSphere.clone()),this}raycast(e,t){let n=this.material,s=this.matrixWorld;n!==void 0&&(this.boundingSphere===null&&this.computeBoundingSphere(),$c.copy(this.boundingSphere),$c.applyMatrix4(s),e.ray.intersectsSphere($c)!==!1&&(Th.copy(s).invert(),Jc.copy(e.ray).applyMatrix4(Th),!(this.boundingBox!==null&&Jc.intersectsBox(this.boundingBox)===!1)&&this._computeIntersections(e,t,Jc)))}getVertexPosition(e,t){return super.getVertexPosition(e,t),this.applyBoneTransform(e,t),t}bind(e,t){this.skeleton=e,t===void 0&&(this.updateMatrixWorld(!0),this.skeleton.calculateInverses(),t=this.matrixWorld),this.bindMatrix.copy(t),this.bindMatrixInverse.copy(t).invert()}pose(){this.skeleton.pose()}normalizeSkinWeights(){let e=new $e,t=this.geometry.attributes.skinWeight;for(let n=0,s=t.count;n<s;n++){e.fromBufferAttribute(t,n);let r=1/e.manhattanLength();r!==1/0?e.multiplyScalar(r):e.set(1,0,0,0),t.setXYZW(n,e.x,e.y,e.z,e.w)}}updateMatrixWorld(e){super.updateMatrixWorld(e),this.bindMode===il?this.bindMatrixInverse.copy(this.matrixWorld).invert():this.bindMode===hu?this.bindMatrixInverse.copy(this.bindMatrix).invert():ve("SkinnedMesh: Unrecognized bindMode: "+this.bindMode)}applyBoneTransform(e,t){let n=this.skeleton,s=this.geometry;Mh.fromBufferAttribute(s.attributes.skinIndex,e),bh.fromBufferAttribute(s.attributes.skinWeight,e),t.isVector4?(lr.copy(t),t.set(0,0,0,0)):(lr.set(...t,1),t.set(0,0,0)),lr.applyMatrix4(this.bindMatrix);for(let r=0;r<4;r++){let o=bh.getComponent(r);if(o!==0){let a=Mh.getComponent(r);Sh.multiplyMatrices(n.bones[a].matrixWorld,n.boneInverses[a]),t.addScaledVector(Ef.copy(lr).applyMatrix4(Sh),o)}}return t.isVector4&&(t.w=lr.w),t.applyMatrix4(this.bindMatrixInverse)}},ks=class extends lt{constructor(){super(),this.isBone=!0,this.type="Bone"}},Ti=class extends Ot{constructor(e=null,t=1,n=1,s,r,o,a,c,l=St,u=St,d,h){super(null,o,a,c,l,u,s,r,d,h),this.isDataTexture=!0,this.image={data:e,width:t,height:n},this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}},wh=new Ue,Rf=new Ue,br=class i{constructor(e=[],t=[]){this.uuid=Tn(),this.bones=e.slice(0),this.boneInverses=t,this.boneMatrices=null,this.previousBoneMatrices=null,this.boneTexture=null,this.init()}init(){let e=this.bones,t=this.boneInverses;if(this.boneMatrices=new Float32Array(e.length*16),t.length===0)this.calculateInverses();else if(e.length!==t.length){ve("Skeleton: Number of inverse bone matrices does not match amount of bones."),this.boneInverses=[];for(let n=0,s=this.bones.length;n<s;n++)this.boneInverses.push(new Ue)}}calculateInverses(){this.boneInverses.length=0;for(let e=0,t=this.bones.length;e<t;e++){let n=new Ue;this.bones[e]&&n.copy(this.bones[e].matrixWorld).invert(),this.boneInverses.push(n)}}pose(){for(let e=0,t=this.bones.length;e<t;e++){let n=this.bones[e];n&&n.matrixWorld.copy(this.boneInverses[e]).invert()}for(let e=0,t=this.bones.length;e<t;e++){let n=this.bones[e];n&&(n.parent&&n.parent.isBone?(n.matrix.copy(n.parent.matrixWorld).invert(),n.matrix.multiply(n.matrixWorld)):n.matrix.copy(n.matrixWorld),n.matrix.decompose(n.position,n.quaternion,n.scale))}}update(){let e=this.bones,t=this.boneInverses,n=this.boneMatrices,s=this.boneTexture;for(let r=0,o=e.length;r<o;r++){let a=e[r]?e[r].matrixWorld:Rf;wh.multiplyMatrices(a,t[r]),wh.toArray(n,r*16)}s!==null&&(s.needsUpdate=!0)}clone(){return new i(this.bones,this.boneInverses)}computeBoneTexture(){let e=Math.sqrt(this.bones.length*4);e=Math.ceil(e/4)*4,e=Math.max(e,4);let t=new Float32Array(e*e*4);t.set(this.boneMatrices);let n=new Ti(t,e,e,dn,un);return n.needsUpdate=!0,this.boneMatrices=t,this.boneTexture=n,this}getBoneByName(e){for(let t=0,n=this.bones.length;t<n;t++){let s=this.bones[t];if(s.name===e)return s}}dispose(){this.boneTexture!==null&&(this.boneTexture.dispose(),this.boneTexture=null)}fromJSON(e,t){this.uuid=e.uuid;for(let n=0,s=e.bones.length;n<s;n++){let r=e.bones[n],o=t[r];o===void 0&&(ve("Skeleton: No bone found with UUID:",r),o=new ks),this.bones.push(o),this.boneInverses.push(new Ue().fromArray(e.boneInverses[n]))}return this.init(),this}toJSON(){let e={metadata:{version:4.7,type:"Skeleton",generator:"Skeleton.toJSON"},bones:[],boneInverses:[]};e.uuid=this.uuid;let t=this.bones,n=this.boneInverses;for(let s=0,r=t.length;s<r;s++){let o=t[s];e.bones.push(o.uuid);let a=n[s];e.boneInverses.push(a.toArray())}return e}},wi=class extends mt{constructor(e,t,n,s=1){super(e,t,n),this.isInstancedBufferAttribute=!0,this.meshPerAttribute=s}copy(e){return super.copy(e),this.meshPerAttribute=e.meshPerAttribute,this}toJSON(){let e=super.toJSON();return e.meshPerAttribute=this.meshPerAttribute,e.isInstancedBufferAttribute=!0,e}},As=new Ue,Ah=new Ue,Ro=[],Eh=new ln,Cf=new Ue,hr=new Je,ur=new $t,Ki=class extends Je{constructor(e,t,n){super(e,t),this.isInstancedMesh=!0,this.instanceMatrix=new wi(new Float32Array(n*16),16),this.previousInstanceMatrix=null,this.instanceColor=null,this.morphTexture=null,this.count=n,this.boundingBox=null,this.boundingSphere=null;for(let s=0;s<n;s++)this.setMatrixAt(s,Cf)}computeBoundingBox(){let e=this.geometry,t=this.count;this.boundingBox===null&&(this.boundingBox=new ln),e.boundingBox===null&&e.computeBoundingBox(),this.boundingBox.makeEmpty();for(let n=0;n<t;n++)this.getMatrixAt(n,As),Eh.copy(e.boundingBox).applyMatrix4(As),this.boundingBox.union(Eh)}computeBoundingSphere(){let e=this.geometry,t=this.count;this.boundingSphere===null&&(this.boundingSphere=new $t),e.boundingSphere===null&&e.computeBoundingSphere(),this.boundingSphere.makeEmpty();for(let n=0;n<t;n++)this.getMatrixAt(n,As),ur.copy(e.boundingSphere).applyMatrix4(As),this.boundingSphere.union(ur)}copy(e,t){return super.copy(e,t),this.instanceMatrix.copy(e.instanceMatrix),e.previousInstanceMatrix!==null&&(this.previousInstanceMatrix=e.previousInstanceMatrix.clone()),e.morphTexture!==null&&(this.morphTexture=e.morphTexture.clone()),e.instanceColor!==null&&(this.instanceColor=e.instanceColor.clone()),this.count=e.count,e.boundingBox!==null&&(this.boundingBox=e.boundingBox.clone()),e.boundingSphere!==null&&(this.boundingSphere=e.boundingSphere.clone()),this}getColorAt(e,t){return this.instanceColor===null?t.setRGB(1,1,1):t.fromArray(this.instanceColor.array,e*3)}getMatrixAt(e,t){return t.fromArray(this.instanceMatrix.array,e*16)}getMorphAt(e,t){let n=t.morphTargetInfluences,s=this.morphTexture.source.data.data,r=n.length+1,o=e*r+1;for(let a=0;a<n.length;a++)n[a]=s[o+a]}raycast(e,t){let n=this.matrixWorld,s=this.count;if(hr.geometry=this.geometry,hr.material=this.material,hr.material!==void 0&&(this.boundingSphere===null&&this.computeBoundingSphere(),ur.copy(this.boundingSphere),ur.applyMatrix4(n),e.ray.intersectsSphere(ur)!==!1))for(let r=0;r<s;r++){this.getMatrixAt(r,As),Ah.multiplyMatrices(n,As),hr.matrixWorld=Ah,hr.raycast(e,Ro);for(let o=0,a=Ro.length;o<a;o++){let c=Ro[o];c.instanceId=r,c.object=this,t.push(c)}Ro.length=0}}setColorAt(e,t){return this.instanceColor===null&&(this.instanceColor=new wi(new Float32Array(this.instanceMatrix.count*3).fill(1),3)),t.toArray(this.instanceColor.array,e*3),this}setMatrixAt(e,t){return t.toArray(this.instanceMatrix.array,e*16),this}setMorphAt(e,t){let n=t.morphTargetInfluences,s=n.length+1;this.morphTexture===null&&(this.morphTexture=new Ti(new Float32Array(s*this.count),s,this.count,Zs,un));let r=this.morphTexture.source.data.data,o=0;for(let l=0;l<n.length;l++)o+=n[l];let a=this.geometry.morphTargetsRelative?1:1-o,c=s*e;return r[c]=a,r.set(n,c+1),this}updateMorphTargets(){}dispose(){this.dispatchEvent({type:"dispose"}),this.morphTexture!==null&&(this.morphTexture.dispose(),this.morphTexture=null)}},Qc=new L,If=new L,Pf=new Ie,mn=class{constructor(e=new L(1,0,0),t=0){this.isPlane=!0,this.normal=e,this.constant=t}set(e,t){return this.normal.copy(e),this.constant=t,this}setComponents(e,t,n,s){return this.normal.set(e,t,n),this.constant=s,this}setFromNormalAndCoplanarPoint(e,t){return this.normal.copy(e),this.constant=-t.dot(this.normal),this}setFromCoplanarPoints(e,t,n){let s=Qc.subVectors(n,t).cross(If.subVectors(e,t)).normalize();return this.setFromNormalAndCoplanarPoint(s,e),this}copy(e){return this.normal.copy(e.normal),this.constant=e.constant,this}normalize(){let e=1/this.normal.length();return this.normal.multiplyScalar(e),this.constant*=e,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(e){return this.normal.dot(e)+this.constant}distanceToSphere(e){return this.distanceToPoint(e.center)-e.radius}projectPoint(e,t){return t.copy(e).addScaledVector(this.normal,-this.distanceToPoint(e))}intersectLine(e,t,n=!0){let s=e.delta(Qc),r=this.normal.dot(s);if(r===0)return this.distanceToPoint(e.start)===0?t.copy(e.start):null;let o=-(e.start.dot(this.normal)+this.constant)/r;return n===!0&&(o<0||o>1)?null:t.copy(e.start).addScaledVector(s,o)}intersectsLine(e){let t=this.distanceToPoint(e.start),n=this.distanceToPoint(e.end);return t<0&&n>0||n<0&&t>0}intersectsBox(e){return e.intersectsPlane(this)}intersectsSphere(e){return e.intersectsPlane(this)}coplanarPoint(e){return e.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(e,t){let n=t||Pf.getNormalMatrix(e),s=this.coplanarPoint(Qc).applyMatrix4(e),r=this.normal.applyMatrix3(n).normalize();return this.constant=-s.dot(r),this}translate(e){return this.constant-=e.dot(this.normal),this}equals(e){return e.normal.equals(this.normal)&&e.constant===this.constant}clone(){return new this.constructor().copy(this)}},Vi=new $t,Lf=new be(.5,.5),Co=new L,zs=class{constructor(e=new mn,t=new mn,n=new mn,s=new mn,r=new mn,o=new mn){this.planes=[e,t,n,s,r,o]}set(e,t,n,s,r,o){let a=this.planes;return a[0].copy(e),a[1].copy(t),a[2].copy(n),a[3].copy(s),a[4].copy(r),a[5].copy(o),this}copy(e){let t=this.planes;for(let n=0;n<6;n++)t[n].copy(e.planes[n]);return this}setFromProjectionMatrix(e,t=Sn,n=!1){let s=this.planes,r=e.elements,o=r[0],a=r[1],c=r[2],l=r[3],u=r[4],d=r[5],h=r[6],p=r[7],g=r[8],v=r[9],m=r[10],f=r[11],_=r[12],b=r[13],S=r[14],E=r[15];if(s[0].setComponents(l-o,p-u,f-g,E-_).normalize(),s[1].setComponents(l+o,p+u,f+g,E+_).normalize(),s[2].setComponents(l+a,p+d,f+v,E+b).normalize(),s[3].setComponents(l-a,p-d,f-v,E-b).normalize(),n)s[4].setComponents(c,h,m,S).normalize(),s[5].setComponents(l-c,p-h,f-m,E-S).normalize();else if(s[4].setComponents(l-c,p-h,f-m,E-S).normalize(),t===Sn)s[5].setComponents(l+c,p+h,f+m,E+S).normalize();else if(t===Ls)s[5].setComponents(c,h,m,S).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+t);return this}intersectsObject(e){if(e.boundingSphere!==void 0)e.boundingSphere===null&&e.computeBoundingSphere(),Vi.copy(e.boundingSphere).applyMatrix4(e.matrixWorld);else{let t=e.geometry;t.boundingSphere===null&&t.computeBoundingSphere(),Vi.copy(t.boundingSphere).applyMatrix4(e.matrixWorld)}return this.intersectsSphere(Vi)}intersectsSprite(e){Vi.center.set(0,0,0);let t=Lf.distanceTo(e.center);return Vi.radius=.7071067811865476+t,Vi.applyMatrix4(e.matrixWorld),this.intersectsSphere(Vi)}intersectsSphere(e){let t=this.planes,n=e.center,s=-e.radius;for(let r=0;r<6;r++)if(t[r].distanceToPoint(n)<s)return!1;return!0}intersectsBox(e){let t=this.planes;for(let n=0;n<6;n++){let s=t[n];if(Co.x=s.normal.x>0?e.max.x:e.min.x,Co.y=s.normal.y>0?e.max.y:e.min.y,Co.z=s.normal.z>0?e.max.z:e.min.z,s.distanceToPoint(Co)<0)return!1}return!0}containsPoint(e){let t=this.planes;for(let n=0;n<6;n++)if(t[n].distanceToPoint(e)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}};var Ai=class extends yt{constructor(e){super(),this.isLineBasicMaterial=!0,this.type="LineBasicMaterial",this.color=new ge(16777215),this.map=null,this.linewidth=1,this.linecap="round",this.linejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.linewidth=e.linewidth,this.linecap=e.linecap,this.linejoin=e.linejoin,this.fog=e.fog,this}},Qo=new L,ea=new L,Rh=new Ue,dr=new ni,Io=new $t,el=new L,Ch=new L,ji=class extends lt{constructor(e=new Rt,t=new Ai){super(),this.isLine=!0,this.type="Line",this.geometry=e,this.material=t,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}computeLineDistances(){let e=this.geometry;if(e.index===null){let t=e.attributes.position,n=[0];for(let s=1,r=t.count;s<r;s++)Qo.fromBufferAttribute(t,s-1),ea.fromBufferAttribute(t,s),n[s]=n[s-1],n[s]+=Qo.distanceTo(ea);e.setAttribute("lineDistance",new Et(n,1))}else ve("Line.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}raycast(e,t){let n=this.geometry,s=this.matrixWorld,r=e.params.Line.threshold,o=n.drawRange;if(n.boundingSphere===null&&n.computeBoundingSphere(),Io.copy(n.boundingSphere),Io.applyMatrix4(s),Io.radius+=r,e.ray.intersectsSphere(Io)===!1)return;Rh.copy(s).invert(),dr.copy(e.ray).applyMatrix4(Rh);let a=r/((this.scale.x+this.scale.y+this.scale.z)/3),c=a*a,l=this.isLineSegments?2:1,u=n.index,h=n.attributes.position;if(u!==null){let p=Math.max(0,o.start),g=Math.min(u.count,o.start+o.count);for(let v=p,m=g-1;v<m;v+=l){let f=u.getX(v),_=u.getX(v+1),b=Po(this,e,dr,c,f,_,v);b&&t.push(b)}if(this.isLineLoop){let v=u.getX(g-1),m=u.getX(p),f=Po(this,e,dr,c,v,m,g-1);f&&t.push(f)}}else{let p=Math.max(0,o.start),g=Math.min(h.count,o.start+o.count);for(let v=p,m=g-1;v<m;v+=l){let f=Po(this,e,dr,c,v,v+1,v);f&&t.push(f)}if(this.isLineLoop){let v=Po(this,e,dr,c,g-1,p,g-1);v&&t.push(v)}}}updateMorphTargets(){let t=this.geometry.morphAttributes,n=Object.keys(t);if(n.length>0){let s=t[n[0]];if(s!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,o=s.length;r<o;r++){let a=s[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=r}}}}};function Po(i,e,t,n,s,r,o){let a=i.geometry.attributes.position;if(Qo.fromBufferAttribute(a,s),ea.fromBufferAttribute(a,r),t.distanceSqToSegment(Qo,ea,el,Ch)>n)return;el.applyMatrix4(i.matrixWorld);let l=e.ray.origin.distanceTo(el);if(!(l<e.near||l>e.far))return{distance:l,point:Ch.clone().applyMatrix4(i.matrixWorld),index:o,face:null,faceIndex:null,barycoord:null,object:i}}var Ih=new L,Ph=new L,Sr=class extends ji{constructor(e,t){super(e,t),this.isLineSegments=!0,this.type="LineSegments"}computeLineDistances(){let e=this.geometry;if(e.index===null){let t=e.attributes.position,n=[];for(let s=0,r=t.count;s<r;s+=2)Ih.fromBufferAttribute(t,s),Ph.fromBufferAttribute(t,s+1),n[s]=s===0?0:n[s-1],n[s+1]=n[s]+Ih.distanceTo(Ph);e.setAttribute("lineDistance",new Et(n,1))}else ve("LineSegments.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}},Tr=class extends ji{constructor(e,t){super(e,t),this.isLineLoop=!0,this.type="LineLoop"}},$i=class extends yt{constructor(e){super(),this.isPointsMaterial=!0,this.type="PointsMaterial",this.color=new ge(16777215),this.map=null,this.alphaMap=null,this.size=1,this.sizeAttenuation=!0,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.alphaMap=e.alphaMap,this.size=e.size,this.sizeAttenuation=e.sizeAttenuation,this.fog=e.fog,this}},Lh=new Ue,ll=new ni,Lo=new $t,Do=new L,wr=class extends lt{constructor(e=new Rt,t=new $i){super(),this.isPoints=!0,this.type="Points",this.geometry=e,this.material=t,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}raycast(e,t){let n=this.geometry,s=this.matrixWorld,r=e.params.Points.threshold,o=n.drawRange;if(n.boundingSphere===null&&n.computeBoundingSphere(),Lo.copy(n.boundingSphere),Lo.applyMatrix4(s),Lo.radius+=r,e.ray.intersectsSphere(Lo)===!1)return;Lh.copy(s).invert(),ll.copy(e.ray).applyMatrix4(Lh);let a=r/((this.scale.x+this.scale.y+this.scale.z)/3),c=a*a,l=n.index,d=n.attributes.position;if(l!==null){let h=Math.max(0,o.start),p=Math.min(l.count,o.start+o.count);for(let g=h,v=p;g<v;g++){let m=l.getX(g);Do.fromBufferAttribute(d,m),Dh(Do,m,c,s,e,t,this)}}else{let h=Math.max(0,o.start),p=Math.min(d.count,o.start+o.count);for(let g=h,v=p;g<v;g++)Do.fromBufferAttribute(d,g),Dh(Do,g,c,s,e,t,this)}}updateMorphTargets(){let t=this.geometry.morphAttributes,n=Object.keys(t);if(n.length>0){let s=t[n[0]];if(s!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,o=s.length;r<o;r++){let a=s[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=r}}}}};function Dh(i,e,t,n,s,r,o){let a=ll.distanceSqToPoint(i);if(a<t){let c=new L;ll.closestPointToPoint(i,c),c.applyMatrix4(n);let l=s.ray.origin.distanceTo(c);if(l<s.near||l>s.far)return;r.push({distance:l,distanceToRay:Math.sqrt(a),point:c,index:e,face:null,faceIndex:null,barycoord:null,object:o})}}var Ar=class extends Ot{constructor(e=[],t=Pi,n,s,r,o,a,c,l,u){super(e,t,n,s,r,o,a,c,l,u),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(e){this.image=e}};var ii=class extends Ot{constructor(e,t,n=Cn,s,r,o,a=St,c=St,l,u=Fn,d=1){if(u!==Fn&&u!==Li)throw new Error("DepthTexture format must be either THREE.DepthFormat or THREE.DepthStencilFormat");let h={width:e,height:t,depth:d};super(h,s,r,o,a,c,u,n,l),this.isDepthTexture=!0,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(e){return super.copy(e),this.source=new Us(Object.assign({},e.image)),this.compareFunction=e.compareFunction,this}toJSON(e){let t=super.toJSON(e);return this.compareFunction!==null&&(t.compareFunction=this.compareFunction),t}},ta=class extends ii{constructor(e,t=Cn,n=Pi,s,r,o=St,a=St,c,l=Fn){let u={width:e,height:e,depth:1},d=[u,u,u,u,u,u];super(e,e,t,n,s,r,o,a,c,l),this.image=d,this.isCubeDepthTexture=!0,this.isCubeTexture=!0}get images(){return this.image}set images(e){this.image=e}},Er=class extends Ot{constructor(e=null){super(),this.sourceTexture=e,this.isExternalTexture=!0}copy(e){return super.copy(e),this.sourceTexture=e.sourceTexture,this}},Ei=class i extends Rt{constructor(e=1,t=1,n=1,s=1,r=1,o=1){super(),this.type="BoxGeometry",this.parameters={width:e,height:t,depth:n,widthSegments:s,heightSegments:r,depthSegments:o};let a=this;s=Math.floor(s),r=Math.floor(r),o=Math.floor(o);let c=[],l=[],u=[],d=[],h=0,p=0;g("z","y","x",-1,-1,n,t,e,o,r,0),g("z","y","x",1,-1,n,t,-e,o,r,1),g("x","z","y",1,1,e,n,t,s,o,2),g("x","z","y",1,-1,e,n,-t,s,o,3),g("x","y","z",1,-1,e,t,n,s,r,4),g("x","y","z",-1,-1,e,t,-n,s,r,5),this.setIndex(c),this.setAttribute("position",new Et(l,3)),this.setAttribute("normal",new Et(u,3)),this.setAttribute("uv",new Et(d,2));function g(v,m,f,_,b,S,E,w,C,y,A){let I=S/C,R=E/y,O=S/2,G=E/2,X=w/2,U=C+1,F=y+1,V=0,j=0,$=new L;for(let ae=0;ae<F;ae++){let ye=ae*R-G;for(let we=0;we<U;we++){let qe=we*I-O;$[v]=qe*_,$[m]=ye*b,$[f]=X,l.push($.x,$.y,$.z),$[v]=0,$[m]=0,$[f]=w>0?1:-1,u.push($.x,$.y,$.z),d.push(we/C),d.push(1-ae/y),V+=1}}for(let ae=0;ae<y;ae++)for(let ye=0;ye<C;ye++){let we=h+ye+U*ae,qe=h+ye+U*(ae+1),Qe=h+(ye+1)+U*(ae+1),Fe=h+(ye+1)+U*ae;c.push(we,qe,Fe),c.push(qe,Qe,Fe),j+=6}a.addGroup(p,j,A),p+=j,h+=V}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new i(e.width,e.height,e.depth,e.widthSegments,e.heightSegments,e.depthSegments)}};var na=class i extends Rt{constructor(e=[],t=[],n=1,s=0){super(),this.type="PolyhedronGeometry",this.parameters={vertices:e,indices:t,radius:n,detail:s};let r=[],o=[];a(s),l(n),u(),this.setAttribute("position",new Et(r,3)),this.setAttribute("normal",new Et(r.slice(),3)),this.setAttribute("uv",new Et(o,2)),s===0?this.computeVertexNormals():this.normalizeNormals();function a(_){let b=new L,S=new L,E=new L;for(let w=0;w<t.length;w+=3)p(t[w+0],b),p(t[w+1],S),p(t[w+2],E),c(b,S,E,_)}function c(_,b,S,E){let w=E+1,C=[];for(let y=0;y<=w;y++){C[y]=[];let A=_.clone().lerp(S,y/w),I=b.clone().lerp(S,y/w),R=w-y;for(let O=0;O<=R;O++)O===0&&y===w?C[y][O]=A:C[y][O]=A.clone().lerp(I,O/R)}for(let y=0;y<w;y++)for(let A=0;A<2*(w-y)-1;A++){let I=Math.floor(A/2);A%2===0?(h(C[y][I+1]),h(C[y+1][I]),h(C[y][I])):(h(C[y][I+1]),h(C[y+1][I+1]),h(C[y+1][I]))}}function l(_){let b=new L;for(let S=0;S<r.length;S+=3)b.x=r[S+0],b.y=r[S+1],b.z=r[S+2],b.normalize().multiplyScalar(_),r[S+0]=b.x,r[S+1]=b.y,r[S+2]=b.z}function u(){let _=new L;for(let b=0;b<r.length;b+=3){_.x=r[b+0],_.y=r[b+1],_.z=r[b+2];let S=m(_)/2/Math.PI+.5,E=f(_)/Math.PI+.5;o.push(S,1-E)}g(),d()}function d(){for(let _=0;_<o.length;_+=6){let b=o[_+0],S=o[_+2],E=o[_+4],w=Math.max(b,S,E),C=Math.min(b,S,E);w>.9&&C<.1&&(b<.2&&(o[_+0]+=1),S<.2&&(o[_+2]+=1),E<.2&&(o[_+4]+=1))}}function h(_){r.push(_.x,_.y,_.z)}function p(_,b){let S=_*3;b.x=e[S+0],b.y=e[S+1],b.z=e[S+2]}function g(){let _=new L,b=new L,S=new L,E=new L,w=new be,C=new be,y=new be;for(let A=0,I=0;A<r.length;A+=9,I+=6){_.set(r[A+0],r[A+1],r[A+2]),b.set(r[A+3],r[A+4],r[A+5]),S.set(r[A+6],r[A+7],r[A+8]),w.set(o[I+0],o[I+1]),C.set(o[I+2],o[I+3]),y.set(o[I+4],o[I+5]),E.copy(_).add(b).add(S).divideScalar(3);let R=m(E);v(w,I+0,_,R),v(C,I+2,b,R),v(y,I+4,S,R)}}function v(_,b,S,E){E<0&&_.x===1&&(o[b]=_.x-1),S.x===0&&S.z===0&&(o[b]=E/2/Math.PI+.5)}function m(_){return Math.atan2(_.z,-_.x)}function f(_){return Math.atan2(-_.y,Math.sqrt(_.x*_.x+_.z*_.z))}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new i(e.vertices,e.indices,e.radius,e.detail)}};var Vs=class i extends na{constructor(e=1,t=0){let n=(1+Math.sqrt(5))/2,s=[-1,n,0,1,n,0,-1,-n,0,1,-n,0,0,-1,n,0,1,n,0,-1,-n,0,1,-n,n,0,-1,n,0,1,-n,0,-1,-n,0,1],r=[0,11,5,0,5,1,0,1,7,0,7,10,0,10,11,1,5,9,5,11,4,11,10,2,10,7,6,7,1,8,3,9,4,3,4,2,3,2,6,3,6,8,3,8,9,4,9,5,2,4,11,6,2,10,8,6,7,9,8,1];super(s,r,e,t),this.type="IcosahedronGeometry",this.parameters={radius:e,detail:t}}static fromJSON(e){return new i(e.radius,e.detail)}};var Ji=class i extends Rt{constructor(e=1,t=1,n=1,s=1){super(),this.type="PlaneGeometry",this.parameters={width:e,height:t,widthSegments:n,heightSegments:s};let r=e/2,o=t/2,a=Math.floor(n),c=Math.floor(s),l=a+1,u=c+1,d=e/a,h=t/c,p=[],g=[],v=[],m=[];for(let f=0;f<u;f++){let _=f*h-o;for(let b=0;b<l;b++){let S=b*d-r;g.push(S,-_,0),v.push(0,0,1),m.push(b/a),m.push(1-f/c)}}for(let f=0;f<c;f++)for(let _=0;_<a;_++){let b=_+l*f,S=_+l*(f+1),E=_+1+l*(f+1),w=_+1+l*f;p.push(b,S,w),p.push(S,E,w)}this.setIndex(p),this.setAttribute("position",new Et(g,3)),this.setAttribute("normal",new Et(v,3)),this.setAttribute("uv",new Et(m,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new i(e.width,e.height,e.widthSegments,e.heightSegments)}};var ia=class extends yt{constructor(e){super(),this.isShadowMaterial=!0,this.type="ShadowMaterial",this.color=new ge(0),this.transparent=!0,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.fog=e.fog,this}};function as(i){let e={};for(let t in i){e[t]={};for(let n in i[t]){let s=i[t][n];if(Nh(s))s.isRenderTargetTexture?(ve("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),e[t][n]=null):e[t][n]=s.clone();else if(Array.isArray(s))if(Nh(s[0])){let r=[];for(let o=0,a=s.length;o<a;o++)r[o]=s[o].clone();e[t][n]=r}else e[t][n]=s.slice();else e[t][n]=s}}return e}function Xt(i){let e={};for(let t=0;t<i.length;t++){let n=as(i[t]);for(let s in n)e[s]=n[s]}return e}function Nh(i){return i&&(i.isColor||i.isMatrix3||i.isMatrix4||i.isVector2||i.isVector3||i.isVector4||i.isTexture||i.isQuaternion)}function Df(i){let e=[];for(let t=0;t<i.length;t++)e.push(i[t].clone());return e}function Ol(i){let e=i.getRenderTarget();return e===null?i.outputColorSpace:e.isXRRenderTarget===!0?e.texture.colorSpace:ze.workingColorSpace}var wu={clone:as,merge:Xt},Nf=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,Uf=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`,Jt=class extends yt{constructor(e){super(),this.isShaderMaterial=!0,this.type="ShaderMaterial",this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=Nf,this.fragmentShader=Uf,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,e!==void 0&&this.setValues(e)}copy(e){return super.copy(e),this.fragmentShader=e.fragmentShader,this.vertexShader=e.vertexShader,this.uniforms=as(e.uniforms),this.uniformsGroups=Df(e.uniformsGroups),this.defines=Object.assign({},e.defines),this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.fog=e.fog,this.lights=e.lights,this.clipping=e.clipping,this.extensions=Object.assign({},e.extensions),this.glslVersion=e.glslVersion,this.defaultAttributeValues=Object.assign({},e.defaultAttributeValues),this.index0AttributeName=e.index0AttributeName,this.uniformsNeedUpdate=e.uniformsNeedUpdate,this}toJSON(e){let t=super.toJSON(e);t.glslVersion=this.glslVersion,t.uniforms={};for(let s in this.uniforms){let o=this.uniforms[s].value;o&&o.isTexture?t.uniforms[s]={type:"t",value:o.toJSON(e).uuid}:o&&o.isColor?t.uniforms[s]={type:"c",value:o.getHex()}:o&&o.isVector2?t.uniforms[s]={type:"v2",value:o.toArray()}:o&&o.isVector3?t.uniforms[s]={type:"v3",value:o.toArray()}:o&&o.isVector4?t.uniforms[s]={type:"v4",value:o.toArray()}:o&&o.isMatrix3?t.uniforms[s]={type:"m3",value:o.toArray()}:o&&o.isMatrix4?t.uniforms[s]={type:"m4",value:o.toArray()}:t.uniforms[s]={value:o}}Object.keys(this.defines).length>0&&(t.defines=this.defines),t.vertexShader=this.vertexShader,t.fragmentShader=this.fragmentShader,t.lights=this.lights,t.clipping=this.clipping;let n={};for(let s in this.extensions)this.extensions[s]===!0&&(n[s]=!0);return Object.keys(n).length>0&&(t.extensions=n),t}},Rr=class extends Jt{constructor(e){super(e),this.isRawShaderMaterial=!0,this.type="RawShaderMaterial"}},Bt=class extends yt{constructor(e){super(),this.isMeshStandardMaterial=!0,this.type="MeshStandardMaterial",this.defines={STANDARD:""},this.color=new ge(16777215),this.roughness=1,this.metalness=0,this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new ge(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=ai,this.normalScale=new be(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.roughnessMap=null,this.metalnessMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new An,this.envMapIntensity=1,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.defines={STANDARD:""},this.color.copy(e.color),this.roughness=e.roughness,this.metalness=e.metalness,this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.emissive.copy(e.emissive),this.emissiveMap=e.emissiveMap,this.emissiveIntensity=e.emissiveIntensity,this.bumpMap=e.bumpMap,this.bumpScale=e.bumpScale,this.normalMap=e.normalMap,this.normalMapType=e.normalMapType,this.normalScale.copy(e.normalScale),this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.roughnessMap=e.roughnessMap,this.metalnessMap=e.metalnessMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.envMapIntensity=e.envMapIntensity,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.flatShading=e.flatShading,this.fog=e.fog,this}},jt=class extends Bt{constructor(e){super(),this.isMeshPhysicalMaterial=!0,this.defines={STANDARD:"",PHYSICAL:""},this.type="MeshPhysicalMaterial",this.anisotropyRotation=0,this.anisotropyMap=null,this.clearcoatMap=null,this.clearcoatRoughness=0,this.clearcoatRoughnessMap=null,this.clearcoatNormalScale=new be(1,1),this.clearcoatNormalMap=null,this.ior=1.5,Object.defineProperty(this,"reflectivity",{get:function(){return Ve(2.5*(this.ior-1)/(this.ior+1),0,1)},set:function(t){this.ior=(1+.4*t)/(1-.4*t)}}),this.iridescenceMap=null,this.iridescenceIOR=1.3,this.iridescenceThicknessRange=[100,400],this.iridescenceThicknessMap=null,this.sheenColor=new ge(0),this.sheenColorMap=null,this.sheenRoughness=1,this.sheenRoughnessMap=null,this.transmissionMap=null,this.thickness=0,this.thicknessMap=null,this.attenuationDistance=1/0,this.attenuationColor=new ge(1,1,1),this.specularIntensity=1,this.specularIntensityMap=null,this.specularColor=new ge(1,1,1),this.specularColorMap=null,this._anisotropy=0,this._clearcoat=0,this._dispersion=0,this._iridescence=0,this._sheen=0,this._transmission=0,this.setValues(e)}get anisotropy(){return this._anisotropy}set anisotropy(e){this._anisotropy>0!=e>0&&this.version++,this._anisotropy=e}get clearcoat(){return this._clearcoat}set clearcoat(e){this._clearcoat>0!=e>0&&this.version++,this._clearcoat=e}get iridescence(){return this._iridescence}set iridescence(e){this._iridescence>0!=e>0&&this.version++,this._iridescence=e}get dispersion(){return this._dispersion}set dispersion(e){this._dispersion>0!=e>0&&this.version++,this._dispersion=e}get sheen(){return this._sheen}set sheen(e){this._sheen>0!=e>0&&this.version++,this._sheen=e}get transmission(){return this._transmission}set transmission(e){this._transmission>0!=e>0&&this.version++,this._transmission=e}copy(e){return super.copy(e),this.defines={STANDARD:"",PHYSICAL:""},this.anisotropy=e.anisotropy,this.anisotropyRotation=e.anisotropyRotation,this.anisotropyMap=e.anisotropyMap,this.clearcoat=e.clearcoat,this.clearcoatMap=e.clearcoatMap,this.clearcoatRoughness=e.clearcoatRoughness,this.clearcoatRoughnessMap=e.clearcoatRoughnessMap,this.clearcoatNormalMap=e.clearcoatNormalMap,this.clearcoatNormalScale.copy(e.clearcoatNormalScale),this.dispersion=e.dispersion,this.ior=e.ior,this.iridescence=e.iridescence,this.iridescenceMap=e.iridescenceMap,this.iridescenceIOR=e.iridescenceIOR,this.iridescenceThicknessRange=[...e.iridescenceThicknessRange],this.iridescenceThicknessMap=e.iridescenceThicknessMap,this.sheen=e.sheen,this.sheenColor.copy(e.sheenColor),this.sheenColorMap=e.sheenColorMap,this.sheenRoughness=e.sheenRoughness,this.sheenRoughnessMap=e.sheenRoughnessMap,this.transmission=e.transmission,this.transmissionMap=e.transmissionMap,this.thickness=e.thickness,this.thicknessMap=e.thicknessMap,this.attenuationDistance=e.attenuationDistance,this.attenuationColor.copy(e.attenuationColor),this.specularIntensity=e.specularIntensity,this.specularIntensityMap=e.specularIntensityMap,this.specularColor.copy(e.specularColor),this.specularColorMap=e.specularColorMap,this}},sa=class extends yt{constructor(e){super(),this.isMeshPhongMaterial=!0,this.type="MeshPhongMaterial",this.color=new ge(16777215),this.specular=new ge(1118481),this.shininess=30,this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new ge(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=ai,this.normalScale=new be(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new An,this.combine=zr,this.reflectivity=1,this.envMapIntensity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.specular.copy(e.specular),this.shininess=e.shininess,this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.emissive.copy(e.emissive),this.emissiveMap=e.emissiveMap,this.emissiveIntensity=e.emissiveIntensity,this.bumpMap=e.bumpMap,this.bumpScale=e.bumpScale,this.normalMap=e.normalMap,this.normalMapType=e.normalMapType,this.normalScale.copy(e.normalScale),this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.combine=e.combine,this.reflectivity=e.reflectivity,this.envMapIntensity=e.envMapIntensity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.flatShading=e.flatShading,this.fog=e.fog,this}},ra=class extends yt{constructor(e){super(),this.isMeshToonMaterial=!0,this.defines={TOON:""},this.type="MeshToonMaterial",this.color=new ge(16777215),this.map=null,this.gradientMap=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new ge(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=ai,this.normalScale=new be(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.alphaMap=null,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.gradientMap=e.gradientMap,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.emissive.copy(e.emissive),this.emissiveMap=e.emissiveMap,this.emissiveIntensity=e.emissiveIntensity,this.bumpMap=e.bumpMap,this.bumpScale=e.bumpScale,this.normalMap=e.normalMap,this.normalMapType=e.normalMapType,this.normalScale.copy(e.normalScale),this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.alphaMap=e.alphaMap,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.fog=e.fog,this}},oa=class extends yt{constructor(e){super(),this.isMeshNormalMaterial=!0,this.type="MeshNormalMaterial",this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=ai,this.normalScale=new be(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.flatShading=!1,this.setValues(e)}copy(e){return super.copy(e),this.bumpMap=e.bumpMap,this.bumpScale=e.bumpScale,this.normalMap=e.normalMap,this.normalMapType=e.normalMapType,this.normalScale.copy(e.normalScale),this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.flatShading=e.flatShading,this}},Hs=class extends yt{constructor(e){super(),this.isMeshLambertMaterial=!0,this.type="MeshLambertMaterial",this.color=new ge(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new ge(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=ai,this.normalScale=new be(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new An,this.combine=zr,this.reflectivity=1,this.envMapIntensity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.emissive.copy(e.emissive),this.emissiveMap=e.emissiveMap,this.emissiveIntensity=e.emissiveIntensity,this.bumpMap=e.bumpMap,this.bumpScale=e.bumpScale,this.normalMap=e.normalMap,this.normalMapType=e.normalMapType,this.normalScale.copy(e.normalScale),this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.combine=e.combine,this.reflectivity=e.reflectivity,this.envMapIntensity=e.envMapIntensity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.flatShading=e.flatShading,this.fog=e.fog,this}},Qi=class extends yt{constructor(e){super(),this.isMeshDepthMaterial=!0,this.type="MeshDepthMaterial",this.depthPacking=du,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(e)}copy(e){return super.copy(e),this.depthPacking=e.depthPacking,this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this}},Cr=class extends yt{constructor(e){super(),this.isMeshDistanceMaterial=!0,this.type="MeshDistanceMaterial",this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(e)}copy(e){return super.copy(e),this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this}},aa=class extends yt{constructor(e){super(),this.isMeshMatcapMaterial=!0,this.defines={MATCAP:""},this.type="MeshMatcapMaterial",this.color=new ge(16777215),this.matcap=null,this.map=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=ai,this.normalScale=new be(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.alphaMap=null,this.wireframe=!1,this.wireframeLinewidth=1,this.flatShading=!1,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.defines={MATCAP:""},this.color.copy(e.color),this.matcap=e.matcap,this.map=e.map,this.bumpMap=e.bumpMap,this.bumpScale=e.bumpScale,this.normalMap=e.normalMap,this.normalMapType=e.normalMapType,this.normalScale.copy(e.normalScale),this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.alphaMap=e.alphaMap,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.flatShading=e.flatShading,this.fog=e.fog,this}},ca=class extends Ai{constructor(e){super(),this.isLineDashedMaterial=!0,this.type="LineDashedMaterial",this.scale=1,this.dashSize=3,this.gapSize=1,this.setValues(e)}copy(e){return super.copy(e),this.scale=e.scale,this.dashSize=e.dashSize,this.gapSize=e.gapSize,this}};function No(i,e){return!i||i.constructor===e?i:typeof e.BYTES_PER_ELEMENT=="number"?new e(i):Array.prototype.slice.call(i)}function Ff(i){function e(s,r){return i[s]-i[r]}let t=i.length,n=new Array(t);for(let s=0;s!==t;++s)n[s]=s;return n.sort(e),n}function Uh(i,e,t){let n=i.length,s=new i.constructor(n);for(let r=0,o=0;o!==n;++r){let a=t[r]*e;for(let c=0;c!==e;++c)s[o++]=i[a+c]}return s}function Au(i,e,t,n){let s=1,r=i[0];for(;r!==void 0&&r[n]===void 0;)r=i[s++];if(r===void 0)return;let o=r[n];if(o!==void 0)if(Array.isArray(o))do o=r[n],o!==void 0&&(e.push(r.time),t.push(...o)),r=i[s++];while(r!==void 0);else if(o.toArray!==void 0)do o=r[n],o!==void 0&&(e.push(r.time),o.toArray(t,t.length)),r=i[s++];while(r!==void 0);else do o=r[n],o!==void 0&&(e.push(r.time),t.push(o)),r=i[s++];while(r!==void 0)}var On=class{constructor(e,t,n,s){this.parameterPositions=e,this._cachedIndex=0,this.resultBuffer=s!==void 0?s:new t.constructor(n),this.sampleValues=t,this.valueSize=n,this.settings=null,this.DefaultSettings_={}}evaluate(e){let t=this.parameterPositions,n=this._cachedIndex,s=t[n],r=t[n-1];n:{e:{let o;t:{i:if(!(e<s)){for(let a=n+2;;){if(s===void 0){if(e<r)break i;return n=t.length,this._cachedIndex=n,this.copySampleValue_(n-1)}if(n===a)break;if(r=s,s=t[++n],e<s)break e}o=t.length;break t}if(!(e>=r)){let a=t[1];e<a&&(n=2,r=a);for(let c=n-2;;){if(r===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(n===c)break;if(s=r,r=t[--n-1],e>=r)break e}o=n,n=0;break t}break n}for(;n<o;){let a=n+o>>>1;e<t[a]?o=a:n=a+1}if(s=t[n],r=t[n-1],r===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(s===void 0)return n=t.length,this._cachedIndex=n,this.copySampleValue_(n-1)}this._cachedIndex=n,this.intervalChanged_(n,r,s)}return this.interpolate_(n,r,e,s)}getSettings_(){return this.settings||this.DefaultSettings_}copySampleValue_(e){let t=this.resultBuffer,n=this.sampleValues,s=this.valueSize,r=e*s;for(let o=0;o!==s;++o)t[o]=n[r+o];return t}interpolate_(){throw new Error("call to abstract method")}intervalChanged_(){}},la=class extends On{constructor(e,t,n,s){super(e,t,n,s),this._weightPrev=-0,this._offsetPrev=-0,this._weightNext=-0,this._offsetNext=-0,this.DefaultSettings_={endingStart:rl,endingEnd:rl}}intervalChanged_(e,t,n){let s=this.parameterPositions,r=e-2,o=e+1,a=s[r],c=s[o];if(a===void 0)switch(this.getSettings_().endingStart){case ol:r=e,a=2*t-n;break;case al:r=s.length-2,a=t+s[r]-s[r+1];break;default:r=e,a=n}if(c===void 0)switch(this.getSettings_().endingEnd){case ol:o=e,c=2*n-t;break;case al:o=1,c=n+s[1]-s[0];break;default:o=e-1,c=t}let l=(n-t)*.5,u=this.valueSize;this._weightPrev=l/(t-a),this._weightNext=l/(c-n),this._offsetPrev=r*u,this._offsetNext=o*u}interpolate_(e,t,n,s){let r=this.resultBuffer,o=this.sampleValues,a=this.valueSize,c=e*a,l=c-a,u=this._offsetPrev,d=this._offsetNext,h=this._weightPrev,p=this._weightNext,g=(n-t)/(s-t),v=g*g,m=v*g,f=-h*m+2*h*v-h*g,_=(1+h)*m+(-1.5-2*h)*v+(-.5+h)*g+1,b=(-1-p)*m+(1.5+p)*v+.5*g,S=p*m-p*v;for(let E=0;E!==a;++E)r[E]=f*o[u+E]+_*o[l+E]+b*o[c+E]+S*o[d+E];return r}},ha=class extends On{constructor(e,t,n,s){super(e,t,n,s)}interpolate_(e,t,n,s){let r=this.resultBuffer,o=this.sampleValues,a=this.valueSize,c=e*a,l=c-a,u=(n-t)/(s-t),d=1-u;for(let h=0;h!==a;++h)r[h]=o[l+h]*d+o[c+h]*u;return r}},ua=class extends On{constructor(e,t,n,s){super(e,t,n,s)}interpolate_(e){return this.copySampleValue_(e-1)}},da=class extends On{interpolate_(e,t,n,s){let r=this.resultBuffer,o=this.sampleValues,a=this.valueSize,c=e*a,l=c-a,u=this.settings||this.DefaultSettings_,d=u.inTangents,h=u.outTangents;if(!d||!h){let v=(n-t)/(s-t),m=1-v;for(let f=0;f!==a;++f)r[f]=o[l+f]*m+o[c+f]*v;return r}let p=a*2,g=e-1;for(let v=0;v!==a;++v){let m=o[l+v],f=o[c+v],_=g*p+v*2,b=h[_],S=h[_+1],E=e*p+v*2,w=d[E],C=d[E+1],y=(n-t)/(s-t),A,I,R,O,G;for(let X=0;X<8;X++){A=y*y,I=A*y,R=1-y,O=R*R,G=O*R;let F=G*t+3*O*y*b+3*R*A*w+I*s-n;if(Math.abs(F)<1e-10)break;let V=3*O*(b-t)+6*R*y*(w-b)+3*A*(s-w);if(Math.abs(V)<1e-10)break;y=y-F/V,y=Math.max(0,Math.min(1,y))}r[v]=G*m+3*O*y*S+3*R*A*C+I*f}return r}},Qt=class{constructor(e,t,n,s){if(e===void 0)throw new Error("THREE.KeyframeTrack: track name is undefined");if(t===void 0||t.length===0)throw new Error("THREE.KeyframeTrack: no keyframes in track named "+e);this.name=e,this.times=No(t,this.TimeBufferType),this.values=No(n,this.ValueBufferType),this.setInterpolation(s||this.DefaultInterpolation)}static toJSON(e){let t=e.constructor,n;if(t.toJSON!==this.toJSON)n=t.toJSON(e);else{n={name:e.name,times:No(e.times,Array),values:No(e.values,Array)};let s=e.getInterpolation();s!==e.DefaultInterpolation&&(n.interpolation=s)}return n.type=e.ValueTypeName,n}InterpolantFactoryMethodDiscrete(e){return new ua(this.times,this.values,this.getValueSize(),e)}InterpolantFactoryMethodLinear(e){return new ha(this.times,this.values,this.getValueSize(),e)}InterpolantFactoryMethodSmooth(e){return new la(this.times,this.values,this.getValueSize(),e)}InterpolantFactoryMethodBezier(e){let t=new da(this.times,this.values,this.getValueSize(),e);return this.settings&&(t.settings=this.settings),t}setInterpolation(e){let t;switch(e){case Xi:t=this.InterpolantFactoryMethodDiscrete;break;case qi:t=this.InterpolantFactoryMethodLinear;break;case Oo:t=this.InterpolantFactoryMethodSmooth;break;case sl:t=this.InterpolantFactoryMethodBezier;break}if(t===void 0){let n="unsupported interpolation for "+this.ValueTypeName+" keyframe track named "+this.name;if(this.createInterpolant===void 0)if(e!==this.DefaultInterpolation)this.setInterpolation(this.DefaultInterpolation);else throw new Error(n);return ve("KeyframeTrack:",n),this}return this.createInterpolant=t,this}getInterpolation(){switch(this.createInterpolant){case this.InterpolantFactoryMethodDiscrete:return Xi;case this.InterpolantFactoryMethodLinear:return qi;case this.InterpolantFactoryMethodSmooth:return Oo;case this.InterpolantFactoryMethodBezier:return sl}}getValueSize(){return this.values.length/this.times.length}shift(e){if(e!==0){let t=this.times;for(let n=0,s=t.length;n!==s;++n)t[n]+=e}return this}scale(e){if(e!==1){let t=this.times;for(let n=0,s=t.length;n!==s;++n)t[n]*=e}return this}trim(e,t){let n=this.times,s=n.length,r=0,o=s-1;for(;r!==s&&n[r]<e;)++r;for(;o!==-1&&n[o]>t;)--o;if(++o,r!==0||o!==s){r>=o&&(o=Math.max(o,1),r=o-1);let a=this.getValueSize();this.times=n.slice(r,o),this.values=this.values.slice(r*a,o*a)}return this}validate(){let e=!0,t=this.getValueSize();t-Math.floor(t)!==0&&(Ee("KeyframeTrack: Invalid value size in track.",this),e=!1);let n=this.times,s=this.values,r=n.length;r===0&&(Ee("KeyframeTrack: Track is empty.",this),e=!1);let o=null;for(let a=0;a!==r;a++){let c=n[a];if(typeof c=="number"&&isNaN(c)){Ee("KeyframeTrack: Time is not a valid number.",this,a,c),e=!1;break}if(o!==null&&o>c){Ee("KeyframeTrack: Out of order keys.",this,a,c,o),e=!1;break}o=c}if(s!==void 0&&Zd(s))for(let a=0,c=s.length;a!==c;++a){let l=s[a];if(isNaN(l)){Ee("KeyframeTrack: Value is not a valid number.",this,a,l),e=!1;break}}return e}optimize(){let e=this.times.slice(),t=this.values.slice(),n=this.getValueSize(),s=this.getInterpolation()===Oo,r=e.length-1,o=1;for(let a=1;a<r;++a){let c=!1,l=e[a],u=e[a+1];if(l!==u&&(a!==1||l!==e[0]))if(s)c=!0;else{let d=a*n,h=d-n,p=d+n;for(let g=0;g!==n;++g){let v=t[d+g];if(v!==t[h+g]||v!==t[p+g]){c=!0;break}}}if(c){if(a!==o){e[o]=e[a];let d=a*n,h=o*n;for(let p=0;p!==n;++p)t[h+p]=t[d+p]}++o}}if(r>0){e[o]=e[r];for(let a=r*n,c=o*n,l=0;l!==n;++l)t[c+l]=t[a+l];++o}return o!==e.length?(this.times=e.slice(0,o),this.values=t.slice(0,o*n)):(this.times=e,this.values=t),this}clone(){let e=this.times.slice(),t=this.values.slice(),n=this.constructor,s=new n(this.name,e,t);return s.createInterpolant=this.createInterpolant,s}};Qt.prototype.ValueTypeName="";Qt.prototype.TimeBufferType=Float32Array;Qt.prototype.ValueBufferType=Float32Array;Qt.prototype.DefaultInterpolation=qi;var si=class extends Qt{constructor(e,t,n){super(e,t,n)}};si.prototype.ValueTypeName="bool";si.prototype.ValueBufferType=Array;si.prototype.DefaultInterpolation=Xi;si.prototype.InterpolantFactoryMethodLinear=void 0;si.prototype.InterpolantFactoryMethodSmooth=void 0;var Ir=class extends Qt{constructor(e,t,n,s){super(e,t,n,s)}};Ir.prototype.ValueTypeName="color";var Bn=class extends Qt{constructor(e,t,n,s){super(e,t,n,s)}};Bn.prototype.ValueTypeName="number";var fa=class extends On{constructor(e,t,n,s){super(e,t,n,s)}interpolate_(e,t,n,s){let r=this.resultBuffer,o=this.sampleValues,a=this.valueSize,c=(n-t)/(s-t),l=e*a;for(let u=l+a;l!==u;l+=4)Gt.slerpFlat(r,0,o,l-a,o,l,c);return r}},kn=class extends Qt{constructor(e,t,n,s){super(e,t,n,s)}InterpolantFactoryMethodLinear(e){return new fa(this.times,this.values,this.getValueSize(),e)}};kn.prototype.ValueTypeName="quaternion";kn.prototype.InterpolantFactoryMethodSmooth=void 0;var ri=class extends Qt{constructor(e,t,n){super(e,t,n)}};ri.prototype.ValueTypeName="string";ri.prototype.ValueBufferType=Array;ri.prototype.DefaultInterpolation=Xi;ri.prototype.InterpolantFactoryMethodLinear=void 0;ri.prototype.InterpolantFactoryMethodSmooth=void 0;var zn=class extends Qt{constructor(e,t,n,s){super(e,t,n,s)}};zn.prototype.ValueTypeName="vector";var Pr=class{constructor(e="",t=-1,n=[],s=uu){this.name=e,this.tracks=n,this.duration=t,this.blendMode=s,this.uuid=Tn(),this.userData={},this.duration<0&&this.resetDuration()}static parse(e){let t=[],n=e.tracks,s=1/(e.fps||1);for(let o=0,a=n.length;o!==a;++o)t.push(Bf(n[o]).scale(s));let r=new this(e.name,e.duration,t,e.blendMode);return r.uuid=e.uuid,r.userData=JSON.parse(e.userData||"{}"),r}static toJSON(e){let t=[],n=e.tracks,s={name:e.name,duration:e.duration,tracks:t,uuid:e.uuid,blendMode:e.blendMode,userData:JSON.stringify(e.userData)};for(let r=0,o=n.length;r!==o;++r)t.push(Qt.toJSON(n[r]));return s}static CreateFromMorphTargetSequence(e,t,n,s){let r=t.length,o=[];for(let a=0;a<r;a++){let c=[],l=[];c.push((a+r-1)%r,a,(a+1)%r),l.push(0,1,0);let u=Ff(c);c=Uh(c,1,u),l=Uh(l,1,u),!s&&c[0]===0&&(c.push(r),l.push(l[0])),o.push(new Bn(".morphTargetInfluences["+t[a].name+"]",c,l).scale(1/n))}return new this(e,-1,o)}static findByName(e,t){let n=e;if(!Array.isArray(e)){let s=e;n=s.geometry&&s.geometry.animations||s.animations}for(let s=0;s<n.length;s++)if(n[s].name===t)return n[s];return null}static CreateClipsFromMorphTargetSequences(e,t,n){let s={},r=/^([\w-]*?)([\d]+)$/;for(let a=0,c=e.length;a<c;a++){let l=e[a],u=l.name.match(r);if(u&&u.length>1){let d=u[1],h=s[d];h||(s[d]=h=[]),h.push(l)}}let o=[];for(let a in s)o.push(this.CreateFromMorphTargetSequence(a,s[a],t,n));return o}static parseAnimation(e,t){if(ve("AnimationClip: parseAnimation() is deprecated and will be removed with r185"),!e)return Ee("AnimationClip: No animation in JSONLoader data."),null;let n=function(d,h,p,g,v){if(p.length!==0){let m=[],f=[];Au(p,m,f,g),m.length!==0&&v.push(new d(h,m,f))}},s=[],r=e.name||"default",o=e.fps||30,a=e.blendMode,c=e.length||-1,l=e.hierarchy||[];for(let d=0;d<l.length;d++){let h=l[d].keys;if(!(!h||h.length===0))if(h[0].morphTargets){let p={},g;for(g=0;g<h.length;g++)if(h[g].morphTargets)for(let v=0;v<h[g].morphTargets.length;v++)p[h[g].morphTargets[v]]=-1;for(let v in p){let m=[],f=[];for(let _=0;_!==h[g].morphTargets.length;++_){let b=h[g];m.push(b.time),f.push(b.morphTarget===v?1:0)}s.push(new Bn(".morphTargetInfluence["+v+"]",m,f))}c=p.length*o}else{let p=".bones["+t[d].name+"]";n(zn,p+".position",h,"pos",s),n(kn,p+".quaternion",h,"rot",s),n(zn,p+".scale",h,"scl",s)}}return s.length===0?null:new this(r,c,s,a)}resetDuration(){let e=this.tracks,t=0;for(let n=0,s=e.length;n!==s;++n){let r=this.tracks[n];t=Math.max(t,r.times[r.times.length-1])}return this.duration=t,this}trim(){for(let e=0;e<this.tracks.length;e++)this.tracks[e].trim(0,this.duration);return this}validate(){let e=!0;for(let t=0;t<this.tracks.length;t++)e=e&&this.tracks[t].validate();return e}optimize(){for(let e=0;e<this.tracks.length;e++)this.tracks[e].optimize();return this}clone(){let e=[];for(let n=0;n<this.tracks.length;n++)e.push(this.tracks[n].clone());let t=new this.constructor(this.name,this.duration,e,this.blendMode);return t.userData=JSON.parse(JSON.stringify(this.userData)),t}toJSON(){return this.constructor.toJSON(this)}};function Of(i){switch(i.toLowerCase()){case"scalar":case"double":case"float":case"number":case"integer":return Bn;case"vector":case"vector2":case"vector3":case"vector4":return zn;case"color":return Ir;case"quaternion":return kn;case"bool":case"boolean":return si;case"string":return ri}throw new Error("THREE.KeyframeTrack: Unsupported typeName: "+i)}function Bf(i){if(i.type===void 0)throw new Error("THREE.KeyframeTrack: track type undefined, can not parse");let e=Of(i.type);if(i.times===void 0){let t=[],n=[];Au(i.keys,t,n,"value"),i.times=t,i.values=n}return e.parse!==void 0?e.parse(i):new e(i.name,i.times,i.values,i.interpolation)}var Un={enabled:!1,files:{},add:function(i,e){this.enabled!==!1&&(Fh(i)||(this.files[i]=e))},get:function(i){if(this.enabled!==!1&&!Fh(i))return this.files[i]},remove:function(i){delete this.files[i]},clear:function(){this.files={}}};function Fh(i){try{let e=i.slice(i.indexOf(":")+1);return new URL(e).protocol==="blob:"}catch{return!1}}var pa=class{constructor(e,t,n){let s=this,r=!1,o=0,a=0,c,l=[];this.onStart=void 0,this.onLoad=e,this.onProgress=t,this.onError=n,this._abortController=null,this.itemStart=function(u){a++,r===!1&&s.onStart!==void 0&&s.onStart(u,o,a),r=!0},this.itemEnd=function(u){o++,s.onProgress!==void 0&&s.onProgress(u,o,a),o===a&&(r=!1,s.onLoad!==void 0&&s.onLoad())},this.itemError=function(u){s.onError!==void 0&&s.onError(u)},this.resolveURL=function(u){return c?c(u):u},this.setURLModifier=function(u){return c=u,this},this.addHandler=function(u,d){return l.push(u,d),this},this.removeHandler=function(u){let d=l.indexOf(u);return d!==-1&&l.splice(d,2),this},this.getHandler=function(u){for(let d=0,h=l.length;d<h;d+=2){let p=l[d],g=l[d+1];if(p.global&&(p.lastIndex=0),p.test(u))return g}return null},this.abort=function(){return this.abortController.abort(),this._abortController=null,this}}get abortController(){return this._abortController||(this._abortController=new AbortController),this._abortController}},Eu=new pa,En=class{constructor(e){this.manager=e!==void 0?e:Eu,this.crossOrigin="anonymous",this.withCredentials=!1,this.path="",this.resourcePath="",this.requestHeader={},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}load(){}loadAsync(e,t){let n=this;return new Promise(function(s,r){n.load(e,s,t,r)})}parse(){}setCrossOrigin(e){return this.crossOrigin=e,this}setWithCredentials(e){return this.withCredentials=e,this}setPath(e){return this.path=e,this}setResourcePath(e){return this.resourcePath=e,this}setRequestHeader(e){return this.requestHeader=e,this}abort(){return this}};En.DEFAULT_MATERIAL_NAME="__DEFAULT";var ei={},hl=class extends Error{constructor(e,t){super(e),this.response=t}},es=class extends En{constructor(e){super(e),this.mimeType="",this.responseType="",this._abortController=new AbortController}load(e,t,n,s){e===void 0&&(e=""),this.path!==void 0&&(e=this.path+e),e=this.manager.resolveURL(e);let r=Un.get(`file:${e}`);if(r!==void 0){this.manager.itemStart(e),setTimeout(()=>{t&&t(r),this.manager.itemEnd(e)},0);return}if(ei[e]!==void 0){ei[e].push({onLoad:t,onProgress:n,onError:s});return}ei[e]=[],ei[e].push({onLoad:t,onProgress:n,onError:s});let o=new Request(e,{headers:new Headers(this.requestHeader),credentials:this.withCredentials?"include":"same-origin",signal:typeof AbortSignal.any=="function"?AbortSignal.any([this._abortController.signal,this.manager.abortController.signal]):this._abortController.signal}),a=this.mimeType,c=this.responseType;fetch(o).then(l=>{if(l.status===200||l.status===0){if(l.status===0&&ve("FileLoader: HTTP Status 0 received."),typeof ReadableStream>"u"||l.body===void 0||l.body.getReader===void 0)return l;let u=ei[e],d=l.body.getReader(),h=l.headers.get("X-File-Size")||l.headers.get("Content-Length"),p=h?parseInt(h):0,g=p!==0,v=0,m=new ReadableStream({start(f){_();function _(){d.read().then(({done:b,value:S})=>{if(b)f.close();else{v+=S.byteLength;let E=new ProgressEvent("progress",{lengthComputable:g,loaded:v,total:p});for(let w=0,C=u.length;w<C;w++){let y=u[w];y.onProgress&&y.onProgress(E)}f.enqueue(S),_()}},b=>{f.error(b)})}}});return new Response(m)}else throw new hl(`fetch for "${l.url}" responded with ${l.status}: ${l.statusText}`,l)}).then(l=>{switch(c){case"arraybuffer":return l.arrayBuffer();case"blob":return l.blob();case"document":return l.text().then(u=>new DOMParser().parseFromString(u,a));case"json":return l.json();default:if(a==="")return l.text();{let d=/charset="?([^;"\s]*)"?/i.exec(a),h=d&&d[1]?d[1].toLowerCase():void 0,p=new TextDecoder(h);return l.arrayBuffer().then(g=>p.decode(g))}}}).then(l=>{Un.add(`file:${e}`,l);let u=ei[e];delete ei[e];for(let d=0,h=u.length;d<h;d++){let p=u[d];p.onLoad&&p.onLoad(l)}}).catch(l=>{let u=ei[e];if(u===void 0)throw this.manager.itemError(e),l;delete ei[e];for(let d=0,h=u.length;d<h;d++){let p=u[d];p.onError&&p.onError(l)}this.manager.itemError(e)}).finally(()=>{this.manager.itemEnd(e)}),this.manager.itemStart(e)}setResponseType(e){return this.responseType=e,this}setMimeType(e){return this.mimeType=e,this}abort(){return this._abortController.abort(),this._abortController=new AbortController,this}};var Es=new WeakMap,ma=class extends En{constructor(e){super(e)}load(e,t,n,s){this.path!==void 0&&(e=this.path+e),e=this.manager.resolveURL(e);let r=this,o=Un.get(`image:${e}`);if(o!==void 0){if(o.complete===!0)r.manager.itemStart(e),setTimeout(function(){t&&t(o),r.manager.itemEnd(e)},0);else{let d=Es.get(o);d===void 0&&(d=[],Es.set(o,d)),d.push({onLoad:t,onError:s})}return o}let a=Ds("img");function c(){u(),t&&t(this);let d=Es.get(this)||[];for(let h=0;h<d.length;h++){let p=d[h];p.onLoad&&p.onLoad(this)}Es.delete(this),r.manager.itemEnd(e)}function l(d){u(),s&&s(d),Un.remove(`image:${e}`);let h=Es.get(this)||[];for(let p=0;p<h.length;p++){let g=h[p];g.onError&&g.onError(d)}Es.delete(this),r.manager.itemError(e),r.manager.itemEnd(e)}function u(){a.removeEventListener("load",c,!1),a.removeEventListener("error",l,!1)}return a.addEventListener("load",c,!1),a.addEventListener("error",l,!1),e.slice(0,5)!=="data:"&&this.crossOrigin!==void 0&&(a.crossOrigin=this.crossOrigin),Un.add(`image:${e}`,a),r.manager.itemStart(e),a.src=e,a}};var Lr=class extends En{constructor(e){super(e)}load(e,t,n,s){let r=new Ot,o=new ma(this.manager);return o.setCrossOrigin(this.crossOrigin),o.setPath(this.path),o.load(e,function(a){r.image=a,r.needsUpdate=!0,t!==void 0&&t(r)},n,s),r}},ts=class extends lt{constructor(e,t=1){super(),this.isLight=!0,this.type="Light",this.color=new ge(e),this.intensity=t}dispose(){this.dispatchEvent({type:"dispose"})}copy(e,t){return super.copy(e,t),this.color.copy(e.color),this.intensity=e.intensity,this}toJSON(e){let t=super.toJSON(e);return t.object.color=this.color.getHex(),t.object.intensity=this.intensity,t}},Dr=class extends ts{constructor(e,t,n){super(e,n),this.isHemisphereLight=!0,this.type="HemisphereLight",this.position.copy(lt.DEFAULT_UP),this.updateMatrix(),this.groundColor=new ge(t)}copy(e,t){return super.copy(e,t),this.groundColor.copy(e.groundColor),this}toJSON(e){let t=super.toJSON(e);return t.object.groundColor=this.groundColor.getHex(),t}},tl=new Ue,Oh=new L,Bh=new L,Nr=class{constructor(e){this.camera=e,this.intensity=1,this.bias=0,this.biasNode=null,this.normalBias=0,this.radius=1,this.blurSamples=8,this.mapSize=new be(512,512),this.mapType=Wt,this.map=null,this.mapPass=null,this.matrix=new Ue,this.autoUpdate=!0,this.needsUpdate=!1,this._frustum=new zs,this._frameExtents=new be(1,1),this._viewportCount=1,this._viewports=[new $e(0,0,1,1)]}getViewportCount(){return this._viewportCount}getFrustum(){return this._frustum}updateMatrices(e){let t=this.camera,n=this.matrix;Oh.setFromMatrixPosition(e.matrixWorld),t.position.copy(Oh),Bh.setFromMatrixPosition(e.target.matrixWorld),t.lookAt(Bh),t.updateMatrixWorld(),tl.multiplyMatrices(t.projectionMatrix,t.matrixWorldInverse),this._frustum.setFromProjectionMatrix(tl,t.coordinateSystem,t.reversedDepth),t.coordinateSystem===Ls||t.reversedDepth?n.set(.5,0,0,.5,0,.5,0,.5,0,0,1,0,0,0,0,1):n.set(.5,0,0,.5,0,.5,0,.5,0,0,.5,.5,0,0,0,1),n.multiply(tl)}getViewport(e){return this._viewports[e]}getFrameExtents(){return this._frameExtents}dispose(){this.map&&this.map.dispose(),this.mapPass&&this.mapPass.dispose()}copy(e){return this.camera=e.camera.clone(),this.intensity=e.intensity,this.bias=e.bias,this.radius=e.radius,this.autoUpdate=e.autoUpdate,this.needsUpdate=e.needsUpdate,this.normalBias=e.normalBias,this.blurSamples=e.blurSamples,this.mapSize.copy(e.mapSize),this.biasNode=e.biasNode,this}clone(){return new this.constructor().copy(this)}toJSON(){let e={};return this.intensity!==1&&(e.intensity=this.intensity),this.bias!==0&&(e.bias=this.bias),this.normalBias!==0&&(e.normalBias=this.normalBias),this.radius!==1&&(e.radius=this.radius),(this.mapSize.x!==512||this.mapSize.y!==512)&&(e.mapSize=this.mapSize.toArray()),e.camera=this.camera.toJSON(!1).object,delete e.camera.matrix,e}},Uo=new L,Fo=new Gt,Nn=new L,Ur=class extends lt{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new Ue,this.projectionMatrix=new Ue,this.projectionMatrixInverse=new Ue,this.coordinateSystem=Sn,this._reversedDepth=!1}get reversedDepth(){return this._reversedDepth}copy(e,t){return super.copy(e,t),this.matrixWorldInverse.copy(e.matrixWorldInverse),this.projectionMatrix.copy(e.projectionMatrix),this.projectionMatrixInverse.copy(e.projectionMatrixInverse),this.coordinateSystem=e.coordinateSystem,this}getWorldDirection(e){return super.getWorldDirection(e).negate()}updateMatrixWorld(e){super.updateMatrixWorld(e),this.matrixWorld.decompose(Uo,Fo,Nn),Nn.x===1&&Nn.y===1&&Nn.z===1?this.matrixWorldInverse.copy(this.matrixWorld).invert():this.matrixWorldInverse.compose(Uo,Fo,Nn.set(1,1,1)).invert()}updateWorldMatrix(e,t){super.updateWorldMatrix(e,t),this.matrixWorld.decompose(Uo,Fo,Nn),Nn.x===1&&Nn.y===1&&Nn.z===1?this.matrixWorldInverse.copy(this.matrixWorld).invert():this.matrixWorldInverse.compose(Uo,Fo,Nn.set(1,1,1)).invert()}clone(){return new this.constructor().copy(this)}},vi=new L,kh=new be,zh=new be,At=class extends Ur{constructor(e=50,t=1,n=.1,s=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=e,this.zoom=1,this.near=n,this.far=s,this.focus=10,this.aspect=t,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.fov=e.fov,this.zoom=e.zoom,this.near=e.near,this.far=e.far,this.focus=e.focus,this.aspect=e.aspect,this.view=e.view===null?null:Object.assign({},e.view),this.filmGauge=e.filmGauge,this.filmOffset=e.filmOffset,this}setFocalLength(e){let t=.5*this.getFilmHeight()/e;this.fov=Yi*2*Math.atan(t),this.updateProjectionMatrix()}getFocalLength(){let e=Math.tan(fr*.5*this.fov);return .5*this.getFilmHeight()/e}getEffectiveFOV(){return Yi*2*Math.atan(Math.tan(fr*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(e,t,n){vi.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),t.set(vi.x,vi.y).multiplyScalar(-e/vi.z),vi.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),n.set(vi.x,vi.y).multiplyScalar(-e/vi.z)}getViewSize(e,t){return this.getViewBounds(e,kh,zh),t.subVectors(zh,kh)}setViewOffset(e,t,n,s,r,o){this.aspect=e/t,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=n,this.view.offsetY=s,this.view.width=r,this.view.height=o,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){let e=this.near,t=e*Math.tan(fr*.5*this.fov)/this.zoom,n=2*t,s=this.aspect*n,r=-.5*s,o=this.view;if(this.view!==null&&this.view.enabled){let c=o.fullWidth,l=o.fullHeight;r+=o.offsetX*s/c,t-=o.offsetY*n/l,s*=o.width/c,n*=o.height/l}let a=this.filmOffset;a!==0&&(r+=e*a/this.getFilmWidth()),this.projectionMatrix.makePerspective(r,r+s,t,t-n,e,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){let t=super.toJSON(e);return t.object.fov=this.fov,t.object.zoom=this.zoom,t.object.near=this.near,t.object.far=this.far,t.object.focus=this.focus,t.object.aspect=this.aspect,this.view!==null&&(t.object.view=Object.assign({},this.view)),t.object.filmGauge=this.filmGauge,t.object.filmOffset=this.filmOffset,t}},ul=class extends Nr{constructor(){super(new At(50,1,.5,500)),this.isSpotLightShadow=!0,this.focus=1,this.aspect=1}updateMatrices(e){let t=this.camera,n=Yi*2*e.angle*this.focus,s=this.mapSize.width/this.mapSize.height*this.aspect,r=e.distance||t.far;(n!==t.fov||s!==t.aspect||r!==t.far)&&(t.fov=n,t.aspect=s,t.far=r,t.updateProjectionMatrix()),super.updateMatrices(e)}copy(e){return super.copy(e),this.focus=e.focus,this}},Fr=class extends ts{constructor(e,t,n=0,s=Math.PI/3,r=0,o=2){super(e,t),this.isSpotLight=!0,this.type="SpotLight",this.position.copy(lt.DEFAULT_UP),this.updateMatrix(),this.target=new lt,this.distance=n,this.angle=s,this.penumbra=r,this.decay=o,this.map=null,this.shadow=new ul}get power(){return this.intensity*Math.PI}set power(e){this.intensity=e/Math.PI}dispose(){super.dispose(),this.shadow.dispose()}copy(e,t){return super.copy(e,t),this.distance=e.distance,this.angle=e.angle,this.penumbra=e.penumbra,this.decay=e.decay,this.target=e.target.clone(),this.map=e.map,this.shadow=e.shadow.clone(),this}toJSON(e){let t=super.toJSON(e);return t.object.distance=this.distance,t.object.angle=this.angle,t.object.decay=this.decay,t.object.penumbra=this.penumbra,t.object.target=this.target.uuid,this.map&&this.map.isTexture&&(t.object.map=this.map.toJSON(e).uuid),t.object.shadow=this.shadow.toJSON(),t}},dl=class extends Nr{constructor(){super(new At(90,1,.5,500)),this.isPointLightShadow=!0}},ns=class extends ts{constructor(e,t,n=0,s=2){super(e,t),this.isPointLight=!0,this.type="PointLight",this.distance=n,this.decay=s,this.shadow=new dl}get power(){return this.intensity*4*Math.PI}set power(e){this.intensity=e/(4*Math.PI)}dispose(){super.dispose(),this.shadow.dispose()}copy(e,t){return super.copy(e,t),this.distance=e.distance,this.decay=e.decay,this.shadow=e.shadow.clone(),this}toJSON(e){let t=super.toJSON(e);return t.object.distance=this.distance,t.object.decay=this.decay,t.object.shadow=this.shadow.toJSON(),t}},Ri=class extends Ur{constructor(e=-1,t=1,n=1,s=-1,r=.1,o=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=e,this.right=t,this.top=n,this.bottom=s,this.near=r,this.far=o,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.left=e.left,this.right=e.right,this.top=e.top,this.bottom=e.bottom,this.near=e.near,this.far=e.far,this.zoom=e.zoom,this.view=e.view===null?null:Object.assign({},e.view),this}setViewOffset(e,t,n,s,r,o){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=n,this.view.offsetY=s,this.view.width=r,this.view.height=o,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){let e=(this.right-this.left)/(2*this.zoom),t=(this.top-this.bottom)/(2*this.zoom),n=(this.right+this.left)/2,s=(this.top+this.bottom)/2,r=n-e,o=n+e,a=s+t,c=s-t;if(this.view!==null&&this.view.enabled){let l=(this.right-this.left)/this.view.fullWidth/this.zoom,u=(this.top-this.bottom)/this.view.fullHeight/this.zoom;r+=l*this.view.offsetX,o=r+l*this.view.width,a-=u*this.view.offsetY,c=a-u*this.view.height}this.projectionMatrix.makeOrthographic(r,o,a,c,this.near,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){let t=super.toJSON(e);return t.object.zoom=this.zoom,t.object.left=this.left,t.object.right=this.right,t.object.top=this.top,t.object.bottom=this.bottom,t.object.near=this.near,t.object.far=this.far,this.view!==null&&(t.object.view=Object.assign({},this.view)),t}},fl=class extends Nr{constructor(){super(new Ri(-5,5,5,-5,.5,500)),this.isDirectionalLightShadow=!0}},is=class extends ts{constructor(e,t){super(e,t),this.isDirectionalLight=!0,this.type="DirectionalLight",this.position.copy(lt.DEFAULT_UP),this.updateMatrix(),this.target=new lt,this.shadow=new fl}dispose(){super.dispose(),this.shadow.dispose()}copy(e){return super.copy(e),this.target=e.target.clone(),this.shadow=e.shadow.clone(),this}toJSON(e){let t=super.toJSON(e);return t.object.shadow=this.shadow.toJSON(),t.object.target=this.target.uuid,t}};var Or=class i extends En{constructor(e){super(e),this.textures={}}load(e,t,n,s){let r=this,o=new es(r.manager);o.setPath(r.path),o.setRequestHeader(r.requestHeader),o.setWithCredentials(r.withCredentials),o.load(e,function(a){try{t(r.parse(JSON.parse(a)))}catch(c){s?s(c):Ee(c),r.manager.itemError(e)}},n,s)}parse(e){let t=this.textures;function n(r){return t[r]===void 0&&ve("MaterialLoader: Undefined texture",r),t[r]}let s=this.createMaterialFromType(e.type);if(e.uuid!==void 0&&(s.uuid=e.uuid),e.name!==void 0&&(s.name=e.name),e.color!==void 0&&s.color!==void 0&&s.color.setHex(e.color),e.roughness!==void 0&&(s.roughness=e.roughness),e.metalness!==void 0&&(s.metalness=e.metalness),e.sheen!==void 0&&(s.sheen=e.sheen),e.sheenColor!==void 0&&(s.sheenColor=new ge().setHex(e.sheenColor)),e.sheenRoughness!==void 0&&(s.sheenRoughness=e.sheenRoughness),e.emissive!==void 0&&s.emissive!==void 0&&s.emissive.setHex(e.emissive),e.specular!==void 0&&s.specular!==void 0&&s.specular.setHex(e.specular),e.specularIntensity!==void 0&&(s.specularIntensity=e.specularIntensity),e.specularColor!==void 0&&s.specularColor!==void 0&&s.specularColor.setHex(e.specularColor),e.shininess!==void 0&&(s.shininess=e.shininess),e.clearcoat!==void 0&&(s.clearcoat=e.clearcoat),e.clearcoatRoughness!==void 0&&(s.clearcoatRoughness=e.clearcoatRoughness),e.dispersion!==void 0&&(s.dispersion=e.dispersion),e.iridescence!==void 0&&(s.iridescence=e.iridescence),e.iridescenceIOR!==void 0&&(s.iridescenceIOR=e.iridescenceIOR),e.iridescenceThicknessRange!==void 0&&(s.iridescenceThicknessRange=e.iridescenceThicknessRange),e.transmission!==void 0&&(s.transmission=e.transmission),e.thickness!==void 0&&(s.thickness=e.thickness),e.attenuationDistance!==void 0&&(s.attenuationDistance=e.attenuationDistance),e.attenuationColor!==void 0&&s.attenuationColor!==void 0&&s.attenuationColor.setHex(e.attenuationColor),e.anisotropy!==void 0&&(s.anisotropy=e.anisotropy),e.anisotropyRotation!==void 0&&(s.anisotropyRotation=e.anisotropyRotation),e.fog!==void 0&&(s.fog=e.fog),e.flatShading!==void 0&&(s.flatShading=e.flatShading),e.blending!==void 0&&(s.blending=e.blending),e.combine!==void 0&&(s.combine=e.combine),e.side!==void 0&&(s.side=e.side),e.shadowSide!==void 0&&(s.shadowSide=e.shadowSide),e.opacity!==void 0&&(s.opacity=e.opacity),e.transparent!==void 0&&(s.transparent=e.transparent),e.alphaTest!==void 0&&(s.alphaTest=e.alphaTest),e.alphaHash!==void 0&&(s.alphaHash=e.alphaHash),e.depthFunc!==void 0&&(s.depthFunc=e.depthFunc),e.depthTest!==void 0&&(s.depthTest=e.depthTest),e.depthWrite!==void 0&&(s.depthWrite=e.depthWrite),e.colorWrite!==void 0&&(s.colorWrite=e.colorWrite),e.blendSrc!==void 0&&(s.blendSrc=e.blendSrc),e.blendDst!==void 0&&(s.blendDst=e.blendDst),e.blendEquation!==void 0&&(s.blendEquation=e.blendEquation),e.blendSrcAlpha!==void 0&&(s.blendSrcAlpha=e.blendSrcAlpha),e.blendDstAlpha!==void 0&&(s.blendDstAlpha=e.blendDstAlpha),e.blendEquationAlpha!==void 0&&(s.blendEquationAlpha=e.blendEquationAlpha),e.blendColor!==void 0&&s.blendColor!==void 0&&s.blendColor.setHex(e.blendColor),e.blendAlpha!==void 0&&(s.blendAlpha=e.blendAlpha),e.stencilWriteMask!==void 0&&(s.stencilWriteMask=e.stencilWriteMask),e.stencilFunc!==void 0&&(s.stencilFunc=e.stencilFunc),e.stencilRef!==void 0&&(s.stencilRef=e.stencilRef),e.stencilFuncMask!==void 0&&(s.stencilFuncMask=e.stencilFuncMask),e.stencilFail!==void 0&&(s.stencilFail=e.stencilFail),e.stencilZFail!==void 0&&(s.stencilZFail=e.stencilZFail),e.stencilZPass!==void 0&&(s.stencilZPass=e.stencilZPass),e.stencilWrite!==void 0&&(s.stencilWrite=e.stencilWrite),e.wireframe!==void 0&&(s.wireframe=e.wireframe),e.wireframeLinewidth!==void 0&&(s.wireframeLinewidth=e.wireframeLinewidth),e.wireframeLinecap!==void 0&&(s.wireframeLinecap=e.wireframeLinecap),e.wireframeLinejoin!==void 0&&(s.wireframeLinejoin=e.wireframeLinejoin),e.rotation!==void 0&&(s.rotation=e.rotation),e.linewidth!==void 0&&(s.linewidth=e.linewidth),e.dashSize!==void 0&&(s.dashSize=e.dashSize),e.gapSize!==void 0&&(s.gapSize=e.gapSize),e.scale!==void 0&&(s.scale=e.scale),e.polygonOffset!==void 0&&(s.polygonOffset=e.polygonOffset),e.polygonOffsetFactor!==void 0&&(s.polygonOffsetFactor=e.polygonOffsetFactor),e.polygonOffsetUnits!==void 0&&(s.polygonOffsetUnits=e.polygonOffsetUnits),e.dithering!==void 0&&(s.dithering=e.dithering),e.alphaToCoverage!==void 0&&(s.alphaToCoverage=e.alphaToCoverage),e.premultipliedAlpha!==void 0&&(s.premultipliedAlpha=e.premultipliedAlpha),e.forceSinglePass!==void 0&&(s.forceSinglePass=e.forceSinglePass),e.allowOverride!==void 0&&(s.allowOverride=e.allowOverride),e.visible!==void 0&&(s.visible=e.visible),e.toneMapped!==void 0&&(s.toneMapped=e.toneMapped),e.userData!==void 0&&(s.userData=e.userData),e.vertexColors!==void 0&&(typeof e.vertexColors=="number"?s.vertexColors=e.vertexColors>0:s.vertexColors=e.vertexColors),e.uniforms!==void 0)for(let r in e.uniforms){let o=e.uniforms[r];switch(s.uniforms[r]={},o.type){case"t":s.uniforms[r].value=n(o.value);break;case"c":s.uniforms[r].value=new ge().setHex(o.value);break;case"v2":s.uniforms[r].value=new be().fromArray(o.value);break;case"v3":s.uniforms[r].value=new L().fromArray(o.value);break;case"v4":s.uniforms[r].value=new $e().fromArray(o.value);break;case"m3":s.uniforms[r].value=new Ie().fromArray(o.value);break;case"m4":s.uniforms[r].value=new Ue().fromArray(o.value);break;default:s.uniforms[r].value=o.value}}if(e.defines!==void 0&&(s.defines=e.defines),e.vertexShader!==void 0&&(s.vertexShader=e.vertexShader),e.fragmentShader!==void 0&&(s.fragmentShader=e.fragmentShader),e.glslVersion!==void 0&&(s.glslVersion=e.glslVersion),e.extensions!==void 0)for(let r in e.extensions)s.extensions[r]=e.extensions[r];if(e.lights!==void 0&&(s.lights=e.lights),e.clipping!==void 0&&(s.clipping=e.clipping),e.size!==void 0&&(s.size=e.size),e.sizeAttenuation!==void 0&&(s.sizeAttenuation=e.sizeAttenuation),e.map!==void 0&&(s.map=n(e.map)),e.matcap!==void 0&&(s.matcap=n(e.matcap)),e.alphaMap!==void 0&&(s.alphaMap=n(e.alphaMap)),e.bumpMap!==void 0&&(s.bumpMap=n(e.bumpMap)),e.bumpScale!==void 0&&(s.bumpScale=e.bumpScale),e.normalMap!==void 0&&(s.normalMap=n(e.normalMap)),e.normalMapType!==void 0&&(s.normalMapType=e.normalMapType),e.normalScale!==void 0){let r=e.normalScale;Array.isArray(r)===!1&&(r=[r,r]),s.normalScale=new be().fromArray(r)}return e.displacementMap!==void 0&&(s.displacementMap=n(e.displacementMap)),e.displacementScale!==void 0&&(s.displacementScale=e.displacementScale),e.displacementBias!==void 0&&(s.displacementBias=e.displacementBias),e.roughnessMap!==void 0&&(s.roughnessMap=n(e.roughnessMap)),e.metalnessMap!==void 0&&(s.metalnessMap=n(e.metalnessMap)),e.emissiveMap!==void 0&&(s.emissiveMap=n(e.emissiveMap)),e.emissiveIntensity!==void 0&&(s.emissiveIntensity=e.emissiveIntensity),e.specularMap!==void 0&&(s.specularMap=n(e.specularMap)),e.specularIntensityMap!==void 0&&(s.specularIntensityMap=n(e.specularIntensityMap)),e.specularColorMap!==void 0&&(s.specularColorMap=n(e.specularColorMap)),e.envMap!==void 0&&(s.envMap=n(e.envMap)),e.envMapRotation!==void 0&&s.envMapRotation.fromArray(e.envMapRotation),e.envMapIntensity!==void 0&&(s.envMapIntensity=e.envMapIntensity),e.reflectivity!==void 0&&(s.reflectivity=e.reflectivity),e.refractionRatio!==void 0&&(s.refractionRatio=e.refractionRatio),e.lightMap!==void 0&&(s.lightMap=n(e.lightMap)),e.lightMapIntensity!==void 0&&(s.lightMapIntensity=e.lightMapIntensity),e.aoMap!==void 0&&(s.aoMap=n(e.aoMap)),e.aoMapIntensity!==void 0&&(s.aoMapIntensity=e.aoMapIntensity),e.gradientMap!==void 0&&(s.gradientMap=n(e.gradientMap)),e.clearcoatMap!==void 0&&(s.clearcoatMap=n(e.clearcoatMap)),e.clearcoatRoughnessMap!==void 0&&(s.clearcoatRoughnessMap=n(e.clearcoatRoughnessMap)),e.clearcoatNormalMap!==void 0&&(s.clearcoatNormalMap=n(e.clearcoatNormalMap)),e.clearcoatNormalScale!==void 0&&(s.clearcoatNormalScale=new be().fromArray(e.clearcoatNormalScale)),e.iridescenceMap!==void 0&&(s.iridescenceMap=n(e.iridescenceMap)),e.iridescenceThicknessMap!==void 0&&(s.iridescenceThicknessMap=n(e.iridescenceThicknessMap)),e.transmissionMap!==void 0&&(s.transmissionMap=n(e.transmissionMap)),e.thicknessMap!==void 0&&(s.thicknessMap=n(e.thicknessMap)),e.anisotropyMap!==void 0&&(s.anisotropyMap=n(e.anisotropyMap)),e.sheenColorMap!==void 0&&(s.sheenColorMap=n(e.sheenColorMap)),e.sheenRoughnessMap!==void 0&&(s.sheenRoughnessMap=n(e.sheenRoughnessMap)),s}setTextures(e){return this.textures=e,this}createMaterialFromType(e){return i.createMaterialFromType(e)}static createMaterialFromType(e){let t={ShadowMaterial:ia,SpriteMaterial:Jo,RawShaderMaterial:Rr,ShaderMaterial:Jt,PointsMaterial:$i,MeshPhysicalMaterial:jt,MeshStandardMaterial:Bt,MeshPhongMaterial:sa,MeshToonMaterial:ra,MeshNormalMaterial:oa,MeshLambertMaterial:Hs,MeshDepthMaterial:Qi,MeshDistanceMaterial:Cr,MeshBasicMaterial:_n,MeshMatcapMaterial:aa,LineDashedMaterial:ca,LineBasicMaterial:Ai,Material:yt};return new t[e]}},oi=class{static extractUrlBase(e){let t=e.lastIndexOf("/");return t===-1?"./":e.slice(0,t+1)}static resolveURL(e,t){return typeof e!="string"||e===""?"":(/^https?:\/\//i.test(t)&&/^\//.test(e)&&(t=t.replace(/(^https?:\/\/[^\/]+).*/i,"$1")),/^(https?:)?\/\//i.test(e)||/^data:.*,.*$/i.test(e)||/^blob:.*$/i.test(e)?e:t+e)}};var nl=new WeakMap,Br=class extends En{constructor(e){super(e),this.isImageBitmapLoader=!0,typeof createImageBitmap>"u"&&ve("ImageBitmapLoader: createImageBitmap() not supported."),typeof fetch>"u"&&ve("ImageBitmapLoader: fetch() not supported."),this.options={premultiplyAlpha:"none"},this._abortController=new AbortController}setOptions(e){return this.options=e,this}load(e,t,n,s){e===void 0&&(e=""),this.path!==void 0&&(e=this.path+e),e=this.manager.resolveURL(e);let r=this,o=Un.get(`image-bitmap:${e}`);if(o!==void 0){if(r.manager.itemStart(e),o.then){o.then(l=>{nl.has(o)===!0?(s&&s(nl.get(o)),r.manager.itemError(e),r.manager.itemEnd(e)):(t&&t(l),r.manager.itemEnd(e))});return}setTimeout(function(){t&&t(o),r.manager.itemEnd(e)},0);return}let a={};a.credentials=this.crossOrigin==="anonymous"?"same-origin":"include",a.headers=this.requestHeader,a.signal=typeof AbortSignal.any=="function"?AbortSignal.any([this._abortController.signal,this.manager.abortController.signal]):this._abortController.signal;let c=fetch(e,a).then(function(l){return l.blob()}).then(function(l){return createImageBitmap(l,Object.assign(r.options,{colorSpaceConversion:"none"}))}).then(function(l){Un.add(`image-bitmap:${e}`,l),t&&t(l),r.manager.itemEnd(e)}).catch(function(l){s&&s(l),nl.set(c,l),Un.remove(`image-bitmap:${e}`),r.manager.itemError(e),r.manager.itemEnd(e)});Un.add(`image-bitmap:${e}`,c),r.manager.itemStart(e)}abort(){return this._abortController.abort(),this._abortController=new AbortController,this}};var Rs=-90,Cs=1,ga=class extends lt{constructor(e,t,n){super(),this.type="CubeCamera",this.renderTarget=n,this.coordinateSystem=null,this.activeMipmapLevel=0;let s=new At(Rs,Cs,e,t);s.layers=this.layers,this.add(s);let r=new At(Rs,Cs,e,t);r.layers=this.layers,this.add(r);let o=new At(Rs,Cs,e,t);o.layers=this.layers,this.add(o);let a=new At(Rs,Cs,e,t);a.layers=this.layers,this.add(a);let c=new At(Rs,Cs,e,t);c.layers=this.layers,this.add(c);let l=new At(Rs,Cs,e,t);l.layers=this.layers,this.add(l)}updateCoordinateSystem(){let e=this.coordinateSystem,t=this.children.concat(),[n,s,r,o,a,c]=t;for(let l of t)this.remove(l);if(e===Sn)n.up.set(0,1,0),n.lookAt(1,0,0),s.up.set(0,1,0),s.lookAt(-1,0,0),r.up.set(0,0,-1),r.lookAt(0,1,0),o.up.set(0,0,1),o.lookAt(0,-1,0),a.up.set(0,1,0),a.lookAt(0,0,1),c.up.set(0,1,0),c.lookAt(0,0,-1);else if(e===Ls)n.up.set(0,-1,0),n.lookAt(-1,0,0),s.up.set(0,-1,0),s.lookAt(1,0,0),r.up.set(0,0,1),r.lookAt(0,1,0),o.up.set(0,0,-1),o.lookAt(0,-1,0),a.up.set(0,-1,0),a.lookAt(0,0,1),c.up.set(0,-1,0),c.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+e);for(let l of t)this.add(l),l.updateMatrixWorld()}update(e,t){this.parent===null&&this.updateMatrixWorld();let{renderTarget:n,activeMipmapLevel:s}=this;this.coordinateSystem!==e.coordinateSystem&&(this.coordinateSystem=e.coordinateSystem,this.updateCoordinateSystem());let[r,o,a,c,l,u]=this.children,d=e.getRenderTarget(),h=e.getActiveCubeFace(),p=e.getActiveMipmapLevel(),g=e.xr.enabled;e.xr.enabled=!1;let v=n.texture.generateMipmaps;n.texture.generateMipmaps=!1;let m=!1;e.isWebGLRenderer===!0?m=e.state.buffers.depth.getReversed():m=e.reversedDepthBuffer,e.setRenderTarget(n,0,s),m&&e.autoClear===!1&&e.clearDepth(),e.render(t,r),e.setRenderTarget(n,1,s),m&&e.autoClear===!1&&e.clearDepth(),e.render(t,o),e.setRenderTarget(n,2,s),m&&e.autoClear===!1&&e.clearDepth(),e.render(t,a),e.setRenderTarget(n,3,s),m&&e.autoClear===!1&&e.clearDepth(),e.render(t,c),e.setRenderTarget(n,4,s),m&&e.autoClear===!1&&e.clearDepth(),e.render(t,l),n.texture.generateMipmaps=v,e.setRenderTarget(n,5,s),m&&e.autoClear===!1&&e.clearDepth(),e.render(t,u),e.setRenderTarget(d,h,p),e.xr.enabled=g,n.texture.needsPMREMUpdate=!0}},_a=class extends At{constructor(e=[]){super(),this.isArrayCamera=!0,this.isMultiViewCamera=!1,this.cameras=e}};var Bl="\\[\\]\\.:\\/",kf=new RegExp("["+Bl+"]","g"),kl="[^"+Bl+"]",zf="[^"+Bl.replace("\\.","")+"]",Vf=/((?:WC+[\/:])*)/.source.replace("WC",kl),Hf=/(WCOD+)?/.source.replace("WCOD",zf),Gf=/(?:\.(WC+)(?:\[(.+)\])?)?/.source.replace("WC",kl),Wf=/\.(WC+)(?:\[(.+)\])?/.source.replace("WC",kl),Xf=new RegExp("^"+Vf+Hf+Gf+Wf+"$"),qf=["material","materials","bones","map"],pl=class{constructor(e,t,n){let s=n||ot.parseTrackName(t);this._targetGroup=e,this._bindings=e.subscribe_(t,s)}getValue(e,t){this.bind();let n=this._targetGroup.nCachedObjects_,s=this._bindings[n];s!==void 0&&s.getValue(e,t)}setValue(e,t){let n=this._bindings;for(let s=this._targetGroup.nCachedObjects_,r=n.length;s!==r;++s)n[s].setValue(e,t)}bind(){let e=this._bindings;for(let t=this._targetGroup.nCachedObjects_,n=e.length;t!==n;++t)e[t].bind()}unbind(){let e=this._bindings;for(let t=this._targetGroup.nCachedObjects_,n=e.length;t!==n;++t)e[t].unbind()}},ot=class i{constructor(e,t,n){this.path=t,this.parsedPath=n||i.parseTrackName(t),this.node=i.findNode(e,this.parsedPath.nodeName),this.rootNode=e,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}static create(e,t,n){return e&&e.isAnimationObjectGroup?new i.Composite(e,t,n):new i(e,t,n)}static sanitizeNodeName(e){return e.replace(/\s/g,"_").replace(kf,"")}static parseTrackName(e){let t=Xf.exec(e);if(t===null)throw new Error("PropertyBinding: Cannot parse trackName: "+e);let n={nodeName:t[2],objectName:t[3],objectIndex:t[4],propertyName:t[5],propertyIndex:t[6]},s=n.nodeName&&n.nodeName.lastIndexOf(".");if(s!==void 0&&s!==-1){let r=n.nodeName.substring(s+1);qf.indexOf(r)!==-1&&(n.nodeName=n.nodeName.substring(0,s),n.objectName=r)}if(n.propertyName===null||n.propertyName.length===0)throw new Error("PropertyBinding: can not parse propertyName from trackName: "+e);return n}static findNode(e,t){if(t===void 0||t===""||t==="."||t===-1||t===e.name||t===e.uuid)return e;if(e.skeleton){let n=e.skeleton.getBoneByName(t);if(n!==void 0)return n}if(e.children){let n=function(r){for(let o=0;o<r.length;o++){let a=r[o];if(a.name===t||a.uuid===t)return a;let c=n(a.children);if(c)return c}return null},s=n(e.children);if(s)return s}return null}_getValue_unavailable(){}_setValue_unavailable(){}_getValue_direct(e,t){e[t]=this.targetObject[this.propertyName]}_getValue_array(e,t){let n=this.resolvedProperty;for(let s=0,r=n.length;s!==r;++s)e[t++]=n[s]}_getValue_arrayElement(e,t){e[t]=this.resolvedProperty[this.propertyIndex]}_getValue_toArray(e,t){this.resolvedProperty.toArray(e,t)}_setValue_direct(e,t){this.targetObject[this.propertyName]=e[t]}_setValue_direct_setNeedsUpdate(e,t){this.targetObject[this.propertyName]=e[t],this.targetObject.needsUpdate=!0}_setValue_direct_setMatrixWorldNeedsUpdate(e,t){this.targetObject[this.propertyName]=e[t],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_array(e,t){let n=this.resolvedProperty;for(let s=0,r=n.length;s!==r;++s)n[s]=e[t++]}_setValue_array_setNeedsUpdate(e,t){let n=this.resolvedProperty;for(let s=0,r=n.length;s!==r;++s)n[s]=e[t++];this.targetObject.needsUpdate=!0}_setValue_array_setMatrixWorldNeedsUpdate(e,t){let n=this.resolvedProperty;for(let s=0,r=n.length;s!==r;++s)n[s]=e[t++];this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_arrayElement(e,t){this.resolvedProperty[this.propertyIndex]=e[t]}_setValue_arrayElement_setNeedsUpdate(e,t){this.resolvedProperty[this.propertyIndex]=e[t],this.targetObject.needsUpdate=!0}_setValue_arrayElement_setMatrixWorldNeedsUpdate(e,t){this.resolvedProperty[this.propertyIndex]=e[t],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_fromArray(e,t){this.resolvedProperty.fromArray(e,t)}_setValue_fromArray_setNeedsUpdate(e,t){this.resolvedProperty.fromArray(e,t),this.targetObject.needsUpdate=!0}_setValue_fromArray_setMatrixWorldNeedsUpdate(e,t){this.resolvedProperty.fromArray(e,t),this.targetObject.matrixWorldNeedsUpdate=!0}_getValue_unbound(e,t){this.bind(),this.getValue(e,t)}_setValue_unbound(e,t){this.bind(),this.setValue(e,t)}bind(){let e=this.node,t=this.parsedPath,n=t.objectName,s=t.propertyName,r=t.propertyIndex;if(e||(e=i.findNode(this.rootNode,t.nodeName),this.node=e),this.getValue=this._getValue_unavailable,this.setValue=this._setValue_unavailable,!e){ve("PropertyBinding: No target node found for track: "+this.path+".");return}if(n){let l=t.objectIndex;switch(n){case"materials":if(!e.material){Ee("PropertyBinding: Can not bind to material as node does not have a material.",this);return}if(!e.material.materials){Ee("PropertyBinding: Can not bind to material.materials as node.material does not have a materials array.",this);return}e=e.material.materials;break;case"bones":if(!e.skeleton){Ee("PropertyBinding: Can not bind to bones as node does not have a skeleton.",this);return}e=e.skeleton.bones;for(let u=0;u<e.length;u++)if(e[u].name===l){l=u;break}break;case"map":if("map"in e){e=e.map;break}if(!e.material){Ee("PropertyBinding: Can not bind to material as node does not have a material.",this);return}if(!e.material.map){Ee("PropertyBinding: Can not bind to material.map as node.material does not have a map.",this);return}e=e.material.map;break;default:if(e[n]===void 0){Ee("PropertyBinding: Can not bind to objectName of node undefined.",this);return}e=e[n]}if(l!==void 0){if(e[l]===void 0){Ee("PropertyBinding: Trying to bind to objectIndex of objectName, but is undefined.",this,e);return}e=e[l]}}let o=e[s];if(o===void 0){let l=t.nodeName;Ee("PropertyBinding: Trying to update property for track: "+l+"."+s+" but it wasn't found.",e);return}let a=this.Versioning.None;this.targetObject=e,e.isMaterial===!0?a=this.Versioning.NeedsUpdate:e.isObject3D===!0&&(a=this.Versioning.MatrixWorldNeedsUpdate);let c=this.BindingType.Direct;if(r!==void 0){if(s==="morphTargetInfluences"){if(!e.geometry){Ee("PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.",this);return}if(!e.geometry.morphAttributes){Ee("PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.morphAttributes.",this);return}e.morphTargetDictionary[r]!==void 0&&(r=e.morphTargetDictionary[r])}c=this.BindingType.ArrayElement,this.resolvedProperty=o,this.propertyIndex=r}else o.fromArray!==void 0&&o.toArray!==void 0?(c=this.BindingType.HasFromToArray,this.resolvedProperty=o):Array.isArray(o)?(c=this.BindingType.EntireArray,this.resolvedProperty=o):this.propertyName=s;this.getValue=this.GetterByBindingType[c],this.setValue=this.SetterByBindingTypeAndVersioning[c][a]}unbind(){this.node=null,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}};ot.Composite=pl;ot.prototype.BindingType={Direct:0,EntireArray:1,ArrayElement:2,HasFromToArray:3};ot.prototype.Versioning={None:0,NeedsUpdate:1,MatrixWorldNeedsUpdate:2};ot.prototype.GetterByBindingType=[ot.prototype._getValue_direct,ot.prototype._getValue_array,ot.prototype._getValue_arrayElement,ot.prototype._getValue_toArray];ot.prototype.SetterByBindingTypeAndVersioning=[[ot.prototype._setValue_direct,ot.prototype._setValue_direct_setNeedsUpdate,ot.prototype._setValue_direct_setMatrixWorldNeedsUpdate],[ot.prototype._setValue_array,ot.prototype._setValue_array_setNeedsUpdate,ot.prototype._setValue_array_setMatrixWorldNeedsUpdate],[ot.prototype._setValue_arrayElement,ot.prototype._setValue_arrayElement_setNeedsUpdate,ot.prototype._setValue_arrayElement_setMatrixWorldNeedsUpdate],[ot.prototype._setValue_fromArray,ot.prototype._setValue_fromArray_setNeedsUpdate,ot.prototype._setValue_fromArray_setMatrixWorldNeedsUpdate]];var kg=new Float32Array(1);var Gs=class{constructor(e=1,t=0,n=0){this.radius=e,this.phi=t,this.theta=n}set(e,t,n){return this.radius=e,this.phi=t,this.theta=n,this}copy(e){return this.radius=e.radius,this.phi=e.phi,this.theta=e.theta,this}makeSafe(){return this.phi=Ve(this.phi,1e-6,Math.PI-1e-6),this}setFromVector3(e){return this.setFromCartesianCoords(e.x,e.y,e.z)}setFromCartesianCoords(e,t,n){return this.radius=Math.sqrt(e*e+t*t+n*n),this.radius===0?(this.theta=0,this.phi=0):(this.theta=Math.atan2(e,n),this.phi=Math.acos(Ve(t/this.radius,-1,1))),this}clone(){return new this.constructor().copy(this)}};var ml=class i{static{i.prototype.isMatrix2=!0}constructor(e,t,n,s){this.elements=[1,0,0,1],e!==void 0&&this.set(e,t,n,s)}identity(){return this.set(1,0,0,1),this}fromArray(e,t=0){for(let n=0;n<4;n++)this.elements[n]=e[n+t];return this}set(e,t,n,s){let r=this.elements;return r[0]=e,r[2]=t,r[1]=n,r[3]=s,this}};var kr=class extends wn{constructor(e,t=null){super(),this.object=e,this.domElement=t,this.enabled=!0,this.state=-1,this.keys={},this.mouseButtons={LEFT:null,MIDDLE:null,RIGHT:null},this.touches={ONE:null,TWO:null}}connect(e){if(e===void 0){ve("Controls: connect() now requires an element.");return}this.domElement!==null&&this.disconnect(),this.domElement=e}disconnect(){}dispose(){}update(){}};function zl(i,e,t,n){let s=Yf(n);switch(t){case Pl:return i*e;case Zs:return i*e/s.components*s.byteLength;case Ta:return i*e/s.components*s.byteLength;case Di:return i*e*2/s.components*s.byteLength;case wa:return i*e*2/s.components*s.byteLength;case Ll:return i*e*3/s.components*s.byteLength;case dn:return i*e*4/s.components*s.byteLength;case Aa:return i*e*4/s.components*s.byteLength;case Gr:case Wr:return Math.floor((i+3)/4)*Math.floor((e+3)/4)*8;case Xr:case qr:return Math.floor((i+3)/4)*Math.floor((e+3)/4)*16;case Ra:case Ia:return Math.max(i,16)*Math.max(e,8)/4;case Ea:case Ca:return Math.max(i,8)*Math.max(e,8)/2;case Pa:case La:case Na:case Ua:return Math.floor((i+3)/4)*Math.floor((e+3)/4)*8;case Da:case Yr:case Fa:return Math.floor((i+3)/4)*Math.floor((e+3)/4)*16;case Oa:return Math.floor((i+3)/4)*Math.floor((e+3)/4)*16;case Ba:return Math.floor((i+4)/5)*Math.floor((e+3)/4)*16;case ka:return Math.floor((i+4)/5)*Math.floor((e+4)/5)*16;case za:return Math.floor((i+5)/6)*Math.floor((e+4)/5)*16;case Va:return Math.floor((i+5)/6)*Math.floor((e+5)/6)*16;case Ha:return Math.floor((i+7)/8)*Math.floor((e+4)/5)*16;case Ga:return Math.floor((i+7)/8)*Math.floor((e+5)/6)*16;case Wa:return Math.floor((i+7)/8)*Math.floor((e+7)/8)*16;case Xa:return Math.floor((i+9)/10)*Math.floor((e+4)/5)*16;case qa:return Math.floor((i+9)/10)*Math.floor((e+5)/6)*16;case Ya:return Math.floor((i+9)/10)*Math.floor((e+7)/8)*16;case Za:return Math.floor((i+9)/10)*Math.floor((e+9)/10)*16;case Ka:return Math.floor((i+11)/12)*Math.floor((e+9)/10)*16;case ja:return Math.floor((i+11)/12)*Math.floor((e+11)/12)*16;case $a:case Ja:case Qa:return Math.ceil(i/4)*Math.ceil(e/4)*16;case ec:case tc:return Math.ceil(i/4)*Math.ceil(e/4)*8;case Zr:case nc:return Math.ceil(i/4)*Math.ceil(e/4)*16}throw new Error(`Unable to determine texture byte length for ${t} format.`)}function Yf(i){switch(i){case Wt:case El:return{byteLength:1,components:1};case qs:case Rl:case Hn:return{byteLength:2,components:1};case ba:case Sa:return{byteLength:2,components:4};case Cn:case Ma:case un:return{byteLength:4,components:1};case Cl:case Il:return{byteLength:4,components:3}}throw new Error(`Unknown texture type ${i}.`)}typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:"184"}}));typeof window<"u"&&(window.__THREE__?ve("WARNING: Multiple instances of Three.js being imported."):window.__THREE__="184");function ju(){let i=null,e=!1,t=null,n=null;function s(r,o){t(r,o),n=i.requestAnimationFrame(s)}return{start:function(){e!==!0&&t!==null&&i!==null&&(n=i.requestAnimationFrame(s),e=!0)},stop:function(){i!==null&&i.cancelAnimationFrame(n),e=!1},setAnimationLoop:function(r){t=r},setContext:function(r){i=r}}}function Kf(i){let e=new WeakMap;function t(a,c){let l=a.array,u=a.usage,d=l.byteLength,h=i.createBuffer();i.bindBuffer(c,h),i.bufferData(c,l,u),a.onUploadCallback();let p;if(l instanceof Float32Array)p=i.FLOAT;else if(typeof Float16Array<"u"&&l instanceof Float16Array)p=i.HALF_FLOAT;else if(l instanceof Uint16Array)a.isFloat16BufferAttribute?p=i.HALF_FLOAT:p=i.UNSIGNED_SHORT;else if(l instanceof Int16Array)p=i.SHORT;else if(l instanceof Uint32Array)p=i.UNSIGNED_INT;else if(l instanceof Int32Array)p=i.INT;else if(l instanceof Int8Array)p=i.BYTE;else if(l instanceof Uint8Array)p=i.UNSIGNED_BYTE;else if(l instanceof Uint8ClampedArray)p=i.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+l);return{buffer:h,type:p,bytesPerElement:l.BYTES_PER_ELEMENT,version:a.version,size:d}}function n(a,c,l){let u=c.array,d=c.updateRanges;if(i.bindBuffer(l,a),d.length===0)i.bufferSubData(l,0,u);else{d.sort((p,g)=>p.start-g.start);let h=0;for(let p=1;p<d.length;p++){let g=d[h],v=d[p];v.start<=g.start+g.count+1?g.count=Math.max(g.count,v.start+v.count-g.start):(++h,d[h]=v)}d.length=h+1;for(let p=0,g=d.length;p<g;p++){let v=d[p];i.bufferSubData(l,v.start*u.BYTES_PER_ELEMENT,u,v.start,v.count)}c.clearUpdateRanges()}c.onUploadCallback()}function s(a){return a.isInterleavedBufferAttribute&&(a=a.data),e.get(a)}function r(a){a.isInterleavedBufferAttribute&&(a=a.data);let c=e.get(a);c&&(i.deleteBuffer(c.buffer),e.delete(a))}function o(a,c){if(a.isInterleavedBufferAttribute&&(a=a.data),a.isGLBufferAttribute){let u=e.get(a);(!u||u.version<a.version)&&e.set(a,{buffer:a.buffer,type:a.type,bytesPerElement:a.elementSize,version:a.version});return}let l=e.get(a);if(l===void 0)e.set(a,t(a,c));else if(l.version<a.version){if(l.size!==a.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");n(l.buffer,a,c),l.version=a.version}}return{get:s,remove:r,update:o}}var jf=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,$f=`#ifdef USE_ALPHAHASH
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
#endif`,Jf=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,Qf=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,e1=`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,t1=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,n1=`#ifdef USE_AOMAP
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
#endif`,i1=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,s1=`#ifdef USE_BATCHING
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
#endif`,r1=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif`,o1=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,a1=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,c1=`float G_BlinnPhong_Implicit( ) {
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
} // validated`,l1=`#ifdef USE_IRIDESCENCE
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
#endif`,h1=`#ifdef USE_BUMPMAP
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
#endif`,u1=`#if NUM_CLIPPING_PLANES > 0
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
#endif`,d1=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,f1=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,p1=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,m1=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#endif`,g1=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#endif`,_1=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec4 vColor;
#endif`,x1=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
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
#endif`,y1=`#define PI 3.141592653589793
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
vec3 inverseTransformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( vec4( dir, 0.0 ) * matrix ).xyz );
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
} // validated`,v1=`#ifdef ENVMAP_TYPE_CUBE_UV
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
#endif`,M1=`vec3 transformedNormal = objectNormal;
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
	#ifdef FLIP_SIDED
		transformedTangent = - transformedTangent;
	#endif
#endif`,b1=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,S1=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,T1=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	#ifdef DECODE_VIDEO_TEXTURE_EMISSIVE
		emissiveColor = sRGBTransferEOTF( emissiveColor );
	#endif
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,w1=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,A1="gl_FragColor = linearToOutputTexel( gl_FragColor );",E1=`vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferEOTF( in vec4 value ) {
	return vec4( mix( pow( value.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), value.rgb * 0.0773993808, vec3( lessThanEqual( value.rgb, vec3( 0.04045 ) ) ) ), value.a );
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}`,R1=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vec3 cameraToFrag;
		if ( isOrthographic ) {
			cameraToFrag = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToFrag = normalize( vWorldPosition - cameraPosition );
		}
		vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
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
#endif`,C1=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform mat3 envMapRotation;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
#endif`,I1=`#ifdef USE_ENVMAP
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
#endif`,P1=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,L1=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vWorldPosition = worldPosition.xyz;
	#else
		vec3 cameraToVertex;
		if ( isOrthographic ) {
			cameraToVertex = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToVertex = normalize( worldPosition.xyz - cameraPosition );
		}
		vec3 worldNormal = inverseTransformDirection( transformedNormal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vReflect = reflect( cameraToVertex, worldNormal );
		#else
			vReflect = refract( cameraToVertex, worldNormal, refractionRatio );
		#endif
	#endif
#endif`,D1=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,N1=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,U1=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,F1=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,O1=`#ifdef USE_GRADIENTMAP
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
}`,B1=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,k1=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,z1=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,V1=`uniform bool receiveShadow;
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
	vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
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
#include <lightprobes_pars_fragment>`,H1=`#ifdef USE_ENVMAP
	vec3 getIBLIrradiance( const in vec3 normal ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
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
			reflectVec = inverseTransformDirection( reflectVec, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * reflectVec, roughness );
			return envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
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
	#endif
#endif`,G1=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,W1=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,X1=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,q1=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,Y1=`PhysicalMaterial material;
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
#endif`,Z1=`uniform sampler2D dfgLUT;
struct PhysicalMaterial {
	vec3 diffuseColor;
	vec3 diffuseContribution;
	vec3 specularColor;
	vec3 specularColorBlended;
	float roughness;
	float metalness;
	float specularF90;
	float dispersion;
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
		vec3 iridescenceF0;
		vec3 iridescenceFresnelDielectric;
		vec3 iridescenceFresnelMetallic;
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
void computeMultiscatteringIridescence( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float iridescence, const in vec3 iridescenceF0, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {
#else
void computeMultiscattering( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {
#endif
	float dotNV = saturate( dot( normal, viewDir ) );
	vec2 fab = texture2D( dfgLUT, vec2( roughness, dotNV ) ).rg;
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
vec3 BRDF_GGX_Multiscatter( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material ) {
	vec3 singleScatter = BRDF_GGX( lightDir, viewDir, normal, material );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	vec2 dfgV = texture2D( dfgLUT, vec2( material.roughness, dotNV ) ).rg;
	vec2 dfgL = texture2D( dfgLUT, vec2( material.roughness, dotNL ) ).rg;
	vec3 FssEss_V = material.specularColorBlended * dfgV.x + material.specularF90 * dfgV.y;
	vec3 FssEss_L = material.specularColorBlended * dfgL.x + material.specularF90 * dfgL.y;
	float Ess_V = dfgV.x + dfgV.y;
	float Ess_L = dfgL.x + dfgL.y;
	float Ems_V = 1.0 - Ess_V;
	float Ems_L = 1.0 - Ess_L;
	vec3 Favg = material.specularColorBlended + ( 1.0 - material.specularColorBlended ) * 0.047619;
	vec3 Fms = FssEss_V * FssEss_L * Favg / ( 1.0 - Ems_V * Ems_L * Favg + EPSILON );
	float compensationFactor = Ems_V * Ems_L;
	vec3 multiScatter = Fms * compensationFactor;
	return singleScatter + multiScatter;
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
	reflectedLight.directSpecular += irradiance * BRDF_GGX_Multiscatter( directLight.direction, geometryViewDir, geometryNormal, material );
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseContribution );
}
void RE_IndirectDiffuse_Physical( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	vec3 diffuse = irradiance * BRDF_Lambert( material.diffuseContribution );
	#ifdef USE_SHEEN
		float sheenAlbedo = IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
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
		computeMultiscatteringIridescence( geometryNormal, geometryViewDir, material.specularColor, material.specularF90, material.iridescence, material.iridescenceFresnelDielectric, material.roughness, singleScatteringDielectric, multiScatteringDielectric );
		computeMultiscatteringIridescence( geometryNormal, geometryViewDir, material.diffuseColor, material.specularF90, material.iridescence, material.iridescenceFresnelMetallic, material.roughness, singleScatteringMetallic, multiScatteringMetallic );
	#else
		computeMultiscattering( geometryNormal, geometryViewDir, material.specularColor, material.specularF90, material.roughness, singleScatteringDielectric, multiScatteringDielectric );
		computeMultiscattering( geometryNormal, geometryViewDir, material.diffuseColor, material.specularF90, material.roughness, singleScatteringMetallic, multiScatteringMetallic );
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
}`,K1=`
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
		material.iridescenceFresnelDielectric = evalIridescence( 1.0, material.iridescenceIOR, dotNVi, material.iridescenceThickness, material.specularColor );
		material.iridescenceFresnelMetallic = evalIridescence( 1.0, material.iridescenceIOR, dotNVi, material.iridescenceThickness, material.diffuseColor );
		material.iridescenceFresnel = mix( material.iridescenceFresnelDielectric, material.iridescenceFresnelMetallic, material.metalness );
		material.iridescenceF0 = Schlick_to_F0( material.iridescenceFresnel, 1.0, dotNVi );
	}
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
		vec3 probeWorldNormal = inverseTransformDirection( geometryNormal, viewMatrix );
		irradiance += getLightProbeGridIrradiance( probeWorldPos, probeWorldNormal );
	#endif
#endif
#if defined( RE_IndirectSpecular )
	vec3 radiance = vec3( 0.0 );
	vec3 clearcoatRadiance = vec3( 0.0 );
#endif`,j1=`#if defined( RE_IndirectDiffuse )
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
		radiance += getIBLAnisotropyRadiance( geometryViewDir, geometryNormal, material.roughness, material.anisotropyB, material.anisotropy );
	#else
		radiance += getIBLRadiance( geometryViewDir, geometryNormal, material.roughness );
	#endif
	#ifdef USE_CLEARCOAT
		clearcoatRadiance += getIBLRadiance( geometryViewDir, geometryClearcoatNormal, material.clearcoatRoughness );
	#endif
#endif`,$1=`#if defined( RE_IndirectDiffuse )
	#if defined( LAMBERT ) || defined( PHONG )
		irradiance += iblIrradiance;
	#endif
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,J1=`#ifdef USE_LIGHT_PROBES_GRID
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
#endif`,Q1=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,ep=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,tp=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,np=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,ip=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = sRGBTransferEOTF( sampledDiffuseColor );
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,sp=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,rp=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
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
#endif`,op=`#if defined( USE_POINTS_UV )
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
#endif`,ap=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,cp=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,lp=`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,hp=`#if defined( USE_MORPHCOLORS )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,up=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,dp=`#ifdef USE_MORPHTARGETS
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
#endif`,fp=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,pp=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
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
	#if defined( DOUBLE_SIDED ) && ! defined( FLAT_SHADED )
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
	#if defined( DOUBLE_SIDED ) && ! defined( FLAT_SHADED )
		tbn2[0] *= faceDirection;
		tbn2[1] *= faceDirection;
	#endif
#endif
vec3 nonPerturbedNormal = normal;`,mp=`#ifdef USE_NORMALMAP_OBJECTSPACE
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
#endif`,gp=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,_p=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,xp=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
	#endif
#endif`,yp=`#ifdef USE_NORMALMAP
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
#endif`,vp=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,Mp=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,bp=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,Sp=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,Tp=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,wp=`vec3 packNormalToRGB( const in vec3 normal ) {
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
}`,Ap=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,Ep=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,Rp=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,Cp=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,Ip=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,Pp=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,Lp=`#if NUM_SPOT_LIGHT_COORDS > 0
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#if NUM_SPOT_LIGHT_MAPS > 0
	uniform sampler2D spotLightMap[ NUM_SPOT_LIGHT_MAPS ];
#endif
#ifdef USE_SHADOWMAP
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
#endif`,Dp=`#if NUM_SPOT_LIGHT_COORDS > 0
	uniform mat4 spotLightMatrix[ NUM_SPOT_LIGHT_COORDS ];
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#ifdef USE_SHADOWMAP
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
#endif`,Np=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
	#ifdef HAS_NORMAL
		vec3 shadowWorldNormal = inverseTransformDirection( transformedNormal, viewMatrix );
	#else
		vec3 shadowWorldNormal = vec3( 0.0 );
	#endif
	vec4 shadowWorldPosition;
#endif
#if defined( USE_SHADOWMAP )
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
#endif`,Up=`float getShadowMask() {
	float shadow = 1.0;
	#ifdef USE_SHADOWMAP
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
}`,Fp=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,Op=`#ifdef USE_SKINNING
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
#endif`,Bp=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,kp=`#ifdef USE_SKINNING
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
#endif`,zp=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,Vp=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,Hp=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,Gp=`#ifndef saturate
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
vec3 CustomToneMapping( vec3 color ) { return color; }`,Wp=`#ifdef USE_TRANSMISSION
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
	vec3 n = inverseTransformDirection( normal, viewMatrix );
	vec4 transmitted = getIBLVolumeRefraction(
		n, v, material.roughness, material.diffuseContribution, material.specularColorBlended, material.specularF90,
		pos, modelMatrix, viewMatrix, projectionMatrix, material.dispersion, material.ior, material.thickness,
		material.attenuationColor, material.attenuationDistance );
	material.transmissionAlpha = mix( material.transmissionAlpha, transmitted.a, material.transmission );
	totalDiffuse = mix( totalDiffuse, transmitted.rgb, material.transmission );
#endif`,Xp=`#ifdef USE_TRANSMISSION
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
#endif`,qp=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,Yp=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,Zp=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,Kp=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`,jp=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,$p=`uniform sampler2D t2D;
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
}`,Jp=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,Qp=`#ifdef ENVMAP_TYPE_CUBE
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
}`,em=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,tm=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,nm=`#include <common>
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
}`,im=`#if DEPTH_PACKING == 3200
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
}`,sm=`#define DISTANCE
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
}`,rm=`#define DISTANCE
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
void main () {
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
}`,om=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,am=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,cm=`uniform float scale;
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
}`,lm=`uniform vec3 diffuse;
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
}`,hm=`#include <common>
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
}`,um=`uniform vec3 diffuse;
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
}`,dm=`#define LAMBERT
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
}`,fm=`#define LAMBERT
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
}`,pm=`#define MATCAP
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
}`,mm=`#define MATCAP
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
}`,gm=`#define NORMAL
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
}`,_m=`#define NORMAL
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
}`,xm=`#define PHONG
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
}`,ym=`#define PHONG
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
}`,vm=`#define STANDARD
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
}`,Mm=`#define STANDARD
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
}`,bm=`#define TOON
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
}`,Sm=`#define TOON
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
}`,Tm=`uniform float size;
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
}`,wm=`uniform vec3 diffuse;
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
}`,Am=`#include <common>
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
}`,Em=`uniform vec3 color;
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
}`,Rm=`uniform float rotation;
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
}`,Cm=`uniform vec3 diffuse;
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
}`,Be={alphahash_fragment:jf,alphahash_pars_fragment:$f,alphamap_fragment:Jf,alphamap_pars_fragment:Qf,alphatest_fragment:e1,alphatest_pars_fragment:t1,aomap_fragment:n1,aomap_pars_fragment:i1,batching_pars_vertex:s1,batching_vertex:r1,begin_vertex:o1,beginnormal_vertex:a1,bsdfs:c1,iridescence_fragment:l1,bumpmap_pars_fragment:h1,clipping_planes_fragment:u1,clipping_planes_pars_fragment:d1,clipping_planes_pars_vertex:f1,clipping_planes_vertex:p1,color_fragment:m1,color_pars_fragment:g1,color_pars_vertex:_1,color_vertex:x1,common:y1,cube_uv_reflection_fragment:v1,defaultnormal_vertex:M1,displacementmap_pars_vertex:b1,displacementmap_vertex:S1,emissivemap_fragment:T1,emissivemap_pars_fragment:w1,colorspace_fragment:A1,colorspace_pars_fragment:E1,envmap_fragment:R1,envmap_common_pars_fragment:C1,envmap_pars_fragment:I1,envmap_pars_vertex:P1,envmap_physical_pars_fragment:H1,envmap_vertex:L1,fog_vertex:D1,fog_pars_vertex:N1,fog_fragment:U1,fog_pars_fragment:F1,gradientmap_pars_fragment:O1,lightmap_pars_fragment:B1,lights_lambert_fragment:k1,lights_lambert_pars_fragment:z1,lights_pars_begin:V1,lights_toon_fragment:G1,lights_toon_pars_fragment:W1,lights_phong_fragment:X1,lights_phong_pars_fragment:q1,lights_physical_fragment:Y1,lights_physical_pars_fragment:Z1,lights_fragment_begin:K1,lights_fragment_maps:j1,lights_fragment_end:$1,lightprobes_pars_fragment:J1,logdepthbuf_fragment:Q1,logdepthbuf_pars_fragment:ep,logdepthbuf_pars_vertex:tp,logdepthbuf_vertex:np,map_fragment:ip,map_pars_fragment:sp,map_particle_fragment:rp,map_particle_pars_fragment:op,metalnessmap_fragment:ap,metalnessmap_pars_fragment:cp,morphinstance_vertex:lp,morphcolor_vertex:hp,morphnormal_vertex:up,morphtarget_pars_vertex:dp,morphtarget_vertex:fp,normal_fragment_begin:pp,normal_fragment_maps:mp,normal_pars_fragment:gp,normal_pars_vertex:_p,normal_vertex:xp,normalmap_pars_fragment:yp,clearcoat_normal_fragment_begin:vp,clearcoat_normal_fragment_maps:Mp,clearcoat_pars_fragment:bp,iridescence_pars_fragment:Sp,opaque_fragment:Tp,packing:wp,premultiplied_alpha_fragment:Ap,project_vertex:Ep,dithering_fragment:Rp,dithering_pars_fragment:Cp,roughnessmap_fragment:Ip,roughnessmap_pars_fragment:Pp,shadowmap_pars_fragment:Lp,shadowmap_pars_vertex:Dp,shadowmap_vertex:Np,shadowmask_pars_fragment:Up,skinbase_vertex:Fp,skinning_pars_vertex:Op,skinning_vertex:Bp,skinnormal_vertex:kp,specularmap_fragment:zp,specularmap_pars_fragment:Vp,tonemapping_fragment:Hp,tonemapping_pars_fragment:Gp,transmission_fragment:Wp,transmission_pars_fragment:Xp,uv_pars_fragment:qp,uv_pars_vertex:Yp,uv_vertex:Zp,worldpos_vertex:Kp,background_vert:jp,background_frag:$p,backgroundCube_vert:Jp,backgroundCube_frag:Qp,cube_vert:em,cube_frag:tm,depth_vert:nm,depth_frag:im,distance_vert:sm,distance_frag:rm,equirect_vert:om,equirect_frag:am,linedashed_vert:cm,linedashed_frag:lm,meshbasic_vert:hm,meshbasic_frag:um,meshlambert_vert:dm,meshlambert_frag:fm,meshmatcap_vert:pm,meshmatcap_frag:mm,meshnormal_vert:gm,meshnormal_frag:_m,meshphong_vert:xm,meshphong_frag:ym,meshphysical_vert:vm,meshphysical_frag:Mm,meshtoon_vert:bm,meshtoon_frag:Sm,points_vert:Tm,points_frag:wm,shadow_vert:Am,shadow_frag:Em,sprite_vert:Rm,sprite_frag:Cm},le={common:{diffuse:{value:new ge(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new Ie},alphaMap:{value:null},alphaMapTransform:{value:new Ie},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new Ie}},envmap:{envMap:{value:null},envMapRotation:{value:new Ie},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98},dfgLUT:{value:null}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new Ie}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new Ie}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new Ie},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new Ie},normalScale:{value:new be(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new Ie},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new Ie}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new Ie}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new Ie}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new ge(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null},probesSH:{value:null},probesMin:{value:new L},probesMax:{value:new L},probesResolution:{value:new L}},points:{diffuse:{value:new ge(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new Ie},alphaTest:{value:0},uvTransform:{value:new Ie}},sprite:{diffuse:{value:new ge(16777215)},opacity:{value:1},center:{value:new be(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new Ie},alphaMap:{value:null},alphaMapTransform:{value:new Ie},alphaTest:{value:0}}},Wn={basic:{uniforms:Xt([le.common,le.specularmap,le.envmap,le.aomap,le.lightmap,le.fog]),vertexShader:Be.meshbasic_vert,fragmentShader:Be.meshbasic_frag},lambert:{uniforms:Xt([le.common,le.specularmap,le.envmap,le.aomap,le.lightmap,le.emissivemap,le.bumpmap,le.normalmap,le.displacementmap,le.fog,le.lights,{emissive:{value:new ge(0)},envMapIntensity:{value:1}}]),vertexShader:Be.meshlambert_vert,fragmentShader:Be.meshlambert_frag},phong:{uniforms:Xt([le.common,le.specularmap,le.envmap,le.aomap,le.lightmap,le.emissivemap,le.bumpmap,le.normalmap,le.displacementmap,le.fog,le.lights,{emissive:{value:new ge(0)},specular:{value:new ge(1118481)},shininess:{value:30},envMapIntensity:{value:1}}]),vertexShader:Be.meshphong_vert,fragmentShader:Be.meshphong_frag},standard:{uniforms:Xt([le.common,le.envmap,le.aomap,le.lightmap,le.emissivemap,le.bumpmap,le.normalmap,le.displacementmap,le.roughnessmap,le.metalnessmap,le.fog,le.lights,{emissive:{value:new ge(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:Be.meshphysical_vert,fragmentShader:Be.meshphysical_frag},toon:{uniforms:Xt([le.common,le.aomap,le.lightmap,le.emissivemap,le.bumpmap,le.normalmap,le.displacementmap,le.gradientmap,le.fog,le.lights,{emissive:{value:new ge(0)}}]),vertexShader:Be.meshtoon_vert,fragmentShader:Be.meshtoon_frag},matcap:{uniforms:Xt([le.common,le.bumpmap,le.normalmap,le.displacementmap,le.fog,{matcap:{value:null}}]),vertexShader:Be.meshmatcap_vert,fragmentShader:Be.meshmatcap_frag},points:{uniforms:Xt([le.points,le.fog]),vertexShader:Be.points_vert,fragmentShader:Be.points_frag},dashed:{uniforms:Xt([le.common,le.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:Be.linedashed_vert,fragmentShader:Be.linedashed_frag},depth:{uniforms:Xt([le.common,le.displacementmap]),vertexShader:Be.depth_vert,fragmentShader:Be.depth_frag},normal:{uniforms:Xt([le.common,le.bumpmap,le.normalmap,le.displacementmap,{opacity:{value:1}}]),vertexShader:Be.meshnormal_vert,fragmentShader:Be.meshnormal_frag},sprite:{uniforms:Xt([le.sprite,le.fog]),vertexShader:Be.sprite_vert,fragmentShader:Be.sprite_frag},background:{uniforms:{uvTransform:{value:new Ie},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:Be.background_vert,fragmentShader:Be.background_frag},backgroundCube:{uniforms:{envMap:{value:null},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new Ie}},vertexShader:Be.backgroundCube_vert,fragmentShader:Be.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:Be.cube_vert,fragmentShader:Be.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:Be.equirect_vert,fragmentShader:Be.equirect_frag},distance:{uniforms:Xt([le.common,le.displacementmap,{referencePosition:{value:new L},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:Be.distance_vert,fragmentShader:Be.distance_frag},shadow:{uniforms:Xt([le.lights,le.fog,{color:{value:new ge(0)},opacity:{value:1}}]),vertexShader:Be.shadow_vert,fragmentShader:Be.shadow_frag}};Wn.physical={uniforms:Xt([Wn.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new Ie},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new Ie},clearcoatNormalScale:{value:new be(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new Ie},dispersion:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new Ie},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new Ie},sheen:{value:0},sheenColor:{value:new ge(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new Ie},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new Ie},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new Ie},transmissionSamplerSize:{value:new be},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new Ie},attenuationDistance:{value:0},attenuationColor:{value:new ge(0)},specularColor:{value:new ge(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new Ie},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new Ie},anisotropyVector:{value:new be},anisotropyMap:{value:null},anisotropyMapTransform:{value:new Ie}}]),vertexShader:Be.meshphysical_vert,fragmentShader:Be.meshphysical_frag};var rc={r:0,b:0,g:0},Im=new Ue,$u=new Ie;$u.set(-1,0,0,0,1,0,0,0,1);function Pm(i,e,t,n,s,r){let o=new ge(0),a=s===!0?0:1,c,l,u=null,d=0,h=null;function p(_){let b=_.isScene===!0?_.background:null;if(b&&b.isTexture){let S=_.backgroundBlurriness>0;b=e.get(b,S)}return b}function g(_){let b=!1,S=p(_);S===null?m(o,a):S&&S.isColor&&(m(S,1),b=!0);let E=i.xr.getEnvironmentBlendMode();E==="additive"?t.buffers.color.setClear(0,0,0,1,r):E==="alpha-blend"&&t.buffers.color.setClear(0,0,0,0,r),(i.autoClear||b)&&(t.buffers.depth.setTest(!0),t.buffers.depth.setMask(!0),t.buffers.color.setMask(!0),i.clear(i.autoClearColor,i.autoClearDepth,i.autoClearStencil))}function v(_,b){let S=p(b);S&&(S.isCubeTexture||S.mapping===Hr)?(l===void 0&&(l=new Je(new Ei(1,1,1),new Jt({name:"BackgroundCubeMaterial",uniforms:as(Wn.backgroundCube.uniforms),vertexShader:Wn.backgroundCube.vertexShader,fragmentShader:Wn.backgroundCube.fragmentShader,side:kt,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),l.geometry.deleteAttribute("normal"),l.geometry.deleteAttribute("uv"),l.onBeforeRender=function(E,w,C){this.matrixWorld.copyPosition(C.matrixWorld)},Object.defineProperty(l.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),n.update(l)),l.material.uniforms.envMap.value=S,l.material.uniforms.backgroundBlurriness.value=b.backgroundBlurriness,l.material.uniforms.backgroundIntensity.value=b.backgroundIntensity,l.material.uniforms.backgroundRotation.value.setFromMatrix4(Im.makeRotationFromEuler(b.backgroundRotation)).transpose(),S.isCubeTexture&&S.isRenderTargetTexture===!1&&l.material.uniforms.backgroundRotation.value.premultiply($u),l.material.toneMapped=ze.getTransfer(S.colorSpace)!==Ke,(u!==S||d!==S.version||h!==i.toneMapping)&&(l.material.needsUpdate=!0,u=S,d=S.version,h=i.toneMapping),l.layers.enableAll(),_.unshift(l,l.geometry,l.material,0,0,null)):S&&S.isTexture&&(c===void 0&&(c=new Je(new Ji(2,2),new Jt({name:"BackgroundMaterial",uniforms:as(Wn.background.uniforms),vertexShader:Wn.background.vertexShader,fragmentShader:Wn.background.fragmentShader,side:an,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),c.geometry.deleteAttribute("normal"),Object.defineProperty(c.material,"map",{get:function(){return this.uniforms.t2D.value}}),n.update(c)),c.material.uniforms.t2D.value=S,c.material.uniforms.backgroundIntensity.value=b.backgroundIntensity,c.material.toneMapped=ze.getTransfer(S.colorSpace)!==Ke,S.matrixAutoUpdate===!0&&S.updateMatrix(),c.material.uniforms.uvTransform.value.copy(S.matrix),(u!==S||d!==S.version||h!==i.toneMapping)&&(c.material.needsUpdate=!0,u=S,d=S.version,h=i.toneMapping),c.layers.enableAll(),_.unshift(c,c.geometry,c.material,0,0,null))}function m(_,b){_.getRGB(rc,Ol(i)),t.buffers.color.setClear(rc.r,rc.g,rc.b,b,r)}function f(){l!==void 0&&(l.geometry.dispose(),l.material.dispose(),l=void 0),c!==void 0&&(c.geometry.dispose(),c.material.dispose(),c=void 0)}return{getClearColor:function(){return o},setClearColor:function(_,b=1){o.set(_),a=b,m(o,a)},getClearAlpha:function(){return a},setClearAlpha:function(_){a=_,m(o,a)},render:g,addToRenderList:v,dispose:f}}function Lm(i,e){let t=i.getParameter(i.MAX_VERTEX_ATTRIBS),n={},s=h(null),r=s,o=!1;function a(R,O,G,X,U){let F=!1,V=d(R,X,G,O);r!==V&&(r=V,l(r.object)),F=p(R,X,G,U),F&&g(R,X,G,U),U!==null&&e.update(U,i.ELEMENT_ARRAY_BUFFER),(F||o)&&(o=!1,S(R,O,G,X),U!==null&&i.bindBuffer(i.ELEMENT_ARRAY_BUFFER,e.get(U).buffer))}function c(){return i.createVertexArray()}function l(R){return i.bindVertexArray(R)}function u(R){return i.deleteVertexArray(R)}function d(R,O,G,X){let U=X.wireframe===!0,F=n[O.id];F===void 0&&(F={},n[O.id]=F);let V=R.isInstancedMesh===!0?R.id:0,j=F[V];j===void 0&&(j={},F[V]=j);let $=j[G.id];$===void 0&&($={},j[G.id]=$);let ae=$[U];return ae===void 0&&(ae=h(c()),$[U]=ae),ae}function h(R){let O=[],G=[],X=[];for(let U=0;U<t;U++)O[U]=0,G[U]=0,X[U]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:O,enabledAttributes:G,attributeDivisors:X,object:R,attributes:{},index:null}}function p(R,O,G,X){let U=r.attributes,F=O.attributes,V=0,j=G.getAttributes();for(let $ in j)if(j[$].location>=0){let ye=U[$],we=F[$];if(we===void 0&&($==="instanceMatrix"&&R.instanceMatrix&&(we=R.instanceMatrix),$==="instanceColor"&&R.instanceColor&&(we=R.instanceColor)),ye===void 0||ye.attribute!==we||we&&ye.data!==we.data)return!0;V++}return r.attributesNum!==V||r.index!==X}function g(R,O,G,X){let U={},F=O.attributes,V=0,j=G.getAttributes();for(let $ in j)if(j[$].location>=0){let ye=F[$];ye===void 0&&($==="instanceMatrix"&&R.instanceMatrix&&(ye=R.instanceMatrix),$==="instanceColor"&&R.instanceColor&&(ye=R.instanceColor));let we={};we.attribute=ye,ye&&ye.data&&(we.data=ye.data),U[$]=we,V++}r.attributes=U,r.attributesNum=V,r.index=X}function v(){let R=r.newAttributes;for(let O=0,G=R.length;O<G;O++)R[O]=0}function m(R){f(R,0)}function f(R,O){let G=r.newAttributes,X=r.enabledAttributes,U=r.attributeDivisors;G[R]=1,X[R]===0&&(i.enableVertexAttribArray(R),X[R]=1),U[R]!==O&&(i.vertexAttribDivisor(R,O),U[R]=O)}function _(){let R=r.newAttributes,O=r.enabledAttributes;for(let G=0,X=O.length;G<X;G++)O[G]!==R[G]&&(i.disableVertexAttribArray(G),O[G]=0)}function b(R,O,G,X,U,F,V){V===!0?i.vertexAttribIPointer(R,O,G,U,F):i.vertexAttribPointer(R,O,G,X,U,F)}function S(R,O,G,X){v();let U=X.attributes,F=G.getAttributes(),V=O.defaultAttributeValues;for(let j in F){let $=F[j];if($.location>=0){let ae=U[j];if(ae===void 0&&(j==="instanceMatrix"&&R.instanceMatrix&&(ae=R.instanceMatrix),j==="instanceColor"&&R.instanceColor&&(ae=R.instanceColor)),ae!==void 0){let ye=ae.normalized,we=ae.itemSize,qe=e.get(ae);if(qe===void 0)continue;let Qe=qe.buffer,Fe=qe.type,K=qe.bytesPerElement,de=Fe===i.INT||Fe===i.UNSIGNED_INT||ae.gpuType===Ma;if(ae.isInterleavedBufferAttribute){let ie=ae.data,Re=ie.stride,Le=ae.offset;if(ie.isInstancedInterleavedBuffer){for(let Ce=0;Ce<$.locationSize;Ce++)f($.location+Ce,ie.meshPerAttribute);R.isInstancedMesh!==!0&&X._maxInstanceCount===void 0&&(X._maxInstanceCount=ie.meshPerAttribute*ie.count)}else for(let Ce=0;Ce<$.locationSize;Ce++)m($.location+Ce);i.bindBuffer(i.ARRAY_BUFFER,Qe);for(let Ce=0;Ce<$.locationSize;Ce++)b($.location+Ce,we/$.locationSize,Fe,ye,Re*K,(Le+we/$.locationSize*Ce)*K,de)}else{if(ae.isInstancedBufferAttribute){for(let ie=0;ie<$.locationSize;ie++)f($.location+ie,ae.meshPerAttribute);R.isInstancedMesh!==!0&&X._maxInstanceCount===void 0&&(X._maxInstanceCount=ae.meshPerAttribute*ae.count)}else for(let ie=0;ie<$.locationSize;ie++)m($.location+ie);i.bindBuffer(i.ARRAY_BUFFER,Qe);for(let ie=0;ie<$.locationSize;ie++)b($.location+ie,we/$.locationSize,Fe,ye,we*K,we/$.locationSize*ie*K,de)}}else if(V!==void 0){let ye=V[j];if(ye!==void 0)switch(ye.length){case 2:i.vertexAttrib2fv($.location,ye);break;case 3:i.vertexAttrib3fv($.location,ye);break;case 4:i.vertexAttrib4fv($.location,ye);break;default:i.vertexAttrib1fv($.location,ye)}}}}_()}function E(){A();for(let R in n){let O=n[R];for(let G in O){let X=O[G];for(let U in X){let F=X[U];for(let V in F)u(F[V].object),delete F[V];delete X[U]}}delete n[R]}}function w(R){if(n[R.id]===void 0)return;let O=n[R.id];for(let G in O){let X=O[G];for(let U in X){let F=X[U];for(let V in F)u(F[V].object),delete F[V];delete X[U]}}delete n[R.id]}function C(R){for(let O in n){let G=n[O];for(let X in G){let U=G[X];if(U[R.id]===void 0)continue;let F=U[R.id];for(let V in F)u(F[V].object),delete F[V];delete U[R.id]}}}function y(R){for(let O in n){let G=n[O],X=R.isInstancedMesh===!0?R.id:0,U=G[X];if(U!==void 0){for(let F in U){let V=U[F];for(let j in V)u(V[j].object),delete V[j];delete U[F]}delete G[X],Object.keys(G).length===0&&delete n[O]}}}function A(){I(),o=!0,r!==s&&(r=s,l(r.object))}function I(){s.geometry=null,s.program=null,s.wireframe=!1}return{setup:a,reset:A,resetDefaultState:I,dispose:E,releaseStatesOfGeometry:w,releaseStatesOfObject:y,releaseStatesOfProgram:C,initAttributes:v,enableAttribute:m,disableUnusedAttributes:_}}function Dm(i,e,t){let n;function s(c){n=c}function r(c,l){i.drawArrays(n,c,l),t.update(l,n,1)}function o(c,l,u){u!==0&&(i.drawArraysInstanced(n,c,l,u),t.update(l,n,u))}function a(c,l,u){if(u===0)return;e.get("WEBGL_multi_draw").multiDrawArraysWEBGL(n,c,0,l,0,u);let h=0;for(let p=0;p<u;p++)h+=l[p];t.update(h,n,1)}this.setMode=s,this.render=r,this.renderInstances=o,this.renderMultiDraw=a}function Nm(i,e,t,n){let s;function r(){if(s!==void 0)return s;if(e.has("EXT_texture_filter_anisotropic")===!0){let C=e.get("EXT_texture_filter_anisotropic");s=i.getParameter(C.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else s=0;return s}function o(C){return!(C!==dn&&n.convert(C)!==i.getParameter(i.IMPLEMENTATION_COLOR_READ_FORMAT))}function a(C){let y=C===Hn&&(e.has("EXT_color_buffer_half_float")||e.has("EXT_color_buffer_float"));return!(C!==Wt&&n.convert(C)!==i.getParameter(i.IMPLEMENTATION_COLOR_READ_TYPE)&&C!==un&&!y)}function c(C){if(C==="highp"){if(i.getShaderPrecisionFormat(i.VERTEX_SHADER,i.HIGH_FLOAT).precision>0&&i.getShaderPrecisionFormat(i.FRAGMENT_SHADER,i.HIGH_FLOAT).precision>0)return"highp";C="mediump"}return C==="mediump"&&i.getShaderPrecisionFormat(i.VERTEX_SHADER,i.MEDIUM_FLOAT).precision>0&&i.getShaderPrecisionFormat(i.FRAGMENT_SHADER,i.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}let l=t.precision!==void 0?t.precision:"highp",u=c(l);u!==l&&(ve("WebGLRenderer:",l,"not supported, using",u,"instead."),l=u);let d=t.logarithmicDepthBuffer===!0,h=t.reversedDepthBuffer===!0&&e.has("EXT_clip_control");t.reversedDepthBuffer===!0&&h===!1&&ve("WebGLRenderer: Unable to use reversed depth buffer due to missing EXT_clip_control extension. Fallback to default depth buffer.");let p=i.getParameter(i.MAX_TEXTURE_IMAGE_UNITS),g=i.getParameter(i.MAX_VERTEX_TEXTURE_IMAGE_UNITS),v=i.getParameter(i.MAX_TEXTURE_SIZE),m=i.getParameter(i.MAX_CUBE_MAP_TEXTURE_SIZE),f=i.getParameter(i.MAX_VERTEX_ATTRIBS),_=i.getParameter(i.MAX_VERTEX_UNIFORM_VECTORS),b=i.getParameter(i.MAX_VARYING_VECTORS),S=i.getParameter(i.MAX_FRAGMENT_UNIFORM_VECTORS),E=i.getParameter(i.MAX_SAMPLES),w=i.getParameter(i.SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:r,getMaxPrecision:c,textureFormatReadable:o,textureTypeReadable:a,precision:l,logarithmicDepthBuffer:d,reversedDepthBuffer:h,maxTextures:p,maxVertexTextures:g,maxTextureSize:v,maxCubemapSize:m,maxAttributes:f,maxVertexUniforms:_,maxVaryings:b,maxFragmentUniforms:S,maxSamples:E,samples:w}}function Um(i){let e=this,t=null,n=0,s=!1,r=!1,o=new mn,a=new Ie,c={value:null,needsUpdate:!1};this.uniform=c,this.numPlanes=0,this.numIntersection=0,this.init=function(d,h){let p=d.length!==0||h||n!==0||s;return s=h,n=d.length,p},this.beginShadows=function(){r=!0,u(null)},this.endShadows=function(){r=!1},this.setGlobalState=function(d,h){t=u(d,h,0)},this.setState=function(d,h,p){let g=d.clippingPlanes,v=d.clipIntersection,m=d.clipShadows,f=i.get(d);if(!s||g===null||g.length===0||r&&!m)r?u(null):l();else{let _=r?0:n,b=_*4,S=f.clippingState||null;c.value=S,S=u(g,h,b,p);for(let E=0;E!==b;++E)S[E]=t[E];f.clippingState=S,this.numIntersection=v?this.numPlanes:0,this.numPlanes+=_}};function l(){c.value!==t&&(c.value=t,c.needsUpdate=n>0),e.numPlanes=n,e.numIntersection=0}function u(d,h,p,g){let v=d!==null?d.length:0,m=null;if(v!==0){if(m=c.value,g!==!0||m===null){let f=p+v*4,_=h.matrixWorldInverse;a.getNormalMatrix(_),(m===null||m.length<f)&&(m=new Float32Array(f));for(let b=0,S=p;b!==v;++b,S+=4)o.copy(d[b]).applyMatrix4(_,a),o.normal.toArray(m,S),m[S+3]=o.constant}c.value=m,c.needsUpdate=!0}return e.numPlanes=v,e.numIntersection=0,m}}var Ni=4,Ru=[.125,.215,.35,.446,.526,.582],cs=20,Fm=256,$r=new Ri,Cu=new ge,Vl=null,Hl=0,Gl=0,Wl=!1,Om=new L,Js=class{constructor(e){this._renderer=e,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._sizeLods=[],this._sigmas=[],this._lodMeshes=[],this._backgroundBox=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._blurMaterial=null,this._ggxMaterial=null}fromScene(e,t=0,n=.1,s=100,r={}){let{size:o=256,position:a=Om}=r;Vl=this._renderer.getRenderTarget(),Hl=this._renderer.getActiveCubeFace(),Gl=this._renderer.getActiveMipmapLevel(),Wl=this._renderer.xr.enabled,this._renderer.xr.enabled=!1,this._setSize(o);let c=this._allocateTargets();return c.depthBuffer=!0,this._sceneToCubeUV(e,n,s,c,a),t>0&&this._blur(c,0,0,t),this._applyPMREM(c),this._cleanup(c),c}fromEquirectangular(e,t=null){return this._fromTexture(e,t)}fromCubemap(e,t=null){return this._fromTexture(e,t)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=Lu(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=Pu(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose(),this._backgroundBox!==null&&(this._backgroundBox.geometry.dispose(),this._backgroundBox.material.dispose())}_setSize(e){this._lodMax=Math.floor(Math.log2(e)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._ggxMaterial!==null&&this._ggxMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let e=0;e<this._lodMeshes.length;e++)this._lodMeshes[e].geometry.dispose()}_cleanup(e){this._renderer.setRenderTarget(Vl,Hl,Gl),this._renderer.xr.enabled=Wl,e.scissorTest=!1,js(e,0,0,e.width,e.height)}_fromTexture(e,t){e.mapping===Pi||e.mapping===rs?this._setSize(e.image.length===0?16:e.image[0].width||e.image[0].image.width):this._setSize(e.image.width/4),Vl=this._renderer.getRenderTarget(),Hl=this._renderer.getActiveCubeFace(),Gl=this._renderer.getActiveMipmapLevel(),Wl=this._renderer.xr.enabled,this._renderer.xr.enabled=!1;let n=t||this._allocateTargets();return this._textureToCubeUV(e,n),this._applyPMREM(n),this._cleanup(n),n}_allocateTargets(){let e=3*Math.max(this._cubeSize,112),t=4*this._cubeSize,n={magFilter:gt,minFilter:gt,generateMipmaps:!1,type:Hn,format:dn,colorSpace:Kt,depthBuffer:!1},s=Iu(e,t,n);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==e||this._pingPongRenderTarget.height!==t){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=Iu(e,t,n);let{_lodMax:r}=this;({lodMeshes:this._lodMeshes,sizeLods:this._sizeLods,sigmas:this._sigmas}=Bm(r)),this._blurMaterial=zm(r,e,t),this._ggxMaterial=km(r,e,t)}return s}_compileMaterial(e){let t=new Je(new Rt,e);this._renderer.compile(t,$r)}_sceneToCubeUV(e,t,n,s,r){let c=new At(90,1,t,n),l=[1,-1,1,1,1,1],u=[1,1,1,-1,-1,-1],d=this._renderer,h=d.autoClear,p=d.toneMapping;d.getClearColor(Cu),d.toneMapping=Rn,d.autoClear=!1,d.state.buffers.depth.getReversed()&&(d.setRenderTarget(s),d.clearDepth(),d.setRenderTarget(null)),this._backgroundBox===null&&(this._backgroundBox=new Je(new Ei,new _n({name:"PMREM.Background",side:kt,depthWrite:!1,depthTest:!1})));let v=this._backgroundBox,m=v.material,f=!1,_=e.background;_?_.isColor&&(m.color.copy(_),e.background=null,f=!0):(m.color.copy(Cu),f=!0);for(let b=0;b<6;b++){let S=b%3;S===0?(c.up.set(0,l[b],0),c.position.set(r.x,r.y,r.z),c.lookAt(r.x+u[b],r.y,r.z)):S===1?(c.up.set(0,0,l[b]),c.position.set(r.x,r.y,r.z),c.lookAt(r.x,r.y+u[b],r.z)):(c.up.set(0,l[b],0),c.position.set(r.x,r.y,r.z),c.lookAt(r.x,r.y,r.z+u[b]));let E=this._cubeSize;js(s,S*E,b>2?E:0,E,E),d.setRenderTarget(s),f&&d.render(v,c),d.render(e,c)}d.toneMapping=p,d.autoClear=h,e.background=_}_textureToCubeUV(e,t){let n=this._renderer,s=e.mapping===Pi||e.mapping===rs;s?(this._cubemapMaterial===null&&(this._cubemapMaterial=Lu()),this._cubemapMaterial.uniforms.flipEnvMap.value=e.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=Pu());let r=s?this._cubemapMaterial:this._equirectMaterial,o=this._lodMeshes[0];o.material=r;let a=r.uniforms;a.envMap.value=e;let c=this._cubeSize;js(t,0,0,3*c,2*c),n.setRenderTarget(t),n.render(o,$r)}_applyPMREM(e){let t=this._renderer,n=t.autoClear;t.autoClear=!1;let s=this._lodMeshes.length;for(let r=1;r<s;r++)this._applyGGXFilter(e,r-1,r);t.autoClear=n}_applyGGXFilter(e,t,n){let s=this._renderer,r=this._pingPongRenderTarget,o=this._ggxMaterial,a=this._lodMeshes[n];a.material=o;let c=o.uniforms,l=n/(this._lodMeshes.length-1),u=t/(this._lodMeshes.length-1),d=Math.sqrt(l*l-u*u),h=0+l*1.25,p=d*h,{_lodMax:g}=this,v=this._sizeLods[n],m=3*v*(n>g-Ni?n-g+Ni:0),f=4*(this._cubeSize-v);c.envMap.value=e.texture,c.roughness.value=p,c.mipInt.value=g-t,js(r,m,f,3*v,2*v),s.setRenderTarget(r),s.render(a,$r),c.envMap.value=r.texture,c.roughness.value=0,c.mipInt.value=g-n,js(e,m,f,3*v,2*v),s.setRenderTarget(e),s.render(a,$r)}_blur(e,t,n,s,r){let o=this._pingPongRenderTarget;this._halfBlur(e,o,t,n,s,"latitudinal",r),this._halfBlur(o,e,n,n,s,"longitudinal",r)}_halfBlur(e,t,n,s,r,o,a){let c=this._renderer,l=this._blurMaterial;o!=="latitudinal"&&o!=="longitudinal"&&Ee("blur direction must be either latitudinal or longitudinal!");let u=3,d=this._lodMeshes[s];d.material=l;let h=l.uniforms,p=this._sizeLods[n]-1,g=isFinite(r)?Math.PI/(2*p):2*Math.PI/(2*cs-1),v=r/g,m=isFinite(r)?1+Math.floor(u*v):cs;m>cs&&ve(`sigmaRadians, ${r}, is too large and will clip, as it requested ${m} samples when the maximum is set to ${cs}`);let f=[],_=0;for(let C=0;C<cs;++C){let y=C/v,A=Math.exp(-y*y/2);f.push(A),C===0?_+=A:C<m&&(_+=2*A)}for(let C=0;C<f.length;C++)f[C]=f[C]/_;h.envMap.value=e.texture,h.samples.value=m,h.weights.value=f,h.latitudinal.value=o==="latitudinal",a&&(h.poleAxis.value=a);let{_lodMax:b}=this;h.dTheta.value=g,h.mipInt.value=b-n;let S=this._sizeLods[s],E=3*S*(s>b-Ni?s-b+Ni:0),w=4*(this._cubeSize-S);js(t,E,w,3*S,2*S),c.setRenderTarget(t),c.render(d,$r)}};function Bm(i){let e=[],t=[],n=[],s=i,r=i-Ni+1+Ru.length;for(let o=0;o<r;o++){let a=Math.pow(2,s);e.push(a);let c=1/a;o>i-Ni?c=Ru[o-i+Ni-1]:o===0&&(c=0),t.push(c);let l=1/(a-2),u=-l,d=1+l,h=[u,u,d,u,d,d,u,u,d,d,u,d],p=6,g=6,v=3,m=2,f=1,_=new Float32Array(v*g*p),b=new Float32Array(m*g*p),S=new Float32Array(f*g*p);for(let w=0;w<p;w++){let C=w%3*2/3-1,y=w>2?0:-1,A=[C,y,0,C+2/3,y,0,C+2/3,y+1,0,C,y,0,C+2/3,y+1,0,C,y+1,0];_.set(A,v*g*w),b.set(h,m*g*w);let I=[w,w,w,w,w,w];S.set(I,f*g*w)}let E=new Rt;E.setAttribute("position",new mt(_,v)),E.setAttribute("uv",new mt(b,m)),E.setAttribute("faceIndex",new mt(S,f)),n.push(new Je(E,null)),s>Ni&&s--}return{lodMeshes:n,sizeLods:e,sigmas:t}}function Iu(i,e,t){let n=new cn(i,e,t);return n.texture.mapping=Hr,n.texture.name="PMREM.cubeUv",n.scissorTest=!0,n}function js(i,e,t,n,s){i.viewport.set(e,t,n,s),i.scissor.set(e,t,n,s)}function km(i,e,t){return new Jt({name:"PMREMGGXConvolution",defines:{GGX_SAMPLES:Fm,CUBEUV_TEXEL_WIDTH:1/e,CUBEUV_TEXEL_HEIGHT:1/t,CUBEUV_MAX_MIP:`${i}.0`},uniforms:{envMap:{value:null},roughness:{value:0},mipInt:{value:0}},vertexShader:lc(),fragmentShader:`

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
		`,blending:Vn,depthTest:!1,depthWrite:!1})}function zm(i,e,t){let n=new Float32Array(cs),s=new L(0,1,0);return new Jt({name:"SphericalGaussianBlur",defines:{n:cs,CUBEUV_TEXEL_WIDTH:1/e,CUBEUV_TEXEL_HEIGHT:1/t,CUBEUV_MAX_MIP:`${i}.0`},uniforms:{envMap:{value:null},samples:{value:1},weights:{value:n},latitudinal:{value:!1},dTheta:{value:0},mipInt:{value:0},poleAxis:{value:s}},vertexShader:lc(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;
			uniform int samples;
			uniform float weights[ n ];
			uniform bool latitudinal;
			uniform float dTheta;
			uniform float mipInt;
			uniform vec3 poleAxis;

			#define ENVMAP_TYPE_CUBE_UV
			#include <cube_uv_reflection_fragment>

			vec3 getSample( float theta, vec3 axis ) {

				float cosTheta = cos( theta );
				// Rodrigues' axis-angle rotation
				vec3 sampleDirection = vOutputDirection * cosTheta
					+ cross( axis, vOutputDirection ) * sin( theta )
					+ axis * dot( axis, vOutputDirection ) * ( 1.0 - cosTheta );

				return bilinearCubeUV( envMap, sampleDirection, mipInt );

			}

			void main() {

				vec3 axis = latitudinal ? poleAxis : cross( poleAxis, vOutputDirection );

				if ( all( equal( axis, vec3( 0.0 ) ) ) ) {

					axis = vec3( vOutputDirection.z, 0.0, - vOutputDirection.x );

				}

				axis = normalize( axis );

				gl_FragColor = vec4( 0.0, 0.0, 0.0, 1.0 );
				gl_FragColor.rgb += weights[ 0 ] * getSample( 0.0, axis );

				for ( int i = 1; i < n; i++ ) {

					if ( i >= samples ) {

						break;

					}

					float theta = dTheta * float( i );
					gl_FragColor.rgb += weights[ i ] * getSample( -1.0 * theta, axis );
					gl_FragColor.rgb += weights[ i ] * getSample( theta, axis );

				}

			}
		`,blending:Vn,depthTest:!1,depthWrite:!1})}function Pu(){return new Jt({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:lc(),fragmentShader:`

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
		`,blending:Vn,depthTest:!1,depthWrite:!1})}function Lu(){return new Jt({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:lc(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:Vn,depthTest:!1,depthWrite:!1})}function lc(){return`

		precision mediump float;
		precision mediump int;

		attribute float faceIndex;

		varying vec3 vOutputDirection;

		// RH coordinate system; PMREM face-indexing convention
		vec3 getDirection( vec2 uv, float face ) {

			uv = 2.0 * uv - 1.0;

			vec3 direction = vec3( uv, 1.0 );

			if ( face == 0.0 ) {

				direction = direction.zyx; // ( 1, v, u ) pos x

			} else if ( face == 1.0 ) {

				direction = direction.xzy;
				direction.xz *= -1.0; // ( -u, 1, -v ) pos y

			} else if ( face == 2.0 ) {

				direction.x *= -1.0; // ( -u, v, 1 ) pos z

			} else if ( face == 3.0 ) {

				direction = direction.zyx;
				direction.xz *= -1.0; // ( -1, v, -u ) neg x

			} else if ( face == 4.0 ) {

				direction = direction.xzy;
				direction.xy *= -1.0; // ( -u, -1, v ) neg y

			} else if ( face == 5.0 ) {

				direction.z *= -1.0; // ( u, v, -1 ) neg z

			}

			return direction;

		}

		void main() {

			vOutputDirection = getDirection( uv, faceIndex );
			gl_Position = vec4( position, 1.0 );

		}
	`}var ac=class extends cn{constructor(e=1,t={}){super(e,e,t),this.isWebGLCubeRenderTarget=!0;let n={width:e,height:e,depth:1},s=[n,n,n,n,n,n];this.texture=new Ar(s),this._setTextureOptions(t),this.texture.isRenderTargetTexture=!0}fromEquirectangularTexture(e,t){this.texture.type=t.type,this.texture.colorSpace=t.colorSpace,this.texture.generateMipmaps=t.generateMipmaps,this.texture.minFilter=t.minFilter,this.texture.magFilter=t.magFilter;let n={uniforms:{tEquirect:{value:null}},vertexShader:`

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
			`},s=new Ei(5,5,5),r=new Jt({name:"CubemapFromEquirect",uniforms:as(n.uniforms),vertexShader:n.vertexShader,fragmentShader:n.fragmentShader,side:kt,blending:Vn});r.uniforms.tEquirect.value=t;let o=new Je(s,r),a=t.minFilter;return t.minFilter===hn&&(t.minFilter=gt),new ga(1,10,this).update(e,o),t.minFilter=a,o.geometry.dispose(),o.material.dispose(),this}clear(e,t=!0,n=!0,s=!0){let r=e.getRenderTarget();for(let o=0;o<6;o++)e.setRenderTarget(this,o),e.clear(t,n,s);e.setRenderTarget(r)}};function Vm(i){let e=new WeakMap,t=new WeakMap,n=null;function s(h,p=!1){return h==null?null:p?o(h):r(h)}function r(h){if(h&&h.isTexture){let p=h.mapping;if(p===xa||p===ya)if(e.has(h)){let g=e.get(h).texture;return a(g,h.mapping)}else{let g=h.image;if(g&&g.height>0){let v=new ac(g.height);return v.fromEquirectangularTexture(i,h),e.set(h,v),h.addEventListener("dispose",l),a(v.texture,h.mapping)}else return null}}return h}function o(h){if(h&&h.isTexture){let p=h.mapping,g=p===xa||p===ya,v=p===Pi||p===rs;if(g||v){let m=t.get(h),f=m!==void 0?m.texture.pmremVersion:0;if(h.isRenderTargetTexture&&h.pmremVersion!==f)return n===null&&(n=new Js(i)),m=g?n.fromEquirectangular(h,m):n.fromCubemap(h,m),m.texture.pmremVersion=h.pmremVersion,t.set(h,m),m.texture;if(m!==void 0)return m.texture;{let _=h.image;return g&&_&&_.height>0||v&&_&&c(_)?(n===null&&(n=new Js(i)),m=g?n.fromEquirectangular(h):n.fromCubemap(h),m.texture.pmremVersion=h.pmremVersion,t.set(h,m),h.addEventListener("dispose",u),m.texture):null}}}return h}function a(h,p){return p===xa?h.mapping=Pi:p===ya&&(h.mapping=rs),h}function c(h){let p=0,g=6;for(let v=0;v<g;v++)h[v]!==void 0&&p++;return p===g}function l(h){let p=h.target;p.removeEventListener("dispose",l);let g=e.get(p);g!==void 0&&(e.delete(p),g.dispose())}function u(h){let p=h.target;p.removeEventListener("dispose",u);let g=t.get(p);g!==void 0&&(t.delete(p),g.dispose())}function d(){e=new WeakMap,t=new WeakMap,n!==null&&(n.dispose(),n=null)}return{get:s,dispose:d}}function Hm(i){let e={};function t(n){if(e[n]!==void 0)return e[n];let s=i.getExtension(n);return e[n]=s,s}return{has:function(n){return t(n)!==null},init:function(){t("EXT_color_buffer_float"),t("WEBGL_clip_cull_distance"),t("OES_texture_float_linear"),t("EXT_color_buffer_half_float"),t("WEBGL_multisampled_render_to_texture"),t("WEBGL_render_shared_exponent")},get:function(n){let s=t(n);return s===null&&Zo("WebGLRenderer: "+n+" extension not supported."),s}}}function Gm(i,e,t,n){let s={},r=new WeakMap;function o(d){let h=d.target;h.index!==null&&e.remove(h.index);for(let g in h.attributes)e.remove(h.attributes[g]);h.removeEventListener("dispose",o),delete s[h.id];let p=r.get(h);p&&(e.remove(p),r.delete(h)),n.releaseStatesOfGeometry(h),h.isInstancedBufferGeometry===!0&&delete h._maxInstanceCount,t.memory.geometries--}function a(d,h){return s[h.id]===!0||(h.addEventListener("dispose",o),s[h.id]=!0,t.memory.geometries++),h}function c(d){let h=d.attributes;for(let p in h)e.update(h[p],i.ARRAY_BUFFER)}function l(d){let h=[],p=d.index,g=d.attributes.position,v=0;if(g===void 0)return;if(p!==null){let _=p.array;v=p.version;for(let b=0,S=_.length;b<S;b+=3){let E=_[b+0],w=_[b+1],C=_[b+2];h.push(E,w,w,C,C,E)}}else{let _=g.array;v=g.version;for(let b=0,S=_.length/3-1;b<S;b+=3){let E=b+0,w=b+1,C=b+2;h.push(E,w,w,C,C,E)}}let m=new(g.count>=65535?vr:yr)(h,1);m.version=v;let f=r.get(d);f&&e.remove(f),r.set(d,m)}function u(d){let h=r.get(d);if(h){let p=d.index;p!==null&&h.version<p.version&&l(d)}else l(d);return r.get(d)}return{get:a,update:c,getWireframeAttribute:u}}function Wm(i,e,t){let n;function s(d){n=d}let r,o;function a(d){r=d.type,o=d.bytesPerElement}function c(d,h){i.drawElements(n,h,r,d*o),t.update(h,n,1)}function l(d,h,p){p!==0&&(i.drawElementsInstanced(n,h,r,d*o,p),t.update(h,n,p))}function u(d,h,p){if(p===0)return;e.get("WEBGL_multi_draw").multiDrawElementsWEBGL(n,h,0,r,d,0,p);let v=0;for(let m=0;m<p;m++)v+=h[m];t.update(v,n,1)}this.setMode=s,this.setIndex=a,this.render=c,this.renderInstances=l,this.renderMultiDraw=u}function Xm(i){let e={geometries:0,textures:0},t={frame:0,calls:0,triangles:0,points:0,lines:0};function n(r,o,a){switch(t.calls++,o){case i.TRIANGLES:t.triangles+=a*(r/3);break;case i.LINES:t.lines+=a*(r/2);break;case i.LINE_STRIP:t.lines+=a*(r-1);break;case i.LINE_LOOP:t.lines+=a*r;break;case i.POINTS:t.points+=a*r;break;default:Ee("WebGLInfo: Unknown draw mode:",o);break}}function s(){t.calls=0,t.triangles=0,t.points=0,t.lines=0}return{memory:e,render:t,programs:null,autoReset:!0,reset:s,update:n}}function qm(i,e,t){let n=new WeakMap,s=new $e;function r(o,a,c){let l=o.morphTargetInfluences,u=a.morphAttributes.position||a.morphAttributes.normal||a.morphAttributes.color,d=u!==void 0?u.length:0,h=n.get(a);if(h===void 0||h.count!==d){let A=function(){C.dispose(),n.delete(a),a.removeEventListener("dispose",A)};h!==void 0&&h.texture.dispose();let p=a.morphAttributes.position!==void 0,g=a.morphAttributes.normal!==void 0,v=a.morphAttributes.color!==void 0,m=a.morphAttributes.position||[],f=a.morphAttributes.normal||[],_=a.morphAttributes.color||[],b=0;p===!0&&(b=1),g===!0&&(b=2),v===!0&&(b=3);let S=a.attributes.position.count*b,E=1;S>e.maxTextureSize&&(E=Math.ceil(S/e.maxTextureSize),S=e.maxTextureSize);let w=new Float32Array(S*E*4*d),C=new _r(w,S,E,d);C.type=un,C.needsUpdate=!0;let y=b*4;for(let I=0;I<d;I++){let R=m[I],O=f[I],G=_[I],X=S*E*4*I;for(let U=0;U<R.count;U++){let F=U*y;p===!0&&(s.fromBufferAttribute(R,U),w[X+F+0]=s.x,w[X+F+1]=s.y,w[X+F+2]=s.z,w[X+F+3]=0),g===!0&&(s.fromBufferAttribute(O,U),w[X+F+4]=s.x,w[X+F+5]=s.y,w[X+F+6]=s.z,w[X+F+7]=0),v===!0&&(s.fromBufferAttribute(G,U),w[X+F+8]=s.x,w[X+F+9]=s.y,w[X+F+10]=s.z,w[X+F+11]=G.itemSize===4?s.w:1)}}h={count:d,texture:C,size:new be(S,E)},n.set(a,h),a.addEventListener("dispose",A)}if(o.isInstancedMesh===!0&&o.morphTexture!==null)c.getUniforms().setValue(i,"morphTexture",o.morphTexture,t);else{let p=0;for(let v=0;v<l.length;v++)p+=l[v];let g=a.morphTargetsRelative?1:1-p;c.getUniforms().setValue(i,"morphTargetBaseInfluence",g),c.getUniforms().setValue(i,"morphTargetInfluences",l)}c.getUniforms().setValue(i,"morphTargetsTexture",h.texture,t),c.getUniforms().setValue(i,"morphTargetsTextureSize",h.size)}return{update:r}}function Ym(i,e,t,n,s){let r=new WeakMap;function o(l){let u=s.render.frame,d=l.geometry,h=e.get(l,d);if(r.get(h)!==u&&(e.update(h),r.set(h,u)),l.isInstancedMesh&&(l.hasEventListener("dispose",c)===!1&&l.addEventListener("dispose",c),r.get(l)!==u&&(t.update(l.instanceMatrix,i.ARRAY_BUFFER),l.instanceColor!==null&&t.update(l.instanceColor,i.ARRAY_BUFFER),r.set(l,u))),l.isSkinnedMesh){let p=l.skeleton;r.get(p)!==u&&(p.update(),r.set(p,u))}return h}function a(){r=new WeakMap}function c(l){let u=l.target;u.removeEventListener("dispose",c),n.releaseStatesOfObject(u),t.remove(u.instanceMatrix),u.instanceColor!==null&&t.remove(u.instanceColor)}return{update:o,dispose:a}}var Zm={[vl]:"LINEAR_TONE_MAPPING",[Ml]:"REINHARD_TONE_MAPPING",[bl]:"CINEON_TONE_MAPPING",[Vr]:"ACES_FILMIC_TONE_MAPPING",[Tl]:"AGX_TONE_MAPPING",[wl]:"NEUTRAL_TONE_MAPPING",[Sl]:"CUSTOM_TONE_MAPPING"};function Km(i,e,t,n,s){let r=new cn(e,t,{type:i,depthBuffer:n,stencilBuffer:s,depthTexture:n?new ii(e,t):void 0}),o=new cn(e,t,{type:Hn,depthBuffer:!1,stencilBuffer:!1}),a=new Rt;a.setAttribute("position",new Et([-1,3,0,-1,-1,0,3,-1,0],3)),a.setAttribute("uv",new Et([0,2,0,0,2,0],2));let c=new Rr({uniforms:{tDiffuse:{value:null}},vertexShader:`
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
			}`,depthTest:!1,depthWrite:!1}),l=new Je(a,c),u=new Ri(-1,1,1,-1,0,1),d=null,h=null,p=!1,g,v=null,m=[],f=!1;this.setSize=function(_,b){r.setSize(_,b),o.setSize(_,b);for(let S=0;S<m.length;S++){let E=m[S];E.setSize&&E.setSize(_,b)}},this.setEffects=function(_){m=_,f=m.length>0&&m[0].isRenderPass===!0;let b=r.width,S=r.height;for(let E=0;E<m.length;E++){let w=m[E];w.setSize&&w.setSize(b,S)}},this.begin=function(_,b){if(p||_.toneMapping===Rn&&m.length===0)return!1;if(v=b,b!==null){let S=b.width,E=b.height;(r.width!==S||r.height!==E)&&this.setSize(S,E)}return f===!1&&_.setRenderTarget(r),g=_.toneMapping,_.toneMapping=Rn,!0},this.hasRenderPass=function(){return f},this.end=function(_,b){_.toneMapping=g,p=!0;let S=r,E=o;for(let w=0;w<m.length;w++){let C=m[w];if(C.enabled!==!1&&(C.render(_,E,S,b),C.needsSwap!==!1)){let y=S;S=E,E=y}}if(d!==_.outputColorSpace||h!==_.toneMapping){d=_.outputColorSpace,h=_.toneMapping,c.defines={},ze.getTransfer(d)===Ke&&(c.defines.SRGB_TRANSFER="");let w=Zm[h];w&&(c.defines[w]=""),c.needsUpdate=!0}c.uniforms.tDiffuse.value=S.texture,_.setRenderTarget(v),_.render(l,u),v=null,p=!1},this.isCompositing=function(){return p},this.dispose=function(){r.depthTexture&&r.depthTexture.dispose(),r.dispose(),o.dispose(),a.dispose(),c.dispose()}}var Ju=new Ot,Yl=new ii(1,1),Qu=new _r,ed=new $o,td=new Ar,Du=[],Nu=[],Uu=new Float32Array(16),Fu=new Float32Array(9),Ou=new Float32Array(4);function Qs(i,e,t){let n=i[0];if(n<=0||n>0)return i;let s=e*t,r=Du[s];if(r===void 0&&(r=new Float32Array(s),Du[s]=r),e!==0){n.toArray(r,0);for(let o=1,a=0;o!==e;++o)a+=t,i[o].toArray(r,a)}return r}function Lt(i,e){if(i.length!==e.length)return!1;for(let t=0,n=i.length;t<n;t++)if(i[t]!==e[t])return!1;return!0}function Dt(i,e){for(let t=0,n=e.length;t<n;t++)i[t]=e[t]}function hc(i,e){let t=Nu[e];t===void 0&&(t=new Int32Array(e),Nu[e]=t);for(let n=0;n!==e;++n)t[n]=i.allocateTextureUnit();return t}function jm(i,e){let t=this.cache;t[0]!==e&&(i.uniform1f(this.addr,e),t[0]=e)}function $m(i,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(i.uniform2f(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(Lt(t,e))return;i.uniform2fv(this.addr,e),Dt(t,e)}}function Jm(i,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(i.uniform3f(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else if(e.r!==void 0)(t[0]!==e.r||t[1]!==e.g||t[2]!==e.b)&&(i.uniform3f(this.addr,e.r,e.g,e.b),t[0]=e.r,t[1]=e.g,t[2]=e.b);else{if(Lt(t,e))return;i.uniform3fv(this.addr,e),Dt(t,e)}}function Qm(i,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(i.uniform4f(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(Lt(t,e))return;i.uniform4fv(this.addr,e),Dt(t,e)}}function e2(i,e){let t=this.cache,n=e.elements;if(n===void 0){if(Lt(t,e))return;i.uniformMatrix2fv(this.addr,!1,e),Dt(t,e)}else{if(Lt(t,n))return;Ou.set(n),i.uniformMatrix2fv(this.addr,!1,Ou),Dt(t,n)}}function t2(i,e){let t=this.cache,n=e.elements;if(n===void 0){if(Lt(t,e))return;i.uniformMatrix3fv(this.addr,!1,e),Dt(t,e)}else{if(Lt(t,n))return;Fu.set(n),i.uniformMatrix3fv(this.addr,!1,Fu),Dt(t,n)}}function n2(i,e){let t=this.cache,n=e.elements;if(n===void 0){if(Lt(t,e))return;i.uniformMatrix4fv(this.addr,!1,e),Dt(t,e)}else{if(Lt(t,n))return;Uu.set(n),i.uniformMatrix4fv(this.addr,!1,Uu),Dt(t,n)}}function i2(i,e){let t=this.cache;t[0]!==e&&(i.uniform1i(this.addr,e),t[0]=e)}function s2(i,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(i.uniform2i(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(Lt(t,e))return;i.uniform2iv(this.addr,e),Dt(t,e)}}function r2(i,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(i.uniform3i(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(Lt(t,e))return;i.uniform3iv(this.addr,e),Dt(t,e)}}function o2(i,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(i.uniform4i(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(Lt(t,e))return;i.uniform4iv(this.addr,e),Dt(t,e)}}function a2(i,e){let t=this.cache;t[0]!==e&&(i.uniform1ui(this.addr,e),t[0]=e)}function c2(i,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(i.uniform2ui(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(Lt(t,e))return;i.uniform2uiv(this.addr,e),Dt(t,e)}}function l2(i,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(i.uniform3ui(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(Lt(t,e))return;i.uniform3uiv(this.addr,e),Dt(t,e)}}function h2(i,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(i.uniform4ui(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(Lt(t,e))return;i.uniform4uiv(this.addr,e),Dt(t,e)}}function u2(i,e,t){let n=this.cache,s=t.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s);let r;this.type===i.SAMPLER_2D_SHADOW?(Yl.compareFunction=t.isReversedDepthBuffer()?sc:ic,r=Yl):r=Ju,t.setTexture2D(e||r,s)}function d2(i,e,t){let n=this.cache,s=t.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s),t.setTexture3D(e||ed,s)}function f2(i,e,t){let n=this.cache,s=t.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s),t.setTextureCube(e||td,s)}function p2(i,e,t){let n=this.cache,s=t.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s),t.setTexture2DArray(e||Qu,s)}function m2(i){switch(i){case 5126:return jm;case 35664:return $m;case 35665:return Jm;case 35666:return Qm;case 35674:return e2;case 35675:return t2;case 35676:return n2;case 5124:case 35670:return i2;case 35667:case 35671:return s2;case 35668:case 35672:return r2;case 35669:case 35673:return o2;case 5125:return a2;case 36294:return c2;case 36295:return l2;case 36296:return h2;case 35678:case 36198:case 36298:case 36306:case 35682:return u2;case 35679:case 36299:case 36307:return d2;case 35680:case 36300:case 36308:case 36293:return f2;case 36289:case 36303:case 36311:case 36292:return p2}}function g2(i,e){i.uniform1fv(this.addr,e)}function _2(i,e){let t=Qs(e,this.size,2);i.uniform2fv(this.addr,t)}function x2(i,e){let t=Qs(e,this.size,3);i.uniform3fv(this.addr,t)}function y2(i,e){let t=Qs(e,this.size,4);i.uniform4fv(this.addr,t)}function v2(i,e){let t=Qs(e,this.size,4);i.uniformMatrix2fv(this.addr,!1,t)}function M2(i,e){let t=Qs(e,this.size,9);i.uniformMatrix3fv(this.addr,!1,t)}function b2(i,e){let t=Qs(e,this.size,16);i.uniformMatrix4fv(this.addr,!1,t)}function S2(i,e){i.uniform1iv(this.addr,e)}function T2(i,e){i.uniform2iv(this.addr,e)}function w2(i,e){i.uniform3iv(this.addr,e)}function A2(i,e){i.uniform4iv(this.addr,e)}function E2(i,e){i.uniform1uiv(this.addr,e)}function R2(i,e){i.uniform2uiv(this.addr,e)}function C2(i,e){i.uniform3uiv(this.addr,e)}function I2(i,e){i.uniform4uiv(this.addr,e)}function P2(i,e,t){let n=this.cache,s=e.length,r=hc(t,s);Lt(n,r)||(i.uniform1iv(this.addr,r),Dt(n,r));let o;this.type===i.SAMPLER_2D_SHADOW?o=Yl:o=Ju;for(let a=0;a!==s;++a)t.setTexture2D(e[a]||o,r[a])}function L2(i,e,t){let n=this.cache,s=e.length,r=hc(t,s);Lt(n,r)||(i.uniform1iv(this.addr,r),Dt(n,r));for(let o=0;o!==s;++o)t.setTexture3D(e[o]||ed,r[o])}function D2(i,e,t){let n=this.cache,s=e.length,r=hc(t,s);Lt(n,r)||(i.uniform1iv(this.addr,r),Dt(n,r));for(let o=0;o!==s;++o)t.setTextureCube(e[o]||td,r[o])}function N2(i,e,t){let n=this.cache,s=e.length,r=hc(t,s);Lt(n,r)||(i.uniform1iv(this.addr,r),Dt(n,r));for(let o=0;o!==s;++o)t.setTexture2DArray(e[o]||Qu,r[o])}function U2(i){switch(i){case 5126:return g2;case 35664:return _2;case 35665:return x2;case 35666:return y2;case 35674:return v2;case 35675:return M2;case 35676:return b2;case 5124:case 35670:return S2;case 35667:case 35671:return T2;case 35668:case 35672:return w2;case 35669:case 35673:return A2;case 5125:return E2;case 36294:return R2;case 36295:return C2;case 36296:return I2;case 35678:case 36198:case 36298:case 36306:case 35682:return P2;case 35679:case 36299:case 36307:return L2;case 35680:case 36300:case 36308:case 36293:return D2;case 36289:case 36303:case 36311:case 36292:return N2}}var Zl=class{constructor(e,t,n){this.id=e,this.addr=n,this.cache=[],this.type=t.type,this.setValue=m2(t.type)}},Kl=class{constructor(e,t,n){this.id=e,this.addr=n,this.cache=[],this.type=t.type,this.size=t.size,this.setValue=U2(t.type)}},jl=class{constructor(e){this.id=e,this.seq=[],this.map={}}setValue(e,t,n){let s=this.seq;for(let r=0,o=s.length;r!==o;++r){let a=s[r];a.setValue(e,t[a.id],n)}}},Xl=/(\w+)(\])?(\[|\.)?/g;function Bu(i,e){i.seq.push(e),i.map[e.id]=e}function F2(i,e,t){let n=i.name,s=n.length;for(Xl.lastIndex=0;;){let r=Xl.exec(n),o=Xl.lastIndex,a=r[1],c=r[2]==="]",l=r[3];if(c&&(a=a|0),l===void 0||l==="["&&o+2===s){Bu(t,l===void 0?new Zl(a,i,e):new Kl(a,i,e));break}else{let d=t.map[a];d===void 0&&(d=new jl(a),Bu(t,d)),t=d}}}var $s=class{constructor(e,t){this.seq=[],this.map={};let n=e.getProgramParameter(t,e.ACTIVE_UNIFORMS);for(let o=0;o<n;++o){let a=e.getActiveUniform(t,o),c=e.getUniformLocation(t,a.name);F2(a,c,this)}let s=[],r=[];for(let o of this.seq)o.type===e.SAMPLER_2D_SHADOW||o.type===e.SAMPLER_CUBE_SHADOW||o.type===e.SAMPLER_2D_ARRAY_SHADOW?s.push(o):r.push(o);s.length>0&&(this.seq=s.concat(r))}setValue(e,t,n,s){let r=this.map[t];r!==void 0&&r.setValue(e,n,s)}setOptional(e,t,n){let s=t[n];s!==void 0&&this.setValue(e,n,s)}static upload(e,t,n,s){for(let r=0,o=t.length;r!==o;++r){let a=t[r],c=n[a.id];c.needsUpdate!==!1&&a.setValue(e,c.value,s)}}static seqWithValue(e,t){let n=[];for(let s=0,r=e.length;s!==r;++s){let o=e[s];o.id in t&&n.push(o)}return n}};function ku(i,e,t){let n=i.createShader(e);return i.shaderSource(n,t),i.compileShader(n),n}var O2=37297,B2=0;function k2(i,e){let t=i.split(`
`),n=[],s=Math.max(e-6,0),r=Math.min(e+6,t.length);for(let o=s;o<r;o++){let a=o+1;n.push(`${a===e?">":" "} ${a}: ${t[o]}`)}return n.join(`
`)}var zu=new Ie;function z2(i){ze._getMatrix(zu,ze.workingColorSpace,i);let e=`mat3( ${zu.elements.map(t=>t.toFixed(4))} )`;switch(ze.getTransfer(i)){case mr:return[e,"LinearTransferOETF"];case Ke:return[e,"sRGBTransferOETF"];default:return ve("WebGLProgram: Unsupported color space: ",i),[e,"LinearTransferOETF"]}}function Vu(i,e,t){let n=i.getShaderParameter(e,i.COMPILE_STATUS),r=(i.getShaderInfoLog(e)||"").trim();if(n&&r==="")return"";let o=/ERROR: 0:(\d+)/.exec(r);if(o){let a=parseInt(o[1]);return t.toUpperCase()+`

`+r+`

`+k2(i.getShaderSource(e),a)}else return r}function V2(i,e){let t=z2(e);return[`vec4 ${i}( vec4 value ) {`,`	return ${t[1]}( vec4( value.rgb * ${t[0]}, value.a ) );`,"}"].join(`
`)}var H2={[vl]:"Linear",[Ml]:"Reinhard",[bl]:"Cineon",[Vr]:"ACESFilmic",[Tl]:"AgX",[wl]:"Neutral",[Sl]:"Custom"};function G2(i,e){let t=H2[e];return t===void 0?(ve("WebGLProgram: Unsupported toneMapping:",e),"vec3 "+i+"( vec3 color ) { return LinearToneMapping( color ); }"):"vec3 "+i+"( vec3 color ) { return "+t+"ToneMapping( color ); }"}var oc=new L;function W2(){ze.getLuminanceCoefficients(oc);let i=oc.x.toFixed(4),e=oc.y.toFixed(4),t=oc.z.toFixed(4);return["float luminance( const in vec3 rgb ) {",`	const vec3 weights = vec3( ${i}, ${e}, ${t} );`,"	return dot( weights, rgb );","}"].join(`
`)}function X2(i){return[i.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":"",i.extensionMultiDraw?"#extension GL_ANGLE_multi_draw : require":""].filter(Qr).join(`
`)}function q2(i){let e=[];for(let t in i){let n=i[t];n!==!1&&e.push("#define "+t+" "+n)}return e.join(`
`)}function Y2(i,e){let t={},n=i.getProgramParameter(e,i.ACTIVE_ATTRIBUTES);for(let s=0;s<n;s++){let r=i.getActiveAttrib(e,s),o=r.name,a=1;r.type===i.FLOAT_MAT2&&(a=2),r.type===i.FLOAT_MAT3&&(a=3),r.type===i.FLOAT_MAT4&&(a=4),t[o]={type:r.type,location:i.getAttribLocation(e,o),locationSize:a}}return t}function Qr(i){return i!==""}function Hu(i,e){let t=e.numSpotLightShadows+e.numSpotLightMaps-e.numSpotLightShadowsWithMaps;return i.replace(/NUM_DIR_LIGHTS/g,e.numDirLights).replace(/NUM_SPOT_LIGHTS/g,e.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,e.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,t).replace(/NUM_RECT_AREA_LIGHTS/g,e.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,e.numPointLights).replace(/NUM_HEMI_LIGHTS/g,e.numHemiLights).replace(/NUM_DIR_LIGHT_SHADOWS/g,e.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,e.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,e.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,e.numPointLightShadows)}function Gu(i,e){return i.replace(/NUM_CLIPPING_PLANES/g,e.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,e.numClippingPlanes-e.numClipIntersection)}var Z2=/^[ \t]*#include +<([\w\d./]+)>/gm;function $l(i){return i.replace(Z2,j2)}var K2=new Map;function j2(i,e){let t=Be[e];if(t===void 0){let n=K2.get(e);if(n!==void 0)t=Be[n],ve('WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',e,n);else throw new Error("Can not resolve #include <"+e+">")}return $l(t)}var $2=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function Wu(i){return i.replace($2,J2)}function J2(i,e,t,n){let s="";for(let r=parseInt(e);r<parseInt(t);r++)s+=n.replace(/\[\s*i\s*\]/g,"[ "+r+" ]").replace(/UNROLLED_LOOP_INDEX/g,r);return s}function Xu(i){let e=`precision ${i.precision} float;
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
#define LOW_PRECISION`),e}var Q2={[ss]:"SHADOWMAP_TYPE_PCF",[Ws]:"SHADOWMAP_TYPE_VSM"};function e3(i){return Q2[i.shadowMapType]||"SHADOWMAP_TYPE_BASIC"}var t3={[Pi]:"ENVMAP_TYPE_CUBE",[rs]:"ENVMAP_TYPE_CUBE",[Hr]:"ENVMAP_TYPE_CUBE_UV"};function n3(i){return i.envMap===!1?"ENVMAP_TYPE_CUBE":t3[i.envMapMode]||"ENVMAP_TYPE_CUBE"}var i3={[rs]:"ENVMAP_MODE_REFRACTION"};function s3(i){return i.envMap===!1?"ENVMAP_MODE_REFLECTION":i3[i.envMapMode]||"ENVMAP_MODE_REFLECTION"}var r3={[zr]:"ENVMAP_BLENDING_MULTIPLY",[cu]:"ENVMAP_BLENDING_MIX",[lu]:"ENVMAP_BLENDING_ADD"};function o3(i){return i.envMap===!1?"ENVMAP_BLENDING_NONE":r3[i.combine]||"ENVMAP_BLENDING_NONE"}function a3(i){let e=i.envMapCubeUVHeight;if(e===null)return null;let t=Math.log2(e)-2,n=1/e;return{texelWidth:1/(3*Math.max(Math.pow(2,t),112)),texelHeight:n,maxMip:t}}function c3(i,e,t,n){let s=i.getContext(),r=t.defines,o=t.vertexShader,a=t.fragmentShader,c=e3(t),l=n3(t),u=s3(t),d=o3(t),h=a3(t),p=X2(t),g=q2(r),v=s.createProgram(),m,f,_=t.glslVersion?"#version "+t.glslVersion+`
`:"";t.isRawShaderMaterial?(m=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,g].filter(Qr).join(`
`),m.length>0&&(m+=`
`),f=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,g].filter(Qr).join(`
`),f.length>0&&(f+=`
`)):(m=[Xu(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,g,t.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",t.batching?"#define USE_BATCHING":"",t.batchingColor?"#define USE_BATCHING_COLOR":"",t.instancing?"#define USE_INSTANCING":"",t.instancingColor?"#define USE_INSTANCING_COLOR":"",t.instancingMorph?"#define USE_INSTANCING_MORPH":"",t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.map?"#define USE_MAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+u:"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.displacementMap?"#define USE_DISPLACEMENTMAP":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.mapUv?"#define MAP_UV "+t.mapUv:"",t.alphaMapUv?"#define ALPHAMAP_UV "+t.alphaMapUv:"",t.lightMapUv?"#define LIGHTMAP_UV "+t.lightMapUv:"",t.aoMapUv?"#define AOMAP_UV "+t.aoMapUv:"",t.emissiveMapUv?"#define EMISSIVEMAP_UV "+t.emissiveMapUv:"",t.bumpMapUv?"#define BUMPMAP_UV "+t.bumpMapUv:"",t.normalMapUv?"#define NORMALMAP_UV "+t.normalMapUv:"",t.displacementMapUv?"#define DISPLACEMENTMAP_UV "+t.displacementMapUv:"",t.metalnessMapUv?"#define METALNESSMAP_UV "+t.metalnessMapUv:"",t.roughnessMapUv?"#define ROUGHNESSMAP_UV "+t.roughnessMapUv:"",t.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+t.anisotropyMapUv:"",t.clearcoatMapUv?"#define CLEARCOATMAP_UV "+t.clearcoatMapUv:"",t.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+t.clearcoatNormalMapUv:"",t.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+t.clearcoatRoughnessMapUv:"",t.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+t.iridescenceMapUv:"",t.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+t.iridescenceThicknessMapUv:"",t.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+t.sheenColorMapUv:"",t.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+t.sheenRoughnessMapUv:"",t.specularMapUv?"#define SPECULARMAP_UV "+t.specularMapUv:"",t.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+t.specularColorMapUv:"",t.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+t.specularIntensityMapUv:"",t.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+t.transmissionMapUv:"",t.thicknessMapUv?"#define THICKNESSMAP_UV "+t.thicknessMapUv:"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexNormals?"#define HAS_NORMAL":"",t.vertexColors?"#define USE_COLOR":"",t.vertexAlphas?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.flatShading?"#define FLAT_SHADED":"",t.skinning?"#define USE_SKINNING":"",t.morphTargets?"#define USE_MORPHTARGETS":"",t.morphNormals&&t.flatShading===!1?"#define USE_MORPHNORMALS":"",t.morphColors?"#define USE_MORPHCOLORS":"",t.morphTargetsCount>0?"#define MORPHTARGETS_TEXTURE_STRIDE "+t.morphTextureStride:"",t.morphTargetsCount>0?"#define MORPHTARGETS_COUNT "+t.morphTargetsCount:"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+c:"",t.sizeAttenuation?"#define USE_SIZEATTENUATION":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",t.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","#ifdef USE_INSTANCING_MORPH","	uniform sampler2D morphTexture;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(Qr).join(`
`),f=[Xu(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,g,t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.alphaToCoverage?"#define ALPHA_TO_COVERAGE":"",t.map?"#define USE_MAP":"",t.matcap?"#define USE_MATCAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+l:"",t.envMap?"#define "+u:"",t.envMap?"#define "+d:"",h?"#define CUBEUV_TEXEL_WIDTH "+h.texelWidth:"",h?"#define CUBEUV_TEXEL_HEIGHT "+h.texelHeight:"",h?"#define CUBEUV_MAX_MIP "+h.maxMip+".0":"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.packedNormalMap?"#define USE_PACKED_NORMALMAP":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoat?"#define USE_CLEARCOAT":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.dispersion?"#define USE_DISPERSION":"",t.iridescence?"#define USE_IRIDESCENCE":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaTest?"#define USE_ALPHATEST":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.sheen?"#define USE_SHEEN":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexColors||t.instancingColor?"#define USE_COLOR":"",t.vertexAlphas||t.batchingColor?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.gradientMap?"#define USE_GRADIENTMAP":"",t.flatShading?"#define FLAT_SHADED":"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+c:"",t.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.numLightProbeGrids>0?"#define USE_LIGHT_PROBES_GRID":"",t.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",t.decodeVideoTextureEmissive?"#define DECODE_VIDEO_TEXTURE_EMISSIVE":"",t.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",t.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",t.toneMapping!==Rn?"#define TONE_MAPPING":"",t.toneMapping!==Rn?Be.tonemapping_pars_fragment:"",t.toneMapping!==Rn?G2("toneMapping",t.toneMapping):"",t.dithering?"#define DITHERING":"",t.opaque?"#define OPAQUE":"",Be.colorspace_pars_fragment,V2("linearToOutputTexel",t.outputColorSpace),W2(),t.useDepthPacking?"#define DEPTH_PACKING "+t.depthPacking:"",`
`].filter(Qr).join(`
`)),o=$l(o),o=Hu(o,t),o=Gu(o,t),a=$l(a),a=Hu(a,t),a=Gu(a,t),o=Wu(o),a=Wu(a),t.isRawShaderMaterial!==!0&&(_=`#version 300 es
`,m=[p,"#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+m,f=["#define varying in",t.glslVersion===Ul?"":"layout(location = 0) out highp vec4 pc_fragColor;",t.glslVersion===Ul?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+f);let b=_+m+o,S=_+f+a,E=ku(s,s.VERTEX_SHADER,b),w=ku(s,s.FRAGMENT_SHADER,S);s.attachShader(v,E),s.attachShader(v,w),t.index0AttributeName!==void 0?s.bindAttribLocation(v,0,t.index0AttributeName):t.morphTargets===!0&&s.bindAttribLocation(v,0,"position"),s.linkProgram(v);function C(R){if(i.debug.checkShaderErrors){let O=s.getProgramInfoLog(v)||"",G=s.getShaderInfoLog(E)||"",X=s.getShaderInfoLog(w)||"",U=O.trim(),F=G.trim(),V=X.trim(),j=!0,$=!0;if(s.getProgramParameter(v,s.LINK_STATUS)===!1)if(j=!1,typeof i.debug.onShaderError=="function")i.debug.onShaderError(s,v,E,w);else{let ae=Vu(s,E,"vertex"),ye=Vu(s,w,"fragment");Ee("THREE.WebGLProgram: Shader Error "+s.getError()+" - VALIDATE_STATUS "+s.getProgramParameter(v,s.VALIDATE_STATUS)+`

Material Name: `+R.name+`
Material Type: `+R.type+`

Program Info Log: `+U+`
`+ae+`
`+ye)}else U!==""?ve("WebGLProgram: Program Info Log:",U):(F===""||V==="")&&($=!1);$&&(R.diagnostics={runnable:j,programLog:U,vertexShader:{log:F,prefix:m},fragmentShader:{log:V,prefix:f}})}s.deleteShader(E),s.deleteShader(w),y=new $s(s,v),A=Y2(s,v)}let y;this.getUniforms=function(){return y===void 0&&C(this),y};let A;this.getAttributes=function(){return A===void 0&&C(this),A};let I=t.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return I===!1&&(I=s.getProgramParameter(v,O2)),I},this.destroy=function(){n.releaseStatesOfProgram(this),s.deleteProgram(v),this.program=void 0},this.type=t.shaderType,this.name=t.shaderName,this.id=B2++,this.cacheKey=e,this.usedTimes=1,this.program=v,this.vertexShader=E,this.fragmentShader=w,this}var l3=0,Jl=class{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(e){let t=e.vertexShader,n=e.fragmentShader,s=this._getShaderStage(t),r=this._getShaderStage(n),o=this._getShaderCacheForMaterial(e);return o.has(s)===!1&&(o.add(s),s.usedTimes++),o.has(r)===!1&&(o.add(r),r.usedTimes++),this}remove(e){let t=this.materialCache.get(e);for(let n of t)n.usedTimes--,n.usedTimes===0&&this.shaderCache.delete(n.code);return this.materialCache.delete(e),this}getVertexShaderID(e){return this._getShaderStage(e.vertexShader).id}getFragmentShaderID(e){return this._getShaderStage(e.fragmentShader).id}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(e){let t=this.materialCache,n=t.get(e);return n===void 0&&(n=new Set,t.set(e,n)),n}_getShaderStage(e){let t=this.shaderCache,n=t.get(e);return n===void 0&&(n=new Ql(e),t.set(e,n)),n}},Ql=class{constructor(e){this.id=l3++,this.code=e,this.usedTimes=0}};function h3(i){return i===Di||i===Yr||i===Zr}function u3(i,e,t,n,s,r){let o=new xr,a=new Jl,c=new Set,l=[],u=new Map,d=n.logarithmicDepthBuffer,h=n.precision,p={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distance",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function g(y){return c.add(y),y===0?"uv":`uv${y}`}function v(y,A,I,R,O,G){let X=R.fog,U=O.geometry,F=y.isMeshStandardMaterial||y.isMeshLambertMaterial||y.isMeshPhongMaterial?R.environment:null,V=y.isMeshStandardMaterial||y.isMeshLambertMaterial&&!y.envMap||y.isMeshPhongMaterial&&!y.envMap,j=e.get(y.envMap||F,V),$=j&&j.mapping===Hr?j.image.height:null,ae=p[y.type];y.precision!==null&&(h=n.getMaxPrecision(y.precision),h!==y.precision&&ve("WebGLProgram.getParameters:",y.precision,"not supported, using",h,"instead."));let ye=U.morphAttributes.position||U.morphAttributes.normal||U.morphAttributes.color,we=ye!==void 0?ye.length:0,qe=0;U.morphAttributes.position!==void 0&&(qe=1),U.morphAttributes.normal!==void 0&&(qe=2),U.morphAttributes.color!==void 0&&(qe=3);let Qe,Fe,K,de;if(ae){let De=Wn[ae];Qe=De.vertexShader,Fe=De.fragmentShader}else Qe=y.vertexShader,Fe=y.fragmentShader,a.update(y),K=a.getVertexShaderID(y),de=a.getFragmentShaderID(y);let ie=i.getRenderTarget(),Re=i.state.buffers.depth.getReversed(),Le=O.isInstancedMesh===!0,Ce=O.isBatchedMesh===!0,ft=!!y.map,We=!!y.matcap,et=!!j,ut=!!y.aoMap,Ge=!!y.lightMap,Ct=!!y.bumpMap,pt=!!y.normalMap,nn=!!y.displacementMap,D=!!y.emissiveMap,It=!!y.metalnessMap,Xe=!!y.roughnessMap,at=y.anisotropy>0,ce=y.clearcoat>0,_t=y.dispersion>0,T=y.iridescence>0,x=y.sheen>0,B=y.transmission>0,Y=at&&!!y.anisotropyMap,Q=ce&&!!y.clearcoatMap,ee=ce&&!!y.clearcoatNormalMap,oe=ce&&!!y.clearcoatRoughnessMap,W=T&&!!y.iridescenceMap,Z=T&&!!y.iridescenceThicknessMap,fe=x&&!!y.sheenColorMap,_e=x&&!!y.sheenRoughnessMap,se=!!y.specularMap,te=!!y.specularColorMap,Pe=!!y.specularIntensityMap,Oe=B&&!!y.transmissionMap,Ze=B&&!!y.thicknessMap,P=!!y.gradientMap,ne=!!y.alphaMap,q=y.alphaTest>0,pe=!!y.alphaHash,re=!!y.extensions,J=Rn;y.toneMapped&&(ie===null||ie.isXRRenderTarget===!0)&&(J=i.toneMapping);let Se={shaderID:ae,shaderType:y.type,shaderName:y.name,vertexShader:Qe,fragmentShader:Fe,defines:y.defines,customVertexShaderID:K,customFragmentShaderID:de,isRawShaderMaterial:y.isRawShaderMaterial===!0,glslVersion:y.glslVersion,precision:h,batching:Ce,batchingColor:Ce&&O._colorsTexture!==null,instancing:Le,instancingColor:Le&&O.instanceColor!==null,instancingMorph:Le&&O.morphTexture!==null,outputColorSpace:ie===null?i.outputColorSpace:ie.isXRRenderTarget===!0?ie.texture.colorSpace:ze.workingColorSpace,alphaToCoverage:!!y.alphaToCoverage,map:ft,matcap:We,envMap:et,envMapMode:et&&j.mapping,envMapCubeUVHeight:$,aoMap:ut,lightMap:Ge,bumpMap:Ct,normalMap:pt,displacementMap:nn,emissiveMap:D,normalMapObjectSpace:pt&&y.normalMapType===fu,normalMapTangentSpace:pt&&y.normalMapType===ai,packedNormalMap:pt&&y.normalMapType===ai&&h3(y.normalMap.format),metalnessMap:It,roughnessMap:Xe,anisotropy:at,anisotropyMap:Y,clearcoat:ce,clearcoatMap:Q,clearcoatNormalMap:ee,clearcoatRoughnessMap:oe,dispersion:_t,iridescence:T,iridescenceMap:W,iridescenceThicknessMap:Z,sheen:x,sheenColorMap:fe,sheenRoughnessMap:_e,specularMap:se,specularColorMap:te,specularIntensityMap:Pe,transmission:B,transmissionMap:Oe,thicknessMap:Ze,gradientMap:P,opaque:y.transparent===!1&&y.blending===Gi&&y.alphaToCoverage===!1,alphaMap:ne,alphaTest:q,alphaHash:pe,combine:y.combine,mapUv:ft&&g(y.map.channel),aoMapUv:ut&&g(y.aoMap.channel),lightMapUv:Ge&&g(y.lightMap.channel),bumpMapUv:Ct&&g(y.bumpMap.channel),normalMapUv:pt&&g(y.normalMap.channel),displacementMapUv:nn&&g(y.displacementMap.channel),emissiveMapUv:D&&g(y.emissiveMap.channel),metalnessMapUv:It&&g(y.metalnessMap.channel),roughnessMapUv:Xe&&g(y.roughnessMap.channel),anisotropyMapUv:Y&&g(y.anisotropyMap.channel),clearcoatMapUv:Q&&g(y.clearcoatMap.channel),clearcoatNormalMapUv:ee&&g(y.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:oe&&g(y.clearcoatRoughnessMap.channel),iridescenceMapUv:W&&g(y.iridescenceMap.channel),iridescenceThicknessMapUv:Z&&g(y.iridescenceThicknessMap.channel),sheenColorMapUv:fe&&g(y.sheenColorMap.channel),sheenRoughnessMapUv:_e&&g(y.sheenRoughnessMap.channel),specularMapUv:se&&g(y.specularMap.channel),specularColorMapUv:te&&g(y.specularColorMap.channel),specularIntensityMapUv:Pe&&g(y.specularIntensityMap.channel),transmissionMapUv:Oe&&g(y.transmissionMap.channel),thicknessMapUv:Ze&&g(y.thicknessMap.channel),alphaMapUv:ne&&g(y.alphaMap.channel),vertexTangents:!!U.attributes.tangent&&(pt||at),vertexNormals:!!U.attributes.normal,vertexColors:y.vertexColors,vertexAlphas:y.vertexColors===!0&&!!U.attributes.color&&U.attributes.color.itemSize===4,pointsUvs:O.isPoints===!0&&!!U.attributes.uv&&(ft||ne),fog:!!X,useFog:y.fog===!0,fogExp2:!!X&&X.isFogExp2,flatShading:y.wireframe===!1&&(y.flatShading===!0||U.attributes.normal===void 0&&pt===!1&&(y.isMeshLambertMaterial||y.isMeshPhongMaterial||y.isMeshStandardMaterial||y.isMeshPhysicalMaterial)),sizeAttenuation:y.sizeAttenuation===!0,logarithmicDepthBuffer:d,reversedDepthBuffer:Re,skinning:O.isSkinnedMesh===!0,morphTargets:U.morphAttributes.position!==void 0,morphNormals:U.morphAttributes.normal!==void 0,morphColors:U.morphAttributes.color!==void 0,morphTargetsCount:we,morphTextureStride:qe,numDirLights:A.directional.length,numPointLights:A.point.length,numSpotLights:A.spot.length,numSpotLightMaps:A.spotLightMap.length,numRectAreaLights:A.rectArea.length,numHemiLights:A.hemi.length,numDirLightShadows:A.directionalShadowMap.length,numPointLightShadows:A.pointShadowMap.length,numSpotLightShadows:A.spotShadowMap.length,numSpotLightShadowsWithMaps:A.numSpotLightShadowsWithMaps,numLightProbes:A.numLightProbes,numLightProbeGrids:G.length,numClippingPlanes:r.numPlanes,numClipIntersection:r.numIntersection,dithering:y.dithering,shadowMapEnabled:i.shadowMap.enabled&&I.length>0,shadowMapType:i.shadowMap.type,toneMapping:J,decodeVideoTexture:ft&&y.map.isVideoTexture===!0&&ze.getTransfer(y.map.colorSpace)===Ke,decodeVideoTextureEmissive:D&&y.emissiveMap.isVideoTexture===!0&&ze.getTransfer(y.emissiveMap.colorSpace)===Ke,premultipliedAlpha:y.premultipliedAlpha,doubleSided:y.side===en,flipSided:y.side===kt,useDepthPacking:y.depthPacking>=0,depthPacking:y.depthPacking||0,index0AttributeName:y.index0AttributeName,extensionClipCullDistance:re&&y.extensions.clipCullDistance===!0&&t.has("WEBGL_clip_cull_distance"),extensionMultiDraw:(re&&y.extensions.multiDraw===!0||Ce)&&t.has("WEBGL_multi_draw"),rendererExtensionParallelShaderCompile:t.has("KHR_parallel_shader_compile"),customProgramCacheKey:y.customProgramCacheKey()};return Se.vertexUv1s=c.has(1),Se.vertexUv2s=c.has(2),Se.vertexUv3s=c.has(3),c.clear(),Se}function m(y){let A=[];if(y.shaderID?A.push(y.shaderID):(A.push(y.customVertexShaderID),A.push(y.customFragmentShaderID)),y.defines!==void 0)for(let I in y.defines)A.push(I),A.push(y.defines[I]);return y.isRawShaderMaterial===!1&&(f(A,y),_(A,y),A.push(i.outputColorSpace)),A.push(y.customProgramCacheKey),A.join()}function f(y,A){y.push(A.precision),y.push(A.outputColorSpace),y.push(A.envMapMode),y.push(A.envMapCubeUVHeight),y.push(A.mapUv),y.push(A.alphaMapUv),y.push(A.lightMapUv),y.push(A.aoMapUv),y.push(A.bumpMapUv),y.push(A.normalMapUv),y.push(A.displacementMapUv),y.push(A.emissiveMapUv),y.push(A.metalnessMapUv),y.push(A.roughnessMapUv),y.push(A.anisotropyMapUv),y.push(A.clearcoatMapUv),y.push(A.clearcoatNormalMapUv),y.push(A.clearcoatRoughnessMapUv),y.push(A.iridescenceMapUv),y.push(A.iridescenceThicknessMapUv),y.push(A.sheenColorMapUv),y.push(A.sheenRoughnessMapUv),y.push(A.specularMapUv),y.push(A.specularColorMapUv),y.push(A.specularIntensityMapUv),y.push(A.transmissionMapUv),y.push(A.thicknessMapUv),y.push(A.combine),y.push(A.fogExp2),y.push(A.sizeAttenuation),y.push(A.morphTargetsCount),y.push(A.morphAttributeCount),y.push(A.numDirLights),y.push(A.numPointLights),y.push(A.numSpotLights),y.push(A.numSpotLightMaps),y.push(A.numHemiLights),y.push(A.numRectAreaLights),y.push(A.numDirLightShadows),y.push(A.numPointLightShadows),y.push(A.numSpotLightShadows),y.push(A.numSpotLightShadowsWithMaps),y.push(A.numLightProbes),y.push(A.shadowMapType),y.push(A.toneMapping),y.push(A.numClippingPlanes),y.push(A.numClipIntersection),y.push(A.depthPacking)}function _(y,A){o.disableAll(),A.instancing&&o.enable(0),A.instancingColor&&o.enable(1),A.instancingMorph&&o.enable(2),A.matcap&&o.enable(3),A.envMap&&o.enable(4),A.normalMapObjectSpace&&o.enable(5),A.normalMapTangentSpace&&o.enable(6),A.clearcoat&&o.enable(7),A.iridescence&&o.enable(8),A.alphaTest&&o.enable(9),A.vertexColors&&o.enable(10),A.vertexAlphas&&o.enable(11),A.vertexUv1s&&o.enable(12),A.vertexUv2s&&o.enable(13),A.vertexUv3s&&o.enable(14),A.vertexTangents&&o.enable(15),A.anisotropy&&o.enable(16),A.alphaHash&&o.enable(17),A.batching&&o.enable(18),A.dispersion&&o.enable(19),A.batchingColor&&o.enable(20),A.gradientMap&&o.enable(21),A.packedNormalMap&&o.enable(22),A.vertexNormals&&o.enable(23),y.push(o.mask),o.disableAll(),A.fog&&o.enable(0),A.useFog&&o.enable(1),A.flatShading&&o.enable(2),A.logarithmicDepthBuffer&&o.enable(3),A.reversedDepthBuffer&&o.enable(4),A.skinning&&o.enable(5),A.morphTargets&&o.enable(6),A.morphNormals&&o.enable(7),A.morphColors&&o.enable(8),A.premultipliedAlpha&&o.enable(9),A.shadowMapEnabled&&o.enable(10),A.doubleSided&&o.enable(11),A.flipSided&&o.enable(12),A.useDepthPacking&&o.enable(13),A.dithering&&o.enable(14),A.transmission&&o.enable(15),A.sheen&&o.enable(16),A.opaque&&o.enable(17),A.pointsUvs&&o.enable(18),A.decodeVideoTexture&&o.enable(19),A.decodeVideoTextureEmissive&&o.enable(20),A.alphaToCoverage&&o.enable(21),A.numLightProbeGrids>0&&o.enable(22),y.push(o.mask)}function b(y){let A=p[y.type],I;if(A){let R=Wn[A];I=wu.clone(R.uniforms)}else I=y.uniforms;return I}function S(y,A){let I=u.get(A);return I!==void 0?++I.usedTimes:(I=new c3(i,A,y,s),l.push(I),u.set(A,I)),I}function E(y){if(--y.usedTimes===0){let A=l.indexOf(y);l[A]=l[l.length-1],l.pop(),u.delete(y.cacheKey),y.destroy()}}function w(y){a.remove(y)}function C(){a.dispose()}return{getParameters:v,getProgramCacheKey:m,getUniforms:b,acquireProgram:S,releaseProgram:E,releaseShaderCache:w,programs:l,dispose:C}}function d3(){let i=new WeakMap;function e(o){return i.has(o)}function t(o){let a=i.get(o);return a===void 0&&(a={},i.set(o,a)),a}function n(o){i.delete(o)}function s(o,a,c){i.get(o)[a]=c}function r(){i=new WeakMap}return{has:e,get:t,remove:n,update:s,dispose:r}}function f3(i,e){return i.groupOrder!==e.groupOrder?i.groupOrder-e.groupOrder:i.renderOrder!==e.renderOrder?i.renderOrder-e.renderOrder:i.material.id!==e.material.id?i.material.id-e.material.id:i.materialVariant!==e.materialVariant?i.materialVariant-e.materialVariant:i.z!==e.z?i.z-e.z:i.id-e.id}function qu(i,e){return i.groupOrder!==e.groupOrder?i.groupOrder-e.groupOrder:i.renderOrder!==e.renderOrder?i.renderOrder-e.renderOrder:i.z!==e.z?e.z-i.z:i.id-e.id}function Yu(){let i=[],e=0,t=[],n=[],s=[];function r(){e=0,t.length=0,n.length=0,s.length=0}function o(h){let p=0;return h.isInstancedMesh&&(p+=2),h.isSkinnedMesh&&(p+=1),p}function a(h,p,g,v,m,f){let _=i[e];return _===void 0?(_={id:h.id,object:h,geometry:p,material:g,materialVariant:o(h),groupOrder:v,renderOrder:h.renderOrder,z:m,group:f},i[e]=_):(_.id=h.id,_.object=h,_.geometry=p,_.material=g,_.materialVariant=o(h),_.groupOrder=v,_.renderOrder=h.renderOrder,_.z=m,_.group=f),e++,_}function c(h,p,g,v,m,f){let _=a(h,p,g,v,m,f);g.transmission>0?n.push(_):g.transparent===!0?s.push(_):t.push(_)}function l(h,p,g,v,m,f){let _=a(h,p,g,v,m,f);g.transmission>0?n.unshift(_):g.transparent===!0?s.unshift(_):t.unshift(_)}function u(h,p){t.length>1&&t.sort(h||f3),n.length>1&&n.sort(p||qu),s.length>1&&s.sort(p||qu)}function d(){for(let h=e,p=i.length;h<p;h++){let g=i[h];if(g.id===null)break;g.id=null,g.object=null,g.geometry=null,g.material=null,g.group=null}}return{opaque:t,transmissive:n,transparent:s,init:r,push:c,unshift:l,finish:d,sort:u}}function p3(){let i=new WeakMap;function e(n,s){let r=i.get(n),o;return r===void 0?(o=new Yu,i.set(n,[o])):s>=r.length?(o=new Yu,r.push(o)):o=r[s],o}function t(){i=new WeakMap}return{get:e,dispose:t}}function m3(){let i={};return{get:function(e){if(i[e.id]!==void 0)return i[e.id];let t;switch(e.type){case"DirectionalLight":t={direction:new L,color:new ge};break;case"SpotLight":t={position:new L,direction:new L,color:new ge,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":t={position:new L,color:new ge,distance:0,decay:0};break;case"HemisphereLight":t={direction:new L,skyColor:new ge,groundColor:new ge};break;case"RectAreaLight":t={color:new ge,position:new L,halfWidth:new L,halfHeight:new L};break}return i[e.id]=t,t}}}function g3(){let i={};return{get:function(e){if(i[e.id]!==void 0)return i[e.id];let t;switch(e.type){case"DirectionalLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new be};break;case"SpotLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new be};break;case"PointLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new be,shadowCameraNear:1,shadowCameraFar:1e3};break}return i[e.id]=t,t}}}var _3=0;function x3(i,e){return(e.castShadow?2:0)-(i.castShadow?2:0)+(e.map?1:0)-(i.map?1:0)}function y3(i){let e=new m3,t=g3(),n={version:0,hash:{directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let l=0;l<9;l++)n.probe.push(new L);let s=new L,r=new Ue,o=new Ue;function a(l){let u=0,d=0,h=0;for(let A=0;A<9;A++)n.probe[A].set(0,0,0);let p=0,g=0,v=0,m=0,f=0,_=0,b=0,S=0,E=0,w=0,C=0;l.sort(x3);for(let A=0,I=l.length;A<I;A++){let R=l[A],O=R.color,G=R.intensity,X=R.distance,U=null;if(R.shadow&&R.shadow.map&&(R.shadow.map.texture.format===Di?U=R.shadow.map.texture:U=R.shadow.map.depthTexture||R.shadow.map.texture),R.isAmbientLight)u+=O.r*G,d+=O.g*G,h+=O.b*G;else if(R.isLightProbe){for(let F=0;F<9;F++)n.probe[F].addScaledVector(R.sh.coefficients[F],G);C++}else if(R.isDirectionalLight){let F=e.get(R);if(F.color.copy(R.color).multiplyScalar(R.intensity),R.castShadow){let V=R.shadow,j=t.get(R);j.shadowIntensity=V.intensity,j.shadowBias=V.bias,j.shadowNormalBias=V.normalBias,j.shadowRadius=V.radius,j.shadowMapSize=V.mapSize,n.directionalShadow[p]=j,n.directionalShadowMap[p]=U,n.directionalShadowMatrix[p]=R.shadow.matrix,_++}n.directional[p]=F,p++}else if(R.isSpotLight){let F=e.get(R);F.position.setFromMatrixPosition(R.matrixWorld),F.color.copy(O).multiplyScalar(G),F.distance=X,F.coneCos=Math.cos(R.angle),F.penumbraCos=Math.cos(R.angle*(1-R.penumbra)),F.decay=R.decay,n.spot[v]=F;let V=R.shadow;if(R.map&&(n.spotLightMap[E]=R.map,E++,V.updateMatrices(R),R.castShadow&&w++),n.spotLightMatrix[v]=V.matrix,R.castShadow){let j=t.get(R);j.shadowIntensity=V.intensity,j.shadowBias=V.bias,j.shadowNormalBias=V.normalBias,j.shadowRadius=V.radius,j.shadowMapSize=V.mapSize,n.spotShadow[v]=j,n.spotShadowMap[v]=U,S++}v++}else if(R.isRectAreaLight){let F=e.get(R);F.color.copy(O).multiplyScalar(G),F.halfWidth.set(R.width*.5,0,0),F.halfHeight.set(0,R.height*.5,0),n.rectArea[m]=F,m++}else if(R.isPointLight){let F=e.get(R);if(F.color.copy(R.color).multiplyScalar(R.intensity),F.distance=R.distance,F.decay=R.decay,R.castShadow){let V=R.shadow,j=t.get(R);j.shadowIntensity=V.intensity,j.shadowBias=V.bias,j.shadowNormalBias=V.normalBias,j.shadowRadius=V.radius,j.shadowMapSize=V.mapSize,j.shadowCameraNear=V.camera.near,j.shadowCameraFar=V.camera.far,n.pointShadow[g]=j,n.pointShadowMap[g]=U,n.pointShadowMatrix[g]=R.shadow.matrix,b++}n.point[g]=F,g++}else if(R.isHemisphereLight){let F=e.get(R);F.skyColor.copy(R.color).multiplyScalar(G),F.groundColor.copy(R.groundColor).multiplyScalar(G),n.hemi[f]=F,f++}}m>0&&(i.has("OES_texture_float_linear")===!0?(n.rectAreaLTC1=le.LTC_FLOAT_1,n.rectAreaLTC2=le.LTC_FLOAT_2):(n.rectAreaLTC1=le.LTC_HALF_1,n.rectAreaLTC2=le.LTC_HALF_2)),n.ambient[0]=u,n.ambient[1]=d,n.ambient[2]=h;let y=n.hash;(y.directionalLength!==p||y.pointLength!==g||y.spotLength!==v||y.rectAreaLength!==m||y.hemiLength!==f||y.numDirectionalShadows!==_||y.numPointShadows!==b||y.numSpotShadows!==S||y.numSpotMaps!==E||y.numLightProbes!==C)&&(n.directional.length=p,n.spot.length=v,n.rectArea.length=m,n.point.length=g,n.hemi.length=f,n.directionalShadow.length=_,n.directionalShadowMap.length=_,n.pointShadow.length=b,n.pointShadowMap.length=b,n.spotShadow.length=S,n.spotShadowMap.length=S,n.directionalShadowMatrix.length=_,n.pointShadowMatrix.length=b,n.spotLightMatrix.length=S+E-w,n.spotLightMap.length=E,n.numSpotLightShadowsWithMaps=w,n.numLightProbes=C,y.directionalLength=p,y.pointLength=g,y.spotLength=v,y.rectAreaLength=m,y.hemiLength=f,y.numDirectionalShadows=_,y.numPointShadows=b,y.numSpotShadows=S,y.numSpotMaps=E,y.numLightProbes=C,n.version=_3++)}function c(l,u){let d=0,h=0,p=0,g=0,v=0,m=u.matrixWorldInverse;for(let f=0,_=l.length;f<_;f++){let b=l[f];if(b.isDirectionalLight){let S=n.directional[d];S.direction.setFromMatrixPosition(b.matrixWorld),s.setFromMatrixPosition(b.target.matrixWorld),S.direction.sub(s),S.direction.transformDirection(m),d++}else if(b.isSpotLight){let S=n.spot[p];S.position.setFromMatrixPosition(b.matrixWorld),S.position.applyMatrix4(m),S.direction.setFromMatrixPosition(b.matrixWorld),s.setFromMatrixPosition(b.target.matrixWorld),S.direction.sub(s),S.direction.transformDirection(m),p++}else if(b.isRectAreaLight){let S=n.rectArea[g];S.position.setFromMatrixPosition(b.matrixWorld),S.position.applyMatrix4(m),o.identity(),r.copy(b.matrixWorld),r.premultiply(m),o.extractRotation(r),S.halfWidth.set(b.width*.5,0,0),S.halfHeight.set(0,b.height*.5,0),S.halfWidth.applyMatrix4(o),S.halfHeight.applyMatrix4(o),g++}else if(b.isPointLight){let S=n.point[h];S.position.setFromMatrixPosition(b.matrixWorld),S.position.applyMatrix4(m),h++}else if(b.isHemisphereLight){let S=n.hemi[v];S.direction.setFromMatrixPosition(b.matrixWorld),S.direction.transformDirection(m),v++}}}return{setup:a,setupView:c,state:n}}function Zu(i){let e=new y3(i),t=[],n=[],s=[];function r(h){d.camera=h,t.length=0,n.length=0,s.length=0}function o(h){t.push(h)}function a(h){n.push(h)}function c(h){s.push(h)}function l(){e.setup(t)}function u(h){e.setupView(t,h)}let d={lightsArray:t,shadowsArray:n,lightProbeGridArray:s,camera:null,lights:e,transmissionRenderTarget:{},textureUnits:0};return{init:r,state:d,setupLights:l,setupLightsView:u,pushLight:o,pushShadow:a,pushLightProbeGrid:c}}function v3(i){let e=new WeakMap;function t(s,r=0){let o=e.get(s),a;return o===void 0?(a=new Zu(i),e.set(s,[a])):r>=o.length?(a=new Zu(i),o.push(a)):a=o[r],a}function n(){e=new WeakMap}return{get:t,dispose:n}}var M3=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,b3=`uniform sampler2D shadow_pass;
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
}`,S3=[new L(1,0,0),new L(-1,0,0),new L(0,1,0),new L(0,-1,0),new L(0,0,1),new L(0,0,-1)],T3=[new L(0,-1,0),new L(0,-1,0),new L(0,0,1),new L(0,0,-1),new L(0,-1,0),new L(0,-1,0)],Ku=new Ue,Jr=new L,ql=new L;function w3(i,e,t){let n=new zs,s=new be,r=new be,o=new $e,a=new Qi,c=new Cr,l={},u=t.maxTextureSize,d={[an]:kt,[kt]:an,[en]:en},h=new Jt({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new be},radius:{value:4}},vertexShader:M3,fragmentShader:b3}),p=h.clone();p.defines.HORIZONTAL_PASS=1;let g=new Rt;g.setAttribute("position",new mt(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));let v=new Je(g,h),m=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=ss;let f=this.type;this.render=function(w,C,y){if(m.enabled===!1||m.autoUpdate===!1&&m.needsUpdate===!1||w.length===0)return;this.type===Gh&&(ve("WebGLShadowMap: PCFSoftShadowMap has been deprecated. Using PCFShadowMap instead."),this.type=ss);let A=i.getRenderTarget(),I=i.getActiveCubeFace(),R=i.getActiveMipmapLevel(),O=i.state;O.setBlending(Vn),O.buffers.depth.getReversed()===!0?O.buffers.color.setClear(0,0,0,0):O.buffers.color.setClear(1,1,1,1),O.buffers.depth.setTest(!0),O.setScissorTest(!1);let G=f!==this.type;G&&C.traverse(function(X){X.material&&(Array.isArray(X.material)?X.material.forEach(U=>U.needsUpdate=!0):X.material.needsUpdate=!0)});for(let X=0,U=w.length;X<U;X++){let F=w[X],V=F.shadow;if(V===void 0){ve("WebGLShadowMap:",F,"has no shadow.");continue}if(V.autoUpdate===!1&&V.needsUpdate===!1)continue;s.copy(V.mapSize);let j=V.getFrameExtents();s.multiply(j),r.copy(V.mapSize),(s.x>u||s.y>u)&&(s.x>u&&(r.x=Math.floor(u/j.x),s.x=r.x*j.x,V.mapSize.x=r.x),s.y>u&&(r.y=Math.floor(u/j.y),s.y=r.y*j.y,V.mapSize.y=r.y));let $=i.state.buffers.depth.getReversed();if(V.camera._reversedDepth=$,V.map===null||G===!0){if(V.map!==null&&(V.map.depthTexture!==null&&(V.map.depthTexture.dispose(),V.map.depthTexture=null),V.map.dispose()),this.type===Ws){if(F.isPointLight){ve("WebGLShadowMap: VSM shadow maps are not supported for PointLights. Use PCF or BasicShadowMap instead.");continue}V.map=new cn(s.x,s.y,{format:Di,type:Hn,minFilter:gt,magFilter:gt,generateMipmaps:!1}),V.map.texture.name=F.name+".shadowMap",V.map.depthTexture=new ii(s.x,s.y,un),V.map.depthTexture.name=F.name+".shadowMapDepth",V.map.depthTexture.format=Fn,V.map.depthTexture.compareFunction=null,V.map.depthTexture.minFilter=St,V.map.depthTexture.magFilter=St}else F.isPointLight?(V.map=new ac(s.x),V.map.depthTexture=new ta(s.x,Cn)):(V.map=new cn(s.x,s.y),V.map.depthTexture=new ii(s.x,s.y,Cn)),V.map.depthTexture.name=F.name+".shadowMap",V.map.depthTexture.format=Fn,this.type===ss?(V.map.depthTexture.compareFunction=$?sc:ic,V.map.depthTexture.minFilter=gt,V.map.depthTexture.magFilter=gt):(V.map.depthTexture.compareFunction=null,V.map.depthTexture.minFilter=St,V.map.depthTexture.magFilter=St);V.camera.updateProjectionMatrix()}let ae=V.map.isWebGLCubeRenderTarget?6:1;for(let ye=0;ye<ae;ye++){if(V.map.isWebGLCubeRenderTarget)i.setRenderTarget(V.map,ye),i.clear();else{ye===0&&(i.setRenderTarget(V.map),i.clear());let we=V.getViewport(ye);o.set(r.x*we.x,r.y*we.y,r.x*we.z,r.y*we.w),O.viewport(o)}if(F.isPointLight){let we=V.camera,qe=V.matrix,Qe=F.distance||we.far;Qe!==we.far&&(we.far=Qe,we.updateProjectionMatrix()),Jr.setFromMatrixPosition(F.matrixWorld),we.position.copy(Jr),ql.copy(we.position),ql.add(S3[ye]),we.up.copy(T3[ye]),we.lookAt(ql),we.updateMatrixWorld(),qe.makeTranslation(-Jr.x,-Jr.y,-Jr.z),Ku.multiplyMatrices(we.projectionMatrix,we.matrixWorldInverse),V._frustum.setFromProjectionMatrix(Ku,we.coordinateSystem,we.reversedDepth)}else V.updateMatrices(F);n=V.getFrustum(),S(C,y,V.camera,F,this.type)}V.isPointLightShadow!==!0&&this.type===Ws&&_(V,y),V.needsUpdate=!1}f=this.type,m.needsUpdate=!1,i.setRenderTarget(A,I,R)};function _(w,C){let y=e.update(v);h.defines.VSM_SAMPLES!==w.blurSamples&&(h.defines.VSM_SAMPLES=w.blurSamples,p.defines.VSM_SAMPLES=w.blurSamples,h.needsUpdate=!0,p.needsUpdate=!0),w.mapPass===null&&(w.mapPass=new cn(s.x,s.y,{format:Di,type:Hn})),h.uniforms.shadow_pass.value=w.map.depthTexture,h.uniforms.resolution.value=w.mapSize,h.uniforms.radius.value=w.radius,i.setRenderTarget(w.mapPass),i.clear(),i.renderBufferDirect(C,null,y,h,v,null),p.uniforms.shadow_pass.value=w.mapPass.texture,p.uniforms.resolution.value=w.mapSize,p.uniforms.radius.value=w.radius,i.setRenderTarget(w.map),i.clear(),i.renderBufferDirect(C,null,y,p,v,null)}function b(w,C,y,A){let I=null,R=y.isPointLight===!0?w.customDistanceMaterial:w.customDepthMaterial;if(R!==void 0)I=R;else if(I=y.isPointLight===!0?c:a,i.localClippingEnabled&&C.clipShadows===!0&&Array.isArray(C.clippingPlanes)&&C.clippingPlanes.length!==0||C.displacementMap&&C.displacementScale!==0||C.alphaMap&&C.alphaTest>0||C.map&&C.alphaTest>0||C.alphaToCoverage===!0){let O=I.uuid,G=C.uuid,X=l[O];X===void 0&&(X={},l[O]=X);let U=X[G];U===void 0&&(U=I.clone(),X[G]=U,C.addEventListener("dispose",E)),I=U}if(I.visible=C.visible,I.wireframe=C.wireframe,A===Ws?I.side=C.shadowSide!==null?C.shadowSide:C.side:I.side=C.shadowSide!==null?C.shadowSide:d[C.side],I.alphaMap=C.alphaMap,I.alphaTest=C.alphaToCoverage===!0?.5:C.alphaTest,I.map=C.map,I.clipShadows=C.clipShadows,I.clippingPlanes=C.clippingPlanes,I.clipIntersection=C.clipIntersection,I.displacementMap=C.displacementMap,I.displacementScale=C.displacementScale,I.displacementBias=C.displacementBias,I.wireframeLinewidth=C.wireframeLinewidth,I.linewidth=C.linewidth,y.isPointLight===!0&&I.isMeshDistanceMaterial===!0){let O=i.properties.get(I);O.light=y}return I}function S(w,C,y,A,I){if(w.visible===!1)return;if(w.layers.test(C.layers)&&(w.isMesh||w.isLine||w.isPoints)&&(w.castShadow||w.receiveShadow&&I===Ws)&&(!w.frustumCulled||n.intersectsObject(w))){w.modelViewMatrix.multiplyMatrices(y.matrixWorldInverse,w.matrixWorld);let G=e.update(w),X=w.material;if(Array.isArray(X)){let U=G.groups;for(let F=0,V=U.length;F<V;F++){let j=U[F],$=X[j.materialIndex];if($&&$.visible){let ae=b(w,$,A,I);w.onBeforeShadow(i,w,C,y,G,ae,j),i.renderBufferDirect(y,null,G,ae,w,j),w.onAfterShadow(i,w,C,y,G,ae,j)}}}else if(X.visible){let U=b(w,X,A,I);w.onBeforeShadow(i,w,C,y,G,U,null),i.renderBufferDirect(y,null,G,U,w,null),w.onAfterShadow(i,w,C,y,G,U,null)}}let O=w.children;for(let G=0,X=O.length;G<X;G++)S(O[G],C,y,A,I)}function E(w){w.target.removeEventListener("dispose",E);for(let y in l){let A=l[y],I=w.target.uuid;I in A&&(A[I].dispose(),delete A[I])}}}function A3(i,e){function t(){let P=!1,ne=new $e,q=null,pe=new $e(0,0,0,0);return{setMask:function(re){q!==re&&!P&&(i.colorMask(re,re,re,re),q=re)},setLocked:function(re){P=re},setClear:function(re,J,Se,De,vt){vt===!0&&(re*=De,J*=De,Se*=De),ne.set(re,J,Se,De),pe.equals(ne)===!1&&(i.clearColor(re,J,Se,De),pe.copy(ne))},reset:function(){P=!1,q=null,pe.set(-1,0,0,0)}}}function n(){let P=!1,ne=!1,q=null,pe=null,re=null;return{setReversed:function(J){if(ne!==J){let Se=e.get("EXT_clip_control");J?Se.clipControlEXT(Se.LOWER_LEFT_EXT,Se.ZERO_TO_ONE_EXT):Se.clipControlEXT(Se.LOWER_LEFT_EXT,Se.NEGATIVE_ONE_TO_ONE_EXT),ne=J;let De=re;re=null,this.setClear(De)}},getReversed:function(){return ne},setTest:function(J){J?ie(i.DEPTH_TEST):Re(i.DEPTH_TEST)},setMask:function(J){q!==J&&!P&&(i.depthMask(J),q=J)},setFunc:function(J){if(ne&&(J=Su[J]),pe!==J){switch(J){case zo:i.depthFunc(i.NEVER);break;case Vo:i.depthFunc(i.ALWAYS);break;case Ho:i.depthFunc(i.LESS);break;case Wi:i.depthFunc(i.LEQUAL);break;case Go:i.depthFunc(i.EQUAL);break;case Wo:i.depthFunc(i.GEQUAL);break;case Xo:i.depthFunc(i.GREATER);break;case qo:i.depthFunc(i.NOTEQUAL);break;default:i.depthFunc(i.LEQUAL)}pe=J}},setLocked:function(J){P=J},setClear:function(J){re!==J&&(re=J,ne&&(J=1-J),i.clearDepth(J))},reset:function(){P=!1,q=null,pe=null,re=null,ne=!1}}}function s(){let P=!1,ne=null,q=null,pe=null,re=null,J=null,Se=null,De=null,vt=null;return{setTest:function(tt){P||(tt?ie(i.STENCIL_TEST):Re(i.STENCIL_TEST))},setMask:function(tt){ne!==tt&&!P&&(i.stencilMask(tt),ne=tt)},setFunc:function(tt,Zn,Ln){(q!==tt||pe!==Zn||re!==Ln)&&(i.stencilFunc(tt,Zn,Ln),q=tt,pe=Zn,re=Ln)},setOp:function(tt,Zn,Ln){(J!==tt||Se!==Zn||De!==Ln)&&(i.stencilOp(tt,Zn,Ln),J=tt,Se=Zn,De=Ln)},setLocked:function(tt){P=tt},setClear:function(tt){vt!==tt&&(i.clearStencil(tt),vt=tt)},reset:function(){P=!1,ne=null,q=null,pe=null,re=null,J=null,Se=null,De=null,vt=null}}}let r=new t,o=new n,a=new s,c=new WeakMap,l=new WeakMap,u={},d={},h={},p=new WeakMap,g=[],v=null,m=!1,f=null,_=null,b=null,S=null,E=null,w=null,C=null,y=new ge(0,0,0),A=0,I=!1,R=null,O=null,G=null,X=null,U=null,F=i.getParameter(i.MAX_COMBINED_TEXTURE_IMAGE_UNITS),V=!1,j=0,$=i.getParameter(i.VERSION);$.indexOf("WebGL")!==-1?(j=parseFloat(/^WebGL (\d)/.exec($)[1]),V=j>=1):$.indexOf("OpenGL ES")!==-1&&(j=parseFloat(/^OpenGL ES (\d)/.exec($)[1]),V=j>=2);let ae=null,ye={},we=i.getParameter(i.SCISSOR_BOX),qe=i.getParameter(i.VIEWPORT),Qe=new $e().fromArray(we),Fe=new $e().fromArray(qe);function K(P,ne,q,pe){let re=new Uint8Array(4),J=i.createTexture();i.bindTexture(P,J),i.texParameteri(P,i.TEXTURE_MIN_FILTER,i.NEAREST),i.texParameteri(P,i.TEXTURE_MAG_FILTER,i.NEAREST);for(let Se=0;Se<q;Se++)P===i.TEXTURE_3D||P===i.TEXTURE_2D_ARRAY?i.texImage3D(ne,0,i.RGBA,1,1,pe,0,i.RGBA,i.UNSIGNED_BYTE,re):i.texImage2D(ne+Se,0,i.RGBA,1,1,0,i.RGBA,i.UNSIGNED_BYTE,re);return J}let de={};de[i.TEXTURE_2D]=K(i.TEXTURE_2D,i.TEXTURE_2D,1),de[i.TEXTURE_CUBE_MAP]=K(i.TEXTURE_CUBE_MAP,i.TEXTURE_CUBE_MAP_POSITIVE_X,6),de[i.TEXTURE_2D_ARRAY]=K(i.TEXTURE_2D_ARRAY,i.TEXTURE_2D_ARRAY,1,1),de[i.TEXTURE_3D]=K(i.TEXTURE_3D,i.TEXTURE_3D,1,1),r.setClear(0,0,0,1),o.setClear(1),a.setClear(0),ie(i.DEPTH_TEST),o.setFunc(Wi),Ct(!1),pt(gl),ie(i.CULL_FACE),ut(Vn);function ie(P){u[P]!==!0&&(i.enable(P),u[P]=!0)}function Re(P){u[P]!==!1&&(i.disable(P),u[P]=!1)}function Le(P,ne){return h[P]!==ne?(i.bindFramebuffer(P,ne),h[P]=ne,P===i.DRAW_FRAMEBUFFER&&(h[i.FRAMEBUFFER]=ne),P===i.FRAMEBUFFER&&(h[i.DRAW_FRAMEBUFFER]=ne),!0):!1}function Ce(P,ne){let q=g,pe=!1;if(P){q=p.get(ne),q===void 0&&(q=[],p.set(ne,q));let re=P.textures;if(q.length!==re.length||q[0]!==i.COLOR_ATTACHMENT0){for(let J=0,Se=re.length;J<Se;J++)q[J]=i.COLOR_ATTACHMENT0+J;q.length=re.length,pe=!0}}else q[0]!==i.BACK&&(q[0]=i.BACK,pe=!0);pe&&i.drawBuffers(q)}function ft(P){return v!==P?(i.useProgram(P),v=P,!0):!1}let We={[bi]:i.FUNC_ADD,[Xh]:i.FUNC_SUBTRACT,[qh]:i.FUNC_REVERSE_SUBTRACT};We[Yh]=i.MIN,We[Zh]=i.MAX;let et={[Kh]:i.ZERO,[jh]:i.ONE,[$h]:i.SRC_COLOR,[Bo]:i.SRC_ALPHA,[iu]:i.SRC_ALPHA_SATURATE,[tu]:i.DST_COLOR,[Qh]:i.DST_ALPHA,[Jh]:i.ONE_MINUS_SRC_COLOR,[ko]:i.ONE_MINUS_SRC_ALPHA,[nu]:i.ONE_MINUS_DST_COLOR,[eu]:i.ONE_MINUS_DST_ALPHA,[su]:i.CONSTANT_COLOR,[ru]:i.ONE_MINUS_CONSTANT_COLOR,[ou]:i.CONSTANT_ALPHA,[au]:i.ONE_MINUS_CONSTANT_ALPHA};function ut(P,ne,q,pe,re,J,Se,De,vt,tt){if(P===Vn){m===!0&&(Re(i.BLEND),m=!1);return}if(m===!1&&(ie(i.BLEND),m=!0),P!==Wh){if(P!==f||tt!==I){if((_!==bi||E!==bi)&&(i.blendEquation(i.FUNC_ADD),_=bi,E=bi),tt)switch(P){case Gi:i.blendFuncSeparate(i.ONE,i.ONE_MINUS_SRC_ALPHA,i.ONE,i.ONE_MINUS_SRC_ALPHA);break;case _l:i.blendFunc(i.ONE,i.ONE);break;case xl:i.blendFuncSeparate(i.ZERO,i.ONE_MINUS_SRC_COLOR,i.ZERO,i.ONE);break;case yl:i.blendFuncSeparate(i.DST_COLOR,i.ONE_MINUS_SRC_ALPHA,i.ZERO,i.ONE);break;default:Ee("WebGLState: Invalid blending: ",P);break}else switch(P){case Gi:i.blendFuncSeparate(i.SRC_ALPHA,i.ONE_MINUS_SRC_ALPHA,i.ONE,i.ONE_MINUS_SRC_ALPHA);break;case _l:i.blendFuncSeparate(i.SRC_ALPHA,i.ONE,i.ONE,i.ONE);break;case xl:Ee("WebGLState: SubtractiveBlending requires material.premultipliedAlpha = true");break;case yl:Ee("WebGLState: MultiplyBlending requires material.premultipliedAlpha = true");break;default:Ee("WebGLState: Invalid blending: ",P);break}b=null,S=null,w=null,C=null,y.set(0,0,0),A=0,f=P,I=tt}return}re=re||ne,J=J||q,Se=Se||pe,(ne!==_||re!==E)&&(i.blendEquationSeparate(We[ne],We[re]),_=ne,E=re),(q!==b||pe!==S||J!==w||Se!==C)&&(i.blendFuncSeparate(et[q],et[pe],et[J],et[Se]),b=q,S=pe,w=J,C=Se),(De.equals(y)===!1||vt!==A)&&(i.blendColor(De.r,De.g,De.b,vt),y.copy(De),A=vt),f=P,I=!1}function Ge(P,ne){P.side===en?Re(i.CULL_FACE):ie(i.CULL_FACE);let q=P.side===kt;ne&&(q=!q),Ct(q),P.blending===Gi&&P.transparent===!1?ut(Vn):ut(P.blending,P.blendEquation,P.blendSrc,P.blendDst,P.blendEquationAlpha,P.blendSrcAlpha,P.blendDstAlpha,P.blendColor,P.blendAlpha,P.premultipliedAlpha),o.setFunc(P.depthFunc),o.setTest(P.depthTest),o.setMask(P.depthWrite),r.setMask(P.colorWrite);let pe=P.stencilWrite;a.setTest(pe),pe&&(a.setMask(P.stencilWriteMask),a.setFunc(P.stencilFunc,P.stencilRef,P.stencilFuncMask),a.setOp(P.stencilFail,P.stencilZFail,P.stencilZPass)),D(P.polygonOffset,P.polygonOffsetFactor,P.polygonOffsetUnits),P.alphaToCoverage===!0?ie(i.SAMPLE_ALPHA_TO_COVERAGE):Re(i.SAMPLE_ALPHA_TO_COVERAGE)}function Ct(P){R!==P&&(P?i.frontFace(i.CW):i.frontFace(i.CCW),R=P)}function pt(P){P!==Vh?(ie(i.CULL_FACE),P!==O&&(P===gl?i.cullFace(i.BACK):P===Hh?i.cullFace(i.FRONT):i.cullFace(i.FRONT_AND_BACK))):Re(i.CULL_FACE),O=P}function nn(P){P!==G&&(V&&i.lineWidth(P),G=P)}function D(P,ne,q){P?(ie(i.POLYGON_OFFSET_FILL),(X!==ne||U!==q)&&(X=ne,U=q,o.getReversed()&&(ne=-ne),i.polygonOffset(ne,q))):Re(i.POLYGON_OFFSET_FILL)}function It(P){P?ie(i.SCISSOR_TEST):Re(i.SCISSOR_TEST)}function Xe(P){P===void 0&&(P=i.TEXTURE0+F-1),ae!==P&&(i.activeTexture(P),ae=P)}function at(P,ne,q){q===void 0&&(ae===null?q=i.TEXTURE0+F-1:q=ae);let pe=ye[q];pe===void 0&&(pe={type:void 0,texture:void 0},ye[q]=pe),(pe.type!==P||pe.texture!==ne)&&(ae!==q&&(i.activeTexture(q),ae=q),i.bindTexture(P,ne||de[P]),pe.type=P,pe.texture=ne)}function ce(){let P=ye[ae];P!==void 0&&P.type!==void 0&&(i.bindTexture(P.type,null),P.type=void 0,P.texture=void 0)}function _t(){try{i.compressedTexImage2D(...arguments)}catch(P){Ee("WebGLState:",P)}}function T(){try{i.compressedTexImage3D(...arguments)}catch(P){Ee("WebGLState:",P)}}function x(){try{i.texSubImage2D(...arguments)}catch(P){Ee("WebGLState:",P)}}function B(){try{i.texSubImage3D(...arguments)}catch(P){Ee("WebGLState:",P)}}function Y(){try{i.compressedTexSubImage2D(...arguments)}catch(P){Ee("WebGLState:",P)}}function Q(){try{i.compressedTexSubImage3D(...arguments)}catch(P){Ee("WebGLState:",P)}}function ee(){try{i.texStorage2D(...arguments)}catch(P){Ee("WebGLState:",P)}}function oe(){try{i.texStorage3D(...arguments)}catch(P){Ee("WebGLState:",P)}}function W(){try{i.texImage2D(...arguments)}catch(P){Ee("WebGLState:",P)}}function Z(){try{i.texImage3D(...arguments)}catch(P){Ee("WebGLState:",P)}}function fe(P){return d[P]!==void 0?d[P]:i.getParameter(P)}function _e(P,ne){d[P]!==ne&&(i.pixelStorei(P,ne),d[P]=ne)}function se(P){Qe.equals(P)===!1&&(i.scissor(P.x,P.y,P.z,P.w),Qe.copy(P))}function te(P){Fe.equals(P)===!1&&(i.viewport(P.x,P.y,P.z,P.w),Fe.copy(P))}function Pe(P,ne){let q=l.get(ne);q===void 0&&(q=new WeakMap,l.set(ne,q));let pe=q.get(P);pe===void 0&&(pe=i.getUniformBlockIndex(ne,P.name),q.set(P,pe))}function Oe(P,ne){let pe=l.get(ne).get(P);c.get(ne)!==pe&&(i.uniformBlockBinding(ne,pe,P.__bindingPointIndex),c.set(ne,pe))}function Ze(){i.disable(i.BLEND),i.disable(i.CULL_FACE),i.disable(i.DEPTH_TEST),i.disable(i.POLYGON_OFFSET_FILL),i.disable(i.SCISSOR_TEST),i.disable(i.STENCIL_TEST),i.disable(i.SAMPLE_ALPHA_TO_COVERAGE),i.blendEquation(i.FUNC_ADD),i.blendFunc(i.ONE,i.ZERO),i.blendFuncSeparate(i.ONE,i.ZERO,i.ONE,i.ZERO),i.blendColor(0,0,0,0),i.colorMask(!0,!0,!0,!0),i.clearColor(0,0,0,0),i.depthMask(!0),i.depthFunc(i.LESS),o.setReversed(!1),i.clearDepth(1),i.stencilMask(4294967295),i.stencilFunc(i.ALWAYS,0,4294967295),i.stencilOp(i.KEEP,i.KEEP,i.KEEP),i.clearStencil(0),i.cullFace(i.BACK),i.frontFace(i.CCW),i.polygonOffset(0,0),i.activeTexture(i.TEXTURE0),i.bindFramebuffer(i.FRAMEBUFFER,null),i.bindFramebuffer(i.DRAW_FRAMEBUFFER,null),i.bindFramebuffer(i.READ_FRAMEBUFFER,null),i.useProgram(null),i.lineWidth(1),i.scissor(0,0,i.canvas.width,i.canvas.height),i.viewport(0,0,i.canvas.width,i.canvas.height),i.pixelStorei(i.PACK_ALIGNMENT,4),i.pixelStorei(i.UNPACK_ALIGNMENT,4),i.pixelStorei(i.UNPACK_FLIP_Y_WEBGL,!1),i.pixelStorei(i.UNPACK_PREMULTIPLY_ALPHA_WEBGL,!1),i.pixelStorei(i.UNPACK_COLORSPACE_CONVERSION_WEBGL,i.BROWSER_DEFAULT_WEBGL),i.pixelStorei(i.PACK_ROW_LENGTH,0),i.pixelStorei(i.PACK_SKIP_PIXELS,0),i.pixelStorei(i.PACK_SKIP_ROWS,0),i.pixelStorei(i.UNPACK_ROW_LENGTH,0),i.pixelStorei(i.UNPACK_IMAGE_HEIGHT,0),i.pixelStorei(i.UNPACK_SKIP_PIXELS,0),i.pixelStorei(i.UNPACK_SKIP_ROWS,0),i.pixelStorei(i.UNPACK_SKIP_IMAGES,0),u={},d={},ae=null,ye={},h={},p=new WeakMap,g=[],v=null,m=!1,f=null,_=null,b=null,S=null,E=null,w=null,C=null,y=new ge(0,0,0),A=0,I=!1,R=null,O=null,G=null,X=null,U=null,Qe.set(0,0,i.canvas.width,i.canvas.height),Fe.set(0,0,i.canvas.width,i.canvas.height),r.reset(),o.reset(),a.reset()}return{buffers:{color:r,depth:o,stencil:a},enable:ie,disable:Re,bindFramebuffer:Le,drawBuffers:Ce,useProgram:ft,setBlending:ut,setMaterial:Ge,setFlipSided:Ct,setCullFace:pt,setLineWidth:nn,setPolygonOffset:D,setScissorTest:It,activeTexture:Xe,bindTexture:at,unbindTexture:ce,compressedTexImage2D:_t,compressedTexImage3D:T,texImage2D:W,texImage3D:Z,pixelStorei:_e,getParameter:fe,updateUBOMapping:Pe,uniformBlockBinding:Oe,texStorage2D:ee,texStorage3D:oe,texSubImage2D:x,texSubImage3D:B,compressedTexSubImage2D:Y,compressedTexSubImage3D:Q,scissor:se,viewport:te,reset:Ze}}function E3(i,e,t,n,s,r,o){let a=e.has("WEBGL_multisampled_render_to_texture")?e.get("WEBGL_multisampled_render_to_texture"):null,c=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),l=new be,u=new WeakMap,d=new Set,h,p=new WeakMap,g=!1;try{g=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function v(T,x){return g?new OffscreenCanvas(T,x):Ds("canvas")}function m(T,x,B){let Y=1,Q=_t(T);if((Q.width>B||Q.height>B)&&(Y=B/Math.max(Q.width,Q.height)),Y<1)if(typeof HTMLImageElement<"u"&&T instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&T instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&T instanceof ImageBitmap||typeof VideoFrame<"u"&&T instanceof VideoFrame){let ee=Math.floor(Y*Q.width),oe=Math.floor(Y*Q.height);h===void 0&&(h=v(ee,oe));let W=x?v(ee,oe):h;return W.width=ee,W.height=oe,W.getContext("2d").drawImage(T,0,0,ee,oe),ve("WebGLRenderer: Texture has been resized from ("+Q.width+"x"+Q.height+") to ("+ee+"x"+oe+")."),W}else return"data"in T&&ve("WebGLRenderer: Image in DataTexture is too big ("+Q.width+"x"+Q.height+")."),T;return T}function f(T){return T.generateMipmaps}function _(T){i.generateMipmap(T)}function b(T){return T.isWebGLCubeRenderTarget?i.TEXTURE_CUBE_MAP:T.isWebGL3DRenderTarget?i.TEXTURE_3D:T.isWebGLArrayRenderTarget||T.isCompressedArrayTexture?i.TEXTURE_2D_ARRAY:i.TEXTURE_2D}function S(T,x,B,Y,Q,ee=!1){if(T!==null){if(i[T]!==void 0)return i[T];ve("WebGLRenderer: Attempt to use non-existing WebGL internal format '"+T+"'")}let oe;Y&&(oe=e.get("EXT_texture_norm16"),oe||ve("WebGLRenderer: Unable to use normalized textures without EXT_texture_norm16 extension"));let W=x;if(x===i.RED&&(B===i.FLOAT&&(W=i.R32F),B===i.HALF_FLOAT&&(W=i.R16F),B===i.UNSIGNED_BYTE&&(W=i.R8),B===i.UNSIGNED_SHORT&&oe&&(W=oe.R16_EXT),B===i.SHORT&&oe&&(W=oe.R16_SNORM_EXT)),x===i.RED_INTEGER&&(B===i.UNSIGNED_BYTE&&(W=i.R8UI),B===i.UNSIGNED_SHORT&&(W=i.R16UI),B===i.UNSIGNED_INT&&(W=i.R32UI),B===i.BYTE&&(W=i.R8I),B===i.SHORT&&(W=i.R16I),B===i.INT&&(W=i.R32I)),x===i.RG&&(B===i.FLOAT&&(W=i.RG32F),B===i.HALF_FLOAT&&(W=i.RG16F),B===i.UNSIGNED_BYTE&&(W=i.RG8),B===i.UNSIGNED_SHORT&&oe&&(W=oe.RG16_EXT),B===i.SHORT&&oe&&(W=oe.RG16_SNORM_EXT)),x===i.RG_INTEGER&&(B===i.UNSIGNED_BYTE&&(W=i.RG8UI),B===i.UNSIGNED_SHORT&&(W=i.RG16UI),B===i.UNSIGNED_INT&&(W=i.RG32UI),B===i.BYTE&&(W=i.RG8I),B===i.SHORT&&(W=i.RG16I),B===i.INT&&(W=i.RG32I)),x===i.RGB_INTEGER&&(B===i.UNSIGNED_BYTE&&(W=i.RGB8UI),B===i.UNSIGNED_SHORT&&(W=i.RGB16UI),B===i.UNSIGNED_INT&&(W=i.RGB32UI),B===i.BYTE&&(W=i.RGB8I),B===i.SHORT&&(W=i.RGB16I),B===i.INT&&(W=i.RGB32I)),x===i.RGBA_INTEGER&&(B===i.UNSIGNED_BYTE&&(W=i.RGBA8UI),B===i.UNSIGNED_SHORT&&(W=i.RGBA16UI),B===i.UNSIGNED_INT&&(W=i.RGBA32UI),B===i.BYTE&&(W=i.RGBA8I),B===i.SHORT&&(W=i.RGBA16I),B===i.INT&&(W=i.RGBA32I)),x===i.RGB&&(B===i.UNSIGNED_SHORT&&oe&&(W=oe.RGB16_EXT),B===i.SHORT&&oe&&(W=oe.RGB16_SNORM_EXT),B===i.UNSIGNED_INT_5_9_9_9_REV&&(W=i.RGB9_E5),B===i.UNSIGNED_INT_10F_11F_11F_REV&&(W=i.R11F_G11F_B10F)),x===i.RGBA){let Z=ee?mr:ze.getTransfer(Q);B===i.FLOAT&&(W=i.RGBA32F),B===i.HALF_FLOAT&&(W=i.RGBA16F),B===i.UNSIGNED_BYTE&&(W=Z===Ke?i.SRGB8_ALPHA8:i.RGBA8),B===i.UNSIGNED_SHORT&&oe&&(W=oe.RGBA16_EXT),B===i.SHORT&&oe&&(W=oe.RGBA16_SNORM_EXT),B===i.UNSIGNED_SHORT_4_4_4_4&&(W=i.RGBA4),B===i.UNSIGNED_SHORT_5_5_5_1&&(W=i.RGB5_A1)}return(W===i.R16F||W===i.R32F||W===i.RG16F||W===i.RG32F||W===i.RGBA16F||W===i.RGBA32F)&&e.get("EXT_color_buffer_float"),W}function E(T,x){let B;return T?x===null||x===Cn||x===Ys?B=i.DEPTH24_STENCIL8:x===un?B=i.DEPTH32F_STENCIL8:x===qs&&(B=i.DEPTH24_STENCIL8,ve("DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.")):x===null||x===Cn||x===Ys?B=i.DEPTH_COMPONENT24:x===un?B=i.DEPTH_COMPONENT32F:x===qs&&(B=i.DEPTH_COMPONENT16),B}function w(T,x){return f(T)===!0||T.isFramebufferTexture&&T.minFilter!==St&&T.minFilter!==gt?Math.log2(Math.max(x.width,x.height))+1:T.mipmaps!==void 0&&T.mipmaps.length>0?T.mipmaps.length:T.isCompressedTexture&&Array.isArray(T.image)?x.mipmaps.length:1}function C(T){let x=T.target;x.removeEventListener("dispose",C),A(x),x.isVideoTexture&&u.delete(x),x.isHTMLTexture&&d.delete(x)}function y(T){let x=T.target;x.removeEventListener("dispose",y),R(x)}function A(T){let x=n.get(T);if(x.__webglInit===void 0)return;let B=T.source,Y=p.get(B);if(Y){let Q=Y[x.__cacheKey];Q.usedTimes--,Q.usedTimes===0&&I(T),Object.keys(Y).length===0&&p.delete(B)}n.remove(T)}function I(T){let x=n.get(T);i.deleteTexture(x.__webglTexture);let B=T.source,Y=p.get(B);delete Y[x.__cacheKey],o.memory.textures--}function R(T){let x=n.get(T);if(T.depthTexture&&(T.depthTexture.dispose(),n.remove(T.depthTexture)),T.isWebGLCubeRenderTarget)for(let Y=0;Y<6;Y++){if(Array.isArray(x.__webglFramebuffer[Y]))for(let Q=0;Q<x.__webglFramebuffer[Y].length;Q++)i.deleteFramebuffer(x.__webglFramebuffer[Y][Q]);else i.deleteFramebuffer(x.__webglFramebuffer[Y]);x.__webglDepthbuffer&&i.deleteRenderbuffer(x.__webglDepthbuffer[Y])}else{if(Array.isArray(x.__webglFramebuffer))for(let Y=0;Y<x.__webglFramebuffer.length;Y++)i.deleteFramebuffer(x.__webglFramebuffer[Y]);else i.deleteFramebuffer(x.__webglFramebuffer);if(x.__webglDepthbuffer&&i.deleteRenderbuffer(x.__webglDepthbuffer),x.__webglMultisampledFramebuffer&&i.deleteFramebuffer(x.__webglMultisampledFramebuffer),x.__webglColorRenderbuffer)for(let Y=0;Y<x.__webglColorRenderbuffer.length;Y++)x.__webglColorRenderbuffer[Y]&&i.deleteRenderbuffer(x.__webglColorRenderbuffer[Y]);x.__webglDepthRenderbuffer&&i.deleteRenderbuffer(x.__webglDepthRenderbuffer)}let B=T.textures;for(let Y=0,Q=B.length;Y<Q;Y++){let ee=n.get(B[Y]);ee.__webglTexture&&(i.deleteTexture(ee.__webglTexture),o.memory.textures--),n.remove(B[Y])}n.remove(T)}let O=0;function G(){O=0}function X(){return O}function U(T){O=T}function F(){let T=O;return T>=s.maxTextures&&ve("WebGLTextures: Trying to use "+T+" texture units while this GPU supports only "+s.maxTextures),O+=1,T}function V(T){let x=[];return x.push(T.wrapS),x.push(T.wrapT),x.push(T.wrapR||0),x.push(T.magFilter),x.push(T.minFilter),x.push(T.anisotropy),x.push(T.internalFormat),x.push(T.format),x.push(T.type),x.push(T.generateMipmaps),x.push(T.premultiplyAlpha),x.push(T.flipY),x.push(T.unpackAlignment),x.push(T.colorSpace),x.join()}function j(T,x){let B=n.get(T);if(T.isVideoTexture&&at(T),T.isRenderTargetTexture===!1&&T.isExternalTexture!==!0&&T.version>0&&B.__version!==T.version){let Y=T.image;if(Y===null)ve("WebGLRenderer: Texture marked for update but no image data found.");else if(Y.complete===!1)ve("WebGLRenderer: Texture marked for update but image is incomplete");else{Re(B,T,x);return}}else T.isExternalTexture&&(B.__webglTexture=T.sourceTexture?T.sourceTexture:null);t.bindTexture(i.TEXTURE_2D,B.__webglTexture,i.TEXTURE0+x)}function $(T,x){let B=n.get(T);if(T.isRenderTargetTexture===!1&&T.version>0&&B.__version!==T.version){Re(B,T,x);return}else T.isExternalTexture&&(B.__webglTexture=T.sourceTexture?T.sourceTexture:null);t.bindTexture(i.TEXTURE_2D_ARRAY,B.__webglTexture,i.TEXTURE0+x)}function ae(T,x){let B=n.get(T);if(T.isRenderTargetTexture===!1&&T.version>0&&B.__version!==T.version){Re(B,T,x);return}t.bindTexture(i.TEXTURE_3D,B.__webglTexture,i.TEXTURE0+x)}function ye(T,x){let B=n.get(T);if(T.isCubeDepthTexture!==!0&&T.version>0&&B.__version!==T.version){Le(B,T,x);return}t.bindTexture(i.TEXTURE_CUBE_MAP,B.__webglTexture,i.TEXTURE0+x)}let we={[Si]:i.REPEAT,[gn]:i.CLAMP_TO_EDGE,[Ps]:i.MIRRORED_REPEAT},qe={[St]:i.NEAREST,[va]:i.NEAREST_MIPMAP_NEAREST,[os]:i.NEAREST_MIPMAP_LINEAR,[gt]:i.LINEAR,[Xs]:i.LINEAR_MIPMAP_NEAREST,[hn]:i.LINEAR_MIPMAP_LINEAR},Qe={[pu]:i.NEVER,[yu]:i.ALWAYS,[mu]:i.LESS,[ic]:i.LEQUAL,[gu]:i.EQUAL,[sc]:i.GEQUAL,[_u]:i.GREATER,[xu]:i.NOTEQUAL};function Fe(T,x){if(x.type===un&&e.has("OES_texture_float_linear")===!1&&(x.magFilter===gt||x.magFilter===Xs||x.magFilter===os||x.magFilter===hn||x.minFilter===gt||x.minFilter===Xs||x.minFilter===os||x.minFilter===hn)&&ve("WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device."),i.texParameteri(T,i.TEXTURE_WRAP_S,we[x.wrapS]),i.texParameteri(T,i.TEXTURE_WRAP_T,we[x.wrapT]),(T===i.TEXTURE_3D||T===i.TEXTURE_2D_ARRAY)&&i.texParameteri(T,i.TEXTURE_WRAP_R,we[x.wrapR]),i.texParameteri(T,i.TEXTURE_MAG_FILTER,qe[x.magFilter]),i.texParameteri(T,i.TEXTURE_MIN_FILTER,qe[x.minFilter]),x.compareFunction&&(i.texParameteri(T,i.TEXTURE_COMPARE_MODE,i.COMPARE_REF_TO_TEXTURE),i.texParameteri(T,i.TEXTURE_COMPARE_FUNC,Qe[x.compareFunction])),e.has("EXT_texture_filter_anisotropic")===!0){if(x.magFilter===St||x.minFilter!==os&&x.minFilter!==hn||x.type===un&&e.has("OES_texture_float_linear")===!1)return;if(x.anisotropy>1||n.get(x).__currentAnisotropy){let B=e.get("EXT_texture_filter_anisotropic");i.texParameterf(T,B.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(x.anisotropy,s.getMaxAnisotropy())),n.get(x).__currentAnisotropy=x.anisotropy}}}function K(T,x){let B=!1;T.__webglInit===void 0&&(T.__webglInit=!0,x.addEventListener("dispose",C));let Y=x.source,Q=p.get(Y);Q===void 0&&(Q={},p.set(Y,Q));let ee=V(x);if(ee!==T.__cacheKey){Q[ee]===void 0&&(Q[ee]={texture:i.createTexture(),usedTimes:0},o.memory.textures++,B=!0),Q[ee].usedTimes++;let oe=Q[T.__cacheKey];oe!==void 0&&(Q[T.__cacheKey].usedTimes--,oe.usedTimes===0&&I(x)),T.__cacheKey=ee,T.__webglTexture=Q[ee].texture}return B}function de(T,x,B){return Math.floor(Math.floor(T/B)/x)}function ie(T,x,B,Y){let ee=T.updateRanges;if(ee.length===0)t.texSubImage2D(i.TEXTURE_2D,0,0,0,x.width,x.height,B,Y,x.data);else{ee.sort((_e,se)=>_e.start-se.start);let oe=0;for(let _e=1;_e<ee.length;_e++){let se=ee[oe],te=ee[_e],Pe=se.start+se.count,Oe=de(te.start,x.width,4),Ze=de(se.start,x.width,4);te.start<=Pe+1&&Oe===Ze&&de(te.start+te.count-1,x.width,4)===Oe?se.count=Math.max(se.count,te.start+te.count-se.start):(++oe,ee[oe]=te)}ee.length=oe+1;let W=t.getParameter(i.UNPACK_ROW_LENGTH),Z=t.getParameter(i.UNPACK_SKIP_PIXELS),fe=t.getParameter(i.UNPACK_SKIP_ROWS);t.pixelStorei(i.UNPACK_ROW_LENGTH,x.width);for(let _e=0,se=ee.length;_e<se;_e++){let te=ee[_e],Pe=Math.floor(te.start/4),Oe=Math.ceil(te.count/4),Ze=Pe%x.width,P=Math.floor(Pe/x.width),ne=Oe,q=1;t.pixelStorei(i.UNPACK_SKIP_PIXELS,Ze),t.pixelStorei(i.UNPACK_SKIP_ROWS,P),t.texSubImage2D(i.TEXTURE_2D,0,Ze,P,ne,q,B,Y,x.data)}T.clearUpdateRanges(),t.pixelStorei(i.UNPACK_ROW_LENGTH,W),t.pixelStorei(i.UNPACK_SKIP_PIXELS,Z),t.pixelStorei(i.UNPACK_SKIP_ROWS,fe)}}function Re(T,x,B){let Y=i.TEXTURE_2D;(x.isDataArrayTexture||x.isCompressedArrayTexture)&&(Y=i.TEXTURE_2D_ARRAY),x.isData3DTexture&&(Y=i.TEXTURE_3D);let Q=K(T,x),ee=x.source;t.bindTexture(Y,T.__webglTexture,i.TEXTURE0+B);let oe=n.get(ee);if(ee.version!==oe.__version||Q===!0){if(t.activeTexture(i.TEXTURE0+B),(typeof ImageBitmap<"u"&&x.image instanceof ImageBitmap)===!1){let q=ze.getPrimaries(ze.workingColorSpace),pe=x.colorSpace===ci?null:ze.getPrimaries(x.colorSpace),re=x.colorSpace===ci||q===pe?i.NONE:i.BROWSER_DEFAULT_WEBGL;t.pixelStorei(i.UNPACK_FLIP_Y_WEBGL,x.flipY),t.pixelStorei(i.UNPACK_PREMULTIPLY_ALPHA_WEBGL,x.premultiplyAlpha),t.pixelStorei(i.UNPACK_COLORSPACE_CONVERSION_WEBGL,re)}t.pixelStorei(i.UNPACK_ALIGNMENT,x.unpackAlignment);let Z=m(x.image,!1,s.maxTextureSize);Z=ce(x,Z);let fe=r.convert(x.format,x.colorSpace),_e=r.convert(x.type),se=S(x.internalFormat,fe,_e,x.normalized,x.colorSpace,x.isVideoTexture);Fe(Y,x);let te,Pe=x.mipmaps,Oe=x.isVideoTexture!==!0,Ze=oe.__version===void 0||Q===!0,P=ee.dataReady,ne=w(x,Z);if(x.isDepthTexture)se=E(x.format===Li,x.type),Ze&&(Oe?t.texStorage2D(i.TEXTURE_2D,1,se,Z.width,Z.height):t.texImage2D(i.TEXTURE_2D,0,se,Z.width,Z.height,0,fe,_e,null));else if(x.isDataTexture)if(Pe.length>0){Oe&&Ze&&t.texStorage2D(i.TEXTURE_2D,ne,se,Pe[0].width,Pe[0].height);for(let q=0,pe=Pe.length;q<pe;q++)te=Pe[q],Oe?P&&t.texSubImage2D(i.TEXTURE_2D,q,0,0,te.width,te.height,fe,_e,te.data):t.texImage2D(i.TEXTURE_2D,q,se,te.width,te.height,0,fe,_e,te.data);x.generateMipmaps=!1}else Oe?(Ze&&t.texStorage2D(i.TEXTURE_2D,ne,se,Z.width,Z.height),P&&ie(x,Z,fe,_e)):t.texImage2D(i.TEXTURE_2D,0,se,Z.width,Z.height,0,fe,_e,Z.data);else if(x.isCompressedTexture)if(x.isCompressedArrayTexture){Oe&&Ze&&t.texStorage3D(i.TEXTURE_2D_ARRAY,ne,se,Pe[0].width,Pe[0].height,Z.depth);for(let q=0,pe=Pe.length;q<pe;q++)if(te=Pe[q],x.format!==dn)if(fe!==null)if(Oe){if(P)if(x.layerUpdates.size>0){let re=zl(te.width,te.height,x.format,x.type);for(let J of x.layerUpdates){let Se=te.data.subarray(J*re/te.data.BYTES_PER_ELEMENT,(J+1)*re/te.data.BYTES_PER_ELEMENT);t.compressedTexSubImage3D(i.TEXTURE_2D_ARRAY,q,0,0,J,te.width,te.height,1,fe,Se)}x.clearLayerUpdates()}else t.compressedTexSubImage3D(i.TEXTURE_2D_ARRAY,q,0,0,0,te.width,te.height,Z.depth,fe,te.data)}else t.compressedTexImage3D(i.TEXTURE_2D_ARRAY,q,se,te.width,te.height,Z.depth,0,te.data,0,0);else ve("WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");else Oe?P&&t.texSubImage3D(i.TEXTURE_2D_ARRAY,q,0,0,0,te.width,te.height,Z.depth,fe,_e,te.data):t.texImage3D(i.TEXTURE_2D_ARRAY,q,se,te.width,te.height,Z.depth,0,fe,_e,te.data)}else{Oe&&Ze&&t.texStorage2D(i.TEXTURE_2D,ne,se,Pe[0].width,Pe[0].height);for(let q=0,pe=Pe.length;q<pe;q++)te=Pe[q],x.format!==dn?fe!==null?Oe?P&&t.compressedTexSubImage2D(i.TEXTURE_2D,q,0,0,te.width,te.height,fe,te.data):t.compressedTexImage2D(i.TEXTURE_2D,q,se,te.width,te.height,0,te.data):ve("WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):Oe?P&&t.texSubImage2D(i.TEXTURE_2D,q,0,0,te.width,te.height,fe,_e,te.data):t.texImage2D(i.TEXTURE_2D,q,se,te.width,te.height,0,fe,_e,te.data)}else if(x.isDataArrayTexture)if(Oe){if(Ze&&t.texStorage3D(i.TEXTURE_2D_ARRAY,ne,se,Z.width,Z.height,Z.depth),P)if(x.layerUpdates.size>0){let q=zl(Z.width,Z.height,x.format,x.type);for(let pe of x.layerUpdates){let re=Z.data.subarray(pe*q/Z.data.BYTES_PER_ELEMENT,(pe+1)*q/Z.data.BYTES_PER_ELEMENT);t.texSubImage3D(i.TEXTURE_2D_ARRAY,0,0,0,pe,Z.width,Z.height,1,fe,_e,re)}x.clearLayerUpdates()}else t.texSubImage3D(i.TEXTURE_2D_ARRAY,0,0,0,0,Z.width,Z.height,Z.depth,fe,_e,Z.data)}else t.texImage3D(i.TEXTURE_2D_ARRAY,0,se,Z.width,Z.height,Z.depth,0,fe,_e,Z.data);else if(x.isData3DTexture)Oe?(Ze&&t.texStorage3D(i.TEXTURE_3D,ne,se,Z.width,Z.height,Z.depth),P&&t.texSubImage3D(i.TEXTURE_3D,0,0,0,0,Z.width,Z.height,Z.depth,fe,_e,Z.data)):t.texImage3D(i.TEXTURE_3D,0,se,Z.width,Z.height,Z.depth,0,fe,_e,Z.data);else if(x.isFramebufferTexture){if(Ze)if(Oe)t.texStorage2D(i.TEXTURE_2D,ne,se,Z.width,Z.height);else{let q=Z.width,pe=Z.height;for(let re=0;re<ne;re++)t.texImage2D(i.TEXTURE_2D,re,se,q,pe,0,fe,_e,null),q>>=1,pe>>=1}}else if(x.isHTMLTexture){if("texElementImage2D"in i){let q=i.canvas;if(q.hasAttribute("layoutsubtree")||q.setAttribute("layoutsubtree","true"),Z.parentNode!==q){q.appendChild(Z),d.add(x),q.onpaint=De=>{let vt=De.changedElements;for(let tt of d)vt.includes(tt.image)&&(tt.needsUpdate=!0)},q.requestPaint();return}let pe=0,re=i.RGBA,J=i.RGBA,Se=i.UNSIGNED_BYTE;i.texElementImage2D(i.TEXTURE_2D,pe,re,J,Se,Z),i.texParameteri(i.TEXTURE_2D,i.TEXTURE_MIN_FILTER,i.LINEAR),i.texParameteri(i.TEXTURE_2D,i.TEXTURE_WRAP_S,i.CLAMP_TO_EDGE),i.texParameteri(i.TEXTURE_2D,i.TEXTURE_WRAP_T,i.CLAMP_TO_EDGE)}}else if(Pe.length>0){if(Oe&&Ze){let q=_t(Pe[0]);t.texStorage2D(i.TEXTURE_2D,ne,se,q.width,q.height)}for(let q=0,pe=Pe.length;q<pe;q++)te=Pe[q],Oe?P&&t.texSubImage2D(i.TEXTURE_2D,q,0,0,fe,_e,te):t.texImage2D(i.TEXTURE_2D,q,se,fe,_e,te);x.generateMipmaps=!1}else if(Oe){if(Ze){let q=_t(Z);t.texStorage2D(i.TEXTURE_2D,ne,se,q.width,q.height)}P&&t.texSubImage2D(i.TEXTURE_2D,0,0,0,fe,_e,Z)}else t.texImage2D(i.TEXTURE_2D,0,se,fe,_e,Z);f(x)&&_(Y),oe.__version=ee.version,x.onUpdate&&x.onUpdate(x)}T.__version=x.version}function Le(T,x,B){if(x.image.length!==6)return;let Y=K(T,x),Q=x.source;t.bindTexture(i.TEXTURE_CUBE_MAP,T.__webglTexture,i.TEXTURE0+B);let ee=n.get(Q);if(Q.version!==ee.__version||Y===!0){t.activeTexture(i.TEXTURE0+B);let oe=ze.getPrimaries(ze.workingColorSpace),W=x.colorSpace===ci?null:ze.getPrimaries(x.colorSpace),Z=x.colorSpace===ci||oe===W?i.NONE:i.BROWSER_DEFAULT_WEBGL;t.pixelStorei(i.UNPACK_FLIP_Y_WEBGL,x.flipY),t.pixelStorei(i.UNPACK_PREMULTIPLY_ALPHA_WEBGL,x.premultiplyAlpha),t.pixelStorei(i.UNPACK_ALIGNMENT,x.unpackAlignment),t.pixelStorei(i.UNPACK_COLORSPACE_CONVERSION_WEBGL,Z);let fe=x.isCompressedTexture||x.image[0].isCompressedTexture,_e=x.image[0]&&x.image[0].isDataTexture,se=[];for(let J=0;J<6;J++)!fe&&!_e?se[J]=m(x.image[J],!0,s.maxCubemapSize):se[J]=_e?x.image[J].image:x.image[J],se[J]=ce(x,se[J]);let te=se[0],Pe=r.convert(x.format,x.colorSpace),Oe=r.convert(x.type),Ze=S(x.internalFormat,Pe,Oe,x.normalized,x.colorSpace),P=x.isVideoTexture!==!0,ne=ee.__version===void 0||Y===!0,q=Q.dataReady,pe=w(x,te);Fe(i.TEXTURE_CUBE_MAP,x);let re;if(fe){P&&ne&&t.texStorage2D(i.TEXTURE_CUBE_MAP,pe,Ze,te.width,te.height);for(let J=0;J<6;J++){re=se[J].mipmaps;for(let Se=0;Se<re.length;Se++){let De=re[Se];x.format!==dn?Pe!==null?P?q&&t.compressedTexSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+J,Se,0,0,De.width,De.height,Pe,De.data):t.compressedTexImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+J,Se,Ze,De.width,De.height,0,De.data):ve("WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):P?q&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+J,Se,0,0,De.width,De.height,Pe,Oe,De.data):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+J,Se,Ze,De.width,De.height,0,Pe,Oe,De.data)}}}else{if(re=x.mipmaps,P&&ne){re.length>0&&pe++;let J=_t(se[0]);t.texStorage2D(i.TEXTURE_CUBE_MAP,pe,Ze,J.width,J.height)}for(let J=0;J<6;J++)if(_e){P?q&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+J,0,0,0,se[J].width,se[J].height,Pe,Oe,se[J].data):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+J,0,Ze,se[J].width,se[J].height,0,Pe,Oe,se[J].data);for(let Se=0;Se<re.length;Se++){let vt=re[Se].image[J].image;P?q&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+J,Se+1,0,0,vt.width,vt.height,Pe,Oe,vt.data):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+J,Se+1,Ze,vt.width,vt.height,0,Pe,Oe,vt.data)}}else{P?q&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+J,0,0,0,Pe,Oe,se[J]):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+J,0,Ze,Pe,Oe,se[J]);for(let Se=0;Se<re.length;Se++){let De=re[Se];P?q&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+J,Se+1,0,0,Pe,Oe,De.image[J]):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+J,Se+1,Ze,Pe,Oe,De.image[J])}}}f(x)&&_(i.TEXTURE_CUBE_MAP),ee.__version=Q.version,x.onUpdate&&x.onUpdate(x)}T.__version=x.version}function Ce(T,x,B,Y,Q,ee){let oe=r.convert(B.format,B.colorSpace),W=r.convert(B.type),Z=S(B.internalFormat,oe,W,B.normalized,B.colorSpace),fe=n.get(x),_e=n.get(B);if(_e.__renderTarget=x,!fe.__hasExternalTextures){let se=Math.max(1,x.width>>ee),te=Math.max(1,x.height>>ee);Q===i.TEXTURE_3D||Q===i.TEXTURE_2D_ARRAY?t.texImage3D(Q,ee,Z,se,te,x.depth,0,oe,W,null):t.texImage2D(Q,ee,Z,se,te,0,oe,W,null)}t.bindFramebuffer(i.FRAMEBUFFER,T),Xe(x)?a.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,Y,Q,_e.__webglTexture,0,It(x)):(Q===i.TEXTURE_2D||Q>=i.TEXTURE_CUBE_MAP_POSITIVE_X&&Q<=i.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&i.framebufferTexture2D(i.FRAMEBUFFER,Y,Q,_e.__webglTexture,ee),t.bindFramebuffer(i.FRAMEBUFFER,null)}function ft(T,x,B){if(i.bindRenderbuffer(i.RENDERBUFFER,T),x.depthBuffer){let Y=x.depthTexture,Q=Y&&Y.isDepthTexture?Y.type:null,ee=E(x.stencilBuffer,Q),oe=x.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT;Xe(x)?a.renderbufferStorageMultisampleEXT(i.RENDERBUFFER,It(x),ee,x.width,x.height):B?i.renderbufferStorageMultisample(i.RENDERBUFFER,It(x),ee,x.width,x.height):i.renderbufferStorage(i.RENDERBUFFER,ee,x.width,x.height),i.framebufferRenderbuffer(i.FRAMEBUFFER,oe,i.RENDERBUFFER,T)}else{let Y=x.textures;for(let Q=0;Q<Y.length;Q++){let ee=Y[Q],oe=r.convert(ee.format,ee.colorSpace),W=r.convert(ee.type),Z=S(ee.internalFormat,oe,W,ee.normalized,ee.colorSpace);Xe(x)?a.renderbufferStorageMultisampleEXT(i.RENDERBUFFER,It(x),Z,x.width,x.height):B?i.renderbufferStorageMultisample(i.RENDERBUFFER,It(x),Z,x.width,x.height):i.renderbufferStorage(i.RENDERBUFFER,Z,x.width,x.height)}}i.bindRenderbuffer(i.RENDERBUFFER,null)}function We(T,x,B){let Y=x.isWebGLCubeRenderTarget===!0;if(t.bindFramebuffer(i.FRAMEBUFFER,T),!(x.depthTexture&&x.depthTexture.isDepthTexture))throw new Error("renderTarget.depthTexture must be an instance of THREE.DepthTexture");let Q=n.get(x.depthTexture);if(Q.__renderTarget=x,(!Q.__webglTexture||x.depthTexture.image.width!==x.width||x.depthTexture.image.height!==x.height)&&(x.depthTexture.image.width=x.width,x.depthTexture.image.height=x.height,x.depthTexture.needsUpdate=!0),Y){if(Q.__webglInit===void 0&&(Q.__webglInit=!0,x.depthTexture.addEventListener("dispose",C)),Q.__webglTexture===void 0){Q.__webglTexture=i.createTexture(),t.bindTexture(i.TEXTURE_CUBE_MAP,Q.__webglTexture),Fe(i.TEXTURE_CUBE_MAP,x.depthTexture);let fe=r.convert(x.depthTexture.format),_e=r.convert(x.depthTexture.type),se;x.depthTexture.format===Fn?se=i.DEPTH_COMPONENT24:x.depthTexture.format===Li&&(se=i.DEPTH24_STENCIL8);for(let te=0;te<6;te++)i.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+te,0,se,x.width,x.height,0,fe,_e,null)}}else j(x.depthTexture,0);let ee=Q.__webglTexture,oe=It(x),W=Y?i.TEXTURE_CUBE_MAP_POSITIVE_X+B:i.TEXTURE_2D,Z=x.depthTexture.format===Li?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT;if(x.depthTexture.format===Fn)Xe(x)?a.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,Z,W,ee,0,oe):i.framebufferTexture2D(i.FRAMEBUFFER,Z,W,ee,0);else if(x.depthTexture.format===Li)Xe(x)?a.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,Z,W,ee,0,oe):i.framebufferTexture2D(i.FRAMEBUFFER,Z,W,ee,0);else throw new Error("Unknown depthTexture format")}function et(T){let x=n.get(T),B=T.isWebGLCubeRenderTarget===!0;if(x.__boundDepthTexture!==T.depthTexture){let Y=T.depthTexture;if(x.__depthDisposeCallback&&x.__depthDisposeCallback(),Y){let Q=()=>{delete x.__boundDepthTexture,delete x.__depthDisposeCallback,Y.removeEventListener("dispose",Q)};Y.addEventListener("dispose",Q),x.__depthDisposeCallback=Q}x.__boundDepthTexture=Y}if(T.depthTexture&&!x.__autoAllocateDepthBuffer)if(B)for(let Y=0;Y<6;Y++)We(x.__webglFramebuffer[Y],T,Y);else{let Y=T.texture.mipmaps;Y&&Y.length>0?We(x.__webglFramebuffer[0],T,0):We(x.__webglFramebuffer,T,0)}else if(B){x.__webglDepthbuffer=[];for(let Y=0;Y<6;Y++)if(t.bindFramebuffer(i.FRAMEBUFFER,x.__webglFramebuffer[Y]),x.__webglDepthbuffer[Y]===void 0)x.__webglDepthbuffer[Y]=i.createRenderbuffer(),ft(x.__webglDepthbuffer[Y],T,!1);else{let Q=T.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,ee=x.__webglDepthbuffer[Y];i.bindRenderbuffer(i.RENDERBUFFER,ee),i.framebufferRenderbuffer(i.FRAMEBUFFER,Q,i.RENDERBUFFER,ee)}}else{let Y=T.texture.mipmaps;if(Y&&Y.length>0?t.bindFramebuffer(i.FRAMEBUFFER,x.__webglFramebuffer[0]):t.bindFramebuffer(i.FRAMEBUFFER,x.__webglFramebuffer),x.__webglDepthbuffer===void 0)x.__webglDepthbuffer=i.createRenderbuffer(),ft(x.__webglDepthbuffer,T,!1);else{let Q=T.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,ee=x.__webglDepthbuffer;i.bindRenderbuffer(i.RENDERBUFFER,ee),i.framebufferRenderbuffer(i.FRAMEBUFFER,Q,i.RENDERBUFFER,ee)}}t.bindFramebuffer(i.FRAMEBUFFER,null)}function ut(T,x,B){let Y=n.get(T);x!==void 0&&Ce(Y.__webglFramebuffer,T,T.texture,i.COLOR_ATTACHMENT0,i.TEXTURE_2D,0),B!==void 0&&et(T)}function Ge(T){let x=T.texture,B=n.get(T),Y=n.get(x);T.addEventListener("dispose",y);let Q=T.textures,ee=T.isWebGLCubeRenderTarget===!0,oe=Q.length>1;if(oe||(Y.__webglTexture===void 0&&(Y.__webglTexture=i.createTexture()),Y.__version=x.version,o.memory.textures++),ee){B.__webglFramebuffer=[];for(let W=0;W<6;W++)if(x.mipmaps&&x.mipmaps.length>0){B.__webglFramebuffer[W]=[];for(let Z=0;Z<x.mipmaps.length;Z++)B.__webglFramebuffer[W][Z]=i.createFramebuffer()}else B.__webglFramebuffer[W]=i.createFramebuffer()}else{if(x.mipmaps&&x.mipmaps.length>0){B.__webglFramebuffer=[];for(let W=0;W<x.mipmaps.length;W++)B.__webglFramebuffer[W]=i.createFramebuffer()}else B.__webglFramebuffer=i.createFramebuffer();if(oe)for(let W=0,Z=Q.length;W<Z;W++){let fe=n.get(Q[W]);fe.__webglTexture===void 0&&(fe.__webglTexture=i.createTexture(),o.memory.textures++)}if(T.samples>0&&Xe(T)===!1){B.__webglMultisampledFramebuffer=i.createFramebuffer(),B.__webglColorRenderbuffer=[],t.bindFramebuffer(i.FRAMEBUFFER,B.__webglMultisampledFramebuffer);for(let W=0;W<Q.length;W++){let Z=Q[W];B.__webglColorRenderbuffer[W]=i.createRenderbuffer(),i.bindRenderbuffer(i.RENDERBUFFER,B.__webglColorRenderbuffer[W]);let fe=r.convert(Z.format,Z.colorSpace),_e=r.convert(Z.type),se=S(Z.internalFormat,fe,_e,Z.normalized,Z.colorSpace,T.isXRRenderTarget===!0),te=It(T);i.renderbufferStorageMultisample(i.RENDERBUFFER,te,se,T.width,T.height),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+W,i.RENDERBUFFER,B.__webglColorRenderbuffer[W])}i.bindRenderbuffer(i.RENDERBUFFER,null),T.depthBuffer&&(B.__webglDepthRenderbuffer=i.createRenderbuffer(),ft(B.__webglDepthRenderbuffer,T,!0)),t.bindFramebuffer(i.FRAMEBUFFER,null)}}if(ee){t.bindTexture(i.TEXTURE_CUBE_MAP,Y.__webglTexture),Fe(i.TEXTURE_CUBE_MAP,x);for(let W=0;W<6;W++)if(x.mipmaps&&x.mipmaps.length>0)for(let Z=0;Z<x.mipmaps.length;Z++)Ce(B.__webglFramebuffer[W][Z],T,x,i.COLOR_ATTACHMENT0,i.TEXTURE_CUBE_MAP_POSITIVE_X+W,Z);else Ce(B.__webglFramebuffer[W],T,x,i.COLOR_ATTACHMENT0,i.TEXTURE_CUBE_MAP_POSITIVE_X+W,0);f(x)&&_(i.TEXTURE_CUBE_MAP),t.unbindTexture()}else if(oe){for(let W=0,Z=Q.length;W<Z;W++){let fe=Q[W],_e=n.get(fe),se=i.TEXTURE_2D;(T.isWebGL3DRenderTarget||T.isWebGLArrayRenderTarget)&&(se=T.isWebGL3DRenderTarget?i.TEXTURE_3D:i.TEXTURE_2D_ARRAY),t.bindTexture(se,_e.__webglTexture),Fe(se,fe),Ce(B.__webglFramebuffer,T,fe,i.COLOR_ATTACHMENT0+W,se,0),f(fe)&&_(se)}t.unbindTexture()}else{let W=i.TEXTURE_2D;if((T.isWebGL3DRenderTarget||T.isWebGLArrayRenderTarget)&&(W=T.isWebGL3DRenderTarget?i.TEXTURE_3D:i.TEXTURE_2D_ARRAY),t.bindTexture(W,Y.__webglTexture),Fe(W,x),x.mipmaps&&x.mipmaps.length>0)for(let Z=0;Z<x.mipmaps.length;Z++)Ce(B.__webglFramebuffer[Z],T,x,i.COLOR_ATTACHMENT0,W,Z);else Ce(B.__webglFramebuffer,T,x,i.COLOR_ATTACHMENT0,W,0);f(x)&&_(W),t.unbindTexture()}T.depthBuffer&&et(T)}function Ct(T){let x=T.textures;for(let B=0,Y=x.length;B<Y;B++){let Q=x[B];if(f(Q)){let ee=b(T),oe=n.get(Q).__webglTexture;t.bindTexture(ee,oe),_(ee),t.unbindTexture()}}}let pt=[],nn=[];function D(T){if(T.samples>0){if(Xe(T)===!1){let x=T.textures,B=T.width,Y=T.height,Q=i.COLOR_BUFFER_BIT,ee=T.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,oe=n.get(T),W=x.length>1;if(W)for(let fe=0;fe<x.length;fe++)t.bindFramebuffer(i.FRAMEBUFFER,oe.__webglMultisampledFramebuffer),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+fe,i.RENDERBUFFER,null),t.bindFramebuffer(i.FRAMEBUFFER,oe.__webglFramebuffer),i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0+fe,i.TEXTURE_2D,null,0);t.bindFramebuffer(i.READ_FRAMEBUFFER,oe.__webglMultisampledFramebuffer);let Z=T.texture.mipmaps;Z&&Z.length>0?t.bindFramebuffer(i.DRAW_FRAMEBUFFER,oe.__webglFramebuffer[0]):t.bindFramebuffer(i.DRAW_FRAMEBUFFER,oe.__webglFramebuffer);for(let fe=0;fe<x.length;fe++){if(T.resolveDepthBuffer&&(T.depthBuffer&&(Q|=i.DEPTH_BUFFER_BIT),T.stencilBuffer&&T.resolveStencilBuffer&&(Q|=i.STENCIL_BUFFER_BIT)),W){i.framebufferRenderbuffer(i.READ_FRAMEBUFFER,i.COLOR_ATTACHMENT0,i.RENDERBUFFER,oe.__webglColorRenderbuffer[fe]);let _e=n.get(x[fe]).__webglTexture;i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0,i.TEXTURE_2D,_e,0)}i.blitFramebuffer(0,0,B,Y,0,0,B,Y,Q,i.NEAREST),c===!0&&(pt.length=0,nn.length=0,pt.push(i.COLOR_ATTACHMENT0+fe),T.depthBuffer&&T.resolveDepthBuffer===!1&&(pt.push(ee),nn.push(ee),i.invalidateFramebuffer(i.DRAW_FRAMEBUFFER,nn)),i.invalidateFramebuffer(i.READ_FRAMEBUFFER,pt))}if(t.bindFramebuffer(i.READ_FRAMEBUFFER,null),t.bindFramebuffer(i.DRAW_FRAMEBUFFER,null),W)for(let fe=0;fe<x.length;fe++){t.bindFramebuffer(i.FRAMEBUFFER,oe.__webglMultisampledFramebuffer),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+fe,i.RENDERBUFFER,oe.__webglColorRenderbuffer[fe]);let _e=n.get(x[fe]).__webglTexture;t.bindFramebuffer(i.FRAMEBUFFER,oe.__webglFramebuffer),i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0+fe,i.TEXTURE_2D,_e,0)}t.bindFramebuffer(i.DRAW_FRAMEBUFFER,oe.__webglMultisampledFramebuffer)}else if(T.depthBuffer&&T.resolveDepthBuffer===!1&&c){let x=T.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT;i.invalidateFramebuffer(i.DRAW_FRAMEBUFFER,[x])}}}function It(T){return Math.min(s.maxSamples,T.samples)}function Xe(T){let x=n.get(T);return T.samples>0&&e.has("WEBGL_multisampled_render_to_texture")===!0&&x.__useRenderToTexture!==!1}function at(T){let x=o.render.frame;u.get(T)!==x&&(u.set(T,x),T.update())}function ce(T,x){let B=T.colorSpace,Y=T.format,Q=T.type;return T.isCompressedTexture===!0||T.isVideoTexture===!0||B!==Kt&&B!==ci&&(ze.getTransfer(B)===Ke?(Y!==dn||Q!==Wt)&&ve("WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):Ee("WebGLTextures: Unsupported texture color space:",B)),x}function _t(T){return typeof HTMLImageElement<"u"&&T instanceof HTMLImageElement?(l.width=T.naturalWidth||T.width,l.height=T.naturalHeight||T.height):typeof VideoFrame<"u"&&T instanceof VideoFrame?(l.width=T.displayWidth,l.height=T.displayHeight):(l.width=T.width,l.height=T.height),l}this.allocateTextureUnit=F,this.resetTextureUnits=G,this.getTextureUnits=X,this.setTextureUnits=U,this.setTexture2D=j,this.setTexture2DArray=$,this.setTexture3D=ae,this.setTextureCube=ye,this.rebindTextures=ut,this.setupRenderTarget=Ge,this.updateRenderTargetMipmap=Ct,this.updateMultisampleRenderTarget=D,this.setupDepthRenderbuffer=et,this.setupFrameBufferTexture=Ce,this.useMultisampledRTT=Xe,this.isReversedDepthBuffer=function(){return t.buffers.depth.getReversed()}}function R3(i,e){function t(n,s=ci){let r,o=ze.getTransfer(s);if(n===Wt)return i.UNSIGNED_BYTE;if(n===ba)return i.UNSIGNED_SHORT_4_4_4_4;if(n===Sa)return i.UNSIGNED_SHORT_5_5_5_1;if(n===Cl)return i.UNSIGNED_INT_5_9_9_9_REV;if(n===Il)return i.UNSIGNED_INT_10F_11F_11F_REV;if(n===El)return i.BYTE;if(n===Rl)return i.SHORT;if(n===qs)return i.UNSIGNED_SHORT;if(n===Ma)return i.INT;if(n===Cn)return i.UNSIGNED_INT;if(n===un)return i.FLOAT;if(n===Hn)return i.HALF_FLOAT;if(n===Pl)return i.ALPHA;if(n===Ll)return i.RGB;if(n===dn)return i.RGBA;if(n===Fn)return i.DEPTH_COMPONENT;if(n===Li)return i.DEPTH_STENCIL;if(n===Zs)return i.RED;if(n===Ta)return i.RED_INTEGER;if(n===Di)return i.RG;if(n===wa)return i.RG_INTEGER;if(n===Aa)return i.RGBA_INTEGER;if(n===Gr||n===Wr||n===Xr||n===qr)if(o===Ke)if(r=e.get("WEBGL_compressed_texture_s3tc_srgb"),r!==null){if(n===Gr)return r.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(n===Wr)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(n===Xr)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(n===qr)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(r=e.get("WEBGL_compressed_texture_s3tc"),r!==null){if(n===Gr)return r.COMPRESSED_RGB_S3TC_DXT1_EXT;if(n===Wr)return r.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(n===Xr)return r.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(n===qr)return r.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(n===Ea||n===Ra||n===Ca||n===Ia)if(r=e.get("WEBGL_compressed_texture_pvrtc"),r!==null){if(n===Ea)return r.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(n===Ra)return r.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(n===Ca)return r.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(n===Ia)return r.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(n===Pa||n===La||n===Da||n===Na||n===Ua||n===Yr||n===Fa)if(r=e.get("WEBGL_compressed_texture_etc"),r!==null){if(n===Pa||n===La)return o===Ke?r.COMPRESSED_SRGB8_ETC2:r.COMPRESSED_RGB8_ETC2;if(n===Da)return o===Ke?r.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:r.COMPRESSED_RGBA8_ETC2_EAC;if(n===Na)return r.COMPRESSED_R11_EAC;if(n===Ua)return r.COMPRESSED_SIGNED_R11_EAC;if(n===Yr)return r.COMPRESSED_RG11_EAC;if(n===Fa)return r.COMPRESSED_SIGNED_RG11_EAC}else return null;if(n===Oa||n===Ba||n===ka||n===za||n===Va||n===Ha||n===Ga||n===Wa||n===Xa||n===qa||n===Ya||n===Za||n===Ka||n===ja)if(r=e.get("WEBGL_compressed_texture_astc"),r!==null){if(n===Oa)return o===Ke?r.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:r.COMPRESSED_RGBA_ASTC_4x4_KHR;if(n===Ba)return o===Ke?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:r.COMPRESSED_RGBA_ASTC_5x4_KHR;if(n===ka)return o===Ke?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:r.COMPRESSED_RGBA_ASTC_5x5_KHR;if(n===za)return o===Ke?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:r.COMPRESSED_RGBA_ASTC_6x5_KHR;if(n===Va)return o===Ke?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:r.COMPRESSED_RGBA_ASTC_6x6_KHR;if(n===Ha)return o===Ke?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:r.COMPRESSED_RGBA_ASTC_8x5_KHR;if(n===Ga)return o===Ke?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:r.COMPRESSED_RGBA_ASTC_8x6_KHR;if(n===Wa)return o===Ke?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:r.COMPRESSED_RGBA_ASTC_8x8_KHR;if(n===Xa)return o===Ke?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:r.COMPRESSED_RGBA_ASTC_10x5_KHR;if(n===qa)return o===Ke?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:r.COMPRESSED_RGBA_ASTC_10x6_KHR;if(n===Ya)return o===Ke?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:r.COMPRESSED_RGBA_ASTC_10x8_KHR;if(n===Za)return o===Ke?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:r.COMPRESSED_RGBA_ASTC_10x10_KHR;if(n===Ka)return o===Ke?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:r.COMPRESSED_RGBA_ASTC_12x10_KHR;if(n===ja)return o===Ke?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:r.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(n===$a||n===Ja||n===Qa)if(r=e.get("EXT_texture_compression_bptc"),r!==null){if(n===$a)return o===Ke?r.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:r.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(n===Ja)return r.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(n===Qa)return r.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(n===ec||n===tc||n===Zr||n===nc)if(r=e.get("EXT_texture_compression_rgtc"),r!==null){if(n===ec)return r.COMPRESSED_RED_RGTC1_EXT;if(n===tc)return r.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(n===Zr)return r.COMPRESSED_RED_GREEN_RGTC2_EXT;if(n===nc)return r.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return n===Ys?i.UNSIGNED_INT_24_8:i[n]!==void 0?i[n]:null}return{convert:t}}var C3=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,I3=`
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

}`,e0=class{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(e,t){if(this.texture===null){let n=new Er(e.texture);(e.depthNear!==t.depthNear||e.depthFar!==t.depthFar)&&(this.depthNear=e.depthNear,this.depthFar=e.depthFar),this.texture=n}}getMesh(e){if(this.texture!==null&&this.mesh===null){let t=e.cameras[0].viewport,n=new Jt({vertexShader:C3,fragmentShader:I3,uniforms:{depthColor:{value:this.texture},depthWidth:{value:t.z},depthHeight:{value:t.w}}});this.mesh=new Je(new Ji(20,20),n)}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}},t0=class extends wn{constructor(e,t){super();let n=this,s=null,r=1,o=null,a="local-floor",c=1,l=null,u=null,d=null,h=null,p=null,g=null,v=typeof XRWebGLBinding<"u",m=new e0,f={},_=t.getContextAttributes(),b=null,S=null,E=[],w=[],C=new be,y=null,A=new At;A.viewport=new $e;let I=new At;I.viewport=new $e;let R=[A,I],O=new _a,G=null,X=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(K){let de=E[K];return de===void 0&&(de=new Fs,E[K]=de),de.getTargetRaySpace()},this.getControllerGrip=function(K){let de=E[K];return de===void 0&&(de=new Fs,E[K]=de),de.getGripSpace()},this.getHand=function(K){let de=E[K];return de===void 0&&(de=new Fs,E[K]=de),de.getHandSpace()};function U(K){let de=w.indexOf(K.inputSource);if(de===-1)return;let ie=E[de];ie!==void 0&&(ie.update(K.inputSource,K.frame,l||o),ie.dispatchEvent({type:K.type,data:K.inputSource}))}function F(){s.removeEventListener("select",U),s.removeEventListener("selectstart",U),s.removeEventListener("selectend",U),s.removeEventListener("squeeze",U),s.removeEventListener("squeezestart",U),s.removeEventListener("squeezeend",U),s.removeEventListener("end",F),s.removeEventListener("inputsourceschange",V);for(let K=0;K<E.length;K++){let de=w[K];de!==null&&(w[K]=null,E[K].disconnect(de))}G=null,X=null,m.reset();for(let K in f)delete f[K];e.setRenderTarget(b),p=null,h=null,d=null,s=null,S=null,Fe.stop(),n.isPresenting=!1,e.setPixelRatio(y),e.setSize(C.width,C.height,!1),n.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(K){r=K,n.isPresenting===!0&&ve("WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(K){a=K,n.isPresenting===!0&&ve("WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return l||o},this.setReferenceSpace=function(K){l=K},this.getBaseLayer=function(){return h!==null?h:p},this.getBinding=function(){return d===null&&v&&(d=new XRWebGLBinding(s,t)),d},this.getFrame=function(){return g},this.getSession=function(){return s},this.setSession=async function(K){if(s=K,s!==null){if(b=e.getRenderTarget(),s.addEventListener("select",U),s.addEventListener("selectstart",U),s.addEventListener("selectend",U),s.addEventListener("squeeze",U),s.addEventListener("squeezestart",U),s.addEventListener("squeezeend",U),s.addEventListener("end",F),s.addEventListener("inputsourceschange",V),_.xrCompatible!==!0&&await t.makeXRCompatible(),y=e.getPixelRatio(),e.getSize(C),v&&"createProjectionLayer"in XRWebGLBinding.prototype){let ie=null,Re=null,Le=null;_.depth&&(Le=_.stencil?t.DEPTH24_STENCIL8:t.DEPTH_COMPONENT24,ie=_.stencil?Li:Fn,Re=_.stencil?Ys:Cn);let Ce={colorFormat:t.RGBA8,depthFormat:Le,scaleFactor:r};d=this.getBinding(),h=d.createProjectionLayer(Ce),s.updateRenderState({layers:[h]}),e.setPixelRatio(1),e.setSize(h.textureWidth,h.textureHeight,!1),S=new cn(h.textureWidth,h.textureHeight,{format:dn,type:Wt,depthTexture:new ii(h.textureWidth,h.textureHeight,Re,void 0,void 0,void 0,void 0,void 0,void 0,ie),stencilBuffer:_.stencil,colorSpace:e.outputColorSpace,samples:_.antialias?4:0,resolveDepthBuffer:h.ignoreDepthValues===!1,resolveStencilBuffer:h.ignoreDepthValues===!1})}else{let ie={antialias:_.antialias,alpha:!0,depth:_.depth,stencil:_.stencil,framebufferScaleFactor:r};p=new XRWebGLLayer(s,t,ie),s.updateRenderState({baseLayer:p}),e.setPixelRatio(1),e.setSize(p.framebufferWidth,p.framebufferHeight,!1),S=new cn(p.framebufferWidth,p.framebufferHeight,{format:dn,type:Wt,colorSpace:e.outputColorSpace,stencilBuffer:_.stencil,resolveDepthBuffer:p.ignoreDepthValues===!1,resolveStencilBuffer:p.ignoreDepthValues===!1})}S.isXRRenderTarget=!0,this.setFoveation(c),l=null,o=await s.requestReferenceSpace(a),Fe.setContext(s),Fe.start(),n.isPresenting=!0,n.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(s!==null)return s.environmentBlendMode},this.getDepthTexture=function(){return m.getDepthTexture()};function V(K){for(let de=0;de<K.removed.length;de++){let ie=K.removed[de],Re=w.indexOf(ie);Re>=0&&(w[Re]=null,E[Re].disconnect(ie))}for(let de=0;de<K.added.length;de++){let ie=K.added[de],Re=w.indexOf(ie);if(Re===-1){for(let Ce=0;Ce<E.length;Ce++)if(Ce>=w.length){w.push(ie),Re=Ce;break}else if(w[Ce]===null){w[Ce]=ie,Re=Ce;break}if(Re===-1)break}let Le=E[Re];Le&&Le.connect(ie)}}let j=new L,$=new L;function ae(K,de,ie){j.setFromMatrixPosition(de.matrixWorld),$.setFromMatrixPosition(ie.matrixWorld);let Re=j.distanceTo($),Le=de.projectionMatrix.elements,Ce=ie.projectionMatrix.elements,ft=Le[14]/(Le[10]-1),We=Le[14]/(Le[10]+1),et=(Le[9]+1)/Le[5],ut=(Le[9]-1)/Le[5],Ge=(Le[8]-1)/Le[0],Ct=(Ce[8]+1)/Ce[0],pt=ft*Ge,nn=ft*Ct,D=Re/(-Ge+Ct),It=D*-Ge;if(de.matrixWorld.decompose(K.position,K.quaternion,K.scale),K.translateX(It),K.translateZ(D),K.matrixWorld.compose(K.position,K.quaternion,K.scale),K.matrixWorldInverse.copy(K.matrixWorld).invert(),Le[10]===-1)K.projectionMatrix.copy(de.projectionMatrix),K.projectionMatrixInverse.copy(de.projectionMatrixInverse);else{let Xe=ft+D,at=We+D,ce=pt-It,_t=nn+(Re-It),T=et*We/at*Xe,x=ut*We/at*Xe;K.projectionMatrix.makePerspective(ce,_t,T,x,Xe,at),K.projectionMatrixInverse.copy(K.projectionMatrix).invert()}}function ye(K,de){de===null?K.matrixWorld.copy(K.matrix):K.matrixWorld.multiplyMatrices(de.matrixWorld,K.matrix),K.matrixWorldInverse.copy(K.matrixWorld).invert()}this.updateCamera=function(K){if(s===null)return;let de=K.near,ie=K.far;m.texture!==null&&(m.depthNear>0&&(de=m.depthNear),m.depthFar>0&&(ie=m.depthFar)),O.near=I.near=A.near=de,O.far=I.far=A.far=ie,(G!==O.near||X!==O.far)&&(s.updateRenderState({depthNear:O.near,depthFar:O.far}),G=O.near,X=O.far),O.layers.mask=K.layers.mask|6,A.layers.mask=O.layers.mask&-5,I.layers.mask=O.layers.mask&-3;let Re=K.parent,Le=O.cameras;ye(O,Re);for(let Ce=0;Ce<Le.length;Ce++)ye(Le[Ce],Re);Le.length===2?ae(O,A,I):O.projectionMatrix.copy(A.projectionMatrix),we(K,O,Re)};function we(K,de,ie){ie===null?K.matrix.copy(de.matrixWorld):(K.matrix.copy(ie.matrixWorld),K.matrix.invert(),K.matrix.multiply(de.matrixWorld)),K.matrix.decompose(K.position,K.quaternion,K.scale),K.updateMatrixWorld(!0),K.projectionMatrix.copy(de.projectionMatrix),K.projectionMatrixInverse.copy(de.projectionMatrixInverse),K.isPerspectiveCamera&&(K.fov=Yi*2*Math.atan(1/K.projectionMatrix.elements[5]),K.zoom=1)}this.getCamera=function(){return O},this.getFoveation=function(){if(!(h===null&&p===null))return c},this.setFoveation=function(K){c=K,h!==null&&(h.fixedFoveation=K),p!==null&&p.fixedFoveation!==void 0&&(p.fixedFoveation=K)},this.hasDepthSensing=function(){return m.texture!==null},this.getDepthSensingMesh=function(){return m.getMesh(O)},this.getCameraTexture=function(K){return f[K]};let qe=null;function Qe(K,de){if(u=de.getViewerPose(l||o),g=de,u!==null){let ie=u.views;p!==null&&(e.setRenderTargetFramebuffer(S,p.framebuffer),e.setRenderTarget(S));let Re=!1;ie.length!==O.cameras.length&&(O.cameras.length=0,Re=!0);for(let We=0;We<ie.length;We++){let et=ie[We],ut=null;if(p!==null)ut=p.getViewport(et);else{let Ct=d.getViewSubImage(h,et);ut=Ct.viewport,We===0&&(e.setRenderTargetTextures(S,Ct.colorTexture,Ct.depthStencilTexture),e.setRenderTarget(S))}let Ge=R[We];Ge===void 0&&(Ge=new At,Ge.layers.enable(We),Ge.viewport=new $e,R[We]=Ge),Ge.matrix.fromArray(et.transform.matrix),Ge.matrix.decompose(Ge.position,Ge.quaternion,Ge.scale),Ge.projectionMatrix.fromArray(et.projectionMatrix),Ge.projectionMatrixInverse.copy(Ge.projectionMatrix).invert(),Ge.viewport.set(ut.x,ut.y,ut.width,ut.height),We===0&&(O.matrix.copy(Ge.matrix),O.matrix.decompose(O.position,O.quaternion,O.scale)),Re===!0&&O.cameras.push(Ge)}let Le=s.enabledFeatures;if(Le&&Le.includes("depth-sensing")&&s.depthUsage=="gpu-optimized"&&v){d=n.getBinding();let We=d.getDepthInformation(ie[0]);We&&We.isValid&&We.texture&&m.init(We,s.renderState)}if(Le&&Le.includes("camera-access")&&v){e.state.unbindTexture(),d=n.getBinding();for(let We=0;We<ie.length;We++){let et=ie[We].camera;if(et){let ut=f[et];ut||(ut=new Er,f[et]=ut);let Ge=d.getCameraImage(et);ut.sourceTexture=Ge}}}}for(let ie=0;ie<E.length;ie++){let Re=w[ie],Le=E[ie];Re!==null&&Le!==void 0&&Le.update(Re,de,l||o)}qe&&qe(K,de),de.detectedPlanes&&n.dispatchEvent({type:"planesdetected",data:de}),g=null}let Fe=new ju;Fe.setAnimationLoop(Qe),this.setAnimationLoop=function(K){qe=K},this.dispose=function(){}}},P3=new Ue,nd=new Ie;nd.set(-1,0,0,0,1,0,0,0,1);function L3(i,e){function t(m,f){m.matrixAutoUpdate===!0&&m.updateMatrix(),f.value.copy(m.matrix)}function n(m,f){f.color.getRGB(m.fogColor.value,Ol(i)),f.isFog?(m.fogNear.value=f.near,m.fogFar.value=f.far):f.isFogExp2&&(m.fogDensity.value=f.density)}function s(m,f,_,b,S){f.isNodeMaterial?f.uniformsNeedUpdate=!1:f.isMeshBasicMaterial?r(m,f):f.isMeshLambertMaterial?(r(m,f),f.envMap&&(m.envMapIntensity.value=f.envMapIntensity)):f.isMeshToonMaterial?(r(m,f),d(m,f)):f.isMeshPhongMaterial?(r(m,f),u(m,f),f.envMap&&(m.envMapIntensity.value=f.envMapIntensity)):f.isMeshStandardMaterial?(r(m,f),h(m,f),f.isMeshPhysicalMaterial&&p(m,f,S)):f.isMeshMatcapMaterial?(r(m,f),g(m,f)):f.isMeshDepthMaterial?r(m,f):f.isMeshDistanceMaterial?(r(m,f),v(m,f)):f.isMeshNormalMaterial?r(m,f):f.isLineBasicMaterial?(o(m,f),f.isLineDashedMaterial&&a(m,f)):f.isPointsMaterial?c(m,f,_,b):f.isSpriteMaterial?l(m,f):f.isShadowMaterial?(m.color.value.copy(f.color),m.opacity.value=f.opacity):f.isShaderMaterial&&(f.uniformsNeedUpdate=!1)}function r(m,f){m.opacity.value=f.opacity,f.color&&m.diffuse.value.copy(f.color),f.emissive&&m.emissive.value.copy(f.emissive).multiplyScalar(f.emissiveIntensity),f.map&&(m.map.value=f.map,t(f.map,m.mapTransform)),f.alphaMap&&(m.alphaMap.value=f.alphaMap,t(f.alphaMap,m.alphaMapTransform)),f.bumpMap&&(m.bumpMap.value=f.bumpMap,t(f.bumpMap,m.bumpMapTransform),m.bumpScale.value=f.bumpScale,f.side===kt&&(m.bumpScale.value*=-1)),f.normalMap&&(m.normalMap.value=f.normalMap,t(f.normalMap,m.normalMapTransform),m.normalScale.value.copy(f.normalScale),f.side===kt&&m.normalScale.value.negate()),f.displacementMap&&(m.displacementMap.value=f.displacementMap,t(f.displacementMap,m.displacementMapTransform),m.displacementScale.value=f.displacementScale,m.displacementBias.value=f.displacementBias),f.emissiveMap&&(m.emissiveMap.value=f.emissiveMap,t(f.emissiveMap,m.emissiveMapTransform)),f.specularMap&&(m.specularMap.value=f.specularMap,t(f.specularMap,m.specularMapTransform)),f.alphaTest>0&&(m.alphaTest.value=f.alphaTest);let _=e.get(f),b=_.envMap,S=_.envMapRotation;b&&(m.envMap.value=b,m.envMapRotation.value.setFromMatrix4(P3.makeRotationFromEuler(S)).transpose(),b.isCubeTexture&&b.isRenderTargetTexture===!1&&m.envMapRotation.value.premultiply(nd),m.reflectivity.value=f.reflectivity,m.ior.value=f.ior,m.refractionRatio.value=f.refractionRatio),f.lightMap&&(m.lightMap.value=f.lightMap,m.lightMapIntensity.value=f.lightMapIntensity,t(f.lightMap,m.lightMapTransform)),f.aoMap&&(m.aoMap.value=f.aoMap,m.aoMapIntensity.value=f.aoMapIntensity,t(f.aoMap,m.aoMapTransform))}function o(m,f){m.diffuse.value.copy(f.color),m.opacity.value=f.opacity,f.map&&(m.map.value=f.map,t(f.map,m.mapTransform))}function a(m,f){m.dashSize.value=f.dashSize,m.totalSize.value=f.dashSize+f.gapSize,m.scale.value=f.scale}function c(m,f,_,b){m.diffuse.value.copy(f.color),m.opacity.value=f.opacity,m.size.value=f.size*_,m.scale.value=b*.5,f.map&&(m.map.value=f.map,t(f.map,m.uvTransform)),f.alphaMap&&(m.alphaMap.value=f.alphaMap,t(f.alphaMap,m.alphaMapTransform)),f.alphaTest>0&&(m.alphaTest.value=f.alphaTest)}function l(m,f){m.diffuse.value.copy(f.color),m.opacity.value=f.opacity,m.rotation.value=f.rotation,f.map&&(m.map.value=f.map,t(f.map,m.mapTransform)),f.alphaMap&&(m.alphaMap.value=f.alphaMap,t(f.alphaMap,m.alphaMapTransform)),f.alphaTest>0&&(m.alphaTest.value=f.alphaTest)}function u(m,f){m.specular.value.copy(f.specular),m.shininess.value=Math.max(f.shininess,1e-4)}function d(m,f){f.gradientMap&&(m.gradientMap.value=f.gradientMap)}function h(m,f){m.metalness.value=f.metalness,f.metalnessMap&&(m.metalnessMap.value=f.metalnessMap,t(f.metalnessMap,m.metalnessMapTransform)),m.roughness.value=f.roughness,f.roughnessMap&&(m.roughnessMap.value=f.roughnessMap,t(f.roughnessMap,m.roughnessMapTransform)),f.envMap&&(m.envMapIntensity.value=f.envMapIntensity)}function p(m,f,_){m.ior.value=f.ior,f.sheen>0&&(m.sheenColor.value.copy(f.sheenColor).multiplyScalar(f.sheen),m.sheenRoughness.value=f.sheenRoughness,f.sheenColorMap&&(m.sheenColorMap.value=f.sheenColorMap,t(f.sheenColorMap,m.sheenColorMapTransform)),f.sheenRoughnessMap&&(m.sheenRoughnessMap.value=f.sheenRoughnessMap,t(f.sheenRoughnessMap,m.sheenRoughnessMapTransform))),f.clearcoat>0&&(m.clearcoat.value=f.clearcoat,m.clearcoatRoughness.value=f.clearcoatRoughness,f.clearcoatMap&&(m.clearcoatMap.value=f.clearcoatMap,t(f.clearcoatMap,m.clearcoatMapTransform)),f.clearcoatRoughnessMap&&(m.clearcoatRoughnessMap.value=f.clearcoatRoughnessMap,t(f.clearcoatRoughnessMap,m.clearcoatRoughnessMapTransform)),f.clearcoatNormalMap&&(m.clearcoatNormalMap.value=f.clearcoatNormalMap,t(f.clearcoatNormalMap,m.clearcoatNormalMapTransform),m.clearcoatNormalScale.value.copy(f.clearcoatNormalScale),f.side===kt&&m.clearcoatNormalScale.value.negate())),f.dispersion>0&&(m.dispersion.value=f.dispersion),f.iridescence>0&&(m.iridescence.value=f.iridescence,m.iridescenceIOR.value=f.iridescenceIOR,m.iridescenceThicknessMinimum.value=f.iridescenceThicknessRange[0],m.iridescenceThicknessMaximum.value=f.iridescenceThicknessRange[1],f.iridescenceMap&&(m.iridescenceMap.value=f.iridescenceMap,t(f.iridescenceMap,m.iridescenceMapTransform)),f.iridescenceThicknessMap&&(m.iridescenceThicknessMap.value=f.iridescenceThicknessMap,t(f.iridescenceThicknessMap,m.iridescenceThicknessMapTransform))),f.transmission>0&&(m.transmission.value=f.transmission,m.transmissionSamplerMap.value=_.texture,m.transmissionSamplerSize.value.set(_.width,_.height),f.transmissionMap&&(m.transmissionMap.value=f.transmissionMap,t(f.transmissionMap,m.transmissionMapTransform)),m.thickness.value=f.thickness,f.thicknessMap&&(m.thicknessMap.value=f.thicknessMap,t(f.thicknessMap,m.thicknessMapTransform)),m.attenuationDistance.value=f.attenuationDistance,m.attenuationColor.value.copy(f.attenuationColor)),f.anisotropy>0&&(m.anisotropyVector.value.set(f.anisotropy*Math.cos(f.anisotropyRotation),f.anisotropy*Math.sin(f.anisotropyRotation)),f.anisotropyMap&&(m.anisotropyMap.value=f.anisotropyMap,t(f.anisotropyMap,m.anisotropyMapTransform))),m.specularIntensity.value=f.specularIntensity,m.specularColor.value.copy(f.specularColor),f.specularColorMap&&(m.specularColorMap.value=f.specularColorMap,t(f.specularColorMap,m.specularColorMapTransform)),f.specularIntensityMap&&(m.specularIntensityMap.value=f.specularIntensityMap,t(f.specularIntensityMap,m.specularIntensityMapTransform))}function g(m,f){f.matcap&&(m.matcap.value=f.matcap)}function v(m,f){let _=e.get(f).light;m.referencePosition.value.setFromMatrixPosition(_.matrixWorld),m.nearDistance.value=_.shadow.camera.near,m.farDistance.value=_.shadow.camera.far}return{refreshFogUniforms:n,refreshMaterialUniforms:s}}function D3(i,e,t,n){let s={},r={},o=[],a=i.getParameter(i.MAX_UNIFORM_BUFFER_BINDINGS);function c(_,b){let S=b.program;n.uniformBlockBinding(_,S)}function l(_,b){let S=s[_.id];S===void 0&&(g(_),S=u(_),s[_.id]=S,_.addEventListener("dispose",m));let E=b.program;n.updateUBOMapping(_,E);let w=e.render.frame;r[_.id]!==w&&(h(_),r[_.id]=w)}function u(_){let b=d();_.__bindingPointIndex=b;let S=i.createBuffer(),E=_.__size,w=_.usage;return i.bindBuffer(i.UNIFORM_BUFFER,S),i.bufferData(i.UNIFORM_BUFFER,E,w),i.bindBuffer(i.UNIFORM_BUFFER,null),i.bindBufferBase(i.UNIFORM_BUFFER,b,S),S}function d(){for(let _=0;_<a;_++)if(o.indexOf(_)===-1)return o.push(_),_;return Ee("WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function h(_){let b=s[_.id],S=_.uniforms,E=_.__cache;i.bindBuffer(i.UNIFORM_BUFFER,b);for(let w=0,C=S.length;w<C;w++){let y=Array.isArray(S[w])?S[w]:[S[w]];for(let A=0,I=y.length;A<I;A++){let R=y[A];if(p(R,w,A,E)===!0){let O=R.__offset,G=Array.isArray(R.value)?R.value:[R.value],X=0;for(let U=0;U<G.length;U++){let F=G[U],V=v(F);typeof F=="number"||typeof F=="boolean"?(R.__data[0]=F,i.bufferSubData(i.UNIFORM_BUFFER,O+X,R.__data)):F.isMatrix3?(R.__data[0]=F.elements[0],R.__data[1]=F.elements[1],R.__data[2]=F.elements[2],R.__data[3]=0,R.__data[4]=F.elements[3],R.__data[5]=F.elements[4],R.__data[6]=F.elements[5],R.__data[7]=0,R.__data[8]=F.elements[6],R.__data[9]=F.elements[7],R.__data[10]=F.elements[8],R.__data[11]=0):ArrayBuffer.isView(F)?R.__data.set(new F.constructor(F.buffer,F.byteOffset,R.__data.length)):(F.toArray(R.__data,X),X+=V.storage/Float32Array.BYTES_PER_ELEMENT)}i.bufferSubData(i.UNIFORM_BUFFER,O,R.__data)}}}i.bindBuffer(i.UNIFORM_BUFFER,null)}function p(_,b,S,E){let w=_.value,C=b+"_"+S;if(E[C]===void 0)return typeof w=="number"||typeof w=="boolean"?E[C]=w:ArrayBuffer.isView(w)?E[C]=w.slice():E[C]=w.clone(),!0;{let y=E[C];if(typeof w=="number"||typeof w=="boolean"){if(y!==w)return E[C]=w,!0}else{if(ArrayBuffer.isView(w))return!0;if(y.equals(w)===!1)return y.copy(w),!0}}return!1}function g(_){let b=_.uniforms,S=0,E=16;for(let C=0,y=b.length;C<y;C++){let A=Array.isArray(b[C])?b[C]:[b[C]];for(let I=0,R=A.length;I<R;I++){let O=A[I],G=Array.isArray(O.value)?O.value:[O.value];for(let X=0,U=G.length;X<U;X++){let F=G[X],V=v(F),j=S%E,$=j%V.boundary,ae=j+$;S+=$,ae!==0&&E-ae<V.storage&&(S+=E-ae),O.__data=new Float32Array(V.storage/Float32Array.BYTES_PER_ELEMENT),O.__offset=S,S+=V.storage}}}let w=S%E;return w>0&&(S+=E-w),_.__size=S,_.__cache={},this}function v(_){let b={boundary:0,storage:0};return typeof _=="number"||typeof _=="boolean"?(b.boundary=4,b.storage=4):_.isVector2?(b.boundary=8,b.storage=8):_.isVector3||_.isColor?(b.boundary=16,b.storage=12):_.isVector4?(b.boundary=16,b.storage=16):_.isMatrix3?(b.boundary=48,b.storage=48):_.isMatrix4?(b.boundary=64,b.storage=64):_.isTexture?ve("WebGLRenderer: Texture samplers can not be part of an uniforms group."):ArrayBuffer.isView(_)?(b.boundary=16,b.storage=_.byteLength):ve("WebGLRenderer: Unsupported uniform value type.",_),b}function m(_){let b=_.target;b.removeEventListener("dispose",m);let S=o.indexOf(b.__bindingPointIndex);o.splice(S,1),i.deleteBuffer(s[b.id]),delete s[b.id],delete r[b.id]}function f(){for(let _ in s)i.deleteBuffer(s[_]);o=[],s={},r={}}return{bind:c,update:l,dispose:f}}var N3=new Uint16Array([12469,15057,12620,14925,13266,14620,13807,14376,14323,13990,14545,13625,14713,13328,14840,12882,14931,12528,14996,12233,15039,11829,15066,11525,15080,11295,15085,10976,15082,10705,15073,10495,13880,14564,13898,14542,13977,14430,14158,14124,14393,13732,14556,13410,14702,12996,14814,12596,14891,12291,14937,11834,14957,11489,14958,11194,14943,10803,14921,10506,14893,10278,14858,9960,14484,14039,14487,14025,14499,13941,14524,13740,14574,13468,14654,13106,14743,12678,14818,12344,14867,11893,14889,11509,14893,11180,14881,10751,14852,10428,14812,10128,14765,9754,14712,9466,14764,13480,14764,13475,14766,13440,14766,13347,14769,13070,14786,12713,14816,12387,14844,11957,14860,11549,14868,11215,14855,10751,14825,10403,14782,10044,14729,9651,14666,9352,14599,9029,14967,12835,14966,12831,14963,12804,14954,12723,14936,12564,14917,12347,14900,11958,14886,11569,14878,11247,14859,10765,14828,10401,14784,10011,14727,9600,14660,9289,14586,8893,14508,8533,15111,12234,15110,12234,15104,12216,15092,12156,15067,12010,15028,11776,14981,11500,14942,11205,14902,10752,14861,10393,14812,9991,14752,9570,14682,9252,14603,8808,14519,8445,14431,8145,15209,11449,15208,11451,15202,11451,15190,11438,15163,11384,15117,11274,15055,10979,14994,10648,14932,10343,14871,9936,14803,9532,14729,9218,14645,8742,14556,8381,14461,8020,14365,7603,15273,10603,15272,10607,15267,10619,15256,10631,15231,10614,15182,10535,15118,10389,15042,10167,14963,9787,14883,9447,14800,9115,14710,8665,14615,8318,14514,7911,14411,7507,14279,7198,15314,9675,15313,9683,15309,9712,15298,9759,15277,9797,15229,9773,15166,9668,15084,9487,14995,9274,14898,8910,14800,8539,14697,8234,14590,7790,14479,7409,14367,7067,14178,6621,15337,8619,15337,8631,15333,8677,15325,8769,15305,8871,15264,8940,15202,8909,15119,8775,15022,8565,14916,8328,14804,8009,14688,7614,14569,7287,14448,6888,14321,6483,14088,6171,15350,7402,15350,7419,15347,7480,15340,7613,15322,7804,15287,7973,15229,8057,15148,8012,15046,7846,14933,7611,14810,7357,14682,7069,14552,6656,14421,6316,14251,5948,14007,5528,15356,5942,15356,5977,15353,6119,15348,6294,15332,6551,15302,6824,15249,7044,15171,7122,15070,7050,14949,6861,14818,6611,14679,6349,14538,6067,14398,5651,14189,5311,13935,4958,15359,4123,15359,4153,15356,4296,15353,4646,15338,5160,15311,5508,15263,5829,15188,6042,15088,6094,14966,6001,14826,5796,14678,5543,14527,5287,14377,4985,14133,4586,13869,4257,15360,1563,15360,1642,15358,2076,15354,2636,15341,3350,15317,4019,15273,4429,15203,4732,15105,4911,14981,4932,14836,4818,14679,4621,14517,4386,14359,4156,14083,3795,13808,3437,15360,122,15360,137,15358,285,15355,636,15344,1274,15322,2177,15281,2765,15215,3223,15120,3451,14995,3569,14846,3567,14681,3466,14511,3305,14344,3121,14037,2800,13753,2467,15360,0,15360,1,15359,21,15355,89,15346,253,15325,479,15287,796,15225,1148,15133,1492,15008,1749,14856,1882,14685,1886,14506,1783,14324,1608,13996,1398,13702,1183]),Gn=null;function U3(){return Gn===null&&(Gn=new Ti(N3,16,16,Di,Hn),Gn.name="DFG_LUT",Gn.minFilter=gt,Gn.magFilter=gt,Gn.wrapS=gn,Gn.wrapT=gn,Gn.generateMipmaps=!1,Gn.needsUpdate=!0),Gn}var cc=class{constructor(e={}){let{canvas:t=vu(),context:n=null,depth:s=!0,stencil:r=!1,alpha:o=!1,antialias:a=!1,premultipliedAlpha:c=!0,preserveDrawingBuffer:l=!1,powerPreference:u="default",failIfMajorPerformanceCaveat:d=!1,reversedDepthBuffer:h=!1,outputBufferType:p=Wt}=e;this.isWebGLRenderer=!0;let g;if(n!==null){if(typeof WebGLRenderingContext<"u"&&n instanceof WebGLRenderingContext)throw new Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.");g=n.getContextAttributes().alpha}else g=o;let v=p,m=new Set([Aa,wa,Ta]),f=new Set([Wt,Cn,qs,Ys,ba,Sa]),_=new Uint32Array(4),b=new Int32Array(4),S=new L,E=null,w=null,C=[],y=[],A=null;this.domElement=t,this.debug={checkShaderErrors:!0,onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this.toneMapping=Rn,this.toneMappingExposure=1,this.transmissionResolutionScale=1;let I=this,R=!1,O=null;this._outputColorSpace=Pt;let G=0,X=0,U=null,F=-1,V=null,j=new $e,$=new $e,ae=null,ye=new ge(0),we=0,qe=t.width,Qe=t.height,Fe=1,K=null,de=null,ie=new $e(0,0,qe,Qe),Re=new $e(0,0,qe,Qe),Le=!1,Ce=new zs,ft=!1,We=!1,et=new Ue,ut=new L,Ge=new $e,Ct={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0},pt=!1;function nn(){return U===null?Fe:1}let D=n;function It(M,N){return t.getContext(M,N)}try{let M={alpha:!0,depth:s,stencil:r,antialias:a,premultipliedAlpha:c,preserveDrawingBuffer:l,powerPreference:u,failIfMajorPerformanceCaveat:d};if("setAttribute"in t&&t.setAttribute("data-engine",`three.js r${"184"}`),t.addEventListener("webglcontextlost",J,!1),t.addEventListener("webglcontextrestored",Se,!1),t.addEventListener("webglcontextcreationerror",De,!1),D===null){let N="webgl2";if(D=It(N,M),D===null)throw It(N)?new Error("Error creating WebGL context with your selected attributes."):new Error("Error creating WebGL context.")}}catch(M){throw Ee("WebGLRenderer: "+M.message),M}let Xe,at,ce,_t,T,x,B,Y,Q,ee,oe,W,Z,fe,_e,se,te,Pe,Oe,Ze,P,ne,q;function pe(){Xe=new Hm(D),Xe.init(),P=new R3(D,Xe),at=new Nm(D,Xe,e,P),ce=new A3(D,Xe),at.reversedDepthBuffer&&h&&ce.buffers.depth.setReversed(!0),_t=new Xm(D),T=new d3,x=new E3(D,Xe,ce,T,at,P,_t),B=new Vm(I),Y=new Kf(D),ne=new Lm(D,Y),Q=new Gm(D,Y,_t,ne),ee=new Ym(D,Q,Y,ne,_t),Pe=new qm(D,at,x),_e=new Um(T),oe=new u3(I,B,Xe,at,ne,_e),W=new L3(I,T),Z=new p3,fe=new v3(Xe),te=new Pm(I,B,ce,ee,g,c),se=new w3(I,ee,at),q=new D3(D,_t,at,ce),Oe=new Dm(D,Xe,_t),Ze=new Wm(D,Xe,_t),_t.programs=oe.programs,I.capabilities=at,I.extensions=Xe,I.properties=T,I.renderLists=Z,I.shadowMap=se,I.state=ce,I.info=_t}pe(),v!==Wt&&(A=new Km(v,t.width,t.height,s,r));let re=new t0(I,D);this.xr=re,this.getContext=function(){return D},this.getContextAttributes=function(){return D.getContextAttributes()},this.forceContextLoss=function(){let M=Xe.get("WEBGL_lose_context");M&&M.loseContext()},this.forceContextRestore=function(){let M=Xe.get("WEBGL_lose_context");M&&M.restoreContext()},this.getPixelRatio=function(){return Fe},this.setPixelRatio=function(M){M!==void 0&&(Fe=M,this.setSize(qe,Qe,!1))},this.getSize=function(M){return M.set(qe,Qe)},this.setSize=function(M,N,H=!0){if(re.isPresenting){ve("WebGLRenderer: Can't change size while VR device is presenting.");return}qe=M,Qe=N,t.width=Math.floor(M*Fe),t.height=Math.floor(N*Fe),H===!0&&(t.style.width=M+"px",t.style.height=N+"px"),A!==null&&A.setSize(t.width,t.height),this.setViewport(0,0,M,N)},this.getDrawingBufferSize=function(M){return M.set(qe*Fe,Qe*Fe).floor()},this.setDrawingBufferSize=function(M,N,H){qe=M,Qe=N,Fe=H,t.width=Math.floor(M*H),t.height=Math.floor(N*H),this.setViewport(0,0,M,N)},this.setEffects=function(M){if(v===Wt){Ee("THREE.WebGLRenderer: setEffects() requires outputBufferType set to HalfFloatType or FloatType.");return}if(M){for(let N=0;N<M.length;N++)if(M[N].isOutputPass===!0){ve("THREE.WebGLRenderer: OutputPass is not needed in setEffects(). Tone mapping and color space conversion are applied automatically.");break}}A.setEffects(M||[])},this.getCurrentViewport=function(M){return M.copy(j)},this.getViewport=function(M){return M.copy(ie)},this.setViewport=function(M,N,H,k){M.isVector4?ie.set(M.x,M.y,M.z,M.w):ie.set(M,N,H,k),ce.viewport(j.copy(ie).multiplyScalar(Fe).round())},this.getScissor=function(M){return M.copy(Re)},this.setScissor=function(M,N,H,k){M.isVector4?Re.set(M.x,M.y,M.z,M.w):Re.set(M,N,H,k),ce.scissor($.copy(Re).multiplyScalar(Fe).round())},this.getScissorTest=function(){return Le},this.setScissorTest=function(M){ce.setScissorTest(Le=M)},this.setOpaqueSort=function(M){K=M},this.setTransparentSort=function(M){de=M},this.getClearColor=function(M){return M.copy(te.getClearColor())},this.setClearColor=function(){te.setClearColor(...arguments)},this.getClearAlpha=function(){return te.getClearAlpha()},this.setClearAlpha=function(){te.setClearAlpha(...arguments)},this.clear=function(M=!0,N=!0,H=!0){let k=0;if(M){let z=!1;if(U!==null){let ue=U.texture.format;z=m.has(ue)}if(z){let ue=U.texture.type,xe=f.has(ue),he=te.getClearColor(),Me=te.getClearAlpha(),Te=he.r,Ne=he.g,ke=he.b;xe?(_[0]=Te,_[1]=Ne,_[2]=ke,_[3]=Me,D.clearBufferuiv(D.COLOR,0,_)):(b[0]=Te,b[1]=Ne,b[2]=ke,b[3]=Me,D.clearBufferiv(D.COLOR,0,b))}else k|=D.COLOR_BUFFER_BIT}N&&(k|=D.DEPTH_BUFFER_BIT,this.state.buffers.depth.setMask(!0)),H&&(k|=D.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),k!==0&&D.clear(k)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.setNodesHandler=function(M){M.setRenderer(this),O=M},this.dispose=function(){t.removeEventListener("webglcontextlost",J,!1),t.removeEventListener("webglcontextrestored",Se,!1),t.removeEventListener("webglcontextcreationerror",De,!1),te.dispose(),Z.dispose(),fe.dispose(),T.dispose(),B.dispose(),ee.dispose(),ne.dispose(),q.dispose(),oe.dispose(),re.dispose(),re.removeEventListener("sessionstart",$0),re.removeEventListener("sessionend",J0),Oi.stop()};function J(M){M.preventDefault(),gr("WebGLRenderer: Context Lost."),R=!0}function Se(){gr("WebGLRenderer: Context Restored."),R=!1;let M=_t.autoReset,N=se.enabled,H=se.autoUpdate,k=se.needsUpdate,z=se.type;pe(),_t.autoReset=M,se.enabled=N,se.autoUpdate=H,se.needsUpdate=k,se.type=z}function De(M){Ee("WebGLRenderer: A WebGL context could not be created. Reason: ",M.statusMessage)}function vt(M){let N=M.target;N.removeEventListener("dispose",vt),tt(N)}function tt(M){Zn(M),T.remove(M)}function Zn(M){let N=T.get(M).programs;N!==void 0&&(N.forEach(function(H){oe.releaseProgram(H)}),M.isShaderMaterial&&oe.releaseShaderCache(M))}this.renderBufferDirect=function(M,N,H,k,z,ue){N===null&&(N=Ct);let xe=z.isMesh&&z.matrixWorld.determinant()<0,he=Vd(M,N,H,k,z);ce.setMaterial(k,xe);let Me=H.index,Te=1;if(k.wireframe===!0){if(Me=Q.getWireframeAttribute(H),Me===void 0)return;Te=2}let Ne=H.drawRange,ke=H.attributes.position,Ae=Ne.start*Te,nt=(Ne.start+Ne.count)*Te;ue!==null&&(Ae=Math.max(Ae,ue.start*Te),nt=Math.min(nt,(ue.start+ue.count)*Te)),Me!==null?(Ae=Math.max(Ae,0),nt=Math.min(nt,Me.count)):ke!=null&&(Ae=Math.max(Ae,0),nt=Math.min(nt,ke.count));let Mt=nt-Ae;if(Mt<0||Mt===1/0)return;ne.setup(z,k,he,H,Me);let xt,st=Oe;if(Me!==null&&(xt=Y.get(Me),st=Ze,st.setIndex(xt)),z.isMesh)k.wireframe===!0?(ce.setLineWidth(k.wireframeLinewidth*nn()),st.setMode(D.LINES)):st.setMode(D.TRIANGLES);else if(z.isLine){let zt=k.linewidth;zt===void 0&&(zt=1),ce.setLineWidth(zt*nn()),z.isLineSegments?st.setMode(D.LINES):z.isLineLoop?st.setMode(D.LINE_LOOP):st.setMode(D.LINE_STRIP)}else z.isPoints?st.setMode(D.POINTS):z.isSprite&&st.setMode(D.TRIANGLES);if(z.isBatchedMesh)if(Xe.get("WEBGL_multi_draw"))st.renderMultiDraw(z._multiDrawStarts,z._multiDrawCounts,z._multiDrawCount);else{let zt=z._multiDrawStarts,me=z._multiDrawCounts,sn=z._multiDrawCount,Ye=Me?Y.get(Me).bytesPerElement:1,fn=T.get(k).currentProgram.getUniforms();for(let Dn=0;Dn<sn;Dn++)fn.setValue(D,"_gl_DrawID",Dn),st.render(zt[Dn]/Ye,me[Dn])}else if(z.isInstancedMesh)st.renderInstances(Ae,Mt,z.count);else if(H.isInstancedBufferGeometry){let zt=H._maxInstanceCount!==void 0?H._maxInstanceCount:1/0,me=Math.min(H.instanceCount,zt);st.renderInstances(Ae,Mt,me)}else st.render(Ae,Mt)};function Ln(M,N,H){M.transparent===!0&&M.side===en&&M.forceSinglePass===!1?(M.side=kt,M.needsUpdate=!0,lo(M,N,H),M.side=an,M.needsUpdate=!0,lo(M,N,H),M.side=en):lo(M,N,H)}this.compile=function(M,N,H=null){H===null&&(H=M),w=fe.get(H),w.init(N),y.push(w),H.traverseVisible(function(z){z.isLight&&z.layers.test(N.layers)&&(w.pushLight(z),z.castShadow&&w.pushShadow(z))}),M!==H&&M.traverseVisible(function(z){z.isLight&&z.layers.test(N.layers)&&(w.pushLight(z),z.castShadow&&w.pushShadow(z))}),w.setupLights();let k=new Set;return M.traverse(function(z){if(!(z.isMesh||z.isPoints||z.isLine||z.isSprite))return;let ue=z.material;if(ue)if(Array.isArray(ue))for(let xe=0;xe<ue.length;xe++){let he=ue[xe];Ln(he,H,z),k.add(he)}else Ln(ue,H,z),k.add(ue)}),w=y.pop(),k},this.compileAsync=function(M,N,H=null){let k=this.compile(M,N,H);return new Promise(z=>{function ue(){if(k.forEach(function(xe){T.get(xe).currentProgram.isReady()&&k.delete(xe)}),k.size===0){z(M);return}setTimeout(ue,10)}Xe.get("KHR_parallel_shader_compile")!==null?ue():setTimeout(ue,10)})};let Cc=null;function kd(M){Cc&&Cc(M)}function $0(){Oi.stop()}function J0(){Oi.start()}let Oi=new ju;Oi.setAnimationLoop(kd),typeof self<"u"&&Oi.setContext(self),this.setAnimationLoop=function(M){Cc=M,re.setAnimationLoop(M),M===null?Oi.stop():Oi.start()},re.addEventListener("sessionstart",$0),re.addEventListener("sessionend",J0),this.render=function(M,N){if(N!==void 0&&N.isCamera!==!0){Ee("WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(R===!0)return;O!==null&&O.renderStart(M,N);let H=re.enabled===!0&&re.isPresenting===!0,k=A!==null&&(U===null||H)&&A.begin(I,U);if(M.matrixWorldAutoUpdate===!0&&M.updateMatrixWorld(),N.parent===null&&N.matrixWorldAutoUpdate===!0&&N.updateMatrixWorld(),re.enabled===!0&&re.isPresenting===!0&&(A===null||A.isCompositing()===!1)&&(re.cameraAutoUpdate===!0&&re.updateCamera(N),N=re.getCamera()),M.isScene===!0&&M.onBeforeRender(I,M,N,U),w=fe.get(M,y.length),w.init(N),w.state.textureUnits=x.getTextureUnits(),y.push(w),et.multiplyMatrices(N.projectionMatrix,N.matrixWorldInverse),Ce.setFromProjectionMatrix(et,Sn,N.reversedDepth),We=this.localClippingEnabled,ft=_e.init(this.clippingPlanes,We),E=Z.get(M,C.length),E.init(),C.push(E),re.enabled===!0&&re.isPresenting===!0){let xe=I.xr.getDepthSensingMesh();xe!==null&&Ic(xe,N,-1/0,I.sortObjects)}Ic(M,N,0,I.sortObjects),E.finish(),I.sortObjects===!0&&E.sort(K,de),pt=re.enabled===!1||re.isPresenting===!1||re.hasDepthSensing()===!1,pt&&te.addToRenderList(E,M),this.info.render.frame++,ft===!0&&_e.beginShadows();let z=w.state.shadowsArray;if(se.render(z,M,N),ft===!0&&_e.endShadows(),this.info.autoReset===!0&&this.info.reset(),(k&&A.hasRenderPass())===!1){let xe=E.opaque,he=E.transmissive;if(w.setupLights(),N.isArrayCamera){let Me=N.cameras;if(he.length>0)for(let Te=0,Ne=Me.length;Te<Ne;Te++){let ke=Me[Te];eh(xe,he,M,ke)}pt&&te.render(M);for(let Te=0,Ne=Me.length;Te<Ne;Te++){let ke=Me[Te];Q0(E,M,ke,ke.viewport)}}else he.length>0&&eh(xe,he,M,N),pt&&te.render(M),Q0(E,M,N)}U!==null&&X===0&&(x.updateMultisampleRenderTarget(U),x.updateRenderTargetMipmap(U)),k&&A.end(I),M.isScene===!0&&M.onAfterRender(I,M,N),ne.resetDefaultState(),F=-1,V=null,y.pop(),y.length>0?(w=y[y.length-1],x.setTextureUnits(w.state.textureUnits),ft===!0&&_e.setGlobalState(I.clippingPlanes,w.state.camera)):w=null,C.pop(),C.length>0?E=C[C.length-1]:E=null,O!==null&&O.renderEnd()};function Ic(M,N,H,k){if(M.visible===!1)return;if(M.layers.test(N.layers)){if(M.isGroup)H=M.renderOrder;else if(M.isLOD)M.autoUpdate===!0&&M.update(N);else if(M.isLightProbeGrid)w.pushLightProbeGrid(M);else if(M.isLight)w.pushLight(M),M.castShadow&&w.pushShadow(M);else if(M.isSprite){if(!M.frustumCulled||Ce.intersectsSprite(M)){k&&Ge.setFromMatrixPosition(M.matrixWorld).applyMatrix4(et);let xe=ee.update(M),he=M.material;he.visible&&E.push(M,xe,he,H,Ge.z,null)}}else if((M.isMesh||M.isLine||M.isPoints)&&(!M.frustumCulled||Ce.intersectsObject(M))){let xe=ee.update(M),he=M.material;if(k&&(M.boundingSphere!==void 0?(M.boundingSphere===null&&M.computeBoundingSphere(),Ge.copy(M.boundingSphere.center)):(xe.boundingSphere===null&&xe.computeBoundingSphere(),Ge.copy(xe.boundingSphere.center)),Ge.applyMatrix4(M.matrixWorld).applyMatrix4(et)),Array.isArray(he)){let Me=xe.groups;for(let Te=0,Ne=Me.length;Te<Ne;Te++){let ke=Me[Te],Ae=he[ke.materialIndex];Ae&&Ae.visible&&E.push(M,xe,Ae,H,Ge.z,ke)}}else he.visible&&E.push(M,xe,he,H,Ge.z,null)}}let ue=M.children;for(let xe=0,he=ue.length;xe<he;xe++)Ic(ue[xe],N,H,k)}function Q0(M,N,H,k){let{opaque:z,transmissive:ue,transparent:xe}=M;w.setupLightsView(H),ft===!0&&_e.setGlobalState(I.clippingPlanes,H),k&&ce.viewport(j.copy(k)),z.length>0&&co(z,N,H),ue.length>0&&co(ue,N,H),xe.length>0&&co(xe,N,H),ce.buffers.depth.setTest(!0),ce.buffers.depth.setMask(!0),ce.buffers.color.setMask(!0),ce.setPolygonOffset(!1)}function eh(M,N,H,k){if((H.isScene===!0?H.overrideMaterial:null)!==null)return;if(w.state.transmissionRenderTarget[k.id]===void 0){let Ae=Xe.has("EXT_color_buffer_half_float")||Xe.has("EXT_color_buffer_float");w.state.transmissionRenderTarget[k.id]=new cn(1,1,{generateMipmaps:!0,type:Ae?Hn:Wt,minFilter:hn,samples:Math.max(4,at.samples),stencilBuffer:r,resolveDepthBuffer:!1,resolveStencilBuffer:!1,colorSpace:ze.workingColorSpace})}let ue=w.state.transmissionRenderTarget[k.id],xe=k.viewport||j;ue.setSize(xe.z*I.transmissionResolutionScale,xe.w*I.transmissionResolutionScale);let he=I.getRenderTarget(),Me=I.getActiveCubeFace(),Te=I.getActiveMipmapLevel();I.setRenderTarget(ue),I.getClearColor(ye),we=I.getClearAlpha(),we<1&&I.setClearColor(16777215,.5),I.clear(),pt&&te.render(H);let Ne=I.toneMapping;I.toneMapping=Rn;let ke=k.viewport;if(k.viewport!==void 0&&(k.viewport=void 0),w.setupLightsView(k),ft===!0&&_e.setGlobalState(I.clippingPlanes,k),co(M,H,k),x.updateMultisampleRenderTarget(ue),x.updateRenderTargetMipmap(ue),Xe.has("WEBGL_multisampled_render_to_texture")===!1){let Ae=!1;for(let nt=0,Mt=N.length;nt<Mt;nt++){let xt=N[nt],{object:st,geometry:zt,material:me,group:sn}=xt;if(me.side===en&&st.layers.test(k.layers)){let Ye=me.side;me.side=kt,me.needsUpdate=!0,th(st,H,k,zt,me,sn),me.side=Ye,me.needsUpdate=!0,Ae=!0}}Ae===!0&&(x.updateMultisampleRenderTarget(ue),x.updateRenderTargetMipmap(ue))}I.setRenderTarget(he,Me,Te),I.setClearColor(ye,we),ke!==void 0&&(k.viewport=ke),I.toneMapping=Ne}function co(M,N,H){let k=N.isScene===!0?N.overrideMaterial:null;for(let z=0,ue=M.length;z<ue;z++){let xe=M[z],{object:he,geometry:Me,group:Te}=xe,Ne=xe.material;Ne.allowOverride===!0&&k!==null&&(Ne=k),he.layers.test(H.layers)&&th(he,N,H,Me,Ne,Te)}}function th(M,N,H,k,z,ue){M.onBeforeRender(I,N,H,k,z,ue),M.modelViewMatrix.multiplyMatrices(H.matrixWorldInverse,M.matrixWorld),M.normalMatrix.getNormalMatrix(M.modelViewMatrix),z.onBeforeRender(I,N,H,k,M,ue),z.transparent===!0&&z.side===en&&z.forceSinglePass===!1?(z.side=kt,z.needsUpdate=!0,I.renderBufferDirect(H,N,k,z,M,ue),z.side=an,z.needsUpdate=!0,I.renderBufferDirect(H,N,k,z,M,ue),z.side=en):I.renderBufferDirect(H,N,k,z,M,ue),M.onAfterRender(I,N,H,k,z,ue)}function lo(M,N,H){N.isScene!==!0&&(N=Ct);let k=T.get(M),z=w.state.lights,ue=w.state.shadowsArray,xe=z.state.version,he=oe.getParameters(M,z.state,ue,N,H,w.state.lightProbeGridArray),Me=oe.getProgramCacheKey(he),Te=k.programs;k.environment=M.isMeshStandardMaterial||M.isMeshLambertMaterial||M.isMeshPhongMaterial?N.environment:null,k.fog=N.fog;let Ne=M.isMeshStandardMaterial||M.isMeshLambertMaterial&&!M.envMap||M.isMeshPhongMaterial&&!M.envMap;k.envMap=B.get(M.envMap||k.environment,Ne),k.envMapRotation=k.environment!==null&&M.envMap===null?N.environmentRotation:M.envMapRotation,Te===void 0&&(M.addEventListener("dispose",vt),Te=new Map,k.programs=Te);let ke=Te.get(Me);if(ke!==void 0){if(k.currentProgram===ke&&k.lightsStateVersion===xe)return ih(M,he),ke}else he.uniforms=oe.getUniforms(M),O!==null&&M.isNodeMaterial&&O.build(M,H,he),M.onBeforeCompile(he,I),ke=oe.acquireProgram(he,Me),Te.set(Me,ke),k.uniforms=he.uniforms;let Ae=k.uniforms;return(!M.isShaderMaterial&&!M.isRawShaderMaterial||M.clipping===!0)&&(Ae.clippingPlanes=_e.uniform),ih(M,he),k.needsLights=Gd(M),k.lightsStateVersion=xe,k.needsLights&&(Ae.ambientLightColor.value=z.state.ambient,Ae.lightProbe.value=z.state.probe,Ae.directionalLights.value=z.state.directional,Ae.directionalLightShadows.value=z.state.directionalShadow,Ae.spotLights.value=z.state.spot,Ae.spotLightShadows.value=z.state.spotShadow,Ae.rectAreaLights.value=z.state.rectArea,Ae.ltc_1.value=z.state.rectAreaLTC1,Ae.ltc_2.value=z.state.rectAreaLTC2,Ae.pointLights.value=z.state.point,Ae.pointLightShadows.value=z.state.pointShadow,Ae.hemisphereLights.value=z.state.hemi,Ae.directionalShadowMatrix.value=z.state.directionalShadowMatrix,Ae.spotLightMatrix.value=z.state.spotLightMatrix,Ae.spotLightMap.value=z.state.spotLightMap,Ae.pointShadowMatrix.value=z.state.pointShadowMatrix),k.lightProbeGrid=w.state.lightProbeGridArray.length>0,k.currentProgram=ke,k.uniformsList=null,ke}function nh(M){if(M.uniformsList===null){let N=M.currentProgram.getUniforms();M.uniformsList=$s.seqWithValue(N.seq,M.uniforms)}return M.uniformsList}function ih(M,N){let H=T.get(M);H.outputColorSpace=N.outputColorSpace,H.batching=N.batching,H.batchingColor=N.batchingColor,H.instancing=N.instancing,H.instancingColor=N.instancingColor,H.instancingMorph=N.instancingMorph,H.skinning=N.skinning,H.morphTargets=N.morphTargets,H.morphNormals=N.morphNormals,H.morphColors=N.morphColors,H.morphTargetsCount=N.morphTargetsCount,H.numClippingPlanes=N.numClippingPlanes,H.numIntersection=N.numClipIntersection,H.vertexAlphas=N.vertexAlphas,H.vertexTangents=N.vertexTangents,H.toneMapping=N.toneMapping}function zd(M,N){if(M.length===0)return null;if(M.length===1)return M[0].texture!==null?M[0]:null;S.setFromMatrixPosition(N.matrixWorld);for(let H=0,k=M.length;H<k;H++){let z=M[H];if(z.texture!==null&&z.boundingBox.containsPoint(S))return z}return null}function Vd(M,N,H,k,z){N.isScene!==!0&&(N=Ct),x.resetTextureUnits();let ue=N.fog,xe=k.isMeshStandardMaterial||k.isMeshLambertMaterial||k.isMeshPhongMaterial?N.environment:null,he=U===null?I.outputColorSpace:U.isXRRenderTarget===!0?U.texture.colorSpace:ze.workingColorSpace,Me=k.isMeshStandardMaterial||k.isMeshLambertMaterial&&!k.envMap||k.isMeshPhongMaterial&&!k.envMap,Te=B.get(k.envMap||xe,Me),Ne=k.vertexColors===!0&&!!H.attributes.color&&H.attributes.color.itemSize===4,ke=!!H.attributes.tangent&&(!!k.normalMap||k.anisotropy>0),Ae=!!H.morphAttributes.position,nt=!!H.morphAttributes.normal,Mt=!!H.morphAttributes.color,xt=Rn;k.toneMapped&&(U===null||U.isXRRenderTarget===!0)&&(xt=I.toneMapping);let st=H.morphAttributes.position||H.morphAttributes.normal||H.morphAttributes.color,zt=st!==void 0?st.length:0,me=T.get(k),sn=w.state.lights;if(ft===!0&&(We===!0||M!==V)){let ct=M===V&&k.id===F;_e.setState(k,M,ct)}let Ye=!1;k.version===me.__version?(me.needsLights&&me.lightsStateVersion!==sn.state.version||me.outputColorSpace!==he||z.isBatchedMesh&&me.batching===!1||!z.isBatchedMesh&&me.batching===!0||z.isBatchedMesh&&me.batchingColor===!0&&z.colorTexture===null||z.isBatchedMesh&&me.batchingColor===!1&&z.colorTexture!==null||z.isInstancedMesh&&me.instancing===!1||!z.isInstancedMesh&&me.instancing===!0||z.isSkinnedMesh&&me.skinning===!1||!z.isSkinnedMesh&&me.skinning===!0||z.isInstancedMesh&&me.instancingColor===!0&&z.instanceColor===null||z.isInstancedMesh&&me.instancingColor===!1&&z.instanceColor!==null||z.isInstancedMesh&&me.instancingMorph===!0&&z.morphTexture===null||z.isInstancedMesh&&me.instancingMorph===!1&&z.morphTexture!==null||me.envMap!==Te||k.fog===!0&&me.fog!==ue||me.numClippingPlanes!==void 0&&(me.numClippingPlanes!==_e.numPlanes||me.numIntersection!==_e.numIntersection)||me.vertexAlphas!==Ne||me.vertexTangents!==ke||me.morphTargets!==Ae||me.morphNormals!==nt||me.morphColors!==Mt||me.toneMapping!==xt||me.morphTargetsCount!==zt||!!me.lightProbeGrid!=w.state.lightProbeGridArray.length>0)&&(Ye=!0):(Ye=!0,me.__version=k.version);let fn=me.currentProgram;Ye===!0&&(fn=lo(k,N,z),O&&k.isNodeMaterial&&O.onUpdateProgram(k,fn,me));let Dn=!1,di=!1,ps=!1,rt=fn.getUniforms(),bt=me.uniforms;if(ce.useProgram(fn.program)&&(Dn=!0,di=!0,ps=!0),k.id!==F&&(F=k.id,di=!0),me.needsLights){let ct=zd(w.state.lightProbeGridArray,z);me.lightProbeGrid!==ct&&(me.lightProbeGrid=ct,di=!0)}if(Dn||V!==M){ce.buffers.depth.getReversed()&&M.reversedDepth!==!0&&(M._reversedDepth=!0,M.updateProjectionMatrix()),rt.setValue(D,"projectionMatrix",M.projectionMatrix),rt.setValue(D,"viewMatrix",M.matrixWorldInverse);let pi=rt.map.cameraPosition;pi!==void 0&&pi.setValue(D,ut.setFromMatrixPosition(M.matrixWorld)),at.logarithmicDepthBuffer&&rt.setValue(D,"logDepthBufFC",2/(Math.log(M.far+1)/Math.LN2)),(k.isMeshPhongMaterial||k.isMeshToonMaterial||k.isMeshLambertMaterial||k.isMeshBasicMaterial||k.isMeshStandardMaterial||k.isShaderMaterial)&&rt.setValue(D,"isOrthographic",M.isOrthographicCamera===!0),V!==M&&(V=M,di=!0,ps=!0)}if(me.needsLights&&(sn.state.directionalShadowMap.length>0&&rt.setValue(D,"directionalShadowMap",sn.state.directionalShadowMap,x),sn.state.spotShadowMap.length>0&&rt.setValue(D,"spotShadowMap",sn.state.spotShadowMap,x),sn.state.pointShadowMap.length>0&&rt.setValue(D,"pointShadowMap",sn.state.pointShadowMap,x)),z.isSkinnedMesh){rt.setOptional(D,z,"bindMatrix"),rt.setOptional(D,z,"bindMatrixInverse");let ct=z.skeleton;ct&&(ct.boneTexture===null&&ct.computeBoneTexture(),rt.setValue(D,"boneTexture",ct.boneTexture,x))}z.isBatchedMesh&&(rt.setOptional(D,z,"batchingTexture"),rt.setValue(D,"batchingTexture",z._matricesTexture,x),rt.setOptional(D,z,"batchingIdTexture"),rt.setValue(D,"batchingIdTexture",z._indirectTexture,x),rt.setOptional(D,z,"batchingColorTexture"),z._colorsTexture!==null&&rt.setValue(D,"batchingColorTexture",z._colorsTexture,x));let fi=H.morphAttributes;if((fi.position!==void 0||fi.normal!==void 0||fi.color!==void 0)&&Pe.update(z,H,fn),(di||me.receiveShadow!==z.receiveShadow)&&(me.receiveShadow=z.receiveShadow,rt.setValue(D,"receiveShadow",z.receiveShadow)),(k.isMeshStandardMaterial||k.isMeshLambertMaterial||k.isMeshPhongMaterial)&&k.envMap===null&&N.environment!==null&&(bt.envMapIntensity.value=N.environmentIntensity),bt.dfgLUT!==void 0&&(bt.dfgLUT.value=U3()),di){if(rt.setValue(D,"toneMappingExposure",I.toneMappingExposure),me.needsLights&&Hd(bt,ps),ue&&k.fog===!0&&W.refreshFogUniforms(bt,ue),W.refreshMaterialUniforms(bt,k,Fe,Qe,w.state.transmissionRenderTarget[M.id]),me.needsLights&&me.lightProbeGrid){let ct=me.lightProbeGrid;bt.probesSH.value=ct.texture,bt.probesMin.value.copy(ct.boundingBox.min),bt.probesMax.value.copy(ct.boundingBox.max),bt.probesResolution.value.copy(ct.resolution)}$s.upload(D,nh(me),bt,x)}if(k.isShaderMaterial&&k.uniformsNeedUpdate===!0&&($s.upload(D,nh(me),bt,x),k.uniformsNeedUpdate=!1),k.isSpriteMaterial&&rt.setValue(D,"center",z.center),rt.setValue(D,"modelViewMatrix",z.modelViewMatrix),rt.setValue(D,"normalMatrix",z.normalMatrix),rt.setValue(D,"modelMatrix",z.matrixWorld),k.uniformsGroups!==void 0){let ct=k.uniformsGroups;for(let pi=0,ms=ct.length;pi<ms;pi++){let sh=ct[pi];q.update(sh,fn),q.bind(sh,fn)}}return fn}function Hd(M,N){M.ambientLightColor.needsUpdate=N,M.lightProbe.needsUpdate=N,M.directionalLights.needsUpdate=N,M.directionalLightShadows.needsUpdate=N,M.pointLights.needsUpdate=N,M.pointLightShadows.needsUpdate=N,M.spotLights.needsUpdate=N,M.spotLightShadows.needsUpdate=N,M.rectAreaLights.needsUpdate=N,M.hemisphereLights.needsUpdate=N}function Gd(M){return M.isMeshLambertMaterial||M.isMeshToonMaterial||M.isMeshPhongMaterial||M.isMeshStandardMaterial||M.isShadowMaterial||M.isShaderMaterial&&M.lights===!0}this.getActiveCubeFace=function(){return G},this.getActiveMipmapLevel=function(){return X},this.getRenderTarget=function(){return U},this.setRenderTargetTextures=function(M,N,H){let k=T.get(M);k.__autoAllocateDepthBuffer=M.resolveDepthBuffer===!1,k.__autoAllocateDepthBuffer===!1&&(k.__useRenderToTexture=!1),T.get(M.texture).__webglTexture=N,T.get(M.depthTexture).__webglTexture=k.__autoAllocateDepthBuffer?void 0:H,k.__hasExternalTextures=!0},this.setRenderTargetFramebuffer=function(M,N){let H=T.get(M);H.__webglFramebuffer=N,H.__useDefaultFramebuffer=N===void 0};let Wd=D.createFramebuffer();this.setRenderTarget=function(M,N=0,H=0){U=M,G=N,X=H;let k=null,z=!1,ue=!1;if(M){let he=T.get(M);if(he.__useDefaultFramebuffer!==void 0){ce.bindFramebuffer(D.FRAMEBUFFER,he.__webglFramebuffer),j.copy(M.viewport),$.copy(M.scissor),ae=M.scissorTest,ce.viewport(j),ce.scissor($),ce.setScissorTest(ae),F=-1;return}else if(he.__webglFramebuffer===void 0)x.setupRenderTarget(M);else if(he.__hasExternalTextures)x.rebindTextures(M,T.get(M.texture).__webglTexture,T.get(M.depthTexture).__webglTexture);else if(M.depthBuffer){let Ne=M.depthTexture;if(he.__boundDepthTexture!==Ne){if(Ne!==null&&T.has(Ne)&&(M.width!==Ne.image.width||M.height!==Ne.image.height))throw new Error("WebGLRenderTarget: Attached DepthTexture is initialized to the incorrect size.");x.setupDepthRenderbuffer(M)}}let Me=M.texture;(Me.isData3DTexture||Me.isDataArrayTexture||Me.isCompressedArrayTexture)&&(ue=!0);let Te=T.get(M).__webglFramebuffer;M.isWebGLCubeRenderTarget?(Array.isArray(Te[N])?k=Te[N][H]:k=Te[N],z=!0):M.samples>0&&x.useMultisampledRTT(M)===!1?k=T.get(M).__webglMultisampledFramebuffer:Array.isArray(Te)?k=Te[H]:k=Te,j.copy(M.viewport),$.copy(M.scissor),ae=M.scissorTest}else j.copy(ie).multiplyScalar(Fe).floor(),$.copy(Re).multiplyScalar(Fe).floor(),ae=Le;if(H!==0&&(k=Wd),ce.bindFramebuffer(D.FRAMEBUFFER,k)&&ce.drawBuffers(M,k),ce.viewport(j),ce.scissor($),ce.setScissorTest(ae),z){let he=T.get(M.texture);D.framebufferTexture2D(D.FRAMEBUFFER,D.COLOR_ATTACHMENT0,D.TEXTURE_CUBE_MAP_POSITIVE_X+N,he.__webglTexture,H)}else if(ue){let he=N;for(let Me=0;Me<M.textures.length;Me++){let Te=T.get(M.textures[Me]);D.framebufferTextureLayer(D.FRAMEBUFFER,D.COLOR_ATTACHMENT0+Me,Te.__webglTexture,H,he)}}else if(M!==null&&H!==0){let he=T.get(M.texture);D.framebufferTexture2D(D.FRAMEBUFFER,D.COLOR_ATTACHMENT0,D.TEXTURE_2D,he.__webglTexture,H)}F=-1},this.readRenderTargetPixels=function(M,N,H,k,z,ue,xe,he=0){if(!(M&&M.isWebGLRenderTarget)){Ee("WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let Me=T.get(M).__webglFramebuffer;if(M.isWebGLCubeRenderTarget&&xe!==void 0&&(Me=Me[xe]),Me){ce.bindFramebuffer(D.FRAMEBUFFER,Me);try{let Te=M.textures[he],Ne=Te.format,ke=Te.type;if(M.textures.length>1&&D.readBuffer(D.COLOR_ATTACHMENT0+he),!at.textureFormatReadable(Ne)){Ee("WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}if(!at.textureTypeReadable(ke)){Ee("WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}N>=0&&N<=M.width-k&&H>=0&&H<=M.height-z&&D.readPixels(N,H,k,z,P.convert(Ne),P.convert(ke),ue)}finally{let Te=U!==null?T.get(U).__webglFramebuffer:null;ce.bindFramebuffer(D.FRAMEBUFFER,Te)}}},this.readRenderTargetPixelsAsync=async function(M,N,H,k,z,ue,xe,he=0){if(!(M&&M.isWebGLRenderTarget))throw new Error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");let Me=T.get(M).__webglFramebuffer;if(M.isWebGLCubeRenderTarget&&xe!==void 0&&(Me=Me[xe]),Me)if(N>=0&&N<=M.width-k&&H>=0&&H<=M.height-z){ce.bindFramebuffer(D.FRAMEBUFFER,Me);let Te=M.textures[he],Ne=Te.format,ke=Te.type;if(M.textures.length>1&&D.readBuffer(D.COLOR_ATTACHMENT0+he),!at.textureFormatReadable(Ne))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.");if(!at.textureTypeReadable(ke))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.");let Ae=D.createBuffer();D.bindBuffer(D.PIXEL_PACK_BUFFER,Ae),D.bufferData(D.PIXEL_PACK_BUFFER,ue.byteLength,D.STREAM_READ),D.readPixels(N,H,k,z,P.convert(Ne),P.convert(ke),0);let nt=U!==null?T.get(U).__webglFramebuffer:null;ce.bindFramebuffer(D.FRAMEBUFFER,nt);let Mt=D.fenceSync(D.SYNC_GPU_COMMANDS_COMPLETE,0);return D.flush(),await bu(D,Mt,4),D.bindBuffer(D.PIXEL_PACK_BUFFER,Ae),D.getBufferSubData(D.PIXEL_PACK_BUFFER,0,ue),D.deleteBuffer(Ae),D.deleteSync(Mt),ue}else throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.")},this.copyFramebufferToTexture=function(M,N=null,H=0){let k=Math.pow(2,-H),z=Math.floor(M.image.width*k),ue=Math.floor(M.image.height*k),xe=N!==null?N.x:0,he=N!==null?N.y:0;x.setTexture2D(M,0),D.copyTexSubImage2D(D.TEXTURE_2D,H,0,0,xe,he,z,ue),ce.unbindTexture()};let Xd=D.createFramebuffer(),qd=D.createFramebuffer();this.copyTextureToTexture=function(M,N,H=null,k=null,z=0,ue=0){let xe,he,Me,Te,Ne,ke,Ae,nt,Mt,xt=M.isCompressedTexture?M.mipmaps[ue]:M.image;if(H!==null)xe=H.max.x-H.min.x,he=H.max.y-H.min.y,Me=H.isBox3?H.max.z-H.min.z:1,Te=H.min.x,Ne=H.min.y,ke=H.isBox3?H.min.z:0;else{let bt=Math.pow(2,-z);xe=Math.floor(xt.width*bt),he=Math.floor(xt.height*bt),M.isDataArrayTexture?Me=xt.depth:M.isData3DTexture?Me=Math.floor(xt.depth*bt):Me=1,Te=0,Ne=0,ke=0}k!==null?(Ae=k.x,nt=k.y,Mt=k.z):(Ae=0,nt=0,Mt=0);let st=P.convert(N.format),zt=P.convert(N.type),me;N.isData3DTexture?(x.setTexture3D(N,0),me=D.TEXTURE_3D):N.isDataArrayTexture||N.isCompressedArrayTexture?(x.setTexture2DArray(N,0),me=D.TEXTURE_2D_ARRAY):(x.setTexture2D(N,0),me=D.TEXTURE_2D),ce.activeTexture(D.TEXTURE0),ce.pixelStorei(D.UNPACK_FLIP_Y_WEBGL,N.flipY),ce.pixelStorei(D.UNPACK_PREMULTIPLY_ALPHA_WEBGL,N.premultiplyAlpha),ce.pixelStorei(D.UNPACK_ALIGNMENT,N.unpackAlignment);let sn=ce.getParameter(D.UNPACK_ROW_LENGTH),Ye=ce.getParameter(D.UNPACK_IMAGE_HEIGHT),fn=ce.getParameter(D.UNPACK_SKIP_PIXELS),Dn=ce.getParameter(D.UNPACK_SKIP_ROWS),di=ce.getParameter(D.UNPACK_SKIP_IMAGES);ce.pixelStorei(D.UNPACK_ROW_LENGTH,xt.width),ce.pixelStorei(D.UNPACK_IMAGE_HEIGHT,xt.height),ce.pixelStorei(D.UNPACK_SKIP_PIXELS,Te),ce.pixelStorei(D.UNPACK_SKIP_ROWS,Ne),ce.pixelStorei(D.UNPACK_SKIP_IMAGES,ke);let ps=M.isDataArrayTexture||M.isData3DTexture,rt=N.isDataArrayTexture||N.isData3DTexture;if(M.isDepthTexture){let bt=T.get(M),fi=T.get(N),ct=T.get(bt.__renderTarget),pi=T.get(fi.__renderTarget);ce.bindFramebuffer(D.READ_FRAMEBUFFER,ct.__webglFramebuffer),ce.bindFramebuffer(D.DRAW_FRAMEBUFFER,pi.__webglFramebuffer);for(let ms=0;ms<Me;ms++)ps&&(D.framebufferTextureLayer(D.READ_FRAMEBUFFER,D.COLOR_ATTACHMENT0,T.get(M).__webglTexture,z,ke+ms),D.framebufferTextureLayer(D.DRAW_FRAMEBUFFER,D.COLOR_ATTACHMENT0,T.get(N).__webglTexture,ue,Mt+ms)),D.blitFramebuffer(Te,Ne,xe,he,Ae,nt,xe,he,D.DEPTH_BUFFER_BIT,D.NEAREST);ce.bindFramebuffer(D.READ_FRAMEBUFFER,null),ce.bindFramebuffer(D.DRAW_FRAMEBUFFER,null)}else if(z!==0||M.isRenderTargetTexture||T.has(M)){let bt=T.get(M),fi=T.get(N);ce.bindFramebuffer(D.READ_FRAMEBUFFER,Xd),ce.bindFramebuffer(D.DRAW_FRAMEBUFFER,qd);for(let ct=0;ct<Me;ct++)ps?D.framebufferTextureLayer(D.READ_FRAMEBUFFER,D.COLOR_ATTACHMENT0,bt.__webglTexture,z,ke+ct):D.framebufferTexture2D(D.READ_FRAMEBUFFER,D.COLOR_ATTACHMENT0,D.TEXTURE_2D,bt.__webglTexture,z),rt?D.framebufferTextureLayer(D.DRAW_FRAMEBUFFER,D.COLOR_ATTACHMENT0,fi.__webglTexture,ue,Mt+ct):D.framebufferTexture2D(D.DRAW_FRAMEBUFFER,D.COLOR_ATTACHMENT0,D.TEXTURE_2D,fi.__webglTexture,ue),z!==0?D.blitFramebuffer(Te,Ne,xe,he,Ae,nt,xe,he,D.COLOR_BUFFER_BIT,D.NEAREST):rt?D.copyTexSubImage3D(me,ue,Ae,nt,Mt+ct,Te,Ne,xe,he):D.copyTexSubImage2D(me,ue,Ae,nt,Te,Ne,xe,he);ce.bindFramebuffer(D.READ_FRAMEBUFFER,null),ce.bindFramebuffer(D.DRAW_FRAMEBUFFER,null)}else rt?M.isDataTexture||M.isData3DTexture?D.texSubImage3D(me,ue,Ae,nt,Mt,xe,he,Me,st,zt,xt.data):N.isCompressedArrayTexture?D.compressedTexSubImage3D(me,ue,Ae,nt,Mt,xe,he,Me,st,xt.data):D.texSubImage3D(me,ue,Ae,nt,Mt,xe,he,Me,st,zt,xt):M.isDataTexture?D.texSubImage2D(D.TEXTURE_2D,ue,Ae,nt,xe,he,st,zt,xt.data):M.isCompressedTexture?D.compressedTexSubImage2D(D.TEXTURE_2D,ue,Ae,nt,xt.width,xt.height,st,xt.data):D.texSubImage2D(D.TEXTURE_2D,ue,Ae,nt,xe,he,st,zt,xt);ce.pixelStorei(D.UNPACK_ROW_LENGTH,sn),ce.pixelStorei(D.UNPACK_IMAGE_HEIGHT,Ye),ce.pixelStorei(D.UNPACK_SKIP_PIXELS,fn),ce.pixelStorei(D.UNPACK_SKIP_ROWS,Dn),ce.pixelStorei(D.UNPACK_SKIP_IMAGES,di),ue===0&&N.generateMipmaps&&D.generateMipmap(me),ce.unbindTexture()},this.initRenderTarget=function(M){T.get(M).__webglFramebuffer===void 0&&x.setupRenderTarget(M)},this.initTexture=function(M){M.isCubeTexture?x.setTextureCube(M,0):M.isData3DTexture?x.setTexture3D(M,0):M.isDataArrayTexture||M.isCompressedArrayTexture?x.setTexture2DArray(M,0):x.setTexture2D(M,0),ce.unbindTexture()},this.resetState=function(){G=0,X=0,U=null,ce.reset(),ne.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return Sn}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(e){this._outputColorSpace=e;let t=this.getContext();t.drawingBufferColorSpace=ze._getDrawingBufferColorSpace(e),t.unpackColorSpace=ze._getUnpackColorSpace()}};var uc=`
  float mapHash(vec2 p){return fract(sin(dot(p,vec2(127.1,311.7)))*43758.5453);}
  float mapNoise(vec2 p){vec2 i=floor(p),f=fract(p);f=f*f*(3.-2.*f);return mix(mix(mapHash(i),mapHash(i+vec2(1.,0.)),f.x),mix(mapHash(i+vec2(0.,1.)),mapHash(i+vec2(1.,1.)),f.x),f.y);}
  vec3 mapRelief(vec3 n,vec3 p,float height){vec3 px=dFdx(p),py=dFdy(p),a=cross(py,n),b=cross(n,px);float det=dot(px,a);return normalize(abs(det)*n-sign(det)*(dFdx(height)*a+dFdy(height)*b));}
`;var id=new Set,F3=null;function eo(i=1,e="#d4c4a0"){let t=new Bt({vertexColors:!0,roughness:.94}),n={value:null};return id.add(n),t.addEventListener("dispose",()=>id.delete(n)),n.value=F3,t.onBeforeCompile=s=>{s.uniforms.uSeabedDetail=n,s.uniforms.uTerrainScale={value:i},s.uniforms.uGroundSand={value:new ge(e)},s.vertexShader=`varying vec3 vGround;uniform float uTerrainScale;
`+s.vertexShader.replace("#include <begin_vertex>",`#include <begin_vertex>
vGround=(modelMatrix*vec4(position,1.)).xyz*uTerrainScale;`),s.fragmentShader=`varying vec3 vGround;uniform sampler2D uSeabedDetail;uniform vec3 uGroundSand;
`+uc+s.fragmentShader.replace("#include <color_fragment>",`#include <color_fragment>
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
    `)},t.userData.terrain=!0,t.userData.sandColor=e,t.customProgramCacheKey=()=>"threetopia-ground-v3",t}var sd={value:0},i0=i=>{sd.value=i};function n0(i,e,t){return["leaves","engine"].includes(e)&&(i.onBeforeCompile=n=>{n.uniforms.uHostTime=sd,n.uniforms.uHostScale={value:t},n.vertexShader=`uniform float uHostTime;uniform float uHostScale;
`+n.vertexShader.replace("#include <begin_vertex>",`#include <begin_vertex>
   vec3 hp=position*uHostScale;
   ${e==="leaves"?"transformed.x+=sin(uHostTime*1.15+hp.z*.67)*smoothstep(.45,2.9,hp.y)*.018/uHostScale;transformed.z+=cos(uHostTime*.81+hp.x*.5)*smoothstep(.5,3.1,hp.y)*.012/uHostScale;":"transformed.y+=sin(uHostTime*1.7+hp.y*3.2+hp.x*.3)*.055/uHostScale;"}
  `)},i.customProgramCacheKey=()=>`host-motion-1-${e}`),i}function s0(i,e=1){return i==="leaves"?n0(new Qi({depthPacking:Nl}),i,e):void 0}function r0(i,e=1,t="#d4c4a0"){if(i==="terrain")return eo(e,t);let n=new Bt({vertexColors:!0,roughness:i==="metal"?.64:.91,metalness:i==="metal"?.28:0,side:i==="leaves"?en:an,flatShading:i==="stone"});return n.userData.hostSurface={kind:i,scale:e,sand:t},i==="neon"||i==="engine"?(n.emissive.set("#0e95cb"),n.emissiveIntensity=1.7,n.toneMapped=!1,n0(n,i,e)):i==="leaves"||i==="flowers"?n0(n,i,e):(n.onBeforeCompile=s=>{s.uniforms.uHostScale={value:e},s.vertexShader=`varying vec3 vHostPoint;uniform float uHostScale;
`+s.vertexShader.replace("#include <begin_vertex>",`#include <begin_vertex>
vHostPoint=position*uHostScale;`),s.fragmentShader=`varying vec3 vHostPoint;
`+uc+s.fragmentShader;let r="float fleck=mapNoise(vHostPoint.xz*26.);diffuseColor.rgb*=.93+fleck*.12;";i==="stone"&&(r+="float strata=mapNoise(vec2(vHostPoint.x*.55+vHostPoint.z*.31,vHostPoint.y*8.));diffuseColor.rgb*=.87+strata*.23;"),i==="paving"&&(r+="vec2 p=vHostPoint.xz*3.0;vec2 f=fract(p);vec2 aa=max(fwidth(p),vec2(.006));vec2 seam=smoothstep(vec2(.015),vec2(.015)+aa,min(f,1.-f));diffuseColor.rgb*=.86+.14*min(seam.x,seam.y);"),i==="wood"&&(r+="float grain=mapNoise(vec2(vHostPoint.x*5.,vHostPoint.z*45.));diffuseColor.rgb*=.86+.26*grain;"),i==="metal"&&(r+="vec2 p=vHostPoint.xz*1.65;vec2 f=fract(p);vec2 aa=max(fwidth(p),vec2(.003));vec2 seam=smoothstep(vec2(.008),vec2(.008)+aa,min(f,1.-f));diffuseColor.rgb*=.80+.20*min(seam.x,seam.y);"),s.fragmentShader=s.fragmentShader.replace("#include <color_fragment>",`#include <color_fragment>
`+r)},n.customProgramCacheKey=()=>`host-kit-1-${i}`,n)}var dc=class{constructor(e){this.worker=e;e.onmessage=({data:t})=>{let n=this.active;!n||t.id!==n.id||(this.active=void 0,t.error?n.reject(new Error(t.error)):n.resolve(t.result),this.startQueued())},e.onerror=t=>{t.preventDefault(),this.failure=new Error(t.message||"Tile preparation failed."),this.active?.reject(this.failure),this.queued?.reject(this.failure),this.active=this.queued=void 0,e.terminate()}}worker;sequence=0;active;queued;disposed=!1;failure;startQueued(){this.active||!this.queued||this.disposed||(this.active=this.queued,this.queued=void 0,this.worker.postMessage({id:this.active.id,input:this.active.input}))}run(e){return this.disposed?Promise.resolve(null):this.failure?Promise.reject(this.failure):(this.cancel(),new Promise((t,n)=>{this.queued={id:++this.sequence,input:e,resolve:t,reject:n},this.startQueued()}))}cancel(){this.active?.resolve(null),this.queued?.resolve(null),this.queued=void 0}dispose(){this.disposed=!0,this.cancel(),this.worker.terminate(),this.active=void 0}};var fc={edges:{"259.808,-150.000|259.808,150.000":[-38.574035820085825,-36.87525797733441,-32.05070804015839,-27.33601681991266,-22.646368812487104,-16.758270502393145,-9.22351936451508,.4405877075135697,9.343606431944156,16.39513142189196,21.633014287290624,23.91769116795614,23.9427399266102,23.51168644824598,22.761245261289236,22.161295476315246,20.829316483107146,19.163916777125383,16.22237103493293,12.361160697131861,7.4611313534073656,1.9032226181713223,-4.0790483856121424,-11.175680022441686,-16.853615696564006],"0.000,300.000|259.808,150.000":[-45.576167434219116,-41.29791460751111,-37.962403287359635,-35.13630791919802,-32.39045891317491,-29.409872257620922,-26.066207590185897,-22.45472729369619,-18.921403234052885,-15.929337774088026,-13.868819120968942,-11.97456355689539,-9.468100916987451,-6.950955649951082,-4.8540996935105465,-3.5657207950784198,-3.432518207307389,-4.381892162259801,-6.694510740274792,-10.583201213673732,-14.757449604913475,-19.305226775093175,-24.764280547562894,-28.058020072737005,-16.853615696564006],"-259.808,150.000|0.000,300.000":[-36.08492383172995,-29.66986957245451,-23.103923035347762,-16.852388236335734,-11.110236316135355,-4.8542011610292,.2701092273652487,4.295549885866379,6.750259176963111,8.112991407268666,9.383202520969114,10.39957261898857,10.607166617715613,9.589193436474908,6.870084792771003,2.803573222180411,-3.71787358999575,-11.661139783882687,-17.444462883174815,-23.099129920030435,-28.25515729506396,-32.79469716720609,-36.926318672439315,-41.042131402368774,-45.576167434219116],"-259.808,-150.000|-259.808,150.000":[-42.99174944811064,-53.568142022564246,-48.4885318777866,-43.559657369817316,-38.9942204267399,-35.00930021220974,-31.624553631354146,-28.84707970345204,-26.66689431147713,-25.053469716368326,-23.95875787471257,-23.34255012685477,-23.151213472859133,-22.307567741045514,-20.166423582614062,-17.299835913644895,-14.329330925517189,-11.763127217821179,-9.614766920585065,-9.495144941866823,-12.235351213454967,-16.895600151231232,-22.69419830052956,-29.13823912526521,-36.08492383172995],"-0.000,-300.000|-259.808,-150.000":[-28.626291310167556,-27.74657286543049,-19.99080495896338,-12.57091200113809,-4.037995580725292,2.593563445477365,7.07764182943856,9.70364746363052,11.928034406824572,13.334217305629892,-2.079720708868453,-19.872916048634497,-20.16817037838384,-20.00402751672805,-19.343595840191046,-18.80498694518759,-18.87562708319012,-19.233253757178304,-19.798255763360533,-20.378065063897093,-20.977369746972368,-24.27167533469573,-31.02203825039715,-38.13266256470129,-42.99174944811064],"-0.000,-300.000|259.808,-150.000":[-28.626291310167556,-21.41656030838893,-14.750561151126895,-8.039610206548769,-2.01252744399613,2.1011648730146013,4.290991987384629,4.598734031973706,2.9384615739374453,1.411224498013297,.8223766533858405,.15689725500642737,-.42411671778050203,-1.2985966415073473,-2.6801107116839993,-4.82379983517068,-7.786369597384517,-11.226381385607453,-14.141505745469967,-17.401851173159066,-20.883502609652698,-24.396861107004085,-28.331872428902887,-33.00370941620455,-38.574035820085825],"779.423,-150.000|779.423,150.000":[-43.204219016807066,-43.29372759786061,-43.33333333333336,-43.33333333333336,-43.33333333333336,-43.33333333333336,-43.33333333333336,-43.33333333333336,-43.33333333333336,-43.33333333333336,-43.33333333333336,-43.33333333333336,-43.33333333333336,-43.33333333333336,-43.33333333333336,-43.33333333333336,-43.33333333333336,-43.33333333333336,-43.33333333333336,-43.33333333333336,-43.33333333333336,-43.33333333333336,-43.33333333333336,-43.24558681409497,-42.88491710743111],"519.615,300.000|779.423,150.000":[-43.333398955737756,-43.33333333333336,-43.33333333333336,-43.33333333333336,-43.33333333333336,-43.33333333333336,-43.33333333333336,-43.33333333333336,-43.33333333333336,-43.33333333333336,-43.33333333333336,-43.33333333333336,-43.33333333333336,-43.33333333333336,-43.33333333333336,-43.33333333333336,-43.33333333333336,-43.33333333333336,-43.33333333333336,-43.33333333333336,-43.33333333333336,-43.33333333333336,-43.33333333333336,-43.29902400807709,-42.88491710743111],"259.808,150.000|519.615,300.000":[-16.853615696564006,-11.95897508049549,-7.402668062657429,-6.422945694501436,-8.510889112103115,-13.273976726041425,-20.093668273087378,-28.37018058501831,-36.22155784117822,-41.65790893028998,-43.33333333333336,-43.33333333333336,-43.33333333333336,-43.33333333333336,-43.33333333333336,-43.33333333333336,-43.33333333333336,-43.33333333333336,-43.33333333333336,-43.33333333333336,-43.33333333333336,-43.33333333333336,-43.33333333333336,-43.33333333333336,-43.333398955737756],"259.808,-150.000|519.615,-300.000":[-38.574035820085825,-31.22091375642177,-24.2914665370049,-19.409749230619454,-16.697409776126726,-15.626103285774267,-15.662136081761169,-15.294856090407787,-13.662488207943529,-10.656356187693147,-7.027507111536539,-4.026895995991827,-.342150860359484,3.643719358311278,7.80542775774998,12.733560762420975,16.492782777606745,17.630053041084835,16.092020521845996,13.330584593988348,10.282196035780208,7.903017158979017,5.2305537210690645,1.3179982450135224,-3.7443605064389374],"519.615,-300.000|779.423,-150.000":[-3.7443605064389374,-2.477364818947218,2.113607016897194,6.133018453705219,10.087662088767443,14.105447016599134,17.917337991905434,20.421322302977174,21.36617957550081,21.996561048198636,21.230271658784616,19.38051198500137,15.634784111092811,9.8680861397409,.506502989043689,-10.16385160724802,-20.278857512054554,-28.718585167263083,-34.566601573484235,-38.29819232041748,-40.83798103081484,-42.51248892807193,-43.272736132206546,-43.31951584316792,-43.204219016807066],"0.000,-300.000|0.000,-600.000":[-28.626291310167556,-23.626887323364976,-16.701103621534646,16.30302049090986,25.33333333333333,25.33333333333333,25.33333333333333,25.33333333333333,25.33333333333333,25.845369975381338,27.535907251189983,26.7739205335016,26.18819036899621,25.68930617804674,21.806520742800295,16.234600493915607,10.932204295974834,5.791359331014867,.9978246200675519,-4.593850794239707,-11.746553343758492,-18.360497136647602,-25.803979738955363,-33.539144191181336,-41.22068171004791],"-259.808,-150.000|0.000,-300.000":[-42.99174944811064,-38.13266256470129,-31.022038250397088,-24.27167533469573,-20.977369746972368,-20.378065063897093,-19.798255763360533,-19.233253757178304,-18.87562708319012,-18.80498694518759,-19.343595840191046,-20.00402751672805,-20.16817037838384,-19.872916048634497,-2.0797207088683933,13.334217305629892,11.928034406824514,9.70364746363052,7.07764182943856,2.5935634454772467,-4.03799558072541,-12.57091200113815,-19.990804958963437,-27.746572865430608,-28.626291310167556],"-259.808,-150.000|-519.615,-300.000":[-42.99174944811064,-36.5564955238004,-30.58864680743264,-25.25469059382027,-20.59694266339,-16.758165505450034,-13.428954306206661,-9.6873659035154,-5.298569517624507,-1.1317292060680255,2.5700659833518698,6.3735643832096995,10.631692966102513,14.12885831706768,15.499093789871962,14.951191416852202,12.153722424745558,8.950506838180655,6.605045533226554,4.496680737828029,1.96641031859901,-.591113175917298,-4.095454275131338,-8.760805063811716,-13.646666577877772],"-519.615,-300.000|-519.615,-600.000":[-13.646666577877772,-4.530298645436659,.8504229192390393,3.397811758726673,4.177815951837971,3.1807440438261856,1.2096159760921785,-.5262941568357012,-1.4660403864899862,-1.343717782367667,1.1401178577013837,5.800686719953123,11.896551443149939,18.576972489228066,23.86007015810551,27.2672300886392,28.567824779319416,27.70639909145262,24.619592756311626,17.78388801418919,6.476681641421619,-8.116369272574708,-21.28209460214959,-33.980306443577454,-45.61017505953551],"-259.808,-750.000|-519.615,-600.000":[-26.437609309157217,-20.707124714725644,-19.57635193824032,-19.33780653173424,-19.41629733489254,-19.687544832251962,-19.970133795576633,-20.064367384394487,-19.9709687596742,-19.74558505031515,-19.348314952879107,-13.781024450641748,-5.746105166782082,-.06904952295041511,.3481787980218106,.0004298285710172915,-2.3139743531329415,-6.63435443067583,-12.197700041537434,-17.494790595738507,-23.901285294384305,-30.609326766358674,-36.617817380931626,-41.65052486817557,-45.61017505953551],"-259.808,-750.000|0.000,-600.000":[-26.437609309157217,-27.0439509550832,-23.900745934830603,-20.10701043974752,-16.29825861147681,-12.19194099584821,-7.574889118764598,-4.129039778154938,-2.055400933348099,-1.105480267807124,-1.4877073784214545,-3.312934205288028,-5.401685195740728,-7.794282439143234,-10.206121960032752,-12.115331312339883,-13.963577377563396,-16.540569160388095,-19.858569913858425,-23.85496461945683,-28.258511718807533,-32.78715012370128,-37.51126405761453,-42.44271261727401,-41.22068171004791],"519.615,-300.000|519.615,-600.000":[-3.7443605064389374,5.818317014955869,11.294805925511339,15.22351669300613,18.608942375435333,19.778780649800492,19.07209438840821,18.72885352228456,18.956037168457307,19.942132975749754,21.62678173879448,22.673305265650317,23.86839115301663,24.360100092814463,24.484400822084496,24.625626850796856,23.415043488422427,21.91876776364475,20.66565521004448,18.902281621612303,15.751751659764917,9.914044497519944,1.5294743426197854,-8.636783511977402,-17.301421520028804],"0.000,-300.000|259.808,-150.000":[-28.626291310167556,-21.41656030838887,-14.750561151126837,-8.03961020654865,-2.0125274439960705,2.1011648730146013,4.290991987384629,4.598734031973706,2.9384615739374453,1.411224498013297,.8223766533858405,.15689725500642737,-.42411671778050203,-1.2985966415073473,-2.6801107116839993,-4.82379983517068,-7.786369597384517,-11.226381385607453,-14.141505745469967,-17.401851173159066,-20.883502609652698,-24.396861107004085,-28.331872428902887,-33.00370941620455,-38.574035820085825],"0.000,-600.000|259.808,-750.000":[-41.22068171004791,-36.05538704419497,-31.075049128115083,-26.34348051427201,-21.926671825449223,-17.684663524394395,-13.34584539904847,-7.742424237679954,-1.3796190780373863,4.146446620069237,8.240282010703126,12.08542991600492,14.96731517739279,16.044134473220122,14.290504481219202,10.601834451954359,4.52814522142635,-4.575010475682184,-14.242634819498731,-20.922441383326234,-25.61970918557357,-28.819339021982003,-30.86604243886093,-32.42556095003859,-34.20755179987219],"259.808,-750.000|519.615,-600.000":[-34.20755179987219,-25.863896794482066,-17.638841742672305,-9.81455696507562,-1.8132114229138927,3.3200598062750926,6.430914980713354,8.67392021490545,10.292403164628777,11.116347372481469,12.400092710775706,12.812756051601209,11.53780042531724,9.487030303732524,6.836579747659796,3.6074760760013667,.2542967562506012,-2.6358173665620654,-4.257889058984254,-4.974913543380903,-5.939864685307169,-7.766029044983055,-10.102845934392413,-13.106761496898045,-17.301421520028804]},vertices:{"259.808,-150.000":-38.574035820085825,"259.808,150.000":-16.853615696564006,"0.000,300.000":-45.576167434219116,"-259.808,150.000":-36.08492383172995,"-259.808,-150.000":-42.99174944811064,"-0.000,-300.000":-28.626291310167556,"779.423,-150.000":-43.204219016807066,"779.423,150.000":-42.88491710743111,"519.615,300.000":-43.333398955737756,"519.615,-300.000":-3.7443605064389374,"0.000,-600.000":-41.22068171004791,"0.000,-300.000":-28.626291310167556,"-519.615,-300.000":-13.646666577877772,"-519.615,-600.000":-45.61017505953551,"-259.808,-750.000":-26.437609309157217,"519.615,-600.000":-17.301421520028804,"259.808,-750.000":-34.20755179987219}};var B3=1,li=300,ht=.03,Ui=Object.freeze({radius:190,height:480,floorY:24,mapRadius:5.7,mapHeight:14.4}),hi=[[1,0],[0,1],[-1,1],[-1,0],[0,-1],[1,-1]],In=[{q:0,r:0,title:"Lagoon",id:"lagoon"},{q:1,r:0,title:"Tidewater",id:"tidewater"},{q:0,r:-1,title:"Sakura",id:"sakura"},{q:1,r:-1,title:"Punk",id:"punk"}],k3=[["dunes","Dunes","#d6bb80",20],["oasis","Oasis","#c6b87c",12],["coast","Coast","#cbbf96",9],["pine","Pine coast","#65856c",32],["meadow","Meadow","#86a869",13],["highland","Highland","#8c947d",48],["volcanic","Volcanic","#666d76",44],["canyon","Canyon","#b88463",34],["tundra","Tundra","#b5c8c6",25],["blossom","Blossom","#afbc87",18],["wetland","Wetland","#7d9f83",10],["basalt","Basalt","#788c94",38]],pc=k3.flatMap(([i,e,t,n],s)=>Array.from({length:12},(r,o)=>({id:`${i}-${String(o+1).padStart(2,"0")}`,family:i,title:`${e} ${String(o+1).padStart(2,"0")}`,color:t,relief:n,seed:s*97+o*13+7,ridges:2+o%4,orientation:o*Math.PI/6,description:["Sheltered terraces","Low rolling banks","Split ridge","Scattered rocky outcrops"][o%4]}))),ls=(i,e)=>Math.max(Math.abs(i),Math.abs(e),Math.abs(i+e)),Pn=(i,e,t=1)=>({x:Math.sqrt(3)*li*(i+e/2)*t,z:1.5*li*e*t});function Xn(i,e,t){if(!Number.isInteger(i)||!Number.isInteger(e)||ls(i,e)>99)throw Error("Invalid tile coordinate.");let n=pc.find(s=>s.id===t);if(!n)throw Error("Unknown tile variant.");return{version:B3,q:i,r:e,variant:t,radius:li,slot:{...Ui},mapScale:ht,boundaries:z3(i,e),edges:hi.map(([s,r])=>[`${i},${e}`,`${i+s},${e+r}`].sort().join("|")),recipe:{...n}}}var o0=i=>JSON.stringify(i,(e,t)=>t&&typeof t=="object"&&!Array.isArray(t)?Object.fromEntries(Object.keys(t).sort().map(n=>[n,t[n]])):t);async function a0(i){return Array.from(new Uint8Array(await crypto.subtle.digest("SHA-256",typeof i=="string"?new TextEncoder().encode(i):i)),e=>e.toString(16).padStart(2,"0")).join("")}function qt(i=li){return Array.from({length:6},(e,t)=>{let n=(t*60-30)*Math.PI/180;return[Math.cos(n)*i,Math.sin(n)*i]})}function z3(i,e){let t=Pn(i,e),n=qt(),s=(r,o)=>`${r.toFixed(3)},${o.toFixed(3)}`;return n.map((r,o)=>{let a=n[(o+1)%6],c=s(r[0]+t.x,r[1]+t.z),l=s(a[0]+t.x,a[1]+t.z),u=fc.edges[[c,l].sort().join("|")];if(u)return c<l?[...u]:[...u].reverse();let d=fc.vertices[c]??Ui.floorY,h=fc.vertices[l]??Ui.floorY;return Array.from({length:25},(p,g)=>Ui.floorY+(d-Ui.floorY)*Math.max(0,1-g/6)+(h-Ui.floorY)*Math.max(0,1-(24-g)/6))})}var ad={dunes:{title:"Dunes",land:"#c9ad78",sand:"#ebd49f",rock:"#a39176",path:"#e9dac0"},oasis:{title:"Oasis",land:"#9aa778",sand:"#dccb99",rock:"#9a9c83",path:"#e3cf9d"},coast:{title:"Coast",land:"#9ba884",sand:"#e1d0ab",rock:"#87928d",path:"#e8d9b8"},pine:{title:"Pine",land:"#648674",sand:"#c9c5a7",rock:"#7f9390",path:"#d0c6a4"},meadow:{title:"Meadow",land:"#92aa7d",sand:"#d8cbaa",rock:"#909b89",path:"#e0ccaa"},highland:{title:"Highland",land:"#899783",sand:"#c6c2ac",rock:"#899394",path:"#d0c6b1"},volcanic:{title:"Volcanic",land:"#59666a",sand:"#87887b",rock:"#657074",path:"#b0a68e"},canyon:{title:"Canyon",land:"#ba8d70",sand:"#d6b18a",rock:"#a57d69",path:"#e0be92"},tundra:{title:"Tundra",land:"#b4c7be",sand:"#cbd0bf",rock:"#8d9fa0",path:"#e1deca"},blossom:{title:"Blossom",land:"#96ab8b",sand:"#d4c9b2",rock:"#8c9d93",path:"#d9c0ae"},wetland:{title:"Wetland",land:"#7a9b86",sand:"#b9b79a",rock:"#7e9690",path:"#cec7aa"},basalt:{title:"Basalt",land:"#718784",sand:"#aaa996",rock:"#667d83",path:"#c4bdad"},urban:{title:"Urban",land:"#8d9995",sand:"#bdbaa8",rock:"#75848a",path:"#cdd0c4"},industrial:{title:"Industrial",land:"#727e80",sand:"#aeb09f",rock:"#536971",path:"#bac3bc"},scifi:{title:"Sci-fi",land:"#334c59",sand:"#829b9d",rock:"#253f4d",path:"#91aeb4"}},cd=[{id:"commons",title:"Open commons",description:"A connected path around one generous building green.",wet:[],rivers:[],regions:[[0,0,140]],styles:["meadow","pine","blossom","tundra"]},{id:"pass",title:"Mountain pass",description:"A sheltered building terrace between two rocky ridges.",wet:[],rivers:[],regions:[[0,0,105]],styles:["highland","canyon","volcanic","basalt"]},{id:"oasis",title:"Oasis basin",description:"A crescent pool with a dry terrace along its western bank.",wet:[],rivers:[],regions:[[-55,0,108]],styles:["dunes","oasis"]},{id:"river",title:"River crossing",description:"A broad river, two building banks and connected footbridges.",wet:[],rivers:[0,3],regions:[[0,-116,62],[0,116,62]],styles:["meadow","blossom","pine"]},{id:"bend",title:"River bend",description:"A curved channel around a sheltered inner-bank building area.",wet:[],rivers:[0,2],regions:[[-55,-73,88]],styles:["blossom","wetland","oasis"]},{id:"fork",title:"River confluence",description:"Three channels meet between three small building terraces.",wet:[],rivers:[0,2,4],regions:[[62,-107,48],[62,107,48],[-124,0,48]],styles:["wetland","pine","tundra"]},{id:"estuary",title:"River mouth",description:"An inland river opens into the sea between two banks.",wet:[0,1],rivers:[3],regions:[[-25,-126,55],[-25,126,55]],styles:["coast","wetland","basalt"]},{id:"headland",title:"Headland",description:"A broad headland with beaches on two sea-facing sides.",wet:[0,1,2],rivers:[],regions:[[-60,-35,112]],styles:["coast","pine","volcanic"]},{id:"bay",title:"Sheltered bay",description:"A curved sandy inlet beside a compact building terrace.",wet:[0,1],rivers:[],regions:[[-76,0,98]],styles:["coast","dunes","oasis"]},{id:"harbor",title:"Harbor basin",description:"A sheltered water basin framed by stone quays and a promenade.",wet:[0,1],rivers:[],regions:[[-85,0,90]],styles:["urban","industrial","basalt"]},{id:"canal",title:"Canal quarter",description:"A straight canal, paved banks and two bridge-connected plots.",wet:[],rivers:[0,3],regions:[[0,-118,60],[0,118,60]],styles:["urban","industrial","scifi"]},{id:"skyport",title:"Floating platform",description:"A suspended deck with approach bridges and cyan support rings.",wet:[],rivers:[],regions:[[0,0,120]],styles:["scifi","industrial"]}],H3=cd.flatMap(i=>i.styles.map(e=>({id:`${i.id}-${e}`,layout:i.id,family:e,title:i.title,color:ad[e].land,description:i.description,orientation:0}))),mc=qt(),G3=i=>Math.max(0,Math.min(1,i)),rd=i=>(i=G3(i),i*i*(3-2*i)),W3=(i,e)=>{let t=e*Math.PI/3,n=Math.cos(t),s=Math.sin(t);return[i[0]*n-i[1]*s,i[0]*s+i[1]*n]};var X3=i=>`${i.q},${i.r}`,hs=i=>Math.round(i*1e6)/1e6;function q3(i,e,t){let n=i!==e?"shore":i==="water"?"sea":t?"river":"land",s=Array.from({length:25},(r,o)=>{let a=o/24;if(n==="land")return 24;if(n==="sea")return-40;if(n==="river")return hs(24-56*(1-rd((Math.abs(a-.5)*300-33)/26)));let c=i==="land"?a:1-a;return hs(24-64*rd((c-.28)/.44))});return{kind:n,start:i,end:e,samples:s,waterY:0,ports:n==="land"?[{kind:"path",t:.5,width:22,y:24}]:n==="shore"?[{kind:"path",t:i==="land"?.18:.82,width:22,y:24}]:[],...n==="river"?{channel:{t:.5,width:66,bedY:-32}}:{}}}var to=new Map;function Y3(i,e){let t=X3({q:i,r:e});if(to.has(t))return to.get(t);let n=Pn(i,e),s=mc.map(r=>{for(let o of In){let a=Pn(o.q,o.r);for(let c=0;c<6;c++)if(Math.hypot(a.x+mc[c][0]-n.x-r[0],a.z+mc[c][1]-n.z-r[1])<.001)return Xn(o.q,o.r,"coast-01").boundaries[c][0]}return null});return to.size>512&&to.clear(),to.set(t,s),s}function ld(i,e,t,n=0,s=[]){if(!Number.isInteger(i)||!Number.isInteger(e)||ls(i,e)>99)throw Error("Invalid tile coordinate.");if(!Number.isInteger(n)||n<0||n>5)throw Error("Rotation must be 0\u20135.");if(!Array.isArray(s)||s.some(f=>!Number.isInteger(f)||f<0||f>5))throw Error("Invalid legacy adapters.");let r=H3.find(f=>f.id===t);if(!r)throw Error("Unknown tile variant.");let o=cd.find(f=>f.id===r.layout),a=new Set(o.wet.map(f=>(f+n)%6)),c=new Set(o.rivers.map(f=>(f+n)%6)),l=Xn(i,e,"coast-01"),u=[...new Set([...s,...hi.flatMap(([f,_],b)=>In.some(S=>S.q===i+f&&S.r===e+_)?[b]:[])])].sort(),d=mc.map((f,_)=>q3(a.has(_)?"water":"land",a.has((_+1)%6)?"water":"land",c.has(_)));for(let f of u){let _=l.boundaries[f],b=_.map((E,w)=>({y:E,j:w})).filter(E=>E.y>8&&E.j>2&&E.j<22),S=b.sort((E,w)=>Math.abs(E.j-12)-Math.abs(w.j-12))[0];d[f]={kind:"legacy",start:_[0]>0?"land":"water",end:_[24]>0?"land":"water",samples:[..._],waterY:0,ports:S?[{kind:"path",t:S.j/24,width:18,y:S.y}]:[]}}let h=[...Y3(i,e)];for(let f of u)h[f]=d[f].samples[0],h[(f+1)%6]=d[f].samples[24];for(let f=0;f<6;f++)if(!u.includes(f))for(let[_,b]of[[0,f],[24,(f+1)%6]]){if(h[b]===null)continue;let S=h[b]-d[f].samples[_];for(let E=0;E<=4;E++)d[f].samples[_===0?E:24-E]=hs(d[f].samples[_===0?E:24-E]+S*(1-E/5));d[f].samples[_]=h[b]}let p=o.regions.map(([f,_,b])=>{let S=W3([f,_],n);return{x:hs(S[0]),z:hs(S[1]),radius:b}}),g=o.id==="skyport"?36:24,v={x:p[0].x,y:g,z:p[0].z},m=Math.max(...p.map(f=>Math.hypot(f.x-v.x,f.z-v.z)+f.radius));return{version:2,q:i,r:e,variant:t,rotation:n,legacyEdges:u,radius:li,mapScale:ht,recipe:{...r},slot:{origin:v,regions:p,radius:hs(m),height:480,floorY:g,mapRadius:hs(m*ht),mapHeight:14.4},edges:d,boundaries:d.map(f=>f.samples),connections:{path:"connected",water:o.rivers.length?"connected":o.wet.length?"sea":"enclosed",waterY:0}}}var hd={version:1,kind:"sampled-tile-surface",source:{world:"lagoon",revision:"index-BjH0GYGf",origin:[-8,0,-2],scale:.1077134479080076},size:101,step:.25851227497921825,x0:-12.925613748960913,z0:-12.925613748960913,heights:[1.2245,1.1809,1.1463,1.1436,1.2036,1.2633,1.2853,1.3481,1.4246,1.4159,1.3614,1.3113,1.3005,1.3196,1.381,1.4005,1.2876,1.2203,1.163,1.132,1.1272,1.1748,1.2083,1.2059,1.1335,1.0925,1.1306,1.1741,1.1523,1.2105,1.2724,1.3503,1.3409,1.271,1.2469,1.2176,1.2273,1.2473,1.2735,1.2689,1.22,1.2207,1.2357,1.168,1.1302,1.1176,1.1693,1.2682,1.331,1.3321,1.2914,1.2827,1.296,1.2497,1.1864,1.1182,1.1367,1.1871,1.2027,1.2271,1.2816,1.3541,1.2392,1.215,1.2233,1.2472,1.2032,1.1525,1.1515,1.1888,1.2364,1.2028,1.1864,1.1726,1.1328,1.1412,1.1692,1.1965,1.2457,1.292,1.2805,1.3071,1.3857,1.4321,1.4372,1.4408,1.4339,1.4019,1.3617,1.2827,1.225,1.1886,1.1911,1.2169,1.2663,1.2795,1.2975,1.3222,1.3091,1.3083,1.3201,1.2251,1.1603,1.1247,1.1531,1.2168,1.2582,1.2647,1.3109,1.4002,1.4367,1.4037,1.3539,1.3304,1.3286,1.398,1.3815,1.2792,1.1943,1.1383,1.1241,1.1387,1.199,1.238,1.2253,1.201,1.168,1.168,1.0931,1.1092,1.193,1.2366,1.3201,1.3081,1.2638,1.2353,1.2146,1.2078,1.1882,1.1959,1.1994,1.1699,1.1565,1.1423,1.1256,1.121,1.1287,1.1859,1.2916,1.3541,1.3117,1.2626,1.2751,1.275,1.2181,1.1623,1.1254,1.1578,1.191,1.1758,1.2138,1.2524,1.2995,1.2804,1.2514,1.2792,1.3043,1.2503,1.1619,1.1488,1.1657,1.2174,1.1956,1.1673,1.1401,1.1397,1.1513,1.163,1.181,1.2129,1.253,1.2328,1.3065,1.4213,1.4409,1.4065,1.3523,1.31,1.2834,1.2622,1.2264,1.1654,1.1683,1.1491,1.1932,1.2426,1.2597,1.3063,1.3508,1.3437,1.3205,1.3072,1.2392,1.2067,1.1889,1.1847,1.1954,1.2688,1.3192,1.3074,1.3655,1.4322,1.3948,1.3504,1.2796,1.2892,1.2973,1.2903,1.2737,1.1876,1.1005,1.106,1.1937,1.2411,1.2602,1.3018,1.2609,1.2079,1.1483,1.0998,1.1146,1.2013,1.2802,1.2471,1.2597,1.2502,1.2534,1.2474,1.2167,1.1774,1.1515,1.1683,1.158,1.127,1.0963,1.0862,1.1449,1.1572,1.2272,1.3242,1.3795,1.3049,1.2514,1.2327,1.2243,1.1911,1.2034,1.1801,1.1547,1.1507,1.1758,1.2344,1.2357,1.2279,1.2441,1.2728,1.281,1.283,1.2733,1.2169,1.2032,1.2229,1.2502,1.239,1.1836,1.1496,1.1661,1.1806,1.1868,1.2129,1.2171,1.2372,1.2093,1.276,1.4025,1.3994,1.3366,1.2707,1.2176,1.206,1.2042,1.1659,1.1888,1.1725,1.1644,1.2243,1.2346,1.2276,1.2936,1.373,1.3576,1.3665,1.3458,1.2709,1.2657,1.2544,1.199,1.1954,1.2995,1.3169,1.3156,1.3398,1.4253,1.3826,1.3024,1.2609,1.2626,1.2273,1.19,1.1922,1.1518,1.1439,1.1523,1.1661,1.2137,1.2529,1.3193,1.3143,1.2176,1.16,1.1356,1.1694,1.2672,1.1927,1.2213,1.2274,1.2423,1.2777,1.2462,1.2503,1.2121,1.1869,1.1882,1.1896,1.1568,1.0736,1.0901,1.1679,1.2057,1.262,1.3308,1.3646,1.2867,1.2689,1.2273,1.2012,1.2163,1.2277,1.1941,1.1389,1.1366,1.1834,1.2362,1.2328,1.2027,1.2257,1.2112,1.2272,1.2623,1.2629,1.2314,1.2327,1.2585,1.3013,1.2793,1.2467,1.2098,1.1991,1.2112,1.2102,1.2341,1.2336,1.2579,1.2192,1.2181,1.3378,1.3255,1.2744,1.2147,1.1771,1.1898,1.1438,1.1479,1.183,1.1883,1.1738,1.2145,1.2078,1.2053,1.28,1.3685,1.3363,1.3251,1.3088,1.1978,1.2083,1.2584,1.1991,1.2293,1.3143,1.3257,1.3337,1.3484,1.3733,1.3588,1.3114,1.252,1.2263,1.1957,1.1564,1.153,1.1445,1.0909,1.1301,1.1994,1.2622,1.2789,1.3378,1.2985,1.263,1.2175,1.2041,1.2639,1.2346,1.2266,1.2693,1.2558,1.2786,1.2822,1.2434,1.2391,1.2341,1.2007,1.2014,1.2022,1.1745,1.1078,1.1044,1.1581,1.2191,1.2711,1.3277,1.3437,1.2543,1.2697,1.2583,1.2462,1.246,1.2426,1.2285,1.1665,1.1442,1.1945,1.2599,1.2825,1.2188,1.1764,1.1478,1.2123,1.2878,1.2551,1.2531,1.2806,1.2857,1.2824,1.2416,1.213,1.2107,1.2014,1.2469,1.2686,1.2975,1.2941,1.264,1.2498,1.2455,1.2596,1.2934,1.2637,1.2223,1.2253,1.2137,1.1574,1.1842,1.2256,1.1946,1.1366,1.1549,1.1899,1.1716,1.2249,1.3222,1.295,1.254,1.2504,1.1731,1.1702,1.2221,1.2358,1.2413,1.3367,1.3309,1.2774,1.2945,1.2942,1.2804,1.3288,1.2979,1.2329,1.1774,1.1413,1.1532,1.1781,1.132,1.1727,1.2541,1.2891,1.3332,1.3517,1.2723,1.2497,1.2357,1.2851,1.2453,1.2451,1.2534,1.2787,1.2909,1.2791,1.2641,1.2655,1.2489,1.2328,1.2017,1.1874,1.1802,1.2277,1.1423,1.1113,1.1228,1.1629,1.2255,1.2989,1.3302,1.278,1.2674,1.2577,1.2891,1.26,1.2523,1.2599,1.1949,1.1698,1.1907,1.2374,1.1898,1.1674,1.1314,1.1427,1.1876,1.232,1.2867,1.2824,1.3298,1.3539,1.3157,1.2229,1.206,1.2115,1.2022,1.2619,1.2834,1.3049,1.3212,1.281,1.2598,1.2311,1.2316,1.2381,1.2088,1.2251,1.2638,1.2242,1.1701,1.1885,1.1972,1.1311,1.0723,1.0709,1.1534,1.1678,1.2035,1.2573,1.2684,1.209,1.1929,1.1804,1.1832,1.2207,1.3114,1.3165,1.3628,1.3242,1.2329,1.2252,1.2574,1.2995,1.3485,1.2883,1.1926,1.1508,1.1225,1.123,1.1414,1.1511,1.2167,1.2859,1.3095,1.302,1.3377,1.2794,1.2514,1.2375,1.2263,1.2164,1.2344,1.2556,1.3016,1.2704,1.2586,1.2634,1.2712,1.2174,1.199,1.2464,1.1962,1.194,1.2396,1.1992,1.1588,1.158,1.2151,1.2743,1.3254,1.3188,1.3025,1.3041,1.24,1.2859,1.2635,1.2664,1.2865,1.2581,1.2409,1.2102,1.2169,1.1334,1.1311,1.1362,1.1794,1.1939,1.1805,1.2303,1.3309,1.3571,1.3688,1.3439,1.2523,1.2084,1.2404,1.2803,1.3438,1.348,1.3368,1.3126,1.2806,1.2746,1.2681,1.2706,1.2399,1.2301,1.2185,1.2474,1.1953,1.152,1.1781,1.1609,1.0847,1.0325,1.0487,1.1138,1.1577,1.174,1.2359,1.2602,1.1962,1.1428,1.2175,1.2343,1.2681,1.3152,1.3039,1.2958,1.2755,1.2517,1.222,1.242,1.3484,1.3072,1.23,1.1819,1.1555,1.1199,1.1409,1.1348,1.1319,1.2051,1.3411,1.3494,1.2971,1.2916,1.3274,1.2588,1.1722,1.1798,1.1956,1.2201,1.2587,1.2234,1.233,1.263,1.3059,1.2876,1.2056,1.2076,1.2768,1.2503,1.2523,1.2899,1.24,1.2078,1.2818,1.2993,1.3055,1.2934,1.2963,1.2946,1.2265,1.2182,1.2427,1.2748,1.2668,1.2921,1.3045,1.2879,1.2464,1.2493,1.1351,1.1076,1.1319,1.1616,1.188,1.2031,1.2272,1.2802,1.3268,1.3238,1.3146,1.2616,1.242,1.2984,1.3391,1.3489,1.3866,1.347,1.3047,1.2807,1.2545,1.2113,1.2126,1.1496,1.1357,1.1501,1.1991,1.1726,1.1305,1.1396,1.1367,1.137,1.1034,1.1219,1.1668,1.1797,1.1922,1.2321,1.2623,1.2373,1.1687,1.2725,1.2709,1.2751,1.2852,1.2951,1.274,1.2754,1.3225,1.2584,1.2895,1.3304,1.2242,1.1797,1.1487,1.1186,1.1091,1.1325,1.1468,1.1641,1.286,1.3069,1.3031,1.2383,1.2342,1.2977,1.2297,1.1635,1.1395,1.1746,1.1977,1.2009,1.2352,1.2298,1.2598,1.293,1.275,1.2299,1.2487,1.3139,1.2639,1.2353,1.2719,1.2855,1.3215,1.2852,1.2855,1.2986,1.2605,1.272,1.263,1.1847,1.2074,1.2412,1.2541,1.2766,1.3069,1.3221,1.3275,1.3352,1.316,1.17,1.0989,1.1022,1.1238,1.19,1.2263,1.2386,1.3167,1.3553,1.3138,1.3119,1.2903,1.3005,1.3676,1.3562,1.3382,1.3565,1.4079,1.3342,1.3109,1.2327,1.1595,1.148,1.105,1.0791,1.0824,1.1394,1.1364,1.1029,1.1084,1.1111,1.1434,1.1494,1.2001,1.2658,1.2207,1.2004,1.2483,1.2777,1.2879,1.2913,1.349,1.2978,1.2867,1.2985,1.3042,1.2641,1.2714,1.2937,1.3032,1.3369,1.2616,1.1984,1.1604,1.1434,1.1476,1.1223,1.1413,1.1543,1.2551,1.2641,1.3088,1.3416,1.2676,1.2476,1.2666,1.2263,1.1969,1.1635,1.2237,1.155,1.1573,1.2244,1.2399,1.2576,1.3181,1.3132,1.2622,1.2887,1.301,1.2164,1.193,1.2083,1.2662,1.3432,1.3573,1.3482,1.3117,1.2711,1.2479,1.2255,1.1372,1.1574,1.2339,1.2765,1.2889,1.2992,1.3111,1.3652,1.3898,1.3866,1.2188,1.1193,1.0958,1.134,1.2069,1.2318,1.2694,1.3363,1.378,1.349,1.335,1.3382,1.3234,1.3872,1.3557,1.3432,1.3393,1.3417,1.3439,1.3051,1.225,1.1613,1.1312,1.1022,1.0783,1.0968,1.1794,1.1804,1.127,1.1204,1.1336,1.1424,1.1515,1.1935,1.2396,1.3095,1.2014,1.2401,1.2787,1.3439,1.3811,1.4179,1.3326,1.2976,1.2921,1.2885,1.2773,1.2525,1.2745,1.3412,1.3426,1.2939,1.2154,1.1989,1.2201,1.235,1.1782,1.1488,1.1675,1.2304,1.2935,1.3349,1.3535,1.3174,1.2816,1.3181,1.2858,1.2493,1.2042,1.1729,1.1666,1.1598,1.1811,1.1865,1.1953,1.2856,1.3196,1.2569,1.2629,1.2554,1.1865,1.1791,1.2178,1.2711,1.3389,1.4042,1.3993,1.3844,1.3058,1.2419,1.1638,1.1212,1.1268,1.1866,1.2493,1.2372,1.2459,1.3038,1.3697,1.4379,1.3533,1.2619,1.1476,1.1309,1.1559,1.1927,1.2608,1.2779,1.2929,1.3812,1.3808,1.3602,1.31,1.3086,1.3225,1.297,1.2884,1.2901,1.3124,1.3251,1.2986,1.2227,1.169,1.121,1.1062,1.1268,1.2119,1.1719,1.1658,1.1666,1.1689,1.1575,1.1525,1.1638,1.1978,1.2061,1.2488,1.2848,1.3182,1.3548,1.4174,1.3398,1.395,1.3807,1.3422,1.3199,1.2824,1.2613,1.2452,1.2803,1.373,1.4189,1.4138,1.346,1.279,1.2383,1.2774,1.2814,1.1857,1.1555,1.2004,1.2875,1.306,1.3534,1.3322,1.3086,1.3179,1.2874,1.2728,1.2319,1.1825,1.1484,1.1768,1.1602,1.1393,1.1502,1.1942,1.252,1.2468,1.2125,1.2244,1.2419,1.222,1.257,1.2903,1.3564,1.3411,1.3023,1.2528,1.2363,1.2178,1.206,1.2035,1.2125,1.1951,1.1894,1.1951,1.2158,1.289,1.368,1.3807,1.3038,1.2258,1.1454,1.1293,1.1423,1.235,1.2403,1.2634,1.2593,1.3247,1.2689,1.2403,1.261,1.294,1.3294,1.2969,1.2739,1.293,1.282,1.3063,1.3144,1.2609,1.1803,1.1324,1.1321,1.1462,1.1732,1.1477,1.1321,1.1847,1.1977,1.1615,1.1876,1.1965,1.1966,1.1811,1.221,1.2755,1.3567,1.3791,1.3433,1.2913,1.3471,1.3369,1.3559,1.3276,1.2806,1.2552,1.2316,1.2785,1.3599,1.3865,1.4203,1.3239,1.2911,1.2957,1.3069,1.3294,1.2025,1.1579,1.2026,1.2485,1.2592,1.2886,1.2848,1.2728,1.2981,1.2813,1.2099,1.2518,1.2187,1.1752,1.19,1.1816,1.1453,1.1385,1.1605,1.2157,1.2098,1.1748,1.175,1.2531,1.2749,1.2852,1.2961,1.319,1.252,1.2145,1.2116,1.229,1.2608,1.2751,1.2043,1.1658,1.1572,1.1552,1.2006,1.1991,1.2362,1.3246,1.3059,1.2632,1.2181,1.1675,1.1204,1.1608,1.2205,1.2331,1.2294,1.193,1.2331,1.185,1.1824,1.254,1.3003,1.3714,1.3174,1.3042,1.3518,1.3434,1.3409,1.3509,1.2872,1.219,1.2106,1.2386,1.2556,1.2473,1.1997,1.1934,1.1846,1.2266,1.2469,1.2322,1.2251,1.2125,1.2227,1.2719,1.29,1.3018,1.3325,1.3335,1.3146,1.2911,1.2867,1.2809,1.2504,1.2366,1.2019,1.1883,1.2691,1.3308,1.3581,1.3409,1.3035,1.2906,1.3123,1.3019,1.2878,1.1777,1.159,1.206,1.2565,1.2027,1.1944,1.2031,1.2175,1.265,1.2287,1.2222,1.2615,1.2598,1.2455,1.2354,1.2438,1.1953,1.2006,1.2084,1.2392,1.2089,1.1539,1.1398,1.1502,1.2203,1.308,1.2942,1.2737,1.1838,1.1602,1.2102,1.2306,1.2672,1.3004,1.2262,1.1365,1.1205,1.1581,1.2271,1.1982,1.2053,1.2876,1.234,1.227,1.2272,1.1525,1.1494,1.154,1.1789,1.1934,1.1899,1.1685,1.1786,1.1991,1.2384,1.2864,1.3494,1.419,1.3617,1.321,1.3658,1.3647,1.3197,1.2958,1.2777,1.2928,1.31,1.3457,1.374,1.3117,1.2507,1.2197,1.2052,1.2586,1.3074,1.3051,1.2838,1.2514,1.2601,1.2869,1.2833,1.3102,1.3396,1.3324,1.3394,1.2688,1.2414,1.1939,1.1688,1.1694,1.1689,1.1803,1.2464,1.3431,1.3582,1.3014,1.2768,1.2857,1.3289,1.3086,1.2711,1.188,1.1856,1.1993,1.2285,1.2377,1.2029,1.1711,1.1841,1.1429,1.1791,1.2187,1.2863,1.3027,1.2977,1.3124,1.2949,1.2402,1.2446,1.2342,1.2542,1.2067,1.1716,1.107,1.0978,1.1491,1.2471,1.2189,1.1515,1.0951,1.0887,1.1756,1.2185,1.2714,1.2872,1.286,1.1422,1.1291,1.1685,1.2204,1.1972,1.1845,1.2298,1.2442,1.2176,1.1928,1.138,1.1255,1.1603,1.1522,1.1666,1.1775,1.1913,1.1843,1.1575,1.1727,1.2285,1.2726,1.2816,1.2861,1.3375,1.3506,1.3529,1.3119,1.2682,1.2397,1.2563,1.3004,1.3308,1.3401,1.3749,1.3553,1.3237,1.2841,1.2894,1.3479,1.307,1.2976,1.2653,1.271,1.2573,1.2845,1.3419,1.3671,1.326,1.3862,1.2246,1.2074,1.1826,1.1419,1.1566,1.2325,1.2081,1.2386,1.3057,1.3379,1.3123,1.2913,1.3018,1.2999,1.2817,1.2781,1.2468,1.2383,1.2068,1.2328,1.1958,1.1271,1.1189,1.1266,1.1718,1.1862,1.2591,1.3055,1.32,1.345,1.3005,1.2385,1.1887,1.2151,1.1902,1.1929,1.214,1.185,1.1272,1.1006,1.1312,1.1646,1.1451,1.0944,1.0692,1.1184,1.2158,1.2271,1.2375,1.2175,1.1715,1.2155,1.151,1.1861,1.2373,1.2424,1.2262,1.2388,1.2592,1.2183,1.2018,1.1766,1.1162,1.1804,1.2278,1.2119,1.2141,1.1941,1.1854,1.1669,1.1823,1.2221,1.2262,1.2122,1.1857,1.2458,1.3401,1.3482,1.2976,1.2716,1.2625,1.2725,1.3395,1.3551,1.3506,1.4431,1.3757,1.338,1.2633,1.2468,1.314,1.3185,1.326,1.3219,1.3238,1.2988,1.3344,1.3352,1.2823,1.292,1.321,1.2148,1.205,1.2063,1.172,1.2264,1.3046,1.2618,1.255,1.3187,1.3681,1.3136,1.3011,1.3157,1.3063,1.2676,1.2403,1.3299,1.2944,1.281,1.2702,1.1893,1.1069,1.0879,1.1679,1.1665,1.2331,1.2793,1.2849,1.2979,1.2958,1.2773,1.2062,1.2123,1.2237,1.1867,1.1777,1.1701,1.1727,1.1398,1.1244,1.1455,1.1944,1.2306,1.1838,1.1615,1.1775,1.2231,1.2328,1.2366,1.206,1.1566,1.1376,1.2721,1.24,1.2388,1.2284,1.2215,1.1911,1.2189,1.2112,1.1866,1.181,1.1689,1.2167,1.2028,1.2069,1.2327,1.2094,1.2218,1.1961,1.1989,1.1732,1.1632,1.1443,1.1428,1.2071,1.2951,1.3675,1.3009,1.2885,1.3058,1.3504,1.3663,1.3569,1.3235,1.389,1.3751,1.3305,1.2703,1.2099,1.2982,1.3502,1.3983,1.3927,1.361,1.3209,1.296,1.2853,1.2669,1.2841,1.2436,1.1359,1.0898,1.0863,1.1429,1.215,1.2789,1.2936,1.3073,1.3179,1.3541,1.3521,1.378,1.3512,1.2751,1.2244,1.2116,1.2539,1.3565,1.377,1.3136,1.2438,1.1789,1.1555,1.1124,1.1079,1.1641,1.1969,1.2203,1.239,1.268,1.257,1.2101,1.2118,1.2199,1.2498,1.2154,1.1635,1.1757,1.1642,1.1329,1.1308,1.2298,1.2832,1.2518,1.2293,1.1759,1.2154,1.2909,1.2655,1.2313,1.1838,1.0811,1.1923,1.28,1.2241,1.168,1.1588,1.2055,1.223,1.2566,1.1991,1.2105,1.2526,1.2308,1.2295,1.2398,1.2263,1.1837,1.1617,1.1288,1.1203,1.1433,1.1975,1.1288,1.1133,1.1786,1.2869,1.3388,1.3028,1.2476,1.3661,1.3838,1.3951,1.3536,1.2716,1.2916,1.3677,1.3307,1.2608,1.2329,1.3072,1.3153,1.3373,1.2915,1.2663,1.2955,1.3196,1.3048,1.2805,1.2904,1.2369,1.103,1.0621,1.0823,1.1139,1.1825,1.2297,1.2555,1.25,1.2806,1.3311,1.3513,1.3471,1.3576,1.2518,1.2213,1.1948,1.1999,1.2856,1.3069,1.2527,1.2014,1.1959,1.161,1.1243,1.1364,1.1344,1.1296,1.1453,1.2138,1.2558,1.2526,1.2098,1.1732,1.2042,1.2241,1.1383,1.1072,1.1788,1.1959,1.1642,1.1669,1.2486,1.2566,1.243,1.2414,1.1884,1.1643,1.2163,1.2908,1.3125,1.2525,1.0895,1.1371,1.1822,1.2708,1.1645,1.1285,1.195,1.2185,1.2614,1.2604,1.2672,1.3016,1.2692,1.3181,1.2788,1.2224,1.1717,1.1297,1.1258,1.1168,1.1199,1.1406,1.186,1.1648,1.1805,1.2945,1.332,1.2781,1.2048,1.3659,1.3848,1.3384,1.3305,1.2278,1.2201,1.2664,1.3555,1.3049,1.271,1.2926,1.3158,1.2608,1.221,1.2411,1.2774,1.2851,1.2733,1.2639,1.2971,1.2447,1.154,1.1677,1.1518,1.1921,1.226,1.2336,1.2609,1.2534,1.2753,1.3529,1.28,1.2727,1.2679,1.3141,1.2303,1.2137,1.2121,1.2775,1.3143,1.2788,1.2485,1.2333,1.2131,1.1634,1.1479,1.1278,1.1539,1.1945,1.2371,1.2404,1.2471,1.2274,1.1764,1.2103,1.2067,1.134,1.1343,1.1983,1.2621,1.2456,1.2498,1.2726,1.2041,1.1953,1.1976,1.1772,1.1525,1.2014,1.2088,1.2399,1.2778,1.1408,1.097,1.1359,1.1422,1.1622,1.1158,1.1908,1.2481,1.2873,1.2647,1.2274,1.2135,1.2196,1.2552,1.2851,1.2588,1.2035,1.1623,1.1498,1.1225,1.1487,1.1663,1.2206,1.2274,1.2092,1.2748,1.3026,1.2228,1.1867,1.3784,1.3158,1.2707,1.2705,1.2714,1.2384,1.2433,1.2447,1.3105,1.2657,1.2321,1.2527,1.2901,1.3085,1.2943,1.2456,1.2261,1.2487,1.2545,1.1866,1.1573,1.2207,1.247,1.2344,1.2576,1.2507,1.2521,1.2996,1.2934,1.3254,1.3827,1.258,1.2083,1.2047,1.1959,1.253,1.2739,1.2571,1.308,1.3509,1.3365,1.3261,1.2958,1.2465,1.1825,1.1694,1.1404,1.2442,1.2946,1.3222,1.2934,1.2772,1.2772,1.2195,1.2782,1.2438,1.2176,1.2406,1.2767,1.3032,1.3526,1.3208,1.2625,1.2061,1.2012,1.1575,1.1649,1.2012,1.2574,1.2668,1.2599,1.3024,1.1834,1.0663,1.12,1.0763,1.075,1.1776,1.215,1.2663,1.3137,1.2993,1.2462,1.2255,1.2616,1.3177,1.3152,1.2808,1.2395,1.2305,1.2266,1.1998,1.2006,1.1791,1.2038,1.2047,1.1855,1.1962,1.2546,1.1799,1.1747,1.3573,1.2633,1.274,1.313,1.287,1.2484,1.2329,1.2083,1.1996,1.2781,1.2545,1.214,1.1936,1.225,1.2629,1.2193,1.1538,1.1735,1.2204,1.1649,1.1628,1.2248,1.2032,1.1616,1.1885,1.2321,1.2554,1.3001,1.3393,1.3587,1.3219,1.2143,1.1559,1.1363,1.1352,1.2034,1.2806,1.2819,1.3549,1.3896,1.4381,1.4203,1.3255,1.2444,1.2,1.1954,1.2225,1.2586,1.2697,1.3169,1.332,1.2942,1.2374,1.2209,1.2135,1.2697,1.2919,1.3129,1.3351,1.3285,1.3418,1.2902,1.249,1.237,1.2098,1.1871,1.1961,1.2133,1.2846,1.3079,1.3397,1.3318,1.2125,1.0611,1.1056,1.0876,1.0915,1.178,1.2859,1.3019,1.3424,1.3723,1.3861,1.3251,1.3165,1.3672,1.36,1.3225,1.2971,1.2928,1.2821,1.2424,1.2169,1.1882,1.2311,1.2391,1.168,1.1554,1.276,1.1754,1.1884,1.3135,1.2636,1.2719,1.3056,1.3129,1.3191,1.3164,1.2391,1.1642,1.1747,1.2898,1.2279,1.1944,1.2037,1.2125,1.247,1.1454,1.1603,1.2235,1.1575,1.1541,1.2266,1.1682,1.1328,1.144,1.1934,1.2105,1.2194,1.2511,1.3119,1.2926,1.2526,1.1778,1.1241,1.0953,1.1969,1.2668,1.2737,1.3568,1.4319,1.3887,1.3837,1.3528,1.2532,1.2107,1.2594,1.2611,1.2399,1.2667,1.3472,1.3785,1.3593,1.3141,1.2554,1.2433,1.287,1.3392,1.3488,1.3722,1.3803,1.3787,1.2862,1.2511,1.2221,1.2103,1.2364,1.2285,1.2637,1.3148,1.3559,1.3262,1.2681,1.2381,1.0924,1.0824,1.095,1.1364,1.1871,1.2373,1.296,1.3085,1.3347,1.4026,1.4062,1.3844,1.4024,1.3332,1.3015,1.2881,1.3021,1.2792,1.2871,1.2514,1.2266,1.2389,1.2691,1.2036,1.1868,1.2557,1.1645,1.2287,1.3119,1.3039,1.2838,1.3062,1.2965,1.334,1.2878,1.2063,1.1691,1.1315,1.167,1.2213,1.1969,1.1853,1.1762,1.253,1.202,1.2465,1.2748,1.1629,1.1319,1.2043,1.1266,1.1103,1.14,1.1972,1.1858,1.204,1.2349,1.2749,1.3073,1.2543,1.1802,1.1221,1.0917,1.1731,1.2066,1.2234,1.3182,1.4323,1.3503,1.3279,1.331,1.3021,1.2508,1.2406,1.2283,1.2413,1.2981,1.3676,1.4005,1.4182,1.3549,1.313,1.3014,1.3309,1.394,1.406,1.3418,1.3745,1.3436,1.2733,1.2448,1.2311,1.2243,1.1684,1.202,1.3279,1.4196,1.3533,1.2727,1.2469,1.2221,1.1452,1.0587,1.1157,1.1594,1.1966,1.2292,1.2548,1.2828,1.2867,1.3649,1.4264,1.3288,1.335,1.322,1.2858,1.2974,1.3418,1.3764,1.3726,1.3158,1.2509,1.2416,1.2829,1.2109,1.2143,1.2133,1.1476,1.2426,1.2776,1.2698,1.2037,1.2267,1.2451,1.3264,1.2332,1.1788,1.1925,1.1404,1.1391,1.1652,1.2514,1.1754,1.1319,1.2329,1.2387,1.2892,1.2963,1.178,1.1031,1.1391,1.1019,1.0981,1.1379,1.1786,1.2035,1.2362,1.255,1.2585,1.2627,1.279,1.1579,1.0682,1.0504,1.1116,1.1991,1.2116,1.2894,1.4236,1.3512,1.3041,1.2828,1.3348,1.2692,1.2284,1.2409,1.2606,1.3327,1.3924,1.3132,1.3532,1.3646,1.3745,1.3031,1.3157,1.3262,1.3408,1.2683,1.2625,1.3048,1.2448,1.2252,1.2107,1.134,1.1246,1.193,1.3223,1.3681,1.3079,1.2704,1.2517,1.2389,1.1749,1.0414,1.1238,1.2062,1.2527,1.2492,1.2685,1.2833,1.2809,1.3841,1.3432,1.2871,1.272,1.2309,1.1989,1.2079,1.2926,1.3605,1.3797,1.3645,1.3019,1.3083,1.3224,1.2364,1.2224,1.1745,1.1376,1.2068,1.2243,1.1838,1.1818,1.197,1.2098,1.3313,1.1939,1.149,1.1903,1.1912,1.1637,1.1772,1.2011,1.1989,1.1683,1.1817,1.1982,1.2809,1.2356,1.1603,1.0665,1.1159,1.114,1.0946,1.1089,1.1703,1.2263,1.244,1.2577,1.1743,1.1255,1.1343,1.1743,1.053,1.0472,1.1283,1.2714,1.2791,1.3395,1.4421,1.333,1.2757,1.2977,1.3114,1.2773,1.3053,1.2773,1.2614,1.2666,1.2993,1.2672,1.2743,1.3055,1.3223,1.3172,1.3079,1.2686,1.3044,1.2109,1.2052,1.1739,1.1946,1.1773,1.1626,1.1061,1.0775,1.1728,1.2745,1.2583,1.2716,1.2635,1.2692,1.279,1.2131,1.0595,1.0834,1.1673,1.2367,1.2711,1.275,1.3125,1.3462,1.2921,1.2928,1.2461,1.235,1.2284,1.2148,1.2253,1.2866,1.3328,1.3448,1.323,1.2917,1.2751,1.3,1.2704,1.2123,1.1536,1.1325,1.2034,1.1952,1.1885,1.1928,1.1903,1.2062,1.3138,1.1875,1.1392,1.1753,1.1948,1.1588,1.1571,1.1722,1.1551,1.0974,1.0911,1.1463,1.183,1.1501,1.1197,1.0682,1.056,1.0795,1.0654,1.0611,1.1143,1.1981,1.2493,1.1803,1.1257,1.1306,1.1398,1.1646,1.1433,1.1003,1.1674,1.3128,1.3495,1.3899,1.4105,1.3611,1.3373,1.3453,1.241,1.1836,1.1755,1.2357,1.2469,1.2089,1.2246,1.2576,1.2411,1.287,1.2889,1.3031,1.2818,1.2369,1.2313,1.2012,1.1802,1.1519,1.0838,1.0866,1.1105,1.0916,1.0866,1.1808,1.1501,1.1427,1.163,1.2102,1.2914,1.34,1.2759,1.1017,1.0735,1.1917,1.2245,1.2766,1.3017,1.4025,1.3131,1.2732,1.2959,1.2615,1.2647,1.2521,1.2317,1.2172,1.2823,1.2495,1.2155,1.2258,1.2339,1.189,1.2309,1.325,1.2279,1.1468,1.1586,1.1755,1.163,1.17,1.1693,1.2023,1.2038,1.2405,1.1431,1.1103,1.1056,1.2024,1.1281,1.116,1.147,1.1517,1.1021,1.0924,1.1465,1.1338,1.1258,1.1292,1.1117,1.0437,1.0218,1.0324,1.0608,1.1259,1.2638,1.2033,1.1692,1.1558,1.2023,1.2343,1.2006,1.1838,1.2053,1.2396,1.2763,1.3409,1.3841,1.3445,1.3387,1.3262,1.3162,1.2488,1.1866,1.1633,1.152,1.2348,1.1902,1.1633,1.244,1.2638,1.2616,1.2483,1.2694,1.2186,1.2063,1.247,1.2118,1.2003,1.1525,1.0834,1.1002,1.1019,1.1271,1.1672,1.1803,1.1451,1.1545,1.154,1.2315,1.304,1.3122,1.2512,1.1236,1.0434,1.1366,1.2132,1.267,1.2764,1.3634,1.3195,1.3257,1.3373,1.3666,1.324,1.3192,1.2396,1.1773,1.2019,1.169,1.1289,1.1317,1.2006,1.1401,1.16,1.3144,1.2506,1.1362,1.1679,1.1953,1.1813,1.1884,1.1824,1.161,1.184,1.2021,1.1029,1.0773,1.0974,1.142,1.1675,1.1482,1.1701,1.2001,1.1784,1.1728,1.2197,1.1785,1.1627,1.1565,1.1487,1.0802,1.0488,1.0719,1.1452,1.2323,1.2851,1.2581,1.221,1.2403,1.2945,1.2863,1.2292,1.2235,1.2541,1.2726,1.251,1.2782,1.3137,1.285,1.2515,1.2454,1.2539,1.306,1.2602,1.1726,1.1497,1.2166,1.1289,1.1341,1.1685,1.228,1.2262,1.2359,1.2545,1.2003,1.2176,1.2394,1.2431,1.1986,1.1401,1.1036,1.1145,1.1616,1.2014,1.2025,1.1982,1.1965,1.2462,1.2237,1.2612,1.328,1.3113,1.2478,1.1508,1.0212,1.1169,1.1856,1.1817,1.177,1.2626,1.3749,1.4159,1.4064,1.3163,1.3054,1.3326,1.2485,1.1598,1.1372,1.1237,1.1097,1.116,1.1534,1.0771,1.134,1.2409,1.2577,1.1222,1.1962,1.2568,1.1989,1.2172,1.2049,1.1511,1.1361,1.1589,1.0973,1.0628,1.0853,1.1075,1.1954,1.1624,1.1703,1.2157,1.2238,1.2309,1.2382,1.2034,1.1873,1.1815,1.2313,1.1177,1.1172,1.1617,1.2557,1.2529,1.2995,1.3072,1.2926,1.3271,1.361,1.3623,1.3263,1.2903,1.2634,1.2429,1.2381,1.2595,1.2955,1.2837,1.2064,1.1658,1.2006,1.2543,1.3281,1.2375,1.2024,1.2273,1.1461,1.1394,1.1401,1.1617,1.2093,1.2178,1.1848,1.2081,1.2046,1.232,1.3076,1.186,1.1395,1.1062,1.1549,1.1629,1.153,1.2099,1.166,1.1728,1.1912,1.2022,1.2794,1.3353,1.3757,1.2991,1.2283,1.0129,1.1457,1.2095,1.0866,1.1182,1.1875,1.2616,1.3514,1.3276,1.3149,1.3298,1.3604,1.2455,1.1356,1.0806,1.0694,1.0779,1.1059,1.1456,1.11,1.1678,1.2299,1.3037,1.1183,1.2053,1.2847,1.2122,1.2137,1.2242,1.1726,1.1323,1.1281,1.0472,1.0588,1.0968,1.1197,1.185,1.1758,1.2093,1.2858,1.2871,1.2319,1.2605,1.2099,1.2366,1.2818,1.3233,.7913,.843,.9093,1.0296,1.1885,1.2776,1.3037,1.2895,1.2958,1.3518,1.38,1.3356,1.271,1.2333,1.245,1.2219,1.2333,1.0651,.9957,.9575,.9268,.9038,.9222,.9974,1.1051,1.0398,.9897,.8743,.7764,.8085,1.0504,1.2235,1.1713,1.1568,1.2182,1.0483,.9516,.9136,.8807,1.0282,1.1605,1.142,1.1114,1.1082,1.0562,1.07,1.1392,1.1513,1.2413,1.3126,1.3302,1.3015,1.2412,1.2356,1.0264,1.1646,1.2356,1.096,1.087,1.1601,1.2429,1.1102,.9069,.9222,1.168,1.3185,1.2384,1.1149,1.0605,1.0515,1.0792,1.0998,1.1717,1.171,1.2168,1.2565,1.3326,1.1138,1.2228,1.2986,1.2628,1.2609,1.2441,1.2375,1.2246,1.0733,1.0428,1.0418,1.0433,1.0445,1.0799,1.0586,1.1108,1.1927,1.2983,1.2894,1.2787,1.2554,1.2992,1.2953,1.2911,.3657,.3796,.3915,.432,.5633,.7672,.8964,.8897,.8841,.8956,.8168,.719,.8,.9988,1.0279,.7952,.5377,.3648,.3242,.3416,.3362,.3034,.2951,.3164,.3559,.3637,.3148,.2553,.2272,.2456,.3898,.7239,.9227,.8543,.6569,.4033,.2841,.2355,.2514,.405,.7034,.8564,.8008,.5311,.3503,.4049,.6803,.9975,1.2083,1.287,1.3418,1.3167,1.2405,1.1759,1.0381,1.0926,1.1951,1.1371,1.1184,1.1016,.6503,.3242,.2016,.2152,.4123,.8045,1.0196,1.0445,1.0877,1.089,1.0773,1.1032,1.179,1.2287,1.229,1.2875,1.3038,1.1117,1.2678,1.2956,1.3495,1.2847,1.2692,1.1915,.7105,.5329,.5238,.4987,.4201,.3898,.4089,.4333,.4451,.4488,.5747,.8151,.9948,1.0842,1.0107,.9327,.941,.332,.3339,.3296,.3207,.3102,.3052,.3199,.3263,.3259,.3186,.2934,.286,.2998,.373,.3831,.2789,.2461,.2377,.2323,.2294,.2257,.2228,.2194,.2125,.2063,.2016,.1954,.1921,.195,.1988,.1992,.2081,.2752,.2436,.202,.1924,.1846,.1789,.176,.1842,.1981,.2667,.2286,.1628,.1586,.1575,.1682,.3298,.515,.5894,.8379,1.3489,1.2745,1.2049,1.0512,1.0589,1.18,1.0886,.9781,.3698,.1325,.1358,.1402,.1435,.1492,.1731,.2999,.4275,.6604,.9753,1.1078,1.114,1.176,1.2796,1.2556,1.2774,1.2682,1.1149,1.2955,1.3066,1.3657,1.3237,1.2385,.4455,.1844,.179,.1764,.1764,.1873,.2057,.228,.2436,.2486,.2484,.2528,.2774,.3669,.3991,.3539,.3279,.3457,.3237,.3237,.3192,.3126,.3058,.2998,.2956,.2908,.2835,.2771,.2769,.2804,.2808,.2711,.2544,.2426,.2369,.232,.2285,.2257,.2206,.2165,.2127,.2077,.2007,.1922,.1859,.1861,.1913,.1942,.1917,.1872,.1858,.1926,.1967,.1894,.1796,.1724,.1702,.1743,.1784,.1737,.1635,.1541,.1508,.1512,.1486,.1428,.1398,.1439,.179,.6315,1.3077,1.2537,1.073,1.047,1.1705,1.0455,.3447,.1071,.1188,.1248,.1273,.1302,.1341,.1358,.1335,.1286,.1322,.2962,.6278,.891,1.1313,1.285,1.2665,1.2609,1.2187,1.1111,1.2471,1.2744,1.3177,1.2704,.479,.1604,.1663,.169,.1685,.1703,.1837,.2064,.2272,.2394,.2447,.2475,.2542,.2636,.2659,.2625,.264,.2739,.29,.3151,.3141,.3108,.3058,.3016,.2983,.2945,.2857,.2728,.2645,.2655,.2694,.2667,.253,.2354,.2256,.2236,.2231,.2216,.218,.2131,.2101,.2062,.2025,.1969,.1867,.1812,.1856,.189,.1866,.1801,.1733,.1719,.1816,.1908,.1873,.1779,.1706,.1662,.1645,.1638,.1601,.1549,.1493,.1464,.1449,.1405,.1372,.1338,.1314,.1312,.1274,.6204,1.2436,1.0772,1.0262,1.1303,.4597,.0807,.0881,.1006,.1099,.1149,.1173,.1188,.1193,.1165,.1089,.101,.0956,.0981,.2243,.5147,1.0014,1.2586,1.2322,1.1451,1.0807,1.1612,1.2197,1.2339,.6201,.1401,.1462,.1545,.1596,.1631,.1716,.1857,.2053,.2201,.2293,.2355,.2417,.2502,.2567,.2557,.2537,.2574,.2658,.2798,.3067,.3068,.3066,.3036,.2997,.2956,.2918,.2817,.265,.2544,.2545,.2566,.251,.2365,.221,.2111,.2065,.2061,.2066,.2037,.1999,.2002,.1994,.1958,.1883,.1769,.1733,.1764,.1771,.1692,.1587,.1526,.1545,.1678,.1813,.1793,.1677,.1598,.1552,.1505,.1471,.1457,.1441,.1392,.1344,.1287,.121,.1178,.1135,.1055,.0991,.0941,.0953,.42,.4634,.4114,.3864,.0518,.0514,.0557,.067,.0826,.0974,.1045,.1053,.1043,.1013,.0964,.0861,.0712,.0687,.0745,.0746,.2343,.7375,.9523,.7447,.6519,.8657,.941,.5599,.1203,.123,.1299,.1413,.1508,.159,.1708,.1828,.1958,.2069,.2164,.2228,.2299,.2404,.2476,.2464,.247,.2529,.2606,.2711,.3005,.302,.3038,.3021,.2978,.292,.2866,.2765,.2599,.2489,.2473,.248,.2427,.23,.2164,.2058,.1977,.1919,.1901,.1888,.1874,.1908,.1928,.1887,.1796,.1678,.16,.1587,.1589,.1498,.138,.135,.1399,.1507,.1604,.158,.1482,.1432,.1407,.1373,.1365,.1391,.1404,.1351,.128,.1212,.1116,.1045,.0961,.0872,.0818,.0718,.0654,.0337,-.1149,-.1492,-.0227,.0044,.0101,.0194,.0319,.0544,.0801,.0954,.098,.0917,.0856,.0836,.0731,.0516,.0442,.0469,.0415,.0393,.0596,.1347,-.0977,-.1735,.1023,.1988,.0802,.0945,.1061,.1147,.1281,.1412,.1511,.1631,.1735,.179,.1897,.2023,.2087,.2154,.2289,.2399,.2421,.2442,.2491,.2547,.2634,.2948,.2979,.3011,.3002,.2956,.2879,.2803,.2692,.255,.2475,.2462,.2442,.2369,.2248,.2139,.2056,.1964,.1852,.1784,.1771,.1789,.1844,.1859,.1801,.1716,.1603,.1493,.1432,.1411,.1304,.1175,.1142,.1209,.1323,.1411,.141,.1341,.1304,.1317,.1316,.131,.131,.1313,.1269,.1204,.1139,.1007,.0883,.0754,.0679,.067,.0531,.0291,.0108,-.0422,-.0653,-.0587,-.0508,-.0389,-.0185,-.0033,.0267,.0553,.0732,.0812,.0781,.0724,.0695,.0564,.0323,.0207,.0127,-6e-4,-.0118,-.0048,-.0829,-.2089,-.2333,-.0937,.0088,.0446,.0682,.0907,.1047,.1185,.1333,.1443,.1554,.1644,.169,.1751,.1898,.2003,.2107,.2254,.2371,.2425,.2452,.2469,.2504,.2595,.2924,.2952,.2984,.2984,.2931,.2825,.2727,.2624,.2533,.2516,.2502,.2425,.2301,.2172,.207,.2,.1923,.1826,.1783,.1754,.1746,.1782,.1777,.1701,.1617,.1522,.1411,.1281,.1221,.1112,.1,.096,.105,.1189,.1272,.1276,.1184,.1113,.113,.1162,.1181,.1186,.1177,.1149,.1136,.1056,.0864,.0683,.0533,.0439,.0421,.0301,.0044,-.0293,-.0472,-.0589,-.0883,-.078,-.0727,-.0703,-.053,-.0153,.0201,.0409,.056,.0619,.0601,.0519,.0287,.0062,-.0109,-.0222,-.0545,-.0487,-.0361,-.0818,-.1195,-.1242,-.0603,-.0072,.0207,.0528,.0796,.0935,.107,.1262,.1418,.1521,.1581,.1618,.1689,.1816,.1979,.2131,.2273,.2368,.2402,.2425,.2448,.2501,.2603,.2952,.2948,.295,.2965,.293,.2809,.2683,.2584,.2534,.2553,.254,.2432,.227,.2109,.1984,.1904,.1861,.1832,.1778,.1721,.1693,.1717,.1704,.1617,.1499,.1391,.1243,.1182,.1115,.0962,.0839,.08,.0884,.0982,.1013,.1034,.0986,.092,.0884,.0895,.0992,.1075,.107,.1024,.1024,.0945,.0723,.0514,.0359,.0211,.0149,.0103,-.0083,-.0437,-.0557,-.074,-.093,-.109,-.0925,-.0874,-.0902,-.0535,-.0168,.0174,.0292,.0368,.0418,.0325,.0053,-.0178,-.0301,-.0448,-.0735,-.0757,-.0672,-.0827,-.0858,-.0743,-.0724,-.0287,.0061,.0413,.0688,.0821,.0955,.1178,.1364,.1462,.1502,.155,.1643,.1778,.1989,.2147,.2249,.2308,.2319,.2352,.242,.251,.262,.2992,.2936,.2905,.2933,.2935,.283,.2677,.2549,.2487,.2511,.2526,.2434,.2256,.2085,.1964,.1891,.186,.1814,.172,.1644,.1638,.1647,.1601,.1494,.1349,.117,.1067,.1029,.0874,.065,.0548,.0564,.064,.0698,.0707,.0731,.0716,.0711,.068,.0652,.0784,.0951,.0966,.0911,.0874,.0776,.0584,.0405,.0208,-.0152,-.0108,-.0261,-.0475,-.0734,-.079,-.073,-.1084,-.1289,-.1347,-.1083,-.0995,-.0698,-.0375,-.0018,-.0082,2e-4,.0097,.005,-.0201,-.04,-.0404,-.0716,-.081,-.0897,-.1047,-.1016,-.102,-.0824,-.0622,-.0317,.0068,.0338,.0597,.076,.093,.1128,.1268,.1381,.1465,.1545,.1647,.1784,.1998,.2143,.2209,.2239,.2247,.231,.2425,.2547,.2654,.2994,.2903,.2849,.2875,.2897,.2812,.2661,.2505,.2402,.2412,.2448,.236,.2195,.2065,.1988,.1928,.1874,.1807,.17,.1605,.1593,.1544,.1423,.1297,.1154,.1036,.0946,.0795,.0572,.0344,.0225,.0172,.0198,.0267,.0323,.0369,.0394,.048,.0526,.0507,.0601,.0759,.0818,.0793,.0699,.0555,.0413,.0291,.0045,-.0383,-.0575,-.0561,-.0652,-.0824,-.0945,-.0967,-.1175,-.1379,-.1308,-.1203,-.1168,-.1191,-.0838,-.0612,-.0445,-.0278,-.0474,-.0499,-.0546,-.0638,-.0811,-.1057,-.105,-.1126,-.1373,-.1463,-.121,-.0987,-.0668,-.0249,.0034,.0315,.0605,.0802,.0973,.1133,.1237,.1368,.1522,.1636,.1726,.1809,.1964,.2098,.2169,.2204,.2229,.2335,.2494,.2636,.2722,.2976,.2854,.2781,.2795,.2823,.2759,.2619,.2463,.2341,.2315,.232,.2236,.2123,.2039,.1975,.1914,.186,.1774,.1676,.1563,.1463,.1325,.1131,.1019,.0965,.0909,.0774,.061,.0359,.0103,-.0088,-.0287,-.0349,-.0383,-.0423,-.0277,-.0037,.0123,.0236,.0306,.043,.0523,.0573,.0619,.0567,.0429,.0256,.0098,-.0316,-.0573,-.0642,-.056,-.0699,-.0855,-.0961,-.1163,-.1318,-.1437,-.1323,-.1034,-.1129,-.1284,-.0839,-.0811,5e-4,.0926,.038,.0678,.0026,-.089,-.1352,-.1462,-.1401,-.1435,-.1376,-.1691,-.1462,-.1002,-.0532,-.0235,.0075,.0238,.0603,.0851,.102,.1168,.1277,.1419,.1594,.1728,.1798,.1837,.1927,.2056,.2154,.2216,.227,.2415,.2594,.2708,.2748,.2956,.2804,.2711,.2704,.2729,.2679,.2554,.2421,.2309,.2242,.2193,.2117,.2044,.1993,.1932,.1875,.1795,.1677,.1573,.1447,.128,.1052,.087,.0814,.0739,.06,.0521,.0343,-.0037,-.0487,-.0592,-.0597,-.0695,-.066,-.08,-.0716,-.0601,-.0401,-.0376,4e-4,.0187,.0251,.0263,.0366,.0419,.0319,.0096,-.0357,-.0411,-.0732,-.0715,-.0776,-.0596,-.069,-.0875,-.0832,-.0812,-.1104,-.1105,-.1098,-.1145,-.1042,-.0169,.0942,.0698,.1653,.1617,.1471,.0891,-.0032,-.0432,-.1758,-.182,-.1745,-.1652,-.1541,-.1388,-.089,-.0431,-.0095,.0066,.0206,.0553,.0849,.1052,.121,.134,.147,.1629,.1767,.1817,.1825,.1894,.2038,.2164,.2265,.2357,.2508,.2648,.2693,.2693,.2904,.2751,.2659,.2622,.2601,.2549,.2468,.24,.231,.2201,.2105,.2022,.195,.1913,.1868,.1801,.1698,.1564,.1436,.1282,.1109,.0884,.0738,.0668,.0443,.0239,.0163,-.0111,-.0618,-.0823,-.079,-.0999,-.1111,-.1203,-.1369,-.1113,-.0764,-.0604,-.0697,-.0553,-.0305,-.01,-.0176,-3e-4,.0067,.0015,-.0205,.0072,.1172,.0163,.0159,-.031,-.0527,-.069,-.0554,-.063,-.0686,-.0852,-.1047,-.1052,-.1239,-.0381,.0533,.136,.1681,.1673,.1698,.1635,.1448,.1193,-.0349,-.2172,-.2006,-.1811,-.1565,-.1442,-.1202,-.0905,-.0512,-.0193,.014,.0313,.061,.0895,.1114,.1247,.1372,.1489,.1621,.1747,.1786,.1774,.1829,.1995,.217,.2317,.2426,.2543,.2608,.2595,.2581,.2845,.2726,.2651,.2571,.2484,.2406,.2369,.2374,.233,.2201,.2077,.1964,.1853,.1792,.1763,.1701,.1605,.1478,.1318,.1116,.0942,.0734,.0577,.0429,.0172,-.0109,-.0383,-.0591,-.0455,.0191,-.0207,-.1523,-.1573,-.1734,-.2038,-.1874,-.1344,-.116,-.1051,-.0898,-.0633,-.0452,-.0543,-.0541,-.0526,-.0352,.0963,.1349,.1331,.1391,.154,-.0085,-.0792,-.075,-.0717,-.0757,-.0905,-.0883,-.0833,-.0986,-.1284,-.0116,.1216,.1621,.1667,.1912,.1939,.1848,.1434,.1089,-.0199,-.1426,-.257,-.2226,-.1751,-.1457,-.1143,-.068,-.054,-.0121,.0151,.0417,.0734,.0968,.1159,.1271,.1394,.1505,.1591,.1668,.1706,.1713,.1763,.1945,.216,.2332,.2438,.2514,.2528,.249,.2475,.2808,.2738,.2666,.2549,.2425,.2332,.2288,.2315,.232,.2225,.2093,.1936,.1765,.1707,.1675,.1616,.1509,.1361,.1188,.0982,.0784,.0563,.0391,.022,-.0061,-.0308,-.0604,-.0763,-.0251,.0849,.0094,-.1244,-.2202,-.2163,-.1945,-.2483,-.1824,-.158,-.1383,-.1022,-.1038,-.0993,-.0946,-.0703,-.0687,-.001,.1426,.1532,.1706,.1677,.1535,.0734,-.0617,-.0958,-.0848,-.0727,-.0781,-.0828,-.0791,-.1029,-.1583,-.0362,.0976,.1659,.1694,.1939,.1939,.1914,.1677,.1463,.0704,-.0483,-.2388,-.2834,-.2197,-.1583,-.1183,-.0893,-.04,.0029,.0128,.0433,.0766,.0965,.1143,.1277,.1412,.1525,.1573,.1606,.1647,.1674,.1729,.1898,.2113,.2289,.2397,.2449,.2457,.2441,.2434,.2792,.2743,.2667,.2551,.2444,.2364,.2291,.2278,.2274,.2207,.2086,.1919,.179,.1724,.1664,.1568,.1416,.1234,.1071,.0897,.066,.0392,.0237,.0131,-.0085,-.0478,-.0722,-.0805,-.0772,-.0211,-.0416,-.1922,-.1418,-.0516,-.0401,-.0618,-.0381,-.0338,-.0898,-.1338,-.1612,-.0816,-.0051,.0085,-.0697,-.0434,.1214,.1511,.1723,.1708,.1258,.0302,-.1095,-.1238,-.11,-.0898,-.1084,-.0973,-.0993,-.1234,-.1471,-.0264,.0804,.1615,.1591,.1855,.1895,.1765,.1565,.1063,-1e-4,-.1011,-.2588,-.3691,-.2987,-.2084,-.1476,-.0937,-.0377,.004,.0139,.0429,.0744,.0953,.1122,.1261,.1388,.1505,.1561,.158,.1624,.167,.1735,.189,.2084,.2242,.2331,.2362,.2392,.2426,.2459,.2811,.2756,.2686,.261,.2531,.2447,.2349,.2287,.2243,.2175,.2061,.1913,.1843,.1786,.1676,.1503,.1321,.1151,.0986,.0829,.0602,.0289,.0079,-.0052,-.0186,-.0527,-.0732,-.0931,-.1433,-.1757,-.2137,-.1237,-.0485,.0324,.0964,.0713,.0884,.0918,.0131,.0042,-.0477,-.0543,.0843,.0836,-.0434,-.0304,.1142,.1548,.1513,.1439,.1396,-.0099,-.1507,-.1705,-.1629,-.1548,-.1735,-.1466,-.1377,-.1485,-.1692,-.0902,-.0252,.1039,.1537,.1643,.1519,.1648,.1524,.1253,-.007,-.169,-.3227,-.3729,-.2834,-.2167,-.1483,-.0762,-.0421,.0042,.0211,.0431,.0676,.0952,.1079,.12,.133,.1458,.1537,.1562,.1616,.1689,.1777,.1947,.2119,.2234,.2298,.2334,.2387,.2449,.2524,.286,.2779,.2714,.2673,.2621,.2527,.2424,.2328,.2246,.2154,.2023,.1884,.1847,.1783,.1622,.1405,.1231,.109,.0919,.078,.0591,.0313,.0025,-.0181,-.019,-.0546,-.0769,-.0972,-.1466,-.2122,-.2415,-.0604,.0806,.1499,.1604,.1621,.149,.1813,.1686,.1381,-.027,-.0978,-.0269,-.0173,-.1036,-.0814,-.0309,.0464,.0947,.1073,.1029,-.04,-.1863,-.2182,-.2039,-.2082,-.2062,-.1767,-.1715,-.1981,-.2149,-.2,-.0578,.0495,.1055,.1114,.1021,.1105,.1042,-.0146,-.0697,-.1973,-.3375,-.3593,-.2789,-.2121,-.1411,-.094,-.0461,-.0126,.0237,.0452,.0644,.0872,.0967,.1114,.1288,.1415,.15,.1547,.1623,.1721,.1818,.1983,.2137,.2239,.2319,.2396,.2457,.2509,.2573,.2908,.2805,.2737,.27,.2658,.2585,.2497,.2386,.2256,.2121,.1978,.1854,.1807,.1718,.156,.137,.1207,.107,.0907,.0772,.0577,.0351,.0092,-.0052,-.0198,-.0493,-.0784,-.1119,-.1737,-.2585,-.2069,-.0613,.0902,.2024,.1848,.1833,.1955,.1867,.2001,.1132,.0487,-.0694,-.1524,-.1525,-.2226,-.2427,-.1524,-.0432,-.0628,-.0381,-.0657,-.0908,-.2593,-.2736,-.2401,-.2656,-.2502,-.1985,-.1908,-.2139,-.1237,-.0435,-.0585,-.0259,-.0144,-.0234,-.0285,-.0116,-.0212,-.0852,-.2073,-.235,-.1815,-.2112,-.2717,-.1926,-.1303,-.1126,-.0638,-.017,.0196,.0431,.0604,.0795,.0921,.1102,.1277,.1382,.1451,.1513,.1609,.1724,.1833,.1988,.2145,.2267,.2383,.2485,.2553,.2592,.2615,.2905,.2799,.2742,.2714,.2677,.2615,.2532,.2421,.2274,.2106,.1964,.1854,.1775,.1671,.1524,.1368,.1225,.1073,.0904,.0759,.0563,.0383,.0178,-.0034,-.0341,-.054,-.0872,-.1422,-.2019,-.2512,-.1121,-.0319,.094,.195,.1823,.2062,.2106,.1991,.1776,.1884,.0396,-.0657,-.2181,-.3055,-.2658,-.2402,-.262,-.229,-.22,-.1854,-.2098,-.2719,-.332,-.3443,-.3249,-.315,-.3043,-.2602,-.234,-.2096,-.0476,.0707,.009,-.117,-.1914,-.1446,-.1662,-.1234,-.1448,-.2236,-.2401,-.0902,-.0357,-.0681,-.2002,-.1694,-.1218,-.0991,-.0599,-.0156,.0223,.0485,.0626,.077,.094,.1112,.1227,.1322,.1402,.1471,.1572,.1699,.1835,.2016,.2188,.2327,.2448,.2557,.264,.2692,.2701,.2836,.2752,.2723,.2719,.2707,.265,.2561,.2461,.2329,.2152,.1989,.187,.1764,.1661,.1504,.1345,.1218,.1078,.0932,.0801,.0623,.0513,.0349,.0123,-.0222,-.0608,-.1034,-.151,-.2033,-.164,-.031,.1148,.1768,.1854,.1972,.2154,.2154,.2133,.183,.1796,.1015,-.0221,-.1592,-.2951,-.2417,-.2373,-.2807,-.3295,-.367,-.3429,-.3716,-.4198,-.4031,-.4078,-.387,-.2788,-.2561,-.2667,-.2449,-.23,-.0718,.0034,-.0193,-.1193,-.2919,-.2955,-.3322,-.2927,-.3176,-.3429,-.1812,-.0298,.0636,-.0234,-.1741,-.1408,-.0983,-.0609,-.0132,.0196,.0404,.0652,.0751,.0828,.0965,.1105,.119,.1282,.1385,.1472,.1575,.1692,.1833,.2053,.2233,.2345,.2457,.2578,.2673,.2745,.2781,.2754,.2708,.2704,.2711,.2705,.2645,.2558,.2469,.236,.2203,.2043,.1904,.1773,.1672,.1522,.1363,.1242,.1154,.1051,.0932,.0734,.0629,.0474,.0248,-.0058,-.0553,-.1007,-.1742,-.2245,-.2094,-.0551,.0735,.1466,.1967,.1991,.2154,.2154,.2141,.1937,.1716,.1589,.0284,-.0888,-.2542,-.2112,-.1924,-.2452,-.3295,-.4077,-.4508,-.4655,-.4503,-.4355,-.3181,-.2197,-.1549,-.0608,-.096,-.0995,-.2205,-.1741,-.1181,-.1262,-.2228,-.346,-.3589,-.341,-.3243,-.3311,-.3467,-.2318,-.0595,-.0309,-.0439,-.177,-.1267,-.0717,-.0402,.0096,.0317,.0483,.076,.0896,.0966,.1084,.1201,.1268,.1336,.1423,.152,.163,.1732,.187,.2097,.2253,.2336,.2447,.2581,.2679,.2747,.2797,.2691,.2668,.2682,.2692,.2672,.261,.253,.2435,.2331,.2222,.2109,.1966,.1798,.169,.1563,.1433,.1316,.1234,.1155,.1059,.0868,.0729,.0545,.0319,4e-4,-.0646,-.1225,-.176,-.2392,-.2747,-.0682,.073,.1262,.1855,.1877,.2012,.2103,.2007,.1858,.1635,.1539,.0191,-.084,-.2089,-.1818,-.1833,-.2473,-.3315,-.4016,-.4512,-.4628,-.4613,-.4265,-.2467,-.0908,-.0153,.0585,.0382,-.0248,-.1295,-.2168,-.2296,-.219,-.2551,-.3222,-.3349,-.3077,-.3044,-.3417,-.3339,-.3003,-.2182,-.1672,-.1796,-.1245,-.0897,-.0549,-.0023,.0206,.0362,.0539,.0791,.0927,.1045,.1214,.1344,.1418,.146,.153,.1634,.1738,.1819,.1956,.2124,.224,.2332,.2463,.2607,.27,.2755,.2793,.2668,.2652,.2667,.2685,.2662,.2606,.2542,.2442,.232,.2235,.2166,.2037,.1856,.1721,.1592,.1485,.1391,.1287,.1191,.113,.0964,.0792,.0609,.0352,-.0014,-.0641,-.1163,-.1567,-.2034,-.2265,-.1139,.0297,.1273,.1684,.1744,.1902,.1879,.1966,.1654,.1859,.1303,-.018,-.1344,-.1349,-.1443,-.1611,-.2329,-.3202,-.3795,-.4075,-.4194,-.4328,-.3869,-.2322,-.0743,.1137,.1262,.1262,.0749,-.0318,-.1706,-.1918,-.1691,-.1939,-.2306,-.2611,-.2625,-.2682,-.299,-.3044,-.2932,-.243,-.1678,-.108,-.0908,-.0634,-.0099,.0179,.0351,.0522,.0688,.0847,.0921,.109,.1273,.1391,.1477,.1547,.1644,.1762,.1853,.1901,.1999,.2105,.2197,.2302,.2444,.2598,.2696,.2747,.2771,.2696,.2692,.2694,.2685,.2631,.2579,.255,.2469,.2338,.2231,.217,.2085,.1938,.1785,.163,.1534,.1483,.1397,.1279,.1198,.1015,.0799,.0657,.0443,.0089,-.0534,-.0888,-.1146,-.1567,-.1593,-.1881,-.0579,.0652,.1103,.1535,.1861,.1866,.187,.1447,.1137,.0153,-.0905,-.142,-.1067,-.1078,-.1521,-.204,-.2792,-.3382,-.3679,-.3661,-.3482,-.3567,-.236,-.0669,.0848,.1339,.14,.1076,-.0298,-.1411,-.1524,-.1316,-.1238,-.1458,-.1726,-.1847,-.1787,-.2286,-.265,-.2331,-.1782,-.1099,-.0763,-.0402,-.0187,.0145,.0309,.0527,.0731,.0856,.0949,.1045,.1224,.1342,.1421,.1502,.16,.1707,.1811,.1887,.1939,.2027,.21,.2176,.2258,.2382,.2547,.2668,.2728,.2745,.272,.2733,.2723,.2679,.2588,.2518,.2494,.242,.2296,.2174,.2107,.2076,.1995,.1871,.1724,.162,.158,.1514,.1393,.1266,.1072,.0869,.0774,.0608,.0339,-.008,-.0623,-.0765,-.1014,-.1073,-.1392,-.1271,-.0498,-.0288,.0906,.1813,.1274,.1209,.0215,.0095,-.0517,-.1161,-.1141,-.0894,-.0717,-.0991,-.1568,-.2441,-.2998,-.3322,-.3387,-.2989,-.2829,-.2625,-.1014,.0024,.1032,.1087,.1193,-.0308,-.1049,-.1134,-.0997,-.0801,-.0909,-.1087,-.1128,-.1207,-.1462,-.1666,-.1496,-.1133,-.0732,-.0465,.0016,.0151,.0312,.0457,.0666,.0858,.0967,.1043,.1186,.136,.1449,.1514,.1559,.1629,.1714,.1793,.1863,.1967,.2076,.214,.2186,.2246,.2347,.2489,.2635,.2747,.2783,.2736,.2753,.2749,.2696,.2595,.25,.2425,.2327,.2211,.2114,.2064,.2041,.1995,.1916,.1812,.1709,.1632,.1546,.1415,.1258,.1112,.0963,.0857,.0667,.0435,.0183,-.0107,-.0307,-.0647,-.0646,-.0829,-.1003,-.1245,-.1153,-.0329,.0197,.0196,-.0097,-.0624,-.1396,-.0841,-.0762,-.0707,-.0626,-.0717,-.0811,-.1226,-.1885,-.2516,-.2849,-.2852,-.2187,-.1745,-.2126,-.1867,-.0681,-.0301,.0083,-.0368,-.1034,-.1099,-.1048,-.1046,-.0646,-.0595,-.0668,-.062,-.0597,-.083,-.0806,-.0735,-.0584,-.0427,.0103,.0309,.0386,.0512,.0641,.079,.0941,.1051,.1146,.1302,.1424,.1521,.1587,.1592,.1612,.1675,.1742,.1812,.1964,.2097,.2181,.2242,.2315,.2388,.2489,.2656,.281,.2871,.276,.2777,.278,.2727,.2627,.2503,.2377,.2264,.2174,.2125,.2089,.2031,.195,.1873,.1823,.1773,.1672,.1534,.1399,.1276,.1195,.1047,.0868,.0707,.0511,.0374,.0261,.0097,-.0126,-.034,-.047,-.072,-.0774,-.0952,-.1095,-.096,-.0923,-.1088,-.1036,-.0895,-.0584,-.0393,-.0248,-.0467,-.0629,-.0759,-.0766,-.0994,-.1532,-.1987,-.1984,-.0684,-.032,-.0578,-.1213,-.1343,-.122,-.1024,-.1141,-.1098,-.12,-.0986,-.1015,-.081,-.0652,-.0539,-.0372,-.0317,-.0371,-.043,-.0223,-.0115,.0056,.0361,.0545,.0626,.0721,.0782,.087,.0999,.1093,.1254,.1424,.1479,.1548,.1588,.159,.1615,.1675,.1731,.1831,.1992,.2122,.2215,.2331,.2444,.2513,.2592,.2741,.2871,.2902,.2804,.2829,.2836,.2773,.2669,.2543,.2404,.2289,.2225,.2208,.2163,.2066,.1935,.1806,.1792,.1827,.1761,.1592,.1437,.1335,.1267,.116,.0968,.0822,.0706,.0597,.0498,.0363,.0203,.006,-4e-4,-.0353,-.0519,-.0487,-.0541,-.0626,-.0627,-.0668,-.0547,-.0315,-.0102,.0135,.0197,.0165,-.0088,-.0346,-.0414,-.0517,-.0839,-.1047,-.0991,-.0126,.0815,.0245,-.0999,-.1044,-.1037,-.0994,-.1199,-.1032,-.1087,-.1091,-.0828,-.0799,-.0587,-.0385,-.0401,-.0245,-.0222,.0016,.0157,.0229,.0329,.0504,.0687,.0824,.0907,.0911,.0949,.1029,.1119,.1313,.1486,.1522,.1554,.1566,.1582,.1653,.1732,.1777,.189,.2065,.2194,.2276,.2408,.2555,.2637,.2698,.2794,.2847,.2837,.288,.2889,.2891,.2835,.2747,.2644,.2532,.2431,.2371,.2337,.2268,.2151,.1989,.1817,.1783,.1848,.1824,.1668,.1506,.1405,.1327,.1225,.11,.0954,.084,.0745,.0633,.0556,.0478,.0364,.0265,.0182,.011,.0054,5e-4,.0037,-.0022,-.0054,.0014,.0145,.0329,.0432,.0444,.0438,.0307,.0193,.0114,-.0074,-.0308,-.0404,-.0434,-.0106,.0744,-2e-4,-.0675,-.074,-.0843,-.0844,-.1046,-.1098,-.0976,-.1031,-.0934,-.0749,-.0604,-.0339,-.0223,-.0055,.0083,.0293,.0452,.0526,.0558,.0676,.0864,.0994,.1065,.1077,.1079,.1126,.1239,.142,.1504,.1545,.1582,.1595,.162,.1706,.1819,.1873,.1965,.2133,.2264,.2348,.2466,.2609,.2694,.2752,.2802,.2801,.2783,.2933,.2905,.2897,.2864,.2796,.2722,.2642,.2554,.2478,.2425,.2352,.2233,.2066,.1898,.1817,.1843,.1834,.171,.1564,.1494,.1449,.1332,.1201,.1057,.0942,.0875,.0818,.0762,.0696,.0658,.0629,.0523,.0443,.0448,.042,.039,.0335,.0267,.036,.0492,.0597,.0632,.0654,.0682,.0595,.0479,.0416,.0339,.0237,.0115,-.0014,4e-4,.001,-.027,-.0385,-.0436,-.0615,-.083,-.0991,-.0985,-.0754,-.0792,-.0729,-.0418,-.0222,-.0277,-.0095,.0113,.0334,.0531,.0668,.0745,.0795,.0928,.109,.1143,.1158,.1172,.1155,.1245,.1442,.1562,.1608,.1659,.1702,.1712,.1728,.1812,.1925,.1999,.2092,.2228,.2343,.2418,.2512,.2645,.2748,.2812,.2832,.2802,.2788,.2944,.2906,.289,.2866,.2821,.2759,.2685,.2601,.2524,.2472,.2419,.2313,.2149,.2001,.1903,.1877,.1859,.1768,.1637,.1595,.1586,.1482,.133,.1213,.1078,.1011,.1031,.0983,.0889,.0883,.0884,.0773,.0687,.0681,.0638,.0578,.0546,.0547,.0601,.0707,.0765,.0727,.0756,.0842,.0823,.0712,.0646,.0626,.0596,.0499,.0437,.0382,.0329,.0306,.0208,.0051,-.0268,-.0645,-.0767,-.0787,-.0734,-.0713,-.0533,-.0444,-.0249,-.0028,.0121,.0317,.0507,.0646,.0768,.0879,.0969,.1093,.1204,.121,.1173,.1072,.1171,.1402,.1582,.1729,.1784,.1821,.1834,.1844,.1889,.1971,.2063,.2154,.2239,.234,.2439,.2495,.2563,.2682,.2795,.2852,.2846,.2808,.2804,.2992,.2966,.2938,.2889,.2821,.2752,.2683,.262,.2561,.2522,.2495,.2402,.2242,.2098,.2,.1964,.1949,.1865,.1776,.1734,.1704,.1612,.1495,.1368,.126,.117,.1196,.1218,.1156,.1162,.1154,.106,.0965,.0912,.0868,.0794,.0755,.0794,.0832,.0908,.0953,.0889,.086,.0919,.0941,.0884,.0835,.0851,.0844,.0755,.07,.067,.0622,.06,.0475,.0267,.005,-.0512,-.0623,-.0652,-.0507,-.0297,-.0214,-.0204,.0019,.0241,.0414,.0558,.0684,.0764,.0841,.0944,.1035,.1142,.1274,.1366,.1367,.1286,.1367,.1531,.1722,.1859,.1896,.1885,.1886,.193,.2025,.2123,.2225,.2319,.2374,.2435,.251,.2552,.2607,.2704,.2805,.2852,.2847,.2826,.2824,.3103,.3068,.3015,.2923,.2808,.2714,.2669,.2638,.2586,.2545,.254,.2482,.2343,.22,.211,.2067,.2061,.2024,.1922,.1865,.1789,.1684,.1577,.1465,.1387,.1419,.1438,.1444,.1398,.1401,.14,.1359,.1271,.12,.1173,.1086,.1008,.1006,.1032,.1078,.1108,.1085,.1074,.1113,.1136,.1076,.1015,.1053,.1084,.1004,.092,.0876,.0812,.0756,.0611,.0389,.0211,.005,-.0144,-.0326,-.0238,.0032,.0108,.01,.0218,.0425,.057,.0702,.0851,.0937,.0999,.1102,.1205,.1305,.1436,.1581,.1634,.1628,.1583,.1631,.1787,.1913,.1914,.1872,.187,.1938,.2061,.2196,.2321,.2419,.2463,.25,.2542,.2565,.2609,.269,.2803,.2881,.2899,.2885,.2869,.3221,.3168,.3089,.2987,.2855,.2735,.2691,.2669,.2608,.2567,.2578,.2559,.2453,.2307,.2216,.2184,.2188,.2181,.2085,.1944,.1839,.1729,.162,.1528,.1481,.1499,.1526,.1508,.1468,.1471,.1536,.1544,.1466,.1396,.1372,.1299,.1224,.1227,.1239,.1213,.1185,.1195,.1243,.1302,.1327,.1272,.1219,.1256,.1299,.1244,.1177,.1123,.1009,.0874,.0717,.0551,.0424,.0319,.0249,.0206,.0184,.024,.0304,.0344,.0474,.0574,.0653,.0826,.0986,.105,.113,.1276,.1388,.1458,.1547,.1661,.1715,.1691,.1672,.1679,.1778,.1925,.195,.1883,.188,.1957,.2075,.2214,.2343,.2441,.2489,.2527,.2545,.2552,.2591,.2673,.2815,.2942,.2989,.298,.2958,.3284,.3229,.3155,.3068,.2946,.2812,.2735,.2687,.2624,.2598,.2631,.2641,.2557,.2393,.2284,.2273,.2289,.2285,.2198,.2056,.1921,.1791,.1699,.1623,.158,.1548,.153,.1536,.1532,.1541,.1605,.1626,.1581,.1539,.15,.1444,.1404,.1391,.1398,.1367,.1333,.1376,.1433,.1443,.1432,.1401,.1383,.1386,.1377,.1347,.1337,.1303,.1187,.1052,.0955,.0846,.0723,.062,.057,.053,.0515,.056,.0618,.0679,.079,.0827,.0847,.0979,.1076,.1102,.1199,.1366,.1466,.1528,.1626,.1696,.1699,.1663,.1658,.1734,.1838,.1931,.198,.1946,.1973,.2059,.2147,.2236,.2318,.2398,.247,.2531,.2554,.2567,.2617,.2699,.2835,.2984,.3071,.309,.307,.3266,.3236,.3192,.3116,.2994,.2853,.275,.2689,.264,.2617,.2651,.2676,.2622,.2471,.235,.2332,.2352,.2341,.2252,.2131,.2025,.1931,.1832,.1752,.1681,.1622,.1589,.1602,.1614,.1618,.1635,.1644,.1628,.1619,.1586,.1544,.1524,.1499,.1495,.1494,.1512,.1583,.1618,.1566,.1525,.1531,.1546,.154,.1496,.1439,.1404,.136,.1286,.124,.123,.1158,.106,.1002,.0919,.0843,.0837,.0872,.0913,.0968,.1047,.1058,.1052,.112,.1163,.1201,.131,.1428,.1498,.1561,.1644,.1674,.1658,.1647,.1673,.1792,.1967,.2033,.2059,.209,.2135,.2191,.2229,.2253,.2276,.234,.2454,.2571,.2631,.2664,.2705,.2748,.2837,.2969,.3076,.313,.3136,.3224,.3235,.324,.3158,.3003,.285,.2748,.2704,.2677,.2641,.2645,.2667,.2653,.2561,.2446,.2408,.2415,.2363,.2254,.2173,.2138,.2108,.2034,.1898,.1795,.1737,.1717,.1708,.1704,.1688,.1676,.1677,.1667,.1667,.167,.1667,.1685,.1666,.1634,.1632,.1676,.1751,.1737,.164,.1596,.1626,.1672,.1689,.1647,.1558,.1479,.1441,.1432,.1449,.1443,.1378,.1309,.1254,.1158,.1094,.1102,.11,.112,.1185,.1252,.1259,.1267,.1299,.1284,.1296,.1361,.1424,.1493,.1576,.1659,.169,.1692,.1715,.1761,.1879,.2042,.2174,.2191,.2202,.2277,.2298,.2299,.2303,.2302,.2351,.2488,.2656,.2766,.2806,.2816,.2811,.2826,.289,.2978,.3062,.3119,.3207,.3251,.3288,.3203,.3034,.2883,.2794,.2759,.2733,.269,.2678,.269,.2699,.264,.253,.2463,.2425,.2334,.2231,.2201,.223,.2247,.2187,.2073,.196,.1897,.1888,.1846,.1807,.179,.1781,.1782,.1763,.1756,.1783,.182,.1861,.1858,.1811,.1774,.1805,.1853,.1805,.168,.1622,.1658,.172,.1757,.1736,.1654,.1574,.1542,.1549,.1554,.1541,.151,.1457,.1391,.1331,.1343,.1409,.1402,.1374,.1392,.1413,.1411,.1423,.144,.1407,.139,.142,.1456,.1526,.1634,.1747,.1812,.1827,.1832,.187,.1936,.2045,.2177,.2266,.227,.23,.2366,.2378,.2399,.2405,.2443,.2539,.2692,.2826,.2885,.2888,.2862,.2823,.2826,.289,.2986,.307,.3235,.3267,.33,.3234,.3095,.2975,.2889,.2835,.2792,.2755,.2755,.2762,.2763,.2708,.2587,.2484,.2411,.2319,.2246,.2226,.227,.2313,.2271,.2204,.215,.2105,.2059,.1974,.1915,.1914,.1932,.1964,.1961,.1928,.1914,.1935,.1951,.1932,.1891,.1862,.1869,.1875,.1806,.1688,.1635,.1663,.1715,.1758,.1769,.1747,.1704,.1664,.163,.1593,.1574,.1569,.1544,.1512,.1514,.1578,.1656,.1651,.1581,.1513,.1484,.1482,.1511,.1549,.154,.1514,.1523,.1568,.1646,.1737,.1846,.1921,.193,.1923,.1916,.194,.2012,.2135,.2265,.2316,.2323,.2377,.2453,.2474,.2495,.2526,.2572,.2671,.2797,.2877,.2891,.2871,.2838,.2839,.2909,.3001,.3082,.3301,.329,.3279,.3227,.3156,.3082,.298,.2899,.2855,.2844,.2852,.2848,.2829,.2775,.2655,.2539,.2457,.2386,.2323,.2296,.2338,.2384,.2355,.2322,.23,.2261,.22,.2115,.2066,.2065,.2073,.2119,.2151,.2108,.2042,.2019,.1998,.1963,.1949,.1946,.1938,.1921,.1841,.172,.1666,.168,.1726,.1774,.1817,.1848,.1846,.1801,.1741,.1696,.1682,.1668,.164,.1637,.1671,.1724,.1774,.1769,.1705,.1626,.1581,.1582,.1621,.1677,.1686,.1635,.1618,.1677,.1758,.1821,.1893,.1983,.1999,.1989,.1981,.1969,.2012,.2137,.227,.2351,.2394,.2445,.2505,.2555,.2569,.2589,.2621,.2691,.2808,.29,.2914,.2902,.2908,.2939,.3013,.3087,.3151,.3365,.3322,.3265,.3206,.3173,.3128,.3027,.2942,.293,.2948,.2952,.2924,.2874,.2819,.2725,.2612,.2532,.2498,.2463,.2443,.2464,.248,.2457,.2443,.2436,.2413,.2337,.2239,.22,.2188,.217,.2197,.2249,.2224,.2156,.2107,.2051,.2013,.2034,.2056,.2048,.2039,.2013,.1912,.1796,.1774,.1827,.1894,.1956,.1993,.2008,.1966,.1887,.1854,.1847,.1807,.1759,.1756,.1785,.1818,.184,.1821,.1789,.1768,.1758,.1755,.1787,.1847,.1866,.1779,.1732,.1793,.1866,.191,.1965,.2,.201,.2062,.2105,.2084,.2108,.2221,.2334,.2414,.2517,.2565,.2607,.2661,.2681,.2673,.2697,.278,.2915,.3022,.3038,.3018,.3039,.3088,.3145,.3184,.3204,.3445,.3406,.3327,.3242,.3193,.3148,.3071,.3011,.3027,.3062,.3048,.2988,.2929,.2875,.2794,.269,.2634,.2643,.2642,.2609,.2583,.2565,.2546,.2531,.2534,.2517,.2429,.2329,.2298,.2285,.2254,.2262,.2312,.2326,.2304,.2252,.2162,.2112,.2145,.2168,.2168,.2192,.2228,.2159,.2016,.1945,.1977,.2047,.2103,.2139,.2161,.2126,.2062,.2043,.2034,.1969,.1898,.1891,.1903,.1925,.193,.1871,.184,.1874,.1926,.195,.1996,.2089,.2123,.2049,.1978,.1966,.1985,.2028,.2062,.2054,.2079,.2178,.2251,.224,.2257,.234,.2433,.2516,.2607,.2705,.2721,.2738,.2776,.279,.2831,.2932,.3062,.316,.3171,.3146,.3175,.3225,.3252,.3256,.325,.3549,.3525,.3448,.3341,.3271,.3228,.3173,.3116,.3113,.3145,.3133,.3076,.3033,.2987,.2908,.2818,.2793,.2813,.2788,.2712,.2654,.2636,.2617,.2581,.2563,.2536,.2458,.239,.2364,.2347,.2324,.2351,.241,.2459,.2496,.2468,.2358,.2264,.2249,.2251,.2261,.2315,.238,.2346,.2211,.2132,.2159,.2231,.2274,.2288,.2286,.225,.2195,.2167,.2138,.2073,.2017,.1995,.1969,.1977,.1995,.1945,.1894,.1939,.2038,.2121,.2189,.2268,.2309,.229,.2239,.217,.2129,.2155,.2182,.2186,.224,.2349,.2405,.239,.2379,.2417,.2504,.2589,.265,.2731,.2793,.276,.278,.2886,.2972,.3081,.3179,.323,.3237,.3241,.3277,.3313,.3318,.3323,.3332,.3616,.3621,.3571,.3464,.3378,.333,.3276,.3202,.3167,.3185,.3188,.3164,.3143,.3114,.3048,.2975,.2951,.295,.2889,.2785,.2706,.269,.2677,.263,.258,.2536,.2492,.2461,.2442,.2436,.2436,.2466,.2529,.2599,.2654,.264,.2533,.2412,.2323,.2282,.2298,.2366,.2453,.2466,.2368,.2287,.2309,.2383,.2419,.2391,.2338,.2294,.2252,.2214,.2194,.2166,.2134,.2092,.2021,.1987,.2003,.1991,.1965,.2023,.2131,.222,.23,.2371,.24,.2412,.2402,.235,.2288,.2276,.2282,.2313,.2402,.2514,.2561,.2539,.2497,.2496,.2568,.2636,.2669,.2719,.2774,.2799,.2807,.2878,.3017,.3132,.3227,.3263,.3269,.3299,.3336,.335,.3355,.3385,.3431,.3625,.367,.366,.357,.3463,.3392,.3325,.3249,.3197,.3206,.3232,.3224,.3203,.3188,.3151,.3083,.3039,.3014,.2944,.2833,.2755,.2747,.2747,.2706,.2638,.2587,.2558,.2528,.2522,.2558,.2589,.261,.2659,.2719,.2741,.2677,.2571,.2476,.2386,.233,.2329,.2375,.246,.2519,.2491,.2436,.2443,.2477,.2477,.2427,.2363,.2344,.2327,.2282,.228,.2299,.2284,.2214,.2114,.2062,.2062,.2049,.2056,.2136,.222,.2281,.2357,.2417,.2427,.2435,.2463,.2475,.2448,.2406,.2383,.2418,.2511,.2635,.2708,.2691,.2635,.2612,.2658,.271,.2734,.2762,.2799,.285,.2881,.2883,.2955,.3106,.3218,.3274,.3297,.334,.337,.337,.3376,.3423,.3506,.3604,.3643,.3658,.3608,.3524,.345,.337,.3284,.3214,.3214,.326,.3254,.3213,.3197,.3182,.3132,.3089,.3054,.2971,.2871,.2826,.2829,.2819,.2782,.2737,.2703,.2659,.2607,.2598,.2657,.2714,.2749,.2788,.2811,.2785,.2669,.2557,.252,.2496,.2457,.2433,.2448,.2511,.2584,.2614,.2594,.2574,.2547,.2489,.2434,.2406,.2432,.2457,.2429,.241,.241,.2391,.231,.2223,.2202,.2198,.2177,.2202,.2267,.2309,.2351,.2417,.2448,.2434,.2436,.2497,.2579,.2608,.2564,.2512,.2508,.2571,.2708,.2824,.2826,.2779,.276,.2807,.2864,.2883,.2888,.2889,.2918,.2965,.2958,.2964,.3058,.3195,.3268,.331,.3354,.3368,.3364,.337,.3441,.3556,.359,.3586,.3592,.3579,.3573,.3544,.3462,.3349,.3249,.3228,.327,.3259,.3203,.3182,.3183,.3166,.3152,.3114,.3017,.2936,.292,.2905,.2872,.2846,.2838,.2822,.2766,.2698,.2677,.2733,.2801,.2852,.2883,.2871,.2818,.2706,.2605,.2583,.2596,.2586,.256,.2585,.2645,.2704,.2734,.2707,.2661,.2608,.2531,.2476,.2461,.2498,.256,.2569,.2531,.2477,.2445,.2398,.2346,.2343,.2345,.2338,.2372,.2405,.2406,.2433,.2492,.25,.2463,.2458,.2533,.2655,.2726,.2715,.2666,.2628,.2654,.2778,.2906,.2932,.2901,.2897,.297,.3045,.3054,.3029,.3004,.3014,.3055,.3084,.3062,.3092,.3206,.329,.3311,.3325,.3314,.3316,.336,.345,.3561,.3625,.3599,.3577,.3574,.362,.3643,.3574,.3455,.3342,.3302,.3318,.329,.3229,.3207,.3216,.3229,.3225,.3169,.307,.3017,.302,.3,.2957,.2933,.2932,.2916,.2859,.2794,.2764,.2812,.2889,.2941,.296,.2927,.2875,.2795,.2698,.264,.2649,.267,.2681,.2735,.279,.2805,.2796,.2755,.2708,.2678,.2615,.2556,.2532,.2563,.2628,.2664,.2627,.255,.2514,.2506,.2485,.2468,.2454,.2449,.2486,.2516,.2512,.2537,.258,.2586,.255,.2531,.2589,.2711,.281,.2837,.281,.2767,.2782,.2861,.2927,.2946,.2945,.2976,.3066,.3138,.3134,.3097,.3075,.3108,.3159,.3187,.3218,.3194,.324,.3312,.3324,.3297,.3279,.331,.3387,.3467,.3534,.3734,.3715,.3676,.3639,.3673,.371,.3663,.357,.3471,.3426,.3417,.3368,.3295,.3257,.3278,.3308,.3294,.3212,.3115,.3075,.3096,.3114,.3099,.3073,.3062,.304,.2979,.2913,.2877,.2915,.2985,.3025,.3035,.3013,.2992,.2947,.2835,.2746,.2743,.2781,.2826,.289,.2913,.2867,.2808,.2756,.2735,.2733,.2693,.2644,.2637,.2675,.2722,.272,.2668,.2609,.2602,.263,.2616,.2574,.2547,.2542,.2578,.2634,.2662,.2675,.2684,.2677,.2648,.2629,.2657,.2764,.2878,.2931,.2927,.2899,.291,.2937,.2924,.2909,.2936,.3014,.3108,.3153,.3134,.3095,.3091,.3165,.3248,.3288,.3324,.3337,.3288,.3286,.3299,.3299,.3315,.3377,.346,.3516,.3542,.3887,.3865,.3801,.3723,.3714,.3725,.3698,.365,.359,.3542,.3504,.3437,.3359,.3318,.3346,.3382,.3346,.3256,.3165,.3116,.3153,.3228,.3249,.3223,.3206,.3172,.3104,.3036,.3002,.3018,.3066,.3095,.3101,.3118,.3157,.3139,.3014,.29,.289,.2944,.3011,.3056,.3029,.2941,.2837,.2766,.2759,.276,.2733,.2706,.2715,.2754,.2785,.2746,.2679,.2668,.2726,.2778,.275,.2683,.2662,.2672,.2708,.276,.2788,.2788,.2781,.2762,.2728,.271,.2723,.2811,.2924,.2994,.3024,.3028,.3038,.303,.2971,.2921,.2931,.3022,.3119,.3132,.3089,.3057,.3085,.3181,.3274,.3325,.3379,.3405,.3374,.3291,.326,.3308,.3378,.3469,.3563,.3605,.3598,.4014,.3977,.3894,.3812,.3765,.373,.3696,.3679,.3673,.3642,.358,.349,.3398,.3362,.3403,.3432,.3392,.3318,.3236,.3187,.3237,.3323,.335,.3336,.3315,.3282,.3224,.3152,.3103,.3095,.3116,.3141,.3151,.3192,.326,.3262,.3154,.3045,.3033,.3102,.3183,.3202,.3145,.3052,.2943,.2857,.283,.2823,.2802,.2785,.2776,.2782,.2808,.2798,.2759,.278,.2886,.2947,.29,.2807,.2776,.2793,.2825,.2859,.2891,.29,.2897,.2875,.2824,.2792,.2799,.2869,.2975,.3058,.3108,.3131,.3133,.3105,.3038,.2978,.297,.3048,.3131,.3118,.3063,.3053,.3108,.3186,.3239,.3281,.3353,.3419,.3424,.3394,.3337,.3343,.3429,.3542,.364,.3681,.3653,.4054,.4019,.3976,.3932,.3868,.3784,.3711,.3688,.3719,.3731,.3668,.3552,.3435,.3395,.3443,.3474,.3451,.3402,.3335,.3296,.332,.335,.3351,.3367,.3384,.3381,.3341,.3257,.3183,.3157,.316,.317,.317,.3204,.3267,.3288,.3231,.3144,.313,.3199,.3262,.3258,.3212,.3164,.311,.3041,.2993,.2974,.2958,.2931,.2871,.2826,.2854,.2904,.2919,.2955,.3047,.3092,.3033,.2929,.2872,.2876,.2899,.2945,.3016,.3048,.3034,.2989,.2923,.2879,.2874,.2927,.3041,.3145,.3187,.3192,.3192,.3171,.3116,.3061,.3046,.3096,.3145,.3131,.311,.3141,.3214,.3251,.323,.3235,.3298,.3385,.346,.3499,.3521,.3487,.3497,.3576,.3662,.371,.3705,.4076,.4042,.4042,.4044,.3984,.388,.3782,.3731,.3766,.3797,.3736,.362,.3507,.3461,.348,.3495,.3487,.3465,.3437,.3429,.342,.3368,.3318,.3337,.3406,.3461,.3445,.3356,.3265,.3225,.322,.3215,.3199,.321,.3244,.3264,.3218,.3144,.3148,.3221,.3257,.324,.3209,.3212,.3235,.3209,.3162,.3147,.3133,.3085,.299,.2915,.2934,.3007,.3055,.3091,.3141,.3156,.3087,.2978,.2915,.2916,.2951,.3029,.3127,.3167,.3128,.3062,.2998,.2952,.2938,.2983,.3098,.3202,.3225,.3216,.3231,.3237,.3201,.3151,.311,.3113,.3142,.3162,.3204,.3279,.3367,.3387,.3332,.3296,.3325,.3416,.3538,.363,.367,.3682,.3627,.3604,.3645,.3707,.3759,.4106,.406,.4088,.4121,.4064,.3954,.3858,.3803,.3816,.3839,.3789,.3704,.3618,.3557,.3524,.3499,.3496,.3504,.3524,.3558,.3546,.3464,.3367,.3348,.3422,.3503,.3511,.3444,.3353,.3302,.33,.3291,.325,.3228,.3242,.3228,.3162,.311,.3156,.3246,.3266,.3227,.3195,.3216,.3271,.3284,.326,.326,.3257,.3213,.3124,.3045,.3035,.3071,.3103,.3119,.3157,.3167,.3094,.2986,.2933,.2944,.3005,.3101,.319,.3208,.3157,.3101,.3057,.3035,.304,.3072,.3148,.3221,.3249,.3265,.3295,.3304,.3272,.3225,.3164,.3133,.3176,.326,.3338,.3411,.3492,.3532,.3495,.3445,.3435,.3501,.3633,.3737,.3772,.3781,.3779,.3684,.3634,.3691,.3787,.4143,.4089,.4124,.4166,.4119,.4009,.3923,.387,.3851,.385,.3824,.3789,.3733,.3664,.3602,.3555,.3555,.3576,.3612,.3663,.3673,.3611,.3503,.3444,.3477,.3537,.3553,.351,.345,.3415,.3408,.3376,.3302,.3255,.3259,.3243,.3178,.3157,.324,.3324,.3323,.3259,.3212,.3224,.3278,.3309,.3299,.3297,.3304,.3286,.3227,.3155,.3102,.3094,.3103,.311,.315,.3175,.313,.3054,.3021,.3041,.31,.3165,.321,.3198,.3146,.3116,.3113,.3126,.3144,.3157,.32,.3266,.3321,.3355,.3376,.3367,.333,.3286,.3238,.3216,.3286,.3408,.3487,.3532,.3583,.3628,.3629,.3603,.357,.358,.3667,.3754,.3795,.3816,.3829,.3797,.3704,.3696,.3797,.4212,.4137,.4148,.4186,.4163,.4078,.4002,.3941,.3888,.3859,.3852,.3857,.3829,.3782,.3732,.3691,.3683,.3688,.3709,.3758,.379,.3752,.3647,.3567,.3578,.3625,.3636,.3598,.3556,.3542,.3524,.3467,.3378,.331,.3304,.3297,.3255,.3266,.3359,.3424,.3406,.3325,.3257,.3249,.3285,.3313,.3294,.3273,.3283,.328,.3251,.3206,.315,.3125,.313,.3147,.3184,.3215,.3204,.3179,.3174,.3197,.3225,.3238,.3246,.3225,.3178,.3165,.3176,.3185,.3188,.3197,.3237,.3319,.3394,.3417,.3402,.3375,.3351,.3335,.3337,.3362,.3441,.3547,.3601,.3594,.3607,.3637,.3678,.3707,.3687,.366,.3685,.3739,.3786,.3839,.3883,.3888,.3863,.3807,.3841,.4295,.4214,.42,.4226,.4218,.4159,.4092,.4037,.3983,.394,.3924,.3934,.3925,.3906,.3887,.3858,.3838,.3822,.3802,.3811,.3846,.3843,.3762,.3688,.3695,.3736,.3741,.3704,.3671,.3664,.3643,.3573,.3469,.3383,.3359,.3356,.335,.3392,.3481,.3523,.3491,.3394,.3302,.3288,.3334,.3362,.3324,.3279,.3279,.3274,.3268,.3267,.3255,.3242,.3251,.3269,.3287,.3297,.331,.3325,.3333,.3338,.335,.3356,.3357,.3341,.3308,.3294,.3295,.3269,.3232,.3238,.3277,.3348,.3424,.344,.3397,.3355,.3343,.3367,.3427,.3489,.356,.3644,.3663,.3591,.3556,.3575,.3648,.3727,.3751,.3742,.3759,.3796,.3837,.3891,.3952,.3994,.4008,.3996,.397,.4351,.429,.4277,.4298,.4305,.4265,.4201,.4153,.4118,.4086,.4062,.4047,.4027,.4024,.4022,.3991,.3962,.3933,.3864,.382,.3842,.3871,.383,.3774,.377,.38,.3802,.3774,.376,.3771,.3766,.3701,.359,.3489,.345,.345,.3468,.3513,.3567,.3578,.3529,.3436,.3366,.3365,.3418,.3458,.3427,.338,.3368,.3362,.3355,.3371,.3404,.3422,.3421,.3415,.3402,.3396,.3422,.3454,.3455,.3445,.3464,.3493,.3495,.3474,.3455,.3448,.3447,.3417,.3368,.3362,.3377,.3412,.3472,.349,.3433,.3382,.3387,.3436,.3504,.3557,.3609,.3674,.3656,.3584,.3546,.3569,.3654,.3736,.3787,.3827,.3864,.3897,.3927,.396,.4006,.4067,.4127,.415,.4145,.4393,.4369,.4358,.4371,.4402,.4389,.4321,.4263,.4241,.423,.4215,.4172,.4121,.4121,.4131,.4095,.4037,.397,.3887,.3838,.3852,.3874,.3859,.3811,.379,.381,.3814,.3789,.3784,.3823,.3862,.3827,.3736,.3633,.3575,.3567,.3587,.3611,.3623,.3598,.3535,.3478,.3459,.3468,.3502,.3541,.3548,.3534,.3534,.3534,.3503,.3489,.3527,.3562,.3561,.3532,.3499,.3487,.3518,.3558,.3557,.3546,.3559,.3584,.3577,.3537,.3519,.3524,.3553,.3565,.3552,.3556,.3549,.3538,.3563,.3563,.3509,.348,.3513,.3564,.3595,.3605,.3632,.3664,.3644,.364,.3657,.3689,.375,.3804,.385,.3912,.3962,.3992,.4014,.4021,.4046,.4117,.4208,.4239,.4225,.445,.4452,.4439,.4429,.4461,.4469,.4404,.4347,.4339,.4334,.4304,.4243,.4189,.4197,.4215,.4175,.408,.3969,.3898,.389,.392,.3946,.3932,.3866,.3808,.3804,.3806,.379,.38,.3852,.3902,.3892,.3841,.3752,.3676,.3662,.3681,.3696,.3697,.3653,.3589,.3566,.3577,.3593,.3605,.362,.365,.3671,.3684,.3688,.3644,.3588,.359,.3616,.3635,.3618,.3574,.3556,.36,.366,.3669,.3653,.3636,.3632,.3606,.355,.3524,.3555,.3622,.3675,.3699,.3715,.3683,.3639,.3648,.3658,.3639,.3645,.369,.3723,.3712,.369,.3688,.3687,.3704,.3739,.3795,.3838,.387,.3891,.3914,.3978,.4041,.4073,.4067,.4047,.4063,.4148,.4246,.4269,.4254,.4547,.4537,.4513,.4498,.4518,.4523,.4473,.443,.4428,.4405,.4343,.4276,.4244,.426,.4274,.4231,.4121,.4016,.397,.3981,.4027,.4068,.4046,.3962,.3877,.3838,.3822,.3823,.3855,.3895,.3915,.3894,.3868,.3809,.3752,.3738,.3765,.3794,.3797,.3748,.3691,.37,.3737,.3762,.3762,.3742,.3752,.3775,.3784,.3776,.3716,.3645,.3612,.3622,.3653,.3651,.3611,.3589,.365,.3736,.376,.3737,.3699,.3663,.3629,.3572,.3546,.3583,.3653,.3703,.3743,.3766,.3726,.3691,.3727,.3781,.3823,.3857,.389,.3904,.3868,.3788,.3788,.3811,.3812,.3841,.3909,.3961,.397,.3947,.393,.3978,.4062,.411,.4088,.4063,.4095,.4189,.4288,.4317,.4303,.4669,.4634,.4609,.4603,.4609,.4602,.4563,.4529,.4514,.4477,.4401,.4324,.4283,.4283,.4295,.4275,.4201,.4138,.4109,.4103,.4131,.417,.4155,.4096,.403,.3971,.3934,.3942,.3975,.3984,.3963,.3921,.3895,.3845,.382,.3814,.3852,.3897,.39,.3852,.382,.3862,.3911,.392,.3895,.3846,.3836,.3867,.3877,.3834,.3759,.3714,.3685,.3679,.3687,.3677,.3641,.3618,.3665,.3751,.3789,.3785,.3759,.3716,.3671,.3627,.362,.3644,.3661,.367,.3709,.3753,.3754,.3762,.3821,.3899,.3983,.4024,.4044,.4037,.3967,.395,.3951,.3933,.3898,.3912,.3982,.4041,.4021,.3949,.391,.3948,.4046,.4118,.4107,.4097,.4152,.4268,.4382,.4422,.4398,.4771,.4726,.47,.4686,.4679,.4663,.4639,.4622,.4595,.4549,.4465,.4369,.4302,.4265,.4273,.429,.4279,.4261,.424,.4208,.4219,.4251,.4249,.4227,.4194,.415,.4116,.4123,.4142,.412,.4061,.3999,.3967,.3909,.39,.3901,.3933,.3967,.3969,.3944,.3947,.4005,.4039,.4006,.3943,.3892,.3886,.3934,.3965,.3921,.3856,.3852,.3835,.3811,.3793,.3768,.3713,.3669,.3689,.3754,.3806,.3849,.3863,.3824,.3769,.3734,.3751,.3766,.3737,.3701,.3725,.3784,.3828,.3881,.3949,.4026,.4108,.4141,.4077,.4054,.4101,.4108,.4074,.3993,.3924,.3934,.401,.4076,.404,.396,.3942,.3999,.4102,.4185,.4179,.4157,.4218,.4353,.4465,.4499,.448,.486,.4817,.4761,.4708,.4693,.4684,.468,.4676,.4641,.4583,.4506,.4424,.4367,.4315,.4309,.4338,.4339,.4323,.4316,.4314,.4342,.4366,.4345,.4313,.4292,.4264,.4231,.4241,.4273,.427,.4201,.4117,.4082,.4031,.4034,.4022,.4018,.402,.4017,.4014,.4039,.4102,.4136,.4079,.3971,.3913,.3929,.3986,.4038,.4022,.3992,.4,.3978,.3948,.3929,.3896,.3826,.3773,.3781,.3825,.3874,.3938,.3979,.3969,.3923,.3894,.3902,.3916,.3897,.3846,.3821,.3862,.3924,.4005,.4091,.4164,.4222,.4155,.4077,.4111,.4174,.4192,.413,.4027,.397,.3995,.4072,.4132,.4103,.4046,.4063,.4153,.4258,.4325,.4305,.4255,.4302,.4424,.4505,.4522,.4525,.4954,.4913,.4832,.4753,.4729,.4726,.4724,.4711,.4673,.4626,.4579,.4533,.4493,.4437,.4428,.4461,.4444,.4407,.4413,.4453,.4491,.4482,.4417,.4365,.4339,.4309,.4272,.4285,.4346,.4384,.4333,.425,.4198,.4189,.4202,.4162,.4111,.4079,.4067,.4081,.4119,.4183,.4232,.4174,.4038,.3972,.3999,.4053,.41,.4101,.4092,.4102,.4069,.4053,.403,.3972,.3912,.39,.3923,.3948,.3975,.4018,.4059,.4072,.4041,.4014,.4032,.4078,.4094,.4034,.3967,.3983,.4055,.4149,.4233,.4276,.4211,.4103,.4111,.4151,.4207,.4222,.4159,.4079,.4072,.4131,.4217,.4267,.4232,.4181,.4206,.4312,.441,.4442,.4408,.4367,.4416,.4509,.4549,.4549,.4565,.5025,.4989,.4921,.4848,.4816,.4813,.4808,.4785,.4756,.4737,.4709,.4676,.4633,.4578,.4576,.4613,.4597,.4554,.4575,.4627,.4637,.4575,.4469,.4395,.4358,.4338,.4321,.4333,.4382,.4427,.4409,.4362,.4277,.4316,.4329,.4273,.4198,.4138,.4109,.413,.4181,.4249,.4302,.4259,.4135,.4075,.41,.4131,.4145,.412,.4107,.4129,.4109,.4109,.4074,.3993,.3952,.3997,.4052,.4063,.4063,.407,.4083,.4081,.4054,.4058,.4125,.4215,.4256,.4203,.4132,.4144,.4225,.4327,.4408,.4357,.4136,.4106,.4136,.4198,.4257,.4281,.4232,.4173,.4192,.4287,.4389,.4415,.4358,.4312,.4339,.4425,.4484,.4467,.4437,.4457,.4551,.4631,.4633,.4599,.4604,.508,.5045,.4996,.4944,.4925,.4941,.4953,.4934,.4903,.4876,.4847,.4817,.4781,.4745,.4742,.4749,.4734,.4734,.4786,.4816,.4775,.468,.4564,.4471,.4416,.4394,.4391,.439,.4402,.4441,.4461,.4439,.4362,.4402,.4397,.4337,.4265,.4203,.4156,.4156,.4201,.4268,.4319,.4314,.4242,.4191,.418,.4171,.4157,.4111,.4082,.4105,.4117,.4114,.4082,.4016,.4014,.4109,.4187,.4195,.4172,.4134,.4093,.4065,.4056,.4087,.4169,.427,.4332,.4317,.4262,.4265,.4343,.445,.4522,.4319,.4217,.4147,.4172,.4243,.4324,.4368,.4342,.4299,.4333,.4429,.4512,.4503,.4446,.4435,.4471,.4512,.4501,.4439,.4422,.4515,.4669,.4757,.4742,.4687,.4673,.5107,.5079,.5046,.5035,.506,.5109,.5135,.512,.5074,.5029,.5003,.4985,.497,.4949,.4931,.4903,.4883,.4909,.496,.4951,.4877,.4786,.4683,.4593,.4527,.448,.4452,.444,.4444,.4499,.4551,.4446,.4439,.4458,.4421,.4346,.4295,.4264,.4223,.4197,.4219,.4274,.4331,.4373,.4358,.431,.4259,.4215,.4194,.4162,.4136,.416,.4191,.415,.413,.4116,.4173,.4288,.4357,.4346,.429,.4209,.415,.4131,.4133,.415,.4214,.4318,.4409,.4441,.439,.4359,.4416,.4509,.4407,.4399,.4309,.4226,.4234,.4304,.4388,.4433,.4424,.4415,.4463,.4534,.4567,.4547,.4523,.4546,.4589,.4603,.4558,.4474,.4458,.4571,.4756,.4866,.4868,.483,.4815],waterLevel:0,waveScale:.1077134479080076,waves:["water-wave-a.png","water-wave-b.png"],adaptations:["Native terrain heights sampled at 2.4 source metres","All four treehouses, three bridges, terrain and water use the same origin and uniform scale","Only the outer 1.5 map metres blend into the shared desert edge"]};var ui={approach:{x:-1.8041071509290307,z:-9.234415682341485},shore:{x:-.4,y:.8,z:-11.2}},tr={x:-25,z:-31,width:56,depth:49},dt=(i,e,t)=>{let n=Math.max(0,Math.min(1,(t-i)/(e-i)));return n*n*(3-2*n)},Nt=(i,e,t)=>i+(e-i)*t;function gc(i,e){let t=Math.sin(i*127.1+e*311.7)*43758.5453;return t-Math.floor(t)}function nr(i,e){let t=Math.floor(i),n=Math.floor(e),s=dt(0,1,i-t),r=dt(0,1,e-n);return Nt(Nt(gc(t,n),gc(t+1,n),s),Nt(gc(t,n+1),gc(t+1,n+1),s),r)}function K3(i,e,t){let n=Math.max(0,Math.min(i.size-1,(e-i.x0)/i.step)),s=Math.max(0,Math.min(i.size-1,(t-i.z0)/i.step)),r=Math.min(i.size-2,Math.floor(n)),o=Math.min(i.size-2,Math.floor(s));return Nt(Nt(i.heights[o*i.size+r],i.heights[o*i.size+r+1],n-r),Nt(i.heights[(o+1)*i.size+r],i.heights[(o+1)*i.size+r+1],n-r),s-o)}var c0=(i,e,t,n)=>{let s=n[0]-t[0],r=n[1]-t[1],o=Math.max(0,Math.min(1,((i-t[0])*s+(e-t[1])*r)/(s*s+r*r)));return Math.hypot(i-t[0]-o*s,e-t[1]-o*r)},l0=[[-5.4,6.8],[1.7,6.7],[6.1,4.4],[7.2,-.8],[6.5,-5.9],[3,-7.1],[.6,-8.4],[-3.4,-10.2],[-5.5,-11.9],[-13.4,-11.9],[-13.1,-6.5],[-8.8,-3.2],[-7.4,2.6],[-5.4,6.8]],j3=i=>-9.69+Math.sin((i+12.25)*.35)*.65+dt(-11,-5,i)*4.8;function ud(i,e=!0){function t(r,o){let a=1/0;for(let c=1;c<l0.length;c++)a=Math.min(a,c0(r,o,l0[c-1],l0[c]));return a=Math.min(a,c0(r,o,[6.5,-5.9],[13.7,-6.5])),e&&(a=Math.min(a,c0(r,o,[ui.approach.x,ui.approach.z],[ui.shore.x,ui.shore.z]),Math.hypot(r-ui.shore.x,o-ui.shore.z)-.35)),1-dt(.36,.95,a)}function n(r,o){let a=(nr(r*.58,o*.58)-.5)*.38+(nr(r*1.5,o*1.5)-.5)*.1,c=[[0,0,8.25],[-7.79,-13.5,8.8],[7.79,-13.5,9],[15.59,0,8.9]].map(([A,I,R])=>R-Math.hypot(r-A,o-I)),l=Math.max(...c)+(nr(r*.32,o*.32)-.5)*1.5,u=Nt(-2.8,.72,dt(-2,1.8,l))-7.2*(1-dt(-9,-2,l))+a*dt(-.1,2,l);if(u<-.35){let A=-u;u=-Nt(.35+(A-.35)*.72,A,dt(3.5,10,A))}let d=2.3*Math.exp(-(((r+10)/5.5)**2+((o+20)/3.5)**2))+1.15*Math.exp(-(((r+15)/2.8)**2+((o+14)/5)**2));u+=d*dt(.5,3.2,l);let h=Math.hypot(r,o*.97),p=Math.min(...[[-3.662,.646],[-.431,-.862],[1.723,1.508],[4.093,-1.077]].map(([A,I])=>Math.hypot(r-A,o-I))),g=K3(i,r,o)-.64*dt(.65,1.5,p);u=Nt(u,g,1-dt(5.6,7.15,h));let v=j3(o),m=Math.abs(r-v),f=Nt(1.18,1.85,dt(-18,-7,o)),_=(1-dt(f,f+1.05,m))*dt(-24,-22,o)*(1-dt(-5,-2.5,o));u=Nt(u,-.66+nr(r*.8,o*.8)*.1,_);let b=dt(-7.1,-4.8,o)*(1-dt(7.2,10.3,Math.hypot((r-16)*.88,o*.8)))*dt(8.1,11,r);u=Nt(u,-1.3,b);let S=1-dt(6.05,7.45,Math.hypot(r-7.79,(o+13.5)*1.06));u=Nt(u,-1.65,S);let E=1-dt(1.03,1.6,Math.max(Math.abs(r+5.29),Math.abs(o+16.1)));u=Nt(u,.85,E);let w=Math.exp(-(((r-13.67)/1.05)**2+((o+6.69)/1.15)**2));u=Nt(u,1.04,w);let C=e?1-dt(.95,1.55,Math.hypot(r-ui.shore.x,o-ui.shore.z)):0;u=Nt(u,ui.shore.y-.04,C);let y=Math.min(r-tr.x,o-tr.z,tr.x+tr.width-r,tr.z+tr.depth-o);return Nt(-10,u,dt(0,4,y))}function s(r,o){let a=n(r,o),c=Math.hypot(r,o),l=t(r,o);return dt(.22,.7,a)*(1-l)*Nt(.57,1,nr(r*.31,o*.31))*(1-.35*(1-dt(6.2,8.1,c)))}return{heightAt:n,pathAt:t,grassAt:s}}var d0=ud(hd),dd=qt(),h0=new Map,$3={lagoon:"coast",sakura:"blossom",tidewater:"coast",punk:"scifi"},u0=i=>Math.round(i*1e6)/1e6;function _c(i){if(h0.has(i))return h0.get(i);let e=In.find(c=>c.id===i);if(!e)throw Error("Unknown original tile.");let{q:t,r:n}=e,s=Pn(t,n,ht),r=Xn(t,n,"coast-01").boundaries,o=r.map((c,l)=>{let u=dd[l],d=dd[(l+1)%6],h=[];for(let m=1;m<24;m++){let f=m/24,_=s.x+(u[0]+(d[0]-u[0])*f)*ht,b=s.z+(u[1]+(d[1]-u[1])*f)*ht;c[m]>8&&d0.pathAt(_,b)>.45&&h.push({j:m,strength:d0.pathAt(_,b)})}let p=[];for(let m of h){if(h.some(b=>b.j===m.j-1))continue;let _=h.filter(b=>b.j>=m.j&&b.j<(h.find(S=>S.j>m.j&&!h.some(E=>E.j===S.j-1))?.j??25)).sort((b,S)=>S.strength-b.strength||Math.abs(b.j-12)-Math.abs(S.j-12))[0];p.push({kind:"path",t:_.j/24,width:22,y:_.strength?c[_.j]:24})}let g=[],v=-1;for(let m=0;m<=25;m++)m<25&&c[m]<0?v<0&&(v=m):v>=0&&(g.push({start:v/24,end:(m-1)/24}),v=-1);return{kind:"authored",start:c[0]>0?"land":"water",end:c[24]>0?"land":"water",samples:[...c],waterY:0,ports:p,waterSpans:g}}),a={version:3,builtin:i,q:t,r:n,variant:`authored-${i}`,rotation:0,legacyEdges:[],radius:300,mapScale:ht,recipe:{id:`authored-${i}`,title:e.title,layout:"authored",family:$3[i],description:`Original ${e.title} host terrain and its creator content.`},slot:{origin:{x:0,y:0,z:0},regions:[{x:0,z:0,radius:250}],radius:250,height:540,floorY:0,mapRadius:7.5,mapHeight:16.2},edges:o,boundaries:r,connections:{path:"authored",water:"authored",waterY:0}};return h0.set(i,a),a}var xc=In.map(i=>_c(i.id));function fd(i){return{...i,start:i.end,end:i.start,samples:[...i.samples].reverse(),ports:[...i.ports].reverse().map(e=>({...e,t:u0(1-e.t)})),...i.waterSpans?{waterSpans:[...i.waterSpans].reverse().map(e=>({start:u0(1-e.end),end:u0(1-e.start)}))}:{}}}var io={dunes:{title:"Dunes",land:"#c9ad78",sand:"#ebd49f",rock:"#a39176",path:"#e9dac0"},oasis:{title:"Oasis",land:"#9aa778",sand:"#dccb99",rock:"#9a9c83",path:"#e3cf9d"},coast:{title:"Coast",land:"#9ba884",sand:"#e1d0ab",rock:"#87928d",path:"#e8d9b8"},pine:{title:"Pine",land:"#648674",sand:"#c9c5a7",rock:"#7f9390",path:"#d0c6a4"},meadow:{title:"Meadow",land:"#92aa7d",sand:"#d8cbaa",rock:"#909b89",path:"#e0ccaa"},highland:{title:"Highland",land:"#899783",sand:"#c6c2ac",rock:"#899394",path:"#d0c6b1"},volcanic:{title:"Volcanic",land:"#59666a",sand:"#87887b",rock:"#657074",path:"#b0a68e"},canyon:{title:"Canyon",land:"#ba8d70",sand:"#d6b18a",rock:"#a57d69",path:"#e0be92"},tundra:{title:"Tundra",land:"#b4c7be",sand:"#cbd0bf",rock:"#8d9fa0",path:"#e1deca"},blossom:{title:"Blossom",land:"#96ab8b",sand:"#d4c9b2",rock:"#8c9d93",path:"#d9c0ae"},wetland:{title:"Wetland",land:"#7a9b86",sand:"#b9b79a",rock:"#7e9690",path:"#cec7aa"},basalt:{title:"Basalt",land:"#718784",sand:"#aaa996",rock:"#667d83",path:"#c4bdad"},urban:{title:"Urban",land:"#8d9995",sand:"#bdbaa8",rock:"#75848a",path:"#cdd0c4"},industrial:{title:"Industrial",land:"#727e80",sand:"#aeb09f",rock:"#536971",path:"#bac3bc"},scifi:{title:"Sci-fi",land:"#334c59",sand:"#829b9d",rock:"#253f4d",path:"#91aeb4"}},md=[{id:"commons",title:"Open commons",description:"A connected path around one generous building green.",wet:[],rivers:[],regions:[[0,0,140]],styles:["meadow","pine","blossom","tundra"]},{id:"pass",title:"Mountain pass",description:"A sheltered building terrace between two rocky ridges.",wet:[],rivers:[],regions:[[0,0,105]],styles:["highland","canyon","volcanic","basalt"]},{id:"oasis",title:"Oasis basin",description:"A crescent pool with a dry terrace along its western bank.",wet:[],rivers:[],regions:[[-55,0,108]],styles:["dunes","oasis"]},{id:"river",title:"River crossing",description:"A broad river, two building banks and connected footbridges.",wet:[],rivers:[0,3],regions:[[0,-136,62],[0,136,62]],styles:["meadow","blossom","pine"]},{id:"bend",title:"River bend",description:"A curved channel around a sheltered inner-bank building area.",wet:[],rivers:[0,2],regions:[[-55,-73,88]],styles:["blossom","wetland","oasis"]},{id:"fork",title:"River confluence",description:"Three channels meet between three small building terraces.",wet:[],rivers:[0,2,4],regions:[[62,-107,48],[62,107,48],[-124,0,48]],styles:["wetland","pine","tundra"]},{id:"estuary",title:"River mouth",description:"An inland river opens into the sea between two banks.",wet:[0,1],rivers:[3],regions:[[-25,-126,55],[-25,126,55]],styles:["coast","wetland","basalt"]},{id:"headland",title:"Headland",description:"A broad headland with beaches on two sea-facing sides.",wet:[0,1,2],rivers:[],regions:[[-60,-35,112]],styles:["coast","pine","volcanic"]},{id:"bay",title:"Sheltered bay",description:"A curved sandy inlet beside a compact building terrace.",wet:[0,1],rivers:[],regions:[[-76,0,98]],styles:["coast","dunes","oasis"]},{id:"harbor",title:"Harbor basin",description:"A sheltered water basin framed by stone quays and a promenade.",wet:[0,1],rivers:[],regions:[[-85,0,90]],styles:["urban","industrial","basalt"]},{id:"canal",title:"Canal quarter",description:"A straight canal, paved banks and two bridge-connected plots.",wet:[],rivers:[0,3],regions:[[0,-118,60],[0,118,60]],styles:["urban","industrial","scifi"]},{id:"skyport",title:"Floating platform",description:"A suspended deck with approach bridges and cyan support rings.",wet:[],rivers:[],regions:[[0,0,120]],styles:["scifi","industrial"]}],f0=md.flatMap(i=>i.styles.map(e=>({id:`${i.id}-${e}`,layout:i.id,family:e,title:i.title,color:io[e].land,description:i.description,orientation:0}))),yc=qt(),tg=i=>Math.max(0,Math.min(1,i)),pd=i=>(i=tg(i),i*i*(3-2*i)),ng=(i,e)=>{let t=e*Math.PI/3,n=Math.cos(t),s=Math.sin(t);return[i[0]*n-i[1]*s,i[0]*s+i[1]*n]};var ig=i=>`${i.q},${i.r}`,us=i=>Math.round(i*1e6)/1e6;function sg(i,e,t){let n=i!==e?"shore":i==="water"?"sea":t?"river":"land",s=Array.from({length:25},(r,o)=>{let a=o/24;if(n==="land")return 24;if(n==="sea")return-40;if(n==="river")return us(24-56*(1-pd((Math.abs(a-.5)*300-33)/26)));let c=i==="land"?a:1-a;return us(24-64*pd((c-.28)/.44))});return{kind:n,start:i,end:e,samples:s,waterY:0,ports:n==="land"?[{kind:"path",t:.5,width:22,y:24}]:n==="shore"?[{kind:"path",t:i==="land"?.18:.82,width:22,y:24}]:[],...n==="river"?{channel:{t:.5,width:66,bedY:-32}}:{}}}var no=new Map;function rg(i,e){let t=ig({q:i,r:e});if(no.has(t))return no.get(t);let n=Pn(i,e),s=yc.map(r=>{for(let o of In){let a=Pn(o.q,o.r);for(let c=0;c<6;c++)if(Math.hypot(a.x+yc[c][0]-n.x-r[0],a.z+yc[c][1]-n.z-r[1])<.001)return Xn(o.q,o.r,"coast-01").boundaries[c][0]}return null});return no.size>512&&no.clear(),no.set(t,s),s}function vc(i,e,t,n=0,s=[]){if(!Number.isInteger(i)||!Number.isInteger(e)||ls(i,e)>99)throw Error("Invalid tile coordinate.");if(!Number.isInteger(n)||n<0||n>5)throw Error("Rotation must be 0\u20135.");if(!Array.isArray(s)||s.some(f=>!Number.isInteger(f)||f<0||f>5))throw Error("Invalid legacy adapters.");let r=f0.find(f=>f.id===t);if(!r)throw Error("Unknown tile variant.");let o=md.find(f=>f.id===r.layout),a=new Set(o.wet.map(f=>(f+n)%6)),c=new Set(o.rivers.map(f=>(f+n)%6)),l=Xn(i,e,"coast-01"),u=[...new Set([...s,...hi.flatMap(([f,_],b)=>In.some(S=>S.q===i+f&&S.r===e+_)?[b]:[])])].sort(),d=yc.map((f,_)=>sg(a.has(_)?"water":"land",a.has((_+1)%6)?"water":"land",c.has(_)));for(let f of u){let _=l.boundaries[f],b=_.map((E,w)=>({y:E,j:w})).filter(E=>E.y>8&&E.j>2&&E.j<22),S=b.sort((E,w)=>Math.abs(E.j-12)-Math.abs(w.j-12))[0];d[f]={kind:"legacy",start:_[0]>0?"land":"water",end:_[24]>0?"land":"water",samples:[..._],waterY:0,ports:S?[{kind:"path",t:S.j/24,width:18,y:S.y}]:[]}}for(let f of u){let[_,b]=hi[f],S=xc.find(E=>E.q===i+_&&E.r===e+b);S&&(d[f]=fd(S.edges[(f+3)%6]))}let h=[...rg(i,e)];for(let f of u)h[f]=d[f].samples[0],h[(f+1)%6]=d[f].samples[24];for(let f=0;f<6;f++)if(!u.includes(f))for(let[_,b]of[[0,f],[24,(f+1)%6]]){if(h[b]===null)continue;let S=h[b]-d[f].samples[_];for(let E=0;E<=4;E++)d[f].samples[_===0?E:24-E]=us(d[f].samples[_===0?E:24-E]+S*(1-E/5));d[f].samples[_]=h[b]}let p=o.regions.map(([f,_,b])=>{let S=ng([f,_],n);return{x:us(S[0]),z:us(S[1]),radius:b}}),g=o.id==="skyport"?36:24,v={x:p[0].x,y:g,z:p[0].z},m=Math.max(...p.map(f=>Math.hypot(f.x-v.x,f.z-v.z)+f.radius));return{version:3,q:i,r:e,variant:t,rotation:n,legacyEdges:u,radius:li,mapScale:ht,recipe:{...r},slot:{origin:v,regions:p,radius:us(m),height:480,floorY:g,mapRadius:us(m*ht),mapHeight:14.4},edges:d,boundaries:d.map(f=>f.samples),connections:{path:"connected",water:o.rivers.length?"connected":o.wet.length?"sea":"enclosed",waterY:0}}}var gd=i=>i?.slot?.origin||{x:0,y:i?.slot?.floorY??24,z:0};var ds=[{id:"tropical-inlet",title:"Tropical inlet",family:"tropical",base:"bay-coast",kind:"inlet",wet:[0,1],rivers:[],regions:[[-78,-35,101]],description:"A turquoise inlet, pale sand, mangrove roots and palm-lined rock gardens."},{id:"alpine-pass",title:"Alpine pass",family:"alpine",base:"pass-highland",kind:"alpine",wet:[],rivers:[],regions:[[12,4,103]],description:"An open alpine meadow between sculpted granite shoulders and evergreen groves."},{id:"desert-oasis",title:"Desert oasis",family:"dunes",base:"oasis-dunes",kind:"oasis",wet:[],rivers:[],regions:[[-70,-10,105]],description:"Warm sandstone, wind-shaped dunes and palms around a clear spring."},{id:"tidal-wetland",title:"Tidal wetland",family:"wetland",base:"fork-wetland",kind:"wetland",floor:12,wet:[],rivers:[0,2,4],regions:[[-103,0,69],[55,-115,54]],description:"Winding tidal creeks, mangrove islands and short timber crossings."},{id:"autumn-woodland",title:"Autumn woodland",family:"autumn",base:"commons-meadow",kind:"woodland",wet:[],rivers:[],regions:[[18,5,124]],description:"An open woodland clearing surrounded by amber trees, mossy stones and branching paths."},{id:"basalt-coast",title:"Basalt coast",family:"basalt",base:"headland-volcanic",kind:"basalt",wet:[0,1,2],rivers:[],regions:[[-65,-43,108]],description:"Dark columnar cliffs above a deep cove, with weathered pines and hardy shrubs."},{id:"sakura-river",title:"Sakura river",family:"blossom",base:"river-blossom",kind:"sakura",wet:[],rivers:[0,3],regions:[[-28,-131,66],[30,129,64]],description:"Cherry-lined riverbanks, a red arched bridge and two open temple gardens."},{id:"sheltered-marina",title:"Sheltered marina",family:"coast",base:"harbor-urban",kind:"marina",wet:[0,1],rivers:[],regions:[[-109,0,94]],description:"A protected harbor with timber pontoons, a boulder breakwater and an open waterfront plot."},{id:"canal-quarter",title:"Canal quarter",family:"urban",base:"canal-urban",kind:"canal",wet:[],rivers:[0,3],regions:[[0,-130,67],[0,130,67]],description:"A navigable canal between clean stone quays, a masonry bridge and tree-lined streets."},{id:"coastal-terraces",title:"Coastal terraces",family:"limestone",base:"headland-coast",kind:"terraces",wet:[0,1,2],rivers:[],regions:[[-55,-60,99,49]],description:"Limestone terraces, broad stairs, cypress trees and a small rocky cove."},{id:"industrial-docks",title:"Industrial docks",family:"industrial",base:"harbor-industrial",kind:"docks",wet:[0,1],rivers:[],regions:[[-103,-8,90]],description:"A concrete working quay with cargo stacks, fenders, service rails and deep harbor water."},{id:"garden-boulevard",title:"Garden boulevard",family:"urban",base:"commons-meadow",kind:"boulevard",wet:[],rivers:[],regions:[[-128,-132,54],[128,-132,54],[107,135,56]],description:"An asphalt boulevard, generous paved plots, rain gardens and planted sidewalks."},{id:"circuit-deck",title:"Circuit deck",family:"scifi",base:"skyport-scifi",kind:"circuit",floating:!0,wet:[0,1,2,3,4,5],rivers:[],floor:84,regions:[[0,0,154,84]],description:"A charcoal floating deck with an oval race loop, teleport pads and cyan ring engines."},{id:"neon-docks",title:"Neon docks",family:"scifi",base:"skyport-scifi",kind:"neon",floating:!0,wet:[0,1,2,3,4,5],rivers:[],floor:84,regions:[[-31,-30,137,84]],description:"An asymmetric suspended dock, a service road and a broad open city deck."},{id:"sky-terraces",title:"Sky terraces",family:"scifi",base:"skyport-scifi",kind:"sky",floating:!0,wet:[0,1,2,3,4,5],rivers:[],floor:108,regions:[[-81,-78,86,108],[92,128,52,74]],description:"Two floating city terraces joined by a wide supported ramp, with pocket gardens."}],so={tropical:{title:"Tropical",land:"#769052",sand:"#e2d4af",rock:"#92958a",path:"#dbca9e"},alpine:{title:"Alpine",land:"#839265",sand:"#bcb696",rock:"#92928b",path:"#c9b890"},autumn:{title:"Autumn",land:"#8a9261",sand:"#b8a482",rock:"#898d7b",path:"#c9b38d"},limestone:{title:"Limestone",land:"#cabf9d",sand:"#dfd0ac",rock:"#b4ae96",path:"#e1d5b7"}},Mc=ds.map(i=>({id:i.id,layout:i.id,family:i.family,title:i.title,description:i.description,orientation:0,color:so[i.family]?.land||"#8b9b7a"}));var oo=(i,e)=>{let t=e*Math.PI/3,n=Math.cos(t),s=Math.sin(t);return[i[0]*n-i[1]*s,i[0]*s+i[1]*n]},iy=qt(),ro=i=>Math.round(i*1e6)/1e6;function _d(i,e,t,n=0,s=[]){let r=ds.find(h=>h.id===t);if(!r)throw Error("Unknown tile design.");let o=vc(i,e,r.base,n,s),a=o.edges.map(h=>structuredClone(h));if(r.floating){for(let h=0;h<6;h++)o.legacyEdges.includes(h)||(a[h]={kind:"sea",start:"water",end:"water",samples:Array(25).fill(-40),waterY:0,ports:[]});for(let h of o.legacyEdges)for(let[p,g,v]of[[(h+5)%6,24,a[h].samples[0]],[(h+1)%6,0,a[h].samples[24]]]){if(o.legacyEdges.includes(p))continue;let m=a[p];for(let f=0;f<5;f++)m.samples[g===0?f:24-f]=ro(-40+(v+40)*(1-f/5));m.samples[g]=v,m[g===0?"start":"end"]=v>0?"land":"water"}}let c=r.floor??24,l=r.regions.map(([h,p,g,v=c])=>{let m=oo([h,p],n);return{x:ro(m[0]),z:ro(m[1]),radius:g,floorY:v}}),u={x:l[0].x,y:l[0].floorY,z:l[0].z},d=Math.max(...l.map(h=>Math.hypot(h.x-u.x,h.z-u.z)+h.radius));return{...o,version:4,variant:t,recipe:{...Mc.find(h=>h.id===t),kind:r.kind,floating:!!r.floating},slot:{origin:u,regions:l,radius:ro(d),height:480,floorY:c,mapRadius:ro(d*ht),mapHeight:14.4},edges:a,boundaries:a.map(h=>h.samples),connections:{path:r.floating?"deck-and-teleport":"connected",water:r.floating?"open-sea":r.rivers.length?"connected":r.wet.length?"sea":"enclosed",waterY:0},navigation:{minimumWidth:42,minimumDepth:10,minimumClearance:16,protectedBuildAreas:!0},art:{kit:"host-designs-1",seed:ds.indexOf(r)+103}}}function m0({bytes:i,size:e}){let t=new Ti(i,e,e,Zs,Wt);return t.generateMipmaps=!0,t.minFilter=hn,t.magFilter=gt,t.needsUpdate=!0,t}function g0(i,e,{finish:t="natural",pathColor:n="#c8b792",sand:s="#d4c4a0"}={}){let r=i.onBeforeCompile;i.hostPathTexture=e,i.userData.hostSurface={kind:"terrain",finish:t,pathColor:n,sand:s},i.onBeforeCompile=o=>{r(o),o.uniforms.uHostPaths={value:e},o.uniforms.uHostPathColor={value:new ge(n)},o.vertexShader=`varying vec2 vHostPathUv;
`+o.vertexShader.replace("#include <begin_vertex>",`#include <begin_vertex>
vHostPathUv=position.xz*uTerrainScale/18.+.5;`),o.fragmentShader=`varying vec2 vHostPathUv;uniform sampler2D uHostPaths;uniform vec3 uHostPathColor;
`+o.fragmentShader;let a=t==="paved"?"vec2 pave=vHostPathUv*vec2(110.,110.);vec2 f=fract(pave);vec2 aa=max(fwidth(pave),vec2(.01));vec2 joint=smoothstep(vec2(.016),vec2(.016)+aa,min(f,1.-f));diffuseColor.rgb*=.92+.08*min(joint.x,joint.y);":"";o.fragmentShader=o.fragmentShader.replace("float grain=mapNoise(vGround.xz*35.);",`float hostPath=texture2D(uHostPaths,vHostPathUv).r*smoothstep(.29,.62,vGround.y);diffuseColor.rgb=mix(diffuseColor.rgb,uHostPathColor,hostPath*.86);${a}
float grain=mapNoise(vGround.xz*35.);`)},i.customProgramCacheKey=()=>`threetopia-host-ground-4-${t}`}function xd(i,e=!0){let t=new Zt;t.name=i.name,t.userData.contract=i.contract;for(let n of i.meshes){let s=new Rt;for(let[a,c]of Object.entries(n.attributes))s.setAttribute(a,new mt(c.array,c.itemSize,c.normalized));n.index&&s.setIndex(new mt(n.index,1));let r=n.materials.map(a=>{if(a.userData?.hostSurface){let l=a.userData.hostSurface,u=r0(l.kind,e?1:.03,l.sand);return l.kind==="terrain"&&i.pathMask&&g0(u,m0(i.pathMask),l),u}if(!a.userData?.terrain)return new Or().parse(a);let c=eo(e?1:.03,a.userData.sandColor);return c.side=a.side,c}),o=new Je(s,n.arrayMaterial?r:r[0]);o.name=n.name,o.visible=n.visible!==!1,o.userData=n.userData||{},o.matrix.fromArray(n.matrix),o.matrix.decompose(o.position,o.quaternion,o.scale),o.castShadow=n.castShadow,o.receiveShadow=n.receiveShadow,o.customDepthMaterial=s0(n.materials[0]?.userData?.hostSurface?.kind,e?1:.03),t.add(o)}return t}function yd(){let i=new dc(new Worker(new URL("./registry-host.worker.js",import.meta.url),{type:"module"}));return{async load(e,t={map:!0}){let n=await i.run({contract:e,options:t});return n?xd(n,t.map):null},dispose(){i.dispose()}}}var vd={type:"change"},x0={type:"start"},bd={type:"end"},Sc=new ni,Md=new mn,cg=Math.cos(70*jr.DEG2RAD),Ut=new L,tn=2*Math.PI,it={NONE:-1,ROTATE:0,DOLLY:1,PAN:2,TOUCH_ROTATE:3,TOUCH_PAN:4,TOUCH_DOLLY_PAN:5,TOUCH_DOLLY_ROTATE:6},_0=1e-6,Tc=class extends kr{constructor(e,t=null){super(e,t),this.state=it.NONE,this.target=new L,this.cursor=new L,this.minDistance=0,this.maxDistance=1/0,this.minZoom=0,this.maxZoom=1/0,this.minTargetRadius=0,this.maxTargetRadius=1/0,this.minPolarAngle=0,this.maxPolarAngle=Math.PI,this.minAzimuthAngle=-1/0,this.maxAzimuthAngle=1/0,this.enableDamping=!1,this.dampingFactor=.05,this.enableZoom=!0,this.zoomSpeed=1,this.enableRotate=!0,this.rotateSpeed=1,this.keyRotateSpeed=1,this.enablePan=!0,this.panSpeed=1,this.screenSpacePanning=!0,this.keyPanSpeed=7,this.zoomToCursor=!1,this.autoRotate=!1,this.autoRotateSpeed=2,this.keys={LEFT:"ArrowLeft",UP:"ArrowUp",RIGHT:"ArrowRight",BOTTOM:"ArrowDown"},this.mouseButtons={LEFT:Ci.ROTATE,MIDDLE:Ci.DOLLY,RIGHT:Ci.PAN},this.touches={ONE:Ii.ROTATE,TWO:Ii.DOLLY_PAN},this.target0=this.target.clone(),this.position0=this.object.position.clone(),this.zoom0=this.object.zoom,this._cursorStyle="auto",this._domElementKeyEvents=null,this._lastPosition=new L,this._lastQuaternion=new Gt,this._lastTargetPosition=new L,this._quat=new Gt().setFromUnitVectors(e.up,new L(0,1,0)),this._quatInverse=this._quat.clone().invert(),this._spherical=new Gs,this._sphericalDelta=new Gs,this._scale=1,this._panOffset=new L,this._rotateStart=new be,this._rotateEnd=new be,this._rotateDelta=new be,this._panStart=new be,this._panEnd=new be,this._panDelta=new be,this._dollyStart=new be,this._dollyEnd=new be,this._dollyDelta=new be,this._dollyDirection=new L,this._mouse=new be,this._performCursorZoom=!1,this._pointers=[],this._pointerPositions={},this._controlActive=!1,this._onPointerMove=hg.bind(this),this._onPointerDown=lg.bind(this),this._onPointerUp=ug.bind(this),this._onContextMenu=xg.bind(this),this._onMouseWheel=pg.bind(this),this._onKeyDown=mg.bind(this),this._onTouchStart=gg.bind(this),this._onTouchMove=_g.bind(this),this._onMouseDown=dg.bind(this),this._onMouseMove=fg.bind(this),this._interceptControlDown=yg.bind(this),this._interceptControlUp=vg.bind(this),this.domElement!==null&&this.connect(this.domElement),this.update()}set cursorStyle(e){this._cursorStyle=e,e==="grab"?this.domElement.style.cursor="grab":this.domElement.style.cursor="auto"}get cursorStyle(){return this._cursorStyle}connect(e){super.connect(e),this.domElement.addEventListener("pointerdown",this._onPointerDown),this.domElement.addEventListener("pointercancel",this._onPointerUp),this.domElement.addEventListener("contextmenu",this._onContextMenu),this.domElement.addEventListener("wheel",this._onMouseWheel,{passive:!1}),this.domElement.getRootNode().addEventListener("keydown",this._interceptControlDown,{passive:!0,capture:!0}),this.domElement.style.touchAction="none"}disconnect(){this.domElement.removeEventListener("pointerdown",this._onPointerDown),this.domElement.ownerDocument.removeEventListener("pointermove",this._onPointerMove),this.domElement.ownerDocument.removeEventListener("pointerup",this._onPointerUp),this.domElement.removeEventListener("pointercancel",this._onPointerUp),this.domElement.removeEventListener("wheel",this._onMouseWheel),this.domElement.removeEventListener("contextmenu",this._onContextMenu),this.stopListenToKeyEvents(),this.domElement.getRootNode().removeEventListener("keydown",this._interceptControlDown,{capture:!0}),this.domElement.style.touchAction=""}dispose(){this.disconnect()}getPolarAngle(){return this._spherical.phi}getAzimuthalAngle(){return this._spherical.theta}getDistance(){return this.object.position.distanceTo(this.target)}listenToKeyEvents(e){e.addEventListener("keydown",this._onKeyDown),this._domElementKeyEvents=e}stopListenToKeyEvents(){this._domElementKeyEvents!==null&&(this._domElementKeyEvents.removeEventListener("keydown",this._onKeyDown),this._domElementKeyEvents=null)}saveState(){this.target0.copy(this.target),this.position0.copy(this.object.position),this.zoom0=this.object.zoom}reset(){this.target.copy(this.target0),this.object.position.copy(this.position0),this.object.zoom=this.zoom0,this.object.updateProjectionMatrix(),this.dispatchEvent(vd),this.update(),this.state=it.NONE}pan(e,t){this._pan(e,t),this.update()}dollyIn(e){this._dollyIn(e),this.update()}dollyOut(e){this._dollyOut(e),this.update()}rotateLeft(e){this._rotateLeft(e),this.update()}rotateUp(e){this._rotateUp(e),this.update()}update(e=null){let t=this.object.position;Ut.copy(t).sub(this.target),Ut.applyQuaternion(this._quat),this._spherical.setFromVector3(Ut),this.autoRotate&&this.state===it.NONE&&this._rotateLeft(this._getAutoRotationAngle(e)),this.enableDamping?(this._spherical.theta+=this._sphericalDelta.theta*this.dampingFactor,this._spherical.phi+=this._sphericalDelta.phi*this.dampingFactor):(this._spherical.theta+=this._sphericalDelta.theta,this._spherical.phi+=this._sphericalDelta.phi);let n=this.minAzimuthAngle,s=this.maxAzimuthAngle;isFinite(n)&&isFinite(s)&&(n<-Math.PI?n+=tn:n>Math.PI&&(n-=tn),s<-Math.PI?s+=tn:s>Math.PI&&(s-=tn),n<=s?this._spherical.theta=Math.max(n,Math.min(s,this._spherical.theta)):this._spherical.theta=this._spherical.theta>(n+s)/2?Math.max(n,this._spherical.theta):Math.min(s,this._spherical.theta)),this._spherical.phi=Math.max(this.minPolarAngle,Math.min(this.maxPolarAngle,this._spherical.phi)),this._spherical.makeSafe(),this.enableDamping===!0?this.target.addScaledVector(this._panOffset,this.dampingFactor):this.target.add(this._panOffset),this.target.sub(this.cursor),this.target.clampLength(this.minTargetRadius,this.maxTargetRadius),this.target.add(this.cursor);let r=!1;if(this.zoomToCursor&&this._performCursorZoom||this.object.isOrthographicCamera)this._spherical.radius=this._clampDistance(this._spherical.radius);else{let o=this._spherical.radius;this._spherical.radius=this._clampDistance(this._spherical.radius*this._scale),r=o!=this._spherical.radius}if(Ut.setFromSpherical(this._spherical),Ut.applyQuaternion(this._quatInverse),t.copy(this.target).add(Ut),this.object.lookAt(this.target),this.enableDamping===!0?(this._sphericalDelta.theta*=1-this.dampingFactor,this._sphericalDelta.phi*=1-this.dampingFactor,this._panOffset.multiplyScalar(1-this.dampingFactor)):(this._sphericalDelta.set(0,0,0),this._panOffset.set(0,0,0)),this.zoomToCursor&&this._performCursorZoom){let o=null;if(this.object.isPerspectiveCamera){let a=Ut.length();o=this._clampDistance(a*this._scale);let c=a-o;this.object.position.addScaledVector(this._dollyDirection,c),this.object.updateMatrixWorld(),r=!!c}else if(this.object.isOrthographicCamera){let a=new L(this._mouse.x,this._mouse.y,0);a.unproject(this.object);let c=this.object.zoom;this.object.zoom=Math.max(this.minZoom,Math.min(this.maxZoom,this.object.zoom/this._scale)),this.object.updateProjectionMatrix(),r=c!==this.object.zoom;let l=new L(this._mouse.x,this._mouse.y,0);l.unproject(this.object),this.object.position.sub(l).add(a),this.object.updateMatrixWorld(),o=Ut.length()}else console.warn("WARNING: OrbitControls.js encountered an unknown camera type - zoom to cursor disabled."),this.zoomToCursor=!1;o!==null&&(this.screenSpacePanning?this.target.set(0,0,-1).transformDirection(this.object.matrix).multiplyScalar(o).add(this.object.position):(Sc.origin.copy(this.object.position),Sc.direction.set(0,0,-1).transformDirection(this.object.matrix),Math.abs(this.object.up.dot(Sc.direction))<cg?this.object.lookAt(this.target):(Md.setFromNormalAndCoplanarPoint(this.object.up,this.target),Sc.intersectPlane(Md,this.target))))}else if(this.object.isOrthographicCamera){let o=this.object.zoom;this.object.zoom=Math.max(this.minZoom,Math.min(this.maxZoom,this.object.zoom/this._scale)),o!==this.object.zoom&&(this.object.updateProjectionMatrix(),r=!0)}return this._scale=1,this._performCursorZoom=!1,r||this._lastPosition.distanceToSquared(this.object.position)>_0||8*(1-this._lastQuaternion.dot(this.object.quaternion))>_0||this._lastTargetPosition.distanceToSquared(this.target)>_0?(this.dispatchEvent(vd),this._lastPosition.copy(this.object.position),this._lastQuaternion.copy(this.object.quaternion),this._lastTargetPosition.copy(this.target),!0):!1}_getAutoRotationAngle(e){return e!==null?tn/60*this.autoRotateSpeed*e:tn/60/60*this.autoRotateSpeed}_getZoomScale(e){let t=Math.abs(e*.01);return Math.pow(.95,this.zoomSpeed*t)}_rotateLeft(e){this._sphericalDelta.theta-=e}_rotateUp(e){this._sphericalDelta.phi-=e}_panLeft(e,t){Ut.setFromMatrixColumn(t,0),Ut.multiplyScalar(-e),this._panOffset.add(Ut)}_panUp(e,t){this.screenSpacePanning===!0?Ut.setFromMatrixColumn(t,1):(Ut.setFromMatrixColumn(t,0),Ut.crossVectors(this.object.up,Ut)),Ut.multiplyScalar(e),this._panOffset.add(Ut)}_pan(e,t){let n=this.domElement;if(this.object.isPerspectiveCamera){let s=this.object.position;Ut.copy(s).sub(this.target);let r=Ut.length();r*=Math.tan(this.object.fov/2*Math.PI/180),this._panLeft(2*e*r/n.clientHeight,this.object.matrix),this._panUp(2*t*r/n.clientHeight,this.object.matrix)}else this.object.isOrthographicCamera?(this._panLeft(e*(this.object.right-this.object.left)/this.object.zoom/n.clientWidth,this.object.matrix),this._panUp(t*(this.object.top-this.object.bottom)/this.object.zoom/n.clientHeight,this.object.matrix)):(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - pan disabled."),this.enablePan=!1)}_dollyOut(e){this.object.isPerspectiveCamera||this.object.isOrthographicCamera?this._scale/=e:(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled."),this.enableZoom=!1)}_dollyIn(e){this.object.isPerspectiveCamera||this.object.isOrthographicCamera?this._scale*=e:(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled."),this.enableZoom=!1)}_updateZoomParameters(e,t){if(!this.zoomToCursor)return;this._performCursorZoom=!0;let n=this.domElement.getBoundingClientRect(),s=e-n.left,r=t-n.top,o=n.width,a=n.height;this._mouse.x=s/o*2-1,this._mouse.y=-(r/a)*2+1,this._dollyDirection.set(this._mouse.x,this._mouse.y,1).unproject(this.object).sub(this.object.position).normalize()}_clampDistance(e){return Math.max(this.minDistance,Math.min(this.maxDistance,e))}_handleMouseDownRotate(e){this._rotateStart.set(e.clientX,e.clientY)}_handleMouseDownDolly(e){this._updateZoomParameters(e.clientX,e.clientX),this._dollyStart.set(e.clientX,e.clientY)}_handleMouseDownPan(e){this._panStart.set(e.clientX,e.clientY)}_handleMouseMoveRotate(e){this._rotateEnd.set(e.clientX,e.clientY),this._rotateDelta.subVectors(this._rotateEnd,this._rotateStart).multiplyScalar(this.rotateSpeed);let t=this.domElement;this._rotateLeft(tn*this._rotateDelta.x/t.clientHeight),this._rotateUp(tn*this._rotateDelta.y/t.clientHeight),this._rotateStart.copy(this._rotateEnd),this.update()}_handleMouseMoveDolly(e){this._dollyEnd.set(e.clientX,e.clientY),this._dollyDelta.subVectors(this._dollyEnd,this._dollyStart),this._dollyDelta.y>0?this._dollyOut(this._getZoomScale(this._dollyDelta.y)):this._dollyDelta.y<0&&this._dollyIn(this._getZoomScale(this._dollyDelta.y)),this._dollyStart.copy(this._dollyEnd),this.update()}_handleMouseMovePan(e){this._panEnd.set(e.clientX,e.clientY),this._panDelta.subVectors(this._panEnd,this._panStart).multiplyScalar(this.panSpeed),this._pan(this._panDelta.x,this._panDelta.y),this._panStart.copy(this._panEnd),this.update()}_handleMouseWheel(e){this._updateZoomParameters(e.clientX,e.clientY),e.deltaY<0?this._dollyIn(this._getZoomScale(e.deltaY)):e.deltaY>0&&this._dollyOut(this._getZoomScale(e.deltaY)),this.update()}_handleKeyDown(e){let t=!1;switch(e.code){case this.keys.UP:e.ctrlKey||e.metaKey||e.shiftKey?this.enableRotate&&this._rotateUp(tn*this.keyRotateSpeed/this.domElement.clientHeight):this.enablePan&&this._pan(0,this.keyPanSpeed),t=!0;break;case this.keys.BOTTOM:e.ctrlKey||e.metaKey||e.shiftKey?this.enableRotate&&this._rotateUp(-tn*this.keyRotateSpeed/this.domElement.clientHeight):this.enablePan&&this._pan(0,-this.keyPanSpeed),t=!0;break;case this.keys.LEFT:e.ctrlKey||e.metaKey||e.shiftKey?this.enableRotate&&this._rotateLeft(tn*this.keyRotateSpeed/this.domElement.clientHeight):this.enablePan&&this._pan(this.keyPanSpeed,0),t=!0;break;case this.keys.RIGHT:e.ctrlKey||e.metaKey||e.shiftKey?this.enableRotate&&this._rotateLeft(-tn*this.keyRotateSpeed/this.domElement.clientHeight):this.enablePan&&this._pan(-this.keyPanSpeed,0),t=!0;break}t&&(e.preventDefault(),this.update())}_handleTouchStartRotate(e){if(this._pointers.length===1)this._rotateStart.set(e.pageX,e.pageY);else{let t=this._getSecondPointerPosition(e),n=.5*(e.pageX+t.x),s=.5*(e.pageY+t.y);this._rotateStart.set(n,s)}}_handleTouchStartPan(e){if(this._pointers.length===1)this._panStart.set(e.pageX,e.pageY);else{let t=this._getSecondPointerPosition(e),n=.5*(e.pageX+t.x),s=.5*(e.pageY+t.y);this._panStart.set(n,s)}}_handleTouchStartDolly(e){let t=this._getSecondPointerPosition(e),n=e.pageX-t.x,s=e.pageY-t.y,r=Math.sqrt(n*n+s*s);this._dollyStart.set(0,r)}_handleTouchStartDollyPan(e){this.enableZoom&&this._handleTouchStartDolly(e),this.enablePan&&this._handleTouchStartPan(e)}_handleTouchStartDollyRotate(e){this.enableZoom&&this._handleTouchStartDolly(e),this.enableRotate&&this._handleTouchStartRotate(e)}_handleTouchMoveRotate(e){if(this._pointers.length==1)this._rotateEnd.set(e.pageX,e.pageY);else{let n=this._getSecondPointerPosition(e),s=.5*(e.pageX+n.x),r=.5*(e.pageY+n.y);this._rotateEnd.set(s,r)}this._rotateDelta.subVectors(this._rotateEnd,this._rotateStart).multiplyScalar(this.rotateSpeed);let t=this.domElement;this._rotateLeft(tn*this._rotateDelta.x/t.clientHeight),this._rotateUp(tn*this._rotateDelta.y/t.clientHeight),this._rotateStart.copy(this._rotateEnd)}_handleTouchMovePan(e){if(this._pointers.length===1)this._panEnd.set(e.pageX,e.pageY);else{let t=this._getSecondPointerPosition(e),n=.5*(e.pageX+t.x),s=.5*(e.pageY+t.y);this._panEnd.set(n,s)}this._panDelta.subVectors(this._panEnd,this._panStart).multiplyScalar(this.panSpeed),this._pan(this._panDelta.x,this._panDelta.y),this._panStart.copy(this._panEnd)}_handleTouchMoveDolly(e){let t=this._getSecondPointerPosition(e),n=e.pageX-t.x,s=e.pageY-t.y,r=Math.sqrt(n*n+s*s);this._dollyEnd.set(0,r),this._dollyDelta.set(0,Math.pow(this._dollyEnd.y/this._dollyStart.y,this.zoomSpeed)),this._dollyOut(this._dollyDelta.y),this._dollyStart.copy(this._dollyEnd);let o=(e.pageX+t.x)*.5,a=(e.pageY+t.y)*.5;this._updateZoomParameters(o,a)}_handleTouchMoveDollyPan(e){this.enableZoom&&this._handleTouchMoveDolly(e),this.enablePan&&this._handleTouchMovePan(e)}_handleTouchMoveDollyRotate(e){this.enableZoom&&this._handleTouchMoveDolly(e),this.enableRotate&&this._handleTouchMoveRotate(e)}_addPointer(e){this._pointers.push(e.pointerId)}_removePointer(e){delete this._pointerPositions[e.pointerId];for(let t=0;t<this._pointers.length;t++)if(this._pointers[t]==e.pointerId){this._pointers.splice(t,1);return}}_isTrackingPointer(e){for(let t=0;t<this._pointers.length;t++)if(this._pointers[t]==e.pointerId)return!0;return!1}_trackPointer(e){let t=this._pointerPositions[e.pointerId];t===void 0&&(t=new be,this._pointerPositions[e.pointerId]=t),t.set(e.pageX,e.pageY)}_getSecondPointerPosition(e){let t=e.pointerId===this._pointers[0]?this._pointers[1]:this._pointers[0];return this._pointerPositions[t]}_customWheelEvent(e){let t=e.deltaMode,n={clientX:e.clientX,clientY:e.clientY,deltaY:e.deltaY};switch(t){case 1:n.deltaY*=16;break;case 2:n.deltaY*=100;break}return e.ctrlKey&&!this._controlActive&&(n.deltaY*=10),n}};function lg(i){this.enabled!==!1&&(this._pointers.length===0&&(this.domElement.setPointerCapture(i.pointerId),this.domElement.ownerDocument.addEventListener("pointermove",this._onPointerMove),this.domElement.ownerDocument.addEventListener("pointerup",this._onPointerUp)),!this._isTrackingPointer(i)&&(this._addPointer(i),i.pointerType==="touch"?this._onTouchStart(i):this._onMouseDown(i),this._cursorStyle==="grab"&&(this.domElement.style.cursor="grabbing")))}function hg(i){this.enabled!==!1&&(i.pointerType==="touch"?this._onTouchMove(i):this._onMouseMove(i))}function ug(i){switch(this._removePointer(i),this._pointers.length){case 0:this.domElement.releasePointerCapture(i.pointerId),this.domElement.ownerDocument.removeEventListener("pointermove",this._onPointerMove),this.domElement.ownerDocument.removeEventListener("pointerup",this._onPointerUp),this.dispatchEvent(bd),this.state=it.NONE,this._cursorStyle==="grab"&&(this.domElement.style.cursor="grab");break;case 1:let e=this._pointers[0],t=this._pointerPositions[e];this._onTouchStart({pointerId:e,pageX:t.x,pageY:t.y});break}}function dg(i){let e;switch(i.button){case 0:e=this.mouseButtons.LEFT;break;case 1:e=this.mouseButtons.MIDDLE;break;case 2:e=this.mouseButtons.RIGHT;break;default:e=-1}switch(e){case Ci.DOLLY:if(this.enableZoom===!1)return;this._handleMouseDownDolly(i),this.state=it.DOLLY;break;case Ci.ROTATE:if(i.ctrlKey||i.metaKey||i.shiftKey){if(this.enablePan===!1)return;this._handleMouseDownPan(i),this.state=it.PAN}else{if(this.enableRotate===!1)return;this._handleMouseDownRotate(i),this.state=it.ROTATE}break;case Ci.PAN:if(i.ctrlKey||i.metaKey||i.shiftKey){if(this.enableRotate===!1)return;this._handleMouseDownRotate(i),this.state=it.ROTATE}else{if(this.enablePan===!1)return;this._handleMouseDownPan(i),this.state=it.PAN}break;default:this.state=it.NONE}this.state!==it.NONE&&this.dispatchEvent(x0)}function fg(i){switch(this.state){case it.ROTATE:if(this.enableRotate===!1)return;this._handleMouseMoveRotate(i);break;case it.DOLLY:if(this.enableZoom===!1)return;this._handleMouseMoveDolly(i);break;case it.PAN:if(this.enablePan===!1)return;this._handleMouseMovePan(i);break}}function pg(i){this.enabled===!1||this.enableZoom===!1||this.state!==it.NONE||(i.preventDefault(),this.dispatchEvent(x0),this._handleMouseWheel(this._customWheelEvent(i)),this.dispatchEvent(bd))}function mg(i){this.enabled!==!1&&this._handleKeyDown(i)}function gg(i){switch(this._trackPointer(i),this._pointers.length){case 1:switch(this.touches.ONE){case Ii.ROTATE:if(this.enableRotate===!1)return;this._handleTouchStartRotate(i),this.state=it.TOUCH_ROTATE;break;case Ii.PAN:if(this.enablePan===!1)return;this._handleTouchStartPan(i),this.state=it.TOUCH_PAN;break;default:this.state=it.NONE}break;case 2:switch(this.touches.TWO){case Ii.DOLLY_PAN:if(this.enableZoom===!1&&this.enablePan===!1)return;this._handleTouchStartDollyPan(i),this.state=it.TOUCH_DOLLY_PAN;break;case Ii.DOLLY_ROTATE:if(this.enableZoom===!1&&this.enableRotate===!1)return;this._handleTouchStartDollyRotate(i),this.state=it.TOUCH_DOLLY_ROTATE;break;default:this.state=it.NONE}break;default:this.state=it.NONE}this.state!==it.NONE&&this.dispatchEvent(x0)}function _g(i){switch(this._trackPointer(i),this.state){case it.TOUCH_ROTATE:if(this.enableRotate===!1)return;this._handleTouchMoveRotate(i),this.update();break;case it.TOUCH_PAN:if(this.enablePan===!1)return;this._handleTouchMovePan(i),this.update();break;case it.TOUCH_DOLLY_PAN:if(this.enableZoom===!1&&this.enablePan===!1)return;this._handleTouchMoveDollyPan(i),this.update();break;case it.TOUCH_DOLLY_ROTATE:if(this.enableZoom===!1&&this.enableRotate===!1)return;this._handleTouchMoveDollyRotate(i),this.update();break;default:this.state=it.NONE}}function xg(i){this.enabled!==!1&&i.preventDefault()}function yg(i){i.key==="Control"&&(this._controlActive=!0,this.domElement.getRootNode().addEventListener("keyup",this._interceptControlUp,{passive:!0,capture:!0}))}function vg(i){i.key==="Control"&&(this._controlActive=!1,this.domElement.getRootNode().removeEventListener("keyup",this._interceptControlUp,{passive:!0,capture:!0}))}function y0(i,e){if(e===Dl)return console.warn("THREE.BufferGeometryUtils.toTrianglesDrawMode(): Geometry already defined as triangles."),i;if(e===Ks||e===Kr){let t=i.getIndex();if(t===null){let o=[],a=i.getAttribute("position");if(a!==void 0){for(let c=0;c<a.count;c++)o.push(c);i.setIndex(o),t=i.getIndex()}else return console.error("THREE.BufferGeometryUtils.toTrianglesDrawMode(): Undefined position attribute. Processing not possible."),i}let n=t.count-2,s=[];if(e===Ks)for(let o=1;o<=n;o++)s.push(t.getX(0)),s.push(t.getX(o)),s.push(t.getX(o+1));else for(let o=0;o<n;o++)o%2===0?(s.push(t.getX(o)),s.push(t.getX(o+1)),s.push(t.getX(o+2))):(s.push(t.getX(o+2)),s.push(t.getX(o+1)),s.push(t.getX(o)));s.length/3!==n&&console.error("THREE.BufferGeometryUtils.toTrianglesDrawMode(): Unable to generate correct amount of triangles.");let r=i.clone();return r.setIndex(s),r.clearGroups(),r}else return console.error("THREE.BufferGeometryUtils.toTrianglesDrawMode(): Unknown draw mode:",e),i}function Sd(i){let e=new Map,t=new Map,n=i.clone();return Td(i,n,function(s,r){e.set(r,s),t.set(s,r)}),n.traverse(function(s){if(!s.isSkinnedMesh)return;let r=s,o=e.get(s),a=o.skeleton.bones;r.skeleton=o.skeleton.clone(),r.bindMatrix.copy(o.bindMatrix),r.skeleton.bones=a.map(function(c){return t.get(c)}),r.bind(r.skeleton,r.bindMatrix)}),n}function Td(i,e,t){t(i,e);for(let n=0;n<i.children.length;n++)Td(i.children[n],e.children[n],t)}var wc=class extends En{constructor(e){super(e),this.dracoLoader=null,this.ktx2Loader=null,this.meshoptDecoder=null,this.pluginCallbacks=[],this.register(function(t){return new A0(t)}),this.register(function(t){return new E0(t)}),this.register(function(t){return new F0(t)}),this.register(function(t){return new O0(t)}),this.register(function(t){return new B0(t)}),this.register(function(t){return new C0(t)}),this.register(function(t){return new I0(t)}),this.register(function(t){return new P0(t)}),this.register(function(t){return new L0(t)}),this.register(function(t){return new w0(t)}),this.register(function(t){return new D0(t)}),this.register(function(t){return new R0(t)}),this.register(function(t){return new U0(t)}),this.register(function(t){return new N0(t)}),this.register(function(t){return new S0(t)}),this.register(function(t){return new Ac(t,He.EXT_MESHOPT_COMPRESSION)}),this.register(function(t){return new Ac(t,He.KHR_MESHOPT_COMPRESSION)}),this.register(function(t){return new k0(t)})}load(e,t,n,s){let r=this,o;if(this.resourcePath!=="")o=this.resourcePath;else if(this.path!==""){let l=oi.extractUrlBase(e);o=oi.resolveURL(l,this.path)}else o=oi.extractUrlBase(e);this.manager.itemStart(e);let a=function(l){s?s(l):console.error(l),r.manager.itemError(e),r.manager.itemEnd(e)},c=new es(this.manager);c.setPath(this.path),c.setResponseType("arraybuffer"),c.setRequestHeader(this.requestHeader),c.setWithCredentials(this.withCredentials),c.load(e,function(l){try{r.parse(l,o,function(u){t(u),r.manager.itemEnd(e)},a)}catch(u){a(u)}},n,a)}setDRACOLoader(e){return this.dracoLoader=e,this}setKTX2Loader(e){return this.ktx2Loader=e,this}setMeshoptDecoder(e){return this.meshoptDecoder=e,this}register(e){return this.pluginCallbacks.indexOf(e)===-1&&this.pluginCallbacks.push(e),this}unregister(e){return this.pluginCallbacks.indexOf(e)!==-1&&this.pluginCallbacks.splice(this.pluginCallbacks.indexOf(e),1),this}parse(e,t,n,s){let r,o={},a={},c=new TextDecoder;if(typeof e=="string")r=JSON.parse(e);else if(e instanceof ArrayBuffer)if(c.decode(new Uint8Array(e,0,4))===Cd){try{o[He.KHR_BINARY_GLTF]=new z0(e)}catch(d){s&&s(d);return}r=JSON.parse(o[He.KHR_BINARY_GLTF].content)}else r=JSON.parse(c.decode(e));else r=e;if(r.asset===void 0||r.asset.version[0]<2){s&&s(new Error("THREE.GLTFLoader: Unsupported asset. glTF versions >=2.0 are supported."));return}let l=new Y0(r,{path:t||this.resourcePath||"",crossOrigin:this.crossOrigin,requestHeader:this.requestHeader,manager:this.manager,ktx2Loader:this.ktx2Loader,meshoptDecoder:this.meshoptDecoder});l.fileLoader.setRequestHeader(this.requestHeader);for(let u=0;u<this.pluginCallbacks.length;u++){let d=this.pluginCallbacks[u](l);d.name||console.error("THREE.GLTFLoader: Invalid plugin found: missing name"),a[d.name]=d,o[d.name]=!0}if(r.extensionsUsed)for(let u=0;u<r.extensionsUsed.length;++u){let d=r.extensionsUsed[u],h=r.extensionsRequired||[];switch(d){case He.KHR_MATERIALS_UNLIT:o[d]=new T0;break;case He.KHR_DRACO_MESH_COMPRESSION:o[d]=new V0(r,this.dracoLoader);break;case He.KHR_TEXTURE_TRANSFORM:o[d]=new H0;break;case He.KHR_MESH_QUANTIZATION:o[d]=new G0;break;default:h.indexOf(d)>=0&&a[d]===void 0&&console.warn('THREE.GLTFLoader: Unknown extension "'+d+'".')}}l.setExtensions(o),l.setPlugins(a),l.parse(n,s)}parseAsync(e,t){let n=this;return new Promise(function(s,r){n.parse(e,t,s,r)})}};function Mg(){let i={};return{get:function(e){return i[e]},add:function(e,t){i[e]=t},remove:function(e){delete i[e]},removeAll:function(){i={}}}}function Tt(i,e,t){let n=i.json.materials[e];return n.extensions&&n.extensions[t]?n.extensions[t]:null}var He={KHR_BINARY_GLTF:"KHR_binary_glTF",KHR_DRACO_MESH_COMPRESSION:"KHR_draco_mesh_compression",KHR_LIGHTS_PUNCTUAL:"KHR_lights_punctual",KHR_MATERIALS_CLEARCOAT:"KHR_materials_clearcoat",KHR_MATERIALS_DISPERSION:"KHR_materials_dispersion",KHR_MATERIALS_IOR:"KHR_materials_ior",KHR_MATERIALS_SHEEN:"KHR_materials_sheen",KHR_MATERIALS_SPECULAR:"KHR_materials_specular",KHR_MATERIALS_TRANSMISSION:"KHR_materials_transmission",KHR_MATERIALS_IRIDESCENCE:"KHR_materials_iridescence",KHR_MATERIALS_ANISOTROPY:"KHR_materials_anisotropy",KHR_MATERIALS_UNLIT:"KHR_materials_unlit",KHR_MATERIALS_VOLUME:"KHR_materials_volume",KHR_TEXTURE_BASISU:"KHR_texture_basisu",KHR_TEXTURE_TRANSFORM:"KHR_texture_transform",KHR_MESH_QUANTIZATION:"KHR_mesh_quantization",KHR_MATERIALS_EMISSIVE_STRENGTH:"KHR_materials_emissive_strength",EXT_MATERIALS_BUMP:"EXT_materials_bump",EXT_TEXTURE_WEBP:"EXT_texture_webp",EXT_TEXTURE_AVIF:"EXT_texture_avif",EXT_MESHOPT_COMPRESSION:"EXT_meshopt_compression",KHR_MESHOPT_COMPRESSION:"KHR_meshopt_compression",EXT_MESH_GPU_INSTANCING:"EXT_mesh_gpu_instancing"},S0=class{constructor(e){this.parser=e,this.name=He.KHR_LIGHTS_PUNCTUAL,this.cache={refs:{},uses:{}}}_markDefs(){let e=this.parser,t=this.parser.json.nodes||[];for(let n=0,s=t.length;n<s;n++){let r=t[n];r.extensions&&r.extensions[this.name]&&r.extensions[this.name].light!==void 0&&e._addNodeRef(this.cache,r.extensions[this.name].light)}}_loadLight(e){let t=this.parser,n="light:"+e,s=t.cache.get(n);if(s)return s;let r=t.json,c=((r.extensions&&r.extensions[this.name]||{}).lights||[])[e],l,u=new ge(16777215);c.color!==void 0&&u.setRGB(c.color[0],c.color[1],c.color[2],Kt);let d=c.range!==void 0?c.range:0;switch(c.type){case"directional":l=new is(u),l.target.position.set(0,0,-1),l.add(l.target);break;case"point":l=new ns(u),l.distance=d;break;case"spot":l=new Fr(u),l.distance=d,c.spot=c.spot||{},c.spot.innerConeAngle=c.spot.innerConeAngle!==void 0?c.spot.innerConeAngle:0,c.spot.outerConeAngle=c.spot.outerConeAngle!==void 0?c.spot.outerConeAngle:Math.PI/4,l.angle=c.spot.outerConeAngle,l.penumbra=1-c.spot.innerConeAngle/c.spot.outerConeAngle,l.target.position.set(0,0,-1),l.add(l.target);break;default:throw new Error("THREE.GLTFLoader: Unexpected light type: "+c.type)}return l.position.set(0,0,0),qn(l,c),c.intensity!==void 0&&(l.intensity=c.intensity),l.name=t.createUniqueName(c.name||"light_"+e),s=Promise.resolve(l),t.cache.add(n,s),s}getDependency(e,t){if(e==="light")return this._loadLight(t)}createNodeAttachment(e){let t=this,n=this.parser,r=n.json.nodes[e],a=(r.extensions&&r.extensions[this.name]||{}).light;return a===void 0?null:this._loadLight(a).then(function(c){return n._getNodeRef(t.cache,a,c)})}},T0=class{constructor(){this.name=He.KHR_MATERIALS_UNLIT}getMaterialType(){return _n}extendParams(e,t,n){let s=[];e.color=new ge(1,1,1),e.opacity=1;let r=t.pbrMetallicRoughness;if(r){if(Array.isArray(r.baseColorFactor)){let o=r.baseColorFactor;e.color.setRGB(o[0],o[1],o[2],Kt),e.opacity=o[3]}r.baseColorTexture!==void 0&&s.push(n.assignTexture(e,"map",r.baseColorTexture,Pt))}return Promise.all(s)}},w0=class{constructor(e){this.parser=e,this.name=He.KHR_MATERIALS_EMISSIVE_STRENGTH}extendMaterialParams(e,t){let n=Tt(this.parser,e,this.name);return n===null||n.emissiveStrength!==void 0&&(t.emissiveIntensity=n.emissiveStrength),Promise.resolve()}},A0=class{constructor(e){this.parser=e,this.name=He.KHR_MATERIALS_CLEARCOAT}getMaterialType(e){return Tt(this.parser,e,this.name)!==null?jt:null}extendMaterialParams(e,t){let n=Tt(this.parser,e,this.name);if(n===null)return Promise.resolve();let s=[];if(n.clearcoatFactor!==void 0&&(t.clearcoat=n.clearcoatFactor),n.clearcoatTexture!==void 0&&s.push(this.parser.assignTexture(t,"clearcoatMap",n.clearcoatTexture)),n.clearcoatRoughnessFactor!==void 0&&(t.clearcoatRoughness=n.clearcoatRoughnessFactor),n.clearcoatRoughnessTexture!==void 0&&s.push(this.parser.assignTexture(t,"clearcoatRoughnessMap",n.clearcoatRoughnessTexture)),n.clearcoatNormalTexture!==void 0&&(s.push(this.parser.assignTexture(t,"clearcoatNormalMap",n.clearcoatNormalTexture)),n.clearcoatNormalTexture.scale!==void 0)){let r=n.clearcoatNormalTexture.scale;t.clearcoatNormalScale=new be(r,r)}return Promise.all(s)}},E0=class{constructor(e){this.parser=e,this.name=He.KHR_MATERIALS_DISPERSION}getMaterialType(e){return Tt(this.parser,e,this.name)!==null?jt:null}extendMaterialParams(e,t){let n=Tt(this.parser,e,this.name);return n===null||(t.dispersion=n.dispersion!==void 0?n.dispersion:0),Promise.resolve()}},R0=class{constructor(e){this.parser=e,this.name=He.KHR_MATERIALS_IRIDESCENCE}getMaterialType(e){return Tt(this.parser,e,this.name)!==null?jt:null}extendMaterialParams(e,t){let n=Tt(this.parser,e,this.name);if(n===null)return Promise.resolve();let s=[];return n.iridescenceFactor!==void 0&&(t.iridescence=n.iridescenceFactor),n.iridescenceTexture!==void 0&&s.push(this.parser.assignTexture(t,"iridescenceMap",n.iridescenceTexture)),n.iridescenceIor!==void 0&&(t.iridescenceIOR=n.iridescenceIor),t.iridescenceThicknessRange===void 0&&(t.iridescenceThicknessRange=[100,400]),n.iridescenceThicknessMinimum!==void 0&&(t.iridescenceThicknessRange[0]=n.iridescenceThicknessMinimum),n.iridescenceThicknessMaximum!==void 0&&(t.iridescenceThicknessRange[1]=n.iridescenceThicknessMaximum),n.iridescenceThicknessTexture!==void 0&&s.push(this.parser.assignTexture(t,"iridescenceThicknessMap",n.iridescenceThicknessTexture)),Promise.all(s)}},C0=class{constructor(e){this.parser=e,this.name=He.KHR_MATERIALS_SHEEN}getMaterialType(e){return Tt(this.parser,e,this.name)!==null?jt:null}extendMaterialParams(e,t){let n=Tt(this.parser,e,this.name);if(n===null)return Promise.resolve();let s=[];if(t.sheenColor=new ge(0,0,0),t.sheenRoughness=0,t.sheen=1,n.sheenColorFactor!==void 0){let r=n.sheenColorFactor;t.sheenColor.setRGB(r[0],r[1],r[2],Kt)}return n.sheenRoughnessFactor!==void 0&&(t.sheenRoughness=n.sheenRoughnessFactor),n.sheenColorTexture!==void 0&&s.push(this.parser.assignTexture(t,"sheenColorMap",n.sheenColorTexture,Pt)),n.sheenRoughnessTexture!==void 0&&s.push(this.parser.assignTexture(t,"sheenRoughnessMap",n.sheenRoughnessTexture)),Promise.all(s)}},I0=class{constructor(e){this.parser=e,this.name=He.KHR_MATERIALS_TRANSMISSION}getMaterialType(e){return Tt(this.parser,e,this.name)!==null?jt:null}extendMaterialParams(e,t){let n=Tt(this.parser,e,this.name);if(n===null)return Promise.resolve();let s=[];return n.transmissionFactor!==void 0&&(t.transmission=n.transmissionFactor),n.transmissionTexture!==void 0&&s.push(this.parser.assignTexture(t,"transmissionMap",n.transmissionTexture)),Promise.all(s)}},P0=class{constructor(e){this.parser=e,this.name=He.KHR_MATERIALS_VOLUME}getMaterialType(e){return Tt(this.parser,e,this.name)!==null?jt:null}extendMaterialParams(e,t){let n=Tt(this.parser,e,this.name);if(n===null)return Promise.resolve();let s=[];t.thickness=n.thicknessFactor!==void 0?n.thicknessFactor:0,n.thicknessTexture!==void 0&&s.push(this.parser.assignTexture(t,"thicknessMap",n.thicknessTexture)),t.attenuationDistance=n.attenuationDistance||1/0;let r=n.attenuationColor||[1,1,1];return t.attenuationColor=new ge().setRGB(r[0],r[1],r[2],Kt),Promise.all(s)}},L0=class{constructor(e){this.parser=e,this.name=He.KHR_MATERIALS_IOR}getMaterialType(e){return Tt(this.parser,e,this.name)!==null?jt:null}extendMaterialParams(e,t){let n=Tt(this.parser,e,this.name);return n===null||(t.ior=n.ior!==void 0?n.ior:1.5,t.ior===0&&(t.ior=1e3)),Promise.resolve()}},D0=class{constructor(e){this.parser=e,this.name=He.KHR_MATERIALS_SPECULAR}getMaterialType(e){return Tt(this.parser,e,this.name)!==null?jt:null}extendMaterialParams(e,t){let n=Tt(this.parser,e,this.name);if(n===null)return Promise.resolve();let s=[];t.specularIntensity=n.specularFactor!==void 0?n.specularFactor:1,n.specularTexture!==void 0&&s.push(this.parser.assignTexture(t,"specularIntensityMap",n.specularTexture));let r=n.specularColorFactor||[1,1,1];return t.specularColor=new ge().setRGB(r[0],r[1],r[2],Kt),n.specularColorTexture!==void 0&&s.push(this.parser.assignTexture(t,"specularColorMap",n.specularColorTexture,Pt)),Promise.all(s)}},N0=class{constructor(e){this.parser=e,this.name=He.EXT_MATERIALS_BUMP}getMaterialType(e){return Tt(this.parser,e,this.name)!==null?jt:null}extendMaterialParams(e,t){let n=Tt(this.parser,e,this.name);if(n===null)return Promise.resolve();let s=[];return t.bumpScale=n.bumpFactor!==void 0?n.bumpFactor:1,n.bumpTexture!==void 0&&s.push(this.parser.assignTexture(t,"bumpMap",n.bumpTexture)),Promise.all(s)}},U0=class{constructor(e){this.parser=e,this.name=He.KHR_MATERIALS_ANISOTROPY}getMaterialType(e){return Tt(this.parser,e,this.name)!==null?jt:null}extendMaterialParams(e,t){let n=Tt(this.parser,e,this.name);if(n===null)return Promise.resolve();let s=[];return n.anisotropyStrength!==void 0&&(t.anisotropy=n.anisotropyStrength),n.anisotropyRotation!==void 0&&(t.anisotropyRotation=n.anisotropyRotation),n.anisotropyTexture!==void 0&&s.push(this.parser.assignTexture(t,"anisotropyMap",n.anisotropyTexture)),Promise.all(s)}},F0=class{constructor(e){this.parser=e,this.name=He.KHR_TEXTURE_BASISU}loadTexture(e){let t=this.parser,n=t.json,s=n.textures[e];if(!s.extensions||!s.extensions[this.name])return null;let r=s.extensions[this.name],o=t.options.ktx2Loader;if(!o){if(n.extensionsRequired&&n.extensionsRequired.indexOf(this.name)>=0)throw new Error("THREE.GLTFLoader: setKTX2Loader must be called before loading KTX2 textures");return null}return t.loadTextureImage(e,r.source,o)}},O0=class{constructor(e){this.parser=e,this.name=He.EXT_TEXTURE_WEBP}loadTexture(e){let t=this.name,n=this.parser,s=n.json,r=s.textures[e];if(!r.extensions||!r.extensions[t])return null;let o=r.extensions[t],a=s.images[o.source],c=n.textureLoader;if(a.uri){let l=n.options.manager.getHandler(a.uri);l!==null&&(c=l)}return n.loadTextureImage(e,o.source,c)}},B0=class{constructor(e){this.parser=e,this.name=He.EXT_TEXTURE_AVIF}loadTexture(e){let t=this.name,n=this.parser,s=n.json,r=s.textures[e];if(!r.extensions||!r.extensions[t])return null;let o=r.extensions[t],a=s.images[o.source],c=n.textureLoader;if(a.uri){let l=n.options.manager.getHandler(a.uri);l!==null&&(c=l)}return n.loadTextureImage(e,o.source,c)}},Ac=class{constructor(e,t){this.name=t,this.parser=e}loadBufferView(e){let t=this.parser.json,n=t.bufferViews[e];if(n.extensions&&n.extensions[this.name]){let s=n.extensions[this.name],r=this.parser.getDependency("buffer",s.buffer),o=this.parser.options.meshoptDecoder;if(!o||!o.supported){if(t.extensionsRequired&&t.extensionsRequired.indexOf(this.name)>=0)throw new Error("THREE.GLTFLoader: setMeshoptDecoder must be called before loading compressed files");return null}return r.then(function(a){let c=s.byteOffset||0,l=s.byteLength||0,u=s.count,d=s.byteStride,h=new Uint8Array(a,c,l);return o.decodeGltfBufferAsync?o.decodeGltfBufferAsync(u,d,h,s.mode,s.filter).then(function(p){return p.buffer}):o.ready.then(function(){let p=new ArrayBuffer(u*d);return o.decodeGltfBuffer(new Uint8Array(p),u,d,h,s.mode,s.filter),p})})}else return null}},k0=class{constructor(e){this.name=He.EXT_MESH_GPU_INSTANCING,this.parser=e}createNodeMesh(e){let t=this.parser.json,n=t.nodes[e];if(!n.extensions||!n.extensions[this.name]||n.mesh===void 0)return null;let s=t.meshes[n.mesh];for(let l of s.primitives)if(l.mode!==xn.TRIANGLES&&l.mode!==xn.TRIANGLE_STRIP&&l.mode!==xn.TRIANGLE_FAN&&l.mode!==void 0)return null;let o=n.extensions[this.name].attributes,a=[],c={};for(let l in o)a.push(this.parser.getDependency("accessor",o[l]).then(u=>(c[l]=u,c[l])));return a.length<1?null:(a.push(this.parser.createNodeMesh(e)),Promise.all(a).then(l=>{let u=l.pop(),d=u.isGroup?u.children:[u],h=l[0].count,p=[];for(let g of d){let v=new Ue,m=new L,f=new Gt,_=new L(1,1,1),b=new Ki(g.geometry,g.material,h);for(let S=0;S<h;S++)c.TRANSLATION&&m.fromBufferAttribute(c.TRANSLATION,S),c.ROTATION&&f.fromBufferAttribute(c.ROTATION,S),c.SCALE&&_.fromBufferAttribute(c.SCALE,S),b.setMatrixAt(S,v.compose(m,f,_));for(let S in c)if(S==="_COLOR_0"){let E=c[S];b.instanceColor=new wi(E.array,E.itemSize,E.normalized)}else S!=="TRANSLATION"&&S!=="ROTATION"&&S!=="SCALE"&&g.geometry.setAttribute(S,c[S]);lt.prototype.copy.call(b,g),this.parser.assignFinalMaterial(b),p.push(b)}return u.isGroup?(u.clear(),u.add(...p),u):p[0]}))}},Cd="glTF",ao=12,wd={JSON:1313821514,BIN:5130562},z0=class{constructor(e){this.name=He.KHR_BINARY_GLTF,this.content=null,this.body=null;let t=new DataView(e,0,ao),n=new TextDecoder;if(this.header={magic:n.decode(new Uint8Array(e.slice(0,4))),version:t.getUint32(4,!0),length:t.getUint32(8,!0)},this.header.magic!==Cd)throw new Error("THREE.GLTFLoader: Unsupported glTF-Binary header.");if(this.header.version<2)throw new Error("THREE.GLTFLoader: Legacy binary file detected.");let s=this.header.length-ao,r=new DataView(e,ao),o=0;for(;o<s;){let a=r.getUint32(o,!0);o+=4;let c=r.getUint32(o,!0);if(o+=4,c===wd.JSON){let l=new Uint8Array(e,ao+o,a);this.content=n.decode(l)}else if(c===wd.BIN){let l=ao+o;this.body=e.slice(l,l+a)}o+=a}if(this.content===null)throw new Error("THREE.GLTFLoader: JSON content not found.")}},V0=class{constructor(e,t){if(!t)throw new Error("THREE.GLTFLoader: No DRACOLoader instance provided.");this.name=He.KHR_DRACO_MESH_COMPRESSION,this.json=e,this.dracoLoader=t,this.dracoLoader.preload()}decodePrimitive(e,t){let n=this.json,s=this.dracoLoader,r=e.extensions[this.name].bufferView,o=e.extensions[this.name].attributes,a={},c={},l={};for(let u in o){let d=X0[u]||u.toLowerCase();a[d]=o[u]}for(let u in e.attributes){let d=X0[u]||u.toLowerCase();if(o[u]!==void 0){let h=n.accessors[e.attributes[u]],p=ir[h.componentType];l[d]=p.name,c[d]=h.normalized===!0}}return t.getDependency("bufferView",r).then(function(u){return new Promise(function(d,h){s.decodeDracoFile(u,function(p){for(let g in p.attributes){let v=p.attributes[g],m=c[g];m!==void 0&&(v.normalized=m)}d(p)},a,l,Kt,h)})})}},H0=class{constructor(){this.name=He.KHR_TEXTURE_TRANSFORM}extendTexture(e,t){return(t.texCoord===void 0||t.texCoord===e.channel)&&t.offset===void 0&&t.rotation===void 0&&t.scale===void 0||(e=e.clone(),t.texCoord!==void 0&&(e.channel=t.texCoord),t.offset!==void 0&&e.offset.fromArray(t.offset),t.rotation!==void 0&&(e.rotation=t.rotation),t.scale!==void 0&&e.repeat.fromArray(t.scale),e.needsUpdate=!0),e}},G0=class{constructor(){this.name=He.KHR_MESH_QUANTIZATION}},Ec=class extends On{constructor(e,t,n,s){super(e,t,n,s)}copySampleValue_(e){let t=this.resultBuffer,n=this.sampleValues,s=this.valueSize,r=e*s*3+s;for(let o=0;o!==s;o++)t[o]=n[r+o];return t}interpolate_(e,t,n,s){let r=this.resultBuffer,o=this.sampleValues,a=this.valueSize,c=a*2,l=a*3,u=s-t,d=(n-t)/u,h=d*d,p=h*d,g=e*l,v=g-l,m=-2*p+3*h,f=p-h,_=1-m,b=f-h+d;for(let S=0;S!==a;S++){let E=o[v+S+a],w=o[v+S+c]*u,C=o[g+S+a],y=o[g+S]*u;r[S]=_*E+b*w+m*C+f*y}return r}},bg=new Gt,W0=class extends Ec{interpolate_(e,t,n,s){let r=super.interpolate_(e,t,n,s);return bg.fromArray(r).normalize().toArray(r),r}},xn={FLOAT:5126,FLOAT_MAT3:35675,FLOAT_MAT4:35676,FLOAT_VEC2:35664,FLOAT_VEC3:35665,FLOAT_VEC4:35666,LINEAR:9729,REPEAT:10497,SAMPLER_2D:35678,POINTS:0,LINES:1,LINE_LOOP:2,LINE_STRIP:3,TRIANGLES:4,TRIANGLE_STRIP:5,TRIANGLE_FAN:6,UNSIGNED_BYTE:5121,UNSIGNED_SHORT:5123},ir={5120:Int8Array,5121:Uint8Array,5122:Int16Array,5123:Uint16Array,5125:Uint32Array,5126:Float32Array},Ad={9728:St,9729:gt,9984:va,9985:Xs,9986:os,9987:hn},Ed={33071:gn,33648:Ps,10497:Si},v0={SCALAR:1,VEC2:2,VEC3:3,VEC4:4,MAT2:4,MAT3:9,MAT4:16},X0={POSITION:"position",NORMAL:"normal",TANGENT:"tangent",TEXCOORD_0:"uv",TEXCOORD_1:"uv1",TEXCOORD_2:"uv2",TEXCOORD_3:"uv3",COLOR_0:"color",WEIGHTS_0:"skinWeight",JOINTS_0:"skinIndex"},Fi={scale:"scale",translation:"position",rotation:"quaternion",weights:"morphTargetInfluences"},Sg={CUBICSPLINE:void 0,LINEAR:qi,STEP:Xi},M0={OPAQUE:"OPAQUE",MASK:"MASK",BLEND:"BLEND"};function Tg(i){return i.DefaultMaterial===void 0&&(i.DefaultMaterial=new Bt({color:16777215,emissive:0,metalness:1,roughness:1,transparent:!1,depthTest:!0,side:an})),i.DefaultMaterial}function fs(i,e,t){for(let n in t.extensions)i[n]===void 0&&(e.userData.gltfExtensions=e.userData.gltfExtensions||{},e.userData.gltfExtensions[n]=t.extensions[n])}function qn(i,e){e.extras!==void 0&&(typeof e.extras=="object"?Object.assign(i.userData,e.extras):console.warn("THREE.GLTFLoader: Ignoring primitive type .extras, "+e.extras))}function wg(i,e,t){let n=!1,s=!1,r=!1;for(let l=0,u=e.length;l<u;l++){let d=e[l];if(d.POSITION!==void 0&&(n=!0),d.NORMAL!==void 0&&(s=!0),d.COLOR_0!==void 0&&(r=!0),n&&s&&r)break}if(!n&&!s&&!r)return Promise.resolve(i);let o=[],a=[],c=[];for(let l=0,u=e.length;l<u;l++){let d=e[l];if(n){let h=d.POSITION!==void 0?t.getDependency("accessor",d.POSITION):i.attributes.position;o.push(h)}if(s){let h=d.NORMAL!==void 0?t.getDependency("accessor",d.NORMAL):i.attributes.normal;a.push(h)}if(r){let h=d.COLOR_0!==void 0?t.getDependency("accessor",d.COLOR_0):i.attributes.color;c.push(h)}}return Promise.all([Promise.all(o),Promise.all(a),Promise.all(c)]).then(function(l){let u=l[0],d=l[1],h=l[2];return n&&(i.morphAttributes.position=u),s&&(i.morphAttributes.normal=d),r&&(i.morphAttributes.color=h),i.morphTargetsRelative=!0,i})}function Ag(i,e){if(i.updateMorphTargets(),e.weights!==void 0)for(let t=0,n=e.weights.length;t<n;t++)i.morphTargetInfluences[t]=e.weights[t];if(e.extras&&Array.isArray(e.extras.targetNames)){let t=e.extras.targetNames;if(i.morphTargetInfluences.length===t.length){i.morphTargetDictionary={};for(let n=0,s=t.length;n<s;n++)i.morphTargetDictionary[t[n]]=n}else console.warn("THREE.GLTFLoader: Invalid extras.targetNames length. Ignoring names.")}}function Eg(i){let e,t=i.extensions&&i.extensions[He.KHR_DRACO_MESH_COMPRESSION];if(t?e="draco:"+t.bufferView+":"+t.indices+":"+b0(t.attributes):e=i.indices+":"+b0(i.attributes)+":"+i.mode,i.targets!==void 0)for(let n=0,s=i.targets.length;n<s;n++)e+=":"+b0(i.targets[n]);return e}function b0(i){let e="",t=Object.keys(i).sort();for(let n=0,s=t.length;n<s;n++)e+=t[n]+":"+i[t[n]]+";";return e}function q0(i){switch(i){case Int8Array:return 1/127;case Uint8Array:return 1/255;case Int16Array:return 1/32767;case Uint16Array:return 1/65535;default:throw new Error("THREE.GLTFLoader: Unsupported normalized accessor component type.")}}function Rg(i){return i.search(/\.jpe?g($|\?)/i)>0||i.search(/^data\:image\/jpeg/)===0?"image/jpeg":i.search(/\.webp($|\?)/i)>0||i.search(/^data\:image\/webp/)===0?"image/webp":i.search(/\.ktx2($|\?)/i)>0||i.search(/^data\:image\/ktx2/)===0?"image/ktx2":"image/png"}var Cg=new Ue,Y0=class{constructor(e={},t={}){this.json=e,this.extensions={},this.plugins={},this.options=t,this.cache=new Mg,this.associations=new Map,this.primitiveCache={},this.nodeCache={},this.meshCache={refs:{},uses:{}},this.cameraCache={refs:{},uses:{}},this.lightCache={refs:{},uses:{}},this.sourceCache={},this.textureCache={},this.nodeNamesUsed={};let n=!1,s=-1,r=!1,o=-1;if(typeof navigator<"u"&&typeof navigator.userAgent<"u"){let a=navigator.userAgent;n=/^((?!chrome|android).)*safari/i.test(a)===!0;let c=a.match(/Version\/(\d+)/);s=n&&c?parseInt(c[1],10):-1,r=a.indexOf("Firefox")>-1,o=r?a.match(/Firefox\/([0-9]+)\./)[1]:-1}typeof createImageBitmap>"u"||n&&s<17||r&&o<98?this.textureLoader=new Lr(this.options.manager):this.textureLoader=new Br(this.options.manager),this.textureLoader.setCrossOrigin(this.options.crossOrigin),this.textureLoader.setRequestHeader(this.options.requestHeader),this.fileLoader=new es(this.options.manager),this.fileLoader.setResponseType("arraybuffer"),this.options.crossOrigin==="use-credentials"&&this.fileLoader.setWithCredentials(!0)}setExtensions(e){this.extensions=e}setPlugins(e){this.plugins=e}parse(e,t){let n=this,s=this.json,r=this.extensions;this.cache.removeAll(),this.nodeCache={},this._invokeAll(function(o){return o._markDefs&&o._markDefs()}),Promise.all(this._invokeAll(function(o){return o.beforeRoot&&o.beforeRoot()})).then(function(){return Promise.all([n.getDependencies("scene"),n.getDependencies("animation"),n.getDependencies("camera")])}).then(function(o){let a={scene:o[0][s.scene||0],scenes:o[0],animations:o[1],cameras:o[2],asset:s.asset,parser:n,userData:{}};return fs(r,a,s),qn(a,s),Promise.all(n._invokeAll(function(c){return c.afterRoot&&c.afterRoot(a)})).then(function(){for(let c of a.scenes)c.updateMatrixWorld();e(a)})}).catch(t)}_markDefs(){let e=this.json.nodes||[],t=this.json.skins||[],n=this.json.meshes||[];for(let s=0,r=t.length;s<r;s++){let o=t[s].joints;for(let a=0,c=o.length;a<c;a++)e[o[a]].isBone=!0}for(let s=0,r=e.length;s<r;s++){let o=e[s];o.mesh!==void 0&&(this._addNodeRef(this.meshCache,o.mesh),o.skin!==void 0&&(n[o.mesh].isSkinnedMesh=!0)),o.camera!==void 0&&this._addNodeRef(this.cameraCache,o.camera)}}_addNodeRef(e,t){t!==void 0&&(e.refs[t]===void 0&&(e.refs[t]=e.uses[t]=0),e.refs[t]++)}_getNodeRef(e,t,n){if(e.refs[t]<=1)return n;let s=n.clone(),r=(o,a)=>{let c=this.associations.get(o);c!=null&&this.associations.set(a,c);for(let[l,u]of o.children.entries())r(u,a.children[l])};return r(n,s),s.name+="_instance_"+e.uses[t]++,s}_invokeOne(e){let t=Object.values(this.plugins);t.push(this);for(let n=0;n<t.length;n++){let s=e(t[n]);if(s)return s}return null}_invokeAll(e){let t=Object.values(this.plugins);t.unshift(this);let n=[];for(let s=0;s<t.length;s++){let r=e(t[s]);r&&n.push(r)}return n}getDependency(e,t){let n=e+":"+t,s=this.cache.get(n);if(!s){switch(e){case"scene":s=this.loadScene(t);break;case"node":s=this._invokeOne(function(r){return r.loadNode&&r.loadNode(t)});break;case"mesh":s=this._invokeOne(function(r){return r.loadMesh&&r.loadMesh(t)});break;case"accessor":s=this.loadAccessor(t);break;case"bufferView":s=this._invokeOne(function(r){return r.loadBufferView&&r.loadBufferView(t)});break;case"buffer":s=this.loadBuffer(t);break;case"material":s=this._invokeOne(function(r){return r.loadMaterial&&r.loadMaterial(t)});break;case"texture":s=this._invokeOne(function(r){return r.loadTexture&&r.loadTexture(t)});break;case"skin":s=this.loadSkin(t);break;case"animation":s=this._invokeOne(function(r){return r.loadAnimation&&r.loadAnimation(t)});break;case"camera":s=this.loadCamera(t);break;default:if(s=this._invokeOne(function(r){return r!=this&&r.getDependency&&r.getDependency(e,t)}),!s)throw new Error("Unknown type: "+e);break}this.cache.add(n,s)}return s}getDependencies(e){let t=this.cache.get(e);if(!t){let n=this,s=this.json[e+(e==="mesh"?"es":"s")]||[];t=Promise.all(s.map(function(r,o){return n.getDependency(e,o)})),this.cache.add(e,t)}return t}loadBuffer(e){let t=this.json.buffers[e],n=this.fileLoader;if(t.type&&t.type!=="arraybuffer")throw new Error("THREE.GLTFLoader: "+t.type+" buffer type is not supported.");if(t.uri===void 0&&e===0)return Promise.resolve(this.extensions[He.KHR_BINARY_GLTF].body);let s=this.options;return new Promise(function(r,o){n.load(oi.resolveURL(t.uri,s.path),r,void 0,function(){o(new Error('THREE.GLTFLoader: Failed to load buffer "'+t.uri+'".'))})})}loadBufferView(e){let t=this.json.bufferViews[e];return this.getDependency("buffer",t.buffer).then(function(n){let s=t.byteLength||0,r=t.byteOffset||0;return n.slice(r,r+s)})}loadAccessor(e){let t=this,n=this.json,s=this.json.accessors[e];if(s.bufferView===void 0&&s.sparse===void 0){let o=v0[s.type],a=ir[s.componentType],c=s.normalized===!0,l=new a(s.count*o);return Promise.resolve(new mt(l,o,c))}let r=[];return s.bufferView!==void 0?r.push(this.getDependency("bufferView",s.bufferView)):r.push(null),s.sparse!==void 0&&(r.push(this.getDependency("bufferView",s.sparse.indices.bufferView)),r.push(this.getDependency("bufferView",s.sparse.values.bufferView))),Promise.all(r).then(function(o){let a=o[0],c=v0[s.type],l=ir[s.componentType],u=l.BYTES_PER_ELEMENT,d=u*c,h=s.byteOffset||0,p=s.bufferView!==void 0?n.bufferViews[s.bufferView].byteStride:void 0,g=s.normalized===!0,v,m;if(p&&p!==d){let f=Math.floor(h/p),_="InterleavedBuffer:"+s.bufferView+":"+s.componentType+":"+f+":"+s.count,b=t.cache.get(_);b||(v=new l(a,f*p,s.count*p/u),b=new Os(v,p/u),t.cache.add(_,b)),m=new Bs(b,c,h%p/u,g)}else a===null?v=new l(s.count*c):v=new l(a,h,s.count*c),m=new mt(v,c,g);if(s.sparse!==void 0){let f=v0.SCALAR,_=ir[s.sparse.indices.componentType],b=s.sparse.indices.byteOffset||0,S=s.sparse.values.byteOffset||0,E=new _(o[1],b,s.sparse.count*f),w=new l(o[2],S,s.sparse.count*c);a!==null&&(m=new mt(m.array.slice(),m.itemSize,m.normalized)),m.normalized=!1;for(let C=0,y=E.length;C<y;C++){let A=E[C];if(m.setX(A,w[C*c]),c>=2&&m.setY(A,w[C*c+1]),c>=3&&m.setZ(A,w[C*c+2]),c>=4&&m.setW(A,w[C*c+3]),c>=5)throw new Error("THREE.GLTFLoader: Unsupported itemSize in sparse BufferAttribute.")}m.normalized=g}return m})}loadTexture(e){let t=this.json,n=this.options,r=t.textures[e].source,o=t.images[r],a=this.textureLoader;if(o.uri){let c=n.manager.getHandler(o.uri);c!==null&&(a=c)}return this.loadTextureImage(e,r,a)}loadTextureImage(e,t,n){let s=this,r=this.json,o=r.textures[e],a=r.images[t],c=(a.uri||a.bufferView)+":"+o.sampler;if(this.textureCache[c])return this.textureCache[c];let l=this.loadImageSource(t,n).then(function(u){u.flipY=!1,u.name=o.name||a.name||"",u.name===""&&typeof a.uri=="string"&&a.uri.startsWith("data:image/")===!1&&(u.name=a.uri);let h=(r.samplers||{})[o.sampler]||{};return u.magFilter=Ad[h.magFilter]||gt,u.minFilter=Ad[h.minFilter]||hn,u.wrapS=Ed[h.wrapS]||Si,u.wrapT=Ed[h.wrapT]||Si,u.generateMipmaps=!u.isCompressedTexture&&u.minFilter!==St&&u.minFilter!==gt,s.associations.set(u,{textures:e}),u}).catch(function(){return null});return this.textureCache[c]=l,l}loadImageSource(e,t){let n=this,s=this.json,r=this.options;if(this.sourceCache[e]!==void 0)return this.sourceCache[e].then(d=>d.clone());let o=s.images[e],a=self.URL||self.webkitURL,c=o.uri||"",l=!1;if(o.bufferView!==void 0)c=n.getDependency("bufferView",o.bufferView).then(function(d){l=!0;let h=new Blob([d],{type:o.mimeType});return c=a.createObjectURL(h),c});else if(o.uri===void 0)throw new Error("THREE.GLTFLoader: Image "+e+" is missing URI and bufferView");let u=Promise.resolve(c).then(function(d){return new Promise(function(h,p){let g=h;t.isImageBitmapLoader===!0&&(g=function(v){let m=new Ot(v);m.needsUpdate=!0,h(m)}),t.load(oi.resolveURL(d,r.path),g,void 0,p)})}).then(function(d){return l===!0&&a.revokeObjectURL(c),qn(d,o),d.userData.mimeType=o.mimeType||Rg(o.uri),d}).catch(function(d){throw console.error("THREE.GLTFLoader: Couldn't load texture",c),d});return this.sourceCache[e]=u,u}assignTexture(e,t,n,s){let r=this;return this.getDependency("texture",n.index).then(function(o){if(!o)return null;if(n.texCoord!==void 0&&n.texCoord>0&&(o=o.clone(),o.channel=n.texCoord),r.extensions[He.KHR_TEXTURE_TRANSFORM]){let a=n.extensions!==void 0?n.extensions[He.KHR_TEXTURE_TRANSFORM]:void 0;if(a){let c=r.associations.get(o);o=r.extensions[He.KHR_TEXTURE_TRANSFORM].extendTexture(o,a),r.associations.set(o,c)}}return s!==void 0&&(o.colorSpace=s),e[t]=o,o})}assignFinalMaterial(e){let t=e.geometry,n=e.material,s=t.attributes.tangent===void 0,r=t.attributes.color!==void 0,o=t.attributes.normal===void 0;if(e.isPoints){let a="PointsMaterial:"+n.uuid,c=this.cache.get(a);c||(c=new $i,yt.prototype.copy.call(c,n),c.color.copy(n.color),c.map=n.map,c.sizeAttenuation=!1,this.cache.add(a,c)),n=c}else if(e.isLine){let a="LineBasicMaterial:"+n.uuid,c=this.cache.get(a);c||(c=new Ai,yt.prototype.copy.call(c,n),c.color.copy(n.color),c.map=n.map,this.cache.add(a,c)),n=c}if(s||r||o){let a="ClonedMaterial:"+n.uuid+":";s&&(a+="derivative-tangents:"),r&&(a+="vertex-colors:"),o&&(a+="flat-shading:");let c=this.cache.get(a);c||(c=n.clone(),r&&(c.vertexColors=!0),o&&(c.flatShading=!0),s&&(c.normalScale&&(c.normalScale.y*=-1),c.clearcoatNormalScale&&(c.clearcoatNormalScale.y*=-1)),this.cache.add(a,c),this.associations.set(c,this.associations.get(n))),n=c}e.material=n}getMaterialType(){return Bt}loadMaterial(e){let t=this,n=this.json,s=this.extensions,r=n.materials[e],o,a={},c=r.extensions||{},l=[];if(c[He.KHR_MATERIALS_UNLIT]){let d=s[He.KHR_MATERIALS_UNLIT];o=d.getMaterialType(),l.push(d.extendParams(a,r,t))}else{let d=r.pbrMetallicRoughness||{};if(a.color=new ge(1,1,1),a.opacity=1,Array.isArray(d.baseColorFactor)){let h=d.baseColorFactor;a.color.setRGB(h[0],h[1],h[2],Kt),a.opacity=h[3]}d.baseColorTexture!==void 0&&l.push(t.assignTexture(a,"map",d.baseColorTexture,Pt)),a.metalness=d.metallicFactor!==void 0?d.metallicFactor:1,a.roughness=d.roughnessFactor!==void 0?d.roughnessFactor:1,d.metallicRoughnessTexture!==void 0&&(l.push(t.assignTexture(a,"metalnessMap",d.metallicRoughnessTexture)),l.push(t.assignTexture(a,"roughnessMap",d.metallicRoughnessTexture))),o=this._invokeOne(function(h){return h.getMaterialType&&h.getMaterialType(e)}),l.push(Promise.all(this._invokeAll(function(h){return h.extendMaterialParams&&h.extendMaterialParams(e,a)})))}r.doubleSided===!0&&(a.side=en);let u=r.alphaMode||M0.OPAQUE;if(u===M0.BLEND?(a.transparent=!0,a.depthWrite=!1):(a.transparent=!1,u===M0.MASK&&(a.alphaTest=r.alphaCutoff!==void 0?r.alphaCutoff:.5)),r.normalTexture!==void 0&&o!==_n&&(l.push(t.assignTexture(a,"normalMap",r.normalTexture)),a.normalScale=new be(1,1),r.normalTexture.scale!==void 0)){let d=r.normalTexture.scale;a.normalScale.set(d,d)}if(r.occlusionTexture!==void 0&&o!==_n&&(l.push(t.assignTexture(a,"aoMap",r.occlusionTexture)),r.occlusionTexture.strength!==void 0&&(a.aoMapIntensity=r.occlusionTexture.strength)),r.emissiveFactor!==void 0&&o!==_n){let d=r.emissiveFactor;a.emissive=new ge().setRGB(d[0],d[1],d[2],Kt)}return r.emissiveTexture!==void 0&&o!==_n&&l.push(t.assignTexture(a,"emissiveMap",r.emissiveTexture,Pt)),Promise.all(l).then(function(){let d=new o(a);return r.name&&(d.name=r.name),qn(d,r),t.associations.set(d,{materials:e}),r.extensions&&fs(s,d,r),d})}createUniqueName(e){let t=ot.sanitizeNodeName(e||"");return t in this.nodeNamesUsed?t+"_"+ ++this.nodeNamesUsed[t]:(this.nodeNamesUsed[t]=0,t)}loadGeometries(e){let t=this,n=this.extensions,s=this.primitiveCache;function r(a){return n[He.KHR_DRACO_MESH_COMPRESSION].decodePrimitive(a,t).then(function(c){return Rd(c,a,t)})}let o=[];for(let a=0,c=e.length;a<c;a++){let l=e[a],u=Eg(l),d=s[u];if(d)o.push(d.promise);else{let h;l.extensions&&l.extensions[He.KHR_DRACO_MESH_COMPRESSION]?h=r(l):h=Rd(new Rt,l,t),s[u]={primitive:l,promise:h},o.push(h)}}return Promise.all(o)}loadMesh(e){let t=this,n=this.json,s=this.extensions,r=n.meshes[e],o=r.primitives,a=[];for(let c=0,l=o.length;c<l;c++){let u=o[c].material===void 0?Tg(this.cache):this.getDependency("material",o[c].material);a.push(u)}return a.push(t.loadGeometries(o)),Promise.all(a).then(function(c){let l=c.slice(0,c.length-1),u=c[c.length-1],d=[];for(let p=0,g=u.length;p<g;p++){let v=u[p],m=o[p],f,_=l[p];if(m.mode===xn.TRIANGLES||m.mode===xn.TRIANGLE_STRIP||m.mode===xn.TRIANGLE_FAN||m.mode===void 0)f=r.isSkinnedMesh===!0?new Mr(v,_):new Je(v,_),f.isSkinnedMesh===!0&&f.normalizeSkinWeights(),m.mode===xn.TRIANGLE_STRIP?f.geometry=y0(f.geometry,Kr):m.mode===xn.TRIANGLE_FAN&&(f.geometry=y0(f.geometry,Ks));else if(m.mode===xn.LINES)f=new Sr(v,_);else if(m.mode===xn.LINE_STRIP)f=new ji(v,_);else if(m.mode===xn.LINE_LOOP)f=new Tr(v,_);else if(m.mode===xn.POINTS)f=new wr(v,_);else throw new Error("THREE.GLTFLoader: Primitive mode unsupported: "+m.mode);Object.keys(f.geometry.morphAttributes).length>0&&Ag(f,r),f.name=t.createUniqueName(r.name||"mesh_"+e),qn(f,r),m.extensions&&fs(s,f,m),t.assignFinalMaterial(f),d.push(f)}for(let p=0,g=d.length;p<g;p++)t.associations.set(d[p],{meshes:e,primitives:p});if(d.length===1)return r.extensions&&fs(s,d[0],r),d[0];let h=new Zt;r.extensions&&fs(s,h,r),t.associations.set(h,{meshes:e});for(let p=0,g=d.length;p<g;p++)h.add(d[p]);return h})}loadCamera(e){let t,n=this.json.cameras[e],s=n[n.type];if(!s){console.warn("THREE.GLTFLoader: Missing camera parameters.");return}return n.type==="perspective"?t=new At(jr.radToDeg(s.yfov),s.aspectRatio||1,s.znear||1,s.zfar||2e6):n.type==="orthographic"&&(t=new Ri(-s.xmag,s.xmag,s.ymag,-s.ymag,s.znear,s.zfar)),n.name&&(t.name=this.createUniqueName(n.name)),qn(t,n),Promise.resolve(t)}loadSkin(e){let t=this.json.skins[e],n=[];for(let s=0,r=t.joints.length;s<r;s++)n.push(this._loadNodeShallow(t.joints[s]));return t.inverseBindMatrices!==void 0?n.push(this.getDependency("accessor",t.inverseBindMatrices)):n.push(null),Promise.all(n).then(function(s){let r=s.pop(),o=s,a=[],c=[];for(let l=0,u=o.length;l<u;l++){let d=o[l];if(d){a.push(d);let h=new Ue;r!==null&&h.fromArray(r.array,l*16),c.push(h)}else console.warn('THREE.GLTFLoader: Joint "%s" could not be found.',t.joints[l])}return new br(a,c)})}loadAnimation(e){let t=this.json,n=this,s=t.animations[e],r=s.name?s.name:"animation_"+e,o=[],a=[],c=[],l=[],u=[];for(let d=0,h=s.channels.length;d<h;d++){let p=s.channels[d],g=s.samplers[p.sampler],v=p.target,m=v.node,f=s.parameters!==void 0?s.parameters[g.input]:g.input,_=s.parameters!==void 0?s.parameters[g.output]:g.output;v.node!==void 0&&(o.push(this.getDependency("node",m)),a.push(this.getDependency("accessor",f)),c.push(this.getDependency("accessor",_)),l.push(g),u.push(v))}return Promise.all([Promise.all(o),Promise.all(a),Promise.all(c),Promise.all(l),Promise.all(u)]).then(function(d){let h=d[0],p=d[1],g=d[2],v=d[3],m=d[4],f=[];for(let b=0,S=h.length;b<S;b++){let E=h[b],w=p[b],C=g[b],y=v[b],A=m[b];if(E===void 0)continue;E.updateMatrix&&E.updateMatrix();let I=n._createAnimationTracks(E,w,C,y,A);if(I)for(let R=0;R<I.length;R++)f.push(I[R])}let _=new Pr(r,void 0,f);return qn(_,s),_})}createNodeMesh(e){let t=this.json,n=this,s=t.nodes[e];return s.mesh===void 0?null:n.getDependency("mesh",s.mesh).then(function(r){let o=n._getNodeRef(n.meshCache,s.mesh,r);return s.weights!==void 0&&o.traverse(function(a){if(a.isMesh)for(let c=0,l=s.weights.length;c<l;c++)a.morphTargetInfluences[c]=s.weights[c]}),o})}loadNode(e){let t=this.json,n=this,s=t.nodes[e],r=n._loadNodeShallow(e),o=[],a=s.children||[];for(let l=0,u=a.length;l<u;l++)o.push(n.getDependency("node",a[l]));let c=s.skin===void 0?Promise.resolve(null):n.getDependency("skin",s.skin);return Promise.all([r,Promise.all(o),c]).then(function(l){let u=l[0],d=l[1],h=l[2];h!==null&&u.traverse(function(p){p.isSkinnedMesh&&p.bind(h,Cg)});for(let p=0,g=d.length;p<g;p++)u.add(d[p]);if(u.userData.pivot!==void 0&&d.length>0){let p=u.userData.pivot,g=d[0];u.pivot=new L().fromArray(p),u.position.x-=p[0],u.position.y-=p[1],u.position.z-=p[2],g.position.set(0,0,0),delete u.userData.pivot}return u})}_loadNodeShallow(e){let t=this.json,n=this.extensions,s=this;if(this.nodeCache[e]!==void 0)return this.nodeCache[e];let r=t.nodes[e],o=r.name?s.createUniqueName(r.name):"",a=[],c=s._invokeOne(function(l){return l.createNodeMesh&&l.createNodeMesh(e)});return c&&a.push(c),r.camera!==void 0&&a.push(s.getDependency("camera",r.camera).then(function(l){return s._getNodeRef(s.cameraCache,r.camera,l)})),s._invokeAll(function(l){return l.createNodeAttachment&&l.createNodeAttachment(e)}).forEach(function(l){a.push(l)}),this.nodeCache[e]=Promise.all(a).then(function(l){let u;if(r.isBone===!0?u=new ks:l.length>1?u=new Zt:l.length===1?u=l[0]:u=new lt,u!==l[0])for(let d=0,h=l.length;d<h;d++)u.add(l[d]);if(r.name&&(u.userData.name=r.name,u.name=o),qn(u,r),r.extensions&&fs(n,u,r),r.matrix!==void 0){let d=new Ue;d.fromArray(r.matrix),u.applyMatrix4(d)}else r.translation!==void 0&&u.position.fromArray(r.translation),r.rotation!==void 0&&u.quaternion.fromArray(r.rotation),r.scale!==void 0&&u.scale.fromArray(r.scale);if(!s.associations.has(u))s.associations.set(u,{});else if(r.mesh!==void 0&&s.meshCache.refs[r.mesh]>1){let d=s.associations.get(u);s.associations.set(u,{...d})}return s.associations.get(u).nodes=e,u}),this.nodeCache[e]}loadScene(e){let t=this.extensions,n=this.json.scenes[e],s=this,r=new Zt;n.name&&(r.name=s.createUniqueName(n.name)),qn(r,n),n.extensions&&fs(t,r,n);let o=n.nodes||[],a=[];for(let c=0,l=o.length;c<l;c++)a.push(s.getDependency("node",o[c]));return Promise.all(a).then(function(c){for(let u=0,d=c.length;u<d;u++){let h=c[u];h.parent!==null?r.add(Sd(h)):r.add(h)}let l=u=>{let d=new Map;for(let[h,p]of s.associations)(h instanceof yt||h instanceof Ot)&&d.set(h,p);return u.traverse(h=>{let p=s.associations.get(h);p!=null&&d.set(h,p)}),d};return s.associations=l(r),r})}_createAnimationTracks(e,t,n,s,r){let o=[],a=e.name?e.name:e.uuid,c=[];function l(p){p.morphTargetInfluences&&c.push(p.name?p.name:p.uuid)}Fi[r.path]===Fi.weights?(l(e),e.isGroup&&e.children.forEach(l)):c.push(a);let u;switch(Fi[r.path]){case Fi.weights:u=Bn;break;case Fi.rotation:u=kn;break;case Fi.translation:case Fi.scale:u=zn;break;default:n.itemSize===1?u=Bn:u=zn;break}let d=s.interpolation!==void 0?Sg[s.interpolation]:qi,h=this._getArrayFromAccessor(n);for(let p=0,g=c.length;p<g;p++){let v=new u(c[p]+"."+Fi[r.path],t.array,h,d);s.interpolation==="CUBICSPLINE"&&this._createCubicSplineTrackInterpolant(v),o.push(v)}return o}_getArrayFromAccessor(e){let t=e.array;if(e.normalized){let n=q0(t.constructor),s=new Float32Array(t.length);for(let r=0,o=t.length;r<o;r++)s[r]=t[r]*n;t=s}return t}_createCubicSplineTrackInterpolant(e){e.createInterpolant=function(n){let s=this instanceof kn?W0:Ec;return new s(this.times,this.values,this.getValueSize()/3,n)},e.createInterpolant.isInterpolantFactoryMethodGLTFCubicSpline=!0}};function Ig(i,e,t){let n=e.attributes,s=new ln;if(n.POSITION!==void 0){let a=t.json.accessors[n.POSITION],c=a.min,l=a.max;if(c!==void 0&&l!==void 0){if(s.set(new L(c[0],c[1],c[2]),new L(l[0],l[1],l[2])),a.normalized){let u=q0(ir[a.componentType]);s.min.multiplyScalar(u),s.max.multiplyScalar(u)}}else{console.warn("THREE.GLTFLoader: Missing min/max properties for accessor POSITION.");return}}else return;let r=e.targets;if(r!==void 0){let a=new L,c=new L;for(let l=0,u=r.length;l<u;l++){let d=r[l];if(d.POSITION!==void 0){let h=t.json.accessors[d.POSITION],p=h.min,g=h.max;if(p!==void 0&&g!==void 0){if(c.setX(Math.max(Math.abs(p[0]),Math.abs(g[0]))),c.setY(Math.max(Math.abs(p[1]),Math.abs(g[1]))),c.setZ(Math.max(Math.abs(p[2]),Math.abs(g[2]))),h.normalized){let v=q0(ir[h.componentType]);c.multiplyScalar(v)}a.max(c)}else console.warn("THREE.GLTFLoader: Missing min/max properties for accessor POSITION.")}}s.expandByVector(a)}i.boundingBox=s;let o=new $t;s.getCenter(o.center),o.radius=s.min.distanceTo(s.max)/2,i.boundingSphere=o}function Rd(i,e,t){let n=e.attributes,s=[];function r(o,a){return t.getDependency("accessor",o).then(function(c){i.setAttribute(a,c)})}for(let o in n){let a=X0[o]||o.toLowerCase();a in i.attributes||s.push(r(n[o],a))}if(e.indices!==void 0&&!i.index){let o=t.getDependency("accessor",e.indices).then(function(a){i.setIndex(a)});s.push(o)}return ze.workingColorSpace!==Kt&&"COLOR_0"in n&&console.warn(`THREE.GLTFLoader: Converting vertex colors from "srgb-linear" to "${ze.workingColorSpace}" not supported.`),qn(i,e),Ig(i,e,t),Promise.all(s).then(function(){return e.targets!==void 0?wg(i,e.targets,t):i})}var Rc=class extends Zi{constructor(){super(),this.name="RoomEnvironment",this.position.y=-3.5;let e=new Ei;e.deleteAttribute("uv");let t=new Bt({side:kt}),n=new Bt,s=new ns(16777215,900,28,2);s.position.set(.418,16.199,.3),this.add(s);let r=new Je(e,t);r.position.set(-.757,13.219,.717),r.scale.set(31.713,28.305,28.591),this.add(r);let o=new Ki(e,n,6),a=new lt;a.position.set(-10.906,2.009,1.846),a.rotation.set(0,-.195,0),a.scale.set(2.328,7.905,4.651),a.updateMatrix(),o.setMatrixAt(0,a.matrix),a.position.set(-5.607,-.754,-.758),a.rotation.set(0,.994,0),a.scale.set(1.97,1.534,3.955),a.updateMatrix(),o.setMatrixAt(1,a.matrix),a.position.set(6.167,.857,7.803),a.rotation.set(0,.561,0),a.scale.set(3.927,6.285,3.687),a.updateMatrix(),o.setMatrixAt(2,a.matrix),a.position.set(-2.017,.018,6.124),a.rotation.set(0,.333,0),a.scale.set(2.002,4.566,2.064),a.updateMatrix(),o.setMatrixAt(3,a.matrix),a.position.set(2.291,-.756,-2.621),a.rotation.set(0,-.286,0),a.scale.set(1.546,1.552,1.496),a.updateMatrix(),o.setMatrixAt(4,a.matrix),a.position.set(-2.193,-.369,-5.547),a.rotation.set(0,.516,0),a.scale.set(3.875,3.487,2.986),a.updateMatrix(),o.setMatrixAt(5,a.matrix),this.add(o);let c=new Je(e,sr(50));c.position.set(-16.116,14.37,8.208),c.scale.set(.1,2.428,2.739),this.add(c);let l=new Je(e,sr(50));l.position.set(-16.109,18.021,-8.207),l.scale.set(.1,2.425,2.751),this.add(l);let u=new Je(e,sr(17));u.position.set(14.904,12.198,-1.832),u.scale.set(.15,4.265,6.331),this.add(u);let d=new Je(e,sr(43));d.position.set(-.462,8.89,14.52),d.scale.set(4.38,5.441,.088),this.add(d);let h=new Je(e,sr(20));h.position.set(3.235,11.486,-12.541),h.scale.set(2.5,2,.1),this.add(h);let p=new Je(e,sr(100));p.position.set(0,20,0),p.scale.set(1,.1,1),this.add(p)}dispose(){let e=new Set;this.traverse(t=>{t.isMesh&&(e.add(t.geometry),e.add(t.material))});for(let t of e)t.dispose()}};function sr(i){return new Hs({color:0,emissive:16777215,emissiveIntensity:i})}var Ly=Object.freeze({id:"tidewater-harbor",source:{q:1,r:0},edge:1,t:.660848,width:42,depth:10,clearance:16}),Dy=qt();var K0={...io,...so},Dg=ds.map(i=>({...i,styles:[i.family]})),Ng=Mc.map(i=>({...i,color:K0[i.family].land})),Pd=f0,Ld=(i,e,t,n=0,s=[])=>ds.some(r=>r.id===t)?_d(i,e,t,n,s):vc(i,e,t,n,s);var j0=gd;function Yn(i){let e=new Set,t=new Set,n=new Set;i.traverse(s=>{s.geometry&&e.add(s.geometry),s.customDepthMaterial&&t.add(s.customDepthMaterial);for(let r of Array.isArray(s.material)?s.material:s.material?[s.material]:[]){t.add(r);for(let o of Object.values(r))o?.isTexture&&n.add(o)}});for(let s of e)s.dispose();for(let s of t)s.dispose();for(let s of n)s.dispose();i.removeFromParent()}var _v=new Vs(1,0),xv=new Vs(1,1),Ud=new Rt;Ud.setAttribute("position",new Et([0,0,-1,-.52,0,-.2,0,.16,0,0,.16,0,-.52,0,-.2,0,0,1,0,0,-1,0,.16,0,.52,0,-.2,.52,0,-.2,0,.16,0,0,0,1],3));Ud.computeVertexNormals();var Vv={...io,...so};var sM=[...pc,...Pd];function Fg(i,e,t,n=0,s=[],r=4){if(pc.some(o=>o.id===t))return Xn(i,e,t);if(t.startsWith("authored-")){let o=_c(t.slice(9));if(o.q!==i||o.r!==e)throw Error("Original tile coordinate is fixed.");return o}return r===2?ld(i,e,t,n,s):Ld(i,e,t,n,s)}async function Fd(i,e,t,n=0,s=[],r=4){let o=Fg(i,e,t,n,s,r);return{...o,hash:await a0(o0(o))}}async function Od(i,{contract:e,load:t,mode:n="map",showSlot:s=!0,signal:r}={}){r?.throwIfAborted();let o=new Zi;o.background=new ge("#c6d7d2");let a=new cc({antialias:!0,alpha:!1});a.setPixelRatio(Math.min(devicePixelRatio,2)),a.shadowMap.enabled=!0,a.shadowMap.type=ss,a.toneMapping=Vr,a.toneMappingExposure=.9;let c=new Js(a),l=new Rc,u=c.fromScene(l,.04);o.environment=u.texture,o.environmentIntensity=.45,l.dispose(),c.dispose(),i.replaceChildren(a.domElement),a.domElement.setAttribute("aria-label","Interactive 3D tile preview"),a.domElement.setAttribute("tabindex","0");let d=new At(38,1,.05,150),h=new Tc(d,a.domElement);d.position.set(15,18,22),h.target.set(0,1.5,0),h.minDistance=12,h.maxDistance=48,h.maxPolarAngle=Math.PI*.46,h.enableDamping=!0,h.update(),h.saveState();let p=new Dr("#e7f3ff","#799172",.85);o.add(p);let g=new is("#fff0d5",2.4);g.position.set(-14,27,14),g.castShadow=!0,g.shadow.mapSize.set(2048,2048),Object.assign(g.shadow.camera,{left:-13,right:13,top:16,bottom:-13,near:.1,far:70}),g.shadow.normalBias=.03,o.add(g);let v=new Je(new Ji(200,200),new Bt({color:"#579f9d",roughness:.3,metalness:.18}));v.rotation.x=-Math.PI/2,v.position.y=-.16,o.add(v);let m=new Zt;o.add(m);let f=e||await Fd(8,0,"tropical-inlet"),_=yd(),b=()=>_.dispose(),S=()=>b();r?.addEventListener("abort",S,{once:!0}),r?.aborted&&S();let E;try{let F=await _.load(f,{map:!0,slot:s});if(!F)throw Error("Tile preview was interrupted.");E=F,m.add(E)}catch(F){throw r?.removeEventListener("abort",S),_.dispose(),h.dispose(),Yn(o),g.shadow.dispose(),u.dispose(),a.dispose(),a.domElement.remove(),F}let w=new Map([[JSON.stringify(f),E]]),C=0,y=!1,A=0,I=!0,R;h.addEventListener("change",()=>{I=!0});let O=()=>{let{width:F,height:V}=i.getBoundingClientRect();!F||!V||(a.setSize(F,V),d.aspect=F/V,d.updateProjectionMatrix(),I=!0)},G=new ResizeObserver(O);G.observe(i),O();function X(){y||(a.domElement.isConnected&&(h.update(),I&&(I=!1,i0(performance.now()/1e3),a.render(o,d))),A=requestAnimationFrame(X))}let U=Object.assign(()=>{if(!y){y=!0,r?.removeEventListener("abort",S),_.dispose(),C++,cancelAnimationFrame(A),G.disconnect(),h.dispose();for(let F of w.values())Yn(F);w.clear(),Yn(o),g.shadow.dispose(),u.dispose(),a.dispose(),a.domElement.remove()}},{reset(){h.reset(),I=!0},attach(F){y||(G.unobserve(i),i=F,i.replaceChildren(a.domElement),G.observe(i),O())},async update(F){let V=++C,j=JSON.stringify(F),$=w.get(j);if(!$){if($=await _.load(F,{map:!0,slot:s})||void 0,!$||y||V!==C){$&&Yn($);return}w.set(j,$),await a.compileAsync($,d,o)}if(!(y||V!==C)){w.delete(j),w.set(j,$),E.removeFromParent(),E=$,m.add($),I=!0;for(let[ae,ye]of w){if(w.size<=12)break;ye!==E&&(w.delete(ae),Yn(ye))}}}});b=U,r?.aborted&&(U(),r.throwIfAborted());try{if(a.setSize(300,152,!1),await a.compileAsync(o,d),y)return U;if(a.render(o,d),O(),X(),t)try{let F=await t();if(!y){let V=await new wc().parseAsync(F,"");if(y)return Yn(V.scene),U;R=V.scene,n==="world"&&R.scale.setScalar(ht);let j=j0(f);R.position.set(j.x*ht,j.y*ht,j.z*ht),R.traverse($=>{$.isMesh&&($.castShadow=!0,$.receiveShadow=!0)}),m.add(R),I=!0}}catch(F){throw U(),F}return U}catch(F){throw U(),F}}var Og=new URLSearchParams(location.search),Bd=Og.get("mode")||"map";async function Bg(){let i=await(await fetch("./preview.json")).json(),e=i.manifest;document.title=`${e.title} \xB7 Threetopia preview`,document.querySelector("h1").textContent=e.title;let t=document.querySelector("nav");for(let r of e.kind==="world"?["world","map","overview"]:["asset"]){let o=document.createElement("a");o.href=`?mode=${r}`,o.textContent=r==="world"?"World":r==="overview"?"Overview":r==="asset"?"Asset":"Map",o.classList.toggle("active",e.kind==="asset"||Bd===r),t.append(o)}let n=e.kind==="asset"?"asset":Bd,s=e.kind==="asset"?Object.values(e.exports).find(r=>r.endsWith(".glb")):e.content[n];if(!s)throw Error("Choose a GLB export to preview.");await Od(document.querySelector("#preview"),{contract:e.tile,mode:n,load:async()=>{let r=await fetch(`./files/${s}`);if(!r.ok)throw Error("Preview file missing.");return r.arrayBuffer()}}),document.querySelector("[data-metrics]").textContent=JSON.stringify(i.report[n]||{},null,2)}Bg().catch(i=>{document.querySelector("#preview").textContent=i.message});
/*! Bundled license information:

three/build/three.core.js:
three/build/three.module.js:
  (**
   * @license
   * Copyright 2010-2026 Three.js Authors
   * SPDX-License-Identifier: MIT
   *)
*/
