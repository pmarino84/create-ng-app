const { Command } = require('commander');
const Listr = require('listr');
const { logErr, logInfo, banner, logSuccess } = require('./utils/logger');
const createApp = require('./ngapp/createApp');
const createComponent = require('./ngcomponent/createComponent');
const createModule = require('./ngmodule/createModule');
const createService = require('./ngservice/createService');
const { rejectNotImplemented } = require('./utils/notImplementedError');

const HELP_OPTIONS = ['-h', '--help'];

const showHelpForGivenCommand = command => HELP_OPTIONS.includes(command);

function makeProgram() {
  const program = new Command();

  program.version('1.0.0').name('nguno')
    .option('-a, --app <appName>', 'create application', null)
    .option('-c, --component <componentName>', 'create component', null)
    .option('-d, --directive <directiveName>', '[NOT IMPLEMENTED] create directive', null)
    .option('-m, --module <moduleName>', 'create module', null)
    .option('-s, --service <serviceName>', '[NOT IMPLEMENTED] create service', null);

  return program;
}

function getInputs({ app, component, directive, module, service }) {
  return {
    appName: app,
    componentName: component,
    directiveName: directive,
    moduleName: module,
    serviceName: service
  };
}

function whatShouldIdo({ appName, componentName, directiveName, moduleName, serviceName }) {
  let tasks = [];
  if (appName && !showHelpForGivenCommand(appName)) {
    tasks.push({
      title: `creating project ${appName}`,
      task: () => new Listr(createApp(appName))
    });
  } else if (componentName && !showHelpForGivenCommand(componentName)) {
    tasks.push({
      title: `creating component ${componentName}`,
      task: () => new Listr(createComponent(componentName))
    });
  } else if (moduleName && !showHelpForGivenCommand(moduleName)) {
    tasks.push({
      title: `creating module ${moduleName}`,
      task: () => new Listr(createModule(moduleName))
    });
  } else if (serviceName) {
    tasks.push({
      title: `creating service ${serviceName}`,
      task: () => new Listr(createService(serviceName))
    });
  } else if (directiveName) {
    tasks.push({
      title: 'task not implemented',
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
  logInfo('INPUTS: ', inputs);

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
