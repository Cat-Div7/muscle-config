export interface Feature {
  name: string;
  run(projectPath: string): Promise<void>;
}