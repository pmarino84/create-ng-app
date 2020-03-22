const { resolve } = require('../../../utils/file.v2');
const { toClassName, toNgNameConstant, toComponentSelector } = require('../../../utils/string');
const { asyncCompileFileByPath, writeCompiledToFile } = require('../../../utils/template');

const asyncCompileComponentFile = (fileName, options) => asyncCompileFileByPath(resolve(__dirname, fileName), options);

function asyncCompileComponentScriptTemplate(componentName, componentClassName, componentNameUpperCase) {
  return asyncCompileComponentFile('component.js.txt', { componentName, componentClassName, componentNameUpperCase });
}

function asyncCompileComponentHtmlTemplate(componentName) {
  return asyncCompileComponentFile('component.html.txt', { componentName });
}

function asyncCompileComponentCssTemplate(componentNameKebabCase) {
  return asyncCompileComponentFile('component.css.txt', { componentNameKebabCase });
}

function writeComponentFile(targetDir, componentName, ext, content) {
  return writeCompiledToFile(targetDir, `${componentName}.component.${ext}`, content);
}

const writeComponentScript = (targetDir, componentName, content) => writeComponentFile(targetDir, componentName, 'js', content);

const writeComponentHtml = (targetDir, componentName, content) => writeComponentFile(targetDir, componentName, 'html', content);

const writeComponentCss = (targetDir, componentName, content) => writeComponentFile(targetDir, componentName, 'css', content);

async function copyComponentTemplates(targetDir, componentName) {
  const componentClassName = toClassName(componentName);
  const componentNameUpperCase = toNgNameConstant(componentName);
  const componentNameKebabCase = toComponentSelector(componentName);
  const scriptContent = await asyncCompileComponentScriptTemplate(componentName, componentClassName, componentNameUpperCase);
  const htmlContent = await asyncCompileComponentHtmlTemplate(componentName);
  const cssContent = await asyncCompileComponentCssTemplate(componentNameKebabCase);
  writeComponentScript(targetDir, componentName, scriptContent);
  writeComponentHtml(targetDir, componentName, htmlContent);
  writeComponentCss(targetDir, componentName, cssContent);
  return true;
}

module.exports = copyComponentTemplates;
