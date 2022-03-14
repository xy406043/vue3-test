module.exports = {
  root: true,
  env: {
    node: true,
    es6: true,
    browser: true
  },
  parser: 'vue-eslint-parser',
  extends: ['plugin:vue/vue3-recommended', 'plugin:@typescript-eslint/recommended', 'prettier', 'plugin:prettier/recommended'],
  parserOptions: {
    parser: '@typescript-eslint/parser',
    ecmaVersion: 2020, // Allows for the parsing of modern ECMAScript features
    sourceType: 'module',
    jsxPragma: 'React',
    ecmaFeatures: {
      jsx: true
    }
  },
  rules: {
    // typescript
    '@typescript-eslint/explicit-module-boundary-types': ['off'], // fix: missing return type on function
    '@typescript-eslint/no-var-requires': 0, // fix: require statement  not part of import statement
    '@typescript-eslint/no-unused-vars': 0,
    '@typescript-eslint/no-empty-function': 0,
    // '@typescript-eslint/no-explicit-any': 'off',
    // 优先使用 interface 而不是 type
    '@typescript-eslint/consistent-type-definitions': ['error', 'interface'],

    // vue
    'vue/max-attributes-per-line': 'off',
    'vue/attribute-hyphenation': 0,
    'vue/html-self-closing': 0,
    'vue/component-name-in-template-casing': 0,
    'vue/html-closing-bracket-spacing': 0,
    'vue/singleline-html-element-content-newline': 0,
    'vue/no-unused-vars': 1,
    'vue/no-unused-components': 0,
    'vue/multiline-html-element-content-newline': 0,
    'vue/no-use-v-if-with-v-for': 0,
    'vue/html-closing-bracket-newline': 0,
    'vue/no-parsing-error': 0,
    'vue/component-definition-name-casing': 0,
    'vue/no-mutating-props': 0, // 谨慎，代码中部分逻辑应用deep object 修改属性可生效

    // 默认eslint
    eqeqeq: 1,
    indent: 'off',
    curly: [0, 'all'],
    quotes: [
      2,
      'single',
      {
        avoidEscape: true,
        allowTemplateLiterals: true
      }
    ],
    semi: [
      2,
      'never',
      {
        beforeStatementContinuationChars: 'never'
      }
    ],
    'no-console': 'off',
    'no-unreachable': 1,
    'no-unused-vars': 1,
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'generator-star-spacing': 'off',
    'no-mixed-operators': 0,
    'no-tabs': 0,
    'no-delete-var': 2,
    'prefer-const': [
      1,
      {
        ignoreReadBeforeAssign: false
      }
    ],
    'template-curly-spacing': 'off',
    'comma-dangle': 0,
    'space-before-function-paren': 0,
    'handle-callback-err': 0
  }
  // overrides: [
  //   {
  //     files: ['**/__tests__/*.{j,t}s?(x)', '**/tests/unit/**/*.spec.{j,t}s?(x)'],
  //     env: {
  //       jest: true
  //     }
  //   }
  // ]
}
