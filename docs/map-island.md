# Continuous island map

Open [world.threetopia.com](https://world.threetopia.com/) or `/map/lite/` locally.
This is the interactive Three.js implementation of concept
`06-sakura-riviervallei`, separate from the full walking world at `/world/`.
The generated concept image is a visual reference only; it is not loaded by
the map. Everything in the landscape is geometry and live water. Downloaded
image textures are limited to the original leaf cutouts, the reduced Tidewater
whale skin and Fenestra's small room/curtain atlases. The host generates its lighting, wave and seabed-detail
textures. No landscape image overlays are used.

The four creator slots retain their axial coordinates and radius of 9 map
metres. The host now samples one continuous landscape in world coordinates,
instead of drawing four raised hexagons. The camera is bounded between the
complete cluster and one tile; wheel/pinch, the zoom controls, `+`/`−`, `0`
and arrow keys all share those limits.

The interface uses Tidewater's dark translucent glass, light text and aqua
accents. The Threetopia logo and wordmark, compact preview notice, compass,
settings/recording buttons, world cards and three camera controls sit over the
map. The notice explains that only the map is available and is also included in
video exports with the interface enabled. There is no filter bar, budget panel, tile-edge
toggle, pause button or descriptive footer.

Each compact card shows the maker’s avatar, the short world name and its creator. Its content comes from the full creator card;
all four remain keyboard-accessible buttons. The host projects their tile
anchors each frame, keeps the cards inside the viewport and moves them aside
to avoid overlap. Fine connector lines retain the association with each tile.
Card dimensions are measured on resize rather than during animation; narrower
layouts use smaller cards and keep tappable world centres clear.

Click or tap a tile or its info card to select it and open full creator details.
These cards share the landing page's HTML: creator profile, description,
original preview and source links. Punk credits Anderson Mancini and Sunag and links to threejspunk.com. Its
map card shows the map adaptation of their original city and car. Edgar Pérez
is credited separately for the Fenestra interiors.
Map-scoped styles give them the same glass
palette as the controls; the landing page keeps its light theme. Preview images
are part of the HTML cards, never the map landscape. Escape, the close
button or the backdrop dismisses the card and restores keyboard focus.
The scene stops drawing while a card is open and resumes the existing motion
preference on close. During a video take, cards stay interactive and the scene
keeps animating according to the existing motion preference. Picking runs only on a completed click; dragging, panning,
pinching and clicking ocean outside the occupied tiles do not open details.

## Geometry and provenance

| Area | Original assets | Map adaptation |
| --- | --- | --- |
| Lagoon | Four original treehouses, all three hanging bridges, leaf atlas, sampled ground | Original relative positions; deepen the bed between the root islands for clear tropical water |
| Tidewater | `BoatModel`, `Village` pier, `RockGeometry`, far coconut palm, young palm and fern | Bake compact GLBs at build time, instance native nature along the shared coast; retain boat and dock positions |
| Sakura | Original five-storey pagoda, red arched bridge, covered riverboat, cherry trees and pine | Recompose the landmarks along one river; preserve each landmark's geometry and uniform proportions while compressing the source-world distances |
| Punk | Original Threejs-Punk Drive city kit, nine neon signs, rigged Quadra Turbo-R and three-fenestra atlases | Five uniformly scaled black buildings, shared streets, reduced car with rolling/steering wheels; host-owned hover deck, six ring thrusters and paired teleport pads |

Source credits remain in the component manifests and the map's creator details.
Host nature provenance is in `public/map/lite/environment/source.json`.
The forest manifest identifies its native Sakura geometry and texture.

Punk's city and Quadra inputs are pinned by SHA-256 under
`packages/world-sources/punk/map-assets`; its README records their exact source
URLs and attribution. `build-punk-city.mjs` composes five original buildings
and nine original neon signs around a shared street. The native black palette,
facade recesses, varied rooflines and sign geometry replace generic apartments.
Car texture colours and emissions are sampled offline into vertices. The
complete component, including the car and exhaust flames, is 32,253 triangles near / 23,268 overview
and **three draws at either LOD**. Source GLBs, textures and game code are never
loaded by the map runtime. Architecture starts from the full source meshes,
uses position-preserving reduction with an absolute geometric error bound,
and rebuilds flat wall normals. The source kit's heavily reduced building LODs
and vertex-position relocation produce folded facades and are not used.

`three-fenestra@0.3.0` supplies the public `glslCore` interior-mapping functions
in `punk-materials.ts`. A `_SURFACE` attribute distinguishes the native glass
faces, plaster, metal and wet asphalt. Fenestra rooms remain confined to the
original glass; their object-space coordinates, shared model matrix and
orthographic view rays keep them registered during orbit and hover. The
interiors share the architecture's draw call. The original starter atlases are
512² and 256², for 1.67 MiB including mip chains. Downloaded bytes and decoded
texture sizes remain part of each measured component budget: about 566 KiB
near / 432 KiB overview including both atlases.

`punk-route.ts` defines the same closed curve used to build the road geometry
and animate the Quadra. `punk-drive.ts` samples a distance-indexed speed profile:
1.5 map metres/second through town, briefly rising to 3.5 on the front straight.
Corners introduce up to 19.5 degrees of drift with countersteering. A precomputed
travel-time table makes speed changes deterministic across frame rates and LODs.
`punk-car.ts` moves both LODs with the shared host clock and rotates the four
original wheel groups by distance travelled. Two tiny exhaust jets pulse during
boost; their geometry shares the car draw and collapses at the nozzles when idle.
Depth rendering uses the same wheel deformation; object transforms carry the
car's reflection, shadow and click target. The car inherits the platform's
hover and pauses with the map. There is no physics engine, extra render loop
or runtime load of the full driving game.

## Water

The host water adapts the vendored [Tidewater source](https://github.com/dgreenheck/tidewater)
by Dan Greenheck, under its [MIT license](../packages/world-sources/tidewater/LICENSE).
`tidewater-ocean.ts`, `ocean-fft.ts`, `ocean-spectrum-data.ts`, `water-caustics.ts` and
`water-bathymetry.ts` provide the WebGL map version:

- `OceanFFT.js`: **four 256² FFT cascades** use Tidewater's seeded Gaussian
  coefficients, Horvath/JONSWAP directional spectrum, TMA correction, gravity
  dispersion and Hermitian time evolution. Native periods 733, 157, 33.3 and
  7.1 metres are scaled by 0.16 for the miniature map. Per-band gains favour
  broad swell over the shortest wind ripples. Each cascade supplies horizontal
  and vertical displacement, surface derivatives and compression; the waves
  have actual choppy geometry, not only changing normals on a flat plane.
  The WebGL2 port batches all cascades in **19 small passes**: one evolution,
  sixteen butterfly passes and two resolves. Float32 intermediates retain
  tiny high-frequency coefficients; outputs have half-float mip chains.
  The mesh samples displacement at its own spacing, and pixel derivatives
  filter the surface normals. Lagoon and river shelter damp the waves.
- `WaterMaterial.js`: exact dielectric Fresnel at IOR 1.333, GGX sun highlights,
  unresolved slope filtering, Beer–Lambert extinction, analytic single scattering
  and multiple-scattering backscatter. Refraction projects the wave's refracted
  ray into a live overhead capture of the submerged geometry, with three
  bathymetry refinements. Unlike a capture from the viewing camera, the near
  bank cannot hide strips of the far seabed. Extinction follows the continuous
  local water column; incoming sunlight follows the captured surface's actual
  depth. This keeps the small map's steep banks stable when orbiting.
  Reconstructed rocks and pylons above the bed shorten that optical path.
  The last millimetres of water blend over the actual beach using pixel-footprint
  coverage, avoiding dark edges from holes in the clipped refraction capture.
  The open sea uses a blue water-column scattering profile and brighter sky
  irradiance, blended by depth into the existing coastal and tropical medium.
  Reflected radiance comes from a bright maritime horizon, blue upper sky and
  soft clouds. Tidewater's Cox–Munk unresolved slope variance broadens distant
  highlights instead of turning fine waves into sparkling noise.
  The orthographic overview uses a finite shading eye for **direct sun glints
  only**, anchored 36 map metres from the centre ray's sea intersection. A
  smooth highlight shoulder keeps rotating toward the sun from washing the
  entire sea grey-white. Refraction, Fresnel and planar reflections retain
  the actual orthographic view direction. This is an intentional map-scale
  lighting adaptation; it adds no draws, textures or render passes.
- `Caustics.js` / Evan Wallace's WebGL Water: real photon-splat light focusing
  through an animated ripple cascade, one focal plane, a **64²** grid and nine
  periodic copies in one draw. The independent short-wave field is filtered
  to the photon grid's spacing before focusing the light. Its **256²**
  mipmapped target is filtered by pixel footprint and depth, and updates with
  the waves. No painted caustic
  animation or image overlay is used.
- `SeaDetail.js`, `FoamTexture.js` and `ShoreWaves.js`: broad moving gusts and
  wind-aligned calm lanes modulate the small ripples independently of the swell;
  broken foam and shoreward fronts follow the coast. One shared **256² RGBA8** procedural
  lookup is generated at startup. A baked shoreline distance/direction field
  in the existing bathymetry texture follows the actual coast and river bends.
- `Terrain.js`: underwater sand ripples, seagrass meadows and algae-covered
  rubble fields, with filtered surface relief. The same small detail lookup
  feeds the bed and water. Twenty-four additional original Tidewater rocks
  sit below the surface, using the existing six rock batches and no new draws.
  A gentler submerged shelf extends the depth transition outside the island;
  the dry beach and authored inland water levels retain their heights.
- Live planar reflection and refraction refresh at **15 Hz**, immediately on
  camera or LOD changes. The refraction image is capped at **1440 × 1000**
  drawing-buffer pixels, reflection at **900 × 625**. Refraction depth registers
  the light pattern to actual submerged surfaces. Reflected sky radiance follows
  the moving normal, while reflected objects retain their real scene positions.
- One bathymetry texture, one surface and one clock cover ocean, harbor, river
  and lagoon. Tropical clarity is a continuous local optical parameter.
- The water receives the shared sun's real shadow map, including the floating
  city, boats, treehouses and dock. Direct scattering, caustics, foam and sun
  highlights respond to that visibility; the former painted city ellipse is
  removed. Water and land share the sun direction and highlight colour.
- Refraction clips above-water geometry, and reflection clips submerged
  geometry. Custom neon and engine shaders participate in this clipping too.
  The floating boats' thin, open hulls are omitted from the overhead refraction
  colour to avoid duplicating their waterline on the seabed; their normal
  rendering, reflections and sun shadows remain enabled.

The four-cascade FFT replaces the previous 68-wave approximation. It retains
the native frequency-domain simulation while adapting the compute stages to
WebGL2. The full breaking-wave solver, boat wake simulation, accumulated foam
and first-person underwater effects remain outside the map. Compression foam
is evaluated from the current wave state, so rewinding the video clock or
rendering a take at a different speed gives the same sea surface.

Spectrum storage totals **25.3 MiB**, including its seed, ping-pong buffers and
all output mipmaps. It adds **18 small draws** compared with the old single-pass
approximation, without adding scene geometry or capture passes. A local Chrome
comparison at 1440 × 945 measured roughly 56 fps before and 60 fps after in
short, frame-rate-capped runs; these results vary with system load and do not
mean the added passes are free. Including the separate swimmer capture and
refined flukes, the complete animated frame stays within **154 draws and
1.4 million triangles**. Pausing or showing creator details stops FFT
updates, and the video exporter shares the same deterministic simulation.

## Clouds

Six 3D cumulus banks of different sizes drift around the archipelago, with
semi-transparent edges, cool internal shadows and slowly changing billows.
They share one instanced box draw (72 triangles) and a bounded 64-step density
integration. A single **96 × 96 × 192 RGBA8** texture contains three different
density fields and their sunward optical depth: **6.75 MiB** decoded, **549 KiB**
compressed. It fits WebGL2's minimum guaranteed 3D texture size. Building the
noise and light fields offline avoids a startup stall and six extra texture
lookups at each integration step. Regenerate with `pnpm map:build:clouds`.

The profiles and scattering model adapt the MIT-licensed
[procedural-clouds skill by Kingsley](https://github.com/CK42BB/procedural-clouds-threejs/tree/fb4a1b22c1a0f1482456d37511957cd0a4df679b).
The license ships at `/licenses/procedural-clouds-threejs.txt`. The baked light
field uses the map's fixed sun direction; rebuild it if that light changes.
Density and lighting deform together on the shared map clock, so pause,
reduced motion and video scrubbing remain deterministic. Opacity decreases
when focusing a tile. Clouds do not cast shadow-map shadows or intercept map
clicks. Clouds are excluded from the submerged-bed capture, so their colour
cannot be mistaken for seabed detail. The complete water-capture frame adds
up to two cloud draws (main view and reflection).

## Lighting and materials

`lighting.ts` builds a warm directional sun, cooler sky fill, sand-coloured
ground bounce and a procedural outdoor HDR environment convolved once with
PMREM. The map no longer uses an indoor `RoomEnvironment`. The sun's shadow
camera covers the cluster, with a 3072² shadow map on desktop and 2048² on
compact screens. A material-local twelve-tap PCF filter softens the edges
without modifying Three's global shader chunks. Its sampling pattern is fixed
rather than randomly rotated per screen pixel, preventing crawling grain
while leaves or the camera move.

`post-processing.ts` renders the scene to a linear HDR target with 4× MSAA.
GTAO reconstructs normals from that actual depth buffer, including native
leaf cutouts and deformation; it does not redraw the scene with replacement
normal materials. A bilateral denoise pass stabilizes contact occlusion.
AO is at most half resolution, capped at 800×600. A temporal pass reprojects
the previous AO into the current camera, rejects depth discontinuities and
clamps history to the current neighbourhood. This stabilizes fine leaf
contact shading without leaving trails after camera motion; resizing resets
the history. Only AO is accumulated, not the animated scene colour.
A separate highlight and
two-pass blur chain produces subtle bloom, capped at 480×320. The final pass
applies tone mapping and sRGB conversion once. These seven screen passes add
seven triangles and no scene geometry. This is screen-space contact shading,
not a baked or ray-traced global illumination solution.

Native foliage retains its volume normals on both sides of each card, with
a small shadowed transmission term and albedo calibrated for the shared sky.
Sakura pine bark and crowns now use identical instance transforms. Sand has
small-scale surface relief; rock colour and roughness change at the waterline;
the hover deck has a separate metal response. Punk's HDR emissive windows and
engine plumes are complemented by three bounded, unshadowed local lights on
nearby surfaces. Water still uses inexpensive authored engine light pools.

Colour and shadow passes use matching tree wind, palm cutouts and boat motion.
Sakura's native riverboat follows a closed, constant-speed river route in
`sakura-boat.ts`, at a gentle 0.24 map metres per second with a smooth U-turn at
each end (about three minutes per round trip). The boat is uniformly scaled to
75% around its authored pivot, retaining its original waterline. Both detail
levels share this scale. Both directions pass through the same opening between the red
bridge's piles. The host moves the boat's actual object transform before
rendering and water captures, so its shadow, reflection and click target
travel with it. Both GLB detail levels share one authored pivot and clock;
zooming cannot restart the journey. Pausing, reduced motion, hidden tabs and
creator dialogs use the existing shared animation controls. The route adds no
geometry, draw calls or independent animation loop. Tidewater's boat stays
at its pier.

Sakura's original submerged hull and wooden floor are retained in both GLBs.
Extraction keeps the below-water faces; baking lifts the boat geometry by its
draft to satisfy the nonnegative asset bounds, records `waterline` in the boat
node's extras, and the host restores that offset when mounting. The general
terrain cleanup must not flatten or remove the boat's bottom.
A horizontal section of the native hull below its gunwales supplies a small
depth-only water mask. It renders after the wooden interior and before the
river, so water cannot appear between the planks. It follows the boat's full
transform and the same bobbing shader at both detail levels. It writes no
colour, has no click target, casts no shadow and is excluded from reflection
and refraction captures. One bounded depth draw is added, without another
render target; skipping the wholly above-water deck lights in the underwater
capture keeps the existing whole-frame draw limit. The browser regression
compares actual wet/dry GPU pixels inside and outside the hull, and raycasts
the restored floor at both LODs during travel and turns.

Tidewater also has seven seagulls and its original humpback whale. The gulls
use the native 16-triangle geometry, bank around compact thermals over the
harbour, and alternate gliding with flapping. The whale retains the native
`lod2` body and pectoral fins, with the more curved, notched `lod1` flukes,
flipper joints and 40-frame spine: 2,926 triangles in one draw. The native
fluke UV island is flipped vertically to put the slate dorsal skin above and
the white ventral pattern underneath. Its original skin is reduced to
1024×512. A slow 96-second circuit stays outside the pier
and boat, with the deeper part offshore; the tail and pectoral fins move
independently. The water's existing draw adds a faint surface wake.

These animals total 3,038 triangles and two visible draws, with a 40 KiB
compressed geometry file and 30 KiB texture. Their roughly 1,500 whale vertices
are posed once on the CPU per changed host time, shared by the visible,
reflection, refraction and whale-shadow passes. Gulls skip the underwater
capture. The whale has its own **256×256** colour/depth capture, oriented along
the mean refracted view and fitted tightly around the animal. The water traces
the actual refracted ray through this depth image from each displaced surface
point. It never projects the swimmer onto the seabed or clips it at a fixed
waterline, which would slice the body when a crest crosses its back. Only rays
inside the whale's bounds run the short intersection search. Colour, caustics
and attenuation use the hit's real depth. The entire body is captured at each
changed pose or view; unchanged paused frames do no work. This costs **768 KiB**
of render targets and one small draw, sharing the existing animation loop.
Its sun shadows are retained, and temporary capture layers/write masks are
restored before the main render. Above-water rings
and teleport light effects also skip the submerged colour capture, retaining
their normal rendering and reflections within the existing full-frame budget.
Pausing, creator dialogs, reduced motion and hidden tabs use the shared clock;
changing tile LOD does not restart or replace the animals.

`public/map/lite/tidewater/wildlife/wildlife.json` records the pinned Tidewater
revision, original file hashes and adaptations; the original MIT license is
included beside the assets. Rebuild just the wildlife with
`corepack pnpm map:build:wildlife` (Node and Python Pillow). The builder downloads
hash-checked originals from the pinned revision into `.context`, extracts the
native gull geometry from the vendored source, and emits only the small map
assets. The runtime makes no requests for source-world animal assets.

Animated sun shadows update with every new wind pose, while water captures
retain their independent 15 Hz limit. The visible foliage and shadow geometry
therefore no longer drift between shadow refreshes. The map omits grass-blade
geometry and its wind shader; low ground cover is represented by the terrain
colour. The forest has its own fixed random seed, preserving its established
layout when ground vegetation is changed. Turning or zooming refreshes view-dependent effects immediately; pausing freezes the
shared clock. Creator geometry, file limits and material draw budgets are
unchanged by this host lighting pipeline.

## Runtime budget

Creator component limits are **36,000 triangles / 4 draws / 768 KiB** per
tile and **24,000 triangles / 3 draws / 512 KiB** in overview. The geometry allowance preserves architectural window openings; draw and
texture limits remain unchanged. Punk pins native panes and adjoining plaster,
keeps display panels intact, and omits fully enclosed plaster before reduction.
The overview Quadra retains its animation groups with less geometry.
All GLBs are
measured before mounting. The four near landmarks together remain under
96,000 triangles; nature, terrain, water and the hover foundation have a
separate host budget.

The browser checks enforce fewer than 400,000 visible triangles and at most
40 scene draws at desktop detail; fewer than 320,000 triangles in mobile overview.
Landmarks and water reduce detail in overview. The four independent original
host meshes and their clipped coastal apron retain their fixed terrain geometry
at both levels, preserving the same boundaries used by the creator tile system.
Automatic canvas resolution is capped at 2.1 million pixels; an explicit DPR
setting can override that automatic limit. Source-world runtimes and large source models do
not load in the map viewer.

Reflection/refraction add two smaller rendering passes at 15 Hz; one sun
shadow update runs per animated frame. The shared wave and caustic fields add
two bounded draws per animated frame, and skip unchanged paused frames.
Their two mipmapped half-float targets and the shared detail lookup total about
**1.67 MiB**, excluding the scene capture targets and their depth attachments.
The four original tiles have about **381,000 visible triangles / 37 scene draws**
at desktop detail and **308,000 triangles / 37 draws** in mobile overview,
plus seven post-processing draws. Measure the animated overview for the peak:
a tile close-up culls some meshes and underestimates the complete frame.
The browser regression allows up to
1.4 million triangles / 154 draws (including the ocean's four FFT cascades, the whale's small refraction capture and the moving car's additional sun-shadow draw)
for the whole frame, including refreshed water and shadows. These
counters now include shadow geometry as well as the reflection, refraction
and post-processing passes. Inspect `window.worldTiles.inspect()` for the
visible-pass counters, `totalFrameDrawCalls` / `totalFrameTriangles`, effect
resolution caps and shadow updates. Do not report only the visible pass as
the total cost.
`waterSurface` includes the wave, caustic and reflection/refraction dimensions
and shared-field memory. Browser tests read back the animated fields to check
finite wave data, focused-light energy, animation and pause behaviour. Unit
tests check shoreline distances on straight beaches, curved islands and open sea.
These are browser checks, not a claim about frame rate on every phone.

All wind, boat motion, water and booster pulses use one host clock. Space
freezes it; reduced-motion preference starts paused; hidden
tabs stop scheduling frames. No creator animation loop is introduced.

Punk's foundation and creator slot hover together by ±0.13 map units in a
seven-second cycle. Paired teleport pads replace the former staircase: one sits
on a graded dry clearing connected to the Sakura path, the other forms a small
arrival bay on the city's western edge, outside the racing road. The shore pad
stays fixed; the arrival pad follows the full platform hover in both its visible
geometry and shadow. Matching floor rings, three light markers, a soft blue
light field and rising motes identify the pair. Their animation shares the host
clock, including pause and reduced motion. Two foundations share one instanced
shadow-casting draw, and both light effects share one transparent draw without
textures or extra render targets. These are map landmarks for the intended
teleport connection; the overview does not introduce a player traversal mode.
The shared access anchors grade the shore and clear nearby vegetation.
The remaining deterministic nature placement stays unchanged. Each of the six
thrusters has three separate, floating neon-blue rings beneath a shallow socket.
The radii decrease from 0.61 to 0.52 to 0.44 map units; the smallest remains 72%
of the largest. Centres are 0.59 units apart, with independent vertical motion
of ±0.052–0.070 units on roughly four-to-five-second cycles. All rings stay clear
of the deck and water through the complete platform hover cycle.
`hover-thrusters.ts` batches the eighteen open torus meshes into one draw with
6,912 triangles, no textures and no extra render targets. Both water capture
passes clip the same vertex-animated geometry. A blue bounce light and soft
blue light on the water share the engines' gentle pulses. Animation uses the
host clock and stops with the map. The creator's LOD and component budgets
remain unchanged.
Deck strips share one neon batch attached directly to the floating body.

## Map settings

Open the settings button at the top right, or press **H**. **Escape** closes the
panel. This non-modal panel uses Tidewater's glass palette and original MIT SVG
icons; the map continues rendering and remains interactive beside it. All labels
are in English. Arrow keys, Home and End navigate the tabs and native sliders.

The six tabs control the ocean spectrum and clarity, shore waves and foam,
exposure and sky light, bounded camera zoom and world cards, clouds, contact shadows
and bloom, and rendering quality. Effects → Atmosphere → Clouds toggles the cloud
volumes in both the main view and water reflections, including video recordings.
Performance shows measured frame rate, CPU submission
time per frame, actual drawing-buffer dimensions and the active DPR. CPU time excludes GPU work;
a paused map reports **Paused**, not an old frame rate.

**Pixel ratio** offers Auto (the default), DPR 1, DPR 1.5 and DPR 2. Auto retains
the device-DPR / 1.6-DPR / 2.1-megapixel limits. Manual modes bypass those limits:
at 100% render scale, DPR 2 renders a 1920 × 1080 viewport at 3840 × 2160, even
on a DPR 1 display. GPU texture, renderbuffer and viewport dimension limits still
apply; the live Active DPR value shows the actual result.

Render scale is 50–100% of the selected pixel ratio. Higher DPR improves detail
at a higher GPU cost. The choice persists across reloads; old preferences use
Auto, and Reset returns to Auto. Offline video export uses its chosen output
dimensions, then restores the live DPR setting. MSAA offers
Off, 2x and 4x where supported. Shadows disable the actual sun-shadow pass; water
reflections disable the reflection capture while keeping refraction and the sky
reflection. Changes render immediately, including with reduced motion enabled.
Preferences are validated and stored under `threetopia.map.settings.v1` in local
storage. Camera pose and panel visibility are not persisted. Reset restores the
current map defaults; blocked storage only disables persistence. Live-stat DOM
updates run twice per second while the panel is open and stop when it closes.

## Record a map video

Open the video camera button at the top right. Choose **Same as window**,
**1080p**, **1440p**, or **4K**, and **Off**, **Light**, or **Cinematic** camera
smoothing. **Include interface** is enabled by default: the exported MP4 includes
world cards, opened creator details, the logo, compass and map buttons. Disable
it for a video of only the 3D map. All exports use the original offline **60 fps**
renderer; there is no screen-sharing prompt or real-time screen capture.
Size, smoothing and interface preferences are saved under `threetopia.map.video.v1`.
Fixed sizes use 16:9 and expand the camera view when necessary to retain framing.

Press **R** to start, and **R**, **Escape**, or **Stop** to finish. Stopping opens
the rendering progress dialog, then downloads an MP4. A **Download MP4** link
remains available for another copy. Each take can be up to two minutes.

Tiles and their info cards stay clickable during a take. Opening, closing and
scrolling creator details is replayed at its recorded time. Escape closes an
open card first; **R** still stops the take. Export closes the live card before
showing progress. The world keeps animating while reading details, unless motion
was already paused. Render settings are locked for the take so replay uses the
same world appearance. Recording timers and export progress are not in the video.

The recorder adapts `apps/meadow/src/videoRecorder.ts` and `cameraPath.ts` from the
`threejsworlds/meadow-nanite-webgpu` workspace. During a take it stores camera
poses, the shared world clock and UI state. Afterwards, the orthographic orbit
path is resampled at 60 fps; smoothing unwraps the orbit angle without smoothing
animation time or UI events. Pauses and reduced motion are preserved. All map
animation, including wildlife, water and boats, uses that replay clock.

`video-ui.ts` caches computed HTML styles when a card or layout changes. At export,
[html-to-image](https://github.com/bubkoo/html-to-image) embeds the actual fonts,
avatars, creator previews and SVG icons into transparent sprites. This work is
lazy-loaded and runs only after the take. Each output frame composites these
sprites over the freshly rendered map. Glass panels blur the current rendered
background; dialog scrolling is clipped inside its rounded shell. Static controls
retain their screen edges, while world labels use the same projection and collision
layout as live HTML, evaluated with the smoothed export camera. This keeps labels
attached to their tiles across camera motion, export aspect ratios and resolution
changes. UI sprites are rasterized at the output scale, up to 4×.

The renderer, post-processing and water targets resize for export, with fresh
temporal history and 30 warm-up frames. Reflections refresh for every exported
frame. [Mediabunny's CanvasSource](https://mediabunny.dev/guide/media-sources)
captures the final canvas in the same task as rendering and UI composition,
before WebGL discards its drawing buffer. Encoder backpressure delays the next
frame instead of dropping frames. H.264 is preferred, with MP4-compatible codec
fallbacks; support is checked before allocating export targets. Mediabunny is
loaded only when stopping a take, adding no encoding work to normal map rendering.

Keep the tab visible during export; rendering waits while it is hidden. Hiding
the tab during a take finishes it at the last visible sample. **Cancel export**
or **Escape** cancels rendering. Completion, cancellation and encoding errors
restore the live camera, drawing-buffer resolution, animation time, controls
and motion preference, including if the browser was resized during export.
Page teardown aborts encoding and releases UI sprites and the download URL.
Browsers without WebCodecs show an explanation and keep the map usable.

## Rebuild and verify

With the development server running:

```sh
MAP_SOURCE_URL=http://127.0.0.1:55000 corepack pnpm map:build:lite
```

Use the actual Vite port in `MAP_SOURCE_URL`. The build script extracts native
Tidewater, Sakura and a Sakura pine into `.context/map-lite`, reduces and
validates their two LODs, exports the native Tidewater nature kit, then runs the
offline Punk generator. Rebuild only Punk with
`MAP_SOURCE_URL=http://127.0.0.1:55000 corepack pnpm map:build:punk`;
it needs a running Vite server, Chrome, Node and Python Pillow. The browser
extracts the rigged car once; the city composition then builds offline.
Its city/car kit is vendored, and its atlas inputs come from the installed
`three-fenestra` package. Lagoon
retains its existing `map:build:lagoon-lite` pipeline. Generated assets belong
under `public/map/`; `.context` contains reproducible intermediates and review
screenshots, not runtime dependencies.

```sh
corepack pnpm test
THREETOPIA_GPU_TESTS=1 corepack pnpm test:e2e tests/e2e/map-lite.spec.ts tests/e2e/lagoon-lite.spec.ts
THREETOPIA_GPU_TESTS=1 corepack pnpm test:e2e tests/e2e/map-settings.spec.ts
THREETOPIA_GPU_TESTS=1 corepack pnpm test:e2e tests/e2e/map-video.spec.ts tests/e2e/map-video-interface.spec.ts
THREETOPIA_GPU_TESTS=1 corepack pnpm test:e2e tests/e2e/map-ocean-fft.spec.ts
corepack pnpm build
```

The tests cover continuous tile boundaries, an open river, dry pier approach,
submerged boat positions, depth-texture edges, component budgets, desktop and
mobile zoom limits, synchronized reflection after camera motion, pause and
reduced motion, asset requests and runtime errors.
The wildlife checks sweep every rendered whale vertex over its complete route
for seabed, pier and boat clearance, verify loop continuity and matching normals,
and exercise actual GPU rendering, pause, animation and the full-frame budget.
A separate waterline regression compares GPU whale coverage with independent
CPU ray intersections through the animated mesh, applying Snell's law. It
raises and lowers the water surface to catch missing upper-body strips and
checks for phantom silhouettes outside the animal.
The lighting regression also reads the GPU output: it verifies nonconstant
contact occlusion and that disabling only the water's shadow reception
brightens pixels beneath real occluders. It checks matching native bark/crown
transforms, the shared sun and the complete animated-frame rendering budget.
The foliage regression advances deterministic wind frames, compares raw and
stabilized GPU AO variation, verifies fresh history after resetting the view,
and checks that every new animation pose receives an updated sun shadow.
The driving regression samples every car vertex around a full drifting lap at
both LODs, checking road coverage and facade clearance. It also checks boosts,
countersteering, loop continuity, pause and identical poses across LOD changes.
The thruster regression reads an actual ring stack rendered side-on in HDR. It
checks three separated blue rings of decreasing width, a substantial smallest
ring, independent vertical displacement and exactly stable paused frames. The
full-scene rendering budget remains covered by the map and water regressions.
The video checks create and decode a real 1080p MP4, verify every packet's 60 fps
timestamp and changing nonblank images, exercise cancellation, resize, reduced
motion and missing/failed encoders, and check the mobile recorder layout.
The FFT regression compares GPU displacement and derivatives in every cascade
against an independent direct Fourier sum. It also verifies exact results when
rewinding the animation clock, no work while paused, and bounded texture memory.

## Publishing the map preview

```sh
corepack pnpm build:world-map
corepack pnpm exec wrangler deploy --config wrangler.world-map.jsonc
# Or both steps: corepack pnpm deploy:world-map
```

`vite.world-map.config.ts` bundles only `map/lite/index.html`, using the same
HTML partials and Three.js resolution as local development. Public-directory
copying is disabled. `scripts/build-world-map.mjs` moves the document to the
host root and copies an explicit set of map assets, creator images, branding
and licenses into `dist/world-map`. It never copies `public/world-assets`,
the full `dist/client`, or the walking-world entry.

The asset-only deployment reuses the existing `threetopia-world-wip` Worker
and its `world.threetopia.com` custom domain. Missing assets return 404; there
is no application fallback. Legacy `/world/` and `/map/lite/` document URLs
redirect to the map at `/`. The main `threetopia` Worker, marketing routes and
waitlist bindings are independent. Use the explicit map config when deploying;
plain `pnpm deploy` publishes the landing site.

The page always displays **Map preview only** and **The playable world is not
available yet.** It opens directly into the map after loading, without a second
entry button. The former static WIP page remains available as an explicit
fallback through `corepack pnpm deploy:world-wip`.
