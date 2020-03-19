const commons = require("./webpack.common.js");
const wmerge = require("webpack-merge");
const BabelMinifyWebpackPlugin = require("babel-minify-webpack-plugin");
const { makeCssPlugins, makeCssRules } = require("./webpack.utils");

module.exports = wmerge(commons, {
	mode: "production",
	devtool: "source-map",
	module: {
		rules: makeCssRules(true)
	},
	plugins: [
		...makeCssPlugins(true),
		new BabelMinifyWebpackPlugin({}, {})
	]
});