const { createCommand } = require('commander');
const createProvider = require('./createProvider');

const command = createCommand('provider');

command.alias('p');

command.description('Create an AngularJs provider');

command.arguments('<name> [options]');

command.option('-f, --force', 'if it already exists overwrite them');
// command.option('-m, --module <name>', 'add to the module');

command.action(function (name, options, cmd) {
  const moduleName = (options && options.module) || (cmd && cmd.module);
  const force = (options && options.force) || (cmd && cmd.force);
  console.log(`Generate AngularJs provider ${name} with options: `, { moduleName, force });
  return createProvider(name, force);
});

module.exports = command;
