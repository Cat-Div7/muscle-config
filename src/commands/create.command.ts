import path from "path";

// Prompts
import { askDirectoryMode } from "../prompts/directory.prompt.js";
import { askProjectName } from "../prompts/projectName.prompt.js";
import { askFramework } from "../prompts/framework.prompt.js";
import { askStyling } from "../prompts/styling.prompt.js";
import { askTailwindConfig } from "../prompts/tailwind.prompt.js";
import { askMuiConfig } from "../prompts/mui.prompt.js";
import { askCssConfig } from "../prompts/css.prompt.js";
import { askArchitecture } from "../prompts/architecture.prompt.js";

// Generators
import { generateReactProject } from "../generators/react.generator.js";

// Features
import { tailwindFeature } from "../features/tailwind.feature.js";
import { muiFeature } from "../features/mui.feature.js";
import { cssFeature } from "../features/css.feature.js";
import { createArchitectureFeature } from "../features/architecture.feature.js";

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
import { askPrettierConfig } from "../prompts/prettier.prompt.js";
import { prettierFeature } from "../features/prettier.feature.js";

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

  // Build config object
  const config: ProjectConfig = {
    projectName,
    framework,
    directoryMode,
    styling,
    architecture,
    prettier: prettierConfig,
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
