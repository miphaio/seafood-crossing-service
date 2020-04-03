/**
 * @author WMXPY
 * @namespace Service
 * @description Webpack
 */

const path = require('path');
const serverless_webpack = require('serverless-webpack');
const nodeExternals = require('webpack-node-externals');

const isLocal = serverless_webpack.lib.webpack.isLocal;
const entries = serverless_webpack.lib.entries;

const mappedEntries = Object.keys(entries).reduce((previous, key) => {
  return {
    ...previous,
    [key]: path.join(__dirname, '..', entries[key]),
  }
}, {});

console.log(serverless_webpack.lib.entries, mappedEntries);
module.exports = {
  context: __dirname,
  mode: isLocal ? 'development' : 'production',
  entry: mappedEntries,
  devtool: isLocal ? 'cheap-module-eval-source-map' : 'source-map',
  resolve: {
    extensions: ['.mjs', '.json', '.ts'],
    symlinks: false,
    cacheWithContext: false,
  },
  output: {
    libraryTarget: 'commonjs',
    path: path.join(__dirname, '..', '.webpack'),
    filename: '[name].js',
  },
  target: 'node',
  externals: [nodeExternals()],
  module: {
    rules: [
      // all files with a `.ts` or `.tsx` extension will be handled by `ts-loader`
      {
        test: /\.(tsx?)$/,
        loader: 'ts-loader',

        exclude: [
          [
            path.resolve(__dirname, '..', 'node_modules'),
            path.resolve(__dirname, '..', '.serverless'),
            path.resolve(__dirname, '..', '.webpack'),
          ],
        ],
        options: {
          transpileOnly: true,
          experimentalWatchApi: true,
        },
      },
    ],
  },
  plugins: [],
};
