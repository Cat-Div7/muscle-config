import inquirer from "inquirer";
import type { StylingChoice } from "../config/projectConfig.js";

export async function askStyling(): Promise<StylingChoice> {
  const { styling } = await inquirer.prompt([
    {
      type: "list",
      name: "styling",
      message: "Choose your styling solution:",
      choices: [
        { name: "Tailwind CSS v4", value: "tailwind" },
        { name: "MUI (Material UI)", value: "mui" },
        { name: "None (plain CSS)", value: "css" },
        { name: "Skip", value: "none" },
      ],
    },
  ]);

  return styling;
}
