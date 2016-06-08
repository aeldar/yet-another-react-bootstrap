const config = {
  devtool: 'eval-source-map',
};

const loaders = [
  {
    test: /\.jsx?$/,
    exclude: /(node_modules|bower_components)/,
    loader: 'babel-loader',
  },
];

const plugins = [];

function addTestOptions(origConfig) {
  const devConfig = Object.assign({}, origConfig, config);
  devConfig.module.loaders.push(...loaders);
  devConfig.plugins.push(...plugins);
  return devConfig;
}

export default addTestOptions;
