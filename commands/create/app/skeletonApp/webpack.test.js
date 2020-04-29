const commons = require('./webpack.base')
const wmerge = require('webpack-merge')
const { makeCssPlugins, makeCssRules } = require('./webpack/utils')

module.exports = wmerge(commons, {
  mode: 'none',
  // devtool: 'source-map',
  module: {
    rules: makeCssRules(true)
  },
  plugins: [
    ...makeCssPlugins(true)
  ],
  externals: {
    angular: 'angular'
  }
})
