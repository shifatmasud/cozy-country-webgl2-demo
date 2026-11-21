# Little Meadow — Cozy Country web demo

A small, original, interactive countryside diorama built with React, React Three Fiber, Three.js and a custom GLSL water shader. Three.js renders with WebGL2. Orbit the island, zoom in, and switch from morning to dusk.

**This is an unofficial fan-style visual demo, not affiliated with Cozy Country or Protopop Games.** It contains no Cozy Country APK, extracted game models, textures, shaders, or other game files. The cottage, trees, flowers, terrain, animals and water are original procedural geometry/materials made for this project.

## Run locally

```bash
pnpm install
pnpm dev
```

Build locally with `pnpm build`. The `main` branch is configured to build and deploy `dist/` with GitHub Actions. The live URL will be `https://shifatmasud.github.io/cozy-country-webgl2-demo/` after the first successful Pages deployment.

## Controls

- Drag to orbit the island.
- Scroll or pinch to zoom.
- Use **Stay for dusk** to change the light and water color.

## Credits

All demo code and procedural visuals in this repository are original. Cozy Country is referenced only to explain the visual inspiration; its name and any related marks belong to their respective owner.
