const { createCommand } = require('commander');
const createComponent = require('./createComponent');

const command = createCommand('component');

command.description('Create an AngularJs component');

command.arguments('<name> [options]');

command.option('-f, --force', 'if it already exists overwrite them');
// command.option('-m, --module <name>', 'add to the module');

command.action(function (name, options, cmd) {
  const moduleName = (options && options.module) || (cmd && cmd.module);
  const force = (options && options.force) || (cmd && cmd.force);
  console.log(`Generate AngularJs component ${name} with options: `, { moduleName, force });
  return createComponent(name, force);
});

module.exports = command;
