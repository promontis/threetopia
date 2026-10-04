# Portal forest view

`forest-path-v2.webp` is generated concept art used inside the light-rift portal.
It is a static view, not a render or preview of a released world.

- Tool: built-in image generator.
- Reference: the user's portal close-up, `.context/attachments/6DZutq/image.png`.
- Generated source: `exec-50b739e3-cae4-45cb-a889-ae1e4f765807.png`.
- Optimized with cwebp at quality 87, 640 × 960 pixels (about 204 KB).
- Full prompt: [forest-path-v2-prompt.md](forest-path-v2-prompt.md).
- White ribbons, bloom, particles, lettering and edge distortion are rendered
  separately by Three.js in `src/portal/`. The opening and particle positions
  share one contour. The glow uses analytic falloff in the surface shader;
  additive sparks accumulate light without requiring a full-canvas blur.

## Previous texture

`forest-path.webp` is retained as the earlier version. It was generated from
`.context/portal-concepts/03-lichtscheur.png` as
`exec-fb480ca0-2ae1-4010-857f-21d24e625baf.png` and optimized at quality 86.

### Earlier generation prompt

Use case: precise-object-edit.
Asset type: destination image texture for the interior of a Three.js portal.
Input image: the selected vertical white portal design. Use ONLY the scenery visible inside the portal as the reference.
Create a clean portrait 2:3 image of that wooded footpath leading toward a turquoise river and distant soft rocky hills. We are looking directly along the path at walking height. A tree trunk frames the left edge, a leafy branch at top, sunlit mossy stones and grasses at the bottom, warm dappled daylight, pale blue distance. Keep the same inviting colors and simple stylized 3D/game-world fidelity as the reference. Match a beautifully crafted real-time Three.js environment, not a photorealistic painting.
The composition should fit inside a tall oval later: keep the path and distant destination in the center 55 percent and leave visual breathing room around all edges.
Important: output ONLY the forest path scenery, filling the whole rectangular image. Remove the portal rim, white glow, sparkles, the ENTER word, all website UI, all creator cards, the background outside the portal, and any borders. No people, no text, no symbols. The light effects will be built separately in code.
