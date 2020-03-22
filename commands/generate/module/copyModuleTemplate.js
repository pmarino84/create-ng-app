const { resolve } = require('../../../utils/file.v2');
const { camelCase } = require('../../../utils/string');
const { asyncCompileFileByPath, writeCompiledToFile } = require('../../../utils/template');

const asyncCompileModuleScriptTemplate = (moduleName, moduleNameCamelCase) => asyncCompileFileByPath(resolve(__dirname, 'module.txt'), { moduleName, moduleNameCamelCase });

const writeModuleScript = (targetDir, moduleName, content) => writeCompiledToFile(targetDir, `${moduleName}.module.js`, content);

async function copyModuleTemplate(targetDir, name) {
  const moduleNameCamelCase = camelCase(name);
  const content = await asyncCompileModuleScriptTemplate(name, moduleNameCamelCase);
  writeModuleScript(targetDir, name, content);
  return true;
}

module.exports = copyModuleTemplate;
