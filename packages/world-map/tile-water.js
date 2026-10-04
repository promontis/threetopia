import {BufferGeometry,Float32BufferAttribute,Mesh,MeshStandardMaterial,Color} from 'three';

/** Clip the water to submerged terrain triangles; no second surface over sand. */
export function createTileWater(surface,level,time,scale=1,waves=[]){
  const position=surface.attributes.position,index=surface.index.array,vertices=[],depths=[];
  // The shared dry rim can have exactly the same elevation as the lagoon.
  // Float32 rounding must not turn that flat bank into a coplanar water sheet.
  const shoreline=level-1e-4*scale;
  for(let i=0;i<index.length;i+=3){
    const triangle=[index[i],index[i+1],index[i+2]].map(j=>({x:position.getX(j),y:position.getY(j),z:position.getZ(j)})),polygon=[];
    for(let j=0;j<3;j++){
      const a=triangle[j],b=triangle[(j+1)%3],inside=a.y<shoreline;
      if(inside)polygon.push(a);
      if(inside!==(b.y<shoreline)){const t=(shoreline-a.y)/(b.y-a.y);polygon.push({x:a.x+(b.x-a.x)*t,y:shoreline,z:a.z+(b.z-a.z)*t});}
    }
    for(let j=1;j<polygon.length-1;j++){
      const points=[polygon[0],polygon[j],polygon[j+1]].map(p=>({...p,x:Math.fround(p.x),z:Math.fround(p.z)})),[a,b,c]=points;
      if(Math.abs((b.x-a.x)*(c.z-a.z)-(b.z-a.z)*(c.x-a.x))<1e-10*scale*scale)continue;
      for(const p of points){vertices.push(p.x,level,p.z);depths.push(Math.max(0,level-p.y)/scale);}
    }
  }
  const geometry=new BufferGeometry();geometry.setAttribute('position',new Float32BufferAttribute(vertices,3));geometry.setAttribute('waterDepth',new Float32BufferAttribute(depths,1));geometry.computeVertexNormals();
  const material=new MeshStandardMaterial({color:'#3caba6',roughness:.22,metalness:.06});
  material.onBeforeCompile=shader=>{
    shader.uniforms.uTileWaterTime=time;shader.uniforms.uWaterScale={value:scale};
    shader.uniforms.uWaterShallow={value:new Color('#91d5be')};shader.uniforms.uWaterDeep={value:new Color('#126d7d')};
    shader.uniforms.uNativeWaveA={value:waves[0]??null};shader.uniforms.uNativeWaveB={value:waves[1]??null};
    shader.vertexShader='attribute float waterDepth;varying float vWaterDepth;varying vec2 vWaterPosition;uniform float uWaterScale;\n'+shader.vertexShader.replace('#include <begin_vertex>','#include <begin_vertex>\nvWaterDepth=waterDepth;vWaterPosition=position.xz/uWaterScale;');
    shader.fragmentShader=`${waves.length===2?'#define NATIVE_WAVES\n':''}uniform float uTileWaterTime;uniform vec3 uWaterShallow;uniform vec3 uWaterDeep;
      uniform sampler2D uNativeWaveA;uniform sampler2D uNativeWaveB;
      varying float vWaterDepth;varying vec2 vWaterPosition;
      vec2 nativeWaterSlope(vec2 p,float t){
        #ifdef NATIVE_WAVES
        vec2 a=texture2D(uNativeWaveA,(p-vec2(.32,.1)*t)/13.).rg*2.-1.;
        vec2 b=texture2D(uNativeWaveA,(p+vec2(37.1,11.7)-vec2(-.1,.21)*t)/5.3).rg*2.-1.;
        vec2 c=texture2D(uNativeWaveB,(p-vec2(.08,-.11)*t)/1.9).rg*2.-1.;
        return (a*.019+b*.015+c*.015)*4.;
        #else
        return vec2(0.);
        #endif
      }\n`+shader.fragmentShader;
    shader.fragmentShader=shader.fragmentShader.replace('#include <color_fragment>',`#include <color_fragment>
      vec2 p=vWaterPosition;float t=uTileWaterTime;
      float depth=1.-exp(-vWaterDepth*.43);
      vec2 waterSlope=nativeWaterSlope(p,t);
      diffuseColor.rgb=mix(uWaterShallow,uWaterDeep,depth)*.52;
      diffuseColor.rgb+=clamp(length(waterSlope)*.11,0.,.012)*smoothstep(0.,.15,vWaterDepth);
    `).replace('#include <normal_fragment_begin>',`#include <normal_fragment_begin>
      vec2 waterP=vWaterPosition;
      float edge=smoothstep(0.,.3,vWaterDepth);
      vec3 rippleNormal=normalize(vec3(-waterSlope.x*edge,1.,-waterSlope.y*edge));
      normal=normalize(mat3(viewMatrix)*rippleNormal);
    `).replace('#include <emissivemap_fragment>',`#include <emissivemap_fragment>
      float waterFresnel=.02+.98*pow(1.-max(0.,dot(normal,normalize(vViewPosition))),5.);
      totalEmissiveRadiance+=vec3(.32,.55,.60)*waterFresnel;
    `);
  };
  material.customProgramCacheKey=()=> 'threetopia-native-tile-water-v2-'+waves.length;
  const water=new Mesh(geometry,material);water.name='Threetopia / inset lagoon water';water.receiveShadow=true;
  return water;
}
