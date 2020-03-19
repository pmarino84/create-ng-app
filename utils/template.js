const path = require('path');
const _ = require('lodash');
const { asyncReadFile, writeFile } = require('./file');

_.templateSettings.interpolate = /{{([\s\S]+?)}}/g;

function compile(template, options) {
  let compiled = _.template(template);
  return compiled(options);
}

const asyncCompileFileByPath = (pathToFile, options) => asyncReadFile(pathToFile).then(data => compile(data.toString(), options));

const writeCompiledToFile = (targetDir, fileName, content) => writeFile(path.resolve(targetDir, fileName), content);

module.exports = {
  asyncCompileFileByPath,
  writeCompiledToFile
};
