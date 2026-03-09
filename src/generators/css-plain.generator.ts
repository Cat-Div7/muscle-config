import type { CssConfig } from "../config/projectConfig.js";

// ─── Helpers ───
const colorMap: Record<string, string> = {
  indigo: "#6366f1",
  emerald: "#10b981",
  neutral: "#737373",
};

const fontMap: Record<string, string> = {
  inter: "Inter, sans-serif",
  poppins: "Poppins, sans-serif",
  cairo: "Cairo, sans-serif",
};

const fontImportMap: Record<string, string> = {
  inter:
    "https://fonts.googleapis.com/css2?family=Inter:wght@400;500;700&display=swap",
  poppins:
    "https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;700&display=swap",
  cairo:
    "https://fonts.googleapis.com/css2?family=Cairo:wght@400;500;700&display=swap",
};

function getPrimaryColor(config: CssConfig): string {
  return config.colorPreset === "custom"
    ? (config.customColor ?? "#6366f1")
    : (colorMap[config.colorPreset] ?? "");
}

// ─── reset.css ───
export function generateCssReset(): string {
  return `
*, *::before, *::after {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

html {
  -webkit-text-size-adjust: 100%;
}

body {
  min-height: 100vh;
  line-height: 1.5;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

img, picture, video, canvas, svg {
  display: block;
  max-width: 100%;
}

input, button, textarea, select {
  font: inherit;
}

p, h1, h2, h3, h4, h5, h6 {
  overflow-wrap: break-word;
}
`.trim();
}

// ─── variables.css ───
export function generateCssVariables(config: CssConfig): string {
  const lines: string[] = [];
  const primaryColor = getPrimaryColor(config);

  if (config.font !== "none") {
    lines.push(`@import url('${fontImportMap[config.font]}');`);
    lines.push("");
  }

  lines.push(":root {");

  if (primaryColor) {
    lines.push(`  --color-primary: ${primaryColor};`);
    lines.push(`  --color-primary-hover: ${primaryColor}cc;`);
  }

  if (config.font !== "none") {
    lines.push(`  --font-base: ${fontMap[config.font]};`);
  }

  lines.push("  --radius: 0.5rem;");
  lines.push("  --spacing: 1rem;");
  lines.push("}");

  if (config.darkMode === "class") {
    lines.push("");
    lines.push(".dark {");
    if (primaryColor) lines.push(`  --color-primary: ${primaryColor};`);
    lines.push("  color-scheme: dark;");
    lines.push("}");
  }

  if (config.darkMode === "media") {
    lines.push("");
    lines.push("@media (prefers-color-scheme: dark) {");
    lines.push("  :root {");
    lines.push("    color-scheme: dark;");
    lines.push("  }");
    lines.push("}");
  }

  return lines.join("\n");
}

// ─── typography.css ───
export function generateCssTypography(config: CssConfig): string {
  const fontFamily =
    config.font !== "none"
      ? `var(--font-base)`
      : `system-ui, Avenir, Helvetica, Arial, sans-serif`;

  return `
body {
  font-family: ${fontFamily};
  font-size: 1rem;
  font-weight: 400;
  color: #171717;
}

h1 { font-size: 2.25rem; font-weight: 700; line-height: 1.2; }
h2 { font-size: 1.875rem; font-weight: 600; line-height: 1.3; }
h3 { font-size: 1.5rem; font-weight: 600; line-height: 1.4; }
h4 { font-size: 1.25rem; font-weight: 500; }
h5 { font-size: 1.125rem; font-weight: 500; }
h6 { font-size: 1rem; font-weight: 500; }

p { line-height: 1.7; }

a {
  color: var(--color-primary, #6366f1);
  text-decoration: none;
}

a:hover {
  text-decoration: underline;
}
`.trim();
}

// ─── index.css (single file mode) ───
export function generateCssIndex(config: CssConfig): string {
  const lines: string[] = [];
  const primaryColor = getPrimaryColor(config);

  if (config.font !== "none") {
    lines.push(`@import url('${fontImportMap[config.font]}');`);
    lines.push("");
  }

  if (config.reset) {
    lines.push("/* ─── Reset ─────────────────────────────── */");
    lines.push(generateCssReset());
    lines.push("");
  }

  lines.push("/* ─── Variables ─────────────────────────── */");
  lines.push(":root {");

  if (primaryColor) {
    lines.push(`  --color-primary: ${primaryColor};`);
    lines.push(`  --color-primary-hover: ${primaryColor}cc;`);
  }

  if (config.font !== "none") {
    lines.push(`  --font-base: ${fontMap[config.font]};`);
  }

  lines.push("  --radius: 0.5rem;");
  lines.push("  --spacing: 1rem;");
  lines.push("}");

  if (config.darkMode === "class") {
    lines.push("");
    lines.push(".dark {");
    lines.push("  color-scheme: dark;");
    lines.push("}");
  }

  if (config.darkMode === "media") {
    lines.push("");
    lines.push("@media (prefers-color-scheme: dark) {");
    lines.push("  :root {");
    lines.push("    color-scheme: dark;");
    lines.push("  }");
    lines.push("}");
  }

  lines.push("");
  lines.push("/* ─── Typography ────────────────────────── */");
  lines.push(`body {`);
  lines.push(
    `  font-family: ${config.font !== "none" ? "var(--font-base)" : "system-ui, Avenir, Helvetica, Arial, sans-serif"};`,
  );
  lines.push(`  font-size: 1rem;`);
  lines.push(`  color: #171717;`);
  lines.push(`}`);

  return lines.join("\n");
}

// ─── index.css (separate files mode) ───
export function generateCssIndexWithImports(config: CssConfig): string {
  const lines: string[] = [];
  if (config.reset) lines.push(`@import "./styles/reset.css";`);
  lines.push(`@import "./styles/variables.css";`);
  lines.push(`@import "./styles/typography.css";`);
  return lines.join("\n");
}

// ─── ThemeToggle.tsx / .jsx (plain CSS version) ───
export function generateCssThemeToggle(isTypeScript: boolean): string {
  const stateType = isTypeScript ? "<boolean>" : "";

  return `
import { useState, useEffect } from "react";

export default function ThemeToggle() {
  const [dark, setDark] = useState${stateType}(() => {
    return localStorage.getItem("theme") === "dark";
  });

  useEffect(() => {
    document.documentElement.classList.toggle("dark", dark);
    localStorage.setItem("theme", dark ? "dark" : "light");
  }, [dark]);

  return (
    <button
      onClick={() => setDark(!dark)}
      style={{
        padding: "0.4rem 0.8rem",
        border: "1px solid currentColor",
        borderRadius: "var(--radius, 0.5rem)",
        cursor: "pointer",
        background: "transparent",
        fontSize: "1rem",
      }}
    >
      {dark ? "🌙 Dark" : "☀️ Light"}
    </button>
  );
}
`.trim();
}
