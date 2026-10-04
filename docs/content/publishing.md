# Versions, states and changelogs

Each package has a stable owner, name and kind. World packages also have a stable tile binding. Each uploaded version has its own manifest, changelog, file hashes and validation report.

| State | Meaning | Visibility |
| --- | --- | --- |
| Draft package | Package exists without uploaded content | Owner |
| Uploading | Manifest accepted; files are being uploaded | Owner |
| Rejected | Server validation failed | Owner |
| Ready | Geometry and files validated successfully | Owner preview |
| Published | Released explicitly by the owner | Public |

## Push, review, publish

Edit `manifest.version` and `manifest.changelog` in `threetopia.json`. Versions use `major.minor.patch`, for example `1.2.0`; prerelease tags and version ranges are not accepted yet. Changelogs are required, plain text and at most 8,000 characters.

```sh
threetopia check
threetopia push
```

Open the private preview from the returned link. Then publish from the package’s version card or your terminal:

```sh
threetopia publish
```

Publishing a world package makes its tile occupied and its map content available to the shared map. The package remains tied to the selected host tile. The public site is still a map preview, not a playable world release.

## Updating a package

Published files are immutable. Increase the version and write a new changelog before pushing. Existing installations remain pinned until their creators explicitly update.

After a world upload passes server validation, Threetopia saves an updated **My tiles** photograph using its map and overview models. This private image is visible only to the tile owner. Publishing also refreshes the public image and affected neighboring tile photographs. Image generation runs in the background, so the previous saved image remains available during the update. The CLI and website use the same update workflow; no separate screenshot upload is needed.

Unpublished versions can be deleted from their package page and uploaded again. An interrupted upload appears as **uploading**; remove that draft from its package page and push again. Published packages and versions cannot be deleted because existing installations must remain reproducible.

**My packages** lists every package you own. Open a package to see its exact versions, states, changelogs, geometry reports and active installing creators. Public catalog pages expose published versions only.
