const commons = require("./webpack.common.js");
const wmerge = require("webpack-merge");
const BabelMinifyWebpackPlugin = require("babel-minify-webpack-plugin");

module.exports = wmerge(commons, {
	mode: "production",
	devtool: "source-map",
	plugins: [
		new BabelMinifyWebpackPlugin({}, {})
	]
});