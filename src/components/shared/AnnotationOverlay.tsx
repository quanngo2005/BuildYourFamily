import React, { useEffect, useState } from "react";
import type { Dimension } from "../../game/types";
import { DIMENSION_ANCHORS, DIMENSION_SIDE } from "../../house/geometry";
import type { ContainerSize } from "../../house/useHouseGeometry";
import { calculateAnchorPixelPosition } from "../../house/useHouseGeometry";
import "./AnnotationOverlay.css";

export interface AnnotationItem {
  dimension: Dimension;
  delta: number; // positive (>0) or negative (<0)
}

interface AnnotationOverlayProps {
  annotations: AnnotationItem[];
  containerSize: ContainerSize;
  isLeaderMode: boolean;
  animate?: boolean; // count the number up and pop the label in
}

// Counts from 0 to the target value while animating; shows the final value otherwise
function useCountUp(target: number, animate: boolean, delayMs: number, durationMs = 600): number {
  const [value, setValue] = useState(animate ? 0 : target);
  useEffect(() => {
    if (!animate) {
      setValue(target);
      return;
    }
    let raf = 0;
    const start = performance.now() + delayMs;
    const tick = (now: number) => {
      const t = Math.min(Math.max((now - start) / durationMs, 0), 1);
      const eased = 1 - Math.pow(1 - t, 3);
      setValue(Math.round(target * eased));
      if (t < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [target, animate, delayMs, durationMs]);
  return value;
}

const DeltaLabel: React.FC<{ item: AnnotationItem; label: string; animate: boolean; index: number }> = ({
  item,
  label,
  animate,
  index,
}) => {
  const delayMs = 360 + index * 120;
  const value = useCountUp(item.delta, animate, delayMs);
  const isGain = item.delta >= 0;
  // U+2212 for true minus sign
  const sign = isGain ? "+" : "−";
  return (
    <span
      className={`nha-delta ${isGain ? "is-gain" : "is-loss"} ${animate ? "is-animating" : ""}`}
      style={{ "--delta-delay": `${delayMs}ms` } as React.CSSProperties}
      aria-hidden="true"
    >
      <span className="nha-delta-arrow">{isGain ? "▲" : "▼"}</span>
      <span className="nha-delta-value">
        {sign}
        {Math.abs(value)}
      </span>
      <span className="nha-delta-dim">{label}</span>
    </span>
  );
};

const DIMENSION_LABEL_VI: Record<Dimension, string> = {
  economy: "Kinh tế",
  education: "Giáo dục",
  equality: "Bình đẳng",
  emotion: "Tình cảm",
};

export const AnnotationOverlay: React.FC<AnnotationOverlayProps> = ({
  annotations,
  containerSize,
  isLeaderMode,
  animate = false,
}) => {
  if (annotations.length === 0) return null;

  const formatA11y = (item: AnnotationItem) => {
    const dir = item.delta >= 0 ? "tăng" : "giảm";
    return `${DIMENSION_LABEL_VI[item.dimension]}: ${dir}`;
  };

  if (!isLeaderMode) {
    // List mode under the house for mobile
    return (
      <div className="nha-annotation-list-mode reveal-step-annotation" role="list" aria-label="Biến động chỉ số">
        {annotations.map((item, i) => (
          <div key={item.dimension} className={`nha-annotation-list-item ${item.delta >= 0 ? "is-gain" : "is-loss"}`} role="listitem">
            <DeltaLabel item={item} label={DIMENSION_LABEL_VI[item.dimension]} animate={animate} index={i} />
            <span className="sr-only">{formatA11y(item)}</span>
          </div>
        ))}
      </div>
    );
  }

  // Leader line mode on SVG container overlay
  return (
    <div className="nha-annotation-leader-overlay reveal-step-annotation" aria-label="Biến động chỉ số">
      <svg
        className="nha-annotation-leader-svg"
        width={containerSize.width}
        height={containerSize.height}
        viewBox={`0 0 ${containerSize.width} ${containerSize.height}`}
      >
        {annotations.map((item) => {
          const anchor = DIMENSION_ANCHORS[item.dimension];
          const pixelPos = calculateAnchorPixelPosition(anchor, containerSize);
          const side = DIMENSION_SIDE[item.dimension];

          // Margin offsets for leader line endpoints
          const labelX = side === "left" ? 24 : containerSize.width - 24;
          const labelY = pixelPos.y;

          return (
            <g key={item.dimension} className="nha-leader-group">
              {/* Anchor point marker */}
              <circle
                cx={pixelPos.x}
                cy={pixelPos.y}
                r="3"
                fill="var(--color-house-stroke)"
              />
              {/* Leader line */}
              <line
                x1={pixelPos.x}
                y1={pixelPos.y}
                x2={labelX + (side === "left" ? 10 : -10)}
                y2={labelY}
                stroke="var(--annotation-leaderLine-color, var(--color-house-stroke))"
                strokeWidth="1"
                strokeDasharray="3 3"
              />
            </g>
          );
        })}
      </svg>

      {/* HTML text labels with typography tokens positioned at leader ends */}
      {annotations.map((item, i) => {
        const anchor = DIMENSION_ANCHORS[item.dimension];
        const pixelPos = calculateAnchorPixelPosition(anchor, containerSize);
        const side = DIMENSION_SIDE[item.dimension];

        const style: React.CSSProperties = {
          position: "absolute",
          top: `${pixelPos.y}px`,
          transform: "translateY(-50%)",
          ...(side === "left" ? { left: "16px" } : { right: "16px" }),
        };

        return (
          <div
            key={item.dimension}
            className={`nha-annotation-leader-label ${item.delta >= 0 ? "is-gain" : "is-loss"}`}
            style={style}
          >
            <DeltaLabel item={item} label={DIMENSION_LABEL_VI[item.dimension]} animate={animate} index={i} />
            <span className="sr-only">{formatA11y(item)}</span>
          </div>
        );
      })}
    </div>
  );
};
