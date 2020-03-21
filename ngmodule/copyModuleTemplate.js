const path = require('path');
const { asyncCompileFileByPath, writeCompiledToFile } = require('../utils/template');

const asyncCompileModuleScriptTemplate = (moduleName, moduleNameCamelCase) => asyncCompileFileByPath(path.resolve(__dirname, 'module.txt'), { moduleName, moduleNameCamelCase });

const writeModuleScript = (targetDir, moduleName, content) => writeCompiledToFile(targetDir, `${moduleName}.module.js`, content);

async function copyModuleTemplate(targetDir, moduleName, moduleNameCamelCase) {
  const content = await asyncCompileModuleScriptTemplate(moduleName, moduleNameCamelCase);
  return writeModuleScript(targetDir, moduleName, content);
}

module.exports = copyModuleTemplate;
