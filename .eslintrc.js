module.exports = {
  root: true,
  env: {
    node: true,
  },
  extends: [
    'plugin:vue/essential',
    '@vue/airbnb',
    '@vue/typescript/recommended',
  ],
  parserOptions: {
    ecmaVersion: 2020,
  },
  rules: {
    'no-console':
      process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger':
      process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'import/extensions': [0, 'never'],
    'class-methods-use-this': 0,
    'no-plusplus': 0,
    '@typescript-eslint/no-explicit-any': 0,
    'no-underscore-dangle': 0,
    'import/prefer-default-export': 0,
  },
};
