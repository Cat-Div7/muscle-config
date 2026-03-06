import inquirer from "inquirer";
import chalk from "chalk";
import type { TailwindConfig } from "../config/projectConfig.js";

const colorChoices = [
  { name: chalk.bgHex("#6366f1").white("  indigo  ") + "  Indigo", value: "indigo" },
  { name: chalk.bgHex("#10b981").black("  emerald ") + "  Emerald", value: "emerald" },
  { name: chalk.bgHex("#737373").white("  neutral ") + "  Neutral", value: "neutral" },
  { name: chalk.bgHex("#e11d48").white("  custom  ") + "  Custom HEX", value: "custom" },
  { name: "  Skip", value: "none" },
];

// Beginner mode asks only essential questions with simplified options
async function askBeginner(): Promise<Partial<TailwindConfig>> {
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
    darkMode = "class";
    darkModeToggle = true;
  }

  const { colorPreset } = await inquirer.prompt([
    {
      type: "list",
      name: "colorPreset",
      message: "Choose a primary color:",
      choices: colorChoices,
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

  return {
    darkMode,
    darkModeToggle,
    colorPreset,
    customColor,
    font: "none",
  };
}
// Advanced mode provides more granular control over Tailwind configuration
async function askAdvanced(): Promise<Partial<TailwindConfig>> {
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
        message: "Dark Mode strategy:",
        choices: [
          { name: "Manual toggle (class)  (recommended)", value: "class" },
          { name: "System preference (media)", value: "media" },
        ],
      },
    ]);

    darkMode = strategy;

    if (strategy === "class") {
      const { toggle } = await inquirer.prompt([
        {
          type: "confirm",
          name: "toggle",
          message: "Add ThemeToggle component?",
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
      message: "Choose a primary color:",
      choices: colorChoices,
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

  return {
    darkMode,
    darkModeToggle,
    colorPreset,
    customColor,
    font,
  };
}

export async function askTailwindConfig(): Promise<TailwindConfig> {
  const { mode } = await inquirer.prompt([
    {
      type: "list",
      name: "mode",
      message: "Tailwind configuration mode?",
      choices: [
        { name: "Beginner  (recommended)", value: "beginner" },
        { name: "Advanced  (full control)", value: "advanced" },
      ],
    },
  ]);

  const answers = mode === "beginner" ? await askBeginner() : await askAdvanced();

  return {
    mode,
    darkMode: false,
    darkModeToggle: false,
    colorPreset: "none",
    font: "none",
    ...answers,
  };
}
