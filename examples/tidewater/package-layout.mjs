import {readFileSync} from 'node:fs';
export const owners = JSON.parse(readFileSync(new URL('./package-owners.json', import.meta.url), 'utf8'));
export const name = role => `@dgreenheck/tidewater-${role}`;
export const entries = {
  core: ['core/Engine.js','core/Input.js','core/CDLOD.js','core/Globals.js','core/SceneRenderer.js','world/WorldLayout.js'],
  lighting: ['materials/Materials.js','materials/LocalLights.js','materials/SunShadowFilter.js'],
  sky: ['sky/Atmosphere.js','sky/Sky.js','sky/Clouds.js','sky/Environment.js'],
  terrain: ['world/Terrain.js','world/TerrainData.js','world/TerrainGPU.js','world/Rocks.js'],
  village: ['world/Village.js','world/Pier.js','world/Props.js'],
  vegetation: ['world/Vegetation.js','world/vegetation/PlantGeometry.js'],
  ocean: ['ocean/OceanFFT.js','ocean/WaterSurface.js','ocean/WaterMaterial.js','ocean/WaterQuery.js','ocean/ShoreWaves.js','ocean/ShoreSim.js'],
  reef: ['world/Reef.js','world/Fish.js'],
  wildlife: ['world/wildlife/Wildlife.js','world/Gulls.js'],
  whale: ['world/marine/Whale.js'],
  debris: ['world/Debris.js','world/debris/ScannedDebris.js'],
  boat: ['world/BoatModel.js','player/BoatController.js','player/BoatSpray.js'],
  player: ['player/Player.js','player/FlyCamera.js','world/Colliders.js'],
  postprocessing: ['post/PostFX.js','post/Underwater.js','post/AirHaze.js'],
  audio: ['audio/SoundScape.js','audio/soundBank.js'],
  ui: ['ui/UI.js','ui/AppUI.js'],
  'world-tile': ['App.js'],
};
export const descriptions = {
  core:'Shared scene context, renderer services, input, layout and shader/terrain primitives',
  lighting:'Materials, sun shadows, local lights and contact lighting',
  sky:'Atmosphere, sun, clouds and environment lighting',
  terrain:'Island terrain, height data, shoreline field and rock placement',
  village:'Village buildings, boardwalk, pier and props',
  vegetation:'Palms, ferns, grass, scattering and vegetation LODs',
  ocean:'FFT ocean, waves, surf, foam, wakes, caustics and water queries',
  reef:'Corals, reef geometry, fish species and fish behavior',
  wildlife:'Birds, gulls, shorebirds and crabs with their original behavior',
  whale:'Humpback geometry, textures, rig and behavior',
  debris:'Scanned driftwood, pebbles, beach debris and placement',
  boat:'Boat geometry, fittings, controls, buoyancy and spray',
  player:'Walking, swimming, fly camera and collisions',
  postprocessing:'Underwater view, droplets, haze, motion blur and post-processing',
  audio:'All 32 recordings, spatial mixing and scene-driven sound',
  ui:'Original controls, settings, photo UI and local fonts',
  'world-tile':'Complete playable composition consuming the extracted system packages',
};
export function assetOwner(resource) {
  if (resource.startsWith('audio/')) return 'audio';
  if (resource.startsWith('models/whale/')) return 'whale';
  if (resource.startsWith('models/debris/')) return 'debris';
  if (resource.startsWith('fonts/')) return 'ui';
  throw Error(`Assign an owner for asset ${resource}`);
}
