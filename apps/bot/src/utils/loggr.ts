import chalk from 'chalk';

const getTimestamp = () => {
  const now = new Date();
  const day = now.getDate().toString().padStart(2, '0');
  const month = (now.getMonth() + 1).toString().padStart(2, '0');
  const hours = now.getHours().toString().padStart(2, '0');
  const min = now.getMinutes().toString().padStart(2, '0');
  const sec = now.getSeconds().toString().padStart(2, '0');
  return ` ${day}/${month} ${hours}:${min}:${sec} `;
};

const log = (str: string) => {
  console.log(`${chalk.bgWhite.black(getTimestamp())}${str}`);
};

const debug = (str: string) => {
  log(`${chalk.bgMagenta.black('  debug  ')} ${str}`);
};

const error = (str: string) => {
  log(`${chalk.bgRed.black('  error  ')} ${chalk.red(str)}`);
};

const warn = (str: string) => {
  log(`${chalk.bgYellow.black('  warn   ')} ${chalk.yellow(str)}`);
};

const info = (str: string) => {
  log(`${chalk.bgGreen.black('  info   ')} ${str}`);
};

const init = (str: string) => {
  log(`${chalk.bgBlue.black('  init   ')} ${str}`);
};

export const loggr = {
  debug,
  error,
  info,
  init,
  warn,
};
