const { join } = require('path')

const CleanWebpackPlugin = require('clean-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const VueLoaderPlugin = require('vue-loader/lib/plugin')

const isProduction = process.env.NODE_ENV === 'production'
const site = join(__dirname, 'site')

module.exports = (env = {}) => ({
  mode: isProduction ? 'production' : 'development',
  entry: join(site, 'main.js'),
  output: {
    path: join(site, 'dist'),
    filename: 'js/[name].[chunkhash].js'
  },
  resolve: {
    extensions: ['.js', '.vue', '.json'],
    alias: {
      '@': site
    }
  },
  plugins: [
    ...(env.singleRun ? [
      new CleanWebpackPlugin(['site/dist'])
    ] : []),
    new HtmlWebpackPlugin({ template: './site/index.html' }),
    new VueLoaderPlugin()
  ],
  module: {
    rules: [
      { test: /\.js$/, exclude: /node_modules/, loader: 'babel-loader' },
      { test: /\.vue$/, exclude: /node_modules/, loader: 'vue-loader' }
    ]
  }
})
