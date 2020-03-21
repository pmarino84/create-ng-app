const path = require('path');
const { makedir } = require('../utils/file');
const { camelCase } = require('lodash');
const copyDirectiveTemplate = require('./copyDirectiveTemplate');

function createDirective(name) {
  const directiveName = camelCase(name);
  const dir = path.resolve(process.cwd(), directiveName);
  return [
    { title: `creating directory ${dir}`, task: () => makedir(dir) },
    { title: `copying compiled template into ${dir}`, task: () => copyDirectiveTemplate(dir, directiveName) }
  ];
}

module.exports = createDirective;
