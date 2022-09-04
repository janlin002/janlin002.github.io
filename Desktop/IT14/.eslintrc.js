module.exports = {
  'env': {
    'browser': true,
    'es2021': true,
    'amd': true,
    'node': true,
  },
  'extends': [
    // 'airbnb',
    // "plugin:jsx-control-statements/recommended"
    'eslint:recommended',
    'plugin:react/recommended'
  ],
  'parserOptions': {
    'ecmaFeatures': {
      'jsx': true
    },
    'ecmaVersion': 12,
    'sourceType': 'module'
  },
  'plugins': [
    'react'
  ],
  'rules': {
    // semi: ["error", "never"],
    'semi': 'off',
    'react/react-in-jsx-scope': 'off', // 縮排限制
    'react/jsx-filename-extension': [1, { 'extensions': ['.js', '.jsx'] }],
    'indent': [
      'error',
      2
    ], // 縮排限制
    'object-curly-spacing': ['error', 'always'], // 大括號空白
    'no-multiple-empty-lines': [1, { 'max': 1 }], // 空行最多0行
    'no-unused-vars':'off', //未使用提示關閉
    //   "react/jsx-no-undef": [
    //     2,
    //     {
    //         "allowGlobals": true
    //     }
    // ],
    'react/jsx-no-undef': [2, { 'allowGlobals': true }],
    // 'jsx-quotes': ["error", "prefer-single"]
  }
}