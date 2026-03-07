import path from "path";
import { askFramework } from "../prompts/framework.prompt.js";
import { askProjectName } from "../prompts/projectName.prompt.js";
import { askDirectoryMode } from "../prompts/directory.prompt.js";
import { generateReactProject } from "../generators/react.generator.js";
import { askStyling } from "../prompts/styling.prompt.js";
import { tailwindFeature } from "../features/tailwind.feature.js";
import type { ProjectConfig } from "../config/projectConfig.js";
import { muiFeature } from "../features/mui.feature.js";

export async function createProject() {
  const directoryMode = await askDirectoryMode();

  let projectName = "";
  if (directoryMode === "new") {
    projectName = await askProjectName();
  }

  const framework = await askFramework();
  const styling = await askStyling();

  const config: ProjectConfig = {
    projectName,
    framework,
    directoryMode,
    styling,
  };

  // Generate React Project With Vite
  await generateReactProject(config);

  const projectPath =
    config.directoryMode === "current"
      ? process.cwd()
      : path.join(process.cwd(), config.projectName!);

  const features = [];
  if (config.styling === "tailwind") features.push(tailwindFeature);
  if (config.styling === "mui") features.push(muiFeature);

  for (const feature of features) {
    await feature.run(projectPath);
  }
}
