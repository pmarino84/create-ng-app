const path = require('path');
const { projectInstall } = require('pkg-install');
const { makedir } = require('../utils/file');
const copySkeleton = require('./skeleton');
const copyAppTemplates = require('./copyAppTemplates');

// const execa = require('execa');
// let installDependenciesResult = await execa('npm', ['install'], { cwd: appDir });
// if (installDependenciesResult.failed) throw new Error('Faild to install dependencies');

function createApp(appName) {
  const appDir = path.resolve(process.cwd(), appName);
  return [
    { title: `creating directory ${appDir}`, task: () => makedir(appDir) },
    { title: 'copying skeleton app', task: () => copySkeleton(appDir) },
    { title: 'copying compiled template into the app', task: () => copyAppTemplates(appDir, appName) },
    { title: 'installing dependencies', task: () => projectInstall({ cwd: appDir }) }
  ];
}

module.exports = createApp;