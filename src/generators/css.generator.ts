import type { TailwindConfig } from "../config/projectConfig.js";

export function generateIndexCss(config: TailwindConfig): string {
  const lines: string[] = [];

  lines.push('@import "tailwindcss";');

  if (config.font === "inter") {
    lines.push(
      `@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;700&display=swap');`,
    );
  }

  if (config.darkMode === "class") {
    lines.push(`@custom-variant dark (&:where(.dark, .dark *));`);
  }

  lines.push("");
  lines.push(":root {");

  if (config.colorPreset !== "none") {
    const colors = {
      indigo: "#6366f1",
      emerald: "#10b981",
      neutral: "#737373",
      custom: config.customColor ?? "#6366f1",
    };

    lines.push(`  --color-primary: ${colors[config.colorPreset]};`);
  }

  lines.push("}");

  if (config.darkMode === "class") {
    lines.push("");
    lines.push(".dark {");
    lines.push("  color-scheme: dark;");
    lines.push("}");
  }

  return lines.join("\n");
}
