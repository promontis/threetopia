# @threetopia/world-map

## 3D map slots — Lagoon lite prototype

Open **`/map/lite/`** to see Lagoon, Tidewater, Sakura and Punk together as four
creator slots in one continuous 3D island. The individual Lagoon study remains
available at `/map/lagoon-lite/`. See [the continuous island guide](../../docs/map-island.md)
for the new landscape, Tidewater-based water, native nature and hovering Punk platform.

Open `/map/lagoon-lite/` for the separate, fully 3D desert tile study. Threetopia
owns the terrain, matching edges, lighting, camera and slot. A creator supplies
**one representative component** from their world, rather than their whole scene.
Lagoon uses one connected group: Origin, Nest, Perch and Canopy, joined by the
three original hangbridges. These are four distinct native models, not copies of
one tree. Their positions, bridge endpoints, islands and water share one uniform
transform. A representative component may contain a connected group, but the
**whole group shares one slot and one budget**.

Deck surfaces come from every native board's front face. Adjacent coplanar boards
merge in pairs at tile detail and groups of up to six in overview; tiny gaps,
bevels and thickness are removed without pruning holes into bridge spans.
Foliage uses fewer native leaf cards with the original cutout texture, transforms,
clump normals and colours, with coverage compensation. Enclosed furniture and
roof lining are omitted in the overview.
`public/map/lagoon-lite/component.json` records the source revision, adaptations,
source triangle count, two LODs, actual file sizes and hashes.

The 2,444,193-triangle source becomes 23,384 triangles for a whole tile and 7,920
for the overview: reductions of 99.0% and 99.7%. Both use two draw calls and one
embedded leaf atlas (512 px / 256 px). Native material base colours
are sampled into vertex colours; the leaf atlas stays a texture. Original normal
maps and scene-specific shaders are not included. Lighting belongs to the host.

```js
import {createDesertTile} from '@threetopia/world-map/desert-tile';
import {loadLandmark, addLandmarkWind} from '@threetopia/world-map/landmark';

const time = {value: 0};
const tile = createDesertTile(); // host shell + empty creator slot
const landmark = await loadLandmark(absoluteGLBURL, 'tile');
tile.mount(landmark.root, landmark.metrics);
scene.add(tile.root);
addLandmarkWind(landmark.root, time); // optional; mesh extras.role = 'foliage'
// Advance the host's shared clock, never a separate animation loop per tile.
// On removal: landmark.dispose(); tile.dispose();
```

`createDesertTile({representation: 'world'})` creates the corresponding playable
shell. Both shells share `desert-v1`, pointy hex coordinates and a circular slot
with radius 62.5% of the tile radius. Map radius is 12 units; playable radius is
400 metres. Slot-local Y=0 is the component's ground anchor. `heightAt(x,z)` supplies the host
terrain surface; ground along shared edges has matching height and zero slope.
Use `tileCentre(q,r,radius)` for placement. The creator may not edit the shell.
Map `mount()` measures geometry again and rejects a second component.

The default slot is flat. Lagoon's host terrain preset instead uses
`createDesertTile({surface, waveTextures, time})`, with the sampled data from
`village-ground.json` and its two native water textures. The four islands,
surrounding lagoon and nearby islets come from the original heightfield, sampled
at 2.4 source metres. Terrain, water level, all four treehouses and the bridges
share one source origin at sea level and one uniform scale. The manifest records
each tree position and each bridge endpoint in both source and map coordinates. Only the outer 1.5 map units blend into the host edge.
The creator slot bounds still limit the landmark; a water preset does not imply
that the entire slot has a flat, dry floor.

Load the preset's `waves` URLs relative to the surface JSON with `TextureLoader`,
set both wrapping axes to `RepeatWrapping`, and keep their default linear colour
space. The caller owns these textures and should dispose them after the tile.
The water mesh is clipped to submerged terrain, avoiding coplanar sand. Its
host-controlled shader uses the two original wave slope textures at 128 × 128,
with simplified depth colour and sky reflection. It adds one draw call, about
171 KiB of decoded wave textures and no scene-reflection passes. Hide `tile.water`
with the terrain when displaying only the creator component. Shared tile edges
keep their original height. `tile.dispose()` releases host geometry and materials.

The village asset builder removes duplicate triangles, degenerate triangles and
flat ground faces after position quantization. This prevents decimated opposing
faces from fighting for the same depth, including roots against the terrain.

| Creator resource | One-tile detail | Overview detail |
| --- | ---: | ---: |
| Triangles | 36,000 | 24,000 |
| Draw calls | 4 | 3 |
| Self-contained GLB | 768 KiB | 512 KiB |

Both LODs must fit an XZ radius of 7.5 and a height of 16 map units, including
0.1 units of motion margin. At most two textures and 2 MiB of decoded texture
memory are permitted. Geometry counts, transforms and decoded texture size are
measured; download size is checked while streaming. Embedded external references,
blended transparency, skins, morph targets, animation clips, lights and cameras
are rejected. Opaque surfaces and alpha-cutout foliage (`alphaMode: MASK`) are
supported. The host provides bounded wind and water animation. This is a
rendering contract, not a sandbox for arbitrary creator JavaScript.

The preview swaps LODs by projected tile size, pauses when hidden, respects reduced
motion and caps the canvas near 2.1 million pixels. **Aansluitingen** adds six empty
host tiles to test joining; these are demonstration slots, not published worlds.
Zoom is bounded between the displayed composition and one complete tile. Resource
costs shown under **Budget** are for the creator component, excluding host terrain,
water and the shared shadow pass.

Rebuild the assets with `corepack pnpm map:build:lagoon-lite` (uses the locally
preserved native Lagoon source and installed Chrome). The intermediate extraction
is saved in `.context/lagoon-lite/`. Both LODs must pass the shared component
budgets before the builder replaces the public assets. This prototype does not replace the existing
public map or playable world. World collision integration, registry placement,
CLI scaffolding for `map-landmark`, streaming and npm publication remain separate
integration work. The existing CLI continues to use the scene/capture formats below.

### Compact composition and the other native components

`createDesertTile({compact: true, biome, surface, waveTextures, time, sharedEdges})`
uses the `compact-v1` host profile. The tile radius is **9 map units / 300 world
metres**, versus 12 / 400 for the original shell. The creator slot, component
scale and budgets stay unchanged. `biome` accepts `desert`, `coast`, `valley` or
`city`. The outer rim has a common height, colour and zero slope in all four.
`sharedEdges` lists adjoining edges, 0–5 clockwise from east, so the host omits
internal vertical skirts. Place the tiles with `tileCentre(q,r,9)`.

The current four-tile example has five shared edges and no empty spacer tiles.
Its host is `src/tiles/lite/composition-slot.ts`: the same validated creator slots
on one continuous landscape, rather than the raised desert shell above. It uses
one renderer, camera, shadow map and animation clock, with live depth-aware water.
Its labels project from that camera. The camera fits the occupied composition
at minimum zoom and limits maximum zoom to a complete tile. Choose a world in
the top bar to centre it. On small screens the overview uses the smaller GLBs;
zooming swaps the complete component in the same slot.

| World | Native component used on the map | Terrain |
| --- | --- | --- |
| Lagoon | Four distinct treehouses and their three original bridges | Native root islands with a deeper tropical lagoon |
| Tidewater | Lobster boat and the dock head, with the last part of the pier | Shared harbor, sand, native rocks, palms and ferns |
| Sakura | Pagoda, red arched bridge, riverboat and cherry trees | Continuous river valley with instanced native pines |
| Punk | Reduced original city, including native neon meshes | Host-owned hover platform, service towers, six boosters and a footbridge |

Lagoon, Tidewater and Punk retain one source origin and uniform scale. Sakura
composes its native landmark groups with individual uniform transforms: the
source riverboat and bridge were hundreds of metres from the pagoda. The source material
shaders are simplified: Tidewater's wood/paint/hull colour nodes are baked at
low frequency, and Punk's darkest wall colours are lifted for daylight map
readability. The native leaf cutout texture is retained for Sakura. There are
no rendered pictures of buildings. The new terrain and hover platform are host
geometry. Neon, boats, vegetation and booster pulses use the same clock. Water
adapts Tidewater's optics and spectral waves for a lightweight WebGL map, with
live reflection and refraction; the full source FFT/wake/surf simulation is not
included. See the island guide for the extra rendering passes and limitations.

The committed `public/map/lite/{tidewater,sakura,punk}/component.json` manifests
record the selected native meshes, adaptations, source transforms, measured
LODs and checksums. Their `surface.json` presets, where present, use exactly the
same transform as the component. Both LODs must pass the shared budgets before
a world's new assets are written. The same command builds the native Sakura
pine and Tidewater nature kit. Rebuild with Vite running
and Chrome installed:

```sh
corepack pnpm map:build:lite
# For a non-default Vite port:
MAP_SOURCE_URL=http://127.0.0.1:55000 corepack pnpm map:build:lite
# Rebuild one component from its cached native extraction:
node scripts/atlas/build-map-landmarks.mjs punk
```

The extraction entry is development-only. The viewer downloads the reduced
GLBs and surface presets, never the full source scenes. This four-tile prototype
loads both LODs of all four components up front; it does not yet provide streaming
for an unlimited world. Rebuild Lagoon separately with `map:build:lagoon-lite`.

## Existing captured map

The active map is a composition captured from the walking scene. Each world occupies one Wang hex tile and owns its landscape, separate captured components, effects and landmarks. Every image is a textured plane inside a Three.js tile group. Captures and procedural water use **one scene, camera, canvas and clock**; there are no DOM art layers or independently rendered effect overlays.

Use version 2 `image-tile` metadata. Positions are tile-local projected metres (X right, Y down), measured at each layer's anchor. Add a transparent landscape, up to 32 components and 32 landmarks. Sprite animation rotates around its anchor. Cropped surface effects must use the corresponding landscape crop position and size. See `/docs/#image-layers` for examples and bounds.

```js
import {ImageAtlasRenderer} from '@threetopia/world-map/image-renderer';
import '@threetopia/world-map/image-renderer.css';
const view = new ImageAtlasRenderer(element, registry, {onSelect, onError});
await view.ready;
view.fit();
view.setOptions({motion: false});
// view.getLayout() returns anchors projected by the actual scene camera.
// view.dispose() releases owned textures, geometry, events and GPU context.
```

Zoom ranges from one complete tile to all occupied tiles. Empty creator slots never extend the zoom range. Accessible labels use the rendering camera's projection. All animation uses one clock; pause, reduced motion, hidden tabs and minimap mode stop it. Texture resources are shared across components, with one map drawing buffer capped near 2.1 million pixels. The current renderer loads all registered tiles; larger worlds need additional streaming/eviction work.

In a walking application, mount the map in its minimap host and set `mini` mode. Move the same view with `mount(overviewHost)` and `setMode('overview')` when opened; move it back when closed. The captured map owns one WebGL renderer, separate from the playable world's renderer. It never downloads the playable source scenes.

Version 3 `scene-tile` / `SceneAtlasRenderer` provides the default creator GLB preview; `world.scene` must match `map.source`. The CLI defaults to this real-scene workflow. Explicit `create --format image` remains available for captured layer imports. Workspace package; not published to npm yet.

The active captures are made with `pnpm map:capture` from the shared runtime at −20° yaw and 45° elevation. `projectMap(x, z, height)` matches that camera exactly. Each map records `capture.kind`, its runtime source, revision hash and camera. Regenerate after changing the actual scene. The command currently supports the integrated runtime adapters; a new source still needs integration before shared capture.

A transparent component pass may use `effect.isolated: true` to preserve the full captured alpha silhouette. These effects approximate motion; they never reposition landmarks or insert map-only buildings. Derived XYZ landmarks and the player's floor height use the same projection.

## Experimental native baked tiles

`@threetopia/world-map/baked-map` powers the standalone Lagoon study at
`/map/lagoon/`. It consumes `BakedTileManifest` metadata, not `image-tile` or
`scene-tile` manifests. Each tile has a small complete overview plus two detail
tiers containing source-rendered RGBA crops. Every crop uses the same camera
and native visibility matte; a foreground building masks water/foliage motion.
The base remains intact beneath the local animation, preventing holes.

```js
import {BakedMap} from '@threetopia/world-map/baked-map';
const map = new BakedMap(element, {invalidate: requestDraw, onError});
await map.addTile(manifest, manifestURL, {x: 0, y: 0});
// Call setView after resize, pan, zoom and invalidation, then render one clock.
map.setView({width: 1200, height: 800, span: 230, center: {x: 0, y: 0}});
map.render(seconds);
// map.removeTile(id); map.dispose();
```

Crop rectangles are `[left, top, width, height]`, with Y **up**, measured in
one shared image projection. The host owns user camera bounds and clock policy.
Visible pixel size selects texture resolution with hysteresis. Detail swaps are
atomic, cancelled requests are discarded, and distant/offscreen detail is
released. Overviews remain resident until `removeTile`; this is not an unlimited
world streaming manager. `inspect()` reports real draw calls and texture costs.

The Lagoon prototype uses a fixed native perspective. It has no orbit, dynamic
lighting or live 3D reflections. Its coast and projection still need the shared
Wang edge contract before it can replace the connected map. The existing CLI
does not yet generate this experimental format.
