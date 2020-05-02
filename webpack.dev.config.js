const path = require('path');
const miniCss = require('mini-css-extract-plugin');

module.exports = {
  mode: 'development',
  entry: './resources/js/App.js',
  output: {
    path: path.resolve(__dirname, 'build'),
    filename: 'App.js'
  },
  devtool: 'eval',
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
 ],
 devServer: {
    hot: false,
    port: 5000,
    host: 'localhost',
    overlay: true,
    contentBase: path.join(__dirname, 'build'),
    writeToDisk: true,
    watchOptions: {
      aggregateTimeout: 200,
      poll: 1000,
    },
  },
};