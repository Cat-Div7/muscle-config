import inquirer from "inquirer";
import type { StylingChoice } from "../config/projectConfig.js";

export async function askStyling(): Promise<StylingChoice> {
  const { styling } = await inquirer.prompt([
    {
      type: "confirm",
      name: "styling",
      message: "Add Tailwind CSS v4?",
      default: true,
    },
  ]);

  return styling ? "tailwind" : "none";
}
