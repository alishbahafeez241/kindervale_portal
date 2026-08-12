import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./context/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        brand: {
          navy: "#2e5a75",
          ink: "#3f4657",
          gold: "#f6b41e",
          mint: "#39c2b4",
          cloud: "#eaf4fb"
        }
      },
      boxShadow: {
        soft: "0 12px 34px rgba(51, 65, 92, .10)"
      }
    }
  },
  plugins: []
};

export default config;
