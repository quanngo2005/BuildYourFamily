import { useState, useEffect } from "react";
import { consumePendingReveal } from "./revealStore";

export function useReveal(scenarioId?: string) {
  const [revealState, setRevealState] = useState<"static" | "revealing">(() => {
    if (!scenarioId) return "static";
    const prefersReducedMotion =
      typeof window !== "undefined" &&
      window.matchMedia &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (prefersReducedMotion) return "static";
    return consumePendingReveal(scenarioId) ? "revealing" : "static";
  });

  useEffect(() => {
    if (revealState === "revealing") {
      const timer = window.setTimeout(() => {
        setRevealState("static");
      }, 1300);
      return () => clearTimeout(timer);
    }
  }, [revealState]);

  return {
    revealState,
    isRevealing: revealState === "revealing",
  };
}
