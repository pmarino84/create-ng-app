const { resolve } = require('../../../utils/file');
const { asyncCompileFileByPath, writeCompiledToFile } = require('../../../utils/template');

const asyncCompileFileWithAppName = (fileName, appName) => asyncCompileFileByPath(resolve(__dirname, 'templatesApp', fileName), { name: appName });

const asyncCompilePackageJsonTemplate = (appName) => asyncCompileFileWithAppName('package.json', appName);

const asyncCompileReadmeTemplate = (appName) => asyncCompileFileWithAppName('README.md', appName);

const asyncCompileIndexHTmlTemplate = (appName) => asyncCompileFileWithAppName('index.html', appName);

const writePackageJson = (targetDir, content) => writeCompiledToFile(targetDir, 'package.json', content);

const writeReadMe = (targetDir, content) => writeCompiledToFile(targetDir, 'README.md', content);

const writeIndexHtml = (targetDir, content) => writeCompiledToFile(resolve(targetDir, 'static'), 'index.html', content);

async function copyTemplatesApp(targetDir, appName) {
  const packageJson = await asyncCompilePackageJsonTemplate(appName);
  const readMe = await asyncCompileReadmeTemplate(appName);
  const indexHtml = await asyncCompileIndexHTmlTemplate(appName);
  writePackageJson(targetDir, packageJson);
  writeReadMe(targetDir, readMe);
  writeIndexHtml(targetDir, indexHtml);
  return true;
}

module.exports = copyTemplatesApp;
