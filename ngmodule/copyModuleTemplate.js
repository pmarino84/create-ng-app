const path = require('path');
const { asyncCompileFileByPath, writeCompiledToFile } = require('../utils/template');

const asyncCompileModuleScriptTemplate = (moduleName, moduleNameCamelCase) => asyncCompileFileByPath(path.resolve(__dirname, 'module.txt'), { moduleName, moduleNameCamelCase });

const writeModuleScript = (targetDir, content) => writeCompiledToFile(targetDir, 'index.js', content);

async function copyModuleTemplate(targetDir, moduleName, moduleNameCamelCase) {
  const content = await asyncCompileModuleScriptTemplate(moduleName, moduleNameCamelCase);
  return writeModuleScript(targetDir, content);
}

module.exports = copyModuleTemplate;
