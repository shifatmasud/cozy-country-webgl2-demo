# Little Meadow — Cozy Country-inspired WebGL2 demo

A small, original countryside diorama built with React, React Three Fiber and Three.js. It renders as an interactive WebGL2 scene: orbit the island, zoom in, and switch the light and animated GLSL water from morning to dusk.

**This is an unofficial visual demo, not affiliated with Cozy Country or Protopop Games.** The repository contains no APK, extracted game models, textures, shaders, or other game files. The terrain, cottage, trees, flowers, animals and water shader are original procedural work.

## Try it

Open the GitHub Pages site: `https://shifatmasud.github.io/cozy-country-webgl2-demo/`

The page loads React, Three.js and React Three Fiber from esm.sh, so it needs an internet connection and a browser with WebGL2 enabled. Drag to orbit, scroll/pinch to zoom, and use **Stay for dusk** to change the lighting.

## Source and local development

The readable React/JSX project is in `src/` and uses pinned dependencies in `package.json`.

```bash
pnpm install
pnpm dev
pnpm build
```

`index.html` is also a no-build Pages entry point. Its procedural scene is written with `React.createElement` so GitHub Pages can serve it directly from the root branch.

## License

Original demo code is MIT licensed. Cozy Country is referenced only to explain the visual inspiration; its name and marks belong to their respective owner.
