import inquirer from "inquirer";
import type { PrettierConfig } from "../config/projectConfig.js";

export async function askPrettierConfig(): Promise<PrettierConfig> {
  const { enabled } = await inquirer.prompt([
    {
      type: "confirm",
      name: "enabled",
      message: "Add Prettier?",
      default: true,
    },
  ]);

  if (!enabled) {
    return { enabled: false, singleQuote: true, semi: true, tabWidth: 2 };
  }

  const { singleQuote } = await inquirer.prompt([
    {
      type: "confirm",
      name: "singleQuote",
      message: "Use single quotes?",
      default: true,
    },
  ]);

  const { semi } = await inquirer.prompt([
    {
      type: "confirm",
      name: "semi",
      message: "Use semicolons?",
      default: true,
    },
  ]);

  const { tabWidth } = await inquirer.prompt([
    {
      type: "list",
      name: "tabWidth",
      message: "Tab width:",
      choices: [
        { name: "2 spaces  (recommended)", value: 2 },
        { name: "4 spaces", value: 4 },
      ],
    },
  ]);

  return { enabled, singleQuote, semi, tabWidth };
}
