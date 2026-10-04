# Reusable packages

An **asset package** is a versioned collection of reusable files with named exports. It can include GLB models, textures, material definitions or JavaScript. A **world package** fills an immutable host tile and must include world, map and overview content.

Find real packages in the [creator catalog](https://creators.threetopia.com/packages), with the CLI, or through the [public asset API](https://creators.threetopia.com/api/packages?kind=asset).

```sh
threetopia search beacon
threetopia install @threetopia/beacon@1.0.0
```

`@threetopia/beacon` is an original, MIT-licensed Threetopia example. Its `model` export fits a map slot; its `world` export is scaled for world coordinates. It is an example building block, not an asset copied from a showcase creator.

## Find a package

The [package library](https://creators.threetopia.com/packages) searches package names, titles, descriptions, creator names and tags. Multiple words narrow the results; partial words match the start of a word, so `light` finds `lighthouse`.

Combine package type, category, creator, license and tag filters. Multiple choices in one filter match **any** of those choices; different filters must **all** match. Counts show how many packages each choice would match with the other filters applied. Sort by best match, last published update, first publication, active installing creators or title.

Searches and filters are kept in the URL. Share a search, reload it, or return to it from a package. The API is paginated: read `total`, `page`, `perPage` and `pages` instead of assuming the first page is the whole library. See the [catalog API](/api) for parameters and examples. Only published, non-archived packages appear; a private upload does not change search results.

## Make your package discoverable

Choose a **category** and up to **10 tags** when creating a package. For an existing package, open **My packages → your package → Discoverability**. Tags can describe content, style or use, such as `coastal`, `low poly` or `rocks`. Use short, specific terms, not a list of unrelated keywords.

Available categories: Nature & vegetation, Architecture, Props & objects, Characters & wildlife, Vehicles, Materials & textures, Lighting & effects, Audio, Tools & utilities, and Environments. Packages without a category appear under Uncategorized.

Categories and tags belong to the registry listing, separate from the immutable version manifest. Save them on the package page in Threetopia Creators or use authenticated `PATCH /api/packages/:id` with `{ "category": "nature", "tags": ["coastal", "rocks"] }`. Each tag allows 1–30 letters, numbers, spaces or hyphens; tags are normalized to lowercase and duplicates are removed. Changes become searchable immediately for published packages. Draft packages stay private.

The searchable title, description and license come from the latest published release. Update those fields in your local manifest and publish a new version. Existing CLI versions automatically use the improved search; listing metadata does not require a CLI upgrade.

## Asset manifest

```json
{
  "schemaVersion": 1,
  "name": "@your-handle/coastal-rocks",
  "version": "1.0.0",
  "kind": "asset",
  "title": "Coastal rocks",
  "description": "Low-poly rocks for coastal worlds.",
  "license": "MIT",
  "changelog": "First release of the rock collection.",
  "exports": { "model": "assets/rocks.glb" },
  "dependencies": {}
}
```

Put this object in `threetopia.json` under `manifest`, and list every file under the project’s top-level `files`. The CLI scaffold includes the server-assigned package and project IDs.

## Installation

Run installation inside a Threetopia project. World packages can also be installed for inspection, but only asset packages can be declared as reusable dependencies. The CLI:

1. Resolves exact published versions and transitive dependencies.
2. Downloads to a staging folder and verifies every file’s size and SHA-256.
3. Writes files under `threetopia_modules/creator/package/`.
4. Saves `threetopia-lock.json` and exact direct dependencies in your project manifest.
5. Records the successful installation in the registry.

Commit your lockfile. Package versions are immutable. Installing a newer version is explicit; existing projects do not silently update.

The package creator sees your public handle, the installed version and the number of project installations. A project uses a random ID; private project names and source code are not sent. Downloading files directly from the API does not count as a CLI installation.

```sh
threetopia uninstall @threetopia/beacon
```

Uninstall removes the dependency, local package directory and active installation record. It does not delete assets you already copied into your world. Transitive dependencies can be removed once nothing else depends on them.

## Use an installed model

```sh
threetopia use @threetopia/beacon --export model --as map
threetopia use @threetopia/beacon --export model --as overview
threetopia use @threetopia/beacon --export world --as world
threetopia check
```

`use` checks the actual geometry against the selected role before copying it into your world’s content file. For a larger composition, import installed GLBs in your modelling or build tools, then export the combined scene. Its combined geometry must fit the slot and budget.

For code exports, import the installed file in your own application or bundler. Installation does not execute package scripts, and uploaded JavaScript never runs automatically on the creator website.
