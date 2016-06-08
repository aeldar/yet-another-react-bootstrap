import baseConfig from './webpack.config.babel';

import webpack from 'webpack';
// import path from 'path';


const config = {
  devtool: 'eval-source-map',
};

// TODO Refactor
baseConfig.module.loaders = baseConfig.module.loaders.concat([
  {
    test: /\.jsx?$/,
    exclude: /(node_modules|bower_components)/,
    loader: 'react-hot!babel',
  },
]);

const plugins = [
  new webpack.NoErrorsPlugin(),
  new webpack.optimize.CommonsChunkPlugin('vendor', 'scripts/vendor.js'),
];

config.plugins = (baseConfig.plugins || []).concat(plugins);

export default Object.assign({}, baseConfig, config);
