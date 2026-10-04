# Threetopia — creators and a connected world


## Creator platform (current)

- **Creators:** https://creators.threetopia.com — email-code accounts, permanent creator handles, CLI device approval, own packages, version states/changelogs, actual installer records and private previews.
- **Docs:** https://docs.threetopia.com — canonical English guides, Markdown mirrors, package schema, downloadable standalone CLI/SDK, `/llms.txt` and `/llms-full.txt`.
- **Fixed tiles:** 144 procedural variants. Choose and reserve before creating a world. World, map and overview GLBs are required; the CLI and server enforce the immutable host contract and measure actual transformed vertices.
- **Reuse:** published asset packages install with exact versions, SHA-256 verification and a lockfile. The original MIT `@threetopia/beacon@1.0.0` is a working example.
- **World host:** still a map preview only; the playable world is unreleased. Published package map content is loaded into the real shared scene.

```sh
corepack pnpm build:docs
corepack pnpm build:creators
corepack pnpm dev:creators       # http://127.0.0.1:55020, local-only auth codes
node scripts/creators/integration-test.mjs
```

The local integration uses two synthetic accounts and the local D1/R2 bindings; it sends no email. It consumes an available local tile. Reset the dedicated local creator DB between repeat full runs if needed. Do not run a local reset against production.

Deployment configurations are separate: `wrangler.creators.jsonc` (creator Worker + D1 + private R2), `wrangler.docs.jsonc` (static docs), `wrangler.world-map.jsonc` (map), and `wrangler.jsonc` (landing + waitlist). Use explicit configs for deployment. Build docs before creators so versioned downloads and LLM links are available. The older image/scene prototype CLI remains in `packages/cli/bin/legacy.js`; the current CLI entry uses the registry workflow described above.

### Saved tile photographs

**My tiles** loads versioned 800×500 WebP images from R2, without a hidden map iframe or WebGL renderer. D1 migration `0003_tile_thumbnails.sql` adds a transactional outbox: tile reservations, contract changes, deletions/expiry, validated uploads, draft deletion and publication invalidate the appropriate images. Neighbors within two hexes are included when public scenery changes. Owner images can include the latest validated private map; other viewers only receive public content. Authorized private image requests use a private cache and ETag.

The `threetopia-tile-thumbnails` Cloudflare Queue renders one job at a time with the `THUMBNAIL_BROWSER` Browser Run binding. Create this queue once with `corepack pnpm exec wrangler queues create threetopia-tile-thumbnails` before deploying to a new account. `deploy:creators` applies migrations and deploys the bindings. The minute cron recovers pending jobs and retries failures; the daily cleanup retains its existing schedule. Existing tiles are backfilled by the migration. Generation checks prevent an older render from replacing a newer snapshot, and the last successful image remains visible during updates or failures.

Tile-list and thumbnail-status requests also dispatch pending outbox entries asynchronously, so an interrupted write dispatch or a delayed cron rollout cannot leave a visitor waiting indefinitely. These requests return saved-image metadata immediately; only the queue consumer opens the renderer. Metadata marks photographs from an older renderer revision as pending so open cards pick up their replacement.

`build:creators` hashes the built map renderer and host assets into `src/creators/thumbnail-revision.ts`; a changed deployment automatically refreshes photographs. Rendering uses the existing map capture camera and restricts browser requests to the snapshot's models and our static assets. The browser receives no account credentials. Unit coverage is in `tests/unit/stored-thumbnails.test.ts`; a full capture requires the configured remote Browser Run binding.


Live at [threetopia.com](https://threetopia.com). Hosted on Cloudflare Workers,
with D1, Turnstile and Cloudflare Email Sending for the creator waitlist.

[`world.threetopia.com`](https://world.threetopia.com/) serves the compact map
with **Map preview only — The playable world is not available yet.** Use
`corepack pnpm deploy:world-map` to build and publish this separate, map-only
deployment. The playable world is not released. Continue development locally at
`/map/lite/` and `/world/`. `corepack pnpm deploy:world-wip` explicitly restores
the former static placeholder. See [map deployment](docs/map-island.md#publishing-the-map-preview).

A landing page for **Threetopia**, inviting Three.js creators to bring their
existing open-source projects together in one shared world. The introduction
focuses on meeting other creators and combining their work. A waitlist collects
email addresses with optional project links and X handles. A proposed hex
tile format gives scenes a footprint and six shared boundary profiles.

Below the hero, a small Three.js maquette shows how scenes connect. Seven hex
tiles form a landscape with trees, cottages, mountains, a river and a bridge.
Visitors can change the centre tile between a forest, village and garden; its
river and paths stay in place and meet the same six neighbours. The renderer
loads near the viewport, shares geometry through instancing, and refreshes
shadows only when the scene changes. Gentle water movement and pointer parallax
run at 30 fps while visible; reduced motion renders a still view. The original
SVG remains available without WebGL or JavaScript. A short optional explanation
covers shared borders and the planned CLI. The map illustrates the proposed
format; it does not validate scenes or represent a published world.

The local declaration checker is retained in `src/connections/hex.ts`, with its
unit tests, but is not imported into the landing page. See
[the hex world proposal](docs/hex-world-proposal.md) for the boundary and runtime
contracts, preview requirements and open decisions. Two contribution examples
show an individual feature (Little Birds) and a complete environment (Lagoon Tree
Village), using credited images linked to the original projects. The CLI example
describes the proposed tools; the FAQ and invitation state their development
status. Above the FAQ, “A proposal for creator earnings” suggests that creators
each contribute $10 per month to a shared pool. The illustrative month has 100
creators, a $1,000 pool, $800 for creators and $200 for infrastructure. The package
breakdown follows one Countryside world by Alex, built from Grass by Noor, Trees
by Tom, Sky by Sarah, Water by John and Horse by Kai. It assumes all 100 contributors
reuse that world. The world’s author and its five package makers share each $8
according to the proposed depth weights. The monthly pool adds the resulting
payouts: Alex $229, Noor $114, Tom $114, Sarah $114, John $115 and Kai $114. The
small difference between equally weighted contributors is explained as cent
rounding. A switch shows either one contribution or the entire example pool,
calculated with `src/economy/allocation.ts` and the fictional packages in
`src/economy/worldExample.ts`. Cent rounding happens per contribution before
aggregation. The static HTML retains the full example without JavaScript.
The contribution, infrastructure share, verification and weighting rules remain
proposals. No paid membership is available yet. The older calculator UI is still
retained in source; the proposal adds no payment functionality.

The fullscreen hero uses generated concept art (`public/world-creators.webp`):
fishing huts, lagoon treehouses, a neon district and a Japanese river village
connected by one river, with shorebirds and grassy banks. Six interactive credits
open accessible dialogs with the creators' profile photos, real demo previews,
X posts and project links. Dan Greenheck's dialog credits Tidewater as inspiration
for the coastline; Threejs-Punk also credits Sunag alongside Anderson Mancini.

The background is labelled as a concept world inspired by these creators, rather
than a running composition of their code. The dialog previews are selected frames
from the original videos or actual demo screenshots, not generated imagery. See
`public/creators/README.md` for sources and frame timestamps. On smaller screens
the credits appear in a compact list above the hero copy.
The generated background used the built-in image tool; its saved prompt is in
`.context/imagegen/creator-world-prompt.md`. The earlier `world-concept.webp` remains
available as a visual reference.
The central **Enter** link sits inside an upright Three.js light rift, based on
the selected third portal concept. White ribbons of varying thickness weave
around a tapered opening and cross beyond its tips, with soft local bloom and
4,200 fine, additive sparks (1,600 on mobile). The glow is calculated in the
surface shader, so it needs no extra postprocessing pass or backdrop filter.
The slow shared clock runs at 30% speed. Hovering or focusing **Enter** gently
enlarges the opening, moves the view closer and brightens the rim while drawing
nearby sparks inward. Pointer movement subtly tilts it. Reduced motion uses
light changes only, with no zoom or movement. The CSS fallback also responds
to hover and keyboard focus. Clicking opens `/world/` with a short passage animation.
The forest inside the opening is a generated concept texture, not a live world:
`public/portal/forest-path-v2.webp` (640×960, about 204 KB), matched more closely
to the reference's forest, soft daylight and hazy distance. The edge refraction, light
strands and particles are procedural shaders. See `public/portal/README.md` for
the source and generation prompt.
The small **Enter** lettering is rendered in the opening using a bundled-font
mask. It shares the portal's perspective; the HTML text provides the accessible
link name and the fallback.

The portal is a separate WebGL chunk, pauses beyond the visible canvas with a
96 px margin, and retains its last frame during scrolling. The static artwork,
canvas and navigation backdrop have separate layers; the navigation fades its
background without animating the blur. Reduced motion renders a still frame.
Without WebGL or JavaScript, a CSS oval with the same forest view and normal
link remains usable. If the view image fails to load, the WebGL rim and link
continue working with a clear opening.

The homepage loads its styles through `src/home.css` in the document head,
including during local development. This prevents unstyled HTML and an oversized
logo flashing when returning from `/world/`. Both HTML entry points include the
same two views. `src/page-views.ts` switches them within the existing document,
using a 380 ms opacity fade, `pushState` and browser history. The homepage keeps
its DOM, scroll position, controls and WebGL canvases underneath the fixed world
view. Once covered, it becomes inert and invisible, and its portal, maquette and
terminal animations pause. Returning repaints the existing portal before uncovering it;
reversing a fade cancels the old animation. Keyboard focus follows the active
view. Reduced motion switches immediately. Ordinary links still work without JS.
Enter adds a 220 ms approach inside the existing canvas, without enlarging its
bitmap. The portal first appears after its view, lettering and initial frame
are ready.

The destination is now a walkable composition of **Lagoon Tree Village, Sakura
River Valley, Tidewater and Threejs-Punk**. Four private workspace packages retain
the pinned source and original assets. One WebGPU r186 renderer, camera, ocean
and capsule controller connect four large Wang tiles: **Lagoon in the centre,
with Sakura, Tidewater and Punk around it**, one complete level per 693 × 800 m
tile. Everything outside the occupied tiles is ocean. Expansion fills the first
incomplete ring around the centre before starting the next ring. Matching Wang
profiles join three independent paths from Lagoon. WASD moves; **Destination**
chooses a guided walk, and **Map** shows the centre, neighbouring levels, ocean
expansion slots and optional tile boundaries. Visiting
`/world/` directly does not allocate the hidden homepage portal. Returning home
pauses the world and preserves the player position. See
[the integration notes](docs/connected-world.md) for sources, reconstruction,
adaptations, asset rights and verification.

The brand pairs a lowercase wordmark with three interlocking facets around a
shared opening. `public/brand-mark.svg` is the reusable vector symbol; the header
and world page share `src/brand.css`. The symbol inherits the surrounding
text color, and the standalone SVG favicon adapts to the browser's color scheme.

## Run it

Requires Node ≥ 22.13 and pnpm 10 (pinned via `packageManager`; use Corepack).

```sh
corepack pnpm install
corepack pnpm dev          # local D1 migration + Vite/Worker on :5190
corepack pnpm build        # typecheck + production build in dist/
corepack pnpm preview      # serve dist/ on :5191
corepack pnpm test         # unit tests (world, connections, allocation and waitlist)
corepack pnpm test:e2e     # Playwright: hero, credits, world, connections, CLI, mobile
```

The connected world requires WebGPU and JavaScript; unsupported devices get a
clear explanation and return link. The homepage does not require WebGPU.
The build emits both HTML entry points under `dist/client`, plus a Cloudflare
Worker under `dist/threetopia`. Static routes are served as assets; the Worker
handles the waitlist API and email confirmation. See [waitlist setup](docs/waitlist.md)
for the D1, Turnstile and Cloudflare Email Sending configuration. Locally,
signups use a mail preview without sending real email.

Conductor: `.conductor/settings.toml` defines the setup and **dev** run scripts.
They take effect once this branch is merged into `main`.

## What's where

| Path | Contents |
| --- | --- |
| `src/page-views.ts`, `page-views.css` | Persistent home/world views, cancellable fade, browser history, focus and animation lifecycle. |
| `src/sections/home-view.html`, `world-view.html` | Shared static view templates, included recursively in both HTML entry points. |
| `src/portal/PortalScene.ts`, `shaders.ts`, `labelTexture.ts`, `portal.css` | Three.js energy portal, integrated lettering, particle shaders, CSS fallback and passage transition. |
| `src/economy/` | Retained creator allocation prototype and unit tests; not used on the landing page. |
| `src/sections/calculator.ts`, `earn.*` | Retained calculator prototype; not mounted on the landing page. |
| `src/connections/hex.ts` | Retained six-edge declaration checker and sample neighbourhood, with unit tests; not mounted on the landing page. |
| `src/connections/check.ts` | Retained earlier inlet/outlet checker; no longer mounted on the landing page. |
| `src/connections/diorama/` | Procedural Three.js hex maquette, three centre scenes, lazy renderer and visibility lifecycle. |
| `docs/hex-world-proposal.md` | Proposed hex tile, boundary, runtime and validation contracts. |
| `src/sections/intro.html`, `connections.*`, `how.html`, `community.html`, `story.css` | Community invitation, scene picker, contribution examples, FAQ and contact link. |
| `src/sections/contributions.css` | Two ways to contribute, with responsive creator previews and a join link. |
| `src/sections/creators.*` | Community invitation above the FAQ and live count of email-confirmed waitlist signups. |
| `src/sections/package-tools.*`, `src/packages/`, `docs/package-tools.md` | Searchable explorer concept and connected Package X-ray with location-specific package layers and creator credits. |
| `src/sections/waitlist.*`, `src/server/`, `migrations/` | Signup form, Cloudflare API, confirmation/removal emails and D1 schema. |
| `wrangler.jsonc`, `docs/waitlist.md`, `scripts/export-waitlist.mjs` | Cloudflare configuration, deployment instructions and private confirmed-creator CSV export. |
| `src/sections/hex-map.html` | Static SVG map with three scene illustrations and fixed shared routes. |
| `src/sections/hero-credits.html`, `hero-credits.css`, `hero-credits.ts` | Creator markers anchored to the artwork, responsive credit list and accessible project dialogs. |
| `public/creators/` | Original creator avatars and selected demo frames, with source notes. |
| `world/index.html`, `src/explore/` | Connected world entry point, renderer, player, collision, terrain, source adapters, map and UI. |
| `packages/world-sources/`, `public/world-assets/`, `scripts/world/` | Four pinned source packages, derived runtime assets and reproducible capture/bake tools. |
| `docs/connected-world.md` | Source provenance, adaptations, controls and integration verification. |
| `src/sections/why.html`, `tech.html`, `tech.css` | Retained earlier content; no longer included on the landing page. |
| `src/sections/cli.html`, `cli.ts`, `cli.css` | The CLI section with an animated, looping terminal session (static under reduced motion). |
| `tests/e2e/` | Playwright checks, including world navigation/fallbacks and a complete physical walk through all four source regions. |

The homepage uses **r184** (`three@0.184.0`).
The connected world resolves its source packages to one **r186** instance
(`three-world`, an npm alias). Its renderer is loaded only when opening the world.

## Notes

- **Illustrative content:** the terminal session describes a proposed workflow.
  Contribution images show existing creator projects as inspiration. The hex map
  illustrates fixed shared edges and different interiors; it does not validate
  scenes or represent a published world.
- **Join the waitlist:** header and hero links lead to the signup form. Email is
  required; a project link and X handle are optional. Confirmation is required
  before a creator appears in the invitation export. The X contact link remains.
- Threetopia is a working name. It is not affiliated with the three.js project.


## Map captured from the walking world

The native 3D map prototype is at **`/map/lite/`**. It shows Lagoon, Tidewater,
Sakura and Punk as four compact creator slots in one continuous island, using
reduced original models, live Tidewater-based water, coastal nature and a floating
Punk platform. Sakura includes its riverboat, arched bridge and pagoda. Select a world to inspect its tile;
zoom is bounded between the whole composition and one tile. The separate Lagoon
study is at `/map/lagoon-lite/`. See [the island implementation](docs/map-island.md)
for water adaptations, native asset provenance and render budgets, and [the map package](packages/world-map/README.md)
for the slot contract, performance limits and reproducible asset builds. This
preview is separate from the captured map and walking-world integration below.

The Punk map district uses Chiro Visuals' actual procedural Chinese apartment
generator and `three-fenestra@0.3.0` for parallax interiors. Five buildings, shops
and balconies share a floating platform. Rebuild it with
`corepack pnpm map:build:punk` (Python Pillow is used to resize the room atlases).
Its pinned source and MIT license are in
[`packages/world-sources/procedural-buildings`](packages/world-sources/procedural-buildings/PROVENANCE.md).

`/map/` composes transparent renders of the actual shared world. Terrain, buildings, source trees and physical paths come from `loadSharedScene`; captured component passes share one camera and projection with tile outlines, landmarks and the player. No generated landscape images are used in the active map. The original source geometry, coast extensions and planting also exist in the walking view.

Run `MAP_CAPTURE_URL=http://127.0.0.1:55010 pnpm map:capture` with Vite running and Chrome installed. It uses Playwright and Python Pillow, writes per-tile WebP passes and capture metadata, and records a source revision. Regenerate after visual world changes. The capture entry is development-only and not in the production build. The current command supports the four integrated source adapters.

The public map loads only the captures and one WebGL scene. Its water and subtle component effects share the camera and clock. Zoom ranges from one full tile to all occupied tiles. M or clicking the minimap opens the large map. Effects approximate motion over captured pixels; it is not a live scene simulation.

Creators start with a real GLB and required version 3 scene map. `world.scene` must match `map.source`. The CLI validates source agreement, geometry, placement and file budgets, and builds a portable preview. Explicit `--format image` imports remain supported for captured layers. See `/docs/#image-layers` and `packages/world-map/README.md`.

Run `pnpm test` for unit/CLI checks and `pnpm test:e2e tests/e2e/image-map.spec.ts` for composition, alignment and zoom checks. On macOS, `THREETOPIA_GPU_TESTS=1 pnpm test:e2e tests/e2e/world.spec.ts` uses installed Chrome with WebGPU for walking tests.
