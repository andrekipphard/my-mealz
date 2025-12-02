const js = require('@eslint/js');
const vue = require('eslint-plugin-vue');
const prettier = require('eslint-plugin-prettier');
const prettierConfig = require('eslint-config-prettier');

// Vue rules manuell zusammenführen (base, essential, strongly-recommended, recommended)
const vueBase = require('eslint-plugin-vue/lib/configs/base');
const vueEssential = require('eslint-plugin-vue/lib/configs/vue3-essential');
const vueStrong = require('eslint-plugin-vue/lib/configs/vue3-strongly-recommended');
const vueRecommended = require('eslint-plugin-vue/lib/configs/vue3-recommended');

function mergeRules(...configs) {
  return Object.assign({}, ...configs.map((c) => c.rules || {}));
}

module.exports = [
  js.configs.recommended,
  {
    files: ['**/*.vue'],
    ignores: ['node_modules/', 'dist/', '.env'],
    languageOptions: {
      ecmaVersion: 2021,
      sourceType: 'module',
      parser: require('vue-eslint-parser'),
      globals: {
        window: 'readonly',
        document: 'readonly',
        console: 'readonly',
        module: 'writable',
        require: 'readonly',
        process: 'readonly',
        fetch: 'readonly',
      },
    },
    plugins: {
      vue,
      prettier,
    },
    rules: {
      ...mergeRules(vueBase, vueEssential, vueStrong, vueRecommended),
      ...prettierConfig.rules,
      'vue/comment-directive': 'off',
      // Eigene Regeln hier ergänzen
    },
  },
  {
    files: ['**/*.js'],
    ignores: ['node_modules/', 'dist/', '.env'],
    languageOptions: {
      ecmaVersion: 2021,
      sourceType: 'module',
      globals: {
        window: 'readonly',
        document: 'readonly',
        console: 'readonly',
        module: 'writable',
        require: 'readonly',
        process: 'readonly',
      },
    },
    plugins: {
      vue,
      prettier,
    },
    rules: {
      ...prettierConfig.rules,
      // Eigene Regeln hier ergänzen
    },
  },
];
