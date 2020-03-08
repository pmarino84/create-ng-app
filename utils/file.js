const fs = require('fs');

const directoryExist = (dir) => fs.existsSync(dir);

function makedir(dir) {
  return new Promise((resolve, reject) => {
    try {
      if (directoryExist(dir)) {
        throw new Error(`Directory ${dir} already exist`);
      } else {
        fs.mkdirSync(dir, { recursive: true });
        resolve(dir);
      }
    } catch (ex) {
      reject(ex);
    }
  });
};

module.exports = {
  directoryExist,
  makedir
};
