"use client";

import React from "react";
import { GlobalNavbar } from "@/components/sections/GlobalNavbar";
import { HeroSection } from "@/components/sections/HeroSection";
import { FeatureGridSection } from "@/components/sections/FeatureGridSection";
import { SystemTopologySection } from "@/components/sections/SystemTopologySection";
import { InteractiveShowcase } from "@/components/sections/InteractiveShowcase";
import { ComparisonSection } from "@/components/sections/ComparisonSection";
import { RoadmapSection } from "@/components/sections/RoadmapSection";
import { FooterTerminal } from "@/components/sections/FooterTerminal";

export default function Home() {
  return (
    <main className="min-h-screen bg-void text-ink relative overflow-hidden">
      {/* Global Background Ambient Grid & Particles */}
      <div className="fixed inset-0 pointer-events-none z-0">
        {/* Ambient Blurred Light Orbs */}
        <div className="absolute top-[-10%] left-[-10%] w-[600px] h-[600px] bg-brand-purple/15 rounded-full blur-[140px]" />
        <div className="absolute top-[40%] right-[-10%] w-[500px] h-[500px] bg-brand-pink/10 rounded-full blur-[140px]" />
        <div className="absolute bottom-[-10%] left-[20%] w-[600px] h-[600px] bg-brand-blue/10 rounded-full blur-[140px]" />
        
        {/* Subtle Radial Grid overlay */}
        <div 
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `radial-gradient(rgba(255, 255, 255, 0.4) 1px, transparent 1px)`,
            backgroundSize: '24px 24px',
          }}
        />
      </div>

      <GlobalNavbar />
      <HeroSection />
      <FeatureGridSection />
      <SystemTopologySection />
      <InteractiveShowcase />
      <ComparisonSection />
      <RoadmapSection />
      <FooterTerminal />
    </main>
  );
}
