"use client";

import React, { useState, useEffect } from "react";

interface TypewriterTextProps {
  phrases: string[];
  typingSpeed?: number;
  deletingSpeed?: number;
  pauseDuration?: number;
  className?: string;
  cursorClassName?: string;
}

export const TypewriterText: React.FC<TypewriterTextProps> = ({
  phrases,
  typingSpeed = 50,
  deletingSpeed = 25,
  pauseDuration = 1800,
  className = "",
  cursorClassName = "",
}) => {
  const [text, setText] = useState("");
  const [phraseIndex, setPhraseIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    // Respect reduced motion preference
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (prefersReducedMotion) {
      setText(phrases[0] || "");
      return;
    }

    const currentPhrase = phrases[phraseIndex % phrases.length];

    const timer = setTimeout(
      () => {
        if (!isDeleting) {
          // Typing
          setText(currentPhrase.substring(0, text.length + 1));
          if (text.length + 1 === currentPhrase.length) {
            // Pause before deleting
            setTimeout(() => setIsDeleting(true), pauseDuration);
          }
        } else {
          // Deleting
          setText(currentPhrase.substring(0, text.length - 1));
          if (text.length - 1 === 0) {
            setIsDeleting(false);
            setPhraseIndex((prev) => (prev + 1) % phrases.length);
          }
        }
      },
      isDeleting ? deletingSpeed : typingSpeed
    );

    return () => clearTimeout(timer);
  }, [text, isDeleting, phraseIndex, phrases, typingSpeed, deletingSpeed, pauseDuration]);

  return (
    <span className="inline-flex items-center justify-center whitespace-nowrap">
      <span className={className}>{text}</span>
      <span
        className={`inline-block w-2.5 h-[0.8em] bg-brand-pink ml-1.5 animate-pulse align-middle shadow-[0_0_10px_#F472B6] ${cursorClassName}`}
      />
    </span>
  );
};
