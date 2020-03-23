const { createCommand } = require('commander');
const componentCommand = require('./component');
const directiveCommand = require('./directive');
const moduleCommand = require('./module');
const serviceCommand = require('./service');
const providerCommand = require('./provider');

const command = createCommand('generate');

command.alias('g');

command.description('Generate and/or modify files based on schema');

command.arguments('<schema> [options]');

command.addCommand(componentCommand);
command.addCommand(directiveCommand);
command.addCommand(moduleCommand);
command.addCommand(serviceCommand);
command.addCommand(providerCommand);

module.exports = command;
