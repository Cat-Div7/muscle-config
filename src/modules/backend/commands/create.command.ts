import * as p from "@clack/prompts";
import pc from "picocolors";
import path from "path";
import { execa } from "execa"; 
import { askQuestions } from "../prompts/index.js";
import {
    generateExpressBase,
    generateServerFiles,
} from "../generators/express.generator.js";
import { generateDatabaseConfig } from "../generators/database.generator.js";
import { generateArchitecture } from "../generators/architecture.generator.js";

async function installDependencies(projectPath: string) {
    const s = p.spinner();
    s.start(pc.cyan("Installing dependencies (npm install)..."));
    try {
        await execa("npm", ["install"], {
            cwd: projectPath,
            stdio: "inherit", 
        });
        s.stop(pc.green("✅ Dependencies installed successfully!"));
    } catch (error) {
        s.stop(pc.yellow("⚠️ Failed to install dependencies automatically."));
        p.note(
            "You might need to run 'npm install' manually inside the project folder.",
        );
    }
}

export async function createCommand() {
    console.clear();
    p.intro(`${pc.bgCyan(pc.black(" MUSCLE CLI "))} ${pc.dim("v1.0.0")}`);

    const config = await askQuestions();
    const projectPath = path.resolve(process.cwd(), config.projectName);

    const s = p.spinner();
    s.start("Generating project files...");

    try {
        await generateExpressBase(config);
        await generateServerFiles(config);

        if (config.database === "mongodb") {
            await generateDatabaseConfig(config);
        }

        await generateArchitecture(config);

        s.stop(pc.green("✅ Files generated!"));

        await installDependencies(projectPath);

        const nextSteps = `
  ${pc.cyan("cd")} ${config.projectName}
  ${pc.cyan("npm run dev")}
        `;

        p.note(nextSteps, "Next steps:");
        p.outro(pc.magenta("Happy coding, Mustafa! 🚀"));
    } catch (error) {
        s.stop(pc.red("❌ Something went wrong."));
        console.error(error);
    }
}
