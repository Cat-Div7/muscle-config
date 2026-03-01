export type FrameworkChoice = "react-ts" | "react-js";

export interface ProjectConfig {
  projectName: string;
  framework: FrameworkChoice;
}