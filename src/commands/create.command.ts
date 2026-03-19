import path from "path";

// Prompts
import { askDirectoryMode } from "./directory.prompt.js";
import { askProjectName } from "./projectName.prompt.js";
import { askFramework } from "../modules/frontend/prompts/framework.prompt.js";
import { askStyling } from "../modules/frontend/prompts/styling.prompt.js";
import { askTailwindConfig } from "../modules/frontend/prompts/tailwind.prompt.js";
import { askMuiConfig } from "../modules/frontend/prompts/mui.prompt.js";
import { askCssConfig } from "../modules/frontend/prompts/css.prompt.js";
import { askArchitecture } from "../modules/frontend/prompts/architecture.prompt.js";

// Generators
import { generateReactProject } from "../modules/frontend/generators/react.generator.js";

// Features
import { tailwindFeature } from "../modules/frontend/features/tailwind.feature.js";
import { muiFeature } from "../modules/frontend/features/mui.feature.js";
import { cssFeature } from "../modules/frontend/features/css.feature.js";
import { createArchitectureFeature } from "../modules/frontend/features/architecture.feature.js";

// Types
import type {
  ProjectConfig,
  TailwindConfig,
  MuiConfig,
  CssConfig,
} from "../config/projectConfig.js";

// Utils
import { checkCurrentDirectory } from "../utils/directory.js";
import { rollbackProject } from "../utils/rollback.js";
import { logger } from "../utils/logger.js";
import { askPrettierConfig } from "../modules/frontend/prompts/prettier.prompt.js";
import { prettierFeature } from "../modules/frontend/features/prettier.feature.js";
import { askGitConfig } from "../modules/frontend/prompts/git.prompt.js";
import { gitFeature } from "../modules/frontend/features/git.feature.js";

export async function createProject() {
  // Step 1: Directory mode
  const directoryMode = await askDirectoryMode();
  if (directoryMode === "current") await checkCurrentDirectory();

  // Step 2: Project name (skipped if using current directory)
  let projectName = "";
  if (directoryMode === "new") projectName = await askProjectName();

  // Step 3: Framework (React TS / React JS)
  const framework = await askFramework();

  // Step 4: Styling choice + config (collected upfront, before scaffolding)
  const styling = await askStyling();

  let tailwindConfig: TailwindConfig | undefined;
  let muiConfig: MuiConfig | undefined;
  let cssConfig: CssConfig | undefined;

  if (styling === "tailwind") tailwindConfig = await askTailwindConfig();
  if (styling === "mui") muiConfig = await askMuiConfig();
  if (styling === "css") cssConfig = await askCssConfig();

  // Step 5: Architecture layout
  const architecture = await askArchitecture();

  // Step 6: Prettier config
  const prettierConfig = await askPrettierConfig();

  // Step 7: Git initialize
  const gitConfig = await askGitConfig();

  // Build config object
  const config: ProjectConfig = {
    projectName,
    framework,
    directoryMode,
    styling,
    architecture,
    prettier: prettierConfig,
    git: gitConfig,
  };

  const projectPath =
    config.directoryMode === "current"
      ? process.cwd()
      : path.join(process.cwd(), config.projectName!);

  try {
    // Scaffold base React + Vite project
    await generateReactProject(config);
    console.log("");

    // Queue features based on user choices
    // Each factory receives its config and returns a Feature with run()
    const features = [];

    if (styling === "tailwind" && tailwindConfig)
      features.push(tailwindFeature(tailwindConfig));

    if (styling === "mui" && muiConfig) features.push(muiFeature(muiConfig));

    if (styling === "css" && cssConfig) features.push(cssFeature(cssConfig));

    if (architecture.style !== "skip")
      features.push(createArchitectureFeature(architecture));

    if (prettierConfig.enabled) features.push(prettierFeature(prettierConfig));

    // Ask the git init in the end
    features.push(gitFeature(config.git!));

    // Run each feature sequentially
    for (const feature of features) {
      await feature.run(projectPath);
    }

    // Done
    const runCommand =
      config.directoryMode === "current" ? "" : `cd ${config.projectName} && `;

    console.log("");
    logger.success("Project created successfully!");
    logger.dim("  Get started:");
    logger.dim(`  ${runCommand}npm run dev`);
    console.log("\n");
  } catch (error) {
    // Full rollback if anything fails post-scaffolding
    logger.error("Something went wrong during project creation.");
    await rollbackProject(projectPath, config.directoryMode);
    process.exit(1);
  }
}
