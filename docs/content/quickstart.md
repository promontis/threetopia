# Your first package

You need Node.js **22.13 or later**, a browser, and an email address you can access.

## Install and sign in

```sh
npm install -g https://docs.threetopia.com/downloads/threetopia-cli-0.7.2.tgz
threetopia login
```

The CLI opens a browser. Sign in with your email code, choose your creator handle, and approve the code shown in your terminal. It does not ask for your password. Only approve a login you initiated.

The CLI is distributed as a versioned tarball from this documentation site. It is not yet published in the npm registry. Do not use `npx @threetopia/cli` without checking npm availability.

## Choose a tile first

Open [Explore tiles](https://creators.threetopia.com/tiles). Select an available position surrounding the existing worlds, switch terrain families and variants, and reserve the tile. Click **Create a world package**, give it a title and name, then copy the clone command from its page.

```sh
threetopia clone @your-handle/coral-garden
cd coral-garden
threetopia preview
```

The preview opens at `http://127.0.0.1:5195/`. Switch between World, Map and Overview. Refresh after editing.

You can also reserve from the CLI:

```sh
threetopia tiles
threetopia reserve -1,0 --variant oasis-03
threetopia create coral-garden --kind world --tile RESERVATION_ID
```

Use the actual available coordinate and returned reservation ID. The example coordinate may already be occupied.

## Fill your slot

The starter contains `content/world.glb`, `content/map.glb`, `content/overview.glb`, `tile.lock.json`, and `threetopia.json`.

Replace the GLBs with your work. Use metres for world content and map units for map content. The scale is **0.03**: one map unit represents 33⅓ world metres. The simplified map asset should be one recognisable component from your world, such as a treehouse, temple or boat.

Keep the host tile fixed. Model your content above local y=0, centred within the protected slot. The host adds its own terrain and positions your content at the slot’s floor.

```sh
threetopia check
threetopia push
```

Push uploads and validates a **private version**. Open its preview from **My packages**. When ready:

```sh
threetopia publish
```

## Make a reusable asset instead

```sh
threetopia create coastal-rocks --kind asset
cd coastal-rocks
threetopia preview
```

Replace the starter model, declare exported files in `threetopia.json`, and update the license and changelog. Asset packages do not reserve tiles.
