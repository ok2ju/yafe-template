const webpack = require('webpack')
const { resolve } = require('path')
const HTMLWebpackPlugin = require('html-webpack-plugin')
const packageJSON = require('../package.json')

const dir = {
  source: resolve(__dirname, '..', 'src'),
  modules: resolve(__dirname, '..', 'node_modules')
}

const baseConfig = {
  entry: {
    bundle: './src/index'
  },
  resolve: {
    extensions: ['.js', '.jsx'],
    modules: [
      dir.modules,
      dir.source
    ]
  }
}

const rules = [{
  enforce: 'pre',
  test: /\.jsx?$/,
  exclude: dir.modules,
  use: 'standard-loader'
}, {
  test: /\.jsx?$/,
  exclude: dir.modules,
  use: 'babel-loader'
}, {
  test: /\.(svg|png)$/,
  loader: 'file-loader',
  options: {
    name: 'icons/[name].[ext]'
  }
}, {
  test: /\.(ttf|otf)(\?[a-z0-9=&.]+)?$/,
  loader: 'url-loader',
  options: {
    limit: 1024,
    mimetype: 'application/octet-stream',
    name: 'fonts/[name].[ext]'
  }
}, {
  test: /\.woff(2)?(\?[a-z0-9=&.]+)?$/,
  loader: 'url-loader',
  options: {
    limit: 1024,
    mimetype: 'application/font-woff',
    name: 'fonts/[name].[ext]'
  }
}]

const plugins = [
  new webpack.NamedModulesPlugin(),
  new HTMLWebpackPlugin({
    inject: false,
    filename: 'index.html',
    template: './src/index.ejs',
    templateParameters: (_, assets) => ({
      appVersion: packageJSON.version,
      injectConfigValue: value => process.env[value], // env variables available due to dotenv
      htmlWebpackPlugin: {
        files: assets
      }
    })
  })
]

module.exports = {
  dir,
  baseConfig,
  rules,
  plugins
}
