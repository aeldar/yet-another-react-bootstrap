import baseConfig from './webpack.config.babel';

import webpack from 'webpack';
// import path from 'path';

import HtmlWebpackPlugin from 'html-webpack-plugin';

const config = {
  output: {
    path: 'build',
    publicPath: '/',
    filename: 'scripts/[name]-[chunkhash].js',
  },
};

// TODO Refactor
baseConfig.module.loaders.concat([
  {
    test: /\.jsx?$/,
    exclude: /(node_modules|bower_components)/,
    loader: 'babel',
  },
]);

const plugins = [
  new webpack.DefinePlugin({
    'process.env': {
      NODE_ENV: JSON.stringify('production'),
    },
  }),
  new webpack.optimize.CommonsChunkPlugin('vendor', 'scripts/vendor-[chunkhash].js'),
  new HtmlWebpackPlugin({
    title: 'My App',
    template: 'pug-html!./src/index.pug',
  }),
  new webpack.optimize.DedupePlugin(),
];

config.plugins = (baseConfig.plugins || []).concat(plugins);

export default Object.assign({}, baseConfig, config);
