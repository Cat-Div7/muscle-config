import path from "path";
import { askFramework } from "../prompts/framework.prompt.js";
import { askProjectName } from "../prompts/projectName.prompt.js";
import { askDirectoryMode } from "../prompts/directory.prompt.js";
import { generateReactProject } from "../generators/react.generator.js";
import { askStyling } from "../prompts/styling.prompt.js";
import { tailwindFeature } from "../features/tailwind.feature.js";
import type { ProjectConfig } from "../config/projectConfig.js";
import { muiFeature } from "../features/mui.feature.js";
import { checkCurrentDirectory } from "../utils/directory.js";
import { rollbackProject } from "../utils/rollback.js";
import { logger } from "../utils/logger.js";
import { cssFeature } from "../features/css.feature.js";

export async function createProject() {
  const directoryMode = await askDirectoryMode();

  if (directoryMode === "current") {
    await checkCurrentDirectory();
  }

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

  const projectPath =
    config.directoryMode === "current"
      ? process.cwd()
      : path.join(process.cwd(), config.projectName!);

  try {
    await generateReactProject(config);
    console.log("");

    const features = [];
    if (config.styling === "tailwind") features.push(tailwindFeature);
    if (config.styling === "mui") features.push(muiFeature);
    if (config.styling === "css") features.push(cssFeature);

    for (const feature of features) {
      await feature.run(projectPath);
    }

    const runCommand =
      config.directoryMode === "current" ? "" : `cd ${config.projectName} && `;

    console.log("");
    logger.success("Project created successfully!");
    logger.dim("  Get started:");
    logger.dim(`  ${runCommand}npm run dev`);
    console.log("\n");
  } catch (error) {
    logger.error("Something went wrong during project creation.");
    await rollbackProject(projectPath, config.directoryMode);
    process.exit(1);
  }
}
