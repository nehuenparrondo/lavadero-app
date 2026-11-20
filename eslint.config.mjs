import { createRequire } from 'node:module';

/** Herramientas Node del repositorio; usa ESLint ya instalado en frontend, sin duplicar dependencias. */
const require = createRequire(new URL('frontend/package.json', import.meta.url));
const eslint = require('@eslint/js');

export default [
  { ignores: ['backend/**', 'frontend/**', '**/node_modules/**'] },
  eslint.configs.recommended,
  {
    files: ['scripts/**/*.mjs', 'eslint.config.mjs'],
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      globals: {
        process: 'readonly',
        console: 'readonly',
        Buffer: 'readonly',
        URL: 'readonly',
      },
    },
  },
];
