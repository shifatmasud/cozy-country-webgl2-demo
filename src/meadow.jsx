import React, { useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

function makeIsland() {
  const segments = 112;
  const rings = 28;
  const radius = 5.5;
  const positions = [0, 0.16, 0];
  const colors = [];
  const indices = [];
  const color = new THREE.Color();
  color.setHSL(0.265, 0.37, 0.49);
  colors.push(color.r, color.g, color.b);
  for (let r = 1; r <= rings; r++) {
    const t = r / rings;
    for (let i = 0; i < segments; i++) {
      const a = (i / segments) * Math.PI * 2;
      const x = Math.cos(a) * radius * t;
      const z = Math.sin(a) * radius * t;
      const roll = Math.sin(x * 0.63 + 0.6) * 0.12 + Math.cos(z * 0.52 - 0.7) * 0.09 + Math.sin((x + z) * 0.37) * 0.055;
      const edge = Math.pow(t, 3.4) * 0.2;
      const y = 0.16 + roll - edge;
      positions.push(x, y, z);
      const variation = Math.sin(x * 2.1 + z * 1.4) * 0.035 + Math.cos(z * 2.8) * 0.025;
      color.setHSL(0.265 + variation * 0.3, 0.36, 0.43 + variation);
      colors.push(color.r, color.g, color.b);
    }
  }
  for (let i = 0; i < segments; i++) indices.push(0, 1 + ((i + 1) % segments), 1 + i);
  for (let r = 0; r < rings - 1; r++) {
    const start = 1 + r * segments;
    const next = start + segments;
    for (let i = 0; i < segments; i++) {
      const j = (i + 1) % segments;
      indices.push(start + i, next + j, next + i, start + i, start + j, next + j);
    }
  }
  const geo = new THREE.BufferGeometry();
  geo.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));
  geo.setAttribute('color', new THREE.Float32BufferAttribute(colors, 3));
  geo.setIndex(indices);
  geo.computeVertexNormals();
  return geo;
}

function makePath() {
  const points = [
    new THREE.Vector3(1.65, 0.27, 2.55), new THREE.Vector3(1.08, 0.29, 1.9),
    new THREE.Vector3(0.5, 0.30, 1.25), new THREE.Vector3(0.9, 0.31, 0.55),
    new THREE.Vector3(1.5, 0.28, -0.15), new THREE.Vector3(1.0, 0.31, -0.9),
    new THREE.Vector3(0.25, 0.32, -1.5), new THREE.Vector3(-0.35, 0.34, -2.25),
  ];
  return new THREE.TubeGeometry(new THREE.CatmullRomCurve3(points), 96, 0.23, 8, false);
}

function Tree({ position, scale = 1, tint = '#65894d', delay = 0 }) {
  const sway = useRef();
  useFrame(({ clock }) => {
    if (sway.current) sway.current.rotation.z = Math.sin(clock.elapsedTime * 0.7 + delay) * 0.025;
  });
  return (
    <group position={position} scale={scale} ref={sway}>
      <mesh position={[0, 0.45, 0]} castShadow><cylinderGeometry args={[0.12, 0.2, 0.9, 7]} /><meshStandardMaterial color="#805c3f" roughness={0.95} /></mesh>
      <mesh position={[0, 1.15, 0]} castShadow><coneGeometry args={[0.72, 1.35, 8]} /><meshStandardMaterial color={tint} roughness={0.92} flatShading /></mesh>
      <mesh position={[0.05, 1.82, -0.02]} castShadow><coneGeometry args={[0.53, 1.15, 8]} /><meshStandardMaterial color={tint} roughness={0.92} flatShading /></mesh>
      <mesh position={[-0.04, 2.36, 0.01]} castShadow><coneGeometry args={[0.32, 0.82, 8]} /><meshStandardMaterial color={tint} roughness={0.92} flatShading /></mesh>
    </group>
  );
}

function Cottage() {
  return (
    <group position={[-1.55, 0.34, -1.15]} rotation={[0, -0.27, 0]}>
      <mesh position={[0, 0.5, 0]} castShadow receiveShadow><boxGeometry args={[1.48, 1.0, 1.24]} /><meshStandardMaterial color="#ead4ac" roughness={0.95} /></mesh>
      <mesh position={[0, 1.2, 0]} rotation={[0, Math.PI / 4, 0]} scale={[1.22, 0.76, 1.1]} castShadow><coneGeometry args={[1, 1, 4]} /><meshStandardMaterial color="#b9694d" roughness={0.86} flatShading /></mesh>
      <mesh position={[0, 0.34, 0.635]} castShadow><boxGeometry args={[0.35, 0.66, 0.07]} /><meshStandardMaterial color="#936145" roughness={0.9} /></mesh>
      <mesh position={[-0.46, 0.62, 0.635]}><boxGeometry args={[0.25, 0.26, 0.04]} /><meshStandardMaterial color="#9bc5c0" emissive="#294c48" emissiveIntensity={0.15} /></mesh>
      <mesh position={[0.46, 0.62, 0.635]}><boxGeometry args={[0.25, 0.26, 0.04]} /><meshStandardMaterial color="#9bc5c0" emissive="#294c48" emissiveIntensity={0.15} /></mesh>
      <mesh position={[0.5, 1.55, -0.18]} castShadow><boxGeometry args={[0.2, 0.7, 0.22]} /><meshStandardMaterial color="#c57b5a" roughness={0.94} /></mesh>
      <mesh position={[0, 0.09, 0.86]} receiveShadow><boxGeometry args={[1.08, 0.16, 0.44]} /><meshStandardMaterial color="#c7a274" roughness={1} /></mesh>
    </group>
  );
}

function Flower({ position, color = '#f6cf75', scale = 1 }) {
  return <group position={position} scale={scale}>
    <mesh position={[0, 0.13, 0]}><cylinderGeometry args={[0.018, 0.024, 0.26, 5]} /><meshStandardMaterial color="#52794d" /></mesh>
    <mesh position={[0, 0.28, 0]}><sphereGeometry args={[0.095, 8, 7]} /><meshStandardMaterial color={color} roughness={0.82} /></mesh>
    <mesh position={[0.06, 0.12, 0]} rotation={[0, 0, -0.7]}><sphereGeometry args={[0.075, 7, 6]} /><meshStandardMaterial color="#7da65c" /></mesh>
  </group>;
}

function Sheep({ position }) {
  const bob = useRef();
  useFrame(({ clock }) => { if (bob.current) bob.current.position.y = 0.34 + Math.sin(clock.elapsedTime * 1.2 + position[0]) * 0.035; });
  return <group position={position} ref={bob}>
    <mesh castShadow><sphereGeometry args={[0.34, 12, 10]} /><meshStandardMaterial color="#f4eddb" roughness={1} /></mesh>
    <mesh position={[0.28, 0.02, 0.02]} castShadow><sphereGeometry args={[0.18, 10, 8]} /><meshStandardMaterial color="#4e4b42" roughness={0.95} /></mesh>
    {[[-0.16,-0.22], [0.16,-0.22], [-0.16,0.2], [0.16,0.2]].map(([x,z],i)=><mesh key={i} position={[x,-0.22,z]}><cylinderGeometry args={[0.035,0.045,0.24,5]} /><meshStandardMaterial color="#625948" /></mesh>)}
  </group>;
}

function Field() {
  const stalks = useMemo(() => {
    const list = [];
    for (let row = 0; row < 4; row++) for (let col = 0; col < 5; col++) list.push([-3.25 + col * 0.27, 0.28, 0.6 + row * 0.29]);
    return list;
  }, []);
  return <group>
    <mesh position={[-2.7, 0.285, 1.05]} rotation={[-Math.PI/2,0,0]} receiveShadow><planeGeometry args={[1.65,1.45]} /><meshStandardMaterial color="#b88d59" roughness={1} /></mesh>
    {stalks.map(([x,y,z],i)=><group key={i} position={[x,y,z]}>
      <mesh position={[0,0.17,0]} castShadow><cylinderGeometry args={[0.035,0.045,0.34,5]} /><meshStandardMaterial color={i%3===0?'#8eaa55':'#73934e'} roughness={1} /></mesh>
      <mesh position={[0.045,0.29,0]}><sphereGeometry args={[0.055,6,5]} /><meshStandardMaterial color="#edc875" roughness={0.9} /></mesh>
    </group>)}
  </group>;
}

function Pond({ dusk }) {
  const mat = useMemo(() => new THREE.ShaderMaterial({
    uniforms: { uTime: { value: 0 }, uDusk: { value: dusk ? 1 : 0 } },
    vertexShader: `varying vec2 vUv; void main(){ vUv=uv; gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.0); }`,
    fragmentShader: `uniform float uTime; uniform float uDusk; varying vec2 vUv; void main(){ vec2 p=vUv-0.5; float wave=sin(p.x*46.0+uTime*1.2+sin(p.y*20.0-uTime)*0.75)*0.5+sin(p.y*38.0-uTime*0.8)*0.5; float shimmer=smoothstep(0.22,0.92,wave)*0.28; vec3 morning=vec3(0.27,0.65,0.66); vec3 evening=vec3(0.18,0.38,0.48); vec3 base=mix(morning,evening,uDusk); vec3 color=base+vec3(shimmer*0.52,shimmer*0.68,shimmer*0.58); gl_FragColor=vec4(color,0.9); }`,
    transparent: true, depthWrite: false, side: THREE.DoubleSide
  }), []);
  useFrame(({clock}) => { mat.uniforms.uTime.value = clock.elapsedTime; mat.uniforms.uDusk.value = dusk ? 1 : 0; });
  return <mesh position={[2.52,0.19,-1.88]} rotation={[-Math.PI/2,0,0]} scale={[1.52,0.95,1]} material={mat}><circleGeometry args={[1,64]} /></mesh>;
}

function Meadow({ dusk }) {
  const island = useMemo(makeIsland, []);
  const path = useMemo(makePath, []);
  const trees = [[-3.25,0.25,-1.9,1.05,'#63864b'],[-3.9,0.2,-0.65,0.78,'#78995a'],[-2.9,0.23,-3.35,0.9,'#557b48'],[-0.7,0.27,3.3,0.72,'#718d50'],[2.9,0.24,2.5,0.94,'#64844b'],[3.8,0.19,0.85,0.72,'#7c9957'],[3.6,0.2,-3.15,0.9,'#587b49'],[0.8,0.24,-3.9,0.77,'#718e53']];
  const flowers = [[-3.65,.28,1.35,'#f0c978'],[-3.45,.29,2.05,'#f1a7a1'],[-1.0,.28,2.9,'#fff0c5'],[.15,.27,2.6,'#eaa098'],[3.35,.25,.05,'#efcd7c'],[3.0,.25,-.35,'#f0a49b'],[-2.2,.27,-2.55,'#f0d27b'],[-.25,.26,-2.95,'#f4eee0']];
  const sky = dusk ? '#354d58' : '#dcebd9';
  return <>
    <color attach="background" args={[sky]} />
    <fog attach="fog" args={[sky, 16, 34]} />
    <ambientLight intensity={dusk ? 0.52 : 0.85} />
    <hemisphereLight args={[dusk ? '#b9d2ed' : '#fff4d6', '#637752', dusk ? 0.7 : 1.0]} />
    <directionalLight castShadow position={dusk ? [-4,9,-4] : [5,10,5]} intensity={dusk ? 1.55 : 2.15} color={dusk ? '#ffd9a1' : '#fff1c9'} shadow-mapSize={[1024,1024]} shadow-camera-left={-9} shadow-camera-right={9} shadow-camera-top={9} shadow-camera-bottom={-9} />
    <mesh position={[0,-0.22,0]} receiveShadow><cylinderGeometry args={[5.52,5.35,0.72,112]} /><meshStandardMaterial color="#98714e" roughness={1} /></mesh>
    <mesh geometry={island} receiveShadow><meshStandardMaterial vertexColors roughness={0.95} flatShading /></mesh>
    <mesh position={[0,-0.62,0]} rotation={[-Math.PI/2,0,0]}><planeGeometry args={[200,200]} /><meshStandardMaterial color={dusk?'#345661':'#a9c7bb'} roughness={0.8} /></mesh>
    <mesh geometry={path} position={[0,0.015,0]} receiveShadow><meshStandardMaterial color="#d8bd8d" roughness={1} /></mesh>
    <Pond dusk={dusk} />
    <Field />
    <Cottage />
    {trees.map(([x,y,z,s,c],i)=><Tree key={i} position={[x,y,z]} scale={s} tint={c} delay={i*.7} />)}
    {flowers.map(([x,y,z,c],i)=><Flower key={i} position={[x,y,z]} color={c} scale={0.8 + (i%3)*0.15} />)}
    <Sheep position={[2.8,0.25,1.2]} />
    <Sheep position={[-0.15,0.26,2.0]} />
    <mesh position={[1.8,0.48,-2.7]} castShadow><sphereGeometry args={[0.18,8,7]} /><meshStandardMaterial color="#eee5d2" roughness={1} /></mesh>
    <mesh position={[1.8,0.72,-2.7]} castShadow><coneGeometry args={[0.16,0.33,8]} /><meshStandardMaterial color="#d98e72" roughness={0.9} /></mesh>
    <mesh position={[-2.2,0.36,2.7]} castShadow><sphereGeometry args={[0.14,7,6]} /><meshStandardMaterial color="#c59d64" roughness={1} /></mesh>
    <mesh position={[-2.2,0.55,2.7]} castShadow><coneGeometry args={[0.13,0.28,7]} /><meshStandardMaterial color="#f0d392" roughness={0.9} /></mesh>
  </>;
}

export { Meadow };
