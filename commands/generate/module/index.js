const { createCommand } = require('commander');
const createModule = require('./createModule');

const command = createCommand('module');

command.alias('m');

command.description('Create an AngularJs component');

command.arguments('<name>');

command.option('-f, --force', 'if it already exists overwrite them');

command.action((name, options, cmd) => {
  const force = (options && options.force) || (cmd && cmd.force);
  console.log(`Create AngularJs module ${name}`);
  return createModule(name, force);
});

module.exports = command;
