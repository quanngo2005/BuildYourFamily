import React from "react";
import type { Dimension, Zone } from "../../game/types";

export type ImpactDeltas = Partial<Record<Dimension, number>>;

interface Box {
  x: number;
  y: number;
  w: number;
  h: number;
}

// Visual bounds of each zone in house viewBox coordinates
export const ZONE_BOUNDS: Record<Zone, Box> = {
  structure: { x: 130, y: 70, w: 540, h: 100 },
  study: { x: 160, y: 160, w: 220, h: 155 },
  interior: { x: 380, y: 160, w: 260, h: 155 },
  kitchen: { x: 380, y: 325, w: 260, h: 175 },
  door: { x: 210, y: 370, w: 90, h: 130 },
  foundation: { x: 160, y: 500, w: 480, h: 40 },
};

// Which zones visually react to each dimension
export const DIMENSION_ZONES: Record<Dimension, Zone[]> = {
  economy: ["foundation", "kitchen"],
  education: ["study"],
  equality: ["structure", "door"],
  emotion: ["interior"],
};

// Where the floating score number appears for each dimension
const SCORE_ORIGIN: Record<Dimension, { x: number; y: number }> = {
  economy: { x: 510, y: 470 },
  education: { x: 270, y: 215 },
  equality: { x: 400, y: 120 },
  emotion: { x: 510, y: 215 },
};

export function impactClassFor(deltas: ImpactDeltas | undefined, dim: Dimension): string {
  const d = deltas?.[dim] ?? 0;
  if (d === 0) return "";
  const strength = Math.abs(d) >= 12 ? "is-strong" : "";
  return `zone-impact ${d > 0 ? "zone-impact-gain" : "zone-impact-loss"} ${strength}`;
}

// Deterministic pseudo-random in [0,1) so SSR output stays stable
function rand(seed: number): number {
  const s = Math.sin(seed * 127.1 + 311.7) * 43758.5453;
  return s - Math.floor(s);
}

const formatDelta = (d: number) => `${d > 0 ? "+" : "−"}${Math.abs(d)}`;

const LossFx: React.FC<{ box: Box; seed: number; count: number }> = ({ box, seed, count }) => {
  const cx = box.x + box.w / 2;
  const crackTop = box.y + box.h * 0.15;
  const crack = `M ${cx - 6} ${crackTop} l 10 ${box.h * 0.18} l -12 ${box.h * 0.16} l 9 ${box.h * 0.2} l -6 ${box.h * 0.14}`;
  return (
    <g className="fx-loss">
      <rect className="fx-flash" x={box.x} y={box.y} width={box.w} height={box.h} rx="2" />
      <path className="fx-crack" d={crack} pathLength={100} />
      {Array.from({ length: count }, (_, i) => {
        const px = box.x + 10 + rand(seed + i) * (box.w - 20);
        const py = box.y + rand(seed + i + 50) * box.h * 0.5;
        const size = 3 + rand(seed + i + 90) * 4;
        const style = {
          "--fx-delay": `${180 + Math.round(rand(seed + i + 7) * 260)}ms`,
          "--fx-fall": `${40 + Math.round(rand(seed + i + 13) * 50)}px`,
          "--fx-drift": `${Math.round((rand(seed + i + 21) - 0.5) * 30)}px`,
          "--fx-spin": `${Math.round((rand(seed + i + 33) - 0.5) * 540)}deg`,
        } as React.CSSProperties;
        return (
          <polygon
            key={i}
            className="fx-debris"
            style={style}
            points={`${px},${py} ${px + size},${py + size * 0.4} ${px + size * 0.3},${py + size}`}
          />
        );
      })}
      {[0, 1, 2].map((i) => (
        <circle
          key={`dust-${i}`}
          className="fx-dust"
          style={{ "--fx-delay": `${380 + i * 90}ms` } as React.CSSProperties}
          cx={box.x + box.w * (0.25 + i * 0.25)}
          cy={box.y + box.h - 4}
          r={8}
        />
      ))}
    </g>
  );
};

const GainFx: React.FC<{ box: Box; seed: number; count: number }> = ({ box, seed, count }) => {
  const cx = box.x + box.w / 2;
  const cy = box.y + box.h / 2;
  return (
    <g className="fx-gain">
      <rect className="fx-glow" x={box.x} y={box.y} width={box.w} height={box.h} rx="2" />
      <clipPath id={`fx-clip-${seed}`}>
        <rect x={box.x} y={box.y} width={box.w} height={box.h} />
      </clipPath>
      <g clipPath={`url(#fx-clip-${seed})`}>
        <rect
          className="fx-shine"
          x={box.x - 60}
          y={box.y - 20}
          width={40}
          height={box.h + 40}
          style={{ "--fx-shine-dist": `${box.w + 100}px` } as React.CSSProperties}
        />
      </g>
      <circle className="fx-ring" cx={cx} cy={cy} r={Math.min(box.w, box.h) * 0.35} />
      {Array.from({ length: count }, (_, i) => {
        const px = box.x + 12 + rand(seed + i) * (box.w - 24);
        const py = box.y + box.h * 0.4 + rand(seed + i + 50) * box.h * 0.55;
        const s = 3 + rand(seed + i + 90) * 3.5;
        const style = {
          "--fx-delay": `${200 + Math.round(rand(seed + i + 7) * 320)}ms`,
          "--fx-rise": `${-(30 + Math.round(rand(seed + i + 13) * 40))}px`,
        } as React.CSSProperties;
        return (
          <path
            key={i}
            className="fx-sparkle"
            style={style}
            d={`M ${px} ${py - s * 2} Q ${px} ${py} ${px + s * 2} ${py} Q ${px} ${py} ${px} ${py + s * 2} Q ${px} ${py} ${px - s * 2} ${py} Q ${px} ${py} ${px} ${py - s * 2} Z`}
          />
        );
      })}
    </g>
  );
};

export const ZoneImpactLayer: React.FC<{ deltas: ImpactDeltas }> = ({ deltas }) => {
  const dims = (Object.keys(deltas) as Dimension[]).filter((d) => (deltas[d] ?? 0) !== 0);
  if (dims.length === 0) return null;

  return (
    <g className="nha-house-fx-layer" aria-hidden="true">
      {dims.map((dim, di) => {
        const delta = deltas[dim] ?? 0;
        const count = 5 + Math.min(Math.round(Math.abs(delta) / 2), 8);
        return (
          <g key={dim}>
            {DIMENSION_ZONES[dim].map((zone, zi) => {
              const seed = di * 31 + zi * 7 + 1;
              const box = ZONE_BOUNDS[zone];
              return delta < 0 ? (
                <LossFx key={zone} box={box} seed={seed} count={count} />
              ) : (
                <GainFx key={zone} box={box} seed={seed} count={count} />
              );
            })}
          </g>
        );
      })}

      {/* Floating score numbers */}
      {dims.map((dim, i) => {
        const delta = deltas[dim] ?? 0;
        const o = SCORE_ORIGIN[dim];
        return (
          <text
            key={`score-${dim}`}
            className={`fx-score ${delta > 0 ? "fx-score-gain" : "fx-score-loss"}`}
            style={{ "--fx-delay": `${300 + i * 120}ms` } as React.CSSProperties}
            x={o.x}
            y={o.y}
            textAnchor="middle"
          >
            {formatDelta(delta)}
          </text>
        );
      })}
    </g>
  );
};
