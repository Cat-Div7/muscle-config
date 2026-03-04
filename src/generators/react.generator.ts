import { execa } from "execa";
import type { ProjectConfig } from "../config/projectConfig.js";
import { logger } from "../utils/logger.js";

export async function generateReactProject(config: ProjectConfig) {
  // Determine Vite template based on framework choice
  const template = config.framework === "react-ts" ? "react-ts" : "react";
  // Get Directory mode from config and determine target directory
  const targetDir =
    config.directoryMode === "current" ? "." : config.projectName!;

  logger.info(
    `Creating project '${config.projectName}' using template '${template}'...`,
  );

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
    {
      stdio: "ignore",
    },
  );

  logger.success("Project created successfully!");
}
