const path = require('path');

const HTMLWebPackPlugin = require('html-webpack-plugin');
/* const CopyWebPackPlugin = require('copy-webpack-plugin'); */
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = (env, options) => {
  const isDevelopment = options.mode === 'development';
  return {
    entry: path.resolve(__dirname, 'src/index.js'),
    output: {
      path: path.resolve(__dirname, 'dist'),
      filename: '[name].bundle.js',
    },
    plugins: [
      new HTMLWebPackPlugin({
        template: path.resolve(__dirname, 'src/index.html'),
        favicon: path.resolve(__dirname, 'src/assets/icons/keyboard-icon.ico'),
      }),
      /* new CopyWebPackPlugin({
        patterns: [
          {
            from: path.resolve(__dirname, './src/assets/fonts'),
            to: 'fonts'
          }
        ]
      }), */
      new MiniCssExtractPlugin({
        filename: '[name].[hash].css',
      }),
      new CleanWebpackPlugin(),
    ],
    module: {
      rules: [
        {
          test: /\.(scss|scc)$/,
          use: [
            isDevelopment ? 'style-loader' : MiniCssExtractPlugin.loader,
            'css-loader',
            'sass-loader',
          ],
        },
        {
          test: /\.html$/,
          use: 'html-loader',
        },
        {
          test: /\.(woff|woff2|ttf|eot)$/,
          type: 'asset/resource',
        },
        {
          test: /\.(ico|jpg|png|svg|jpeg|gif|webp)$/,
          type: 'asset/resource',
        },
      ],
    },
    devtool: 'source-map',
    devServer: {
      port: 8888,
    },
  };
};
