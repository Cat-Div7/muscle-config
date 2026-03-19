import inquirer from "inquirer";
import type { ProjectConfig } from "../config/projectConfig.js";
import { askProjectName } from "../../../commands/projectName.prompt.js";

export async function askQuestions(): Promise<ProjectConfig> {
  const projectName = await askProjectName();

  const answers = await inquirer.prompt([
    {
      type: "list",
      name: "stack",
      message: "Choose your stack:",
      choices: [
        { name: "Express.js + TypeScript  (recommended)", value: "express-ts" },
        { name: "Express.js + JavaScript", value: "express-js" },
      ],
    },
    {
      type: "list",
      name: "database",
      message: "Choose a database:",
      choices: [
        { name: "MongoDB  (Mongoose)", value: "mongodb" },
        { name: "None", value: "none" },
      ],
    },
    {
      type: "list",
      name: "auth",
      message: "Authentication strategy:",
      choices: [
        { name: "JWT", value: "jwt" },
        { name: "None", value: "none" },
      ],
    },
  ]);

  const isTS = answers.stack === "express-ts";

  return {
    projectName,
    targetDir: `./${projectName}`,
    framework: "express",
    language: isTS ? "ts" : "js",
    database: answers.database,
    orm: answers.database === "mongodb" ? "mongoose" : "none",
    auth: answers.auth,
    architecture: "layered",
    usePrettier: true,
    useGit: true,
    extras: { swagger: true, validation: true, logger: true },
  };
}