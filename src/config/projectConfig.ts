export type FrameworkChoice = "react-ts" | "react-js";
export type DirectoryMode = "new" | "current";
export type StylingChoice = "tailwind" | "mui" | "css" | "none";
export type FontChoice = "inter" | "poppins" | "cairo" | "none";
export type TailwindMode = "beginner" | "advanced";
export type DarkModeStrategy = false | "media" | "class";
export type CssMode = "beginner" | "advanced" | "skip";
export type CssDarkStrategy = false | "class" | "media";
export type ColorPreset = "indigo" | "emerald" | "neutral" | "custom" | "none";
export type ArchitectureChoice = "feature-based" | "layered" | "skip";
export type FolderChoice =
  | "components"
  | "hooks"
  | "pages"
  | "layouts"
  | "services"
  | "utils"
  | "types"
  | "assets"
  | "api"
  | "validators"
  | "templates"
  | "themes"
  | "lib";

export interface ProjectConfig {
  projectName?: string;
  framework: FrameworkChoice;
  directoryMode: DirectoryMode;
  styling: StylingChoice;
  architecture: ArchitectureConfig;
}

export interface TailwindConfig {
  mode: TailwindMode;
  darkMode: DarkModeStrategy;
  darkModeToggle: boolean;
  colorPreset: ColorPreset;
  customColor?: string;
  font: FontChoice;
  prettierTailwind: boolean;
}

export interface MuiConfig {
  themeMode: "light" | "dark" | "system";
  darkModeToggle: boolean;
  colorPreset: "blue" | "purple" | "green" | "custom";
  customColor?: string;
  icons: boolean;
  font: FontChoice;
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

export interface ArchitectureConfig {
  style: ArchitectureChoice;
  features: string[]; // only for feature-based
  featureFolders: FolderChoice[]; // folders inside each feature
  sharedFolders: FolderChoice[]; // folders in src/ root
  indexFiles: FolderChoice[]; // folders to add index.ts/js in
}
