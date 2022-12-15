/** @type {import('eslint').Linter.Config} */
module.exports = {
  extends: [
    'plugin:prettier/recommended',
    '@remix-run/eslint-config',
    '@remix-run/eslint-config/node',
    'eslint-config-prettier',
  ],
  plugins: ['prettier'],
  rules: {
    'import/order': [
      'error',
      {
        pathGroups: [
          { pattern: 'react', group: 'external', position: 'before' },
          { pattern: '@remix-run/**', group: 'external', position: 'before' },
          { pattern: '@prisma/**', group: 'external', position: 'before' },
          { pattern: '@chakra-ui/**', group: 'external', position: 'before' },
        ],
        pathGroupsExcludedImportTypes: ['react'],
        groups: ['builtin', 'external', 'internal', 'parent', 'sibling'],
        'newlines-between': 'always',
        alphabetize: { order: 'asc', caseInsensitive: true },
      },
    ],
    '@typescript-eslint/no-duplicate-imports': 'error',
    '@typescript-eslint/no-redeclare': 'off',
  },
}
