import React, { useState } from 'react';
import { createRoot } from 'react-dom/client';
import AssetScene from './asset-scene.jsx';
import './style.css';

class SceneBoundary extends React.Component {
  state = { failed: false };
  static getDerivedStateFromError() { return { failed: true }; }
  componentDidCatch(error) {
    console.error('3D scene could not start', error);
    this.props.onError?.();
  }
  render() { return this.state.failed ? this.props.fallback : this.props.children; }
}

function App() {
  const [dusk, setDusk] = useState(false);
  const [webgl2, setWebgl2] = useState(null);
  return (
    <main className={`app ${dusk ? 'dusk' : ''}`}>
      <div className="canvas-wrap" aria-label="Interactive 3D countryside scene">
        <SceneBoundary
          onError={() => setWebgl2(false)}
          fallback={<div className="scene-fallback">This browser couldn’t start a WebGL2 scene.</div>}
        >
          <AssetScene dusk={dusk} onWebgl2={setWebgl2} />
        </SceneBoundary>
      </div>
      <header className="topbar">
        <a className="brand" href="#home" aria-label="Cozy Country field study"><span className="brand-mark">✿</span><span>cozy country</span></a>
        <div className="top-meta"><span className="live-dot" /> extracted mesh · re-authored GLSL</div>
      </header>
      <section className="hero" id="home">
        <div className="eyebrow"><span>✦</span> A tiny WebGL2 field study</div>
        <h1>Find your<br /><em>quiet water.</em></h1>
        <p className="intro">A little countryside to pause in. Drag to turn the island, scroll to drift closer, and watch the cattails sway.</p>
        <div className="actions">
          <button className="mode-button" onClick={() => setDusk(value => !value)}>
            <span>{dusk ? '☼' : '☾'}</span>{dusk ? 'Bring back the morning' : 'Stay for dusk'}
          </button>
          <span className="status">{webgl2 === false ? 'WebGL2 unavailable' : webgl2 ? 'WebGL2 · running' : 'Loading the scene'}</span>
        </div>
      </section>
      <aside className="note-card">
        <div className="note-top"><span>ASSET STUDY</span><span className="sparkle">✧</span></div>
        <h2>Cattail · river rock</h2>
        <p>Extracted mesh shapes, rebuilt as a small interactive scene. Wind and water use re-authored GLSL.</p>
        <div className="note-divider" />
        <div className="legend"><span className="legend-item"><i className="swatch water" /> shader water</span><span className="legend-item"><i className="swatch flowers" /> wind shader</span></div>
      </aside>
      <footer className="footer"><span>Three.js · React Three Fiber · WebGL2</span><span className="footer-right">Drag to explore. <b>↗</b></span></footer>
      {webgl2 === false && <div className="webgl-warning">This demo needs a browser with WebGL2 enabled.</div>}
    </main>
  );
}

createRoot(document.getElementById('root')).render(<React.StrictMode><App /></React.StrictMode>);
