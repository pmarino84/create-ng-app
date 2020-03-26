const { createCommand } = require('commander');
const createDirective = require('./createDirective');

const command = createCommand('directive');

command.description('Create an AngularJs directive');

command.arguments('<name> [options]');

command.option('-f, --force', 'if it already exists overwrite them');
command.option('-m, --module <name>', 'add to the module');

command.action(function (name, options, cmd) {
  const moduleName = (options && options.module) || (cmd && cmd.module);
  const force = (options && options.force) || (cmd && cmd.force);
  console.log(`Generate AngularJs directive ${name} with options: `, { moduleName, force });
  return createDirective(name, force);
});

module.exports = command;
