export type FrameworkChoice = "react-ts" | "react-js";
export type DirectoryMode = "new" | "current";
export type StylingChoice = "tailwind" | "none";

export interface ProjectConfig {
  projectName?: string;
  framework: FrameworkChoice;
  directoryMode: DirectoryMode;
  styling: StylingChoice;
}