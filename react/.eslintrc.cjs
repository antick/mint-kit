module.exports = {
  parser: '@typescript-eslint/parser',
  extends: [
    'airbnb-base',
    'plugin:react/recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:import/typescript',
    'eslint:recommended'
  ],

  env: {
    browser: true,
    es2020: true
  },

  settings: {
    'import/resolver': {
      node: {
        extensions: [
          '.js',
          '.jsx',
          '.ts',
          '.tsx'
        ]
      }
    },
    react: {
      version: 'detect'
    }
  },

  parserOptions: {
    ecmaVersion: 2022,
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true
    }
  },

  plugins: [
    'react',
    '@typescript-eslint'
  ],

  rules: {
    '@typescript-eslint/no-explicit-any': 'off',
    '@typescript-eslint/no-unused-vars': ['error'],
    '@typescript-eslint/no-use-before-define': ['error'],
    'consistent-return': 'off',
    'func-names': 'off',
    'function-paren-newline': [
      'error',
      'multiline-arguments'
    ],
    'import/extensions': 'off',
    'import/no-cycle': 'off',
    'import/newline-after-import': 'off',
    'import/no-extraneous-dependencies': 'off',
    'import/prefer-default-export': 'off',
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
    'react/prop-types': 'off',
    'react/react-in-jsx-scope': 'off',
    'security/detect-object-injection': 'off',
    'semi': [
      'error',
      'always'
    ]
  }
};
