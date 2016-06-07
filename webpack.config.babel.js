import precss from 'precss';
import stylelint from 'stylelint';
import autoprefixer from 'autoprefixer';
import cssnano from 'cssnano';

export default {
  entry: {
    app: './src/app.js',
    vendor: ['react', 'react-dom'],
  },

  output: {
    path: 'build',
    publicPath: '',
    filename: 'scripts/[name].js',
  },

  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        exclude: /(node_modules|bower_components)/,
        loader: 'babel',
      },
      {
        test: /\.css$/,
        loader: 'style!css?modules&localIdentName=[name]__[local]__[hash:base64:5]!postcss',
      },
    ],
  },

  plugins: [],

  postcss() {
    return [
      precss,
      stylelint,
      autoprefixer({
        browsers: ['> 1%', 'last 15 versions'],
      }),
      cssnano,
    ];
  },
};
