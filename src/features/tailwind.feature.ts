import { execa } from "execa";
import fs from "fs/promises";
import path from "path";
import { fileURLToPath } from "url";
import { spinner } from "../utils/spinner.js";
import { logger } from "../utils/logger.js";
import type { Feature } from "./feature.interface.js";
import { askTailwindConfig } from "../prompts/tailwind.prompt.js";
import { generateIndexCss } from "../generators/css.generator.js";
import { generateThemeToggle } from "../generators/toggle.generator.js";
import { generateTailwindConfig } from "../generators/tailwind.config.generator.js";
import {
  restoreSnapshots,
  rollbackFeature,
  saveSnapshot,
} from "../utils/rollback.js";
import { installPackages } from "../utils/install.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export const tailwindFeature: Feature = {
  name: "tailwind",

  async run(projectPath: string) {
    try {
      /**
       * STEP 1
       * Ask the developer for Tailwind configuration options
       * (dark mode, colors, fonts, plugins, etc.)
       */
      const config = await askTailwindConfig();

      /**
       * STEP 2
       * Install Tailwind v4 and the Vite plugin
       */
      spinner.start("Installing Tailwind v4...");
      await execa("npm", ["install", "tailwindcss", "@tailwindcss/vite"], {
        cwd: projectPath,
      });
      spinner.succeed("Tailwind installed!");

      /**
       * STEP 3
       * Detect if the project uses TypeScript or JavaScript
       * by checking which vite config file exists
       */
      const tsConfigPath = path.join(projectPath, "vite.config.ts");
      const jsConfigPath = path.join(projectPath, "vite.config.js");

      let viteConfigPath: string;
      let isTypeScript = false;

      try {
        await fs.access(tsConfigPath);
        viteConfigPath = tsConfigPath;
        isTypeScript = true;
      } catch {
        try {
          await fs.access(jsConfigPath);
          viteConfigPath = jsConfigPath;
        } catch {
          throw new Error("Could not find vite.config.ts or vite.config.js");
        }
      }

      /**
       * STEP 4
       * Copy the correct vite.config template that already
       * includes Tailwind's Vite plugin configuration
       */
      spinner.start("Configuring Vite...");
      const templateDir = path.join(
        __dirname,
        "../templates/react/tailwind-v4",
      );

      const viteTemplatePath = path.join(
        templateDir,
        isTypeScript ? "vite.config.ts" : "vite.config.js",
      );

      await fs.copyFile(viteTemplatePath, viteConfigPath);
      spinner.succeed("Vite configured!");

      /**
       * STEP 5
       * Generate tailwind.config file dynamically
       * based on the developer's selected options
       * (dark mode strategy, theme extension, plugins)
       */
      spinner.start("Generating Tailwind config...");
      const tailwindConfigPath = path.join(
        projectPath,
        isTypeScript ? "tailwind.config.ts" : "tailwind.config.js",
      );

      const tailwindConfigContent = generateTailwindConfig(config);

      await fs.writeFile(tailwindConfigPath, tailwindConfigContent);
      spinner.succeed("Tailwind config generated!");

      /**
       * STEP 6
       * Generate the Tailwind CSS entry file dynamically
       * based on the user's choices (font, colors, dark mode, etc.)
       */
      spinner.start("Generating Tailwind styles...");
      const cssPath = path.join(projectPath, "src/index.css");
      await saveSnapshot(cssPath);
      const cssContent = generateIndexCss(config);
      await fs.writeFile(cssPath, cssContent);
      spinner.succeed("Tailwind styles generated!");

      /**
       * STEP 7
       * If the user selected "ThemeToggle"
       * we generate a ready-to-use React component
       */
      if (config.darkModeToggle) {
        spinner.start("Creating ThemeToggle component...");
        const componentDir = path.join(projectPath, "src/components");
        await fs.mkdir(componentDir, { recursive: true });

        const toggleFile = path.join(
          componentDir,
          isTypeScript ? "ThemeToggle.tsx" : "ThemeToggle.jsx",
        );

        const toggleContent = generateThemeToggle(isTypeScript);
        await fs.writeFile(toggleFile, toggleContent);
        spinner.succeed("ThemeToggle component created!");
      }

      /**
       * STEP 8
       * Install and configure Prettier plugin for Tailwind if selected
       */
      if (config.prettierTailwind) {
        spinner.start("Installing Prettier + Tailwind plugin...");
        await installPackages(
          ["prettier", "prettier-plugin-tailwindcss"],
          projectPath,
          true,
        );
        spinner.succeed("Prettier installed!");

        spinner.start("Creating .prettierrc...");
        const prettierConfig = {
          plugins: ["prettier-plugin-tailwindcss"],
        };
        await fs.writeFile(
          path.join(projectPath, ".prettierrc"),
          JSON.stringify(prettierConfig, null, 2),
        );
        spinner.succeed(".prettierrc created!");
      }

      /**
       * STEP 9
       * Install optional Tailwind plugins selected by the user
       */
      // if (config.plugins.length > 0) {
      //   spinner.start("Installing Tailwind plugins...");

      //   await execa("npm", ["install", ...config.plugins], {
      //     cwd: projectPath,
      //   });

      //   spinner.succeed("Plugins installed!");
      // }

      /**
       * FINAL SUCCESS MESSAGE
       */
      logger.success("Tailwind v4 added successfully!");
    } catch (error) {
      spinner.fail("Failed to setup Tailwind.");
      await restoreSnapshots();
      await rollbackFeature([
        path.join(projectPath, "tailwind.config.ts"),
        path.join(projectPath, "tailwind.config.js"),
        path.join(projectPath, "src/components/ThemeToggle.tsx"),
        path.join(projectPath, "src/components/ThemeToggle.jsx"),
        path.join(projectPath, ".prettierrc"),
      ]);
      throw error;
    }
  },
};
