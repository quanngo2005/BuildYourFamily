import type { Dimension } from "../game/types";
import type { TierLevel } from "../house/deriveHouseState";

export interface PendingReveal {
  scenarioId: string;
  previousLevels: Record<Dimension, TierLevel>;
}

interface RevealState {
  pending: PendingReveal | null;
  played: Set<string>;
}

const store: RevealState = {
  pending: null,
  played: new Set<string>(),
};

export function setPendingReveal(
  scenarioId: string,
  previousLevels: Record<Dimension, TierLevel>
): void {
  if (store.played.has(scenarioId)) {
    return;
  }
  store.pending = {
    scenarioId,
    previousLevels,
  };
}

export function hasPendingReveal(scenarioId: string): boolean {
  return store.pending?.scenarioId === scenarioId && !store.played.has(scenarioId);
}

export function consumePendingReveal(scenarioId: string): PendingReveal | null {
  if (store.pending && store.pending.scenarioId === scenarioId && !store.played.has(scenarioId)) {
    const data = store.pending;
    store.pending = null;
    store.played.add(scenarioId);
    return data;
  }
  return null;
}

export function resetRevealStore(): void {
  store.pending = null;
  store.played.clear();
}
