const Listr = require('listr');
const { resolve } = require('../../../utils/file');
const { camelCase } = require('../../../utils/string');
const copyFactoryTemplate = require('./copyFactoryTemplate');

async function copyFactory(name, force) {
  const factoryName = camelCase(name);
  const dir = resolve(process.cwd());
  const tasks = new Listr([
    // { title: `creating directory ${dir}`, task: () => mkdir(dir) },
    { title: `copying compiled template into ${dir}`, task: () => copyFactoryTemplate(dir, factoryName) }
  ]);
  return tasks.run();
}

module.exports = copyFactory;
