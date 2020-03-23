const { resolve } = require('../../../utils/file');
const { toClassName, toNgNameConstant } = require('../../../utils/string');
const { asyncCompileFileByPath, writeCompiledToFile } = require('../../../utils/template');

const asyncCompileProviderFile = (providerName, providerClassName, providerNameUpperCase) => asyncCompileFileByPath(resolve(__dirname, 'provider.js.txt'), { providerName, providerClassName, providerNameUpperCase });

const writeProviderFile = (targetDir, providerName, content) => writeCompiledToFile(targetDir, `${providerName}.provider.js`, content);

async function copyProviderTemplate(targetDir, providerName) {
  const providerClassName = toClassName(providerName);
  const providerNameUpperCase = toNgNameConstant(providerName);
  const content = await asyncCompileProviderFile(providerName, providerClassName, providerNameUpperCase);
  writeProviderFile(targetDir, providerName, content);
  return true;
}

module.exports = copyProviderTemplate;
