"use client";

import React, { useRef, useState } from "react";
import { motion } from "framer-motion";

interface GlassCardProps {
  children: React.ReactNode;
  className?: string;
  glowColor?: string;
}

export const GlassCard: React.FC<GlassCardProps> = ({
  children,
  className = "",
  glowColor = "rgba(139, 92, 246, 0.2)",
}) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);

  const updateCardTilt = (clientX: number, clientY: number) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    const y = clientY - rect.top;

    setMousePos({ x, y });

    // 3D Tilt Angle calculation (Max 10 deg)
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotX = -((y - centerY) / centerY) * 10;
    const rotY = ((x - centerX) / centerX) * 10;

    setRotateX(rotX);
    setRotateY(rotY);
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    updateCardTilt(e.clientX, e.clientY);
  };

  const handleTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
    if (e.touches.length > 0) {
      updateCardTilt(e.touches[0].clientX, e.touches[0].clientY);
    }
  };

  const handleMouseEnter = () => setIsHovered(true);
  const handleMouseLeave = () => {
    setIsHovered(false);
    setRotateX(0);
    setRotateY(0);
  };

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onTouchMove={handleTouchMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onTouchEnd={handleMouseLeave}
      animate={{ rotateX, rotateY }}
      transition={{ type: "spring", stiffness: 220, damping: 18 }}
      style={{
        transformStyle: "preserve-3d",
        perspective: 1000,
      }}
      className={`relative rounded-2xl border border-white/10 bg-void-card/60 backdrop-blur-xl p-6 transition-all duration-300 hover:border-brand-purpleBright/50 hover:shadow-[0_25px_60px_rgba(139,92,246,0.3)] overflow-hidden group cursor-pointer ${className}`}
    >
      {/* Dynamic Radial Spotlight Glow overlay */}
      {isHovered && (
        <div
          className="pointer-events-none absolute inset-0 transition-opacity duration-300 opacity-100 z-0"
          style={{
            background: `radial-gradient(450px circle at ${mousePos.x}px ${mousePos.y}px, ${glowColor}, transparent 65%)`,
          }}
        />
      )}

      {/* Dotted Grid Parallax Pattern overlay */}
      <div
        className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-30 transition-opacity duration-500 z-0"
        style={{
          backgroundImage: `radial-gradient(rgba(183, 156, 255, 0.5) 1px, transparent 1px)`,
          backgroundSize: `16px 16px`,
          backgroundPosition: `${mousePos.x * 0.04}px ${mousePos.y * 0.04}px`,
        }}
      />

      {/* Glass Light Reflection Beam */}
      <div className="pointer-events-none absolute -inset-full bg-gradient-to-r from-transparent via-white/[0.04] to-transparent group-hover:translate-x-full transition-transform duration-1000 ease-out z-0" />

      {/* Floating Inner Content Container (Elevated 3D depth) */}
      <div
        className="relative z-10 transition-transform duration-300 group-hover:translate-z-6"
        style={{ transform: isHovered ? "translateZ(18px)" : "translateZ(0px)" }}
      >
        {children}
      </div>
    </motion.div>
  );
};
