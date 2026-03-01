#!/usr/bin/env node
import { createProject } from "./commands/create.command.js";
import { welcome } from "./utils/welcome.js";

await welcome();
await createProject();