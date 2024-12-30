const webpack = require('webpack');
const path = require('path');

module.exports = function override(config) {
  // Add resolve.fallback
  config.resolve = {
    ...config.resolve,
    alias: {
      ...config.resolve.alias,
      'http2': path.resolve(__dirname, 'src/mocks/http2.js')
    },
    fallback: {
      "buffer": require.resolve("buffer/"),
      "crypto": require.resolve("crypto-browserify"),
      "stream": require.resolve("stream-browserify"),
      "assert": require.resolve("assert/"),
      "http": require.resolve("stream-http"),
      "https": require.resolve("https-browserify"),
      "os": require.resolve("os-browserify/browser"),
      "url": require.resolve("url/"),
      "util": require.resolve("util/"),
      "path": require.resolve("path-browserify"),
      "querystring": require.resolve("querystring-es3"),
      "zlib": require.resolve("browserify-zlib"),
      "process": false,
      "fs": false,
      "child_process": false,
      "net": false,
      "tls": false
    },
    extensions: ['.js', '.mjs', '.jsx', '.ts', '.tsx']
  };

  // Add plugins
  config.plugins = [
    ...(config.plugins || []),
    new webpack.ProvidePlugin({
      process: 'process/browser.js',
      Buffer: ['buffer', 'Buffer']
    }),
    new webpack.DefinePlugin({
      'process.env': JSON.stringify(process.env)
    })
  ];

  return config;
};
