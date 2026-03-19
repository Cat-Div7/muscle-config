import fs from "fs/promises";
import path from "path";
import { fileURLToPath } from "url";
import { spinner } from "../utils/spinner.js";
import { logger } from "../utils/logger.js";
import type { Feature } from "./feature.interface.js";
import type { CssConfig } from "../../../config/projectConfig.js";
import {
  generateCssReset,
  generateCssVariables,
  generateCssTypography,
  generateCssIndex,
  generateCssIndexWithImports,
  generateCssThemeToggle,
} from "../generators/css-plain.generator.js";
import {
  saveSnapshot,
  restoreSnapshots,
  rollbackFeature,
} from "../utils/rollback.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export function cssFeature(config: CssConfig): Feature {
  return {
    name: "css",

    async run(projectPath: string) {
      try {
        if (config.mode === "skip") {
          logger.info("Skipping CSS configuration — using Vite default.");
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
         * Generate CSS files — separate files or single file mode
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
          spinner.succeed("CSS files generated!");

          /**
           * STEP 3 (separate files)
           * Overwrite src/index.css with @import statements pointing to styles/
           */
          spinner.start("Updating main CSS entry...");
          const mainCssPath = path.join(projectPath, "src/index.css");
          await saveSnapshot(mainCssPath);
          await fs.writeFile(mainCssPath, generateCssIndexWithImports(config));
          spinner.succeed("Main CSS entry updated!");
        } else {
          /**
           * STEP 2 (single file)
           * Overwrite src/index.css with all generated styles inline
           */
          spinner.start("Generating CSS styles...");
          const mainCssPath = path.join(projectPath, "src/index.css");
          await saveSnapshot(mainCssPath);
          await fs.writeFile(mainCssPath, generateCssIndex(config));
          spinner.succeed("CSS styles generated!");
        }

        /**
         * STEP 4
         * Generate ThemeToggle component if class dark mode + toggle selected
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
         * STEP 5
         * Copy demo App template if user selected it
         */
        if (config.demo) {
          spinner.start("Copying CSS demo template...");
          const templateDir = path.join(__dirname, "../templates/react/css");
          const appTemplatePath = path.join(
            templateDir,
            isTypeScript ? "App.tsx" : "App.jsx",
          );
          const appTargetPath = path.join(
            projectPath,
            isTypeScript ? "src/App.tsx" : "src/App.jsx",
          );
          await fs.copyFile(appTemplatePath, appTargetPath);
          spinner.succeed("Demo template copied!");
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
          path.join(projectPath, "src/App.tsx"),
          path.join(projectPath, "src/App.jsx"),
        ]);
        throw error;
      }
    },
  };
}
