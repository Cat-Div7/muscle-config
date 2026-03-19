import fs from "fs/promises";
import path from "path";
import { fileURLToPath } from "url";
import { ProjectConfig } from "../config/projectConfig.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const TEMPLATES_DIR = path.resolve(__dirname, "../templates");

export async function generateArchitecture(config: ProjectConfig) {
  const projectPath = path.resolve(process.cwd(), config.projectName);
  const srcPath = path.join(projectPath, "src");
  const isTS = config.language === "ts";
  const ext = isTS ? "ts" : "js";
  const templateExt = isTS ? "ts" : "js";

  const [userController, userRoutes] = await Promise.all([
    fs.readFile(
      path.join(TEMPLATES_DIR, `framework/user.controller.${templateExt}`),
      "utf-8",
    ),
    fs.readFile(
      path.join(TEMPLATES_DIR, `framework/user.routes.${templateExt}`),
      "utf-8",
    ),
  ]);

  await fs.writeFile(
    path.join(srcPath, `controllers/user.controller.${ext}`),
    userController,
  );
  await fs.writeFile(
    path.join(srcPath, `routes/user.routes.${ext}`),
    userRoutes,
  );

  await updateAppWithRoutes(config, ext);
}

async function updateAppWithRoutes(config: ProjectConfig, ext: string) {
  const appPath = path.join(
    process.cwd(),
    config.projectName,
    `src/app.${ext}`,
  );

  try {
    await fs.access(appPath);
  } catch {
    return;
  }

  let appContent = await fs.readFile(appPath, "utf-8");

  const routeImport = "import userRoutes from './routes/user.routes.js';\n";
  const routeUsage = "\n// API Routes\napp.use('/api/users', userRoutes);\n";

  if (!appContent.includes(routeImport)) {
    appContent = routeImport + appContent;
  }

  if (!appContent.includes("app.use('/api/users'")) {
    appContent = appContent.replace(
      "// Middlewares",
      routeUsage + "// Middlewares",
    );
  }

  await fs.writeFile(appPath, appContent);
}
