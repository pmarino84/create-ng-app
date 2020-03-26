const { resolve } = require('../../../utils/file');
const { toNgNameConstant } = require('../../../utils/string');
const { asyncCompileFileByPath, writeCompiledToFile } = require('../../../utils/template');

const asyncCompileFactoryScriptFile = (factoryName, factoryNameUpperCase) => asyncCompileFileByPath(resolve(__dirname, 'factory.js.txt'), { factoryName, factoryNameUpperCase });

const writeFactoryScriptFile = (targetDir, factoryName, content) => writeCompiledToFile(targetDir, `${factoryName}.factory.js`, content);

async function copyFactoryTemplate(targetDir, factoryName) {
  const factoryNameUpperCase = toNgNameConstant(factoryName);
  const content = await asyncCompileFactoryScriptFile(factoryName, factoryNameUpperCase);
  writeFactoryScriptFile(targetDir, factoryName, content);
  return true;
}

module.exports = copyFactoryTemplate;
