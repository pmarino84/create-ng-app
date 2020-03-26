const Listr = require('listr');
const { mkdir, resolve } = require('../../../utils/file');
const { camelCase } = require('../../../utils/string');
const { logErr } = require('../../../utils/logger');
const copyModuleTemplate = require('./copyModuleTemplate');

async function createModule(name, force) {
  const moduleNameCamelCase = camelCase(name);
  const targetDir = resolve(process.cwd(), moduleNameCamelCase);
  // const pathToFile = resolve(targetDir, moduleNameCamelCase + '.module.js');
  const tasks = new Listr([
    { title: `creating directory ${targetDir}`, task: () => mkdir(targetDir, force) },
    { title: `copying compiled template into ${targetDir}`, task: () => copyModuleTemplate(targetDir, name, moduleNameCamelCase) }
  ]);
  return tasks.run().catch(err => logErr(err.message));
}

module.exports = createModule;
