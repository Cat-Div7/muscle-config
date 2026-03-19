import type { TailwindConfig } from "../../../config/projectConfig.js";

export function generateTailwindConfig(config: TailwindConfig): string {
  const darkMode = config.darkMode ? `darkMode: "${config.darkMode}",` : "";

  return `
/** @type {import('tailwindcss').Config} */
export default {
  ${darkMode}
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};
`.trim();
}
