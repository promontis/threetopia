import * as THREE from 'three/webgpu';
import { attribute, cameraPosition, color, cos, float, mix, normalMap, positionLocal, positionGeometry, positionWorld, sin, smoothstep, texture, uniform, uv, vec2, vec3, vec4, varying } from 'three/tsl';

export const worldTime = uniform(0);
export const overviewQuality = uniform(0);
export const windStrength = uniform(0.65);
/** Ports of the original GLSL vertex/atlas contracts. Shared lighting replaces demo-specific light/fog hooks. */
export function capturedMaterial(source, textures, project, origin) {
  const m = source.type === 'MeshBasicMaterial' ? new THREE.MeshBasicNodeMaterial() : new THREE.MeshStandardNodeMaterial();
  m.name = `${project}:${source.name || source.mesh}`;
  if(source.color)m.color.fromArray(source.color);
  if(source.emissive && m.emissive)m.emissive.fromArray(source.emissive);
  for(const key of ['roughness','metalness','emissiveIntensity','opacity','transparent','alphaTest','side','depthWrite','vertexColors'])if(source[key]!==undefined)m[key]=source[key];
  for(const [key,id] of Object.entries(source.maps))if(id!==null)m[key]=textures[id];
  if(source.normalScale && m.normalScale)m.normalScale.fromArray(source.normalScale);
  const name=source.name || source.mesh;
  const p=positionGeometry,t=worldTime;
  const wave=sin(t.mul(1.35).add(p.x.mul(.071)).add(p.z.mul(.113)));
  if(project==='lagoon'&&name==='vegGrass') {
    const base=attribute('iPos','vec4'),shape=attribute('iShape','vec4'),tint=attribute('iColor','vec4'),lean=attribute('aLean','vec2');
    const phase=base.x.mul(.371).add(base.z.mul(.529));
    const height=p.y,cy=cos(base.w),sy=sin(base.w);
    const local=p.xz.mul(shape.x).add(lean.mul(shape.z).mul(shape.y).mul(height.pow(2)));
    const gust=sin(t.mul(.55).sub(base.x.mul(.024)).sub(base.z.mul(.065))).mul(.45).add(.55);
    const bend=sin(t.mul(1.8).add(phase)).mul(.12).add(gust.mul(.8)).add(.25).mul(windStrength).mul(height.pow(2)).mul(shape.y).mul(.55);
    const distance=base.xz.add(vec2(origin[0],origin[2])).sub(cameraPosition.xz).length();
    const fade=smoothstep(tint.w.mul(.8),tint.w,distance).oneMinus();
    m.positionNode=vec3(base.x.add(local.x.mul(cy).sub(local.y.mul(sy))).add(bend.mul(.35)),base.y.add(shape.y.mul(height).mul(fade)).sub(bend.pow(2).mul(.25)),base.z.add(local.x.mul(sy).add(local.y.mul(cy))).add(bend.mul(.94)));
    const atlas=vec2(shape.w.mod(4),shape.w.div(4).floor()).add(vec2(uv().x.mul(.98).add(.01),uv().y.mul(.985))).div(vec2(4,3));
    const tex=texture(m.map,atlas);m.colorNode=tex.mul(vec4(varying(tint.rgb),1));m.map=null;
    m.opacityNode=tex.a;m.alphaTest=.4;m.transparent=false;m.side=THREE.DoubleSide;
  } else if(project==='lagoon'&&name==='treeLeaves') {
    const info=attribute('aInfo','vec4');
    const atlas=uv().mul(.5).add(vec2(info.y.mod(2),info.y.mul(.5).floor()).mul(.5));
    const tex=texture(m.map,atlas);m.colorNode=tex.rgb;m.map=null;m.opacityNode=tex.a;
    if(m.normalMap){m.normalNode=normalMap(texture(m.normalMap,atlas),vec2(.3));m.normalMap=null;}
    // Preserve the original leaf LOD: fewer, larger cards keep the same canopy coverage.
    const clump=attribute('aClump','vec4'),distance=clump.xyz.add(vec3(origin[0],origin[1],origin[2])).sub(cameraPosition).length().max(1);
    const fraction=mix(float(36).div(distance).pow(1.15).clamp(.15,1),float(1),overviewQuality),grow=fraction.sqrt().reciprocal().min(2.6),visible=smoothstep(fraction.mul(.8),fraction,info.x).oneMinus();
    m.positionNode=positionLocal.sub(attribute('aLeafCentre','vec3')).mul(grow.mul(visible)).add(attribute('aLeafCentre','vec3')).add(vec3(0,sin(t.mul(2.3).add(info.x.mul(211))).mul(.015),sin(t.mul(5).add(info.w.mul(3)).add(info.x.mul(211))).mul(.035).mul(windStrength)));
    m.alphaToCoverage=true;
    m.side=THREE.DoubleSide;m.alphaTest=.4;m.transparent=false;
  } else if(project==='lagoon'&&/^palm/.test(name)) {
    const w=attribute('aWind','vec4');
    m.positionNode=positionLocal.add(vec3(w.x.mul(wave).mul(.035),w.y.mul(sin(t.mul(1.7).add(w.w.mul(6.28)))).mul(.15),w.x.mul(wave).mul(.07)).mul(windStrength));
  } else if(project==='lagoon'&&name==='vegLeaf') {
    const v=attribute('aVeg','vec4');m.positionNode=positionLocal.add(vec3(wave,0,wave.mul(.5)).mul(v.x).mul(.07).mul(windStrength));
  } else if(project==='sakura'&&/^(grass|reeds)/.test(name)) {
    const h=attribute('aH','float');
    m.colorNode=mix(color('#263c16'),color('#91a055'),smoothstep(0,1,h)).mul(mix(.45,1,smoothstep(0,.5,h)));
    m.positionNode=positionLocal.add(vec3(wave.mul(.08),0,wave.mul(.05)).mul(h.pow(2)).mul(windStrength));m.side=THREE.DoubleSide;
  } else if(project==='sakura'&&name==='forest') {
    const tex=textures[source.uniforms.tMap.texture];const atlas=uv().add(vec2(attribute('aVariant','float').mul(.25),0));
    m.map=null;m.colorNode=texture(tex,atlas).rgb;m.opacityNode=texture(tex,atlas).a;m.alphaTest=.45;m.transparent=false;m.side=THREE.DoubleSide;
    m.positionNode=positionLocal.add(vec3(wave.mul(.025).mul(p.y.pow(2)),0,wave.mul(.013).mul(p.y.pow(2))));
  } else if(project==='sakura'&&name==='flowers') {
    const atlas=vec2(uv().x.add(attribute('aKind','float')).div(3),uv().y);
    if(m.map){const tex=texture(m.map,atlas);m.colorNode=tex;m.opacityNode=tex.a;m.map=null;}
    m.positionNode=positionLocal.add(vec3(wave.mul(.025).mul(p.y),0,wave.mul(.02).mul(p.y)));m.alphaTest=.4;m.side=THREE.DoubleSide;
  } else if(project==='sakura'&&/^(bark|foliage)/.test(name)) {
    const w=attribute('aWind','vec3');
    const sway=wave.mul(w.x.pow(2).mul(.018).add(w.x.mul(.004))).mul(.12).mul(windStrength);
    m.positionNode=positionLocal.add(vec3(sway,sin(t.mul(4.1).add(w.y.mul(5))).mul(.012),sway.mul(.7)));
  }
  if(source.maps.normalMap!==undefined&&source.maps.normalMap===source.maps.roughnessMap) {
    m.roughnessNode=texture(textures[source.maps.normalMap])[project==='sakura'?'b':'a'];m.roughnessMap=null;
  }
  if(project==='lagoon'&&/^waterfall/.test(name)) {
    const stream=sin(uv().y.mul(90).sub(t.mul(8)).add(sin(uv().x.mul(50)))).mul(.5).add(.5);
    m.colorNode=mix(color('#2a827e'),color('#e2f0e6'),stream.mul(.55));
    m.opacityNode=stream.mul(.3).add(.45);m.roughness=.22;m.metalness=.15;m.transparent=true;m.depthWrite=false;m.side=THREE.DoubleSide;
  }
  if(project==='lagoon'&&/^rocks-/.test(name)){m.vertexColors=false;m.color.set('#87765e');m.colorNode=mix(color('#665c4f'),color('#a5977a'),sin(positionWorld.y.mul(2.1).add(sin(positionWorld.x.mul(.3)))).mul(.15).add(.65));}
  // Standard textures carry the source albedo. Keep bloom controlled under one exposure.
  if(m.emissiveIntensity)m.emissiveIntensity=Math.min(m.emissiveIntensity,2.5);
  return m;
}
