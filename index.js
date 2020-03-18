const { Command } = require('commander');
const Listr = require('listr');
const { logErr, logInfo, banner, logSuccess } = require('./utils/logger');
const createApp = require('./utils/createApp');
const createComponent = require('./utils/createComponent');
const createModule = require('./utils/createModule');
const { rejectNotImplemented } = require('./utils/notImplementedError');

function makeProgram() {
  const program = new Command();

  program.version('1.0.0').name('nguno')
    .option('-a, --app <appName>', 'create application', null)
    .option('-c, --component <componentName>', 'create component', null)
    .option('-d, --directive <directiveName>', '[NOT IMPLEMENTED] create directive', null)
    .option('-m, --module <moduleName>', 'create module', null)
    .option('-s, --service <serviceName>', '[NOT IMPLEMENTED] create service', null)
    .option('-p, --path <dir>', '[NOT IMPLEMENTED] (optional) directory where create component, directive, services and similar', null);

  return program;
}

function getInputs({ app, component, directive, module, service, path }) {
  return {
    appName: app,
    componentName: component,
    directiveName: directive,
    moduleName: module,
    serviceName: service,
    dir: path
  };
}


function whatShouldIdo({ appName, componentName, directiveName, moduleName, serviceName, dir }) {
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
  } else if (moduleName) {
    tasks.push({
      title: `creating component ${moduleName} under dir ${dir}`,
      task: () => new Listr(createModule(moduleName))
    });
  } else if (directiveName || serviceName) {
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
