export const surfaceNoise=`
  float mapHash(vec2 p){return fract(sin(dot(p,vec2(127.1,311.7)))*43758.5453);}
  float mapNoise(vec2 p){vec2 i=floor(p),f=fract(p);f=f*f*(3.-2.*f);return mix(mix(mapHash(i),mapHash(i+vec2(1.,0.)),f.x),mix(mapHash(i+vec2(0.,1.)),mapHash(i+vec2(1.,1.)),f.x),f.y);}
  vec3 mapRelief(vec3 n,vec3 p,float height){vec3 px=dFdx(p),py=dFdy(p),a=cross(py,n),b=cross(n,px);float det=dot(px,a);return normalize(abs(det)*n-sign(det)*(dFdx(height)*a+dFdy(height)*b));}
`;
