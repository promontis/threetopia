# Procedural Buildings

Author: Mohamed Achref Elouafi / Chiro Visuals.

Source: https://github.com/achrefelouafi/ProceduralBuildingsThreeJS

Revision: `6c19f1b1f14408353989ad26cda27f1e1ede5e91` (MIT; see LICENSE).

The four TypeScript files in `src/` and three files in `assets/cn/` are
unmodified upstream files. They evaluate the actual Blender geometry-node
graph and its module kit. Threetopia runs them **at build time**, not in the map.
The upstream app, weather, shader compiler and high-resolution textures are
not bundled. No upstream texture set is required by this adaptation.

`scripts/atlas/build-punk-city.mjs` defines our five-building district, removes
interiors hidden behind opaque interior-mapped windows, and reduces both LODs
within the existing map component limits. The generated asset manifest records
the parameters, hashes, sources and measured budgets.

Windows use `three-fenestra@0.3.0` by Edgar Pérez, from
https://github.com/codedgar/three-fenestra (MIT). Its public `glslCore` runs on
merged window geometry with the original room and curtain atlases resized to
512 and 256 pixels. See `src/tiles/lite/punk-materials.ts`.

Rebuild: `corepack pnpm map:build:punk`. This modifies the Punk **map** component;
the original walking-world Threejs-Punk source package remains separate.
