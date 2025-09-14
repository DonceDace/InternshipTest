module.exports = {
  root: true,
  extends: ['eslint-config-umi', 'eslint:recommended', 'plugin:prettier/recommended'],
  plugins: ['prettier'],
  globals: {
    SERVER_ENV: 'readonly'
  },
  env: {
    jest: true,
    node: true,
    es6: true
  },
  rules: {
    quotes: ['error', 'single'],
    'arrow-parens': ['error', 'as-needed'],
    'comma-spacing': ['error', { before: false, after: true }],
    'key-spacing': ['error', { beforeColon: false }],
    'space-infix-ops': 'error',
    'space-before-blocks': 'error',
    'space-before-function-paren': 0,
    'comma-dangle': ['error', 'never'],
    'global-require': 2,
    indent: ['error', 2, { SwitchCase: 1, ignoredNodes: ['TemplateLiteral'] }],
    'max-len': ['warn', { comments: 150, code: 130 }],
    'no-nested-ternary': 'off',
    'no-prototype-builtins': 'off',
    'no-underscore-dangle': 0,
    'no-unused-expressions': [2, { allowShortCircuit: true, allowTernary: true }],
    'no-use-before-define': ['warn', { functions: true, classes: true, variables: true }],
    'no-restricted-syntax': ['off', 'ForOfStatement'],
    'require-yield': 0,
    'no-empty': 2,
    'no-console': 1,
    radix: 1,
    'prefer-destructuring': ['error', { object: true, array: false }],
    semi: ['error', 'always'],
    'import/extensions': 0,
    'import/no-extraneous-dependencies': 0,
    'import/no-unresolved': ['error', { ignore: ['^app', '^@'] }],
    'import/prefer-default-export': 0,
    'import/default': 2,
    'import/export': 2,
    'react/display-name': ['off'],
    'react/no-multi-comp': ['off'],
    'react/forbid-prop-types': 0,
    'react/destructuring-assignment': 0,
    'react/static-property-placement': ['off'],
    'react/state-in-constructor': ['off'],
    'react/no-access-state-in-setstate': ['off'],
    'react/jsx-filename-extension': [1, { extensions: ['.js', '.jsx'] }],
    'react/no-array-index-key': 'warn',
    'react/prefer-stateless-function': [0, { ignorePureComponents: true }],
    'react/prop-types': ['warn', { skipUndeclared: true }],
    'react/jsx-closing-tag-location': 'off',
    'react/jsx-props-no-spreading': 'off',
    'linebreak-style': [0, 'error', 'windows']
  },
  ignorePatterns: ['.umirc.js'],
  settings: {
    'import/resolver': {
      alias: {
        map: [['@', './src']]
      },
      node: {
        extensions: ['.js', '.less', '.jsx', '.ts', '.css', '.ejs'],
        paths: ['./src']
      }
    }
  }
};
