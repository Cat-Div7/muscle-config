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
  generateThemeContextProvider,
  generateAppMuiThemeProvider,
  generateMuiMain,
} from "../generators/mui.generator.js";
import { fileURLToPath } from "url";
import { restoreSnapshots, rollbackFeature, saveSnapshot } from "../utils/rollback.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

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
       * Install MUI icons if selected or needed for ThemeToggle
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
       * Generate src/themes/theme.ts or theme.js
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
       * Generate src/context/ThemeContextProvider.tsx or .jsx
       */
      spinner.start("Generating ThemeContextProvider...");
      const contextDir = path.join(projectPath, "src/context");
      await fs.mkdir(contextDir, { recursive: true });
      const contextFile = path.join(
        contextDir,
        isTypeScript ? "ThemeContextProvider.tsx" : "ThemeContextProvider.jsx",
      );
      await fs.writeFile(
        contextFile,
        generateThemeContextProvider(config, isTypeScript),
      );
      spinner.succeed("ThemeContextProvider generated!");

      /**
       * STEP 7
       * Generate src/themes/AppMuiThemeProvider.tsx or .jsx
       */
      spinner.start("Generating AppMuiThemeProvider...");
      const providerFile = path.join(
        themesDir,
        isTypeScript ? "AppMuiThemeProvider.tsx" : "AppMuiThemeProvider.jsx",
      );
      await fs.writeFile(
        providerFile,
        generateAppMuiThemeProvider(isTypeScript),
      );
      spinner.succeed("AppMuiThemeProvider generated!");

      /**
       * STEP 8
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
        await fs.writeFile(toggleFile, generateMuiThemeToggle());
        spinner.succeed("ThemeToggle component created!");
      }

      /**
       * STEP 9
       * Overwrite main.tsx / main.jsx with clean provider composition
       */
      spinner.start("Configuring main entry point...");
      const mainFile = path.join(
        projectPath,
        isTypeScript ? "src/main.tsx" : "src/main.jsx",
      );
      await saveSnapshot(mainFile);
      await fs.writeFile(mainFile, generateMuiMain(isTypeScript));
      spinner.succeed("Main entry point configured!");

      /**
       * STEP 10
       * Copy demo App template if user selected it
       */
      if (config.demo) {
        spinner.start("Copying MUI demo template...");
        const templateDir = path.join(__dirname, "../templates/react/mui");
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
      logger.success("MUI added successfully!");
    } catch (error) {
      spinner.fail("Failed to setup MUI.");
      await restoreSnapshots();
      await rollbackFeature([
        path.join(projectPath, "src/themes"),
        path.join(projectPath, "src/context"),
        path.join(projectPath, "src/components/ThemeToggle.tsx"),
        path.join(projectPath, "src/components/ThemeToggle.jsx"),
      ]);
      throw error;
    }
  },
};
