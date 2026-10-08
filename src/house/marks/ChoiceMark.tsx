import React from "react";
import type { Zone, Kind } from "../../game/types";
import { ZONE_SLOTS } from "../geometry";

interface ChoiceMarkProps {
  zone: Zone;
  kind: Kind;
  slot: number;
  isEmphasized?: boolean;
}

export const ChoiceMark: React.FC<ChoiceMarkProps> = ({
  zone,
  kind,
  slot,
  isEmphasized = false,
}) => {
  const slotsForZone = ZONE_SLOTS[zone] || [];
  const coords = slotsForZone[slot] || slotsForZone[0] || { x: 400, y: 300 };

  const strokeWidth = isEmphasized
    ? "var(--house-stroke-width-emphasis)"
    : "var(--house-stroke-width)";

  return (
    <g
      className={`choice-mark mark-${kind} ${isEmphasized ? "reveal-step-mark is-emphasized" : ""}`}
      transform={`translate(${coords.x}, ${coords.y})`}
      aria-hidden="true"
    >
      {kind === "crack" && (
        <path
          d="M -12 -12 L -4 -2 L 4 -8 L 12 12"
          stroke="var(--color-house-crack)"
          strokeWidth={strokeWidth}
          fill="none"
          strokeLinecap="round"
          vectorEffect="non-scaling-stroke"
        />
      )}

      {kind === "reinforce" && (
        <g>
          {/* Steel strap / bracing bracket */}
          <line
            x1="-12"
            y1="-12"
            x2="12"
            y2="12"
            stroke="var(--color-house-stroke)"
            strokeWidth={strokeWidth}
            vectorEffect="non-scaling-stroke"
          />
          <line
            x1="-12"
            y1="12"
            x2="12"
            y2="-12"
            stroke="var(--color-house-stroke)"
            strokeWidth={strokeWidth}
            vectorEffect="non-scaling-stroke"
          />
          <circle cx="0" cy="0" r="3" fill="var(--color-house-woodDark)" stroke="var(--color-house-stroke)" vectorEffect="non-scaling-stroke" />
        </g>
      )}

      {kind === "build" && (
        <g>
          {/* Newly fitted solid ashlar block */}
          <rect
            x="-14"
            y="-10"
            width="28"
            height="20"
            fill="var(--color-house-woodLight)"
            stroke="var(--color-house-stroke)"
            strokeWidth={strokeWidth}
            vectorEffect="non-scaling-stroke"
          />
          <line x1="-14" y1="0" x2="14" y2="0" stroke="var(--color-house-stroke)" strokeWidth={strokeWidth} vectorEffect="non-scaling-stroke" />
        </g>
      )}

      {kind === "light" && (
        <g>
          {/* Warm radiant glowing point */}
          <circle cx="0" cy="0" r="6" fill="var(--color-house-light)" stroke="var(--color-house-stroke)" strokeWidth={strokeWidth} vectorEffect="non-scaling-stroke" />
          <line x1="0" y1="-11" x2="0" y2="-7" stroke="var(--color-house-stroke)" vectorEffect="non-scaling-stroke" />
          <line x1="0" y1="7" x2="0" y2="11" stroke="var(--color-house-stroke)" vectorEffect="non-scaling-stroke" />
          <line x1="-11" y1="0" x2="-7" y2="0" stroke="var(--color-house-stroke)" vectorEffect="non-scaling-stroke" />
          <line x1="7" y1="0" x2="11" y2="0" stroke="var(--color-house-stroke)" vectorEffect="non-scaling-stroke" />
        </g>
      )}

      {kind === "dim" && (
        <g opacity="0.6">
          {/* Subtle shading hatch lines */}
          <line x1="-10" y1="10" x2="10" y2="-10" stroke="var(--color-house-stroke)" strokeWidth={strokeWidth} vectorEffect="non-scaling-stroke" />
          <line x1="-6" y1="12" x2="12" y2="-6" stroke="var(--color-house-stroke)" strokeWidth={strokeWidth} vectorEffect="non-scaling-stroke" />
          <line x1="-12" y1="6" x2="6" y2="-12" stroke="var(--color-house-stroke)" strokeWidth={strokeWidth} vectorEffect="non-scaling-stroke" />
        </g>
      )}

      {kind === "open" && (
        <g>
          {/* Clear open arrow / arc indication */}
          <path
            d="M -10 6 A 12 12 0 0 1 10 -6"
            stroke="var(--color-house-stroke)"
            strokeWidth={strokeWidth}
            fill="none"
            vectorEffect="non-scaling-stroke"
          />
          <polyline points="6,-10 10,-6 6,-2" fill="none" stroke="var(--color-house-stroke)" strokeWidth={strokeWidth} vectorEffect="non-scaling-stroke" />
        </g>
      )}
    </g>
  );
};
