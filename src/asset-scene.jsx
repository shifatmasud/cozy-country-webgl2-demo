import React, { useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import * as THREE from 'three';
import { extractedModels } from '../assets.js';

function geometry(name) {
  const data = extractedModels[name];
  const mesh = new THREE.BufferGeometry();
  mesh.setAttribute('position', new THREE.Float32BufferAttribute(data.p, 3));
  mesh.setIndex(data.i);
  mesh.computeBoundingBox();
  const box = mesh.boundingBox;
  mesh.translate(-(box.min.x + box.max.x) / 2, -box.min.y, -(box.min.z + box.max.z) / 2);
  mesh.computeVertexNormals();
  return mesh;
}

function Cattail({ position, scale = 1 }) {
  const mesh = useMemo(() => geometry('cattail'), []);
  const material = useMemo(() => new THREE.ShaderMaterial({
    uniforms: { uTime: { value: 0 } },
    vertexShader: `uniform float uTime; varying vec3 vN; varying float vH; void main(){ vec3 p=position; float h=clamp(p.y,0.0,1.0); p.x+=sin(uTime*1.4+p.z*4.0)*0.06*h; vH=h; vN=normal; gl_Position=projectionMatrix*modelViewMatrix*vec4(p,1.0); }`,
    fragmentShader: `varying vec3 vN; varying float vH; void main(){ float l=.58+.42*max(dot(normalize(vN),normalize(vec3(.4,.8,.5))),0.0); vec3 c=mix(vec3(.12,.25,.12),vec3(.43,.56,.27),smoothstep(0.0,1.0,vH))*l; gl_FragColor=vec4(c,1.0); }`,
    side: THREE.DoubleSide,
  }), []);
  useFrame(({ clock }) => { material.uniforms.uTime.value = clock.elapsedTime; });
  return <mesh geometry={mesh} material={material} position={position} scale={scale} castShadow />;
}

function RiverRock({ position, scale = 1 }) {
  const mesh = useMemo(() => geometry('riverRock'), []);
  return <mesh geometry={mesh} position={position} scale={scale} castShadow receiveShadow><meshStandardMaterial color="#81938a" roughness={0.95} flatShading /></mesh>;
}

function Water({ dusk }) {
  const river = useMemo(() => {
    const points = 48, positions = [], uvs = [], indices = [];
    for (let i = 0; i <= points; i++) {
      const t = i / points, z = -5.4 + t * 10.8, center = Math.sin((t - .5) * Math.PI * 2.3) * 1.35;
      positions.push(center - .68, 0, z, center + .68, 0, z);
      uvs.push(0, t, 1, t);
      if (i < points) { const a = i * 2; indices.push(a, a + 1, a + 2, a + 1, a + 3, a + 2); }
    }
    const g = new THREE.BufferGeometry();
    g.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));
    g.setAttribute('uv', new THREE.Float32BufferAttribute(uvs, 2));
    g.setIndex(indices); g.computeVertexNormals(); return g;
  }, []);
  const material = useMemo(() => new THREE.ShaderMaterial({
    uniforms: { uTime: { value: 0 }, uNight: { value: 0 } },
    transparent: true, depthWrite: false, side: THREE.DoubleSide,
    vertexShader: `varying vec2 vUv; void main(){ vUv=uv; gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.0); }`,
    fragmentShader: `uniform float uTime; uniform float uNight; varying vec2 vUv; void main(){ vec2 p=vUv-.5; float a=sin(p.x*48.0+uTime*1.1+sin(p.y*19.0-uTime)*.7); float b=sin(p.y*34.0-uTime*.8); float g=smoothstep(.42,.98,(a+b)*.5); vec3 day=mix(vec3(.21,.47,.48),vec3(.43,.69,.61),g*.34); vec3 night=mix(vec3(.10,.22,.31),vec3(.40,.56,.57),g*.33); gl_FragColor=vec4(mix(day,night,uNight),.94); }`,
  }), []);
  useFrame(({ clock }) => { material.uniforms.uTime.value = clock.elapsedTime; material.uniforms.uNight.value = dusk ? 1 : 0; });
  return <mesh geometry={river} position={[0,.02,0]} material={material} />;
}

function Scene({ dusk }) {
  const sky = dusk ? '#314953' : '#dce8d8';
  return <>
    <color attach="background" args={[sky]} />
    <fog attach="fog" args={[sky, 13, 28]} />
    <ambientLight intensity={dusk ? .5 : .85} />
    <directionalLight position={[-4,9,5]} intensity={dusk ? 1.6 : 2.2} color={dusk ? '#ffd5a0' : '#fff3cf'} castShadow />
    <mesh position={[0,-.55,0]} receiveShadow><cylinderGeometry args={[6.2,6.35,.6,80]} /><meshStandardMaterial color="#816c54" roughness={1} /></mesh>
    <mesh position={[0,-.22,0]} rotation={[-Math.PI/2,0,0]} receiveShadow><circleGeometry args={[6.1,80]} /><meshStandardMaterial color={dusk ? '#425848' : '#76935b'} roughness={1} /></mesh>
    <Water dusk={dusk} />
    {[[.4,.24,1.8],[-1,.23,2.5],[1.5,.22,2.2],[2.6,.2,.6],[-2,.22,1.4],[3,.2,-.4]].map((p,i)=><Cattail key={i} position={p} scale={.75+(i%3)*.16} />)}
    {[[1,.13,-1.1],[-1.2,.13,-1.6],[2.4,.13,-1.8],[-3,.13,.1],[3.5,.13,1.4],[-2,.13,2.6]].map((p,i)=><RiverRock key={i} position={p} scale={.52+(i%3)*.12} />)}
    <mesh position={[0,.12,0]} rotation={[-Math.PI/2,0,0]}><ringGeometry args={[2.3,2.45,80]} /><meshStandardMaterial color="#d7bd83" roughness={1} /></mesh>
    <OrbitControls makeDefault minDistance={7} maxDistance={20} maxPolarAngle={Math.PI*.48} target={[0,.3,0]} />
  </>;
}

export default function AssetScene({ dusk, onWebgl2 }) {
  return <Canvas shadows dpr={[1,1.5]} camera={{ position:[8,7,9], fov:39, near:.1, far:70 }} gl={{ antialias:true, alpha:false }} onCreated={({gl})=>onWebgl2(gl.capabilities.isWebGL2)}><Scene dusk={dusk} /></Canvas>;
}
