const Listr = require('listr');
const { mkdir, resolve } = require('../../../utils/file.v2');
const { camelCase } = require('../../../utils/string');
const copyDirectiveTemplate = require('./copyDirectiveTemplate');

async function createDirective(name, force) {
  const directiveName = camelCase(name);
  const dir = resolve(process.cwd(), directiveName);
  const tasks = new Listr([
    { title: `creating directory ${dir}`, task: () => mkdir(dir) },
    { title: `copying compiled template into ${dir}`, task: () => copyDirectiveTemplate(dir, directiveName) }
  ]);
  return tasks.run();
}

module.exports = createDirective;
