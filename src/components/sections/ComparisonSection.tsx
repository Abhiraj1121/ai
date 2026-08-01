"use client";

import React from "react";
import { motion } from "framer-motion";
import { SectionHeader } from "../ui/SectionHeader";
import { GlassCard } from "../ui/GlassCard";
import { COMPARISON_DATA } from "@/lib/constants";
import { Check, X, ShieldCheck } from "lucide-react";

export const ComparisonSection: React.FC = () => {
  return (
    <section id="matrix" className="py-24 relative z-10 bg-void-surface/30">
      <div className="max-w-7xl mx-auto px-6">
        <SectionHeader
          eyebrow="Architectural Advantage"
          title="Why Choose EKA."
          highlightPhrases={["Performance Matrix.", "Zero Friction.", "100% BYOK Control."]}
          description="A direct side-by-side comparison between EKA's agentic orchestrator and legacy AI chat interfaces."
        />

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <GlassCard className="p-0 overflow-x-auto">
            <table className="w-full text-left border-collapse min-w-[640px]">
              <thead>
                <tr className="border-b border-white/10 bg-void-card/80 font-mono text-xs text-ink-mute uppercase tracking-wider">
                  <th className="py-5 px-6">Feature Capability</th>
                  <th className="py-5 px-6 text-brand-purpleBright font-bold">
                    EKA Agentic Platform
                  </th>
                  <th className="py-5 px-6 text-ink-dim">Traditional AI UIs</th>
                  <th className="py-5 px-6 text-brand-pink">EKA Advantage</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5 font-body text-sm">
                {COMPARISON_DATA.map((row) => (
                  <tr
                    key={row.feature}
                    className="hover:bg-white/[0.02] transition-colors duration-200"
                  >
                    <td className="py-5 px-6 font-bold text-ink flex items-center space-x-2">
                      <ShieldCheck className="w-4 h-4 text-brand-purple" />
                      <span>{row.feature}</span>
                    </td>

                    <td className="py-5 px-6 font-semibold text-brand-purpleBright">
                      <div className="flex items-center space-x-2">
                        <Check className="w-4 h-4 text-green-400 shrink-0" />
                        <span>{row.eka}</span>
                      </div>
                    </td>

                    <td className="py-5 px-6 text-ink-dim">
                      <div className="flex items-center space-x-2">
                        <X className="w-4 h-4 text-red-400 shrink-0" />
                        <span>{row.traditional}</span>
                      </div>
                    </td>

                    <td className="py-5 px-6 font-mono text-xs text-brand-pink">
                      <span className="bg-brand-pink/10 border border-brand-pink/30 px-2.5 py-1 rounded-full">
                        {row.advantage}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </GlassCard>
        </motion.div>
      </div>
    </section>
  );
};
