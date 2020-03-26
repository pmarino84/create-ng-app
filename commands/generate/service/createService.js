const Listr = require('listr');
const { resolve, exists } = require('../../../utils/file');
const { camelCase, toClassName, toNgNameConstant } = require('../../../utils/string');
const { logErr } = require('../../../utils/logger');
const copyServiceTemplate = require('./copyServiceTemplate');

async function createService(name, force) {
  const serviceName = camelCase(name);
  const serviceClassName = toClassName(name);
  const serviceNameUpperCase = toNgNameConstant(serviceName);
  const dir = resolve(process.cwd());
  const pathToFile = resolve(dir, serviceName + '.service.js');
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
    { title: `copying compiled template into ${dir}`, task: () => copyServiceTemplate(dir, serviceName, serviceClassName, serviceNameUpperCase) }
  ]);
  return tasks.run().catch(err => logErr(err.message));
}

module.exports = createService;
