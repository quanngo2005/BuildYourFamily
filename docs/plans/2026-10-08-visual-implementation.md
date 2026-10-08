# Visual Implementation Plan — NHÀ

> **For Agent:** REQUIRED SUB-SKILL: Use `writing-plans` and design skills (`frontend-design`, `web-design-guidelines`) to implement this plan task-by-task.

**Goal:** Implement toàn bộ lớp hình ảnh và tương tác của NHÀ: Tokens & Typography, HouseCanvas (mặt cắt kiến trúc SVG sinh bằng code với 6 zones, 3 tiers, marks và slots), Annotation Overlay, toàn bộ Screen UI components theo Signature Devices, Motion sequence (reveal & reduced-motion), và hệ thống kiểm thử tự động.

**Architecture:** 
1. Hệ thống Token tập trung trong `tokens.css` (CSS custom properties) và mirror `tokens.ts` phục vụ kiểm thử.
2. `HouseCanvas` kiến trúc mặt cắt (viewBox 0 0 800 600), phân lớp layer rõ ràng, 6 zones với 3 biến thể SVG tĩnh (LOW/MID/HIGH) cùng khung bao, các mark định vị bằng slot cố định.
3. Lớp phủ `AnnotationOverlay` quy đổi tọa độ anchor SVG thành HTML overlay với chế độ `leader` (> 40rem) và `list` (<= 40rem).
4. Các màn hình tuân thủ tuyệt đối 5 Signature Devices và bộ quy tắc Anti-Slop.
5. Quản lý trạng thái chuyển động bằng `revealStore` cục bộ (idempotent, không replay khi refresh/StrictMode).

**Tech Stack:** React 19, TypeScript, CSS Custom Properties & SVG, Vitest. Không dùng Framer Motion hay thư viện animation bên ngoài.

---

## Task 1: Tokens, Typography & Mirror Foundation (Phase 0 & 1)

**Files:**
- Modify: `src/styles/tokens.css`
- Create: `src/tokens/tokens.ts`
- Create: `src/styles/base.css`
- Create: `src/styles/motion.css`
- Test: `src/tokens/tokens.test.ts`

**Step 1: Write the contrast test against design tokens**
Tạo file test `src/tokens/tokens.test.ts` kiểm tra tỷ lệ tương phản WCAG AA giữa màu nền và chữ theo `DESIGN_TOKENS.md` §3.3.

**Step 2: Run test to verify it fails**
Run: `npx vitest run src/tokens/tokens.test.ts`

**Step 3: Implement tokens.css, tokens.ts, base.css, motion.css**
- Cập nhật `tokens.css` chuẩn theo `DESIGN_TOKENS.md`, thêm `--house-stroke-width-emphasis: 2.5px`.
- Tạo `tokens.ts` xuất các giá trị hex để tính contrast trong test.
- Tạo `base.css` thiết lập `<html lang="vi">`, reset chuẩn, focus ring `2px` offset `3px`, `@media (prefers-reduced-motion)`.
- Tạo `motion.css` với keyframes reveal 3 bước.

**Step 4: Run test to verify it passes**
Run: `npx vitest run src/tokens/tokens.test.ts`

---

## Task 2: Content Data & Slot Rule Validation (Phase 0.3 & 0.6)

**Files:**
- Modify: `src/content/scenarios.ts`
- Create: `src/content/contentLint.test.ts`

**Step 1: Write content lint test**
Viết `src/content/contentLint.test.ts` kiểm tra:
1. Mọi Choice (21 choices) đều có `houseEffect { zone, kind }`.
2. Không zone nào vượt quá giới hạn 3 marks (N = 3 slots).
3. Zone của mark phải tương ứng với Dimension mà Choice đó tác động.

**Step 2: Run test to verify status**
Run: `npx vitest run src/content/contentLint.test.ts`

**Step 3: Update `src/content/scenarios.ts`**
Đảm bảo tất cả 21 Choices có `houseEffect` hợp lệ, không quá 3 marks trên bất kỳ zone nào trong một lượt chơi.

**Step 4: Run test to verify it passes**
Run: `npx vitest run src/content/contentLint.test.ts`

---

## Task 3: House Geometry, Zones, and Slots (Phase 2 - HouseCanvas)

**Files:**
- Create: `src/house/geometry.ts`
- Create: `src/house/houseA11y.ts`
- Create: `src/house/deriveHouseState.ts`
- Create: `src/house/zones/StructureZone.tsx`
- Create: `src/house/zones/FoundationZone.tsx`
- Create: `src/house/zones/KitchenZone.tsx`
- Create: `src/house/zones/StudyZone.tsx`
- Create: `src/house/zones/DoorZone.tsx`
- Create: `src/house/zones/InteriorZone.tsx`
- Create: `src/house/marks/ChoiceMark.tsx`
- Modify: `src/components/house/HouseCanvas.tsx`
- Test: `src/house/deriveHouseState.test.ts`
- Test: `src/house/houseA11y.test.ts`

**Step 1: Write failing tests for deriveHouseState & houseA11y**
Kiểm tra `deriveHouseState` phân loại điểm đúng theo ngưỡng (39, 40, 64, 65) và `houseA11y` sinh chuỗi tiếng Việt mô tả trực quan.

**Step 2: Run tests to verify they fail**
Run: `npx vitest run src/house/deriveHouseState.test.ts src/house/houseA11y.test.ts`

**Step 3: Implement geometry, zones, marks, and HouseCanvas**
- `geometry.ts`: Khóa tọa độ `viewBox="0 0 800 600"`, 6 zones, anchors, 3 slots per zone.
- Xây dựng 6 Zone components với 3 biến thể LOW/MID/HIGH (giữ nguyên silhouette, dùng màu house palette).
- `ChoiceMark.tsx`: Render các vết nứt, gia cố, đèn sáng theo slot `translate`.
- `HouseCanvas.tsx`: Render SVG phân lớp từ ground -> structure -> foundation -> kitchen -> study -> interior -> door -> marks.
- `deriveHouseState.ts` và `houseA11y.ts`.

**Step 4: Run tests to verify they pass**
Run: `npx vitest run src/house/deriveHouseState.test.ts src/house/houseA11y.test.ts`

---

## Task 4: Gate G1 — HouseSandbox Enhancement

**Files:**
- Modify: `src/screens/sandbox/HouseSandbox.tsx`
- Modify: `src/screens/sandbox/HouseSandbox.css`

**Step 1: Cập nhật HouseSandbox**
- Cho phép xem tĩnh toàn bộ trạng thái: All LOW, All MID, All HIGH, từng Dimension riêng biệt, và tất cả các Mark trên các slot.
- Cung cấp toggle chế độ màn hình (360px, 768px, 1280px) để nghiệm thu trực quan tiêu chuẩn Gate G1.

---

## Task 5: Annotation Overlay & useHouseGeometry (Phase 4)

**Files:**
- Create: `src/house/useHouseGeometry.ts`
- Create: `src/components/shared/AnnotationOverlay.tsx`
- Create: `src/components/shared/AnnotationOverlay.css`
- Test: `src/house/useHouseGeometry.test.ts`

**Step 1: Write test for geometry conversion formula**
Test công thức quy đổi từ tọa độ viewBox 800x600 sang tọa độ pixel container.

**Step 2: Implement `useHouseGeometry` and `AnnotationOverlay`**
- `useHouseGeometry`: Dùng `ResizeObserver` để tính scale, offsetX, offsetY.
- `AnnotationOverlay`: Hiển thị ở 2 chế độ `leader` (container >= 40rem) và `list` (container < 40rem). Nhãn hiển thị `+` hoặc `−` (U+2212) + tên Dimension.

**Step 3: Run test to verify it passes**
Run: `npx vitest run src/house/useHouseGeometry.test.ts`

---

## Task 6: Motion Sequence & Reveal Store (Phase 5)

**Files:**
- Create: `src/motion/revealStore.ts`
- Create: `src/motion/useReveal.ts`
- Test: `src/motion/revealStore.test.ts`

**Step 1: Write test for revealStore**
Kiểm tra tính idempotent: pending chỉ kích hoạt một lần, sau khi consume thì không phát lại dù re-render hay mount lại.

**Step 2: Implement revealStore and useReveal**
- Quản lý pending reveal kèm previousLevels.
- Hook `useReveal` xử lý timeline (0ms -> 180ms -> 360ms, kết thúc ở 780ms, timeout 1300ms) và kiểm tra `prefers-reduced-motion`.

**Step 3: Run test to verify it passes**
Run: `npx vitest run src/motion/revealStore.test.ts`

---

## Task 7: UI Screens Refinement (Phase 3 & Gate G2)

**Files:**
- Modify: `src/components/shared/AppShell.tsx`
- Modify: `src/components/shared/ProgressIndicator.tsx`
- Modify: `src/components/shared/PrimaryAction.tsx`
- Modify: `src/components/shared/ConfirmDialog.tsx`
- Modify: `src/screens/landing/LandingScreen.tsx`
- Modify: `src/screens/intro/IntroScreen.tsx`
- Modify: `src/screens/scenario/ScenarioScreen.tsx`
- Modify: `src/screens/feedback/FeedbackScreen.tsx`
- Modify: `src/screens/knowledge/KnowledgeScreen.tsx`
- Modify: `src/screens/final/FinalScreen.tsx`

**Step 1: Implement & verify each screen**
- `ProgressIndicator`: Hiển thị `S01–S07`, hairline 1px, current state phân biệt bằng độ đậm và hình dạng.
- `ScenarioScreen`: `ChoiceList` với `role="group"`, `ChoiceCard` là nút `<button>` ngăn cách bằng hairline rule, không dùng radio.
- `FeedbackScreen`: Tích hợp `HouseCanvas` với `AnnotationOverlay` và `useReveal`.
- `FinalScreen`: Bảng điểm `FamilyScore` ngăn cách bằng hairline, không dùng chart.
- `ConfirmDialog`: Native `<dialog>` + `showModal()`.

---

## Task 8: Verification & Hardening (Phase 6)

**Files:**
- Create: `src/tests/regression.test.ts`
- Run: Toàn bộ test suite và linting.

**Step 1: Write deterministic SVG snapshot test**
Kiểm tra cùng GameState luôn cho ra cùng SVG markup.

**Step 2: Run all tests and oxlint**
Run: `npx vitest run` và `npm run build`.
Kiểm tra không có bất kỳ lỗi linter hay TypeScript compiler nào.
