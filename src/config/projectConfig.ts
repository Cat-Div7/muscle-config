export type FrameworkChoice = "react-ts" | "react-js";
export type DirectoryMode = "new" | "current";
export type StylingChoice = "tailwind" | "mui" | "none";
export type FontChoice = "inter" | "poppins" | "cairo" | "none";
export type TailwindMode = "beginner" | "advanced";
export type DarkModeStrategy = false | "media" | "class";

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
  colorPreset: "indigo" | "emerald" | "neutral" | "custom" | "none";
  customColor?: string;
  font: FontChoice;
}

export interface MuiConfig {
  themeMode: "light" | "dark" | "system";
  darkModeToggle: boolean;
  colorPreset: "blue" | "purple" | "green" | "custom";
  customColor?: string;
  icons: boolean;
}
