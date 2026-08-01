"use client";

import React, { useRef, useState, useEffect } from "react";
import { motion } from "framer-motion";

interface Monitor3DShowcaseProps {
  children: React.ReactNode;
}

export const Monitor3DShowcase: React.FC<Monitor3DShowcaseProps> = ({ children }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;

      const mouseX = e.clientX - centerX;
      const mouseY = e.clientY - centerY;

      // Soft 3D Tilt calculation
      const rotY = (mouseX / (rect.width / 2)) * 8; // Max 8 deg
      const rotX = -(mouseY / (rect.height / 2)) * 8; // Max 8 deg

      setRotateX(rotX);
      setRotateY(rotY);
    };

    const handleMouseLeave = () => {
      setRotateX(0);
      setRotateY(0);
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <div className="perspective-1000 w-full max-w-5xl mx-auto py-12 px-4" ref={containerRef}>
      <motion.div
        animate={{ rotateX, rotateY }}
        transition={{ type: "spring", stiffness: 150, damping: 15 }}
        style={{ transformStyle: "preserve-3d" }}
        className="relative rounded-2xl border border-brand-purple/30 bg-void-surface/80 backdrop-blur-2xl shadow-2xl overflow-hidden p-2 md:p-4 group"
      >
        {/* Monitor Metallic Bezel Top Bar */}
        <div className="flex items-center justify-between px-4 py-3 border-b border-brand-purple/20 bg-void-card/60 rounded-t-xl">
          <div className="flex items-center space-x-2">
            <span className="w-3 h-3 rounded-full bg-red-500/80 inline-block" />
            <span className="w-3 h-3 rounded-full bg-yellow-500/80 inline-block" />
            <span className="w-3 h-3 rounded-full bg-green-500/80 inline-block" />
          </div>
          <div className="flex items-center space-x-2 text-xs font-mono text-ink-mute">
            <span className="w-2 h-2 rounded-full bg-brand-pink animate-ping inline-block" />
            <span>eka-core-v1.0.0-orchestrator</span>
          </div>
          <div className="text-xs font-mono text-brand-purpleBright px-2 py-0.5 rounded bg-brand-purple/10 border border-brand-purple/20">
            AST VERIFIED
          </div>
        </div>

        {/* Screen Content Wrapper */}
        <div className="relative rounded-b-xl overflow-hidden border border-brand-purple/10 bg-void/90">
          {children}
        </div>

        {/* Dynamic Screen Glare overlay */}
        <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/[0.03] to-transparent pointer-events-none rounded-2xl" />
      </motion.div>
    </div>
  );
};
