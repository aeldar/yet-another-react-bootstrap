import baseConfig from './webpack.config.babel';

import webpack from 'webpack';
// import path from 'path';

import HtmlWebpackPlugin from 'html-webpack-plugin';

const config = {
  devServer: {
    contentBase: './src/',
    historyApiFallback: true,
    hot: true,
    port: 3000,
    // publicPath: defaultSettings.publicPath,
    noInfo: false,
  },
};

const plugins = [
  new webpack.DefinePlugin({
    'process.env': {
      NODE_ENV: JSON.stringify('development'),
    },
  }),
  new webpack.NoErrorsPlugin(),
  new webpack.optimize.CommonsChunkPlugin('vendor', 'scripts/vendor.js'),
  new HtmlWebpackPlugin({
    title: 'My App (Development)',
    template: 'pug-html!./src/index.pug',
  }),
  new webpack.optimize.DedupePlugin(),
];

config.plugins = (baseConfig.plugins || []).concat(plugins);

export default Object.assign({}, baseConfig, config);
