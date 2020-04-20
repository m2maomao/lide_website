const path = require('path')
const SpeedMeasurePlugin = require('speed-measure-webpack-plugin')
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin')
const TerserWebpackPlugin = require('terser-webpack-plugin')
const config = require('./config')
const jsRules = require('./rules/jsRules')
const styleRules = require('./rules/styleRules')
const fileRules = require('./rules/fileRules')
const plugins = require('./plugins')
const { resolve } = require('./utils')
const { IS_DEV } = require('./constants')

// 耗时分析
// const smp = new SpeedMeasurePlugin()

const conf = {
  mode: process.env.NODE_ENV,
  entry: path.resolve(__dirname, '../src/index.js'),
  output: {
    filename: IS_DEV ? '[name].js' : 'js/[name].[contenthash].js',
    path: path.resolve(__dirname, '../dist'),
    chunkFilename: 'js/[name].[chunkhash:5].chunk.js',
  },
  devtool: config.sourceMap,
  module: {
    rules: [...jsRules, ...styleRules, ...fileRules],
  },
  resolve: {
    extensions: ['.js', '.jsx', '.json'],
    alias: {
      '@': path.resolve(__dirname, '../src'),
      com: path.resolve(__dirname, '../src/components'),
      con: path.resolve(__dirname, '../src/containers'),
    },
  },
  plugins,
  /**
   * 使用CDN，不打包进bundle
   */
  externals: {
    echarts: 'Echarts'
  },
  // 优化方案
  optimization: {
    runtimeChunk: {
      name: 'runtime',
    },
    /**
     * 第三方模块抽离: 可以抽离第三方模块和公共模块
     */
    splitChunks: {
      chunks: 'all',
      cacheGroups: {
        vendors: {
          test: /[\\/]node_modules[\\/]/,
          priority: -10,
          name: 'vendors',
        },
        default: {
          minChunks: 2,
          priority: -20,
          reuseExistingChunk: true,
          name: 'common',
        },
      },
    },
    minimizer: [
      new TerserWebpackPlugin({
        parallel: 4,
      }),
      // 压缩CSS
      new OptimizeCSSAssetsPlugin(), // 使用了这个js也需要我们手动压缩
    ],
  },
}

if (IS_DEV) {
  conf.devServer = {
    host: config.host,
    port: config.devPort,
    compress: true,
    contentBase: resolve('../dist'), // webpack启动服务目录
    historyApiFallback: true, // 解决单页面路由刷新问题
    progress: true, // 显示进度条
    // 错误使用蒙层显示 更加清晰 直观
    overlay: {
      errors: true,
      warnings: true,
    },
    hot: true,
  }
}

// module.exports = smp.wrap({ ...conf })
module.exports = conf
