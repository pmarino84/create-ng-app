const Listr = require('listr');
const { mkdir, resolve, exists } = require('../../../utils/file');
const { camelCase } = require('../../../utils/string');
const { logErr } = require('../../../utils/logger');
const copyComponentTemplates = require('./copyComponentTemplates');

function checking(targetDir, fileName, force) {
  const pathToFile = resolve(targetDir, fileName);
  const fileAlreadyExists = exists(pathToFile);
  let promise = null;

  if (fileAlreadyExists) {
    if (!force) promise = Promise.reject(new Error(pathToFile + ' file already exist. Add --force (-f) on your command to overwrite it.'));
    else Promise.resolve(true)
  } else {
    const dirAlreadyExists = exists(targetDir);
    if (!dirAlreadyExists) mkdir(targetDir);
    promise = Promise.resolve(true);
  }

  return promise;
}

async function createComponent(name, force) {
  const componentName = camelCase(name);
  const targetDir = resolve(process.cwd(), componentName);
  const fileName = componentName + '.component.js';
  const tasks = new Listr([
    { title: `checking file and directory ${targetDir}`, task: () => checking(targetDir, fileName, force) },
    { title: `copying compiled template into ${targetDir}`, task: () => copyComponentTemplates(targetDir, componentName) }
  ]);

  return tasks.run().catch(err => logErr(err.message));
}

module.exports = createComponent;
