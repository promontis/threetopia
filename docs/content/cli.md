# CLI reference

Install the [0.7.2 release](/downloads/threetopia-cli-0.7.2.tgz) with Node.js 22.13 or later:

```sh
npm install -g https://docs.threetopia.com/downloads/threetopia-cli-0.7.2.tgz
```

## Analyze an existing scene

`threetopia analyze [dir] [--json]` inventories source and proposes extraction candidates offline, without changing or executing files. Read the [conversion workflow](/conversion) before refactoring.

## Account

| Command | Purpose |
| --- | --- |
| `threetopia login` | Browser approval and secure local CLI token |
| `threetopia login --no-open` | Print the URL without opening a browser |
| `threetopia whoami` | Show the authenticated account |
| `threetopia logout` | Revoke the current CLI token |

## Tiles and project creation

| Command | Purpose |
| --- | --- |
| `threetopia tiles [--json]` | List the current grid and tile variants |
| `threetopia reserve q,r --variant bay-coast --rotation 0` | Reserve a free coordinate sharing an edge with a published world |
| `threetopia create dir --kind world --tile ID` | Create a world for your existing reservation |
| `threetopia create dir --kind asset` | Create a reusable asset package |
| `threetopia create dir --kind asset --from local-package` | Validate and register prepared local assets into a new directory |
| `threetopia create dir --kind world --tile ID --from local-world` | Register a prepared world only when its immutable tile matches the reservation |
| `threetopia clone @creator/package [dir]` | Clone one of your own packages and its fixed tile |

Creation accepts `--name @your-handle/package` and `--title "My title"`. Without these, the directory supplies the name. Existing directories are never overwritten. Use **Tiles → Explore** in Threetopia Creators for a visual selection.

## Development and release

| Command | Purpose |
| --- | --- |
| `threetopia check [dir]` | Validate files, code syntax/imports, actual geometry, budgets and tile integrity |
| `threetopia preview [dir] [--port 5195]` | Interactive loopback preview; refresh after editing |
| `threetopia build [dir]` | Export a portable preview to `dist-threetopia/` |
| `threetopia push [dir]` | Upload and independently validate a private version |
| `threetopia publish [dir]` | Release a version that is already ready |

Checking, previewing and building an existing local project work offline. Registry operations require login. Push does not publish automatically.

## Reuse

```sh
threetopia search rocks
threetopia install @creator/package@1.2.0
threetopia use @creator/package --export model --as map
threetopia uninstall @creator/package
```

Run install, use and uninstall in the project directory. `use` accepts `--as world`, `--as map` or `--as overview`; it copies a GLB after checking it against that role’s bounds and budget. Installation without a version resolves the highest published numeric version and then locks it.

## Registry and files

All commands accept `--registry ORIGIN`. `THREETOPIA_REGISTRY` sets the default; production is `https://creators.threetopia.com`. Only HTTPS or HTTP loopback origins are accepted. A project cannot silently switch registries.

`threetopia.json` contains editable metadata, file paths and package/project IDs. `tile.lock.json` contains the immutable world tile. `threetopia-lock.json` records installed files and versions. `threetopia_modules/` contains downloaded reusable packages.

Run `threetopia help` for the installed command list. The previous local-only image/scene CLI is an internal legacy tool and is not the creator registry workflow.

## Agent diagnostics

`analyze --json` and `check --json` emit one JSON object with `schemaVersion: 1`, `command`, `valid`, and `diagnostics`. Diagnostics include `code`, `severity`, `message`, and a file/line when available. Errors exit with status 1; warnings are review signals. Check reports geometry per file under `files`, and confirms `code.executed: false`. No source code or installation scripts run during analysis, checking or installation.

## Complete scenes (0.7.2+)

`preview` and `build` support full playable scene runtimes as well as GLBs. After installing a published scene, run `threetopia use @creator/scene --export scene --as scene` to attach all its verified code, assets and credits. `check` verifies the runtime bundle and coverage, while browser tests verify behavior. See [complete scenes](/scenes) and [Tidewater](/tidewater).

## Namespaces and prepared projects

`threetopia namespaces` lists your own scope and any operator-assigned scopes. `create --from prepared-directory` preserves the prepared manifest name unless `--name` overrides it. A managed namespace changes the published name without changing the signed-in account or its ownership checks. Every prepared package should include a README with usage and composition examples and a preview with applicable settings.
