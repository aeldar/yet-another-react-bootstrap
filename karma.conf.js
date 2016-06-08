require('babel-core/register');
let webpackConfig = require('./webpack.config.babel').default;

webpackConfig.externals = {
  'react/addons': true,
  'react/lib/ExecutionEnvironment': true,
  'react/lib/ReactContext': true,
};


module.exports = function (config) {
  config.set({
    basePath: '',
    frameworks: ['mocha', 'chai'],
    files: [
      'src/**/*.spec.jsx',
      'src/**/*.spec.js',
    ],

    preprocessors: {
      // add webpack as preprocessor
      'src/**/*.js': ['webpack'],
      'src/**/*.jsx': ['webpack'],
    },

    webpack: webpackConfig,
    webpackServer: {
      noInfo: true,
    },

    plugins: [
      'karma-mocha',
      'karma-chai',
      'karma-webpack',
      'karma-phantomjs-launcher',
      'karma-spec-reporter',
      'karma-sourcemap-loader',
    ],

    reporters: ['spec'],
    port: 9876,
    colors: true,
    logLevel: config.LOG_INFO,
    browsers: ['PhantomJS'],
  });
};
