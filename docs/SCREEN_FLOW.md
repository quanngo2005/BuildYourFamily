# SCREEN FLOW — NHÀ

## 1. Purpose

`SCREEN_FLOW.md` định nghĩa luồng điều hướng của game **NHÀ — Một gia đình được xây bằng những lựa chọn**.

File này xác định:

* Các Screen của game.
* Thứ tự chuyển Screen.
* Điều kiện để chuyển Screen.
* Action chính trên từng Screen.
* Quan hệ giữa Screen và `GameState`.
* Luồng refresh/persistence.
* Luồng Reset.
* Luồng lỗi hoặc state không hợp lệ.

File này **không** định nghĩa:

* Chi tiết UI layout.
* Component hierarchy.
* Typography, màu sắc, animation implementation.
* Score calculation.
* Nội dung học thuật chi tiết.
* Responsive breakpoint.

---

# 2. Screen Inventory

| ID     | Screen             | Purpose                                  | Entry                   | Exit                               |
| ------ | ------------------ | ---------------------------------------- | ----------------------- | ---------------------------------- |
| SCR-01 | Landing            | Giới thiệu game, bắt đầu/chơi lại        | App start               | Intro                              |
| SCR-02 | Intro              | Giới thiệu bối cảnh và cách chơi         | Landing                 | Scenario                           |
| SCR-03 | Scenario           | Hiển thị tình huống và lựa chọn          | Intro / Knowledge Card  | Feedback                           |
| SCR-04 | Feedback           | Hiển thị hậu quả trực tiếp của lựa chọn  | Scenario                | Knowledge Card                     |
| SCR-05 | Knowledge Card     | Giải thích kiến thức học thuật liên quan | Feedback                | Scenario tiếp theo / Final Profile |
| SCR-06 | Final Profile      | Tổng kết ngôi nhà và Family Score        | Knowledge Card S07      | Landing                            |
| SCR-07 | Reset Confirmation | Xác nhận chơi lại                        | Landing / Final Profile | Landing hoặc giữ nguyên Screen     |

---

# 3. Global Navigation Rules

## 3.1. Linear progression

Game chỉ cho phép tiến theo thứ tự:

```text
S01
 ↓
S02
 ↓
S03
 ↓
S04
 ↓
S05
 ↓
S06
 ↓
S07
 ↓
Final Profile
```

Không hỗ trợ:

* Quay lại Scenario trước.
* Skip Scenario.
* Thay đổi lựa chọn sau khi đã commit.
* Truy cập trực tiếp Scenario chưa unlock.

---

## 3.2. Một Scenario gồm 3 Screen

Mỗi Scenario có cùng navigation pattern:

```text
Scenario
   ↓ SELECT_CHOICE
Feedback
   ↓ CONTINUE
Knowledge Card
   ↓ CONTINUE
Next Scenario
```

Riêng S07:

```text
Scenario S07
   ↓ SELECT_CHOICE
Feedback S07
   ↓ CONTINUE
Knowledge Card S07
   ↓ CONTINUE
Final Profile
```

---

# 4. Main Flow

```text
┌──────────────┐
│   Landing    │
│   SCR-01     │
└──────┬───────┘
       │ START
       ▼
┌──────────────┐
│    Intro     │
│   SCR-02     │
└──────┬───────┘
       │ BEGIN_GAME
       ▼
┌──────────────────┐
│   Scenario S01   │
│      SCR-03      │
└────────┬─────────┘
         │ SELECT_CHOICE
         ▼
┌──────────────────┐
│   Feedback S01   │
│      SCR-04      │
└────────┬─────────┘
         │ CONTINUE
         ▼
┌──────────────────────┐
│  Knowledge Card S01  │
│        SCR-05        │
└──────────┬───────────┘
           │ CONTINUE
           ▼
      Scenario S02
           │
           ▼
      Feedback S02
           │
           ▼
   Knowledge Card S02
           │
           ▼
          ...
           │
           ▼
      Scenario S07
           │
           ▼
      Feedback S07
           │
           ▼
   Knowledge Card S07
           │
           │ CONTINUE
           ▼
┌──────────────────┐
│  Final Profile   │
│      SCR-06      │
└────────┬─────────┘
         │ PLAY_AGAIN
         ▼
┌──────────────────────┐
│ Reset Confirmation   │
│       SCR-07         │
└────────┬─────────────┘
         │ CONFIRM
         ▼
      Landing
```

---

# 5. SCR-01 — Landing

## Purpose

Screen khởi đầu của game.

Giới thiệu ngắn:

* Tên game.
* Concept ngôi nhà.
* Mục tiêu trải nghiệm.
* CTA bắt đầu.

## Entry

App được mở lần đầu.

Nếu không có GameState hợp lệ trong `localStorage`:

```text
Landing
```

Nếu có GameState hợp lệ:

```text
Restore saved state
        ↓
Resume tại Screen tương ứng
```

## Actions

### `START`

Chuyển:

```text
Landing → Intro
```

Không thay đổi Score.

---

## Resume

Nếu game đã có progress chưa hoàn thành, Landing có thể cung cấp:

```text
Tiếp tục
Chơi lại
```

`Tiếp tục` khôi phục đúng Screen và Scenario đang lưu.

`Chơi lại` mở:

```text
Reset Confirmation
```

---

# 6. SCR-02 — Intro

## Purpose

Giới thiệu:

* Bối cảnh.
* Metaphor ngôi nhà.
* Cách chơi.
* Ý nghĩa của các lựa chọn.

Không tính Score.

Không ghi `history`.

## Entry

```text
Landing
   ↓ START
Intro
```

## Action

### `BEGIN_GAME`

Bắt đầu Scenario đầu tiên:

```text
Intro
  ↓
Scenario S01
```

GameState:

```ts
phase = "choosing"
currentScenario = "S01"
```

---

# 7. SCR-03 — Scenario

## Purpose

Đây là Screen nơi người chơi thực hiện quyết định.

Screen phải hiển thị:

* Scenario title.
* Scenario context.
* Characters/context cần thiết.
* Câu hỏi lựa chọn.
* Các Choice A/B/C.
* Trạng thái tiến trình.

Không hiển thị đáp án đúng/sai trước khi chọn.

---

## Entry

Scenario đầu tiên:

```text
Intro
  ↓ BEGIN_GAME
Scenario S01
```

Các Scenario tiếp theo:

```text
Knowledge Card S(n-1)
        ↓ CONTINUE
Scenario Sn
```

---

## Actions

### `SELECT_CHOICE(scenarioId, choiceId)`

Khi người chơi chọn một Choice:

1. Validate Scenario hiện tại.
2. Validate Choice.
3. Tính Score Delta.
4. Clamp Score về `[0,100]`.
5. Ghi Choice vào `history`.
6. Lưu GameState.
7. Chuyển sang Feedback.

```text
Scenario
   ↓ SELECT_CHOICE
Feedback
```

### Important Rule

Choice chỉ được commit **một lần**.

Nếu Scenario đã có:

```ts
history[scenarioId]
```

thì `SELECT_CHOICE` tiếp theo là invalid action.

---

# 8. SCR-04 — Feedback

## Purpose

Cho người chơi thấy **hậu quả trực tiếp của lựa chọn đối với ngôi nhà**.

Feedback không phải Knowledge Card.

Nó tập trung vào:

> “Lựa chọn vừa rồi đã làm gì với ngôi nhà?”

---

## Entry

```text
Scenario
   ↓ SELECT_CHOICE
Feedback
```

GameState tại thời điểm này:

```ts
phase = "feedback"
currentScenario = selectedScenario
```

---

## Content

Feedback gồm:

### Layer 1 — Creative Consequence

Thể hiện thay đổi của ngôi nhà:

* Một phần nhà được xây thêm.
* Kết cấu được củng cố.
* Một vết nứt xuất hiện.
* Không gian thay đổi.
* Ánh sáng/không khí thay đổi.

Nội dung dựa trên:

```text
scenario + choice
```

và không phải nội dung học thuật độc lập.

### Score Feedback

Hiển thị những Dimension bị tác động.

Ví dụ:

```text
+ Equality
+ Emotion
```

hoặc:

```text
- Equality
- Emotion
```

Không cần hiển thị toàn bộ công thức tính.

---

## Action

### `CONTINUE`

Chuyển sang Knowledge Card của chính Scenario:

```text
Feedback Sn
    ↓ CONTINUE
Knowledge Card Sn
```

---

# 9. SCR-05 — Knowledge Card

## Purpose

Giải thích **ý nghĩa học thuật** đằng sau lựa chọn.

Đây là Screen giáo dục chính của game.

Feedback trả lời:

> “Điều gì vừa xảy ra với ngôi nhà?”

Knowledge Card trả lời:

> “Điều đó liên quan gì đến kiến thức về gia đình?”

---

## Entry

```text
Feedback Sn
    ↓ CONTINUE
Knowledge Card Sn
```

---

## Content

Knowledge Card phải được data-driven.

Mỗi Card có thể chứa:

* Tiêu đề kiến thức.
* Explanation ngắn.
* Academic concept.
* `CK_FAM_xx` reference.
* Key terms.
* Quan hệ giữa lựa chọn và kiến thức.

Ví dụ cấu trúc:

```ts
interface KnowledgeCard {
  scenarioId: ScenarioId;
  title: string;
  explanation: string;
  sourceIds: string[];
  keyTerms: string[];
}
```

---

## Academic Source Rule

Nội dung học thuật phải lấy từ:

```text
Academic Source of Truth
CK_FAM_01 → CK_FAM_18
```

Creative content không được làm thay đổi hoặc diễn giải sai claim học thuật.

---

## Action

### `CONTINUE`

Nếu chưa phải S07:

```text
Knowledge Card Sn
       ↓ CONTINUE
Scenario S(n+1)
```

Nếu là S07:

```text
Knowledge Card S07
       ↓ CONTINUE
Final Profile
```

---

# 10. Scenario Transition Matrix

| Current            | Action        | Next               |
| ------------------ | ------------- | ------------------ |
| Landing            | START         | Intro              |
| Intro              | BEGIN_GAME    | Scenario S01       |
| Scenario S01       | SELECT_CHOICE | Feedback S01       |
| Feedback S01       | CONTINUE      | Knowledge Card S01 |
| Knowledge Card S01 | CONTINUE      | Scenario S02       |
| Scenario S02       | SELECT_CHOICE | Feedback S02       |
| Feedback S02       | CONTINUE      | Knowledge Card S02 |
| Knowledge Card S02 | CONTINUE      | Scenario S03       |
| Scenario S03       | SELECT_CHOICE | Feedback S03       |
| Feedback S03       | CONTINUE      | Knowledge Card S03 |
| Knowledge Card S03 | CONTINUE      | Scenario S04       |
| Scenario S04       | SELECT_CHOICE | Feedback S04       |
| Feedback S04       | CONTINUE      | Knowledge Card S04 |
| Knowledge Card S04 | CONTINUE      | Scenario S05       |
| Scenario S05       | SELECT_CHOICE | Feedback S05       |
| Feedback S05       | CONTINUE      | Knowledge Card S05 |
| Knowledge Card S05 | CONTINUE      | Scenario S06       |
| Scenario S06       | SELECT_CHOICE | Feedback S06       |
| Feedback S06       | CONTINUE      | Knowledge Card S06 |
| Knowledge Card S06 | CONTINUE      | Scenario S07       |
| Scenario S07       | SELECT_CHOICE | Feedback S07       |
| Feedback S07       | CONTINUE      | Knowledge Card S07 |
| Knowledge Card S07 | CONTINUE      | Final Profile      |
| Final Profile      | PLAY_AGAIN    | Reset Confirmation |
| Reset Confirmation | CONFIRM       | Landing            |
| Reset Confirmation | CANCEL        | Previous Screen    |

---

# 11. SCR-06 — Final Profile

## Purpose

Tổng kết toàn bộ hành trình xây dựng ngôi nhà.

Final Profile chỉ xuất hiện sau khi hoàn thành S07.

---

## Entry Condition

```ts
completed.includes("S07")
```

và:

```text
Knowledge Card S07
        ↓ CONTINUE
Final Profile
```

---

## Content

Final Profile gồm:

1. Hình ảnh ngôi nhà cuối cùng.
2. Family Score của 4 Dimension:

   * Economy
   * Education
   * Equality
   * Emotion
3. Overall profile.
4. Dimension mạnh nhất.
5. Dimension yếu nhất.
6. Flavor text.
7. CTA chơi lại.
8. Disclaimer:

> Family Score chỉ là cơ chế trò chơi, không phải thước đo thực tế.

---

## Profile Classification

```ts
avg >= 65
→ Ngôi nhà tiến bộ

40 <= avg < 65
→ Ngôi nhà đang chuyển mình

avg < 40
→ Ngôi nhà còn nhiều vết nứt cần gia cố
```

Final Profile **không yêu cầu một Unlock condition riêng** ngoài việc hoàn thành S07.

---

# 12. SCR-07 — Reset Confirmation

## Purpose

Ngăn người chơi vô tình mất toàn bộ tiến trình.

---

## Entry

Từ:

```text
Landing
```

hoặc:

```text
Final Profile
```

khi chọn:

```text
Chơi lại
```

---

## Actions

### `CONFIRM_RESET`

Thực hiện:

```text
clear localStorage("nha:v1")
reset GameState
→ Landing
```

Game mới bắt đầu với:

```ts
scores = {
  economy: 40,
  education: 40,
  equality: 40,
  emotion: 40
}
```

và:

```ts
history = {}
completed = []
```

---

### `CANCEL`

Đóng Confirmation.

Nếu mở từ Final Profile:

```text
Reset Confirmation
        ↓ CANCEL
Final Profile
```

Nếu mở từ Landing:

```text
Reset Confirmation
        ↓ CANCEL
Landing
```

---

# 13. Persistence Flow

Game sử dụng:

```text
localStorage
key = "nha:v1"
```

State được persist sau mỗi state-changing action.

## Persist Actions

```text
START / BEGIN_GAME
SELECT_CHOICE
CONTINUE
RESET
```

Không cần persist các UI-only states như:

* Animation progress.
* Hover.
* Focus.
* Temporary visual state.

---

## Refresh During Scenario

```text
Scenario
   ↓ refresh
Restore GameState
   ↓
Same Scenario
```

Người chơi chưa chọn:

```text
phase = choosing
```

---

## Refresh During Feedback

```text
Feedback
   ↓ refresh
Restore GameState
   ↓
Feedback
```

Choice đã được commit và không được chọn lại.

---

## Refresh During Knowledge Card

```text
Knowledge Card
   ↓ refresh
Restore GameState
   ↓
Knowledge Card
```

---

## Refresh During Final Profile

```text
Final Profile
   ↓ refresh
Final Profile
```

---

# 14. Screen ↔ GameState Mapping

| Screen         | `phase`    | `currentScenario` | `history`        | `completed`        |
| -------------- | ---------- | ----------------- | ---------------- | ------------------ |
| Landing        | `landing`  | current/default   | preserved        | preserved          |
| Intro          | `intro`    | `S01`             | `{}`             | `[]`               |
| Scenario       | `choosing` | `Sn`              | previous choices | previous scenarios |
| Feedback       | `feedback` | `Sn`              | includes `Sn`    | previous scenarios |
| Knowledge Card | `feedback` | `Sn`              | includes `Sn`    | previous scenarios |
| Final Profile  | `final`    | `S07`             | all S01–S07      | all S01–S07        |

### Note

`Feedback` và `Knowledge Card` là **hai Screen riêng về navigation/UI**, nhưng có thể dùng chung:

```ts
phase = "feedback"
```

vì cả hai đều thuộc lifecycle xử lý sau khi Choice đã được commit.

Không cần tạo thêm global `phase` chỉ để phân biệt hai Screen này.

Router/screen resolver có thể dựa trên một UI-level screen state, ví dụ:

```ts
screen = "feedback" | "knowledge"
```

mà không đưa trạng thái này vào persistent `GameState` nếu không cần thiết.

---

# 15. Flow Invariants

Các invariant bắt buộc:

### Invariant 1 — Scenario progression

Tại Scenario `Sn`:

```text
completed = [S01 ... S(n-1)]
currentScenario = Sn
```

### Invariant 2 — After S07

Sau khi hoàn thành Knowledge Card S07:

```text
completed = [S01, S02, S03, S04, S05, S06, S07]
phase = final
currentScenario = S07
```

### Invariant 3 — Choice uniqueness

Mỗi Scenario chỉ có một Choice:

```text
history[Sn] = A | B | C
```

Không thể overwrite sau khi commit.

### Invariant 4 — Linear navigation

Không được:

```text
S04 → S02
S05 → S03
S07 → S06
```

### Invariant 5 — Final Profile

Không được truy cập Final Profile khi:

```text
S07 chưa completed
```

### Invariant 6 — Reset

Reset phải xóa toàn bộ gameplay progress.

---

# 16. Invalid State Handling

Nếu localStorage chứa state không hợp lệ:

```text
Invalid / corrupted state
        ↓
Discard saved state
        ↓
Initialize new game
        ↓
Landing
```

Các trường hợp invalid bao gồm:

* Sai `version`.
* `scores` không hợp lệ.
* Score ngoài `[0,100]`.
* `currentScenario` không hợp lệ.
* `history` chứa Scenario không hợp lệ.
* `completed` không đúng thứ tự.
* `completed` chứa Scenario chưa được hoàn thành.
* `phase` không phù hợp với progress.

Không cố gắng tiếp tục từ một state không xác định.

---

# 17. Screen Flow Acceptance Criteria

## Navigation

* [ ] Landing → Intro hoạt động.
* [ ] Intro → S01 hoạt động.
* [ ] S01 → Feedback S01 sau khi chọn.
* [ ] Feedback S01 → Knowledge Card S01.
* [ ] Knowledge Card S01 → S02.
* [ ] Pattern trên lặp đúng đến S07.
* [ ] Knowledge Card S07 → Final Profile.
* [ ] Final Profile → Reset Confirmation → Landing.

## Choice

* [ ] Chỉ có thể chọn Choice một lần.
* [ ] Choice được persist.
* [ ] Không thể quay lại đổi Choice.
* [ ] Không thể skip Scenario.

## Persistence

* [ ] Refresh tại Scenario giữ nguyên Scenario.
* [ ] Refresh tại Feedback giữ nguyên Feedback.
* [ ] Refresh tại Knowledge Card giữ nguyên Knowledge Card.
* [ ] Refresh tại Final Profile giữ nguyên Final Profile.
* [ ] State corrupt không làm game crash.

## Final

* [ ] Final Profile chỉ xuất hiện sau S07.
* [ ] Family Score hiển thị đúng.
* [ ] Profile classification đúng boundary.
* [ ] Disclaimer bắt buộc xuất hiện.

## Reset

* [ ] Reset xóa progress.
* [ ] Score quay về `40/40/40/40`.
* [ ] History rỗng.
* [ ] Completed rỗng.
* [ ] Game quay về Landing.
* [ ] Cancel không làm mất progress.

---

# 18. Canonical Flow

```text
LANDING
   │
   │ START
   ▼
INTRO
   │
   │ BEGIN_GAME
   ▼
┌───────────────────────────────────────────┐
│                  LOOP                     │
│                                           │
│  SCENARIO                                 │
│      │                                    │
│      │ SELECT_CHOICE                      │
│      ▼                                    │
│  FEEDBACK                                 │
│      │                                    │
│      │ CONTINUE                           │
│      ▼                                    │
│  KNOWLEDGE CARD                            │
│      │                                    │
│      │ CONTINUE                           │
│      └───────────────┐                    │
│                      │                    │
│             next Scenario                │
│                      │                    │
│                      └──────→ LOOP        │
│                                           │
└───────────────────────────────────────────┘
                       │
                       │ after Knowledge Card S07
                       ▼
                FINAL PROFILE
                       │
                       │ PLAY_AGAIN
                       ▼
              RESET CONFIRMATION
                 │           │
             CANCEL       CONFIRM
                 │           │
                 ▼           ▼
          Final Profile    Landing
```

## Core Rule

**Một lựa chọn → một Feedback → một Knowledge Card → một bước tiến trong hành trình xây nhà.**

`Scenario` là nơi **ra quyết định**.

`Feedback` là nơi **thấy hậu quả**.

`Knowledge Card` là nơi **hiểu kiến thức**.

`Final Profile` là nơi **nhìn lại toàn bộ ngôi nhà đã xây**.
