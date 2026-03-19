import { execa } from "execa";
import fs from "fs/promises";
import path from "path";
import { fileURLToPath } from "url";
import { spinner } from "../utils/spinner.js";
import { logger } from "../utils/logger.js";
import type { Feature } from "./feature.interface.js";
import type { TailwindConfig } from "../../../config/projectConfig.js";
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

export function tailwindFeature(config: TailwindConfig): Feature {
  return {
    name: "tailwind",

    async run(projectPath: string) {
      try {
        /**
         * STEP 1
         * Install Tailwind v4 and the Vite plugin
         */
        spinner.start("Installing Tailwind v4...");
        await execa(
          "npm",
          ["install", "tailwindcss", "@tailwindcss/vite", "--legacy-peer-deps"],
          { cwd: projectPath },
        );
        spinner.succeed("Tailwind installed!");

        /**
         * STEP 2
         * Detect TypeScript or JavaScript
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
         * STEP 3
         * Copy the Vite config template that includes the Tailwind plugin
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
         * STEP 4
         * Generate tailwind.config based on user choices
         */
        spinner.start("Generating Tailwind config...");
        const tailwindConfigPath = path.join(
          projectPath,
          isTypeScript ? "tailwind.config.ts" : "tailwind.config.js",
        );
        await fs.writeFile(tailwindConfigPath, generateTailwindConfig(config));
        spinner.succeed("Tailwind config generated!");

        /**
         * STEP 5
         * Generate src/index.css with font, colors, and dark mode setup
         */
        spinner.start("Generating Tailwind styles...");
        const cssPath = path.join(projectPath, "src/index.css");
        await saveSnapshot(cssPath);
        await fs.writeFile(cssPath, generateIndexCss(config));
        spinner.succeed("Tailwind styles generated!");

        /**
         * STEP 6
         * Generate ThemeToggle component if user selected dark mode toggle
         */
        if (config.darkModeToggle) {
          spinner.start("Creating ThemeToggle component...");
          const componentDir = path.join(projectPath, "src/components");
          await fs.mkdir(componentDir, { recursive: true });
          const toggleFile = path.join(
            componentDir,
            isTypeScript ? "ThemeToggle.tsx" : "ThemeToggle.jsx",
          );
          await fs.writeFile(toggleFile, generateThemeToggle(isTypeScript));
          spinner.succeed("ThemeToggle component created!");
        }

        /**
         * STEP 7
         * Install Prettier + Tailwind class sorting plugin if selected
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
          await fs.writeFile(
            path.join(projectPath, ".prettierrc"),
            JSON.stringify(
              { plugins: ["prettier-plugin-tailwindcss"] },
              null,
              2,
            ),
          );
          spinner.succeed(".prettierrc created!");
        }

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
}
