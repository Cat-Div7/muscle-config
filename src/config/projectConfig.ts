export type FrameworkChoice = "react-ts" | "react-js";
export type DirectoryMode = "new" | "current";
export type StylingChoice = "tailwind" | "none";

export interface ProjectConfig {
  projectName?: string;
  framework: FrameworkChoice;
  directoryMode: DirectoryMode;
  styling: StylingChoice;
}

export interface TailwindConfig {
  darkMode: false | "media" | "class";
  darkModeToggle: boolean;

  colorPreset: "indigo" | "emerald" | "neutral" | "custom" | "none";
  customColor?: string;

  font: "inter" | "poppins" | "cairo" | "none";

  // plugins: string[];
}