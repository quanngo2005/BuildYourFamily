# NHÀ — GAMEPLAY_SPEC.md

> Trạng thái: **LOCKED — mọi review đã đóng (xem mục 13). Không thay đổi số liệu hay rule khi implement.**
> Nguồn: `NHA_CONTEXT.md` (Score tổng của từng choice, thresholds, unlock, final profile, MVP scope giữ nguyên).
> Nguyên tắc: Family Score là **game mechanic thuần túy**. Mapping 4 dimension ở mục 3 là **gameplay balancing**, KHÔNG phải luận điểm học thuật (xem `NHA_CONTEXT.md` §8). Coder không được thay đổi các số trong spec này.

---

## 1. Core Game State

```ts
type Dim = "economy" | "education" | "equality" | "emotion";
type ScenarioId = "S01"|"S02"|"S03"|"S04"|"S05"|"S06"|"S07";
type ChoiceId = "A" | "B" | "C";
type Phase = "landing" | "intro" | "choosing" | "feedback" | "final";

interface GameState {
  version: 1;                                   // schema version
  phase: Phase;
  currentScenario: ScenarioId;                  // scenario đang chơi
  scores: Record<Dim, number>;                  // 0..100, integer
  history: Partial<Record<ScenarioId, ChoiceId>>; // choice đã COMMIT
  completed: ScenarioId[];                      // scenario đã qua feedback + bấm Tiếp tục
  unlocked: UnlockId[];                         // derived-then-stored, xem mục 5
}
```

**Không lưu `houseState`.** House visual state là **derived** từ `scores` bằng selector thuần (mục 4). Lý do: dễ cân bằng, không lệch state, replay đơn giản.

| Quy tắc | Giá trị |
|---|---|
| Initial scores | `economy=40, education=40, equality=40, emotion=40` |
| Range | `0..100`, số nguyên |
| Clamp | Sau **mỗi** lần apply delta: `clamp(score + delta, 0, 100)` |
| Âm | Không bao giờ (clamp ở 0) |
| Initial state | `phase="landing"`, `currentScenario="S01"`, `history={}`, `completed=[]`, `unlocked=[]` |
| Persistence | `localStorage`, key `nha:v1`, ghi sau **mỗi** action làm đổi state |
| Refresh | Khôi phục đúng `phase` + `currentScenario` (kể cả đang ở `feedback`) |
| Reset | Xóa key, quay về initial state (không giữ unlock) |

---

## 2. Scenario Flow

Máy trạng thái tuyến tính, thứ tự **cố định S01 → S07**.

```text
landing --START--> intro --BEGIN--> [ choosing(Sn) --SELECT_CHOICE--> feedback(Sn) --CONTINUE--> ] × 7 --> final
```

| Câu hỏi | Quyết định |
|---|---|
| Thứ tự S01–S07 | Cố định, không xáo trộn |
| Bỏ qua scenario | **Không** |
| Quay lại scenario cũ | **Không** (MVP). Browser Back không đổi state, xem mục 8 |
| Đổi choice sau khi chọn | **Không**. Choice là commit một lần |
| Thứ tự trình bày sau khi chọn | (1) animation nhà + score đổi **cùng lúc** → (2) feedback nhân vật (Layer 1) → (3) knowledge card (Layer 2) → nút **Tiếp tục** |
| Khi nào `completed` | Khi người chơi bấm **Tiếp tục** ở `feedback` (không phải lúc chọn) |
| Khi nào sang scenario sau | Cùng lúc đánh dấu `completed`: `currentScenario = next`, `phase="choosing"` |
| Sau S07 | `phase="final"`, `currentScenario` **giữ nguyên `S07`** |
| Score hiển thị | Hiển thị ngay khi chọn (thanh + số delta nổi, vd. `+10`) |

### Reducer actions (duy nhất)

| Action | Điều kiện hợp lệ | Hiệu ứng |
|---|---|---|
| `START` | `phase==="landing"` | `phase="intro"`. Không đổi field nào khác |
| `BEGIN` | `phase==="intro"` | `phase="choosing"`. `currentScenario` đã là `S01` từ initial state, không đổi |
| `SELECT_CHOICE(sid, cid)` | `phase==="choosing"` **và** `sid===currentScenario` **và** `history[sid]` chưa có | Ghi `history[sid]=cid`, apply delta + clamp, `phase="feedback"` |
| `CONTINUE` | `phase==="feedback"` | Thêm `currentScenario` vào `completed`; recompute `unlocked`. Nếu `currentScenario !== "S07"`: `currentScenario = next`, `phase="choosing"`. Nếu `=== "S07"`: `phase="final"` (giữ `currentScenario="S07"`) |
| `RESET` | luôn hợp lệ | Về initial state (`phase="landing"`), xóa localStorage |

Action không hợp lệ → **trả về state cũ nguyên vẹn** (no-op).

### 2.1. Invariants (luôn đúng sau mọi action và khi hydrate từ localStorage)

Đặt `ORDER = [S01,S02,S03,S04,S05,S06,S07]`, `k = ORDER.indexOf(currentScenario)`.

| `phase` | `completed` | Keys của `history` | `currentScenario` |
|---|---|---|---|
| `landing`, `intro` | `[]` | `{}` | `S01` |
| `choosing` | `ORDER.slice(0, k)` | đúng bằng `completed` (chưa có key của `currentScenario`) | `ORDER[k]` |
| `feedback` | `ORDER.slice(0, k)` | `completed` + key `currentScenario` | `ORDER[k]` |
| `final` | `ORDER` (đủ 7) | đủ 7 key | `S07` |

Hệ quả: `completed` luôn là **tiền tố liên tục của `ORDER`** — không lỗ hổng, không trùng, không đảo thứ tự.

Invariant bổ sung:
- `scores` === kết quả fold từ `40/40/40/40` qua `DELTAS[sid][history[sid]]` theo thứ tự `ORDER`, **clamp sau mỗi bước**.
- `unlocked` luôn là `computeUnlocks(completed)`; khi hydrate thì **tính lại**, không tin giá trị đã lưu.
- Mỗi `history[sid]` ∈ `{A,B,C}`.

Khi hydrate, vi phạm **bất kỳ** invariant nào → bỏ dữ liệu lưu, dùng initial state. Reducer không bao giờ tạo state vi phạm invariant (action không hợp lệ là no-op). Unit test kiểm tra invariant sau mỗi action.

---

## 3. Score Delta — bảng đề xuất (cần review)

### 3.1. Quy ước quy đổi (×8)

**Vấn đề.** `NHA_CONTEXT` chỉ cho Score tổng mỗi choice trên thang nhỏ (−5…+5). Cộng thẳng vào thang 0–100 thì:
- Tổng tối đa của cả game là `3×6 + 5 = +23`. Dù dồn toàn bộ vào **một** dimension, mức cao nhất cũng chỉ `40 + 23 = 63`, **không bao giờ vượt ngưỡng `>70`**.
- Chia đều cho 4 dimension, trung bình tối đa chỉ `40 + 23/4 ≈ 45.75`, **không bao giờ đạt `≥65`** (Ngôi nhà tiến bộ).
- Tức là hai ngưỡng trong context sẽ không đạt được bất kể mapping dimension thế nào.

**Giải pháp.** Nhân mọi Score tổng gốc (units) với hệ số `K = 8` để ra điểm thực (points):

> **Σ(4 dimension) của mỗi choice = units × 8**, tức bảo toàn tổng và tỉ lệ tương đối giữa các choice của `NHA_CONTEXT`; chỉ đổi thang đo.

**Vì sao `K = 8`.** Đây là **hệ số thiết kế**, không suy ra từ context. Nó được chọn vì với bảng ở 3.2:
- đường toàn B đưa cả 4 dimension lên `>70` và trung bình 86;
- đường toàn A chạm sàn 0 ở hai dimension;
- đường toàn C ra trung bình 36, thấp hơn điểm xuất phát (40) — không có đường "không làm gì" mà vẫn thắng.

Hệ số khác (khoảng 6–10) cũng khả thi nhưng phải tính lại toàn bộ bảng và mục 3.4. `K` chỉ là thang cho game mechanic, không mang ý nghĩa học thuật.

### 3.2. Bảng (đơn vị: points; thứ tự cột E / D / Q / M)

E = economy, D = education, Q = equality, M = emotion

| Choice | Units gốc | E | D | Q | M | Σ |
|---|---:|---:|---:|---:|---:|---:|
| S01-A | −2 | 0 | 0 | −8 | −8 | −16 |
| S01-B | +3 | +6 | 0 | +10 | +8 | +24 |
| S01-C | +2 | +8 | 0 | +8 | 0 | +16 |
| S02-A | −3 | −16 | 0 | −8 | 0 | −24 |
| S02-B | +3 | +16 | 0 | +6 | +2 | +24 |
| S02-C | +2 | +8 | 0 | +4 | +4 | +16 |
| S03-A | −2 | 0 | −12 | 0 | −4 | −16 |
| S03-B | +3 | 0 | +22 | 0 | +2 | +24 |
| S03-C | −1 | 0 | −6 | 0 | −2 | −8 |
| S04-A | −3 | 0 | 0 | −10 | −14 | −24 |
| S04-B | +3 | 0 | 0 | +10 | +14 | +24 |
| S04-C | 0 | 0 | 0 | 0 | 0 | 0 |
| S05-A | −3 | 0 | 0 | −12 | −12 | −24 |
| S05-B | +3 | 0 | 0 | +12 | +12 | +24 |
| S05-C | −1 | 0 | 0 | −4 | −4 | −8 |
| S06-A | −3 | −8 | 0 | −6 | −10 | −24 |
| S06-B | +3 | +8 | 0 | +6 | +10 | +24 |
| S06-C | −2 | −4 | 0 | −8 | −4 | −16 |
| S07-A | −5 | −8 | −10 | −14 | −8 | −40 |
| S07-B | +5 | +8 | +10 | +12 | +10 | +40 |
| S07-C | −2 | +8 | 0 | −12 | −12 | −16 |

Ghi chú:
- Mỗi choice tác động 1–3 dimension, **ngoại lệ**: S07-A và S07-B tác động 4 (màn tổng kết).
- S07-C: `economy` tăng (nhà "đẹp về vật chất") nhưng equality/emotion giảm ("lạnh lẽo") — đúng consequence trong `NHA_CONTEXT`.
- S04-C: delta toàn 0 (hoa văn cũ chỉ bị phủ sơn mỏng) — vẫn tính là đã commit choice.

### 3.3. Data format (copy nguyên vào `content/`)

```ts
export const DELTAS: Record<ScenarioId, Record<ChoiceId, Record<Dim, number>>> = {
  S01: { A:{economy:0,education:0,equality:-8,emotion:-8},
         B:{economy:6,education:0,equality:10,emotion:8},
         C:{economy:8,education:0,equality:8,emotion:0} },
  S02: { A:{economy:-16,education:0,equality:-8,emotion:0},
         B:{economy:16,education:0,equality:6,emotion:2},
         C:{economy:8,education:0,equality:4,emotion:4} },
  S03: { A:{economy:0,education:-12,equality:0,emotion:-4},
         B:{economy:0,education:22,equality:0,emotion:2},
         C:{economy:0,education:-6,equality:0,emotion:-2} },
  S04: { A:{economy:0,education:0,equality:-10,emotion:-14},
         B:{economy:0,education:0,equality:10,emotion:14},
         C:{economy:0,education:0,equality:0,emotion:0} },
  S05: { A:{economy:0,education:0,equality:-12,emotion:-12},
         B:{economy:0,education:0,equality:12,emotion:12},
         C:{economy:0,education:0,equality:-4,emotion:-4} },
  S06: { A:{economy:-8,education:0,equality:-6,emotion:-10},
         B:{economy:8,education:0,equality:6,emotion:10},
         C:{economy:-4,education:0,equality:-8,emotion:-4} },
  S07: { A:{economy:-8,education:-10,equality:-14,emotion:-8},
         B:{economy:8,education:10,equality:12,emotion:10},
         C:{economy:8,education:0,equality:-12,emotion:-12} },
};
```

### 3.4. Kiểm chứng cân bằng (đã tính bằng script)

| Đường chơi | E / D / Q / M | Trung bình | Profile |
|---|---|---:|---|
| Toàn B | 78 / 72 / 96 / 98 | 86.0 | Tiến bộ |
| Toàn A | 8 / 18 / 0 / 0 | 6.5 | Vết nứt |
| Toàn C | 60 / 34 / 28 / 22 | 36.0 | Vết nứt |
| B·C xen kẽ (BCBCBCB) | 58 / 72 / 70 / 72 | 68.0 | Tiến bộ |
| Toàn B nhưng S07=A | 62 / 52 / 70 / 80 | 66.0 | Tiến bộ |
| BBBCCAA | 46 / 52 / 32 / 30 | 40.0 | Chuyển mình |

Unit test bắt buộc: với mọi choice, `Σ delta === unitsGốc × 8`.

---

## 4. House State (derived)

House **không** do choice hard-code; mọi trạng thái là hàm của `scores`.

### 4.1. Tier mỗi dimension (theo `NHA_CONTEXT` §7.4)

```ts
tier(score) = score < 30 ? "low" : score > 70 ? "high" : "mid";
```

Biên: `30` và `70` thuộc `mid`.

### 4.2. Mapping dimension → thành phần nhà

| Dim | Thành phần | `low` (<30) | `mid` | `high` (>70) |
|---|---|---|---|---|
| economy | Nền móng, bếp, khu làm việc | Móng lún, tường nứt phía kinh tế, nhà nghiêng | Móng ổn định | Móng vững, bếp rộng, khu làm việc đầy đủ |
| education | Phòng học/chơi | Tối, chật, đồ bị khóa | Sáng vừa | Sáng, rộng, có kệ sách + góc sáng tạo |
| equality | Kết cấu cân đối, tường, cửa chính | Cửa lệch, tường nghiêng, một bên cao hơn | Cân bằng cơ bản | Kết cấu đối xứng, cửa mở hai chiều |
| emotion | Ánh sáng, màu tường, góc thư giãn | Ánh sáng lạnh, sofa trống | Ánh sáng trung tính | Ánh sáng ấm, cây xanh, tiếng cười |

### 4.3. Visual theo thời gian

- Khi một dimension tăng sau choice: chạy hiệu ứng **"gia cố"** (transient, không lưu state).
- Khi giảm: hiệu ứng **"vết nứt xuất hiện"**.
- Nhãn tổng thể của nhà (hiển thị góc màn hình), từ trung bình hiện tại `avg`:
  `avg ≥ 65` → "Vững" · `40 ≤ avg < 65` → "Cân bằng" · `avg < 40` → "Mất ổn định".
- Nếu ≥1 dimension `low` → hiển thị vết nứt tương ứng bất kể nhãn tổng thể.

Selector: `selectHouse(scores): { economy: Tier; education: Tier; equality: Tier; emotion: Tier; overall: "stable"|"balanced"|"unstable" }`.

Layout mở khóa (không tạo thành phần nhà mới trước khi unlock): thành phần nào chưa unlock thì hiển thị dạng **phác thảo (outline)**, xem mục 5.

---

## 5. Progression & Unlock

Unlock được **tính lại** sau mỗi `CONTINUE` từ `completed` (không tính khi chọn choice).

| UnlockId | Điều kiện (`completed` chứa) | Nội dung mở |
|---|---|---|
| `relationships` | `S01` ∧ `S06` | 3 quan hệ: hôn nhân – huyết thống – nuôi dưỡng |
| `living_spaces` | `S03` | Phòng Giáo dục + góc Tình cảm |
| `three_foundations` | `S02` ∧ `S04` ∧ `S05` | Lớp Kinh tế – Chính trị – Văn hóa |
| `main_door` | `S07` | Hình dạng cửa chính cuối + nội quy gia đình |
| `final_profile` | `S07` ∈ `completed` | Final Profile + chia sẻ |

Hệ quả của flow tuyến tính S01→S07: các unlock xảy ra theo thứ tự thực tế `living_spaces` (sau S03) → `three_foundations` (sau S05) → `relationships` (sau S06) → `main_door` + `final_profile` (sau S07).

| Câu hỏi | Quyết định |
|---|---|
| Unlock ngay sau choice hay sau scenario | Sau scenario (khi `CONTINUE`) |
| Animation unlock | Có: toast "Đã mở: …" + phần nhà từ outline → đầy đủ |
| Lock lại khi replay | Không áp dụng (MVP không replay từng scenario; Reset xóa toàn bộ) |
| Xem phần chưa unlock | Có, dạng outline mờ + nhãn khóa, không có nội dung |

---

## 6. Final Profile

`avg = (economy + education + equality + emotion) / 4` (số thực, **không** làm tròn khi phân loại; làm tròn 1 chữ số thập phân khi hiển thị).

| Điều kiện | Flavor text |
|---|---|
| `avg ≥ 65` | **Ngôi nhà tiến bộ** |
| `40 ≤ avg < 65` | **Ngôi nhà đang chuyển mình** |
| `avg < 40` | **Ngôi nhà còn nhiều vết nứt cần gia cố** |

Biên: `65` → tiến bộ; `40` → chuyển mình.

- **Strongest** = dimension có score cao nhất; **Weakest** = thấp nhất. Hòa → lấy dimension đứng **trước** theo thứ tự cố định `economy, education, equality, emotion`.
- Câu mô tả ngắn ghép từ template theo `tier` từng dimension (4 template × 3 tier), ví dụ high-economy: "Ngôi nhà vững về kinh tế". Không dùng tính từ phán xét đạo đức về người chơi.
- Màn hiển thị: ảnh nhà hoàn chỉnh (từ `selectHouse`), 4 thanh ngang, flavor text, mô tả, "Phần vững nhất / Phần cần gia cố nhất", nút **Chơi lại**.
- Bắt buộc có dòng: *"Family Score chỉ là cơ chế trò chơi, không phải thước đo thực tế."*

---

## 7. Replay & MVP Scope

| Feature | Mức | Ghi chú |
|---|---|---|
| Normal Game (S01→S07 + Final) | **MUST** | |
| Reset / Chơi lại từ đầu | **MUST** | Confirm trước khi reset giữa chừng |
| localStorage persistence | **MUST** | Mục 1 |
| Replay từng scenario | COULD | Chưa có rule điểm; không implement |
| New Game+ | COULD | = Reset trong MVP |
| Challenge Mode (25/25/25/25) | COULD | Chỉ thay initial scores; ghi để sau |
| Family Variation | COULD | Không implement |
| Share & Compare | COULD | MVP: chỉ hiển thị, không share |
| Hidden Paths | COULD | Không implement |

Coder **không** tự thêm các tính năng COULD.

---

## 8. Edge Cases

| Tình huống | Hành vi |
|---|---|
| F5 ở `choosing` S04 | Khôi phục S04, chưa chọn |
| F5 ở `feedback` S04 | Khôi phục màn feedback S04 (choice đã commit, không chọn lại, không cộng lại) |
| Double click / click nhanh 2 lần | `SELECT_CHOICE` lần 2 bị no-op (đã `phase="feedback"`/`history[sid]` có). Delta chỉ apply 1 lần. Disable nút ngay khi click |
| Browser Back | Không đổi game state; không dùng router history cho scenario (state nội bộ). Nếu dùng route, `popstate` được chặn/đồng bộ về `phase` hiện tại |
| Mở lại scenario đã `completed` | Không có đường vào; không bao giờ cộng điểm lần 2 |
| Reset | `scores=40×4`, `history={}`, `completed=[]`, `unlocked=[]`, `currentScenario="S01"`, `phase="landing"`, xóa `nha:v1` |
| `localStorage` JSON hỏng / `version` khác / thiếu field | Bỏ, dùng initial state |
| Vi phạm bất kỳ invariant mục 2.1 (`currentScenario` ngoài S01–S07, `completed` thủng/trùng/sai thứ tự, `phase` không khớp `completed`, `scores` không khớp fold từ `history`, `history` giá trị lạ) | Fallback initial state |
| `localStorage` không khả dụng (private mode) | Game chạy bình thường, không persist, không crash (try/catch) |
| Score vượt biên khi apply delta | Clamp 0–100 |

---

## 9. Feedback & Copy Rules (từ `NHA_CONTEXT` §15)

- Hai lớp: **Creative consequence** → **Academic explanation** (hiển thị CK ID + thuật ngữ giữ nguyên).
- Không dùng "đáp án đúng/sai", "bạn trả lời đúng/sai".
- Không phán xét đạo đức người chơi.
- Câu chữ delta hiển thị dạng "Kết cấu bình đẳng +10", không dùng "điểm tốt/xấu".

## 10. Data-driven rule

Mọi scenario/choice/feedback/delta nằm trong `content/`. Logic game chỉ dùng `scenarios[currentScenario]` và `DELTAS[sid][cid]`. Không `if (scenarioId === "S01")` trong component.

## 11. Test bắt buộc

1. Σ delta = units × 8 cho 21 choice.
2. Clamp tại 0 và 100.
3. Double `SELECT_CHOICE` chỉ apply 1 lần.
4. Refresh ở `choosing` và `feedback`.
5. Unlock đúng thời điểm (mục 5).
6. Biên profile: avg 39.99 / 40 / 64.99 / 65.
7. Biên tier: 29 / 30 / 70 / 71.
8. Reset đưa về đúng initial state.
9. State hỏng → fallback initial.
10. 6 đường chơi ở mục 3.4 cho đúng kết quả.

## 12. Ngoài phạm vi

Backend, auth, DB, leaderboard, multiplayer, chatbot, admin — như `NHA_CONTEXT` §19.

---

## 13. Decision Log (đã chốt)

| # | Vấn đề | Quyết định | Hệ quả |
|---|---|---|---|
| 1 | Bảng Score Delta (mục 3) | **KEEP** toàn bộ | Giữ `K = 8`; giữ S07-A/B tác động 4 dimension (S07 là scenario tổng hợp nên là ngoại lệ hợp lệ của quy tắc "1–3 dimension"); giữ Equality toàn B = 96 (Equality là trục trọng tâm, chưa chạm 100 nên còn headroom). **Mục 3 không đổi.** |
| 2 | Education headroom | **KEEP (a)** | Education chỉ chịu tác động từ S03 và S07, tối đa 72 ở đường toàn B (đã `>70` → `high`). Không thêm Education vào scenario khác, không hạ ngưỡng riêng; ngưỡng tier `<30 / >70` áp dụng thống nhất cho cả 4 dimension. **Mục 3 và 4 không đổi.** |

Không còn Open Issue.
