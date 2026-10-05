# Complete playable scenes

A scene conversion preserves the whole requested source scene: geometry, materials,
shaders, simulation, animation, player physics, interactions, audio and controls.
Extracting two reusable objects is a component study, not a complete conversion.
Pin the reference revision, inventory every feature and asset, and map each one to
an extracted component, shared host service or complete scene runtime. An omission
requires a change to the agreed scope; never silently label it complete.

## Runtime and map representations

CLI/SDK 0.7.0 adds an optional `runtime` to asset and world manifests. The
`iframe-scene-v1` format preserves an application's renderer and module state in
an isolated scene document. It runs the original WebGPU shaders, simulation,
gameplay and UI. A scene can be installed and reused in another creator's package.

This is a complete playable scene view, not geometry merged into the shared map's
renderer. World packages still reserve an immutable tile and provide static
world/map/overview GLBs for their map representations. Those representations may
be simplified; the playable scene must retain the requested behavior.

The preview host verifies each file's SHA-256 before execution. It supplies only
the declared package bytes to an opaque-origin iframe. Scene scripts cannot read
the parent document, cookies or account storage, and the frame cannot fetch from
the network. Original asset requests use `https://threetopia.invalid/assets/` and
resolve to included blobs. Pointer lock, user-triggered audio and photo downloads
are supported. UI preferences use a bounded, package-specific store.

## Manifest

```json
{
  "runtime": {
    "format": "iframe-scene-v1",
    "entry": "scene.js",
    "preload": ["three.js"],
    "style": "scene.css",
    "assets": {"audio/surf.ogg": "assets/audio/surf.ogg"},
    "features": ["ocean", "player", "audio"],
    "coverage": "coverage.json"
  }
}
```

Every referenced path must be in the ordinary manifest file list. Scripts are
self-contained classic bundles: no imports, exports, external CDNs or `require`.
Separate a large library bundle using `preload`; the existing 2 MiB/module,
8 MiB/code and 64 MiB/package limits still apply. CSS may reference included
resources with `url(@asset(fonts/inter.ttf))`.

The entry initializes its application under `#app`. It reports progress through
`globalThis.__threetopiaHost.progress(fraction, message)`, errors through
`error(message)`, and readiness through `ready({features: {ocean: true, ...}})`.
Every declared feature must be ready. It exposes `__threetopiaRuntime` with
`pause()`, `resume()`, `reset()` and an idempotent `dispose()`; stop loops, audio
and GPU work before disposal. Removing the frame releases its remaining document
and module state.

`coverage.json` records `schemaVersion: 1`, the source revision, `features`,
`sources` (path, SHA-256, and `bundled`, `stylesheet` or `retained-source` state),
`assets` (resource and file), and `omitted: []`. Asset paths are relative to the
coverage report. CLI and server reject incomplete or inconsistent coverage.
These structural checks do not prove rendering or gameplay; browser acceptance
tests must verify the actual scene.

## Install and reuse

```sh
threetopia create tidewater-world-tile --kind asset --from ./complete-scene
threetopia check tidewater-world-tile --json
threetopia preview tidewater-world-tile
threetopia push tidewater-world-tile
```

After its creator chooses to publish, another creator can run inside their project:

```sh
threetopia install @creator/tidewater-world-tile@0.1.0
threetopia use @creator/tidewater-world-tile --export scene --as scene
threetopia check --json
threetopia preview
```

`use --as scene` verifies the entire installed version before copying its runtime,
assets, source archive and credits. It preserves existing map geometry. Apps can
also import `mountScene` from `@threetopia/sdk/scene` and supply a manifest,
`loadFile(path)`, container and AbortSignal. Each call has independent state and
returns a cleanup function with `pause`, `resume` and `reset` methods.

The [complete Tidewater example](/tidewater) retains the original pinned application
and all its assets. Its GPU acceptance test exercises the actual controls, walking,
swimming, driving, underwater effects, day/night state and every audio recording.
