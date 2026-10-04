/** Host-owned tile dimensions. World and map share the same normalized slot. */
export const DESERT_TILE=Object.freeze({
  id:'desert-v1',slotFraction:.625,
  map:{radius:12,floorY:.7,slotRadius:7.5,slotHeight:16},
  world:{radius:400,floorY:2.4,slotRadius:250,slotHeight:533.3333333333},
});
// Tighter host crop for compositions. The creator keeps the same slot, scale
// and budget; removing empty outer terrain must never enlarge the landmark.
export const COMPACT_TILE=Object.freeze({id:'compact-v1',map:{...DESERT_TILE.map,radius:9},world:{...DESERT_TILE.world,radius:300}});
export const LANDMARK_BUDGET=Object.freeze({
  // Preserve authored openings in architectural landmarks. Draw/texture caps
  // stay tight; forcing detailed facades into 8k triangles closed their windows.
  tile:{triangles:36000,drawCalls:4,bytes:768*1024},
  overview:{triangles:24000,drawCalls:3,bytes:512*1024},
  textureBytes:2*1024*1024,textures:2,
});
export const tileCentre=(q,r,radius=12)=>({x:Math.sqrt(3)*radius*(q+r/2),z:1.5*radius*r});
export const tileCorners=(radius=12)=>Array.from({length:6},(_,i)=>{
  const a=(i*60-30)*Math.PI/180;return{x:Math.cos(a)*radius,z:Math.sin(a)*radius};
});
export function tileInward(x,z,radius=12){
  return Math.min(...Array.from({length:6},(_,i)=>Math.sqrt(3)*radius/2-x*Math.cos(i*Math.PI/3)-z*Math.sin(i*Math.PI/3)));
}
const smooth=(a,b,x)=>{const t=Math.max(0,Math.min(1,(x-a)/(b-a)));return t*t*(3-2*t);};
/** Slot and all shared edges have a flat floor, with zero edge slope. */
export function desertHeightAt(x,z,representation='map'){
  const {radius,floorY}=DESERT_TILE[representation],u=x/radius,v=z/radius,r=Math.hypot(u,v);
  const dune=(x,z,rx,rz,h)=>Math.exp(-(((u-x)/rx)**2+((v-z)/rz)**2))*h;
  const dunes=dune(-.56,-.5,.24,.16,.22)+dune(.68,-.33,.16,.3,.18)+dune(-.3,.73,.36,.13,.16);
  // One complete row of the terrain mesh stays flat at the shared boundary.
  return floorY+radius*dunes*smooth(.64,.8,r)*smooth(.075,.21,tileInward(x,z,radius)/radius);
}
/** Source heights keep the landmark's anchor; only the host edge is blended. */
export function sampledTileHeightAt(x,z,surface,representation='map',compact=false){
  const {radius,floorY}=(compact?COMPACT_TILE:DESERT_TILE)[representation],ratio=DESERT_TILE[representation].radius/DESERT_TILE.map.radius;
  const gx=Math.max(0,Math.min(surface.size-1,(x/ratio-surface.x0)/surface.step)),gz=Math.max(0,Math.min(surface.size-1,(z/ratio-surface.z0)/surface.step));
  const ix=Math.min(surface.size-2,Math.floor(gx)),iz=Math.min(surface.size-2,Math.floor(gz)),tx=gx-ix,tz=gz-iz;
  const at=(a,b)=>surface.heights[b*surface.size+a];
  const sampled=(at(ix,iz)*(1-tx)+at(ix+1,iz)*tx)*(1-tz)+(at(ix,iz+1)*(1-tx)+at(ix+1,iz+1)*tx)*tz;
  const original=floorY+sampled*ratio,edge=compact?floorY:desertHeightAt(x,z,representation);
  // Preserve a whole mesh row along the shared edge before blending the crop.
  return edge+(original-edge)*smooth(.54*ratio,1.5*ratio,tileInward(x,z,radius));
}
/** Validate measured content, not only creator-declared metadata. */
export function validateLandmarkMetrics(metrics,lod='tile'){
  const budget=LANDMARK_BUDGET[lod];if(!budget)return ['Unknown map detail level.'];
  const errors=[],check=(ok,message)=>{if(!ok)errors.push(message);};
  for(const key of ['triangles','drawCalls','bytes'])check(Number.isInteger(metrics[key])&&metrics[key]>=0&&metrics[key]<=budget[key],`${key}: maximum ${budget[key]} for ${lod}.`);
  check(metrics.triangles>0,'The component must contain visible triangles.');
  check(Number.isFinite(metrics.radius)&&metrics.radius+.1<=DESERT_TILE.map.slotRadius,'The component and its wind margin must fit the slot radius.');
  check(Number.isFinite(metrics.minY)&&metrics.minY>=-.01&&Number.isFinite(metrics.maxY)&&metrics.maxY+.1<=DESERT_TILE.map.slotHeight,'Anchor the component at ground level, inside the slot height.');
  check(Number.isFinite(metrics.textureBytes)&&metrics.textureBytes>=0&&metrics.textureBytes<=LANDMARK_BUDGET.textureBytes,'Textures exceed the decoded GPU budget.');
  check(Number.isInteger(metrics.textures)&&metrics.textures>=0&&metrics.textures<=LANDMARK_BUDGET.textures,'At most two component textures are allowed.');
  check(metrics.forbiddenNodes===0,'The host owns lights and cameras.');
  return errors;
}
