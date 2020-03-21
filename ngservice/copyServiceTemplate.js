const path = require('path');
const { asyncCompileFileByPath, writeCompiledToFile } = require('../utils/template');

const asyncCompileServiceScriptTemplate = (serviceClassName, serviceNameUpperCase) => asyncCompileFileByPath(path.resolve(__dirname, 'service.js.txt'), { serviceClassName, serviceNameUpperCase });

const writeServiceScriptToFile = (targetDir, serviceName, content) => writeCompiledToFile(targetDir, `${serviceName}.service.js`, content);

async function copyServiceTemplate(targetDir, serviceName, serviceClassName, serviceNameUpperCase) {
  const content = await asyncCompileServiceScriptTemplate(serviceClassName, serviceNameUpperCase);
  return writeServiceScriptToFile(targetDir, serviceName, content);
}

module.exports = copyServiceTemplate;