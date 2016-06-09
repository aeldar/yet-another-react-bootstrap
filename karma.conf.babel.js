// karma for the moment doesn't support es6/babel,
// so this file should be used with the wrapper karma.conf.js.
import webpackConfig from './webpack.config.babel';

webpackConfig.externals = {
  'react/addons': true,
  'react/lib/ExecutionEnvironment': true,
  'react/lib/ReactContext': true,
};


export default (config) => {
  config.set({
    basePath: '',
    frameworks: ['mocha', 'chai'],
    files: [
      'src/**/*.spec.{jsx,js}',
    ],

    preprocessors: {
      // add webpack as preprocessor
      'src/**/*.js': ['webpack', 'sourcemap'],
      'src/**/*.jsx': ['webpack', 'sourcemap'],
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
