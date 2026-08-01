"use client";

import React from "react";
import { motion } from "framer-motion";
import { SectionHeader } from "../ui/SectionHeader";
import { GlassCard } from "../ui/GlassCard";
import { TOPOLOGY_STEPS } from "@/lib/constants";
import { ArrowRight, CheckCircle2 } from "lucide-react";

export const SystemTopologySection: React.FC = () => {
  return (
    <section id="topology" className="py-24 relative z-10 bg-void-surface/40">
      <div className="max-w-7xl mx-auto px-6">
        <SectionHeader
          eyebrow="System Blueprint"
          title="How EKA Works."
          highlightPhrases={["Data Flow.", "Deterministic Pipeline.", "User to Synthesis."]}
          description="A transparent, deterministic agentic pipeline that turns raw intent into verified outputs."
        />

        {/* Linear Step Progression Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 relative">
          {TOPOLOGY_STEPS.map((step, idx) => (
            <motion.div
              key={step.step}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: idx * 0.12 }}
              className="relative"
            >
              <GlassCard className="h-full flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <span className="w-10 h-10 rounded-full bg-brand-purple/20 border border-brand-purpleBright/40 flex items-center justify-center font-mono font-bold text-sm text-brand-purpleBright">
                      {step.step}
                    </span>
                    <span className="font-mono text-[10px] text-brand-blue bg-brand-blue/10 border border-brand-blue/30 px-2 py-0.5 rounded-full">
                      {step.badge}
                    </span>
                  </div>

                  <h3 className="font-display font-bold text-lg text-ink mb-1">
                    {step.title}
                  </h3>
                  <p className="font-mono text-xs text-brand-pink mb-3">
                    {step.subtitle}
                  </p>

                  <p className="font-body text-sm text-ink-dim leading-relaxed">
                    {step.description}
                  </p>
                </div>

                <div className="mt-6 flex items-center space-x-2 text-xs font-mono text-ink-mute pt-4 border-t border-white/5">
                  <CheckCircle2 className="w-4 h-4 text-green-400" />
                  <span>State Verified</span>
                </div>
              </GlassCard>

              {/* Connecting Vector Arrow */}
              {idx < TOPOLOGY_STEPS.length - 1 && (
                <div className="hidden lg:flex absolute -right-3 top-1/2 -translate-y-1/2 z-20 text-brand-purpleBright">
                  <ArrowRight className="w-6 h-6 animate-pulse" />
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
