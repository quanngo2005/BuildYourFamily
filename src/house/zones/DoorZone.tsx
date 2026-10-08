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
    </g>
  );
};
