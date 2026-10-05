// Preserve immutable version 1 contracts for existing packages.
import * as legacy from './legacy-tiles.js';
import {createWangTile as createV2} from './wang-v2.js';
import {builtinTile} from './builtin-tiles.js';
export {BUILTIN_TILES,builtinTile} from './builtin-tiles.js';
import {WANG_VARIANTS,LEGACY_WANG_VARIANTS,createWangTile} from './wang.js';
export {TILE_RADIUS,MAP_SCALE,SLOT,DIRECTIONS,ORIGINAL_TILES,ring,centre,coordinates,corners,terrainHeight,canonicalJSON,sha256} from './legacy-tiles.js';
export {tileSlots,protectedWaterTiles,waterProtectionAt,protectedWaterIssue} from './tile-requirements.js';
export {LAYOUTS,STYLES,compatibleChoices,placementIssue,hostHeight,buildContains,contentOrigin,tileFootprint} from './wang.js';
export const CONTRACT_VERSION=4;
export const LEGACY_VARIANTS=[...legacy.TILE_VARIANTS,...LEGACY_WANG_VARIANTS];
export const TILE_VARIANTS=WANG_VARIANTS;
export function canonicalTile(q,r,variant,rotation=0,legacyEdges=[],version=4){
  if(legacy.TILE_VARIANTS.some(v=>v.id===variant))return legacy.canonicalTile(q,r,variant);
  if(variant.startsWith('authored-')){const tile=builtinTile(variant.slice(9));if(tile.q!==q||tile.r!==r)throw Error('Original tile coordinate is fixed.');return tile;}
  if(version===2)return createV2(q,r,variant,rotation,legacyEdges);
  return createWangTile(q,r,variant,rotation,legacyEdges);
}
export async function tileContract(q,r,variant,rotation=0,legacyEdges=[],version=4){const tile=canonicalTile(q,r,variant,rotation,legacyEdges,version);return {...tile,hash:await legacy.sha256(legacy.canonicalJSON(tile))};}
export async function verifyTile(tile){if(!tile||typeof tile!=='object')return false;try{return legacy.canonicalJSON(tile)===legacy.canonicalJSON(await tileContract(tile.q,tile.r,tile.variant,tile.rotation,tile.legacyEdges,tile.version));}catch{return false;}}
