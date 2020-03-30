const { resolve } = require('../../../utils/file');
const { asyncCompileFileByPath, writeCompiledToFile } = require('../../../utils/template');

const asyncCompileModuleScriptTemplate = (moduleName, moduleNameCamelCase) => asyncCompileFileByPath(resolve(__dirname, 'module.txt'), { moduleName, moduleNameCamelCase });

const writeModuleScript = (targetDir, moduleName, content) => writeCompiledToFile(targetDir, `${moduleName}.module.js`, content);

async function copyModuleTemplate(targetDir, name, moduleNameCamelCase) {
  const content = await asyncCompileModuleScriptTemplate(name, moduleNameCamelCase);
  writeModuleScript(targetDir, moduleNameCamelCase, content);
  return true;
}

module.exports = copyModuleTemplate;
