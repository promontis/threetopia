# Threetopia CLI

Node.js 22.13+. Install: `npm install -g https://docs.threetopia.com/downloads/threetopia-cli-0.7.2.tgz`.

Authenticate with `threetopia login`. Choose a tile at https://creators.threetopia.com/tiles before creating a world. The CLI enforces a fixed host tile and required world, map and overview geometry. Reusable asset packages do not need a tile.

`threetopia help` lists account, creation, preview, validation, package installation and publishing commands. `threetopia push` creates a private validated preview; `threetopia publish` is the separate public release action.

For an existing scene, start with `threetopia analyze ./scene --json`. It inventories source and suggests component boundaries without executing code. Review the proposal and approve the extraction, then validate each local package with `threetopia check ./component --json`. Register it in a new directory with `threetopia create my-component --kind asset --from ./component`. New projects include an `AGENTS.md` conversion guide.

Checks cover manifests, geometry budgets, JavaScript syntax, included relative imports and declared dependencies. Component lifecycle tests and visual review still belong to the creator's project. The [Tidewater walkthrough](https://docs.threetopia.com/tidewater.md) demonstrates this workflow with reusable rocks and gulls.

Documentation: https://docs.threetopia.com/cli

Credentials are stored with mode 0600 under ~/.config/threetopia. Installations are recorded under your public creator handle and are visible to the package owner. Downloaded package code is never executed by the CLI.

Complete scenes: `preview` supports an isolated playable runtime with all shaders, simulation, controls and audio. After installing one, attach it with `threetopia use @creator/scene --export scene --as scene`. See https://docs.threetopia.com/scenes.md.
