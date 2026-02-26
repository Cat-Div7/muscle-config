import figlet from "figlet";
import chalk from "chalk";
import { createRequire } from "module";
const require = createRequire(import.meta.url);
const { version } = require("../../package.json");

export const sleep = (ms = 2000) => new Promise((r) => setTimeout(r, ms));

function terminalLink(text, url) {
  return `\u001B]8;;${url}\u0007${text}\u001B]8;;\u0007`;
}

export async function welcome() {
  await sleep();

  const data = await new Promise((resolve, reject) => {
    figlet.text("MUSCLE CONFIG", { font: "Small" }, (err, result) => {
      if (err) reject(err);
      else resolve(result);
    });
  });

  console.clear();
  console.log("\n");
  console.log(chalk.cyan(data));

  const width = 62;
  const divider = chalk.cyan("─".repeat(width));
  const githubLink = terminalLink("Omar Ashraf", "https://github.com/Cat-Div7");

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
}
