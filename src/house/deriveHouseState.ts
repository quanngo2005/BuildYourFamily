import type { Scores, ChoiceId, Dimension, Zone, Kind } from "../game/types";
import { SCENARIOS } from "../content/scenarios";

export type TierLevel = "LOW" | "MID" | "HIGH";

export interface DerivedMark {
  scenarioId: string;
  zone: Zone;
  kind: Kind;
  slot: number;
}

export interface DerivedHouseState {
  levels: Record<Dimension, TierLevel>;
  marks: DerivedMark[];
}

export function levelOf(score: number): TierLevel {
  if (score >= 65) return "HIGH";
  if (score >= 40) return "MID";
  return "LOW";
}

export function deriveHouseState(
  scores: Scores,
  history: Record<string, ChoiceId | undefined>
): DerivedHouseState {
  const levels: Record<Dimension, TierLevel> = {
    economy: levelOf(scores.economy),
    education: levelOf(scores.education),
    equality: levelOf(scores.equality),
    emotion: levelOf(scores.emotion),
  };

  const marks: DerivedMark[] = [];
  const slotCounters: Record<Zone, number> = {
    foundation: 0,
    kitchen: 0,
    study: 0,
    structure: 0,
    door: 0,
    interior: 0,
  };

  const orderedScenarioIds = ["S01", "S02", "S03", "S04", "S05", "S06", "S07"];

  for (const sid of orderedScenarioIds) {
    const choiceId = history[sid];
    if (!choiceId) continue;

    const scenario = SCENARIOS[sid];
    if (!scenario) continue;

    const choice = scenario.choices[choiceId];
    if (!choice?.houseEffect) continue;

    const { zone, kind } = choice.houseEffect;
    const slot = slotCounters[zone] ?? 0;
    slotCounters[zone] = slot + 1;

    marks.push({
      scenarioId: sid,
      zone,
      kind,
      slot,
    });
  }

  return {
    levels,
    marks,
  };
}
