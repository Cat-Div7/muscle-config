import inquirer from "inquirer";
import chalk from "chalk";
import type { CssConfig } from "../config/projectConfig.js";

const colorChoices = [
  {
    name: chalk.bgHex("#6366f1").white("  indigo  ") + "  Indigo",
    value: "indigo",
  },
  {
    name: chalk.bgHex("#10b981").black("  emerald ") + "  Emerald",
    value: "emerald",
  },
  {
    name: chalk.bgHex("#737373").white("  neutral ") + "  Neutral",
    value: "neutral",
  },
  {
    name: chalk.bgHex("#e11d48").white("  custom  ") + "  Custom HEX",
    value: "custom",
  },
  { name: "  Skip", value: "none" },
];

const fontChoices = [
  { name: "Inter   — clean, modern, readable", value: "inter" },
  { name: "Poppins — rounded, great for dashboards", value: "poppins" },
  { name: "Cairo   — elegant, great for bilingual apps", value: "cairo" },
  { name: "Skip", value: "none" },
];

// Beginner Mode
async function askBeginner(): Promise<Partial<CssConfig>> {
  const { reset } = await inquirer.prompt([
    {
      type: "confirm",
      name: "reset",
      message: "Modern CSS reset (box-sizing, margin 0, etc.)?",
      default: true,
    },
  ]);

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

  const { wantDarkMode } = await inquirer.prompt([
    {
      type: "confirm",
      name: "wantDarkMode",
      message: "Enable dark mode?",
      default: true,
    },
  ]);

  return {
    reset,
    colorPreset,
    customColor,
    darkMode: wantDarkMode ? "media" : false,
    darkModeToggle: false,
    font: "none",
    separateFiles: false,
  };
}

// Advanced Mode

async function askAdvanced(): Promise<Partial<CssConfig>> {
  const { reset } = await inquirer.prompt([
    {
      type: "confirm",
      name: "reset",
      message: "Add a CSS reset?",
      default: true,
    },
  ]);

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

  const { wantDarkMode } = await inquirer.prompt([
    {
      type: "confirm",
      name: "wantDarkMode",
      message: "Enable dark mode?",
      default: true,
    },
  ]);

  let darkMode: CssConfig["darkMode"] = false;
  let darkModeToggle = false;

  if (wantDarkMode) {
    const { strategy } = await inquirer.prompt([
      {
        type: "list",
        name: "strategy",
        message: "Dark mode strategy:",
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

  const { font } = await inquirer.prompt([
    {
      type: "list",
      name: "font",
      message: "Choose a default font:",
      choices: fontChoices,
    },
  ]);

  const { separateFiles } = await inquirer.prompt([
    {
      type: "confirm",
      name: "separateFiles",
      message: "Generate separate CSS files? (variables, reset, typography)",
      default: false,
    },
  ]);

  return {
    reset,
    colorPreset,
    customColor,
    darkMode,
    darkModeToggle,
    font,
    separateFiles,
  };
}

// Css Configuration
export async function askCssConfig(): Promise<CssConfig> {
  const { mode } = await inquirer.prompt([
    {
      type: "list",
      name: "mode",
      message: "CSS configuration mode?",
      choices: [
        { name: "Beginner  (recommended)", value: "beginner" },
        { name: "Advanced  (full control)", value: "advanced" },
        { name: "Skip  (use Vite default)", value: "skip" },
      ],
    },
  ]);

  if (mode === "skip") {
    return {
      mode,
      reset: false,
      colorPreset: "none",
      darkMode: false,
      darkModeToggle: false,
      font: "none",
      separateFiles: false,
    };
  }

  const answers = mode === "beginner" ? await askBeginner() : await askAdvanced();

  return {
    mode,
    reset: false,
    colorPreset: "none",
    darkMode: false,
    darkModeToggle: false,
    font: "none",
    separateFiles: false,
    ...answers,
  };
}