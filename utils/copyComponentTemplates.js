const { upperFirst, kebabCase } = require('lodash');
const { asyncCompileFileByName, writeCompiledToFile } = require('./template');

const asyncCompileComponentFile = (fileName, options) => asyncCompileFileByName('component/' + fileName, options);

function asyncCompileComponentScriptTemplate(componentName) {
  const componentClassName = upperFirst(componentName);
  return asyncCompileComponentFile('component.js.txt', { componentName, componentClassName });
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

async function copyComponentTemplates(targetDir, componentName) {
  const scriptContent = await asyncCompileComponentScriptTemplate(componentName);
  const htmlContent = await asyncCompileComponentHtmlTemplate(componentName);
  const cssContent = await asyncCompileComponentCssTemplate(componentName);
  return writeComponentScript(targetDir, componentName, scriptContent) && writeComponentHtml(targetDir, componentName, htmlContent) && writeComponentCss(targetDir, componentName, cssContent);
}

module.exports = copyComponentTemplates;
