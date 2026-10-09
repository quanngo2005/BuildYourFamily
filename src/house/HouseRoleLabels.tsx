import React from "react";
import type { Dimension, Zone } from "../game/types";
import type { TierLevel } from "./deriveHouseState";

export const DIMENSION_LABEL_VI: Record<Dimension, string> = {
  economy: "Kinh tế",
  education: "Giáo dục",
  equality: "Bình đẳng",
  emotion: "Tình cảm",
};

export const DIMENSION_ICON: Record<Dimension, string> = {
  economy: "💰",
  education: "📚",
  equality: "⚖️",
  emotion: "❤️",
};

export const DIMENSION_COLOR: Record<Dimension, string> = {
  economy: "#B7791F",
  education: "#3B6EA5",
  equality: "#7A5BA6",
  emotion: "#C0566B",
};

export const TIER_LABEL_VI: Record<TierLevel, string> = {
  LOW: "Yếu",
  MID: "Ổn định",
  HIGH: "Vững chắc",
};

const TIER_PIPS: Record<TierLevel, number> = { LOW: 1, MID: 2, HIGH: 3 };

interface RoleTag {
  zone: Zone;
  name: string;
  dim: Dimension;
  x: number; // left edge of the tag in viewBox units
  y: number; // vertical center
}

// One tag per part of the house, placed where it doesn't cover furniture
export const ROLE_TAGS: RoleTag[] = [
  { zone: "structure", name: "Mái nhà", dim: "equality", x: 318, y: 112 },
  { zone: "study", name: "Phòng học", dim: "education", x: 166, y: 174 },
  { zone: "interior", name: "Phòng khách", dim: "emotion", x: 386, y: 174 },
  { zone: "door", name: "Cửa chính", dim: "equality", x: 168, y: 340 },
  { zone: "kitchen", name: "Bếp", dim: "economy", x: 386, y: 340 },
  { zone: "foundation", name: "Nền móng", dim: "economy", x: 318, y: 520 },
];

// Rough text width estimate (deterministic, no DOM measuring)
const textWidth = (s: string, size: number) => s.length * size * 0.56;

export const HouseRoleLabels: React.FC<{
  levels: Record<Dimension, TierLevel>;
  activeDims?: Dimension[];
}> = ({ levels, activeDims = [] }) => (
  <g className="nha-role-labels" aria-hidden="true">
    {ROLE_TAGS.map((tag) => {
      const color = DIMENSION_COLOR[tag.dim];
      const nameW = textWidth(tag.name, 15);
      const dimText = DIMENSION_LABEL_VI[tag.dim];
      const dimW = textWidth(dimText, 12) + 10;
      const pipsW = 3 * 7;
      const w = 12 + nameW + 8 + dimW + 8 + pipsW + 8;
      const h = 24;
      const top = tag.y - h / 2;
      const filled = TIER_PIPS[levels[tag.dim]];
      const isActive = activeDims.includes(tag.dim);
      return (
        <g key={tag.zone} className={`nha-role-tag ${isActive ? "is-active" : ""}`} style={{ "--tag-color": color } as React.CSSProperties}>
          <rect x={tag.x} y={top} width={w} height={h} rx={12} className="nha-role-tag-bg" />
          <circle cx={tag.x + 9} cy={tag.y} r={3.5} fill={color} />
          <text x={tag.x + 16} y={tag.y + 5} className="nha-role-tag-name">
            {tag.name}
          </text>
          {/* Dimension chip */}
          <rect x={tag.x + 16 + nameW + 4} y={top + 3} width={dimW} height={h - 6} rx={7} fill={color} />
          <text x={tag.x + 16 + nameW + 4 + dimW / 2} y={tag.y + 4} textAnchor="middle" className="nha-role-tag-dim">
            {dimText}
          </text>
          {/* Level pips: 1 = Yếu, 2 = Ổn định, 3 = Vững chắc */}
          {[0, 1, 2].map((i) => (
            <circle
              key={i}
              cx={tag.x + 16 + nameW + 4 + dimW + 10 + i * 7}
              cy={tag.y}
              r={2.6}
              fill={i < filled ? color : "none"}
              stroke={color}
              strokeWidth={1}
            />
          ))}
        </g>
      );
    })}
  </g>
);
