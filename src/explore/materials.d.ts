import type { Material, Texture } from 'three/webgpu';

export interface CapturedMaterialSource {
  name: string;
  type: string;
  mesh: string;
  maps: Record<string, number | null>;
  uniforms: Record<string, unknown>;
  [property: string]: unknown;
}

export const worldTime: { value: number };
export const overviewQuality: { value: number };
export const windStrength: { value: number };
export function capturedMaterial(source: CapturedMaterialSource, textures: Texture[], project: string, origin: readonly number[]): Material;
