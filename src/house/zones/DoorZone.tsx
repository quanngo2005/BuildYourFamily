import React from "react";
import type { TierLevel } from "../deriveHouseState";

interface ZoneProps {
  level: TierLevel;
}

export const DoorZone: React.FC<ZoneProps> = ({ level }) => {
  return (
    <g className="door-zone" aria-hidden="true">
      {/* Outer Door Frame Boundary */}
      <rect x="210" y="370" width="90" height="130" fill="var(--color-house-wall)" vectorEffect="non-scaling-stroke" />

      {/* LOW: Heavily barred, padlocked door, restricted */}
      <g style={{ opacity: level === "LOW" ? 1 : 0, transition: "opacity var(--transition-meaningful) var(--easing)" }}>
        {/* Door pane */}
        <rect x="215" y="375" width="80" height="125" fill="var(--color-house-woodDark)" opacity="0.8" vectorEffect="non-scaling-stroke" />
        <rect x="215" y="375" width="80" height="125" fill="none" stroke="var(--color-house-stroke)" vectorEffect="non-scaling-stroke" />
        {/* Restrictive cross bars */}
        <line x1="215" y1="400" x2="295" y2="400" stroke="var(--color-house-stroke)" vectorEffect="non-scaling-stroke" />
        <line x1="215" y1="440" x2="295" y2="440" stroke="var(--color-house-stroke)" vectorEffect="non-scaling-stroke" />
        <line x1="215" y1="480" x2="295" y2="480" stroke="var(--color-house-stroke)" vectorEffect="non-scaling-stroke" />
        {/* Padlock mark */}
        <rect x="248" y="432" width="14" height="16" fill="var(--color-house-foundation)" stroke="var(--color-house-stroke)" vectorEffect="non-scaling-stroke" />
      </g>

      {/* MID: Standard paneled wooden front door */}
      <g style={{ opacity: level === "MID" ? 1 : 0, transition: "opacity var(--transition-meaningful) var(--easing)" }}>
        <rect x="215" y="375" width="80" height="125" fill="var(--color-house-wood)" vectorEffect="non-scaling-stroke" />
        <rect x="215" y="375" width="80" height="125" fill="none" stroke="var(--color-house-stroke)" vectorEffect="non-scaling-stroke" />
        {/* Clean panels */}
        <rect x="225" y="388" width="26" height="42" fill="none" stroke="var(--color-house-stroke)" vectorEffect="non-scaling-stroke" />
        <rect x="259" y="388" width="26" height="42" fill="none" stroke="var(--color-house-stroke)" vectorEffect="non-scaling-stroke" />
        <rect x="225" y="442" width="26" height="46" fill="none" stroke="var(--color-house-stroke)" vectorEffect="non-scaling-stroke" />
        <rect x="259" y="442" width="26" height="46" fill="none" stroke="var(--color-house-stroke)" vectorEffect="non-scaling-stroke" />
        {/* Handle */}
        <circle cx="288" cy="442" r="3" fill="var(--color-house-stroke)" vectorEffect="non-scaling-stroke" />
      </g>

      {/* HIGH: Wide, inviting double door with warm welcoming threshold */}
      <g style={{ opacity: level === "HIGH" ? 1 : 0, transition: "opacity var(--transition-meaningful) var(--easing)" }}>
        {/* Symmetrical double door frame */}
        <rect x="210" y="370" width="90" height="130" fill="var(--color-house-woodLight)" vectorEffect="non-scaling-stroke" />
        <rect x="210" y="370" width="90" height="130" fill="none" stroke="var(--color-house-stroke)" vectorEffect="non-scaling-stroke" />
        {/* Central split line */}
        <line x1="255" y1="370" x2="255" y2="500" stroke="var(--color-house-stroke)" vectorEffect="non-scaling-stroke" />
        {/* Symmetrical glass transoms on top */}
        <rect x="218" y="378" width="30" height="24" fill="var(--color-house-light)" opacity="0.6" stroke="var(--color-house-stroke)" vectorEffect="non-scaling-stroke" />
        <rect x="262" y="378" width="30" height="24" fill="var(--color-house-light)" opacity="0.6" stroke="var(--color-house-stroke)" vectorEffect="non-scaling-stroke" />
        {/* Matched handles */}
        <circle cx="250" cy="442" r="2.5" fill="var(--color-house-stroke)" vectorEffect="non-scaling-stroke" />
        <circle cx="260" cy="442" r="2.5" fill="var(--color-house-stroke)" vectorEffect="non-scaling-stroke" />
        {/* Open threshold line */}
        <line x1="205" y1="500" x2="305" y2="500" stroke="var(--color-house-stroke)" strokeWidth="var(--house-stroke-width-emphasis)" vectorEffect="non-scaling-stroke" />
      </g>
      {/* Entrance hall: doormat for all; coat rack, shoes and wall light once the home is welcoming */}
      <rect x="208" y="497" width="94" height="4" rx="1" fill="var(--color-house-crack)" opacity="0.7" />
      <g style={{ opacity: level === "LOW" ? 0 : 1, transition: "opacity var(--transition-meaningful) var(--easing)" }}>
        {/* Wall sconce above the door */}
        <rect x="249" y="350" width="12" height="10" rx="2" fill="var(--color-house-light)" stroke="var(--color-house-stroke)" vectorEffect="non-scaling-stroke" />
        <circle className="nha-lamp-glow" cx="255" cy="356" r="12" fill="var(--color-house-light)" opacity="0.4" />
        {/* Coat rack with a coat and a hat */}
        <line x1="335" y1="395" x2="335" y2="500" stroke="var(--color-house-stroke)" strokeWidth="2" vectorEffect="non-scaling-stroke" />
        <line x1="325" y1="500" x2="345" y2="500" stroke="var(--color-house-stroke)" strokeWidth="2" vectorEffect="non-scaling-stroke" />
        <path d="M 325 402 l 10 -6 l 10 6" fill="none" stroke="var(--color-house-stroke)" strokeWidth="2" vectorEffect="non-scaling-stroke" />
        <path d="M 327 404 h 14 l 4 40 h -22 z" fill="var(--color-house-greenery)" stroke="var(--color-house-stroke)" vectorEffect="non-scaling-stroke" />
        <path d="M 340 398 q 8 -10 14 0 z" fill="var(--color-house-woodDark)" stroke="var(--color-house-stroke)" vectorEffect="non-scaling-stroke" />
        {/* Shoes by the door */}
        <path d="M 312 500 v -6 h 6 q 6 2 8 6 z" fill="var(--color-house-woodDark)" stroke="var(--color-house-stroke)" vectorEffect="non-scaling-stroke" />
        <path d="M 352 500 v -5 h 5 q 5 2 6 5 z" fill="var(--color-house-crack)" stroke="var(--color-house-stroke)" vectorEffect="non-scaling-stroke" />
      </g>
    </g>
  );
};
