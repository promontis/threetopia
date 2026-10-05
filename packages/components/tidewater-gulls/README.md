# @dgreenheck/tidewater-gulls

Animated gull geometry and a scene-independent flock factory. Version 0.1.0.

Original Tidewater by **Dan Greenheck (@dgreenheck)**, pinned to revision `d32799fcd85b79fb2fde3c4254f9d3805edecee3`. Initially maintained in the Threetopia registry by **@promontis**, pending an account transfer. The `@dgreenheck/` package names and imports stay stable. This is attribution, not a claim that Dan published this conversion himself.

## Install

```sh
threetopia install @dgreenheck/tidewater-gulls@0.1.0
```

The CLI downloads verified files and exact dependencies to `threetopia_modules/dgreenheck/`. These are Threetopia registry packages. Point your bundler's package aliases at those directories to use the scoped imports below; supply Three.js 0.186.0 once for the whole scene. The repository workspace already configures those links.

## Use in code



```js
import {createGulls} from '@dgreenheck/tidewater-gulls';

export function addGulls(scene) {
  const gulls = createGulls({seed:17, count:7, height:[3.6,5.6]});
  scene.add(gulls.object);
  return {
    update(elapsedSeconds) { gulls.update(elapsedSeconds); },
    dispose() { gulls.dispose(); },
  };
}
// update takes absolute elapsed seconds, not a frame delta.
```

## Dependencies

- Three.js peer dependency; no other Tidewater packages.

Dependencies above are executable imports, not just catalog links. `package.json` declares exact published versions; `threetopia-lock.json` records the downloaded file hashes.

## Preview and settings

Clone this package from your own account, or run `threetopia preview` from its prepared project directory. Its registry page also contains the preview. The standalone WebGL preview needs no full-world initialization.

Settings: **Seed, count, animation speed, exposure and wireframe**. 

## Ownership and cleanup

Factories return instance-owned objects. Call dispose() when removing an instance. Rocks and gulls never create a renderer, timers or DOM listeners. The map factory also preserves caller-owned landmark resources.

## Source, licenses and checks

MIT code; preserve `LICENSE` and `PROVENANCE.json`. Audio, scans, whale assets and fonts retain their included credits and licenses. The complete pinned source and resource inventory is recorded in the world's `coverage.json` and `source.json.gz`.

Run `threetopia check` before `threetopia push` and `threetopia publish`. Repository checks verify all 130 original source files, unchanged implementations apart from package imports, dependency closure, geometry budgets, checksums and the complete scene's gameplay lifecycle. The settings previews have separate browser checks.
