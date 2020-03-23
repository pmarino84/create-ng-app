const Listr = require('listr');
const { resolve } = require('../../../utils/file');
const { camelCase, toClassName, toNgNameConstant } = require('../../../utils/string');
const copyServiceTemplate = require('./copyServiceTemplate');

async function createService(name, force) {
  const serviceName = camelCase(name);
  const serviceClassName = toClassName(name);
  const serviceNameUpperCase = toNgNameConstant(serviceName);
  const dir = resolve(process.cwd());
  const tasks = new Listr([
    // { title: `creating directory ${dir}`, task: () => mkdir(dir) },
    { title: `copying compiled template into ${dir}`, task: () => copyServiceTemplate(dir, serviceName, serviceClassName, serviceNameUpperCase) }
  ]);
  return tasks.run();
}

module.exports = createService;
