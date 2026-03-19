import path from "path";
import { askQuestions } from "../prompts/index.js";
import {
  generateExpressBase,
  generateServerFiles,
} from "../generators/express.generator.js";
import { generateDatabaseConfig } from "../generators/database.generator.js";
import { generateArchitecture } from "../generators/architecture.generator.js";
import { spinner } from "../../../core/spinner.js";
import { logger } from "../../../core/logger.js";
import { installPackages } from "../../../core/install.js";

export async function createBackendProject() {
  const config = await askQuestions();
  const projectPath = path.resolve(process.cwd(), config.projectName);

  try {
    spinner.start("Generating project files...");
    await generateExpressBase(config);
    await generateServerFiles(config);
    spinner.succeed("Project files generated!");

    if (config.database === "mongodb") {
      spinner.start("Setting up database config...");
      await generateDatabaseConfig(config);
      spinner.succeed("Database config ready!");
    }

    spinner.start("Generating architecture...");
    await generateArchitecture(config);
    spinner.succeed("Architecture generated!");

    spinner.start("Installing dependencies — do not cancel this step...");
    await installPackages(
      ["express", "dotenv", "cors", "helmet", "morgan"],
      projectPath,
    );
    spinner.succeed("Dependencies installed!");

    console.log("");
    logger.success("Backend project created successfully!");
    logger.dim("  Get started:");
    logger.dim(`  cd ${config.projectName} && npm run dev`);
    console.log("\n");
  } catch (error) {
    spinner.fail("Something went wrong.");
    logger.error("Project creation failed.");
    // console.log(error) // Debugging
    process.exit(1);
  }
}
