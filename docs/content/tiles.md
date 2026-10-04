# Tiles and Wang connections

Threetopia supplies fixed terrain, infrastructure, water beds and environmental dressing. Creators fill the locked build areas with their world and simplified map content.

## Fifteen host designs

The current catalog contains **15 distinct 3D designs**. Compatible rotations are separate options; they are not counted as extra designs.

| Nature | Water and city | Floating Punk hosts |
| --- | --- | --- |
| Tropical inlet | Sakura river | Circuit deck |
| Alpine pass | Sheltered marina | Neon docks |
| Desert oasis | Canal quarter | Sky terraces |
| Tidal wetland | Coastal terraces | |
| Autumn woodland | Industrial docks | |
| Basalt coast | Garden boulevard | |

Each design has its own terrain shape, build plots, vegetation, rocks and infrastructure. Floating hosts have charcoal platforms, teleport pads and short cyan ring engines. Their building plots are empty: city buildings belong to creator packages.

[Explore the fifteen connected designs](https://creators.threetopia.com/tiles/study). The study shows actual Three.js geometry and the original four worlds; it does not reserve or publish creator packages.

## Connections and protected water

Six Wang edges describe land, river, sea or shoreline, 25 height samples, water level and path crossings. Adjacent reversed edges must match, including shared corners. The original Lagoon, Sakura, Tidewater and Punk showcases retain their authored version 3 hosts and original credits. New designs adapt to those measured edge profiles.

Ground paths are shaded into the terrain. Separate bridges span water. Natural shores transition into the ocean; engineered quays own their vertical walls. Tiles replace the seabed inside their footprints, so a new river cannot be covered by the old island's ground.

**Tidewater's harbor must stay connected to the exterior ocean.** A registry policy protects the real boat approach through its south-east edge, requiring a 42 m wide, 10 m deep route and 16 m overhead clearance. The check follows connected water bodies through reserved and published hosts. An isolated pond, shallow coastal strip or enclosed empty hole does not count as an ocean exit. Piers, quay walls and low engine rings constrain the route. The policy can accept a turning, multi-tile route; it does not reserve an infinite straight corridor.

Explore filters incompatible placements. Reservation and publication independently recheck the water route against the registry snapshot. Concurrent changes require a refresh. The CLI protects waterways by keeping every creator triangle inside a locked build region, clear of host rivers and infrastructure.

One-ring forward checking also rejects placements that leave an immediately neighboring empty coordinate with no compatible design. This local safeguard does not guarantee that every arbitrary future composition can be filled.

## Select and reserve

Choose any free coordinate sharing an edge with a **published** world. Reservations occupy positions and constrain neighbors, but only publication opens new neighboring positions.

Available positions appear as outlines. Selecting one focuses the camera on it and locks pan and zoom; orbit remains available around the tile center. Choose a design and use the rotation buttons, then **Reserve**. **Cancel** restores the previous overview.

Unused reservations expire after seven days, with at most two per creator. Creating a world package retains its reservation. To change an unpublished tile, remove its package if necessary, release it and select again. Published contracts are immutable.

## Version 4 contracts

Use **CLI/SDK 0.5.0 or later** for the new hosts. `tile.lock.json` records the design ID, rotation, edges, legacy adapters, build regions, content origin, map scale and canonical SHA-256 hash. The CLI and server reject modifications, even if a changed contract is rehashed. Version 1–3 geometry and hashes remain reproducible; saved tiles do not silently acquire the new designs.

| Dimension | World | Map and overview |
| --- | --- | --- |
| Corner radius | 300 m | 9 units |
| Diameter | 600 m | 18 units |
| Build areas | `slot.regions` | Same areas × 0.03 |
| Content height per region | 480 m | 14.4 units |

Export relative to **`slot.origin`**. The host applies this offset; do not bake it into exported vertices. Each region has its own `floorY`. For Sky terraces, the second plot is lower than the first: its content-local floor is `region.floorY - slot.origin.y`. Multiply every coordinate by 0.03 for map and overview assets.

Every triangle must fit wholly inside one convex region, including that region's vertical interval. Disconnected components may occupy multiple regions, but geometry may not stretch across the protected river, route or platform gap between them. A world package still requires world, map and overview GLBs.

## Rendering and performance

`createHostTile(contract, {map: true, lod: true})` creates the host with both detail levels. Call `setHostDetail(root, overview)` when projected size changes. Both are real meshes with the same composition; overview geometry reduces foliage, rocks and terrain density. Without `lod`, the SDK returns the detailed host. Use `setHostTime(seconds)` from the render entry for synchronized foliage and engine motion, including offline video rendering.

The Creator map prepares geometry and the shared ocean field in background workers. It caches recent selections and discards obsolete jobs before committing matching terrain and water together. The portable CLI preview bundles the same renderer and worker.

Host costs are separate from creator content budgets. The current test ceilings are 115,000 triangles and 11 material batches for a detailed host; 48,000 triangles for overview hosts. These are per-host limits, not a promise of fixed FPS or unlimited simultaneously loaded tiles. A larger registry still needs visible-tile loading and a whole-scene budget.

Native Tidewater palms, ferns, rocks and the lobster boat are reduced and reused under Dan Greenheck's MIT license, shipped in `HOST-ASSETS-LICENSE.md`. Other host meshes are generated from Threetopia's versioned design kit.
