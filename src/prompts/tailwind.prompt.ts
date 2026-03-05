import inquirer from "inquirer";
import type { TailwindConfig } from "../config/projectConfig.js";

export async function askTailwindConfig(): Promise<TailwindConfig> {
  const { wantDarkMode } = await inquirer.prompt([
    {
      type: "confirm",
      name: "wantDarkMode",
      message: "Enable Dark Mode?",
      default: true,
    },
  ]);

  let darkMode: TailwindConfig["darkMode"] = false;
  let darkModeToggle = false;

  if (wantDarkMode) {
    const { strategy } = await inquirer.prompt([
      {
        type: "list",
        name: "strategy",
        message: "Dark mode strategy:",
        choices: [
          { name: "Manual toggle (class) — Recommended", value: "class" },
          { name: "System preference (media)", value: "media" },
        ],
        default: "class",
      },
    ]);

    darkMode = strategy;

    if (strategy === "class") {
      const { toggle } = await inquirer.prompt([
        {
          type: "confirm",
          name: "toggle",
          message: "Add Theme Toggle component?",
          default: true,
        },
      ]);

      darkModeToggle = toggle;
    }
  }

  const { colorPreset } = await inquirer.prompt([
    {
      type: "list",
      name: "colorPreset",
      message: "Choose color preset:",
      choices: [
        { name: "Indigo", value: "indigo" },
        { name: "Emerald", value: "emerald" },
        { name: "Neutral", value: "neutral" },
        { name: "Custom", value: "custom" },
        { name: "Skip", value: "none" },
      ],
    },
  ]);

  let customColor;

  if (colorPreset === "custom") {
    const res = await inquirer.prompt([
      {
        type: "input",
        name: "customColor",
        message: "Enter HEX color:",
        default: "#6366f1",
      },
    ]);

    customColor = res.customColor;
  }

  const { font } = await inquirer.prompt([
    {
      type: "list",
      name: "font",
      message: "Choose default font:",
      choices: [
        { name: "Inter", value: "inter" },
        { name: "Poppins", value: "poppins" },
        { name: "Cairo", value: "cairo" },
        { name: "Skip", value: "none" },
      ],
    },
  ]);

  // const { plugins } = await inquirer.prompt([
  //   {
  //     type: "checkbox",
  //     name: "plugins",
  //     message: "Select Tailwind plugins:",
  //     choices: [
  //       "@tailwindcss/forms",
  //       "@tailwindcss/typography",
  //     ],
  //   },
  // ]);

  return {
    darkMode,
    darkModeToggle,
    colorPreset,
    customColor,
    font,
    // plugins,
  };
}
