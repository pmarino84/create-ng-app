const path = require('path');
const { asyncAccessRead, asyncCopy } = require('./file');

const copySkeletonFiles = (skeletonDir, targetDir) => asyncCopy(skeletonDir, targetDir, { clobber: false });

module.exports = function copySkeleton(targetDir) {
  const skeletonDir = path.resolve(__dirname, '..', 'skeleton');
  return asyncAccessRead(skeletonDir).then(() => copySkeletonFiles(skeletonDir, targetDir));
};