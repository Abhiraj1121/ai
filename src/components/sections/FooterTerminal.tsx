"use client";

import React from "react";
import { motion } from "framer-motion";
import { MagneticButton } from "../ui/MagneticButton";
import { EkaClassicLogo } from "../ui/EkaClassicLogo";
import { ArrowUpRight, Github, FileText, Terminal, Shield } from "lucide-react";

export const FooterTerminal: React.FC = () => {
  return (
    <footer className="relative pt-24 pb-12 border-t border-brand-purple/20 bg-void-card/60 z-10">
      <div className="max-w-7xl mx-auto px-6">
        {/* High-Intent Conversion Banner */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="rounded-3xl border border-brand-purple/40 bg-gradient-to-br from-brand-purple/20 via-void-card to-brand-blue/15 p-10 md:p-16 text-center relative overflow-hidden mb-20 shadow-[0_0_80px_rgba(139,92,246,0.2)]"
        >
          <div className="absolute top-0 right-0 w-96 h-96 bg-brand-pink/15 rounded-full blur-3xl pointer-events-none" />
          <div className="relative z-10 max-w-3xl mx-auto space-y-6">
            <span className="font-mono text-xs uppercase tracking-widest text-brand-pink bg-brand-pink/10 border border-brand-pink/30 px-3.5 py-1 rounded-full inline-block">
              Ready to Experience EKA?
            </span>

            <h2 className="font-display font-bold text-4xl md:text-6xl text-ink tracking-tight">
              One Conversation. <br />
              <span className="bg-gradient-to-r from-brand-purpleBright via-brand-pink to-brand-blue bg-clip-text text-transparent italic">
                Infinite Possibilities.
              </span>
            </h2>

            <p className="font-body text-base md:text-lg text-ink-dim leading-relaxed">
              Launch EKA now or inspect the full open-source codebase on GitHub. Zero configuration required.
            </p>

            <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
              <MagneticButton
                href="https://abhiraj1121.github.io/agenticai/"
                variant="primary"
                size="lg"
              >
                <span>Launch EKA Live</span>
                <ArrowUpRight className="w-5 h-5 ml-1" />
              </MagneticButton>

              <MagneticButton
                href="https://github.com/Abhiraj1121/agenticai"
                variant="secondary"
                size="lg"
              >
                <Github className="w-5 h-5 mr-2" />
                <span>View on GitHub</span>
              </MagneticButton>
            </div>
          </div>
        </motion.div>

        {/* Global Footer Links & Copyright */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 pt-8 border-t border-white/10 text-sm font-mono text-ink-mute">
          <div className="flex items-center space-x-3">
            <EkaClassicLogo size={28} />
            <span className="text-ink font-bold">Cognix Studio / EKA</span>
            <span>© {new Date().getFullYear()}</span>
          </div>

          <div className="flex items-center space-x-6">
            <a
              href="https://abhiraj1121.github.io/ai-tc/"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-ink transition-colors flex items-center space-x-1"
            >
              <Shield className="w-3.5 h-3.5" />
              <span>Legal Docs</span>
            </a>
            <a
              href="https://github.com/Abhiraj1121/agenticai"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-ink transition-colors flex items-center space-x-1"
            >
              <Github className="w-3.5 h-3.5" />
              <span>GitHub</span>
            </a>
            <a
              href="https://abhiraj1121.github.io/agenticai/"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-ink transition-colors flex items-center space-x-1"
            >
              <Terminal className="w-3.5 h-3.5" />
              <span>Live App</span>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};
