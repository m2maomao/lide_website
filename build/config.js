const { IS_DEV, IS_REPORT } = require('./constants')

module.exports = {
  title: '立得催化剂',
  host: '0.0.0.0',
  devPort: 8000,
  sourceMap: IS_DEV === 'development' ? 'eval-source-map' : 'none',
  // 打包📦分析
  bundleAnalyzerReport: IS_REPORT
}
