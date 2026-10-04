# Build a piece of Threetopia

Create reusable assets. Give your world a place in the shared map. Build with other creators’ packages.

Threetopia has two package types: **asset packages** contain reusable models, textures, materials or code. **World packages** fill the protected content slot of a Threetopia tile. Every world package must contain a world GLB, a lightweight map GLB and an overview GLB.

The public site at [world.threetopia.com](https://world.threetopia.com) is a **map preview**. A shared playable world is not released yet. Publishing a world package places its map content on the shared map; it does not make it a playable online world.

## Start with your place

1. [Sign in to your creator account](https://creators.threetopia.com).
2. Choose your permanent creator handle.
3. [Choose a tile](https://creators.threetopia.com/tiles), explore its terrain variations, and reserve it.
4. Create a world package for that reservation.
5. Clone it with the CLI, replace the starter content, preview and validate.
6. Push a private version. Publish it when ready.

For reusable assets, start with **New asset**. You do not need a tile.

[Follow the quickstart →](/quickstart)

## Build together

[Explore reusable packages](https://creators.threetopia.com/packages) or query the [public package catalog](https://creators.threetopia.com/api/packages?kind=asset). The CLI downloads exact versions, checks every file’s SHA-256, resolves dependencies, and records the installation under your public creator handle.

```sh
threetopia search beacon
threetopia install @threetopia/beacon@1.0.0
```

## For AI coding agents

Start with [llms.txt](/llms.txt). Read [the world package contract](/world-packages.md), [validation rules](/validation.md) and [reusable packages](/packages.md) before generating content. Choose a tile before creating a world package. Do not alter the host geometry or invent package names.
