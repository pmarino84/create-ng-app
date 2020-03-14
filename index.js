const chalk = require('chalk');
const figlet = require('figlet');
const { Command } = require('commander');
const createApp = require('./utils/createApp');

const log = (...args) => console.log(...args);
const logError = (...args) => console.error(...args);

function banner(text, color = 'yellow') {
  log(chalk[color](figlet.textSync(text, { horizontalLayout: 'full' })));
}

function makeProgram() {
  const program = new Command('create-ng-app');

  program.version('1.0.0').name('nguno')
    .option('-a, --app <appName>', 'create application', null)
    .option('-c, --component <componentName>', 'create component', null)
    .option('-p, --path <dir>', '(optional) directory where create component, directive, services and similar', null);

  return program;
}

function getInputs({ app, component, path }) {
  return {
    appName: app,
    componentName: component,
    dir: path
  };
}

module.exports = async function nguno(argv) {
  banner('nguno', 'yellow');

  let program = makeProgram();

  const args = program.parse(argv);
  const inputs = getInputs(args);
  log("INPUTS: ", inputs);

  try {
    const { appName } = inputs;
    if (appName) await createApp(appName);
  } catch (ex) {
    logError(chalk.red(ex));
    process.exit(1);
  }

  process.exit(0);
};