/* eslint-disable import/no-unresolved */

import { defineConfig } from 'eslint/config';
import eslint from '@eslint/js';
import pluginCypress from 'eslint-plugin-cypress/flat';
import eslintPluginPrettier from 'eslint-plugin-prettier/recommended';
import mochaPlugin from 'eslint-plugin-mocha';
import importPlugin from 'eslint-plugin-import';
import babelParser from '@babel/eslint-parser';
import globals from 'globals';
import unicorn from 'eslint-plugin-unicorn';

export default defineConfig(
  {
    extends: [
      eslint.configs.recommended,
      importPlugin.flatConfigs.recommended,
      pluginCypress.configs.recommended,
      mochaPlugin.configs.recommended,
    ],
    plugins: {
      unicorn,
    },
    languageOptions: {
      parser: babelParser,
      globals: {
        ...globals.node,
      },
      parserOptions: {
        sourceType: 'module',
        ecmaVersion: 'latest',
        requireConfigFile: false,
        moduleResolution: 'node',
      },
    },
    rules: {
      'import/namespace': 'off',
      'import/no-named-as-default-member': 'off',
      'import/no-commonjs': 'error',
      'mocha/no-mocha-arrows': 'off',
      'mocha/no-top-level-hooks': 'off',
      'mocha/prefer-arrow-callback': 'error',
      'mocha/max-top-level-suites': ['error', { limit: 5 }],
      'unicorn/no-null': 'error',
    },
  },
  eslintPluginPrettier
);
