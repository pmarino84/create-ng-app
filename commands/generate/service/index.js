const { createCommand } = require('commander');
const createService = require('./createService');

const command = createCommand('service');

command.description('Create an AngularJs service');

command.arguments('<name> [options]');

command.option('-f, --force', 'if it already exists overwrite them');
// command.option('-m, --module <name>', 'add to the module');

command.action(function (name, options, cmd) {
  const moduleName = (options && options.module) || (cmd && cmd.module);
  const force = (options && options.force) || (cmd && cmd.force);
  console.log(`Generate AngularJs service ${name} with options: `, { moduleName });
  return createService(name, force);
});

module.exports = command;
