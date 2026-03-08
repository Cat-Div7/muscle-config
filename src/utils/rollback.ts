import fs from "fs/promises";
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

// Snapshot store — saves original file content before overwriting
const snapshots = new Map<string, string>();

export async function saveSnapshot(filePath: string): Promise<void> {
  try {
    const content = await fs.readFile(filePath, "utf-8");
    snapshots.set(filePath, content);
  } catch {
    // File didn't exist before — snapshot as null so we delete it on rollback
    snapshots.set(filePath, "");
  }
}

export async function restoreSnapshots(): Promise<void> {
  for (const [filePath, content] of snapshots.entries()) {
    try {
      if (content === "") {
        await fs.rm(filePath, { force: true });
      } else {
        await fs.writeFile(filePath, content);
      }
    } catch {
      logger.error(`Failed to restore ${filePath}`);
    }
  }
  snapshots.clear();
}