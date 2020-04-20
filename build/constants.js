const env = process.env

const IS_DEV = env.NODE_ENV === 'development'

// 如果是npm run build --report 直接判断npm_config_report
// 使用yarn build --report 需要判断npm_config_argv
const original = JSON.parse(env.npm_config_argv).original
const IS_REPORT = env.npm_config_report || original.includes('--report')

module.exports = {
  IS_DEV,
  IS_REPORT
}
