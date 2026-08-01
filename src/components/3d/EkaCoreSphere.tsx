"use client";

import React, { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { MeshDistortMaterial, Sphere } from "@react-three/drei";
import * as THREE from "three";

interface EkaCoreSphereProps {
  mousePos?: { x: number; y: number };
}

export const EkaCoreSphere: React.FC<EkaCoreSphereProps> = ({
  mousePos = { x: 0, y: 0 },
}) => {
  const groupRef = useRef<THREE.Group>(null);
  const outerRingRef = useRef<THREE.Mesh>(null);
  const innerRingRef = useRef<THREE.Mesh>(null);

  useFrame((state, delta) => {
    if (groupRef.current) {
      // Smooth mouse delta inertia rotation
      const targetRotX = mousePos.y * 0.3;
      const targetRotY = mousePos.x * 0.3;

      groupRef.current.rotation.x += (targetRotX - groupRef.current.rotation.x) * 0.05;
      groupRef.current.rotation.y += (targetRotY - groupRef.current.rotation.y) * 0.05;
    }

    if (outerRingRef.current) {
      outerRingRef.current.rotation.z += delta * 0.2;
      outerRingRef.current.rotation.x += delta * 0.1;
    }

    if (innerRingRef.current) {
      innerRingRef.current.rotation.z -= delta * 0.3;
      innerRingRef.current.rotation.y += delta * 0.15;
    }
  });

  return (
    <group ref={groupRef}>
      {/* Outer Gold & Purple Orbiting Ring 1 */}
      <mesh ref={outerRingRef}>
        <torusGeometry args={[2.0, 0.012, 16, 100]} />
        <meshStandardMaterial
          color="#E2B755"
          emissive="#E2B755"
          emissiveIntensity={0.6}
          roughness={0.2}
          metalness={0.9}
        />
      </mesh>

      {/* Inner Blue Orbiting Ring 2 */}
      <mesh ref={innerRingRef} rotation={[Math.PI / 4, 0, 0]}>
        <torusGeometry args={[2.4, 0.008, 16, 100]} />
        <meshStandardMaterial
          color="#38BDF8"
          emissive="#38BDF8"
          emissiveIntensity={0.5}
          roughness={0.3}
          metalness={0.8}
        />
      </mesh>

      {/* Glossy Organic Distorted AI Synthesis Core Orb */}
      <Sphere args={[1.3, 64, 64]}>
        <MeshDistortMaterial
          color="#8B5CF6"
          emissive="#4C2E9E"
          emissiveIntensity={0.4}
          roughness={0.15}
          metalness={0.85}
          distort={0.38}
          speed={2.5}
          radius={1}
        />
      </Sphere>

      {/* Multi-point PBR Light Setup */}
      <pointLight position={[5, 5, 5]} color="#F472B6" intensity={3} distance={12} />
      <pointLight position={[-5, -5, -5]} color="#38BDF8" intensity={2.5} distance={12} />
      <pointLight position={[0, 0, 4]} color="#E2B755" intensity={2} distance={8} />
    </group>
  );
};
