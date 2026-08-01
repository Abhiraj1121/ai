"use client";

import React from "react";
import { motion } from "framer-motion";
import dynamic from "next/dynamic";
import { MagneticButton } from "../ui/MagneticButton";
import { TypewriterText } from "../ui/TypewriterText";
import { Sparkles, ArrowRight, ShieldCheck, Zap, Terminal } from "lucide-react";

const CanvasContainer = dynamic(() => import("../3d/CanvasContainer"), {
  ssr: false,
  loading: () => (
    <div className="w-full h-[450px] md:h-[550px] flex items-center justify-center">
      <div className="w-44 h-44 rounded-full border border-brand-purple/30 bg-brand-purple/10 animate-pulse flex items-center justify-center">
        <span className="font-mono text-xs text-brand-purpleBright uppercase tracking-widest">
          Loading 3D Core...
        </span>
      </div>
    </div>
  ),
});

const HERO_TYPING_PHRASES = [
  "I can write your code with AST syntax checks.",
  "I can render live system architecture diagrams.",
  "I can draft your documents into DOCX & PDF.",
  "I can forge free SVG avatars on demand.",
  "I can auto-route your natural language intent.",
  "I can just talk with you naturally.",
];

export const HeroSection: React.FC = () => {
  return (
    <section className="relative min-h-screen pt-36 pb-20 flex flex-col items-center justify-center overflow-hidden">
      {/* Background Radial Glow Spotlights */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[700px] h-[700px] bg-brand-purple/20 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute top-1/3 left-1/4 w-[500px] h-[500px] bg-brand-pink/15 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 text-center z-10 w-full">
        {/* Eyebrow Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full border border-brand-purple/40 bg-brand-purple/10 backdrop-blur-md mb-8"
        >
          <Sparkles className="w-4 h-4 text-brand-pink animate-pulse" />
          <span className="font-mono text-xs text-brand-purpleBright uppercase tracking-widest">
            Next-Gen Agentic AI Orchestrator
          </span>
        </motion.div>

        {/* Title Reveal Typography */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="font-display font-extrabold text-6xl sm:text-8xl md:text-9xl tracking-tight text-ink uppercase"
        >
          E<span className="bg-gradient-to-r from-brand-purpleBright via-brand-pink to-brand-blue bg-clip-text text-transparent">K</span>A
        </motion.h1>

        {/* Subtitle Headline */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="font-display font-semibold text-2xl md:text-4xl text-ink mt-2 tracking-tight"
        >
          Your Intelligent Agentic AI Assistant
        </motion.p>

        {/* Interactive Typing & Deleting Prompt Line */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.45 }}
          className="mt-6 inline-flex items-center space-x-3 bg-void-card/80 border border-brand-purple/30 backdrop-blur-xl px-5 py-2.5 rounded-2xl shadow-xl max-w-2xl mx-auto"
        >
          <Terminal className="w-4 h-4 text-brand-pink shrink-0" />
          <span className="font-mono text-xs text-brand-purpleBright font-semibold">
            eka &gt;
          </span>
          <TypewriterText
            phrases={HERO_TYPING_PHRASES}
            className="font-mono text-xs text-ink font-medium"
            typingSpeed={45}
            deletingSpeed={20}
            pauseDuration={2000}
          />
        </motion.div>

        {/* Subheading Value Proposition extracted from README */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="font-body text-base md:text-lg text-ink-dim max-w-3xl mx-auto mt-6 leading-relaxed"
        >
          One conversational core that reads what you actually need and routes itself — 
          generating code, Mermaid diagrams, documents, and avatars automatically with AST verification.
        </motion.p>

        {/* CTA Button Group */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="flex flex-wrap items-center justify-center gap-4 mt-8"
        >
          <MagneticButton
            href="https://abhiraj1121.github.io/agenticai/"
            variant="primary"
            size="lg"
          >
            <span>Try EKA Now</span>
            <ArrowRight className="w-5 h-5 ml-1" />
          </MagneticButton>

          <MagneticButton href="#features" variant="secondary" size="lg">
            <span>Explore Capabilities</span>
          </MagneticButton>
        </motion.div>

        {/* Live Feature Badges */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.8 }}
          className="flex flex-wrap items-center justify-center gap-6 mt-10 font-mono text-xs text-ink-mute"
        >
          <span className="flex items-center space-x-2">
            <Zap className="w-4 h-4 text-brand-blue" />
            <span>Nemotron-3 Super Router</span>
          </span>
          <span className="flex items-center space-x-2">
            <ShieldCheck className="w-4 h-4 text-brand-pink" />
            <span>AST Static Verified</span>
          </span>
          <span className="flex items-center space-x-2">
            <Sparkles className="w-4 h-4 text-brand-purpleBright" />
            <span>BYOK Local Key Control</span>
          </span>
        </motion.div>

        {/* 3D WebGL Sphere Viewport */}
        <div className="relative mt-8">
          <CanvasContainer />
        </div>
      </div>
    </section>
  );
};
