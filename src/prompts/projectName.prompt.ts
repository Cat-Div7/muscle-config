import inquirer from "inquirer";

export async function askProjectName(): Promise<string> {
  const { projectName } = await inquirer.prompt([
    {
      type: "input",
      name: "projectName",
      message: "Project name:",
      default: "my-app",
      validate: (input: string) =>
        input ? true : "Project name cannot be empty",
    },
  ]);

  return projectName;
}