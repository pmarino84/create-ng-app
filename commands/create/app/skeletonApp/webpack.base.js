const wmerge = require('webpack-merge')
const commons = require('./webpack/commons')
const { page } = require('./webpack/utils')
const { STATIC_FOLDER } = require('./webpack/constants')

module.exports = wmerge(commons, page('app', null, './index.js', STATIC_FOLDER + '/index.html', null, ['vendors~app']))
