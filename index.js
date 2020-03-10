const path = require('path');
const { makedir } = require('./utils/file');
const chalk = require('chalk');
const figlet = require('figlet');
const copySkeleton = require('./utils/skeleton');
const copyTemplates = require('./utils/template');

module.exports = async function createApp(argv) {
  console.log(chalk.yellow(figlet.textSync('Create AngularJs App', { horizontalLayout: 'full' })));
  // const args = program.parse(argv);
  const appName = argv.slice(2)[0];
  // console.log(`creating project with name ${appName} args:\n`, argv);
  // const appDir = __dirname + '/' + appName;
  // const appDir = process.cwd() + '/' + appName;
  const appDir = path.resolve(process.cwd(), appName);
  console.log("Creating directory: " + appDir);
  try {
    await makedir(appDir);
    console.log(`Directory ${appDir} successfully created`);
    await copySkeleton(appDir);
    if (!await copyTemplates(appDir, appName)) throw new Error("Failed to copy compiled template into the app");
  } catch (ex) {
    console.error(chalk.red(ex));
    process.exit(1);
  }
};