/*eslint-disable @typescript-eslint/no-var-requires */
const { merge } = require('webpack-merge');
const common = require('./webpack.common.js');
const { ESBuildMinifyPlugin } = require('esbuild-loader');

module.exports = merge(common, {
  mode: 'production',
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        loader: 'esbuild-loader',
        options: {
          loader: 'tsx', // Or 'ts' if you don't need tsx
          target: 'es2016',
          sourcemap: false,
          minify: true,
        },
      },
    ],
  },
  optimization: {
    minimize: true,
    minimizer: [
      new ESBuildMinifyPlugin({
        target: 'es2016',
        css: true,
        minify: true,
        minifyWhitespace: true,
        minifySyntax: true,
        exclude: 'node_modules',
        sourcemap: false,
      }),
    ],
    runtimeChunk: 'multiple',
    splitChunks: {
      cacheGroups: {
        vendor: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendors',
          chunks: 'all',
        },
      },
      minSize: 10000,
      maxSize: 250000,
    },
  },
});
