const Listr = require('listr');
const { resolve, exists } = require('../../../utils/file');
const { camelCase } = require('../../../utils/string');
const { logErr } = require('../../../utils/logger');
const copyFactoryTemplate = require('./copyFactoryTemplate');

async function copyFactory(name, force) {
  const factoryName = camelCase(name);
  const dir = resolve(process.cwd());
  const pathToFile = resolve(dir, factoryName + '.factory.js');
  const tasks = new Listr([
    {
      title: `checking if file exist under ${dir}`, task: () => {
        let promise = null;
        const alreadExists = exists(pathToFile);
        if (alreadExists && !force) promise = Promise.reject(new Error(pathToFile + ' file already exist. Add --force (-f) on your command to overwrite it.'));
        else promise = Promise.resolve(true);
        return promise;
      }
    },
    { title: `copying compiled template into ${dir}`, task: () => copyFactoryTemplate(dir, factoryName) }
  ]);
  return tasks.run().catch(err => logErr(err.message));
}

module.exports = copyFactory;
