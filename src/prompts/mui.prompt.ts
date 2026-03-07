import chalk from "chalk";
import inquirer from "inquirer";
import { MuiConfig } from "../config/projectConfig.js";

const colorChoices = [
  {
    name: chalk.bgHex("#1976d2").white("  blue   ") + "  Blue (MUI default)",
    value: "blue",
  },
  {
    name: chalk.bgHex("#9c27b0").white("  purple ") + "  Purple",
    value: "purple",
  },
  {
    name: chalk.bgHex("#2e7d32").white("  green  ") + "  Green",
    value: "green",
  },
  {
    name: chalk.bgHex("#e11d48").white("  custom ") + "  Custom HEX",
    value: "custom",
  },
];

export async function askMuiConfig(): Promise<MuiConfig> {
  const { themeMode } = await inquirer.prompt([
    {
      type: "list",
      name: "themeMode",
      message: "Default theme mode:",
      choices: [
        { name: "Light", value: "light" },
        { name: "Dark", value: "dark" },
        { name: "System preference", value: "system" },
      ],
    },
  ]);

  const { darkModeToggle } = await inquirer.prompt([
    {
      type: "confirm",
      name: "darkModeToggle",
      message:
        "Add dark mode toggle component? (recommended — required for demo)",
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
        default: "#1976d2",
      },
    ]);
    customColor = res.customColor;
  }

  const { icons } = await inquirer.prompt([
    {
      type: "confirm",
      name: "icons",
      message: "Add MUI Icons package? (@mui/icons-material)",
      default: true,
    },
  ]);

  let demo = false;
  if (darkModeToggle) {
    const { wantDemo } = await inquirer.prompt([
      {
        type: "confirm",
        name: "wantDemo",
        message: "Override App.jsx with a MUI demo template?",
        default: true,
      },
    ]);
    demo = wantDemo;
  }

  return {
    themeMode,
    darkModeToggle,
    colorPreset,
    customColor,
    icons,
    demo,
  };
}
