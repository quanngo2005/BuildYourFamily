import type { ChoiceId, Dim, GameState, ScenarioId, UnlockId } from "./types";
import { DELTAS } from "../content/deltas";

export const SCENARIO_ORDER: ScenarioId[] = ["S01", "S02", "S03", "S04", "S05", "S06", "S07"];

export const INITIAL_STATE: GameState = {
  version: 1,
  phase: "landing",
  currentScenario: "S01",
  scores: { economy: 40, education: 40, equality: 40, emotion: 40 },
  history: {},
  completed: [],
  unlocked: []
};

type Action =
  | { type: "START" }
  | { type: "BEGIN" }
  | { type: "RESUME" }
  | { type: "SELECT_CHOICE"; payload: { scenarioId: ScenarioId; choiceId: ChoiceId } }
  | { type: "CONTINUE" }
  | { type: "RESET" };

export function computeUnlocks(completed: ScenarioId[]): UnlockId[] {
  const unlocks: UnlockId[] = [];
  if (completed.includes("S01") && completed.includes("S06")) unlocks.push("relationships");
  if (completed.includes("S03")) unlocks.push("living_spaces");
  if (completed.includes("S02") && completed.includes("S04") && completed.includes("S05")) unlocks.push("three_foundations");
  if (completed.includes("S07")) {
    unlocks.push("main_door");
    unlocks.push("final_profile");
  }
  return unlocks;
}

export function gameReducer(state: GameState, action: Action): GameState {
  switch (action.type) {
    case "START":
      if (state.phase !== "landing") return state;
      return { ...state, phase: "intro" };

    case "BEGIN":
      if (state.phase !== "intro") return state;
      return { ...state, phase: "choosing", currentScenario: "S01" };

    case "RESUME": {
      if (state.phase !== "landing") return state;
      if (state.history[state.currentScenario]) {
        return { ...state, phase: "feedback" };
      }
      return { ...state, phase: "choosing" };
    }

    case "SELECT_CHOICE": {
      if (state.phase !== "choosing") return state;
      if (state.currentScenario !== action.payload.scenarioId) return state;
      if (state.history[action.payload.scenarioId]) return state; // Already chosen

      const { scenarioId, choiceId } = action.payload;
      const delta = DELTAS[scenarioId][choiceId];
      
      const newScores = { ...state.scores };
      for (const dim of Object.keys(newScores) as Dim[]) {
        newScores[dim] = Math.max(0, Math.min(100, newScores[dim] + (delta[dim] || 0)));
      }

      return {
        ...state,
        history: { ...state.history, [scenarioId]: choiceId },
        scores: newScores,
        phase: "feedback"
      };
    }

    case "CONTINUE": {
      if (state.phase !== "feedback") return state;
      
      const nextCompleted = [...state.completed, state.currentScenario];
      const nextUnlocks = computeUnlocks(nextCompleted);
      
      if (state.currentScenario === "S07") {
        return {
          ...state,
          phase: "final",
          completed: nextCompleted,
          unlocked: nextUnlocks
        };
      }
      
      const currentIndex = SCENARIO_ORDER.indexOf(state.currentScenario);
      const nextScenario = SCENARIO_ORDER[currentIndex + 1];
      
      return {
        ...state,
        phase: "choosing",
        currentScenario: nextScenario,
        completed: nextCompleted,
        unlocked: nextUnlocks
      };
    }

    case "RESET":
      return INITIAL_STATE;

    default:
      return state;
  }
}
