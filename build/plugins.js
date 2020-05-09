const path = require('path')
const webpack = require('webpack')
const glob = require('glob')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const PurgecssPlugin = require('purgecss-webpack-plugin')
const ProgressBarPlugin = require('progress-bar-webpack-plugin')
const WebpackBuildNotifierPlugin = require('webpack-build-notifier')
const CompressionWebpackPlugin = require('compression-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const config = require('./config')
const { resolve } = require('./utils')
const { IS_DEV } = require('./constants')

const basePlugins = [
  new CleanWebpackPlugin(),
  // 常用第三方库不用手动import或者require
  new webpack.ProvidePlugin({
    React: 'react',
    Component: ['react', 'Component']
  }),
  // 移除moment的语言包，如果需要某某语言包需要自己手动引入
  new webpack.IgnorePlugin(/\.\/locale/, /moment/),
  // 打包进度条显示
  new ProgressBarPlugin()
  // 设置全局参数
  // new webpack.DefinePlugin({})
]

/**
 * 开发环境配置插件
 */
const devPlugin = [
  new HtmlWebpackPlugin({
    template: resolve('public/index.html'),
    filename: 'index.html',
    title: config.title,
    inject: true,
    favicon: resolve('src/assets/favicon.ico')
  }),
  new webpack.NamedModulesPlugin(), // 会打印出哪个文件更新了...
  new webpack.HotModuleReplacementPlugin()  // HMR
]

/**
 * 生产环境配置插件
 */
const prodPlugins = [
  new HtmlWebpackPlugin({
    template: resolve('public/index.html'),
    inject: true,
    title: config.title,
    favicon: resolve('src/assets/favicon.ico'),
    minify: {
      removeComments: true,
      collapseWhitespace: true,
      removeAttributeQuotes: true
    },
    // necessary to consistently work with multiple chunks via CommonsChunkPlugin
    chunksSortMode: 'dependency'
  }),
  // 抽离出css文件
  new MiniCssExtractPlugin({
    filename: 'css/[name].[contenthash].css'
  }),
  // 移除无用的css样式，但是打包的时候太耗时
  // new PurgecssPlugin({
  //   paths: glob.sync(`${path.join(__dirname, '../src')}/**/*`, { nodir: true }) // 不匹配目录，只匹配文件
  // }),
  // 开启zip压缩
  new CompressionWebpackPlugin({
    filename: '[path].gz[query]',
    algorithm: 'gzip',
    cache: true,
    // test: new RegExp('\\(js|css)$')
    test: /\.(js|css)$/,
    threshold: 10240, // 只处理大于XX字节文件
    minRatio: 0.75 // 压缩率 默认0.75
  }),
  // 打包完成提示
  new WebpackBuildNotifierPlugin({
    title: '项目构建完毕',
    suppressSuccess: true
  })
]

// 是否启动打包分析
if (config.bundleAnalyzerReport) {
  const BundleAnalyzerPlugin = require('webpack-bundle-analyzer')
    .BundleAnalyzerPlugin
  prodPlugins.push(new BundleAnalyzerPlugin())
}

module.exports = basePlugins.concat(IS_DEV ? devPlugin : prodPlugins)
