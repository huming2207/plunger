/*eslint-disable @typescript-eslint/no-var-requires */
const path = require('path');
const ReactRefreshPlugin = require('@pmmmwh/react-refresh-webpack-plugin');
const { merge } = require('webpack-merge');
const common = require('./webpack.common.js');
const { ESBuildMinifyPlugin } = require('esbuild-loader');

module.exports = merge(common, {
  devServer: {
    hot: true,
    open: true,
    historyApiFallback: true,
    compress: true,
    host: '127.0.0.1',
    port: 5000,
    disableHostCheck: true,
    contentBase: path.join(__dirname, 'public'),
  },
  output: {
    filename: '[name].[hash].js',
    path: path.resolve(__dirname, 'dist'),
    publicPath: '/',
  },
  devtool: 'inline-source-map',
  mode: 'development',
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        loader: 'esbuild-loader',
        options: {
          loader: 'tsx', // Or 'ts' if you don't need tsx
          target: 'es2016',
          sourcemap: true,
        },
      },
    ],
  },
  plugins: [new ReactRefreshPlugin()],
  optimization: {
    minimize: true,
    minimizer: [
      new ESBuildMinifyPlugin({
        target: 'es2016',
        css: true,
        minify: true,
        minifyWhitespace: false,
        minifySyntax: false,
        exclude: 'node_modules',
        sourcemap: true,
      }),
    ],
  },
});
