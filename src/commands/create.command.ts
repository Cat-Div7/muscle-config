import { askFramework } from "../prompts/framework.prompt.js";
import type { ProjectConfig } from "../config/projectConfig.js";
import { generateReactProject } from "../generators/react.generator.js";
import { askProjectName } from "../prompts/projectName.prompt.js";
import { askDirectoryMode } from "../prompts/directory.prompt.js";

export async function createProject() {
  const directoryMode = await askDirectoryMode();

  let projectName = "";
  if (directoryMode === "new") {
    projectName = await askProjectName();
  }

  const framework = await askFramework();

  const config: ProjectConfig = {
    projectName,
    framework,
    directoryMode,
  };

  await generateReactProject(config);
}
