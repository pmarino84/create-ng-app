const { createCommand } = require('commander');
const appCommand = require('./app');
const libCommand = require('./lib');

const command = createCommand('create');

command.alias('c');

command.description('Create an AngularJs application or library');

command.arguments('<schema> [options]');

command.addCommand(appCommand);
command.addCommand(libCommand);

module.exports = command;
