// const { IS_DEV } = require('../constants')

function getUrlLoader(assetsPrefix) {
  return {
    loader: 'url-loader',
    options: {
      limit: 1024,
      name: `${assetsPrefix}/[name].[hash:7].[ext]`
    }
  }
}

module.exports = [
  {
    test: /\.(png|jpg|jpeg|gif|svg)$/,
    use: [
      getUrlLoader('images'), // 注释
      // 'url-loader' // 注释后直接替换为url-loader
      // !IS_DEV && {
      //   // 压缩图片
      //   loader: 'image-webpack-loader',
      //   options: {
      //     mozjpeg: {
      //       progressive: true,
      //       quality: 65
      //     },
      //     // optipng.enabled: false will disable optipng
      //     optipng: {
      //       enabled: false
      //     },
      //     pngquant: {
      //       quality: [0.65, 0.9],
      //       speed: 4
      //     }
      //   }
      // }
    ].filter(Boolean) // 注释
    // ]
  },
  {
    test: /\.(woff|woff2|eot|ttf|otf|TTF)$/,
    use: [
      getUrlLoader('fonts')
      // 'url-loader'
    ]
    .filter(Boolean)
  }
]
