const webpack = require('webpack')
const path = require('path')
const TerserPlugin = require('terser-webpack-plugin')
const { baseConfig, rules, plugins } = require('./base')

require('dotenv').config()

const webpackConfig = Object.assign({}, baseConfig, {
  mode: 'production',
  stats: false,
  devtool: 'cheap-module-source-map',
  output: {
    chunkFilename: 'scripts/[name].js',
    filename: 'scripts/[name].js',
    path: path.resolve(__dirname, '../build'),
    publicPath: '/'
  },
  module: {
    rules: [...rules]
  },
  plugins: [
    ...plugins,
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('production')
      }
    })
  ],
  optimization: {
    minimize: true,
    minimizer: [
      new TerserPlugin({
        sourceMap: true
      })
    ]
  }
})

module.exports = webpackConfig
