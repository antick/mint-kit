module.exports = {
  extends: [
    'airbnb-base',
    'plugin:react/recommended',
    'eslint:recommended'
  ],

  env: {
    browser: true,
    es2020: true
  },

  settings: {
    react: {
      version: 'detect'
    }
  },

  parserOptions: {
    ecmaVersion: 2022,
    sourceType: 'module'
  },

  rules: {
    'consistent-return': 'off',
    'func-names': 'off',
    'function-paren-newline': [
      'error',
      'multiline-arguments'
    ],
    'import/newline-after-import': 'off',
    'import/no-extraneous-dependencies': 'off',
    'indent': [
      'error',
      2,
      {
        'SwitchCase': 1
      }
    ],
    'linebreak-style': 0,
    'max-len': [
      'error',
      {
        'code': 120
      }
    ],
    'no-confusing-arrow': 0,
    'no-console': 'error',
    'no-multi-str': 0,
    'no-param-reassign': 0,
    'no-throw-literal': 0,
    'no-underscore-dangle': 'off',
    'no-unused-vars': [
      'error',
      {
        'argsIgnorePattern': 'next'
      }
    ],
    'no-use-before-define': [
      'error',
      {
        'variables': false
      }
    ],
    'no-var': 'error',
    'quotes': [
      'error',
      'single'
    ],
    'security/detect-object-injection': 'off',
    'semi': [
      'error',
      'always'
    ]
  }
};
