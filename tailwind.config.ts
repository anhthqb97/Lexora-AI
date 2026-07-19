import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{js,ts,jsx,tsx,mdx}", "./components/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        lexora: {
          blue: "#1e3a5f",
          teal: "#0d9488",
          orange: "#ea580c",
        },
      },
    },
  },
  plugins: [],
};

export default config;
