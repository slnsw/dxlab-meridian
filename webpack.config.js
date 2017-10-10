require('dotenv').config();

var webpack = require('webpack');
var path = require('path');
var HtmlReplaceWebpackPlugin = require('html-replace-webpack-plugin');
var CleanWebpackPlugin = require('clean-webpack-plugin');
var CopyWebpackPlugin = require('copy-webpack-plugin');
var HtmlWebpackPlugin = require('html-webpack-plugin');

console.log(`GOOGLE_ANALYTICS_ID: ${process.env.GOOGLE_ANALYTICS_ID}`);

module.exports = {
	context: path.join(__dirname, '/'),
	entry: ['./public/js/app.js'],
	output: {
		path: path.join(__dirname, '/build'),
		filename: 'js/app.min.js',
		publicPath: '/public/'
	},
	plugins: [
		new CleanWebpackPlugin([ 'build' ]),
    new CopyWebpackPlugin([
      { from: 'public' }
    ]),
		new webpack.optimize.UglifyJsPlugin({
      compress: { warnings: false }
	  }),
    new HtmlWebpackPlugin(
    {
      title: 'Foo',
      filename: 'index.html',
      template: 'public/index.html',
      inject: true,
      minify: false,
      chunks: 'all',
      chunksSortMode: 'auto'
    }),
    new HtmlReplaceWebpackPlugin([
      {
        pattern: '@@google-analytics-id',
        replacement: process.env.GOOGLE_ANALYTICS_ID
      },
			{
				pattern: 'app.js',
				replacement: 'app.min.js'
			}
    ])
  ]
};
