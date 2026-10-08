// Mirror of tokens for tests (contrast, verification)
export const tokens = {
  colors: {
    background: {
      primary: "#F5F1E8",
      secondary: "#ECE6D8",
      surface: "#FBF9F4",
    },
    text: {
      primary: "#24221F",
      secondary: "#5C574E",
      muted: "#6F6A60",
      inverse: "#F8F5EE",
    },
    border: {
      rule: "#D8D1C4",
      default: "#8F887B",
      strong: "#6B655B",
    },
    accent: {
      primary: "#2B5443",
      primaryHover: "#213F33",
      secondary: "#8A5632",
    },
  },
  house: {
    wood: "#A96F45",
    woodLight: "#C4976C",
    woodDark: "#74503A",
    wall: "#E4DDD0",
    foundation: "#81766A",
    light: "#E8C978",
    crack: "#9B4B43",
    greenery: "#5D765F",
    stroke: "#24221F",
    strokeWidth: "1.5px",
    strokeWidthEmphasis: "2.5px",
  },
  timing: {
    fast: 120,
    normal: 220,
    meaningful: 420,
  },
  easing: "cubic-bezier(0.2, 0, 0, 1)",
} as const;

export function hexToRgb(hex: string): [number, number, number] {
  const clean = hex.replace("#", "");
  const num = parseInt(clean, 16);
  return [(num >> 16) & 255, (num >> 8) & 255, num & 255];
}

function srgbToLinear(c: number): number {
  const norm = c / 255;
  return norm <= 0.03928 ? norm / 12.92 : Math.pow((norm + 0.055) / 1.055, 2.4);
}

export function relativeLuminance(hex: string): number {
  const [r, g, b] = hexToRgb(hex);
  return 0.2126 * srgbToLinear(r) + 0.7152 * srgbToLinear(g) + 0.0722 * srgbToLinear(b);
}

export function contrastRatio(hex1: string, hex2: string): number {
  const lum1 = relativeLuminance(hex1);
  const lum2 = relativeLuminance(hex2);
  const brightest = Math.max(lum1, lum2);
  const darkest = Math.min(lum1, lum2);
  return (brightest + 0.05) / (darkest + 0.05);
}
