const commons = require("./webpack.common.js");
const wmerge = require("webpack-merge");
const webpack = require("webpack");

module.exports = wmerge(commons, {
	mode: "development",
	devtool: "inline-source-map",
	devServer: {
		contentBase: commons.output.path,
		open: false,
		hot: true
	},
	plugins: [
		new webpack.HotModuleReplacementPlugin()
	]
});