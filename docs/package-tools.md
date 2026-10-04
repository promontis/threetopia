# Package explorer and Package X-ray

The landing page includes two connected, interactive concept previews before the
CLI section. They share the example catalogue in `src/packages/catalog.ts`.
The registry and the live world remain in development; `/world/` stays unchanged.

The explorer supports name, creator and category search, component/scene filters,
package details, original project links and a jump to a relevant X-ray location.
Existing project previews retain their creator credits. Example listings imply
neither participation in Threetopia nor a particular package licence.

X-ray has four example locations with positions, tile coordinates and different
package compositions. The SVG maquette separates each package into its own layer.
Hover, keyboard focus or selection highlights the corresponding layer. The
X-ray switch recombines the same geometry, and the selected package opens back in
the explorer. These are illustrative combinations, not reverse-engineered
dependency lists from the original demos.

## Connecting the real world later

The production inspector needs a world position **and camera view**, since two
people at the same location can see different things. Rendered objects need
versioned package ownership linked to the registry and creator records. This must
include objects in neighbouring tiles and shared scenery such as sky and water.

Resolve the visible objects at the current view, group them by package, and keep
their instance IDs for highlighting. Loaded-but-hidden packages and transitive
dependencies should be distinguishable from packages actually visible on screen.
The example catalogue and fixed location lists currently stand in for that data;
they should be replaced by the runtime's visibility and ownership information.

No new renderer, external service, tracking or backend endpoint is needed for
these previews. The SVG uses local symbols, honours reduced motion and has an
accessible description alongside the keyboard-operable inspector.
