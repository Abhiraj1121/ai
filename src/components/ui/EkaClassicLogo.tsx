"use client";

import React from "react";

interface EkaClassicLogoProps {
  className?: string;
  size?: number;
}

export const EkaClassicLogo: React.FC<EkaClassicLogoProps> = ({
  className = "",
  size = 40,
}) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`shrink-0 ${className}`}
    >
      {/* Outer Rich Black Base */}
      <circle cx="50" cy="50" r="49" fill="#0A080E" stroke="#1F1A10" strokeWidth="1" />

      {/* Concentric Subtle Gold Ring 1 */}
      <circle cx="50" cy="50" r="43" fill="none" stroke="#3D321A" strokeWidth="0.8" />

      {/* Concentric Subtle Gold Ring 2 */}
      <circle cx="50" cy="50" r="35" fill="none" stroke="#4A3D20" strokeWidth="0.8" />

      {/* Inner Classic Gold Disc */}
      <circle cx="50" cy="50" r="19.5" fill="#E2BA5B" />

      {/* Central Black 4-Point Classic Star Cutout */}
      <path
        d="M 50 33.5 C 50 44 44 50 33.5 50 C 44 50 50 56 50 66.5 C 50 56 56 50 66.5 50 C 56 50 50 44 50 33.5 Z"
        fill="#0A080E"
      />
    </svg>
  );
};
