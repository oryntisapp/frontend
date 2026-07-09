// Single source of truth for values needed in JS/TS logic (not just Tailwind classes).
// Keep in sync with tailwind.config.js — see Section 1 of the build spec (Gradient Aurora palette).

export const colors = {
  backgroundVoid: "#030303",
  backgroundBase: "#050308",
  backgroundElevated: "#0C0A14",
  foreground: "#F3F1F7",
  foregroundMuted: "#9D97AE",
  gradientHighlight: "#E16CF1",
  gradientVivid: "#B13ED9",
  gradientDeep: "#6013A1",
  gradientIndigo: "#18044B",
  reflectionLight: "#96A7B9",
  reflectionMid: "#657285",
  reflectionDark: "#222534",
  rimLight: "#A0B5BA",
  accentGlow: "rgba(177,62,217,0.3)",
  success: "#3DD68C",
  warning: "#F0BB2F",
  danger: "#E14F4F",
} as const;

export const brandGradient = "linear-gradient(180deg, #E16CF1 0%, #B13ED9 35%, #6013A1 70%, #18044B 100%)";

export const motion = {
  durationQuick: 0.2,
  durationStandard: 0.3,
  durationEntrance: 0.6,
  durationBlobFloat: 9,
  easingPrimary: [0.16, 1, 0.3, 1] as [number, number, number, number],
  hoverLift: -6,
  activePress: 0.98,
  staggerChildren: 0.08,
  scrollRevealThreshold: 0.18,
} as const;

export const primaryCTA = "Oryntis OS";
export const primaryCTARoute = "/product";
export const secondaryCTA = "See the Dashboard";