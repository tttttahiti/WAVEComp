import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        wave: {
          blue: "#0066FF",
          purple: "#8B7BE8",
          lime: "#C8FF00",
          lavender: "#B8C4FF",
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
