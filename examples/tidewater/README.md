# Tidewater package conversion

The main conversion has **one world-tile, one map-tile and 18 sub-packages** under
`packages/components/`. Run `pnpm example:tidewater:packages --output NEW_DIRECTORY`
to export them; add `--creator HANDLE --tile WORLD/tile.lock.json` for a registrable
world. Without a reservation, the world output is explicitly a local preview.
`package-owners.json` assigns all 130 pinned source files to their owning packages.
See the [package structure](../../docs/content/tidewater.md) for the full inventory.

`pnpm dev:example:tidewater:full` previews the complete world composition on port
5197. It imports the extracted packages, not the reference source tree.

## Smaller original extraction study

Run `pnpm example:tidewater` to create local Threetopia asset projects, then
`pnpm dev:example:tidewater` for the independent coast and garden scenes on port 5196.
See [the conversion guide](../../docs/content/conversion.md) and
[the complete Tidewater walkthrough](../../docs/content/tidewater.md).

`pnpm test:conversion` renders both views and saves `.context/tidewater-reuse.png`.
`pnpm test:cli:integration` uses an isolated local registry and two synthetic creators
to register, publish locally, install and run the extracted components. It also
checks direct server rejection of malformed JavaScript.

The author and pinned revision are recorded in both component packages. This study
is an extraction of rocks and gulls, not a conversion of Tidewater's entire runtime.
