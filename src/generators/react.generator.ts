import { execa } from "execa";
import type { ProjectConfig } from "../config/projectConfig.js";

export async function generateReactProject(config: ProjectConfig) {
  const template =
    config.framework === "react-ts" ? "react-ts" : "react";

  await execa(
    "npm",
    [
      "create",
      "vite@latest",
      config.projectName,
      "--",
      "--template",
      template,
    ],
    { stdio: "inherit" }
  );
}