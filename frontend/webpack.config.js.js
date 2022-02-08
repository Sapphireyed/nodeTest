// const HtmlWebpackPlugin = require("html-webpack-plugin");
const path = require('path');

module.exports = {
  entry: {
  app: path.resolve(__dirname, './src/app.js'),
},
output: {
  filename: '[name].[contenthash]bundle.js',
  path: path.resolve(__dirname, 'deploy'),
},
devServer: {
  contentBase: './deploy',
  compress: true,
  open: true,
},
module: {
  rules: [
    {
      test: /\.js$/,
      exclude: /node_modules/,
      use: {
        loader: 'babel-loader',
        options: {
          presets: ['@babel/preset-env']
        }
      }
    },
    {
      test: /\.(ico|jpg|JPG|jpeg|gif|eot|otf|webp|svg|ttf|woff|woff2)(\?.*)?$/,
      use: {
        loader: 'file-loader',
        options: {

          esModule: false,
        },
      },
    },
    {
        test: /\.(scss|css)$/,
        use: ['style-loader', 'css-loader', 'sass-loader'],
    },
    {
      test: /\.(?:ico|gif|png|PNG)$/i,
      type: 'asset/resource',
    },
  ],
},
  plugins: [
    // new HtmlWebpackPlugin({
    //   title: "credits",
    //   filename: 'credits.html',
    //   chunks: ['credits'],
    // }),
  ],
};
