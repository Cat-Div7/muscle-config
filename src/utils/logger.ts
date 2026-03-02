import chalk from "chalk";

export const logger = {
  info: (msg: string) =>
    console.log(`${chalk.cyan("●")} ${chalk.cyan(msg)}`),

  success: (msg: string) =>
    console.log(`${chalk.green("✓")} ${chalk.green(msg)}`),

  warn: (msg: string) =>
    console.log(`${chalk.yellow("⚡")} ${chalk.yellow(msg)}`),

  error: (msg: string) =>
    console.log(`${chalk.red("✕")} ${chalk.red(msg)}`),

  debug: (msg: string) =>
    console.log(`${chalk.magenta("◆")} ${chalk.magenta(msg)}`),

  step: (msg: string) =>
    console.log(`${chalk.blue("›")} ${chalk.white(msg)}`),

  dim: (msg: string) =>
    console.log(chalk.dim(msg)),
};