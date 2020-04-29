const path = require('path')

const SRC_FOLDER_NAME = 'src'
const BUILD_FOLDER_NAME = 'build'
const STATIC_FOLDER_NAME = 'static'

const SRC_FOLDER = path.resolve(process.cwd(), SRC_FOLDER_NAME)
const BUILD_FOLDER = path.resolve(process.cwd(), BUILD_FOLDER_NAME)
const STATIC_FOLDER = path.resolve(process.cwd(), STATIC_FOLDER_NAME)

module.exports = {
  SRC_FOLDER_NAME,
  BUILD_FOLDER_NAME,
  STATIC_FOLDER_NAME,
  SRC_FOLDER,
  BUILD_FOLDER,
  STATIC_FOLDER
}
