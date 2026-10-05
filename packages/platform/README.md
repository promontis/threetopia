# @threetopia/sdk

Canonical fixed tiles, 15 authored Wang designs with nature, city and floating platform hosts, immutable contracts, GLB measurement, package manifests, and a Three.js host-tile renderer. Used by the registry, CLI and creator previews.

Documentation: https://docs.threetopia.com/tiles

Install the versioned SDK tarball from https://docs.threetopia.com/downloads/threetopia-sdk-0.7.2.tgz. This package is not yet released through the npm registry.

`tileSlots(occupied, reservations)` exposes all free positions sharing an edge with a published tile, without a ring-filling requirement. Reservations block their own coordinate but do not open new neighbors.

`tileContract(q, r, variant, rotation, legacyEdges)` derives geometry but does not reserve a position. Obtain a reservation through the authenticated registry before creating a world package. `createHostTile(contract, {map: true})` renders the same fixed terrain as the world tile at map scale. The creator may only fill its locked `slot.regions`, relative to `slot.origin`. Use `compatibleChoices(q, r, neighbors, {lookahead: true})` to filter layouts and rotations, and pass the reserved contract to `inspectGLB(bytes, role, contract)` for build-area enforcement. New world projects require CLI 0.5.0 or later. Version 1–3 contracts remain reproducible. New contracts are version 4; the four authored showcase hosts are available as `BUILTIN_TILES`.

Map hosts support `createHostTile(contract, {map: true, lod: true})` and `setHostDetail(root, overview)` from the render entry. Host rendering budgets are separate from creator content. Native Tidewater environmental and boat assets are included under the MIT license in HOST-ASSETS-LICENSE.md.

Tidewater declares `requiredOpenWater` in its source metadata. `tileSlots` marks its whale habitat at (1,1) and (2,0) as protected; `compatibleChoices` and `placementIssue` reject building there and preserve an unoccupied route to the ocean. Terrain contracts remain immutable.
