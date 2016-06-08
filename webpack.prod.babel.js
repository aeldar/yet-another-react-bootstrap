import baseConfig from './webpack.config.babel';

import webpack from 'webpack';

const config = {
  output: {
    path: 'build',
    publicPath: '/',
    filename: 'scripts/[name].[chunkhash].js',
  },
};

// TODO Refactor
// add js/jsx loader
baseConfig.module.loaders = baseConfig.module.loaders.concat([
  {
    test: /\.jsx?$/,
    exclude: /(node_modules|bower_components)/,
    loader: 'babel',
  },
]);

// PLUGINS
const plugins = [
  new webpack.optimize.CommonsChunkPlugin('vendor', 'scripts/vendor.[chunkhash].js'),
  new webpack.optimize.UglifyJsPlugin({
    compress: {
      warnings: false,
    },
  }),
];

config.plugins = (baseConfig.plugins || []).concat(plugins);

export default Object.assign({}, baseConfig, config);
