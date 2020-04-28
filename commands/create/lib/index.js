const { createCommand } = require('commander');

const command = createCommand('lib');

command.alias('l');

command.description('Create and intialize an AngularJs library');

command.arguments('<name>');

command.option('-f, --force', 'If library directory already exist overwrite it');

command.action((name, options, cmd) => {
  //const force = (options && options.force) || (cmd && cmd.force)
  // console.log(`Create ${name} AngularJs libraryù${force ? ', force overwrite' : ''}`);
  console.error(`Create ${name} AngularJs library not implemented`);
  return false;
});

module.exports = command;
