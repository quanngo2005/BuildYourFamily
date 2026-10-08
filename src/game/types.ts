export type Dim = "economy" | "education" | "equality" | "emotion";
export type Dimension = Dim;
export type Scores = Record<Dim, number>;
export type Zone = "foundation" | "kitchen" | "study" | "structure" | "door" | "interior";
export type Kind = "build" | "reinforce" | "crack" | "open" | "dim" | "light";
export type ScenarioId = "S01" | "S02" | "S03" | "S04" | "S05" | "S06" | "S07";
export type ChoiceId = "A" | "B" | "C";
export type Phase = "landing" | "intro" | "choosing" | "feedback" | "final";
export type UnlockId = "relationships" | "living_spaces" | "three_foundations" | "main_door" | "final_profile";

export interface GameState {
  version: 1;
  phase: Phase;
  currentScenario: ScenarioId;
  scores: Record<Dim, number>;
  history: Partial<Record<ScenarioId, ChoiceId>>;
  completed: ScenarioId[];
  unlocked: UnlockId[];
}

export type UiScreen = "feedback" | "knowledge";

export interface PersistedAppState {
  game: GameState;
  uiScreen: UiScreen;
}

export interface HouseEffect {
  zone: "foundation" | "kitchen" | "study" | "structure" | "door" | "interior";
  kind: "build" | "reinforce" | "crack" | "open" | "dim" | "light";
}

export interface ChoiceData {
  text: string;
  consequence: string;
  feedback: string;
  houseEffect: HouseEffect; 
  relatedKnowledgeIds: string[];
}

export interface ScenarioData {
  id: ScenarioId;
  title: string;
  context: string;
  question: string;
  choices: Record<ChoiceId, ChoiceData>;
}

export interface KnowledgeCardData {
  scenarioId: ScenarioId;
  title: string;
  explanation: string;
  sourceIds: string[];
  keyTerms: string[];
}
