import fs from "fs/promises";
import path from "path";
import { logger } from "./logger.js";
import inquirer from "inquirer";

export async function cleanupDirectory(dirPath: string): Promise<void> {
  const files = await fs.readdir(dirPath);
  for (const file of files) {
    await fs.rm(path.join(dirPath, file), {
      recursive: true,
      force: true,
    });
  }
}

export async function checkCurrentDirectory(): Promise<void> {
  const cwd = process.cwd();
  const files = await fs.readdir(cwd);

  if (files.length === 0) return;

  console.log("\n");
  logger.warn("Current directory is not empty.");
  logger.dim("Files detected:");
  files.forEach((file) => logger.dim(`  - ${file}`));
  console.log("\n");

  const { action } = await inquirer.prompt([
    {
      type: "list",
      name: "action",
      message: "Creating a project here will overwrite existing files. What would you like to do?",
      choices: [
        { name: "Cancel (recommended)", value: "cancel" },
        { name: "Continue anyway (deletes existing files)", value: "continue" },
      ],
      default: "cancel",
    },
  ]);

  if (action === "cancel") {
    logger.info("Cancelled. No files were changed.");
    process.exit(0);
  }

  logger.warn("Cleaning up existing files...");
  await cleanupDirectory(cwd);
  logger.success("Directory cleared!");
}
