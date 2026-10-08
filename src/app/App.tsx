import { useState, useEffect } from "react";
import { GameProvider, useGame } from "../game/GameContext";

import { LandingScreen } from "../screens/landing/LandingScreen";
import { IntroScreen } from "../screens/intro/IntroScreen";
import { ChoosingScreen } from "../screens/choosing/ChoosingScreen";
import { FeedbackScreen } from "../screens/feedback/FeedbackScreen";
import { KnowledgeScreen } from "../screens/knowledge/KnowledgeScreen";
import { FinalScreen } from "../screens/final/FinalScreen";
import { HouseSandbox } from "../screens/sandbox/HouseSandbox";

function Router() {
  const { state, uiScreen } = useGame();
  const [isSandbox, setIsSandbox] = useState(() => {
    if (typeof window === "undefined") return false;
    return window.location.hash === "#sandbox" || window.location.search.includes("sandbox");
  });

  useEffect(() => {
    const handleHashChange = () => {
      setIsSandbox(window.location.hash === "#sandbox" || window.location.search.includes("sandbox"));
    };
    window.addEventListener("hashchange", handleHashChange);
    return () => window.removeEventListener("hashchange", handleHashChange);
  }, []);

  if (isSandbox) {
    return <HouseSandbox />;
  }

  switch (state.phase) {
    case "landing":
      return <LandingScreen />;
    case "intro":
      return <IntroScreen />;
    case "choosing":
      return <ChoosingScreen />;
    case "feedback":
      if (uiScreen === "knowledge") {
        return <KnowledgeScreen />;
      }
      return <FeedbackScreen />;
    case "final":
      return <FinalScreen />;
    default:
      return <LandingScreen />;
  }
}

export default function App() {
  return (
    <GameProvider>
      <Router />
    </GameProvider>
  );
}
