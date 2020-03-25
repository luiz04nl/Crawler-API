module.exports = {
  root: true,
  parserOptions: {
    sourceType: 'module',
    allowImportExportEverywhere: true,
    parser: 'babel-eslint',
    ecmaVersion: 2018,
  },
  env: {
    node: true,
    'jest/globals': true,
  },
  extends: ['plugin:prettier/recommended', 'plugin:jest/recommended'],
  plugins: ['prettier', 'jest'],
  rules: {},
}
