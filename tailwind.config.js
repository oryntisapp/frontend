/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        background: {
          void: "#030303",
          base: "#050308",
          elevated: "#0C0A14",
        },
        surface: {
          DEFAULT: "rgba(255,255,255,0.045)",
          hover: "rgba(255,255,255,0.075)",
        },
        foreground: {
          DEFAULT: "#F3F1F7",
          muted: "#9D97AE",
          subtle: "rgba(243,241,247,0.62)",
        },
        accent: {
          DEFAULT: "#B13ED9",
          bright: "#E16CF1",
          deep: "#6013A1",
          glow: "rgba(177,62,217,0.3)",
        },
        gradient: {
          highlight: "#E16CF1",
          vivid: "#B13ED9",
          deep: "#6013A1",
          indigo: "#18044B",
        },
        reflection: {
          light: "#96A7B9",
          mid: "#657285",
          dark: "#222534",
        },
        rim: {
          light: "#A0B5BA",
        },
        border: {
          DEFAULT: "rgba(150,167,185,0.14)",
          hover: "rgba(160,181,186,0.28)",
          accent: "rgba(177,62,217,0.35)",
        },
        success: "#3DD68C",
        warning: "#F0BB2F",
        danger: "#E14F4F",
      },
      fontFamily: {
        sans: ["'Sora'", "'Inter'", "system-ui", "sans-serif"],
        mono: ["'JetBrains Mono'", "'Geist Mono'", "monospace"],
      },
      backgroundImage: {
        "brand-gradient": "linear-gradient(180deg, #E16CF1 0%, #B13ED9 35%, #6013A1 70%, #18044B 100%)",
        "brand-gradient-h": "linear-gradient(90deg, #E16CF1 0%, #B13ED9 45%, #6013A1 100%)",
        "grid-overlay":
          "linear-gradient(to right, rgba(150,167,185,0.06) 1px, transparent 1px), linear-gradient(to bottom, rgba(150,167,185,0.06) 1px, transparent 1px)",
      },
      backgroundSize: {
        grid: "64px 64px",
      },
      boxShadow: {
        card: "inset 0 1px 0 0 rgba(160,181,186,0.08), 0 8px 24px -8px rgba(0,0,0,0.6), 0 2px 6px -2px rgba(0,0,0,0.45)",
        cardHover:
          "inset 0 1px 0 0 rgba(160,181,186,0.12), 0 16px 40px -12px rgba(0,0,0,0.65), 0 0 0 1px rgba(177,62,217,0.18), 0 0 32px -4px rgba(177,62,217,0.25)",
        ctaGlow: "0 4px 24px -4px rgba(177,62,217,0.5), 0 0 0 1px rgba(177,62,217,0.4) inset",
        ctaGlowStrong: "0 8px 40px -6px rgba(177,62,217,0.7), 0 0 0 1px rgba(225,108,241,0.5) inset",
      },
      transitionTimingFunction: {
        "expo-out": "cubic-bezier(0.16, 1, 0.3, 1)",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translate(0px, 0px) rotate(0deg)" },
          "50%": { transform: "translate(12px, -20px) rotate(1deg)" },
        },
        shimmer: {
          "0%": { backgroundPosition: "0% 50%" },
          "100%": { backgroundPosition: "200% 50%" },
        },
        marquee: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
        blink: {
          "0%, 100%": { opacity: 1 },
          "50%": { opacity: 0.4 },
        },
        drift: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-10px)" },
        },
      },
      animation: {
        float: "float 9s ease-in-out infinite",
        "float-slow": "float 12s ease-in-out infinite",
        shimmer: "shimmer 4s linear infinite",
        marquee: "marquee 32s linear infinite",
        blink: "blink 1.6s ease-in-out infinite",
        drift: "drift 4s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};
