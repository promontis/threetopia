# Threejs-Punk Drive map inputs

These are the original assets served by [Threejs-Punk Drive](https://www.threejspunk.com/)
by Anderson Mancini and Sunag, retrieved on 2026-09-30:

| File | Source URL | SHA-256 |
| --- | --- | --- |
| `kit.glb` | `https://www.threejspunk.com/models/game/city/kit.glb` | `f38336e874dd7f301dee458cf7039058e6ccc64fdd1776233b9205c472fe18f9` |
| `kit.json` | `https://www.threejspunk.com/models/game/city/kit.json` | Recorded in the generated component's `sourceHashes.metadata` |
| `quadra_rig.glb` | `https://www.threejspunk.com/models/game/quadra_rig.glb` | `6025577fe9f82c7de7c5fca916ab2db264b2d2fd976c2e444114c48134fdef22` |

The kit metadata preserves the original object names, material palette and
LOD definitions. The car preserves its body and four wheel pivots. These are
asset inputs, separate from the MIT-licensed source code in the parent package;
the code license does not relicense the models or textures.

The map never downloads these files. `scripts/atlas/build-punk-city.mjs` selects
five buildings and nine signs, reduces the geometry and merges the car into
the same two compact, three-draw GLBs. Car colours and emissive texture samples
are baked into vertices; the original wheel pivots remain as vertex attributes.

Rebuild with a local Vite server running:

```sh
MAP_SOURCE_URL=http://127.0.0.1:55000 corepack pnpm map:build:punk
```

The browser extraction writes its ignored intermediate data to
`.context/map-lite/punk-car-source.json`. The offline builder verifies the input
hashes and all component budgets before writing to `public/map/lite/punk`.
