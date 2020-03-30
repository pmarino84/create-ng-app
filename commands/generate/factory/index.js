const { createCommand } = require('commander');
const createFactory = require('./createFactory');

const command = createCommand('factory');

command.description('Create an AngularJs factory');

command.arguments('<name> [options]');

command.option('-f, --force', 'if it already exists overwrite them');
// command.option('-m, --module <name>', 'add to the module');

command.action(function (name, options, cmd) {
  const moduleName = (options && options.module) || (cmd && cmd.module);
  const force = (options && options.force) || (cmd && cmd.force);
  console.log(`Generate AngularJs factory ${name} with options: `, { moduleName, force });
  return createFactory(name, force);
});

module.exports = command;
