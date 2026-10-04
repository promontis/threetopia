# CLI reference

Install the [0.5.1 release](/downloads/threetopia-cli-0.5.1.tgz) with Node.js 22.13 or later:

```sh
npm install -g https://docs.threetopia.com/downloads/threetopia-cli-0.5.1.tgz
```

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
| `threetopia clone @creator/package [dir]` | Clone one of your own packages and its fixed tile |

Creation accepts `--name @your-handle/package` and `--title "My title"`. Without these, the directory supplies the name. Existing directories are never overwritten. Use **Tiles → Explore** in Threetopia Creators for a visual selection.

## Development and release

| Command | Purpose |
| --- | --- |
| `threetopia check [dir]` | Validate files, actual geometry, budgets and tile integrity |
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
