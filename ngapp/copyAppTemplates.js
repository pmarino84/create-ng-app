const path = require('path');
const { asyncCompileFileByPath, writeCompiledToFile } = require('../utils/template');

const asyncCompileFileWithAppName = (fileName, appName) => asyncCompileFileByPath(path.resolve(__dirname, 'templates', fileName), { name: appName });

const asyncCompilePackageJsonTemplate = (appName) => asyncCompileFileWithAppName('package.json', appName);

const asyncCompileReadmeTemplate = (appName) => asyncCompileFileWithAppName('README.md', appName);

const asyncCompileIndexHTmlTemplate = (appName) => asyncCompileFileWithAppName('index.html', appName);

const writePackageJson = (targetDir, content) => writeCompiledToFile(targetDir, 'package.json', content);

const writeReadMe = (targetDir, content) => writeCompiledToFile(targetDir, 'README.md', content);

const writeIndexHtml = (targetDir, content) => writeCompiledToFile(path.resolve(targetDir, 'static'), 'index.html', content);

async function copyAppTemplates(targetDir, appName) {
  const packageJson = await asyncCompilePackageJsonTemplate(appName);
  const readMe = await asyncCompileReadmeTemplate(appName);
  const indexHtml = await asyncCompileIndexHTmlTemplate(appName);
  return writePackageJson(targetDir, packageJson) && writeReadMe(targetDir, readMe) && writeIndexHtml(targetDir, indexHtml);
};

module.exports = copyAppTemplates;
