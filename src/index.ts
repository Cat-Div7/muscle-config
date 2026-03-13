#!/usr/bin/env node
import { createProject } from "./commands/create.command.js";
import { welcome } from "./utils/welcome.js";

const main = async () => {
  await welcome();
  await createProject();
};

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
