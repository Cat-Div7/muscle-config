import { askFramework } from "../prompts/framework.prompt.js";
import type { ProjectConfig } from "../config/projectConfig.js";
import { generateReactProject } from "../generators/react.generator.js";

export async function createProject() {
  const framework = await askFramework();

  const config: ProjectConfig = {
    projectName: "my-app",
    framework,
  };

  await generateReactProject(config);
}
