#!/usr/bin/env node

import { createCommand } from "./commands/create.command.js";

async function main() {
    try {
        await createCommand();
    } catch (error) {
        console.error("❌ Unexpected error:", error);
        process.exit(1);
    }
}

main();
