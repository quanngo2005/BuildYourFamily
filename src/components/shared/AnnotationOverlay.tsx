import React from "react";
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
}

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
}) => {
  if (annotations.length === 0) return null;

  // U+2212 for true minus sign
  const formatLabel = (item: AnnotationItem) => {
    const sign = item.delta >= 0 ? "+" : "−";
    return `${sign} ${DIMENSION_LABEL_VI[item.dimension]}`;
  };

  const formatA11y = (item: AnnotationItem) => {
    const dir = item.delta >= 0 ? "tăng" : "giảm";
    return `${DIMENSION_LABEL_VI[item.dimension]}: ${dir}`;
  };

  if (!isLeaderMode) {
    // List mode under the house for mobile
    return (
      <div className="nha-annotation-list-mode reveal-step-annotation" role="list" aria-label="Biến động chỉ số">
        {annotations.map((item) => (
          <div key={item.dimension} className="nha-annotation-list-item" role="listitem">
            <span className="nha-annotation-text" aria-hidden="true">{formatLabel(item)}</span>
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
      {annotations.map((item) => {
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
          <div key={item.dimension} className="nha-annotation-leader-label" style={style}>
            <span aria-hidden="true">{formatLabel(item)}</span>
            <span className="sr-only">{formatA11y(item)}</span>
          </div>
        );
      })}
    </div>
  );
};
