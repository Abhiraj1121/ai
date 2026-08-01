"use client";

import React from "react";
import { motion } from "framer-motion";
import { SectionHeader } from "../ui/SectionHeader";
import { GlassCard } from "../ui/GlassCard";
import { ROADMAP_DATA } from "@/lib/constants";
import { Sparkles, Clock, CheckCircle } from "lucide-react";

export const RoadmapSection: React.FC = () => {
  return (
    <section id="roadmap" className="py-24 relative z-10">
      <div className="max-w-7xl mx-auto px-6">
        <SectionHeader
          eyebrow="Future Horizon"
          title="Product Roadmap."
          highlightPhrases={["Evolution.", "Shipped & Planned.", "Enterprise Vision."]}
          description="Explicit engineering milestones delineating upcoming features from EKA's official roadmap."
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {ROADMAP_DATA.map((item, idx) => {
            const isDone = item.status === "completed";
            const isInProgress = item.status === "in-progress";

            return (
              <motion.div
                key={item.quarter}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: idx * 0.1 }}
              >
                <GlassCard className="h-full flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <span className="font-mono text-xs font-bold text-brand-purpleBright px-3 py-1 rounded-full bg-brand-purple/10 border border-brand-purple/30">
                        {item.quarter}
                      </span>

                      {isDone ? (
                        <span className="flex items-center space-x-1 font-mono text-[10px] text-green-400 bg-green-500/10 border border-green-500/20 px-2 py-0.5 rounded-full">
                          <CheckCircle className="w-3 h-3" />
                          <span>SHIPPED</span>
                        </span>
                      ) : isInProgress ? (
                        <span className="flex items-center space-x-1 font-mono text-[10px] text-brand-pink bg-brand-pink/10 border border-brand-pink/20 px-2 py-0.5 rounded-full animate-pulse">
                          <Sparkles className="w-3 h-3" />
                          <span>IN PROGRESS</span>
                        </span>
                      ) : (
                        <span className="flex items-center space-x-1 font-mono text-[10px] text-ink-mute bg-white/5 border border-white/10 px-2 py-0.5 rounded-full">
                          <Clock className="w-3 h-3" />
                          <span>PLANNED</span>
                        </span>
                      )}
                    </div>

                    <h3 className="font-display font-bold text-lg text-ink mb-2">
                      {item.title}
                    </h3>
                    <p className="font-body text-sm text-ink-dim leading-relaxed">
                      {item.description}
                    </p>
                  </div>

                  <div className="mt-6 pt-4 border-t border-white/5 text-[11px] font-mono text-ink-mute">
                    <span>EKA Core Spec</span>
                  </div>
                </GlassCard>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
