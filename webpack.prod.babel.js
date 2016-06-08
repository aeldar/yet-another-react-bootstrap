import baseConfig from './webpack.config.babel';

const myVars = baseConfig.myVars;

import webpack from 'webpack';
// import path from 'path';

import HtmlWebpackPlugin from 'html-webpack-plugin';
import CopyWebpackPlugin from 'copy-webpack-plugin';


const config = {
  output: {
    path: 'build',
    publicPath: '/',
    filename: 'scripts/[name].[chunkhash].js',
  },
};

// TODO Refactor
// add js/jsx loader
baseConfig.module.loaders.concat([
  {
    test: /\.jsx?$/,
    exclude: /(node_modules|bower_components)/,
    loader: 'babel',
  },
]);

// PLUGINS
const plugins = [
  new webpack.DefinePlugin({
    'process.env': {
      NODE_ENV: JSON.stringify('production'),
    },
  }),
  new webpack.optimize.CommonsChunkPlugin('vendor', 'scripts/vendor.[chunkhash].js'),
  new HtmlWebpackPlugin({
    title: 'My App',
    template: 'pug-html!static/index.pug',
  }),
  new webpack.optimize.DedupePlugin(),
  new CopyWebpackPlugin([
    { from: `${myVars.paths.staticSrc}/*.txt`, to: myVars.paths.dest },
    { from: `${myVars.paths.staticSrc}/*.ico` },
  ]),
  new webpack.optimize.UglifyJsPlugin({
    compress: {
      warnings: false,
    },
  }),
];

config.plugins = (baseConfig.plugins || []).concat(plugins);

export default Object.assign({}, baseConfig, config);
