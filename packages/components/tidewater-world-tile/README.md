# @dgreenheck/tidewater-world-tile

Complete playable composition consuming the extracted system packages. Version 0.1.0.

Original Tidewater by **Dan Greenheck (@dgreenheck)**, pinned to revision `d32799fcd85b79fb2fde3c4254f9d3805edecee3`. Initially maintained in the Threetopia registry by **@promontis**, pending an account transfer. The `@dgreenheck/` package names and imports stay stable. This is attribution, not a claim that Dan published this conversion himself.

## Install

```sh
threetopia install @dgreenheck/tidewater-world-tile@0.1.0
```

The CLI downloads verified files and exact dependencies to `threetopia_modules/dgreenheck/`. These are Threetopia registry packages. Point your bundler's package aliases at those directories to use the scoped imports below; supply Three.js 0.186.0 once for the whole scene. The repository workspace already configures those links.

## Use in code



```js
import {TerrainData} from '@dgreenheck/tidewater-terrain';
import {Colliders} from '@dgreenheck/tidewater-player';
import {Village} from '@dgreenheck/tidewater-village';
import {Vegetation} from '@dgreenheck/tidewater-vegetation';
import {BoatModel} from '@dgreenheck/tidewater-boat';
import {Reef} from '@dgreenheck/tidewater-reef';
import {OceanFFT} from '@dgreenheck/tidewater-ocean';
import {computeShoreField} from '@dgreenheck/tidewater-terrain/world/ShoreField.js';
import {WORLD} from '@dgreenheck/tidewater-core';

// The island assembly inside the full world's initialization.
// scene and renderer come from tidewater-core's initialized Engine.
export function assembleIsland({scene, renderer}) {
  const terrainData = new TerrainData();
  const colliders = new Colliders();
  // Village adjusts the heightmap before terrain-derived data is built.
  const village = new Village({scene, terrain:terrainData, colliders});
  const vegetation = new Vegetation({scene, terrain:terrainData, village});
  const shoreField = computeShoreField(terrainData, {
    res:512, swellDir:[WORLD.swellDir.x, WORLD.swellDir.y],
  });
  const reef = new Reef({scene, terrain:terrainData, shoreField});
  const fft = new OceanFFT(renderer);
  reef.setOcean(fft);
  const boat = new BoatModel();
  scene.add(boat.group);
  boat.group.position.copy(WORLD.boatDock.position);
  boat.group.rotation.y = WORLD.boatDock.heading;
  return {terrainData, colliders, village, vegetation, shoreField, reef, fft, boat};
}
// src/App.js supplies the remaining sky, terrain, water rendering, physics,
// wildlife, audio and post-processing stages plus their ordered frame updates.
```

For the complete scene, use the supplied composition (the code above illustrates one stage):

```js
import '@dgreenheck/tidewater-core/core/TSLPatches.js';
import {App} from '@dgreenheck/tidewater-world-tile';
import {UI, AppUI} from '@dgreenheck/tidewater-ui';

const app = new App(); // requires a dedicated document with <div id="app">
await app.init();
await app.debris.scanned.promise;
const ui = new UI();
app.ui = new AppUI(app, ui);
app.start();
// The packaged entry.js adds loading, audio activation, readiness and cleanup.
```

Initialization: core → sky/lighting → terrain data → village → vegetation → derived terrain/rocks/debris → reef/boat → ocean → player/wildlife/whale → post-processing/audio/UI. Each frame updates physics, camera, sky, ocean, LODs, wildlife, lights, post-processing and audio in that order. See the shipped `src/App.js`, `entry.js` and `package-graph.json` for the complete code and dependency graph.

The world owns one immutable reserved host tile, three static world/map/overview representations, and the full playable scene runtime. The static representations come from `tidewater-map-tile`; the full original renderer runs in its own sandboxed document.

## Dependencies

- `@dgreenheck/tidewater-audio@0.1.0`
- `@dgreenheck/tidewater-boat@0.1.0`
- `@dgreenheck/tidewater-core@0.1.0`
- `@dgreenheck/tidewater-debris@0.1.0`
- `@dgreenheck/tidewater-lighting@0.1.0`
- `@dgreenheck/tidewater-map-tile@0.1.0`
- `@dgreenheck/tidewater-ocean@0.1.0`
- `@dgreenheck/tidewater-player@0.1.0`
- `@dgreenheck/tidewater-postprocessing@0.1.0`
- `@dgreenheck/tidewater-reef@0.1.0`
- `@dgreenheck/tidewater-sky@0.1.0`
- `@dgreenheck/tidewater-terrain@0.1.0`
- `@dgreenheck/tidewater-ui@0.1.0`
- `@dgreenheck/tidewater-vegetation@0.1.0`
- `@dgreenheck/tidewater-village@0.1.0`
- `@dgreenheck/tidewater-whale@0.1.0`
- `@dgreenheck/tidewater-wildlife@0.1.0`

Dependencies above are executable imports, not just catalog links. `package.json` declares exact published versions; `threetopia-lock.json` records the downloaded file hashes.

## Preview and settings

Clone this package from your own account, or run `threetopia preview` from its prepared project directory. Its registry page also contains the preview. The complete scene requires WebGPU and retains the original settings and gameplay.

Settings: **All original controls: ocean, surf, sky, camera, audio, quality and post-processing**. 

## Ownership and cleanup

These extracted systems share the original Tidewater shader context and constructor contracts. Compose them within one scene document. Some systems do not expose standalone disposal; the world host stops the animation loop, disposes audio/GPU resources and destroys its isolated document. Separate playable worlds use separate documents.

## Source, licenses and checks

MIT code; preserve `LICENSE` and `PROVENANCE.json`. Audio, scans, whale assets and fonts retain their included credits and licenses. The complete pinned source and resource inventory is recorded in the world's `coverage.json` and `source.json.gz`.

Run `threetopia check` before `threetopia push` and `threetopia publish`. Repository checks verify all 130 original source files, unchanged implementations apart from package imports, dependency closure, geometry budgets, checksums and the complete scene's gameplay lifecycle. The settings previews have separate browser checks.
