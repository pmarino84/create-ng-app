const path = require('path');
const { makedir } = require('../utils/file');
const { camelCase } = require('lodash');
const copyModuleTemplate = require('./copyModuleTemplate');

function createModule(name) {
  const moduleNameCamelCase = camelCase(name);
  const dir = path.resolve(process.cwd(), moduleNameCamelCase);
  return [
    { title: `creating directory ${dir}`, task: () => makedir(dir) },
    { title: `copying compiled template into ${dir}`, task: () => copyModuleTemplate(dir, name, moduleNameCamelCase) }
  ];
}

module.exports = createModule;
