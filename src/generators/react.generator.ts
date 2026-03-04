import { execa } from "execa";
import type { ProjectConfig } from "../config/projectConfig.js";
import { logger } from "../utils/logger.js";
import { spinner } from "../utils/spinner.js";
import path from "path";

export async function generateReactProject(config: ProjectConfig) {
  const template = config.framework === "react-ts" ? "react-ts" : "react";
  const targetDir =
    config.directoryMode === "current" ? "." : config.projectName!;

  logger.info(
    `Creating project '${targetDir}' using template '${template}'...`,
  );

  try {
    spinner.start("Scaffolding project with Vite...");
    // Start Creating the project
    await execa(
      "npm",
      [
        "create",
        "vite@latest",
        targetDir,
        "--",
        "--template",
        template,
        "--no-interactive",
      ],
      { stdio: "ignore" },
    );
    spinner.succeed("Project scaffolded!");
  } catch (error) {
    spinner.fail("Failed to scaffold project.");
    throw error;
  }
}
