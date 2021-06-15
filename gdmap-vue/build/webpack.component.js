const path = require('path')
const webpack = require('webpack')
const config = require('./config')
const utils = require('./utils')
const vueLoaderConfig = require('./vue-loader.conf')
const OptimizeCSSPlugin = require('optimize-css-assets-webpack-plugin')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
const components = require('./components.json');
// const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin

const basePath = path.resolve(__dirname, '../');

let entries = {};

Object.keys(components).forEach(key => {
  entries[key] = path.join(basePath, components[key]);
});

function resolve (dir) {
  return path.join(__dirname, '..', dir)
}

module.exports = {
  entry: entries,
  output: {
    path: path.resolve(__dirname, '../lib'),
    publicPath: '/lib/',
    filename: '[name].js',
    chunkFilename: '[id].js',
    libraryTarget: 'umd',
    umdNamedDefine: true
  },
  externals: config.externals,
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader'
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.(gif|jpg|png|woff|svg|eot|ttf)\??.*$/,
        loader: 'url-loader?limit=8192'
      },
      ...utils.styleLoaders({
        sourceMap: true,
        extract: true,
        usePostCSS: true
      })
    ],
  },
  plugins: [
    new webpack.optimize.ModuleConcatenationPlugin(),
    new UglifyJsPlugin({
      uglifyOptions: {
        compress: {
          warnings: false
        }
      },
      sourceMap: false,
      parallel: true
    }),
    new OptimizeCSSPlugin({
      cssProcessorOptions: { safe: true }
    }),
    // new BundleAnalyzerPlugin()
  ],
  resolve: {
    extensions: ['.js', '.vue', '.json'],
    alias: {
      '@': resolve('demo/src'),
      'lhp-amap': resolve(''),
    }
  }
}