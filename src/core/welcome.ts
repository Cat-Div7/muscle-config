import figlet from "figlet";
import chalk from "chalk";
import { createRequire } from "module";
const require = createRequire(import.meta.url);
const { version }: { version: string } = require("../../package.json");

export const sleep = (ms: number = 1000): Promise<void> =>
  new Promise((r) => setTimeout(r, ms));

function terminalLink(text: string, url: string): string {
  return `\u001B]8;;${url}\u0007${text}\u001B]8;;\u0007`;
}

export async function welcome(): Promise<void> {
  // await sleep();

  const [muscle, config] = await Promise.all([
    new Promise<string>((resolve, reject) => {
      figlet.text("MUSCLE", { font: "ANSI Shadow" }, (err, result) => {
        if (err) reject(err);
        else resolve(chalk.bold.cyan(result || ""));
      });
    }),
    new Promise<string>((resolve, reject) => {
      figlet.text("CONFIG", { font: "ANSI Shadow" }, (err, result) => {
        if (err) reject(err);
        else resolve(chalk.bold.cyan(result || ""));
      });
    }),
  ]);

  const data = `${muscle}\n${config}`;

  console.clear();
  console.log("\n");
  console.log(chalk.cyan(data));

  const width: number = 62;
  const divider: string = chalk.cyan("─".repeat(width));
  const githubLink: string = terminalLink(
    "Omar Ashraf",
    "https://github.com/Cat-Div7",
  );

  console.log(divider);
  console.log(chalk.bold.white("  MC — MUSCLE CONFIG"));
  console.log(chalk.gray("  Frontend scaffolding done right, every time"));
  console.log(
    chalk.dim(`  v${version}`) +
      chalk.dim("                        by ") +
      chalk.cyan(githubLink),
  );
  console.log(divider);
  console.log("\n");

  console.log(chalk.red('The Only Available Frontend Framework for now is [ React ]!!\n'))
}
