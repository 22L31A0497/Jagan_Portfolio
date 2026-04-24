"use client";

/*
  Hero 3D scene — distorted icosahedron with cursor-reactive displacement.
  - MeshDistortMaterial from drei gives us a clean displacement shader without writing GLSL.
  - Sphere rotation + distortion speed respond to pointer X/Y.
  - Environment light + soft rim for depth.
  Kept under ~250KB gzipped. Rendered in its own canvas, suspended + lazy-loaded.
*/

/// <reference types="@react-three/fiber" />
import { Canvas, useFrame } from "@react-three/fiber";
import { Environment, MeshDistortMaterial, Float } from "@react-three/drei";
import { Suspense, useRef } from "react";
import * as THREE from "three";

// MeshDistortMaterial's impl type isn't cleanly exported — we only need `distort`/`speed`.
// Any-cast is justified here; the material only exposes those two fields we mutate.
function DistortedSphere() {
  const meshRef = useRef<THREE.Mesh>(null);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const matRef = useRef<any>(null);
  const pointer = useRef({ x: 0, y: 0 });

  useFrame((state, delta) => {
    if (!meshRef.current) return;
    // Smoothly follow normalized pointer
    pointer.current.x += (state.pointer.x - pointer.current.x) * 0.08;
    pointer.current.y += (state.pointer.y - pointer.current.y) * 0.08;

    // Gentle idle rotation + pointer-driven tilt
    meshRef.current.rotation.y += delta * 0.18;
    meshRef.current.rotation.x = pointer.current.y * 0.35;
    meshRef.current.rotation.z = pointer.current.x * 0.25;

    // Distort intensity scales with pointer magnitude for "alive" feel
    const mag = Math.min(
      Math.hypot(pointer.current.x, pointer.current.y) * 1.2,
      0.9
    );
    if (matRef.current) {
      matRef.current.distort = 0.28 + mag * 0.2;
      matRef.current.speed = 1.1 + mag * 2.0;
    }
  });

  return (
    <Float speed={1.2} rotationIntensity={0.25} floatIntensity={0.6}>
      <mesh ref={meshRef} scale={1.55}>
        <icosahedronGeometry args={[1, 48]} />
        <MeshDistortMaterial
          ref={matRef}
          color="#1A1A1F"
          emissive="#D4A373"
          emissiveIntensity={0.08}
          roughness={0.22}
          metalness={0.75}
          distort={0.3}
          speed={1.4}
        />
      </mesh>
    </Float>
  );
}

export default function HeroScene() {
  return (
    <Canvas
      gl={{
        antialias: true,
        alpha: true,
        powerPreference: "high-performance",
      }}
      dpr={[1, 1.5]}
      camera={{ position: [0, 0, 4], fov: 45 }}
      style={{ background: "transparent" }}
    >
      <ambientLight intensity={0.35} />
      <directionalLight position={[4, 6, 5]} intensity={1.4} color="#F6E7D3" />
      <pointLight position={[-5, -3, -4]} intensity={0.6} color="#D4A373" />
      <Suspense fallback={null}>
        <DistortedSphere />
        <Environment preset="city" />
      </Suspense>
    </Canvas>
  );
}
