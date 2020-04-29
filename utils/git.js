const execa = require('execa');

async function exec(targetDir, commands) {
  let success = false;
  const result = await execa('git', Array.isArray(commands) ? commands : [commands], { cwd: targetDir });
  success = !result.failed
  return success;
}

async function init(targetDir) {
  return exec(targetDir, 'init')
}

async function addAllFilesToStage(targetDir) {
  return exec(targetDir, ['add', '.'])
}

async function firstCommit(targetDir) {
  return exec(targetDir, ['commit', '-m "first commit"'])
}

async function runGit(targetDir) {
  return await init(targetDir) && await addAllFilesToStage(targetDir) && await firstCommit(targetDir)
}

module.exports = {
  init,
  addAllFilesToStage,
  firstCommit,
  runGit
}
