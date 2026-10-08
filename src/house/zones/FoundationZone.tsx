import React from "react";
import type { TierLevel } from "../deriveHouseState";

interface ZoneProps {
  level: TierLevel;
}

export const FoundationZone: React.FC<ZoneProps> = ({ level }) => {
  return (
    <g className="foundation-zone" aria-hidden="true">
      {/* Shared outline / silhouette (X=160 to 640, Y=500 to 540) */}
      <rect
        x="160"
        y="500"
        width="480"
        height="40"
        fill="var(--color-house-foundation)"
        vectorEffect="non-scaling-stroke"
      />

      {/* LOW: Cracked and uneven foundation lines */}
      <g style={{ opacity: level === "LOW" ? 1 : 0, transition: "opacity var(--transition-meaningful) var(--easing)" }}>
        <path
          d="M 220 500 L 235 520 L 225 540 M 380 500 L 395 525 L 410 540 M 520 505 L 530 520 L 525 538"
          stroke="var(--color-house-crack)"
          strokeWidth="var(--house-stroke-width)"
          fill="none"
          vectorEffect="non-scaling-stroke"
        />
        <line x1="160" y1="520" x2="640" y2="520" stroke="var(--color-house-stroke)" strokeDasharray="6 6" opacity="0.4" vectorEffect="non-scaling-stroke" />
      </g>

      {/* MID: Solid coursed masonry */}
      <g style={{ opacity: level === "MID" ? 1 : 0, transition: "opacity var(--transition-meaningful) var(--easing)" }}>
        <line x1="160" y1="520" x2="640" y2="520" stroke="var(--color-house-stroke)" vectorEffect="non-scaling-stroke" />
        <line x1="280" y1="500" x2="280" y2="520" stroke="var(--color-house-stroke)" vectorEffect="non-scaling-stroke" />
        <line x1="400" y1="520" x2="400" y2="540" stroke="var(--color-house-stroke)" vectorEffect="non-scaling-stroke" />
        <line x1="520" y1="500" x2="520" y2="520" stroke="var(--color-house-stroke)" vectorEffect="non-scaling-stroke" />
      </g>

      {/* HIGH: Reinforced double-tier plinth with solid hatching */}
      <g style={{ opacity: level === "HIGH" ? 1 : 0, transition: "opacity var(--transition-meaningful) var(--easing)" }}>
        <rect x="145" y="535" width="510" height="15" fill="var(--color-house-woodDark)" vectorEffect="non-scaling-stroke" />
        <line x1="160" y1="520" x2="640" y2="520" stroke="var(--color-house-stroke)" vectorEffect="non-scaling-stroke" />
        {/* Reinforced hatching ticks */}
        <path
          d="M 180 520 L 195 500 M 240 520 L 255 500 M 300 520 L 315 500 M 360 520 L 375 500 M 420 520 L 435 500 M 480 520 L 495 500 M 540 520 L 555 500 M 600 520 L 615 500"
          stroke="var(--color-house-stroke)"
          opacity="0.3"
          vectorEffect="non-scaling-stroke"
        />
      </g>
    </g>
  );
};
