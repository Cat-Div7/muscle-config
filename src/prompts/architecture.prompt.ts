import inquirer from "inquirer";
import type { ArchitectureConfig, FolderChoice } from "../config/projectConfig.js";

const allFolderChoices = [
  { name: "components", value: "components" },
  { name: "hooks", value: "hooks" },
  { name: "pages", value: "pages" },
  { name: "layouts", value: "layouts" },
  { name: "services", value: "services" },
  { name: "utils", value: "utils" },
  { name: "types", value: "types" },
  { name: "assets", value: "assets" },
  { name: "api", value: "api" },
  { name: "validators", value: "validators" },
  { name: "templates", value: "templates" },
];

const featurePresets = [
  { name: "auth", value: "auth" },
  { name: "dashboard", value: "dashboard" },
  { name: "profile", value: "profile" },
  { name: "settings", value: "settings" },
  { name: "home", value: "home" },
  { name: "products", value: "products" },
  { name: "cart", value: "cart" },
  { name: "checkout", value: "checkout" },
];

export async function askArchitecture(): Promise<ArchitectureConfig> {
  const { style } = await inquirer.prompt([
    {
      type: "list",
      name: "style",
      message: "Choose architecture style:",
      choices: [
        { name: "Feature-based  (recommended for large apps)", value: "feature-based" },
        { name: "Layered        (recommended for small/mid apps)", value: "layered" },
        { name: "Skip", value: "skip" },
      ],
    },
  ]);

  if (style === "skip") {
    return {
      style,
      features: [],
      featureFolders: [],
      sharedFolders: [],
      indexFiles: [],
    };
  }

  if (style === "feature-based") {
    const { features } = await inquirer.prompt([
      {
        type: "checkbox",
        name: "features",
        message: "Select features to generate:",
        choices: featurePresets,
      },
    ]);

    const { featureFolders } = await inquirer.prompt([
      {
        type: "checkbox",
        name: "featureFolders",
        message: "Select folders to generate inside each feature:",
        choices: [
          { name: "components", value: "components", checked: true },
          { name: "hooks", value: "hooks", checked: true },
          { name: "services", value: "services", checked: true },
          { name: "utils", value: "utils" },
          { name: "types", value: "types" },
          { name: "validators", value: "validators" },
          { name: "api", value: "api" },
        ],
      },
    ]);

    const { sharedFolders } = await inquirer.prompt([
      {
        type: "checkbox",
        name: "sharedFolders",
        message: "Select shared folders to generate in src/:",
        choices: allFolderChoices.map((f) => ({
          ...f,
          checked: ["components", "hooks", "layouts", "pages"].includes(f.value),
        })),
      },
    ]);

    const allSelected = [
      ...new Set([...featureFolders, ...sharedFolders]),
    ] as FolderChoice[];

    const { indexFiles } = await inquirer.prompt([
      {
        type: "checkbox",
        name: "indexFiles",
        message: "Select folders to add an index file to:",
        choices: allSelected.map((f) => ({ name: f, value: f })),
      },
    ]);

    return {
      style,
      features,
      featureFolders,
      sharedFolders,
      indexFiles,
    };
  }

  // Layered
  const { sharedFolders } = await inquirer.prompt([
    {
      type: "checkbox",
      name: "sharedFolders",
      message: "Select folders to generate in src/:",
      choices: allFolderChoices.map((f) => ({
        ...f,
        checked: ["components", "hooks", "pages", "layouts"].includes(f.value),
      })),
    },
  ]);

  const { indexFiles } = await inquirer.prompt([
    {
      type: "checkbox",
      name: "indexFiles",
      message: "Select folders to add an index file to:",
      choices: sharedFolders.map((f: FolderChoice) => ({ name: f, value: f })),
    },
  ]);

  return {
    style,
    features: [],
    featureFolders: [],
    sharedFolders,
    indexFiles,
  };
}

