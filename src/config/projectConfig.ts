export type FrameworkChoice = "react-ts" | "react-js";
export type DirectoryMode = "new" | "current";
export type StylingChoice = "tailwind" | "mui" | "css" | "none";
export type FontChoice = "inter" | "poppins" | "cairo" | "none";
export type TailwindMode = "beginner" | "advanced";
export type DarkModeStrategy = false | "media" | "class";
export type CssMode = "beginner" | "advanced" | "skip";
export type CssDarkStrategy = false | "class" | "media";
export type ColorPreset = "indigo" | "emerald" | "neutral" | "custom" | "none";

export interface ProjectConfig {
  projectName?: string;
  framework: FrameworkChoice;
  directoryMode: DirectoryMode;
  styling: StylingChoice;
}

export interface TailwindConfig {
  mode: TailwindMode;
  darkMode: DarkModeStrategy;
  darkModeToggle: boolean;
  colorPreset: ColorPreset;
  customColor?: string;
  font: FontChoice;
}

export interface MuiConfig {
  themeMode: "light" | "dark" | "system";
  darkModeToggle: boolean;
  colorPreset: ColorPreset;
  customColor?: string;
  icons: boolean;
  demo: boolean;
}

export interface CssConfig {
  mode: CssMode;
  reset: boolean;
  colorPreset: ColorPreset;
  customColor?: string;
  darkMode: CssDarkStrategy;
  darkModeToggle: boolean;
  font: FontChoice;
  separateFiles: boolean;
  demo: boolean;
}
