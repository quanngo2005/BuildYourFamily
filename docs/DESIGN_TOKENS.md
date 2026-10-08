# DESIGN_TOKENS.md

## 1. Purpose

`DESIGN_TOKENS.md` defines the visual language for the NHÀ interactive learning game.

It gives implementation agents a constrained visual system so that:

* all screens share one coherent visual language;
* the house remains the primary visual anchor;
* the UI stays editorial and minimal;
* implementation does not drift into generic dashboard, SaaS, quiz, or AI-generated UI patterns;
* every visual decision has a semantic relationship to gameplay.

This document defines **design tokens and visual rules**, not pixel-perfect screen layouts.

### Changelog from previous draft

* Contrast values re-checked with the WCAG formula; `text.muted`, `border.*` and house light tokens corrected (§3.3).
* Removed per-Dimension score colors (they conflicted with the house mapping and overloaded `accent.primary`).
* Removed semantic positive/negative UI colors; direction is carried by glyph and text only.
* Typeface changed to a serif + sans pairing; display line-height fixed for Vietnamese diacritics.
* Added **Signature Devices** (§2.3), a positive definition of identity, not only prohibitions.
* House is now a defined layered system with deterministic derivation rules (§15–16).
* CTA copy removed from this file; labels live in `COMPONENT_SPEC.md` only.

---

# 2. Design Direction

## 2.1 Core Direction

**Minimal contemporary editorial + warm domestic atmosphere, drawn like an architect's section.**

The visual language should feel: calm, mature, human, warm, reflective, slightly architectural, suitable for a university interactive learning product.

It should NOT feel: childish, preschool, corporate dashboard, traditional e-learning platform, arcade game, quiz application, AI-generated landing page, museum exhibition interface.

## 2.2 Visual Hierarchy

```text
1. House / consequence
2. Current scenario or concept
3. User decision / primary action
4. Supporting information
```

The house is the only persistent visual anchor. UI supports the house and never competes with it.

## 2.3 Signature Devices

Identity comes from a small set of repeated devices, not from decoration. Use these, and only these, to give the product a recognizable character.

| # | Device | Rule |
| - | ------ | ---- |
| 1 | **Section drawing** | The house is drawn as a cutaway section: rooms visible, one stroke weight, flat fills from the house palette. Zones map to Dimensions (§15). |
| 2 | **Leader-line annotation** | Consequences are annotated onto the house with thin leader lines and small labels, like an architectural drawing. |
| 3 | **Hairline rule** | The only separator in the UI is a 1px rule. Rules replace boxes, borders around groups, and card containers. |
| 4 | **Chapter numbering** | Scenarios are numbered `S01–S07` in the `label` style, treated like chapter numbers. |
| 5 | **Serif narrative, sans interface** | Story and academic text are serif; controls, labels and meta text are sans. |

If a new visual element is not one of these devices, a token below, or a component in `COMPONENT_SPEC.md`, it is not allowed.

## 2.4 Theme

* Light theme only in v1.
* Do not add dark mode, theme toggle, or `prefers-color-scheme` variants.

---

# 3. Color Tokens

## 3.1 Base Palette

```ts
colors = {
  background: {
    primary: "#F5F1E8",
    secondary: "#ECE6D8",
    surface: "#FBF9F4"
  },

  text: {
    primary: "#24221F",
    secondary: "#5C574E",
    muted: "#6F6A60",
    inverse: "#F8F5EE"
  },

  border: {
    rule: "#D8D1C4",     // decorative hairline separators only
    default: "#8F887B",  // boundary of interactive controls
    strong: "#6B655B"    // hover / emphasis on control boundaries
  },

  accent: {
    primary: "#2B5443",
    primaryHover: "#213F33",
    secondary: "#8A5632"
  }
}
```

## 3.2 House Palette (illustration only)

These tokens may be used **only inside the house illustration**, never for UI chrome, text, borders or markers.

```ts
house = {
  wood: "#A96F45",
  woodLight: "#C4976C",
  woodDark: "#74503A",
  wall: "#E4DDD0",
  foundation: "#81766A",
  light: "#E8C978",
  crack: "#9B4B43",
  greenery: "#5D765F",
  stroke: "#24221F",  // the single line color of the section drawing
  strokeWidth: "1.5px" // uniform thickness for all house vectors
}
```

## 3.3 Contrast Reference (WCAG 2.x, measured)

| Token | On `background.primary` | Use |
| ----- | ----------------------- | --- |
| `text.primary` | 14.1 : 1 | All primary text |
| `text.secondary` | 6.4 : 1 | Secondary text |
| `text.muted` | 4.8 : 1 | Meta text. **Only** on `background.primary` and `surface` (4.3 : 1 on `secondary`, which fails AA). |
| `border.rule` | 1.4 : 1 | Decorative only; never the sole signal of an interactive boundary |
| `border.default` | 3.1 : 1 | Control boundaries (meets 3 : 1 for UI components) |
| `border.strong` | 5.1 : 1 | Hover / emphasis |
| `accent.primary` | 7.6 : 1 | Primary action, focus ring, selected, current progress |
| `accent.secondary` | 5.4 : 1 | Completed progress, house-material link |
| `text.inverse` on `accent.primary` | 7.9 : 1 | Primary action label |

Rules:

* `house.light` (1.2–1.4 : 1 against walls and page) must never carry text, markers or boundaries.
* Re-verify contrast with a tool whenever a token value changes.

## 3.4 Color Rules

* `background.primary` is the dominant page background.
* `background.surface` is used sparingly for hover/selected content areas.
* `accent.primary` is the single interactive accent. It does **not** mean "positive".
* **There are no semantic success/error colors in the UI.** Direction of a score change is conveyed by the glyph (`+` / `−`) and the Dimension name, in `text.primary`.
* `house.crack` is allowed only as part of the house illustration.
* No gradients. No neon. No arbitrary colors outside this set.
* Color must not be the sole carrier of meaning.

---

# 4. Typography Tokens

## 4.1 Typefaces

```text
Serif (narrative, titles, academic text):
"Source Serif 4", Georgia, "Times New Roman", serif

Sans (interface, labels, controls, meta):
"Source Sans 3", system-ui, -apple-system, BlinkMacSystemFont,
"Segoe UI", sans-serif
```

Requirements:

* Both fonts must be loaded with the **Vietnamese** subset. If a Vietnamese glyph or stacked diacritic falls back to another font, the font is not acceptable.
* Verify rendering with at least: `Ngôi nhà đang chuyển mình`, `Ổ ẫ ệ Ầ Ẩ Ỗ Ử`, `Ngôi nhà còn nhiều vết nứt cần gia cố`.
* Inter is not used. Rounded, handwritten, decorative and futuristic fonts are not used.

## 4.2 Role Assignment

| Text | Family |
| ---- | ------ |
| Game title, page titles, section titles | Serif |
| Scenario context, consequence narrative, knowledge explanation, flavor text | Serif |
| Choice text | Serif |
| Choice label (A/B/C), scenario number, progress, score labels, Dimension names, buttons, disclaimer, source reference | Sans |

## 4.3 Type Scale

```ts
typography = {
  display: {
    family: "serif",
    size: "clamp(2.5rem, 7vw, 5rem)",
    weight: 600,
    lineHeight: 1.15        // must clear stacked Vietnamese diacritics
  },

  pageTitle: {
    family: "serif",
    size: "clamp(1.75rem, 4vw, 3rem)",
    weight: 600,
    lineHeight: 1.2
  },

  sectionTitle: {
    family: "serif",
    size: "1.25rem",
    weight: 600,
    lineHeight: 1.35
  },

  bodyLarge: {
    family: "serif",
    size: "1.125rem",
    weight: 400,
    lineHeight: 1.7
  },

  body: {
    family: "serif",
    size: "1rem",
    weight: 400,
    lineHeight: 1.65
  },

  bodySmall: {
    family: "sans",
    size: "0.875rem",
    weight: 400,
    lineHeight: 1.55
  },

  label: {
    family: "sans",
    size: "0.75rem",
    weight: 600,
    lineHeight: 1.35,
    letterSpacing: "0.04em"
  },

  control: {
    family: "sans",
    size: "1rem",
    weight: 600,
    lineHeight: 1.3
  }
}
```

## 4.4 Typography Rules

* Sentence case. No all-caps for normal UI copy.
* Scenario numbers use `label`.
* Hierarchy is created by role, spacing and placement, not only by size.
* Avoid excessive bold. Only two weights are used (400, 600).
* Do not apply letter-spacing to serif text.

---

# 5. Spacing Tokens

```ts
spacing = {
  xs: "0.25rem",
  sm: "0.5rem",
  md: "0.75rem",
  lg: "1rem",
  xl: "1.5rem",
  "2xl": "2rem",
  "3xl": "3rem",
  "4xl": "4rem",
  "5xl": "6rem"
}
```

## Spacing Rules

* Prefer generous vertical whitespace; content never feels densely packed.
* Do not use spacing to create artificial card grids.
* Group related information by proximity.
* Separate major conceptual sections with `2xl–4xl`.
* Primary actions are clearly separated from explanatory content.

---

# 6. Layout Tokens

```ts
layout = {
  maxContentWidth: "72rem",
  readingWidth: "42rem",
  narrowReadingWidth: "34rem",

  pagePadding: {
    mobile: "1.25rem",
    tablet: "2rem",
    desktop: "3rem"
  },

  houseArea: {
    minHeight: "28rem"
  }
}
```

## Layout Principles

```text
                 SCREEN
┌──────────────────────────────────────────┐
│                                          │
│              HOUSE / STORY               │
│                                          │
│          SCENARIO / CONTENT              │
│                                          │
│             PRIMARY ACTION               │
│                                          │
└──────────────────────────────────────────┘
```

No persistent sidebar, top navigation, breadcrumb or dashboard shell.

---

# 7. Border & Rule Tokens

```ts
border = {
  width: {
    rule: "1px",
    control: "1px",
    strong: "1.5px"
  },

  radius: {
    none: "0",
    subtle: "2px",
    interactive: "4px"
  }
}
```

## Rules

* Hairline `border.rule` is the default separator (Signature Device 3).
* **Group content with rules and whitespace, not boxes.** No content is enclosed in rounded cards.
* `ChoiceCard` uses `radius.none` (see §11); `PrimaryAction` and `ConfirmDialog` use `radius.interactive`.
* No pill-shaped containers. No nested bordered containers.

---

# 8. Shadow Tokens

```ts
shadow = {
  none: "none",
  dialog: "0 1px 3px rgba(36, 34, 31, 0.08)"
}
```

* Default is no shadow.
* `dialog` is used only by `ConfirmDialog`.
* No large floating shadows, glassmorphism or glow.

---

# 9. Interaction Tokens

```ts
interaction = {
  transition: {
    fast: "120ms",
    normal: "220ms",
    meaningful: "420ms"
  },

  easing: "cubic-bezier(0.2, 0, 0, 1)",   // ease-out, no overshoot

  focus: {
    width: "2px",
    offset: "3px"
  }
}
```

## Interaction Rules

### Normal UI

Short transitions (`fast`, `normal`) for hover, focus, pressed, selection. Use `easing` for all transitions. No overshoot, spring, or bounce.

### House

House changes may use `meaningful` transitions because they represent gameplay consequences.

* The full reveal sequence must not exceed `1200ms`.
* Changes are revealed sequentially by group (Mark → Level Changes → Annotation). Level Changes across all Dimensions happen simultaneously as one group.
* The next group may start with a `180ms` stagger delay, overlapping the previous transition to ensure the entire sequence stays within the time budget.
* The animation plays **only immediately after `SELECT_CHOICE`**.
* It does **not replay** on refresh, on returning to a Screen, or on entering Knowledge Card. A restored Feedback Screen shows the final static state (see §17).

House animation must communicate `choice → structural consequence`, never merely animate the interface.

---

# 10. Motion Tokens

## Allowed

* House element reveal (reinforcement, crack, added space, light change).
* Subtle content transition between Screens.
* Selection state, focus state, hover state.

## Not Allowed

* Bouncing buttons, animated gradients, continuous floating objects.
* Particle effects, confetti, screen shake, excessive parallax.
* Decorative looping animation.
* Score count-up animation.

Motion stops once its semantic purpose is communicated.

---

# 11. Choice Tokens

`ChoiceCard` is the domain name; visually it is a **ruled row**, not a literal card. This prevents the quiz-option look and keeps the "card" count at zero.

```ts
choice = {
  minHeight: "4.5rem",
  verticalPadding: "1rem",

  separator: colors.border.rule,       // hairline between rows

  marker: {                            // the A / B / C label
    boundary: colors.border.default,   // ring around the letter, 3.1 : 1
    boundaryHover: colors.border.strong,
    boundarySelected: colors.accent.primary,
    boundaryDisabled: colors.border.rule
  },

  text: {
    default: colors.text.primary,
    disabled: colors.text.muted
  },

  background: {
    default: "transparent",
    hover: colors.background.surface,
    selected: colors.background.surface,
    disabled: "transparent"
  }
}
```

## Choice Rules

* All three rows have equal visual weight and identical structure.
* Hover is expressed by background and marker boundary, not by movement, scale or shadow.
* The marker ring (not the row separator) is what identifies the interactive boundary.
* `disabled` communicates "locked", never "wrong".

Do not:

* visually recommend one option;
* add a "best" marker;
* color one choice green or red;
* show predicted score or consequence before selection;
* use radio-button or checkbox styling;
* add decorative icons.

---

# 12. Primary Action Tokens

```ts
primaryAction = {
  minHeight: "2.75rem",
  horizontalPadding: "1.25rem",

  background: colors.accent.primary,
  foreground: colors.text.inverse,

  hoverBackground: colors.accent.primaryHover,

  border: "none",
  radius: border.radius.interactive,
  typography: typography.control
}
```

The primary action is quiet and confident. It must not resemble a marketing CTA, a game reward button, a glossy button, or a floating action button.

**Button copy is not defined here.** All labels (including Resume actions and the reset confirmation) are defined in one table in `COMPONENT_SPEC.md` §6.4–6.5. Implementation must not invent alternate copy.

---

# 13. Progress Indicator Tokens

```ts
progress = {
  inactive: colors.border.default,
  current: colors.accent.primary,
  completed: colors.accent.secondary,

  lineWidth: "1px",
  markerSize: "0.45rem"
}
```

## Rules

* S01–S07 are shown as chapter progression with `label` typography.
* The current scenario is clearly distinguishable by shape or weight, not only by color.
* Completed scenarios may be subtly marked; upcoming scenarios stay quiet.
* No percentage, XP, progress bar, "Level N", lock icons or reward indicators.

---

# 14. Score & Annotation Tokens

Family Score is game mechanics, not academic measurement.

**There are no per-Dimension colors.** Dimensions are told apart by name and by their zone on the house (§15), never by color.

## 14.1 Final Profile score display

```ts
familyScore = {
  nameTypography: typography.label,
  valueTypography: typography.sectionTitle,
  separator: colors.border.rule
}
```

* Each Dimension shows its name and numerical value in `text.primary` / `text.secondary`.
* Four Dimensions are separated by hairline rules, not boxes.
* No radar chart, donut chart, gauge, leaderboard, ranking, or count-up animation.

## 14.2 Feedback annotation (Signature Device 2)

Score direction at Feedback is shown as **annotations on the house**, not as a separate list.

```ts
annotation = {
  leaderLine: {
    color: colors.house.stroke,
    width: "1px"
  },
  label: {
    typography: typography.label,
    color: colors.text.primary
  },
  marker: {
    size: "0.45rem",
    color: colors.house.stroke
  }
}
```

Rules:

* One annotation per affected Dimension. Each label reads `+ Dimension` or `− Dimension` (use the true minus sign `U+2212`), in `text.primary`.
* A label is anchored to the **zone** of its Dimension (§15.2) with a thin leader line.
* **No numbers, and no encoded magnitude** (no repeated glyphs, size differences or intensity differences).
* Accessible text must state direction in words (for example "Equality: tăng"), because `+` and `−` alone are not sufficient for screen readers.
* On narrow viewports where leader lines would collide or overlap the house, the labels are shown as a plain list directly under the house, in fixed Dimension order, without leader lines. Information must be identical in both layouts.
* Annotations must remain legible against the house; they sit in empty margin areas of the drawing, not over the illustration.
* Annotations are static. They do not animate except as part of the single house reveal sequence.

---

# 15. House Visual Tokens

The house is a deterministic visual system derived from `GameState` and content data.

## 15.1 Style

The house is an **architectural section drawing**: flat fills from the house palette, a single stroke weight and color (`house.stroke`), simple geometric forms.

Primary materials: light wood, warm plaster, muted stone, soft greenery, warm interior light.

Texture rule:

* Texture is allowed **only inside the house**, as drawn line hatching consistent with the stroke.
* No grain, noise, paper texture, or image filters on the page, background, or UI.

Avoid: cartoon characters, fantasy houses, photorealism, game-asset aesthetics, excessive decoration, drop shadows under the house.

## 15.2 Dimension Mapping

| Dimension | Zone | LOW | MID | HIGH |
| --------- | ---- | --- | --- | ---- |
| Economy | foundation, kitchen, work space | cracked / sinking / unstable | stable foundation, functional space | reinforced, complete, structurally strong |
| Education | study / play room | darker, constrained | functional room, moderate light | brighter, larger, richer |
| Equality | walls, main door, structural balance | tilted, asymmetrical, restricted | stable structure | balanced, symmetrical, open |
| Emotion | interior lighting, living space | cold, empty, distant | neutral, functional | warm, connected, welcoming |

## 15.3 Levels

Levels align with the Final Profile classification boundaries so the house and the profile never disagree.

```ts
level(score) =
  score >= 65 ? "HIGH" :
  score >= 40 ? "MID"  :
                "LOW"
```

* All Dimensions start at `40`, so the starting house is `MID` in every zone.
* Any net decrease at the start immediately yields `LOW`; this is intended.
* Three levels per Dimension are a **minimum**. Art may provide more steps if the level function is extended in `GAMEPLAY_SPEC.md`.

## 15.4 Choice Marks

Score levels alone are not enough: a choice can change the score without crossing a threshold, and Feedback would show nothing new.

Every Choice therefore carries a **house effect** in content data:

```ts
interface HouseEffect {
  zone: "foundation" | "kitchen" | "study" | "structure" | "door" | "interior";
  kind: "build" | "reinforce" | "crack" | "open" | "dim" | "light";
}
```

* Each committed Choice renders one persistent **mark** on the house from its `HouseEffect`.
* The mark's zone must belong to a Dimension that Choice actually affects.
* Marks accumulate in order of `history`, so the final house shows the whole decision path.
* **Slot Rule:** Since multiple marks may target the same zone over 7 scenarios, each zone defines a fixed number of spatial slots (e.g., 2-3 maximum). The k-th mark assigned to a zone occupies slot k to prevent overlapping paths.
* Number of art assets required is slots × zones × kinds actually used; scope this before illustration starts.

---

# 16. House State Rules

```ts
houseState = deriveHouseState(scores, history)
```

* Do not persist a separate `houseState`.
* Derived only from `scores`, `history` and content data. No randomness, no time-dependence.
* The same `GameState` always produces the same house, including after refresh.
* The reveal animation is not part of the state; the static result must be identical with or without it.

---

# 17. Feedback Visual Language

Feedback answers: "Lựa chọn vừa rồi đã làm gì với ngôi nhà?"

```text
HOUSE CHANGE (with annotation)
↓
CONSEQUENCE
```

* The newly added mark is shown in its final state and is identifiable without motion (its annotation and a clear, static emphasis remain visible).
* On refresh at Feedback, the Screen restores the same static view: the new mark, its annotations, and the consequence text, reconstructed from `history[currentScenario]`. The animation does not replay.

Do not turn feedback into: correct/wrong answer, score screen, achievement.

Positive and negative visual changes remain restrained.

---

# 18. Knowledge Visual Language

Knowledge Card is an editorial learning screen. Although the domain object is named `KnowledgeCard`, it is not rendered as a card.

```text
concept title            (serif, sectionTitle / pageTitle)

academic explanation     (serif, body)

relationship to choice   (serif, bodySmall → sans)

key terms                (inline in text flow)

source reference         (sans, bodySmall)

continue
```

Avoid: colorful information cards, badge collections, vocabulary chips, quiz styling, "Correct!" / "Incorrect!" messaging.

---

# 19. Final Profile Visual Language

```text
HOUSE
↓
PROFILE
↓
FOUR DIMENSIONS
↓
STRONGEST / WEAKEST
↓
FLAVOR TEXT
↓
DISCLAIMER
↓
PLAY AGAIN
```

The house occupies the strongest visual position. The profile must not resemble a dashboard, personality test, psychological assessment, or competitive score screen.

The Disclaimer is set in `bodySmall`, `text.secondary` (or darker), and must remain in the normal reading flow.

---

# 20. Responsive Principles

Support mobile, tablet and desktop without introducing separate product concepts.

## Mobile

```text
House → Content → Choices → Action
```

* Choices stack vertically.
* The house remains visible enough to communicate consequence.
* Annotation uses the list fallback (§14.2) when leader lines cannot be drawn legibly.

## Desktop

* Use available width for breathing room, not for additional UI.
* The desktop version feels spacious rather than dashboard-like.

---

# 21. Accessibility Tokens

## Focus

```ts
focus = {
  outline: colors.accent.primary,
  width: "2px",
  offset: "3px"
}
```

All interactive elements require visible keyboard focus.

## Contrast

* Body and control text meet WCAG AA (4.5 : 1 for text, 3 : 1 for UI component boundaries) per §3.3.
* `text.muted` is restricted to `background.primary` and `surface`.

## Reduced Motion

When `prefers-reduced-motion: reduce` is enabled:

* disable the house reveal animation and decorative transitions;
* show the final static state immediately;
* preserve every piece of information that motion would have conveyed (marks, annotations, text).

## Color Independence

Never communicate direction, selection or state by color alone. Use glyph, text, shape or structural change as well.

## Language

* Set the document language to Vietnamese.
* Text alternatives for the house and annotations are written in Vietnamese.

---

# 22. Anti-Slop Enforcement

Before adding any visual element, ask:

1. Is it defined by `COMPONENT_SPEC.md`, a token here, or a Signature Device (§2.3)?
2. Does it communicate GameState, content, or an available action?
3. Does removing it remove meaningful information or functionality?

If all answers are **no**, do not add it.

---

# 23. Forbidden Visual Patterns

```text
generic SaaS dashboard
sidebar navigation
top application navbar
breadcrumb
glassmorphism
gradient backgrounds
neon accents
literal cards for content
floating card stacks
AI-generated decorative illustrations
emoji decoration
confetti
achievement badges
streak counters
XP
leaderboards
count-up score animation
radar charts
donut charts
gauges
quiz correct/incorrect colors
semantic success/error colors in UI chrome
per-Dimension color coding
radio-button choice UI
countdown timers
decorative icons without semantic meaning
random house generation
random decorative animation
page-level texture, grain or noise
dark mode
Inter as the typeface
```

---

# 24. Token Usage Rule

Components consume tokens rather than defining arbitrary values.

Preferred:

```ts
color: tokens.colors.text.primary;
padding: tokens.spacing.xl;
borderRadius: tokens.border.radius.interactive;
```

Avoid:

```ts
color: "#383838";
padding: "17px";
borderRadius: "13px";
```

unless the value is required by the house illustration system or an implementation constraint.

---

# 25. Implementation Boundary

This document does NOT define: exact screen composition, exact component dimensions, final copy (including button labels), scenario content, academic explanations, score calculations, house artwork itself, routing, state management, persistence implementation.

Those belong to:

```text
COMPONENT_SPEC.md
SCREEN_FLOW.md
GAMEPLAY_SPEC.md
NHA_CONTEXT.md
```

---

# 26. Open Items

| # | Item | Needs |
| - | ---- | ----- |
| 1 | Should the house reflect Vietnamese domestic architecture (nhà ống, nhà cấp 4, lime-wash walls, tiled roof) rather than a generic house? This is the strongest single lever against a generic look. | `NHA_CONTEXT.md` |
| 2 | `HouseEffect` (zone, kind) per Choice must be authored for all S01–S07 × A/B/C. | `GAMEPLAY_SPEC.md` / content data |
| 3 | Whether levels per Dimension should exceed three. | `GAMEPLAY_SPEC.md` |
| 4 | Confirm Vietnamese subset availability and rendering for the chosen serif and sans families. | Implementation |

---

# 27. Design Token Acceptance Criteria

* [ ] All screens use the same token system.
* [ ] No arbitrary palette is introduced; house tokens are used only inside the illustration.
* [ ] No gradients, glassmorphism, dashboard shell, dark mode.
* [ ] No literal cards for content; `ChoiceCard` is a ruled row.
* [ ] The house is the dominant visual anchor.
* [ ] Choices have equal visual weight.
* [ ] No correct/incorrect or success/error visual language.
* [ ] No per-Dimension color coding.
* [ ] Score direction at Feedback is shown as annotation, with no numbers and no encoded magnitude.
* [ ] Score at Final Profile is not presented as a dashboard.
* [ ] Progress is not gamified.
* [ ] House reveal is sequential, ≤ 1200ms, and does not replay on refresh.
* [ ] Reduced-motion behavior exists and preserves all information.
* [ ] Keyboard focus is visible.
* [ ] Color is never the sole semantic signal.
* [ ] `text.muted` is never used on `background.secondary`.
* [ ] Contrast thresholds in §3.3 are met.
* [ ] Vietnamese text (including stacked diacritics) renders correctly in both typefaces.
* [ ] The same GameState produces the same house appearance.
* [ ] Mobile does not introduce a separate visual concept.
* [ ] No decorative element exists without semantic purpose.

---

# 28. Source-of-Truth Order

When visual decisions conflict:

```text
1. GAMEPLAY_SPEC.md
2. SCREEN_FLOW.md
3. COMPONENT_SPEC.md
4. DESIGN_TOKENS.md
5. implementation preference
```

The implementation agent must not override a gameplay or interaction rule merely because another visual treatment appears more attractive.
