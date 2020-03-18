const path = require('path');
const { makedir } = require('./file');
const { camelCase } = require('lodash');
const copyComponentTemplates = require('./copyComponentTemplates');

function createComponent(name) {
  const componentName = camelCase(name);
  const dir = path.resolve(process.cwd(), componentName);
  return [
    { title: `creating directory ${dir}`, task: () => makedir(dir) },
    { title: `copying compiled template into ${dir}`, task: () => copyComponentTemplates(dir, componentName) }
  ];
}

module.exports = createComponent;