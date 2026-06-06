import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    screens: {
      sm: "640px",
      md: "800px",
      lg: "1024px",
      xl: "1280px",
      "2xl": "1536px",
    },
    extend: {
      colors: {
        wave: {
          blue: "#536CDB", // --wave-blue
          purple: "#8B7BE8",
          lime: "#C2DE6D", // --wave-lime
          lavender: "#B8C4FF",
        },
        bg: {
          waveBlue: "#536CDB",
        },
        // NEWS バー用の色（デザイナー指定値 260601）
        news: {
          red: "#E85B3F",
          green: "#74cb6e",
          blue: "#3640d6",
        },
      },
      fontFamily: {
        sans: [
          "var(--font-dm-sans)",
          "var(--font-noto-sans-jp)",
          "sans-serif",
        ],
        mono: [
          "var(--font-dm-mono)",
          "var(--font-noto-sans-jp)",
          "monospace",
        ],
        jp: [
          "var(--font-noto-sans-jp)",
          "sans-serif",
        ],
        en: [
          "var(--font-dm-sans)",
          "sans-serif",
        ],
      },
    },
  },
  plugins: [],
};

export default config;
