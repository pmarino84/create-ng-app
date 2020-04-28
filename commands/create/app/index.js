const { createCommand } = require('commander');
const createApp = require('./createApp');

const command = createCommand('app');

command.alias('a');

command.description('Create and intialize an AngularJs application');

command.arguments('<name>');

command.option('-f, --force', 'If app directory already exist overwrite it');

command.action((name, options, cmd) => {
  const force = (options && options.force) || (cmd && cmd.force)
  console.log(`Create ${name} AngularJs application${force ? ', force overwrite' : ''}`);
  return createApp(name, force);
});

module.exports = command;
