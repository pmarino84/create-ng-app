const { asyncCompileFileByName, writeCompiledToFile } = require('./template');

const asyncCompileModuleScriptTemplate = (moduleName, moduleNameCamelCase) => asyncCompileFileByName('module.txt', { moduleName, moduleNameCamelCase });

const writeModuleScript = (targetDir, content) => writeCompiledToFile(targetDir, 'index.js', content);

async function copyModuleTemplate(targetDir, moduleName, moduleNameCamelCase) {
  const content = await asyncCompileModuleScriptTemplate(moduleName, moduleNameCamelCase);
  return writeModuleScript(targetDir, content);
}

module.exports = copyModuleTemplate;
