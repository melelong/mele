import globals from 'globals'
import pluginJs from '@eslint/js'
import tseslint from 'typescript-eslint'
import eslintConfigPrettier from 'eslint-config-prettier'
import pluginPrettier from 'eslint-plugin-prettier'
export default [
  { files: ['**/*.{js,mjs,cjs,ts}'] },
  {
    ignores: ['node_modules/', 'dist/', 'bin/']
  },
  { languageOptions: { globals: globals.node } },
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,
  eslintConfigPrettier,
  {
    plugins: {
      pluginPrettier: pluginPrettier
    }
  },
  {
    name: 'lint',
    files: ['src/**/*.{js,mjs,cjs,ts}'],
    rules: {
      'no-unused-vars': [2, { argsIgnorePattern: '^_' }],
      '@typescript-eslint/no-unused-vars': [2, { argsIgnorePattern: '^_' }],
      '@typescript-eslint/no-explicit-any': 0
    }
  }
]
