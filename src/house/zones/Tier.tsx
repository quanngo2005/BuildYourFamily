import React from "react";

// Crossfading wrapper for one tier variant of a zone
export const Tier: React.FC<{ show: boolean; children: React.ReactNode }> = ({ show, children }) => (
  <g style={{ opacity: show ? 1 : 0, transition: "opacity var(--transition-meaningful) var(--easing)" }}>
    {children}
  </g>
);

// Shared stroke props for line art
export const ink = {
  stroke: "var(--color-house-stroke)",
  vectorEffect: "non-scaling-stroke" as const,
};
