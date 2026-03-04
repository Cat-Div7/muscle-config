export type FrameworkChoice = "react-ts" | "react-js";
export type DirectoryMode = "new" | "current";

export interface ProjectConfig {
  projectName?: string;
  framework: FrameworkChoice;
  directoryMode: DirectoryMode;
}