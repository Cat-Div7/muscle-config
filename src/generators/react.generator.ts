import type { ProjectConfig } from "../config/projectConfig.js";

export async function generateReactProject(config: ProjectConfig) {
  console.log("Generating project with:", config);

  if (config.framework === "react-ts") {
    console.log("→ Setup React + TypeScript");
  } else {
    console.log("→ Setup React + JavaScript");
  }
}
