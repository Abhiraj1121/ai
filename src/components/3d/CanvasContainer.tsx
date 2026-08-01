"use client";

import React, { useEffect, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { Float } from "@react-three/drei";
import { EkaCoreSphere } from "./EkaCoreSphere";

export const CanvasContainer: React.FC = () => {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const handleMouseMove = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth - 0.5) * 2;
      const y = (e.clientY / window.innerHeight - 0.5) * 2;
      setMousePos({ x, y });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  if (!mounted) {
    return (
      <div className="w-full h-[450px] md:h-[550px] flex items-center justify-center">
        <div className="w-48 h-48 rounded-full border border-brand-purple/30 bg-brand-purple/10 animate-pulse flex items-center justify-center">
          <span className="font-mono text-xs text-brand-purpleBright uppercase tracking-widest">
            Initializing WebGL...
          </span>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full h-[450px] md:h-[550px] relative pointer-events-none">
      <Canvas
        camera={{ position: [0, 0, 6], fov: 45 }}
        gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
        className="w-full h-full"
      >
        <ambientLight intensity={0.6} />
        <directionalLight position={[10, 10, 5]} intensity={1.2} color="#F472B6" />
        <directionalLight position={[-10, -10, -5]} intensity={0.8} color="#38BDF8" />
        
        <Float speed={2} rotationIntensity={0.5} floatIntensity={0.8}>
          <EkaCoreSphere mousePos={mousePos} />
        </Float>
      </Canvas>
    </div>
  );
};

export default CanvasContainer;
