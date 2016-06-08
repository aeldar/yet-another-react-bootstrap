import path from 'path';

import precss from 'precss';
import stylelint from 'stylelint';
import autoprefixer from 'autoprefixer';
import cssnano from 'cssnano';

// some path constants
const root = path.resolve(__dirname);
const src = path.join(root, 'src');
const modules = path.join(root, 'node_modules');
const modulesBower = path.join(root, 'bower_components');
const dest = path.join(root, 'build');
const staticSrc = path.join(root, 'static');

const cssModuleClassNameTemplate = '[name]__[local]__[hash:base64:5]';
// no need anymore due to exclude/include options inside loaders
// const testCssExcludingStatic = /^(?![./]*static\/).+\.css$/;

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

      // CSS Modules part
      {
        test: /\.css$/,
        exclude: [staticSrc, /(node_modules|bower_components)/],
        loader: `style!css?modules&localIdentName=${cssModuleClassNameTemplate}!postcss`,
      },
      {
        test: /\.sass/,
        exclude: [staticSrc, /(node_modules|bower_components)/],
        loaders: [
          'style',
          `css?modules&localIdentName=${cssModuleClassNameTemplate}`,
          'postcss',
          'sass?outputStyle=expanded&indentedSyntax',
        ],
      },
      {
        test: /\.scss/,
        exclude: [staticSrc, /(node_modules|bower_components)/],
        loaders: [
          'style',
          `css?modules&localIdentName=${cssModuleClassNameTemplate}`,
          'postcss',
          'sass?outputStyle=expanded',
        ],
      },
      {
        test: /\.less/,
        exclude: [staticSrc, /(node_modules|bower_components)/],
        loader: `style!css?modules&localIdentName=${cssModuleClassNameTemplate}!postcss!less`,
      },
      {
        test: /\.styl/,
        exclude: [staticSrc, /(node_modules|bower_components)/],
        loader: `style!css?modules&localIdentName=${cssModuleClassNameTemplate}!postcss!stylus`,
      },

      // CSS without modules part
      {
        test: /\.css$/,
        include: [staticSrc, /(node_modules|bower_components)/],
        loader: 'style!css!postcss',
      },
      {
        test: /\.sass/,
        include: [staticSrc, /(node_modules|bower_components)/],
        loader: 'style!css!postcss!sass?outputStyle=expanded&indentedSyntax',
      },
      {
        test: /\.scss/,
        include: [staticSrc, /(node_modules|bower_components)/],
        loader: 'style!css!postcss!sass?outputStyle=expanded',
      },
      {
        test: /\.less/,
        include: [staticSrc, /(node_modules|bower_components)/],
        loader: 'style!css!postcss!less',
      },
      {
        test: /\.styl/,
        include: [staticSrc, /(node_modules|bower_components)/],
        loader: 'style!css!postcss!stylus',
      },

      // Media
      {
        test: /\.(png|jpg|gif|svg)$/,
        loader: 'url?name=images/[name].[hash:base64:8].[ext]&limit=8192',
      },
      {
        test: /\.(woff|woff2)$/,
        loader: 'url?limit=8192',
      },
      {
        test: /\.(mp4|ogg)$/,
        loader: 'file',
      },
    ],
  },

  plugins: [],

  // should be in main config as it is used by eslint to fix import/resolving
  resolve: {
    root: path.join(src, modules, modulesBower),
    alias: {
      static: staticSrc,
      components: path.join(src, 'components'),
      containers: path.join(src, 'containers'),
      config: path.join(root, 'config'),
    },
  },

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
