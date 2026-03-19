#!/usr/bin/env node
import inquirer from "inquirer";
import { welcome } from "./core/welcome.js";
import { createProject } from "./modules/frontend/commands/create.command.js";
import { createBackendProject } from "./modules/backend/commands/create.command.js";

const main = async () => {
  await welcome();

  const { projectType } = await inquirer.prompt([
    {
      type: "list",
      name: "projectType",
      message: "What project would you like to start?",
      choices: [
        { name: "Frontend", value: "frontend" },
        { name: "Backend", value: "backend" },
      ],
    },
  ]);

  if (projectType === "frontend") await createProject();
  if (projectType === "backend") await createBackendProject();
};

main().catch((err) => {
  console.error(err);
  process.exit(1);
});