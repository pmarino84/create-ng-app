const { createCommand } = require('commander');
const createProvider = require('./createProvider');

const command = createCommand('provider');

command.description('Create an AngularJs provider');

command.arguments('<name> [options]');

command.option('-m, --module <name>', 'add to the module');

command.action(function (name, options, cmd) {
  const moduleName = (options && options.module) || (cmd && cmd.module);
  const force = (options && options.force) || (cmd && cmd.force);
  console.log(`Generate AngularJs provider ${name} with options: `, { moduleName, force });
  return createProvider(name, force);
});

module.exports = command;
