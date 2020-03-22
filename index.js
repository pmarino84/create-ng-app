const program = require('commander');
const pkg = require('./package.json');
const createCommand = require('./commands/create');
const generateCommand = require('./commands/generate');

const mainProgram = program.name('nguno').version(pkg.version);

mainProgram.addCommand(createCommand);
mainProgram.addCommand(generateCommand);

mainProgram.parse(process.argv);
