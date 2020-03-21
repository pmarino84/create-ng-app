const path = require('path');
const { upperFirst, kebabCase } = require('lodash');
const { asyncCompileFileByPath, writeCompiledToFile } = require('../utils/template');

const asyncCompileComponentFile = (fileName, options) => asyncCompileFileByPath(path.resolve(__dirname, fileName), options);

function asyncCompileComponentScriptTemplate(componentName, componentNameUpperCase) {
  const componentClassName = upperFirst(componentName);
  return asyncCompileComponentFile('component.js.txt', { componentName, componentClassName, componentNameUpperCase });
}

function asyncCompileComponentHtmlTemplate(componentName) {
  return asyncCompileComponentFile('component.html.txt', { componentName });
}

function asyncCompileComponentCssTemplate(componentName) {
  const componentNameKebabCase = kebabCase(componentName);
  return asyncCompileComponentFile('component.css.txt', { componentNameKebabCase });
}

function writeComponentFile(targetDir, componentName, ext, content) {
  return writeCompiledToFile(targetDir, `${componentName}.component.${ext}`, content);
}

const writeComponentScript = (targetDir, componentName, content) => writeComponentFile(targetDir, componentName, 'js', content);

const writeComponentHtml = (targetDir, componentName, content) => writeComponentFile(targetDir, componentName, 'html', content);

const writeComponentCss = (targetDir, componentName, content) => writeComponentFile(targetDir, componentName, 'css', content);

async function copyComponentTemplates(targetDir, componentName, componentNameUpperCase) {
  const scriptContent = await asyncCompileComponentScriptTemplate(componentName, componentNameUpperCase);
  const htmlContent = await asyncCompileComponentHtmlTemplate(componentName);
  const cssContent = await asyncCompileComponentCssTemplate(componentName);
  return writeComponentScript(targetDir, componentName, scriptContent) && writeComponentHtml(targetDir, componentName, htmlContent) && writeComponentCss(targetDir, componentName, cssContent);
}

module.exports = copyComponentTemplates;