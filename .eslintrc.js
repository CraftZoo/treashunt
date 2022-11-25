/** @type {import('eslint').Linter.Config} */
module.exports = {
  extends: [
    'plugin:prettier/recommended',
    '@remix-run/eslint-config',
    '@remix-run/eslint-config/node',
    'eslint-config-prettier',
  ],
  plugins: ['prettier'],
}
