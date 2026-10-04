# Lagoon source-renderer review

## Lightweight tile

With Vite running, open **http://127.0.0.1:55010/map/lagoon/**. This is the
lightweight native-capture version. It downloads no Lagoon geometry or source
engine. Pan, bounded zoom, pause, keyboard controls and reduced motion work in
one Three.js scene. The whole tile remains visible at maximum zoom.

Rebuild with `pnpm map:bake:lagoon` (local Chrome, Python 3 and Pillow 12+).
The command runs the pinned native renderer at 2400 × 1800, freezes its camera,
wind and exposure, then captures beauty plus semantic visibility mattes using
the original vertex deformation and alpha programs. A matte includes foreground
occlusion: water behind a house cannot animate over that house.

The packer crops these into `public/map/lagoon/baked/`: one complete base, ten
independent canopy crops, palm fronds, water, and waterfalls. Component shaders
refract local image detail within their fixed visibility masks. The complete
still underneath fills sub-pixel gaps; these are **not freely movable 3D trees**.
Ocean and clouds are procedural Three.js shaders. Lagoon water uses captured
floor/reflection colour plus live refraction and highlights; it does not run
the expensive native reflection renderer.

384 px overview: approximately 27 KiB / 0.4 MiB GPU. 1024 px detail: 451 KiB /
8.0 MiB GPU. 2048 px detail: 1348 KiB / 31.9 MiB GPU, including mipmaps. Actual
screen pixel coverage chooses the tier. All detail layers swap atomically;
superseded loads are aborted. Offscreen or distant detail textures are disposed,
while the small overview stays available. The manifest records camera and
source hashes so the capture can be audited and rebuilt.

This one-tile study preserves the approved native **perspective** view. The
fixed perspective, adapted coast and 240-unit image frame are not the shared
Wang world projection or a solved edge-joining contract. Before migrating all
worlds, standardize the capture projection/edge profiles and connect landmarks
to that projection. The walking world and global map still use their previous
layout. Original shaders may require adapter changes when the source updates.

## Full native reference

Run `pnpm map:live:lagoon` and open **http://127.0.0.1:55012/** for the animated
browser version. It opens automatically after a loader, using the same adapter
and original scene as the still. Drag to orbit, scroll or pinch to zoom, and use
the reset/pause buttons. The focused canvas also supports arrow keys, +/−, R and
Space. Animation pauses in hidden tabs and starts paused for reduced motion.
Set `LAGOON_REVIEW_PORT` to change the local port.
The detail selector reloads with an original source quality preset. Maximum
matches the still's quality and is expensive; this full source scene is a visual
review, not the optimized multi-tile map renderer.

Run `pnpm map:review:lagoon` to render one 2000 × 1500 still into
`.context/lagoon-native/lagoon.png`. Chrome runs with GPU acceleration and closes
when the PNG and `report.json` have been saved. No development server or asset
export is required; the script serves the pinned original locally, read-only.

This is a visual proposal, separate from the deployed map and walking runtime.
It uses the original Lagoon WebGL renderer, tree generation, complete leaf
population, native materials, lighting, reflections and post-processing.
The original distribution in `packages/world-sources/lagoon/original` is untouched.

The review adapter reshapes the desert perimeter into a compact coast, removes
peripheral scatter, includes the native cliff shadow proxy in that deformation,
and extends the native water surface. Outside the new coast it transitions from
the source's bounded desert-floor refraction into its native deep-water
scattering. Interior lagoon water, all ten hero trees, buildings and village
bridges retain their source positions and materials. It is not yet a Wang edge
contract or a replacement for the world's collision data.

Why the earlier port looked sparse: `scripts/world/capture-tool.js` exports only
the leaf instances visible at capture time. The native scene deliberately lowers
that count at a distance, increasing leaf-card coverage in its own shader. The
ported map enlarged neither that coverage nor the incomplete instance buffers.
This review bypasses that export and renders the full source-generated leaves.

The capture fails on page/source errors or if the coast changes a hero tree's
foundation height. Inspect the resulting image to assess composition and
materials; those visual properties are not established by a passing build.
