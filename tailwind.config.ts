import type { Config } from "tailwindcss";

/**
 * GentleBook Brand-Tokens
 * ─ ink      #14162B  dunkles Anthrazit-Navy (Headlines/Text)
 * ─ lavender #ECEBF2  helles Lavendel (Akzent-/Hintergrundflächen)
 * ─ violet   #6355E4  Gradient-Start (Primär-CTA)
 * ─ teal     #17A398  Gradient-Ende
 * ─ mist     #8A8A8A  gedämpftes Grau (Fließtext)
 */
const config: Config = {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        ink: "#14162B",
        lavender: "#ECEBF2",
        violet: "#6355E4",
        teal: "#17A398",
        mist: "#8A8A8A",
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
      },
      borderRadius: {
        "4xl": "2rem",
      },
      maxWidth: {
        content: "72rem",
      },
    },
  },
  plugins: [],
};

export default config;
