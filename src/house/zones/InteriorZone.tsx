import React from "react";
import type { TierLevel } from "../deriveHouseState";

interface ZoneProps {
  level: TierLevel;
}

export const InteriorZone: React.FC<ZoneProps> = ({ level }) => {
  return (
    <g className="interior-zone" aria-hidden="true">
      {/* Background wall */}
      <rect x="380" y="160" width="260" height="160" fill="var(--color-house-wall)" vectorEffect="non-scaling-stroke" />

      {/* Floor line */}
      <line x1="380" y1="320" x2="640" y2="320" stroke="var(--color-house-stroke)" vectorEffect="non-scaling-stroke" />

      {/* LOW: Cold, dark, bare interior with no light */}
      <g style={{ opacity: level === "LOW" ? 1 : 0, transition: "opacity var(--transition-meaningful) var(--easing)" }}>
        {/* Closed unlit window */}
        <rect x="490" y="185" width="60" height="60" fill="var(--color-house-foundation)" opacity="0.3" vectorEffect="non-scaling-stroke" />
        <rect x="490" y="185" width="60" height="60" fill="none" stroke="var(--color-house-stroke)" vectorEffect="non-scaling-stroke" />
        {/* Isolated chair in corner */}
        <line x1="590" y1="280" x2="620" y2="280" stroke="var(--color-house-stroke)" vectorEffect="non-scaling-stroke" />
        <line x1="595" y1="280" x2="595" y2="320" stroke="var(--color-house-stroke)" vectorEffect="non-scaling-stroke" />
        <line x1="615" y1="280" x2="615" y2="320" stroke="var(--color-house-stroke)" vectorEffect="non-scaling-stroke" />
      </g>

      {/* MID: Neutral living space, warm light wash from window */}
      <g style={{ opacity: level === "MID" ? 1 : 0, transition: "opacity var(--transition-meaningful) var(--easing)" }}>
        {/* Warm light wash from window */}
        <polygon points="480,180 560,180 585,320 455,320" fill="var(--color-house-light)" opacity="0.3" vectorEffect="non-scaling-stroke" />
        {/* Window with panes */}
        <rect x="480" y="180" width="80" height="65" fill="none" stroke="var(--color-house-stroke)" vectorEffect="non-scaling-stroke" />
        <line x1="520" y1="180" x2="520" y2="245" stroke="var(--color-house-stroke)" vectorEffect="non-scaling-stroke" />
        <line x1="480" y1="212" x2="560" y2="212" stroke="var(--color-house-stroke)" vectorEffect="non-scaling-stroke" />
        {/* Central low tea table */}
        <rect x="440" y="295" width="70" height="8" fill="var(--color-house-wood)" vectorEffect="non-scaling-stroke" />
        <line x1="440" y1="295" x2="510" y2="295" stroke="var(--color-house-stroke)" vectorEffect="non-scaling-stroke" />
        <line x1="450" y1="303" x2="450" y2="320" stroke="var(--color-house-stroke)" vectorEffect="non-scaling-stroke" />
        <line x1="500" y1="303" x2="500" y2="320" stroke="var(--color-house-stroke)" vectorEffect="non-scaling-stroke" />
      </g>

      {/* HIGH: Vibrant warmth, radiant light, central tea set, indoor planter */}
      <g style={{ opacity: level === "HIGH" ? 1 : 0, transition: "opacity var(--transition-meaningful) var(--easing)" }}>
        {/* Generous warm light field */}
        <polygon points="460,175 580,175 620,320 420,320" fill="var(--color-house-light)" opacity="0.45" vectorEffect="non-scaling-stroke" />
        {/* Ceiling pendant lamp cord & shade */}
        <line x1="520" y1="160" x2="520" y2="195" stroke="var(--color-house-stroke)" vectorEffect="non-scaling-stroke" />
        <polygon points="505,205 535,205 528,195 512,195" fill="var(--color-house-wood)" stroke="var(--color-house-stroke)" vectorEffect="non-scaling-stroke" />
        <circle cx="520" cy="208" r="4" fill="var(--color-house-light)" vectorEffect="non-scaling-stroke" />
        {/* Large sunlit double window */}
        <rect x="450" y="180" width="100" height="70" fill="none" stroke="var(--color-house-stroke)" vectorEffect="non-scaling-stroke" />
        <line x1="500" y1="180" x2="500" y2="250" stroke="var(--color-house-stroke)" vectorEffect="non-scaling-stroke" />
        <line x1="450" y1="215" x2="550" y2="215" stroke="var(--color-house-stroke)" vectorEffect="non-scaling-stroke" />
        {/* Family gathering table & cushions */}
        <rect x="460" y="290" width="85" height="10" fill="var(--color-house-wood)" vectorEffect="non-scaling-stroke" />
        <line x1="460" y1="290" x2="545" y2="290" stroke="var(--color-house-stroke)" vectorEffect="non-scaling-stroke" />
        <line x1="470" y1="300" x2="470" y2="320" stroke="var(--color-house-stroke)" vectorEffect="non-scaling-stroke" />
        <line x1="535" y1="300" x2="535" y2="320" stroke="var(--color-house-stroke)" vectorEffect="non-scaling-stroke" />
        {/* Teapot & cups */}
        <circle cx="495" cy="285" r="4" fill="var(--color-house-wall)" stroke="var(--color-house-stroke)" vectorEffect="non-scaling-stroke" />
        <circle cx="510" cy="287" r="2.5" fill="var(--color-house-wall)" stroke="var(--color-house-stroke)" vectorEffect="non-scaling-stroke" />
        {/* Indoor potted plant */}
        <rect x="585" y="295" width="22" height="25" fill="var(--color-house-woodLight)" stroke="var(--color-house-stroke)" vectorEffect="non-scaling-stroke" />
        <circle cx="596" cy="285" r="9" fill="var(--color-house-greenery)" stroke="var(--color-house-stroke)" vectorEffect="non-scaling-stroke" />
      </g>
    </g>
  );
};
