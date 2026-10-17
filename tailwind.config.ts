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
        petdark: {
          950: "#090A0F",
          900: "#0F121C",
          850: "#141926",
          800: "#1B2234",
          700: "#27334D",
        },
        brand: {
          cyan: "#00F0FF",
          violet: "#8B5CF6",
          purple: "#7C3AED",
          accent: "#FF3366",
        },
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
      },
    },
  },
  plugins: [],
};
export default config;
