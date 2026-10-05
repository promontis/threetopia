# @dgreenheck/tidewater-reef

Corals, reef geometry, fish species and fish behavior. Version 0.1.0.

Original Tidewater by **Dan Greenheck (@dgreenheck)**, pinned to revision `d32799fcd85b79fb2fde3c4254f9d3805edecee3`. Initially maintained in the Threetopia registry by **@promontis**, pending an account transfer. The `@dgreenheck/` package names and imports stay stable. This is attribution, not a claim that Dan published this conversion himself.

## Install

```sh
threetopia install @dgreenheck/tidewater-reef@0.1.0
```

The CLI downloads verified files and exact dependencies to `threetopia_modules/dgreenheck/`. These are Threetopia registry packages. Point your bundler's package aliases at those directories to use the scoped imports below; supply Three.js 0.186.0 once for the whole scene. The repository workspace already configures those links.

## Use in code

Needs the completed shore field and adjusted TerrainData. Connect OceanFFT with setOcean so coral sway follows the same swell. Update receives delta seconds and the camera position.

```js
import { Reef } from "@dgreenheck/tidewater-reef/world/Reef.js";

// Construction excerpt from App.init(), using its existing services.
// app is the composition being initialized, not an already-running second scene.
export function attachComponent(app) {
  const {scene, renderer, camera} = app;
  app.reef = new Reef( { scene, terrain: app.terrainData, shoreField: app.shoreField } );
}

```

## Dependencies

- `@dgreenheck/tidewater-core@0.1.0`
- `@dgreenheck/tidewater-lighting@0.1.0`
- `@dgreenheck/tidewater-ocean@0.1.0`

Dependencies above are executable imports, not just catalog links. `package.json` declares exact published versions; `threetopia-lock.json` records the downloaded file hashes.

## Preview and settings

Clone this package from your own account, or run `threetopia preview` from its prepared project directory. Its registry page also contains the preview. The preview opens this component **in the complete Tidewater scene**, with its own component settings tab. It requires WebGPU; the rest of the scene remains present to supply lighting, terrain, water and gameplay context. It is not an isolated subsystem benchmark.

Settings: **Reef visibility**. The exact-version preview reference points to `@dgreenheck/tidewater-world-tile@0.1.0`; this is a presentation link, not an installation dependency, so it creates no circular package dependency. Local contextual previews need registry access.

## Ownership and cleanup

These extracted systems share the original Tidewater shader context and constructor contracts. Compose them within one scene document. Some systems do not expose standalone disposal; the world host stops the animation loop, disposes audio/GPU resources and destroys its isolated document. Separate playable worlds use separate documents.

## Source, licenses and checks

MIT code; preserve `LICENSE` and `PROVENANCE.json`. Audio, scans, whale assets and fonts retain their included credits and licenses. The complete pinned source and resource inventory is recorded in the world's `coverage.json` and `source.json.gz`.

Run `threetopia check` before `threetopia push` and `threetopia publish`. Repository checks verify all 130 original source files, unchanged implementations apart from package imports, dependency closure, geometry budgets, checksums and the complete scene's gameplay lifecycle. The settings previews have separate browser checks.
