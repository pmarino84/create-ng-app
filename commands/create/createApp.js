const Listr = require('listr');
const { projectInstall } = require('pkg-install');
const { mkdir, resolve } = require('../../utils/file');
const copyskeletonApp = require('./copyskeletonApp');
const copyTemplatesApp = require('./copyTemplatesApp');
const { init } = require('../../utils/git');

async function createApp(name, force) {
  const targetDir = resolve(process.cwd(), name);

  // TODO: controllare qui se la cartella esiste già, o metterlo come primo task

  const tasks = new Listr([
    // create app directory
    { title: `creating directory ${targetDir}`, task: () => mkdir(targetDir) },
    // copy skeleton files
    { title: 'copying skeleton app', task: () => copyskeletonApp(targetDir) },
    // copy template files
    { title: 'copying compiled template into the app', task: () => copyTemplatesApp(targetDir, name) },
    // git init
    { title: 'initialize git', task: () => init(targetDir) },
    // npm install
    { title: 'installing dependencies', task: () => projectInstall({ cwd: targetDir }) }
    // log usage informations
  ]);

  return tasks.run();
}

module.exports = createApp;