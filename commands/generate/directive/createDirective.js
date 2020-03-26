const Listr = require('listr');
const { resolve, exists } = require('../../../utils/file');
const { camelCase } = require('../../../utils/string');
const { logErr } = require('../../../utils/logger');
const copyDirectiveTemplate = require('./copyDirectiveTemplate');

async function createDirective(name, force) {
  const directiveName = camelCase(name);
  const dir = resolve(process.cwd());
  const pathToFile = resolve(dir, directiveName + '.directive.js');
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
    { title: `copying compiled template into ${dir}`, task: () => copyDirectiveTemplate(dir, directiveName) }
  ]);
  return tasks.run().catch(err => logErr(err.message));
}

module.exports = createDirective;
