import type { MuiConfig } from "../config/projectConfig.js";

const colorMap: Record<string, string> = {
  blue: "#1976d2",
  purple: "#9c27b0",
  green: "#2e7d32",
  custom: "",
};

function getPrimaryColor(config: MuiConfig): string {
  return config.colorPreset === "custom"
    ? (config.customColor ?? "#1976d2")
    : colorMap[config.colorPreset];
}

// ─── theme.ts ───
export function generateMuiTheme(
  config: MuiConfig,
  isTypeScript: boolean,
): string {
  const primaryColor = getPrimaryColor(config);

  const tsImport = isTypeScript
    ? `\nimport type { PaletteMode } from "@mui/material";`
    : "";
  const modeType = isTypeScript ? "mode: PaletteMode" : "mode";

  return `
import { createTheme } from "@mui/material/styles";${tsImport}

export function createAppTheme(${modeType}) {
  return createTheme({
    palette: {
      mode,
      primary: {
        main: "${primaryColor}",
      },
    },
  });
}
`.trim();
}

// ─── ThemeToggle.tsx / ThemeToggle.jsx ───
export function generateMuiThemeToggle(isTypeScript: boolean): string {
  const interfaceBlock = isTypeScript
    ? `\ninterface ThemeToggleProps {\n  mode: "light" | "dark";\n  onToggle: () => void;\n}\n`
    : "";
  const propsType = isTypeScript ? ": ThemeToggleProps" : "";

  return `
import IconButton from "@mui/material/IconButton";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";
${interfaceBlock}
export default function ThemeToggle({ mode, onToggle }${propsType}) {
  return (
    <IconButton onClick={onToggle} color="inherit">
      {mode === "dark" ? <Brightness7Icon /> : <Brightness4Icon />}
    </IconButton>
  );
}
`.trim();
}

// ─── main.tsx / main.jsx ───
export function generateMuiMain(
  config: MuiConfig,
  isTypeScript: boolean,
): string {
  const systemMode =
    config.themeMode === "system"
      ? `window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light"`
      : `"${config.themeMode}"`;

  const tsTypes = isTypeScript ? `: ${'"light" | "dark"'}` : "";

  const toggleImport = config.darkModeToggle
    ? `import ThemeToggle from "./components/ThemeToggle.js";`
    : "";

  const toggleUsage = config.darkModeToggle
    ? `<ThemeToggle mode={mode} onToggle={() => setMode(mode === "light" ? "dark" : "light")} />`
    : "";

  return `
import { StrictMode, useState } from "react";
import { createRoot } from "react-dom/client";
import { ThemeProvider, CssBaseline } from "@mui/material";
import { createAppTheme } from "./themes/theme.js";
import App from "./App.js";
${toggleImport}

function Root() {
  const [mode, setMode] = useState${isTypeScript ? `<"light" | "dark">` : ""}(${systemMode});
  const theme = createAppTheme(mode);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      ${toggleUsage}
      <App />
    </ThemeProvider>
  );
}

createRoot(document.getElementById("root")${isTypeScript ? "!" : ""}).render(
  <StrictMode>
    <Root />
  </StrictMode>
);
`.trim();
}
