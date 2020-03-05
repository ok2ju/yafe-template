const webpack = require('webpack')
const { resolve } = require('path')
const { baseConfig, rules, plugins } = require('./base')

require('dotenv').config()

const webpackConfig = Object.assign({}, baseConfig, {
  mode: 'development',
  devtool: 'source-map',
  output: {
    chunkFilename: 'scripts/[name].js',
    filename: 'scripts/[name].js',
    path: resolve(__dirname, 'devel')
  },
  module: {
    rules: [...rules]
  },
  plugins: [
    ...plugins,
    new webpack.HotModuleReplacementPlugin(),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('development')
      }
    })
  ],
  devServer: {
    contentBase: resolve(__dirname, 'devel'),
    publicPath: process.env.APP_PREFIX,
    historyApiFallback: {
      index: `${process.env.APP_PREFIX}/index.html`
    },
    disableHostCheck: true,
    host: '0.0.0.0',
    allowedHosts: [
      'localhost'
    ],
    port: process.env.APP_PORT,
    inline: true,
    hot: true
  }
})

module.exports = webpackConfig
