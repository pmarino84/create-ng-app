const Listr = require('listr');
const { resolve } = require('../../../utils/file');
const { camelCase, toNgNameConstant } = require('../../../utils/string');
const copyFilterTemplate = require('./copyFilterTemplate');

async function createFilter(name, force) {
  const filterName = camelCase(name);
  const filterNameUpperCase = toNgNameConstant(filterName);
  const dir = resolve(process.cwd());
  const tasks = new Listr([
    // { title: `creating directory ${dir}`, task: () => mkdir(dir) },
    { title: `copying compiled template into ${dir}`, task: () => copyFilterTemplate(dir, filterName, filterNameUpperCase) }
  ]);
  return tasks.run();
}

module.exports = createFilter;
