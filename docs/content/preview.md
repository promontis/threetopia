# Preview before publishing

## Local preview

```sh
threetopia preview
threetopia preview ./coral-garden --port 5196
```

The local server binds to `127.0.0.1`. It serves only declared package files and the bundled preview runtime. Switch between World, Map and Overview; drag to orbit and scroll to zoom. Refresh after replacing your models. Validation runs before the server starts and when it loads your content.

The world preview scales the full-size scene down by 0.03 to show it inside the same tile geometry used for the map. The map preview uses your exported map units directly. The white ring marks the protected content slot; it is absent from the public map.

The host controls the ocean, terrain, camera and light. Preview water is deliberately simpler than the shared map’s animated ocean; the content and host tile geometry are the same.

## Private online preview

```sh
threetopia push
```

Push stages the files and asks the server to validate them independently. A passing version becomes **ready** and gets an owner-only preview at the creator website. It does not appear in the public catalog or shared map until published.

Private preview links require the owner’s account. They are not anonymous sharing links. The package page lets you switch representations, inspect geometry counts and see validation errors.

## Portable preview

```sh
threetopia build
```

This creates `dist-threetopia/` with the models, manifest, validation report and bundled Three.js viewer. Serve that directory over HTTP with any static server. This is a local build, not an automatic upload or public release.
