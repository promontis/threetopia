# Geometry and performance budgets

The CLI and registry share a validator. The server reads the uploaded bytes and checks actual transformed vertices; it does not trust the CLI’s report or the bounds declared in a GLB accessor.

| Representation | Triangles | Draw calls | GLB bytes | Textures | Decoded texture memory |
| --- | ---: | ---: | ---: | ---: | ---: |
| World | 500,000 | 160 | 32 MiB | 24 | 128 MiB |
| Map | 36,000 | 4 | 768 KiB | 2 | 2 MiB |
| Overview | 24,000 | 3 | 512 KiB | 2 | 2 MiB |
| Asset GLB | 500,000 | 160 | 32 MiB | 24 | 128 MiB |

Each triangle primitive counts as a draw call. Repeated nodes count toward total drawn triangles and calls. Texture memory includes an estimated full mip chain. Embedded textures are limited to 4096 × 4096, and the decoded-memory limit still applies.

A package can contain at most 128 files, 32 MiB per file and 64 MiB total. Accounts currently allow 50 packages, 500 stored versions and 2 GiB of declared package storage. These limits apply to drafts too; remove unused unpublished versions to free space.

## Fit the slot

Version 2 world content must fit the locked `slot.regions`, relative to `slot.origin`, above local y=0 and below y=480. Map and overview use the same build areas at scale 0.03, with a maximum local height of 14.4. Every triangle must fit wholly inside one region, so geometry cannot cross a protected channel even when its vertices land on separate banks. Version 1 contracts retain the original radius of 190 metres (5.7 map units).

The slot is intentionally smaller than the host tile. The outer terrain band and boundary profiles belong to Threetopia. A tall building that fits the triangle budget can still fail the bounds check.

## Common failures

- **“Host tile is immutable”**: restore `tile.lock.json` from your reservation or clone the package again. Do not edit its hash.
- **“Geometry leaves its slot”**: centre and scale the component, apply/export transforms, and check the lowest vertex.
- **“Map exceeds draw calls”**: merge meshes/materials and bake shared textures. One component can contain several recognizable objects, but it still has to fit the combined budget.
- **“Use a self-contained GLB”**: embed textures and buffers; do not reference external URLs.
- **“Compressed or instanced accessors”**: export an uncompressed validation-compatible GLB.
- **Missing map/overview**: both are mandatory for a world package, even if your detailed world already renders well.

Run `threetopia check` before upload. The server repeats the checks on `threetopia push`. A rejected draft is never publicly served as a published package.

## Code exports

CLI and registry parse included JavaScript without executing it. Invalid syntax, missing relative imports, undeclared external dependencies and uncompiled TypeScript/JSX exports reject validation. Include `package.json` with `type: "module"` for `.js` ESM and declare external dependencies or peerDependencies. Code is limited to 2 MiB per module and 8 MiB per package. Node utilities may import `node:` built-ins; that does not make them browser components.

Warnings identify runtime features requiring review. Passing checks does not prove lifecycle correctness, visual parity or renderer compatibility. Run the component and browser tests described in the [conversion guide](/conversion). Registry previews still render GLBs and never execute uploaded code.

Complete scene runtimes must name included, self-contained classic bundles, styles, assets and a consistent coverage report with no omitted features. The CLI and server check the same contract. These checks do not execute code or prove visual/behavioral parity; the complete-scene GPU acceptance test provides that evidence for Tidewater.
