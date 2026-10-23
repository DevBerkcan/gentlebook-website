import type { Config } from "tailwindcss";

/**
 * GentleBook Brand-Tokens
 * ─ ink       #14162B  dunkles Anthrazit-Navy (Headlines/Text)
 * ─ night     #0B0C1A  tiefere Bühnenfarbe für dunkle, cineastische Sektionen
 * ─ porcelain #F7F5F0  warmes Off-White als Seitenhintergrund
 * ─ lavender  #ECEBF2  helles Lavendel (Akzent-/Hintergrundflächen)
 * ─ violet    #6355E4  Gradient-Start (Primär-Akzent)
 * ─ teal      #17A398  Gradient-Ende
 * ─ mist      #64748B  gedämpftes Grau (Fließtext, WCAG-AA-Kontrast auf Weiß)
 */
const config: Config = {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        ink: "#14162B",
        night: "#0B0C1A",
        porcelain: "#F7F5F0",
        lavender: "#ECEBF2",
        violet: "#6355E4",
        teal: "#17A398",
        mist: "#64748B",
      },
      fontFamily: {
        display: ["var(--font-display)", "serif"],
        sans: ["var(--font-body)", "system-ui", "sans-serif"],
      },
      backgroundImage: {
        "brand-gradient": "linear-gradient(120deg, #6355E4 0%, #17A398 100%)",
        "brand-gradient-soft":
          "linear-gradient(120deg, rgba(99,85,228,0.12) 0%, rgba(23,163,152,0.12) 100%)",
      },
      boxShadow: {
        soft: "0 8px 30px -8px rgba(20, 22, 43, 0.12)",
        lifted: "0 24px 60px -20px rgba(20, 22, 43, 0.25)",
        cta: "0 12px 32px -8px rgba(99, 85, 228, 0.45)",
        stage: "0 60px 120px -40px rgba(11, 12, 26, 0.55), 0 0 0 1px rgba(255, 255, 255, 0.06)",
        glow: "0 0 0 1px rgba(255,255,255,0.08), 0 30px 80px -30px rgba(99, 85, 228, 0.6)",
      },
      borderRadius: {
        "4xl": "2rem",
        "5xl": "2.75rem",
      },
      maxWidth: {
        content: "76rem",
      },
      transitionTimingFunction: {
        "out-expo": "cubic-bezier(0.16, 1, 0.3, 1)",
      },
      keyframes: {
        "pulse-ring": {
          "0%": { transform: "scale(0.8)", opacity: "0.7" },
          "100%": { transform: "scale(2.4)", opacity: "0" },
        },
        "price-in": {
          "0%": { transform: "translateY(40%)", opacity: "0" },
          "100%": { transform: "translateY(0)", opacity: "1" },
        },
        "step-in": {
          "0%": { transform: "translateY(14px)", opacity: "0" },
          "100%": { transform: "translateY(0)", opacity: "1" },
        },
        "spin-slow": {
          to: { transform: "rotate(360deg)" },
        },
        shimmer: {
          "0%": { backgroundPosition: "0% 50%" },
          "100%": { backgroundPosition: "200% 50%" },
        },
      },
      animation: {
        "pulse-ring": "pulse-ring 2.2s cubic-bezier(0.16, 1, 0.3, 1) infinite",
        "price-in": "price-in 0.6s cubic-bezier(0.16, 1, 0.3, 1)",
        "step-in": "step-in 0.5s cubic-bezier(0.16, 1, 0.3, 1)",
        "spin-slow": "spin-slow 8s linear infinite",
        shimmer: "shimmer 6s linear infinite",
      },
    },
  },
  plugins: [],
};

export default config;
