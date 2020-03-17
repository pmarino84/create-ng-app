const commons = require("./webpack.common.js");
const wmerge = require("webpack-merge");
const webpack = require("webpack");
const { makeCssPlugins, makeCssRules } = require("./webpack.utils");

module.exports = wmerge(commons, {
	mode: "development",
	devtool: "inline-source-map",
	devServer: {
		contentBase: commons.output.path,
		watchContentBase: true,
		open: true,
		hot: true
	},
	module: {
		rules: makeCssRules(false)
	},
	plugins: [
		...makeCssPlugins(false),
		new webpack.HotModuleReplacementPlugin()
	]
});