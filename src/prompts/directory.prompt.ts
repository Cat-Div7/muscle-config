import inquirer from "inquirer";

export async function askDirectoryMode(): Promise<"new" | "current"> {
  const { directoryMode } = await inquirer.prompt([
    {
      type: "list",
      name: "directoryMode",
      message: "Where would you like to create the project?",
      choices: [
        { name: "Create in a new folder", value: "new" },
        { name: "Use current directory", value: "current" },
      ],
      default: "new",
    },
  ]);

  return directoryMode;
}