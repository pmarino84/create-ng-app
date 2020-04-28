const MiniCssExtractPlugin = require('mini-css-extract-plugin')

function makeCssRules(extract) {
  const moduleLoaders = [{ loader: 'css-loader', options: { importLoaders: 1, modules: true } }]
  const loaders = [{ loader: 'css-loader', options: { importLoaders: 1, modules: true } }]
  if (extract) {
    moduleLoaders.unshift(MiniCssExtractPlugin.loader)
    loaders.unshift(MiniCssExtractPlugin.loader)
  } else {
    moduleLoaders.unshift('style-loader')
    loaders.unshift('style-loader')
  }
  return [
    { test: /\.css$/, loaders: moduleLoaders, include: /\.module\.css$/ },
    {
      test: /\.s[ac]ss$/,
      loaders: moduleLoaders.concat([
        {
          loader: 'sass-loader',
          options: { implementation: require('dart-sass') }
        }
      ]),
      include: /\.module\.s[ac]ss$/
    },
    { test: /\.css$/, loaders: loaders, exclude: /\.module\.css$/ },
    {
      test: /\.s[ac]ss$/,
      loaders: loaders.concat([
        {
          loader: 'sass-loader',
          options: { implementation: require('dart-sass') }
        }
      ]),
      exclude: /\.module\.css$/
    }
  ]
}

function makeCssPlugins(extract) {
  return extract ? [new MiniCssExtractPlugin({ filename: '[name].[hash].css', chunkFilename: '[id].css' })] : []
}

module.exports = {
  makeCssRules,
  makeCssPlugins
}
