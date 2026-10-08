import { useState, useEffect, type RefObject } from "react";
import type { Point } from "./geometry";
import { HOUSE_VIEWBOX } from "./geometry";

export interface ContainerSize {
  width: number;
  height: number;
}

export function calculateAnchorPixelPosition(
  anchor: Point,
  container: ContainerSize
): Point {
  const scale = Math.min(
    container.width / HOUSE_VIEWBOX.width,
    container.height / HOUSE_VIEWBOX.height
  );

  const offsetX = (container.width - HOUSE_VIEWBOX.width * scale) / 2;
  const offsetY = (container.height - HOUSE_VIEWBOX.height * scale) / 2;

  return {
    x: Math.round((offsetX + anchor.x * scale) * 10) / 10,
    y: Math.round((offsetY + anchor.y * scale) * 10) / 10,
  };
}

export function useHouseGeometry(containerRef: RefObject<HTMLElement | null>) {
  const [size, setSize] = useState<ContainerSize>({ width: 800, height: 600 });

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const observer = new ResizeObserver((entries) => {
      for (const entry of entries) {
        const { width, height } = entry.contentRect;
        if (width > 0 && height > 0) {
          setSize({ width, height });
        }
      }
    });

    observer.observe(el);
    return () => observer.disconnect();
  }, [containerRef]);

  const getAnchorPixel = (anchor: Point): Point => {
    return calculateAnchorPixelPosition(anchor, size);
  };

  return {
    size,
    getAnchorPixel,
    // Leader mode if width >= 40rem (640px)
    isLeaderMode: size.width >= 640,
  };
}
