import ora from "ora";

let spinnerInstance: ora.Ora | null = null;

export const spinner = {
  start: (text: string) => {
    spinnerInstance = ora(text).start();
  },
  succeed: (text?: string) => {
    spinnerInstance?.succeed(text);
  },
  fail: (text?: string) => {
    spinnerInstance?.fail(text);
  },
};