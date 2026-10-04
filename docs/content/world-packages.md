# World package contract

A world package needs a reserved tile and **three self-contained GLBs**:

- **World content:** your detailed scene, in metres, fitting the locked build areas relative to the tile’s content origin.
- **Map content:** one recognisable simplified component or composition that represents your world.
- **Overview content:** a cheaper version used when viewing many tiles together.

World and map content may share source assets, but their exported size, geometry and budgets differ. Do not substitute an AI illustration for required 3D map content. Do not include the Threetopia terrain shell, ocean, sky, camera, lights or renderer in your content.

## Project manifest

Use CLI 0.5.0 or later for Wang tiles. Export instructions and the content origin are described in [tiles](/tiles).

The CLI creates `threetopia.json` after authenticating and checking your tile reservation. The important fields are:

```json
{
  "registry": "https://creators.threetopia.com",
  "packageId": "SERVER_ASSIGNED_ID",
  "projectId": "PROJECT_UUID",
  "manifest": {
    "schemaVersion": 1,
    "name": "@your-handle/coral-garden",
    "version": "0.1.0",
    "kind": "world",
    "title": "Coral garden",
    "description": "Treehouses around a sheltered lagoon.",
    "license": "MIT",
    "changelog": "Initial world and simplified map component.",
    "dependencies": {},
    "content": {
      "world": "content/world.glb",
      "map": "content/map.glb",
      "overview": "content/overview.glb"
    }
  },
  "files": ["content/world.glb", "content/map.glb", "content/overview.glb"]
}
```

The actual scaffold also contains the complete canonical `manifest.tile`. The CLI reads the authoritative local copy from `tile.lock.json` when checking or pushing, and the server compares it with your reservation. Do not invent IDs or generate tile contracts independently when creating a project.

Every distributed file must appear in the top-level `files` list. The CLI computes sizes and SHA-256 hashes for the upload manifest. External texture URLs and separate glTF buffers are not allowed.

## Export requirements

Use glTF 2.0 binary `.glb`, one scene, Y up, embedded PNG/JPEG textures, standard metallic/roughness materials or unlit materials. Apply transforms or export them as ordinary scene nodes. Opaque and alpha-mask materials are supported.

The first package format accepts **static exported geometry**. Skins, animations, morph targets, GPU instancing, Draco, meshopt compression, KTX2/Basis textures and custom shader extensions are rejected. Existing hand-integrated showcase worlds have their own animation adapters; that does not mean arbitrary package runtime code is executed in the shared map.

Reusable JavaScript can be distributed in asset packages and imported by developers in their own projects. The creator preview never executes uploaded package code. See [packages](/packages) and [validation](/validation).
