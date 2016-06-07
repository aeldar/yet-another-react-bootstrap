import path from 'path';

import precss from 'precss';
import stylelint from 'stylelint';
import autoprefixer from 'autoprefixer';
import cssnano from 'cssnano';

// some path constants
const root = path.resolve(__dirname);
const src = path.join(root, 'src');
const modules = path.join(root, 'node_modules');
const dest = path.join(root, 'build');

export default {
  entry: {
    app: './src/app.js',
    vendor: ['react', 'react-dom'],
  },

  output: {
    path: dest,
    publicPath: '/',
    filename: 'scripts/[name].js',
  },

  module: {
    preLoaders: [
      {
        test: /\.(jsx?)$/,
        include: src,
        exclude: modules,
        loader: 'eslint-loader',
      },
    ],
    loaders: [
      {
        test: /\.jsx?$/,
        exclude: /(node_modules|bower_components)/,
        loader: 'react-hot!babel',
      },
      {
        test: /\.css$/,
        loader: 'style!css?modules&localIdentName=[name]__[local]__[hash:base64:5]!postcss',
      },
      {
        test: /\.sass/,
        loader: 'style!css!postcss!sass?outputStyle=expanded&indentedSyntax',
      },
      {
        test: /\.scss/,
        loader: 'style!css!postcss!sass?outputStyle=expanded',
      },
      {
        test: /\.less/,
        loader: 'style!css!postcss!less',
      },
      {
        test: /\.styl/,
        loader: 'style!css!postcss!stylus',
      },
      {
        test: /\.(png|jpg|gif|woff|woff2)$/,
        loader: 'url?limit=8192',
      },
      {
        test: /\.(mp4|ogg|svg)$/,
        loader: 'file',
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
