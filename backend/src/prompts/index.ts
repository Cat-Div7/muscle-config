import * as p from "@clack/prompts";
import { ProjectConfig } from "../config/projectConfig.js";
import pc from "picocolors";

export async function askQuestions(): Promise<ProjectConfig> {
    const project = await p.group(
        {
            projectName: () =>
                p.text({
                    message: "What is your project name?",
                    placeholder: "backend",
                    validate: (value) => {
                        if (!value) return "Please enter a name";
                        if (value.includes(" "))
                            return "Name cannot contain spaces";
                    },
                }),

            stack: () =>
                p.select<any, string>({
                    message: "Pick your Stack",
                    options: [
                        {
                            value: "express-ts",
                            label: "Express.js + TypeScript",
                            hint: "Recommended",
                        },
                        {
                            value: "express-js",
                            label: "Express.js + JavaScript",
                            hint: "Simpler",
                        },
                    ],
                }),

            database: () =>
                p.select<any, string>({
                    message: "Which database do you want to use?",
                    options: [
                        {
                            value: "mongodb",
                            label: "MongoDB",
                            hint: "Mongoose ORM",
                        },
                        { value: "none", label: "None" },
                    ],
                }),

            auth: () =>
                p.select<any, string>({
                    message: "Select Authentication strategy",
                    options: [
                        { value: "jwt", label: "JWT" },
                        { value: "none", label: "None" },
                    ],
                }),
        },
        {
            onCancel: () => {
                p.cancel(pc.red("Operation cancelled."));
                process.exit(0);
            },
        },
    );

    const isTS = project.stack === "express-ts";

    return {
        ...project,
        framework: "express",
        language: isTS ? "ts" : "js",
        targetDir: `./${project.projectName}`,
        orm: project.database === "mongodb" ? "mongoose" : "none",
        architecture: "layered",
        usePrettier: true,
        useGit: true,
        extras: { swagger: true, validation: true, logger: true },
    } as ProjectConfig;
}
