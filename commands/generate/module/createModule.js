const Listr = require('listr');
const { mkdir, resolve } = require('../../../utils/file');
const { camelCase } = require('../../../utils/string');
const copyModuleTemplate = require('./copyModuleTemplate');

async function createModule(name, force) {
  const moduleNameCamelCase = camelCase(name);
  const targetDir = resolve(process.cwd(), moduleNameCamelCase);
  const tasks = new Listr([
    { title: `creating directory ${targetDir}`, task: () => mkdir(targetDir, force) },
    { title: `copying compiled template into ${targetDir}`, task: () => copyModuleTemplate(targetDir, name, moduleNameCamelCase) }
  ]);
  return tasks.run();
}

module.exports = createModule;
