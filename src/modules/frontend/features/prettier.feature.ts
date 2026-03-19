import fs from "fs/promises";
import path from "path";
import { spinner } from "../../../core/spinner.js";
import { logger } from "../../../core/logger.js";
import type { Feature } from "../../../core/feature.interface.js";
import type { PrettierConfig } from "../config/projectConfig.js";
import { installPackages } from "../../../core/install.js";
import { rollbackFeature } from "../../../core/rollback.js";

export function prettierFeature(config: PrettierConfig): Feature {
  return {
    name: "prettier",

    async run(projectPath: string) {
      try {
        if (!config.enabled) {
          logger.info("Skipping Prettier setup.");
          return;
        }

        /**
         * STEP 1
         * Install Prettier
         */
        spinner.start("Installing Prettier...");
        await installPackages(["prettier"], projectPath, true);
        spinner.succeed("Prettier installed!");

        /**
         * STEP 2
         * Build the Prettier config object from user choices
         */
        const prettierConfig: Record<string, unknown> = {
          singleQuote: config.singleQuote,
          semi: config.semi,
          tabWidth: config.tabWidth,
        };

        /**
         * STEP 3
         * Check if .prettierrc already exists (Tailwind plugin case)
         * If yes — read it and merge, preserving the plugins array
         * If no  — create fresh
         */
        const prettierrcPath = path.join(projectPath, ".prettierrc");

        let existingConfig: Record<string, unknown> = {};
        try {
          const raw = await fs.readFile(prettierrcPath, "utf-8");
          existingConfig = JSON.parse(raw);
        } catch {
          // file doesn't exist — start fresh
        }

        const merged = { ...prettierConfig, ...existingConfig };

        spinner.start("Writing .prettierrc...");
        await fs.writeFile(prettierrcPath, JSON.stringify(merged, null, 2));
        spinner.succeed(".prettierrc written!");

        /**
         * STEP 4
         * Create .prettierignore
         */
        spinner.start("Creating .prettierignore...");
        await fs.writeFile(
          path.join(projectPath, ".prettierignore"),
          ["node_modules", "dist", "build", ""].join("\n"),
        );
        spinner.succeed(".prettierignore created!");

        /**
         * FINAL SUCCESS MESSAGE
         */
        logger.success("Prettier setup complete!");
      } catch (error) {
        spinner.fail("Failed to setup Prettier.");
        await rollbackFeature([
          path.join(projectPath, ".prettierrc"),
          path.join(projectPath, ".prettierignore"),
        ]);
        throw error;
      }
    },
  };
}
