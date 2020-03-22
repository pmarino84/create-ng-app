const Listr = require('listr');
const { mkdir, resolve } = require('../../../utils/file.v2');
const copyModuleTemplate = require('./copyModuleTemplate');

async function createModule(name, force) {
  const targetDir = resolve(process.cwd(), moduleNameCamelCase);
  const tasks = new Listr([
    { title: `creating directory ${targetDir}`, task: () => mkdir(targetDir) },
    { title: `copying compiled template into ${targetDir}`, task: () => copyModuleTemplate(targetDir, name) }
  ]);
  return tasks.run();
}

module.exports = createModule;
