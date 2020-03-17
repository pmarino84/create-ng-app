const path = require("path");

const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");

const SRC_FOLDER_NAME = "src";
const BUILD_FOLDER_NAME = "build";
const STATIC_FOLDER_NAME = "static";

const SRC_FOLDER = path.resolve(__dirname, SRC_FOLDER_NAME);
const BUILD_FOLDER = path.resolve(__dirname, BUILD_FOLDER_NAME);
const STATIC_FOLDER = path.resolve(__dirname, STATIC_FOLDER_NAME);

module.exports = {
	context: SRC_FOLDER,
	entry: {
		app: "./index.js"
	},
	output: {
		path: BUILD_FOLDER,
		filename: "[name].bundle.js",
		sourceMapFilename: "sourcemaps/[name].map"
	},
	resolve: {
		extensions: [".ts", ".js", ".html", ".css", ".sass", ".scss"]
	},
	optimization: {
		splitChunks: {
			cacheGroups: {
				commons: {
					name: "vendors",
					test: /[\\/]node_modules[\\/]/,
					chunks: "all"
				}
			}
		}
	},
	module: {
		rules: [
			{ test: /\.html$/, exclude: /node_modules/, loader: "html-loader?exportAsEs6Default" },
			{ test: /\.js$/, exclude: /node_modules/, loaders: ["babel-loader"] },
			{ test: /\.ts$/, exclude: /node_modules/, loaders: ["babel-loader", "ts-loader"] },
			{ test: /\.css$/, loaders: [MiniCssExtractPlugin.loader, "css-loader"] },
			{
				test: /\.s[ac]ss$/,
				loaders: [
					MiniCssExtractPlugin.loader,
					"css-loader",
					{
						loader: "sass-loader",
						options: { implementation: require('dart-sass') }
					}
				]
			},
			{
				test: /\.(png|jpe?g|gif|svg)$/i,
				use: [
					{
						loader: 'file-loader',
					},
				],
			}
		]
	},
	plugins: [
		new CleanWebpackPlugin(),
		new HtmlWebpackPlugin({ template: path.resolve(STATIC_FOLDER, "index.html"), inject: "body" }),
		new MiniCssExtractPlugin({ filename: "[name].css", chunkFilename: "[id].css" }),
		new CopyWebpackPlugin([{
			from: STATIC_FOLDER,
			to: BUILD_FOLDER,
			ignore: ["index.html"]
		}])
	]
};