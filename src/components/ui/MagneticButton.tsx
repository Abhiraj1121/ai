"use client";

import React, { useRef, useState } from "react";
import { motion } from "framer-motion";

interface MagneticButtonProps {
  children: React.ReactNode;
  href?: string;
  onClick?: () => void;
  variant?: "primary" | "secondary" | "outline";
  className?: string;
  size?: "md" | "lg";
}

export const MagneticButton: React.FC<MagneticButtonProps> = ({
  children,
  href,
  onClick,
  variant = "primary",
  className = "",
  size = "md",
}) => {
  const btnRef = useRef<HTMLButtonElement & HTMLAnchorElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!btnRef.current) return;
    const { left, top, width, height } = btnRef.current.getBoundingClientRect();
    const x = (e.clientX - (left + width / 2)) * 0.35; // Magnetic attraction magnitude
    const y = (e.clientY - (top + height / 2)) * 0.35;
    setPosition({ x, y });
  };

  const handleMouseLeave = () => {
    setPosition({ x: 0, y: 0 });
  };

  const baseStyles =
    "inline-flex items-center justify-center font-body font-bold rounded-full transition-all duration-300 relative group overflow-hidden cursor-pointer";

  const sizeStyles =
    size === "lg" ? "px-8 py-4 text-base tracking-wide" : "px-6 py-2.5 text-sm";

  const variantStyles =
    variant === "primary"
      ? "bg-gradient-to-r from-brand-purpleBright via-brand-pink to-brand-blue text-void font-extrabold shadow-[0_0_30px_rgba(139,92,246,0.5)] hover:shadow-[0_0_45px_rgba(244,114,182,0.7)]"
      : variant === "secondary"
      ? "bg-white/10 text-ink backdrop-blur-md border border-white/20 hover:border-brand-purpleBright hover:bg-white/15"
      : "bg-transparent text-ink border border-brand-purple/40 hover:border-brand-pink";

  const content = (
    <motion.span
      animate={{ x: position.x, y: position.y }}
      transition={{ type: "spring", stiffness: 250, damping: 15 }}
      className="relative z-10 flex items-center space-x-2"
    >
      {children}
    </motion.span>
  );

  if (href) {
    return (
      <motion.a
        ref={btnRef as any}
        href={href}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        className={`${baseStyles} ${sizeStyles} ${variantStyles} ${className}`}
      >
        {/* Animated Glow Border overlay */}
        <span className="absolute inset-0 bg-gradient-to-r from-brand-purple via-brand-pink to-brand-blue opacity-0 group-hover:opacity-20 transition-opacity duration-500" />
        {content}
      </motion.a>
    );
  }

  return (
    <motion.button
      ref={btnRef as any}
      onClick={onClick}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={`${baseStyles} ${sizeStyles} ${variantStyles} ${className}`}
    >
      <span className="absolute inset-0 bg-gradient-to-r from-brand-purple via-brand-pink to-brand-blue opacity-0 group-hover:opacity-20 transition-opacity duration-500" />
      {content}
    </motion.button>
  );
};
