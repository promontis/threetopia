# Image map SDK

For the newer **native 3D map-slot prototype**, open `/map/lite/` or see
[the map package's slot contract](../packages/world-map/README.md). It composes
four compact hex tiles from reduced Lagoon, Tidewater, Sakura and Punk assets.
The guide below documents the older image-map format.

The actual map at `/map/` is a composition of separate images. `/atlas/` is an
alias with the same creator controls. A lightweight Three.js atmosphere renders
water, volumetric clouds and local effects; neither entry loads playable world assets. The game minimap and full map use the same `ImageAtlasRenderer`.

One world owns one tile group. Its landscape is one transparent image; each
moving object is a separate image or effect inside that group. The current four worlds
have **four terrain images and 54 child components**: 17 image sprites and 37 effects. There is no combined
island image in the runtime. The approved concept is an art direction reference.

## Package

`@threetopia/world-map` is a local workspace package, not an npm release.

```js
import {defineImageMap, starterImageMap} from '@threetopia/world-map';
import {ImageAtlasRenderer} from '@threetopia/world-map/image-renderer';
import '@threetopia/world-map/image-renderer.css';

const view = new ImageAtlasRenderer(host, registry, {onSelect, onError});
view.fit();
view.setOptions({motion: true, boundaries: false, creators: false});
view.updatePlayer(worldX, worldZ, yaw);
// Same DOM tree can move between the mini and full map.
view.mount(minimapHost);
view.setMode('mini');
// When the map is removed:
view.dispose();
```

Two shared Three.js canvases place water below the image composition and clouds /
local effects above it. The clouds use 16 bounded volume samples; water uses moving
wave normals and refraction. Tile silhouettes occlude effects belonging to a tile
behind them. No playable scene is imported. Pan and zoom use the same projection
for the DOM images and both GPU passes. Sprite motion uses bounded CSS animations.
Animations pause when motion is disabled, the document is hidden, in the minimap,
or when the operating system requests reduced motion.

## Tile contract (version 2)

The world manifest still declares its axial `tile`, six Wang `edges`, and mandatory
`map: "map.json"`. The image representation is separate from the playable scene:

```json
{
  "version": 2,
  "kind": "image-tile",
  "origin": "tile-centre",
  "radius": 400,
  "terrain": {
    "src": "assets/landscape.webp",
    "preview": "assets/landscape-overview.webp",
    "position": [0, -30],
    "size": [1040, 840],
    "anchor": [0.5, 0.58]
  },
  "components": [{
    "id": "harbour-boat",
    "label": "Harbour sailboat",
    "src": "assets/boat.webp",
    "position": [-15, 115],
    "size": [120, 80],
    "anchor": [0.5, 0.5],
    "order": 5,
    "animation": {
      "kind": "sail",
      "duration": 28,
      "travel": [35, 35],
      "rotate": 4,
      "delay": -6
    }
  }],
  "landmarks": [{"id": "harbour", "label": "Harbour", "position": [-70, 85]}]
}
```

Image positions and sizes use **local art coordinates**, positive X right and Y
down. Anchors are fractions of the image size; `[0.5, 0.5]` pins its centre. These
are not world metres. Tile centres and the live player use the shared projection:
`u = 1.18*x + 0.32*z`, `v = -0.15*x + 0.56*z`. The logical tile remains a 400 m
Wang hex with centre `hexCenter(q,r)`. Layers inherit their parent tile position;
never bake neighbouring worlds into a tile image or use global object positions.

`order` (0–20) controls a component's depth inside its tile. Entire tile groups
sort by their projected ground centre. Foreground tree/roof occlusion can use an
additional static component above a moving object. `opacity` is optional (0–1).
Layer visibility and the separated-layer view are inspection tools, not saved
world edits. The image map generalises terrain and landmarks; it is not a survey
of every building. Actual movement and collisions remain in the playable world.

Animation kinds: `float`, `sail`, `drift`, `petals`, `sway`. Use `sway` for wind in
a separate transparent tree sprite; anchor its roots near `[0.5, 0.9]` and use
a gentle rotation around 1–2 degrees. Duration is 4–180 seconds,
travel is bounded to ±300 art units per axis and rotation to ±45 degrees. Add a
negative delay for an independent starting phase. Every object is a separate
image layer; multiple instances can share the same image file. No arbitrary
JavaScript, shaders or custom animation code is accepted in the data.

## Local water, clouds and lights

An effect is another independently positioned child component. Use `effect`
instead of `animation`. Creators choose bounded presets; map JSON never supplies
shader or JavaScript source. The renderer owns shader compilation and disposal.

```json
{
  "id": "temple-falls",
  "label": "Temple waterfall",
  "src": "assets/landscape.webp",
  "crop": [0.473, 0.349, 0.072, 0.093],
  "position": [10, -195],
  "size": [78, 82],
  "anchor": [0.5, 0.5],
  "effect": {"kind": "waterfall", "speed": 1, "seed": 4}
}
```

`crop` is `[left, top, width, height]` in 0–1 source image coordinates, measured
from the top left. Position and size must align that crop over the source artwork.
For a source rectangle `(x,y,w,h)`, terrain size `(W,H)`, position `(X,Y)` and
anchor `(a,b)`, use `size=[w*W,h*H]` and centre
`position=[X-a*W+(x+w/2)*W, Y-b*H+(y+h/2)*H]`.
The effect remains its own toggleable layer; the source texture is shared.

| Preset | Behaviour |
| --- | --- |
| `cloud` | Procedural Three.js volume; omit `src` and `crop`. Set `opacity` and `travel` for drifting clouds or small waterfall spray. |
| `waterfall` | Falling streaks, refraction and foam; samples bright, water-coloured pixels in `src` / `crop`. |
| `ripple` | Refracts water-coloured pixels; place in open water clear of moving image sprites. |
| `light` | Slow irregular brightness changes on luminous coloured pixels. Optional hex `color` tints the glow. |
| `foliage` | Wind moves green leaves and pink blossom detail inside a source crop, preserving trunks, buildings and the crop's outer edge. |

Effect `speed` is 0.1–3, `seed` is 0–10000, `travel` is at most ±300 per axis.
Set `grounded: true` on waterfall spray clouds so nearer tiles also occlude them.
Every layer uses the same pause and reduced-motion policy. Clouds sit above terrain;
local surface effects respect overlap between parent tiles. Keep sprite occlusion
in mind: place surface-effect regions clear of separate boats or tree sprites.
Water is shared by the map; creators do not create a new canvas for each tile.
If WebGL is unavailable, the four image landscapes and map controls remain usable.

## Art and edges

Match the approved warm living-diorama style, fixed aerial camera and upper-left
lighting. Export genuine alpha around your landscape; keep ocean outside its
shore fringe transparent. Keep moving boats and trees out of the landscape and export those independently
as transparent images. Clouds are procedural, so give them an effect instead of an image.
Waterfall and neon effects can sample a precisely aligned crop of the landscape.
Give connecting edges compatible low ground, colours and a sandy trail; leave
space for the neighbouring tile. Use the atlas's optional Tile edges to inspect
the logical footprint. Shared borders stay unobtrusive in exploration mode.

The image overlap is an artistic coastal transition, not a replacement for the
physical Wang contract. Six signatures are ordered E, SE, SW, W, NW, NE. Physical
connections still require matching signatures and heights on both neighbours.
An available ocean tile is a proposal, never a reservation. Fill the first
incomplete ring around Lagoon before expanding the next ring.

## Budgets and loading

- Map JSON: at most 64 KiB; 32 child components and 32 landmarks.
- Each image: at most 2 MiB in CLI validation. PNG, WebP or AVIF, local paths.
- Layer dimensions: up to 1600 art units; component anchors from 0 to 1.
- Provide a smaller `preview` image (current tiles: 640 px) and a detail version.
- DOM terrain uses the overview image when distant. Image-based effects and tile
  silhouettes also load the full source image (558–750 KiB per shipped landscape).
  Texture uploads are shared by all effects sampling the same image.
- Two shared GPU contexts, capped at 30 updates/s, device ratio 1.35 and 2.1 million
  pixels per pass. The minimap caps its device ratio at 1. Static views render only
  on invalidation; paused/hidden/reduced-motion views have no continuous loop.
- The renderer keeps at most 24 nearby tile compositions. Distant views hide child
  components and landmark labels. Hidden/disposed maps release their DOM, events
  and observers; disposed maps also release textures, materials and GPU contexts. A large public registry still needs spatial server pagination.

The shipped art lives under `public/map/assets/`; each independently editable
manifest lives under `public/map/tiles/`. `public/atlas/registry.json` places the
four worlds via `imageMap`. No play assets or generated full-island plate are used.

## CLI

```sh
pnpm threetopia slots --registry public/atlas/registry.json
pnpm threetopia create my-world --tile 1,-1 \
  --registry public/atlas/registry.json --connect SW
pnpm threetopia check my-world
pnpm threetopia preview my-world
pnpm threetopia build my-world
```

`create` produces `world.json`, an image-tile `map.json`, an example landscape and
a README. Replace the example with your own tile and add separate component images.
Existing directories are never overwritten. `check` rejects absent maps, bad
animations, duplicate IDs, missing/oversized images, escaping paths, occupied tiles
and mismatching neighbour edges (when a registry is supplied). Images in packages
use paths relative to their map JSON. The host registry may use root-relative URLs.

`preview` serves the images, map modules and local Three.js runtime. `build` produces
a self-contained `dist-map/` static site with those same files and no CDN dependency.
`map-ocean.webp` is a reserved runtime path; put creator assets in `assets/`.
There is no publish service, tile reservation or npm release in this workspace.
Version 1 mesh-map data/validators are retained for the existing physical seam
checks; they are not used by the current map UI. New previews require version 2.
