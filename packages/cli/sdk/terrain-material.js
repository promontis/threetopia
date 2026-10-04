import * as T from "three";
import { surfaceNoise } from "./terrain-noise.js";
const groundUniforms = /* @__PURE__ */ new Set();
let waterDetail = null;
function setTerrainWaterDetail(texture) {
  waterDetail = texture;
  for (const u of groundUniforms) u.value = texture;
}
function createTerrainMaterial(coordinateScale = 1, sandColor = '#d4c4a0') {
  const material = new T.MeshStandardMaterial({ vertexColors: true, roughness: 0.94 });
  const seabedDetail = { value: null };
  groundUniforms.add(seabedDetail);
  material.addEventListener("dispose", () => groundUniforms.delete(seabedDetail));
  seabedDetail.value = waterDetail;
  material.onBeforeCompile = (shader) => {
    shader.uniforms.uSeabedDetail = seabedDetail;
    shader.uniforms.uTerrainScale = { value: coordinateScale };shader.uniforms.uGroundSand={value:new T.Color(sandColor)};
    shader.vertexShader = "varying vec3 vGround;uniform float uTerrainScale;\n" + shader.vertexShader.replace("#include <begin_vertex>", "#include <begin_vertex>\nvGround=(modelMatrix*vec4(position,1.)).xyz*uTerrainScale;");
    shader.fragmentShader = "varying vec3 vGround;uniform sampler2D uSeabedDetail;uniform vec3 uGroundSand;\n" + surfaceNoise + shader.fragmentShader.replace("#include <color_fragment>", `#include <color_fragment>
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
    `);
    shader.fragmentShader = shader.fragmentShader.replace("#include <normal_fragment_maps>", `#include <normal_fragment_maps>
      float relief=mapNoise(vGround.xz*9.)*.012+mapNoise(vGround.xz*29.)*.003;
      relief+=under*(rubble*(bedFine.g*.036+bedMedium.r*.03)+meadow*bedFine.a*.025+ripple*.009*(1.-meadow));
      normal=mapRelief(normal,-vViewPosition,relief);
    `).replace("#include <roughnessmap_fragment>", `#include <roughnessmap_fragment>
      roughnessFactor=mix(.63,.97,smoothstep(-.1,.3,vGround.y));
    `);
  };
  material.userData.terrain = true;material.userData.sandColor=sandColor;
  material.customProgramCacheKey = () => "threetopia-ground-v3";
  return material;
}
export {
  createTerrainMaterial,
  setTerrainWaterDetail
};
