/** Original Threetopia beacon. One material, no textures; safe to reuse under MIT. */
export function starterGLB(scale=1){
  const positions=[],colors=[],normals=[];
  function triangle(a,b,c,color){const u=b.map((v,i)=>v-a[i]),v=c.map((v,i)=>v-a[i]),n=[u[1]*v[2]-u[2]*v[1],u[2]*v[0]-u[0]*v[2],u[0]*v[1]-u[1]*v[0]],len=Math.hypot(...n)||1;for(const p of [a,b,c]){positions.push(...p.map(v=>v*scale));colors.push(...color);normals.push(...n.map(v=>v/len));}}
  const quad=(a,b,c,d,col)=>{triangle(a,b,c,col);triangle(a,c,d,col);};
  function cylinder(y,h,r1,r2,col,n=8){for(let i=0;i<n;i++){const a=i*Math.PI*2/n,b=(i+1)*Math.PI*2/n,p=[Math.cos(a)*r1,y,Math.sin(a)*r1],q=[Math.cos(b)*r1,y,Math.sin(b)*r1],r=[Math.cos(b)*r2,y+h,Math.sin(b)*r2],s=[Math.cos(a)*r2,y+h,Math.sin(a)*r2];quad(p,s,r,q,col);triangle([0,y+h,0],r,s,col);triangle([0,y,0],p,q,col);}}
  cylinder(0,.22,1.5,1.35,[.51,.58,.52]);cylinder(.22,.18,1.15,1.15,[.75,.73,.62]);
  cylinder(.40,2.2,.70,.48,[.84,.78,.62]);cylinder(1.5,.36,.605,.57,[.20,.42,.42]);
  cylinder(2.6,.16,.80,.80,[.23,.35,.36]);cylinder(2.76,.63,.49,.49,[.83,.65,.28]);
  cylinder(3.39,.14,.78,.78,[.21,.32,.35]);cylinder(3.53,.52,.80,.05,[.20,.39,.39]);
  const count=positions.length/3,arrays=[new Float32Array(positions),new Float32Array(normals),new Float32Array(colors)],binLength=arrays.reduce((n,a)=>n+a.byteLength,0),bin=new Uint8Array(binLength);let off=0;const views=arrays.map(a=>{const b={buffer:0,byteOffset:off,byteLength:a.byteLength};bin.set(new Uint8Array(a.buffer),off);off+=a.byteLength;return b;});
  const gltf={asset:{version:'2.0',generator:'Threetopia original beacon / MIT'},scene:0,scenes:[{nodes:[0]}],nodes:[{name:'Beacon',mesh:0}],meshes:[{primitives:[{attributes:{POSITION:0,NORMAL:1,COLOR_0:2},material:0}]}],materials:[{name:'Beacon',pbrMetallicRoughness:{metallicFactor:.06,roughnessFactor:.8},doubleSided:false}],buffers:[{byteLength:binLength}],bufferViews:views,accessors:views.map((_,i)=>({bufferView:i,componentType:5126,count,type:'VEC3',...(i===0?{min:[-1.5*scale,0,-1.5*scale],max:[1.5*scale,4.05*scale,1.5*scale]}:{})}))};
  const text=new TextEncoder().encode(JSON.stringify(gltf)),jsonLength=Math.ceil(text.length/4)*4,out=new Uint8Array(12+8+jsonLength+8+binLength),dv=new DataView(out.buffer);dv.setUint32(0,0x46546c67,true);dv.setUint32(4,2,true);dv.setUint32(8,out.length,true);dv.setUint32(12,jsonLength,true);dv.setUint32(16,0x4e4f534a,true);out.fill(32,20,20+jsonLength);out.set(text,20);dv.setUint32(20+jsonLength,binLength,true);dv.setUint32(24+jsonLength,0x004e4942,true);out.set(bin,28+jsonLength);return out;
}
