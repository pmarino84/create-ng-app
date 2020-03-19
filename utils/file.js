const fs = require('fs');
const ncp = require('ncp');
const { promisify } = require('util');

const asyncFsAccess = promisify(fs.access);
const asyncCopy = promisify(ncp);

const asyncAccessRead = (pathToFile) => asyncFsAccess(pathToFile, fs.constants.R_OK);

const directoryExist = (dir) => fs.existsSync(dir);

function makedir(dir) {
  return new Promise((resolve, reject) => {
    try {
      if (!directoryExist(dir)) {
        fs.mkdirSync(dir);
      }
      resolve(dir);
    } catch (ex) {
      reject(ex);
    }
  });
}

const asyncReadFile = (pathToFile) => asyncAccessRead(pathToFile).then(() => {
  return new Promise((resolve, reject) => {
    try {
      const data = fs.readFileSync(pathToFile, 'utf8');
      resolve(data);
    } catch (ex) {
      reject(ex);
    }
  });
});

const writeFile = (pathToFile, content) => {
  let success = true;
  try {
    fs.writeFileSync(pathToFile, content);
  } catch (ex) {
    console.error(ex);
    success = false;
  }
  return success;
};

module.exports = {
  directoryExist,
  makedir,
  asyncFsAccess,
  asyncAccessRead,
  asyncCopy,
  asyncReadFile,
  writeFile
};
