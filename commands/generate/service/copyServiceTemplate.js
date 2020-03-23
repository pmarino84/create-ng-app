const { resolve } = require('../../../utils/file');
const { asyncCompileFileByPath, writeCompiledToFile } = require('../../../utils/template');

const asyncCompileServiceScriptTemplate = (serviceName, serviceClassName, serviceNameUpperCase) => asyncCompileFileByPath(resolve(__dirname, 'service.js.txt'), { serviceName, serviceClassName, serviceNameUpperCase });

const writeServiceScriptToFile = (targetDir, serviceName, content) => writeCompiledToFile(targetDir, `${serviceName}.service.js`, content);

async function copyServiceTemplate(targetDir, serviceName, serviceClassName, serviceNameUpperCase) {
  const content = await asyncCompileServiceScriptTemplate(serviceName, serviceClassName, serviceNameUpperCase);
  writeServiceScriptToFile(targetDir, serviceName, content);
  return true;
}

module.exports = copyServiceTemplate;