const chalk = require('chalk');
const figlet = require('figlet');

const log = console.log;

const info = chalk.cyan;

const err = chalk.bold.red;

const warn = chalk.keyword('orange');

const success = chalk.green;

function banner(text) {
  log(chalk.blue.yellow(figlet.textSync(text, { horizontalLayout: 'full' })));
}

const logInfo = (msg, ...options) => log(info(msg), ...options);

const logErr = (msg, ...options) => log(err(msg), ...options);

const logWarn = (msg, ...options) => log(warn(msg), ...options);

const logSuccess = (msg, ...options) => log(success(msg), ...options);

module.exports = {
  info,
  err,
  warn,
  success,
  banner,
  logInfo,
  logErr,
  logWarn,
  logSuccess
};
