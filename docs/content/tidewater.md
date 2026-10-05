# Complete Tidewater conversion

This example packages the complete playable application from Dan Greenheck's
Tidewater, pinned at `d32799fcd85b79fb2fde3c4254f9d3805edecee3`, under its MIT
license. `packages/components/tidewater-world-tile` preserves the Three.js application:
island, village, pier, vegetation, debris, reef, fish, birds,
crabs, whale, FFT ocean, surf, wakes, sky, lighting, post-processing, walking,
swimming, boat controls, all 32 audio recordings and the original UI.

## Package structure

The complete conversion has **20 published registry packages at version 0.1.0**. Every name below uses the
`@dgreenheck/tidewater-` prefix. The current managing account is `@promontis`;
the author namespace is reserved explicitly for this conversion.

The published world retains its original tile contract at `(1,1)`. That position
was subsequently designated protected whale habitat. The release, installation
and playable package preview remain available; the shared map keeps this cell as
natural ocean. A future placement must use an allowed position without changing
the immutable 0.1.0 release.

| Role | Package suffixes | Responsibility |
| --- | --- | --- |
| World composition | `world-tile` | Complete playable scene; imports the system packages and depends on the map-tile |
| Map composition | `map-tile` | Separate reusable `map` and cheaper `overview` GLBs, built from shared components |
| Environment | `terrain`, `village`, `vegetation`, `rocks`, `debris` | Island, buildings, pier, plants and beach props |
| Water and wildlife | `ocean`, `reef`, `wildlife`, `whale`, `gulls` | Waves, surf, corals, fish, birds, crabs and humpback |
| Interaction | `boat`, `player`, `audio`, `ui` | Boat geometry/controls, walking/swimming, sound and original interface |
| Rendering services | `core`, `lighting`, `sky`, `postprocessing` | Shared context, shadows, atmosphere and post effects |

These packages own their implementation files and assets. Cross-package imports
are explicit; they never import back into `source-tidewater`. The original source
tree remains the pinned reference. Tests compare all 130 extracted implementations
with that reference, permitting only the reviewed import rewrites and two earlier
geometry shims. Dependencies have no cycles. The map's native landmark pipeline
imports village and boat code through the map-tile package's `source` export.

`core` still provides the shared Tidewater shader/context state. System constructors
take their original scene/renderer/terrain services; two complete worlds use separate
scene documents. This extraction is not a claim that every system is a stateless
object factory or can independently dispose the original renderer.

```sh
# Export all 20 projects in dependency order for a reserved tile:
pnpm example:tidewater:packages --output .context/tidewater-release \
  --creator YOUR_HANDLE --tile my-world/tile.lock.json

# Offline, without a reservation: 19 reusable assets plus a local world preview.
pnpm example:tidewater:packages --output .context/tidewater-review
```

`packages.json` records the exact output names and directories. Supply an unchanged
tile lock to emit `tidewater-world-tile` as `kind: world`; no reservation is invented.
Without it, the world output is explicitly named `tidewater-world-tile-preview` and
is not a registrable world. All other outputs are reusable `kind: asset` packages.

The world includes the complete runtime and three static representations required
by the tile contract. Its static `world.glb` contains the native landmark composition;
the full island, shaders and gameplay live in the playable runtime. The separate
map package owns the matching `map.glb` and `overview.glb` exports. Neither static
representation is presented as a complete simulation.

Publish dependencies only when release is requested, following the output order.
Register the prepared world with its matching reservation:

```sh
threetopia create tidewater-world-tile --kind world --tile RESERVATION_ID \
  --from .context/tidewater-release/tidewater-world-tile
threetopia check tidewater-world-tile --json
threetopia push tidewater-world-tile
```

The integration test uses a local registry: it publishes the map and 18 components,
registers a reserved world, installs all 20 packages as a second creator and rebuilds
the composition using only installed modules. An incorrect tile lock is rejected.

## Complete playable preview

```sh
pnpm dev:example:tidewater:full
# http://127.0.0.1:5197/
pnpm example:tidewater:full --output .context/my-complete-tidewater --creator YOUR_HANDLE
pnpm threetopia check .context/my-complete-tidewater --json
pnpm threetopia preview .context/my-complete-tidewater
```

The build accounts for all 130 upstream source files, all 54 original public asset
files and locally bundled fonts with their licenses. Audio, scans, whale files and
fonts belong to their respective system packages. A source archive, package graph
and per-file coverage report are included. The playable distribution is
about 37 MiB and has no runtime dependency on the original demo or a CDN.

It uses the [complete scene runtime](/scenes) in its own isolated document, keeping
its own renderer and original global state. It can be previewed, registered,
installed and attached to another creator's package with `use --as scene`. Its
playable rendering is separate from the shared map's simplified GLBs. This is the
pinned Three.js version in this repository; later upstream engines and features
are outside that reference revision.

```sh
pnpm test:scene:full
```

The full acceptance test requires Chrome with an actual WebGPU adapter. Missing
WebGPU fails the test. It exercises walking, settings, flashlight, time controls,
boarding and driving the boat, camera switching, swimming/diving, night state,
all audio decodes, moving wildlife, pause/resume and disposal. It also verifies
isolation and no external asset requests. The regular CI gate checks source/asset
integrity, the complete registry/install route, release packaging and the scene
host; run this GPU gate on a capable machine before accepting scene fidelity.

## Extracted object components

The smaller `packages/components/tidewater-rocks` and `tidewater-gulls` packages
demonstrate independent object reuse alongside the complete package graph. These
are published on the Threetopia registry (not npm). Their provenance
files retain the original copyright and source paths.

| Component | Package API | Original consumer |
| --- | --- | --- |
| Fractured rocks | `createRocks(options)`, `buildRockGeometry(style, seed, detail)` | Tidewater's `Rocks` still uses the extracted geometry through its existing import |
| Gull geometry and compact flight | `createGulls(options)`, `update(seconds)`, `dispose()` | The Tidewater map now imports the flock; the source gull shader imports the same geometry factory |

The geometry remains unchanged. The convenience rock material is ordinary PBR;
Tidewater's detailed shader stays with its host. The flock uses the existing map's
CPU flight adaptation. The separate complete scene package above retains the island wildlife AI, shorebirds, whale rig, ocean simulation and boat controller with their original behavior.

## Run it locally

From this repository, with its dependencies installed:

```sh
pnpm threetopia analyze packages/world-sources/tidewater --json
pnpm example:tidewater
pnpm dev:example:tidewater
```

Open `http://127.0.0.1:5196/` to see the same exports in a coastal study and a separate
garden. Pause time, orbit the views, and replace the garden without affecting the coast.
The original Tidewater map at `/map/lite/` uses the extracted gull package too.

The export command creates three local projects under `.context/tidewater-packages/`:
rocks and gulls each include code, types, provenance and a static model; the coastal
composition includes world, map and overview GLBs and exact dependencies on both.
It refuses to overwrite existing projects. Choose a fresh output for subsequent runs:

```sh
pnpm example:tidewater --output .context/tidewater-review --creator YOUR_HANDLE
pnpm threetopia check .context/tidewater-review/tidewater-rocks --json
pnpm threetopia preview .context/tidewater-review/tidewater-rocks
```

Replace `YOUR_HANDLE` with the real lowercase creator handle. The default `example`
namespace is a local placeholder, never an instruction to install a public package.
Preview GLBs freeze the flock at time zero; the browser example imports its animation.

## Register and review

After choosing your actual handle, generate the projects with `--creator` as above:

```sh
threetopia create tidewater-rocks --kind asset --from .context/tidewater-review/tidewater-rocks
threetopia push tidewater-rocks
```

Repeat for gulls. Review their private previews and publish them when ready before
uploading the coastal composition, whose dependencies use the same handle and
package names. These are asset packages. For an actual world, reserve a tile and
create the world first. Pass its unchanged lock to the example exporter:

```sh
pnpm example:tidewater --output .context/tidewater-for-tile --creator YOUR_HANDLE --tile my-world/tile.lock.json
```

The composition scales to the reserved build area's radius and validates all three
representations against the actual contract. After registering and publishing its
asset dependencies, install the coastal composition inside your world and run
`threetopia use @YOUR_HANDLE/tidewater-coast --export world --as world`; repeat for
`map` and `overview`. `check` and a private `push` then validate the complete world.

## Quality checks

```sh
pnpm check:quality
```

This builds the standalone CLI release, runs typechecks and unit tests, starts an
isolated local registry for CLI/concurrency tests, installs the release tarball in
a clean temporary directory, and runs the two-scene browser test. The installed
CLI must analyze, check, build and render all three composition exports offline.
It sends no real emails and never uploads to production. The CI workflow runs the
same command for pull requests.

Checks include pre-extraction rock hashes across four styles and four detail levels,
gull geometry parity with shipped map data, deterministic seeds, independent instances,
idempotent cleanup, paused animation, visible rendered pixels, browser draw budgets,
and a second creator installing the real packages with their transitive dependencies.
Direct invalid-JavaScript uploads must also fail server validation and publication.

## Package previews and author namespace

All twenty packages use `@dgreenheck/` and credit Dan Greenheck. They are initially managed by `@promontis`. Every README includes usage code, dependency relationships, ownership and preview settings. Rocks, gulls and map-tile have standalone WebGL previews; the sixteen integrated systems have an exact-version preview reference to the world-tile with their own component settings tab. These references are presentation links, not dependency edges. The complete scene retains its original WebGPU controls.

## Published packages

All releases below were created, checked, pushed and published through the CLI.

- [@dgreenheck/tidewater-world-tile](https://creators.threetopia.com/packages/05b47c2c-5a5f-450c-a07a-8acd9aab1c16) — v0.1.0
- [@dgreenheck/tidewater-map-tile](https://creators.threetopia.com/packages/4af82656-c07e-4ab2-8ba5-89fa27962a86) — v0.1.0
- [@dgreenheck/tidewater-audio](https://creators.threetopia.com/packages/866abde0-7186-467f-9466-f83d01fb4b4a) — v0.1.0
- [@dgreenheck/tidewater-boat](https://creators.threetopia.com/packages/2bd1a386-ba93-4df2-8700-988cd7d0e383) — v0.1.0
- [@dgreenheck/tidewater-core](https://creators.threetopia.com/packages/ed9391a6-143a-48f5-bf73-9237b32a362c) — v0.1.0
- [@dgreenheck/tidewater-debris](https://creators.threetopia.com/packages/2641f836-2c2d-455f-9fdc-311b5604515b) — v0.1.0
- [@dgreenheck/tidewater-gulls](https://creators.threetopia.com/packages/589a0010-8392-442c-a7e7-b299137ffe51) — v0.1.0
- [@dgreenheck/tidewater-lighting](https://creators.threetopia.com/packages/b84cbd05-0c9a-4dd9-bf40-4924d78677eb) — v0.1.0
- [@dgreenheck/tidewater-ocean](https://creators.threetopia.com/packages/ef221175-a05f-42ef-b131-1b2560d9a14d) — v0.1.0
- [@dgreenheck/tidewater-player](https://creators.threetopia.com/packages/941b0845-31c9-4073-9be3-0cbf1f8cc6fc) — v0.1.0
- [@dgreenheck/tidewater-postprocessing](https://creators.threetopia.com/packages/c16f144c-8926-4454-9941-2a0c7d52bdba) — v0.1.0
- [@dgreenheck/tidewater-reef](https://creators.threetopia.com/packages/98132b3c-05bd-44e8-adec-2a84d044b528) — v0.1.0
- [@dgreenheck/tidewater-rocks](https://creators.threetopia.com/packages/826a3d46-0aff-45f8-a248-159fb4386cc7) — v0.1.0
- [@dgreenheck/tidewater-sky](https://creators.threetopia.com/packages/3db5d904-a666-4420-9e3a-da0112233e38) — v0.1.0
- [@dgreenheck/tidewater-terrain](https://creators.threetopia.com/packages/5843063d-809e-41fd-b00e-bad8ab30c8b5) — v0.1.0
- [@dgreenheck/tidewater-ui](https://creators.threetopia.com/packages/60726d47-54b2-45b5-8a29-99fece53c1f4) — v0.1.0
- [@dgreenheck/tidewater-vegetation](https://creators.threetopia.com/packages/57afc4bb-6a55-4d2b-aa1c-a002f7b37c61) — v0.1.0
- [@dgreenheck/tidewater-village](https://creators.threetopia.com/packages/cc6089aa-1b70-40be-8b15-7d21570ca116) — v0.1.0
- [@dgreenheck/tidewater-whale](https://creators.threetopia.com/packages/4dffcb97-d4d9-4966-856b-9c903103371c) — v0.1.0
- [@dgreenheck/tidewater-wildlife](https://creators.threetopia.com/packages/6964ebb4-b21d-4098-9174-60196679f1e3) — v0.1.0
