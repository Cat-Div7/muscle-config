import inquirer from "inquirer";
import type { FrameworkChoice } from "../config/projectConfig.js";

export async function askFramework(): Promise<FrameworkChoice> {
  const { framework } = await inquirer.prompt([
    {
      type: "list",
      name: "framework",
      message: "Choose your React setup:",
      choices: [
        { name: "React + TypeScript", value: "react-ts" },
        { name: "React + JavaScript", value: "react-js" },
      ],
    },
  ]);

  return framework;
}
