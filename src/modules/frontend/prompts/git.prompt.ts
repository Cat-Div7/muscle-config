import inquirer from "inquirer";
import type { GitConfig } from "../../../config/projectConfig.js";

export async function askGitConfig(): Promise<GitConfig> {
  const { init } = await inquirer.prompt([
    {
      type: "confirm",
      name: "init",
      message: "Initialize a Git repository?",
      default: true,
    },
  ]);

  if (!init) {
    return { init: false, initialCommit: false };
  }

  const { initialCommit } = await inquirer.prompt([
    {
      type: "confirm",
      name: "initialCommit",
      message: "Create an initial commit?",
      default: true,
    },
  ]);

  return { init, initialCommit };
}
