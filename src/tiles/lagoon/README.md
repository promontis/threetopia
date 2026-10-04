# Compact Lagoon proposal

**Current preview:** `/map/lagoon/` now shows the lightweight, layered render
from the original Lagoon renderer. `preview.ts` uses `BakedMap`, with native
visibility mattes, procedural Three.js ocean/clouds and adaptive texture LOD.
See [`scripts/atlas/LAGOON-NATIVE.md`](../../../scripts/atlas/LAGOON-NATIVE.md)
for the reproducible capture command, budgets and limitations.

The `scene.js`, `layout.ts`, `capture.js` and old `public/map/lagoon/tile.json`
below belong to the earlier portable-geometry proposal. The current preview
does **not** use those images: their incomplete leaf export caused a different
appearance. The geometric joining tests remain useful for the earlier proposal,
but do not establish matching edges for this native coast study.

## Earlier geometry proposal

This was a proposed replacement for the **Lagoon tile**;
the existing four-world arrangement still uses its original 400 m radius.

- Proposed radius: **105 m** (210 m corner to corner, about 182 m between parallel sides).
- Original scene centre in source coordinates: **x −12, z 3**.
- The five houses, ten trees, bridges and lagoon keep their original scale and positions.
- Only the outer 14 m of ground blends into the edge profile. Distant background cliffs are removed.
- Edges E, SW and NW each have 40 m of level ground at y 2.4 m, with beaches at either side.
  The profile is symmetric under edge reversal and has zero inward slope at the seam.
  Other edges end below sea level. `Show joins` adds short matching neighbour samples.

`scene.js` constructs the real geometry from the pinned Lagoon package. The map is
baked from that scene, with separate terrain, vegetation and waterfall images.
The previous preview used the shared image composition renderer. The current
preview uses the native capture described above.

Rebuild the images with a dev server at port 55010:

```sh
node scripts/atlas/capture-lagoon.mjs
```

The capture stages all outputs and records its source hash before publishing.
`public/map/lagoon/tile.json` is proposal metadata, not a new public SDK format.
Global grid/SDK migration and neighbouring world layouts follow after reviewing
this tile's scale. Neither the production world nor its existing map is rescaled.
