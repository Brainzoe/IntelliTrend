import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx}", // Scan all files in src
    "./src/components/**/*.{js,ts,jsx,tsx,mdx,css}", // Ensure this targets your components
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)", // Custom colors
        foreground: "var(--foreground)",
      },
    },
  },
  plugins: [],
};

export default config;
