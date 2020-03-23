const execa = require('execa');

async function init(targetDir) {
  let success = false;
  const result = await execa('git', ['init'], { cwd: targetDir });
  success = !result.failed
  return success;
}

module.exports = {
  init
}
