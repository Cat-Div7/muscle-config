import { execa } from "execa";
import fs from "fs/promises";
import path from "path";
import { fileURLToPath } from "url";
import { spinner } from "../utils/spinner.js";
import { logger } from "../utils/logger.js";
import type { Feature } from "./feature.interface.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export const tailwindFeature: Feature = {
  name: "tailwind",

  async run(projectPath: string) {
    try {
      // Install Tailwind v4 dependencies
      spinner.start("Installing Tailwind v4...");
      await execa("npm", ["install", "tailwindcss", "@tailwindcss/vite"], {
        cwd: projectPath,
      });
      spinner.succeed("Tailwind installed!");

      // Detect vite config extension
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

      // Copy vite config from template
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

      // Copy index.css from template
      spinner.start("Injecting Tailwind styles...");
      const cssTemplatePath = path.join(templateDir, "index.css");
      const cssPath = path.join(projectPath, "src/index.css");
      await fs.copyFile(cssTemplatePath, cssPath);
      spinner.succeed("Styles injected!");

      logger.success("Tailwind v4 added successfully!");
    } catch (error) {
      spinner.fail("Failed to setup Tailwind.");
      throw error;
    }
  },
};
