const Listr = require('listr');
const { resolve, exists } = require('../../../utils/file');
const { camelCase, toNgNameConstant } = require('../../../utils/string');
const { logErr } = require('../../../utils/logger');
const copyFilterTemplate = require('./copyFilterTemplate');

async function createFilter(name, force) {
  const filterName = camelCase(name);
  const filterNameUpperCase = toNgNameConstant(filterName);
  const dir = resolve(process.cwd());
  const pathToFile = resolve(dir, filterName + '.filter.js');
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
    { title: `copying compiled template into ${dir}`, task: () => copyFilterTemplate(dir, filterName, filterNameUpperCase) }
  ]);
  return tasks.run().catch(err => logErr(err.message));
}

module.exports = createFilter;
