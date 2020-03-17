const chalk = require('chalk');
const figlet = require('figlet');
const { Command } = require('commander');
const Listr = require('listr');
const createApp = require('./utils/createApp');

const log = (...args) => console.log(...args);
const logError = (...args) => console.error(...args);

function banner(text, color = 'yellow') {
  log(chalk[color](figlet.textSync(text, { horizontalLayout: 'full' })));
}

function makeProgram() {
  const program = new Command();

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

class NotImplementedError extends Error {
  constructor() {
    super('Not implemented');
    // Ensure the name of this error is the same as the class name
    this.name = this.constructor.name;
    // This clips the constructor invocation from the stack trace.
    // It's not absolutely essential, but it does make the stack trace a little nicer.
    //  @see Node.js reference
    Error.captureStackTrace(this, this.constructor);
  }
}

const rejectNotImplemented = () => Promise.reject(new NotImplementedError());

/* ritorna i task (per Listr) da eseguire */
function whatIdo({ appName, componentName, dir }) {
  let tasks = [];
  if (appName) {
    tasks.push({
      title: `creating project ${appName}`,
      task: () => new Listr(createApp(appName))
    });
  } else if (componentName) {
    tasks.push({
      title: `making component ${componentName}`,
      task: rejectNotImplemented
    });
  }
  return tasks;
}

module.exports = async function nguno(argv) {
  banner('nguno', 'yellow');

  let program = makeProgram();

  const args = program.parse(argv);
  const inputs = getInputs(args);
  log("INPUTS: ", inputs);

  let tasks = new Listr(whatIdo(inputs));
  try {
    await tasks.run();
  } catch (ex) {
    logError(chalk.red(ex));
    process.exit(1);
  }

  banner('DONE', 'green');

  process.exit(0);
};
