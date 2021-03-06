const webpack = require('webpack');
const path = require('path');
const appJson = require('../package.json');
const { app } = appJson;

module.exports = {
  watch: true,
  mode: 'development',
  devtool: 'source-map',
  entry: `./src/${app}/index.js`,
  module: {
    rules: [
      {
        test: /\.scss$/,
        exclude: /node_modules/,
        use: [
          { loader: 'style-loader' },
          { loader: 'css-loader' },
          { loader: 'sass-loader' },
        ],
      },
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-env'],
            },
          },
        ],
      },
    ],
  },
  output: {
    publicPath: '/',
    path: path.join(__dirname, `../docs/${app}`),
    filename: 'bundle.js',
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
  ],
  devServer: {
    contentBase: `./docs/${app}`, // set "public" path, relative to root
    noInfo: true,
    hot: true,
    inline: true,
    port: '3000',
    host: 'localhost',
    open: 'Google Chrome',
  },
};
