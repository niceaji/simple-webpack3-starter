const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const dist = path.join(__dirname, 'dist');
const isProduction = (process.env.NODE_ENV === 'production');


const config = {

  entry: './src/index.js',
  devServer: {
    contentBase: dist,
    port: 9000,
    // compress: true,
    // allowedHosts: ['local.com']
  },
  output: {
    filename: 'app.js',
    path: dist
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        loader: 'babel-loader'
      },
      {
        test: /\.(css|scss)$/,
        use: ['style-loader', 'css-loader'],
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: 'css-loader'
        })
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html'
    }),
    new ExtractTextPlugin('app.css')
  ]

}

if(isProduction) {
  config.plugins.push(new UglifyJSPlugin());
}

module.exports = config;