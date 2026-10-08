import { describe, it, expect } from "vitest";
import { tokens, contrastRatio } from "./tokens";

describe("Design Tokens WCAG Contrast", () => {
  const bgPrimary = tokens.colors.background.primary;

  it("text.primary on background.primary meets WCAG AAA (> 7:1, spec says 14.1:1)", () => {
    const ratio = contrastRatio(tokens.colors.text.primary, bgPrimary);
    expect(ratio).toBeGreaterThan(13.0);
  });

  it("text.secondary on background.primary meets WCAG AA (> 4.5:1, spec says 6.4:1)", () => {
    const ratio = contrastRatio(tokens.colors.text.secondary, bgPrimary);
    expect(ratio).toBeGreaterThan(6.0);
  });

  it("text.muted on background.primary meets WCAG AA (> 4.5:1, spec says 4.8:1)", () => {
    const ratio = contrastRatio(tokens.colors.text.muted, bgPrimary);
    expect(ratio).toBeGreaterThan(4.5);
  });

  it("accent.primary on background.primary meets WCAG AA (> 4.5:1, spec says 7.6:1)", () => {
    const ratio = contrastRatio(tokens.colors.accent.primary, bgPrimary);
    expect(ratio).toBeGreaterThan(7.0);
  });

  it("text.inverse on accent.primary meets WCAG AAA (> 7:1, spec says 7.9:1)", () => {
    const ratio = contrastRatio(tokens.colors.text.inverse, tokens.colors.accent.primary);
    expect(ratio).toBeGreaterThan(7.0);
  });

  it("border.default on background.primary meets UI components contrast (> 3.0:1)", () => {
    const ratio = contrastRatio(tokens.colors.border.default, bgPrimary);
    expect(ratio).toBeGreaterThan(3.0);
  });
});
