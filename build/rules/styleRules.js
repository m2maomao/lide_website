const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const { IS_DEV } = require('../constants')

module.exports = [
  {
    test: /\.(c|sa|sc)ss$/,
    use: [
      IS_DEV ? 'style-loader' : MiniCssExtractPlugin.loader,
      {
        loader: 'css-loader',
        options: {
          importLoaders: 2
        }
      },
      {
        loader: 'postcss-loader',
        options: {
          plugins: [require('autoprefixer')]
        }
      },
      'sass-loader'
    ]
  }
]
