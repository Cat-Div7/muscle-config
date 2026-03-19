import fs from "fs/promises";
import path from "path";
import { fileURLToPath } from "url";
import { ProjectConfig } from "../config/projectConfig.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const TEMPLATES_DIR = path.resolve(__dirname, "../templates");

export async function generateDatabaseConfig(config: ProjectConfig) {
  if (config.database === "none") return;

  const projectPath = path.resolve(process.cwd(), config.projectName);
  const isTS = config.language === "ts";
  const ext = isTS ? "ts" : "js";
  const templateExt = isTS ? "ts" : "js";

  const dbCode = await fs.readFile(
    path.join(TEMPLATES_DIR, `db/mongo.${templateExt}`),
    "utf-8",
  );

  await fs.writeFile(path.join(projectPath, `src/config/db.${ext}`), dbCode);
}
