const path = require('path');
const fs = require('fs');
const ncp = require('ncp');
const { promisify } = require('util');
const chalk = require('chalk');

const asyncAccess = promisify(fs.access);
const asyncCopy = promisify(ncp);

const copySkeletonFiles = (templateDir, targetDir) => asyncCopy(templateDir, targetDir, { clobber: false });

module.exports = function copySkeleton() {
  const templateDir = path.resolve(__dirname, '..', 'skeleton');
  console.log("cwd: ", process.cwd());
  console.log("dirname: ", __dirname);
  console.log("copy template dir: ", templateDir);

  return asyncAccess(templateDir, fs.constants.R_OK)
    .then(() => copySkeletonFiles(templateDir, process.cwd()))
    .catch(rej => {
      console.error('%s Invalid template name', chalk.red.bold('ERROR'));
      process.exit(1);
    });
};