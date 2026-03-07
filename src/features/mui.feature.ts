import { execa } from "execa";
import fs from "fs/promises";
import path from "path";
import { spinner } from "../utils/spinner.js";
import { logger } from "../utils/logger.js";
import type { Feature } from "./feature.interface.js";
import { askMuiConfig } from "../prompts/mui.prompt.js";
import {
  generateMuiTheme,
  generateMuiThemeToggle,
  generateMuiMain,
} from "../generators/mui.generator.js";

export const muiFeature: Feature = {
  name: "mui",

  async run(projectPath: string) {
    try {
      /**
       * STEP 1
       * Ask the developer for MUI configuration options
       */
      const config = await askMuiConfig();

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
       * Install MUI core + emotion
       */
      spinner.start("Installing MUI...");
      await execa(
        "npm",
        ["install", "@mui/material", "@emotion/react", "@emotion/styled"],
        { cwd: projectPath },
      );
      spinner.succeed("MUI installed!");

      /**
       * STEP 4
       * Install MUI icons if selected
       */
      if (config.icons || config.darkModeToggle) {
        spinner.start("Installing MUI Icons...");
        await execa("npm", ["install", "@mui/icons-material"], {
          cwd: projectPath,
        });
        spinner.succeed("MUI Icons installed!");
      }

      /**
       * STEP 5
       * Generate themes/theme.ts
       */
      spinner.start("Generating MUI theme...");
      const themesDir = path.join(projectPath, "src/themes");
      await fs.mkdir(themesDir, { recursive: true });

      const themeFile = path.join(
        themesDir,
        isTypeScript ? "theme.ts" : "theme.js",
      );
      await fs.writeFile(themeFile, generateMuiTheme(config, isTypeScript));
      spinner.succeed("MUI theme generated!");

      /**
       * STEP 6
       * Generate ThemeToggle component if selected
       */
      if (config.darkModeToggle) {
        spinner.start("Creating ThemeToggle component...");
        const componentDir = path.join(projectPath, "src/components");
        await fs.mkdir(componentDir, { recursive: true });

        const toggleFile = path.join(
          componentDir,
          isTypeScript ? "ThemeToggle.tsx" : "ThemeToggle.jsx",
        );
        await fs.writeFile(toggleFile, generateMuiThemeToggle(isTypeScript));
        spinner.succeed("ThemeToggle component created!");
      }

      /**
       * STEP 7
       * Overwrite main.tsx with ThemeProvider setup
       */
      spinner.start("Configuring main entry point...");
      const mainFile = path.join(
        projectPath,
        isTypeScript ? "src/main.tsx" : "src/main.jsx",
      );
      await fs.writeFile(mainFile, generateMuiMain(config, isTypeScript));
      spinner.succeed("Main entry point configured!");

      /**
       * FINAL SUCCESS MESSAGE
       */
      logger.success("MUI added successfully!");
    } catch (error) {
      spinner.fail("Failed to setup MUI.");
      throw error;
    }
  },
};
