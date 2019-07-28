const path = require('path')
const webpack = require('webpack')
const {
  CleanWebpackPlugin
} = require('clean-webpack-plugin')

const {
  VueLoaderPlugin
} = require('vue-loader')

module.exports = {
  mode: 'development',
  entry: {
    // Set the single-spa config as the project entry point
    'single-spa.config': './single-spa.config.js',
  },
  output: {
    publicPath: '/dist/',
    filename: '[name].js',
    path: path.resolve(__dirname, 'dist'),
  },
  module: {
    rules: [{
      // Webpack style loader added so we can use materialize
      test: /\.css$/,
      use: ['style-loader', 'css-loader']
    },{
      test: /\.sass$/,
      use: [
        'vue-style-loader',
        'css-loader',
        {
          loader: 'sass-loader',
          options: {
            indentedSyntax: true
          }
        }
      ]
    }, {
      test: /\.scss$/,
      use: [
        'vue-style-loader',
        // 'css-loader',
        {
          loader: 'sass-loader',
          options: {
            indentedSyntax: true
          }
        }
      ]
    }, {
      test: /\.js$/,
      exclude: [path.resolve(__dirname, 'node_modules')],
      loader: 'babel-loader',
    }, {
      test: /\.vue$/,
      exclude: [path.resolve(__dirname, 'node_modules')],
      loader: 'vue-loader'
    }, {
      // This plugin will allow us to use AngularJS HTML templates
      test: /\.html$/,
      exclude: /node_modules/,
      loader: 'html-loader',
    }, {
      test: /\.(jpe?g|png|gif|woff|woff2|eot|ttf|svg)(\?[a-z0-9=.]+)?$/,
      loader: 'url-loader?limit=100000' }
    ],
  },
  node: {
    fs: 'empty'
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src/test/src/'),
      '@assets': path.resolve(__dirname, 'src/test/src/assets'),
    },
    modules: [path.resolve(__dirname, 'node_modules')],
  },
  plugins: [
    // 请确保引入这个插件！
    new VueLoaderPlugin(),
    // A webpack plugin to remove/clean the output folder before building
    new CleanWebpackPlugin(),
  ],
  devtool: 'source-map',
  externals: [],
  devServer: {
    historyApiFallback: true
  }
}