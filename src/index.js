const path = require('path');
const mkdirp = require('mkdirp');
// const program = require('commander');
// const copySkeleton = require('./copySkeleton.js');

// program.option('-y --yes', 'Skip all prompt and use default', false);

module.exports = function createApp(argv) {
  // const args = program.parse(argv);
  const appName = argv.slice(2)[0];
  console.log(`creating project with name ${appName} args:\n`, argv);
  // const appDir = __dirname + '/' + appName;
  // const appDir = process.cwd() + '/' + appName;
  const appDir = path.resolve(process.cwd(), appName);
  console.log("Creating directory: " + appDir);
  mkdirp(appDir).then((made) => {
    console.log(appDir + " successfully created, starting with: " + made);
    // copySkeleton();
  }).catch(rej => {
    console.error(rej);
  });
};