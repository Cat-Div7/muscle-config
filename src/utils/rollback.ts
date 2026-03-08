import fs from "fs/promises";
import path from "path";
import { logger } from "./logger.js";
import { cleanupDirectory } from "./directory.js";

// Level 1 — full project rollback
// Used in create.command.ts if scaffolding fails entirely
export async function rollbackProject(
  projectPath: string,
  directoryMode: "new" | "current",
): Promise<void> {
  try {
    logger.warn("Rolling back — removing created files...");
    if (directoryMode === "new") {
      await fs.rm(projectPath, { recursive: true, force: true });
    } else {
      await cleanupDirectory(projectPath);
    }
    logger.success("Rollback complete. No files were left behind.");
  } catch {
    logger.error("Rollback failed — please manually delete the project folder.");
  }
}

// Level 2 — feature rollback
// Used in tailwind.feature.ts / mui.feature.ts if feature setup fails
// Deletes only specific paths the feature was responsible for
export async function rollbackFeature(
  paths: string[],
): Promise<void> {
  try {
    logger.warn("Rolling back feature — removing generated files...");
    for (const filePath of paths) {
      await fs.rm(filePath, { recursive: true, force: true });
    }
    logger.success("Feature rollback complete. Your base project is intact.");
  } catch {
    logger.error("Feature rollback failed — some files may need manual cleanup.");
  }
}