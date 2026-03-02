import { execa } from "execa";
import type { ProjectConfig } from "../config/projectConfig.js";
import { logger } from "../utils/logger.js";

export async function generateReactProject(config: ProjectConfig) {
  const template = config.framework === "react-ts" ? "react-ts" : "react";

  logger.info(
    `Creating project '${config.projectName}' using template '${template}'...`,
  );

  await execa(
    "npm",
    ["create", "vite@latest", config.projectName, "--", "--template", template],
    { stdio: "inherit" },
  );
}