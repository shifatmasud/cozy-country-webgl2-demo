# Cozy Country — WebGL2 field study

A small browser diorama built with React, Three.js and React Three Fiber. It uses compacted Cattail and RiverRock meshes extracted from the supplied game package, plus re-authored GLSL for wind sway and animated water. The GitHub Pages workflow builds and deploys the Vite app from `main`.

The user states they own or have permission to republish the referenced assets. This is an unofficial fan-made study, not affiliated with Cozy Country or its publisher. Textures and original game shader source are not included; the plant and water shaders are new implementations.

## Try it

https://shifatmasud.github.io/cozy-country-webgl2-demo/

Drag to orbit, scroll or pinch to zoom, and use the dusk control to shift the lighting. The demo requires a current browser with WebGL2.

## Source

- `src/main.jsx` — scene interface and dusk control.
- `src/asset-scene.jsx` — React Three Fiber scene and custom wind/water shaders.
- `assets.js` — compact position/index buffers converted from extracted OBJ meshes.
