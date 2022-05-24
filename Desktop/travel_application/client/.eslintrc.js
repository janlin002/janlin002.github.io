module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    'plugin:react/recommended',
    'airbnb',
  ],
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 12,
    sourceType: 'module',
  },
  plugins: [
    'react',
  ],
  rules: {
    'react/jsx-filename-extension': [1, { extensions: ['.js', '.jsx'] }],
    // 'no-underscore-dangle': ['error', { allow: ['_place'] }],

    // 關閉使用_錯誤
    'no-underscore-dangle': 'off',

    // 關閉參數使用預設值錯誤
    'default-param-last': 0,

    // 限制每行可以輸入字母數量
    'max-len': ['error', { code: 150 }],
  },
};
