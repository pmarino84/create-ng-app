const path = require('path');
const ncp = require('ncp');
const { constants, access, accessSync, existsSync, mkdirSync, readFileSync, writeFileSync } = require('fs');

const F_OK = constants.F_OK;
const R_OK = constants.R_OK;
const W_OK = constants.W_OK;

/**
 * The right-most parameter is considered {to}.  Other parameters are considered an array of {from}.
 *
 * Starting from leftmost {from} parameter, resolves {to} to an absolute path.
 *
 * If {to} isn't already absolute, {from} arguments are prepended in right to left order,
 * until an absolute path is found. If after using all {from} paths still no absolute path is found,
 * the current working directory is used as well. The resulting path is normalized,
 * and trailing slashes are removed unless the path gets resolved to the root directory.
 *
 * @param {Array<string>} pathSegments string paths to join.  Non-string arguments are ignored.
 */
const resolve = (...pathSegments) => path.resolve(...pathSegments);

/**
 * Tests whether or not the given path exists by checking with the file system.
 * @param {string} path A path to a file or directory. If a URL is provided, it must use the `file:` protocol.
 * URL support is _experimental_.
 */
const exists = path => existsSync(path);

const existsV2 = path => accessSync(path, F_OK);

const asyncExistsV2 = path => asyncAccess(path);

const asyncAccess = (path, mode) => new Promise((resolve, reject) => access(path, mode || F_OK, (err) => {
  if (err) reject(err);
  else resolve(path);
}));

const asyncAccessRead = path => asyncAccess(path, F_OK | R_OK);

const asyncAccessWrite = path => asyncAccess(path, F_OK | W_OK);

const asyncAccessReadWrite = path => asyncAccess(path, F_OK | R_OK | W_OK);

/**
 * Synchronous mkdir(2) - create a directory.
 * @param {string}  path  A path to a file. If a URL is provided, it must use the `file:` protocol.
 * should be created. If a string is passed, it is parsed as an octal integer. If not specified, defaults to `0o777`.
 */
const mkdir = (path) => mkdirSync(path);

/**
 * Synchronously reads the entire contents of a file.
 * @param path A path to a file. If a URL is provided, it must use the `file:` protocol.
 * URL support is _experimental_.
 */
const readFile = path => readFileSync(path, 'utf8');

/**
 * Synchronously writes data to a file, replacing the file if it already exists.
 * @param path A path to a file. If a URL is provided, it must use the `file:` protocol.
 * URL support is _experimental_.
 * If a file descriptor is provided, the underlying file will _not_ be closed automatically.
 * @param data The data to write. If something other than a Buffer or Uint8Array is provided, the value is coerced to a string.
 * @param options Either the encoding for the file, or an object optionally specifying the encoding, file mode, and flag.
 * If `encoding` is not supplied, the default of `'utf8'` is used.
 * If `mode` is not supplied, the default of `0o666` is used.
 * If `mode` is a string, it is parsed as an octal integer.
 * If `flag` is not supplied, the default of `'w'` is used.
 */
const writeFile = (path, data) => writeFileSync(path, data);

const asyncCopy = (src, dest, options) => new Promise((resolve, reject) => {
  ncp(src, dest, options, (err) => {
    if (err) reject(err);
    else resolve();
  });
});

async function asyncReadFile(path) {
  let data = null;
  if (await asyncAccessRead(path)) {
    data = readFile(path);
  }
  return data;
}

async function asyncWriteFile(path, data) {
  let success = false;
  if (await asyncAccessWrite(path)) {
    writeFile(path, data);
    success = true;
  }
  return success;
}

module.exports = {
  resolve,
  exists,
  existsV2,
  asyncExistsV2,
  asyncAccess,
  asyncAccessRead,
  asyncAccessReadWrite,
  asyncAccessWrite,
  mkdir,
  readFile,
  writeFile,
  asyncCopy,
  asyncReadFile,
  asyncWriteFile
};
