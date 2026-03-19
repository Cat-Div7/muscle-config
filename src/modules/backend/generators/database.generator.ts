import fs from "fs/promises";
import path from "path";
import { ProjectConfig } from "../config/projectConfig.js";

export async function generateDatabaseConfig(config: ProjectConfig) {
  if (config.database === "none") return;

  const projectPath = path.resolve(process.cwd(), config.projectName);
  const isTS = config.language === "ts";
  const ext = isTS ? "ts" : "js";

  const dbCode = `
import mongoose from 'mongoose';

export const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI || '');
    console.log(\`MongoDB Connected: \${conn.connection.host}\`);
  } catch (error) {
    console.error('MongoDB Connection Error:', error);
    process.exit(1);
  }
};
`.trim();

  await fs.writeFile(path.join(projectPath, `src/config/db.${ext}`), dbCode);
}