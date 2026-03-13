import { execa } from "execa";

export async function installPackages(
  packages: string[],
  projectPath: string,
  dev: boolean = false,
): Promise<void> {
  const flag = dev ? ["--save-dev"] : [];
  await execa("npm", ["install", ...flag, ...packages], {
    cwd: projectPath,
  });
}