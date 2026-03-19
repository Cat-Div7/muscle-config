import fs from "fs-extra";
import path from "path";
import { ProjectConfig } from "../config/projectConfig.js";

export async function generateArchitecture(config: ProjectConfig) {
    const projectPath = path.resolve(process.cwd(), config.projectName);
    const srcPath = path.join(projectPath, "src");
    const isTS = config.language === "ts";
    const ext = isTS ? "ts" : "js";

    const userController = isTS
        ? `import { Request, Response } from 'express';\n\nexport const getUsers = async (req: Request, res: Response) => {\n  res.json({ status: 'success', data: [{ id: 1, name: 'Muscle User' }] });\n};`
        : `export const getUsers = async (req, res) => {\n  res.json({ status: 'success', data: [{ id: 1, name: 'Muscle User' }] });\n};`;

    const userRoutes =
        `import { Router } from 'express';\nimport * as userController from '../controllers/user.controller.js';\n\nconst router = Router();\nrouter.get('/', userController.getUsers);\n\nexport default router;`.trim();

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

    if (!(await fs.pathExists(appPath))) return; 

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
