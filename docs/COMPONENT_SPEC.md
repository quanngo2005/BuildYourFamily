# COMPONENT SPEC — NHÀ

## 1. Purpose

`COMPONENT_SPEC.md` định nghĩa **component nào tồn tại, hành vi của nó, và vai trò thị giác của nó** trên từng Screen của game **NHÀ — Một gia đình được xây bằng những lựa chọn**.

File này là **contract về cấu trúc và hành vi**, không phải bản mô tả phong cách thẩm mỹ.

File này xác định:

* Component inventory theo Screen.
* Nội dung (Contains) của từng component.
* State và Behavior của từng component.
* Visual Intent: component phải truyền đạt vai trò gì.
* Avoid: những gì component không được làm.
* Quan hệ giữa component và Action trong `SCREEN_FLOW.md`.

File này **không** định nghĩa:

* Pixel, spacing, `border-radius`, shadow, duration animation.
* Màu sắc, typography cụ thể (thuộc Design Tokens).
* Responsive breakpoint.
* Score calculation.
* Nội dung chữ chi tiết của Scenario / Feedback / Knowledge Card (thuộc content data).
* Hình vẽ ngôi nhà cụ thể (thuộc art direction).

> Nếu một chi tiết visual không được ghi ở đây và không có Visual Intent hỗ trợ, **không thêm**.

---

## 2. Cấu trúc mỗi component

Mỗi component được mô tả bằng 6 mục:

```text
Purpose        → Component tồn tại để làm gì
Contains       → Nó chứa những gì
States         → Các trạng thái hợp lệ
Behavior       → Phản ứng với user / GameState
Visual Intent  → Nó phải truyền đạt vai trò / cảm giác gì
Avoid          → Những thứ không được làm
```

### Quy tắc ghi

| Nên ghi                        | Không nên ghi                  |
| ------------------------------ | ------------------------------ |
| Vai trò component              | `border-radius: 16px`          |
| Nội dung                       | Shadow `0 4px ...`             |
| State                          | Gradient                       |
| Interaction                    | Animation duration             |
| Visual intent                  | “Modern / beautiful / premium” |
| Những thứ **không được làm**   | Trang trí tùy hứng             |

---

## 3. Design Principles

Ba nguyên tắc chi phối mọi quyết định component.

### P1 — House là visual anchor duy nhất

Ngôi nhà là thứ duy nhất được phép thu hút ánh nhìn mạnh. Mọi component khác (text, choice, button, score) là **lớp phục vụ**, không cạnh tranh với ngôi nhà về kích thước, độ tương phản hay chuyển động.

### P2 — Mỗi visual phải có nghĩa gameplay

Crack, ánh sáng, phòng, cửa, kết cấu… chỉ xuất hiện khi phản ánh `GameState` hoặc hậu quả của một Choice. Không thêm yếu tố “cho đẹp”.

### P3 — Editorial/interface tối giản hơn card-heavy UI

Game đọc như một câu chuyện có bố cục biên tập: văn bản, khoảng trắng, ngôi nhà. Không biến Screen thành dashboard nhiều card.

---

## 4. Anti-Slop Rules

Áp dụng cho **toàn bộ** component.

* No generic dashboard UI.
* No literal cards. `ChoiceCard` là tên domain, nhưng hiển thị là **hàng được ngăn bằng hairline rule** (xem `DESIGN_TOKENS.md` §11); mọi nội dung khác là văn bản trên nền, nhóm bằng whitespace và rule.
* No decorative icons without semantic purpose.
* No gradients unless explicitly specified.
* No glassmorphism.
* No excessive rounded containers.
* No gamification badges unrelated to gameplay.
* No confetti, điểm thưởng, streak, achievement popup.
* No “Đúng / Sai” hay màu xanh/đỏ kiểu quiz gắn lên Choice.
* No AI-generated decorative illustrations.
* No emoji dùng làm trang trí.
* No placeholder copy kiểu “Welcome to your journey!”.
* Do not introduce UI patterns not defined in this specification.

### Kiểm tra nhanh trước khi thêm bất kỳ yếu tố UI nào

```text
1. Yếu tố này có nằm trong COMPONENT_SPEC không?
2. Nó phản ánh GameState hoặc hỗ trợ một Action không?
3. Nếu bỏ nó đi, người chơi có mất thông tin hay khả năng hành động không?
```

Nếu cả ba câu đều “không” → **xóa**.

---

## 5. Component Map theo Screen

| Screen             | Components chính                                                                                                    |
| ------------------ | ------------------------------------------------------------------------------------------------------------------- |
| SCR-01 Landing     | `AppShell`, `GameTitle`, `HouseCanvas`, `PrimaryAction`, `ResumeActions`                                            |
| SCR-02 Intro       | `AppShell`, `IntroNarrative`, `HowToPlay`, `PrimaryAction`                                                          |
| SCR-03 Scenario    | `AppShell`, `ProgressIndicator`, `HouseCanvas`, `ScenarioHeader`, `ScenarioContext`, `DecisionPrompt`, `ChoiceList` |
| SCR-04 Feedback    | `AppShell`, `ProgressIndicator`, `HouseCanvas`, `ConsequenceNarrative`, `ScoreDeltaList`, `PrimaryAction`           |
| SCR-05 Knowledge   | `AppShell`, `ProgressIndicator`, `KnowledgeHeader`, `KnowledgeExplanation`, `ChoiceRelation`, `KeyTermList`, `SourceReference`, `PrimaryAction` |
| SCR-06 Final       | `AppShell`, `HouseCanvas` (final), `ProfileSummary`, `FamilyScore`, `DimensionHighlight`, `FlavorText`, `Disclaimer`, `PrimaryAction` |
| SCR-07 Reset       | `ConfirmDialog`                                                                                                     |

---

# 6. Shared Components

## 6.1. AppShell

**Purpose**
Khung bao ngoài của mọi Screen. Giữ bố cục ổn định để ngôi nhà và nội dung không “nhảy” khi chuyển Screen.

**Contains**

* Vùng nội dung chính.
* Vùng cho `HouseCanvas` (nếu Screen có).
* Vùng cho action chính.

**States**

* Default.

**Behavior**

* Không chứa logic game.
* Không hiển thị thanh điều hướng toàn cục, menu, hoặc nút Back (game là linear — xem `SCREEN_FLOW` §3.1).
* Resolve Screen dựa trên `phase` + UI-level `screen`.

**Visual Intent**

* Gần như vô hình. Người chơi chú ý vào ngôi nhà và nội dung, không phải khung.
* Cảm giác một trang sách/bản vẽ hơn là một ứng dụng.

**Avoid**

* Header/footer có logo, menu, avatar.
* Sidebar.
* Nền trang trí, pattern, particle.
* Nút “Back” hoặc breadcrumb cho phép quay lại Scenario trước.

---

## 6.2. HouseCanvas

**Purpose**
Hiển thị ngôi nhà — visual anchor duy nhất — phản ánh trực tiếp kết quả các lựa chọn đã commit.

**Contains**

* Hình ngôi nhà ở trạng thái hiện tại.
* Các yếu tố có nghĩa gameplay: phần được xây thêm, kết cấu củng cố, vết nứt, thay đổi không gian, ánh sáng/không khí.
* Hai lớp dữ liệu, cả hai deterministic: (1) **mức Dimension** (`LOW / MID / HIGH`) theo từng zone; (2) **Choice mark**, mỗi Choice đã commit tạo một dấu vết bền vững trên nhà từ `HouseEffect` (xem `DESIGN_TOKENS.md` §15).

**States**

| State        | Mô tả                                                          |
| ------------ | -------------------------------------------------------------- |
| `base`       | Ngôi nhà khởi đầu (Landing, Intro, Scenario S01)                |
| `current`    | Ngôi nhà phản ánh `history` hiện có (Scenario S02+)             |
| `changed`    | Ngôi nhà ngay sau Choice, thể hiện thay đổi vừa xảy ra (Feedback) |
| `final`      | Ngôi nhà hoàn chỉnh sau S07 (Final Profile)                     |

**Behavior**

* Nhận dữ liệu từ `history` và `scores`; không tự quyết định logic.
* Ở Feedback, thay đổi do Choice vừa chọn phải **nhận ra được** so với state trước đó.
* Khi `prefers-reduced-motion`: chuyển state không dùng chuyển động; hiển thị trực tiếp kết quả.
* Animation reveal chỉ chạy **ngay sau `SELECT_CHOICE`**, từng phần tử một. Không replay khi refresh, khi quay lại Screen, hay khi sang Knowledge Card. Hình tĩnh phải giống hệt có hoặc không có animation.
* Phải có mô tả thay thế (text alternative) tóm tắt trạng thái nhà cho trình đọc màn hình.

**Visual Intent**

* Là thứ đầu tiên người chơi nhìn thấy trên mọi Screen có nó.
* Thay đổi phải **đọc được như hậu quả**: người chơi nhìn vào là hiểu “có gì mới/ nứt/ củng cố”.
* Mỗi biến đổi gắn với một cặp `scenario + choice` cụ thể (P2).

**Avoid**

* Vật trang trí không phản ánh state (cây cối, mây, chim, hiệu ứng lấp lánh).
* Hiển thị đúng/sai bằng màu viền hay icon phủ lên nhà.
* Hiệu ứng ăn mừng.
* Hình nhà do AI sinh ra ở chế độ ngẫu nhiên, khác nhau mỗi lần.
* Để UI khác lấn át ngôi nhà về kích thước hoặc độ tương phản.

---

## 6.3. ProgressIndicator

**Purpose**
Cho người chơi biết họ đang ở đâu trong hành trình 7 Scenario.

**Contains**

* Vị trí hiện tại (S01 → S07).
* Tổng số Scenario.

**States**

* Mỗi mốc: `completed` / `current` / `upcoming`.

**Behavior**

* Chỉ hiển thị, **không tương tác**. Không cho nhảy đến Scenario khác.
* Dựa trên `completed` và `currentScenario`.
* Ở Feedback và Knowledge Card, mốc hiện tại vẫn là `current` cho đến khi `CONTINUE` từ Knowledge Card.

**Visual Intent**

* Một chỉ báo tiến trình kín đáo, giống đánh số chương.
* Phải phụ thuộc vào ngôi nhà về mặt thị giác (P1).

**Avoid**

* Thanh phần trăm kiểu loading.
* Huy hiệu/khóa/mở khóa trên các mốc.
* Mốc có thể bấm.
* Hiển thị dưới dạng danh sách card.

---

## 6.4. PrimaryAction

**Purpose**
Hành động duy nhất để tiến tới bước tiếp theo trên một Screen không có lựa chọn.

**Contains**

* Một nhãn hành động ngắn, mô tả đúng điều sẽ xảy ra.

**States**

* Default / Hover / Focus / Pressed / Disabled.

**Behavior**

> Bảng dưới đây (cùng nhãn của `ResumeActions` và `ConfirmDialog`) là **nguồn duy nhất** cho copy của nút. `DESIGN_TOKENS.md` không định nghĩa nhãn.

| Screen                | Nhãn                  | Action                   |
| --------------------- | --------------------- | ------------------------ |
| Landing               | Bắt đầu               | `START`                  |
| Intro                 | Bắt đầu xây nhà       | `BEGIN_GAME`             |
| Feedback              | Tiếp tục              | `CONTINUE`               |
| Knowledge Card        | Tiếp tục              | `CONTINUE`               |
| Knowledge Card S07    | Xem ngôi nhà          | `CONTINUE` → Final       |
| Final Profile         | Chơi lại              | `PLAY_AGAIN`             |

* Mỗi Screen chỉ có **một** PrimaryAction.
* Chống double-activation: sau lần kích hoạt đầu, không kích hoạt lại cho đến khi Screen đổi.
* Truy cập được bằng bàn phím (Enter/Space) và có focus rõ.

**Visual Intent**

* Rõ ràng là điểm hành động tiếp theo, nhưng **yên tĩnh hơn ngôi nhà**.
* Ngôn ngữ như một bước trong câu chuyện, không phải CTA bán hàng.

**Avoid**

* Gradient, glow, pulse, bounce để “thu hút”.
* Nhãn kiểu “Khám phá ngay!”, “Chơi thôi!”.
* Hai nút cùng cấp trên Screen không phải Reset.
* Icon mũi tên trang trí nếu không giúp hiểu hành động.

---

## 6.5. ConfirmDialog

**Purpose**
Xác nhận hành động phá huỷ (Reset). Triển khai SCR-07.

**Contains**

* Câu hỏi xác nhận.
* Một câu nêu rõ hậu quả: toàn bộ tiến trình sẽ bị xóa.
* Action xác nhận (`CONFIRM_RESET`), nhãn: **Xóa tiến trình và chơi lại**.
* Action huỷ (`CANCEL`), nhãn: **Giữ tiến trình**.

**States**

* Open / Closed.

**Behavior**

* `CONFIRM_RESET` → clear `localStorage("nha:v1")`, reset GameState → Landing.
* `CANCEL` → đóng; quay về Screen đã mở nó (Landing hoặc Final Profile). Không mất progress.
* Phím `Esc` = `CANCEL`.
* Focus mặc định đặt vào `CANCEL` (hướng tới hành động an toàn).
* Focus bị giữ trong dialog khi mở; trả focus về nút đã mở sau khi đóng.
* Nền phía sau không tương tác được khi dialog mở.

**Visual Intent**

* Nghiêm túc, ngắn gọn, không gây hoảng.
* Phân biệt rõ hành động phá huỷ với hành động huỷ bằng **nhãn chữ**, không chỉ bằng màu.

**Avoid**

* Màu đỏ cảnh báo quá mạnh, icon cảnh báo, rung/animation gây chú ý.
* Câu chữ mơ hồ (“Bạn có chắc không?” mà không nói mất gì).
* Cho phép đóng bằng click ra ngoài nếu điều đó có thể bị hiểu nhầm thành xác nhận.

---

# 7. SCR-01 — Landing

## 7.1. GameTitle

**Purpose**
Nêu tên game và concept ngôi nhà.

**Contains**

* Tên: **NHÀ**.
* Một dòng phụ: *Một gia đình được xây bằng những lựa chọn*.

**States**

* Default.

**Behavior**

* Tĩnh. Không tương tác.

**Visual Intent**

* Tên game là chữ, đặt có chủ đích cạnh ngôi nhà; giống tên một ấn phẩm biên tập hơn là logo ứng dụng.

**Avoid**

* Logo/biểu tượng tự sinh.
* Hiệu ứng chữ (neon, gradient text, glow).
* Tagline marketing.

---

## 7.2. HouseCanvas (state `base`)

Xem §6.2.

**Ở Landing**

* Hiển thị ngôi nhà khởi đầu, **chưa có thay đổi nào**.
* Nếu có progress đã lưu, vẫn hiển thị `base` (không tiết lộ trạng thái ở Landing để tránh nhầm lẫn với resume).

---

## 7.3. PrimaryAction — `START`

Xem §6.4.

**Điều kiện hiển thị**

`GameState.phase = "landing"` **không** cho biết có progress hay không, nên Landing quyết định bằng một selector dẫn xuất (không lưu vào `GameState`):

```ts
hasResumableProgress =
  savedState is valid
  && savedState.phase !== "final"
  && savedState.phase !== "landing"
```

| Điều kiện                                              | Landing hiển thị   |
| ------------------------------------------------------ | ------------------ |
| Không có saved state                                   | `Bắt đầu`          |
| Saved state không hợp lệ (đã bị discard theo §16 SCREEN_FLOW) | `Bắt đầu`   |
| Saved state hợp lệ, `phase` là `intro` / `choosing` / `feedback` | `ResumeActions` |
| Saved state hợp lệ, `phase = final`                    | `Bắt đầu` (xem Open Question #1) |

* `Bắt đầu` và `ResumeActions` **không bao giờ** hiển thị cùng lúc.
* Việc validate saved state dùng cùng logic với luồng Invalid State của `SCREEN_FLOW` §16; component không tự validate.

---

## 7.4. ResumeActions

**Purpose**
Cho người chơi có progress chưa hoàn thành chọn tiếp tục hay chơi lại.

**Visibility**

* Chỉ render khi `hasResumableProgress = true` (xem §7.3).

**Contains**

* `Tiếp tục`
* `Chơi lại`

**States**

* Mỗi nút: Default / Hover / Focus / Pressed.

**Behavior**

* `Tiếp tục` → khôi phục đúng Screen + Scenario đang lưu (theo `SCREEN_FLOW` §13).
* `Chơi lại` → mở `ConfirmDialog` (SCR-07). `CANCEL` quay về Landing.
* `Tiếp tục` là hành động chính; `Chơi lại` là hành động phụ, không được ngang hàng về độ nổi bật.

**Visual Intent**

* Phân cấp rõ: Tiếp tục nổi hơn Chơi lại, nhưng cả hai đều thấp hơn ngôi nhà.
* `Chơi lại` có vẻ ít nổi bật vì là hành động phá huỷ.

**Avoid**

* Hiển thị `Chơi lại` như hành động chính.
* Hiển thị `Bắt đầu` và `Tiếp tục` cùng lúc.
* Hiển thị thông tin chi tiết progress dạng dashboard (điểm, thống kê).

---

# 8. SCR-02 — Intro

## 8.1. IntroNarrative

**Purpose**
Đặt bối cảnh và metaphor ngôi nhà.

**Contains**

* Đoạn văn ngắn về bối cảnh.
* Giải thích ngôi nhà đại diện cho điều gì.

**States**

* Default.

**Behavior**

* Tĩnh; có thể cuộn nếu nội dung dài.
* Không tính Score, không ghi `history`.

**Visual Intent**

* Đọc như lời dẫn mở đầu của một cuốn sách; ưu tiên văn bản, khoảng trắng.
* Giọng văn thuộc content layer, không do component quyết định.

**Avoid**

* Chia đoạn thành nhiều card.
* Slideshow/carousel nhiều trang.
* Minh họa trang trí.
* Typewriter effect kéo dài.

---

## 8.2. HowToPlay

**Purpose**
Giải thích ngắn cách chơi: đọc tình huống → chọn → thấy hậu quả → hiểu kiến thức.

**Contains**

* Chuỗi bước cốt lõi tương ứng với Core Rule: Scenario → Feedback → Knowledge Card.
* Lưu ý: mỗi lựa chọn chỉ được chọn một lần.

**States**

* Default.

**Behavior**

* Tĩnh. Không tương tác.

**Visual Intent**

* Chỉ truyền đạt cấu trúc vòng lặp; ngắn gọn như chú thích.
* Có thể là danh sách đánh số hoặc văn bản liền mạch; đánh số chỉ khi **thứ tự có ý nghĩa**.

**Avoid**

* Bộ icon minh hoạ từng bước.
* Giải thích công thức tính điểm (không thuộc SCREEN_FLOW).
* Biến thành tutorial tương tác.

---

## 8.3. PrimaryAction — `BEGIN_GAME`

Xem §6.4. Chuyển sang Scenario S01, đặt `phase = "choosing"`, `currentScenario = "S01"`.

---

# 9. SCR-03 — Scenario

Đây là Screen **ra quyết định**. Mọi component ở đây phải giúp người chơi **đọc, cân nhắc, chọn**.

## 9.1. ScenarioHeader

**Purpose**
Cho biết đây là tình huống nào.

**Contains**

* Scenario title.
* Số thứ tự (ví dụ `S03 / 07`) — có thể gộp với `ProgressIndicator`, không lặp thừa.

**States**

* Default.

**Behavior**

* Tĩnh.

**Visual Intent**

* Giống tiêu đề chương.

**Avoid**

* Badge “Level”, “Stage”, “Mission”.
* Icon đại diện cho tình huống nếu không có nghĩa gameplay.

---

## 9.2. ScenarioContext

**Purpose**
Trình bày bối cảnh và nhân vật cần thiết để người chơi hiểu tình huống.

**Contains**

* Mô tả tình huống.
* Nhân vật/ngữ cảnh cần thiết.

**States**

* Default.

**Behavior**

* Tĩnh; cuộn được nếu dài.
* **Không** chứa gợi ý đáp án đúng/sai.

**Visual Intent**

* Văn bản biên tập, dễ đọc, là thân bài của câu chuyện.
* Nhân vật được nêu bằng chữ; nếu có minh hoạ, phải phục vụ hiểu tình huống.

**Avoid**

* Ảnh/avatar nhân vật trang trí.
* Bubble chat giả lập.
* Từ ngữ dẫn dắt khiến một lựa chọn rõ ràng là “tốt hơn”.
* Chia context thành nhiều card.

---

## 9.3. DecisionPrompt

**Purpose**
Nêu câu hỏi lựa chọn.

**Contains**

* Một câu hỏi/yêu cầu quyết định.

**States**

* Default.

**Behavior**

* Tĩnh.

**Visual Intent**

* Nổi vừa đủ để đánh dấu điểm chuyển từ “đọc” sang “quyết định”.

**Avoid**

* Dùng ngôn ngữ quiz (“Chọn đáp án đúng”).
* Đếm ngược thời gian.

---

## 9.4. ChoiceList

**Purpose**
Chứa các Choice A/B/C của Scenario hiện tại.

**Contains**

* 3 `ChoiceCard` theo thứ tự A, B, C.

**States**

| State        | Mô tả                                              |
| ------------ | -------------------------------------------------- |
| `choosing`   | Tất cả ChoiceCard có thể chọn                       |
| `committed`  | Một Choice đã được commit; tất cả `Disabled`        |

**Behavior**

* Chỉ cho phép chọn **một lần** (`SCREEN_FLOW` §7, Invariant 3).
* Khi `history[scenarioId]` đã tồn tại → `ChoiceList` ở `committed`; bất kỳ `SELECT_CHOICE` nào cũng là invalid action.
* Không xáo trộn thứ tự A/B/C.
* Điều hướng bàn phím: có thể di chuyển giữa các Choice và kích hoạt bằng Enter/Space.
* Truy cập ngữ nghĩa: nhóm lựa chọn (radio-group hoặc tương đương) có nhãn là `DecisionPrompt`.

**Visual Intent**

* Các Choice **ngang hàng** nhau về trọng lượng thị giác; không lựa chọn nào trông “đúng” hơn.

**Avoid**

* Shuffle ngẫu nhiên.
* Đánh dấu Choice “khuyên dùng”.
* Layout lưới nhiều cột như bảng giá.

---

## 9.5. ChoiceCard

**Purpose**
Cho người chơi thực hiện một quyết định.

**Contains**

* Choice label (A / B / C).
* Choice text.

**States**

* Default
* Hover
* Focus
* Pressed
* Selected (thoáng qua, ngay trước khi chuyển Feedback)
* Disabled (sau khi đã commit)

**Behavior**

* Click / Enter / Space → `SELECT_CHOICE(scenarioId, choiceId)`.
* Hành động chạy theo chuỗi: validate → tính delta → clamp `[0,100]` → ghi `history` → lưu → chuyển Feedback.
* Sau khi `Selected` → không cho đổi, không cho chọn lại.
* Chọn một lần duy nhất; chống double-click/double-tap tạo hai commit.
* Không hiển thị Score Delta hay đánh giá **trước** khi chọn.
* Không có bước “xác nhận lại” Choice (không có nút Submit riêng) — Choice được commit ngay khi chọn. *Nếu product muốn thêm bước xác nhận, phải sửa SCREEN_FLOW trước.*

**Visual Intent**

* Giống một **quyết định trong câu chuyện**, không giống quiz option.
* Hiển thị là **hàng được ngăn bằng hairline rule**, không phải hộp: nhãn A/B/C nằm trong vòng tròn nhỏ (vòng này là ranh giới tương tác), văn bản Choice là chữ serif.
* Hover thể hiện bằng nền và viền vòng nhãn, không dịch chuyển, không phóng to, không đổ bóng.
* Văn bản của Choice là trọng tâm; nhãn A/B/C là nhãn phụ.
* `Selected` truyền đạt “đã quyết định”, không phải “đúng”.
* `Disabled` truyền đạt “đã khóa”, không phải “sai”.

**Avoid**

* Badge “Đúng / Sai”.
* Gamification kiểu điểm thưởng, confetti, âm thanh chúc mừng.
* Radio button/checkbox trang trí kiểu form khảo sát.
* Gradient, glassmorphism, bo tròn quá mức.
* Icon trang trí không có nghĩa.
* Màu xanh/đỏ gắn với tốt/xấu.
* Hiệu ứng hover mạnh (phóng to, nảy, bóng đổ nặng).

---

## 9.6. HouseCanvas (state `current`)

Xem §6.2.

**Ở Scenario**

* Hiển thị ngôi nhà phản ánh các Choice **trước đó** (`history`).
* Scenario S01: `base`.
* Không có thay đổi nào tiết lộ kết quả của Choice sắp chọn.

---

# 10. SCR-04 — Feedback

Feedback trả lời: **“Lựa chọn vừa rồi đã làm gì với ngôi nhà?”**

## 10.1. HouseCanvas (state `changed`)

Xem §6.2.

**Ở Feedback**

* Thể hiện thay đổi cụ thể do `scenario + choice` vừa commit.
* Thay đổi phải **dễ nhận ra** so với state trước.
* Hiển thị như nhau cho mọi người dùng cùng Choice (deterministic).
* Choice mark mới nhận ra được **không cần chuyển động**: có nhấn mạnh tĩnh và annotation kèm theo. Refresh tại Feedback dựng lại đúng khung hình này từ `history[currentScenario]`.

---

## 10.2. ConsequenceNarrative

**Purpose**
Diễn đạt hậu quả sáng tạo (Layer 1 — Creative Consequence) bằng lời.

**Contains**

* Mô tả ngắn thay đổi của ngôi nhà: xây thêm, củng cố, vết nứt, không gian, ánh sáng/không khí.

**States**

* Default.

**Behavior**

* Nội dung lấy từ data theo `scenario + choice`.
* **Không** chứa giải thích học thuật độc lập (thuộc Knowledge Card).
* Không hiển thị công thức tính điểm.

**Visual Intent**

* Giọng kể, gắn chặt với hình ảnh ngôi nhà.
* Ngắn; để hình ảnh gánh phần lớn nghĩa.

**Avoid**

* Chuyển thành bài giảng.
* Ngôn ngữ phán xét (“Bạn đã chọn sai”).
* Lặp lại nguyên văn Choice text.

---

## 10.3. ScoreDeltaList

**Purpose**
Cho thấy Dimension nào bị tác động, dưới dạng **annotation gắn lên ngôi nhà**.

**Contains**

* Danh sách Dimension bị ảnh hưởng, kèm hướng thay đổi:

```text
+ Equality
+ Emotion
```

hoặc:

```text
- Equality
- Emotion
```

* Dimension thuộc: Economy, Education, Equality, Emotion.

**States**

* Mỗi dòng: `positive` / `negative`.

**Behavior**

* Chỉ hiển thị Dimension **thực sự bị tác động**.
* Không hiển thị toàn bộ công thức.
* Hướng thay đổi phải truyền đạt bằng **ký hiệu và chữ** (`+` / `-`), không chỉ bằng màu.
* **Chỉ hiển thị hướng `+` / `-` của Dimension, không hiển thị số điểm** (quyết định đã chốt). Lý do: con số như `+8`, `-14` khiến người chơi chuyển sang tối ưu điểm thay vì suy nghĩ về lựa chọn, và biến game từ “xây nhà” thành scoring game.
* Không biểu diễn độ lớn bằng cách khác (số lượng dấu `+`, độ dày, cỡ chữ, thanh), vì đó là số điểm được mã hóa gián tiếp.
* Score Delta đã tính vẫn được ghi vào `scores` như bình thường; quyết định này chỉ ảnh hưởng đến **hiển thị**.
* Số điểm chỉ xuất hiện một lần, ở `FamilyScore` trên Final Profile, khi người chơi đã hết quyết định để đưa ra.

**Layout (annotation)**

* Mỗi Dimension bị tác động có một nhãn `+ Dimension` hoặc `− Dimension` (dấu trừ thật `U+2212`), nối bằng đường dẫn mảnh tới **zone** của Dimension đó trên ngôi nhà (`DESIGN_TOKENS.md` §14.2, §15.2).
* Nhãn nằm ở vùng trống quanh bản vẽ, không đè lên hình.
* Màn hình hẹp: bỏ đường dẫn, hiển thị nhãn dạng danh sách ngay dưới ngôi nhà, theo thứ tự Dimension cố định. Thông tin phải giống hệt hai layout.
* Text cho trình đọc màn hình nêu hướng bằng lời (ví dụ “Equality: tăng”), vì `+` / `−` đơn thuần không đủ.
* Nhãn dùng `text.primary`; không có màu xanh/đỏ.

**Visual Intent**

* Giống chú thích kỹ thuật bên cạnh bản vẽ — chính xác, kín đáo.
* Thông tin phụ trợ cho hậu quả của ngôi nhà, không phải “bảng điểm”.

**Avoid**

* Thanh tiến trình/gauge cho từng Dimension.
* Bất kỳ con số điểm nào (`+8`, `-14`), kể cả nhỏ hoặc ẩn trong tooltip.
* Mã hóa độ lớn gián tiếp (nhiều dấu `+`, cỡ chữ to nhỏ, độ đậm).
* Hiệu ứng đếm tăng/giảm.
* Màu xanh/đỏ là tín hiệu duy nhất.
* Icon cảm xúc hoặc huy chương.
* Hiển thị tổng điểm hoặc xếp hạng.

---

## 10.4. PrimaryAction — `CONTINUE`

Xem §6.4. Chuyển sang Knowledge Card của chính Scenario.

---

# 11. SCR-05 — Knowledge Card

Knowledge Card trả lời: **“Điều đó liên quan gì đến kiến thức về gia đình?”**

Toàn bộ nội dung phải **data-driven** theo `KnowledgeCard`:

```ts
interface KnowledgeCard {
  scenarioId: ScenarioId;
  title: string;
  explanation: string;
  sourceIds: string[];
  keyTerms: string[];
}
```

## 11.1. KnowledgeHeader

**Purpose**
Nêu tên khái niệm học thuật.

**Contains**

* `title`.

**States**

* Default.

**Behavior**

* Tĩnh.

**Visual Intent**

* Rõ ràng là chuyển từ “câu chuyện” sang “kiến thức”, nhưng cùng ngôn ngữ biên tập với phần còn lại.

**Avoid**

* Badge “Bạn đã học được!”.
* Icon bóng đèn, sách, mũ cử nhân trang trí.

---

## 11.2. KnowledgeExplanation

**Purpose**
Giải thích ngắn gọn ý nghĩa học thuật.

**Contains**

* `explanation`.

**States**

* Default.

**Behavior**

* Chỉ hiển thị nội dung từ Academic Source of Truth (`CK_FAM_01` → `CK_FAM_18`).
* Creative layer không được thay đổi hay diễn giải sai claim học thuật.
* Cuộn được nếu dài.

**Visual Intent**

* Văn bản dễ đọc, nghiêm túc, trung tính.
* Khác Feedback ở **giọng điệu và nhịp**, không phải ở “kiểu card”.

**Avoid**

* Trình bày giống bài kiểm tra.
* Nhúng thêm claim không có trong nguồn.
* Hộp callout có nhiều màu.

---

## 11.3. ChoiceRelation

**Purpose**
Nối lựa chọn của người chơi với kiến thức, để Knowledge Card không tách rời hành trình.

**Contains**

* Tham chiếu ngắn đến Choice đã chọn (`history[scenarioId]`).
* Một câu liên hệ giữa lựa chọn và khái niệm.

**States**

* Default.

**Behavior**

* Nội dung lấy từ data.
* Chỉ **mô tả** quan hệ; không chấm điểm Choice đúng/sai.

**Visual Intent**

* Giống một dòng chú thích cầu nối, không phải khối nổi bật.

**Avoid**

* Phán xét Choice.
* Hiển thị lại Score Delta (đã thuộc Feedback).

---

## 11.4. KeyTermList

**Purpose**
Hiển thị các thuật ngữ khóa cần nhớ.

**Contains**

* `keyTerms[]`.

**States**

* Default.
* (Tùy chọn) mỗi term có thể mở giải thích ngắn — **chỉ khi** data có định nghĩa.

**Behavior**

* Nếu `keyTerms` rỗng → không render component.
* Không thêm định nghĩa không có trong nguồn.

**Visual Intent**

* Đọc như danh sách thuật ngữ cuối chương, trong dòng văn bản.

**Avoid**

* Hàng loạt “chip/tag” màu sắc.
* Nhóm màu theo Dimension.
* Làm keyword nhấp nháy để thu hút.

---

## 11.5. SourceReference

**Purpose**
Cho biết nội dung học thuật dựa trên nguồn nào.

**Contains**

* `sourceIds[]` (ví dụ `CK_FAM_03`) ở dạng có thể đọc được.

**States**

* Default.

**Behavior**

* Mỗi `sourceId` phải tồn tại trong Academic Source of Truth.
* Nếu thiếu → không hiển thị tham chiếu giả; ghi lỗi dữ liệu trong môi trường dev.

**Visual Intent**

* Kín đáo, giống chú thích nguồn.

**Avoid**

* Link/hyperlink giả.
* Hiển thị `sourceId` thô khiến người chơi không hiểu; nếu cần, kèm nhãn dễ đọc từ data.

---

## 11.6. PrimaryAction — `CONTINUE`

Xem §6.4.

* Nếu chưa phải S07 → `Scenario S(n+1)`.
* Nếu là S07 → `Final Profile`; nhãn khác (ví dụ `Xem ngôi nhà`).

---

# 12. SCR-06 — Final Profile

Final Profile là nơi **nhìn lại toàn bộ ngôi nhà đã xây**.

Chỉ truy cập được khi `completed.includes("S07")`.

## 12.1. HouseCanvas (state `final`)

Xem §6.2.

**Ở Final Profile**

* Là yếu tố chiếm ưu thế của Screen.
* Phản ánh **toàn bộ** `history` S01–S07.
* Cùng `history` luôn cho cùng hình ảnh.

---

## 12.2. ProfileSummary

**Purpose**
Cho biết Overall profile của ngôi nhà.

**Contains**

* Một nhãn profile theo phân loại:

| Điều kiện          | Nhãn                                       |
| ------------------ | ------------------------------------------ |
| `avg >= 65`        | Ngôi nhà tiến bộ                           |
| `40 <= avg < 65`   | Ngôi nhà đang chuyển mình                  |
| `avg < 40`         | Ngôi nhà còn nhiều vết nứt cần gia cố      |

**States**

* Ba biến thể theo bảng trên.

**Behavior**

* Tính từ 4 Dimension; boundary đúng như bảng.
* Không hiển thị `avg` thô nếu không được yêu cầu.

**Visual Intent**

* Một câu kết luận về ngôi nhà, không phải “hạng” hay “danh hiệu”.
* Ba biến thể khác nhau bằng **nội dung và hình ảnh ngôi nhà**, không bằng huy hiệu.

**Avoid**

* Biểu tượng cúp, sao, huy chương.
* Màu xanh/đỏ phân loại tốt-xấu.
* Từ ngữ mang tính phán xét cá nhân người chơi.

---

## 12.3. FamilyScore

**Purpose**
Hiển thị Family Score của 4 Dimension.

**Contains**

* Economy
* Education
* Equality
* Emotion

Mỗi Dimension có tên và giá trị.

**States**

* Default.

**Behavior**

* Giá trị `[0,100]` lấy từ `scores`.
* 4 Dimension luôn hiển thị theo cùng thứ tự: Economy, Education, Equality, Emotion.
* Có nhãn text đầy đủ; không dựa vào màu để phân biệt Dimension.

**Visual Intent**

* Chính xác, dễ đọc, là số liệu tổng kết của trò chơi.
* Thấp hơn ngôi nhà về trọng lượng thị giác (P1).

**Avoid**

* Radar chart, donut chart, gauge hoa mỹ.
* Bốn card bo tròn xếp lưới kiểu dashboard.
* Hiệu ứng đếm lên (count-up) và phần thưởng.
* Bảng xếp hạng/so sánh với người chơi khác.

---

## 12.4. DimensionHighlight

**Purpose**
Chỉ ra Dimension mạnh nhất và yếu nhất.

**Contains**

* Dimension mạnh nhất.
* Dimension yếu nhất.

**States**

* Default.
* Trường hợp hòa: xem Behavior.

**Behavior**

* Lấy từ `scores`.
* Khi có nhiều Dimension cùng giá trị cao nhất/thấp nhất: **Strongest/Weakest dimension uses fixed-order tie-breaker: economy → education → equality → emotion.**

**Visual Intent**

* Hai điểm nhấn văn bản, giống ghi chú kết luận.

**Avoid**

* Icon trang trí, vương miện, cờ.
* Ngôn ngữ chê bai Dimension yếu.

---

## 12.5. FlavorText

**Purpose**
Một đoạn kết ngắn mang giọng của câu chuyện.

**Contains**

* Flavor text theo profile.

**States**

* Ba biến thể (theo phân loại).

**Behavior**

* Lấy từ data.
* Không đưa claim học thuật mới.

**Visual Intent**

* Khép lại hành trình, ngắn và có sức nặng.

**Avoid**

* Lời khuyên đạo đức hóa.
* Câu chung chung có thể áp cho mọi game.

---

## 12.6. Disclaimer

**Purpose**
Làm rõ Family Score chỉ là cơ chế trò chơi.

**Contains**

> Family Score chỉ là cơ chế trò chơi, không phải thước đo thực tế.

**States**

* Default (luôn hiển thị).

**Behavior**

* **Bắt buộc** xuất hiện trên Final Profile; không thể ẩn/đóng.
* Hiển thị nguyên văn như trên.
* Phải nằm trong luồng đọc, không đặt ở nơi người chơi dễ bỏ qua.

**Visual Intent**

* Rõ ràng, không bị giấu, nhưng không cạnh tranh với ngôi nhà.

**Avoid**

* Chữ quá nhỏ hoặc độ tương phản thấp khiến không đọc được.
* Đặt sau một lớp tương tác (accordion, tooltip).
* Thay đổi câu chữ.

---

## 12.7. PrimaryAction — `PLAY_AGAIN`

Xem §6.4. Mở `ConfirmDialog` (SCR-07). `CANCEL` quay về Final Profile.

---

# 13. SCR-07 — Reset Confirmation

Triển khai bằng `ConfirmDialog` (§6.5).

**Nội dung bắt buộc**

* Nói rõ hậu quả: **toàn bộ tiến trình sẽ bị xóa**.
* Hai lựa chọn: xác nhận và huỷ.

**Kết quả**

| Action          | Kết quả                                                                     |
| --------------- | --------------------------------------------------------------------------- |
| `CONFIRM_RESET` | Xóa `nha:v1`, reset `scores = 40/40/40/40`, `history = {}`, `completed = []` → Landing |
| `CANCEL`        | Đóng dialog, giữ nguyên progress, quay về Screen đã mở                        |

---

# 14. State & Action Mapping

| Component          | Action phát ra                     | GameState bị ảnh hưởng                     |
| ------------------ | ---------------------------------- | ------------------------------------------ |
| `PrimaryAction` (Landing) | `START`                     | Không đổi Score                             |
| `PrimaryAction` (Intro)   | `BEGIN_GAME`                | `phase = choosing`, `currentScenario = S01` |
| `ChoiceCard`       | `SELECT_CHOICE`                    | `scores`, `history`, `phase = feedback`     |
| `PrimaryAction` (Feedback)| `CONTINUE`                  | Chuyển sang UI `knowledge`                  |
| `PrimaryAction` (Knowledge)| `CONTINUE`                 | `completed`, `currentScenario`, hoặc `phase = final` |
| `PrimaryAction` (Final)   | `PLAY_AGAIN`                | Không đổi (mở dialog)                       |
| `ConfirmDialog`    | `CONFIRM_RESET` / `CANCEL`         | Reset toàn bộ / không đổi                   |
| `ResumeActions`    | Restore / `PLAY_AGAIN`             | Restore state / mở dialog                   |

> `Feedback` và `Knowledge Card` dùng chung `phase = "feedback"`; việc phân biệt qua UI-level `screen = "feedback" | "knowledge"` (không bắt buộc persist) theo `SCREEN_FLOW` §14.

---

# 15. Cross-cutting Behavior

## 15.1. Accessibility

* Mọi thao tác chính dùng được bằng bàn phím.
* Focus nhìn thấy rõ trên mọi phần tử tương tác.
* Thông tin không chỉ truyền đạt bằng màu (đặc biệt `ScoreDeltaList` và `ChoiceCard`).
* `HouseCanvas` có text alternative mô tả trạng thái.
* Khi Screen đổi, focus được chuyển tới tiêu đề/nội dung chính của Screen mới.
* Tôn trọng `prefers-reduced-motion`.

## 15.2. Motion

* Chuyển động chỉ dùng để **thể hiện thay đổi có nghĩa** (ví dụ ngôi nhà thay đổi sau Choice).
* Không dùng motion để trang trí hay thu hút chú ý vào UI không phải ngôi nhà.
* Thời lượng/easing cụ thể thuộc Design Tokens, không ghi ở đây.

## 15.3. Persistence & Refresh

Component phải hiển thị đúng sau khi refresh (xem `SCREEN_FLOW` §13):

| Refresh tại      | Kết quả component                                                          |
| ---------------- | -------------------------------------------------------------------------- |
| Scenario         | `ChoiceList` ở `choosing`, chưa chọn                                        |
| Feedback         | Giữ Feedback; Choice đã commit, không chọn lại                              |
| Knowledge Card   | Giữ Knowledge Card                                                          |
| Final Profile    | Giữ Final Profile, Disclaimer vẫn hiển thị                                  |
| State hỏng       | Bỏ state, khởi tạo mới → Landing; **không crash**                           |

## 15.4. Invalid Action

* `SELECT_CHOICE` lặp lại cho Scenario đã commit → bị bỏ qua, không đổi state.
* Truy cập trực tiếp Scenario chưa unlock hoặc Final Profile khi S07 chưa completed → không render; xử lý theo `SCREEN_FLOW` §16.
* Component **không** tự quyết định điều hướng; chỉ phát Action.

---

# 16. Component Acceptance Criteria

## Structure

* [ ] Mỗi Screen chỉ có component được liệt kê ở §5.
* [ ] Mỗi Screen không-Scenario chỉ có đúng một `PrimaryAction` (ngoại trừ `ResumeActions` trên Landing).
* [ ] Không có nút Back, menu toàn cục, breadcrumb điều hướng ngược.

## Landing

* [ ] Không có saved state → chỉ `Bắt đầu`.
* [ ] Saved state hợp lệ, `phase` là `intro` / `choosing` / `feedback` → chỉ `ResumeActions`.
* [ ] Saved state không hợp lệ → `Bắt đầu`, không crash.
* [ ] `Bắt đầu` và `ResumeActions` không bao giờ cùng hiển thị.
* [ ] `Tiếp tục` khôi phục đúng Screen; `Chơi lại` mở `ConfirmDialog`.

## ChoiceCard / ChoiceList

* [ ] Thứ tự A/B/C cố định.
* [ ] Chỉ chọn được một lần; double-click không commit hai lần.
* [ ] Sau commit, mọi ChoiceCard `Disabled`.
* [ ] Không có Đúng/Sai, màu tốt/xấu, confetti hay điểm thưởng.
* [ ] Không hiển thị Score Delta trước khi chọn.

## HouseCanvas

* [ ] Thể hiện đúng `base / current / changed / final`.
* [ ] Thay đổi ở Feedback nhận ra được so với trước.
* [ ] Không có yếu tố trang trí không phản ánh state.
* [ ] Có text alternative.

## Feedback / Knowledge

* [ ] Feedback chỉ có hậu quả sáng tạo + Dimension bị tác động.
* [ ] `ScoreDeltaList` chỉ có `+/- Dimension`; không có số điểm hay độ lớn được mã hóa gián tiếp.
* [ ] Knowledge Card lấy nội dung từ nguồn `CK_FAM_xx`; không có claim ngoài nguồn.
* [ ] Knowledge Card không hiển thị lại Score Delta.

## Final

* [ ] Family Score hiển thị đủ 4 Dimension, đúng thứ tự.
* [ ] Phân loại profile đúng boundary (65 / 40).
* [ ] Disclaimer bắt buộc xuất hiện nguyên văn.

## Reset

* [ ] Dialog nêu rõ hậu quả.
* [ ] Focus mặc định ở `CANCEL`; `Esc` = `CANCEL`.
* [ ] `CANCEL` quay về đúng Screen đã mở và không mất progress.

## Anti-Slop

* [ ] Không gradient, glassmorphism, bo tròn quá mức.
* [ ] Không icon trang trí không có nghĩa.
* [ ] Không minh hoạ trang trí do AI sinh ra.
* [ ] Không pattern UI nào ngoài spec này.
* [ ] Ngôi nhà là yếu tố nổi bật nhất trên mọi Screen có nó.

---

# 17. Open Questions

Các điểm `SCREEN_FLOW` chưa quy định; spec này đã đặt **mặc định tạm thời**, cần chốt:

| # | Câu hỏi                                                                  | Mặc định hiện tại                 |
| - | ------------------------------------------------------------------------ | --------------------------------- |
| 1 | Landing khi saved state hợp lệ nhưng `phase = final`: `Bắt đầu` phải khởi tạo game mới thay vì ghi đè state cũ không? | Hiển thị `Bắt đầu`; `START` khởi tạo state mới. Thực tế hiếm xảy ra vì app start khôi phục thẳng Final Profile |
| 2 | Có bước xác nhận lại Choice trước khi commit không?                       | Không, commit ngay khi chọn       |
| 3 | Khi nhiều Dimension hòa điểm cao/thấp nhất, hiển thị thế nào?             | Lấy dimension đầu tiên theo thứ tự: economy → education → equality → emotion |
| 4 | Landing khi có progress: hiển thị `HouseCanvas` ở trạng thái nào?          | `base`                            |
| 5 | `ProgressIndicator` có xuất hiện ở Intro/Landing không?                    | Không                             |
| 6 | Nhãn chính xác của các `PrimaryAction`                                     | Theo gợi ý §6.4, chờ content chốt |

## Open — phát sinh từ DESIGN_TOKENS

| # | Câu hỏi | Mặc định hiện tại |
| - | ------- | ----------------- |
| 7 | Mỗi Choice cần `HouseEffect { zone, kind }` trong content data (S01–S07 × A/B/C) | Chờ `GAMEPLAY_SPEC` / content |
| 8 | Ngôi nhà theo kiến trúc nhà ở Việt Nam hay nhà chung chung? | Chờ `NHA_CONTEXT` |
| 9 | Số mức Dimension (hiện `LOW/MID/HIGH` theo ngưỡng 40 / 65) | 3 mức, khớp phân loại Final Profile |

## Resolved

| Quyết định                                                          | Kết quả                                                                 |
| ------------------------------------------------------------------- | ----------------------------------------------------------------------- |
| `ScoreDeltaList` hiển thị số điểm hay chỉ hướng?                    | **Chỉ `+/- Dimension`**, không hiển thị số điểm hay độ lớn gián tiếp    |
| Điều kiện Landing hiển thị `ResumeActions` hay `Bắt đầu`?           | Dựa trên `hasResumableProgress` (§7.3), không dựa vào `phase = landing` |

---

# 18. Core Rule

**Một component = một vai trò rõ ràng.**

* `HouseCanvas` là nơi **nhìn thấy** hậu quả.
* `ChoiceCard` là nơi **ra quyết định**.
* `ScoreDeltaList` là nơi **đọc** tác động.
* `KnowledgeExplanation` là nơi **hiểu** kiến thức.
* `FamilyScore` là nơi **nhìn lại** hành trình.

Nếu một component không phục vụ vai trò nào trong danh sách trên, nó không thuộc game này.