import React, { Suspense, useState } from 'react';
import { createRoot } from 'react-dom/client';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import { Meadow } from './meadow.jsx';
import './style.css';

function App() {
  const [dusk, setDusk] = useState(false);
  const [webgl2, setWebgl2] = useState(null);
  return (
    <main className={`app ${dusk ? 'dusk' : ''}`}>
      <div className="canvas-wrap" aria-label="Interactive 3D countryside scene">
        <Canvas
          shadows
          dpr={[1, 1.7]}
          camera={{ position: [9, 8.5, 11], fov: 38, near: 0.1, far: 90 }}
          gl={{ antialias: true, alpha: false, powerPreference: 'high-performance' }}
          onCreated={({ gl }) => setWebgl2(gl.capabilities.isWebGL2)}
        >
          <Suspense fallback={null}>
            <Meadow dusk={dusk} />
            <OrbitControls makeDefault minDistance={8} maxDistance={23} maxPolarAngle={Math.PI * 0.49} target={[0, 0.45, 0]} />
          </Suspense>
        </Canvas>
      </div>
      <header className="topbar">
        <a className="brand" href="#home" aria-label="Little Meadow home"><span className="brand-mark">✿</span><span>little meadow</span></a>
        <div className="top-meta"><span className="live-dot" /> a tiny world, made to wander</div>
      </header>
      <section className="hero" id="home">
        <div className="eyebrow"><span>✦</span> A procedural 3D playground</div>
        <h1>Find your<br /><em>little quiet.</em></h1>
        <p className="intro">A sunlit patch of countryside to pause in. Drag to turn the island, scroll to drift closer.</p>
        <div className="actions">
          <button className="mode-button" onClick={() => setDusk(value => !value)}>
            <span>{dusk ? '☼' : '☾'}</span>{dusk ? 'Bring back the morning' : 'Stay for dusk'}
          </button>
          <span className="status">{webgl2 === false ? 'WebGL2 unavailable' : webgl2 ? 'WebGL2 · running' : 'Preparing the meadow'}</span>
        </div>
      </section>
      <aside className="note-card">
        <div className="note-top"><span>YOUR SMALL ESCAPE</span><span className="sparkle">✧</span></div>
        <h2>Take the long way.</h2>
        <p>Follow the winding path past the cottage, through the flowers, and down to the water.</p>
        <div className="note-divider" />
        <div className="legend"><span className="legend-item"><i className="swatch water" /> slow water</span><span className="legend-item"><i className="swatch flowers" /> wild blooms</span></div>
      </aside>
      <footer className="footer"><span>Made of geometry, light & a little GLSL.</span><span className="footer-right">No rush. Look around. <b>↗</b></span></footer>
      {webgl2 === false && <div className="webgl-warning">This demo needs a browser with WebGL2 enabled.</div>}
    </main>
  );
}

createRoot(document.getElementById('root')).render(<React.StrictMode><App /></React.StrictMode>);
