import fs from "fs/promises";
import path from "path";
import { spinner } from "../utils/spinner.js";
import { logger } from "../utils/logger.js";
import type { Feature } from "./feature.interface.js";
import type { ArchitectureConfig } from "../config/projectConfig.js";
import { generateArchitecture } from "../generators/architecture.generator.js";
import { rollbackFeature } from "../utils/rollback.js";

export function createArchitectureFeature(
  config: ArchitectureConfig,
): Feature {
  return {
    name: "architecture",

    async run(projectPath: string) {
      try {
        if (config.style === "skip") {
          logger.info("Skipping architecture setup.");
          return;
        }

        /**
         * STEP 1
         * Detect TypeScript or JavaScript
         */
        const tsConfigPath = path.join(projectPath, "vite.config.ts");
        let isTypeScript = false;
        try {
          await fs.access(tsConfigPath);
          isTypeScript = true;
        } catch {}

        /**
         * STEP 2
         * Generate folder structure
         */
        spinner.start("Generating folder structure...");
        await generateArchitecture(config, projectPath, isTypeScript);
        spinner.succeed("Folder structure generated!");

        /**
         * FINAL SUCCESS MESSAGE
         */
        logger.success("Architecture setup complete!");
      } catch (error) {
        spinner.fail("Failed to setup architecture.");
        await rollbackFeature([
          path.join(projectPath, "src/features"),
          ...config.sharedFolders.map((f) =>
            path.join(projectPath, "src", f),
          ),
        ]);
        throw error;
      }
    },
  };
}