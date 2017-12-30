const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const dist = path.join(__dirname, 'dist');
const isProduction = process.env.NODE_ENV === 'production';
const presets = [
  [
    'env',
    {
      targets: {
        browsers: ['last 2 versions', '> 5% in KR']
      },
      debug: true
    }
  ]
];

const config = {
  entry: './src/index.js',
  devtool: 'eval',
  devServer: {
    contentBase: dist,
    port: 9000,
    compress: true
  },
  output: {
    filename: 'app.js',
    path: dist
  },
  resolve: {
    modules: ['node_modules', 'src'],
    extensions: ['.json', '.js']
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        loader: 'babel-loader',
        options: { presets: presets },
        exclude: /node_modules/
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
};

if (isProduction) {
  config.devtool = 'sourcemap';
  config.plugins.push(
    new webpack.optimize.UglifyJsPlugin({
      sourceMap: true,
      compress: {
        warnings: false
      }
    })
  );
  config.plugins.push(
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('production')
    })
  );
}

module.exports = config;
