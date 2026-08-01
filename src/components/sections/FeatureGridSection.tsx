"use client";

import React from "react";
import { motion } from "framer-motion";
import { SectionHeader } from "../ui/SectionHeader";
import { GlassCard } from "../ui/GlassCard";
import { EKA_FEATURES } from "@/lib/constants";
import {
  Brain,
  Cpu,
  Code,
  Network,
  FileText,
  Sparkles,
  Globe,
  Key,
  ShieldCheck,
  Terminal,
} from "lucide-react";

const ICON_MAP: Record<string, React.ElementType> = {
  Brain,
  Cpu,
  Code,
  Network,
  FileText,
  Sparkles,
  Globe,
  Key,
  ShieldCheck,
};

export const FeatureGridSection: React.FC = () => {
  return (
    <section id="features" className="py-24 relative z-10">
      <div className="max-w-7xl mx-auto px-6">
        <SectionHeader
          eyebrow="Core Capabilities"
          title="Seven Skills."
          highlightPhrases={["One Core.", "One Conversation.", "Seven Tools."]}
          description="Every tool lives behind the same conversational box — EKA reads intent and routes specialist models automatically."
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {EKA_FEATURES.map((feature, idx) => {
            const IconComponent = ICON_MAP[feature.icon] || Terminal;
            return (
              <motion.div
                key={feature.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: idx * 0.08 }}
              >
                <GlassCard className="h-full flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between mb-6">
                      <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-brand-purple/20 via-brand-pink/20 to-brand-blue/20 border border-brand-purple/40 flex items-center justify-center text-brand-purpleBright">
                        <IconComponent className="w-6 h-6" />
                      </div>
                      <span className="font-mono text-[11px] text-brand-pink border border-brand-pink/30 bg-brand-pink/10 px-2.5 py-0.5 rounded-full">
                        {feature.tag}
                      </span>
                    </div>

                    <h3 className="font-display font-bold text-xl text-ink mb-3 tracking-tight">
                      {feature.title}
                    </h3>
                    <p className="font-body text-sm text-ink-dim leading-relaxed">
                      {feature.description}
                    </p>
                  </div>

                  {feature.command && (
                    <div className="mt-6 pt-4 border-t border-white/5 font-mono text-xs text-brand-blue bg-void/50 px-3 py-2 rounded-lg border border-brand-blue/20 flex items-center justify-between">
                      <span>{feature.command}</span>
                      <span className="text-[10px] text-ink-mute">SHORTCUT</span>
                    </div>
                  )}
                </GlassCard>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
