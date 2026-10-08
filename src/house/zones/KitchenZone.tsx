import React from "react";
import type { TierLevel } from "../deriveHouseState";

interface ZoneProps {
  level: TierLevel;
}

export const KitchenZone: React.FC<ZoneProps> = ({ level }) => {
  return (
    <g className="kitchen-zone" aria-hidden="true">
      {/* Background wall */}
      <rect x="380" y="320" width="260" height="180" fill="var(--color-house-wall)" vectorEffect="non-scaling-stroke" />

      {/* Kitchen Floor slab */}
      <line x1="380" y1="500" x2="640" y2="500" stroke="var(--color-house-stroke)" vectorEffect="non-scaling-stroke" />

      {/* LOW: Sparse, bare kitchen */}
      <g style={{ opacity: level === "LOW" ? 1 : 0, transition: "opacity var(--transition-meaningful) var(--easing)" }}>
        {/* Simple single table counter */}
        <rect x="520" y="440" width="100" height="60" fill="var(--color-house-woodLight)" opacity="0.6" vectorEffect="non-scaling-stroke" />
        <line x1="520" y1="440" x2="620" y2="440" stroke="var(--color-house-stroke)" vectorEffect="non-scaling-stroke" />
      </g>

      {/* MID: Functional cooking counter and overhead shelf */}
      <g style={{ opacity: level === "MID" ? 1 : 0, transition: "opacity var(--transition-meaningful) var(--easing)" }}>
        {/* Counter */}
        <rect x="500" y="430" width="120" height="70" fill="var(--color-house-wood)" vectorEffect="non-scaling-stroke" />
        <line x1="500" y1="430" x2="620" y2="430" stroke="var(--color-house-stroke)" vectorEffect="non-scaling-stroke" />
        <line x1="560" y1="430" x2="560" y2="500" stroke="var(--color-house-stroke)" vectorEffect="non-scaling-stroke" />
        {/* Overhead shelf */}
        <line x1="500" y1="370" x2="620" y2="370" stroke="var(--color-house-stroke)" vectorEffect="non-scaling-stroke" />
        <rect x="520" y="355" width="20" height="15" fill="var(--color-house-foundation)" vectorEffect="non-scaling-stroke" />
      </g>

      {/* HIGH: Well-stocked kitchen, dining bench and warm activity */}
      <g style={{ opacity: level === "HIGH" ? 1 : 0, transition: "opacity var(--transition-meaningful) var(--easing)" }}>
        {/* Main Cabinet & Counter */}
        <rect x="480" y="420" width="140" height="80" fill="var(--color-house-wood)" vectorEffect="non-scaling-stroke" />
        <line x1="480" y1="420" x2="620" y2="420" stroke="var(--color-house-stroke)" vectorEffect="non-scaling-stroke" />
        <line x1="550" y1="420" x2="550" y2="500" stroke="var(--color-house-stroke)" vectorEffect="non-scaling-stroke" />
        {/* Storage Shelves with cookware */}
        <line x1="480" y1="360" x2="620" y2="360" stroke="var(--color-house-stroke)" vectorEffect="non-scaling-stroke" />
        <line x1="480" y1="380" x2="620" y2="380" stroke="var(--color-house-stroke)" vectorEffect="non-scaling-stroke" />
        {/* Dining bench */}
        <rect x="410" y="450" width="55" height="50" fill="var(--color-house-woodLight)" vectorEffect="non-scaling-stroke" />
        <line x1="410" y1="450" x2="465" y2="450" stroke="var(--color-house-stroke)" vectorEffect="non-scaling-stroke" />
        {/* Warm pot on stove */}
        <rect x="510" y="405" width="24" height="15" fill="var(--color-house-woodDark)" vectorEffect="non-scaling-stroke" />
      </g>
    </g>
  );
};
