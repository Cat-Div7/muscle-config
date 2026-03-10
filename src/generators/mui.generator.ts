import type { MuiConfig } from "../config/projectConfig.js";

// ─── Helpers ───
const colorMap: Record<string, string> = {
  blue: "#1976d2",
  purple: "#9c27b0",
  green: "#2e7d32",
};

const fontImportMap: Record<string, string> = {
  inter: "https://fonts.googleapis.com/css2?family=Inter:wght@400;500;700&display=swap",
  poppins: "https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;700&display=swap",
  cairo: "https://fonts.googleapis.com/css2?family=Cairo:wght@400;500;700&display=swap",
};

const fontFamilyMap: Record<string, string> = {
  inter: "Inter, sans-serif",
  poppins: "Poppins, sans-serif",
  cairo: "Cairo, sans-serif",
};

function getPrimaryColor(config: MuiConfig): string {
  return config.colorPreset === "custom"
    ? (config.customColor ?? "#1976d2")
    : colorMap[config.colorPreset];
}

function getInitialMode(config: MuiConfig): string {
  const systemMode = `window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light"`;
  return config.themeMode === "system"
    ? `saved || (${systemMode})`
    : `saved || "${config.themeMode}"`;
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

// ─── ThemeToggle.tsx / .jsx ───
export function generateMuiThemeToggle(): string {
  return `
import IconButton from "@mui/material/IconButton";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";
import { useTheme } from "../context/ThemeContextProvider";

export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();

  return (
    <IconButton onClick={toggleTheme} color="inherit">
      {theme === "dark" ? <Brightness7Icon /> : <Brightness4Icon />}
    </IconButton>
  );
}
`.trim();
}

// ─── ThemeContextProvider.tsx / .jsx ───
export function generateThemeContextProvider(
  config: MuiConfig,
  isTypeScript: boolean,
): string {
  const initialMode = getInitialMode(config);

  const tsBlock = isTypeScript
    ? `
type ThemeMode = "light" | "dark";

interface ThemeContextType {
  theme: ThemeMode;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType>({} as ThemeContextType);`
    : `
const ThemeContext = createContext({});`;

  const savedType = isTypeScript ? " as ThemeMode | null" : "";
  const stateType = isTypeScript ? "<ThemeMode>" : "";
  const returnType = isTypeScript ? ": ThemeContextType" : "";
  const childrenType = isTypeScript
    ? "({ children }: { children: React.ReactNode })"
    : "({ children })";

  return `
import { createContext, useContext, useEffect, useState } from "react";

const THEME_KEY = "theme";
${tsBlock}

export function ThemeContextProvider${childrenType} {
  const [theme, setTheme] = useState${stateType}(() => {
    const saved = localStorage.getItem(THEME_KEY)${savedType};
    return ${initialMode};
  });

  useEffect(() => {
    localStorage.setItem(THEME_KEY, theme);
  }, [theme]);

  const toggleTheme = () =>
    setTheme((prev) => (prev === "light" ? "dark" : "light"));

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme()${returnType} {
  return useContext(ThemeContext);
}
`.trim();
}

// ─── AppMuiThemeProvider.tsx / .jsx ───
export function generateAppMuiThemeProvider(isTypeScript: boolean): string {
  const propsType = isTypeScript
    ? "({ children }: { children: React.ReactNode })"
    : "({ children })";

  return `
import { ThemeProvider as MuiThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { useTheme } from "../context/ThemeContextProvider";
import { createAppTheme } from "./theme";

export default function AppMuiThemeProvider${propsType} {
  const { theme } = useTheme();
  const muiTheme = createAppTheme(theme);

  return (
    <MuiThemeProvider theme={muiTheme}>
      <CssBaseline />
      {children}
    </MuiThemeProvider>
  );
}
`.trim();
}

// ─── main.tsx / main.jsx ───
export function generateMuiMain(isTypeScript: boolean): string {
  return `
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { ThemeContextProvider } from "./context/ThemeContextProvider";
import AppMuiThemeProvider from "./themes/AppMuiThemeProvider";
import App from "./App";

createRoot(document.getElementById("root")${isTypeScript ? "!" : ""}).render(
  <StrictMode>
    <ThemeContextProvider>
      <AppMuiThemeProvider>
        <App />
      </AppMuiThemeProvider>
    </ThemeContextProvider>
  </StrictMode>
);
`.trim();
}

// ─── index.css (MUI font setup) ───
export function generateMuiIndexCss(config: MuiConfig): string {
  if (config.font === "none") return "";

  return `
@import url('${fontImportMap[config.font]}');

body {
  font-family: ${fontFamilyMap[config.font]};
}
`.trim();
}