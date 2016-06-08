import path from 'path';

import precss from 'precss';
import stylelint from 'stylelint';
import autoprefixer from 'autoprefixer';
import cssnano from 'cssnano';

const isDev = process.env.NODE_ENV === 'development';

import ExtractTextPlugin from 'extract-text-webpack-plugin';
const extractCSS = new ExtractTextPlugin('styles/[name].[chunkhash].css', {
  allChunks: true,
});

/**
 * Normalises loader array into a string, adds 'style!' prefix for dev mode,
 * or wraps into extractCSS.
 * Attention! Don't use "loaders" property, instead use "loader", because this function normalises
 * given loader array into a string!
 * @param loaderDefinition
 * @returns {string|array}
 */
const extractCSSWrapper = (function extractCSSWrapperFactory(extractCSSArg, isDevArg) {
  return function extractCSSWrapperInner(loaderDefinition) {
    const prefix = 'style!';
    const loaderNormalised = (Array.isArray(loaderDefinition)) ?
      loaderDefinition.join('!') : loaderDefinition;
    return (isDevArg) ? prefix + loaderNormalised : extractCSSArg.extract(loaderDefinition);
  };
}(extractCSS, isDev));


// some path constants
const root = path.resolve(__dirname);
const src = path.join(root, 'src');
const modules = path.join(root, 'node_modules');
const modulesBower = path.join(root, 'bower_components');
const dest = path.join(root, 'build');
const staticSrc = path.join(root, 'static');

const customVars = {
  paths: {
    root,
    src,
    modules,
    modulesBower,
    dest,
    staticSrc,
  },
};

const classNameTpl = '[name]__[local]__[hash:base64:5]';
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
        loader: extractCSSWrapper(`css?modules&localIdentName=${classNameTpl}!postcss`),
      },
      {
        test: /\.sass/,
        exclude: [staticSrc, /(node_modules|bower_components)/],
        // attention! we use "loader", not "loaders" for array,
        // because extractCSSWrapper normalises it into a string.
        // Also we don't use 'style-loader' for every css related loaders, because it is added
        // by same extractCSSWrapper only in dev mode.
        loader: extractCSSWrapper([
          `css?modules&localIdentName=${classNameTpl}`,
          'postcss',
          'sass?outputStyle=expanded&indentedSyntax',
        ]),
      },
      {
        test: /\.scss/,
        exclude: [staticSrc, /(node_modules|bower_components)/],
        loader: extractCSSWrapper([
          `css?modules&localIdentName=${classNameTpl}`,
          'postcss',
          'sass?outputStyle=expanded',
        ]),
      },
      {
        test: /\.less/,
        exclude: [staticSrc, /(node_modules|bower_components)/],
        loader: extractCSSWrapper(`css?modules&localIdentName=${classNameTpl}!postcss!less`),
      },
      {
        test: /\.styl/,
        exclude: [staticSrc, /(node_modules|bower_components)/],
        loader: extractCSSWrapper(`css?modules&localIdentName=${classNameTpl}!postcss!stylus`),
      },

      // CSS without modules part
      {
        test: /\.css$/,
        include: [staticSrc, /(node_modules|bower_components)/],
        loader: extractCSSWrapper('css!postcss'),
      },
      {
        test: /\.sass/,
        include: [staticSrc, /(node_modules|bower_components)/],
        loader: extractCSSWrapper('css!postcss!sass?outputStyle=expanded&indentedSyntax'),
      },
      {
        test: /\.scss/,
        include: [staticSrc, /(node_modules|bower_components)/],
        loader: extractCSSWrapper('css!postcss!sass?outputStyle=expanded'),
      },
      {
        test: /\.less/,
        include: [staticSrc, /(node_modules|bower_components)/],
        loader: extractCSSWrapper('css!postcss!less'),
      },
      {
        test: /\.styl/,
        include: [staticSrc, /(node_modules|bower_components)/],
        loader: extractCSSWrapper('css!postcss!stylus'),
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

  plugins: [
    extractCSS,
  ],

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

  customVars,
};
