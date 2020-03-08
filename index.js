const path = require('path');
const { makedir } = require('./utils/file');
const chalk = require('chalk');
const figlet = require('figlet');
const copySkeleton = require('./utils/skeleton');

module.exports = function createApp(argv) {
  console.log(chalk.yellow(figlet.textSync('create ng app', { horizontalLayout: 'full' })));
  // const args = program.parse(argv);
  const appName = argv.slice(2)[0];
  console.log(`creating project with name ${appName} args:\n`, argv);
  // const appDir = __dirname + '/' + appName;
  // const appDir = process.cwd() + '/' + appName;
  const appDir = path.resolve(process.cwd(), appName);
  console.log("Creating directory: " + appDir);
  makedir(appDir).then((dir) => {
    console.log(`Directory ${dir} successfully created`);
    copySkeleton(dir);
  }).catch(rej => {
    console.error(chalk.red(rej));
    process.exit(1);
  });
};