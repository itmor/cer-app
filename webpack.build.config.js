const path = require('path');
const miniCss = require('mini-css-extract-plugin');

module.exports = {
  mode: 'production',
  entry: './resources/js/App.js',
  output: {
    path: path.resolve(__dirname, 'build'),
    filename: 'App.js'
  },
  module: {
    rules: [{
       test:/\.(s*)css$/,
       use: [
          miniCss.loader,
          'css-loader',
          'sass-loader',
       ]
    },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader"
        }
      }]
 },
 plugins: [
    new miniCss({
       filename: 'style.css',
    }),
 ]
};