# Living diorama image generation

Generated with the built-in image_gen tool. Each world is a separate transparent landscape; moving objects are separate child sprites. The full-island attempt was discarded after the user's modular-composition clarification and is not used in the application.

## Tile prompts

### lagoon

Use case: stylized-concept. Asset type: ONE reusable modular map-tile sprite, actual transparent RGBA PNG, square image. Image 1 is the approved visual art direction reference ONLY. This is ONE TILE, not the whole island. Premium living-diorama miniature, lush detailed vegetation, lovely realistic tiny architecture, crisp warm upper-left sunlight. Orthographic bird's-eye camera at 55 degree downward elevation, north at top, no horizon; consistent scale and camera across tiles.
Composition: full miniature environment with roughly hexagonal horizontal ground footprint and organic coast. Ground occupies middle-to-bottom 80 percent, tall objects can rise toward top. Preserve a generous 6 percent TRANSPARENT margin, no cropping. The south ground vertex is near 88 percent image height; ground centre about 58 percent. Connected edges must be gently rolling land with a wide neutral green/sandy path strip; remaining sides have irregular rocks and very narrow turquoise shallows fading quickly to TRANSPARENT. No raised board-game plinth, no vertical hex platform, no drawn hex outline. Terrain can blend into neighbouring tiles at the named connecting sides. Fully detailed complete world, NOT a single landmark.
STRICT: no words, labels, UI, branding, borders. No clouds, birds, airships, sailboats, floating boats, petals or other moving objects, because each will be a separate sprite inside its tile. ALL outside background must be genuinely transparent, not black, white, grey or checkerboard. No ocean rectangle.
Central LAGOON TREE VILLAGE only. Many enormous lush broad-canopy trees containing warm woven timber treehouses, spiralling stairs, rope canopy bridges across a winding turquoise lagoon; palms and ferns, sandy paths and smooth grey rocks. Rich tiny architectural detail. Island land connects to neighbouring tile at EAST / right edge, NORTHWEST / upper-left edge, SOUTHWEST / lower-left edge: extend low neutral green ground and sandy paths to these edges, without cliffs or open water blocking the joins. Outer north-east, south-east and west recesses can be coastal. No city, no pink temple, no harbour.

### sakura

Use case: stylized-concept. Asset type: ONE reusable modular map-tile sprite, actual transparent RGBA PNG, square image. Image 1 is the approved visual art direction reference ONLY. This is ONE TILE, not the whole island. Premium living-diorama miniature, lush detailed vegetation, lovely realistic tiny architecture, crisp warm upper-left sunlight. Orthographic bird's-eye camera at 55 degree downward elevation, north at top, no horizon; consistent scale and camera across tiles.
Composition: full miniature environment with roughly hexagonal horizontal ground footprint and organic coast. Ground occupies middle-to-bottom 80 percent, tall objects can rise toward top. Preserve a generous 6 percent TRANSPARENT margin, no cropping. The south ground vertex is near 88 percent image height; ground centre about 58 percent. Connected edges must be gently rolling land with a wide neutral green/sandy path strip; remaining sides have irregular rocks and very narrow turquoise shallows fading quickly to TRANSPARENT. No raised board-game plinth, no vertical hex platform, no drawn hex outline. Terrain can blend into neighbouring tiles at the named connecting sides. Fully detailed complete world, NOT a single landmark.
STRICT: no words, labels, UI, branding, borders. No clouds, birds, airships, sailboats, floating boats, petals or other moving objects, because each will be a separate sprite inside its tile. ALL outside background must be genuinely transparent, not black, white, grey or checkerboard. No ocean rectangle.
SAKURA RIVER VALLEY only. Cherry blossoms around a Japanese temple and a beautiful red arched bridge crossing a turquoise river, waterfalls, layered mountains with the highest snowy peak in the northern background. Beautiful winding sandy pathways amid pink trees and lush grass. WEST / left edge connects to central Lagoon: low neutral green terrain and sandy path reaching left, no cliff or open ocean blocking the connection. Other sides organic rock shoreline. NO giant treehouses, no city, no fishing village.

### tidewater

Use case: stylized-concept. Asset type: ONE reusable modular map-tile sprite, actual transparent RGBA PNG, square image. Image 1 is the approved visual art direction reference ONLY. This is ONE TILE, not the whole island. Premium living-diorama miniature, lush detailed vegetation, lovely realistic tiny architecture, crisp warm upper-left sunlight. Orthographic bird's-eye camera at 55 degree downward elevation, north at top, no horizon; consistent scale and camera across tiles.
Composition: full miniature environment with roughly hexagonal horizontal ground footprint and organic coast. Ground occupies middle-to-bottom 80 percent, tall objects can rise toward top. Preserve a generous 6 percent TRANSPARENT margin, no cropping. The south ground vertex is near 88 percent image height; ground centre about 58 percent. Connected edges must be gently rolling land with a wide neutral green/sandy path strip; remaining sides have irregular rocks and very narrow turquoise shallows fading quickly to TRANSPARENT. No raised board-game plinth, no vertical hex platform, no drawn hex outline. Terrain can blend into neighbouring tiles at the named connecting sides. Fully detailed complete world, NOT a single landmark.
STRICT: no words, labels, UI, branding, borders. No clouds, birds, airships, sailboats, floating boats, petals or other moving objects, because each will be a separate sprite inside its tile. ALL outside background must be genuinely transparent, not black, white, grey or checkerboard. No ocean rectangle.
TIDEWATER FISHING VILLAGE only. Beautiful dense little cream-plaster and terracotta-roof fishing village, docks, a cream lighthouse, wooden piers surrounding a small turquoise harbour opening SOUTH / bottom. Dense palms and coastal greenery behind village, rocks and trails. NORTH-EAST / upper-right edge connects to central Lagoon: low neutral grassy ground and sandy path reaching that edge, no cliff or open ocean blocking join. No boats whatsoever, boats will be separate moving layers. No city, no mountain temple, no giant treehouses.

### punk

Use case: stylized-concept. Asset type: ONE reusable modular map-tile sprite, actual transparent RGBA PNG, square image. Image 1 is the approved visual art direction reference ONLY. This is ONE TILE, not the whole island. Premium living-diorama miniature, lush detailed vegetation, lovely realistic tiny architecture, crisp warm upper-left sunlight. Orthographic bird's-eye camera at 55 degree downward elevation, north at top, no horizon; consistent scale and camera across tiles.
Composition: full miniature environment with roughly hexagonal horizontal ground footprint and organic coast. Ground occupies middle-to-bottom 80 percent, tall objects can rise toward top. Preserve a generous 6 percent TRANSPARENT margin, no cropping. The south ground vertex is near 88 percent image height; ground centre about 58 percent. Connected edges must be gently rolling land with a wide neutral green/sandy path strip; remaining sides have irregular rocks and very narrow turquoise shallows fading quickly to TRANSPARENT. No raised board-game plinth, no vertical hex platform, no drawn hex outline. Terrain can blend into neighbouring tiles at the named connecting sides. Fully detailed complete world, NOT a single landmark.
STRICT: no words, labels, UI, branding, borders. No clouds, birds, airships, sailboats, floating boats, petals or other moving objects, because each will be a separate sprite inside its tile. ALL outside background must be genuinely transparent, not black, white, grey or checkerboard. No ocean rectangle.
PUNK CITY only. Compact detailed coastal city of dark stone, warm brass and copper towers, tiny magenta and cyan neon signs WITHOUT any readable words, intricate buildings, rooftop greenery and beautiful miniature streets. Two recognisable slim taller towers in the northern half. Tropical coastal stone and trees soften the city outskirts. SOUTH-EAST / lower-right edge connects to Lagoon: flat low neutral green ground and a warm sandy path extending to that edge, no cliff or water gap. Remaining edges coastal. No airship: it will be a separate moving component. No treehouses, no temple, no fishing village.

## Component prompts

### ocean

Use case: stylized-concept. Asset type: seamless repeatable square ocean texture image for the backdrop of a 2D interactive map. Image 1 is reference for the ocean material, colour and miniature-diorama art style ONLY. Produce only open deep teal ocean from a high oblique bird's-eye view, tiny fine irregular wave ridges and calm gentle highlights, light from upper left. Rich blue-teal colour matching the reference, moderate subtle tonal variation, no strong lighting gradient. Seamless edges for tiling; uniform scale. No island, no land, no rocks, no boats, no coast, no clouds, no objects, no text, no UI, no border, no horizon. Opaque image. Fine rippling ocean, not a flat colour. 1024 by 1024.

### airship

Use case: stylized-concept. Asset type: single isolated airship sprite on genuine transparent RGBA background for a living-diorama map. Image 1 is the style and perspective reference. Create ONLY the small beautiful dark burgundy/copper whimsical airship seen above the Punk district in the reference, with warm brass details, tiny gondola and propellers, magenta illuminated cat emblem without text. Isometric three-quarter aerial view, bow pointing left with a little forward-facing depth, same high bird's-eye angle as reference. Warm sunlight from upper left, finely detailed miniature model. Entire airship centered with 15% transparent margin. No other objects, NO background, no sky, no water, no land, no ground plane, no shadow rectangle, no text. Actual alpha transparency.

### sailboat

Use case: stylized-concept. Asset type: single isolated tiny sailboat sprite on genuine transparent RGBA background. Image 1 is the style/perspective reference. Create ONLY one charming detailed wooden coastal sailboat with a warm ivory triangular sail, dark brown and gold hull, from a high three-quarter aerial angle matching the reference. Point the bow diagonally toward lower right. Warm afternoon light from upper left, premium carefully crafted living-diorama miniature, realistic materials. Entire boat fits with 20% transparent margin. Tiny translucent turquoise foam wake directly adjacent to hull only. No ocean rectangle, no background, no land, no other objects, no text, no UI. Genuine alpha transparency.

### cloud

Use case: stylized-concept. Asset type: one isolated foreground cloud image layer on genuine transparent RGBA background. Image 1 is the style and warm lighting reference. Create a soft, wispy, broad bank of small warm ivory maritime clouds seen from above, as in the bottom left of the reference. Wispy semi-transparent perimeter, naturally uneven silhouette, subtly warm sunlit tops, faint blue-grey self-shadow within cloud. Cloud occupies middle 75% with ample transparent margins, landscape 3:2. This image will drift slowly over a detailed miniature island map. No scene, no land, no ocean, no sky background, no cast shadow below, no text. Actual smooth alpha transparency.

### petals

Use case: stylized-concept. Asset type: one isolated cluster of cherry blossom petals, a small transparent sprite for an interactive living-diorama map. Image 1 is the lighting/style reference. Show exactly five delicate pale rose and warm pink sakura petals with beautiful subtle folds, separated by empty space, some tilted in the breeze, forming a loose diagonal drift. Warm upper-left sunlight. Tiny realistic miniature petals, no blossom branches or trees. Entire cluster centered in a square with ample empty margin. GENUINE transparent RGBA background. No glow rectangle, no background, no water, no other objects, no text.


## Wind sprites — 28 September 2026

Built-in `image_gen` was used, with the existing generated tile as an edit/style
reference. Both outputs have genuine alpha; only resizing/format conversion was
used to create the runtime WebP. The original PNGs remain in `.context/map-originals/`.

- `public/map/assets/sakura-tree.webp` — 384 × 384, independent blossom tree.
- `public/map/assets/lagoon-tree.webp` — 384 × 384, independent green tree.

Sakura prompt (reference: `public/map/assets/sakura.webp`):

> Use case: background-extraction. Asset type: transparent game-map sprite. Input image 1 is the source map and style reference. Extract and recreate ONLY ONE mature pink cherry blossom tree like the tree on the left of the red bridge. The tree is seen from the same elevated isometric camera as the map. A broad irregular pink flower canopy, warm brown trunk, delicate branching, finely detailed painted 3D diorama style, sunlight from upper left. Full tree centered, roots at the bottom, no ground patch, no rocks, no temple, no water, no other trees, no labels, no cast shadow, no UI. It will be a separate swaying tree layer over the existing map. Actual transparent background with clean soft leaf edges, generous empty padding around the complete silhouette. Match the original illustration closely. Output square.

Lagoon prompt (reference: `public/map/assets/lagoon.webp`):

> Use case: background-extraction. Asset type: separate transparent game map tree sprite. Input image 1 is style and perspective reference. Isolate and recreate a SINGLE tropical broadleaf tree like the leafy trees of Lagoon: a wide richly detailed green canopy with irregular dense sunlit yellow-green leaf clusters and darker teal-green shadows, short visible warm-brown branching trunk and subtle roots. Full tree alone seen from elevated isometric map camera, same detailed miniature diorama illustration style as the reference. No treehouse, platforms, bridges, buildings, ground patch, rocks, water, cast shadow, labels or UI. Entire silhouette centered with generous transparent padding. Real transparent background with clean soft leaf edges. This separate tree sprite will sway from its base in a composite world map. Output square.

Water and clouds now use procedural Three.js shaders. The old cloud bitmap is
retained as an unused source asset; no active tile manifest references it.
Existing canopy, waterfall and neon regions reuse each tile's source texture,
with an independently positioned and controllable effect layer per region.
