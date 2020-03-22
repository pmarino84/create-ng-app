const { writeCompiledToFile } = require('../../../utils/template');

const writeDirectiveScriptToFile = (targetDir, directiveName, content) => writeCompiledToFile(targetDir, `${directiveName}.directive.js`, content);

function makeContent(name) {
  // TODO: indentitato in questo modo per averlo corretto nel file scritto
  return `const ddo = {
  // priority: 1,
  // terminal: true,
  // require: '',
  // transclude: true,
  restrict: 'ACEM',
  scope: {},
  // bindToController: true,
  // controller: () => {},
  // controllerAs: 'nameOfControllerInTemplate',
  // templateNamespace: 'svg',
  // template: '',
  // templateUrl: '',
  link: function (scope, element, attrs, controllers, transcludeFn) {}
};

export function ${name}Directive() {
  return ddo;
}
${name}Directive.$inject = [];
`;
}

async function copyDirectiveTemplate(targetDir, directiveName) {
  const content = makeContent(directiveName);
  writeDirectiveScriptToFile(targetDir, directiveName, content);
  return true;
}

module.exports = copyDirectiveTemplate;
