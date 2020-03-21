const path = require('path');
const { makedir } = require('../utils/file');
const { camelCase, upperCase, split, join } = require('lodash');
const copyComponentTemplates = require('./copyComponentTemplates');

function createComponent(name) {
  const componentName = camelCase(name);
  const componentNameUpperCase = join(split(upperCase(componentName), ' '), '_');
  const dir = path.resolve(process.cwd(), componentName);
  return [
    { title: `creating directory ${dir}`, task: () => makedir(dir) },
    { title: `copying compiled template into ${dir}`, task: () => copyComponentTemplates(dir, componentName, componentNameUpperCase) }
  ];
}

module.exports = createComponent;
