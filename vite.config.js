import { defineConfig } from 'vite';
export default defineConfig({
  base: '/cozy-country-webgl2-demo/',
  build: {
    target: 'es2022',
    rollupOptions: {
      external: ['react', 'react/jsx-runtime', 'react-dom/client', 'three', '@react-three/fiber', '@react-three/drei']
    }
  }
});
