"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MagneticButton } from "../ui/MagneticButton";
import { EkaClassicLogo } from "../ui/EkaClassicLogo";
import { ArrowUpRight, Menu, X } from "lucide-react";

export const GlobalNavbar: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 30);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <motion.header
      initial={{ y: -50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 py-4 ${
        scrolled || mobileMenuOpen
          ? "bg-void/90 backdrop-blur-xl border-b border-brand-purple/20 shadow-lg"
          : "bg-transparent border-b border-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        {/* EKA Brand Logo */}
        <a href="#" className="flex items-center space-x-3 group">
          <div className="group-hover:scale-105 transition-transform duration-300 shadow-[0_0_20px_rgba(226,186,91,0.3)] rounded-full">
            <EkaClassicLogo size={42} />
          </div>
          <div className="flex flex-col">
            <span className="font-display font-bold text-lg text-ink tracking-tight flex items-center space-x-1.5">
              <span>EKA</span>
              <span className="w-1.5 h-1.5 rounded-full bg-[#E2BA5B] animate-pulse" />
            </span>
            <span className="font-mono text-[10px] text-ink-mute uppercase tracking-widest">
              Cognix Studio
            </span>
          </div>
        </a>

        {/* Desktop Navigation Anchors */}
        <nav className="hidden md:flex items-center space-x-8 text-sm font-medium text-ink-dim">
          <a href="#features" className="hover:text-ink transition-colors duration-200">
            Features
          </a>
          <a href="#topology" className="hover:text-ink transition-colors duration-200">
            Topology
          </a>
          <a href="#showcase" className="hover:text-ink transition-colors duration-200">
            Showcase
          </a>
          <a href="#matrix" className="hover:text-ink transition-colors duration-200">
            Comparison
          </a>
          <a href="#roadmap" className="hover:text-ink transition-colors duration-200">
            Roadmap
          </a>
        </nav>

        {/* Desktop CTA Button */}
        <div className="hidden md:flex items-center space-x-4">
          <a
            href="https://github.com/Abhiraj1121/agenticai"
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs font-mono text-ink-mute hover:text-ink transition-colors"
          >
            GitHub
          </a>
          <MagneticButton
            href="https://abhiraj1121.github.io/eka/"
            variant="primary"
            size="md"
          >
            <span>Try EKA Now</span>
            <ArrowUpRight className="w-4 h-4 ml-1" />
          </MagneticButton>
        </div>

        {/* Mobile Hamburger Menu Button */}
        <div className="flex md:hidden items-center space-x-3">
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-xl border border-white/10 bg-void-card/80 text-ink hover:text-brand-pink transition-colors"
            aria-label="Toggle Navigation Menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden border-t border-white/10 bg-void-surface/95 backdrop-blur-2xl px-6 py-6 space-y-4"
          >
            <nav className="flex flex-col space-y-3 font-mono text-sm text-ink-dim">
              <a
                href="#features"
                onClick={() => setMobileMenuOpen(false)}
                className="hover:text-brand-pink transition-colors py-1"
              >
                ✦ Features
              </a>
              <a
                href="#topology"
                onClick={() => setMobileMenuOpen(false)}
                className="hover:text-brand-pink transition-colors py-1"
              >
                ✦ Topology
              </a>
              <a
                href="#showcase"
                onClick={() => setMobileMenuOpen(false)}
                className="hover:text-brand-pink transition-colors py-1"
              >
                ✦ Showcase
              </a>
              <a
                href="#matrix"
                onClick={() => setMobileMenuOpen(false)}
                className="hover:text-brand-pink transition-colors py-1"
              >
                ✦ Comparison
              </a>
              <a
                href="#roadmap"
                onClick={() => setMobileMenuOpen(false)}
                className="hover:text-brand-pink transition-colors py-1"
              >
                ✦ Roadmap
              </a>
            </nav>

            <div className="pt-4 border-t border-white/10 flex flex-col space-y-3">
              <a
                href="https://github.com/Abhiraj1121/agenticai"
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs font-mono text-ink-mute hover:text-ink"
              >
                View GitHub Repository →
              </a>
              <MagneticButton
                href="https://abhiraj1121.github.io/eka/"
                variant="primary"
                size="md"
                className="w-full"
              >
                <span>Try EKA Now</span>
                <ArrowUpRight className="w-4 h-4 ml-1" />
              </MagneticButton>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
};
