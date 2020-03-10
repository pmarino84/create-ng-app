const path = require('path');
const _ = require('lodash');
const { asyncReadFile, writeFile } = require('./file');

const composePath = (fileName) => path.resolve(__dirname, '..', 'templates', fileName);

_.templateSettings.interpolate = /{{([\s\S]+?)}}/g;

function compile(template, options) {
  let compiled = _.template(template);
  return compiled(options);
}

const asyncCompileFileByPath = (pathToFile, options) => asyncReadFile(pathToFile).then(data => compile(data.toString(), options));

const asyncCompileFileByName = (fileName, options) => asyncCompileFileByPath(composePath(fileName), options);

const asyncCompileFileWithAppName = (fileName, appName) => asyncCompileFileByName(fileName, { name: appName });

const asyncCompilePackageJsonTemplate = (appName) => asyncCompileFileWithAppName('package.json', appName);

const asyncCompileReadmeTemplate = (appName) => asyncCompileFileWithAppName('README.md', appName);

const asyncCompileIndexHTmlTemplate = (appName) => asyncCompileFileWithAppName('index.html', appName);

const writePackageJson = (targetDir, content) => writeFile(path.resolve(targetDir, 'package.json'), content);

const writeReadMe = (targetDir, content) => writeFile(path.resolve(targetDir, 'README.md'), content);

const writeIndexHtml = (targetDir, content) => writeFile(path.resolve(targetDir, 'static', 'index.html'), content);

module.exports = async function copyTemplates(targetDir, appName) {
  const [packageJson, readMe, indexHtml] = await Promise.all([
    asyncCompilePackageJsonTemplate(appName),
    asyncCompileReadmeTemplate(appName),
    asyncCompileIndexHTmlTemplate(appName)
  ]);
  return writePackageJson(targetDir, packageJson) && writeReadMe(targetDir, readMe) && writeIndexHtml(targetDir, indexHtml);
};
