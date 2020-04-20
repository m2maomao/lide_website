module.exports = [
  {
    test: /\.(js|jsx)$/,
    use: [
      'babel-loader',
      {
        loader: 'eslint-loader',
        options: {
          fix: true,
        }
      }
    ],
    exclude: /node_modules/
  }
]
