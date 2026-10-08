import type { Dim } from "./types";

export type Tier = "low" | "mid" | "high";

export interface HouseVisualState {
  economy: Tier;
  education: Tier;
  equality: Tier;
  emotion: Tier;
  overall: "stable" | "balanced" | "unstable";
}

export function getTier(score: number): Tier {
  if (score < 30) return "low";
  if (score > 70) return "high";
  return "mid";
}

export function selectHouse(scores: Record<Dim, number>): HouseVisualState {
  const avg = (scores.economy + scores.education + scores.equality + scores.emotion) / 4;
  
  let overall: "stable" | "balanced" | "unstable" = "unstable";
  if (avg >= 65) {
    overall = "stable";
  } else if (avg >= 40) {
    overall = "balanced";
  }

  return {
    economy: getTier(scores.economy),
    education: getTier(scores.education),
    equality: getTier(scores.equality),
    emotion: getTier(scores.emotion),
    overall
  };
}

export function selectAvgScore(scores: Record<Dim, number>): number {
  return (scores.economy + scores.education + scores.equality + scores.emotion) / 4;
}

export function selectProfileCategory(scores: Record<Dim, number>): "Tiến bộ" | "Chuyển mình" | "Vết nứt" {
  const avg = selectAvgScore(scores);
  if (avg >= 65) return "Tiến bộ";
  if (avg >= 40) return "Chuyển mình";
  return "Vết nứt";
}

export function selectStrongestAndWeakest(scores: Record<Dim, number>) {
  const dims: Dim[] = ["economy", "education", "equality", "emotion"]; // Fixed tie-breaker order
  let strongest = dims[0];
  let weakest = dims[0];

  for (const dim of dims) {
    if (scores[dim] > scores[strongest]) strongest = dim;
    if (scores[dim] < scores[weakest]) weakest = dim;
  }

  return { strongest, weakest };
}
