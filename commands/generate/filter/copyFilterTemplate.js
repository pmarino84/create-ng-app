const { resolve } = require('../../../utils/file');
const { asyncCompileFileByPath, writeCompiledToFile } = require('../../../utils/template');

const asyncCompileFilterScriptTemplate = (filterName, filterNameUpperCase) => asyncCompileFileByPath(resolve(__dirname, 'filter.js.txt'), { filterName, filterNameUpperCase });

const writeFilterScriptToFile = (targetDir, filterName, content) => writeCompiledToFile(targetDir, `${filterName}.filter.js`, content);

async function copyFilterTemplate(targetDir, filterName, filterNameUpperCase) {
  const content = await asyncCompileFilterScriptTemplate(filterName, filterNameUpperCase);
  writeFilterScriptToFile(targetDir, filterName, content);
  return true;
}

module.exports = copyFilterTemplate;