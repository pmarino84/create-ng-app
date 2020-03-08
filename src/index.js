// const program = require('commander');
const copySkeleton = require('./copySkeleton.js');

// program.option('-y --yes', 'Skip all prompt and use default', false);

module.exports = function createApp(argv) {
  // const args = program.parse(argv);
  const appName = argv.slice(2);
  console.log(`creating project with name ${appName} args:\n`, argv);
  copySkeleton();
};