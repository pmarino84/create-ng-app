const Listr = require('listr');
const { resolve } = require('../../../utils/file');
const { camelCase } = require('../../../utils/string');
const copyProviderTemplate = require('./copyProviderTemplate');

async function createProvider(name, force) {
  const providerName = camelCase(name);
  const dir = resolve(process.cwd());
  const tasks = new Listr([
    // { title: `creating directory ${dir}`, task: () => mkdir(dir) },
    { title: `copying compiled template into ${dir}`, task: () => copyProviderTemplate(dir, providerName) }
  ]);
  return tasks.run();
}

module.exports = createProvider;
