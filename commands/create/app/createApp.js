const Listr = require('listr');
const { projectInstall } = require('pkg-install');
const { mkdir, resolve, exists } = require('../../../utils/file');
const copyskeletonApp = require('./copyskeletonApp');
const copyTemplatesApp = require('./copyTemplatesApp');
const { log, logErr, logInfo } = require('../../../utils/logger');
const { init } = require('../../../utils/git');
const rimraf = require('rimraf');

function checking(targetDir, name, force) {
  return new Promise((resolve, reject) => {
    try {
      const dirAlreadyExists = exists(targetDir);
      if (dirAlreadyExists) {
        if (!force) throw new Error(name + ' application already exist. Add --force (-f) on your command to overwrite it.');
        else {
          rimraf(targetDir, (err) => {
            if (err) throw new Error(err);
            mkdir(targetDir);
            resolve(true);
          });
        }
      } else {
        mkdir(targetDir);
        resolve(true);
      }
    } catch (ex) {
      reject(ex);
    }
  });
}

async function createApp(name, force) {
  const targetDir = resolve(process.cwd(), name);

  const tasks = new Listr([
    // create app directory
    { title: `checkinf if app already ${name} exists`, task: () => checking(targetDir, name, force) },
    // copy skeleton files
    { title: 'copying skeleton app', task: () => copyskeletonApp(targetDir) },
    // copy template files
    { title: 'copying compiled template into the app', task: () => copyTemplatesApp(targetDir, name) },
    // git init
    { title: 'initialize git', task: () => init(targetDir) },
    // npm install
    { title: 'installing dependencies', task: () => projectInstall({ cwd: targetDir }) }
  ]);

  return tasks.run().then(() => {
    log(`\nSuccess! Created ${name} at ${targetDir}`);
    log('Inside that directory, you can run several commands:\n');
    logInfo('npm start');
    log('Starts the development server.\n');
    // logInfo('npm test');
    // log('Starts the test runner.\n');
    logInfo('npm run build');
    log('Bundles the app into static files for production.\n');
    log('Begin by typing:');
    log(`cd ${name}`);
    log('npm start\n');
    log('edit some files with your preferred editor and see the magic in action.');
    log('Good job!');
  }).catch(err => logErr(err.message));
}

module.exports = createApp;