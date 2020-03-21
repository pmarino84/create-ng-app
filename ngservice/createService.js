const path = require('path');
const { makedir } = require('../utils/file');
const { camelCase, upperCase, split, join, upperFirst } = require('lodash');
const copyServiceTemplate = require('./copyServiceTemplate');

function createService(name) {
  const serviceName = camelCase(name);
  const serviceClassName = upperFirst(serviceName);
  const serviceNameUpperCase = join(split(upperCase(serviceName), ' '), '_');
  const dir = path.resolve(process.cwd(), serviceName);
  return [
    { title: `creating directory ${dir}`, task: () => makedir(dir) },
    { title: `copying compiled template into ${dir}`, task: () => copyServiceTemplate(dir, serviceName, serviceClassName, serviceNameUpperCase) }
  ];
}

module.exports = createService;
