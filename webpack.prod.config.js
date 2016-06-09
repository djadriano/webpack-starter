// ------------------------------------------------------------------
// Default Dependencies
// ------------------------------------------------------------------

var path              = require('path');
var webpack           = require('webpack');
var precss            = require('precss');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var rootPath          = path.resolve( __dirname );

// ------------------------------------------------------------------
// Postcss Plugins
// ------------------------------------------------------------------

var autoprefixer  = require('autoprefixer');
var postcssImport = require('postcss-import');
var stylelint     = require("stylelint");

// ------------------------------------------------------------------
// Initialize Config
// ------------------------------------------------------------------

module.exports = {
  devtool: 'source-map',
  entry: [
    './app/source/javascripts/index.jsx'
  ],
  output: {
    path: path.resolve(rootPath, 'dist'),
    filename: "bundle.js"
  },
  module: {
     loaders: [
       {
         test: /\.jsx?$/,
         exclude: /(node_modules)/,
         loaders: ['react-hot', 'babel']
       },
       {
          test: /\.scss$/,
          loaders: ['style', 'css', 'postcss', 'sass']
       },
       {
          test: /\.(png|jpg)$/,
          loader: 'file-loader'
       },
       {
        test: /\.(ttf|eot|svg|woff(2)?)(\w+)?$/,
        loader: 'file'
       }
     ]
   },
   resolve: {
     extensions: ['', '.js', '.jsx', '.scss']
   },
   postcss: function (webpack) {
      return [
        precss,
        autoprefixer,
        stylelint(),
        postcssImport({
          addDependencyTo: webpack
        })
      ];
   },
   plugins: [
      new webpack.HotModuleReplacementPlugin(),
      new webpack.optimize.DedupePlugin(),
      new HtmlWebpackPlugin({
        template: './layouts/index.html'
      }),
      new webpack.optimize.UglifyJsPlugin({
          compress: {
              warnings: true
          }
      })
   ]
}
