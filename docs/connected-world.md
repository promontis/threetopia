# Four places, one connected world

`/world/` combines Lagoon Tree Village, Sakura River Valley, Tidewater and
Threejs-Punk in one Three.js r186 WebGPU scene. One first-person camera and capsule
walk between the regions, without loading another page, an iframe or another
renderer. Each complete level occupies one large Wang tile; the world has exactly
four occupied tiles: Lagoon at the centre and three neighbours around it.
Unoccupied space is ocean. Meadow is not part of this world.

## Run and explore

```sh
corepack pnpm install
corepack pnpm dev
```

Open `/world/` on the local Vite server. The public `world.threetopia.com` domain
shows only the compact map preview; the walking world is not released. Locally, a progress loader is shown
while the source packages load, then walking starts automatically. There is no
second entry button and the world document does not include the landing page.
WASD or arrow keys move, Shift runs, Space jumps, and clicking the view captures
the mouse. Escape releases it; Q/E also turn the view using the keyboard. Touch devices
have a movement pad and drag-to-look.
**Destination** chooses Sakura, Tidewater, Punk or the Lagoon centre. The walk
uses the same physics as manual movement; **Return to centre** follows the same
branch home. Choosing a different neighbour while away from the centre first
walks back through Lagoon, then takes the selected branch. **Map** (M) shows the
centre, neighbouring levels, player position and ocean expansion slots.
The maker dialog links each original project.

The browser needs a WebGPU adapter. Unsupported devices get an explanation,
retry and a working home link. The homepage still uses its existing r184/WebGL
portal and works without WebGPU. The world is a separate document. Its expensive renderer pauses while the map
dialog is open.

## Source packages and provenance

These are private pnpm workspace packages created for this integration. The
upstream projects are independent demos, not published Threetopia npm packages.

| Workspace package | Pinned upstream | Actual components used |
| --- | --- | --- |
| `@threetopia/source-lagoon` | [cryptomanavan's demo](https://lagoon-tree-village-creatures.netlify.app/), `index-BjH0GYGf` | Captured original treehouses, trees, bridges, stairs, foliage instances, textures, generated terrain albedo, height field and collision mesh. |
| `@threetopia/source-sakura` | [Meng To's demo](https://valley.mengto.here.now/), `scene-SV5IBQX7` | Captured original temple, red bridge, rocks, trees, plants, boat, source textures, terrain albedo and height field. |
| `@threetopia/source-tidewater` | [Dan Greenheck's source](https://github.com/dgreenheck/tidewater/tree/d32799fcd85b79fb2fde3c4254f9d3805edecee3), `d32799fcd85b79fb2fde3c4254f9d3805edecee3` | Live original Village, Pier and Vegetation builders, Noise/TerrainData and TSL materials; OceanFFT and SeaDetail drive the shared sea. |
| `@threetopia/source-punk` | [Anderson Mancini and Sunag's source](https://github.com/ektogamat/threejs-conference/tree/8cc20593b2270e2ce832e7b7b44356705daddec4), `8cc20593b2270e2ce832e7b7b44356705daddec4` | Original city, car and billboard assets and loaders; video materials, wet ground, collision-height rendering and collision rain factories. |

The Lagoon and Sakura `original/` directories retain the publicly served files.
`source-manifest.json` records their URLs and SHA-256 hashes. The separate
`capture/` directories expose the original generated scene before the demo's
own animation/postprocessing starts. `captured-manifest.json` preserves the source
geometry descriptors, custom attributes and shader text. Runtime geometry is
quantized, deduplicated and compressed; source originals remain intact.

Tidewater's pin is the last investigated Three.js version. Its newer custom-engine
main branch and later fishing system are not included. Punk's outer invisible
boundary is omitted so the city can be entered on foot.

Upstream license files and credits are retained. Tidewater code is MIT with
separate asset credits; Punk's MIT license explicitly excludes its public assets.
No project license was found for Lagoon or Sakura. Their public availability
does not establish redistribution permission. This local integration does not
change those rights or grant a license to republish the source assets.

## Shared runtime and terrain

- `src/explore/world.ts` owns the single scene, renderer, camera, frame loop,
  lighting, sky, lifecycle, loading, map and credits. Regions fade from daytime
  woodland/coast to the rainy city. Distance culling limits foliage and shadows.
- `native-packages.js` adapts the original Tidewater/Punk factories. Region origins
  are applied consistently to geometry, vegetation camera queries and collisions.
  Tidewater's standalone velocity MRT is removed from its materials because the
  host uses a shared color target. The Punk height and reflection passes are
  restricted to city objects, avoiding incompatible displaced foliage in those passes.
- `package-loader.ts` restores the captured geometry, instance matrices, custom
  attributes and texture settings. `materials.js` ports the relevant GLSL foliage,
  atlas and wind behavior to TSL. Far-forest instances are clipped to the
  footprint, edge plants follow the shared height blend, and background tree
  cards are kept clear of the walking trail. `water.js` runs the original Tidewater FFT with
  a common water material and sea level.
- `config.ts` places Lagoon at axial `(0,0)`, Sakura at `(1,0)`, Tidewater at
  `(-1,1)` and Punk at `(0,-1)`. Every neighbour touches Lagoon directly. Each
  complete source level occupies a hex of radius 400 m:
  693 m between opposite sides and 800 m between opposite corners. Each source
  footprint is recentered inside its own tile at its original scale. The scene
  origins, collision transforms, source-local trail landmarks, sea extent, city
  lighting transition and map all follow this actual world arrangement. Distance
  culling, source updates, city atmosphere and street width use both horizontal
  coordinates; they do not assume a left-to-right chain.
- `tile-layout.ts` finds the first incomplete ring around `(0,0)`. The current
  three unoccupied first-ring slots are shown as dashed ocean on the map. Once
  that ring is full, the next candidate ring has twelve slots. These are placement
  candidates only: they do not create terrain, colliders or placeholder levels.
  Adding a source level still requires its scene adapter and compatible Wang edges.
- `hex-world.ts` checks six declared Wang signatures per tile. Adjacent edges
  must match or placement fails. The three shared edges use a `shore-path`
  profile: a centred 2.8 m path, fixed ground samples and sea level zero. Outer
  `open-sea` edges slope below the water; both profiles meet at seabed-height
  corners. Adjacent cells reference the same canonical contract. The profile
  drives the physical ground and blends into each level over 35 m, so terrain
  and collision agree at every seam. The four terrain meshes retain roughly 2 m
  vertex spacing; these internal triangles are not additional tiles.
- Region heights blend over 35 m boundary bands. Three walking branches start
  at the same Lagoon spawn and pass through their own Wang port. The source-local
  routes retain Sakura’s bridge and Tidewater’s pier opening. A bidirectional
  grade envelope keeps its slope at or below 0.4. Raised sections are visible
  timber bridges with supports, and their surface is also the walking floor.
  All outer tile edges slope below sea level. The shared Tidewater FFT ocean
  surrounds the cluster; there is no extra land in empty expansion slots.
- `collision.ts` builds MeshBVHs from original architecture and colliders.
  `player.ts` advances a vertical capsule in steps of at most 1/90 s, with gravity,
  step clearance, jump and water buoyancy. The guide uses this same controller;
  a real obstruction stops it instead of teleporting the player through it.
  `journey.ts` selects the branch and direction, routing a neighbour-to-neighbour
  journey via the common centre. Shared path segments are drawn only once.

This is an authored central cluster of four complete level tiles with validated
Wang edge signatures and ring-based expansion positions, not a random tile solver
or arbitrary scene importer. A source
level is never split across tiles. The landing's earlier checker/proposal remains
separate.

## Adaptations and limits

The original geometry and assets are retained, but this is a shared rendering
adaptation, not pixel-identical playback of four apps. Lagoon/Sakura terrain
surface colors are baked from their original shaders into atlases and receive
shared lighting. Tidewater keeps its original terrain heights with a shared
sand/grass material. Rock, foliage and water materials have host adaptations.
Original screen-space effects, four separate atmospheres and standalone menus
are replaced by the shared host. Captured villagers and the Sakura boat are
static poses; original NPC and boat gameplay are not running. Fishing, multiplayer,
creator uploads and a public package registry are not implemented.

The complete source-derived asset set is around 126 MiB. It loads before entry;
this first integration does not stream regions over the network. Geometry is
split into compressed shards, and no served file exceeds 25 MiB. WebGPU device
performance, especially mobile memory limits, still needs broader testing.

## Regenerating derived assets

The checked-in runtime assets are sufficient for normal installation and builds.
Python 3 plus NumPy is only needed to regenerate the captures.

1. Run `python3 scripts/world/capture-server.py`. It prints separate loopback-only
   ports for Lagoon and Sakura; port numbers are assigned dynamically.
2. Open Lagoon with `/?q=low&capture&extract&spec=0&view=hero` and Sakura with
   `/?extract`. Use the capture panel in each browser page and wait until its
   status reports completion. The actual original builders run in WebGL at build
   time, and the panel exports geometry, textures and height fields via local POSTs.
3. For terrain-only rebaking, add `&atlas`. Sakura's **Surface** mode evaluates
   the original surface shader in an orthographic capture, retaining splat/aux
   inputs; the other capture modes are diagnostics.
4. Run `python3 scripts/world/pack-capture.py` to generate the runtime `scene.json`
   and gzip geometry shards. Raw source arrays can be archived under
   `.context/capture-raw/{lagoon,sakura}/`; the packer also reads from that location.
5. Run `node scripts/world/bake-tidewater.mjs` to regenerate the original seeded
   TerrainData arrays. The live Village builder applies its original ground pads
   on top of those heights during loading.

## Verification

```sh
corepack pnpm test
corepack pnpm build
corepack pnpm test:e2e
```

Unit coverage includes one level per tile, complete source-footprint containment,
rejection of mismatching Wang signatures, shared edge identity/orientation,
physical height continuity and radial trail ports, continuous branch grades,
centre-first journey planning, ocean outside occupied tiles, ring expansion,
floor-vs-roof selection, capsule-wall collisions and the central junction using
the original Lagoon collider.
The browser specs cover WebGPU/no-JavaScript fallbacks, navigation persistence,
download failure, map controls, one-canvas rendering and the full outward/return
walk. The GPU case skips if no adapter exists; fallback cases still run.

`/world/?inspect` exposes DOM diagnostics with position, distance walked,
visited regions, physics blockage, canvas count, triangle/draw counts and frame
rate. Its 8×/32× simulation controls accelerate physical steps; they do not set
player coordinates. Use the normal `/world/` URL for the uncluttered experience.

Validated locally on 28 September 2026: 73 unit tests and the production build
passed. Chrome/WebGPU completed Lagoon → Sakura → Lagoon → Tidewater → Lagoon →
Punk → Lagoon through actual capsule collisions at 32× simulation, about 8.08 km
walked, with one canvas, four occupied tiles, three shared Wang edges and no
blockages or GPU errors. Destination changes between neighbours were exercised
through the central tile. The central junction also has a regression test using
the original Lagoon collider. DOM evidence is saved in
`.context/central-world-sakura.json`, `.context/central-world-tidewater.json`,
`.context/central-world-punk.json` and `.context/central-world-return.json`; the
map capture is `.context/central-world-map.png`. Earlier integration checks
covered credits, keyboard movement and position persistence on a homepage round
trip. The updated Playwright suite is provided; it has not been run as a separate
CLI suite here.

## World domain

`world.threetopia.com` serves the compact map preview, explicitly labelled
**Map preview only — The playable world is not available yet.** Its separate
asset-only Worker retains the service name `threetopia-world-wip`, now deployed
with `wrangler.world-map.jsonc`. The build includes only the map entry, reduced
map assets and creator images. The walking runtime and full world assets are
excluded. The main Worker's routes deliberately exclude this domain.

Run `corepack pnpm deploy:world-map` to publish the map. See
[map deployment](map-island.md#publishing-the-map-preview). The playable world
remains available locally at `/world/` and requires its own release decision.
`corepack pnpm deploy:world-wip` can explicitly restore the original static
**A world in the making** page from `world-wip/`, restored from checkpoint
`4bccd443166ce6ce1aabf24f9f739bb4548b2fa8`.

Legacy `/world/` links on the main site still redirect to the subdomain and now
arrive at the map preview. Local Vite links use `/world/`. Marketing HTML, waitlist
code and portal code are not imported by the local world entry.

## Image map

`/map/` opens the actual map without loading the playable scene. Four transparent
tile images and their separately animated child components form the landscape.
The in-world minimap and full map use the same `ImageAtlasRenderer`, moving one
DOM tree and its two lightweight Three.js canvases between hosts. Water and
clouds are rendered live; tree sprites sway, neon lights flicker and waterfalls
flow in independent tile-local layers. The minimap renders only on invalidation;
the full map runs at most 30 GPU updates per second.
Creator layers, previews and budgets are documented in `docs/world-map-sdk.md`.
