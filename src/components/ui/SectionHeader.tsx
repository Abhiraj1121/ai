"use client";

import React from "react";
import { motion } from "framer-motion";
import { TypewriterText } from "./TypewriterText";

interface SectionHeaderProps {
  eyebrow: string;
  title: string;
  highlight?: string;
  highlightPhrases?: string[];
  description?: string;
  center?: boolean;
}

export const SectionHeader: React.FC<SectionHeaderProps> = ({
  eyebrow,
  title,
  highlight,
  highlightPhrases,
  description,
  center = true,
}) => {
  return (
    <div className={`max-w-4xl mb-16 ${center ? "mx-auto text-center" : ""}`}>
      {/* Eyebrow Badge */}
      <motion.span
        initial={{ opacity: 0, y: 15 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="font-mono text-xs uppercase tracking-[0.25em] text-brand-blue bg-brand-blue/10 border border-brand-blue/20 px-3.5 py-1 rounded-full inline-block mb-4 shadow-[0_0_15px_rgba(56,189,248,0.2)]"
      >
        {eyebrow}
      </motion.span>

      {/* Main Title Block */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7, delay: 0.1 }}
        className="font-display font-bold text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-ink leading-tight tracking-tight flex flex-col items-center justify-center space-y-2"
      >
        <span className="block">{title}</span>

        {/* Dedicated Centered Typewriter Line */}
        {highlightPhrases && highlightPhrases.length > 0 ? (
          <div className="min-h-[1.25em] flex items-center justify-center w-full">
            <TypewriterText
              phrases={highlightPhrases}
              typingSpeed={50}
              deletingSpeed={25}
              pauseDuration={2000}
              className="bg-gradient-to-r from-brand-purpleBright via-brand-pink to-brand-blue bg-clip-text text-transparent italic"
              cursorClassName="bg-brand-pink h-[0.8em] w-2"
            />
          </div>
        ) : (
          highlight && (
            <span className="bg-gradient-to-r from-brand-purpleBright via-brand-pink to-brand-blue bg-clip-text text-transparent italic">
              {highlight}
            </span>
          )
        )}
      </motion.div>

      {/* Section Description */}
      {description && (
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="font-body text-sm sm:text-base md:text-lg text-ink-dim mt-5 leading-relaxed max-w-2xl mx-auto"
        >
          {description}
        </motion.p>
      )}
    </div>
  );
};
