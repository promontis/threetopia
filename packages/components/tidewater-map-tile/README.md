# @dgreenheck/tidewater-map-tile

Lightweight map composition of the boat/pier landmark, rocks, gulls and palm. Version 0.1.0.

Original Tidewater by **Dan Greenheck (@dgreenheck)**, pinned to revision `d32799fcd85b79fb2fde3c4254f9d3805edecee3`. Initially maintained in the Threetopia registry by **@promontis**, pending an account transfer. The `@dgreenheck/` package names and imports stay stable. This is attribution, not a claim that Dan published this conversion himself.

## Install

```sh
threetopia install @dgreenheck/tidewater-map-tile@0.1.0
```

The CLI downloads verified files and exact dependencies to `threetopia_modules/dgreenheck/`. These are Threetopia registry packages. Point your bundler's package aliases at those directories to use the scoped imports below; supply Three.js 0.186.0 once for the whole scene. The repository workspace already configures those links.

## Use in code



```js
import {createMapTile} from '@dgreenheck/tidewater-map-tile';

// landmark is your loaded, decoded boat/pier Object3D.
export function addMapTile(scene, landmark) {
  const tile = createMapTile({landmark, overview:false, seed:17});
  scene.add(tile.object);
  return {
    update(elapsedSeconds) { tile.update(elapsedSeconds); },
    dispose() { tile.dispose(); },
  };
}
// The caller retains ownership of the landmark's geometry and materials.
```

The composition imports `createRocks` from `tidewater-rocks`, `createGulls` from `tidewater-gulls`, and `buildPalmFar` from `tidewater-vegetation`. In `index.js`, those components are added to the same group as the cloned boat/pier landmark. Its update forwards absolute time to the gulls, and dispose releases only generated components. The `source` export exposes terrain, village, boat and collision classes for baking the original landmark.

`map.glb` and `overview.glb` are validated, ordinary uncompressed static GLBs. The preview displays these published exports; it does not rerun landmark generation.

## Dependencies

- `@dgreenheck/tidewater-core@0.1.0`
- `@dgreenheck/tidewater-terrain@0.1.0`
- `@dgreenheck/tidewater-village@0.1.0`
- `@dgreenheck/tidewater-boat@0.1.0`
- `@dgreenheck/tidewater-player@0.1.0`
- `@dgreenheck/tidewater-vegetation@0.1.0`
- `@dgreenheck/tidewater-rocks@0.1.0`
- `@dgreenheck/tidewater-gulls@0.1.0`

Dependencies above are executable imports, not just catalog links. `package.json` declares exact published versions; `threetopia-lock.json` records the downloaded file hashes.

## Preview and settings

Clone this package from your own account, or run `threetopia preview` from its prepared project directory. Its registry page also contains the preview. The standalone WebGL preview needs no full-world initialization.

Settings: **Map/overview representation, exposure and wireframe**. 

## Ownership and cleanup

Factories return instance-owned objects. Call dispose() when removing an instance. Rocks and gulls never create a renderer, timers or DOM listeners. The map factory also preserves caller-owned landmark resources.

## Source, licenses and checks

MIT code; preserve `LICENSE` and `PROVENANCE.json`. Audio, scans, whale assets and fonts retain their included credits and licenses. The complete pinned source and resource inventory is recorded in the world's `coverage.json` and `source.json.gz`.

Run `threetopia check` before `threetopia push` and `threetopia publish`. Repository checks verify all 130 original source files, unchanged implementations apart from package imports, dependency closure, geometry budgets, checksums and the complete scene's gameplay lifecycle. The settings previews have separate browser checks.
