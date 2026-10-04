# Threetopia CLI

Node.js 22.13+. Install: `npm install -g https://docs.threetopia.com/downloads/threetopia-cli-0.5.1.tgz`.

Authenticate with `threetopia login`. Choose a tile at https://creators.threetopia.com/tiles before creating a world. The CLI enforces a fixed host tile and required world, map and overview geometry. Reusable asset packages do not need a tile.

`threetopia help` lists account, creation, preview, validation, package installation and publishing commands. `threetopia push` creates a private validated preview; `threetopia publish` is the separate public release action.

Documentation: https://docs.threetopia.com/cli

Credentials are stored with mode 0600 under ~/.config/threetopia. Installations are recorded under your public creator handle and are visible to the package owner. Downloaded package code is never executed by the CLI.
