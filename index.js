const { Command } = require('commander');
const Listr = require('listr');
const { logErr, banner, logSuccess } = require('./utils/logger');
const createApp = require('./utils/createApp');
const createComponent = require('./utils/createComponent');

function makeProgram() {
  const program = new Command();

  program.version('1.0.0').name('nguno')
    .option('-a, --app <appName>', 'create application', null)
    .option('-c, --component <componentName>', 'create component', null)
    .option('-d, --directive <directiveName>', '[NOT IMPLEMENTED] create directive', null)
    .option('-p, --path <dir>', '[NOT IMPLEMENTED] (optional) directory where create component, directive, services and similar', null);

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

function whatShouldIdo({ appName, componentName, dir }) {
  let tasks = [];
  if (appName) {
    tasks.push({
      title: `creating project ${appName}`,
      task: () => new Listr(createApp(appName))
    });
  } else if (componentName) {
    tasks.push({
      title: `creating component ${componentName} under dir ${dir}`,
      task: () => new Listr(createComponent(componentName))
    });
  }
  return tasks;
}

module.exports = async function nguno(argv) {
  banner('nguno', 'yellow');

  let program = makeProgram();

  const args = program.parse(argv);
  const inputs = getInputs(args);

  let tasks = new Listr(whatShouldIdo(inputs));
  try {
    await tasks.run();
  } catch (ex) {
    logErr(ex.message);
    process.exit(1);
  }

  logSuccess('DONE');

  process.exit(0);
};
