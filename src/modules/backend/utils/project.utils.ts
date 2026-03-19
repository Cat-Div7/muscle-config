import { execa } from "execa"; 
import fs from "fs-extra";
import * as p from "@clack/prompts";


export async function installDependencies(projectDir: string) {
    try {
        
        await execa("npm", ["install"], {
            cwd: projectDir,
            stdio: "ignore", 
        });
        return true;
    } catch (error) {
        return false;
    }
}

export async function rollback(projectDir: string) {
    if (fs.existsSync(projectDir)) {
        await fs.remove(projectDir);
    }
}
