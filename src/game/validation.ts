import type { GameState, ChoiceId, Dim } from "./types";
import { INITIAL_STATE, SCENARIO_ORDER, computeUnlocks } from "./reducer";
import { DELTAS } from "../content/deltas";

function invalidateAndReset(): GameState {
  try {
    localStorage.removeItem("nha:v1");
  } catch {}
  return INITIAL_STATE;
}

export function loadAndValidateState(): GameState {
  try {
    const data = localStorage.getItem("nha:v1");
    if (!data) return INITIAL_STATE;
    
    const parsedPersisted = JSON.parse(data) as any;
    const parsed = parsedPersisted?.game;
    
    // Check basic structure
    if (!parsed || parsed.version !== 1) return invalidateAndReset();
    
    if (!SCENARIO_ORDER.includes(parsed.currentScenario)) return invalidateAndReset();
    
    // Check completed contiguous prefix
    if (!Array.isArray(parsed.completed)) return invalidateAndReset();
    const isFinal = parsed.phase === "final";
    const k = SCENARIO_ORDER.indexOf(parsed.currentScenario);
    
    const expectedCompleted = isFinal ? SCENARIO_ORDER : SCENARIO_ORDER.slice(0, k);
    if (parsed.completed.length !== expectedCompleted.length) return invalidateAndReset();
    for (let i = 0; i < expectedCompleted.length; i++) {
      if (parsed.completed[i] !== expectedCompleted[i]) return invalidateAndReset();
    }
    
    // Check phase and history keys
    const validChoices = ["A", "B", "C"];
    const expectedHistoryKeys = [...parsed.completed];
    
    if (parsed.phase === "landing" || parsed.phase === "intro") {
      if (parsed.completed.length > 0 || parsed.currentScenario !== "S01") return invalidateAndReset();
    } else if (parsed.phase === "choosing") {
      // expectedHistoryKeys is just completed
    } else if (parsed.phase === "feedback") {
      expectedHistoryKeys.push(parsed.currentScenario);
    } else if (parsed.phase === "final") {
      if (parsed.currentScenario !== "S07" || parsed.completed.length !== 7) return invalidateAndReset();
      // completed already contains S01..S07, so expectedHistoryKeys already has all 7 items
    } else {
      return invalidateAndReset();
    }
    
    if (!parsed.history || typeof parsed.history !== 'object') return invalidateAndReset();
    
    const historyKeys = Object.keys(parsed.history);
    if (historyKeys.length !== expectedHistoryKeys.length) return invalidateAndReset();
    for (const key of expectedHistoryKeys) {
      if (!parsed.history[key]) return invalidateAndReset();
      if (!validChoices.includes(parsed.history[key])) return invalidateAndReset();
    }

    // Fold scores
    const computedScores: Record<Dim, number> = { economy: 40, education: 40, equality: 40, emotion: 40 };
    for (const sid of SCENARIO_ORDER) {
      if (parsed.history[sid]) {
        const choice = parsed.history[sid] as ChoiceId;
        const delta = DELTAS[sid][choice];
        for (const dim of Object.keys(computedScores) as Dim[]) {
          computedScores[dim] = Math.max(0, Math.min(100, computedScores[dim] + (delta[dim] || 0)));
        }
      }
    }
    
    if (!parsed.scores || typeof parsed.scores !== 'object') return invalidateAndReset();
    for (const dim of ["economy", "education", "equality", "emotion"] as Dim[]) {
      if (parsed.scores[dim] !== computedScores[dim]) return invalidateAndReset();
    }
    
    // Recompute unlocked to be safe
    const unlocked = computeUnlocks(parsed.completed);
    
    const validState: GameState = {
      version: 1,
      phase: parsed.phase,
      currentScenario: parsed.currentScenario,
      scores: computedScores,
      history: parsed.history,
      completed: parsed.completed,
      unlocked
    };
    
    return validState;
  } catch {
    return invalidateAndReset();
  }
}
