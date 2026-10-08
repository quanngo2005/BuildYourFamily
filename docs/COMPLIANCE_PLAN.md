# KẾ HOẠCH TUÂN THỦ (COMPLIANCE PLAN)

Tài liệu này xác định các quy trình và tiêu chí (checklist) để đảm bảo toàn bộ source code luôn bám sát các yêu cầu từ thư mục `docs/`.

## 1. Hệ thống ưu tiên (Source Hierarchy)

Khi có sự mâu thuẫn giữa các luồng suy nghĩ hoặc quyết định thiết kế trong quá trình implement, áp dụng thứ tự ưu tiên sau:
**Academic Source > GAMEPLAY_SPEC > SCREEN_FLOW > COMPONENT_SPEC > DESIGN_TOKENS > Sở thích cá nhân (Implementation Preference)**

**Lưu ý tối thượng:** Lớp kiến thức học thuật (`academic_source...` & `NHA_CONTEXT`) không được phép thay đổi bởi bất kỳ quyết định nào của creative, gameplay hay coding layer.

---

## 2. Quy trình kiểm soát theo từng lớp (Layered Compliance Workflow)

### 2.1. Lớp Học thuật & Nội dung (`NHA_CONTEXT.md` & `academic_source...`)
*   **Trích xuất data:** Mọi nội dung text (title, scenario, feedback, terms) phải được đưa ra các file data riêng (ví dụ: `src/content/scenarios.ts`). Không hardcode text trong UI Component.
*   **Truy xuất nguồn gốc:** Ở mỗi Knowledge Card, phải render chính xác reference (`sourceIds`) trỏ về luận điểm gốc trong Chương 7.

### 2.2. Lớp Logic Game & Trạng thái (`GAMEPLAY_SPEC.md`)
*   **Cấm tự cân bằng (No arbitrary re-balancing):** Các hằng số điểm, initial state (`economy=40`, v.v.), clamp rules (`0-100`) phải được tuân thủ chính xác. Không nhân thêm hoặc chia hệ số nếu Spec không yêu cầu.
*   **Persistence (LocalStorage):** Chỉ lưu `GameState` thuần túy và `uiScreen` (như đã định nghĩa trong Implementation Plan). Không lưu các state dẫn xuất (derived state) như `HouseVisualState` vào localStorage.
*   **Immutable State:** Reducer phải thuần túy, mọi action `SELECT_CHOICE`, `CONTINUE` phải chạy đúng theo Flow.

### 2.3. Lớp UI & Component (`COMPONENT_SPEC.md` & `DESIGN_TOKENS.md`)
*   **Sử dụng biến CSS (CSS Variables):** Tuyệt đối không hardcode mã màu (`#hex`, `rgb`), kích thước font hay padding tĩnh nếu đã có trong `DESIGN_TOKENS.md` (ví dụ: dùng `var(--color-bg-primary)`).
*   **Visual Intent:** Nếu `COMPONENT_SPEC.md` mô tả một Visual Intent (chẳng hạn: "Thể hiện sự lung lay"), CSS và DOM phải phục vụ đúng mục đích đó. Không tự tiện thêm animation thừa nếu không có trong spec.
*   **Pure UI:** Component chỉ nhận props và render. Logic xử lý state (`dispatch`) phải được đẩy lên file Context/Container. (Ví dụ như file `HouseCanvas.tsx` hiện tại đã làm rất tốt việc chỉ nhận `visuals` và render SVG thuần tuý).

### 2.4. Lớp Điều hướng (`SCREEN_FLOW.md`)
*   **Kiểm soát Transition:** Áp dụng Switch-case dựa trên cặp biến `phase` và `uiScreen` từ global state.
*   **Bảo vệ State:** Xử lý triệt để việc corrupt state bằng cách xóa key `nha:v1` và fallback về màn Landing/Reset, không được để lọt các trạng thái màn hình không tồn tại.

---

## 3. Checklist tự động (Dành cho Developer / Agent)

Trước khi commit bất kỳ feature nào, thực hiện kiểm tra chéo:

- [ ] **Data Check:** Các điểm số (`deltas`) có chính xác như trong `NHA_CONTEXT.md` không?
- [ ] **Type Check:** TypeScript có strict mapping cho toàn bộ `ScenarioId` và `Dim` không?
- [ ] **Token Check:** Có mã hex/hardcoded font size nào bị lọt vào CSS không?
- [ ] **Spec Check:** Có tạo thêm component/element nào không nằm trong `COMPONENT_SPEC.md` mà không có lý do chính đáng không?
- [ ] **Flow Check:** Back/Forward trình duyệt hoặc f5 reload trang có khôi phục chính xác Screen theo logic của `SCREEN_FLOW.md` không?

---

## 4. Hành động cần làm ngay với codebase hiện tại
Dựa vào plan trên và kiểm tra file `HouseCanvas.tsx` đang mở:
1. **HouseCanvas.tsx** hiện đang hardcode một số điểm toạ độ SVG (`x`, `y`, `width`) — điều này là chấp nhận được cho SVG vẽ đồ thị, nhưng các màu sắc đều đã dùng `var(--color-house-...)`, điều này **rất tuân thủ** Design Tokens. 
2. Cần review lại `App.tsx` và reducer để đảm bảo tuân thủ `SCREEN_FLOW` và cấu trúc `GameState` từ `GAMEPLAY_SPEC.md`.
