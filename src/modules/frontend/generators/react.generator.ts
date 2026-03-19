import { execa } from "execa";
import type { ProjectConfig } from "../../../config/projectConfig.js";
import { logger } from "../../../core/logger.js";
import { spinner } from "../../../core/spinner.js";
import path from "path";

export async function generateReactProject(config: ProjectConfig) {
  const template = config.framework === "react-ts" ? "react-ts" : "react";
  const targetDir =
    config.directoryMode === "current" ? "." : config.projectName!;

  const projectPath =
    config.directoryMode === "current"
      ? process.cwd()
      : path.join(process.cwd(), config.projectName!);

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

    // Installing dependencies
    spinner.start("Installing dependencies — do not cancel this step...");
    await execa("npm", ["install"], {
      cwd: projectPath,
      stdio: "ignore",
    });
    spinner.succeed("Dependencies installed!");
    console.log("");
  } catch (error) {
    spinner.fail("Failed to scaffold project.");
    throw error;
  }
}
