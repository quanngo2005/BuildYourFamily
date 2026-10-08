import React, { createContext, useContext, useReducer, useEffect, useState } from "react";
import type { ReactNode } from "react";
import type { GameState, UiScreen, PersistedAppState } from "./types";
import { gameReducer } from "./reducer";
import { loadAndValidateState } from "./validation";

interface GameContextType {
  state: GameState;
  dispatch: React.Dispatch<any>;
  uiScreen: UiScreen;
  setUiScreen: (screen: UiScreen) => void;
}

const GameContext = createContext<GameContextType | undefined>(undefined);

export function GameProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(gameReducer, undefined, () => {
    return loadAndValidateState();
  });

  const [uiScreen, setUiScreen] = useState<UiScreen>(() => {
    try {
      const data = localStorage.getItem("nha:v1");
      if (data) {
        const parsed = JSON.parse(data) as PersistedAppState;
        if (parsed.uiScreen === "feedback" || parsed.uiScreen === "knowledge") {
          return parsed.uiScreen;
        }
      }
    } catch {}
    return "feedback";
  });

  useEffect(() => {
    if (state.phase === "landing" && Object.keys(state.history).length === 0 && state.completed.length === 0) {
      try {
        localStorage.removeItem("nha:v1");
      } catch {}
      return;
    }
    const persist: PersistedAppState = {
      game: state,
      uiScreen
    };
    try {
      localStorage.setItem("nha:v1", JSON.stringify(persist));
    } catch {}
  }, [state, uiScreen]);

  return (
    <GameContext.Provider value={{ state, dispatch, uiScreen, setUiScreen }}>
      {children}
    </GameContext.Provider>
  );
}

export function useGame() {
  const context = useContext(GameContext);
  if (!context) {
    throw new Error("useGame must be used within a GameProvider");
  }
  return context;
}

export function useSafeGame() {
  return useContext(GameContext);
}
