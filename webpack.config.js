const { join } = require('path')

const CleanWebpackPlugin = require('clean-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const VueLoaderPlugin = require('vue-loader/lib/plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin')

const isProduction = process.env.NODE_ENV === 'production'
const site = join(__dirname, 'site')
const cssProcessorOptions = { discardComments: { removeAll: true } }
const cssLoaderOptions = { importLoaders: isProduction ? 2 : 1 }

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
    new VueLoaderPlugin(),
    ...(isProduction ? [
      new OptimizeCssAssetsPlugin({ cssProcessorOptions }),
      new MiniCssExtractPlugin({ filename: 'css/[name].[hash].css' })
    ] : [])
  ],
  module: {
    rules: [
      { test: /\.js$/, exclude: /node_modules/, loader: 'babel-loader' },
      { test: /\.vue$/, exclude: /node_modules/, loader: 'vue-loader' },
      {
        test: /\.css$/,
        use: [
          isProduction ? MiniCssExtractPlugin.loader : 'style-loader',
          { loader: 'css-loader', options: cssLoaderOptions },
          {
            loader: 'postcss-loader',
            options: { plugins: [require('autoprefixer')()] }
          },
          ...(isProduction ? [
            {
              loader: '@fullhuman/purgecss-loader',
              options: {
                content: [join(site, 'index.html')],
                whitelistPatterns: [
                  /hljs/
                ]
              }
            }
          ] : [])
        ]
      }
    ]
  }
})
