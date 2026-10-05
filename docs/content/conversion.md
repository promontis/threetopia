# Convert a scene into reusable packages

Start with the creator's existing source repository. An X post can identify a demo,
but a video alone is not source code. Preserve the original author, source revision,
license and any separate asset credits.

## Analyze before editing

With CLI 0.6.0 or later:

```sh
threetopia analyze ./my-scene --json
```

This works offline without an account and never runs project code or package scripts.
It reads JavaScript, TypeScript and JSX/TSX, reports imports, exports, assets, source
locations and potential component boundaries. Host-state imports, renderers, loops,
GPU shaders and shared mutable objects are explicit review signals.

The report is a starting point for an agent. It cannot prove that code is reusable.
It does not search the registry, resolve arbitrary bundler aliases or observe runtime
behavior. `complete: false` means symlinks or scan limits excluded source. Resolve
the diagnostics before making claims about the whole scene.

## Propose a package plan

For a complete conversion, propose one world-tile composition, one separately
reusable map-tile package (`map` and `overview` exports), and the cohesive system
packages they consume. The world registers as `kind: world` against a real tile
reservation; the map and component packages register as `kind: asset`. The world
includes the map package's generated representations. Every system owns its source,
resources, credits and API; the compositions declare actual package dependencies.
A single bundled demo preserves playback but does not fulfill this extraction plan.

The creator's agent should:

1. Read the analysis and the actual source of promising components.
2. Search the [published catalog](/packages) for those capabilities. Do not invent
   existing package names. Reuse a suitable package when it preserves the creator's intent.
3. Propose cohesive asset packages, with their source files, exported API, configurable
   options, dependencies, attribution, and any visible changes. Explain what stays in
   the scene composition and what remains coupled to the host.
4. Ask before rewriting source unless that extraction is already authorized. Once the
   creator approves the plan, proceed without asking again for each routine file edit.

For example:

> I propose a world-tile, a map-tile, and reusable packages for the ocean, terrain,
> village, vegetation, wildlife, boat, player, audio and other scene systems. May I
> refactor the compositions to import these packages, preserve the complete scene,
> and test the same packages in another composition?

Do not make a package for every mesh or shared helper. Keep tightly related geometry,
materials and behavior together. A helper can remain private inside a component.

## Preserve the complete scene

Inventory every visible and behavioral feature before extraction. Include shaders,
post-processing, physics, simulation, controls, animation, audio and lazy-loaded
assets. Give every feature a destination and acceptance evidence. Selected objects
are useful extraction examples but do not constitute a complete conversion.

When a static export would lose behavior, use a [complete scene runtime](/scenes)
and preserve the application until each subsystem can be adapted without loss.

## Extract and prove reuse

Use named exports and explicit options. A visual factory returns an `object` that
the caller adds to its scene and an idempotent `dispose()` that releases only its
own resources. Animated components may expose `update(timeInSeconds)` with absolute
host time. The host owns the renderer, camera and frame loop.

Test two independent instances. Updating or disposing one must not change the other.
Keep the original scene consuming the extracted package. Build a second composition
that imports the same exports and uses different options. Compare original geometry
or rendered views, and measure draw calls, triangles and resource cleanup.
Install the exact dependency graph as another creator and rebuild from those
installed modules. Workspace aliases and imports back into the original source
tree must not hide missing package files or undeclared dependencies.

Include a README, license, provenance and type declarations. Export browser-ready
JavaScript; include `package.json` with `type: "module"` for `.js` modules and declare
external peers such as Three.js. Include every relative import in the distributed
file list. Compile TypeScript/JSX before exporting executable code.

## Prepare a Threetopia project

An agent can prepare a local `threetopia.json` with a manifest and file list without
server IDs. Use the [asset manifest](/packages) and add code and static GLB exports.

```sh
threetopia check ./local-component --json
threetopia preview ./local-component
threetopia login
threetopia create ./registered-component --kind asset --from ./local-component
threetopia check ./registered-component --json
threetopia push ./registered-component
```

`create --from` validates the local package before contacting the registry, creates an
account-owned package in a new directory, and preserves its files, license and
manifest metadata. Its name defaults to your handle plus the new directory name;
use `--name @your-handle/package` when needed. It never overwrites an existing directory.
Publish dependencies before uploading a composition that depends on them, and use
their actual registered names and exact versions.

New projects include `AGENTS.md` with this workflow. `push` creates a private preview.
Public release remains the separate `publish` action when the creator requests it.

## Keep runtime promises precise

The registry's world/map/overview representations are static, self-contained GLBs.
Complete scene runtimes run in an isolated preview document on the creator website; they keep shaders, animation, controllers and physics. Object code exports are reusable by applications that explicitly import them. A GLB export alone does not preserve runtime behavior. Surface these tradeoffs in the plan rather than silently dropping behavior.

Reserve an actual tile before creating a world. Export the composition to its locked
build regions and generate separate map and overview geometry within their budgets.
`threetopia build` builds a portable preview; it does not compile scene source to GLB.

## Acceptance

- The original scene still consumes the extracted components and retains the agreed appearance.
- A second scene uses the same exports with independent state and cleanup.
- Code, manifests, geometry, component tests and browser checks pass.
- A clean installation of the release artifact can analyze, check and build the example.
- The private preview is reviewable before any public release.

The [Tidewater study](/tidewater) is the first executable example. Agent behavior also
needs evaluation: check a fresh scene, a host-coupled scene, an already approved
refactor and a request that forbids rewriting. A valid analysis report alone does
not demonstrate that an agent asked at the right moment or chose useful boundaries.
