const MiniCssExtractPlugin = require("mini-css-extract-plugin");

function makeCssRules(extract) {
  let loaders = ['css-loader'];
  if (extract) {
    loaders.unshift(MiniCssExtractPlugin.loader);
  } else {
    loaders.unshift('style-loader');
  }
  return [
    { test: /\.css$/, loaders: loaders },
    {
      test: /\.s[ac]ss$/,
      loaders: loaders.concat([
        {
          loader: "sass-loader",
          options: { implementation: require('dart-sass') }
        }
      ])
    }
  ]
}

function makeCssPlugins(extract) {
  return extract ? [new MiniCssExtractPlugin({ filename: "[name].css", chunkFilename: "[id].css" })] : [];
}

module.exports = {
  makeCssRules,
  makeCssPlugins
}