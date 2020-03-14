const path = require('path');
const execa = require('execa');
const { projectInstall } = require('pkg-install');
const { makedir } = require('./file');
const copySkeleton = require('./skeleton');
const copyAppTemplates = require('./copyAppTemplates');

async function createApp(appName) {
  console.log(`creating project with name ${appName}`);
  const appDir = path.resolve(process.cwd(), appName);
  await makedir(appDir);
  console.log(`Directory ${appDir} successfully created`);
  await copySkeleton(appDir);
  if (!await copyAppTemplates(appDir, appName)) throw new Error("Failed to copy compiled template into the app");
  console.log('installing dependencies...');
  /* let installDependenciesResult = await execa('npm', ['install'], {
    cwd: appDir
  });
  if (installDependenciesResult.failed) throw new Error('Faild to install dependencies'); */
  let result = await projectInstall({ cwd: appDir });
  if (result.failed) throw new Error('Faild to install dependencies');
  console.log('...dependencies installed successfully');
}

module.exports = createApp;