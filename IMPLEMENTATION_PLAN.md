# IMPLEMENTATION_PLAN.md — NHA MVP
# Mot gia dinh duoc xay bang nhung lua chon.

Status: Ready for implementation.
Source hierarchy (khi conflict): GAMEPLAY_SPEC > SCREEN_FLOW > COMPONENT_SPEC > DESIGN_TOKENS > implementation preference.
Technology: React + TypeScript + Vite, client-side only, localStorage key nha:v1, no backend.

## Proposed Changes

### 1. File & Folder Structure
Kiến trúc tối giản tập trung vào client-side React với domain logic được tách rời. Không cài thêm thư viện (như Redux, React Router) để giữ mọi thứ đúng chuẩn "MVP nhẹ".

```text
src/
  app/
    App.tsx                   # Entry point kết hợp Context Provider và Navigation (Switch-case)
  components/                 # UI components
    Choice/                   # ChoiceCard, ChoiceList
    House/                    # HouseCanvas
    Progress/                 # ProgressIndicator
    Shared/                   # PrimaryAction, ConfirmDialog, vv.
  screens/                    # Tương ứng với SCR-01 đến SCR-07
  game/                       # Pure domain logic (không chứa React)
    types.ts                  # Toàn bộ type domain
    actions.ts                # Reducer actions
    reducer.ts                # Logic GameState
    scoring.ts                # Toán logic (clamp, delta, level)
    unlocks.ts                # Logic mở khóa
    house.ts                  # deriveHouseState
    persistence.ts            # LocalStorage layer
  content/                    # Content data (static, data-driven)
    deltas.ts                 # Điểm số của từng lựa chọn
    scenarios.ts              # Data kịch bản
    knowledge.ts              # Data Knowledge Card
  context/                    # React Context kết nối `game/` với UI
  styles/                     # Global CSS và Design Tokens
  tests/
```

### 2. State Architecture (`src/game/types.ts`)
Giữ nguyên chính xác `GameState` contract.

```ts
export type Dim = "economy" | "education" | "equality" | "emotion";
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
```

**Actions (chỉ áp dụng cho Domain Reducer):**
1. `START`: Di chuyển từ `landing` sang `intro`.
2. `CONTINUE`: Dùng để tiến tới bước tiếp theo (từ `intro` -> `choosing` S01; từ `knowledge` -> `choosing` bước kế, hoặc -> `final`).
3. `SELECT_CHOICE` (kèm `scenarioId`, `choiceId`): Di chuyển `choosing` sang `feedback`, áp dụng score delta.
4. `RESET`: Trở về trạng thái ban đầu và xóa lưu trữ.

### 3. State Transition Table

| Current State (`phase`) | Action | Condition | Next State | Side Effect |
| ------------- | ------ | --------- | ---------- | ----------- |
| `landing`     | `START`| -         | `intro`    | persist |
| `intro`       | `CONTINUE` | -      | `choosing` (S01) | persist |
| `choosing`    | `SELECT_CHOICE(sid, cid)` | `sid === currentScenario` | `feedback` | Áp dụng điểm, lưu history, persist |
| `feedback`    | (UI transition) | Cập nhật `uiScreen` | `feedback` | `uiScreen = knowledge`, persist |
| `feedback`    | `CONTINUE` | Khi đã ở Knowledge | `choosing` / `final` | Tính unlock, cập nhật completed, `uiScreen = feedback`, persist |
| `*`           | `RESET`| -         | `landing`  | Xóa localStorage, reset internal state |

### 4. Persistence (`src/game/persistence.ts`)
Do `uiScreen` cần được persist (đảm bảo F5 tại Knowledge Card thì vẫn khôi phục chính xác), ta định nghĩa `PersistedAppState` là sự kết hợp của Domain và Presentation:

```ts
export interface PersistedAppState {
  game: GameState;
  uiScreen: UiScreen;
}
```

- **Key:** `nha:v1`
- **Write:** Xảy ra sau khi state hoặc `uiScreen` thay đổi.
- **Validation (Invariant rules bắt buộc):**
  - `version === 1`.
  - `scores`: Mọi dimension là số nguyên, `0 <= score <= 100`.
  - `history`: Key là `ScenarioId` hợp lệ, Value là `ChoiceId` hợp lệ.
  - `completed`: Mảng `ScenarioId` hợp lệ, thứ tự liên tiếp (S01, S02...), không trùng lặp.
  - Phase logic:
    - Nếu `choosing`: `currentScenario` là scenario kế tiếp chưa complete.
    - Nếu `feedback`: `currentScenario` tồn tại trong history và chưa trong `completed`.
    - Nếu `final`: `currentScenario === S07`, `completed` đủ 7 scenarios.
  - `unlocked`: Các giá trị `UnlockId` hợp lệ.
- **Corrupt state fallback:** Trong hàm `loadState()`, nếu validation thất bại, lập tức gọi `localStorage.removeItem("nha:v1")` và trả về `INITIAL_STATE` (xóa storage bị hỏng để tránh loop).
- **Refresh behavior:** Startup khôi phục chính xác screen hiện tại. Nếu `phase === "final"`, startup khôi phục Final Profile.

### 5. Content Architecture
Toàn bộ kịch bản là data-driven. UI không chứa logic `if (id === "S01")`. Component chỉ nhận vào interface sau và render nội dung.

```ts
export interface ChoiceData {
  text: string;
  consequence: string;
  feedback: string;
  houseEffect: { zone: string, kind: string }; 
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
```

### 6. Scoring Implementation
- Bảng `DELTAS` đã là giá trị sau khi chuẩn hóa bằng K=8. **TUYỆT ĐỐI KHÔNG nhân 8 thêm lần nữa.** Thêm comment trong `deltas.ts`: `// Values are already normalized by K=8. Scoring layer must NOT multiply these values again.`
- Các phép tính thay đổi điểm: `newScore = clamp(currentScore + DELTAS[scenarioId][choiceId][dimension], 0, 100)`.
- `tier(score)`: < 30 (low), > 70 (high), còn lại (mid).
- `computeAverage(scores)`: Tổng chia 4 (Float).
- **Profile Threshold:** `< 40` (cracked), `< 65` (transitioning), `>= 65` (progressive).
- **Strongest/Weakest Tie-breaker:** Fixed-order tie-breaker: `economy → education → equality → emotion`.

### 7. GameContext & UI Orchestration
Context chịu trách nhiệm kết nối Reducer thuần túy với UI:

```ts
const continueGame = () => {
  if (state.phase === "feedback" && uiScreen === "feedback") {
    setUiScreen("knowledge");
    // trigger saveState với uiScreen mới
    return;
  }
  
  dispatch({ type: "CONTINUE" });
  setUiScreen("feedback"); // reset uiScreen cho lần sau
};
```
Reducer hoàn toàn không biết đến `uiScreen`.

### 8. House Implementation
Hàm pure function `deriveHouseState`:
```ts
scores + history + unlocked => deriveHouseState() => HouseCanvas
```
- Không lưu `houseState` trong LocalStorage.
- `HouseCanvas` nhận object `DerivedHouseState` và gán thuộc tính HTML xuống các thành phần SVG.
- CSS xử lý thay đổi visual hoàn toàn qua CSS Selectors và transitions.
- Media query `@media (prefers-reduced-motion: reduce)` sẽ reset thời gian transition về 0.

### 9. Component Implementation Map
| Component | File | Responsibility |
| --------- | ---- | -------------- |
| `AppShell`| `AppShell.tsx` | Bao bọc layout chung, spacing |
| `HouseCanvas` | `HouseCanvas.tsx` | Render visual SVG của nhà |
| `ProgressIndicator` | `ProgressIndicator.tsx`| Mốc tiến trình S01-S07 |
| `ScenarioHeader` | `ScenarioHeader.tsx` | Tiêu đề Scenario |
| `ScenarioContext` | `ScenarioContext.tsx` | Văn bản bối cảnh |
| `DecisionPrompt` | `DecisionPrompt.tsx` | Câu hỏi ra quyết định |
| `ChoiceList` | `ChoiceList.tsx` | Quản lý nhóm `ChoiceCard` |
| `ChoiceCard` | `ChoiceCard.tsx` | Hiển thị 1 lựa chọn |
| `ConsequenceNarrative`| `ConsequenceNarrative.tsx`| Lời kể hậu quả sáng tạo |
| `ScoreDeltaList`| `ScoreDeltaList.tsx`| Hiển thị thay đổi điểm (`+/- dim`) |
| `KnowledgeHeader` | `KnowledgeHeader.tsx` | Tiêu đề khái niệm |
| `KnowledgeExplanation`| `KnowledgeExplanation.tsx`| Giải thích học thuật |
| `ChoiceRelation` | `ChoiceRelation.tsx` | Cầu nối choice & kiến thức |
| `KeyTermList` | `KeyTermList.tsx` | Các thuật ngữ cần nhớ |
| `SourceReference` | `SourceReference.tsx`| Nguồn kiến thức |
| `GameTitle` | `GameTitle.tsx` | Tên game trên Landing |
| `IntroNarrative` | `IntroNarrative.tsx` | Văn bản giới thiệu |
| `HowToPlay` | `HowToPlay.tsx` | Giải thích luật |
| `ProfileSummary` | `ProfileSummary.tsx`| Nhãn profile tổng kết |
| `FamilyScore` | `FamilyScore.tsx` | Hiển thị 4 chiều Family Score dưới dạng các hàng thông tin số, theo thứ tự Economy / Education / Equality / Emotion. KHÔNG GAUGE. |
| `DimensionHighlight` | `DimensionHighlight.tsx`| Điểm nhấn Dim mạnh/yếu nhất |
| `FlavorText` | `FlavorText.tsx` | Đoạn kết theo profile |
| `Disclaimer` | `Disclaimer.tsx` | Cảnh báo score là cơ chế game |
| `PrimaryAction`| `PrimaryAction.tsx` | Nút thao tác tiếp theo |
| `ResumeActions`| `ResumeActions.tsx` | Nút "Tiếp tục" & "Chơi lại" |
| `ConfirmDialog`| `ConfirmDialog.tsx` | Xác nhận Reset Game |

### 10. Screen Implementation Map
| Screen | Required Components | Entry Condition | Exit Action |
| ------ | ------------------- | --------------- | ----------- |
| SCR-01 Landing | `AppShell`, `GameTitle`, `HouseCanvas`, `PrimaryAction`, `ResumeActions`, `ConfirmDialog` | `phase === "landing"` | `START` hoặc Restore |
| SCR-02 Intro | `AppShell`, `IntroNarrative`, `HowToPlay`, `PrimaryAction` | `phase === "intro"` | `CONTINUE` |
| SCR-03 Scenario | `AppShell`, `ProgressIndicator`, `HouseCanvas`, `ScenarioHeader`, `ScenarioContext`, `DecisionPrompt`, `ChoiceList` | `phase === "choosing"` | `SELECT_CHOICE` |
| SCR-04 Feedback | `AppShell`, `ProgressIndicator`, `HouseCanvas`, `ConsequenceNarrative`, `ScoreDeltaList`, `PrimaryAction` | `phase === "feedback" && uiScreen === "feedback"` | Đổi transient `uiScreen` qua `knowledge` |
| SCR-05 Knowledge | `AppShell`, `ProgressIndicator`, `KnowledgeHeader`, `KnowledgeExplanation`, `ChoiceRelation`, `KeyTermList`, `SourceReference`, `PrimaryAction` | `phase === "feedback" && uiScreen === "knowledge"` | `CONTINUE` |
| SCR-06 Final | `AppShell`, `HouseCanvas`, `ProfileSummary`, `FamilyScore`, `DimensionHighlight`, `FlavorText`, `Disclaimer`, `PrimaryAction`, `ConfirmDialog` | `phase === "final"` | Mở dialog reset |

### 11. Navigation
**Dùng kiến trúc Switch-case dựa trên GameState (Không dùng React Router).**
Bằng cách sử dụng cặp `phase + uiScreen`, ta sẽ ánh xạ trực tiếp sang các Screen tương ứng. Back/Forward trên browser không phá hỏng state.

### 12. UI & Accessibility Implementation
- **UI:** Toàn bộ giá trị lấy từ CSS Variables (Design Tokens). Không hard-code hex.
- **Accessibility Checklist:** Tab navigation, Space/Enter, focus visible, aria-labels cho HouseCanvas, reduced-motion, và không dùng màu sắc là tín hiệu duy nhất (ScoreDeltaList).

### 13. Testing Strategy & Test Cases
#### Unit Tests (`tests/unit/`)
1. **Scoring (`scoring.test.ts`)**: 
   - Điểm -5 -> 0, điểm 105 -> 100.
   - Boundaries tier: `29` -> low, `30` -> mid.
   - Profile avg: `39.75` -> cracked, `40` -> transitioning.
   - KHÔNG NHÂN THÊM K=8.
2. **Reducer (`reducer.test.ts`)**: State đổi đúng sequence. Lỗi action -> no-op.
3. **Persistence (`persistence.test.ts`)**: Validate array logic, check corrupt data xoá `localStorage.removeItem`.

#### Integration/Flow Tests (`tests/integration/`)
Kiểm tra luồng liên tục sử dụng các canonical path (all A, all B, all C, hỗn hợp).

### 14. Implementation Order
1. **Bootstrap**: Cấu hình Vite, Typescript, Vitest.
2. **Design Tokens**: Code CSS variables và Typography (fonts).
3. **Domain Types**: Khai báo `types.ts`.
4. **Content Data**: Tạo `deltas.ts`, `scenarios.ts`, `knowledge.ts`.
5. **Scoring + Unlock + Reducer**: Implement các logic game pure.
6. **Persistence + Validation**: Gắn hàm load, save, và validation invariants thật chặt chẽ.
7. **Unit Tests cho Domain**: Pass toàn bộ bài test logic state/score/persistence.
8. **GameContext / UI Orchestration**: Tạo Context bọc ngoài ứng dụng, điều phối `uiScreen` và persistence.
9. **House derivation + HouseCanvas**: Ráp SVG Canvas với thuộc tính Data attributes, derive data dựa trên score.
10. **Shared Components**: Viết các UI components đơn lẻ (jsdom test nếu cần).
11. **Screens**: Hiện thực 6 Màn Hình và ráp vào Navigation (Switch-case).
12. **Integration Tests**: Chạy mô phỏng end-to-end paths.
13. **Accessibility + Reduced Motion**: Gắn aria tags, focus trap.
14. **Production Build + Final QA**: Pass build, no console errors.

### 15. Definition of Done
- **S01-S07 chạy đúng một chiều.** Choice commit một lần.
- **Data-driven hoàn toàn.**
- **Visual/Accessibility đúng `COMPONENT_SPEC.md` và `DESIGN_TOKENS.md`.**
- Build pass, tests pass, no errors, corrupt localStorage handled by deletion.
