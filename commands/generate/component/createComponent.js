const Listr = require('listr');
const { mkdir, resolve } = require('../../../utils/file');
const { camelCase } = require('../../../utils/string');
const { logErr } = require('../../../utils/logger');
const copyComponentTemplates = require('./copyComponentTemplates');

async function createComponent(name, force) {
  const componentName = camelCase(name);
  const targetDir = resolve(process.cwd(), componentName);
  const tasks = new Listr([
    { title: `creating directory ${targetDir}`, task: () => mkdir(targetDir, force) },
    { title: `copying compiled template into ${targetDir}`, task: () => copyComponentTemplates(targetDir, componentName) }
  ]);

  return tasks.run().catch(err => logErr(err.message));
}

module.exports = createComponent;
