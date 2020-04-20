module.exports = {
  env: {
    browser: true,
    es6: true,
  },
  extends: ['plugin:react/recommended', 'airbnb'],
  globals: {
    // fix webpack.ProvidePlugin
    ReactDOM: true,
    React: true,
    Component: true,
  },
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 2018,
    sourceType: 'module',
  },
  plugins: ['react'],
  rules: {
    'react/jsx-filename-extension': [1, { extensions: ['.js', '.jsx'] }], // react项目中允许使用.js 后缀名的文件
    'import/prefer-default-export': 'off',
    'import/no-default-export': 'off',
    'import/no-unresolved': [2, { caseSensitive: false }],
    'no-unused-vars': [0],
    'no-console': ['error', { allow: ['warn', 'error', 'log'] }],
    'react/jsx-props-no-spreading': 'off',
    'react/prop-types': 0,
    semi: ['error', 'never'], // 不使用分号，如果使用分号则报错
    quotes: ['error', 'single'],
    camelcase: [0],
    'jsx-a11y/click-events-have-key-events': 0,
    'jsx-a11y/no-noninteractive-element-interactions': 0,
    'jsx-a11y/no-static-element-interactions': 0,
    'jsx-a11y/media-has-caption': 0,
    'react/no-array-index-key': 0,
    'react/no-danger': 0,
    'no-shadow': [0]
  },
  settings: {
    // 允许在项目中使用webpack配置的路径别名
    'import/resolver': {
      webpack: {
        config: './build/webpack.config.js',
      },
    },
  },
}
