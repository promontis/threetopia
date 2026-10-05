export const agentGuide = `# Creating reusable Threetopia packages

Read https://docs.threetopia.com/conversion.md and the current llms.txt.
For an existing scene, run threetopia analyze PATH --json before editing.
Search the real published asset catalog. Never invent existing package names.
Convert the entire requested scene. Inventory all visuals, shaders, simulation,
physics, interaction, animation, audio, controls and assets. Do not replace a
complete conversion with a representative subset or a static approximation.
Every source feature needs a package/host mapping and acceptance evidence.
Plan one world-tile composition, a separate reusable map-tile package with map
and overview exports, and cohesive component packages underneath both. Compositions
must import these packages; bundling the original app alone is not extraction.
Declare exact registry dependencies and prove the installed graph resolves without
the original source tree. Put resources and attribution with their owning package.
Propose cohesive reusable components, their APIs, source files, dependencies,
attribution, and any visible changes or unsupported runtime features.
Ask the creator before rewriting source unless that extraction is already authorized.
One approval covers the agreed extraction; do not ask again for each file.
Keep the original scene consuming the extracted components, and demonstrate
them in a second independent scene. Do not split every mesh into a package.
Use explicit options, independent instances and idempotent dispose(). The host
owns the renderer, camera and frame loop for object components. A complete
iframe-scene-v1 runtime retains its own renderer and lifecycle in an isolated
document. Read https://docs.threetopia.com/scenes.md. Document update(timeInSeconds)
for animated object components.
Preserve the source author namespace when requested. Package scope and managing
account can differ only with an explicit operator grant (threetopia namespaces).
Include a license, source provenance, declared peers and named exports. Every
package needs its own README with real import/constructor/update/cleanup examples,
explicit prerequisites and dependency relationships. Show composition code in
world-tile and map-tile READMEs. Include a working preview with relevant settings;
label contextual previews clearly and do not call them independent components.
Run threetopia check --json, lifecycle tests, visual comparison and budget checks.
Check verifies files, geometry and static code; it never executes uploaded code
and does not prove visual quality or behavioral correctness.
World publication requires a reserved immutable tile and static world/map/overview
GLBs for the shared map. Add a complete scene runtime for the playable experience;
map simplification does not permit omitting features from that runtime.
Push creates a private preview. Publish only when the creator requests release.
`;
