import baseConfig from './webpack.config.babel';

const customVars = baseConfig.customVars;

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
// TODO refactor
// apply extract-text-plugin for every css loader
/*baseConfig.module.loaders = baseConfig.module.loaders.map((item) => {
  if (!item.test.toString().match(/css/)) {
    return item;
  }
  let o = Object.assign(
    {},
    item,
    { loader: extractCSS.extract((item.loader) ? item.loader : item.loaders) }
  );
  if (o.loaders) {
    delete o.loaders;
  }
  return o;
});

console.log(baseConfig.module.loaders);*/

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
    { from: `${customVars.paths.staticSrc}/*.txt`, to: customVars.paths.dest },
    { from: `${customVars.paths.staticSrc}/*.ico` },
  ]),
  new webpack.optimize.UglifyJsPlugin({
    compress: {
      warnings: false,
    },
  }),
];

config.plugins = (baseConfig.plugins || []).concat(plugins);

export default Object.assign({}, baseConfig, config);
