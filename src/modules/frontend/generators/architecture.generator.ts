import fs from "fs/promises";
import path from "path";
import type { ArchitectureConfig } from "../config/projectConfig.js";

// ─── Helpers ───
async function createFolder(folderPath: string): Promise<void> {
  await fs.mkdir(folderPath, { recursive: true });
}

async function createGitkeep(folderPath: string): Promise<void> {
  await fs.writeFile(path.join(folderPath, ".gitkeep"), "");
}

async function createIndexFile(
  folderPath: string,
  isTypeScript: boolean,
): Promise<void> {
  const filename = isTypeScript ? "index.ts" : "index.js";
  await fs.writeFile(path.join(folderPath, filename), "export {};\n");
}

async function folderExists(folderPath: string): Promise<boolean> {
  try {
    await fs.access(folderPath);
    return true;
  } catch {
    return false;
  }
}

// ─── Main generator ───
export async function generateArchitecture(
  config: ArchitectureConfig,
  projectPath: string,
  isTypeScript: boolean,
): Promise<void> {
  if (config.style === "skip") return;

  const srcPath = path.join(projectPath, "src");

  if (config.style === "feature-based") {
    // Create src/features/ folder
    const featuresDir = path.join(srcPath, "features");
    await createFolder(featuresDir);

    // Create each feature with its selected folders
    for (const feature of config.features) {
      const featureDir = path.join(featuresDir, feature);
      await createFolder(featureDir);

      for (const folder of config.featureFolders) {
        const folderPath = path.join(featureDir, folder);
        await createFolder(folderPath);

        if (config.indexFiles.includes(folder)) {
          await createIndexFile(folderPath, isTypeScript);
        } else {
          await createGitkeep(folderPath);
        }
      }
    }

    // Create shared folders in src/ — skip if already exists
    for (const folder of config.sharedFolders) {
      const folderPath = path.join(srcPath, folder);

      if (await folderExists(folderPath)) continue;

      await createFolder(folderPath);

      if (config.indexFiles.includes(folder)) {
        await createIndexFile(folderPath, isTypeScript);
      } else {
        await createGitkeep(folderPath);
      }
    }
  }

  if (config.style === "layered") {
    for (const folder of config.sharedFolders) {
      const folderPath = path.join(srcPath, folder);

      if (await folderExists(folderPath)) continue;

      await createFolder(folderPath);

      if (config.indexFiles.includes(folder)) {
        await createIndexFile(folderPath, isTypeScript);
      } else {
        await createGitkeep(folderPath);
      }
    }
  }
}
