import { execa } from "execa";
import { spinner } from "../utils/spinner.js";
import { logger } from "../utils/logger.js";
import type { Feature } from "./feature.interface.js";
import type { GitConfig } from "../../../config/projectConfig.js";
import { rollbackFeature } from "../utils/rollback.js";
import path from "path";

export function gitFeature(config: GitConfig): Feature {
  return {
    name: "git",

    async run(projectPath: string) {
      try {
        if (!config.init) {
          logger.info("Skipping Git initialization.");
          return;
        }

        /**
         * STEP 1
         * Initialize a new Git repository in the project folder
         */
        spinner.start("Initializing Git repository...");
        await execa("git", ["init"], { cwd: projectPath });
        spinner.succeed("Git repository initialized!");

        if (!config.initialCommit) return;

        /**
         * STEP 2
         * Stage all generated files
         */
        spinner.start("Staging files...");
        await execa("git", ["add", "."], { cwd: projectPath });
        spinner.succeed("Files staged!");

        /**
         * STEP 3
         * Create the initial commit with a hardcoded conventional message
         */
        spinner.start("Creating initial commit...");
        await execa("git", ["commit", "-m", "chore: initial commit"], {
          cwd: projectPath,
        });
        spinner.succeed("Initial commit created!");

        /**
         * FINAL SUCCESS MESSAGE
         */
        logger.success("Git setup complete!");
      } catch (error) {
        spinner.fail("Failed to setup Git.");
        await rollbackFeature([path.join(projectPath, ".git")]);
        throw error;
      }
    },
  };
}
