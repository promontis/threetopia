# A hex tile format for Threetopia

Status: proposal. The landing page illustrates how hex tiles share boundaries.
There is no published SDK, CLI or connected world yet. The dimensions below are
examples to try with creators, not a finalized standard.

## Why this format

A tile gives a scene a known footprint; six edge contracts describe how it joins
its neighbours. Creators can also contribute components used inside someone
else’s tile. They do not all have to build environments.

This adapts Wang-style edge matching to hexagons. Classical Wang tiles are square
and do not rotate freely. Here, each allowed 60° rotation would be an explicit
placement variant. Creators must be able to restrict rotations when their content
is directional. The retained checker supports all six; the landing illustration
keeps one orientation.

Start with deliberately placed tiles and a small shared library of edges.
Automatic layout can come later. Matching six local boundaries does not ensure
that the entire map is solvable, paths are reachable or rivers have sensible
sources and outlets. Those require separate world-level rules.

## Tile and boundary contract

- Regular, pointy-top hexagon. Example: 50 m from centre to corner, not 50 m wide.
  Tile radius and world scale must agree everywhere.
- Metres, Y up, content in the XZ plane. Axial `(q, r)` positions; clockwise edge
  order E, SE, SW, W, NW, NE. South maps to positive Z. For radius R, tile centres
  are `x = sqrt(3) * R * (q + r / 2)`, `z = 1.5 * R * r`.
- Versioned profiles for all six edges, including boundaries without a crossing.
  A name such as `river-6m@1` refers to shared geometry and rules, not just a tag.
- An example 2 m strip inside each edge is reserved for the boundary system.
  It supplies geometry, normals, material blending and ownership rules at the
  three-tile corners. Interior terrain meets the inner side of that strip.
- Profiles define an ordered height curve, corner heights, surface normals,
  ground/material transition and collider continuity. Opposite edges compare
  their samples in reverse order. Adjacent edges must agree at a shared corner.
- Paths add a walkable opening and slope/clearance requirements. Rivers add
  channel geometry, water surface level and flow in/out. Non-flat water needs
  explicit profiles. Bridges, river sources and transitions are authored content;
  matching a boundary cannot infer a valid interior.
- A manifest declares the format version, allowed rotations, bounds, assets,
  dependencies, creator credits, collider references and tile entry point.
  Published versions are immutable; placements reference an exact version.

The retained checker in `src/connections/hex.ts` compares three height samples
per edge, kind/profile, width, tile radius, units, corner consistency, river level
and direction. Three
samples are not a real terrain specification. Its six checks concern the centre
tile, not every boundary elsewhere in the world. The landing page uses a separate
concept illustration: changing the interior leaves the river and paths in place.
It does not run the checker or display a validation result.

## Runtime contract

Threetopia owns the renderer, shared camera/player, input, time and agreed
lighting/render settings. A tile supplies a content group and lifecycle hooks to
load, attach, update, detach and release resources. It must not replace the host
render loop or dispose shared assets. Standalone demos may require adapters.

Load neighbouring content before a player crosses. Keep the current tile and
player state until the destination’s assets and collision geometry are ready.
If loading fails, keep that crossing unavailable with a clear retry path. Unload
content only after it is no longer needed; shared assets need reference counting
or equivalent ownership. Renderer compatibility and device budgets must be
chosen and profiled with real creator projects.

Portals are an additional transport mechanism for distant destinations or worlds
with different settings. They need destination/arrival checks and a state handoff;
they do not replace the adjacent terrain contract.

## Checks and publishing

| Stage | What it can establish |
| --- | --- |
| `check` | Manifest/schema validity, references, units/bounds, declared edge profiles and allowed placement rotation. Compare every occupied neighbouring edge and shared corner. Empty positions remain unverified, not green matches. |
| `preview` | Load actual adjacent tiles under the shared renderer. Inspect visible seams, normals/materials/lighting, walkability, colliders, spawn clearance, loading/cleanup and measured frame/memory cost. |
| `publish` | Package a reviewed version with assets, dependency versions and credits. Publishing a component or tile does not automatically choose its world position. |
| World placement | Recheck the chosen neighbours against their pinned versions and test route/river connectivity. Start with a curated layout. |

Declarations alone cannot prove that an arbitrary mesh implements them, or that
several valid tiles fit within a device’s rendering budget. Future automated mesh
and runtime checks can complement a preview; they should report their actual
coverage rather than imply a completely verified world.

## Decisions to test with the first creators

1. Footprint size, border width and the smallest useful set of edge profiles.
2. Who owns the shared corner mesh and how material transitions are authored.
3. Rendering/lighting compatibility, resource ownership and measured device budgets.
4. Adapting existing demos: which parts can become reusable components, and which
   require a separate portal destination instead of adjacent placement?

## References

- [Cohen et al., Wang Tiles for Image and Texture Generation (2003)](https://graphics.uni-konstanz.de/publikationen/Cohen2003WangTilesImage/index.html): original edge-matching technique for images and textures; it does not define this proposed 3D tile runtime.
- [Red Blob Games, Hexagonal Grids](https://www.redblobgames.com/grids/hexagons/): hex coordinates, neighbours and rotations.
- [WaveFunctionCollapse](https://github.com/mxgmn/WaveFunctionCollapse): a possible later layout tool using adjacency constraints, with contradictions and global constraints still requiring handling.
