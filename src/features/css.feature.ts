import fs from "fs/promises";
import path from "path";
import { spinner } from "../utils/spinner.js";
import { logger } from "../utils/logger.js";
import type { Feature } from "./feature.interface.js";
import { askCssConfig } from "../prompts/css.prompt.js";
import {
  generateCssReset,
  generateCssVariables,
  generateCssTypography,
  generateCssIndex,
  generateCssIndexWithImports,
  generateCssThemeToggle,
} from "../generators/css-plain.generator.js";
import { saveSnapshot, restoreSnapshots, rollbackFeature } from "../utils/rollback.js";

export const cssFeature: Feature = {
  name: "css",

  async run(projectPath: string) {
    try {
      /**
       * STEP 1
       * Ask the developer for CSS configuration options
       */
      const config = await askCssConfig();

      if (config.mode === "skip") {
        logger.info("Skipping CSS configuration — using Vite default.");
        return;
      }

      /**
       * STEP 2
       * Detect TypeScript or JavaScript
       */
      const tsConfigPath = path.join(projectPath, "vite.config.ts");
      let isTypeScript = false;
      try {
        await fs.access(tsConfigPath);
        isTypeScript = true;
      } catch {}

      /**
       * STEP 3
       * Generate CSS files
       */
      if (config.separateFiles) {
        spinner.start("Generating CSS files...");
        const stylesDir = path.join(projectPath, "src/styles");
        await fs.mkdir(stylesDir, { recursive: true });

        if (config.reset) {
          await fs.writeFile(
            path.join(stylesDir, "reset.css"),
            generateCssReset(),
          );
        }

        await fs.writeFile(
          path.join(stylesDir, "variables.css"),
          generateCssVariables(config),
        );

        await fs.writeFile(
          path.join(stylesDir, "typography.css"),
          generateCssTypography(config),
        );

        await fs.writeFile(
          path.join(stylesDir, "index.css"),
          generateCssIndexWithImports(),
        );

        spinner.succeed("CSS files generated!");

        /**
         * STEP 4
         * Update src/index.css to import from styles/
         */
        spinner.start("Updating main CSS entry...");
        const mainCssPath = path.join(projectPath, "src/index.css");
        await saveSnapshot(mainCssPath);
        await fs.writeFile(
          mainCssPath,
          `@import "./styles/index.css";\n`,
        );
        spinner.succeed("Main CSS entry updated!");
      } else {
        /**
         * STEP 3 (single file mode)
         * Overwrite src/index.css with generated content
         */
        spinner.start("Generating CSS styles...");
        const mainCssPath = path.join(projectPath, "src/index.css");
        await saveSnapshot(mainCssPath);
        await fs.writeFile(mainCssPath, generateCssIndex(config));
        spinner.succeed("CSS styles generated!");
      }

      /**
       * STEP 5
       * Generate ThemeToggle component if class dark mode selected
       */
      if (config.darkModeToggle) {
        spinner.start("Creating ThemeToggle component...");
        const componentDir = path.join(projectPath, "src/components");
        await fs.mkdir(componentDir, { recursive: true });
        const toggleFile = path.join(
          componentDir,
          isTypeScript ? "ThemeToggle.tsx" : "ThemeToggle.jsx",
        );
        await fs.writeFile(toggleFile, generateCssThemeToggle(isTypeScript));
        spinner.succeed("ThemeToggle component created!");
      }

      /**
       * FINAL SUCCESS MESSAGE
       */
      logger.success("CSS setup complete!");
    } catch (error) {
      spinner.fail("Failed to setup CSS.");
      await restoreSnapshots();
      await rollbackFeature([
        path.join(projectPath, "src/styles"),
        path.join(projectPath, "src/components/ThemeToggle.tsx"),
        path.join(projectPath, "src/components/ThemeToggle.jsx"),
      ]);
      throw error;
    }
  },
};