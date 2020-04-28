const { asyncCopy, resolve } = require('../../../utils/file');

function copyskeletonApp(targetDir) {
  const src = resolve(__dirname, 'skeletonApp');
  return asyncCopy(src, targetDir, { clobber: false });
}

module.exports = copyskeletonApp;
