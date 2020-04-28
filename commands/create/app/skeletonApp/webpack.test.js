const commons = require('./webpack.common')
const wmerge = require('webpack-merge')
// const BabelMinifyWebpackPlugin = require('babel-minify-webpack-plugin')
const { makeCssPlugins, makeCssRules } = require('./webpack.utils')

module.exports = wmerge(commons, {
  mode: 'none',
  // devtool: 'source-map',
  module: {
    rules: makeCssRules(true)
  },
  plugins: [
    ...makeCssPlugins(true)
    // new BabelMinifyWebpackPlugin({}, {})
  ],
  externals: {
    angular: 'angular'
  }
})
